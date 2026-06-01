/**
 * publish-md — Publish a markdown file with YAML frontmatter directly to the
 * LiveWell `posts` table. Idempotent by slug.
 *
 * Frontmatter format (the content/drafts/full-NN-*.md files use this):
 *
 *   ---
 *   title: "..."
 *   slug: ...
 *   track: after-christendom | politics | marriage | ...
 *   audience: individuals | pastors | couples | ...
 *   format: article | book-chapter | sermon-series | devotional
 *   status: draft | draft-final
 *   read_time_minutes: 10
 *   excerpt: "..."
 *   seo_keywords: "..."        # optional, for future meta-tag use
 *   publish_at: null            # null=immediate, ISO date=schedule
 *   ---
 *
 *   markdown body here
 *
 * Usage:
 *   pnpm publish:md path/to/essay.md                # publishes live
 *   pnpm publish:md path/to/essay.md --draft        # status=draft on the row
 *   pnpm publish:md path/to/essay.md --dry-run      # parse + voice-check, no write
 *   pnpm publish:md --folder content/drafts/        # batch a folder
 *
 * Requires DATABASE_URL in env.
 */
import { drizzle } from "drizzle-orm/mysql2";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";

import { posts, type InsertPost } from "../drizzle/schema";

// ── Voice check (mirrors CLAUDE.md forbidden language) ─────────────────
const FORBIDDEN_WORDS = [
  "delve", "leverage", "unlock", "transformative", "navigate", "tapestry",
  "foster", "unpack", "landscape", "nuanced", "multifaceted", "authentic",
  "holistic",
];
const FORBIDDEN_PHRASES = [
  "in today's world", "now more than ever", "here's the thing",
  "i want to be real with you", "god's got this", "gospel-centered",
  "authentic community", "hold space", "your truth", "do the work",
  "your feelings are valid", "lean into", "showing up",
];

interface Frontmatter {
  title?: string;
  slug?: string;
  track?: string;
  audience?: string;
  format?: string;
  status?: string;
  read_time_minutes?: number;
  excerpt?: string;
  seo_keywords?: string;
  publish_at?: string | null;
  featured?: boolean;
  cover_image?: string;
}

interface ParsedMd {
  fm: Frontmatter;
  body: string;
}

function parseFrontmatter(raw: string): ParsedMd {
  if (!raw.startsWith("---")) {
    return { fm: {}, body: raw };
  }
  const end = raw.indexOf("\n---", 3);
  if (end < 0) return { fm: {}, body: raw };
  const fmRaw = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\n+/, "");
  const fm: Frontmatter = {};
  for (const line of fmRaw.split("\n")) {
    const m = /^([a-zA-Z_]+)\s*:\s*(.*)$/.exec(line.trim());
    if (!m) continue;
    const key = m[1];
    let value: string | number | boolean | null = m[2].trim();
    if (typeof value === "string") {
      // Strip wrapping quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (value === "null" || value === "~" || value === "") value = null;
      else if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (/^\d+$/.test(value)) value = parseInt(value, 10);
    }
    (fm as Record<string, unknown>)[key] = value;
  }
  return { fm, body };
}

function readingTime(md: string): { minutes: number; label: string } {
  const words = md
    .replace(/```[\s\S]*?```/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { minutes, label: `${minutes} min read` };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

interface VoiceWarning {
  line: number;
  text: string;
  reason: string;
}

function voiceCheck(md: string): VoiceWarning[] {
  const warnings: VoiceWarning[] = [];
  const lines = md.split("\n");
  lines.forEach((line, i) => {
    const lineNum = i + 1;
    const lower = line.toLowerCase();
    for (const w of FORBIDDEN_WORDS) {
      if (new RegExp(`\\b${w}\\b`, "i").test(line)) {
        warnings.push({ line: lineNum, text: w, reason: "forbidden word" });
      }
    }
    for (const p of FORBIDDEN_PHRASES) {
      if (lower.includes(p)) {
        warnings.push({ line: lineNum, text: p, reason: "forbidden phrase" });
      }
    }
  });
  return warnings;
}

type Args = {
  paths: string[];
  folder?: string;
  dryRun: boolean;
  draft: boolean;
};

function parseArgs(argv: string[]): Args {
  const a: Args = { paths: [], dryRun: false, draft: false };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === "--dry-run") a.dryRun = true;
    else if (t === "--draft") a.draft = true;
    else if (t === "--folder") a.folder = argv[++i];
    else if (!t.startsWith("--")) a.paths.push(t);
  }
  return a;
}

async function publishOne(
  db: ReturnType<typeof drizzle>,
  file: string,
  args: Args
): Promise<{ ok: boolean; slug: string; warnings: number }> {
  const raw = readFileSync(file, "utf8");
  const { fm, body } = parseFrontmatter(raw);

  const title = fm.title ?? basename(file, extname(file));
  const slug =
    fm.slug ??
    slugify(typeof title === "string" ? title : basename(file, extname(file)));
  const { minutes, label } = readingTime(body);
  const warnings = voiceCheck(body);
  const status = (fm.status ?? "").toString().toLowerCase();
  const publishedFlag = args.draft ? false : status !== "draft";

  console.log(`\n[${basename(file)}]`);
  console.log(`  title:    ${title}`);
  console.log(`  slug:     ${slug}`);
  console.log(`  track:    ${fm.track ?? "(unset)"}`);
  console.log(`  audience: ${fm.audience ?? "individuals"}`);
  console.log(`  format:   ${fm.format ?? "article"}`);
  console.log(`  words:    ${body.split(/\s+/).filter(Boolean).length} (${label})`);
  console.log(`  state:    ${args.dryRun ? "DRY RUN" : publishedFlag ? "LIVE" : "DRAFT"}`);
  if (warnings.length > 0) {
    console.log(`  ! ${warnings.length} voice warning(s):`);
    for (const w of warnings.slice(0, 10)) {
      console.log(`     line ${w.line}: "${w.text}"  (${w.reason})`);
    }
    if (warnings.length > 10) {
      console.log(`     ... and ${warnings.length - 10} more`);
    }
  }

  if (args.dryRun) {
    console.log(`  dry-run — not written`);
    return { ok: true, slug, warnings: warnings.length };
  }

  const insertRow: InsertPost = {
    title: title as string,
    slug,
    body,
    excerpt: (fm.excerpt as string) ?? body.slice(0, 280),
    readTime: label,
    readingTimeMinutes: (fm.read_time_minutes as number) ?? minutes,
    published: publishedFlag,
    featured: (fm.featured as boolean) ?? false,
    format: (fm.format as InsertPost["format"]) ?? "article",
    contentType: "general",
    audience_type: "general",
    audience: (fm.audience as InsertPost["audience"]) ?? "individuals",
    difficulty: "intermediate",
    pillar: (fm.track as string) ?? null,
    coverImage: (fm.cover_image as string) ?? null,
    publishedAt: publishedFlag ? new Date() : null,
  };

  // Slug-keyed upsert. Refresh doc-derived fields. Preserve any admin edits
  // to fields the markdown doesn't carry.
  const updateRow: Partial<InsertPost> = {
    title: title as string,
    body,
    excerpt: insertRow.excerpt,
    readTime: label,
    readingTimeMinutes: insertRow.readingTimeMinutes,
    published: publishedFlag,
    publishedAt: publishedFlag ? new Date() : null,
  };
  if (fm.track !== undefined) updateRow.pillar = fm.track as string;
  if (fm.audience !== undefined)
    updateRow.audience = fm.audience as InsertPost["audience"];
  if (fm.format !== undefined)
    updateRow.format = fm.format as InsertPost["format"];
  if (fm.cover_image !== undefined) updateRow.coverImage = fm.cover_image as string;

  try {
    await db
      .insert(posts)
      .values(insertRow)
      .onDuplicateKeyUpdate({ set: updateRow });
    const liveUrl = `https://www.livewellbyjamesbell.co/writing/${slug}`;
    console.log(`  ok: upserted -> posts (slug: ${slug})`);
    if (publishedFlag) {
      console.log(`  url: ${liveUrl}`);
    } else {
      console.log(`  url: (draft — preview at /admin)`);
    }
    return { ok: true, slug, warnings: warnings.length };
  } catch (e) {
    console.error(`  FAIL: ${(e as Error).message}`);
    return { ok: false, slug, warnings: warnings.length };
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  let files: string[] = [];
  if (args.folder) {
    const dir = resolve(args.folder);
    try {
      // Only pick up `full-NN-*.md` essay drafts. Outline files
      // (essays-*.md, books-*.md, magnets.md, README.md) are scaffolding
      // and would publish as garbage if included.
      files = readdirSync(dir)
        .filter(f => /^full-\d+-.+\.md$/i.test(f))
        .sort()
        .map(f => join(dir, f));
    } catch (e) {
      console.error(`ERROR: cannot read folder: ${(e as Error).message}`);
      process.exit(1);
    }
  }
  for (const p of args.paths) files.push(resolve(p));
  files = files.filter(f => {
    try {
      return statSync(f).isFile();
    } catch {
      return false;
    }
  });

  if (files.length === 0) {
    console.error(
      "No markdown files. Usage: tsx scripts/publish-md.ts file.md [--draft|--dry-run|--folder DIR]"
    );
    process.exit(1);
  }

  if (!args.dryRun && !process.env.DATABASE_URL) {
    console.error(
      "ERROR: DATABASE_URL is not set. Add it to .env, or pass --dry-run for preview only."
    );
    process.exit(1);
  }

  const db = args.dryRun
    ? (null as unknown as ReturnType<typeof drizzle>)
    : drizzle(process.env.DATABASE_URL!);

  console.log(
    `publish-md: ${files.length} file(s), mode=${args.dryRun ? "DRY RUN" : args.draft ? "DRAFT" : "LIVE"}`
  );

  let ok = 0;
  let fail = 0;
  let totalWarnings = 0;
  for (const f of files) {
    const r = await publishOne(db, f, args);
    if (r.ok) ok++;
    else fail++;
    totalWarnings += r.warnings;
  }

  console.log(`\n=== ${ok} published, ${fail} failed, ${totalWarnings} total voice warnings ===`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
