import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

export default function Privacy() {
  return (
    <Layout>
      <SEOMeta title="Privacy Policy" description="Privacy policy for LiveWell by James Bell." />
      <div className="wrap" style={{ maxWidth: "800px", padding: "60px 32px" }}>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontFamily: "var(--F)", fontWeight: 300, marginBottom: "32px", color: "var(--ink)" }}>
          Privacy Policy
        </h1>
        <div style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: "1.8", color: "var(--ink2)" }}>
          <p style={{ marginBottom: "20px" }}><strong>Last updated:</strong> April 2026</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Information We Collect</h2>
          <p style={{ marginBottom: "16px" }}>When you subscribe to our newsletter or use our contact forms, we collect the information you provide — typically your name and email address. We do not sell, rent, or share your personal information with third parties.</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>How We Use Your Information</h2>
          <p style={{ marginBottom: "16px" }}>We use your email address to send you articles, updates, and resources from LiveWell by James Bell. You can unsubscribe at any time by clicking the unsubscribe link in any email.</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Cookies</h2>
          <p style={{ marginBottom: "16px" }}>We use essential cookies for site functionality (such as keeping you logged in to the admin panel). We do not use tracking cookies or third-party advertising cookies.</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Third-Party Services</h2>
          <p style={{ marginBottom: "16px" }}>Our site is hosted on Vercel. Email services may be provided through Mailchimp or similar platforms. Payment processing for book purchases is handled by Stripe. Each of these services has its own privacy policy.</p>
          <h2 style={{ fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" }}>Contact</h2>
          <p style={{ marginBottom: "16px" }}>If you have questions about this privacy policy, please contact us at{" "}<a href="mailto:pastorjbell206@gmail.com" style={{ color: "var(--gold)", textDecoration: "underline" }}>pastorjbell206@gmail.com</a>.</p>
        </div>
      </div>
    </Layout>
  );
}
