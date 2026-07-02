/**
 * Money-path contract for EbookThankYou (roadmap HS-3).
 *
 * The failure discipline under test, from the component header:
 *  - a network blip during verification is NOT "unpaid" — it gets its own
 *    state ("your payment stands") and a working Try-again;
 *  - the paid state downloads through fetch → ok → blob, and a failed
 *    download shows a recovery line instead of a dead click;
 *  - no session_id, or paid:false, is the honest "couldn't confirm" state.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { EbookThankYou } from "./EbookThankYou";

type FetchArgs = Parameters<typeof fetch>;

/** Route /api/download by its query string; everything else answers 503. */
function routedFetch(
  onDownload: (url: string) => Promise<Response> | Response
): (...args: FetchArgs) => Promise<Response> {
  const fallback = offlineFetch();
  return async (...args: FetchArgs) => {
    const url = String(args[0]);
    if (url.startsWith("/api/download")) return onDownload(url);
    return fallback(...args);
  };
}

function paidResponse(paid: boolean): Response {
  return new Response(JSON.stringify({ paid }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function setSession(id: string | null) {
  const url = id ? `/babylon/thank-you?session_id=${id}` : "/babylon/thank-you";
  window.history.pushState({}, "", url);
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

describe("EbookThankYou", () => {
  it("shows the honest couldn't-confirm state when there is no session id", async () => {
    setSession(null);
    const fetchMock = vi.fn(routedFetch(() => paidResponse(true)));
    vi.stubGlobal("fetch", fetchMock);

    renderWithProviders(<EbookThankYou slug="babylon" title="Babylon" />);

    expect(await screen.findByText(/we couldn't confirm a purchase/i)).toBeInTheDocument();
    // No verification call was even attempted.
    const downloadCalls = fetchMock.mock.calls.filter((c) => String(c[0]).startsWith("/api/download"));
    expect(downloadCalls).toHaveLength(0);
  });

  it("verifies the session in check mode and unlocks the download when paid", async () => {
    setSession("cs_test_paid");
    const fetchMock = vi.fn(routedFetch(() => paidResponse(true)));
    vi.stubGlobal("fetch", fetchMock);

    renderWithProviders(<EbookThankYou slug="babylon" title="Babylon" />);

    expect(await screen.findByText(/your copy is ready/i)).toBeInTheDocument();
    const verifyCall = fetchMock.mock.calls.map((c) => String(c[0])).find((u) => u.startsWith("/api/download"));
    expect(verifyCall).toContain("session_id=cs_test_paid");
    expect(verifyCall).toContain("check=1");
    expect(screen.getByRole("button", { name: /download the pdf/i })).toBeEnabled();
  });

  it("downloads via fetch→blob and recovers visibly when the download fails", async () => {
    setSession("cs_test_paid");
    let downloadAttempts = 0;
    const fetchMock = vi.fn(
      routedFetch((url) => {
        if (url.includes("check=1")) return paidResponse(true);
        downloadAttempts += 1;
        // First real download fails; the buyer must see recovery copy.
        return new Response("gateway error", { status: 502 });
      })
    );
    vi.stubGlobal("fetch", fetchMock);
    const anchorClick = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => undefined);

    renderWithProviders(<EbookThankYou slug="babylon" title="Babylon" />);
    await userEvent.click(await screen.findByRole("button", { name: /download the pdf/i }));

    expect(await screen.findByText(/the download didn't start/i)).toBeInTheDocument();
    expect(downloadAttempts).toBe(1);
    expect(anchorClick).not.toHaveBeenCalled();
    // The purchase is still spoken for.
    expect(screen.getByText(/your purchase is confirmed/i)).toBeInTheDocument();
  });

  it("never calls a network blip 'unpaid' — error state, payment stands, retry works", async () => {
    setSession("cs_test_blip");
    let verifyCalls = 0;
    const fetchMock = vi.fn(
      routedFetch(() => {
        verifyCalls += 1;
        if (verifyCalls === 1) throw new TypeError("Failed to fetch");
        return paidResponse(true);
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    renderWithProviders(<EbookThankYou slug="babylon" title="Babylon" />);

    // The hotel-wifi case: its own state, not "no purchase".
    expect(await screen.findByText(/we couldn't reach the server/i)).toBeInTheDocument();
    expect(screen.getByText(/your payment stands/i)).toBeInTheDocument();
    expect(screen.queryByText(/we couldn't confirm a purchase/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(await screen.findByText(/your copy is ready/i)).toBeInTheDocument();
    await waitFor(() => expect(verifyCalls).toBe(2));
  });

  it("treats a verified-but-unpaid session honestly, with a recheck", async () => {
    setSession("cs_test_unpaid");
    const fetchMock = vi.fn(routedFetch(() => paidResponse(false)));
    vi.stubGlobal("fetch", fetchMock);

    renderWithProviders(<EbookThankYou slug="babylon" title="Babylon" />);

    expect(await screen.findByText(/we couldn't confirm a purchase/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /check again/i })).toBeInTheDocument();
    // Two ways back by design: the big button and the footer line.
    expect(screen.getAllByRole("link", { name: /back to the book/i }).length).toBeGreaterThan(0);
  });
});
