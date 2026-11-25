/**
 * /study/key-chapters: where to start in every book. Each book's key
 * chapters (intro.json `keyChapters`, gathered by
 * scripts/build-bible-keys-index.mjs into /bible/explore/key-chapters.json)
 * with the book's own reason for each, and the link that opens the chapter.
 *
 * A reader says how much time there is: one chapter, three, or all a book
 * lists. The book pages list their key chapters in order through the book,
 * not by rank, so "one chapter" is the first a book lists and the page says
 * so. It ranks nothing itself.
 */
import { useState } from "react";
import { Link } from "wouter";
import { BookOpen } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { chapterBookName, chapterHref } from "@/lib/bible";
import { fetchKeyChapters, type KeyChaptersData } from "@/lib/bibleExplore";
import { Band, Status, useLoad } from "../study-bible/shared";
import { TestamentChips, onJump, useStaged, type Testament } from "./shared";
import "../study-bible/bible.css";
import "./explore.css";

export const TIMES: { n: number; label: string }[] = [
  { n: 1, label: "One chapter" },
  { n: 3, label: "Three chapters" },
  { n: Infinity, label: "All listed" },
];
const PARTS: ["OT" | "NT", string][] = [
  ["OT", "Old Testament"],
  ["NT", "New Testament"],
];

export function KeyChaptersView({ data }: { data: KeyChaptersData }) {
  const [testament, setTestament] = useState<Testament>("all");
  const [time, setTime] = useState(Infinity);
  const all = useStaged();
  const count = data.books.reduce((n, b) => n + b.chapters.length, 0);
  const shown = data.books.filter((b) => testament === "all" || b.testament === testament).map((b) => ({ ...b, listed: b.chapters.length, chapters: b.chapters.slice(0, time) }));
  const total = shown.reduce((n, b) => n + b.chapters.length, 0);

  return (
    <>
      <Band id="start">
        <p className="bx-lede">
          {count} key chapters across all {data.books.length} books, each with its own book's reason.
        </p>
        <p className="bx-note">Each book page lists its key chapters in order through the book. With time for one chapter, this page shows the first a book lists; with time for three, the first three.</p>
        <div className="bx-filters">
          <div className="bk-tl__chips bx-chips" role="group" aria-label="How much time you have, for each book">
            {TIMES.map((t) => (
              <button key={t.label} type="button" aria-pressed={time === t.n} onClick={() => setTime(t.n)}>
                {t.label}
              </button>
            ))}
          </div>
          <TestamentChips value={testament} onChange={setTestament} />
          <p className="bx-count" role="status">
            Showing {total} of {count} key chapters.
          </p>
        </div>
        <nav aria-label="Books">
          <ul className="bx-books">
            {shown.map((b) => (
              <li key={b.slug}>
                <a href={`#start-${b.slug}`} onClick={onJump(`start-${b.slug}`)}>
                  {b.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Band>

      {PARTS.filter(([t]) => shown.some((b) => b.testament === t))
        .filter((_, i) => all || i === 0)
        .map(([t, name], i) => (
          <Band key={t} tone={i % 2 ? "bone" : "warm"}>
            <div className="bx-band__head">
              <h2 id={`start-${t.toLowerCase()}`}>{name}</h2>
            </div>
            <div className="bx-keys">
              {shown
                .filter((b) => b.testament === t)
                .filter((_, k) => all || k < 6)
                .map((b, k) => (
                  <section key={b.slug} className={`bx-hardbook${i > 0 || k >= 6 ? " bx-far" : ""}`} aria-labelledby={`start-${b.slug}`}>
                    <h3 id={`start-${b.slug}`} tabIndex={-1}>
                      <Link href={`/study/bible/${b.slug}`}>{b.name}</Link>
                    </h3>
                    {b.chapters.length < b.listed && (
                      <p className="bx-count">
                        {b.chapters.length} of the {b.listed} the {b.name} page lists.
                      </p>
                    )}
                    <ul className="bk-hard">
                      {b.chapters.map((c) => (
                        <li key={c.ch}>
                          <BookOpen aria-hidden="true" size={20} strokeWidth={1.75} />
                          <Link href={chapterHref(b.slug, c.ch)}>
                            {chapterBookName(b)} {c.ch}
                          </Link>
                          <span>{c.why}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
            </div>
            <p className="bx-top">
              <a href="#start" onClick={onJump("start")}>
                Back to the top of the list
              </a>
            </p>
          </Band>
        ))}
    </>
  );
}

export default function KeyChapters() {
  const { data, retry } = useLoad("keys", fetchKeyChapters);
  return (
    <Layout>
      <SEOMeta
        title="Where to Start in Every Book of the Bible"
        description="The key chapters of all 66 books of the Bible, each with the reason it matters. Say how much time you have, one chapter or three, and open the chapter."
        url="https://www.livewellbyjamesbell.co/study/key-chapters"
      />
      <InnerHead path="/study/key-chapters" title="Where to start in every book" line="The key chapters of all 66 books, each with its book's own reason. Choose one to open it." plate="book" />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the key chapters…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The key chapters" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && <KeyChaptersView data={data} />}
    </Layout>
  );
}
