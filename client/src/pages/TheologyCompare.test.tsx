/**
 * Where Christians differ (/theology/compare): one line under the title, said
 * once. The page carried a second line that said the same thing again (the
 * walk of 2026-11-23, finding 17).
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import TheologyCompare from "./TheologyCompare";

afterEach(() => vi.unstubAllGlobals());

describe("/theology/compare", () => {
  it("says what the page is for once, under its title", () => {
    vi.stubGlobal("fetch", offlineFetch());
    renderWithProviders(<TheologyCompare />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Where Christians differ");
    expect(screen.getAllByText("Compare Christian views, side by side")).toHaveLength(1);
    expect(screen.queryByText("See the positions side by side.")).toBeNull();
  });
});
