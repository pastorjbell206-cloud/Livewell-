/**
 * build-babylon-pdf.mjs — set the "Babylon" manuscript (content/books/babylon.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/babylon.pdf).
 * Run:  node scripts/build-babylon-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/babylon.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/babylon.md"),
  out: path.join(ROOT, "api/_ebooks/babylon.pdf"),
  title: "Babylon",
  subtitle: "How to Live When America Stops Being Christian",
  author: "James Bell",
  epigraph: "Build houses and live in them. Plant gardens and eat their produce... But seek the welfare of the city where I have sent you into exile, and pray to the Lord on its behalf, for in its welfare you will find your welfare.",
  epigraphBy: "Jeremiah 29:5, 7",
});
