/**
 * /preview/home: a PREVIEW of a reorganised LiveWell homepage, for James to
 * compare with the one that is live. James, 2026-11-26: "keep like the same
 * design and same kind of like images ... not radically change the site ...
 * do this as a preview to see if it would be any better."
 *
 * It answers his platform brief (docs/work/elite/livewell-platform-plan.md):
 * one tagline, eight disciplines, series, learning paths, tools, hard
 * questions, publications, families and churches, all on the site's own
 * tokens, fonts and engraved plates. Nothing here is new content: every link,
 * name and count is read from the site catalogue (lib/siteCatalog.ts), the
 * essay shelf (lib/shelf.json) or the book shelf (lib/bookShelf.ts). What the
 * brief asks for that the site does not have yet (Academy courses, accounts,
 * certificates) is labelled "Planned" and links nowhere.
 *
 * Held: noindex, in no menu, not in the sitemap or search index. The live
 * homepage and header are untouched. Deleting this file and its route
 * removes the preview entirely.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import Plate from "@/components/art/Plate";
import type { PlateName } from "@/components/art/Plate";
import { entryById, type CatalogEntry } from "@/lib/siteCatalog";
import { BOOK_SHELF } from "@/lib/bookShelf";
import { SHELF_ESSAYS, isPublicEssay } from "@/lib/shelf";

/** A catalogue entry by id; the preview fails loudly in tests if an id is gone. */
const E = (id: string): CatalogEntry => {
  const e = entryById(id);
  if (!e) throw new Error(`preview: no catalogue entry "${id}"`);
  return e;
};
const count = (e: CatalogEntry) => (e.count ? `${e.count.n} ${e.count.of}` : "");

/** The eight disciplines of the brief, each made of pages the site already has. */
export const DISCIPLINES: { name: string; line: string; plate: PlateName; doors: string[] }[] = [
  { name: "Bible", line: "Every book with notes, the films, the atlas and the world it was written in.", plate: "book", doors: ["bible.read", "bible.films", "bible.background", "bible.how-to-study"] },
  { name: "Theology", line: "What Christians believe, where they differ, and the words they use.", plate: "lectern", doors: ["questions.believe", "questions.differ", "questions.glossary", "history.creeds"] },
  { name: "Church history", line: "Two thousand years, told in order, with the people and the councils.", plate: "basilica", doors: ["history.course", "history.people", "history.traditions", "history.timeline"] },
  { name: "Apologetics", line: "The case for the faith, weighed fairly, with the objections at full strength.", plate: "lens", doors: ["questions.case", "questions.skeptics", "questions.claims"] },
  { name: "Christianity and culture", line: "How every age and place reads the Bible, and the nation's claims on the church.", plate: "arch", doors: ["history.reading", "questions.nation", "history.injustice"] },
  { name: "Difficult questions", line: "Suffering, hell, doubt, silence: honest answers that do not hurry.", plate: "lantern", doors: ["questions.answers", "questions.more"] },
  { name: "Christian living", line: "Marriage, work, money, grief and prayer, by subject and in practice.", plate: "house", doors: ["questions.life", "questions.wisdom", "questions.how-tos"] },
  { name: "Church and leadership", line: "Group studies, leader guides and booklets on elders and government.", plate: "table", doors: ["tools.groups", "tools.booklets", "tools.plans"] },
];

/** Series the site already has in full. */
const SERIES: { id: string; kind: string; plate: PlateName }[] = [
  { id: "bible.films", kind: "Films", plate: "book" },
  { id: "history.course", kind: "Course · 14 lessons", plate: "basilica" },
  { id: "history.reading", kind: "Essays · 6 eras", plate: "arch" },
  { id: "bible.story", kind: "The whole story", plate: "tree" },
  { id: "questions.answers", kind: "Answers", plate: "lantern" },
  { id: "tools.groups", kind: "Group studies", plate: "table" },
];

/** Learning paths that exist today (the tracks and the history course), and those the brief plans. */
const PATHS_NOW: { name: string; href: string; line: string }[] = [
  { name: "New to faith, or coming back", href: "/tracks/new-to-this", line: "Short sessions in order, each about ten minutes." },
  { name: "Weigh the case for yourself", href: "/tracks/skeptical", line: "For the skeptic: the evidence, one step at a time." },
  { name: "Your questions, taken seriously", href: "/tracks/stepped-back", line: "For the Christian who has stepped back." },
  { name: "Study, history, doctrine", href: "/tracks/deeper", line: "For going deeper into the faith's foundations." },
  { name: "Deep in one: the Gospel of Mark", href: "/tracks/mark", line: "A whole book, read slowly." },
  { name: "Church history, in order", href: "/theology/history#course", line: "Fourteen lessons from the apostles to today." },
];
const PATHS_PLANNED = ["Old Testament survey", "New Testament survey", "Systematic theology", "Christian ethics", "Church leadership"];

const TOOLS = ["bible.search", "bible.word", "bible.cross-references", "bible.timeline", "bible.atlas", "questions.which-view"];
const QUESTIONS = ["faq.does-god-exist", "faq.hell", "faq.science-faith", "faq.deconstruction", "faq.religious-trauma", "faq.bible-accurate"];

/** The first four public essays on the shelf, in the shelf's own order. */
const LATEST = SHELF_ESSAYS.filter((e) => isPublicEssay(e.slug)).slice(0, 4);

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const h2 = { fontFamily: "var(--F)", fontSize: "var(--fs-h2)", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--ink)", marginBottom: "var(--s-2)" } as const;
const lede = { fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-4)" } as const;
const grid = (min: number) => ({ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "14px", gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${min}px), 1fr))` }) as const;
const card = { display: "block", height: "100%", textDecoration: "none", padding: "var(--s-3)" } as const;
const cardTitle = { display: "block", fontFamily: "var(--F)", fontSize: "23px", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" } as const;
const cardLine = { display: "block", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "6px" } as const;
const section = (tone: "bone" | "warm" | "dark") => ({
  background: tone === "dark" ? "var(--charcoal)" : tone === "warm" ? "var(--bone-warm)" : "var(--bone)",
  color: tone === "dark" ? "var(--charcoal-fg)" : "var(--ink)",
  padding: "var(--s-6) var(--gutter)",
});

/** The proposed primary navigation: Explore opens the eight disciplines (two interactions to any of them). */
function PreviewNav() {
  const [open, setOpen] = useState(false);
  const items: [string, string][] = [
    ["Academy", "/tracks"],
    ["Bible tools", "/tools"],
    ["Families", "/family"],
    ["Churches", "/studyguides"],
    ["Publishing", "/writing"],
  ];
  return (
    <nav aria-label="Proposed navigation (preview)" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)", padding: "0 var(--gutter)" }}>
      <div style={{ ...wrap, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 22px", minHeight: "56px" }}>
        <span className="eyebrow" style={{ marginRight: "8px" }}>Preview menu</span>
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} style={{ display: "inline-flex", alignItems: "center", gap: "4px", minHeight: "44px", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 500, color: "var(--ink)", padding: 0 }}>
          Explore <ChevronDown size={16} aria-hidden style={{ transform: open ? "rotate(180deg)" : "none" }} />
        </button>
        {items.map(([name, href]) => (
          <Link key={name} href={href} style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 500, color: "var(--ink)", textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}>
            {name}
          </Link>
        ))}
      </div>
      {open && (
        <div style={{ ...wrap, padding: "var(--s-3) 0 var(--s-4)" }}>
          <ul style={grid(240)}>
            {DISCIPLINES.map((d) => {
              const first = E(d.doors[0]);
              return (
                <li key={d.name}>
                  <Link href={first.href} style={{ display: "block", textDecoration: "none", padding: "10px 0" }}>
                    <span style={{ ...cardTitle, fontSize: "19px" }}>{d.name}</span>
                    <span style={{ ...cardLine, fontSize: "14px" }}>{d.line}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
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
      <p role="note" style={{ background: "var(--bone-warm)", borderBottom: "1px solid var(--border)", margin: 0, padding: "10px var(--gutter)", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", textAlign: "center" }}>
        This is a preview for review. The live homepage is unchanged. <Link href="/">See the live homepage</Link>.
      </p>
      <PreviewNav />

      {/* 1. HERO */}
      <section style={{ ...section("bone"), padding: "var(--s-7) var(--gutter) var(--s-6)" }}>
        <div style={{ ...wrap, display: "grid", gap: "var(--s-5)", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", alignItems: "center" }}>
          <div>
            <p className="eyebrow">LiveWell · Christian education for everyday life</p>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "var(--fs-h1)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05, margin: "12px 0 var(--s-3)", maxWidth: "16ch" }}>
              Know what you believe. Understand why. Learn to live it.
            </h1>
            <p style={lede}>Explore the Bible, theology, church history, apologetics and life's hardest questions, through careful, honest Christian teaching that anyone can follow.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a className="btn" href="#explore">Start exploring</a>
              <a className="btn btn--quiet" href="#paths">Browse learning paths</a>
            </div>
          </div>
          <div style={{ maxWidth: "420px", justifySelf: "center", width: "100%" }}>
            <Plate name="books" />
          </div>
        </div>
      </section>

      {/* 2. EIGHT DISCIPLINES */}
      <section id="explore" aria-labelledby="pv-explore" style={section("warm")}>
        <div style={wrap}>
          <p className="eyebrow">Explore the Christian faith</p>
          <h2 id="pv-explore" style={h2}>Eight ways in</h2>
          <p style={lede}>Every discipline below is made of pages LiveWell already has. Choose one to begin.</p>
          <ul style={grid(260)}>
            {DISCIPLINES.map((d) => {
              const pages = d.doors.map(E);
              return (
                <li key={d.name} className="ed-card" style={{ padding: "var(--s-3)" }}>
                  <div style={{ width: "88px", marginBottom: "10px" }}><Plate name={d.plate} decorative /></div>
                  <h3 style={cardTitle}>{d.name}</h3>
                  <p style={cardLine}>{d.line}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "grid", gap: "6px" }}>
                    {pages.map((p) => (
                      <li key={p.id}>
                        <Link href={p.href} style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink)", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px" }}>{p.name}</Link>
                        {p.count && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}> · {count(p)}</span>}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3. FEATURED SERIES */}
      <section aria-labelledby="pv-series" style={section("dark")}>
        <div style={wrap}>
          <p className="eyebrow">Series</p>
          <h2 id="pv-series" style={{ ...h2, color: "var(--charcoal-fg)" }}>Watch, read and study in order</h2>
          <ul style={grid(300)}>
            {SERIES.map((s) => {
              const e = E(s.id);
              return (
                <li key={s.id}>
                  <Link href={e.href} style={{ ...card, background: "var(--bone)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                    <div style={{ width: "72px", marginBottom: "10px" }}><Plate name={s.plate} decorative /></div>
                    <span className="eyebrow" style={{ display: "block" }}>{s.kind}{e.count ? ` · ${count(e)}` : ""}</span>
                    <span style={{ ...cardTitle, marginTop: "6px" }}>{e.name}</span>
                    <span style={cardLine}>{e.line}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. LEARNING PATHS */}
      <section id="paths" aria-labelledby="pv-paths" style={section("bone")}>
        <div style={wrap}>
          <p className="eyebrow">Learning paths</p>
          <h2 id="pv-paths" style={h2}>More than one page at a time</h2>
          <p style={lede}>Paths you can walk today, session by session. Progress is kept on your device.</p>
          <ol style={grid(280)}>
            {PATHS_NOW.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="ed-card" style={card}>
                  <span style={cardTitle}>{p.name}</span>
                  <span style={cardLine}>{p.line}</span>
                </Link>
              </li>
            ))}
          </ol>
          <p style={{ ...lede, marginTop: "var(--s-4)", marginBottom: "8px" }}>
            <strong style={{ color: "var(--ink)" }}>Planned for the Academy:</strong> {PATHS_PLANNED.join(", ")}. Not available yet.
          </p>
        </div>
      </section>

      {/* 5. TOOLS */}
      <section aria-labelledby="pv-tools" style={section("warm")}>
        <div style={wrap}>
          <p className="eyebrow">Bible tools</p>
          <h2 id="pv-tools" style={h2}>Study the text yourself</h2>
          <ul style={grid(240)}>
            {TOOLS.map(E).map((t) => (
              <li key={t.id}>
                <Link href={t.href} className="ed-card" style={card}>
                  <span style={{ ...cardTitle, fontSize: "20px" }}>{t.name}</span>
                  <span style={cardLine}>{t.line}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "var(--s-3)" }}><Link href="/tools" className="pg-action pg-action--quiet">Every tool</Link></p>
        </div>
      </section>

      {/* 6. DIFFICULT QUESTIONS */}
      <section aria-labelledby="pv-questions" style={section("dark")}>
        <div style={wrap}>
          <p className="eyebrow">Difficult questions</p>
          <h2 id="pv-questions" style={{ ...h2, color: "var(--charcoal-fg)" }}>Asked honestly, answered without hurry</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}>
            {QUESTIONS.map(E).map((q) => (
              <li key={q.id}>
                <Link href={q.href} style={{ fontFamily: "var(--F)", fontSize: "22px", color: "var(--charcoal-fg)", textDecorationColor: "var(--mustard)", textUnderlineOffset: "4px" }}>{q.name}</Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "var(--s-4)" }}><Link href={E("questions.answers").href} className="pg-action pg-action--quiet" style={{ color: "var(--charcoal-fg)" }}>All {count(E("questions.answers"))}</Link></p>
        </div>
      </section>

      {/* 7. LATEST PUBLICATIONS */}
      <section aria-labelledby="pv-latest" style={section("bone")}>
        <div style={wrap}>
          <p className="eyebrow">Publishing</p>
          <h2 id="pv-latest" style={h2}>Essays and books</h2>
          <ul style={grid(260)}>
            {LATEST.map((e) => (
              <li key={e.slug}>
                <Link href={`/writing/${e.slug}`} className="ed-card" style={card}>
                  <span style={{ ...cardTitle, fontSize: "21px" }}>{e.title}</span>
                  {e.blurb && <span style={cardLine}>{e.blurb}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <ul style={{ ...grid(220), marginTop: "var(--s-4)" }}>
            {BOOK_SHELF.map((b) => (
              <li key={b.slug} style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <img src={b.thumb} alt="" width={72} height={108} loading="lazy" style={{ borderRadius: "2px", boxShadow: "0 1px 4px rgba(20,17,12,.18)" }} />
                <Link href={b.href} style={{ fontFamily: "var(--F)", fontSize: "19px", color: "var(--ink)", textDecorationColor: "var(--mustard)" }}>{b.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. FAMILIES AND CHURCHES */}
      <section aria-labelledby="pv-families" style={section("warm")}>
        <div style={{ ...wrap, display: "grid", gap: "14px", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
          <h2 id="pv-families" style={{ ...h2, gridColumn: "1 / -1" }}>For families and churches</h2>
          {[
            { title: "For families", plate: "house" as PlateName, ids: ["family.tonight", "family.catechism", "family.plans", "bible.explorer"] },
            { title: "For pastors and groups", plate: "table" as PlateName, ids: ["tools.groups", "tools.booklets", "bible.tracks", "tools.downloads"] },
          ].map((g) => (
            <div key={g.title} className="ed-card" style={{ padding: "var(--s-4)" }}>
              <div style={{ width: "80px", marginBottom: "10px" }}><Plate name={g.plate} decorative /></div>
              <h3 style={cardTitle}>{g.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "grid", gap: "8px" }}>
                {g.ids.map(E).map((p) => (
                  <li key={p.id}><Link href={p.href} style={{ fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink)", textDecorationColor: "var(--mustard)" }}>{p.name}</Link> <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>{count(p)}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 9 and 10. ABOUT, AND STAYING IN TOUCH */}
      <section aria-labelledby="pv-about" style={section("dark")}>
        <div style={{ ...wrap, maxWidth: "var(--w-prose)" }}>
          <p className="eyebrow">About LiveWell</p>
          <h2 id="pv-about" style={{ ...h2, color: "var(--charcoal-fg)" }}>Free to read, and it stays free</h2>
          <p style={{ ...lede, color: "var(--charcoal-fg)", opacity: 0.85 }}>
            LiveWell is the teaching of James Bell, a pastor who came to faith from atheism, written for the skeptic, the doubting Christian, the pastor and anyone trying to live well. Everything here is free. There is no account to open and nothing behind a paywall.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <Link href="/subscribe" className="btn">Subscribe</Link>
            <Link href="/about" className="btn btn--quiet" style={{ color: "var(--charcoal-fg)" }}>About James</Link>
            <Link href="/support" className="btn btn--quiet" style={{ color: "var(--charcoal-fg)" }}>Support this work</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
