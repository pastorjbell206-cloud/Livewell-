/**
 * The Bible Explorer (/study/explorer): the data, the reading level and the
 * progress kept on this device.
 *
 * The library is content as data (client/public/explorer/): the map reads
 * index.json (scripts/build-explorer-index.mjs), and a stop's page reads its
 * own file, stops/<slug>.json. scripts/validate-explorer.mjs is the gate.
 *
 * Two reading levels, named as the Family door names its age bands
 * (lib/familyTable.ts): "younger" (ages 7 to 11) and "older" (ages 12 to 16).
 * The level, the stops visited and the activities done stay on this device
 * under one key, through lib/storage.ts. Nothing needs an account and nothing
 * is sent anywhere.
 */
import { useCallback, useEffect, useState } from "react";
import { fetchJson } from "@/lib/fetch-json";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

export type Level = "younger" | "older";
export const LEVELS: Level[] = ["younger", "older"];
export const LEVEL_LABELS: Record<Level, string> = {
  younger: "Ages 7 to 11",
  older: "Ages 12 to 16",
};
export type Leveled<T = string> = Record<Level, T>;

export interface StopSummary {
  slug: string;
  n: number;
  title: string;
  range: string;
  act: string;
  actLabel: string;
  actTitle: string;
  status: "finished" | "drawing";
  summary: Leveled;
}

export interface ThreadStop {
  /** One of the states the thread's key names ("near" or "apart" for the dwelling thread). */
  state: string;
  line: string;
  ref: string;
}

export interface Thread {
  id: string;
  name: string;
  status: "finished" | "coming";
  line: Leveled;
  /** The thread's own states, in the order the key lists them: state → what its line means. */
  key?: Record<string, string>;
  /** The states drawn as a broken line (default: "apart"). Every other state is solid. */
  broken?: string[];
  stops?: Record<string, ThreadStop>;
}

/** Is this state of the thread drawn as a broken line? */
export const isBrokenState = (thread: Thread | undefined, state: string) =>
  (thread?.broken ?? ["apart"]).includes(state);

export interface Link {
  label: string;
  href: string;
}

export interface Card {
  id: string;
  title: string;
  status: "finished" | "coming";
  picture?: string;
  pictureLabel?: string;
  statement?: Leveled;
  quote?: { ref: string; text: string };
  rests?: string[];
  question?: { ask: string } & Leveled;
  stops?: string[];
  catechism?: number[];
  deeper?: Link[];
}

// ── Watch and learn: the moving pictures ─────────────────────────────────

/** The four groups the moving pictures are listed under, in this order. */
export type FilmGroup = "story" | "ideas" | "beliefs" | "questions";

/** A moving picture as the map lists it (index.json, from films.json and each film's file). */
export interface FilmSummary {
  slug: string;
  title: string;
  group: FilmGroup;
  status: "finished" | "coming";
  line?: Leveled;
  frames?: number;
  /** The stops and "Why we believe" cards it belongs to. */
  stops?: string[];
  cards?: string[];
}

export interface FilmGroupInfo {
  id: FilmGroup;
  name: string;
  line: string;
}

/** One frame of a moving picture: one drawing state and its caption at both levels. */
export interface FilmFrame extends Leveled {
  id: string;
  /** A short name for the frame, on its dot. */
  name: string;
  /** What the picture shows once this frame has finished moving (read by a screen reader, and true with motion off). */
  still: string;
  verse?: { ref: string; text: string };
}

export interface Film {
  slug: string;
  title: string;
  group: FilmGroup;
  status: "finished";
  line: Leveled;
  /** What the poster shows before Play. */
  poster: string;
  frames: FilmFrame[];
  think: Leveled;
  read: Link[];
  stops: string[];
  cards: string[];
  /** Where churches differ, said plainly, with where to read more. */
  differ?: { text: string; links: Link[] };
  care?: string;
  deeper?: Link[];
  /** Where the film sends the reader when it ends. */
  end: Link;
}

export interface ExplorerIndex {
  stops: StopSummary[];
  threads: Thread[];
  cards: Card[];
  filmGroups?: FilmGroupInfo[];
  films?: FilmSummary[];
}

export interface TapSpot {
  id: string;
  name: string;
  x: number;
  y: number;
  day?: number;
  /** A short name for the list under the picture, in place of "Day N". */
  label?: string;
  text: string;
  ref: string;
  /** How God begins to mend what this spot shows (the Fall). */
  mend?: string;
  mendRef?: string;
}

/** One step of a walk through a picture (the tabernacle, from the gate inward). */
export interface WalkStep {
  id: string;
  name: string;
  x: number;
  y: number;
  what: string;
  whatRef: string;
  later: string;
  laterRef: string;
  /** What the people in the story asked or said (Jesus Comes). */
  asked?: string;
  askedRef?: string;
}

/** One moment of a king's story, to judge: did he trust God or grab for himself? */
export interface ChooseMoment {
  id: string;
  who: string;
  text: string;
  answer: "trust" | "grasp";
  why: string;
  ref: string;
}

export type Activity =
  | {
      kind: "tap";
      title: string;
      prompt: string;
      spots: TapSpot[];
      /** Said when every spot is found. */
      finish?: string;
    }
  | {
      kind: "walk";
      title: string;
      prompt: string;
      steps: WalkStep[];
      finish: string;
      /** Said before the first step (Sinai's default names the gate and the ark). */
      intro?: string;
      /** The heading over "later" (default: where the Bible takes it up). */
      laterLabel?: string;
      /** The last step's button, back to the first (default: back to the gate). */
      restart?: string;
    }
  | {
      kind: "choose";
      title: string;
      prompt: string;
      options: { trust: string; grasp: string };
      moments: ChooseMoment[];
      end: { title: string; text: string; ref: string };
    }
  | {
      kind: "cycle";
      title: string;
      prompt: string;
      stages: { id: string; name: string; text: string; ref: string }[];
      again: { text: string; ref: string };
      end: { title: string; text: string; ref: string };
    }
  | {
      kind: "order";
      title: string;
      prompt: string;
      /** `when` (a date) and `then` (one line) show once the item is in its place (the Return). */
      items: { id: string; text: string; ref: string; when?: string; then?: string }[];
      start: string[];
    }
  | {
      kind: "match";
      title: string;
      prompt: string;
      pairs: {
        id: string;
        promise: string;
        promiseRef: string;
        kept: string;
        keptRef: string;
      }[];
      /** Said when every pair is right (Abraham's default names three promises). */
      finish?: string;
      /** What each left-hand line is called (default "promise"; the New Creation's are pictures). */
      noun?: string;
    }
  | {
      kind: "reveal";
      title: string;
      prompt: string;
      questions: { id: string; q: string; a: string; ref: string }[];
    };

export interface Stop extends Omit<StopSummary, "actLabel" | "actTitle"> {
  added?: string;
  scene?: string;
  sceneLabel?: string;
  story?: Leveled<string[]>;
  god?: Leveled;
  verses?: { ref: string; text: string }[];
  read?: Link[];
  differ?: { text: string } & Link;
  care?: string;
  question?: { ask: string; answer: string[] };
  deeper?: Link[];
  talk?: Leveled;
  activity?: Activity;
}

const isObj = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null;

export function isExplorerIndex(x: unknown): x is ExplorerIndex {
  return (
    isObj(x) &&
    Array.isArray(x.stops) &&
    Array.isArray(x.threads) &&
    Array.isArray(x.cards)
  );
}

export function isStop(x: unknown): x is Stop {
  return (
    isObj(x) &&
    typeof x.slug === "string" &&
    typeof x.title === "string" &&
    isObj(x.summary)
  );
}

export const EXPLORER_PATH = "/study/explorer";
export const stopHref = (slug: string) => `${EXPLORER_PATH}/${slug}`;

export const fetchExplorerIndex = () =>
  fetchJson("/explorer/index.json", isExplorerIndex);
export const fetchStop = (slug: string) =>
  fetchJson(`/explorer/stops/${encodeURIComponent(slug)}.json`, isStop);

export function isFilm(x: unknown): x is Film {
  return (
    isObj(x) &&
    typeof x.slug === "string" &&
    typeof x.title === "string" &&
    Array.isArray(x.frames) &&
    x.frames.length > 0 &&
    isObj(x.line)
  );
}

export const WATCH_PATH = `${EXPLORER_PATH}/watch`;
export const filmHref = (slug: string) => `${WATCH_PATH}/${slug}`;
export const fetchFilm = (slug: string) =>
  fetchJson(`/explorer/films/${encodeURIComponent(slug)}.json`, isFilm);

/** The finished moving pictures that belong to a stop or a card, in the map's order. */
export function filmsFor(
  index: ExplorerIndex | undefined | null,
  where: { stop?: string; card?: string }
): FilmSummary[] {
  return (index?.films ?? []).filter(
    f =>
      f.status === "finished" &&
      ((where.stop && f.stops?.includes(where.stop)) ||
        (where.card && f.cards?.includes(where.card)))
  );
}

// ── Threads ───────────────────────────────────────────────────────────────

/** The stops a thread lights, in map order, with how it shows at each. */
export function threadStops(
  thread: Thread | undefined,
  stops: StopSummary[]
): { slug: string; at: ThreadStop }[] {
  if (!thread?.stops || thread.status !== "finished") return [];
  return stops
    .filter(s => thread.stops![s.slug])
    .map(s => ({ slug: s.slug, at: thread.stops![s.slug] }));
}

/** The threads that run through one stop. */
export function threadsAt(
  slug: string,
  threads: Thread[]
): { thread: Thread; at: ThreadStop }[] {
  return threads
    .filter(t => t.status === "finished" && t.stops?.[slug])
    .map(t => ({ thread: t, at: t.stops![slug] }));
}

// ── Progress on this device ───────────────────────────────────────────────

export const EXPLORER_PROGRESS_KEY = "livewell-progress-explorer-v1";
export const SAVE_FAILED =
  "Couldn't save to this browser — your work here will not survive a reload.";

export interface ExplorerProgress {
  v: 1;
  level: Level;
  visited: string[];
  done: string[];
  /** The stop the reader opened last: "you are here" on the map. */
  last: string | null;
}

export const EMPTY_PROGRESS: ExplorerProgress = {
  v: 1,
  level: "younger",
  visited: [],
  done: [],
  last: null,
};

const strings = (x: unknown): x is string[] =>
  Array.isArray(x) && x.every(s => typeof s === "string");

export function isExplorerProgress(x: unknown): x is ExplorerProgress {
  return (
    isObj(x) &&
    x.v === 1 &&
    (x.level === "younger" || x.level === "older") &&
    strings(x.visited) &&
    strings(x.done) &&
    (x.last === null || typeof x.last === "string")
  );
}

export const readExplorerProgress = (): ExplorerProgress =>
  readStoredJSON(EXPLORER_PROGRESS_KEY, isExplorerProgress, EMPTY_PROGRESS);

const add = (list: string[], slug: string) =>
  list.includes(slug) ? list : [...list, slug];

export function withLevel(p: ExplorerProgress, level: Level): ExplorerProgress {
  return { ...p, level };
}
export function withVisit(p: ExplorerProgress, slug: string): ExplorerProgress {
  return { ...p, visited: add(p.visited, slug), last: slug };
}
export function withDone(p: ExplorerProgress, slug: string): ExplorerProgress {
  return { ...p, done: add(p.done, slug) };
}

/**
 * The reader's progress, read once from this device and written back on each
 * change. `saveFailed` is true once a write has been refused (private mode, a
 * full store), so the page can say so in the site's one sentence.
 */
export function useExplorerProgress() {
  const [progress, setProgress] =
    useState<ExplorerProgress>(readExplorerProgress);
  const [saveFailed, setSaveFailed] = useState(false);

  const update = useCallback(
    (change: (p: ExplorerProgress) => ExplorerProgress) => {
      setProgress(prev => {
        const next = change(prev);
        if (next === prev) return prev;
        if (!writeStoredJSON(EXPLORER_PROGRESS_KEY, next)) setSaveFailed(true);
        return next;
      });
    },
    []
  );

  // Another tab (or the stop page, on the way back) may have moved on.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === EXPLORER_PROGRESS_KEY) setProgress(readExplorerProgress());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return {
    progress,
    saveFailed,
    setLevel: (level: Level) =>
      update(p => (p.level === level ? p : withLevel(p, level))),
    visit: (slug: string) =>
      update(p =>
        p.last === slug && p.visited.includes(slug) ? p : withVisit(p, slug)
      ),
    markDone: (slug: string) =>
      update(p => (p.done.includes(slug) ? p : withDone(p, slug))),
  };
}
