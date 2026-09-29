/**
 * build-prayer-in-the-dark-pdf.mjs — set the "Prayer in the Dark" manuscript (content/books/prayer-in-the-dark.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/prayer-in-the-dark.pdf).
 * Run:  node scripts/build-prayer-in-the-dark-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/prayer-in-the-dark.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/prayer-in-the-dark.md"),
  out: path.join(ROOT, "api/_ebooks/prayer-in-the-dark.pdf"),
  title: "Prayer in the Dark",
  subtitle: "Talking to God When You Are Not Sure Anyone Is Listening",
  author: "James Bell",
  epigraph: "The Spirit helps us in our weakness. We do not know what to pray for as we ought, but the Spirit himself intercedes for us with groanings too deep for words.",
  epigraphBy: "Paul, Romans 8",
});
