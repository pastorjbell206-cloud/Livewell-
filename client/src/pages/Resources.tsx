/**
 * The Resource hub (/resources): a handful of things people actually use, in
 * four short groups. Downloads and PDFs (the /downloads shelf and the free
 * Hard Issues booklets), the tools (a few that serve the mission, then the
 * whole /tools registry, where every tool stays listed), help in a hard
 * season (/help and the eight-week care plans), and the household (/family).
 *
 * Files James adds in /admin/resources still appear here on their own, under
 * Downloads, whenever there are any; nothing renders while they load.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { HubGroup, HubStyles } from "@/components/HubGroup";
import { trpc } from "@/lib/trpc";

const gutter = "clamp(16px, 4vw, var(--s-4))";
const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

const FORMAT_LABELS: Record<string, string> = {
  pdf: "PDF",
  docx: "Word",
  xlsx: "Spreadsheet",
  pptx: "Slides",
  zip: "ZIP",
};

/** The eight-week care plans (client/public/plans), by what a reader is carrying. */
const CARE_PLANS = [
  { label: "anxiety", href: "/plans/anxiety" },
  { label: "grief", href: "/plans/grief" },
  { label: "a marriage under strain", href: "/plans/marriage" },
  { label: "taking your questions seriously", href: "/plans/deconstruction" },
  { label: "the curious skeptic", href: "/plans/skeptic" },
  { label: "the new believer", href: "/plans/new-believer" },
  { label: "one undivided life", href: "/plans/whole-life" },
];

const inlineLink = {
  color: "var(--ink)",
  textDecoration: "none",
  borderBottom: "1px solid var(--mustard)",
} as const;

export default function Resources() {
  // Files added through /admin/resources. Shown only when there are some.
  const added = trpc.resources.listPublished.useQuery().data?.filter((r) => r.url) ?? [];

  return (
    <Layout>
      <SEOMeta
        title="Resources — Downloads, Tools, and Help"
        description="Free downloads and PDFs, the Hard Issues booklets, the tools, help for a hard season with eight-week care plans, and resources for families."
        url="https://www.livewellbyjamesbell.co/resources"
      />
      <HubStyles />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: `var(--s-6) ${gutter} var(--s-5)` }}>
        <div style={wrap}>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(38px, 5.4vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--charcoal-fg)",
              margin: "0 0 18px",
            }}
          >
            Resources
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", maxWidth: "60ch", margin: 0 }}>
            Downloads, tools, help for a hard season, and things for the household. Everything here is free.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: `var(--s-3) ${gutter} var(--s-6)` }}>
        <div style={wrap}>
          <HubGroup
            id="downloads"
            title="Downloads and PDFs"
            links={[
              {
                label: "Every download, on one shelf",
                href: "/downloads",
                note: "A leader's guide and a handout for every group study, a printable for every context guide, and the free booklets.",
              },
              {
                label: "The Hard Issues booklets",
                href: "/resources/hard-issues-series",
                note: "Free booklets for the people who lead the church, on eldership and on governing a local church. Each as a PDF and an EPUB.",
              },
            ]}
          >
            Print them, hand them out, read them offline.
            {added.length > 0 && (
              <ul style={{ listStyle: "none", margin: "var(--s-3) 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {added.map((r) => (
                  <li key={r.id}>
                    <a href={r.url ?? undefined} target="_blank" rel="noopener noreferrer" style={inlineLink}>
                      {r.title}
                    </a>
                    {r.fileType && <span> ({FORMAT_LABELS[r.fileType] ?? r.fileType.toUpperCase()})</span>}
                  </li>
                ))}
              </ul>
            )}
          </HubGroup>

          <HubGroup
            id="tools"
            title="Tools"
            links={[
              {
                label: "Rule of Life Builder",
                href: "/tools/rule-of-life",
                note: "Choose practices across prayer, Scripture, rest, community, and the body, and settle on a pattern you can keep on an ordinary week.",
              },
              {
                label: "Scripture Memory",
                href: "/tools/scripture-memory",
                note: "Forty key verses, practiced the way memory actually works.",
              },
              {
                label: "Test the Case",
                href: "/tools/test-the-case",
                note: "The case for the resurrection, one move at a time, with room to push back with the objection you actually hold.",
              },
              {
                label: "Which Lens Has You?",
                href: "/tools/which-lens",
                note: "Thirteen honest choices that show which lens is doing your reading of Scripture before you do.",
              },
              {
                label: "Every tool",
                href: "/tools",
                note: "The full set, from the Bible study companion and the glossary to the assessments and planners.",
              },
            ]}
          >
            Built to be used on a Tuesday, not admired on a Sunday.
          </HubGroup>

          <HubGroup
            id="help"
            title="Help in a hard season"
            links={[
              {
                label: "Find help for what you are facing",
                href: "/help",
                note: "Pick what you are carrying and find, in one place, something to read, something to do, and a prayer.",
              },
            ]}
          >
            Eight-week plans walk with you through one season at a time:{" "}
            {CARE_PLANS.map((p, i) => (
              <span key={p.href}>
                <Link href={p.href} style={inlineLink}>
                  {p.label}
                </Link>
                {i < CARE_PLANS.length - 1 ? ", " : "."}
              </span>
            ))}
          </HubGroup>

          <HubGroup
            id="families"
            title="For families"
            links={[
              {
                label: "The family room",
                href: "/family",
                note: "Devotions to do with your kids, the family catechism, reading plans, and tools for parenting and marriage.",
              },
              {
                label: "Family devotions",
                href: "/family/devotions",
                note: "A devotion for every week of the year, plus Advent and Holy Week.",
              },
              {
                label: "A family catechism",
                href: "/family/catechism",
                note: "Seventy-six questions and answers, for adults and for children, one at a time.",
              },
              {
                label: "Family Devotion Builder",
                href: "/tools/family-devotions",
                note: "A fifteen-minute devotion for tonight, built for your kids' ages.",
              },
            ]}
          >
            For the table where most faith is actually handed on.
          </HubGroup>
        </div>
      </section>
    </Layout>
  );
}
