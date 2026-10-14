/**
 * essayLabel — the subject line to print above an essay in an index.
 *
 * pillarForPost (taxonomy.ts) always returns a pillar, falling back to "The
 * Pastoral Angle" for any essay nobody has filed yet. That fallback is right
 * for filtering, but printed as a label it tells a reader a theology essay is
 * "Pastoral". So: an essay's curated pillar when it has been filed in
 * pillar-assignments.ts; otherwise the subject its own data carries (its track
 * kicker: "Theology", "Doubt", "Prophetic Justice"); otherwise "Essay".
 * Display only; filing still happens in pillar-assignments.ts.
 */
import { PILLAR_ASSIGNMENTS } from "@/lib/pillar-assignments";
import { PILLAR_BY_ID, TRACK_BY_SLUG, resolveTrack, type Pillar } from "@/lib/taxonomy";

export function essaySubjectLabel(post: { slug?: string | null; pillar?: string | null }): string {
  const filed = post.slug ? PILLAR_ASSIGNMENTS[post.slug]?.pillar : undefined;
  if (filed) {
    const pillar = PILLAR_BY_ID.get(filed);
    if (pillar) return pillarKicker(pillar);
  }
  const raw = post.pillar?.trim();
  if (raw) {
    const track = TRACK_BY_SLUG.get(raw) ?? resolveTrack(raw);
    if (track) return track.kicker;
  }
  return "Essay";
}

/**
 * A pillar's label above an essay. The two capture pillars keep their full
 * names ("Capture by the Right", "Capture by the Left"): their short forms,
 * "The Right" and "The Left", read as partisan tags out of context, and the
 * platform diagnoses both captures with the same instrument.
 */
export function pillarKicker(pillar: Pillar): string {
  return pillar.id === 1 || pillar.id === 2 ? pillar.name.replace(/^The /, "") : pillar.short;
}
