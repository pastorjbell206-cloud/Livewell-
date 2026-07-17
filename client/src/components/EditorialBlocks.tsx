/**
 * Editorial blocks — a small kit of on-brand devices for breaking up long
 * stretches of text with something other than "another card grid." Every block
 * is presentational, styled entirely from the :root tokens (no hardcoded hex),
 * and offers a `tone="dark"` variant so it can sit on the charcoal/ink bands as
 * well as on bone.
 *
 * The point of the kit is rhythm: rotate PullQuote / ScriptureBlock /
 * StatementBand / SectionArt between text sections so no two consecutive
 * stretches use the same visual register. This is the "serious book in a quiet
 * room" way to add relief — typography and generated art, not stock imagery.
 */
import type { ReactNode } from "react";

const proseWrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;

/**
 * A lifted quote, set large in the display serif with a mustard rule above and
 * below — the reachable, component version of the `.pullquote` markdown utility.
 */
export function PullQuote({
  children,
  cite,
  tone,
}: {
  children: ReactNode;
  cite?: string;
  tone?: "dark";
}) {
  const dark = tone === "dark";
  return (
    <figure
      style={{
        ...proseWrap,
        textAlign: "center",
        padding: "0.2em 0",
        margin: "var(--s-5) auto",
      }}
    >
      {/* Hanging quotation mark — the quarterly move: no box, the glyph carries it */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--F)",
          fontSize: "clamp(64px, 8vw, 96px)",
          lineHeight: 0.4,
          color: "var(--mustard)",
          opacity: 0.85,
          userSelect: "none",
          marginBottom: "0.18em",
        }}
      >
        “
      </div>
      <blockquote
        style={{
          fontFamily: "var(--F)",
          fontSize: "clamp(26px, 3.8vw, 38px)",
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 1.28,
          letterSpacing: "-0.012em",
          color: dark ? "var(--charcoal-fg)" : "var(--ink)",
          margin: 0,
        }}
      >
        {children}
      </blockquote>
      {cite && (
        <figcaption
          style={{
            fontFamily: "var(--U)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--mustard-text)",
            marginTop: "1.2em",
          }}
        >
          {cite}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Scripture set apart — the verse in the display serif, the reference traveling
 * with it in a mustard all-caps label (the brand rule: the reference always
 * follows the quote so a reader can check it). Verbatim text is the caller's job.
 */
export function ScriptureBlock({
  reference,
  version,
  children,
  tone,
}: {
  reference: string;
  version?: string;
  children: ReactNode;
  tone?: "dark";
}) {
  const dark = tone === "dark";
  return (
    <figure style={{ ...proseWrap, textAlign: "center", margin: "var(--s-5) auto" }}>
      <blockquote
        style={{
          fontFamily: "var(--F)",
          fontSize: "clamp(22px, 3vw, 30px)",
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 1.42,
          letterSpacing: "-0.005em",
          color: dark ? "var(--charcoal-fg)" : "var(--ink)",
          margin: 0,
        }}
      >
        {children}
      </blockquote>
      <figcaption
        style={{
          fontFamily: "var(--U)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--mustard-text)",
          marginTop: "1.2em",
        }}
      >
        {reference}
        {version ? ` · ${version}` : ""}
      </figcaption>
    </figure>
  );
}

/**
 * A full-width statement band: one sentence, set large and alone, on its own
 * color field. The horizontal "rest" that punctuates a run of card grids.
 */
export function StatementBand({
  children,
  eyebrow,
  cite,
  tone = "dark",
  width = "24ch",
}: {
  children: ReactNode;
  eyebrow?: string;
  cite?: string;
  tone?: "dark" | "light";
  /** Max line width for the statement (e.g. "24ch" punchy, "38ch" for a longer line). */
  width?: string;
}) {
  const dark = tone === "dark";
  return (
    <section
      style={{
        background: dark ? "var(--charcoal)" : "var(--bone-warm)",
        color: dark ? "var(--charcoal-fg)" : "var(--ink)",
        padding: "var(--s-6) var(--s-4)",
      }}
    >
      <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", textAlign: "center" }}>
        {eyebrow && (
          <div
            className="eyebrow"
            style={{ justifyContent: "center", marginBottom: "18px", color: "var(--mustard-text)" }}
          >
            {eyebrow}
          </div>
        )}
        <p
          style={{
            fontFamily: "var(--F)",
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.25,
            letterSpacing: "-0.015em",
            color: dark ? "var(--charcoal-fg)" : "var(--ink)",
            margin: 0,
            maxWidth: width,
            marginInline: "auto",
          }}
        >
          {children}
        </p>
        {cite && (
          <div
            style={{
              fontFamily: "var(--U)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--mustard-text)",
              marginTop: "1.6em",
            }}
          >
            {cite}
          </div>
        )}
      </div>
    </section>
  );
}

/** Tiny deterministic string hash → unsigned 32-bit int (mirrors GeneratedHero). */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * A slim generated divider drawn in the brand tokens — the same procedural
 * language as GeneratedHero, sized down to a horizontal strip so it reads as
 * punctuation between text stretches, not a hero. Deterministic per `seed`.
 */
export function SectionArt({ seed = "livewell", tone }: { seed?: string; tone?: "dark" }) {
  const h = hash(seed);
  const dark = tone === "dark";
  const line = dark ? "var(--bone)" : "var(--ink)";
  const W = 1200;
  const H = 120;
  const CX = W / 2;
  const CY = H / 2;
  const variant = h % 3;

  return (
    <div style={{ padding: "var(--s-4) var(--s-4)", display: "flex", justifyContent: "center" }} aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: "var(--w-content)", height: "auto", display: "block" }} role="presentation">
        {/* The through-line, faded toward the edges. */}
        <defs>
          <linearGradient id={`sa-fade-${variant}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={line} stopOpacity="0" />
            <stop offset="0.5" stopColor={line} stopOpacity="0.28" />
            <stop offset="1" stopColor={line} stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={0} y1={CY} x2={W} y2={CY} stroke={`url(#sa-fade-${variant})`} strokeWidth={1} />

        {variant === 0 && (
          <g>
            {[36, 22, 8].map((r, i) => (
              <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke={i === 1 ? "var(--mustard)" : line} strokeWidth={i === 1 ? 2 : 1} strokeOpacity={i === 1 ? 1 : 0.6} />
            ))}
          </g>
        )}
        {variant === 1 && (
          <g>
            <rect x={CX - 14} y={CY - 14} width={28} height={28} transform={`rotate(45 ${CX} ${CY})`} fill="none" stroke={line} strokeWidth={1} strokeOpacity={0.7} />
            <rect x={CX - 6} y={CY - 6} width={12} height={12} transform={`rotate(45 ${CX} ${CY})`} fill="var(--mustard)" />
          </g>
        )}
        {variant === 2 && (
          <g>
            {[-64, -32, 0, 32, 64].map((dx, i) => (
              <circle key={dx} cx={CX + dx} cy={CY} r={i === 2 ? 6 : 3} fill={i === 2 ? "var(--mustard)" : line} fillOpacity={i === 2 ? 1 : 0.5} />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
