/**
 * /questions/claims: every claim the library answers, by claim, with the
 * person and the work it comes from and a link to the piece that treats it
 * (built from the pieces' `claims`, through the manifest). About claims, not
 * people: no portrait, no label for the person. Pending rules as the room:
 * while the room is pending this page is too, and lists pending claims.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { LoadFailed } from "@/components/LoadFailed";
import { QUESTIONS_ROOM, fetchQuestionsIndex, pieceHref } from "@/lib/questions";
import { ReviewLine, Waiting, useQFile } from "./parts";
import "./questions.css";

export default function QuestionsClaims() {
  const { data, failed, loading, retry } = useQFile("index", fetchQuestionsIndex);
  const pending = !data?.roomLive;
  const claims = (data?.claims ?? []).filter((c) => c.live || pending);
  const areas = (data?.areas ?? []).filter((a) => claims.some((c) => c.area === a.slug));

  return (
    <Layout>
      <SEOMeta
        title="Look up a claim"
        description="Claims made against the Christian faith, each with the work it comes from and a link to the page that answers it."
        url="https://www.livewellbyjamesbell.co/questions/claims"
        noindex={pending}
      />
      <Waiting when={loading} />
      <PageHead door="The case for the faith" doorHref={QUESTIONS_ROOM} title="Look up a claim" line="Each claim as its proponent makes it, with the page that answers it." width="var(--w-read)" />
      {data && pending && <ReviewLine width="var(--w-read)" />}

      <section className="qx-sec">
        <div className="qx-read">
          {failed ? (
            <LoadFailed what="The claims" onRetry={retry} backHref={QUESTIONS_ROOM} backLabel="All the areas" />
          ) : !data ? (
            <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening the claims…</p>
          ) : claims.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>No claim is answered here yet.</p>
          ) : (
            areas.map((a) => (
              <section key={a.slug} aria-labelledby={`qx-claims-${a.slug}`} style={{ marginBottom: "var(--s-5)" }}>
                <h2 id={`qx-claims-${a.slug}`} className="qx-h2">{a.title}</h2>
                <ul className="qx-claims">
                  {claims.filter((c) => c.area === a.slug).map((c) => (
                    <li key={`${c.slug}-${c.claim}`}>
                      <q>{c.claim}</q>
                      <p className="qx-claims__who">
                        {c.proponent}, <cite>{c.work}</cite> ({c.year})
                      </p>
                      <Link href={pieceHref(c.area, c.slug)}>
                        {c.question} <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
          <p>
            <Link href={QUESTIONS_ROOM} className="btn btn--quiet">All ten areas</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
