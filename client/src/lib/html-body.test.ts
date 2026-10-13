import { describe, expect, it } from "vitest";
import { htmlBodyToMarkdown, isHtmlBody, normalizeEssayBody, opensWithProse, stripDuplicateTitle } from "./html-body";

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

describe("normalizeEssayBody: the import's broken structure", () => {
  it("turns ornament breaks into section breaks and frees the headings glued to them", () => {
    const out = normalizeEssayBody("Intro line here.\n\n**• • •****## The Day\nIn 313 AD it changed.• • •**\n\n## Next");
    expect(out).toBe("Intro line here.\n\n---\n\n## The Day\nIn 313 AD it changed.\n\n---\n\n## Next");
  });

  it("parts paragraphs fused at the period, and leaves brand names alone", () => {
    expect(normalizeEssayBody("It was altered.Before that, a cost. In the Roman Empire.For many, relief.")).toBe(
      "It was altered.\n\nBefore that, a cost. In the Roman Empire.\n\nFor many, relief."
    );
    const brand = "Churches like Life.Church grew fast. See e.g.Acts and the U.S.Army.";
    expect(normalizeEssayBody(brand)).toBe(brand);
  });

  it("ends a quote at its own line and sets run-together verses one per paragraph", () => {
    expect(normalizeEssayBody("> He was not a monster.\nHe was a man.")).toBe("> He was not a monster.\n\nHe was a man.");
    expect(normalizeEssayBody("> “A.”— Jeremiah 17:9“B.”— 1 John 1:8")).toBe("> “A.”— Jeremiah 17:9\n>\n> “B.”— 1 John 1:8");
    expect(normalizeEssayBody("> who can understand it?(Jeremiah 17:9)")).toBe("> who can understand it? (Jeremiah 17:9)");
  });

  it("makes bold numbered section titles real headings and drops empty ones", () => {
    expect(normalizeEssayBody("**I. What We Get Wrong About Evil**\n\nProse.\n\n##")).toBe(
      "## I. What We Get Wrong About Evil\n\nProse."
    );
    // An ordinary bold sentence is not a heading.
    expect(normalizeEssayBody("**This matters.**")).toBe("**This matters.**");
  });
});

describe("stripDuplicateTitle", () => {
  it("drops an opening H1 or a heading that repeats the title, and keeps a real first section", () => {
    expect(stripDuplicateTitle("# Anything\nBody", "Title")).toBe("Body");
    expect(stripDuplicateTitle("## Every Generation Was Sure It Was Right\n\nBody", "Every Generation Was Sure It Was Right")).toBe("Body");
    expect(stripDuplicateTitle("## A Bible on His Desk\nBody", "Every Generation Was Sure It Was Right")).toBe("## A Bible on His Desk\nBody");
  });
});

describe("opensWithProse", () => {
  it("gives the drop cap only to a real opening paragraph", () => {
    const prose = "When we try to picture the people who did the worst things in church history, we tend to reach for a particular image: someone who knew, and chose to proceed anyway.";
    expect(opensWithProse(`## I. Title\n\n${prose}`)).toBe(true);
    expect(opensWithProse(`*“A one-line epigraph set in italics.”*\n\n${prose}`)).toBe(false);
    expect(opensWithProse("He kept a Bible on his desk.")).toBe(false);
    expect(opensWithProse("")).toBe(false);
  });
});
