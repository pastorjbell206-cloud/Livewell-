/**
 * Buy button for a LiveWell ebook. POSTs to /api/checkout to create a Stripe
 * Checkout Session for the given slug, then redirects the browser to Stripe's
 * hosted checkout. On success Stripe returns the buyer to /<slug>/thank-you,
 * where the gated download is unlocked by verifying the paid session — the PDF
 * is never exposed at a public URL.
 */
import { useState } from "react";

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

export function BuyEbookButton({
  slug,
  label = "Buy the eBook — $9.99",
}: {
  slug: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.url) {
        window.location.href = data.url as string;
        return;
      }
      setError(data?.error || "Checkout is unavailable right now.");
    } catch {
      setError("Checkout is unavailable right now.");
    }
    setLoading(false);
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
        <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "#9b1c1c" }}>
          {error}{" "}
          <a
            href="mailto:Pastorjbell206@gmail.com?subject=Trouble%20buying%20the%20ebook"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Email us
          </a>{" "}
          and we&rsquo;ll send it directly.
        </span>
      )}
    </span>
  );
}
