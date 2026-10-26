/**
 * Contract for scripts/validate-design.mjs, the hardcoded-hex ratchet.
 *
 * The script is only worth having if it can be trusted in both directions: a
 * gate that misses a real violation is theatre, and one that cries wolf on an
 * HTML entity or an in-page anchor gets deleted the first time it blocks a
 * legitimate PR. So each behaviour is pinned against a throwaway tree:
 *  - a new hex fails, names the file and line, and points at the token;
 *  - entities, anchors, comments, URLs and test files are not colours;
 *  - a reasoned design-allow-hex marker passes and a reasonless one does not;
 *  - the baseline grandfathers old debt but blocks any growth;
 *  - --update lowers the baseline and refuses to raise it unasked;
 *  - the real repository passes against its committed baseline.
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(REPO, "scripts", "validate-design.mjs");

const TOKENS = ":root {\n  --bone:#F5F0E6;\n  --paper:#F5F0E6;\n  --mustard:#D4A017;\n}\n";

let root: string;

function put(rel: string, content: string) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

function baseline(hex: Record<string, number>) {
  put("scripts/design-baseline.json", JSON.stringify({ hardcodedHex: hex }));
}

function run(args: string[] = []) {
  try {
    const out = execFileSync(process.execPath, [SCRIPT, "--root", root, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { code: 0, out, err: "" };
  } catch (e) {
    const x = e as { status?: number; stdout?: unknown; stderr?: unknown };
    return { code: x.status ?? 1, out: String(x.stdout ?? ""), err: String(x.stderr ?? "") };
  }
}

function execFileSyncSafe(args: string[]) {
  try {
    const out = execFileSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { code: 0, out, err: "" };
  } catch (e) {
    const x = e as { status?: number; stdout?: unknown; stderr?: unknown };
    return { code: x.status ?? 1, out: String(x.stdout ?? ""), err: String(x.stderr ?? "") };
  }
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "design-gate-"));
  put("client/src/index.css", TOKENS);
  baseline({});
});
afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

describe("validate-design: what counts as a violation", () => {
  it("passes a tree that references tokens only", () => {
    put("client/src/pages/A.tsx", `export default () => <p style={{ color: "var(--ink)" }}>hi</p>;`);
    expect(run().code).toBe(0);
  });

  it("fails a new hex, names file and line, and suggests the token that holds the value", () => {
    put("client/src/pages/A.tsx", `const a = 1;\nexport default () => <p style={{ background: "#F5F0E6" }}>hi</p>;\n`);
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("client/src/pages/A.tsx");
    expect(r.err).toContain("line 2");
    expect(r.err).toContain("var(--bone)");
  });

  it("says to add a token first when no token holds the value", () => {
    put("client/src/pages/A.tsx", `export const c = "#123456";`);
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("no token holds this value");
  });

  it("catches 3-digit, 4-digit and 8-digit hex and a hex inside a var() fallback", () => {
    put("client/src/pages/A.tsx", `const a = "#fff", b = "#fffa", c = "#D4A01780", d = "var(--ink, #14110C)";`);
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("4 hex");
  });

  it("scans components and lib as well as pages", () => {
    put("client/src/components/B.tsx", `export const c = "#abcdef";`);
    put("client/src/lib/c.ts", `export const c = "#abcdef";`);
    const r = run();
    expect(r.err).toContain("client/src/components/B.tsx");
    expect(r.err).toContain("client/src/lib/c.ts");
  });
});

describe("validate-design: what is not a colour", () => {
  it("ignores HTML entities, including 3-digit ones that look like short hex", () => {
    put("client/src/lib/e.ts", `export const m = { "&#160;": " ", "&#169;": "c", "&#8212;": "-" };`);
    expect(run().code).toBe(0);
  });

  it("ignores in-page anchors even when the letters are valid hex", () => {
    put("client/src/pages/A.tsx", `export default () => <a href="#add">a</a>;`);
    expect(run().code).toBe(0);
  });

  it("ignores URL fragments and hex-looking words inside longer identifiers", () => {
    put("client/src/lib/u.ts", `export const u = "https://example.com/page#abcdef"; export const w = "item#fff";`);
    expect(run().code).toBe(0);
  });

  it("ignores hex in line comments and block comments", () => {
    put(
      "client/src/pages/A.tsx",
      `// was #FFFFFF once\n/* and #D4A017 before that\n   #14110C */\nexport default () => <p style={{ color: "var(--ink)" }}>x</p>; // trailing #abc\n`
    );
    expect(run().code).toBe(0);
  });

  it("ignores a full-line comment written without a space after the slashes", () => {
    put("client/src/pages/A.tsx", `//#D4A017\n//color:#fff\nexport default () => <p>x</p>;\n`);
    expect(run().code).toBe(0);
  });

  it("does not let a glob string's /* swallow the code that follows it", () => {
    put("client/src/lib/g.ts", `export const g = "src/**/*.ts";\nexport const bad = "#ABCDEF";\n/* real */\n`);
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("line 2");
  });

  it("ignores test files and the test directory", () => {
    put("client/src/pages/A.test.tsx", `expect(el).toHaveStyle("color: #fff");`);
    put("client/src/test/setup.ts", `export const c = "#000000";`);
    put("client/src/pages/Clean.tsx", `export default () => <p style={{ color: "var(--ink)" }}>x</p>;`);
    expect(run().code).toBe(0);
  });
});

describe("validate-design: evasions the adversarial review found", () => {
  it("catches hex inside Tailwind arbitrary values, where _ stands for a space", () => {
    put("client/src/pages/A.tsx", `export const a = "shadow-[0_0_4px_#ff0000] border-[1px_solid_#00ff00]";`);
    expect(run().err).toContain("2 hex");
  });

  it("does not let keys that merely end in id/to/for/from exempt a real colour", () => {
    put("client/src/pages/A.tsx", `export const c = { grid: "#e5e7eb", solid: "#ff0000", photo: "#00ff00", from: "#111111", to: "#222222" };`);
    expect(run().err).toContain("5 hex");
  });

  it("still exempts a genuine id or href", () => {
    put("client/src/pages/A.tsx", `export default () => <a id="#add" href="#feed">x</a>;`);
    expect(run().code).toBe(0);
  });

  it("ignores SVG url(#id) references", () => {
    put("client/src/pages/A.tsx", `export default () => <rect fill="url(#face)" filter="url('#add')" />;`);
    expect(run().code).toBe(0);
  });

  it("does not let ' // ' inside a string hide a real colour later on the line", () => {
    put("client/src/pages/A.tsx", `export const a = { label: "a // b", color: "#ff0000" };`);
    expect(run().code).toBe(1);
  });

  it("still strips a real trailing comment", () => {
    put("client/src/pages/A.tsx", `export const a = { color: "var(--ink)" }; // was #ff0000\n`);
    expect(run().code).toBe(0);
  });

  it("scans CRLF files and still strips their trailing comments", () => {
    put("client/src/pages/A.tsx", `export const a = "var(--ink)"; // was #ff0000\r\nexport const b = "#00ff00";\r\n`);
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("1 hex");
  });

  it("does not let a marker on a code line exempt the line below it", () => {
    put("client/src/pages/A.tsx", `export const a = "#111111"; // design-allow-hex: reason\nexport const b = "#222222";\n`);
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("line 2");
  });

  it("skips a test directory only at the top of client/src, not app code inside one", () => {
    put("client/src/test/setup.ts", `export const c = "#000000";`);
    put("client/src/pages/test/Preview.tsx", `export const c = "#000000";`);
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("pages/test/Preview.tsx");
    expect(r.err).not.toContain("client/src/test/setup.ts");
  });
});

describe("validate-design: a broken setup must never pass silently", () => {
  it("refuses a root with no client/src rather than reporting ok on zero files", () => {
    const empty = fs.mkdtempSync(path.join(os.tmpdir(), "design-empty-"));
    try {
      const r = execFileSyncSafe(["--root", empty]);
      expect(r.code).toBe(2);
      expect(r.err).toContain("vacuous pass");
    } finally {
      fs.rmSync(empty, { recursive: true, force: true });
    }
  });

  it("does not wipe the baseline when --update runs on a root with no sources", () => {
    const empty = fs.mkdtempSync(path.join(os.tmpdir(), "design-empty-"));
    fs.mkdirSync(path.join(empty, "scripts"));
    const b = path.join(empty, "scripts", "design-baseline.json");
    fs.writeFileSync(b, JSON.stringify({ hardcodedHex: { "client/src/a.tsx": 3 } }));
    try {
      expect(execFileSyncSafe(["--root", empty, "--update"]).code).toBe(2);
      expect(JSON.parse(fs.readFileSync(b, "utf8")).hardcodedHex["client/src/a.tsx"]).toBe(3);
    } finally {
      fs.rmSync(empty, { recursive: true, force: true });
    }
  });

  it.each([
    ["not JSON", "{oops"],
    ["empty", ""],
    ["null", "null"],
    ["no hardcodedHex", "{}"],
    ["an array", '{"hardcodedHex":[]}'],
    ["a string count", '{"hardcodedHex":{"client/src/pages/A.tsx":"9"}}'],
    ["a negative count", '{"hardcodedHex":{"client/src/pages/A.tsx":-1}}'],
  ])("exits 2 with a clear message on a baseline that is %s", (_label, body) => {
    put("client/src/pages/A.tsx", `export const a = "var(--ink)";`);
    put("scripts/design-baseline.json", body);
    const r = run();
    expect(r.code).toBe(2);
    expect(r.err).toContain("[design]");
    expect(r.err).not.toContain("at file:");
  });

  it("reads a baseline that starts with a byte-order mark", () => {
    put("client/src/pages/A.tsx", `export const a = "#111111";`);
    put("scripts/design-baseline.json", "\uFEFF" + JSON.stringify({ hardcodedHex: { "client/src/pages/A.tsx": 1 } }));
    expect(run().code).toBe(0);
  });
});

describe("validate-design: the escape hatch", () => {
  it("accepts a marker with a reason, on the same line or the line above", () => {
    put(
      "client/src/components/Cover.tsx",
      `// design-allow-hex: canvas export needs a literal\nexport const a = "#123456";\nexport const b = "#654321"; // design-allow-hex: PNG palette\n`
    );
    expect(run().code).toBe(0);
  });

  it("rejects a marker that gives no reason", () => {
    put("client/src/components/Cover.tsx", `export const a = "#123456"; // design-allow-hex:\n`);
    expect(run().code).toBe(1);
  });
});

describe("validate-design: the ratchet", () => {
  it("grandfathers existing debt exactly", () => {
    put("client/src/pages/A.tsx", `export const a = "#111111", b = "#222222";`);
    baseline({ "client/src/pages/A.tsx": 2 });
    expect(run().code).toBe(0);
  });

  it("blocks growth in a grandfathered file", () => {
    put("client/src/pages/A.tsx", `export const a = "#111111", b = "#222222", c = "#333333";`);
    baseline({ "client/src/pages/A.tsx": 2 });
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("baseline allows 2");
  });

  it("blocks any hex in a file that has no baseline entry", () => {
    put("client/src/pages/Old.tsx", `export const a = "#111111";`);
    put("client/src/pages/New.tsx", `export const a = "#111111";`);
    baseline({ "client/src/pages/Old.tsx": 1 });
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("New.tsx");
    expect(r.err).not.toContain("FAIL client/src/pages/Old.tsx");
  });

  it("passes an improved file and says how to lock the gain in", () => {
    put("client/src/pages/A.tsx", `export const a = "#111111";`);
    baseline({ "client/src/pages/A.tsx": 3 });
    const r = run();
    expect(r.code).toBe(0);
    expect(r.out).toContain("--update");
    expect(r.out).toContain("3 -> 1");
  });

  it("fails loudly when there is no baseline file at all", () => {
    fs.rmSync(path.join(root, "scripts", "design-baseline.json"));
    put("client/src/pages/A.tsx", `export const a = "#111111";`);
    const r = run();
    expect(r.code).toBe(1);
    expect(r.err).toContain("No baseline file");
  });
});

describe("validate-design: --update", () => {
  it("lowers the baseline and writes it sorted with a readme", () => {
    put("client/src/pages/Z.tsx", `export const a = "#111111";`);
    put("client/src/pages/A.tsx", `export const a = "#111111";`);
    baseline({ "client/src/pages/Z.tsx": 5, "client/src/pages/A.tsx": 4, "client/src/pages/Gone.tsx": 9 });
    expect(run(["--update"]).code).toBe(0);
    const doc = JSON.parse(fs.readFileSync(path.join(root, "scripts", "design-baseline.json"), "utf8"));
    expect(Object.keys(doc.hardcodedHex)).toEqual(["client/src/pages/A.tsx", "client/src/pages/Z.tsx"]);
    expect(doc.hardcodedHex["client/src/pages/A.tsx"]).toBe(1);
    expect(doc._readme).toContain("Never raise it by hand");
  });

  it("refuses to raise the baseline unless told to, and leaves the file untouched", () => {
    put("client/src/pages/A.tsx", `export const a = "#111111", b = "#222222";`);
    baseline({ "client/src/pages/A.tsx": 1 });
    const before = fs.readFileSync(path.join(root, "scripts", "design-baseline.json"), "utf8");
    const r = run(["--update"]);
    expect(r.code).toBe(1);
    expect(r.err).toContain("refuses to RAISE");
    expect(fs.readFileSync(path.join(root, "scripts", "design-baseline.json"), "utf8")).toBe(before);
    expect(run(["--update", "--allow-increase"]).code).toBe(0);
  });
});

describe("validate-design: this repository", () => {
  it("passes against its committed baseline", () => {
    const out = execFileSync(process.execPath, [SCRIPT], { cwd: REPO, encoding: "utf8" });
    expect(out).toContain("[design] ok");
  });
});
