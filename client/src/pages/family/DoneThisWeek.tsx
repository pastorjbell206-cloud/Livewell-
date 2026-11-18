/**
 * "Done this week" (audit 2026-11, F3): what /family and /family/tonight show
 * once a family has done the week's devotion. There is one devotion a week
 * outside the daily sets, and until now the second night handed the family
 * the same devotion and the same Start button. This says when the next one
 * comes and offers the rest of the week from what is already here: the
 * family's catechism question, today's day in a reading plan it has started,
 * and the week's passage to say again.
 *
 * Titles come from the static year map, so the card stands without the
 * network; the catechism and reading-plan rows fill in when their files load
 * and are simply absent when they do not.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { fetchJson } from "@/lib/fetch-json";
import { readCatechismPlace } from "@/lib/familyCatechism";
import { planDayOn, readPlanStarts } from "@/lib/familyPlans";
import { catechismFor, devotionHref, nextNewNight, nextSaid, tableHref, tonightTitle, whenSaid, type FamilyDone, type FamilyIndex } from "@/lib/familyTable";

interface PlanDay {
  day: number;
  passage: string;
}
interface Plan {
  id: string;
  title: string;
  days: PlanDay[];
}

const isPlans = (x: unknown): x is Plan[] =>
  Array.isArray(x) && x.every((p) => typeof p?.id === "string" && typeof p?.title === "string" && Array.isArray(p?.days));

/** Today's day in the first plan this family has started and not finished. */
export function usePlanToday(today: string): { title: string; day: number; total: number; passage: string } | null {
  const [starts] = useState(() => readPlanStarts().starts);
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const any = Object.keys(starts).length > 0;
  useEffect(() => {
    if (!any) return;
    let live = true;
    // A missing file only leaves this row out; the card says nothing false without it.
    fetchJson("/family-reading-plans.json", isPlans)
      .then((d) => live && setPlans(d))
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [any]);
  for (const plan of plans ?? []) {
    const start = starts[plan.id];
    const at = start ? planDayOn(start, today, plan.days.length) : null;
    const day = at && !at.finished ? plan.days[at.day - 1] : undefined;
    if (at && day) return { title: plan.title, day: at.day, total: plan.days.length, passage: day.passage };
  }
  return null;
}

export default function DoneThisWeek({
  id,
  title,
  passage,
  done,
  today,
  index,
  chooseHref = "#choose",
}: {
  /** The devotion that was done, and its title and passage. */
  id: string;
  title: string;
  passage?: string;
  done: FamilyDone;
  today: string;
  index: FamilyIndex | null;
  /** Where "Pick another for tonight" goes: the chooser on /family. */
  chooseHref?: string;
}) {
  const [place] = useState(() => readCatechismPlace());
  const next = nextNewNight(today);
  const nextTitle = next ? tonightTitle(next.tonight) : null;
  const tomorrow = !!next && nextSaid(next.date, today) === "tomorrow";
  const question = index ? catechismFor(index.catechism, place) : null;
  const plan = usePlanToday(today);

  return (
    <>
      <h2 className="tb-tonight__title">{tomorrow && done.date === today ? "Done for tonight" : "Done this week"}</h2>
      <p className="tb-tonight__meta">
        You did {title} {whenSaid(done.date, today)}.
        {next && (
          <>
            {" "}
            The next one{nextTitle ? `, ${nextTitle},` : ""} comes {nextSaid(next.date, today)}.
          </>
        )}
      </p>
      {!tomorrow && (
        <p className="tb-line">There's one devotion a week. The other nights can be small: a question said out loud, a few verses, a prayer before bed.</p>
      )}
      <ul className="tb-sets" aria-label="For the other nights this week">
        {question && (
          <li>
            <Link href="/family/catechism">
              <span className="tb-sets__name">The catechism: {question.line.question}</span>
              <span className="tb-sets__when">Question {question.line.number}</span>
            </Link>
          </li>
        )}
        <li>
          <Link href="/family/reading-plans">
            {plan ? (
              <>
                <span className="tb-sets__name">
                  {plan.title}: {plan.passage}
                </span>
                <span className="tb-sets__when">
                  Day {plan.day} of {plan.total}
                </span>
              </>
            ) : (
              <>
                <span className="tb-sets__name">Start a reading plan</span>
                <span className="tb-sets__when">A passage a day</span>
              </>
            )}
          </Link>
        </li>
        {passage && (
          <li>
            <Link href={devotionHref(id)}>
              <span className="tb-sets__name">Say the verse again: {passage}</span>
              <span className="tb-sets__when">{tomorrow ? "Tonight's passage" : "This week's passage"}</span>
            </Link>
          </li>
        )}
      </ul>
      <div className="tb-tonight__actions">
        {chooseHref.startsWith("#") ? (
          <a href={chooseHref} className="pg-action pg-action--quiet">
            Pick another for tonight
          </a>
        ) : (
          <Link href={chooseHref} className="pg-action pg-action--quiet">
            Pick another for tonight
          </Link>
        )}
        <Link href={tableHref(id)} className="pg-action pg-action--quiet">
          Do this one again
        </Link>
      </div>
    </>
  );
}
