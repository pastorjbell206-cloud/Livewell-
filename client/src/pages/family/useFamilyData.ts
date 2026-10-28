/**
 * Loading The Table's data: the family index (client/public/family/index.json)
 * and, for one devotion page, the library file that holds it. Loading, failed,
 * missing, and ready are distinct states keyed to a retry nonce (the HowTos
 * pattern), so a failed fetch offers a retry instead of "Loading…" forever.
 */
import { useCallback, useEffect, useState } from "react";
import { fetchJson } from "@/lib/fetch-json";
import { FAMILY_INDEX_URL, isFamilyIndex, readFamilyProgress, saveFamilyBand, type FamilyBand, type FamilyIndex, type FamilyIndexRow } from "@/lib/familyTable";
import type { AskChoice } from "./DevotionParts";

/** One devotion, weekly or a day of a set, in the one shape the pages show. */
export interface Devotion {
  row: FamilyIndexRow;
  passageText: string;
  /** Weekly devotions only. */
  bigIdea?: string;
  reflection: string;
  /** Every question, in order: the plain list, or the younger band then the older. */
  questions: string[];
  /** The age bands, where the devotion has them (U21): younger children and older. */
  bands?: { younger: string[]; older: string[] };
  /** Weekly devotions only. */
  activity?: string;
  /**
   * A devotion on politics (U11): two short paragraphs read in turn, one to
   * each side of the table ("If you are glad about how it went", "If you are
   * sad about how it went"). scripts/validate-politics.mjs holds them to the
   * same length.
   */
  sides?: { label: string; text: string }[];
  prayer: string;
  /** The weekly set quotes the BSB word for word; the daily sets retell each passage for children. */
  rendering: "bsb" | "paraphrase";
}

const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);
const isText = (x: unknown): x is string => typeof x === "string" && x.trim().length > 0;
const texts = (x: unknown): string[] => (Array.isArray(x) ? x.filter(isText) : []);

/**
 * The questions: a plain list, or split by age (U21). Split, "together" asks
 * both bands; a devotion that also writes its own together list asks that.
 * A band is only real when both halves are there (validate-family.mjs).
 */
function questionsOf(q: unknown): Pick<Devotion, "questions" | "bands"> {
  if (Array.isArray(q)) return { questions: texts(q) };
  if (!isObject(q)) return { questions: [] };
  const younger = texts(q.younger);
  const older = texts(q.older);
  const bands = younger.length && older.length ? { younger, older } : undefined;
  const together = texts(q.together);
  return { questions: together.length ? together : [...younger, ...older], bands };
}

/** Two labelled paragraphs, or nothing: a politics devotion's sides. */
function sidesOf(x: unknown): { label: string; text: string }[] | undefined {
  if (!Array.isArray(x)) return undefined;
  const sides = x.filter((s): s is { label: string; text: string } => isObject(s) && isText(s.label) && isText(s.text));
  return sides.length === 2 ? sides.map((s) => ({ label: s.label, text: s.text })) : undefined;
}

/** The devotions in a weekly file: a plain list, or a strand file's { live, devotions } (U11). */
function weeklyList(data: unknown): unknown[] | null {
  if (Array.isArray(data)) return data;
  if (isObject(data) && Array.isArray(data.devotions)) return data.devotions;
  return null;
}

/** The devotion a row names, out of its library file, or null when the file does not hold it. */
export function devotionFrom(row: FamilyIndexRow, data: unknown): Devotion | null {
  if (row.kind === "weekly") {
    const list = weeklyList(data);
    if (!list) return null;
    const d = list.find((x) => isObject(x) && x.id === row.id);
    if (!isObject(d) || !isText(d.passageText) || !isText(d.reflection) || !isText(d.prayer)) return null;
    return {
      row,
      passageText: d.passageText,
      bigIdea: isText(d.bigIdea) ? d.bigIdea : undefined,
      reflection: d.reflection,
      ...questionsOf(d.questions),
      activity: isText(d.activity) ? d.activity : undefined,
      sides: sidesOf(d.sides),
      prayer: d.prayer,
      rendering: "bsb",
    };
  }
  if (!isObject(data) || !row.set) return null;
  const list = data[row.set];
  if (!Array.isArray(list)) return null;
  const d = list.find((x) => isObject(x) && x.day === row.day);
  if (!isObject(d) || !isText(d.passageText) || !isText(d.reflection) || !isText(d.prayer)) return null;
  return {
    row,
    passageText: d.passageText,
    reflection: d.reflection,
    questions: isText(d.question) ? [d.question] : [],
    prayer: d.prayer,
    rendering: "paraphrase",
  };
}

export type Loaded<T> = { status: "loading" } | { status: "failed" } | { status: "ready"; value: T };

/** The family index, with a retry. */
export function useFamilyIndex(): { state: Loaded<FamilyIndex>; retry: () => void } {
  const [nonce, setNonce] = useState(0);
  const [state, setState] = useState<{ nonce: number; value: Loaded<FamilyIndex> }>({ nonce: 0, value: { status: "loading" } });
  useEffect(() => {
    let live = true;
    fetchJson(FAMILY_INDEX_URL, isFamilyIndex)
      .then((value) => live && setState({ nonce, value: { status: "ready", value } }))
      .catch(() => live && setState({ nonce, value: { status: "failed" } }));
    return () => {
      live = false;
    };
  }, [nonce]);
  const retry = useCallback(() => setNonce((n) => n + 1), []);
  return { state: state.nonce === nonce ? state.value : { status: "loading" }, retry };
}

export type DevotionState =
  | { status: "loading" }
  | { status: "failed" }
  | { status: "missing" }
  | { status: "ready"; index: FamilyIndex; devotion: Devotion };

/** One devotion page's data: the index, then the one library file that holds the devotion. */
export function useDevotion(id: string): { state: DevotionState; retry: () => void } {
  const [nonce, setNonce] = useState(0);
  const [state, setState] = useState<{ key: string; value: DevotionState }>({ key: "", value: { status: "loading" } });
  const key = `${id}#${nonce}`;
  useEffect(() => {
    let live = true;
    const settle = (value: DevotionState) => live && setState({ key, value });
    fetchJson(FAMILY_INDEX_URL, isFamilyIndex)
      .then(async (index) => {
        const row = index.devotions.find((r) => r.id === id);
        if (!row) return settle({ status: "missing" });
        const devotion = devotionFrom(row, await fetchJson(row.file));
        settle(devotion ? { status: "ready", index, devotion } : { status: "failed" });
      })
      .catch(() => settle({ status: "failed" }));
    return () => {
      live = false;
    };
  }, [id, key]);
  const retry = useCallback(() => setNonce((n) => n + 1), []);
  return { state: state.key === key ? state.value : { status: "loading" }, retry };
}

/**
 * Whose questions this family asks (U21): read from this device as the page
 * first renders (there is no server render to agree with), and kept there
 * when the family changes it. `kept` says whether the browser kept it.
 */
export function useFamilyBand(): AskChoice {
  const [band, setBand] = useState<FamilyBand>(() => readFamilyProgress().band);
  const [kept, setKept] = useState<boolean | null>(null);
  const onBand = useCallback((next: FamilyBand) => {
    setBand(next);
    setKept(saveFamilyBand(next).ok);
  }, []);
  return { band, onBand, kept };
}
