import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  BRAND_SENTENCE,
  META_DESCRIPTION,
  PRIMARY_SUBHEAD,
  PRIMARY_SUBHEAD_SHORT,
} from "@/lib/positioning";

// ---------------------------------------------------------------------------
// One sentence, one spelling.
//
// The homepage description existed as four hand-copies that had all drifted
// apart: positioning.ts (the client), scripts/prerender-heads.mjs FALLBACK_DESC
// (what crawlers and social scrapers get), api/index.ts (the RSS channel), and
// client/index.html (dev and any non-prerendered route). The prerender script
// and the serverless entry cannot import positioning.ts, so the copies are
// structural, not accidental — which means they will drift again without a
// test. This pins them byte-for-byte to BRAND_SENTENCE.
//
// It also pins the wordmark. The Substack was "Livewell" and the site
// "LiveWell"; six files in this repo carried the Substack spelling.
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const read = (rel: string) => readFileSync(path.join(repoRoot, rel), "utf8");

/**
 * Files allowed to contain the one-capital spelling, each with a reason.
 * Keep this list short and honest.
 */
const LIVEWELL_SPELLING_ALLOWLIST = new Map<string, string>([
  // Quotations attributed to named public figures. Respelling a quote is a
  // fidelity problem; removing unverified attributed quotes is a content
  // decision for the author, not a search-and-replace. Flagged in
  // docs/BRAND-ALIGNMENT-DELIVERABLES.md.
  ["server/seed-testimonials.ts", "attributed quotations — author's call"],
  ["server/seed-testimonials.mjs", "attributed quotations — author's call"],
]);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (e === "node_modules" || e === "dist" || e === ".vite") continue;
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|mjs|html)$/.test(full)) out.push(full);
  }
  return out;
}

describe("brand sentence", () => {
  it("is the same string in every module that can import it", () => {
    expect(PRIMARY_SUBHEAD).toBe(BRAND_SENTENCE);
    expect(PRIMARY_SUBHEAD_SHORT).toBe(BRAND_SENTENCE);
    expect(META_DESCRIPTION).toBe(BRAND_SENTENCE);
  });

  it("is mirrored byte-for-byte in the prerender script", () => {
    const m = read("scripts/prerender-heads.mjs").match(/const FALLBACK_DESC =\s*\n?\s*"([^"]+)";/);
    expect(m, "FALLBACK_DESC not found in scripts/prerender-heads.mjs").not.toBeNull();
    expect(m![1]).toBe(BRAND_SENTENCE);
  });

  it("is mirrored byte-for-byte in the prod RSS channel description", () => {
    const src = read("api/index.ts");
    const start = src.indexOf("async function rssLiveWell");
    expect(start, "rssLiveWell not found in api/index.ts").toBeGreaterThan(-1);
    const m = src.slice(start).match(/const DESC = "([^"]+)";/);
    expect(m, "RSS DESC not found in rssLiveWell").not.toBeNull();
    expect(m![1]).toBe(BRAND_SENTENCE);
  });

  it("is mirrored in all three index.html descriptions", () => {
    const html = read("client/index.html");
    const pick = (re: RegExp) => html.match(re)?.[1];
    expect(pick(/<meta name="description" content="([^"]+)"/)).toBe(BRAND_SENTENCE);
    expect(pick(/<meta property="og:description" content="([^"]+)"/)).toBe(BRAND_SENTENCE);
    expect(pick(/<meta name="twitter:description" content="([^"]+)"/)).toBe(BRAND_SENTENCE);
  });

  it("is not a list of subjects and is within the Substack's length", () => {
    const words = BRAND_SENTENCE.split(/\s+/).filter((w) => w !== "—").length;
    expect(words).toBeLessThanOrEqual(26);
    // A subject list reads "theology, politics, marriage, parenting, ..." — three
    // or more comma-separated nouns in a row. One comma is the sentence's hinge.
    expect((BRAND_SENTENCE.match(/,/g) ?? []).length).toBeLessThanOrEqual(2);
  });
});

describe("brand wordmark", () => {
  it('is spelled "LiveWell" everywhere except allowlisted attributed quotations', () => {
    const files = ["client/src", "client/index.html", "server", "api", "scripts"]
      .map((p) => path.join(repoRoot, p))
      .flatMap((p) => (statSync(p).isDirectory() ? walk(p) : [p]));
    expect(files.length, "walker read too few files to be trusted").toBeGreaterThan(100);

    const offenders: string[] = [];
    for (const f of files) {
      const rel = path.relative(repoRoot, f);
      if (LIVEWELL_SPELLING_ALLOWLIST.has(rel)) continue;
      if (rel === "server/brand-sentence.test.ts") continue; // this file names the misspelling on purpose
      const lines = readFileSync(f, "utf8").split("\n");
      lines.forEach((line, i) => {
        // Case-sensitive: "Livewell" (one capital). "LiveWell", "livewell.com",
        // "livewellbyjamesbell.co", and the Substack handle are all fine.
        if (/\bLivewell\b/.test(line)) offenders.push(`${rel}:${i + 1}: ${line.trim().slice(0, 100)}`);
      });
    }
    expect(
      offenders,
      `The wordmark is "LiveWell". These lines spell it "Livewell":\n  ${offenders.join("\n  ")}\n`,
    ).toEqual([]);
  });

  it("allowlist has no stale entries", () => {
    for (const [rel] of LIVEWELL_SPELLING_ALLOWLIST) {
      const src = read(rel);
      expect(/\bLivewell\b/.test(src), `${rel} is allowlisted but no longer contains "Livewell" — remove it`).toBe(true);
    }
  });
});
