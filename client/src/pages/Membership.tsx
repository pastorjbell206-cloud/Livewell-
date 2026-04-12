import Layout from "@/components/Layout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useToast } from "@/contexts/ToastContext";
import { Loader2, Check, Star } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { SEOMeta } from "@/components/SEOMeta";

const MEMBERSHIP_TIERS = [
  {
    name: "Free",
    price: "0",
    period: "Forever",
    description: "Access to all public articles and resources",
    features: [
      "22+ cornerstone articles",
      "14 authored books",
      "Reading paths and learning journeys",
      "Email newsletter",
      "Community access",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "LiveWell Membership",
    price: "14.99",
    period: "/month",
    description: "Everything you need for deeper pastoral formation",
    features: [
      "All Free tier benefits",
      "Member community forum",
      "Monthly live Q&A with James Bell",
      "Early access to new articles (48 hours)",
      "Exclusive member-only resources",
      "Ad-free reading experience",
      "Download articles as PDFs",
      "Curated reading lists by pillar",
    ],
    cta: "Join Now",
    highlighted: true,
  },
];

const TESTIMONIALS = [
  {
    quote: "James has a gift for connecting deep theology with the real struggles of pastoral ministry. This membership has been transformative.",
    author: "Pastor Michael",
    role: "Lead Pastor, 500-member church",
    rating: 5,
  },
  {
    quote: "The monthly Q&A sessions alone are worth the membership. James's wisdom and accessibility are remarkable.",
    author: "Rev. Sarah",
    role: "Church Planter",
    rating: 5,
  },
  {
    quote: "I've recommended LiveWell to every pastor I know. It's not just content—it's formation for the soul.",
    author: "Bishop David",
    role: "Denominational Leader",
    rating: 5,
  },
  {
    quote: "As a young pastor, I felt lost. LiveWell gave me a roadmap and a community. I'm not alone anymore.",
    author: "Pastor James",
    role: "First-time Pastor",
    rating: 5,
  },
  {
    quote: "The reading paths are genius. They've helped me think through complex theological issues with clarity.",
    author: "Dr. Rebecca",
    role: "Seminary Professor",
    rating: 5,
  },
  {
    quote: "James's teaching on pastoral sustainability has literally saved my ministry. I'm more alive than I've been in years.",
    author: "Pastor Tom",
    role: "30-year Ministry Veteran",
    rating: 5,
  },
];

export default function Membership() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

  const handleUpgrade = async (tierName: string, price: string) => {
    if (price === "0") {
      addToast({
        type: "info",
        title: "Free Tier",
        message: "You already have access to the free tier. Start exploring!",
      });
      return;
    }

    if (!user) {
      addToast({
        type: "info",
        title: "Login Required",
        message: "Please log in to upgrade your membership",
      });
      return;
    }

    setLoadingTier(tierName);
    try {
      const result = await createCheckout.mutateAsync({
        bookId: 1,
        customerEmail: user.email || "",
        customerName: user.name || "Member",
        origin: window.location.origin,
      });

      if (result.sessionUrl) {
        window.open(result.sessionUrl, "_blank");
        addToast({
          type: "success",
          title: "Redirecting",
          message: "Opening membership checkout in a new tab...",
        });
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to create checkout session. Please try again.",
      });
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <Layout>
      <SEOMeta
        title="Membership"
        description="Join LiveWell membership for exclusive access to pastoral formation resources, live Q&A with James Bell, and community support."
        keywords="membership, pastoral formation, church leadership, James Bell"
      />
      <div>
        {/* HERO SECTION WITH PHOTO */}
        <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 20px" }}>
          <div className="wrap" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
              <div>
                <div className="kicker" style={{ marginBottom: "16px" }}>
                  <div className="kicker-line" style={{ background: "#B8963E" }}></div>
                  <div className="kicker-txt" style={{ color: "#B8963E" }}>JOIN OUR COMMUNITY</div>
                </div>
                <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "16px", lineHeight: "1.2" }}>
                  Go deeper with LiveWell
                </h1>
                <p style={{ fontSize: "18px", color: "#D1C9BB", marginBottom: "32px", lineHeight: "1.6" }}>
                  Join our growing community of pastors, leaders, and families committed to theological depth, spiritual formation, and faithful living in a changing world.
                </p>
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Check size={20} color="#B8963E" />
                    <span>4,200+ members</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Check size={20} color="#B8963E" />
                    <span>50+ countries</span>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533(2)_a1b2c3d4.jpeg"
                  alt="James Bell"
                  style={{ width: "100%", borderRadius: "8px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERSHIP TIERS */}
        <section style={{ padding: "80px 20px", background: "#F7F5F0" }}>
          <div className="wrap" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "16px" }}>
                Simple, Transparent Pricing
              </h2>
              <p style={{ fontSize: "18px", color: "#6B7280", maxWidth: "600px", margin: "0 auto" }}>
                Choose the plan that works for you. Upgrade or downgrade anytime.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "32px" }}>
              {MEMBERSHIP_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  style={{
                    background: tier.highlighted ? "#1A1A1A" : "white",
                    color: tier.highlighted ? "#F7F5F0" : "#1A1A1A",
                    padding: "48px 32px",
                    borderRadius: "12px",
                    border: tier.highlighted ? "2px solid #B8963E" : "1px solid #E5DDD0",
                    position: "relative",
                    transform: tier.highlighted ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.2s"
                  }}
                >
                  {tier.highlighted && (
                    <div style={{
                      position: "absolute",
                      top: "-16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#B8963E",
                      color: "#1A1A1A",
                      padding: "4px 16px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em"
                    }}>
                      Most Popular
                    </div>
                  )}

                  <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
                    {tier.name}
                  </h3>
                  <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "24px" }}>
                    {tier.description}
                  </p>

                  <div style={{ marginBottom: "32px" }}>
                    <span style={{ fontSize: "48px", fontWeight: "bold" }}>
                      ${tier.price}
                    </span>
                    <span style={{ fontSize: "14px", opacity: 0.8, marginLeft: "8px" }}>
                      {tier.period}
                    </span>
                  </div>

                  <button
                    onClick={() => handleUpgrade(tier.name, tier.price)}
                    disabled={loadingTier === tier.name}
                    style={{
                      width: "100%",
                      padding: "12px 24px",
                      background: tier.highlighted ? "#B8963E" : tier.price === "0" ? "transparent" : "#1A1A1A",
                      color: tier.highlighted ? "#1A1A1A" : tier.price === "0" ? "#1A1A1A" : "#F7F5F0",
                      border: tier.price === "0" ? "2px solid #1A1A1A" : "none",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      fontSize: "14px",
                      cursor: loadingTier === tier.name ? "not-allowed" : "pointer",
                      opacity: loadingTier === tier.name ? 0.7 : 1,
                      transition: "all 0.2s",
                      marginBottom: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px"
                    }}
                  >
                    {loadingTier === tier.name && <Loader2 size={16} className="animate-spin" />}
                    {tier.cta}
                  </button>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {tier.features.map((feature, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <Check size={20} color={tier.highlighted ? "#B8963E" : "#2D4A3E"} style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ fontSize: "14px" }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section style={{ padding: "80px 20px", background: "white" }}>
          <div className="wrap" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "16px" }}>
                Loved by Pastors & Leaders
              </h2>
              <p style={{ fontSize: "18px", color: "#6B7280" }}>
                Hear from members of the LiveWell community
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} style={{
                  background: "#F7F5F0",
                  padding: "32px",
                  borderRadius: "8px",
                  border: "1px solid #E5DDD0"
                }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} size={16} fill="#B8963E" color="#B8963E" />
                    ))}
                  </div>
                  <p style={{ fontSize: "15px", color: "#2C3E50", lineHeight: "1.6", marginBottom: "16px", fontStyle: "italic" }}>
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#1A1A1A" }}>
                      {testimonial.author}
                    </p>
                    <p style={{ fontSize: "12px", color: "#6B7280" }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section style={{ padding: "80px 20px", background: "#F7F5F0" }}>
          <div className="wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "60px", textAlign: "center" }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  q: "Can I cancel my membership anytime?",
                  a: "Yes! You can cancel your membership at any time with no penalties or hidden fees."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe payment processor."
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes! Start with our Free tier to explore all public articles and resources. Upgrade to membership whenever you're ready."
                },
                {
                  q: "What if I'm not satisfied?",
                  a: "We offer a 30-day money-back guarantee. If you're not satisfied with your membership, we'll refund your payment in full."
                },
                {
                  q: "Do you offer group or church discounts?",
                  a: "Yes! Contact us at hello@livewell.com for information about group memberships and church discounts."
                },
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: "white",
                  padding: "24px",
                  borderRadius: "8px",
                  border: "1px solid #E5DDD0"
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1A1A1A", marginBottom: "8px" }}>
                    {item.q}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.6" }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 20px", textAlign: "center" }}>
          <div className="wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "16px" }}>
              Ready to Join?
            </h2>
            <p style={{ fontSize: "18px", color: "#D1C9BB", marginBottom: "32px" }}>
              Start your journey toward deeper faith and more faithful ministry today.
            </p>
            <button
              onClick={() => handleUpgrade("LiveWell Membership", "14.99")}
              disabled={loadingTier === "LiveWell Membership"}
              style={{
                background: "#B8963E",
                color: "#1A1A1A",
                padding: "14px 32px",
                borderRadius: "4px",
                border: "none",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: loadingTier === "LiveWell Membership" ? "not-allowed" : "pointer",
                opacity: loadingTier === "LiveWell Membership" ? 0.7 : 1,
                transition: "all 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {loadingTier === "LiveWell Membership" && <Loader2 size={18} className="animate-spin" />}
              Join Now - $14.99/month
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
