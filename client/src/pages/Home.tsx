/**
 * Home: one calm page.
 *
 * Who James is and why the site exists, in his own words from /about; then
 * Find (one field: a passage or a question) and tonight's family devotion
 * with "Continue" beside it (pages/home/, U18); four doors (the Study Bible,
 * the essays, family devotions, the books); three essays from the shelf to
 * start with; the books; one newsletter form; and a quiet way to help for a
 * reader in a hard season. Everything here is committed data (positioning.ts,
 * shelf.json, bookShelf.ts, the family year map), so the page paints in full
 * without waiting on the API, and it imports nothing heavy: Find's search and
 * reference parser load when its field is focused.
 *
 * The hero's markup and classes (index.css, .home-hero*) are mirrored by the
 * static hero scripts/prerender-heads.mjs writes into "/", so the first paint
 * is the real hero and React's mount moves nothing.
 */
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SEOMeta, getOrganizationSchema, getWebSiteSchema } from "@/components/SEOMeta";
import { BOOK_SHELF } from "@/lib/bookShelf";
import {
  HOME_HEADLINE,
  HOME_WHO,
  HOME_WHY,
  META_DESCRIPTION,
  PORTRAIT_URL,
} from "@/lib/positioning";
import { START_WITH, cleanExcerpt, isPublicEssay, overrideMeta, shelfEntry } from "@/lib/shelf";
import HomeFind from "./home/HomeFind";
import HomeTonight from "./home/HomeTonight";

/** The doors, in the order the site is built around. */
const DOORS = [
  {
    title: "Study the Bible",
    href: "/study/bible",
    note: "An introduction to every book, notes on all 1,189 chapters, and the one story that runs from Genesis to Revelation.",
  },
  {
    title: "Read the essays",
    href: "/writing",
    note: "A short shelf on the church after Christendom, the long history of the faith, and reading the Bible in its world.",
  },
  {
    title: "Family devotions",
    href: "/family",
    note: "A devotion for tonight's table, about ten minutes long: a passage, one idea to talk about, questions, and a prayer. There is one for every week of the year.",
  },
  {
    title: "The books",
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

const gutter = "clamp(16px, 4vw, var(--s-4))";
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

  return (
    <Layout>
      <SEOMeta
        title="LiveWell by James Bell"
        description={META_DESCRIPTION}
        url="https://www.livewellbyjamesbell.co"
        type="website"
        structuredData={[getOrganizationSchema(), getWebSiteSchema()]}
      />

      {/* WHO AND WHY. Mirrored by the static hero in prerender-heads.mjs. */}
      <section className="home-hero">
        <div className="home-hero__inner">
          <div className="home-hero__byline">
            <img
              className="home-hero__portrait"
              src={PORTRAIT_URL}
              alt="James Bell"
              width={168}
              height={210}
              decoding="async"
              fetchPriority="low"
            />
            <div>
              <p className="home-hero__name">James Bell</p>
              <Link href="/about" className="home-hero__about">
                About James
              </Link>
            </div>
          </div>
          <div>
            <h1 className="home-hero__title">{HOME_HEADLINE}</h1>
            <p className="home-hero__text">{HOME_WHY}</p>
            <p className="home-hero__text">{HOME_WHO}</p>
          </div>
        </div>
      </section>

      {/* FIND AND TONIGHT, then THE DOORS: set like a book's contents page. */}
      <section style={{ background: "var(--bone)", padding: `var(--s-5) ${gutter} var(--s-6)` }}>
        <div style={wrap}>
          <HomeFind />
          {/* Tonight's devotion, Continue, and the Advent line; empty when there is nothing to show. */}
          <HomeTonight />
          <h2 id="home-doors-title" className="sr-only">
            Where to begin
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {DOORS.map((door) => (
              <li key={door.href} className="home-door">
                <Link href={door.href} className="home-door__link">
                  <span className="home-door__title">{door.title}</span>
                  <span className="home-door__note">{door.note}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Not a fourth door: one quiet line to the things people use. */}
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "var(--s-4) 0 0" }}>
            Also here, all free:{" "}
            <Link href="/resources" style={{ ...quietLink, fontSize: "16px", color: "var(--ink)" }}>
              tools, eight-week plans, and printables
            </Link>
            .
          </p>
        </div>
      </section>

      {/* START WITH THESE: three essays from the shelf, chosen by hand. */}
      {essays.length > 0 && (
        <section style={{ background: "var(--bone-warm)", padding: `var(--s-6) ${gutter}` }}>
          <div style={wrap}>
            <div className="home-row-head">
              <h2 style={{ ...sectionTitle, color: "var(--ink)" }}>Start with these</h2>
              <Link href="/writing" style={{ ...quietLink, color: "var(--ink)" }}>
                All the essays
              </Link>
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
        </section>
      )}

      {/* THE BOOKS */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: `var(--s-6) ${gutter}` }}>
        <div style={wrap}>
          <div className="home-row-head">
            <h2 style={{ ...sectionTitle, color: "var(--charcoal-fg)" }}>The books</h2>
            <Link href="/books" style={{ ...quietLink, color: "var(--charcoal-fg)" }}>
              Read the opening of each, free
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
            title="One serious essay a week"
            description="Serious theology, written for the week you are actually living. No filler, no funnel, and you can leave whenever you like."
          />
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

/* Below-the-fold layout for the doors, the essays, and the books. The hero's
   styles live in index.css because the prerendered HTML needs them too. */
const HOME_CSS = `
.home-door{border-top:1px solid var(--border)}
.home-door:last-child{border-bottom:1px solid var(--border)}
.home-door__link{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:var(--s-2) var(--s-5);align-items:baseline;padding:var(--s-3) 0;text-decoration:none;color:var(--ink)}
.home-door__title{font-family:var(--F);font-weight:400;font-size:clamp(32px,4.6vw,56px);line-height:1.05;letter-spacing:-0.02em;text-decoration:underline;text-decoration-color:transparent;text-decoration-thickness:1px;text-underline-offset:0.14em;transition:text-decoration-color var(--dur) var(--ease)}
.home-door__link:hover .home-door__title,.home-door__link:focus-visible .home-door__title{text-decoration-color:var(--mustard)}
.home-door__note{font-family:var(--B);font-size:16px;line-height:1.65;color:var(--ink-muted);max-width:46ch}
.home-row-head{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:12px;margin-bottom:var(--s-4)}
.home-essays{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s-4)}
.home-essay{display:block;border-top:1px solid var(--borderdk);padding-top:var(--s-2);text-decoration:none;color:var(--ink)}
.home-essay__title{display:block;font-family:var(--F);font-weight:500;font-size:24px;line-height:1.2;letter-spacing:-0.005em;margin-bottom:8px}
.home-essay:hover .home-essay__title,.home-essay:focus-visible .home-essay__title{text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:0.16em}
.home-essay__line{display:block;font-family:var(--B);font-size:15px;line-height:1.65;color:var(--ink-muted)}
.home-books{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s-4)}
.home-book{display:flex;flex-direction:column;gap:8px;text-decoration:none;color:var(--charcoal-fg)}
.home-book__cover{width:150px;height:auto;border-radius:var(--radius-sm);margin-bottom:var(--s-1)}
.home-book__title{font-family:var(--F);font-weight:500;font-size:22px;line-height:1.2;max-width:24ch}
.home-book:hover .home-book__title,.home-book:focus-visible .home-book__title{text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:0.16em}
.home-book__sub{font-family:var(--B);font-size:14px;line-height:1.55;color:var(--charcoal-fg-muted);max-width:34ch}
@media (max-width:760px){
  .home-door__link{grid-template-columns:minmax(0,1fr);gap:6px}
  .home-essays,.home-books{grid-template-columns:minmax(0,1fr)}
  .home-book{display:grid;grid-template-columns:88px minmax(0,1fr);column-gap:var(--s-2);align-items:start}
  .home-book__cover{width:88px;grid-row:span 2;margin:0}
}
`;
