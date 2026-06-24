/**
 * The Visitation Tracker (/leadership/visitation). Keep track of who you have
 * seen, who is waiting, and who is about to fall through the cracks. Everything
 * stays on the device (localStorage). No login, no server, no member data
 * leaves the browser.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Plus, X } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const KEY = "livewell-visitation";

type Status = "waiting" | "scheduled" | "seen";
interface Person { id: string; name: string; reason: string; status: Status; note: string; lastSeen: string; }

const STATUS: { id: Status; label: string }[] = [
  { id: "waiting", label: "Waiting" },
  { id: "scheduled", label: "Scheduled" },
  { id: "seen", label: "Seen" },
];
const uid = () => Math.random().toString(36).slice(2, 9);

export default function VisitationTracker() {
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => { try { const raw = localStorage.getItem(KEY); if (raw) setPeople(JSON.parse(raw)); } catch { /* ignore */ } }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(people)); } catch { /* ignore */ } }, [people]);

  const add = () => {
    if (!name.trim()) return;
    setPeople((p) => [{ id: uid(), name: name.trim(), reason: reason.trim(), status: "waiting", note: "", lastSeen: "" }, ...p]);
    setName(""); setReason("");
  };
  const update = (id: string, patch: Partial<Person>) => setPeople((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const remove = (id: string) => setPeople((p) => p.filter((x) => x.id !== id));
  const cycle = (x: Person) => {
    const order: Status[] = ["waiting", "scheduled", "seen"];
    const next = order[(order.indexOf(x.status) + 1) % order.length];
    update(x.id, { status: next, lastSeen: next === "seen" ? new Date().toISOString().slice(0, 10) : x.lastSeen });
  };

  const groups = useMemo(() => STATUS.map((s) => ({ ...s, list: people.filter((p) => p.status === s.id) })), [people]);

  return (
    <Layout>
      <SEOMeta title="The Visitation Tracker — Who You Have Seen, Who Is Waiting" description="Keep track of who you have visited, who is scheduled, and who is about to fall through the cracks. Everything stays on your device." url="https://www.livewellbyjamesbell.co/leadership/visitation" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The visitation tracker</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px" }}>Nobody falls through.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "58ch" }}>The ministry of presence is mostly remembering. Who is in the hospital, who just lost someone, who has not been seen in a month. This stays entirely on your device. Nothing about your people is sent anywhere.</p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, maxWidth: "820px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "var(--s-4)", alignItems: "flex-start" }}>
            <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Name" style={{ flex: "1 1 160px", fontFamily: "var(--B)", fontSize: "15px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)" }} />
            <input value={reason} onChange={(e) => setReason(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Reason (hospital, grief, new, shut-in)" style={{ flex: "2 1 220px", fontFamily: "var(--B)", fontSize: "15px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)" }} />
            <button onClick={add} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 16px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}><Plus size={15} /> Add</button>
          </div>

          {!people.length && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-5) 0" }}>No one on the list yet. Add the people on your heart.</p>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            {groups.map((g) => (
              <div key={g.id}>
                <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{g.label} ({g.list.length})</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {g.list.map((p) => (
                    <div key={p.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                        <strong style={{ fontFamily: "var(--F)", fontSize: "17px", color: "var(--ink)" }}>{p.name}</strong>
                        <button onClick={() => remove(p.id)} aria-label="Remove" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)" }}><X size={15} /></button>
                      </div>
                      {p.reason && <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", margin: "2px 0 8px" }}>{p.reason}</p>}
                      {p.lastSeen && <p style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", marginBottom: "8px" }}>Last seen {p.lastSeen}</p>}
                      <button onClick={() => cycle(p)} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", padding: "5px 10px", borderRadius: "999px", border: "1px solid var(--border)", background: "var(--bone-warm)", color: "var(--ink)", cursor: "pointer" }}>Move →</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
