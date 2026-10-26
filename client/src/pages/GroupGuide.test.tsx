/**
 * The small-group guides were written for essays that are mostly off the
 * public shelf. A guide links "Read the essay" and its "Read next" essays only
 * when those essays are public, under their shelf titles (never a slug), keeps
 * a book as written, and offers send, save, and print to the leader.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, within } from "@testing-library/react";
import { Route, Switch } from "wouter";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { isPublicEssay } from "@/lib/shelf";
import { DISCUSSION_GUIDES } from "@/data/discussion-guides";
import GroupGuide from "./GroupGuide";

vi.mock("@/lib/shelf", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/shelf")>();
  return { ...actual, isPublicEssay: vi.fn(actual.isPublicEssay) };
});

let realIsPublic: (slug: string, date?: unknown) => boolean;
beforeEach(async () => {
  realIsPublic = (await vi.importActual<typeof import("@/lib/shelf")>("@/lib/shelf")).isPublicEssay;
  vi.mocked(isPublicEssay).mockImplementation(realIsPublic);
  vi.stubGlobal("fetch", vi.fn(offlineFetch()));
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

function renderGuide(slug: string) {
  window.history.pushState({}, "", `/group-guide/${slug}`);
  return renderWithProviders(
    <Switch>
      <Route path="/group-guide/:slug" component={GroupGuide} />
    </Switch>
  );
}

/** Links into an essay from the guide itself (the header and footer link only to /writing). */
const essayLinks = () => Array.from(document.querySelectorAll<HTMLAnchorElement>('main a[href^="/writing/"]'));

describe("/group-guide/:slug", () => {
  it("links no essay that is off the shelf, and keeps the book it recommends", () => {
    renderGuide("how-christianity-became-an-empire");

    expect(screen.getByRole("heading", { level: 1, name: "How Christianity Became an Empire" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Read the essay" })).not.toBeInTheDocument();
    expect(screen.queryByText(/Read the essay first/)).not.toBeInTheDocument();
    expect(essayLinks()).toEqual([]);

    const readNext = screen.getByRole("heading", { level: 2, name: "Read next" }).closest("section")!;
    expect(within(readNext).getByText("Resident Aliens by Stanley Hauerwas and William Willimon")).toBeInTheDocument();
    // No slug spelled out as a title.
    expect(within(readNext).queryByText(/death of christendom|anabaptist option/i)).not.toBeInTheDocument();
  });

  it("leaves Read next out when nothing in it is public", () => {
    // A guide whose list is essays only, none of them on the shelf.
    const essaysOnly = Object.values(DISCUSSION_GUIDES).find(
      (g) => g.suggestedReading.length > 0 && g.suggestedReading.every((r) => /^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(r.trim()) && !realIsPublic(r.trim()))
    );
    expect(essaysOnly).toBeDefined();
    renderGuide(essaysOnly!.slug);

    expect(screen.getByRole("heading", { level: 1, name: essaysOnly!.articleTitle })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "Read next" })).not.toBeInTheDocument();
  });

  it("shows a public essay under its shelf title, and the essay itself to read first", () => {
    vi.mocked(isPublicEssay).mockImplementation(
      (slug: string) => slug === "how-christianity-became-an-empire" || slug === "the-anabaptist-option"
    );
    renderGuide("how-christianity-became-an-empire");

    expect(screen.getByRole("link", { name: "Read the essay" })).toHaveAttribute("href", "/writing/how-christianity-became-an-empire");
    expect(screen.getByText(/Read the essay first/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "The Anabaptist Option" })).toHaveAttribute("href", "/writing/the-anabaptist-option");
    // The other suggestion is still off the shelf.
    expect(document.querySelector('a[href="/writing/the-death-of-christendom"]')).toBeNull();
  });

  it("lets a leader send it to their phone, save it, or print it", () => {
    renderGuide("how-christianity-became-an-empire");
    const bar = screen.getByRole("group", { name: /Take this with you: Small-group guide: How Christianity Became an Empire/ });
    expect(within(bar).getByRole("button", { name: /Send to my phone/ })).toBeInTheDocument();
    expect(within(bar).getByRole("button", { name: /Save/ })).toBeInTheDocument();
    expect(within(bar).getByRole("button", { name: /Print/ })).toBeInTheDocument();
  });

  it("prints the title in ink, and leaves the newsletter off the paper", () => {
    renderGuide("how-christianity-became-an-empire");
    const title = screen.getByRole("heading", { level: 1 });
    // Its color is a token that .print-paper pins to ink when printing.
    expect(title.style.color).toBe("var(--charcoal-fg)");
    expect(title.closest(".print-paper")).not.toBeNull();
    expect(screen.getByText("Guides like this, in your inbox.").closest(".no-print")).not.toBeNull();
  });

  it("checks every guide: no essay link that would land on a takedown notice", () => {
    for (const slug of Object.keys(DISCUSSION_GUIDES)) {
      const view = renderGuide(slug);
      for (const a of essayLinks()) {
        expect(realIsPublic(decodeURIComponent(a.getAttribute("href")!.slice("/writing/".length))), `${slug} -> ${a.getAttribute("href")}`).toBe(true);
      }
      view.unmount();
    }
  });
});
