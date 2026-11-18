/**
 * The church's seven ages as the history door draws them (/theology/history):
 * which age a year, a life, a council or a lesson belongs to, read only from
 * the dates the libraries already hold (lib/historyCourse yearSpan, eraSpan).
 * Nothing here invents a date: a person with no readable year has no age.
 */
import {
  eraSpan, yearSpan,
  type Council, type Era, type Figure, type Heresy, type HistoryEssayEntry,
} from "@/lib/historyCourse";

/** A short name for each age, for the line (the same words as Home's strip). */
export const AGE_SHORT: Record<string, string> = {
  apostolic: "Apostles",
  persecuted: "Martyrs",
  councils: "Councils",
  "early-medieval": "Early medieval",
  "high-medieval": "High medieval",
  reformation: "Reformation",
  "modern-global": "Modern, global",
};

/**
 * Each age's id by the name the essays index files a lesson under, so a
 * lesson can show its age's roundel without fetching the timeline.
 * historyAges.test.ts checks it against church-history-timeline.json.
 */
export const AGE_ID_BY_NAME: Record<string, string> = {
  "The Apostolic Age": "apostolic",
  "The Persecuted Church": "persecuted",
  "The Age of the Councils": "councils",
  "The Early Medieval Church": "early-medieval",
  "The High Medieval Church": "high-medieval",
  "The Reformation": "reformation",
  "The Modern and Global Church": "modern-global",
};

/** The age whose years hold this one (a year on a seam goes to the later age). */
export function ageOfYear(eras: Era[], year: number, thisYear: number): Era | null {
  let hit: Era | null = null;
  for (const era of eras) {
    const s = eraSpan(era, thisYear);
    if (year >= s.start && year <= s.end) hit = era;
  }
  if (hit) return hit;
  return year < (eras[0] ? eraSpan(eras[0], thisYear).start : 0) ? eras[0] ?? null : eras[eras.length - 1] ?? null;
}

/** A person's life as years: "around 35 to 108" → 35..108; an open end runs to `thisYear`. */
export function lifeSpan(f: Pick<Figure, "dates">, thisYear: number): { start: number; end: number } | null {
  const s = yearSpan(f.dates);
  if (!s) return null;
  return { start: s.start, end: s.end ?? thisYear };
}

/** The age a person belongs to: the one that holds the middle of their life (a movement: its start). */
export function ageOfPerson(eras: Era[], f: Figure, thisYear: number): Era | null {
  const s = yearSpan(f.dates);
  if (!s) return null;
  const mid = s.end == null ? s.start : Math.round((s.start + s.end) / 2);
  return ageOfYear(eras, mid, thisYear);
}

/** The people whose lives overlap an age, oldest first. */
export function peopleOfAge(era: Era, figures: Figure[], thisYear: number): Figure[] {
  const a = eraSpan(era, thisYear);
  return figures
    .filter((f) => {
      const s = yearSpan(f.dates);
      if (!s) return false;
      const end = s.end ?? s.start;
      return s.start <= a.end && end >= a.start;
    })
    .sort((x, y) => (yearSpan(x.dates)?.start ?? 0) - (yearSpan(y.dates)?.start ?? 0));
}

/** The councils that met in an age (a council on a seam goes to the later age). */
export function councilsOfAge(eras: Era[], era: Era, councils: Council[], thisYear: number): Council[] {
  return councils.filter((c) => {
    const y = yearSpan(c.year)?.start;
    return y != null && ageOfYear(eras, y, thisYear)?.id === era.id;
  });
}

const CENTURY: Record<string, number> = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10 };

/** The heresies dated to an age, by the century the library gives ("fourth century" → about 350). */
export function heresiesOfAge(eras: Era[], era: Era, heresies: Heresy[], thisYear: number): Heresy[] {
  return heresies.filter((h) => {
    const m = h.era.toLowerCase().match(/(\w+)\s+century/);
    const n = m ? CENTURY[m[1]] : undefined;
    return !!n && ageOfYear(eras, (n - 1) * 100 + 50, thisYear)?.id === era.id;
  });
}

/** The course lessons filed under an age (the essays index names the age). */
export function lessonsOfAge(era: Era, course: HistoryEssayEntry[]): HistoryEssayEntry[] {
  return course.filter((e) => e.era === era.name);
}

/** The age a history essay sits under: its own era, or the era a longer essay is filed under. */
export function ageOfEssay(eras: Era[], e: Pick<HistoryEssayEntry, "era" | "under">): Era | null {
  return eras.find((x) => x.name === (e.under ?? e.era)) ?? null;
}
