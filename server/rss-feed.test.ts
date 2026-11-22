/**
 * The essay feed (/rss.xml, api/index.ts rssLiveWell): the essays that live as
 * files in client/public/essays must be in it. Before this, the feed read only
 * the database rows of "live" shelf essays, so every rewritten essay, the
 * newest writing on the site, never reached a reader app.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import shelf from "../client/src/lib/shelf.json";
import { ESSAY_OVERRIDES } from "../client/src/lib/essayOverrides.generated";

type Item = { slug: string; title: string; excerpt: string; date: Date; body: string | null };
type Rows = { slug: string; title?: string; excerpt?: string; body?: string; publishedAt?: string; createdAt?: string }[];
type Handler = (req: unknown, res: unknown) => Promise<unknown>;

let rssItems: (rows: Rows, overrides?: typeof ESSAY_OVERRIDES, limit?: number) => Item[];
let handler: Handler;

beforeAll(async () => {
  vi.stubEnv("DATABASE_URL", "");
  const mod = (await import("../api/index")) as unknown as { default: Handler; rssItems: typeof rssItems };
  rssItems = mod.rssItems;
  handler = mod.default;
}, 60_000);

afterAll(() => {
  vi.unstubAllEnvs();
});

const live = shelf.essays.find((e) => e.status === "live" && !ESSAY_OVERRIDES.some((o) => o.slug === e.slug))!;
const pendingNoFile = shelf.essays.find((e) => e.status === "pending" && !ESSAY_OVERRIDES.some((o) => o.slug === e.slug))!;

describe("rssItems", () => {
  it("lists every essay file on the shelf, with the file's title and excerpt and no database body", () => {
    const items = rssItems([]);
    expect(ESSAY_OVERRIDES.length).toBeGreaterThan(0);
    for (const o of ESSAY_OVERRIDES) {
      const item = items.find((i) => i.slug === o.slug);
      expect(item, o.slug).toBeDefined();
      expect(item!.title).toBe(o.title);
      expect(item!.excerpt).toBe(o.excerpt);
      expect(item!.body).toBeNull();
    }
  });

  it("never sends the database row of an essay a file replaces", () => {
    const o = ESSAY_OVERRIDES[0];
    const items = rssItems([{ slug: o.slug, title: "Old title", body: "old text", publishedAt: "2020-01-01" }]);
    const mine = items.filter((i) => i.slug === o.slug);
    expect(mine).toHaveLength(1);
    expect(mine[0].title).toBe(o.title);
    expect(mine[0].body).toBeNull();
  });

  it("keeps live shelf rows, drops pending rows with no file and retired rows, and takes new posts after the cutoff", () => {
    // The limit is lifted here: this test is about which rows are kept, and the
    // essay files alone now fill the feed's default fifty places.
    const items = rssItems(
      [
        { slug: live.slug, title: "Live", body: "b", publishedAt: "2025-01-01" },
        { slug: pendingNoFile.slug, title: "Pending", body: "b", publishedAt: "2025-01-01" },
        { slug: "a-retired-essay-not-on-the-shelf", title: "Retired", body: "b", publishedAt: "2025-01-01" },
        { slug: "a-new-post-from-the-admin", title: "New", body: "b", publishedAt: "2099-01-01" },
      ],
      undefined,
      500,
    );
    const slugs = items.map((i) => i.slug);
    expect(slugs).toContain(live.slug);
    expect(slugs).not.toContain(pendingNoFile.slug);
    expect(slugs).not.toContain("a-retired-essay-not-on-the-shelf");
    expect(slugs[0]).toBe("a-new-post-from-the-admin");
  });

  it("ignores a file whose slug is not on the shelf, and sorts newest first", () => {
    const items = rssItems([], [
      { slug: "not-on-the-shelf", title: "X", excerpt: "x", updated: "2026-11-01T00:00:00.000Z" },
      { slug: live.slug, title: "Older", excerpt: "o", updated: "2026-01-01T00:00:00.000Z" },
      { slug: pendingNoFile.slug, title: "Newer", excerpt: "n", updated: "2026-06-01T00:00:00.000Z" },
    ]);
    expect(items.map((i) => i.slug)).toEqual([pendingNoFile.slug, live.slug]);
  });
});

describe("/rss.xml with no database", () => {
  it("still answers with a feed of the essay files", async () => {
    let status = 0;
    let body = "";
    const headers: Record<string, string> = {};
    const res = {
      setHeader: (k: string, v: string) => { headers[k.toLowerCase()] = v; return res; },
      status: (s: number) => { status = s; return res; },
      send: (b: string) => { body = b; return res; },
      json: (b: unknown) => { body = JSON.stringify(b); return res; },
      end: () => res,
    };
    await handler({ method: "GET", url: "/rss.xml", headers: {}, query: {} }, res);
    expect(status).toBe(200);
    expect(headers["content-type"]).toContain("application/rss+xml");
    for (const o of ESSAY_OVERRIDES) {
      expect(body).toContain(`<link>https://www.livewellbyjamesbell.co/writing/${o.slug}</link>`);
    }
    expect(body).not.toContain("<content:encoded>");
  });
});
