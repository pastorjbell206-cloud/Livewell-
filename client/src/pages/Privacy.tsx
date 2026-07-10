import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const h2: React.CSSProperties = { fontSize: "22px", fontFamily: "var(--F)", fontWeight: 600, margin: "32px 0 12px", color: "var(--ink)" };
const p: React.CSSProperties = { marginBottom: "16px" };
const link: React.CSSProperties = { color: "var(--gold)", textDecoration: "underline" };

export default function Privacy() {
  return (
    <Layout>
      <SEOMeta title="Privacy Policy" description="How LiveWell by James Bell handles your data: what we collect, how visits are measured, payments, and your choices." />
      <div className="wrap" style={{ maxWidth: "800px", padding: "60px 32px" }}>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontFamily: "var(--F)", fontWeight: 300, marginBottom: "32px", color: "var(--ink)" }}>
          Privacy Policy
        </h1>
        <div style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: "1.8", color: "var(--ink2)" }}>
          <p style={p}><strong>Last updated:</strong> July 2026</p>
          <p style={p}>
            This policy explains what LiveWell by James Bell collects, how it is used, and the choices you have. The short version: we collect the
            least we can, we never sell your information, and the only personal detail we ask for is an email address you choose to give.
          </p>

          <h2 style={h2}>What we collect</h2>
          <p style={p}>
            <strong>What you give us.</strong> When you subscribe to the newsletter, use a contact form, or take an on-site assessment, we collect
            what you enter — typically your email address, and sometimes your name, the audience you identify with (for example &ldquo;pastor&rdquo;
            or &ldquo;skeptic&rdquo;), or a message. We do not sell, rent, or trade this to anyone.
          </p>
          <p style={p}>
            <strong>Purchases.</strong> Ebook payments are handled by Stripe. We receive a record that a sale happened (the book, the amount, and
            the email you used at checkout) so we can deliver your download. We never see or store your full card number — Stripe handles that.
          </p>
          <p style={p}>
            <strong>How the site is used.</strong> We count page views and whether an essay was read to the end, so we can tell what is worth
            writing more of. This is measured with a random identifier stored in your own browser (see &ldquo;Cookies and local storage&rdquo; below);
            it is not tied to your name, and visits to the admin area are never counted.
          </p>

          <h2 style={h2}>How we use it</h2>
          <p style={p}>
            We use your email to send the newsletter and the resources you asked for. You can unsubscribe at any time from the link in any email.
            We use the usage counts, in aggregate, to decide what to write and improve — never to build an advertising profile of you.
          </p>

          <h2 style={h2}>Cookies and local storage</h2>
          <p style={p}>
            We use one essential cookie to keep the site owner logged in to the admin panel. For readers, we store a single random identifier in your
            browser&rsquo;s local storage so a page view and a repeat visit can be told apart; it carries no name or contact detail. We do not use
            third-party advertising or cross-site tracking cookies. You can clear this at any time by clearing your browser&rsquo;s site data.
          </p>

          <h2 style={h2}>Third-party services</h2>
          <p style={p}>
            A few trusted services help run the site, each under its own privacy policy: <strong>Vercel</strong> (hosting and privacy-light web
            analytics), <strong>Stripe</strong> (payments), <strong>Substack</strong> (the newsletter itself), and, where enabled,{" "}
            <strong>Mailchimp</strong> (email delivery). We share with them only what each needs to do its job.
          </p>

          <h2 style={h2}>Your choices</h2>
          <p style={p}>
            You can unsubscribe from any email, ask us to delete the information we hold about you, or request a copy of it — just email the address
            below. You can also clear the site data your browser stores at any time. Depending on where you live, you may have additional rights under
            laws such as the GDPR or CCPA; we honor those requests regardless of where you are.
          </p>

          <h2 style={h2}>Children</h2>
          <p style={p}>The site is written for adults and is not directed to children under 13. We do not knowingly collect information from them.</p>

          <h2 style={h2}>Changes</h2>
          <p style={p}>If this policy changes, we will update the date above. Material changes will be noted on this page.</p>

          <h2 style={h2}>Contact</h2>
          <p style={p}>
            Questions, or a request about your data? Email{" "}
            <a href="mailto:pastorjbell206@gmail.com" style={link}>pastorjbell206@gmail.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
