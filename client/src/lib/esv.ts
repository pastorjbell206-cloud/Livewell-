/**
 * The ESV on this site: Crossway's notice, and which essays owe it.
 *
 * The notice is Crossway's own wording and is never paraphrased. Source:
 * Crossway's permissions page, https://www.crossway.org/permissions/, read on
 * 2026-10-26 through web search results, because crossway.org and esv.org do
 * not answer from the build sandbox. The page itself was not opened; James is
 * asked to paste the current wording from it, and if it differs this constant
 * is the one line to change. The record of the reading, with the quotation
 * limits noted at the same time, is docs/work/plan/units/U04.md on the work
 * branch.
 */
export const ESV_NOTICE =
  "Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.";

/**
 * A chapter-and-verse reference: "John 3:16", "1 Peter 2:9", "Song of Songs
 * 2:4". A loose shape, not a parser: it only has to tell a quotation of
 * Scripture from a quotation of anyone else, and the one reference parser
 * (scripture-ref, U09) replaces it when it lands.
 */
const REFERENCE = String.raw`(?:[1-3]\s?)?[A-Z][a-z]+(?:\s(?:of\s)?[A-Z][a-z]+)*\.?\s\d+:\d+`;

/** A closing quotation mark (italics allowed), then a reference in parentheses. */
const QUOTED_THEN_REFERENCE = new RegExp(String.raw`["”][*_]*\s*\(${REFERENCE}`);

/** A block quotation whose line ends on a reference in parentheses. */
const BLOCK_ENDING_IN_REFERENCE = new RegExp(String.raw`^>.*\(${REFERENCE}[^)\n]*\)[*_]*\s*$`, "m");

const NAMES_THE_ESV = /\bESV\b|English Standard Version/;

/** True when the Markdown quotes Scripture with its reference beside it. */
export function quotesScripture(markdown: string): boolean {
  return QUOTED_THEN_REFERENCE.test(markdown) || BLOCK_ENDING_IN_REFERENCE.test(markdown);
}

/**
 * Whether an essay carries Crossway's notice.
 *
 * A rewrite (client/public/essays) is written to the house rule, Scripture
 * quoted verbatim from the ESV, so it owes the notice as soon as it quotes
 * Scripture. An essay from the database predates that rule and mixes
 * translations without naming them, so it carries the notice only where its
 * own text names the ESV: putting Crossway's line under another
 * translation's words would be a false claim.
 */
export function owesEsvNotice(markdown: string, { rewrite }: { rewrite: boolean }): boolean {
  if (NAMES_THE_ESV.test(markdown)) return true;
  return rewrite && quotesScripture(markdown);
}
