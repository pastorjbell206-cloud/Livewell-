/**
 * Gifts (/support) while the page is HELD: with the switch off, neither
 * runtime will start a gift, even with a Stripe key in place. The switch file
 * is replaced by a held one, so this holds whatever is committed; the open
 * state is in giving.test.ts.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import superjson from "superjson";
import { GIVING_CLOSED_MESSAGE } from "@shared/giving";

const { create } = vi.hoisted(() => ({ create: vi.fn() }));

vi.mock("stripe", () => ({
  default: class FakeStripe {
    checkout = { sessions: { create } };
  },
}));

vi.mock("../client/src/lib/giving.json", () => ({
  default: { open: false, recipientLine: "Held.", taxLine: "Held." },
}));

type Handler = (req: unknown, res: unknown) => Promise<unknown>;

describe("giving in both runtimes, held", () => {
  let handler: Handler;

  beforeAll(async () => {
    vi.stubEnv("DATABASE_URL", "");
    // A key is present: the switch alone must be enough to refuse.
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_made_up_for_the_giving_tests");
    handler = ((await import("../api/index")) as unknown as { default: Handler }).default;
  }, 60_000);

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  async function prod(proc: string, input?: unknown) {
    let status = 0;
    let body = "";
    const res = {
      setHeader: () => res,
      status: (s: number) => ((status = s), res),
      send: (b: string) => ((body = b), res),
      json: (b: unknown) => ((body = JSON.stringify(b)), res),
      end: () => res,
    };
    const mutation = input !== undefined;
    await handler({ method: mutation ? "POST" : "GET", url: `/api/trpc/${proc}?batch=1`, headers: {}, query: {}, body: mutation ? { "0": { json: input } } : undefined }, res);
    return { status, parsed: JSON.parse(body) };
  }

  it("production says giving is not open, and refuses a gift", async () => {
    const status = await prod("giving.status");
    expect(superjson.deserialize(status.parsed[0].result.data)).toEqual({ open: false });
    const refused = await prod("giving.createCheckout", { frequency: "once", amountUsd: 25 });
    expect(refused.status).toBe(400);
    expect(refused.parsed[0].error.message).toBe(GIVING_CLOSED_MESSAGE);
    expect(create).not.toHaveBeenCalled();
  });

  it("the dev router says the same", async () => {
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller({ req: { headers: {} }, res: {}, user: null } as never);
    expect(await caller.giving.status()).toEqual({ open: false });
    await expect(caller.giving.createCheckout({ frequency: "monthly", amountUsd: 10 })).rejects.toThrow(GIVING_CLOSED_MESSAGE);
    expect(create).not.toHaveBeenCalled();
  });
});
