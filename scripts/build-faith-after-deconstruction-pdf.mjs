/**
 * build-faith-after-deconstruction-pdf.mjs — set the "Faith After Deconstruction" manuscript (content/books/faith-after-deconstruction.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/faith-after-deconstruction.pdf).
 * Run:  node scripts/build-faith-after-deconstruction-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/faith-after-deconstruction.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/faith-after-deconstruction.md"),
  out: path.join(ROOT, "api/_ebooks/faith-after-deconstruction.pdf"),
  title: "Faith After Deconstruction",
  subtitle: "How to Lose the Faith You Were Given and Find the One That Holds",
  author: "James Bell",
  epigraph: "I believe, help my unbelief.",
  epigraphBy: "A father, to Jesus, in Mark 9",
});
