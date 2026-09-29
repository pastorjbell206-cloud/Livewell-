import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { smartQuotes } from "./smart-quotes";
import { Markdown } from "@/components/Markdown";

describe("smartQuotes", () => {
  it("curls double quotes around a quotation", () => {
    expect(smartQuotes('He said "the whole thing stands or falls."')).toBe(
      "He said “the whole thing stands or falls.”"
    );
  });

  it("turns apostrophes and possessives into right single quotes", () => {
    expect(smartQuotes("It isn't Paul's point; the apostles' letters")).toBe(
      "It isn’t Paul’s point; the apostles’ letters"
    );
  });

  it("opens single quotes after a space and closes them after a word", () => {
    expect(smartQuotes("the word 'grace' matters")).toBe("the word ‘grace’ matters");
  });

  it("treats elided years as apostrophes", () => {
    expect(smartQuotes("in the '90s")).toBe("in the ’90s");
  });

  it("closes an interrupted quotation that ends on a dash", () => {
    expect(smartQuotes('"I was—"')).toBe("“I was—”");
  });

  it("uses the preceding character carried from an earlier node", () => {
    expect(smartQuotes('" he wrote', "d")).toBe("” he wrote");
    expect(smartQuotes('"yes"', "")).toBe("“yes”");
  });

  it("leaves text without straight quotes untouched", () => {
    const s = "No quotes here — none at all.";
    expect(smartQuotes(s)).toBe(s);
  });
});

describe("Markdown renders curly quotes at render time", () => {
  it("curls prose but never code spans or link URLs", () => {
    const md =
      'Paul wrote "I can do all things" from a cell. Run `echo "hi"` and see [the "link"](https://example.com/?q="x"\'s).';
    const { container } = render(<Markdown>{md}</Markdown>);
    const p = container.querySelector("p")!;
    expect(p.textContent).toContain("“I can do all things”");
    expect(container.querySelector("code")!.textContent).toBe('echo "hi"');
    const a = container.querySelector("a")!;
    expect(a.textContent).toBe("the “link”");
    expect(a.getAttribute("href")).not.toMatch(/[\u2018\u2019\u201C\u201D]|%E2%80/);
  });

  it("carries context across emphasis boundaries", () => {
    const { container } = render(<Markdown>{'"*Grace*" is the word.'}</Markdown>);
    expect(container.textContent).toBe("“Grace” is the word.");
  });
});
