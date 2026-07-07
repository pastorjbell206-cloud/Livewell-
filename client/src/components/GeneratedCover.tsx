/**
 * GeneratedCover — one on-brand cover for any resource, rendered inline as SVG.
 *
 * The site's study guides, context guides, creeds, and database-managed
 * downloads had no cover art. Rather than hand-make or pre-generate a file per
 * item (which cannot cover the dynamic, admin-managed downloads), this renders
 * the same treatment as the book covers (scripts/build-book-covers.mjs) from
 * a title and a category label: two grounds only (charcoal / cream), mustard
 * as punctuation, a serif title. Nothing is ever coverless.
 *
 * Cover art is a fixed-design artifact — like the committed book-cover SVGs and
 * the OG images, it bakes the brand values so a cover reads the same in light
 * or dark mode. It deliberately does not theme-flip with the :root tokens.
 */
import type { CSSProperties } from "react";

const MUSTARD = "#D4A017";
const THEMES = {
  dark: { ground: "#1A1A1A", title: "#F5F0E6", sub: "#C9C1AE", author: "#F5F0E6", border: "#F5F0E6" },
  cream: { ground: "#F5F0E6", title: "#1A1A1A", sub: "#5A5448", author: "#1A1A1A", border: "#1A1A1A" },
} as const;

export type CoverVariant = keyof typeof THEMES;

function wrapTitle(title: string, fontSize: number, maxWidth = 648): string[] {
  const perChar = fontSize * 0.46;
  const maxChars = Math.max(6, Math.floor(maxWidth / perChar));
  const words = String(title).split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function titleFontSize(title: string): number {
  const parts = String(title).split(/\s+/);
  const longest = parts.reduce((m, w) => Math.max(m, w.length), 0);
  const words = parts.length;
  let size = 128;
  if (longest > 9 || words >= 4) size = 100;
  if (longest > 12 || words >= 6) size = 80;
  if (longest > 16 || words >= 8) size = 62;
  return size;
}

export function GeneratedCover({
  title,
  eyebrow,
  kicker = "LIVEWELL BY JAMES BELL",
  variant = "cream",
  subtitle,
  style,
  className,
}: {
  title: string;
  /** Small uppercase category label at the top (e.g. "STUDY GUIDE"). */
  eyebrow: string;
  /** Small line by the bottom rule; defaults to the brand line. */
  kicker?: string;
  variant?: CoverVariant;
  subtitle?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const t = THEMES[variant];
  const fs = titleFontSize(title);
  const lines = wrapTitle(title, fs);
  const lineHeight = fs * 1.02;
  const blockH = lines.length * lineHeight;
  let ty = 500 - blockH / 2 + fs * 0.8;
  const titleEls = lines.map((ln, i) => {
    const y = Math.round(ty + i * lineHeight);
    return (
      <text key={i} x={76} y={y} fontFamily="Palatino, 'Palatino Linotype', Georgia, serif" fontSize={fs} fontWeight={400} fill={t.title}>
        {ln}
      </text>
    );
  });
  ty += blockH;

  const subLines = subtitle ? wrapTitle(subtitle, 25, 640).slice(0, 3) : [];

  return (
    <svg
      viewBox="0 0 800 1200"
      role="img"
      aria-label={`Cover: ${title}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ display: "block", width: "100%", height: "auto", ...style }}
    >
      <rect width={800} height={1200} fill={t.ground} />
      <rect x={28} y={28} width={744} height={1144} fill="none" stroke={t.border} strokeWidth={1.5} opacity={0.18} />
      <text x={80} y={156} fontFamily="Helvetica, Arial, sans-serif" fontSize={20} letterSpacing={6} fontWeight={700} fill={MUSTARD}>
        {eyebrow.toUpperCase()}
      </text>
      <line x1={80} y1={182} x2={720} y2={182} stroke={MUSTARD} strokeWidth={2} />
      {titleEls}
      {subLines.map((ln, i) => (
        <text key={i} x={80} y={Math.round(ty) + 34 + i * 36} fontFamily="Helvetica, Arial, sans-serif" fontSize={25} fill={t.sub}>
          {ln}
        </text>
      ))}
      <line x1={80} y1={1024} x2={188} y2={1024} stroke={MUSTARD} strokeWidth={3} />
      <text x={80} y={1086} fontFamily="Helvetica, Arial, sans-serif" fontSize={26} letterSpacing={3.5} fontWeight={700} fill={t.author}>
        {kicker}
      </text>
    </svg>
  );
}

/**
 * A theming helper so every resource surface classifies consistently:
 * weighty/church/theology topics take the dark ground, everyday-life topics
 * the cream, matching the book shelf.
 */
export function coverThemeFor(text: string): { variant: CoverVariant; eyebrow: string } {
  const hay = String(text).toLowerCase();
  if (/nationalism|empire|captive|christendom|politic|nation|justice|poor|race|babylon|power/.test(hay))
    return { variant: "dark", eyebrow: "The American Church" };
  if (/doctrine|theolog|creed|confession|trinity|scripture|gospel|cross|resurrection|deconstruct|doubt|apologetic|sacrament|hermeneutic/.test(hay))
    return { variant: "dark", eyebrow: "Theological Depth" };
  if (/pastor|elder|deacon|leadership|ministry|preaching|shepherd|governance|sermon/.test(hay))
    return { variant: "cream", eyebrow: "Pastoral Ministry" };
  if (/marriage|covenant|parent|family|father|mother|manhood|womanhood|children|home|devotion/.test(hay))
    return { variant: "cream", eyebrow: "Marriage & Family" };
  if (/anxiety|anger|money|treasure|attention|rest|sabbath|work|vocation|rhythm|prayer|grief|burnout|loneliness/.test(hay))
    return { variant: "cream", eyebrow: "The Integrated Life" };
  return { variant: "cream", eyebrow: "LiveWell Resource" };
}

export default GeneratedCover;
