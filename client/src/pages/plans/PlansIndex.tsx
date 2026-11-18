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
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import LibraryIndex from "@/components/art/LibraryIndex";
import SectionHead from "@/components/art/SectionHead";
import { Milestone, Printer } from "lucide-react";
import { CrisisBlock } from "@/components/CrisisBlock";
import { fetchJson } from "@/lib/fetch-json";
import { readStoredJSON } from "@/lib/storage";
import { RemindMe } from "@/components/RemindMe";
import READING from "@/data/bible-reading-plans.json";

/** A printed plan's file link, big enough to tap. */
const fileButton = { display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--mustard-text)", textDecoration: "none" } as const;


/** `need` is the care page's title, in the reader's words (scripts/build-plans-index.mjs). */
interface PlanEntry { slug: string; title: string; blurb: string; need?: string; needSlug?: string }
const isPlans = (x: unknown): x is { plans: PlanEntry[] } => !!x && Array.isArray((x as { plans?: unknown }).plans);

const isProgress = (x: unknown): x is { done: Record<string, unknown> } | null =>
  x === null || (!!x && typeof x === "object" && !!(x as { done?: unknown }).done && typeof (x as { done?: unknown }).done === "object");

/** Weeks checked off in this browser, or null if the plan was never started. */
function progressFor(slug: string): number | null {
  const p = readStoredJSON(`lw-plan-${slug}`, isProgress, null);
  return p ? Object.values(p.done).filter(Boolean).length : null;
}


export default function PlansIndex() {
  const [plans, setPlans] = useState<PlanEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const libItems = useMemo(
    () =>
      plans?.map((p) => {
        const weeks = progressFor(p.slug);
        return {
          href: `/plans/${p.slug}`,
          // The reader's words first; the plan's own name under it.
          title: p.need ?? p.title,
          line: p.need ? p.title : p.blurb,
          keywords: p.blurb,
          meta: weeks === null ? undefined : weeks === 0 ? "Started" : `${weeks} of 8 weeks done`,
        };
      }) ?? null,
    [plans],
  );

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
        title="8-Week Plans for Anxiety, Grief, Marriage, Doubt"
        description="Guided eight-week plans for anxiety, grief, marriage, doubt, new faith, and more. One practice, one reading, one tool, and one honest question each week."
        url="https://www.livewellbyjamesbell.co/plans"
      />

      <InnerHead path="/plans" title="Eight-week plans" line="Eight-week plans for a hard season" plate="lantern">
        <p className="pg-head__lede">Eight weeks, one step at a time.</p>
      </InnerHead>

      {/* FIRST: find the plan for what you are carrying. */}
      <LibraryIndex
        id="plans"
        items={plans && !failed ? libItems : null}
        failed={failed ? { what: "The care plans", onRetry: () => setNonce((n) => n + 1), backHref: "/help", backLabel: "Find help" } : null}
        icon={Milestone}
        noun={["plan", "plans"]}
        findLabel="Find a plan"
        placeholder="Try: worry, grief, marriage, doubt"
        bandTitle="What are you carrying?"
        none={<p>No plan matches. <Link href="/help">Find Help</Link> starts from your own words.</p>}
      />

      <section className="home-sec home-sec--warm" aria-labelledby="plans-how-title">
        <div className="home-wrap">
          <SectionHead icon={Milestone} label="How a plan works" title="One weight, eight weeks." id="plans-how-title" />
          <div className="lw-prose-band__body">
            <p>
              Each plan is a slow walk through one weight: one focus a week, one small daily practice, one thing to read, one tool, and one honest question. A missed week is not failure. You pick it back up. Your progress stays in this browser.
            </p>
            <p>
              Not sure which fits? <Link href="/help">Find help for what you are facing</Link> starts from your own words.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="reading-plans" className="home-sec">
        <div className="home-wrap">
          <SectionHead icon={Printer} label="To print" title="Bible reading plans" id="reading-plans" />
          <p style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", margin: "0 0 var(--s-4)" }}>
            Plans to print and keep in your Bible: a month in the Psalms, a Gospel in a month, Mark through the forty days of Lent, the New Testament in ninety days, and the whole Bible in a year. Each day is balanced by length, so no single day ambushes you, and a missed day is simply picked up.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "var(--s-3)" }}>
            {READING.plans.map((p) => (
              <article key={p.id} id={p.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", scrollMarginTop: "96px" }}>
                <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "6px" }}>{p.days} days</div>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", margin: "0 0 8px" }}>{p.title}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 12px" }}>{p.blurb}</p>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "var(--ink-muted)", fontWeight: 500 }}>Print:</span>
                  <a href={`/downloads/reading-plans/${p.id}-letter.pdf`} target="_blank" rel="noopener" style={fileButton}>US Letter<span className="sr-only"> PDF, {p.title}</span></a>
                  <a href={`/downloads/reading-plans/${p.id}-a4.pdf`} target="_blank" rel="noopener" style={fileButton}>A4<span className="sr-only"> PDF, {p.title}</span></a>
                </div>
                <RemindMe
                  title={p.title}
                  details="Today's reading. Your printed plan has the passages for each day; a missed day is simply picked up."
                  href={`/plans#${p.id}`}
                  freq="DAILY"
                  count={p.days}
                  schedule={`every day for ${p.days} days`}
                  defaultTime="morning"
                />
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
