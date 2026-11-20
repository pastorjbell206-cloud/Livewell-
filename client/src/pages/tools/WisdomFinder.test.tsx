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
    expect(finder.daily.some((d) => d.ref === "Psalm 92:14")).toBe(false);
    for (let i = 0; i < 40; i++) expect(verseForToday(finder.daily, new Date(2027, 0, 1 + i))).not.toBeNull();
  });
});
