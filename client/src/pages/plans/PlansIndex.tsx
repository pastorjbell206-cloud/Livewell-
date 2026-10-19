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
import { EditorialIndex } from "@/components/editorial/EditorialIndex";
import { LoadFailed } from "@/components/LoadFailed";
import { CrisisBlock } from "@/components/CrisisBlock";
import { fetchJson } from "@/lib/fetch-json";
import { readStoredJSON } from "@/lib/storage";
import { normalizeText, queryWords } from "@/lib/siteSearch";
import { RemindMe } from "@/components/RemindMe";
import READING from "@/data/bible-reading-plans.json";

/** A printed plan's file link, big enough to tap. */
const fileButton = { display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--mustard-text)", textDecoration: "none" } as const;

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

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

function planMatches(p: PlanEntry, q: string): boolean {
  const words = queryWords(q);
  const text = normalizeText(`${p.need ?? ""} ${p.title} ${p.blurb}`);
  return words.every((w) => text.includes(w));
}

export default function PlansIndex() {
  const [plans, setPlans] = useState<PlanEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [query, setQuery] = useState("");
  const shown = useMemo(() => (plans && query.trim() ? plans.filter((p) => planMatches(p, query)) : plans), [plans, query]);

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
            <>
              <label htmlFor="plan-find" style={{ display: "block", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" }}>
                Find a plan
              </label>
              <input
                id="plan-find"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: worry, grief, marriage, doubt"
                autoComplete="off"
                style={{ width: "100%", maxWidth: "520px", minHeight: "52px", padding: "12px 16px", fontSize: "17px", fontFamily: "var(--B)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--card)", color: "var(--ink)", marginBottom: "var(--s-4)" }}
              />
              {query.trim() && (
                <p role="status" style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
                  {shown?.length ? `${shown.length} ${shown.length === 1 ? "plan matches" : "plans match"}` : "No plan matches. Find Help below starts from your own words."}
                </p>
              )}
              <EditorialIndex
                columns={2}
                headingAs="h2"
                label="Care plans"
                items={(shown ?? []).map((p) => {
                  const weeks = progressFor(p.slug);
                  return {
                    href: `/plans/${p.slug}`,
                    // The reader's words first; the plan's own name under it.
                    title: p.need ?? p.title,
                    dek: p.need ? p.title : p.blurb,
                    kicker: "Eight-week plan",
                    meta: weeks === null ? undefined : <span>{weeks === 0 ? "Started" : `${weeks} of 8 weeks done`}</span>,
                  };
                })}
              />
            </>
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
