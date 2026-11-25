/**
 * Where Christians differ (/theology/compare): one line under the title, said
 * once. The page carried a second line that said the same thing again (the
 * walk of 2026-11-23, finding 17). A doctrine that does not load says so, with
 * a retry and a way back; it said "Loading…" for ever (the walk's polish).
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import TheologyCompare from "./TheologyCompare";

afterEach(() => vi.unstubAllGlobals());

const PUBLIC = path.resolve(__dirname, "../../public");

describe("/theology/compare", () => {
  it("says what the page is for once, under its title", () => {
    vi.stubGlobal("fetch", offlineFetch());
    renderWithProviders(<TheologyCompare />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Where Christians differ");
    expect(screen.getAllByText("Compare Christian views, side by side")).toHaveLength(1);
    expect(screen.queryByText("See the positions side by side.")).toBeNull();
  });
});

describe("/theology/compare when a doctrine does not load", () => {
  it("says so, tries again, and offers the way back to its door", async () => {
    // The first doctrine fails; the retry answers with its real file.
    let tries = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.startsWith("/theology/") && url.endsWith(".json")) {
          tries += 1;
          if (tries === 1) return new Response("{}", { status: 503 });
          return new Response(fs.readFileSync(path.join(PUBLIC, url.slice(1)), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
        }
        return offlineFetch()(input);
      }),
    );
    renderWithProviders(<TheologyCompare />);
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("The comparison didn't load.");
    expect(screen.queryByText("Loading…")).toBeNull();
    expect(within(alert).getByRole("link", { name: "Back to Questions" })).toHaveAttribute("href", "/topics");

    fireEvent.click(within(alert).getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("table")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(tries).toBe(2);
  });

  it("shows the failure, not a broken table, when the file is not a doctrine", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).startsWith("/theology/") ? new Response(JSON.stringify({ title: "half a file" }), { status: 200, headers: { "Content-Type": "application/json" } }) : offlineFetch()(input),
      ),
    );
    renderWithProviders(<TheologyCompare />);
    expect(await screen.findByRole("alert")).toHaveTextContent("The comparison didn't load.");
    expect(screen.queryByRole("table")).toBeNull();
  });
});
