import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import path from "node:path";
import { EssayArt, familyFor, hashSeed, FAMILY_COUNT } from "./EssayArt";

// Every essay carries an image drawn from its slug. These pin the three things
// that make that trustworthy: the same essay always gets the same picture, the
// library does not collapse onto one motif, and every colour is a token so the
// art inverts with dark mode instead of breaking.

const LIB = path.resolve(__dirname, "../../../content/static-library.generated.json");

describe("EssayArt", () => {
  it("is deterministic: the same seed and track draw the same markup", () => {
    const a = renderToStaticMarkup(<EssayArt seed="jesus-is-lord" track="politics" decorative />);
    const b = renderToStaticMarkup(<EssayArt seed="jesus-is-lord" track="politics" decorative />);
    expect(a).toBe(b);
    expect(hashSeed("jesus-is-lord")).toBe(hashSeed("jesus-is-lord"));
  });

  it("varies across the library instead of keying on the pillar fallback", () => {
    const lib: { slug: string; pillar?: string }[] = JSON.parse(readFileSync(LIB, "utf8"));
    const families = new Set(lib.map(r => familyFor(r.slug, r.pillar)));
    expect(families.size).toBeGreaterThanOrEqual(10);
    // No single family may own more than 40% of the library.
    const counts = new Map<number, number>();
    for (const r of lib) counts.set(familyFor(r.slug, r.pillar), (counts.get(familyFor(r.slug, r.pillar)) ?? 0) + 1);
    expect(Math.max(...Array.from(counts.values()))).toBeLessThan(lib.length * 0.4);
    expect(FAMILY_COUNT).toBe(12);
  });

  it("uses only palette tokens, never hex, so it follows the theme", () => {
    const svg = renderToStaticMarkup(<EssayArt seed="the-work-nobody-watches" track="marriage" decorative />);
    expect(svg).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(svg).toMatch(/var\(--mustard\)/);
  });

  it("gives two instances on one page distinct filter ids", () => {
    const svg = renderToStaticMarkup(
      <div>
        <EssayArt seed="a" track="doubt" decorative />
        <EssayArt seed="b" track="doubt" decorative />
      </div>,
    );
    const ids = Array.from(svg.matchAll(/<filter id="([^"]+)"/g)).map(m => m[1]);
    expect(ids).toHaveLength(2);
    expect(ids[0]).not.toBe(ids[1]);
  });

  it("is hidden from readers on cards and labelled when it is the page image", () => {
    expect(renderToStaticMarkup(<EssayArt seed="x" decorative />)).toMatch(/aria-hidden="true"/);
    expect(renderToStaticMarkup(<EssayArt seed="x" title="Jesus Is Lord" />)).toMatch(/aria-label="Cover art for Jesus Is Lord"/);
  });
});
