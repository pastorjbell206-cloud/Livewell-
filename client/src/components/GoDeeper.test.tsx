/**
 * "Go deeper" on a chapter: it reads the chapter's own piece of the passage
 * index, groups it by kind, shows three of a kind until "See all", and draws
 * nothing at all for a chapter the index has nothing on.
 */
import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";

import GoDeeper from "./GoDeeper";

const PUBLIC = path.resolve(__dirname, "../../public");
const requested: string[] = [];

/** Serves the committed files from disk; anything else is a 404, as on the site. */
const diskFetch = (async (input: RequestInfo | URL) => {
  const url = new URL(String(input instanceof Request ? input.url : input), "http://localhost");
  requested.push(url.pathname);
  const file = path.join(PUBLIC, decodeURIComponent(url.pathname));
  if (file.startsWith(PUBLIC) && fs.existsSync(file) && fs.statSync(file).isFile()) {
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  return new Response("Not found", { status: 404 });
}) as typeof fetch;

beforeEach(() => {
  requested.length = 0;
  vi.stubGlobal("fetch", diskFetch);
});
afterEach(() => vi.unstubAllGlobals());

describe("Go deeper", () => {
  it("lists John 3's pages by kind, from John 3's file alone", async () => {
    render(<GoDeeper slug="john" chapter={3} label="John 3" />);
    expect(await screen.findByRole("heading", { name: "Go deeper" })).toBeTruthy();
    expect(requested.filter((u) => u.startsWith("/index/chapters/"))).toEqual(["/index/chapters/john/3.json"]);
    const doctrine = screen.getByRole("region", { name: "What Christians believe" });
    expect(within(doctrine).getByRole("link", { name: /New Birth/ }).getAttribute("href")).toBe("/study/bible/doctrines/regeneration");
    expect(screen.getByRole("region", { name: "The family catechism" })).toBeTruthy();
    expect(screen.getByRole("region", { name: "Honest Answers" })).toBeTruthy();
  });

  it("shows three of a kind, and the rest on See all", async () => {
    render(<GoDeeper slug="romans" chapter={8} label="Romans 8" />);
    const doctrine = await screen.findByRole("region", { name: "What Christians believe" });
    expect(within(doctrine).getAllByRole("link")).toHaveLength(3);
    const all = within(doctrine).getByRole("button", { name: /See all 14/ });
    expect(all.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(all);
    expect(within(doctrine).getAllByRole("link")).toHaveLength(14);
    expect(within(doctrine).getByRole("button", { name: /Show fewer/ }).getAttribute("aria-expanded")).toBe("true");
  });

  it("draws nothing for a chapter with nothing (Genesis 36), and asks for no file it lacks", async () => {
    const { container } = render(<GoDeeper slug="genesis" chapter={36} label="Genesis 36" />);
    await waitFor(() => expect(container.innerHTML).toBe(""));
    expect(screen.queryByText("Go deeper")).toBeNull();
    expect(requested).not.toContain("/index/chapters/genesis/36.json");
  });

  it("asks for no file for Matthew 8 or 17, which the list leaves out (no 404 in the console)", async () => {
    const list: Record<string, number[]> = JSON.parse(fs.readFileSync(path.join(PUBLIC, "index/chapters.json"), "utf8"));
    for (const n of [8, 17]) {
      expect(list.matthew).not.toContain(n);
      const { container, unmount } = render(<GoDeeper slug="matthew" chapter={n} label={`Matthew ${n}`} />);
      await waitFor(() => expect(container.innerHTML).toBe(""));
      unmount();
    }
    expect(requested.filter((u) => u.startsWith("/index/chapters/matthew/"))).toEqual([]);
  });
});
