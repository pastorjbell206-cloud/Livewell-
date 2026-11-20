/**
 * What a moving picture says aloud, and the device voice that says it.
 *
 * Each frame of a film (client/public/explorer/films/<slug>.json) is spoken
 * as its `say` text at the reader's level, or, where it has none, its caption;
 * then, if the frame quotes a verse, the verse's reference in words and the
 * verse itself, exactly as it stands under the picture. A caption that reads
 * badly aloud (a reference in brackets) has a `say` written for it in the
 * film's data; scripts/validate-explorer.mjs holds every spoken line to the
 * same rules as the captions (BSB words exact, no reference left in figures).
 *
 * The voice is the browser's own (window.speechSynthesis), as the essays'
 * Listen and the catechism's "Read it to me" use: nothing is recorded or sent.
 * The same text is the script a person would read to record a film's voice
 * (scripts/export-film-video.mjs takes those recordings).
 */
import type { FilmFrame, Level } from "@/lib/explorer";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

const ORDINAL: Record<string, string> = {
  "1": "First",
  "2": "Second",
  "3": "Third",
};

/**
 * A Bible reference said in words: "1 Corinthians 15:3-4" becomes
 * "First Corinthians chapter 15, verses 3 to 4"; "Psalm 90:2" becomes
 * "Psalm 90, verse 2". Anything it cannot read comes back as it was.
 */
export function refInWords(ref: string): string {
  const m = ref
    .trim()
    .match(/^([1-3])?\s?([A-Z][A-Za-z ]*?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
  if (!m) return ref;
  const [, num, name, ch, v1, v2] = m;
  const book = num ? `${ORDINAL[num]} ${name}` : name;
  const psalm = /^Psalms?$/.test(name);
  const chapter = psalm ? `Psalm ${ch}` : `${book} chapter ${ch}`;
  if (!v1) return chapter;
  if (!v2) return `${chapter}, verse ${v1}`;
  const join = Number(v2) === Number(v1) + 1 ? "and" : "to";
  return `${chapter}, verses ${v1} ${join} ${v2}`;
}

const squash = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const endStop = (t: string) =>
  /[.!?”"]$/.test(t.trim()) ? t.trim() : `${t.trim()}.`;

/** The words one frame says aloud at a level. */
export function spokenText(frame: FilmFrame, level: Level): string {
  const said = (frame.say?.[level] ?? frame[level]).trim();
  if (!frame.verse) return said;
  // A caption that already quotes the frame's verse does not say it twice.
  if (squash(said).includes(squash(frame.verse.text))) return said;
  return `${endStop(said)} ${refInWords(frame.verse.ref)}: ${endStop(frame.verse.text)}`;
}

export function canSpeak(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      typeof window.SpeechSynthesisUtterance === "function"
    );
  } catch {
    return false;
  }
}

/**
 * The device's voice for the page's language: one made on the device if it
 * has one (it starts at once and works offline), else the browser's default
 * for that language, else whatever the browser picks.
 */
export function pickVoice(lang: string): SpeechSynthesisVoice | null {
  let voices: SpeechSynthesisVoice[];
  try {
    voices = window.speechSynthesis.getVoices?.() ?? [];
  } catch {
    return null;
  }
  const base = lang.toLowerCase().split("-")[0];
  const mine = voices.filter(v => v.lang?.toLowerCase().startsWith(base));
  return (
    mine.find(
      v => v.lang?.toLowerCase() === lang.toLowerCase() && v.localService
    ) ??
    mine.find(v => v.localService) ??
    mine.find(v => v.default) ??
    mine[0] ??
    null
  );
}

/** How long to wait for a spoken frame before moving on anyway, if the voice never says it has finished. */
export const speechTimeoutMs = (text: string) =>
  Math.max(8000, text.trim().split(/\s+/).length * 600 + 4000);

/** The reader's Listen choice, kept on this device. */
export const LISTEN_KEY = "livewell-explorer-listen-v1";
const isListen = (x: unknown): x is { v: 1; on: boolean } =>
  !!x &&
  typeof x === "object" &&
  (x as { v?: unknown }).v === 1 &&
  typeof (x as { on?: unknown }).on === "boolean";

export const readListen = () =>
  readStoredJSON(LISTEN_KEY, isListen, { v: 1, on: false }).on;
export const writeListen = (on: boolean) =>
  writeStoredJSON(LISTEN_KEY, { v: 1, on });
