/**
 * CitationCopy — copies article citations in formats pastors actually use.
 *
 * Three formats:
 *   - Sermon attribution: "James Bell, 'Title,' LiveWell, 2025."
 *   - Chicago Notes-Bibliography (humanities standard)
 *   - APA 7th
 *
 * Why this exists: CLAUDE.md names PCN as the highest-leverage growth
 * channel. Pastors quote and link Bell's pieces in sermons and bulletins;
 * giving them clean attribution removes friction.
 */
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { SITE_NAME, AUTHOR_NAME } from "@/lib/site";

interface CitationCopyProps {
  title: string;
  url: string;
  publishedDate?: string;
}

type Format = "sermon" | "chicago" | "apa";

function buildCitation(
  format: Format,
  title: string,
  url: string,
  publishedDate?: string
): string {
  const date = publishedDate ? new Date(publishedDate) : new Date();
  const year = date.getFullYear();
  const longDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  switch (format) {
    case "sermon":
      return `${AUTHOR_NAME}, "${title}," ${SITE_NAME}, ${year}. ${url}`;
    case "chicago":
      return `${AUTHOR_NAME}. "${title}." ${SITE_NAME}, ${longDate}. ${url}.`;
    case "apa":
      return `${AUTHOR_NAME.split(" ").reverse().join(", ")}. (${year}). ${title}. ${SITE_NAME}. ${url}`;
  }
}

export function CitationCopy({ title, url, publishedDate }: CitationCopyProps) {
  const [open, setOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<Format | null>(null);

  const handleCopy = async (format: Format) => {
    const citation = buildCitation(format, title, url, publishedDate);
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch {
      // clipboard write can fail in non-HTTPS or restrictive iframes; no-op
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Copy citation for this article"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 16px",
          fontFamily: "var(--U)",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--ink-muted)",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <Copy size={14} aria-hidden />
        Cite this
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-modal)",
            padding: "8px",
            minWidth: "240px",
            zIndex: 10,
          }}
        >
          {(["sermon", "chicago", "apa"] as Format[]).map(format => (
            <button
              key={format}
              type="button"
              role="menuitem"
              onClick={() => handleCopy(format)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "10px 12px",
                background:
                  copiedFormat === format ? "var(--bone-warm)" : "transparent",
                border: "none",
                fontFamily: "var(--U)",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--ink)",
                textAlign: "left",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = "var(--bone-warm)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background =
                  copiedFormat === format ? "var(--bone-warm)" : "transparent")
              }
            >
              <span>
                {format === "sermon"
                  ? "Sermon attribution"
                  : format === "chicago"
                    ? "Chicago"
                    : "APA"}
              </span>
              {copiedFormat === format ? (
                <Check size={14} aria-hidden />
              ) : (
                <Copy size={14} aria-hidden />
              )}
            </button>
          ))}
        </div>
      )}
      <span
        role="status"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        {copiedFormat ? "Citation copied" : ""}
      </span>
    </div>
  );
}

export default CitationCopy;
