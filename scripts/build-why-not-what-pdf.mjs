/**
 * build-why-not-what-pdf.mjs — set the "Why Not What" manuscript (content/books/why-not-what.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/why-not-what.pdf).
 * Run:  node scripts/build-why-not-what-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/why-not-what.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/why-not-what.md"),
  out: path.join(ROOT, "api/_ebooks/why-not-what.pdf"),
  title: "Why Not What",
  subtitle: "How Theology Starts With the Right Question",
  author: "James Bell",
  epigraph: "You have made us for yourself, and our heart is restless until it rests in you.",
  epigraphBy: "Augustine, Confessions, 397",
});
