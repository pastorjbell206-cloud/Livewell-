/**
 * The Meeting Builder (/leadership/meeting). Build an agenda that ends in
 * decisions, not fog. Start from a template (elder, staff, deacon, vision),
 * edit the items, and copy it out. Saved to the browser — one autosaved
 * working agenda, plus up to twelve named saved copies (roadmap HS-5).
 * Stateless, no login.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Plus, X } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { copyToClipboard } from "@/lib/clipboard";
import { isArrayOf, readStoredJSON, writeStoredJSON } from "@/lib/storage";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const KEY = "livewell-meeting-builder";
const SAVES_KEY = "livewell-saves-meeting-builder";
const MAX_SAVES = 12;

interface Item { id: string; text: string; mins: number; owner: string; }

// Per-entry filter (the FormationInventory model): corrupt-but-valid JSON
// (e.g. {"items":{}}) used to reach render and crash on items.map.
const isItem = (x: unknown): x is Item => {
  const i = x as Item;
  return !!i && typeof i === "object" && typeof i.id === "string" && typeof i.text === "string";
};
const isSaved = (x: unknown): x is { title?: unknown; items?: unknown } => !!x && typeof x === "object";

// Named saved copies (roadmap HS-5): the autosave above is one working slot; a
// pastor holding next week's elder agenda and tonight's staff agenda needs
// both. Capped at twelve.
interface SaveRec { id: string; name: string; savedAt: string; data: { title: string; items: Item[] }; }
const isSaveRec = (x: unknown): x is SaveRec => {
  const r = x as SaveRec;
  return !!r && typeof r === "object" && typeof r.id === "string" && typeof r.name === "string" && typeof r.savedAt === "string" &&
    !!r.data && typeof r.data === "object" && typeof r.data.title === "string" && Array.isArray(r.data.items) && r.data.items.every(isItem);
};
const isSaveList = isArrayOf(isSaveRec);

// "Jun 14" — with the year when the copy is not from this year.
const fmtSavedAt = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  if (d.getFullYear() !== new Date().getFullYear()) opts.year = "numeric";
  return d.toLocaleDateString(undefined, opts);
};

// Minutes as arithmetic can trust them: never NaN, never negative.
const cleanMins = (v: unknown) => Math.max(0, Number(v) || 0);

const TEMPLATES: Record<string, { label: string; note: string; items: Omit<Item, "id">[] }> = {
  elder: { label: "Elder meeting", note: "Shepherding first, business second. The flock before the building.", items: [
    { text: "Scripture and prayer together", mins: 15, owner: "" },
    { text: "The state of the flock: who is struggling, who is wandering, who needs a visit", mins: 25, owner: "" },
    { text: "Care and discipline matters (confidential)", mins: 20, owner: "" },
    { text: "Decisions before us tonight", mins: 25, owner: "" },
    { text: "Vision and direction: one longer-horizon question", mins: 15, owner: "" },
    { text: "Prayer for the church by name", mins: 10, owner: "" },
  ]},
  staff: { label: "Staff meeting", note: "Align, unblock, and decide. Not a status meeting in disguise.", items: [
    { text: "Wins and what God is doing", mins: 10, owner: "" },
    { text: "This week across ministries: what is coming", mins: 15, owner: "" },
    { text: "Where someone is blocked and needs a decision", mins: 20, owner: "" },
    { text: "One thing we are getting wrong", mins: 15, owner: "" },
    { text: "Clear owners and next steps", mins: 10, owner: "" },
  ]},
  deacon: { label: "Deacon meeting", note: "Needs, resources, and the practical care of the body.", items: [
    { text: "Prayer and a brief word", mins: 10, owner: "" },
    { text: "Benevolence and care needs before us", mins: 25, owner: "" },
    { text: "Facilities and practical matters", mins: 20, owner: "" },
    { text: "Assignments: who takes what", mins: 15, owner: "" },
  ]},
  vision: { label: "Vision session", note: "Slower, longer, fewer items. The work the calendar usually crowds out.", items: [
    { text: "Where are we actually, honestly", mins: 30, owner: "" },
    { text: "What is God calling this church toward", mins: 40, owner: "" },
    { text: "What would have to change, and what it would cost", mins: 30, owner: "" },
    { text: "The first concrete step", mins: 20, owner: "" },
  ]},
};

const uid = () => Math.random().toString(36).slice(2, 9);

export default function MeetingBuilder() {
  // Restore saved work in lazy initializers (once, at mount) rather than a
  // synchronous setState in an effect.
  const [title, setTitle] = useState(() => {
    const o = readStoredJSON(KEY, isSaved, {});
    return typeof o.title === "string" ? o.title : "";
  });
  const [items, setItems] = useState<Item[]>(() => {
    const o = readStoredJSON(KEY, isSaved, {});
    return Array.isArray(o.items) ? o.items.filter(isItem) : [];
  });
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [persistFailed, setPersistFailed] = useState(false);
  const [copies, setCopies] = useState<SaveRec[]>(() => readStoredJSON(SAVES_KEY, isSaveList, []));
  const [saveName, setSaveName] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setPersistFailed(!writeStoredJSON(KEY, { title, items })), 500);
    return () => clearTimeout(t);
  }, [title, items]);

  const total = useMemo(() => items.reduce((s, i) => s + cleanMins(i.mins), 0), [items]);
  const load = (k: string) => { const t = TEMPLATES[k]; setTitle(t.label); setItems(t.items.map((i) => ({ ...i, id: uid() }))); };
  const add = () => setItems((s) => [...s, { id: uid(), text: "", mins: 10, owner: "" }]);
  const update = (id: string, patch: Partial<Item>) => setItems((s) => s.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const remove = (id: string) => setItems((s) => s.filter((i) => i.id !== id));

  // Saved copies live under their own key; the working slot above is untouched.
  // Loading a copy replaces the current agenda, and the autosave carries it on.
  const atCap = copies.length >= MAX_SAVES;
  const saveCopy = () => {
    const name = saveName.trim();
    if (!name || atCap) return;
    const next = [{ id: Date.now().toString(36), name, savedAt: new Date().toISOString(), data: { title, items } }, ...copies];
    setCopies(next);
    setSaveName("");
    if (!writeStoredJSON(SAVES_KEY, next)) setPersistFailed(true);
  };
  const loadCopy = (c: SaveRec) => { setTitle(c.data.title); setItems(c.data.items); };
  const deleteCopy = (id: string) => {
    const next = copies.filter((c) => c.id !== id);
    setCopies(next);
    if (!writeStoredJSON(SAVES_KEY, next)) setPersistFailed(true);
  };

  // "Copied" only after a copy actually happened (audit 15 H1). Blank rows stay
  // in the builder but out of the export.
  const copy = async () => {
    let out = (title || "Meeting") + ` (${total} min)\n\n`;
    items.filter((i) => i.text.trim()).forEach((i, n) => { out += `${n + 1}. ${i.text} — ${cleanMins(i.mins)} min${i.owner ? ` (${i.owner})` : ""}\n`; });
    const ok = await copyToClipboard(out);
    setCopyStatus(ok ? "copied" : "failed");
    if (ok) setTimeout(() => setCopyStatus("idle"), 2000);
  };

  return (
    <Layout>
      <SEOMeta title="The Meeting Builder — Agendas That End in Decisions" description="Build a church meeting agenda that ends in decisions, not fog. Templates for elder, staff, deacon, and vision meetings. Saves to your browser." url="https://www.livewellbyjamesbell.co/leadership/meeting" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The meeting builder</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px" }}>End with a decision, not a fog.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "58ch" }}>Most church meetings are bad because no one decided what they were for. Start from a template, cut what does not belong, and give every item a time and an owner.</p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, maxWidth: "760px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "var(--s-4)" }}>
            {Object.entries(TEMPLATES).map(([k, t]) => (
              <button key={k} onClick={() => load(k)} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", padding: "8px 14px", borderRadius: "var(--radius-sm)", cursor: "pointer", border: "1px solid var(--border)", background: "var(--card)", color: "var(--ink)" }}>{t.label}</button>
            ))}
          </div>

          <input value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Meeting name" placeholder="Meeting name"
            style={{ width: "100%", fontFamily: "var(--F)", fontSize: "22px", padding: "12px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", marginBottom: "var(--s-3)" }} />

          {items.map((i, n) => (
            <div key={i.id} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", paddingTop: "12px", width: "20px" }}>{n + 1}.</span>
              <div style={{ flex: 1 }}>
                <textarea value={i.text} onChange={(e) => update(i.id, { text: e.target.value })} rows={1} aria-label={`Agenda item ${n + 1}`} placeholder="Agenda item"
                  style={{ width: "100%", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.5, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", resize: "vertical", marginBottom: "4px" }} />
                <div style={{ display: "flex", gap: "8px" }}>
                  <input value={i.owner} onChange={(e) => update(i.id, { owner: e.target.value })} aria-label={`Owner for item ${n + 1}`} placeholder="Owner" style={{ flex: 1, fontFamily: "var(--U)", fontSize: "13px", padding: "6px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)" }} />
                  <input type="number" min={0} value={i.mins} onChange={(e) => update(i.id, { mins: cleanMins(e.target.value) })} aria-label={`Minutes for item ${n + 1}`} style={{ width: "70px", fontFamily: "var(--U)", fontSize: "13px", padding: "6px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)" }} />
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", paddingTop: "7px" }}>min</span>
                </div>
              </div>
              <button onClick={() => remove(i.id)} aria-label="Remove" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)", paddingTop: "10px" }}><X size={16} /></button>
            </div>
          ))}

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginTop: "var(--s-3)" }}>
            <button onClick={add} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 16px", background: "none", color: "var(--ink)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}><Plus size={15} /> Add item</button>
            <button onClick={copy} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Copy agenda</button>
            {copyStatus === "copied" && <span role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copied</span>}
            {copyStatus === "failed" && <span role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copy failed — select and copy manually.</span>}
            <span style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", marginLeft: "auto" }}>{total} min total</span>
          </div>
          {persistFailed && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "8px" }}>Couldn't save to this browser — your work here will not survive a reload.</p>}

          <div style={{ marginTop: "var(--s-4)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-3) var(--s-4)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Saved copies</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <input value={saveName} onChange={(e) => setSaveName(e.target.value)} aria-label="Name for this copy" placeholder="Name this copy"
                style={{ flex: "1 1 200px", fontFamily: "var(--B)", fontSize: "14px", padding: "8px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--ink)" }} />
              <button onClick={saveCopy} disabled={!saveName.trim() || atCap}
                style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", padding: "8px 14px", background: !saveName.trim() || atCap ? "var(--border)" : "var(--mustard)", color: !saveName.trim() || atCap ? "var(--ink-muted)" : "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: !saveName.trim() || atCap ? "not-allowed" : "pointer" }}>Save a copy</button>
            </div>
            {atCap && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "8px 0 0" }}>Twelve copies is the limit — delete one to save another.</p>}
            {copies.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                {copies.map((c) => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderTop: "1px solid var(--border)" }}>
                    <span style={{ flex: 1, fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink)", overflowWrap: "anywhere" }}>{c.name}</span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", whiteSpace: "nowrap" }}>{fmtSavedAt(c.savedAt)}</span>
                    <button onClick={() => loadCopy(c)} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", padding: "5px 12px", background: "none", color: "var(--ink)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Load</button>
                    <button onClick={() => deleteCopy(c.id)} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", padding: "5px 12px", background: "none", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Delete</button>
                  </div>
                ))}
              </div>
            )}
            <p style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", margin: "10px 0 0" }}>Saves stay in this browser.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
