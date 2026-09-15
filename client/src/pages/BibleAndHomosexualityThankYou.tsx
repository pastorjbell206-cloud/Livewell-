/**
 * Post-purchase download page for What Does the Bible Really Say About
 * Homosexuality? Stripe's Payment Link is configured to redirect here after a
 * successful payment. Links the EPUB + PDF directly.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";

const DIR = "/ebook/bible-and-homosexuality";
const EPUB = `${DIR}/What-the-Bible-Says-About-Homosexuality.epub`;
const PDF = `${DIR}/What-the-Bible-Says-About-Homosexuality.pdf`;

const btn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
  fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", padding: "16px 28px",
  borderRadius: "var(--radius-sm)", textDecoration: "none", minWidth: "220px",
};

export default function BibleAndHomosexualityThankYou() {
  return (
    <Layout>
      <SEOMeta title="Thank you — your download" description="Download your copy of What Does the Bible Really Say About Homosexuality?" noindex />
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "60vh" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard-text)" }}>
            Thank you
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "16px 0 18px" }}>
            Your copy is ready
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "54ch", margin: "0 auto 36px" }}>
            Thank you for buying <em>What Does the Bible Really Say About Homosexuality?</em> Download both formats below — the EPUB for your e-reader or phone, the PDF for everything else. The links stay on this page, so bookmark it.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={EPUB} download style={{ ...btn, background: "var(--charcoal)", color: "var(--charcoal-fg)" }}>Download EPUB</a>
            <a href={PDF} download style={{ ...btn, background: "var(--mustard)", color: "var(--ink)" }}>Download PDF</a>
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginTop: "40px" }}>
            Trouble downloading, or didn't mean to land here?{" "}
            <a href="mailto:Pastorjbell206@gmail.com" style={{ color: "var(--ink)", borderBottom: "1px solid var(--mustard)" }}>Email us</a>{" "}
            and we'll send your files directly. <Link href="/books/bible-and-homosexuality" style={{ color: "var(--ink)", borderBottom: "1px solid var(--mustard)" }}>Back to the book</Link>.
          </p>
        </div>
      </section>
    </Layout>
  );
}
