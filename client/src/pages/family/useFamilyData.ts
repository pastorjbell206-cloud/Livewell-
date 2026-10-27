/**
 * Loading The Table's data: the family index (client/public/family/index.json)
 * and, for one devotion page, the library file that holds it. Loading, failed,
 * missing, and ready are distinct states keyed to a retry nonce (the HowTos
 * pattern), so a failed fetch offers a retry instead of "Loading…" forever.
 */
import { useCallback, useEffect, useState } from "react";
import { fetchJson } from "@/lib/fetch-json";
import { FAMILY_INDEX_URL, isFamilyIndex, type FamilyIndex, type FamilyIndexRow } from "@/lib/familyTable";

/** One devotion, weekly or a day of a set, in the one shape the pages show. */
export interface Devotion {
  row: FamilyIndexRow;
  passageText: string;
  /** Weekly devotions only. */
  bigIdea?: string;
  reflection: string;
  /** Shown "together" until the age bands land (U21). */
  questions: string[];
  /** Weekly devotions only. */
  activity?: string;
  prayer: string;
  /** The weekly set quotes the BSB word for word; the daily sets retell each passage for children. */
  rendering: "bsb" | "paraphrase";
}

const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);
const isText = (x: unknown): x is string => typeof x === "string" && x.trim().length > 0;
const texts = (x: unknown): string[] => (Array.isArray(x) ? x.filter(isText) : []);

/** The questions as a list: the plain list today; the "together" band, or both bands, once U21 adds them. */
function questionsOf(q: unknown): string[] {
  if (Array.isArray(q)) return texts(q);
  if (isObject(q)) return texts(q.together).length ? texts(q.together) : [...texts(q.younger), ...texts(q.older)];
  return [];
}

/** The devotion a row names, out of its library file, or null when the file does not hold it. */
export function devotionFrom(row: FamilyIndexRow, data: unknown): Devotion | null {
  if (row.kind === "weekly") {
    if (!Array.isArray(data)) return null;
    const d = data.find((x) => isObject(x) && x.id === row.id);
    if (!isObject(d) || !isText(d.passageText) || !isText(d.reflection) || !isText(d.prayer)) return null;
    return {
      row,
      passageText: d.passageText,
      bigIdea: isText(d.bigIdea) ? d.bigIdea : undefined,
      reflection: d.reflection,
      questions: questionsOf(d.questions),
      activity: isText(d.activity) ? d.activity : undefined,
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
