/**
 * /study/themes: themes of the Bible. Every book's themes (intro.json
 * `themes`, gathered by scripts/build-bible-themes-index.mjs into
 * /bible/explore/themes.json), each with the book's own paragraph, whole,
 * and the way to that book.
 *
 * Themes that carry the same title in more than one book stand under that
 * one title, each book's paragraph kept apart and unchanged. Nothing else is
 * joined: the page does not decide that two differently named themes are one,
 * and it sorts them only by the alphabet, never into a scheme of its own.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchThemes, nameList, type ExploreBook, type Theme, type ThemesData } from "@/lib/bibleExplore";
import { Band, Status, useLoad } from "../study-bible/shared";
import { TestamentChips, onJump, useStaged, type Testament } from "./shared";
import "../study-bible/bible.css";
import "./explore.css";

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[‘’']/g, "");
/** The letter a theme is filed under: "The Day of the LORD" under D. */
export const letterOf = (title: string) => title.replace(/^(?:The|A|An) /i, "").charAt(0).toUpperCase();

function ThemeCard({ t, books }: { t: Theme; books: Map<string, ExploreBook> }) {
  return (
    <li id={t.id} className="bx-theme">
      <h3>{t.title}</h3>
      {t.entries.map((e) => {
        const b = books.get(e.book);
        if (!b) return null;
        return (
          <div key={e.book} className="bx-word__entry">
            <p className="bx-theme__book">
              <Link href={`/study/bible/${b.slug}`}>{b.name}</Link>
            </p>
            <p>{e.body}</p>
          </div>
        );
      })}
    </li>
  );
}

export function ThemesView({ data }: { data: ThemesData }) {
  const [query, setQuery] = useState("");
  const [testament, setTestament] = useState<Testament>("all");
  const all = useStaged();
  const books = useMemo(() => new Map(data.books.map((b) => [b.slug, b])), [data.books]);
  const paragraphs = data.themes.reduce((n, t) => n + t.entries.length, 0);

  const q = fold(query.trim());
  const shown = useMemo(
    () =>
      data.themes
        // A testament narrows a shared theme to its books in that testament.
        .map((t) => (testament === "all" ? t : { ...t, entries: t.entries.filter((e) => books.get(e.book)?.testament === testament) }))
        .filter((t) => t.entries.length > 0)
        .filter((t) => !q || fold(t.title).includes(q) || t.entries.some((e) => fold(e.body).includes(q) || fold(books.get(e.book)?.name ?? "").includes(q))),
    [data.themes, books, testament, q],
  );
  const shared = shown.filter((t) => t.entries.length > 1);
  const letters = Array.from(new Set(shown.map((t) => letterOf(t.title))));

  return (
    <>
      <Band id="themes">
        <p className="bx-lede">
          {data.themes.length} themes from all {data.books.length} book pages, each in its own book's words.
        </p>
        <p className="bx-note">A theme that more than one book names under the same title is shown once, with each book's paragraph. No other themes are joined.</p>
        <div className="bx-filters">
          <div className="bx-field">
            <label htmlFor="bx-theme">Find a theme</label>
            <input id="bx-theme" type="search" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" placeholder="A theme, a word or a book" />
          </div>
          <TestamentChips value={testament} onChange={setTestament} />
          <p className="bx-count" role="status">
            Showing {shown.length} of {data.themes.length} themes{q || testament !== "all" ? "" : `, ${paragraphs} paragraphs`}.
          </p>
        </div>
        {shown.length === 0 ? (
          <p className="bx-note">
            No theme matches that.{" "}
            <button
              type="button"
              className="bx-reset"
              onClick={() => {
                setQuery("");
                setTestament("all");
              }}
            >
              Show every theme
            </button>
          </p>
        ) : (
          <nav aria-label="Jump to a letter">
            <ul className="bx-books bx-letters">
              {letters.map((l) => (
                <li key={l}>
                  <a href={`#themes-${l}`} onClick={onJump(`themes-${l}`)}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {shared.length > 0 && (
          <p className="bx-note bx-shared">
            Named by more than one book:{" "}
            {shared.map((t, i) => (
              <span key={t.id}>
                {i > 0 && ", "}
                <a href={`#${t.id}`} onClick={onJump(t.id)}>
                  {t.title}
                </a>{" "}
                ({nameList(t.entries.map((e) => books.get(e.book)?.name ?? e.book))})
              </span>
            ))}
            .
          </p>
        )}
      </Band>

      {letters
        .filter((_, i) => all || i === 0)
        .map((l, i) => {
          const themes = shown.filter((t) => letterOf(t.title) === l);
          return (
            <Band key={l} tone={i % 2 ? "bone" : "warm"}>
              <div className="bx-band__head">
                <h2 id={`themes-${l}`} tabIndex={-1}>
                  {l}
                </h2>
                <p>
                  {themes.length} {themes.length === 1 ? "theme" : "themes"}
                </p>
              </div>
              <ul className={`bk-words bx-words bx-themes${i ? " bx-far" : ""}`}>
                {themes.map((t) => (
                  <ThemeCard key={t.id} t={t} books={books} />
                ))}
              </ul>
            </Band>
          );
        })}
    </>
  );
}

export default function BibleThemes() {
  const { data, retry } = useLoad("themes", fetchThemes);
  return (
    <Layout>
      <SEOMeta
        title="Themes of the Bible, Book by Book"
        description="Every theme the Study Bible's 66 book pages name, in one searchable list, each with its own book's paragraph and a link to the book."
        url="https://www.livewellbyjamesbell.co/study/themes"
      />
      <InnerHead path="/study/themes" title="Themes of the Bible" line="Every theme the book pages name, each in its own book's words. Search them, or go by letter." plate="tree" />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the themes…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The themes" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && <ThemesView data={data} />}
    </Layout>
  );
}
