/**
 * /study/bible/guides/whole-story-2027 (U28): the page opens on the right day
 * (the address, the reader's place, today in 2027, or day 1), lists the day's
 * chapters as doors into the Study Bible, marks a day read on this device,
 * and says where the reader is, never how far behind. Rendered from the
 * committed plan, with the clock set.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { PLAN_PATH, PLAN_PROGRESS_KEY, type StoryPlan } from "@/lib/storyPlan";
import StudyBibleYear from "./StudyBibleYear";

const PUBLIC = path.resolve(__dirname, "../../public");
const FILE = "bible/guides/whole-story-2027.json";
const PLAN: StoryPlan = JSON.parse(fs.readFileSync(path.join(PUBLIC, FILE), "utf8"));

function serve(online = true) {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (online && url === `/${FILE}`) return new Response(fs.readFileSync(path.join(PUBLIC, FILE), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
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
      <Route path={PLAN_PATH} component={StudyBibleYear} />
    </Switch>,
  );
}

const dayCard = async (label: string) => (await screen.findByRole("heading", { level: 2, name: label })).closest<HTMLElement>(".sy-day")!;

beforeEach(() => window.localStorage.clear());
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

describe("Read the whole story in 2027", () => {
  // First, before any test fills the plan's in-memory cache (lib/storyPlan keeps a loaded plan for the session).
  it("says so, with a retry, when the plan cannot load", async () => {
    serve(false);
    renderAt(PLAN_PATH);
    expect(await screen.findByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("before 2027, opens on day 1 with its chapters as doors into the Study Bible", async () => {
    at(new Date(2026, 9, 27, 9));
    serve();
    renderAt(PLAN_PATH);
    const card = await dayCard(PLAN.days[0].label);
    expect(card.querySelector(".sy-day__when")?.textContent).toBe("Day 1 of 365 · Friday, January 1");
    expect(within(card).getByRole("link", { name: /^Genesis 1/ })).toHaveAttribute("href", "/study/bible/genesis/1?path=story");
    expect(within(card).getByRole("link", { name: "Creation" })).toHaveAttribute("href", "/study/bible/story/creation");
    expect(within(card).getByRole("link", { name: PLAN.guides.find((g) => g.slug === "genesis-one-in-its-world")!.title })).toHaveAttribute("href", "/resources/context/genesis-one-in-its-world");
    expect(within(card).getByText(/The plan begins Friday, January 1, 2027/)).toBeInTheDocument();
    // The reminder starts on January 1 and runs the year.
    fireEvent.click(within(card).getByRole("button", { name: /Remind me/ }));
    expect(within(card).getByText(/every day of 2027, starting January 1/)).toBeInTheDocument();
  });

  it("marks a day read on this device and moves the reader's place", async () => {
    at(new Date(2026, 9, 27, 9));
    serve();
    renderAt(PLAN_PATH);
    const card = await dayCard(PLAN.days[0].label);
    fireEvent.click(within(card).getByRole("button", { name: "Mark day 1 read" }));
    expect(JSON.parse(window.localStorage.getItem(PLAN_PROGRESS_KEY)!)).toEqual([1]);
    expect(within(card).getByRole("button", { name: "Day 1 read" })).toBeInTheDocument();
    expect(within(card).getByText("Your place on this device:", { exact: false })).toBeInTheDocument();
    expect(within(card).getByRole("button", { name: "day 2" })).toBeInTheDocument();
    // The year list shows the same day checked.
    expect(screen.getByRole("button", { name: "Day 1 read", pressed: true })).toBeInTheDocument();
  });

  it("opens the day in the address, and moves between days", async () => {
    at(new Date(2026, 9, 27, 9));
    serve();
    renderAt(`${PLAN_PATH}?day=40`);
    const card = await dayCard(PLAN.days[39].label);
    expect(card.querySelector(".sy-day__when")?.textContent).toBe("Day 40 of 365 · Tuesday, February 9");
    fireEvent.click(within(card).getByRole("button", { name: "Day 41" }));
    expect(await screen.findByRole("heading", { level: 2, name: PLAN.days[40].label })).toBeInTheDocument();
    expect(window.location.search).toBe("?day=41");
  });

  it("lists the year by month, rendering only the months that are open, and opens a day picked there", async () => {
    at(new Date(2026, 9, 27, 9));
    serve();
    renderAt(PLAN_PATH);
    await dayCard(PLAN.days[0].label);
    const year = screen.getByRole("region", { name: "The year, day by day" });
    expect(within(year).getAllByRole("listitem")).toHaveLength(31); // January only
    expect(within(year).queryByRole("button", { name: /^Day 45 ·/ })).toBeNull();
    const february = within(year).getByText("February").closest("details")!;
    february.open = true;
    fireEvent(february, new Event("toggle"));
    fireEvent.click(await within(year).findByRole("button", { name: /^Day 45 ·/ }));
    expect(await screen.findByRole("heading", { level: 2, name: PLAN.days[44].label })).toBeInTheDocument();
    expect(window.location.search).toBe("?day=45");
  });

  it("in 2027, opens on the reader's place and offers today's day beside it, never a count behind", async () => {
    at(new Date(2027, 1, 9, 7)); // Tuesday, February 9, 2027: day 40
    window.localStorage.setItem(PLAN_PROGRESS_KEY, JSON.stringify([1, 2]));
    serve();
    renderAt(PLAN_PATH);
    const card = await dayCard(PLAN.days[2].label);
    expect(card.querySelector(".sy-day__when")?.textContent).toBe("Day 3 of 365 · Sunday, January 3");
    expect(within(card).getByText("Today by the calendar:", { exact: false })).toBeInTheDocument();
    expect(within(card).getByRole("button", { name: "day 40" })).toBeInTheDocument();
    expect(card.textContent).not.toMatch(/behind|streak|%/i);
    fireEvent.click(within(card).getByRole("button", { name: /Remind me/ }));
    expect(within(card).getByText(/every day through December 31/)).toBeInTheDocument();
  });

  it("in 2027 with nothing read yet, opens on today's day", async () => {
    at(new Date(2027, 1, 9, 7));
    serve();
    renderAt(PLAN_PATH);
    expect(await dayCard(PLAN.days[39].label)).toBeInTheDocument();
  });

});
