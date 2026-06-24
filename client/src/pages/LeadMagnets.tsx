import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { LeadMagnetLanding } from "./LeadMagnetLanding";

export function LeadMagnetsPage() {
  const { magnetId } = useParams<{ magnetId: string }>();

  if (!magnetId) {
    return (
      <Layout>
        <SEOMeta
          title="Resource Not Found | James Bell"
          description="This free resource could not be found."
          url={`${SITE_URL}/lead-magnets`}
        />
        <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
              Not found
            </div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05, marginBottom: "16px" }}>
              That resource is not here.
            </h1>
            <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", marginBottom: "var(--s-5)" }}>
              The link may be old or mistyped. The library and the free guides are a click away.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/resources" style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", color: "var(--charcoal)", background: "var(--mustard)", padding: "12px 22px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
                Browse resources
              </Link>
              <Link href="/" style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", color: "var(--bone)", border: "1px solid rgba(245,240,230,0.4)", padding: "12px 22px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
                Home
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return <LeadMagnetLanding magnetId={magnetId} />;
}
