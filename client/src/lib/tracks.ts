/**
 * Tracks: a few numbered sessions of about ten minutes, in order, each one
 * using a page or tool the site already has (client/public/tracks/<slug>.json,
 * listed in client/public/tracks/index.json; the rules a track keeps are in
 * scripts/lib/tracks.mjs, and docs/work/elite/tracks.md says how to write one).
 *
 * This file holds the shapes, the two loaders, this device's memory of a
 * track (which sessions are done, and the reader's own answers), and the
 * small note that lets a page the reader was sent to offer the way back
 * ("Back to session 3 of 12"). Everything is kept through lib/storage and
 * nowhere else: no account, no score, no streak.
 */
import { fetchJson } from "./fetch-json";
import { readStoredJSON, writeStoredJSON } from "./storage";

/** One page or tool a session sends the reader to. `kind` is one of KINDS in scripts/lib/tracks.mjs. */
export interface TrackLink {
  kind: string;
  label: string;
  href: string;
  /** One line: why this page, here. */
  why: string;
}

export interface TrackSession {
  n: number;
  title: string;
  minutes: number;
  teaching: string[];
  open: TrackLink;
  also?: TrackLink[];
  question: string;
  do: string;
  verse: { ref: string; text: string };
  care?: string[];
  group: { open: string; discuss: string[]; pray: string };
}

export interface Track {
  slug: string;
  title: string;
  /** The reader's own words for who it is for ("I'm new to this"). */
  for: string;
  /** The road on /start this track grows from, when it has one. */
  road?: string | null;
  subtitle: string;
  intro: string[];
  sessions: TrackSession[];
}

export interface TrackBrief {
  slug: string;
  title: string;
  for: string;
  road: string | null;
  subtitle: string;
  minutes: number;
  kinds: string[];
  sessions: { n: number; title: string; minutes: number; kind: string; opens: string }[];
}

export interface TrackIndex {
  tracks: TrackBrief[];
}

const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);

const isIndex = (x: unknown): x is TrackIndex =>
  isObject(x) && Array.isArray(x.tracks) && x.tracks.every((t) => isObject(t) && typeof t.slug === "string" && typeof t.title === "string" && Array.isArray(t.sessions));

const isTrack = (x: unknown): x is Track =>
  isObject(x) &&
  typeof x.slug === "string" &&
  typeof x.title === "string" &&
  Array.isArray(x.sessions) &&
  x.sessions.every((s) => isObject(s) && typeof s.n === "number" && typeof s.title === "string" && isObject(s.open) && Array.isArray(s.teaching) && isObject(s.verse) && isObject(s.group));

export const fetchTrackIndex = () => fetchJson<TrackIndex>("/tracks/index.json", isIndex);
export const fetchTrack = (slug: string) => fetchJson<Track>(`/tracks/${encodeURIComponent(slug)}.json`, isTrack);

export const TRACKS_PATH = "/tracks";
export const trackHref = (slug: string) => `/tracks/${slug}`;
export const sessionHref = (slug: string, n: number) => `/tracks/${slug}/${n}`;

/** The kinds of page a session opens, in a reader's words (the keys are KINDS in scripts/lib/tracks.mjs). */
export const KIND_LABEL: Record<string, string> = {
  chapter: "Bible chapter",
  study: "Bible study",
  book: "Book of the Bible",
  film: "Short film",
  answer: "Honest Answer",
  case: "The case for the faith",
  "wisdom-finder": "Tool",
  wisdom: "What the Bible says",
  psalms: "Pray the Psalms",
  "self-check": "Self-check",
  catechism: "Catechism",
  devotion: "Family devotion",
  plan: "Plan",
  guide: "Study guide",
  help: "Find Help",
  creed: "Creed",
  compare: "Where Christians differ",
  tool: "Tool",
  track: "Tracks",
};

export const kindLabel = (kind: string) => KIND_LABEL[kind] ?? "Page";

/* ── This device's memory of the tracks ─────────────────────────────── */

export const TRACKS_KEY = "livewell-progress-tracks-v1";

/** What the reader wrote and ticked in one session. */
export interface SessionNotes {
  /** Their answer to the session's one question. */
  answer?: string;
  /** They did the one thing. */
  did?: boolean;
}

export interface TrackProgress {
  /** The track's name and length, kept so Home can say where the reader is without loading anything. */
  title: string;
  total: number;
  /** Sessions marked done, by number. */
  done: number[];
  /** By session number. */
  notes: Record<string, SessionNotes>;
  /** When the reader last did anything here (ISO). */
  at: string;
}

export interface TracksProgress {
  v: 1;
  tracks: Record<string, TrackProgress>;
}

export const NO_TRACKS: TracksProgress = { v: 1, tracks: {} };

const isNotes = (x: unknown): x is SessionNotes =>
  isObject(x) && (x.answer === undefined || typeof x.answer === "string") && (x.did === undefined || typeof x.did === "boolean");

const isTrackProgress = (x: unknown): x is TrackProgress =>
  isObject(x) &&
  typeof x.title === "string" &&
  typeof x.total === "number" &&
  Array.isArray(x.done) &&
  x.done.every((n) => Number.isInteger(n)) &&
  isObject(x.notes) &&
  Object.values(x.notes).every(isNotes) &&
  typeof x.at === "string";

export function isTracksProgress(x: unknown): x is TracksProgress {
  return isObject(x) && x.v === 1 && isObject(x.tracks) && Object.values(x.tracks).every(isTrackProgress);
}

export function readTracks(): TracksProgress {
  return readStoredJSON(TRACKS_KEY, isTracksProgress, NO_TRACKS);
}

/** False when the browser refused the write: the page then says so (SAVE_FAILED). */
export function saveTracks(p: TracksProgress): boolean {
  return writeStoredJSON(TRACKS_KEY, p);
}

const now = () => new Date().toISOString();

function entry(p: TracksProgress, t: { slug: string; title: string; total: number }): TrackProgress {
  const was = p.tracks[t.slug];
  return { title: t.title, total: t.total, done: was?.done ?? [], notes: was?.notes ?? {}, at: was?.at ?? now() };
}

type TrackId = { slug: string; title: string; total: number };

/** The progress with this track begun (opening a session begins it). */
export function withStarted(p: TracksProgress, t: TrackId): TracksProgress {
  if (p.tracks[t.slug]) return p;
  return { ...p, tracks: { ...p.tracks, [t.slug]: { ...entry(p, t), at: now() } } };
}

/** The progress with one session marked done, or not done. */
export function withDone(p: TracksProgress, t: TrackId, n: number, done = true): TracksProgress {
  const e = entry(p, t);
  const set = new Set(e.done);
  if (done) set.add(n);
  else set.delete(n);
  return { ...p, tracks: { ...p.tracks, [t.slug]: { ...e, done: Array.from(set).sort((a, b) => a - b), at: now() } } };
}

/** The progress with the reader's notes on one session changed. */
export function withNotes(p: TracksProgress, t: TrackId, n: number, notes: SessionNotes): TracksProgress {
  const e = entry(p, t);
  return { ...p, tracks: { ...p.tracks, [t.slug]: { ...e, notes: { ...e.notes, [n]: { ...e.notes[n], ...notes } }, at: now() } } };
}

/** The progress with one track forgotten ("Start over"). */
export function withoutTrack(p: TracksProgress, slug: string): TracksProgress {
  const tracks = { ...p.tracks };
  delete tracks[slug];
  return { ...p, tracks };
}

/** The first session not yet done, or null when every session is done. */
export function nextSession(e: Pick<TrackProgress, "done" | "total"> | undefined, total?: number): number | null {
  const count = total ?? e?.total ?? 0;
  for (let n = 1; n <= count; n++) if (!e?.done.includes(n)) return n;
  return null;
}

/** One track to continue: where it opens and what to call it. */
export interface TrackToContinue {
  slug: string;
  title: string;
  n: number;
  total: number;
  href: string;
  at: string;
}

/**
 * The track this device last worked on that is not finished, for "Continue
 * where you left off" on Home, /start and /tracks. Read from storage alone:
 * no file is fetched, so the line can be drawn with the page.
 */
export function trackToContinue(p: TracksProgress = readTracks()): TrackToContinue | null {
  let best: TrackToContinue | null = null;
  for (const [slug, e] of Object.entries(p.tracks)) {
    const n = nextSession(e);
    if (n === null) continue;
    if (!best || e.at > best.at) best = { slug, title: e.title, n, total: e.total, href: sessionHref(slug, n), at: e.at };
  }
  return best;
}

/* ── The way back from a page a session sent the reader to (lib/trackReturn.ts) ── */

export { RETURN_EVENT, RETURN_KEY, clearReturn, offersReturn, readReturn, returnLabel, setReturn, type TrackReturn } from "./trackReturn";
