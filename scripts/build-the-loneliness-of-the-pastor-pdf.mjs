/**
 * build-the-loneliness-of-the-pastor-pdf.mjs — set the "The Loneliness of the Pastor" manuscript (content/books/the-loneliness-of-the-pastor.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/the-loneliness-of-the-pastor.pdf).
 * Run:  node scripts/build-the-loneliness-of-the-pastor-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/the-loneliness-of-the-pastor.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/the-loneliness-of-the-pastor.md"),
  out: path.join(ROOT, "api/_ebooks/the-loneliness-of-the-pastor.pdf"),
  title: "The Loneliness of the Pastor",
  subtitle: "Why Pastors Quit, and the Brotherhood That Could Let Them Stay",
  author: "James Bell",
  epigraph: "It is enough; now, O Lord, take away my life, for I am no better than my fathers.",
  epigraphBy: "Elijah, under the broom tree, First Kings 19",
});
