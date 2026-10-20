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
 *
 * Copies go through lib/clipboard, so "Copied" shows only when the copy
 * happened; when it did not, the citation is shown to select by hand. The
 * menu opens, places itself, and closes the way AudienceShare's does
 * (useShareMenu).
 */
import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { SITE_NAME, AUTHOR_NAME } from "@/lib/site";
import { copyToClipboard } from "@/lib/clipboard";
import { shareMenuItem, shareTrigger, useShareMenu } from "@/components/AudienceShare";

interface CitationCopyProps {
  title: string;
  url: string;
  publishedDate?: string;
  /** The essay's byline; defaults to James Bell. */
  author?: string;
}

type Format = "sermon" | "chicago" | "apa";

const LABELS: Record<Format, string> = { sermon: "Sermon attribution", chicago: "Chicago", apa: "APA" };

export function buildCitation(
  format: Format,
  title: string,
  url: string,
  publishedDate?: string,
  author: string = AUTHOR_NAME
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
      return `${author}, "${title}," ${SITE_NAME}, ${year}. ${url}`;
    case "chicago":
      return `${author}. "${title}." ${SITE_NAME}, ${longDate}. ${url}.`;
    case "apa":
      return `${author.split(" ").reverse().join(", ")}. (${year}). ${title}. ${SITE_NAME}. ${url}`;
  }
}

export function CitationCopy({ title, url, publishedDate, author = AUTHOR_NAME }: CitationCopyProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menu = useShareMenu(wrapRef, buttonRef);
  const [result, setResult] = useState<{ format: Format; copied: boolean; text: string } | null>(null);

  const toggle = () => {
    if (!menu.open) setResult(null);
    menu.toggle();
  };

  const handleCopy = async (format: Format) => {
    const citation = buildCitation(format, title, url, publishedDate, author);
    setResult({ format, copied: await copyToClipboard(citation), text: citation });
  };

  return (
    <div ref={wrapRef} onBlur={menu.onBlur} style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={menu.open}
        aria-controls={menu.open ? menu.menuId : undefined}
        style={shareTrigger}
      >
        <Copy size={16} aria-hidden />
        Cite this
      </button>
      {menu.open && (
        <div id={menu.menuId} style={menu.menuStyle}>
          {(["sermon", "chicago", "apa"] as Format[]).map((format) => {
            const copied = result?.format === format && result.copied;
            return (
              <button
                key={format}
                type="button"
                onClick={() => handleCopy(format)}
                style={{
                  ...shareMenuItem,
                  justifyContent: "space-between",
                  background: copied ? "var(--bone-warm)" : "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bone-warm)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = copied ? "var(--bone-warm)" : "transparent")}
              >
                <span>{LABELS[format]}</span>
                {copied ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600 }}>
                    <Check size={16} aria-hidden /> Copied
                  </span>
                ) : (
                  <Copy size={16} aria-hidden />
                )}
              </button>
            );
          })}
          {result && !result.copied && (
            <div style={{ padding: "8px 12px 10px", fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink)" }}>
              <p style={{ margin: "0 0 6px", color: "var(--ink-muted)" }}>Couldn't copy here. Select the citation and copy it:</p>
              <p style={{ margin: 0, userSelect: "all", WebkitUserSelect: "all", overflowWrap: "anywhere" }}>{result.text}</p>
            </div>
          )}
        </div>
      )}
      <span role="status" className="sr-only">
        {result ? (result.copied ? "Citation copied" : "Couldn't copy the citation") : ""}
      </span>
    </div>
  );
}

export default CitationCopy;
