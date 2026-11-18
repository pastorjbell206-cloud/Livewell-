/**
 * Renders one Church History essay from
 * client/public/history/essays/<slug>.json at /theology/history/:slug.
 *
 * An essay knows its place in the course (lib/historyCourse, from the essays
 * index): its number, the one before and the one after, or, for one of the
 * longer essays, the course essays it goes deeper on. The people and councils
 * it names link to their entries on the hub, once per section. Where the essay
 * reports what an ancient writer said and the text is one of the stored,
 * checked public-domain texts, the words themselves stand under that section
 * as "Sources" (client/public/history/sources/<slug>.json, gated by
 * scripts/verify-sources.mjs).
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import MoreOnThis from "@/components/MoreOnThis";
import { toParagraphs } from "@/lib/prose";
import { SEOMeta } from "@/components/SEOMeta";
import PageEndNav from "@/components/PageEndNav";
import { writeStoredJSON } from "@/lib/storage";
import {
  COURSE_PLACE_KEY, buildNameIndex, coursePlace, isSourcesFile, splitNames,
  type HistoryEssayEntry, type NameIndex, type SourceCard,
} from "@/lib/historyCourse";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Section { id: string; kicker?: string; title: string; body: string }
interface Essay {
  slug: string; title: string; subtitle: string; era: string; dateRange: string;
  /** The essay's first title, kept under the plain one. */
  standfirst?: string;
  sections: Section[]; keyFigures?: { name: string; note: string }[]; sources?: { title: string; author: string }[];
}

export default function HistoryEssay() {
  const [, params] = useRoute("/theology/history/:slug");
  const slug = params?.slug;
  // The fetch result is tagged with the slug it answered; data/missing are
  // derived per render, so navigating to a new slug resets the view without a
  // synchronous setState in the effect.
  const [result, setResult] = useState<{ slug: string; data: Essay | null } | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/history/essays/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setResult({ slug, data: d || null }))
      .catch(() => setResult({ slug, data: null }));
  }, [slug]);

  const data = result && result.slug === slug ? result.data : null;
  const missing = !!result && result.slug === slug && result.data === null;

  // The course order, and the names an essay may link. Both are small files
  // the hub also loads; the essay reads without them and gains its place and
  // its links when they arrive.
  const [index, setIndex] = useState<HistoryEssayEntry[]>([]);
  const [names, setNames] = useState<NameIndex | null>(null);
  useEffect(() => {
    const get = (f: string) => fetch(f).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    get("/history/essays-index.json").then((d) => { if (Array.isArray(d?.essays)) setIndex(d.essays); });
    Promise.all([get("/theology/church-history-figures.json"), get("/theology/church-history-councils.json")]).then(([f, c]) => {
      setNames(buildNameIndex(Array.isArray(f?.figures) ? f.figures : [], Array.isArray(c?.councils) ? c.councils : []));
    });
  }, []);
  const place = useMemo(() => (slug ? coursePlace(index, slug) : null), [index, slug]);
  const inCourse = typeof place?.entry.course === "number";

  // Remember the last course essay opened, so the hub can offer the way back.
  useEffect(() => {
    if (slug && inCourse) writeStoredJSON(COURSE_PLACE_KEY, { slug });
  }, [slug, inCourse]);

  // The checked source cards, fetched only for an essay the index says has some.
  const hasSources = !!place?.entry.sources;
  const [cards, setCards] = useState<{ slug: string; cards: SourceCard[] } | null>(null);
  useEffect(() => {
    if (!slug || !hasSources) return;
    fetch(`/history/sources/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (isSourcesFile(d)) setCards({ slug, cards: d.cards }); })
      .catch(() => {});
  }, [slug, hasSources]);
  const cardsFor = (sectionId: string) => (cards && cards.slug === slug ? cards.cards.filter((c) => c.section === sectionId) : []);

  /** A paragraph with the people and councils it names linked, each once per section. */
  const linked = (text: string, seen: Set<string>) =>
    !names ? text : splitNames(text, names, seen).map((piece, i) =>
      typeof piece === "string" ? piece : <Link key={i} href={piece.href} className="hx-link">{piece.text}</Link>);

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Church History`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/theology/history/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--gutter) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          {/* On a first load the prerendered essay stays on screen until the
              essay itself has arrived (lib/prerender-hold.ts), so the hero
              does not grow under the reader. */}
          {!data && !missing && <span hidden data-lw-loading />}
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            {/* One run of text, so a long line wraps as a sentence does. */}
            <span>
              <Link href="/theology/history" style={{ color: "inherit" }}>Church History</Link>
              {data ? ` · ${data.era} · ${data.dateRange.replace(/(\d)-(\d)/g, "$1\u2013$2")}` : ""}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? (missing ? "That essay is not here yet." : "Loading the essay…")}</h1>
          {missing && (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", maxWidth: "60ch" }}>
              It may have moved. Start from the{" "}
              <Link href="/theology/history" style={{ color: "var(--mustard)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Church History library</Link>.
            </p>
          )}
          {data?.standfirst && <p style={{ fontFamily: "var(--F)", fontStyle: "italic", fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.25, color: "var(--charcoal-fg)", margin: "0 0 14px" }}>{data.standfirst}</p>}
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", maxWidth: "62ch" }}>{data.subtitle}</p>}
          {data && place && inCourse && (
            <nav className="hx-place" aria-label="Your place in the course">
              <strong>Essay {place.entry.course} of {place.total} in the course</strong>
              {place.prev && <Link href={`/theology/history/${place.prev.slug}`}>← Previous</Link>}
              {place.next && <Link href={`/theology/history/${place.next.slug}`}>Next →</Link>}
            </nav>
          )}
          {data && place && !inCourse && (
            <nav className="hx-place" aria-label="Where this essay sits">
              <strong>One of the longer essays, for going deeper.</strong>
              {place.alongside.map((e) => (
                <Link key={e.slug} href={`/theology/history/${e.slug}`}>Essay {e.course}: {e.title}</Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      {data?.sections.map((s, i) => (
        <section key={s.id} style={{ background: i % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-5) var(--gutter)" }}>
          <div style={wrap}>
            {s.kicker && <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{s.kicker}</div>}
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{s.title}</h2>
            <div className="article-body prose-section">
              {(() => {
                const seen = new Set<string>();
                return toParagraphs(s.body).map((p, j) => <p key={j}>{linked(p, seen)}</p>);
              })()}
            </div>
            {cardsFor(s.id).length > 0 && (
              <aside className="hx-sources" aria-label={`Sources for ${s.title}`}>
                <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>Sources</div>
                {cardsFor(s.id).map((c, j) => (
                  <div key={j} className="hx-source">
                    <p className="hx-source-about">{c.about}</p>
                    <blockquote>“{c.excerpt}”</blockquote>
                    <cite>
                      <b>{c.author}</b>, {c.work}, {c.reference}. English translation as printed in the {c.translation}.
                    </cite>
                  </div>
                ))}
              </aside>
            )}
          </div>
        </section>
      ))}

      {data && place && inCourse && (place.prev || place.next) && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--gutter)", borderTop: "1px solid var(--border)" }}>
          <div style={wrap}>
            <p style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 500, color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
              That was essay {place.entry.course} of {place.total} in the church history course.
            </p>
            <nav className="hx-turn" aria-label="Previous and next essay">
              {place.prev ? (
                <Link href={`/theology/history/${place.prev.slug}`}><span>← Previous · Essay {place.prev.course}</span><b>{place.prev.title}</b></Link>
              ) : <span aria-hidden />}
              {place.next && (
                <Link href={`/theology/history/${place.next.slug}`} className="is-next"><span>Next · Essay {place.next.course} →</span><b>{place.next.title}</b></Link>
              )}
            </nav>
          </div>
        </section>
      )}
      {data && place && !inCourse && place.alongside.length > 0 && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--gutter)", borderTop: "1px solid var(--border)" }}>
          <div style={wrap}>
            <p style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 500, color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
              This is one of the longer essays. The course covers the same years in {place.alongside.length === 1 ? "this essay" : "these essays"}.
            </p>
            <nav className="hx-turn" aria-label="The course essays for these years">
              {place.alongside.map((e) => (
                <Link key={e.slug} href={`/theology/history/${e.slug}`}><span>Essay {e.course} of {place.total}</span><b>{e.title}</b></Link>
              ))}
            </nav>
          </div>
        </section>
      )}

      {data && (data.keyFigures?.length || data.sources?.length) ? (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--gutter)", color: "var(--charcoal-fg)" }}>
          <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--s-5)" }}>
            {data.keyFigures?.length ? (
              <div>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>Key figures</div>
                {data.keyFigures.map((f, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.55, color: "var(--charcoal-fg-muted)", marginBottom: "8px" }}><span style={{ fontFamily: "var(--F)", fontSize: "17px" }}>{linked(f.name, new Set())}.</span> {f.note}</p>)}
              </div>
            ) : null}
            {data.sources?.length ? (
              <div>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>Books behind this essay</div>
                {data.sources.map((r, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.5, color: "var(--charcoal-fg-muted)", marginBottom: "8px" }}>{r.title}<span style={{ color: "rgba(245,240,230,0.5)" }}>, {r.author}</span></p>)}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--gutter)" }}>
        <div style={wrap}>
          <Link href="/theology/history" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>← The whole course, the timeline and the people</Link>
        </div>
      </section>

      {data && slug && <MoreOnThis href={`/theology/history/${slug}`} />}
      {data && <PageEndNav back={{ href: "/theology/history", label: "Church History" }} />}
    </Layout>
  );
}
