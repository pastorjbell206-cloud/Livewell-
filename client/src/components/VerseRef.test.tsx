/**
 * VerseRef contract (master plan 7.1, U16). Link mode goes straight to the
 * Study Bible chapter. Sheet mode is a real link to the chapter that, on a
 * plain click, opens the verses in a Sheet read from the text-only shard (not
 * the full chapter), names the Berean Standard Bible with ScriptureNote, and
 * offers "Open in the Study Bible". A reference the parser cannot read is
 * plain text. The shards and the context guide page are the real ones.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { TestProviders } from "@/test/harness";
import { RefText, VerseRef } from "./VerseRef";
import { ScriptureRef } from "./ScriptureRef";
import { Markdown } from "./Markdown";
import ContextGuide from "@/pages/resources/ContextGuide";
import CreedDocument from "@/pages/resources/CreedDocument";
import CarePlan from "@/pages/plans/CarePlan";
import FamilyCatechism from "@/pages/FamilyCatechism";
import FamilyReadingPlans from "@/pages/FamilyReadingPlans";

const PUBLIC = path.resolve(__dirname, "../../public");
const json = (body: string, status = 200) => new Response(body, { status, headers: { "Content-Type": "application/json" } });

/** Paths the page asked for, so a test can say what was (and was not) downloaded. */
let asked: string[] = [];
/** Paths that answer 503 until a test clears them. */
let down = new Set<string>();
/** Extra files a test serves (a fixture guide). */
let extra: Record<string, unknown> = {};

beforeEach(() => {
  asked = [];
  down = new Set();
  extra = {};
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = new URL(String(input), "http://localhost");
      asked.push(url.pathname);
      if (down.has(url.pathname)) return json("{}", 503);
      if (url.pathname in extra) return json(JSON.stringify(extra[url.pathname]));
      const file = path.join(PUBLIC, url.pathname);
      if (/^\/(bible|context|plans|creeds)\/|^\/family-[\w-]+\.json$/.test(url.pathname) && fs.existsSync(file)) return json(fs.readFileSync(file, "utf8"));
      return json("{}", 404);
    }),
  );
});
afterEach(() => vi.unstubAllGlobals());

function renderAt(ui: ReactNode, at = "/resources/context/x") {
  const loc = memoryLocation({ path: at, record: true });
  const view = render(<Router hook={loc.hook}>{ui}</Router>);
  return { ...view, history: loc.history };
}

describe("VerseRef, link mode", () => {
  it("links to the chapter in the Study Bible, at the verse", () => {
    renderAt(<VerseRef reference="John 3:16" mode="link" />);
    expect(screen.getByRole("link", { name: "John 3:16" })).toHaveAttribute("href", "/study/bible/john/3#v16");
  });

  it("links a whole chapter to its top", () => {
    renderAt(<VerseRef reference="Psalm 23" mode="link">the shepherd psalm</VerseRef>);
    expect(screen.getByRole("link", { name: "the shepherd psalm" })).toHaveAttribute("href", "/study/bible/psalms/23");
  });
});

describe("VerseRef, an unreadable reference", () => {
  it("renders as plain text in both modes", () => {
    const { container } = renderAt(
      <p>
        <VerseRef reference="Wisdom 2:12-20" /> and <VerseRef reference="John 22:1" mode="link" /> and <VerseRef reference="" />
      </p>,
    );
    expect(container.querySelector("a")).toBeNull();
    expect(container).toHaveTextContent("Wisdom 2:12-20 and John 22:1 and");
  });
});

describe("VerseRef, sheet mode", () => {
  it("is a real link to the chapter that says it opens a dialog", () => {
    renderAt(<VerseRef reference="John 3:16" />);
    const link = screen.getByRole("link", { name: "John 3:16" });
    expect(link).toHaveAttribute("href", "/study/bible/john/3#v16");
    expect(link).toHaveAttribute("aria-haspopup", "dialog");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(asked).toEqual([]);
  });

  it("opens the verse from the text shard, names the BSB, and offers the Study Bible", async () => {
    const user = userEvent.setup();
    renderAt(<VerseRef reference="John 3:16" />);
    await user.click(screen.getByRole("link", { name: "John 3:16" }));
    const dialog = await screen.findByRole("dialog", { name: "John 3:16" });
    expect(dialog).toHaveAccessibleDescription("Berean Standard Bible");
    expect(await within(dialog).findByText(/For God so loved the world that He gave His one and only Son/)).toBeInTheDocument();
    expect(within(dialog).getByText(/Scripture quoted from the Berean Standard Bible/)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Open in the Study Bible" })).toHaveAttribute("href", "/study/bible/john/3#v16");
    // One small shard, never the 42 KB chapter with its original words.
    expect(asked).toEqual(["/bible/text/john/3.json"]);
    expect(within(dialog).queryByText(/Now there was a man of the Pharisees/)).toBeNull();
  });

  it("closes on Escape and gives focus back to the reference", async () => {
    const user = userEvent.setup();
    renderAt(<VerseRef reference="Philippians 4:6-7" />);
    const link = screen.getByRole("link", { name: "Philippians 4:6-7" });
    await user.click(link);
    await screen.findByRole("dialog", { name: "Philippians 4:6–7" });
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(screen.getByRole("link", { name: "Philippians 4:6-7" })).toHaveFocus();
  });

  it("leaves a modified click to the browser, as a link", () => {
    const stop = (e: Event) => e.preventDefault();
    document.addEventListener("click", stop);
    renderAt(<VerseRef reference="John 3:16" />);
    fireEvent.click(screen.getByRole("link", { name: "John 3:16" }), { ctrlKey: true });
    fireEvent.click(screen.getByRole("link", { name: "John 3:16" }), { metaKey: true });
    document.removeEventListener("click", stop);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("shows a passage across two chapters with each chapter named", async () => {
    const user = userEvent.setup();
    renderAt(<VerseRef reference="Romans 7:24-8:1" />);
    await user.click(screen.getByRole("link", { name: "Romans 7:24-8:1" }));
    const dialog = await screen.findByRole("dialog", { name: "Romans 7:24–8:1" });
    expect(await within(dialog).findByText("Chapter 7")).toBeInTheDocument();
    expect(within(dialog).getByText("Chapter 8")).toBeInTheDocument();
    expect(within(dialog).getByText(/What a wretched man I am/)).toBeInTheDocument();
    expect(within(dialog).getByText(/Therefore, there is now no condemnation/)).toBeInTheDocument();
    expect(within(dialog).queryByText(/I do not understand what I do/)).toBeNull();
    expect(asked.sort()).toEqual(["/bible/text/romans/7.json", "/bible/text/romans/8.json"]);
  });

  it("marks a verse the earliest manuscripts leave out", async () => {
    const user = userEvent.setup();
    renderAt(<VerseRef reference="Mark 7:15-16" />);
    await user.click(screen.getByRole("link", { name: "Mark 7:15-16" }));
    expect(await screen.findByText("[Not in the earliest manuscripts]")).toBeInTheDocument();
  });

  it("sends a passage longer than three chapters to the Study Bible without fetching it", async () => {
    const user = userEvent.setup();
    renderAt(<VerseRef reference="Genesis 1-4" />);
    await user.click(screen.getByRole("link", { name: "Genesis 1-4" }));
    const dialog = await screen.findByRole("dialog", { name: "Genesis 1–4" });
    expect(await within(dialog).findByText(/runs from chapter 1 to chapter 4\. Read it whole in the Study Bible\./)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Open in the Study Bible" })).toHaveAttribute("href", "/study/bible/genesis/1");
    expect(asked).toEqual([]);
  });

  it("says so when the chapter has no such verse", async () => {
    const user = userEvent.setup();
    renderAt(<VerseRef reference="John 3:99" />);
    await user.click(screen.getByRole("link", { name: "John 3:99" }));
    expect(await screen.findByText("This chapter has no verse by that number.")).toBeInTheDocument();
  });

  it("offers a retry when the shard does not arrive, and then shows the verse", async () => {
    const user = userEvent.setup();
    down.add("/bible/text/jude/1.json");
    renderAt(<VerseRef reference="Jude 24" />);
    await user.click(screen.getByRole("link", { name: "Jude 24" }));
    const dialog = await screen.findByRole("dialog", { name: "Jude 1:24" });
    expect(await within(dialog).findByRole("alert")).toHaveTextContent("The passage didn't load.");
    down.clear();
    await user.click(within(dialog).getByRole("button", { name: /try again/i }));
    expect(await within(dialog).findByText(/Now to Him who is able to keep you from stumbling/)).toBeInTheDocument();
  });
});

describe("RefText", () => {
  it("makes each reference in a string live and keeps the rest as written", () => {
    const { container } = renderAt(
      <p>
        <RefText text="Read Psalm 136:1-9 and 23-26 tonight, then Wisdom 2:12 if you like." />
      </p>,
    );
    const links = screen.getAllByRole("link");
    expect(links.map((a) => [a.textContent, a.getAttribute("href")])).toEqual([["Psalm 136:1-9 and 23-26", "/study/bible/psalms/136#v1"]]);
    expect(container).toHaveTextContent("Read Psalm 136:1-9 and 23-26 tonight, then Wisdom 2:12 if you like.");
  });
});

describe("Markdown verseRefs", () => {
  const md = "# Psalm 23\n\nRead **Romans 8:28** and [John 3:16](/somewhere), then Isaiah 40:31.";

  it("is off unless the page asks", () => {
    renderAt(<Markdown>{md}</Markdown>);
    expect(screen.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(["/somewhere"]);
  });

  it("turns references in prose into verse sheets, leaving links and headings alone", () => {
    const { container } = renderAt(<Markdown verseRefs="sheet">{md}</Markdown>);
    const refs = Array.from(container.querySelectorAll("a.st-verseref"));
    expect(refs.map((a) => [a.textContent, a.getAttribute("href"), a.getAttribute("aria-haspopup")])).toEqual([
      ["Romans 8:28", "/study/bible/romans/8#v28", "dialog"],
      ["Isaiah 40:31", "/study/bible/isaiah/40#v31", "dialog"],
    ]);
    expect(refs[0].closest("strong")).not.toBeNull();
    expect(screen.getByRole("link", { name: "John 3:16" })).toHaveAttribute("href", "/somewhere");
    expect(screen.getByRole("heading", { level: 1, name: "Psalm 23" }).querySelector("a")).toBeNull();
  });

  it("links straight to the Study Bible in link mode", () => {
    const { container } = renderAt(<Markdown verseRefs="link">{md}</Markdown>);
    const refs = Array.from(container.querySelectorAll("a.st-verseref"));
    expect(refs.map((a) => a.getAttribute("aria-haspopup"))).toEqual([null, null]);
    expect(refs.map((a) => a.getAttribute("href"))).toEqual(["/study/bible/romans/8#v28", "/study/bible/isaiah/40#v31"]);
  });
});

describe("ScriptureRef", () => {
  it("points at the Study Bible, not the Passage Context tool", () => {
    renderAt(<ScriptureRef reference="Romans 13:1-7" />);
    expect(screen.getByRole("link", { name: "Romans 13:1-7" })).toHaveAttribute("href", "/study/bible/romans/13#v1");
  });

  it("makes each reference in a mixed field live and keeps the note", () => {
    const { container } = renderAt(
      <>
        <ScriptureRef reference="Jonah 3:10 with Jeremiah 18:7-10" />
        <ScriptureRef reference="Acts 2 (Pentecost and Peter's sermon)" />
        <ScriptureRef reference="Wisdom 2:12-20" />
      </>,
    );
    expect(screen.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual([
      "/study/bible/jonah/3#v10",
      "/study/bible/jeremiah/18#v7",
      "/study/bible/acts/2",
    ]);
    expect(container).toHaveTextContent("Acts 2 (Pentecost and Peter's sermon)");
    expect(container).toHaveTextContent("Wisdom 2:12-20");
    expect(container.querySelector('a[href^="/theology/passage"]')).toBeNull();
  });
});

describe("a context guide (the U16 done-when)", () => {
  it("opens John 3:16 in its prose as a verse sheet with the translation named, then the Study Bible", async () => {
    const user = userEvent.setup();
    extra["/context/guides/a-guide.json"] = {
      slug: "a-guide",
      title: "A guide",
      subtitle: "A fixture guide for the verse sheet.",
      kicker: "Test",
      group: "Test",
      sections: [{ id: "one", title: "The verse", body: "Few verses are quoted more than John 3:16, and few are read with less of John 3 around them." }],
      keyTexts: ["John 3:1-21"],
    };
    const { history } = renderAt(
      <TestProviders>
        <ContextGuide />
      </TestProviders>,
      "/resources/context/a-guide",
    );
    const ref = await screen.findByRole("link", { name: "John 3:16" });
    expect(screen.getByRole("link", { name: "John 3" })).toHaveAttribute("href", "/study/bible/john/3");
    expect(screen.getByRole("link", { name: "John 3:1-21" })).toHaveAttribute("aria-haspopup", "dialog");
    await user.click(ref);
    const dialog = await screen.findByRole("dialog", { name: "John 3:16" });
    expect(await within(dialog).findByText(/For God so loved the world/)).toBeInTheDocument();
    expect(within(dialog).getByText(/Scripture quoted from the Berean Standard Bible/)).toBeInTheDocument();
    await user.click(within(dialog).getByRole("link", { name: "Open in the Study Bible" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(history[history.length - 1]).toMatch(/^\/study\/bible\/john\/3(#v16)?$/);
  });
});

describe("the other pages that gain live references (real data)", () => {
  const page = (ui: ReactNode, at: string) => renderAt(<TestProviders>{ui}</TestProviders>, at);
  const sheetLink = async (name: string) => {
    const a = await screen.findByRole("link", { name });
    expect(a).toHaveAttribute("aria-haspopup", "dialog");
    return a;
  };

  it("a care plan: the references in a week open verse sheets", async () => {
    page(<CarePlan />, "/plans/grief");
    expect(await sheetLink("John 11:35")).toHaveAttribute("href", "/study/bible/john/11#v35");
  });

  it("a creed: the references in its notes open verse sheets", async () => {
    page(<CreedDocument />, "/resources/creeds/apostles-creed");
    expect(await sheetLink("1 Peter 3:19")).toHaveAttribute("href", "/study/bible/1-peter/3#v19");
  });

  it("the reading plans: each day's passage opens in a verse sheet", async () => {
    const user = userEvent.setup();
    page(<FamilyReadingPlans />, "/family/reading-plans");
    await user.click(await screen.findByRole("button", { name: /The Life of Jesus/ }));
    expect(await sheetLink("Mark 1:1-13")).toHaveAttribute("href", "/study/bible/mark/1#v1");
  });

  it("the catechism: the verse is printed, so its reference links to the chapter", async () => {
    const user = userEvent.setup();
    page(<FamilyCatechism />, "/family/catechism");
    // Question 1 in the list (the "this week" card above may hold another).
    const buttons = await screen.findAllByRole("button", { name: /Who made you\?/ });
    await user.click(buttons[buttons.length - 1]);
    const link = await screen.findByRole("link", { name: "Genesis 1:1" });
    expect(link).toHaveAttribute("href", "/study/bible/genesis/1#v1");
    expect(link).not.toHaveAttribute("aria-haspopup");
  });
});
