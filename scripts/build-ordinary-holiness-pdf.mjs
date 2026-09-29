/**
 * build-ordinary-holiness-pdf.mjs — set the "Ordinary Holiness" manuscript (content/books/ordinary-holiness.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/ordinary-holiness.pdf).
 * Run:  node scripts/build-ordinary-holiness-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/ordinary-holiness.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/ordinary-holiness.md"),
  out: path.join(ROOT, "api/_ebooks/ordinary-holiness.pdf"),
  title: "Ordinary Holiness",
  subtitle: "Finding God in the Life You Actually Have",
  author: "James Bell",
  epigraph: "The world is charged with the grandeur of God.",
  epigraphBy: "Gerard Manley Hopkins, 1877",
});
