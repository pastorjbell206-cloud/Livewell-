import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

export default function Terms() {
  return (
    <Layout>
      <SEOMeta title="Terms of Use" description="Terms of use for LiveWell by James Bell." />
      <div className="wrap" style={{ maxWidth: "800px", padding: "60px 32px" }}>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontFamily: "var(--F)", fontWeight: 300, marginBottom: "32px", color: "var(--ink)" }}>
          Terms of Use
        </h1>
        <div style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: "1.8", color: "var(--ink2)" }}>
          <p style={{ marginBottom: "20px" }}><strong>Last updated:</strong> July 2026</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Content</h2>
          <p style={{ marginBottom: "16px" }}>All articles, essays, and written content on this site are the intellectual property of James Bell unless otherwise noted. You may share links to articles freely. Reproducing full articles requires written permission.</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Fair Use</h2>
          <p style={{ marginBottom: "16px" }}>Brief quotations for purposes of commentary, criticism, teaching, or scholarship are encouraged and welcomed. Please attribute the source when quoting.</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Ebook Purchases and Refunds</h2>
          <p style={{ marginBottom: "16px" }}>Ebooks are digital products delivered as an immediate download after payment, which is processed securely by Stripe (we never see your full card number). Because a digital book cannot be returned once downloaded, sales are generally final. That said, we stand behind the work: if your download fails, arrives corrupted, or you were charged in error, email us within 30 days and we will fix it or refund you. We would rather have your trust than a sale you regret.</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Membership</h2>
          <p style={{ marginBottom: "16px" }}>If membership is offered, it renews on the interval shown at checkout until you cancel. You can cancel anytime and keep access through the end of the period you paid for; we do not pro-rate partial periods. Manage or cancel from your account or by emailing us.</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Disclaimer</h2>
          <p style={{ marginBottom: "16px" }}>The content on this site is provided for informational and spiritual edification purposes. It is not a substitute for professional counseling, legal, or medical advice.</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Contact</h2>
          <p style={{ marginBottom: "16px" }}>For questions about these terms, contact us at{" "}<a href="mailto:pastorjbell206@gmail.com" style={{ color: "var(--gold)", textDecoration: "underline" }}>pastorjbell206@gmail.com</a>.</p>
        </div>
      </div>
    </Layout>
  );
}
