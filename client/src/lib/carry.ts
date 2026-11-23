/**
 * Carry your reading to another device, with no account.
 *
 * Everything a reader keeps on LiveWell lives in this browser's localStorage,
 * under keys that begin "livewell" or "lw-". This module copies those keys
 * into one small file, or into a link whose data rides in the address's
 * #fragment (browsers never send a fragment to a server), and brings a file
 * or link back in on the other device. Nothing is uploaded and LiveWell keeps
 * no copy: the file goes only where the reader puts it.
 *
 * Bringing one in merges it with what the device already holds, so neither
 * device loses anything:
 *   - a key only the file has is added;
 *   - two lists are joined, one copy of each item: an item with a ref, href or
 *     id is matched by it, and of two versions the newer (by its updated or
 *     savedAt time) stays;
 *   - two records are merged key by key by the same rule, and a record that
 *     says when it changed is one thing: the newer stays whole;
 *   - where both devices hold a different single value, this device's stays.
 * Every write lands or none does: a full browser rolls back what it wrote.
 */
import { CARRY_HASH } from "@/lib/carry-hash";

export { CARRY_HASH };

export const CARRY_KIND = "livewell-reading";
export const CARRY_VERSION = 1;

/** Keys that describe this device or this visit, not the reader's reading: never carried. */
export const DEVICE_ONLY: ReadonlySet<string> = new Set([
  "livewell-announce-dismissed",
  "livewell-help-tab-dismissed",
  "livewell-reader-fontsize",
  "livewell-reading-focus",
  "livewell-studybible-mode",
  "livewell-test-key",
  "livewell-text-size",
  "livewell:audience",
  "lw-reading-focus",
  "lw-seen",
  "lw-toolkit-unlocked",
]);

/** Bigger than any browser's whole storage for one site, so a real file always fits. */
const MAX_CHARS = 6_000_000;
const MAX_KEYS = 2_000;
/** A link whose data is longer than this is offered as a file instead. */
export const MAX_LINK_DATA = 6_000;
/** The longest fragment a link may bring in (links made here stay far below it). */
const MAX_FRAGMENT = 20_000;


export function isCarriedKey(key: string): boolean {
  return (key.startsWith("livewell") || key.startsWith("lw-")) && !key.startsWith("livewell-session") && !DEVICE_ONLY.has(key);
}

export interface CarryFile {
  kind: typeof CARRY_KIND;
  version: typeof CARRY_VERSION;
  /** When it was made (ISO 8601). */
  saved: string;
  /** Each carried key, with the exact text this browser kept under it. */
  items: Record<string, string>;
}

function localStore(store?: Storage): Storage | null {
  if (store) return store;
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** What this browser holds, as a carry file. */
export function buildCarry(store?: Storage, now: Date = new Date()): CarryFile {
  const s = localStore(store);
  const items: Record<string, string> = {};
  if (s) {
    try {
      for (let i = 0; i < s.length; i++) {
        const key = s.key(i);
        if (key === null || !isCarriedKey(key)) continue;
        const value = s.getItem(key);
        if (value !== null) items[key] = value;
      }
    } catch {
      /* storage refused partway: carry what was read */
    }
  }
  return { kind: CARRY_KIND, version: CARRY_VERSION, saved: now.toISOString(), items };
}

export const carrySize = (file: CarryFile): number => Object.keys(file.items).length;

/** The file's name, dated, so two saved on different days sit side by side. */
export function carryFileName(file: CarryFile): string {
  const day = /^\d{4}-\d{2}-\d{2}/.exec(file.saved)?.[0] ?? "copy";
  return `livewell-reading-${day}.json`;
}

/**
 * Reads a carry file's text. Null when it is not one this site made. A key it
 * does not carry (a later version may stop carrying one) is left out, not refused.
 */
export function parseCarry(text: string): CarryFile | null {
  if (typeof text !== "string" || text.length > MAX_CHARS) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isPlain(parsed)) return null;
  const { kind, version, saved, items } = parsed;
  if (kind !== CARRY_KIND || version !== CARRY_VERSION || typeof saved !== "string" || !isPlain(items)) return null;
  const entries = Object.entries(items);
  if (entries.length > MAX_KEYS) return null;
  const out: Record<string, string> = {};
  for (const [key, value] of entries) if (isCarriedKey(key) && typeof value === "string") out[key] = value;
  return { kind: CARRY_KIND, version: CARRY_VERSION, saved, items: out };
}

// ── merging ──────────────────────────────────────────────────────────────────

const isPlain = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null && !Array.isArray(x);

/** When a record says it last changed (its updated or savedAt time), else NaN. */
function stamp(x: unknown): number {
  if (!isPlain(x)) return NaN;
  const t = typeof x.updated === "string" ? x.updated : typeof x.savedAt === "string" ? x.savedAt : null;
  return t === null ? NaN : Date.parse(t);
}

/** Of two versions of one thing, the newer when both say when they changed; else this device's. */
function newer(here: unknown, there: unknown): unknown {
  const a = stamp(here);
  const b = stamp(there);
  return !Number.isNaN(a) && !Number.isNaN(b) && b > a ? there : here;
}

/** What makes two list items the same item. */
function sameness(x: unknown): string {
  if (isPlain(x)) {
    for (const field of ["ref", "href", "id"]) {
      const v = x[field];
      if (typeof v === "string" || typeof v === "number") return `${field}:${v}`;
    }
  }
  return `=${JSON.stringify(x)}`;
}

/** Joins what this device holds with what the file holds (the rule at the top of this file). */
export function mergeValues(here: unknown, there: unknown): unknown {
  if (here === undefined) return there;
  if (there === undefined) return here;
  if (Array.isArray(here) && Array.isArray(there)) {
    const out = [...here];
    const at = new Map<string, number>();
    out.forEach((item, i) => {
      const id = sameness(item);
      if (!at.has(id)) at.set(id, i);
    });
    for (const item of there) {
      const id = sameness(item);
      const i = at.get(id);
      if (i === undefined) {
        at.set(id, out.length);
        out.push(item);
      } else out[i] = newer(out[i], item);
    }
    return out;
  }
  if (isPlain(here) && isPlain(there)) {
    if (!Number.isNaN(stamp(here)) && !Number.isNaN(stamp(there))) return newer(here, there);
    const out: Record<string, unknown> = { ...here };
    for (const [key, value] of Object.entries(there)) {
      if (key === "__proto__") continue;
      out[key] = mergeValues(here[key], value);
    }
    return out;
  }
  return here;
}

/** One key's stored text after the merge; the same text when nothing changes. */
function mergeStored(here: string, there: string): string {
  let a: unknown;
  let b: unknown;
  try {
    a = JSON.parse(here);
    b = JSON.parse(there);
  } catch {
    return here;
  }
  const merged = JSON.stringify(mergeValues(a, b));
  return merged === JSON.stringify(a) ? here : merged;
}

export interface CarryResult {
  ok: boolean;
  /** Keys only the file had. */
  added: number;
  /** Keys both held, now joined. */
  joined: number;
  /** Keys this device already held as the file has them. */
  same: number;
}

/** Brings a carry file into this browser, all of it or none of it. */
export function applyCarry(file: CarryFile, store?: Storage): CarryResult {
  const failed: CarryResult = { ok: false, added: 0, joined: 0, same: 0 };
  const s = localStore(store);
  if (!s) return failed;
  const result: CarryResult = { ok: true, added: 0, joined: 0, same: 0 };
  const writes: [string, string][] = [];
  try {
    for (const [key, there] of Object.entries(file.items)) {
      if (!isCarriedKey(key)) continue;
      const here = s.getItem(key);
      if (here === null) {
        writes.push([key, there]);
        result.added++;
        continue;
      }
      const next = here === there ? here : mergeStored(here, there);
      if (next === here) result.same++;
      else {
        writes.push([key, next]);
        result.joined++;
      }
    }
  } catch {
    return failed;
  }
  const undo: [string, string | null][] = [];
  try {
    for (const [key, value] of writes) {
      const before = s.getItem(key);
      s.setItem(key, value);
      undo.push([key, before]);
    }
  } catch {
    for (const [key, before] of undo.reverse()) {
      try {
        if (before === null) s.removeItem(key);
        else s.setItem(key, before);
      } catch {
        /* the device refused the undo too; nothing more can be done here */
      }
    }
    return failed;
  }
  return result;
}

// ── what the file holds, in plain words ─────────────────────────────────────

const countOf = (raw: string | undefined, shape: "list" | "record"): number => {
  if (raw === undefined) return 0;
  try {
    const x: unknown = JSON.parse(raw);
    if (shape === "list") return Array.isArray(x) ? x.length : 0;
    return isPlain(x) ? Object.keys(x).length : 0;
  } catch {
    return 0;
  }
};

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** "highlights and notes on 12 verses of the Bible", "3 saved pages", ...: what a file holds, for the reader to check before bringing it in. */
export function describeCarry(file: CarryFile): string[] {
  const { items } = file;
  const marks = countOf(items["livewell-marks-v1"], "list");
  const saved = countOf(items["livewell-library-v1"], "list");
  const walks = countOf(items["livewell-study-walk-v1"], "record");
  const named = new Set(["livewell-marks-v1", "livewell-library-v1", "livewell-study-walk-v1", "livewell:bookmarks"]);
  const other = Object.keys(items).filter((k) => !named.has(k)).length;
  const out: string[] = [];
  if (marks) out.push(`highlights and notes on ${plural(marks, "verse", "verses")} of the Bible`);
  if (saved) out.push(plural(saved, "saved page", "saved pages"));
  if (walks) out.push(plural(walks, "guided chapter study", "guided chapter studies"));
  if (other) out.push(other === 1 ? "1 more thing you saved or started (a plan, track or tool)" : `${other} more things you saved or started (plans, tracks and tools)`);
  return out;
}

// ── a link instead of a file ────────────────────────────────────────────────

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + 0x8000)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array {
  const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

/** Runs bytes through a (de)compression stream, stopping past `cap` bytes so a hostile link cannot swell. */
async function through(bytes: Uint8Array, stream: CompressionStream | DecompressionStream, cap: number): Promise<Uint8Array> {
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
  const reader = source.pipeThrough(stream as unknown as ReadableWritablePair<Uint8Array, Uint8Array>).getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > cap) {
      await reader.cancel();
      throw new Error("too large");
    }
    chunks.push(value);
  }
  const out = new Uint8Array(size);
  let at = 0;
  for (const chunk of chunks) {
    out.set(chunk, at);
    at += chunk.length;
  }
  return out;
}

const canDeflate = () => typeof CompressionStream === "function" && typeof DecompressionStream === "function";

/**
 * The link's data: "z" and the file squeezed small, or "j" and the file as it
 * is where the browser cannot squeeze it. Null when it is too long for a link.
 */
export async function carryToLinkData(file: CarryFile): Promise<string | null> {
  const bytes = new TextEncoder().encode(JSON.stringify(file));
  let data = "";
  if (canDeflate()) {
    try {
      data = `z${toBase64Url(await through(bytes, new CompressionStream("deflate-raw"), MAX_CHARS))}`;
    } catch {
      data = "";
    }
  }
  if (!data) data = `j${toBase64Url(bytes)}`;
  return data.length <= MAX_LINK_DATA ? data : null;
}

/** The whole link, on the site the reader is on. */
export function carryLink(data: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.livewellbyjamesbell.co";
  return `${origin}/my-library${CARRY_HASH}${data}`;
}

/** Reads a link's data back into a carry file; null when it is not one this site made. */
export async function carryFromLinkData(data: string): Promise<CarryFile | null> {
  if (typeof data !== "string" || data.length < 2 || data.length > MAX_FRAGMENT) return null;
  try {
    const body = fromBase64Url(data.slice(1));
    let bytes: Uint8Array;
    if (data[0] === "z") {
      if (!canDeflate()) return null;
      bytes = await through(body, new DecompressionStream("deflate-raw"), MAX_CHARS);
    } else if (data[0] === "j") bytes = body;
    else return null;
    return parseCarry(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

/** The link data in an address's hash ("#carry=..."), or null. */
export function linkDataInHash(hash: string): string | null {
  return hash.startsWith(CARRY_HASH) ? hash.slice(CARRY_HASH.length) : null;
}
