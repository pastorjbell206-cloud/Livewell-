/**
 * build-be-true-to-yourself-pdf.mjs — set the "Be True to Yourself" manuscript (content/books/be-true-to-yourself.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/be-true-to-yourself.pdf).
 * Run:  node scripts/build-be-true-to-yourself-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/be-true-to-yourself.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/be-true-to-yourself.md"),
  out: path.join(ROOT, "api/_ebooks/be-true-to-yourself.pdf"),
  title: "Be True to Yourself",
  subtitle: "The Lie That Ate the World",
  author: "James Bell",
  epigraph: "You are not your own, for you were bought with a price.",
  epigraphBy: "1 Corinthians 6:19-20",
});
