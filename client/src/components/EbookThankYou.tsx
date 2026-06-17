/**
 * Post-purchase download page for a LiveWell ebook. Stripe's Checkout redirects
 * here with ?session_id=... after a successful payment. We confirm the session
 * is paid against /api/download (check mode), then reveal a download link that
 * streams the PDF from the same endpoint — the file is never a public URL, so
 * the link only works for someone who actually paid.
 */
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";

const btn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
  fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", padding: "16px 28px",
  borderRadius: "var(--radius-sm)", textDecoration: "none", minWidth: "240px",
};

type Status = "verifying" | "paid" | "unpaid" | "missing";

function readSessionId(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("session_id") || "";
}

export function EbookThankYou({ slug, title }: { slug: string; title: string }) {
  const [sessionId] = useState(readSessionId);
  const [status, setStatus] = useState<Status>(() => (readSessionId() ? "verifying" : "missing"));

  useEffect(() => {
    if (!sessionId) return;
    let active = true;
    fetch(`/api/download?session_id=${encodeURIComponent(sessionId)}&check=1`)
      .then((r) => r.json())
      .then((d) => active && setStatus(d?.paid ? "paid" : "unpaid"))
      .catch(() => active && setStatus("unpaid"));
    return () => {
      active = false;
    };
  }, [sessionId]);

  const downloadHref = `/api/download?session_id=${encodeURIComponent(sessionId)}`;

  return (
    <Layout>
      <SEOMeta title={`Thank you — your download of ${title}`} description={`Download your copy of ${title}.`} noindex />
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "60vh" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--mustard-text)" }}>
            Thank you
          </div>

          {status === "verifying" && (
            <>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "16px 0 18px" }}>
                Confirming your purchase…
              </h1>
              <p style={{ fontFamily: "var(--B)", fontSize: "17px", color: "var(--ink-muted)" }}>One moment while we verify your payment.</p>
            </>
          )}

          {status === "paid" && (
            <>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "16px 0 18px" }}>
                Your copy is ready
              </h1>
              <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "54ch", margin: "0 auto 36px" }}>
                Thank you for buying <em>{title}</em>. Download the PDF below — it reads on your phone, tablet, e-reader, or computer. Keep this page bookmarked; your download link stays active here.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href={downloadHref} style={{ ...btn, background: "var(--mustard)", color: "var(--ink)" }}>
                  Download the PDF
                </a>
              </div>
            </>
          )}

          {(status === "unpaid" || status === "missing") && (
            <>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "16px 0 18px" }}>
                We couldn’t confirm a purchase
              </h1>
              <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "54ch", margin: "0 auto 36px" }}>
                This download unlocks only after a completed checkout. If you just paid and are seeing this, give it a moment and refresh — or email us and we’ll send your file directly.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href={`/${slug}`} style={{ ...btn, background: "var(--ink)", color: "var(--bone)" }}>
                  Back to the book
                </Link>
              </div>
            </>
          )}

          <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginTop: "40px" }}>
            Trouble downloading?{" "}
            <a href="mailto:Pastorjbell206@gmail.com?subject=Ebook%20download" style={{ color: "var(--ink)", borderBottom: "1px solid var(--mustard)" }}>Email us</a>{" "}
            and we’ll help. <Link href={`/${slug}`} style={{ color: "var(--ink)", borderBottom: "1px solid var(--mustard)" }}>Back to the book</Link>.
          </p>
        </div>
      </section>
    </Layout>
  );
}
