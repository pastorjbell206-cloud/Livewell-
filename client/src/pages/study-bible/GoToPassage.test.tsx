/**
 * The Study Bible's "Go to" field: a reference or a book opens in place, and
 * anything else says so and offers the site search.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { GoToPassage } from "./GoToPassage";

function go(q: string) {
  fireEvent.change(screen.getByRole("textbox", { name: "Go to a passage" }), { target: { value: q } });
  fireEvent.click(screen.getByRole("button", { name: "Go" }));
}

afterEach(() => window.history.replaceState({}, "", "/"));

describe("GoToPassage", () => {
  it("opens a verse, a chapter, and a book", () => {
    render(<GoToPassage />);
    go("jn 3 16");
    expect(window.location.pathname + window.location.hash).toBe("/study/bible/john/3#v16");
    go("Romans 8");
    expect(window.location.pathname).toBe("/study/bible/romans/8");
    go("1 John");
    expect(window.location.pathname).toBe("/study/bible/1-john");
  });

  it("shows a verse of the chapter on screen in place", () => {
    window.history.replaceState({}, "", "/study/bible/john/3");
    const onVerse = vi.fn(() => true);
    render(<GoToPassage here="/study/bible/john/3" onVerse={onVerse} />);
    go("John 3:16");
    expect(onVerse).toHaveBeenCalledWith(16);
    expect(window.location.pathname + window.location.hash).toBe("/study/bible/john/3#v16");
  });

  it("says plainly when it cannot open something, and offers the site search", () => {
    render(<GoToPassage />);
    go("grace");
    expect(screen.getByRole("status")).toHaveTextContent("“grace” isn’t a passage this can open.");
    expect(screen.getByRole("link", { name: "search the site for it" })).toHaveAttribute("href", "/search?q=grace");
    expect(window.location.pathname).toBe("/");
  });
});
