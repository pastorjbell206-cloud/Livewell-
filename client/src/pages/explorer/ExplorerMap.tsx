/**
 * /study/explorer: the Bible Explorer, the whole Bible as one road for
 * readers aged 7 to 16.
 *
 * 1. The page top (PageHead, inner size) with the road drawn as its picture.
 * 2. The controls: the reading level (Ages 7 to 11, Ages 12 to 16, kept on
 *    this device) and the threads. Tapping a thread lights it on the map at
 *    every stop where it runs, with one line at each stop saying how; a
 *    solid line where God lives among his people, a broken one where the
 *    closeness is lost or still waited for.
 * 3. The map: one stop for each movement of the story, filed under the
 *    eleven acts of the Bible's Story (/study/bible/story). A finished stop
 *    opens its own page; a stop still being drawn shows its summary and says
 *    so, with no link. "You are here" marks the last stop opened.
 * 4. "What the Explorer holds": every part of the room counted, each a
 *    link to its own section, so any film, card, thread or map is two taps
 *    from here at most (the counts also stand beside each heading).
 * 5. "Watch and learn" (Watch.tsx): the moving pictures and the maps that move.
 * 6. "Why we believe": the core doctrines as cards, each resting on its
 *    passages and pointing back to the stops that teach it, with a list of
 *    the cards at the top of the section.
 * 7. For parents and leaders.
 *
 * Data: client/public/explorer/index.json (scripts/build-explorer-index.mjs).
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Check, Hourglass, MapPin, PenLine } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import Plate from "@/components/art/Plate";
import PlateFrame from "@/components/art/PlateFrame";
import { LoadFailed } from "@/components/LoadFailed";
import { VerseRef } from "@/components/VerseRef";
import {
  fetchExplorerIndex,
  filmsFor,
  stopHref,
  isBrokenState,
  threadStops,
  useExplorerProgress,
  SAVE_FAILED,
  type Card,
  type ExplorerIndex,
  type Level,
  type StopSummary,
  type Thread,
  type ThreadStop,
} from "@/lib/explorer";
import { CardArt, CARD_PICTURES, HeadArt, Roundel } from "./art";
import { Count, LevelSwitch, ThreadIcon } from "./parts";
import { Watch, WatchLinks } from "./Watch";
import "./explorer.css";
import "./films/film.css";

/** Where each roundel sits across the road's column, in percent: a gentle S down the page. */
const SWAY = [32, 68];
export const swayAt = (i: number) => SWAY[i % 2];

/** The road through one stop: from the middle of the column at the top, out to the roundel, back to the middle. */
function roadPath(x: number, first: boolean, last: boolean) {
  const top = first ? null : `M50,0 C50,25 ${x},25 ${x},50`;
  const bottom = last ? null : `M${x},50 C${x},75 50,75 50,100`;
  const whole = `${top ?? `M${x},50`}${bottom ? ` C${x},75 50,75 50,100` : ""}`;
  return { top, bottom, whole };
}

function useIndex() {
  const [res, setRes] = useState<{
    nonce: number;
    data: ExplorerIndex | null;
  } | null>(null);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    let live = true;
    fetchExplorerIndex()
      .then(d => live && setRes({ nonce, data: d }))
      .catch(() => live && setRes({ nonce, data: null }));
    return () => {
      live = false;
    };
  }, [nonce]);
  const data = res?.nonce === nonce ? res.data : undefined;
  return { data, retry: useCallback(() => setNonce(n => n + 1), []) };
}

/** The thread a link asked for (?thread=dwelling), if any. */
function threadFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("thread");
}

export default function ExplorerMap() {
  const { data, retry } = useIndex();
  const { progress, saveFailed, setLevel } = useExplorerProgress();
  const [threadId, setThreadId] = useState<string | null>(threadFromUrl);
  const level = progress.level;

  const thread = data?.threads.find(
    t => t.id === threadId && t.status === "finished"
  );
  const lit = useMemo(
    () =>
      new Map(threadStops(thread, data?.stops ?? []).map(x => [x.slug, x.at])),
    [thread, data]
  );
  const finishedCount =
    data?.stops.filter(s => s.status === "finished").length ?? 0;
  const visitedFinished =
    data?.stops.filter(
      s => s.status === "finished" && progress.visited.includes(s.slug)
    ).length ?? 0;
  const here = progress.last ?? data?.stops[0]?.slug ?? null;

  // An address with #stop-<slug> or #believe-<id> lands on it once the map has drawn.
  const ready = !!data;
  useEffect(() => {
    if (!ready || typeof window === "undefined" || !window.location.hash)
      return;
    const el = document.getElementById(
      decodeURIComponent(window.location.hash.slice(1))
    );
    el?.scrollIntoView({ block: "start" });
  }, [ready]);

  const toggleThread = (id: string) => {
    const next = threadId === id ? null : id;
    setThreadId(next);
    try {
      const url = new URL(window.location.href);
      if (next) url.searchParams.set("thread", next);
      else url.searchParams.delete("thread");
      window.history.replaceState(
        window.history.state,
        "",
        url.pathname + url.search + url.hash
      );
    } catch {
      /* the address stays as it was; the map still lights */
    }
  };

  return (
    <Layout>
      <SEOMeta
        title="Bible Explorer: The Whole Bible in Pictures for Ages 7 to 16"
        description="The Bible as one story on one illustrated map, for ages 7 to 16. Tap a stop to see it drawn, read it at your age, and try something to do."
        url="https://www.livewellbyjamesbell.co/study/explorer"
      />

      <PageHead
        door="Bible"
        doorHref="/study"
        title="Bible Explorer"
        line="The whole Bible as one story, on one map, for ages 7 to 16. Follow the road from the garden to the city."
        art={<HeadArt />}
      />

      <section className="ex-sec ex-sec--warm" aria-labelledby="ex-map-title">
        <div className="ex-wrap">
          <h2 className="ex-h2 ex-anchor" id="ex-map-title">
            The map
            {data && <Count n={data.stops.length} what="stops" />}
          </h2>
          <p className="ex-lede">
            Thirteen stops, from the first page to the last.{" "}
            {data && data.stops.some(s => s.status !== "finished")
              ? "The ones with a link are ready to open; the rest are being drawn."
              : "Open any stop, or start at the first and follow Next to the end."}
          </p>
          <div className="ex-controls">
            <div className="ex-panel">
              <LevelSwitch
                level={level}
                onLevel={setLevel}
                saveFailed={saveFailed}
              />
            </div>
            <div className="ex-panel">
              <h2 className="ex-panel__title ex-anchor" id="ex-threads">
                Threads that run through the whole Bible
                {data && (
                  <Count
                    n={data.threads.filter(t => t.status === "finished").length}
                    what="threads"
                  />
                )}
              </h2>
              {data ? (
                <Threads
                  threads={data.threads}
                  active={thread?.id ?? null}
                  onToggle={toggleThread}
                  level={level}
                  count={lit.size}
                />
              ) : (
                <p className="ex-note">
                  Tap a thread to light it up on the map.
                </p>
              )}
            </div>
          </div>
          {data && (
            <p className="ex-progress">
              <span>
                <strong>{visitedFinished}</strong> of {finishedCount} finished
                stops visited on this device
              </span>
              <span>
                <strong>{progress.done.length}</strong>{" "}
                {progress.done.length === 1 ? "activity" : "activities"} done
              </span>
            </p>
          )}
          {saveFailed && <p className="ex-alert">{SAVE_FAILED}</p>}

          {data === null ? (
            <LoadFailed
              what="The map"
              onRetry={retry}
              backHref="/study"
              backLabel="Back to Study the Bible"
            />
          ) : data === undefined ? (
            <ol
              className="ex-map ex-map--wait"
              data-lw-loading
              aria-busy="true"
            />
          ) : (
            <ol className={`ex-map${thread ? " ex-map--lit" : ""}`}>
              {data.stops.map((s, i) => (
                <StopRow
                  key={s.slug}
                  stop={s}
                  i={i}
                  count={data.stops.length}
                  level={level}
                  lit={lit.get(s.slug)}
                  litPrev={i > 0 ? lit.has(data.stops[i - 1].slug) : false}
                  litNext={
                    i < data.stops.length - 1
                      ? lit.has(data.stops[i + 1].slug)
                      : false
                  }
                  threadName={thread?.name}
                  thread={thread}
                  visited={progress.visited.includes(s.slug)}
                  done={progress.done.includes(s.slug)}
                  here={s.slug === here}
                />
              ))}
            </ol>
          )}
        </div>
      </section>

      {data && <Holds index={data} />}

      {data && <Watch index={data} level={level} />}

      {data && (
        <Believe
          cards={data.cards}
          stops={data.stops}
          level={level}
          index={data}
        />
      )}

      <section
        className="ex-sec ex-sec--warm"
        aria-labelledby="ex-parents-title"
      >
        <div className="ex-wrap">
          <h2 className="ex-h2" id="ex-parents-title">
            For parents and leaders
          </h2>
          <p className="ex-lede">
            Every stop is written twice: short and concrete for ages 7 to 11,
            with the why and the hard questions for ages 12 to 16. Read a stop
            together, do its activity, and talk about the question at the end.
            Nothing here needs an account, and progress stays on this device.
          </p>
          <p className="ex-lede" style={{ marginBottom: 0 }}>
            Next, try{" "}
            <Link href="/family/catechism" className="ex-link">
              the family catechism
            </Link>
            ,{" "}
            <Link href="/family/tonight" className="ex-link">
              tonight's devotion
            </Link>
            , or, for adults,{" "}
            <Link href="/study/bible/story" className="ex-link">
              the Bible's story in eleven parts
            </Link>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
}

/**
 * "What the Explorer holds": every part of the room, counted, each a link to
 * its section; from there any film, card, thread or map is one more tap.
 * Only finished parts are counted; what is still being made is named after.
 */
function Holds({ index }: { index: ExplorerIndex }) {
  const films = (index.films ?? []).filter(f => f.status === "finished");
  const filmsSoon = (index.films ?? []).length - films.length;
  const threads = index.threads.filter(t => t.status === "finished");
  const threadsSoon = index.threads.length - threads.length;
  const cards = index.cards.filter(c => c.status === "finished");
  const cardsSoon = index.cards.length - cards.length;
  const groups = index.filmGroups ?? [];
  const plural = (n: number, one: string, many: string) =>
    `${n} ${n === 1 ? one : many}`;
  const soon = [
    filmsSoon ? plural(filmsSoon, "moving picture", "moving pictures") : "",
    threadsSoon ? plural(threadsSoon, "thread", "threads") : "",
    cardsSoon ? plural(cardsSoon, "card", "cards") : "",
  ].filter(Boolean);
  return (
    <section className="ex-sec ex-sec--tight" aria-labelledby="ex-holds-title">
      <div className="ex-wrap">
        <h2 className="ex-h2" id="ex-holds-title">
          What the Explorer holds
        </h2>
        <ul className="ex-holds">
          <li>
            <a href="#ex-map-title">The map</a>
            <span>{plural(index.stops.length, "stop", "stops")}</span>
          </li>
          <li>
            <a href="#ex-threads">Threads</a>
            <span>{plural(threads.length, "thread", "threads")}</span>
          </li>
          <li>
            <a href="#watch">Watch and learn</a>
            <span>
              {plural(films.length, "moving picture", "moving pictures")}
            </span>
            <ul>
              {groups.map(g => (
                <li key={g.id}>
                  <a href={`#wl-g-${g.id}`}>{g.name}</a>
                  <span>{films.filter(f => f.group === g.id).length}</span>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a href="#wl-g-maps">Maps that move</a>
            <span>2 maps</span>
          </li>
          <li>
            <a href="#ex-believe-title">Why we believe</a>
            <span>{plural(cards.length, "card", "cards")}</span>
          </li>
        </ul>
        {soon.length > 0 && (
          <p className="ex-note">Still being made: {soon.join(", ")}.</p>
        )}
      </div>
    </section>
  );
}

function Threads({
  threads,
  active,
  onToggle,
  level,
  count,
}: {
  threads: Thread[];
  active: string | null;
  onToggle: (id: string) => void;
  level: Level;
  count: number;
}) {
  const on = threads.find(t => t.id === active);
  return (
    <>
      <ul className="ex-threads">
        {threads
          .filter(t => t.status === "finished")
          .map(t => (
            <li key={t.id}>
              <button
                type="button"
                className="ex-thread-btn"
                aria-pressed={active === t.id}
                onClick={() => onToggle(t.id)}
              >
                <ThreadIcon id={t.id} />
                {t.name}
              </button>
            </li>
          ))}
      </ul>
      {threads.some(t => t.status !== "finished") && (
        <p className="ex-thread-soon">
          <Hourglass size={14} strokeWidth={1.75} aria-hidden="true" />
          <span>
            Coming next:{" "}
            {threads
              .filter(t => t.status !== "finished")
              .map(t => t.name)
              .join(", ")}
            .
          </span>
        </p>
      )}
      <div aria-live="polite">
        {on ? (
          <>
            <p className="ex-thread-about">{on.line[level]}</p>
            {on.key && (
              <ul className="ex-key">
                {Object.entries(on.key).map(([state, means]) => (
                  <li key={state}>
                    <KeyLine apart={isBrokenState(on, state)} /> {means}
                  </li>
                ))}
              </ul>
            )}
            <p className="ex-note">
              Lit at {count} stops. Tap it again to turn it off.
            </p>
          </>
        ) : (
          <p className="ex-note">
            Tap a thread to light it up on the map, with a line at each stop
            saying how it shows there.
          </p>
        )}
      </div>
    </>
  );
}

function KeyLine({ apart }: { apart?: boolean }) {
  return (
    <svg
      width="40"
      height="10"
      viewBox="0 0 40 10"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={`ex-road__lit${apart ? " ex-road__lit--apart" : ""}`}
        d="M4,5H36"
      />
    </svg>
  );
}

function StopRow({
  stop,
  i,
  count,
  level,
  lit,
  litPrev,
  litNext,
  threadName,
  thread,
  visited,
  done,
  here,
}: {
  stop: StopSummary;
  i: number;
  count: number;
  level: Level;
  lit?: ThreadStop;
  litPrev: boolean;
  litNext: boolean;
  threadName?: string;
  thread?: Thread;
  visited: boolean;
  done: boolean;
  here: boolean;
}) {
  const x = swayAt(i);
  const road = roadPath(x, i === 0, i === count - 1);
  const finished = stop.status === "finished";
  const side = i % 2 === 0 ? "left" : "right";
  const litClass = lit
    ? `ex-road__lit${isBrokenState(thread, lit.state) ? " ex-road__lit--apart" : ""}`
    : "";
  const pinClass = `ex-pin${finished ? "" : " ex-pin--drawing"}${lit ? " is-lit" : ""}${here ? " is-here" : ""}`;
  const pinStyle = { left: `${x}%` };
  const titleId = `ex-stop-${stop.slug}`;

  return (
    <li
      className={`ex-stop ex-stop--${side}`}
      id={`stop-${stop.slug}`}
      aria-labelledby={titleId}
      data-lit={lit ? lit.state : undefined}
    >
      <div className="ex-road" aria-hidden="true">
        <svg
          className="ex-road__svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path className="ex-road__edge" d={road.whole} />
          <path className="ex-road__bed" d={road.whole} />
          <path className="ex-road__mid" d={road.whole} />
          {lit && road.top && litPrev && (
            <path className={litClass} d={road.top} />
          )}
          {lit && road.bottom && litNext && (
            <path className={litClass} d={road.bottom} />
          )}
        </svg>
        {finished ? (
          <Link
            href={stopHref(stop.slug)}
            className={pinClass}
            style={pinStyle}
            tabIndex={-1}
            aria-hidden="true"
          >
            <Roundel slug={stop.slug} />
            {visited && (
              <span className="ex-pin__seen">
                <Check size={14} strokeWidth={2.25} />
              </span>
            )}
          </Link>
        ) : (
          <span className={pinClass} style={pinStyle}>
            <Roundel slug={stop.slug} />
          </span>
        )}
      </div>
      <div className="ex-stop__text">
        {here && (
          <p className="ex-here">
            <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />{" "}
            {visited ? "You are here" : "Start here"}
          </p>
        )}
        <p className="eyebrow ex-stop__act">
          {stop.actLabel}
          <span className="sr-only">: {stop.actTitle}</span>
        </p>
        <h3 className="ex-stop__title" id={titleId}>
          {finished ? (
            <Link href={stopHref(stop.slug)}>{stop.title}</Link>
          ) : (
            stop.title
          )}
        </h3>
        <p className="ex-stop__sum">{stop.summary[level]}</p>
        {finished ? (
          <p className="ex-note" style={{ marginTop: 6 }}>
            {stop.range}
            {visited && ". Visited"}
            {done && ". Activity done"}
          </p>
        ) : (
          <p className="ex-stop__drawing">
            <Hourglass size={14} strokeWidth={1.75} aria-hidden="true" />{" "}
            {stop.range}. This stop is being drawn.
          </p>
        )}
        {lit && (
          <p className="ex-stop__thread">
            <ThreadIcon id={thread?.id} />
            <span>
              <span className="sr-only">{threadName}: </span>
              {lit.line} <VerseRef reference={lit.ref} />
            </span>
          </p>
        )}
      </div>
    </li>
  );
}

function Believe({
  cards,
  stops,
  level,
  index,
}: {
  cards: Card[];
  stops: StopSummary[];
  level: Level;
  index: ExplorerIndex;
}) {
  const ready = cards.filter(c => c.status === "finished");
  const soon = cards.filter(c => c.status !== "finished");
  const stopOf = (slug: string) => stops.find(s => s.slug === slug);
  return (
    <section className="ex-sec" aria-labelledby="ex-believe-title">
      <div className="ex-wrap">
        <h2 className="ex-h2 ex-anchor" id="ex-believe-title">
          Why we believe
          <Count n={ready.length} what="cards" />
        </h2>
        <p className="ex-lede">
          What Christians everywhere confess, one card at a time: what it says,
          where the Bible says it, and the question people ask.
        </p>
        <nav aria-label="The cards" className="ex-holds__jump">
          <ul>
            {ready.map(c => (
              <li key={c.id}>
                <a href={`#believe-${c.id}`}>{c.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ex-cards">
          {ready.map(c => (
            <div
              key={c.id}
              role="group"
              className="ex-card"
              id={`believe-${c.id}`}
              aria-labelledby={`ex-card-${c.id}`}
            >
              <div className="ex-card__art">
                <PlateFrame ratio={null}>
                  {c.picture && CARD_PICTURES.includes(c.picture) ? (
                    <CardArt picture={c.picture} label={c.pictureLabel} />
                  ) : (
                    <Plate name="book" />
                  )}
                </PlateFrame>
              </div>
              <div className="ex-card__body">
                <h3 className="ex-card__title" id={`ex-card-${c.id}`}>
                  {c.title}
                </h3>
                <p className="ex-card__statement">{c.statement?.[level]}</p>
                {c.quote && (
                  <blockquote className="ex-quote">
                    <p>{c.quote.text}</p>
                    <p className="ex-quote__ref">
                      <VerseRef reference={c.quote.ref} />
                    </p>
                  </blockquote>
                )}
                <h4>The Bible passages it rests on</h4>
                <ul>
                  {c.rests?.map(r => (
                    <li key={r}>
                      <VerseRef reference={r} />
                    </li>
                  ))}
                </ul>
                {c.question && (
                  <>
                    <h4>A question people ask: {c.question.ask}</h4>
                    <p className="ex-card__answer">{c.question[level]}</p>
                  </>
                )}
                <h4>Where the map shows it</h4>
                <ul>
                  {c.stops?.map(slug => {
                    const s = stopOf(slug);
                    if (!s) return null;
                    return (
                      <li key={slug}>
                        {s.status === "finished" ? (
                          <Link href={stopHref(slug)} className="ex-link">
                            {s.title}
                          </Link>
                        ) : (
                          <span>{s.title} (being drawn)</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {filmsFor(index, { card: c.id }).length > 0 && (
                  <>
                    <h4>Watch and learn</h4>
                    <WatchLinks index={index} card={c.id} />
                  </>
                )}
                {c.deeper && c.deeper.length > 0 && (
                  <>
                    <h4>
                      {level === "older"
                        ? "Go deeper"
                        : "Read more with a parent or leader"}
                    </h4>
                    <ul style={{ display: "grid", gap: 2 }}>
                      {c.deeper.map(d => (
                        <li key={d.href}>
                          <Link
                            href={d.href}
                            className="ex-link"
                            style={{
                              display: "inline-flex",
                              minHeight: 44,
                              alignItems: "center",
                            }}
                          >
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {soon.length > 0 && (
          <>
            <h3 className="ex-panel__title" style={{ marginTop: "var(--s-4)" }}>
              <PenLine
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{ verticalAlign: "-3px", marginRight: 6 }}
              />
              Cards being written
            </h3>
            <ul className="ex-soon">
              {soon.map(c => (
                <li key={c.id}>{c.title}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
