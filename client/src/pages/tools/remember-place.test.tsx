/**
 * TOOLS-PLAN unit 11: the four tools that forgot their place on a reload now
 * remember it. Each is opened, moved part-way, closed (unmounted, as a reload
 * does), and opened again: the reader is where they were. Where there are
 * answers, "Change my answers" keeps them, and "Start over" clears.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fireEvent, screen } from "@testing-library/react";

import { offlineFetch, renderWithProviders } from "@/test/harness";
import ConflictGuide from "./ConflictGuide";
import WhichLens from "./WhichLens";
import ParentTeenConversation from "./ParentTeenConversation";
import TheologyDiagnostic from "@/pages/TheologyDiagnostic";

const ROOT = path.resolve(__dirname, "../../../..");
const DIAGNOSTICS = fs.readFileSync(path.join(ROOT, "client/public/theology/theology-diagnostics.json"), "utf8");

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState({}, "", "/");
});

describe("a reload keeps the reader's place", () => {
  it("Work Through a Fight in Five Steps: the kind of fight and the step", () => {
    vi.stubGlobal("fetch", offlineFetch());
    const first = renderWithProviders(<ConflictGuide />);
    fireEvent.click(screen.getByRole("button", { name: /Communication Breakdown/ }));
    fireEvent.click(screen.getByRole("button", { name: /Next Step/ }));
    expect(screen.getByText(/STEP 2 OF/)).toBeInTheDocument();
    first.unmount();
    renderWithProviders(<ConflictGuide />);
    expect(screen.getByText(/STEP 2 OF/)).toBeInTheDocument();
    // Changing the topic forgets the place.
    fireEvent.click(screen.getByRole("button", { name: /Change topic/ }));
    expect(localStorage.getItem("livewell-progress-conflict-guide")).toBeNull();
  });

  it("Which lens: the answers so far, kept on the device", () => {
    vi.stubGlobal("fetch", offlineFetch());
    const first = renderWithProviders(<WhichLens />);
    fireEvent.click(screen.getByRole("button", { name: "That it will lose its country." }));
    expect(screen.getByText("2 of 13")).toBeInTheDocument();
    first.unmount();
    sessionStorage.clear(); // a closed tab, not only a reload
    renderWithProviders(<WhichLens />);
    expect(screen.getByText("2 of 13")).toBeInTheDocument();
  });

  it("The Parent and Teen Conversation: the side and the answers, for this tab", () => {
    vi.stubGlobal("fetch", offlineFetch());
    const first = renderWithProviders(<ParentTeenConversation />);
    fireEvent.click(screen.getByRole("button", { name: "I'm the parent" }));
    fireEvent.click(screen.getAllByRole("radio", { name: "Mostly true" })[0]);
    first.unmount();
    renderWithProviders(<ParentTeenConversation />);
    expect(screen.getByText(/Answering as the parent/)).toBeInTheDocument();
    expect((screen.getAllByRole("radio", { name: "Mostly true" })[0] as HTMLInputElement).checked).toBe(true);
    // Kept for the tab only: nothing in the device's long-term storage.
    expect(localStorage.getItem("livewell-progress-parent-teen")).toBeNull();
  });

  it("Which view do I lean toward?: the quiz and its answers", async () => {
    vi.stubGlobal("fetch", async () => new Response(DIAGNOSTICS, { status: 200, headers: { "Content-Type": "application/json" } }));
    const first = renderWithProviders(<TheologyDiagnostic />);
    fireEvent.click(await screen.findByRole("button", { name: /How Does God Save\?/ }));
    fireEvent.click(screen.getByRole("button", { name: /God first changed the heart/ }));
    expect(screen.getByText(/1 of 8 answered/)).toBeInTheDocument();
    first.unmount();
    renderWithProviders(<TheologyDiagnostic />);
    expect(await screen.findByText(/1 of 8 answered/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /God first changed the heart/ }).getAttribute("aria-pressed")).toBe("true");
  });
});
