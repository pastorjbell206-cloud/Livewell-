/**
 * The Study Bible's notes on one chapter, in layers: a heading and summary
 * above the text, with links to the chapter's hard question and its study
 * questions; directly after the text, that hard question and those questions
 * in the open, where a reader who has just finished the chapter meets them;
 * then the notes in drawers: where the chapter sits in the story, its history
 * and culture, how it is built, the doctrines it teaches, its key Hebrew or
 * Greek words, how it points to Christ, LiveWell's writing on it, and the
 * next step in the story.
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
  hardQuestions,
  itemsForPassage,
  readProgress,
  setRead,
  spreadKinds,
  storyPlace,
  verseRange,
  type ChapterNote,
  type Doctrine,
  type VerseNote,
} from "@/lib/bible-notes";
import { buildIndex, fetchCatalogue, search, type CatalogueItem } from "@/lib/catalogue";
import { Gloss, Prose, RelatedList, card, kicker, quietLink, useLoad } from "@/pages/study-bible/shared";
import { VerseByVerse } from "@/pages/study-bible/VerseNotes";

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
  const hard = hardQuestions(note).length;
  const jump: CSSProperties = { ...quietLink, display: "inline-flex", alignItems: "center", minHeight: "36px", fontFamily: "var(--U)", fontSize: "13.5px" };
  return (
    <div style={{ maxWidth: "68ch", marginBottom: "var(--s-3)" }}>
      {place?.act && (
        <p style={{ margin: "0 0 6px" }}>
          <Link href={`/study/bible/story/${place.act.id}`} style={{ ...kicker, textDecoration: "none", backgroundImage: "none" }}>
            {place.act.label} of the story · {place.act.title}
          </Link>
        </p>
      )}
      <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.5rem, 3vw, 1.9rem)", fontWeight: 400, lineHeight: 1.2, color: "var(--ink)", margin: "0 0 8px", textWrap: "balance" }}>{note.title}</h2>
      <p style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.65, color: "var(--ink-muted)", margin: "0 0 4px" }}>{note.summary}</p>
      <p style={{ display: "flex", flexWrap: "wrap", gap: "0 18px", margin: 0 }}>
        {hard > 0 && <a href="#hard-question" style={jump}>{hard > 1 ? `${hard} hard questions` : "A hard question"}</a>}
        <a href="#questions" style={jump}>Study questions</a>
        <a href="#notes" style={jump}>Study notes</a>
      </p>
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
        Tap a verse or a word in the text to study it here. <a href="#notes" style={quietLink}>The full notes</a> are below the text.
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

/**
 * Directly after the text: the chapter's hard question with an answer one tap
 * away, and its study questions in the open. They used to be the last two of
 * fifteen closed drawers, where few readers found them.
 */
function ChapterQuestions({ note }: { note: ChapterNote }) {
  const hard = hardQuestions(note);
  const grouped = !Array.isArray(note.questions);
  const question: CSSProperties = { fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)" };
  return (
    <section aria-label="Questions on this chapter" style={{ marginTop: "var(--s-5)", maxWidth: "72ch", display: "grid", gap: "var(--s-3)" }}>
      {hard.map((h, i) => (
        <div key={i} id={i === 0 ? "hard-question" : undefined} style={{ ...card, borderLeft: "2px solid var(--mustard)", padding: "var(--s-3) var(--s-3) 6px", scrollMarginTop: "90px" }}>
          <h2 style={{ ...kicker, margin: "0 0 8px" }}>{hard.length > 1 ? `A hard question (${i + 1} of ${hard.length})` : "A hard question"}</h2>
          <p style={{ maxWidth: "62ch", fontFamily: "var(--F)", fontSize: "1.3rem", fontStyle: "italic", lineHeight: 1.35, color: "var(--ink)", margin: "0 0 6px" }}>{h.q}</p>
          <details className="sb-section">
            <summary style={{ cursor: "pointer", minHeight: "48px", display: "flex", alignItems: "center", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>Read an answer</summary>
            <div style={{ padding: "4px 0 var(--s-2)" }}><Prose text={h.a} /></div>
          </details>
        </div>
      ))}
      <div id="questions" style={{ ...card, padding: "var(--s-3)", scrollMarginTop: "90px" }}>
        <h2 style={{ ...kicker, margin: "0 0 10px" }}>{grouped ? "Questions for study or a group" : "For reflection or a group"}</h2>
        {Array.isArray(note.questions) ? (
          <ol style={{ margin: 0, paddingLeft: "1.3em", display: "grid", gap: "10px" }}>
            {note.questions.map((q, i) => <li key={i} style={question}>{q}</li>)}
          </ol>
        ) : (
          ([["observe", "What does it say?"], ["interpret", "What does it mean?"], ["apply", "What difference does it make?"]] as const).map(([k, h], n, all) => (
            <div key={k} style={{ marginBottom: n < all.length - 1 ? "14px" : 0 }}>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "1.15rem", fontWeight: 500, color: "var(--ink)", margin: "0 0 6px" }}>{h}</h3>
              <ol style={{ margin: 0, paddingLeft: "1.3em", display: "grid", gap: "8px" }}>
                {(note.questions as Record<string, string[]>)[k].map((q, i) => <li key={i} style={question}>{q}</li>)}
              </ol>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export function ChapterNotesBody(props: {
  books: BibleBook[];
  book: BibleBook;
  chapter: number;
  note: ChapterNote;
  data: BibleChapter | null;
  place: Place | null | undefined;
  verseNotes: VerseNote[] | null;
  onWord: (v: BibleVerse, i: number) => void;
  onVerse: (v: BibleVerse) => void;
}) {
  const { books, book, chapter, note, data, place, verseNotes, onWord, onVerse } = props;
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
      const direct = itemsForPassage(c.items, book.slug, chapter);
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
    <>
    <ChapterQuestions note={note} />
    <section id="notes" aria-label={`Study notes on ${book.name} ${chapter}`} style={{ scrollMarginTop: "80px", marginTop: "var(--s-5)", maxWidth: "72ch" }}>
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
      <Section title="What it teaches" open>
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
                  {at && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}><i>{at.w[1]}</i> · “<Gloss text={at.w[2]} />” · {chapter}:{at.verse.v}</span>}
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
      {verseNotes && verseNotes.length > 0 && (
        <Section title="Verse by verse: context, language, history, doctrine" id="verse-by-verse">
          <VerseByVerse notes={verseNotes} book={book} chapter={chapter} doctrines={doctrines} data={data} onVerse={onVerse} onWord={onWord} />
        </Section>
      )}
      <Section title={lang === "H" ? "How it points to Christ" : "What it shows of Christ"}>
        <Prose text={note.christ} />
      </Section>
      {note.interpretation && (
        <Section title="How it has been read">
          <Prose text={note.interpretation} />
        </Section>
      )}
      {note.text && (
        <Section title="The text and translations">
          <Prose text={note.text} />
        </Section>
      )}
      {note.teach && (
        <Section title="For teaching and preaching">
          <p style={{ maxWidth: "68ch", fontFamily: "var(--F)", fontSize: "1.25rem", lineHeight: 1.4, color: "var(--ink)", margin: "0 0 12px" }}>{note.teach.big}</p>
          <ol style={{ listStyle: "none", margin: "0 0 14px", padding: 0, display: "grid", gap: "2px", maxWidth: "68ch" }}>
            {note.teach.outline.map((o) => (
              <li key={o.v} style={{ display: "flex", gap: "12px", alignItems: "baseline", padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ flex: "0 0 64px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{chapter}:{o.v.replace("-", "\u2013")}</span>
                <span style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.5, color: "var(--ink)" }}>{o.t}</span>
              </li>
            ))}
          </ol>
          <div style={{ ...kicker, margin: "8px 0 6px" }}>Pitfalls to avoid</div>
          <Prose text={note.teach.pitfalls} />
          {note.teach.pastoral && (
            <>
              <div style={{ ...kicker, margin: "8px 0 6px" }}>Teaching it with care</div>
              <Prose text={note.teach.pastoral} />
            </>
          )}
        </Section>
      )}
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
    </>
  );
}
