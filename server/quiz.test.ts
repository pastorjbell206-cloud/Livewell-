import { describe, it, expect } from "vitest";
import {
  scorePillars,
  pickTopPillar,
  getQuizMessage,
  selectRecommendedArticles,
  buildQuizResult,
} from "./quiz/quiz-service";
import { QUIZ_LENGTH, PILLARS } from "./quiz/questions";

/**
 * These lock the quiz scoring behavior. They run without a database — the
 * algorithm no longer depends on one — so they execute in CI on every push,
 * unlike the DB-gated router tests in engagement-features.test.ts.
 *
 * The expected tallies below were computed by hand from the question bank and
 * exist to catch any accidental change to the weights or the math.
 */

const zeros = Array(QUIZ_LENGTH).fill(0);
const threes = Array(QUIZ_LENGTH).fill(3);

function fakePost(slug: string, pillar: string | null) {
  return { slug, title: slug, pillar };
}

describe("quiz scoring", () => {
  it("seeds every pillar at zero so all scores are present and positive", () => {
    const scores = scorePillars(zeros);
    for (const pillar of PILLARS) {
      expect(scores).toHaveProperty(pillar);
    }
    expect(Object.values(scores).every((s) => s > 0)).toBe(true);
  });

  it("tallies the exact characterization for the all-first-option answers", () => {
    expect(scorePillars(zeros)).toEqual({
      "Theological Depth": 27,
      "Prophetic Disruption": 11,
      "Integrated Life": 12,
    });
    expect(pickTopPillar(scorePillars(zeros))).toBe("Theological Depth");
  });

  it("tallies the exact characterization for the all-fourth-option answers", () => {
    expect(scorePillars(threes)).toEqual({
      "Theological Depth": 16,
      "Prophetic Disruption": 16,
      "Integrated Life": 19,
    });
    expect(pickTopPillar(scorePillars(threes))).toBe("Integrated Life");
  });

  it("breaks ties toward the earliest pillar in canonical order", () => {
    expect(pickTopPillar({ "Theological Depth": 5, "Prophetic Disruption": 5, "Integrated Life": 5 })).toBe(
      "Theological Depth"
    );
    expect(pickTopPillar({ "Theological Depth": 1, "Prophetic Disruption": 5, "Integrated Life": 5 })).toBe(
      "Prophetic Disruption"
    );
  });
});

describe("quiz recommendations", () => {
  it("returns only posts in the winning pillar, capped at six", () => {
    const posts = [
      ...Array.from({ length: 8 }, (_, i) => fakePost(`td-${i}`, "Theological Depth")),
      fakePost("other", "Integrated Life"),
    ];
    const picked = selectRecommendedArticles(posts, "Theological Depth");
    expect(picked).toHaveLength(6);
    expect(picked.every((p) => p.pillar === "Theological Depth")).toBe(true);
  });

  it("ignores posts with a null pillar", () => {
    const posts = [fakePost("a", null), fakePost("b", "Integrated Life")];
    expect(selectRecommendedArticles(posts, "Integrated Life")).toEqual([
      fakePost("b", "Integrated Life"),
    ]);
  });
});

describe("quiz messages", () => {
  it("maps each pillar to its own message", () => {
    for (const pillar of PILLARS) {
      expect(getQuizMessage(pillar).length).toBeGreaterThan(0);
    }
    expect(getQuizMessage("Theological Depth")).not.toBe(getQuizMessage("Prophetic Disruption"));
  });

  it("falls back gracefully for an unknown pillar", () => {
    expect(getQuizMessage("Nonexistent")).toBe(
      "Here are some articles tailored to your interests."
    );
  });
});

describe("buildQuizResult", () => {
  it("composes scores, winning pillar, picks, and message in one pass", () => {
    const posts = [fakePost("a", "Theological Depth"), fakePost("b", "Prophetic Disruption")];
    const result = buildQuizResult(zeros, posts);

    expect(result.topPillar).toBe("Theological Depth");
    expect(result.pillarScores).toEqual({
      "Theological Depth": 27,
      "Prophetic Disruption": 11,
      "Integrated Life": 12,
    });
    expect(result.recommendedArticles).toEqual([fakePost("a", "Theological Depth")]);
    expect(result.message).toBe(getQuizMessage("Theological Depth"));
  });
});
