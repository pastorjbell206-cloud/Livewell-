/**
 * The Connection Planner keeps its promises: a name and a step are saved only
 * to this browser, a checked step changes the reading, an empty week is read
 * back without blame, a new week keeps the names and clears the checks (and
 * waits a full week), the help lines a reader may need are on the page, and a
 * browser that refuses to save says so in the shared words.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { TestProviders } from "@/test/harness";
import crisis from "@/data/crisis-resources.json";
import ConnectionPlanner, {
  STORAGE_KEY,
  MAX_PEOPLE,
  localDate,
  weekReading,
  emptyStreak,
  pastWeekLine,
  type PlannerState,
  type Person,
} from "./ConnectionPlanner";

function renderPlanner() {
  const { hook } = memoryLocation({ path: "/tools/connection-planner" });
  return render(
    <TestProviders>
      <Router hook={hook}>
        <ConnectionPlanner />
      </Router>
    </TestProviders>,
  );
}

const stored = (): PlannerState => JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
const person = (over: Partial<Person>): Person => ({ id: "x", name: "A", step: "text", day: -1, done: false, ...over });
const lastWeek = localDate(new Date(Date.now() - 8 * 864e5));
const seed = (over: Partial<PlannerState>) =>
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ people: [], place: "", placeDone: false, weekOf: lastWeek, history: [], ...over }));
const howItWent = () => within(screen.getByRole("region", { name: "How this week went" }));

describe("weekReading", () => {
  it("reads an empty week without blame", () => {
    const [first] = weekReading({ planned: 3, reached: 0, place: "", placeDone: false });
    expect(first).toMatch(/^None of this week's steps have happened yet, and that isn't a verdict on you\./);
    expect(first).not.toMatch(/fault|should have|failed/i);
  });

  it("says how many were reached, in words", () => {
    expect(weekReading({ planned: 4, reached: 2, place: "", placeDone: false })[0]).toMatch(/^You reached two of the four people on your list this week\./);
    expect(weekReading({ planned: 1, reached: 1, place: "", placeDone: false })[0]).toMatch(/^You reached the one person on your list this week\./);
    expect(weekReading({ planned: 2, reached: 2, place: "", placeDone: false })[0]).toMatch(/^You reached both people on your list this week\./);
    expect(weekReading({ planned: MAX_PEOPLE, reached: MAX_PEOPLE, place: "", placeDone: false })[0]).not.toMatch(/add one more name/);
  });

  it("meets a reader with no names to enter without blame", () => {
    expect(weekReading({ planned: 0, reached: 0, place: "", placeDone: false })[0]).toMatch(/If no one comes to mind yet, that says nothing final about you\. Begin with the weekly place/);
  });

  it("reads the weekly place", () => {
    expect(weekReading({ planned: 1, reached: 1, place: "", placeDone: false })[1]).toMatch(/haven't named a place to belong/);
    expect(weekReading({ planned: 1, reached: 1, place: "choir", placeDone: true })[1]).toBe("You were at your weekly place (choir) this week. Go back next week and learn one more name there.");
  });

  it("after a run of empty weeks, points to a person and to 988", () => {
    const reading = weekReading({ planned: 2, reached: 0, place: "", placeDone: false }, 2);
    expect(reading[reading.length - 1]).toMatch(/^The two weeks before this one went by without a step\. When.*988/);
    expect(weekReading({ planned: 2, reached: 0, place: "", placeDone: false }, 7).join(" ")).toMatch(/The seven weeks before this one/);
    expect(weekReading({ planned: 2, reached: 1, place: "", placeDone: false }, 2).join(" ")).not.toMatch(/988/);
  });

  it("counts only the unbroken run of empty weeks", () => {
    const empty = { weekOf: "2026-10-01", planned: 2, reached: 0, place: "", placeDone: false };
    expect(emptyStreak([empty, empty, { ...empty, reached: 1 }, empty])).toBe(2);
    expect(emptyStreak([{ ...empty, placeDone: true, place: "choir" }, empty])).toBe(0);
    expect(pastWeekLine({ ...empty, reached: 1, placeDone: true, place: "choir" })).toBe("reached one of two; went to choir");
    expect(pastWeekLine({ ...empty, reached: 2 })).toBe("reached both");
  });
});

describe("ConnectionPlanner", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it("says on its first screen what it does, how long it takes, and that nothing leaves the device", () => {
    renderPlanner();
    expect(screen.getByRole("heading", { level: 1, name: "The Connection Planner" })).toBeInTheDocument();
    expect(screen.getByText(/about five minutes a week/)).toBeInTheDocument();
    expect(screen.getByText(/stays in this browser and is never sent anywhere/)).toBeInTheDocument();
    expect(screen.getByText(/thoughts of not wanting to be alive, don't wait/)).toBeInTheDocument();
  });

  it("puts 988 and 911 a tap away on its first screen", () => {
    renderPlanner();
    const hero = screen.getByRole("heading", { level: 1, name: "The Connection Planner" }).closest("section")!;
    expect(within(hero).getByRole("link", { name: "988" })).toHaveAttribute("href", "tel:988");
    expect(within(hero).getByRole("link", { name: "911" })).toHaveAttribute("href", "tel:911");
  });

  it("carries the Domestic Violence Hotline at its foot, warns about a phone someone checks, and offers a quick exit", () => {
    const hotline = crisis.resources.find((r) => r.id === "dv-hotline")!;
    const call = hotline.actions.find((x) => x.kind === "call")!;
    renderPlanner();
    const help = screen.getByRole("note", { name: "Where to find help now" });
    expect(help).toHaveAttribute("id", "help-now");
    expect(within(help).getAllByRole("link").map((l) => l.getAttribute("href"))).toContain(call.href);
    expect(screen.getByRole("link", { name: "help lines at the foot of this page" })).toHaveAttribute("href", "#help-now");
    expect(screen.getByText(/don't keep this planner on a phone they check, because the names you add stay in this browser until you choose Clear everything\./)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Exit site/ })).toBeInTheDocument();
  });

  it("adds a person with a step, saved only to this browser", () => {
    renderPlanner();
    fireEvent.change(screen.getByLabelText("First name or initials"), { target: { value: "Sam" } });
    fireEvent.change(screen.getByLabelText("One small step this week"), { target: { value: "call" } });
    fireEvent.change(screen.getByLabelText("A day, if you like"), { target: { value: "2" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(stored().people).toHaveLength(1);
    expect(stored().people[0]).toMatchObject({ name: "Sam", step: "call", day: 2, done: false });
    expect(within(screen.getByRole("region", { name: "This week" })).getByText("Sam")).toBeInTheDocument();
    expect(screen.getByText("Added Sam.")).toHaveAttribute("role", "status");
    expect(screen.getByLabelText("First name or initials")).toHaveFocus();
  });

  it("removes a name, says so, and puts focus back on the name field", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    seed({ people: [person({ id: "1", name: "Sam" }), person({ id: "2", name: "JR" })] });
    renderPlanner();
    fireEvent.click(screen.getByRole("button", { name: "Remove Sam" }));
    expect(stored().people.map((p) => p.name)).toEqual(["JR"]);
    expect(screen.getByText("Removed Sam.")).toHaveAttribute("role", "status");
    expect(screen.getByLabelText("First name or initials")).toHaveFocus();
  });

  it("opens the step editor below its own button", () => {
    seed({ people: [person({ id: "1", name: "Sam" })] });
    renderPlanner();
    const button = screen.getByRole("button", { name: "Change the step" });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    const editor = document.getElementById(button.getAttribute("aria-controls") ?? "");
    expect(editor).not.toBeNull();
    expect(within(editor!).getByLabelText("Step this week")).toBeInTheDocument();
    expect(button.compareDocumentPosition(editor!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("checks a step done, and the reading follows", () => {
    seed({ people: [person({ id: "1", name: "Sam" }), person({ id: "2", name: "JR", step: "meal" })] });
    renderPlanner();
    fireEvent.click(screen.getByRole("checkbox", { name: "Sam: done this week" }));
    expect(stored().people.find((p) => p.id === "1")?.done).toBe(true);
    expect(howItWent().getByText(/^You reached one of the two people on your list this week\./)).toBeInTheDocument();
  });

  it("reads an empty week without shame", () => {
    seed({ people: [person({ id: "1", name: "Sam" }), person({ id: "2", name: "JR" })] });
    renderPlanner();
    expect(howItWent().getByText(/isn't a verdict on you/)).toBeInTheDocument();
  });

  it("starts a new week: keeps the names, clears the checks, keeps the old week in the history", () => {
    seed({ people: [person({ id: "1", name: "Sam", done: true }), person({ id: "2", name: "JR" })], place: "choir", placeDone: true });
    renderPlanner();
    fireEvent.click(screen.getByRole("button", { name: "Start a new week" }));
    const s = stored();
    expect(s.people.map((p) => [p.name, p.done])).toEqual([["Sam", false], ["JR", false]]);
    expect(s.placeDone).toBe(false);
    expect(s.weekOf).toBe(localDate());
    expect(s.history).toEqual([{ weekOf: lastWeek, planned: 2, reached: 1, place: "choir", placeDone: true }]);
    expect(howItWent().getByText(/reached one of two; went to choir/)).toBeInTheDocument();
    expect(screen.getByText("A new week has started.")).toHaveAttribute("role", "status");
    expect(screen.getByRole("button", { name: "Start a new week" })).toBeDisabled();
  });

  it("keeps a week started yesterday open, so two quick closes can't make a false run of empty weeks", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    seed({ people: [person({ id: "1", name: "Sam" })], weekOf: localDate(yesterday) });
    renderPlanner();
    expect(screen.getByRole("button", { name: "Start a new week" })).toBeDisabled();
    expect(howItWent().getByText(/^You can close this week from .+, a week after it began:/)).toBeInTheDocument();
  });

  it("clears everything from this browser when asked", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    seed({ people: [person({ id: "1", name: "Sam" })], place: "choir", history: [{ weekOf: "2026-10-01", planned: 1, reached: 1, place: "", placeDone: false }] });
    renderPlanner();
    fireEvent.click(screen.getByRole("button", { name: "Clear everything" }));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(screen.getByText(/No one on your list yet/)).toBeInTheDocument();
    expect(screen.getByLabelText("First name or initials")).toHaveFocus();
  });

  it("stops at five names", () => {
    seed({ people: Array.from({ length: MAX_PEOPLE }, (_, i) => person({ id: String(i), name: `P${i}` })) });
    renderPlanner();
    expect(screen.queryByRole("button", { name: "Add" })).toBeNull();
    expect(screen.getByText(/Five is plenty for one week/)).toBeInTheDocument();
  });

  it("ignores stored data of the wrong shape", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ people: [{ name: 3 }] }));
    renderPlanner();
    expect(screen.getByText(/No one on your list yet/)).toBeInTheDocument();
  });

  it("says so when this browser will not save", () => {
    // Refuse only this tool's key; the theme provider saves its own.
    const setItem = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (this: Storage, key: string, value: string) {
      if (key === STORAGE_KEY) throw new Error("QuotaExceededError");
      return setItem.call(this, key, value);
    });
    renderPlanner();
    fireEvent.change(screen.getByLabelText("First name or initials"), { target: { value: "Sam" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText("Couldn't save to this browser — your work here will not survive a reload.")).toBeInTheDocument();
  });
});
