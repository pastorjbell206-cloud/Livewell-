/**
 * Substack import mapping + helpers. Each Substack post (by its /p/<slug>) is
 * assigned a pillar + sub-pathway, and a mode: "full" (import the whole essay)
 * or "teaser" (import a short excerpt that links back to Substack — used for the
 * serialized "End of Christian America" book so it stays a subscriber draw).
 */
import { PILLAR_BY_SUBPATHWAY_LABEL } from "./subPathways";

export type ImportMode = "full" | "teaser";
export interface SubstackCategory { sub: string; pillar: string; mode: ImportMode; series: boolean; }

// Exact slug → category. The 5 "the-end-of-christian-america*" posts are handled
// by prefix below (series teasers), so they aren't listed here.
const BY_SLUG: Record<string, { sub: string; mode: ImportMode; series?: boolean }> = {
  "the-bible-assumes-you-will-be-wrong": { sub: "Doctrine & Scripture", mode: "full" },
  "how-the-bible-gets-translated-by": { sub: "Doctrine & Scripture", mode: "full" },
  "the-conservative-blind-spot": { sub: "Cultural Captivity", mode: "full" },
  "the-progressive-blind-spot": { sub: "Cultural Captivity", mode: "full" },
  "how-american-individualism-distorts": { sub: "Cultural Captivity", mode: "full" },
  "when-fear-becomes-theology": { sub: "Cultural Captivity", mode: "full" },
  "when-fear-rewrites-theology": { sub: "Cultural Captivity", mode: "full" },
  "every-generation-was-sure-it-was": { sub: "Cultural Captivity", mode: "full" },
  "when-patriotism-becomes-a-gospel": { sub: "Christian Nationalism", mode: "full" },
  "how-christian-nationalism-rewrites": { sub: "Christian Nationalism", mode: "full" },
  "when-the-church-married-empire": { sub: "Church & Empire", mode: "full" },
  "jesus-is-lord": { sub: "Church & Empire", mode: "full" },
  "blind-spots": { sub: "Systemic Sin", mode: "full" },
  "the-monster-is-never-the-one-in-the": { sub: "Systemic Sin", mode: "full" },
};

/** Extract the Substack post slug from its URL. */
export function slugFromLink(link: string): string {
  const m = String(link || "").match(/\/p\/([^/?#]+)/);
  return m ? m[1] : "";
}

/** Category for a Substack post slug, or null if we don't have a mapping. */
export function categoryForSlug(slug: string): SubstackCategory | null {
  if (slug.startsWith("the-end-of-christian-america")) {
    return { sub: "Church & Empire", pillar: "Prophetic Disruption", mode: "teaser", series: true };
  }
  const hit = BY_SLUG[slug];
  if (!hit) return null;
  return {
    sub: hit.sub,
    pillar: PILLAR_BY_SUBPATHWAY_LABEL[hit.sub] ?? "Theological Depth",
    mode: hit.mode,
    series: !!hit.series,
  };
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'",
  "&nbsp;": " ", "&#160;": " ", "&#8217;": "’", "&#8216;": "‘",
  "&#8220;": "“", "&#8221;": "”", "&#8212;": "—", "&#8211;": "–",
  "&#8230;": "…", "&hellip;": "…", "&mdash;": "—", "&ndash;": "–",
  "&rsquo;": "’", "&lsquo;": "‘", "&ldquo;": "“", "&rdquo;": "”",
};
function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&[a-z]+;/gi, (e) => ENTITIES[e] ?? e);
}
const strip = (t: string) => decodeEntities(t.replace(/<[^>]+>/g, "")).trim();

/** Light HTML→Markdown for Substack post bodies (content:encoded). */
export function htmlToMarkdown(html: string): string {
  let s = html || "";
  // Drop Substack boilerplate (subscribe widgets, share/comment buttons, paywall).
  s = s.replace(/<div[^>]*class="[^"]*(subscription|button|share|paywall|footer|poll|image-link-expand)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "");
  s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n# ${strip(t)}\n`);
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n## ${strip(t)}\n`);
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n### ${strip(t)}\n`);
  s = s.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) => `\n> ${strip(t).replace(/\s+/g, " ")}\n`);
  s = s.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, h, t) => `[${strip(t)}](${h})`);
  s = s.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi, (_, _x, t) => `**${strip(t)}**`);
  s = s.replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi, (_, _x, t) => `*${strip(t)}*`);
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `\n- ${strip(t)}`);
  s = s.replace(/<hr[^>]*>/gi, "\n\n---\n\n");
  s = s.replace(/<\/(p|div|ul|ol|figure)>/gi, "\n\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  return s.replace(/\n{3,}/g, "\n\n").replace(/[ \t]+\n/g, "\n").trim();
}

/** "N min read" from a body's word count. */
export function readTimeFor(text: string): string {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
