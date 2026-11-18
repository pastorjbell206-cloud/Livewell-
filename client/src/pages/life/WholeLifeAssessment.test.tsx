/**
 * The Whole-Life Assessment keeps its thirty answers: a reload part-way
 * through opens where the reader stopped, the results offer "Change my
 * answers" without counting the sitting twice, and a browser that refuses to
 * save says so in the shared words.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { TestProviders } from "@/test/harness";
import WholeLifeAssessment from "./WholeLifeAssessment";

const PROGRESS_KEY = "livewell-progress-whole-life";
const HISTORY_KEY = "lw-whole-life";
const RULE_KEY = "lw-whole-life-rule";

function renderPage() {
  const { hook } = memoryLocation({ path: "/life/assessment" });
  return render(
    <TestProviders>
      <Router hook={hook}>
        <WholeLifeAssessment />
      </Router>
    </TestProviders>,
  );
}

const progress = () => JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? "null");
const history = () => JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? "[]");
const rules = () => JSON.parse(window.localStorage.getItem(RULE_KEY) ?? "{}").rules ?? [];

/** Answer every statement on the domain screen that is showing. */
function answerScreen(label = "Often") {
  for (const radio of screen.getAllByRole("radio", { name: label })) fireEvent.click(radio);
}

function takeAll() {
  fireEvent.click(screen.getByRole("button", { name: "Begin the assessment" }));
  for (let i = 0; i < 4; i++) {
    answerScreen();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  }
  answerScreen();
  fireEvent.click(screen.getByRole("button", { name: "See the map" }));
}

describe("/life/assessment keeps its answers", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.scrollTo = vi.fn();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("opens where the reader stopped after a reload", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Begin the assessment" }));
    answerScreen();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getAllByRole("radio", { name: "Rarely" })[0]);
    expect(Object.keys(progress().answers)).toHaveLength(7);
    expect(progress().screen).toBe(1);

    cleanup();
    renderPage();
    expect(screen.getByText("Domain 2 of 5")).toBeTruthy();
    expect(screen.getByText("7 of 30 answered")).toBeTruthy();
    expect(screen.getByText(/Your answers so far were kept on this device/)).toBeTruthy();
    expect((screen.getAllByRole("radio", { name: "Rarely" })[0] as HTMLInputElement).checked).toBe(true);
  });

  it("starts over only when asked", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Begin the assessment" }));
    answerScreen();
    cleanup();
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Start over" }));
    expect(progress()).toBeNull();
    expect(screen.getByRole("button", { name: "Begin the assessment" })).toBeTruthy();
  });

  it("changes answers without counting the sitting as two check-ups", () => {
    renderPage();
    takeAll();
    expect(history()).toHaveLength(1);
    expect(rules()).toHaveLength(1);
    const first = history()[0];

    fireEvent.click(screen.getByRole("button", { name: "Change my answers" }));
    expect(screen.getByText("Domain 1 of 5")).toBeTruthy();
    expect(screen.getByText("30 of 30 answered")).toBeTruthy();
    answerScreen("Never");
    for (let i = 0; i < 4; i++) fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "See the map" }));

    expect(history()).toHaveLength(1);
    expect(rules()).toHaveLength(1);
    expect(history()[0].date).toBe(first.date);
    expect(history()[0].scores.inner).not.toBe(first.scores.inner);
  });

  it("does not reopen a finished check-up as one in progress", () => {
    renderPage();
    takeAll();
    cleanup();
    renderPage();
    expect(screen.getByRole("button", { name: "Begin the assessment" })).toBeTruthy();
  });

  it("says so when the browser will not save", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Begin the assessment" }));
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    fireEvent.click(screen.getAllByRole("radio", { name: "Often" })[0]);
    expect(screen.getByText(/Couldn't save to this browser/)).toBeTruthy();
  });
});
