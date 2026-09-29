/**
 * The Study Bible's verse-by-verse notes: one entry (in the study panel when a
 * verse is chosen) and the whole chapter's run of entries (below the text),
 * each in its layers: the verse in context, the Hebrew or Greek, the
 * historical background, the doctrine it teaches, the text, and where else
 * Scripture speaks to it.
 */
import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "wouter";

import type { BibleBook, BibleChapter, BibleVerse, BibleWord } from "@/lib/bible";
import { paragraphs, refHref, verseRange, type Doctrine, type VerseNote } from "@/lib/bible-notes";
import { kicker, quietLink } from "@/pages/study-bible/shared";

const HEB: CSSProperties = { fontFamily: '"SBL Hebrew", "Ezra SIL", "Taamey Frank CLM", "Times New Roman", serif', direction: "rtl" };
const GRK: CSSProperties = { fontFamily: '"SBL Greek", "Gentium Plus", "Times New Roman", serif' };

const label: CSSProperties = { ...kicker, fontSize: "10.5px", margin: "12px 0 4px" };
const body: CSSProperties = { fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 8px" };

export type Layer = "all" | "grammar" | "history" | "theology" | "text";
export const LAYERS: { id: Layer; name: string }[] = [
  { id: "all", name: "Everything" },
  { id: "grammar", name: "Hebrew and Greek" },
  { id: "history", name: "History" },
  { id: "theology", name: "Doctrine" },
  { id: "text", name: "Text and quotations" },
];

function Paras({ text }: { text: string }) {
  return <>{paragraphs(text).map((p, i) => <p key={i} style={body}>{p}</p>)}</>;
}

/** One entry's layers. `only` narrows it to one layer (context always shows). */
export function VerseEntry(props: {
  entry: VerseNote;
  books: BibleBook[];
  doctrines: Doctrine[] | null | undefined;
  data: BibleChapter | null;
  lang: "H" | "G";
  only?: Layer;
  onWord?: (v: BibleVerse, i: number) => void;
}) {
  const { entry, books, doctrines, data, lang, only = "all", onWord } = props;
  const show = (l: Layer) => only === "all" || only === l;
  const [a, z] = verseRange(entry.v);
  const script = lang === "H" ? HEB : GRK;
  const chips = useMemo(() => {
    const out: { s: string; verse: BibleVerse; index: number; w: BibleWord }[] = [];
    for (const s of entry.words ?? []) {
      for (const v of data?.verses ?? []) {
        if (v.v < a || v.v > z) continue;
        const i = v.w.findIndex((w) => w[3] === s);
        if (i >= 0) { out.push({ s, verse: v, index: i, w: v.w[i] }); break; }
      }
    }
    return out;
  }, [entry.words, data, a, z]);

  return (
    <div>
      <Paras text={entry.context} />
      {entry.grammar && show("grammar") && (
        <>
          <div style={label}>{lang === "H" ? "The Hebrew" : "The Greek"}</div>
          <Paras text={entry.grammar} />
          {chips.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "0 0 8px" }}>
              {chips.map((c) => (
                <button
                  key={c.s}
                  type="button"
                  disabled={!onWord}
                  onClick={() => onWord?.(c.verse, c.index)}
                  aria-label={`${c.w[1]}, ${c.w[2]}: open the word study`}
                  style={{ display: "inline-flex", alignItems: "baseline", gap: "6px", minHeight: "36px", padding: "4px 10px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", cursor: onWord ? "pointer" : "default", color: "var(--ink)" }}
                >
                  <span lang={lang === "H" ? "he" : "grc"} style={{ ...script, fontSize: "17px" }}>{c.w[0]}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontStyle: "italic", color: "var(--ink-muted)" }}>{c.w[1]}</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
      {entry.history && show("history") && (
        <>
          <div style={label}>Background</div>
          <Paras text={entry.history} />
        </>
      )}
      {entry.theology && entry.theology.length > 0 && show("theology") && (
        <>
          <div style={label}>What it teaches</div>
          {entry.theology.map((t) => (
            <p key={t.id} style={body}>
              <Link href={`/study/bible/doctrines/${t.id}`} style={{ ...quietLink, fontWeight: 600 }}>{doctrines?.find((d) => d.id === t.id)?.name ?? t.id}</Link>. {t.note}
            </p>
          ))}
        </>
      )}
      {entry.text && show("text") && (
        <>
          <div style={label}>The text</div>
          <Paras text={entry.text} />
        </>
      )}
      {(["ot", "nt"] as const).map((k) =>
        entry[k] && entry[k]!.length > 0 && (only === "all" || only === "text") ? (
          <div key={k}>
            <div style={label}>{k === "ot" ? "The Old Testament behind it" : "Where the New Testament takes it up"}</div>
            {entry[k]!.map((x) => {
              const href = refHref(x.ref, books);
              return (
                <p key={x.ref} style={body}>
                  {href ? <Link href={href} style={{ ...quietLink, fontWeight: 600 }}>{x.ref}</Link> : <strong>{x.ref}</strong>}. {x.note}
                </p>
              );
            })}
          </div>
        ) : null
      )}
      {entry.parallels && entry.parallels.length > 0 && only === "all" && (
        <p style={{ margin: "8px 0 0", fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.9, color: "var(--ink-muted)" }}>
          Parallel accounts:{" "}
          {entry.parallels.map((r, i) => {
            const href = refHref(r, books);
            return (
              <span key={r}>
                {href ? <Link href={href} style={quietLink}>{r}</Link> : r}
                {i < entry.parallels!.length - 1 ? " · " : ""}
              </span>
            );
          })}
        </p>
      )}
      {entry.refs && entry.refs.length > 0 && only === "all" && (
        <p style={{ margin: "8px 0 0", fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.9, color: "var(--ink-muted)" }}>
          See also:{" "}
          {entry.refs.map((r, i) => {
            const href = refHref(r, books);
            return (
              <span key={r}>
                {href ? <Link href={href} style={quietLink}>{r}</Link> : r}
                {i < entry.refs!.length - 1 ? " · " : ""}
              </span>
            );
          })}
        </p>
      )}
    </div>
  );
}

const has = (e: VerseNote, l: Layer) =>
  l === "all" ||
  (l === "theology" ? (e.theology?.length ?? 0) > 0 : l === "text" ? Boolean(e.text || e.ot?.length || e.nt?.length) : Boolean(e[l]));

/** Every entry in the chapter, with a filter by layer. */
export function VerseByVerse(props: {
  notes: VerseNote[];
  book: BibleBook;
  chapter: number;
  books: BibleBook[];
  doctrines: Doctrine[] | null | undefined;
  data: BibleChapter | null;
  onVerse: (v: BibleVerse) => void;
  onWord: (v: BibleVerse, i: number) => void;
}) {
  const { notes, book, chapter, data, onVerse } = props;
  const [layer, setLayer] = useState<Layer>("all");
  const lang = book.testament === "OT" ? "H" : "G";
  const shown = notes.filter((e) => has(e, layer));
  return (
    <div>
      <div role="group" aria-label="Show" style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "0 0 var(--s-4)" }}>
        {LAYERS.map((l) => {
          const n = notes.filter((e) => has(e, l.id)).length;
          if (l.id !== "all" && n === 0) return null;
          const on = layer === l.id;
          return (
            <button key={l.id} type="button" aria-pressed={on} onClick={() => setLayer(l.id)} style={{ minHeight: "36px", padding: "0 14px", borderRadius: "999px", border: `1px solid ${on ? "var(--ink)" : "var(--border)"}`, background: on ? "var(--ink)" : "var(--card)", color: on ? "var(--bone)" : "var(--ink)", cursor: "pointer", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600 }}>
              {l.name}{l.id === "all" ? "" : ` (${n})`}
            </button>
          );
        })}
      </div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--s-4)" }}>
        {shown.map((e) => {
          const [a] = verseRange(e.v);
          const verse = data?.verses.find((v) => v.v === a);
          return (
            <li key={e.v} style={{ borderTop: "1px solid var(--border)", paddingTop: "var(--s-3)" }}>
              <h3 style={{ margin: "0 0 6px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 700 }}>
                {verse ? (
                  <a href={`#v${a}`} onClick={() => onVerse(verse)} style={{ ...quietLink, fontFamily: "var(--U)", fontSize: "14px", fontWeight: 700 }}>{book.name} {chapter}:{e.v.replace("-", "–")}</a>
                ) : `${book.name} ${chapter}:${e.v.replace("-", "–")}`}
              </h3>
              <VerseEntry entry={e} books={props.books} doctrines={props.doctrines} data={data} lang={lang} only={layer} onWord={props.onWord} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
