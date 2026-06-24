/**
 * In-process cache primitive — the minimal caching layer the backend currently
 * lacks (see docs/backend-architecture.md §Caching strategy).
 *
 * Designed for the realities of this deployment:
 *   - Serverless (Vercel) warm instances live for minutes, so a process-local
 *     cache absorbs the repeated read traffic that today hits MySQL on every
 *     request (article lists, site settings, sitemaps). No external dependency,
 *     so it works identically in the dev Express server and the api/ function.
 *   - It is a *first tier*. When the workload outgrows one instance, the same
 *     `fetch(key, loader)` seam can front Redis/Upstash without touching callers.
 *
 * Three production concerns are handled explicitly:
 *   1. TTL expiry            — bounded staleness.
 *   2. Stale-while-revalidate — serve the last good value instantly while a
 *                               refresh runs in the background, so a cold key
 *                               never blocks a user behind a slow query.
 *   3. Single-flight          — concurrent misses for the same key share one
 *                               loader call, preventing a cache stampede from
 *                               hammering the database.
 *
 * Memory is bounded by an LRU cap so a warm instance cannot grow without limit.
 */

interface Entry<T> {
  value: T;
  /** Epoch ms when the value becomes stale. */
  freshUntil: number;
  /** Epoch ms after which even a stale value must not be served. */
  staleUntil: number;
}

export interface CacheOptions {
  /** How long a value is served without any refresh. */
  ttlMs: number;
  /**
   * Additional window during which a stale value is served immediately while a
   * background refresh runs. 0 disables stale-while-revalidate.
   */
  staleMs?: number;
  /** Maximum number of keys retained; least-recently-used evicted past this. */
  maxEntries?: number;
  /** Injectable clock (tests). Defaults to Date.now. */
  now?: () => number;
}

export class TTLCache<T = unknown> {
  private readonly store = new Map<string, Entry<T>>();
  private readonly inflight = new Map<string, Promise<T>>();
  private readonly ttlMs: number;
  private readonly staleMs: number;
  private readonly maxEntries: number;
  private readonly now: () => number;

  constructor(opts: CacheOptions) {
    if (opts.ttlMs <= 0) throw new Error("TTLCache: ttlMs must be > 0");
    this.ttlMs = opts.ttlMs;
    this.staleMs = opts.staleMs ?? 0;
    this.maxEntries = opts.maxEntries ?? 1000;
    this.now = opts.now ?? Date.now;
  }

  /** Fresh value for `key`, or undefined if missing/stale. Counts as a use (LRU). */
  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (this.now() >= entry.freshUntil) return undefined;
    this.touch(key, entry);
    return entry.value;
  }

  /** Store `value` under `key`, refreshing its TTL/stale windows. */
  set(key: string, value: T): void {
    const t = this.now();
    this.store.delete(key); // re-insert so Map order reflects recency
    this.store.set(key, {
      value,
      freshUntil: t + this.ttlMs,
      staleUntil: t + this.ttlMs + this.staleMs,
    });
    this.evict();
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
    this.inflight.clear();
  }

  get size(): number {
    return this.store.size;
  }

  /**
   * Read-through fetch with single-flight and stale-while-revalidate.
   *
   * - Fresh hit  -> returns the cached value.
   * - Stale hit  -> returns the stale value immediately and refreshes in the
   *                 background (failures keep the stale value).
   * - Hard miss  -> awaits `loader`; concurrent callers share one invocation.
   *                 The loader's rejection is propagated and never cached.
   */
  async fetch(key: string, loader: () => Promise<T>): Promise<T> {
    const entry = this.store.get(key);
    const t = this.now();

    if (entry && t < entry.freshUntil) {
      this.touch(key, entry);
      return entry.value;
    }

    if (entry && t < entry.staleUntil) {
      // Serve stale now; kick a background refresh (single-flight, errors swallowed).
      void this.load(key, loader).catch(() => {});
      this.touch(key, entry);
      return entry.value;
    }

    // Hard miss (or fully expired): callers must wait, but only one loader runs.
    return this.load(key, loader);
  }

  private load(key: string, loader: () => Promise<T>): Promise<T> {
    const existing = this.inflight.get(key);
    if (existing) return existing;

    const p = loader()
      .then((value) => {
        this.set(key, value);
        return value;
      })
      .finally(() => {
        this.inflight.delete(key);
      });

    this.inflight.set(key, p);
    return p;
  }

  private touch(key: string, entry: Entry<T>): void {
    this.store.delete(key);
    this.store.set(key, entry);
  }

  private evict(): void {
    while (this.store.size > this.maxEntries) {
      const oldest = this.store.keys().next().value;
      if (oldest === undefined) break;
      this.store.delete(oldest);
    }
  }
}

/**
 * Convenience: a module-level cache keyed by a string. Useful for the common
 * "memoize an expensive read for N seconds" case at a call site:
 *
 *   const posts = await published.fetch("all", () => listPosts(true));
 */
export function createCache<T>(opts: CacheOptions): TTLCache<T> {
  return new TTLCache<T>(opts);
}
