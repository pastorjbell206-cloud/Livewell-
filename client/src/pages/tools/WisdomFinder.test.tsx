/**
 * The Wisdom Finder page, on the real finder index: a plain sentence finds its
 * subject, nonsense is told so plainly with Find Help in reach, an area lists
 * its subjects, and the verse of the day is always a whole sentence. The word
 * vectors are not served here (words alone), except in "the word vectors",
 * which serves the real file.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { TestProviders } from "@/test/harness";
import { verseForToday, type FinderFile } from "@/lib/wisdom";
import WisdomFinder from "./WisdomFinder";

const PUBLIC = path.resolve(__dirname, "../../../public");
const finder: FinderFile = JSON.parse(fs.readFileSync(path.join(PUBLIC, "wisdom/finder.json"), "utf8"));

describe("WisdomFinder", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).endsWith("/wisdom/finder.json") ? new Response(JSON.stringify(finder), { status: 200 }) : new Response("{}", { status: 404 }),
      ),
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it("finds the subject for a plain sentence", async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByText("Browse by area of life")).toBeInTheDocument());
    fireEvent.change(screen.getByRole("searchbox", { name: "What are you facing?" }), { target: { value: "my son walked away from the faith" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    expect(await screen.findByText(/subjects? fits? what you wrote/)).toBeInTheDocument();
    const best = document.querySelector(".wf-best");
    expect(best?.getAttribute("href")).toBe("/wisdom/wayward-child");
    expect(screen.getByText(/subjects? fits? what you wrote/)).toBeInTheDocument();
    // What was typed is kept for this tab only.
    expect(sessionStorage.getItem("livewell-progress-wisdom-finder")).toContain("my son walked away");
    expect(localStorage.getItem("livewell-progress-wisdom-finder")).toBeNull();
  });

  it("says plainly when nothing fits, and keeps Find Help in reach", async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByText("Browse by area of life")).toBeInTheDocument());
    fireEvent.change(screen.getByRole("searchbox", { name: "What are you facing?" }), { target: { value: "asdf qwerty" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    expect(await screen.findByText("Nothing fits that well")).toBeInTheDocument();
    expect(document.querySelector(".wf-best")).toBeNull();
    expect(document.querySelector('.wf-none a[href="/help"]')).not.toBeNull();
  });

  it("sets a nearly-as-close subject beside the first, not under it", async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByText("Browse by area of life")).toBeInTheDocument());
    fireEvent.change(screen.getByRole("searchbox", { name: "What are you facing?" }), {
      target: { value: "the doctor said moms cancer is back and theres nothing more they can do" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    expect(await screen.findByText("Just as close")).toBeInTheDocument();
    const cards = Array.from(document.querySelectorAll(".wf-best")).map((a) => a.getAttribute("href"));
    // Either may lead (each is a right answer); the other is set beside it.
    expect(cards).toContain("/wisdom/serious-illness");
    expect(cards).toContain("/wisdom/terminal-diagnosis");
  });

  it("puts the help topic first for self-harm, with Find Help under it", async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByText("Browse by area of life")).toBeInTheDocument());
    fireEvent.change(screen.getByRole("searchbox", { name: "What are you facing?" }), { target: { value: "i have been cutting myself again" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    expect(await screen.findByText(/subjects? fits? what you wrote/)).toBeInTheDocument();
    expect(document.querySelector(".wf-best")?.getAttribute("href")).toBe("/wisdom/suicidal-thoughts");
    expect(document.querySelector('.wf-safety a[href="/help"]')).not.toBeNull();
    expect(screen.queryByText("Just as close")).toBeNull();
  });

  it("shows the Find Help line under a first result whose own page opens with the path to help", async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByText("Browse by area of life")).toBeInTheDocument());
    const box = screen.getByRole("searchbox", { name: "What are you facing?" });
    fireEvent.change(box, { target: { value: "im completely burned out at work" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    await waitFor(() => expect(document.querySelector(".wf-best")?.getAttribute("href")).toBe("/wisdom/work-and-burnout"));
    expect(document.querySelector('.wf-safety a[href="/help"]')).not.toBeNull();
    // A topic whose page does not open with the path to help gets no such line.
    fireEvent.change(box, { target: { value: "i cant say no to anyone" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    await waitFor(() => expect(document.querySelector(".wf-best")?.getAttribute("href")).toBe("/wisdom/saying-no"));
    expect(document.querySelector(".wf-safety")).toBeNull();
  });

  it("marks for the help line every heavy subject and every page that opens with Find Help, from the data", () => {
    const sensitive = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../data/sensitive-pages.json"), "utf8")).wisdom;
    const heavyIds = [...Object.keys(sensitive.lead), ...Object.keys(sensitive.end)];
    const heavy = new Set(heavyIds);
    const helpIds = finder.topics.filter((t) => t.help).map((t) => t.id);
    const help = new Set(helpIds);
    for (const id of heavyIds) expect(help.has(id), id).toBe(true);
    for (const id of ["numbness", "mental-exhaustion", "work-and-burnout", "purpose-and-meaning"]) expect(help.has(id), id).toBe(true);
    for (const id of helpIds) {
      if (heavy.has(id)) continue;
      const deep = JSON.parse(fs.readFileSync(path.join(PUBLIC, "wisdom/deep", `${id}.json`), "utf8")) as { whole: string[] };
      expect(deep.whole[0].split(/(?<=[.?])\s+/).slice(0, 3).join(" "), id).toContain("Find Help");
    }
    expect(help.has("saying-no")).toBe(false);
    expect(help.has("kindness")).toBe(false);
  });

  it("offers \"Or look by subject\" beside the search, collapsed, each area opening its subjects written in full", async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByText("Browse by area of life")).toBeInTheDocument());
    const details = document.querySelector("details.wf-browse") as HTMLDetailsElement;
    expect(details).not.toBeNull();
    // Collapsed by default, inside the search band.
    expect(details.open).toBe(false);
    expect(details.closest(".wf-ask")).not.toBeNull();
    expect(details.querySelector("summary")?.textContent).toBe("Or look by subject");
    details.open = true;
    const byId = new Map(finder.topics.map((t) => [t.id, t]));
    // The areas arrive with the finder data, a moment after the page's own text.
    await waitFor(() => expect(details.querySelectorAll("button.wf-browse__area").length).toBeGreaterThan(0));
    const buttons = Array.from(details.querySelectorAll<HTMLButtonElement>("button.wf-browse__area"));
    // One button per area, the same areas the chips use, counted from the data.
    expect(buttons.length).toBe(finder.areas.length);
    const area = finder.areas.find((a) => a.id === "mind")!;
    const deep = area.topics.filter((id) => byId.get(id)?.deep);
    const btn = screen.getByRole("button", { name: new RegExp(`^${area.name}`) });
    expect(btn.textContent).toContain(`${deep.length} written in full of ${area.topics.length}`);
    // Name and count are read as two phrases, not run together.
    expect(btn.textContent).toContain(`${area.name}, ${deep.length}`);
    expect(btn.getAttribute("aria-expanded")).toBe("false");
    const panel = document.getElementById(btn.getAttribute("aria-controls") ?? "")!;
    expect(panel.hidden).toBe(true);
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-expanded")).toBe("true");
    expect(panel.hidden).toBe(false);
    const links = Array.from(panel.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(links.length).toBe(deep.length);
    for (const id of deep) expect(links).toContain(`/wisdom/${id}`);
    // Every subject in the area is one press away, in the area list below.
    fireEvent.click(screen.getByRole("button", { name: `All ${area.topics.length} subjects in this area` }));
    expect(await screen.findByText(new RegExp(`${area.topics.length} subjects in ${area.name}`))).toBeInTheDocument();
    fireEvent.click(btn);
    expect(panel.hidden).toBe(true);
  });

  it("lists an area's subjects when an area is chosen", async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByRole("group", { name: "Which part of life is this about?" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("radio", { name: /Grief, illness and death/ }));
    expect(await screen.findByText(/subjects in Grief, illness and death/)).toBeInTheDocument();
    expect(document.querySelector('a[href="/wisdom/grief"]')).not.toBeNull();
  });

  it("draws the verse of the day only from whole sentences (Psalm 92:14 runs into verse 15)", () => {
    expect(finder.daily.length).toBeGreaterThan(150);
    for (const d of finder.daily) expect(d.text.trim(), d.ref).toMatch(/[.?!][”’"')]*$/);
    for (const d of finder.daily) expect(d.text, d.ref).toMatch(/^[“‘"']?[A-Z]/);
    expect(finder.daily.some((d) => d.ref === "Psalm 92:14")).toBe(false);
    for (let i = 0; i < 40; i++) expect(verseForToday(finder.daily, new Date(2027, 0, 1 + i))).not.toBeNull();
  });

  it("asks \"Is it one of these?\" when the fit is weak, and narrows to the area picked", async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByText("Browse by area of life")).toBeInTheDocument());
    fireEvent.change(screen.getByRole("searchbox", { name: "What are you facing?" }), { target: { value: "i feel off lately" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    const group = await screen.findByRole("group", { name: "Is it one of these?" });
    const chips = Array.from(group.querySelectorAll("button"));
    expect(chips.length).toBeGreaterThanOrEqual(2);
    expect(chips.length).toBeLessThanOrEqual(6);
    for (const c of chips) expect(c.getAttribute("aria-pressed")).toBe("false");
    const pick = chips[1];
    const name = pick.textContent ?? "";
    const area = finder.areas.find((a) => a.name === name)!;
    const countBefore = document.querySelector(".wf-results__count")?.textContent;
    fireEvent.click(pick);
    // The visible line above the chips keeps its words, so the chips do not move; the narrowing is announced in a status that takes no room.
    expect(document.querySelector(".wf-results__count")?.textContent).toBe(countBefore);
    expect(group.querySelector('.sr-only[role="status"]')?.textContent).toMatch(new RegExp(`in ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
    expect(pick.getAttribute("aria-pressed")).toBe("true");
    expect(await screen.findByText(new RegExp(`subjects? in ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`))).toBeInTheDocument();
    const href = document.querySelector(".wf-best")?.getAttribute("href") ?? "";
    expect(area.topics).toContain(href.replace("/wisdom/", ""));
    // Choosing it again shows every subject again.
    fireEvent.click(pick);
    expect(pick.getAttribute("aria-pressed")).toBe("false");
  });

  it("skips the step for a sentence that needs help first, and for a clear one", async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByText("Browse by area of life")).toBeInTheDocument());
    const box = screen.getByRole("searchbox", { name: "What are you facing?" });
    fireEvent.change(box, { target: { value: "sometimes i wish i could just disappear" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    expect(await screen.findByText(/subjects? fits? what you wrote/)).toBeInTheDocument();
    expect(document.querySelector(".wf-best")?.getAttribute("href")).toBe("/wisdom/suicidal-thoughts");
    expect(document.querySelector('.wf-safety a[href="/help"]')).not.toBeNull();
    expect(screen.queryByText("Is it one of these?")).toBeNull();
    fireEvent.change(box, { target: { value: "my son walked away from the faith" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    await waitFor(() => expect(document.querySelector(".wf-best")?.getAttribute("href")).toBe("/wisdom/wayward-child"));
    expect(screen.queryByText("Is it one of these?")).toBeNull();
  });
});

describe("WisdomFinder, the word vectors", () => {
  const VECTORS = fs.readFileSync(path.join(PUBLIC, "wisdom/vectors.bin"));
  let asked: string[] = [];
  beforeEach(() => {
    sessionStorage.clear();
    asked = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        asked.push(url);
        if (url.endsWith("/wisdom/finder.json")) return new Response(JSON.stringify(finder), { status: 200 });
        if (url.endsWith("/wisdom/vectors.bin")) return new Response(new Uint8Array(VECTORS), { status: 200 });
        return new Response("{}", { status: 404 });
      }),
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  const open = async () => {
    render(
      <TestProviders>
        <WisdomFinder />
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByText("Browse by area of life")).toBeInTheDocument());
  };

  it("fetches them only once the reader starts to use the finder, not on arrival", async () => {
    await open();
    expect(asked.some((u) => u.endsWith("/wisdom/vectors.bin"))).toBe(false);
    fireEvent.focus(screen.getByRole("searchbox", { name: "What are you facing?" }));
    await waitFor(() => expect(asked.filter((u) => u.endsWith("/wisdom/vectors.bin"))).toHaveLength(1));
  });

  it("finds the subject with them, and keeps the help topic first for self-harm, Find Help under it", async () => {
    await open();
    const box = screen.getByRole("searchbox", { name: "What are you facing?" });
    fireEvent.change(box, { target: { value: "my son walked away from the faith" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    await waitFor(() => expect(document.querySelector(".wf-best")?.getAttribute("href")).toBe("/wisdom/wayward-child"));
    fireEvent.change(box, { target: { value: "i have been cutting myself again" } });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));
    await waitFor(() => expect(document.querySelector(".wf-best")?.getAttribute("href")).toBe("/wisdom/suicidal-thoughts"));
    expect(document.querySelector('.wf-safety a[href="/help"]')).not.toBeNull();
    expect(screen.queryByText("Just as close")).toBeNull();
  });
});
