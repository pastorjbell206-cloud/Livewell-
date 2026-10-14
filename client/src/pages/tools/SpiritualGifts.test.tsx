/**
 * The Spiritual Gifts Self-Check keeps its promises: reverse-worded statements
 * score the other way, every area at every level and every overall band has
 * its own reading at the length 7.2 asks for, the results read the reader's
 * own answers area by area, the note on the miraculous gifts appears before
 * and after, and the answers are saved only to this browser.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { TestProviders } from "@/test/harness";
import SpiritualGifts, {
  AREAS,
  BANDS,
  ITEMS,
  SCALE,
  STORAGE_KEY,
  areaScore,
  bandFor,
  itemPoints,
  levelFor,
  mixedAreas,
  type Item,
} from "./SpiritualGifts";

function renderPage() {
  const { hook } = memoryLocation({ path: "/tools/spiritual-gifts" });
  return render(
    <TestProviders>
      <Router hook={hook}>
        <SpiritualGifts />
      </Router>
    </TestProviders>,
  );
}

const words = (s: string) => s.trim().split(/\s+/).length;
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Answer all four parts through the page itself, then open the results. */
function answerAll(raw: (item: Item) => number) {
  for (let part = 0; part < 4; part++) {
    for (const item of ITEMS.slice(part * 8, part * 8 + 8)) {
      const group = screen.getByRole("group", { name: new RegExp(escape(item.text)) });
      const label = SCALE.find((s) => s.value === raw(item))!.label;
      fireEvent.click(within(group).getByRole("radio", { name: label }));
    }
    fireEvent.click(screen.getByRole("button", { name: part < 3 ? "Next part" : "See my results" }));
  }
}

const area = (name: string) => screen.getByRole("region", { name });

describe("the instrument", () => {
  it("has 32 statements in 8 areas, four each, one of them reverse-worded", () => {
    expect(ITEMS).toHaveLength(32);
    expect(AREAS).toHaveLength(8);
    for (const a of AREAS) {
      const items = ITEMS.filter((i) => i.area === a.id);
      expect(items).toHaveLength(4);
      expect(items.filter((i) => i.reverse)).toHaveLength(1);
    }
  });

  it("gives every area at every level its own reading, two or three steps, and two or three live pages", () => {
    const seen = new Set<string>();
    for (const a of AREAS) {
      for (const level of ["clear", "some", "few"] as const) {
        const g = a.levels[level];
        expect(words(g.interpretation), `${a.id}/${level}`).toBeGreaterThanOrEqual(80);
        expect(words(g.interpretation), `${a.id}/${level}`).toBeLessThanOrEqual(150);
        expect(g.steps.length).toBeGreaterThanOrEqual(2);
        expect(g.steps.length).toBeLessThanOrEqual(3);
        expect(g.next.length).toBeGreaterThanOrEqual(2);
        expect(g.next.length).toBeLessThanOrEqual(3);
        for (const n of g.next) expect(n.href).toMatch(/^\/[a-z]/);
        expect(seen.has(g.interpretation), "never the same paragraph twice").toBe(false);
        seen.add(g.interpretation);
      }
    }
  });

  it("gives every overall band 150 to 300 words", () => {
    for (const [id, band] of Object.entries(BANDS)) {
      const n = band.paragraphs.reduce((sum, p) => sum + words(p), 0);
      expect(n, id).toBeGreaterThanOrEqual(150);
      expect(n, id).toBeLessThanOrEqual(300);
    }
  });
});

describe("scoring", () => {
  const forward = ITEMS.find((i) => i.area === "teaching" && !i.reverse)!;
  const reverse = ITEMS.find((i) => i.area === "teaching" && i.reverse)!;

  it("scores a reverse-worded statement as 6 minus the answer", () => {
    expect(itemPoints(forward, 5)).toBe(5);
    expect(itemPoints(reverse, 5)).toBe(1);
    expect(itemPoints(reverse, 1)).toBe(5);
    expect(itemPoints(reverse, 3)).toBe(3);
  });

  it("adds an area's four statements and reads the level from the total", () => {
    const all = (n: number) => Object.fromEntries(ITEMS.map((i) => [i.id, n]));
    expect(areaScore("teaching", all(5))).toBe(16); // 5 + 5 + 5 + (6 - 5)
    expect(areaScore("teaching", all(3))).toBe(12);
    expect(areaScore("teaching", all(1))).toBe(8); // 1 + 1 + 1 + (6 - 1)
    expect(levelFor(16)).toBe("clear");
    expect(levelFor(15)).toBe("some");
    expect(levelFor(10)).toBe("some");
    expect(levelFor(9)).toBe("few");
  });

  it("reads the overall band from how many areas are clear, not from a total", () => {
    expect(bandFor(["clear", "clear", "clear", "few", "few", "few", "few", "few"])).toBe("several");
    expect(bandFor(["clear", "few", "few", "few", "few", "few", "few", "few"])).toBe("one-or-two");
    expect(bandFor(["some", "some", "some", "few", "few", "few", "few", "few"])).toBe("some");
    expect(bandFor(["some", "some", "few", "few", "few", "few", "few", "few"])).toBe("untried");
  });

  it("names an area where a statement and its opposite were both called true", () => {
    const allFive = Object.fromEntries(ITEMS.map((i) => [i.id, 5]));
    expect(mixedAreas(allFive)).toHaveLength(8);
    const honest = Object.fromEntries(ITEMS.map((i) => [i.id, i.reverse ? 2 : 4]));
    expect(mixedAreas(honest)).toEqual([]);
  });
});

describe("SpiritualGifts", () => {
  beforeEach(() => window.localStorage.clear());

  it("says on the first screen what it is, and what it leaves out", () => {
    renderPage();
    expect(screen.getByText(/This is a self-check for reflection, not a test or a diagnosis, and your answers stay on this device\./)).toBeInTheDocument();
    const scope = screen.getByRole("region", { name: "What this self-check leaves out, and why" });
    expect(within(scope).getByText(/Continuationists/)).toBeInTheDocument();
    expect(within(scope).getByText(/Cessationists/)).toBeInTheDocument();
    expect(within(scope).getByText(/take it to a pastor in your own church/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Answer all eight to go on/ })).toBeDisabled();
  });

  it("reads teaching and hospitality as clear and the rest as few", () => {
    renderPage();
    const strong = (i: Item) => i.area === "teaching" || i.area === "hospitality";
    // Reverse-worded statements are answered the other way, as an honest reader would.
    answerAll((i) => (strong(i) !== Boolean(i.reverse) ? 5 : 1));

    expect(screen.getByRole("heading", { name: "Clear signs in one or two areas" })).toBeInTheDocument();
    const teaching = area("Teaching and explaining");
    expect(within(teaching).getByText("Clear signs · 20/20")).toBeInTheDocument();
    expect(within(teaching).getByText(/people already come to you to understand the Bible/)).toBeInTheDocument();
    expect(within(area("Hospitality")).getByText("Clear signs · 20/20")).toBeInTheDocument();
    const giving = area("Giving and generosity");
    expect(within(giving).getByText("Few signs yet · 4/20")).toBeInTheDocument();
    expect(within(giving).getByText(/Giving hasn't been much a part of your life so far/)).toBeInTheDocument();

    // The scope note comes back with the results, and nothing was flagged as mixed.
    expect(screen.getByRole("region", { name: "What this self-check left out, and why" })).toBeInTheDocument();
    expect(screen.queryByRole("note", { name: "Answers worth a second look" })).not.toBeInTheDocument();

    // Saved only to this browser.
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(Object.keys(saved.answers)).toHaveLength(32);
  });

  it("reads all partly true as some signs everywhere", () => {
    renderPage();
    answerAll(() => 3);
    expect(screen.getByRole("heading", { name: "Some signs, nothing clear yet" })).toBeInTheDocument();
    for (const a of AREAS) expect(within(area(a.name)).getByText("Some signs · 12/20")).toBeInTheDocument();
    expect(screen.getByText(/Middle and low answers here often mean untried, not ungifted\./)).toBeInTheDocument();
  });

  it("does not read very true to everything as every gift, and says why", () => {
    renderPage();
    answerAll(() => 5);
    // Every reverse statement pulls its area from 20 to 16.
    expect(screen.getByRole("heading", { name: "Clear signs in several areas" })).toBeInTheDocument();
    for (const a of AREAS) expect(within(area(a.name)).getByText("Clear signs · 16/20")).toBeInTheDocument();
    const note = screen.getByRole("note", { name: "Answers worth a second look" });
    expect(within(note).getByText(/In 8 areas, you called a statement true and also called its opposite true/)).toBeInTheDocument();
  });

  it("keeps the answers when the reader changes them", () => {
    renderPage();
    answerAll(() => 3);
    fireEvent.click(screen.getAllByRole("button", { name: "Change my answers" })[0]);
    expect(screen.getByText("PART 1 OF 4")).toBeInTheDocument();
    const first = screen.getByRole("group", { name: new RegExp(escape(ITEMS[0].text)) });
    expect(within(first).getByRole("radio", { name: "Partly true" })).toBeChecked();
    expect(screen.getByRole("button", { name: "Next part" })).toBeEnabled();
  });
});
