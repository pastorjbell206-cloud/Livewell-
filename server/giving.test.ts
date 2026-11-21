/**
 * Money-path contract for gifts (/support), with giving OPEN: the shared
 * check (shared/giving.ts), the Stripe request, and both runtimes behind
 * `giving.status` and `giving.createCheckout` (server/giving-router.ts in
 * dev, api/index.ts in production).
 *
 * No real Stripe call is made: the `stripe` package is replaced by a recorder,
 * and the key is a made-up test value. The switch file is replaced by an open
 * one, so these tests do not depend on what is committed; the held state is
 * in giving-held.test.ts.
 *
 *  - an amount is whole dollars, from GIFT_MIN_USD to GIFT_MAX_USD
 *  - a monthly gift is one of the listed amounts, and is a subscription
 *  - a one-time gift is a payment
 *  - no Stripe key: both runtimes refuse with "Giving isn't open yet."
 *  - the page's input never chooses where Stripe sends the giver back
 *  - nothing about the giver is sent, stored or logged
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import superjson from "superjson";
import {
  GIFT_MAX_USD,
  GIFT_MIN_USD,
  GIFT_MONTHLY_PRESETS_USD,
  GIFT_ONCE_PRESETS_USD,
  GIVING_CLOSED_MESSAGE,
  checkGift,
  describeGift,
  giftCheckoutParams,
} from "@shared/giving";

const { create } = vi.hoisted(() => ({ create: vi.fn() }));

vi.mock("stripe", () => ({
  default: class FakeStripe {
    checkout = { sessions: { create } };
  },
}));

vi.mock("../client/src/lib/giving.json", () => ({
  default: { open: true, recipientLine: "A line for the test.", taxLine: "A line for the test." },
}));

/** Made up for the tests: the shape of a key, and nothing more. */
const TEST_KEY = "sk_test_made_up_for_the_giving_tests";
const CHECKOUT_URL = "https://checkout.stripe.com/c/pay/cs_test_gift";

describe("the one check every gift passes", () => {
  it("takes each amount the page offers", () => {
    for (const n of GIFT_ONCE_PRESETS_USD) expect(checkGift({ frequency: "once", amountUsd: n }).ok).toBe(true);
    for (const n of GIFT_MONTHLY_PRESETS_USD) expect(checkGift({ frequency: "monthly", amountUsd: n }).ok).toBe(true);
  });

  it("takes any whole one-time amount from the least to the most", () => {
    expect(checkGift({ frequency: "once", amountUsd: GIFT_MIN_USD })).toEqual({ ok: true, gift: { frequency: "once", amountUsd: GIFT_MIN_USD } });
    expect(checkGift({ frequency: "once", amountUsd: 37 }).ok).toBe(true);
    expect(checkGift({ frequency: "once", amountUsd: GIFT_MAX_USD }).ok).toBe(true);
  });

  it("refuses less than the least and more than the most", () => {
    expect(checkGift({ frequency: "once", amountUsd: GIFT_MIN_USD - 1 }).ok).toBe(false);
    expect(checkGift({ frequency: "once", amountUsd: 0 }).ok).toBe(false);
    expect(checkGift({ frequency: "once", amountUsd: -25 }).ok).toBe(false);
    expect(checkGift({ frequency: "once", amountUsd: GIFT_MAX_USD + 1 }).ok).toBe(false);
  });

  it("refuses anything that is not whole dollars", () => {
    for (const bad of [12.5, Number.NaN, Number.POSITIVE_INFINITY, "25", null, undefined, {}, [25]]) {
      expect(checkGift({ frequency: "once", amountUsd: bad }).ok).toBe(false);
    }
  });

  it("refuses a monthly amount that is not listed, and an unknown frequency", () => {
    expect(checkGift({ frequency: "monthly", amountUsd: 7 }).ok).toBe(false);
    expect(checkGift({ frequency: "monthly", amountUsd: GIFT_MAX_USD }).ok).toBe(false);
    expect(checkGift({ frequency: "yearly", amountUsd: 25 }).ok).toBe(false);
    expect(checkGift({ amountUsd: 25 }).ok).toBe(false);
    expect(checkGift(null).ok).toBe(false);
  });

  it("drops anything else sent with a gift", () => {
    const checked = checkGift({ frequency: "once", amountUsd: 25, origin: "https://elsewhere.example", email: "someone" });
    expect(checked).toEqual({ ok: true, gift: { frequency: "once", amountUsd: 25 } });
  });

  it("says a gift in plain words", () => {
    expect(describeGift({ frequency: "once", amountUsd: 25 })).toBe("A one-time gift of $25");
    expect(describeGift({ frequency: "monthly", amountUsd: 10 })).toBe("A gift of $10 each month");
    expect(describeGift({ frequency: "once", amountUsd: 5000 })).toBe("A one-time gift of $5,000");
  });
});

describe("the Stripe request for a gift", () => {
  it("a one-time gift is a payment, in cents, in US dollars, priced inline", () => {
    const p = giftCheckoutParams({ frequency: "once", amountUsd: 25 }, "https://www.livewellbyjamesbell.co");
    expect(p.mode).toBe("payment");
    expect(p.line_items).toHaveLength(1);
    expect(p.line_items[0].quantity).toBe(1);
    expect(p.line_items[0].price_data.currency).toBe("usd");
    expect(p.line_items[0].price_data.unit_amount).toBe(2500);
    expect(p.line_items[0].price_data).not.toHaveProperty("recurring");
    expect(p.line_items[0]).not.toHaveProperty("price");
  });

  it("a monthly gift is a subscription that renews each month", () => {
    const p = giftCheckoutParams({ frequency: "monthly", amountUsd: 10 }, "https://www.livewellbyjamesbell.co");
    expect(p.mode).toBe("subscription");
    expect(p.line_items[0].price_data.unit_amount).toBe(1000);
    expect(p.line_items[0].price_data).toMatchObject({ recurring: { interval: "month" } });
    expect(p).not.toHaveProperty("submit_type");
  });

  it("sends the giver back to this site, and says nothing about who they are", () => {
    const p = giftCheckoutParams({ frequency: "once", amountUsd: 50 }, "https://www.livewellbyjamesbell.co");
    expect(p.success_url).toBe("https://www.livewellbyjamesbell.co/support/thanks");
    expect(p.cancel_url).toBe("https://www.livewellbyjamesbell.co/support?cancelled=1");
    expect(p.metadata).toEqual({ kind: "gift", frequency: "once" });
    expect(JSON.stringify(p)).not.toMatch(/email|customer|name":\s*"[^"]*@/i);
  });
});

type Handler = (req: unknown, res: unknown) => Promise<unknown>;

describe("giving in both runtimes, open", () => {
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
    create.mockResolvedValue({ id: "cs_test_gift", url: CHECKOUT_URL });
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

  /** One call to the production function, the way the page's tRPC client makes it. */
  async function prod(proc: string, input?: unknown) {
    let status = 0;
    let body = "";
    const headers: Record<string, string> = {};
    const res = {
      setHeader: (k: string, v: string) => {
        headers[k.toLowerCase()] = v;
        return res;
      },
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
    const mutation = input !== undefined;
    await handler(
      {
        method: mutation ? "POST" : "GET",
        url: `/api/trpc/${proc}?batch=1`,
        headers: { host: "www.livewellbyjamesbell.co", "x-forwarded-proto": "https" },
        query: {},
        body: mutation ? { "0": { json: input } } : undefined,
      },
      res
    );
    const parsed = JSON.parse(body);
    return { status, headers, parsed, data: parsed[0]?.result ? superjson.deserialize(parsed[0].result.data) : undefined, error: parsed[0]?.error };
  }

  async function dev() {
    const { appRouter } = await import("./routers");
    return appRouter.createCaller({
      req: { headers: { host: "localhost:3000" }, protocol: "http" },
      res: {},
      user: null,
    } as never);
  }

  it("with no Stripe key, both runtimes say giving is not open and refuse a gift", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "");
    expect((await prod("giving.status")).data).toEqual({ open: false });
    const refused = await prod("giving.createCheckout", { frequency: "once", amountUsd: 25 });
    expect(refused.status).toBe(400);
    expect(refused.error.message).toBe(GIVING_CLOSED_MESSAGE);

    const caller = await dev();
    expect(await caller.giving.status()).toEqual({ open: false });
    await expect(caller.giving.createCheckout({ frequency: "once", amountUsd: 25 })).rejects.toThrow(GIVING_CLOSED_MESSAGE);
    expect(create).not.toHaveBeenCalled();
  });

  it("the build-time placeholder key counts as no key", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_placeholder");
    expect((await prod("giving.status")).data).toEqual({ open: false });
    expect(await (await dev()).giving.status()).toEqual({ open: false });
  });

  it("production starts a one-time gift and hands back Stripe's address, uncached", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    expect((await prod("giving.status")).data).toEqual({ open: true });
    const out = await prod("giving.createCheckout", { frequency: "once", amountUsd: 25, origin: "https://elsewhere.example" });
    expect(out.status).toBe(200);
    expect(out.data).toEqual({ sessionUrl: CHECKOUT_URL });
    expect(out.headers["cache-control"]).toBe("no-store");
    expect(create).toHaveBeenCalledTimes(1);
    const sent = create.mock.calls[0][0];
    expect(sent).toEqual(giftCheckoutParams({ frequency: "once", amountUsd: 25 }, "https://www.livewellbyjamesbell.co"));
    expect(JSON.stringify(sent)).not.toContain("elsewhere.example");
  });

  it("production starts a monthly gift as a subscription", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    const out = await prod("giving.createCheckout", { frequency: "monthly", amountUsd: 10 });
    expect(out.status).toBe(200);
    expect(create.mock.calls[0][0]).toMatchObject({ mode: "subscription", line_items: [{ price_data: { unit_amount: 1000, recurring: { interval: "month" } } }] });
  });

  it("production refuses a bad amount before Stripe is asked", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    for (const bad of [
      { frequency: "once", amountUsd: 0 },
      { frequency: "once", amountUsd: GIFT_MAX_USD + 1 },
      { frequency: "once", amountUsd: 12.5 },
      { frequency: "once", amountUsd: "25" },
      { frequency: "monthly", amountUsd: 7 },
      { frequency: "weekly", amountUsd: 25 },
      {},
    ]) {
      const out = await prod("giving.createCheckout", bad);
      expect(out.status, JSON.stringify(bad)).toBe(400);
    }
    expect(create).not.toHaveBeenCalled();
  });

  it("production refuses a gift sent as a link (GET)", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    let status = 0;
    const res = { setHeader: () => res, status: (s: number) => ((status = s), res), send: () => res, json: () => res, end: () => res };
    await handler({ method: "GET", url: "/api/trpc/giving.createCheckout?batch=1", headers: {}, query: {} }, res);
    expect(status).toBe(405);
    expect(create).not.toHaveBeenCalled();
  });

  it("the dev router starts the same gift, from its own address", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    const caller = await dev();
    expect(await caller.giving.status()).toEqual({ open: true });
    expect(await caller.giving.createCheckout({ frequency: "monthly", amountUsd: 25 })).toEqual({ sessionUrl: CHECKOUT_URL });
    expect(create.mock.calls[0][0]).toEqual(giftCheckoutParams({ frequency: "monthly", amountUsd: 25 }, "http://localhost:3000"));
  });

  it("the dev router refuses a bad amount before Stripe is asked", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    const caller = await dev();
    await expect(caller.giving.createCheckout({ frequency: "once", amountUsd: 0 })).rejects.toThrow();
    await expect(caller.giving.createCheckout({ frequency: "once", amountUsd: GIFT_MAX_USD + 1 })).rejects.toThrow();
    await expect(caller.giving.createCheckout({ frequency: "once", amountUsd: 12.5 })).rejects.toThrow();
    await expect(caller.giving.createCheckout({ frequency: "monthly", amountUsd: 7 })).rejects.toThrow();
    await expect(caller.giving.createCheckout({ frequency: "weekly", amountUsd: 25 } as never)).rejects.toThrow();
    expect(create).not.toHaveBeenCalled();
  });

  it("when Stripe fails, both runtimes answer in their own words and log nothing about the gift", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", TEST_KEY);
    create.mockRejectedValue(new Error("card_declined: raw words from Stripe with sk_live_never_shown"));
    const out = await prod("giving.createCheckout", { frequency: "once", amountUsd: 4321 });
    expect(out.status).toBe(500);
    expect(out.error.message).toBe("The gift could not be started. Nothing was charged.");
    await expect((await dev()).giving.createCheckout({ frequency: "once", amountUsd: 4321 })).rejects.toThrow("The gift could not be started. Nothing was charged.");
    const all = JSON.stringify(logged);
    expect(all).not.toContain("4321");
    expect(all).not.toContain("raw words from Stripe");
    expect(all).not.toContain(TEST_KEY);
  });
});
