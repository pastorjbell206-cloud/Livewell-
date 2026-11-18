/**
 * The Study Bible's front page (/study/bible), in the site's new look:
 *
 * 1. PageHead (inner size, the open-book plate) with the Go to box, which
 *    also finds a word, in the first screen; "Pick up where you left off"
 *    when this device has marked a chapter read; one line for a beginner.
 * 2. The 66 books in their seven sections (BookCase), on a charcoal band.
 * 3. Other ways in, as icon tiles.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookMarked, CalendarDays, Compass, Landmark, Library, Milestone, Search, Sprout } from "lucide-react";

import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import IconTile from "@/components/art/IconTile";
import { chapterHref, type BibleBook } from "@/lib/bible";
import { fetchStory, flattenStory, readProgress } from "@/lib/bible-notes";
import { GoToPassage } from "./GoToPassage";
import { useLoad } from "./shared";
import BookCase from "./BookCase";
import "../home/home.css";
import "./bible.css";

const WAYS = [
  { name: "The Bible's story", line: "One story in eleven parts", href: "/study/bible/story", icon: Milestone },
  { name: "What it teaches", line: "Each doctrine, chapter by chapter", href: "/study/bible/doctrines", icon: BookMarked },
  { name: "Guides to reading the Bible", line: "How to read each kind of book", href: "/study/bible/guides", icon: Compass },
  { name: "Search the Bible", line: "Any word or phrase", href: "/study/bible/search", icon: Search },
  { name: "Reading plans", line: "Every plan, by length", href: "/study/plans", icon: CalendarDays },
  { name: "Bible background", line: "The world it was written in", href: "/resources/context", icon: Landmark },
];

/** The chapter after the last one this device marked read, or null. */
function lastPlace(books: BibleBook[]): { slug: string; chapter: number } | null {
  const marked = Array.from(readProgress());
  const last = marked[marked.length - 1];
  if (!last) return null;
  const [slug, ch] = last.split("/");
  const at = books.findIndex((b) => b.slug === slug);
  const n = Number(ch);
  if (at < 0 || !Number.isFinite(n)) return null;
  if (n < books[at].chapters) return { slug, chapter: n + 1 };
  if (at < books.length - 1) return { slug: books[at + 1].slug, chapter: 1 };
  return { slug, chapter: n };
}

export default function BibleFront({ books }: { books: BibleBook[] }) {
  const [place] = useState(() => lastPlace(books));
  const nameOf = (slug: string) => books.find((b) => b.slug === slug)?.name ?? slug;
  // The story path, for a reader who has started it: its first chapter not yet read.
  const { data: story } = useLoad(place ? "story-next" : null, () =>
    fetchStory().then((s) => {
      const progress = readProgress();
      return flattenStory(s).find((x) => !progress.has(`${x.slug}/${x.chapter}`)) ?? null;
    }),
  );
  const storyDiffers = story && place && (story.slug !== place.slug || story.chapter !== place.chapter);

  return (
    <>
      <PageHead
        door="Bible"
        doorHref="/study"
        title="The Study Bible"
        line="The Berean Standard Bible, with notes on every chapter."
        plate="book"
        className="bf-head"
      >
        <div className="bf-find">
          <GoToPassage />
        </div>
        {place && (
          <p className="bf-resume">
            <Link href={chapterHref(place.slug, place.chapter)} className="home-btn">
              Pick up where you left off: {nameOf(place.slug)} {place.chapter}
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
            </Link>
            {story && storyDiffers && (
              <Link href={`${chapterHref(story.slug, story.chapter)}?path=story`} className="bf-resume__story">
                Or the story at {nameOf(story.slug)} {story.chapter}
              </Link>
            )}
          </p>
        )}
        <p className="bf-new">
          <Sprout aria-hidden="true" size={20} strokeWidth={1.75} />
          <span>
            New to the Bible? Begin with <Link href="/study/bible/john">the Gospel of John</Link>.
          </span>
        </p>
      </PageHead>

      <section id="books" className="home-sec home-sec--dark bf-books" aria-labelledby="bf-books-title">
        <div className="home-wrap">
          <SectionHead dark icon={Library} label="The 66 books" title="Pick a book." id="bf-books-title" />
          <BookCase books={books} />
        </div>
      </section>

      <section className="home-sec home-sec--warm" aria-labelledby="bf-ways-title">
        <div className="home-wrap">
          <SectionHead label="Other ways in" title="Study it another way." id="bf-ways-title" />
          <ul className="lw-tiles">
            {WAYS.map((t) => (
              <li key={t.href}>
                <IconTile {...t} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
