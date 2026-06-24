/**
 * pillars.ts — the five content pillars, James Bell's top-level lens on the
 * archive (distinct from the granular `tracks` in taxonomy.ts).
 *
 * A pillar gathers essays two ways, OR'd together:
 *   1. trackSlugs — every essay whose pillar/track resolves into this set
 *      (driven by the existing DB `pillar` values via pillarToTrack).
 *   2. articleSlugs — explicit essays, for the political-capture pillars that
 *      cut across tracks and can't be inferred from the legacy pillar field.
 *
 * No database change is required: this is a client-side classification layer.
 * An essay may appear under more than one pillar — that's intended for a browse
 * lens. To recategorize, edit the arrays here; that's the whole workflow.
 *
 * OWNER NOTE (James): the trackSlug groupings are reliable. The "Capture by the
 * right / left" articleSlug lists are a conservative starting point — the
 * right/left call is editorial and yours. Add or remove slugs freely; entries
 * marked "(Blind Spots)" are reserved slugs that light up once those essays are
 * imported.
 */
import { pillarToTrack } from "@/lib/taxonomy";

export interface Pillar {
  slug: string;
  title: string;
  /** One-sentence framing for the pillar landing + archive header. */
  description: string;
  /** Tracks (resolved from legacy pillar values) that belong to this pillar. */
  trackSlugs: string[];
  /** Explicit essay slugs that belong, regardless of track. */
  articleSlugs: string[];
}

export const PILLARS: Pillar[] = [
  {
    slug: "capture-right",
    title: "Capture by the right",
    description:
      "Where the American church has merged the cross with the nation — Christian nationalism, the gospel of patriotism, and fear dressed up as theology.",
    trackSlugs: [],
    articleSlugs: [
      // The drafted Capture-by-the-right library (live via the static library)
      "the-flag-in-the-sanctuary",
      "two-kingdoms-one-pledge",
      "the-persecution-we-invented",
      "strongman-theology",
      "nostalgia-is-not-the-kingdom",
      "the-third-temptation",
      "six-verses-we-memorized",
      "when-the-pulpit-became-a-precinct",
      // Earlier live essays
      "when-god-bless-america-replaces-thy-kingdom-come",
      "not-persecuted-seduced-crisis-american-christianity",
      "church-political-brand-step-back",
      // Blind Spots (reserved slugs — live once imported)
      "when-patriotism-becomes-a-gospel",
      "when-fear-becomes-theology",
      "the-conservative-blind-spot",
      "how-american-individualism-distorts-the-bible",
    ],
  },
  {
    slug: "capture-left",
    title: "Capture by the left",
    description:
      "The quieter idolatries of the progressive church — justice severed from love, the confidence of being on the right side of history mistaken for being on the right side of Scripture.",
    trackSlugs: [],
    articleSlugs: [
      // The drafted Capture-by-the-left library (live via the static library)
      "right-side-of-history",
      "when-justice-becomes-a-gospel",
      "the-sin-we-stopped-naming",
      "affirmation-is-not-love",
      "deconstruction-without-reconstruction",
      "cheap-grace-left-hand",
      "authority-we-traded-for-authenticity",
      "conscience-outsourced-to-party",
      // Earlier live essays
      "justice-without-love-ideology",
      "racial-reconciliation-without-repentance",
      // Blind Spots (reserved slug — live once imported)
      "the-progressive-blind-spot",
    ],
  },
  {
    slug: "scripture-past-politics",
    title: "Reading Scripture past our politics",
    description:
      "How translation, tradition, and tribe edit the text we claim to believe — and what the Bible actually says about power, empire, justice, and allegiance.",
    trackSlugs: ["theology", "prophetic-justice"],
    articleSlugs: [],
  },
  {
    slug: "after-christendom",
    title: "After Christendom",
    description:
      "The collapse of cultural Christianity and what faithfulness looks like on the other side of cultural power.",
    trackSlugs: ["after-christendom", "american-church"],
    articleSlugs: [
      // Blind Spots — The End of Christian America (reserved slugs)
      "how-christian-america-was-built",
      "why-your-faith-doesnt-feel-the-way-it-used-to",
      "what-is-actually-causing-the-decline",
      "what-comes-next-after-cultural-power",
    ],
  },
  {
    slug: "pastoral-angle",
    title: "The pastoral angle",
    description:
      "The long work of pastoring inside all of this — burnout, board conflict, preaching a divided room, and the calling underneath.",
    trackSlugs: ["pastoral-ministry"],
    articleSlugs: [],
  },
];

export const PILLAR_BY_SLUG: Map<string, Pillar> = new Map(
  PILLARS.map(p => [p.slug, p])
);

/** Look up a pillar by its slug. */
export function getPillar(slug: string | null | undefined): Pillar | undefined {
  return slug ? PILLAR_BY_SLUG.get(slug) : undefined;
}

/** Minimal post shape needed to classify into a pillar. */
interface ClassifiablePost {
  slug: string;
  pillar?: string | null;
}

/** True if `post` belongs to the pillar identified by `pillarSlug`. */
export function postMatchesPillar(
  post: ClassifiablePost,
  pillarSlug: string
): boolean {
  const pillar = PILLAR_BY_SLUG.get(pillarSlug);
  if (!pillar) return false;
  if (pillar.articleSlugs.includes(post.slug)) return true;
  const track = pillarToTrack(post.pillar);
  return track != null && pillar.trackSlugs.includes(track);
}
