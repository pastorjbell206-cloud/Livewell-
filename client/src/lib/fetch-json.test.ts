import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchJson } from "./fetch-json";

function jsonResponse(status: number, body: string) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchJson", () => {
  it("returns parsed data on 200", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, '{"ok":true}')));
    await expect(fetchJson("/x.json")).resolves.toEqual({ ok: true });
  });

  it("throws on a non-ok status — no more silently-empty loaders", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(404, "{}")));
    await expect(fetchJson("/missing.json")).rejects.toThrow("404");
  });

  it("throws on unparseable JSON", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, "<html>")));
    await expect(fetchJson("/broken.json")).rejects.toThrow();
  });

  it("throws when the shape guard rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, '{"items":{}}')));
    const isItems = (x: unknown): x is { items: unknown[] } =>
      typeof x === "object" && x !== null && Array.isArray((x as { items?: unknown }).items);
    await expect(fetchJson("/shape.json", isItems)).rejects.toThrow("unexpected shape");
  });

  it("passes the shape guard through on valid data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, '{"items":[1]}')));
    const isItems = (x: unknown): x is { items: number[] } =>
      typeof x === "object" && x !== null && Array.isArray((x as { items?: unknown }).items);
    await expect(fetchJson("/shape.json", isItems)).resolves.toEqual({ items: [1] });
  });
});
