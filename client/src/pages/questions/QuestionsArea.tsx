/**
 * /questions/:area: one area of the apologetics library. Its own opening
 * text (client/public/questions/<area>/_area.json), its pieces in reading
 * order, the words its pages use, and where else on the site to look.
 * A pending area says noindex and carries the review line; a live one lists
 * only its live pieces.
 */
import { Link, useRoute } from "wouter";
import { ArrowDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { LoadFailed } from "@/components/LoadFailed";
import { QUESTIONS_ROOM, areaHref, fetchQuestionsArea, fetchQuestionsIndex, pieceHref, visiblePieces } from "@/lib/questions";
import { QMd, ReviewLine, Waiting, useQFile } from "./parts";
import "./questions.css";

const SITE = "https://www.livewellbyjamesbell.co";

export default function QuestionsArea() {
  const [, params] = useRoute("/questions/:area");
  const slug = params?.area ?? "";
  const index = useQFile("index", fetchQuestionsIndex);
  const entry = index.data?.areas.find((a) => a.slug === slug && a.hasPage) ?? null;
  const page = useQFile(entry ? `area-${slug}` : null, () => fetchQuestionsArea(slug));
  const missing = !!index.data && !entry;
  const failed = index.failed || page.failed;

  if (missing) {
    return (
      <Layout>
        <SEOMeta title="Area Not Found" description="That area of the library is not here. The areas are listed on one page." url={`${SITE}${QUESTIONS_ROOM}`} noindex />
        <PageHead door="The case for the faith" doorHref={QUESTIONS_ROOM} title="That area is not here." line="It may not be written yet. The areas are listed on one page." action={<Link href={QUESTIONS_ROOM} className="btn">All the areas</Link>} />
      </Layout>
    );
  }

  const pending = !entry?.live;
  const pieces = entry ? visiblePieces(entry, pending) : [];
  const blurbs = new Map((page.data?.pieces ?? []).map((p) => [p.slug, p.blurb]));
  const a = page.data;

  return (
    <Layout>
      {entry && a && <SEOMeta title={entry.title} description={a.intro.split("\n\n")[0]} url={`${SITE}${areaHref(slug)}`} noindex={pending} />}
      <Waiting when={!failed && !a} />
      <PageHead door="The case for the faith" doorHref={QUESTIONS_ROOM} title={entry?.title ?? "Opening the area…"} width="var(--w-read)" />
      {entry && pending && <ReviewLine width="var(--w-read)" />}

      {failed ? (
        <LoadFailed what="This area" onRetry={() => { index.retry(); page.retry(); }} backHref={QUESTIONS_ROOM} backLabel="All the areas" />
      ) : a && entry ? (
        <section className="qx-sec">
          <div className="qx-read">
            {/* The opening runs to several paragraphs; on a phone the list is a long way down. */}
            <p style={{ margin: "0 0 var(--s-3)" }}>
              <a href="#the-questions" className="qx-back">
                <ArrowDown aria-hidden="true" size={14} strokeWidth={1.75} /> Go to the {pieces.length} questions
              </a>
            </p>
            <div className="qx-prose">
              <QMd>{a.intro}</QMd>
            </div>

            <h2 id="the-questions" className="qx-h2" style={{ marginTop: "var(--s-5)", scrollMarginTop: 96 }}>The questions</h2>
            <ol className="qx-pieces">
              {pieces.map((p) => (
                <li key={p.slug}>
                  <Link href={pieceHref(slug, p.slug)}>
                    <strong>{p.question}</strong>
                    {blurbs.get(p.slug) && <span>{blurbs.get(p.slug)}</span>}
                  </Link>
                </li>
              ))}
            </ol>

            {a.words.length > 0 && (
              <>
                <h2 className="qx-h2" style={{ marginTop: "var(--s-5)" }}>Words these pages use</h2>
                <dl className="qx-words">
                  {a.words.map((w) => (
                    <div key={w.term}>
                      <dt>{w.term}</dt>
                      <dd>{w.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            {a.elsewhere.length > 0 && (
              <>
                <h2 className="qx-h2" style={{ marginTop: "var(--s-5)" }}>Where else to look</h2>
                <ul className="qx-list">
                  {a.elsewhere.map((e) => (
                    <li key={e}>
                      <QMd inline>{e}</QMd>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p style={{ marginTop: "var(--s-5)" }}>
              <Link href={QUESTIONS_ROOM} className="btn btn--quiet">All ten areas</Link>
            </p>
          </div>
        </section>
      ) : (
        <p role="status" className="qx-sec" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening the area…</p>
      )}
    </Layout>
  );
}
