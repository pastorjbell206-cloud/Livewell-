/**
 * The parts of one family devotion (master plan 5.2): Read, Talk, Ask, Do,
 * Remember, Pray. The devotion's page shows them one after another; table
 * mode shows one per screen. Each part is the existing writing, as it is in
 * the data; nothing here adds to it.
 *
 * Ask (U21): where a devotion has questions for younger children and for
 * older, the family picks whose questions to ask (Together shows both), and
 * the choice is kept on this device. A devotion with one list asks it of the
 * whole table.
 */
import { useId, useRef } from "react";
import { Link } from "wouter";
import ListenButton from "@/components/ListenButton";
import { BAND_LABELS, type CatechismLine, type FamilyBand } from "@/lib/familyTable";
import type { Devotion } from "./useFamilyData";

export interface Part {
  id: "read" | "talk" | "ask" | "do" | "remember" | "pray";
  title: string;
}

/** The parts this devotion has, in order: a day of a daily set has nothing to do, and Remember waits on the catechism. */
export function partsOf(d: Devotion, catechism: CatechismLine | null): Part[] {
  const parts: Part[] = [
    { id: "read", title: "Read" },
    { id: "talk", title: "Talk" },
  ];
  if (d.questions.length) parts.push({ id: "ask", title: "Ask" });
  if (d.activity) parts.push({ id: "do", title: "Do" });
  if (catechism) parts.push({ id: "remember", title: "Remember" });
  parts.push({ id: "pray", title: "Pray" });
  return parts;
}

/** Three short nights instead of one (MASTER-PLAN 5.2). */
const NIGHTS: Part["id"][][] = [
  ["read", "talk"],
  ["ask", "do"],
  ["remember", "pray"],
];

/**
 * The suggested split, from the parts this devotion has: each night's parts
 * ("Ask and Do") and the table-mode step it starts on (from 1).
 */
export function nightsOf(parts: Part[]): { label: string; step: number }[] {
  const nights: { label: string; step: number }[] = [];
  for (const ids of NIGHTS) {
    const here = parts.filter((p) => ids.includes(p.id));
    if (here.length) nights.push({ label: here.map((p) => p.title).join(" and "), step: parts.indexOf(here[0]) + 1 });
  }
  return nights;
}

/** The passage, read aloud on request, with the way into the Study Bible. */
export function ReadPart({ devotion }: { devotion: Devotion }) {
  const passageRef = useRef<HTMLDivElement>(null);
  const { row } = devotion;
  return (
    <>
      <p className="tb-ref">{row.passage}</p>
      <div ref={passageRef}>
        <p className="tb-passage">{devotion.passageText}</p>
      </div>
      <div className="tb-tools no-print">
        <ListenButton target={passageRef} title={row.passage} />
        <Link href={row.href} className="tb-link">
          Open {row.passage} in the Study Bible
        </Link>
      </div>
    </>
  );
}

export function TalkPart({ devotion }: { devotion: Devotion }) {
  return (
    <>
      {devotion.bigIdea && <p className="tb-big">{devotion.bigIdea}</p>}
      <div className="tb-body">
        {devotion.reflection
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean)
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}
      </div>
      {/* A devotion on politics speaks to both sides of the table, in turn (U11). */}
      {devotion.sides?.map((side) => (
        <div key={side.label} className="tb-side">
          <p className="tb-label">{side.label}</p>
          <p className="tb-text">{side.text}</p>
        </div>
      ))}
    </>
  );
}

const BANDS: FamilyBand[] = ["together", "younger", "older"];

export interface AskChoice {
  band: FamilyBand;
  onBand: (band: FamilyBand) => void;
  /** After a choice: whether this device kept it. Null before one is made. */
  kept: boolean | null;
}

/** Whose questions to ask tonight: Together, Younger, or Older. */
export function BandSwitch({ band, onBand, kept }: AskChoice) {
  const name = useId();
  return (
    <fieldset className="tb-bands no-print">
      <legend className="tb-bands__legend">Questions for</legend>
      <div className="tb-bands__options">
        {BANDS.map((b) => (
          <label key={b} className="tb-band">
            <input type="radio" name={name} value={b} checked={band === b} onChange={() => onBand(b)} />
            <span>{BAND_LABELS[b]}</span>
          </label>
        ))}
      </div>
      <p className="tb-bands__note" aria-live="polite">
        Younger is about 4 to 10, older about 11 to 17.
        {kept === true && " This device will remember your choice."}
        {kept === false && " This browser would not keep your choice, so it lasts only while this page is open."}
      </p>
    </fieldset>
  );
}

function Questions({ label, list }: { label: string; list: string[] }) {
  return (
    <>
      <p className="tb-label">{label}</p>
      <ol className="tb-questions">
        {list.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ol>
    </>
  );
}

export function AskPart({ devotion, ask }: { devotion: Devotion; ask?: AskChoice }) {
  const { bands } = devotion;
  if (!bands) return <Questions label="Together" list={devotion.questions} />;
  const band = ask?.band ?? "together";
  // Both bands sit side by side on paper, so the page still prints as one card.
  return (
    <>
      {ask && <BandSwitch {...ask} />}
      <div className={band === "together" ? "tb-asks tb-asks--two" : "tb-asks"}>
        {band !== "older" && (
          <div>
            <Questions label="For younger children" list={bands.younger} />
          </div>
        )}
        {band !== "younger" && (
          <div>
            <Questions label="For older children" list={bands.older} />
          </div>
        )}
      </div>
    </>
  );
}

export function DoPart({ devotion }: { devotion: Devotion }) {
  return <p className="tb-text">{devotion.activity}</p>;
}

/** This week's catechism question, the one /family/catechism features. */
export function RememberPart({ line }: { line: CatechismLine }) {
  return (
    <>
      <p className="tb-label">This week's question · Question {line.number}</p>
      <p className="tb-big">{line.question}</p>
      {line.kidsAnswer && (
        <>
          <p className="tb-label">For the little ones</p>
          <p className="tb-text">{line.kidsAnswer}</p>
        </>
      )}
      <Link href="/family/catechism" className="tb-link no-print">
        The Family Catechism
      </Link>
    </>
  );
}

export function PrayPart({ devotion }: { devotion: Devotion }) {
  return <p className="tb-prayer">{devotion.prayer}</p>;
}

/** One part's body, by id. */
export function PartBody({ part, devotion, catechism, ask }: { part: Part; devotion: Devotion; catechism: CatechismLine | null; ask?: AskChoice }) {
  switch (part.id) {
    case "read":
      return <ReadPart devotion={devotion} />;
    case "talk":
      return <TalkPart devotion={devotion} />;
    case "ask":
      return <AskPart devotion={devotion} ask={ask} />;
    case "do":
      return <DoPart devotion={devotion} />;
    case "remember":
      return catechism ? <RememberPart line={catechism} /> : null;
    case "pray":
      return <PrayPart devotion={devotion} />;
  }
}
