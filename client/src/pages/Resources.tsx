/**
 * The Resource hub (/resources): a handful of things people actually use, in
 * four short groups. Downloads and PDFs (the /downloads shelf and the free
 * Hard Issues booklets), the tools (a few that serve the mission, the
 * self-checks at /assessments, then the whole /tools registry, where every
 * tool stays listed), help in a hard season (/help, the /plans index of every
 * eight-week care plan, and a few plans by name), and the household (/family).
 * The hero opens the reader's own My Library and the site search, and the page
 * ends with the card that puts LiveWell on a phone's home screen.
 *
 * Files James adds in /admin/resources still appear here on their own, under
 * Downloads, whenever there are any; nothing renders while they load.
 */
import { useMemo } from "react";
import { Link } from "wouter";
import { BookmarkCheck, Search } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { HubGroup, HubStyles } from "@/components/HubGroup";
import { AddToHomeScreen } from "@/components/AddToHomeScreen";
import { useLibrary } from "@/lib/library";
import { collectProgress } from "@/lib/myProgress";
import { toolName } from "@/lib/toolsList";
import { trpc } from "@/lib/trpc";

const gutter = "var(--gutter)";
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
  { label: "Anxiety", href: "/plans/anxiety" },
  { label: "Grief", href: "/plans/grief" },
  { label: "A marriage under strain", href: "/plans/marriage" },
  { label: "Taking your questions seriously", href: "/plans/deconstruction" },
  { label: "The curious skeptic", href: "/plans/skeptic" },
  { label: "The new believer", href: "/plans/new-believer" },
  { label: "One undivided life", href: "/plans/whole-life" },
];

/** A plan by name, big enough to tap. */
const planPill = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: "44px",
  padding: "8px 14px",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-pill)",
  background: "var(--card)",
  color: "var(--ink)",
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontWeight: 500,
  textDecoration: "none",
} as const;

const inlineLink = {
  color: "var(--ink)",
  textDecoration: "none",
  borderBottom: "1px solid var(--mustard)",
} as const;

export default function Resources() {
  // Files added through /admin/resources. Shown only when there are some.
  const added = trpc.resources.listPublished.useQuery().data?.filter((r) => r.url) ?? [];
  // What this reader has kept here, from this browser only (lib/library, lib/myProgress).
  const saved = useLibrary().length;
  const started = useMemo(() => collectProgress().length, []);
  const mine = [saved ? `${saved} saved` : "", started ? `${started} started` : ""].filter(Boolean).join(", ");

  return (
    <Layout>
      <SEOMeta
        title="Free Christian Resources: Downloads, Tools, Help"
        description="Free downloads and PDFs, booklets for church leaders, the tools, help for a hard season with eight-week plans, and resources for families."
        url="https://www.livewellbyjamesbell.co/resources"
      />
      <HubStyles />

      <PageHead
        door="Tools"
        doorHref="/tools"
        title="Resources"
        line="Downloads, tools, help for a hard season, and things for home. All free."
        plate="compass"
        action={
          <>
            <Link href="/my-library" className="btn btn--quiet res-action">
              <BookmarkCheck size={18} strokeWidth={1.75} aria-hidden /> My Library
              {mine && <span className="res-action__mine">{mine}</span>}
            </Link>
            <Link href="/search" className="btn btn--quiet res-action">
              <Search size={18} strokeWidth={1.75} aria-hidden /> Search everything
            </Link>
          </>
        }
      />
      <style>{`.res-action{gap:8px}.res-action__mine{font-weight:400;color:var(--ink-muted)}`}</style>

      <section style={{ background: "var(--bone)", padding: `var(--s-3) ${gutter} var(--s-6)` }}>
        <div style={wrap}>
          <HubGroup
            id="downloads"
            title="Downloads and PDFs"
            links={[
              {
                label: "Every download, on one shelf",
                href: "/downloads",
                note: "A leader's guide and a handout for every group study, a printable for every context guide, the Find Help worksheets, the eight-week plans as booklets, Bible reading plans, workbooks, and the free booklets.",
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
                label: toolName("rule-of-life"),
                href: "/tools/rule-of-life",
                note: "Choose practices across prayer, Scripture, rest, community, and the body, and settle on a pattern you can keep on an ordinary week.",
              },
              {
                label: toolName("scripture-memory"),
                href: "/tools/scripture-memory",
                note: "Forty key verses, practiced the way memory works.",
              },
              {
                label: toolName("test-the-case"),
                href: "/tools/test-the-case",
                note: "The case for the resurrection, one move at a time, with room to push back with your own objection.",
              },
              {
                label: toolName("which-lens"),
                href: "/tools/which-lens",
                note: "Thirteen choices that show which lens is reading Scripture for you.",
              },
              {
                label: "Check yourself",
                href: "/assessments",
                note: "Questions about faith, the whole of life, marriage, emotional and financial health, and belief. None of them grades you.",
              },
              {
                label: "Every tool",
                href: "/tools",
                note: "Every tool on LiveWell, in four groups, each listed once.",
              },
            ]}
          >
            Things to use during the week.
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
              {
                label: "Every eight-week plan",
                href: "/plans",
                note: "One practice, one reading, one tool, and one question each week, for grief, doubt, money, anger, caregiving, a marriage under strain, and more. Each prints as a booklet.",
              },
            ]}
          >
            Each eight-week plan takes one hard season at a time. A few of them:
            <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {CARE_PLANS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} style={planPill}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </HubGroup>

          <HubGroup
            id="families"
            title="For families"
            links={[
              {
                label: "For families",
                href: "/family",
                note: "Devotions to do with your kids, the family catechism, reading plans, and tools for parenting and marriage.",
              },
              {
                label: "Family devotions",
                href: "/family/devotions",
                note: "Seventy-two weekly devotions, more than a year of them, plus Thanksgiving, Advent, and Holy Week.",
              },
              {
                label: "A family catechism",
                href: "/family/catechism",
                note: "Seventy-six questions and answers, for adults and for children, one at a time.",
              },
              {
                label: toolName("family-devotions"),
                href: "/tools/family-devotions",
                note: "A fifteen-minute devotion for tonight, built for your kids' ages.",
              },
            ]}
          >
            For your own table.
          </HubGroup>

          <div style={{ marginTop: "var(--s-4)", maxWidth: "640px" }}>
            <AddToHomeScreen />
          </div>
        </div>
      </section>
    </Layout>
  );
}
