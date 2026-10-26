/**
 * My Library shows what a reader saved and started, from this browser only,
 * and points somewhere useful when there is nothing yet.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TestProviders } from "@/test/harness";
import MyLibrary from "./MyLibrary";
import { saveToLibrary } from "@/lib/library";

beforeEach(() => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ plans: [{ slug: "anxiety", title: "Eight Weeks Toward a Quieter Mind" }] }), { status: 200 }),
  );
});
afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("My Library", () => {
  it("offers a way in when nothing is saved yet", () => {
    render(<TestProviders><MyLibrary /></TestProviders>);
    expect(screen.getByRole("heading", { name: "Nothing here yet" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /find help for what you're facing/i })).toHaveAttribute("href", "/help");
  });

  it("lists saved pages and plans in progress, and removes a page", async () => {
    saveToLibrary({ href: "/help/grief", title: "Someone I love has died", kind: "Find Help" });
    localStorage.setItem("lw-plan-anxiety", JSON.stringify({ startedAt: "2026-10-01T12:00:00.000Z", done: { 1: true } }));
    render(<TestProviders><MyLibrary /></TestProviders>);
    expect(screen.getByRole("link", { name: "Someone I love has died" })).toHaveAttribute("href", "/help/grief");
    expect(await screen.findByText("Eight Weeks Toward a Quieter Mind")).toBeInTheDocument();
    expect(screen.getByText("1 of 8 weeks walked")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email my saved list to myself/i }).getAttribute("href")).toMatch(/^mailto:/);
    fireEvent.click(screen.getByRole("button", { name: /remove someone i love has died/i }));
    expect(screen.queryByRole("link", { name: "Someone I love has died" })).toBeNull();
  });

  it("keeps a post James published after the shelf was set as a live link, and says when an essay was taken down", () => {
    // Hypothetical essays, so their addresses are built, not written out (scripts/validate-links.mjs).
    const later = `/writing/${"a-post-from-this-month"}`;
    saveToLibrary({ href: later, title: "A Post From This Month", kind: "Essay", date: "2026-10-15T12:00:00.000Z" });
    saveToLibrary({ href: `/writing/${"an-old-retired-essay"}`, title: "An Old Essay", kind: "Essay" });
    render(<TestProviders><MyLibrary /></TestProviders>);
    expect(screen.getByRole("link", { name: "A Post From This Month" })).toHaveAttribute("href", later);
    expect(screen.queryByRole("link", { name: "An Old Essay" })).toBeNull();
    expect(screen.getByText("James has taken this essay down for now.")).toBeInTheDocument();
  });
});
