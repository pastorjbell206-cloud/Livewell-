import Layout from "@/components/Layout";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_STATS } from "@/config/siteStats";
import { useArticleCount } from "@/hooks/useArticleCount";
import { trpc } from "@/lib/trpc";

export default function Membership() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");
  const essays = useArticleCount();

  // Checkout goes live the moment STRIPE_SECRET_KEY (env) and the
  // stripeMembershipPriceId site setting both exist. Until then: waitlist.
  // The annual choice appears only when a second (annual) price id is set.
  const enabledQuery = trpc.stripe.membershipEnabled.useQuery();
  const checkoutMutation = trpc.stripe.createMembershipCheckout.useMutation();
  const checkoutLive = enabledQuery.data?.enabled === true;
  const annualAvailable = checkoutLive && enabledQuery.data?.annual === true;

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "membership-waitlist" }),
      });
    } catch { /* best-effort */ }
    setJoined(true);
    setEmail("");
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setCheckoutError(null);
    try {
      const res = await checkoutMutation.mutateAsync({
        customerEmail: email,
        origin: window.location.origin,
        plan: annualAvailable ? plan : "monthly",
      });
      if (res.sessionUrl) {
        window.location.href = res.sessionUrl;
      } else {
        setCheckoutError("Checkout could not start. Try again in a moment.");
      }
    } catch {
      setCheckoutError("Checkout could not start. Try again in a moment.");
    }
  };

  return (
    <Layout>
      <SEOMeta
        title="Membership — LiveWell by James Bell"
        description={`Full access to ${essays.display} essays, member-only writing, curated reading paths, and the deeper room where theology meets the weight of real life.`}
        type="webpage"
      />

      {/* FRAMING */}
      <section style={{ background: "var(--charcoal)", padding: "6rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard)", fontFamily: "var(--U)", marginBottom: "1.5rem" }}>Membership</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "2rem" }}>
            The deeper room
          </h1>
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.75 }}>
            This is not a paywall. It is a room behind the room — for readers who have moved past browsing and want the full weight of the work. The membership exists because writing this kind of theology takes time, and time costs something. If the free writing has been useful to you, the membership is where the deeper work lives.
          </p>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section style={{ background: "var(--bone)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard-text)", fontFamily: "var(--U)", marginBottom: "1rem" }}>What is inside</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: "var(--ink)", marginBottom: "3rem" }}>Five things the membership gives you</h2>
          {[
            { title: "The full essay archive", desc: `${essays.display} essays searchable by topic, audience, and reading time. The skeptic essays, the pastor essays, the marriage essays — all in one place, organized as reading paths.` },
            { title: "Writing before it goes public", desc: "New essays land in the member library before they reach Substack or Facebook. You read it first." },
            { title: `Curated reading guides for the ${SITE_STATS.bookCount} books`, desc: "Each book paired with the essays that extend its argument. Not a list of titles — a guided path through the ideas." },
            { title: "Member-only tools and resources", desc: "The Bible Verse Finder, Prayer Generator, and future tools built for pastors, parents, and anyone trying to live well." },
            { title: "Direct access to James", desc: "A monthly open letter from James to members only, and a contact channel that gets a response. Not a broadcast — a conversation." },
          ].map((b, i) => (
            <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid var(--bone-muted)", paddingTop: i === 0 ? 0 : "1.5rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.5rem" }}>{b.title}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink-muted)" }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING + WAITLIST (pre-Stripe) */}
      <section style={{ background: "var(--bone-warm)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard-text)", fontFamily: "var(--U)", marginBottom: "1rem" }}>Pricing</div>
          {annualAvailable && (
            // Monthly/annual choice — only shown when an annual price is configured.
            <div role="group" aria-label="Billing period" style={{ display: "inline-flex", gap: "0", marginBottom: "1.25rem", border: "1px solid var(--bone-muted)", borderRadius: "2px", overflow: "hidden" }}>
              {(["monthly", "annual"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlan(p)}
                  aria-pressed={plan === p}
                  style={{ padding: "0.5rem 1.25rem", fontFamily: "var(--U)", fontSize: "0.8125rem", fontWeight: 500, cursor: "pointer", border: "none", background: plan === p ? "var(--charcoal)" : "transparent", color: plan === p ? "var(--bone)" : "var(--ink-muted)" }}
                >
                  {p === "monthly" ? "Monthly" : "Annual"}
                </button>
              ))}
            </div>
          )}
          <div style={{ fontFamily: "var(--F)", fontSize: "3rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.25rem" }}>{plan === "annual" ? "$89" : "$9"}<span style={{ fontSize: "1.25rem", color: "var(--ink-muted)" }}> / {plan === "annual" ? "year" : "month"}</span></div>
          <div style={{ fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "2rem" }}>{plan === "annual" ? "billed yearly — two months free" : "or $89 / year (save two months)"}</div>

          <div style={{ background: "var(--card)", border: "1px solid var(--mustard)", borderRadius: "2px", padding: "2rem", marginBottom: "2rem" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontFamily: "var(--U)", marginBottom: "1rem" }}>Founding member offer</div>
            <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.5, marginBottom: "1rem" }}>
              The first 100 members lock in the founding rate. Your price never increases.
            </p>
            {joined ? (
              <p style={{ color: "var(--mustard-text)", fontWeight: 500, fontFamily: "var(--U)", fontSize: "0.875rem" }}>You are on the founding-member list. When the doors open, you are first.</p>
            ) : (
              <form onSubmit={checkoutLive ? handleCheckout : handleWaitlist} style={{ display: "flex", gap: "0", maxWidth: "380px", margin: "0 auto" }}>
                <input type="email" aria-label="Email address" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                  style={{ flex: 1, padding: "0.75rem 1rem", border: "1px solid var(--bone-muted)", borderRight: "none", borderRadius: "2px 0 0 2px", fontSize: "0.875rem", fontFamily: "var(--U)", background: "var(--bone)", outline: "none" }}
                />
                <button type="submit" disabled={checkoutMutation.isPending} style={{ padding: "0.75rem 1.25rem", background: "var(--charcoal)", color: "var(--bone)", border: "1px solid var(--charcoal)", fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, cursor: checkoutMutation.isPending ? "default" : "pointer", opacity: checkoutMutation.isPending ? 0.7 : 1, borderRadius: "0 2px 2px 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {checkoutLive
                    ? (checkoutMutation.isPending ? "Starting checkout…" : "Become a member")
                    : "Join the waitlist"} <ArrowRight size={14} />
                </button>
              </form>
            )}
            {checkoutError && (
              <p style={{ fontSize: "0.8rem", color: "#9B1C1C", marginTop: "0.75rem", fontFamily: "var(--U)" }}>{checkoutError}</p>
            )}
            <p style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginTop: "0.75rem" }}>
              {checkoutLive
                ? "Checkout is handled by Stripe. Cancel anytime from the receipt email."
                : "The room opens soon. The waitlist gets first access — and the founding rate."}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", fontSize: "0.75rem", color: "var(--ink-muted)", fontFamily: "var(--U)" }}>
            <span>Cancel anytime, no friction</span>
            <span>Secured by Stripe</span>
            <span>No advertisers</span>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PROMISE — honest framing while real testimonials come in.
           The previous block shipped AI-written placeholder quotes from
           fictional pastors; that was a fraud risk per the original comment.
           This section will be replaced with real member quotes once they
           arrive (see admin/testimonials). */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            The Founding Cohort
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, color: "var(--bone)", letterSpacing: "-0.015em", marginBottom: "20px", maxWidth: "20ch", margin: "0 auto 20px" }}>
            The first members shape what membership becomes.
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,0.7)", maxWidth: "55ch", margin: "0 auto" }}>
            No paid testimonials. No invented quotes. When the founding cohort signs up, this space holds their real words. Until then, the writing speaks for itself — read three essays first.
          </p>
        </div>
      </section>

      {/* OBJECTION FAQ */}
      <section style={{ background: "var(--bone)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard-text)", fontFamily: "var(--U)", marginBottom: "1rem" }}>Questions</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: "var(--ink)", marginBottom: "3rem" }}>Before you decide</h2>
          {[
            { q: "What if I do not love it?", a: "Cancel anytime. No form. No phone call. No retention sequence. One click in your account settings. If the writing is not carrying weight for you, you should leave — and you will not be penalized for it." },
            { q: "How is this different from the free Substack?", a: `Substack delivers the weekly letter. The membership is the full library — ${essays.display} essays searchable by topic, the curated book guides, the member-only essays that go deeper than what a free newsletter can carry, and direct access to James.` },
            { q: "I am a pastor — is this for me?", a: "It was built for you first. The Pastors Connection Network is the community arm; the membership is the writing arm. Pastoral burnout, sermon preparation, theological formation, the loneliness of leading — the member library addresses all of it." },
            { q: "I am not a Christian. Does the membership assume I am?", a: "No. The skeptic is the hardest case, which is why the writing takes the skeptic seriously. The membership gives you the full archive — including the essays on doubt, historical criticism, and the intellectual architecture of belief. You will not be preached at. You will be argued with." },
            { q: "Where does my money go?", a: `Directly to the writing. No advertisers, no sponsors, no denominational subsidies. Your membership funds the time it takes to produce theology that does not cut corners. The ${SITE_STATS.bookCount} books were written this way. The ${essays.display} essays are written this way.` },
            { q: "Can I gift a membership?", a: "Not yet — but it is on the roadmap. If you want to gift it now, email Pastorjbell206@gmail.com and James will set it up manually." },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--bone-muted)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "1.125rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.5rem", lineHeight: 1.4 }}>{faq.q}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink-muted)" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", margin: "0 auto 2rem" }} />
          <p style={{ fontFamily: "var(--F)", fontSize: "1.25rem", fontStyle: "italic", lineHeight: 1.55, color: "var(--bone)", marginBottom: "2rem" }}>
            You have read this far. The writing has either carried weight for you or it has not. If it has, the membership is the room where the deeper work lives. The door is open.
          </p>
          {joined ? (
            <p style={{ color: "var(--mustard)", fontWeight: 500, fontFamily: "var(--U)" }}>You are on the founding-member list.</p>
          ) : (
            <form onSubmit={handleWaitlist} style={{ display: "flex", gap: "0", justifyContent: "center", maxWidth: "380px", margin: "0 auto" }}>
              <input type="email" aria-label="Email address" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                style={{ flex: 1, padding: "0.75rem 1rem", background: "transparent", border: "1px solid rgba(244,241,234,0.2)", borderRight: "none", color: "var(--bone)", fontSize: "0.875rem", fontFamily: "var(--U)", borderRadius: "2px 0 0 2px", outline: "none" }}
              />
              <button type="submit" style={{ padding: "0.75rem 1.25rem", background: "var(--bone)", color: "var(--charcoal)", border: "1px solid var(--bone)", fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", borderRadius: "0 2px 2px 0" }}>
                Join the waitlist
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
