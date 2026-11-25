/**
 * The carry panel on /my-library: saving a file, opening one, and a carry
 * link, each showing what it holds before anything is brought in.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CarryReading } from "./CarryReading";
import { carryToLinkData, type CarryFile } from "@/lib/carry";

const marks = JSON.stringify([
  { ref: "jhn.3.16", slug: "john", chapter: 3, verse: 16, label: "John 3:16", color: "a", updated: "2026-11-01T00:00:00Z" },
  { ref: "jhn.3.17", slug: "john", chapter: 3, verse: 17, label: "John 3:17", note: "Not to condemn", updated: "2026-11-01T00:00:00Z" },
]);
const carried: CarryFile = { kind: "livewell-reading", version: 1, saved: "2026-11-20T12:00:00.000Z", items: { "livewell-marks-v1": marks } };

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState(null, "", "/");
  vi.restoreAllMocks();
});

describe("Carry your reading to another device", () => {
  it("says so when there is nothing to carry", () => {
    render(<CarryReading />);
    fireEvent.click(screen.getByRole("button", { name: /save a file/i }));
    expect(screen.getByText(/nothing is kept in this browser yet/i)).toBeInTheDocument();
  });

  it("saves what this browser keeps as a dated file", () => {
    localStorage.setItem("livewell-marks-v1", marks);
    const made: Blob[] = [];
    Object.assign(URL, { createObjectURL: vi.fn((b: Blob) => (made.push(b), "blob:carry")), revokeObjectURL: vi.fn() });
    let name = "";
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      name = this.download;
    });
    render(<CarryReading />);
    fireEvent.click(screen.getByRole("button", { name: /save a file/i }));
    expect(made).toHaveLength(1);
    expect(name).toMatch(/^livewell-reading-\d{4}-\d{2}-\d{2}\.json$/);
    expect(screen.getByText(/saved to your downloads/i)).toBeInTheDocument();
  });

  it("shows what a file holds, then brings it in and reloads", async () => {
    const reload = vi.fn();
    render(<CarryReading reload={reload} />);
    const picked = new File([JSON.stringify(carried)], "livewell-reading-2026-11-20.json", { type: "application/json" });
    fireEvent.change(screen.getByLabelText("Choose a LiveWell reading file"), { target: { files: [picked] } });
    expect(await screen.findByRole("heading", { name: "Bring this file's reading onto this device?" })).toBeInTheDocument();
    expect(screen.getByText("highlights and notes on 2 verses of the Bible")).toBeInTheDocument();
    expect(screen.getByText(/made on november 20, 2026/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Bring it onto this device" }));
    expect(localStorage.getItem("livewell-marks-v1")).toBe(marks);
    expect(JSON.parse(sessionStorage.getItem("livewell-session-carry-done")!)).toEqual({ added: 1, joined: 0 });
    expect(reload).toHaveBeenCalledOnce();
  });

  it("refuses a file this site did not make", async () => {
    render(<CarryReading />);
    const picked = new File(['{"hello":"world"}'], "other.json", { type: "application/json" });
    fireEvent.change(screen.getByLabelText("Choose a LiveWell reading file"), { target: { files: [picked] } });
    expect(await screen.findByText(/isn't a livewell reading file/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Bring it onto this device" })).toBeNull();
  });

  it("opens a carry link's preview and takes its data out of the address bar", async () => {
    const data = await carryToLinkData(carried);
    window.history.replaceState(null, "", `/my-library#carry=${data}`);
    render(<CarryReading />);
    expect(await screen.findByRole("heading", { name: "Bring this link's reading onto this device?" })).toBeInTheDocument();
    expect(window.location.hash).toBe("");
    expect(window.location.pathname).toBe("/my-library");
    fireEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(screen.getByRole("button", { name: /open a file/i })).toBeInTheDocument();
    expect(localStorage.getItem("livewell-marks-v1")).toBeNull();
  });

  it("says what came over after the reload", () => {
    sessionStorage.setItem("livewell-session-carry-done", JSON.stringify({ added: 3, joined: 1 }));
    render(<CarryReading />);
    expect(screen.getByText("Your reading from the other device is here: 3 things added, 1 joined with what was already here.")).toBeInTheDocument();
    expect(sessionStorage.getItem("livewell-session-carry-done")).toBeNull();
  });
});
