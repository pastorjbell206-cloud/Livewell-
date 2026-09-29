/**
 * build-alone-pdf.mjs — set the "Alone in a Crowded Church" manuscript (content/books/alone-in-a-crowded-church.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/alone-in-a-crowded-church.pdf).
 * Run:  node scripts/build-alone-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/alone-in-a-crowded-church.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/alone-in-a-crowded-church.md"),
  out: path.join(ROOT, "api/_ebooks/alone-in-a-crowded-church.pdf"),
  title: "Alone in a Crowded Church",
  subtitle: "Why Pastors Burn Out in Silence, and How Brotherhood Brings Them Back",
  author: "James Bell",
  epigraph: "Let him who cannot be alone beware of community. Let him who is not in community beware of being alone.",
  epigraphBy: "Dietrich Bonhoeffer, Life Together",
});
