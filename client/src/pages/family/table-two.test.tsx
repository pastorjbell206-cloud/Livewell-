/**
 * The Table, part two (U21): whose questions to ask (Together, Younger,
 * Older), kept on this device and honoured at the table; three short nights,
 * each a door into table mode at its first step; a line for the grown-ups and
 * the page behind tonight; on /family, a weekly reminder and "If your table
 * looks different"; and the library by strand and theme, the theme in the URL.
 * Rendered from the real data files, with the clock set.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { FAMILY_PROGRESS_KEY, type FamilyIndex } from "@/lib/familyTable";
import Family from "../Family";
import FamilyDevotions from "../FamilyDevotions";
import DevotionPage from "./DevotionPage";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const PUBLIC = path.resolve(__dirname, "../../../public");
const FILES = ["family/index.json", "family-devotions.json", "family-devotions-2.json", "family-seasonal.json"];
const INDEX: FamilyIndex = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family/index.json"), "utf8"));
type Weekly = { id: string; questions: { younger: string[]; older: string[] } };
const WEEKLY: Weekly[] = ["family-devotions.json", "family-devotions-2.json"].flatMap((f) => JSON.parse(fs.readFileSync(path.join(PUBLIC, f), "utf8")));
const questions = (id: string) => WEEKLY.find((d) => d.id === id)!.questions;

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

function renderAt(url: string) {
  window.history.pushState({}, "", url);
  return renderWithProviders(
    <Switch>
      <Route path="/family" component={Family} />
      <Route path="/family/devotions" component={FamilyDevotions} />
      <Route path="/family/devotions/:id" component={DevotionPage} />
    </Switch>,
  );
}

const stored = () => JSON.parse(window.localStorage.getItem(FAMILY_PROGRESS_KEY) ?? "null");

beforeEach(() => {
  window.localStorage.clear();
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 10, 3, 19)); // Tuesday, November 3, 2026
  serveFamily();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

describe("Ask, by age", () => {
  it("asks both bands together by default, and one band when the family chooses it, kept on this device", async () => {
    const { younger, older } = questions("identity");
    renderAt("/family/devotions/identity");
    const ask = (await screen.findByRole("heading", { level: 2, name: "Ask" })).closest("section")!;
    const group = within(ask).getByRole("group", { name: "Questions for" });
    expect(within(group).getByRole("radio", { name: "Together" })).toBeChecked();
    expect(within(ask).getByText("For younger children")).toBeInTheDocument();
    expect(within(ask).getByText("For older children")).toBeInTheDocument();
    for (const q of [...younger, ...older]) expect(within(ask).getByText(q)).toBeInTheDocument();

    fireEvent.click(within(group).getByRole("radio", { name: "Older" }));
    expect(within(ask).queryByText(younger[0])).toBeNull();
    expect(within(ask).getByText(older[0])).toBeInTheDocument();
    expect(within(ask).getByText(/This device will remember your choice\./)).toBeInTheDocument();
    expect(stored()).toEqual({ v: 1, start: null, band: "older", done: [] });

    fireEvent.click(within(group).getByRole("radio", { name: "Younger" }));
    expect(within(ask).getByText(younger[0])).toBeInTheDocument();
    expect(within(ask).queryByText(older[0])).toBeNull();
    expect(stored().band).toBe("younger");
  });

  it("asks the band this device keeps at the table, and keeps the dates beside it", async () => {
    window.localStorage.setItem(FAMILY_PROGRESS_KEY, JSON.stringify({ v: 1, start: "2026-10-27", band: "older", done: [{ id: "faith", date: "2026-10-27" }] }));
    const { younger, older } = questions("identity");
    renderAt("/family/devotions/identity?mode=table&step=3");
    expect(await screen.findByRole("heading", { level: 2, name: "Ask" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Older" })).toBeChecked();
    expect(screen.getByText(older[2])).toBeInTheDocument();
    expect(screen.queryByText(younger[2])).toBeNull();
    fireEvent.click(screen.getByRole("radio", { name: "Together" }));
    expect(screen.getByText(younger[2])).toBeInTheDocument();
    expect(stored()).toEqual({ v: 1, start: "2026-10-27", band: "together", done: [{ id: "faith", date: "2026-10-27" }] });
  });

  it("asks a day of a daily set of the whole table, with no choice to make", async () => {
    renderAt("/family/devotions/advent-6");
    const ask = (await screen.findByRole("heading", { level: 2, name: "Ask" })).closest("section")!;
    expect(within(ask).getByText("Together")).toBeInTheDocument();
    expect(within(ask).queryByRole("radio")).toBeNull();
  });
});

describe("three short nights", () => {
  it("offers a weekly devotion as three nights, each starting table mode at its own step", async () => {
    renderAt("/family/devotions/identity");
    await screen.findByRole("heading", { level: 1, name: "Made On Purpose" });
    expect(screen.getByText(/Three short nights instead of one/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read and Talk" })).toHaveAttribute("href", "/family/devotions/identity?mode=table&step=1");
    expect(screen.getByRole("link", { name: "Ask and Do" })).toHaveAttribute("href", "/family/devotions/identity?mode=table&step=3");
    expect(screen.getByRole("link", { name: "Remember and Pray" })).toHaveAttribute("href", "/family/devotions/identity?mode=table&step=5");
    fireEvent.click(screen.getByRole("link", { name: "Ask and Do" }));
    expect(await screen.findByRole("heading", { level: 2, name: "Ask" })).toBeInTheDocument();
    expect(screen.getByText("3 of 6")).toBeInTheDocument();
  });

  it("leaves a day of a daily set as one short night", async () => {
    renderAt("/family/devotions/advent-6");
    await screen.findByRole("heading", { level: 2, name: "Read" });
    expect(screen.queryByText(/Three short nights/)).toBeNull();
  });
});

describe("for the grown-ups", () => {
  it("ends some weeks with a line for the parents and the care page behind tonight", async () => {
    renderAt("/family/devotions/fear-and-anxiety");
    const aside = (await screen.findByText("For the grown-ups")).closest("aside")!;
    expect(within(aside).getByText("If worry keeps you awake after the children are asleep, start here.")).toBeInTheDocument();
    expect(within(aside).getByRole("link", { name: "I can't stop worrying" })).toHaveAttribute("href", "/help/anxiety");
  });

  it("says nothing extra on a week without one", async () => {
    renderAt("/family/devotions/identity");
    await screen.findByRole("heading", { level: 1, name: "Made On Purpose" });
    expect(screen.queryByText("For the grown-ups")).toBeNull();
  });
});

describe("/family, part two", () => {
  it("offers a weekly reminder back to tonight's devotion, in the family's own calendar", async () => {
    renderAt("/family");
    fireEvent.click(await screen.findByRole("button", { name: "Remind me: Family devotion" }));
    expect(screen.getByText(/A reminder in your own calendar, once a week for a year\./)).toBeInTheDocument();
    const google = screen.getByRole("link", { name: "Google Calendar" }).getAttribute("href")!;
    expect(decodeURIComponent(google)).toContain("/family/tonight");
    expect(decodeURIComponent(google)).toContain("RRULE:FREQ=WEEKLY;COUNT=52");
  });

  it("has a word for the table that looks different, and the help behind it", async () => {
    renderAt("/family");
    const panel = (await screen.findByRole("heading", { level: 2, name: "If your table looks different" })).closest("section")!;
    for (const h of ["On your own", "Between two homes", "Beside a spouse who does not believe"]) expect(within(panel).getByRole("heading", { level: 3, name: h })).toBeInTheDocument();
    expect(within(panel).getByRole("link", { name: "the help lines are here" })).toHaveAttribute("href", "/help#help-now");
    expect(within(panel).getByRole("link", { name: "How do we do family devotions?" })).toHaveAttribute("href", "/help/family-devotions");
  });
});

describe("the library by strand and theme", () => {
  it("sets the Foundations out by theme, each under its own heading, in the library's order", async () => {
    renderAt("/family/devotions");
    expect(await screen.findByRole("button", { name: "Foundations · 72" })).toHaveAttribute("aria-pressed", "true");
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings).toEqual(INDEX.groups!.map((g) => g.label));
    const story = screen.getByRole("list", { name: "The big story" });
    expect(within(story).getAllByRole("link")).toHaveLength(INDEX.groups!.find((g) => g.key === "story")!.count);
    expect(within(story).getByRole("link", { name: /What Love Was Willing To Do/ })).toHaveAttribute("href", "/family/devotions/the-cross");
  });

  it("shows one theme when the reader chooses it, with the theme in the URL", async () => {
    renderAt("/family/devotions");
    const select = await screen.findByRole("combobox", { name: "Theme" });
    fireEvent.change(select, { target: { value: "feelings" } });
    await waitFor(() => expect(window.location.search).toBe("?theme=feelings"));
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual(["Hard days and big feelings"]);
    expect(screen.getByRole("link", { name: /When The Lights Go Out/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /What Love Was Willing To Do/ })).toBeNull();
    fireEvent.change(select, { target: { value: "" } });
    await waitFor(() => expect(window.location.search).toBe(""));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(INDEX.groups!.length);
  });

  it("opens the theme a link names, and ignores one it does not know", async () => {
    renderAt("/family/devotions?theme=story");
    expect(await screen.findByRole("heading", { level: 2, name: "The big story" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
  });

  it("keeps the daily sets as their own tabs, without a theme", async () => {
    renderAt("/family/devotions?tab=holy-week&theme=story");
    expect(await screen.findByRole("button", { name: "Holy Week · 8" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("combobox", { name: "Theme" })).toBeNull();
    expect(screen.getByRole("list", { name: "Holy Week devotions" })).toBeInTheDocument();
  });
});
