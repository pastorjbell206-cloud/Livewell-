/**
 * build-healwell-pdf.mjs — set the "HealWell" manuscript (content/books/healwell.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/healwell.pdf).
 * Run:  node scripts/build-healwell-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/healwell.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/healwell.md"),
  out: path.join(ROOT, "api/_ebooks/healwell.pdf"),
  title: "HealWell",
  subtitle: "52 Weeks in Costly Hope",
  author: "James Bell",
  epigraph: "He heals the brokenhearted and binds up their wounds.",
  epigraphBy: "Psalm 147, verse 3",
});
