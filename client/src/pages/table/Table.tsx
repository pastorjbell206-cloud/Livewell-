/**
 * /table — The Table. The one-place disciplemaking hub for a church without a
 * building: ready-to-run home studies, leader equipping, and the books and
 * study guides, all under one roof. The model is the living room, not the
 * classroom — the oikos of Acts 2 and the exile household of Jeremiah 29.
 * Studies load from client/public/table/studies-index.json
 * (scripts/build-table-index.mjs).
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface StudyEntry { slug: string; title: string; subtitle: string; summary: string; sessions: number }

const PATH = [
  { step: "Be a disciple", body: "Sit at the table. Read, ask honest questions, learn to hear his voice and follow." },
  { step: "Make a disciple", body: "Take the seat you watched someone else hold. Walk one person through what you were given." },
  { step: "Develop a leader", body: "Raise the next host. A table that never becomes two tables has stopped halfway." },
];

export default function Table() {
  const [studies, setStudies] = useState<StudyEntry[]>([]);

  useEffect(() => {
    fetch("/table/studies-index.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStudies(d.studies || []))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="The Table — Disciplemaking in Homes"
        description="A one-place engine for making disciples where people live: home studies, leader equipping, books, and study guides. The living room, not the classroom."
        url="https://www.livewellbyjamesbell.co/table"
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Make Disciples</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "20px", maxWidth: "18ch" }}>
            The Table
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,0.85)", maxWidth: "64ch", marginBottom: "14px" }}>
            Discipleship did not begin in a classroom. It began at tables, on roads, in borrowed upper rooms. The first church had no building — it met house to house, broke bread, and grew. In a country that has stopped coming to the sanctuary, that older model is not a fallback. It is the way forward.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,0.85)", maxWidth: "64ch" }}>
            This is the place a church, a family, or two friends can come to find a study, run it in a living room, and be equipped to lead it. No stage. No expert required. One table, an open Bible, and someone willing to go first.
          </p>
        </div>
      </section>

      {/* Studies */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>Studies for the living room</h2>
          <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-3)" }} />
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
            Each study is built for a home: open the night, read the passage, talk it through, take a practice into the week, and name the person you will pass it to. Every session ends by pointing at the next table.
          </p>

          {studies.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the studies…</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "var(--s-3)" }}>
              {studies.map((s) => (
                <Link key={s.slug} href={`/table/${s.slug}`} style={{ display: "block", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-4)", textDecoration: "none" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>{s.sessions} sessions</div>
                  <div style={{ fontFamily: "var(--F)", fontSize: "24px", lineHeight: 1.2, color: "var(--ink)", marginBottom: "6px" }}>{s.title}</div>
                  <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{s.subtitle}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* The path */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "12px" }}>The chain, not the program</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: "var(--s-4)", maxWidth: "26ch" }}>
            What you heard, entrust to faithful people who will teach others also.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "var(--s-3)" }}>
            {PATH.map((p, i) => (
              <div key={p.step} style={{ background: "rgba(245,240,230,0.04)", border: "1px solid rgba(245,240,230,0.12)", padding: "var(--s-4)" }}>
                <div style={{ fontFamily: "var(--F)", fontSize: "40px", color: "var(--mustard)", lineHeight: 1, marginBottom: "10px" }}>{i + 1}</div>
                <div style={{ fontFamily: "var(--F)", fontSize: "21px", color: "var(--bone)", marginBottom: "8px" }}>{p.step}</div>
                <div style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.6, color: "rgba(245,240,230,0.78)" }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equip + resources */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "var(--s-4)" }}>
            <div>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", marginBottom: "10px" }}>Equip the leader</h3>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "14px", maxWidth: "52ch" }}>
                Leading a table is a skill anyone can learn. Start with how to host, how to ask a question and wait, and how to raise the next leader instead of keeping the seat.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/leadership/guides" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Training guides for leaders</Link>
                <Link href="/discipleship" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The discipleship pathway</Link>
                <Link href="/leadership" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The leadership library</Link>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", marginBottom: "10px" }}>Studies, guides, and books</h3>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "14px", maxWidth: "52ch" }}>
                The home studies sit alongside a deeper shelf: topical study guides, context guides for hard passages, and the books to put in a new believer's hands.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/studyguides" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Topical study guides</Link>
                <Link href="/resources" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The full resource library</Link>
                <Link href="/books" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Books</Link>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-4)" }}>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "60ch" }}>
              Why a table, and not a program? Read the vision behind all of this:{" "}
              <Link href="/exile" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>living well as exiles in a post-Christian world</Link>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
