/**
 * /start: the road for someone new. Every link is a registered route, the
 * steps come in order with one link each, the counts the copy states still
 * match the site's own data, and the path to help stays on the page.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import Start, { START_NEXT, START_STEPS } from "./Start";

const ROOT = path.resolve(__dirname, "../../..");
const read = (file: string) => fs.readFileSync(path.join(ROOT, file), "utf8");
const json = (file: string) => JSON.parse(read(file));

afterEach(() => vi.unstubAllGlobals());

describe("/start", () => {
  it("sets six steps in order, one sentence and one link each, then what next and the way to help", () => {
    vi.stubGlobal("fetch", offlineFetch());
    renderWithProviders(<Start />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("New to faith, or coming back");

    const road = screen.getByRole("heading", { name: "The road" }).nextElementSibling as HTMLElement;
    const steps = within(road).getAllByRole("listitem");
    expect(steps).toHaveLength(6);
    expect(steps.map((li) => within(li).getAllByRole("link").map((a) => a.getAttribute("href")))).toEqual(
      START_STEPS.map((s) => [s.href])
    );
    expect(START_STEPS[0].href).toBe("/study/bible/john");
    for (const s of START_STEPS) expect(s.line.match(/[.?!](\s|$)/g) ?? [], s.title).toHaveLength(1);

    for (const n of START_NEXT) expect(screen.getByRole("link", { name: n.link }).getAttribute("href")).toBe(n.href);
    expect(screen.getByRole("link", { name: "Find help for what you are facing" }).getAttribute("href")).toBe("/help");
    expect(screen.getByRole("link", { name: "the page for people hurt by a church" }).getAttribute("href")).toBe("/help/church-hurt");
    expect(screen.getByRole("link", { name: "Answer three questions" }).getAttribute("href")).toBe("/start/quiz");
  });

  it("states only what the linked pages hold", () => {
    // John's twenty-one chapters, each with notes.
    const john = json("client/public/bible/books.json").find((b: { slug: string }) => b.slug === "john");
    expect(john.chapters).toBe(21);
    // The catechism's seventy-six questions, the first one, and both answers.
    const catechism = json("client/public/family-catechism.json");
    expect(catechism).toHaveLength(76);
    expect(catechism[0].question).toBe("Who made you?");
    expect(catechism.every((q: { answer?: string; kidsAnswer?: string }) => q.answer && q.kidsAnswer)).toBe(true);
    // The plans and the study, by the names the steps use.
    expect(json("client/public/plans/prayer.json").title).toBe("Eight Weeks of Learning to Pray");
    expect(json("client/public/plans/new-believer.json").title).toBe("Eight Weeks of Beginnings");
    const guide = json("client/public/studyguides/new-believer.json");
    expect(guide.sessions).toHaveLength(5);
    expect(guide.leaderPrimer).toBeTruthy();
    expect(read("client/public/wisdom/topics.json")).toContain('"id": "finding-a-church"');
    expect(fs.existsSync(path.join(ROOT, "client/public/needs/church-hurt.json"))).toBe(true);
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
