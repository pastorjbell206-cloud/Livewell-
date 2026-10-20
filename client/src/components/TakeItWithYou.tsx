/**
 * TakeItWithYou: send any page to the reader's phone or inbox, and save it
 * to My Library.
 *
 * Everything goes through the reader's own apps; the site sends nothing and
 * stores nothing about them (James's decision, 2026-10-14):
 *   - On a phone, "Send to my phone" opens the phone's share sheet (Messages,
 *     Mail, WhatsApp, AirDrop...), so the reader picks where it goes.
 *   - On a computer, it opens a panel with a code to scan with the phone's
 *     camera, "Email it to me" (their own email app, with the link filled in),
 *     and "Copy link" (true "Copied" only, through lib/clipboard).
 *   - "Save" keeps the page in My Library (lib/library, this browser only),
 *     and says so plainly when the browser refuses the write.
 */
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { Bookmark, BookmarkCheck, Link2, Mail, MessageSquare, Printer, Share2, Smartphone, X } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { libraryPath, removeFromLibrary, saveToLibrary, useLibrary } from "@/lib/library";

export const SAVE_FAILED = "Couldn't save to this browser — your work here will not survive a reload.";

interface TakeItWithYouProps {
  /** The page's name, as a reader would say it. */
  title: string;
  /** What it is, for My Library: Essay, Find Help, Eight-week plan, Study guide, Tool... */
  kind: string;
  /** The page's path on this site; defaults to the current page. */
  href?: string;
  /** One line that goes in the email or message with the link. */
  summary?: string;
  /** Show a Print button (window.print). */
  print?: boolean;
  /** Show Save (default true). */
  save?: boolean;
  /** Center the buttons (heroes). */
  align?: "start" | "center";
  /** More buttons for this page, after Save and Print (a tool's Start over). */
  extra?: ReactNode;
  /** An essay's own date (publishedAt, else createdAt), kept with the save so My Library can judge it. */
  date?: string;
}

function isTouch(): boolean {
  try {
    return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  } catch {
    return false;
  }
}

function canShare(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

/** The page's full address on the site the reader is on. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.livewellbyjamesbell.co";
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

/** A mailto: link the reader sends to themselves (they type their own address). */
export function emailHref(title: string, url: string, summary?: string): string {
  const body = `${summary ? `${summary}\n\n` : ""}${url}\n\nFrom LiveWell by James Bell`;
  return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

/** An sms: link with the message filled in (the form both iOS and Android accept). */
export function textHref(title: string, url: string): string {
  return `sms:?&body=${encodeURIComponent(`${title} ${url}`)}`;
}

export const takeButton: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minHeight: "44px",
  padding: "10px 16px",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  background: "var(--card)",
  color: "var(--ink)",
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: 1.2,
  cursor: "pointer",
  textDecoration: "none",
};
const primary: React.CSSProperties = { ...takeButton, background: "var(--ink)", color: "var(--bone)", borderColor: "var(--ink)" };

export function TakeItWithYou({ title, kind, href, summary, print = false, save = true, align = "start", extra, date }: TakeItWithYouProps) {
  const path = libraryPath(href ?? (typeof window !== "undefined" ? window.location.pathname + window.location.search : "/"));
  const url = absoluteUrl(path);
  const items = useLibrary();
  const saved = items.some((i) => i.href === path);
  const [status, setStatus] = useState<"" | "saved" | "removed" | "failed">("");
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const send = async () => {
    if (isTouch() && canShare()) {
      try {
        await navigator.share({ title, text: summary ?? title, url });
        return;
      } catch (e) {
        // The reader closed the share sheet: nothing more to do.
        if (e instanceof Error && e.name === "AbortError") return;
        // Anything else (no permission, unsupported data): offer the other ways.
      }
    }
    setOpen((o) => !o);
  };

  const toggleSave = () => {
    const ok = saved ? removeFromLibrary(path) : saveToLibrary({ href: path, title, kind, date: date || undefined });
    setStatus(ok ? (saved ? "removed" : "saved") : "failed");
  };

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="no-print" role="group" aria-label={`Take this with you: ${title}`} style={{ margin: "0 0 var(--s-4)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: align === "center" ? "center" : "flex-start" }}>
        <button ref={triggerRef} type="button" onClick={send} aria-expanded={open} aria-controls={open ? panelId : undefined} style={primary}>
          <Smartphone size={16} aria-hidden /> Send to my phone
        </button>
        {save && (
          <button type="button" onClick={toggleSave} aria-pressed={saved} style={takeButton}>
            {saved ? <BookmarkCheck size={16} aria-hidden /> : <Bookmark size={16} aria-hidden />}
            {saved ? "Saved" : "Save"}
          </button>
        )}
        {print && (
          <button type="button" onClick={() => window.print()} style={takeButton}>
            <Printer size={16} aria-hidden /> Print
          </button>
        )}
        {extra}
      </div>
      <p aria-live="polite" style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.5, color: "var(--ink-muted)", margin: status ? "10px 0 0" : 0, textAlign: align === "center" ? "center" : "left" }}>
        {status === "saved" && (
          <>Saved to <Link href="/my-library" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>My Library</Link>, in this browser.</>
        )}
        {status === "removed" && "Removed from My Library."}
        {status === "failed" && SAVE_FAILED}
      </p>
      {open && <SendPanel id={panelId} title={title} url={url} summary={summary} onClose={close} />}
    </div>
  );
}

/**
 * A compact "Send" for one item in a list (a printable, a saved page): the
 * phone's share sheet on a phone, the same panel as TakeItWithYou elsewhere.
 */
export function SendButton({ title, href, summary, label = "Send" }: { title: string; href: string; summary?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const url = absoluteUrl(href);
  const send = async () => {
    if (isTouch() && canShare()) {
      try {
        await navigator.share({ title, text: summary ?? title, url });
        return;
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return;
      }
    }
    setOpen((o) => !o);
  };
  return (
    <>
      <button ref={triggerRef} type="button" onClick={send} aria-expanded={open} aria-controls={open ? panelId : undefined} aria-label={`Send ${title} to my phone`} style={{ ...takeButton, minWidth: "44px", padding: "8px 12px", fontSize: "13px" }}>
        <Smartphone size={15} aria-hidden /> {label}
      </button>
      {open && (
        <SendPanel
          id={panelId}
          title={title}
          url={url}
          summary={summary}
          onClose={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
        />
      )}
    </>
  );
}

function SendPanel({ id, title, url, summary, onClose }: { id: string; title: string; url: string; summary?: string; onClose: () => void }) {
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");
  const headingRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const touch = isTouch();

  // Into the panel once, as it opens; never again when the page around it
  // re-renders (a keystroke in a journal, a Save), or focus would be taken.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  // Escape closes it while the reader is in it, not from another field or overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panelRef.current?.contains(document.activeElement)) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const doCopy = async () => {
    setCopy((await copyToClipboard(url)) ? "copied" : "failed");
  };

  return (
    <div ref={panelRef} id={id} role="region" aria-label="Send it to your phone" style={{ flexBasis: "100%", marginTop: "12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", padding: "var(--s-4)", maxWidth: "560px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <p ref={headingRef} tabIndex={-1} style={{ fontFamily: "var(--F)", fontSize: "22px", lineHeight: 1.2, color: "var(--ink)", margin: 0, outline: "none" }}>
          Send it to your phone
        </p>
        <button type="button" onClick={onClose} aria-label="Close" style={{ ...takeButton, minHeight: "44px", minWidth: "44px", padding: "8px", border: "none", background: "transparent" }}>
          <X size={18} aria-hidden />
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-4)", alignItems: "center", marginTop: "var(--s-3)" }}>
        {!touch && (
          <figure style={{ margin: 0, textAlign: "center" }}>
            <QrCode text={url} size={168} />
            <figcaption style={{ fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-muted)", marginTop: "8px", maxWidth: "190px" }}>
              Point your phone's camera at the code, then tap the link it shows.
            </figcaption>
          </figure>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "1 1 220px", minWidth: 0 }}>
          <a href={emailHref(title, url, summary)} style={takeButton}>
            <Mail size={16} aria-hidden /> Email it to me
          </a>
          {touch && (
            <a href={textHref(title, url)} style={takeButton}>
              <MessageSquare size={16} aria-hidden /> Text it
            </a>
          )}
          <button type="button" onClick={doCopy} aria-live="polite" style={takeButton}>
            <Link2 size={16} aria-hidden /> {copy === "copied" ? "Copied" : copy === "failed" ? "Couldn't copy" : "Copy link"}
          </button>
          {canShare() && (
            <button type="button" onClick={() => navigator.share({ title, text: summary ?? title, url }).catch(() => {})} style={takeButton}>
              <Share2 size={16} aria-hidden /> Share another way
            </button>
          )}
          <p style={{ fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-muted)", margin: "4px 0 0" }}>
            Email opens your own email app with the link filled in; type your address in the To line to send it to yourself. Nothing is sent or kept by this site.
          </p>
          {copy === "failed" && (
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink)", margin: 0, wordBreak: "break-all" }}>
              Select the address and copy it: {url}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * A QR code for `text`, drawn as SVG in the brand's fixed dark-on-cream (it
 * must stay dark-on-light in dark mode to scan). The encoder loads only when a
 * code is shown.
 */
export function QrCode({ text, size = 160 }: { text: string; size?: number }) {
  // Keyed by the address it was drawn for, so a new address never shows the
  // old code, and nothing needs resetting when the address changes.
  const [drawn, setDrawn] = useState<{ text: string; code: { d: string; n: number } | null } | null>(null);

  useEffect(() => {
    let alive = true;
    import("qrcode-generator")
      .then((m) => {
        const qr = m.default(0, "M");
        qr.addData(text);
        qr.make();
        const n = qr.getModuleCount();
        let d = "";
        for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
        if (alive) setDrawn({ text, code: { d, n } });
      })
      .catch(() => {
        if (alive) setDrawn({ text, code: null });
      });
    return () => {
      alive = false;
    };
  }, [text]);

  const current = drawn?.text === text ? drawn : null;
  const code = current?.code ?? null;
  if (current && !code) {
    return (
      <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", width: size, margin: 0 }}>
        The code couldn't be drawn here. Use Email or Copy link instead.
      </p>
    );
  }
  if (!code) return <div aria-hidden style={{ width: size, height: size, background: "var(--charcoal-fg)", borderRadius: "var(--radius-sm)" }} />;
  const q = 4;
  const w = code.n + q * 2;
  return (
    <svg role="img" aria-label="A code to scan with your phone's camera. It opens this page." viewBox={`${-q} ${-q} ${w} ${w}`} width={size} height={size} shapeRendering="crispEdges" style={{ display: "block", borderRadius: "var(--radius-sm)" }}>
      <rect x={-q} y={-q} width={w} height={w} style={{ fill: "var(--charcoal-fg)" }} />
      <path d={code.d} style={{ fill: "var(--charcoal)" }} />
    </svg>
  );
}
