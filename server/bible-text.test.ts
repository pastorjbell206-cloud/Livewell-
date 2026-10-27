/**
 * The text-only chapter shards (client/public/bible/text/, read by the verse
 * sheet) are generated from the Study Bible's chapter files and committed. The
 * drift check in CI (scripts/build-bible-text.mjs --check) passes on the shards
 * as committed and fails when a shard differs from its chapter, is missing, or
 * has no chapter behind it.
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { OUT_DIR, SRC_DIR, renderShard, shardDrift, writeShards } from "../scripts/lib/bible-text.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const readJson = (p: string) => JSON.parse(fs.readFileSync(p, "utf8"));

let tmp = "";
let src = "";
let out = "";

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bible-text-"));
  src = path.join(tmp, "ch");
  out = path.join(tmp, "text");
  for (const [book, n] of [["john", 3], ["jude", 1], ["mark", 7]] as const) {
    fs.mkdirSync(path.join(src, book), { recursive: true });
    fs.copyFileSync(path.join(SRC_DIR, book, `${n}.json`), path.join(src, book, `${n}.json`));
  }
});

afterEach(() => {
  if (tmp) fs.rmSync(tmp, { recursive: true, force: true });
});

describe("text-only chapter shards", () => {
  it("as committed, regenerating them changes nothing", () => {
    const run = spawnSync(process.execPath, [path.join(ROOT, "scripts/build-bible-text.mjs"), "--check"], { cwd: ROOT, encoding: "utf8" });
    expect(run.status, run.stderr).toBe(0);
    expect(run.stdout).toMatch(/1189 text shards match/);
  });

  it("hold each verse's number and text, and nothing else", () => {
    const chapter = readJson(path.join(SRC_DIR, "john/3.json"));
    const shard = readJson(path.join(OUT_DIR, "john/3.json"));
    expect(shard.book).toBe("Jhn");
    expect(shard.chapter).toBe(3);
    expect(shard.verses).toEqual(chapter.verses.map((v: { v: number; t: string }) => ({ v: v.v, t: v.t })));
    expect(shard.verses[15].t).toMatch(/^For God so loved the world/);
    // A tenth of the chapter file: five references cost about 20 KB, not 200.
    expect(fs.statSync(path.join(OUT_DIR, "john/3.json")).size).toBeLessThan(fs.statSync(path.join(SRC_DIR, "john/3.json")).size / 5);
  });

  it("keep the mark on a verse the critical text omits", () => {
    const shard = JSON.parse(renderShard(readJson(path.join(SRC_DIR, "mark/7.json"))));
    expect(shard.verses.find((v: { v: number }) => v.v === 16)).toEqual({ v: 16, t: "", later: true });
  });

  it("are written for every chapter and then pass the check", () => {
    expect(shardDrift({ srcDir: src, outDir: out }).missing).toHaveLength(3);
    expect(writeShards({ srcDir: src, outDir: out })).toEqual({ count: 3, written: 3, removed: 0 });
    expect(shardDrift({ srcDir: src, outDir: out })).toEqual({ count: 3, stale: [], missing: [], extra: [] });
    expect(writeShards({ srcDir: src, outDir: out }).written).toBe(0);
  });

  it("fail the check when a shard is edited by hand, deleted, or orphaned", () => {
    writeShards({ srcDir: src, outDir: out });
    const shard = readJson(path.join(out, "john/3.json"));
    shard.verses[15].t = "For God so loved the world.";
    fs.writeFileSync(path.join(out, "john/3.json"), JSON.stringify(shard));
    fs.rmSync(path.join(out, "jude/1.json"));
    fs.mkdirSync(path.join(out, "tobit"));
    fs.writeFileSync(path.join(out, "tobit/1.json"), "{}");
    expect(shardDrift({ srcDir: src, outDir: out })).toEqual({
      count: 3,
      stale: ["john/3.json"],
      missing: ["jude/1.json"],
      extra: ["tobit/1.json"],
    });
    expect(writeShards({ srcDir: src, outDir: out })).toEqual({ count: 3, written: 2, removed: 1 });
    expect(shardDrift({ srcDir: src, outDir: out }).stale).toEqual([]);
  });

  it("fail the check when a chapter changes and its shard is not rebuilt", () => {
    writeShards({ srcDir: src, outDir: out });
    const chapter = readJson(path.join(src, "mark/7.json"));
    chapter.verses[0].t += " (revised)";
    fs.writeFileSync(path.join(src, "mark/7.json"), JSON.stringify(chapter));
    expect(shardDrift({ srcDir: src, outDir: out }).stale).toEqual(["mark/7.json"]);
  });
});
