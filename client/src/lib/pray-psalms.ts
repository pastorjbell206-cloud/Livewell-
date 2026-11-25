/**
 * Pray the Psalms' data (/tools/pray-the-psalms): the files
 * scripts/build-pray-psalms.mjs writes under client/public/pray-psalms/.
 * Every verse is the BSB as the repo holds it; every title, summary, care
 * paragraph and teaching panel is the Study Bible's own note on the Psalms,
 * word for word. The lines and guides were written for the page and checked
 * against each psalm's plain note.
 */
import { fetchJson } from "@/lib/fetch-json";

export interface PpKindRef {
  id: string;
  often: boolean;
}

export interface PpBrief {
  n: number;
  title: string;
  kinds: PpKindRef[];
  when: string[];
  line: string;
  verses: number;
  /** Carries care lines from its plain note. */
  heavy: boolean;
}

export interface PpIndex {
  kinds: { id: string; name: string; line: string; count: number }[];
  whens: { id: string; name: string; line: string; psalms: number[] }[];
  psalms: PpBrief[];
  plan: { d: number; morning: number[]; evening: number[] }[];
  teaching: Record<"minute" | "howTo" | "kinds" | "cursing", { h: string; body: string[] }>;
}

export interface PpStanza {
  from: number;
  to: number;
  title: string;
  /** 1-based part when the outline's part was split; 0 when whole. */
  part: number;
  parts: number;
}

export interface PpPsalm {
  n: number;
  title: string;
  summary: string;
  kinds: { id: string; name: string; often: boolean; from: { where: string; text: string } }[];
  when: string[];
  line: string;
  guide: string;
  care: { v: string; text: string }[];
  ending: { v: string; text: string }[];
  cursing: boolean;
  stanzas: PpStanza[];
  verses: { v: number; t: string }[];
}

const BASE = "/pray-psalms";

const isIndex = (x: unknown): x is PpIndex => {
  const d = x as PpIndex;
  return !!d && Array.isArray(d.psalms) && Array.isArray(d.whens) && Array.isArray(d.plan) && !!d.teaching;
};
const isPsalm = (x: unknown): x is PpPsalm => {
  const d = x as PpPsalm;
  return !!d && typeof d.n === "number" && Array.isArray(d.verses) && Array.isArray(d.stanzas);
};

export const fetchPpIndex = () => fetchJson(`${BASE}/index.json`, isIndex);
export const fetchPpPsalm = (n: number) => fetchJson(`${BASE}/psalm/${n}.json`, isPsalm);

/** The plan's day for a date: the day of the month (1 to 31). */
export function planDay(d = new Date()): number {
  return Math.min(31, Math.max(1, d.getDate()));
}

/** A date as the page keeps it ("2026-11-20"), in the reader's own time. */
export function dayKey(d = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** The Study Bible's page for a psalm, at its notes. */
export const studyHref = (n: number) => `/study/bible/psalms/${n}#notes`;

/** "Lament", or "Often read as Wisdom" for a kind the notes give with a hedge. */
export const kindLabel = (name: string, often: boolean) => (often ? `Often read as ${name}` : name);
