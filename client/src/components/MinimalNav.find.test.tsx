/**
 * The header search is Find (master plan U15): a reference goes straight to
 * the verse in the Study Bible, anything else to /search, and the parser
 * arrives only when the field is focused.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";

import { offlineFetch, renderWithProviders } from "@/test/harness";
import MinimalNav from "./MinimalNav";

function openSearch() {
  vi.stubGlobal("fetch", offlineFetch());
  renderWithProviders(<MinimalNav />);
  fireEvent.click(screen.getByRole("button", { name: "Search, or look up a passage" }));
  return screen.getByRole("textbox", { name: "Search LiveWell" });
}

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

describe("the header search", () => {
  it("goes straight to a verse", async () => {
    const box = openSearch();
    fireEvent.change(box, { target: { value: "jn 3 16" } });
    fireEvent.submit(box);
    await waitFor(() => expect(window.location.pathname + window.location.hash).toBe("/study/bible/john/3#v16"));
  });

  it("offers the passage as a link while it is typed", async () => {
    const box = openSearch();
    fireEvent.focus(box);
    fireEvent.change(box, { target: { value: "Romans 13" } });
    expect(await screen.findByRole("link", { name: "Open Romans 13 in the Study Bible" })).toHaveAttribute("href", "/study/bible/romans/13");
  });

  it("sends a question to /search", async () => {
    const box = openSearch();
    fireEvent.change(box, { target: { value: "is america a christian nation" } });
    fireEvent.submit(box);
    await waitFor(() => expect(window.location.pathname + window.location.search).toBe("/search?q=is%20america%20a%20christian%20nation"));
  });
});
