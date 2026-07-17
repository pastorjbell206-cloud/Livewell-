/**
 * The Scorecard (/nation/scorecard). An even-handed measure, theme by theme, of
 * how close the left, the center, and the right come to the Bible. The whole
 * point is that no party is the kingdom: the running tally is meant to come out
 * split, the right nearer on some themes, the left on others, the center often
 * mixed. Data: /nation/scorecard.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

interface Score { verdict: string; note: string; }
interface Theme { name: string; biblicalTeaching: string; scores: { left: Score; center: Score; right: Score }; }
interface Party { id: "left" | "center" | "right"; label: string; }
interface Data { intro: string; parties: Party[]; themes: Theme[]; closing: string; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const VERDICT: Record<string, string> = { Nearer: "#3E5C3A", Further: "#7A1F1F", Mixed: "#8A5A00" };

export default function NationScorecard() {
  const [data, setData] = useState<Data | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/nation/scorecard.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) { setData(d); setOpen(d.themes?.[0]?.name ?? null); } })
      .catch(() => {});
  }, []);

  const tally = useMemo(() => {
    const t = { left: 0, center: 0, right: 0 };
    for (const th of data?.themes ?? []) for (const p of ["left", "center", "right"] as const) if (th.scores[p].verdict === "Nearer") t[p]++;
    return t;
  }, [data]);

  const Badge = ({ v }: { v: string }) => (
    <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: VERDICT[v] ?? "var(--ink-muted)", background: `${VERDICT[v] ?? "#5A5448"}1A`, border: `1px solid ${VERDICT[v] ?? "#5A5448"}55`, borderRadius: "999px", padding: "3px 10px" }}>{v}</span>
  );

  return (
    <Layout>
      <SEOMeta title="The Scorecard — How Close Is Each Party to the Bible?" description="An even-handed measure, theme by theme, of how near the left, center, and right come to the teaching of Scripture. No party is the kingdom of God." url="https://www.livewellbyjamesbell.co/nation/scorecard" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/nation" style={{ color: "inherit" }}>Christ and the Nation</Link> · The scorecard
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>How close is each party to the Bible?</h1>
          {data && <div style={{ maxWidth: "64ch" }}>{data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", marginBottom: "12px" }}>{p}</p>)}</div>}
        </div>
      </section>

      {/* TALLY */}
      {data && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-4)" }}>
          <div style={{ ...wrap, textAlign: "center" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Themes where each lands nearer the text</div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "24px" }}>
              {(["left", "center", "right"] as const).map((p) => (
                <div key={p}>
                  <div style={{ fontFamily: "var(--F)", fontSize: "40px", fontWeight: 500, color: "var(--ink)" }}>{tally[p]}</div>
                  <div style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink-muted)" }}>{data.parties.find((x) => x.id === p)?.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", fontStyle: "italic", marginTop: "12px", maxWidth: "56ch", marginLeft: "auto", marginRight: "auto" }}>
              However it splits, read it as the verdict it is meant to be. No column adds up to the kingdom of God.
            </p>
          </div>
        </section>
      )}

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "10px" }}>
          {!data && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          {data?.themes.map((th) => {
            const isOpen = open === th.name;
            return (
              <div key={th.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                <button type="button" onClick={() => setOpen(isOpen ? null : th.name)} aria-expanded={isOpen}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)" }}>{th.name}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ display: "flex", gap: "4px" }}>
                      {(["left", "center", "right"] as const).map((p) => <span key={p} aria-hidden style={{ width: "10px", height: "10px", borderRadius: "50%", background: VERDICT[th.scores[p].verdict] ?? "#5A5448" }} />)}
                    </span>
                    <ChevronDown size={18} aria-hidden style={{ color: "var(--ink-muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", margin: "16px 0", background: "var(--bone-warm)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                      <strong style={{ color: "var(--mustard-text)" }}>What Scripture teaches. </strong>{th.biblicalTeaching}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                      {(["left", "center", "right"] as const).map((p) => (
                        <div key={p} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                            <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, color: "var(--ink)" }}>{data.parties.find((x) => x.id === p)?.label}</span>
                            <Badge v={th.scores[p].verdict} />
                          </div>
                          <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{th.scores[p].note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {data?.closing && (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--charcoal-fg)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>The verdict</div>
            {data.closing.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 400, lineHeight: 1.5, color: "var(--charcoal-fg)", maxWidth: "60ch", marginBottom: "14px" }}>{p}</p>)}
            <Link href="/nation/policy" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>What biblical policy might look like →</Link>
          </div>
        </section>
      )}
    </Layout>
  );
}
