import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// ---------------------------------------------------------------------------
// Static-library mirror guard.
//
// The essay library is stored twice on purpose: content/static-library.
// generated.json (dev reads it; the sitemap, prerender, and validators walk
// it) and api/static-library.generated.ts (the self-contained prod function
// bundles it). scripts/build-static-library.mjs writes both in one run — but
// nothing stopped a hand edit or a partial regeneration from letting them
// drift, and drift means dev and production serve different essays under the
// same slug. This test fails CI the moment the two stores disagree.
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

interface Essay {
  slug: string;
  [key: string]: unknown;
}

function loadJsonStore(): Essay[] {
  return JSON.parse(readFileSync(path.join(repoRoot, "content/static-library.generated.json"), "utf8"));
}

function loadTsStore(): Essay[] {
  const src = readFileSync(path.join(repoRoot, "api/static-library.generated.ts"), "utf8");
  const start = src.indexOf("= [");
  const end = src.lastIndexOf("];");
  expect(start, "api/static-library.generated.ts no longer contains an array literal").toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return JSON.parse(src.slice(start + 2, end + 1));
}

describe("static library mirrors (content JSON ↔ api TS)", () => {
  it("hold the same essays, byte for byte", () => {
    const json = loadJsonStore();
    const ts = loadTsStore();

    expect(ts.length, "entry counts differ — rerun scripts/build-static-library.mjs").toBe(json.length);

    const bySlug = new Map(json.map((e) => [e.slug, e]));
    expect(bySlug.size, "duplicate slugs inside the JSON store").toBe(json.length);

    for (const entry of ts) {
      const twin = bySlug.get(entry.slug);
      expect(twin, `slug "${entry.slug}" exists only in the TS mirror — rerun scripts/build-static-library.mjs`).toBeDefined();
      expect(
        JSON.stringify(entry),
        `mirror drift at slug "${entry.slug}" — rerun scripts/build-static-library.mjs`
      ).toBe(JSON.stringify(twin));
    }
  });
});
