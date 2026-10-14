/**
 * The books on the /books shelf: the three James wrote by hand.
 *
 * One list for every surface that points a reader at a book (the /books page,
 * the home page, the /answers ladder, the end-of-essay card), so none of them
 * can send a reader to a title that has left the shelf. When a book returns
 * from the archive (content/archive/), add it here and it appears everywhere.
 */
export interface ShelfBook {
  slug: string;
  href: string;
  /** Large cover for the /books page. */
  cover: string;
  /** Small cover (webp) for cards and rows. */
  thumb: string;
  title: string;
  /** The book's subtitle, as printed on its own page. */
  sub: string;
  kicker: string;
  blurb: string;
}

export const BOOK_SHELF: ShelfBook[] = [
  {
    slug: "when-god-bless-america",
    href: "/books/when-god-bless-america",
    cover: "/books/when-god-bless-america.jpg",
    thumb: "/books/when-god-bless-america.webp",
    title: "When God Bless America Replaces Thy Kingdom Come",
    sub: "How Patriotism Became Our Practical Savior",
    kicker: "Politics and the church",
    blurb:
      "A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary. Not a case for the other party. A case for the kingdom that does not run for office.",
  },
  {
    slug: "the-monster-in-the-mirror",
    href: "/books/the-monster-in-the-mirror",
    cover: "/books/the-monster-in-the-mirror.jpg",
    thumb: "/books/the-monster-in-the-mirror.webp",
    title: "The Monster in the Mirror",
    sub: "Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It",
    kicker: "Reading the Bible honestly",
    blurb:
      "Every generation reads the Bible with blind spots, and every generation is sure it is the one that finally sees clearly. This book asks the harder question: what will our grandchildren say we missed?",
  },
  {
    slug: "believe",
    href: "/books/believe",
    cover: "/books/believe.jpg",
    thumb: "/books/believe.webp",
    title: "Believe",
    sub: "The Rational Case for Christian Faith",
    kicker: "For skeptics",
    blurb:
      "Rational answers to the hardest questions skeptics ask — God, the Bible, the resurrection, suffering, hell — from a pastor who spent years on the other side of the argument and remembers what it sounds like from there.",
  },
];

const BY_SLUG = new Map(BOOK_SHELF.map((b) => [b.slug, b] as const));

/** A shelf book by slug. Throws on an unknown slug so a typo fails a test, not a reader. */
export function shelfBook(slug: string): ShelfBook {
  const book = BY_SLUG.get(slug);
  if (!book) throw new Error(`"${slug}" is not on the /books shelf`);
  return book;
}

/** True when a link points at a book that is on the /books shelf. */
export function isShelfBookHref(href: string): boolean {
  return BOOK_SHELF.some((b) => b.href === href);
}
