/**
 * KeepReadingBook — the essay-to-book card. An essay ends with the book that
 * carries its argument to full length, chosen from the essay's slug and
 * pillar/track so the match is topical. Only books on the /books shelf
 * (lib/bookShelf.ts) are ever offered; when none of them fits the essay, no
 * card renders, because a book that does not carry the argument is an ad.
 */
import { Link } from "wouter";
import { pillarForPost, resolveTrack } from "@/lib/taxonomy";
import { trackBookClick } from "@/lib/telemetry";
import { shelfBook, type ShelfBook } from "@/lib/bookShelf";

interface PostLike {
  slug?: string | null;
  pillar?: string | null;
}

/** Slug-keyword rules: first match wins; most specific rules first. */
const SLUG_BOOK_RULES: Array<{ keywords: string[]; book: string }> = [
  { keywords: ["monster", "mirror", "blind-spot", "cultural-lens", "gets-the-bible-wrong", "every-generation"], book: "the-monster-in-the-mirror" },
  { keywords: ["god-bless-america", "nationalis", "civil-religion", "patriot", "empire", "christendom"], book: "when-god-bless-america" },
  {
    keywords: [
      "atheis", "skeptic", "unbelie", "apologetic", "resurrection", "god-exist", "god-actually-exist",
      "suffering", "miracle", "faith-and-science", "science-and-faith", "trust-the-bible", "reliability", "is-the-bible",
      "never-heard", "only-way", "is-hell", "about-hell",
    ],
    book: "believe",
  },
];

/** The shelf book that carries this essay's argument, or null when none does. */
export function bookFor(post: PostLike): ShelfBook | null {
  const slug = (post.slug ?? "").toLowerCase();
  if (slug) {
    for (const rule of SLUG_BOOK_RULES) {
      if (rule.keywords.some((k) => slug.includes(k))) return shelfBook(rule.book);
    }
  }

  const track = resolveTrack(post.pillar ?? null)?.slug;
  if (track === "politics" || track === "after-christendom") return shelfBook("when-god-bless-america");
  if (track === "american-church" || track === "theology") return shelfBook("the-monster-in-the-mirror");
  if (track === "doubt") return shelfBook("believe");
  if (track) return null;

  const id = pillarForPost(post)?.id;
  if (id === 1 || id === 2 || id === 4) return shelfBook("when-god-bless-america");
  if (id === 3) return shelfBook("the-monster-in-the-mirror");
  return null;
}

export function KeepReadingBook({
  post,
  quiet = false,
}: {
  post: PostLike;
  /**
   * Demote to a compact line. Set when the reader is mid reading path, where
   * the next essay in that path is the earned next step and the book would
   * otherwise compete with it.
   */
  quiet?: boolean;
}) {
  const book = bookFor(post);
  if (!book) return null;

  if (quiet) {
    return (
      <section style={{ background: "var(--bone)", padding: "var(--s-4)" }}>
        <div
          style={{
            maxWidth: "var(--w-content)",
            margin: "0 auto",
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img
            src={book.thumb}
            alt=""
            width={44}
            height={66}
            style={{ width: "44px", height: "auto", borderRadius: "2px", flex: "0 0 auto" }}
          />
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--ink-muted)",
              margin: 0,
            }}
          >
            The argument runs to full length in{" "}
            <Link
              href={book.href}
              onClick={() => trackBookClick(post.slug ?? "", book.slug)}
              style={{
                fontFamily: "var(--U)",
                fontWeight: 600,
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1px solid var(--mustard)",
              }}
            >
              {book.title}
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "var(--ink)", padding: "var(--s-6) var(--s-4)" }}>
      <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap" }}>
        <img
          src={book.thumb}
          alt={`${book.title} cover`}
          width={120}
          height={181}
          style={{ width: "110px", height: "auto", borderRadius: "3px", boxShadow: "0 12px 32px rgba(0,0,0,.5)", flex: "0 0 auto" }}
        />
        <div style={{ flex: "1 1 320px" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard)" }}>
            Keep reading · The book
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, color: "var(--bone)", margin: "8px 0 4px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {book.title}
          </h2>
          <p style={{ fontFamily: "var(--F)", fontStyle: "italic", fontSize: "17px", color: "rgba(245,240,230,.72)", margin: "0 0 12px" }}>
            {book.sub}
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "rgba(245,240,230,.8)", margin: "0 0 18px", maxWidth: "54ch" }}>
            {book.blurb}
          </p>
          <Link href={book.href} onClick={() => trackBookClick(post.slug ?? "", book.slug)} style={{ display: "inline-block", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 26px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
            Read the book →
          </Link>
        </div>
      </div>
    </section>
  );
}
