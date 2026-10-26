/**
 * Which family catechism question is "this week's" (/family/catechism).
 *
 * The first version took the week of the year and capped it at 52, so
 * questions 53 to 76, the twelve "Hard Questions Children Ask" among them,
 * never had a week. This walks the whole list one question a week and starts
 * again at the first, so every question gets its week however long the list
 * grows or shrinks.
 *
 * Weeks run Sunday to Saturday on the reader's own calendar. The count starts
 * on Sunday, December 28, 2025, the week that held January 1, 2026, so through
 * 2026 the pick is the same question the capped version showed; from the last
 * week of December 2026 it carries on to question 53 instead of stopping.
 */
const EPOCH_SUNDAY = Date.UTC(2025, 11, 28);
const DAY_MS = 86_400_000;

/** Zero-based index into the catechism of the question for the week holding `date`. */
export function catechismWeekIndex(date: Date, count: number): number {
  if (!Number.isInteger(count) || count <= 0) return 0;
  // Calendar days, not elapsed milliseconds, so a daylight-saving change
  // never moves a week boundary.
  const day = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const week = Math.floor((day - EPOCH_SUNDAY) / DAY_MS / 7);
  return ((week % count) + count) % count;
}
