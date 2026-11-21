/**
 * The five roads of /start ("Start where you are"), and this device's memory
 * of them.
 *
 * The roads themselves are data (lib/startRoad.json), so the prerender script
 * can list them for crawlers and draw Home's static chips from the same words.
 * Here they get their types, and the device's own record: which road the
 * reader last opened and which steps they ticked. No account, no score, no
 * streak: a tick is the reader's own note to themselves, kept through
 * lib/storage and nowhere else.
 */
import road from "./startRoad.json";
import type { PlateName } from "@/components/art/Plate";
import { readStoredJSON, writeStoredJSON } from "./storage";

export interface RoadStep {
  title: string;
  line: string;
  link: string;
  href: string;
}

export type RoadId = "skeptical" | "new" | "stepped-back" | "deeper" | "family";

export interface Road {
  id: RoadId;
  /** The chip on Home and the card's name: the reader's own words. */
  chip: string;
  /** The road's heading once it is open. */
  title: string;
  /** One short line on the card. */
  note: string;
  plate: PlateName;
  /** The track this road has become (client/public/tracks/<slug>.json), when it has one. */
  track?: { slug: string; sessions: number };
  steps: RoadStep[];
}

export const ROADS = road.roads as Road[];

export const ROAD_IDS = ROADS.map((r) => r.id);

export function roadById(id: string | null | undefined): Road | null {
  return ROADS.find((r) => r.id === id) ?? null;
}

/** /start#skeptical: the address that opens one road. */
export const roadHref = (id: RoadId) => `/start#${id}`;

export const START_ROADS_KEY = "livewell-progress-start-roads-v1";

export interface RoadProgress {
  v: 1;
  /** The road this device last opened. */
  road: RoadId | null;
  /** The steps ticked on each road, by the step's address. */
  done: Partial<Record<RoadId, string[]>>;
}

export const NO_PROGRESS: RoadProgress = { v: 1, road: null, done: {} };

export function isRoadProgress(x: unknown): x is RoadProgress {
  if (!x || typeof x !== "object") return false;
  const p = x as Record<string, unknown>;
  if (p.v !== 1) return false;
  if (p.road !== null && !ROAD_IDS.includes(p.road as RoadId)) return false;
  if (!p.done || typeof p.done !== "object" || Array.isArray(p.done)) return false;
  return Object.entries(p.done as Record<string, unknown>).every(
    ([k, v]) => ROAD_IDS.includes(k as RoadId) && Array.isArray(v) && v.every((s) => typeof s === "string")
  );
}

export function readRoadProgress(): RoadProgress {
  return readStoredJSON(START_ROADS_KEY, isRoadProgress, NO_PROGRESS);
}

export function saveRoadProgress(p: RoadProgress): boolean {
  return writeStoredJSON(START_ROADS_KEY, p);
}

/** The progress with one step ticked or unticked. */
export function withStep(p: RoadProgress, id: RoadId, href: string): RoadProgress {
  const was = p.done[id] ?? [];
  const done = was.includes(href) ? was.filter((h) => h !== href) : [...was, href];
  return { ...p, road: id, done: { ...p.done, [id]: done } };
}

/** The first step on a road this device has not ticked, or null when every step is ticked. */
export function nextStep(r: Road, p: RoadProgress): { step: RoadStep; n: number } | null {
  const done = p.done[r.id] ?? [];
  const i = r.steps.findIndex((s) => !done.includes(s.href));
  return i < 0 ? null : { step: r.steps[i], n: i + 1 };
}
