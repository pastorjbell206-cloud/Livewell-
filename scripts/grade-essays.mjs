#!/usr/bin/env node
/**
 * grade-essays.mjs — score every in-scope essay against the scholarly bar in
 * docs/rewrites/STANDARD.md and write the rewrite queue.
 *
 * Read-only over the content. The signals are proxies, not a verdict: an essay
 * can name six scholars and still be shallow. They exist to order the work
 * (weakest first) and to find near-duplicates that should become one deeper
 * essay instead of two thin ones. Every rewrite is still read in full.
 *
 * Scope: the static essay library minus the essays moved to PCN and minus the
 * pastoral-ministry pillar (set aside by James, 24 Sept 2026).
 *
 * Output: docs/rewrites/INVENTORY.md (human) and docs/rewrites/inventory.json.
 * Run: node scripts/grade-essays.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => JSON.parse(readFileSync(path.join(ROOT, rel), "utf8"));

// Named thinkers whose presence signals engaged scholarship. Surnames only where
// unambiguous; the list errs toward theology, church history, sociology of
// religion, philosophy, and the secular critics the platform writes toward.
const SCHOLARS = [
  "Augustine", "Aquinas", "Athanasius", "Irenaeus", "Chrysostom", "Tertullian", "Origen", "Justin Martyr", "Cyprian", "Basil", "Gregory of Nyssa", "Gregory of Nazianzus", "Ambrose", "Jerome", "Benedict", "Anselm", "Bernard of Clairvaux", "Julian of Norwich", "Luther", "Calvin", "Zwingli", "Cranmer", "Tyndale", "Wesley", "Jonathan Edwards", "Whitefield", "Spurgeon", "Kuyper", "Bavinck", "Warfield", "Hodge",
  "Bonhoeffer", "Barth", "Brunner", "Tillich", "Niebuhr", "Moltmann", "Pannenberg", "Balthasar", "Ratzinger", "Rahner", "Lewis", "Chesterton", "Tolkien", "Sayers", "Stott", "Packer", "Schaeffer", "Newbigin", "Hauerwas", "Willimon", "Wolterstorff", "Plantinga", "Volf", "Keller", "Brueggemann", "Peterson", "N. T. Wright", "N.T. Wright", "Hays", "Bauckham", "Hurtado", "Pelikan", "Wilken", "Chadwick", "Noll", "Marsden", "Kidd", "Du Mez", "Whitehead", "Perry", "Gorski", "James Davison Hunter", "Hunter", "Trueman", "MacIntyre", "Rieff", "Charles Taylor", "Taylor", "James K. A. Smith", "James K.A. Smith", "Bellah", "Putnam", "Haidt", "Christian Smith", "Denton", "Stark", "Kreider", "Cavanaugh", "Leithart", "Tom Holland", "Larry Hurtado", "Rodney Stark", "Wendell Berry", "Postman", "Lasch", "Sandel", "Arendt", "Tocqueville", "Weber", "Durkheim", "Kierkegaard", "Pascal", "Dostoevsky", "Solzhenitsyn", "Nietzsche", "Hume", "Marx", "Freud", "Feuerbach", "Russell", "Camus", "Sartre", "Dawkins", "Hitchens", "Sam Harris", "Dennett", "Wilcox", "Cherlin", "Twenge", "Eberstadt", "Mary Eberstadt", "Kass", "Berger", "Lesslie Newbigin", "Dietrich Bonhoeffer", "Martin Luther King", "King Jr", "Howard Thurman", "Cone", "Jemar Tisby", "Mark Noll", "George Marsden", "Stanley Hauerwas", "Alasdair MacIntyre", "Wilberforce", "Wilken", "Bebbington", "Hatch", "Butler", "Gutiérrez", "Yoder", "Hengel", "Sanders", "Dunn", "Ehrman", "Craig", "Swinburne", "Polkinghorne", "McGrath", "Lennox", "Collins", "Wolterstorff", "Oliver O'Donovan", "O'Donovan", "Jenkins", "Philip Jenkins", "Walls", "Andrew Walls", "Sanneh", "Lamin Sanneh", "Boethius", "Dante", "Milton", "Herbert", "Donne", "Hopkins", "Flannery O'Connor", "Marilynne Robinson", "Weil", "Simone Weil", "Merton", "Nouwen", "Willard", "Foster",
];
const scholarRes = [...new Set(SCHOLARS)].map((n) => [n, new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`)]);

const FORBIDDEN = /\b(delve\w*|leverag\w*|unlock\w*|transformative|navigat\w*|tapestry|foster(?!\s+care)\w*|unpack\w*|landscape\w*|nuanced|multifaceted|authentic\w*|journey\w*|holistic)\b/gi;
const CLICHE = /\b(in today.s world|now more than ever|here.s the thing|I want to be real with you|God.s got this|lean into|hold space|do the work|your truth|showing up|at the end of the day|game[- ]changer|the bottom line|let that sink in|read that again|it.s not about|hear me|let me be clear|here is what I mean|let me explain|make no mistake|the truth is|the reality is|the good news is|you are not alone|this changes everything|buckle up)\b/gi;
const HEDGE = /\b(it could be argued|in many ways|perhaps|arguably|to some extent|in a sense|some would say|many believe)\b/gi;
const VAGUE = /\b(studies show|research shows|research consistently|experts say|statistics show|surveys show|according to research|Barna research|recent studies)\b/gi;
const SCRIPTURE = /\b(?:[1-3]\s)?(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of Songs|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation)\s+\d+:\d+/g;
const YEAR = /\b(1[0-9]{3}|20[0-2][0-9]|[1-9][0-9]{2})\b(?!\s*(?:words|minutes|people|years|percent|%|million|thousand|pastors|churches))/g;

const count = (re, s) => { re.lastIndex = 0; return (String(s).match(re) || []).length; };
const words = (s) => String(s || "").split(/\s+/).filter(Boolean);
const sentences = (s) => String(s || "").replace(/^#.*$/gm, "").split(/(?<=[.?!])\s+(?=[A-Z"“])/).map((x) => x.trim()).filter((x) => x.length > 1);

/** A title looks machine-made if it is slug-cased, numbered, or has a stray lowercase function word first. */
export function titleProblems(title) {
  const t = String(title || "");
  const out = [];
  if (/^\d+[\s.-]/.test(t)) out.push("numbered");
  if (/\b(Cant|Dont|Wont|Isnt|Its Okay|Youre|Theyre|Doesnt)\b/.test(t)) out.push("missing apostrophe");
  if (/\s[a-z]+\s[A-Z]/.test(t) && /\b(why|what|how|when|who)\b/.test(t)) out.push("slug-cased");
  if (t.length > 72) out.push("long");
  if (/[:—–-]\s/.test(t) && t.split(/[:—–-]\s/)[0].split(" ").length <= 2) out.push("label prefix");
  return out;
}

export function measure(r) {
  const body = String(r.body || "");
  const w = words(body).length;
  const per1k = (n) => +(n / Math.max(w, 1) * 1000).toFixed(2);
  const scholars = scholarRes.filter(([, re]) => re.test(body)).map(([n]) => n);
  const years = new Set((body.match(YEAR) || []).filter((y) => +y >= 30 && +y <= 2026));
  const sents = sentences(body);
  const shortSents = sents.filter((s) => words(s).length <= 5).length;
  const firstPerson = count(/\b(I|I'm|I've|my|me)\b/g, body);
  const m = {
    words: w,
    scholars: new Set(scholars).size,
    scholarNames: [...new Set(scholars)].slice(0, 8),
    years: years.size,
    scripture: count(SCRIPTURE, body),
    headings: count(/^#{2,4}\s/gm, body),
    forbidden: count(FORBIDDEN, body),
    cliche: count(CLICHE, body),
    hedges: count(HEDGE, body),
    vague: count(VAGUE, body),
    fragmentRate: +(shortSents / Math.max(sents.length, 1)).toFixed(3),
    firstPerK: per1k(firstPerson),
    titleProblems: titleProblems(r.title),
  };
  // Depth score, 0 to 100. Weighted toward what the standard asks for: length
  // to develop an argument, named witnesses, dated history, Scripture read in
  // context, and the absence of tics.
  let s = 0;
  s += Math.min(m.words / 3500, 1) * 25;
  s += Math.min(m.scholars / 6, 1) * 25;
  s += Math.min(m.years / 5, 1) * 15;
  s += Math.min(m.scripture / 4, 1) * 10;
  s += (m.fragmentRate <= 0.12 ? 10 : m.fragmentRate <= 0.2 ? 5 : 0);
  s += Math.max(0, 15 - 3 * (m.forbidden + m.cliche + m.hedges + 2 * m.vague));
  m.score = Math.round(s);
  return m;
}

/** Bag-of-words cosine over content words, for near-duplicate detection. */
const STOP = new Set("the a an and or but of to in on for with as at by from that this is are was were be been it its not no we you they he she i our your their his her them us me my what which who when where why how so if then than there here all any can will would should could do does did have has had just also into about more most one two very such only out up over after before because while".split(" "));
function vec(text) {
  const v = new Map();
  for (const t of String(text).toLowerCase().match(/[a-z]{4,}/g) || []) {
    if (STOP.has(t)) continue;
    v.set(t, (v.get(t) || 0) + 1);
  }
  return v;
}
function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (const [k, x] of a) { na += x * x; const y = b.get(k); if (y) dot += x * y; }
  for (const [, y] of b) nb += y * y;
  return dot / Math.sqrt(na * nb || 1);
}

function main() {
  const lib = read("content/static-library.generated.json");
  const moved = new Set(read("content/pcn-moved.json").slugs);
  const redirected = new Set(read("vercel.json").redirects.map((r) => String(r.source).replace(/^\/writing\//, "")).filter((s) => !s.startsWith("/")));
  const rewritten = new Set(existsSync(path.join(ROOT, "content/rewrites")) ? readdirSync(path.join(ROOT, "content/rewrites")).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")) : []);
  const scope = lib.filter((r) => r && r.slug && !moved.has(r.slug) && r.pillar !== "pastoral-ministry" && r.published !== false);

  const rows = scope.map((r) => ({ slug: r.slug, title: r.title, pillar: r.pillar, redirected: redirected.has(r.slug), rewritten: rewritten.has(r.slug), ...measure(r) }));

  // Near-duplicates: pairs whose bodies share most of their content vocabulary.
  const vecs = scope.map((r) => vec(`${r.title} ${r.title} ${r.body}`));
  const pairs = [];
  for (let i = 0; i < scope.length; i++) for (let j = i + 1; j < scope.length; j++) {
    const c = cosine(vecs[i], vecs[j]);
    if (c >= 0.62) pairs.push({ a: scope[i].slug, b: scope[j].slug, cos: +c.toFixed(3) });
  }
  pairs.sort((x, y) => y.cos - x.cos);

  // Verdicts. "keep" is not "done": it means the essay already clears the proxy
  // bar and is read last. Everything else is rewritten, weakest first.
  for (const r of rows) {
    r.verdict = r.rewritten ? "rewritten" : r.score >= 70 && r.titleProblems.length === 0 ? "keep-review" : "rewrite";
  }
  rows.sort((a, b) => a.score - b.score);

  const out = path.join(ROOT, "docs/rewrites");
  mkdirSync(out, { recursive: true });
  writeFileSync(path.join(out, "inventory.json"), JSON.stringify({ generatedAt: new Date().toISOString(), rows, pairs }, null, 1) + "\n");

  const byVerdict = rows.reduce((m, r) => ((m[r.verdict] = (m[r.verdict] || 0) + 1), m), {});
  const byPillar = {};
  for (const r of rows) { byPillar[r.pillar] ??= { n: 0, rewrite: 0, score: 0 }; byPillar[r.pillar].n++; byPillar[r.pillar].score += r.score; if (r.verdict === "rewrite") byPillar[r.pillar].rewrite++; }
  const md = [
    "# Essay inventory against the scholarly bar",
    "",
    "Generated by `scripts/grade-essays.mjs`. The standard is `docs/rewrites/STANDARD.md`. Scores are proxies used to order the work, weakest first; every rewrite is read in full.",
    "",
    `In scope: ${rows.length} essays (the library minus the essays moved to PCN and the pastoral-ministry pillar).`,
    "",
    "| Verdict | Essays |",
    "|---|---|",
    ...Object.entries(byVerdict).map(([k, v]) => `| ${k} | ${v} |`),
    "",
    "| Pillar | Essays | To rewrite | Mean score |",
    "|---|---|---|---|",
    ...Object.entries(byPillar).sort((a, b) => b[1].n - a[1].n).map(([p, v]) => `| ${p} | ${v.n} | ${v.rewrite} | ${Math.round(v.score / v.n)} |`),
    "",
    `## Near-duplicates (${pairs.length} pairs at cosine 0.62 or above)`,
    "",
    "Candidates to merge into one deeper essay, the weaker slug redirecting to the stronger.",
    "",
    "| Essay A | Essay B | Similarity |",
    "|---|---|---|",
    ...pairs.slice(0, 80).map((p) => `| ${p.a} | ${p.b} | ${p.cos} |`),
    "",
    "## Every essay, weakest first",
    "",
    "| Score | Slug | Pillar | Words | Scholars | Years | Scripture | Tics | Title problems | Redirected | Verdict |",
    "|---|---|---|---|---|---|---|---|---|---|---|",
    ...rows.map((r) => `| ${r.score} | ${r.slug} | ${r.pillar} | ${r.words} | ${r.scholars} | ${r.years} | ${r.scripture} | ${r.forbidden + r.cliche + r.hedges + r.vague} | ${r.titleProblems.join(", ")} | ${r.redirected ? "yes" : ""} | ${r.verdict} |`),
    "",
  ].join("\n");
  writeFileSync(path.join(out, "INVENTORY.md"), md);
  console.log(`[grade] ${rows.length} essays: ${Object.entries(byVerdict).map(([k, v]) => `${v} ${k}`).join(", ")}; ${pairs.length} near-duplicate pairs`);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
