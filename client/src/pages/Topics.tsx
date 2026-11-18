/**
 * /topics: the Questions door, "Hard questions" (components/art/README.md,
 * "How a door's page is built"; pages/Study.tsx is the model).
 *
 * 1. The page top: PageHead at the door size, with the lantern plate.
 * 2. The one thing to do first: the ask box (components/questions/AskBox).
 *    Type a question, get the one page that answers it best, then two or
 *    three next steps.
 * 3. The questions, as cards grouped by what people ask, each group with
 *    its icon (data/questionGroups.ts): every Honest Answer by its own page,
 *    and every row of the topics index (client/public/topics/index.json,
 *    scripts/build-topics-index.mjs) opening the page it opens today. A row
 *    to an essay that is not public yet opens its stand-in (lib/topics
 *    rowTarget).
 * 4. The rooms of the door, as picture cards, and the way to Find Help.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Compass, LifeBuoy, MessageCircleQuestion, Rows3 } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import DoorCard from "@/components/art/DoorCard";
import type { PlateName } from "@/components/art/Plate";
import LoadFailed from "@/components/LoadFailed";
import AskBox from "@/components/questions/AskBox";
import QuestionGroups from "@/components/questions/QuestionGroups";
import { ANSWERS } from "@/data/answers";
import { ROWS_HELD_ELSEWHERE } from "@/data/questionGroups";
import { fetchJson } from "@/lib/fetch-json";
import { toAnswerPage, type AskCandidate } from "@/lib/askQuestion";
import { TOPICS_INDEX_URL, isTopicsIndex, rowTarget, type TopicsIndex } from "@/lib/topics";
import "./home/home.css";

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

/** The rooms of the Questions door, in the map's order. Every one is a page that exists. */
const ROOMS: { title: string; note: string; href: string; plate: PlateName }[] = [
  { title: "Honest Answers", note: `${ANSWERS.length} questions, a page each`, href: "/answers", plate: "tomb" },
  { title: "For skeptics", note: "Test the case yourself", href: "/skeptics", plate: "lens" },
  { title: "What Christians believe", note: "Doctrine, topic by topic", href: "/study/bible/doctrines", plate: "books" },
  { title: "Where Christians differ", note: "The views side by side", href: "/theology/compare", plate: "compass" },
  { title: "Everyday life", note: "Home, work, money, body", href: "/life", plate: "table" },
];

export default function Topics() {
  const { state, retry } = useTopicsIndex();
  const rows = useMemo(() => (state.status === "ready" ? state.index.rows.filter((r) => !ROWS_HELD_ELSEWHERE.has(r.href)) : []), [state]);
  // The rows that are not Honest Answers, for the ask box to match too.
  const askRows = useMemo<AskCandidate[]>(
    () =>
      rows
        .map((r) => ({ r, href: toAnswerPage(rowTarget(r)) }))
        .filter(({ href }) => !href.startsWith("/answers"))
        .map(({ r, href }) => ({ question: r.askedAs, href, keywords: "", body: r.line })),
    [rows],
  );

  return (
    <Layout>
      <SEOMeta
        title="Hard Questions About Faith, by Topic"
        description="Christian nationalism, raising children in a secular age, doubt, suffering, and more. Each question opens the one page on the site that answers it best."
        url="https://www.livewellbyjamesbell.co/topics"
      />

      <PageHead
        size="door"
        door="Questions"
        title="Hard questions"
        line="Ask in your own words. Get a straight answer."
        plate="lantern"
        action={
          <Link href="/answers" className="btn">
            All {ANSWERS.length} Honest Answers
          </Link>
        }
      />

      {/* FIRST: ask. */}
      <section className="home-sec home-sec--dark qa-ask-sec" aria-labelledby="qa-ask-title">
        <div className="home-wrap">
          <SectionHead dark icon={MessageCircleQuestion} label="Ask" title="What do you want to know?" id="qa-ask-title" />
          <AskBox rows={askRows} />
        </div>
      </section>

      {/* THE QUESTIONS, grouped. */}
      <section className="home-sec" aria-labelledby="qa-groups-title">
        <div className="home-wrap">
          <SectionHead icon={Rows3} label="By topic" title="What people ask." id="qa-groups-title" />
          {state.status === "failed" ? (
            <LoadFailed what="The list of topics" onRetry={retry} backHref="/search" backLabel="Search the site" />
          ) : (
            <QuestionGroups rows={rows} />
          )}
        </div>
      </section>

      {/* THE ROOMS, and the way to help. */}
      <section className="home-sec home-sec--warm" aria-labelledby="qa-rooms-title">
        <div className="home-wrap">
          <SectionHead icon={Compass} label="Further in" title="Go deeper." id="qa-rooms-title" />
          <ul className="lw-rooms">
            {ROOMS.map((r) => (
              <li key={r.href}>
                <DoorCard {...r} />
              </li>
            ))}
          </ul>
          <p className="lw-newline">
            <LifeBuoy aria-hidden="true" size={22} strokeWidth={1.75} />
            <span>
              Carrying something heavy right now? <Link href="/help">Find Help</Link>.
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
}
