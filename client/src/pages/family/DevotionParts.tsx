/**
 * The parts of one family devotion (master plan 5.2): Read, Talk, Ask, Do,
 * Remember, Pray. The devotion's page shows them one after another; table
 * mode shows one per screen. Each part is the existing writing, as it is in
 * the data; nothing here adds to it.
 */
import { useRef } from "react";
import { Link } from "wouter";
import ListenButton from "@/components/ListenButton";
import type { CatechismLine } from "@/lib/familyTable";
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
    </>
  );
}

export function AskPart({ devotion }: { devotion: Devotion }) {
  return (
    <>
      <p className="tb-label">Together</p>
      <ol className="tb-questions">
        {devotion.questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ol>
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
export function PartBody({ part, devotion, catechism }: { part: Part; devotion: Devotion; catechism: CatechismLine | null }) {
  switch (part.id) {
    case "read":
      return <ReadPart devotion={devotion} />;
    case "talk":
      return <TalkPart devotion={devotion} />;
    case "ask":
      return <AskPart devotion={devotion} />;
    case "do":
      return <DoPart devotion={devotion} />;
    case "remember":
      return catechism ? <RememberPart line={catechism} /> : null;
    case "pray":
      return <PrayPart devotion={devotion} />;
  }
}
