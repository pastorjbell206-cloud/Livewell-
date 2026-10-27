/**
 * The three family library pages (/family/devotions, /family/catechism,
 * /family/reading-plans): a failed load says so and offers a retry instead of
 * "Loading…" forever; the devotions are numbered as a place in the set, not as
 * 72 weeks of a 52-week year; and "this week's" catechism question reaches
 * past question 52. Rendered from the real data files, not fixtures.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { catechismWeekIndex } from "@/lib/familyCatechism";
import FamilyDevotions from "./FamilyDevotions";
import FamilyCatechism from "./FamilyCatechism";
import FamilyReadingPlans from "./FamilyReadingPlans";

const PUBLIC = path.resolve(__dirname, "../../public");
const FILES = ["family/index.json", "family-devotions.json", "family-devotions-2.json", "family-seasonal.json", "family-catechism.json", "family-reading-plans.json"];
const catechism: { number: number; question: string }[] = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family-catechism.json"), "utf8"));
const weeklyCount = ["family-devotions.json", "family-devotions-2.json"]
  .map((f) => (JSON.parse(fs.readFileSync(path.join(PUBLIC, f), "utf8")) as unknown[]).length)
  .reduce((a, b) => a + b, 0);

/** Serves the family files; `online` flips a failed network into a working one. */
function stubFamily(state: { online: boolean }) {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (state.online && FILES.includes(name)) {
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      return base(input, init);
    }),
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("family pages when the data does not arrive", () => {
  for (const [name, Page, what, after] of [
    ["/family/devotions", FamilyDevotions, "The family devotions didn't load.", () => screen.getByText("The Weight You Put Down")],
    ["/family/catechism", FamilyCatechism, "The catechism didn't load.", () => screen.getAllByText(catechism[0].question)[0]],
    ["/family/reading-plans", FamilyReadingPlans, "The reading plans didn't load.", () => screen.getByText("The Life of Jesus")],
  ] as const) {
    it(`${name} says so, offers a retry, and loads on the retry`, async () => {
      const state = { online: false };
      stubFamily(state);
      renderWithProviders(<Page />);
      await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(what));
      expect(screen.queryByRole("status")).toBeNull();
      expect(screen.getByRole("link", { name: "Back to Family" })).toHaveAttribute("href", "/family");

      state.online = true;
      fireEvent.click(screen.getByRole("button", { name: "Try again" }));
      await waitFor(() => expect(after()).toBeTruthy());
      expect(screen.queryByRole("alert")).toBeNull();
    });
  }
});

describe("/family/devotions", () => {
  afterEach(() => window.history.pushState({}, "", "/"));

  it("numbers the weekly devotions as a place in the set, not as weeks of a year", async () => {
    stubFamily({ online: true });
    renderWithProviders(<FamilyDevotions />);
    await waitFor(() => expect(screen.getByText(`1 of ${weeklyCount} · Who God Says You Are`)).toBeTruthy());
    expect(screen.getByRole("button", { name: `Weekly · ${weeklyCount}` })).toBeTruthy();
    expect(screen.queryByText(/^Week \d+/)).toBeNull();
  });

  it("is a list of doors, one page per devotion, with the tab in the URL (U17)", async () => {
    stubFamily({ online: true });
    window.localStorage.setItem("livewell-progress-family-v1", JSON.stringify({ v: 1, start: "2026-11-03", band: "together", done: [{ id: "identity", date: "2026-11-03" }] }));
    renderWithProviders(<FamilyDevotions />);
    const first = await screen.findByRole("link", { name: /Made On Purpose/ });
    expect(first).toHaveAttribute("href", "/family/devotions/identity");
    expect(first).toHaveTextContent("Done on this device");
    // A list of references, so no verse text and no translation note.
    expect(screen.queryByText(/Scripture quoted from/)).toBeNull();
    // No accordion: the list holds links, not buttons that open in place.
    expect(screen.getByRole("list", { name: "Weekly devotions" }).querySelectorAll("button")).toHaveLength(0);

    fireEvent.click(screen.getByRole("button", { name: /^Advent · \d+$/ }));
    await waitFor(() => expect(window.location.search).toBe("?tab=advent"));
    expect(screen.getByRole("link", { name: /December 1(?!\d)/ })).toHaveAttribute("href", "/family/devotions/advent-1");
    window.localStorage.clear();
  });

  it("opens a day's own page when the URL names one (?tab=advent&day=6)", async () => {
    stubFamily({ online: true });
    window.history.pushState({}, "", "/family/devotions?tab=advent&day=6");
    renderWithProviders(<FamilyDevotions />);
    await waitFor(() => expect(window.location.pathname).toBe("/family/devotions/advent-6"));
    expect(window.location.search).toBe("");
  });

  it("stays on the list for a day the set does not have", async () => {
    stubFamily({ online: true });
    window.history.pushState({}, "", "/family/devotions?tab=holy-week&day=40");
    renderWithProviders(<FamilyDevotions />);
    expect(await screen.findByRole("link", { name: /Palm Sunday/ })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/family/devotions");
  });

  it("opens the tab the URL names", async () => {
    stubFamily({ online: true });
    window.history.pushState({}, "", "/family/devotions?tab=holy-week");
    renderWithProviders(<FamilyDevotions />);
    expect(await screen.findByRole("link", { name: /Palm Sunday/ })).toHaveAttribute("href", "/family/devotions/holy-week-1");
    expect(screen.getByRole("button", { name: /^Holy Week · \d+$/ })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("/family/catechism", () => {
  it("features a question past 52 when its week comes", async () => {
    const when = new Date(2027, 0, 10, 12); // a Sunday in January 2027
    const expected = catechism[catechismWeekIndex(when, catechism.length)];
    expect(expected.number).toBeGreaterThan(52);
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(when);
    stubFamily({ online: true });
    renderWithProviders(<FamilyCatechism />);
    await waitFor(() => expect(screen.getByText(`This week — Question ${expected.number}`)).toBeTruthy());
  });
});
