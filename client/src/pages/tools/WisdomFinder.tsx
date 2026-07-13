/**
 * Wisdom Finder (/tools/wisdom-finder) — type in what you are struggling with,
 * and the tool surfaces what the Bible says about it: the verses, the cultural
 * world they were written in, how the church has understood them across
 * history, and the practical application to modern life. Topics load from
 * /wisdom/topics.json (built by scripts/build-wisdom-index.mjs from
 * client/public/wisdom/topics/*.json). Matching is keyword-based and entirely
 * client-side; no query leaves the browser.
 *
 * Beyond the finder itself: an A–Z browse of all topics with live filtering,
 * a saved list persisted on-device (livewell-wisdom-saved-v1), a deterministic
 * entry for today (the date picks it — no Math.random), per-verse and
 * whole-entry copy via the clipboard helper, and cross-references into the
 * pull-quote corpus (social-quotes.ts) linked back to their source works.
 */
import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  Search,
  Copy,
  Check,
  Globe,
  Landmark,
  Compass,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Quote,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { fetchJson } from "@/lib/fetch-json";
import { readStoredJSON, writeStoredJSON, isArrayOf } from "@/lib/storage";
import { SOCIAL_QUOTES, type SocialQuote } from "@/data/social-quotes";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const eyebrow = { fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mustard)" } as const;
const chipStyle = (on: boolean) =>
  ({
    cursor: "pointer",
    padding: "8px 14px",
    background: on ? "var(--mustard)" : "var(--card)",
    color: on ? "var(--charcoal)" : "var(--ink)",
    border: "1px solid var(--line)",
    fontFamily: "var(--U)",
    fontWeight: 600,
    fontSize: "13.5px",
  }) as const;
const smallActionStyle = {
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "9px 16px",
  background: "var(--charcoal)",
  color: "var(--bone)",
  border: "none",
  fontFamily: "var(--U)",
  fontWeight: 600,
  fontSize: "13px",
} as const;

interface Verse { ref: string; text: string }
interface Related { label: string; href: string }
interface Topic {
  id: string;
  label: string;
  keywords: string[];
  framing: string;
  cultural: string;
  historical: string;
  application: string;
  verses: Verse[];
  related?: Related[];
  articles?: Related[];
}

/** Versioned storage key for the saved-entries list (array of topic ids). */
const SAVED_KEY = "livewell-wisdom-saved-v1";
const isString = (x: unknown): x is string => typeof x === "string";
const readSaved = (): string[] => readStoredJSON(SAVED_KEY, isArrayOf(isString), []);

const SAVE_FAILED_MESSAGE =
  "Couldn't save to this browser — your work here will not survive a reload.";

function scoreTopic(t: Topic, words: string[]): number {
  let score = 0;
  const hay = (t.label + " " + t.keywords.join(" ") + " " + t.framing).toLowerCase();
  for (const w of words) {
    if (w.length < 3) continue;
    // exact keyword match is strongest
    if (t.keywords.some((k) => k.toLowerCase() === w)) score += 5;
    else if (t.keywords.some((k) => k.toLowerCase().includes(w) || w.includes(k.toLowerCase()))) score += 3;
    else if (hay.includes(w)) score += 1;
  }
  return score;
}

/** Deterministic entry for today: hash the local date string over the topic
 *  list. Same day, same entry, for everyone — no randomness. */
function topicForToday(topics: Topic[]): Topic | null {
  if (topics.length === 0) return null;
  const d = new Date();
  const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return topics[Math.abs(h) % topics.length];
}

/** Route a pull quote to its source work: essays under /writing, books under
 *  /read, study guides under /studyguides (same mapping as the Quote Library). */
function quoteSourcePath(q: SocialQuote): string {
  switch (q.sourceType) {
    case "book":
      return `/read/${q.articleSlug}`;
    case "studyguide":
      return `/studyguides/${q.articleSlug}`;
    default:
      return `/writing/${q.articleSlug}`;
  }
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Cross-reference the 401-quote corpus: find pull quotes whose text carries
 *  one of this topic's keywords (whole-word match, terms of five letters or
 *  more to keep the noise down). Deterministic; at most two. */
function quotesForTopic(t: Topic): SocialQuote[] {
  const terms = new Set<string>();
  for (const k of t.keywords) if (k.length >= 5) terms.add(k.toLowerCase());
  for (const w of t.label.toLowerCase().split(/[^a-z]+/)) if (w.length >= 5) terms.add(w);
  const termList = Array.from(terms);
  const scored: { q: SocialQuote; s: number }[] = [];
  for (const q of SOCIAL_QUOTES) {
    let s = 0;
    for (const term of termList) {
      if (new RegExp(`\\b${escapeRe(term)}\\b`, "i").test(q.text)) s += term.includes(" ") ? 3 : 1;
    }
    if (s > 0) scored.push({ q, s });
  }
  return scored.sort((a, b) => b.s - a.s).slice(0, 2).map((x) => x.q);
}

// The render needs an array of topics; anything else is a failed load.
const isTopicsFile = (x: unknown): x is { topics: Topic[] } => {
  const d = x as { topics?: unknown };
  return !!d && typeof d === "object" && Array.isArray(d.topics);
};

/** The full entry for one topic: framing, verses (each copyable), the three
 *  lenses, essay links, and cross-referenced pull quotes. Shared by the
 *  finder results, the browse view, and the saved view. */
function TopicPanel({
  topic,
  saved,
  onToggleSave,
}: {
  topic: Topic;
  saved: boolean;
  onToggleSave: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);
  const quotes = useMemo(() => quotesForTopic(topic), [topic]);

  async function copyWhole() {
    const text = [
      `WHAT THE BIBLE SAYS ABOUT ${topic.label.toUpperCase()}`,
      "",
      topic.framing,
      "",
      "VERSES:",
      ...topic.verses.map((v) => `${v.ref} — ${v.text}`),
      "",
      `THE WORLD IT WAS WRITTEN IN: ${topic.cultural}`,
      "",
      `HOW THE CHURCH HAS UNDERSTOOD IT: ${topic.historical}`,
      "",
      `LIVING IT NOW: ${topic.application}`,
    ].join("\n");
    const ok = await copyToClipboard(text);
    if (!ok) {
      setCopyFailed(true);
      return;
    }
    setCopyFailed(false);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function copyVerse(v: Verse) {
    const ok = await copyToClipboard(`"${v.text}" — ${v.ref}`);
    if (!ok) {
      setCopyFailed(true);
      return;
    }
    setCopyFailed(false);
    setCopiedVerse(v.ref);
    setTimeout(() => setCopiedVerse(null), 2000);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderTop: "2px solid var(--mustard)", paddingTop: "var(--s-3)", marginBottom: "var(--s-3)" }}>
        <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>{topic.label}</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => onToggleSave(topic.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${topic.label} from your saved entries` : `Save ${topic.label} to your entries on this device`}
            style={{ ...smallActionStyle, background: saved ? "var(--mustard)" : "var(--card)", color: saved ? "var(--charcoal)" : "var(--ink)", border: "1px solid var(--line)" }}
          >
            {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />} {saved ? "Saved" : "Save"}
          </button>
          <button onClick={copyWhole} aria-label={`Copy the whole entry on ${topic.label}`} style={smallActionStyle}>
            {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      {copyFailed && (
        <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
          Copy failed — select and copy manually.
        </p>
      )}

      <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "var(--ink)", marginBottom: "var(--s-4)" }}>{topic.framing}</p>

      {/* verses */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <BookOpen size={16} style={{ color: "var(--mustard-text)" }} />
        <span style={{ ...eyebrow, color: "var(--ink)" }}>What Scripture says</span>
      </div>
      <div style={{ display: "grid", gap: "8px", marginBottom: "var(--s-4)" }}>
        {topic.verses.map((v) => (
          <div key={v.ref} style={{ background: "var(--card)", borderLeft: "3px solid var(--mustard)", padding: "var(--s-3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, letterSpacing: "0.06em", color: "var(--mustard-text)" }}>{v.ref}</div>
              <button
                onClick={() => copyVerse(v)}
                aria-label={`Copy ${v.ref}`}
                style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", background: "none", color: "var(--ink-muted)", border: "1px solid var(--line)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px" }}
              >
                {copiedVerse === v.ref ? <Check size={12} /> : <Copy size={12} />} {copiedVerse === v.ref ? "Copied" : "Copy"}
              </button>
            </div>
            <div style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.65, color: "var(--ink)" }}>{v.text}</div>
          </div>
        ))}
      </div>

      {/* the three lenses */}
      {[
        { icon: Globe, label: "The world it was written in", body: topic.cultural },
        { icon: Landmark, label: "How the church has understood it", body: topic.historical },
        { icon: Compass, label: "Living it now", body: topic.application },
      ].map((lens) => (
        <div key={lens.label} style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "var(--s-3)", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <lens.icon size={16} style={{ color: "var(--mustard-text)" }} />
            <span style={{ ...eyebrow, color: "var(--ink)" }}>{lens.label}</span>
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink)" }}>{lens.body}</p>
        </div>
      ))}

      {/* lines from the corpus, linked to their source works */}
      {quotes.length > 0 && (
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "var(--s-3)", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <Quote size={16} style={{ color: "var(--mustard-text)" }} />
            <span style={{ ...eyebrow, color: "var(--ink)" }}>From the writing</span>
          </div>
          <div style={{ display: "grid", gap: "14px" }}>
            {quotes.map((q) => (
              <div key={`${q.articleSlug}-${q.text.slice(0, 24)}`}>
                <blockquote style={{ fontFamily: "var(--F)", fontSize: "18px", lineHeight: 1.55, fontStyle: "italic", color: "var(--ink)", margin: "0 0 6px" }}>
                  &ldquo;{q.text}&rdquo;
                </blockquote>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: 0 }}>
                  — {q.author ?? "James Bell"},{" "}
                  <Link href={quoteSourcePath(q)} style={{ color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "1px" }}>
                    {q.articleTitle}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* go deeper */}
      {topic.related && topic.related.length > 0 && (
        <div style={{ background: "var(--charcoal)", padding: "var(--s-3)", marginTop: "4px" }}>
          <div style={{ ...eyebrow, color: "var(--mustard)", marginBottom: "10px" }}>Go deeper</div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {topic.related.map((r) => (
              <Link key={r.href} href={r.href} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* practical how-tos */}
      {topic.articles && topic.articles.length > 0 && (
        <div style={{ background: "var(--bone-warm)", padding: "var(--s-3)", marginTop: "8px" }}>
          <div style={{ ...eyebrow, color: "var(--ink)", marginBottom: "10px" }}>Practical how-tos</div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {topic.articles.map((r) => (
              <Link key={r.href} href={r.href} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--mustard-text)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type View = "find" | "browse" | "saved";

/** Deep link: /tools/wisdom-finder?q=... prefills and runs the search. */
function queryFromUrl(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("q") ?? "";
}

export default function WisdomFinder() {
  // null = not loaded yet; [] = loaded but empty (distinct from loading)
  const [topicsData, setTopicsData] = useState<Topic[] | null>(null);
  const topics = useMemo(() => topicsData ?? [], [topicsData]);
  const [view, setView] = useState<View>("find");
  const [query, setQuery] = useState(() => queryFromUrl());
  const [submitted, setSubmitted] = useState(() => queryFromUrl());
  const [browseQuery, setBrowseQuery] = useState("");
  const [letter, setLetter] = useState("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>(() => readSaved());
  const [saveFailed, setSaveFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  // The attempt (retry nonce) that failed; deriving `loadError` from it means
  // Retry clears the panel without extra state writes inside the effect.
  const [failedNonce, setFailedNonce] = useState<number | null>(null);
  const loadError = failedNonce === nonce;

  const savedSet = useMemo(() => new Set(saved), [saved]);
  const today = useMemo(() => topicForToday(topics), [topics]);

  useEffect(() => {
    let stale = false;
    fetchJson("/wisdom/topics.json", isTopicsFile)
      .then((d) => { if (!stale) setTopicsData(d.topics); })
      .catch(() => { if (!stale) setFailedNonce(nonce); });
    return () => { stale = true; };
  }, [nonce]);

  const ranked = useMemo(() => {
    if (!submitted.trim()) return [];
    const words = submitted.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
    return topics
      .map((t) => ({ t, s: scoreTopic(t, words) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 6)
      .map((x) => x.t);
  }, [submitted, topics]);

  // In the finder, an unpicked search falls back to the top match; in browse
  // and saved views only an explicit pick opens an entry.
  const active = useMemo(() => {
    if (activeId) return topics.find((t) => t.id === activeId) || null;
    if (view === "find") return ranked[0] || null;
    return null;
  }, [activeId, ranked, topics, view]);

  const letters = useMemo(
    () => ["All", ...Array.from(new Set(topics.map((t) => t.label[0]?.toUpperCase() ?? ""))).filter(Boolean).sort()],
    [topics]
  );

  const browsed = useMemo(() => {
    const q = browseQuery.trim().toLowerCase();
    return topics.filter((t) => {
      if (letter !== "All" && (t.label[0]?.toUpperCase() ?? "") !== letter) return false;
      if (q && !t.label.toLowerCase().includes(q) && !t.keywords.some((k) => k.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [topics, browseQuery, letter]);

  const savedTopics = useMemo(() => topics.filter((t) => savedSet.has(t.id)), [topics, savedSet]);

  function run(q: string) {
    setView("find");
    setSubmitted(q);
    setActiveId(null);
  }

  function switchView(v: View) {
    setView(v);
    setActiveId(null);
  }

  function toggleSave(id: string) {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      if (!writeStoredJSON(SAVED_KEY, next)) setSaveFailed(true);
      return next;
    });
  }

  function openTopic(id: string, v: View) {
    setView(v);
    setActiveId(id);
  }

  const loadingLine = (
    <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>Loading the wisdom library…</p>
  );
  const loadFailedPanel = (
    <LoadFailed what="The wisdom library" onRetry={() => setNonce((n) => n + 1)} backHref="/tools" backLabel="Back to the tools" />
  );
  const backToList = (label: string) => (
    <button onClick={() => setActiveId(null)} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "none", color: "var(--ink)", border: "1px solid var(--line)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", marginBottom: "var(--s-3)" }}>
      <ArrowLeft size={14} /> {label}
    </button>
  );

  return (
    <Layout>
      <SEOMeta
        title="Wisdom Finder — Tell Us What You Are Facing, and What the Bible Says"
        description="Type in what you are struggling with and find the Bible's wisdom for it: the verses, the world they were written in, and the practical application for now."
        url="https://www.livewellbyjamesbell.co/tools/wisdom-finder"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Wisdom · Finder</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "18ch" }}>
            What are you facing
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch", marginBottom: "22px" }}>
            Tell us what you are struggling with, in your own words. We will find what the Bible says about it: the verses, the world they were written in, how the church has understood them across the centuries, and what they mean for your life now.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); run(query); }}
            style={{ display: "flex", gap: "10px", flexWrap: "wrap", maxWidth: "640px" }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I am anxious about money, my marriage is cold, I cannot forgive…"
              aria-label="Describe what you are struggling with"
              style={{ flex: "1 1 320px", padding: "14px 16px", fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink)", background: "var(--card)", border: "none", outline: "none" }}
            />
            <button type="submit" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 22px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px" }}>
              <Search size={16} /> Find wisdom
            </button>
          </form>
        </div>
      </section>

      {/* An entry for today — the date picks it, deterministically */}
      {today && !loadError && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-4) var(--s-4)" }}>
          <div style={wrap}>
            <div style={{ ...eyebrow, marginBottom: "10px" }}>An entry for today</div>
            <blockquote style={{ fontFamily: "var(--F)", fontSize: "clamp(19px, 2.6vw, 24px)", lineHeight: 1.5, fontStyle: "italic", color: "var(--ink)", margin: "0 0 10px", maxWidth: "68ch" }}>
              &ldquo;{today.verses[0].text}&rdquo;
            </blockquote>
            <p style={{ fontFamily: "var(--U)", fontSize: "13.5px", color: "var(--ink-muted)", margin: "0 0 14px" }}>
              {today.verses[0].ref} · {today.label}
            </p>
            <button onClick={() => openTopic(today.id, "browse")} style={{ ...smallActionStyle }}>
              Read the whole entry
            </button>
          </div>
        </section>
      )}

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {/* view toggle */}
          <div role="group" aria-label="Choose between the finder, all topics, and your saved entries" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "var(--s-4)" }}>
            {([
              { id: "find", label: "Find wisdom" },
              { id: "browse", label: `All topics${topics.length ? ` (${topics.length})` : ""}` },
              { id: "saved", label: `Saved (${saved.length})` },
            ] as const).map((v) => {
              const on = view === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => switchView(v.id)}
                  aria-pressed={on}
                  style={{ cursor: "pointer", padding: "8px 16px", background: on ? "var(--charcoal)" : "none", color: on ? "var(--bone)" : "var(--ink)", border: "1px solid var(--line)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13.5px" }}
                >
                  {v.label}
                </button>
              );
            })}
          </div>

          {saveFailed && (
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
              {SAVE_FAILED_MESSAGE}
            </p>
          )}

          {/* ——— Find view ——— */}
          {view === "find" && !submitted.trim() && (
            <div>
              <div style={{ ...eyebrow, color: "var(--ink)", marginBottom: "var(--s-2)" }}>Or start with a common struggle</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {topics.slice(0, 16).map((t) => (
                  <button key={t.id} onClick={() => run(t.label)} style={chipStyle(false)}>
                    {t.label}
                  </button>
                ))}
              </div>
              {topicsData === null && !loadError && <div style={{ marginTop: "var(--s-3)" }}>{loadingLine}</div>}
              {loadError && <div style={{ marginTop: "var(--s-3)" }}>{loadFailedPanel}</div>}
              {topicsData !== null && topics.length === 0 && (
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", marginTop: "var(--s-3)" }}>No topics are available yet.</p>
              )}
            </div>
          )}

          {view === "find" && submitted.trim() !== "" && (
            <div>
              {loadError ? (
                loadFailedPanel
              ) : topicsData === null ? (
                loadingLine
              ) : ranked.length === 0 ? (
                <div style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "var(--s-4)" }}>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>
                    We did not find a close match for that yet. Try naming the feeling or the situation in a word or two, anxiety, anger, money, marriage, loneliness, grief, doubt, or pick one below.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "var(--s-3)" }}>
                    {topics.slice(0, 14).map((t) => (
                      <button key={t.id} onClick={() => run(t.label)} style={{ ...chipStyle(false), background: "var(--bone-warm)", fontSize: "13px", padding: "7px 12px" }}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {/* matched topic chips */}
                  {ranked.length > 1 && (
                    <div style={{ marginBottom: "var(--s-4)" }}>
                      <div style={{ ...eyebrow, color: "var(--ink-muted)", marginBottom: "8px" }}>Closest to what you said</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {ranked.map((t) => (
                          <button key={t.id} onClick={() => setActiveId(t.id)} style={chipStyle(active?.id === t.id)}>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {active && (
                    <TopicPanel key={active.id} topic={active} saved={savedSet.has(active.id)} onToggleSave={toggleSave} />
                  )}
                </div>
              )}
            </div>
          )}

          {/* ——— Browse view ——— */}
          {view === "browse" && (
            <div>
              {loadError ? (
                loadFailedPanel
              ) : topicsData === null ? (
                loadingLine
              ) : active ? (
                <div>
                  {backToList("All topics")}
                  <TopicPanel key={active.id} topic={active} saved={savedSet.has(active.id)} onToggleSave={toggleSave} />
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", marginBottom: "var(--s-3)" }}>
                    <div style={{ position: "relative", flex: "1 1 240px", maxWidth: "420px" }}>
                      <Search size={14} aria-hidden="true" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)", pointerEvents: "none" }} />
                      <input
                        type="search"
                        value={browseQuery}
                        onChange={(e) => setBrowseQuery(e.target.value)}
                        placeholder="Filter the topics"
                        aria-label="Filter topics by name or keyword"
                        style={{ width: "100%", padding: "10px 14px 10px 34px", fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink)", background: "var(--card)", border: "1px solid var(--line)", outline: "none" }}
                      />
                    </div>
                    <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: 0 }}>
                      {browsed.length} topic{browsed.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div role="group" aria-label="Filter topics by first letter" style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "var(--s-3)" }}>
                    {letters.map((l) => {
                      const on = letter === l;
                      return (
                        <button
                          key={l}
                          onClick={() => setLetter(l)}
                          aria-pressed={on}
                          style={{ cursor: "pointer", minWidth: "34px", padding: "6px 8px", background: on ? "var(--charcoal)" : "none", color: on ? "var(--bone)" : "var(--ink-muted)", border: "1px solid var(--line)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "12.5px" }}
                        >
                          {l}
                        </button>
                      );
                    })}
                  </div>
                  {browsed.length === 0 ? (
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>
                      No topics match. Clear the filter or try another word.
                    </p>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "8px" }}>
                      {browsed.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveId(t.id)}
                          style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", padding: "12px 14px", background: "var(--card)", color: "var(--ink)", border: "1px solid var(--line)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", textAlign: "left" }}
                        >
                          <span>{t.label}</span>
                          {savedSet.has(t.id) && <BookmarkCheck size={14} aria-label="Saved" style={{ color: "var(--mustard-text)", flexShrink: 0 }} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ——— Saved view ——— */}
          {view === "saved" && (
            <div>
              {active ? (
                <div>
                  {backToList("Your saved entries")}
                  <TopicPanel key={active.id} topic={active} saved={savedSet.has(active.id)} onToggleSave={toggleSave} />
                </div>
              ) : saved.length === 0 ? (
                <div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "var(--s-3)" }}>
                    Nothing saved yet. The Save button on any entry keeps it here, on this device.
                  </p>
                  <button onClick={() => switchView("browse")} style={chipStyle(false)}>
                    Browse all topics
                  </button>
                </div>
              ) : loadError ? (
                loadFailedPanel
              ) : topicsData === null ? (
                loadingLine
              ) : savedTopics.length === 0 ? (
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>
                  Your saved entries no longer match the current library.
                </p>
              ) : (
                <div style={{ display: "grid", gap: "10px" }}>
                  {savedTopics.map((t) => (
                    <div key={t.id} style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "var(--s-3)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                      <div style={{ flex: "1 1 260px" }}>
                        <div style={{ fontFamily: "var(--F)", fontSize: "20px", color: "var(--ink)", marginBottom: "4px" }}>{t.label}</div>
                        <div style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>
                          {t.verses[0].ref} and {t.verses.length - 1} more
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button onClick={() => setActiveId(t.id)} style={smallActionStyle}>Open</button>
                        <button
                          onClick={() => toggleSave(t.id)}
                          aria-label={`Remove ${t.label} from your saved entries`}
                          style={{ ...smallActionStyle, background: "none", color: "var(--ink-muted)", border: "1px solid var(--line)" }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid var(--line)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/wisdom" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Wisdom for All of Life</Link>
            <Link href="/life/wisdom-for-all-of-life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The deep guide</Link>
            <Link href="/tools/bible-on" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Browse by topic</Link>
            <Link href="/tools/quotes" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The Quote Library</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
