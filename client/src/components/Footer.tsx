import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { APP_ENTRY, DOORS, EVERYTHING_ENTRY, HELP_ENTRY, LEGAL_LINKS, LIBRARY_ENTRY, type CatalogEntry } from "@/lib/siteCatalog";
import { channelUrl, liveChannels } from "@/lib/channels";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import FollowRow from "@/components/FollowRow";

// Vertical padding brings each footer link to a ~44px tap target (Apple/Google
// minimum) so the dense footer is easy to hit on a phone; the padding provides
// the row separation, so the column gap below is trimmed to compensate.
// minHeight keeps a 44px tap target; the vertical padding keeps two links
// apart when a long title wraps onto a second line.
const footerLink = { color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "14px", lineHeight: 1.4, display: "flex", alignItems: "center", minHeight: "44px", padding: "6px 0" } as const;
// The contract's eyebrow: Inter 500, 0.75rem, uppercase, 0.18em tracking. It
// sits on a span inside the h3 because brand-override.css forces every
// heading element to Cormorant 400 !important.
const colTitle = { marginBottom: "16px" } as const;
const colTitleText = { fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, color: "var(--charcoal-fg)", textTransform: "uppercase", letterSpacing: "0.18em" } as const;
// minWidth: a short word ("Terms") still gets a full 44px target.
const legalLink = { color: "rgba(255,255,255,0.75)", textDecoration: "none", display: "inline-flex", alignItems: "center", minHeight: "44px", minWidth: "44px" } as const;
const col = { display: "flex", flexDirection: "column", gap: "0" } as const;

/** True on a phone-width screen (and false where the browser cannot say). */
const PHONE = "(max-width: 640px)";
function usePhoneWidth(): boolean {
  const query = () => (typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(PHONE) : null);
  const [phone, setPhone] = useState(() => query()?.matches ?? false);
  useEffect(() => {
    const mq = query();
    if (!mq?.addEventListener) return;
    const onChange = () => setPhone(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return phone;
}

/** The one line at the foot: My Library, Everything, Downloads, then the legal pages. */
const FOOT_LINE: { name: string; href: string }[] = [
  { name: LIBRARY_ENTRY.name, href: LIBRARY_ENTRY.href },
  { name: EVERYTHING_ENTRY.name, href: EVERYTHING_ENTRY.href },
  { name: APP_ENTRY.name, href: APP_ENTRY.href },
  { name: "Downloads", href: "/downloads" },
  ...LEGAL_LINKS,
];

/** ENDS, the missionary work James founded (lib/channels.ts): its home page, under the brand line. */
const ENDS_URL = channelUrl("ends");
const ENDS_LABEL = liveChannels().find((c) => c.id === "ends")?.label ?? "ENDS";

/** A catalogue entry as a footer link: outbound in a new tab, in-app through wouter. */
function FooterLink({ entry }: { entry: CatalogEntry }) {
  return entry.external ? (
    <a href={entry.href} target="_blank" rel="noopener noreferrer" style={footerLink}>
      {entry.name}
    </a>
  ) : (
    <Link href={entry.href} style={footerLink}>
      {entry.name}
    </Link>
  );
}

/**
 * The footer mirrors the header: the same seven doors from the site catalogue
 * (lib/siteCatalog.ts), each with its own page and its rooms, so nothing
 * behind a header panel is more than one click away here. Under them, the
 * Follow James row, then one line: My Library, Everything on LiveWell,
 * LiveWell on your phone, Downloads, Privacy, Terms, Accessibility. Under the
 * brand line, ENDS, the work James founded, links to its own site. Find Help leads the bottom bar on
 * every page. On a phone each door is one closed row that opens, so the
 * footer stays short.
 */
export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const phone = usePhoneWidth();
  return (
    // charcoal, not --ink: the footer stays a dark surface in BOTH themes (--ink flips light in dark mode)
    <footer style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "clamp(36px, 7vw, 60px) clamp(16px, 4vw, 20px) 20px", marginTop: "60px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Brand */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "22px", fontWeight: 500, color: "var(--gold)", marginBottom: "8px", fontFamily: "var(--F)" }}>LiveWell</div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", margin: 0 }}>Theology that carries the weight of everyday life.</p>
          {ENDS_URL && (
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", margin: "4px 0 0" }}>
              James also founded{" "}
              <a href={ENDS_URL} target="_blank" rel="noopener noreferrer" style={{ ...legalLink, color: "var(--charcoal-fg)", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px" }}>
                {ENDS_LABEL}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: phone ? 0 : "clamp(20px, 3vw, 32px)", marginBottom: "36px" }}>
          {DOORS.map((door) => {
            const links = [door.page, ...door.rooms];
            return (
              <div key={door.id}>
                {phone ? (
                  <details className="ft-group">
                    <summary><h3 style={{ margin: 0 }}><span style={colTitleText}>{door.name}</span></h3></summary>
                    <div style={col}>{links.map((l) => <FooterLink key={l.id} entry={l} />)}</div>
                  </details>
                ) : (
                  <>
                    <h3 style={colTitle}><span style={colTitleText}>{door.name}</span></h3>
                    <div style={col}>{links.map((l) => <FooterLink key={l.id} entry={l} />)}</div>
                  </>
                )}
                {/* The one real signup form, on every page that carries the
                    footer. Anchored under About. */}
                {door.id === "about" && (
                  <div style={{ marginTop: "18px" }}>
                    <NewsletterSignup variant="footer" source="footer" title="Essays by email (Substack)" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Follow James: Substack, Facebook and the feed, on every page
            (one list in lib/channels.ts). */}
        <FollowRow tone="dark" style={{ marginBottom: "20px" }} />

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
          <span>&copy; 2026 LiveWell by James Bell. All rights reserved.</span>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href={HELP_ENTRY.href} style={{ ...legalLink, color: "var(--mustard)", fontWeight: 600 }}>{HELP_ENTRY.name}</Link>
            {FOOT_LINE.map((l) => (
              <Link key={l.href} href={l.href} style={legalLink}>{l.name}</Link>
            ))}
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
