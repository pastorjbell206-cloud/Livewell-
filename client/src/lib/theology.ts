/**
 * Shared types and small helpers for the Theological Depth section.
 * Doctrine content lives as JSON in client/public/theology/<slug>.json and is
 * fetched at runtime; this file holds the index of doctrines, the triage
 * vocabulary, and the TypeScript shapes the pages render against.
 */

export type Triage = "first-order" | "second-order" | "third-order";

export interface TriageMeta {
  label: string;
  short: string;
  color: string;
  bg: string;
}

/** The doctrinal triage vocabulary, taught in Pillar 0 and badged on every doctrine. */
export const TRIAGE: Record<Triage, TriageMeta> = {
  "first-order": {
    label: "First order",
    short: "Essential to the faith itself",
    color: "#7A1F1F",
    bg: "rgba(122,31,31,0.10)",
  },
  "second-order": {
    label: "Second order",
    short: "Divides faithful churches, not the faith",
    color: "#8A5A00",
    bg: "rgba(212,160,23,0.14)",
  },
  "third-order": {
    label: "Third order",
    short: "Room inside one congregation",
    color: "#3E5C3A",
    bg: "rgba(62,92,58,0.12)",
  },
};

export interface Position {
  name: string;
  inOneLine: string;
  bestCase: string;
  advocates: string[];
  keyTexts: string[];
}

export interface Evidence {
  passage: string;
  leansToward: string;
  summary: string;
  hardFor: string;
  howOthersRead: string;
}

export interface RelatedDebate {
  topic: string;
  note: string;
}

export interface Reading {
  side: string;
  title: string;
  author: string;
}

export interface Doctrine {
  slug: string;
  title: string;
  subtitle: string;
  triage: Triage;
  triageNote: string;
  question: string;
  whyItMatters: string;
  positions: Position[];
  biblicalEvidence: Evidence[];
  weighing: string;
  charitableDisagreement: string;
  relatedDebates: RelatedDebate[];
  furtherReading: Reading[];
}

export interface DoctrineIndexEntry {
  slug: string;
  pillar: string;
  title: string;
  blurb: string;
  triage: Triage;
  /** false until the worked JSON entry exists; renders as a planned topic. */
  ready: boolean;
}

/**
 * The information architecture: every doctrine the section will hold, grouped
 * by pillar. Entries marked ready have a worked JSON file and a live page; the
 * rest render as the planned map so a reader sees where the section is going.
 */
export const DOCTRINE_INDEX: DoctrineIndexEntry[] = [
  // Pillar 1 — Systematic theology
  { slug: "scripture", pillar: "Systematic", title: "What Is the Bible, and Can We Trust It?", blurb: "Revelation, inspiration, inerrancy and infallibility, and how the church received the canon.", triage: "second-order", ready: false },
  { slug: "god-and-trinity", pillar: "Systematic", title: "Who Is God? The Trinity", blurb: "One God in three persons. The doctrine that holds the whole faith together.", triage: "first-order", ready: false },
  { slug: "creation", pillar: "Systematic", title: "Creation and Providence", blurb: "How God made the world and how he holds it, including the age-of-the-earth debate.", triage: "third-order", ready: false },
  { slug: "anthropology", pillar: "Systematic", title: "What Is a Human Being?", blurb: "The image of God, body and soul, male and female.", triage: "second-order", ready: false },
  { slug: "sin", pillar: "Systematic", title: "Sin and the Fall", blurb: "What went wrong, original sin, and the reach of the damage.", triage: "second-order", ready: false },
  { slug: "christology", pillar: "Systematic", title: "Who Is Jesus?", blurb: "Fully God and fully man, and why the church fought so hard to say it right.", triage: "first-order", ready: false },
  { slug: "holy-spirit", pillar: "Systematic", title: "The Holy Spirit and His Gifts", blurb: "The person of the Spirit, and whether the miraculous gifts continue today.", triage: "second-order", ready: false },
  { slug: "soteriology", pillar: "Systematic", title: "How Are We Saved?", blurb: "Grace, election, and the human will. The deepest of the family disagreements.", triage: "second-order", ready: true },
  { slug: "church", pillar: "Systematic", title: "What Is the Church?", blurb: "Baptism, the Lord's Supper, government, and who belongs.", triage: "second-order", ready: false },
  { slug: "last-things", pillar: "Systematic", title: "How Does It End?", blurb: "Death, the return of Christ, the millennium, judgment, and the new creation.", triage: "third-order", ready: false },
  // Pillar 2 — Church history
  { slug: "early-church", pillar: "History", title: "The Early Church and the Councils", blurb: "From the apostles to Nicaea and Chalcedon, and the heresies that forced the church to speak.", triage: "first-order", ready: false },
  // Pillar 3 — Biblical theology
  { slug: "covenant-frameworks", pillar: "Biblical", title: "How the Whole Story Fits", blurb: "Covenant theology, dispensationalism, and progressive covenantalism as three ways to read the one story.", triage: "second-order", ready: false },
];

export function triageOf(t: Triage): TriageMeta {
  return TRIAGE[t];
}
