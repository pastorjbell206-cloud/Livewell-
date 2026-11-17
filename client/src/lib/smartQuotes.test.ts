import { describe, expect, it } from "vitest";
import { remarkSmartQuotes, smartQuotes } from "./smartQuotes";

describe("smartQuotes", () => {
  it("curls double and single quotation marks by where they sit", () => {
    expect(smartQuotes('What "Post-Christian" Actually Means')).toBe("What “Post-Christian” Actually Means");
    expect(smartQuotes("He said, 'Come and see.'")).toBe("He said, ‘Come and see.’");
    expect(smartQuotes('("Is God Dead?")')).toBe("(“Is God Dead?”)");
  });

  it("sets apostrophes as apostrophes", () => {
    expect(smartQuotes("Jeremiah's letter, the church's work, don't")).toBe("Jeremiah’s letter, the church’s work, don’t");
    expect(smartQuotes("the '60s and 'tis")).toBe("the ’60s and ’tis");
    expect(smartQuotes("the exiles' city")).toBe("the exiles’ city");
  });

  it("nests a quotation inside a quotation", () => {
    expect(smartQuotes(`"He said, 'Go,' and I went."`)).toBe("“He said, ‘Go,’ and I went.”");
  });

  it("changes nothing else: dashes, ellipses and curly marks stay as written", () => {
    const text = "A line -- with dashes... and “curly” marks";
    expect(smartQuotes(text)).toBe(text);
  });

  it("closes a mark that follows an inline node", () => {
    expect(smartQuotes('" he said.', "d")).toBe("” he said.");
  });
});

describe("remarkSmartQuotes", () => {
  it("curls prose across inline nodes and leaves code alone", () => {
    const tree = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", value: 'The cover asked, "' },
            { type: "emphasis", children: [{ type: "text", value: "Is God Dead?" }] },
            { type: "text", value: '" and ' },
            { type: "inlineCode", value: 'a "b"' },
            { type: "text", value: " didn't answer." },
          ],
        },
        { type: "code", value: 'say("hi")' },
      ],
    };
    remarkSmartQuotes()(tree);
    const [p, code] = tree.children as { children?: { value?: string }[]; value?: string }[];
    expect(p.children![0].value).toBe("The cover asked, “");
    expect(p.children![2].value).toBe("” and ");
    expect(p.children![3].value).toBe('a "b"');
    expect(p.children![4].value).toBe(" didn’t answer.");
    expect(code.value).toBe('say("hi")');
  });
});
