/**
 * /answers: the index of the Honest Answers. Each answer has its own page
 * (/answers/<slug>, pages/AnswerPage.tsx); this page is the way to them: the
 * page top, a find box that narrows the questions as you type
 * (lib/findAnswers), and every question as a short link, grouped by what
 * people ask (data/questionGroups.ts).
 *
 * Old links keep working. /answers#<slug> opens that answer's own page. With
 * scripts off, the prerendered list (scripts/prerender-heads.mjs) gives each
 * question's row the answer's slug as its id, so the anchor still lands on a
 * link to it.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Search } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import QuestionGroups from "@/components/questions/QuestionGroups";
import { ANSWERS } from "@/data/answers";
import { findAnswers } from "@/lib/findAnswers";
import { answerHref } from "@/lib/askQuestion";
import "./home/home.css";

export default function Answers() {
  const [, navigate] = useLocation();
  // An old link to one answer (/answers#<slug>) opens that answer's own page.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && ANSWERS.some((a) => a.slug === id)) navigate(answerHref(id), { replace: true });
  }, [navigate]);

  const [query, setQuery] = useState("");
  const typed = query.trim() !== "";
  const found = useMemo(() => (typed ? findAnswers(query).map((slug) => ANSWERS.find((a) => a.slug === slug)!) : []), [query, typed]);

  return (
    <Layout>
      <SEOMeta
        title="Hard Questions About Christianity, Answered"
        description="Did the resurrection happen? Can you trust the Bible? Why does God allow suffering? Straight answers from a pastor who was an atheist first."
        url="https://www.livewellbyjamesbell.co/answers"
      />

      <PageHead
        door="Questions"
        doorHref="/topics"
        title="Honest answers to hard questions"
        line={`${ANSWERS.length} questions people actually ask. A straight answer to each, about two minutes long.`}
        plate="tomb"
        width="var(--w-default)"
      />

      <section className="home-sec qa-index" aria-labelledby="qa-index-title">
        <div className="home-wrap">
          <h2 id="qa-index-title" className="sr-only">
            The questions
          </h2>
          <div className="hq-find qa-index__find">
            <label htmlFor="answers-find" className="sr-only">
              Find a question
            </label>
            <input
              id="answers-find"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a question: suffering, hell"
              autoComplete="off"
              enterKeyHint="search"
            />
            <span aria-hidden="true">
              <Search size={20} strokeWidth={1.75} />
            </span>
          </div>
          <p className="qa-index__count" role="status">
            {!typed ? "" : found.length === 0 ? "No question here uses those words. Try one word." : `${found.length} of ${ANSWERS.length} questions match.`}
          </p>
          {typed ? (
            <ul className="qa-found" aria-label="Matching questions">
              {found.map((a) => (
                <li key={a.slug}>
                  <Link href={answerHref(a.slug)}>
                    <span>{a.question}</span>
                    <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <QuestionGroups rows={[]} all />
          )}
          <p className="lw-newline">
            <Search aria-hidden="true" size={22} strokeWidth={1.75} />
            <span>
              Not here? <Link href="/topics">Ask it on Hard questions</Link>, or <Link href="/theology/questions">browse every question</Link>.
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
}
