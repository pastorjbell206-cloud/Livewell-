/**
 * The essay page as a reader on a phone meets it: save and send under the
 * byline and again after the essay, no art between the header and the first
 * sentence, the contents card closed on a phone, one save store (My Library)
 * that also honors the older bookmarks, quote sharing that never signs the
 * words with James's name, actions that stay in Focus mode, a text size of
 * the reader's own, Listen, Crossway's notice where the essay owes it, and a
 * print that is the essay alone.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import superjson from "superjson";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { LEGACY_BOOKMARKS_KEY, LIBRARY_KEY } from "@/lib/library";
import { ESV_NOTICE } from "@/lib/esv";
import ArticleDetail, { quoteShareText, splitAtFirstSection } from "./ArticleDetail";

const SLUG = "when-the-church-married-empire";
const TITLE = "When the Church Married Empire";
const CANONICAL = `https://www.livewellbyjamesbell.co/writing/${SLUG}`;
const QUOTE = "I can do all things through him who strengthens me.";

const BODY =
  "The first paragraph of the essay itself, long enough to read as prose and carry a drop cap.\n\n" +
  `> ${QUOTE}\n\n` +
  "## The Long Arc\n\nA second paragraph after the heading.";

/**
 * Answers posts.getBySlug with a live shelf essay (any of its fields replaced
 * per test); every other call is offline.
 */
function essayFetch(post: Record<string, unknown> = {}): typeof fetch {
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
                body: BODY,
                ...post,
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
  it("puts save and send under the byline and again after the essay", async () => {
    await renderEssay();
    const [top, bottom] = sendButtons();
    expect(sendButtons()).toHaveLength(2);

    const header = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(header.contains(top)).toBe(true);
    expect(top.compareDocumentPosition(articleBody()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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
    // Not printed: the bars, the reading tools, and all that follows the essay.
    for (const el of [
      ...sendButtons(),
      screen.getByRole("group", { name: "Reading tools" }),
      screen.getByRole("button", { name: "Share this quote" }),
      screen.getByRole("complementary", { name: "About James Bell" }),
    ]) {
      expect(el.closest(".no-print"), el.textContent ?? "").not.toBeNull();
    }
  });
});

describe("/writing/:slug, the first screen on a phone", () => {
  const SECTIONS = "Opening words, the first sentence of the essay.\n\n## One\n\nA.\n\n## Two\n\nB.\n\n## Three\n\nC.";

  /** A screen that is, or is not, at most 760px wide. */
  function screenWidth(phone: boolean) {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(max-width: 760px)" ? phone : false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }));
  }

  it("goes from the header straight to the essay, with no art before the first sentence", async () => {
    await renderEssay();
    const header = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(header.nextElementSibling?.contains(articleBody())).toBe(true);
    expect(articleBody().querySelector("img")).toBeNull();
  });

  it("puts a real cover after the opening section, never ahead of the text or on paper", async () => {
    vi.stubGlobal("fetch", vi.fn(essayFetch({ coverImage: "/images/cover.jpg" })));
    await renderEssay();
    const img = articleBody().querySelector<HTMLImageElement>("img")!;
    expect(img).toHaveAttribute("src", "/images/cover.jpg");
    expect(img.closest(".no-print")).not.toBeNull();
    const firstParagraph = articleBody().querySelector("p")!;
    const firstSection = screen.getByRole("heading", { level: 2, name: "The Long Arc" });
    expect(firstParagraph.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(img.compareDocumentPosition(firstSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // Both halves sit in the one body, so the drop cap still falls on the first paragraph alone.
    expect(firstParagraph.parentElement).toBe(articleBody());
    expect(firstSection.parentElement).toBe(articleBody());
  });

  it("starts the contents card closed on a phone and open on a wider screen", async () => {
    vi.stubGlobal("fetch", vi.fn(essayFetch({ body: SECTIONS })));
    const contents = () => screen.getByRole("navigation", { name: "In this essay" }).querySelector("details")!;

    screenWidth(true);
    const phone = await renderEssay();
    await waitFor(() => expect(contents()).toBeInTheDocument());
    expect(contents().open).toBe(false);
    phone.unmount();

    screenWidth(false);
    await renderEssay();
    await waitFor(() => expect(contents()).toBeInTheDocument());
    expect(contents().open).toBe(true);
  });

  it("keeps the reading tools one group, whose Text size word a phone may hide", async () => {
    await renderEssay();
    const tools = screen.getByRole("group", { name: "Reading tools" });
    expect(tools).toHaveClass("essay-tools");
    const size = within(tools).getByRole("group", { name: "Text size" });
    expect(size.querySelector(".text-size__label")).toHaveTextContent("Text size");
  });
});

describe("/writing/:slug, Crossway's notice", () => {
  it("is not claimed for an older essay that quotes Scripture without naming its translation", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(essayFetch({ body: 'Opening words.\n\n"Appoint for us a king to judge us like all the nations" (1 Samuel 8:5).' }))
    );
    await renderEssay();
    expect(screen.queryByText(ESV_NOTICE)).not.toBeInTheDocument();
  });

  it("follows an essay that names the ESV, after the body, and prints with it", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(essayFetch({ body: 'Opening words.\n\nThe ESV reads, "seek the welfare of the city" (Jeremiah 29:7).' }))
    );
    await renderEssay();
    const notice = screen.getByText(ESV_NOTICE);
    expect(articleBody().contains(notice)).toBe(false);
    expect(articleBody().compareDocumentPosition(notice) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(notice.closest(".no-print")).toBeNull();
  });
});

describe("splitAtFirstSection", () => {
  it("splits on the first section heading", () => {
    expect(splitAtFirstSection("Intro.\n\n## One\n\nA.\n\n## Two\n\nB.")).toEqual(["Intro.\n\n", "## One\n\nA.\n\n## Two\n\nB."]);
  });

  it("leaves the essay whole with no section heading, a heading first, or footnote definitions", () => {
    expect(splitAtFirstSection("Intro only.")).toEqual(["Intro only.", ""]);
    expect(splitAtFirstSection("## One\n\nA.")).toEqual(["## One\n\nA.", ""]);
    expect(splitAtFirstSection("Intro.\n\n### Sub\n\nA.")).toEqual(["Intro.\n\n### Sub\n\nA.", ""]);
    const notes = "Intro.[^1]\n\n## One\n\nA.\n\n[^1]: A note.";
    expect(splitAtFirstSection(notes)).toEqual([notes, ""]);
  });
});
