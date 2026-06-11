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
  { slug: "scripture", pillar: "Systematic", title: "What Is the Bible, and Can We Trust It?", blurb: "Revelation, inspiration, inerrancy and infallibility, and how the church received the canon.", triage: "second-order", ready: true },
  // The Doctrine of Scripture wave — eight worked doctrines that take the scripture overview deeper
  { slug: "revelation", pillar: "Systematic", title: "How God Speaks", blurb: "General and special revelation, and how far the heavens can take you without a word.", triage: "second-order", ready: true },
  { slug: "inspiration", pillar: "Systematic", title: "What Inspired Means", blurb: "Dictation, verbal-plenary, dynamic, and encounter. Four accounts of how the breath of God became human words.", triage: "second-order", ready: true },
  { slug: "inerrancy", pillar: "Systematic", title: "Inerrancy and Its Spectrum", blurb: "The Chicago Statement, infallibility, and limited inerrancy. What the battle for the Bible was actually about.", triage: "second-order", ready: true },
  { slug: "ot-canon", pillar: "Systematic", title: "How We Got the Old Testament", blurb: "When the Hebrew canon closed, who says so, and how you would know.", triage: "second-order", ready: true },
  { slug: "nt-canon", pillar: "Systematic", title: "How We Got the New Testament", blurb: "The criteria, the Muratorian fragment, Athanasius in 367, and what Nicaea never decided.", triage: "second-order", ready: true },
  { slug: "apocrypha", pillar: "Systematic", title: "Why the Apocrypha Is Disputed", blurb: "The books between the testaments, and why Catholic, Orthodox, and Protestant Bibles are different sizes.", triage: "second-order", ready: true },
  { slug: "textual-criticism", pillar: "Systematic", title: "Can We Trust the Manuscripts?", blurb: "Textual criticism for beginners. The variants honestly counted, and what they do and do not touch.", triage: "third-order", ready: true },
  { slug: "translations", pillar: "Systematic", title: "Why Translations Differ", blurb: "Word for word, thought for thought, and paraphrase. How to choose a Bible without fear.", triage: "third-order", ready: true },
  { slug: "god-and-trinity", pillar: "Systematic", title: "Who Is God? The Trinity", blurb: "One God in three persons. The doctrine that holds the whole faith together.", triage: "first-order", ready: true },
  // The Doctrine of God set
  { slug: "trinity", pillar: "Systematic", title: "The Trinity: One God, Three Persons", blurb: "The biblical data, Nicaea to Constantinople, homoousios and the eternal processions, and the one live debate that remains.", triage: "first-order", ready: true },
  { slug: "divine-attributes", pillar: "Systematic", title: "The Attributes of God", blurb: "Aseity, simplicity, omniscience, immutability, goodness. Who God is in himself, and why classical theism guards it.", triage: "first-order", ready: true },
  { slug: "impassibility", pillar: "Systematic", title: "Does God Suffer?", blurb: "Classical impassibility, passibilism, and the qualified views between, each given its strongest case.", triage: "second-order", ready: true },
  { slug: "divine-foreknowledge", pillar: "Systematic", title: "Does God Change His Mind?", blurb: "Classical theism, open theism, and Molinism on what God knows and when, each in its own voice.", triage: "second-order", ready: true },
  { slug: "problem-of-evil", pillar: "Systematic", title: "The Problem of Evil", blurb: "The question that breaks faith, the logical and evidential forms, and the major theodicies steelmanned.", triage: "first-order", ready: true },
  { slug: "theodicy", pillar: "Systematic", title: "Theodicies Steelmanned", blurb: "Free-will defense, soul-making, skeptical theism, and the cross-centered and protest responses, each at its strongest.", triage: "second-order", ready: true },
  // The Creation, Origins, and Providence set — how God made the world and how he governs it
  { slug: "origins", pillar: "Systematic", title: "The Origins Debate", blurb: "Four Christian readings of Genesis 1 and 2: young-earth, old-earth, evolutionary creation, and the framework view, each in its own voice.", triage: "third-order", ready: true },
  { slug: "providence", pillar: "Systematic", title: "Providence", blurb: "How God governs all things. Concurrence, primary and secondary causes, and the Reformed, Arminian, and Molinist accounts.", triage: "second-order", ready: true },
  { slug: "sovereignty-and-freedom", pillar: "Systematic", title: "Sovereignty and Human Freedom", blurb: "Compatibilism, libertarian freedom, and Molinism. Three accounts of how God's rule and the human will can both be real.", triage: "second-order", ready: true },
  { slug: "miracles", pillar: "Systematic", title: "Do Miracles Still Happen?", blurb: "Cessationist, continuationist, and open-but-cautious accounts of the miraculous in providence, and Hume's old objection.", triage: "third-order", ready: true },
  { slug: "creation", pillar: "Systematic", title: "Creation and Providence", blurb: "How God made the world and how he holds it, including the age-of-the-earth debate.", triage: "third-order", ready: true },
  { slug: "anthropology", pillar: "Systematic", title: "What Is a Human Being?", blurb: "The image of God, body and soul, male and female.", triage: "second-order", ready: true },
  { slug: "sin", pillar: "Systematic", title: "Sin and the Fall", blurb: "What went wrong, original sin, and the reach of the damage.", triage: "second-order", ready: true },
  { slug: "christology", pillar: "Systematic", title: "Who Is Jesus?", blurb: "Fully God and fully man, and why the church fought so hard to say it right.", triage: "first-order", ready: true },
  { slug: "holy-spirit", pillar: "Systematic", title: "The Holy Spirit and His Gifts", blurb: "The person of the Spirit, and whether the miraculous gifts continue today.", triage: "second-order", ready: true },
  { slug: "soteriology", pillar: "Systematic", title: "How Are We Saved?", blurb: "Grace, election, and the human will. The deepest of the family disagreements.", triage: "second-order", ready: true },
  { slug: "church", pillar: "Systematic", title: "What Is the Church?", blurb: "Baptism, the Lord's Supper, government, and who belongs.", triage: "second-order", ready: true },
  { slug: "last-things", pillar: "Systematic", title: "How Does It End?", blurb: "Death, the return of Christ, the millennium, judgment, and the new creation.", triage: "third-order", ready: true },
  // Pillar 2 — Church history lives as its own narrative page at /theology/history
  // Pillar 3 — Biblical theology
  { slug: "covenant-frameworks", pillar: "Biblical", title: "How the Whole Story Fits", blurb: "Covenant theology, dispensationalism, and progressive covenantalism as three ways to read the one story.", triage: "second-order", ready: true },
];

export function triageOf(t: Triage): TriageMeta {
  return TRIAGE[t];
}
