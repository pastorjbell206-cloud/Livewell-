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
 * The two faces share one grid cell, so the card is as tall as its taller
 * face and nothing moves when it turns; the turn is a CSS transition the
 * site's reduced-motion rule turns off.
 */
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, Square, Volume2 } from "lucide-react";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

export interface PracticeEntry {
  number: number;
  question: string;
  answer: string;
  kidsAnswer: string;
}

export const PRACTICE_KEY = "livewell-progress-family-catechism-practice-v1";

const isAt = (x: unknown): x is { v: 1; at: number } =>
  !!x && typeof x === "object" && (x as { v?: unknown }).v === 1 && Number.isInteger((x as { at?: unknown }).at);

function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}

export default function CatechismPractice({ entries, startAt }: { entries: PracticeEntry[]; startAt: number }) {
  const count = entries.length;
  const [at, setAt] = useState(() => {
    const kept = readStoredJSON(PRACTICE_KEY, isAt, { v: 1 as const, at: startAt }).at;
    return Math.min(Math.max(1, kept), count);
  });
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

  if (!e) return null;

  const go = (by: number) => {
    const next = ((at - 1 + by + count) % count) + 1;
    setAt(next);
    setTurned(false);
    setSpeaking(false);
    writeStoredJSON(PRACTICE_KEY, { v: 1, at: next });
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
      </div>
    </div>
  );
}
