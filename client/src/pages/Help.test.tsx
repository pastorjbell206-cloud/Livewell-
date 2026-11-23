/**
 * Find Help (/help): each care page in the list names its subject plainly,
 * under the reader's own words, from the page's own title (its search
 * title), so a pastor scanning for "anxiety" sees the word (the walk's
 * polish, 2026-11-23; finding 19). The care pages themselves are unchanged.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import type { NeedEntry } from "@/lib/needs";
import Help from "./Help";

const PUBLIC = path.resolve(__dirname, "../../public");
const NEEDS: NeedEntry[] = JSON.parse(fs.readFileSync(path.join(PUBLIC, "needs/index.json"), "utf8")).needs;
const bySlug = new Map(NEEDS.map((n) => [n.slug, n]));

function serveNeeds() {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) =>
      String(input) === "/needs/index.json"
        ? new Response(fs.readFileSync(path.join(PUBLIC, "needs/index.json"), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } })
        : base(input, init),
    ),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

describe("Find Help's lines", () => {
  it("name each care page's subject under the reader's words, from the page's own title", async () => {
    serveNeeds();
    renderWithProviders(<Help />);
    const list = await screen.findByRole("list", { name: "Care pages" });
    const rows = within(list).getAllByRole("link");
    expect(rows.length).toBeGreaterThan(10);
    for (const row of rows) {
      const need = bySlug.get(row.getAttribute("href")!.replace(/^\/help\//, "").replace(/#.*$/, ""))!;
      expect(need.seoTitle, need.slug).toBeTruthy();
      const sub = row.querySelector(".ed-sub");
      expect(sub?.textContent, need.slug).toBe(need.seoTitle);
      // The reader's words stay first; the subject line follows them.
      expect(row.querySelector(".ed-title")?.textContent, need.slug).toBe(need.title);
      expect(row.querySelector(".ed-title")!.compareDocumentPosition(sub!) & Node.DOCUMENT_POSITION_FOLLOWING, need.slug).toBeTruthy();
    }
    // A pastor scanning for the word finds it.
    const worry = within(list).getByRole("link", { name: /I can't stop worrying/ });
    expect(worry).toHaveTextContent(/Anxiety/);
    expect(within(list).getByRole("link", { name: /Someone I love has died/ })).toHaveTextContent(/Grief/);
  });

  it("name it in the typed results too", async () => {
    serveNeeds();
    renderWithProviders(<Help />);
    await screen.findByRole("list", { name: "Care pages" });
    fireEvent.change(screen.getByLabelText("Type it in your own words"), { target: { value: "I can't stop worrying" } });
    const result = await screen.findByRole("button", { name: /I can't stop worrying/ });
    expect(result).toHaveTextContent(bySlug.get("anxiety")!.seoTitle!);
  });

  it("are the pages' own titles, word for word", () => {
    for (const n of NEEDS.filter((x) => x.page)) {
      const page = JSON.parse(fs.readFileSync(path.join(PUBLIC, `needs/${n.slug}.json`), "utf8"));
      expect(n.seoTitle, n.slug).toBe(page.seoTitle);
    }
  });
});
