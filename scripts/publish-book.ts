/**
 * publish-book — Split a .docx manuscript into chapters and publish each
 * chapter as a `posts` row with format="book-chapter". Also upserts a
 * single `books` row representing the manuscript itself.
 *
 * Usage:
 *   pnpm publish:book "C:/path/to/Book.docx"                     # dry-run
 *   pnpm publish:book "C:/path/to/Book.docx" --apply             # write to DB
 *   pnpm publish:book "C:/path/to/Book.docx" --title "Override"
 *   pnpm publish:book "C:/path/to/Book.docx" --track theology    # canonical track
 *   pnpm publish:book "C:/path/to/Book.docx" --live              # published=true
 *
 * Chapter detection (best to worst):
 *   1. Word docs with Heading 1 style → mammoth emits # headings
 *   2. Bold-only lines like "__Chapter 1: Title__" → promoted to ## then split
 *   3. Plain text "Chapter 1" / "Chapter I" lines → split heuristic
 *   4. If only ##s exist with no #s, each ## becomes a chapter
 *   5. Fallback: single-chapter book (whole manuscript = chapter 1)
 *
 * Slug convention:
 *   book slug:    book-title-slug
 *   chapter slug: book-title-slug-chN-chapter-title-slug
 *
 * Idempotent: re-running with the same docx updates the same rows.
 */
import { drizzle } from "drizzle-orm/mysql2";
import mammoth from "mammoth";
import { readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";

import {
  books,
  posts,
  type InsertBook,
  type InsertPost,
} from "../drizzle/schema";

// ── Args ────────────────────────────────────────────────────────────────
interface Args {
  path?: string;
  apply: boolean;
  live: boolean;
  track?: string;
  title?: string;
  author?: string;
  bookSlug?: string;
  coverImage?: string;
  purchaseUrl?: string;
  audience?: string;
  help?: boolean;
}

function parseArgs(argv: string[]): Args {
  const a: Args = { apply: false, live: false };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    switch (t) {
      case "-h":
      case "--help":
        a.help = true;
        break;
      case "--apply":
        a.apply = true;
        break;
      case "--live":
        a.live = true;
        break;
      case "--track":
        a.track = argv[++i];
        break;
      case "--title":
        a.title = argv[++i];
        break;
      case "--author":
        a.author = argv[++i];
        break;
      case "--slug":
        a.bookSlug = argv[++i];
        break;
      case "--cover-image":
        a.coverImage = argv[++i];
        break;
      case "--purchase-url":
        a.purchaseUrl = argv[++i];
        break;
      case "--audience":
        a.audience = argv[++i];
        break;
      default:
        if (t.startsWith("--")) {
          console.warn(`(ignoring unknown flag: ${t})`);
        } else if (!a.path) {
          a.path = t;
        }
    }
  }
  return a;
}

// ── Helpers (mirrored from publish-docx.ts) ────────────────────────────
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
      .replace(/\\([.,;:!?'"\-])/g, "$1")
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n"
  );
}

function stripDataImages(md: string): { md: string; count: number } {
  let count = 0;
  const cleaned = md
    .replace(/!\[[^\]]*\]\(data:[^)]+\)/g, () => {
      count++;
      return "<!-- [embedded image stripped — re-add via /admin] -->";
    })
    .replace(/^(#{1,6})\s*(<!--[^>]+-->)\s*$/gm, "$2");
  return { md: cleaned, count };
}

function promoteBoldHeadings(md: string): string {
  return md.replace(/^__([^_\n]+)__\s*$/gm, "## $1");
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
  const words = md.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return { minutes, label: `${minutes} min read` };
}

const ROMAN_RE = "[IVXLCDM]+";

const WORD_NUMBERS: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6,
  seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20,
  "twenty-one": 21, "twenty-two": 22, "twenty-three": 23, "twenty-four": 24,
  "twenty-five": 25, "twenty-six": 26, "twenty-seven": 27, "twenty-eight": 28,
  "twenty-nine": 29, thirty: 30,
  "thirty-one": 31, "thirty-two": 32, "thirty-three": 33, "thirty-four": 34,
  "thirty-five": 35, "thirty-six": 36, "thirty-seven": 37, "thirty-eight": 38,
  "thirty-nine": 39, forty: 40,
  first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6,
  seventh: 7, eighth: 8, ninth: 9, tenth: 10, eleventh: 11, twelfth: 12,
};
const WORD_NUM_RE = Object.keys(WORD_NUMBERS).sort((a, b) => b.length - a.length).join("|");

// ── Chapter splitting ───────────────────────────────────────────────────
interface Chapter {
  number: number;
  rawTitle: string;
  body: string;
}

function romanToArabic(r: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  let prev = 0;
  for (let i = r.length - 1; i >= 0; i--) {
    const v = map[r[i].toUpperCase()] ?? 0;
    total += v < prev ? -v : v;
    prev = v;
  }
  return total;
}

interface Boundary {
  start: number;
  rawTitle: string;
  number: number;
}

function findBoundaries(md: string): Boundary[] {
  const lines = md.split("\n");
  const boundaries: Boundary[] = [];
  let offset = 0;

  // 1) Look for "Chapter N" patterns (most reliable). Accepts Arabic
  //    numerals (Chapter 1), Roman numerals (Chapter IV), and English
  //    word-numbers including ordinals (Chapter One, Chapter Twenty-Three,
  //    Chapter First). Hyphens in word-numbers are honored.
  const chapterRe = new RegExp(
    `^(?:#{1,6}\\s+)?(?:Chapter|CHAPTER)\\s+(\\d+|${ROMAN_RE}|${WORD_NUM_RE})\\b`,
    "i"
  );
  for (const line of lines) {
    const m = chapterRe.exec(line);
    if (m) {
      const numStr = m[1];
      let arabic: number;
      if (/^\d+$/.test(numStr)) {
        arabic = parseInt(numStr, 10);
      } else if (numStr.toLowerCase() in WORD_NUMBERS) {
        arabic = WORD_NUMBERS[numStr.toLowerCase()];
      } else {
        arabic = romanToArabic(numStr);
      }
      boundaries.push({
        start: offset,
        rawTitle: line.replace(/^#{1,6}\s+/, "").trim(),
        number: arabic,
      });
    }
    offset += line.length + 1;
  }

  if (boundaries.length >= 2) return dedupeBoundaries(boundaries);

  // 2) Numbered headings "## 1. Title" pattern
  boundaries.length = 0;
  offset = 0;
  for (const line of lines) {
    const m = /^#{1,3}\s+(\d{1,3})\.\s+(.+?)\s*$/.exec(line);
    if (m) {
      boundaries.push({
        start: offset,
        rawTitle: line.replace(/^#{1,3}\s+/, "").trim(),
        number: parseInt(m[1], 10),
      });
    }
    offset += line.length + 1;
  }
  if (boundaries.length >= 2) return dedupeBoundaries(boundaries);

  // 3) Each H1 (#) becomes a chapter
  boundaries.length = 0;
  offset = 0;
  let n = 0;
  for (const line of lines) {
    if (/^#\s+\S/.test(line)) {
      n++;
      boundaries.push({
        start: offset,
        rawTitle: line.replace(/^#\s+/, "").trim(),
        number: n,
      });
    }
    offset += line.length + 1;
  }
  if (boundaries.length >= 2) return boundaries;

  // 4) Each H2 (##) becomes a chapter (post-bold-promotion fallback)
  boundaries.length = 0;
  offset = 0;
  n = 0;
  for (const line of lines) {
    if (/^##\s+\S/.test(line) && !/^##\s+Contents$/i.test(line.trim())) {
      n++;
      boundaries.push({
        start: offset,
        rawTitle: line.replace(/^##\s+/, "").trim(),
        number: n,
      });
    }
    offset += line.length + 1;
  }
  return boundaries;
}

function dedupeBoundaries(b: Boundary[]): Boundary[] {
  // Keep first occurrence of each chapter number.
  const seen = new Set<number>();
  const out: Boundary[] = [];
  for (const x of b) {
    if (seen.has(x.number)) continue;
    seen.add(x.number);
    out.push(x);
  }
  return out;
}

function splitIntoChapters(md: string): Chapter[] {
  const boundaries = findBoundaries(md);
  if (boundaries.length === 0) {
    return [{ number: 1, rawTitle: "", body: md }];
  }
  const chapters: Chapter[] = [];
  for (let i = 0; i < boundaries.length; i++) {
    const start = boundaries[i].start;
    const end = i + 1 < boundaries.length ? boundaries[i + 1].start : md.length;
    chapters.push({
      number: boundaries[i].number,
      rawTitle: boundaries[i].rawTitle,
      body: md.slice(start, end).trim() + "\n",
    });
  }
  return chapters;
}

function cleanChapterTitle(raw: string): string {
  return raw
    .replace(/^(?:Chapter|CHAPTER)\s+(?:\d+|[IVXLCDM]+)(?:\s*[:\-—]\s*)?/i, "")
    .replace(/^\d{1,3}\.\s+/, "")
    .trim();
}

// ── Book title inference ────────────────────────────────────────────────
function inferBookTitle(md: string, filePath: string): string {
  const h1 = md.match(/^#\s+(.+)$/m);
  if (h1) {
    const candidate = h1[1].trim().replace(/^__([^_]+)__$/, "$1").trim();
    if (!/^chapter\b/i.test(candidate) && candidate.length < 120) return candidate;
  }
  const bold = md.match(/^__([^_\n]+)__\s*$/m);
  if (bold) {
    const candidate = bold[1].trim();
    if (!/^chapter\b/i.test(candidate) && candidate.length < 120) return candidate;
  }
  return basename(filePath, extname(filePath))
    .replace(/_+/g, " ")
    .replace(/[-]+/g, " ")
    .replace(/\bv\d+\b/gi, "")
    .replace(/\bfinal\b/gi, "")
    .replace(/\bcomplete\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

// ── Main ────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.path) {
    console.log(
      "publish-book — split a .docx manuscript into chapter posts.\n\n" +
        "  pnpm publish:book <file.docx>                  dry-run preview\n" +
        "  pnpm publish:book <file.docx> --apply          write to DB\n" +
        "  pnpm publish:book <file.docx> --live           published=true\n" +
        "  pnpm publish:book <file.docx> --title \"X\"      override book title\n" +
        "  pnpm publish:book <file.docx> --track theology canonical track slug\n" +
        "  pnpm publish:book <file.docx> --audience pastors\n" +
        "\nRequires DATABASE_URL when --apply is used."
    );
    return;
  }

  const filePath = resolve(args.path);
  const buffer = readFileSync(filePath);
  const { value: rawMd, messages } = await mammoth.convertToMarkdown(
    { buffer },
    {
      styleMap: [
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
      ],
    }
  );

  const stripped = stripDataImages(cleanMarkdown(rawMd));
  const md = promoteBoldHeadings(stripped.md);
  const bookTitle = args.title ?? inferBookTitle(md, filePath);
  const bookSlug = args.bookSlug ?? slugify(bookTitle);
  const author = args.author ?? "James Bell";
  const pillarTrack = args.track ?? "after-christendom"; // sensible default per new positioning
  const audience = args.audience ?? "individuals";

  const chapters = splitIntoChapters(md);

  console.log(`\n[${basename(filePath)}]`);
  console.log(`  book title:  ${bookTitle}`);
  console.log(`  book slug:   ${bookSlug}`);
  console.log(`  track:       ${pillarTrack}`);
  console.log(`  audience:    ${audience}`);
  console.log(`  chapters:    ${chapters.length}`);
  console.log(`  total words: ${md.trim().split(/\s+/).filter(Boolean).length}`);
  if (stripped.count > 0) {
    console.log(`  warning:     ${stripped.count} embedded image(s) stripped`);
  }
  if (messages.length > 0) {
    console.log(`  mammoth:     ${messages.length} parser notice(s)`);
  }

  console.log(`\n  chapters:`);
  for (const ch of chapters.slice(0, 30)) {
    const title = cleanChapterTitle(ch.rawTitle) || `(no title)`;
    const wc = ch.body.trim().split(/\s+/).filter(Boolean).length;
    console.log(`    Ch ${String(ch.number).padStart(2)} ${wc.toString().padStart(5)} words  ${title.slice(0, 60)}`);
  }
  if (chapters.length > 30) {
    console.log(`    … and ${chapters.length - 30} more`);
  }

  if (!args.apply) {
    console.log(`\n  DRY RUN — re-run with --apply to write to the database.`);
    return;
  }

  if (!process.env.DATABASE_URL) {
    console.error(`\nERROR: DATABASE_URL not set. Cannot write.`);
    process.exit(1);
  }

  const db = drizzle(process.env.DATABASE_URL);

  // 1. Upsert the book row.
  const bookExcerpt = makeExcerpt(chapters[0]?.body ?? md, 400);
  const bookRow: InsertBook = {
    title: bookTitle,
    slug: bookSlug,
    author,
    description: bookExcerpt,
    sampleExcerpt: chapters[0]?.body.slice(0, 6000) ?? null,
    bookType: "authored",
    published: args.live,
    coverImage: args.coverImage ?? null,
    purchaseUrl: args.purchaseUrl ?? null,
    sortOrder: 0,
  };
  const bookUpdate: Partial<InsertBook> = {
    title: bookTitle,
    description: bookExcerpt,
    sampleExcerpt: chapters[0]?.body.slice(0, 6000) ?? null,
    ...(args.coverImage !== undefined && { coverImage: args.coverImage }),
    ...(args.purchaseUrl !== undefined && { purchaseUrl: args.purchaseUrl }),
  };
  await db
    .insert(books)
    .values(bookRow)
    .onDuplicateKeyUpdate({ set: bookUpdate });
  console.log(`  ok: upserted book → ${bookSlug}`);

  // 2. Upsert each chapter as a post.
  let ok = 0;
  let fail = 0;
  for (const ch of chapters) {
    const titleClean = cleanChapterTitle(ch.rawTitle);
    const postTitle = titleClean
      ? `${bookTitle}: Chapter ${ch.number} — ${titleClean}`
      : `${bookTitle}: Chapter ${ch.number}`;
    const postSlug = `${bookSlug}-ch${String(ch.number).padStart(2, "0")}${titleClean ? "-" + slugify(titleClean) : ""}`.slice(0, 200);
    const excerpt = makeExcerpt(ch.body);
    const { minutes, label } = readingTime(ch.body);
    const postRow: InsertPost = {
      title: postTitle,
      slug: postSlug,
      body: ch.body,
      excerpt,
      readTime: label,
      readingTimeMinutes: minutes,
      published: args.live,
      featured: false,
      format: "book-chapter",
      contentType: "general",
      audience_type: "general",
      audience: audience as InsertPost["audience"],
      difficulty: "intermediate",
      pillar: pillarTrack,
      topic: undefined,
      coverImage: args.coverImage ?? null,
      publishedAt: args.live ? new Date() : null,
    };
    const postUpdate: Partial<InsertPost> = {
      title: postTitle,
      body: ch.body,
      excerpt,
      readTime: label,
      readingTimeMinutes: minutes,
      pillar: pillarTrack,
      published: args.live,
      publishedAt: args.live ? new Date() : null,
    };
    try {
      await db.insert(posts).values(postRow).onDuplicateKeyUpdate({ set: postUpdate });
      ok++;
    } catch (e) {
      console.error(`  fail: Ch ${ch.number}: ${(e as Error).message}`);
      fail++;
    }
  }
  console.log(`\n=== ${ok} chapter posts written, ${fail} failed ===`);
  console.log(
    `Inspect: https://www.livewellbyjamesbell.co/books/${bookSlug}` +
      `\nOr a chapter: https://www.livewellbyjamesbell.co/writing/${bookSlug}-ch01...`
  );
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
