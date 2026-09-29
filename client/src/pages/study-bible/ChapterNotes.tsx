/**
 * The Study Bible's notes on one chapter, in layers: a heading and summary
 * above the text, then (below it) where the chapter sits in the story, its
 * history and culture, how it is built, the doctrines it teaches, its key
 * Hebrew or Greek words, how it points to Christ, a hard question, questions
 * for reflection, LiveWell's writing on it, and the next step in the story.
 */
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { chapterHref, type BibleBook, type BibleChapter, type BibleVerse } from "@/lib/bible";
import {
  fetchDoctrines,
  fetchNotesIndex,
  fetchStory,
  fetchStoryline,
  flattenStory,
  itemsForPassage,
  readProgress,
  setRead,
  spreadKinds,
  storyPlace,
  translationHref,
  verseRange,
  type ChapterNote,
  type Doctrine,
} from "@/lib/bible-notes";
import { buildIndex, fetchCatalogue, search, type CatalogueItem } from "@/lib/catalogue";
import { Prose, RelatedList, card, kicker, quietLink, useLoad } from "@/pages/study-bible/shared";

const HEB: CSSProperties = { fontFamily: '"SBL Hebrew", "Ezra SIL", "Taamey Frank CLM", "Times New Roman", serif', direction: "rtl" };
const GRK: CSSProperties = { fontFamily: '"SBL Greek", "Gentium Plus", "Times New Roman", serif' };

type Place = { act: { id: string; label: string; title: string } | null; prev: { slug: string; chapter: number } | null; next: { slug: string; chapter: number } | null };

/** Where a chapter sits in the eleven-act story (loaded once, shared). */
export function useStoryPlace(slug: string, chapter: number): Place | null | undefined {
  const { data } = useLoad("story-steps", () =>
    Promise.all([fetchStory(), fetchStoryline()]).then(([story, line]) => ({ steps: flattenStory(story), line }))
  );
  return useMemo(() => {
    if (data === undefined) return undefined;
    if (data === null) return null;
    const p = storyPlace(data.steps, slug, chapter);
    if (!p) return null;
    const l = data.line.find((a) => a.id === p.step.act);
    return {
      act: l ? { id: l.id, label: l.act, title: l.title } : null,
      prev: p.prev ? { slug: p.prev.slug, chapter: p.prev.chapter } : null,
      next: p.next ? { slug: p.next.slug, chapter: p.next.chapter } : null,
    };
  }, [data, slug, chapter]);
}

/** Above the text: the chapter's heading, summary, and place in the story. */
export function ChapterHead({ note, place }: { note: ChapterNote | null | undefined; place: Place | null | undefined }) {
  if (!note) return null;
  return (
    <div style={{ maxWidth: "68ch", marginBottom: "var(--s-5)" }}>
      {place?.act && (
        <p style={{ margin: "0 0 8px" }}>
          <Link href={`/study/bible/story/${place.act.id}`} style={{ ...kicker, textDecoration: "none", backgroundImage: "none" }}>
            {place.act.label} of the story · {place.act.title}
          </Link>
        </p>
      )}
      <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.5rem, 3vw, 1.9rem)", fontWeight: 400, lineHeight: 1.2, color: "var(--ink)", margin: "0 0 10px", textWrap: "balance" }}>{note.title}</h2>
      <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 10px" }}>{note.summary}</p>
      <a href="#notes" style={{ ...quietLink, fontFamily: "var(--U)", fontSize: "13.5px" }}>Read the study notes on this chapter</a>
    </div>
  );
}

/** The chapter's outline, for the side panel when nothing is selected. */
export function OutlinePanel({ note, data, onVerse }: { note: ChapterNote; data: BibleChapter | null; onVerse: (v: BibleVerse) => void }) {
  return (
    <div>
      <div style={{ ...kicker, marginBottom: "10px" }}>This chapter at a glance</div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "2px" }}>
        {note.outline.map((o) => {
          const [a] = verseRange(o.v);
          const verse = data?.verses.find((v) => v.v === a);
          return (
            <li key={o.v}>
              <button type="button" disabled={!verse} onClick={() => verse && onVerse(verse)} style={{ display: "flex", gap: "10px", width: "100%", minHeight: "36px", alignItems: "baseline", padding: "6px 0", border: "none", borderBottom: "1px solid var(--border)", background: "none", cursor: verse ? "pointer" : "default", textAlign: "left" }}>
                <span style={{ flex: "0 0 52px", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)" }}>{o.v.replace("-", "–")}</span>
                <span style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.45, color: "var(--ink)" }}>{o.t}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p style={{ margin: "var(--s-4) 0 0", fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
        Choose a verse number or a word in the text to study it here. <a href="#notes" style={quietLink}>The full notes</a> are below the text.
      </p>
    </div>
  );
}

function Section({ title, open = false, children, id }: { title: string; open?: boolean; children: ReactNode; id?: string }) {
  return (
    <details id={id} open={open} className="sb-section" style={{ borderTop: "1px solid var(--border)", padding: "4px 0" }}>
      <summary style={{ cursor: "pointer", minHeight: "48px", display: "flex", alignItems: "center", fontFamily: "var(--F)", fontSize: "1.35rem", color: "var(--ink)" }}>{title}</summary>
      <div style={{ padding: "4px 0 var(--s-4)" }}>{children}</div>
    </details>
  );
}

export function ChapterNotesBody(props: {
  books: BibleBook[];
  book: BibleBook;
  chapter: number;
  note: ChapterNote;
  data: BibleChapter | null;
  place: Place | null | undefined;
  onWord: (v: BibleVerse, i: number) => void;
  onVerse: (v: BibleVerse) => void;
}) {
  const { books, book, chapter, note, data, place, onWord, onVerse } = props;
  const lang = book.testament === "OT" ? "H" : "G";
  const key = `${book.slug}/${chapter}`;
  const [read, setReadState] = useState(() => readProgress().has(key));
  const [readFor, setReadFor] = useState(key);
  const [saveFailed, setSaveFailed] = useState(false);
  // Moving to another chapter re-reads its progress during render, not in an effect.
  if (readFor !== key) {
    setReadFor(key);
    setReadState(readProgress().has(key));
  }

  const { data: doctrines } = useLoad<Doctrine[]>("doctrines", fetchDoctrines);
  const { data: passages } = useLoad("notes-index", fetchNotesIndex);
  const { data: related } = useLoad<CatalogueItem[]>(doctrines === undefined ? null : `related-${key}`, () =>
    fetchCatalogue().then((c) => {
      const direct = itemsForPassage(c.items, books, book.slug, chapter);
      const idx = buildIndex(c.items);
      const topical = note.doctrines.flatMap((d) => search(idx, doctrines?.find((x) => x.id === d.id)?.terms ?? d.id).results.slice(0, 4));
      return spreadKinds([...direct, ...topical], 6);
    })
  );
  const hasGuide = passages ? passages.passages.includes(key) : false;

  const toggleRead = () => {
    const next = !read;
    if (!setRead(key, next)) setSaveFailed(true);
    setReadState(next);
  };

  // Each key word opens at its first occurrence in the chapter.
  const firstOf = (strong: string): { verse: BibleVerse; index: number; w: string[] } | null => {
    for (const v of data?.verses ?? []) {
      const i = v.w.findIndex((w) => w[3] === strong);
      if (i >= 0) return { verse: v, index: i, w: v.w[i] as unknown as string[] };
    }
    return null;
  };
  const script = lang === "H" ? HEB : GRK;
  const bookName = (slug: string) => books.find((b) => b.slug === slug)?.name ?? slug;

  return (
    <section id="notes" aria-label={`Study notes on ${book.name} ${chapter}`} style={{ scrollMarginTop: "80px", marginTop: "var(--s-6)", maxWidth: "72ch" }}>
      <div style={{ ...kicker, marginBottom: "8px" }}>Study notes</div>
      <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.7rem, 3.4vw, 2.2rem)", fontWeight: 400, lineHeight: 1.15, color: "var(--ink)", margin: "0 0 var(--s-4)" }}>{book.name} {chapter}: {note.title}</h2>

      <Section title="Where we are in the story" open>
        <Prose text={note.story} />
      </Section>
      <Section title="The historical setting">
        <Prose text={note.historical} />
      </Section>
      <Section title="The world behind the text">
        <Prose text={note.cultural} />
      </Section>
      <Section title="How the chapter is built">
        <Prose text={note.literary} />
        <ol style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "grid", gap: "2px" }}>
          {note.outline.map((o) => {
            const [a] = verseRange(o.v);
            const verse = data?.verses.find((v) => v.v === a);
            return (
              <li key={o.v} style={{ display: "flex", gap: "12px", alignItems: "baseline", padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                {verse ? (
                  <a href={`#v${a}`} onClick={() => onVerse(verse)} style={{ ...quietLink, flex: "0 0 64px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600 }}>{chapter}:{o.v.replace("-", "–")}</a>
                ) : <span style={{ flex: "0 0 64px", fontFamily: "var(--U)", fontSize: "13px" }}>{o.v}</span>}
                <span style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.5, color: "var(--ink)" }}>{o.t}</span>
              </li>
            );
          })}
        </ol>
      </Section>
      <Section title="What it teaches">
        <div style={{ display: "grid", gap: "12px" }}>
          {note.doctrines.map((d) => {
            const def = doctrines?.find((x) => x.id === d.id);
            return (
              <div key={d.id} style={{ ...card, padding: "14px var(--s-4)" }}>
                <Link href={`/study/bible/doctrines/${d.id}`} style={{ ...quietLink, fontFamily: "var(--F)", fontSize: "1.2rem", textDecoration: "none" }}>{def?.name ?? d.id}</Link>
                <p style={{ margin: "6px 0 0", fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)" }}>{d.note}</p>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title={lang === "H" ? "Key Hebrew words" : "Key Greek words"}>
        <div style={{ display: "grid", gap: "12px" }}>
          {note.words.map((w) => {
            const at = firstOf(w.s);
            return (
              <div key={w.s} style={{ ...card, padding: "14px var(--s-4)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px" }}>
                  {at && <span lang={lang === "H" ? "he" : "grc"} style={{ ...script, fontSize: "24px", color: "var(--ink)" }}>{at.w[0]}</span>}
                  {at && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}><i>{at.w[1]}</i> · “{at.w[2]}” · {chapter}:{at.verse.v}</span>}
                </div>
                <p style={{ margin: "6px 0 8px", fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)" }}>{w.note}</p>
                {at && (
                  <button type="button" onClick={() => onWord(at.verse, at.index)} style={{ ...quietLink, border: "none", background: "none", padding: 0, cursor: "pointer", fontFamily: "var(--U)", fontSize: "13px" }}>
                    Open the dictionary and every place it appears
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Section>
      <Section title={lang === "H" ? "How it points to Christ" : "What it shows of Christ"}>
        <Prose text={note.christ} />
      </Section>
      {note.hard && (
        <Section title="A hard question">
          <p style={{ maxWidth: "68ch", fontFamily: "var(--F)", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.4, color: "var(--ink)", margin: "0 0 10px" }}>{note.hard.q}</p>
          <Prose text={note.hard.a} />
        </Section>
      )}
      <Section title="For reflection or a group">
        <ol style={{ margin: 0, paddingLeft: "1.3em", display: "grid", gap: "10px" }}>
          {note.questions.map((q, i) => <li key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)" }}>{q}</li>)}
        </ol>
      </Section>

      {(hasGuide || (related && related.length > 0)) && (
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "var(--s-4)", marginTop: "4px" }}>
          <h3 style={{ fontFamily: "var(--F)", fontSize: "1.35rem", fontWeight: 400, margin: "0 0 12px" }}>Go deeper on LiveWell</h3>
          {hasGuide && (
            <p style={{ margin: "0 0 14px", fontFamily: "var(--U)", fontSize: "14px" }}>
              <Link href={`/theology/passage?ref=${encodeURIComponent(`${book.name} ${chapter}`)}`} style={quietLink}>
                The passage guide to {book.name} {chapter}: its flow, common misreadings, and the views Christians hold
              </Link>
            </p>
          )}
          {related && related.length > 0 && <RelatedList items={related} />}
        </div>
      )}

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "var(--s-4)", marginTop: "var(--s-4)", fontFamily: "var(--U)", fontSize: "13.5px", lineHeight: 1.8, color: "var(--ink-muted)" }}>
        Read {book.name} {chapter} in other translations:{" "}
        {["ESV", "NIV", "NASB1995", "CSB", "KJV"].map((v, i) => (
          <span key={v}>
            <a href={translationHref(book.name, chapter, v)} target="_blank" rel="noopener noreferrer" style={quietLink}>{v === "NASB1995" ? "NASB" : v}</a>
            {i < 4 ? " · " : ""}
          </span>
        ))}
      </div>

      <div style={{ ...card, marginTop: "var(--s-5)", padding: "var(--s-4)", display: "grid", gap: "12px" }}>
        <button type="button" aria-pressed={read} onClick={toggleRead} style={{ justifySelf: "start", display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", padding: "0 18px", borderRadius: "999px", border: "1px solid var(--ink)", background: read ? "var(--ink)" : "transparent", color: read ? "var(--bone)" : "var(--ink)", cursor: "pointer", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600 }}>
          {read && <Check size={16} aria-hidden />} {read ? `${book.name} ${chapter} read` : `Mark ${book.name} ${chapter} as read`}
        </button>
        {saveFailed && <p role="alert" style={{ margin: 0, fontSize: "13px", color: "var(--alert)" }}>Couldn't save to this browser — your work here will not survive a reload.</p>}
        {place && (
          <nav aria-label="The story" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px" }}>
            {place.prev ? (
              <Link href={`${chapterHref(place.prev.slug, place.prev.chapter)}?path=story`} style={{ ...quietLink, display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontSize: "14px", textDecoration: "none" }}>
                <ArrowLeft size={15} aria-hidden /> Before this in the story: {bookName(place.prev.slug)} {place.prev.chapter}
              </Link>
            ) : <span />}
            {place.next && (
              <Link href={`${chapterHref(place.next.slug, place.next.chapter)}?path=story`} style={{ ...quietLink, display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontSize: "14px", textDecoration: "none" }}>
                Next in the story: {bookName(place.next.slug)} {place.next.chapter} <ArrowRight size={15} aria-hidden />
              </Link>
            )}
          </nav>
        )}
        {place?.act && (
          <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>
            This chapter belongs to <Link href={`/study/bible/story/${place.act.id}`} style={quietLink}>{place.act.label}: {place.act.title}</Link> in <Link href="/study/bible/story" style={quietLink}>the story of the Bible</Link>.
          </p>
        )}
      </div>
    </section>
  );
}
