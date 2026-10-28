/**
 * Home's Find and tonight (U18), with the clock set and this device's storage
 * seeded: tonight's devotion by name from the year map alone (no fetch), the
 * Advent line in its window, Continue only when there is something to pick
 * up again, nothing at all when there is nothing to show, the Family door,
 * and one field that sends a reference to the verse and anything else to
 * /search, its parser loaded on focus.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import Home from "../Home";
import { homeTonight } from "./HomeTonight";

/** Noon on a calendar day in the reader's own time zone. */
function setToday(y: number, m: number, d: number) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(y, m - 1, d, 12));
}

/** The tonight line loads on its own after first paint (Home.tsx); wait until its slot is filled. */
const tonightSettled = () => waitFor(() => expect(document.querySelector(".home-tonight--slot")).toBeNull());

function renderHome() {
  const fetch = vi.fn(offlineFetch());
  vi.stubGlobal("fetch", fetch);
  renderWithProviders(<Home />);
  return fetch;
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.localStorage.clear();
  window.history.replaceState(null, "", "/");
});

const said = (date: string) => {
  const { tonight, advent } = homeTonight(date);
  return {
    tonight: tonight && `${tonight.lead} ${tonight.title}${tonight.after}.`,
    href: tonight?.href,
    advent: advent && `${advent.lead} ${advent.link}.`,
  };
};

describe("homeTonight", () => {
  it("names the week's devotion on an ordinary night", () => {
    expect(said("2026-10-27")).toEqual({
      tonight: "Tonight at the table: Strong Enough To Be Gentle.",
      href: "/family/devotions/gentleness",
      advent: null,
    });
  });

  it("names a day of a daily set, and says which set", () => {
    expect(said("2027-03-26")).toMatchObject({ tonight: "Tonight at the table: It Is Finished, a reading for Holy Week.", href: "/family/devotions/holy-week-6" });
    expect(said("2026-11-26").tonight).toBe("Tonight at the table: His Love Lasts Forever, a reading for Thanksgiving week.");
  });

  it("puts the Advent line beneath Thanksgiving week's devotion before Advent", () => {
    expect(said("2026-11-22")).toEqual({
      tonight: "Tonight at the table: Thanks in the Middle of It, a reading for Thanksgiving week.",
      href: "/family/devotions/thanksgiving-3",
      advent: "Advent begins Sunday, November 29. The family Advent calendar runs from December 1 to Christmas: see the readings.",
    });
  });

  it("says only that the calendar starts December 1 on the nights before it", () => {
    expect(said("2026-11-29")).toEqual({
      tonight: null,
      href: undefined,
      advent: "Advent has begun. The family Advent calendar starts Tuesday, December 1: see the readings.",
    });
  });

  it("names the day of the Advent calendar, in U13's words", () => {
    expect(said("2026-12-06")).toEqual({
      tonight: "Tonight at the table: A Child Is Given, December 6 in the family Advent calendar.",
      href: "/family/devotions/advent-6",
      advent: null,
    });
    expect(said("2026-12-25").tonight).toBe("Christmas Day at the table: He Is Here, December 25 in the family Advent calendar.");
    // A year whose calendar starts before Advent Sunday says so first.
    expect(said("2028-12-01").tonight).toBe("Advent begins Sunday, December 3. Tonight at the table: The Long Wait Begins, December 1 in the family Advent calendar.");
  });

  it("is empty off the map", () => {
    expect(homeTonight("2040-01-01")).toEqual({ tonight: null, advent: null });
  });

  it("never carries an em-dash", () => {
    const day = new Date("2026-10-01T12:00:00Z");
    const end = new Date("2027-12-31T12:00:00Z");
    while (day <= end) {
      const s = said(day.toISOString().slice(0, 10));
      expect(`${s.tonight ?? ""} ${s.advent ?? ""}`).not.toContain("—");
      day.setUTCDate(day.getUTCDate() + 1);
    }
  });
});

describe("Home's tonight line", () => {
  it("names tonight's devotion and links its page, without fetching anything for it", async () => {
    setToday(2026, 10, 27);
    const fetch = renderHome();
    expect(await screen.findByTestId("home-tonight")).toHaveTextContent("Tonight at the table: Strong Enough To Be Gentle.");
    expect(screen.getByRole("link", { name: "Strong Enough To Be Gentle" })).toHaveAttribute("href", "/family/devotions/gentleness");
    expect(fetch.mock.calls.map(([url]) => String(url)).filter((u) => u.includes("family"))).toEqual([]);
    expect(screen.queryByTestId("home-continue")).toBeNull();
  });

  it("offers Continue beside it when this device has a self-check left part-way", async () => {
    setToday(2026, 10, 27);
    window.localStorage.setItem("livewell-progress-life-audit", JSON.stringify({ answers: { 0: 4 }, step: 2, savedAt: "2026-10-26T20:00:00.000Z" }));
    renderHome();
    expect(await screen.findByRole("link", { name: "Continue the Life Audit" })).toHaveAttribute("href", "/tools/life-audit");
  });

  it("shows nothing at all when there is nothing to show", async () => {
    setToday(2040, 1, 1);
    const { container } = renderWithProviders(<Home />);
    await tonightSettled();
    expect(container.querySelector(".home-tonight")).toBeNull();
  });

  it("stays out of the entry script, and its slot holds one line", () => {
    // Home is in the entry every route loads; the line, the year map, and Continue are not.
    const home = fs.readFileSync(path.resolve(__dirname, "../Home.tsx"), "utf8");
    expect(home).not.toMatch(/^import[^;]*from "\.\/home\/HomeTonight";/m);
    expect(home).toContain('import("./home/HomeTonight")');
    // The slot is one .home-tonight__line tall, so the doors do not move when the line arrives.
    const css = fs.readFileSync(path.resolve(__dirname, "../../index.css"), "utf8");
    expect(css).toMatch(/\.home-tonight__line\{[^}]*font-size:17px;line-height:1\.6;/);
    expect(css).toContain(".home-tonight--slot{min-height:calc(17px * 1.6)}");
  });
});

describe("Home's doors", () => {
  it("include Topics and Family", () => {
    setToday(2026, 10, 27);
    renderHome();
    const doors = screen.getByRole("heading", { name: "Where to begin" }).nextElementSibling as HTMLElement;
    expect(within(doors).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(["/study/bible", "/topics", "/writing", "/family", "/books"]);
    expect(within(doors).getByRole("link", { name: /^Hard questions/ }).getAttribute("href")).toBe("/topics");
  });
});

describe("Find on Home", () => {
  const field = () => screen.getByRole("searchbox", { name: "Look up a passage or ask a question" });

  it("is one labelled field in a search landmark", () => {
    renderHome();
    expect(screen.getByRole("search", { name: "Look up a passage or ask a question" })).toContainElement(field());
    expect(screen.getByRole("button", { name: "Find" })).toBeTruthy();
  });

  it("offers the passage as it is typed, once focused", async () => {
    renderHome();
    fireEvent.focus(field());
    fireEvent.change(field(), { target: { value: "jn 3 16" } });
    expect(await screen.findByRole("link", { name: "Open John 3:16 in the Study Bible" })).toHaveAttribute("href", "/study/bible/john/3#v16");
  });

  it("sends a reference to the verse", async () => {
    renderHome();
    fireEvent.change(field(), { target: { value: "John 3:16" } });
    fireEvent.submit(field());
    await waitFor(() => expect(`${window.location.pathname}${window.location.hash}`).toBe("/study/bible/john/3#v16"));
  });

  it("sends a question to search", async () => {
    renderHome();
    fireEvent.change(field(), { target: { value: "is america a christian nation" } });
    fireEvent.submit(field());
    await waitFor(() => expect(window.location.pathname).toBe("/search"));
    expect(new URLSearchParams(window.location.search).get("q")).toBe("is america a christian nation");
  });

  it("stays put when nothing is typed", async () => {
    renderHome();
    fireEvent.submit(field());
    await new Promise((r) => setTimeout(r, 20));
    expect(window.location.pathname).toBe("/");
  });
});
