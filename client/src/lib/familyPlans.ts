/**
 * Family reading plans that know what day it is (audit 2026-11, F16).
 *
 * A plan is a list of numbered days. Until now the page listed them and let a
 * family tick them off, but it never knew which day was today's. A family
 * starts a plan on a date; from then on, today's day is counted from that
 * date on the reader's own calendar. A family that fell behind can make today
 * any earlier day, which only moves the start date; nothing is lost.
 *
 * What this device remembers (livewell-progress-family-plan-starts-v1): the
 * date each started plan began. The ticks themselves stay where they were
 * (useProgress, lw-family-reading-plans-v1).
 */
import { readStoredJSON, writeStoredJSON } from "./storage";

export const PLAN_STARTS_KEY = "livewell-progress-family-plan-starts-v1";
/** The key the page's ticks have always used (hooks/useProgress). */
export const PLAN_TICKS_KEY = "lw-family-reading-plans-v1";

export interface PlanStarts {
  v: 1;
  /** Plan id to the date of its day 1 (YYYY-MM-DD). */
  starts: Record<string, string>;
}

export const NO_STARTS: PlanStarts = { v: 1, starts: {} };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 86_400_000;
const dayNumber = (iso: string) => Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10))) / DAY_MS;

export function isPlanStarts(x: unknown): x is PlanStarts {
  if (!x || typeof x !== "object" || Array.isArray(x)) return false;
  const p = x as Record<string, unknown>;
  if (p.v !== 1 || !p.starts || typeof p.starts !== "object" || Array.isArray(p.starts)) return false;
  return Object.values(p.starts).every((d) => typeof d === "string" && ISO_DATE.test(d));
}

export function readPlanStarts(): PlanStarts {
  return readStoredJSON(PLAN_STARTS_KEY, isPlanStarts, NO_STARTS);
}

/** False when the browser would not keep it. */
export function savePlanStarts(starts: PlanStarts): boolean {
  return writeStoredJSON(PLAN_STARTS_KEY, starts);
}

/** The starts with one plan beginning on `date` so that `date` is its day `day` (1 by default). */
export function withPlanStart(starts: PlanStarts, planId: string, date: string, day = 1): PlanStarts {
  const start = new Date((dayNumber(date) - (day - 1)) * DAY_MS).toISOString().slice(0, 10);
  return { v: 1, starts: { ...starts.starts, [planId]: start } };
}

export function withoutPlan(starts: PlanStarts, planId: string): PlanStarts {
  const next = { ...starts.starts };
  delete next[planId];
  return { v: 1, starts: next };
}

export interface PlanToday {
  /** Today's day of the plan, from 1; past the last day when the plan has run out. */
  day: number;
  /** True once the calendar has passed the plan's last day. */
  finished: boolean;
}

/** Which day of a plan `today` is, for a plan of `length` days begun on `start`. Null before the start. */
export function planDayOn(start: string, today: string, length: number): PlanToday | null {
  const day = dayNumber(today) - dayNumber(start) + 1;
  if (!Number.isFinite(day) || day < 1) return null;
  return { day, finished: day > length };
}

/** The first day before `day` that is not ticked, or null when the family is caught up. */
export function firstUnread(planId: string, day: number, isDone: (id: string) => boolean): number | null {
  for (let d = 1; d < day; d++) if (!isDone(`${planId}:${d}`)) return d;
  return null;
}
