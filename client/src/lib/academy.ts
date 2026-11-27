/**
 * The LiveWell Academy (/academy): programs in five levels, each a few tracks in order
 * (client/public/academy/programs.json; its gate is scripts/validate-academy.mjs).
 * A track is the site's one unit of learning (lib/tracks.ts); a program only
 * orders tracks. Progress is the tracks' own record on this device
 * (livewell-progress-tracks-v1), never a second store. Certificates are drawn
 * from that record when every session of a track, or of every track in a
 * program, is done. They are unaccredited, and every one says so.
 */
import { fetchJson } from "./fetch-json";
import { readStoredJSON, writeStoredJSON } from "./storage";
import type { TrackBrief, TrackProgress, TracksProgress } from "./tracks";
import type { PlateName } from "@/components/art/Plate";

export interface Program {
  slug: string;
  title: string;
  /** Who it is for, in their words ("Not sure any of it is true? Start here."). */
  reader: string;
  /** What the reader will be able to do at the end. */
  outcome: string;
  plate: PlateName;
  /** Track slugs, in order. */
  tracks: string[];
  /** A program for a particular reader (teenagers, a family) beside the main road, not a step on it. */
  beside?: boolean;
  /** The level of the road the program sits on (1 to 5); none for a program beside the road. */
  level?: number;
}

/** One level of the road (James, 2026-11-27: from first reading the Bible to explaining it to others). */
export interface Level {
  n: number;
  title: string;
  line: string;
}

export interface Programs {
  about: string;
  levels: Level[];
  programs: Program[];
}

const isObject = (x: unknown): x is Record<string, unknown> =>
  !!x && typeof x === "object" && !Array.isArray(x);

export const isPrograms = (x: unknown): x is Programs =>
  isObject(x) &&
  typeof x.about === "string" &&
  Array.isArray(x.levels) &&
  x.levels.every(
    l =>
      isObject(l) &&
      typeof l.n === "number" &&
      typeof l.title === "string" &&
      typeof l.line === "string"
  ) &&
  Array.isArray(x.programs) &&
  x.programs.every(
    p =>
      isObject(p) &&
      typeof p.slug === "string" &&
      typeof p.title === "string" &&
      typeof p.reader === "string" &&
      typeof p.outcome === "string" &&
      typeof p.plate === "string" &&
      Array.isArray(p.tracks) &&
      p.tracks.every(t => typeof t === "string") &&
      (p.beside === undefined || typeof p.beside === "boolean") &&
      (p.level === undefined || typeof p.level === "number")
  );

export const fetchPrograms = () =>
  fetchJson<Programs>("/academy/programs.json", isPrograms);

export const ACADEMY_PATH = "/academy";
export const LEARNED_PATH = "/academy/learned";
export const programHref = (slug: string) => `/academy/${slug}`;
export const certificateHref = (
  kind: "track" | "program" | "academy",
  slug: string
) => `/academy/certificate/${kind}/${slug}`;
/** The certificate for the whole road: every program on every level finished. */
export const GRADUATE_HREF = certificateHref("academy", "road");
export const levelAnchor = (n: number) => `level-${n}`;

/** The plain notice every certificate, and every page that offers one, carries. */
export const UNACCREDITED =
  "LiveWell Academy certificates are unaccredited. They record your own study on this site; they are not academic credit, a degree, a diploma or a credential for ordination or ministry.";

/* ── Progress, read from the tracks' own record ─────────────────────── */

/** Sessions done in one track, counted against the track's real length. */
export function doneIn(
  entry: TrackProgress | undefined,
  total: number
): number {
  return entry ? new Set(entry.done.filter(n => n >= 1 && n <= total)).size : 0;
}

export const trackComplete = (
  entry: TrackProgress | undefined,
  total: number
) => total > 0 && doneIn(entry, total) >= total;

export interface ProgramProgress {
  done: number;
  total: number;
  tracksDone: number;
  /** The first track in order that is not finished, or null when all are. */
  next: TrackBrief | null;
  complete: boolean;
}

export function programProgress(
  p: Program,
  briefs: Map<string, TrackBrief>,
  progress: TracksProgress
): ProgramProgress {
  let done = 0;
  let total = 0;
  let tracksDone = 0;
  let next: TrackBrief | null = null;
  for (const slug of p.tracks) {
    const b = briefs.get(slug);
    if (!b) continue;
    const n = b.sessions.length;
    const d = doneIn(progress.tracks[slug], n);
    total += n;
    done += d;
    if (d >= n) tracksDone++;
    else if (!next) next = b;
  }
  return {
    done,
    total,
    tracksDone,
    next,
    complete: total > 0 && done >= total,
  };
}

/** The programs on the road (not beside it), in order. */
export const roadPrograms = (all: Program[]) => all.filter(p => !p.beside);

/**
 * The whole road as one program: every track of every program on every
 * level. Finishing it earns the graduate certificate (GRADUATE_HREF).
 */
export const roadAsProgram = (all: Program[]): Program => ({
  slug: "road",
  title: "The LiveWell Academy",
  reader: "",
  outcome: "",
  plate: "lectern",
  tracks: roadPrograms(all).flatMap(p => p.tracks),
});

/** Minutes a program asks, in all: the sum of its sessions. */
export const programMinutes = (p: Program, briefs: Map<string, TrackBrief>) =>
  p.tracks.reduce(
    (m, slug) =>
      m + (briefs.get(slug)?.sessions.reduce((n, s) => n + s.minutes, 0) ?? 0),
    0
  );

/** "About 9 hours", "About 90 minutes". */
export function hoursLabel(minutes: number): string {
  if (minutes < 120) return `About ${Math.round(minutes / 10) * 10} minutes`;
  return `About ${Math.round(minutes / 60)} hours`;
}

/** The latest date the reader touched any of these tracks (ISO), for the certificate's date. */
export function lastActivity(
  slugs: string[],
  progress: TracksProgress
): string | null {
  const dates = slugs
    .map(s => progress.tracks[s]?.at)
    .filter((d): d is string => !!d);
  return dates.length ? dates.sort().at(-1)! : null;
}

/* ── The name on a certificate ─────────────────────────────────────── */

/** The name the reader typed for their certificates, kept on this device only. */
export const NAME_KEY = "livewell-academy-name-v1";
const isName = (x: unknown): x is string =>
  typeof x === "string" && x.length <= 80;
export const readName = () => readStoredJSON(NAME_KEY, isName, "");
export const saveName = (name: string) =>
  writeStoredJSON(NAME_KEY, name.slice(0, 80));
