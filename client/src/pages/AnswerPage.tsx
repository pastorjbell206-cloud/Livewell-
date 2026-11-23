/**
 * /answers/:slug: one Honest Answer on a page of its own. The question is
 * the H1; the answer is the three paragraphs of data/answers.ts, word for
 * word, in the reading face; an argued answer adds its headed parts, the
 * argument laid out in numbered steps, and its sources. Under it: the full essay (only while it is on
 * the public shelf, lib/shelf) and the book that takes the question up; the
 * tools that go further where they truly match (data/answerCompanions:
 * Test the Case, Compare the views, Which View Am I?, Find Help); a line for
 * the reader who disagrees (components/PushBack); then the previous and next
 * question and the way back to all of them.
 *
 * The prerendered page (scripts/prerender-heads.mjs) carries the same
 * title, description and text, built from the same data at build time.
 */
import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Compass, LifeBuoy, Link2, Rows3, Scale, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Layout from "@/components/Layout";
import PushBack from "@/components/PushBack";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { ANSWERS } from "@/data/answers";
import type { AnswerSource, AnswerSteps } from "@/data/answers";
import { companionsFor } from "@/data/answerCompanions";
import { answerHref } from "@/lib/askQuestion";
import { copyToClipboard } from "@/lib/clipboard";
import { isPublicEssay } from "@/lib/shelf";

const SITE = "https://www.livewellbyjamesbell.co";

function iconFor(href: string): LucideIcon {
  if (href.startsWith("/tools/test-the-case")) return Scale;
  if (href.startsWith("/theology/compare")) return Users;
  if (href.startsWith("/theology/which-view")) return Compass;
  if (href.startsWith("/help")) return LifeBuoy;
  return BookOpen;
}

/** An argument laid out: its kind, the numbered premises, then the conclusion. */
function Steps({ steps }: { steps: AnswerSteps }) {
  return (
    <figure className="qa-arg">
      <figcaption>{steps.kind}</figcaption>
      <ol>
        {steps.premises.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ol>
      <p className="qa-arg__so">
        <span>So</span> {steps.conclusion}
      </p>
    </figure>
  );
}

function Source({ s }: { s: AnswerSource }) {
  return (
    <li>
      {s.author}, {s.in ? <>&ldquo;{s.title},&rdquo; <cite>{s.in}</cite></> : <cite>{s.title}</cite>} ({s.year}).
      {s.note && <span className="qa-sources__note"> {s.note}</span>}
    </li>
  );
}

export default function AnswerPage() {
  const [, params] = useRoute("/answers/:slug");
  const i = ANSWERS.findIndex((a) => a.slug === params?.slug);
  const a = ANSWERS[i];
  const [copied, setCopied] = useState<boolean | null>(null);

  if (!a) {
    return (
      <Layout>
        <SEOMeta title="Answer Not Found" description="That answer is not here. Every question is listed on the Honest Answers page." url={`${SITE}/answers`} noindex />
        <PageHead door="Questions" doorHref="/topics" title="That answer is not here." line="It may have moved. Every question is listed on one page." action={<Link href="/answers" className="btn">All the questions</Link>} />
      </Layout>
    );
  }

  const prev = ANSWERS[i - 1];
  const next = ANSWERS[i + 1];
  const essay = isPublicEssay(a.essaySlug);
  const more = companionsFor(a);

  return (
    <Layout>
      <SEOMeta title={a.question} description={a.paragraphs[0]} url={`${SITE}${answerHref(a.slug)}`} type="article" />

      <PageHead door="Honest answers" doorHref="/answers" title={a.question} plate="tomb" width="var(--w-default)" />

      <section className="home-sec qa-page">
        <div className="qa-page__wrap">
          <article className="qa-page__answer">
            <h2 className="sr-only">{a.sections ? "The short answer" : "The answer"}</h2>
            {a.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {a.sections && (
              <nav className="qa-contents" aria-label="In this answer">
                <ol>
                  {a.sections.map((s, k) => (
                    <li key={k}>
                      <a href={`#part-${k + 1}`}>{s.heading}</a>
                    </li>
                  ))}
                  {a.sources && a.sources.length > 0 && (
                    <li>
                      <a href="#sources">Sources and further reading</a>
                    </li>
                  )}
                </ol>
              </nav>
            )}
            {a.sections?.map((s, k) => (
              <section key={k} className="qa-part" id={`part-${k + 1}`}>
                <h2>{s.heading}</h2>
                {s.body.map((b, j) => (typeof b === "string" ? <p key={j}>{b}</p> : <Steps key={j} steps={b} />))}
              </section>
            ))}
            {a.sources && a.sources.length > 0 && (
              <section className="qa-sources" id="sources">
                <h2>Sources and further reading</h2>
                <ul>
                  {a.sources.map((s) => (
                    <Source key={`${s.author}${s.title}`} s={s} />
                  ))}
                </ul>
              </section>
            )}
          </article>

          {(essay || (a.bookHref && a.bookTitle) || more.length > 0) && (
            <ul className="qa-steps qa-page__more" aria-label="Go further">
              {essay && (
                <li>
                  <Link href={`/writing/${a.essaySlug}`}>
                    <BookOpen aria-hidden="true" size={20} strokeWidth={1.75} />
                    <span>The full essay: {a.essayTitle}</span>
                  </Link>
                </li>
              )}
              {a.bookHref && a.bookTitle && (
                <li>
                  <Link href={a.bookHref}>
                    <BookOpen aria-hidden="true" size={20} strokeWidth={1.75} />
                    <span>The book behind it: {a.bookTitle}</span>
                  </Link>
                </li>
              )}
              {more.map((c) => {
                const Icon = iconFor(c.href);
                return (
                  <li key={c.href}>
                    <Link href={c.href}>
                      <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                      <span>
                        <small>{c.lead}</small> {c.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* For the reader who thinks the answer is wrong: where to say so. */}
          <PushBack what="answer" />

          <nav className="qa-turn" aria-label="Previous and next question">
            {prev ? (
              <Link href={answerHref(prev.slug)}>
                <small>
                  <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.75} /> Previous
                </small>
                <span>{prev.question}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={answerHref(next.slug)} className="qa-turn__next">
                <small>
                  Next <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                </small>
                <span>{next.question}</span>
              </Link>
            )}
          </nav>

          <div className="qa-page__foot">
            <Link href="/answers" className="btn btn--quiet">
              <Rows3 aria-hidden="true" size={18} strokeWidth={1.75} /> All the questions
            </Link>
            <button
              type="button"
              className="btn--text"
              onClick={async () => setCopied(await copyToClipboard(`${window.location.origin}${answerHref(a.slug)}`))}
            >
              <Link2 aria-hidden="true" size={18} strokeWidth={1.75} />
              {copied === null ? "Copy a link to this answer" : copied ? "Copied" : "Couldn't copy. The link is in the address bar."}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
