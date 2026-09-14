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
  {
    id: "doubt",
    title: "Doubt and deconstruction",
    blurb: "Honest questions, taken at full strength, without a rush to resolve them.",
    match: /\bdoubt|doubts|deconstruct|skeptic|unbelief|atheis|apologetic|why believe|hiddenness|god feel|dark night|exvangelical\b/i,
  },
  {
    id: "church-history",
    title: "Church history",
    blurb: "The councils, the creeds, the schisms, and the people who carried the faith.",
    match: /\bchurch history|reformation|nicaea|nicene|chalcedon|augustine|luther|calvin|puritan|patristic|constantin|martyr|desert father|council of|early church|apostolic\b/i,
  },
  {
    id: "theology",
    title: "Theology",
    blurb: "The doctrines the church has confessed, and why they carry the weight of a Tuesday.",
    match: /\btheolog|doctrine|trinity|christolog|atonement|salvation|justification|sanctif|eschat|sovereign|providence|incarnation|resurrection|covenant theology|image of god\b/i,
  },
  {
    id: "justice",
    title: "Justice",
    blurb: "What Scripture says about the poor, the stranger, the prisoner, and the worker.",
    match: /\bjustice|mishpat|poor|poverty|immigrant|refugee|stranger|prisoner|oppress|racism|\brace\b|wage|worker|vulnerable|orphan|widow|trafficking\b/i,
  },
  {
    id: "politics-and-power",
    title: "The church, politics, and power",
    blurb: "Nationalism, empire, partisanship, and the cross that will not be conscripted.",
    match: /\bpolitic|nationalism|nationalist|partisan|culture war|empire|\bflag\b|patriot|government|\bparty\b|caesar|theocracy|christian nation|power and the church|celebrity pastor\b/i,
  },
  {
    id: "money-and-work",
    title: "Money and work",
    blurb: "What the bank statement confesses, and the work God actually sees.",
    match: /\bmoney|wealth|rich|generosity|giving|tithe|jubilee|greed|possession|\bwork\b|vocation|career|\bjob\b|ambition|success|calling|monday\b/i,
  },
  {
    id: "suffering",
    title: "Suffering and grief",
    blurb: "Loss, lament, and the God who does not explain himself as fast as we would like.",
    match: /\bsuffer|grief|grieving|lament|bereave|\bloss\b|mourning|\bpain\b|\bdeath\b|dying|depress|anxiety|mental health|theodicy|why does god allow\b/i,
  },
  {
    id: "prayer-and-practice",
    title: "Prayer and the practices",
    blurb: "Prayer, Sabbath, Scripture, fasting: the habits that form a person over years.",
    match: /\bprayer|praying|\bpray\b|sabbath|rest\b|fasting|discipline|devotion|silence|solitude|habit|liturgy|spiritual formation|rule of life\b/i,
  },
];

export function subjectById(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

/** True when an item's text matches the subject. */
export function matchesSubject(subject: Subject, title: string, blurb = ""): boolean {
  return subject.match.test(`${title} ${blurb}`);
}
