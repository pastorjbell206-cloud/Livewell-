import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { SITE_STATS } from "@/config/siteStats";

/**
 * Consistency guardrails (see CHANGES.md). Fails the build if the book-count
 * single source of truth drifts, or if a hardcoded "twenty-five / 25 books"
 * or stale "160+ essays" literal reappears in the client source.
 */
const CLIENT_SRC = path.resolve(import.meta.dirname, "..", "client", "src");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
  }
  return out;
}

describe("sitewide consistency", () => {
  it("book count single source of truth is 21", () => {
    expect(SITE_STATS.bookCount).toBe(21);
    expect(SITE_STATS.bookCountWord).toBe("twenty-one");
  });

  it("no hardcoded book count or stale essay count in client source", () => {
    const banned = [/twenty-five books/i, /\b25 books\b/, /author of 25 books/i, /160\+\s*essays/i];
    const offenders: string[] = [];
    for (const file of walk(CLIENT_SRC)) {
      if (file.endsWith("consistency.test.ts")) continue;
      const text = readFileSync(file, "utf8");
      for (const re of banned) {
        if (re.test(text)) offenders.push(`${path.relative(CLIENT_SRC, file)} :: ${re}`);
      }
    }
    expect(offenders, `hardcoded counts found:\n${offenders.join("\n")}`).toEqual([]);
  });
});
