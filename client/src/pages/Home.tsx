/**
 * Home: the front door.
 *
 * A phone's first screen holds James's headline and one sentence on what the
 * site is for, then Find (one field: a passage or a question), tonight's
 * family devotion with "Continue" beside it (pages/home/, U18), and the
 * doors: a line for someone new, then the Study Bible, church history, the
 * hard questions (/topics), family devotions, the essays and the books. Below
 * that: the latest writing with dates beside three essays to start with, the
 * books, one newsletter form, and a quiet way to help for a reader in a hard
 * season. No photograph of James here (his standing note); /about has it.
 *
 * Everything in the first screen is committed data (positioning.ts, the
 * family year map), so the page paints without waiting on the API, and it
 * imports nothing heavy: Find's search and reference parser load when its
 * field is focused, and the tonight line loads just after first paint
 * (below). The latest-writing row starts from the committed essay index and
 * takes its dates from the listing when that answers (pages/home/HomeLatest).
 *
 * The hero's markup and classes (index.css, .home-hero*) are mirrored by the
 * static hero scripts/prerender-heads.mjs writes into "/", so the first paint
 * is the real hero and React's mount moves nothing.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import FollowRow from "@/components/FollowRow";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SEOMeta, getOrganizationSchema, getWebSiteSchema } from "@/components/SEOMeta";
import { BOOK_SHELF } from "@/lib/bookShelf";
import {
  HOME_HEADLINE,
  HOME_LINE,
  HOME_LINKED_HREF,
  HOME_LINKED_WORD,
  META_DESCRIPTION,
} from "@/lib/positioning";
import { START_WITH, cleanExcerpt, isPublicEssay, overrideMeta, shelfEntry } from "@/lib/shelf";
import HomeFind from "./home/HomeFind";
import HomeLatest from "./home/HomeLatest";

/*
 * The tonight line (pages/home/HomeTonight) reads the family year map with
 * its titles, the Advent calendar, and this device's progress for Continue:
 * about 45 kB that every route's entry script would otherwise carry, for a
 * line that sits below the first screen. It loads on its own, starting as
 * this module runs on "/", into a slot one line tall (index.css,
 * .home-tonight--slot), which is the line's height on an ordinary night
 * wherever it can reach the first screen, so the doors below do not move.
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

/** The line for someone new, above the doors. */
const START = {
  lead: "New here?",
  title: "Start here",
  href: "/start",
  note: "One road for someone new to the faith or coming back to it: what to read first, and what to do after that.",
};

/** The doors, in the order the site is built around. */
const DOORS = [
  {
    title: "Study the Bible",
    href: "/study/bible",
    note: "An introduction to every book, notes on all 1,189 chapters, and the one story that runs from Genesis to Revelation.",
  },
  {
    title: "Church history",
    href: "/theology/history",
    note: "The church's long history from Pentecost to today: the councils, the people, and the arguments that settled what Christians confess.",
  },
  {
    title: "Hard questions",
    href: "/topics",
    note: "Christian nationalism, raising children in a secular age, living after Christendom, doubt, suffering, and more. Each question opens the one page on the site that answers it best.",
  },
  {
    title: "Family devotions",
    href: "/family",
    note: "A devotion for tonight's table, about ten minutes long: a passage, one idea to talk about, questions, and a prayer. There is one for every week of the year.",
  },
  {
    title: "Essays",
    href: "/writing",
    note: "A short shelf on the church after Christendom, the long history of the faith, and reading the Bible in its world.",
  },
  {
    title: "Books",
    href: "/books",
    note: "The books James wrote himself. The opening of each is free to read.",
  },
];

/** The shelf's "Start with these", resolved to titles and lines; only public essays. */
function startEssays() {
  return START_WITH.filter((slug) => isPublicEssay(slug))
    .slice(0, 3)
    .map((slug) => {
      const entry = shelfEntry(slug);
      const rewrite = overrideMeta(slug);
      return {
        slug,
        title: rewrite?.title ?? entry?.title ?? slug,
        line: cleanExcerpt(rewrite?.excerpt ?? entry?.blurb ?? ""),
      };
    });
}

const gutter = "var(--gutter)";
const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const sectionTitle = {
  fontFamily: "var(--F)",
  fontSize: "clamp(28px, 3.6vw, 38px)",
  fontWeight: 400,
  letterSpacing: "-0.015em",
  lineHeight: 1.1,
  margin: 0,
} as const;
const quietLink = {
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontWeight: 500,
  textDecoration: "none",
  borderBottom: "1px solid var(--mustard)",
  paddingBottom: "2px",
} as const;

export default function Home() {
  const essays = startEssays();
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

      {/* THE HEADLINE AND ONE SENTENCE. Mirrored by the static hero in prerender-heads.mjs. */}
      <section className="home-hero">
        <div className="home-hero__inner">
          <h1 className="home-hero__title">
            {headBefore}
            <Link href={HOME_LINKED_HREF}>{HOME_LINKED_WORD}</Link>
            {headAfter}
          </h1>
          <p className="home-hero__text">{HOME_LINE}</p>
        </div>
      </section>

      {/* FIND AND TONIGHT, then THE DOORS. */}
      <section className="home-first">
        <div style={wrap}>
          <HomeFind />
          {/* Tonight's devotion, Continue, and the Advent line; empty when there is nothing to show. */}
          <Tonight />
          <h2 id="home-doors-title" className="sr-only">
            Where to begin
          </h2>
          <ul className="home-doors">
            <li className="home-door home-door--start">
              <Link href={START.href} className="home-door__link">
                <span className="home-door__title">
                  {START.lead} <span className="home-door__go">{START.title}</span>
                </span>
                <span className="home-door__note">{START.note}</span>
              </Link>
            </li>
            {DOORS.map((door) => (
              <li key={door.href} className="home-door">
                <Link href={door.href} className="home-door__link">
                  <span className="home-door__title">{door.title}</span>
                  <span className="home-door__note">{door.note}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Not more doors: two quiet lines to the things people use. */}
          <p className="home-also">
            Also here, all free:{" "}
            <Link href="/resources" style={{ ...quietLink, fontSize: "16px", color: "var(--ink)" }}>
              tools, eight-week plans, and printables
            </Link>
            . Leading a class or a small group?{" "}
            <Link href="/studyguides" style={{ ...quietLink, fontSize: "16px", color: "var(--ink)" }}>
              The study guides come with a leader's guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* THE ESSAYS: the latest with dates, and three chosen by hand to start with. */}
      <section style={{ background: "var(--bone-warm)", padding: `var(--s-6) ${gutter}` }}>
        <div style={wrap} className="home-writing">
          <div>
            <div className="home-row-head">
              <h2 style={{ ...sectionTitle, color: "var(--ink)" }}>Latest writing</h2>
              <Link href="/writing" style={{ ...quietLink, color: "var(--ink)" }}>
                All the essays
              </Link>
            </div>
            <HomeLatest />
          </div>
          {essays.length > 0 && (
            <div>
              <div className="home-row-head">
                <h2 style={{ ...sectionTitle, color: "var(--ink)" }}>Start with these</h2>
              </div>
              <ul className="home-essays">
                {essays.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/writing/${e.slug}`} className="home-essay">
                      <span className="home-essay__title">{e.title}</span>
                      {e.line && <span className="home-essay__line">{e.line}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* THE BOOKS */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: `var(--s-6) ${gutter}` }}>
        <div style={wrap}>
          <div className="home-row-head">
            <h2 style={{ ...sectionTitle, color: "var(--charcoal-fg)" }}>The books</h2>
            <Link href="/books" style={{ ...quietLink, color: "var(--charcoal-fg)" }}>
              See all three
            </Link>
          </div>
          <ul className="home-books">
            {BOOK_SHELF.map((b) => (
              <li key={b.slug}>
                <Link href={b.href} className="home-book">
                  <img
                    src={b.thumb}
                    alt=""
                    width={150}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="home-book__cover"
                  />
                  <span className="home-book__title">{b.title}</span>
                  <span className="home-book__sub">{b.sub}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THE NEWSLETTER: the one form in the page itself. */}
      <section style={{ background: "var(--bone)", padding: `var(--s-6) ${gutter}` }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="home"
            title="New essays by email, through Substack"
            description="Serious theology for an ordinary week. Leave your email here and finish on Substack. You can unsubscribe whenever you like."
          />
          {/* Where else James writes: links only (lib/channels.ts). */}
          <FollowRow style={{ marginTop: "var(--s-3)" }} />
        </div>
      </section>

      {/* IN A HARD SEASON: quiet, and always here. */}
      <section style={{ background: "var(--bone-warm)", padding: `var(--s-4) ${gutter}` }}>
        <p
          style={{
            ...wrap,
            fontFamily: "var(--B)",
            fontSize: "16px",
            lineHeight: 1.6,
            color: "var(--ink-muted)",
          }}
        >
          In a hard season?{" "}
          <Link href="/help" style={{ ...quietLink, fontSize: "16px", color: "var(--ink)" }}>
            Find help for what you are facing
          </Link>
          .
        </p>
      </section>

      <style>{HOME_CSS}</style>
    </Layout>
  );
}

/* Layout for the doors, the essays, and the books. The hero's styles live in
   index.css because the prerendered HTML needs them too. On a phone the doors
   are names only, two to a row, so all of them reach the first screen; from
   761px each carries its line. */
const HOME_CSS = `
.home-first{background:var(--bone);padding:var(--s-5) clamp(16px,4vw,var(--s-4)) var(--s-6)}
.home-doors{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:var(--s-5);border-bottom:1px solid var(--border)}
.home-door{border-top:1px solid var(--border)}
.home-door--start{grid-column:1/-1}
.home-door__link{display:block;height:100%;padding:var(--s-3) 0 var(--s-4);text-decoration:none;color:var(--ink)}
.home-door__title{display:block;font-family:var(--F);font-weight:400;font-size:clamp(30px,3vw,40px);line-height:1.08;letter-spacing:-0.02em;margin-bottom:10px;text-decoration:underline;text-decoration-color:transparent;text-decoration-thickness:1px;text-underline-offset:0.14em;transition:text-decoration-color var(--dur) var(--ease)}
.home-door__link:hover .home-door__title,.home-door__link:focus-visible .home-door__title{text-decoration-color:var(--mustard)}
.home-door__note{display:block;font-family:var(--B);font-size:15px;line-height:1.6;color:var(--ink-muted);max-width:40ch}
.home-door--start .home-door__link{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px var(--s-4);padding:var(--s-3) 0}
.home-door--start .home-door__title{font-size:clamp(24px,2.2vw,28px);margin:0;text-decoration:none}
.home-door--start .home-door__note{max-width:none}
.home-door__go{text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:0.16em}
.home-door--start .home-door__link:hover .home-door__go,.home-door--start .home-door__link:focus-visible .home-door__go{text-decoration-thickness:2px}
.home-also{font-family:var(--B);font-size:16px;line-height:1.9;color:var(--ink-muted);margin:var(--s-4) 0 0}
.home-row-head{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:12px;margin-bottom:var(--s-3)}
.home-writing{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:var(--s-5) var(--s-6);align-items:start}
.home-latest{list-style:none;margin:0;padding:0;border-bottom:1px solid var(--borderdk)}
.home-latest__link{display:grid;grid-template-columns:11.5em minmax(0,1fr);gap:4px var(--s-3);align-items:baseline;min-height:56px;padding:14px 0;border-top:1px solid var(--borderdk);text-decoration:none;color:var(--ink)}
.home-latest__date{font-family:var(--U);font-size:13px;font-weight:500;letter-spacing:0.02em;color:var(--ink-muted);font-variant-numeric:tabular-nums}
.home-latest__title{font-family:var(--F);font-weight:500;font-size:23px;line-height:1.2;letter-spacing:-0.005em}
.home-latest__link:hover .home-latest__title,.home-latest__link:focus-visible .home-latest__title{text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:0.16em}
.home-essays{list-style:none;margin:0;padding:0;display:grid;gap:var(--s-3)}
.home-essay{display:block;border-top:1px solid var(--borderdk);padding-top:14px;text-decoration:none;color:var(--ink)}
.home-essay__title{display:block;font-family:var(--F);font-weight:500;font-size:23px;line-height:1.2;letter-spacing:-0.005em;margin-bottom:6px}
.home-essay:hover .home-essay__title,.home-essay:focus-visible .home-essay__title{text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:0.16em}
.home-essay__line{display:block;font-family:var(--B);font-size:15px;line-height:1.6;color:var(--ink-muted)}
.home-books{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s-4)}
.home-book{display:flex;flex-direction:column;gap:8px;text-decoration:none;color:var(--charcoal-fg)}
.home-book__cover{width:150px;height:auto;border-radius:var(--radius-sm);margin-bottom:var(--s-1)}
.home-book__title{font-family:var(--F);font-weight:500;font-size:22px;line-height:1.2;max-width:24ch}
.home-book:hover .home-book__title,.home-book:focus-visible .home-book__title{text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:0.16em}
.home-book__sub{font-family:var(--B);font-size:14px;line-height:1.55;color:var(--charcoal-fg-muted);max-width:34ch}
@media (max-width:900px){
  .home-writing{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:760px){
  .home-first{padding-top:var(--s-3);padding-bottom:var(--s-5)}
  .home-doors{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--s-2)}
  .home-door__link,.home-door--start .home-door__link{display:flex;align-items:center;min-height:48px;padding:0}
  .home-door__title,.home-door--start .home-door__title{font-size:23px;margin:0}
  .home-door__note{display:none}
  .home-latest__link{grid-template-columns:minmax(0,1fr)}
  .home-books{grid-template-columns:minmax(0,1fr)}
  .home-book{display:grid;grid-template-columns:88px minmax(0,1fr);column-gap:var(--s-2);align-items:start}
  .home-book__cover{width:88px;grid-row:span 2;margin:0}
}
`;
