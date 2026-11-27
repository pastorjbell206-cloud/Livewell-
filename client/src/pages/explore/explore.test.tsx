/**
 * /explore/<discipline>: the eight discipline pages, live (James,
 * 2026-11-27). Each is indexed under its own title, links its neighbours at
 * their live addresses, carries no preview bar, and is a route in App.tsx.
 */
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { DISCIPLINES } from "../preview/disciplines";
import ExploreBible from "./ExploreBible";
import ExploreTheology from "./ExploreTheology";
import ExploreHistory from "./ExploreHistory";
import ExploreApologetics from "./ExploreApologetics";
import ExploreCulture from "./ExploreCulture";
import ExploreQuestions from "./ExploreQuestions";
import ExploreLiving from "./ExploreLiving";
import ExploreChurch from "./ExploreChurch";

const PAGES = { bible: ExploreBible, theology: ExploreTheology, history: ExploreHistory, apologetics: ExploreApologetics, culture: ExploreCulture, questions: ExploreQuestions, living: ExploreLiving, church: ExploreChurch };
const APP = fs.readFileSync(path.resolve(__dirname, "../../App.tsx"), "utf8");

describe("/explore/<discipline>", () => {
  it("has a live page for every discipline", () => {
    expect(Object.keys(PAGES).sort()).toEqual(DISCIPLINES.map((d) => d.id).sort());
    for (const d of DISCIPLINES) expect(APP, d.id).toContain(`<Route path="/explore/${d.id}"`);
  });

  it.each(DISCIPLINES.map((d) => [d.id, d] as const))("%s is indexed, has no preview bar, and links the live pages", (id, d) => {
    const Page = PAGES[id as keyof typeof PAGES];
    const { unmount } = renderWithProviders(<Page />);
    expect(screen.getByRole("heading", { level: 1, name: d.name })).toBeTruthy();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "").not.toMatch(/noindex/);
    expect(screen.queryByRole("note")).toBeNull();
    const nav = screen.getByRole("navigation", { name: "The eight disciplines" });
    for (const a of Array.from(nav.querySelectorAll("a"))) expect(a.getAttribute("href")).toMatch(/^\/explore\/[a-z]+$/);
    expect(document.querySelectorAll('main a[href^="/preview"]')).toHaveLength(0);
    unmount();
  });
});
