/**
 * Every written care page renders from its real content file: the title in
 * the reader's words, the help block first on a sensitive subject, each
 * Scripture passage with its reference, each step, and each question. This is
 * the contract between client/public/needs/<slug>.json and CarePage, checked
 * against the content itself rather than a fixture.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import fs from "node:fs";
import path from "node:path";
import { TestProviders } from "@/test/harness";
import CarePage from "./CarePage";

const DIR = path.resolve(__dirname, "../../../public/needs");
const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "index.json") : [];
const pages = files
  .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
  .filter((n) => n.page === true);

function serve(url: string): Response {
  const m = url.match(/\/needs\/([a-z0-9-]+)\.json$/);
  const file = m && path.join(DIR, `${m[1]}.json`);
  if (file && fs.existsSync(file)) return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
  return new Response("{}", { status: 404 });
}

describe("CarePage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) => serve(String(input))));
  });
  afterEach(() => vi.unstubAllGlobals());

  it.skipIf(pages.length > 0)("has no written pages yet", () => {
    expect(pages.length).toBe(0);
  });

  for (const need of pages) {
    it(`renders /help/${need.slug} from its content`, async () => {
      const { hook } = memoryLocation({ path: `/help/${need.slug}` });
      const { container } = render(
        <TestProviders>
          <Router hook={hook}>
            <CarePage />
          </Router>
        </TestProviders>,
      );
      await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(need.title));
      if (need.sensitivity !== "ordinary") {
        expect(container.querySelector("#help-now")).not.toBeNull();
        expect(container.querySelector('a[href="tel:988"]')).not.toBeNull();
      }
      for (const p of need.scripture.passages) expect(screen.getByText(`${p.ref} (BSB).`, { exact: false })).toBeInTheDocument();
      for (const s of need.thisWeek.steps) expect(screen.getByRole("heading", { name: s.title })).toBeInTheDocument();
      for (const f of need.faq) expect(screen.getByRole("heading", { name: f.q })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "If you're helping someone" })).toBeInTheDocument();
    });
  }
});
