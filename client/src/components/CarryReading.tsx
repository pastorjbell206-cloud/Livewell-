/**
 * "Carry your reading to another device", on /my-library: a file or a link
 * that takes what this browser keeps (highlights and notes, saved pages, the
 * place in plans and tracks, what the reader wrote in the tools) to another
 * browser, with no account and no copy kept by LiveWell (lib/carry.ts).
 *
 * Opening /my-library#carry=... shows what the link holds and brings nothing
 * in until the reader says so; the data leaves the address bar at once.
 */
import { useEffect, useRef, useState } from "react";
import { Download, FolderOpen, Link2 } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import {
  applyCarry,
  buildCarry,
  carryFileName,
  carryFromLinkData,
  carryLink,
  carrySize,
  carryToLinkData,
  describeCarry,
  linkDataInHash,
  parseCarry,
  type CarryFile,
} from "@/lib/carry";

/** What the last bring-in did, kept across the reload that shows it everywhere. */
const DONE_KEY = "livewell-session-carry-done";
const MAX_FILE_BYTES = 6_000_000;

type Status = "" | "saved" | "save-failed" | "nothing" | "copied" | "copy-failed" | "too-big" | "not-ours" | "bring-failed";

const MESSAGES: Record<Exclude<Status, "">, string> = {
  saved: "Saved to your downloads. Open this page on the other device and choose Open a file.",
  "save-failed": "This browser would not save the file. Try Copy a link, or open this page in Safari or Chrome.",
  nothing: "Nothing is kept in this browser yet, so there is nothing to carry.",
  copied: "Link copied. Send it to yourself and open it on the other device.",
  "copy-failed": "This browser would not copy the link. Save a file instead.",
  "too-big": "Too much for a link. Save a file instead.",
  "not-ours": "That isn't a LiveWell reading file, or it was cut short. Nothing was changed.",
  "bring-failed": "Couldn't save to this browser. Nothing here was changed.",
};

const h2: React.CSSProperties = { fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--ink)", margin: "var(--s-2) 0 var(--s-3)" };
const body: React.CSSProperties = { fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink)", maxWidth: "62ch", margin: "0 0 var(--s-3)" };
const small: React.CSSProperties = { fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-muted)", maxWidth: "62ch" };
const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "8px", margin: "var(--s-3) 0" };
const icon = { size: 16, "aria-hidden": true } as const;

function readText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function download(file: CarryFile): boolean {
  try {
    const href = URL.createObjectURL(new Blob([JSON.stringify(file)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = href;
    a.download = carryFileName(file);
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 10_000);
    return true;
  } catch {
    return false;
  }
}

function madeOn(file: CarryFile): string {
  const d = new Date(file.saved);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/**
 * After a bring-in the page reloads, so every list reads the new state; this
 * says what came over.
 */
function readDoneNote(): string {
  try {
    const raw = window.sessionStorage.getItem(DONE_KEY);
    if (raw === null) return "";
    const n = JSON.parse(raw) as { added?: unknown; joined?: unknown };
    return doneLine(Number(n.added) || 0, Number(n.joined) || 0);
  } catch {
    return "";
  }
}

function doneLine(added: number, joined: number): string {
  const parts: string[] = [];
  if (added) parts.push(`${added} ${added === 1 ? "thing" : "things"} added`);
  if (joined) parts.push(`${joined} joined with what was already here`);
  return parts.length ? `Your reading from the other device is here: ${parts.join(", ")}.` : "Your reading from the other device was already here.";
}

/** `reload` is the page reload that shows a bring-in everywhere (a test passes its own). */
export function CarryReading({ reload = () => window.location.reload() }: { reload?: () => void } = {}) {
  const [incoming, setIncoming] = useState<{ file: CarryFile; from: "file" | "link" } | null>(null);
  const [status, setStatus] = useState<Status>("");
  const [done] = useState(readDoneNote);
  const input = useRef<HTMLInputElement>(null);
  const preview = useRef<HTMLHeadingElement>(null);

  // The note about a bring-in is shown once.
  useEffect(() => {
    try {
      window.sessionStorage.removeItem(DONE_KEY);
    } catch {
      /* nothing to clear */
    }
  }, []);

  // A carry link, opened fresh or pasted into this tab: read its data, then
  // take it out of the address bar and the history.
  useEffect(() => {
    let alive = true;
    const take = () => {
      const data = linkDataInHash(window.location.hash);
      if (data === null) return;
      try {
        window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      } catch {
        /* the address keeps its fragment; the page still works */
      }
      void carryFromLinkData(data).then((file) => {
        if (!alive) return;
        if (file) setIncoming({ file, from: "link" });
        else setStatus("not-ours");
      });
    };
    take();
    window.addEventListener("hashchange", take);
    return () => {
      alive = false;
      window.removeEventListener("hashchange", take);
    };
  }, []);

  // A file the reader just chose: focus moves to what it holds. A link opened
  // the page: the page scrolls to it, and focus stays where the page put it.
  useEffect(() => {
    if (!incoming || !preview.current) return;
    if (incoming.from === "link") preview.current.scrollIntoView?.({ block: "start" });
    else preview.current.focus();
  }, [incoming]);

  const saveFile = () => {
    const file = buildCarry();
    if (carrySize(file) === 0) return setStatus("nothing");
    setStatus(download(file) ? "saved" : "save-failed");
  };

  const copyLink = async () => {
    const file = buildCarry();
    if (carrySize(file) === 0) return setStatus("nothing");
    const data = await carryToLinkData(file);
    if (data === null) return setStatus("too-big");
    setStatus((await copyToClipboard(carryLink(data))) ? "copied" : "copy-failed");
  };

  const openFile = async (picked: File | undefined) => {
    if (input.current) input.current.value = "";
    if (!picked) return;
    if (picked.size > MAX_FILE_BYTES) return setStatus("not-ours");
    let file: CarryFile | null;
    try {
      file = parseCarry(await readText(picked));
    } catch {
      file = null;
    }
    if (!file) return setStatus("not-ours");
    setStatus("");
    setIncoming({ file, from: "file" });
  };

  const bringIn = () => {
    if (!incoming) return;
    const result = applyCarry(incoming.file);
    if (!result.ok) return setStatus("bring-failed");
    try {
      window.sessionStorage.setItem(DONE_KEY, JSON.stringify({ added: result.added, joined: result.joined }));
    } catch {
      /* the reload still shows everything; only the note is lost */
    }
    reload();
  };

  const holds = incoming ? describeCarry(incoming.file) : [];

  return (
    <div>
      <div className="eyebrow">Another device</div>
      <h2 style={h2}>Carry your reading to another device</h2>
      <p style={body}>
        What you keep here lives in this browser. To have it on your phone or another computer, save it as a file and open the file there, or copy a link and open the link there. LiveWell keeps no copy and never sees it.
      </p>
      <p style={small}>
        The file holds your highlights and notes, your saved pages, your place in plans and tracks, and what you have written in the tools. Keep it as you would keep a private notebook.
      </p>

      {done && (
        <p role="status" style={{ ...body, fontFamily: "var(--U)", fontSize: "15px", margin: "var(--s-3) 0 0" }}>
          {done}
        </p>
      )}

      {incoming ? (
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", margin: "var(--s-4) 0" }}>
          <h3 ref={preview} tabIndex={-1} className="carry-preview__title" style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)", margin: "0 0 var(--s-2)", scrollMarginTop: "96px" }}>
            {incoming.from === "link" ? "Bring this link's reading onto this device?" : "Bring this file's reading onto this device?"}
          </h3>
          <p style={{ ...small, color: "var(--ink)", margin: "0 0 var(--s-2)" }}>
            {madeOn(incoming.file) ? `Made on ${madeOn(incoming.file)}. ` : ""}
            {holds.length ? "It holds:" : "It holds nothing to bring in."}
          </p>
          {holds.length > 0 && (
            <ul style={{ ...small, color: "var(--ink)", margin: "0 0 var(--s-3)", paddingLeft: "20px", listStyle: "disc" }}>
              {holds.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
          <p style={small}>It adds what this device doesn't have and keeps everything already here.</p>
          <div style={row}>
            {holds.length > 0 && (
              <button type="button" className="btn" onClick={bringIn}>
                Bring it onto this device
              </button>
            )}
            <button
              type="button"
              className="btn btn--quiet"
              onClick={() => {
                setIncoming(null);
                setStatus("");
              }}
            >
              Not now
            </button>
          </div>
        </div>
      ) : (
        <div style={row}>
          <button type="button" className="btn btn--quiet" onClick={saveFile} style={{ gap: "8px" }}>
            <Download {...icon} /> Save a file
          </button>
          <button type="button" className="btn btn--quiet" onClick={() => input.current?.click()} style={{ gap: "8px" }}>
            <FolderOpen {...icon} /> Open a file
          </button>
          <button type="button" className="btn btn--quiet" onClick={() => void copyLink()} style={{ gap: "8px" }}>
            <Link2 {...icon} /> Copy a link
          </button>
          <input
            ref={input}
            type="file"
            accept=".json,application/json"
            aria-label="Choose a LiveWell reading file"
            onChange={(e) => void openFile(e.target.files?.[0])}
            style={{ display: "none" }}
          />
        </div>
      )}

      <p role="status" style={{ ...small, color: "var(--ink)", minHeight: "1.5em", margin: 0 }}>
        {status ? MESSAGES[status] : ""}
      </p>
    </div>
  );
}

export default CarryReading;
