/**
 * /study: the anchor of the site.
 *
 * The Study Bible comes first and gets the most room: the story in eleven
 * acts, an introduction to every book, notes on every chapter, verse notes
 * where they are written, the doctrine studies, and the reading guides. Then
 * the church's history and its creeds, then reading Scripture in the world it
 * was written in, then studying with a group. Every link is an existing route;
 * the study tools that used to be listed here live in the /tools registry,
 * linked at the foot of the page. It opens on the compact PageHead, not a
 * charcoal hero, so the Study Bible starts on a phone's first screen.
 *
 * The counts are the Study Bible's own (client/public/bible): 66 book
 * introductions, notes on all 1,189 chapters, 11 acts, 62 doctrine studies,
 * 24 guides. Verse-by-verse notes are complete for Genesis and the four
 * Gospels so far; the page says so rather than implying more.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { HubGroup, HubStyles, type HubLink } from "@/components/HubGroup";
import { PageHead } from "@/components/editorial/PageHead";

const gutter = "clamp(16px, 4vw, var(--s-4))";
const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

/** The parts of the Study Bible, in the order a newcomer should meet them. */
const STUDY_BIBLE: HubLink[] = [
  {
    label: "The story of the Bible, in eleven acts",
    href: "/study/bible/story",
    note: "The whole Bible as one story, from creation to new creation, with the history behind each act and every chapter placed where it happened.",
  },
  {
    label: "Read the whole story in 2027",
    href: "/study/bible/guides/whole-story-2027",
    note: "The same story a day at a time: every chapter of the Bible in a year, with your place kept on this device and a reminder in your calendar.",
  },
  {
    label: "An introduction to every book",
    href: "/study/bible",
    note: "All sixty-six: who wrote it, when, why, and how it is built.",
  },
  {
    label: "Notes on all 1,189 chapters",
    href: "/study/bible",
    note: "Each chapter's history, its culture, how it is built, what it teaches, and where it sits in the one story. The Hebrew and Greek beneath every English word.",
  },
  {
    label: "Verse-by-verse notes",
    href: "/study/bible/matthew/1",
    note: "Written for Genesis and the four Gospels so far, and for a few chapters elsewhere. The rest of the Bible is still being written, book by book.",
  },
  {
    label: "Sixty-two doctrine studies",
    href: "/study/bible/doctrines",
    note: "God, creation, sin, covenant, Christ, salvation, the Spirit, the church, and the last things, each traced through the chapters that teach it.",
  },
  {
    label: "Twenty-four guides to reading the Bible",
    href: "/study/bible/guides",
    note: "What the Bible is, how the books were chosen, how the text reached us, how to read each kind of writing, and the ancient world's money, measures, calendar, and kings.",
  },
];

export default function Study() {
  return (
    <Layout>
      <SEOMeta
        title="Study the Bible — LiveWell by James Bell"
        description="Learn the whole Bible: the Study Bible with notes on all 1,189 chapters, the story in eleven acts, doctrine studies and reading guides, then the church's history, its creeds, and the world the Bible was written in."
        url="https://www.livewellbyjamesbell.co/study"
      />
      <HubStyles />

      <PageHead
        eyebrow="Study"
        title="Learn the whole Bible, and the church that carried it"
        lede="Start with the Study Bible, whether you have never opened it or have read it for years."
      />

      {/* THE STUDY BIBLE: first and biggest. */}
      <section aria-labelledby="study-bible-title" style={{ background: "var(--bone)", padding: `var(--s-5) ${gutter} var(--s-6)` }}>
        <div style={wrap} className="study-bible">
          <div className="study-bible__lead">
            <h2
              id="study-bible-title"
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(32px, 3.8vw, 44px)",
                fontWeight: 400,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: "0 0 18px",
              }}
            >
              The Study Bible
            </h2>
            <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 var(--s-4)", maxWidth: "46ch" }}>
              Every chapter comes with notes on its history, its culture, how it is built, what it teaches, and
              where it sits in the one story that runs from Genesis to Revelation. Underneath every English word
              are the Hebrew and Greek it translates.
            </p>
            <Link
              href="/study/bible"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "46px",
                padding: "0 24px",
                background: "var(--ink)",
                color: "var(--bone)",
                borderBottom: "2px solid var(--mustard)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--U)",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Open the Study Bible
            </Link>
          </div>
          <ul className="hub-group__links">
            {STUDY_BIBLE.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hub-link" style={{ color: "var(--ink)" }}>
                  <span className="hub-link__label">{l.label}</span>
                  <span className="hub-link__note" style={{ color: "var(--ink-muted)" }}>
                    {l.note}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CHURCH HISTORY */}
      <section style={{ background: "var(--charcoal)", padding: `var(--s-2) ${gutter}` }}>
        <div style={wrap}>
          <HubGroup
            id="church-history"
            title="Church history"
            tone="dark"
            links={[
              {
                label: "The history of the church",
                href: "/theology/history",
                note: "The councils, the figures, the heresies, and the whole arc from Pentecost to today, hung on one timeline.",
              },
              {
                label: "Creeds and confessions",
                href: "/resources/creeds",
                note: "The full texts of the creeds and confessions, with plain-language notes on what the loaded phrases meant to the people who wrote them.",
              },
              {
                label: "Why there are so many churches",
                href: "/theology/traditions",
                note: "A charitable guide to the major traditions, Catholic to Pentecostal: what each one treasures, and the deep core they share.",
              },
              {
                label: "The injustice timeline",
                href: "/justice/timeline",
                note: "An honest reckoning with the injustices of history, those done in the name of Christ among them. No one's hands are clean.",
              },
              {
                label: "The witnesses",
                href: "/justice/witnesses",
                note: "The people who did justice at real cost, from the abolitionists to the rescuers of the trafficked, honest about their flaws.",
              },
              {
                label: "The witnesses who would not be captured",
                href: "/disruption/witnesses",
                note: "The people who told the church and the powers costly truth and refused to be captured by either.",
              },
            ]}
          >
            You did not start the faith. You were handed it. Every passage you study was read by Christians
            before you, argued over in councils, and carried through the church's worst hours.
          </HubGroup>
        </div>
      </section>

      {/* THE BIBLE IN ITS CONTEXT */}
      <section style={{ background: "var(--bone-warm)", padding: `var(--s-2) ${gutter}` }}>
        <div style={wrap}>
          <HubGroup
            id="context"
            title="Reading the Bible in its context"
            links={[
              {
                label: "Reading Scripture in context",
                href: "/resources/context",
                note: "The Ancient Near East, Second Temple Judaism, the Greco-Roman world, honor and shame, and how to read the Bible apart from American political assumptions.",
              },
              {
                label: "The Study Bible's reading guides",
                href: "/study/bible/guides",
                note: "How to read each kind of writing in the Bible (narrative, law, poetry, prophecy, Gospels, parables, letters, apocalyptic) and the empires, rulers, and groups behind the text.",
              },
              {
                label: "A theology glossary",
                href: "/theology/glossary",
                note: "Every theological term, from atonement to the Trinity, defined plainly and linked to the doctrine it belongs to.",
              },
              {
                label: "Search the theology reference",
                href: "/theology/search",
                note: "One search across the doctrines, passages, glossary terms, creeds, figures, traditions, and hard questions.",
              },
            ]}
          >
            The Bible was written to people in a world with its own empires, calendars, and assumptions. Knowing
            that world is how you hear it on its own terms instead of ours.
          </HubGroup>
        </div>
      </section>

      {/* STUDY WITH A GROUP */}
      <section style={{ background: "var(--bone)", padding: `var(--s-2) ${gutter} var(--s-5)` }}>
        <div style={wrap}>
          <HubGroup
            id="groups"
            title="Study with a group"
            links={[
              {
                label: "Study guides for groups",
                href: "/studyguides",
                note: "A leader's guide with timing and the answer behind every question, a participant handout, and printable PDFs.",
              },
            ]}
          >
            For a class, a small group, or a family table.
          </HubGroup>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", margin: "var(--s-3) 0 0" }}>
            Looking for the study tools: the passage companion, the topic finder, the glossary, Scripture
            memory?{" "}
            <Link href="/tools" style={{ color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>
              They are all in the tools
            </Link>
            .
          </p>
        </div>
      </section>

      <style>{STUDY_CSS}</style>
    </Layout>
  );
}

const STUDY_CSS = `
.study-bible{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);gap:var(--s-5);align-items:start}
@media (max-width:860px){.study-bible{grid-template-columns:minmax(0,1fr)}}
`;
