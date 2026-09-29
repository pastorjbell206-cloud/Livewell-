/**
 * Theological Depth hub (/theology) — the front door to the section that
 * teaches a new believer how to think about contested doctrines fairly. Leads
 * with Pillar 0 (how to read this), lays out the four pillars, and maps every
 * doctrine by triage level. Doctrines marked ready link to a worked page; the
 * rest show as the planned map so the reader sees where it is going.
 */
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { DOCTRINE_INDEX, TRIAGE, type Triage } from "@/lib/theology";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";
import { CardGrid } from "@/components/editorial/CardGrid";
import { SectionHead } from "@/components/editorial/SectionHead";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";
import SubjectShelf from "@/components/SubjectShelf";
import { subjectById } from "@/lib/subjects";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const card = {
  background: "var(--card)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", padding: "var(--s-4)",
  textDecoration: "none", color: "inherit", display: "block",
} as const;

const PILLARS = [
  { key: "Systematic", n: "one", title: "Systematic theology", blurb: "The faith laid out in order, from Scripture and the Trinity to creation, sin, Christ, the Spirit, salvation, the church, and the last things.", href: "#doctrine-map", cta: "See the doctrines" },
  { key: "History", n: "two", title: "Church history", blurb: "How the church got here. The councils that fixed the creeds, the heresies that forced them, and the people who carried the faith through twenty centuries.", href: "/theology/history", cta: "Walk the story" },
  { key: "Biblical", n: "three", title: "Biblical theology", blurb: "How the whole Bible fits as one story. Covenant, dispensational, and progressive-covenantal frameworks, the canonical themes, and how the New Testament reads the Old.", href: "/theology/biblical", cta: "Walk the story" },
];

export default function Theology() {
  // Render only published doctrines, so an unpublished one is simply absent,
  // never a greyed-out "worked page coming" teaser.
  const [order, setOrder] = useState<Triage | "all">("all");
  const byPillar = (p: string) =>
    DOCTRINE_INDEX.filter((d) => d.pillar === p && d.ready && (order === "all" || d.triage === order));
  const readyCount = DOCTRINE_INDEX.filter((d) => d.ready).length;
  const orderCount = (t: Triage) => DOCTRINE_INDEX.filter((d) => d.ready && d.triage === t).length;

  // The worked doctrines, as an ItemList. Built from the same `ready` filter the
  // page renders from, so the schema can never advertise a doctrine the reader
  // cannot open.
  const readyDoctrines = DOCTRINE_INDEX.filter((d) => d.ready);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Theological Depth — Learn the Faith Fairly",
      description:
        "Learn contested Christian doctrines fairly. Every disagreement is sorted by how much it matters and every position is stated in its own strongest voice.",
      url: "https://www.livewellbyjamesbell.co/theology",
      author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
      publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: readyDoctrines.length,
        itemListElement: readyDoctrines.map((d, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: d.title,
          url: `https://www.livewellbyjamesbell.co/theology/doctrine/${d.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.livewellbyjamesbell.co/" },
        { "@type": "ListItem", position: 2, name: "Theological Depth", item: "https://www.livewellbyjamesbell.co/theology" },
      ],
    },
  ];

  return (
    <Layout>
      <SEOMeta
        title="Theological Depth — Learn the Faith Fairly"
        description="Learn contested Christian doctrines fairly. Every disagreement is sorted by how much it matters and every position is stated in its own strongest voice."
        url="https://www.livewellbyjamesbell.co/theology"
        structuredData={structuredData}
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--charcoal-fg)" }}>
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
          <SectionHead title="Find your way in" />
          <CardGrid
            min={440}
            items={[
              { href: "/theology/search", title: "Search everything", dek: "One box across the doctrines, all 230 passages, the glossary, and more." },
              { href: "/theology/paths", title: "Where do I start?", dek: "Short guided paths for the new believer and the curious." },
              { href: "/theology/questions", title: "Hard questions", dek: "Honest answers to what people actually ask, routed into the study." },
              { href: "/theology/traditions", title: "Why so many churches?", dek: "An irenic guide to the traditions and the core they share." },
            ]}
          />
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
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-2)" }}>
        <div style={wrap}>
          <SectionHead title="Study tools" intro="The instruments behind the doctrines: read a verse in context, set the views side by side, look up a term." />
          <CardGrid
            items={[
              { href: "/theology/passage", title: "Passage Context Tool", dek: "Read any verse back inside its paragraph, book, and the whole story." },
              { href: "/theology/compare", title: "Compare the views", dek: "Lay any doctrine's positions side by side in a table." },
              { href: "/theology/glossary", title: "Glossary", dek: "Every term, defined plainly and searchable." },
              { href: "/theology/creeds", title: "Creeds and confessions", dek: "The historic creeds in full, and the great confessions." },
              { href: "/theology/hermeneutics", title: "How to read the Bible well", dek: "The rules of interpretation and the mistakes to avoid." },
              { href: "/theology/which-view", title: "Which view am I?", dek: "Answer a few questions and see where you lean." },
            ]}
          />
        </div>
      </section>

      {/* THE PILLARS */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--charcoal-fg)", marginBottom: "var(--s-4)" }}>Three pillars</h2>
          <CardGrid
            tone="dark"
            items={PILLARS.map((p) => ({ href: p.href, title: p.title, dek: p.blurb, kicker: `Pillar ${p.n}`, cta: p.cta }))}
          />
        </div>
      </section>

      {/* DOCTRINE MAP */}
      <section id="doctrine-map" style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-7)", scrollMarginTop: "80px" }}>
        <div style={wrap}>
          <SectionHead
            eyebrow="The map"
            title="Every doctrine, sorted by weight"
            intro={`The full section, laid out from the start. ${readyCount === 1 ? "One doctrine is" : `${readyCount} doctrines are`} worked end to end in the six-step method. Filter by how much a disagreement actually matters.`}
          />

          <SectionArt seed="doctrine-map" />

          <div className="ed-chips" role="group" aria-label="Filter doctrines by weight">
            <button type="button" className="ed-chip" aria-pressed={order === "all"} onClick={() => setOrder("all")}>
              All<span className="ed-chip-n">{readyCount}</span>
            </button>
            {(Object.keys(TRIAGE) as Triage[]).map((t) => (
              <button key={t} type="button" className="ed-chip" aria-pressed={order === t} onClick={() => setOrder(t)}>
                {TRIAGE[t].label}<span className="ed-chip-n">{orderCount(t)}</span>
              </button>
            ))}
          </div>
          {order !== "all" && (
            <p role="status" style={{ fontFamily: "var(--B)", fontSize: "15px", fontStyle: "italic", color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
              {TRIAGE[order].label}: {TRIAGE[order].short}.
            </p>
          )}

          {["Systematic", "History", "Biblical"].map((pillar) => {
            const items = byPillar(pillar);
            if (items.length === 0) return null;
            const label = pillar === "Systematic" ? "Pillar 1 · Systematic theology" : pillar === "History" ? "Pillar 2 · Church history" : "Pillar 3 · Biblical theology";
            return (
              <div key={pillar} style={{ marginBottom: "var(--s-5)" }}>
                <h3 style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", fontFamily: "var(--F)", fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 var(--s-2)" }}>
                  {label}
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>{" "}{items.length}</span>
                </h3>
                <EditorialIndex
                  label={label}
                  headingAs="h4"
                  items={items.map((d) => ({ href: `/theology/doctrine/${d.slug}`, title: d.title, dek: d.blurb, kicker: TRIAGE[d.triage].label }))}
                />
              </div>
            );
          })}
        </div>
      </section>
      {subjectById("theology") && <SubjectShelf subject={subjectById("theology")!} />}
    </Layout>
  );
}
