/**
 * Conversion contract for GatedDownload — the email gate on the pillar
 * reading-path lead magnets and the study-guide toolkits.
 *
 * The contract, from the component's own list-building discipline:
 *  - before interaction  → a labelled button, not the form and not the file link
 *  - click               → the email capture form appears
 *  - valid submit        → POST /api/subscribe {email, source}, then reveal the
 *                          download link and open the file
 *  - subscribe fails     → still unlock and open; the download is never blocked
 *                          on a failed capture (best-effort gate)
 *  - returning reader     → already-consented visitors see the download at once,
 *                          never the gate again
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GatedDownload from "./GatedDownload";

const HREF = "/downloads/reading-paths/skeptic.pdf";
const LABEL = "Get the reading path (PDF)";
const SOURCE = "reading-path-skeptic";

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(window, "open").mockReturnValue(null);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderGate() {
  return render(<GatedDownload href={HREF} label={LABEL} source={SOURCE} />);
}

describe("GatedDownload", () => {
  it("shows a labelled button first — not the form, not the file link", () => {
    renderGate();
    expect(screen.getByRole("button", { name: LABEL })).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("reveals the email capture form when the button is clicked", async () => {
    const user = userEvent.setup();
    renderGate();
    await user.click(screen.getByRole("button", { name: LABEL }));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get the download/i })).toBeInTheDocument();
  });

  it("posts the email and source to /api/subscribe, then reveals and opens the download", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));
    renderGate();

    await user.click(screen.getByRole("button", { name: LABEL }));
    await user.type(screen.getByRole("textbox"), "reader@example.com");
    await user.click(screen.getByRole("button", { name: /get the download/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/subscribe",
        expect.objectContaining({ method: "POST" }),
      );
    });
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body).toEqual({ email: "reader@example.com", source: SOURCE });

    // The download link is revealed, and the file is opened.
    const link = await screen.findByRole("link", { name: LABEL });
    expect(link).toHaveAttribute("href", HREF);
    expect(window.open).toHaveBeenCalledWith(HREF, "_blank", "noopener");
    expect(localStorage.getItem("lw-toolkit-unlocked")).toBe("1");
  });

  it("still unlocks and opens the download when the subscribe call fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));
    renderGate();

    await user.click(screen.getByRole("button", { name: LABEL }));
    await user.type(screen.getByRole("textbox"), "reader@example.com");
    await user.click(screen.getByRole("button", { name: /get the download/i }));

    // Best-effort: a failed capture never blocks the download.
    expect(await screen.findByRole("link", { name: LABEL })).toHaveAttribute("href", HREF);
    expect(window.open).toHaveBeenCalledWith(HREF, "_blank", "noopener");
  });

  it("does not submit an email with no @ (guards the capture)", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    renderGate();
    await userEvent.setup().click(screen.getByRole("button", { name: LABEL }));
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "notanemail" } });
    fireEvent.submit(input.closest("form")!);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows the download immediately for a returning, already-consented reader", () => {
    localStorage.setItem("lw-toolkit-unlocked", "1");
    renderGate();
    expect(screen.getByRole("link", { name: LABEL })).toHaveAttribute("href", HREF);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
