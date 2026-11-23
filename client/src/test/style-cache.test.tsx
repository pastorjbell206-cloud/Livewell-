/**
 * The computed styles test/setup.ts keeps between changes (so role queries do
 * not recompute the whole page after every click) never answer with a stale
 * style: a change to the element, to an ancestor, to where it sits, or to any
 * stylesheet shows at once, and a role query sees it.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function page() {
  render(
    <div data-testid="outer">
      <section data-testid="inner">
        <button type="button">Go</button>
      </section>
    </div>,
  );
  return { outer: screen.getByTestId("outer"), inner: screen.getByTestId("inner"), go: screen.getByRole("button", { name: "Go" }) };
}

describe("computed styles kept between changes", () => {
  it("keeps one answer while nothing changes, and a new one after a change", () => {
    const { go, outer } = page();
    const first = window.getComputedStyle(go);
    expect(window.getComputedStyle(go)).toBe(first);
    outer.setAttribute("data-x", "1");
    expect(window.getComputedStyle(go)).not.toBe(first);
  });

  it("sees an ancestor hidden and shown, by style and by attribute", () => {
    const { go, outer, inner } = page();
    expect(go).toBeVisible();
    outer.style.display = "none";
    expect(go).not.toBeVisible();
    expect(screen.queryByRole("button", { name: "Go" })).toBeNull();
    outer.style.display = "";
    expect(go).toBeVisible();
    inner.hidden = true;
    expect(go).not.toBeVisible();
    expect(screen.queryByRole("button", { name: "Go" })).toBeNull();
    inner.hidden = false;
    expect(screen.getByRole("button", { name: "Go" })).toBe(go);
    inner.style.visibility = "hidden";
    expect(go).not.toBeVisible();
  });

  it("sees an element moved under a hidden parent and back", () => {
    const { go, inner } = page();
    expect(go).toBeVisible();
    const hidden = document.createElement("div");
    hidden.hidden = true;
    document.body.appendChild(hidden);
    hidden.appendChild(go);
    expect(go).not.toBeVisible();
    inner.appendChild(go);
    expect(go).toBeVisible();
    hidden.remove();
  });

  it("sees a stylesheet come, change and go, whether alone or inside what a page renders", () => {
    const { go } = page();
    const sheet = document.createElement("style");
    sheet.textContent = "button { display: none; }";
    document.head.appendChild(sheet);
    expect(go).not.toBeVisible();
    sheet.textContent = "button { color: red; }";
    expect(go).toBeVisible();
    sheet.remove();
    expect(go).toBeVisible();
    // A page's own <style> block arrives inside the subtree React mounts, and
    // changes there too. (Removing it is left out: jsdom keeps the sheet of a
    // <style> removed inside its parent, with or without the kept styles.)
    const block = document.createElement("div");
    block.innerHTML = "<style>section { visibility: hidden; }</style>";
    document.body.appendChild(block);
    expect(go).not.toBeVisible();
    block.querySelector("style")!.textContent = "section { color: red; }";
    expect(go).toBeVisible();
    block.remove();
  });
});
