/**
 * The Consistency Check (/disruption/consistency): marks are kept on this
 * device and survive a reload; what the reader marked is read back with
 * Scripture quoted exactly; the reading prints, clears, and names where to go
 * next; a failed load offers a retry; and the page says so when the browser
 * will not keep a mark.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { DISRUPTION } from "@/lib/prophetic";
import { nextPagesFor } from "@/lib/toolNext";
import PropheticConsistency, { CONSISTENCY_KEY } from "./PropheticConsistency";

const PUBLIC = path.resolve(__dirname, "../../../public");
const DATA = JSON.parse(fs.readFileSync(path.join(PUBLIC, "disruption/consistency-check.json"), "utf8"));

function serve(online = true) {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (online && String(input).endsWith("/disruption/consistency-check.json")) return new Response(JSON.stringify(DATA), { status: 200, headers: { "Content-Type": "application/json" } });
      return base(input, init);
    }),
  );
}

beforeEach(() => {
  window.localStorage.clear();
  serve();
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

const first = () => screen.findByRole("button", { name: new RegExp(`^1\\. ${DATA.tests[0].prompt.slice(0, 30)}`) });

describe("the Scripture it rests on", () => {
  it("is quoted word for word from the site's Bible files, each with its reference", () => {
    expect(DATA.scripture.length).toBeGreaterThanOrEqual(2);
    for (const v of DATA.scripture) {
      const m = /^(.*) (\d+):(\d+)(?:-(\d+))?$/.exec(v.ref)!;
      const slug = m[1] === "Psalm" ? "psalms" : m[1].toLowerCase().replace(/ /g, "-");
      const chapter = JSON.parse(fs.readFileSync(path.join(PUBLIC, "bible/text", slug, `${m[2]}.json`), "utf8"));
      const whole = chapter.verses.filter((x: { v: number }) => x.v >= +m[3] && x.v <= +(m[4] ?? m[3])).map((x: { t: string }) => x.t).join(" ");
      expect(whole.endsWith(v.text), v.ref).toBe(true);
      expect(`${v.text} ${v.line}`).not.toMatch(/—/);
      expect(v.line).not.toMatch(/!/);
    }
  });
});

describe("/disruption/consistency", () => {
  it("keeps the reader's marks through a reload and reads them back with Scripture", async () => {
    const one = renderWithProviders(<PropheticConsistency config={DISRUPTION} />);
    expect(screen.queryByText("Your examen")).toBeNull();
    fireEvent.click(await first());
    expect(JSON.parse(window.localStorage.getItem(CONSISTENCY_KEY)!)).toEqual({ v: 1, marked: [DATA.tests[0].id] });
    one.unmount();

    renderWithProviders(<PropheticConsistency config={DISRUPTION} />);
    expect(await first()).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "One landed. That is enough to start." })).toBeInTheDocument();
    expect(screen.getByText(/This is not a score, and there is no number that passes/)).toBeInTheDocument();
    for (const v of DATA.scripture) expect(screen.getByText(v.text)).toBeInTheDocument();
    expect(screen.getByText(/Berean Standard Bible/)).toBeInTheDocument();
    const hrefs = Array.from(document.querySelectorAll(".pc-reading a[href]"), (a) => a.getAttribute("href"));
    for (const p of nextPagesFor("consistency", "two-standards")) expect(hrefs).toContain(p.href);
  });

  it("prints the examen and clears the marks when asked", async () => {
    const print = vi.fn();
    vi.stubGlobal("print", print);
    renderWithProviders(<PropheticConsistency config={DISRUPTION} />);
    fireEvent.click(await first());
    fireEvent.click(screen.getByRole("button", { name: "Print my examen" }));
    expect(print).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Clear my marks" }));
    expect(screen.queryByText("Your examen")).toBeNull();
    expect(window.localStorage.getItem(CONSISTENCY_KEY)).toBeNull();
  });

  it("offers a retry when it will not load, and loads on the retry", async () => {
    serve(false);
    renderWithProviders(<PropheticConsistency config={DISRUPTION} />);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    serve(true);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    await waitFor(async () => expect(await first()).toBeInTheDocument());
  });

  it("says so when the browser will not keep a mark", async () => {
    renderWithProviders(<PropheticConsistency config={DISRUPTION} />);
    const b = await first();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("full");
    });
    fireEvent.click(b);
    expect(b).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(SAVE_FAILED)).toBeInTheDocument();
  });
});
