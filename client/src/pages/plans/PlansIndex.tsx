/**
 * Care plans (/plans) — every eight-week plan in one place.
 *
 * The plans existed at /plans/:slug, but /plans itself was a 404, so a reader
 * who finished one plan had no way to see the others. This lists them from
 * the manifest (client/public/plans/plans-index.json, built by
 * scripts/build-plans-index.mjs) and marks the ones this browser has started,
 * reading the same progress key the plan page writes (lw-plan-<slug>).
 *
 * Below them sit the Bible reading plans to print (named in
 * client/src/data/bible-reading-plans.json; the PDFs are built by
 * scripts/lib/reading-plans.mjs inside `pnpm pdfs`).
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";
import { LoadFailed } from "@/components/LoadFailed";
import { CrisisBlock } from "@/components/CrisisBlock";
import { fetchJson } from "@/lib/fetch-json";
import READING from "@/data/bible-reading-plans.json";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface PlanEntry { slug: string; title: string; blurb: string }
const isPlans = (x: unknown): x is { plans: PlanEntry[] } => !!x && Array.isArray((x as { plans?: unknown }).plans);

/** Weeks checked off in this browser, or null if the plan was never started. */
function progressFor(slug: string): number | null {
  try {
    const raw = localStorage.getItem(`lw-plan-${slug}`);
    if (!raw) return null;
    const p = JSON.parse(raw) as { done?: Record<string, boolean> };
    return Object.values(p.done ?? {}).filter(Boolean).length;
  } catch {
    return null;
  }
}

export default function PlansIndex() {
  const [plans, setPlans] = useState<PlanEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let live = true;
    fetchJson("/plans/plans-index.json", isPlans)
      .then((d) => { if (live) { setPlans(d.plans); setFailed(false); } })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [nonce]);

  return (
    <Layout>
      <SEOMeta
        title="Care Plans: Eight Weeks, One Step at a Time"
        description="Guided eight-week plans for anxiety, grief, marriage, doubt, new faith, and more. One practice, one reading, one tool, and one honest question each week."
        url="https://www.livewellbyjamesbell.co/plans"
      />

      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "14px" }}>
            <Link href="/help" style={{ color: "inherit" }}>Find help</Link> · Care plans
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.6vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 16px", maxWidth: "20ch" }}>
            Eight weeks, one step at a time.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, color: "var(--charcoal-fg)", maxWidth: "60ch", margin: 0 }}>
            Each plan is a slow walk through one weight: one focus a week, one small daily practice, one thing to read, one tool, and one honest question. A missed week is not failure. You pick it back up. Your progress stays in this browser.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          {failed && <LoadFailed what="The care plans" onRetry={() => setNonce((n) => n + 1)} backHref="/help" backLabel="Find help" />}
          {!plans && !failed && <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the plans…</p>}
          {plans && (
            <EditorialIndex
              columns={2}
              headingAs="h2"
              label="Care plans"
              items={plans.map((p) => {
                const weeks = progressFor(p.slug);
                return {
                  href: `/plans/${p.slug}`,
                  title: p.title,
                  dek: p.blurb,
                  kicker: "Eight weeks",
                  meta: weeks === null ? undefined : <span>{weeks === 0 ? "Started" : `${weeks} of 8 weeks done`}</span>,
                };
              })}
            />
          )}
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginTop: "var(--s-5)" }}>
            Not sure which fits? <Link href="/help" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Find help for what you are facing</Link> starts from your own words.
          </p>
        </div>
      </section>

      <section aria-labelledby="reading-plans" style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>To print</div>
          <h2 id="reading-plans" style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 10px" }}>
            Bible reading plans
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", margin: "0 0 var(--s-4)" }}>
            Four plans to print and keep in your Bible, from a month in the Psalms to the whole Bible in a year. Each day is balanced by length, so no single day ambushes you, and a missed day is simply picked up.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "var(--s-3)" }}>
            {READING.plans.map((p) => (
              <article key={p.id} id={p.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", scrollMarginTop: "96px" }}>
                <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "6px" }}>{p.days} days</div>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", margin: "0 0 8px" }}>{p.title}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 12px" }}>{p.blurb}</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "14px", margin: 0 }}>
                  Print:{" "}
                  <a href={`/downloads/reading-plans/${p.id}-letter.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>US Letter</a>
                  {" · "}
                  <a href={`/downloads/reading-plans/${p.id}-a4.pdf`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>A4</a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-5)" }}>
        <CrisisBlock variant="compact" />
      </div>
    </Layout>
  );
}
