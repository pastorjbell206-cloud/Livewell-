import { describe, expect, it } from "vitest";
import { htmlToMarkdown, looksLikeHtml } from "./htmlToMarkdown";
import library from "../../../content/static-library.generated.json";

describe("htmlToMarkdown", () => {
  it("leaves Markdown bodies untouched", () => {
    const md = "## A heading\n\nA paragraph with *emphasis*.\n\n> A quote.";
    expect(htmlToMarkdown(md)).toBe(md);
  });

  it("converts the block and inline markup essay bodies use", () => {
    const html =
      "<p>Before Constantine, there were <em>no</em> cathedrals.</p> <h2>The Edict of Milan</h2>" +
      "<p>It made the faith <strong>legal</strong>, not official. See <a href=\"/writing/x\">this</a>.</p>" +
      "<blockquote><p>In this sign, conquer.</p></blockquote><ul><li>One</li><li>Two</li></ul>";
    expect(htmlToMarkdown(html)).toBe(
      "Before Constantine, there were *no* cathedrals.\n\n## The Edict of Milan\n\n" +
        "It made the faith **legal**, not official. See [this](/writing/x).\n\n" +
        "> In this sign, conquer.\n\n- One\n- Two"
    );
  });

  it("decodes entities and keeps a year-led paragraph as prose", () => {
    expect(htmlToMarkdown("<p>313. The year &amp; the &ldquo;edict&rdquo;&#8230;</p>")).toBe(
      "313\\. The year & the “edict”…"
    );
  });

  it("leaves no tags behind in any HTML-bodied essay in the static library", () => {
    const htmlBodies = (library as { slug: string; body?: string }[]).filter((e) => e.body && looksLikeHtml(e.body));
    expect(htmlBodies.length).toBeGreaterThan(0);
    for (const e of htmlBodies) {
      const out = htmlToMarkdown(e.body as string);
      expect(out, e.slug).not.toMatch(/<\/?(p|h[1-6]|em|strong|blockquote|ul|ol|li|a|br)\b[^>]*>/i);
      expect(out.split("\n\n").length, `${e.slug} should have paragraphs`).toBeGreaterThan(3);
    }
  });
});
