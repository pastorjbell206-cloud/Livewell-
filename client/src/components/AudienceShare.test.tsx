/**
 * "Send to…": the three notes name the essay in the subject line, the menu
 * opens inside the screen wherever its button lands on a phone, it closes on
 * Escape and on a tap outside, and every target is 44px.
 */
import { describe, it, expect, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { AudienceShare, audienceMailto, menuPlacement } from "./AudienceShare";

const TITLE = "When the Church Married Empire";
const URL_ = "https://www.livewellbyjamesbell.co/writing/when-the-church-married-empire";

function subjectOf(href: string): string {
  return decodeURIComponent(/subject=([^&]*)/.exec(href)?.[1] ?? "");
}

afterEach(() => {
  delete (document.documentElement as { clientWidth?: number }).clientWidth;
});

describe("menuPlacement", () => {
  it("starts at the button's left edge when the menu fits there", () => {
    expect(menuPlacement(100, 1024)).toEqual({ left: 0, width: 280 });
  });

  it("pulls a menu whose button wrapped to the start of a phone row in from the left edge", () => {
    // The old right-pinned menu opened about 95px past the left edge here.
    expect(menuPlacement(8, 390)).toEqual({ left: 8, width: 280 });
  });

  it("pulls a menu whose button sits at the end of a phone row back from the right edge", () => {
    const { left, width } = menuPlacement(300, 390);
    expect(300 + left).toBeGreaterThanOrEqual(16);
    expect(300 + left + width).toBeLessThanOrEqual(390 - 16);
  });

  it("narrows to the screen on the smallest phones", () => {
    expect(menuPlacement(0, 280)).toEqual({ left: 16, width: 248 });
  });
});

describe("audienceMailto", () => {
  it("names the essay in every subject line, and carries the link", () => {
    for (const r of ["skeptic", "pastor", "spouse"] as const) {
      const href = audienceMailto(r, TITLE, URL_);
      expect(subjectOf(href)).toContain(`"${TITLE}"`);
      expect(decodeURIComponent(href)).toContain(URL_);
      expect(decodeURIComponent(href)).not.toContain("—");
    }
  });
});

describe("AudienceShare", () => {
  it("opens a menu of three emails, each a 44px row", () => {
    render(<AudienceShare title={TITLE} url={URL_} />);
    const trigger = screen.getByRole("button", { name: /Send to/ });
    expect(trigger.style.minHeight).toBe("44px");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    for (const name of ["Send to a skeptic", "Send to a pastor", "Send to your spouse"]) {
      const link = screen.getByRole("link", { name });
      expect(link.getAttribute("href")).toMatch(/^mailto:/);
      expect(subjectOf(link.getAttribute("href") ?? "")).toContain(TITLE);
      expect(link.style.minHeight).toBe("44px");
    }
  });

  it("keeps the open menu inside a 390px screen when its button starts a row", () => {
    Object.defineProperty(document.documentElement, "clientWidth", { value: 390, configurable: true });
    render(<AudienceShare title={TITLE} url={URL_} />);
    const trigger = screen.getByRole("button", { name: /Send to/ });
    trigger.getBoundingClientRect = () => ({ left: 8, right: 120, top: 0, bottom: 44, width: 112, height: 44, x: 8, y: 0, toJSON: () => ({}) });

    fireEvent.click(trigger);
    const menu = document.getElementById(trigger.getAttribute("aria-controls") ?? "");
    expect(menu).not.toBeNull();
    const left = 8 + parseFloat(menu!.style.left);
    expect(left).toBeGreaterThanOrEqual(16);
    expect(left + parseFloat(menu!.style.width)).toBeLessThanOrEqual(390 - 16);
  });

  it("closes on Escape and gives focus back to its button", () => {
    render(<AudienceShare title={TITLE} url={URL_} />);
    const trigger = screen.getByRole("button", { name: /Send to/ });
    fireEvent.click(trigger);
    screen.getByRole("link", { name: "Send to a pastor" }).focus();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("link", { name: "Send to a pastor" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on a tap outside, and stays open for a tap inside", () => {
    render(
      <>
        <p>Elsewhere on the page</p>
        <AudienceShare title={TITLE} url={URL_} />
      </>
    );
    fireEvent.click(screen.getByRole("button", { name: /Send to/ }));

    fireEvent.pointerDown(screen.getByRole("link", { name: "Send to a skeptic" }));
    expect(screen.getByRole("link", { name: "Send to a skeptic" })).toBeInTheDocument();

    fireEvent.pointerDown(screen.getByText("Elsewhere on the page"));
    expect(screen.queryByRole("link", { name: "Send to a skeptic" })).not.toBeInTheDocument();
  });
});
