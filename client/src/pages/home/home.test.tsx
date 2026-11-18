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
import { LATEST_COUNT, committedLatest, latestFrom, longDate } from "./HomeLatest";
import { LATEST_CUTOFF, SHELF_ESSAYS, isPublicEssay } from "@/lib/shelf";

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
      tonight: "Tonight at the table: Strong Enough to Be Gentle.",
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
    expect(await screen.findByTestId("home-tonight")).toHaveTextContent("Tonight at the table: Strong Enough to Be Gentle.");
    expect(screen.getByRole("link", { name: "Strong Enough to Be Gentle" })).toHaveAttribute("href", "/family/devotions/gentleness");
    expect(fetch.mock.calls.map(([url]) => String(url)).filter((u) => u.includes("family"))).toEqual([]);
    expect(screen.queryByTestId("home-continue")).toBeNull();
  });

  it("offers Continue beside it when this device has a self-check left part-way", async () => {
    setToday(2026, 10, 27);
    window.localStorage.setItem("livewell-progress-life-audit", JSON.stringify({ answers: { 0: 4 }, step: 2, savedAt: "2026-10-26T20:00:00.000Z" }));
    renderHome();
    expect(await screen.findByRole("link", { name: "Continue a Quick Check on Eight Areas of Life" })).toHaveAttribute("href", "/tools/life-audit");
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
  it("are ten picture cards, in order, each opening a real page", () => {
    setToday(2026, 10, 27);
    renderHome();
    const doors = screen.getByRole("region", { name: "Where to begin." });
    // The section head offers the whole site first, then come the ten cards.
    expect(within(doors).getByRole("link", { name: "See everything on LiveWell" }).getAttribute("href")).toBe("/explore");
    expect(within(doors).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual([
      "/explore",
      "/study/bible",
      "/theology/history",
      "/topics",
      "/family",
      "/start",
      "/study",
      "/tools",
      "/writing",
      "/books",
      "/connect",
    ]);
    expect(within(doors).getByRole("link", { name: /Start here/ }).getAttribute("href")).toBe("/start");
    expect(within(doors).getByRole("link", { name: /Find James/ }).getAttribute("href")).toBe("/connect");
    // Every door carries its picture frame; the pictures themselves are decorative.
    expect(doors.querySelectorAll(".lw-door .lw-frame")).toHaveLength(10);
  });
});

describe("Home's latest writing", () => {
  const DAY = 86_400_000;
  const at = (iso: string) => Date.parse(iso);

  it("lists public essays only, newest first, each with its date", () => {
    const live = SHELF_ESSAYS.filter((e) => isPublicEssay(e.slug)).slice(0, 2);
    expect(live).toHaveLength(2);
    const retired = { slug: "an-essay-off-the-shelf", title: "Off the shelf", publishedAt: "2026-01-05T00:00:00.000Z" };
    const fresh = { slug: "a-post-from-the-admin", title: "A new post", publishedAt: new Date(LATEST_CUTOFF + 40 * DAY).toISOString() };
    const rows = [
      { slug: live[0].slug, title: live[0].title, publishedAt: "2025-03-02T00:00:00.000Z" },
      retired,
      { slug: live[1].slug, title: live[1].title, publishedAt: null, createdAt: "2025-06-09T00:00:00.000Z" },
      fresh,
    ];
    const latest = latestFrom(rows);
    expect(latest[0]).toEqual({ slug: fresh.slug, title: fresh.title, time: at(fresh.publishedAt) });
    expect(latest.map((e) => e.slug)).not.toContain(retired.slug);
    expect(latest.length).toBeLessThanOrEqual(LATEST_COUNT);
    expect(latest.map((e) => e.time)).toEqual([...latest.map((e) => e.time)].sort((a, b) => b - a));
    // An essay the database dated keeps that date (createdAt when it was never stamped published).
    const second = latest.find((e) => e.slug === live[1].slug);
    if (second) expect(second.time).toBe(at("2025-06-09T00:00:00.000Z"));
    expect(longDate(at("2026-10-27T00:00:00.000Z"))).toBe("October 27, 2026");
  });

  it("shows the rewritten essays with their dates when the listing never answers", async () => {
    renderHome();
    const committed = committedLatest();
    expect(committed.length).toBeGreaterThan(0);
    for (const e of committed) expect(isPublicEssay(e.slug), e.slug).toBe(true);
    const row = await screen.findByTestId("home-latest");
    expect(within(row).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(committed.map((e) => `/writing/${e.slug}`));
    expect(within(row).getAllByText(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/)).toHaveLength(committed.length);
    expect(screen.getByRole("heading", { name: "Latest writing" })).toBeTruthy();
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
    // The parser is a lazy import; under a full, parallel run it can take a few seconds.
    expect(await screen.findByRole("link", { name: "Open John 3:16 in the Study Bible" }, { timeout: 5000 })).toHaveAttribute("href", "/study/bible/john/3#v16");
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
