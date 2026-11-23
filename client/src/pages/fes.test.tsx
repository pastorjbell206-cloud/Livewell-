/**
 * The Family door, the catechism said aloud, and the essay shelf (unit fes).
 *
 * - /family keeps every link and every path to help the long page had.
 * - The catechism's practice card shows a question, turns to both answers
 *   exactly as written, steps through in order, remembers its place, and
 *   offers "Read it to me" only where the browser has a voice.
 * - /writing dates every essay it lists.
 */
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import Family from "./Family";
import FamilyCatechism from "./FamilyCatechism";
import Writing from "./Writing";
import { PRACTICE_KEY } from "./family/CatechismPractice";

const PUBLIC = path.resolve(__dirname, "../../public");
const catechism: { number: number; question: string; answer: string; kidsAnswer: string }[] = JSON.parse(
  fs.readFileSync(path.join(PUBLIC, "family-catechism.json"), "utf8"),
);

function serve(files: string[]) {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (files.includes(name)) return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      return base(input, init);
    }),
  );
}

beforeEach(() => window.localStorage.clear());
afterEach(() => {
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

describe("/family, cut short", () => {
  it("keeps every link the long page had, and the paths to help", async () => {
    serve(["family/index.json", "family-catechism.json", "family-reading-plans.json"]);
    renderWithProviders(<Family />);
    await screen.findByRole("list", { name: "This week" });
    const hrefs = new Set(Array.from(document.querySelectorAll("a[href]"), (a) => a.getAttribute("href")));
    for (const h of [
      "/family/tonight",
      "/family/devotions",
      "/family/catechism",
      "/family/reading-plans",
      "/topics/raising-children-in-a-secular-age",
      "/how-tos/parenting-how-to-start-family-worship",
      "/how-tos/fam-how-to-start-family-worship",
      "/how-tos/fam-how-to-pray-with-your-kids-at-bedtime",
      "/how-tos/fam-how-to-use-a-family-catechism",
      "/how-tos/fam-how-to-read-the-bible-with-young-children",
      "/help/family-devotions",
      "/how-tos/fam-how-to-disciple-teenagers-at-home",
      "/how-tos/parenting-how-to-stay-close-to-a-pulling-away-teenager",
      "/how-tos/parenting-how-to-answer-hard-questions-about-god",
      "/study/bible/1-corinthians/7",
      "/tools/family-devotions",
      "/tools/parent-teen-conversation",
      "/answers",
      "/wisdom/parenting-struggles",
      "/help/parenting",
      "/tools/parenting-guide",
      "/help/marriage",
      "/tools/marriage-assessment",
      "/tools/wisdom-finder",
      "/tools",
      "/tools/prayer-generator",
      "/tools/rule-of-life",
      "/help",
      "/help#help-now",
    ]) {
      expect(hrefs.has(h), h).toBe(true);
    }
    // The way to help is open at the foot, not folded away.
    expect(screen.getByRole("link", { name: "Find help for what you are facing" })).toBeVisible();
  });
});

describe("/family/catechism, said aloud", () => {
  // Every question in the list under the card is a button too, so a role
  // query over the whole page weighs about a hundred buttons, and polling one
  // while the page loads repeats that on every change. So the card is awaited
  // by its own words, and its buttons are found inside its own section.
  const aloud = () => within(document.getElementById("say-it-aloud")!);
  const cardShows = (n: number) => screen.findByText(`Question ${n} of ${catechism.length}`);

  it("turns a question to both answers exactly as written, steps on, and remembers its place", async () => {
    serve(["family-catechism.json"]);
    const first = renderWithProviders(<FamilyCatechism />);
    await cardShows(1);
    const card = aloud().getByRole("button", { name: /Showing the question/ });
    expect(within(card).getByText(catechism[0].question)).toBeInTheDocument();
    expect(screen.getByText(`Question 1 of ${catechism.length}`)).toBeInTheDocument();

    fireEvent.click(card);
    expect(card).toHaveAttribute("aria-pressed", "true");
    expect(within(card).getByText(catechism[0].kidsAnswer)).toBeInTheDocument();
    expect(within(card).getByText(catechism[0].answer)).toBeInTheDocument();

    fireEvent.click(aloud().getByRole("button", { name: "Next question" }));
    expect(screen.getByText(`Question 2 of ${catechism.length}`)).toBeInTheDocument();
    expect(within(aloud().getByRole("button", { name: /Showing the question/ })).getByText(catechism[1].question)).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(PRACTICE_KEY)!)).toEqual({ v: 1, at: 2 });
    fireEvent.click(aloud().getByRole("button", { name: "Previous question" }));
    fireEvent.click(aloud().getByRole("button", { name: "Previous question" }));
    expect(screen.getByText(`Question ${catechism.length} of ${catechism.length}`)).toBeInTheDocument();
    first.unmount();

    renderWithProviders(<FamilyCatechism />);
    await waitFor(() => expect(screen.getByText(`Question ${catechism.length} of ${catechism.length}`)).toBeInTheDocument());
    // No voice in this browser: no button.
    expect(screen.queryByRole("button", { name: "Read it to me" })).toBeNull();
  });

  it("reads the question, then both answers once turned, in the browser's own voice", async () => {
    const spoken: string[] = [];
    vi.stubGlobal("speechSynthesis", { speak: vi.fn((u: { text: string }) => spoken.push(u.text)), cancel: vi.fn() });
    vi.stubGlobal(
      "SpeechSynthesisUtterance",
      class {
        text: string;
        rate = 1;
        onend: null | (() => void) = null;
        onerror: null | (() => void) = null;
        constructor(t: string) {
          this.text = t;
        }
      },
    );
    serve(["family-catechism.json"]);
    renderWithProviders(<FamilyCatechism />);
    await cardShows(1);
    const read = aloud().getByRole("button", { name: "Read it to me" });
    fireEvent.click(read);
    expect(spoken).toEqual([catechism[0].question]);
    fireEvent.click(aloud().getByRole("button", { name: "Stop" }));
    fireEvent.click(aloud().getByRole("button", { name: /Showing the question/ }));
    spoken.length = 0;
    fireEvent.click(aloud().getByRole("button", { name: "Read it to me" }));
    expect(spoken).toEqual([catechism[0].question, catechism[0].kidsAnswer, catechism[0].answer]);
  });
});

describe("/writing, dated", () => {
  it("dates every essay it lists", () => {
    vi.stubGlobal("fetch", vi.fn(offlineFetch()));
    window.history.replaceState(null, "", "/writing");
    renderWithProviders(<Writing />);
    const items = Array.from(document.querySelectorAll(".wr-item"));
    expect(items.length).toBeGreaterThan(0);
    // Before the listing answers, a rewrite carries its own date; once it answers, every row does.
    const dated = items.filter((a) => a.querySelector("time"));
    expect(dated.length).toBeGreaterThan(0);
    for (const a of dated) expect(a.querySelector("time")!.textContent).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/);
  });
});
