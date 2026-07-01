import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { CheckCircle2, Star, Lock } from "lucide-react";

interface LeadMagnetConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  pillar: string;
  readingPathSlug: string;
  expectedConversionRate: number;
}

const LEAD_MAGNETS: Record<string, LeadMagnetConfig> = {
  "leadership-audit": {
    id: "leadership-audit",
    title: "The Leadership Audit: 15 Questions to Assess Your Leadership Health",
    subtitle: "Discover Your Leadership Blind Spots",
    description: "Most leaders have no idea if they're actually good at leadership. This 15-question audit reveals your blind spots, your strengths, and exactly what you need to improve.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-leadership-audit-RBJACizR9S5nzjLwh9nkox.webp",
    pillar: "Leadership Formation",
    readingPathSlug: "church-leadership-essentials",
    expectedConversionRate: 0.18,
  },
  "prophetic-manifesto": {
    id: "prophetic-manifesto",
    title: "The Prophetic Manifesto: 7 Beliefs That Will Change Your Life",
    subtitle: "7 Core Beliefs for Living Prophetically",
    description: "Most people live by beliefs they've never examined. This manifesto reveals 7 core beliefs that separate people who just exist from people who actually live.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-prophetic-manifesto-4kXoEV8Fh52rBUzcT9DQjc.webp",
    pillar: "Prophetic Disruption",
    readingPathSlug: "cultural-engagement-justice",
    expectedConversionRate: 0.15,
  },
  "theology-workbook": {
    id: "theology-workbook",
    title: "The Theology Workbook: 10 Essential Beliefs Explained Simply",
    subtitle: "Understand Faith Without the Jargon",
    description: "Theology doesn't have to be complicated. This workbook explains 10 essential beliefs in plain English, with real-life examples and discussion questions.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-theology-workbook-7kafG6z5SUZ6TMQMY6FgDH.webp",
    pillar: "Theological Depth",
    readingPathSlug: "spiritual-formation-prayer",
    expectedConversionRate: 0.16,
  },
  "life-diagnostic": {
    id: "life-diagnostic",
    title: "The Life Diagnostic: 20 Questions About Your Marriage, Parenting & Personal Health",
    subtitle: "Assess the Health of Your Most Important Relationships",
    description: "Your marriage, parenting, and personal health are connected. This diagnostic reveals the real health of your life in these three areas—and what to do about it.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-life-diagnostic-gXNiCnwGXCDEF2cB7u2bj.webp",
    pillar: "Integrated Life",
    readingPathSlug: "marriage-family-ministry",
    expectedConversionRate: 0.22,
  },
  "community-roadmap": {
    id: "community-roadmap",
    title: "The Community Action Roadmap: 7 Steps to Make a Real Difference",
    subtitle: "From Passion to Impact in 30 Days",
    description: "Most people want to change the world but don't know where to start. This roadmap gives you 7 concrete steps to make a real difference in your community—starting this week.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/leadmagnet-community-roadmap-KCRw7SuKppH4vgbhRYg3q2.webp",
    pillar: "Prophetic Justice",
    readingPathSlug: "cultural-engagement-justice",
    expectedConversionRate: 0.15,
  },
};

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Church Planter",
    quote: "This audit completely changed how I see my leadership. I discovered blind spots I didn't know I had.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Senior Pastor",
    quote: "The insights were immediately actionable. I've already made changes based on what I learned.",
    rating: 5,
  },
  {
    name: "Lisa Martinez",
    role: "Ministry Leader",
    quote: "Finally, a resource that speaks to the real challenges we face. Highly recommended.",
    rating: 5,
  },
];

const VALUE_PROPS = [
  {
    title: "Instant Self-Assessment",
    description: "Personal insight into where you actually stand right now, in minutes, not weeks.",
  },
  {
    title: "Concrete Next Steps",
    description: "Not just a diagnosis of the problem—specific, practical steps you can take this week.",
  },
  {
    title: "A Short Email Series",
    description: "Five follow-up emails that help you read your results and decide what to do next.",
  },
];

const FAQS = [
  {
    q: "What format is it?",
    a: "A clean, interactive PDF you can download the moment you sign up.",
  },
  {
    q: "How long does it take?",
    a: "Most people finish in five to ten minutes. You can work through it at your own pace.",
  },
  {
    q: "What will I learn?",
    a: "Personal insight into where you stand, the blind spots you've been missing, and clear next steps.",
  },
  {
    q: "Is there a catch?",
    a: "No. It's free. You'll get follow-up emails with resources, and nothing more than that.",
  },
];

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export function LeadMagnetLanding({ magnetId }: { magnetId: string }) {
  const magnet = LEAD_MAGNETS[magnetId];
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!magnet) {
    return (
      <Layout>
        <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)", textAlign: "center" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>Not Found</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>
              That resource doesn't exist.
            </h1>
          </div>
        </section>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Track signup and send email
      const response = await fetch("/api/lead-magnets/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          magnetId: magnet.id,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <SEOMeta
          title={`${magnet.title} | James Bell`}
          description={magnet.description}
          url={`${SITE_URL}/free/${magnet.id}`}
        />
        <section style={{ background: "var(--charcoal)", color: "var(--bone)", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--s-7) var(--s-4)" }}>
          <div style={{ maxWidth: "560px", textAlign: "center" }}>
            <CheckCircle2 aria-hidden style={{ width: 48, height: 48, color: "var(--mustard)", margin: "0 auto var(--s-3)" }} />
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>It's On Its Way</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.02em", marginBottom: "var(--s-3)" }}>
              Check your email.
            </h1>
            <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.82)", marginBottom: "var(--s-3)" }}>
              We've sent {magnet.title} to <strong style={{ color: "var(--bone)" }}>{email}</strong>.
            </p>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "rgba(245,240,230,0.6)", marginBottom: "var(--s-4)" }}>
              Look in your inbox—and your spam folder—for the download link. A short email series will follow with insights and next steps.
            </p>
            <a
              href="/"
              style={{ display: "inline-block", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 500, background: "var(--mustard)", color: "var(--ink)", padding: "14px 32px", borderRadius: "var(--radius-sm)" }}
            >
              Back to Home
            </a>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOMeta
        title={`${magnet.title} | James Bell`}
        description={magnet.description}
        url={`${SITE_URL}/free/${magnet.id}`}
      />

      {/* Hero — charcoal surface, two columns: copy + cover + capture form */}
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))", gap: "var(--s-5)", alignItems: "center" }}>
          {/* Left: copy + form */}
          <div>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>{magnet.pillar}</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "var(--s-3)" }}>
              {magnet.title}
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "22px", fontStyle: "italic", lineHeight: 1.4, color: "var(--mustard)", marginBottom: "var(--s-3)" }}>
              {magnet.subtitle}
            </p>
            <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.82)", marginBottom: "var(--s-4)", maxWidth: "60ch" }}>
              {magnet.description}
            </p>

            {/* Email capture form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)", maxWidth: "440px" }}>
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  fontFamily: "var(--B)",
                  fontSize: "16px",
                  width: "100%",
                  padding: "14px 16px",
                  background: "var(--card)",
                  color: "var(--ink)",
                  border: "1px solid rgba(245,240,230,0.18)",
                  borderRadius: "var(--radius-sm)",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "16px",
                  fontWeight: 600,
                  width: "100%",
                  padding: "14px 16px",
                  background: "var(--mustard)",
                  color: "var(--ink)",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "default" : "pointer",
                }}
              >
                {loading ? "Sending..." : "Get Instant Access"}
              </button>
              <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: "var(--U)", fontSize: "13px", color: "rgba(245,240,230,0.6)" }}>
                <Lock aria-hidden style={{ width: 13, height: 13 }} />
                Your email is safe. No spam, ever.
              </p>
            </form>
          </div>

          {/* Right: cover */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: "360px" }}>
              <img
                src={magnet.coverUrl}
                alt={magnet.title}
                style={{ width: "100%", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-modal)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get — cream */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", textAlign: "center", marginBottom: "14px" }}>What You'll Get</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", textAlign: "center", marginBottom: "var(--s-5)" }}>
            Three things, in your hands today.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "var(--s-3)" }}>
            {VALUE_PROPS.map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "3px solid var(--mustard)", padding: "var(--s-4)" }}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof — warm cream */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", textAlign: "center", marginBottom: "14px" }}>From Readers</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", textAlign: "center", marginBottom: "var(--s-5)" }}>
            What people are saying.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "var(--s-3)" }}>
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", padding: "var(--s-4)" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "var(--s-2)" }} aria-label={`${testimonial.rating} out of 5`}>
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} aria-hidden style={{ width: 16, height: 16, fill: "var(--mustard)", color: "var(--mustard)" }} />
                  ))}
                </div>
                <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", lineHeight: 1.45, color: "var(--ink)", marginBottom: "var(--s-3)" }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)" }}>{testimonial.name}</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — cream */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", textAlign: "center", marginBottom: "14px" }}>Questions</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", textAlign: "center", marginBottom: "var(--s-5)" }}>
            Before you sign up.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)", maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            {FAQS.map((item, i) => (
              <div key={i} style={{ borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-3)" }}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{item.q}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — charcoal */}
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-7) var(--s-4)", textAlign: "center" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>
            Start where you are.
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.82)", marginBottom: "var(--s-4)", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            Thousands have already downloaded this guide. The next honest look at your life is one email away.
          </p>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ display: "inline-block", fontFamily: "var(--U)", fontSize: "16px", fontWeight: 600, background: "var(--mustard)", color: "var(--ink)", padding: "16px 40px", borderRadius: "var(--radius-sm)" }}
          >
            Get Your Free Guide
          </a>
        </div>
      </section>
    </Layout>
  );
}
