/**
 * questions.mjs: the apologetics library's data (client/public/questions/),
 * read the same way by the manifest builder, the validator, the sitemap, the
 * prerender and the search index.
 *
 * areas.json lists the ten areas in the plan's order. An area's pieces are
 * <area>/<slug>.json and its own page text is <area>/_area.json.
 *
 * Pending and live: a piece is live when its own status is "live" and its
 * area's is too; an area is live when its status is "live"; the room
 * (/questions) is live when any area is. Only live things reach a menu, the
 * sitemap, the search index or llms.txt. A pending page can be opened by its
 * address (so James can read it on the preview); it says noindex and is
 * linked from no live page.
 */
import fs from "node:fs";
import path from "node:path";

export const QUESTIONS_REL = "client/public/questions";
const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

/** The data directory (QUESTIONS_DIR overrides it, for the validator's own tests). */
export const questionsDir = (root = REPO) => process.env.QUESTIONS_DIR || path.join(root, QUESTIONS_REL);

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

export const roomHref = () => "/questions";
export const areaHref = (area) => `/questions/${area}`;
export const pieceHref = (area, slug) => `/questions/${area}/${slug}`;
export const claimsHref = () => "/questions/claims";

/**
 * Everything, with `live` worked out:
 * { areas: [{ ...area, live, page, pieces: [{ ...piece, live }] }], roomLive, problems }
 * `problems` holds files that could not be read (the validator reports them).
 */
export function loadQuestions(root = REPO) {
  const dir = questionsDir(root);
  const problems = [];
  if (!fs.existsSync(path.join(dir, "areas.json"))) return { areas: [], roomLive: false, problems: ["areas.json is missing"] };
  let list = [];
  try {
    list = readJson(path.join(dir, "areas.json")).areas || [];
  } catch (e) {
    problems.push(`areas.json: ${e.message}`);
  }
  const areas = list.map((a) => {
    const adir = path.join(dir, a.slug);
    let page = null;
    const pieces = [];
    if (fs.existsSync(adir)) {
      if (fs.existsSync(path.join(adir, "_area.json"))) {
        try { page = readJson(path.join(adir, "_area.json")); } catch (e) { problems.push(`${a.slug}/_area.json: ${e.message}`); }
      }
      // In the area page's order; a file the page does not list comes after.
      const order = (page?.pieces || []).map((p) => p.slug);
      const files = fs.readdirSync(adir).filter((f) => f.endsWith(".json") && f !== "_area.json").map((f) => f.slice(0, -5));
      files.sort((x, y) => (order.indexOf(x) + 1 || 999) - (order.indexOf(y) + 1 || 999) || x.localeCompare(y));
      for (const slug of files) {
        try {
          const p = readJson(path.join(adir, `${slug}.json`));
          pieces.push({ ...p, file: `${a.slug}/${slug}.json`, live: a.status === "live" && p.status === "live" });
        } catch (e) {
          problems.push(`${a.slug}/${slug}.json: ${e.message}`);
        }
      }
    }
    return { ...a, live: a.status === "live", page, pieces };
  });
  return { areas, roomLive: areas.some((a) => a.live), problems };
}

/** The addresses that are live: the room, the claims index, live areas and live pieces. */
export function liveQuestionPaths(root = REPO) {
  const q = loadQuestions(root);
  if (!q.roomLive) return [];
  const out = [roomHref(), claimsHref()];
  for (const a of q.areas.filter((x) => x.live)) {
    out.push(areaHref(a.slug));
    for (const p of a.pieces.filter((x) => x.live)) out.push(pieceHref(a.slug, p.slug));
  }
  return out;
}

/** Every address the library has, live or pending (the prerender writes them all). */
export function allQuestionPaths(root = REPO) {
  const q = loadQuestions(root);
  const out = [{ path: roomHref(), live: q.roomLive }, { path: claimsHref(), live: q.roomLive }];
  for (const a of q.areas) {
    if (!a.page) continue;
    out.push({ path: areaHref(a.slug), live: a.live });
    for (const p of a.pieces) out.push({ path: pieceHref(a.slug, p.slug), live: p.live });
  }
  return out;
}

/** The prose of a piece, field by field, for word counts and the house rules. */
export function pieceProse(p) {
  const body = [p.shortAnswer, ...(p.sections || []).flatMap((s) => (s.role === "argument" ? [s.intro, ...(s.steps || []), s.conclusion, s.after] : [s.body]))];
  return body.filter((x) => typeof x === "string");
}

/** The manifest (client/public/questions/index.json), as scripts/build-questions-index.mjs writes it. */
export function buildQuestionsIndex(root = REPO) {
  const q = loadQuestions(root);
  if (q.problems.length) throw new Error(q.problems.join("\n"));
  const areas = q.areas.map((a) => {
    const blurb = new Map((a.page?.pieces || []).map((p) => [p.slug, p.blurb]));
    return {
      slug: a.slug,
      n: a.n,
      title: a.title,
      ...(a.line ? { line: a.line } : {}),
      planned: a.planned,
      status: a.status,
      live: a.live,
      hasPage: !!a.page,
      pieces: a.pieces.map((p) => ({ slug: p.slug, question: p.question, ...(blurb.get(p.slug) ? { blurb: blurb.get(p.slug) } : {}), status: p.status, live: p.live })),
    };
  });
  const claims = q.areas.flatMap((a) =>
    a.pieces.flatMap((p) => (p.claims || []).map((c) => ({ ...c, area: a.slug, slug: p.slug, question: p.question, live: p.live })))
  );
  // The Honest Answers the pieces link, by their questions (read from
  // client/src/data/answers.ts, so a piece page need not load that file).
  const used = new Set(q.areas.flatMap((a) => a.pieces.flatMap((p) => p.links?.answers || [])));
  const answers = {};
  const src = path.join(root, "client/src/data/answers.ts");
  if (used.size && fs.existsSync(src)) {
    for (const m of fs.readFileSync(src, "utf8").matchAll(/\bslug:\s*"([a-z0-9-]+)",\s*question:\s*"([^"]+)"/g)) if (used.has(m[1])) answers[m[1]] = m[2];
  }
  return {
    _note: "Generated by scripts/build-questions-index.mjs from areas.json and the area folders. Do not edit by hand.",
    roomLive: q.roomLive,
    areas,
    claims,
    answers,
  };
}
