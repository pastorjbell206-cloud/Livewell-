/**
 * /start, "Start where you are": five roads, one for each person the site is
 * for. Every step links a page that exists and does not redirect, every road
 * is four to six steps, the road for someone new is the six steps it was,
 * the road for someone who stepped back meets church hurt first, the counts
 * the copy states still match the data, ticks survive a reload, and Home's
 * chips name the same five roads.
 */
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { fireEvent, screen, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { ROADS, START_ROADS_KEY, readRoadProgress } from "@/lib/startRoads";
import { TRACKS_KEY } from "@/lib/tracks";
import { isPublicEssayHref } from "@/lib/shelf";
import { ROAD_CHIPS } from "./home/roadChips";
import Start, { START_NEXT, START_STEPS } from "./Start";
import { ANSWERS } from "@/data/answers";

const ROOT = path.resolve(__dirname, "../../..");
const read = (file: string) => fs.readFileSync(path.join(ROOT, file), "utf8");
const json = (file: string) => JSON.parse(read(file));
const exists = (file: string) => fs.existsSync(path.join(ROOT, file));

/** The routes App.tsx registers, and the redirects vercel.json holds. */
const ROUTES: string[] = Array.from(read("client/src/App.tsx").matchAll(/<Route path="([^"]+)"/g), (m) => m[1]);
const REDIRECTS = new Set((json("vercel.json").redirects as { source: string }[]).map((r) => r.source));

/** Whether an address is a page that exists and answers without a redirect. */
function resolveHref(href: string): { status: "ok" | "missing" | "redirect" } {
  const p = href.split("#")[0];
  if (REDIRECTS.has(p)) return { status: "redirect" };
  const parts = p.split("/");
  const route = ROUTES.find((r) => r === p) ?? ROUTES.find((r) => r.includes(":") && r.split("/").length === parts.length && r.split("/").every((x: string, i: number) => x.startsWith(":") || x === parts[i]));
  if (!route) return { status: "missing" };
  const slug = parts[parts.length - 1];
  const files: Record<string, boolean> = {
    "/answers/:slug": ANSWERS.some((a) => a.slug === slug),
    "/help/:slug": exists(`client/public/needs/${slug}.json`),
    "/plans/:slug": exists(`client/public/plans/${slug}.json`),
    "/studyguides/:slug": exists(`client/public/studyguides/${slug}.json`),
    "/wisdom/:id": read("client/public/wisdom/topics.json").includes(`"id": "${slug}"`),
    "/study/bible/:book": (json("client/public/bible/books.json") as { slug: string }[]).some((b) => b.slug === slug),
  };
  if (route.includes(":") && files[route] === false) return { status: "missing" };
  return { status: "ok" };
}

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, "", "/start");
});
afterEach(() => vi.unstubAllGlobals());

describe("/start: the five roads", () => {
  it("holds five roads of four to six steps, each a real, public page, one sentence and one link", () => {
    expect(ROADS.map((r) => r.id)).toEqual(["skeptical", "new", "stepped-back", "deeper", "family"]);
    for (const r of ROADS) {
      expect(r.steps.length, r.id).toBeGreaterThanOrEqual(4);
      expect(r.steps.length, r.id).toBeLessThanOrEqual(6);
      for (const s of r.steps) {
        expect(resolveHref(s.href).status, `${r.id}: ${s.href}`).toBe("ok");
        expect(isPublicEssayHref(s.href), s.href).toBe(true);
        expect(s.line.match(/[.?!](\s|$)/g) ?? [], s.title).toHaveLength(1);
        expect(`${s.title} ${s.line} ${s.link}`).not.toMatch(/—/);
      }
    }
    const hrefs = [...START_NEXT.map((n) => n.href), "/help", "/help/church-hurt", "/start/quiz"];
    for (const h of hrefs) expect(resolveHref(h).status, h).toBe("ok");
  });

  it("keeps the road for someone new as it was: John first, six steps", () => {
    expect(START_STEPS.map((s) => s.href)).toEqual([
      "/study/bible/john",
      "/plans/prayer",
      "/wisdom/finding-a-church",
      "/plans/new-believer",
      "/family/catechism",
      "/studyguides/new-believer",
    ]);
  });

  it("meets church hurt first on the road for someone who stepped back", () => {
    const back = ROADS.find((r) => r.id === "stepped-back")!;
    expect(back.steps[0].href).toBe("/help/church-hurt");
  });

  it("names the same five roads in Home's chips", () => {
    expect(ROAD_CHIPS).toEqual(ROADS.map((r) => ({ id: r.id, chip: r.chip })));
  });

  it("opens with the five choices, opens a road from its address, and keeps the help line", () => {
    vi.stubGlobal("fetch", offlineFetch());
    window.history.replaceState(null, "", "/start#skeptical");
    renderWithProviders(<Start />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Start where you are");
    const cards = screen.getAllByRole("link", { name: /I'm skeptical|I'm new to this|I've stepped back|I want to go deeper|I'm leading a family/ });
    expect(cards).toHaveLength(5);
    const road = screen.getByRole("heading", { level: 2, name: "If you're skeptical" }).closest("section") as HTMLElement;
    const steps = within(road).getAllByRole("listitem");
    expect(steps).toHaveLength(6);
    expect(screen.getByRole("link", { name: "Find help for what you are facing" }).getAttribute("href")).toBe("/help");
  });

  it("shows the road for someone new with what next, the line for church hurt and the quiz", () => {
    vi.stubGlobal("fetch", offlineFetch());
    renderWithProviders(<Start />);
    fireEvent.click(screen.getByRole("link", { name: /I'm new to this/ }));
    const road = screen.getByRole("heading", { level: 2, name: "New to faith, or coming back" }).closest("section") as HTMLElement;
    const list = within(road).getAllByRole("list")[0];
    expect(within(list).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(START_STEPS.map((s) => s.href));
    for (const n of START_NEXT) expect(screen.getByRole("link", { name: n.link }).getAttribute("href")).toBe(n.href);
    expect(screen.getByRole("link", { name: "the page for people hurt by a church" }).getAttribute("href")).toBe("/help/church-hurt");
    expect(screen.getByRole("link", { name: "Answer three questions" }).getAttribute("href")).toBe("/start/quiz");
    expect(window.location.hash).toBe("#new");
  });

  it("offers the track as the main action of the road for someone new, with the six steps kept under it", () => {
    vi.stubGlobal("fetch", offlineFetch());
    window.history.replaceState(null, "", "/start#new");
    renderWithProviders(<Start />);
    const road = screen.getByRole("heading", { level: 2, name: "New to faith, or coming back" }).closest("section") as HTMLElement;
    expect(within(road).getByText(/This road is now a track: 12 short sessions in order/)).toBeInTheDocument();
    expect(within(road).getByRole("link", { name: "Start the track" }).getAttribute("href")).toBe("/tracks/new-to-this/1");
    expect(within(road).getByRole("link", { name: "See the 12 sessions" }).getAttribute("href")).toBe("/tracks/new-to-this");
    expect(within(road).getByRole("heading", { level: 3, name: "Or take the 6 first steps on their own" })).toBeInTheDocument();
    // The track is the one filled button; the steps are all still there, as plain links.
    expect(Array.from(road.querySelectorAll("a.btn:not(.btn--quiet)")).map((a) => a.textContent)).toEqual(["Start the track"]);
    expect(within(within(road).getAllByRole("list")[0]).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(START_STEPS.map((s) => s.href));
    // A road with no track yet is as it was: its next step is the button.
    fireEvent.click(screen.getByRole("link", { name: /I'm leading a family/ }));
    const other = screen.getByRole("heading", { level: 2, name: "If you're leading a family" }).closest("section") as HTMLElement;
    expect(within(other).queryByText(/This road is now a track/)).toBeNull();
    expect(other.querySelectorAll("a.btn").length).toBe(1);
  });

  it("offers the skeptic's track as the main action of the road for the skeptic, with its six steps kept under it", () => {
    vi.stubGlobal("fetch", offlineFetch());
    window.history.replaceState(null, "", "/start#skeptical");
    renderWithProviders(<Start />);
    const road = screen.getByRole("heading", { level: 2, name: "If you're skeptical" }).closest("section") as HTMLElement;
    expect(within(road).getByText(/This road is now a track: 12 short sessions in order/)).toBeInTheDocument();
    expect(within(road).getByRole("link", { name: "Start the track" }).getAttribute("href")).toBe("/tracks/skeptical/1");
    expect(within(road).getByRole("link", { name: "See the 12 sessions" }).getAttribute("href")).toBe("/tracks/skeptical");
    expect(within(road).getByRole("heading", { level: 3, name: "Or take the 6 first steps on their own" })).toBeInTheDocument();
    expect(Array.from(road.querySelectorAll("a.btn:not(.btn--quiet)")).map((a) => a.textContent)).toEqual(["Start the track"]);
  });

  it("continues a track begun on this device, on the road and above the five choices", () => {
    vi.stubGlobal("fetch", offlineFetch());
    window.localStorage.setItem(TRACKS_KEY, JSON.stringify({ v: 1, tracks: { "new-to-this": { title: "New to faith, or coming back", total: 12, done: [1, 2, 3], notes: {}, at: "2026-11-20T10:00:00.000Z" } } }));
    const first = renderWithProviders(<Start />);
    const line = screen.getByTestId("start-track-continue");
    expect(line).toHaveTextContent("Continue your track: New to faith, or coming back, session 4 of 12");
    expect(within(line).getByRole("link").getAttribute("href")).toBe("/tracks/new-to-this/4");
    first.unmount();
    window.history.replaceState(null, "", "/start#new");
    renderWithProviders(<Start />);
    expect(screen.getByRole("link", { name: "Continue the track at session 4" }).getAttribute("href")).toBe("/tracks/new-to-this/4");
  });

  it("remembers a ticked step through a reload, and offers to pick up where you left off", () => {
    vi.stubGlobal("fetch", offlineFetch());
    window.history.replaceState(null, "", "/start#family");
    const first = renderWithProviders(<Start />);
    fireEvent.click(screen.getByRole("button", { name: "Done: Tonight's devotion" }));
    expect(screen.getByRole("button", { name: "Done: Tonight's devotion" }).getAttribute("aria-pressed")).toBe("true");
    expect(readRoadProgress().done.family).toEqual(["/family/tonight"]);
    expect(window.localStorage.getItem(START_ROADS_KEY)).toContain("/family/tonight");
    first.unmount();

    window.history.replaceState(null, "", "/start");
    renderWithProviders(<Start />);
    fireEvent.click(screen.getByRole("link", { name: /I'm leading a family, step 2/ }));
    expect(screen.getByRole("button", { name: "Done: Tonight's devotion" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("states only what the linked pages hold", () => {
    // John's twenty-one chapters, each with notes; Mark the shortest Gospel.
    const books: { slug: string; chapters: number }[] = json("client/public/bible/books.json");
    const ch = (slug: string) => books.find((b) => b.slug === slug)!.chapters;
    expect(ch("john")).toBe(21);
    expect(Math.min(ch("matthew"), ch("luke"), ch("john"))).toBeGreaterThan(ch("mark"));
    // The catechism's seventy-six questions, the first one, and both answers.
    const catechism = json("client/public/family-catechism.json");
    expect(catechism).toHaveLength(76);
    expect(catechism[0].question).toBe("Who made you?");
    expect(catechism.every((q: { answer?: string; kidsAnswer?: string }) => q.answer && q.kidsAnswer)).toBe(true);
    // The plans, the care pages and the study, by the names the steps use.
    expect(json("client/public/plans/prayer.json").title).toBe("Eight Weeks of Learning to Pray");
    expect(json("client/public/plans/new-believer.json").title).toBe("Eight Weeks for a New Christian");
    expect(json("client/public/plans/skeptic.json").title).toBe("Eight Weeks for the Curious Skeptic");
    expect(json("client/public/plans/deconstruction.json").title).toBe("Eight Weeks of Taking Your Questions Seriously");
    expect(json("client/public/needs/church-hurt.json").title).toBe("The church hurt me");
    expect(json("client/public/needs/deconstructing.json").title).toBe("I'm deconstructing my faith");
    const guide = json("client/public/studyguides/new-believer.json");
    expect(guide.sessions).toHaveLength(5);
    expect(guide.leaderPrimer).toBeTruthy();
    expect(read("client/public/wisdom/topics.json")).toContain('"id": "finding-a-church"');
    expect(read("client/public/creeds/documents-index.json")).toContain('"slug": "apostles-creed"');
  });

  it("is where the old discipleship pathway lands, in one hop, with the quiz one step in", () => {
    const rules: { source: string; destination: string }[] = json("vercel.json").redirects;
    expect(rules.find((r) => r.source === "/pathways/discipleship")?.destination).toBe("/start");
    expect(rules.some((r) => r.source === "/start" || r.source === "/start/quiz")).toBe(false);
    const app = read("client/src/App.tsx");
    expect(app).toContain('<Route path="/start" component={Start} />');
    expect(app).toContain('<Route path="/start/quiz" component={StartHereQuiz} />');
    expect(app.indexOf('path="/pathways/discipleship"')).toBeLessThan(app.indexOf('path="/pathways/:slug"'));
    expect(fs.existsSync(path.join(ROOT, "client/public/pathways/discipleship.json"))).toBe(false);
  });
});
