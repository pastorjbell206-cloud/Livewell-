/**
 * /tracks/:slug: one track. Its sessions in order, which are done on this
 * device, and "Start" or "Continue" at the first one that is not. The data is
 * client/public/tracks/<slug>.json (lib/tracks.ts).
 */
import { Link, useRoute } from "wouter";
import { ArrowRight, Check, Lock, Milestone, RotateCcw, Users } from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import InnerHead from "@/components/art/InnerHead";
import { roadById, roadHref } from "@/lib/startRoads";
import { TRACKS_PATH, fetchTrack, kindLabel, nextSession, sessionHref, trackHref, withoutTrack } from "@/lib/tracks";
import { ProgressBar, useLoad, useTracksProgress } from "./parts";
import "./tracks.css";

export default function Track() {
  const [, params] = useRoute("/tracks/:slug");
  const slug = params?.slug ?? "";
  const { data: track, retry } = useLoad(slug || null, () => fetchTrack(slug));
  const { progress, keep, kept } = useTracksProgress();
  const entry = progress.tracks[slug];
  const total = track?.sessions.length ?? 0;
  const next = track ? nextSession(entry, total) : null;
  const road = roadById(track?.road ?? null);

  const startOver = () => {
    if (!window.confirm("Start this track over? Your place and your answers on this device will be cleared.")) return;
    keep(withoutTrack(progress, slug));
  };

  return (
    <Layout>
      {track && <SEOMeta title={`${track.title}: A Track in ${total} Sessions`} description={track.subtitle} url={`https://www.livewellbyjamesbell.co${trackHref(slug)}`} />}
      <div className="tk-page">
        {track === undefined && <div className="tk-wait" data-lw-loading aria-busy="true" />}
        {track === null && (
          <section className="tk-sec">
            <LoadFailed what="This track" onRetry={retry} backHref={TRACKS_PATH} backLabel="All tracks" />
          </section>
        )}
        {track && (
          <>
            <InnerHead
              width="46rem"
              path={trackHref(slug)}
              title={track.title}
              line={track.subtitle}
              plate="tree"
              action={
                next !== null ? (
                  <Link href={sessionHref(slug, next)} className="btn">
                    {entry ? `Continue at session ${next}` : "Start at session 1"}
                  </Link>
                ) : undefined
              }
            />

            <section className="tk-sec" aria-labelledby="tk-sessions">
              <div className="tk-col">
                {track.intro.map((p) => (
                  <p key={p} className="tk-p">
                    {p}
                  </p>
                ))}

                <p className="tk-label" style={{ marginTop: "var(--s-4)" }}>
                  <Milestone aria-hidden="true" size={18} strokeWidth={1.75} />
                  {track.for}
                </p>
                <h2 id="tk-sessions" className="tk-h2">
                  The {total} sessions
                </h2>
                <ProgressBar total={total} entry={entry} now={next} />

                <ol className="tk-steps">
                  {track.sessions.map((s) => {
                    const isDone = !!entry?.done.includes(s.n);
                    const isNext = next === s.n;
                    return (
                      <li key={s.n} className={`tk-step${isDone ? " is-done" : ""}${isNext ? " is-next" : ""}`}>
                        <span className="tk-step__n" aria-hidden="true">
                          {isDone ? <Check size={22} strokeWidth={1.75} /> : s.n}
                        </span>
                        <div>
                          <h3 className="tk-step__title">
                            <Link href={sessionHref(slug, s.n)}>
                              <span className="sr-only">
                                Session {s.n}
                                {isDone ? ", done" : ""}:
                              </span>{" "}
                              {s.title}
                            </Link>
                          </h3>
                          <p className="tk-step__facts">
                            About {s.minutes} minutes. Opens: {s.open.label} ({kindLabel(s.open.kind).toLowerCase()}).
                          </p>
                          {isNext && (
                            <Link href={sessionHref(slug, s.n)} className="btn tk-step__go">
                              {entry ? "Continue here" : "Start here"} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                            </Link>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <p className="tk-note">
                  <Lock aria-hidden="true" size={18} strokeWidth={1.75} />
                  <span>Your place and your answers are kept on this device only. There is no account, and nothing is sent anywhere.</span>
                </p>
                {!kept && <p className="tk-note tk-note--alert">{SAVE_FAILED}</p>}
                {entry && (
                  <button type="button" className="tk-quiet-btn" onClick={startOver}>
                    <RotateCcw aria-hidden="true" size={18} strokeWidth={1.75} />
                    Start this track over
                  </button>
                )}
              </div>
            </section>

            <section className="tk-sec tk-sec--warm" aria-label="With a group, and more">
              <div className="tk-col">
                <p className="tk-label">
                  <Users aria-hidden="true" size={18} strokeWidth={1.75} />
                  With a group
                </p>
                <p className="tk-p">
                  Every session ends with a guide for a group: a question to open with, three to talk over, and something to pray about. Each person reads the session on their own first, then
                  the group meets.
                </p>
                {road && (
                  <p className="tk-p">
                    The shorter road this track grew from is still on the Start page: <Link href={roadHref(road.id)}>{road.note.toLowerCase()}</Link>.
                  </p>
                )}
                <p className="tk-p">
                  <Link href={TRACKS_PATH}>All tracks</Link>
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
