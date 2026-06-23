/**
 * Wisdom Finder (/tools/wisdom-finder) — type in what you are struggling with,
 * and the tool surfaces what the Bible says about it: the verses, the cultural
 * world they were written in, how the church has understood them across
 * history, and the practical application to modern life. Topics load from
 * /wisdom/topics.json (built by scripts/build-wisdom-index.mjs from
 * client/public/wisdom/topics/*.json). Matching is keyword-based and entirely
 * client-side; no query leaves the browser.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search, Copy, Check, Globe, Landmark, Compass, BookOpen } from "lucide-react";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const eyebrow = { fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mustard)" } as const;

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
}

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

export default function WisdomFinder() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/wisdom/topics.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setTopics(d.topics || []))
      .catch(() => {});
  }, []);

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

  const active = useMemo(() => {
    if (activeId) return topics.find((t) => t.id === activeId) || null;
    return ranked[0] || null;
  }, [activeId, ranked, topics]);

  function run(q: string) {
    setSubmitted(q);
    setActiveId(null);
    setCopied(false);
  }

  async function copyActive() {
    if (!active) return;
    const text = [
      `WHAT THE BIBLE SAYS ABOUT ${active.label.toUpperCase()}`,
      "",
      active.framing,
      "",
      "VERSES:",
      ...active.verses.map((v) => `${v.ref} — ${v.text}`),
      "",
      `THE WORLD IT WAS WRITTEN IN: ${active.cultural}`,
      "",
      `HOW THE CHURCH HAS UNDERSTOOD IT: ${active.historical}`,
      "",
      `LIVING IT NOW: ${active.application}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Layout>
      <SEOMeta
        title="Wisdom Finder — Tell Us What You Are Facing, and What the Bible Says"
        description="Type in what you are struggling with and find the Bible's wisdom for it: the verses, the world they were written in, how the church has understood them across history, and the practical application to your life now."
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
              placeholder="I am anxious about money, my marriage is cold, I cannot forgive..."
              style={{ flex: "1 1 320px", padding: "14px 16px", fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink)", background: "#FFFFFF", border: "none", outline: "none" }}
            />
            <button type="submit" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 22px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px" }}>
              <Search size={16} /> Find wisdom
            </button>
          </form>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {/* No search yet */}
          {!submitted.trim() && (
            <div>
              <div style={{ ...eyebrow, color: "var(--ink)", marginBottom: "var(--s-2)" }}>Or start with a common struggle</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {topics.slice(0, 16).map((t) => (
                  <button key={t.id} onClick={() => run(t.label)} style={{ cursor: "pointer", padding: "8px 14px", background: "#FFFFFF", color: "var(--ink)", border: "1px solid rgba(20,17,12,0.12)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13.5px" }}>
                    {t.label}
                  </button>
                ))}
              </div>
              {topics.length === 0 && (
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", marginTop: "var(--s-3)" }}>Loading the wisdom library…</p>
              )}
            </div>
          )}

          {/* Results */}
          {submitted.trim() && (
            <div>
              {ranked.length === 0 ? (
                <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", padding: "var(--s-4)" }}>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>
                    We did not find a close match for that yet. Try naming the feeling or the situation in a word or two, anxiety, anger, money, marriage, loneliness, grief, doubt, or pick one below.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "var(--s-3)" }}>
                    {topics.slice(0, 14).map((t) => (
                      <button key={t.id} onClick={() => run(t.label)} style={{ cursor: "pointer", padding: "7px 12px", background: "var(--bone-warm)", color: "var(--ink)", border: "1px solid rgba(20,17,12,0.12)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px" }}>
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
                        {ranked.map((t) => {
                          const on = active?.id === t.id;
                          return (
                            <button key={t.id} onClick={() => { setActiveId(t.id); setCopied(false); }} style={{ cursor: "pointer", padding: "8px 14px", background: on ? "var(--mustard)" : "#FFFFFF", color: on ? "var(--charcoal)" : "var(--ink)", border: "1px solid rgba(20,17,12,0.12)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13.5px" }}>
                              {t.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {active && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderTop: "2px solid var(--mustard)", paddingTop: "var(--s-3)", marginBottom: "var(--s-3)" }}>
                        <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>{active.label}</h2>
                        <button onClick={copyActive} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", background: "var(--charcoal)", color: "var(--bone)", border: "none", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px" }}>
                          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy"}
                        </button>
                      </div>

                      <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "var(--ink)", marginBottom: "var(--s-4)" }}>{active.framing}</p>

                      {/* verses */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <BookOpen size={16} style={{ color: "var(--mustard)" }} />
                        <span style={{ ...eyebrow, color: "var(--ink)" }}>What Scripture says</span>
                      </div>
                      <div style={{ display: "grid", gap: "8px", marginBottom: "var(--s-4)" }}>
                        {active.verses.map((v) => (
                          <div key={v.ref} style={{ background: "#FFFFFF", borderLeft: "3px solid var(--mustard)", padding: "var(--s-3)" }}>
                            <div style={{ fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, letterSpacing: "0.06em", color: "var(--mustard-text)", marginBottom: "6px" }}>{v.ref}</div>
                            <div style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.65, color: "var(--ink)" }}>{v.text}</div>
                          </div>
                        ))}
                      </div>

                      {/* the three lenses */}
                      {[
                        { icon: Globe, label: "The world it was written in", body: active.cultural },
                        { icon: Landmark, label: "How the church has understood it", body: active.historical },
                        { icon: Compass, label: "Living it now", body: active.application },
                      ].map((lens) => (
                        <div key={lens.label} style={{ background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", padding: "var(--s-3)", marginBottom: "10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                            <lens.icon size={16} style={{ color: "var(--mustard)" }} />
                            <span style={{ ...eyebrow, color: "var(--ink)" }}>{lens.label}</span>
                          </div>
                          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink)" }}>{lens.body}</p>
                        </div>
                      ))}

                      {/* go deeper */}
                      {active.related && active.related.length > 0 && (
                        <div style={{ background: "var(--charcoal)", padding: "var(--s-3)", marginTop: "4px" }}>
                          <div style={{ ...eyebrow, color: "var(--mustard)", marginBottom: "10px" }}>Go deeper</div>
                          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                            {active.related.map((r) => (
                              <Link key={r.href} href={r.href} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
                                {r.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/wisdom" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Wisdom for All of Life</Link>
            <Link href="/life/wisdom-for-all-of-life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The deep guide</Link>
            <Link href="/tools/bible-on" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Browse by topic</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
