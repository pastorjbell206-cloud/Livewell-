/**
 * /topics: the questions people are carrying, in their own words, each
 * opening the one best page on the site (MASTER-PLAN 4.1, 4.2). A topic page
 * where no single page assembles the answer; otherwise the care page, the
 * Honest Answer, the study guide, or the essay that already does. Personal
 * needs keep their home at Find Help, so those rows open the care page itself.
 *
 * The rows come from client/public/topics/index.json
 * (scripts/build-topics-index.mjs). A row to an essay that is not public yet
 * opens its named stand-in until the shelf says it is (lib/topics rowTarget).
 */
import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import LoadFailed from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { TOPICS_INDEX_URL, isTopicsIndex, kindLabel, rowTarget, type TopicsIndex } from "@/lib/topics";

type State = { status: "loading" } | { status: "failed" } | { status: "ready"; index: TopicsIndex };

/** The index, with a retry (the fetch-json pattern: never "Loading…" forever). */
function useTopicsIndex(): { state: State; retry: () => void } {
  const [nonce, setNonce] = useState(0);
  const [state, setState] = useState<{ nonce: number; value: State }>({ nonce: 0, value: { status: "loading" } });
  useEffect(() => {
    let live = true;
    fetchJson(TOPICS_INDEX_URL, isTopicsIndex)
      .then((index) => live && setState({ nonce, value: { status: "ready", index } }))
      .catch(() => live && setState({ nonce, value: { status: "failed" } }));
    return () => {
      live = false;
    };
  }, [nonce]);
  const retry = useCallback(() => setNonce((n) => n + 1), []);
  return { state: state.nonce === nonce ? state.value : { status: "loading" }, retry };
}

export default function Topics() {
  const { state, retry } = useTopicsIndex();
  return (
    <Layout>
      <SEOMeta
        title="Topics: The Hard Questions of Faith in Post-Christian America"
        description="Christian nationalism, raising children in a secular age, living after Christendom, doubt, suffering, and more. Each question opens the one page on the site that answers it best."
        url="https://www.livewellbyjamesbell.co/topics"
      />
      <PageHead
        eyebrow="Topics"
        title="Hard questions, and where to start"
        lede="Each question opens the one page on this site that answers it best."
        width="var(--w-content)"
      />
      <section className="tp-index-page">
        <div className="tp-index-wrap">
          {state.status === "failed" ? (
            <LoadFailed what="The list of topics" onRetry={retry} backHref="/search" backLabel="Search the site" />
          ) : state.status === "loading" ? (
            <p role="status" className="tp-status">
              Loading…
            </p>
          ) : (
            <ul className="ed-index tp-index" aria-label="Questions">
              {state.index.rows.map((row) => {
                const href = rowTarget(row);
                const kicker = kindLabel(href);
                return (
                  <li key={row.href}>
                    <Link href={href} className="ed-row">
                      <div>
                        {kicker && <span className="ed-kicker">{kicker}</span>}
                        <h2 className="ed-title tp-index__q">{row.askedAs}</h2>
                        <p className="ed-dek">{row.line}</p>
                      </div>
                      <span className="ed-arrow" aria-hidden>
                        →
                      </span>
                    </Link>
                    {row.also && (
                      <Link href={row.also.href} className="tp-also">
                        Or: {row.also.label}
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <p className="tp-foot">
            Not here? <Link href="/search">Search the site</Link>, or, if this is a hard season, go to{" "}
            <Link href="/help">Find Help</Link>.
          </p>
        </div>
      </section>
    </Layout>
  );
}
