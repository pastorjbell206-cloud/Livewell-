import { describe, it, expect, vi } from "vitest";
import { TTLCache, createCache } from "./_core/cache";

/**
 * Runs without a database. Exercises the production-critical guarantees of the
 * caching primitive: TTL, single-flight (stampede protection), stale-while-
 * revalidate, and bounded (LRU) memory.
 */

// A controllable clock so TTL math is deterministic.
function clock(start = 0) {
  let t = start;
  return {
    now: () => t,
    advance: (ms: number) => {
      t += ms;
    },
  };
}

describe("TTLCache.fetch — read-through + TTL", () => {
  it("calls the loader once within the TTL window", async () => {
    const c = clock();
    const cache = new TTLCache<number>({ ttlMs: 1000, now: c.now });
    const loader = vi.fn(async () => 42);

    expect(await cache.fetch("k", loader)).toBe(42);
    c.advance(500);
    expect(await cache.fetch("k", loader)).toBe(42);
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it("reloads after the TTL expires", async () => {
    const c = clock();
    const cache = new TTLCache<number>({ ttlMs: 1000, now: c.now });
    let n = 0;
    const loader = vi.fn(async () => ++n);

    expect(await cache.fetch("k", loader)).toBe(1);
    c.advance(1000); // now == freshUntil -> expired
    expect(await cache.fetch("k", loader)).toBe(2);
    expect(loader).toHaveBeenCalledTimes(2);
  });
});

describe("TTLCache.fetch — single-flight", () => {
  it("coalesces concurrent misses into one loader call", async () => {
    const cache = new TTLCache<string>({ ttlMs: 1000 });
    let resolve!: (v: string) => void;
    const loader = vi.fn(() => new Promise<string>((r) => (resolve = r)));

    const calls = Promise.all([
      cache.fetch("k", loader),
      cache.fetch("k", loader),
      cache.fetch("k", loader),
    ]);
    expect(loader).toHaveBeenCalledTimes(1);

    resolve("value");
    expect(await calls).toEqual(["value", "value", "value"]);
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it("does not cache a rejected loader and retries next time", async () => {
    const cache = new TTLCache<number>({ ttlMs: 1000 });
    const loader = vi
      .fn<() => Promise<number>>()
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValueOnce(7);

    await expect(cache.fetch("k", loader)).rejects.toThrow("boom");
    expect(await cache.fetch("k", loader)).toBe(7);
    expect(loader).toHaveBeenCalledTimes(2);
  });
});

describe("TTLCache.fetch — stale-while-revalidate", () => {
  it("serves the stale value immediately and refreshes in the background", async () => {
    const c = clock();
    const cache = new TTLCache<number>({ ttlMs: 1000, staleMs: 1000, now: c.now });
    let n = 1;
    const loader = vi.fn(async () => n++);

    expect(await cache.fetch("k", loader)).toBe(1); // primes cache with 1

    c.advance(1500); // stale (past ttl, within stale window)
    const served = await cache.fetch("k", loader); // returns stale immediately
    expect(served).toBe(1);

    // Let the background refresh settle, then the fresh value is cached.
    await vi.waitFor(() => expect(loader).toHaveBeenCalledTimes(2));
    expect(cache.get("k")).toBe(2);
  });

  it("blocks (does not serve stale) once past the stale window", async () => {
    const c = clock();
    const cache = new TTLCache<number>({ ttlMs: 1000, staleMs: 1000, now: c.now });
    let n = 1;
    const loader = vi.fn(async () => n++);

    await cache.fetch("k", loader); // 1
    c.advance(2500); // beyond ttl + stale -> hard miss
    expect(await cache.fetch("k", loader)).toBe(2);
  });
});

describe("TTLCache — LRU bound + manual control", () => {
  it("evicts the least-recently-used key past maxEntries", async () => {
    const cache = new TTLCache<number>({ ttlMs: 10_000, maxEntries: 2 });
    cache.set("a", 1);
    cache.set("b", 2);
    cache.get("a"); // 'a' is now most-recently-used
    cache.set("c", 3); // evicts 'b'

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("c")).toBe(3);
    expect(cache.size).toBe(2);
  });

  it("supports delete and clear", () => {
    const cache = createCache<number>({ ttlMs: 10_000 });
    cache.set("a", 1);
    cache.delete("a");
    expect(cache.get("a")).toBeUndefined();

    cache.set("b", 2);
    cache.clear();
    expect(cache.size).toBe(0);
  });

  it("rejects a non-positive ttl", () => {
    expect(() => new TTLCache({ ttlMs: 0 })).toThrow();
  });
});
