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

import { SITE_STATS } from "@/config/siteStats";

export const PRIMARY_HEADLINE =
  "Theology that carries the weight of everyday life.";

export const PRIMARY_KICKER = "New essays weekly";

export const PRIMARY_SUBHEAD =
  "After Christendom essays on theology, politics, and the American church — and the actual Tuesday afternoon of marriage, money, parenting, manhood, womanhood, doubt, and pastoring. From a pastor and essayist tracing the collapse of cultural Christianity, the rise of Christian nationalism, and the long work of forming people who can carry weight.";

// Shortened two-sentence hero subhead (variant A). Same claims as the long
// version above, compressed. The long version is kept for variant B.
export const PRIMARY_SUBHEAD_SHORT =
  "Essays on theology, politics, and the American church after Christendom — and on the actual Tuesday afternoon of marriage, money, parenting, and doubt. Written by a pastor tracing the collapse of cultural Christianity and the long work of forming people who can carry weight.";

export const SHORT_BIO =
  `James Bell is Lead Pastor of First Baptist Church of Fenton and founder of the Pastors Connection Network. He came to faith from atheism, was raised without a father, and has five sons. He is the author of ${SITE_STATS.bookCountWord} books.`;

export const META_DESCRIPTION =
  "Deep theology for everyday life. Essays on theology, politics, and the American church after Christendom — plus marriage, money, parenting, manhood, womanhood, and the long work of pastoring. By James Bell. New essays weekly.";

export const NEWSLETTER_PITCH = {
  title: "Get new essays in your inbox",
  description:
    "One essay a week. After Christendom, politics, theology — plus marriage, money, parenting, manhood, womanhood. Scholarly tone, practical reach. No spam.",
};

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
