import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/harness";
import TurnNav from "./TurnNav";

describe("TurnNav", () => {
  it("links the page before and the page after, and says which is which", () => {
    const { container } = renderWithProviders(<TurnNav label="Previous and next subject" prev={{ href: "/wisdom/a", title: "A" }} next={{ href: "/wisdom/c", title: "C" }} />);
    const nav = container.querySelector("nav")!;
    expect(nav.getAttribute("aria-label")).toBe("Previous and next subject");
    const [prev, next] = Array.from(nav.querySelectorAll("a"));
    expect([prev.getAttribute("href"), prev.getAttribute("rel"), prev.textContent]).toEqual(["/wisdom/a", "prev", " PreviousA"]);
    expect([next.getAttribute("href"), next.getAttribute("rel")]).toEqual(["/wisdom/c", "next"]);
    expect(next.textContent).toContain("Next");
  });

  it("draws nothing at the only item, and one card at either end", () => {
    expect(renderWithProviders(<TurnNav label="x" />).container.querySelector("nav")).toBeNull();
    const first = renderWithProviders(<TurnNav label="x" next={{ href: "/b", title: "B" }} />).container;
    expect(first.querySelectorAll("nav a").length).toBe(1);
  });
});
