/**
 * Parts the four cross-book pages share (/study/timeline, /study/atlas,
 * /study/words, /study/hard-passages): the note that says which books a page
 * does not hold yet, and the row of chips that narrows a page to a testament.
 */
import { nameList } from "@/lib/bibleExplore";

export type Testament = "all" | "OT" | "NT";

export const TESTAMENTS: [Testament, string][] = [
  ["all", "The whole Bible"],
  ["OT", "Old Testament"],
  ["NT", "New Testament"],
];

/** Which books this page does not hold yet, said plainly and out of the way. */
export function NotYet({ without, what }: { without: string[]; what: string }) {
  if (!without.length) return null;
  return (
    <details className="bx-notyet">
      <summary>
        {without.length} of the 66 books are not here yet
      </summary>
      <p>
        {nameList(without)}. Their book pages have no {what} yet. They join this page when they do.
      </p>
    </details>
  );
}

export function TestamentChips({ value, onChange }: { value: Testament; onChange: (t: Testament) => void }) {
  return (
    <div className="bk-tl__chips bx-chips" role="group" aria-label="Part of the Bible">
      {TESTAMENTS.map(([k, label]) => (
        <button key={k} type="button" aria-pressed={value === k} onClick={() => onChange(k)}>
          {label}
        </button>
      ))}
    </div>
  );
}
