/**
 * The Wisdom Finder (/tools/wisdom-finder): say what you are facing in your
 * own words, or choose an area of life, and find the subjects of the wisdom
 * library that bear on it. Each subject has its own page (/wisdom/:id).
 *
 * Matching runs in the browser, from data only (lib/wisdom-match.ts over
 * client/public/wisdom/finder.json); nothing typed leaves the device. Where
 * nothing fits well the page says so and offers the areas and Find Help, and
 * never forces a match. What the reader typed is kept only for this tab
 * (sessionStorage, through the tool shell's useToolProgress); saved topics
 * and verses live in the stores My Library reads (lib/wisdom.ts).
 *
 * Built on the tool shell (components/tool-shell): ToolHead, QuestionCard
 * (the areas), useToolProgress, ResultActions.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { ToolHead, QuestionCard, ResultActions, useToolProgress, SAVE_FAILED } from "@/components/tool-shell";
import { prepare, findTopics, type FinderTopic } from "@/lib/wisdom-match";
import { fetchFinder, readSavedTopics, verseForToday, type FinderFile } from "@/lib/wisdom";
import { toolById } from "@/lib/toolsList";
import "../wisdom/wisdom.css";

interface Place {
  q: string;
  area: string | null;
}
const isPlace = (x: unknown): x is Place => {
  const p = x as Place;
  return !!p && typeof p === "object" && typeof p.q === "string" && (p.area === null || typeof p.area === "string");
};

/** Plain sentences a reader can try, the way people actually say these things. */
const TRY = ["My son walked away from the faith", "I can't stop worrying", "We can't pay our bills", "I don't know if I believe anymore", "My husband and I fight all the time", "Why is this happening to me?"];

function fromUrl(name: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

function TopicRow({ t }: { t: FinderTopic }) {
  return (
    <li>
      <Link href={`/wisdom/${t.id}`}>
        <span className="wf-list__name">
          {t.label}
          {t.deep && <span className="wf-full">Written in full</span>}
        </span>
        <span className="wf-list__line">{t.line}</span>
        <ArrowRight className="wf-list__arrow" size={18} strokeWidth={1.75} aria-hidden="true" />
      </Link>
    </li>
  );
}

export default function WisdomFinder() {
  const tool = toolById("wisdom-finder");
  const [data, setData] = useState<FinderFile | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const place = useToolProgress<Place>("wisdom-finder", isPlace, { q: "", area: null }, "session");
  const [urlQ] = useState(() => fromUrl("q"));
  const [urlArea] = useState(() => fromUrl("area"));
  const [draft, setDraft] = useState(() => urlQ || place.value.q);
  const [asked, setAsked] = useState(urlQ);
  const [filter, setFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const [saved] = useState<string[]>(() => readSavedTopics());

  useEffect(() => {
    let stale = false;
    fetchFinder()
      .then((d) => {
        if (!stale) setData(d);
      })
      .catch(() => {
        if (!stale) setFailed(true);
      });
    return () => {
      stale = true;
    };
  }, [nonce]);

  // ?area= (a topic page's area link) opens that area, once, on arrival.
  useEffect(() => {
    if (urlArea && place.value.area !== urlArea) place.set((p) => ({ ...p, area: urlArea }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prep = useMemo(() => (data ? prepare(data) : null), [data]);
  const result = useMemo(() => (prep && asked.trim() ? findTopics(prep, asked) : null), [prep, asked]);
  const byId = useMemo(() => new Map((data?.topics ?? []).map((t) => [t.id, t])), [data]);
  const today = useMemo(() => (data ? verseForToday(data.daily) : null), [data]);
  const area = data?.areas.find((a) => a.id === place.value.area) ?? null;
  const areaTopics = useMemo(
    () => (area?.topics ?? []).map((id) => byId.get(id)).filter((t): t is FinderTopic => !!t).sort((x, y) => x.label.localeCompare(y.label)),
    [area, byId],
  );
  const az = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return (data?.topics ?? []).filter((t) => !q || t.label.toLowerCase().includes(q) || t.keywords.some((k) => k.toLowerCase().includes(q)));
  }, [data, filter]);
  const savedTopics = saved.map((id) => byId.get(id)).filter((t): t is FinderTopic => !!t);

  const ask = (q: string) => {
    setDraft(q);
    setAsked(q);
    place.set((p) => ({ ...p, q }));
    requestAnimationFrame(() => {
      resultsRef.current?.focus({ preventScroll: true });
      resultsRef.current?.scrollIntoView({ block: "start" });
    });
  };

  const confident = result?.confident ?? false;
  const matches = result?.matches ?? [];
  const best = confident ? matches[0] : null;
  // Two topics share a name (caregiving, caring-for-aging-parents): list a name once.
  const seenLabels = new Set<string>(best ? [best.topic.label] : []);
  const rest = (confident ? matches.slice(1) : matches.filter((m) => m.score >= 4))
    .filter((m) => !seenLabels.has(m.topic.label) && seenLabels.add(m.topic.label))
    .slice(0, confident ? 5 : 3);

  return (
    <Layout>
      <SEOMeta
        title="What Does the Bible Say About My Situation?"
        description="Type in what you are struggling with and find the Bible's wisdom for it: the verses, the world they were written in, and the practical application for now."
        url="https://www.livewellbyjamesbell.co/tools/wisdom-finder"
      />

      <ToolHead
        path="/tools/wisdom-finder"
        title={tool.name}
        line={`Say what you are facing in your own words, or choose an area of life. Each of the ${data ? data.topics.length : 208} subjects has its own page: the passages that bear on it, each opening to the paragraph it sits in.`}
        time={`About ${tool.time} to find a subject, then as long as you like to read`}
        keeps="Subjects and verses you save stay in this browser, for My Library. What you type is kept only until you close this tab, and never leaves this device."
        plate="book"
      />

      <section className="wf-ask" aria-labelledby="wf-ask-label">
        <div className="wz-col wf-col">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (draft.trim()) ask(draft.trim());
            }}
          >
            <label id="wf-ask-label" htmlFor="wf-q" className="wf-ask__label">
              What are you facing?
            </label>
            <p className="wf-ask__help" id="wf-q-help">
              A sentence is best, the way you would say it to a friend.
            </p>
            <div className="wf-ask__form">
              <input
                ref={inputRef}
                id="wf-q"
                className="wf-ask__input"
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                aria-describedby="wf-q-help"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="My daughter won't speak to me"
              />
              <button type="submit" className="btn btn--on-dark">
                <Search size={18} strokeWidth={1.75} aria-hidden="true" /> Find
              </button>
            </div>
          </form>
          {!asked && (
            <>
              <p className="wf-ask__help" style={{ margin: "18px 0 0" }}>
                Or try one of these:
              </p>
              <ul className="wf-try">
                {TRY.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => ask(s)}>
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {place.resumed && !asked && place.value.q && (
            <p className="wf-resume">
              Earlier in this tab you asked about &ldquo;{place.value.q}&rdquo;.
              <button type="button" onClick={() => ask(place.value.q)}>
                Pick up where you left off
              </button>
            </p>
          )}
        </div>
      </section>

      {failed ? (
        <div className="wz-band">
          <div className="wz-col">
            <LoadFailed
              what="The wisdom library"
              onRetry={() => {
                setFailed(false);
                setNonce((n) => n + 1);
              }}
              backHref="/tools"
              backLabel="Back to the tools"
            />
          </div>
        </div>
      ) : (
        <>
          <section className="wz-band" aria-labelledby="wf-results-h" hidden={!asked}>
            <div className="wz-col">
              <h2 id="wf-results-h" className="wz-sec__title" tabIndex={-1} ref={resultsRef} style={{ scrollMarginTop: "84px" }}>
                {asked ? <>For &ldquo;{asked}&rdquo;</> : "Results"}
              </h2>
              <p className="wf-results__count" role="status" aria-live="polite">
                {!asked
                  ? ""
                  : !data
                    ? "Opening the library…"
                    : confident
                      ? `${matches.length} ${matches.length === 1 ? "subject fits" : "subjects fit"} what you wrote, closest first.`
                      : "Nothing in the library fits that well."}
              </p>
              {data && asked && best && (
                <>
                  <Link href={`/wisdom/${best.topic.id}`} className="wf-best">
                    <p className="wf-best__kicker">Closest to what you wrote{best.topic.deep ? " · written in full" : ""}</p>
                    <h3 className="wf-best__title">{best.topic.label}</h3>
                    <p className="wf-best__line">{best.topic.line}</p>
                    <span className="wf-best__go">
                      Read what the Bible says <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </Link>
                  {rest.length > 0 && (
                    <>
                      <h3 className="wz-sec__kicker" style={{ marginTop: "var(--s-3)" }}>
                        Also close
                      </h3>
                      <ul className="wf-list">
                        {rest.map((m) => (
                          <TopicRow key={m.topic.id} t={m.topic} />
                        ))}
                      </ul>
                    </>
                  )}
                </>
              )}
              {data && asked && !best && (
                <div className="wf-none">
                  <h3 className="wf-none__title">Nothing fits that well</h3>
                  <p>Rather than guess, the finder leaves it here. Try saying it another way, in a plain sentence, or choose an area of life below.</p>
                  <p>
                    If you are in danger or thinking of hurting yourself,{" "}
                    <Link href="/help" className="wf-inline">
                      Find Help
                    </Link>{" "}
                    lists places to turn now.
                  </p>
                  {rest.length > 0 && (
                    <>
                      <h4 className="wz-sec__kicker" style={{ marginTop: "var(--s-2)" }}>
                        These may be near it
                      </h4>
                      <ul className="wf-list">
                        {rest.map((m) => (
                          <TopicRow key={m.topic.id} t={m.topic} />
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
              {asked && (
                <ResultActions
                  title={tool.name}
                  kind="Tool"
                  save={false}
                  onChange={() => inputRef.current?.focus()}
                  changeLabel="Change my words"
                  onStartOver={() => {
                    place.clear();
                    setDraft("");
                    setAsked("");
                    requestAnimationFrame(() => inputRef.current?.focus());
                  }}
                  startOverClears="what you typed and the area you chose"
                />
              )}
              {place.saveFailed && <p className="ts-save-failed">{SAVE_FAILED}</p>}
            </div>
          </section>

          <section className="wz-band wz-band--warm" aria-labelledby="wf-areas-h">
            <div className="wz-col">
              <h2 id="wf-areas-h" className="wz-sec__title">
                Browse by area of life
              </h2>
              {!data ? (
                <p className="wf-results__count" role="status">
                  Opening the library…
                </p>
              ) : (
                <>
                  <QuestionCard
                    question="Which part of life is this about?"
                    options={data.areas.map((a) => ({ value: a.id, label: a.name, hint: `${a.line} ${a.topics.length} subjects.` }))}
                    value={place.value.area}
                    onChange={(id) => place.set((p) => ({ ...p, area: id }))}
                    columns={2}
                    numbered={false}
                  />
                  {area && areaTopics.length > 0 && (
                    <div aria-live="polite">
                      <h3 className="wz-sec__kicker" style={{ marginTop: "var(--s-3)" }}>
                        {areaTopics.length} subjects in {area.name}
                      </h3>
                      <ul className="wf-list">
                        {areaTopics.map((t) => (
                          <TopicRow key={t.id} t={t} />
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          <section className="wz-band" aria-labelledby="wf-more-h">
            <div className="wz-col">
              <h2 id="wf-more-h" className="wz-sec__title">
                More ways in
              </h2>
              {savedTopics.length > 0 && (
                <div className="wz-sec">
                  <h3 className="wz-sec__kicker">Saved in this browser</h3>
                  <ul className="wf-list">
                    {savedTopics.map((t) => (
                      <TopicRow key={t.id} t={t} />
                    ))}
                  </ul>
                  <Link href="/my-library" className="wz-link">
                    Everything in My Library
                  </Link>
                </div>
              )}
              {today && (
                <div className="wz-sec wf-today">
                  <h3 className="wz-sec__kicker">A verse for today</h3>
                  <p className="wf-today__text">{today.text}</p>
                  <p className="wf-today__ref">
                    {today.ref}, from <Link href={`/wisdom/${today.id}`}>{today.label}</Link>
                  </p>
                </div>
              )}
              <div className="wz-sec">
                <h3 className="wz-sec__kicker">Proverbs by theme</h3>
                <p className="wf-results__count" style={{ margin: "0 0 8px" }}>
                  All 915 verses of Proverbs gathered under twenty themes, a chapter for each day of the month, and the Study Bible's notes beside each chapter.
                </p>
                <Link href="/tools/wisdom-books" className="wz-link">
                  Open the Wisdom Books Explorer
                </Link>
              </div>
              <div className="wz-sec">
                <h3 className="wz-sec__kicker">A psalm to pray</h3>
                <p className="wf-results__count" style={{ margin: "0 0 8px" }}>
                  All 150 psalms, found by how you are today or by morning and evening, each with a guide to praying it drawn from the Study Bible's notes.
                </p>
                <Link href="/tools/pray-the-psalms" className="wz-link">
                  Open Pray the Psalms
                </Link>
              </div>
              {data && (
                <details className="wf-az wz-sec">
                  <summary>Every subject, A to Z ({data.topics.length})</summary>
                  <label htmlFor="wf-az" className="sr-only">
                    Filter the subjects
                  </label>
                  <input id="wf-az" className="wf-az__filter" type="search" placeholder="Filter the subjects" value={filter} onChange={(e) => setFilter(e.target.value)} />
                  <p className="wf-results__count" role="status">
                    {az.length} {az.length === 1 ? "subject" : "subjects"}
                  </p>
                  <ul className="wf-az__list">
                    {az.map((t) => (
                      <li key={t.id}>
                        <Link href={`/wisdom/${t.id}`}>{t.label}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              <ul className="wf-foot">
                <li>
                  <Link href="/wisdom" className="wz-link">
                    Wisdom for all of life
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="wz-link">
                    Find Help
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
