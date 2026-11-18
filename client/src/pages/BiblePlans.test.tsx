/**
 * /study/plans: every reading plan on the site, each card saying how long it
 * is and who it is for and opening the real plan. The plans named here match
 * the files they come from, and the chips narrow the cards.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import BiblePlans, { FAMILY_PLANS, PLANS } from "./BiblePlans";

const ROOT = path.resolve(__dirname, "../../..");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
const APP = fs.readFileSync(path.join(ROOT, "client/src/App.tsx"), "utf8");
const ROUTES = Array.from(APP.matchAll(/<Route\s+path="([^"]+)"/g), (m) => m[1]);

afterEach(() => vi.unstubAllGlobals());

describe("/study/plans", () => {
  it("is a route of its own, in the sitemap and in llms.txt", () => {
    expect(ROUTES).toContain("/study/plans");
    expect(fs.readFileSync(path.join(ROOT, "scripts/generate-sitemap.mjs"), "utf8")).toContain('url: "/study/plans"');
    expect(fs.readFileSync(path.join(ROOT, "client/public/llms.txt"), "utf8")).toContain("https://www.livewellbyjamesbell.co/study/plans");
  });

  it("names every plan the site has, as its own files name them", () => {
    const family: { id: string; title: string; audience: string; days: unknown[] }[] = json("client/public/family-reading-plans.json");
    expect(FAMILY_PLANS.map((p) => [p.id, p.title, p.days, p.audience])).toEqual(family.map((p) => [p.id, p.title, p.days.length, p.audience]));
    const printed: { plans: { id: string; title: string; days: number }[] } = json("client/src/data/bible-reading-plans.json");
    for (const p of printed.plans) expect(PLANS.find((x) => x.id === p.id)).toMatchObject({ title: p.title, days: p.days, kind: "print" });
    expect(PLANS.find((x) => x.id === "whole-story-2027")).toMatchObject({ days: 365, href: "/study/bible/guides/whole-story-2027" });
    for (const p of PLANS) {
      if (p.kind === "print") expect(p.href).toMatch(/^\/downloads\/reading-plans\/[a-z0-9-]+-letter\.pdf$/);
      else expect(ROUTES, p.href).toContain(p.href);
    }
  });

  it("shows each plan's length and who it is for, and the chips narrow them", () => {
    vi.stubGlobal("fetch", offlineFetch());
    renderWithProviders(<BiblePlans />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Bible reading plans");
    expect(document.querySelectorAll(".bp-card")).toHaveLength(PLANS.length);
    expect(screen.getAllByText("365 days").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("link", { name: /Open the plan: The Bible in a year, 2027/ }).getAttribute("href")).toBe("/study/bible/guides/whole-story-2027");

    fireEvent.click(screen.getByRole("button", { name: "With my family" }));
    expect(document.querySelectorAll(".bp-card")).toHaveLength(FAMILY_PLANS.length);
    fireEvent.click(screen.getByRole("button", { name: "A year" }));
    expect(document.querySelectorAll(".bp-card")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Show every plan" }));
    expect(document.querySelectorAll(".bp-card")).toHaveLength(PLANS.length);
    fireEvent.click(screen.getByRole("button", { name: "A month or less" }));
    for (const c of Array.from(document.querySelectorAll(".bp-len"))) expect(Number(c.textContent!.match(/\d+/)![0])).toBeLessThanOrEqual(31);
  });
});
