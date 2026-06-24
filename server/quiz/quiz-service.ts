/**
 * Theology quiz — domain logic.
 *
 * Pure, synchronous scoring. This layer depends only on the question bank
 * (`./questions`) — never on the database or tRPC — so the whole algorithm is
 * unit-testable without booting any I/O. The recommendation step takes the
 * candidate posts as a parameter (dependency inversion); the transport layer
 * is responsible for fetching them.
 */
import {
  PILLARS,
  THEOLOGY_QUIZ_QUESTIONS,
  type Pillar,
} from "./questions";

/** A pillar -> cumulative score tally. */
export type PillarScores = Record<string, number>;

/** Minimal shape the recommender needs; the full post object is returned as-is. */
export interface PillarTagged {
  pillar: string | null;
}

const MAX_RECOMMENDATIONS = 6;

const QUIZ_MESSAGES: Record<Pillar, string> = {
  "Theological Depth":
    "You're drawn to deep theological understanding and biblical truth. These articles explore the foundational questions of faith, God's character, and Scripture.",
  "Prophetic Disruption":
    "You're called to prophetic challenge and truth-telling. These articles address the uncomfortable questions the church needs to face.",
  "Integrated Life":
    "You're seeking to live out your faith in every area of life. These articles help bridge the gap between belief and practice.",
};

/**
 * Tally each answer's per-pillar weight. Scores are seeded in canonical pillar
 * order so the tally — and any downstream tie-break — is deterministic.
 */
export function scorePillars(answers: number[]): PillarScores {
  const scores: PillarScores = {};
  for (const pillar of PILLARS) scores[pillar] = 0;

  answers.forEach((answerIndex, questionIndex) => {
    const question = THEOLOGY_QUIZ_QUESTIONS[questionIndex];
    if (!question) return;
    for (const [pillar, weights] of Object.entries(question.pillarWeights)) {
      scores[pillar] += weights[answerIndex] ?? 0;
    }
  });

  return scores;
}

/**
 * The highest-scoring pillar. Ties resolve to the earliest pillar in canonical
 * order, because `scorePillars` seeds the tally in that order and the sort is
 * stable.
 */
export function pickTopPillar(scores: PillarScores): string {
  return Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0];
}

/** Copy shown alongside the recommendations for the winning pillar. */
export function getQuizMessage(pillar: string): string {
  return (
    QUIZ_MESSAGES[pillar as Pillar] ||
    "Here are some articles tailored to your interests."
  );
}

/** The first N posts belonging to the winning pillar. */
export function selectRecommendedArticles<T extends PillarTagged>(
  posts: T[],
  topPillar: string
): T[] {
  return posts.filter((post) => post.pillar === topPillar).slice(0, MAX_RECOMMENDATIONS);
}

/** Composed quiz result: scores, winning pillar, its message, and picks. */
export function buildQuizResult<T extends PillarTagged>(
  answers: number[],
  posts: T[]
): {
  topPillar: string;
  pillarScores: PillarScores;
  recommendedArticles: T[];
  message: string;
} {
  const pillarScores = scorePillars(answers);
  const topPillar = pickTopPillar(pillarScores);
  return {
    topPillar,
    pillarScores,
    recommendedArticles: selectRecommendedArticles(posts, topPillar),
    message: getQuizMessage(topPillar),
  };
}
