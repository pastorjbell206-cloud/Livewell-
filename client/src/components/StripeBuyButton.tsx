import { createElement, useEffect } from "react";

/** Account-wide Stripe publishable key (public by design; same account as the
 *  existing When God Bless America product). */
const PUBLISHABLE_KEY =
  "pk_live_51RYCqAG7Y8x20otN6Qm3UgBaVDYFC00eaEXlrVT1hShuTW7qg3ylfcX3UHGOc0oyX75k6c4DhsKyz4NFSU4aZkOx00HzSLA7FH";

/**
 * Stripe's hosted Buy Button web component. Pass the per-book `buyButtonId`
 * from the Stripe dashboard. Until a real id (`buy_btn_…`) is wired in, this
 * renders a graceful "notify me" fallback so the page is never broken.
 */
export function StripeBuyButton({ buyButtonId }: { buyButtonId: string }) {
  const ready = buyButtonId.startsWith("buy_btn_");
  useEffect(() => {
    if (ready && !document.getElementById("stripe-buy-button-js")) {
      const s = document.createElement("script");
      s.id = "stripe-buy-button-js";
      s.async = true;
      s.src = "https://js.stripe.com/v3/buy-button.js";
      document.head.appendChild(s);
    }
  }, [ready]);

  if (!ready) {
    return createElement(
      "a",
      {
        href: "mailto:Pastorjbell206@gmail.com?subject=Notify%20me%20about%20this%20ebook",
        style: {
          display: "inline-flex", alignItems: "center", gap: "8px",
          fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px",
          padding: "13px 24px", borderRadius: "var(--radius-sm)",
          background: "var(--mustard)", color: "var(--ink)", textDecoration: "none",
        },
      },
      "Available soon — notify me"
    );
  }
  return createElement("stripe-buy-button", {
    "buy-button-id": buyButtonId,
    "publishable-key": PUBLISHABLE_KEY,
  });
}
