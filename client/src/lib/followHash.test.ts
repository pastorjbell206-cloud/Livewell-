import { afterEach, describe, expect, it, vi } from "vitest";
import { followHash } from "./followHash";
import { HELD_ID } from "./prerender-hold";

describe("followHash", () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("scrolls to the named part once it exists", () => {
    vi.useFakeTimers();
    document.body.innerHTML = `<div id="root"></div>`;
    const scroll = vi.fn();
    followHash("/wisdom/money#misread");
    vi.advanceTimersByTime(200);
    const el = document.createElement("section");
    el.id = "misread";
    el.scrollIntoView = scroll;
    document.getElementById("root")!.append(el);
    vi.advanceTimersByTime(200);
    expect(scroll).toHaveBeenCalledTimes(1);
  });

  it("waits while the prerendered text is still held over the page", () => {
    vi.useFakeTimers();
    document.body.innerHTML = `<div id="${HELD_ID}"><p>Held text</p></div><div id="root"><section id="misread"></section></div>`;
    const scroll = vi.fn();
    document.getElementById("misread")!.scrollIntoView = scroll;
    followHash("/wisdom/money#misread");
    vi.advanceTimersByTime(1000);
    expect(scroll).not.toHaveBeenCalled();
    document.getElementById(HELD_ID)!.remove();
    vi.advanceTimersByTime(200);
    expect(scroll).toHaveBeenCalledTimes(1);
  });
});

describe("holdInView", () => {
  it("puts a part back at the top when the page grows above it, and lets go when the reader scrolls", async () => {
    const { holdInView } = await import("./followHash");
    vi.useFakeTimers();
    const el = document.createElement("div");
    el.id = "plain";
    document.body.appendChild(el);
    let top = 2000;
    el.getBoundingClientRect = () => ({ top, bottom: top, left: 0, right: 0, width: 0, height: 0, x: 0, y: top, toJSON: () => ({}) });
    const scrolled = vi.fn(() => {
      top = 0;
    });
    el.scrollIntoView = scrolled;
    holdInView("plain");
    vi.advanceTimersByTime(700);
    expect(scrolled).toHaveBeenCalledTimes(1);
    // More arrives above it: it is brought back once more.
    top = 900;
    vi.advanceTimersByTime(300);
    expect(scrolled).toHaveBeenCalledTimes(2);
    // The reader takes over: nothing moves again.
    window.dispatchEvent(new Event("wheel"));
    top = 500;
    vi.advanceTimersByTime(2000);
    expect(scrolled).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
    el.remove();
  });
});
