/**
 * The reader follows the address's #v16 as it changes, not only on arrival:
 * the header's search (U15) can open a verse of the chapter already on screen,
 * and that changes nothing but the hash.
 */
import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "@/test/harness";
import StudyBible from "./StudyBible";

const PUBLIC = path.resolve(__dirname, "../../public");

/** Serves the committed Study Bible files from disk; anything else is offline. */
const diskFetch = (async (input: RequestInfo | URL) => {
  const url = new URL(String(input instanceof Request ? input.url : input), "http://localhost");
  const file = path.join(PUBLIC, decodeURIComponent(url.pathname));
  if (url.pathname.startsWith("/bible/") && file.startsWith(PUBLIC) && fs.existsSync(file)) {
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
}) as typeof fetch;

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

describe("the Study Bible reader", () => {
  it("opens a verse of the chapter on screen when only the hash changes", async () => {
    vi.stubGlobal("fetch", diskFetch);
    window.history.replaceState({}, "", "/study/bible/john/3");
    renderWithProviders(<StudyBible />);
    await waitFor(() => expect(document.getElementById("v16")).not.toBeNull(), { timeout: 5000 });
    expect(screen.queryByRole("button", { name: "Close the study panel" })).toBeNull();

    act(() => window.history.pushState(null, "", "/study/bible/john/3#v16"));
    expect(await screen.findByRole("button", { name: "Close the study panel" })).toBeInTheDocument();
    expect(screen.getAllByText("John 3:16").length).toBeGreaterThan(0);
  });
});
