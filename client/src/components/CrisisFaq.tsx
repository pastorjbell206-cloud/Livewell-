import { useState } from "react";

/**
 * CrisisFaq — the "questions people carry" block for the crisis landing
 * pages, extracted from the pattern ChurchHurt.tsx proved (board audit P12).
 * Renders the accordion; pages pass faqPageSchema(items) into SEOMeta's
 * structuredData so search sees the same questions.
 *
 * Care contract for anything rendered here: validate the feeling, never the
 * despair; keep a path to real help visible; inform without posing as the
 * professional.
 */
export interface CrisisFaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: CrisisFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export default function CrisisFaq({ items }: { items: CrisisFaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>QUESTIONS PEOPLE CARRY</p>
        <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>You are not the only one asking this</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
                aria-expanded={openFaq === i}
              >
                <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)" }}>{item.question}</span>
                <span aria-hidden="true" style={{ fontFamily: "var(--U)", fontSize: "18px", color: "var(--ink-muted, #5A5448)", flexShrink: 0, marginLeft: "16px" }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, paddingBottom: "20px", maxWidth: "64ch" }}>
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
