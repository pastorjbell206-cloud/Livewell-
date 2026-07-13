/**
 * AdviceDisclaimer — the plain, honest line for pages that touch law, money, or
 * medicine. The editorial standard: inform the reader so they can decide for
 * themselves, and say plainly that this is not professional advice. Quiet and
 * factual, never a legal wall of text.
 *
 *   <AdviceDisclaimer kind="financial" />
 */
type Kind = "financial" | "legal" | "medical";

const LINE: Record<Kind, string> = {
  financial:
    "This is for reflection and formation, not financial advice. For decisions about debt, investing, taxes, or benefits, talk to a qualified financial professional who knows your situation.",
  legal:
    "This is for reflection and formation, not legal advice. For any legal decision, consult a licensed attorney in your jurisdiction.",
  medical:
    "This is for reflection and formation, not medical or mental-health advice. For a health concern, talk to a licensed professional; in an emergency, call your local emergency number.",
};

export function AdviceDisclaimer({ kind }: { kind: Kind }) {
  return (
    <p
      role="note"
      style={{
        maxWidth: "var(--w-prose)",
        margin: "var(--s-4) auto 0",
        padding: "12px 16px",
        fontFamily: "var(--B)",
        fontSize: "13px",
        lineHeight: 1.6,
        color: "var(--ink-muted)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {LINE[kind]}
    </p>
  );
}
