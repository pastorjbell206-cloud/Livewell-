/**
 * Table mode (/family/devotions/:id?mode=table): one devotion, one part per
 * screen, for a phone propped up at dinner. Large type; Back and Next at the
 * bottom in thumb reach (the Stepper); Listen on the passage; the screen kept
 * awake where the browser allows it; the step held in the URL (&step=), so a
 * reload or a locked phone comes back to the same place. It ends on a plain
 * "We did this tonight", which records the date on this device and nothing
 * more. The site header gives way to a slim bar with the way back out.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "wouter";
import { Stepper } from "@/components/study/Stepper";
import ScriptureNote from "@/components/ScriptureNote";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { devotionHref, type CatechismLine } from "@/lib/familyTable";
import { useWakeLock } from "@/lib/useWakeLock";
import { PartBody, partsOf } from "./DevotionParts";
import type { Devotion } from "./useFamilyData";

export function TableFrame({ title, leaveHref, children }: { title: string; leaveHref: string; children: ReactNode }) {
  return (
    <div className="tb-table">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="tb-table__bar">
        <Link href={leaveHref} className="tb-table__leave">
          Leave table mode
        </Link>
        <h1 className="tb-table__name">{title}</h1>
      </header>
      <main id="main" className="tb-table__main">
        {children}
      </main>
    </div>
  );
}

export default function TableMode({
  devotion,
  catechism,
  step,
  onStepChange,
  onFinish,
  finished,
}: {
  devotion: Devotion;
  catechism: CatechismLine | null;
  /** Zero-based. */
  step: number;
  onStepChange: (index: number) => void;
  onFinish: () => void;
  /** Set once "We did this tonight" is pressed: whether this device kept it. */
  finished: { ok: boolean } | null;
}) {
  useWakeLock(true);
  const { row } = devotion;
  const parts = partsOf(devotion, catechism);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (finished) doneRef.current?.focus();
  }, [finished]);

  const steps = parts.map((part) => ({
    id: part.id,
    title: part.title,
    content: (
      <>
        <PartBody part={part} devotion={devotion} catechism={catechism} />
        {part.id === "read" && <ScriptureNote rendering={devotion.rendering === "bsb" ? "bsb" : "paraphrase"} />}
      </>
    ),
  }));

  return (
    <TableFrame title={row.title} leaveHref={devotionHref(row.id)}>
      {finished ? (
        <div className="tb-table__done" aria-live="polite">
          <h2 ref={doneRef} tabIndex={-1}>
            Done for tonight
          </h2>
          <p className="tb-text">
            {finished.ok ? "This device will remember that you did this one tonight." : SAVE_FAILED}
          </p>
          <div className="tb-table__actions">
            <Link href="/family" className="st-action">
              Back to Family
            </Link>
          </div>
        </div>
      ) : (
        <Stepper
          steps={steps}
          label={`${row.title}, at the table`}
          step={step}
          onStepChange={onStepChange}
          onFinish={onFinish}
          finishLabel="We did this tonight"
        />
      )}
    </TableFrame>
  );
}
