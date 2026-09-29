/**
 * build-the-god-who-is-not-nice-pdf.mjs — set the "The God Who Is Not Nice" manuscript (content/books/the-god-who-is-not-nice.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/the-god-who-is-not-nice.pdf).
 * Run:  node scripts/build-the-god-who-is-not-nice-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/the-god-who-is-not-nice.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/the-god-who-is-not-nice.md"),
  out: path.join(ROOT, "api/_ebooks/the-god-who-is-not-nice.pdf"),
  title: "The God Who Is Not Nice",
  subtitle: "Recovering the Weight of God in a Sentimental Age",
  author: "James Bell",
  epigraph: "What comes into our minds when we think about God is the most important thing about us.",
  epigraphBy: "A. W. Tozer, The Knowledge of the Holy, 1961",
});
