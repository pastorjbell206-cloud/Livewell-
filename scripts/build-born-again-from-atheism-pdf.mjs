/**
 * build-born-again-from-atheism-pdf.mjs — set the "Born Again From Atheism" manuscript (content/books/born-again-from-atheism.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/born-again-from-atheism.pdf).
 * Run:  node scripts/build-born-again-from-atheism-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/born-again-from-atheism.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/born-again-from-atheism.md"),
  out: path.join(ROOT, "api/_ebooks/born-again-from-atheism.pdf"),
  title: "Born Again From Atheism",
  subtitle: "How an Unbeliever Came to Faith, and What He Found There",
  author: "James Bell",
  epigraph: "The steady, unrelenting approach of Him whom I so earnestly desired not to meet.",
  epigraphBy: "C. S. Lewis, Surprised by Joy, 1955",
});
