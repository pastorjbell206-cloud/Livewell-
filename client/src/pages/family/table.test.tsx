/**
 * The Table, core (U17): /family opens on tonight's devotion and one tap
 * ("Start") reaches step one at the table; table mode walks the parts one per
 * screen with the step in the URL and ends on "We did this tonight", which
 * records the date on this device and sends one anonymous event;
 * /family/tonight resolves to tonight's page; every devotion, weekly or a day
 * of a set, has its own page; and /family no longer downloads the posts list.
 * Rendered from the real data files, with the clock set.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";
import { track as vercelTrack } from "@vercel/analytics";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { FAMILY_PROGRESS_KEY, weekOfYear, type FamilyIndex } from "@/lib/familyTable";
import { catechismWeekIndex } from "@/lib/familyCatechism";
import Family from "../Family";
import Tonight from "./Tonight";
import DevotionPage from "./DevotionPage";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const PUBLIC = path.resolve(__dirname, "../../../public");
const FILES = ["family/index.json", "family-devotions.json", "family-devotions-2.json", "family-seasonal.json"];
const INDEX: FamilyIndex = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family/index.json"), "utf8"));
const row = (id: string) => INDEX.devotions.find((r) => r.id === id)!;

let requests: string[] = [];
function serveFamily(online = true) {
  requests = [];
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      requests.push(url);
      const name = url.replace(/^\//, "");
      if (online && FILES.includes(name)) {
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      }
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

beforeEach(() => {
  window.localStorage.clear();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.mocked(vercelTrack).mockClear();
  window.history.pushState({}, "", "/");
});

describe("/family", () => {
  it("opens on tonight's devotion, with where the family is, and never asks for the posts list", async () => {
    const when = new Date(2026, 10, 3, 19); // Tuesday, November 3, 2026, 7 pm
    at(when);
    window.localStorage.setItem(FAMILY_PROGRESS_KEY, JSON.stringify({ v: 1, start: "2026-10-27", band: "together", done: [{ id: "identity", date: "2026-10-30" }] }));
    serveFamily();
    renderAt("/family");

    const tonight = row("goodness"); // the week of November 1, 2026 on the year map
    const card = (await screen.findByRole("heading", { level: 2, name: tonight.title })).closest("section")!;
    expect(within(card).getByText("Tonight at the table")).toBeInTheDocument();
    expect(within(card).getByText(`${tonight.passage} · About ten minutes`)).toBeInTheDocument();
    expect(within(card).getByText(`Week ${weekOfYear("2026-11-03")} of the year`, { exact: false })).toBeInTheDocument();
    expect(within(card).getByText(`Last time: ${row("identity").title}, Friday`, { exact: false })).toBeInTheDocument();
    expect(within(card).getByRole("link", { name: "Start" })).toHaveAttribute("href", "/family/devotions/goodness?mode=table");
    expect(within(card).getByRole("link", { name: "Read it first" })).toHaveAttribute("href", "/family/devotions/goodness");

    const q = INDEX.catechism[catechismWeekIndex(when, INDEX.catechism.length)];
    expect(screen.getByText(`The catechism · Question ${q.number}`)).toBeInTheDocument();
    expect(screen.getByText(q.question)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Thanksgiving week\s*November 20 to 26/ })).toHaveAttribute("href", "/family/devotions?tab=thanksgiving");

    expect(screen.getByRole("heading", { level: 1, name: "Disciple your whole family, in one place." })).toBeInTheDocument();
    expect(requests.some((u) => u.includes("posts.listPublished"))).toBe(false);
    expect(requests.some((u) => u.includes("/family-devotions"))).toBe(false); // the card reads the index alone
  });

  it("is one tap from step one at the table", async () => {
    at(new Date(2026, 11, 6, 18)); // Sunday, December 6, 2026: Advent, day 6
    serveFamily();
    renderAt("/family");
    const start = await screen.findByRole("link", { name: "Start" });
    expect(start).toHaveAttribute("href", "/family/devotions/advent-6?mode=table");
    fireEvent.click(start);
    expect(await screen.findByRole("heading", { level: 2, name: "Read" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: row("advent-6").title })).toBeInTheDocument();
    expect(screen.getByText("1 of 5")).toBeInTheDocument(); // Read, Talk, Ask, Remember, Pray
  });

  it("says so when the index does not arrive, and loads on a retry", async () => {
    at(new Date(2026, 10, 3, 19));
    serveFamily(false);
    renderAt("/family");
    expect(await screen.findByRole("alert")).toHaveTextContent("Tonight's devotion didn't load.");
    serveFamily(true);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("heading", { level: 2, name: row("goodness").title })).toBeInTheDocument();
  });
});

describe("table mode", () => {
  it("walks the parts one per screen, keeps the step in the URL, and ends on We did this tonight", async () => {
    at(new Date(2026, 10, 3, 19));
    serveFamily();
    renderAt("/family/devotions/identity?mode=table");

    expect(await screen.findByRole("heading", { level: 2, name: "Read" })).toBeInTheDocument();
    expect(screen.getByText(row("identity").passage)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: `Open ${row("identity").passage} in the Study Bible` })).toHaveAttribute("href", "/study/bible/psalms/139#v13");
    expect(screen.getByText(/Scripture quoted from the Berean Standard Bible/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Leave table mode" })).toHaveAttribute("href", "/family/devotions/identity");
    expect(screen.queryByRole("navigation", { name: /main/i })).toBeNull(); // the site header gives way

    const titles = ["Talk", "Ask", "Do", "Remember", "Pray"];
    for (let i = 0; i < titles.length; i++) {
      const t = titles[i];
      fireEvent.click(screen.getByRole("button", { name: "Next" }));
      expect(await screen.findByRole("heading", { level: 2, name: t })).toBeInTheDocument();
      expect(window.location.search).toBe(`?mode=table&step=${i + 2}`);
      expect(screen.getByText(`${i + 2} of 6`)).toBeInTheDocument();
    }
    expect(screen.queryByRole("button", { name: "Next" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "We did this tonight" }));

    expect(await screen.findByRole("heading", { level: 2, name: "Done for tonight" })).toHaveFocus();
    expect(screen.getByText("This device will remember that you did this one tonight.")).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(FAMILY_PROGRESS_KEY)!)).toEqual({ v: 1, start: "2026-11-03", band: "together", done: [{ id: "identity", date: "2026-11-03" }] });
    expect(vercelTrack).toHaveBeenCalledWith("family_devotion_complete", { id: "identity", mode: "table" });
    expect(screen.getByRole("link", { name: "Back to Family" })).toHaveAttribute("href", "/family");
  });

  it("comes back to the step in the URL", async () => {
    serveFamily();
    renderAt("/family/devotions/identity?mode=table&step=4");
    expect(await screen.findByRole("heading", { level: 2, name: "Do" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(await screen.findByRole("heading", { level: 2, name: "Ask" })).toBeInTheDocument();
  });
});

describe("/family/tonight", () => {
  it("resolves to tonight's devotion page, carrying table mode along", async () => {
    at(new Date(2026, 11, 6, 18));
    serveFamily();
    renderAt("/family/tonight?mode=table");
    await waitFor(() => expect(window.location.pathname).toBe("/family/devotions/advent-6"));
    expect(window.location.search).toBe("?mode=table");
    expect(await screen.findByRole("heading", { level: 2, name: "Read" })).toBeInTheDocument();
  });
});

describe("/family/devotions/:id", () => {
  it("gives a weekly devotion its own page: every part, the Study Bible, Start at the table, and We did this tonight", async () => {
    at(new Date(2026, 10, 3, 19));
    serveFamily();
    renderAt("/family/devotions/identity");
    expect(await screen.findByRole("heading", { level: 1, name: row("identity").title })).toBeInTheDocument();
    for (const t of ["Read", "Talk", "Ask", "Do", "Remember", "Pray"]) expect(screen.getByRole("heading", { level: 2, name: t })).toBeInTheDocument();
    expect(screen.getByText("1 of 72 · Foundations")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start at the table" })).toHaveAttribute("href", "/family/devotions/identity?mode=table");
    expect(screen.getByRole("button", { name: "Print" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: `Next: ${INDEX.devotions[1].title}` })).toHaveAttribute("href", `/family/devotions/${INDEX.devotions[1].id}`);

    fireEvent.click(screen.getByRole("button", { name: "We did this tonight" }));
    expect(await screen.findByText("Done. This device will remember that you did this one tonight.")).toBeInTheDocument();
    expect(vercelTrack).toHaveBeenCalledWith("family_devotion_complete", { id: "identity", mode: "page" });
    // A second tap the same night is not a second event.
    fireEvent.click(screen.getByRole("button", { name: "We did this tonight" }));
    expect(vercelTrack).toHaveBeenCalledTimes(1);
  });

  it("starts the next devotion at its top", async () => {
    serveFamily();
    const scrollTo = vi.spyOn(window, "scrollTo");
    renderAt("/family/devotions/identity");
    await screen.findByRole("heading", { level: 1, name: row("identity").title });
    expect(scrollTo).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("link", { name: `Next: ${row("fear-and-anxiety").title}` }));
    expect(await screen.findByRole("heading", { level: 1, name: row("fear-and-anxiety").title })).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
    scrollTo.mockRestore();
  });

  it("gives a day of a daily set its own page, named as the paraphrase it is", async () => {
    at(new Date(2026, 10, 3, 19));
    serveFamily();
    renderAt("/family/devotions/advent-6");
    expect(await screen.findByRole("heading", { level: 1, name: row("advent-6").title })).toBeInTheDocument();
    expect(screen.getByText("Day 6 of 25 · Advent")).toBeInTheDocument();
    expect(screen.getByText(/The wording here is a paraphrase/)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "Do" })).toBeNull();
    expect(screen.getByRole("link", { name: `Next: ${row("advent-7").title}` })).toBeInTheDocument();
  });

  it("marks the page as tonight's when it is", async () => {
    at(new Date(2026, 10, 3, 19));
    serveFamily();
    renderAt("/family/devotions/goodness");
    expect(await screen.findByRole("heading", { level: 1, name: row("goodness").title })).toBeInTheDocument();
    expect(screen.getByText("· Tonight")).toBeInTheDocument();
    expect(screen.getByText(`Week ${weekOfYear("2026-11-03")} of the year`, { exact: false })).toBeInTheDocument();
  });

  it("says plainly when there is no such devotion", async () => {
    serveFamily();
    renderAt("/family/devotions/no-such-devotion");
    expect(await screen.findByRole("heading", { level: 1, name: "That devotion isn't here" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See all the family devotions" })).toHaveAttribute("href", "/family/devotions");
  });

  it("offers a retry when the data does not arrive", async () => {
    serveFamily(false);
    renderAt("/family/devotions/identity");
    expect(await screen.findByRole("alert")).toHaveTextContent("This devotion didn't load.");
    serveFamily(true);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("heading", { level: 1, name: row("identity").title })).toBeInTheDocument();
  });
});
