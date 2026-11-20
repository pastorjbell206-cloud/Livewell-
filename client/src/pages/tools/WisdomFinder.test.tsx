/**
 * The Wisdom Finder page, on the real finder index: a plain sentence finds its
 * subject, nonsense is told so plainly with Find Help in reach, an area lists
 * its subjects, and the verse of the day is always a whole sentence.
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
    fireEvent.click(pick);
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
