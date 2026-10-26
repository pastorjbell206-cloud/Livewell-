/**
 * VerseRef: a Scripture reference that is a door (master plan 7.1).
 *
 *   <VerseRef reference="John 3:16" />               sheet: the verse opens over the page
 *   <VerseRef reference="John 3:16" mode="link" />   link: straight to the Study Bible chapter
 *   <RefText text={paragraph} />                     every reference in a string made live
 *
 * Sheet mode shows the verses in a Sheet, read from the text-only chapter
 * shards (/bible/text/, a few KB), names the translation with ScriptureNote,
 * and offers "Open in the Study Bible". The trigger is a real link to the
 * chapter, so a new tab, a crawler, or a reader without script still lands
 * there. Use sheet mode only on pages that quote nothing or quote the BSB; on
 * a page that quotes the ESV, use link mode, so one page never shows two
 * translations (master plan 2).
 *
 * A reference the site's parser cannot read (lib/scripture-ref.ts) renders as
 * plain text: never a link to nowhere.
 */
import { Fragment, useEffect, useMemo, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { Link } from "wouter";
import { Sheet } from "@/components/study/Sheet";
import ScriptureNote from "@/components/ScriptureNote";
import { LoadFailed } from "@/components/LoadFailed";
import { formatRef, parseScriptureRef, refHref, type ScriptureRef } from "@/lib/scripture-ref";
import { splitScriptureRefs } from "@/lib/scripture-find";
import { loadPassage, type PassageVerse } from "@/lib/verse-text";

export type VerseRefMode = "sheet" | "link";

export function VerseRef({
  reference,
  children,
  mode = "sheet",
  style,
}: {
  /** The reference as the parser should read it ("John 3:16", "Ps 23"). */
  reference: string;
  /** What the reader sees; the reference itself when omitted. */
  children?: ReactNode;
  mode?: VerseRefMode;
  style?: CSSProperties;
}) {
  const ref = useMemo(() => parseScriptureRef(reference ?? ""), [reference]);
  const label = children ?? reference;
  if (!ref) return <>{label}</>;
  const href = refHref(ref) ?? "/study";
  // A short reference never breaks across lines ("1 Peter / 3:19"); a long list may.
  const className = typeof label === "string" && label.length <= 24 ? "st-verseref st-verseref--keep" : "st-verseref";
  if (mode === "link") {
    return (
      <Link href={href} className={className} style={style}>
        {label}
      </Link>
    );
  }
  return <SheetRef parsed={ref} href={href} label={label} className={className} style={style} />;
}

/** A string with every Scripture reference in it made live; the rest stays as written. */
export function RefText({ text, mode = "sheet" }: { text: string; mode?: VerseRefMode }) {
  const parts = useMemo(() => splitScriptureRefs(text ?? ""), [text]);
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <VerseRef key={i} reference={p.reference} mode={mode}>
            {p.text}
          </VerseRef>
        ),
      )}
    </>
  );
}

function SheetRef({
  parsed,
  href,
  label,
  className,
  style,
}: {
  parsed: ScriptureRef;
  href: string;
  label: ReactNode;
  className: string;
  style?: CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // A new tab, a new window, or a download goes to the Study Bible as a link would.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    // Safari does not focus a link on click; the sheet returns focus to what had it.
    e.currentTarget.focus();
    setOpen(true);
  };
  return (
    <>
      <a href={href} className={className} aria-haspopup="dialog" onClick={onClick} style={style}>
        {label}
      </a>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        title={formatRef(parsed)}
        description="Berean Standard Bible"
        footer={
          <Link href={href} className="st-action" onClick={() => setOpen(false)}>
            Open in the Study Bible
          </Link>
        }
      >
        <Passage parsed={parsed} />
      </Sheet>
    </>
  );
}

/** The sheet's body: loading, failed (with a retry), or the verses and the translation's name. */
function Passage({ parsed }: { parsed: ScriptureRef }) {
  const [nonce, setNonce] = useState(0);
  const [result, setResult] = useState<{ nonce: number; verses: PassageVerse[] | null } | null>(null);
  const [failedAt, setFailedAt] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    loadPassage(parsed)
      .then((verses) => { if (live) setResult({ nonce, verses }); })
      .catch(() => { if (live) setFailedAt(nonce); });
    return () => { live = false; };
  }, [parsed, nonce]);

  if (failedAt === nonce) return <LoadFailed what="The passage" onRetry={() => setNonce((n) => n + 1)} />;
  if (!result || result.nonce !== nonce) return <p className="st-passage__status" role="status">Loading the passage…</p>;
  const { verses } = result;
  if (verses === null) {
    const first = parsed.parts[0].c1;
    const last = parsed.parts[parsed.parts.length - 1].c2;
    return (
      <p className="st-passage__status">
        This passage runs from chapter {first} to chapter {last}. Read it whole in the Study Bible.
      </p>
    );
  }
  if (!verses.length) return <p className="st-passage__status">This chapter has no verse by that number.</p>;

  // Grouped by chapter; a chapter label only when the passage crosses one.
  const groups: { c: number; verses: PassageVerse[] }[] = [];
  for (const v of verses) {
    const last = groups[groups.length - 1];
    if (last && last.c === v.c) last.verses.push(v);
    else groups.push({ c: v.c, verses: [v] });
  }
  const labelled = new Set(groups.map((g) => g.c)).size > 1;
  return (
    <>
      {groups.map((g, i) => (
        <div key={`${g.c}-${i}`} className="st-passage">
          {labelled && <p className="st-passage__chapter">Chapter {g.c}</p>}
          <p className="st-passage__text">
            {g.verses.map((v) => (
              <Fragment key={v.v}>
                <sup className="st-passage__n">{v.v}</sup>
                {v.t || <span className="st-passage__later">[Not in the earliest manuscripts]</span>}{" "}
              </Fragment>
            ))}
          </p>
        </div>
      ))}
      <ScriptureNote rendering="bsb" />
    </>
  );
}

export default VerseRef;
