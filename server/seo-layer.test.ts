import { describe, it, expect } from "vitest";
import {
  deriveDescription,
  findQuestion,
  fitSentences,
  sentences,
  readingGrade,
  FORBIDDEN,
  MIN_LEN,
  MAX_LEN,
} from "../scripts/build-seo-layer.mjs";

// The plain-language search layer never invents a sentence. These pin the
// ways it could quietly misquote an essay: repeating a sentence, cutting one
// mid-word, splitting on an initial, or calling "foster care" a forbidden word.

const long = "This is a sentence that runs on for a while so that it is long enough to matter here.";

describe("the plain-language search layer", () => {
  it("skips a repeated sentence when the standfirst is the opening paragraph again", () => {
    const rec = {
      title: "A Title",
      excerpt: "The dinner table is where it shows. You are physically present.",
      body: "The dinner table is where it shows.\n\nYou are physically present. Hands around a glass, feet under the table, voice producing words at the right intervals.",
    };
    const d = deriveDescription(rec);
    expect(d.match(/You are physically present/g)?.length).toBe(1);
    expect(d.length).toBeGreaterThanOrEqual(MIN_LEN);
    expect(d.length).toBeLessThanOrEqual(MAX_LEN);
  });

  it("drops a truncated fragment ending in an ellipsis and reads the body instead", () => {
    const rec = {
      title: "T",
      excerpt: "Amos did not come from the professional class. He was a shepherd and a dresser of sycamore trees, someone whose work put him in regular contact wi…",
      body: "Amos did not come from the professional class.\n\nHe was a shepherd and a dresser of sycamore trees (Amos 7:14). He did not have a prophetic school behind him.",
    };
    const d = deriveDescription(rec);
    expect(d).not.toContain("…");
    expect(d.length).toBeGreaterThanOrEqual(MIN_LEN);
    expect(d.length).toBeLessThanOrEqual(MAX_LEN);
  });

  it("does not split a sentence on an initial", () => {
    expect(sentences("H. Richard Niebuhr spent a book on it. The catalogue is instructive.")).toEqual([
      "H. Richard Niebuhr spent a book on it.",
      "The catalogue is instructive.",
    ]);
  });

  it("turns an em-dash into the comma a reader would say aloud", () => {
    expect(sentences("Real love wills the good of the other — and sometimes that costs.")).toEqual([
      "Real love wills the good of the other, and sometimes that costs.",
    ]);
  });

  it("falls back to a word-boundary cut when no run of whole sentences fits", () => {
    const one = `${long} ${long}`;
    const d = fitSentences([one], one);
    expect(d.length).toBeGreaterThanOrEqual(MIN_LEN);
    expect(d.length).toBeLessThanOrEqual(MAX_LEN);
    expect(d).toMatch(/[.!?]$/);
    expect(d).not.toMatch(/\s$/);
  });

  it("uses the title as the question and the standfirst as the essay's own answer", () => {
    const qa = findQuestion({
      title: "Is Affirmation the Same as Love?",
      excerpt: "Therapeutic culture taught us that to love someone is to confirm them. But real love wills the good of the other.",
      body: "Ask the question most of us are afraid to ask out loud.",
    });
    expect(qa?.question).toBe("Is Affirmation the Same as Love?");
    expect(qa?.answer).toMatch(/^Therapeutic culture/);
  });

  it("finds a question heading and answers it with the paragraph beneath", () => {
    const qa = findQuestion({
      title: "A Verdict Title",
      excerpt: "A standfirst.",
      body: "Opening paragraph that is long enough to count as prose for the opening.\n\n## Why does it matter?\n\nBecause the paragraph under the heading is the answer the essay gives, in its own words.",
    });
    expect(qa?.question).toBe("Why does it matter?");
    expect(qa?.answer).toMatch(/^Because the paragraph/);
    expect(findQuestion({ title: "No Question", excerpt: "x", body: "No headings here." })).toBeNull();
  });

  it("treats foster care as a noun, not the forbidden verb", () => {
    expect(FORBIDDEN.test("four hundred thousand children in the American foster care system")).toBe(false);
    expect(FORBIDDEN.test("programs that foster community")).toBe(true);
    expect(FORBIDDEN.test("a nuanced take")).toBe(true);
  });

  it("grades plain prose lower than seminar prose", () => {
    const plain = readingGrade("The war is over. Go home. That is what the word means.");
    const dense = readingGrade(
      "The epistemological presuppositions undergirding contemporary ecclesiological discourse necessitate a comprehensive reconsideration of inherited hermeneutical frameworks.",
    );
    expect(plain).toBeLessThan(dense);
  });
});
