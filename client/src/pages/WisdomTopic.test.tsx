/**
 * The wisdom topics on the heaviest subjects show the help block under the
 * title, before any reading, and the lines come from the verified data file.
 * Rendered from the real topics file, not a fixture.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import fs from "node:fs";
import path from "node:path";
import { TestProviders } from "@/test/harness";
import { SENSITIVE_WISDOM } from "@/lib/needs";
import WisdomTopic from "./WisdomTopic";

const TOPICS = path.resolve(__dirname, "../../public/wisdom/topics.json");
const topics: { id: string; label: string }[] = JSON.parse(fs.readFileSync(TOPICS, "utf8")).topics;

describe("WisdomTopic help block", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) =>
      String(input).endsWith("/wisdom/topics.json")
        ? new Response(fs.readFileSync(TOPICS, "utf8"), { status: 200, headers: { "Content-Type": "application/json" } })
        : new Response("{}", { status: 404 })));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("names only topics that exist", () => {
    const ids = new Set(topics.map((t) => t.id));
    for (const id of Object.keys(SENSITIVE_WISDOM)) expect(ids.has(id), id).toBe(true);
  });

  it("puts the lines under the title on /wisdom/suicidal-thoughts", async () => {
    const { hook } = memoryLocation({ path: "/wisdom/suicidal-thoughts" });
    const { container } = render(
      <TestProviders>
        <Router hook={hook}>
          <WisdomTopic />
        </Router>
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Suicidal Thoughts"));
    const call = container.querySelector('a[href="tel:988"]');
    const firstVerse = container.querySelector("blockquote");
    expect(call).not.toBeNull();
    // The help block comes before the first verse in the page.
    expect(firstVerse).not.toBeNull();
    expect(call!.compareDocumentPosition(firstVerse!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("shows the Domestic Violence Hotline on /wisdom/toxic-relationships", async () => {
    const { hook } = memoryLocation({ path: "/wisdom/toxic-relationships" });
    const { container } = render(
      <TestProviders>
        <Router hook={hook}>
          <WisdomTopic />
        </Router>
      </TestProviders>,
    );
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument());
    expect(container.querySelector('a[href="tel:18007997233"]')).not.toBeNull();
  });
});
