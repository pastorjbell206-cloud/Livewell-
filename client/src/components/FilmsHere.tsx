/**
 * The Bible Explorer's moving pictures that belong on this page.
 *
 * Which films are offered where is never typed into a page: each film's own
 * data names the pages it points to (its deeper links, where churches differ,
 * where it sends the reader at the end), and scripts/build-explorer-index.mjs
 * turns that round into client/public/explorer/film-links.json. An Honest
 * Answer, a /questions piece, a doctrine study or a wisdom topic passes its
 * own address and shows whatever films point at it; with none, or if the
 * small file cannot be read, it shows nothing at all.
 */
import { useEffect, useId, useState } from "react";
import { Link } from "wouter";
import { Play } from "lucide-react";
import { fetchJson } from "@/lib/fetch-json";

interface FilmLinks {
  films: Record<string, { title: string; line: string }>;
  pages: Record<string, string[]>;
}

const isFilmLinks = (x: unknown): x is FilmLinks =>
  !!x &&
  typeof x === "object" &&
  typeof (x as FilmLinks).films === "object" &&
  typeof (x as FilmLinks).pages === "object";

let cache: Promise<FilmLinks | null> | null = null;
/** The one small file, fetched once however many pages ask. */
export const loadFilmLinks = () =>
  (cache ??= fetchJson("/explorer/film-links.json", isFilmLinks).catch(
    () => null
  ));
/** For tests: forget what was fetched. */
export const forgetFilmLinks = () => {
  cache = null;
};

export default function FilmsHere({ path }: { path: string }) {
  const [links, setLinks] = useState<FilmLinks | null>(null);
  const id = useId();
  useEffect(() => {
    let live = true;
    loadFilmLinks().then(l => live && setLinks(l));
    return () => {
      live = false;
    };
  }, []);
  const slugs = (links?.pages[path] ?? []).filter(s => links?.films[s]);
  if (!links || slugs.length === 0) return null;
  return (
    <aside
      className="no-print"
      aria-labelledby={id}
      style={{
        margin: "var(--s-5) 0",
        padding: "var(--s-4)",
        border: "1px solid var(--border)",
        background: "var(--card)",
      }}
    >
      <h2 id={id} className="eyebrow" style={{ margin: "0 0 var(--s-3)" }}>
        Watch and learn
      </h2>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gap: "var(--s-3)",
        }}
      >
        {slugs.map(slug => {
          const film = links.films[slug];
          return (
            <li key={slug}>
              <Link
                href={`/study/explorer/watch/${slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "12px",
                  alignItems: "start",
                  minHeight: "44px",
                  color: "var(--ink)",
                  textDecoration: "none",
                  backgroundImage: "none",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "44px",
                    height: "44px",
                    border: "1.5px solid var(--art-ink)",
                    borderRadius: "50%",
                    background: "var(--art-paper)",
                    color: "var(--art-ink)",
                  }}
                >
                  <Play size={18} strokeWidth={1.75} />
                </span>
                <span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--F)",
                      fontSize: "var(--fs-h3, 1.35rem)",
                      lineHeight: 1.2,
                    }}
                  >
                    {film.title}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      fontFamily: "var(--U)",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "var(--ink-muted)",
                    }}
                  >
                    A moving picture, with a voice if you want one. {film.line}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
