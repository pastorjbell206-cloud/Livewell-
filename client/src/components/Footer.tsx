import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { SITE_NAV_GROUPS } from "@/lib/siteNav";
import { NewsletterSignup } from "@/components/NewsletterSignup";

// Vertical padding brings each footer link to a ~44px tap target (Apple/Google
// minimum) so the dense footer is easy to hit on a phone; the padding provides
// the row separation, so the column gap below is trimmed to compensate.
const footerLink = { color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "14px", display: "flex", alignItems: "center", minHeight: "44px" } as const;
// The column's long tail: smaller, dimmer, wrapping inline so a dozen deep
// cuts cost three rows instead of twelve. Still comfortably tappable.
const tailLink = { color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "12.5px", display: "inline-flex", alignItems: "center", minHeight: "40px", paddingRight: "14px" } as const;
const colTitle = { fontSize: "13px", fontWeight: "bold", marginBottom: "16px", color: "var(--charcoal-fg)", textTransform: "uppercase", letterSpacing: "1px" } as const;
const legalLink = { color: "rgba(255,255,255,0.75)", textDecoration: "none", display: "inline-flex", alignItems: "center", minHeight: "44px" } as const;
const col = { display: "flex", flexDirection: "column", gap: "0" } as const;

/**
 * Footer mirrors the header's mental model. The six-pillar V2 set is the spine
 * (linked as "The Six Pillars" → /pillars, per docs/TAXONOMY-PROPOSAL.md); the
 * rich hub pages sit under it. "Resources" appears exactly once in navigation
 * (the Resource Hub, labeled Downloads & Study Guides here).
 */
export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  return (
    // charcoal, not --ink: the footer stays a dark surface in BOTH themes (--ink flips light in dark mode)
    <footer style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "clamp(36px, 7vw, 60px) clamp(16px, 4vw, 20px) 20px", marginTop: "60px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "clamp(20px, 4vw, 40px)", marginBottom: "40px" }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "var(--gold)", marginBottom: "12px", fontFamily: "var(--F)" }}>LiveWell</div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", marginBottom: "16px" }}>Theology that carries the weight of everyday life.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://substack.com/@jamesbell333289" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", fontSize: "12px", textDecoration: "none", fontWeight: "600", display: "inline-flex", alignItems: "center", minHeight: "44px" }}>Substack →</a>
            </div>
          </div>

          {/* The nav groups — one source of truth in lib/siteNav.ts, shared with
              the header (Read / Topics / Grow / About, plus the footer-only
              Pastors & Disciple-Makers group). Primary links render full size;
              the rest wrap as a compact tail, so the footer stays short without
              losing a single destination. */}
          {SITE_NAV_GROUPS.map((group) => {
            const main = group.links.filter((l) => l.primary);
            const tail = group.links.filter((l) => !l.primary);
            // A footer-only group has no primary links; its first few links
            // stand in as the full-size rows so the column is not all tail.
            const rows = main.length ? main : tail.slice(0, 4);
            const rest = main.length ? tail : tail.slice(4);
            const renderLink = (link: (typeof group.links)[number], style: React.CSSProperties) =>
              link.external ? (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  style={style}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href + link.label} href={link.href} style={style}>
                  {link.label}
                </Link>
              );
            return (
            <div key={group.title}>
              <h3 style={colTitle}>{group.title}</h3>
              <div style={col}>{rows.map((l) => renderLink(l, footerLink))}</div>
              {rest.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", marginTop: "6px" }}>
                  {rest.map((l) => renderLink(l, tailLink))}
                </div>
              )}
              {/* The one real signup form, on all ~200 Layout pages (QW-25).
                  Anchored under Connect, as before. */}
              {group.title === "About" && (
                <div style={{ marginTop: "18px" }}>
                  <NewsletterSignup variant="footer" source="footer" />
                </div>
              )}
            </div>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
          <span>&copy; 2026 LiveWell by James Bell. All rights reserved.</span>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="/privacy" style={legalLink}>Privacy Policy</a>
            <a href="/terms" style={legalLink}>Terms of Service</a>
            <a href="/accessibility" style={legalLink}>Accessibility</a>
            {toggleTheme && (
              <button onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} style={{ color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", fontSize: "13px", minWidth: "44px", minHeight: "44px", background: "transparent", border: "none", cursor: "pointer" }} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
