/**
 * ListenButton: the essay read aloud by the reader's own device.
 *
 * It uses the browser's built-in voice (window.speechSynthesis): no server,
 * no account, nothing recorded or sent. It reads the text of the element it
 * is pointed at (the essay body, never the navigation or the buttons), one
 * passage per utterance: a paragraph, a heading, a list item, or a line of a
 * quotation. Short utterances keep long essays going where one long utterance
 * stalls in some browsers.
 *
 * Pause stops the voice and keeps the place; Resume starts again at the top
 * of the passage it stopped in. That works the same on every phone (Android's
 * own pause does not resume reliably). The voice stops when the reader leaves
 * the page, and the control hides itself where the browser has no voice.
 * Nothing here animates.
 */
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { Headphones, Pause, Play, Square } from "lucide-react";

type Status = "idle" | "playing" | "paused";

/** Elements that begin a new passage; everything else is read as part of the line it sits in. */
const BLOCKS = new Set([
  "P", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "BLOCKQUOTE", "UL", "OL", "DIV", "SECTION", "ARTICLE",
  "ASIDE", "FIGURE", "FIGCAPTION", "PRE", "TABLE", "THEAD", "TBODY", "TR", "TD", "TH", "DL", "DT", "DD",
  "DETAILS", "SUMMARY", "HEADER", "FOOTER", "HR",
]);

/** Never read aloud: controls, footnote marks and back-links, and anything hidden from readers or from print. */
const SKIP = "button, sup, script, style, svg, nav, [aria-hidden='true'], [data-footnote-backref], .no-print";

function inlineText(el: Element): string {
  let text = "";
  el.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) text += child.textContent ?? "";
    else if (child instanceof Element && !child.matches(SKIP)) text += child.tagName === "BR" ? " " : inlineText(child);
  });
  return text;
}

/** The text of `root` as passages to read, in reading order. */
export function passagesOf(root: Element): string[] {
  const out: string[] = [];
  const walk = (el: Element) => {
    let line = "";
    const flush = () => {
      const text = line.replace(/\s+/g, " ").trim();
      if (text) out.push(text);
      line = "";
    };
    el.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        line += child.textContent ?? "";
        return;
      }
      if (!(child instanceof Element) || child.matches(SKIP)) return;
      if (child.tagName === "BR") line += " ";
      else if (BLOCKS.has(child.tagName)) {
        flush();
        walk(child);
      } else line += inlineText(child);
    });
    flush();
  };
  walk(root);
  return out;
}

/** "Title" + "By James Bell" as one spoken line, each part ending on a stop. */
function opening(parts: (string | undefined)[]): string {
  return parts
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p))
    .map((p) => (/[.!?:;]$/.test(p) ? p : `${p}.`))
    .join(" ");
}

export function canSpeak(): boolean {
  try {
    return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
  } catch {
    return false;
  }
}

function hush(run: { current: number }): void {
  run.current += 1;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* nothing is speaking */
  }
}

const tool: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minHeight: "44px",
  padding: "10px 16px",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  background: "transparent",
  color: "var(--ink)",
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: 1.2,
  cursor: "pointer",
};

export function ListenButton({
  target,
  title,
  byline,
}: {
  /** The element whose text is read: the essay body. */
  target: RefObject<HTMLElement | null>;
  /** Read first, before the body. */
  title?: string;
  /** Read after the title ("By James Bell"). */
  byline?: string;
}) {
  const [supported] = useState(canSpeak);
  const [status, setStatus] = useState<Status>("idle");
  const [failed, setFailed] = useState(false);
  const passages = useRef<string[]>([]);
  const place = useRef(0);
  // Bumped on every start, pause, and stop, so a passage that ends after the
  // reader has moved on cannot start the next one.
  const run = useRef(0);
  // Held while it speaks: Chrome can drop an utterance nothing references and
  // never fire its end, which would stall the reading.
  const speaking = useRef<SpeechSynthesisUtterance | null>(null);
  const primary = useRef<HTMLButtonElement>(null);

  // Leaving the page stops the voice: another route unmounts this, and
  // closing the tab or going back fires pagehide.
  useEffect(() => {
    if (!supported) return;
    const onHide = () => hush(run);
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      hush(run);
    };
  }, [supported]);

  if (!supported) return null;

  const readFrom = (start: number) => {
    const synth = window.speechSynthesis;
    hush(run);
    const mine = run.current;
    const lang = document.documentElement.lang || "en-US";
    const say = (i: number) => {
      if (mine !== run.current) return;
      if (i >= passages.current.length) {
        speaking.current = null;
        place.current = 0;
        setStatus("idle");
        return;
      }
      place.current = i;
      const utterance = new SpeechSynthesisUtterance(passages.current[i]);
      utterance.lang = lang;
      utterance.onend = () => say(i + 1);
      utterance.onerror = (e) => {
        if (mine !== run.current) return;
        // Our own Pause and Stop interrupt the voice; anything else means
        // this browser cannot read aloud here.
        if (e.error === "interrupted" || e.error === "canceled") return;
        hush(run);
        speaking.current = null;
        place.current = 0;
        setStatus("idle");
        setFailed(true);
      };
      speaking.current = utterance;
      synth.speak(utterance);
    };
    if (synth.paused) synth.resume();
    say(start);
  };

  const onPrimary = () => {
    if (status === "playing") {
      hush(run);
      setStatus("paused");
      return;
    }
    if (status === "paused") {
      setStatus("playing");
      readFrom(place.current);
      return;
    }
    const body = target.current ? passagesOf(target.current) : [];
    const first = opening([title, byline]);
    passages.current = first ? [first, ...body] : body;
    if (passages.current.length === 0) return;
    setFailed(false);
    setStatus("playing");
    readFrom(0);
  };

  const stop = () => {
    hush(run);
    speaking.current = null;
    place.current = 0;
    setStatus("idle");
    primary.current?.focus();
  };

  return (
    <div className="no-print" style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: "6px 8px" }}>
      {/* One button that changes its word, so focus stays put as it does. */}
      <button ref={primary} type="button" onClick={onPrimary} style={tool}>
        {status === "playing" ? (
          <>
            <Pause size={16} aria-hidden /> Pause
          </>
        ) : status === "paused" ? (
          <>
            <Play size={16} aria-hidden /> Resume
          </>
        ) : (
          <>
            <Headphones size={16} aria-hidden /> Listen
          </>
        )}
      </button>
      {status !== "idle" && (
        <button type="button" onClick={stop} style={tool}>
          <Square size={14} aria-hidden /> Stop
        </button>
      )}
      <span aria-live="polite" style={{ fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-muted)" }}>
        {status === "playing"
          ? "Reading aloud"
          : status === "paused"
            ? "Paused"
            : failed
              ? "This browser couldn't read the essay aloud."
              : ""}
      </span>
    </div>
  );
}

export default ListenButton;
