/**
 * /questions/:area/:slug: one piece of the apologetics library
 * (client/public/questions/<area>/<slug>.json), word for word.
 *
 * The short answer at the top; then the contents of the argued piece, each
 * part with a way back to the contents (a long page on a phone needs one);
 * the argument's steps as a real numbered list with the step that carries
 * the weight marked; the two reading lists; the piece's own pointers into the
 * site; and links to the Study Bible notes and Honest Answers that treat the
 * same ground. Scripture references open as verse sheets; the wording is not
 * changed. A pending piece says noindex and carries the review line.
 */
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUp, BookOpen, MessageCircleQuestion } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { LoadFailed } from "@/components/LoadFailed";
import { SCRIPTURE_BOOKS } from "@/lib/scripture-ref";
import { QUESTIONS_ROOM, areaHref, fetchQuestionPiece, fetchQuestionsIndex, pieceHref, sectionId, visiblePieces, type QPiece, type QSection } from "@/lib/questions";
import { QMd, ReviewLine, Waiting, useQFile } from "./parts";
import "./questions.css";

const SITE = "https://www.livewellbyjamesbell.co";

const bookName = (slug: string) => SCRIPTURE_BOOKS.find((b) => b.slug === slug)?.name ?? slug;

function Back() {
  return (
    <a href="#contents" className="qx-back">
      <ArrowUp aria-hidden="true" size={14} strokeWidth={1.75} /> Contents
    </a>
  );
}

function Argument({ s }: { s: Extract<QSection, { role: "argument" }> }) {
  return (
    <>
      {s.intro && <QMd>{s.intro}</QMd>}
      <figure className="qx-arg">
        <figcaption>The argument in {s.steps.length} steps</figcaption>
        <ol>
          {s.steps.map((t, i) => (
            <li key={i} className={i + 1 === s.weightStep ? "qx-weight" : undefined}>
              <QMd inline>{t}</QMd>
              {i + 1 === s.weightStep && <span className="qx-weight__tag">This step carries the weight</span>}
            </li>
          ))}
        </ol>
        <div className="qx-so">
          <QMd inline>{s.conclusion}</QMd>
        </div>
      </figure>
      {s.after && <QMd>{s.after}</QMd>}
    </>
  );
}

/** The contents: the parts in order, then the reading lists and the links into the site. */
function parts(p: QPiece) {
  const list = p.sections.map((s) => ({ id: sectionId(s.heading), label: s.heading }));
  if (p.otherSide.length) list.push({ id: "read-the-other-side", label: "Read the other side" });
  if (p.further.length) list.push({ id: "read-further", label: "Read further" });
  list.push({ id: "on-the-site", label: "On the site" });
  return list;
}

export default function QuestionPiece() {
  const [, params] = useRoute("/questions/:area/:slug");
  const area = params?.area ?? "";
  const slug = params?.slug ?? "";
  const index = useQFile("index", fetchQuestionsIndex);
  const entry = index.data?.areas.find((a) => a.slug === area) ?? null;
  const listed = entry?.pieces.find((p) => p.slug === slug) ?? null;
  const piece = useQFile(listed ? `${area}/${slug}` : null, () => fetchQuestionPiece(area, slug));
  const missing = !!index.data && !listed;
  const failed = index.failed || piece.failed;

  if (missing) {
    return (
      <Layout>
        <SEOMeta title="Question Not Found" description="That question is not here. The library's areas are listed on one page." url={`${SITE}${QUESTIONS_ROOM}`} noindex />
        <PageHead door="The case for the faith" doorHref={QUESTIONS_ROOM} title="That question is not here." line="It may not be written yet. The areas are listed on one page." action={<Link href={QUESTIONS_ROOM} className="btn">All the areas</Link>} />
      </Layout>
    );
  }

  const p = piece.data;
  const pending = !listed?.live;
  const around = entry ? visiblePieces(entry, pending) : [];
  const at = around.findIndex((x) => x.slug === slug);
  const prev = at > 0 ? around[at - 1] : null;
  const next = at >= 0 && at < around.length - 1 ? around[at + 1] : null;
  const answers = index.data?.answers ?? {};
  const notes = p?.links.studyNotes ?? [];
  const linkedAnswers = (p?.links.answers ?? []).filter((s) => answers[s]);

  return (
    <Layout>
      {p && <SEOMeta title={p.question} description={p.shortAnswer} url={`${SITE}${pieceHref(area, slug)}`} type="article" noindex={pending} />}
      <Waiting when={!failed && !p} />
      <PageHead door={entry?.title ?? "The case for the faith"} doorHref={entry ? areaHref(area) : QUESTIONS_ROOM} title={listed?.question ?? "Opening the question…"} width="var(--w-default)" />
      {listed && pending && <ReviewLine />}

      {failed ? (
        <LoadFailed what="This question" onRetry={() => { index.retry(); piece.retry(); }} backHref={entry ? areaHref(area) : QUESTIONS_ROOM} backLabel="Back to the area" />
      ) : p ? (
        <section className="qx-sec">
          <article className="qx-read qx-prose">
            <div className="qx-short">
              <h2 className="eyebrow">The short answer</h2>
              <QMd>{p.shortAnswer}</QMd>
            </div>

            <nav className="qx-contents" id="contents" aria-labelledby="qx-contents-title">
              <h2 id="qx-contents-title">In this piece</h2>
              <ol>
                {parts(p).map((x) => (
                  <li key={x.id}>
                    <a href={`#${x.id}`}>{x.label}</a>
                  </li>
                ))}
              </ol>
            </nav>

            {p.sections.map((s) => (
              <section key={s.heading} className="qx-part" id={sectionId(s.heading)}>
                <h2>{s.heading}</h2>
                {s.role === "argument" ? <Argument s={s} /> : <QMd>{s.body}</QMd>}
                <Back />
              </section>
            ))}

            {p.otherSide.length > 0 && (
              <section className="qx-part" id="read-the-other-side">
                <h2>Read the other side</h2>
                <ul className="qx-list">
                  {p.otherSide.map((e) => (
                    <li key={e}><QMd inline>{e}</QMd></li>
                  ))}
                </ul>
              </section>
            )}
            {p.further.length > 0 && (
              <section className="qx-part" id="read-further">
                <h2>Read further</h2>
                <ul className="qx-list">
                  {p.further.map((e) => (
                    <li key={e}><QMd inline>{e}</QMd></li>
                  ))}
                </ul>
                <Back />
              </section>
            )}

            <section className="qx-part" id="on-the-site">
              <h2>On the site</h2>
              {p.onSite.length > 0 && (
                <ul className="qx-list">
                  {p.onSite.map((e) => (
                    <li key={e}><QMd inline>{e}</QMd></li>
                  ))}
                </ul>
              )}
              {notes.length > 0 && (
                <>
                  <h3 className="eyebrow" style={{ margin: "var(--s-3) 0 var(--s-1)" }}>Where the Study Bible treats this</h3>
                  <ul className="qx-links">
                    {notes.map((n) => (
                      <li key={`${n.book}-${n.chapter}`}>
                        <Link href={`/study/bible/${n.book}/${n.chapter}`}>
                          <BookOpen aria-hidden="true" size={20} strokeWidth={1.75} />
                          <span>
                            {bookName(n.book)} {n.chapter}
                            <small>The chapter and its notes</small>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {linkedAnswers.length > 0 && (
                <>
                  <h3 className="eyebrow" style={{ margin: "var(--s-3) 0 var(--s-1)" }}>Honest Answers on the same ground</h3>
                  <ul className="qx-links">
                    {linkedAnswers.map((s) => (
                      <li key={s}>
                        <Link href={`/answers/${s}`}>
                          <MessageCircleQuestion aria-hidden="true" size={20} strokeWidth={1.75} />
                          <span>{answers[s]}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Back />
            </section>

            {(prev || next) && (
              <nav className="qx-turn" aria-label="Previous and next question">
                {prev ? (
                  <Link href={pieceHref(area, prev.slug)}>
                    <small><ArrowLeft aria-hidden="true" size={16} strokeWidth={1.75} /> Previous</small>
                    <span>{prev.question}</span>
                  </Link>
                ) : <span />}
                {next && (
                  <Link href={pieceHref(area, next.slug)} className="qx-turn__next">
                    <small>Next <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} /></small>
                    <span>{next.question}</span>
                  </Link>
                )}
              </nav>
            )}
            <p style={{ marginTop: "var(--s-4)" }}>
              <Link href={areaHref(area)} className="btn btn--quiet">All the questions in this area</Link>
            </p>
          </article>
        </section>
      ) : (
        <p role="status" className="qx-sec" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening the question…</p>
      )}
    </Layout>
  );
}
