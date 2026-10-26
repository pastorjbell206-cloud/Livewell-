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
});
