/**
 * One list, one name (TOOLS-PLAN unit 6). Every tool and self-check has one
 * entry in lib/toolsList.ts, and wherever the site lists a tool it shows the
 * tool's address under that one name. A folded tool is listed nowhere, and
 * the tool that replaced it is a listed tool. The tools page's groups can be
 * reached from outside by their address (/tools#check-yourself), and its find
 * box narrows the tiles and says so when nothing matches.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { TestProviders, offlineFetch, renderWithProviders } from "@/test/harness";
import { FAMILY_TOOLS, TOOL_GROUPS, TOOL_LIST, TOOLS, toolByHref, type Tool } from "./toolsList";
import { allEntries, nameForHref } from "./siteCatalog";
import ToolsHub from "@/pages/ToolsHub";
import ToolsBody from "@/pages/ToolsBody";
import Assessments from "@/pages/Assessments";
import Everything from "@/pages/Everything";
import MyLibrary from "@/pages/MyLibrary";
import Resources from "@/pages/Resources";
import Start from "@/pages/Start";
import Family from "@/pages/Family";
import StartHereQuiz from "@/pages/StartHereQuiz";

const ROOT = path.resolve(__dirname, "../../..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const FORBIDDEN = /\b(delve|leverage|unlock|transformative|navigate|tapestry|foster|unpack|landscape|nuanced|multifaceted|authentic|journey|holistic)\b/i;

/** Every link on the page that opens a tool, with the tool it opens and the words it shows. */
function toolLinks(): { tool: Tool; href: string; text: string }[] {
  return Array.from(document.querySelectorAll("a[href^='/']")).flatMap((a) => {
    const href = a.getAttribute("href")!;
    const tool = toolByHref(href);
    return tool ? [{ tool, href, text: (a.textContent ?? "").replace(/\s+/g, " ").trim() }] : [];
  });
}

/** Each tool link shows the tool's one name, and no folded tool is linked. */
function expectOneName(page: string) {
  const links = toolLinks();
  expect(links.length, page).toBeGreaterThan(0);
  const wrong = links.filter((l) => !l.text.includes(l.tool.name)).map((l) => `${page}: ${l.href} shown as "${l.text}" (its name is "${l.tool.name}")`);
  expect(wrong).toEqual([]);
  const folded = links.filter((l) => l.tool.replacedBy).map((l) => `${page}: ${l.href} is folded`);
  expect(folded).toEqual([]);
}

beforeEach(() => {
  vi.stubGlobal("fetch", offlineFetch());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  localStorage.clear();
  window.history.replaceState({}, "", "/");
});

describe("the tools list", () => {
  it("gives every tool one id, one name and one address", () => {
    const unique = (xs: string[]) => xs.length === new Set(xs).size;
    expect(unique(TOOL_LIST.map((t) => t.id))).toBe(true);
    expect(unique(TOOL_LIST.map((t) => t.name.toLowerCase()))).toBe(true);
    expect(unique(TOOL_LIST.map((t) => t.href))).toBe(true);
  });

  it("says each job in one plain sentence, with a time and what it keeps", () => {
    for (const t of TOOL_LIST) {
      expect(t.job, t.id).toMatch(/^[A-Z].*[.?]$/);
      expect(`${t.name} ${t.job} ${t.time} ${t.keeps}`, t.id).not.toMatch(/[—!]/);
      expect(`${t.name} ${t.job}`, t.id).not.toMatch(FORBIDDEN);
      expect(t.time.length, t.id).toBeGreaterThan(0);
      expect(t.keeps.length, t.id).toBeGreaterThan(0);
      expect(t.icon, t.id).toBeTruthy();
    }
  });

  it("folds a tool only into a tool that is listed", () => {
    for (const t of TOOL_LIST.filter((x) => x.replacedBy)) {
      const survivor = TOOL_LIST.find((x) => x.id === t.replacedBy);
      expect(survivor, t.id).toBeTruthy();
      expect(survivor!.replacedBy, t.id).toBeUndefined();
      expect(survivor!.group, t.id).not.toBe("elsewhere");
    }
  });

  it("puts every listed tool in one place: a /tools group, the family page, or another door", () => {
    const grouped = [...TOOL_GROUPS.flatMap((g) => g.tools), ...FAMILY_TOOLS, ...TOOLS.filter((t) => t.group === "elsewhere")];
    expect(grouped.map((t) => t.id).sort()).toEqual(TOOLS.map((t) => t.id).sort());
    for (const g of TOOL_GROUPS) expect(g.tools.length, g.id).toBeGreaterThan(0);
    // A tool another door lists is listed there, under the same name.
    for (const t of TOOLS.filter((x) => x.group === "elsewhere")) expect(nameForHref(t.href), t.id).toBe(t.name);
  });

  it("uses the catalogue's name wherever the catalogue lists a tool, and the catalogue lists no folded tool", () => {
    for (const t of TOOL_LIST) {
      const name = nameForHref(t.href);
      if (name) expect(name, t.href).toBe(t.name);
    }
    const folded = new Set(TOOL_LIST.filter((t) => t.replacedBy).map((t) => t.href));
    expect(allEntries().filter((e) => folded.has(e.href)).map((e) => e.href)).toEqual([]);
  });

  it("names each tool in the search index by its one name", () => {
    const index = JSON.parse(read("client/public/search-index.json")) as { sources: { entries: { title: string; href: string }[] }[] };
    const wrong = index.sources
      .flatMap((s) => s.entries)
      .flatMap((e) => {
        const t = toolByHref(e.href);
        return t && e.href === t.href && e.title !== t.name ? [`${e.href}: "${e.title}" (its name is "${t.name}")`] : [];
      });
    expect(wrong).toEqual([]);
  });
});

describe("every page that lists tools shows each under its one name", () => {
  it("the tools page", () => {
    renderWithProviders(<ToolsBody />);
    expectOneName("/tools");
  });

  it("the self-checks page", () => {
    renderWithProviders(<Assessments />);
    expectOneName("/assessments");
  });

  it("the Everything page", () => {
    renderWithProviders(<Everything />);
    expectOneName("/explore");
  });

  it("the all-resources page", () => {
    renderWithProviders(<Resources />);
    expectOneName("/resources");
  });

  it("the family page", () => {
    renderWithProviders(<Family />);
    expectOneName("/family");
  });

  it("the start quiz", () => {
    renderWithProviders(<StartHereQuiz />);
    // Its tool links appear with its results; the questions alone show none, so only check what is shown.
    const wrong = toolLinks().filter((l) => !l.text.includes(l.tool.name));
    expect(wrong).toEqual([]);
  });

  it("the start page", () => {
    renderWithProviders(<Start />);
    expectOneName("/start");
  });

  it("My Library, including the four tools it could not see before", async () => {
    localStorage.setItem("livewell-progress-whole-life", JSON.stringify({ answers: { in1: 3, in2: 4 }, screen: 1, savedAt: "2026-11-01T12:00:00.000Z" }));
    localStorage.setItem("lw-deep-bible", JSON.stringify({ v: 1, notes: { John: { "John 1:1::matters": { text: "In the beginning", updated: "2026-11-02T12:00:00.000Z" } } }, marks: {}, touched: { John: "2026-11-02T12:00:00.000Z" } }));
    localStorage.setItem("lw-family-devotions", JSON.stringify({ v: 1, series: { created: "2026-11-03T12:00:00.000Z", ageBand: "young", weeks: [{ theme: "a", done: true }, { theme: "b", done: false }] } }));
    localStorage.setItem("lw-test-the-case", JSON.stringify({ "resurrection:s1": true, "resurrection:s2": true }));
    localStorage.setItem("livewell-worry-journal", JSON.stringify([{ id: 1 }]));
    render(
      <TestProviders>
        <MyLibrary />
      </TestProviders>,
    );
    for (const id of ["whole-life", "deep-bible", "family-devotions", "test-the-case", "worry-journal"]) {
      const t = TOOL_LIST.find((x) => x.id === id)!;
      expect(await screen.findByText(t.name), id).toBeInTheDocument();
    }
    expect(screen.getByText("2 statements answered so far")).toBeInTheDocument();
    expect(screen.getByText("1 note")).toBeInTheDocument();
    expect(screen.getByText("1 of 2 weeks done")).toBeInTheDocument();
    expect(screen.getByText("2 steps passed")).toBeInTheDocument();
    // My Library may name a folded tool the reader started; every other tool link carries its one name.
    const wrong = toolLinks().filter((l) => !l.text.includes(l.tool.name));
    expect(wrong).toEqual([]);
  });
});

describe("the tools page", () => {
  it("draws its page top at once, then the list below it", async () => {
    renderWithProviders(<ToolsHub />);
    expect(screen.getByRole("heading", { level: 1, name: "Tools and resources" })).toBeInTheDocument();
    expect(await screen.findByRole("searchbox", { name: "Find a tool" })).toBeInTheDocument();
    expectOneName("/tools");
  });

  it("shows the four groups, each tool once, and leads on to plans, group studies and downloads", () => {
    renderWithProviders(<ToolsBody />);
    for (const g of TOOL_GROUPS) {
      const section = document.getElementById(g.id)!;
      expect(section, g.id).not.toBeNull();
      expect(Array.from(section.querySelectorAll(".lw-tool")).map((a) => a.getAttribute("href"))).toEqual(g.tools.map((t) => t.href));
    }
    for (const href of ["/plans", "/studyguides", "/downloads", "/family"]) expect(document.querySelector(`main a[href="${href}"], a[href="${href}"]`), href).not.toBeNull();
  });

  it("scrolls to a group named in the address, old names included", async () => {
    const scrolled = vi.fn();
    Element.prototype.scrollIntoView = function (this: Element) {
      scrolled(this.id);
    } as typeof Element.prototype.scrollIntoView;
    window.history.replaceState({}, "", "/tools#check-yourself");
    renderWithProviders(<ToolsBody />);
    await waitFor(() => expect(scrolled).toHaveBeenCalledWith("check-yourself"));
    window.history.replaceState({}, "", "/tools#self-checks");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    await waitFor(() => expect(scrolled).toHaveBeenLastCalledWith("check-yourself"));
  });

  it("narrows the tiles as you type, by the job, and says so when nothing matches", () => {
    renderWithProviders(<ToolsBody />);
    const box = screen.getByRole("searchbox", { name: "Find a tool" });
    fireEvent.change(box, { target: { value: "worries" } });
    expect(screen.getByRole("status").textContent).toMatch(/match/);
    expect(Array.from(document.querySelectorAll(".lw-tool")).map((a) => a.getAttribute("href"))).toContain("/tools/worry-journal");
    // A folded tool's old name finds the tool that took it in.
    fireEvent.change(box, { target: { value: "verse finder" } });
    expect(Array.from(document.querySelectorAll(".lw-tool")).map((a) => a.getAttribute("href"))).toContain("/tools/wisdom-finder");
    // The family tools are found too.
    fireEvent.change(box, { target: { value: "teenager" } });
    expect(Array.from(document.querySelectorAll(".lw-tool")).map((a) => a.getAttribute("href"))).toContain("/tools/parent-teen-conversation");
    fireEvent.change(box, { target: { value: "zzzqqq" } });
    expect(screen.getByRole("status").textContent).toBe('No tool matches "zzzqqq".');
    expect(document.querySelectorAll(".lw-tool").length).toBe(0);
    expect(screen.getByRole("link", { name: "search the whole site" }).getAttribute("href")).toBe("/search?q=zzzqqq");
  });
});
