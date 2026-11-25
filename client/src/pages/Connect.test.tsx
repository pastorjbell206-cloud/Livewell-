/**
 * /connect, "Find James": the one home for everything James does. LiveWell
 * first, then a card for each of his other works with one button that opens
 * it, the newest Substack titles linked out (or one quiet line when there are
 * none), and the page's own address with a Copy button.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, within, fireEvent, waitFor } from "@testing-library/react";
import superjson from "superjson";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { channelUrl } from "@/lib/channels";
import { SubstackLatestView } from "@/components/SubstackLatest";
import Connect from "./Connect";

afterEach(() => {
  vi.unstubAllGlobals();
});

const SAMPLE = [
  { title: "The first piece", url: "https://jamesbell333289.substack.com/p/first", date: "2026-11-13" },
  { title: "The second piece", url: "https://jamesbell333289.substack.com/p/second", date: "2026-11-06" },
  { title: "The third piece", url: "https://jamesbell333289.substack.com/p/third", date: "" },
];

/** Answer the site's own API: substack.latest with `items`, or fail it outright. */
function stubApi(items: unknown[] | "fail") {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const m = url.match(/\/api\/trpc\/([^?]+)/);
      if (!m) return base(input, init);
      const procs = decodeURIComponent(m[1]).split(",");
      if (items === "fail") return new Response("{}", { status: 500 });
      const out = procs.map((p) =>
        p === "substack.latest"
          ? { result: { data: superjson.serialize(items) } }
          : { error: superjson.serialize({ message: "stub", code: -32603, data: { code: "NOT_FOUND", httpStatus: 404 } }) }
      );
      return new Response(JSON.stringify(out), { status: 200, headers: { "Content-Type": "application/json" } });
    })
  );
}

const main = () => screen.getByRole("main");
const substack = channelUrl("substack")!;

describe("/connect", () => {
  it("leads with LiveWell, the home and the library, and its Everything button", () => {
    stubApi([]);
    renderWithProviders(<Connect />);
    expect(screen.getByRole("heading", { level: 1, name: "Find James" })).toBeTruthy();
    const lead = screen.getByRole("article", { name: "LiveWell" });
    expect(within(lead).getByText("The home and the library")).toBeTruthy();
    expect(within(lead).getByRole("link", { name: "Everything on LiveWell" }).getAttribute("href")).toBe("/explore");
  });

  it("gives each other work one card and one button that opens it, safely", () => {
    stubApi([]);
    renderWithProviders(<Connect />);
    const want: [string, string, string][] = [
      ["Substack", "Read on Substack", substack],
      ["Facebook", "Follow on Facebook", channelUrl("facebook")!],
      ["ENDS (Ends of the Earth Initiative)", "Visit ENDS", channelUrl("ends")!],
    ];
    for (const [name, action, href] of want) {
      const card = screen.getByRole("article", { name });
      const link = within(card).getByRole("link", { name: new RegExp(`^${action}`) });
      expect(link.getAttribute("href"), name).toBe(href);
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toContain("noopener");
      expect(link.textContent).toMatch(/opens .* in a new tab/);
    }
    const ends = screen.getByRole("article", { name: "ENDS (Ends of the Earth Initiative)" });
    expect(within(ends).getByText("The missionary work James founded")).toBeTruthy();
    expect(within(ends).getByRole("link", { name: /^Visit ENDS/ }).getAttribute("href")).toBe("https://endsinitiative.org");
    for (const [name, href] of [["Books", "/books"], ["Speaking", "/speaking"], ["Contact", "/contact"]]) {
      const card = screen.getByRole("article", { name });
      expect(within(card).getByRole("link").getAttribute("href"), name).toBe(href);
    }
  });

  it("names no membership, giving, network, title or book count", () => {
    stubApi([]);
    renderWithProviders(<Connect />);
    const text = main().textContent ?? "";
    expect(text).not.toMatch(/membership|donat|giving|Pastors Connection|Lead Pastor|\b21 books|\b25 books|years in ministry/i);
    expect(text).not.toMatch(/—/);
  });

  it("lists the newest Substack pieces as links out, by title and date", async () => {
    stubApi(SAMPLE);
    renderWithProviders(<Connect />);
    const first = await screen.findByRole("link", { name: /The first piece/ });
    expect(first.getAttribute("href")).toBe(SAMPLE[0].url);
    expect(first.getAttribute("target")).toBe("_blank");
    expect(first.getAttribute("rel")).toContain("noopener");
    expect(first.textContent).toContain("November 13, 2026");
    expect(screen.getByRole("link", { name: /The third piece/ })).toBeTruthy();
    expect(screen.queryByText("His newest pieces are on Substack.")).toBeNull();
  });

  it("shows one quiet line and the Substack button when the list is empty", async () => {
    stubApi([]);
    renderWithProviders(<Connect />);
    expect(await screen.findByText("His newest pieces are on Substack.")).toBeTruthy();
    const section = screen.getByRole("region", { name: "New on Substack." });
    expect(within(section).getByRole("link", { name: /^Read on Substack/ }).getAttribute("href")).toBe(substack);
  });

  it("shows the same line when the call fails", async () => {
    stubApi("fail");
    renderWithProviders(<Connect />);
    expect(await screen.findByText("His newest pieces are on Substack.")).toBeTruthy();
  });

  it("says its own address and copies it, saying Copied only when the copy worked", async () => {
    stubApi([]);
    const writeText = vi.fn(async () => undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    renderWithProviders(<Connect />);
    expect(screen.getByText("livewellbyjamesbell.co/connect")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /^Copy/ }));
    await waitFor(() => expect(screen.getByRole("button", { name: /^Copied/ })).toBeTruthy());
    expect(writeText).toHaveBeenCalledWith("https://www.livewellbyjamesbell.co/connect");
  });

  it("does not say Copied when the copy fails", async () => {
    stubApi([]);
    Object.defineProperty(navigator, "clipboard", { value: { writeText: vi.fn(async () => Promise.reject(new Error("denied"))) }, configurable: true });
    document.execCommand = vi.fn(() => false) as typeof document.execCommand;
    renderWithProviders(<Connect />);
    fireEvent.click(screen.getByRole("button", { name: /^Copy/ }));
    expect(await screen.findByText(/Could not copy/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: /^Copied/ })).toBeNull();
  });
});

describe("SubstackLatestView", () => {
  it("holds its space while loading", () => {
    renderWithProviders(<SubstackLatestView status="loading" items={[]} />);
    const list = screen.getByRole("list", { name: "Loading the newest pieces" });
    expect(list.getAttribute("style")).toContain("min-height");
  });

  it("drops any item whose link is not on substack.com", () => {
    renderWithProviders(
      <SubstackLatestView
        status="ready"
        items={[SAMPLE[0], { title: "Elsewhere", url: "https://example.com/p", date: "" }, { title: "Bad", url: "javascript:alert(1)", date: "" }]}
      />
    );
    expect(screen.getByRole("link", { name: /The first piece/ })).toBeTruthy();
    expect(screen.queryByText("Elsewhere")).toBeNull();
    expect(screen.queryByText("Bad")).toBeNull();
  });
});
