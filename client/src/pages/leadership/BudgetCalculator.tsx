/**
 * The Giving and Budget Calculator (/leadership/budget). Think through a church
 * budget out loud: enter annual giving, allocate it across categories, and see
 * the dollar figures and how each line compares to a healthy range. The ranges
 * are guides, not laws. Stateless, saved to the browser, no login.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { copyToClipboard } from "@/lib/clipboard";
import { isArrayOf, readStoredJSON, writeStoredJSON } from "@/lib/storage";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const KEY = "livewell-budget";

interface Cat { id: string; name: string; pct: number; lo: number; hi: number; note: string; }

// Saved categories are trusted only whole: the six lines are a fixed structure,
// so one corrupt entry means the save is not — fall back to the defaults rather
// than render "$NaN" or a partial budget.
const isCat = (x: unknown): x is Cat => {
  const c = x as Cat;
  return !!c && typeof c === "object" && typeof c.id === "string" && typeof c.name === "string" &&
    typeof c.pct === "number" && typeof c.lo === "number" && typeof c.hi === "number";
};
const isSaved = (x: unknown): x is { income?: unknown; cats?: unknown } => !!x && typeof x === "object";

const INCOME_MAX = 100000000;
const clampIncome = (v: unknown) => Math.min(INCOME_MAX, Math.max(0, Number(v) || 0));
// The slider's 0–70 cap, applied to the number twin too.
const clampPct = (v: unknown) => Math.min(70, Math.max(0, Number(v) || 0));

const DEFAULTS: Cat[] = [
  { id: "personnel", name: "Personnel (salaries, benefits)", pct: 48, lo: 40, hi: 55, note: "The largest line in most churches. Above the high end and ministry gets starved to pay staff. Below the low end and you are underpaying the people who carry the load." },
  { id: "facilities", name: "Facilities (building, utilities, upkeep)", pct: 18, lo: 15, hi: 25, note: "A building is a tool, not the mission. When it climbs past the high end, the tail is wagging the dog." },
  { id: "ministry", name: "Ministry and programs", pct: 12, lo: 10, hi: 20, note: "The actual work: discipleship, worship, children, youth, care. Protect this line." },
  { id: "missions", name: "Missions and benevolence", pct: 12, lo: 10, hi: 20, note: "What the church gives away. A church that keeps everything for itself has stopped being a church and become a club. Aim high here, not low." },
  { id: "admin", name: "Administration and operations", pct: 6, lo: 4, hi: 10, note: "The unglamorous overhead that keeps the lights on and the books clean. Necessary, but watch it creep." },
  { id: "reserves", name: "Reserves and debt", pct: 4, lo: 3, hi: 10, note: "Savings and any debt service. A church with no reserve is one furnace away from a crisis. A church drowning in debt has mortgaged tomorrow's ministry." },
];

const money = (n: number) => "$" + Math.round(n).toLocaleString();

export default function BudgetCalculator() {
  const [income, setIncome] = useState(300000);
  const [cats, setCats] = useState<Cat[]>(DEFAULTS);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [persistFailed, setPersistFailed] = useState(false);

  useEffect(() => {
    const o = readStoredJSON(KEY, isSaved, {});
    // != null, not truthy: a saved income of 0 is a real value, not an absence.
    if (o.income != null) setIncome(clampIncome(o.income));
    if (isArrayOf(isCat)(o.cats) && o.cats.length > 0) setCats(o.cats);
  }, []);
  useEffect(() => { const t = setTimeout(() => setPersistFailed(!writeStoredJSON(KEY, { income, cats })), 400); return () => clearTimeout(t); }, [income, cats]);

  const totalPct = useMemo(() => cats.reduce((s, c) => s + (Number(c.pct) || 0), 0), [cats]);
  const setPct = (id: string, pct: number) => setCats((cs) => cs.map((c) => (c.id === id ? { ...c, pct } : c)));

  // "Copied" only after a copy actually happened (audit 15 H1).
  const copy = async () => {
    let out = `Church budget on ${money(income)} annual giving\n\n`;
    for (const c of cats) out += `${c.name}: ${c.pct}%  ${money(income * c.pct / 100)}\n`;
    out += `\nAllocated: ${totalPct}%`;
    const ok = await copyToClipboard(out);
    setCopyStatus(ok ? "copied" : "failed");
    if (ok) setTimeout(() => setCopyStatus("idle"), 2000);
  };

  return (
    <Layout>
      <SEOMeta title="The Giving and Budget Calculator — Allocate a Church Budget" description="Think through a church budget: enter annual giving, allocate across categories, and see how each line compares to a healthy range. The ranges are guides." url="https://www.livewellbyjamesbell.co/leadership/budget" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The budget calculator</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px" }}>A budget is a theology in numbers.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "58ch" }}>Show a church its budget and it will tell you what that church actually worships. Allocate the giving here and watch the dollars land. The ranges are guides drawn from healthy churches, not commandments.</p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, maxWidth: "760px" }}>
          <label htmlFor="budget-income" style={{ display: "block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>Annual giving</label>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--s-4)" }}>
            <span style={{ fontFamily: "var(--F)", fontSize: "24px", color: "var(--ink-muted)" }}>$</span>
            <input id="budget-income" type="number" min={0} max={INCOME_MAX} value={income} onChange={(e) => setIncome(clampIncome(e.target.value))} style={{ flex: 1, fontFamily: "var(--F)", fontSize: "24px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)" }} />
          </div>

          {cats.map((c) => {
            const dollars = income * c.pct / 100;
            const inRange = c.pct >= c.lo && c.pct <= c.hi;
            return (
              <div key={c.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: `3px solid ${inRange ? "var(--mustard)" : "#b4541f"}`, borderRadius: "var(--radius-sm)", padding: "var(--s-3) var(--s-4)", marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                  <strong style={{ fontFamily: "var(--F)", fontSize: "18px", color: "var(--ink)" }}>{c.name}</strong>
                  <span style={{ fontFamily: "var(--F)", fontSize: "20px", color: "var(--mustard-text)" }}>{money(dollars)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0 6px" }}>
                  <input type="range" min={0} max={70} value={c.pct} onChange={(e) => setPct(c.id, Number(e.target.value))} aria-label={`${c.name} percent`} style={{ flex: 1, accentColor: "var(--mustard)" }} />
                  <input type="number" min={0} max={70} value={c.pct} onChange={(e) => setPct(c.id, clampPct(e.target.value))} aria-label={`${c.name} percent`} style={{ width: "60px", fontFamily: "var(--U)", fontSize: "14px", padding: "6px 8px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--ink)" }} />
                  <span style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}>%</span>
                </div>
                <p style={{ fontFamily: "var(--U)", fontSize: "12px", color: inRange ? "var(--ink-muted)" : "#b4541f", marginBottom: "4px" }}>Healthy range {c.lo} to {c.hi}%{inRange ? "" : c.pct < c.lo ? " · below the range" : " · above the range"}</p>
                <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", lineHeight: 1.6 }}>{c.note}</p>
              </div>
            );
          })}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--s-3) var(--s-4)", background: totalPct === 100 ? "var(--bone-warm)" : "rgba(180,84,31,0.1)", borderRadius: "var(--radius-sm)", marginTop: "var(--s-3)" }}>
            <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", color: "var(--ink)" }}>Allocated</span>
            <span style={{ fontFamily: "var(--F)", fontSize: "22px", color: totalPct === 100 ? "var(--mustard-text)" : "#b4541f" }}>{totalPct}%{totalPct !== 100 ? ` (${totalPct < 100 ? "+" : ""}${100 - totalPct} to place)` : ""}</span>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
            <button onClick={copy} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Copy the budget</button>
            {copyStatus === "copied" && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copied</span>}
            {copyStatus === "failed" && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copy failed — select and copy manually.</span>}
          </div>
          {persistFailed && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "8px" }}>Couldn't save to this browser — your work here will not survive a reload.</p>}
        </div>
      </section>
    </Layout>
  );
}
