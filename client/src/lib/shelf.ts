/**
 * The shelf: the three books James wrote by hand. One list, used by /books
 * and the front page, so a title, cover or blurb changes in one place.
 */
export interface ShelfBook {
  slug: string;
  href: string;
  /** JPEG path; the WebP sits beside it and CoverImage picks it up. */
  cover: string;
  title: string;
  kicker: string;
  blurb: string;
}

export const SHELF: ShelfBook[] = [
  {
    slug: "when-god-bless-america",
    href: "/books/when-god-bless-america",
    cover: "/books/when-god-bless-america.jpg",
    title: "When God Bless America Replaces Thy Kingdom Come",
    kicker: "Politics and the church",
    blurb:
      "A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary. Not a case for the other party. A case for the kingdom that does not run for office.",
  },
  {
    slug: "the-monster-in-the-mirror",
    href: "/books/the-monster-in-the-mirror",
    cover: "/books/the-monster-in-the-mirror.jpg",
    title: "The Monster in the Mirror",
    kicker: "Reading the Bible honestly",
    blurb:
      "Every generation reads the Bible with blind spots, and every generation is sure it is the one that finally sees clearly. This book asks the harder question: what will our grandchildren say we missed?",
  },
  {
    slug: "believe",
    href: "/books/believe",
    cover: "/books/believe.jpg",
    title: "Believe",
    kicker: "For skeptics",
    blurb:
      "Rational answers to the hardest questions skeptics ask — God, the Bible, the resurrection, suffering, hell — from a pastor who spent years on the other side of the argument and remembers what it sounds like from there.",
  },
];
