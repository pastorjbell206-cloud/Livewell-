/**
 * Family (/family): tonight's devotion first, with a weekly reminder for the
 * family's own calendar, then this week's catechism question and the season's
 * daily sets, then (from the Sunday before Advent Sunday to Christmas) the
 * Advent calendar card, then the catechism, the library, "If your table looks
 * different" (U21), reading plans, and the tools for the home. The 2026-11
 * audit added the chooser under Tonight ("A devotion for tonight"), the card
 * for the page on handing the faith to kids, the "How to" shelf, and a teen
 * section built from the pieces that exist, and took the machine-sorted
 * "Everything on this" shelf off the foot of the page (F13): it filed pieces
 * about the nation and the church as family reading, and the hand-picked
 * sections above already carry the pieces about the home.
 *
 * Tonight comes from the static year map and the reader's own calendar
 * (lib/familyTable); the titles and this week's question come from the family
 * index (client/public/family/index.json, scripts/build-family-index.mjs).
 * The page no longer downloads the published-posts list: the four essay rows
 * it fed (teen-, apologetics-, parenting-, marriage-) were empty.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SKEPTIC_TRACK_LIVE } from "@/lib/skepticTrack";
import AdventAtTheTable from "@/components/AdventAtTheTable";
import { RemindMe } from "@/components/RemindMe";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import { PullQuote, StatementBand, SectionArt } from "@/components/EditorialBlocks";
import { CardGrid } from "@/components/editorial/CardGrid";
import { SectionHead } from "@/components/editorial/SectionHead";
import { isPublicEssayHref } from "@/lib/shelf";
import { localISODate } from "@/lib/familyYear";
import { FAMILY_SETS } from "@/lib/familyYear.generated";
import { readCatechismPlace } from "@/lib/familyCatechism";
import { catechismFor, type FamilyIndex } from "@/lib/familyTable";
import TonightCard from "./family/TonightCard";
import TonightChooser from "./family/TonightChooser";
import TableLooksDifferent from "./family/TableLooksDifferent";
import { useFamilyIndex } from "./family/useFamilyData";

const card = {
  background: "var(--card)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", padding: "var(--s-4)", textDecoration: "none",
  color: "inherit", display: "block",
} as const;

/** The library tab for each daily set, and its name until the index says it (scripts/lib/family-index.mjs). */
const SET_TAB = { thanksgiving: "thanksgiving", advent: "advent", holyWeek: "holy-week" } as const;
const SET_NAME = { thanksgiving: "Thanksgiving week", advent: "Advent", holyWeek: "Holy Week" } as const;

const MONTH = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" });
const dateParts = (iso: string) => ({ y: Number(iso.slice(0, 4)), m: MONTH.format(new Date(`${iso}T12:00:00Z`)), d: Number(iso.slice(8, 10)) });

/** "November 20 to 26", "March 29 to April 5", with the year when it is not this one. */
function spanSaid(start: string, end: string, thisYear: number): string {
  const a = dateParts(start);
  const b = dateParts(end);
  const tail = b.y !== thisYear ? `, ${b.y}` : "";
  return a.m === b.m ? `${a.m} ${a.d} to ${b.d}${tail}` : `${a.m} ${a.d} to ${b.m} ${b.d}${tail}`;
}

/** This week's catechism question, and the daily sets running now or next (from the static year map, so they need no network). */
function ThisWeek({ index }: { index: FamilyIndex | null }) {
  const [today] = useState(() => localISODate());
  // The family's own place in the catechism, or the calendar's question if it follows the calendar.
  const [place] = useState(() => readCatechismPlace());
  const mine = index ? catechismFor(index.catechism, place) : null;
  const line = mine?.line ?? null;
  const sets = FAMILY_SETS.filter((w) => w.end >= today).slice(0, 2);
  const year = Number(today.slice(0, 4));
  return (
    <div className="tb-week">
      <div>
        <h2 className="tb-section__title">This week</h2>
        {line && (
          <>
            <p className="tb-label">{mine?.own ? "Your place in the catechism" : "The catechism"} · Question {line.number}</p>
            <p className="tb-week__q">{line.question}</p>
            <Link href="/family/catechism" className="tb-link">
              Learn it together
            </Link>
          </>
        )}
      </div>
      <div>
        <h2 className="tb-section__title">Devotions for this season</h2>
        {sets.length > 0 && (
          <ul className="tb-sets">
            {sets.map((w) => (
              <li key={w.start}>
                <Link href={`/family/devotions?tab=${SET_TAB[w.set]}`}>
                  <span className="tb-sets__name">{index?.sets[w.set]?.label ?? SET_NAME[w.set]}</span>
                  <span className="tb-sets__when">
                    {spanSaid(w.start, w.end, year)}
                    {w.start <= today ? " · now" : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * The "How to" shelf (audit 2026-11, F8): the first questions a parent asks,
 * each answered by pieces that already exist. Titles are the pieces' own.
 */
const HOW_TO: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "If you've never done this",
    links: [
      { href: "/how-tos/parenting-how-to-start-family-worship", label: "How to Start Family Worship in Five Minutes" },
      { href: "/how-tos/fam-how-to-start-family-worship", label: "How to Start Family Worship (and Keep It When It Falls Apart)" },
      { href: "/how-tos/fam-how-to-pray-with-your-kids-at-bedtime", label: "How to Pray With Your Kids at Bedtime" },
      { href: "/how-tos/fam-how-to-use-a-family-catechism", label: "How to Use a Family Catechism" },
    ],
  },
  {
    title: "If a child won't sit still",
    links: [
      { href: "/how-tos/fam-how-to-read-the-bible-with-young-children", label: "How to Read the Bible With Young Children" },
      { href: "/help/family-devotions", label: "How do we do family devotions? For little ones, school-age kids, and teens" },
    ],
  },
  {
    title: "If you have a teenager",
    links: [
      { href: "/how-tos/fam-how-to-disciple-teenagers-at-home", label: "How to Disciple Teenagers at Home" },
      { href: "/how-tos/parenting-how-to-stay-close-to-a-pulling-away-teenager", label: "How to Stay Close to a Teenager Who Is Pulling Away" },
      { href: "/how-tos/parenting-how-to-answer-hard-questions-about-god", label: "How to Answer Your Child's Hard Questions About God" },
    ],
  },
  {
    title: "If your spouse doesn't believe",
    links: [
      { href: "/help/family-devotions", label: "My spouse isn't a Christian. Can I still do devotions with our kids?" },
      { href: "/study/bible/1-corinthians/7", label: "1 Corinthians 7 in the Study Bible, with notes" },
    ],
  },
];

function HowToShelf() {
  return (
    <section aria-labelledby="tb-howto">
      <h2 id="tb-howto" className="tb-section__title">
        How to
      </h2>
      <p className="tb-text" style={{ maxWidth: "62ch" }}>
        Most parents were never shown how to do this at home. These are short and plain, and each one answers a question you may be asking tonight.
      </p>
      <div className="tb-different__notes">
        {HOW_TO.map((group) => (
          <div key={group.title}>
            <h3 className="tb-different__title">{group.title}</h3>
            <ul className="tb-sets">
              {group.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <span className="tb-sets__name">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Family() {
  const { state, retry } = useFamilyIndex();
  const index = state.status === "ready" ? state.value : null;

  return (
    <Layout>
      <SEOMeta
        title="Family Devotions and Discipling Your Kids"
        description="For a family growing in faith together: devotions to do with your kids, a catechism, reading plans, help for teenagers' questions, and marriage."
        url="https://www.livewellbyjamesbell.co/family"
      />

      <PageHead eyebrow="Family" title="Disciple your whole family, in one place." lede="Devotions you can do with your kids tonight." />

      {/* TONIGHT */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) 16px var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <TonightCard index={state} retry={retry} />
          {/* A weekly reminder in the family's own calendar, back to tonight's devotion (U21). */}
          <RemindMe
            title="Family devotion"
            details="Tonight's family devotion: a passage, a question to talk about, and a prayer, in about ten minutes."
            href="/family/tonight"
            freq="WEEKLY"
            count={52}
            schedule="once a week for a year"
          />
          {/* A DEVOTION FOR TONIGHT: three questions, one devotion. It replaces nothing above. */}
          <div style={{ marginTop: "var(--s-5)", paddingTop: "var(--s-4)", borderTop: "1px solid var(--border)" }}>
            <TonightChooser index={index} />
          </div>
        </div>
      </section>

      {/* THIS WEEK AND THE SEASON */}
      {state.status !== "failed" && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) 16px" }}>
          <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
            <ThisWeek index={index} />
          </div>
        </section>
      )}

      {/* WHY, AND HOW TO BEGIN: the page on handing the faith to kids (F14), then the How to shelf (F8). */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <Link href="/topics/raising-children-in-a-secular-age" style={{ ...card, borderTop: "2px solid var(--mustard)", padding: "clamp(20px, 5vw, var(--s-5))", marginBottom: "var(--s-5)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Why this matters, and where to begin</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--ink)", marginBottom: "10px" }}>
              How do we hand the faith to our kids in a secular age?
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "12px" }}>
              Faith at home when the culture no longer hands it on: start smaller than you think, welcome the questions, and start again when a night falls apart.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Read the answer <ArrowRight size={14} />
            </span>
          </Link>
          <HowToShelf />
        </div>
      </section>

      {/* ADVENT: from the Sunday before Advent Sunday to Christmas only. It
          reads the year map, not the index, so it shows even if that fails. */}
      <AdventAtTheTable variant="card" />

      {/* CATECHISM — featured */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--gutter) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <Link href="/family/catechism" style={{ ...card, borderTop: "2px solid var(--mustard)", padding: "clamp(20px, 5vw, var(--s-5))" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Learn the faith together</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>
              The Family Catechism
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "12px" }}>
              Seventy-six questions, taken one at a time, starting at question 1. Each has an answer for the grown-ups and a shorter one for the little ones, a verse, a short word for the parent, and a prayer. A family learns them by saying them out loud together, and this device remembers which one you're on.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Start the catechism <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* FAMILY DEVOTIONS: the library, a page per devotion */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--gutter) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead eyebrow="Do this together" title="Family devotions" intro="Short devotions for the table or the couch: a passage, a question that starts a conversation, something to do together, and a prayer a child can pray." />
          <CardGrid
            label="Family devotions"
            items={[
              { href: "/family/devotions", title: "Every family devotion", dek: "Seventy-two weekly devotions, more than a year of them, plus daily readings for Thanksgiving week, Advent, and Holy Week. Each has its own page to send or print." },
              { href: "/tools/family-devotions", title: "Build a family devotion", dek: "Pick your kids' ages and a theme and get a complete 15-minute devotion with Scripture, teaching, an activity, and a prayer." },
            ]}
          />
        </div>
      </section>

      {/* IF YOUR TABLE LOOKS DIFFERENT (U21) */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <TableLooksDifferent />
        </div>
      </section>

      <StatementBand tone="dark">
        The faith gets handed down on purpose, usually at a table, by the people a child lives with.
      </StatementBand>

      {/* READING PLANS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--gutter) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <Link href="/family/reading-plans" style={{ ...card, borderTop: "2px solid var(--mustard)", padding: "clamp(20px, 5vw, var(--s-5))" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Read it together</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>
              Family Bible reading plans
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "12px" }}>
              A passage a day and a short prompt. Walk the life of Jesus, the great Old Testament story for kids, the Psalms, or a starter plan if your family is beginning or beginning again.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Browse the plans <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* TEENAGERS: rebuilt from what exists (audit 2026-11, F7). */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--gutter) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead eyebrow="For teenagers" title="The teen years" intro="With a teenager, start with their questions and talk less than they do. These are the pieces written for those years." />
          <CardGrid
            label="For teenagers"
            items={[
              { href: "/family/devotions", title: "Older questions on every devotion", dek: "Each weekly devotion has its own questions for ages eleven and up. Choose Older when you reach the Ask step.", cta: "See the devotions" },
              { href: "/tools/parent-teen-conversation", title: "The Parent and Teen Conversation", dek: "You each answer apart, then talk through the places where you see home differently.", cta: "Start the conversation" },
              { href: "/how-tos/fam-how-to-disciple-teenagers-at-home", title: "How to disciple teenagers at home", dek: "Staying in the room when they pull away, and answering the hard question instead of dodging it.", cta: "Read the guide" },
              { href: "/how-tos/parenting-how-to-stay-close-to-a-pulling-away-teenager", title: "How to stay close to a teenager who is pulling away", dek: "How to stay reachable without chasing, and present without smothering.", cta: "Read the guide" },
              { href: "/tools/family-devotions", title: "Devotions written for teens", dek: "In the devotion builder, pick Teens (12-18) and a theme, and you get a devotion written for that age.", cta: "Open the builder" },
              ...(SKEPTIC_TRACK_LIVE
                ? [{ href: "/skeptic-track", title: "Start here if you're a skeptic", dek: "Seven essays in argument order, for anyone working out whether this is true." }]
                : []),
              { href: "/answers", title: "On doubt and hard questions", dek: "Short answers to hard questions about God, the Bible, suffering, and doubt. They were written for adults, so read them together.", cta: "Read the answers" },
            ]}
          />
        </div>
      </section>

      <PullQuote>The household is the first church a child ever attends.</PullQuote>

      {/* PARENTING */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--gutter) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead eyebrow="Raising them in the faith" title="Parenting" intro="Most of parenting happens where nobody sees it. Here is Scripture for the hard moments, plus writing and tools for the long work of raising children." />
          <CardGrid
            label="Parenting guides and tools"
            items={[
              { href: "/tools/parenting-verses", title: "Parenting Bible verses", dek: "Scripture for fear, anger, identity, obedience, screens, and doubt, each with a short note for the parent." },
              { href: "/help/parenting", title: "When parenting is hard", dek: "For worn-out parents of little ones, of a teen who has gone quiet, or of a grown child who has left the faith." },
              { href: "/tools/parenting-guide", title: "Parenting stage guide", dek: "Age-specific guidance from toddlers to young adults, and one practice to start this week." },
              { href: "/writing/what-fatherhood-requires", title: "What fatherhood requires", dek: "On the inheritance you pass down, and the one you choose to break." },
              { href: "/life/raising-children-in-grace", title: "Raising children in grace", dek: "The deep guide: discipline that reaches the heart, faith, screens, and the teen years. You can't save your children, and you were never meant to." },
              { href: "/life/the-home-and-the-family", title: "The home and the family", dek: "The household as a school of grace: the table, family worship, and the open door." },
            ].filter((item) => isPublicEssayHref(item.href))}
          />
        </div>
      </section>

      {/* MARRIAGE */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--gutter) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead eyebrow="The center of the home" title="Marriage" intro="Your family stands on your marriage. Here is writing to read and a self-check to take." />
          <CardGrid
            min={440}
            label="Marriage guides and tools"
            items={[
              { href: "/help/marriage", title: "When a marriage is in trouble", dek: "For the marriage that has gone cold, loud, or broken, and for anyone afraid at home: safety first, then real help." },
              { href: "/tools/marriage-assessment", title: "Marriage Health Self-Check", dek: "Fifteen questions across communication, trust, conflict, and shared vision." },
              { href: "/writing/covenant-vs-contract-what-marriage-is", title: "Covenant vs. contract", dek: "What marriage is, and why the difference holds it together." },
              { href: "/life/marriage-the-long-covenant", title: "Marriage: the long covenant", dek: "The deep guide: the slow drift, conflict, money, desire, and the daily work of staying married well." },
            ].filter((item) => isPublicEssayHref(item.href))}
          />
        </div>
      </section>

      {/* TOOLS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--gutter) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionArt seed="family-tools" />
          <SectionHead eyebrow="For the home" title="Tools" intro="Practical tools to use around the table and through the week." />
          <CardGrid
            label="Tools for the home"
            items={[
              { href: "/tools/verse-finder", title: "Bible verse finder", dek: "Find Scripture for anxiety, grief, hope, or courage, and share it." },
              { href: "/tools/family-devotions", title: "Family devotion builder", dek: "Build a 15-minute devotion by your kids' ages and a theme." },
              { href: "/tools/bible-study", title: "Bible study guide", dek: "Study any book of the Bible with themes, questions, and reading strategies." },
              { href: "/tools/prayer-generator", title: "Prayer generator", dek: "Guided prayers for morning, evening, strength, guidance, and gratitude." },
              { href: "/tools/rule-of-life", title: "Rule of life builder", dek: "Build a rhythm of prayer, Scripture, rest, community, and mission that you can keep." },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}
