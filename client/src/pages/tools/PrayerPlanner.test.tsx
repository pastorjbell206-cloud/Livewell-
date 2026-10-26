/**
 * The Prayer Planner keeps its promises: a name added to a day shows on that
 * day, "prayed" lasts for the day it was marked, and an answered prayer moves
 * into the dated record with the reader's own note. All in this browser.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { TestProviders } from "@/test/harness";
import PrayerPlanner, { STORAGE_KEY, forDay, localDate, type PrayerItem } from "./PrayerPlanner";

function renderPlanner() {
  const { hook } = memoryLocation({ path: "/tools/prayer-planner" });
  return render(
    <TestProviders>
      <Router hook={hook}>
        <PrayerPlanner />
      </Router>
    </TestProviders>,
  );
}
const stored = () => JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
const item = (over: Partial<PrayerItem>): PrayerItem => ({ id: "x", name: "A", day: -1, prayedOn: null, answered: null, ...over });

describe("forDay", () => {
  it("gives the day's names and the every-day names, not the answered ones", () => {
    const items = [item({ id: "1", day: 2 }), item({ id: "2", day: -1 }), item({ id: "3", day: 4 }), item({ id: "4", day: 2, answered: { on: "2026-01-01", note: "" } })];
    expect(forDay(items, 2).map((i) => i.id)).toEqual(["1", "2"]);
  });
});

describe("PrayerPlanner", () => {
  beforeEach(() => window.localStorage.clear());

  it("adds an every-day name that shows on today's list, and marks it prayed for today", () => {
    renderPlanner();
    fireEvent.change(screen.getByLabelText("A person or a need"), { target: { value: "My sister" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(stored().items).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Mark prayed" }));
    expect(stored().items[0].prayedOn).toBe(localDate());
    expect(screen.getByRole("button", { name: "Prayed today" })).toHaveAttribute("aria-pressed", "true");
  });

  it("forgets yesterday's 'prayed' mark", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [item({ id: "1", name: "Dad", prayedOn: "2000-01-01" })] }));
    renderPlanner();
    expect(screen.getByRole("button", { name: "Mark prayed" })).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps an answered prayer in the record with the reader's note", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [item({ id: "1", name: "The job interview" })] }));
    renderPlanner();
    fireEvent.click(screen.getByRole("button", { name: "Answered" }));
    fireEvent.change(screen.getByLabelText(/How was it answered/), { target: { value: "A different job, a better one" } });
    fireEvent.click(screen.getByRole("button", { name: "Keep it in the record" }));
    expect(stored().items[0].answered).toEqual({ on: localDate(), note: "A different job, a better one" });
    expect(screen.getByText("A different job, a better one")).toBeInTheDocument();
  });
});
