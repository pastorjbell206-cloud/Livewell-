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

  it("skips corrupt stored data instead of breaking", () => {
    localStorage.setItem(LIBRARY_KEY, "{not json");
    expect(readLibrary()).toEqual([]);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify([{ href: 3 }]));
    expect(readLibrary()).toEqual([]);
  });
});
