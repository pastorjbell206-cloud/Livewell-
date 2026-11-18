/**
 * Every ebook is free (James, 2026-11-18), and the seven that name the
 * Pastors Connection Network are held:
 *
 * - each free ebook's PDF (and EPUB, where listed) is a served static file;
 * - no held ebook is in a served folder or listed anywhere a reader looks,
 *   and its file is still in content/held-downloads/ for past buyers;
 * - no old sales or thank-you address of a free ebook is left without a
 *   one-hop way to /downloads, and no reader-facing page states a price.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { FREE_EBOOKS, HELD_EBOOKS } from "./ebooks";

const ROOT = path.resolve(__dirname, "../../..");
const PUB = path.join(ROOT, "client/public");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const RULES: { source: string; destination: string }[] = JSON.parse(read("vercel.json")).redirects;

describe("free ebooks", () => {
  it("serves every listed file", () => {
    for (const b of FREE_EBOOKS) {
      for (const href of [b.pdf, b.epub, b.cover].filter(Boolean) as string[]) {
        expect(fs.existsSync(path.join(PUB, href)), href).toBe(true);
      }
    }
  });

  it("keeps the held ebooks off the site and ready for past buyers", () => {
    const listed = new Set(FREE_EBOOKS.map((b) => b.slug));
    for (const h of HELD_EBOOKS) {
      expect(listed.has(h.slug), h.slug).toBe(false);
      expect(fs.existsSync(path.join(PUB, "ebook", h.slug)), h.slug).toBe(false);
      expect(fs.existsSync(path.join(ROOT, "content/held-downloads", `${h.slug}.pdf`)), h.slug).toBe(true);
      expect(read("api/index.ts")).toContain(`../content/held-downloads/${h.slug}.pdf`);
      // Its old address is a page that says it is being revised, not a redirect.
      expect(RULES.some((r) => r.source === `/${h.slug}`), h.slug).toBe(false);
    }
  });

  it("sends old sales and thank-you addresses to /downloads", () => {
    for (const b of FREE_EBOOKS) {
      const thanks = b.group === "older" ? `/${b.slug}/thank-you` : `/books/${b.slug}/thank-you`;
      expect(RULES.find((r) => r.source === thanks)?.destination, thanks).toBe("/downloads");
      if (b.group === "older") {
        expect(RULES.find((r) => r.source === `/${b.slug}`)?.destination, b.slug).toBe("/downloads");
      }
    }
  });

  it("states no ebook price on a reader-facing page", () => {
    const pages = [
      "client/src/pages/Books.tsx",
      "client/src/pages/Downloads.tsx",
      "client/src/pages/Believe.tsx",
      "client/src/pages/WhenGodBlessAmerica.tsx",
      "client/src/pages/TheMonsterInTheMirror.tsx",
      "client/src/pages/DeconstructionOfFaith.tsx",
      "client/src/pages/TheReliabilityOfScripture.tsx",
      "client/src/pages/BibleAndHomosexuality.tsx",
      "client/src/pages/BibleAndTransgenderIdentity.tsx",
      "client/src/pages/IsCriticalRaceTheoryBiblical.tsx",
      "client/public/llms.txt",
      "scripts/prerender-heads.mjs",
    ];
    for (const p of pages) {
      const text = read(p);
      expect(/\$\s?\d+\.\d{2}/.test(text), p).toBe(false);
      expect(text.includes("buy.stripe.com"), p).toBe(false);
    }
  });
});
