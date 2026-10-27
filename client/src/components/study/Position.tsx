/**
 * Position: a quiet "3 of 6". Where something sits in a sequence (a day of
 * Advent, a devotion in the set, a session of a course), said in plain words
 * and never as a score: no bar, no percentage, no count of nights kept.
 * `unit` names what is counted ("Day 6 of 25"); `of` adds what the sequence
 * is ("Day 6 of 25 · Advent"). Styles in index.css (.st-position).
 */
export function Position({ current, total, unit, of }: { current: number; total: number; unit?: string; of?: string }) {
  const place = `${unit ? `${unit} ` : ""}${current} of ${total}`;
  return (
    <span className="st-position">
      {place}
      {of ? ` · ${of}` : ""}
    </span>
  );
}
