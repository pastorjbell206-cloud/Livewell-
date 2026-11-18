/**
 * The Study Bible's "Go to" field: a reference or a book opens in place, and
 * anything else is searched for in the Bible's own words.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { GoToPassage } from "./GoToPassage";

function go(q: string) {
  fireEvent.change(screen.getByRole("textbox", { name: "Go to a passage, or find a word" }), { target: { value: q } });
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

  it("says so when the chapter on screen has no such verse", () => {
    window.history.replaceState({}, "", "/study/bible/john/3");
    const onVerse = vi.fn(() => false);
    render(<GoToPassage here="/study/bible/john/3" onVerse={onVerse} />);
    go("John 3:99");
    expect(onVerse).toHaveBeenCalledWith(99);
    expect(screen.getByRole("status")).toHaveTextContent("“John 3:99” isn’t a passage this can open.");
    expect(window.location.pathname + window.location.hash).toBe("/study/bible/john/3");
  });

  it("takes anything that is not a reference as words to find in the Bible", () => {
    render(<GoToPassage />);
    go("born again");
    expect(window.location.pathname + window.location.search).toBe("/study/bible/search?q=born%20again");
  });
});
