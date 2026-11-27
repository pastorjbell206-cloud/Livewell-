/**
 * /study: the Bible door, "Study the Bible", and the model every other door
 * copies (components/art/README.md, "How a door's page is built").
 *
 * The simpler page (2026-11-27): the page top and its one button, the film,
 * then four big cards for what most people come for (read, watch, learn how
 * to study, follow a plan), the shelf of 66 books, and one closed row, "See
 * everything in Bible", that holds every other room, every page inside the
 * rooms and the pages one step further in. Then the next step. Nothing was
 * taken off the page; the notes below are the page as it was built.
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
import { BookMarked, BookOpenText, Compass, Landmark, Library, ScrollText, Users, Wrench } from "lucide-react";

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
import NextStep from "@/components/art/NextStep";
import SeeAll from "@/components/art/SeeAll";

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
const ROOMS: { id: string; title: string; note: string; href: string; plate: PlateName }[] = doorRooms("bible").map((r) => ({
  id: r.id,
  title: r.name,
  note: ROOM_ART[r.id]?.note ?? r.line,
  href: r.href,
  plate: ROOM_ART[r.id]?.plate ?? "book",
}));

/** The four cards the page leads with, by catalogue id: what most people come to the Bible door for. */
const PICKS = ["bible.read", "bible.films", "bible.how-to-study", "bible.plans"];
const LEAD = PICKS.map((id) => ROOMS.find((r) => r.id === id)).filter((r): r is (typeof ROOMS)[number] => !!r);
const REST = ROOMS.filter((r) => !PICKS.includes(r.id));

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

      {/* WHAT MOST PEOPLE COME FOR: four big cards. */}
      <section className="home-sec home-sec--warm" aria-labelledby="study-rooms-title">
        <div className="home-wrap">
          <SectionHead icon={Compass} label="Where to start" title="What would you like to do?" id="study-rooms-title" />
          <ul className="lw-picks">
            {LEAD.map(({ id, ...r }) => (
              <li key={id}>
                <DoorCard {...r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Open the Bible, on the shelf of 66 books. */}
      <section className="home-sec home-sec--dark study-shelf" aria-labelledby="study-shelf-title">
        <div className="home-wrap">
          <SectionHead dark icon={Library} label="The 66 books" title="Pick a book to open." id="study-shelf-title" />
          <Shelf />
        </div>
      </section>

      {/* EVERYTHING ELSE IN THE DOOR, closed until opened. */}
      <section className="home-sec" aria-label="Everything in Bible">
        <div className="home-wrap">
          <SeeAll label="See everything in Bible" line="Every room, and every page inside them">
            <ul className="lw-rooms">
              {REST.map(({ id, ...r }) => (
                <li key={id}>
                  <DoorCard {...r} />
                </li>
              ))}
            </ul>
            <DoorInside door="bible" bare />
            <div>
              <h3 className="eyebrow lw-inside__room">Further in</h3>
              <ul className="lw-tiles">
                {FURTHER.map((t) => (
                  <li key={t.href}>
                    <IconTile {...t} />
                  </li>
                ))}
              </ul>
            </div>
          </SeeAll>
        </div>
      </section>

      <NextStep
        title="New to the Bible? Begin with John."
        line="The Gospel of John, a chapter at a time, with notes beside the text."
        action={
          <Link href="/study/bible/john" className="btn">
            Open the Gospel of John
          </Link>
        }
        second={
          <Link href="/start" className="btn btn--quiet">
            Start here
          </Link>
        }
      />
    </Layout>
  );
}
