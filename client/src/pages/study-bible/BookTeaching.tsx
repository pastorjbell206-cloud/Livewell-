/**
 * A book's teaching introduction (intro.json `teaching`; Mark is the first):
 * each headed part in plain words as a row that opens in place (the first
 * one open), then the hard
 * passages, the key words, a timeline a reader can narrow, a map (its own
 * lazy chunk, its space held), and where to go deeper on the site.
 *
 * Books without `teaching` never render this; their page is unchanged.
 */
import { Suspense, lazy, useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  BookOpenText,
  ChevronDown,
  Compass,
  KeyRound,
  Landmark,
  Library,
  ListOrdered,
  MessageCircleQuestion,
  ScrollText,
  Sprout,
  Users,
} from "lucide-react";

import { chapterHref, type BibleBook } from "@/lib/bible";
import { bookMaps, type BookTeaching as Teaching } from "@/lib/bible-notes";
import { useNear } from "@/components/art/useNear";
import IconTile from "@/components/art/IconTile";
import { Band, H2, Prose, kicker } from "./shared";

const BookMap = lazy(() => import("./BookMap"));

const KINDS = [
  ["all", "Everything"],
  ["story", "The story Mark tells"],
  ["world", "The world around it"],
  ["book", "How the book came to be"],
] as const;

function MapSlot({
  slug,
  bookName,
  places,
}: {
  slug: string;
  bookName: string;
  places: Teaching["map"];
}) {
  const [ref, near] = useNear<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="bk-map-hold"
      data-frames={bookMaps(places)
        .map(m => m.frame)
        .join(" ")}
    >
      {near && (
        <Suspense fallback={null}>
          <BookMap slug={slug} bookName={bookName} places={places} />
        </Suspense>
      )}
    </div>
  );
}

function Timeline({
  items,
  bookName,
}: {
  items: Teaching["timeline"];
  bookName: string;
}) {
  const [kind, setKind] = useState<(typeof KINDS)[number][0]>("all");
  const shown = kind === "all" ? items : items.filter(t => t.kind === kind);
  return (
    <>
      <div
        className="bk-tl__chips"
        role="group"
        aria-label="Show on the timeline"
      >
        {KINDS.map(([k, label]) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
          >
            {k === "story" ? `The story ${bookName} tells` : label}
          </button>
        ))}
      </div>
      <ol className="bk-tl">
        {shown.map(t => (
          <li key={t.when + t.what} data-kind={t.kind}>
            <span className="bk-tl__when">{t.when}</span>
            <span className="bk-tl__what">{t.what}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

/** Icons a book's own "Go deeper" entries may name (intro.json `teaching.deeper`). */
const DEEPER_ICONS = {
  people: Users,
  world: Landmark,
  scroll: ScrollText,
  book: Library,
} as const;

/** "Go deeper": pages the site already has, for a Gospel. */
const GOSPELS = new Set(["matthew", "mark", "luke", "john"]);
const DEEPER = [
  {
    href: "/study/bible/guides/reading-gospels",
    name: "How to read the Gospels",
    line: "What kind of books they are, and the four portraits",
    icon: Library,
  },
  {
    href: "/study/bible/guides/reading-parables",
    name: "How to read the parables",
    line: "Jesus' stories, and what they do to a listener",
    icon: Sprout,
  },
  {
    href: "/study/bible/guides/jewish-groups",
    name: "Pharisees, scribes and Sadducees",
    line: "The groups Jesus argued with",
    icon: Users,
  },
  {
    href: "/study/bible/guides/herods-and-governors",
    name: "The Herods and the governors",
    line: "Who ruled the land in Jesus' day",
    icon: Landmark,
  },
  {
    href: "/study/bible/guides/how-we-got-the-new-testament",
    name: "How we got the New Testament",
    line: "Manuscripts, copies and the endings",
    icon: ScrollText,
  },
  {
    href: "/study/how-to-study",
    name: "How to study the Bible",
    line: "Seven steps, on any chapter",
    icon: Compass,
  },
];

export default function BookTeaching({
  book,
  teaching,
}: {
  book: BibleBook;
  teaching: Teaching;
}) {
  const name = book.name;

  // Each part of the guide is one closed row with its title, the first one
  // open (the simpler pages, 2026-11-27): the whole guide is on the page, in
  // the HTML, and a book's page reads in a few screens instead of forty.
  // A link to a part (#who, #map) opens its row first (lib/openFold).
  const folds: { id: string; h: string; body: ReactNode }[] = [
    ...teaching.parts.map(p => ({
      id: p.id,
      h: p.h,
      body: (
        <>
          {p.id === "shape" && (
            <p className="bk-learn__see">
              <ListOrdered aria-hidden="true" size={18} strokeWidth={1.75} />
              <a href="#glance">
                See the outline drawn as a band, and tap a part
              </a>
            </p>
          )}
          <Prose text={p.body} />
        </>
      ),
    })),
    {
      id: "hard-passages",
      h: "The hard passages",
      body: (
        <>
          <p className="bk-learn__lede">
            Places where readers often stop and ask. Each one opens the chapter,
            where its notes face the question.
          </p>
          <ul className="bk-hard">
            {teaching.hard.map(h => (
              <li key={h.ref}>
                <MessageCircleQuestion
                  aria-hidden="true"
                  size={20}
                  strokeWidth={1.75}
                />
                <Link href={chapterHref(book.slug, h.ch, h.v)}>
                  {name} {h.ref}
                </Link>
                <span>{h.line}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: "key-words",
      h: "Key words",
      body: (
        <ul className="bk-words">
          {teaching.words.map(w => (
            <li key={w.word}>
              <KeyRound aria-hidden="true" size={18} strokeWidth={1.75} />
              <h4>{w.word}</h4>
              <p>{w.line}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "timeline",
      h: "When it happened",
      body: <Timeline items={teaching.timeline} bookName={name} />,
    },
    {
      id: "map",
      h: "Where it happened",
      body: (
        <>
          {teaching.mapNote && (
            <p className="bk-learn__lede">{teaching.mapNote}</p>
          )}
          <MapSlot slug={book.slug} bookName={name} places={teaching.map} />
        </>
      ),
    },
  ];

  return (
    <div className="bk-learn">
      <Band id="learn">
        <div style={{ ...kicker, marginBottom: "8px" }}>Learn {name}</div>
        <H2>{name}, taught from the start</H2>
        <p className="bk-learn__lede">
          A plain guide to the whole book: who wrote it, when, how it is built,
          what it means, and its hard places. Tap a part to open it.
        </p>
        <ol
          className="lw-folds"
          aria-label={`Contents of the guide to ${name}`}
        >
          {folds.map((f, i) => (
            <li key={f.id}>
              <details id={f.id} className="lw-fold" open={i === 0}>
                <summary>
                  <span className="lw-fold__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="lw-fold__h">{f.h}</h3>
                  <ChevronDown
                    aria-hidden="true"
                    size={22}
                    strokeWidth={1.75}
                  />
                </summary>
                <div className="lw-fold__body">{f.body}</div>
              </details>
            </li>
          ))}
        </ol>
      </Band>

      <Band id="deeper" tone="warm">
        <H2>
          <Compass
            aria-hidden="true"
            size={24}
            strokeWidth={1.75}
            className="bk-h2-icon"
          />{" "}
          Go deeper
        </H2>
        <ul className="lw-tiles">
          <li>
            <IconTile
              href={`/study/bible/${book.slug}/1`}
              icon={BookOpenText}
              name={`Read ${name} with notes`}
              line="Start at chapter 1, with notes beside the text"
            />
          </li>
          {[
            // Books other than the Gospels keep only "How to study the Bible"
            // from the shared list, then their own pages.
            ...(GOSPELS.has(book.slug) ? DEEPER : DEEPER.slice(-1)),
            ...(teaching.deeper ?? []).map(d => ({
              ...d,
              icon: DEEPER_ICONS[d.icon ?? "book"],
            })),
          ].map(d => (
            <li key={d.href}>
              <IconTile
                href={d.href}
                icon={d.icon}
                name={d.name}
                line={d.line}
              />
            </li>
          ))}
        </ul>
      </Band>
    </div>
  );
}
