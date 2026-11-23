/**
 * The Exit site button on the care pages about abuse and safety: the one
 * control that has to work on the first try keeps the 44px every other
 * control on the site keeps (the walk of 2026-11-23, finding 10: it was
 * 40px), and still says what it cannot do.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { QuickExit } from "./QuickExit";

describe("QuickExit", () => {
  it("is at least 44px tall, and says it does not clear the browsing history", () => {
    render(<QuickExit />);
    const button = screen.getByRole("button", { name: /^Exit site/ });
    expect(button.style.minHeight).toBe("44px");
    expect(button.getAttribute("aria-label")).toContain("it does not clear your browsing history");
  });
});
