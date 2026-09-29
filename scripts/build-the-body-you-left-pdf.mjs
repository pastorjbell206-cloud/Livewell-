/**
 * build-the-body-you-left-pdf.mjs — set the "The Body You Left" manuscript (content/books/the-body-you-left.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/the-body-you-left.pdf).
 * Run:  node scripts/build-the-body-you-left-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/the-body-you-left.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/the-body-you-left.md"),
  out: path.join(ROOT, "api/_ebooks/the-body-you-left.pdf"),
  title: "The Body You Left",
  subtitle: "A Case for the Church in an Age That Walked Away",
  author: "James Bell",
  epigraph: "Now you are the body of Christ, and individually members of it.",
  epigraphBy: "Paul, First Corinthians 12",
});
