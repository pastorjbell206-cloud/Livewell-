/**
 * posts.listPublished's optional input (U29), in both runtimes.
 *
 * /writing asks for its shelf only ({ slugs, since }) instead of every
 * published row. The dev router (server/routers.ts with ./posts-listing) and
 * the production function (api/index.ts, both of its handlers) must answer the
 * same question with the same rows. These tests run the real production
 * handler with no database, so it serves the static essay library, and feed
 * the dev router that same listing, then compare.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import superjson from "superjson";

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { listPosts } from "./db";
import { pickListing } from "./posts-listing";
import { LATEST_CUTOFF, essayVisibility, essayDate, liveShelfEssays, shelfListingInput } from "@/lib/shelf";

vi.mock("./db", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./db")>()),
  listPosts: vi.fn(),
}));

type Row = { slug: string; publishedAt?: unknown; createdAt?: unknown };
type Handler = (req: unknown, res: unknown) => Promise<unknown>;

let prodHandler: Handler;
let prodPick: (rows: Row[], input: unknown) => Row[];
let listing: Row[] = [];

/** Calls the production function as the browser does: a GET with ?batch=1&input=. */
type TrpcAnswer = { result: { data: Parameters<typeof superjson.deserialize>[0] } };

async function callProd(procs: string[], inputs: unknown[]): Promise<{ status: number; body: TrpcAnswer[] }> {
  const encoded: Record<string, unknown> = {};
  inputs.forEach((input, i) => {
    encoded[String(i)] = superjson.serialize(input);
  });
  const input = JSON.stringify(encoded);
  const req = {
    method: "GET",
    url: `/api/trpc/${procs.join(",")}?batch=1&input=${encodeURIComponent(input)}`,
    query: { batch: "1", input },
    headers: {},
  };
  let status = 0;
  let sent = "";
  const res = {
    setHeader: () => res,
    status(s: number) {
      status = s;
      return res;
    },
    send(b: string) {
      sent = b;
      return res;
    },
    json(o: unknown) {
      sent = JSON.stringify(o);
      return res;
    },
    end: () => res,
  };
  await prodHandler(req, res);
  return { status, body: JSON.parse(sent) };
}

/** Production, the single-procedure handler (trpcHandler). */
async function prodSingle(input: unknown): Promise<Row[]> {
  const { status, body } = await callProd(["posts.listPublished"], [input]);
  expect(status).toBe(200);
  return superjson.deserialize(body[0].result.data) as Row[];
}

/** Production, the batch handler (processProc): the same question asked twice in one request. */
async function prodBatch(input: unknown): Promise<Row[]> {
  const { status, body } = await callProd(["posts.listPublished", "posts.listPublished"], [undefined, input]);
  expect(status).toBe(200);
  return superjson.deserialize(body[1].result.data) as Row[];
}

function devCaller() {
  const ctx = {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  } as TrpcContext;
  return appRouter.createCaller(ctx);
}

async function dev(input?: Parameters<ReturnType<typeof devCaller>["posts"]["listPublished"]>[0]): Promise<Row[]> {
  return (await devCaller().posts.listPublished(input)) as unknown as Row[];
}

const slugs = (rows: Row[]) => rows.map((r) => r.slug);

beforeAll(async () => {
  // No database: production serves the static essay library behind it.
  vi.stubEnv("DATABASE_URL", "");
  const mod = (await import("../api/index")) as unknown as { default: Handler; pickListing: typeof prodPick };
  prodHandler = mod.default;
  prodPick = mod.pickListing;
  listing = await prodSingle(undefined);
  // The dev router reads the same listing, so any difference is the rule's.
  vi.mocked(listPosts).mockResolvedValue(listing as never);
}, 60_000);

afterAll(() => {
  vi.unstubAllEnvs();
});

describe("posts.listPublished without input", () => {
  it("is the full listing in both runtimes, as before", async () => {
    expect(listing.length).toBeGreaterThan(100);
    expect(slugs(await prodBatch(undefined))).toEqual(slugs(listing));
    expect(slugs(await dev())).toEqual(slugs(listing));
    expect(slugs(await dev({}))).toEqual(slugs(listing));
  });
});

describe("posts.listPublished with { slugs, since }", () => {
  it("returns only the named rows, in the listing's order, in all three handlers", async () => {
    const named = [listing[7].slug, listing[2].slug, "no-such-essay"];
    const expected = [listing[2].slug, listing[7].slug];
    expect(slugs(await prodSingle({ slugs: named }))).toEqual(expected);
    expect(slugs(await prodBatch({ slugs: named }))).toEqual(expected);
    expect(slugs(await dev({ slugs: named }))).toEqual(expected);
  });

  it("returns rows dated at or after `since` by publishedAt, else createdAt", async () => {
    const dates = listing.map((r) => Date.parse(String(essayDate(r)))).filter(Number.isFinite).sort((a, b) => b - a);
    const since = new Date(dates[10]).toISOString();
    const expected = slugs(listing.filter((r) => Date.parse(String(essayDate(r))) >= dates[10]));
    expect(expected.length).toBeGreaterThan(0);
    expect(expected.length).toBeLessThan(listing.length);
    expect(slugs(await prodSingle({ since }))).toEqual(expected);
    expect(slugs(await prodBatch({ since }))).toEqual(expected);
    expect(slugs(await dev({ since }))).toEqual(expected);
  });

  it("returns the union when both are given, and nothing for an empty list", async () => {
    const dates = listing.map((r) => Date.parse(String(essayDate(r)))).filter(Number.isFinite).sort((a, b) => b - a);
    const since = new Date(dates[3]).toISOString();
    const old = listing[listing.length - 1].slug;
    const input = { slugs: [old], since };
    const expected = slugs(listing.filter((r) => r.slug === old || Date.parse(String(essayDate(r))) >= dates[3]));
    expect(slugs(await prodSingle(input))).toEqual(expected);
    expect(slugs(await dev(input))).toEqual(expected);

    expect(await prodSingle({ slugs: [] })).toEqual([]);
    expect(await dev({ slugs: [] })).toEqual([]);
  });

  it("answers the shelf's own question with the shelf and nothing retired", async () => {
    const input = shelfListingInput();
    expect(input.since).toBe(new Date(LATEST_CUTOFF).toISOString());
    expect(input.slugs).toEqual(liveShelfEssays().map((e) => e.slug));

    const prod = await prodSingle(input);
    expect(slugs(await dev(input))).toEqual(slugs(prod));
    expect(prod.length).toBeLessThan(listing.length);
    // Every row that comes back is one /writing shows; every shelf essay the
    // listing carries comes back.
    for (const r of prod) expect(["shelf", "latest"]).toContain(essayVisibility(r.slug, essayDate(r)));
    const carried = new Set(slugs(listing));
    for (const slug of input.slugs) if (carried.has(slug)) expect(slugs(prod)).toContain(slug);
  });

  it("rejects a malformed field in dev; production ignores it and sends the full listing", async () => {
    await expect(dev({ since: "last tuesday" })).rejects.toThrow();
    expect((await prodSingle({ since: "last tuesday" })).length).toBe(listing.length);
  });
});

describe("the rule itself, the same in both runtimes", () => {
  // Database rows carry Date objects, and publishedAt is null for a post the
  // editor created already published; static rows carry ISO strings.
  const rows: Row[] = [
    { slug: "new-from-admin", publishedAt: null, createdAt: new Date("2026-11-02T14:00:00Z") },
    { slug: "draft-finished-later", publishedAt: new Date("2026-10-20T09:00:00Z"), createdAt: new Date("2026-10-01T09:00:00Z") },
    { slug: "on-the-shelf", publishedAt: "2026-04-30T22:44:29.000Z", createdAt: "2026-04-30T22:44:29.000Z" },
    { slug: "retired", publishedAt: "2026-07-07T20:02:19.000Z", createdAt: "2026-07-07T20:02:19.000Z" },
    { slug: "exactly-at-the-cutoff", publishedAt: "2026-10-13T00:00:00.000Z", createdAt: "2026-10-13T00:00:00.000Z" },
    { slug: "no-dates" },
  ];
  const cases: [string, Record<string, unknown> | undefined, string[]][] = [
    ["no input", undefined, slugs(rows)],
    ["empty object", {}, slugs(rows)],
    ["slugs", { slugs: ["on-the-shelf", "no-dates"] }, ["on-the-shelf", "no-dates"]],
    [
      "since, at or after, by publishedAt else createdAt",
      { since: "2026-10-13T00:00:00.000Z" },
      ["new-from-admin", "draft-finished-later", "exactly-at-the-cutoff"],
    ],
    [
      "both",
      { slugs: ["on-the-shelf"], since: "2026-10-13T00:00:00.000Z" },
      ["new-from-admin", "draft-finished-later", "on-the-shelf", "exactly-at-the-cutoff"],
    ],
    ["empty slugs", { slugs: [] }, []],
  ];
  for (const [name, input, expected] of cases) {
    it(name, () => {
      expect(slugs(pickListing(rows as never, input as never))).toEqual(expected);
      expect(slugs(prodPick(rows, input))).toEqual(expected);
    });
  }
});
