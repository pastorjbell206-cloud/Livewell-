import { describe, it, expect } from "vitest";
import { splitForRelated } from "../client/src/lib/essay-split";

// The mid-essay "keep reading" block sits two-thirds of the way down a long
// essay, at a paragraph boundary. These pin the ways it could damage a piece:
// splitting a short essay, splitting inside a list or quote, or splitting so
// late that nothing follows.

const para = (n: number, words = 60) => Array.from({ length: n }, (_, i) => Array.from({ length: words }, (_, j) => `w${i}x${j}`).join(" ")).join("\n\n");

describe("splitForRelated", () => {
  it("leaves a short essay whole", () => {
    const body = para(5);
    expect(splitForRelated(body)).toEqual([body, ""]);
  });

  it("splits a long essay near two-thirds at a paragraph boundary with prose on both sides", () => {
    const body = para(30);
    const [a, b] = splitForRelated(body);
    expect(a.length).toBeGreaterThan(0);
    expect(b.length).toBeGreaterThan(0);
    const share = a.split(/\s+/).length / body.split(/\s+/).length;
    expect(share).toBeGreaterThan(0.6);
    expect(share).toBeLessThan(0.75);
    expect(a.endsWith("\n\n")).toBe(false);
    expect(`${a}\n\n${b}`).toBe(body);
  });

  it("does not split so that a heading, quote or list item opens the second half", () => {
    const blocks = para(30).split("\n\n");
    blocks.splice(20, 0, "## A heading right at the seam", "> a quote", "- a list item");
    const [, b] = splitForRelated(blocks.join("\n\n"));
    expect(b.startsWith("## ")).toBe(false);
    expect(b.startsWith("> ")).toBe(false);
    expect(b.startsWith("- ")).toBe(false);
  });
});
