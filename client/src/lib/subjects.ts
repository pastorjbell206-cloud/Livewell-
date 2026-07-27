/**
 * Subjects — the reader's view of the library, cutting across content types.
 *
 * The site files content by SYSTEM: essays in one library, life domains in
 * another, study guides in a third, pathways in a fourth, books in a fifth.
 * That is correct for storage and wrong for a reader. Someone whose marriage is
 * in trouble does not want "the essays index"; they want everything James has
 * written on marriage — the essays AND the study AND the guided path AND the
 * book — on one page.
 *
 * A subject is a match rule, not a hand-curated list, so a new essay on
 * marriage joins the marriage shelf the moment it ships. Nothing to remember,
 * nothing to drift.
 */
export interface Subject {
  /** Stable id, used for the shelf heading and tests. */
  id: string;
  /** What the shelf calls itself. */
  title: string;
  /** One line under the heading, in plain language. */
  blurb: string;
  /** Matched case-insensitively against an item's title and blurb. */
  match: RegExp;
}

export const SUBJECTS: Subject[] = [
  {
    id: "marriage",
    title: "Marriage",
    blurb: "Covenant, conflict, drift, intimacy, and the work of staying.",
    match: /\bmarriage|marriages|married|spouse|husband|wife|covenant love|divorce|infidelity|affair\b/i,
  },
  {
    id: "parenting",
    title: "Parenting and raising kids",
    blurb: "Forming a child's heart, not just their behavior.",
    match: /\bparent|parenting|child|children|kids|son|sons|daughter|teen|teenager|discipline|raising\b/i,
  },
  {
    id: "family",
    title: "Home and family life",
    blurb: "The household as the first place faith is either formed or lost.",
    match: /\bfamily|families|household|home|blended|aging parents|singleness|friendship|manhood|womanhood|fatherhood\b/i,
  },
];

export function subjectById(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

/** True when an item's text matches the subject. */
export function matchesSubject(subject: Subject, title: string, blurb = ""): boolean {
  return subject.match.test(`${title} ${blurb}`);
}
