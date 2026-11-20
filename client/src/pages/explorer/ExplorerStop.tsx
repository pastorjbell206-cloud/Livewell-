/**
 * /study/explorer/:slug: one stop of the Bible Explorer.
 *
 * In order: the stop's name and its one line at the reader's level; the
 * reading level switch; the drawing (for a "tap the picture" activity the
 * drawing is the activity); the story; what it shows us about God; one or
 * two verses from the BSB, each opening the verse panel; the activity; for
 * older readers the honest question and where to go deeper; a calm line
 * toward a trusted adult and Find Help where the stop touches death, fear or
 * guilt; something to talk about; the chapters to read; the thread at this
 * stop; the way back to the map and on to the next finished stop.
 *
 * A stop that is still being drawn is never linked, but its address answers
 * with its summary and says so. Opening a finished stop marks it visited on
 * this device (lib/explorer.ts).
 */
import { useCallback, useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Hourglass,
  LifeBuoy,
  MessageCircle,
} from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { LoadFailed } from "@/components/LoadFailed";
import { RefText, VerseRef } from "@/components/VerseRef";
import {
  EXPLORER_PATH,
  fetchExplorerIndex,
  filmsFor,
  fetchStop,
  stopHref,
  threadsAt,
  useExplorerProgress,
  SAVE_FAILED,
  type ExplorerIndex,
  type Level,
  type Stop,
} from "@/lib/explorer";
import { Roundel } from "./art";
import { WatchLinks } from "./Watch";
import "./films/film.css";
import {
  ChooseActivity,
  CycleActivity,
  hasScene,
  LevelSwitch,
  MatchActivity,
  OrderActivity,
  RevealActivity,
  Scene,
  TapActivity,
  ThreadIcon,
  WalkActivity,
} from "./parts";
import "./explorer.css";

type Loaded = { stop: Stop; index: ExplorerIndex };

function useStop(slug: string) {
  const [res, setRes] = useState<{ key: string; data: Loaded | null } | null>(
    null
  );
  const [nonce, setNonce] = useState(0);
  const key = `${slug}:${nonce}`;
  useEffect(() => {
    let live = true;
    Promise.all([fetchStop(slug), fetchExplorerIndex()])
      .then(([stop, index]) => live && setRes({ key, data: { stop, index } }))
      .catch(() => live && setRes({ key, data: null }));
    return () => {
      live = false;
    };
  }, [slug, key]);
  const data = res?.key === key ? res.data : undefined;
  return { data, retry: useCallback(() => setNonce(n => n + 1), []) };
}

export default function ExplorerStop() {
  const [, params] = useRoute("/study/explorer/:slug");
  const slug = params?.slug ?? "";
  const { data, retry } = useStop(slug);
  const explorer = useExplorerProgress();

  return (
    <Layout>
      {data === null ? (
        <div style={{ padding: "var(--s-6) var(--gutter)" }}>
          <SEOMeta
            title="Bible Explorer"
            description="The whole Bible as one story, on one map, for ages 7 to 16."
            url={`https://www.livewellbyjamesbell.co${EXPLORER_PATH}`}
            noindex
          />
          <LoadFailed
            what="This stop"
            onRetry={retry}
            backHref={EXPLORER_PATH}
            backLabel="Back to the map"
          />
        </div>
      ) : data === undefined ? (
        <div
          className="ex-sec"
          data-lw-loading
          aria-busy="true"
          style={{ minHeight: "80vh" }}
        >
          <p className="ex-note" style={{ textAlign: "center" }}>
            Opening the stop…
          </p>
        </div>
      ) : (
        <StopPage key={data.stop.slug} {...data} explorer={explorer} />
      )}
    </Layout>
  );
}

function StopPage({
  stop,
  index,
  explorer,
}: Loaded & { explorer: ReturnType<typeof useExplorerProgress> }) {
  const { progress, saveFailed, setLevel, visit, markDone } = explorer;
  const level: Level = progress.level;
  const finished = stop.status === "finished";
  const { slug } = stop;

  useEffect(() => {
    if (finished) visit(slug);
    // visit is stable in effect for this stop; run once per stop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, finished]);

  const done = useCallback(() => markDone(slug), [markDone, slug]);
  // Read once, when the stop opens: finishing the activity now is not "before".
  const [doneBefore] = useState(() => progress.done.includes(slug));

  const i = index.stops.findIndex(s => s.slug === slug);
  const summary = index.stops[i];
  const nextReady = index.stops.slice(i + 1).find(s => s.status === "finished");
  const prevReady = [...index.stops.slice(0, Math.max(i, 0))]
    .reverse()
    .find(s => s.status === "finished");
  const threads = threadsAt(slug, index.threads);
  const url = `https://www.livewellbyjamesbell.co${stopHref(slug)}`;
  const actLine = summary ? `${summary.actLabel}: ${summary.actTitle}` : "";

  if (!finished) {
    return (
      <>
        <SEOMeta
          title={`${stop.title}: Bible Explorer`}
          description={stop.summary.older}
          url={url}
          noindex
        />
        <PageHead
          door="Bible Explorer"
          doorHref={EXPLORER_PATH}
          title={stop.title}
          line={stop.summary[level]}
          art={<Roundel slug={slug} className="ex-headmark" />}
        />
        <section className="ex-sec ex-sec--warm">
          <div className="ex-wrap">
            <p className="ex-stop__drawing" style={{ fontSize: 16 }}>
              <Hourglass size={18} strokeWidth={1.75} aria-hidden="true" />{" "}
              {stop.range}. This stop is being drawn.
            </p>
            <p style={{ marginTop: "var(--s-3)" }}>
              <Link href={EXPLORER_PATH} className="btn btn--quiet">
                <ArrowLeft
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  style={{ marginRight: 8 }}
                />
                Back to the map
              </Link>
            </p>
          </div>
        </section>
      </>
    );
  }

  const a = stop.activity;
  // A picture to tap or walk through is the activity itself, so it comes first.
  const tapFirst =
    (a?.kind === "tap" || a?.kind === "walk") && hasScene(stop.scene);
  // Below the picture (warm cream), the sections alternate cream and warm cream.
  let band = 0;
  const tone = () => (band++ % 2 === 0 ? "ex-sec" : "ex-sec ex-sec--warm");

  return (
    <>
      <SEOMeta
        title={`${stop.title}: Bible Explorer`}
        description={stop.summary.older}
        url={url}
      />
      <PageHead
        door="Bible Explorer"
        doorHref={EXPLORER_PATH}
        title={stop.title}
        line={stop.summary[level]}
        art={<Roundel slug={slug} className="ex-headmark" />}
      >
        <p className="ex-note" style={{ marginTop: 0 }}>
          Stop {stop.n} of {index.stops.length}. {actLine}. {stop.range}.
        </p>
      </PageHead>

      <section className="ex-sec ex-sec--tight" aria-label="Reading level">
        <div className="ex-wrap">
          <div style={{ maxWidth: "26rem" }}>
            <LevelSwitch
              level={level}
              onLevel={setLevel}
              saveFailed={saveFailed}
            />
            {saveFailed && <p className="ex-alert">{SAVE_FAILED}</p>}
          </div>
        </div>
      </section>

      <section className="ex-sec ex-sec--warm" aria-label="The picture">
        <div className="ex-wrap">
          {tapFirst && a?.kind === "tap" ? (
            <TapActivity
              activity={a}
              onDone={done}
              doneBefore={doneBefore}
              scene={stop.scene!}
              sceneLabel={stop.sceneLabel ?? stop.title}
            />
          ) : tapFirst && a?.kind === "walk" ? (
            <WalkActivity
              activity={a}
              onDone={done}
              doneBefore={doneBefore}
              scene={stop.scene!}
              sceneLabel={stop.sceneLabel ?? stop.title}
            />
          ) : (
            hasScene(stop.scene) && (
              <Scene name={stop.scene!} label={stop.sceneLabel ?? stop.title} />
            )
          )}
        </div>
      </section>

      <section className={tone()} aria-labelledby="ex-story-title">
        <div className="ex-wrap ex-cols">
          <div>
            <h2 className="ex-h2" id="ex-story-title">
              The story
            </h2>
            <div className="ex-read">
              {stop.story?.[level].map((p, n) => (
                <p key={n}>
                  <RefText text={p} />
                </p>
              ))}
            </div>
            {level === "older" && stop.differ && (
              <p className="ex-care">
                <BookOpen size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  {stop.differ.text}{" "}
                  <Link href={stop.differ.href} className="ex-link">
                    {stop.differ.label}
                  </Link>
                </span>
              </p>
            )}
            {stop.care && (
              <p className="ex-care">
                <LifeBuoy size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  {stop.care.replace(
                    / or look at Find Help\.$/,
                    " or look at "
                  )}
                  {/ or look at Find Help\.$/.test(stop.care) ? (
                    <>
                      <Link href="/help" className="ex-link">
                        Find Help
                      </Link>
                      .
                    </>
                  ) : null}
                </span>
              </p>
            )}
          </div>
          <aside
            className="ex-aside"
            aria-label="What this shows us about God, and the verses"
          >
            <div className="ex-panel">
              <h2 className="ex-panel__title">What this shows us about God</h2>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-reading)",
                  fontSize: 18,
                  lineHeight: 1.6,
                }}
              >
                <RefText text={stop.god?.[level] ?? ""} />
              </p>
            </div>
            <div className="ex-verses">
              {stop.verses?.map(v => (
                <blockquote key={v.ref} className="ex-quote">
                  <p>{v.text}</p>
                  <p className="ex-quote__ref">
                    <VerseRef reference={v.ref} />
                  </p>
                </blockquote>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {a && !tapFirst && (
        <section className={tone()} aria-label="Something to do">
          <div className="ex-wrap" style={{ maxWidth: "48rem" }}>
            {a.kind === "order" && (
              <OrderActivity
                activity={a}
                onDone={done}
                doneBefore={doneBefore}
              />
            )}
            {a.kind === "match" && (
              <MatchActivity
                activity={a}
                onDone={done}
                doneBefore={doneBefore}
              />
            )}
            {a.kind === "choose" && (
              <ChooseActivity
                activity={a}
                onDone={done}
                doneBefore={doneBefore}
              />
            )}
            {a.kind === "cycle" && (
              <CycleActivity
                activity={a}
                onDone={done}
                doneBefore={doneBefore}
              />
            )}
            {a.kind === "reveal" && (
              <RevealActivity
                activity={a}
                onDone={done}
                doneBefore={doneBefore}
              />
            )}
          </div>
        </section>
      )}

      {level === "older" && stop.question && (
        <section className={tone()} aria-labelledby="ex-question-title">
          <div className="ex-wrap">
            <h2 className="ex-h2" id="ex-question-title">
              A question people ask
            </h2>
            <p
              className="ex-lede"
              style={{
                fontFamily: "var(--F)",
                fontSize: "1.6rem",
                lineHeight: 1.25,
                color: "var(--ink)",
                marginBottom: "var(--s-2)",
              }}
            >
              {stop.question.ask}
            </p>
            <div className="ex-read">
              {stop.question.answer.map((p, n) => (
                <p key={n}>
                  <RefText text={p} />
                </p>
              ))}
            </div>
            {stop.deeper && stop.deeper.length > 0 && (
              <>
                <h3
                  className="ex-panel__title"
                  style={{ marginTop: "var(--s-3)" }}
                >
                  Go deeper on LiveWell
                </h3>
                <ul className="ex-deeper">
                  {stop.deeper.map(d => (
                    <li key={d.href}>
                      <Link href={d.href}>{d.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      <section className={tone()} aria-labelledby="ex-talk-title">
        <div className="ex-wrap ex-cols">
          <div>
            <h2 className="ex-h2" id="ex-talk-title">
              Talk about it
            </h2>
            <p className="ex-talk">
              <MessageCircle
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ verticalAlign: "-3px", marginRight: 8 }}
              />
              {stop.talk?.[level]}
            </p>
            {threads.map(({ thread, at }) => (
              <p
                key={thread.id}
                className="ex-stop__thread"
                style={{ marginTop: "var(--s-3)" }}
              >
                <ThreadIcon id={thread.id} />
                <span>
                  <strong style={{ fontFamily: "var(--U)", fontSize: 14 }}>
                    {thread.name}.
                  </strong>{" "}
                  {at.line} <VerseRef reference={at.ref} />{" "}
                  <Link
                    href={`${EXPLORER_PATH}?thread=${thread.id}`}
                    className="ex-link"
                  >
                    Follow it on the map
                  </Link>
                </span>
              </p>
            ))}
          </div>
          <div>
            <h2 className="ex-panel__title">
              Read it yourself in the Study Bible
            </h2>
            <ul className="ex-chapters">
              {stop.read?.map(r => (
                <li key={r.href}>
                  <Link href={r.href}>
                    <BookOpen size={16} strokeWidth={1.75} aria-hidden="true" />
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            {filmsFor(index, { stop: slug }).length > 0 && (
              <>
                <h2
                  className="ex-panel__title"
                  style={{ marginTop: "var(--s-3)" }}
                >
                  Watch and learn
                </h2>
                <WatchLinks index={index} stop={slug} />
              </>
            )}
          </div>
        </div>
      </section>

      <nav className={tone()} aria-label="Along the road">
        <div className="ex-wrap ex-nav">
          {prevReady ? (
            <Link href={stopHref(prevReady.slug)} className="btn btn--quiet">
              <ArrowLeft
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ marginRight: 8 }}
              />
              {prevReady.title}
            </Link>
          ) : (
            <Link href={EXPLORER_PATH} className="btn btn--quiet">
              <ArrowLeft
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ marginRight: 8 }}
              />
              The whole map
            </Link>
          )}
          {nextReady ? (
            <Link href={stopHref(nextReady.slug)} className="btn">
              Next stop: {nextReady.title}
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ marginLeft: 8 }}
              />
            </Link>
          ) : (
            <span
              style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-2)" }}
            >
              <Link href={EXPLORER_PATH} className="btn">
                The whole map
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  style={{ marginLeft: 8 }}
                />
              </Link>
              <Link
                href={`${EXPLORER_PATH}#ex-believe-title`}
                className="btn btn--quiet"
              >
                Why we believe
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  style={{ marginLeft: 8 }}
                />
              </Link>
            </span>
          )}
        </div>
        {prevReady && (
          <div className="ex-wrap" style={{ marginTop: "var(--s-2)" }}>
            <Link
              href={`${EXPLORER_PATH}#stop-${slug}`}
              className="ex-link"
              style={{ fontFamily: "var(--U)", fontSize: 15 }}
            >
              See this stop on the whole map
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
