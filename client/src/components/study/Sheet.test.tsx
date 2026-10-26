/**
 * Sheet contract: a named modal dialog that traps focus while open, closes on
 * Escape and on Close, hides the page behind it from assistive technology,
 * and hands focus back to whatever opened it, whether the sheet has its own
 * trigger or the page controls it.
 */
import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sheet } from "./Sheet";

function Controlled({ description = true }: { description?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        John 3:16
      </button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        title="John 3:16"
        description={description ? "Berean Standard Bible" : undefined}
        footer={<a href="/study/bible/john/3">Open in the Study Bible</a>}
      >
        <p>For God so loved the world.</p>
        <button type="button">Copy</button>
      </Sheet>
    </>
  );
}

describe("Sheet", () => {
  it("renders nothing until opened", () => {
    render(<Controlled />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens as a modal dialog named by its title and described by its line", async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "John 3:16" }));
    const dialog = await screen.findByRole("dialog", { name: "John 3:16" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("Berean Standard Bible");
    expect(screen.getByRole("heading", { level: 2, name: "John 3:16" })).toBeInTheDocument();
    // The panel itself takes focus, so reading starts at the title.
    expect(dialog).toHaveFocus();
    // The page behind is hidden from assistive technology while it is open.
    expect(screen.queryByRole("button", { name: "John 3:16" })).toBeNull();
  });

  it("has no description reference when no line is given", async () => {
    const user = userEvent.setup();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    render(<Controlled description={false} />);
    await user.click(screen.getByRole("button", { name: "John 3:16" }));
    const dialog = await screen.findByRole("dialog", { name: "John 3:16" });
    expect(dialog).not.toHaveAttribute("aria-describedby");
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("keeps Tab inside the sheet, wrapping both ways", async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "John 3:16" }));
    await screen.findByRole("dialog");
    const close = screen.getByRole("button", { name: "Close" });
    const copy = screen.getByRole("button", { name: "Copy" });
    const open = screen.getByRole("link", { name: "Open in the Study Bible" });
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab();
    expect(copy).toHaveFocus();
    await user.tab();
    expect(open).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(open).toHaveFocus();
  });

  it("closes on Escape and returns focus to the control that opened it", async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    const opener = screen.getByRole("button", { name: "John 3:16" });
    await user.click(opener);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("closes from the keyboard on its Close button", async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    const opener = screen.getByRole("button", { name: "John 3:16" });
    await user.click(opener);
    await screen.findByRole("dialog");
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("opens from its own trigger and gives focus back to it", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Sheet trigger={<button type="button">Nicaea, 325</button>} title="The Council of Nicaea" onOpenChange={onOpenChange} closeLabel="Done">
        <p>The first council.</p>
      </Sheet>,
    );
    const trigger = screen.getByRole("button", { name: "Nicaea, 325" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("dialog", { name: "The Council of Nicaea" })).toBeInTheDocument();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await user.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
