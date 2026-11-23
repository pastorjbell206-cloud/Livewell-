/**
 * A care page shows one heading from first paint to loaded page (the walk's
 * polish, 2026-11-23; finding 13). The prerendered page headed its text with
 * the page's search title ("Doubting Your Faith: Help When You're Not Sure"),
 * the app's loading state then said "Loading…", and the loaded page said "I'm
 * not sure I believe anymore". Now the prerendered text is headed with the
 * page's own title, and the page marks itself loading until its data comes,
 * so the held text (lib/prerender-hold) stays until the same heading replaces it.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import fs from "node:fs";
import path from "node:path";

import { TestProviders } from "@/test/harness";
import { pageIsReady } from "@/lib/prerender-hold";
import CarePage from "./CarePage";

const ROOT = path.resolve(__dirname, "../../../..");
const DIR = path.join(ROOT, "client/public/needs");
const INDEX: { slug: string; title: string; page: boolean }[] = JSON.parse(fs.readFileSync(path.join(DIR, "index.json"), "utf8")).needs;

afterEach(() => vi.unstubAllGlobals());

describe("a care page's heading", () => {
  it("is the same words in the prerendered page and the loaded one", () => {
    // The prerender heads a care page's text with the index's title; the page shows its file's title.
    for (const n of INDEX.filter((x) => x.page)) {
      const page = JSON.parse(fs.readFileSync(path.join(DIR, `${n.slug}.json`), "utf8"));
      expect(page.title, n.slug).toBe(n.title);
    }
    const prerender = fs.readFileSync(path.join(ROOT, "scripts/prerender-heads.mjs"), "utf8");
    const needs = prerender.slice(prerender.indexOf('file: "client/public/needs/index.json"'), prerender.indexOf("filter: (e) => e.page === true"));
    expect(needs).toContain("heading: (e) => e.title");
    expect(prerender).toContain("bodyFromContent({ title: (src.heading && src.heading(e)) || title,");
  });

  it("holds the prerendered page until the loaded heading is there, with no 'Loading…' between", async () => {
    let answer: (r: Response) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url === "/needs/doubt.json") return new Promise<Response>((resolve) => (answer = resolve));
        if (url === "/needs/index.json") return Promise.resolve(new Response(fs.readFileSync(path.join(DIR, "index.json"), "utf8"), { status: 200 }));
        return Promise.resolve(new Response("{}", { status: 404 }));
      }),
    );
    const { hook } = memoryLocation({ path: "/help/doubt" });
    const { container } = render(
      <TestProviders>
        <Router hook={hook}>
          <CarePage />
        </Router>
      </TestProviders>,
    );
    // Still on its way: not ready, so the held page (headed "I'm not sure I believe anymore") stays.
    expect(pageIsReady(container)).toBe(false);
    answer(new Response(fs.readFileSync(path.join(DIR, "doubt.json"), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } }));
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("I'm not sure I believe anymore"));
    expect(pageIsReady(container)).toBe(true);
  });

  it("lets a page that failed or is missing show what it has to say at once", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 404 })));
    const { hook } = memoryLocation({ path: "/help/no-such-page" });
    const { container } = render(
      <TestProviders>
        <Router hook={hook}>
          <CarePage />
        </Router>
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("That page is not here yet."));
    expect(pageIsReady(container)).toBe(true);
  });
});
