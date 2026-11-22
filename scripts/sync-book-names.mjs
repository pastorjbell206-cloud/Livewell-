#!/usr/bin/env node
/**
 * sync-book-names.mjs: makes a book's rename ONE data change.
 *
 * client/src/data/book-names.json holds, for each book James is renaming, the
 * name in use (slug, title, subtitle) and every earlier name (`was`). This
 * script carries the name in use to every file that prints it:
 *
 *   - the pages, lists and data files in FILES: "/books/<old slug>" becomes
 *     "/books/<slug>", the old title becomes the title, the old subtitle the
 *     subtitle, and the book's slug where it is used as a key;
 *   - client/src/App.tsx: one redirect stub per old address;
 *   - vercel.json: one permanent redirect per old address, and any rule that
 *     pointed at an old address now points at the new one (one hop);
 *   - client/src/data/ebooks.ts: the "Published earlier as" line (`formerly`),
 *     present while the title printed in the file differs from the title;
 *   - the pathways index, rebuilt.
 *
 *   node scripts/sync-book-names.mjs          write
 *   node scripts/sync-book-names.mjs --check  fail if anything would change
 *
 * It does not touch the PDF or EPUB, the essays, the database, or the old
 * Stripe ebook list in api/index.ts. Afterwards run
 * `node scripts/build-covers.mjs` and `pnpm run search:index`.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = process.argv.includes("--check");

/** Every file that prints a book's name or address as plain text. */
const FILES = [
  "client/src/data/ebooks.ts",
  "client/src/data/answers.ts",
  "client/src/lib/bookShelf.ts",
  "client/src/lib/siteCatalog.ts",
  "client/src/lib/siteNav.test.tsx",
  "client/src/components/KeepReadingBook.tsx",
  "client/src/App.tsx",
  "client/src/pages/Books.tsx",
  "client/src/pages/BlindSpots.tsx",
  "client/src/pages/WhenGodBlessAmerica.tsx",
  "client/src/pages/Believe.tsx",
  "client/src/pages/BibleAndHomosexuality.tsx",
  "client/src/pages/BibleAndTransgenderIdentity.tsx",
  "client/src/pages/IsCriticalRaceTheoryBiblical.tsx",
  "client/src/pages/TheReliabilityOfScripture.tsx",
  "client/src/pages/DeconstructionOfFaith.tsx",
  "client/src/pages/WhereYourTreasureIs.tsx",
  "client/src/pages/Diagnostic.tsx",
  "client/src/pages/HistoricFaith.tsx",
  "client/src/pages/StartHereQuiz.tsx",
  "client/src/pages/landing/FaithCrisis.tsx",
  "client/public/llms.txt",
  "client/public/pathways/christian-nationalism.json",
  "scripts/build-catalogue.mjs",
  "scripts/generate-sitemap.mjs",
  "scripts/prerender-heads.mjs",
];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

const { books } = JSON.parse(read("client/src/data/book-names.json"));
const changed = [];
const problems = [];

function put(rel, next) {
  if (next === read(rel)) return;
  changed.push(rel);
  if (!CHECK) fs.writeFileSync(path.join(ROOT, rel), next);
}

/** The plain-text carry: old address, old title, old subtitle, old key. */
function carry(text, book, rel) {
  let out = text;
  for (const old of book.was) {
    if (old.slug !== book.slug) {
      // The address, but not a file beside it (a cover) or its old thank-you page.
      out = out.replace(new RegExp(`/books/${esc(old.slug)}(?![\\w./-])`, "g"), `/books/${book.slug}`);
      // The slug as a key, in the forms the code uses.
      for (const [before, after] of [
        ["slug: \"", "\""],
        ["book: \"", "\""],
        ["shelfBook(\"", "\")"],
        ["freeEbook(\"", "\")"],
        [".toBe(\"", "\")"],
        ["slug=\"", "\""],
        ["[\"", "\", \""],
      ]) {
        out = out.split(`${before}${old.slug}${after}`).join(`${before}${book.slug}${after}`);
      }
      // A slug inside a set literal of shelf books: new Set(["a", "b"]).
      out = out.replace(/new Set\(\[([^\]]*)\]\)/g, (m, inner) =>
        inner.includes('"believe"') ? `new Set([${inner.split(`"${old.slug}"`).join(`"${book.slug}"`)}])` : m
      );
    }
    for (const [from, to] of [
      [old.title, book.title],
      [old.subtitle, book.subtitle],
    ]) {
      if (!from || from === to) continue;
      out = out
        .split("\n")
        .map((line) => (/^\s*(formerly|fileTitle):/.test(line) || line.includes("published earlier as") ? line : line.split(from).join(to)))
        .join("\n");
    }
  }
  if (rel === "client/src/data/ebooks.ts") out = formerly(out, book);
  return out;
}

/** In ebooks.ts: `formerly` is there exactly while the file's title is not the site's. */
function formerly(text, book) {
  const head = `    slug: "${book.slug}",\n    title: ${JSON.stringify(book.title)},\n`;
  const at = text.indexOf(head);
  if (at < 0) {
    problems.push(`client/src/data/ebooks.ts has no entry that begins slug: "${book.slug}", title: ${JSON.stringify(book.title)}`);
    return text;
  }
  const after = at + head.length;
  const rest = text.slice(after).replace(/^ {4}formerly: "[^"\n]*",\n/, "");
  const line = book.fileTitle && book.fileTitle !== book.title ? `    formerly: ${JSON.stringify(book.fileTitle)},\n` : "";
  return text.slice(0, after) + line + rest;
}

/** Old addresses as [from, to], in a stable order. */
const moves = books.flatMap((b) => b.was.filter((o) => o.slug !== b.slug).map((o) => [`/books/${o.slug}`, `/books/${b.slug}`]));

function between(text, start, end, body, rel) {
  const a = text.indexOf(start);
  const b = text.indexOf(end);
  if (a < 0 || b < 0 || b < a) {
    problems.push(`${rel}: the markers ${start} and ${end} are missing`);
    return text;
  }
  const lineEnd = text.indexOf("\n", a) + 1;
  const lineStart = text.lastIndexOf("\n", b) + 1;
  return text.slice(0, lineEnd) + body + text.slice(lineStart);
}

function appStubs(text) {
  const consts = moves.map(([, to], i) => `const RenamedBook${i} = redirectTo(${JSON.stringify(to)});\n`).join("");
  const routes = moves.map(([from], i) => `        <Route path=${JSON.stringify(from)} component={RenamedBook${i}} />\n`).join("");
  let out = between(text, "// RENAMED-BOOKS:CONSTS:START", "// RENAMED-BOOKS:CONSTS:END", consts, "client/src/App.tsx");
  out = between(out, "{/* RENAMED-BOOKS:ROUTES:START", "{/* RENAMED-BOOKS:ROUTES:END", routes, "client/src/App.tsx");
  return out;
}

function vercelRedirects(text) {
  let out = text;
  // A rule that sent readers to an old address now sends them to the new one.
  for (const [from, to] of moves) {
    out = out
      .split("\n")
      .map((line) => (line.includes('"destination"') ? line.replace(new RegExp(`"${esc(from)}"`), `"${to}"`) : line))
      .join("\n");
  }
  for (const [from, to] of moves) {
    const rule = new RegExp(`"source": "${esc(from)}",\\s*"destination": "([^"]*)"`);
    const found = out.match(rule);
    if (found) {
      if (found[1] !== to) out = out.replace(rule, `"source": "${from}",\n      "destination": "${to}"`);
      continue;
    }
    const anchor = out.indexOf('"source": "/books/');
    const open = anchor < 0 ? -1 : out.lastIndexOf("    {\n", anchor);
    if (open < 0) {
      problems.push("vercel.json: no /books/ redirect to place the new rule beside");
      continue;
    }
    out = `${out.slice(0, open)}    {\n      "source": "${from}",\n      "destination": "${to}",\n      "permanent": true\n    },\n${out.slice(open)}`;
  }
  return out;
}

for (const rel of FILES) {
  if (!fs.existsSync(path.join(ROOT, rel))) {
    problems.push(`${rel} is in the list and is not on disk`);
    continue;
  }
  let text = read(rel);
  for (const book of books) text = carry(text, book, rel);
  if (rel === "client/src/App.tsx") text = appStubs(text);
  put(rel, text);
}
put("vercel.json", vercelRedirects(read("vercel.json")));

// Every book's name in use must be where the shelf and the downloads read it.
for (const book of books) {
  if (!read("client/src/lib/bookShelf.ts").includes(`href: "/books/${book.slug}"`)) problems.push(`client/src/lib/bookShelf.ts does not list /books/${book.slug}`);
  if (!read("client/src/App.tsx").includes(`<Route path="/books/${book.slug}" `)) problems.push(`client/src/App.tsx has no route for /books/${book.slug}`);
}

if (problems.length) {
  for (const p of problems) console.error(`[book-names] ${p}`);
  process.exit(1);
}
if (CHECK) {
  if (changed.length) {
    console.error(`[book-names] out of step with client/src/data/book-names.json: ${changed.join(", ")}. Run node scripts/sync-book-names.mjs`);
    process.exit(1);
  }
  console.log(`[book-names] in step (${books.length} books, ${moves.length} old ${moves.length === 1 ? "address" : "addresses"})`);
} else {
  if (changed.includes("client/public/pathways/christian-nationalism.json")) {
    spawnSync(process.execPath, [path.join(ROOT, "scripts/build-pathways-index.mjs")], { stdio: "inherit" });
  }
  console.log(changed.length ? `[book-names] wrote ${changed.join(", ")}` : "[book-names] nothing to change");
  if (changed.length) console.log("[book-names] now run: node scripts/build-covers.mjs && pnpm run search:index");
}
