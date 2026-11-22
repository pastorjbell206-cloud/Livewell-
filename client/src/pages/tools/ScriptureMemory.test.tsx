/**
 * Memorize Scripture (/tools/scripture-memory): the verses are the Berean
 * Standard Bible word for word from the site's own files; a verse is learned
 * by hiding its words a few more at each step; "I had it" sends it out to its
 * next review day and "Not yet" to tomorrow; the open verse and its step
 * survive a reload; a verse of the reader's own is read from the Bible files;
 * a family learns the catechism's verses; the verses print as cards; and the
 * page says so when the browser will not keep the work.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import verses from "@/data/memory-verses.json";
import sets from "@/data/memory-sets.json";
import {
  HIDE_STEPS,
  INTERVALS,
  MEMORY_KEY,
  OLD_MEMORY_KEY,
  addDays,
  blank,
  daysBetween,
  dueToday,
  hiddenAt,
  isKnown,
  isMemoryState,
  missed,
  readMemory,
  recalled,
  started,
  whenDue,
  wordsOf,
  type MemoryState,
} from "@/lib/scriptureMemory";
import ScriptureMemory from "./ScriptureMemory";

const ROOT = path.resolve(__dirname, "../../../..");
const PUBLIC = path.join(ROOT, "client/public");
const SERVED = /^(family-catechism\.json|bible\/text\/[a-z0-9-]+\/\d+\.json)$/;

function serve(online = true) {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (online && SERVED.test(name) && fs.existsSync(path.join(PUBLIC, name))) return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      return base(input, init);
    }),
  );
}

function at(when: Date) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(when);
}

const kept = (): MemoryState => JSON.parse(window.localStorage.getItem(MEMORY_KEY)!);
const FIRST = verses.sets[0].verses[0];

beforeEach(() => {
  window.localStorage.clear();
  serve();
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

describe("the verses", () => {
  it("are forty, in eight sets of five, each with a next page", () => {
    expect(verses.sets).toHaveLength(8);
    for (const s of verses.sets) {
      expect(s.verses).toHaveLength(5);
      expect(s.next?.href).toMatch(/^\/wisdom\//);
    }
    expect(sets.sets.flatMap((s) => s.refs)).toEqual(verses.sets.flatMap((s) => s.verses.map((v) => v.ref)));
  });

  it("are the Berean Standard Bible word for word, from the site's own files", () => {
    for (const v of verses.sets.flatMap((s) => s.verses)) {
      const m = /^(.*) (\d+):(\d+)(?:-(\d+))?$/.exec(v.ref)!;
      const slug = m[1] === "Psalm" ? "psalms" : m[1].toLowerCase().replace(/ /g, "-");
      const chapter = JSON.parse(fs.readFileSync(path.join(PUBLIC, "bible/text", slug, `${m[2]}.json`), "utf8"));
      const whole: string = chapter.verses.filter((x: { v: number }) => x.v >= +m[3] && x.v <= +(m[4] ?? m[3])).map((x: { t: string }) => x.t).join(" ");
      // The verse printed alone may lose a psalm's heading, a stray quotation mark or a trailing comma, never a word.
      const words = (s: string) => s.replace(/[^A-Za-z0-9\s]/g, "").split(/\s+/).filter(Boolean).join(" ");
      expect(words(whole).endsWith(words(v.text)), v.ref).toBe(true);
      expect(v.text).not.toMatch(/—/);
    }
  });

  it("are up to date with their references (the builder's --check)", () => {
    const r = spawnSync(process.execPath, [path.join(ROOT, "scripts/build-memory-verses.mjs"), "--check"], { cwd: ROOT, encoding: "utf8" });
    expect(r.status, `${r.stdout}${r.stderr}`).toBe(0);
  });
});

describe("the schedule", () => {
  it("sends a recalled verse out by a day, three, a week, two weeks, a month, and a missed one to tomorrow", () => {
    let l = started("2026-11-22");
    expect(l).toEqual({ stage: 0, due: "2026-11-22" });
    const gaps: number[] = [];
    let day = "2026-11-22";
    for (let i = 0; i < 6; i++) {
      l = recalled(l, day);
      gaps.push(daysBetween(day, l.due));
      day = l.due;
    }
    expect(gaps).toEqual([1, 3, 7, 14, 30, 30]);
    expect(isKnown(l)).toBe(true);
    expect(missed(l, "2027-03-01")).toMatchObject({ stage: 0, due: "2027-03-02" });
    expect(INTERVALS).toEqual([1, 3, 7, 14, 30]);
  });

  it("counts calendar days across a month's end and a clock change", () => {
    expect(addDays("2026-11-30", 1)).toBe("2026-12-01");
    expect(addDays("2026-10-31", 3)).toBe("2026-11-03");
    expect(daysBetween("2026-12-30", "2027-01-02")).toBe(3);
    expect(whenDue({ stage: 1, due: "2026-11-23" }, "2026-11-22")).toBe("Back tomorrow");
    expect(whenDue({ stage: 2, due: "2026-11-28" }, "2026-11-22")).toBe("Back in 6 days");
    expect(whenDue({ stage: 2, due: "2026-11-20" }, "2026-11-22")).toBe("Due today");
  });

  it("lists what is due, the longest overdue first", () => {
    const state: MemoryState = { v: 2, verses: { a: { stage: 1, due: "2026-11-22" }, b: { stage: 2, due: "2026-11-19" }, c: { stage: 1, due: "2026-11-23" } } };
    expect(dueToday(state, "2026-11-22")).toEqual(["b", "a"]);
  });

  it("refuses a kept state of the wrong shape, and carries the first version's list across as verses to check again", () => {
    expect(isMemoryState({ v: 2, verses: { a: { stage: 9, due: "2026-11-22" } } })).toBe(false);
    expect(isMemoryState({ v: 2, verses: { a: { stage: 1, due: "tomorrow" } } })).toBe(false);
    expect(isMemoryState({ v: 2, verses: {}, at: { ref: "a", step: 99 } })).toBe(false);
    window.localStorage.setItem(OLD_MEMORY_KEY, JSON.stringify([FIRST.ref, "A verse no longer taught 1:1"]));
    const got = readMemory("2026-11-22", new Set([FIRST.ref]));
    expect(got.verses).toEqual({ [FIRST.ref]: { stage: 1, due: "2026-11-22" } });
  });
});

describe("hiding the words", () => {
  it("hides none, then more at each step, then all, and never brings a hidden word back", () => {
    const text = FIRST.text;
    const n = wordsOf(text).length;
    let before = hiddenAt(text, 0);
    expect(before.filter(Boolean)).toHaveLength(0);
    for (let step = 1; step < HIDE_STEPS.length; step++) {
      const now = hiddenAt(text, step);
      expect(now.filter(Boolean)).toHaveLength(Math.ceil(n * HIDE_STEPS[step]));
      before.forEach((h, i) => h && expect(now[i]).toBe(true));
      before = now;
    }
    expect(before.every(Boolean)).toBe(true);
    expect(hiddenAt(text, 2)).toEqual(hiddenAt(text, 2));
  });

  it("draws a hidden word as a line and keeps its punctuation", () => {
    expect(blank("anxious,")).toBe("_______,");
    expect(blank("“Be")).toBe("“__");
    expect(blank("a")).toBe("__");
  });
});

describe("the page", () => {
  it("walks a verse from reading to memory, marks it kept, and names where to go next", async () => {
    at(new Date(2026, 10, 22, 9));
    renderWithProviders(<ScriptureMemory />);
    expect(screen.getByText(/Nothing yet\. Choose one verse below/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: `Learn this verse: ${FIRST.ref}` }));
    const panel = screen.getByRole("heading", { name: FIRST.ref }).closest("section")!;
    expect(within(panel).getByText(/Step 1 of 5\./)).toBeInTheDocument();
    expect(panel.querySelectorAll(".sm-gap")).toHaveLength(0);
    // While it is being practiced, the verse is not printed in the lists under it.
    expect(screen.getAllByText("The verse you are practicing, above.").length).toBeGreaterThan(0);
    expect(document.querySelectorAll(".sm-row__text").length).toBeGreaterThan(0);
    for (const el of Array.from(document.querySelectorAll(".sm-row__text"))) expect(el.textContent).not.toBe(FIRST.text);

    const total = wordsOf(FIRST.text).length;
    for (let step = 1; step < HIDE_STEPS.length; step++) {
      fireEvent.click(within(panel).getByRole("button", { name: "Hide more words" }));
      expect(panel.querySelectorAll(".sm-gap")).toHaveLength(Math.ceil(total * HIDE_STEPS[step]));
    }
    expect(within(panel).queryByRole("button", { name: "Hide more words" })).toBeNull();
    // A hidden word can be looked at.
    fireEvent.click(panel.querySelectorAll(".sm-gap")[0]);
    expect(panel.querySelectorAll(".sm-gap")).toHaveLength(total - 1);

    fireEvent.click(within(panel).getByRole("button", { name: "Show the verse" }));
    expect(panel.querySelectorAll(".sm-gap")).toHaveLength(0);
    fireEvent.click(within(panel).getByRole("button", { name: "I had it" }));
    expect(within(panel).getByText(/comes back tomorrow/)).toBeInTheDocument();
    expect(kept().verses[FIRST.ref]).toEqual({ stage: 1, due: "2026-11-23" });

    const next = within(panel).getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(next).toContain("/study/bible/philippians/4#v6");
    expect(next).toContain(verses.sets[0].next!.href);
    expect(within(panel).getByText(/Berean Standard Bible/)).toBeInTheDocument();
  });

  it("sends a verse marked Not yet to tomorrow and offers the steps again", () => {
    at(new Date(2026, 10, 22, 9));
    window.localStorage.setItem(MEMORY_KEY, JSON.stringify({ v: 2, verses: { [FIRST.ref]: { stage: 3, due: "2026-11-22" } }, at: null }));
    renderWithProviders(<ScriptureMemory />);
    expect(screen.getByText("1 verse is due. Say each from memory before you look.")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: `Review: ${FIRST.ref}` })[0]);
    // A verse already carried opens with every word hidden.
    expect(screen.getByText(/Step 5 of 5\./)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show the verse" }));
    fireEvent.click(screen.getByRole("button", { name: "Not yet" }));
    expect(kept().verses[FIRST.ref]).toEqual({ stage: 0, due: "2026-11-23" });
    fireEvent.click(screen.getByRole("button", { name: "Go through the steps again" }));
    expect(screen.getByText(/Step 1 of 5\./)).toBeInTheDocument();
  });

  it("comes back to the open verse and its step after a reload", () => {
    at(new Date(2026, 10, 22, 9));
    const first = renderWithProviders(<ScriptureMemory />);
    fireEvent.click(screen.getByRole("button", { name: `Learn this verse: ${FIRST.ref}` }));
    fireEvent.click(screen.getByRole("button", { name: "Hide more words" }));
    fireEvent.click(screen.getByRole("button", { name: "Hide more words" }));
    expect(kept().at).toEqual({ ref: FIRST.ref, step: 2 });
    first.unmount();

    renderWithProviders(<ScriptureMemory />);
    expect(screen.getByText("Picked up where you left off")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: FIRST.ref })).toBeInTheDocument();
    expect(screen.getByText(/Step 3 of 5\./)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Back to the verses" }));
    expect(screen.queryByRole("heading", { name: FIRST.ref })).toBeNull();
    expect(kept().at).toBeNull();
  });

  it("brings a verse back on its day, and not before", () => {
    window.localStorage.setItem(MEMORY_KEY, JSON.stringify({ v: 2, verses: { [FIRST.ref]: { stage: 2, due: "2026-11-25" } }, at: null }));
    at(new Date(2026, 10, 24, 9));
    const early = renderWithProviders(<ScriptureMemory />);
    expect(screen.getByText(/Nothing is due today\. You are learning 1 verse/)).toBeInTheDocument();
    early.unmount();
    vi.setSystemTime(new Date(2026, 10, 25, 9));
    renderWithProviders(<ScriptureMemory />);
    expect(screen.getByText("1 verse is due. Say each from memory before you look.")).toBeInTheDocument();
  });

  it("learns a verse of the reader's own, read from the Bible files", async () => {
    at(new Date(2026, 10, 22, 9));
    renderWithProviders(<ScriptureMemory />);
    fireEvent.change(screen.getByLabelText("Reference"), { target: { value: "john 3:16" } });
    fireEvent.click(screen.getByRole("button", { name: "Learn it" }));
    await screen.findByRole("heading", { name: "John 3:16" });
    const text = JSON.parse(fs.readFileSync(path.join(PUBLIC, "bible/text/john/3.json"), "utf8")).verses.find((v: { v: number }) => v.v === 16).t;
    expect(kept().verses["John 3:16"]).toEqual({ stage: 0, due: "2026-11-22", text, from: "own" });
    expect(screen.getByText("Your own verse")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Stop learning this verse" }));
    expect(kept().verses["John 3:16"]).toBeUndefined();
  });

  it("says plainly why a reference cannot be learned", async () => {
    renderWithProviders(<ScriptureMemory />);
    const field = screen.getByLabelText("Reference");
    fireEvent.change(field, { target: { value: "Hezekiah 3:1" } });
    fireEvent.click(screen.getByRole("button", { name: "Learn it" }));
    expect(await screen.findByText(/isn't a reference this page can read/)).toBeInTheDocument();
    fireEvent.change(field, { target: { value: "Psalm 119:1-40" } });
    fireEvent.click(screen.getByRole("button", { name: "Learn it" }));
    expect(await screen.findByText(/Choose 6 verses or fewer/)).toBeInTheDocument();
    fireEvent.change(field, { target: { value: "John 3:40-41" } });
    fireEvent.click(screen.getByRole("button", { name: "Learn it" }));
    expect(await screen.findByText(/doesn't have those verses/)).toBeInTheDocument();
    serve(false);
    fireEvent.change(field, { target: { value: "Romans 12:1" } });
    fireEvent.click(screen.getByRole("button", { name: "Learn it" }));
    expect(await screen.findByText(/The Bible text didn't load/)).toBeInTheDocument();
  });

  it("offers a family the catechism's verses, each with its question", async () => {
    at(new Date(2026, 10, 22, 9));
    const catechism = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family-catechism.json"), "utf8"));
    renderWithProviders(<ScriptureMemory />);
    fireEvent.click(screen.getByRole("button", { name: "Show the catechism's verses" }));
    expect(await screen.findByText(`Question 1: ${catechism[0].question}`)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: `Learn this verse: ${catechism[0].scripture}` }));
    expect(screen.getByText("A catechism verse")).toBeInTheDocument();
    expect(kept().verses[catechism[0].scripture]).toEqual({ stage: 0, due: "2026-11-22", text: catechism[0].scriptureText, from: "family" });
  });

  it("offers a retry when the catechism's verses will not load", async () => {
    serve(false);
    renderWithProviders(<ScriptureMemory />);
    fireEvent.click(screen.getByRole("button", { name: "Show the catechism's verses" }));
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    serve(true);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    await waitFor(() => expect(screen.getByText(/^Question 1:/)).toBeInTheDocument());
  });

  it("prints the verses being learned as cards", () => {
    const print = vi.fn();
    vi.stubGlobal("print", print);
    window.localStorage.setItem(MEMORY_KEY, JSON.stringify({ v: 2, verses: { [FIRST.ref]: { stage: 2, due: "2099-01-01" } }, at: null }));
    renderWithProviders(<ScriptureMemory />);
    fireEvent.click(screen.getByRole("button", { name: "Print my verses as cards" }));
    expect(print).toHaveBeenCalledTimes(1);
    const cards = document.querySelectorAll(".sm-card");
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toContain(FIRST.text);
  });

  it("says so when the browser will not keep the work, and keeps working", () => {
    renderWithProviders(<ScriptureMemory />);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("full");
    });
    fireEvent.click(screen.getByRole("button", { name: `Learn this verse: ${FIRST.ref}` }));
    expect(screen.getByRole("heading", { name: FIRST.ref })).toBeInTheDocument();
    expect(screen.getByText(SAVE_FAILED)).toBeInTheDocument();
  });
});
