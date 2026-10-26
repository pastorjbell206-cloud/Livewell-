/**
 * /writing on a phone: the search box sits above "Start with these" so it
 * does not move while the reader types; every essay row carries the reader's
 * own Read and Saved marks; a search that finds no essay points on to the
 * site-wide search.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { LEGACY_BOOKMARKS_KEY, LIBRARY_KEY, saveToLibrary } from "@/lib/library";
import Writing from "./Writing";

beforeEach(() => {
  window.localStorage.clear();
  vi.stubGlobal("fetch", vi.fn(offlineFetch()));
  window.history.pushState({}, "", "/writing");
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.localStorage.clear();
  window.history.pushState({}, "", "/");
});

/** The row for an essay in its shelf section (the start row is a separate list). */
function row(title: string): HTMLElement {
  const rows = screen.getAllByRole("link").filter((a) => a.querySelector("span")?.textContent === title);
  expect(rows.length).toBeGreaterThan(0);
  return rows[0];
}

describe("/writing", () => {
  it("puts the search box above Start with these, so typing does not move it", () => {
    renderWithProviders(<Writing />);
    const box = screen.getByRole("searchbox", { name: "Search the essays" });
    const start = screen.getByText("Start with these");
    expect(box.compareDocumentPosition(start) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const before = box.closest("section");
    fireEvent.change(box, { target: { value: "empire" } });
    expect(screen.queryByText("Start with these")).not.toBeInTheDocument();
    // Same box, same place: the hero it sits in did not change.
    expect(screen.getByRole("searchbox", { name: "Search the essays" })).toBe(box);
    expect(box.closest("section")).toBe(before);
  });

  it("marks every essay row the reader has saved or finished", () => {
    window.localStorage.setItem("livewell-read-essays", JSON.stringify(["the-conservative-blind-spot"]));
    window.localStorage.setItem(LEGACY_BOOKMARKS_KEY, JSON.stringify(["blind-spots"]));
    expect(saveToLibrary({ href: "/writing/women-in-church-history", title: "Women in Church History", kind: "Essay" })).toBe(true);
    renderWithProviders(<Writing />);

    expect(row("The Conservative Blind Spot")).toHaveTextContent("✓ Read");
    expect(row("The Conservative Blind Spot")).not.toHaveTextContent("Saved");
    expect(row("Blind Spots")).toHaveTextContent("Saved");
    expect(row("Women in Church History: The Voices They Silenced")).toHaveTextContent("Saved");
    expect(row("When Fear Becomes Theology")).not.toHaveTextContent(/Saved|Read$/);
    expect(JSON.parse(window.localStorage.getItem(LIBRARY_KEY) ?? "[]")).toHaveLength(1);
  });

  it("points a search with no essay to the site-wide search", () => {
    renderWithProviders(<Writing />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the essays" }), { target: { value: "grief and prayer" } });

    expect(screen.getByText('No essay on the shelf matches "grief and prayer".')).toBeInTheDocument();
    const link = screen.getByRole("link", { name: 'Search the whole site for "grief and prayer"' });
    expect(link).toHaveAttribute("href", "/search?q=grief%20and%20prayer");
  });

  it("gives the clear button a 44px target", () => {
    renderWithProviders(<Writing />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the essays" }), { target: { value: "x" } });
    const clear = screen.getByRole("button", { name: "Clear search" });
    expect(clear.style.minHeight).toBe("44px");
    expect(clear.style.minWidth).toBe("44px");
  });
});
