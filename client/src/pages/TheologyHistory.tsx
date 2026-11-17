/**
 * Pillar 2 — Church history (/theology/history). Two thousand years of the
 * church as one course: fourteen essays in order (the eight longer ones sit
 * under their era as "Go deeper"), a timeline to step through year by year,
 * the councils that fixed the creeds, the heresies the church had to reject,
 * and the people who carried the faith. The tab row sits at the top; every
 * person, council and heresy has its own anchor (lib/historyCourse entryId),
 * so a name tapped here or in an essay lands on that entry. Content:
 * /theology/church-history-timeline.json, -councils.json, -heresies.json,
 * -figures.json and /history/essays-index.json.
 */
import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Prose } from "@/lib/prose";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";
import { SectionHead } from "@/components/editorial/SectionHead";
import SubjectShelf from "@/components/SubjectShelf";
import HistoryTimeline from "@/components/history/HistoryTimeline";
import { subjectById } from "@/lib/subjects";
import { readStoredJSON } from "@/lib/storage";
import {
  COURSE_PLACE_KEY, buildNameIndex, courseEssays, deeperEssays, entryId, isCoursePlace, kindOfAnchor, splitNames,
  type Council, type EntryKind, type Era, type Figure, type Heresy, type HistoryEssayEntry,
} from "@/lib/historyCourse";

type Tab = "course" | "timeline" | "councils" | "heresies" | "figures";

const TAB_OF_KIND: Record<EntryKind, Tab> = { person: "figures", council: "councils", heresy: "heresies" };
// A link may also name a tab: /theology/history#timeline.
const TAB_OF_HASH: Record<string, Tab> = { course: "course", timeline: "timeline", councils: "councils", heresies: "heresies", people: "figures" };

/** What the address asks for: an entry (its tab and its anchor) or a tab. */
function fromHash(): { tab: Tab; target: string | null } | null {
  if (typeof window === "undefined") return null;
  const id = decodeURIComponent(window.location.hash.slice(1));
  const kind = kindOfAnchor(id);
  if (kind) return { tab: TAB_OF_KIND[kind], target: id };
  return TAB_OF_HASH[id] ? { tab: TAB_OF_HASH[id], target: null } : null;
}

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const cardStyle = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" } as const;

// The heresies and the people are reference entries, not links: a plain
// bordered block each (no hover lift), two columns from 900px (.ed-split),
// every line at reading size.
const refBlock = { ...cardStyle, padding: "clamp(var(--s-3), 3vw, var(--s-4))" } as const;
const refName = { fontFamily: "var(--F)", fontSize: "clamp(22px, 2.4vw, 26px)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)", margin: 0 } as const;
const refText = { fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" } as const;
const refNote = { fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)" } as const;

export default function TheologyHistory() {
  const [eras, setEras] = useState<Era[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);
  const [heresies, setHeresies] = useState<Heresy[]>([]);
  const [figures, setFigures] = useState<Figure[]>([]);
  const [tab, setTab] = useState<Tab>(() => fromHash()?.tab ?? "course");
  // The entry a link asked for; it is scrolled to once its tab has rendered.
  const [target, setTarget] = useState<string | null>(() => fromHash()?.target ?? null);
  const [openEra, setOpenEra] = useState<string | null>(null);
  const [essays, setEssays] = useState<HistoryEssayEntry[]>([]);
  // Where the reader stopped in the course, kept on this device by the essay page.
  const [lastSlug] = useState<string | null>(() => readStoredJSON(COURSE_PLACE_KEY, isCoursePlace, null as { slug: string } | null)?.slug ?? null);

  useEffect(() => {
    const onHash = () => {
      const want = fromHash();
      if (!want) return;
      setTab(want.tab);
      setTarget(want.target);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /** Go to a person's, council's or heresy's own entry, and leave its address in the bar. */
  const openEntry = (kind: EntryKind, name: string) => {
    const id = entryId(kind, name);
    setTab(TAB_OF_KIND[kind]);
    setTarget(id);
    window.history.replaceState(null, "", `#${id}`);
  };
  const chooseTab = (t: Tab) => {
    setTab(t);
    setTarget(null);
    const hash = Object.keys(TAB_OF_HASH).find((k) => TAB_OF_HASH[k] === t);
    window.history.replaceState(null, "", t === "course" ? window.location.pathname : `#${hash}`);
  };

  useEffect(() => {
    if (!target) return;
    const el = document.getElementById(target);
    if (!el) return;
    // Jump, do not glide: a glide started while the page is still laying out
    // (a reader arriving from an essay) stops short of the entry.
    const frame = requestAnimationFrame(() => {
      el.scrollIntoView({ block: "start", behavior: "instant" });
      el.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [target, tab, councils.length, heresies.length, figures.length]);

  useEffect(() => {
    const get = (f: string) => fetch(f).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    get("/theology/church-history-timeline.json").then((d) => { if (d?.eras) setEras(d.eras); });
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

  // Hang everything on the one arc. Each library dates its entries differently
  // (essays by dateRange, councils by year, figures by dates, heresies by
  // century), so every item is resolved to a year and then to the timeline
  // era whose range holds it. The reader opens an era and finds its essay,
  // its councils, its figures, and what was disputed, in one place.
  const eraBounds = useMemo(() => {
    const bounds: { id: string; start: number; end: number }[] = [];
    for (const era of eras) {
      const nums = (era.range.match(/\d+/g) || []).map(Number);
      const start = nums[0] ?? 0;
      const end = /today/i.test(era.range) ? 9999 : (nums[1] ?? start);
      bounds.push({ id: era.id, start, end });
    }
    return bounds;
  }, [eras]);
  const eraIdForYear = (year: number | null): string | null => {
    if (year == null) return null;
    const hit = eraBounds.find((b) => year >= b.start && year < b.end) ?? eraBounds.find((b) => year >= b.start && year <= b.end);
    return hit?.id ?? null;
  };
  const firstYear = (s: string | undefined): number | null => {
    if (!s) return null;
    const m = s.match(/\d{2,4}/);
    return m ? Number(m[0]) : null;
  };
  const centuryYear = (s: string | undefined): number | null => {
    const words: Record<string, number> = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10 };
    const m = (s || "").toLowerCase().match(/(\w+)\s+century/);
    if (!m) return firstYear(s);
    const n = words[m[1]] ?? Number(m[1].replace(/\D/g, ""));
    return n ? (n - 1) * 100 + 50 : null;
  };
  const byEra = useMemo(() => {
    const map = new Map<string, { essays: typeof essays; councils: Council[]; figures: Figure[]; heresies: Heresy[] }>();
    for (const era of eras) map.set(era.id, { essays: [], councils: [], figures: [], heresies: [] });
    const put = (id: string | null, kind: "essays" | "councils" | "figures" | "heresies", item: never) => {
      if (id && map.has(id)) (map.get(id)![kind] as unknown[]).push(item);
    };
    for (const e of essays) {
      const named = eras.find((x) => x.name === e.era)?.id ?? null;
      put(named ?? eraIdForYear(firstYear(e.dateRange)), "essays", e as never);
    }
    for (const c of councils) put(eraIdForYear(firstYear(c.year)), "councils", c as never);
    for (const f of figures) put(eraIdForYear(firstYear(f.dates)), "figures", f as never);
    for (const h of heresies) put(eraIdForYear(centuryYear(h.era)), "heresies", h as never);
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eras, essays, councils, figures, heresies, eraBounds]);

  const course = useMemo(() => courseEssays(essays), [essays]);
  const lastRead = lastSlug ? course.find((e) => e.slug === lastSlug) : undefined;
  const names = useMemo(() => buildNameIndex(figures, councils), [figures, councils]);
  /** A line of an entry with the people and councils it names linked to their own entries. */
  const withNames = (text: string, self: string): ReactNode =>
    splitNames(text, names, new Set([self])).map((piece, i) => {
      if (typeof piece === "string") return piece;
      const id = piece.href.slice(piece.href.indexOf("#") + 1);
      const kind = kindOfAnchor(id);
      const follow = (ev: MouseEvent) => { if (kind) { ev.preventDefault(); openEntry(kind, piece.name); } };
      return <a key={i} href={`#${id}`} className="hx-link" onClick={follow}>{piece.text}</a>;
    });
  const entryClass = (id: string) => `hx-entry${target === id ? " is-target" : ""}`;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "course", label: "The course", count: course.length },
    { id: "timeline", label: "The timeline", count: 0 },
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
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/study" style={{ color: "inherit" }}>Study</Link> · Church history
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "18ch" }}>
            The story you were born into.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            You did not start the faith. You walked into a story already two thousand years long, carried by martyrs and scholars and ordinary believers who handed it down at great cost. Here is the sweep of it: the eras, the councils that fixed the creeds you confess, the errors the church had to reject, and the people worth meeting.
          </p>
        </div>
      </section>

      {/* TABS: the five ways in, straight under the heading */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) 0" }}>
        <div style={wrap} className="hx-tabs" role="tablist" aria-label="Church history">
          {tabs.map((t) => (
            <button key={t.id} type="button" role="tab" id={`hx-tab-${t.id}`} aria-selected={tab === t.id} aria-controls="hx-tabpanel" className="hx-tab" onClick={() => chooseTab(t.id)}>
              {t.label}{t.count ? ` · ${t.count}` : ""}
            </button>
          ))}
        </div>
      </section>

      <div id="hx-tabpanel" role="tabpanel" aria-labelledby={`hx-tab-${tab}`}>
      {/* THE COURSE */}
      {tab === "course" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={wrap}>
            {essays.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading the course…</p>}
            {essays.length > 0 && (
              <>
                <SectionHead
                  eyebrow="Read the story in order"
                  title="The course"
                  intro={`${course.length} essays in order, from Pentecost to the present. Each one ends with a link to the next. The ${essays.length - course.length} longer essays sit under the era they belong to, for when you want to go deeper.`}
                />
                {lastRead && (
                  <p className="hx-continue">
                    You were last reading essay {lastRead.course}.
                    <Link href={`/theology/history/${lastRead.slug}`}>Go back to {lastRead.title}</Link>
                  </p>
                )}
                {eras.map((era) => {
                  const inEra = course.filter((e) => e.era === era.name);
                  const deeper = deeperEssays(essays, era.name);
                  if (!inEra.length && !deeper.length) return null;
                  return (
                    <div key={era.id}>
                      <div className="hx-era-head"><h3>{era.name}</h3><span>{era.range}</span></div>
                      <EditorialIndex
                        label={`${era.name}: the essays`}
                        columns={1}
                        headingAs="h4"
                        items={[
                          ...inEra.map((e) => ({ href: `/theology/history/${e.slug}`, title: e.title, dek: e.blurb, kicker: `Essay ${e.course} of ${course.length} · ${e.dateRange}` })),
                          ...deeper.map((e) => ({ href: `/theology/history/${e.slug}`, title: e.title, dek: e.blurb, kicker: `Go deeper · ${e.dateRange}` })),
                        ]}
                      />
                    </div>
                  );
                })}
                {/* Before the timeline file arrives the course still reads, as one plain list. */}
                {eras.length === 0 && (
                  <EditorialIndex
                    label="The course"
                    columns={1}
                    items={course.map((e) => ({ href: `/theology/history/${e.slug}`, title: e.title, dek: e.blurb, kicker: `Essay ${e.course} of ${course.length} · ${e.dateRange}` }))}
                  />
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* TIMELINE */}
      {tab === "timeline" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={{ ...wrap, marginBottom: "var(--s-5)" }}>
            <HistoryTimeline eras={eras} councils={councils} figures={figures} essays={essays} onOpen={openEntry} />
          </div>
          <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "12px" }}>
            {eras.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading the story…</p>}
            {eras.length > 0 && <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 8px" }}>Each era in full</h2>}
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
                      {(() => {
                        const hung = byEra.get(era.id);
                        if (!hung) return null;
                        const rowLabel = { fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--mustard-text)", marginBottom: "6px" };
                        const quiet = { fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" };
                        const has = hung.essays.length || hung.councils.length || hung.figures.length || hung.heresies.length;
                        if (!has) return null;
                        return (
                          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "16px" }}>
                            {hung.essays.length > 0 && (
                              <div>
                                <div style={rowLabel}>Read this era</div>
                                {hung.essays.map((s) => (
                                  <Link key={s.slug} href={`/theology/history/${s.slug}`} style={{ display: "block", fontFamily: "var(--F)", fontSize: "17px", lineHeight: 1.3, color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px", marginBottom: "8px", width: "fit-content" }}>{s.title}</Link>
                                ))}
                              </div>
                            )}
                            {hung.councils.length > 0 && (
                              <div>
                                <div style={rowLabel}>Councils</div>
                                {hung.councils.map((c) => (
                                  <button key={c.name} type="button" onClick={() => openEntry("council", c.name)} style={{ ...quiet, display: "block", background: "none", border: "none", padding: "6px 0", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "4px", cursor: "pointer", textAlign: "left", color: "var(--ink)", marginBottom: "4px" }}>
                                    {c.name} <span style={{ color: "var(--ink-muted)" }}>· {c.year}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                            {hung.figures.length > 0 && (
                              <div>
                                <div style={rowLabel}>People</div>
                                {hung.figures.map((f) => (
                                  <button key={f.name} type="button" onClick={() => openEntry("person", f.name)} style={{ ...quiet, display: "block", background: "none", border: "none", padding: "6px 0", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "4px", cursor: "pointer", textAlign: "left", color: "var(--ink)", marginBottom: "4px" }}>
                                    {f.name} <span style={{ color: "var(--ink-muted)" }}>· {f.dates}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                            {hung.heresies.length > 0 && (
                              <div>
                                <div style={rowLabel}>What was disputed</div>
                                {hung.heresies.map((h) => (
                                  <button key={h.name} type="button" onClick={() => openEntry("heresy", h.name)} style={{ ...quiet, display: "block", background: "none", border: "none", padding: "6px 0", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "4px", cursor: "pointer", textAlign: "left", color: "var(--ink)", marginBottom: "4px" }}>
                                    {h.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })()}
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
              {councils.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading…</p>}
              {councils.map((c, i) => (
                <div key={i} id={entryId("council", c.name)} tabIndex={-1} className={entryClass(entryId("council", c.name))} style={{ ...cardStyle, padding: "var(--s-4)", borderLeft: `3px solid ${c.ecumenical ? "var(--mustard)" : "var(--border)"}` }}>
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
            {heresies.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading…</p>}
            <div className="ed-split" style={{ gap: "var(--s-3)" }}>
              {heresies.map((h, i) => (
                <div key={i} id={entryId("heresy", h.name)} tabIndex={-1} className={entryClass(entryId("heresy", h.name))} style={refBlock}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "4px 16px", marginBottom: "14px" }}>
                    <h2 style={refName}>{h.name}</h2>
                    <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{h.era}</span>
                  </div>
                  <p style={{ ...refText, color: "var(--ink)", fontStyle: "italic", marginBottom: "12px" }}>{h.claim}</p>
                  <p style={{ ...refText, marginBottom: "12px" }}><strong style={{ color: "var(--ink)" }}>Why it appealed.</strong> {h.whyItAppealed}</p>
                  <p style={refText}><strong style={{ color: "var(--ink)" }}>What the church said.</strong> {h.theChurchSaid}</p>
                  <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border)" }}>
                    {h.answeredBy && <p style={refNote}><strong style={{ color: "var(--ink)" }}>Answered by</strong> {withNames(h.answeredBy, h.name)}</p>}
                  </div>
                  {h.stillSeenAs && <p style={{ ...refNote, marginTop: "10px" }}><strong style={{ color: "var(--ink)" }}>Still seen as.</strong> {h.stillSeenAs}</p>}
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
            {figures.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading…</p>}
            {figures.length > 0 && <SectionArt seed="history-figures" />}
            {figuresByEra.map(({ era, items }) => (
              <div key={era} style={{ marginBottom: "var(--s-5)" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>{era}</h2>
                <div className="ed-split" style={{ gap: "var(--s-3)" }}>
                  {items.map((f, i) => (
                    <div key={i} id={entryId("person", f.name)} tabIndex={-1} className={entryClass(entryId("person", f.name))} style={refBlock}>
                      <h3 style={refName}>{f.name}</h3>
                      <div style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em", color: "var(--mustard-text)", margin: "6px 0 2px" }}>{f.dates}</div>
                      <div style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.5, color: "var(--ink-muted)", marginBottom: "14px" }}>{f.role}{f.place ? ` · ${f.place}` : ""}</div>
                      <p style={{ ...refText, marginBottom: "12px" }}>{withNames(f.summary, f.name)}</p>
                      <p style={{ ...refText, color: "var(--ink)" }}><strong>Why they matter.</strong> {f.whyTheyMatter}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      </div>

      <StatementBand tone="dark" eyebrow="The long memory" width="24ch">
        You did not start the faith. You were handed it.
      </StatementBand>

      {/* FOOTER NAV */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/study" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Everything in Study</Link>
          <Link href="/theology/doctrine/god-and-trinity" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>See where the creeds came from →</Link>
        </div>
      </section>
      {subjectById("church-history") && <SubjectShelf subject={subjectById("church-history")!} />}
    </Layout>
  );
}
