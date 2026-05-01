import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function WorkWithJames() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <SEOMeta
        title="Work With James"
        description="Connect with James Bell for speaking engagements, consulting, pastoral coaching, and ministry collaboration."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Work With James Bell",
          url: "https://www.livewellbyjamesbell.co/work-with-james",
        }}
      />

      {/* Hero */}
      <section style={{ background: "var(--forest)", color: "var(--ivory)", padding: "80px 32px 60px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", fontFamily: "var(--U)", marginBottom: "16px" }}>
            CONNECT
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, fontFamily: "var(--F)", lineHeight: 1.15, marginBottom: "20px" }}>
            Work With <em style={{ fontStyle: "italic", color: "var(--gold)" }}>James</em>
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.7, opacity: 0.85, fontFamily: "var(--B)" }}>
            Speaking, consulting, pastoral coaching, and ministry partnerships.
          </p>
        </div>
      </section>

      {/* Services + Contact Form */}
      <section style={{ padding: "60px 32px", background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: "1000px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Services */}
            <div>
              <h2 style={{ fontSize: "28px", fontWeight: 600, fontFamily: "var(--F)", color: "var(--ink)", marginBottom: "24px" }}>
                How I Can Help
              </h2>
              {[
                { title: "Speaking & Preaching", desc: "Conferences, retreats, revivals, and pulpit supply. Theological depth meets pastoral warmth." },
                { title: "Pastoral Coaching", desc: "One-on-one coaching for pastors navigating burnout, church conflict, leadership development, or personal growth." },
                { title: "Church Consulting", desc: "Strategic planning, revitalization assessment, leadership team development, and ministry audit." },
                { title: "Writing & Ghostwriting", desc: "Book development, sermon series resources, curriculum writing, and collaborative projects." },
              ].map((s) => (
                <div key={s.title} style={{ marginBottom: "24px", paddingLeft: "16px", borderLeft: "3px solid var(--gold)" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, fontFamily: "var(--F)", color: "var(--ink)", marginBottom: "4px" }}>{s.title}</h3>
                  <p style={{ fontSize: "15px", color: "var(--ink3)", lineHeight: 1.6, fontFamily: "var(--B)" }}>{s.desc}</p>
                </div>
              ))}

              <div style={{ marginTop: "32px", padding: "20px", background: "var(--cream)", borderRadius: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Mail size={16} style={{ color: "var(--gold)" }} />
                  <a href="mailto:Pastorjbell206@gmail.com" style={{ color: "var(--ink)", fontSize: "14px", fontFamily: "var(--U)" }}>Pastorjbell206@gmail.com</a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={16} style={{ color: "var(--gold)" }} />
                  <span style={{ color: "var(--ink3)", fontSize: "14px", fontFamily: "var(--U)" }}>Fenton, Michigan</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 style={{ fontSize: "28px", fontWeight: 600, fontFamily: "var(--F)", color: "var(--ink)", marginBottom: "24px" }}>
                Send a Message
              </h2>

              {status === "sent" ? (
                <div style={{ padding: "40px 24px", textAlign: "center", background: "#D1FAE5", borderRadius: "8px" }}>
                  <CheckCircle size={48} style={{ color: "#065F46", margin: "0 auto 16px" }} />
                  <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#065F46", fontFamily: "var(--F)", marginBottom: "8px" }}>Message Sent</h3>
                  <p style={{ fontSize: "15px", color: "#065F46", fontFamily: "var(--B)" }}>Thank you for reaching out. I'll respond within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label htmlFor="name" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--U)", marginBottom: "6px" }}>Name</label>
                    <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "15px", fontFamily: "var(--B)", background: "white", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--U)", marginBottom: "6px" }}>Email *</label>
                    <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "15px", fontFamily: "var(--B)", background: "white", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label htmlFor="subject" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--U)", marginBottom: "6px" }}>Subject</label>
                    <select id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "15px", fontFamily: "var(--B)", background: "white", boxSizing: "border-box" }}>
                      <option value="">Select a topic...</option>
                      <option value="Speaking">Speaking & Preaching</option>
                      <option value="Coaching">Pastoral Coaching</option>
                      <option value="Consulting">Church Consulting</option>
                      <option value="Writing">Writing & Ghostwriting</option>
                      <option value="Partnership">Ministry Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--U)", marginBottom: "6px" }}>Message *</label>
                    <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "15px", fontFamily: "var(--B)", background: "white", resize: "vertical", boxSizing: "border-box" }} />
                  </div>
                  <button type="submit" disabled={status === "sending"} style={{ padding: "12px 24px", background: status === "sending" ? "var(--ink3)" : "var(--gold)", color: "var(--ink)", border: "none", borderRadius: "4px", fontSize: "15px", fontWeight: 600, fontFamily: "var(--U)", cursor: status === "sending" ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <Send size={16} />
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                  {status === "error" && (
                    <p style={{ color: "#b00020", fontSize: "14px", fontFamily: "var(--U)" }}>Something went wrong. Please try again or email directly.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
