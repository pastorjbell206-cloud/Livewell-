/**
 * The narrated films that live on pages of their own (an "Is it true?"
 * question, a book's page, a study guide, a track), listed on /study/films
 * after the Explorer's films so every film on the site can be found in one
 * place. The list is the live films' own data (client/src/data/
 * narrated-films.json, written by scripts/build-narrated-films.mjs), loaded
 * only when this page opens; no film is typed here. Each card opens the page
 * the film sits on.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Play } from "lucide-react";
import "@/components/chapter-films.css";

interface Card { slug: string; title: string; page: string; poster: string; seconds: number }

/** Where a film's page sits, in the words of the site's own doors. */
const GROUPS: { name: string; line: string; test: (page: string) => boolean }[] = [
  { name: "Is it true?", line: "The hardest questions about the Bible and the faith, taken at full strength.", test: (p) => p.startsWith("/questions") || p === "/skeptics" || p.startsWith("/answers") },
  { name: "Doctrine and church history", line: "What Christians believe, and how the church came to say it.", test: (p) => p.startsWith("/study/bible/doctrines") || p.startsWith("/theology") },
  { name: "From the books", line: "Films that open James Bell's books.", test: (p) => p.startsWith("/books") },
  { name: "Study and practice", line: "How to read the Bible, and studies to walk through.", test: () => true },
];

const length = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

export function MoreFilms() {
  const [cards, setCards] = useState<Card[] | null>(null);
  useEffect(() => {
    let live = true;
    import("@/data/narrated-films.json")
      .then((m) => {
        const films = (m.default as { films: Card[] }).films.filter((f) => !f.page.startsWith("/study/explorer/watch/"));
        if (live) setCards(films);
      })
      .catch(() => live && setCards([]));
    return () => {
      live = false;
    };
  }, []);
  if (!cards || !cards.length) return null;
  const seen = new Set<string>();
  const groups = GROUPS.map((g) => ({ ...g, films: cards.filter((c) => !seen.has(c.slug) && g.test(c.page) && seen.add(c.slug)) })).filter((g) => g.films.length);
  return (
    <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--gutter) var(--s-6)" }} aria-labelledby="more-films">
      <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
        <h2 id="more-films" style={{ fontFamily: "var(--F)", fontSize: "var(--fs-h2)", fontWeight: 400, margin: "0 0 var(--s-2)" }}>More films</h2>
        <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", margin: "0 0 var(--s-4)", maxWidth: "62ch" }}>
          Films that sit on other pages of the site. Each opens its page, with the film at the top and every word underneath.
        </p>
        {groups.map((g) => (
          <div key={g.name} style={{ marginBottom: "var(--s-5)" }}>
            <h3 className="eyebrow chf-title">{g.name}</h3>
            <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", margin: "0 0 12px" }}>{g.line}</p>
            <ul className="chf-row" style={{ gridAutoFlow: "row", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", overflowX: "visible" }}>
              {g.films.map((f) => (
                <li key={f.slug}>
                  <Link href={f.page} className="chf-card">
                    <span className="chf-pic">
                      <img src={f.poster} alt="" loading="lazy" decoding="async" width={320} height={180} />
                      <span className="chf-play" aria-hidden>
                        <Play size={18} />
                      </span>
                    </span>
                    <span className="chf-name">{f.title}</span>
                    <span className="chf-at">{length(f.seconds)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
