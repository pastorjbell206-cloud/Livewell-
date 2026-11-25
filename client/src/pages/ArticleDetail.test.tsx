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

import { renderWithProviders, offlineFetch, untilDrawn } from "@/test/harness";
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

/**
 * The essay page, drawn. ArticleDetail takes the essay as a deferred value,
 * which React draws in slices; a one-second findBy ran its clock between them
 * and, on a busy machine, gave up before the essay was drawn. untilDrawn waits
 * for the drawing itself (test/harness.tsx); the heading is then checked once.
 */
async function renderEssay() {
  window.history.pushState({}, "", `/writing/${SLUG}`);
  const view = renderWithProviders(
    <Switch>
      <Route path="/writing/:slug" component={ArticleDetail} />
    </Switch>
  );
  await untilDrawn(() => document.querySelector("h1")?.textContent === TITLE);
  expect(screen.getByRole("heading", { level: 1, name: TITLE })).toBeInTheDocument();
  return view;
}

const sendButtons = () => screen.getAllByRole("button", { name: /Send to my phone/ });
/** Open "Aa" (text size and Focus) above the essay, and Share after it. */
const openAa = () => fireEvent.click(screen.getByRole("button", { name: "Text size and focus" }));
const openShare = () => fireEvent.click(screen.getByRole("button", { name: "Share" }));
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
  it("keeps the head to the title block: Listen and Aa above the text, Save, Share and Print after it", async () => {
    await renderEssay();
    const header = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(within(header).queryAllByRole("button")).toHaveLength(0);

    // Above the text: two controls only, Listen and Aa.
    const tools = screen.getByRole("group", { name: "Reading tools" });
    // (Listen shows only where the browser has a voice; this one has none.)
    expect(within(tools).getAllByRole("button").map((b) => b.getAttribute("aria-label") ?? b.textContent?.trim())).toEqual(["AaText size and focus"]);
    expect(within(tools).queryByRole("button", { name: /^(Save|Saved)$/ })).toBeNull();

    // After the text: one row of Save, Share, Print.
    const end = screen.getByRole("group", { name: "Keep or pass on this essay" });
    expect(articleBody().compareDocumentPosition(end) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(saveButtons()).toHaveLength(1);
    expect(end.contains(saveButtons()[0])).toBe(true);
    expect(within(end).getByRole("button", { name: /Print/ })).toBeInTheDocument();
    expect(within(end).queryByRole("button", { name: /Send to my phone/ })).toBeNull();

    // Share holds every way to pass it on: nothing that was here is lost.
    openShare();
    const share = screen.getByRole("region", { name: "Share this essay" });
    expect(sendButtons()).toHaveLength(1);
    expect(share.contains(sendButtons()[0])).toBe(true);
    for (const name of [/Cite this/, /Send to…/, /Copy link/]) expect(within(share).getByRole("button", { name })).toBeInTheDocument();
    expect(within(share).getByRole("link", { name: "Share on Facebook" })).toBeInTheDocument();
  });

  it("saves to My Library, and says so", async () => {
    await renderEssay();
    fireEvent.click(saveButtons()[0]);

    await waitFor(() => expect(saveButtons().map((b) => b.textContent)).toEqual(["Saved"]));
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
    expect(saveButtons().map((b) => b.textContent)).toEqual(["Saved"]);
  });

  it("keeps every action reachable in Focus mode", async () => {
    await renderEssay();
    openAa();
    fireEvent.click(screen.getByRole("button", { name: "Focus" }));

    expect(screen.getByRole("button", { name: "Exit focus" })).toBeInTheDocument();
    expect(saveButtons()).toHaveLength(1);
    openShare();
    expect(sendButtons()).toHaveLength(1);
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
    // The size itself is a token (--fs-read); the reader's choice scales it.
    const scale = () => articleBody().style.getPropertyValue("--read-scale");
    expect(scale()).toBe("1");
    expect(articleBody().style.fontSize).toBe("");

    openAa();
    fireEvent.click(screen.getByRole("button", { name: "Larger text" }));
    expect(scale()).toBe("1.15");
    fireEvent.click(screen.getByRole("button", { name: "Focus" }));
    expect(scale()).toBe("1.15");
    expect(document.querySelector("article")).toHaveClass("lw-reading-focus");
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
    openShare();
    for (const el of [
      ...sendButtons(),
      screen.getByRole("group", { name: "Reading tools" }),
      screen.getByRole("button", { name: "Share this quote" }),
      screen.getByRole("link", { name: "Share on Facebook" }),
      screen.getByRole("heading", { name: "New essays by email, through Substack" }),
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

  it("starts the contents line closed on a phone and on a wider screen alike", async () => {
    vi.stubGlobal("fetch", vi.fn(essayFetch({ body: SECTIONS })));
    const contents = () => screen.getByRole("navigation", { name: "In this essay" }).querySelector("details")!;

    screenWidth(true);
    const phone = await renderEssay();
    await waitFor(() => expect(contents()).toBeInTheDocument());
    expect(contents().open).toBe(false);
    // Closed, the summary is the line's one door, a full 44px tap target.
    expect(contents().querySelector("summary")!.style.minHeight).toBe("44px");
    phone.unmount();

    screenWidth(false);
    await renderEssay();
    await waitFor(() => expect(contents()).toBeInTheDocument());
    expect(contents().open).toBe(false);
  });

  it("keeps the reading tools one group, whose Text size word a phone may hide", async () => {
    await renderEssay();
    const tools = screen.getByRole("group", { name: "Reading tools" });
    expect(tools).toHaveClass("essay-tools");
    openAa();
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
