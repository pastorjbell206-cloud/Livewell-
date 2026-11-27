/**
 * /preview/explore/<discipline>: each of the eight disciplines has a preview
 * page made only of catalogue pages, held from search engines, with a plain
 * answer at an address that names no discipline.
 */
import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import { Route, Switch } from "wouter";

import { renderWithProviders } from "@/test/harness";
import { allEntries, entryById } from "@/lib/siteCatalog";
import { isPublicEssay } from "@/lib/shelf";
import { DISCIPLINES, DISCIPLINE_ESSAYS } from "./disciplines";
import PreviewDiscipline from "./PreviewDiscipline";

const CATALOGUE = new Set(allEntries().map((e) => e.href));

function open(id: string) {
  window.history.pushState({}, "", `/preview/explore/${id}`);
  return renderWithProviders(
    <Switch>
      <Route path="/preview/explore/:discipline" component={PreviewDiscipline} />
    </Switch>,
  );
}

describe("/preview/explore/<discipline>", () => {
  it.each(DISCIPLINES.map((d) => [d.id, d] as const))("%s lists its rooms from the catalogue and is never indexed", (_id, d) => {
    const { unmount } = open(d.id);
    expect(screen.getByRole("heading", { level: 1, name: d.name })).toBeTruthy();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex, follow");
    const rooms = within(screen.getByRole("region", { name: "The rooms" }));
    for (const id of d.doors) expect(rooms.getByRole("link", { name: new RegExp(`^${entryById(id)!.name}`) })).toHaveAttribute("href", entryById(id)!.href);
    const nav = screen.getByRole("navigation", { name: "The eight disciplines" });
    expect(nav.querySelector('[aria-current="page"]')?.textContent).toBe(d.name);
    const hrefs = Array.from(document.querySelectorAll("main a[href]")).map((a) => a.getAttribute("href")!);
    for (const href of hrefs)
      expect(CATALOGUE.has(href) || href.startsWith("#") || href.startsWith("/preview/") || href === "/writing" || (href.startsWith("/writing/") && isPublicEssay(href.slice(9))), href).toBe(true);
    unmount();
  });

  it("offers six public essays for every discipline", () => {
    for (const d of DISCIPLINES) {
      const list = DISCIPLINE_ESSAYS[d.id] ?? [];
      expect(list, d.id).toHaveLength(6);
      for (const slug of list) expect(isPublicEssay(slug), `${d.id}: ${slug}`).toBe(true);
    }
  });

  it("answers plainly at an address that names no discipline", () => {
    open("nothing-here");
    expect(screen.getByRole("heading", { level: 1, name: "There is no discipline at this address." })).toBeTruthy();
  });
});
