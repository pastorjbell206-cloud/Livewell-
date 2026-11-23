/**
 * Carrying reading between devices (lib/carry): what goes in the file, what
 * comes back out, and how two devices' copies join without either losing
 * anything.
 */
import { describe, expect, it } from "vitest";
import {
  applyCarry,
  buildCarry,
  carryFileName,
  carryFromLinkData,
  carryToLinkData,
  describeCarry,
  mergeValues,
  parseCarry,
  type CarryFile,
} from "./carry";
import { withoutCarry } from "./carry-hash";

/** A plain Storage that refuses a write taking it past `room` characters, as a full browser does. */
class MemoryStorage implements Storage {
  private map = new Map<string, string>();
  writes = 0;
  constructor(private room = Infinity) {}
  private used(except?: string) {
    let n = 0;
    for (const [k, v] of this.map) if (k !== except) n += k.length + v.length;
    return n;
  }
  get length() {
    return this.map.size;
  }
  key(i: number) {
    return [...this.map.keys()][i] ?? null;
  }
  getItem(k: string) {
    return this.map.has(k) ? (this.map.get(k) as string) : null;
  }
  setItem(k: string, v: string) {
    if (this.used(k) + k.length + String(v).length > this.room) throw new DOMException("full", "QuotaExceededError");
    this.writes++;
    this.map.set(k, String(v));
  }
  removeItem(k: string) {
    this.map.delete(k);
  }
  clear() {
    this.map.clear();
  }
}

const file = (items: Record<string, string>, saved = "2026-11-23T10:00:00.000Z"): CarryFile => ({ kind: "livewell-reading", version: 1, saved, items });

const mark = (ref: string, updated: string, extra: Record<string, unknown> = {}) => ({ ref, slug: "john", chapter: 3, verse: Number(ref.split(".")[2]), label: `John 3:${ref.split(".")[2]}`, updated, ...extra });

describe("what a carry file holds", () => {
  it("takes the reader's own keys and leaves the device's", () => {
    const s = new MemoryStorage();
    s.setItem("livewell-marks-v1", "[]");
    s.setItem("lw-plan-anxiety", '{"done":{"1":true}}');
    s.setItem("livewell-text-size", '"large"');
    s.setItem("lw-seen", "1");
    s.setItem("lw_vid", "abc");
    s.setItem("theme", "dark");
    s.setItem("livewell:audience", "pastor");
    const f = buildCarry(s, new Date("2026-11-23T10:00:00.000Z"));
    expect(Object.keys(f.items).sort()).toEqual(["livewell-marks-v1", "lw-plan-anxiety"]);
    expect(f.items["lw-plan-anxiety"]).toBe('{"done":{"1":true}}');
    expect(carryFileName(f)).toBe("livewell-reading-2026-11-23.json");
  });

  it("reads back only a file this site made, and drops keys it does not carry", () => {
    const f = file({ "livewell-marks-v1": "[]" });
    expect(parseCarry(JSON.stringify(f))).toEqual(f);
    expect(parseCarry("not json")).toBeNull();
    expect(parseCarry(JSON.stringify({ ...f, kind: "something-else" }))).toBeNull();
    expect(parseCarry(JSON.stringify({ ...f, version: 2 }))).toBeNull();
    expect(parseCarry(JSON.stringify({ ...f, items: [] }))).toBeNull();
    const smuggled = parseCarry(JSON.stringify(file({ "livewell-marks-v1": "[]", theme: "dark", lw_vid: "x", "lw-seen": "1", "lw-plan-grief": "{}", "livewell-x": 5 as unknown as string })));
    expect(Object.keys(smuggled!.items).sort()).toEqual(["livewell-marks-v1", "lw-plan-grief"]);
  });

  it("names what it holds in plain words", () => {
    const f = file({
      "livewell-marks-v1": JSON.stringify([mark("jhn.3.16", "2026-11-01T00:00:00Z"), mark("jhn.3.17", "2026-11-01T00:00:00Z")]),
      "livewell-library-v1": JSON.stringify([{ href: "/help/grief", title: "Grief", kind: "Find Help", savedAt: "2026-11-01T00:00:00Z" }]),
      "livewell-study-walk-v1": JSON.stringify({ "john/3": { step: 2, label: "John 3", updated: "2026-11-01T00:00:00Z" } }),
      "lw-plan-anxiety": "{}",
      "livewell-progress-bible": "{}",
    });
    expect(describeCarry(f)).toEqual([
      "highlights and notes on 2 verses of the Bible",
      "1 saved page",
      "1 guided chapter study",
      "2 more things you saved or started (plans, tracks and tools)",
    ]);
  });
});

describe("joining two devices' copies", () => {
  it("keeps the newer version of one highlight and adds the ones this device lacks", () => {
    const here = [mark("jhn.3.16", "2026-11-01T00:00:00Z", { color: "a" }), mark("jhn.3.18", "2026-11-05T00:00:00Z", { note: "mine" })];
    const there = [mark("jhn.3.16", "2026-11-03T00:00:00Z", { color: "b" }), mark("jhn.3.17", "2026-11-02T00:00:00Z"), mark("jhn.3.18", "2026-11-04T00:00:00Z")];
    const out = mergeValues(here, there) as ReturnType<typeof mark>[];
    expect(out.map((m) => m.ref)).toEqual(["jhn.3.16", "jhn.3.18", "jhn.3.17"]);
    expect(out[0].color).toBe("b");
    expect(out[1].note).toBe("mine");
  });

  it("joins records key by key and keeps this device's single values", () => {
    expect(mergeValues({ startedAt: "A", done: { 1: true } }, { startedAt: "B", done: { 2: true } })).toEqual({ startedAt: "A", done: { 1: true, 2: true } });
    expect(mergeValues([1, 2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
    expect(mergeValues("3", "5")).toBe("3");
    expect(mergeValues(undefined, { a: 1 })).toEqual({ a: 1 });
  });

  it("adds, joins and counts, writing nothing it does not need to", () => {
    const s = new MemoryStorage();
    s.setItem("lw-plan-anxiety", JSON.stringify({ startedAt: "A", done: { 1: true } }));
    s.setItem("livewell-read-essays", JSON.stringify(["a", "b"]));
    s.writes = 0;
    const result = applyCarry(
      file({
        "lw-plan-anxiety": JSON.stringify({ startedAt: "B", done: { 2: true } }),
        "livewell-read-essays": JSON.stringify(["b", "a"]),
        "livewell-marks-v1": JSON.stringify([mark("jhn.3.16", "2026-11-01T00:00:00Z")]),
        theme: "dark",
      }),
      s,
    );
    expect(result).toEqual({ ok: true, added: 1, joined: 1, same: 1 });
    expect(JSON.parse(s.getItem("lw-plan-anxiety")!)).toEqual({ startedAt: "A", done: { 1: true, 2: true } });
    expect(s.getItem("livewell-read-essays")).toBe(JSON.stringify(["a", "b"]));
    expect(s.getItem("theme")).toBeNull();
    expect(s.writes).toBe(2);
  });

  it("brings in all of it or none of it when the browser runs out of room", () => {
    // Room for the joined plan and one new key (62 characters), not a second (83).
    const s = new MemoryStorage(70);
    s.setItem("lw-plan-anxiety", JSON.stringify({ done: { 1: true } }));
    const result = applyCarry(
      file({
        "lw-plan-anxiety": JSON.stringify({ done: { 2: true } }),
        "livewell-marks-v1": "[]",
        "livewell-library-v1": "[]",
      }),
      s,
    );
    expect(result.ok).toBe(false);
    expect(JSON.parse(s.getItem("lw-plan-anxiety")!)).toEqual({ done: { 1: true } });
    expect(s.getItem("livewell-marks-v1")).toBeNull();
    expect(s.getItem("livewell-library-v1")).toBeNull();
  });
});

describe("a link instead of a file", () => {
  it("carries a small file and reads it back", async () => {
    const f = file({ "lw-plan-anxiety": JSON.stringify({ done: { 1: true, 2: true } }), "livewell-marks-v1": JSON.stringify([mark("jhn.3.16", "2026-11-01T00:00:00Z", { note: "Love that gives" })]) });
    const data = await carryToLinkData(f);
    expect(data).toMatch(/^[zj][A-Za-z0-9_-]+$/);
    expect(await carryFromLinkData(data!)).toEqual(f);
  });

  it("sends a file too big for a link to a file instead", async () => {
    // Random letters do not squeeze, so this stays too long for a link.
    let noise = "";
    for (let i = 0; i < 12_000; i++) noise += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    expect(await carryToLinkData(file({ "livewell-worry-journal": JSON.stringify([noise]) }))).toBeNull();
  });

  it("refuses a link this site did not make", async () => {
    expect(await carryFromLinkData("x123")).toBeNull();
    expect(await carryFromLinkData("z!!!!")).toBeNull();
    expect(await carryFromLinkData(`j${btoa(JSON.stringify({ kind: "other" }))}`)).toBeNull();
  });

  it("never lets a page counter send a link's data", () => {
    expect(withoutCarry({ type: "pageview", url: "https://www.livewellbyjamesbell.co/my-library#carry=zAbC" })).toEqual({ type: "pageview", url: "https://www.livewellbyjamesbell.co/my-library" });
    const plain = { url: "https://www.livewellbyjamesbell.co/answers#does-god-actually-exist" };
    expect(withoutCarry(plain)).toBe(plain);
  });
});
