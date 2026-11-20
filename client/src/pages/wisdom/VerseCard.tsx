/**
 * One passage on a wisdom topic page: the verse in the Berean Standard Bible
 * with its reference, where it stands (on a topic written in full), and
 * "Read it where it stands": the paragraph it sits in, opened in place from
 * the Study Bible's own files, with the verse picked out, and links into the
 * Study Bible chapter and its notes.
 *
 * The paragraph is the context range a topic written in full names; for the
 * others, the section of the chapter's outline that holds the verse (the
 * chapter note, notes/<book>/<n>.json, which every chapter has). The notes
 * link names the plain-words notes only when the chapter note says they exist
 * (`plain: true`); otherwise it names the Study Bible notes, which always do.
 * Nothing loads until the reader opens it.
 */
import { useId, useState } from "react";
import { Link } from "wouter";
import { BookOpen, Bookmark, BookmarkCheck, Check, ChevronDown, Copy } from "lucide-react";
import { fetchJson } from "@/lib/fetch-json";
import { fetchNote, verseRange, type ChapterNote } from "@/lib/bible-notes";
import { copyToClipboard } from "@/lib/clipboard";
import { chapterName, type EntryVerse } from "@/lib/wisdom";

interface ChapterText {
  verses: { v: number; t: string }[];
}
const isChapterText = (x: unknown): x is ChapterText => !!x && typeof x === "object" && Array.isArray((x as ChapterText).verses);

interface Loaded {
  title: string;
  from: number;
  to: number;
  verses: { v: number; t: string }[];
  plain: boolean;
  section: string | null;
}

async function loadContext(v: EntryVerse): Promise<Loaded> {
  const [text, note] = await Promise.all([
    fetchJson(`/bible/text/${v.slug}/${v.chapter}.json`, isChapterText),
    fetchNote(v.slug, v.chapter).catch(() => null as ChapterNote | null),
  ]);
  let from = v.v1 - 2;
  let to = v.v2 + 2;
  let section: string | null = null;
  if (v.contextAt && v.contextAt.slug === v.slug && v.contextAt.chapter === v.chapter) {
    from = v.contextAt.v1;
    to = v.contextAt.v2;
  } else if (note) {
    const hit = note.outline.find((o) => {
      const [a, b] = verseRange(o.v);
      return v.v1 >= a && v.v1 <= b;
    });
    if (hit) {
      [from, to] = verseRange(hit.v);
      section = hit.t;
    }
  }
  const verses = text.verses.filter((x) => x.v >= Math.max(1, from) && x.v <= to);
  return { title: note?.title ?? chapterName(v.ref), from, to, verses, plain: Boolean(note?.plain), section };
}

export interface VerseCardProps {
  verse: EntryVerse;
  saved: boolean;
  onToggleSave: (v: EntryVerse) => void;
}

export default function VerseCard({ verse, saved, onToggleSave }: VerseCardProps) {
  const [open, setOpen] = useState(false);
  const [ctx, setCtx] = useState<Loaded | null | "failed">(null);
  const [copied, setCopied] = useState<"yes" | "no" | null>(null);
  const panel = useId();
  const chapter = chapterName(verse.ref);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && (ctx === null || ctx === "failed")) {
      setCtx(null);
      loadContext(verse)
        .then(setCtx)
        .catch(() => setCtx("failed"));
    }
  };

  const copy = async () => {
    const ok = await copyToClipboard(`“${verse.text}” (${verse.ref}, BSB)`);
    setCopied(ok ? "yes" : "no");
    window.setTimeout(() => setCopied(null), 2000);
  };

  const studyHref = `/study/bible/${verse.slug}/${verse.chapter}#v${verse.v1}`;
  const notesHref = `/study/bible/${verse.slug}/${verse.chapter}#notes`;

  return (
    <article className="wz-verse">
      <blockquote className="wz-verse__quote">
        <p className="wz-verse__text">{verse.text}</p>
        <cite className="wz-verse__ref">{verse.ref}</cite>
      </blockquote>
      {verse.where && <p className="wz-verse__where">{verse.where}</p>}
      <div className="wz-verse__tools">
        <button type="button" className="wz-verse__open" aria-expanded={open} aria-controls={panel} onClick={toggle}>
          <BookOpen size={16} strokeWidth={1.75} aria-hidden="true" />
          Read it where it stands
          <ChevronDown className="wz-verse__chev" size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button type="button" className="wz-verse__mini" onClick={() => onToggleSave(verse)} aria-pressed={saved} aria-label={saved ? `Remove ${verse.ref} from My Library` : `Save ${verse.ref} to My Library`}>
          {saved ? <BookmarkCheck size={16} strokeWidth={1.75} aria-hidden="true" /> : <Bookmark size={16} strokeWidth={1.75} aria-hidden="true" />}
          <span>{saved ? "Saved" : "Save"}</span>
        </button>
        <button type="button" className="wz-verse__mini" onClick={copy} aria-label={`Copy ${verse.ref}`}>
          {copied === "yes" ? <Check size={16} strokeWidth={1.75} aria-hidden="true" /> : <Copy size={16} strokeWidth={1.75} aria-hidden="true" />}
          <span aria-live="polite">{copied === "yes" ? "Copied" : copied === "no" ? "Copy failed" : "Copy"}</span>
        </button>
      </div>
      <div id={panel} className="wz-context" hidden={!open}>
        {open && ctx === null && <p className="wz-context__wait" role="status">Opening the chapter…</p>}
        {open && ctx === "failed" && (
          <p className="wz-context__wait" role="status">
            The chapter could not be opened just now.{" "}
            <Link href={studyHref} className="wz-link">
              Open {chapter} in the Study Bible
            </Link>
          </p>
        )}
        {open && ctx && ctx !== "failed" && (
          <>
            <p className="wz-context__head">
              {chapter}:{ctx.from}
              {ctx.to > ctx.from ? `–${ctx.to}` : ""}
              {ctx.section ? <span className="wz-context__section"> · {ctx.section}</span> : null}
            </p>
            <p className="wz-context__text">
              {ctx.verses.map((x) => {
                const mine = x.v >= verse.v1 && x.v <= verse.v2;
                return (
                  <span key={x.v} className={mine ? "wz-context__v is-mine" : "wz-context__v"}>
                    <sup>{x.v}</sup>
                    {mine ? <mark>{x.t}</mark> : x.t}{" "}
                  </span>
                );
              })}
            </p>
            <ul className="wz-context__links">
              <li>
                <Link href={studyHref} className="wz-link">
                  Read all of {chapter} in the Study Bible
                </Link>
              </li>
              <li>
                <Link href={notesHref} className="wz-link">
                  {ctx.plain ? `The plain-words notes on ${chapter}` : `The Study Bible notes on ${chapter}`}
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </article>
  );
}
