/**
 * Pillar 2 — Church history (/theology/history). A walkable narrative of the
 * church across two thousand years: the timeline by era, the great councils
 * that fixed the creeds, the heresies the church had to reject (used as a
 * teaching tool), and profiles of the people who carried the faith. Content:
 * /theology/church-history-timeline.json, -councils.json, -heresies.json,
 * and -figures.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Prose } from "@/lib/prose";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";

interface EraEvent { year: string; title: string; note: string; }
interface Era { id: string; name: string; range: string; summary: string; events: EraEvent[]; }
interface Council { name: string; year: string; place: string; ecumenical: boolean; calledOver: string; decided: string; gaveUs: string; rejected: string; }
interface Heresy { name: string; era: string; claim: string; whyItAppealed: string; theChurchSaid: string; answeredBy: string; stillSeenAs: string; }
interface Figure { name: string; dates: string; era: string; place: string; role: string; summary: string; whyTheyMatter: string; }

type Tab = "timeline" | "councils" | "heresies" | "figures";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const cardStyle = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" } as const;

export default function TheologyHistory() {
  const [eras, setEras] = useState<Era[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);
  const [heresies, setHeresies] = useState<Heresy[]>([]);
  const [figures, setFigures] = useState<Figure[]>([]);
  const [tab, setTab] = useState<Tab>("timeline");
  const [openEra, setOpenEra] = useState<string | null>(null);
  const [essays, setEssays] = useState<{ slug: string; title: string; blurb: string; era: string; dateRange: string }[]>([]);

  useEffect(() => {
    const get = (f: string) => fetch(f).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    get("/theology/church-history-timeline.json").then((d) => { if (d?.eras) { setEras(d.eras); setOpenEra(d.eras[0]?.id ?? null); } });
    get("/theology/church-history-councils.json").then((d) => d?.councils && setCouncils(d.councils));
    get("/theology/church-history-heresies.json").then((d) => d?.heresies && setHeresies(d.heresies));
    get("/theology/church-history-figures.json").then((d) => d?.figures && setFigures(d.figures));
    get("/history/essays-index.json").then((d) => d?.essays && setEssays(d.essays));
  }, []);

  const figuresByEra = useMemo(() => {
    const order = ["Early Church", "Age of the Councils", "Medieval", "Reformation", "Modern"];
    const map = new Map<string, Figure[]>();
    for (const f of figures) { if (!map.has(f.era)) map.set(f.era, []); map.get(f.era)!.push(f); }
    const known = order.filter((e) => map.has(e)).map((e) => ({ era: e, items: map.get(e)! }));
    const extra = Array.from(map.keys()).filter((e) => !order.includes(e)).map((e) => ({ era: e, items: map.get(e)! }));
    return [...known, ...extra];
  }, [figures]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "timeline", label: "The timeline", count: eras.length },
    { id: "councils", label: "The councils", count: councils.length },
    { id: "heresies", label: "The heresies", count: heresies.length },
    { id: "figures", label: "The people", count: figures.length },
  ];

  return (
    <Layout>
      <SEOMeta
        title="Church History — The Story You Belong To"
        description="A walkable narrative of the church across two thousand years: the timeline by era, the councils, the heresies it rejected, and the people who carried the faith."
        url="https://www.livewellbyjamesbell.co/theology/history"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Pillar Two
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "18ch" }}>
            The story you were born into.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            You did not start the faith. You walked into a story already two thousand years long, carried by martyrs and scholars and ordinary believers who handed it down at great cost. Here is the sweep of it: the eras, the councils that fixed the creeds you confess, the errors the church had to reject, and the people worth meeting.
          </p>
        </div>
      </section>

      {/* NARRATIVE ESSAYS */}
      {essays.length > 0 && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>Read the story</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)" }}>The era essays</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "var(--s-3)" }}>
              {essays.map((e) => (
                <Link key={e.slug} href={`/theology/history/${e.slug}`} style={{ display: "block", background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>{e.era} · {e.dateRange}</div>
                  <div style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{e.title}</div>
                  <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{e.blurb}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <StatementBand tone="dark" eyebrow="The long memory" width="24ch">
        You did not start the faith. You were handed it.
      </StatementBand>

      {/* TABS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) 0" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {tabs.map((t) => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} aria-pressed={tab === t.id}
              style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "10px 16px", borderRadius: "999px", cursor: "pointer",
                border: `1px solid ${tab === t.id ? "var(--mustard)" : "var(--border)"}`, background: tab === t.id ? "var(--bone-warm)" : "transparent", color: "var(--ink)" }}>
              {t.label}{t.count ? ` · ${t.count}` : ""}
            </button>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      {tab === "timeline" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "12px" }}>
            {eras.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading the story…</p>}
            {eras.map((era) => {
              const isOpen = openEra === era.id;
              return (
                <div key={era.id} style={{ ...cardStyle, borderTop: "2px solid var(--mustard)", overflow: "hidden" }}>
                  <button type="button" onClick={() => setOpenEra(isOpen ? null : era.id)} aria-expanded={isOpen}
                    style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span>
                      <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{era.range}</span>
                      <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 500, color: "var(--ink)", marginTop: "4px" }}>{era.name}</span>
                    </span>
                    <ChevronDown size={20} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "6px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                      <div style={{ paddingTop: "16px" }}><Prose text={era.summary} /></div>
                      <div style={{ marginTop: "12px", borderLeft: "2px solid var(--border)", paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
                        {era.events.map((e, i) => (
                          <div key={i}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                              <span style={{ fontFamily: "var(--F)", fontSize: "17px", fontWeight: 500, color: "var(--mustard-text)", minWidth: "70px" }}>{e.year}</span>
                              <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>{e.title}</span>
                            </div>
                            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", marginTop: "2px", maxWidth: "64ch" }}>{e.note}</p>
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
      )}

      {/* COUNCILS */}
      {tab === "councils" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={{ ...wrap }}>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", marginBottom: "var(--s-4)", fontStyle: "italic" }}>
              The creeds were not handed down from the sky. The whole church gathered, usually in a crisis, and worked out how to say a true thing clearly. Here is what each council faced and what it gave us.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {councils.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
              {councils.map((c, i) => (
                <div key={i} style={{ ...cardStyle, padding: "var(--s-4)", borderLeft: `3px solid ${c.ecumenical ? "var(--mustard)" : "var(--border)"}` }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline", marginBottom: "10px" }}>
                    <span style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)" }}>{c.name}</span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{c.year}{c.place ? ` · ${c.place}` : ""}</span>
                  </div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "10px" }}><strong style={{ color: "var(--ink)" }}>The crisis.</strong> {c.calledOver}</p>
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "10px" }}>{c.decided}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {c.gaveUs && <div style={{ flex: "1 1 220px" }}><div className="eyebrow" style={{ marginBottom: "4px" }}>What it gave us</div><p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{c.gaveUs}</p></div>}
                    {c.rejected && <div style={{ flex: "1 1 220px" }}><div className="eyebrow" style={{ marginBottom: "4px" }}>What it rejected</div><p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{c.rejected}</p></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HERESIES */}
      {tab === "heresies" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={{ ...wrap }}>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", marginBottom: "var(--s-4)", fontStyle: "italic" }}>
              The church often learned what it believed by facing what it could not accept. Each of these was sincere, attractive, and wrong in a way that mattered. Many still return today in new clothes.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
              {heresies.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
              {heresies.map((h, i) => (
                <div key={i} style={{ ...cardStyle, padding: "var(--s-4)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", marginBottom: "10px" }}>
                    <span style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)" }}>{h.name}</span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{h.era}</span>
                  </div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)", marginBottom: "8px", fontStyle: "italic" }}>{h.claim}</p>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "8px" }}><strong style={{ color: "var(--ink)" }}>Why it appealed.</strong> {h.whyItAppealed}</p>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "8px" }}><strong style={{ color: "var(--ink)" }}>What the church said.</strong> {h.theChurchSaid}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
                    {h.answeredBy && <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--mustard-text)", fontWeight: 600 }}>Answered by {h.answeredBy}</span>}
                  </div>
                  {h.stillSeenAs && <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "8px" }}><strong style={{ color: "var(--ink)" }}>Still seen as.</strong> {h.stillSeenAs}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FIGURES */}
      {tab === "figures" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={{ ...wrap }}>
            {figures.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
            {figures.length > 0 && <SectionArt seed="history-figures" />}
            {figuresByEra.map(({ era, items }) => (
              <div key={era} style={{ marginBottom: "var(--s-5)" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>{era}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {items.map((f, i) => (
                    <div key={i} style={{ ...cardStyle, padding: "var(--s-4)" }}>
                      <div style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)" }}>{f.name}</div>
                      <div style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--mustard-text)", fontWeight: 600, margin: "2px 0 2px" }}>{f.dates}</div>
                      <div style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", marginBottom: "10px" }}>{f.role}{f.place ? ` · ${f.place}` : ""}</div>
                      <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "8px" }}>{f.summary}</p>
                      <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink)" }}><strong>Why they matter.</strong> {f.whyTheyMatter}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER NAV */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/theology" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>All of Theological Depth</Link>
          <Link href="/theology/doctrine/god-and-trinity" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>See where the creeds came from →</Link>
        </div>
      </section>
    </Layout>
  );
}
