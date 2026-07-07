/**
 * blindSpots.ts — the reader's guide for "Blind Spots," James Bell's
 * book-in-public on the American church after Christendom.
 *
 * This is the single source of truth for the Start Here page (/start). It lists
 * the chapters in intended READING order (not publish order), grouped into the
 * foundational chapters and the flagship series. Titles, descriptions, and
 * dates mirror the Substack; slugs are the canonical slugs the essays will use
 * on this site once imported.
 *
 * `available` gates the link: true means the essay already resolves at
 * /writing/:slug; false means it's published on Substack and not yet imported
 * (the entry renders as "coming to the site"). Flip to true as each import
 * lands — that's the whole maintenance step.
 *
 * To reorder the guide, reorder the arrays. To add a chapter, add an entry.
 */

export interface Chapter {
  /** Reading-order title (matches the Substack post). */
  title: string;
  /** Canonical site slug → /writing/:slug. */
  slug: string;
  /** One-line description (from the Substack subtitle). Optional. */
  blurb?: string;
  /** Substack publish date, for the quiet metadata line. */
  date?: string;
  /** True once the essay resolves on this site; false while Substack-only. */
  available: boolean;
  /**
   * Direct Substack post URL. While a chapter is Substack-only
   * (`available: false`), the Start Here guide links here so a reader reaches
   * the real published essay instead of a dead end. If omitted, the guide
   * falls back to the Substack archive. Paste exact post URLs here as you have
   * them; drop the field (or set available: true) once the essay is imported.
   */
  substackUrl?: string;
}

export interface GuideSection {
  /** Eyebrow label for the section. */
  kicker: string;
  /** Section heading. */
  title: string;
  /** Short framing sentence under the heading. */
  intro: string;
  chapters: Chapter[];
}

/** The book's thesis, shown at the top of the guide. */
export const BLIND_SPOTS_THESIS =
  "American Christianity has been captured — in different ways, by both the right and the left. The first honest move is admitting the capture is happening in us, not just in them.";

export const BLIND_SPOTS_GUIDE: GuideSection[] = [
  {
    kicker: "Start here",
    title: "The foundation",
    intro:
      "The argument from the ground up — how self-deception works, and the blind spots distorting both sides before we ever reach politics.",
    chapters: [
      {
        title: "The Monster Is Never the One in the Mirror",
        slug: "the-monster-in-the-mirror",
        blurb:
          "The mechanism that produces moral catastrophe is not cynicism or cruelty — it is self-deception.",
        date: "Apr 2",
        available: true,
      },
      {
        title: "Blind Spots",
        slug: "blind-spots",
        blurb:
          "Blind spots are not only personal — communities develop institutional structures that protect the dominant coalition.",
        date: "Apr 8",
        available: false,
      },
      {
        title: "When Fear Becomes Theology",
        slug: "when-fear-becomes-theology",
        blurb: "Fear is the most powerful distorter of Christian thinking.",
        date: "Apr 10",
        available: false,
      },
      {
        title: "When Patriotism Becomes a Gospel",
        slug: "when-patriotism-becomes-a-gospel",
        blurb: "How churches lose Christ by merging the cross with the nation.",
        date: "Apr 16",
        available: false,
      },
      {
        title: "How American Individualism Distorts the Bible",
        slug: "how-american-individualism-distorts-the-bible",
        blurb: "Why the New Testament church is more than personal faith.",
        date: "Apr 17",
        available: false,
      },
      {
        title: "The Conservative Blind Spot",
        slug: "the-conservative-blind-spot",
        blurb:
          "The Pharisees were serious conservatives whose project of preservation had become identified with the truth.",
        date: "Apr 24",
        available: false,
      },
      {
        title: "The Progressive Blind Spot",
        slug: "the-progressive-blind-spot",
        blurb:
          "The confidence that you are on the right side of history is not evidence that you are on the right side of Scripture.",
        date: "Apr 23",
        available: false,
      },
      {
        title: "The Bible Assumes You Will Be Wrong",
        slug: "the-bible-assumes-you-will-be-wrong",
        date: "May 1",
        available: false,
      },
    ],
  },
  {
    kicker: "The flagship series",
    title: "The End of Christian America",
    intro:
      "How Christian America was built, why your faith feels different now, what is actually causing the decline, and what comes next for the church after cultural power is gone.",
    chapters: [
      {
        title: "How Christian America Was Built, and Why It Is Ending",
        slug: "how-christian-america-was-built",
        date: "May 21",
        available: false,
      },
      {
        title: "Why Your Faith Doesn't Feel the Way It Used To",
        slug: "why-your-faith-doesnt-feel-the-way-it-used-to",
        blurb:
          "The reason worship has changed, church feels different, and the culture around American Christianity is something you don't recognize.",
        date: "May 29",
        available: false,
      },
      {
        title: "What Is Actually Causing the Decline",
        slug: "what-is-actually-causing-the-decline",
        date: "May 15",
        available: false,
      },
      {
        title: "What Comes Next for the Church After Cultural Power Is Gone",
        slug: "what-comes-next-after-cultural-power",
        date: "May 7",
        available: false,
      },
    ],
  },
];
