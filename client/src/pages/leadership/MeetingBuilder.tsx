/**
 * The Meeting Builder (/leadership/meeting). Build an agenda that ends in
 * decisions, not fog. Start from a template (elder, staff, deacon, vision),
 * edit the items, and copy it out. Saved to the browser. Stateless, no login.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Plus, X } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const KEY = "livewell-meeting-builder";

interface Item { id: string; text: string; mins: number; owner: string; }

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
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); setTitle(o.title || ""); setItems(o.items || []); } } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    const t = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify({ title, items })); } catch { /* ignore */ } }, 500);
    return () => clearTimeout(t);
  }, [title, items]);

  const total = useMemo(() => items.reduce((s, i) => s + (Number(i.mins) || 0), 0), [items]);
  const load = (k: string) => { const t = TEMPLATES[k]; setTitle(t.label); setItems(t.items.map((i) => ({ ...i, id: uid() }))); };
  const add = () => setItems((s) => [...s, { id: uid(), text: "", mins: 10, owner: "" }]);
  const update = (id: string, patch: Partial<Item>) => setItems((s) => s.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const remove = (id: string) => setItems((s) => s.filter((i) => i.id !== id));

  const copy = () => {
    let out = (title || "Meeting") + ` (${total} min)\n\n`;
    items.forEach((i, n) => { out += `${n + 1}. ${i.text} — ${i.mins} min${i.owner ? ` (${i.owner})` : ""}\n`; });
    navigator.clipboard?.writeText(out);
  };

  return (
    <Layout>
      <SEOMeta title="The Meeting Builder — Agendas That End in Decisions" description="Build a church meeting agenda that ends in decisions, not fog. Templates for elder, staff, deacon, and vision meetings. Saves to your browser." url="https://www.livewellbyjamesbell.co/leadership/meeting" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
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

          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Meeting name"
            style={{ width: "100%", fontFamily: "var(--F)", fontSize: "22px", padding: "12px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", marginBottom: "var(--s-3)" }} />

          {items.map((i, n) => (
            <div key={i.id} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", paddingTop: "12px", width: "20px" }}>{n + 1}.</span>
              <div style={{ flex: 1 }}>
                <textarea value={i.text} onChange={(e) => update(i.id, { text: e.target.value })} rows={1} placeholder="Agenda item"
                  style={{ width: "100%", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.5, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", resize: "vertical", marginBottom: "4px" }} />
                <div style={{ display: "flex", gap: "8px" }}>
                  <input value={i.owner} onChange={(e) => update(i.id, { owner: e.target.value })} placeholder="Owner" style={{ flex: 1, fontFamily: "var(--U)", fontSize: "13px", padding: "6px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)" }} />
                  <input type="number" value={i.mins} onChange={(e) => update(i.id, { mins: Number(e.target.value) })} style={{ width: "70px", fontFamily: "var(--U)", fontSize: "13px", padding: "6px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)" }} />
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", paddingTop: "7px" }}>min</span>
                </div>
              </div>
              <button onClick={() => remove(i.id)} aria-label="Remove" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)", paddingTop: "10px" }}><X size={16} /></button>
            </div>
          ))}

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginTop: "var(--s-3)" }}>
            <button onClick={add} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 16px", background: "none", color: "var(--ink)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}><Plus size={15} /> Add item</button>
            <button onClick={copy} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Copy agenda</button>
            <span style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", marginLeft: "auto" }}>{total} min total</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
