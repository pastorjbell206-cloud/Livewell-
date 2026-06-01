/**
 * ScriptureRef — hover-preview for inline scripture references.
 *
 * On hover (desktop) or tap (touch), shows the verse text. Uses the ESV API
 * (api.esv.org/v3/passage/text/) when VITE_ESV_API_KEY is configured;
 * otherwise falls back to a link to esv.org.
 *
 * To use:
 *   <ScriptureRef reference="John 1:1" />
 *
 * Once a remark plugin in Streamdown wires this up, every `(John 1:1)` in
 * the markdown body becomes a hoverable reference automatically. For now
 * authors can wrap manually.
 *
 * No new colors — uses mustard underline only (palette honored).
 */
import { useState, useRef, useEffect } from "react";

const ESV_KEY = import.meta.env.VITE_ESV_API_KEY as string | undefined;

interface ScriptureRefProps {
  reference: string;
  /** Optional override; if not provided, we fetch from ESV API on hover. */
  text?: string;
}

interface CacheEntry {
  text: string;
  fetchedAt: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

async function fetchVerse(reference: string): Promise<string | null> {
  const cached = cache.get(reference);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.text;
  }
  if (!ESV_KEY) return null;
  try {
    const url = new URL("https://api.esv.org/v3/passage/text/");
    url.searchParams.set("q", reference);
    url.searchParams.set("include-headings", "false");
    url.searchParams.set("include-footnotes", "false");
    url.searchParams.set("include-verse-numbers", "false");
    url.searchParams.set("include-short-copyright", "false");
    url.searchParams.set("include-passage-references", "false");
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Token ${ESV_KEY}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = (data.passages?.[0] ?? "").trim();
    if (text) cache.set(reference, { text, fetchedAt: Date.now() });
    return text || null;
  } catch {
    return null;
  }
}

export function ScriptureRef({ reference, text: preloadedText }: ScriptureRefProps) {
  const [hovered, setHovered] = useState(false);
  const [verseText, setVerseText] = useState<string | null>(preloadedText ?? null);
  const [loading, setLoading] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hovered || verseText || preloadedText) return;
    let cancelled = false;
    setLoading(true);
    fetchVerse(reference).then(text => {
      if (cancelled) return;
      setVerseText(text);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [hovered, reference, verseText, preloadedText]);

  const externalUrl = `https://www.esv.org/${encodeURIComponent(reference)}`;

  return (
    <span
      ref={tooltipRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="scripture-ref"
        style={{
          color: "inherit",
          borderBottom: "1px dotted var(--mustard)",
          textDecoration: "none",
          cursor: "help",
        }}
      >
        {reference}
      </a>
      {hovered && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 50,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderTop: "2px solid var(--mustard)",
            padding: "12px 14px",
            minWidth: "260px",
            maxWidth: "360px",
            boxShadow: "var(--shadow-modal)",
            fontFamily: "var(--F)",
            fontSize: "14px",
            fontStyle: "italic",
            lineHeight: 1.55,
            color: "var(--ink)",
            borderRadius: "var(--radius-sm)",
            cursor: "default",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--U)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mustard-text)",
              fontStyle: "normal",
              marginBottom: "6px",
            }}
          >
            {reference} (ESV)
          </span>
          {verseText ? (
            verseText
          ) : loading ? (
            <span style={{ color: "var(--ink-muted)", fontStyle: "normal" }}>
              Loading…
            </span>
          ) : (
            <span style={{ color: "var(--ink-muted)", fontStyle: "normal" }}>
              Open at esv.org →
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export default ScriptureRef;
