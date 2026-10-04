import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SOCIAL_QUOTES } from "../client/src/data/social-quotes";

// The Quote Library promises every quote is an exact line from its source and
// links back to it. For essays, hold it to that: when an essay is rewritten or
// merged, its quotes must be re-mined from the text readers will actually find.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (rel: string) => JSON.parse(readFileSync(path.join(root, rel), "utf8"));
const library = new Map<string, string>(
  (readJson("content/static-library.generated.json") as { slug: string; body?: string }[]).map((r) => [r.slug, r.body ?? ""]),
);
const merged: Record<string, string> = readJson("content/rewrites.generated.json").merged;

const norm = (s: string) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

describe("the Quote Library's essay quotes", () => {
  const essayQuotes = SOCIAL_QUOTES.filter((q) => (q.sourceType ?? "essay") === "essay");

  it("never link to an essay that has been merged away", () => {
    for (const q of essayQuotes) expect(merged[q.articleSlug], `${q.articleSlug} is merged into ${merged[q.articleSlug]}`).toBeUndefined();
  });

  it("are exact lines from the essay they link to", () => {
    for (const q of essayQuotes) {
      const body = library.get(q.articleSlug);
      if (body === undefined) continue; // essays outside the static library are checked elsewhere
      const text = norm(q.text).replace(/[.,;:?!]+$/, "");
      expect(norm(body).includes(text), `"${q.text.slice(0, 70)}…" is not in /writing/${q.articleSlug}`).toBe(true);
    }
  });
});
