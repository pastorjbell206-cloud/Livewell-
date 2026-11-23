/**
 * The renamed books (James, 2026-11-22) and the covers.
 *
 *  - a book's name in use is on its page, the shelf and the downloads
 *  - every earlier address goes to the present one in one hop, in vercel.json
 *    and as a stub in App.tsx, and nothing redirects to an old address
 *  - the old title is on no page except as "Published earlier as ..."
 *  - while the file still carries the old title, the card says so; once the
 *    file is rebuilt under the new one (both were, on 2026-11-23, by
 *    scripts/build-book-files.mjs) the card says nothing and the book's own
 *    page keeps the short "Published earlier as <old title>."
 *  - the rebuilt files are served under the new name, each old file address
 *    goes there in one hop, and the original files are kept, unserved
 *  - every listed ebook and booklet has a drawn cover at the sizes the pages
 *    use; no held book has one
 *  - scripts/sync-book-names.mjs and scripts/build-covers.mjs agree with what
 *    is committed (the same checks the content gates run)
 */
import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import NAMES from "./book-names.json";
import COVERS from "./covers.json";
import { FREE_EBOOKS, HELD_EBOOKS, freeEbook } from "./ebooks";
import { BOOKLETS, HELD_BOOKLETS } from "./booklets";
import { BOOK_SHELF } from "@/lib/bookShelf";
import { SHELF_ITEMS } from "@/lib/shelfItems";
import { DOWNLOAD_KINDS } from "@shared/downloads";
import { earlierLine, formerlyLine } from "@/components/FreeEbookButtons";

const ROOT = path.resolve(__dirname, "../../..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const RULES: { source: string; destination: string }[] = JSON.parse(read("vercel.json")).redirects;
const APP = read("client/src/App.tsx");

describe("the renamed books", () => {
  it("James's two renames are the names in use", () => {
    const byId = new Map(NAMES.books.map((b) => [b.id, b]));
    expect(byId.get("the-monster-in-the-mirror")).toMatchObject({ slug: "blind-spots", title: "Blind Spots" });
    expect(byId.get("when-god-bless-america")).toMatchObject({ slug: "a-higher-allegiance", title: "A Higher Allegiance", subtitle: "Reclaiming Jesus from American Politics" });
  });

  it.each(NAMES.books)("$title: on its page, the shelf and the downloads", (book) => {
    const ebook = freeEbook(book.slug);
    expect(ebook?.title).toBe(book.title);
    expect(ebook?.page).toBe(`/books/${book.slug}`);
    expect(ebook?.pdf.startsWith(`/ebook/${book.id}/`)).toBe(true);
    expect(BOOK_SHELF.find((b) => b.slug === book.slug)).toMatchObject({ title: book.title, sub: book.subtitle, href: `/books/${book.slug}` });
    expect(APP).toContain(`<Route path="/books/${book.slug}" `);
  });

  it.each(NAMES.books.flatMap((b) => b.was.map((old) => ({ old, book: b }))))("$old.slug goes to its book in one hop", ({ old, book }) => {
    const from = `/books/${old.slug}`;
    const to = `/books/${book.slug}`;
    const rules = RULES.filter((r) => r.source === from);
    expect(rules).toHaveLength(1);
    expect(rules[0].destination).toBe(to);
    // One hop: where it lands is not itself redirected.
    expect(RULES.some((r) => r.source === to)).toBe(false);
    // Nothing else on the site still redirects to the old address.
    expect(RULES.filter((r) => r.destination === from)).toHaveLength(0);
    expect(APP).toMatch(new RegExp(`<Route path="${from}" component=\\{RenamedBook\\d+Redirect\\} />`));
    expect(APP).toContain(`redirectTo("${to}")`);
  });

  it("the old title is said only as \"Published earlier as\": on the card only while the file still carries it", () => {
    for (const book of NAMES.books) {
      const ebook = freeEbook(book.slug)!;
      if (book.fileTitle !== book.title) expect(ebook.formerly).toBe(book.fileTitle);
      else expect(ebook.formerly).toBeUndefined();
      const item = SHELF_ITEMS.find((i) => i.folder === book.id)!;
      expect(item.formerly).toBe(ebook.formerly);
      // The book's own page always names the title it had before.
      const was = book.was[book.was.length - 1].title;
      expect(earlierLine(ebook)).toBe(ebook.formerly ? formerlyLine(ebook.formerly) : `Published earlier as ${was}.`);
    }
    // Both files now carry the new titles (rebuilt 2026-11-23), so no card says otherwise.
    expect(NAMES.books.every((b) => b.fileTitle === b.title)).toBe(true);
    expect(earlierLine({ slug: "believe" })).toBeNull();
  });

  it.each(NAMES.books)("$title: its files are served under its name, and the old file names go there in one hop", (book) => {
    const ebook = freeEbook(book.slug)!;
    const meta = JSON.parse(read(`content/books-src/${book.id}/book.json`));
    for (const kind of ["pdf", "epub"] as const) {
      const served = ebook[kind]!;
      expect(served).toBe(`/ebook/${book.id}/${meta.files[kind]}`);
      expect(fs.existsSync(path.join(ROOT, "client/public", served)), served).toBe(true);
      const old = `/ebook/${book.id}/${meta.original[kind]}`;
      expect(old).not.toBe(served);
      expect(fs.existsSync(path.join(ROOT, "client/public", old)), old).toBe(false);
      const rules = RULES.filter((r) => r.source === old);
      expect(rules, old).toHaveLength(1);
      expect(rules[0].destination).toBe(served);
      expect(RULES.some((r) => r.source === served)).toBe(false);
      // The original file is kept, outside the served folder.
      expect(fs.existsSync(path.join(ROOT, "content/held-downloads/originals", meta.original[kind])), meta.original[kind]).toBe(true);
    }
  });

  it("every page, list, script and redirect is in step with the one data file", () => {
    const out = spawnSync(process.execPath, [path.join(ROOT, "scripts/sync-book-names.mjs"), "--check"], { encoding: "utf8" });
    expect(out.stderr + out.stdout).toMatch(/in step/);
    expect(out.status).toBe(0);
  });
});

describe("the covers", () => {
  const drawn = new Map(COVERS.books.map((c) => [c.id, c]));
  const folder = (pdf: string) => pdf.split("/")[2];

  it("every listed ebook and booklet has one, at the sizes the pages use", () => {
    for (const b of [...FREE_EBOOKS, ...BOOKLETS]) {
      const id = folder(b.pdf);
      expect(drawn.has(id), id).toBe(true);
      for (const file of [`${id}-400.webp`, `${id}-800.webp`, `${id}.jpg`]) {
        expect(fs.existsSync(path.join(ROOT, "client/public/covers", file)), file).toBe(true);
      }
    }
    expect(drawn.size).toBe(FREE_EBOOKS.length + BOOKLETS.length);
  });

  it("each says what its picture shows, and draws from a known ground and tone", () => {
    for (const c of COVERS.books) {
      expect(c.alt.length, c.id).toBeGreaterThan(20);
      expect(["light", "dark"]).toContain(c.ground);
      expect(["blue", "olive", "clay"]).toContain(c.tone);
      expect(["book", "booklet"]).toContain(c.form);
    }
  });

  it("no held book has a cover", () => {
    for (const b of HELD_EBOOKS) expect(drawn.has(b.slug), b.slug).toBe(false);
    for (const b of HELD_BOOKLETS) expect(drawn.has(folder(b.pdf)), b.slug).toBe(false);
  });

  it("every kind of printable has its card", () => {
    const kinds = new Set(COVERS.kinds.map((k) => k.id));
    for (const kind of Object.keys(DOWNLOAD_KINDS).filter((k) => k !== "ebook")) {
      expect(kinds.has(kind), kind).toBe(true);
      expect(fs.existsSync(path.join(ROOT, "client/public/covers", `kind-${kind}-400.webp`)), kind).toBe(true);
    }
  });

  it("the committed covers are what the data draws today", () => {
    const out = spawnSync(process.execPath, [path.join(ROOT, "scripts/build-covers.mjs"), "--check"], { encoding: "utf8" });
    expect(out.stderr + out.stdout).toMatch(/in step/);
    expect(out.status).toBe(0);
  }, 60_000);

  it("no component names a colour: the covers resolve the tokens themselves", () => {
    for (const rel of ["client/src/components/BookCard.tsx", "client/src/components/bookshelf.css", "client/src/components/download-gift.css", "client/src/components/DownloadGiftSheet.tsx", "client/src/lib/covers.ts"]) {
      expect(read(rel), rel).not.toMatch(/#[0-9a-fA-F]{3,8}\b|rgba?\(/);
    }
  });
});
