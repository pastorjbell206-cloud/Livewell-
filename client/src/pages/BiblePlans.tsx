/**
 * Bible reading plans (/study/plans): every reading plan on the site on one
 * page, as cards that say how long each is and who it is for, each opening
 * the real plan (TOOLS-PLAN unit 18, the page that brings the three sets of
 * plans together).
 *
 * - The year through the whole story (lib/storyPlan, /study/bible/guides/whole-story-2027).
 * - The five charts to print (client/src/data/bible-reading-plans.json; the
 *   PDFs are built by scripts/lib/reading-plans.mjs inside `pnpm pdfs`).
 * - Proverbs in 31 days (/tools/proverbs-31) and the Bible's story at your
 *   own pace (/study/bible/story).
 * - The four family plans (client/public/family-reading-plans.json, opened
 *   at /family/reading-plans). Their names, lengths and audiences are written
 *   here so the page draws at once; BiblePlans.test.tsx holds them to the file.
 *
 * Something to touch: two rows of chips (who is reading, and how long you
 * have) narrow the cards. Each card draws its plan as days, a square a day
 * in weeks of seven, so a month is a small block and a year a long strip.
 * A plan this device has started says so; nothing counts days missed.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CalendarDays, Printer } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import { readStoredJSON, isArrayOf } from "@/lib/storage";
import { readPlanStarts } from "@/lib/familyPlans";
import READING from "@/data/bible-reading-plans.json";
import "./home/home.css";
import "./plans.css";

type Who = "me" | "family";
type Size = "month" | "season" | "year" | "pace";

export interface ReadingPlanCard {
  id: string;
  title: string;
  /** Days in the plan; null for a path read at your own pace. */
  days: number | null;
  /** How long, in words, when the days alone do not say it. */
  length?: string;
  forWhom: string;
  who: Who;
  href: string;
  /** "open": a page on the site; "print": a chart to print (US Letter, with A4 beside it). */
  kind: "open" | "print";
  tone: "clay" | "olive" | "blue";
}

const PRINT_FOR: Record<string, { forWhom: string; tone: ReadingPlanCard["tone"] }> = {
  "bible-in-a-year": { forWhom: "Genesis to Revelation in order, starting any day.", tone: "clay" },
  "new-testament-in-90-days": { forWhom: "The whole New Testament in one season.", tone: "blue" },
  "psalms-in-30-days": { forWhom: "A month of praying the Psalms.", tone: "olive" },
  "matthew-in-a-month": { forWhom: "A chapter a day of one Gospel.", tone: "olive" },
  "lent-with-mark": { forWhom: "Mark's Gospel through the forty days of Lent.", tone: "blue" },
};

/** The family plans, as /family-reading-plans.json names them (held to the file by the test). */
export const FAMILY_PLANS: { id: string; title: string; days: number; audience: string }[] = [
  { id: "life-of-jesus", title: "The Life of Jesus", days: 30, audience: "All ages" },
  { id: "heroes-and-promises", title: "The Old Testament Story in 30 Days", days: 30, audience: "Younger kids" },
  { id: "psalms-for-the-family", title: "Psalms for the Family", days: 30, audience: "All ages" },
  { id: "foundations", title: "21 Days for a Family New to Faith", days: 21, audience: "Families new to faith" },
];

export const PLANS: ReadingPlanCard[] = [
  {
    id: "whole-story-2027",
    title: "The Bible in a year, 2027",
    days: 365,
    forWhom: "Every chapter in the order the story happened. Your place is kept.",
    who: "me",
    href: "/study/bible/guides/whole-story-2027",
    kind: "open",
    tone: "clay",
  },
  ...READING.plans.map((p) => ({
    id: p.id,
    title: p.title,
    days: p.days,
    forWhom: PRINT_FOR[p.id]?.forWhom ?? "A chart to print and keep.",
    who: "me" as Who,
    href: `/downloads/reading-plans/${p.id}-letter.pdf`,
    kind: "print" as const,
    tone: PRINT_FOR[p.id]?.tone ?? ("blue" as const),
  })),
  {
    id: "proverbs-31",
    title: "Proverbs in 31 Days",
    days: 31,
    forWhom: "A chapter of Proverbs a day, matched to the date.",
    who: "me",
    href: "/tools/proverbs-31",
    kind: "open",
    tone: "olive",
  },
  {
    id: "story",
    title: "The Bible's story",
    days: null,
    length: "Your own pace",
    forWhom: "The whole Bible as one story in eleven parts.",
    who: "me",
    href: "/study/bible/story",
    kind: "open",
    tone: "blue",
  },
  ...FAMILY_PLANS.map((p) => ({
    id: p.id,
    title: p.title,
    days: p.days,
    forWhom: `For the family: ${p.audience.toLowerCase()}.`,
    who: "family" as Who,
    href: "/family/reading-plans",
    kind: "open" as const,
    tone: "olive" as const,
  })),
];

const sizeOf = (p: ReadingPlanCard): Size => (p.days === null ? "pace" : p.days <= 31 ? "month" : p.days <= 100 ? "season" : "year");

const WHO: { id: Who | null; label: string }[] = [
  { id: null, label: "Anyone" },
  { id: "me", label: "Just me" },
  { id: "family", label: "With my family" },
];
const SIZES: { id: Size | null; label: string }[] = [
  { id: null, label: "Any length" },
  { id: "month", label: "A month or less" },
  { id: "season", label: "A season" },
  { id: "year", label: "A year" },
  { id: "pace", label: "My own pace" },
];

/** A plan drawn as its days: a square a day, a column a week. A month is a small block; a year is a long strip. */
function Days({ days, tone }: { days: number | null; tone: ReadingPlanCard["tone"] }) {
  const cell = 7;
  const gap = 2;
  const h = 7 * (cell + gap) - gap;
  if (days === null) {
    // The story: eleven parts, each a block.
    const bw = 18;
    const w = 11 * (bw + gap) - gap;
    return (
      <svg className="bp-days" viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
        {Array.from({ length: 11 }, (_, i) => (
          <rect key={i} className={`bp-cell ${i === 0 ? "bp-light" : `bp-tone--${tone}`}`} x={i * (bw + gap)} y={0} width={bw} height={h} />
        ))}
      </svg>
    );
  }
  const w = Math.ceil(days / 7) * (cell + gap) - gap;
  return (
    <svg className="bp-days" viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      {Array.from({ length: days }, (_, d) => (
        <rect key={d} className={`bp-cell ${d === 0 ? "bp-light" : `bp-tone--${tone}`}`} x={Math.floor(d / 7) * (cell + gap)} y={(d % 7) * (cell + gap)} width={cell} height={cell} />
      ))}
    </svg>
  );
}

/** What this device remembers of a plan, said without a count of days missed. */
function useStarted(): Record<string, string> {
  return useMemo(() => {
    const out: Record<string, string> = {};
    const year = readStoredJSON<number[]>("livewell-progress-story-2027", isArrayOf((x): x is number => typeof x === "number"), []);
    if (year.length) out["whole-story-2027"] = "Started here";
    const story = readStoredJSON<string[]>("livewell-progress-bible", isArrayOf((x): x is string => typeof x === "string"), []);
    if (story.length) out.story = "Started here";
    const starts = readPlanStarts().starts;
    for (const p of FAMILY_PLANS) if (starts[p.id]) out[p.id] = "Started here";
    return out;
  }, []);
}

export default function BiblePlans() {
  const [who, setWho] = useState<Who | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const started = useStarted();
  const shown = PLANS.filter((p) => (who === null || p.who === who) && (size === null || sizeOf(p) === size));

  return (
    <Layout>
      <SEOMeta
        title="Bible Reading Plans: Every Plan in One Place"
        description="Every Bible reading plan on LiveWell: the Bible in a year, the New Testament in ninety days, the Psalms in a month, and plans for families. Free."
        url="https://www.livewellbyjamesbell.co/study/plans"
      />

      <PageHead
        door="Bible"
        doorHref="/study"
        title="Bible reading plans"
        line="Pick one by how long you have and who is reading."
        plate="sundial"
      />

      <section className="home-sec home-sec--warm bp-sec" aria-labelledby="bp-title">
        <div className="home-wrap">
          <SectionHead icon={CalendarDays} label={`${PLANS.length} plans`} title="Find your plan." id="bp-title" />
          <div className="bp-filters">
            <div className="bp-row" role="group" aria-label="Who is reading">
              {WHO.map((o) => (
                <button key={o.label} type="button" className="home-chip" aria-pressed={who === o.id} onClick={() => setWho(o.id)}>
                  {o.label}
                </button>
              ))}
            </div>
            <div className="bp-row" role="group" aria-label="How long">
              {SIZES.map((o) => (
                <button key={o.label} type="button" className="home-chip" aria-pressed={size === o.id} onClick={() => setSize(o.id)}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <p className="sr-only" role="status">
            {shown.length} {shown.length === 1 ? "plan" : "plans"}
          </p>

          {shown.length === 0 ? (
            <p className="bp-none">
              No plan fits both. <button type="button" onClick={() => { setWho(null); setSize(null); }}>Show every plan</button>
            </p>
          ) : (
            <ul className="bp-cards">
              {shown.map((p) => (
                <li key={p.id} className="bp-card">
                  <div className="bp-art">
                    <Days days={p.days} tone={p.tone} />
                  </div>
                  <p className="bp-len">
                    {p.days === null ? p.length : `${p.days} days`}
                    {started[p.id] && <span className="bp-started">{started[p.id]}</span>}
                  </p>
                  <h3 className="bp-title">{p.title}</h3>
                  <p className="bp-for">{p.forWhom}</p>
                  <div className="bp-do">
                    {p.kind === "print" ? (
                      <>
                        <a href={p.href} className="bp-go" target="_blank" rel="noopener">
                          <Printer aria-hidden="true" size={18} strokeWidth={1.75} />
                          Print it<span className="sr-only">: {p.title}, US Letter PDF</span>
                        </a>
                        <a href={p.href.replace(/-letter\.pdf$/, "-a4.pdf")} className="bp-alt" target="_blank" rel="noopener">
                          A4<span className="sr-only"> PDF, {p.title}</span>
                        </a>
                      </>
                    ) : (
                      <Link href={p.href} className="bp-go">
                        Open the plan<span className="sr-only">: {p.title}</span>
                        <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
}
