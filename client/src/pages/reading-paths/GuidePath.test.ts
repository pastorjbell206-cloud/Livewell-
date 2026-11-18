import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { GUIDE_PATH_SLUGS, stopHref } from "./GuidePath";
import { DOORS } from "@/lib/siteCatalog";

const file = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../public/reading-paths/index.json"), "utf8"));
const guides = path.resolve(__dirname, "../../../public/studyguides");

describe("the reading paths of study guides", () => {
  it("shows every path the file holds, and every stop opens a study guide that exists", () => {
    expect(file.paths.map((p: { slug: string }) => p.slug).sort()).toEqual([...GUIDE_PATH_SLUGS].sort());
    for (const p of file.paths)
      for (const s of p.stops) {
        const href = stopHref(s.url);
        expect(href, s.url).toMatch(/^\/studyguides\/[a-z0-9-]+$/);
        expect(fs.existsSync(path.join(guides, `${href.split("/").pop()}.json`)), href).toBe(true);
      }
  });

  it("is what the catalogue's reading path links open", () => {
    const hrefs = DOORS.flatMap((d) => d.rooms.flatMap((r) => (r.inside ?? []).map((i) => i.href))).filter((h) => h.startsWith("/reading-paths/"));
    expect(hrefs.length).toBe(4);
    for (const h of hrefs) expect(GUIDE_PATH_SLUGS as readonly string[]).toContain(h.split("/").pop());
  });
});
