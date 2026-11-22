/**
 * family-films.mjs: which Bible Explorer film ("Watch and learn") a family
 * devotion or a catechism question offers ("Watch first").
 *
 * Built from the films' own data, never typed into a page:
 *
 *   client/public/explorer/index.json     the catalogue: which films are finished
 *   client/public/explorer/films/<slug>.json
 *                                         each film's frames (the verses it
 *                                         quotes) and its "deeper" links (the
 *                                         catechism questions it names)
 *   client/public/family/index.json       every devotion's passage, theme and title
 *   client/public/family-catechism.json   every question and its proof text
 *   client/public/family-film-picks.json  the judgments a rule cannot make
 *
 * The rule, in order, for a devotion or a question:
 *
 *   1. pick     the picks file names a film for it, or says "none" (film: null).
 *   2. name     its theme, title or question is a film's title ("Who Jesus Is",
 *               "Prayer", "What happens when we die?").
 *   3. named    (catechism only) a film's own "deeper" links name the question
 *               (/family/catechism#q41). Where two films name it, the one that
 *               also quotes its proof text, else the first in the catalogue.
 *   4. passage  exactly one film both quotes a verse inside the passage and
 *               shares a subject word with the theme, title or question.
 *
 * A film in the "story" group (the whole Bible in one film) touches every
 * passage, so it is offered only by a pick. A passage two films share with no
 * subject word to tell them apart gets no film: when unsure, none. A pick must
 * name a finished film and a devotion or question that exists; a stale pick
 * is a problem and stops the build.
 *
 * Output: client/public/family/films.json
 *
 *   { "devotions": { "<id>": { slug, title, minutes, by } },
 *     "catechism": { "<number>": { slug, title, minutes, by } } }
 *
 * `minutes` is the film's length read aloud at the younger level, rounded,
 * so the page can say "about 2 minutes" truthfully. `by` is the rule that
 * matched. New films appear on their devotions when this is rebuilt:
 *
 *   node scripts/build-family-films.mjs           write the map
 *   node scripts/build-family-films.mjs --check   exit 1 on drift (CI)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readRef } from "./bsb.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const OUT = "client/public/family/films.json";
export const PICKS = "client/public/family-film-picks.json";

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

/** Words that say nothing about a subject. "god" and "jesus" are in nearly every title. */
const STOP = new Set(
  "a an and are as at be but by can did do does for from god how i if in is it its jesus me my not of on or our so that the then this to us we what when who why will with you your".split(" "),
);

/** A title as its bare words: "Who Jesus Is" and "Who Jesus is?" are the same name. */
export function nameKey(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/^the /, "");
}

/** The subject words of a title, lightly stemmed so "prayer" meets "pray" and "sins" meets "sin". */
export function subjectWords(text) {
  const out = new Set();
  for (const w of nameKey(text).split(" ")) {
    if (!w || STOP.has(w) || w.length < 3) continue;
    out.add(w.replace(/(?:ers?|ing|s)$/, "") || w);
  }
  return out;
}

/** The spans a reference names: [{ book, c1, v1, c2, v2 }]. Unreadable: none. */
export function spans(ref) {
  const r = readRef(ref);
  return r ? r.parts.map((p) => ({ book: r.book.slug, ...p })) : [];
}

const before = (c, v, c2, v2) => c < c2 || (c === c2 && v < v2);
/** Do two spans share a verse? */
export function overlap(a, b) {
  return a.book === b.book && !before(a.c2, a.v2, b.c1, b.v1) && !before(b.c2, b.v2, a.c1, a.v1);
}
const touches = (refA, refB) => spans(refA).some((a) => spans(refB).some((b) => overlap(a, b)));

/** How long a film takes read aloud at the younger level, in whole minutes (at least 1). */
export function filmMinutes(frames) {
  let seconds = 0;
  for (const f of frames) {
    const words = String(f.younger ?? "").trim().split(/\s+/).filter(Boolean).length + (f.verse?.text ? String(f.verse.text).trim().split(/\s+/).length : 0);
    // The picture draws itself (about two seconds), then the words at a reading-aloud pace.
    seconds += Math.max(5, 2 + words / 2.5);
  }
  return Math.max(1, Math.round(seconds / 60));
}

/** The finished films, in the catalogue's order, each with what the rule reads. */
export function loadFilms(root = ROOT) {
  const pub = path.join(root, "client/public");
  const index = readJson(path.join(pub, "explorer/index.json"));
  return (index.films ?? [])
    .filter((f) => f.status === "finished")
    .map((f) => {
      const data = readJson(path.join(pub, "explorer/films", `${f.slug}.json`));
      return {
        slug: f.slug,
        title: f.title,
        group: f.group,
        verses: (data.frames ?? []).filter((x) => x.verse?.ref).map((x) => x.verse.ref),
        questions: (data.deeper ?? [])
          .map((d) => /^\/family\/catechism#q(\d+)$/.exec(d.href ?? ""))
          .filter(Boolean)
          .map((m) => Number(m[1])),
        minutes: filmMinutes(data.frames ?? []),
      };
    });
}

/**
 * The film for one thing (a devotion or a question), or null.
 * names: its theme, title or question. passage: its reference. number: a question's number.
 */
export function matchFilm({ names, passage, number }, films, pick) {
  if (pick) {
    if (pick.film === null) return null;
    const film = films.find((f) => f.slug === pick.film);
    return film ? { film, by: "pick" } : null;
  }
  const keys = new Set(names.map(nameKey).filter(Boolean));
  const named = films.find((f) => keys.has(nameKey(f.title)));
  if (named) return { film: named, by: "name" };
  if (number !== undefined) {
    const naming = films.filter((f) => f.questions.includes(number));
    if (naming.length) {
      const film = naming.find((f) => f.verses.some((v) => touches(v, passage))) ?? naming[0];
      return { film, by: "named" };
    }
  }
  const words = new Set(names.flatMap((n) => [...subjectWords(n)]));
  const close = films.filter(
    (f) => f.group !== "story" && f.verses.some((v) => touches(v, passage)) && [...subjectWords(f.title)].some((w) => words.has(w)),
  );
  return close.length === 1 ? { film: close[0], by: "passage" } : null;
}

const row = (m) => ({ slug: m.film.slug, title: m.film.title, minutes: m.film.minutes, by: m.by });

/** Build the map. Problems (a stale pick) stop the build. */
export function buildFamilyFilms(root = ROOT, { films = loadFilms(root), picks } = {}) {
  const pub = path.join(root, "client/public");
  const family = readJson(path.join(pub, "family/index.json"));
  const catechism = readJson(path.join(pub, "family-catechism.json"));
  const judged = picks ?? readJson(path.join(root, PICKS));
  const problems = [];
  const slugs = new Set(films.map((f) => f.slug));
  const checkPicks = (kind, ids) => {
    for (const [id, pick] of Object.entries(judged[kind] ?? {})) {
      if (!ids.has(id)) problems.push(`${PICKS}: ${kind} "${id}" is not a ${kind === "devotions" ? "devotion" : "catechism question"} on the site`);
      if (!pick || typeof pick !== "object" || !("film" in pick)) problems.push(`${PICKS}: ${kind} "${id}" needs a "film" (a slug, or null for none)`);
      else if (pick.film !== null && !slugs.has(pick.film)) problems.push(`${PICKS}: ${kind} "${id}" names "${pick.film}", which is not a finished film`);
      if (!pick?.why || typeof pick.why !== "string") problems.push(`${PICKS}: ${kind} "${id}" needs a "why"`);
    }
  };
  checkPicks("devotions", new Set(family.devotions.map((d) => d.id)));
  checkPicks("catechism", new Set(catechism.map((q) => String(q.number))));

  const devotions = {};
  for (const d of family.devotions) {
    const m = matchFilm({ names: [d.theme, d.title], passage: d.passage }, films, judged.devotions?.[d.id]);
    if (m) devotions[d.id] = row(m);
  }
  const questions = {};
  for (const q of catechism) {
    const m = matchFilm({ names: [q.question], passage: q.scripture, number: q.number }, films, judged.catechism?.[String(q.number)]);
    if (m) questions[String(q.number)] = row(m);
  }
  const map = {
    about: "Written by scripts/build-family-films.mjs from the Bible Explorer films, the family index, the catechism and client/public/family-film-picks.json. Do not edit by hand.",
    devotions,
    catechism: questions,
  };
  return { map, problems, counts: { devotions: Object.keys(devotions).length, of: family.devotions.length, catechism: Object.keys(questions).length, questions: catechism.length, films: films.length } };
}

export function renderFamilyFilms(map) {
  return `${JSON.stringify(map, null, 1)}\n`;
}
