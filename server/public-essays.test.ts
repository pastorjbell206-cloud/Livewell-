import { describe, it, expect } from "vitest";
import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
// @ts-expect-error — plain ESM script, no types; the functions are pure.
import { build, indexRecord, safeSlug } from "../scripts/build-public-essays.mjs";

// The essay page and /writing now paint from static JSON before the API
// answers. These pin the build step that produces those files, so a change to
// the library's shape or the script cannot silently ship an empty directory.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIB = path.join(__dirname, "..", "content/static-library.generated.json");

describe("public essay files", () => {
  const records: any[] = JSON.parse(readFileSync(LIB, "utf8"));

  it("emits one file per published essay and an index without bodies", () => {
    const out = mkdtempSync(path.join(tmpdir(), "essays-"));
    const { written, indexed, skipped } = build(records, out);
    const files = readdirSync(out);
    expect(written).toBe(indexed);
    expect(files.length).toBe(written + 4); // + index.json + index-lite.json + featured.json + canon.json
    expect(written).toBeGreaterThan(600);
    expect(skipped).toEqual([]);

    const index = JSON.parse(readFileSync(path.join(out, "index.json"), "utf8"));
    expect(index.length).toBe(indexed);
    for (const r of index.slice(0, 50)) {
      expect(r.body).toBeUndefined();
      expect(typeof r.slug).toBe("string");
      expect(typeof r.title).toBe("string");
      expect(typeof r.pillar).toBe("string");
    }
    const one = JSON.parse(readFileSync(path.join(out, `${index[0].slug}.json`), "utf8"));
    expect(typeof one.body).toBe("string");
    expect(one.body.length).toBeGreaterThan(200);
  });

  it("strips only the body from an index record", () => {
    const r = { slug: "a", title: "A", body: "long", excerpt: "e", pillar: "theology" };
    expect(indexRecord(r)).toEqual({ slug: "a", title: "A", excerpt: "e", pillar: "theology" });
  });

  it("refuses slugs that could escape the output directory", () => {
    expect(safeSlug("jesus-is-lord")).toBe(true);
    expect(safeSlug("../etc/passwd")).toBe(false);
    expect(safeSlug("has space")).toBe(false);
    expect(safeSlug("")).toBe(false);
  });
});
