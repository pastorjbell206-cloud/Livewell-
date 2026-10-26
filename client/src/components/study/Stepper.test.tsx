/**
 * Stepper contract: one step at a time inside a named group, Back and Next as
 * real buttons (so Enter and Space work), the position said plainly, focus on
 * the new step's heading after a move (never on first render), the finishing
 * action on the last step, and a page that owns the step (its URL) in charge.
 */
import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Stepper, type StepperStep } from "./Stepper";

const STEPS: StepperStep[] = [
  { id: "read", title: "Read", content: <p>Read Psalm 23 aloud.</p> },
  { id: "ask", title: "Ask", content: <p>Who is the shepherd?</p> },
  { id: "pray", title: "Pray", content: <p>Pray together.</p> },
];

describe("Stepper", () => {
  it("shows only the current step, in a named group, with its position", () => {
    render(<Stepper steps={STEPS} label="Tonight's devotion" />);
    expect(screen.getByRole("group", { name: "Tonight's devotion" })).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 2, name: "Read" });
    expect(screen.queryByRole("heading", { name: "Ask" })).toBeNull();
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
    expect(heading).toHaveAccessibleDescription("1 of 3");
    // The first render leaves focus where the page put it.
    expect(heading).not.toHaveFocus();
    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
  });

  it("moves with Next and Back and puts focus on the new step's heading", async () => {
    const user = userEvent.setup();
    render(<Stepper steps={STEPS} label="Tonight's devotion" />);
    await user.click(screen.getByRole("button", { name: "Next" }));
    const ask = screen.getByRole("heading", { level: 2, name: "Ask" });
    expect(ask).toHaveFocus();
    expect(ask).toHaveAttribute("tabindex", "-1");
    expect(screen.getByText("Who is the shepherd?")).toBeInTheDocument();
    expect(screen.queryByText("Read Psalm 23 aloud.")).toBeNull();
    expect(screen.getByText("2 of 3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("heading", { level: 2, name: "Read" })).toHaveFocus();
  });

  it("works from the keyboard alone", async () => {
    const user = userEvent.setup();
    render(<Stepper steps={STEPS} label="Tonight's devotion" />);
    // Back is disabled on the first step, so Tab reaches Next first.
    await user.tab();
    expect(screen.getByRole("button", { name: "Next" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("heading", { name: "Ask" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Back" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Next" })).toHaveFocus();
    await user.keyboard(" ");
    expect(screen.getByRole("heading", { name: "Pray" })).toHaveFocus();
  });

  it("offers the finishing action on the last step", async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();
    render(<Stepper steps={STEPS} label="Tonight's devotion" defaultStep={2} onFinish={onFinish} finishLabel="We did this tonight" />);
    expect(screen.queryByRole("button", { name: "Next" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "We did this tonight" }));
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("disables Next on the last step when there is nothing to finish", () => {
    render(<Stepper steps={STEPS} label="Tonight's devotion" defaultStep={2} />);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(screen.getByText("3 of 3")).toBeInTheDocument();
  });

  it("lets the page own the step", async () => {
    const user = userEvent.setup();
    const seen: number[] = [];
    function Owned() {
      const [step, setStep] = useState(1);
      return (
        <Stepper
          steps={STEPS}
          label="Tonight's devotion"
          step={step}
          onStepChange={(i) => {
            seen.push(i);
            setStep(i);
          }}
        />
      );
    }
    render(<Owned />);
    expect(screen.getByRole("heading", { name: "Ask" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("heading", { name: "Pray" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(seen).toEqual([2, 1]);
  });

  it("clamps an out-of-range step instead of rendering nothing", () => {
    render(<Stepper steps={STEPS} label="Tonight's devotion" step={9} />);
    expect(screen.getByRole("heading", { name: "Pray" })).toBeInTheDocument();
  });
});
