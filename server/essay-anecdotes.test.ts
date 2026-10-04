import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { redirectedEssaySlugs } from "../scripts/redirected-essays.mjs";

// James Bell's decision (29 Sept 2026): unverifiable anecdotes about his life
// and ministry come out of the live essays. The only biography an essay may
// carry is what he has confirmed: he came to faith from atheism, was raised
// without a father, is married to Susanna, has five sons, has been Lead Pastor
// of First Baptist Church of Fenton for twelve years, and founded the Pastors
// Connection Network. Particular conversations, counseling cases, congregants
// and tenures other than twelve years were rewritten at their sources as
// plainly hypothetical cases ("Picture a man who...") or general statements.
//
// This guard scans the live essays that were NOT rewritten under
// docs/rewrites/STANDARD.md (those were reviewed for this already) for the
// telltale phrasings, so they do not creep back in. It is deliberately
// conservative: a hit here is almost always an anecdote presented as fact.
//
// ESSAY_ANECDOTES_LIBRARY points the check at another build of the library
// (used to prove a source fix before the committed JSON is regenerated).

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const readJson = (p: string) => JSON.parse(readFileSync(path.isAbsolute(p) ? p : path.join(repoRoot, p), "utf8"));

const FORBIDDEN: RegExp[] = [
  /told me once/i,
  /came to my office/i,
  /in my office/i,
  /a man in my church/i,
  /a woman in my church/i,
  /fifteen years of ministry/i,
  /fifteen years of pastoring/i,
  /pastor for fifteen years/i,
  /I am a Baptist pastor/i,
  /I pastor a Baptist/i,
  /I am a Baptist\b/i,
];

/** Written by Susanna Bell, not James; her own voice, outside this rule. */
const SUSANNA_ESSAYS = new Set(["the-work-nobody-watches", "the-womanhood-they-preached-was-small"]);

/** Slugs rewritten or merged under docs/rewrites/STANDARD.md. */
function rewrittenSlugs(): Set<string> {
  const out = new Set<string>();
  const generated = path.join(repoRoot, "content/rewrites.generated.json");
  if (existsSync(generated)) {
    const { rewritten = [], merged = {} } = readJson(generated);
    for (const s of rewritten) out.add(s);
    for (const s of Object.keys(merged)) out.add(s);
  }
  const dir = path.join(repoRoot, "content/rewrites");
  if (existsSync(dir)) {
    for (const f of readdirSync(dir)) {
      if (!f.endsWith(".md")) continue;
      out.add(f.replace(/\.md$/, ""));
      const m = readFileSync(path.join(dir, f), "utf8").match(/^slug:\s*["']?([a-z0-9-]+)/m);
      if (m) out.add(m[1]);
    }
  }
  return out;
}

type LibraryRecord = { slug?: string; body?: unknown; published?: boolean };

describe("live essays carry no invented anecdotes about James Bell", () => {
  const library: LibraryRecord[] = readJson(process.env.ESSAY_ANECDOTES_LIBRARY || "content/static-library.generated.json");
  const moved = new Set<string>(readJson("content/pcn-moved.json").slugs);
  const redirected = redirectedEssaySlugs(repoRoot);
  const rewritten = rewrittenSlugs();
  const live = library.filter(
    (r): r is LibraryRecord & { slug: string } =>
      !!r &&
      typeof r.slug === "string" &&
      r.published !== false &&
      !moved.has(r.slug) &&
      !redirected.has(r.slug) &&
      !rewritten.has(r.slug) &&
      !SUSANNA_ESSAYS.has(r.slug),
  );

  it("finds the live, non-rewritten essays", () => {
    expect(live.length).toBeGreaterThan(50);
  });

  it("has no first-person anecdote phrasing in any of them", () => {
    const hits: string[] = [];
    for (const r of live) {
      const body = String(r.body ?? "");
      for (const re of FORBIDDEN) {
        const m = re.exec(body);
        if (m) hits.push(`${r.slug}: …${body.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60).replace(/\s+/g, " ")}…`);
      }
    }
    expect(hits, "rewrite the passage at its source as a plainly hypothetical case or a general statement").toEqual([]);
  });
});
