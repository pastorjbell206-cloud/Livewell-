/**
 * /table/:slug — a single home study, rendered as a usable session plan. Loads
 * the study JSON from client/public/table/studies/:slug.json and lays out each
 * session in the home rhythm: open, read, observe, talk, practice, send, and
 * the pass-it-on prompt that keeps the chain going.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "min(820px, 100%)", margin: "0 auto" } as const;

interface Session {
  n: number;
  title: string;
  bigIdea: string;
  scripture: string;
  open: string;
  read: string;
  observe: string[];
  talk: string[];
  practice: string;
  send: string;
  passItOn: string;
}
interface Study {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  setting: string;
  forWho: string;
  rhythm: string;
  leaderNote: string;
  sessions: Session[];
  next: { label: string; href: string }[];
}

const label: React.CSSProperties = { fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" };
const body: React.CSSProperties = { fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" };

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "var(--s-3)" }}>
      <div style={label}>{heading}</div>
      {children}
    </div>
  );
}

export default function TableStudy() {
  const [, params] = useRoute("/table/:slug");
  const slug = params?.slug;
  const [study, setStudy] = useState<Study | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/table/studies/${slug}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setStudy(d))
      .catch(() => setMissing(true));
  }, [slug]);

  if (missing) {
    return (
      <Layout>
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "32px", color: "var(--ink)", marginBottom: "12px" }}>That study is not set yet.</h1>
            <Link href="/table" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Back to The Table</Link>
          </div>
        </section>
      </Layout>
    );
  }

  if (!study) {
    return (
      <Layout>
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}><p style={{ ...body, color: "var(--ink-muted)" }}>Loading the study…</p></div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOMeta
        title={`${study.title} — A Home Study | The Table`}
        description={study.summary}
        url={`https://www.livewellbyjamesbell.co/table/${study.slug}`}
      />

      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <Link href="/table" style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none" }}>← The Table</Link>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 12px", maxWidth: "20ch" }}>{study.title}</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.6, color: "rgba(245,240,230,0.8)", maxWidth: "60ch", marginBottom: "20px" }}>{study.subtitle}</p>
          <div style={{ display: "flex", gap: "var(--s-4)", flexWrap: "wrap", fontFamily: "var(--B)", fontSize: "14px", color: "rgba(245,240,230,0.72)" }}>
            <div style={{ maxWidth: "30ch" }}><strong style={{ color: "var(--mustard)" }}>Setting.</strong> {study.setting}</div>
            <div style={{ maxWidth: "26ch" }}><strong style={{ color: "var(--mustard)" }}>For.</strong> {study.forWho}</div>
            <div style={{ maxWidth: "24ch" }}><strong style={{ color: "var(--mustard)" }}>Rhythm.</strong> {study.rhythm}</div>
          </div>
        </div>
      </section>

      {/* Leader note */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-4)" }}>
        <div style={wrap}>
          <div style={label}>If you are leading this table</div>
          <p style={{ ...body, maxWidth: "64ch" }}>{study.leaderNote}</p>
        </div>
      </section>

      {/* Sessions */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {study.sessions.map((s) => (
            <article key={s.n} style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "3px solid var(--mustard)", padding: "var(--s-4)", marginBottom: "var(--s-4)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>Session {s.n} · {s.scripture}</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.15, marginBottom: "10px" }}>{s.title}</h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.6, color: "var(--ink)", fontStyle: "italic", marginBottom: "var(--s-3)", paddingBottom: "var(--s-3)", borderBottom: "1px solid rgba(20,17,12,0.08)" }}>{s.bigIdea}</p>

              <Block heading="Open"><p style={body}>{s.open}</p></Block>
              <Block heading="Read"><p style={body}>{s.read}</p></Block>
              <Block heading="Look closer">
                <ul style={{ ...body, paddingLeft: "20px", margin: 0 }}>{s.observe.map((q, i) => <li key={i} style={{ marginBottom: "4px" }}>{q}</li>)}</ul>
              </Block>
              <Block heading="Talk it through">
                <ul style={{ ...body, paddingLeft: "20px", margin: 0 }}>{s.talk.map((q, i) => <li key={i} style={{ marginBottom: "6px" }}>{q}</li>)}</ul>
              </Block>
              <Block heading="Practice this week"><p style={body}>{s.practice}</p></Block>

              <div style={{ background: "var(--bone-warm)", borderLeft: "3px solid var(--mustard)", padding: "14px 16px", marginTop: "var(--s-3)" }}>
                <div style={label}>Pass it on</div>
                <p style={{ ...body, fontSize: "15px" }}>{s.passItOn}</p>
              </div>

              <p style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.45, color: "var(--ink)", marginTop: "var(--s-3)" }}>{s.send}</p>
            </article>
          ))}

          {/* Next */}
          <div style={{ background: "var(--charcoal)", padding: "var(--s-4)", color: "var(--bone)", marginTop: "var(--s-3)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "12px" }}>When the study ends</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {study.next.map((n) => (
                <Link key={n.href} href={n.href} style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none" }}>{n.label} →</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
