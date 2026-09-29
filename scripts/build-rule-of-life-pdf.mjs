/**
 * build-rule-of-life-pdf.mjs — set the "Rule of Life" manuscript (content/books/rule-of-life.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/rule-of-life.pdf).
 * Run:  node scripts/build-rule-of-life-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/rule-of-life.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/rule-of-life.md"),
  out: path.join(ROOT, "api/_ebooks/rule-of-life.pdf"),
  title: "Rule of Life",
  subtitle: "The Ancient Art of Forming a Soul in an Age Built to Deform It",
  author: "James Bell",
  epigraph: "Do not be conformed to this world, but be transformed by the renewal of your mind.",
  epigraphBy: "Romans 12:2",
});
