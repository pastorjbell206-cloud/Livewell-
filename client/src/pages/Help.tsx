/**
 * Find Help (/help) — the front door of the Grow section.
 *
 * A person arrives carrying something, in their own words, not a category.
 * So the page starts where they are: a line of real help before anything
 * else, a search box that understands the way people actually say it (each
 * need's `askedAs` phrases, docs/grow/GROW-PROMPT.md Section 5), chips for
 * the needs most people bring, the verified crisis lines in full, and then
 * the five places a reader can be (in trouble, carrying something, wanting to
 * grow, helping someone, leading a group).
 *
 * The needs come from the registry (client/public/needs/index.json, built by
 * scripts/build-needs-index.mjs). A need with a care page links to
 * /help/<slug>; a need without one yet opens a short list of where to begin.
 * Every link is checked by scripts/validate-needs.mjs.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { CrisisBlock } from "@/components/CrisisBlock";
import { EditorialIndex, type IndexItem } from "@/components/editorial/EditorialIndex";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { READER_STATES, searchNeeds, type NeedEntry, type NeedsIndex, type ReaderState } from "@/lib/needs";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const isIndex = (x: unknown): x is NeedsIndex => !!x && Array.isArray((x as NeedsIndex).needs);

function needItem(n: NeedEntry, state?: ReaderState): IndexItem {
  return {
    href: `/help/${n.slug}${state === "helping" ? "#helping" : ""}`,
    title: n.title,
    dek: n.summary,
    kicker: n.sensitivity === "ordinary" ? "Care page" : "Care page · help first",
  };
}

/** A need without its own page yet: the places on the site to begin. */
function Starter({ n, open, onToggle }: { n: NeedEntry; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "clamp(18px, 2.2vw, 26px)" }}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="ed-row" style={{ width: "100%", padding: 0, font: "inherit", textAlign: "left", cursor: "pointer" }}>
        <span style={{ display: "block", minWidth: 0 }}>
          <span className="ed-title" style={{ fontWeight: 400 }}>{n.title}</span>
          <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "8px", maxWidth: "62ch" }}>{n.summary}</span>
          <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", marginTop: "12px" }}>{open ? "Close" : "Where to start"}</span>
        </span>
        <span className="ed-arrow" aria-hidden style={{ fontSize: "22px", transform: "none" }}>{open ? "−" : "+"}</span>
      </button>
      {open && n.kit && (
        <div style={{ marginTop: "var(--s-3)" }}>
          {n.sensitivity !== "ordinary" && (
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 12px" }}>
              If this is urgent, the lines under <a href="#help-now" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Help, right now</a> are open day and night.
            </p>
          )}
          <EditorialIndex
            columns={1}
            compact
            headingAs="span"
            label={n.title}
            items={n.kit.read.map((r) => ({ href: r.href, title: r.label, kicker: r.kind, external: /^https?:/.test(r.href) }))}
          />
        </div>
      )}
    </div>
  );
}

export default function Help() {
  const [, navigate] = useLocation();
  const [needs, setNeeds] = useState<NeedEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [query, setQuery] = useState("");
  const [state, setState] = useState<ReaderState>("carrying");
  const [open, setOpen] = useState<string | null>(null);

  // /help?need=<slug> opens that need once the list arrives: its care page,
  // or its starting list here. Care pages use it to link a related need that
  // has no page yet.
  const [asked] = useState(() => (typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("need")));

  useEffect(() => {
    let live = true;
    fetchJson("/needs/index.json", isIndex)
      .then((ix) => {
        if (!live) return;
        setNeeds(ix.needs);
        setFailed(false);
        const n = asked ? ix.needs.find((x) => x.slug === asked) : undefined;
        if (!n) return;
        if (n.page) { navigate(`/help/${n.slug}`, { replace: true }); return; }
        setOpen(n.slug);
        setState(n.states[0]);
        requestAnimationFrame(() => document.getElementById(`need-${n.slug}`)?.scrollIntoView({ block: "start" }));
      })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [nonce, asked, navigate]);

  // Pages link here as /help#help-now. The router does not scroll to a
  // fragment on its own, so bring the help lines into view on arrival.
  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#help-now") return;
    requestAnimationFrame(() => document.getElementById("help-now")?.scrollIntoView({ block: "start" }));
  }, []);

  const results = useMemo(() => (needs ? searchNeeds(query, needs).slice(0, 6) : []), [needs, query]);
  const chips = useMemo(() => (needs ? needs.filter((n) => n.page).slice(0, 12) : []), [needs]);
  const inState = useMemo(() => (needs ? needs.filter((n) => n.states.includes(state)) : []), [needs, state]);
  const pages = inState.filter((n) => n.page);
  const starters = inState.filter((n) => !n.page);

  const go = (n: NeedEntry) => {
    if (n.page) navigate(`/help/${n.slug}`);
    else {
      setOpen(n.slug);
      setState(n.states[0]);
      requestAnimationFrame(() => document.getElementById(`need-${n.slug}`)?.scrollIntoView({ block: "start" }));
    }
  };

  return (
    <Layout>
      <SEOMeta
        title="Find Help for What You Are Facing"
        description="Anxious, grieving, doubting, lonely, a marriage in trouble? Say it in your own words. Honest help, Scripture in context, and real people to call."
        url="https://www.livewellbyjamesbell.co/help"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-4) var(--s-4) var(--s-6)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, margin: "0 0 var(--s-4)", padding: "10px 14px", border: "1px solid var(--charcoal-soft)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", maxWidth: "70ch" }}>
            In danger or thinking about ending your life? Call or text <a href="tel:988" style={{ color: "inherit", fontWeight: 700 }}>988</a>, text{" "}
            <a href="sms:741741?&body=HOME" style={{ color: "inherit", fontWeight: 700 }}>HOME to 741741</a>, or call <a href="tel:911" style={{ color: "inherit", fontWeight: 700 }}>911</a>.{" "}
            <a href="#help-now" style={{ color: "var(--mustard)", fontWeight: 600 }}>More lines below</a>
          </p>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "14px" }}>Find help</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.6vw, 58px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 16px", maxWidth: "18ch" }}>
            What are you facing?
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, color: "var(--charcoal-fg)", maxWidth: "60ch", margin: "0 0 var(--s-4)" }}>
            Say it the way you would say it to a friend. Each page here starts with what you are carrying, reads Scripture in context, and ends with something you can do this week and people who can help.
          </p>

          <form
            role="search"
            onSubmit={(e) => { e.preventDefault(); if (results[0]) go(results[0]); }}
            style={{ maxWidth: "640px" }}
          >
            <label htmlFor="help-search" style={{ display: "block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
              Type it in your own words
            </label>
            <input
              id="help-search"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="For example: I can't sleep because I'm worried"
              style={{ width: "100%", minHeight: "52px", padding: "12px 16px", fontFamily: "var(--B)", fontSize: "17px", color: "var(--ink)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}
            />
          </form>
          <div aria-live="polite" style={{ maxWidth: "640px" }}>
            {query.trim().length >= 2 && needs && (
              results.length ? (
                <div style={{ marginTop: "12px", background: "var(--card)", borderRadius: "var(--radius-sm)", padding: "4px 16px", color: "var(--ink)" }}>
                  <p className="sr-only">{results.length} matching {results.length === 1 ? "page" : "pages"}</p>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {results.map((n) => (
                      <li key={n.slug} style={{ borderTop: "1px solid var(--border)" }}>
                        <button type="button" onClick={() => go(n)} className="ed-row" style={{ width: "100%", padding: "12px 0", font: "inherit", textAlign: "left", cursor: "pointer", background: "none", border: 0 }}>
                          <span style={{ display: "block", minWidth: 0 }}>
                            <span className="ed-title" style={{ fontSize: "20px", fontWeight: 400 }}>{n.title}</span>
                            <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.5, color: "var(--ink-muted)", marginTop: "4px" }}>{n.summary}</span>
                          </span>
                          <span className="ed-arrow" aria-hidden>→</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--charcoal-fg)", margin: "12px 0 0" }}>
                  Nothing here matches that yet. Try one plain word (worry, alone, grief, marriage), or choose from the lists below. If it is urgent, the lines below are open now.
                </p>
              )
            )}
          </div>

          {chips.length > 0 && (
            <div style={{ marginTop: "var(--s-4)" }}>
              <p style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--charcoal-fg)", margin: "0 0 10px" }}>What people bring most</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "860px" }}>
                {chips.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/help/${n.slug}`} style={{ display: "inline-flex", alignItems: "center", minHeight: "40px", padding: "8px 14px", borderRadius: "var(--radius-pill)", border: "1px solid var(--charcoal-soft)", color: "var(--charcoal-fg)", fontFamily: "var(--U)", fontSize: "15px", textDecoration: "none" }}>
                      {n.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <CrisisBlock id="help-now" heading="If you're in trouble right now" topics={["suicide", "abuse", "sexual-assault", "substance"]} />
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>Where are you?</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--ink)", margin: "0 0 var(--s-3)", maxWidth: "24ch" }}>
            Start from where you actually are.
          </h2>
          <div role="group" aria-label="Where are you?" style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "0 0 var(--s-3)" }}>
            {READER_STATES.filter((s) => s.id !== "crisis").map((s) => {
              const on = s.id === state;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setState(s.id)}
                  style={{ minHeight: "44px", padding: "10px 16px", borderRadius: "var(--radius-pill)", border: `1px solid ${on ? "var(--charcoal)" : "var(--border)"}`, background: on ? "var(--charcoal)" : "var(--card)", color: on ? "var(--charcoal-fg)" : "var(--ink)", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 var(--s-4)", maxWidth: "62ch" }}>
            {READER_STATES.find((s) => s.id === state)?.blurb}
            {state === "helping" && " Each page below opens at its section for helpers."}
            {state === "leading" && (
              <>
                {" "}Every care page names a study for a group in its Go deeper list, and the full shelf is in{" "}
                <Link href="/studyguides" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>the study guides</Link>.
              </>
            )}
          </p>

          {failed && <LoadFailed what="The list of needs" onRetry={() => setNonce((n) => n + 1)} backHref="/" backLabel="Home" />}
          {!needs && !failed && <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the list…</p>}

          {pages.length > 0 && <EditorialIndex columns={2} headingAs="h3" label="Care pages" items={pages.map((n) => needItem(n, state))} />}

          {starters.length > 0 && (
            <>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", margin: "var(--s-5) 0 8px" }}>More that people carry</h3>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 var(--s-3)", maxWidth: "62ch" }}>
                These do not have their own page yet. Each opens the places on the site to begin.
              </p>
              <div className="ed-split" style={{ gap: "var(--s-3)", alignItems: "start" }}>
                {starters.map((n) => (
                  <div key={n.slug} id={`need-${n.slug}`} style={{ scrollMarginTop: "80px" }}>
                    <Starter n={n} open={open === n.slug} onToggle={() => setOpen(open === n.slug ? null : n.slug)} />
                  </div>
                ))}
              </div>
            </>
          )}

          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginTop: "var(--s-5)" }}>
            Want something longer? <Link href="/plans" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>The eight-week care plans</Link>,{" "}
            <Link href="/assessments" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>the honest self-checks</Link>, and{" "}
            <Link href="/tools" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>the tools</Link> all start from here too, and{" "}
            <Link href="/downloads" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>every printable</Link> is free, including{" "}
            <a href="/downloads/tools/memory-cards-letter.pdf" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Scripture to carry</a>, a card with one verse for each of these places. This site supports the work of doctors, counselors, and pastors. It does not replace them.
          </p>
        </div>
      </section>
    </Layout>
  );
}
