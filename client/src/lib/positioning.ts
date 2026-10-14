/**
 * Brand positioning constants. Per James's brief (refined 2026-05-28):
 *
 * The both/and: "After Christendom" essays AND deep theology applied to
 * everyday life — marriage, money, parenting, manhood, womanhood. The
 * scholarly-prophetic tone (Brueggemann, Keller, Bonhoeffer anchors) is
 * preserved across BOTH the political-theological pieces and the
 * personal-formation pieces. Practical, never glib.
 *
 * These strings appear on the homepage, in meta descriptions, and in
 * social-share unfurls. Change them here once.
 */

export const PRIMARY_HEADLINE =
  "Theology that carries the weight of everyday life.";

export const PRIMARY_KICKER = "New essays weekly";

export const PRIMARY_SUBHEAD =
  "After Christendom essays on theology, politics, and the American church — and the everyday weight of marriage, money, parenting, manhood, womanhood, doubt, and pastoring. From a pastor and essayist tracing the collapse of cultural Christianity, the rise of Christian nationalism, and the long work of forming people who can carry weight.";

// Shortened two-sentence hero subhead (variant A). Same claims as the long
// version above, compressed. The long version is kept for variant B.
export const PRIMARY_SUBHEAD_SHORT =
  "For believers trying to follow Jesus in a culture that no longer shares Christian assumptions. Essays on theology, culture, family, and the American church, helping readers reconstruct a deeper historical faith and learn to live well in post-Christian America.";

export const META_DESCRIPTION =
  "Learning to follow Jesus and live well in post-Christian America. A Study Bible with notes on every chapter, the church's long history, essays, and books by James Bell.";

/*
 * The home page hero. James chose the two paragraphs below on 2026-10-14
 * (replacing the earlier lines drawn from /about); the facts in HOME_WHO are
 * the confirmed biography. scripts/prerender-heads.mjs paints the same strings
 * into the static HTML for "/", so keep each one a plain double-quoted string
 * on one line. (The headline's hyphen is a non-breaking one, U+2011, so
 * "post-Christian" never splits across lines.)
 */
export const HOME_HEADLINE =
  "Learning to follow Jesus — and live well — in post‑Christian America.";

/** Why the site exists (also the pull quote at the top of /about). */
export const HOME_WHY =
  "What does it look like to follow Jesus when the culture around you no longer shares your assumptions? The early church knew. So did believers in every age who lived without power. This site is here to help you study the Bible in its context, learn the church's long history, and think through the hardest questions of our time with patience and depth.";

/** Who is writing. */
export const HOME_WHO =
  "I'm James Bell, a pastor, Susanna's husband, and dad to five sons. I was raised without a father and came to faith as an adult, after years as an atheist, so I know the objections from the inside. I founded the Pastors Connection Network, and I write for anyone who wants a faith deep enough to handle real questions.";

/** James's portrait, the same photograph /about and the author card use. */
export const PORTRAIT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg";

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
