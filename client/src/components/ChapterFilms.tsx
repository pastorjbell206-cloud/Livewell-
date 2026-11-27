/**
 * "Watch": the films that belong to a Bible chapter, as a row of posters
 * under the chapter's text in the Study Bible (James, 2026-11-27: "put the
 * videos into the Bible study ... make this very extremely user-friendly").
 *
 * Which films belong to a chapter is never typed here: it is the passage
 * index's "film" rows (scripts/lib/passage-index.mjs), the same rows "Go
 * deeper" lists further down. A film that has a narrated version shows its
 * poster (the narrated film's own address, from narrated-film-pages.json);
 * one without shows a plain play tile. Each card opens the film's own page.
 * It draws nothing at all when the chapter has no film, or the index cannot
 * be read, and it sits below the text, so it never moves the verses.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Play } from "lucide-react";
import pages from "@/data/narrated-film-pages.json";
import { fetchChapterIndex, type PassageRow } from "@/lib/passageIndex";
import "./chapter-films.css";

const PAGES = pages as Record<string, string>;
const LIVE = new Set(Object.values(PAGES));
const POSTERS = "https://6tank2ikr2l6p1eo.public.blob.vercel-storage.com/films";

/** The narrated film behind a film row, if there is one. */
export function narratedSlugFor(href: string): string | null {
  if (PAGES[href]) return PAGES[href];
  const m = href.match(/^\/study\/explorer\/watch\/([a-z0-9-]+)$/);
  return m && LIVE.has(m[1]) ? m[1] : null;
}

export default function ChapterFilms({ slug, chapter, label }: { slug: string; chapter: number; label: string }) {
  const [rows, setRows] = useState<PassageRow[]>([]);
  useEffect(() => {
    let live = true;
    setRows([]);
    fetchChapterIndex(slug, chapter)
      .then((r) => live && setRows(r.filter((x) => x.k === "film")))
      .catch(() => live && setRows([]));
    return () => {
      live = false;
    };
  }, [slug, chapter]);
  if (!rows.length) return null;
  return (
    <section className="chf" aria-labelledby={`chf-${slug}-${chapter}`}>
      <h2 className="eyebrow chf-title" id={`chf-${slug}-${chapter}`}>
        Watch: {rows.length === 1 ? "a film" : `${rows.length} films`} on {label}
      </h2>
      <ul className="chf-row">
        {rows.map((r) => {
          const narrated = narratedSlugFor(r.h);
          return (
            <li key={r.h}>
              <Link href={r.h} className="chf-card">
                <span className="chf-pic">
                  {narrated ? <img src={`${POSTERS}/${narrated}-poster.jpg`} alt="" loading="lazy" decoding="async" width={320} height={180} /> : null}
                  <span className="chf-play" aria-hidden>
                    <Play size={18} />
                  </span>
                </span>
                <span className="chf-name">{r.t}</span>
                <span className="chf-at">{r.p}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
