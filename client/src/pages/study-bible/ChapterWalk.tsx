/**
 * "Study this chapter": a guided walk through the chapter on screen, seven
 * short steps, one screen each (lib/study-method.ts names them). It teaches
 * the method by doing it, and it shows only what the chapter's own files hold:
 *
 *   1 Read it            the chapter's text (bible/ch/<book>/<n>.json)
 *   2 Notice             four questions asked of any passage, and a box to write in
 *   3 Its setting        the chapter's summary (notes/<book>/<n>.json) and the
 *                        book's introduction (notes/<book>/intro.json)
 *   4 Its key words      the words the chapter's notes mark (note.words), each
 *                        with its Hebrew or Greek from the text and its
 *                        dictionary entry (bible/lex), loaded when opened
 *   5 Where else         each verse's cross-references (the chapter file's x),
 *                        each opening in place to its text (bible/text)
 *   6 The hard question  note.hard, with the answer one tap behind it
 *   7 What it asks       note.questions, a box to write in, and the next steps:
 *                        the chapter's "Go deeper" list (index/chapters, the
 *                        passage index), else its first doctrine study, else
 *                        the next chapter
 *
 * A step whose piece the chapter lacks says so in one line. The step reached
 * and what the reader writes are kept on this device (lib/bible-desk.ts,
 * livewell-study-walk-v1). It is its own chunk, loaded when opened.
 */
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, CircleHelp, Compass, Copy, Eye, Footprints, Languages, Link2, X } from "lucide-react";

import {
  BIBLE_TRANSLATION,
  chapterBookName,
  chapterHref,
  isPoetry,
  lookupLex,
  occurrenceLine,
  parseRef,
  poetryLines,
  safeDefinition,
  type BibleBook,
  type BibleChapter,
  type LexEntry,
} from "@/lib/bible";
import { fetchDoctrines, fetchIntro, hardQuestions, paragraphs, type ChapterNote } from "@/lib/bible-notes";
import { readWalks, saveWalk, type WalkEntry } from "@/lib/bible-desk";
import { copyToClipboard } from "@/lib/clipboard";
import { KEPT_HERE, NOTICE_QUESTIONS, STUDY_STEPS, type StudyStep } from "@/lib/study-method";
import { LoadFailed } from "@/components/LoadFailed";
import { Gloss, useLoad } from "@/pages/study-bible/shared";
import { CrossRef } from "@/pages/study-bible/CrossRefs";
import { GoDeeperList, useChapterIndex } from "@/components/GoDeeper";
import "./walk.css";

const ICONS: Record<StudyStep["icon"], typeof BookOpen> = { BookOpen, Eye, Compass, Languages, Link2, CircleHelp, Footprints };
const SAVE_FAILED = "Couldn't save to this browser — your work here will not survive a reload.";

export interface ChapterWalkProps {
  books: BibleBook[];
  book: BibleBook;
  chapter: number;
  data: BibleChapter;
  note: ChapterNote | null;
  /** The chapter after this one, if there is one. */
  next: { slug: string; chapter: number } | null;
  onClose: () => void;
}

export default function ChapterWalk(props: ChapterWalkProps) {
  const { book, chapter, onClose } = props;
  const key = `${book.slug}/${chapter}`;
  const label = `${chapterBookName(book)} ${chapter}`;
  const [entry, setEntry] = useState<WalkEntry>(() => {
    const saved = readWalks()[key];
    return saved ? { ...saved, step: Math.min(Math.max(0, saved.step), STUDY_STEPS.length - 1) } : { step: 0, label, updated: new Date().toISOString() };
  });
  const [saveFailed, setSaveFailed] = useState(false);
  const step = STUDY_STEPS[entry.step];
  const body = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  const update = (change: Partial<WalkEntry>) => {
    const next = { ...entry, ...change, label, updated: new Date().toISOString() };
    setEntry(next);
    setSaveFailed(!saveWalk(key, next));
  };
  const go = (n: number) => {
    moved.current = true;
    update({ step: Math.min(Math.max(0, n), STUDY_STEPS.length - 1) });
  };

  // A new step starts at its top, and a keyboard or screen reader lands on its name.
  useEffect(() => {
    if (!moved.current) return;
    body.current?.scrollTo?.({ top: 0 });
    heading.current?.focus();
  }, [entry.step]);

  const Icon = ICONS[step.icon];
  const last = entry.step === STUDY_STEPS.length - 1;

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Content className="wk" aria-describedby={undefined}>
          <header className="wk__bar">
            <div className="wk__barin">
              <div className="wk__where">
                <Dialog.Title className="wk__name">Study {label}</Dialog.Title>
                <p className="wk__count" aria-live="polite">Step {entry.step + 1} of {STUDY_STEPS.length}</p>
              </div>
              <Dialog.Close className="wk__close" aria-label="Close the guided study">
                <X size={20} strokeWidth={1.75} aria-hidden />
              </Dialog.Close>
            </div>
            <ol className="wk__track" aria-label="The seven steps">
              {STUDY_STEPS.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="wk__seg"
                    data-state={i < entry.step ? "done" : i === entry.step ? "now" : "next"}
                    aria-current={i === entry.step ? "step" : undefined}
                    aria-label={`Step ${i + 1}: ${s.title}`}
                    onClick={() => go(i)}
                  >
                    <span aria-hidden />
                  </button>
                </li>
              ))}
            </ol>
          </header>

          <div className="wk__body" ref={body}>
            <div className="wk__col">
              <div className="wk__head">
                <span className="wk__icon" aria-hidden>
                  <Icon size={24} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="wk__n">Step {entry.step + 1}</p>
                  <h2 className="wk__title" ref={heading} tabIndex={-1}>{step.title}</h2>
                </div>
              </div>
              <p className="wk__what">{step.what}</p>
              <StepBody {...props} label={label} step={step} entry={entry} update={update} />
              {saveFailed && <p role="alert" className="wk__alert">{SAVE_FAILED}</p>}
            </div>
          </div>

          <footer className="wk__foot">
            <div className="wk__col wk__nav">
              <button type="button" className="btn btn--quiet wk__back" onClick={() => go(entry.step - 1)} disabled={entry.step === 0}>
                <ArrowLeft size={18} strokeWidth={1.75} aria-hidden /> Back
              </button>
              {last ? (
                <button type="button" className="btn wk__next" onClick={onClose}>Finish</button>
              ) : (
                <button type="button" className="btn wk__next" onClick={() => go(entry.step + 1)}>
                  Next: {STUDY_STEPS[entry.step + 1].title} <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
                </button>
              )}
            </div>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type BodyProps = ChapterWalkProps & { label: string; step: StudyStep; entry: WalkEntry; update: (c: Partial<WalkEntry>) => void };

function StepBody(p: BodyProps) {
  switch (p.step.id) {
    case "read":
      return <ReadStep {...p} />;
    case "notice":
      return <NoticeStep {...p} />;
    case "setting":
      return <SettingStep {...p} />;
    case "words":
      return <WordsStep {...p} />;
    case "scripture":
      return <ScriptureStep {...p} />;
    case "hard":
      return <HardStep {...p} />;
    case "respond":
      return <RespondStep {...p} />;
  }
}

/** A word as it stands in the text, without the punctuation that follows it there ("ἄνωθεν," and "from above,"). */
const bare = (w: string) => w.replace(/[\s,.;:·;!?“”"'()\u0387\u037E\u05C3\u05C0]+$/, "").replace(/^[“"'(]+/, "");

/** One plain line for a piece the chapter does not have. */
const Missing = ({ children }: { children: ReactNode }) => <p className="wk__missing">{children}</p>;

// ── 1. Read it ───────────────────────────────────────────────────────────────

function ReadStep({ data, book, chapter, label }: BodyProps) {
  const poetry = isPoetry(book.slug, chapter);
  return (
    <figure className="wk__card wk__card--text">
      <div className={poetry ? "wk__scripture wk__scripture--poetry" : "wk__scripture"}>
        {data.verses.filter((v) => v.t).map((v) => (
          <span key={v.v} className="wk__verse">
            <sup>{v.v}</sup>
            {poetry ? poetryLines(v.t).map((line, i) => <span key={i} className="wk__line">{line} </span>) : `${v.t} `}
          </span>
        ))}
      </div>
      <figcaption className="wk__src">{label}, {BIBLE_TRANSLATION}</figcaption>
    </figure>
  );
}

// ── 2. Notice ────────────────────────────────────────────────────────────────

function NoticeStep({ entry, update }: BodyProps) {
  return (
    <>
      <ol className="wk__qs">
        {NOTICE_QUESTIONS.map((q, i) => (
          <li key={q}><span className="wk__qn" aria-hidden>{i + 1}</span><span>{q}</span></li>
        ))}
      </ol>
      <Writing label="What I notice" value={entry.notice ?? ""} onChange={(notice) => update({ notice })} />
    </>
  );
}

/** A private box to write in, kept on this device, with a copy button. */
function Writing({ label, value, onChange, copyText }: { label: string; value: string; onChange: (v: string) => void; copyText?: string }) {
  const id = useId();
  const [copied, setCopied] = useState<boolean | null>(null);
  return (
    <div className="wk__write">
      <label htmlFor={id} className="wk__label">{label}</label>
      <textarea id={id} className="wk__area" rows={6} value={value} onChange={(e) => { setCopied(null); onChange(e.target.value); }} />
      <div className="wk__writefoot">
        <p className="wk__kept">{KEPT_HERE}</p>
        <button type="button" className="wk__chip" disabled={!(copyText ?? value).trim()} onClick={() => void copyToClipboard(copyText ?? value).then(setCopied)}>
          <Copy size={16} strokeWidth={1.75} aria-hidden /> {copied === true ? "Copied" : copied === false ? "Couldn’t copy" : "Copy"}
        </button>
      </div>
      <p role="status" className="wk__kept">{copied === false ? "This browser would not copy it. Select the words in the box and copy them by hand." : ""}</p>
    </div>
  );
}

// ── 3. Its setting ───────────────────────────────────────────────────────────

function SettingStep({ book, note }: BodyProps) {
  const { data: intro, retry } = useLoad(`intro-${book.slug}`, () => fetchIntro(book.slug));
  const first = (s: string | undefined) => paragraphs(s)[0];
  return (
    <>
      <section className="wk__card">
        <h3 className="wk__h3">This chapter</h3>
        {note ? <p className="wk__prose">{note.summary}</p> : <Missing>This chapter has no summary in its notes yet.</Missing>}
      </section>
      {intro === undefined ? (
        <p role="status" className="wk__kept">Opening the introduction to {book.name}…</p>
      ) : intro === null ? (
        <LoadFailed what={`The introduction to ${book.name}`} onRetry={retry} />
      ) : (
        <>
          <section className="wk__card">
            <h3 className="wk__h3">Who wrote it</h3>
            <p className="wk__prose">{first(intro.author)}</p>
          </section>
          <section className="wk__card">
            <h3 className="wk__h3">Why it was written</h3>
            <p className="wk__prose">{first(intro.purpose)}</p>
          </section>
          <details className="wk__more">
            <summary>When it was written <ChevronDown size={18} strokeWidth={1.75} aria-hidden /></summary>
            <p className="wk__prose">{first(intro.date)}</p>
          </details>
          <details className="wk__more">
            <summary>The world it was written in <ChevronDown size={18} strokeWidth={1.75} aria-hidden /></summary>
            <p className="wk__prose">{first(intro.setting)}</p>
          </details>
        </>
      )}
      <p className="wk__onward">
        <Link href={`/study/bible/${book.slug}`} className="wk__link">Read the whole introduction to {book.name}</Link>
      </p>
    </>
  );
}

// ── 4. Its key words ─────────────────────────────────────────────────────────

function WordsStep({ data, note, chapter, books, book }: BodyProps) {
  const lang = book.testament === "OT" ? "H" : "G";
  const words = useMemo(() => {
    const out: { s: string; note: string; verse: number; w: [string, string, string] }[] = [];
    for (const k of note?.words ?? []) {
      for (const v of data.verses) {
        const hit = v.w.find((w) => w[3] === k.s);
        if (hit) { out.push({ s: k.s, note: k.note, verse: v.v, w: [bare(hit[0]), hit[1], bare(hit[2])] }); break; }
      }
    }
    return out;
  }, [data, note]);
  if (!words.length) return <Missing>The notes on this chapter do not mark any key words yet.</Missing>;
  return (
    <ul className="wk__list">
      {words.map((w) => <WordCard key={w.s} {...w} lang={lang} chapter={chapter} books={books} />)}
    </ul>
  );
}

function WordCard({ s, note, verse, w, lang, chapter, books }: { s: string; note: string; verse: number; w: [string, string, string]; lang: "H" | "G"; chapter: number; books: BibleBook[] }) {
  const [open, setOpen] = useState(false);
  const panel = useId();
  return (
    <li className="wk__card wk__word" data-open={open || undefined}>
      <button type="button" className="wk__wordbtn" aria-expanded={open} aria-controls={panel} onClick={() => setOpen((o) => !o)}>
        <span className="wk__orig" lang={lang === "H" ? "he" : "grc"} dir={lang === "H" ? "rtl" : undefined}>{w[0]}</span>
        <span className="wk__wordmeta">
          <i>{w[1]}</i> · “<Gloss text={w[2]} />” · {chapter}:{verse}
        </span>
        <ChevronDown className="wk__chev" size={20} strokeWidth={1.75} aria-hidden />
      </button>
      <div id={panel} hidden={!open}>
        <p className="wk__prose">{note}</p>
        {open && <Lexicon strong={s} lang={lang} books={books} />}
      </div>
    </li>
  );
}

function Lexicon({ strong, lang, books }: { strong: string; lang: "H" | "G"; books: BibleBook[] }) {
  const { data: lex, retry } = useLoad<{ key: string; entry: LexEntry } | null>(`lex-${strong}`, () => lookupLex(strong));
  if (lex === undefined) return <p role="status" className="wk__kept">Looking it up…</p>;
  if (lex === null) return <p className="wk__missing">The dictionary has no entry for this word. <button type="button" className="wk__link wk__linkbtn" onClick={retry}>Try again</button></p>;
  const refs = lex.entry.r.map((r) => parseRef(r, books)).filter(Boolean).slice(0, 12) as NonNullable<ReturnType<typeof parseRef>>[];
  return (
    <div className="wk__lex">
      <p className="wk__lexhead">
        <span lang={lang === "H" ? "he" : "grc"} className="wk__lemma">{lex.entry.l}</span> <i>{lex.entry.tr}</i> · “{lex.entry.g}”
      </p>
      <details className="wk__more wk__more--flat">
        <summary>The dictionary entry <ChevronDown size={18} strokeWidth={1.75} aria-hidden /></summary>
        <div className="wk__def" dangerouslySetInnerHTML={{ __html: safeDefinition(lex.entry.d) }} />
      </details>
      <p className="wk__h4">Where else it appears</p>
      <p className="wk__kept">{occurrenceLine(lex.entry.n, lex.entry.r.length, lang)}{refs.length < lex.entry.r.length ? ` These are the first ${refs.length}.` : ""}</p>
      <p className="wk__refs">
        {refs.map((r, i) => (
          <span key={`${r.label}${i}`}>
            <Link href={chapterHref(r.slug, r.chapter, r.verse)} className="wk__link">{r.label}</Link>
            {i < refs.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}

// ── 5. Where else Scripture says this ────────────────────────────────────────

function ScriptureStep({ data, books, chapter }: BodyProps) {
  const withRefs = data.verses.filter((v) => (v.x ?? []).length > 0);
  const [at, setAt] = useState(() => withRefs[0]?.v ?? 0);
  const selectId = useId();
  if (!withRefs.length) return <Missing>The Study Bible lists no cross-references for this chapter.</Missing>;
  const i = Math.max(0, withRefs.findIndex((v) => v.v === at));
  const verse = withRefs[i];
  return (
    <>
      <div className="wk__picker">
        <button type="button" className="wk__round" aria-label="The verse before" disabled={i === 0} onClick={() => setAt(withRefs[i - 1].v)}><ArrowLeft size={18} strokeWidth={1.75} aria-hidden /></button>
        <label htmlFor={selectId} className="sr-only">Choose a verse</label>
        <select id={selectId} className="wk__select" value={verse.v} onChange={(e) => setAt(+e.target.value)}>
          {withRefs.map((v) => <option key={v.v} value={v.v}>Verse {v.v}</option>)}
        </select>
        <button type="button" className="wk__round" aria-label="The next verse" disabled={i === withRefs.length - 1} onClick={() => setAt(withRefs[i + 1].v)}><ArrowRight size={18} strokeWidth={1.75} aria-hidden /></button>
      </div>
      <blockquote className="wk__quote">
        <p><sup>{verse.v}</sup>{verse.t}</p>
      </blockquote>
      <p className="wk__h4">{(verse.x ?? []).length} {(verse.x ?? []).length === 1 ? "place" : "places"} it points to</p>
      <ul className="wk__list" key={`${chapter}:${verse.v}`}>
        {(verse.x ?? []).map((r) => <CrossRef key={r} raw={r} books={books} />)}
      </ul>
    </>
  );
}

// ── 6. The hard question ─────────────────────────────────────────────────────

function HardStep({ note }: BodyProps) {
  const hard = note ? hardQuestions(note) : [];
  if (!hard.length) return <Missing>The notes on this chapter do not raise a hard question. Go on to the last step.</Missing>;
  return (
    <>
      {hard.map((h, i) => <HardQuestion key={i} q={h.q} a={h.a} n={hard.length > 1 ? i + 1 : 0} of={hard.length} />)}
    </>
  );
}

function HardQuestion({ q, a, n, of }: { q: string; a: string; n: number; of: number }) {
  const [open, setOpen] = useState(false);
  const panel = useId();
  return (
    <section className="wk__card wk__hard">
      {n > 0 && <p className="wk__n">Question {n} of {of}</p>}
      <p className="wk__q">{q}</p>
      {!open && <p className="wk__kept">Take a minute with it first. What would you say?</p>}
      <button type="button" className="wk__chip" aria-expanded={open} aria-controls={panel} onClick={() => setOpen((o) => !o)}>
        {open ? "Hide the answer" : "Show an answer"}
      </button>
      <div id={panel} hidden={!open} className="wk__answer">
        {paragraphs(a).map((para, i) => <p key={i} className="wk__prose">{para}</p>)}
      </div>
    </section>
  );
}

// ── 7. What it asks of you ───────────────────────────────────────────────────

function RespondStep({ note, entry, update, book, chapter, books, next, label }: BodyProps) {
  // The next steps are the chapter's "Go deeper" list (the passage index).
  // A chapter with nothing there offers one step: a doctrine it teaches, else
  // the next chapter.
  const rows = useChapterIndex(book.slug, chapter);
  const { data: doctrines } = useLoad("doctrines", fetchDoctrines);
  const doctrine = note?.doctrines[0];
  const doctrineName = doctrine ? doctrines?.find((d) => d.id === doctrine.id)?.name : undefined;
  const nextName = next ? `${chapterBookName(books.find((b) => b.slug === next.slug) ?? { slug: next.slug, name: next.slug })} ${next.chapter}` : null;

  const deeper = rows !== undefined && rows.length > 0;
  const step: { kind: string; title: string; href: string } | null =
    doctrine && doctrineName ? { kind: "A doctrine this chapter teaches", title: doctrineName, href: `/study/bible/doctrines/${doctrine.id}` }
    : next && nextName ? { kind: "Read on", title: nextName, href: chapterHref(next.slug, next.chapter) }
    : null;
  const waiting = rows === undefined || (!deeper && doctrine !== undefined && doctrines === undefined);

  const copyAll = [
    `${label}: my study notes`,
    entry.notice?.trim() ? `\nWhat I notice\n${entry.notice.trim()}` : "",
    entry.respond?.trim() ? `\nWhat I will carry with me\n${entry.respond.trim()}` : "",
  ].join("\n").trim();

  return (
    <>
      {!note ? (
        <Missing>This chapter has no study questions in its notes yet.</Missing>
      ) : Array.isArray(note.questions) ? (
        <ol className="wk__qs wk__qs--plain">
          {note.questions.map((q, i) => <li key={i}><span className="wk__qn" aria-hidden>{i + 1}</span><span>{q}</span></li>)}
        </ol>
      ) : (
        ([["observe", "What does it say?"], ["interpret", "What does it mean?"], ["apply", "What difference does it make?"]] as const).map(([k, h]) => {
          const list = (note.questions as Record<string, string[]>)[k] ?? [];
          return list.length ? (
            <section key={k} className="wk__group">
              <h3 className="wk__h3">{h}</h3>
              <ol className="wk__qs wk__qs--plain">
                {list.map((q, i) => <li key={i}><span className="wk__qn" aria-hidden>{i + 1}</span><span>{q}</span></li>)}
              </ol>
            </section>
          ) : null;
        })
      )}
      <Writing label="What I will carry with me" value={entry.respond ?? ""} onChange={(respond) => update({ respond })} copyText={copyAll} />
      <p className="wk__h4">{deeper ? "Next steps: go deeper" : "One next step"}</p>
      {waiting ? (
        <p role="status" className="wk__kept">Finding a next step…</p>
      ) : deeper ? (
        <GoDeeperList rows={rows} chapterLabel={label} />
      ) : step ? (
        <Link href={step.href} className="wk__nextcard">
          <span className="wk__icon wk__icon--sm" aria-hidden><Footprints size={20} strokeWidth={1.75} /></span>
          <span>
            <span className="wk__nextkind">{step.kind}</span>
            <span className="wk__nexttitle">{step.title}</span>
          </span>
          <ArrowRight size={20} strokeWidth={1.75} aria-hidden className="wk__nextarrow" />
        </Link>
      ) : (
        <Missing>This is the last chapter of the Bible.</Missing>
      )}
      {!waiting && (deeper || (step && step.kind !== "Read on")) && next && nextName && (
        <p className="wk__onward"><Link href={chapterHref(next.slug, next.chapter)} className="wk__link">Or read on to {nextName}</Link></p>
      )}
    </>
  );
}
