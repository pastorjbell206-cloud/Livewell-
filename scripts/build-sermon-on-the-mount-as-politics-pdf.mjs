/**
 * build-sermon-on-the-mount-as-politics-pdf.mjs — set the "The Sermon on the Mount as Politics" manuscript (content/books/sermon-on-the-mount-as-politics.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/sermon-on-the-mount-as-politics.pdf).
 * Run:  node scripts/build-sermon-on-the-mount-as-politics-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/sermon-on-the-mount-as-politics.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/sermon-on-the-mount-as-politics.md"),
  out: path.join(ROOT, "api/_ebooks/sermon-on-the-mount-as-politics.pdf"),
  title: "The Sermon on the Mount as Politics",
  subtitle: "Reading the Kingdom's Constitution Without the Spiritualizing",
  author: "James Bell",
  epigraph: "The Sermon on the Mount is the most complete delineation anywhere in the New Testament of the Christian counter-culture.",
  epigraphBy: "John Stott, 1978",
});
