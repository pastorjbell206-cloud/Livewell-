/**
 * The family catechism at a table (TOOLS run of 2026-11-22): the week's
 * question as a card with everything beside its answer (the child's answer,
 * plain words, the verse, one thing to talk about, the matching film), three
 * steps for the week kept on this device, the say-it-aloud card with "We
 * know this one" and "Pass over the ones we know", and a card that prints.
 * Rendered from the real data files.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { CATECHISM_PRACTICE_KEY, CATECHISM_WEEK_KEY, WEEK_STEPS, isCatechismWeek, isPracticePlace, nextPractice, readCatechismWeek, toggleWeekStep } from "@/lib/familyCatechism";
import { forgetFamilyFilms, type FamilyFilms } from "@/lib/familyFilms";
import type { CatechismEntry } from "./CatechismWeek";
import FamilyCatechism from "../FamilyCatechism";

const PUBLIC = path.resolve(__dirname, "../../../public");
const catechism: CatechismEntry[] = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family-catechism.json"), "utf8"));
const MAP: FamilyFilms = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family/films.json"), "utf8"));
const SERVED = /^(family-catechism\.json|family\/films\.json|explorer\/films\/[a-z0-9-]+\.json)$/;

function serve() {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (SERVED.test(name)) return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      return base(input, init);
    }),
  );
}

beforeEach(() => {
  window.localStorage.clear();
  forgetFamilyFilms();
  serve();
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

const weekCard = () => screen.findByRole("article", { name: catechism[0].question });

describe("the catechism's data", () => {
  it("gives every question one plain sentence and one thing to talk about, beside its answer", () => {
    expect(catechism).toHaveLength(76);
    for (const q of catechism) {
      expect(q.plainWords, `Q${q.number} plainWords`).toBeTruthy();
      expect(q.talkAbout, `Q${q.number} talkAbout`).toBeTruthy();
      expect(q.plainWords).not.toBe(q.kidsAnswer);
      expect(q.plainWords!.split(/\s+/).length).toBeLessThanOrEqual(30);
      expect(`${q.plainWords} ${q.talkAbout}`).not.toMatch(/—|!/);
    }
  });

  it("adds nothing that takes a side on baptism or the Supper", () => {
    const sides = /\b(infants?|bab(y|ies)|believers? only|immers|sprinkl|pour(ed|ing)?|memorial|merely|symbol|real presence|transubstant|sacrament|ordinance|covenant sign|age of)\b/i;
    for (const n of [47, 48, 61, 62]) {
      const q = catechism[n - 1];
      expect(`${q.plainWords} ${q.talkAbout}`, `Q${n}`).not.toMatch(sides);
    }
  });
});

describe("the helpers", () => {
  it("keeps the week's ticks for their own question only", () => {
    expect(readCatechismWeek(3)).toEqual([]);
    const a = toggleWeekStep(3, [], "say");
    expect(a).toEqual({ steps: ["say"], ok: true });
    expect(readCatechismWeek(3)).toEqual(["say"]);
    expect(readCatechismWeek(4)).toEqual([]);
    expect(toggleWeekStep(3, a.steps, "say").steps).toEqual([]);
    expect(isCatechismWeek({ v: 1, q: 3, steps: ["sing"] })).toBe(false);
    expect(isCatechismWeek({ v: 1, q: 3, steps: ["talk"] })).toBe(true);
  });

  it("steps round the list, and passes over known questions only when asked", () => {
    const known = (n: number) => n === 2 || n === 3;
    expect(nextPractice(1, 1, 5, false, known)).toBe(2);
    expect(nextPractice(1, 1, 5, true, known)).toBe(4);
    expect(nextPractice(4, -1, 5, true, known)).toBe(1);
    expect(nextPractice(5, 1, 5, true, known)).toBe(1);
    expect(nextPractice(1, -1, 5, false, known)).toBe(5);
    // Every question known: nothing to pass over.
    expect(nextPractice(2, 1, 5, true, () => true)).toBe(3);
    expect(isPracticePlace({ v: 1, at: 2 })).toBe(true);
    expect(isPracticePlace({ v: 1, at: 2, skip: "yes" })).toBe(false);
  });
});

describe("this week's question", () => {
  it("lays the question out whole: both answers, plain words, the verse with its reference, and one thing to talk about", async () => {
    renderWithProviders(<FamilyCatechism />);
    const card = await weekCard();
    const q = catechism[0];
    for (const text of [q.answer, q.kidsAnswer, q.plainWords!, q.scriptureText, q.talkAbout!, q.prayer!]) expect(within(card).getByText(text)).toBeInTheDocument();
    expect(within(card).getByText("In plain words")).toBeInTheDocument();
    expect(within(card).getByText("Talk about it")).toBeInTheDocument();
    expect(within(card).getByRole("link", { name: new RegExp(q.scripture) })).toBeInTheDocument();
    expect(within(card).getByText(/Berean Standard Bible/)).toBeInTheDocument();
  });

  it("offers the matching film, opened in place", async () => {
    expect(MAP.catechism["1"]).toBeTruthy();
    renderWithProviders(<FamilyCatechism />);
    const card = await weekCard();
    fireEvent.click(await within(card).findByRole("button", { name: /Watch first/ }));
    expect(await within(card).findByRole("button", { name: "Back to the question" })).toBeInTheDocument();
  });

  it("keeps the week's ticks through a reload and starts clean on the next question", async () => {
    const first = renderWithProviders(<FamilyCatechism />);
    await weekCard();
    const say = screen.getByRole("checkbox", { name: new RegExp(WEEK_STEPS[0].label) });
    fireEvent.click(say);
    expect(say).toBeChecked();
    expect(JSON.parse(window.localStorage.getItem(CATECHISM_WEEK_KEY)!)).toEqual({ v: 1, q: 1, steps: ["say"] });
    first.unmount();

    renderWithProviders(<FamilyCatechism />);
    await weekCard();
    await waitFor(() => expect(screen.getByRole("checkbox", { name: new RegExp(WEEK_STEPS[0].label) })).toBeChecked());
    expect(screen.getByRole("checkbox", { name: new RegExp(WEEK_STEPS[1].label) })).not.toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: "We learned it. Next question" }));
    await screen.findByRole("article", { name: catechism[1].question });
    for (const s of WEEK_STEPS) expect(screen.getByRole("checkbox", { name: new RegExp(s.label) })).not.toBeChecked();
  });

  it("says so when the browser will not keep a tick", async () => {
    renderWithProviders(<FamilyCatechism />);
    await weekCard();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("full");
    });
    fireEvent.click(screen.getByRole("checkbox", { name: new RegExp(WEEK_STEPS[2].label) }));
    expect(screen.getByRole("checkbox", { name: new RegExp(WEEK_STEPS[2].label) })).toBeChecked();
    expect(screen.getAllByText(SAVE_FAILED).length).toBeGreaterThan(0);
  });

  it("prints the card", async () => {
    const print = vi.fn();
    vi.stubGlobal("print", print);
    renderWithProviders(<FamilyCatechism />);
    await weekCard();
    fireEvent.click(screen.getByRole("button", { name: "Print this card" }));
    expect(print).toHaveBeenCalledTimes(1);
    expect(document.querySelector(".cw-printhead")?.textContent).toBe("The Family Catechism · Question 1 of 76");
  });

  it("takes its question to the say-it-aloud card", async () => {
    window.localStorage.setItem(CATECHISM_PRACTICE_KEY, JSON.stringify({ v: 1, at: 9 }));
    renderWithProviders(<FamilyCatechism />);
    await weekCard();
    expect(screen.getByText("Question 9 of 76")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Say this one aloud" }));
    await waitFor(() => expect(screen.getByText("Question 1 of 76")).toBeInTheDocument());
  });
});

describe("saying it aloud", () => {
  it("hides the answer until the card is turned, ticks a question as known, and keeps both through a reload", async () => {
    const first = renderWithProviders(<FamilyCatechism />);
    const card = await screen.findByRole("button", { name: /Showing the question/ });
    expect(card).toHaveAttribute("aria-pressed", "false");
    expect(card.querySelector(".cp-face--back")).toHaveAttribute("aria-hidden", "true");
    fireEvent.click(card);
    expect(card.querySelector(".cp-face--back")).toHaveAttribute("aria-hidden", "false");

    expect(screen.getByText("You know 0 of 76.")).toBeInTheDocument();
    const know = screen.getByRole("button", { name: "We know this one" });
    fireEvent.click(know);
    expect(know).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("You know 1 of 76.")).toBeInTheDocument();
    // The same tick the list shows.
    expect(screen.getByText("1 of 76 learned")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    expect(screen.getByRole("button", { name: "We know this one" })).toHaveAttribute("aria-pressed", "false");
    first.unmount();

    renderWithProviders(<FamilyCatechism />);
    await waitFor(() => expect(screen.getByText("Question 2 of 76")).toBeInTheDocument());
    expect(screen.getByText("You know 1 of 76.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous question" }));
    expect(screen.getByRole("button", { name: "We know this one" })).toHaveAttribute("aria-pressed", "true");
  });

  it("passes over the ones the family knows, and remembers that it was asked to", async () => {
    window.localStorage.setItem("lw-family-catechism-v1", JSON.stringify({ "2": true, "3": true }));
    const first = renderWithProviders(<FamilyCatechism />);
    await screen.findByRole("button", { name: /Showing the question/ });
    fireEvent.click(screen.getByRole("checkbox", { name: "Pass over the ones we know" }));
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    expect(screen.getByText("Question 4 of 76")).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(CATECHISM_PRACTICE_KEY)!)).toEqual({ v: 1, at: 4, skip: true });
    first.unmount();

    renderWithProviders(<FamilyCatechism />);
    await waitFor(() => expect(screen.getByText("Question 4 of 76")).toBeInTheDocument());
    expect(screen.getByRole("checkbox", { name: "Pass over the ones we know" })).toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "Previous question" }));
    expect(screen.getByText("Question 1 of 76")).toBeInTheDocument();
  });

  it("says so when the browser will not keep the card's place", async () => {
    renderWithProviders(<FamilyCatechism />);
    await screen.findByRole("button", { name: /Showing the question/ });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("full");
    });
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    expect(screen.getByText("Question 2 of 76")).toBeInTheDocument();
    expect(screen.getAllByText(SAVE_FAILED).length).toBeGreaterThan(0);
  });
});

describe("the list of every question", () => {
  it("opens a question to its plain words, its talk-about line, and its film", async () => {
    renderWithProviders(<FamilyCatechism />);
    await weekCard();
    const q = catechism[52];
    expect(MAP.catechism["53"]).toBeTruthy();
    const row = document.getElementById("q53")!;
    fireEvent.click(within(row).getByRole("button", { name: new RegExp(q.question.replace("?", "\\?")) }));
    expect(within(row).getByText(q.plainWords!)).toBeInTheDocument();
    expect(within(row).getByText(q.talkAbout!)).toBeInTheDocument();
    expect(within(row).getByText(q.scriptureText)).toBeInTheDocument();
    expect(await within(row).findByRole("button", { name: /Watch first/ })).toBeInTheDocument();
  });
});
