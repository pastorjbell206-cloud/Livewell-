/**
 * Safety contract for SafetyCheck, the question every heavy self-check asks.
 * A risk answer must bring the help block up at once; the answer must never
 * be written to the browser's storage; and "no" still leaves a way to help.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestProviders } from "@/test/harness";
import { SafetyCheck } from "./SafetyCheck";

const hrefs = (c: HTMLElement) => Array.from(c.querySelectorAll("a")).map((a) => a.getAttribute("href"));

describe("SafetyCheck", () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });

  it("shows the Lifeline at once for thoughts of self-harm", () => {
    const { container } = render(<TestProviders><SafetyCheck /></TestProviders>);
    fireEvent.click(screen.getByRole("button", { name: /not wanting to be alive/i }));
    expect(screen.getByText("988 Suicide & Crisis Lifeline")).toBeInTheDocument();
    expect(hrefs(container)).toContain("tel:988");
  });

  it("shows the Domestic Violence Hotline for fear of someone at home", () => {
    const { container } = render(<TestProviders><SafetyCheck /></TestProviders>);
    fireEvent.click(screen.getByRole("button", { name: /afraid of someone I live with/i }));
    expect(screen.getByText("National Domestic Violence Hotline")).toBeInTheDocument();
    expect(hrefs(container)).toContain("tel:18007997233");
  });

  it("can leave out the home question, and keeps a way to help after a no", () => {
    render(<TestProviders><SafetyCheck askAboutHome={false} /></TestProviders>);
    expect(screen.queryByRole("button", { name: /afraid of someone/i })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /^No$/ }));
    expect(screen.getByRole("link", { name: /Find help/i })).toBeInTheDocument();
  });

  it("never stores the answer", () => {
    render(<TestProviders><SafetyCheck /></TestProviders>);
    const keys = () => [...Object.keys(localStorage), ...Object.keys(sessionStorage)].sort();
    const before = keys(); // the providers may keep their own settings
    const snapshot = JSON.stringify({ ...localStorage, ...sessionStorage });
    fireEvent.click(screen.getByRole("button", { name: /not wanting to be alive/i }));
    fireEvent.click(screen.getByRole("button", { name: /afraid of someone I live with/i }));
    expect(keys()).toEqual(before);
    expect(JSON.stringify({ ...localStorage, ...sessionStorage })).toBe(snapshot);
  });
});
