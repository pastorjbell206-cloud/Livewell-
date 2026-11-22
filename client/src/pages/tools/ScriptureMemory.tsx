/**
 * Memorize Scripture (/tools/scripture-memory).
 *
 * A verse is learned by saying it aloud while its words are hidden a few more
 * at each step, then said from memory and marked honestly ("I had it" or "Not
 * yet"). A verse recalled comes back for review after 1, 3, 7, 14 and 30
 * days; a verse missed comes back tomorrow (lib/scriptureMemory). Today's
 * review is the first thing on the page once anything is being learned.
 *
 * Three sources, all the Berean Standard Bible word for word:
 *   - the forty key verses in eight sets (data/memory-verses.json, written
 *     by scripts/build-memory-verses.mjs from the site's Bible files);
 *   - any verse the reader chooses by its reference, read from those files;
 *   - for families, the verses the family catechism rests on, with the
 *     question each one answers (client/public/family-catechism.json).
 *
 * Everything is kept on this device (lib/storage), the open verse and its
 * step too, so a reload comes back to the same place. The verses being
 * learned print as cards.
 */
import { useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, Eye, Plus, Printer, RotateCcw } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import ScriptureNote from "@/components/ScriptureNote";
import LoadFailed from "@/components/LoadFailed";
import NextStep from "@/components/NextStep";
import { ResultNext, type NextStep as NextPage } from "@/components/tool-shell/Result";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { fetchJson } from "@/lib/fetch-json";
import { parseScriptureRef } from "@/lib/scripture-ref";
import {
  HIDE_STEPS,
  OWN_VERSE_MESSAGES,
  OwnVerseError,
  STEP_LINES,
  blank,
  dueToday,
  fetchOwnVerse,
  hiddenAt,
  isKnown,
  localDay,
  missed,
  readMemory,
  recalled,
  saveMemory,
  started,
  whenDue,
  wordsOf,
  type Learning,
  type MemoryState,
} from "@/lib/scriptureMemory";
import data from "@/data/memory-verses.json";

interface SetVerse {
  ref: string;
  text: string;
}
interface VerseSet {
  id: string;
  name: string;
  next: NextPage | null;
  verses: SetVerse[];
}

const SETS: VerseSet[] = data.sets;
const CORE = new Map(SETS.flatMap((s) => s.verses.map((v) => [v.ref, v.text] as const)));
const CORE_REFS: ReadonlySet<string> = new Set(CORE.keys());
const SET_OF = new Map(SETS.flatMap((s) => s.verses.map((v) => [v.ref, s] as const)));
const LAST = HIDE_STEPS.length - 1;

interface FamilyVerse extends SetVerse {
  /** "Question 12: How has God spoken to us?" */
  question: string;
}

function isCatechism(x: unknown): x is { number: number; question: string; scripture: string; scriptureText: string }[] {
  return Array.isArray(x) && x.every((e) => typeof e?.number === "number" && typeof e?.question === "string" && typeof e?.scripture === "string" && typeof e?.scriptureText === "string");
}

/** The verse's place in the Study Bible. */
function chapterHref(ref: string): string | null {
  const r = parseScriptureRef(ref);
  if (!r) return null;
  const p = r.parts[0];
  return `/study/bible/${r.book.slug}/${p.c1}#v${p.v1}`;
}

function Stage({ l, today }: { l: Learning | undefined; today: string }) {
  if (!l) return null;
  return <span className={`sm-stage${l.due <= today ? " is-due" : ""}`}>{isKnown(l) ? `Known. ${whenDue(l, today)}` : whenDue(l, today)}</span>;
}

export default function ScriptureMemory() {
  const [today] = useState(() => localDay());
  const [memory, setMemory] = useState<MemoryState>(() => readMemory(today, CORE_REFS));
  const [kept, setKept] = useState(true);
  // The open verse: whether it has been shown at the last step, the words peeked at, and how it was marked.
  const [shown, setShown] = useState(false);
  const [peeked, setPeeked] = useState<ReadonlySet<number>>(new Set());
  const [marked, setMarked] = useState<"had" | "not" | null>(null);
  const [resumed, setResumed] = useState(() => !!memory.at);
  const practiceRef = useRef<HTMLElement>(null);

  // The family catechism's verses, asked for only when a family opens them.
  const [family, setFamily] = useState<{ status: "idle" | "loading" | "failed" } | { status: "ready"; verses: FamilyVerse[] }>({ status: "idle" });
  const loadFamily = () => {
    setFamily({ status: "loading" });
    fetchJson("/family-catechism.json", isCatechism)
      .then((list) => {
        const seen = new Set<string>();
        const verses: FamilyVerse[] = [];
        for (const e of list) {
          if (seen.has(e.scripture)) continue;
          seen.add(e.scripture);
          verses.push({ ref: e.scripture, text: e.scriptureText, question: `Question ${e.number}: ${e.question}` });
        }
        setFamily({ status: "ready", verses });
      })
      .catch(() => setFamily({ status: "failed" }));
  };

  // A verse of the reader's own.
  const [own, setOwn] = useState("");
  const [ownError, setOwnError] = useState("");
  const [ownBusy, setOwnBusy] = useState(false);

  const update = (next: MemoryState) => {
    setMemory(next);
    setKept(saveMemory(next));
  };

  const textOf = (ref: string): string | undefined => CORE.get(ref) ?? memory.verses[ref]?.text;
  const due = useMemo(() => dueToday(memory, today), [memory, today]);
  const learning = Object.keys(memory.verses);
  const known = learning.filter((r) => isKnown(memory.verses[r])).length;

  const openVerse = (ref: string, extra: Pick<Learning, "text" | "from"> = {}) => {
    const have = memory.verses[ref];
    const l = have ?? started(today, CORE.has(ref) ? {} : extra);
    // A verse already carried is reviewed from memory; a new one starts by reading.
    const step = have && have.stage > 0 ? LAST : 0;
    setShown(false);
    setPeeked(new Set());
    setMarked(null);
    setResumed(false);
    update({ ...memory, verses: { ...memory.verses, [ref]: l }, at: { ref, step } });
    requestAnimationFrame(() => {
      practiceRef.current?.scrollIntoView?.({ block: "start" });
      practiceRef.current?.focus?.({ preventScroll: true });
    });
  };

  const at = memory.at && textOf(memory.at.ref) ? memory.at : null;
  const goStep = (step: number) => {
    if (!at) return;
    setShown(false);
    setPeeked(new Set());
    setMarked(null);
    update({ ...memory, at: { ref: at.ref, step: Math.min(Math.max(step, 0), LAST) } });
  };
  const mark = (how: "had" | "not") => {
    if (!at) return;
    const l = memory.verses[at.ref] ?? started(today);
    setMarked(how);
    update({ ...memory, verses: { ...memory.verses, [at.ref]: how === "had" ? recalled(l, today) : missed(l, today) } });
  };
  const closeVerse = () => {
    setMarked(null);
    update({ ...memory, at: null });
  };
  const stopLearning = (ref: string) => {
    const verses = { ...memory.verses };
    delete verses[ref];
    update({ ...memory, verses, at: memory.at?.ref === ref ? null : memory.at });
  };

  const addOwn = async () => {
    if (!own.trim() || ownBusy) return;
    setOwnBusy(true);
    setOwnError("");
    try {
      const verse = await fetchOwnVerse(own);
      setOwn("");
      openVerse(verse.ref, { text: verse.text, from: "own" });
    } catch (e) {
      setOwnError(OWN_VERSE_MESSAGES[e instanceof OwnVerseError ? e.kind : "failed"]);
    } finally {
      setOwnBusy(false);
    }
  };

  const others = learning.filter((r) => !CORE.has(r));
  const nextDue = due.find((r) => r !== at?.ref);

  // Where to go next, from the verse the reader has just worked on.
  const nextPages = (ref: string): NextPage[] => {
    const pages: NextPage[] = [];
    const chapter = chapterHref(ref);
    if (chapter) pages.push({ kind: "Study Bible", label: `Read ${ref} in its chapter`, href: chapter });
    const set = SET_OF.get(ref);
    if (set?.next) pages.push(set.next);
    if (memory.verses[ref]?.from === "family") pages.push({ kind: "Family", label: "The Family Catechism", href: "/family/catechism" });
    return pages;
  };

  const row = (v: SetVerse, extra: Pick<Learning, "text" | "from"> = {}, note?: string) => {
    const l = memory.verses[v.ref];
    return (
      <li key={v.ref} className="sm-row">
        <div className="sm-row__body">
          <p className="sm-row__ref">
            {v.ref} <Stage l={l} today={today} />
          </p>
          {note && <p className="sm-row__note">{note}</p>}
          <p className="sm-row__text">{v.text}</p>
        </div>
        <button type="button" className="btn btn--quiet sm-row__go" onClick={() => openVerse(v.ref, extra)}>
          {l ? (l.due <= today && l.stage > 0 ? "Review" : "Practice") : "Learn this verse"}
          <span className="sr-only">: {v.ref}</span>
        </button>
      </li>
    );
  };

  return (
    <Layout>
      <SEOMeta
        title="Memorize Bible Verses: 40 Verses, Step by Step"
        description="Memorize Bible verses a few words at a time: forty key verses, any verse you choose, and the family catechism's verses, with review on spaced days kept on your device."
        keywords="scripture memory, Bible memorization, memorize Bible verses, scripture memory system, Bible memory techniques"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Memorize Scripture",
          description: "Memorize Bible verses a few words at a time, with review on spaced days. Forty key verses, any verse you choose, and the family catechism's verses.",
          url: "https://www.livewellbyjamesbell.co/tools/scripture-memory",
          applicationCategory: "ReligiousApp",
          offers: { "@type": "Offer", price: "0" },
        }}
      />
      <div className="sm-page">
        <InnerHead
          path="/tools/scripture-memory"
          title="Memorize Scripture: 40 key verses"
          line="Say a verse aloud while its words are hidden a few at a time, then from memory. A verse you carried comes back after a day, then three, then a week, until it stays. The aim is Scripture you can reach for at three in the morning without a phone in your hand."
          plate="book"
        />

        {/* THE OPEN VERSE */}
        {at && (
          <section ref={practiceRef} tabIndex={-1} className="sm-sec sm-practice" aria-labelledby="sm-practice-h">
            <div className="sm-wrap">
              <p className="eyebrow">{resumed && !marked ? "Picked up where you left off" : memory.verses[at.ref]?.from === "family" ? "A catechism verse" : SET_OF.get(at.ref)?.name ?? "Your own verse"}</p>
              <h2 id="sm-practice-h" className="sm-practice__ref">
                {at.ref}
              </h2>
              <Verse text={textOf(at.ref)!} step={shown || marked ? 0 : at.step} peeked={peeked} onPeek={(i) => setPeeked((p) => new Set(p).add(i))} />
              <ScriptureNote rendering="bsb" />

              {!marked && (
                <>
                  <p className="sm-step" aria-live="polite">
                    <strong>
                      Step {at.step + 1} of {HIDE_STEPS.length}.
                    </strong>{" "}
                    {shown ? "Here is the verse. Did you have it, word for word?" : STEP_LINES[at.step]}
                    {!shown && at.step > 0 && at.step < LAST && " Tap a line to look at a word you have lost."}
                  </p>
                  <div className="sm-actions">
                    {at.step > 0 && !shown && (
                      <button type="button" className="btn btn--quiet" onClick={() => goStep(at.step - 1)}>
                        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.75} />
                        Show more words
                      </button>
                    )}
                    {at.step < LAST && (
                      <button type="button" className="btn" onClick={() => goStep(at.step + 1)}>
                        Hide more words
                        <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                      </button>
                    )}
                    {at.step === LAST && !shown && (
                      <button type="button" className="btn" onClick={() => setShown(true)}>
                        <Eye aria-hidden="true" size={16} strokeWidth={1.75} />
                        Show the verse
                      </button>
                    )}
                    {at.step === LAST && shown && (
                      <>
                        <button type="button" className="btn" onClick={() => mark("had")}>
                          <Check aria-hidden="true" size={16} strokeWidth={1.75} />I had it
                        </button>
                        <button type="button" className="btn btn--quiet" onClick={() => mark("not")}>
                          Not yet
                        </button>
                      </>
                    )}
                    <button type="button" className="btn btn--text" onClick={closeVerse}>
                      Back to the verses
                    </button>
                    <button type="button" className="btn btn--text" onClick={() => stopLearning(at.ref)}>
                      Stop learning this verse
                    </button>
                  </div>
                </>
              )}

              {marked && (
                <div className="sm-result" role="status">
                  <p className="sm-step">
                    {marked === "had" ? (
                      <>
                        <strong>Kept.</strong> {at.ref} comes back {whenDue(memory.verses[at.ref], today).replace(/^Back /, "").replace(/^Due today$/, "today")}. Each time you carry it, the gap grows: a day, three days, a week, two weeks, a month.
                      </>
                    ) : (
                      <>
                        <strong>Not yet is an honest answer.</strong> {at.ref} comes back tomorrow. Most verses take several days of saying aloud before they stay.
                      </>
                    )}
                  </p>
                  <div className="sm-actions">
                    {marked === "not" && (
                      <button type="button" className="btn" onClick={() => goStep(0)}>
                        <RotateCcw aria-hidden="true" size={16} strokeWidth={1.75} />
                        Go through the steps again
                      </button>
                    )}
                    {nextDue && (
                      <button type="button" className="btn" onClick={() => openVerse(nextDue)}>
                        Next verse due: {nextDue}
                      </button>
                    )}
                    <button type="button" className="btn btn--quiet" onClick={closeVerse}>
                      Back to the verses
                    </button>
                  </div>
                  <ResultNext steps={nextPages(at.ref)} />
                </div>
              )}
              {!kept && (
                <p className="sm-alert" role="status">
                  {SAVE_FAILED}
                </p>
              )}
            </div>
          </section>
        )}

        {/* TODAY */}
        <section className="sm-sec sm-sec--warm" aria-labelledby="sm-today-h">
          <div className="sm-wrap">
            <h2 id="sm-today-h" className="sm-h2">
              Today's review
            </h2>
            {learning.length === 0 ? (
              <p className="sm-lede">Nothing yet. Choose one verse below and learn it today. One verse kept is worth more than ten begun.</p>
            ) : due.length === 0 ? (
              <p className="sm-lede">
                Nothing is due today. You are learning {learning.length} {learning.length === 1 ? "verse" : "verses"}
                {known > 0 ? `, and ${known} ${known === 1 ? "is" : "are"} known` : ""}. Each comes back on its day.
              </p>
            ) : (
              <>
                <p className="sm-lede">
                  {due.length} {due.length === 1 ? "verse is" : "verses are"} due. Say each from memory before you look.
                </p>
                <ul className="sm-list">{due.map((ref) => row({ ref, text: textOf(ref) ?? "" }))}</ul>
              </>
            )}
            {!at && !kept && (
              <p className="sm-alert" role="status">
                {SAVE_FAILED}
              </p>
            )}
            {learning.length > 0 && (
              <div className="sm-actions no-print">
                <button type="button" className="btn btn--quiet" onClick={() => window.print()}>
                  <Printer aria-hidden="true" size={16} strokeWidth={1.75} />
                  Print my verses as cards
                </button>
              </div>
            )}
          </div>
        </section>

        {/* THE FORTY, BY SET */}
        <section className="sm-sec" aria-labelledby="sm-sets-h">
          <div className="sm-wrap">
            <h2 id="sm-sets-h" className="sm-h2">
              Forty key verses
            </h2>
            <p className="sm-lede">Eight sets of five. Every verse is the Berean Standard Bible, word for word.</p>
            {SETS.map((set) => (
              <details key={set.id} className="sm-set">
                <summary>
                  <span className="sm-set__name">{set.name}</span>
                  <span className="sm-set__count">
                    {set.verses.filter((v) => memory.verses[v.ref]).length} of {set.verses.length} begun
                  </span>
                </summary>
                <ul className="sm-list">{set.verses.map((v) => row(v))}</ul>
              </details>
            ))}
          </div>
        </section>

        {/* A VERSE OF YOUR OWN */}
        <section className="sm-sec sm-sec--warm" aria-labelledby="sm-own-h">
          <div className="sm-wrap">
            <h2 id="sm-own-h" className="sm-h2">
              A verse of your own
            </h2>
            <p className="sm-lede">Type any reference, up to six verses in one chapter. The words are read from the Bible on this site, so they are always right.</p>
            <form
              className="sm-own"
              onSubmit={(e) => {
                e.preventDefault();
                void addOwn();
              }}
            >
              <label htmlFor="sm-own-ref" className="sm-own__label">
                Reference
              </label>
              <div className="sm-own__row">
                <input id="sm-own-ref" className="sm-own__input" type="text" value={own} onChange={(e) => setOwn(e.target.value)} placeholder="John 3:16" autoComplete="off" aria-describedby="sm-own-error" />
                <button type="submit" className="btn" disabled={ownBusy || !own.trim()}>
                  <Plus aria-hidden="true" size={16} strokeWidth={1.75} />
                  {ownBusy ? "Finding it…" : "Learn it"}
                </button>
              </div>
              <p id="sm-own-error" className="sm-alert" role="alert">
                {ownError}
              </p>
            </form>
            {others.length > 0 && <ul className="sm-list">{others.map((ref) => row({ ref, text: memory.verses[ref].text ?? "" }, {}, memory.verses[ref].from === "family" ? "From the family catechism" : undefined))}</ul>}
          </div>
        </section>

        {/* FOR FAMILIES */}
        <section className="sm-sec" aria-labelledby="sm-family-h">
          <div className="sm-wrap">
            <h2 id="sm-family-h" className="sm-h2">
              For families: the catechism's verses
            </h2>
            <p className="sm-lede">
              Each question in <Link href="/family/catechism">the Family Catechism</Link> rests on a verse. Learn the verse with the question it answers: one person hides the words, everyone says it together.
            </p>
            {family.status === "idle" && (
              <button type="button" className="btn btn--quiet" onClick={loadFamily}>
                Show the catechism's verses
              </button>
            )}
            {family.status === "loading" && (
              <p role="status" className="sm-lede">
                Loading the verses…
              </p>
            )}
            {family.status === "failed" && <LoadFailed what="The catechism's verses" onRetry={loadFamily} backHref="/family/catechism" backLabel="The Family Catechism" />}
            {family.status === "ready" && <ul className="sm-list">{family.verses.map((v) => row(v, { text: v.text, from: "family" }, v.question))}</ul>}
          </div>
        </section>

        {/* THE CARDS, PRINTED */}
        <section className="sm-print" aria-hidden="true">
          <p className="sm-print__head">Memorize Scripture · livewellbyjamesbell.co/tools/scripture-memory · Berean Standard Bible</p>
          <div className="sm-cards">
            {learning.map((ref) => (
              <div key={ref} className="sm-card">
                <p className="sm-card__ref">{ref}</p>
                <p className="sm-card__text">{textOf(ref)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sm-sec sm-sec--warm no-print">
          <div className="sm-wrap">
            <NextStep id="study-bible" line="Read each verse in its own chapter, with notes beside the text." />
          </div>
        </section>
      </div>
    </Layout>
  );
}

/** The verse, with the words hidden at this step drawn as lines. A hidden word can be looked at once tapped. */
function Verse({ text, step, peeked, onPeek }: { text: string; step: number; peeked: ReadonlySet<number>; onPeek: (i: number) => void }) {
  const words = wordsOf(text);
  const hidden = hiddenAt(text, step);
  return (
    <p className="sm-verse">
      {words.map((w, i) => {
        const hide = hidden[i] && !peeked.has(i);
        return (
          <span key={i}>
            {hide ? (
              <button type="button" className="sm-gap" onClick={() => onPeek(i)} aria-label="A hidden word. Show it.">
                {blank(w)}
              </button>
            ) : (
              <span className={hidden[i] ? "sm-peeked" : undefined}>{w}</span>
            )}{" "}
          </span>
        );
      })}
    </p>
  );
}
