/**
 * Pray the Psalms (/tools/pray-the-psalms): find a psalm for where you are
 * and pray it slowly. Three ways in: "How are you today?" (twenty times of
 * life), "Morning and evening" (a plan made for this page: the 150 psalms in
 * a month, five a day), and "All 150" (a grid, with each psalm's kind). A
 * psalm opens on the page: the whole psalm in the BSB under the Study Bible's
 * outline, its title and summary from the notes, a line on what it prays and
 * a guide to praying it, the plain notes' care paragraphs word for word where
 * the psalm is heavy, and the book page's part on the cursing psalms where it
 * is one. "Pray it slowly" shows one stanza at a time in large type, with
 * Next and Back and no timer.
 *
 * Content as data (client/public/pray-psalms/, built and checked by
 * scripts/build-pray-psalms.mjs and scripts/validate-pray-psalms.mjs). Not
 * listed on the Tools door or in any menu until James names it; reachable by
 * its address, from the Wisdom Finder and from the Wisdom Books Explorer,
 * and noindex.
 *
 * Built on the tool shell: ToolHead, QuestionCard, useToolProgress
 * (`livewell-progress-pray-psalms`: the way in, the time of life, the plan's
 * day, the open psalm, psalms kept, days prayed), ResultSection, ResultActions.
 */
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Moon, Sun, X } from "lucide-react";
import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { QuestionCard, ResultActions, ResultSection, SAVE_FAILED, ToolHead, useToolProgress } from "@/components/tool-shell";
import { dayKey, fetchPpIndex, fetchPpPsalm, kindLabel, planDay, studyHref, type PpBrief, type PpIndex, type PpPsalm } from "@/lib/pray-psalms";
import "./pray-psalms.css";

type Way = "today" | "plan" | "all";

interface Prayed {
  n: number;
  d: string;
}

interface Place {
  way: Way | null;
  when: string | null;
  /** The plan's day the reader chose; null follows today's date. */
  day: number | null;
  open: number | null;
  kept: number[];
  prayed: Prayed[];
}

const isN = (n: unknown) => typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= 150;
const isPlace = (x: unknown): x is Place => {
  const p = x as Place;
  return (
    !!p &&
    typeof p === "object" &&
    (p.way === null || p.way === "today" || p.way === "plan" || p.way === "all") &&
    (p.when === null || typeof p.when === "string") &&
    (p.day === null || (typeof p.day === "number" && p.day >= 1 && p.day <= 31)) &&
    (p.open === null || isN(p.open)) &&
    Array.isArray(p.kept) &&
    p.kept.every(isN) &&
    Array.isArray(p.prayed) &&
    p.prayed.every((r) => !!r && isN(r.n) && typeof r.d === "string")
  );
};

const PRAYED_MAX = 400;

/** ?psalm=88 opens that psalm. */
function psalmFromAddress(): number | null {
  if (typeof window === "undefined") return null;
  const n = Number(new URLSearchParams(window.location.search).get("psalm"));
  return isN(n) ? n : null;
}

function usePsalm(n: number | null) {
  const [cache, setCache] = useState<Map<number, PpPsalm>>(new Map());
  const [failed, setFailed] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (n === null || cache.has(n)) return;
    let stale = false;
    fetchPpPsalm(n)
      .then((d) => {
        if (!stale) setCache((m) => new Map(m).set(n, d));
      })
      .catch(() => {
        if (!stale) setFailed(n);
      });
    return () => {
      stale = true;
    };
  }, [n, cache, nonce]);
  return {
    psalm: n === null ? null : (cache.get(n) ?? null),
    failed: failed !== null && failed === n,
    retry: () => {
      setFailed(null);
      setNonce((x) => x + 1);
    },
  };
}

function PsalmList({ list, index, onOpen, kept }: { list: number[]; index: PpIndex; onOpen: (n: number) => void; kept: number[] }) {
  const byN = useMemo(() => new Map(index.psalms.map((p) => [p.n, p])), [index]);
  const kindName = useMemo(() => new Map(index.kinds.map((k) => [k.id, k.name])), [index]);
  return (
    <ul className="pp-list">
      {list.map((n) => {
        const p = byN.get(n) as PpBrief;
        return (
          <li key={n}>
            <button type="button" className="pp-card" onClick={() => onOpen(n)}>
              <span className="pp-card__kicker">
                Psalm {n}
                {p.kinds.length > 0 && <> · {p.kinds.map((k, i) => (i === 0 ? kindLabel(kindName.get(k.id) ?? k.id, k.often) : (kindName.get(k.id) ?? k.id))).join(", ")}</>}
                {kept.includes(n) && <span className="pp-card__kept"> · Kept</span>}
              </span>
              <span className="pp-card__title">{p.title.replace(/^Psalm \d+: /, "")}</span>
              <span className="pp-card__line">{p.line}</span>
              <ArrowRight className="pp-card__arrow" size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function PrayPsalms() {
  const today = dayKey();
  const place = useToolProgress<Place>("pray-psalms", isPlace, { way: null, when: null, day: null, open: null, kept: [], prayed: [] });
  const p = place.value;
  const [index, setIndex] = useState<PpIndex | null>(null);
  const [indexFailed, setIndexFailed] = useState(false);
  const [indexNonce, setIndexNonce] = useState(0);
  const [kindFilter, setKindFilter] = useState("");
  // Slow reading: the stanza shown (0-based), or the end screen at stanzas.length; null when off.
  const [slow, setSlow] = useState<number | null>(null);
  const wantView = useRef(false);
  const wantSlow = useRef(false);
  const slowRef = useRef<HTMLHeadingElement>(null);

  const { psalm, failed, retry } = usePsalm(p.open);

  useEffect(() => {
    let stale = false;
    fetchPpIndex()
      .then((d) => !stale && setIndex(d))
      .catch(() => !stale && setIndexFailed(true));
    return () => {
      stale = true;
    };
  }, [indexNonce]);

  // A psalm named in the address opens on arrival.
  useEffect(() => {
    const n = psalmFromAddress();
    if (n !== null && n !== p.open) {
      place.set((x) => ({ ...x, open: n }));
      wantView.current = true;
    }
    // Once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The psalm's heading takes focus once it has arrived, after the reader opened it.
  useEffect(() => {
    if (!wantView.current) return;
    const h = document.getElementById("pp-view-h");
    if (!h) return;
    wantView.current = false;
    (h.closest("section") ?? h).scrollIntoView?.({ block: "start" });
    h.focus({ preventScroll: true });
  });

  useEffect(() => {
    if (slow === null || !wantSlow.current) return;
    wantSlow.current = false;
    const h = slowRef.current;
    if (!h) return;
    h.closest("section")?.scrollIntoView?.({ block: "start" });
    h.focus({ preventScroll: true });
  }, [slow]);

  const kindName = useMemo(() => new Map(index?.kinds.map((k) => [k.id, k.name]) ?? []), [index]);
  const day = p.day ?? planDay();
  const planToday = index?.plan.find((d) => d.d === day) ?? null;
  const when = index?.whens.find((w) => w.id === p.when) ?? null;

  const open = (n: number) => {
    setSlow(null);
    place.set((x) => ({ ...x, open: n }));
    wantView.current = true;
  };
  const close = () => {
    setSlow(null);
    place.set((x) => ({ ...x, open: null }));
  };
  const isKept = (n: number) => p.kept.includes(n);
  const toggleKeep = (n: number) => place.set((x) => ({ ...x, kept: x.kept.includes(n) ? x.kept.filter((y) => y !== n) : [n, ...x.kept] }));
  const prayedToday = (n: number) => p.prayed.some((r) => r.n === n && r.d === today);
  const togglePrayed = (n: number) =>
    place.set((x) => ({
      ...x,
      prayed: x.prayed.some((r) => r.n === n && r.d === today) ? x.prayed.filter((r) => !(r.n === n && r.d === today)) : [{ n, d: today }, ...x.prayed].slice(0, PRAYED_MAX),
    }));
  const prayedEver = useMemo(() => new Set(p.prayed.map((r) => r.n)), [p.prayed]);

  const startSlow = () => {
    wantSlow.current = true;
    setSlow(0);
  };
  const step = (by: number) => {
    if (!psalm || slow === null) return;
    const next = Math.max(0, Math.min(psalm.stanzas.length, slow + by));
    if (next === slow) return;
    wantSlow.current = true;
    setSlow(next);
  };
  const onSlowKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setSlow(null);
      requestAnimationFrame(() => document.getElementById("pp-slow-start")?.focus());
    }
  };

  const filtered = useMemo(() => (index ? index.psalms.filter((x) => !kindFilter || x.kinds.some((k) => k.id === kindFilter)) : []), [index, kindFilter]);
  const shortTitle = (t: string) => t.replace(/^Psalm \d+: /, "");

  return (
    <Layout>
      <SEOMeta
        title="Pray the Psalms: A Psalm for Where You Are"
        description="Find a psalm for how you are today, for morning and evening, or from all 150, and pray it slowly, with a guide drawn from the Study Bible's notes."
        url="https://www.livewellbyjamesbell.co/tools/pray-the-psalms"
        noindex
      />

      <ToolHead
        path="/tools/pray-the-psalms"
        title="Pray the Psalms"
        line="Find a psalm for where you are and pray it slowly: by how you are today, by morning and evening, or from all 150, each with a guide drawn from the Study Bible's notes."
        time="A few minutes for a short psalm; as long as you need for a long one"
        keeps="The psalms you keep and the days you mark a psalm prayed stay in this browser and are never sent anywhere."
        plate="lectern"
      >
        <p className="ts-note pp-help-line">
          If today is very hard, you do not have to carry it alone. <Link href="/help">Find Help</Link> lists places to turn.
        </p>
      </ToolHead>

      {indexFailed ? (
        <LoadFailed
          what="The psalms"
          onRetry={() => {
            setIndexFailed(false);
            setIndexNonce((n) => n + 1);
          }}
          backHref="/tools/wisdom-finder"
          backLabel="Back to the Wisdom Finder"
        />
      ) : (
        <>
          <section className="ts-band pp-pick no-print" aria-label="Where to begin">
            <div className="ts-col">
              <QuestionCard
                question="Where would you like to begin?"
                options={[
                  { value: "today", label: "How are you today?", hint: "Twenty times of life. Choose the one nearest yours, and see the psalms for it." },
                  {
                    value: "plan",
                    label: "Morning and evening",
                    hint: planToday ? `Today is day ${day}: Psalms ${planToday.morning.join(", ")} in the morning, ${planToday.evening.join(" and ")} in the evening.` : "All 150 psalms in a month, five a day.",
                  },
                  { value: "all", label: "All 150", hint: "Every psalm on one grid, with the kind the Study Bible's notes give it." },
                ]}
                value={p.way}
                onChange={(v) => place.set((x) => ({ ...x, way: v as Way }))}
              />
              {place.saveFailed && <p className="ts-save-failed">{SAVE_FAILED}</p>}
            </div>
          </section>

          {p.way === "today" && index && (
            <section className="ts-band ts-band--warm pp-pick no-print" aria-label="How are you today?">
              <div className="ts-col">
                <QuestionCard
                  question="How are you today?"
                  help="Choose the one nearest to where you are. Each shows the psalms that fit it; you can come back and choose another."
                  options={index.whens.map((w) => ({ value: w.id, label: w.name, hint: `${w.line} ${w.psalms.length} psalms.` }))}
                  value={p.when}
                  onChange={(id) => place.set((x) => ({ ...x, when: id }))}
                  columns={2}
                  numbered={false}
                />
                {when && (
                  <div className="pp-results" aria-live="polite">
                    <h2 className="ts-r__title" id="pp-when-h">
                      {when.name}: {when.psalms.length} psalms
                    </h2>
                    <PsalmList list={when.psalms} index={index} onOpen={open} kept={p.kept} />
                  </div>
                )}
              </div>
            </section>
          )}

          {p.way === "plan" && index && planToday && (
            <section className="ts-band ts-band--warm pp-pick no-print" aria-labelledby="pp-plan-h">
              <div className="ts-col">
                <h2 className="ts-r__title" id="pp-plan-h">
                  Day {day} of the month
                </h2>
                <p className="ts-part__line">
                  This is a plan made for this page, not an ancient order of prayer. It follows the Study Bible's introduction, which suggests reading the 150 psalms in a month, five a day: here three in the morning and two in the evening, in the book's own order, so that by the thirtieth day every psalm has been prayed once. On the 31st, Psalm 1 in the morning and Psalm 150 in the evening.
                </p>
                <h3 className="pp-sub">
                  <Sun size={18} strokeWidth={1.75} aria-hidden="true" /> Morning
                </h3>
                <PsalmList list={planToday.morning} index={index} onOpen={open} kept={p.kept} />
                <h3 className="pp-sub">
                  <Moon size={18} strokeWidth={1.75} aria-hidden="true" /> Evening
                </h3>
                <PsalmList list={planToday.evening} index={index} onOpen={open} kept={p.kept} />
                <h3 className="pp-sub">Another day</h3>
                <ul className="pp-days" aria-label="Days of the month">
                  {index.plan.map((d) => (
                    <li key={d.d}>
                      <button type="button" className="pp-num" aria-pressed={d.d === day} onClick={() => place.set((x) => ({ ...x, day: d.d === planDay() ? null : d.d }))}>
                        <span aria-hidden="true">{d.d}</span>
                        <span className="sr-only">Day {d.d}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {p.way === "all" && index && (
            <section className="ts-band ts-band--warm pp-pick no-print" aria-labelledby="pp-all-h">
              <div className="ts-col">
                <h2 className="ts-r__title" id="pp-all-h">
                  All 150 psalms
                </h2>
                <div className="pp-filter">
                  <label htmlFor="pp-kind">Show</label>
                  <select id="pp-kind" value={kindFilter} onChange={(e) => setKindFilter(e.target.value)}>
                    <option value="">Every psalm (150)</option>
                    {index.kinds.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.name} ({k.count})
                      </option>
                    ))}
                  </select>
                </div>
                {kindFilter && <p className="ts-part__line">{index.kinds.find((k) => k.id === kindFilter)?.line}</p>}
                <p className="pp-legend">
                  <span>
                    <span className="pp-dot" aria-hidden="true" /> kept
                  </span>
                  <span>
                    <Check size={12} strokeWidth={2.25} aria-hidden="true" /> prayed
                  </span>
                  <span>Some psalms carry no kind: the notes give them none, and the page does not guess.</span>
                </p>
                <ul className="pp-grid" aria-label={kindFilter ? `${filtered.length} psalms` : "Psalms 1 to 150"}>
                  {filtered.map((x) => (
                    <li key={x.n}>
                      <button type="button" className="pp-num" aria-pressed={p.open === x.n} onClick={() => open(x.n)} title={x.title}>
                        <span aria-hidden="true">{x.n}</span>
                        <span className="sr-only">
                          Psalm {x.n}: {shortTitle(x.title)}
                          {x.kinds.length ? `, ${x.kinds.map((k) => kindName.get(k.id)).join(", ")}` : ""}
                          {isKept(x.n) ? ", kept" : ""}
                          {prayedEver.has(x.n) ? ", prayed" : ""}
                        </span>
                        {isKept(x.n) && <span className="pp-dot pp-num__kept" aria-hidden="true" />}
                        {prayedEver.has(x.n) && <Check className="pp-num__prayed" size={12} strokeWidth={2.25} aria-hidden="true" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {p.open !== null && (
            <section className="ts-band pp-view" aria-labelledby="pp-view-h">
              <div className="ts-col">
                {failed ? (
                  <LoadFailed what={`Psalm ${p.open}`} onRetry={retry} />
                ) : !psalm ? (
                  <p className="ts-count" role="status">
                    Opening Psalm {p.open}…
                  </p>
                ) : (
                  <>
                    <p className="pp-kicker">
                      Psalm {psalm.n}
                      {psalm.kinds.length > 0 && <> · {psalm.kinds.map((k, i) => (i === 0 ? kindLabel(k.name, k.often) : k.often ? `often read as ${k.name}` : k.name)).join(", ")}</>}
                    </p>
                    <h2 id="pp-view-h" className="ts-part__title" tabIndex={-1} style={{ marginTop: 0 }}>
                      {shortTitle(psalm.title)}
                    </h2>
                    <p className="ts-part__line">{psalm.summary}</p>
                    <p className="pp-source">Title and summary from the Study Bible's notes on Psalm {psalm.n}.</p>

                    {psalm.care.length > 0 && (
                      <aside className="ts-help pp-care" aria-labelledby="pp-care-h">
                        <h3 id="pp-care-h">A word of care, from the Study Bible's plain notes on Psalm {psalm.n}</h3>
                        {psalm.care.map((c, i) => (
                          <p key={i}>{c.text}</p>
                        ))}
                        <div className="ts-help__links">
                          <Link href="/help">Find Help: places to turn</Link>
                        </div>
                      </aside>
                    )}

                    <div className="pp-guide">
                      <h3 className="pp-sub">What it prays</h3>
                      <p>{psalm.line}</p>
                      <h3 className="pp-sub">How to pray it</h3>
                      <p>{psalm.guide}</p>
                    </div>

                    {psalm.kinds.length > 0 && (
                      <ul className="pp-why">
                        {psalm.kinds.map((k) => (
                          <li key={k.id}>
                            <strong>{kindLabel(k.name, k.often)}.</strong> {k.from.where}: “{k.from.text}”
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="pp-actions no-print">
                      <button type="button" className="btn" id="pp-slow-start" onClick={startSlow}>
                        Pray it slowly
                      </button>
                      <button type="button" className="btn btn--quiet" aria-pressed={isKept(psalm.n)} onClick={() => toggleKeep(psalm.n)}>
                        {isKept(psalm.n) && <Check size={16} strokeWidth={2} aria-hidden="true" />} Keep this psalm
                      </button>
                      <label className="pp-prayed">
                        <input type="checkbox" checked={prayedToday(psalm.n)} onChange={() => togglePrayed(psalm.n)} /> I prayed this today
                      </label>
                      <Link href={studyHref(psalm.n)} className="btn--text">
                        <BookOpen size={16} strokeWidth={1.75} aria-hidden="true" /> The Study Bible on Psalm {psalm.n}
                      </Link>
                    </div>

                    {psalm.cursing && index && (
                      <details className="pp-cursing">
                        <summary>{index.teaching.cursing.h}: how to read this psalm, from the Study Bible's introduction</summary>
                        {index.teaching.cursing.body.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </details>
                    )}

                    {slow !== null ? (
                      <div className="pp-slow" role="region" aria-label={`Praying Psalm ${psalm.n} slowly`} onKeyDown={onSlowKey}>
                        {slow < psalm.stanzas.length ? (
                          (() => {
                            const s = psalm.stanzas[slow];
                            return (
                              <>
                                <p className="pp-slow__where" aria-live="polite">
                                  Part {slow + 1} of {psalm.stanzas.length} · verses {s.from === s.to ? s.from : `${s.from} to ${s.to}`}
                                </p>
                                <h3 className="pp-slow__title" tabIndex={-1} ref={slowRef}>
                                  {s.title || `Psalm ${psalm.n}`}
                                  {s.parts ? <span className="pp-slow__cont"> ({s.part} of {s.parts})</span> : null}
                                </h3>
                                <div className="pp-slow__text">
                                  {psalm.verses
                                    .filter((v) => v.v >= s.from && v.v <= s.to)
                                    .map((v) => (
                                      <p key={v.v}>
                                        <span className="pp-slow__n">{v.v}</span> {v.t}
                                      </p>
                                    ))}
                                </div>
                              </>
                            );
                          })()
                        ) : (
                          <>
                            <p className="pp-slow__where" aria-live="polite">
                              The end of Psalm {psalm.n}
                            </p>
                            <h3 className="pp-slow__title" tabIndex={-1} ref={slowRef}>
                              You have prayed Psalm {psalm.n}
                            </h3>
                            {psalm.ending.length > 0 && (
                              <div className="pp-ending">
                                <p className="pp-source">How the psalm ends, in the Study Bible's plain notes:</p>
                                {psalm.ending.map((e, i) => (
                                  <p key={i}>{e.text}</p>
                                ))}
                              </div>
                            )}
                            <label className="pp-prayed">
                              <input type="checkbox" checked={prayedToday(psalm.n)} onChange={() => togglePrayed(psalm.n)} /> I prayed this today
                            </label>
                          </>
                        )}
                        <div className="pp-slow__nav">
                          {slow > 0 ? (
                            <button type="button" className="btn btn--quiet" onClick={() => step(-1)}>
                              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" /> Back
                            </button>
                          ) : (
                            <span />
                          )}
                          {slow < psalm.stanzas.length ? (
                            <button type="button" className="btn" onClick={() => step(1)}>
                              {slow + 1 === psalm.stanzas.length ? "Finish" : "Next"} <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn"
                              onClick={() => {
                                wantSlow.current = true;
                                setSlow(0);
                              }}
                            >
                              Pray it again
                            </button>
                          )}
                        </div>
                        <p className="pp-slow__keys">
                          Take as long as you need. The arrow keys move between parts; Escape closes.{" "}
                          <button
                            type="button"
                            className="btn--text"
                            onClick={() => {
                              setSlow(null);
                              requestAnimationFrame(() => document.getElementById("pp-slow-start")?.focus());
                            }}
                          >
                            <X size={14} strokeWidth={2} aria-hidden="true" /> Close the slow reading
                          </button>
                        </p>
                      </div>
                    ) : null}
                    <div className={`pp-text${slow !== null ? " pp-print-only" : ""}`}>
                        {psalm.stanzas.map((s) => (
                          <div key={s.from} className="pp-stanza">
                            {s.title && s.part <= 1 && <h3 className="pp-stanza__title">{s.title}</h3>}
                            {psalm.verses
                              .filter((v) => v.v >= s.from && v.v <= s.to)
                              .map((v) => (
                                <p key={v.v} className="pp-verse">
                                  <span className="pp-verse__n" aria-hidden="true">
                                    {v.v}
                                  </span>
                                  <span className="sr-only">Verse {v.v}. </span>
                                  {v.t}
                                </p>
                              ))}
                          </div>
                        ))}
                        <p className="pp-source">The Berean Standard Bible. Headings from the Study Bible's outline of Psalm {psalm.n}.</p>
                        {psalm.ending.length > 0 && (
                          <div className="pp-ending">
                            <p className="pp-source">How the psalm ends, in the Study Bible's plain notes:</p>
                            {psalm.ending.map((e, i) => (
                              <p key={i}>{e.text}</p>
                            ))}
                          </div>
                        )}
                      </div>

                    <div className="ts-nav no-print">
                      {psalm.n > 1 ? (
                        <button type="button" className="btn--text" onClick={() => open(psalm.n - 1)}>
                          <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" /> Psalm {psalm.n - 1}
                        </button>
                      ) : (
                        <span />
                      )}
                      <button type="button" className="btn--text" onClick={close}>
                        Close this psalm
                      </button>
                      {psalm.n < 150 ? (
                        <button type="button" className="btn--text" onClick={() => open(psalm.n + 1)}>
                          Psalm {psalm.n + 1} <ChevronRight size={16} strokeWidth={1.75} aria-hidden="true" />
                        </button>
                      ) : (
                        <span />
                      )}
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {index && (p.kept.length > 0 || p.prayed.length > 0) && (
            <section className="ts-band ts-band--warm no-print" aria-labelledby="pp-kept-h">
              <div className="ts-col">
                <ResultSection title="Psalms you are keeping" id="pp-kept">
                  <p className="ts-count" style={{ marginTop: 0 }}>
                    {p.prayed.length > 0
                      ? `You have marked ${prayedEver.size} ${prayedEver.size === 1 ? "psalm" : "different psalms"} prayed${p.prayed.some((r) => r.d === today) ? `, ${p.prayed.filter((r) => r.d === today).length} of them today` : ""}. `
                      : ""}
                    These stay in this browser until you let them go.
                  </p>
                  {p.kept.length > 0 ? (
                    <ul className="pp-kept">
                      {p.kept.map((n) => {
                        const b = index.psalms.find((x) => x.n === n);
                        return (
                          <li key={n}>
                            <button type="button" className="btn--text" onClick={() => open(n)}>
                              Psalm {n}: {b ? shortTitle(b.title) : ""}
                            </button>
                            <button type="button" className="pp-kept__drop" onClick={() => toggleKeep(n)}>
                              <X size={14} strokeWidth={2} aria-hidden="true" />
                              <span className="sr-only">Stop keeping Psalm {n}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="ts-count">Keep a psalm and it will wait for you here.</p>
                  )}
                </ResultSection>
              </div>
            </section>
          )}

          {index && (
            <section className="ts-band pp-teach" aria-labelledby="pp-teach-h">
              <div className="ts-col">
                <h2 id="pp-teach-h" className="ts-r__title">
                  {index.teaching.minute.h}
                </h2>
                <p className="pp-source">In the words of the Study Bible's introduction to the Psalms.</p>
                <div className="ts-r__prose">
                  {index.teaching.minute.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <h2 className="ts-r__title">{index.teaching.howTo.h}</h2>
                <div className="ts-r__prose">
                  {index.teaching.howTo.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <details className="pp-cursing">
                  <summary>{index.teaching.kinds.h}</summary>
                  {index.teaching.kinds.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </details>
                <ResultActions
                  title="Pray the Psalms"
                  summary="A psalm for where you are, prayed slowly, with a guide from the Study Bible's notes."
                  onStartOver={() => {
                    setSlow(null);
                    place.clear();
                  }}
                  startOverClears="the psalms you kept and the days you marked prayed"
                />
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}
