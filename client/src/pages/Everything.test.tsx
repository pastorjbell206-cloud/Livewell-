/**
 * /explore, "Everything on LiveWell": one section per door in the header's
 * order, every room as a tile, every tool once under Tools, every link a
 * real route, and a find box that narrows the tiles and says so when nothing
 * matches.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fireEvent, screen, within } from "@testing-library/react";

import { offlineFetch, renderWithProviders } from "@/test/harness";
import { DOORS } from "@/lib/siteCatalog";
import { TOOLS } from "@/lib/toolsList";
import { liveSections } from "@/lib/shelf";
import Everything from "./Everything";

const ROOT = path.resolve(__dirname, "../../..");
const APP = fs.readFileSync(path.join(ROOT, "client/src/App.tsx"), "utf8");
const ROUTES = Array.from(APP.matchAll(/<Route\s+path="([^"]+)"/g), (m) => m[1]);
const isRoute = (href: string) => {
  const target = href.split("#")[0].split("?")[0];
  return ROUTES.some((p) => new RegExp("^" + p.replace(/:[A-Za-z0-9_]+/g, "[^/]+") + "/?$").test(target));
};

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

function renderPage() {
  vi.stubGlobal("fetch", offlineFetch());
  return renderWithProviders(<Everything />);
}

describe("/explore", () => {
  it("shows one section per door, in order, each with its rooms as tiles", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Everything on LiveWell");
    const sections = Array.from(document.querySelectorAll("section.ex-door"));
    expect(sections.map((s) => s.id)).toEqual(DOORS.map((d) => d.id));
    for (const door of DOORS) {
      const section = document.getElementById(door.id)!;
      expect(within(section).getByRole("heading", { level: 2 }).textContent).toBe(door.page.name);
      expect(section.querySelector(".lw-frame")).not.toBeNull();
      const rooms = door.id === "essays" ? liveSections().map((s) => s.name) : door.rooms.map((r) => r.name);
      const tiles = Array.from(section.querySelectorAll(".ex-tile__name")).map((n) => n.textContent);
      expect(tiles, door.name).toEqual(rooms);
    }
  });

  it("lists every tool once under Tools (a tool another door lists is under that door)", () => {
    renderPage();
    const tools = document.getElementById("tools")!;
    const hrefs = Array.from(tools.querySelectorAll(".ex-tool")).map((a) => a.getAttribute("href"));
    expect([...hrefs].sort()).toEqual(TOOLS.filter((t) => t.group !== "elsewhere").map((t) => t.href).sort());
  });

  it("links only to real routes", () => {
    renderPage();
    const hrefs = Array.from(document.querySelectorAll("main a[href^='/']")).map((a) => a.getAttribute("href")!);
    expect(hrefs.length).toBeGreaterThan(80);
    expect(hrefs.filter((h) => !isRoute(h))).toEqual([]);
  });

  it("reaches the question pages that no menu linked to before", () => {
    renderPage();
    for (const href of ["/faq/does-god-exist", "/faq/can-science-and-faith-coexist", "/reading-paths/skeptic", "/justice/witnesses", "/nation"]) {
      expect(document.querySelector(`main a[href="${href}"]`), href).not.toBeNull();
    }
  });

  it("narrows the tiles as you type, and says so when nothing matches", () => {
    renderPage();
    const box = screen.getByRole("searchbox", { name: "Find a page or a tool" });
    fireEvent.change(box, { target: { value: "catechism" } });
    expect(screen.getByRole("status").textContent).toMatch(/match/);
    expect(document.querySelector('main a[href="/family/catechism"]')).not.toBeNull();
    expect(document.getElementById("bible")).toBeNull();

    fireEvent.change(box, { target: { value: "zzzqqq" } });
    expect(document.querySelectorAll("section.ex-door").length).toBe(0);
    expect(screen.getByText(/Nothing here matches/)).toBeTruthy();
    expect(screen.getByRole("link", { name: "search every page" }).getAttribute("href")).toBe("/search?q=zzzqqq");

    fireEvent.change(box, { target: { value: "" } });
    expect(document.querySelectorAll("section.ex-door").length).toBe(DOORS.length);
  });

  it("opens with an old /explore?q= link's words already in the box", () => {
    window.history.replaceState({}, "", "/explore?q=prayer");
    renderPage();
    expect((screen.getByRole("searchbox", { name: "Find a page or a tool" }) as HTMLInputElement).value).toBe("prayer");
  });
});

describe("/explore and the case for the faith", () => {
  it("lists the areas the library's own manifest says are live, and no pending one", async () => {
    const index = {
      roomLive: true,
      claims: [],
      answers: {},
      areas: [
        { slug: "text", n: 2, title: "Can we trust the text of the New Testament?", planned: 9, status: "live", live: true, hasPage: true, pieces: [{ slug: "a", question: "A?", status: "live", live: true }] },
        { slug: "jesus", n: 3, title: "Jesus and the resurrection", planned: 10, status: "live", live: true, hasPage: true, pieces: [{ slug: "b", question: "B?", status: "live", live: true }, { slug: "c", question: "C?", status: "pending", live: false }] },
        { slug: "god", n: 1, title: "Does God exist?", planned: 5, status: "pending", live: false, hasPage: true, pieces: [] },
      ],
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) =>
        String(url).includes("/questions/index.json")
          ? new Response(JSON.stringify(index), { status: 200, headers: { "content-type": "application/json" } })
          : new Response("{}", { status: 404 }),
      ),
    );
    renderWithProviders(<Everything />);
    const live = await screen.findByRole("link", { name: "Jesus and the resurrection" }, { timeout: 8000 });
    expect(live.getAttribute("href")).toBe("/questions/jesus");
    const questions = document.querySelector("section#questions")!;
    const hrefs = Array.from(questions.querySelectorAll("a[href^='/questions/']")).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/questions/text", "/questions/jesus", "/questions/claims"]);
  });
});
