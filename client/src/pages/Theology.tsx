/**
 * Theological Depth hub (/theology) — the front door to the section that
 * teaches a new believer how to think about contested doctrines fairly. Leads
 * with Pillar 0 (how to read this), lays out the four pillars, and maps every
 * doctrine by triage level. Doctrines marked ready link to a worked page; the
 * rest show as the planned map so the reader sees where it is going.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TriageBadge } from "@/components/TriageBadge";
import { DOCTRINE_INDEX, type DoctrineIndexEntry } from "@/lib/theology";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const card = {
  background: "var(--card)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", padding: "var(--s-4)",
  textDecoration: "none", color: "inherit", display: "block",
} as const;

const PILLARS = [
  { key: "Systematic", n: "One", title: "Systematic theology", blurb: "The faith laid out in order, from Scripture and the Trinity to creation, sin, Christ, the Spirit, salvation, the church, and the last things.", href: "" },
  { key: "History", n: "Two", title: "Church history", blurb: "How the church got here. The councils that fixed the creeds, the heresies that forced them, and the people who carried the faith through twenty centuries.", href: "/theology/history" },
  { key: "Biblical", n: "Three", title: "Biblical theology", blurb: "How the whole Bible fits as one story. Covenant, dispensational, and progressive-covenantal frameworks, the canonical themes, and how the New Testament reads the Old.", href: "/theology/biblical" },
];

function DoctrineCard({ d }: { d: DoctrineIndexEntry }) {
  const inner = (
    <>
      <div style={{ marginBottom: "12px" }}><TriageBadge triage={d.triage} /></div>
      <div style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.25 }}>{d.title}</div>
      <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{d.blurb}</div>
      {d.ready ? (
        <div style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", marginTop: "12px" }}>Read the worked doctrine →</div>
      ) : (
        <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "12px" }}>In the writing</div>
      )}
    </>
  );
  return d.ready ? (
    <Link href={`/theology/doctrine/${d.slug}`} style={{ ...card, borderTop: "3px solid var(--mustard)" }}>{inner}</Link>
  ) : (
    <div style={{ ...card, opacity: 0.82 }}>{inner}</div>
  );
}

export default function Theology() {
  // Render only published doctrines, so an unpublished one is simply absent,
  // never a greyed-out "worked page coming" teaser.
  const byPillar = (p: string) => DOCTRINE_INDEX.filter((d) => d.pillar === p && d.ready);
  const readyCount = DOCTRINE_INDEX.filter((d) => d.ready).length;

  return (
    <Layout>
      <SEOMeta
        title="Theological Depth — Learn the Faith Fairly"
        description="Learn contested Christian doctrines fairly. Every disagreement is sorted by how much it matters and every position is stated in its own strongest voice."
        url="https://www.livewellbyjamesbell.co/theology"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>Theological Depth</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: "20px", maxWidth: "16ch" }}>
            Learn the hard doctrines without being told what to think.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
            Most of what divides good Christians is not the plain words of the Bible. It is how we fit the pieces together. This section takes the contested doctrines one at a time, sorts each by how much it actually matters, and states every serious position in its own strongest voice, so you can weigh them with your eyes open. You will know where the author lands. You will never be handed a verdict you did not get to test.
          </p>
        </div>
      </section>

      {/* FIND YOUR WAY IN */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) 0" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "var(--s-3)" }}>Find your way in</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
            {[
              { href: "/theology/search", title: "Search everything", desc: "One box across the doctrines, all 230 passages, the glossary, and more." },
              { href: "/theology/paths", title: "Where do I start?", desc: "Short guided paths for the new believer and the curious." },
              { href: "/theology/questions", title: "Hard questions", desc: "Honest answers to what people actually ask, routed into the study." },
              { href: "/theology/traditions", title: "Why so many churches?", desc: "An irenic guide to the traditions and the core they share." },
            ].map((t) => (
              <Link key={t.href} href={t.href} style={{ ...card, borderTop: "3px solid var(--mustard)" }}>
                <div style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", marginBottom: "6px" }}>{t.title}</div>
                <div style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{t.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PILLAR 0 — START HERE */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) 0" }}>
        <div style={wrap}>
          <Link href="/theology/how-to-use" style={{ ...card, borderTop: "3px solid var(--mustard)", padding: "var(--s-5)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Read this first</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>
              How to use this section
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", marginBottom: "12px" }}>
              The triage framework that sorts a first-order truth from a third-order preference, the author's own interpretive lens stated plainly, the difference between what the Bible clearly says and what a tradition reads into it, and how to change your mind well. The reading posture for everything that follows.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>Start here →</span>
          </Link>
        </div>
      </section>

      {/* FLAGSHIP TOOL */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) 0" }}>
        <div style={wrap}>
          <Link href="/theology/passage" style={{ ...card, borderTop: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>The tool</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>
              The Passage Context Tool
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", marginBottom: "10px" }}>
              Enter any verse and see it back where it belongs: inside its paragraph, its book, its author's purpose, and the wider witness of Scripture. It breaks the habit of reading a verse alone, and teaches the questions a careful reader always asks.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>Open the tool →</span>
          </Link>
        </div>
      </section>

      <StatementBand tone="dark" eyebrow="The posture" width="30ch">
        Every position here is stated in the voice its own defenders would own.
      </StatementBand>

      {/* STUDY TOOLS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) 0" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "var(--s-3)" }}>Study tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
            {[
              { href: "/theology/passage", title: "Passage Context Tool", desc: "Read any verse back inside its paragraph, book, and the whole story." },
              { href: "/theology/compare", title: "Compare the views", desc: "Lay any doctrine's positions side by side in a table." },
              { href: "/theology/glossary", title: "Glossary", desc: "Every term, defined plainly and searchable." },
              { href: "/theology/creeds", title: "Creeds and confessions", desc: "The historic creeds in full, and the great confessions." },
              { href: "/theology/hermeneutics", title: "How to read the Bible well", desc: "The rules of interpretation and the mistakes to avoid." },
              { href: "/theology/which-view", title: "Which view am I?", desc: "Answer a few questions and see where you lean." },
            ].map((t) => (
              <Link key={t.href} href={t.href} style={{ ...card, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", marginBottom: "6px" }}>{t.title}</div>
                <div style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{t.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE PILLARS */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "var(--s-4)" }}>Three pillars</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {PILLARS.map((p) => {
              const inner = (
                <>
                  <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>{`Pillar ${p.n}`}</div>
                  <div style={{ fontFamily: "var(--F)", fontSize: "23px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{p.title}</div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)" }}>{p.blurb}</p>
                  {p.href && <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", marginTop: "12px" }}>Walk the story →</span>}
                </>
              );
              return p.href ? (
                <Link key={p.key} href={p.href} style={{ ...card, borderTop: "3px solid var(--mustard)" }}>{inner}</Link>
              ) : (
                <div key={p.key} style={{ ...card, borderTop: "1px solid var(--border)" }}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOCTRINE MAP */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>The map</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>Every doctrine, sorted by weight</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "var(--s-5)" }}>
            {`The full section, laid out from the start. ${readyCount === 1 ? "One doctrine is" : `${readyCount} doctrines are`} worked end to end in the six-step method.`}
          </p>

          <SectionArt seed="doctrine-map" />

          {["Systematic", "History", "Biblical"].map((pillar) => {
            const items = byPillar(pillar);
            if (items.length === 0) return null;
            const label = pillar === "Systematic" ? "Pillar 1 · Systematic theology" : pillar === "History" ? "Pillar 2 · Church history" : "Pillar 3 · Biblical theology";
            return (
              <div key={pillar} style={{ marginBottom: "var(--s-5)" }}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>{label}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {items.map((d) => <DoctrineCard key={d.slug} d={d} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
