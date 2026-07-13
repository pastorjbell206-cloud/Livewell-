/**
 * The Skeptic's Track — one source of truth for the argument-ordered front
 * door written for skeptics (rendered at /skeptic-track).
 *
 * Each stop points at a real, published essay by slug. A stop whose `slug` is
 * `null` has no essay yet: the track page renders it as a visible, non-clickable
 * "In progress" state (never a bare clickable promise), and the whole track's
 * entry points across the site are suppressed until every stop is filled.
 *
 * SKEPTIC_TRACK_LIVE is the honesty gate. Home, About, Help, and Family import
 * it and only advertise the track when it is true. It flips automatically the
 * moment the last `null` slug is filled in. scripts/validate-skeptic-track.mjs
 * enforces that every non-null slug resolves to a real static-library essay, so
 * a wired stop can never quietly dead-end.
 */
export interface SkepticStop {
  /** Slug of the real essay for this stop, or null if not yet written. */
  slug: string | null;
  title: string;
  pitch: string;
}

export const SKEPTIC_STOPS: SkepticStop[] = [
  {
    slug: "the-atheist-in-the-pulpit",
    title: "1. The questions that actually matter.",
    pitch:
      "Most defenses of Christianity answer questions skeptics aren't asking. Here are the ones that actually land, from a pastor who held them himself.",
  },
  {
    slug: "what-new-atheists-got-right",
    title: "2. What secular explanations still have to explain.",
    pitch:
      "The case for atheism is stronger than the church admits. It also leaves real things uncovered. Both can be true.",
  },
  {
    slug: "if-god-is-good-why-suffering",
    title: "3. The problem of suffering, honestly.",
    pitch:
      "The standard apologetic responses are too clean. The biblical responses are messier, and more livable.",
  },
  {
    slug: "did-the-resurrection-happen",
    title: "4. The historical Jesus, without the shortcuts.",
    pitch:
      "What you can defend historically. What you can't. What changes if the resurrection happened.",
  },
  {
    slug: "why-trust-the-bible",
    title: "5. The Bible without the marketing.",
    pitch:
      "Inerrancy is a fairly recent dogma. Inspiration is older. Read Scripture the way Christians have actually read it.",
  },
  {
    slug: "can-you-be-good-without-god",
    title: "6. Morality without God, and with him.",
    pitch:
      "The argument that you can't be moral without God is bad and embarrassing. The argument that morality points somewhere is better.",
  },
  {
    slug: "is-jesus-really-the-only-way",
    title: "7. The claim you can't stay neutral about.",
    pitch:
      "If Jesus is who he said he was, indifference stops being an option. What the exclusive claim actually asks of the person who takes it seriously.",
  },
];

/**
 * True only when every stop resolves to a real essay. The site advertises the
 * track (nav cards, CTAs) only while this holds; otherwise those entry points
 * are hidden so nothing points a reader at an unfinished track.
 */
export const SKEPTIC_TRACK_LIVE: boolean = SKEPTIC_STOPS.every((s) => s.slug !== null);
