/**
 * Advent ready (U13), with the clock set: the family Advent calendar appears
 * on Home and /family from November 22, 2026 (the Sunday a week before Advent
 * Sunday) through Christmas Day and not outside it; a link from either lands
 * on the Advent tab of /family/devotions at tonight's day; and that tab says
 * when Advent itself begins. Rendered from the real data files.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, waitFor, within, fireEvent } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import Home from "./Home";
import Family from "./Family";
import FamilyDevotions from "./FamilyDevotions";

const PUBLIC = path.resolve(__dirname, "../../public");
const FILES = ["family-devotions.json", "family-devotions-2.json", "family-seasonal.json"];

function serveFamilyFiles() {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (FILES.includes(name)) {
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      return base(input, init);
    }),
  );
}

/** Noon on a calendar day in the reader's own time zone. */
function setToday(y: number, m: number, d: number) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(y, m - 1, d, 12));
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

describe("Home and /family before, during, and after the window", () => {
  for (const [y, m, d] of [[2026, 11, 21], [2026, 12, 26], [2026, 10, 26]] as const) {
    it(`show nothing on ${y}-${m}-${d}`, () => {
      setToday(y, m, d);
      serveFamilyFiles();
      const home = renderWithProviders(<Home />);
      expect(screen.queryByTestId("advent-at-the-table")).toBeNull();
      home.unmount();
      renderWithProviders(<Family />);
      expect(screen.queryByTestId("advent-at-the-table")).toBeNull();
    });
  }

  it("show Advent Sunday and the calendar from November 22", () => {
    setToday(2026, 11, 22);
    serveFamilyFiles();
    const home = renderWithProviders(<Home />);
    const line = screen.getByTestId("advent-at-the-table");
    expect(line).toHaveTextContent("Advent begins Sunday, November 29. The family Advent calendar runs from December 1 to Christmas: see the readings.");
    expect(within(line).getByRole("link", { name: "see the readings" })).toHaveAttribute("href", "/family/devotions?season=advent");
    home.unmount();

    renderWithProviders(<Family />);
    const card = screen.getByRole("region", { name: "Advent begins Sunday, November 29" });
    expect(card).toHaveTextContent("a short reading for each day from December 1 to Christmas");
    expect(within(card).getByRole("link", { name: "See the readings" })).toHaveAttribute("href", "/family/devotions?season=advent");
    expect(within(card).getByRole("link", { name: "US Letter" })).toHaveAttribute("href", "/downloads/seasonal/advent-family-letter.pdf");
    expect(within(card).getByRole("link", { name: "A4" })).toHaveAttribute("href", "/downloads/seasonal/advent-family-a4.pdf");
  });

  it("say Advent has begun on Advent Sunday, before the calendar starts", () => {
    setToday(2026, 11, 29);
    renderWithProviders(<Home />);
    expect(screen.getByTestId("advent-at-the-table")).toHaveTextContent("Advent has begun. The family Advent calendar starts Tuesday, December 1:");
  });

  it("point at tonight's day during the calendar", () => {
    setToday(2026, 12, 6);
    serveFamilyFiles();
    const home = renderWithProviders(<Home />);
    expect(screen.getByRole("link", { name: "December 6 in the family Advent calendar" })).toHaveAttribute("href", "/family/devotions?season=advent&day=6");
    expect(screen.getByTestId("advent-at-the-table")).toHaveTextContent(/^Tonight at the table:/);
    home.unmount();

    renderWithProviders(<Family />);
    const card = screen.getByRole("region", { name: "Tonight, December 6" });
    expect(within(card).getByRole("link", { name: "Open the reading" })).toHaveAttribute("href", "/family/devotions?season=advent&day=6");
    expect(within(card).getByRole("link", { name: "All the readings" })).toHaveAttribute("href", "/family/devotions?season=advent");
  });

  it("name Christmas Day on December 25", () => {
    setToday(2026, 12, 25);
    renderWithProviders(<Family />);
    expect(screen.getByRole("region", { name: "Christmas Day" })).toBeTruthy();
  });
});

describe("/family/devotions?season=advent", () => {
  it("opens the Advent tab at the day asked for, marks tonight, and says when Advent begins", async () => {
    setToday(2026, 12, 20);
    serveFamilyFiles();
    window.history.replaceState(null, "", "/family/devotions?season=advent&day=20");
    renderWithProviders(<FamilyDevotions />);
    await waitFor(() => expect(screen.getByText("The Night Before")).toBeTruthy());
    expect(screen.getByRole("button", { name: "Advent · 25" })).toHaveAttribute("aria-pressed", "true");
    const day20 = screen.getByRole("button", { name: /December 20 · Tonight\s*The Night Before/ });
    expect(day20).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/a tired couple was walking a hard road/)).toBeTruthy();
    expect(screen.getByText("Advent begins on the fourth Sunday before Christmas (November 29, 2026). This calendar has a reading for each day from December 1 to Christmas Day.")).toBeTruthy();
    expect(screen.getByText(/The wording here is a paraphrase/)).toBeTruthy();

    // A tab chosen by hand goes into the address, so it can be shared.
    fireEvent.click(screen.getByRole("button", { name: /^Weekly/ }));
    expect(window.location.search).toBe("");
    fireEvent.click(screen.getByRole("button", { name: "Holy Week · 8" }));
    expect(window.location.search).toBe("?season=holy-week");
  });

  it("stays on the weekly devotions without a season, or with one it does not have", async () => {
    setToday(2026, 12, 20);
    serveFamilyFiles();
    window.history.replaceState(null, "", "/family/devotions?season=lent&day=3");
    renderWithProviders(<FamilyDevotions />);
    await waitFor(() => expect(screen.getByRole("button", { name: /^Weekly · \d+$/ })).toHaveAttribute("aria-pressed", "true"));
  });
});
