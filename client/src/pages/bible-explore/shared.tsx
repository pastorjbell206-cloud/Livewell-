/**
 * Parts the four cross-book pages share (/study/timeline, /study/atlas,
 * /study/words, /study/hard-passages): the note that says which books a page
 * does not hold yet, and the row of chips that narrows a page to a testament.
 */
import { startTransition, useEffect, useState } from "react";

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

/**
 * False for the first paint, then true. A page of several hundred entries
 * draws its top and its first group at once and the rest straight after, in
 * a transition the browser can interrupt, so a phone is never held up by the
 * whole list (the long task that drawing it in one go cost).
 */
export function useStaged(): boolean {
  const [all, setAll] = useState(false);
  useEffect(() => {
    startTransition(() => setAll(true));
  }, []);
  return all;
}

/**
 * Go to a heading further down a long page and put the keyboard there. The
 * far lists are laid out only as they near the screen (.bx-far), so the
 * heading's place can move while the page gets there; this looks again for a
 * few frames until it has stopped moving.
 */
export function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.history.replaceState(null, "", `#${id}`);
  let tries = 0;
  let last = NaN;
  const go = () => {
    // Under the fixed masthead, and at once: the page's own smooth scrolling would never settle here.
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "instant" as ScrollBehavior });
    const top = el.getBoundingClientRect().top;
    if (tries++ < 8 && Math.abs(top - last) > 1) {
      last = top;
      requestAnimationFrame(go);
    } else el.focus({ preventScroll: true });
  };
  go();
}

/** A link's click handler for jumpTo: a plain click only, so a new tab still works. */
export const onJump = (id: string) => (e: { preventDefault: () => void; metaKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean }) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  jumpTo(id);
};
