/**
 * Ask it straight (Home): the Honest Answers as questions to touch.
 *
 * Type a word and the questions narrow to the ones that use it; touch one
 * and the start of its answer appears, word for word from /answers, with a
 * link to the whole answer. Four questions show at first; "All" shows every
 * one. The answers are the committed data /answers renders (data/answers.ts).
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";

import { ANSWERS } from "@/data/answers";

const FIRST = 3;

/** The first sentences of an answer, whole, up to about 110 characters. */
function answerStart(text: string): string {
  const sentences = text.match(/[^.?!]+[.?!]+["”’)]*(\s|$)/g) ?? [text];
  let out = "";
  for (const s of sentences) {
    if (out && (out + s).length > 110) break;
    out += s;
  }
  return out.trim();
}

export default function QuestionPicker() {
  const [word, setWord] = useState("");
  const [all, setAll] = useState(false);
  const [chosen, setChosen] = useState(0);

  const shown = useMemo(() => {
    const w = word.trim().toLowerCase();
    const hits = ANSWERS.map((a, i) => ({ a, i })).filter(({ a }) => !w || `${a.question} ${a.paragraphs.join(" ")} ${a.askedAs ?? ""}`.toLowerCase().includes(w));
    return w || all ? hits : hits.slice(0, FIRST);
  }, [word, all]);

  const answer = ANSWERS[chosen];

  return (
    <div>
      <div className="hq-find">
        <label htmlFor="home-ask" className="sr-only">
          Find a question by a word in it
        </label>
        <input
          id="home-ask"
          type="search"
          autoComplete="off"
          enterKeyHint="search"
          placeholder="A word: suffering, science"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <span aria-hidden="true">
          <Search size={20} strokeWidth={1.75} />
        </span>
      </div>
      {shown.length > 0 ? (
        <ul className="hq-list" aria-label="Questions">
          {shown.map(({ a, i }) => (
            <li key={a.slug}>
              <button type="button" className="home-chip" aria-pressed={i === chosen} onClick={() => setChosen(i)}>
                {a.question}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="hq-none" role="status">
          No question uses that word yet. Try another.
        </p>
      )}
      {!word.trim() && (
        <button type="button" className="hq-more" aria-expanded={all} onClick={() => setAll((x) => !x)}>
          {all ? "Fewer questions" : `All ${ANSWERS.length} questions`}
        </button>
      )}
      <div className="hq-answer" aria-live="polite">
        <p>
          <span className="sr-only">{answer.question} </span>
          {answerStart(answer.paragraphs[0])}
        </p>
        <Link href={`/answers/${answer.slug}`} className="home-btn">
          Read the whole answer <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
