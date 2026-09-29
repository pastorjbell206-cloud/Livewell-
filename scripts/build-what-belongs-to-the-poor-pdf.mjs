/**
 * build-what-belongs-to-the-poor-pdf.mjs — set the "What Belongs to the Poor" manuscript (content/books/what-belongs-to-the-poor.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/what-belongs-to-the-poor.pdf).
 * Run:  node scripts/build-what-belongs-to-the-poor-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/what-belongs-to-the-poor.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/what-belongs-to-the-poor.md"),
  out: path.join(ROOT, "api/_ebooks/what-belongs-to-the-poor.pdf"),
  title: "What Belongs to the Poor",
  subtitle: "What the Ancient Church Knew About Wealth and Justice",
  author: "James Bell",
  epigraph: "The bread you are storing up belongs to the hungry. The cloak kept in your closet belongs to the naked. The money you have buried belongs to the poor.",
  epigraphBy: "Basil of Caesarea",
});
