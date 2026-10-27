/**
 * Advent ready (U13), with the clock set: the family Advent calendar appears
 * on Home and /family from November 22, 2026 (the Sunday a week before Advent
 * Sunday) through Christmas Day and not outside it (on Home, from December 1
 * it is tonight's line, linking the day's own page, U18); a link from /family
 * (/family/devotions?tab=advent&day=N) lands on that day's own page, which
 * The Table's library (U17) opens in place of the list; and the library's
 * Advent tab marks tonight's day and says when Advent itself begins. Rendered
 * from the real data files.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, waitFor, within, fireEvent } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import Home from "./Home";
import Family from "./Family";
import FamilyDevotions from "./FamilyDevotions";
import DevotionPage from "./family/DevotionPage";

const PUBLIC = path.resolve(__dirname, "../../public");
const FILES = ["family/index.json", "family-devotions.json", "family-devotions-2.json", "family-seasonal.json"];

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
    expect(within(line).getByRole("link", { name: "see the readings" })).toHaveAttribute("href", "/family/devotions?tab=advent");
    home.unmount();

    renderWithProviders(<Family />);
    const card = screen.getByRole("region", { name: "Advent begins Sunday, November 29" });
    expect(card).toHaveTextContent("a short reading for each day from December 1 to Christmas");
    expect(within(card).getByRole("link", { name: "See the readings" })).toHaveAttribute("href", "/family/devotions?tab=advent");
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
    // Home folds the calendar into tonight's line (U18): the day by name, straight to its page.
    expect(screen.getByTestId("home-tonight")).toHaveTextContent("Tonight at the table: A Child Is Given, December 6 in the family Advent calendar.");
    expect(screen.getByRole("link", { name: "A Child Is Given" })).toHaveAttribute("href", "/family/devotions/advent-6");
    expect(screen.queryByTestId("advent-at-the-table")).toBeNull();
    home.unmount();

    renderWithProviders(<Family />);
    const card = screen.getByRole("region", { name: "Tonight, December 6" });
    expect(within(card).getByRole("link", { name: "Open the reading" })).toHaveAttribute("href", "/family/devotions?tab=advent&day=6");
    expect(within(card).getByRole("link", { name: "All the readings" })).toHaveAttribute("href", "/family/devotions?tab=advent");
  });

  it("name Christmas Day on December 25", () => {
    setToday(2026, 12, 25);
    renderWithProviders(<Family />);
    expect(screen.getByRole("region", { name: "Christmas Day" })).toBeTruthy();
  });
});

/** The library and a devotion's own page, routed as App.tsx routes them. */
function renderDevotions(url: string) {
  window.history.replaceState(null, "", url);
  return renderWithProviders(
    <Switch>
      <Route path="/family/devotions/:id" component={DevotionPage} />
      <Route path="/family/devotions" component={FamilyDevotions} />
    </Switch>,
  );
}

describe("/family/devotions?tab=advent", () => {
  it("opens the day asked for on its own page, in the new order, marked tonight", async () => {
    setToday(2026, 12, 20);
    serveFamilyFiles();
    renderDevotions("/family/devotions?tab=advent&day=20");
    expect(await screen.findByRole("heading", { level: 1, name: "The Night Before" })).toBeTruthy();
    expect(window.location.pathname).toBe("/family/devotions/advent-20");
    expect(window.location.search).toBe("");
    expect(screen.getByText("· Tonight")).toBeTruthy();
    expect(screen.getByText(/a tired couple was walking a hard road/)).toBeTruthy();
    expect(screen.getByText(/The wording here is a paraphrase/)).toBeTruthy();
  });

  it("opens the Advent tab, marks tonight's day, and says when Advent begins", async () => {
    setToday(2026, 12, 20);
    serveFamilyFiles();
    renderDevotions("/family/devotions?tab=advent");
    const day20 = await screen.findByRole("link", { name: /December 20 · Tonight/ });
    expect(day20).toHaveAttribute("href", "/family/devotions/advent-20");
    expect(day20).toHaveTextContent("The Night Before");
    expect(screen.getByRole("button", { name: "Advent · 25" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText(/· Tonight/)).toHaveLength(1);
    expect(screen.getByText("Advent begins on the fourth Sunday before Christmas (November 29, 2026). This calendar has a reading for each day from December 1 to Christmas Day.")).toBeTruthy();

    // A tab chosen by hand goes into the address, so it can be shared.
    fireEvent.click(screen.getByRole("button", { name: /^Foundations/ }));
    await waitFor(() => expect(window.location.search).toBe(""));
    expect(screen.queryByText(/^Advent begins on the fourth Sunday/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Holy Week · 8" }));
    await waitFor(() => expect(window.location.search).toBe("?tab=holy-week"));
  });

  it("stays on the weekly devotions without a season, or with one it does not have", async () => {
    setToday(2026, 12, 20);
    serveFamilyFiles();
    renderDevotions("/family/devotions?tab=lent&day=3");
    await waitFor(() => expect(screen.getByRole("button", { name: /^Foundations · \d+$/ })).toHaveAttribute("aria-pressed", "true"));
    expect(window.location.pathname).toBe("/family/devotions");
  });
});
