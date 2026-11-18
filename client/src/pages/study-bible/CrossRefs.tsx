/**
 * A cross-reference read in place: its name as a button, and under it, when
 * opened, the words of that verse (or verses) from the chapter's small text
 * file (bible/text/<book>/<n>.json, about 4 KB), loaded on the tap. Used by
 * the verse panel's Cross-references tab and by step 5 of the guided study.
 * The references themselves come from the chapter file (OpenBible.info).
 */
import { useId, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";

import { BIBLE_TRANSLATION, chapterHref, fetchChapterText, parseRef, type BibleBook, type BibleTextChapter } from "@/lib/bible";
import { useLoad } from "@/pages/study-bible/shared";

/** "Rom.5.8-10": the last verse of the range; "Rom.5.8": null. */
const rangeEnd = (raw: string) => {
  const m = raw.match(/-(\d+)$/);
  return m ? +m[1] : null;
};

export function CrossRef({ raw, books }: { raw: string; books: BibleBook[] }) {
  const ref = parseRef(raw, books);
  const [open, setOpen] = useState(false);
  const panel = useId();
  if (!ref) return null;
  return (
    <li className="wk__xref" data-open={open || undefined}>
      <button type="button" className="wk__xrefbtn" aria-expanded={open} aria-controls={panel} onClick={() => setOpen((o) => !o)}>
        <span>{ref.label}</span>
        <ChevronDown className="wk__chev" size={18} strokeWidth={1.75} aria-hidden />
      </button>
      <div id={panel} hidden={!open} className="wk__xreftext">
        {open && <RefText slug={ref.slug} chapter={ref.chapter} from={ref.verse} to={rangeEnd(raw) ?? ref.verse} label={ref.label} />}
      </div>
    </li>
  );
}

function RefText({ slug, chapter, from, to, label }: { slug: string; chapter: number; from: number; to: number; label: string }) {
  const { data, retry } = useLoad<BibleTextChapter>(`text-${slug}/${chapter}`, () => fetchChapterText(slug, chapter));
  if (data === undefined) return <p role="status" className="wk__kept">Opening {label}…</p>;
  if (data === null)
    return (
      <p className="wk__missing">
        {label} did not load.{" "}
        <button type="button" className="wk__link wk__linkbtn" onClick={retry}>Try again</button>
      </p>
    );
  const verses = data.verses.filter((v) => v.v >= from && v.v <= to && v.t);
  return (
    <>
      <p className="wk__reftext">{verses.map((v) => <span key={v.v}><sup>{v.v}</sup>{v.t} </span>)}</p>
      <p className="wk__kept">
        {BIBLE_TRANSLATION} · <Link href={chapterHref(slug, chapter, from)} className="wk__link">Open {label}</Link>
      </p>
    </>
  );
}

/** A verse's cross-references as a list, or one plain line when it has none. */
export default function CrossRefList({ refs, books }: { refs: string[]; books: BibleBook[] }) {
  if (!refs.length) return <p className="wk__missing">The Study Bible lists no cross-references for this verse.</p>;
  return (
    <ul className="wk__list wk__list--tight">
      {refs.map((r) => <CrossRef key={r} raw={r} books={books} />)}
    </ul>
  );
}
