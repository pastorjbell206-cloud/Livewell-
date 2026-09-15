/**
 * Brand positioning constants — the one place these strings live.
 *
 * The site and the Substack are one publication. The positioning sentence
 * and the subscription paragraph below are used VERBATIM on both surfaces so
 * a reader moving between them never feels they changed publications. They
 * were chosen by a five-draft, three-judge panel, run through the CLAUDE.md
 * Revision Pass, and searched literally against the Forbidden Language list.
 * They make no cadence, subscriber-count, or price claim, because none of
 * those is verifiable from this repo. Alternates and rationale live in
 * docs/BRAND-ALIGNMENT-DELIVERABLES.md.
 *
 * Surfaces that cannot import this module mirror the sentence by hand
 * (client/index.html, scripts/prerender-heads.mjs, api/index.ts). The test
 * server/brand-sentence.test.ts fails CI if any of those copies drifts.
 */

/** The positioning sentence (26 words). Hero subhead, meta description, Substack description. */
export const BRAND_SENTENCE =
  "The American church traded the gospel for power; James Bell writes from inside the trade, for readers tired of being told whose side God is on.";

/** The subscription paragraph (88 words). Verbatim on /substack, /subscribe, and the footer signup. */
export const SUBSTACK_PITCH =
  "The End of Christian America is a book being serialized in parts. I am writing it as a pastor, between hospital rooms and funerals, about a church that still reads Scripture by the light of Caesar's throne — a church I am inside, not above. It is for the skeptic who suspects the faith was always about power, and for the Christian afraid he is right. A new part arrives when it is ready. I have sat with enough of the dying to know what a flag cannot do.";

/** The serialized book the Substack is built around. Linked from essays in the political, Scripture, and after-Christendom pillars. */
export const SUBSTACK_SERIES_TITLE = "The End of Christian America";

/** The first published part of the series on Substack — the one URL that is indexed and stable. */
export const SUBSTACK_SERIES_URL = "https://jamesbell333289.substack.com/p/the-end-of-christian-america";

export const PRIMARY_HEADLINE =
  "Theology that carries the weight of everyday life.";

export const PRIMARY_KICKER = "New essays weekly";

// Both hero variants and the meta description now carry the same sentence.
// They stay as named exports so Home.tsx's HERO_VARIANT switch keeps compiling,
// but flipping the variant can no longer resurrect a second positioning line.
export const PRIMARY_SUBHEAD = BRAND_SENTENCE;
export const PRIMARY_SUBHEAD_SHORT = BRAND_SENTENCE;
export const META_DESCRIPTION = BRAND_SENTENCE;

export const NEWSLETTER_PITCH_PASTORAL = {
  title: "The Pastor's Letter — Tuesday morning",
  description:
    "Written for pastors carrying the weight. One essay, one sermon-prep idea, one resource. From inside the room where the work actually happens.",
};

export const NEWSLETTER_PITCH_SKEPTIC = {
  title: "The Skeptic's Track — start here",
  description:
    "Seven essays sent over four weeks. The ones I'd hand a skeptical friend first. No conversion bait. Real questions, real arguments.",
};
