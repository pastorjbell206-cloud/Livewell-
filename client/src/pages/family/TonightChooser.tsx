/**
 * "A devotion for tonight" on /family (audit 2026-11, Step 2): how old the
 * children are, how long the family has, and what is going on tonight, then
 * one devotion and "Start at the table". Three taps. The ages and the minutes
 * are kept on this device (lib/familyChooser), so the next night is one tap.
 * The ages also set whose questions the devotion asks (the same choice the
 * Ask step offers). Tonight's devotion on the calendar is untouched.
 */
import { useEffect, useId, useRef, useState } from "react";
import { Link } from "wouter";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { AGES, MINUTES, TONIGHTS, chooseDevotion, readChooserAnswers, saveChooserAnswers, type ChooserAnswers } from "@/lib/familyChooser";
import { devotionHref, readFamilyProgress, saveFamilyBand, tableHref, tonightOn, type FamilyIndex } from "@/lib/familyTable";
import { localISODate } from "@/lib/familyYear";

function Chips<T extends string>({ legend, options, value, onPick }: { legend: string; options: readonly { key: T; label: string }[]; value: T | null; onPick: (key: T) => void }) {
  const name = useId();
  return (
    <fieldset className="tb-bands">
      <legend className="tb-bands__legend">{legend}</legend>
      <div className="tb-bands__options">
        {options.map((o) => (
          <label key={o.key} className="tb-band">
            <input type="radio" name={name} value={o.key} checked={value === o.key} onChange={() => onPick(o.key)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function TonightChooser({ index }: { index: FamilyIndex | null }) {
  const [today] = useState(() => localISODate());
  const [answers, setAnswers] = useState<ChooserAnswers>(() => readChooserAnswers());
  const [kept, setKept] = useState(true);
  const [tonight, setTonight] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  // "Pick another for tonight" on the Done card, and on /family/tonight, lands here.
  useEffect(() => {
    if (window.location.hash === "#choose") ref.current?.scrollIntoView();
  }, []);

  const answer = (next: ChooserAnswers) => {
    setAnswers(next);
    setKept(saveChooserAnswers(next));
  };
  const pickAges = (ages: NonNullable<ChooserAnswers["ages"]>) => {
    answer({ ...answers, ages });
    const band = AGES.find((a) => a.key === ages)?.band;
    if (band) saveFamilyBand(band);
  };

  const weekly = index?.devotions.filter((r) => r.kind === "weekly").map((r) => r.id) ?? [];
  const ready = !!index && !!answers.ages && !!answers.minutes && !!tonight;
  const id = ready ? chooseDevotion(tonight, readFamilyProgress(), tonightOn(today)?.id ?? null, weekly) : null;
  const row = id ? index?.devotions.find((r) => r.id === id) : undefined;
  // Five minutes covers the first of a weekly devotion's three short nights; a day of a daily set is already that short.
  const short = answers.minutes === "five" && row?.kind === "weekly";

  return (
    <section ref={ref} id="choose" className="tb-choose" aria-labelledby="tb-choose" style={{ scrollMarginTop: "88px" }}>
      <h2 id="tb-choose" className="tb-section__title">
        A devotion for tonight
      </h2>
      <p className="tb-text" style={{ maxWidth: "62ch" }}>
        If tonight isn't an ordinary night, answer three questions and you'll have one devotion that fits it. This device remembers the first two, so tomorrow it's one tap.
      </p>
      <Chips legend="How old are the kids?" options={AGES} value={answers.ages} onPick={pickAges} />
      <Chips legend="How long do you have?" options={MINUTES} value={answers.minutes} onPick={(minutes) => answer({ ...answers, minutes })} />
      <Chips legend="What's going on tonight?" options={TONIGHTS} value={tonight} onPick={setTonight} />
      <div aria-live="polite">
        {!kept && <p className="tb-bands__note">{SAVE_FAILED}</p>}
        {ready && row && (
          <div className="tb-tonight" style={{ minHeight: 0, marginTop: "var(--s-3)" }}>
            <p className="eyebrow" style={{ margin: 0 }}>
              For tonight
            </p>
            <h3 className="tb-tonight__title">{row.title}</h3>
            <p className="tb-tonight__meta">{[row.theme, row.passage, short ? "About five minutes" : row.kind === "weekly" ? "About ten minutes" : null].filter(Boolean).join(" · ")}</p>
            {short && <p className="tb-line">With five minutes, do the first two steps, Read and Talk, and stop there. The rest keeps for another night.</p>}
            {answers.minutes === "more" && (
              <p className="tb-line">
                If there's time afterward, read a day from{" "}
                <Link href="/family/reading-plans" className="tb-different__link">
                  a family reading plan
                </Link>
                .
              </p>
            )}
            <div className="tb-tonight__actions">
              <Link href={tableHref(row.id)} className="pg-action">
                Start at the table
              </Link>
              <Link href={devotionHref(row.id)} className="pg-action pg-action--quiet">
                Read it first
              </Link>
            </div>
          </div>
        )}
        {ready && !row && <p className="tb-bands__note">No devotion is set for this date yet. Choose one from the library.</p>}
      </div>
    </section>
  );
}
