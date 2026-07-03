/**
 * Buy button for a book. Links to the book's Stripe Payment Link, which runs
 * Stripe-hosted checkout and redirects to the book's /thank-you download page
 * on success. Falls back to a "notify me" mailto if no link is wired in yet.
 */
const buttonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: "var(--U)",
  fontWeight: 600,
  fontSize: "15px",
  padding: "15px 30px",
  borderRadius: "var(--radius-sm)",
  background: "var(--mustard)",
  color: "var(--ink)",
  textDecoration: "none",
};

export function StripeBuyButton({
  paymentLink,
  label = "Get the ebook — $9.99",
}: {
  paymentLink: string;
  label?: string;
}) {
  if (!paymentLink.startsWith("https://buy.stripe.com")) {
    return (
      <a
        href="mailto:Pastorjbell206@gmail.com?subject=Notify%20me%20about%20this%20ebook"
        style={buttonStyle}
      >
        Available soon — notify me
      </a>
    );
  }
  return (
    <a href={paymentLink} style={buttonStyle}>
      {label}
    </a>
  );
}
