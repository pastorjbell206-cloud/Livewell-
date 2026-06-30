import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { EMAIL_SEQUENCES, type EmailSequence } from "@/data/email-sequences";

const ICON_MAP: Record<string, string> = {
  "story-of-christianity": "\u{1F4DC}",
  "know-your-tradition": "\u{1F5FA}️",
  "when-faith-falls-apart": "\u{1F9ED}",
  "skeptics-path": "\u{1F50D}",
  "faith-in-secular-world": "\u{1F30D}",
  "church-reckoning": "⚖️",
  "when-the-church-hurts": "\u{1F6E1}️",
  "wisdom-beyond-walls": "\u{1F4D6}",
};

export default function EmailSignup() {
  const [selectedSequence, setSelectedSequence] = useState<EmailSequence | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubscribe(seq: EmailSequence) {
    setSelectedSequence(seq);
    setSubmitted(false);
    setName("");
    setEmail("");
    // Scroll to form
    setTimeout(() => {
      document.getElementById("subscribe-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSequence || !name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      // Backend not wired yet — show success
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <SEOMeta
        title="Subscribe to a Reading Path — LiveWell by James Bell"
        description="Get the right reading, in the right order, at the right pace. Eight curated email sequences tied to the post-Christian reading paths."
        url="https://www.livewellbyjamesbell.co/subscribe"
        keywords="email series, reading paths, curated reading, theology emails, deconstruction, church history, faith questions"
      />

      {/* ── HERO ── */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "clamp(80px, 12vw, 140px) 0 clamp(60px, 8vw, 100px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 90% at 85% 50%, rgba(196,146,59,.07), transparent), radial-gradient(ellipse 40% 60% at 5% 90%, rgba(196,146,59,.05), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "var(--w-content)",
            margin: "0 auto",
            padding: "0 32px",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 32,
                height: 1,
                background: "var(--mustard)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--U)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "var(--mustard)",
              }}
            >
              Email Reading Paths
            </span>
            <span
              style={{
                width: 32,
                height: 1,
                background: "var(--mustard)",
                display: "inline-block",
              }}
            />
          </div>

          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              marginBottom: 24,
            }}
          >
            Get the right reading,
            <br />
            in the right order,
            <br />
            at the right <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>pace</em>.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "clamp(16px, 2vw, 18px)",
              color: "rgba(255,255,255,.65)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Eight curated email sequences — each one tied to a reading path through
            the post-Christian series. One email every two to three days. No spam.
            Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── SEQUENCES GRID ── */}
      <section
        style={{
          background: "var(--bone)",
          padding: "clamp(60px, 8vw, 100px) 0",
        }}
      >
        <div
          style={{
            maxWidth: "var(--w-default)",
            margin: "0 auto",
            padding: "0 32px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Choose your path
          </h2>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: 17,
              color: "var(--ink-muted)",
              maxWidth: 600,
              margin: "0 auto 48px",
              lineHeight: 1.75,
              textAlign: "center",
            }}
          >
            Each sequence delivers one reading path as a series of personal emails —
            with context, reflection prompts, and breathing room built in.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {EMAIL_SEQUENCES.map((seq) => (
              <SequenceCard
                key={seq.id}
                sequence={seq}
                icon={ICON_MAP[seq.id] || "\u{1F4E9}"}
                isSelected={selectedSequence?.id === seq.id}
                onSubscribe={() => handleSubscribe(seq)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE FORM ── */}
      {selectedSequence && !submitted && (
        <section
          id="subscribe-form"
          style={{
            background: "var(--bone-warm)",
            padding: "clamp(48px, 6vw, 80px) 0",
          }}
        >
          <div
            style={{
              maxWidth: 520,
              margin: "0 auto",
              padding: "0 32px",
            }}
          >
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 2,
                padding: "clamp(32px, 4vw, 48px)",
              }}
            >
              {/* Mustard top rule */}
              <div
                style={{
                  width: "100%",
                  height: 2,
                  background: "var(--mustard)",
                  marginBottom: 32,
                  marginTop: -8,
                }}
              />

              <p
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: "var(--mustard)",
                  marginBottom: 8,
                }}
              >
                Subscribing to
              </p>
              <h3
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: 400,
                  color: "var(--ink)",
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}
              >
                {selectedSequence.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--B)",
                  fontSize: 14,
                  color: "var(--ink-muted)",
                  marginBottom: 28,
                  lineHeight: 1.7,
                }}
              >
                {selectedSequence.totalEmails} emails over{" "}
                {selectedSequence.emails[selectedSequence.emails.length - 1].day} days
              </p>

              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="subscribe-name"
                  style={{
                    display: "block",
                    fontFamily: "var(--U)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--ink)",
                    marginBottom: 6,
                  }}
                >
                  Name
                </label>
                <input
                  id="subscribe-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your first name"
                  style={{
                    width: "100%",
                    fontFamily: "var(--B)",
                    fontSize: 16,
                    padding: "12px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    background: "#fff",
                    color: "var(--ink)",
                    marginBottom: 18,
                    outline: "none",
                  }}
                />

                <label
                  htmlFor="subscribe-email"
                  style={{
                    display: "block",
                    fontFamily: "var(--U)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--ink)",
                    marginBottom: 6,
                  }}
                >
                  Email
                </label>
                <input
                  id="subscribe-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    fontFamily: "var(--B)",
                    fontSize: 16,
                    padding: "12px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    background: "#fff",
                    color: "var(--ink)",
                    marginBottom: 24,
                    outline: "none",
                  }}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    fontFamily: "var(--U)",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    padding: "15px 32px",
                    background: "var(--ink)",
                    color: "var(--bone)",
                    border: "none",
                    borderBottom: "2px solid var(--mustard)",
                    borderRadius: 2,
                    cursor: submitting ? "wait" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                    transition: "background 0.2s, opacity 0.2s",
                  }}
                >
                  {submitting ? "Subscribing..." : "Start this reading path"}
                </button>
              </form>

              <button
                onClick={() => setSelectedSequence(null)}
                style={{
                  display: "block",
                  margin: "16px auto 0",
                  fontFamily: "var(--U)",
                  fontSize: 12,
                  color: "var(--ink-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textDecorationColor: "var(--border)",
                  textUnderlineOffset: 3,
                }}
              >
                Choose a different path
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── SUCCESS MESSAGE ── */}
      {submitted && selectedSequence && (
        <section
          id="subscribe-form"
          style={{
            background: "var(--bone-warm)",
            padding: "clamp(48px, 6vw, 80px) 0",
          }}
        >
          <div
            style={{
              maxWidth: 520,
              margin: "0 auto",
              padding: "0 32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 2,
                padding: "clamp(40px, 5vw, 56px)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--ok-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: 22,
                  color: "var(--ok)",
                }}
              >
                &#10003;
              </div>
              <h3
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: 400,
                  color: "var(--ink)",
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                You are in.
              </h3>
              <p
                style={{
                  fontFamily: "var(--B)",
                  fontSize: 16,
                  color: "var(--ink-muted)",
                  lineHeight: 1.75,
                  maxWidth: 400,
                  margin: "0 auto 8px",
                }}
              >
                Your first email from <strong style={{ color: "var(--ink)" }}>{selectedSequence.name}</strong>{" "}
                will arrive shortly. {selectedSequence.totalEmails} emails over{" "}
                {selectedSequence.emails[selectedSequence.emails.length - 1].day} days,
                at a pace that gives you room to think.
              </p>
              <p
                style={{
                  fontFamily: "var(--B)",
                  fontSize: 14,
                  color: "var(--ink-muted)",
                  lineHeight: 1.7,
                  marginTop: 16,
                }}
              >
                Check your inbox for a confirmation email.
              </p>

              <button
                onClick={() => {
                  setSelectedSequence(null);
                  setSubmitted(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  marginTop: 28,
                  fontFamily: "var(--U)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  padding: "12px 28px",
                  background: "none",
                  color: "var(--ink)",
                  border: "1px solid var(--border)",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Browse other paths
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT TO EXPECT ── */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "clamp(56px, 7vw, 88px) 0",
        }}
      >
        <div
          style={{
            maxWidth: "var(--w-prose)",
            margin: "0 auto",
            padding: "0 32px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(26px, 3.5vw, 36px)",
              fontWeight: 300,
              color: "#fff",
              marginBottom: 32,
              letterSpacing: "-0.01em",
            }}
          >
            What to expect
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 32,
              textAlign: "center",
            }}
          >
            {[
              {
                label: "Pace",
                detail: "One email every 2–3 days. Room to read, room to think.",
              },
              {
                label: "Voice",
                detail: "Personal letters, not newsletter blasts. Written by James Bell.",
              },
              {
                label: "Promise",
                detail: "No spam. No upsells. Unsubscribe with one click, anytime.",
              },
            ].map((item) => (
              <div key={item.label}>
                <p
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase" as const,
                    color: "var(--mustard)",
                    marginBottom: 10,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: 15,
                    color: "rgba(255,255,255,.65)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* ── SEQUENCE CARD ── */
function SequenceCard({
  sequence,
  icon,
  isSelected,
  onSubscribe,
}: {
  sequence: EmailSequence;
  icon: string;
  isSelected: boolean;
  onSubscribe: () => void;
}) {
  const totalDays = sequence.emails[sequence.emails.length - 1].day;
  const reflectionCount = sequence.emails.filter((e) => e.articleSlug === null).length;

  return (
    <div
      style={{
        background: "var(--card)",
        border: isSelected
          ? "2px solid var(--mustard)"
          : "1px solid var(--border)",
        borderRadius: 2,
        padding: "clamp(24px, 3vw, 32px)",
        display: "flex",
        flexDirection: "column",
        transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
        boxShadow: isSelected ? "0 8px 24px rgba(0,0,0,.08)" : "none",
      }}
    >
      {/* Icon + title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
        <span style={{ fontSize: 26, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{icon}</span>
        <div>
          <h3
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(19px, 2.5vw, 22px)",
              fontWeight: 500,
              color: "var(--ink)",
              lineHeight: 1.25,
              marginBottom: 4,
            }}
          >
            {sequence.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: 14,
          color: "var(--ink-muted)",
          lineHeight: 1.7,
          flex: 1,
          marginBottom: 18,
        }}
      >
        {sequence.description}
      </p>

      {/* Meta */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--U)",
            fontSize: 12,
            color: "var(--ink-muted)",
          }}
        >
          {sequence.totalEmails} emails
        </span>
        <span
          style={{
            width: 1,
            height: 14,
            background: "var(--border)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontFamily: "var(--U)",
            fontSize: 12,
            color: "var(--ink-muted)",
          }}
        >
          {totalDays} days
        </span>
        {reflectionCount > 0 && (
          <>
            <span
              style={{
                width: 1,
                height: 14,
                background: "var(--border)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--U)",
                fontSize: 12,
                color: "var(--ink-muted)",
              }}
            >
              {reflectionCount} reflection{reflectionCount > 1 ? "s" : ""}
            </span>
          </>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onSubscribe}
        style={{
          fontFamily: "var(--U)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.04em",
          padding: "12px 24px",
          background: isSelected ? "var(--ink)" : "transparent",
          color: isSelected ? "var(--bone)" : "var(--ink)",
          border: isSelected ? "none" : "1px solid var(--ink)",
          borderBottom: isSelected ? "2px solid var(--mustard)" : "1px solid var(--ink)",
          borderRadius: 2,
          cursor: "pointer",
          transition: "all 0.2s",
          width: "100%",
        }}
      >
        {isSelected ? "Selected" : "Subscribe"}
      </button>
    </div>
  );
}
