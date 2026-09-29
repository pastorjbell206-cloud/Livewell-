/**
 * build-prophetic-justice-101-pdf.mjs — set the "Prophetic Justice 101" manuscript (content/books/prophetic-justice-101.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/prophetic-justice-101.pdf).
 * Run:  node scripts/build-prophetic-justice-101-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/prophetic-justice-101.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/prophetic-justice-101.md"),
  out: path.join(ROOT, "api/_ebooks/prophetic-justice-101.pdf"),
  title: "Prophetic Justice 101",
  subtitle: "Mishpat, Tsedaqah, and What the Church Owes Its Neighborhood",
  author: "James Bell",
  epigraph: "But let justice roll down like waters, and righteousness like an ever-flowing stream.",
  epigraphBy: "Amos, the prophet, eighth century BC",
});
