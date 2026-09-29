import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Consistency guardrails. James decided (29 Sept 2026) that the site states no
 * count of his books: it says "author" and lists them at /books. These fail the
 * build if an author-count claim ("21 books", "twenty-one titles", "author of
 * 25 books") or a stale "160+ essays" literal reappears in the client source,
 * the prerendered heads, llms.txt, or CLAUDE.md. Counts of other books are
 * facts ("the 27 books of the New Testament", "forty-eight books is the plan").
 */
const CLIENT_SRC = path.resolve(import.meta.dirname, "..", "client", "src");
const ROOT = path.resolve(import.meta.dirname, "..");
const AUTHOR_COUNT =
  /\b(?:author of|has written|have written|I have|wrote)\s+(?:\d+|(?:twenty|thirty|forty)(?:-[a-z]+)?|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen)\s+(?:books|titles)\b|\b(?:21|twenty-one|25|twenty-five)\s+(?:books|titles|published titles)\b/i;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx|json)$/.test(entry)) out.push(full);
  }
  return out;
}

describe("sitewide consistency", () => {
  it("no author book count or stale essay count in client source", () => {
    const offenders: string[] = [];
    for (const file of walk(CLIENT_SRC)) {
      const text = readFileSync(file, "utf8");
      if (AUTHOR_COUNT.test(text)) offenders.push(`${path.relative(CLIENT_SRC, file)} :: ${text.match(AUTHOR_COUNT)![0]}`);
      if (/160\+\s*essays/i.test(text)) offenders.push(`${path.relative(CLIENT_SRC, file)} :: 160+ essays`);
    }
    expect(offenders, `book counts found:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("the prerendered heads, llms.txt and CLAUDE.md state no book count", () => {
    for (const rel of ["scripts/prerender-heads.mjs", "client/public/llms.txt", "CLAUDE.md"]) {
      const text = readFileSync(path.join(ROOT, rel), "utf8");
      expect(text.match(AUTHOR_COUNT)?.[0], rel).toBeUndefined();
    }
  });

  it("the pattern catches the old claims and spares other counts", () => {
    for (const bad of ["author of 21 books", "has written twenty-one books", "Twenty-one titles, several", "I have twenty-one books"]) expect(bad).toMatch(AUTHOR_COUNT);
    for (const ok of ["the 27 books of the New Testament", "Forty-eight books is the plan", "sixty-six books of the Bible"]) expect(ok).not.toMatch(AUTHOR_COUNT);
  });
});
