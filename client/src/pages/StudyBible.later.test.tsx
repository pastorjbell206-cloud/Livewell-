/**
 * The chapter reader marks where Mark 16:9-20 and John 7:53-8:11 begin and
 * end (lib/later-passages), in the Study view and the Read view, and prints a
 * chapter with no such passage exactly as before: no line, the same words.
 */
import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "@/test/harness";
import { VIEW_KEY } from "@/lib/bible-desk";
import StudyBible from "./StudyBible";
// The chapter page's lazy parts, compiled here rather than inside a test's
// 5 s, where on a busy machine their first load alone took seconds.
import "@/pages/study-bible/VerseMarks";
import "@/pages/study-bible/CrossRefs";
import "@/components/GoDeeper";
import "@/pages/study-bible/PlainPassages";

const PUBLIC = path.resolve(__dirname, "../../public");

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
  localStorage.clear();
  window.history.replaceState({}, "", "/");
});

async function open(address: string, view: "study" | "read") {
  localStorage.setItem(VIEW_KEY, JSON.stringify(view));
  vi.stubGlobal("fetch", diskFetch);
  window.history.replaceState({}, "", address);
  renderWithProviders(<StudyBible />);
  await waitFor(() => expect(document.getElementById("v1")).not.toBeNull(), { timeout: 5000 });
}

const lines = () => Array.from(document.querySelectorAll(".sb-later")).map((n) => n.textContent);

describe("the reader's mark on a later passage", () => {
  for (const view of ["study", "read"] as const) {
    it(`opens and closes Mark 16:9-20 (${view} view)`, async () => {
      await open("/study/bible/mark/16", view);
      await waitFor(() => expect(lines()).toEqual(["[The earliest manuscripts do not include Mark 16:9-20.]", "[End of Mark 16:9-20.]"]));
      const first = document.querySelector(".sb-later");
      expect(first?.nextElementSibling?.id).toBe("v9");
    });

    it(`opens John 7:53-8:11 again at John 8 and closes it after verse 11 (${view} view)`, async () => {
      await open("/study/bible/john/8", view);
      await waitFor(() => expect(lines()).toEqual(["[The earliest manuscripts do not include John 7:53-8:11.]", "[End of John 7:53-8:11.]"]));
      expect(document.getElementById("v11")?.nextElementSibling?.textContent).toBe("[End of John 7:53-8:11.]");
    });

    it(`prints John 3 with no line and its words unchanged (${view} view)`, async () => {
      await open("/study/bible/john/3", view);
      const shard = JSON.parse(fs.readFileSync(path.join(PUBLIC, "bible/text/john/3.json"), "utf8")) as { verses: { v: number; t: string }[] };
      await waitFor(() => expect(document.getElementById("v16")?.textContent).toContain(shard.verses[15].t));
      expect(lines()).toEqual([]);
      expect(screen.queryByRole("note")).toBeNull();
    });
  }
});
