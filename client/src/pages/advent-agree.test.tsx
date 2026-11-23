/**
 * Advent agrees with itself (the walk's polish, 2026-11-23): every place that
 * speaks of the family Advent calendar says what its data says, on every
 * night from November 22 to December 26, 2026, with the clock set.
 *
 * The data (client/public/family-seasonal.json) dates the calendar: day N is
 * "December N". Advent itself begins on Advent Sunday, November 29. So:
 *
 * - before Advent Sunday, Home's line and /family's card both say Advent
 *   begins Sunday, November 29, and the calendar runs from December 1;
 * - on Advent Sunday and Monday no reading is tonight's: Home, /family's
 *   Tonight card, its Advent card and /family/tonight all say the calendar
 *   starts Tuesday, December 1, and nothing says "Day 1";
 * - from December 1 to 25 tonight is that day, named by its date, on Home,
 *   /family, the devotion page (marked Tonight), Tonight and the library;
 * - on December 26 no Advent reading is tonight's anywhere;
 * - a reading's own page names it by its date on every night, and calls it
 *   Tonight only on that date;
 * - the library's Advent tab and the printed booklet both say the calendar
 *   runs from December 1 to Christmas Day.
 *
 * Before this, on November 29 and 30, /family offered "Day 1" as tonight's
 * while its own card said the calendar "starts Tuesday, December 1", and Home
 * offered the same "Day 1"; on December 26 Home offered Christmas Day's
 * reading as tonight's.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import type { FamilyIndex } from "@/lib/familyTable";
import Home from "./Home";
import Family from "./Family";
import FamilyDevotions from "./FamilyDevotions";
import Tonight from "./family/Tonight";
import DevotionPage from "./family/DevotionPage";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const ROOT = path.resolve(__dirname, "../../..");
const PUBLIC = path.join(ROOT, "client/public");
const FILES = ["family/index.json", "family-devotions.json", "family-devotions-2.json", "family-seasonal.json", "family-reading-plans.json"];
const INDEX: FamilyIndex = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family/index.json"), "utf8"));
const SEASONAL: { advent: { day: number; label: string; title: string; passage: string }[] } = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family-seasonal.json"), "utf8"));
const reading = (n: number) => SEASONAL.advent.find((d) => d.day === n)!;
const ADVENT_TITLES = new Set(SEASONAL.advent.map((d) => d.title));

/** What the data says each night is, independent of the code under test. */
type Night = { kind: "before" } | { kind: "waiting" } | { kind: "day"; n: number } | { kind: "after" };
function nightOf(iso: string): Night {
  const [month, day] = [Number(iso.slice(5, 7)), Number(iso.slice(8, 10))];
  if (month === 12 && day <= 25) return { kind: "day", n: day };
  if (month === 12) return { kind: "after" };
  // Advent Sunday 2026, the fourth Sunday before Christmas.
  return day >= 29 ? { kind: "waiting" } : { kind: "before" };
}

const DATES: string[] = [];
for (let d = new Date(Date.UTC(2026, 10, 22)); d <= new Date(Date.UTC(2026, 11, 26)); d.setUTCDate(d.getUTCDate() + 1)) {
  DATES.push(d.toISOString().slice(0, 10));
}

const WAITING = "Advent has begun. The family Advent calendar starts Tuesday, December 1, with The Long Wait Begins.";

function serveFamily() {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (FILES.includes(name)) return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      return base(input, init);
    }),
  );
}

/** Seven in the evening of a calendar day, in the reader's own time zone. */
function at(iso: string) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)), 19));
}

function renderAt(url: string) {
  window.history.replaceState(null, "", url);
  return renderWithProviders(
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/family" component={Family} />
      <Route path="/family/tonight" component={Tonight} />
      <Route path="/family/devotions/:id" component={DevotionPage} />
      <Route path="/family/devotions" component={FamilyDevotions} />
    </Switch>,
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.localStorage.clear();
  window.history.replaceState(null, "", "/");
});

async function checkHome(night: Night) {
  const page = renderAt("/");
  await waitFor(() => expect(document.querySelector(".home-tonight--slot")).toBeNull());
  const line = screen.queryByTestId("home-tonight");
  const advent = screen.queryByTestId("advent-at-the-table");
  if (night.kind === "day") {
    const r = reading(night.n);
    expect(line).toHaveTextContent(`${r.title}, December ${night.n} in the family Advent calendar.`);
    expect(within(line!).getByRole("link", { name: r.title })).toHaveAttribute("href", `/family/devotions/advent-${night.n}`);
    expect(advent).toBeNull();
  } else if (night.kind === "waiting") {
    expect(line).toHaveTextContent(WAITING);
    expect(within(line!).getByRole("link", { name: "The Long Wait Begins" })).toHaveAttribute("href", "/family/devotions/advent-1");
    expect(advent).toBeNull();
  } else if (night.kind === "before") {
    expect(advent).toHaveTextContent("Advent begins Sunday, November 29. The family Advent calendar runs from December 1 to Christmas: see the readings.");
    // Tonight's line is Thanksgiving week's, never an Advent reading.
    expect(line).not.toBeNull();
    expect(Array.from(ADVENT_TITLES).some((t) => line!.textContent!.includes(t))).toBe(false);
  } else {
    expect(line).toBeNull();
    expect(advent).toBeNull();
  }
  page.unmount();
}

async function checkFamily(night: Night) {
  const page = renderAt("/family");
  const card = await screen.findByRole("region", { name: "Tonight at the table" });
  const title = await within(card).findByRole("heading", { level: 2 });
  const meta = card.querySelector(".tb-tonight__meta")!;
  if (night.kind === "day") {
    const r = reading(night.n);
    expect(title).toHaveTextContent(r.title);
    expect(meta.textContent).toMatch(new RegExp(`^December ${night.n} · ${r.passage}`));
    const advent = screen.getByRole("region", { name: night.n === 25 ? "Christmas Day" : `Tonight, December ${night.n}` });
    expect(advent).toHaveTextContent(`The reading for December ${night.n} in the family Advent calendar`);
  } else if (night.kind === "waiting") {
    expect(title).toHaveTextContent("Choose tonight's devotion");
    expect(meta).toHaveTextContent(WAITING);
    expect(within(card).getByRole("link", { name: "The Long Wait Begins" })).toHaveAttribute("href", "/family/devotions/advent-1");
    expect(screen.getByRole("region", { name: "Advent has begun" })).toHaveTextContent("The family Advent calendar starts Tuesday, December 1");
  } else if (night.kind === "before") {
    expect(ADVENT_TITLES.has(title.textContent ?? "")).toBe(false);
    expect(screen.getByRole("region", { name: "Advent begins Sunday, November 29" })).toHaveTextContent("a short reading for each day from December 1 to Christmas");
  } else {
    expect(title).toHaveTextContent("Choose tonight's devotion");
    expect(meta).toHaveTextContent("No devotion is set for this date yet.");
    expect(document.querySelector('[data-testid="advent-at-the-table"]')).toBeNull();
  }
  // No Advent reading is ever named by a day number in place of its date.
  const text = document.body.textContent ?? "";
  for (const r of SEASONAL.advent) expect(text).not.toContain(`Day ${r.day} · ${r.passage}`);
  // The week at a glance dates the calendar by its own days.
  const season = screen.queryByRole("link", { name: /^This season .*Advent/ });
  if (season) expect(season).toHaveTextContent("December 1 to 25");
  page.unmount();
}

/** The reading a night is about: tonight's on a day, the first before the calendar, the last after it. */
const readingFor = (night: Night) => (night.kind === "day" ? night.n : night.kind === "after" ? 25 : 1);

async function checkDevotion(iso: string, night: Night) {
  const n = readingFor(night);
  const r = reading(n);
  const page = renderAt(`/family/devotions/advent-${n}`);
  expect(await screen.findByRole("heading", { level: 1, name: r.title })).toBeInTheDocument();
  // Always its own date, never a day number.
  expect(screen.getByText(`December ${n} · ${r.passage}`)).toBeInTheDocument();
  // Tonight only on its own date.
  if (night.kind === "day") expect(screen.getByText("· Tonight")).toBeInTheDocument();
  else expect(screen.queryByText("· Tonight"), iso).toBeNull();
  page.unmount();
}

async function checkTonight(night: Night) {
  const page = renderAt("/family/tonight");
  if (night.kind === "day") {
    await waitFor(() => expect(window.location.pathname).toBe(`/family/devotions/advent-${night.n}`));
  } else if (night.kind === "before") {
    await waitFor(() => expect(window.location.pathname).toMatch(/^\/family\/devotions\/thanksgiving-\d$/));
  } else {
    // No devotion of its own: the page stays and says so.
    await screen.findByRole("heading", { level: 1, name: "Tonight's family devotion" });
    expect(window.location.pathname).toBe("/family/tonight");
    const line = document.querySelector(".pg-head__lede");
    if (night.kind === "waiting") expect(line).toHaveTextContent(WAITING);
    else expect(line).toHaveTextContent("No devotion is set for this date yet. Choose one from the library.");
  }
  page.unmount();
}

async function checkLibrary(night: Night) {
  const page = renderAt("/family/devotions?tab=advent");
  expect(await screen.findByText(/This calendar has a reading for each day from December 1 to Christmas Day\./)).toBeInTheDocument();
  const marked = screen.queryAllByText(/· Tonight/);
  if (night.kind === "day") {
    expect(marked).toHaveLength(1);
    expect(marked[0]).toHaveTextContent(`December ${night.n} · Tonight`);
  } else {
    expect(marked).toHaveLength(0);
  }
  page.unmount();
}

describe("the family Advent calendar, on every night from November 22 to December 26, 2026", () => {
  it("dates its readings December 1 to 25 in the data every page reads", () => {
    expect(SEASONAL.advent.map((d) => d.label)).toEqual(Array.from({ length: 25 }, (_, i) => `December ${i + 1}`));
    for (const r of INDEX.devotions.filter((d) => d.set === "advent")) expect(r.label).toBe(`December ${r.day}`);
  });

  it("is said the same way in the printed booklet", () => {
    const printables = fs.readFileSync(path.join(ROOT, "scripts/lib/help-printables.mjs"), "utf8");
    expect(printables).toContain("This booklet is an Advent calendar: one reading for each day from December 1 to Christmas Day.");
    expect(printables).toContain('sub: "Twenty-five days for families, December 1 to Christmas"');
  });

  for (const iso of DATES) {
    const night = nightOf(iso);
    it(`agrees on ${iso} (${night.kind}${night.kind === "day" ? ` ${night.n}` : ""}) on Home, /family, the reading's page, Tonight and the library`, async () => {
      at(iso);
      serveFamily();
      await checkHome(night);
      await checkFamily(night);
      await checkDevotion(iso, night);
      await checkTonight(night);
      await checkLibrary(night);
    }, 20_000);
  }
});
