/**
 * scripts/lib/site-routes.mjs counts a public shelf essay as a page even when
 * its text lives only in the database, as validate-links.mjs and the sitemap
 * do; an essay the shelf holds back stays unresolved.
 */
import { describe, it, expect } from "vitest";
import { resolveHref } from "../scripts/lib/site-routes.mjs";
import { loadEssayShelf } from "../scripts/lib/shelf.mjs";

describe("site-routes and the essay shelf", () => {
  const shelf = loadEssayShelf();

  it("resolves a live shelf essay that has no copy in the repository", () => {
    const slug = "how-the-bible-gets-translated-by";
    expect(shelf.visibility(slug)).toBe("shelf");
    expect(resolveHref(`/writing/${slug}`).status).toBe("ok");
  });

  it("leaves a held-back shelf essay with no copy unresolved", () => {
    const slug = "where-church-was-silent-history-injustice-reckoning";
    expect(shelf.visibility(slug)).not.toBe("shelf");
    expect(resolveHref(`/writing/${slug}`).status).toBe("missing");
  });
});
