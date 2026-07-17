/**
 * /table — The Table. The one-place disciplemaking hub for a church without a
 * building: a curriculum of ready-to-run home studies, leader equipping, and
 * the books and study guides, all under one roof. The model is the living
 * room, not the classroom — the oikos of Acts 2 and the exile household of
 * Jeremiah 29. The page moves vision → curriculum → sending.
 * Studies load at runtime from client/public/table/studies-index.json
 * (scripts/build-table-index.mjs); the grid renders whatever the index holds,
 * so new studies appear here without touching this file.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import LoadFailed from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface StudyEntry {
  slug: string;
  title: string;
  subtitle?: string;
  summary?: string;
  sessions?: number;
  forWho?: string;
}

function isStudy(s: unknown): s is StudyEntry {
  if (typeof s !== "object" || s === null) return false;
  const o = s as Record<string, unknown>;
  return typeof o.slug === "string" && typeof o.title === "string";
}

function isIndex(x: unknown): x is { studies: StudyEntry[] } {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return Array.isArray(o.studies) && o.studies.every(isStudy);
}

/** One line per card: the subtitle if the index has one, else the summary's first sentence. */
function oneLine(s: StudyEntry): string {
  if (s.subtitle) return s.subtitle;
  if (s.summary) {
    const i = s.summary.indexOf(". ");
    return i > 0 ? s.summary.slice(0, i + 1) : s.summary;
  }
  return "";
}

const PATH = [
  { step: "Be a disciple", body: "Sit at the table. Read, ask honest questions, learn to hear his voice and follow." },
  { step: "Make a disciple", body: "Take the seat you watched someone else hold. Walk one person through what you were given." },
  { step: "Develop a leader", body: "Raise the next host. A table that never becomes two tables has stopped halfway." },
];

export default function Table() {
  // Loading, failed, and loaded-but-empty are three different truths. Both
  // outcomes are keyed to the retry nonce so a "Try again" cleanly resets
  // them without synchronous setState inside the effect.
  const [loaded, setLoaded] = useState<{ nonce: number; studies: StudyEntry[] } | null>(null);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const failed = failedAt === nonce;
  const studies = loaded && loaded.nonce === nonce ? loaded.studies : null;

  useEffect(() => {
    let stale = false;
    fetchJson("/table/studies-index.json", isIndex)
      .then((d) => {
        if (!stale) setLoaded({ nonce, studies: d.studies });
      })
      .catch(() => {
        if (!stale) setFailedAt(nonce);
      });
    return () => {
      stale = true;
    };
  }, [nonce]);

  const leaderStudy = studies?.find((s) => /lead/i.test(s.slug)) ?? null;

  return (
    <Layout>
      <SEOMeta
        title="The Table — Disciplemaking in Homes"
        description="A one-place engine for making disciples where people live: a free home-study curriculum, leader equipping, books, and study guides. The living room, not the classroom."
        url="https://www.livewellbyjamesbell.co/table"
      />

      {/* Vision — hero */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
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

      {/* Vision — the chain */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>The chain, not the program</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--ink)", marginBottom: "var(--s-4)", maxWidth: "26ch" }}>
            What you heard, entrust to faithful people who will teach others also.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "var(--s-3)" }}>
            {PATH.map((p, i) => (
              <div key={p.step} style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "var(--s-4)" }}>
                <div style={{ fontFamily: "var(--F)", fontSize: "40px", color: "var(--mustard-text)", lineHeight: 1, marginBottom: "10px" }}>{i + 1}</div>
                <div style={{ fontFamily: "var(--F)", fontSize: "21px", color: "var(--ink)", marginBottom: "8px" }}>{p.step}</div>
                <div style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatementBand tone="dark" eyebrow="The table" width="34ch">
        No stage, no expert, no license to buy — only an open Bible and someone willing to go first.
      </StatementBand>

      {/* The curriculum */}
      <section style={{ background: "var(--cream)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>The curriculum</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>
            Studies for the living room
          </h2>
          <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-3)" }} />
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
            Each study is built for a home: open the night, read the passage, talk it through, take a practice into the week, and name the person you will pass it to. They are numbered in the order a reader naturally walks them — but any table can start where it stands.
          </p>

          <div style={{ background: "var(--bone-warm)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "14px 18px", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", margin: 0 }}>
              Never discipled anyone, and sure you are not qualified? Start with{" "}
              <Link href="/table/who-me-at-the-table" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Who, Me? At the Table</Link>
              . It was written for exactly that fear. You do not need to be an expert. You only need to be one step ahead and willing to bring one person along.
            </p>
          </div>

          {failed ? (
            <LoadFailed what="The curriculum" onRetry={() => setNonce((n) => n + 1)} backHref="/resources" backLabel="Browse the resource library" />
          ) : studies === null ? (
            <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the studies…</p>
          ) : studies.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch" }}>
              The studies are being set out now. Check back shortly, or start with the{" "}
              <Link href="/studyguides" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>topical study guides</Link>.
            </p>
          ) : (
            <>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: "var(--s-3)" }}>
                {studies.map((s, i) => (
                  <li key={s.slug} style={{ display: "flex" }}>
                    <Link
                      href={`/table/${s.slug}`}
                      style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "var(--card)", border: "1px solid var(--line)", borderTop: "2px solid var(--mustard)", padding: "var(--s-4)", textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                        <span className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                          {String(i + 1).padStart(2, "0")}
                          {i === 0 && (
                            <span className="eyebrow" style={{ color: "var(--mustard-text)", marginLeft: "10px" }}>Start here</span>
                          )}
                        </span>
                        {typeof s.sessions === "number" && (
                          <span className="eyebrow" style={{ color: "var(--ink-muted)" }}>{s.sessions} sessions</span>
                        )}
                      </div>
                      <div style={{ fontFamily: "var(--F)", fontSize: "24px", lineHeight: 1.2, color: "var(--ink)", marginBottom: "6px" }}>{s.title}</div>
                      {s.forWho && (
                        <div style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 500, color: "var(--mustard-text)", marginBottom: "8px" }}>{s.forWho}</div>
                      )}
                      <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 16px", flex: 1 }}>{oneLine(s)}</p>
                      <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)", borderBottom: "1px solid var(--mustard)", alignSelf: "flex-start", paddingBottom: "2px" }}>
                        Open the study
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>

              {leaderStudy && (
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginTop: "var(--s-4)", maxWidth: "62ch" }}>
                  Never led anything? Start with{" "}
                  <Link href={`/table/${leaderStudy.slug}`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>{leaderStudy.title}</Link>
                  {" "}— it exists to make you the host.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Use it freely */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <SectionArt seed="table-freely" tone="dark" />
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "12px" }}>No license, no gate</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: "14px", maxWidth: "22ch" }}>
            Use it freely
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,0.85)", maxWidth: "62ch" }}>
            Every study here is free to use — in your church, your Sunday school class, your small group, your living room. No license to buy, no account to make, no permission to ask. Print what you need, copy what helps, hand it to whoever is ready. The table was never ours to charge admission to.
          </p>
        </div>
      </section>

      {/* Sending — equip + resources */}
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

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid var(--line)", paddingTop: "var(--s-4)" }}>
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
