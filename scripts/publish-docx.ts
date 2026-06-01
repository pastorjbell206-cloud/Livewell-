/**
 * publish-docx — Convert a Word document to a LiveWell post (or book) and
 * upsert it to the production database. Idempotent by slug.
 *
 * Usage:
 *   pnpm publish:docx path/to/file.docx                # publishes as DRAFT
 *   pnpm publish:docx path/to/file.docx --live         # publishes live
 *   pnpm publish:docx path/to/file.docx --dry-run      # preview, no write
 *   pnpm publish:docx --folder "C:/path/to/Drafts"     # batch a folder
 *   pnpm publish:docx file.docx --as book \
 *       --cover-image URL --purchase-url URL           # publishes to books table
 *
 * Field overrides (all optional, only the ones you pass are touched):
 *   --slug, --title, --pillar, --topic, --format, --audience,
 *   --difficulty, --content-type, --audience-type, --cover-image, --excerpt
 *
 * Re-publishing the same slug UPDATES the row. Doc-derived fields (title,
 * body, excerpt, reading time) are always refreshed; manually-edited
 * metadata fields (topic, pillar, etc.) are preserved unless explicitly
 * overridden via a CLI flag.
 *
 * Requires DATABASE_URL in env. Easiest:
 *   node --env-file=.env --import tsx scripts/publish-docx.ts <args>
 * Or just: DATABASE_URL=mysql://... pnpm publish:docx <args>
 */

import { drizzle } from "drizzle-orm/mysql2";
import mammoth from "mammoth";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import {
  posts,
  books,
  type InsertPost,
  type InsertBook,
} from "../drizzle/schema";

// ── Forbidden language (mirrors CLAUDE.md §Forbidden Language) ──────────
const FORBIDDEN_WORDS = [
  "delve",
  "leverage",
  "unlock",
  "transformative",
  "navigate",
  "tapestry",
  "foster",
  "unpack",
  "landscape",
  "nuanced",
  "multifaceted",
  "authentic",
  "holistic",
];
const FORBIDDEN_PHRASES = [
  "in today's world",
  "now more than ever",
  "here's the thing",
  "i want to be real with you",
  "god's got this",
  "gospel-centered",
  "authentic community",
  "hold space",
  "your truth",
  "do the work",
  "your feelings are valid",
  "lean into",
  "showing up",
];
const JOURNEY_METAPHOR_RE =
  /\b(spiritual|faith|life|our|my|the|a)\s+journey\b/i;
const BLESSED_ADJ_RE = /\b(feel|feeling|am|so|truly|really)\s+blessed\b/i;

// ── Argv parsing ────────────────────────────────────────────────────────
type Mode = "post" | "book";

type Overrides = {
  title?: string;
  slug?: string;
  excerpt?: string;
  pillar?: string;
  topic?: InsertPost["topic"];
  format?: InsertPost["format"];
  audience?: InsertPost["audience"];
  difficulty?: InsertPost["difficulty"];
  contentType?: InsertPost["contentType"];
  audienceType?: string;
  coverImage?: string;
  purchaseUrl?: string;
  author?: string;
};

type Args = {
  paths: string[];
  folder?: string;
  dryRun: boolean;
  draft: boolean;
  mode: Mode;
  overrides: Overrides;
  help: boolean;
};

function parseArgs(argv: string[]): Args {
  const a: Args = {
    paths: [],
    dryRun: false,
    draft: true,
    mode: "post",
    overrides: {},
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    switch (t) {
      case "-h":
      case "--help":
        a.help = true;
        break;
      case "--dry-run":
        a.dryRun = true;
        break;
      case "--live":
        a.draft = false;
        break;
      case "--draft":
        a.draft = true;
        break;
      case "--folder":
        a.folder = argv[++i];
        break;
      case "--as":
        a.mode = argv[++i] as Mode;
        break;
      case "--title":
        a.overrides.title = argv[++i];
        break;
      case "--slug":
        a.overrides.slug = argv[++i];
        break;
      case "--excerpt":
        a.overrides.excerpt = argv[++i];
        break;
      case "--pillar":
        a.overrides.pillar = argv[++i];
        break;
      case "--topic":
        a.overrides.topic = argv[++i] as InsertPost["topic"];
        break;
      case "--format":
        a.overrides.format = argv[++i] as InsertPost["format"];
        break;
      case "--audience":
        a.overrides.audience = argv[++i] as InsertPost["audience"];
        break;
      case "--difficulty":
        a.overrides.difficulty = argv[++i] as InsertPost["difficulty"];
        break;
      case "--content-type":
        a.overrides.contentType = argv[++i] as InsertPost["contentType"];
        break;
      case "--audience-type":
        a.overrides.audienceType = argv[++i];
        break;
      case "--cover-image":
        a.overrides.coverImage = argv[++i];
        break;
      case "--purchase-url":
        a.overrides.purchaseUrl = argv[++i];
        break;
      case "--author":
        a.overrides.author = argv[++i];
        break;
      default:
        if (t.startsWith("--")) {
          console.warn(`(ignoring unknown flag: ${t})`);
        } else {
          a.paths.push(t);
        }
    }
  }
  return a;
}

function printHelp(): void {
  console.log(`publish-docx — convert .docx to a LiveWell post (or book)

  pnpm publish:docx <file.docx>              draft a new post from the doc
  pnpm publish:docx <file.docx> --live       publish live immediately
  pnpm publish:docx <file.docx> --dry-run    preview without writing
  pnpm publish:docx --folder "<dir>"         batch every .docx in a folder
  pnpm publish:docx <file.docx> --as book    upsert to books table instead

  Field overrides (only those passed are touched):
    --title  --slug  --excerpt  --pillar  --topic  --format
    --audience  --difficulty  --content-type  --audience-type
    --cover-image  --purchase-url  --author

  Requires DATABASE_URL in env.`);
}

// ── Helpers ─────────────────────────────────────────────────────────────
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

function cleanMarkdown(md: string): string {
  return (
    md
      .replace(/ /g, " ")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/\\([.,;:!?'"\-])/g, "$1") // mammoth over-escapes safe punctuation
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n"
  );
}

// Filler words that look like headings in books but aren't the article title.
const HEADING_FILLER = new Set([
  "contents",
  "table of contents",
  "foreword",
  "introduction",
  "preface",
  "acknowledgments",
  "acknowledgements",
  "dedication",
  "epilogue",
  "afterword",
]);

// Word users frequently style "headings" as bold paragraphs instead of using
// Heading 1/2/3 styles. Mammoth renders those as __bold__ on their own line,
// which is wrong on the rendered site (no <h2>, no anchor, no typographic
// weight). Convert solitary-bold lines into ## headings.
function promoteBoldHeadings(md: string): string {
  return md.replace(/^__([^_\n]+)__\s*$/gm, "## $1");
}

// Mammoth embeds inline Word images as data: URIs. Those can be megabytes per
// image — bloats the DB row and the post body. Strip them and leave a marker
// so the author knows where to re-attach an image in /admin.
function stripDataImages(md: string): { md: string; count: number } {
  let count = 0;
  const cleaned = md
    .replace(/!\[[^\]]*\]\(data:[^)]+\)/g, () => {
      count++;
      return "<!-- [embedded image stripped — re-add via /admin] -->";
    })
    // remove any heading line that ends up empty after stripping
    .replace(/^(#{1,6})\s*(<!--[^>]+-->)\s*$/gm, "$2");
  return { md: cleaned, count };
}

function makeExcerpt(md: string, maxLen = 280): string {
  const plain = md
    .replace(/^#.*$/gm, "")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  const cut = plain.slice(0, maxLen);
  const lastPeriod = cut.lastIndexOf(". ");
  if (lastPeriod > maxLen * 0.6) return cut.slice(0, lastPeriod + 1);
  return cut.replace(/\s+\S*$/, "") + "…";
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

// Strip wrapping bold/italic markers from heading text. Word users sometimes
// bold an entire heading line; the markdown nesting is meaningless once we
// already know it's a heading.
function stripInlineFormatting(s: string): string {
  return s
    .replace(/^__([^_]+)__$/, "$1")
    .replace(/^\*\*([^*]+)\*\*$/, "$1")
    .replace(/^_([^_]+)_$/, "$1")
    .replace(/^\*([^*]+)\*$/, "$1")
    .trim();
}

function isUsableTitle(candidate: string): boolean {
  if (!candidate) return false;
  if (candidate.includes("![")) return false; // image syntax — not a title
  if (candidate.startsWith("<!--")) return false; // a stripped-image marker
  if (HEADING_FILLER.has(candidate.toLowerCase())) return false;
  // Title-like fillers with subtitle (e.g. "Foreword: ..."): keep, since they
  // carry real information the user can override with --title if needed.
  return true;
}

function inferTitle(md: string, filePath: string): string {
  // 1. First usable markdown H1
  for (const m of md.matchAll(/^#\s+(.+)$/gm)) {
    const candidate = stripInlineFormatting(m[1].trim());
    if (isUsableTitle(candidate)) return candidate;
  }
  // 2. First usable ## heading (post bold-promotion)
  for (const m of md.matchAll(/^##\s+(.+)$/gm)) {
    const candidate = stripInlineFormatting(m[1].trim());
    if (isUsableTitle(candidate)) return candidate;
  }
  // 3. First usable standalone bold line (rare safety net)
  for (const m of md.matchAll(/^__([^_\n]+)__\s*$/gm)) {
    const candidate = m[1].trim();
    if (isUsableTitle(candidate)) return candidate;
  }
  // 4. Filename
  return basename(filePath, extname(filePath))
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function inferFormat(
  md: string,
  filePath: string
): InsertPost["format"] | undefined {
  const name = basename(filePath, extname(filePath)).toLowerCase();
  if (/^chapter[-_\s]/.test(name)) return "book-chapter";
  const firstHeading = md.match(/^#\s+(.+)$/m)?.[1] ?? "";
  if (/^chapter\s+\d/i.test(firstHeading)) return "book-chapter";
  return undefined;
}

type VoiceWarning = { line: number; text: string; reason: string };

function voiceCheck(md: string): VoiceWarning[] {
  const warnings: VoiceWarning[] = [];
  const lines = md.split("\n");
  lines.forEach((line, i) => {
    const lineNum = i + 1;
    const lower = line.toLowerCase();
    for (const word of FORBIDDEN_WORDS) {
      if (new RegExp(`\\b${word}\\b`, "i").test(line)) {
        warnings.push({ line: lineNum, text: word, reason: "forbidden word" });
      }
    }
    for (const phrase of FORBIDDEN_PHRASES) {
      if (lower.includes(phrase)) {
        warnings.push({
          line: lineNum,
          text: phrase,
          reason: "forbidden phrase",
        });
      }
    }
    if (JOURNEY_METAPHOR_RE.test(line)) {
      warnings.push({
        line: lineNum,
        text: "journey (as metaphor)",
        reason: "forbidden metaphor",
      });
    }
    if (BLESSED_ADJ_RE.test(line)) {
      warnings.push({
        line: lineNum,
        text: "blessed (as adjective)",
        reason: "forbidden usage",
      });
    }
  });
  return warnings;
}

// ── Per-file publish ────────────────────────────────────────────────────
type Db = ReturnType<typeof drizzle>;

async function publishOne(db: Db, file: string, args: Args): Promise<void> {
  const buffer = readFileSync(file);
  const { value: rawMd, messages } = await mammoth.convertToMarkdown(
    { buffer },
    {
      styleMap: [
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Heading 4'] => h4:fresh",
      ],
    }
  );
  const stripped = stripDataImages(cleanMarkdown(rawMd));
  const body = promoteBoldHeadings(stripped.md);
  const strippedImageCount = stripped.count;

  const title = args.overrides.title ?? inferTitle(body, file);
  const slug = args.overrides.slug ?? slugify(title);
  const excerpt = args.overrides.excerpt ?? makeExcerpt(body);
  const { minutes, label } = readingTime(body);
  const inferredFormat = inferFormat(body, file);
  const format = args.overrides.format ?? inferredFormat ?? "article";
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const warnings = voiceCheck(body);
  const imgMessages = messages.filter(m =>
    m.message.toLowerCase().includes("image")
  );
  const totalImages = strippedImageCount + imgMessages.length;

  console.log(`\n[${basename(file)}]`);
  console.log(`  title:    ${title}`);
  console.log(`  slug:     ${slug}`);
  console.log(`  words:    ${words} (${label})`);
  console.log(
    `  format:   ${format}${args.mode === "book" ? "  -> books table" : ""}`
  );
  console.log(`  state:    ${args.draft ? "DRAFT" : "LIVE"}`);
  if (totalImages > 0) {
    console.log(
      `  ! ${totalImages} embedded image(s) — v1 skips upload. Stripped from body; add real URLs in /admin after publish.`
    );
  }
  if (warnings.length > 0) {
    console.log(`  ! ${warnings.length} voice warning(s):`);
    for (const w of warnings.slice(0, 20)) {
      console.log(`     line ${w.line}: "${w.text}"  (${w.reason})`);
    }
    if (warnings.length > 20) {
      console.log(`     ... and ${warnings.length - 20} more`);
    }
  }

  if (args.dryRun) {
    console.log(`  dry-run — not written`);
    return;
  }

  if (args.mode === "book") {
    const insertRow: InsertBook = {
      title,
      slug,
      author: args.overrides.author ?? "James Bell",
      description: excerpt,
      sampleExcerpt: body,
      bookType: "authored",
      published: !args.draft,
      coverImage: args.overrides.coverImage ?? null,
      purchaseUrl: args.overrides.purchaseUrl ?? null,
      sortOrder: 0,
    };
    const updateRow: Partial<InsertBook> = {
      title,
      description: excerpt,
      sampleExcerpt: body,
      ...(args.overrides.author !== undefined && {
        author: args.overrides.author,
      }),
      ...(args.overrides.coverImage !== undefined && {
        coverImage: args.overrides.coverImage,
      }),
      ...(args.overrides.purchaseUrl !== undefined && {
        purchaseUrl: args.overrides.purchaseUrl,
      }),
    };
    await db
      .insert(books)
      .values(insertRow)
      .onDuplicateKeyUpdate({ set: updateRow });
    console.log(`  ok: upserted -> books (slug: ${slug})`);
    return;
  }

  // posts mode
  const insertRow: InsertPost = {
    title,
    slug,
    body,
    excerpt,
    readTime: label,
    readingTimeMinutes: minutes,
    published: !args.draft,
    featured: false,
    format,
    contentType: args.overrides.contentType ?? "general",
    audience_type: args.overrides.audienceType ?? "general",
    audience: args.overrides.audience ?? "individuals",
    difficulty: args.overrides.difficulty ?? "intermediate",
    pillar: args.overrides.pillar ?? null,
    topic: args.overrides.topic,
    coverImage: args.overrides.coverImage ?? null,
    publishedAt: args.draft ? null : new Date(),
  };

  // On re-publish, only refresh doc-derived fields + any explicit overrides.
  // Manual edits to topic/pillar/audience/etc. in /admin are preserved.
  const updateRow: Partial<InsertPost> = {
    title,
    body,
    excerpt,
    readTime: label,
    readingTimeMinutes: minutes,
    ...(args.overrides.format !== undefined && { format }),
    ...(args.overrides.contentType !== undefined && {
      contentType: args.overrides.contentType,
    }),
    ...(args.overrides.audienceType !== undefined && {
      audience_type: args.overrides.audienceType,
    }),
    ...(args.overrides.audience !== undefined && {
      audience: args.overrides.audience,
    }),
    ...(args.overrides.difficulty !== undefined && {
      difficulty: args.overrides.difficulty,
    }),
    ...(args.overrides.pillar !== undefined && {
      pillar: args.overrides.pillar,
    }),
    ...(args.overrides.topic !== undefined && { topic: args.overrides.topic }),
    ...(args.overrides.coverImage !== undefined && {
      coverImage: args.overrides.coverImage,
    }),
    // published/publishedAt only flip if you explicitly pass --live or --draft
    // (parseArgs always sets one of them, so we update it deliberately):
    published: !args.draft,
    publishedAt: args.draft ? null : new Date(),
  };

  await db
    .insert(posts)
    .values(insertRow)
    .onDuplicateKeyUpdate({ set: updateRow });

  const liveUrl = `https://www.livewellbyjamesbell.co/writing/${slug}`;
  console.log(`  ok: upserted -> posts (slug: ${slug})`);
  console.log(
    `  url: ${args.draft ? `(draft — review at /admin then publish; will live at ${liveUrl})` : liveUrl}`
  );
}

// ── Main ────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  let files: string[] = [];
  if (args.folder) {
    const dir = resolve(args.folder);
    try {
      files = readdirSync(dir)
        .filter(f => f.toLowerCase().endsWith(".docx") && !f.startsWith("~$"))
        .map(f => join(dir, f));
    } catch (e) {
      console.error(`ERROR: cannot read folder ${dir}: ${(e as Error).message}`);
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
      "No .docx files to publish. Run with --help for usage."
    );
    process.exit(1);
  }

  if (!args.dryRun && !process.env.DATABASE_URL) {
    console.error(
      "ERROR: DATABASE_URL is not set. Add it to .env or pass --env-file=.env."
    );
    process.exit(1);
  }

  // Dry-run mode skips the DB connection entirely.
  const db = args.dryRun
    ? (null as unknown as Db)
    : drizzle(process.env.DATABASE_URL!);

  const stateLabel = args.dryRun ? "DRY RUN" : args.draft ? "DRAFT" : "LIVE";
  console.log(
    `publish-docx: ${files.length} file(s), mode=${args.mode}, state=${stateLabel}`
  );

  let ok = 0;
  let fail = 0;
  for (const f of files) {
    try {
      await publishOne(db, f, args);
      ok++;
    } catch (e) {
      console.error(`  FAIL: ${basename(f)}: ${(e as Error).message}`);
      fail++;
    }
  }

  console.log(`\n=== ${ok} published, ${fail} failed ===`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
