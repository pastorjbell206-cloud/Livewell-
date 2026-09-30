/**
 * CarePage — /help/:slug, the flagship of a need kit.
 *
 * Renders client/public/needs/<slug>.json in the fixed order the Grow prompt
 * sets (docs/grow/GROW-PROMPT.md 7.1, docs/grow/CARE-PAGE-SPEC.md): the title
 * in the reader's words and a one-paragraph answer; the help block on a
 * sensitive subject; what's going on; what Scripture says; why this is so
 * hard; what to do this week; when to get more help; if you're helping
 * someone; a prayer; go deeper; questions people ask.
 *
 * Layered depth: the first screen serves the person who can read only one
 * screen. On a crisis or high page a slim line of help sits above the title,
 * so the numbers are visible before anything scrolls, and the full block
 * follows the answer. Scripture is the Berean Standard Bible, verified
 * against the text by scripts/validate-needs.mjs; each reference opens the
 * chapter in the Study Bible.
 */
import { useEffect, useState, type ReactNode } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Markdown } from "@/components/Markdown";
import ScriptureNote from "@/components/ScriptureNote";
import { CrisisBlock, type CrisisTopic } from "@/components/CrisisBlock";
import { QuickExit } from "@/components/QuickExit";
import { EditorialIndex, type IndexItem } from "@/components/editorial/EditorialIndex";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { studyBibleHref } from "@/lib/needs";
import type { CarePageData, NeedsIndex } from "@/lib/needs";

const SITE = "https://www.livewellbyjamesbell.co";
const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const column = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;

/** Body copy: the shared Markdown renderer with this page's reading type. */
function Prose({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <Markdown
      components={{
        p: ({ children }) => (
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: light ? "var(--charcoal-fg)" : "var(--ink)", margin: "0 0 18px", maxWidth: "68ch", textWrap: "pretty" }}>
            {children}
          </p>
        ),
        a: ({ href, children }) =>
          href && href.startsWith("/") ? (
            <Link href={href} style={{ color: "inherit", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px" }}>{children}</Link>
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px" }}>{children}</a>
          ),
      }}
    >
      {text}
    </Markdown>
  );
}

function Section({ id, eyebrow, title, tone = "bone", children }: { id: string; eyebrow?: string; title: string; tone?: "bone" | "warm" | "dark"; children: ReactNode }) {
  const bg = tone === "dark" ? "var(--charcoal)" : tone === "warm" ? "var(--bone-warm)" : "var(--bone)";
  const dark = tone === "dark";
  return (
    <section id={id} aria-labelledby={`${id}-h`} style={{ background: bg, padding: "var(--s-6) var(--s-4)", color: dark ? "var(--charcoal-fg)" : "var(--ink)", scrollMarginTop: "72px" }}>
      <div style={column}>
        {eyebrow && <div className="eyebrow" style={{ color: dark ? "var(--mustard)" : "var(--mustard-text)", marginBottom: "10px" }}>{eyebrow}</div>}
        <h2 id={`${id}-h`} style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, margin: "0 0 var(--s-3)" }}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

const listStyle = { fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.2em", margin: "0 0 18px", maxWidth: "64ch" } as const;
const subhead = { fontFamily: "var(--F)", fontSize: "23px", fontWeight: 500, lineHeight: 1.25, color: "var(--ink)", margin: "var(--s-4) 0 10px" } as const;

/** The printables scripts/lib/help-printables.mjs builds for every care page. */
const PRINTABLES = [
  { kind: "guide", label: "A one-page guide", note: "What is going on, what to do this week, and when to call someone." },
  { kind: "prayer", label: "Prayer cards", note: "This page's prayer, two cards to a sheet." },
  { kind: "scripture", label: "Scripture cards", note: "The passages on this page, four cards to a sheet." },
  { kind: "week", label: "A worksheet for this week", note: "Each step with room to write, and a place to name who you will tell." },
] as const;

/** Names only what this page's kit actually holds. */
function goDeeperIntro(data: CarePageData): string {
  const parts: string[] = [];
  if (data.kit.plan) parts.push("a plan to walk for eight weeks");
  if (data.kit.selfCheck || data.kit.tool) parts.push(data.kit.selfCheck && data.kit.tool ? "an honest self-check and a tool" : data.kit.selfCheck ? "an honest self-check" : "a tool to use");
  if (data.kit.guides?.length) parts.push(data.kit.guides.length === 1 ? "a study for a group" : "studies for a group");
  parts.push("the longer writing");
  const list = parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
  return `Everything on the site for this, in one place: ${list}.`;
}

function faqSchema(data: CarePageData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/[*_]/g, "") },
    })),
  };
}

export default function CarePage() {
  const [, params] = useRoute("/help/:slug");
  const slug = params?.slug ?? "";
  const [nonce, setNonce] = useState(0);
  const [state, setState] = useState<{ slug: string; data?: CarePageData; missing?: boolean; failed?: boolean } | null>(null);
  const [titles, setTitles] = useState<Record<string, { title: string; page: boolean }>>({});

  useEffect(() => {
    if (!slug) return;
    let live = true;
    fetch(`/needs/${slug}.json`)
      .then(async (r) => {
        if (r.status === 404) return { slug, missing: true };
        if (!r.ok) throw new Error(String(r.status));
        const d = (await r.json()) as CarePageData;
        return d && d.page === true ? { slug, data: d } : { slug, missing: true };
      })
      .catch(() => ({ slug, failed: true }))
      .then((s) => { if (live) setState(s); });
    return () => { live = false; };
  }, [slug, nonce]);

  // Titles for the related needs, from the registry.
  useEffect(() => {
    fetchJson<NeedsIndex>("/needs/index.json")
      .then((ix) => setTitles(Object.fromEntries(ix.needs.map((n) => [n.slug, { title: n.title, page: n.page }]))))
      .catch(() => setTitles({}));
  }, []);

  const current = state && state.slug === slug ? state : null;
  const data = current?.data;

  if (!data) {
    return (
      <Layout>
        <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "14px" }}>
              <Link href="/help" style={{ color: "inherit" }}>Find help</Link>
            </div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em", margin: 0, maxWidth: "22ch" }}>
              {current?.missing ? "That page is not here yet." : current?.failed ? "This page didn't load." : "Loading…"}
            </h1>
          </div>
        </section>
        <div style={{ ...column, padding: "var(--s-5) var(--s-4)" }}>
          {current?.failed && <LoadFailed what="This page" onRetry={() => setNonce((n) => n + 1)} backHref="/help" backLabel="Find help" />}
          {current?.missing && (
            <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink)" }}>
              Start from <Link href="/help" style={{ color: "var(--mustard-text)" }}>Find help for what you are facing</Link>.
            </p>
          )}
          <CrisisBlock variant="compact" />
        </div>
      </Layout>
    );
  }

  const sensitive = data.sensitivity !== "ordinary";
  const topics = (data.crisisTopics ?? ["suicide"]) as CrisisTopic[];
  const url = `${SITE}/help/${data.slug}`;

  const kitItems: IndexItem[] = [];
  if (data.kit.plan) kitItems.push({ href: data.kit.plan.href, title: data.kit.plan.label, kicker: "Eight-week plan" });
  if (data.kit.selfCheck) kitItems.push({ href: data.kit.selfCheck.href, title: data.kit.selfCheck.label, kicker: "Self-check" });
  if (data.kit.tool) kitItems.push({ href: data.kit.tool.href, title: data.kit.tool.label, kicker: "Tool" });
  for (const g of data.kit.guides ?? []) kitItems.push({ href: g.href, title: g.label, kicker: "Study guide" });
  for (const r of data.kit.read) kitItems.push({ href: r.href, title: r.label, kicker: r.kind });

  const related = (data.related ?? []).filter((s) => titles[s]);

  return (
    <Layout>
      <SEOMeta
        title={data.seoTitle}
        description={data.description}
        url={url}
        type="article"
        structuredData={[
          faqSchema(data),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Find Help", item: `${SITE}/help` },
              { "@type": "ListItem", position: 3, name: data.title, item: url },
            ],
          },
        ]}
      />
      {topics.includes("abuse") && <QuickExit />}

      {/* FIRST SCREEN: the reader's words, the answer, and (on a sensitive
          subject) a line of help before anything can scroll away. */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-5) var(--s-4) var(--s-5)" }}>
        <div style={column}>
          {sensitive && (
            <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--charcoal-fg)", margin: "0 0 var(--s-3)", padding: "10px 14px", border: "1px solid var(--charcoal-soft)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)" }}>
              In danger or thinking about ending your life? Call or text{" "}
              <a href="tel:988" style={{ color: "inherit", fontWeight: 700 }}>988</a>, text{" "}
              <a href="sms:741741?&body=HOME" style={{ color: "inherit", fontWeight: 700 }}>HOME to 741741</a>, or call{" "}
              <a href="tel:911" style={{ color: "inherit", fontWeight: 700 }}>911</a>.{" "}
              <a href="#help-now" style={{ color: "var(--mustard)", fontWeight: 600 }}>More help below</a>
            </p>
          )}
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "14px" }}>
            <Link href="/help" style={{ color: "inherit" }}>Find help</Link>
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 6vw, 58px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 var(--s-3)", maxWidth: "20ch" }}>
            {data.title}
          </h1>
          <Prose text={data.answer} light />
          <nav aria-label="On this page" style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--charcoal-fg)", marginTop: "8px" }}>
            <a href="#this-week" style={{ color: "inherit", whiteSpace: "nowrap" }}>What to do this week</a>
            <a href="#more-help" style={{ color: "inherit", whiteSpace: "nowrap" }}>When to get more help</a>
            <a href="#helping" style={{ color: "inherit", whiteSpace: "nowrap" }}>If you're helping someone</a>
          </nav>
        </div>
      </section>

      {sensitive && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={column}>
            <CrisisBlock id="help-now" topics={topics} />
          </div>
        </section>
      )}

      <Section id="whats-going-on" title="What's going on">
        <Prose text={data.happening} />
      </Section>

      <Section id="scripture" tone="warm" title="What Scripture says">
        <ScriptureNote rendering="bsb" />
        <Prose text={data.scripture.intro} />
        {data.scripture.passages.map((p) => (
          <figure key={p.ref} style={{ margin: "var(--s-4) 0 0" }}>
            <blockquote style={{ margin: 0, padding: "4px 0 4px 20px", borderLeft: "2px solid var(--mustard)" }}>
              <p style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.4vw, 24px)", lineHeight: 1.45, color: "var(--ink)", margin: 0 }}>{p.text}</p>
            </blockquote>
            <figcaption style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", margin: "10px 0 14px 22px" }}>
              {p.ref} (BSB).{" "}
              {studyBibleHref(p.ref) && (
                <Link href={studyBibleHref(p.ref)!} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Read the whole chapter</Link>
              )}
            </figcaption>
            <Prose text={p.reading} />
          </figure>
        ))}
      </Section>

      <Section id="why-hard" title="Why this is so hard">
        <Prose text={data.whyHard} />
      </Section>

      <Section id="this-week" tone="warm" title="What to do this week">
        <Prose text={data.thisWeek.intro} />
        <ol style={{ listStyle: "none", margin: 0, padding: 0, counterReset: "step" }}>
          {data.thisWeek.steps.map((s, i) => (
            <li key={s.title} style={{ padding: "var(--s-3) 0", borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "2.2em 1fr", columnGap: "12px" }}>
              <span aria-hidden style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1, color: "var(--mustard-text)" }}>{i + 1}</span>
              <div>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, lineHeight: 1.25, margin: "0 0 8px", color: "var(--ink)" }}>{s.title}</h3>
                <Prose text={s.body} />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="more-help" title="When to get more help">
        <Prose text={data.moreHelp.body} />
        <h3 style={subhead}>Signs it is time to call someone</h3>
        <ul style={listStyle}>
          {data.moreHelp.signs.map((s) => <li key={s} style={{ marginBottom: "8px" }}>{s}</li>)}
        </ul>
        <h3 style={subhead}>What to say when you call</h3>
        <Prose text={data.moreHelp.firstCall} />
        <h3 style={subhead}>What it costs</h3>
        <Prose text={data.moreHelp.cost} />
        <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "var(--s-3) 0 0", maxWidth: "64ch" }}>
          This page is pastoral counsel. It is not medical, legal, or financial advice, and it does not replace a doctor, a licensed counselor, or a lawyer who knows your situation.
        </p>
      </Section>

      <Section id="helping" tone="warm" title="If you're helping someone">
        <Prose text={data.helping.body} />
        <div className="ed-split" style={{ gap: "var(--s-4)", alignItems: "start", marginTop: "var(--s-2)" }}>
          <div>
            <h3 style={subhead}>Things you can say</h3>
            <ul style={listStyle}>{data.helping.say.map((s) => <li key={s} style={{ marginBottom: "8px" }}>{s}</li>)}</ul>
          </div>
          <div>
            <h3 style={subhead}>Things not to say</h3>
            <ul style={listStyle}>{data.helping.dontSay.map((s) => <li key={s} style={{ marginBottom: "8px" }}>{s}</li>)}</ul>
          </div>
        </div>
        <h3 style={subhead}>What to do next</h3>
        <Prose text={data.helping.next} />
      </Section>

      <Section id="prayer" tone="dark" eyebrow="A prayer" title="When you don't have the words">
        <div style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.4vw, 23px)", lineHeight: 1.6, color: "var(--charcoal-fg)", maxWidth: "60ch" }}>
          {data.prayer.split(/\n\s*\n/).map((para, i) => (
            <p key={i} style={{ margin: "0 0 16px", whiteSpace: "pre-line" }}>{para}</p>
          ))}
        </div>
      </Section>

      <Section id="go-deeper" title="Go deeper">
        <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 var(--s-3)", maxWidth: "62ch" }}>
          {goDeeperIntro(data)}
        </p>
        <EditorialIndex items={kitItems} columns={1} compact headingAs="h3" label="Go deeper" />
      </Section>

      <Section id="print" tone="warm" eyebrow="Print it" title="For the refrigerator, a friend, or a small group">
        <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 var(--s-3)", maxWidth: "62ch" }}>
          Four pages to print and hand on, each in US Letter and A4.
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {PRINTABLES.map((p) => (
            <li key={p.kind} style={{ padding: "14px 0", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 20px" }}>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "21px", color: "var(--ink)" }}>{p.label}</span>
                <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{p.note}</span>
              </span>
              <span style={{ display: "flex", gap: "14px", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600 }}>
                <a href={`/downloads/help/${data.slug}-${p.kind}-letter.pdf`} style={{ color: "var(--mustard-text)" }}>Letter<span className="sr-only"> PDF, {p.label}</span></a>
                <a href={`/downloads/help/${data.slug}-${p.kind}-a4.pdf`} style={{ color: "var(--mustard-text)" }}>A4<span className="sr-only"> PDF, {p.label}</span></a>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="questions" title="Questions people ask">
        {data.faq.map((f) => (
          <div key={f.q} style={{ padding: "var(--s-3) 0", borderTop: "1px solid var(--border)" }}>
            <h3 style={{ fontFamily: "var(--F)", fontSize: "23px", fontWeight: 500, lineHeight: 1.25, margin: "0 0 10px", color: "var(--ink)" }}>{f.q}</h3>
            <Prose text={f.a} />
          </div>
        ))}
      </Section>

      {related.length > 0 && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={column}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Also carrying</div>
            <EditorialIndex columns={1} compact headingAs="h3" label="Related needs" items={related.map((s) => ({ href: titles[s].page ? `/help/${s}` : `/help?need=${s}`, title: titles[s].title }))} />
            <p style={{ fontFamily: "var(--U)", fontSize: "15px", margin: "var(--s-3) 0 0" }}>
              <Link href="/help" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Everything on Find Help →</Link>
            </p>
          </div>
        </section>
      )}

      {!sensitive && (
        <div style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-5)" }}>
          <CrisisBlock variant="compact" />
        </div>
      )}
    </Layout>
  );
}
