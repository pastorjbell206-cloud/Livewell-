import { describe, it, expect } from "vitest";
import { paintFirstHtml } from "../vite-paint-first";

// The built index.html is the template for every prerendered route, so this
// transform decides how every page on the site starts its JavaScript. It must
// move exactly Vite's two head tags into the loader, keep their URLs and
// crossorigin semantics, and leave any other HTML alone.

const VITE_HEAD = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script type="module" crossorigin src="/assets/index-abc123.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/vendor-react-def456.js">
    <link rel="stylesheet" crossorigin href="/assets/index-ghi789.css">
  </head>
  <body><div id="root"></div></body>
</html>`;

describe("paint-first loader", () => {
  it("replaces the module script and its preload with one inline loader", () => {
    const out = paintFirstHtml(VITE_HEAD);
    expect(out).not.toMatch(/<script type="module"/);
    expect(out).not.toMatch(/<link rel="modulepreload"/);
    const loaders = out.match(/<script>\(function\(\)\{/g) ?? [];
    expect(loaders).toHaveLength(1);
    expect(out).toContain('["/assets/index-abc123.js"]');
    expect(out).toContain('["/assets/vendor-react-def456.js"]');
    // Re-created as Vite emitted them: a module, fetched with crossorigin.
    expect(out).toContain('e.type="module"');
    expect(out).toContain('e.crossOrigin=""');
    expect(out).toContain('l.rel="modulepreload"');
    // The stylesheet stays where it was; the loader waits for the first paint.
    expect(out).toContain('<link rel="stylesheet" crossorigin href="/assets/index-ghi789.css">');
    expect(out).toContain('"first-contentful-paint"');
    expect(out).toContain('po.observe({type:"paint",buffered:true})');
    // At the end of the body: the static first screen is parsed before it runs.
    expect(out.indexOf("<script>(function")).toBeGreaterThan(out.indexOf('<div id="root">'));
    expect(out.indexOf("<script>(function")).toBeLessThan(out.indexOf("</body>"));
  });

  it("never leaves a page without its app: hidden tabs, no paint timing, and a timer all load it", () => {
    const out = paintFirstHtml(VITE_HEAD);
    expect(out).toContain("document.hidden");
    expect(out).toContain("requestAnimationFrame(function(){requestAnimationFrame(idle)})");
    expect(out).toContain("setTimeout(go,2500)");
    // Loading exactly once, whichever path fires first.
    expect(out).toContain("if(d)return;d=true;");
  });

  it("leaves HTML without a module entry untouched", () => {
    const plain = "<!doctype html><html><head><title>x</title></head><body></body></html>";
    expect(paintFirstHtml(plain)).toBe(plain);
  });
});
