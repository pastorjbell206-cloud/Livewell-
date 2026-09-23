import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// The pastor-trade essays moved to the Pastors Connection Network. One list
// (content/pcn-moved.json, written by scripts/export-pcn-essays.mjs) has to
// agree with everything that reads it: the API's copy, the redirects that
// catch the old URLs, the export bundle PCN imports from, and the public essay
// files the site serves. If any of these drifts, a reader either lands on a
// dead page or the site keeps carrying material for an audience that lives
// elsewhere.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const read = (rel: string) => readFileSync(path.join(repoRoot, rel), "utf8");
const readJson = (rel: string) => JSON.parse(read(rel));

describe("the essays moved to PCN", () => {
  const moved = readJson("content/pcn-moved.json");
  const slugs: string[] = moved.slugs;

  it("is a real list with a base URL", () => {
    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs.length).toBeGreaterThan(50);
    expect(moved.base).toMatch(/^https:\/\/pastorsconnectionnetwork\.com\//);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("is the same list the API bundles", () => {
    expect(readJson("api/pcn-moved.json").slugs).toEqual(slugs);
  });

  it("redirects every old URL somewhere deliberate", () => {
    // Sixty-four of these slugs already had a redirect before the move: old
    // duplicate URLs sent to the fuller LiveWell essay that stays, or to a hub
    // that itself forwards to PCN. Those are earlier decisions and stand. A
    // slug with no redirect gets a permanent one to its PCN address.
    const vercel = readJson("vercel.json");
    const bySource = new Map<string, any>((vercel.redirects as any[]).map((r) => [r.source, r]));
    const missing = slugs.filter((s) => !bySource.has(`/writing/${s}`));
    expect(missing, `no redirect for: ${missing.slice(0, 5).join(", ")}`).toEqual([]);
    let toPcn = 0;
    for (const s of slugs) {
      const r = bySource.get(`/writing/${s}`);
      expect(r.permanent).toBe(true);
      if (String(r.destination).startsWith(moved.base)) {
        expect(r.destination).toBe(moved.base + s);
        toPcn++;
      } else {
        // A local destination must not be a moved essay's own dead URL.
        expect(r.destination).not.toBe(`/writing/${s}`);
      }
    }
    expect(toPcn).toBeGreaterThan(0);
  });

  it("has an export file for every essay the code holds, and names the rest", () => {
    const manifest = readJson("archive/pcn-handoff/essays/manifest.json");
    expect(manifest.essays.map((e: any) => e.slug)).toEqual(slugs);
    for (const e of manifest.essays) {
      if (e.file) {
        expect(existsSync(path.join(repoRoot, e.file)), e.file).toBe(true);
        const text = read(e.file);
        expect(text.startsWith("---\n")).toBe(true);
        expect(text).toContain(`slug: "${e.slug}"`);
        expect(text).toContain(`canonical: "${moved.base}${e.slug}"`);
      } else {
        expect(e.status).toMatch(/database export/);
      }
    }
  });

  it("is absent from the public essay index when one has been built", () => {
    const indexPath = path.join(repoRoot, "client/public/essays/index.json");
    if (!existsSync(indexPath)) return;
    const index = JSON.parse(readFileSync(indexPath, "utf8"));
    const present = index.filter((r: any) => slugs.includes(r.slug)).map((r: any) => r.slug);
    expect(present, "moved essays still in client/public/essays/index.json; rerun pnpm run essays:public").toEqual([]);
  });
});
