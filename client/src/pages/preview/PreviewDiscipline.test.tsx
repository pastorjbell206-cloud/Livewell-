/**
 * /preview/explore/<discipline>: each of the eight disciplines has a preview
 * page made only of catalogue pages, held from search engines, with a plain
 * answer at an address that names no discipline.
 */
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Switch } from "wouter";

import { renderWithProviders } from "@/test/harness";
import { allEntries, entryById } from "@/lib/siteCatalog";
import { DISCIPLINES } from "./disciplines";
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
    for (const id of d.doors) expect(screen.getByRole("heading", { level: 2, name: entryById(id)!.name })).toBeTruthy();
    const hrefs = Array.from(document.querySelectorAll("main a[href]")).map((a) => a.getAttribute("href")!);
    for (const href of hrefs) expect(CATALOGUE.has(href) || href.startsWith("#") || href.startsWith("/preview/"), href).toBe(true);
    unmount();
  });

  it("answers plainly at an address that names no discipline", () => {
    open("nothing-here");
    expect(screen.getByRole("heading", { level: 1, name: "There is no discipline at this address." })).toBeTruthy();
  });
});
