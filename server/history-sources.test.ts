/**
 * The history sources gate (scripts/verify-sources.mjs, unit U07): it passes
 * on the stored texts as committed, finds real excerpts in them, and fails a
 * seeded altered excerpt, a card with no stored text, a stored text edited
 * after it was fetched, and a manifest that has lost a provenance field.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  CORPUS_DIR,
  collectExcerpts,
  excerptPieces,
  findExcerpt,
  normalizeForMatch,
  passagesFor,
  wdbHtmlToPassages,
} from "../scripts/lib/history-sources.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const verify = (...args: string[]) =>
  spawnSync(process.execPath, [path.join(ROOT, "scripts", "verify-sources.mjs"), ...args], { cwd: ROOT, encoding: "utf8" });

const read = (id: string) =>
  passagesFor("wdb-html", fs.readFileSync(path.join(ROOT, CORPUS_DIR, "texts", `${id}.html`), "utf8"));

// Pliny to Trajan (Letters 10.96), in McGiffert's note to Eusebius, Church History 3.33.
const PLINY = "It is my custom, my Lord, to refer to thee all questions concerning which I am in doubt";
const PLINY_ALTERED = "It is my custom, my Lord, to refer to you all questions concerning which I am in doubt";

let tmp = "";
/** A throwaway checkout holding the committed corpus and the given excerpt files. */
function fixture(name: string, files: Record<string, unknown>, mutate?: (corpus: string) => void) {
  const root = path.join(tmp, name);
  fs.cpSync(path.join(ROOT, CORPUS_DIR), path.join(root, CORPUS_DIR), { recursive: true });
  for (const [rel, data] of Object.entries(files)) {
    const abs = path.join(root, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, typeof data === "string" ? data : JSON.stringify(data, null, 2));
  }
  mutate?.(path.join(root, CORPUS_DIR));
  return root;
}
const session = (blocks: unknown[]) => ({ slug: "test-session", blocks });

beforeAll(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "history-sources-"));
});
afterAll(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe("the committed corpus", () => {
  it("passes the gate as committed", () => {
    const r = verify();
    expect(r.stderr).toBe("");
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/stored texts intact and listed/);
  });

  it("holds the texts the slice and Part I need", () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, CORPUS_DIR, "manifest.json"), "utf8"));
    const ids = manifest.texts.map((t: { id: string }) => t.id);
    for (const id of [
      "eusebius-church-history-3", // Pliny 10.96 in McGiffert's note
      "martyrdom-of-polycarp",
      "eusebius-church-history-5", // Lyon and Vienne
      "passion-of-perpetua",
      "ambrose-letter-40", // Callinicum
      "ambrose-letter-51", // Thessalonica
      "nicaea-325-creed",
      "athanasius-de-decretis",
      "augustine-city-of-god-5",
    ]) {
      expect(ids).toContain(id);
    }
  });

  it("finds real excerpts, across footnote markers, notes, and marked omissions", () => {
    expect(findExcerpt(read("eusebius-church-history-3"), PLINY).ok).toBe(true);
    expect(findExcerpt(read("martyrdom-of-polycarp"), "Eighty and six years have I served Him").ok).toBe(true);
    expect(findExcerpt(read("tertullian-apology"), "the blood of Christians is seed").ok).toBe(true);
    // An endnote anchor sits after "Macarius" in this Word-exported page.
    expect(findExcerpt(read("athanasius-on-the-incarnation"), "come now, Macarius (worthy of that name), and true lover of Christ").ok).toBe(true);
    // The creed's text carries transliterated Greek; an omission marks the gap.
    expect(findExcerpt(read("nicaea-325-creed"), "begotten, not made").ok).toBe(false);
    expect(findExcerpt(read("nicaea-325-creed"), "very God of very God, begotten … not made, being of one substance").ok).toBe(true);
  });

  it("fails an altered excerpt and says how far it agrees", () => {
    const r = findExcerpt(read("eusebius-church-history-3"), PLINY_ALTERED);
    expect(r.ok).toBe(false);
    expect(r.agreesTo).toBe("it is my custom, my lord, to refer to");
  });

  it("keeps the order of the pieces either side of an omission", () => {
    const d = read("epistle-to-diognetus");
    const a = "They dwell in their own countries, but simply as sojourners.";
    const b = "Every foreign land is to them as their native country";
    expect(findExcerpt(d, `${a} ... ${b}`).ok).toBe(true);
    const swapped = findExcerpt(d, `${b} ... ${a}`);
    expect(swapped.ok).toBe(false);
    expect(swapped.reason).toMatch(/not in this order/);
  });
});

describe("the matching rules", () => {
  it("ignores case, quotation-mark and dash style, and spacing, and nothing else", () => {
    expect(normalizeForMatch("“Thee,”  he said — ‘Lord’")).toBe(normalizeForMatch('"thee," he said-\'lord\''));
    expect(normalizeForMatch("forty-six")).not.toBe(normalizeForMatch("forty six"));
    expect(normalizeForMatch("seed.")).not.toBe(normalizeForMatch("seed"));
  });

  it("splits at omissions and refuses pieces too short to check", () => {
    expect(excerptPieces("one two three ... four five six [...] seven eight nine")).toEqual([
      "one two three",
      "four five six",
      "seven eight nine",
    ]);
    const r = findExcerpt(["the whole of the passage is here"], "the whole ... here");
    expect(r.ok).toBe(false);
    expect(r.reason).toMatch(/too short/);
  });

  it("drops footnote references and searches each note on its own", () => {
    const html = `<article class="writing"><h1>T</h1>First words<sup><a href="#fn1" id="r1">1</a></sup> run on here.<br/><br/>
<section class="notes"><hr/><span id="fn1"><a href="#r1">1</a>&nbsp;A note that says one thing.</span><br/><span id="fn2"><a href="#r2">2</a>&nbsp;Another note entirely.</span></section></article>`;
    const passages = wdbHtmlToPassages(html);
    expect(passages).toHaveLength(3);
    expect(findExcerpt(passages, "First words run on here").ok).toBe(true);
    expect(findExcerpt(passages, "A note that says one thing.").ok).toBe(true);
    expect(findExcerpt(passages, "says one thing. Another note").ok).toBe(false);
  });

  it("finds excerpts in sources files and session blocks, naming the text once or per card", () => {
    const found = collectExcerpts({
      corpus: "a",
      excerpts: [{ excerpt: "x" }, { corpus: "b", excerpt: "y" }],
      blocks: [{ type: "prose", text: "z" }, { type: "source" }],
    });
    expect(found.map((f: { corpus?: string; excerpt?: string }) => [f.corpus, f.excerpt])).toEqual([
      ["a", "x"],
      ["b", "y"],
      ["a", undefined],
    ]);
  });
});

describe("seeded files", () => {
  it("passes a session and a sources file whose excerpts are in their texts", () => {
    const root = fixture("good", {
      "client/public/history/sessions/test-session.json": session([
        { type: "prose", text: "Pliny wrote to Trajan." },
        { type: "source", corpus: "eusebius-church-history-3", excerpt: PLINY },
      ]),
      "client/public/history/sources/polycarp.json": {
        id: "polycarp",
        corpus: "martyrdom-of-polycarp",
        excerpts: [{ excerpt: "Eighty and six years have I served Him" }],
      },
    });
    const r = verify("--root", root);
    expect(r.stderr).toBe("");
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/2 excerpt\(s\) found/);
  });

  it("fails a seeded altered excerpt, naming the file, the card and the text", () => {
    const root = fixture("altered", {
      "client/public/history/sessions/test-session.json": session([
        { type: "source", corpus: "eusebius-church-history-3", excerpt: PLINY_ALTERED },
      ]),
    });
    const r = verify("--root", root);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("client/public/history/sessions/test-session.json blocks[0]");
    expect(r.stderr).toContain("is not in the stored text (eusebius-church-history-3)");
    expect(r.stderr).toContain("to refer to");
  });

  it("fails a source card with no stored text, and one that names a text not stored", () => {
    const root = fixture("no-corpus", {
      "client/public/history/sessions/test-session.json": session([
        { type: "source", excerpt: "Here I stand; I can do no other." },
        { type: "source", corpus: "barmen-declaration", excerpt: "Jesus Christ, as he is attested for us in Holy Scripture" },
      ]),
    });
    const r = verify("--root", root);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/blocks\[0\]: a source card must name the stored text/);
    expect(r.stderr).toMatch(/blocks\[1\]: "barmen-declaration" is not a stored text/);
  });

  it("fails a stored text edited after it was fetched, and a file nobody listed", () => {
    const root = fixture("tampered", {}, (corpus) => {
      const file = path.join(corpus, "texts", "ambrose-letter-51.html");
      fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace("pleasant", "plesant"));
      fs.writeFileSync(path.join(corpus, "texts", "stray.html"), "<p>unlisted</p>");
    });
    const r = verify("--root", root);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/ambrose-letter-51\.html has changed since it was fetched/);
    expect(r.stderr).toMatch(/texts\/stray\.html is not in the manifest/);
  });

  it("fails a manifest entry that has lost its translator or its commit, and a stale PROVENANCE.md", () => {
    const root = fixture("provenance", {}, (corpus) => {
      const file = path.join(corpus, "manifest.json");
      const m = JSON.parse(fs.readFileSync(file, "utf8"));
      delete m.texts[0].translator;
      delete m.texts[1].origin.commit;
      fs.writeFileSync(file, JSON.stringify(m, null, 2));
    });
    const r = verify("--root", root);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/\(martyrdom-of-polycarp\): "translator" is missing/);
    expect(r.stderr).toMatch(/\(passion-of-perpetua\): origin needs the commit/);
    expect(r.stderr).toMatch(/PROVENANCE\.md is out of date/);
  });
});
