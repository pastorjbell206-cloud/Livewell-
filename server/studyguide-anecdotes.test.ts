import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// James Bell's decision (29 Sept 2026): cut every unverifiable anecdote the
// study guides tell about him. The guides may state only the facts he has
// confirmed (came to faith from atheism, raised without a father, married to
// Susanna, five sons, pastors First Baptist Church of Fenton, founded PCN).
// Particular conversations, counseling sessions, baptisms, family moments and
// the like were invented biography and were rewritten as plainly hypothetical
// cases ("Picture a man who...") or direct teaching. This guard keeps the
// telltale phrasings from creeping back in.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "client/public/studyguides");
const FORBIDDEN = [/bell once/i, /told bell/i, /bell's wife/i, /bell’s wife/i];

describe("study guides carry no invented anecdotes about James Bell", () => {
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

  it("finds the study guides", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(`${file} has no "Bell once" / "told Bell" / "Bell's wife" anecdote`, () => {
      const text = readFileSync(path.join(dir, file), "utf8");
      const hits = FORBIDDEN.flatMap((re) => {
        const m = text.match(new RegExp(`.{0,60}${re.source}.{0,60}`, "gi"));
        return m ?? [];
      });
      expect(hits).toEqual([]);
    });
  }
});
