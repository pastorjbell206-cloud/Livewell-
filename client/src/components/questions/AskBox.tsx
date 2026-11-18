/**
 * The ask box (the Questions door, /topics): type a hard question in your
 * own words, get the one page that answers it best, then two or three next
 * steps. Matching is plain words over what is already written
 * (lib/askQuestion); the answer's opening is quoted word for word from
 * data/answers.ts. Words that call for a person, not a page, bring the help
 * lines first (siteSearch crisisTopicsFor, CrisisBlock). When nothing fits,
 * it says so and offers the whole-site search and Find Help.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Scale, Search, Users, Compass, LifeBuoy, BookOpen, MessageCircleQuestion } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CrisisBlock } from "@/components/CrisisBlock";
import { companionsFor } from "@/data/answerCompanions";
import { isPublicEssay } from "@/lib/shelf";
import { crisisTopicsFor } from "@/lib/siteSearch";
import { answerCandidates, answerStart, ask, type AskCandidate } from "@/lib/askQuestion";

/** Three questions to try, shown before anything is typed. */
const TRY = ["Did the resurrection happen?", "Does God exist?", "Why does God allow suffering?"];

interface Step {
  href: string;
  label: string;
  icon: LucideIcon;
}

function iconFor(href: string): LucideIcon {
  if (href.startsWith("/tools/test-the-case")) return Scale;
  if (href.startsWith("/theology/compare")) return Users;
  if (href.startsWith("/theology/which-view")) return Compass;
  if (href.startsWith("/help")) return LifeBuoy;
  if (href.startsWith("/writing")) return BookOpen;
  return MessageCircleQuestion;
}

/** Up to three next steps: the tools that take this answer further, then the nearest other questions. */
function nextSteps(best: AskCandidate, rest: AskCandidate[]): Step[] {
  const out: Step[] = [];
  if (best.answer) {
    for (const c of companionsFor(best.answer)) out.push({ href: c.href, label: c.label, icon: iconFor(c.href) });
    if (isPublicEssay(best.answer.essaySlug)) out.push({ href: `/writing/${best.answer.essaySlug}`, label: `The full essay: ${best.answer.essayTitle}`, icon: BookOpen });
  }
  for (const r of rest) out.push({ href: r.href, label: r.question, icon: MessageCircleQuestion });
  const seen = new Set<string>();
  return out.filter((s) => !seen.has(s.href) && seen.add(s.href)).slice(0, 3);
}

export default function AskBox({ rows = [] }: { rows?: AskCandidate[] }) {
  const [q, setQ] = useState("");
  const candidates = useMemo(() => [...answerCandidates(), ...rows], [rows]);
  const typed = q.trim().length >= 3;
  const found = useMemo(() => (typed ? ask(candidates, q) : []), [candidates, q, typed]);
  const crisis = typed ? crisisTopicsFor(q) : [];
  const best = found[0];

  return (
    <div className="qa-ask">
      <form
        className="hq-find qa-ask__field"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="qa-ask" className="sr-only">
          Ask a hard question
        </label>
        <input
          id="qa-ask"
          type="search"
          autoComplete="off"
          enterKeyHint="search"
          placeholder="Ask a hard question"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span aria-hidden="true">
          <Search size={20} strokeWidth={1.75} />
        </span>
      </form>

      {!typed && (
        <ul className="qa-try" aria-label="Questions to try">
          {TRY.map((t) => (
            <li key={t}>
              <button type="button" className="home-chip" onClick={() => setQ(t)}>
                {t}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="qa-result" aria-live="polite">
        {crisis.length > 0 && <CrisisBlock variant="compact" topics={crisis} />}
        {typed && best && (
          <div className="qa-best">
            <p className="qa-best__label">The closest answer</p>
            <h3 className="qa-best__q">
              <Link href={best.href}>{best.question}</Link>
            </h3>
            {best.answer && <p className="qa-best__start">{answerStart(best.answer.paragraphs[0])}</p>}
            {!best.answer && best.body && <p className="qa-best__start">{best.body}</p>}
            <Link href={best.href} className="home-btn">
              {best.answer ? "Read the answer" : "Open it"} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
            </Link>
            {nextSteps(best, found.slice(1)).length > 0 && (
              <>
                <p className="qa-best__label qa-best__label--next">Next steps</p>
                <ul className="qa-steps">
                  {nextSteps(best, found.slice(1)).map((s) => (
                    <li key={s.href}>
                      <Link href={s.href}>
                        <s.icon aria-hidden="true" size={20} strokeWidth={1.75} />
                        <span>{s.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        {typed && !best && (
          <div className="qa-none" role="status">
            <p>Nothing here answers that yet.</p>
            <p>
              <Link href={`/search?q=${encodeURIComponent(q.trim())}`}>Search the whole site</Link>, or{" "}
              <Link href="/help">Find Help</Link> if this is a hard season.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
