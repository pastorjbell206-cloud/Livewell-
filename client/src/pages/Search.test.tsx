/**
 * Site search puts the help lines first when what a reader types is a
 * crisis, and stays out of the way for everything else.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { offlineFetch, renderWithProviders } from "@/test/harness";
import Search from "./Search";

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

function searchFor(q: string) {
  window.history.replaceState({}, "", `/search?q=${encodeURIComponent(q)}`);
  vi.stubGlobal("fetch", offlineFetch());
  renderWithProviders(<Search />);
}

describe("Search", () => {
  it("puts the help lines first when someone types that they want to die", () => {
    searchFor("I want to die");
    expect(screen.getByRole("heading", { name: "If you need help now" })).toBeInTheDocument();
    expect(document.querySelector('a[href="tel:988"]')).not.toBeNull();
  });

  it("adds the abuse hotline when someone says they are being hit", () => {
    searchFor("my husband hits me");
    expect(screen.getByRole("heading", { name: "If you need help now" })).toBeInTheDocument();
    expect(screen.getAllByText(/National Domestic Violence Hotline/).length).toBeGreaterThan(0);
  });

  it("shows no help block for an ordinary search", () => {
    searchFor("Deuteronomy");
    expect(screen.queryByRole("heading", { name: "If you need help now" })).toBeNull();
  });

  it("ends a search that found nothing on Find Help, the seven doors, the start road and the whole site, never a dead end", async () => {
    // The server answers (with no essays), as it does on the live site; the libraries are empty here.
    window.history.replaceState({}, "", "/search?q=zzqqxx");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: RequestInfo | URL) =>
        String(url).includes("/api/trpc")
          ? new Response(JSON.stringify([{ result: { data: { json: { results: [] } } } }]), { status: 200, headers: { "content-type": "application/json" } })
          : new Response("{}", { status: 404 }),
      ),
    );
    renderWithProviders(<Search />);
    const list = await screen.findByRole("list", { name: "Places to start" }, { timeout: 8000 });
    const hrefs = Array.from(list.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/help", "/study", "/theology/history", "/topics", "/family", "/tools", "/writing", "/about", "/start", "/explore"]);
    expect(screen.getByRole("status").textContent).toContain('Nothing here for "zzqqxx"');
  });
});
