/**
 * Money-path contract for BuyEbookButton (roadmap HS-3).
 *
 * The contract, from the component's own failure discipline:
 *  - 200 + url  → the browser is sent to Stripe's hosted checkout
 *  - 503        → "coming soon": degrade to the request-by-email CTA
 *  - 5xx        → "Checkout is unavailable right now. Nothing was charged."
 *  - 4xx + body → the server's own error line, verbatim
 *  - network    → same "Nothing was charged." line; never a raw error
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BuyEbookButton } from "./BuyEbookButton";

const CHECKOUT_LABEL = "Buy the eBook — $8.99";

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const originalLocation = window.location;

beforeEach(() => {
  // jsdom's Location throws "navigation not implemented" on href writes;
  // replace it with a plain recorder for the redirect assertion.
  Object.defineProperty(window, "location", {
    value: { ...originalLocation, href: "http://localhost/" },
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  Object.defineProperty(window, "location", {
    value: originalLocation,
    writable: true,
    configurable: true,
  });
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("BuyEbookButton", () => {
  it("redirects to the Stripe checkout URL on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse(200, { url: "https://checkout.stripe.com/c/pay/cs_test_abc" })
    );
    vi.stubGlobal("fetch", fetchMock);

    render(<BuyEbookButton slug="babylon" title="Babylon" />);
    await userEvent.click(screen.getByRole("button", { name: CHECKOUT_LABEL }));

    await waitFor(() =>
      expect(window.location.href).toBe("https://checkout.stripe.com/c/pay/cs_test_abc")
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/checkout",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ slug: "babylon" }),
      })
    );
  });

  it("degrades to the email CTA when checkout reports 503 (not on sale yet)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(503, {})));

    render(<BuyEbookButton slug="babylon" title="Babylon" />);
    await userEvent.click(screen.getByRole("button", { name: CHECKOUT_LABEL }));

    const emailCta = await screen.findByRole("link", {
      name: /request your copy by email/i,
    });
    expect(emailCta).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:Pastorjbell206@gmail.com")
    );
    expect(emailCta.getAttribute("href")).toContain(encodeURIComponent("Babylon"));
    expect(screen.getByText(/card checkout opens soon/i)).toBeInTheDocument();
    // The dead button is gone entirely.
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows the nothing-was-charged line on a 5xx, never the raw server error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(500, { error: "StripeInvalidRequestError: ..." }))
    );

    render(<BuyEbookButton slug="babylon" />);
    await userEvent.click(screen.getByRole("button", { name: CHECKOUT_LABEL }));

    expect(
      await screen.findByText(/checkout is unavailable right now\. nothing was charged\./i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/StripeInvalidRequestError/)).not.toBeInTheDocument();
    // Still a way to buy: the email fallback link.
    expect(screen.getByRole("link", { name: /email us/i })).toBeInTheDocument();
    // The button recovers for another attempt.
    expect(screen.getByRole("button", { name: CHECKOUT_LABEL })).toBeEnabled();
  });

  it("surfaces the server's own message on a 4xx with a body", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(400, { error: "This book is not available in your region." }))
    );

    render(<BuyEbookButton slug="babylon" />);
    await userEvent.click(screen.getByRole("button", { name: CHECKOUT_LABEL }));

    expect(
      await screen.findByText(/this book is not available in your region\./i)
    ).toBeInTheDocument();
  });

  it("treats a network failure as nothing-was-charged", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    render(<BuyEbookButton slug="babylon" />);
    await userEvent.click(screen.getByRole("button", { name: CHECKOUT_LABEL }));

    expect(
      await screen.findByText(/checkout is unavailable right now\. nothing was charged\./i)
    ).toBeInTheDocument();
  });

  it("disables the button and says so while the checkout call is in flight", async () => {
    let resolveFetch: (r: Response) => void = () => undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(new Promise<Response>((r) => (resolveFetch = r)))
    );

    render(<BuyEbookButton slug="babylon" />);
    await userEvent.click(screen.getByRole("button", { name: CHECKOUT_LABEL }));

    const pending = screen.getByRole("button", { name: /redirecting to checkout…/i });
    expect(pending).toBeDisabled();

    resolveFetch(jsonResponse(503, {}));
    await screen.findByRole("link", { name: /request your copy by email/i });
  });
});
