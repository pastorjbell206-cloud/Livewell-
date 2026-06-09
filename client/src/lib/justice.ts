/**
 * Shared types and the topic index for the Prophetic Justice section. Topic
 * content lives as JSON in client/public/justice/topics/<slug>.json and is
 * fetched at runtime; this file holds the information architecture, the shapes
 * the pages render against, and which topics are written and live.
 */

export interface ChurchRecord { led: string; failed: string; }
export interface Reading { title: string; author: string; }

export interface JusticeTopic {
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
}

export interface TopicIndexEntry {
  slug: string;
  group: string;
  title: string;
  blurb: string;
  ready: boolean;
}

/**
 * Every topic the section will hold, grouped. Entries marked ready have a
 * worked JSON file and a live page; the rest render as the planned map so a
 * reader sees where the section is going.
 */
export const TOPIC_INDEX: TopicIndexEntry[] = [
  // Foundations
  { slug: "truth-and-tribe", group: "Foundations", title: "When Truth Becomes Negotiable", blurb: "Truth held consistently, even when it costs your own side. The thesis the whole section rests on.", ready: true },
  { slug: "the-poor", group: "Foundations", title: "The Poor at the Gate", blurb: "Justice for the poor and the vulnerable, from the law of gleaning to Lazarus at the rich man's door.", ready: true },
  { slug: "race-and-image", group: "Foundations", title: "Race and the Image of God", blurb: "Human dignity grounded in the image of God, and the church's mixed and painful record.", ready: true },
  { slug: "power-and-nation", group: "Foundations", title: "The Cross and the Flag", blurb: "The idolatry of fusing the gospel with political power, on the right and the left alike.", ready: true },
  // Life and the body
  { slug: "unborn-and-edges", group: "Life and the body", title: "Life at Its Edges", blurb: "The unborn, the aged, the disabled, and the dying. Dignity at the thresholds of life.", ready: false },
  { slug: "sexuality-and-justice", group: "Life and the body", title: "The Body and the Revolution", blurb: "Sexuality, the body, and what a just and faithful witness costs in both directions.", ready: false },
  { slug: "abuse-and-vulnerable", group: "Life and the body", title: "The Abused and the Silence", blurb: "Abuse, the vulnerable, and the church's failures to protect rather than to cover.", ready: false },
  // The neighbor and the world
  { slug: "immigrant", group: "The neighbor and the world", title: "The Foreigner Among You", blurb: "The sojourner, the immigrant, and the command to love the stranger, with the policy left open.", ready: false },
  { slug: "creation-care", group: "The neighbor and the world", title: "The Garden and the Groaning", blurb: "Stewardship of the creation we were given, between worship of the earth and contempt for it.", ready: false },
  { slug: "war-and-peace", group: "The neighbor and the world", title: "The Sword and the Cross", blurb: "Violence, just war, and peacemaking, and the church's long argument with itself.", ready: false },
  // Money and mercy
  { slug: "wealth-and-greed", group: "Money and mercy", title: "Mammon and the Common Good", blurb: "Money, greed, generosity, and the economy, where Scripture is loud and policy is contested.", ready: false },
  { slug: "criminal-justice", group: "Money and mercy", title: "Judgment, Punishment, and Mercy", blurb: "Crime, prison, the death penalty, and the meeting of justice and mercy.", ready: false },
];

export const TOPIC_GROUPS = ["Foundations", "Life and the body", "The neighbor and the world", "Money and mercy"];
