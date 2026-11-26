/**
 * /preview/home: a PREVIEW of a reorganised LiveWell homepage, for James to
 * compare with the one that is live. James, 2026-11-26: "keep like the same
 * design and same kind of like images ... not radically change the site ...
 * do this as a preview to see if it would be any better"; then, of the first
 * draft: "It looks really blocky ... designed like one of the best websites
 * in the world."
 *
 * So this is the live homepage's own gallery (the engraved plates, the ink
 * frames, the pieces a reader can touch: the shelf of 66 books, the hard
 * question, the timeline) arranged around the platform brief
 * (docs/work/elite/livewell-platform-plan.md). Its one new instrument is the
 * atlas: the brief's eight disciplines as a contents page, one open at a
 * time, each made only of pages the site already has. Every name, line and
 * count is read from the site catalogue (lib/siteCatalog.ts), the essay
 * shelf, the book shelf or the Explorer's films. What the brief asks for that
 * does not exist yet (Academy courses) is named as planned and links nowhere.
 *
 * Held: noindex, in no menu, not in the sitemap or search index. The live
 * homepage and header are untouched. Deleting this file, pages/preview/ and
 * the route removes the preview entirely.
 */
import { lazy, Suspense, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, LifeBuoy } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import Plate, { type PlateName } from "@/components/art/Plate";
import PlateFrame from "@/components/art/PlateFrame";
import RoadPlate from "@/components/art/RoadPlate";
import { useNear } from "@/components/art/useNear";
import { entryById, type CatalogEntry } from "@/lib/siteCatalog";
import { ICONS, ICON_STROKE } from "@/lib/siteIcons";
import { BOOK_SHELF } from "@/lib/bookShelf";
import { followHash } from "@/lib/followHash";
import HomeFind from "./home/HomeFind";
import HomeLatest from "./home/HomeLatest";
import { ROAD_CHIPS } from "./home/roadChips";
import { HOME_LINE, HOME_WHY } from "@/lib/positioning";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { START_WITH, isPublicEssay, overrideMeta, shelfEntry } from "@/lib/shelf";
import "./home/home.css";
import "./preview/preview.css";

/** A catalogue entry by id; the preview fails loudly in tests if an id is gone. */
const E = (id: string): CatalogEntry => {
  const e = entryById(id);
  if (!e) throw new Error(`preview: no catalogue entry "${id}"`);
  return e;
};

/** The eight disciplines of the brief, each made of pages the site already has. */
export const DISCIPLINES: { id: string; name: string; line: string; plate: PlateName; doors: string[] }[] = [
  { id: "bible", name: "Bible", line: "Every book with notes beside the text, the films, the atlas, and the world the Bible was written in.", plate: "book", doors: ["bible.read", "bible.films", "bible.background", "bible.how-to-study"] },
  { id: "theology", name: "Theology", line: "What Christians confess, where faithful churches differ, and the words the church has used for both.", plate: "lectern", doors: ["questions.believe", "questions.differ", "questions.glossary", "history.creeds"] },
  { id: "history", name: "Church history", line: "Two thousand years told in order, with the people, the councils and the quarrels that shaped them.", plate: "basilica", doors: ["history.course", "history.people", "history.traditions", "history.timeline"] },
  { id: "apologetics", name: "Apologetics", line: "The case for the faith, weighed fairly, with the objections stated at full strength first.", plate: "lens", doors: ["questions.case", "questions.skeptics", "questions.claims"] },
  { id: "culture", name: "Christianity and culture", line: "How every age and place has read the Bible, and what the nation asks of the church.", plate: "arch", doors: ["history.reading", "questions.nation", "history.injustice"] },
  { id: "questions", name: "Difficult questions", line: "Suffering, hell, doubt and the silence of God, answered honestly and without hurry.", plate: "lantern", doors: ["questions.answers", "questions.more"] },
  { id: "living", name: "Christian living", line: "Marriage, work, money, grief and prayer, by subject and in practice.", plate: "house", doors: ["questions.life", "questions.wisdom", "questions.how-tos"] },
  { id: "church", name: "Church and leadership", line: "Group studies with leader guides, and booklets on elders, government and change.", plate: "table", doors: ["tools.groups", "tools.booklets", "tools.plans"] },
];

/** What is here, by the catalogue's own counts. */
const LEDGER = ["bible.read", "bible.films", "questions.answers", "questions.life", "tools.groups", "family.catechism"];

/** Courses the brief plans and the site does not have yet. Named, never linked. */
const PATHS_PLANNED = ["Old Testament survey", "New Testament survey", "Systematic theology", "Christian ethics", "Church leadership"];

const TOOLS = ["bible.search", "bible.word", "bible.cross-references", "bible.timeline", "bible.atlas", "questions.which-view"];

/** Why the site exists, in James's own words: HOME_WHY without its last sentence (the live hero's line). */
const WHY = HOME_WHY.replace(HOME_LINE, "").trim();
const [WHY_ASKS, ...WHY_ANSWERS] = WHY.split(/(?<=\?)\s+/);

/** The first public essay the shelf says to start with, as the live homepage chooses it. */
const LEAD = (() => {
  const slug = START_WITH.find((x) => isPublicEssay(x));
  return slug ? { slug, title: overrideMeta(slug)?.title ?? shelfEntry(slug)?.title ?? slug } : null;
})();

/** The page's sections, for the rail that shows where a reader is. */
const RAIL: [string, string][] = [
  ["explore", "Eight ways in"],
  ["films", "Films"],
  ["paths", "Learning paths"],
  ["ask", "Hard questions"],
  ["shelf", "The Study Bible and tools"],
  ["together", "Families and churches"],
  ["history", "Church history"],
  ["desk", "Essays and books"],
];

const count = (e: CatalogEntry) => (e.count ? `${e.count.n} ${e.count.of}` : "");

/* The things to touch, each its own chunk, as on the live homepage. */
const BibleShelf = lazy(() => import("./home/BibleShelf"));
const QuestionPicker = lazy(() => import("./home/QuestionPicker"));
const HistoryStrip = lazy(() => import("./home/HistoryStrip"));
const TonightTable = lazy(() => import("./home/TonightTable"));
const PreviewFilms = lazy(() => import("./preview/PreviewFilms"));
const PreviewPaths = lazy(() => import("./preview/PreviewPaths"));

/** A box that holds the piece's height until the piece arrives, loaded as it nears the screen. */
function Piece({ name, children }: { name: string; children: ReactNode }) {
  const [ref, near] = useNear<HTMLDivElement>();
  return (
    <div ref={ref} className={`home-piece home-piece--${name}`}>
      {near && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
}

function Head({ eyebrow, title, id, link, lede }: { eyebrow: string; title: string; id: string; link?: { href: string; label: string }; lede?: string }) {
  return (
    <div className="home-head pv-head">
      <div>
        <p className="home-eyebrow">{eyebrow}</p>
        <h2 id={id} className="home-h2">
          {title}
        </h2>
        {lede && <p className="pv-lede">{lede}</p>}
      </div>
      {link && (
        <Link href={link.href} className="home-tlink">
          {link.label} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
        </Link>
      )}
    </div>
  );
}

/** The proposed primary navigation: Explore opens the eight disciplines (two steps to any of them). */
function PreviewNav() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const away = (e: MouseEvent) => box.current && !box.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", key);
    document.addEventListener("mousedown", away);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("mousedown", away);
    };
  }, [open]);
  const items: [string, string][] = [
    ["Academy", "/tracks"],
    ["Bible tools", "/tools"],
    ["Families", "/family"],
    ["Churches", "/studyguides"],
    ["Publishing", "/writing"],
  ];
  return (
    <nav ref={box} aria-label="Proposed navigation (preview)" className="pv-nav">
      <div className="pv-nav__bar">
        <span className="pv-nav__tag">Proposed menu</span>
        <button type="button" className="pv-nav__item" aria-expanded={open} aria-controls="pv-nav-panel" onClick={() => setOpen((o) => !o)}>
          Explore <ChevronDown size={16} aria-hidden="true" className="pv-nav__chev" />
        </button>
        {items.map(([name, href]) => (
          <Link key={name} href={href} className="pv-nav__item">
            {name}
          </Link>
        ))}
      </div>
      <div id="pv-nav-panel" className="pv-nav__panel" hidden={!open}>
        <ul className="pv-nav__grid">
          {DISCIPLINES.map((d) => (
            <li key={d.id}>
              <a href={`#atlas-${d.id}`} className="pv-nav__d" onClick={() => setOpen(false)}>
                <span className="pv-nav__plate">
                  <Plate name={d.plate} decorative />
                </span>
                <span>
                  <span className="pv-nav__dn">{d.name}</span>
                  <span className="pv-nav__dl">{d.line}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** A quiet rail on wide screens: the page's sections, the one in view marked. */
function Rail() {
  const [at, setAt] = useState("");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setAt(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const [id] of RAIL) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="On this page" className="pv-rail">
      <ol>
        {RAIL.map(([id, name]) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={at === id ? "true" : undefined}>
              <span className="pv-rail__name">{name}</span>
              <span className="pv-rail__tick" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * The atlas: the eight disciplines as a contents page beside one open
 * spread. Tabs in the WAI-ARIA pattern: arrows, Home and End move between
 * them; a link to #atlas-<id> opens that one.
 */
function Atlas() {
  const [at, setAt] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const fromHash = () => {
      const i = DISCIPLINES.findIndex((d) => window.location.hash === `#atlas-${d.id}`);
      if (i >= 0) {
        setAt(i);
        document.getElementById("explore")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);
  const move = (e: KeyboardEvent) => {
    const last = DISCIPLINES.length - 1;
    const keys: Record<string, number> = { ArrowDown: at + 1, ArrowRight: at + 1, ArrowUp: at - 1, ArrowLeft: at - 1, Home: 0, End: last };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + DISCIPLINES.length) % DISCIPLINES.length;
    setAt(i);
    tabs.current[i]?.focus();
  };
  const d = DISCIPLINES[at];
  const pages = d.doors.map(E);
  return (
    <div className="pv-atlas">
      <div role="tablist" aria-label="Disciplines" aria-orientation="vertical" className="pv-atlas__toc" onKeyDown={move}>
        {DISCIPLINES.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`pv-tab-${x.id}`}
            aria-selected={i === at}
            aria-controls="pv-atlas-panel"
            tabIndex={i === at ? 0 : -1}
            className="pv-atlas__tab"
            onClick={() => setAt(i)}
          >
            <span className="pv-atlas__tn">{x.name}</span>
            <span className="pv-atlas__tc">{x.doors.length} rooms</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id="pv-atlas-panel" aria-labelledby={`pv-tab-${d.id}`} className="pv-atlas__spread" key={d.id}>
        <div className="pv-atlas__head">
          <PlateFrame ratio="4 / 3" className="pv-atlas__art">
            <Plate name={d.plate} decorative />
          </PlateFrame>
          <div>
            <h3 className="pv-atlas__name">{d.name}</h3>
            <p className="pv-atlas__line">{d.line}</p>
          </div>
        </div>
        <ul className="pv-atlas__rooms">
          {pages.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <li key={p.id}>
                <Link href={p.href} className="pv-room">
                  <Icon aria-hidden="true" size={20} strokeWidth={ICON_STROKE} className="pv-room__icon" />
                  <span className="pv-room__name">{p.name}</span>
                  <span className="pv-room__line">{p.line}</span>
                  {p.count && <span className="pv-room__count">{count(p)}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href={pages[0].href} className="home-btn pv-atlas__go">
          Begin with {pages[0].name}
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}

export default function PreviewHome() {
  return (
    <Layout>
      <SEOMeta
        title="Preview: A Reorganised LiveWell Homepage"
        description="A preview of a reorganised LiveWell homepage for review. It is not the live homepage."
        url="https://www.livewellbyjamesbell.co/preview/home"
        noindex
      />
      <p role="note" className="pv-note">
        This is a preview for review. The live homepage is unchanged. <Link href="/">See the live homepage</Link>.
      </p>
      <PreviewNav />

      {/* THE HERO: the brief's promise, Find, the roads, and Plate I. */}
      <section className="pv-hero" aria-labelledby="pv-title">
        <div className="pv-hero__top">
          <p className="home-eyebrow">Christian education for everyday life</p>
          <h1 id="pv-title" className="pv-hero__title">
            <span>Know what you believe.</span> <span>Understand why.</span> <span>Learn to live it.</span>
          </h1>
        </div>
        <div className="pv-hero__inner">
          <div className="pv-hero__words">
            <p className="pv-hero__line">
              The Bible, theology, church history and life's hardest questions, taught carefully and honestly by a pastor who came to faith from atheism. Free to read, with nothing to sign up for.
            </p>
            <HomeFind />
            <nav className="home-roads" aria-labelledby="pv-roads-label">
              <p id="pv-roads-label" className="home-roads__label">
                Start where you are
              </p>
              <ul className="home-roads__list">
                {ROAD_CHIPS.map((r) => (
                  <li key={r.id}>
                    <Link href={r.href} className="home-road" onClick={() => followHash(r.href)}>
                      {r.chip}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <PlateFrame className="pv-hero__art" ratio={null} number="Plate I" title="The road">
            <RoadPlate />
          </PlateFrame>
        </div>
        <ul className="pv-ledger" aria-label="What is on LiveWell">
          {LEDGER.map(E).map((e) => (
            <li key={e.id}>
              <Link href={e.href} className="pv-ledger__item">
                <span className="pv-ledger__n">{e.count?.n}</span>
                <span className="pv-ledger__of">{e.count?.of}</span>
                <span className="pv-ledger__where">{e.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* WHY: James's own words (lib/positioning.ts, HOME_WHY), set large. */}
      <section className="pv-why" aria-label="Why LiveWell exists">
        <blockquote className="pv-why__in">
          <p className="pv-why__asks">{WHY_ASKS}</p>
          <p className="pv-why__answers">{WHY_ANSWERS.join(" ")}</p>
          <footer>
            <Link href="/about">James Bell</Link>
          </footer>
        </blockquote>
      </section>

      <Rail />

      {/* THE ATLAS: eight disciplines, one open at a time. */}
      <section id="explore" className="home-sec home-sec--warm pv-sec" aria-labelledby="pv-explore">
        <div className="home-wrap">
          <Head
            id="pv-explore"
            eyebrow="Explore the faith"
            title="Eight ways in"
            lede="Choose a discipline to see what is in it. Every room below is a page you can open today."
            link={{ href: "/explore", label: "Everything on LiveWell" }}
          />
          <Atlas />
        </div>
      </section>

      {/* THE FILMS */}
      <section id="films" className="home-sec home-sec--dark pv-sec" aria-labelledby="pv-films">
        <div className="home-wrap">
          <Head id="pv-films" eyebrow="Bible films" title="Press play on the whole story" lede="Short narrated films in the site's engraved hand: the big story, the books, the big ideas and the questions children ask." />
          <Piece name="reel">
            <PreviewFilms />
          </Piece>
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section id="paths" className="home-sec pv-sec" aria-labelledby="pv-paths">
        <div className="home-wrap">
          <Head id="pv-paths" eyebrow="The Academy" title="More than one page at a time" lede="Paths of short sessions, walked in order, about ten minutes each. Choose one to see the whole road. Your place is kept on this device." link={{ href: "/tracks", label: "Every path" }} />
          <Piece name="paths">
            <PreviewPaths />
          </Piece>
          <p className="pv-also">
            Also in order: <Link href="/theology/history#course">church history in fourteen lessons</Link>, from the apostles to today.
          </p>
          <p className="pv-planned">
            <span className="pv-planned__label">Planned for the Academy</span>
            {PATHS_PLANNED.join(", ")}. Not available yet.
          </p>
        </div>
      </section>

      {/* A HARD QUESTION, ASKED STRAIGHT */}
      <section id="ask" className="home-sec home-sec--warm pv-sec" aria-labelledby="pv-ask">
        <div className="home-wrap home-two">
          <PlateFrame className="home-two__art">
            <Plate name="tomb" />
          </PlateFrame>
          <div>
            <p className="home-eyebrow">Difficult questions</p>
            <h2 id="pv-ask" className="home-h2">
              Asked honestly, answered without hurry.
            </h2>
            <Piece name="ask">
              <QuestionPicker />
            </Piece>
          </div>
        </div>
      </section>

      {/* THE STUDY BIBLE: all 66 books on one shelf. */}
      <section id="shelf" className="home-sec home-sec--dark pv-sec" aria-labelledby="pv-shelf">
        <div className="home-wrap">
          <Head id="pv-shelf" eyebrow="The Study Bible" title="The whole Bible on one shelf" link={{ href: "/study/bible", label: "Open the Study Bible" }} />
          <Piece name="shelf">
            <BibleShelf />
          </Piece>
          <div className="pv-bench">
            <div className="pv-bench__head">
              <h3 id="pv-tools" className="pv-bench__title">Then study the text yourself</h3>
              <Link href="/tools" className="home-tlink">
                Every tool <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </Link>
            </div>
            <ul className="pv-tools" aria-labelledby="pv-tools">
              {TOOLS.map(E).map((t) => {
                const Icon = ICONS[t.icon];
                return (
                  <li key={t.id}>
                    <Link href={t.href} className="pv-tool">
                      <span className="pv-tool__icon">
                        <Icon aria-hidden="true" size={22} strokeWidth={ICON_STROKE} />
                      </span>
                      <span className="pv-tool__name">{t.name}</span>
                      <span className="pv-tool__line">{t.line}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* TONIGHT AT THE TABLE, and the room: the live homepage's own piece, beside what a group needs. */}
      <section id="together" className="home-sec home-sec--warm pv-sec" aria-labelledby="home-table-title">
        <div className="home-wrap pv-together">
          <div>
            <p className="home-eyebrow">For families, tonight</p>
            <Piece name="table">
              <TonightTable />
            </Piece>
            <ul className="pv-inline">
              {["family.catechism", "family.plans", "bible.explorer"].map(E).map((p) => (
                <li key={p.id}>
                  <Link href={p.href}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="pv-pair__col">
            <PlateFrame ratio="16 / 9">
              <Plate name="table" decorative />
            </PlateFrame>
            <p className="home-eyebrow pv-pair__eyebrow">For pastors and groups</p>
            <h3 className="pv-pair__title">Something to open in the room</h3>
            <p className="pv-pair__line">Studies a group can do in a sitting, each with a leader's guide, and paths to walk together.</p>
            <ul className="pv-pair__list">
              {["tools.groups", "tools.booklets", "bible.tracks", "tools.downloads"].map(E).map((p) => (
                <li key={p.id}>
                  <Link href={p.href} className="pv-pair__link">
                    <span>{p.name}</span>
                    {p.count && <span className="pv-pair__count">{count(p)}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CHURCH HISTORY */}
      <section id="history" className="home-sec home-sec--dark pv-sec" aria-labelledby="pv-history">
        <div className="home-wrap">
          <Head id="pv-history" eyebrow="Church history" title="Two thousand years on one line" link={{ href: "/theology/history", label: "The whole course" }} />
          <Piece name="history">
            <HistoryStrip />
          </Piece>
        </div>
      </section>

      {/* PUBLISHING: the latest essays and the books. */}
      <section id="desk" className="home-sec pv-sec" aria-labelledby="pv-desk">
        <div className="home-wrap">
          <Head id="pv-desk" eyebrow="Publishing" title="Essays and books" link={{ href: "/writing", label: "All the essays" }} />
          <div className="home-desk">
            {LEAD && (
              <Link href={`/writing/${LEAD.slug}`} className="home-desk__lead">
                <PlateFrame ratio="16 / 9">
                  <Plate name="arch" decorative />
                </PlateFrame>
                <span className="home-eyebrow home-desk__kind">Start with this one</span>
                <span className="home-desk__title">{LEAD.title}</span>
              </Link>
            )}
            <div>
              <h3 className="home-h3">Latest writing</h3>
              <HomeLatest />
            </div>
          </div>
          <div className="pv-shelfrow">
            <h3 className="home-h3">Books</h3>
            <ul className="pv-books">
              {BOOK_SHELF.map((b) => (
                <li key={b.slug}>
                  <Link href={b.href} className="home-book pv-book">
                    <img src={b.thumb} alt="" width={150} height={225} loading="lazy" decoding="async" className="home-book__cover" />
                    <span className="pv-book__title">{b.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ABOUT, AND STAYING IN TOUCH */}
      <section className="home-sec home-sec--dark pv-sec" aria-labelledby="pv-about">
        <div className="home-wrap pv-close">
          <PlateFrame className="pv-close__art">
            <Plate name="letter" />
          </PlateFrame>
          <div>
            <p className="home-eyebrow">About LiveWell</p>
            <h2 id="pv-about" className="home-h2">
              Free to read, and it stays free.
            </h2>
            <p className="pv-close__line">
              LiveWell is the teaching of James Bell, a pastor who came to faith from atheism, written for the skeptic, the doubting Christian, the pastor and anyone trying to live well. There is no account to open and nothing behind a paywall.
            </p>
            <div className="pv-signup">
              <p className="pv-signup__label">Essays by email (Substack)</p>
              <NewsletterSignup variant="minimal" source="preview-home" />
            </div>
            <div className="home-row">
              <Link href="/about" className="home-btn home-btn--quiet">
                About James
              </Link>
              <Link href="/support" className="home-btn home-btn--quiet">
                Support this work
              </Link>
            </div>
            <p className="pv-close__help">
              <LifeBuoy aria-hidden="true" size={20} strokeWidth={1.75} />
              <span>
                In a hard season? <Link href="/help">Find help for what you are facing</Link>
              </span>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
