/**
 * Home: the front door, drawn as a gallery.
 *
 * The first screen is Plate I (the road), James's headline, the one sentence
 * that says what the site is for, and Find (one field: a passage or a
 * question), with tonight's family devotion under it. On a phone the plate
 * runs edge to edge above the headline. Then the ten doors as picture
 * cards, and the things a visitor can touch: the 66 books on one shelf, a
 * hard question asked straight, tonight at the table, and two thousand
 * years of church history on one line. Then the latest writing and the
 * books, and the ways to find James, with Find Help beside them. No
 * photograph of James here (his standing note); /about has it.
 *
 * Everything in the first screen is committed data (positioning.ts, the
 * Road plate), so the page paints without waiting on the API. The pictures
 * below it come from one lazy module (components/art/plates.tsx) into frames
 * that already hold their size, and each interactive piece is its own lazy
 * chunk (React.lazy) in a box that holds its height (home.css), so nothing
 * moves while they arrive and the entry script carries none of them.
 *
 * The hero's markup and classes (index.css, .home-hero*) are mirrored by the
 * static hero scripts/prerender-heads.mjs writes into "/", so the first paint
 * is the real hero and React's mount moves nothing.
 */
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, Globe, LifeBuoy, Mail, Mic, Smartphone, UserRound } from "lucide-react";

import Layout from "@/components/Layout";
import FollowRow from "@/components/FollowRow";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SEOMeta, getOrganizationSchema, getWebSiteSchema } from "@/components/SEOMeta";
import RoadPlate from "@/components/art/RoadPlate";
import PlateFrame from "@/components/art/PlateFrame";
import Plate, { type PlateName } from "@/components/art/Plate";
import DoorCard from "@/components/art/DoorCard";
import { useNear } from "@/components/art/useNear";
import { BOOK_SHELF } from "@/lib/bookShelf";
import { liveChannels } from "@/lib/channels";
import { HOME_HEADLINE, HOME_LINE, HOME_WHO, HOME_LINKED_HREF, HOME_LINKED_WORD, META_DESCRIPTION } from "@/lib/positioning";
import { START_WITH, isPublicEssay, overrideMeta, shelfEntry } from "@/lib/shelf";
import { followHash } from "@/lib/followHash";
import HomeFind from "./home/HomeFind";
import { ROAD_CHIPS } from "./home/roadChips";
import HomeLatest from "./home/HomeLatest";
import "./home/home.css";

/*
 * The tonight line (pages/home/HomeTonight) reads the family year map with
 * its titles, the Advent calendar, and this device's progress for Continue:
 * about 45 kB that every route's entry script would otherwise carry. It loads
 * on its own, starting as this module runs on "/", into a slot one line tall
 * (index.css, .home-tonight--slot) at the foot of the hero's text, so nothing
 * moves when it arrives.
 */
type TonightModule = typeof import("./home/HomeTonight");
let tonightModule: TonightModule | null = null;
let tonightLoading: Promise<TonightModule> | null = null;
function loadTonight(): Promise<TonightModule> {
  tonightLoading ??= import("./home/HomeTonight").then(
    (m) => (tonightModule = m),
    (e) => {
      tonightLoading = null;
      throw e;
    },
  );
  return tonightLoading;
}
if (typeof window !== "undefined" && window.location.pathname === "/") loadTonight().catch(() => {});

function Tonight() {
  const [loaded, setLoaded] = useState(tonightModule);
  useEffect(() => {
    if (loaded) return;
    let live = true;
    loadTonight().then(
      (m) => live && setLoaded(m),
      () => {},
    );
    return () => {
      live = false;
    };
  }, [loaded]);
  if (!loaded) return <div className="home-tonight home-tonight--slot" aria-hidden="true" />;
  const HomeTonight = loaded.default;
  return <HomeTonight />;
}

/* The things to touch, each its own chunk. */
const BibleShelf = lazy(() => import("./home/BibleShelf"));
const QuestionPicker = lazy(() => import("./home/QuestionPicker"));
const TonightTable = lazy(() => import("./home/TonightTable"));
const HistoryStrip = lazy(() => import("./home/HistoryStrip"));

/** A box that holds the piece's height (home.css) until the piece arrives. */
function Piece({ name, children }: { name: string; children: ReactNode }) {
  // Loaded as it nears the screen, so a first visit spends its first seconds on the first screen.
  const [ref, near] = useNear<HTMLDivElement>();
  return (
    <div ref={ref} className={`home-piece home-piece--${name}`}>
      {near && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
}

interface Door {
  title: string;
  href: string;
  plate: PlateName;
  note?: string;
}

/** The first five doors: the large one, then four beside it. */
const DOORS: Door[] = [
  { title: "Read the Study Bible", href: "/study/bible", plate: "book", note: "Notes on every chapter" },
  { title: "Church history", href: "/theology/history", plate: "basilica", note: "From Pentecost to today" },
  { title: "Hard questions", href: "/topics", plate: "lantern", note: "Straight answers" },
  { title: "Family", href: "/family", plate: "house", note: "Tonight's devotion" },
  { title: "Start here", href: "/start", plate: "tree", note: "New, or coming back" },
];

/** The other five, smaller. */
const MORE_DOORS: Door[] = [
  { title: "Context and creeds", href: "/study", plate: "jar" },
  { title: "Tools", href: "/tools", plate: "compass" },
  { title: "Essays", href: "/writing", plate: "quill" },
  { title: "Books", href: "/books", plate: "books" },
  { title: "Find James", href: "/connect", plate: "letter" },
];

/** "Start where you are": the five roads of /start as one quiet row of chips (home/roadChips.ts). */
function RoadChips() {
  return (
    <nav className="home-roads" aria-labelledby="home-roads-label">
      <p id="home-roads-label" className="home-roads__label">
        Start where you are
      </p>
      <ul className="home-roads__list">
        {ROAD_CHIPS.map((r) => (
          <li key={r.id}>
            <Link href={`/start#${r.id}`} className="home-road" onClick={() => followHash(`/start#${r.id}`)}>
              {r.chip}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** The first public essay the shelf says to start with, for the desk. */
function leadEssay() {
  const slug = START_WITH.find((s) => isPublicEssay(s));
  if (!slug) return null;
  const rewrite = overrideMeta(slug);
  return { slug, title: rewrite?.title ?? shelfEntry(slug)?.title ?? slug };
}

const two = (n: number) => String(n).padStart(2, "0");

function SectionHead({ eyebrow, title, link, id }: { eyebrow: string; title: string; link?: { href: string; label: string }; id: string }) {
  return (
    <div className="home-head">
      <div>
        <p className="home-eyebrow">{eyebrow}</p>
        <h2 id={id} className="home-h2">
          {title}
        </h2>
      </div>
      {link && (
        <Link href={link.href} className="home-tlink">
          {link.label} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
        </Link>
      )}
    </div>
  );
}

const WAYS = [
  { href: "/contact", label: "Write to James", Icon: Mail },
  { href: "/speaking", label: "Speaking", Icon: Mic },
  { href: "/about", label: "About James", Icon: UserRound },
];

/** ENDS, as lib/channels.ts names and describes it. Absent when the channel is not live. */
const ENDS = liveChannels().find((c) => c.id === "ends");

export default function Home() {
  const lead = leadEssay();
  // "post-Christian" in the headline opens the page that explains it.
  // A dash keeps to the word before it, so no line of the headline opens on one.
  const [headBefore, headAfter = ""] = HOME_HEADLINE.replace(/ \u2014/g, "\u00A0\u2014").split(HOME_LINKED_WORD);

  return (
    <Layout>
      <SEOMeta
        title="Study the Bible, Church History, Family Devotions | LiveWell"
        description={META_DESCRIPTION}
        url="https://www.livewellbyjamesbell.co"
        type="website"
        structuredData={[getOrganizationSchema(), getWebSiteSchema()]}
      />

      {/* THE HEADLINE, FIND, AND PLATE I. Mirrored by the static hero in prerender-heads.mjs. */}
      <section className="home-hero">
        <div className="home-hero__inner">
          <div className="home-hero__words">
            <h1 className="home-hero__title">
              {headBefore}
              <Link href={HOME_LINKED_HREF}>{HOME_LINKED_WORD}</Link>
              {headAfter}
            </h1>
            {/* What the site is for, in James's own sentence (the end of HOME_WHY). */}
            <p className="home-hero__line">{HOME_LINE}</p>
            <HomeFind />
            {/* Tonight's devotion, Continue, and the Advent line; empty when there is nothing to show. */}
            <Tonight />
            {/* The five roads of /start, one chip each. */}
            <RoadChips />
          </div>
          <PlateFrame className="home-hero__art" ratio={null} number="Plate I" title="The road">
            <RoadPlate />
          </PlateFrame>
        </div>
      </section>

      {/* THE TEN DOORS */}
      <section className="home-sec home-sec--doors" aria-labelledby="home-doors-title">
        <div className="home-wrap">
          <SectionHead id="home-doors-title" eyebrow="Ten doors" title="Where to begin." link={{ href: "/explore", label: "See everything on LiveWell" }} />
          <ul className="home-doors">
            {DOORS.map((d, i) => (
              <li key={d.href} className={i === 0 ? "home-doors__lead" : undefined}>
                <DoorCard {...d} number={two(i + 1)} variant={i === 0 ? "lead" : undefined} />
              </li>
            ))}
          </ul>
          <ul className="home-doors-more">
            {MORE_DOORS.map((d, i) => (
              <li key={d.href}>
                <DoorCard {...d} number={two(i + DOORS.length + 1)} variant="row" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THE STUDY BIBLE: all 66 books on one shelf. */}
      <section className="home-sec home-sec--dark" aria-labelledby="home-shelf-title">
        <div className="home-wrap">
          <SectionHead
            id="home-shelf-title"
            eyebrow="The Study Bible"
            title="The whole Bible on one shelf."
            link={{ href: "/study/bible", label: "Open the Study Bible" }}
          />
          <Piece name="shelf">
            <BibleShelf />
          </Piece>
        </div>
      </section>

      {/* A HARD QUESTION, ASKED STRAIGHT */}
      <section className="home-sec" aria-labelledby="home-ask-title">
        <div className="home-wrap home-two">
          <PlateFrame className="home-two__art">
            <Plate name="tomb" />
          </PlateFrame>
          <div>
            <p className="home-eyebrow">Hard questions</p>
            <h2 id="home-ask-title" className="home-h2">
              Ask it straight.
            </h2>
            <Piece name="ask">
              <QuestionPicker />
            </Piece>
          </div>
        </div>
      </section>

      {/* TONIGHT AT THE TABLE */}
      <section className="home-sec home-sec--warm" aria-labelledby="home-table-title">
        <div className="home-wrap home-two home-two--flip">
          <div>
            <p className="home-eyebrow">Tonight at the table</p>
            <Piece name="table">
              <TonightTable />
            </Piece>
          </div>
          <PlateFrame className="home-two__art">
            <Plate name="table" />
          </PlateFrame>
        </div>
      </section>

      {/* CHURCH HISTORY: two thousand years on one line. */}
      <section className="home-sec home-sec--dark" aria-labelledby="home-history-title">
        <div className="home-wrap">
          <SectionHead
            id="home-history-title"
            eyebrow="Church history"
            title="Two thousand years on one line."
            link={{ href: "/theology/history", label: "The whole course" }}
          />
          <Piece name="history">
            <HistoryStrip />
          </Piece>
        </div>
      </section>

      {/* THE DESK: one essay to start with, the latest with dates, and the books. */}
      <section className="home-sec" aria-labelledby="home-desk-title">
        <div className="home-wrap">
          <SectionHead
            id="home-desk-title"
            eyebrow="Essays and books"
            title="From the desk."
            link={{ href: "/writing", label: "All the essays" }}
          />
          <div className="home-desk">
            {lead && (
              <Link href={`/writing/${lead.slug}`} className="home-desk__lead">
                <PlateFrame ratio="16 / 9">
                  <Plate name="arch" decorative />
                </PlateFrame>
                <span className="home-eyebrow home-desk__kind">Start with this one</span>
                <span className="home-desk__title">{lead.title}</span>
              </Link>
            )}
            <div>
              <h3 className="eyebrow home-h3">Latest writing</h3>
              <HomeLatest />
            </div>
          </div>
          <ul className="home-books">
            {BOOK_SHELF.map((b) => (
              <li key={b.slug}>
                <Link href={b.href} className="home-book">
                  <img src={b.thumb} alt={b.title} width={150} height={225} loading="lazy" decoding="async" className="home-book__cover" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FIND JAMES, and help in a hard season. */}
      <section className="home-sec home-sec--warm" aria-labelledby="home-james-title">
        <div className="home-wrap home-james">
          <PlateFrame className="home-james__art">
            <Plate name="letter" />
          </PlateFrame>
          <div>
            <p className="home-eyebrow">Find James</p>
            <h2 id="home-james-title" className="home-h2">
              Where he writes. How to reach him.
            </h2>
            {/* Who is writing, in James's own confirmed words (positioning.ts). */}
            <p className="home-who">{HOME_WHO}</p>
            <ul className="home-ways">
              {WAYS.map(({ href, label, Icon }) => (
                <li key={href}>
                  <Link href={href} className="home-way">
                    <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Where else James writes: links only (lib/channels.ts). */}
            <FollowRow style={{ marginTop: "var(--s-2)" }} />
            {/* The one real signup (the footer's form), where a reader has just met James. */}
            <div className="home-signup">
              <p className="home-signup__label">Essays by email (Substack)</p>
              <NewsletterSignup variant="minimal" source="home-find-james" />
            </div>
            <p className="home-helpbar">
              <LifeBuoy aria-hidden="true" size={22} strokeWidth={1.5} />
              <span>
                In a hard season?{" "}
                <Link href="/help" className="home-helpbar__link">
                  Find help for what you are facing
                </Link>
              </span>
            </p>
            {/* The mission work, linked home page only: LiveWell sends no one to give (lib/channels.ts). */}
            {ENDS && (
              <p className="home-appline home-endsline">
                <Globe aria-hidden="true" size={20} strokeWidth={1.75} />
                <span>
                  <a href={ENDS.url} target="_blank" rel="noopener noreferrer" className="home-helpbar__link">
                    {ENDS.label}
                  </a>
                  . {ENDS.blurb}
                </span>
              </p>
            )}
            {/* One quiet line: LiveWell from an icon (/app). */}
            <p className="home-appline">
              <Smartphone aria-hidden="true" size={20} strokeWidth={1.75} />
              <span>
                Reading on a phone?{" "}
                <Link href="/app" className="home-helpbar__link">
                  Put LiveWell on your phone or computer
                </Link>
              </span>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
