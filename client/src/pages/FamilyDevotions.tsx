/**
 * Family devotions (/family/devotions) — the full set: 72 weekly devotions
 * (more than a year at one a week), plus seasonal devotionals for
 * Thanksgiving, Advent, and Holy Week.
 * Data: /family-devotions.json + /family-devotions-2.json (weekly), and
 * /family-seasonal.json (thanksgiving, advent, holyWeek).
 * A seasonal tab appears only once its pack has days in the data.
 * scripts/validate-family.mjs checks the counts this page states.
 * ?season=advent (or thanksgiving, holy-week) opens that tab, and &day=N
 * opens that day, so Home and /family can link straight to tonight.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { GeneratedCover } from "@/components/GeneratedCover";
import ScriptureNote from "@/components/ScriptureNote";
import LoadFailed from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { familySetDayOn, localISODate } from "@/lib/familyYear";
import { adventSeasonFor, longDate } from "@/lib/familyAdvent";

interface Weekly {
  id: string; title: string; theme: string; passage: string; passageText: string;
  bigIdea: string; reflection: string; questions: string[]; activity: string; prayer: string;
}
interface Daily {
  day: number; label: string; title: string; passage: string; passageText: string;
  reflection: string; question: string; prayer: string;
}

type Tab = "weekly" | "thanksgiving" | "advent" | "holyWeek";
type Season = Exclude<Tab, "weekly">;

// Each seasonal pack's name and the booklet files scripts/lib/help-printables.mjs builds for it.
const SEASONS: Record<Season, { label: string; file: string }> = {
  thanksgiving: { label: "Thanksgiving", file: "thanksgiving" },
  advent: { label: "Advent", file: "advent" },
  holyWeek: { label: "Holy Week", file: "holy-week" },
};

function isWeeklyList(x: unknown): x is Weekly[] {
  return Array.isArray(x) && x.every((d) => typeof d?.id === "string" && typeof d?.title === "string" && Array.isArray(d?.questions));
}
function isSeasonalPacks(x: unknown): x is Partial<Record<Season, Daily[]>> {
  return !!x && typeof x === "object" && !Array.isArray(x) && Object.values(x).every((v) => Array.isArray(v));
}

const NO_SEASONS: Record<Season, Daily[]> = { thanksgiving: [], advent: [], holyWeek: [] };

/** The tab and day named in ?season= and &day=, when they are ones this page has. */
function fromUrl(): { tab: Tab; open: string | null } {
  try {
    const p = new URLSearchParams(window.location.search);
    const season = (Object.keys(SEASONS) as Season[]).find((s) => SEASONS[s].file === p.get("season"));
    if (!season) return { tab: "weekly", open: null };
    const day = Number(p.get("day"));
    return { tab: season, open: Number.isInteger(day) && day > 0 ? `${season}-${day}` : null };
  } catch {
    return { tab: "weekly", open: null };
  }
}

/** Keep the open tab in the address, so "the Advent readings" can be shared. */
function writeTab(tab: Tab) {
  try {
    const qs = tab === "weekly" ? "" : `?season=${SEASONS[tab].file}`;
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs}`);
  } catch {
    /* the address stays as it was */
  }
}

export default function FamilyDevotions() {
  // Loading, failed, and loaded are distinct states keyed to a retry nonce
  // (the HowTos pattern): a failed fetch offers a retry instead of
  // "Loading…" forever. The three files arrive together or not at all.
  const [loaded, setLoaded] = useState<{ weekly: Weekly[]; seasonal: Record<Season, Daily[]> } | null>(null);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const failed = failedAt === nonce;
  const [initial] = useState(fromUrl);
  const [tab, setTab] = useState<Tab>(initial.tab);
  const [open, setOpen] = useState<string | null>(initial.open);
  // Tonight's day of a seasonal set, from the reader's own clock and the year map.
  const [today] = useState(() => localISODate());
  const tonight = familySetDayOn(today);
  const advent = adventSeasonFor(today);
  // A day opened from a link is scrolled to once the data is in.
  const scrolled = useRef(false);

  useEffect(() => {
    let live = true;
    Promise.all([
      fetchJson("/family-devotions.json", isWeeklyList),
      fetchJson("/family-devotions-2.json", isWeeklyList),
      fetchJson("/family-seasonal.json", isSeasonalPacks),
    ])
      .then(([a, b, s]) => {
        if (live) setLoaded({ weekly: [...a, ...b], seasonal: { thanksgiving: s.thanksgiving ?? [], advent: s.advent ?? [], holyWeek: s.holyWeek ?? [] } });
      })
      .catch(() => { if (live) setFailedAt(nonce); });
    return () => { live = false; };
  }, [nonce]);

  useEffect(() => {
    if (!loaded || scrolled.current || !initial.open) return;
    scrolled.current = true;
    document.getElementById(initial.open)?.scrollIntoView?.({ block: "start" });
  }, [loaded, initial.open]);

  const weekly = useMemo(() => loaded?.weekly ?? [], [loaded]);
  const seasonal = loaded?.seasonal ?? NO_SEASONS;

  const tabs: { id: Tab; label: string; count: number }[] = useMemo(() => [
    { id: "weekly" as Tab, label: "Weekly", count: weekly.length },
    ...(Object.keys(SEASONS) as Season[])
      .filter((s) => seasonal[s].length > 0)
      .map((s) => ({ id: s as Tab, label: SEASONS[s].label, count: seasonal[s].length })),
  ], [weekly.length, seasonal]);

  const Accordion = ({ id, anchor, eyebrow, title, children }: { id: string; anchor?: string; eyebrow: string; title: string; children: React.ReactNode }) => {
    const isOpen = open === id;
    return (
      <div id={anchor} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden", scrollMarginTop: "var(--s-6)" }}>
        <button type="button" onClick={() => setOpen(isOpen ? null : id)} aria-expanded={isOpen}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
            <span aria-hidden="true" style={{ display: "block", width: "54px", flexShrink: 0, aspectRatio: "3 / 4", overflow: "hidden", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
              <GeneratedCover title={title} eyebrow="Family Devotions" variant="cream" style={{ width: "100%", height: "100%" }} />
            </span>
            <span style={{ minWidth: 0 }}>
              <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{eyebrow}</span>
              <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginTop: "4px" }}>{title}</span>
            </span>
          </span>
          <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
        </button>
        {isOpen && <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>{children}</div>}
      </div>
    );
  };

  const Verse = ({ passage, text }: { passage: string; text: string }) => (
    <>
      <p style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", margin: "16px 0 4px" }}>{passage}</p>
      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", fontStyle: "italic", marginBottom: "16px" }}>{text}</p>
    </>
  );
  const Prayer = ({ text }: { text: string }) => (
    <p style={{ fontFamily: "var(--F)", fontSize: "15px", fontStyle: "italic", lineHeight: 1.7, color: "var(--ink-muted)", borderLeft: "2px solid var(--mustard)", paddingLeft: "14px" }}>{text}</p>
  );

  const list = tab === "weekly" ? weekly : seasonal[tab];

  return (
    <Layout>
      <SEOMeta
        title="Family Devotions: Weekly, Thanksgiving, Advent, and Holy Week"
        description="Seventy-two weekly family devotions, more than a year of them, plus daily devotionals for Thanksgiving week, Advent, and Holy Week, each with a passage, a question, and a prayer."
        url="https://www.livewellbyjamesbell.co/family/devotions"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/family" style={{ color: "inherit" }}>Family</Link> · Devotions
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            A devotion a week, together.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", maxWidth: "62ch" }}>
            Seventy-two weekly devotions, more than a year of them, plus daily readings to walk your family through Thanksgiving week, Advent, and Holy Week. Each one is short, a passage and a question and something to do together and a prayer, made for the table or the couch.
          </p>
        </div>
      </section>

      {/* TABS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {tabs.map((t) => (
            <button key={t.id} type="button" aria-pressed={tab === t.id} onClick={() => { setTab(t.id); setOpen(null); writeTab(t.id); }}
              style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "10px 16px", borderRadius: "999px", cursor: "pointer",
                border: `1px solid ${tab === t.id ? "var(--mustard)" : "var(--border)"}`, background: tab === t.id ? "var(--bone-warm)" : "transparent", color: "var(--ink)" }}>
              {t.label}{t.count ? ` · ${t.count}` : ""}
            </button>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "10px" }}>
          {failed && (
            <LoadFailed what="The family devotions" onRetry={() => setNonce((n) => n + 1)} backHref="/family" backLabel="Back to Family" />
          )}
          {!loaded && !failed && (
            <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading…</p>
          )}
          {/* Numbered as a place in the set, not as weeks of a year: there
              are more devotions than weeks. */}
          {tab === "weekly" && weekly.map((d, i) => (
            <Accordion key={d.id} id={d.id} eyebrow={`${i + 1} of ${weekly.length} · ${d.theme}`} title={d.title}>
              <Verse passage={d.passage} text={d.passageText} />
              <p style={{ fontFamily: "var(--F)", fontSize: "17px", color: "var(--ink)", marginBottom: "12px" }}>{d.bigIdea}</p>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "16px", whiteSpace: "pre-line" }}>{d.reflection}</p>
              <div className="eyebrow" style={{ marginBottom: "8px" }}>Talk about it</div>
              <ul style={{ margin: "0 0 16px", paddingLeft: "20px", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.8, color: "var(--ink)" }}>
                {d.questions.map((q, j) => <li key={j}>{q}</li>)}
              </ul>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}><strong>Try this together.</strong> {d.activity}</p>
              <Prayer text={d.prayer} />
            </Accordion>
          ))}
          {/* The seasonal devotions retell each passage in plain words for
              children; the weekly ones quote the Berean Standard Bible word
              for word (scripts/validate-family.mjs). Say which. */}
          {loaded && <ScriptureNote rendering={tab === "weekly" ? "bsb" : "paraphrase"} />}
          {tab === "weekly" && weekly.length > 0 && (
            <p style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
              Print every weekly devotion as a card for the table, two to a page, each passage in full:{" "}
              <a href="/downloads/tools/family-cards-letter.pdf" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>US Letter</a>{" · "}
              <a href="/downloads/tools/family-cards-a4.pdf" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>A4</a>
            </p>
          )}
          {/* The set is a December 1 to 25 calendar; Advent itself begins on
              Advent Sunday. Say both, so no one reads December 1 as Advent's start. */}
          {tab === "advent" && seasonal.advent.length > 0 && (
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", margin: 0, maxWidth: "68ch" }}>
              Advent begins on the fourth Sunday before Christmas{advent ? ` (${longDate(advent.adventSunday, { weekday: false, year: true })})` : ""}. This calendar has a reading for each day from December 1 to Christmas Day.
            </p>
          )}
          {tab !== "weekly" && (
            <p style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
              Print the whole {SEASONS[tab].label} booklet, one day to a page, with each passage in full from the Berean Standard Bible:{" "}
              <a href={`/downloads/seasonal/${SEASONS[tab].file}-family-letter.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>US Letter</a>{" · "}
              <a href={`/downloads/seasonal/${SEASONS[tab].file}-family-a4.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>A4</a>
            </p>
          )}
          {tab !== "weekly" && (list as Daily[]).map((d) => (
            <Accordion key={`${tab}-${d.day}`} id={`${tab}-${d.day}`} anchor={`${tab}-${d.day}`}
              eyebrow={tonight?.set === tab && tonight.day === d.day ? `${d.label} · Tonight` : d.label} title={d.title}>
              <Verse passage={d.passage} text={d.passageText} />
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "16px" }}>{d.reflection}</p>
              <div className="eyebrow" style={{ marginBottom: "8px" }}>Talk about it</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "16px" }}>{d.question}</p>
              <Prayer text={d.prayer} />
            </Accordion>
          ))}
        </div>
      </section>
    </Layout>
  );
}
