#!/usr/bin/env node
/**
 * survey-manuscripts.mjs
 *
 * Walks James's OneDrive, classifies every .docx by filename heuristics,
 * and emits a publish plan as JSON. NO database access; safe to run any
 * time. The plan is consumed by `publish-from-plan.mjs` once DATABASE_URL
 * is available.
 *
 * Output: scripts/publish-plan.json with per-file metadata:
 *   { path, kind, title, suggestedSlug, track, audience, format,
 *     priority, notes }
 *
 * Skips:
 *   - Files in /Z_Archive/ (legacy duplicates)
 *   - ~$ Word lock files
 *   - Versioned drafts when a "FINAL" / "Complete" / "FULL_MANUSCRIPT" exists
 *
 * Run:
 *   node scripts/survey-manuscripts.mjs
 *   node scripts/survey-manuscripts.mjs --include-archive
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = "C:/Users/pasto/OneDrive";
const OUTPUT = path.resolve("scripts/publish-plan.json");

const args = process.argv.slice(2);
const INCLUDE_ARCHIVE = args.includes("--include-archive");

// ── File classification ─────────────────────────────────────────────────

// Each rule has a matcher and a classification. First match wins.
const RULES = [
  // ── Substack-aligned lede tracks ──────────────────────────────────────
  {
    matches: f => /When.God.Bless.America/i.test(f),
    kind: "book",
    track: "after-christendom",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Monster.in.the.Mirror/i.test(f),
    kind: "book",
    track: "after-christendom",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Church.After.Christendom/i.test(f),
    kind: "book",
    track: "after-christendom",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Christianity.and.Political.Identity/i.test(f),
    kind: "book",
    track: "politics",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Blindness.of.the.Faithful/i.test(f),
    kind: "book",
    track: "after-christendom",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Third.Option/i.test(f),
    kind: "book",
    track: "politics",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Real.Jesus.and.His.Discontents/i.test(f),
    kind: "book",
    track: "doubt",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /What.If.W.?ere.Wrong/i.test(f),
    kind: "book",
    track: "doubt",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Misunderstanding.God/i.test(f),
    kind: "book",
    track: "theology",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /BELIEVE.Rational.Answers/i.test(f),
    kind: "book",
    track: "doubt",
    audience: "individuals",
    priority: 1,
  },
  // ── Marriage / parenting ───────────────────────────────────────────────
  {
    matches: f => /Honest.Marriage/i.test(f),
    kind: "book",
    track: "marriage",
    audience: "couples",
    priority: 2,
  },
  {
    matches: f => /Meaning.of.Marriage/i.test(f),
    kind: "book",
    track: "marriage",
    audience: "couples",
    priority: 2,
  },
  {
    matches: f => /Forming.Faith.in.Children/i.test(f),
    kind: "book",
    track: "parenting",
    audience: "individuals",
    priority: 2,
  },
  // ── Justice / prophetic ────────────────────────────────────────────────
  {
    matches: f => /Church.and.Race/i.test(f),
    kind: "book",
    track: "prophetic-justice",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Racial.Reconciliation/i.test(f),
    kind: "book",
    track: "prophetic-justice",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Stranger.and.the.Border/i.test(f),
    kind: "book",
    track: "prophetic-justice",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Forgiveness.*Justice/i.test(f),
    kind: "book",
    track: "prophetic-justice",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Suffering.*Faithfulness/i.test(f) || /Suffering.*Silence/i.test(f),
    kind: "book",
    track: "theology",
    audience: "individuals",
    priority: 2,
  },
  // ── Apologetics / skeptic / doubt ──────────────────────────────────────
  {
    matches: f => /Deconstruction.of.Faith/i.test(f),
    kind: "book",
    track: "doubt",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Christian.and.the.Skeptic/i.test(f),
    kind: "book",
    track: "doubt",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Apologetics.*Existence.*God/i.test(f),
    kind: "book",
    track: "doubt",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Reliability.of.Scripture/i.test(f),
    kind: "book",
    track: "theology",
    audience: "individuals",
    priority: 1,
  },
  {
    matches: f => /Doctrine.of.Hell/i.test(f),
    kind: "book",
    track: "theology",
    audience: "individuals",
    priority: 2,
  },
  {
    matches: f => /End.Times.*People.of.God/i.test(f),
    kind: "book",
    track: "theology",
    audience: "individuals",
    priority: 2,
  },
  // ── Pastoral / PCN ────────────────────────────────────────────────────
  {
    matches: f => /Pastors?.Survival.Guide/i.test(f),
    kind: "book",
    track: "pastoral-ministry",
    audience: "pastors",
    priority: 2,
  },
  {
    matches: f => /Pastoral.Sustainability/i.test(f),
    kind: "book",
    track: "pastoral-ministry",
    audience: "pastors",
    priority: 2,
  },
  {
    matches: f => /Spiritual.Abuse.*Authority/i.test(f),
    kind: "book",
    track: "pastoral-ministry",
    audience: "pastors",
    priority: 2,
  },
  {
    matches: f => /Case.for.Staying/i.test(f),
    kind: "book",
    track: "pastoral-ministry",
    audience: "pastors",
    priority: 2,
  },
  {
    matches: f => /10.Rules.of.Revitalization/i.test(f),
    kind: "book",
    track: "pastoral-ministry",
    audience: "pastors",
    priority: 2,
  },
  {
    matches: f => /^Book\d+_/.test(path.basename(f)),
    kind: "book",
    track: "pastoral-ministry",
    audience: "church-leaders",
    priority: 3,
    series: "church-leadership",
  },
  // ── Booklet series ────────────────────────────────────────────────────
  {
    matches: f => /^Booklet_/.test(path.basename(f)),
    kind: "book",
    track: "theology",
    audience: "individuals",
    priority: 3,
    inferTrackFromTitle: true,
  },
  // ── PCN articles libraries (compendiums — treat as books) ─────────────
  {
    matches: f => /PCN.Articles.Library/i.test(f),
    kind: "book",
    track: "pastoral-ministry",
    audience: "pastors",
    priority: 3,
  },
  // ── Sermons (one-off, not a book) ─────────────────────────────────────
  {
    matches: f => /[\\/]sermons?[\\/]/i.test(f) || /sermon/i.test(path.basename(f)),
    kind: "article",
    track: "theology",
    audience: "individuals",
    format: "sermon-series",
    priority: 4,
  },
  // ── Resource wall pieces (essays) ─────────────────────────────────────
  {
    matches: f => /ResourceWall_/i.test(path.basename(f)),
    kind: "article",
    track: "theology",
    audience: "individuals",
    format: "article",
    priority: 2,
  },
  // ── Short essays (the P2-* "social media content" set) ────────────────
  {
    matches: f => /^P\d+-\d+/.test(path.basename(f)),
    kind: "article",
    track: "theology",
    audience: "individuals",
    format: "article",
    priority: 2,
  },
  // ── HB / TD / MH / ME / M / W manuscripts (essay-shaped per filename) ─
  {
    matches: f => /^(HB|TD|MH|ME|M|W)\d+_/.test(path.basename(f)),
    kind: "article",
    track: "theology",
    audience: "individuals",
    format: "article",
    priority: 2,
    inferTrackFromTitle: true,
  },
];

// Track inference from book title slug. Used when inferTrackFromTitle=true.
const TRACK_KEYWORDS = [
  { rx: /(political|politics|nationalism|america|kingdom.come|left.right|christendom)/i, track: "after-christendom" },
  { rx: /(politics|political|left.and.right)/i, track: "politics" },
  { rx: /(church|denominations|baptism|evangelical|fundamentalism)/i, track: "american-church" },
  { rx: /(skeptic|doubt|deconstruction|atheism|atheist|believe|reliability)/i, track: "doubt" },
  { rx: /(justice|reconciliation|race|stranger|border|forgiveness)/i, track: "prophetic-justice" },
  { rx: /(pastor|elder|deacon|sermon|preach|leadership|board|burnout)/i, track: "pastoral-ministry" },
  { rx: /(marriage|covenant|husband|wife|spouse|honest)/i, track: "marriage" },
  { rx: /(parent|children|raising|family|kids)/i, track: "parenting" },
  { rx: /(money|wealth|prosperity|finance|giving|jesus.and.money)/i, track: "finances" },
  { rx: /(devotional|daily|prayer|psalm|advent|lent)/i, track: "devotionals" },
  { rx: /(theology|gospel|bible|scripture|jesus|trinity|incarnation|atonement|covenant|grace)/i, track: "theology" },
];

function inferTrackFromTitle(title) {
  for (const { rx, track } of TRACK_KEYWORDS) {
    if (rx.test(title)) return track;
  }
  return "theology";
}

function looksLikeArchiveDup(rel) {
  return /(?:^|[/\\])Z_Archive[/\\]/i.test(rel);
}

function isVersionedDraft(name) {
  return /_v\d+\b/i.test(name) || /_draft\b/i.test(name);
}

function looksLikeFinal(name) {
  return /(FINAL|Complete|FULL.MANUSCRIPT|FULL_MANUSCRIPT|enhanced.complete)/i.test(name);
}

// Inferred clean title from a filename.
function titleFromFilename(file) {
  const base = path.basename(file, path.extname(file));
  return base
    .replace(/^P\d+-\d+\s*/, "")
    .replace(/^Booklet_/, "")
    .replace(/_FULL_MANUSCRIPT$/i, "")
    .replace(/_FULL$/i, "")
    .replace(/[\s_\-]+FINAL$/i, "")
    .replace(/[\s_\-]+Complete$/i, "")
    .replace(/[\s_\-]+Complete.Book$/i, "")
    .replace(/[\s_\-]+(?:KDP|Publishing).Packet$/i, "")
    .replace(/—\s*Full.Manuscript$/i, "")
    .replace(/_v\d+(?:-\w+)?$/i, "")
    .replace(/_\d{4}-\d{2}-\d{2}_v\d+/i, "")
    .replace(/_\d{4}-\d{2}-\d{2}/i, "")
    .replace(/[_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

// Recursive walk.
function walk(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.name.startsWith("~$")) continue;
    if (e.isDirectory()) {
      if (!INCLUDE_ARCHIVE && /Z_Archive/.test(e.name)) continue;
      walk(full, out);
    } else if (e.name.toLowerCase().endsWith(".docx")) {
      out.push(full);
    }
  }
  return out;
}

function classify(file) {
  const rel = path.relative(ROOT, file);
  const name = path.basename(file);
  for (const rule of RULES) {
    if (rule.matches(file)) {
      const title = titleFromFilename(file);
      let track = rule.track;
      if (rule.inferTrackFromTitle) track = inferTrackFromTitle(title);
      return {
        path: file.replace(/\\/g, "/"),
        rel,
        kind: rule.kind,
        title,
        suggestedSlug: slugify(title),
        track,
        audience: rule.audience,
        format: rule.format ?? (rule.kind === "book" ? "book-chapter" : "article"),
        priority: rule.priority,
        series: rule.series ?? null,
        notes: [],
      };
    }
  }
  // Default: probably a long-form article, audience=individuals, track guessed
  const title = titleFromFilename(file);
  return {
    path: file.replace(/\\/g, "/"),
    rel,
    kind: "article",
    title,
    suggestedSlug: slugify(title),
    track: inferTrackFromTitle(title),
    audience: "individuals",
    format: "article",
    priority: 5,
    series: null,
    notes: ["unmatched — using filename inference"],
  };
}

function dedupVersions(records) {
  // Group by normalized base title; if a "FINAL"-like exists, keep only that.
  const byTitle = new Map();
  for (const r of records) {
    const key = slugify(r.title);
    if (!byTitle.has(key)) byTitle.set(key, []);
    byTitle.get(key).push(r);
  }
  const kept = [];
  const skipped = [];
  for (const [key, group] of byTitle.entries()) {
    if (group.length === 1) {
      kept.push(group[0]);
      continue;
    }
    const finals = group.filter(r => looksLikeFinal(path.basename(r.path)));
    const drafts = group.filter(r => isVersionedDraft(path.basename(r.path)));
    if (finals.length > 0) {
      // Pick the most recently modified final
      finals.sort((a, b) => fs.statSync(b.path).mtimeMs - fs.statSync(a.path).mtimeMs);
      finals[0].notes.push(`chosen from ${group.length} versions (kept FINAL/Complete)`);
      kept.push(finals[0]);
      for (const d of group) {
        if (d !== finals[0]) skipped.push({ ...d, skippedFor: finals[0].path });
      }
    } else if (drafts.length < group.length) {
      // Keep the non-draft, drop _v\d+ versions
      const nondraft = group.filter(r => !isVersionedDraft(path.basename(r.path)));
      nondraft[0].notes.push(`chosen from ${group.length} versions (drafts dropped)`);
      kept.push(nondraft[0]);
      for (const d of drafts) skipped.push({ ...d, skippedFor: nondraft[0].path });
    } else {
      // All drafts; keep the one with the highest version number
      group.sort((a, b) => {
        const av = parseInt((path.basename(a.path).match(/_v(\d+)/) ?? [, "0"])[1], 10);
        const bv = parseInt((path.basename(b.path).match(/_v(\d+)/) ?? [, "0"])[1], 10);
        return bv - av;
      });
      group[0].notes.push(`chosen as latest draft from ${group.length} versions`);
      kept.push(group[0]);
      for (const d of group.slice(1)) skipped.push({ ...d, skippedFor: group[0].path });
    }
  }
  return { kept, skipped };
}

function summarize(plan) {
  const by = (key, items) => {
    const counts = {};
    for (const it of items) counts[it[key] ?? "(none)"] = (counts[it[key] ?? "(none)"] ?? 0) + 1;
    return counts;
  };
  return {
    total: plan.length,
    by_kind: by("kind", plan),
    by_track: by("track", plan),
    by_audience: by("audience", plan),
    by_priority: by("priority", plan),
  };
}

// ── Run ─────────────────────────────────────────────────────────────────
console.log(`Scanning ${ROOT} (include archive: ${INCLUDE_ARCHIVE})`);
const files = walk(ROOT);
console.log(`Found ${files.length} .docx files.`);

const classified = files.map(classify);
const { kept, skipped } = dedupVersions(classified);

const plan = {
  generated_at: new Date().toISOString(),
  root: ROOT,
  include_archive: INCLUDE_ARCHIVE,
  total_files_seen: files.length,
  total_publish_candidates: kept.length,
  total_skipped_as_duplicates: skipped.length,
  summary: summarize(kept),
  publish: kept.sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title)),
  skipped_versions: skipped,
};

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(plan, null, 2));

console.log(`\nWrote publish plan → ${OUTPUT}`);
console.log(`Candidates: ${kept.length}`);
console.log(`Skipped (older versions): ${skipped.length}`);
console.log("\nBy kind:");
for (const [k, v] of Object.entries(plan.summary.by_kind)) console.log(`  ${k}: ${v}`);
console.log("\nBy track:");
for (const [k, v] of Object.entries(plan.summary.by_track)) console.log(`  ${k}: ${v}`);
console.log("\nBy priority:");
for (const [k, v] of Object.entries(plan.summary.by_priority)) console.log(`  P${k}: ${v}`);
