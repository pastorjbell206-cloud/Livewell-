/**
 * Text size: A− / A+ in four steps, remembered on this device through
 * lib/storage, separate from Focus, with a 44px target per button and an
 * honest line when the browser will not keep the choice.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { TEXT_SIZE_KEY, TextSize, useTextSize } from "./TextSize";

function Page() {
  const t = useTextSize();
  return (
    <>
      <TextSize size={t.size} onChange={t.setSize} saveFailed={t.saveFailed} />
      <div data-testid="body" style={{ fontSize: `${Math.round(18 * t.scale)}px` }}>
        The essay.
      </div>
    </>
  );
}

const body = () => screen.getByTestId("body");
const larger = () => screen.getByRole("button", { name: "Larger text" });
const smaller = () => screen.getByRole("button", { name: "Smaller text" });

beforeEach(() => {
  window.localStorage.clear();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe("TextSize", () => {
  it("steps the text up and down, and holds at either end", () => {
    render(<Page />);
    expect(screen.getByRole("group", { name: "Text size" })).toBeInTheDocument();
    expect(body().style.fontSize).toBe("18px");

    fireEvent.click(larger());
    expect(body().style.fontSize).toBe("21px");
    fireEvent.click(larger());
    expect(body().style.fontSize).toBe("23px");
    expect(larger()).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(larger());
    expect(body().style.fontSize).toBe("23px");
    // At the end the button keeps focus rather than being disabled out from under it.
    expect(larger()).not.toBeDisabled();

    fireEvent.click(smaller());
    fireEvent.click(smaller());
    fireEvent.click(smaller());
    expect(body().style.fontSize).toBe("16px");
    expect(smaller()).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Text size: Smaller");
  });

  it("remembers the size on this device", () => {
    const first = render(<Page />);
    fireEvent.click(larger());
    expect(JSON.parse(window.localStorage.getItem(TEXT_SIZE_KEY) ?? "null")).toBe("larger");
    first.unmount();

    render(<Page />);
    expect(body().style.fontSize).toBe("21px");
  });

  it("falls back to the standard size when what is stored is not a size", () => {
    window.localStorage.setItem(TEXT_SIZE_KEY, JSON.stringify("enormous"));
    render(<Page />);
    expect(body().style.fontSize).toBe("18px");
  });

  it("still changes the size, and says it will not be kept, when the browser refuses the write", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    render(<Page />);
    fireEvent.click(larger());
    expect(body().style.fontSize).toBe("21px");
    expect(screen.getByText("Couldn't save to this browser, so the size resets when you reload.")).toBeInTheDocument();
  });

  it("gives each button a 44px target", () => {
    render(<Page />);
    for (const b of [smaller(), larger()]) {
      expect(b.style.minHeight).toBe("44px");
      expect(b.style.minWidth).toBe("44px");
    }
  });
});
