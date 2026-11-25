/**
 * What stands beside an Honest Answer: every link named in
 * answerCompanions.ts must land on something real, and the find box must find.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ANSWERS } from "./answers";
import { ANSWER_CARE, ANSWER_VIEWS, companionsFor } from "./answerCompanions";
import { caseBySlug } from "./argumentCases";
import { DOCTRINE_INDEX } from "@/lib/theology";
import { findAnswers } from "@/lib/findAnswers";

const quizzes: { slug: string }[] = JSON.parse(readFileSync(resolve(__dirname, "../../public/theology/theology-diagnostics.json"), "utf8")).quizzes;

describe("answer companions", () => {
  it("names only real answers, ready doctrines and real quizzes", () => {
    for (const [slug, v] of Object.entries(ANSWER_VIEWS)) {
      expect(ANSWERS.some((a) => a.slug === slug), slug).toBe(true);
      if (v.compare) expect(DOCTRINE_INDEX.some((d) => d.slug === v.compare && d.ready), v.compare).toBe(true);
      if (v.whichView) expect(quizzes.some((q) => q.slug === v.whichView), v.whichView).toBe(true);
    }
  });

  it("points the answers on fear, despair and harm to a real Find Help page, by its own title", () => {
    for (const [slug, care] of Object.entries(ANSWER_CARE)) {
      const answer = ANSWERS.find((a) => a.slug === slug);
      expect(answer, slug).toBeTruthy();
      const page = JSON.parse(readFileSync(resolve(__dirname, `../../public/needs/${care.slug}.json`), "utf8"));
      expect(page.page, care.slug).toBe(true);
      expect(page.title, care.slug).toBe(care.label);
      expect(companionsFor(answer!).map((c) => c.href)).toContain(`/help/${care.slug}`);
    }
  });

  it("points the doubter's answers to the page written for someone living them", () => {
    // The walk of 2026-11-23, finding 9: these ended with no way to the care page.
    const careFor = (slug: string) => companionsFor(ANSWERS.find((a) => a.slug === slug)!).find((c) => c.href.startsWith("/help/"))?.href;
    expect(careFor("what-if-christianity-is-wrong")).toBe("/help/doubt");
    expect(careFor("done-with-church-but-not-jesus")).toBe("/help/church-hurt");
    expect(careFor("can-you-be-a-christian-without-church")).toBe("/help/church-hurt");
    expect(careFor("what-happens-after-deconstruction")).toBe("/help/deconstructing");
  });

  it("offers Test the Case where a published case is built from the answer's essay", () => {
    const res = companionsFor(ANSWERS.find((a) => a.slug === "did-the-resurrection-actually-happen")!);
    expect(res[0].href).toBe("/tools/test-the-case?case=resurrection");
    for (const a of ANSWERS) {
      for (const c of companionsFor(a)) {
        const m = c.href.match(/\?case=(.+)$/);
        if (m) expect(caseBySlug(m[1])?.published, c.href).toBe(true);
      }
    }
  });

  it("offers both doctrine pages for election, and nothing where nothing matches", () => {
    const hrefs = companionsFor(ANSWERS.find((a) => a.slug === "does-god-choose-us-or-do-we-choose-him")!).map((c) => c.href);
    expect(hrefs).toContain("/theology/compare?doctrine=soteriology");
    expect(hrefs).toContain("/theology/which-view?topic=soteriology");
    // An answer with no case and no doctrine page still gets the tools that do its job (data/tool-offers.json).
    expect(companionsFor(ANSWERS.find((a) => a.slug === "what-does-the-bible-say-about-money")!).map((c) => c.href)).toEqual(["/tools/financial-health", "/tools/wisdom-finder"]);
    expect(companionsFor({ slug: "", essaySlug: "no-such-essay" })).toEqual([]);
  });
});

describe("the find box", () => {
  it("lists every answer when nothing is typed", () => {
    expect(findAnswers("")).toHaveLength(ANSWERS.length);
    expect(findAnswers("   ")).toHaveLength(ANSWERS.length);
  });

  it("finds by a word in the question, and puts those first", () => {
    const hits = findAnswers("hell");
    expect(hits[0]).toBe("is-hell-forever-or-does-it-end");
    expect(findAnswers("resurrection")[0]).toBe("did-the-resurrection-actually-happen");
    expect(findAnswers("Suffering?")).toContain("if-god-is-good-why-suffering");
  });

  it("needs every word, and says so by finding nothing", () => {
    expect(findAnswers("teenager believe")).toEqual(["when-your-teenager-says-they-dont-believe"]);
    expect(findAnswers("zzzz")).toEqual([]);
  });
});
