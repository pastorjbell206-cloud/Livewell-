/**
 * KeepReadingBook — the article-to-book funnel. Every essay ends with a card
 * pointing the reader to the book that carries its argument to full length,
 * chosen from the essay's pillar/track so the match is topical. This is the
 * mechanism by which the 160+ articles drive book sales.
 */
import { Link } from "wouter";
import { pillarForPost, resolveTrack } from "@/lib/taxonomy";

interface PostLike {
  slug?: string | null;
  pillar?: string | null;
}

interface BookRef {
  slug: string;
  title: string;
  sub: string;
  blurb: string;
}

const BOOKS: Record<string, BookRef> = {
  "babylon": {
    slug: "babylon",
    title: "Babylon",
    sub: "How to Live When America Stops Being Christian",
    blurb: "The full argument this essay is a piece of: how to live faithfully once Christendom is over, worked through Jeremiah's letter to the exiles.",
  },
  "how-to-read-the-bible": {
    slug: "how-to-read-the-bible",
    title: "How to Read the Bible",
    sub: "Without Making It Say What You Already Believe",
    blurb: "Reading Scripture without bending it to what you already wanted it to say, from proof-texting to the passages we skip.",
  },
  "be-true-to-yourself": {
    slug: "be-true-to-yourself",
    title: "Be True to Yourself",
    sub: "The Lie That Ate the World",
    blurb: "The age's one commandment, named as the lie it is, and the older freedom underneath it: you are not your own.",
  },
  "what-belongs-to-the-poor": {
    slug: "what-belongs-to-the-poor",
    title: "What Belongs to the Poor",
    sub: "What the Ancient Church Knew About Wealth and Justice",
    blurb: "What the church forgot about the poor, recovered from Basil and the Fathers, who called giving justice, not charity.",
  },
  "rule-of-life": {
    slug: "rule-of-life",
    title: "Rule of Life",
    sub: "The Ancient Art of Forming a Soul in an Age Built to Deform It",
    blurb: "The ancient practices the church used to form durable souls, recovered for an age engineered to deform us.",
  },
};

function bookFor(post: PostLike): BookRef {
  const track = resolveTrack(post.pillar ?? null)?.slug;
  if (track === "prophetic-justice" || track === "finances") return BOOKS["what-belongs-to-the-poor"];
  if (track === "theology" || track === "doubt") return BOOKS["how-to-read-the-bible"];
  if (track === "devotionals") return BOOKS["rule-of-life"];

  const id = pillarForPost(post)?.id;
  if (id === 3) return BOOKS["how-to-read-the-bible"];
  if (id === 2) return BOOKS["be-true-to-yourself"];
  if (id === 6) return BOOKS["rule-of-life"];
  return BOOKS["babylon"];
}

export function KeepReadingBook({ post }: { post: PostLike }) {
  const book = bookFor(post);
  return (
    <section style={{ background: "var(--ink)", padding: "var(--s-6) var(--s-4)" }}>
      <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap" }}>
        <img
          src={`/books/${book.slug}.svg`}
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
          <Link href={`/${book.slug}`} style={{ display: "inline-block", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", background: "var(--mustard)", padding: "13px 26px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
            Read the book →
          </Link>
        </div>
      </div>
    </section>
  );
}
