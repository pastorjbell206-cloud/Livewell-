/**
 * /start: "Start where you are". Five roads, one for each person the site is
 * for (docs/work/elite/PROJECT-PROMPT.md, "Who it is for"): the skeptic, the
 * person new to faith or coming back, the one who has stepped back from it,
 * the believer who wants depth, and the parent at the table. Beside them, two
 * readers no road fits, whom the walk of 2026-11-23 found with no way in: the
 * Christian with doubts and the pastor or group leader. Each of the two is a
 * card that opens the one page to begin with (lib/startRoads START_PAGES).
 *
 * The page opens with the seven choices as picture cards. Choosing a road opens
 * its road under them: four to six steps in order, each one sentence and one
 * link, every link a page that exists and is public today. A road that has
 * become a track (numbered sessions, lib/tracks.ts) offers the track first,
 * as its main action, and keeps its steps under it. A road has its own
 * address (/start#skeptical), so Home's chips and any link can open it. The
 * device remembers the road and the steps the reader ticked (lib/startRoads,
 * through lib/storage): no account, no score, no streak. Coming back, the page
 * offers "Pick up where you left off".
 *
 * The road for someone new is the six steps /start carried before, word for
 * word, with "What next", the line for someone hurt by a church, and the
 * three-question quiz after it. The path to help is at the foot of every
 * road. The roads live in lib/startRoad.json so the prerender script can list
 * them; start.test.tsx checks every link and every count the copy states.
 */
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, LifeBuoy, Milestone, RotateCcw } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import PlateFrame from "@/components/art/PlateFrame";
import Plate from "@/components/art/Plate";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { scrollBehavior } from "@/lib/motion";
import road from "@/lib/startRoad.json";
import { toolByHref } from "@/lib/toolsList";
import { nextSession, readTracks, sessionHref, trackHref, trackToContinue, type TracksProgress } from "@/lib/tracks";
import {
  WAYS_IN,
  nextStep,
  readRoadProgress,
  roadById,
  saveRoadProgress,
  withStep,
  type Road,
  type RoadId,
  type RoadProgress,
  type RoadStep,
  type WayIn,
} from "@/lib/startRoads";
import "./home/home.css";

export type StartStep = RoadStep;

/** The road for someone new, in order (lib/startRoad.json, road "new"). */
export const START_STEPS: StartStep[] = roadById("new")?.steps ?? [];

export interface StartNext {
  lead: string;
  link: string;
  href: string;
}

/** Where the road for someone new goes on. A step that opens a tool is named by the tool's one name (lib/toolsList.ts). */
export const START_NEXT: StartNext[] = road.next.map((n) => ({ ...n, link: toolByHref(n.href)?.name ?? n.link }));

function hashRoad(): Road | null {
  if (typeof window === "undefined") return null;
  return roadById(decodeURIComponent(window.location.hash.slice(1)));
}

function RoadCard({ r, open, onPick }: { r: Road; open: boolean; onPick: (id: RoadId, e: MouseEvent) => void }) {
  return (
    <a href={`#${r.id}`} className="st-card" aria-current={open ? "true" : undefined} onClick={(e) => onPick(r.id, e)}>
      <PlateFrame>
        <Plate name={r.plate} decorative />
      </PlateFrame>
      <span className="st-card__text">
        <span className="st-card__name">{r.chip}</span>
        <span className="st-card__note">{r.note}</span>
      </span>
    </a>
  );
}

/** A reader no road fits: the card opens the one page to begin with. */
function PageCard({ w }: { w: WayIn }) {
  return (
    <Link href={w.href} className="st-card">
      <PlateFrame>
        <Plate name={w.plate} decorative />
      </PlateFrame>
      <span className="st-card__text">
        <span className="st-card__name">{w.chip}</span>
        <span className="st-card__note">{w.note}</span>
      </span>
    </Link>
  );
}

function Steps({ r, progress, onTick, quiet = false }: { r: Road; progress: RoadProgress; onTick: (href: string) => void; quiet?: boolean }) {
  const done = progress.done[r.id] ?? [];
  const next = nextStep(r, progress);
  return (
    <ol className="st-steps">
      {r.steps.map((s, i) => {
        const isDone = done.includes(s.href);
        const isNext = next?.n === i + 1;
        return (
          <li key={s.href} className={`st-step${isDone ? " is-done" : ""}${isNext ? " is-next" : ""}`}>
            <button type="button" className="st-tick" aria-pressed={isDone} onClick={() => onTick(s.href)}>
              <span className="sr-only">Done: {s.title}</span>
              {isDone ? <Check aria-hidden="true" size={22} strokeWidth={1.75} /> : <span aria-hidden="true">{i + 1}</span>}
            </button>
            <div className="st-step__body">
              <h3 className="st-step__title">{s.title}</h3>
              <p className="st-step__line">{s.line}</p>
              <Link href={s.href} className={isNext && !quiet ? "btn st-step__go" : "st-step__link"}>
                {s.link}
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </Link>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * A road that has become a track (lib/startRoad.json, "track") offers the
 * track as its main action: numbered sessions in order, with the reader's
 * place kept (lib/tracks.ts). The road's own steps stay under it.
 */
function TrackOffer({ r, tracks }: { r: Road; tracks: TracksProgress }) {
  if (!r.track) return null;
  const entry = tracks.tracks[r.track.slug];
  const next = nextSession(entry, r.track.sessions);
  return (
    <div className="st-track">
      <p className="st-track__line">
        This road is now a track: {r.track.sessions} short sessions in order, about ten minutes each. Each one opens something on this site, then asks one thing of you, and your place is kept.
      </p>
      <div className="st-track__acts">
        <Link href={next === null ? trackHref(r.track.slug) : sessionHref(r.track.slug, next)} className="btn">
          {!entry ? "Start the track" : next === null ? "See the track again" : `Continue the track at session ${next}`}
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
        </Link>
        <Link href={trackHref(r.track.slug)} className="btn btn--quiet">
          See the {r.track.sessions} sessions
        </Link>
      </div>
    </div>
  );
}

/** After the road for someone new: the line for someone hurt by a church, where the road goes on, and the quiz. */
function NewRoadFoot() {
  return (
    <div className="st-foot">
      <p className="st-foot__back">
        If you're coming back after years away, the road is the same one. If a church is the reason you left, read{" "}
        <Link href="/help/church-hurt">the page for people hurt by a church</Link> before step three.
      </p>
      <h3 className="st-foot__title">What next</h3>
      <ul className="st-next">
        {START_NEXT.map((n) => (
          <li key={n.href}>
            {n.lead} <Link href={n.href}>{n.link}</Link>.
          </li>
        ))}
      </ul>
      <p className="st-foot__quiz">
        {road.quiz.lead} <Link href={road.quiz.href}>{road.quiz.link}</Link> {road.quiz.after}
      </p>
    </div>
  );
}

export default function Start() {
  const [open, setOpen] = useState<Road | null>(() => hashRoad());
  const [progress, setProgress] = useState<RoadProgress>(() => readRoadProgress());
  const [kept, setKept] = useState(true);
  // A track in progress on this device (lib/tracks.ts): read once, with the page.
  const [tracks] = useState<TracksProgress>(() => readTracks());
  const trackNext = trackToContinue(tracks);
  const panelRef = useRef<HTMLElement>(null);
  const wantScroll = useRef(false);

  // A link from Home (lib/followHash) or the browser's Back changes the hash.
  useEffect(() => {
    const onHash = () => {
      const r = hashRoad();
      if (r) setOpen(r);
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  useEffect(() => {
    if (!wantScroll.current || !open) return;
    wantScroll.current = false;
    panelRef.current?.scrollIntoView?.({ behavior: scrollBehavior(), block: "start" });
    panelRef.current?.focus({ preventScroll: true });
  }, [open]);

  const keep = (next: RoadProgress) => {
    setProgress(next);
    setKept(saveRoadProgress(next));
  };

  const pick = (id: RoadId, e?: MouseEvent) => {
    e?.preventDefault();
    const r = roadById(id);
    if (!r) return;
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    wantScroll.current = true;
    setOpen(r);
    if (progress.road !== id) keep({ ...progress, road: id });
  };

  const tick = (href: string) => {
    if (open) keep(withStep(progress, open.id, href));
  };

  // "Pick up where you left off": the road this device last opened, while no road is open.
  const last = !open ? roadById(progress.road) : null;
  const lastNext = last ? nextStep(last, progress) : null;

  return (
    <Layout>
      <SEOMeta
        title="New to Faith, or Coming Back: Where to Start"
        description="One road for a new Christian or someone coming back to church: read the Gospel of John, learn to pray, find a church, and take the first eight weeks."
        url="https://www.livewellbyjamesbell.co/start"
      />

      <PageHead door="Start here" title="Start where you are" line="Pick the one that sounds like you." plate="tree" />

      <section className="st-choose" aria-labelledby="st-choose-title">
        <div className="home-wrap">
          <h2 id="st-choose-title" className="sr-only">
            Where to start
          </h2>
          {last && (
            <p className="st-resume">
              <RotateCcw aria-hidden="true" size={20} strokeWidth={1.75} />
              <span>
                Pick up where you left off:{" "}
                <a href={`#${last.id}`} onClick={(e) => pick(last.id, e)}>
                  {last.chip}
                  {lastNext ? `, step ${lastNext.n}` : ""}
                </a>
              </span>
            </p>
          )}
          {trackNext && !open && (
            <p className="st-resume" data-testid="start-track-continue">
              <Milestone aria-hidden="true" size={20} strokeWidth={1.75} />
              <span>
                Continue your track: <Link href={trackNext.href}>{trackNext.title}, session {trackNext.n} of {trackNext.total}</Link>
              </span>
            </p>
          )}
          <ul className="st-cards">
            {WAYS_IN.map((w) => (
              <li key={w.id}>{w.road ? <RoadCard r={w.road} open={open?.id === w.road.id} onPick={pick} /> : <PageCard w={w} />}</li>
            ))}
          </ul>
        </div>
      </section>

      {open && (
        <section ref={panelRef} id={open.id} tabIndex={-1} className="st-road" aria-labelledby="st-road-title">
          <div className="st-road__wrap">
            <p className="lw-sec-head__label">
              <Milestone aria-hidden="true" size={18} strokeWidth={1.75} />
              The road
            </p>
            <h2 id="st-road-title" className="st-road__title">
              {open.title}
            </h2>
            <TrackOffer r={open} tracks={tracks} />
            {open.track && <h3 className="st-foot__title st-track__or">Or take the {open.steps.length} first steps on their own</h3>}
            <p className="st-road__how">Tick a step when it's done. This device remembers.</p>
            <Steps r={open} progress={progress} onTick={tick} quiet={!!open.track} />
            {!kept && <p className="st-road__how">{SAVE_FAILED}</p>}
            {open.id === "new" && <NewRoadFoot />}
          </div>
        </section>
      )}

      <section className="st-help" aria-label="Help in a hard season">
        <div className="st-road__wrap">
          <p className="lw-newline">
            <LifeBuoy aria-hidden="true" size={22} strokeWidth={1.75} />
            <span>
              In a hard season right now? <Link href="/help">Find help for what you are facing</Link>.
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
}
