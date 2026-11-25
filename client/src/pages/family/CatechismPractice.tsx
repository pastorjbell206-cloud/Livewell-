/**
 * The catechism said aloud (/family/catechism; TOOLS-PLAN 7): one question at
 * a time, large, on a card. Tap the card and it turns to the answer: the line
 * "for the little ones" and the full answer, exactly as written in
 * client/public/family-catechism.json. Previous and Next step through the 76
 * in order. The card's place is kept on this device (lib/storage) apart from
 * the family's own place in the catechism, and starts there.
 *
 * "Read it to me" uses the browser's own voice (window.speechSynthesis): the
 * question, and once the card is turned, both answers. Where the browser has
 * no voice the button is not shown. Nothing is recorded or sent.
 *
 * "We know this one" ticks the question as learned (the same ticks the list
 * below shows), and "Pass over the ones we know" walks only the questions
 * still to learn. Both are kept on this device; when the browser will not
 * keep them the card says so.
 *
 * The two faces share one grid cell, so the card is as tall as its taller
 * face and nothing moves when it turns; the turn is a CSS transition the
 * site's reduced-motion rule turns off.
 */
import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, RefreshCw, Square, Volume2 } from "lucide-react";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { CATECHISM_PRACTICE_KEY, isPracticePlace, nextPractice, type PracticePlace } from "@/lib/familyCatechism";

export interface PracticeEntry {
  number: number;
  question: string;
  answer: string;
  kidsAnswer: string;
}

export const PRACTICE_KEY = CATECHISM_PRACTICE_KEY;

/** What is kept: the question, and `skip` only once the family has asked for it. */
const place = (at: number, skip: boolean): PracticePlace => (skip ? { v: 1, at, skip: true } : { v: 1, at });

function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}

export default function CatechismPractice({
  entries,
  startAt,
  openAt,
  isKnown,
  onToggleKnown,
  knownCount = 0,
  knownKept = true,
}: {
  entries: PracticeEntry[];
  startAt: number;
  /** Open on this question, whatever place was kept ("Say this one aloud" on the week's card; the page remounts the card with it). */
  openAt?: number;
  /** Whether the family has marked a question learned, and the way to mark it. */
  isKnown?: (n: number) => boolean;
  onToggleKnown?: (n: number) => void;
  knownCount?: number;
  /** False when the browser would not keep the last tick. */
  knownKept?: boolean;
}) {
  const count = entries.length;
  const [kept0] = useState<PracticePlace>(() => readStoredJSON<PracticePlace>(PRACTICE_KEY, isPracticePlace, { v: 1, at: startAt }));
  const [at, setAt] = useState(() => Math.min(Math.max(1, openAt ?? kept0.at), count));
  const [skip, setSkip] = useState(kept0.skip === true);
  const [placeKept, setPlaceKept] = useState(true);
  const [turned, setTurned] = useState(false);
  const [voice] = useState(canSpeak);
  const [speaking, setSpeaking] = useState(false);
  const e = entries[at - 1];

  // Stop the voice when the card changes or the page is left.
  useEffect(() => {
    return () => {
      if (canSpeak()) window.speechSynthesis.cancel();
    };
  }, [at]);

  const show = (next: number, nextSkip = skip) => {
    setAt(next);
    setTurned(false);
    setSpeaking(false);
    setPlaceKept(writeStoredJSON(PRACTICE_KEY, place(next, nextSkip)));
  };

  if (!e) return null;

  const known = (n: number) => isKnown?.(n) ?? false;
  const go = (by: 1 | -1) => show(nextPractice(at, by, count, skip, known));
  const toggleSkip = () => {
    const next = !skip;
    setSkip(next);
    setPlaceKept(writeStoredJSON(PRACTICE_KEY, place(at, next)));
  };

  const read = () => {
    if (!voice) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const parts = turned ? [e.question, e.kidsAnswer, e.answer] : [e.question];
    parts.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.92;
      if (i === parts.length - 1) {
        u.onend = () => setSpeaking(false);
        u.onerror = () => setSpeaking(false);
      }
      synth.speak(u);
    });
    setSpeaking(true);
  };

  return (
    <div className="cp">
      <p className="cp-count" aria-live="polite">
        Question {e.number} of {count}
      </p>
      <button type="button" className={`cp-card${turned ? " is-turned" : ""}`} aria-pressed={turned} onClick={() => setTurned((t) => !t)}>
        <span className="sr-only">{turned ? "Showing the answer. Tap to show the question." : "Showing the question. Tap to show the answer."}</span>
        <span className="cp-card__inner">
          <span className="cp-face cp-face--front" aria-hidden={turned}>
            <span className="cp-face__label">The question</span>
            <span className="cp-face__q">{e.question}</span>
            <span className="cp-face__hint">
              <RefreshCw aria-hidden="true" size={16} strokeWidth={1.75} /> Tap to turn
            </span>
          </span>
          <span className="cp-face cp-face--back" aria-hidden={!turned}>
            <span className="cp-face__label">For the little ones</span>
            <span className="cp-face__kids">{e.kidsAnswer}</span>
            <span className="cp-face__label">The answer</span>
            <span className="cp-face__a">{e.answer}</span>
          </span>
        </span>
      </button>
      <div className="cp-controls">
        <button type="button" className="home-step" aria-label="Previous question" onClick={() => go(-1)}>
          <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.75} />
        </button>
        <button type="button" className="home-step" aria-label="Next question" onClick={() => go(1)}>
          <ChevronRight aria-hidden="true" size={20} strokeWidth={1.75} />
        </button>
        {voice && (
          <button type="button" className="btn btn--quiet cp-read" aria-pressed={speaking} onClick={read}>
            {speaking ? <Square aria-hidden="true" size={16} strokeWidth={1.75} /> : <Volume2 aria-hidden="true" size={18} strokeWidth={1.75} />}
            {speaking ? "Stop" : "Read it to me"}
          </button>
        )}
        {onToggleKnown && (
          <button type="button" className="btn btn--quiet cp-read cp-know" aria-pressed={known(e.number)} onClick={() => onToggleKnown(e.number)}>
            <Check aria-hidden="true" size={18} strokeWidth={1.75} />
            We know this one
          </button>
        )}
      </div>
      {onToggleKnown && (
        <div className="cp-known">
          <p className="cp-known__count" aria-live="polite">
            You know {knownCount} of {count}.
          </p>
          <label className="cp-skip">
            <input type="checkbox" checked={skip} onChange={toggleSkip} />
            <span>Pass over the ones we know</span>
          </label>
        </div>
      )}
      {(!placeKept || !knownKept) && (
        <p className="cp-known__count" role="status">
          {SAVE_FAILED}
        </p>
      )}
    </div>
  );
}
