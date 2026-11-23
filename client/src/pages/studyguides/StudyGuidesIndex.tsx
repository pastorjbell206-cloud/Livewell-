/**
 * Study Guides index (/studyguides). One place that gathers every Leader's
 * Toolkit. Each guide is a full small-group suite (leader's guide, participant
 * handout, facilitator script, promo kit) with email-gated PDF downloads on the
 * guide's own page. Card metadata is in client/src/lib/studyguides-index.ts.
 *
 * Every guide sits on one shelf (its `theme`, from
 * client/src/data/studyguide-themes.json), and the chips filter by shelf.
 * The choice rides in the address (?theme=grief) so a pastor can send a
 * link to exactly the shelf they mean.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { STUDY_GUIDES, type StudyGuideEntry } from "@/lib/studyguides-index";
import InnerHead from "@/components/art/InnerHead";
import LibraryIndex, { type LibGroup } from "@/components/art/LibraryIndex";
import SectionHead from "@/components/art/SectionHead";
import IconTile from "@/components/art/IconTile";
import { BookOpen, BookOpenText, Church, FileText, Flame, Hourglass, House, LayoutGrid, Lightbulb, Scale, ShieldQuestion, Sprout, Users, type LucideIcon } from "lucide-react";
import THEME_DATA from "@/data/studyguide-themes.json";

/** Each shelf with an icon; the names are the shelves' own. */
const THEME_ICONS: Record<string, LucideIcon> = {
  "hard-seasons": Hourglass,
  "inner-life": Flame,
  doubt: ShieldQuestion,
  belief: Lightbulb,
  practice: BookOpen,
  family: House,
  "work-money-justice": Scale,
  "church-and-world": Church,
  leaders: Users,
  youth: Sprout,
};
const THEMES: LibGroup[] = THEME_DATA.themes.map((t: { id: string; label: string }) => ({ id: t.id, name: t.label, icon: THEME_ICONS[t.id] ?? Users }));

/** "Audience · sessions", skipping whichever field a guide left blank. */
const metaOf = (g: StudyGuideEntry) => [g.audience, g.sessionsLabel].filter(Boolean).join(" · ");

export default function StudyGuidesIndex() {
  // Load the generated manifest so new guides appear automatically; fall back
  // to the bundled list if the manifest has not been built yet.
  const [guides, setGuides] = useState<StudyGuideEntry[]>(STUDY_GUIDES);
  useEffect(() => {
    fetch("/studyguides/index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.guides?.length) setGuides(d.guides); })
      .catch(() => {});
  }, []);
  const libItems = useMemo(
    () =>
      guides.map((g) => ({
        href: `/studyguides/${g.slug}`,
        title: g.title,
        line: g.eyebrow || null,
        meta: metaOf(g),
        group: g.theme,
        keywords: g.audience,
      })),
    [guides],
  );

  return (
    <Layout>
      <SEOMeta
        title="Free Bible Study Guides for Small Groups"
        description="Free, ready-to-run study guides on the questions the church tends to avoid. Each is a full leader's toolkit with handout, script, and printable PDFs."
        url="https://www.livewellbyjamesbell.co/studyguides"
      />

      <InnerHead path="/studyguides" title="Small group study guides" line="Free Bible study guides for small groups" plate="table">
        <p className="pg-head__lede">Teach the hard things well.</p>
      </InnerHead>

      {/* FIRST: find a guide, by word or by shelf (?theme=grief opens one shelf). */}
      <LibraryIndex
        id="guides"
        items={libItems}
        groups={THEMES}
        icon={Users}
        noun={["guide", "guides"]}
        findLabel="Find a study guide"
        placeholder="Try: grief, doubt, marriage, prayer"
        bandTitle="What will your group study?"
        param="theme"
        none={<p>No guide matches. Try another word, or see <Link href="/resources">all resources</Link>.</p>}
      />

      <section className="home-sec home-sec--warm" aria-labelledby="guides-kit-title">
        <div className="home-wrap">
          <SectionHead icon={BookOpenText} label="What each guide holds" title="A full toolkit, free." id="guides-kit-title" />
          <div className="lw-prose-band__body">
            <p>
              Each guide is a full toolkit for the person at the front of the room: a leader's guide with the answer behind every question, a participant handout, a facilitator script, and printable PDFs. Run a class on Sunday with no prep. Every guide runs as four, five, or eight weeks, for a group or for one person reading alone. Every guide is free, and the PDFs download right here.
            </p>
            <p>
              More guides are on the way. The booklets, libraries, and tools for leaders live in the wider resource hub.
            </p>
            <p>
              Leading a group through short sessions in order? Each of the <Link href="/tracks">tracks</Link> has a leader's guide, with every session's group questions gathered in order.
            </p>
          </div>
          <ul className="lw-tiles" style={{ marginTop: "var(--s-4)" }}>
            <li><IconTile href="/resources" icon={LayoutGrid} name="All resources" line="Downloads, tools and help in one list" /></li>
            <li><IconTile href="/resources/hard-issues-series" icon={FileText} name="The Hard Issues Series" line="Booklets for church leaders" /></li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
