/**
 * /study: the Bible door, "Study the Bible", and the model every other door
 * copies (components/art/README.md, "How a door's page is built").
 *
 * 1. The page top: PageHead at the door size, with the open-book plate.
 * 2. The one thing to do first: open the Bible, on Home's shelf of 66 books
 *    (pages/home/BibleShelf, its own lazy chunk, in a box that holds its
 *    height so nothing moves while it arrives).
 * 3. The rooms, six picture cards, in the order of the map
 *    (docs/work/elite/PROJECT-PROMPT.md). Every room is a page that exists.
 *    "How to study the Bible" has no page of its own yet; its card opens the
 *    Study Bible's guides to reading it and says so in its name. "Reading
 *    plans" has no one page either; the card opens the one Bible plan there
 *    is, the year through the whole story.
 * 4. Further in: six tiles, one step past the rooms (doctrine, church
 *    history, the creeds, the glossary, group guides, the tools), then one
 *    line for someone new (John, and /start).
 */
import { lazy, Suspense } from "react";
import { Link } from "wouter";
import { BookMarked, BookOpenText, Compass, Landmark, Library, ScrollText, Sprout, Users, Wrench } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import DoorInside, { doorRooms } from "@/components/art/DoorInside";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import DoorCard from "@/components/art/DoorCard";
import IconTile from "@/components/art/IconTile";
import { useNear } from "@/components/art/useNear";
import type { PlateName } from "@/components/art/Plate";
import "./home/home.css";
import NarratedFilm from "@/components/NarratedFilm";

const BibleShelf = lazy(() => import("./home/BibleShelf"));

/** The shelf's box holds its height (home.css, .home-piece--shelf) until the shelf arrives. */
function Shelf() {
  const [ref, near] = useNear<HTMLDivElement>();
  return (
    <div ref={ref} className="home-piece home-piece--shelf">
      {near && (
        <Suspense fallback={null}>
          <BibleShelf />
        </Suspense>
      )}
    </div>
  );
}

/** Each room's picture and the short note on its card, by its id in the site catalogue. */
const ROOM_ART: Record<string, { note: string; plate: PlateName }> = {
  "bible.films": { note: "Narrated, a few minutes each", plate: "lantern" },
  "bible.read": { note: "Notes on every chapter", plate: "book" },
  "bible.search": { note: "Any word or phrase", plate: "lens" },
  "bible.how-to-study": { note: "Seven steps, in order", plate: "compass" },
  "bible.story": { note: "One story in eleven parts", plate: "tree" },
  "bible.background": { note: "The world it was written in", plate: "jar" },
  "bible.plans": { note: "Every plan, by length", plate: "sundial" },
};

/** The rooms of the Bible door, read from the site catalogue so the page, the header and the footer agree. */
const ROOMS: { title: string; note: string; href: string; plate: PlateName }[] = doorRooms("bible").map((r) => ({
  title: r.name,
  note: ROOM_ART[r.id]?.note ?? r.line,
  href: r.href,
  plate: ROOM_ART[r.id]?.plate ?? "book",
}));

/** One step further in. */
const FURTHER = [
  { name: "Doctrine studies", line: "What the Bible teaches, topic by topic", href: "/study/bible/doctrines", icon: BookMarked },
  { name: "Church history", line: "From Pentecost to today", href: "/theology/history", icon: Landmark },
  { name: "Creeds and confessions", line: "What the church has confessed", href: "/resources/creeds", icon: ScrollText },
  { name: "Glossary", line: "Hard words, plainly defined", href: "/theology/glossary", icon: BookOpenText },
  { name: "Group study guides", line: "For a class or a small group", href: "/studyguides", icon: Users },
  { name: "Study tools", line: "Every tool, in one place", href: "/tools", icon: Wrench },
];

export default function Study() {
  return (
    <Layout>
      <SEOMeta
        title="Study the Bible and Church History"
        description="Study the whole Bible with notes on every chapter, then the church's history, its creeds, and the world the Bible was written in. Free."
        url="https://www.livewellbyjamesbell.co/study"
      />

      <PageHead
        size="door"
        door="Bible"
        title="Study the Bible"
        line="Read it, search it, and learn the world it was written in."
        plate="book"
        action={
          <Link href="/study/bible" className="btn">
            Open the Study Bible
          </Link>
        }
      />

      <NarratedFilm page="/study" />

      {/* FIRST: open the Bible, on the shelf of 66 books. */}
      <section className="home-sec home-sec--dark study-shelf" aria-labelledby="study-shelf-title">
        <div className="home-wrap">
          <SectionHead dark icon={Library} label="The 66 books" title="Pick a book to open." id="study-shelf-title" />
          <Shelf />
        </div>
      </section>

      {/* THE ROOMS */}
      <section className="home-sec" aria-labelledby="study-rooms-title">
        <div className="home-wrap">
          <SectionHead icon={Compass} label="Six ways in" title="Where to study." id="study-rooms-title" />
          <ul className="lw-rooms">
            {ROOMS.map((r) => (
              <li key={r.href}>
                <DoorCard {...r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EVERYTHING ELSE IN THE DOOR, from the catalogue. */}
      <DoorInside door="bible" warm />

      {/* FURTHER IN, and a line for someone new. */}
      <section className="home-sec" aria-labelledby="study-further-title">
        <div className="home-wrap">
          <SectionHead label="Further in" title="Go deeper." id="study-further-title" />
          <ul className="lw-tiles">
            {FURTHER.map((t) => (
              <li key={t.href}>
                <IconTile {...t} />
              </li>
            ))}
          </ul>
          <p className="lw-newline">
            <Sprout aria-hidden="true" size={22} strokeWidth={1.75} />
            <span>
              New to the Bible? Begin with <Link href="/study/bible/john">the Gospel of John</Link>, or{" "}
              <Link href="/start">start here</Link>.
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
}
