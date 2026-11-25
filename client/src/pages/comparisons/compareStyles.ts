/**
 * The shared look of the six /compare pages, set to the kit's scale: the
 * section label as the kit's small label (.lw-sec-head__label), titles on the
 * shared heading size (--fs-h2), sections on the cream, warm cream and
 * charcoal bands, side padding by the page gutter. The page top is the kit's
 * InnerHead; each page keeps its own words.
 */
export const S = {
  eyebrow: { display: "flex", alignItems: "center", gap: "10px", margin: "0 0 10px", fontFamily: "var(--U)", fontWeight: 500, fontSize: "0.75rem", lineHeight: 1.5, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--mustard-text)" },
  sectionBone: { background: "var(--bone)", padding: "var(--s-6) var(--gutter)" },
  sectionWarm: { background: "var(--bone-warm)", padding: "var(--s-6) var(--gutter)" },
  sectionDark: { background: "var(--charcoal)", padding: "var(--s-6) var(--gutter)" },
  wrap: { maxWidth: "var(--w-content)", margin: "0 auto" },
  wrapNarrow: { maxWidth: "var(--w-prose)", margin: "0 auto" },
  h2: { fontFamily: "var(--F)", fontSize: "var(--fs-h2)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.015em", color: "var(--ink)", margin: "0 0 var(--s-2)", textWrap: "balance" as const },
  h2White: { fontFamily: "var(--F)", fontSize: "var(--fs-h2)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.015em", color: "var(--charcoal-fg)", margin: "0 0 var(--s-2)", textWrap: "balance" as const },
  bodyText: { fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted)", lineHeight: 1.6, marginBottom: "var(--s-4)", maxWidth: "64ch" },
  bodyTextWhite: { fontFamily: "var(--U)", fontSize: "16px", color: "var(--charcoal-fg-muted)", lineHeight: 1.6, marginBottom: "var(--s-3)" },
};
