/**
 * build-marriage-in-ministry-pdf.mjs — set the "Marriage in Ministry" manuscript (content/books/marriage-in-ministry.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/marriage-in-ministry.pdf).
 * Run:  node scripts/build-marriage-in-ministry-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/marriage-in-ministry.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/marriage-in-ministry.md"),
  out: path.join(ROOT, "api/_ebooks/marriage-in-ministry.pdf"),
  title: "Marriage in Ministry",
  subtitle: "Protecting the Covenant When the Church Demands Everything",
  author: "James Bell",
  epigraph: "Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh.",
  epigraphBy: "Genesis 2, verse 24",
});
