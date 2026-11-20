/**
 * The tool shell's contract: the question card is real radios or checkboxes
 * with number keys; the saved place survives a remount, says so when the
 * browser refuses, and clears on Start over; the result actions change,
 * print, and ask before starting over.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useState } from "react";
import { TestProviders } from "@/test/harness";
import { QuestionCard, ProgressLine, ResultActions, useToolProgress, progressKey, SAVE_FAILED, ScoreChart } from "./index";

const OPTIONS = [
  { value: "a", label: "Never" },
  { value: "b", label: "Sometimes" },
  { value: "c", label: "Often" },
];

function Single({ start = null as string | null }) {
  const [v, setV] = useState<string | null>(start);
  return <QuestionCard question="How often?" options={OPTIONS} value={v} onChange={setV} />;
}

function Multi() {
  const [v, setV] = useState<string[]>([]);
  return <QuestionCard question="Which apply?" options={OPTIONS} value={v} onChange={setV} multiple />;
}

describe("QuestionCard", () => {
  it("is a group of real radio buttons named by its question", () => {
    render(<Single />);
    const group = screen.getByRole("group", { name: "How often?" });
    expect(group.tagName).toBe("FIELDSET");
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByRole("radio", { name: /Sometimes/ })).not.toBeChecked();
  });

  it("picks with a click, and with the number keys", () => {
    render(<Single />);
    fireEvent.click(screen.getByText("Often"));
    expect(screen.getByRole("radio", { name: /Often/ })).toBeChecked();
    fireEvent.keyDown(screen.getByRole("radio", { name: /Often/ }), { key: "1" });
    expect(screen.getByRole("radio", { name: /Never/ })).toBeChecked();
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: /Never/ }));
    // A number past the last answer does nothing.
    fireEvent.keyDown(screen.getByRole("radio", { name: /Never/ }), { key: "7" });
    expect(screen.getByRole("radio", { name: /Never/ })).toBeChecked();
  });

  it("is a group of checkboxes when several answers are allowed, and a number toggles", () => {
    render(<Multi />);
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    fireEvent.keyDown(screen.getByRole("checkbox", { name: /Sometimes/ }), { key: "2" });
    fireEvent.keyDown(screen.getByRole("checkbox", { name: /Sometimes/ }), { key: "3" });
    expect(screen.getByRole("checkbox", { name: /Sometimes/ })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /Often/ })).toBeChecked();
    fireEvent.keyDown(screen.getByRole("checkbox", { name: /Often/ }), { key: "3" });
    expect(screen.getByRole("checkbox", { name: /Often/ })).not.toBeChecked();
  });
});

interface Answers {
  step: number;
  answers: Record<string, string>;
}
const isAnswers = (x: unknown): x is Answers => !!x && typeof x === "object" && typeof (x as Answers).step === "number" && typeof (x as Answers).answers === "object";

function Tool() {
  const p = useToolProgress<Answers>("shell-test", isAnswers, { step: 1, answers: {} });
  return (
    <div>
      <ProgressLine step={p.value.step} total={3} section="Inner life" onBack={() => p.set((v) => ({ ...v, step: v.step - 1 }))} saveFailed={p.saveFailed} />
      <QuestionCard question={`Question ${p.value.step}`} options={OPTIONS} value={p.value.answers[p.value.step] ?? null} onChange={(a) => p.set((v) => ({ step: Math.min(3, v.step + 1), answers: { ...v.answers, [v.step]: a } }))} />
      <p data-testid="resumed">{String(p.resumed)}</p>
      <button type="button" onClick={p.clear}>
        clear
      </button>
    </div>
  );
}

describe("useToolProgress and ProgressLine", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it("keeps the place under livewell-progress-<tool>, and picks it up again", () => {
    const first = render(<Tool />);
    expect(screen.getByText(/Question 1 of 3/)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Often"));
    expect(screen.getByText(/Question 2 of 3/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(progressKey("shell-test"))!)).toEqual({ step: 2, answers: { 1: "c" } });
    first.unmount();
    render(<Tool />);
    expect(screen.getByText(/Question 2 of 3/)).toBeInTheDocument();
    expect(screen.getByTestId("resumed")).toHaveTextContent("true");
    fireEvent.click(screen.getByRole("button", { name: /Back/ }));
    expect(screen.getByText(/Question 1 of 3/)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Often/ })).toBeChecked();
    fireEvent.click(screen.getByText("clear"));
    expect(localStorage.getItem(progressKey("shell-test"))).toBeNull();
  });

  it("starts fresh on stored data of the wrong shape", () => {
    localStorage.setItem(progressKey("shell-test"), JSON.stringify({ nope: true }));
    render(<Tool />);
    expect(screen.getByText(/Question 1 of 3/)).toBeInTheDocument();
    expect(screen.getByTestId("resumed")).toHaveTextContent("false");
  });

  it("says so in the site's own sentence when the browser will not save", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    render(<Tool />);
    fireEvent.click(screen.getByText("Never"));
    expect(screen.getByText(SAVE_FAILED)).toBeInTheDocument();
  });
});

describe("ResultActions", () => {
  it("changes answers, prints, and asks before starting over", () => {
    const onChange = vi.fn();
    const onStartOver = vi.fn();
    const print = vi.fn();
    vi.stubGlobal("print", print);
    render(
      <TestProviders>
        <ResultActions title="A tool" onChange={onChange} onStartOver={onStartOver} save={false} />
      </TestProviders>,
    );
    fireEvent.click(screen.getByRole("button", { name: /Change my answers/ }));
    expect(onChange).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: /^Print$/ }));
    expect(print).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: /Start over/ }));
    expect(onStartOver).not.toHaveBeenCalled();
    expect(screen.getByText(/This clears your answers on this device/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Keep them" }));
    expect(onStartOver).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Start over/ }));
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Yes, start over" }));
    });
    expect(onStartOver).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /Send to my phone|Share|Copy link/ })).toBeInTheDocument();
    vi.unstubAllGlobals();
  });
});

describe("ScoreChart", () => {
  it("reads as words, with the one row to start marked", () => {
    render(
      <ScoreChart
        caption="Your five areas"
        max={5}
        rows={[
          { label: "Inner life", value: 2, start: true },
          { label: "Home", value: 4 },
        ]}
      />,
    );
    expect(screen.getByText("Your five areas")).toBeInTheDocument();
    expect(screen.getByText("2 of 5")).toBeInTheDocument();
    expect(screen.getByText("Start here")).toBeInTheDocument();
  });
});
