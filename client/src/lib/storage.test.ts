import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readStoredJSON, writeStoredJSON, isArrayOf } from "./storage";

const KEY = "livewell-test-key";
const isStringArray = isArrayOf((x): x is string => typeof x === "string");

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("readStoredJSON", () => {
  it("returns the stored value when it parses and passes the guard", () => {
    window.localStorage.setItem(KEY, JSON.stringify(["a", "b"]));
    expect(readStoredJSON(KEY, isStringArray, [])).toEqual(["a", "b"]);
  });

  it("returns the fallback when the key is absent", () => {
    expect(readStoredJSON(KEY, isStringArray, ["default"])).toEqual(["default"]);
  });

  it("returns the fallback on corrupt JSON instead of throwing", () => {
    window.localStorage.setItem(KEY, "{not json");
    expect(readStoredJSON(KEY, isStringArray, [])).toEqual([]);
  });

  it("returns the fallback when the shape guard rejects — the blank-page case", () => {
    // Valid JSON, wrong shape: exactly what used to crash pages holding
    // pastoral records ({} where an array was assumed).
    window.localStorage.setItem(KEY, JSON.stringify({ items: {} }));
    expect(readStoredJSON(KEY, isStringArray, [])).toEqual([]);
  });

  it("filters nothing itself — element validation belongs to the guard", () => {
    window.localStorage.setItem(KEY, JSON.stringify(["a", 5]));
    expect(readStoredJSON(KEY, isStringArray, ["fallback"])).toEqual(["fallback"]);
  });
});

describe("writeStoredJSON", () => {
  it("persists and reports true", () => {
    expect(writeStoredJSON(KEY, { n: 1 })).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(KEY) ?? "")).toEqual({ n: 1 });
  });

  it("reports false when storage refuses (quota, private mode) instead of failing silently", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("QuotaExceededError");
    });
    expect(writeStoredJSON(KEY, "big")).toBe(false);
  });
});
