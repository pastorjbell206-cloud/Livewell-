/**
 * The second night (audit 2026-11, F3) and the chooser: once a family has
 * done the week's devotion, /family and /family/tonight say "Done this week"
 * and offer the rest of the week instead of the same devotion; the week after,
 * tonight is tonight again. "A devotion for tonight" reaches one devotion in
 * three taps and remembers the first two. Rendered from the real data files,
 * with the clock set.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { FAMILY_PROGRESS_KEY, type FamilyIndex } from "@/lib/familyTable";
import { CHOOSER_KEY, TONIGHTS } from "@/lib/familyChooser";
import { PLAN_STARTS_KEY } from "@/lib/familyPlans";
import Family from "../Family";
import Tonight from "./Tonight";
import DevotionPage from "./DevotionPage";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const PUBLIC = path.resolve(__dirname, "../../../public");
const FILES = ["family/index.json", "family-devotions.json", "family-devotions-2.json", "family-seasonal.json", "family-reading-plans.json"];
const INDEX: FamilyIndex = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family/index.json"), "utf8"));
const row = (id: string) => INDEX.devotions.find((r) => r.id === id)!;

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

function at(when: Date) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(when);
}

function renderAt(url: string) {
  window.history.pushState({}, "", url);
  return renderWithProviders(
    <Switch>
      <Route path="/family" component={Family} />
      <Route path="/family/tonight" component={Tonight} />
      <Route path="/family/devotions/:id" component={DevotionPage} />
    </Switch>,
  );
}

const did = (id: string, date: string) =>
  window.localStorage.setItem(FAMILY_PROGRESS_KEY, JSON.stringify({ v: 1, start: date, band: "together", done: [{ id, date }] }));

beforeEach(() => window.localStorage.clear());
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

describe("the night after the week's devotion", () => {
  it("says Done this week on /family, when the next one comes, and what the other nights hold", async () => {
    at(new Date(2026, 10, 4, 19)); // Wednesday, November 4, 2026
    did("goodness", "2026-11-03");
    window.localStorage.setItem(PLAN_STARTS_KEY, JSON.stringify({ v: 1, starts: { "life-of-jesus": "2026-11-02" } }));
    serveFamily();
    renderAt("/family");

    const card = (await screen.findByRole("heading", { level: 2, name: "Done this week" })).closest("section")!;
    expect(within(card).getByText(new RegExp(`You did ${row("goodness").title} last night\\.`))).toBeInTheDocument();
    expect(within(card).getByText(/comes Sunday\./)).toBeInTheDocument();
    expect(within(card).queryByRole("link", { name: "Start tonight's devotion" })).toBeNull();
    // The family's own catechism question, today's day in the plan it started, and the week's verse.
    expect(within(card).getByRole("link", { name: new RegExp(`The catechism: ${INDEX.catechism[0].question.replace("?", "\\?")}\\s*Question 1`) })).toHaveAttribute("href", "/family/catechism");
    expect(await within(card).findByRole("link", { name: /The Life of Jesus: Mark 1:21-34\s*Day 3 of 30/ })).toHaveAttribute("href", "/family/reading-plans");
    expect(within(card).getByRole("link", { name: new RegExp(`Say the verse again: ${row("goodness").passage}`) })).toHaveAttribute("href", "/family/devotions/goodness");
    expect(within(card).getByRole("link", { name: "Do this one again" })).toHaveAttribute("href", "/family/devotions/goodness?mode=table");
    expect(within(card).getByRole("link", { name: "Pick another for tonight" })).toHaveAttribute("href", "#choose");
  });

  it("does not send /family/tonight back into the same devotion", async () => {
    at(new Date(2026, 10, 4, 19));
    did("goodness", "2026-11-03");
    serveFamily();
    renderAt("/family/tonight?mode=table");
    expect(await screen.findByRole("heading", { level: 2, name: "Done this week" })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/family/tonight");
    expect(screen.getByRole("link", { name: "Pick another for tonight" })).toHaveAttribute("href", "/family#choose");
    expect(screen.getByRole("link", { name: /Start a reading plan\s*A passage a day/ })).toHaveAttribute("href", "/family/reading-plans");
  });

  it("is tonight again the week after", async () => {
    at(new Date(2026, 10, 8, 19)); // the next Sunday
    did("goodness", "2026-11-03");
    serveFamily();
    renderAt("/family");
    expect(await screen.findByRole("link", { name: "Start tonight's devotion" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "Done this week" })).toBeNull();
  });

  it("says Done for tonight inside a daily set, where the next one comes tomorrow", async () => {
    at(new Date(2026, 11, 6, 20)); // December 6, 2026: Advent, day 6
    did("advent-6", "2026-12-06");
    serveFamily();
    renderAt("/family");
    const card = (await screen.findByRole("heading", { level: 2, name: "Done for tonight" })).closest("section")!;
    expect(within(card).getByText(new RegExp(`The next one, ${row("advent-7").title}, comes tomorrow\\.`))).toBeInTheDocument();
  });
});

describe("Advent's first nights", () => {
  it("heads the devotion Day 1 on Advent Sunday, not December 1", async () => {
    at(new Date(2026, 10, 29, 18)); // Sunday, November 29, 2026: Advent Sunday
    serveFamily();
    renderAt("/family/devotions/advent-1");
    expect(await screen.findByRole("heading", { level: 1, name: row("advent-1").title })).toBeInTheDocument();
    expect(screen.getByText(`Day 1 · ${row("advent-1").passage}`)).toBeInTheDocument();
    expect(screen.queryByText(`December 1 · ${row("advent-1").passage}`)).toBeNull();
  });
});

describe("a devotion for tonight", () => {
  it("reaches one devotion in three taps, with Start at the table, and remembers the first two", async () => {
    at(new Date(2026, 10, 3, 19));
    serveFamily();
    const first = renderAt("/family");
    // "A different night?" opens the chooser in place.
    fireEvent.click(await screen.findByRole("button", { name: /A different night\?/ }));
    const chooser = (await screen.findByRole("heading", { level: 2, name: "A devotion for tonight" })).closest("section")!;
    expect(within(chooser).queryByRole("link", { name: "Start at the table" })).toBeNull();

    fireEvent.click(within(chooser).getByRole("radio", { name: "Eleven and up" }));
    fireEvent.click(within(chooser).getByRole("radio", { name: "About five minutes" }));
    fireEvent.click(within(chooser).getByRole("radio", { name: "Someone is worried or afraid" }));

    const id = TONIGHTS.find((t) => t.key === "afraid")!.ids[0];
    expect(await within(chooser).findByRole("heading", { level: 3, name: row(id).title })).toBeInTheDocument();
    expect(within(chooser).getByRole("link", { name: "Start at the table" })).toHaveAttribute("href", `/family/devotions/${id}?mode=table`);
    expect(within(chooser).getByText(/do the first two steps, Read and Talk/)).toBeInTheDocument();
    // The ages set whose questions the devotion asks; what is going on tonight is not kept.
    expect(JSON.parse(window.localStorage.getItem(FAMILY_PROGRESS_KEY)!).band).toBe("older");
    expect(JSON.parse(window.localStorage.getItem(CHOOSER_KEY)!)).toEqual({ v: 1, ages: "older", minutes: "five" });
    first.unmount();

    // The next night it is one tap, and an ordinary night is the calendar's devotion.
    renderAt("/family");
    fireEvent.click(await screen.findByRole("button", { name: /A different night\?/ }));
    const again = (await screen.findByRole("heading", { level: 2, name: "A devotion for tonight" })).closest("section")!;
    expect(within(again).getByRole("radio", { name: "Eleven and up" })).toBeChecked();
    fireEvent.click(within(again).getByRole("radio", { name: "An ordinary night" }));
    expect(await within(again).findByRole("heading", { level: 3, name: row("goodness").title })).toBeInTheDocument();
  });
});
