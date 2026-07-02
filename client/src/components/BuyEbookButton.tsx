/**
 * Buy button for a LiveWell ebook. POSTs to /api/checkout to create a Stripe
 * Checkout Session for the given slug, then redirects the browser to Stripe's
 * hosted checkout. On success Stripe returns the buyer to /<slug>/thank-you,
 * where the gated download is unlocked by verifying the paid session — the PDF
 * is never exposed at a public URL.
 *
 * Until a book's Stripe price is configured (STRIPE_PRICE_<SLUG>), /api/checkout
 * reports it is not on sale yet. Rather than show a dead error, the button then
 * degrades to a clean "request your copy by email" call to action, so the page
 * is never a dead end during the window before payments are switched on.
 */
import { useState } from "react";

const CONTACT_EMAIL = "Pastorjbell206@gmail.com";

const buttonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontFamily: "var(--U)",
  fontWeight: 600,
  fontSize: "15px",
  padding: "15px 30px",
  borderRadius: "var(--radius-sm)",
  background: "var(--mustard)",
  color: "var(--ink)",
  textDecoration: "none",
  border: "none",
  cursor: "pointer",
};

/** Turn a slug into a readable title when an explicit one is not supplied. */
function humanize(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w.length <= 3 && w !== "the" ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

export function BuyEbookButton({
  slug,
  title,
  label = "Buy the eBook — $9.99",
}: {
  slug: string;
  title?: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // When the book has no Stripe price yet, checkout reports it is not on sale.
  const [comingSoon, setComingSoon] = useState(false);

  const bookTitle = title || humanize(slug);
  const requestHref =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(`I'd like a copy of ${bookTitle}`)}` +
    `&body=${encodeURIComponent(
      `Hi James,\n\nI just read the opening of ${bookTitle} and I would like to buy the ebook. Please let me know how to get my copy.\n\nThank you.`,
    )}`;

  async function handleClick() {
    setLoading(true);
    setError(null);
    setComingSoon(false);
    // A hung checkout call should fail visibly, not leave the button spinning
    // at the moment someone decided to buy.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.url) {
        window.location.href = data.url as string;
        return;
      }
      // 503 from /api/checkout means Stripe (or this book's price) is not
      // configured yet — that is "coming soon", not a real failure.
      if (res.status === 503) {
        setComingSoon(true);
      } else if (res.status >= 500) {
        // Never surface raw server/Stripe strings at the buy moment.
        setError("Checkout is unavailable right now. Nothing was charged.");
      } else {
        setError(data?.error || "Checkout is unavailable right now.");
      }
    } catch {
      setError("Checkout is unavailable right now. Nothing was charged.");
    } finally {
      clearTimeout(timeout);
    }
    setLoading(false);
  }

  if (comingSoon) {
    return (
      <span style={{ display: "inline-flex", flexDirection: "column", gap: "8px" }}>
        <a href={requestHref} style={buttonStyle}>
          Request your copy by email →
        </a>
        <span style={{ fontFamily: "var(--U)", fontSize: "12px", opacity: 0.7 }}>
          Card checkout opens soon. Until then, email and we&rsquo;ll send your copy directly.
        </span>
      </span>
    );
  }

  return (
    <span style={{ display: "inline-flex", flexDirection: "column", gap: "8px" }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        style={{ ...buttonStyle, opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Redirecting to checkout…" : label}
      </button>
      {error && (
        <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--alert)" }}>
          {error}{" "}
          <a href={requestHref} style={{ color: "inherit", textDecoration: "underline" }}>
            Email us
          </a>{" "}
          and we&rsquo;ll send it directly.
        </span>
      )}
    </span>
  );
}
