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
