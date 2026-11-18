/**
 * The world portrait page renders its file: the title, a contents entry and a
 * section for every part, each passage linked to its chapter, the guides of
 * its group, and the sources. The data's own shape is gated by
 * scripts/validate-worlds.mjs; this holds the page to the data.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import ContextWorld, { isWorld, worldWords, type World } from "./ContextWorld";

const PUB = resolve(__dirname, "../../../public");
const world: World = JSON.parse(readFileSync(resolve(PUB, "context/worlds/jewish-life-in-jesus-day.json"), "utf8"));
const guides = JSON.parse(readFileSync(resolve(PUB, "context/guides-index.json"), "utf8"));

vi.mock("@/components/Layout", () => ({ default: ({ children }: { children: React.ReactNode }) => <main>{children}</main> }));

afterEach(() => vi.unstubAllGlobals());

describe("world portrait", () => {
  it("is a world of portrait length", () => {
    expect(isWorld(world)).toBe(true);
    const words = worldWords(world);
    expect(words).toBeGreaterThan(5000);
    expect(words).toBeLessThan(8000);
  });

  it("renders every part, its passages, the guides and the sources", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      const body = url.includes("/context/worlds/") ? world : url.includes("guides-index") ? guides : null;
      return { ok: body !== null, json: async () => body } as Response;
    }));
    const { hook } = memoryLocation({ path: `/resources/context/world/${world.id}` });
    render(<Router hook={hook}><ContextWorld /></Router>);
    await waitFor(() => expect(screen.getByRole("heading", { level: 1, name: world.title })).toBeTruthy());
    for (const p of world.parts) {
      expect(screen.getByRole("heading", { level: 2, name: p.title })).toBeTruthy();
      for (const r of p.read) {
        const link = screen.getAllByRole("link", { name: new RegExp(r.ref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })[0];
        expect(link.getAttribute("href")).toBe(r.href);
      }
    }
    const inGroup = guides.guides.filter((g: { group: string }) => g.group === world.group);
    await waitFor(() => {
      const guideList = document.querySelector(".wd-guides") as HTMLElement | null;
      expect(guideList).not.toBeNull();
      expect(within(guideList as HTMLElement).getAllByRole("link")).toHaveLength(inGroup.length);
    });
    expect(screen.getByRole("heading", { level: 2, name: "Sources and further reading" })).toBeTruthy();
  });
});
