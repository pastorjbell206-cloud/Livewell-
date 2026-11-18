/**
 * The things to touch on Home: the 66-book shelf, the question picker,
 * tonight at the table, and the church history strip. Each is fed by the
 * site's own files (served here from client/public), works by click and by
 * keyboard, and links only to pages that exist.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { ANSWERS } from "@/data/answers";
import { tonightOn, tonightTitle } from "@/lib/familyTable";
import BibleShelf from "./BibleShelf";
import QuestionPicker from "./QuestionPicker";
import TonightTable from "./TonightTable";
import HistoryStrip from "./HistoryStrip";
import { FIRST_LESSON } from "./historyLessons";

const PUBLIC = path.resolve(__dirname, "../../../public");

/** Answers a fetch with the file at that path under client/public, or 404. */
function publicFetch(): typeof fetch {
  return (async (input: RequestInfo | URL) => {
    const url = String(input).replace(/^https?:\/\/[^/]+/, "").split("?")[0];
    const file = path.join(PUBLIC, url);
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) return new Response("{}", { status: 404 });
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("the shelf of 66 books", () => {
  it("opens on John, names any book touched, and offers its chapters", async () => {
    vi.stubGlobal("fetch", publicFetch());
    renderWithProviders(<BibleShelf />);
    const spines = document.querySelectorAll(".hs-spine");
    expect(spines).toHaveLength(66);
    expect(screen.getByRole("button", { name: "John, 21 chapters" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Read John" })).toHaveAttribute("href", "/study/bible/john");
    // The line of purpose comes from the Study Bible's introductions.
    expect(await screen.findByText(/To lead readers to believe that Jesus is the Christ/)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Genesis, 50 chapters" }));
    expect(screen.getByRole("link", { name: "Read Genesis" })).toHaveAttribute("href", "/study/bible/genesis");
    fireEvent.click(screen.getByRole("button", { name: "Chapters" }));
    const chapters = screen.getByRole("navigation", { name: "Chapters of Genesis" });
    expect(within(chapters).getAllByRole("link")).toHaveLength(50);
    expect(within(chapters).getByRole("link", { name: "50" })).toHaveAttribute("href", "/study/bible/genesis/50");
  });

  it("moves along the shelf with the arrow keys, one tab stop for all of it", () => {
    vi.stubGlobal("fetch", publicFetch());
    renderWithProviders(<BibleShelf />);
    const john = screen.getByRole("button", { name: "John, 21 chapters" });
    expect(Array.from(document.querySelectorAll(".hs-spine")).filter((s) => s.getAttribute("tabindex") === "0")).toEqual([john]);
    fireEvent.keyDown(john, { key: "ArrowRight" });
    expect(screen.getByRole("button", { name: "Acts, 28 chapters" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyDown(john, { key: "End" });
    expect(screen.getByRole("link", { name: "Read Revelation" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Next book" }));
    expect(screen.getByRole("link", { name: "Read Genesis" })).toBeTruthy();
  });

  it("lights one kind of writing from the legend", async () => {
    vi.stubGlobal("fetch", publicFetch());
    renderWithProviders(<BibleShelf />);
    await screen.findByText(/To lead readers to believe/);
    fireEvent.click(screen.getByRole("button", { name: "Gospels" }));
    expect(document.querySelectorAll(".hs-spine.is-kind")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "Read Matthew" })).toBeTruthy();
  });
});

describe("ask it straight", () => {
  it("narrows the questions by a word and shows the start of the chosen answer", () => {
    renderWithProviders(<QuestionPicker />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /Read the whole answer/ })).toHaveAttribute("href", `/answers/${ANSWERS[0].slug}`);

    fireEvent.click(screen.getByRole("button", { name: `All ${ANSWERS.length} questions` }));
    expect(screen.getAllByRole("listitem")).toHaveLength(ANSWERS.length);

    fireEvent.change(screen.getByRole("searchbox", { name: "Find a question by a word in it" }), { target: { value: "zzzz" } });
    expect(screen.getByRole("status")).toHaveTextContent("No question uses that word yet.");

    const last = ANSWERS[ANSWERS.length - 1];
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: last.question } });
    fireEvent.click(screen.getByRole("button", { name: last.question }));
    expect(screen.getByRole("link", { name: /Read the whole answer/ })).toHaveAttribute("href", `/answers/${last.slug}`);
  });
});

describe("tonight at the table", () => {
  it("opens tonight's devotion in Read, Talk and Pray, with the catechism card", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 27, 12));
    vi.stubGlobal("fetch", publicFetch());
    renderWithProviders(<TonightTable />);
    const t = tonightOn("2026-10-27")!;
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(tonightTitle(t)!);
    expect(screen.getByRole("link", { name: /Open tonight's devotion/ })).toHaveAttribute("href", `/family/devotions/${t.id}`);

    const pane = screen.getByRole("tabpanel");
    // Read: the passage, quoted, with its reference.
    expect(await within(pane).findByText(/^“/)).toBeTruthy();
    fireEvent.click(screen.getByRole("tab", { name: "Talk" }));
    expect(screen.getByRole("tab", { name: "Talk" })).toHaveAttribute("aria-selected", "true");
    expect(within(pane).getByText(/Question 1 of/)).toBeTruthy();
    fireEvent.keyDown(screen.getByRole("tab", { name: "Talk" }), { key: "ArrowRight" });
    expect(screen.getByRole("tab", { selected: true })).not.toHaveTextContent("Talk");

    const card = await screen.findByRole("button", { name: /Catechism, question/ });
    fireEvent.click(card);
    expect(card).toHaveTextContent("The answer");
  });
});

describe("two thousand years on one line", () => {
  it("shows seven ages, each opening its first lesson and its events", async () => {
    vi.stubGlobal("fetch", publicFetch());
    renderWithProviders(<HistoryStrip />);
    const ages = await screen.findAllByRole("button", { pressed: false });
    expect(document.querySelectorAll(".hh-era")).toHaveLength(7);
    expect(ages.length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("The Apostolic Age");
    expect(screen.getByRole("link", { name: /Lesson 1/ })).toHaveAttribute("href", "/theology/history/the-apostolic-age");

    fireEvent.click(screen.getByRole("button", { name: /^The Reformation,/ }));
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("The Reformation");
    expect(screen.getByRole("link", { name: /Lesson 10/ })).toHaveAttribute("href", "/theology/history/the-reformation");
    const ev = document.querySelector<HTMLButtonElement>(".hh-ev")!;
    fireEvent.click(ev);
    expect(ev).toHaveAttribute("aria-expanded", "true");
    expect(ev.querySelector(".hh-note")?.textContent?.length).toBeGreaterThan(10);
  });

  it("names a real course lesson for every age", () => {
    const course = JSON.parse(fs.readFileSync(path.join(PUBLIC, "history/essays-index.json"), "utf8")).essays as { slug: string; course?: number }[];
    const eras = JSON.parse(fs.readFileSync(path.join(PUBLIC, "theology/church-history-timeline.json"), "utf8")).eras as { id: string }[];
    for (const e of eras) {
      const slug = FIRST_LESSON[e.id];
      expect(course.find((c) => c.slug === slug)?.course, e.id).toBeGreaterThan(0);
    }
  });
});
