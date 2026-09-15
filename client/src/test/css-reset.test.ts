import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

// The site reset (border-box, zero margins and padding) lives inside a comment-
// wrapped @layer block in index.css. For two months it silently shipped as
// nothing: a comment above it mentioned Tailwind's "mb-*/p-*" classes, the
// "*/" closed the comment early, and the parser swallowed the reset as an
// invalid rule. Every page then laid out on browser defaults. This pins that
// the reset survives comment stripping exactly as a browser would do it.

const CSS = readFileSync(path.resolve(__dirname, "../index.css"), "utf8");

function stripComments(css: string): string {
  // Non-greedy, like a real CSS tokenizer: a comment ends at the first "*/".
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

describe("the global CSS reset", () => {
  it("survives comment stripping intact", () => {
    const stripped = stripComments(CSS);
    expect(stripped).toMatch(
      /@layer base\s*\{\s*\*,\*::before,\*::after\s*\{\s*box-sizing:\s*border-box;\s*margin:\s*0;\s*padding:\s*0;?\s*\}\s*\}/,
    );
  });

  it("has no comment that closes early on a wildcard-slash sequence", () => {
    const stripped = stripComments(CSS);
    // A stray "*/" after stripping means a comment ended before its author
    // intended and everything up to the next "{" became an invalid rule.
    expect(stripped).not.toContain("*/");
  });
});
