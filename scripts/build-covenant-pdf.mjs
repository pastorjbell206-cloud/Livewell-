/**
 * build-covenant-pdf.mjs — set the "Covenant" manuscript (content/books/covenant.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/covenant.pdf).
 * Run:  node scripts/build-covenant-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/covenant.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/covenant.md"),
  out: path.join(ROOT, "api/_ebooks/covenant.pdf"),
  title: "Covenant",
  subtitle: "Why Marriage Is a Promise, Not a Deal",
  author: "James Bell",
  epigraph: "It is not your love that sustains the marriage, but from now on, the marriage that sustains your love.",
  epigraphBy: "Dietrich Bonhoeffer, from a wedding sermon written in prison, 1943",
});
