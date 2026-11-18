/**
 * The newest Substack titles (shared/substackLatest.ts), behind the
 * `substack.latest` procedure in both runtimes: the parser on a saved sample
 * with odd characters, a link off substack.com dropped, a failed fetch giving
 * an empty list, the cache, and both runtimes answering.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import superjson from "superjson";
import {
  SUBSTACK_CACHE_MS,
  SUBSTACK_FEED_URL,
  createSubstackCache,
  fetchSubstackLatest,
  isSubstackUrl,
  parseSubstackFeed,
} from "@shared/substackLatest";

/** A saved sample in Substack's shape, with the characters feeds get wrong. */
const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
<channel>
  <title><![CDATA[LiveWell by James Bell]]></title>
  <link>https://jamesbell333289.substack.com</link>
  <item>
    <title><![CDATA[When the Church Forgot Its Name: Faith & “Power” in 1789]]></title>
    <description><![CDATA[<p>A body that must never reach the page.</p>]]></description>
    <link>https://jamesbell333289.substack.com/p/when-the-church-forgot</link>
    <guid isPermaLink="false">https://jamesbell333289.substack.com/p/when-the-church-forgot</guid>
    <dc:creator><![CDATA[James Bell]]></dc:creator>
    <pubDate>Tue, 10 Nov 2026 13:02:11 GMT</pubDate>
    <enclosure url="https://substackcdn.com/image/fetch/x.jpg" length="0" type="image/jpeg"/>
    <content:encoded><![CDATA[<p>The whole post, which is never copied in.</p>]]></content:encoded>
  </item>
  <item>
    <title>Grace &amp; Grit: Ash Wednesday &#8212; and &#x2018;Lent&#x2019; &lt;again&gt;</title>
    <link>https://jamesbell333289.substack.com/p/grace-and-grit</link>
    <pubDate>Fri, 13 Nov 2026 09:00:00 GMT</pubDate>
  </item>
  <item>
    <title>A link that leaves Substack</title>
    <link>https://evil.example.com/p/phish</link>
    <pubDate>Sat, 14 Nov 2026 09:00:00 GMT</pubDate>
  </item>
  <item>
    <title>Looks like Substack but is not</title>
    <link>https://substack.com.evil.example/p/x</link>
    <pubDate>Sat, 14 Nov 2026 09:00:00 GMT</pubDate>
  </item>
  <item>
    <title>Plain http is refused</title>
    <link>http://jamesbell333289.substack.com/p/http</link>
    <pubDate>Sat, 14 Nov 2026 09:00:00 GMT</pubDate>
  </item>
  <item>
    <title>A script in a link</title>
    <link>javascript:alert(1)</link>
  </item>
  <item>
    <title></title>
    <link>https://jamesbell333289.substack.com/p/untitled</link>
  </item>
  <item>
    <title>Undated note</title>
    <link>https://substack.com/@jamesbell333289/note/c-1</link>
    <pubDate>not a date</pubDate>
  </item>
</channel>
</rss>`;

describe("parseSubstackFeed", () => {
  it("reads titles, links and dates, newest first, and decodes odd characters", () => {
    const items = parseSubstackFeed(SAMPLE);
    expect(items).toEqual([
      {
        title: "Grace & Grit: Ash Wednesday — and ‘Lent’ <again>",
        url: "https://jamesbell333289.substack.com/p/grace-and-grit",
        date: "2026-11-13",
      },
      {
        title: "When the Church Forgot Its Name: Faith & “Power” in 1789",
        url: "https://jamesbell333289.substack.com/p/when-the-church-forgot",
        date: "2026-11-10",
      },
      { title: "Undated note", url: "https://substack.com/@jamesbell333289/note/c-1", date: "" },
    ]);
  });

  it("drops every item whose link is not an https address on substack.com", () => {
    const urls = parseSubstackFeed(SAMPLE, 50).map((i) => i.url);
    expect(urls.some((u) => u.includes("example"))).toBe(false);
    expect(urls.some((u) => u.startsWith("http:") || u.startsWith("javascript:"))).toBe(false);
  });

  it("returns only title, url and date: no body, no image", () => {
    for (const item of parseSubstackFeed(SAMPLE)) {
      expect(Object.keys(item).sort()).toEqual(["date", "title", "url"]);
      expect(JSON.stringify(item)).not.toMatch(/never|substackcdn/);
    }
  });

  it("keeps to the limit, and gives [] for nothing or for junk", () => {
    expect(parseSubstackFeed(SAMPLE, 1)).toHaveLength(1);
    expect(parseSubstackFeed("")).toEqual([]);
    expect(parseSubstackFeed("<html>not a feed</html>")).toEqual([]);
    expect(parseSubstackFeed(undefined as unknown as string)).toEqual([]);
  });

  it("knows a Substack address", () => {
    expect(isSubstackUrl("https://substack.com/@jamesbell333289")).toBe(true);
    expect(isSubstackUrl("https://jamesbell333289.substack.com/p/x")).toBe(true);
    expect(isSubstackUrl("https://notsubstack.com/p/x")).toBe(false);
    expect(isSubstackUrl("https://user:pw@jamesbell333289.substack.com/p/x")).toBe(false);
    expect(isSubstackUrl("not a url")).toBe(false);
  });

  it("names its feed address in one constant", () => {
    expect(SUBSTACK_FEED_URL).toBe("https://jamesbell333289.substack.com/feed");
  });
});

describe("fetchSubstackLatest", () => {
  it("gives [] when the fetch fails", async () => {
    const failing = vi.fn(async () => {
      throw new Error("network down");
    });
    expect(await fetchSubstackLatest(failing)).toEqual([]);
  });

  it("gives [] on a bad status", async () => {
    const bad = vi.fn(async () => ({ ok: false, text: async () => SAMPLE }));
    expect(await fetchSubstackLatest(bad)).toEqual([]);
  });

  it("gives [] when the feed is too slow", async () => {
    const slow = vi.fn(
      (_url: string, init?: { signal?: AbortSignal }) =>
        new Promise<{ ok: boolean; text(): Promise<string> }>((_, reject) => {
          init?.signal?.addEventListener("abort", () => reject(new Error("aborted")));
        })
    );
    expect(await fetchSubstackLatest(slow, SUBSTACK_FEED_URL, 20)).toEqual([]);
  });

  it("asks the named feed address and parses what it gets", async () => {
    const ok = vi.fn(async () => ({ ok: true, text: async () => SAMPLE }));
    const items = await fetchSubstackLatest(ok);
    expect(ok).toHaveBeenCalledWith(SUBSTACK_FEED_URL, expect.anything());
    expect(items).toHaveLength(3);
  });
});

describe("createSubstackCache", () => {
  it("fetches once an hour, and keeps a good list through a later failure", async () => {
    let t = 1_000_000;
    let up = true;
    const f = vi.fn(async () => {
      if (!up) throw new Error("down");
      return { ok: true, text: async () => SAMPLE };
    });
    const latest = createSubstackCache(f, () => t);
    expect(await latest()).toHaveLength(3);
    expect(await latest()).toHaveLength(3);
    expect(f).toHaveBeenCalledTimes(1);
    t += SUBSTACK_CACHE_MS + 1;
    up = false;
    expect(await latest()).toHaveLength(3);
    expect(f).toHaveBeenCalledTimes(2);
  });
});

describe("substack.latest in both runtimes", () => {
  type Handler = (req: unknown, res: unknown) => Promise<unknown>;
  let handler: Handler;

  beforeAll(async () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("no network in tests");
      })
    );
    handler = ((await import("../api/index")) as unknown as { default: Handler }).default;
  }, 60_000);

  afterAll(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  async function call(url: string) {
    let status = 0;
    let body = "";
    const res = {
      setHeader: () => res,
      status: (s: number) => {
        status = s;
        return res;
      },
      send: (b: string) => {
        body = b;
        return res;
      },
      json: (b: unknown) => {
        body = JSON.stringify(b);
        return res;
      },
      end: () => res,
    };
    await handler({ method: "GET", url, headers: {}, query: {} }, res);
    return { status, body: JSON.parse(body) };
  }

  it("production answers an empty list when the feed cannot be reached (single and batched)", async () => {
    const one = await call("/api/trpc/substack.latest");
    expect(one.status).toBe(200);
    expect(superjson.deserialize(one.body[0].result.data)).toEqual([]);
    const two = await call("/api/trpc/substack.latest,auth.me?batch=1");
    expect(two.status).toBe(200);
    expect(superjson.deserialize(two.body[0].result.data)).toEqual([]);
  });

  it("the dev router answers an empty list too", async () => {
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller({ req: {}, res: {}, user: null } as never);
    expect(await caller.substack.latest()).toEqual([]);
  });
});
