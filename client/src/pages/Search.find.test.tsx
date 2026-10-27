/**
 * /search as Find (master plan U15): a reference opens the passage first, and
 * a rewritten essay is found by the rewrite's own title, never twice.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import superjson from "superjson";

import { offlineFetch, renderWithProviders } from "@/test/harness";
import Search from "./Search";

// One rewrite on the shelf, as essayOverrides.generated.ts lists it once a pilot lands.
vi.mock("@/lib/essayOverrides.generated", () => ({
  ESSAY_OVERRIDES: [
    { slug: "what-render-unto-caesar-actually-means", title: "What Did Jesus Mean by \"Render Unto Caesar\"?", excerpt: "A coin, a trap, and a question about whose image you bear.", updated: "2026-10-30" },
  ],
}));

/** The server's search answers with these rows; everything else is offline. */
function serverSearch(results: Record<string, unknown>[]): typeof fetch {
  const offline = offlineFetch();
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(String(input instanceof Request ? input.url : input), "http://localhost");
    if (!url.pathname.startsWith("/api/trpc/")) return offline(input, init);
    const procs = decodeURIComponent(url.pathname.slice("/api/trpc/".length)).split(",");
    const body = procs.map(() => ({ result: { data: superjson.serialize({ results, total: results.length }) } }));
    return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
}

function searchFor(q: string, results: Record<string, unknown>[] = []) {
  window.history.replaceState({}, "", `/search?q=${encodeURIComponent(q)}`);
  vi.stubGlobal("fetch", serverSearch(results));
  renderWithProviders(<Search />);
}

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

describe("Find on /search", () => {
  it("opens a verse in the Study Bible before anything else", async () => {
    searchFor("jn 3 16");
    const link = await screen.findByRole("link", { name: /John 3:16/ });
    expect(link).toHaveAttribute("href", "/study/bible/john/3#v16");
    expect(screen.getByText("In the Study Bible")).toBeInTheDocument();
    // A passage is a result: the page does not also say it found nothing.
    expect(screen.queryByText(/Nothing here for/)).toBeNull();
  });

  it("shows no passage for a plain question", async () => {
    searchFor("is america a christian nation");
    expect(await screen.findByText(/Nothing here for/)).toBeInTheDocument();
    expect(screen.queryByText("In the Study Bible")).toBeNull();
  });

  it("finds a rewrite by its own title and drops the database's older row for it", async () => {
    searchFor("render unto caesar", [
      { id: 1, type: "article", slug: "what-render-unto-caesar-actually-means", title: "What Render Unto Caesar Actually Means", createdAt: new Date("2025-01-01T00:00:00.000Z") },
    ]);
    const rewrite = await screen.findByRole("link", { name: /What Did Jesus Mean by "Render Unto Caesar"\?/ });
    expect(rewrite).toHaveAttribute("href", "/writing/what-render-unto-caesar-actually-means");
    expect(screen.queryByText("What Render Unto Caesar Actually Means")).toBeNull();
  });
});
