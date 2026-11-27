/**
 * Home: the front door, drawn as a gallery.
 *
 * The simpler page (2026-11-27): the first screen says what LiveWell is and
 * gives one way to begin, Start here (and the whole site behind a quiet
 * link), in place of the seven chips of /start. Then four big cards, the 66
 * books, the essays and books, James, and the next step. The question
 * picker, the second tonight band and the history strip live on their own
 * doors (/topics, /family, /theology/history), where they always were; their
 * pieces are kept in pages/home/. The notes below are the page as built.
 *
 * The first screen is Plate I (the road), James's headline, the one sentence
 * that says what the site is for, and Find (one field: a passage or a
 * question), with tonight's family devotion under it. On a phone the plate
 * runs edge to edge above the headline. Then ten ways in as picture
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
import NextStep from "@/components/art/NextStep";
import { useNear } from "@/components/art/useNear";
import { BOOK_SHELF } from "@/lib/bookShelf";
import { liveChannels } from "@/lib/channels";
import { HOME_HEADLINE, HOME_LINE, HOME_WHO, HOME_LINKED_HREF, HOME_LINKED_WORD, META_DESCRIPTION } from "@/lib/positioning";
import { START_WITH, isPublicEssay, overrideMeta, shelfEntry } from "@/lib/shelf";
import HomeFind from "./home/HomeFind";
import TonightSlot, { readShellLines } from "./home/TonightSlot";
import HomeLatest from "./home/HomeLatest";
import "./home/home.css";

/*
 * The tonight line (pages/home/HomeTonight) reads the family year map with
 * its titles, the Advent calendar, and this device's progress for Continue:
 * about 45 kB that every route's entry script would otherwise carry. It loads
 * on its own, starting as this module runs on "/", into a slot at the foot of
 * the hero's text (index.css, .home-tonight--slot) that holds the room the
 * line will take, so nothing moves when it arrives: the static shell writes
 * the line's words into its slot unseen, and this slot draws the same
 * (home/TonightSlot, read once here, before the app replaces the shell).
 */
const SHELL_LINES = typeof document === "undefined" ? undefined : readShellLines();
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
  if (!loaded) return <TonightSlot lines={SHELL_LINES} />;
  const HomeTonight = loaded.default;
  return <HomeTonight />;
}

/* The things to touch, each its own chunk. */
const BibleShelf = lazy(() => import("./home/BibleShelf"));

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

/**
 * Four ways in, as big quiet cards: what most first visits come for. Start
 * here is the hero's one button; every other door is in the header, and the
 * whole site is one link away ("See everything on LiveWell").
 */
const DOORS: Door[] = [
  { title: "Read the Study Bible", href: "/study/bible", plate: "book", note: "Notes on every chapter" },
  { title: "Hard questions", href: "/topics", plate: "lantern", note: "Straight answers" },
  { title: "Family", href: "/family", plate: "house", note: "Tonight's devotion" },
  { title: "Church history", href: "/theology/history", plate: "basilica", note: "From Pentecost to today" },
];

/**
 * The one way to begin, in the first screen: Start here (/start, where a
 * reader picks the one that sounds like them), and the whole site behind a
 * quiet link. scripts/prerender-heads.mjs writes the same markup into the
 * static hero.
 */
function StartHere() {
  return (
    <p className="home-start">
      <Link href="/start" className="btn">
        Start here
      </Link>
      <Link href="/explore" className="home-start__all">
        See everything on LiveWell
      </Link>
    </p>
  );
}

/** The first public essay the shelf says to start with, for the desk. */
function leadEssay() {
  const slug = START_WITH.find((s) => isPublicEssay(s));
  if (!slug) return null;
  const rewrite = overrideMeta(slug);
  return { slug, title: rewrite?.title ?? shelfEntry(slug)?.title ?? slug };
}

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
            {/* One way to begin. */}
            <StartHere />
          </div>
          <PlateFrame className="home-hero__art" ratio={null} number="Plate I" title="The road">
            <RoadPlate />
          </PlateFrame>
        </div>
      </section>

      {/* FOUR WAYS IN. Not called doors: the menu's seven doors are the site's doors. */}
      <section className="home-sec home-sec--doors" aria-labelledby="home-doors-title">
        <div className="home-wrap">
          <SectionHead id="home-doors-title" eyebrow="Four ways in" title="Where to begin." link={{ href: "/explore", label: "See everything on LiveWell" }} />
          <ul className="lw-picks">
            {DOORS.map((d) => (
              <li key={d.href}>
                <DoorCard {...d} />
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

      <NextStep
        tone="bone"
        title="Not sure where to begin?"
        line="Pick the one that sounds like you."
        action={
          <Link href="/start" className="btn">
            Start here
          </Link>
        }
        second={
          <Link href="/help" className="btn btn--quiet">
            Find Help
          </Link>
        }
      />
    </Layout>
  );
}
