/**
 * The essay page as a reader on a phone meets it: save and send under the
 * byline (before the cover art) and again after the essay, one save store
 * (My Library) that also honors the older bookmarks, quote sharing that never
 * signs the words with James's name, actions that stay in Focus mode, a text
 * size of the reader's own, Listen, and a print that is the essay alone.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import superjson from "superjson";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { LEGACY_BOOKMARKS_KEY, LIBRARY_KEY } from "@/lib/library";
import ArticleDetail, { quoteShareText } from "./ArticleDetail";

const SLUG = "when-the-church-married-empire";
const TITLE = "When the Church Married Empire";
const CANONICAL = `https://www.livewellbyjamesbell.co/writing/${SLUG}`;
const QUOTE = "I can do all things through him who strengthens me.";

/** Answers posts.getBySlug with a live shelf essay; every other call is offline. */
function essayFetch(): typeof fetch {
  const offline = offlineFetch();
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(String(input instanceof Request ? input.url : input), "http://localhost");
    if (!url.pathname.startsWith("/api/trpc/")) return offline(input, init);
    const procs = decodeURIComponent(url.pathname.slice("/api/trpc/".length)).split(",");
    const body = procs.map((p) =>
      p === "posts.getBySlug"
        ? {
            result: {
              data: superjson.serialize({
                id: 7,
                slug: SLUG,
                title: TITLE,
                excerpt: "An excerpt",
                pillar: "after-christendom",
                readingTimeMinutes: 12,
                createdAt: new Date("2026-06-09T02:40:57.000Z"),
                publishedAt: new Date("2026-06-09T02:40:57.000Z"),
                body:
                  "The first paragraph of the essay itself, long enough to read as prose and carry a drop cap.\n\n" +
                  `> ${QUOTE}\n\n` +
                  "## The Long Arc\n\nA second paragraph after the heading.",
              }),
            },
          }
        : {
            error: superjson.serialize({
              message: "offline test stub",
              code: -32603,
              data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500, path: p },
            }),
          }
    );
    return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
}

async function renderEssay() {
  window.history.pushState({}, "", `/writing/${SLUG}`);
  const view = renderWithProviders(
    <Switch>
      <Route path="/writing/:slug" component={ArticleDetail} />
    </Switch>
  );
  await screen.findByRole("heading", { level: 1, name: TITLE });
  return view;
}

const sendButtons = () => screen.getAllByRole("button", { name: /Send to my phone/ });
const saveButtons = () => screen.getAllByRole("button", { name: /^(Save|Saved)$/ });
const articleBody = () => document.querySelector<HTMLElement>(".article-body")!;

beforeEach(() => {
  window.localStorage.clear();
  vi.stubGlobal("fetch", vi.fn(essayFetch()));
});
afterEach(() => {
  vi.unstubAllGlobals();
  delete (navigator as { share?: unknown }).share;
  delete (navigator as { clipboard?: unknown }).clipboard;
  window.localStorage.clear();
  window.history.pushState({}, "", "/");
});

describe("quoteShareText", () => {
  it("carries the words and where they were met, never a byline", () => {
    const text = quoteShareText(`  "${QUOTE}"  `, TITLE);
    expect(text).toBe(`“${QUOTE}”\n\nFrom "${TITLE}" on LiveWell`);
    expect(text).not.toMatch(/James Bell|—/);
  });
});

describe("/writing/:slug, save and send", () => {
  it("puts save and send under the byline, before the cover art, and again after the essay", async () => {
    await renderEssay();
    const [top, bottom] = sendButtons();
    expect(sendButtons()).toHaveLength(2);

    const header = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(header.contains(top)).toBe(true);
    const art = document.querySelector("article > section.no-print")!;
    expect(top.compareDocumentPosition(art) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(articleBody().compareDocumentPosition(bottom) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    // The bottom bar carries Print, Cite this, and Send to… beside save and send.
    const bottomBar = bottom.closest('[role="group"]') as HTMLElement;
    for (const name of [/Print/, /Cite this/, /Send to…/]) expect(within(bottomBar).getByRole("button", { name })).toBeInTheDocument();
    expect(within(header).getByRole("button", { name: /Print/ })).toBeInTheDocument();
  });

  it("saves to My Library, and every Save on the page agrees", async () => {
    await renderEssay();
    fireEvent.click(saveButtons()[0]);

    await waitFor(() => expect(saveButtons().map((b) => b.textContent)).toEqual(["Saved", "Saved"]));
    for (const b of saveButtons()) expect(b).toHaveAttribute("aria-pressed", "true");
    const stored = JSON.parse(window.localStorage.getItem(LIBRARY_KEY) ?? "[]");
    expect(stored).toEqual([expect.objectContaining({ href: `/writing/${SLUG}`, title: TITLE, kind: "Essay" })]);
    expect(screen.getAllByRole("link", { name: "My Library" })[0]).toHaveAttribute("href", "/my-library");
    // The old bookmark store is no longer written.
    expect(window.localStorage.getItem(LEGACY_BOOKMARKS_KEY)).toBeNull();
  });

  it("shows an essay saved with the old bookmark as Saved", async () => {
    window.localStorage.setItem(LEGACY_BOOKMARKS_KEY, JSON.stringify([SLUG]));
    await renderEssay();
    expect(saveButtons().map((b) => b.textContent)).toEqual(["Saved", "Saved"]);
  });

  it("keeps every action reachable in Focus mode", async () => {
    await renderEssay();
    fireEvent.click(screen.getByRole("button", { name: "Focus" }));

    expect(screen.getByRole("button", { name: "Exit focus" })).toBeInTheDocument();
    expect(sendButtons()).toHaveLength(2);
    expect(screen.getByRole("button", { name: /Cite this/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send to…/ })).toBeInTheDocument();
  });
});

describe("/writing/:slug, sharing a quotation", () => {
  it("never signs a block quote with James's name", async () => {
    const share = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, "share", { value: share, configurable: true });
    await renderEssay();

    fireEvent.click(screen.getByRole("button", { name: "Share this quote" }));
    await waitFor(() => expect(share).toHaveBeenCalled());
    expect(share).toHaveBeenCalledWith({ title: TITLE, text: quoteShareText(QUOTE, TITLE), url: CANONICAL });
  });

  it("copies nothing when the reader closes the share sheet", async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    Object.defineProperty(navigator, "share", {
      value: vi.fn(() => Promise.reject(new DOMException("Share canceled", "AbortError"))),
      configurable: true,
    });
    await renderEssay();

    fireEvent.click(screen.getByRole("button", { name: "Share this quote" }));
    await waitFor(() => expect(navigator.share).toHaveBeenCalled());
    await new Promise((r) => setTimeout(r, 0));
    expect(writeText).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Share this quote" })).toBeInTheDocument();
  });

  it("copies the quotation and its link where there is no share sheet, and says Copied only when it was", async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    await renderEssay();

    const button = screen.getByRole("button", { name: "Share this quote" });
    expect(button.style.minHeight).toBe("44px");
    fireEvent.click(button);
    await screen.findByRole("button", { name: "Copied" });
    expect(writeText).toHaveBeenCalledWith(`${quoteShareText(QUOTE, TITLE)}\n${CANONICAL}`);
  });
});

describe("/writing/:slug, reading tools", () => {
  it("lets the reader set the text size, kept apart from Focus", async () => {
    await renderEssay();
    expect(articleBody().style.fontSize).toBe("18px");

    fireEvent.click(screen.getByRole("button", { name: "Larger text" }));
    expect(articleBody().style.fontSize).toBe("21px");
    fireEvent.click(screen.getByRole("button", { name: "Focus" }));
    expect(articleBody().style.fontSize).toBe("23px");
    expect(JSON.parse(window.localStorage.getItem("livewell-text-size") ?? "null")).toBe("larger");
  });

  it("offers Listen only where the browser has a voice, and reads the essay body", async () => {
    const first = await renderEssay();
    expect(screen.queryByRole("button", { name: /Listen/ })).not.toBeInTheDocument();
    first.unmount();

    const spoken: string[] = [];
    vi.stubGlobal("speechSynthesis", { speak: vi.fn((u: { text: string }) => spoken.push(u.text)), cancel: vi.fn(), paused: false });
    vi.stubGlobal(
      "SpeechSynthesisUtterance",
      class {
        text: string;
        constructor(text: string) {
          this.text = text;
        }
      }
    );
    await renderEssay();
    fireEvent.click(screen.getByRole("button", { name: /Listen/ }));
    expect(spoken).toEqual([`${TITLE}. By James Bell.`]);
  });
});

describe("/writing/:slug, printing", () => {
  it("prints the title, byline, and text, and nothing after the essay", async () => {
    await renderEssay();
    const article = document.querySelector("article")!;
    expect(article).toHaveClass("print-paper");

    // Printed: the essay itself.
    const title = screen.getByRole("heading", { level: 1 });
    const byline = within(title.closest("section")!).getByText("James Bell");
    for (const el of [title, byline, articleBody()]) {
      expect(el.closest(".no-print")).toBeNull();
    }
    // Not printed: the bars, the reading tools, the cover art, and all that follows the essay.
    for (const el of [
      ...sendButtons(),
      screen.getByRole("group", { name: "Reading tools" }),
      document.querySelector("article > section.no-print")!,
      screen.getByRole("button", { name: "Share this quote" }),
      screen.getByRole("complementary", { name: "About James Bell" }),
    ]) {
      expect(el.closest(".no-print"), el.textContent ?? "").not.toBeNull();
    }
  });
});
