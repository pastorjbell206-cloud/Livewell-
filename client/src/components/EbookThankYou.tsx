/**
 * Post-purchase download page for a LiveWell ebook. Stripe's Checkout redirects
 * here with ?session_id=... after a successful payment. We confirm the session
 * is paid against /api/download (check mode), then reveal a download button
 * that streams the PDF from the same endpoint — the file is never a public
 * URL, so it only works for someone who actually paid.
 *
 * Failure discipline (this is the money path):
 * - A network blip during verification is NOT "unpaid" — it gets its own
 *   state and a Try-again button. A person who just paid must never be told
 *   "no purchase" because their hotel wifi hiccuped.
 * - The download itself goes through fetch -> res.ok -> blob, so a failed or
 *   expired session can never land the buyer on a raw JSON error page.
 */
import { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";

const btn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
  fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", padding: "16px 28px",
  borderRadius: "var(--radius-sm)", textDecoration: "none", minWidth: "240px",
  border: "none", cursor: "pointer",
};

type Status = "verifying" | "paid" | "unpaid" | "missing" | "error";

function readSessionId(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("session_id") || "";
}

export function EbookThankYou({ slug, title }: { slug: string; title: string }) {
  const [sessionId] = useState(readSessionId);
  const [status, setStatus] = useState<Status>(() => (readSessionId() ? "verifying" : "missing"));
  const [attempt, setAttempt] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  // The "verifying" state is set at mount (initial state) and by the
  // try-again buttons; the effect itself only reports the async result.
  useEffect(() => {
    if (!sessionId) return;
    let active = true;
    fetch(`/api/download?session_id=${encodeURIComponent(sessionId)}&check=1`)
      .then((r) => {
        if (!r.ok) throw new Error(`verify ${r.status}`);
        return r.json();
      })
      .then((d) => active && setStatus(d?.paid ? "paid" : "unpaid"))
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [sessionId, attempt]);

  const retryVerification = useCallback(() => {
    // Without a session id there is nothing to re-check; stay on "missing".
    if (sessionId) setStatus("verifying");
    setAttempt((n) => n + 1);
  }, [sessionId]);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      const res = await fetch(`/api/download?session_id=${encodeURIComponent(sessionId)}`);
      if (!res.ok) throw new Error(`download ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch {
      setDownloadError(true);
    } finally {
      setDownloading(false);
    }
  }, [downloading, sessionId, title]);

  return (
    <Layout>
      <SEOMeta title={`Thank you — your download of ${title}`} description={`Download your copy of ${title}.`} noindex />
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "60vh" }}>
        <div aria-live="polite" style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
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
                <button type="button" onClick={handleDownload} disabled={downloading} style={{ ...btn, background: "var(--mustard)", color: "var(--ink)", opacity: downloading ? 0.7 : 1 }}>
                  {downloading ? "Preparing your download…" : "Download the PDF"}
                </button>
              </div>
              {downloadError && (
                <p role="alert" style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink)", marginTop: "18px" }}>
                  The download didn't start. Try again in a moment — your purchase is confirmed and this page keeps working. If it keeps failing, email us and a person will send the file directly.
                </p>
              )}

              {/* Read next — a gentle next step, not an upsell. The reader just
                  finished paying; point them at more reading and the weekly
                  essay, never a hard sell. */}
              <div style={{ marginTop: "var(--s-6)", paddingTop: "var(--s-5)", borderTop: "1px solid var(--border)", maxWidth: "54ch", marginLeft: "auto", marginRight: "auto" }}>
                <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>While you have the time</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "10px" }}>
                  Keep reading
                </h2>
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "20px" }}>
                  Every book on the site can be read free, cover to cover, before you ever buy it. And one serious essay goes out a week, in the same vein as what you just bought.
                </p>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/read" style={{ ...btn, background: "var(--ink)", color: "var(--bone)", minWidth: 0, padding: "12px 22px", fontSize: "14px" }}>
                    Read the library free
                  </Link>
                  <Link href="/subscribe" style={{ ...btn, background: "transparent", color: "var(--ink)", border: "1px solid var(--border)", minWidth: 0, padding: "12px 22px", fontSize: "14px" }}>
                    The weekly essay
                  </Link>
                </div>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "16px 0 18px" }}>
                We couldn't reach the server
              </h1>
              <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "54ch", margin: "0 auto 36px" }}>
                This is a connection problem, not a problem with your purchase.
                Your payment stands. Try again below.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <button type="button" onClick={retryVerification} style={{ ...btn, background: "var(--mustard)", color: "var(--ink)" }}>
                  Try again
                </button>
              </div>
            </>
          )}

          {(status === "unpaid" || status === "missing") && (
            <>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", margin: "16px 0 18px" }}>
                We couldn't confirm a purchase
              </h1>
              <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "54ch", margin: "0 auto 36px" }}>
                This download is available only after a completed checkout. If you just paid and are seeing this, give it a moment and try again — or email us and we'll send your file directly.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <button type="button" onClick={retryVerification} style={{ ...btn, background: "var(--mustard)", color: "var(--ink)" }}>
                  Check again
                </button>
                <Link href={`/${slug}`} style={{ ...btn, background: "var(--ink)", color: "var(--bone)" }}>
                  Back to the book
                </Link>
              </div>
            </>
          )}

          <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginTop: "40px" }}>
            Trouble downloading?{" "}
            <a href="mailto:Pastorjbell206@gmail.com?subject=Ebook%20download" style={{ color: "var(--ink)", borderBottom: "1px solid var(--mustard)" }}>Email us</a>{" "}
            and we'll help. <Link href={`/${slug}`} style={{ color: "var(--ink)", borderBottom: "1px solid var(--mustard)" }}>Back to the book</Link>.
          </p>
        </div>
      </section>
    </Layout>
  );
}
