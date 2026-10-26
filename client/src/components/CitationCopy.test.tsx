/**
 * "Cite this": copies go through lib/clipboard, so "Copied" appears only when
 * the copy happened, and a failed copy shows the citation to select by hand.
 * The menu shares AudienceShare's behavior (Escape, tap outside, 44px rows).
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { CitationCopy, buildCitation } from "./CitationCopy";

const TITLE = "When the Church Married Empire";
const URL_ = "https://www.livewellbyjamesbell.co/writing/when-the-church-married-empire";
const DATE = "2026-06-09T12:00:00.000Z";

function setClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
}

const execCommand = document.execCommand;
afterEach(() => {
  delete (navigator as { clipboard?: unknown }).clipboard;
  document.execCommand = execCommand;
  vi.restoreAllMocks();
});

describe("buildCitation", () => {
  it("credits the essay's own author", () => {
    expect(buildCitation("sermon", TITLE, URL_, DATE)).toBe(`James Bell, "${TITLE}," LiveWell by James Bell, 2026. ${URL_}`);
    expect(buildCitation("apa", "A Title", URL_, DATE, "Susanna Bell")).toMatch(/^Bell, Susanna\. \(2026\)/);
  });
});

describe("CitationCopy", () => {
  it("copies a citation and says Copied only once the copy happened", async () => {
    const writeText = vi.fn(() => Promise.resolve());
    setClipboard(writeText);
    render(<CitationCopy title={TITLE} url={URL_} publishedDate={DATE} />);

    const trigger = screen.getByRole("button", { name: "Cite this" });
    expect(trigger.style.minHeight).toBe("44px");
    fireEvent.click(trigger);
    const sermon = screen.getByRole("button", { name: /Sermon attribution/ });
    expect(sermon.style.minHeight).toBe("44px");

    fireEvent.click(sermon);
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Citation copied"));
    expect(writeText).toHaveBeenCalledWith(buildCitation("sermon", TITLE, URL_, DATE));
    expect(screen.getByRole("button", { name: /Sermon attribution/ })).toHaveTextContent("Copied");
  });

  it("never claims a copy that failed, and shows the citation to select instead", async () => {
    setClipboard(() => Promise.reject(new Error("denied")));
    // The fallback copy path fails too.
    document.execCommand = vi.fn(() => false);
    render(<CitationCopy title={TITLE} url={URL_} publishedDate={DATE} />);

    fireEvent.click(screen.getByRole("button", { name: "Cite this" }));
    fireEvent.click(screen.getByRole("button", { name: /Chicago/ }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Couldn't copy the citation"));
    expect(screen.queryByText("Copied")).not.toBeInTheDocument();
    expect(screen.getByText(/Select the citation and copy it/)).toBeInTheDocument();
    expect(screen.getByText(buildCitation("chicago", TITLE, URL_, DATE))).toBeInTheDocument();
  });

  it("closes on Escape and on a tap outside", () => {
    render(
      <>
        <p>Elsewhere</p>
        <CitationCopy title={TITLE} url={URL_} publishedDate={DATE} />
      </>
    );
    const trigger = screen.getByRole("button", { name: "Cite this" });

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("button", { name: /APA/ })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    fireEvent.click(trigger);
    fireEvent.pointerDown(screen.getByText("Elsewhere"));
    expect(screen.queryByRole("button", { name: /APA/ })).not.toBeInTheDocument();
  });
});
