/**
 * Landing page after a completed Stripe membership checkout
 * (/membership/success?session_id=...). Verifies the session server-side and
 * welcomes the new member; also adds them to the newsletter list so the
 * member letter reaches them.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";

export default function MembershipSuccess() {
  const sessionId = new URLSearchParams(window.location.search).get("session_id") || "";
  const sessionQuery = trpc.stripe.getCheckoutSession.useQuery(
    { sessionId },
    { enabled: !!sessionId, retry: 1 }
  );
  const [subscribed, setSubscribed] = useState(false);

  const paid = sessionQuery.data?.session?.status === "paid";
  const memberEmail = sessionQuery.data?.session?.customerEmail;

  useEffect(() => {
    if (!paid || !memberEmail || subscribed) return;
    setSubscribed(true);
    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: memberEmail, source: "membership" }),
    }).catch(() => {});
  }, [paid, memberEmail, subscribed]);

  return (
    <Layout>
      <SEOMeta title="Welcome to the membership — LiveWell by James Bell" description="Your membership is active." type="webpage" />
      <section style={{ background: "var(--charcoal)", padding: "7rem 1.5rem", minHeight: "55vh" }}>
        <div style={{ maxWidth: "620px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", margin: "0 auto 2rem" }} />
          {!sessionId || sessionQuery.isError ? (
            <>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 400, color: "var(--bone)", marginBottom: "1.25rem" }}>We could not confirm that checkout</h1>
              <p style={{ fontFamily: "var(--B)", fontSize: "1rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.75, marginBottom: "2rem" }}>
                If your card was charged, your membership is active and your receipt is in your inbox. If something looks wrong, write to us and a person will answer.
              </p>
              <a href="mailto:Pastorjbell206@gmail.com" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>Contact us</a>
            </>
          ) : sessionQuery.isLoading ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--bone)", opacity: 0.75 }}>Confirming your membership…</p>
          ) : (
            <>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 400, color: "var(--bone)", marginBottom: "1.25rem" }}>You are in the room</h1>
              <p style={{ fontFamily: "var(--B)", fontSize: "1rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.75, marginBottom: "1rem" }}>
                Your membership is active{memberEmail ? ` under ${memberEmail}` : ""}. Your receipt is in your inbox, and the monthly member letter will arrive at the same address. Manage or cancel anytime from the link in the receipt.
              </p>
              <p style={{ fontFamily: "var(--F)", fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--bone)", opacity: 0.85, marginBottom: "2.5rem" }}>
                Thank you for carrying the work. Start anywhere. The room is yours now.
              </p>
              <div style={{ display: "flex", gap: "1.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>Read the essays</Link>
                <Link href="/discipleship" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>Start the discipleship pathway</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
