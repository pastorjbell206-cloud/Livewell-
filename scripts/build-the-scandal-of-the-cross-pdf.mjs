/**
 * build-the-scandal-of-the-cross-pdf.mjs — set the "The Scandal of the Cross" manuscript (content/books/the-scandal-of-the-cross.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/the-scandal-of-the-cross.pdf).
 * Run:  node scripts/build-the-scandal-of-the-cross-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/the-scandal-of-the-cross.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/the-scandal-of-the-cross.md"),
  out: path.join(ROOT, "api/_ebooks/the-scandal-of-the-cross.pdf"),
  title: "The Scandal of the Cross",
  subtitle: "Why the Death of God Is the Center of Everything",
  author: "James Bell",
  epigraph: "We preach Christ crucified, a stumbling block to Jews and folly to Gentiles, but to those who are called, the power of God and the wisdom of God.",
  epigraphBy: "Paul, First Corinthians 1",
});
