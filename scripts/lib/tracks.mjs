/**
 * tracks.mjs — the tracks library (client/public/tracks/<slug>.json): what a
 * track is, what the index holds, and every rule a track must keep. Shared by
 * scripts/build-tracks-index.mjs and scripts/validate-tracks.mjs, so the
 * builder, the gate and the test (server/tracks-validator.test.ts) read one
 * set of rules. docs/work/elite/tracks.md says how to write a track.
 *
 * A track is a few numbered sessions of about ten minutes. Each session has
 * its own short teaching, one existing page or tool to open ("open"), and
 * ends by asking something of the reader: one question, one thing to do, one
 * verse to keep. Each carries a guide for a group.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { quotesPassage, readRef } from "./bsb.mjs";
import { forbiddenRe, setAsideAllowed } from "./forbidden-language.mjs";
import { loadEssayShelf } from "./shelf.mjs";
import { resolveHref, ROOT } from "./site-routes.mjs";

/** TRACKS_DIR points the gate at a copy of the library (the validator's own test). */
export const TRACKS_DIR = process.env.TRACKS_DIR || join(ROOT, "client/public/tracks");
export const INDEX_FILE = "index.json";

/**
 * The kinds of thing a session can open, each with the addresses that count
 * as that kind. A track names the kind so the gate can count how many
 * different kinds it uses: the point of a track is that the tools get used.
 */
export const KINDS = {
  chapter: { name: "A Bible chapter with its notes", match: /^\/study\/bible\/[a-z0-9-]+\/\d+(#[a-z0-9-]+)?$/ },
  study: { name: "How to study, and the guided chapter study", match: /^\/study\/(how-to-study|bible\/[a-z0-9-]+\/\d+\?study=walk)$/ },
  book: { name: "A book of the Bible", match: /^\/study\/bible\/[a-z0-9-]+$/ },
  film: { name: "A Bible Explorer film", match: /^\/study\/explorer\/watch\/[a-z0-9-]+$/ },
  answer: { name: "An Honest Answer", match: /^\/answers\/[a-z0-9-]+$/ },
  case: { name: "The case for the faith: a piece, an area, or the whole library", match: /^\/questions(\/[a-z0-9-]+(\/[a-z0-9-]+)?)?$/ },
  "wisdom-finder": { name: "The Wisdom Finder", match: /^\/tools\/wisdom-finder(\?.*)?$/ },
  wisdom: { name: "What the Bible says on a subject", match: /^\/wisdom\/[a-z0-9-]+$/ },
  psalms: { name: "Pray the Psalms", match: /^\/tools\/pray-the-psalms(\?psalm=\d+)?$/ },
  "self-check": { name: "A self-check", match: /^\/(diagnostic|life\/assessment|tools\/(life-audit|emotional-health|marriage-assessment|financial-health|spiritual-gifts|theology-quiz))$/ },
  catechism: { name: "The family catechism", match: /^\/family\/catechism(#q\d+)?$/ },
  devotion: { name: "A family devotion", match: /^\/family\/(tonight|devotions(\/[a-z0-9-]+)?)$/ },
  plan: { name: "A plan", match: /^\/(plans\/[a-z0-9-]+|study\/plans|study\/bible\/guides\/whole-story-2027|family\/reading-plans)$/ },
  guide: { name: "A study guide", match: /^\/studyguides\/[a-z0-9-]+$/ },
  help: { name: "Find Help", match: /^\/help(\/[a-z0-9-]+)?$/ },
  creed: { name: "A creed", match: /^\/resources\/creeds(\/[a-z0-9-]+)?$/ },
  compare: { name: "Where Christians differ", match: /^\/theology\/(compare|traditions|which-view)$/ },
  tool: { name: "A tool", match: /^\/tools\/[a-z0-9-]+$/ },
  track: { name: "The tracks", match: /^\/tracks(\/[a-z0-9-]+)?$/ },
  skeptics: { name: "For skeptics", match: /^\/skeptics$/ },
  history: { name: "Church history: the course, or one of its lessons", match: /^\/theology\/history(\/[a-z0-9-]+)?$/ },
};

/** A track uses at least this many kinds across its sessions. */
export const MIN_KINDS = 8;

/**
 * A track's leader's guide (/tracks/<slug>/leader), when it has one: a word on
 * what the group is, then these parts in this order. The page gathers each
 * session's group guide under them.
 */
export const LEADER_SECTIONS = ["group", "room", "order", "hard", "hurting", "help"];

/** Words that mean a session touches sin, guilt, fear, death or doubt: it then carries a care line. */
const HEAVY = /\b(sins?|sinned|sinners?|sinful|guilt|guilty|shame|ashamed|afraid|fears?|feared|frightened|death|dead|die|died|dies|dying|grief|doubts?|doubted|doubting)\b/i;

/** Pressure has no place in a session: no formula prayer, no deadline, no fear as a lever. */
const PRESSURE = /\b(pray this prayer|repeat (this|these words) after|sinner['’]s prayer|before it is too late|before it's too late|don['’]t wait another|accept (jesus|christ|him) (today|now|right now)|if you died tonight|are you sure you are saved)\b/i;

/** Signposting the voice standard refuses. */
const SIGNPOST = /\b(here is what i mean|here's what i mean|let me explain|let me be clear|in this session we will|in this session you will learn|as we will see)\b/i;

/** The teaching speaks to "you" or in the third person, never as James. */
const FIRST_PERSON = /(^|[^A-Za-z’'])(I|I['’]m|I['’]ve|I['’]d|I['’]ll|my|me|mine|myself)(?![A-Za-z’'])/;

const DOUBLE_QUOTED = /“([^”]+)”/g;
const words = (s) => (typeof s === "string" ? s.split(/\s+/).filter(Boolean).length : 0);
const isStr = (s) => typeof s === "string" && s.trim().length > 0;

export function trackFiles(dir = TRACKS_DIR) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith(".json") && f !== INDEX_FILE).sort();
}

export function readTrack(file, dir = TRACKS_DIR) {
  return JSON.parse(readFileSync(join(dir, file), "utf8"));
}

/** The road ids of /start (client/src/lib/startRoad.json), in the page's order. */
export function roadIds() {
  return JSON.parse(readFileSync(join(ROOT, "client/src/lib/startRoad.json"), "utf8")).roads.map((r) => r.id);
}

/** The index the pages read: every track, in the order of the roads on /start. */
export function buildIndex(dir = TRACKS_DIR) {
  const order = roadIds();
  const rank = (t) => (order.includes(t.road) ? order.indexOf(t.road) : order.length);
  const tracks = trackFiles(dir)
    .map((f) => readTrack(f, dir))
    .sort((a, b) => rank(a) - rank(b) || String(a.title).localeCompare(String(b.title)))
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      for: t.for,
      road: t.road ?? null,
      subtitle: t.subtitle,
      // "About N minutes each": the sessions' average, to the nearest five.
      minutes: Math.round(t.sessions.reduce((n, s) => n + s.minutes, 0) / t.sessions.length / 5) * 5,
      leader: !!t.leader,
      kinds: [...new Set(t.sessions.flatMap((s) => [s.open, ...(s.also ?? [])].map((l) => l.kind)))].sort(),
      sessions: t.sessions.map((s) => ({ n: s.n, title: s.title, minutes: s.minutes, kind: s.open.kind, opens: s.open.label })),
    }));
  return { tracks };
}

export const indexText = (dir = TRACKS_DIR) => JSON.stringify(buildIndex(dir), null, 2) + "\n";

/** Every paragraph of the Study Bible's plain-words notes that names Find Help: the care lines a track may reuse. */
let careText = null;
function careSource() {
  if (careText !== null) return careText;
  const notes = join(ROOT, "client/public/bible/notes");
  const out = [];
  for (const book of readdirSync(notes)) {
    const plain = join(notes, book, "plain");
    if (!existsSync(plain)) continue;
    for (const f of readdirSync(plain)) {
      const text = readFileSync(join(plain, f), "utf8");
      if (!text.includes("Find Help")) continue;
      for (const p of JSON.parse(text).passages ?? [])
        for (const v of Object.values(p)) if (typeof v === "string" && v.includes("Find Help")) out.push(...v.split("\n\n").filter((x) => x.includes("Find Help")));
    }
  }
  careText = out.join("\n\n");
  return careText;
}

/**
 * Every problem in one track, as "where: what". An empty list is a clean track.
 */
export function validateTrack(t, slug) {
  const errors = [];
  const fail = (w, m) => errors.push(`${slug}${w ? `.${w}` : ""}: ${m}`);
  const shelf = loadEssayShelf();

  /** Prose a reader sees: the voice rules, and Scripture quoted exactly with its reference. */
  function prose(w, text, min, max, { firstPerson = true } = {}) {
    if (!isStr(text)) return fail(w, "missing");
    const n = words(text);
    if (n < min || n > max) fail(w, `${n} words, needs ${min} to ${max}`);
    // A quotation in double marks is Scripture: followed by its reference, and word for word.
    for (const m of text.matchAll(DOUBLE_QUOTED)) {
      const after = text.slice(m.index + m[0].length);
      const ref = after.match(/^[,.]?\s*\(([^)]+)\)/);
      if (!ref) {
        fail(w, `double quotation marks are for Scripture with its reference in brackets after it: “${m[1].slice(0, 50)}”`);
        continue;
      }
      const cited = ref[1].replace(/^(see|compare)\s+/i, "");
      if (!readRef(cited)) fail(w, `cannot read the reference "${ref[1]}"`);
      else if (!quotesPassage(m[1], cited)) fail(w, `not word for word from the Berean Standard Bible at ${cited}: “${m[1].slice(0, 50)}”`);
    }
    const outside = text.replace(DOUBLE_QUOTED, " ");
    const hit = [...setAsideAllowed(outside).matchAll(forbiddenRe)][0];
    if (hit) fail(w, `forbidden language "${hit[1]}"`);
    if (/[—―]/.test(outside)) fail(w, "em-dash");
    if (outside.includes("!")) fail(w, "exclamation point outside quoted Scripture");
    if (SIGNPOST.test(outside)) fail(w, `signposting ("${outside.match(SIGNPOST)[0]}")`);
    if (PRESSURE.test(text)) fail(w, `pressure ("${text.match(PRESSURE)[0]}")`);
    if (firstPerson && FIRST_PERSON.test(outside)) fail(w, "first person: a track speaks to the reader, never as James");
    if (/\b\d{3}[-. ]\d{3,4}\b|\b(988|911|999)\b/.test(outside)) fail(w, "a phone number: name Find Help, which keeps the numbers");
  }

  function link(w, l) {
    if (!l || typeof l !== "object") return fail(w, "missing");
    if (!KINDS[l.kind]) return fail(w, `unknown kind "${l.kind}" (one of ${Object.keys(KINDS).join(", ")})`);
    prose(`${w}.label`, l.label, 1, 14, { firstPerson: false });
    prose(`${w}.why`, l.why, 8, 45);
    if (!isStr(l.href)) return fail(w, "needs an href");
    if (!KINDS[l.kind].match.test(l.href)) fail(w, `${l.href} is not an address of kind "${l.kind}"`);
    const r = resolveHref(l.href);
    if (r.status === "missing") fail(w, `${l.href} does not exist`);
    else if (r.status === "redirect") fail(w, `${l.href} redirects to ${r.to}: link the page it lands on`);
    else if (r.status !== "ok") fail(w, `${l.href} cannot be checked against the site's pages`);
    const essay = l.href.match(/^\/writing\/([^/?#]+)/);
    if (essay && !shelf.isPublic(decodeURIComponent(essay[1]))) fail(w, `${l.href} is not a public essay`);
  }

  if (t.slug !== slug) fail("slug", "does not match the file name");
  if (!/^[a-z0-9-]+$/.test(slug)) fail("slug", "lowercase letters, digits and hyphens only");
  prose("title", t.title, 1, 8);
  prose("for", t.for, 2, 12, { firstPerson: false });
  if (t.road != null && !roadIds().includes(t.road)) fail("road", `"${t.road}" is not a road on /start`);
  if (!isStr(t.subtitle) || t.subtitle.length < 80 || t.subtitle.length > 240) fail("subtitle", "needs 80 to 240 characters");
  else prose("subtitle", t.subtitle, 10, 50);
  if (!Array.isArray(t.intro) || t.intro.length < 1 || t.intro.length > 3) fail("intro", "one to three paragraphs");
  else t.intro.forEach((p, i) => prose(`intro[${i}]`, p, 25, 130));

  if (!Array.isArray(t.sessions) || t.sessions.length < 4 || t.sessions.length > 16) {
    fail("sessions", "needs 4 to 16 sessions");
    return errors;
  }
  const kinds = new Set();
  t.sessions.forEach((s, i) => {
    const w = `sessions[${i}]`;
    if (!s || typeof s !== "object") return fail(w, "missing");
    if (s.n !== i + 1) fail(w, `n should be ${i + 1}`);
    prose(`${w}.title`, s.title, 1, 10);
    if (!Number.isInteger(s.minutes) || s.minutes < 5 || s.minutes > 20) fail(`${w}.minutes`, "a whole number of minutes from 5 to 20");
    link(`${w}.open`, s.open);
    if (s.open?.kind) kinds.add(s.open.kind);
    if (s.also !== undefined) {
      if (!Array.isArray(s.also) || s.also.length > 3) fail(`${w}.also`, "at most three more places to go");
      else
        s.also.forEach((l, j) => {
          link(`${w}.also[${j}]`, l);
          if (l?.kind) kinds.add(l.kind);
        });
    }
    if (!Array.isArray(s.teaching) || s.teaching.length < 1 || s.teaching.length > 2) fail(`${w}.teaching`, "one or two short paragraphs");
    else s.teaching.forEach((p, j) => prose(`${w}.teaching[${j}]`, p, 40, 150));

    prose(`${w}.question`, s.question, 5, 45, { firstPerson: false });
    if (isStr(s.question) && !s.question.trim().endsWith("?")) fail(`${w}.question`, "should be one question");
    prose(`${w}.do`, s.do, 8, 60);

    // One verse to keep: the reference, and the words exactly as the BSB has them.
    const v = s.verse;
    if (!v || !isStr(v.ref) || !isStr(v.text)) fail(`${w}.verse`, "needs a ref and its text");
    else if (!readRef(v.ref)) fail(`${w}.verse`, `cannot read the reference "${v.ref}"`);
    else {
      if (!quotesPassage(v.text, v.ref) || /\.\.\.|…/.test(v.text)) fail(`${w}.verse`, `not word for word from the Berean Standard Bible at ${v.ref}`);
      if (words(v.text) > 60) fail(`${w}.verse`, "too long to keep: 60 words at most");
      if (/[—―]/.test(v.ref)) fail(`${w}.verse`, "em-dash in the reference");
    }

    // The group guide: an opening question, three to discuss, and a prompt for prayer (never words to recite).
    const g = s.group;
    if (!g || typeof g !== "object") fail(`${w}.group`, "missing");
    else {
      prose(`${w}.group.open`, g.open, 5, 40, { firstPerson: false });
      if (isStr(g.open) && !g.open.trim().endsWith("?")) fail(`${w}.group.open`, "should be a question");
      if (!Array.isArray(g.discuss) || g.discuss.length !== 3) fail(`${w}.group.discuss`, "exactly three questions");
      else
        g.discuss.forEach((q, j) => {
          prose(`${w}.group.discuss[${j}]`, q, 6, 55, { firstPerson: false });
          if (isStr(q) && !q.trim().endsWith("?")) fail(`${w}.group.discuss[${j}]`, "should be a question");
        });
      prose(`${w}.group.pray`, g.pray, 10, 60);
      if (isStr(g.pray) && (/[“”"]/.test(g.pray) || /\bamen\b/i.test(g.pray) || /^(dear|lord|father|god|jesus)\b[, ]/i.test(g.pray.trim())))
        fail(`${w}.group.pray`, "a prompt for prayer in the group's own words, never a prayer to recite");
    }

    // Care: where a session touches sin, guilt, fear, death or doubt, a care line from the notes, whole.
    // The session's own words: its teaching, what it asks, its verse and its group guide (a link's line only points elsewhere).
    const all = JSON.stringify([s.title, s.teaching, s.question, s.do, s.verse, s.group]);
    const heavy = all.match(HEAVY);
    if (s.care !== undefined) {
      if (!Array.isArray(s.care) || s.care.length < 1 || s.care.length > 2) fail(`${w}.care`, "one or two care lines, as a list");
      else
        s.care.forEach((c, j) => {
          const cw = `${w}.care[${j}]`;
          if (!isStr(c)) return fail(cw, "empty");
          if (!c.includes("Find Help")) fail(cw, "names Find Help");
          if (!careSource().includes(c) || !/^[A-Z“]/.test(c) || !/[.”]$/.test(c)) fail(cw, "a care line is reused whole from the Study Bible's plain-words notes, not written new");
          if (/\b\d{3}[-. ]\d{3,4}\b|\b(988|911|999)\b/.test(c)) fail(cw, "a phone number");
        });
    } else if (heavy) fail(`${w}.care`, `the session touches "${heavy[0]}" and carries no care line`);
  });

  if (kinds.size < MIN_KINDS) fail("sessions", `uses ${kinds.size} kinds of page (${[...kinds].join(", ")}); a track uses at least ${MIN_KINDS}, so the tools get used`);

  // The leader's guide, when there is one: the same voice rules, every part in order, and the way to Find Help named.
  if (t.leader !== undefined) {
    const L = t.leader;
    if (!L || typeof L !== "object") fail("leader", "missing");
    else {
      if (!Array.isArray(L.about) || L.about.length < 1 || L.about.length > 3) fail("leader.about", "one to three paragraphs");
      else L.about.forEach((p, i) => prose(`leader.about[${i}]`, p, 25, 150));
      const parts = Array.isArray(L.sections) ? L.sections : [];
      if (JSON.stringify(parts.map((x) => x?.id)) !== JSON.stringify(LEADER_SECTIONS)) fail("leader.sections", `the parts are ${LEADER_SECTIONS.join(", ")}, in that order`);
      parts.forEach((x, i) => {
        const w = `leader.sections[${i}]`;
        if (!x || typeof x !== "object") return fail(w, "missing");
        prose(`${w}.title`, x.title, 1, 10);
        if (!Array.isArray(x.body) || x.body.length < 1 || x.body.length > 3) fail(`${w}.body`, "one to three paragraphs");
        else x.body.forEach((p, j) => prose(`${w}.body[${j}]`, p, 15, 160));
        if (x.id === "order") {
          if (!Array.isArray(x.steps) || x.steps.length < 4 || x.steps.length > 8) fail(`${w}.steps`, "four to eight steps, in order");
          else x.steps.forEach((p, j) => prose(`${w}.steps[${j}]`, p, 5, 50));
        } else if (x.steps !== undefined) fail(`${w}.steps`, "only the order of a meeting has steps");
        if (x.id === "help" && !(x.body ?? []).some((p) => typeof p === "string" && p.includes("Find Help"))) fail(`${w}.body`, "names Find Help");
      });
    }
  }
  return errors;
}

/** The whole library and its index: every problem, as text. */
export function validateLibrary(dir = TRACKS_DIR) {
  const errors = [];
  const files = trackFiles(dir);
  if (!files.length) errors.push(`${dir}: no tracks`);
  for (const f of files) {
    const slug = f.replace(/\.json$/, "");
    let t;
    try {
      t = readTrack(f, dir);
    } catch (e) {
      errors.push(`${f}: ${e.message}`);
      continue;
    }
    try {
      errors.push(...validateTrack(t, slug));
    } catch (e) {
      errors.push(`${slug}: ${e.message}`);
    }
  }
  if (!errors.length) {
    const index = join(dir, INDEX_FILE);
    if (!existsSync(index) || readFileSync(index, "utf8") !== indexText(dir)) errors.push(`${INDEX_FILE}: out of date: run node scripts/build-tracks-index.mjs`);
  }
  return { files, errors };
}
