/**
 * The Benevolence and Decision Log (/leadership/decision-log). A private record
 * of benevolence requests and board decisions: what was asked, what was decided,
 * how much, and why. Everything stays on the device (localStorage). No names or
 * dollar figures leave the browser, which matters for the kind of thing a church
 * keeps in confidence. Stateless, no login.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Plus, X } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const KEY = "livewell-decision-log";

type Status = "pending" | "approved" | "declined" | "done";
interface Entry { id: string; title: string; kind: string; amount: string; status: Status; date: string; note: string; }

const KINDS = ["Benevolence", "Board decision", "Policy", "Personnel"];
const STATUS: { id: Status; label: string }[] = [
  { id: "pending", label: "Pending" }, { id: "approved", label: "Approved" }, { id: "declined", label: "Declined" }, { id: "done", label: "Done" },
];
const uid = () => Math.random().toString(36).slice(2, 9);

export default function DecisionLog() {
  const [items, setItems] = useState<Entry[]>([]);
  const [draft, setDraft] = useState<{ title: string; kind: string; amount: string; note: string }>({ title: "", kind: "Benevolence", amount: "", note: "" });
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => { try { const raw = localStorage.getItem(KEY); if (raw) setItems(JSON.parse(raw)); } catch { /* ignore */ } }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ } }, [items]);

  const add = () => {
    if (!draft.title.trim()) return;
    setItems((s) => [{ id: uid(), title: draft.title.trim(), kind: draft.kind, amount: draft.amount.trim(), status: "pending", date: new Date().toISOString().slice(0, 10), note: draft.note.trim() }, ...s]);
    setDraft({ title: "", kind: draft.kind, amount: "", note: "" });
  };
  const setStatus = (id: string, status: Status) => setItems((s) => s.map((e) => (e.id === id ? { ...e, status } : e)));
  const remove = (id: string) => setItems((s) => s.filter((e) => e.id !== id));

  const shown = useMemo(() => (filter ? items.filter((i) => i.status === filter) : items), [items, filter]);

  return (
    <Layout>
      <SEOMeta title="The Benevolence and Decision Log — A Private Record" description="A private record of benevolence requests and board decisions: what was asked, what was decided, and why. Everything stays on the device." url="https://www.livewellbyjamesbell.co/leadership/decision-log" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The decision log</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px" }}>Remember what you decided, and why.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "58ch" }}>A church forgets its own decisions and then relitigates them. Keep the record. What was asked, what you decided, and the reason. This stays on your device. No name or figure is sent anywhere.</p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, maxWidth: "820px" }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", marginBottom: "var(--s-4)" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
              <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} aria-label="What is it (a family, a request, a motion)" placeholder="What is it (a family, a request, a motion)" style={{ flex: "2 1 240px", fontFamily: "var(--B)", fontSize: "15px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--ink)" }} />
              <select value={draft.kind} onChange={(e) => setDraft({ ...draft, kind: e.target.value })} aria-label="Kind of decision" style={{ flex: "1 1 140px", fontFamily: "var(--U)", fontSize: "14px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--ink)" }}>
                {KINDS.map((k) => <option key={k}>{k}</option>)}
              </select>
              <input value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} aria-label="Amount (if any)" placeholder="Amount (if any)" style={{ flex: "1 1 120px", fontFamily: "var(--B)", fontSize: "15px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--ink)" }} />
            </div>
            <textarea value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })} rows={2} aria-label="The reasoning, the conditions, the follow-up" placeholder="The reasoning, the conditions, the follow-up" style={{ width: "100%", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--ink)", resize: "vertical", marginBottom: "8px" }} />
            <button onClick={add} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}><Plus size={15} /> Log it</button>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "var(--s-3)" }}>
            <Chip active={!filter} onClick={() => setFilter(null)}>All ({items.length})</Chip>
            {STATUS.map((s) => <Chip key={s.id} active={filter === s.id} onClick={() => setFilter(filter === s.id ? null : s.id)}>{s.label} ({items.filter((i) => i.status === s.id).length})</Chip>)}
          </div>

          {!shown.length && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-5) 0" }}>Nothing logged here yet.</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {shown.map((e) => (
              <div key={e.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-3) var(--s-4)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    <strong style={{ fontFamily: "var(--F)", fontSize: "18px", color: "var(--ink)" }}>{e.title}</strong>
                    <div style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", marginTop: "2px" }}>{e.kind}{e.amount ? ` · ${e.amount}` : ""} · {e.date}</div>
                  </div>
                  <button onClick={() => remove(e.id)} aria-label="Remove" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)" }}><X size={16} /></button>
                </div>
                {e.note && <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink)", lineHeight: 1.6, margin: "8px 0" }}>{e.note}</p>}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}>
                  {STATUS.map((s) => <button key={s.id} onClick={() => setStatus(e.id, s.id)} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "11px", padding: "4px 10px", borderRadius: "999px", cursor: "pointer", border: "1px solid " + (e.status === s.id ? "var(--mustard)" : "var(--border)"), background: e.status === s.id ? "var(--mustard)" : "var(--bone)", color: e.status === s.id ? "var(--charcoal)" : "var(--ink-muted)" }}>{s.label}</button>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", padding: "7px 14px", borderRadius: "999px", cursor: "pointer", border: "1px solid " + (active ? "var(--mustard)" : "var(--border)"), background: active ? "var(--mustard)" : "var(--card)", color: active ? "var(--charcoal)" : "var(--ink-muted)" }}>{children}</button>;
}
