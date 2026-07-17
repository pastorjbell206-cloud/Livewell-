/**
 * Family Bible reading plans (/family/reading-plans) — structured plans a family
 * follows together, each day a passage and a short prompt. Data:
 * /family-reading-plans.json.
 */
import { useEffect, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

interface Day { day: number; passage: string; prompt: string; }
interface Plan { id: string; title: string; description: string; audience: string; length: string; days: Day[]; }

export default function FamilyReadingPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const { isDone, toggle, count, reset, persisted } = useProgress("lw-family-reading-plans-v1");

  useEffect(() => {
    fetch("/family-reading-plans.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => Array.isArray(d) && setPlans(d))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="Family Bible Reading Plans"
        description="Read the Bible together as a family: the life of Jesus, the Old Testament for kids, the Psalms, and a starter plan. A passage and a prompt for each day."
        url="https://www.livewellbyjamesbell.co/family/reading-plans"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/family" style={{ color: "inherit" }}>Family</Link> · Reading plans
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            Read the Bible together.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            A passage a day and a short prompt to talk about it. Walk the life of Jesus, the great Old Testament story, the Psalms, or a starter plan if your family is beginning or beginning again.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {plans.length === 0 && (
            <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading plans…</p>
          )}
          {plans.length > 0 && count > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "var(--s-3)" }}>
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "var(--ink-muted)" }}>
                {count} day{count === 1 ? "" : "s"} read{!persisted && " — couldn't save to this browser, your progress here will not survive a reload"}
              </span>
              <button type="button" onClick={reset}
                style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink-muted)", background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "7px 13px", cursor: "pointer" }}>
                Reset progress
              </button>
            </div>
          )}
          {plans.map((plan) => {
            const isOpen = open === plan.id;
            return (
              <div key={plan.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                <button type="button" onClick={() => setOpen(isOpen ? null : plan.id)} aria-expanded={isOpen}
                  style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{plan.audience} · {plan.length}</span>
                    <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", margin: "4px 0 8px" }}>{plan.title}</span>
                    <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", maxWidth: "62ch" }}>{plan.description}</span>
                  </span>
                  <ChevronDown size={20} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                </button>
                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--border)" }}>
                    {plan.days.map((d) => (
                      <div key={d.day} style={{ display: "flex", gap: "14px", padding: "12px var(--s-4)", borderBottom: "1px solid var(--border)", alignItems: "flex-start" }}>
                        <button type="button" onClick={() => toggle(`${plan.id}:${d.day}`)} aria-pressed={isDone(`${plan.id}:${d.day}`)} title="Mark this day read"
                          style={{ fontFamily: "var(--F)", fontSize: "16px", color: "var(--mustard-text)", fontWeight: 500, minWidth: "62px", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
                          {isDone(`${plan.id}:${d.day}`) ? `✓ Day ${d.day}` : `Day ${d.day}`}
                        </button>
                        <span>
                          <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{d.passage}</span>
                          <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "2px" }}>{d.prompt}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
