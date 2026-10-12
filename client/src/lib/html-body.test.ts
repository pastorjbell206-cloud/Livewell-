import { describe, expect, it } from "vitest";
import { htmlBodyToMarkdown, isHtmlBody, normalizeEssayBody } from "./html-body";

describe("htmlBodyToMarkdown", () => {
  it("returns a Markdown body untouched", () => {
    const md = "# Title\n\nFirst paragraph with <em>inline</em> markup.\n\n## Section\n\nMore.";
    expect(isHtmlBody(md)).toBe(false);
    expect(htmlBodyToMarkdown(md)).toBe(md);
  });

  it("converts paragraphs, headings and inline emphasis", () => {
    const html =
      "<p>She came to see me on a <em>Wednesday</em> afternoon.</p>\n\n" +
      "<h2>How Theology Becomes a Weapon</h2>\n\n" +
      "<p>Abuse does <strong>not</strong> always look like a fist.</p>";
    expect(htmlBodyToMarkdown(html)).toBe(
      "She came to see me on a *Wednesday* afternoon.\n\n" +
        "## How Theology Becomes a Weapon\n\n" +
        "Abuse does **not** always look like a fist."
    );
  });

  it("splits a single-line devotional into a pull-quote and paragraphs", () => {
    const html =
      '<blockquote>"In peace I will both lie down and sleep." (Psalm 4:8)</blockquote>' +
      "<p>The last thing I do most nights is scroll.</p><p>David ends the day differently.</p>";
    expect(htmlBodyToMarkdown(html)).toBe(
      '> "In peace I will both lie down and sleep." (Psalm 4:8)\n\n' +
        "The last thing I do most nights is scroll.\n\n" +
        "David ends the day differently."
    );
  });

  it("keeps paragraphs inside a blockquote within the quote", () => {
    expect(htmlBodyToMarkdown("<blockquote><p>One.</p><p>Two.</p></blockquote>")).toBe(
      "> One.\n>\n> Two."
    );
  });

  it("keeps edge whitespace outside emphasis markers", () => {
    expect(htmlBodyToMarkdown("<p>a<em> word </em>b</p>")).toBe("a *word* b");
  });

  it("does not let a paragraph that starts like list syntax become a list", () => {
    expect(htmlBodyToMarkdown("<p>1. Not a list.</p><p>- Not a bullet.</p>")).toBe(
      "1\\. Not a list.\n\n\\- Not a bullet."
    );
  });

  it("turns <br> into a hard line break", () => {
    expect(htmlBodyToMarkdown("<p>Line one<br>Line two</p>")).toBe("Line one\\\nLine two");
  });
});

describe("normalizeEssayBody", () => {
  it("drops the Substack import's leading rules and empty image link", () => {
    const body =
      "[](https://substackcdn.com/image/fetch/x_1672x941.png)\n\n---\n\n---\n\nGermany in the 1920s was a nation in agony.";
    expect(normalizeEssayBody(body)).toBe("Germany in the 1920s was a nation in agony.");
  });

  it("turns the import's triple hyphen between words into an em dash", () => {
    expect(normalizeEssayBody("instability---coalition governments")).toBe(
      "instability\u2014coalition governments"
    );
  });

  it("leaves a thematic break in the middle of a body alone", () => {
    const body = "First part.\n\n---\n\nSecond part.";
    expect(normalizeEssayBody(body)).toBe(body);
  });

  it("still converts an HTML body", () => {
    expect(normalizeEssayBody("<p>One.</p><p>Two.</p>")).toBe("One.\n\nTwo.");
  });
});
