/**
 * SafetyCheck — the one question every self-check on a heavy subject asks.
 *
 * docs/grow/GROW-PROMPT.md 7.2: every self-check touching mood, marriage,
 * family, addiction, grief, or faith crisis includes a direct, gentle,
 * optional safety question, and any answer that signals risk shows the help
 * block immediately, before and regardless of the score. It sits at the top
 * of the results screen, above the score, so a reader meets it first.
 *
 * The answer is never saved or sent anywhere: it lives in this component's
 * state and is gone when the page closes. The wording is our own, plain and
 * direct, and is not a clinical screener.
 */
import { useState } from "react";
import { CrisisBlock } from "@/components/CrisisBlock";

type Answer = "no" | "self" | "home" | "skip";

const choice = (on: boolean) => ({
  minHeight: "44px",
  padding: "10px 16px",
  borderRadius: "var(--radius-pill)",
  border: `1px solid ${on ? "var(--charcoal)" : "var(--border)"}`,
  background: on ? "var(--charcoal)" : "var(--card)",
  color: on ? "var(--charcoal-fg)" : "var(--ink)",
  fontFamily: "var(--U)",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  textAlign: "left" as const,
});

export function SafetyCheck({ askAboutHome = true }: { askAboutHome?: boolean }) {
  const [answer, setAnswer] = useState<Answer | null>(null);
  const options: { id: Answer; label: string }[] = [
    { id: "no", label: "No" },
    { id: "self", label: "Yes, thoughts of not wanting to be alive, or of hurting myself" },
    ...(askAboutHome ? [{ id: "home" as Answer, label: "Yes, I am afraid of someone I live with" }] : []),
    { id: "skip", label: "I would rather not say" },
  ];
  return (
    <section
      aria-labelledby="safety-check-h"
      style={{ maxWidth: "var(--w-prose)", margin: "0 auto var(--s-4)", padding: "clamp(18px, 3vw, 26px)", background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", textAlign: "left" }}
    >
      <h2 id="safety-check-h" style={{ fontFamily: "var(--F)", fontSize: "clamp(21px, 2.6vw, 25px)", fontWeight: 500, lineHeight: 1.25, color: "var(--ink)", margin: "0 0 8px" }}>
        Before your results, one question you can skip
      </h2>
      <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 14px" }}>
        In the past two weeks, have you had thoughts of not wanting to be alive, or of hurting yourself?
        {askAboutHome && " Or are you afraid of someone you live with?"}
      </p>
      <div role="group" aria-label="Your answer" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {options.map((o) => (
          <button key={o.id} type="button" aria-pressed={answer === o.id} onClick={() => setAnswer(o.id)} style={choice(answer === o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {answer === "self" && (
          <div style={{ marginTop: "var(--s-3)" }}>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 14px" }}>
              Thank you for telling the truth. That took courage, and it matters more than any result below. Please reach a person today. You do not have to be in immediate danger to call, and you do not have to know what to say.
            </p>
            <CrisisBlock heading="Please reach a person today" topics={["suicide"]} />
          </div>
        )}
        {answer === "home" && (
          <div style={{ marginTop: "var(--s-3)" }}>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 14px" }}>
              Your safety comes first, before any result below and before any advice about your marriage or family. Fear of someone at home is not a problem to fix by trying harder. The people on these lines can help you think through what to do next.
            </p>
            <CrisisBlock heading="Help for your safety" topics={["abuse", "suicide"]} />
          </div>
        )}
        {(answer === "no" || answer === "skip") && (
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "14px 0 0" }}>
            If that changes, call or text <a href="tel:988" style={{ color: "var(--ink)", fontWeight: 600 }}>988</a> any hour, or start from <a href="/help" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Find help</a>.
          </p>
        )}
      </div>
      <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "14px 0 0" }}>
        Your answer is not saved or sent anywhere.
      </p>
    </section>
  );
}

export default SafetyCheck;
