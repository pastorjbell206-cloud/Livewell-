/**
 * What a moving picture's recorded voice says, frame by frame.
 *
 * One frame of a film (client/public/explorer/films/<slug>.json) is spoken as
 * its `say` text at the reader's level, or its caption where it has none;
 * then, where the frame has a verse the caption does not already quote, the
 * verse and then its reference in words ("Genesis one, verse thirty-one").
 * client/src/lib/film-voice.ts says the same parts in the same order with the
 * device's voice; client/src/lib/film-audio.test.ts holds the two together.
 *
 * Nothing here needs the speech model: scripts/build-film-audio.mjs uses it
 * to make the files and, with --check, to see that each file still says what
 * the page says.
 */
import crypto from "node:crypto";

export const LEVELS = ["younger", "older"];

const ONES =
  "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(
    " "
  );
const TENS = "x x twenty thirty forty fifty sixty seventy eighty ninety".split(
  " "
);

/** A chapter or verse number in words, as a reader says it. */
export function numberInWords(n) {
  n = Number(n);
  if (n < 20) return ONES[n];
  if (n < 100)
    return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : "");
  if (n < 200)
    return `one hundred${n % 100 ? ` and ${numberInWords(n % 100)}` : ""}`;
  return String(n);
}

const ORDINAL = { 1: "First", 2: "Second", 3: "Third" };

/** "1 Corinthians 15:3-4" as the voice says it: "First Corinthians fifteen, verses three and four." */
export function refSpoken(ref) {
  const m = ref
    .trim()
    .match(/^([1-3])?\s?([A-Z][A-Za-z ]*?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
  if (!m) throw new Error(`cannot say the reference "${ref}"`);
  const [, num, name, ch, v1, v2] = m;
  const book = num ? `${ORDINAL[num]} ${name}` : name;
  const head = `${book} ${numberInWords(ch)}`;
  if (!v1) return `${head}.`;
  if (!v2) return `${head}, verse ${numberInWords(v1)}.`;
  const join = Number(v2) === Number(v1) + 1 ? "and" : "to";
  return `${head}, verses ${numberInWords(v1)} ${join} ${numberInWords(v2)}.`;
}

const squash = t =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * The parts one frame says at a level, as the site words them: the caption
 * (or its `say`), then the verse and its reference unless the caption already
 * quotes the verse.
 */
export function frameParts(frame, level) {
  const said = (frame.say?.[level] ?? frame[level]).trim();
  const parts = [{ kind: "caption", text: said }];
  if (frame.verse && !squash(said).includes(squash(frame.verse.text))) {
    parts.push({ kind: "verse", text: frame.verse.text.trim() });
    parts.push({ kind: "ref", text: frame.verse.ref.trim() });
  }
  return parts;
}

/**
 * The words handed to the speech engine for one part. The site's text is
 * never changed; only what the engine is given: straight quotation marks, a
 * capital on a verse that begins mid-sentence, a full stop at the end, and the
 * respellings the voice needs (film-audio.config.json).
 */
export function engineText(part, config) {
  if (part.kind === "ref") return refSpoken(part.text);
  let t = part.text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").trim();
  for (const [from, to] of config.respell ?? [])
    t = t.replace(new RegExp(from, "g"), to);
  if (/^[a-z]/.test(t)) t = t[0].toUpperCase() + t.slice(1);
  if (!/[.!?]["']?$/.test(t)) t += ".";
  return t;
}

/** One sentence at a time, so every pause is exact. */
export const sentences = text =>
  text.split(/(?<=[.!?]["']?)\s+(?=["']?[A-Z0-9])/).filter(Boolean);

/**
 * Everything one file says: each sentence the engine is given, and the pause
 * that follows it (a name from the config's `gaps`).
 */
export function framePlan(frame, level, config) {
  const parts = frameParts(frame, level);
  const units = [];
  parts.forEach((part, i) => {
    const list = sentences(engineText(part, config));
    const next = parts[i + 1];
    list.forEach((text, j) => {
      const gap =
        j < list.length - 1
          ? "sentence"
          : !next
            ? "tail"
            : next.kind === "verse"
              ? "captionToVerse"
              : "verseToRef";
      units.push({ kind: part.kind, text, gap });
    });
  });
  return units;
}

/** The film's title, said once before a video; the player never plays it. */
export const titlePlan = (film, config) => [
  {
    kind: "title",
    text: engineText({ kind: "title", text: film.title }, config),
    gap: "tail",
  },
];

/** A hash of the exact words a file speaks and the voice that speaks them. */
export function planHash(units, config) {
  const { voice, lang, speed, gaps } = config;
  return crypto
    .createHash("sha256")
    .update(JSON.stringify({ v: 1, voice, lang, speed, gaps, units }))
    .digest("hex")
    .slice(0, 20);
}

const two = n => String(n).padStart(2, "0");

/** Where a frame's file lives under client/public/explorer/audio/. */
export const frameFile = (slug, level, index, id) =>
  `${slug}/${level}/${two(index + 1)}-${id}.mp3`;
export const titleFile = slug => `${slug}/title.mp3`;

/** Every file a finished film needs: [{ key, file, units, hash }]. */
export function filmPlan(film, config) {
  const out = [];
  const title = titlePlan(film, config);
  out.push({
    key: "title",
    level: null,
    file: titleFile(film.slug),
    units: title,
    hash: planHash(title, config),
  });
  for (const level of LEVELS)
    film.frames.forEach((frame, i) => {
      const units = framePlan(frame, level, config);
      out.push({
        key: `${level}/${frame.id}`,
        level,
        id: frame.id,
        file: frameFile(film.slug, level, i, frame.id),
        units,
        hash: planHash(units, config),
      });
    });
  return out;
}
