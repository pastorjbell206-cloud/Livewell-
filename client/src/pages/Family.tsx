/**
 * Family (/family): tonight's devotion first, then this week's catechism
 * question and the season's daily sets, then (from the Sunday before Advent
 * Sunday to Christmas) the Advent calendar card, then the library, the
 * catechism, reading plans, and the tools for the home.
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
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import { PullQuote, StatementBand, SectionArt } from "@/components/EditorialBlocks";
import { CardGrid } from "@/components/editorial/CardGrid";
import { SectionHead } from "@/components/editorial/SectionHead";
import { isPublicEssayHref } from "@/lib/shelf";
import SubjectShelf from "@/components/SubjectShelf";
import { subjectById } from "@/lib/subjects";
import { localISODate } from "@/lib/familyYear";
import { FAMILY_SETS } from "@/lib/familyYear.generated";
import { catechismThisWeek, type FamilyIndex } from "@/lib/familyTable";
import TonightCard from "./family/TonightCard";
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
  const line = index ? catechismThisWeek(index.catechism) : null;
  const sets = FAMILY_SETS.filter((w) => w.end >= today).slice(0, 2);
  const year = Number(today.slice(0, 4));
  return (
    <div className="tb-week">
      <div>
        <h2 className="tb-section__title">This week</h2>
        {line && (
          <>
            <p className="tb-label">The catechism · Question {line.number}</p>
            <p className="tb-week__q">{line.question}</p>
            <Link href="/family/catechism" className="tb-link">
              Learn it together
            </Link>
          </>
        )}
      </div>
      <div>
        <h2 className="tb-section__title">The season</h2>
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

export default function Family() {
  const { state, retry } = useFamilyIndex();
  const index = state.status === "ready" ? state.value : null;

  return (
    <Layout>
      <SEOMeta
        title="Family Discipleship — Devotions, Apologetics, and Parenting"
        description="Everything a family needs to grow in faith together: devotions you can do with your kids, teen apologetics on why we believe, parenting Scripture, and marriage."
        url="https://www.livewellbyjamesbell.co/family"
      />

      <PageHead eyebrow="Family" title="Disciple your whole family, in one place." lede="Devotions you can actually do with your kids." />

      {/* TONIGHT */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) 16px var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <TonightCard index={state} retry={retry} />
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

      {/* ADVENT: from the Sunday before Advent Sunday to Christmas only. It
          reads the year map, not the index, so it shows even if that fails. */}
      <AdventAtTheTable variant="card" />

      {/* CATECHISM — featured */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <Link href="/family/catechism" style={{ ...card, borderTop: "2px solid var(--mustard)", padding: "var(--s-5)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Learn the faith together</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>
              The Family Catechism
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "12px" }}>
              Seventy-six questions, one a week, in the New City Catechism tradition. An answer for the grown-ups and one for the little ones, a verse, a short reflection, and a prayer. The oldest way a family has ever learned the faith.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Start the catechism <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* FAMILY DEVOTIONS: the library, a page per devotion */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
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

      <StatementBand tone="dark" eyebrow="The oldest classroom">
        The faith is handed down on purpose, at the table, or it is not handed down at all.
      </StatementBand>

      {/* READING PLANS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <Link href="/family/reading-plans" style={{ ...card, borderTop: "2px solid var(--mustard)", padding: "var(--s-5)" }}>
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

      {/* TEEN APOLOGETICS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead eyebrow="For teenagers" title="Why we believe" intro="Faith does not survive on what alone. A teenager needs the why. Honest answers to the hard questions — the resurrection, the Bible, suffering, science, other religions, and doubt itself." />
          <CardGrid
            min={440}
            items={[
              ...(SKEPTIC_TRACK_LIVE
                ? [{ href: "/skeptic-track", title: "Start here if you're a skeptic", dek: "Seven essays in argument order, for anyone working out whether this is true." }]
                : []),
              { href: "/answers", title: "On doubt and hard questions", dek: "Doubt is not the enemy of faith. Short, honest answers to the questions." },
            ]}
          />
        </div>
      </section>

      <PullQuote>The household is the first church a child ever attends.</PullQuote>

      {/* PARENTING */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead eyebrow="Raising them in the faith" title="Parenting" intro="The work no one applauds, done where no congregation watches. Scripture for the real moments, plus writing and tools for the long obedience of raising children who can carry weight." />
          <CardGrid
            label="Parenting guides and tools"
            items={[
              { href: "/tools/parenting-verses", title: "Parenting Bible verses", dek: "Scripture for fear, anger, identity, obedience, screens, and doubt — each with a short note for the parent." },
              { href: "/help/parenting", title: "When parenting is hard", dek: "For worn-out parents of little ones, of a teen who has gone quiet, or of a grown child who has left the faith." },
              { href: "/tools/parenting-guide", title: "Parenting stage guide", dek: "Age-specific guidance from toddlers to young adults, and one practice to start this week." },
              { href: "/writing/what-fatherhood-requires", title: "What fatherhood requires", dek: "On the inheritance you pass down, and the one you choose to break." },
              { href: "/life/raising-children-in-grace", title: "Raising children in grace", dek: "The deep guide: discipline that reaches the heart, faith, screens, and the teen years. You cannot save your children, and you were never meant to." },
              { href: "/life/the-home-and-the-family", title: "The home and the family", dek: "The household as a school of grace: the table, family worship, and the open door." },
            ].filter((item) => isPublicEssayHref(item.href))}
          />
        </div>
      </section>

      {/* MARRIAGE */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead eyebrow="The center of the home" title="Marriage" intro="A home is built on a covenant before it is built on anything else. Writing and a real assessment for the marriage your family is standing on." />
          <CardGrid
            min={440}
            label="Marriage guides and tools"
            items={[
              { href: "/help/marriage", title: "When a marriage is in trouble", dek: "For the marriage that has gone cold, loud, or broken, and for anyone afraid at home: safety first, then real help." },
              { href: "/tools/marriage-assessment", title: "Marriage health assessment", dek: "A 15-question diagnostic across communication, trust, conflict, and shared vision." },
              { href: "/writing/covenant-vs-contract-what-marriage-is", title: "Covenant vs. contract", dek: "What marriage actually is, and why the difference holds it together." },
              { href: "/life/marriage-the-long-covenant", title: "Marriage: the long covenant", dek: "The deep guide: the slow drift, conflict, money, desire, and the daily work of staying married well." },
            ].filter((item) => isPublicEssayHref(item.href))}
          />
        </div>
      </section>

      {/* TOOLS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionArt seed="family-tools" />
          <SectionHead eyebrow="For the home" title="Tools" intro="Practical tools to use around the table and through the week." />
          <CardGrid
            label="Tools for the home"
            items={[
              { href: "/tools/verse-finder", title: "Bible verse finder", dek: "Find Scripture for any season — anxiety, grief, hope, courage — and share it." },
              { href: "/tools/family-devotions", title: "Family devotion builder", dek: "Build a 15-minute devotion by your kids' ages and a theme." },
              { href: "/tools/bible-study", title: "Bible study guide", dek: "Study any book of the Bible with themes, questions, and reading strategies." },
              { href: "/tools/prayer-generator", title: "Prayer generator", dek: "Guided prayers for morning, evening, strength, guidance, and gratitude." },
              { href: "/tools/rule-of-life", title: "Rule of life builder", dek: "Build a sustainable rhythm of prayer, Scripture, rest, community, and mission you can actually keep." },
            ]}
          />
        </div>
      </section>
      {subjectById("family") && <SubjectShelf subject={subjectById("family")!} />}
    </Layout>
  );
}
