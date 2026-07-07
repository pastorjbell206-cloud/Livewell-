#!/usr/bin/env node
/**
 * build-essay-volumes.mjs — LiveWell by James Bell
 *
 * Gathers every standalone essay (from the code-shipped article libraries) that
 * is NOT already a chapter in one of James's 22 authored books, groups them into
 * themed volumes by topic, and writes each volume as a readable book
 * (client/public/books/<slug>.json) plus an entry in books/index.json. Each
 * essay becomes a chapter. Volumes render at /read/:slug via BookReader.
 *
 * Deterministic: keyword scoring constrained by each essay's pillar, so the
 * grouping is reproducible and reviewable. Run with --write to emit files;
 * default is a dry-run report.
 *
 * SAFETY:
 *  - Never touches the 22 authored books (only writes VOLUME_SLUGS files and
 *    their index entries; preserves every other index entry).
 *  - Skips any essay whose body still contains an unresolved "[cite" placeholder
 *    (no fabricated-looking citations go into a book).
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BOOKS_DIR = join(ROOT, "client/public/books");
const INDEX = join(BOOKS_DIR, "index.json");
const WRITE = process.argv.includes("--write");

// ── Themed volumes: slug, title, subtitle, blurb, pillar, and the keywords that
//    pull an essay in. Order matters — first strong match wins within a pillar. ──
const VOLUMES = [
  // ── Integrated Life → marriage, split fine ──
  { slug: "essays-marriage-covenant-roles", title: "Marriage: Covenant & Roles", pillar: "Integrated Life",
    subtitle: "What marriage actually is, and how two people lead and serve",
    blurb: "Essays on the shape of marriage — covenant rather than contract, one flesh, headship and submission read honestly, and two people learning to lead and serve each other.",
    kw: ["covenant vs","covenant marriage","one flesh","submission","ephesians 5","servant leadership vs","leading and serving","what marriage actually is","theology of covenant"] },
  { slug: "essays-marriage-communication-conflict", title: "Marriage: Communication & Conflict", pillar: "Integrated Life",
    subtitle: "Fighting well, forgiving, and repairing what broke",
    blurb: "Essays on the daily work of staying married — communication that works, fighting fair, forgiveness and repair, rebuilding trust, and the friendship a marriage can quietly lose.",
    kw: ["communication","fighting fair","fighting well","conflict","forgiveness and repair","forgiveness in marriage","trust has been broken","lost its friendship","gratitude when","emotionally absent","one spouse grows","five-year"] },
  { slug: "essays-marriage-sex-intimacy", title: "Marriage: Sex & Intimacy", pillar: "Integrated Life",
    subtitle: "Intimacy as theology, honestly",
    blurb: "Essays on sex and intimacy in a Christian marriage — intimacy as theology, and the honest conversation about the sexless marriage nobody names.",
    kw: ["intimacy","sexual intimacy","sexless marriage","sex and","song of solomon","about desire"] },
  { slug: "essays-marriage-crisis-repair", title: "Marriage: Crisis & Rebuilding", pillar: "Integrated Life",
    subtitle: "Affairs, addiction, divorce, and starting again",
    blurb: "Essays for marriages in the hardest places — affair recovery, addiction, mental health and depression, when divorce is faithful, second marriages, blended families, and a spouse who has lost faith.",
    kw: ["affair","addiction","marriage and mental health","through depression","when divorce","second marriage","blended families","married doubter","spouse doesn't share","spouse doesn't","interfaith marriage","when your spouse"] },
  { slug: "essays-marriage-money-seasons", title: "Marriage: Money, Work & Seasons", pillar: "Integrated Life",
    subtitle: "In-laws, work, kids, and the long seasons",
    blurb: "Essays on the pressures that test a marriage over time — money, in-laws, the demands of work, the years after children, the empty nest, ministry, distance, and the men who quietly check out.",
    kw: ["money and marriage","in-laws","protecting your marriage","after children","after the kids","empty nest","survives ministry","military marriage","long-distance","across cultural","men and marriage","husbands check"] },
  // ── Integrated Life → parenting, split fine ──
  { slug: "essays-parenting-ages-stages", title: "Parenting: Ages & Stages", pillar: "Integrated Life",
    subtitle: "What each season of childhood actually needs",
    blurb: "Essays on raising children stage by stage — toddlers, the elementary years, the middle-school wilderness, teenagers, and the young adult who leaves, with the spiritual milestones to aim for at each age.",
    kw: ["toddler","elementary years","middle school","faith formation by age","what to aim for at each age","spiritual milestones","young adults","by age","high school","autonomy, doubt"] },
  { slug: "essays-parenting-discipline-character", title: "Parenting: Discipline & Character", pillar: "Integrated Life",
    subtitle: "Forming the heart, not just the behavior",
    blurb: "Essays on discipline and character — forming the heart rather than the behavior, letting children fail, raising the resilient and the unimpressive, and resisting the idol of the well-rounded child.",
    kw: ["discipline that","discipline without","letting them fail","resilient","being unimpressive","ordinary tuesday","sports","well-rounded"] },
  { slug: "essays-raising-kids-in-faith", title: "Raising Kids in the Faith", pillar: "Integrated Life",
    subtitle: "Handing on a faith worth keeping",
    blurb: "Essays on forming faith at home — teaching children to pray and read the Bible, raising kids who question rather than perform, family rhythms, and finding a church that will not wound them.",
    kw: ["raise children in the faith","raise kids","raising kids","teaching kids to pray","teaching your kids","read the bible","kids who question","the word made flesh in your kitchen","family rhythms","find a church","the question god asks first"] },
  { slug: "essays-parenting-hard-places", title: "Parenting the Hard Places", pillar: "Integrated Life",
    subtitle: "Prodigals, doubt, screens, and the crises nobody prepped you for",
    blurb: "Essays for the hardest parts of parenting — the prodigal, the child who doubts or walks away or comes out, special needs, single parenting, screens and phones, sex and identity, and grief.",
    kw: ["prodigal","child doubts","doubts or walks","comes out","calls you a hypocrite","special needs","single parenting","digital age","screen and phone","screens","sex and identity","daughters","death, grief","adoption theology","parenting through divorce","youth pastor who stopped","homeschool","education decision"] },
  { slug: "essays-manhood", title: "On Manhood", pillar: "Integrated Life",
    subtitle: "Anger, provision, and being a man who stays",
    blurb: "Essays on manhood from a man raised without a father and raising five sons — anger, provision, presence, crisis, and the men the church forgot to form.",
    kw: ["manhood","masculin","men and anger","men in crisis","the provider","fatherhood","raising sons","being a man","a man who","father wound","pornography","male friendship","the man who doesn't","man who doesn't go"] },
  { slug: "essays-womanhood", title: "On Womanhood", pillar: "Integrated Life",
    subtitle: "Identity, calling, and worth beyond the roles",
    blurb: "Essays on womanhood — identity, calling, motherhood, and worth that does not depend on a role or a season.",
    kw: ["womanhood","a woman","women","feminin","motherhood","stay-at-home parent","her worth","daughter"] },
  // ── Integrated Life → money/work ──
  { slug: "essays-money-stewardship", title: "On Money & Stewardship", pillar: "Integrated Life",
    subtitle: "Debt, generosity, and what Jesus meant by mammon",
    blurb: "Essays on money — debt, generosity, wealth, tithing, contentment, and what Jesus actually meant when he said you cannot serve God and mammon.",
    kw: ["money","finance","debt","generosity","giving","wealth","tithing","mammon","treasures in heaven","budget","contentment vs","serve god and money","stewardship"] },
  { slug: "essays-work-and-vocation", title: "On Work & Vocation", pillar: "Integrated Life",
    subtitle: "Calling and the God of the ordinary job",
    blurb: "Essays on work as calling — vocation, career, ambition, entrepreneurship, faith at a job nobody shares, and the sacredness of ordinary labor.",
    kw: ["theology of work","vocation","work as calling","god's will for your career","career","when you hate your job","faith at work","entrepreneurship","provider trap","ambition"] },
  // ── Integrated Life → interior life ──
  { slug: "essays-on-prayer", title: "On Prayer", pillar: "Integrated Life",
    subtitle: "How to pray when you do not feel like it",
    blurb: "Essays on prayer — praying when the feeling does not come, the Lord's Prayer, confession, the tired person's prayer, and the prayer you cannot finish.",
    kw: ["prayer","pray","lord's prayer","amen is not","confession out loud","the bread you ask","the last prayer","cannot finish","do not know what to pray","praying with your body"] },
  { slug: "essays-rest-and-sabbath", title: "On Rest & Sabbath", pillar: "Integrated Life",
    subtitle: "Silence, waiting, and a life that can be sustained",
    blurb: "Essays on rest — the sabbath you keep skipping, resting in a culture of exhaustion, silence, solitude, waiting, and the long obedience of ordinary faithfulness.",
    kw: ["sabbath","rest is not","rest in a culture","how to rest","silence","solitude","what waiting","long obedience","morning is a theology","the practice of beginning","habit that outlasts","anxiety","the body knows before","stillness is not","fast you did not choose","when the feeling does not come","nothing to bring","when god feels absent"] },
  { slug: "essays-faith-and-doubt", title: "On Faith & Doubt", pillar: "Integrated Life",
    subtitle: "Living honestly with the questions",
    blurb: "Essays for the doubting — doubt as a spiritual practice, living with permanent uncertainty, the dark night, and keeping the question inside the faith instead of leaving to keep it.",
    kw: ["doubt","dark night","permanent uncertainty","when the feeling does not come","when your family thinks","the grief that prays","when abuse hides"] },
  { slug: "essays-daily-devotionals", title: "Daily Devotionals", pillar: "Integrated Life",
    subtitle: "Short readings for an ordinary morning",
    blurb: "Short devotional readings for the ordinary mornings that make up most of a life with God.",
    kw: ["devotional","devotion","daily reading","advent","lent","holy week","a meditation on"] },
  // ── Theological Depth ──
  { slug: "essays-hard-questions", title: "Hard Questions", pillar: "Theological Depth",
    subtitle: "Honest answers for a skeptical age",
    blurb: "Essays answering the questions people actually ask — suffering and evil, hell, miracles, science, the reliability of the Bible, the hiddenness of God, and whether faith is reasonable at all.",
    kw: ["can a reasonable","can you trust the bible","can you actually trust","resurrection actually","science disprove","loving god send","so much suffering","why is there so much","feel so hidden","without evidence","one way among","okay to doubt","the problem with certainty","never heard","right and wrong even","why christianity","is god real","allow suffering","allow so much evil","historical jesus","hasn't the church done","miracles"] },
  { slug: "essays-core-doctrine", title: "On Core Doctrine", pillar: "Theological Depth",
    subtitle: "The great truths, explained without condescension",
    blurb: "Essays on the doctrines the church confesses — the Trinity, the gospel, grace, the reliability of Scripture, hell, and what Calvinists and Arminians are actually arguing about.",
    kw: ["trinity","the gospel actually","grace is not","inerrancy","calvinism and arminianism","about hell","what christians actually believe","doctrine"] },
  { slug: "essays-reading-scripture", title: "Reading Scripture Well", pillar: "Theological Depth",
    subtitle: "How to read the Bible without bending it",
    blurb: "Essays on reading the Bible — as one story rather than sixty-six books, without making it say what you want, and how individualism quietly changed the way we read.",
    kw: ["how to read the bible","one story, not","individualism changed the way we read","read the bible without","when scripture reads you"] },
  { slug: "essays-church-history", title: "On Church History & Traditions", pillar: "Theological Depth",
    subtitle: "The story you were born into",
    blurb: "Essays on the church's long memory — the councils and creeds, how Christianity became an empire and then became American, the mystics, and what the great traditions can teach each other.",
    kw: ["church history","reformation","nicaea","council","creed","crusade","awakening","the mystics","evangelicalism was","evangelicalism became","american christianity became american","christianity became an empire","indigenous","liturgical vs","what evangelicalism"] },
  { slug: "essays-biblical-theology", title: "On Biblical Theology", pillar: "Theological Depth",
    subtitle: "The whole Bible as one story that ends in Christ",
    blurb: "Essays tracing the Bible as one story climaxing in Christ — the kingdom of God, exodus, the image of God, and living between the already and the not yet.",
    kw: ["kingdom of god","biblical theology","exodus","one story","image of god","already and not yet","new creation"] },
  // ── Prophetic Disruption ──
  { slug: "essays-after-christendom", title: "After Christendom", pillar: "Prophetic Disruption",
    subtitle: "Faith after the church lost its cultural power",
    blurb: "Essays on the end of cultural Christianity — the death of Christendom, the rise of the nones, the early church under Rome, and what a faithful, exiled church looks like now.",
    kw: ["christendom is ending","death of christendom","the church after cultural power","rise of the nones","early church under rome","post-christian","why people are leaving","why young adults aren't","the church held captive"] },
  { slug: "essays-christian-nationalism", title: "The Church & the Nation", pillar: "Prophetic Disruption",
    subtitle: "Faith after the flag",
    blurb: "Essays on the church's captivity to the nation — Christian nationalism, flags in the sanctuary, render unto Caesar, the religious right, and loving a country without worshiping it.",
    kw: ["christian nationalism","flags in the sanctuary","render unto caesar","whose kingdom","religious right","politics replaced theology","loving and worshiping your country","culture war","two kingdoms","political power"] },
  { slug: "essays-deconstruction-church-hurt", title: "Deconstruction & Church Hurt", pillar: "Prophetic Disruption",
    subtitle: "Leaving, staying, and the wreckage in between",
    blurb: "Essays for the wounded and the deconstructing — exvangelicals, purity culture, religious trauma, spiritual abuse, the prosperity gospel, and how consumerism and screens quietly form us.",
    kw: ["deconstruction is not","exvangelical","purity culture","religious trauma","spiritual abuse","prosperity gospel","consumerism is a spiritual","formed by screens","outrage is not"] },
  // ── Prophetic Justice ──
  { slug: "essays-justice-and-the-poor", title: "Justice & the Poor", pillar: "Prophetic Justice",
    subtitle: "Mishpat, the poor at the gate, and the church's silence",
    blurb: "Essays on biblical justice — mishpat and tsedaqah, the poor and the stranger, the immigrant and the refugee, jubilee and debt, and the eye of the needle.",
    kw: ["biblical justice","mishpat","charity is not justice","is poverty political","jubilee","eye of the needle","wealth gap","poor and the stranger","immigrants and refugees","immigrant","the poor","individual sin and systemic","principalities and powers","complicity","consistent pro-life","disability","poverty tourism"] },
  { slug: "essays-race-and-the-church", title: "Race & the Church", pillar: "Prophetic Justice",
    subtitle: "The most segregated hour, honestly examined",
    blurb: "Essays on race and the church — the image of God against the lie of race, the black church, white evangelicalism, the most segregated hour, and what reconciliation actually requires.",
    kw: ["multiethnic church","image of god and the lie of race","the black church","most segregated","white evangelicalism and race","reconciliation","colonialism"] },
  { slug: "essays-church-reckonings", title: "The Church's Reckonings", pillar: "Prophetic Justice",
    subtitle: "Abuse, mental health, and the questions the church avoids",
    blurb: "Essays on the reckonings the church cannot avoid — the sexual abuse crisis, mental health handled badly, women in ministry, lament, and the prophets who made everyone uncomfortable.",
    kw: ["sexual abuse crisis","mental health and the church","how the church handles mental health","women in ministry","lament","prophets made everyone","megachurch model","toxic masculinity","why the church lost the culture"] },
  // ── Leadership Formation ──
  { slug: "essays-pastoral-health", title: "The Pastor's Own Soul", pillar: "Leadership Formation",
    subtitle: "Burnout, loneliness, and staying",
    blurb: "Essays for the pastor's own soul — burnout, loneliness, depression, the interior life, and the health that has to come before the work.",
    kw: ["burnout","pastoral health","loneliness","depression","interior life","shepherd needs","when the shepherd","the hidden life","bivocational"] },
  { slug: "essays-preaching-and-leading", title: "Preaching & Leading the Church", pillar: "Leadership Formation",
    subtitle: "The pulpit, the staff, and the revitalized church",
    blurb: "Essays on leading the church — preaching, staff and elders and deacons, church revitalization and planting, and the budget as a theology.",
    kw: ["preaching","preach","sermon","the pulpit","elder","deacon","staff","revitaliz","church plant","church budget","leadership team","discipleship"] },
];
const VOLUME_SLUGS = new Set(VOLUMES.map((v) => v.slug));

// Pillar -> its candidate volumes (for pillar-constrained scoring)
const byPillar = {};
for (const v of VOLUMES) { (byPillar[v.pillar] = byPillar[v.pillar] || []).push(v); }
// Fallback volume per pillar (when no keyword matches within the pillar)
const PILLAR_FALLBACK = {
  "Integrated Life": "essays-faith-and-doubt",
  "Theological Depth": "essays-core-doctrine",
  "Prophetic Disruption": "essays-after-christendom",
  "Prophetic Justice": "essays-justice-and-the-poor",
  "Leadership Formation": "essays-preaching-and-leading",
};
const LEGACY_TO_FALLBACKPILLAR = { // normalize odd pillar labels
  "Pastoral Ministry": "Leadership Formation",
  "The Table": "Leadership Formation",
  "After Christendom": "Prophetic Disruption",
};

function score(text, kws) { let s = 0; for (const k of kws) { if (text.includes(k)) s++; } return s; }

function classify(essay) {
  let pillar = (essay.pillar || "").trim();
  if (LEGACY_TO_FALLBACKPILLAR[pillar]) pillar = LEGACY_TO_FALLBACKPILLAR[pillar];
  const cands = byPillar[pillar] || VOLUMES; // in array order = priority
  const head = ((essay.title || "") + " " + (essay.slug || "").replace(/-/g, " ")).toLowerCase();
  const body = (essay.body || "").slice(0, 1500).toLowerCase();
  // 1) Title/slug is the strong signal: first volume (by priority) whose keyword
  //    appears in the title wins. This keeps "Marriage After Children" in Marriage.
  for (const v of cands) { if (v.kw.some((k) => head.includes(k))) return v.slug; }
  // 2) No title hit — fall back to body keyword scoring across the pillar.
  let best = null, bestScore = 0;
  for (const v of cands) { const sc = score(body, v.kw); if (sc > bestScore) { bestScore = sc; best = v; } }
  if (best) return best.slug;
  // 3) Nothing — the pillar's fallback volume.
  return PILLAR_FALLBACK[pillar] || cands[0].slug;
}

// ── Load all writing sources, dedup by slug, drop [cite] and book-chapter slugs ──
function load(p) { try { const j = JSON.parse(fs.readFileSync(join(ROOT, p), "utf8")); return Array.isArray(j) ? j : (j.articles || j.essays || j.posts || []); } catch { return []; } }
const sources = [
  "api/post-christian-articles.json", "api/integrated-life-articles.json",
  "api/womanhood-doubt-devotional-articles.json", "api/_data/article-library.json",
];
const dataDir = join(ROOT, "client/src/data/articles");
if (fs.existsSync(dataDir)) for (const f of fs.readdirSync(dataDir)) if (f.endsWith(".json")) sources.push("client/src/data/articles/" + f);

const W = new Map();
for (const s of sources) for (const a of load(s)) { if (a && a.slug && a.body && !W.has(a.slug)) W.set(a.slug, a); }

const idx = JSON.parse(fs.readFileSync(INDEX, "utf8"));
const existingBooks = idx.books || idx;
const bookChapterSlugs = new Set();
for (const b of existingBooks) { try { const bf = JSON.parse(fs.readFileSync(join(BOOKS_DIR, b.slug + ".json"), "utf8")); for (const ch of (bf.chapters || [])) if (ch.slug) bookChapterSlugs.add(ch.slug); } catch { /**/ } }

const hasCite = (b) => /\[cite/i.test(b || "");
let skippedCite = 0, alreadyInBook = 0;
const buckets = {}; for (const v of VOLUMES) buckets[v.slug] = [];
for (const a of W.values()) {
  if (bookChapterSlugs.has(a.slug)) { alreadyInBook++; continue; }
  if (hasCite(a.body)) { skippedCite++; continue; }
  buckets[classify(a)].push(a);
}

// Merge any too-small bucket into its pillar's fallback volume, so there are no
// 1-2 chapter "books" and no essay is dropped.
const MIN = 4;
for (const v of VOLUMES) {
  const b = buckets[v.slug];
  const fb = PILLAR_FALLBACK[v.pillar];
  if (b.length && b.length < MIN && fb && fb !== v.slug) { buckets[fb].push(...b); buckets[v.slug] = []; }
}

console.log(`Writings: ${W.size} unique | already in a book: ${alreadyInBook} | held back for [cite]: ${skippedCite}`);
console.log(`\nThemed volumes (${WRITE ? "WRITING" : "dry-run"}):`);
let totalCh = 0;
for (const v of VOLUMES) {
  const ch = buckets[v.slug]; totalCh += ch.length;
  console.log(`  ${String(ch.length).padStart(3)}  ${v.title}`);
}
console.log(`  ${String(totalCh).padStart(3)}  TOTAL chapters across ${VOLUMES.length} volumes`);

if (!WRITE) {
  console.log("\n(dry-run — pass --write to generate the book files. Sample of the biggest volume:)");
  const biggest = VOLUMES.map((v) => [v, buckets[v.slug]]).sort((a, b) => b[1].length - a[1].length)[0];
  console.log(`  ${biggest[0].title} (sample):`); for (const a of biggest[1].slice(0, 6)) console.log(`    - ${a.title}`);
  process.exit(0);
}

// ── Write the volume book files (the index is regenerated separately by
//    scripts/build-books-index.mjs, which scans every books/*.json). ──
let written = 0;
for (const v of VOLUMES) {
  const list = buckets[v.slug];
  if (list.length < 3) continue; // skip a near-empty volume
  list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  const chapters = list.map((a, i) => ({
    n: i + 1, slug: a.slug, title: a.title || a.slug,
    summary: a.excerpt || null, body: a.body,
  }));
  const book = { title: v.title, subtitle: v.subtitle, blurb: v.blurb, pillar: v.pillar, chapters };
  fs.writeFileSync(join(BOOKS_DIR, v.slug + ".json"), JSON.stringify(book, null, 2) + "\n");
  written++;
}
console.log(`\nWrote ${written} themed-volume book files. Now run: node scripts/build-books-index.mjs`);
