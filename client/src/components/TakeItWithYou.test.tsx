/**
 * TakeItWithYou sends a page through the reader's own apps and saves it to
 * My Library, and tells the truth about both.
 */
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { TestProviders } from "@/test/harness";
import { SAVE_FAILED, TakeItWithYou, emailHref, textHref } from "./TakeItWithYou";
import { readLibrary } from "@/lib/library";

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

function renderBar() {
  return render(
    <TestProviders>
      <TakeItWithYou title="Someone I love has died" kind="Find Help" href="/help/grief" summary="For the days after a death." print />
    </TestProviders>,
  );
}

describe("TakeItWithYou", () => {
  it("on a computer, opens a panel with email, copy link, and a code to scan", async () => {
    renderBar();
    fireEvent.click(screen.getByRole("button", { name: /send to my phone/i }));
    const panel = await screen.findByRole("region", { name: /send it to your phone/i });
    const email = panel.querySelector('a[href^="mailto:"]');
    expect(email?.getAttribute("href")).toContain(encodeURIComponent("/help/grief"));
    expect(screen.getByRole("button", { name: /copy link/i })).toBeInTheDocument();
    expect(screen.getByText(/point your phone's camera/i)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("region", { name: /send it to your phone/i })).toBeNull();
  });

  it("leaves focus where the reader is typing when the page around the panel re-renders", async () => {
    function Journal() {
      const [text, setText] = useState("");
      return (
        <>
          <label>
            Worry <input value={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <TakeItWithYou title="The Worry Journal" kind="Tool" href="/tools/worry-journal" />
        </>
      );
    }
    render(<TestProviders><Journal /></TestProviders>);
    fireEvent.click(screen.getByRole("button", { name: /send to my phone/i }));
    await screen.findByRole("region", { name: /send it to your phone/i });
    const field = screen.getByRole("textbox", { name: "Worry" });
    field.focus();
    fireEvent.change(field, { target: { value: "the bill" } });
    expect(document.activeElement).toBe(field);
    // Escape typed in the journal is the journal's, not the panel's.
    fireEvent.keyDown(field, { key: "Escape" });
    expect(screen.getByRole("region", { name: /send it to your phone/i })).toBeInTheDocument();
  });

  it("saves to My Library and says where it went", () => {
    renderBar();
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("button", { name: "Saved" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "My Library" })).toHaveAttribute("href", "/my-library");
    expect(readLibrary()).toEqual([expect.objectContaining({ href: "/help/grief", kind: "Find Help", title: "Someone I love has died" })]);
  });

  it("shows the save-failure line when the browser refuses", () => {
    // Refuse only the library's write; the rest of the app keeps working.
    const real = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (this: Storage, key: string, value: string) {
      if (key === "livewell-library-v1") throw new Error("blocked");
      return real.call(this, key, value);
    });
    renderBar();
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByText(SAVE_FAILED)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("aria-pressed", "false");
  });

  it("on a phone, opens the share sheet with the page's address", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", { value: share, configurable: true });
    const mm = vi.spyOn(window, "matchMedia").mockImplementation((q: string) => ({ matches: q.includes("coarse"), media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() }) as unknown as MediaQueryList);
    renderBar();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send to my phone/i }));
    });
    expect(share).toHaveBeenCalledWith(expect.objectContaining({ title: "Someone I love has died", url: expect.stringContaining("/help/grief") }));
    expect(screen.queryByRole("region", { name: /send it to your phone/i })).toBeNull();
    mm.mockRestore();
    delete (navigator as unknown as Record<string, unknown>).share;
  });

  it("builds email and text links the reader sends themselves", () => {
    expect(emailHref("A title", "https://x.test/p", "One line.")).toBe(
      `mailto:?subject=${encodeURIComponent("A title")}&body=${encodeURIComponent("One line.\n\nhttps://x.test/p\n\nFrom LiveWell by James Bell")}`,
    );
    expect(textHref("A title", "https://x.test/p")).toBe(`sms:?&body=${encodeURIComponent("A title https://x.test/p")}`);
  });
});
