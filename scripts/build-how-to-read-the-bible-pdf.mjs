/**
 * build-how-to-read-the-bible-pdf.mjs — set the "How to Read the Bible" manuscript (content/books/how-to-read-the-bible.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/how-to-read-the-bible.pdf).
 * Run:  node scripts/build-how-to-read-the-bible-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/how-to-read-the-bible.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/how-to-read-the-bible.md"),
  out: path.join(ROOT, "api/_ebooks/how-to-read-the-bible.pdf"),
  title: "How to Read the Bible",
  subtitle: "Without Making It Say What You Already Believe",
  author: "James Bell",
  epigraph: "Do your best to present yourself to God as one approved, a worker who has no need to be ashamed, rightly handling the word of truth.",
  epigraphBy: "2 Timothy 2:15",
});
