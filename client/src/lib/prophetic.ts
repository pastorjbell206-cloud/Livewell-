/**
 * Shared types and configuration for the two prophetic sections, Prophetic
 * Disruption (the church's captivity to tribe, nation, and culture) and
 * Prophetic Justice (mishpat and tsedaqah, where the church has been silent).
 * Both render through the same config-driven components in pages/prophetic, so
 * a third section could be added with one more config block. Topic content
 * lives as JSON in client/public/<base>/topics/<slug>.json.
 */

export interface ChurchRecord { led: string; failed: string; }
export interface Reading { title: string; author: string; }
export interface CaptureSide { label: string; whatItLooksLike: string; inThePast: string; now: string; named: string[]; }
export interface CaptureDetail { right: CaptureSide; left: CaptureSide; }

export interface PropheticTopicData {
  slug: string;
  title: string;
  subtitle: string;
  question: string;
  whyItMatters: string;
  biblicalFoundation: string;
  keyTexts: string[];
  churchRecord: ChurchRecord;
  whereWeAgree: string;
  captureLeft: string;
  captureRight: string;
  whereWeDiffer: string;
  theCost: string;
  charge: string;
  furtherReading: Reading[];
  /** Optional expanded, even-handed analysis of how each side captures the principle, past and present. */
  captureDetail?: CaptureDetail;
}

export interface TopicIndexEntry {
  slug: string;
  group: string;
  title: string;
  blurb: string;
  ready: boolean;
}

export interface ToolLink { href: string; title: string; desc: string; }

export interface SectionConfig {
  key: string;
  label: string;
  /** Route base and data directory, both '/disruption' or '/justice'. */
  base: string;
  hero: { eyebrow: string; title: string; text: string };
  postureBlurb: string;
  /** Optional flagship tool card (the consistency check, for disruption). */
  flagship?: { href: string; kicker: string; title: string; blurb: string; cta: string };
  /** Smaller tool links shown under 'Also here'. */
  tools: ToolLink[];
  topicsIntro: string;
  groups: string[];
  topics: TopicIndexEntry[];
}

export const DISRUPTION: SectionConfig = {
  key: "disruption",
  label: "Prophetic Disruption",
  base: "/disruption",
  hero: {
    eyebrow: "Prophetic Disruption",
    title: "Truth that does not take a side.",
    text: "One reason younger people distrust the church is that they have watched many Christians defend truth selectively. Truth matters when it confronts an opponent. Truth becomes negotiable when it would cost an ally. That inconsistency wrecks the witness. This section confronts the church's captivity to its tribe, its nation, and its culture, and the indictment falls on the left and the right alike, the writer included.",
  },
  postureBlurb: "Biblical justice defined from the text up, the non-tribal commitment, and the one distinction the whole section turns on: the binding command versus the prudential policy. How to read this without weaponizing it.",
  flagship: {
    href: "/disruption/consistency",
    kicker: "The tool",
    title: "The consistency check",
    blurb: "A mirror, not a scorecard. A searching self-examination of whether you defend truth selectively, applying one standard to your side and another to theirs. For your own heart, not for accusing anyone else.",
    cta: "Search your own heart →",
  },
  tools: [
    { href: "/justice/timeline", title: "The injustice timeline", desc: "An honest reckoning with the injustices of history, the church's and the ideologies' alike. No one's hands are clean." },
    { href: "/disruption/witnesses", title: "The witnesses", desc: "The people who told the church and the powers costly truth and refused to be captured." },
    { href: "/disruption/questions", title: "Hard questions", desc: "Is the gospel political? Is Christianity left or right? What is social justice?" },
    { href: "/disruption/glossary", title: "Glossary", desc: "Mishpat, tsedaqah, Christian nationalism, and the loaded words, defined fairly." },
  ],
  topicsIntro: "Each question gets the same treatment: the biblical foundation, the church's honest record, where Christians agree on the principle, how each side captures it, where faithful people legitimately differ, and the cost.",
  groups: ["Cultural Captivity", "Christian Nationalism", "Church & Empire"],
  topics: [
    { slug: "truth-and-tribe", group: "Cultural Captivity", title: "When Truth Becomes Negotiable", blurb: "Truth held consistently, even when it costs your own side. The thesis the whole section rests on.", ready: true },
    { slug: "outrage-machine", group: "Cultural Captivity", title: "The Outrage Machine", blurb: "How the attention economy and the rage cycle have captured the church and deformed us into combatants.", ready: true },
    { slug: "consumer-comfort", group: "Cultural Captivity", title: "The Comfortable Captivity", blurb: "Consumerism, comfort, and a faith shaped more by the mall than the cross.", ready: true },
    { slug: "therapeutic-gospel", group: "Cultural Captivity", title: "The Therapeutic Gospel", blurb: "A faith quietly reduced to self-help and feeling good, a God who exists to make me happy.", ready: true },
    { slug: "power-and-nation", group: "Christian Nationalism", title: "The Cross and the Flag", blurb: "The idolatry of fusing the gospel with political power, on the right and the left alike.", ready: true },
    { slug: "christian-nation-myth", group: "Christian Nationalism", title: "The Myth of a Christian Nation", blurb: "What was true, what was never true, and why the story matters so much to so many.", ready: true },
    { slug: "church-and-empire", group: "Church & Empire", title: "When the Church Married the Power", blurb: "What happens when the church trades prophetic distance for a seat at the table, from Constantine to now.", ready: true },
    { slug: "prosperity-success", group: "Church & Empire", title: "The Gospel of Success", blurb: "The prosperity and platform gospels, and the empire of the self they serve.", ready: true },
    { slug: "celebrity-platform", group: "Church & Empire", title: "The Platform and the Pedestal", blurb: "Celebrity pastor culture, the abuse of spiritual authority, and why so many leaders fall.", ready: true },
  ],
};

export const JUSTICE: SectionConfig = {
  key: "justice",
  label: "Prophetic Justice",
  base: "/justice",
  hero: {
    eyebrow: "Prophetic Justice",
    title: "Where the church went silent.",
    text: "Mishpat and tsedaqah, justice and right relationship, are not add-ons to the gospel. They sit near the heart of God, who leans toward the poor and the powerless and judges his people by how they treat them. This section takes up where the church has too often been quiet, the poor at the gate, the worker and the wage, the vulnerable, and the long arc of God setting things right, and it refuses to be captured by either political tribe.",
  },
  postureBlurb: "Biblical justice defined from the text up, God's lean toward the poor and the foreigner, and the distinction the section turns on: the binding command to do justice versus the prudential policy meant to achieve it. Read this first.",
  tools: [
    { href: "/justice/timeline", title: "The injustice timeline", desc: "An honest reckoning with the injustices of history, the church's and the ideologies' alike. No one's hands are clean." },
    { href: "/justice/witnesses", title: "The witnesses", desc: "The people who did justice at real cost, from the abolitionists to the rescuers of the trafficked." },
    { href: "/justice/glossary", title: "Justice glossary", desc: "Mishpat, tsedaqah, shalom, jubilee, and the loaded words, defined fairly." },
  ],
  topicsIntro: "Each question gets the same treatment: the biblical foundation, the church's honest record (where it led and where it failed), where Christians agree on the principle, how each side captures it, where faithful people legitimately differ, and the cost.",
  groups: ["Economic Justice", "The Vulnerable", "The Stranger and the Prisoner", "Race & Reconciliation", "Systemic Sin"],
  topics: [
    { slug: "the-poor", group: "Economic Justice", title: "The Poor at the Gate", blurb: "Justice for the poor, from the law of gleaning to Lazarus at the rich man's door.", ready: true },
    { slug: "the-wage", group: "Economic Justice", title: "The Wage and the Worker", blurb: "Work, wages, debt, and the dignity of the laborer, where Scripture is loud and policy is contested.", ready: true },
    { slug: "the-vulnerable", group: "The Vulnerable", title: "The Least of These", blurb: "The orphan, the widow, the disabled, the trafficked, and the consistency both tribes tend to fail.", ready: true },
    { slug: "unborn-and-edges", group: "The Vulnerable", title: "Life at Its Edges", blurb: "The unborn, the aged, the disabled, and the dying. A consistent ethic of life at the thresholds.", ready: true },
    { slug: "abuse-and-vulnerable", group: "The Vulnerable", title: "The Abused and the Silence", blurb: "Abuse, the vulnerable, and the church's failures to protect rather than to cover.", ready: true },
    { slug: "the-immigrant", group: "The Stranger and the Prisoner", title: "The Foreigner Among You", blurb: "The command to love the sojourner, and the genuinely contested question of policy.", ready: true },
    { slug: "the-prisoner", group: "The Stranger and the Prisoner", title: "The Prisoner and the Gate", blurb: "Crime, punishment, prison, the death penalty, and the meeting of justice and mercy.", ready: true },
    { slug: "race-and-image", group: "Race & Reconciliation", title: "Race and the Image of God", blurb: "Human dignity grounded in the image of God, and the church's mixed and painful record.", ready: true },
    { slug: "systemic-sin", group: "Systemic Sin", title: "The Sin We Build Together", blurb: "The biblical category of corporate and structural sin, and the limits and uses of the idea.", ready: true },
  ],
};

export const SECTIONS: Record<string, SectionConfig> = { disruption: DISRUPTION, justice: JUSTICE };
