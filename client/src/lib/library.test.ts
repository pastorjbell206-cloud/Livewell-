/**
 * My Library keeps what a reader saves in this browser, truthfully: a save
 * reports whether it landed, older essay bookmarks are not lost, and removing
 * an essay removes it from both stores.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { LEGACY_BOOKMARKS_KEY, LIBRARY_KEY, isInLibrary, libraryPath, readLibrary, removeFromLibrary, saveToLibrary } from "./library";

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("libraryPath", () => {
  it("keeps one spelling per page", () => {
    expect(libraryPath("https://www.livewellbyjamesbell.co/help/grief/")).toBe("/help/grief");
    expect(libraryPath("/plans/anxiety#week-3")).toBe("/plans/anxiety");
    expect(libraryPath("/tools/test-the-case?case=evil")).toBe("/tools/test-the-case?case=evil");
    expect(libraryPath("/")).toBe("/");
  });

  it("drops the tags a shared link picks up, and keeps a page's own query", () => {
    expect(libraryPath("/help/grief?fbclid=IwAR0abc&utm_source=facebook")).toBe("/help/grief");
    expect(libraryPath("/tools/test-the-case?case=evil&utm_medium=email&mc_cid=1")).toBe("/tools/test-the-case?case=evil");
  });
});

describe("saving and removing", () => {
  it("saves a page once, newest first, and finds it again", () => {
    expect(saveToLibrary({ href: "/help/grief", title: "Someone I love has died", kind: "Find Help" })).toBe(true);
    expect(saveToLibrary({ href: "/plans/anxiety", title: "Eight Weeks Toward a Quieter Mind", kind: "Eight-week plan" })).toBe(true);
    expect(saveToLibrary({ href: "/help/grief/", title: "Someone I love has died", kind: "Find Help" })).toBe(true);
    const items = readLibrary();
    expect(items.map((i) => i.href)).toEqual(["/help/grief", "/plans/anxiety"]);
    expect(isInLibrary("/help/grief")).toBe(true);
    expect(removeFromLibrary("/help/grief")).toBe(true);
    expect(isInLibrary("/help/grief")).toBe(false);
  });

  it("says so when the browser refuses the write", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(saveToLibrary({ href: "/help/grief", title: "Grief", kind: "Find Help" })).toBe(false);
  });

  it("reads the essay page's older bookmarks as saved essays, and removes them from both", () => {
    localStorage.setItem(LEGACY_BOOKMARKS_KEY, JSON.stringify(["every-generation-was-sure-it-was"]));
    const items = readLibrary();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ href: "/writing/every-generation-was-sure-it-was", kind: "Essay", title: "Every Generation Was Sure It Was Right" });
    expect(removeFromLibrary("/writing/every-generation-was-sure-it-was")).toBe(true);
    expect(readLibrary()).toHaveLength(0);
    expect(JSON.parse(localStorage.getItem(LEGACY_BOOKMARKS_KEY) ?? "[]")).toEqual([]);
  });

  it("keeps every good entry when one stored entry is bad", () => {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify([{ href: "/help/grief", title: "Grief", kind: "Find Help", savedAt: "2026-10-01T00:00:00.000Z" }, { href: 3 }]));
    expect(readLibrary().map((i) => i.href)).toEqual(["/help/grief"]);
    expect(saveToLibrary({ href: "/plans/anxiety", title: "Anxiety", kind: "Eight-week plan" })).toBe(true);
    expect(readLibrary().map((i) => i.href)).toEqual(["/plans/anxiety", "/help/grief"]);
  });

  it("keeps an essay's own date with the save", () => {
    // A post James might publish later: hypothetical, so its address is built, not written out.
    const href = `/writing/${"a-new-post"}`;
    saveToLibrary({ href, title: "A New Post", kind: "Essay", date: "2026-10-15T12:00:00.000Z" });
    expect(readLibrary()[0]).toMatchObject({ href, date: "2026-10-15T12:00:00.000Z" });
  });

  it("skips corrupt stored data instead of breaking", () => {
    localStorage.setItem(LIBRARY_KEY, "{not json");
    expect(readLibrary()).toEqual([]);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify([{ href: 3 }]));
    expect(readLibrary()).toEqual([]);
  });
});
