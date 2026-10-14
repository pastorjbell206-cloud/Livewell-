/**
 * SelfCheckHistory keeps the promise on every results screen: a finished run
 * is saved in this browser once (never twice for the same answers), and the
 * next run shows what moved since the last.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SelfCheckHistory, loadRuns } from "./SelfCheckHistory";

describe("SelfCheckHistory", () => {
  beforeEach(() => localStorage.clear());

  it("records a finished run once, even across re-renders", () => {
    const { rerender } = render(<SelfCheckHistory id="t" total={0.5} areas={{ Rest: 0.4 }} answersKey="a" />);
    rerender(<SelfCheckHistory id="t" total={0.5} areas={{ Rest: 0.4 }} answersKey="a" />);
    expect(loadRuns("t")).toHaveLength(1);
    expect(screen.getByText(/first time here/i)).toBeInTheDocument();
  });

  it("shows the change since the last run", () => {
    render(<SelfCheckHistory id="t" total={0.5} areas={{ Rest: 0.4 }} answersKey="a" />).unmount();
    render(<SelfCheckHistory id="t" total={0.7} areas={{ Rest: 0.3 }} answersKey="b" />);
    expect(loadRuns("t")).toHaveLength(2);
    expect(screen.getByText(/Overall you are at 70%, up 20 points/)).toBeInTheDocument();
    expect(screen.getByText(/Rest: 30%, down 10 points/)).toBeInTheDocument();
  });
});
