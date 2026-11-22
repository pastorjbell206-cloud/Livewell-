/**
 * Suggested gifts on downloads while giving is HELD: with the switch off,
 * neither runtime will start a gift for a download, even with a Stripe key in
 * place. The switch file is replaced by a held one, so this holds whatever is
 * committed. The open state is in download-gifts.test.ts.
 *
 * Also here: the old ways to a book still work as they did. A past buyer of
 * a held ebook is still verified and served by the old Stripe ebook code,
 * which this work did not touch.
 */
import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { GIVING_CLOSED_MESSAGE } from "@shared/giving";

const { create, retrieve } = vi.hoisted(() => ({ create: vi.fn(), retrieve: vi.fn() }));

vi.mock("stripe", () => ({
  default: class FakeStripe {
    checkout = { sessions: { create, retrieve } };
  },
}));

vi.mock("../client/src/lib/giving.json", () => ({
  default: { open: false, recipientLine: "Held.", taxLine: "Held." },
}));

type Handler = (req: unknown, res: unknown) => Promise<unknown>;

describe("giving with a download, in both runtimes, held", () => {
  let handler: Handler;

  beforeAll(async () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_made_up_for_the_giving_tests");
    handler = ((await import("../api/index")) as unknown as { default: Handler }).default;
  }, 60_000);

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("production refuses, though a key is present", async () => {
    let status = 0;
    let body = "";
    const res = {
      setHeader: () => res,
      status: (s: number) => ((status = s), res),
      send: (b: string) => ((body = b), res),
      json: (b: unknown) => ((body = JSON.stringify(b)), res),
      end: () => res,
    };
    await handler({ method: "POST", url: "/api/trpc/giving.createDownloadCheckout?batch=1", headers: {}, query: {}, body: { "0": { json: { itemId: "ebook:believe", amountCents: 899 } } } }, res);
    expect(status).toBe(400);
    expect(JSON.parse(body)[0].error.message).toBe(GIVING_CLOSED_MESSAGE);
    expect(create).not.toHaveBeenCalled();
  });

  it("the dev router refuses the same way", async () => {
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller({ req: { headers: {} }, res: {}, user: null } as never);
    await expect(caller.giving.createDownloadCheckout({ itemId: "ebook:believe", amountCents: 899 })).rejects.toThrow(GIVING_CLOSED_MESSAGE);
    expect(create).not.toHaveBeenCalled();
  });
});

describe("the old Stripe ebook code and the held books are as they were", () => {
  const root = path.resolve(__dirname, "..");
  let handler: Handler;

  beforeAll(async () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_made_up_for_the_giving_tests");
    handler = ((await import("../api/index")) as unknown as { default: Handler }).default;
  }, 60_000);

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  /** One plain request to the production function. */
  async function call(method: string, url: string, query: Record<string, string>, body?: unknown) {
    let status = 0;
    let sent: unknown = null;
    const headers: Record<string, string> = {};
    const res = {
      setHeader: (k: string, v: string) => ((headers[k.toLowerCase()] = v), res),
      status: (s: number) => ((status = s), res),
      send: (b: unknown) => ((sent = b), res),
      json: (b: unknown) => ((sent = b), res),
      end: () => res,
    };
    await handler({ method, url, headers: {}, query, body }, res);
    return { status, sent, headers };
  }

  it("a past buyer of a held book still gets the file after the Stripe check", async () => {
    retrieve.mockResolvedValue({ id: "cs_test_past_buyer", payment_status: "paid", status: "complete", metadata: { slug: "babylon" } });
    const out = await call("GET", "/api/download?session_id=cs_test_past_buyer", { session_id: "cs_test_past_buyer" });
    expect(out.status).toBe(200);
    expect(out.headers["content-type"]).toBe("application/pdf");
    expect(out.headers["cache-control"]).toBe("private, no-store");
    const file = fs.readFileSync(path.join(root, "content/held-downloads/babylon.pdf"));
    expect(Buffer.isBuffer(out.sent) && (out.sent as Buffer).equals(file)).toBe(true);
  });

  it("an unpaid session gets nothing", async () => {
    retrieve.mockResolvedValue({ id: "cs_test_unpaid", payment_status: "unpaid", status: "open", metadata: { slug: "babylon" } });
    const out = await call("GET", "/api/download?session_id=cs_test_unpaid", { session_id: "cs_test_unpaid" });
    expect(out.status).toBe(402);
  });

  it("a gift given with a download never opens a held book", async () => {
    retrieve.mockResolvedValue({ id: "cs_test_gift", payment_status: "paid", status: "complete", metadata: { kind: "download-gift", item: "ebook:believe" } });
    const out = await call("GET", "/api/download?session_id=cs_test_gift", { session_id: "cs_test_gift" });
    expect(out.status).toBe(402);
    expect(Buffer.isBuffer(out.sent)).toBe(false);
  });

  it("the old checkout still refuses to sell a held book", async () => {
    const out = await call("POST", "/api/checkout", {}, { slug: "babylon" });
    expect(out.status).toBe(503);
    expect(create).not.toHaveBeenCalled();
  });

  it("every held file is still on disk for it, and still out of the public folder", () => {
    const held = fs.readdirSync(path.join(root, "content/held-downloads")).filter((f) => f.endsWith(".pdf"));
    expect(held).toHaveLength(23);
    for (const f of held) expect(fs.existsSync(path.join(root, "client/public/ebook", f.replace(/\.pdf$/, ""))), f).toBe(false);
  });

  it("the function still ships the held files", () => {
    const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
    expect(JSON.stringify(vercel.functions)).toContain("content/held-downloads");
  });
});
