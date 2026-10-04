import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { SITE_NAV_GROUPS, type SiteNavLink } from "@/lib/siteNav";
import { PILLARS_V2, PILLAR_COUNT_WORD, pillarUrl } from "@/lib/taxonomy";
import { NewsletterSignup } from "@/components/NewsletterSignup";

/**
 * Footer mirrors the header's mental model: the same groups from
 * lib/siteNav.ts (Read / Study / Answers / Grow / Books, plus the footer-only
 * About group), one link size throughout, laid out on the page grid by the
 * `.site-footer__*` rules in index.css (six columns at desktop, three at
 * tablet, two on a phone). The brand row carries the pillars, derived from
 * PILLARS_V2, and the one real signup form on every Layout page.
 *
 * The footer stays a dark surface in BOTH themes (--charcoal, not --ink).
 */
export default function Footer() {
  const { theme, toggleTheme, followsSystem, followSystemTheme } = useTheme();

  const renderLink = (link: SiteNavLink) =>
    link.external ? (
      <a
        key={link.href + link.label}
        href={link.href}
        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className="site-footer__link"
      >
        {link.label}
      </a>
    ) : (
      <Link key={link.href + link.label} href={link.href} className="site-footer__link">
        {link.label}
      </Link>
    );

  return (
    <footer
      className="site-footer"
      style={{
        background: "var(--charcoal)",
        color: "var(--charcoal-fg)",
        padding: "clamp(40px, 6vw, 64px) 0 20px",
        marginTop: "60px",
        borderTop: "1px solid var(--charcoal-soft)",
      }}
    >
      <div
        style={{
          maxWidth: "calc(var(--w-default) + 2 * var(--gutter))",
          margin: "0 auto",
          padding: "0 var(--gutter)",
          boxSizing: "border-box",
        }}
      >
        {/* Brand + pillars on the left, the newsletter on the right. */}
        <div className="site-footer__top">
          <div>
            <Link href="/" style={{ textDecoration: "none", color: "var(--charcoal-fg)", display: "inline-block" }}>
              <span style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 500, lineHeight: 1, display: "inline-block", paddingBottom: "4px", borderBottom: "2px solid var(--mustard)" }}>
                LiveWell
              </span>
            </Link>
            <p style={{ fontFamily: "var(--F)", fontStyle: "italic", fontSize: "20px", lineHeight: 1.4, margin: "16px 0 24px", maxWidth: "30ch", opacity: 0.85 }}>
              Theology that carries the weight of everyday life.
            </p>
            <h2 className="site-footer__title">
              <Link href="/pillars" style={{ color: "inherit", textDecoration: "none" }}>
                The {PILLAR_COUNT_WORD} pillars
              </Link>
            </h2>
            <ul className="site-footer__pillars">
              {PILLARS_V2.map((p) => (
                <li key={p.slug}>
                  <Link href={pillarUrl(p.slug)} className="site-footer__link">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__signup">
            <NewsletterSignup variant="footer" source="footer" />
          </div>
        </div>

        {/* The nav groups — one source of truth in lib/siteNav.ts, shared with
            the header. Every destination at one size; no second-class tail. */}
        <nav aria-label="Site" className="site-footer__grid">
          {SITE_NAV_GROUPS.map((group) => (
            <div key={group.title}>
              {/* h2, not h3: on a page whose body has only an h1 (notes, the
                  start quiz) an h3 here skips a level (axe heading-order). */}
              <h2 className="site-footer__title">{group.title}</h2>
              <ul className="site-footer__list">
                {group.links.map((l) => (
                  <li key={l.href + l.label}>{renderLink(l)}</li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom bar */}
        <div className="site-footer__bottom">
          <span>&copy; 2026 LiveWell by James Bell. All rights reserved.</span>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
            <a href="/privacy" className="site-footer__link">Privacy Policy</a>
            <a href="/terms" className="site-footer__link">Terms of Service</a>
            <a href="/accessibility" className="site-footer__link">Accessibility</a>
            {toggleTheme && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="site-footer__link"
                style={{ gap: "6px", background: "transparent", border: "none", cursor: "pointer", padding: 0, font: "inherit" }}
              >
                {theme === "dark" ? <Sun size={14} aria-hidden /> : <Moon size={14} aria-hidden />}
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            )}
            {toggleTheme && !followsSystem && (
              <button
                type="button"
                onClick={followSystemTheme}
                className="site-footer__link"
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, font: "inherit" }}
              >
                Match my device
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
