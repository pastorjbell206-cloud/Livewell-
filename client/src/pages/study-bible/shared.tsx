/**
 * Pieces every Study Bible page shares: the page width, the hero, prose
 * paragraphs, section headings, quiet links, the credit line, and a small
 * loader hook that keeps "loading", "failed", and "retry" honest.
 */
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";

import { paragraphs } from "@/lib/bible-notes";
import type { CatalogueItem } from "@/lib/catalogue";

export const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
export const prose = { maxWidth: "68ch" } as const;

export const quietLink: CSSProperties = { color: "var(--ink)", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px", backgroundImage: "none" };

export const kicker: CSSProperties = { fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--mustard-text)" };

export const card: CSSProperties = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" };

export function Hero({ eyebrow, eyebrowHref, title, children, tone = "bone" }: { eyebrow: string; eyebrowHref?: string; title: ReactNode; children?: ReactNode; tone?: "bone" | "charcoal" }) {
  const dark = tone === "charcoal";
  return (
    <section style={{ background: dark ? "var(--charcoal)" : "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
      <div style={wrap}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>
          {eyebrowHref ? <Link href={eyebrowHref} style={{ color: "inherit", textDecoration: "none", backgroundImage: "none" }}>{eyebrow}</Link> : eyebrow}
        </div>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.1rem, 4.8vw, 3.4rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.08, color: dark ? "var(--bone)" : "var(--ink)", margin: "0 0 14px", textWrap: "balance" }}>{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function Lede({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p style={{ fontFamily: "var(--B)", fontSize: "1.1rem", lineHeight: 1.7, color: dark ? "var(--bone-muted)" : "var(--ink-muted)", maxWidth: "64ch", margin: 0 }}>{children}</p>;
}

/** An authored field rendered as paragraphs. */
export function Prose({ text, size = 17 }: { text: string | undefined; size?: number }) {
  return (
    <>
      {paragraphs(text).map((p, i) => (
        <p key={i} style={{ ...prose, fontFamily: "var(--B)", fontSize: `${size}px`, lineHeight: 1.75, color: "var(--ink)", margin: "0 0 14px" }}>{p}</p>
      ))}
    </>
  );
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} style={{ fontFamily: "var(--F)", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 400, color: "var(--ink)", margin: "0 0 14px", scrollMarginTop: "90px" }}>{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 style={{ fontFamily: "var(--F)", fontSize: "1.35rem", fontWeight: 500, color: "var(--ink)", margin: "0 0 8px" }}>{children}</h3>;
}

export function Band({ tone = "bone", children, id }: { tone?: "bone" | "warm"; children: ReactNode; id?: string }) {
  return (
    <section id={id} style={{ background: tone === "warm" ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-6) var(--s-4)", scrollMarginTop: "70px" }}>
      <div style={wrap}>{children}</div>
    </section>
  );
}

export function Pill({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} style={{ display: "inline-flex", alignItems: "center", minHeight: "36px", padding: "0 14px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", color: "var(--ink)", textDecoration: "none", backgroundImage: "none", fontFamily: "var(--U)", fontSize: "13px" }}>
      {children}
    </Link>
  );
}

export function Credits() {
  return (
    <footer style={{ background: "var(--bone-warm)", padding: "var(--s-4)", borderTop: "1px solid var(--border)" }}>
      <p style={{ ...wrap, fontFamily: "var(--U)", fontSize: "12px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 auto" }}>
        English text: the Berean Standard Bible (public domain). Hebrew and Greek texts, dictionaries, and grammar: STEP Bible data from Tyndale House, Cambridge,{" "}
        <a href="https://www.STEPBible.org" target="_blank" rel="noopener noreferrer" style={quietLink}>STEPBible.org</a>, CC BY 4.0. Cross-references:{" "}
        <a href="https://www.openbible.info/labs/cross-references/" target="_blank" rel="noopener noreferrer" style={quietLink}>OpenBible.info</a>, CC BY. Study notes, book introductions, and the story path: LiveWell.
      </p>
    </footer>
  );
}

export function Status({ children }: { children: ReactNode }) {
  return <p role="status" style={{ ...wrap, padding: "var(--s-6) var(--s-4)", fontFamily: "var(--B)", color: "var(--ink-muted)" }}>{children}</p>;
}

/**
 * Load one thing for one key. The result carries its key, so a new key shows
 * "loading" rather than the last key's data, without resetting state inside
 * an effect. `data` is undefined while loading and null when it failed.
 */
export function useLoad<T>(key: string | null, load: () => Promise<T>): { data: T | null | undefined; retry: () => void } {
  const [state, setState] = useState<{ key: string; data: T | null } | null>(null);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (key === null) return;
    let stale = false;
    load()
      .then((d) => { if (!stale) setState({ key, data: d }); })
      .catch(() => { if (!stale) setState({ key, data: null }); });
    return () => { stale = true; };
    // `load` is recreated every render; the key names what it loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, nonce]);
  return {
    data: key !== null && state?.key === `${key}` ? state.data : undefined,
    retry: () => { setState(null); setNonce((n) => n + 1); },
  };
}

/** LiveWell writing related to a passage or doctrine, as cards. */
export function RelatedList({ items }: { items: CatalogueItem[] }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
      {items.map((it) => (
        <li key={`${it.kind}|${it.href}|${it.title}`}>
          <Link href={it.href} style={{ ...card, display: "grid", gap: "4px", height: "100%", padding: "14px var(--s-4)", textDecoration: "none", backgroundImage: "none", color: "var(--ink)" }}>
            <span style={kicker}>{it.kind}</span>
            <span style={{ fontFamily: "var(--F)", fontSize: "1.2rem", lineHeight: 1.2 }}>{it.title}</span>
            {it.summary && <span style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.5, color: "var(--ink-muted)" }}>{it.summary}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
