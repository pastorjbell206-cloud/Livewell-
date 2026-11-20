/**
 * Three self-checks on the tool shell (docs/work/elite/tools-plan.md,
 * section 15): the Whole-Life Assessment, the Emotional Health and the
 * Financial Health self-checks. Each must open on answers saved before the
 * move (the same keys, the same shapes), say so in the site's own sentence
 * when the browser refuses to save, and answer to the keyboard: Tab reaches
 * a statement's answers, the arrow keys move between them, Space picks, and
 * the number keys pick the answer with that number.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { TestProviders } from "@/test/harness";
import EmotionalHealth from "./EmotionalHealth";
import FinancialHealth from "./FinancialHealth";
import WholeLifeAssessment from "../life/WholeLifeAssessment";

function show(path: string, Page: () => JSX.Element) {
  const { hook } = memoryLocation({ path });
  return render(
    <TestProviders>
      <Router hook={hook}>
        <Page />
      </Router>
    </TestProviders>,
  );
}

const stored = (key: string) => JSON.parse(window.localStorage.getItem(key) ?? "null");

beforeEach(() => {
  window.localStorage.clear();
  window.scrollTo = vi.fn();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Emotional Health Self-Check on the shell", () => {
  const KEY = "livewell-progress-emotional-health";

  it("opens on answers saved before the move (the old shape: step 0, keyed by statement)", () => {
    // Exactly what the page wrote before it moved: all fifteen on one screen, step always 0.
    window.localStorage.setItem(KEY, JSON.stringify({ answers: { 0: 4, 1: 2, 2: 5 }, step: 0, savedAt: "2026-11-01T10:00:00.000Z" }));
    show("/tools/emotional-health", EmotionalHealth);
    expect(screen.getByText("Picked up where you left off.")).toBeInTheDocument();
    expect(screen.getByText("3 of 15 answered")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "4: Usually true", checked: true })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "2: Sometimes true", checked: true })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "5: Consistently true", checked: true })).toBeInTheDocument();
  });

  it("keeps each answer as it is given and resumes on the part the reader reached", () => {
    show("/tools/emotional-health", EmotionalHealth);
    for (const r of screen.getAllByRole("radio", { name: "3: Often true" })) fireEvent.click(r);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getAllByRole("radio", { name: "1: Rarely true" })[0]);
    expect(stored(KEY)).toMatchObject({ step: 1, answers: { 0: 3, 1: 3, 2: 3, 3: 1 } });
    cleanup();
    show("/tools/emotional-health", EmotionalHealth);
    expect(screen.getByText("Part 2 of 5")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Boundaries" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio", { name: "1: Rarely true" })[0]).toBeChecked();
  });

  it("reaches the result and changes answers without losing them", () => {
    show("/tools/emotional-health", EmotionalHealth);
    for (let part = 0; part < 5; part++) {
      for (const r of screen.getAllByRole("radio", { name: "5: Consistently true" })) fireEvent.click(r);
      fireEvent.click(screen.getByRole("button", { name: part < 4 ? "Continue" : "See my results" }));
    }
    expect(screen.getByText("75 out of 75")).toBeInTheDocument();
    expect(screen.getByText("Emotionally Grounded")).toBeInTheDocument();
    expect(screen.getByText("Start here")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Change my answers" }));
    expect(screen.getByText("15 of 15 answered")).toBeInTheDocument();
    expect(screen.getAllByRole("radio", { name: "5: Consistently true", checked: true })).toHaveLength(3);
    expect(stored(KEY).answers[14]).toBe(5);
  });

  it("says so in the site's own sentence when the browser will not save", () => {
    show("/tools/emotional-health", EmotionalHealth);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    fireEvent.click(screen.getAllByRole("radio", { name: "2: Sometimes true" })[0]);
    expect(screen.getByText(/Couldn't save to this browser/)).toBeInTheDocument();
  });

  it("answers to the keyboard: Tab, the arrow keys, Space and the number keys", async () => {
    const user = userEvent.setup();
    show("/tools/emotional-health", EmotionalHealth);
    const first = screen.getAllByRole("group")[0];
    // Tab from the part's heading reaches the first statement's answers.
    screen.getByRole("heading", { name: "Self-Awareness" }).focus();
    await user.tab();
    expect(within(first).getAllByRole("radio")).toContain(document.activeElement);
    // Space picks the focused answer; an arrow moves to the next and picks it.
    await user.keyboard(" ");
    expect(within(first).getByRole("radio", { name: "1: Rarely true" })).toBeChecked();
    await user.keyboard("{ArrowDown}");
    expect(within(first).getByRole("radio", { name: "2: Sometimes true" })).toBeChecked();
    // A number picks the answer with that number.
    await user.keyboard("4");
    expect(within(first).getByRole("radio", { name: "4: Usually true" })).toBeChecked();
    expect(stored(KEY).answers[0]).toBe(4);
  });
});

describe("Financial Health Self-Check on the shell", () => {
  const KEY = "livewell-progress-financial-health";

  it("opens on answers and the part saved before the move", () => {
    window.localStorage.setItem(KEY, JSON.stringify({ answers: { 1: 4, 2: 4, 3: 4, 4: 2 }, step: 1, savedAt: "2026-11-01T10:00:00.000Z" }));
    show("/tools/financial-health", FinancialHealth);
    expect(screen.getByText("Picked up where you left off.")).toBeInTheDocument();
    expect(screen.getByText("Part 2 of 4")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contentment" })).toBeInTheDocument();
    expect(screen.getByText("4 of 12 answered")).toBeInTheDocument();
    expect(screen.getAllByRole("radio", { name: "Disagree" })[0]).toBeChecked();
  });

  it("scores as before and names financial control when money cannot be talked about", () => {
    show("/tools/financial-health", FinancialHealth);
    for (let part = 0; part < 4; part++) {
      const radios = screen.getAllByRole("radio", { name: "Strongly Disagree" });
      for (const r of radios) fireEvent.click(r);
      fireEvent.click(screen.getByRole("button", { name: part < 3 ? "Next section" : "See my results" }));
    }
    expect(screen.getByText("12 / 60")).toBeInTheDocument();
    expect(screen.getByText("Carrying a Heavy Weight")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "If money is hard to talk about at home" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Talk to a person first" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Change my answers" }));
    expect(screen.getByText("12 of 12 answered")).toBeInTheDocument();
  });

  it("says so when the browser will not save, and the number keys pick", () => {
    show("/tools/financial-health", FinancialHealth);
    const first = screen.getAllByRole("group")[0];
    fireEvent.keyDown(within(first).getAllByRole("radio")[0], { key: "5" });
    expect(within(first).getByRole("radio", { name: "Strongly Agree" })).toBeChecked();
    expect(stored(KEY).answers[1]).toBe(5);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    fireEvent.keyDown(within(first).getAllByRole("radio")[0], { key: "2" });
    expect(screen.getByText(/Couldn't save to this browser/)).toBeInTheDocument();
  });
});

describe("Whole-Life Assessment on the shell", () => {
  const KEY = "livewell-progress-whole-life";

  it("opens on a check-up saved before the move", () => {
    window.localStorage.setItem(KEY, JSON.stringify({ answers: { in1: 4, in2: 3, bo1: 1 }, screen: 1, savedAt: "2026-11-01T10:00:00.000Z" }));
    show("/life/assessment", WholeLifeAssessment);
    expect(screen.getByText("Domain 2 of 5")).toBeInTheDocument();
    expect(screen.getByText("3 of 30 answered")).toBeInTheDocument();
    expect(screen.getAllByRole("radio", { name: "Never" })[0]).toBeChecked();
  });

  it("answers to the keyboard on a domain screen", async () => {
    const user = userEvent.setup();
    show("/life/assessment", WholeLifeAssessment);
    fireEvent.click(screen.getByRole("button", { name: "Begin the assessment" }));
    // Continue moved focus to the domain's heading; Tab reaches the first statement.
    expect(document.activeElement).toBe(screen.getByRole("heading", { name: "The Inner Life" }));
    await user.tab();
    const first = screen.getAllByRole("group")[0];
    expect(within(first).getAllByRole("radio")).toContain(document.activeElement);
    await user.keyboard(" ");
    expect(within(first).getByRole("radio", { name: "Never" })).toBeChecked();
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(within(first).getByRole("radio", { name: "Sometimes" })).toBeChecked();
    await user.keyboard("5");
    expect(within(first).getByRole("radio", { name: "Always" })).toBeChecked();
    expect(stored(KEY).answers.in1).toBe(5);
  });
});
