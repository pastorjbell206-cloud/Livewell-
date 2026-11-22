/**
 * Money-path contract for suggested gifts on downloads (James, 2026-11-22),
 * with giving OPEN: the amounts data and the one check (shared/downloads.ts),
 * the list of downloads (shared/download-items.json), the Stripe request, and
 * both runtimes behind `giving.createDownloadCheckout`
 * (server/giving-router.ts in dev, api/index.ts in production).
 *
 * No real Stripe call is made: the `stripe` package is replaced by a
 * recorder and the key is a made-up test value. The switch file is replaced
 * by an open one; the held state is in download-gifts-held.test.ts.
 *
 *  - every download has a kind, a title and a suggested gift on the ladder
 *  - a download is named by an id from the list, never by a file path
 *  - an amount is whole cents from $1 to $5,000
 *  - the page never chooses where Stripe sends the giver back
 *  - nothing about the giver or the gift is stored or logged
 */
import fs from "node:fs";
import path from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import superjson from "superjson";
import { GIVING_CLOSED_MESSAGE, GIFT_MAX_USD, GIFT_MIN_USD } from "@shared/giving";
import {
  DOWNLOAD_GIFT_MAX_CENTS,
  DOWNLOAD_GIFT_MIN_CENTS,
  DOWNLOAD_KINDS,
  ITEM_SUGGESTED_CENTS,
  NO_ASK_ITEMS,
  SMALL_ASK_CENTS,
  asksForGift,
  checkDownloadGift,
  downloadGiftCheckoutParams,
  downloadIdForHref,
  downloadKind,
  formatUsd,
  giftPresetsCents,
  isSmallAsk,
  parseUsdToCents,
  suggestedCents,
} from "@shared/downloads";
import ITEMS_JSON from "@shared/download-items.json";
import { FREE_EBOOKS, HELD_EBOOKS } from "../client/src/data/ebooks";
import { BOOKLETS, HELD_BOOKLETS } from "../client/src/data/booklets";

const ITEMS = ITEMS_JSON as Record<string, string>;
const IDS = Object.keys(ITEMS);

const { create } = vi.hoisted(() => ({ create: vi.fn() }));

vi.mock("stripe", () => ({
  default: class FakeStripe {
    checkout = { sessions: { create } };
  },
}));

vi.mock("../client/src/lib/giving.json", () => ({
  default: { open: true, recipientLine: "A line for the test.", taxLine: "A line for the test." },
}));

const TEST_KEY = "sk_test_made_up_for_the_giving_tests";
const CHECKOUT_URL = "https://checkout.stripe.com/c/pay/cs_test_download_gift";
const SITE = "https://www.livewellbyjamesbell.co";

describe("the amounts data", () => {
  it("every download has a known kind, a title, and a suggested gift on the ladder", () => {
    const LADDER = [199, 299, 399, 499, 599, 699, 899];
    expect(IDS.length).toBeGreaterThan(150);
    for (const id of IDS) {
      expect(downloadKind(id), id).not.toBeNull();
      expect(ITEMS[id].trim().length, id).toBeGreaterThan(2);
      expect(LADDER, id).toContain(suggestedCents(id));
    }
  });

  it("nothing is suggested under $1.99, and nothing over $8.99", () => {
    for (const kind of Object.values(DOWNLOAD_KINDS)) {
      expect(kind.suggestedCents).toBeGreaterThanOrEqual(199);
      expect(kind.suggestedCents).toBeLessThanOrEqual(899);
    }
    for (const cents of Object.values(ITEM_SUGGESTED_CENTS)) {
      expect(cents).toBeGreaterThanOrEqual(199);
      expect(cents).toBeLessThanOrEqual(899);
    }
  });

  it("every item named in the data is a real download", () => {
    for (const id of [...Object.keys(ITEM_SUGGESTED_CENTS), ...NO_ASK_ITEMS]) expect(IDS, id).toContain(id);
  });

  it("the ladder: full books, shorter books, booklets, guides, sheets", () => {
    expect(suggestedCents("ebook:when-god-bless-america")).toBe(899);
    expect(suggestedCents("ebook:the-monster-in-the-mirror")).toBe(899);
    expect(suggestedCents("ebook:believe")).toBe(899);
    expect(suggestedCents("ebook:the-reliability-of-scripture")).toBe(699);
    expect(suggestedCents("ebook:bible-and-homosexuality")).toBe(599);
    expect(suggestedCents("ebook:church-governance")).toBe(399);
    expect(suggestedCents("workbook:before-you-marry")).toBe(499);
    expect(suggestedCents("study-guide:lament")).toBe(299);
    expect(suggestedCents("family:advent")).toBe(299);
    expect(suggestedCents("family:holy-week")).toBe(199);
    expect(suggestedCents("worksheet:prayer-list")).toBe(199);
    expect(suggestedCents("nothing:at-all")).toBe(0);
  });

  it("the hard places never raise the sheet", () => {
    for (const id of IDS.filter((i) => i.startsWith("care-page:") || i.startsWith("care-plan:"))) expect(asksForGift(id), id).toBe(false);
    expect(asksForGift("worksheet:first-response")).toBe(false);
    expect(asksForGift("worksheet:grief-journal")).toBe(false);
    expect(asksForGift("worksheet:prayer-list")).toBe(true);
    expect(asksForGift("ebook:believe")).toBe(true);
    expect(asksForGift("family:advent")).toBe(true);
  });

  it("a small ask is $1.99 or less", () => {
    expect(SMALL_ASK_CENTS).toBe(199);
    expect(isSmallAsk("card-set:family-cards")).toBe(true);
    expect(isSmallAsk("family:holy-week")).toBe(true);
    expect(isSmallAsk("study-guide:lament")).toBe(false);
    expect(isSmallAsk("ebook:believe")).toBe(false);
  });

  it("the sheet's amounts hold the suggested one, one below it and two above", () => {
    for (const id of IDS) {
      const s = suggestedCents(id);
      const presets = giftPresetsCents(s);
      expect(presets).toHaveLength(4);
      expect(presets[1]).toBe(s);
      expect(presets[0]).toBeLessThan(s);
      expect(presets[2]).toBeGreaterThan(s);
      expect(presets[3]).toBeGreaterThan(presets[2]);
      for (const p of presets) expect(checkDownloadGift({ itemId: id, amountCents: p }, ITEMS).ok).toBe(true);
    }
  });

  it("says and reads money plainly", () => {
    expect(formatUsd(899)).toBe("$8.99");
    expect(formatUsd(500)).toBe("$5");
    expect(formatUsd(500000)).toBe("$5,000");
    expect(parseUsdToCents("8.99")).toBe(899);
    expect(parseUsdToCents("$12")).toBe(1200);
    expect(parseUsdToCents(" 3.5 ")).toBe(350);
    for (const bad of ["", "abc", "1.234", "-5", "5 dollars", "1e3"]) expect(parseUsdToCents(bad), bad).toBeNull();
  });

  it("the limits are the giving page's own", () => {
    expect(DOWNLOAD_GIFT_MIN_CENTS).toBe(GIFT_MIN_USD * 100);
    expect(DOWNLOAD_GIFT_MAX_CENTS).toBe(GIFT_MAX_USD * 100);
  });
});

describe("which address is which download", () => {
  it("every listed ebook and booklet file is a download in the list", () => {
    for (const b of [...FREE_EBOOKS, ...BOOKLETS]) {
      const id = downloadIdForHref(b.pdf);
      expect(id, b.pdf).not.toBeNull();
      expect(IDS, b.pdf).toContain(id);
      if (b.epub) expect(downloadIdForHref(b.epub)).toBe(id);
    }
  });

  it("no held book is in the list, under any name", () => {
    const listed = new Set(IDS);
    for (const b of HELD_EBOOKS) expect(listed.has(`ebook:${b.slug}`), b.slug).toBe(false);
    for (const b of HELD_BOOKLETS) expect(listed.has(downloadIdForHref(b.pdf) ?? ""), b.slug).toBe(false);
    expect(JSON.stringify(ITEMS)).not.toMatch(/Pastors Connection/i);
  });

  it("several files are one download", () => {
    expect(downloadIdForHref("/downloads/studyguides/lament-leader.pdf")).toBe("study-guide:lament");
    expect(downloadIdForHref("/downloads/studyguides/lament-participant.pdf")).toBe("study-guide:lament");
    expect(downloadIdForHref("/downloads/tools/family-cards-letter.pdf")).toBe("card-set:family-cards");
    expect(downloadIdForHref("/downloads/tools/family-cards-a4.pdf")).toBe("card-set:family-cards");
    expect(downloadIdForHref("/downloads/tools/worry-log-a4.pdf")).toBe("worksheet:worry-log");
    expect(downloadIdForHref("/downloads/seasonal/advent-family-letter.pdf")).toBe("family:advent");
    expect(downloadIdForHref("/downloads/help/grief-prayer-a4.pdf")).toBe("care-page:grief");
    expect(downloadIdForHref("/downloads/plans/grief-booklet-letter.pdf")).toBe("care-plan:grief");
    expect(downloadIdForHref("/downloads/context/the-slavery-texts.pdf")).toBe("context-guide:the-slavery-texts");
    expect(downloadIdForHref("/downloads/reading-plans/psalms-in-30-days-letter.pdf")).toBe("reading-plan:psalms-in-30-days");
    expect(downloadIdForHref("/downloads/workbooks/before-you-marry-a4.pdf")).toBe("workbook:before-you-marry");
    expect(downloadIdForHref("/downloads/reading-paths/skeptic.pdf")).toBe("reading-path:skeptic");
    expect(downloadIdForHref("/ebook/believe/Believe.pdf?x=1#p")).toBe("ebook:believe");
  });

  it("anything else is not a download", () => {
    for (const href of ["/downloads", "/downloads/thanks", "/books/believe", "/covers/believe.jpg", "/ebook/believe/", "/ebook/../secret.pdf", "/downloads/tools/../../x-letter.pdf", "/api/ebook-download?slug=babylon", ""]) {
      expect(downloadIdForHref(href), href).toBeNull();
    }
  });
});

describe("the one check every download gift passes", () => {
  it("takes a listed download and an amount in whole cents within the limits", () => {
    expect(checkDownloadGift({ itemId: "ebook:believe", amountCents: 899 }, ITEMS)).toEqual({ ok: true, gift: { itemId: "ebook:believe", title: ITEMS["ebook:believe"], amountCents: 899 } });
    expect(checkDownloadGift({ itemId: "study-guide:lament", amountCents: DOWNLOAD_GIFT_MIN_CENTS }, ITEMS).ok).toBe(true);
    expect(checkDownloadGift({ itemId: "study-guide:lament", amountCents: DOWNLOAD_GIFT_MAX_CENTS }, ITEMS).ok).toBe(true);
  });

  it("refuses a download that is not in the list, a file path, and a held book", () => {
    for (const itemId of ["ebook:not-a-book", "ebook:babylon", "/ebook/believe/Believe.pdf", "believe", "__proto__", "constructor", "toString", "", 7, null, undefined, {}]) {
      expect(checkDownloadGift({ itemId, amountCents: 899 }, ITEMS).ok, String(itemId)).toBe(false);
    }
  });

  it("refuses an amount that is too small, too large, or not whole cents", () => {
    for (const amountCents of [0, 99, -899, DOWNLOAD_GIFT_MAX_CENTS + 1, 8.99, Number.NaN, Number.POSITIVE_INFINITY, "899", null, undefined, {}]) {
      expect(checkDownloadGift({ itemId: "ebook:believe", amountCents }, ITEMS).ok, String(amountCents)).toBe(false);
    }
    expect(checkDownloadGift(null, ITEMS).ok).toBe(false);
  });

  it("drops anything else the page sends", () => {
    const checked = checkDownloadGift({ itemId: "ebook:believe", amountCents: 500, href: "/ebook/x/y.pdf", returnTo: "/somewhere-else" }, ITEMS);
    expect(checked).toEqual({ ok: true, gift: { itemId: "ebook:believe", title: ITEMS["ebook:believe"], amountCents: 500 } });
  });
});

describe("the Stripe request for a download gift", () => {
  const p = downloadGiftCheckoutParams({ itemId: "study-guide:lament", title: "Lament", amountCents: 299 }, SITE);

  it("is a one-time payment, in cents, in US dollars, priced inline, as a gift", () => {
    expect(p.mode).toBe("payment");
    expect(p.submit_type).toBe("donate");
    expect(p.line_items).toHaveLength(1);
    expect(p.line_items[0].price_data.currency).toBe("usd");
    expect(p.line_items[0].price_data.unit_amount).toBe(299);
    expect(p.line_items[0].price_data.product_data.name).toBe("Gift to LiveWell, with Lament");
    expect(p.line_items[0]).not.toHaveProperty("price");
  });

  it("sends the giver back to this site by the download's id, and says nothing about who they are", () => {
    expect(p.success_url).toBe(`${SITE}/downloads/thanks?item=study-guide%3Alament`);
    expect(p.cancel_url).toBe(`${SITE}/downloads/thanks?item=study-guide%3Alament&cancelled=1`);
    expect(p.metadata).toEqual({ kind: "download-gift", item: "study-guide:lament" });
    expect(Object.keys(p).sort()).toEqual(["cancel_url", "line_items", "metadata", "mode", "submit_type", "success_url"]);
    expect(JSON.stringify(p)).not.toMatch(/\.pdf|\.epub/i);
  });
});

type Handler = (req: unknown, res: unknown) => Promise<unknown>;

describe("giving with a download, in both runtimes, open", () => {
  let handler: Handler;
  const logged: unknown[][] = [];

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

  beforeEach(() => {
    create.mockReset();
    create.mockResolvedValue({ id: "cs_test_download_gift", url: CHECKOUT_URL });
    logged.length = 0;
    for (const level of ["log", "info", "warn", "error"] as const) {
      vi.spyOn(console, level).mockImplementation((...args: unknown[]) => {
        logged.push(args);
      });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.stubEnv("DATABASE_URL", "");
  });

  afterAll(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  async function prod(proc: string, input?: unknown, method?: string) {
    let status = 0;
    let body = "";
    const headers: Record<string, string> = {};
    const res = {
      setHeader: (k: string, v: string) => ((headers[k.toLowerCase()] = v), res),
      status: (s: number) => ((status = s), res),
      send: (b: string) => ((body = b), res),
      json: (b: unknown) => ((body = JSON.stringify(b)), res),
      end: () => res,
    };
    const mutation = input !== undefined;
    await handler(
      {
        method: method ?? (mutation ? "POST" : "GET"),
        url: `/api/trpc/${proc}?batch=1`,
        headers: { host: "www.livewellbyjamesbell.co", "x-forwarded-proto": "https" },
        query: {},
        body: mutation ? { "0": { json: input } } : undefined,
      },
      res
    );
    const parsed = body ? JSON.parse(body) : [];
    return { status, headers, parsed, data: parsed[0]?.result ? superjson.deserialize(parsed[0].result.data) : undefined, error: parsed[0]?.error ?? parsed.error };
  }

  async function dev() {
    const { appRouter } = await import("./routers");
    return appRouter.createCaller({ req: { headers: { host: "localhost:3000" }, protocol: "http" }, res: {}, user: null } as never);
  }

  const GIFT = { itemId: "ebook:believe", amountCents: 899 };

  it("with no Stripe key, both runtimes refuse", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "");
    const refused = await prod("giving.createDownloadCheckout", GIFT);
    expect(refused.status).toBe(400);
    expect(refused.error.message).toBe(GIVING_CLOSED_MESSAGE);
    await expect((await dev()).giving.createDownloadCheckout(GIFT)).rejects.toThrow(GIVING_CLOSED_MESSAGE);
    expect(create).not.toHaveBeenCalled();
  });

  it("production starts the gift and hands back Stripe's address, uncached", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    const out = await prod("giving.createDownloadCheckout", { ...GIFT, href: "/ebook/held/secret.pdf", returnTo: "/somewhere-else" });
    expect(out.status).toBe(200);
    expect(out.data).toEqual({ sessionUrl: CHECKOUT_URL });
    expect(out.headers["cache-control"]).toBe("no-store");
    expect(create).toHaveBeenCalledTimes(1);
    const sent = create.mock.calls[0][0];
    expect(sent).toEqual(downloadGiftCheckoutParams({ ...GIFT, title: ITEMS[GIFT.itemId] }, SITE));
    expect(JSON.stringify(sent)).not.toMatch(/somewhere-else|secret\.pdf/);
  });

  it("the dev router sends Stripe the same request", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    const out = await (await dev()).giving.createDownloadCheckout({ itemId: "family:advent", amountCents: 299 });
    expect(out).toEqual({ sessionUrl: CHECKOUT_URL });
    expect(create.mock.calls[0][0]).toEqual(downloadGiftCheckoutParams({ itemId: "family:advent", title: ITEMS["family:advent"], amountCents: 299 }, "http://localhost:3000"));
  });

  it("both runtimes refuse a bad download before Stripe is asked", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    const caller = await dev();
    for (const itemId of ["ebook:babylon", "ebook:not-a-book", "/ebook/believe/Believe.pdf", "__proto__", "x"]) {
      const out = await prod("giving.createDownloadCheckout", { itemId, amountCents: 899 });
      expect(out.status, itemId).toBe(400);
      await expect(caller.giving.createDownloadCheckout({ itemId, amountCents: 899 }), itemId).rejects.toThrow();
    }
    expect(create).not.toHaveBeenCalled();
  });

  it("both runtimes refuse a bad amount before Stripe is asked", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    const caller = await dev();
    for (const amountCents of [0, 99, DOWNLOAD_GIFT_MAX_CENTS + 1, 8.99, "899"]) {
      const out = await prod("giving.createDownloadCheckout", { itemId: "ebook:believe", amountCents });
      expect(out.status, String(amountCents)).toBe(400);
      await expect(caller.giving.createDownloadCheckout({ itemId: "ebook:believe", amountCents: amountCents as number }), String(amountCents)).rejects.toThrow();
    }
    expect((await prod("giving.createDownloadCheckout", {})).status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it("production takes the gift by POST only", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    const out = await prod("giving.createDownloadCheckout", GIFT, "GET");
    expect(out.status).toBeGreaterThanOrEqual(400);
    expect(create).not.toHaveBeenCalled();
  });

  it("when Stripe fails, both runtimes say so plainly and pass on none of Stripe's words", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    create.mockRejectedValue(new Error("card_declined: secret detail from Stripe"));
    const out = await prod("giving.createDownloadCheckout", GIFT);
    expect(out.status).toBe(500);
    expect(out.error.message).toBe("The gift could not be started. Nothing was charged.");
    await expect((await dev()).giving.createDownloadCheckout(GIFT)).rejects.toThrow("The gift could not be started. Nothing was charged.");
    expect(JSON.stringify(logged)).not.toMatch(/secret detail|card_declined/);
  });

  it("nothing about the gift is logged, in either runtime", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    await prod("giving.createDownloadCheckout", GIFT);
    await (await dev()).giving.createDownloadCheckout(GIFT);
    const said = JSON.stringify(logged);
    expect(said).not.toMatch(/899|8\.99|ebook:believe|Believe|cs_test_download_gift|checkout\.stripe\.com/);
  });

  it("neither runtime stores a download gift", () => {
    const root = path.resolve(__dirname, "..");
    const prodSrc = fs.readFileSync(path.join(root, "api/index.ts"), "utf8");
    const start = prodSrc.indexOf('case "giving.createDownloadCheckout"');
    const end = prodSrc.indexOf("// ─── Files (admin", start);
    expect(start).toBeGreaterThan(0);
    const block = prodSrc.slice(start, end);
    expect(block).not.toMatch(/withConn|INSERT|UPDATE |c\.execute|c\.query/);
    const devSrc = fs.readFileSync(path.join(root, "server/giving-router.ts"), "utf8");
    expect(devSrc).not.toMatch(/getDb|drizzle|insert\(|\.execute\(/);
  });
});
