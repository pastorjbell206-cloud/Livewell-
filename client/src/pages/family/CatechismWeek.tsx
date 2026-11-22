/**
 * This week's question, laid out for a family at a table (/family/catechism):
 * the question, the answer, the child's answer, one line in plain words, the
 * verse it rests on (the Berean Standard Bible, its reference beside it), one
 * thing for an older child to talk about, the prayer, and the matching Bible
 * Explorer film where there is one (lib/familyFilms). Every word comes from
 * client/public/family-catechism.json; nothing here adds to it.
 *
 * Three small steps for the week (say it, read the verse, talk about it) are
 * ticked on this device and start clean when the family moves on
 * (lib/familyCatechism). "Print this card" prints the card alone (.cw- print
 * rules in index.css).
 */
import { useState } from "react";
import { Printer } from "lucide-react";
import ScriptureNote from "@/components/ScriptureNote";
import { VerseRef } from "@/components/VerseRef";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { WEEK_STEPS, readCatechismWeek, toggleWeekStep, type WeekStepId } from "@/lib/familyCatechism";
import type { FamilyFilm } from "@/lib/familyFilms";
import WatchFirst, { WatchFirstPrintLine } from "./WatchFirst";

export interface CatechismEntry {
  number: number;
  part: string;
  question: string;
  answer: string;
  kidsAnswer: string;
  scripture: string;
  scriptureText: string;
  commentary: string;
  /** One sentence in plain words for a small child. */
  plainWords?: string;
  /** One thing for an older child to talk about. */
  talkAbout?: string;
  prayer?: string;
}

/** The parts of one question that sit beside its answer, shared by the week's card and the list. */
export function QuestionExtras({ e }: { e: CatechismEntry }) {
  return (
    <>
      {e.plainWords && (
        <div className="cw-block">
          <span className="eyebrow">In plain words</span>
          <p className="cw-text">{e.plainWords}</p>
        </div>
      )}
      <div className="cw-block">
        {/* The verse is printed below it, so the reference goes to its chapter. */}
        <span className="eyebrow">
          <VerseRef reference={e.scripture} mode="link" />
        </span>
        <p className="cw-verse">{e.scriptureText}</p>
      </div>
      {e.talkAbout && (
        <div className="cw-block">
          <span className="eyebrow">Talk about it</span>
          <p className="cw-text">{e.talkAbout}</p>
        </div>
      )}
    </>
  );
}

/** The week's three steps for one question. Keyed by the question, so another question's ticks are never shown as this one's. */
function WeekSteps({ number }: { number: number }) {
  const [steps, setSteps] = useState<WeekStepId[]>(() => readCatechismWeek(number));
  const [kept, setKept] = useState(true);
  const tick = (id: WeekStepId) => {
    const next = toggleWeekStep(number, steps, id);
    setSteps(next.steps);
    setKept(next.ok);
  };
  return (
    <fieldset className="cw-steps no-print">
      <legend className="eyebrow">A week with this question</legend>
      {WEEK_STEPS.map((s) => (
        <label key={s.id} className="cw-step">
          <input type="checkbox" checked={steps.includes(s.id)} onChange={() => tick(s.id)} />
          <span>
            <strong>{s.label}.</strong> {s.line}
          </span>
        </label>
      ))}
      <p className="cw-note" aria-live="polite">
        {kept ? "" : SAVE_FAILED}
      </p>
    </fieldset>
  );
}

export default function CatechismWeek({ e, total, label, film, onPractice }: {
  e: CatechismEntry;
  total: number;
  /** "Your family's place: Question 4 of 76" or "This week: Question 47". */
  label: string;
  film: FamilyFilm | null;
  /** Take this question to the say-it-aloud card. */
  onPractice: () => void;
}) {
  return (
    <>
      <p className="eyebrow cw-label no-print">{label}</p>
      <article className="cw-card print-paper" aria-labelledby="cw-q">
        <p className="cw-printhead">
          The Family Catechism · Question {e.number} of {total}
        </p>
        <h2 id="cw-q" className="cw-q">
          {e.question}
        </h2>
        <p className="cw-a">{e.answer}</p>
        <div className="cw-block">
          <span className="eyebrow">For the little ones</span>
          <p className="cw-kids">{e.kidsAnswer}</p>
        </div>
        <QuestionExtras e={e} />
        {e.prayer && (
          <div className="cw-block">
            <span className="eyebrow">Pray</span>
            <p className="cw-prayer">{e.prayer}</p>
          </div>
        )}
        <ScriptureNote rendering="bsb" />
        {film && (
          <>
            <WatchFirst key={film.slug} film={film} backLabel="Back to the question" />
            <WatchFirstPrintLine film={film} />
          </>
        )}
        <details className="cw-grown no-print">
          <summary>For the grown-ups</summary>
          <p className="cw-text">{e.commentary}</p>
        </details>
      </article>

      <WeekSteps key={e.number} number={e.number} />

      <div className="cw-actions no-print">
        <button type="button" className="btn btn--quiet" onClick={onPractice}>
          Say this one aloud
        </button>
        <button type="button" className="btn btn--quiet cw-print" onClick={() => window.print()}>
          <Printer aria-hidden="true" size={16} strokeWidth={1.75} />
          Print this card
        </button>
      </div>
    </>
  );
}
