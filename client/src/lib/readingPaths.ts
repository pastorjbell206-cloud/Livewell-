/**
 * readingPaths.ts — the single source of truth for the site's reading paths.
 *
 * This replaces two disconnected, broken systems:
 *   1. server/seed-reading-paths.ts — seeded 21 paths into the DB with article
 *      COUNTS but no assigned articles (now superseded; see the note there).
 *   2. The old ReadingPathDetail hardcoded a different set of paths and filtered
 *      by `post.topic`, a field most essays lack, so the lists rendered empty.
 *
 * The architecture here mirrors the rest of the lib/ classification layer: an
 * ordered, hand-curated list lives in code, not the DB. The site has a finite,
 * slow-growing set of essays, and the author controls which ones belong in an
 * ordered arc. Editing this file is the whole workflow.
 *
 * The six definitive paths come straight from the content library plan:
 *   1. Start Here — Blind Spots (links to /start, the book in order)
 *   2. Capture by the Right
 *   3. Capture by the Left
 *   4. Reading Scripture Past Our Politics
 *   5. The Church After Christendom
 *   6. The Pastoral Angle
 *
 * Every entry is either an existing essay (`available: true`, with a real slug
 * that resolves at /writing/:slug) or a planned essay not yet written
 * (`available: false`, rendered as "Coming soon" — never a broken link). The
 * available slugs are verified against client/src/data/content-data.json by the
 * test in client/src/lib/__tests__/readingPaths.test.ts.
 *
 * To reorder a path, reorder its `entries`. To add an essay, add an entry. When
 * a planned essay is written and imported, flip `available` to true and add its
 * real slug.
 */

export interface ReadingPathEntry {
  /** Display title (Cormorant). */
  title: string;
  /** One-line framing shown under the title. Optional. */
  blurb?: string;
  /**
   * Canonical site slug → /writing/:slug. Present only on available entries.
   * Planned-but-unwritten entries omit this and render as "Coming soon".
   */
  slug?: string;
  /** True once the essay resolves at /writing/:slug; false while unwritten. */
  available: boolean;
}

export interface ReadingPath {
  /** URL segment for /reading-paths/:slug. Lowercase, hyphenated. */
  slug: string;
  /** Display title (Cormorant). */
  title: string;
  /** One-paragraph framing for the list card and the detail header. */
  description: string;
  /**
   * For a path that is really a pointer to another page (the book guide at
   * /start), this is the link target. When set, the list card links straight
   * there and the path has no detail page of its own.
   */
  externalHref?: string;
  /** Ordered reading sequence. Empty when `externalHref` is set. */
  entries: ReadingPathEntry[];
}

export const READING_PATHS: ReadingPath[] = [
  {
    slug: "start-here-blind-spots",
    title: "Start Here — Blind Spots",
    description:
      "The book, in order. American Christianity has been captured — by both the right and the left — and the first honest move is admitting it is happening in us, not just in them. Begin at the foundation and read through to the end of Christian America.",
    externalHref: "/start",
    entries: [],
  },
  {
    slug: "capture-by-the-right",
    title: "Capture by the Right",
    description:
      "Where the church has merged the cross with the flag — Christian nationalism, the gospel of patriotism, and fear dressed up as theology. The aim is not caricature. It is to name the fusion and trace it to its root.",
    entries: [
      {
        title: "When God Bless America Replaces Thy Kingdom Come",
        slug: "when-god-bless-america-replaces-thy-kingdom-come",
        blurb:
          "How patriotism became the practical savior of American Christianity.",
        available: true,
      },
      {
        title:
          "When the Church Becomes a Political Brand — and How to Step Back",
        slug: "church-political-brand-step-back",
        blurb: "The mechanics of a church turned voting bloc, and the way out.",
        available: true,
      },
      {
        title: "When Patriotism Becomes a Gospel",
        blurb: "How churches lose Christ by merging the cross with the nation.",
        available: false,
      },
      {
        title: "When Fear Becomes Theology",
        blurb: "Fear is the most powerful distorter of Christian thinking.",
        available: false,
      },
      {
        title: "The Conservative Blind Spot",
        blurb:
          "When the project of preservation becomes identified with the truth itself.",
        available: false,
      },
      {
        title: "How American Individualism Distorts the Bible",
        blurb: "Why the New Testament church is more than personal faith.",
        available: false,
      },
      {
        title: "The Flag in the Sanctuary: How It Got There",
        blurb:
          "The historical arc from Constantine's bargain through 1950s civil religion to now.",
        available: false,
      },
      {
        title: "Strongman Theology",
        blurb: "Why a frightened church wants a king — read through 1 Samuel 8.",
        available: false,
      },
      {
        title: "Six Verses We Memorized, Sixty We Skipped",
        blurb: "The selective canon of the political right.",
        available: false,
      },
    ],
  },
  {
    slug: "capture-by-the-left",
    title: "Capture by the Left",
    description:
      "The quieter idolatries of the progressive church, named with the same honesty — justice severed from love, the confidence of being on the right side of history mistaken for the right side of Scripture. The harder essay to write for this audience, which is exactly why it matters.",
    entries: [
      {
        title: "Justice Without Love Is Ideology",
        slug: "justice-without-love-ideology",
        blurb: "What happens when a good thing takes God's place.",
        available: true,
      },
      {
        title: "Why Racial Reconciliation Without Repentance Is Just Branding",
        slug: "racial-reconciliation-without-repentance",
        blurb: "The cost of a reconciliation that skips confession.",
        available: true,
      },
      {
        title: "The Progressive Blind Spot",
        blurb:
          "Being on the right side of history is not evidence of being on the right side of Scripture.",
        available: false,
      },
      {
        title: "The Right Side of History Is Not the Right Side of Scripture",
        blurb: "The pillar's thesis essay.",
        available: false,
      },
      {
        title: "The Sin We Stopped Naming",
        blurb: "The missing doctrine of sin in progressive Christianity.",
        available: false,
      },
      {
        title: "Affirmation Is Not Love",
        blurb: "Therapeutic culture and the love that tells the truth.",
        available: false,
      },
      {
        title: "Deconstruction Without Reconstruction Is Demolition",
        blurb: "For the reader taking the faith apart.",
        available: false,
      },
      {
        title: "The Authority We Traded for Authenticity",
        blurb: "Scripture's claim versus the sovereign self.",
        available: false,
      },
    ],
  },
  {
    slug: "reading-scripture-past-our-politics",
    title: "Reading Scripture Past Our Politics",
    description:
      "How translation, tradition, and tribe edit the text we claim to believe. This is the method under the whole project — learning to see the lenses before you read, and what the Bible actually says about power, empire, justice, and allegiance.",
    entries: [
      {
        title: "Justice Is Not a Political Category: It Is a Theological One",
        slug: "justice-not-political-theological",
        blurb:
          "How a word that appears hundreds of times in Scripture became a partisan signal.",
        available: true,
      },
      {
        title: "Mishpat and Tsedaqah",
        slug: "mishpat-tsedaqah",
        blurb: "Two Hebrew words the church has flattened.",
        available: true,
      },
      {
        title: "What Micah 6:8 Actually Demands",
        slug: "micah-6-8-demands",
        available: true,
      },
      {
        title: "What Leviticus 19 Demands in a Border Crisis",
        slug: "leviticus-19-border-crisis",
        available: true,
      },
      {
        title: "What the Good Samaritan Is Actually Arguing",
        slug: "good-samaritan-arguing",
        available: true,
      },
      {
        title: "What the Jubilee Means",
        slug: "what-jubilee-means",
        available: true,
      },
      {
        title: "The Widow, the Orphan, the Stranger",
        slug: "widow-orphan-stranger",
        available: true,
      },
      {
        title: "What the Greek Actually Says: Why Original Language Matters",
        slug: "greek-original-language-matters",
        available: true,
      },
      {
        title: "The Kingdom of God Is Not What You Think It Is",
        slug: "kingdom-of-god-not-what-you-think",
        available: true,
      },
      {
        title: "Sin Is Not Just What You Do — It's What You Are",
        slug: "sin-not-just-what-you-do",
        available: true,
      },
      {
        title: "Six Lenses That Distort the Bible Before You Read a Word",
        blurb: "The cultural-lenses spine, made into a standalone.",
        available: false,
      },
      {
        title: "Proof-Texting Is How Both Sides Win and the Text Loses",
        available: false,
      },
    ],
  },
  {
    slug: "the-church-after-christendom",
    title: "The Church After Christendom",
    description:
      "The civilizational shift under everything else — why your faith feels different now. The collapse of cultural Christianity and what faithfulness looks like on the other side of cultural power, held without nostalgia.",
    entries: [
      {
        title: "The Church Has a Credibility Problem",
        slug: "church-credibility-problem",
        blurb: "Why the watching world stopped believing us.",
        available: true,
      },
      {
        title: "Where the Church Was Silent",
        slug: "where-church-was-silent",
        blurb: "A reckoning with the history the church would rather not own.",
        available: true,
      },
      {
        title: "Complicity Is Not Innocence",
        slug: "complicity-not-innocence",
        blurb: "What silence costs the witness.",
        available: true,
      },
      {
        title:
          "Engaging the 'Nones' — What Research Tells Us About Reaching the Unaffiliated",
        slug: "engaging-nones-religiously-unaffiliated",
        available: true,
      },
      {
        title: "How to Lead When Trust in Institutions Is at an All-Time Low",
        slug: "lead-when-trust-institutions-low",
        available: true,
      },
      {
        title:
          "What the Global South Can Teach the American Church About Suffering",
        slug: "global-south-church-teach-suffering",
        available: true,
      },
      {
        title: "How Christian America Was Built, and Why It Is Ending",
        blurb: "From Theodosius to the present, the arc named.",
        available: false,
      },
      {
        title: "Why Your Faith Doesn't Feel the Way It Used To",
        blurb:
          "Why worship, church, and the culture around it feel unfamiliar.",
        available: false,
      },
      {
        title: "What Is Actually Causing the Decline",
        available: false,
      },
      {
        title: "What Comes Next for the Church After Cultural Power Is Gone",
        available: false,
      },
      {
        title: "Exile Is Not the End",
        blurb: "Jeremiah 29 and the work of a displaced church.",
        available: false,
      },
    ],
  },
  {
    slug: "the-pastoral-angle",
    title: "The Pastoral Angle",
    description:
      "The long work of pastoring inside all of this — burnout, board conflict, preaching a divided room, and the calling underneath. Strong already; this path connects the soul care to the moment the church is actually living through.",
    entries: [
      {
        title: "The Hidden Pain of the Successful Pastor",
        slug: "hidden-pain-successful-pastor",
        blurb: "The peculiar isolation success in ministry creates.",
        available: true,
      },
      {
        title: "The Slow Burn: How Ministry Exhaustion Sneaks Up on You",
        slug: "slow-burn-ministry-exhaustion",
        blurb: "Burnout is not a moment. It is a process.",
        available: true,
      },
      {
        title: "When the Shepherd Needs Shepherding",
        slug: "when-shepherd-needs-shepherding",
        available: true,
      },
      {
        title: "The Loneliness of Leadership",
        slug: "loneliness-of-leadership",
        available: true,
      },
      {
        title: "The Danger of Pastoral Isolation",
        slug: "danger-pastoral-isolation",
        available: true,
      },
      {
        title:
          "It's Okay to See a Counselor — Why Pastors Resist and Why They Shouldn't",
        slug: "okay-to-see-counselor",
        available: true,
      },
      {
        title:
          "How to Pastor a Congregation That Is Politically Divided — And Keep the Gospel Central",
        slug: "pastor-politically-divided-gospel-central",
        available: true,
      },
      {
        title:
          "How to Talk About Political Divisiveness From the Pulpit Without Destroying Your Church",
        slug: "talk-politics-pulpit-without-destroying",
        available: true,
      },
      {
        title: "The Prophetic Pastor",
        slug: "prophetic-pastor",
        blurb:
          "Naming injustice and advocating for the vulnerable is not optional.",
        available: true,
      },
      {
        title: "The Interior Life of the Pastor",
        slug: "interior-life-of-pastor",
        available: true,
      },
      {
        title: "The Last Nonpartisan in the Room",
        blurb: "The cost and calling of the pastor who won't pick a tribe.",
        available: false,
      },
      {
        title: "Discipling People Out of Fear",
        blurb: "The formation work under the politics.",
        available: false,
      },
    ],
  },
];

export const READING_PATH_BY_SLUG: Map<string, ReadingPath> = new Map(
  READING_PATHS.map(p => [p.slug, p])
);

/** Look up a single reading path by its URL slug. */
export function getReadingPathBySlug(
  slug: string | null | undefined
): ReadingPath | undefined {
  return slug ? READING_PATH_BY_SLUG.get(slug) : undefined;
}

/** Count of essays already on the site in a path (the available entries). */
export function availableCount(path: ReadingPath): number {
  return path.entries.filter(e => e.available).length;
}
