/**
 * /questions: the apologetics library's room (docs/work/elite/apol-library.md,
 * section 4). The plan's ten areas, each with one line saying what it holds
 * and the number of its pieces; an
 * area with no piece to show is named as "being written", with no link.
 *
 * While no area is live the room itself is pending: it says noindex, carries
 * the review line, and lists the pending pieces so they can be read on the
 * preview. Once an area is live, the room lists only live pieces.
 */
import { Link } from "wouter";
import { ArrowRight, Quote } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { LoadFailed } from "@/components/LoadFailed";
import { QUESTIONS_CLAIMS, areaHref, fetchQuestionsIndex, visiblePieces } from "@/lib/questions";
import { ReviewLine, Waiting, useQFile } from "./parts";
import "./questions.css";

export default function QuestionsRoom() {
  const { data, failed, loading, retry } = useQFile("index", fetchQuestionsIndex);
  const pending = !data?.roomLive;
  const claims = (data?.claims ?? []).filter((c) => c.live || pending);

  return (
    <Layout>
      <SEOMeta
        title="The case for the faith"
        description="Hard questions about Christianity, taken one at a time: the objection at its strongest, what is true in it, the evidence, the argument, and books on both sides."
        url="https://www.livewellbyjamesbell.co/questions"
        noindex={pending}
      />
      <Waiting when={loading} />
      <PageHead
        door="Questions"
        doorHref="/topics"
        title="The case for the faith"
        line="Hard questions, one at a time, with the evidence and the best books on both sides."
        plate="lens"
        width="var(--w-default)"
      />
      {data && pending && <ReviewLine />}

      <section className="qx-sec" aria-labelledby="qx-areas-title">
        <div className="qx-wrap">
          <h2 id="qx-areas-title" className="qx-h2">Ten areas</h2>
          {failed ? (
            <LoadFailed what="The list of areas" onRetry={retry} backHref="/topics" backLabel="Back to Questions" />
          ) : !data ? (
            <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening the areas…</p>
          ) : (
            <ol className="qx-areas">
              {data.areas.map((a) => {
                const n = visiblePieces(a, pending).length;
                const head = (
                  <>
                    <span className="qx-area__n">Area {a.n}</span>
                    <h3 className="qx-area__title">{a.title}</h3>
                    {a.line && <p className="qx-area__line">{a.line}</p>}
                  </>
                );
                return (
                  <li key={a.slug}>
                    {n > 0 && a.hasPage ? (
                      <Link href={areaHref(a.slug)} className="qx-area">
                        {head}
                        <span className="qx-area__count">
                          {n} {n === 1 ? "piece" : "pieces"} <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                        </span>
                      </Link>
                    ) : (
                      <div className="qx-area">
                        {head}
                        <span className="qx-area__count">Being written</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
          {claims.length > 0 && (
            <p style={{ margin: "var(--s-4) 0 0" }}>
              <Link href={QUESTIONS_CLAIMS} className="btn btn--quiet">
                <Quote aria-hidden="true" size={18} strokeWidth={1.75} /> Look up a claim
              </Link>
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
