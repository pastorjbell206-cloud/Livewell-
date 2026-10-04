/**
 * build-heaven-is-not-your-reward-pdf.mjs — set the "Heaven Is Not Your Reward" manuscript (content/books/heaven-is-not-your-reward.md) as the
 * gated ebook PDF served by /api/download (api/_ebooks/heaven-is-not-your-reward.pdf).
 * Run:  node scripts/build-heaven-is-not-your-reward-pdf.mjs
 *
 * The 6x9 house design on the shared print kit: scripts/pdf-kit/ebook.mjs.
 * Idempotent: overwrites api/_ebooks/heaven-is-not-your-reward.pdf each run.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEbook } from "./pdf-kit/ebook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildEbook({
  src: path.join(ROOT, "content/books/heaven-is-not-your-reward.md"),
  out: path.join(ROOT, "api/_ebooks/heaven-is-not-your-reward.pdf"),
  title: "Heaven Is Not Your Reward",
  subtitle: "The Resurrection Hope the Church Traded for an Escape",
  author: "James Bell",
  epigraph: "Behold, I am making all things new.",
  epigraphBy: "The voice from the throne, Revelation 21",
});
