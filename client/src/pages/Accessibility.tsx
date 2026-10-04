/**
 * The accessibility statement (/accessibility). Honest about the target
 * (WCAG 2.1 AA), what is in place, and how to report a barrier.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const p = { fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink)", marginBottom: "16px" } as const;

export default function Accessibility() {
  return (
    <Layout>
      <SEOMeta
        title="Accessibility Statement — LiveWell by James Bell"
        description="Our commitment to an accessible site: WCAG 2.1 AA as the working standard, what is in place, and how to tell us when something is in your way."
        url="https://www.livewellbyjamesbell.co/accessibility"
      />
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Accessibility</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            This site is meant for everyone
          </h1>
        </div>
      </section>
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <p style={p}>
            A platform that writes about reaching the excluded has no business excluding anyone at the door. We hold this site to the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA as our working standard, and we treat accessibility as a release requirement, not a feature.
          </p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 400, color: "var(--ink)", margin: "28px 0 12px" }}>What is in place</h2>
          <p style={p}>
            Semantic headings and landmarks. A skip-to-content link. Keyboard operability for navigation, menus, forms, and the interactive tools, with visible focus indicators. Touch targets sized for real thumbs. Text that scales with your browser settings. Color contrast checked in both light and dark mode. Reduced-motion preferences respected. Form fields with proper labels and plain-language errors.
          </p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 400, color: "var(--ink)", margin: "28px 0 12px" }}>Where we are still working</h2>
          <p style={p}>
            The site is large and grows weekly. Older pages are brought up to the standard as they are touched, and some third-party embeds (video, payment, scheduling) carry their providers' accessibility characteristics. PDF downloads mirror page content that is available in accessible HTML form.
          </p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 400, color: "var(--ink)", margin: "28px 0 12px" }}>Tell us what is in your way</h2>
          <p style={p}>
            If anything on this site blocks you, write to <a href="mailto:Pastorjbell206@gmail.com" style={{ color: "var(--ink)", borderBottom: "2px solid var(--mustard)", textDecoration: "none" }}>Pastorjbell206@gmail.com</a> with the page address and what happened. A person reads that inbox. Fixing the barrier you name comes ahead of building the next feature.
          </p>
        </div>
      </section>
    </Layout>
  );
}
