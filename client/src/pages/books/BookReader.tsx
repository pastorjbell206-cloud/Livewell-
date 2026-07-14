/**
 * BookReader (/read/:slug) — the reading room for a full book.
 *
 * Rebuilt from a single endless scroll into a real e-reader: one chapter at a
 * time at a readable measure, a sticky chapter spine that shows where you are,
 * a progress rail, a per-chapter reading-time estimate, prev/next controls, a
 * reader font-size control, and resume-where-you-left-off (device-local). Only
 * the open chapter is mounted, so a 20-chapter book stays fast on a phone.
 *
 * The book is fetched from client/public/books/<slug>.json — the same chapter
 * shape as before: {n, slug, title, summary, verdict, body, reflect}. The open
 * chapter is reflected in the URL hash (#ch-N) so it is linkable and the
 * browser back button walks the chapters.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { Markdown } from "@/components/Markdown";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";
import { bookProgressKey, isBookProgress, type BookProgress } from "@/lib/libraryBooks";

const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

interface Chapter { n: number; slug?: string; title: string; summary?: string; verdict?: string; body: string; reflect?: string[] }
interface Book { title: string; subtitle?: string; blurb?: string; pillar?: string; chapters: Chapter[] }

// Paid ebooks: downloads go through checkout, so the free reader offers no PDF.
const PAID_BOOK_SLUGS = new Set(["born-again-from-atheism", "the-god-who-is-not-nice"]);

type FontSize = "sm" | "md" | "lg";
const FONT_SCALE: Record<FontSize, number> = { sm: 0.94, md: 1, lg: 1.12 };
const FONT_KEY = "livewell-reader-fontsize";
const isFontSize = (x: unknown): x is FontSize => x === "sm" || x === "md" || x === "lg";

const progressKey = bookProgressKey;
const isProgress = isBookProgress;
type Progress = BookProgress;

const readingMinutes = (body: string) => Math.max(1, Math.round(body.trim().split(/\s+/).length / 220));
const wordCount = (body: string) => body.trim().split(/\s+/).length;

/** The chapter number the URL hash points at (1-based), or null. */
function chapterFromHash(count: number): number | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/^#ch-(\d+)$/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return n >= 1 && n <= count ? n : null;
}

export default function BookReader() {
  const [, params] = useRoute("/read/:slug");
  const slug = params?.slug;
  const [result, setResult] = useState<{ slug: string; book: Book | null } | null>(null);
  const [current, setCurrent] = useState(1); // 1-based chapter number
  const [fontSize, setFontSize] = useState<FontSize>(() => readStoredJSON<FontSize>(FONT_KEY, isFontSize, "md"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const book = result && result.slug === slug ? result.book : null;
  const missing = !!result && result.slug === slug && result.book === null;
  const chapters = book?.chapters ?? [];

  // Fetch the book, and resolve the opening chapter in the same async step
  // (URL hash wins, then the reader's saved place, then chapter one) so no
  // state is set synchronously inside an effect.
  useEffect(() => {
    if (!slug) return;
    let active = true;
    fetch(`/books/${slug}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!active) return;
        const bk: Book | null = d?.chapters ? d : null;
        setResult({ slug, book: bk });
        if (bk) {
          const fromHash = chapterFromHash(bk.chapters.length);
          const saved = readStoredJSON<Progress>(progressKey(slug), isProgress, { chapter: 1 });
          const n = fromHash ?? Math.min(Math.max(saved.chapter, 1), bk.chapters.length);
          setCurrent(n);
          if (n > 1 && !fromHash && typeof window !== "undefined") window.history.replaceState(null, "", `#ch-${n}`);
        }
      })
      .catch(() => active && setResult({ slug, book: null }));
    return () => { active = false; };
  }, [slug]);

  // Walk chapters with the browser back/forward buttons.
  useEffect(() => {
    if (!book) return;
    const onHash = () => { const n = chapterFromHash(book.chapters.length); if (n) setCurrent(n); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [book]);

  const goTo = useCallback((n: number, opts?: { scroll?: boolean }) => {
    setCurrent(n);
    setMenuOpen(false);
    if (typeof window !== "undefined") window.history.pushState(null, "", `#ch-${n}`);
    if (slug) writeStoredJSON(progressKey(slug), { chapter: n });
    if (opts?.scroll !== false) {
      requestAnimationFrame(() => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [slug]);

  // Persist the reading place whenever the chapter settles.
  useEffect(() => { if (slug && book) writeStoredJSON(progressKey(slug), { chapter: current }); }, [current, slug, book]);

  const setFont = (f: FontSize) => { setFontSize(f); writeStoredJSON(FONT_KEY, f); };

  const shareChapter = async () => {
    const url = `${SITE_URL}/read/${slug}#ch-${current}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) { await navigator.share({ url }); return; }
      await navigator.clipboard.writeText(url);
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    } catch { /* share cancelled or clipboard unavailable */ }
  };

  const ch = chapters.find((c) => c.n === current) ?? chapters[0];
  const idx = ch ? chapters.findIndex((c) => c.n === ch.n) : -1;
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : null;
  const pct = chapters.length ? Math.round(((idx + 1) / chapters.length) * 100) : 0;
  const savedChapter = useMemo(
    () => (slug ? readStoredJSON<Progress>(progressKey(slug), isProgress, { chapter: 1 }).chapter : 1),
    [slug],
  );

  if (missing) {
    return (
      <Layout>
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={prose}>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "32px", color: "var(--ink)", marginBottom: "12px" }}>That book is not here yet.</h1>
            <Link href="/read" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Back to the library</Link>
          </div>
        </section>
      </Layout>
    );
  }

  const railBtn: React.CSSProperties = {
    display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
    cursor: "pointer", padding: "7px 0", fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.35,
  };

  return (
    <Layout>
      <SEOMeta
        title={book ? (book.subtitle ? `${book.title} — ${book.subtitle}` : `${book.title} — Read Free Online`) : "Reading…"}
        description={book?.blurb || book?.subtitle || "A full-length book by James Bell, free to read online."}
        url={`${SITE_URL}/read/${slug}`}
        type="article"
        author="James Bell"
        structuredData={book ? {
          "@context": "https://schema.org",
          "@type": "Book",
          name: book.title,
          ...(book.subtitle ? { alternativeHeadline: book.subtitle } : {}),
          ...(book.blurb ? { description: book.blurb } : {}),
          author: { "@type": "Person", name: "James Bell" },
          url: `${SITE_URL}/read/${slug}`,
          bookFormat: "https://schema.org/EBook",
          inLanguage: "en",
          isAccessibleForFree: true,
          numberOfPages: book.chapters.length,
          // Every chapter, so search understands the book's structure and can
          // deep-link the exact chapter that answers a question.
          hasPart: book.chapters.map((c) => ({
            "@type": "Chapter",
            position: c.n,
            name: c.title,
            url: `${SITE_URL}/read/${slug}#ch-${c.n}`,
          })),
        } : undefined}
      />

      {/* BOOK FRONT */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={{ ...prose, display: "flex", gap: "var(--s-5)", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>
              <Link href="/read" style={{ color: "inherit", textDecoration: "none" }}>The Library</Link>{book?.pillar ? ` · ${book.pillar}` : ""}
            </div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 14px", maxWidth: "18ch" }}>
              {book?.title ?? "Loading…"}
            </h1>
            {book?.subtitle && <p style={{ fontFamily: "var(--F)", fontSize: "21px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 18px", maxWidth: "40ch" }}>{book.subtitle}</p>}
            {book?.blurb && <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,.82)", maxWidth: "60ch" }}>{book.blurb}</p>}
            {book && (
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "22px" }}>
                <button
                  onClick={() => goTo(savedChapter > 1 ? savedChapter : 1)}
                  style={{ padding: "12px 22px", background: "var(--mustard)", color: "var(--ink)", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, borderRadius: "var(--radius-sm)" }}
                >
                  {savedChapter > 1 ? `Resume · Chapter ${savedChapter}` : "Start reading"}
                </button>
                {savedChapter > 1 && (
                  <button onClick={() => goTo(1)} style={{ padding: "12px 20px", background: "transparent", color: "var(--mustard)", border: "1px solid rgba(245,240,230,0.25)", cursor: "pointer", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, borderRadius: "var(--radius-sm)" }}>
                    Start from the beginning
                  </button>
                )}
                {slug && !PAID_BOOK_SLUGS.has(slug) && (
                  <a href={`/downloads/books/${slug}.pdf`} style={{ padding: "12px 20px", background: "transparent", color: "rgba(245,240,230,0.82)", border: "1px solid rgba(245,240,230,0.25)", textDecoration: "none", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, borderRadius: "var(--radius-sm)" }}>
                    Download the PDF
                  </a>
                )}
              </div>
            )}
          </div>
          {book && slug && (
            <img src={`/books/${slug}.svg`} alt={`${book.title} cover`} width={180} height={270} style={{ flex: "0 0 auto", width: "180px", height: "270px", objectFit: "cover", border: "1px solid rgba(245,240,230,0.15)", boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }} />
          )}
        </div>
      </section>

      {/* PROGRESS RAIL (sticky, thin) */}
      {book && (
        <div style={{ position: "sticky", top: 0, zIndex: 30, height: "3px", background: "var(--border)" }} aria-hidden="true">
          <div style={{ height: "100%", width: `${pct}%`, background: "var(--mustard)", transition: "width .3s" }} />
        </div>
      )}

      {!book ? (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "40vh" }}>
          <div style={prose}><p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the book…</p></div>
        </section>
      ) : (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
          <div style={{ maxWidth: "1060px", margin: "0 auto", display: "grid", gridTemplateColumns: "240px 1fr", gap: "var(--s-5)", alignItems: "start" }} className="reader-grid">

            {/* SPINE (desktop) */}
            <aside className="reader-spine" style={{ position: "sticky", top: "24px" }}>
              <div style={{ ...eyebrow, marginBottom: "12px" }}>Chapters</div>
              <div role="navigation" aria-label="Chapters" style={{ maxHeight: "calc(100vh - 180px)", overflowY: "auto", paddingRight: "6px" }}>
                {chapters.map((c) => {
                  const state = c.n === current ? "on" : c.n < current ? "done" : "todo";
                  return (
                    <button key={c.n} onClick={() => goTo(c.n)} aria-current={state === "on" ? "true" : undefined}
                      style={{ ...railBtn, color: state === "on" ? "var(--ink)" : "var(--ink-muted)", fontWeight: state === "on" ? 600 : 400 }}>
                      <span style={{ color: state === "todo" ? "var(--ink-muted)" : "var(--mustard-text)", fontVariantNumeric: "tabular-nums" }}>{String(c.n).padStart(2, "0")}</span>{" · "}{c.title}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border)" }}>
                <div style={{ ...eyebrow, fontSize: "0.62rem", marginBottom: "8px" }}>Text size</div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {(["sm", "md", "lg"] as FontSize[]).map((f) => (
                    <button key={f} onClick={() => setFont(f)} aria-pressed={fontSize === f} aria-label={`Text size ${f === "sm" ? "small" : f === "md" ? "medium" : "large"}`}
                      style={{ flex: 1, padding: "6px 0", cursor: "pointer", fontFamily: "var(--F)", background: fontSize === f ? "var(--charcoal)" : "var(--card)", color: fontSize === f ? "var(--bone)" : "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: f === "sm" ? "13px" : f === "md" ? "16px" : "19px", lineHeight: 1 }}>A</button>
                  ))}
                </div>
              </div>
            </aside>

            {/* MOBILE chapter bar */}
            <div className="reader-mobilebar" style={{ display: "none", position: "sticky", top: "3px", zIndex: 20, background: "var(--bone)", borderBottom: "1px solid var(--border)", padding: "10px 0", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <button onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "7px 12px", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--ink)", cursor: "pointer" }}>
                  ☰ Ch {current}/{chapters.length}
                </button>
                <div style={{ display: "flex", gap: "5px" }}>
                  {(["sm", "md", "lg"] as FontSize[]).map((f) => (
                    <button key={f} onClick={() => setFont(f)} aria-pressed={fontSize === f} aria-label={`Text size ${f === "sm" ? "small" : f === "md" ? "medium" : "large"}`} style={{ width: "30px", padding: "5px 0", cursor: "pointer", fontFamily: "var(--F)", background: fontSize === f ? "var(--charcoal)" : "var(--card)", color: fontSize === f ? "var(--bone)" : "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: f === "sm" ? "12px" : f === "md" ? "15px" : "18px", lineHeight: 1 }}>A</button>
                  ))}
                </div>
              </div>
              {menuOpen && (
                <div role="navigation" aria-label="Chapters" style={{ marginTop: "8px", maxHeight: "50vh", overflowY: "auto", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "6px 12px" }}>
                  {chapters.map((c) => (
                    <button key={c.n} onClick={() => goTo(c.n)} style={{ ...railBtn, color: c.n === current ? "var(--ink)" : "var(--ink-muted)", fontWeight: c.n === current ? 600 : 400 }}>
                      {String(c.n).padStart(2, "0")} · {c.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CHAPTER */}
            <div ref={contentRef} style={{ minWidth: 0, ["--reader-scale" as string]: FONT_SCALE[fontSize] }}>
              {ch && (
                <article style={prose}>
                  <div style={eyebrow}>Chapter {ch.n} of {chapters.length}</div>
                  <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "8px 0 6px", lineHeight: 1.08 }}>{ch.title}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "var(--s-4)", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>{readingMinutes(ch.body)} min · {wordCount(ch.body).toLocaleString()} words</span>
                    <button onClick={shareChapter} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", padding: 0 }}>{copied ? "Link copied" : "Share this chapter"}</button>
                  </div>
                  <div className="article-body" style={{ fontSize: "calc(1rem * var(--reader-scale, 1))" }}>
                    <Markdown>{ch.body}</Markdown>
                  </div>
                  {ch.verdict && <p style={{ fontFamily: "var(--F)", fontSize: "22px", fontStyle: "italic", color: "var(--mustard-text)", margin: "var(--s-4) 0", paddingLeft: "20px", borderLeft: "3px solid var(--mustard)" }}>{ch.verdict}</p>}
                  {ch.reflect && ch.reflect.length > 0 && (
                    <div style={{ background: "var(--bone-warm)", padding: "18px 22px", borderRadius: "var(--radius-sm)", marginTop: "var(--s-4)" }}>
                      <div style={{ ...eyebrow, marginBottom: "10px" }}>Reflect</div>
                      <ol style={{ margin: 0, paddingLeft: "20px" }}>
                        {ch.reflect.map((q, i) => (<li key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "6px" }}>{q}</li>))}
                      </ol>
                    </div>
                  )}

                  {/* PREV / NEXT */}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginTop: "var(--s-6)", paddingTop: "var(--s-4)", borderTop: "1px solid var(--border)" }}>
                    {prev ? (
                      <button onClick={() => goTo(prev.n)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, maxWidth: "45%" }}>
                        <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>← Previous</span>
                        <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "17px", color: "var(--ink)" }}>{prev.title}</span>
                      </button>
                    ) : <span />}
                    {next ? (
                      <button onClick={() => goTo(next.n)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "right", padding: 0, maxWidth: "45%" }}>
                        <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mustard-text)" }}>Next →</span>
                        <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "17px", color: "var(--ink)" }}>{next.title}</span>
                      </button>
                    ) : (
                      <Link href="/read" style={{ textAlign: "right", textDecoration: "none" }}>
                        <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mustard-text)" }}>The end</span>
                        <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "17px", color: "var(--ink)" }}>Back to the Library</span>
                      </Link>
                    )}
                  </div>
                </article>
              )}
            </div>
          </div>
          <style>{`
            @media (max-width: 820px){
              .reader-grid{grid-template-columns:1fr !important}
              .reader-spine{display:none}
              .reader-mobilebar{display:block !important}
            }
          `}</style>
        </section>
      )}
    </Layout>
  );
}
