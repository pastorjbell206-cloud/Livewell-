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
 * The home page hero. Every sentence here is already on the site in James's
 * own words (the home page's mission line and /about), so the front page
 * introduces him without adding a claim. scripts/prerender-heads.mjs paints
 * the same strings into the static HTML for "/", so keep each one a plain
 * double-quoted string on one line. (The headline's hyphen is a non-breaking
 * one, U+2011, so "post-Christian" never splits across lines.)
 */
export const HOME_HEADLINE =
  "Learning to follow Jesus — and live well — in post‑Christian America.";

/** Why the site exists (/about, "The heart behind it"). */
export const HOME_WHY =
  "What I want is simple to say and long to do. I want the historic faith — the creed, the cross, the resurrection, the kingdom — held out in ordinary language to people who have every cultural permission to ignore it.";

/** Who is writing (/about, the opening). */
export const HOME_WHO =
  "I was an atheist before I was a Christian. I bring it up because it changed how I write and not because I want to build a personality on it. Mostly it means I know what the objections sound like from the inside, and I am not willing to answer them with something thin.";

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
