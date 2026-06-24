/**
 * Theology quiz — domain content.
 *
 * This module is the innermost layer: pure data with no dependencies on the
 * database, tRPC, or any I/O. The question bank and the pillars it scores
 * against live here so they can be edited (and validated) without touching
 * the scoring logic or the transport layer.
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  /** Per-option score contributed to each pillar, indexed by option position. */
  pillarWeights: Record<string, number[]>;
}

/**
 * The three pillars the quiz scores against, in canonical (display) order.
 * Scoring seeds the tally in this order, so it also defines the tie-break
 * winner when two pillars finish level (stable sort keeps the first).
 */
export const PILLARS = [
  "Theological Depth",
  "Prophetic Disruption",
  "Integrated Life",
] as const;

export type Pillar = (typeof PILLARS)[number];

export const THEOLOGY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How do you approach biblical interpretation?",
    options: [
      "Literal, word-for-word reading",
      "Historical-critical scholarship",
      "Theological and pastoral application",
      "Combination of all approaches"
    ],
    pillarWeights: {
      "Theological Depth": [3, 2, 2, 3],
      "Prophetic Disruption": [1, 2, 3, 2],
      "Integrated Life": [1, 1, 3, 2]
    }
  },
  {
    id: 2,
    question: "What's your primary concern about the American church?",
    options: [
      "Theological decline and biblical illiteracy",
      "Political compromise and cultural captivity",
      "Lack of practical discipleship",
      "Institutional irrelevance"
    ],
    pillarWeights: {
      "Theological Depth": [3, 1, 1, 1],
      "Prophetic Disruption": [2, 3, 2, 3],
      "Integrated Life": [1, 1, 3, 1]
    }
  },
  {
    id: 3,
    question: "How do you view the relationship between faith and justice?",
    options: [
      "Personal salvation is primary",
      "Systemic justice is essential to the gospel",
      "Both equally important but distinct",
      "Justice flows from transformed hearts"
    ],
    pillarWeights: {
      "Theological Depth": [2, 2, 3, 2],
      "Prophetic Disruption": [1, 3, 2, 2],
      "Integrated Life": [2, 2, 2, 3]
    }
  },
  {
    id: 4,
    question: "What's your biggest question about God?",
    options: [
      "How can God be both just and merciful?",
      "Why does God permit suffering?",
      "What does God's kingdom actually look like?",
      "How should God's character shape my life?"
    ],
    pillarWeights: {
      "Theological Depth": [3, 3, 2, 2],
      "Prophetic Disruption": [1, 2, 3, 1],
      "Integrated Life": [1, 2, 2, 3]
    }
  },
  {
    id: 5,
    question: "How do you respond to cultural issues (LGBTQ, race, politics)?",
    options: [
      "Apply biblical principles directly",
      "Listen to marginalized voices first",
      "Seek nuance and complexity",
      "Avoid taking strong positions"
    ],
    pillarWeights: {
      "Theological Depth": [2, 1, 3, 1],
      "Prophetic Disruption": [1, 3, 2, 1],
      "Integrated Life": [2, 2, 3, 1]
    }
  },
  {
    id: 6,
    question: "What does spiritual maturity look like?",
    options: [
      "Deep theological knowledge",
      "Prophetic courage and truth-telling",
      "Integrated faith affecting all of life",
      "Radical obedience to Jesus"
    ],
    pillarWeights: {
      "Theological Depth": [3, 1, 1, 2],
      "Prophetic Disruption": [1, 3, 1, 2],
      "Integrated Life": [1, 1, 3, 2]
    }
  },
  {
    id: 7,
    question: "How should the church engage politics?",
    options: [
      "Remain neutral and apolitical",
      "Prophetically critique all political systems",
      "Engage selectively on moral issues",
      "Partner with one political movement"
    ],
    pillarWeights: {
      "Theological Depth": [2, 2, 3, 1],
      "Prophetic Disruption": [1, 3, 2, 1],
      "Integrated Life": [1, 2, 3, 1]
    }
  },
  {
    id: 8,
    question: "What's your biggest struggle in faith?",
    options: [
      "Doubts about biblical reliability",
      "Anger at injustice and suffering",
      "Living out faith in daily decisions",
      "Finding authentic Christian community"
    ],
    pillarWeights: {
      "Theological Depth": [3, 1, 1, 1],
      "Prophetic Disruption": [1, 3, 1, 1],
      "Integrated Life": [1, 1, 3, 2]
    }
  },
  {
    id: 9,
    question: "How do you define Christian freedom?",
    options: [
      "Freedom from sin through Christ",
      "Freedom to challenge unjust systems",
      "Freedom to live authentically",
      "Freedom to follow Jesus fully"
    ],
    pillarWeights: {
      "Theological Depth": [3, 1, 1, 2],
      "Prophetic Disruption": [1, 3, 1, 2],
      "Integrated Life": [1, 1, 3, 2]
    }
  },
  {
    id: 10,
    question: "What would help your faith most right now?",
    options: [
      "Deeper theological understanding",
      "Prophetic challenge to status quo",
      "Practical guidance for daily living",
      "Community and authentic relationships"
    ],
    pillarWeights: {
      "Theological Depth": [3, 1, 1, 1],
      "Prophetic Disruption": [1, 3, 1, 1],
      "Integrated Life": [1, 1, 3, 2]
    }
  }
];

/** Number of answers a complete submission must contain. */
export const QUIZ_LENGTH = THEOLOGY_QUIZ_QUESTIONS.length;
