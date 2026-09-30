/**
 * The Worry Journal keeps its promises: an evening is saved only to this
 * browser, an entry older than a few days asks how it turned out and keeps
 * the answer, and the look-back sentence reports only what the reader said.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { TestProviders } from "@/test/harness";
import WorryJournal, { STORAGE_KEY, LOOK_BACK_DAYS, lookBackSummary, type WorryEntry } from "./WorryJournal";

function renderJournal() {
  const { hook } = memoryLocation({ path: "/tools/worry-journal" });
  return render(
    <TestProviders>
      <Router hook={hook}>
        <WorryJournal />
      </Router>
    </TestProviders>,
  );
}

const stored = (): WorryEntry[] => JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");

describe("WorryJournal", () => {
  beforeEach(() => window.localStorage.clear());

  it("saves an evening to this browser and closes the day", () => {
    renderJournal();
    fireEvent.change(screen.getByLabelText("1. What are you worried about tonight?"), { target: { value: "The test results on Friday" } });
    fireEvent.change(screen.getByLabelText("2. What part of this is yours to do tomorrow?"), { target: { value: "Call the office at nine" } });
    fireEvent.click(screen.getByRole("button", { name: "Close the day" }));
    expect(stored()).toHaveLength(1);
    expect(stored()[0]).toMatchObject({ worry: "The test results on Friday", mine: "Call the office at nine", outcome: null });
    expect(screen.getByText(/The day is closed/)).toBeInTheDocument();
  });

  it("will not close the day without a worry", () => {
    renderJournal();
    expect(screen.getByRole("button", { name: "Close the day" })).toBeDisabled();
  });

  it("asks how an older worry turned out, and keeps the answer", () => {
    const old = new Date(Date.now() - (LOOK_BACK_DAYS + 1) * 864e5).toISOString();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([
      { id: "a", date: old, worry: "Losing the job", mine: "", notMine: "", prayer: "", outcome: null },
    ]));
    renderJournal();
    fireEvent.click(screen.getByRole("button", { name: "It didn't happen" }));
    expect(stored()[0].outcome).toBe("didnt");
    expect(screen.getByText(/You have looked back on 1 worry\. It did not happen\./)).toBeInTheDocument();
  });

  it("says only what the reader answered", () => {
    expect(lookBackSummary(2, 1)).toBe("You have looked back on 3 worries. 2 did not happen, and you got through the one that did.");
    expect(lookBackSummary(0, 2)).toBe("You have looked back on 2 worries. All 2 happened, and you got through every one.");
    expect(lookBackSummary(3, 0)).toBe("You have looked back on 3 worries. None of the 3 happened.");
  });
});
