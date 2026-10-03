/**
 * Couple mode keeps its promises: the code carries scores only and survives a
 * round trip, nothing is shown before the safety gate is passed, and the
 * conversation opens only where the two see the marriage differently or are
 * both struggling.
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { CoupleCompare, encodeCode, decodeCode, needsTalk } from "./CoupleCompare";

const AREAS = [
  { name: "Communication", score: 9 },
  { name: "Intimacy & Connection", score: 12 },
  { name: "Trust & Security", score: 14 },
  { name: "Shared Vision", score: 10 },
  { name: "Conflict Resolution", score: 6 },
];

function renderIt() {
  const { hook } = memoryLocation({ path: "/tools/marriage-assessment" });
  return render(
    <Router hook={hook}>
      <CoupleCompare areas={AREAS} />
    </Router>,
  );
}

describe("couple codes", () => {
  it("round-trips five scores and nothing else", () => {
    const code = encodeCode(AREAS);
    expect(code).toBe("M1-9CEA6");
    expect(decodeCode(code, 5)).toEqual([9, 12, 14, 10, 6]);
    expect(decodeCode(" m1-9cea6 ", 5)).toEqual([9, 12, 14, 10, 6]);
  });

  it("refuses codes that are not ours", () => {
    expect(decodeCode("M1-9CE", 5)).toBeNull();
    expect(decodeCode("M1-12345", 5)).toBeNull(); // 1 and 2 are below the lowest possible score
    expect(decodeCode("hello", 5)).toBeNull();
  });

  it("talks where the gap is three or more, or both are low", () => {
    expect(needsTalk(9, 12)).toBe(true);
    expect(needsTalk(7, 8)).toBe(true);
    expect(needsTalk(12, 13)).toBe(false);
  });
});

describe("CoupleCompare", () => {
  it("shows no code until both partners' safety is affirmed", () => {
    renderIt();
    fireEvent.click(screen.getByRole("button", { name: "Set up couple mode" }));
    expect(screen.queryByText(/M1-9CEA6/)).toBeNull();
    expect(screen.getByRole("link", { name: /Find Help for a marriage in trouble/ })).toHaveAttribute("href", "/help/marriage");
    const go = screen.getByRole("button", { name: "Continue" });
    expect(go).toBeDisabled();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(go);
    expect(screen.getByText("M1-9CEA6")).toBeInTheDocument();
  });

  it("compares and opens the conversation only where it is needed", () => {
    renderIt();
    fireEvent.click(screen.getByRole("button", { name: "Set up couple mode" }));
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    // Spouse: Communication 13 (gap 4), Intimacy 12, Trust 13, Vision 11, Conflict 7 (both low).
    fireEvent.change(screen.getByLabelText("Your spouse's code"), { target: { value: "M1-DCDB7" } });
    fireEvent.click(screen.getByRole("button", { name: "Compare" }));
    expect(screen.getByText(/Communication: you see this differently/)).toBeInTheDocument();
    expect(screen.getByText(/Conflict Resolution: you are both finding this hard/)).toBeInTheDocument();
    expect(screen.queryByText(/Trust & Security: /)).toBeNull();
  });

  it("says plainly when a code is wrong", () => {
    renderIt();
    fireEvent.click(screen.getByRole("button", { name: "Set up couple mode" }));
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Your spouse's code"), { target: { value: "nonsense" } });
    fireEvent.click(screen.getByRole("button", { name: "Compare" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/starts with M1-/);
  });
});
