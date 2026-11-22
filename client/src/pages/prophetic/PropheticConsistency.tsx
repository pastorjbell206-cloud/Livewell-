/**
 * The Consistency Check, the flagship tool of Prophetic Disruption. A searching
 * self-examination of whether the reader defends truth selectively, one
 * standard for their own tribe and another for their opponents. A mirror, not a
 * scorecard, and explicitly not a weapon against others. Config-driven so it can
 * serve any section that ships a consistency-check.json.
 *
 * The tests a reader marks are kept on this device (lib/storage), so a slow
 * examen can be left and come back to. Once anything is marked, the page
 * reads the reader's own marks back with the Scripture the examen rests on
 * (quoted from the Berean Standard Bible, each with its reference), prints
 * them as one sheet, and names where to go next (data/tool-next.json). The
 * count is never a score: there is no passing number.
 */
import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { Check, Printer } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import LoadFailed from "@/components/LoadFailed";
import NextStep from "@/components/NextStep";
import ScriptureNote from "@/components/ScriptureNote";
import { VerseRef } from "@/components/VerseRef";
import { ResultNext } from "@/components/tool-shell";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { fetchJson } from "@/lib/fetch-json";
import type { SectionConfig } from "@/lib/prophetic";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { nextPagesFor } from "@/lib/toolNext";

interface Test { id: string; prompt: string; tell: string; }
interface Verse { ref: string; text: string; line: string; }
interface Data { intro: string; note: string; tests: Test[]; closing: string; scripture?: Verse[]; }

export const CONSISTENCY_KEY = "livewell-progress-consistency";

const isData = (x: unknown): x is Data =>
  !!x && typeof x === "object" && typeof (x as Data).intro === "string" && typeof (x as Data).closing === "string" && Array.isArray((x as Data).tests) && (x as Data).tests.every((t) => typeof t?.id === "string" && typeof t?.prompt === "string" && typeof t?.tell === "string");
const isMarks = (x: unknown): x is { v: 1; marked: string[] } =>
  !!x && typeof x === "object" && (x as { v?: unknown }).v === 1 && Array.isArray((x as { marked?: unknown }).marked) && (x as { marked: unknown[] }).marked.every((m) => typeof m === "string");

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
// The old section hub and its topic pages fold into the essay shelf's Faith
// and Power section (vercel.json); link there directly, not through a redirect.
const SECTION_HREF = "/writing?section=faith-and-power";

export default function PropheticConsistency({ config }: { config: SectionConfig }) {
  // Loading, failed and loaded are distinct, keyed to a retry nonce: a failed
  // fetch offers a retry instead of "Loading…" for ever.
  const [loaded, setLoaded] = useState<{ nonce: number; data: Data | null } | null>(null);
  const [nonce, setNonce] = useState(0);
  const [marked, setMarked] = useState<string[]>(() => readStoredJSON(CONSISTENCY_KEY, isMarks, { v: 1 as const, marked: [] }).marked);
  const [kept, setKept] = useState(true);

  useEffect(() => {
    let live = true;
    fetchJson(`${config.base}/consistency-check.json`, isData)
      .then((d) => live && setLoaded({ nonce, data: d }))
      .catch(() => live && setLoaded({ nonce, data: null }));
    return () => { live = false; };
  }, [config.base, nonce]);

  const settled = loaded?.nonce === nonce ? loaded : null;
  const data = settled?.data ?? null;
  const failed = !!settled && !settled.data;

  const toggle = useCallback((id: string) => {
    setMarked((m) => {
      const next = m.includes(id) ? m.filter((x) => x !== id) : [...m, id];
      setKept(writeStoredJSON(CONSISTENCY_KEY, { v: 1, marked: next }));
      return next;
    });
  }, []);
  const clear = () => {
    setMarked([]);
    removeStoredJSON(CONSISTENCY_KEY);
    setKept(true);
  };

  const mine = data ? data.tests.filter((t) => marked.includes(t.id)) : [];
  const markedCount = mine.length;

  return (
    <Layout>
      <SEOMeta title="Do You Hold Your Own Side to the Same Standard?" description="A self-check on whether you defend truth selectively, with one standard for your side and another for your opponents. A mirror, not a weapon." url={`https://www.livewellbyjamesbell.co${config.base}/consistency`} />
      <div className="pc-page">
      <InnerHead path={`${config.base}/consistency`} title="Do you hold your own side to the same standard?" line="One standard, or two?" plate="arch">
        {data && data.intro.split("\n\n").map((p, i) => <p key={i} className="pg-head__lede">{p}</p>)}
      </InnerHead>

      {!settled && <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--gutter)" }}><p style={{ ...wrap, fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center" }} role="status">Loading…<span hidden data-lw-loading /></p></section>}
      {failed && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--gutter)" }}>
          <LoadFailed what="The self-check" onRetry={() => setNonce((n) => n + 1)} backHref="/tools" backLabel="Back to the tools" />
        </section>
      )}

      {data && (
        <>
          <section style={{ background: "var(--bone-warm)", padding: "var(--s-4) var(--gutter)" }}>
            <div style={wrap}>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", fontStyle: "italic", maxWidth: "68ch", margin: "0 auto", borderLeft: "3px solid var(--mustard)", paddingLeft: "16px" }}>{data.note}</p>
            </div>
          </section>

          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--gutter) var(--s-6)" }}>
            <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>
                Mark the ones that land. Your marks stay on this device, so you can leave and come back.
              </p>
              {data.tests.map((t, i) => {
                const on = marked.includes(t.id);
                return (
                  <button key={t.id} type="button" onClick={() => toggle(t.id)} aria-pressed={on} className={`pc-test${on ? " is-on" : ""}`}>
                    <span aria-hidden className="pc-test__mark">
                      {on && <Check size={15} strokeWidth={3} />}
                    </span>
                    <span>
                      <span className="pc-test__prompt">{i + 1}. {t.prompt}</span>
                      {on && <span className="pc-test__tell">{t.tell}</span>}
                    </span>
                  </button>
                );
              })}
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }} aria-live="polite">
                {!kept ? SAVE_FAILED : ""}
              </p>
            </div>
          </section>

          {/* WHAT YOU MARKED, READ BACK WITH THE SCRIPTURE IT RESTS ON */}
          {markedCount > 0 && (
            <section className="pc-reading print-paper" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--gutter)" }} aria-labelledby="pc-reading-h">
              <div style={wrap}>
                <p className="eyebrow">Your examen</p>
                <h2 id="pc-reading-h" style={{ fontFamily: "var(--F)", fontWeight: 400, fontSize: "var(--fs-h2)", lineHeight: 1.15, color: "var(--ink)", margin: "6px 0 var(--s-2)" }}>
                  {markedCount === 1 ? "One landed. That is enough to start." : `${markedCount} landed. None of us reads this clean.`}
                </h2>
                <p className="pc-text">
                  This is not a score, and there is no number that passes. These are the places you named yourself. Take {markedCount === 1 ? "it" : "one of them"} into this week and watch for the next time it happens.
                </p>
                <ol className="pc-mine">
                  {mine.map((t) => (
                    <li key={t.id}>
                      <span className="pc-mine__prompt">{t.prompt}</span>
                      <span className="pc-mine__tell">{t.tell}</span>
                    </li>
                  ))}
                </ol>
                {data.scripture && data.scripture.length > 0 && (
                  <>
                    <h3 className="eyebrow" style={{ margin: "var(--s-4) 0 var(--s-2)" }}>What Scripture says about two standards</h3>
                    {data.scripture.map((v) => (
                      <div key={v.ref} className="pc-verse">
                        <p className="pc-verse__text">{v.text}</p>
                        <p className="pc-verse__ref"><VerseRef reference={v.ref} mode="link" /></p>
                        <p className="pc-text">{v.line}</p>
                      </div>
                    ))}
                    <ScriptureNote rendering="bsb" />
                  </>
                )}
                <div className="pc-actions no-print">
                  <button type="button" className="btn btn--quiet" onClick={() => window.print()}>
                    <Printer aria-hidden="true" size={16} strokeWidth={1.75} />
                    Print my examen
                  </button>
                  <button type="button" className="btn btn--text" onClick={clear}>
                    Clear my marks
                  </button>
                </div>
                <div className="no-print">
                  <ResultNext steps={nextPagesFor("consistency", "two-standards")} />
                </div>
              </div>
            </section>
          )}

          <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--gutter)", color: "var(--bone)" }}>
            <div style={wrap}>
              {data.closing.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 400, lineHeight: 1.5, color: "var(--bone)", maxWidth: "60ch", marginBottom: "14px" }}>{p}</p>)}
              <div style={{ marginTop: "var(--s-4)" }}>
                <Link href={SECTION_HREF} style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Read the essays on faith and power →</Link>
              </div>
              <NextStep dark id="which-lens" line="Thirteen choices that show what is bending the way you read the Bible." />
            </div>
          </section>
        </>
      )}
      </div>
    </Layout>
  );
}
