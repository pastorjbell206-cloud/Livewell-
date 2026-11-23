/**
 * /tracks: the tracks. A track is a few numbered sessions of about ten
 * minutes, in order, each one using a page or tool the site already has and
 * ending by asking something of the reader (lib/tracks.ts; the data is
 * client/public/tracks/, listed in its index.json).
 *
 * The page lists the tracks that are written, each with who it is for, how
 * many sessions it has, "Start" or "Continue", and its leader's guide when it
 * has one; then, plainly, the roads of /start (lib/startRoads) that have no
 * track yet, each linking to its steps on /start, which stay as they are. A
 * book studied chapter by chapter ("Deep in one") grows from no road and is
 * listed with the rest.
 */
import { Link } from "wouter";
import { ArrowRight, LifeBuoy, Lock, Milestone, Users } from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import InnerHead from "@/components/art/InnerHead";
import { ROADS, roadHref } from "@/lib/startRoads";
import { fetchTrackIndex, leaderHref, nextSession, sessionHref, trackHref, trackToContinue, type TrackBrief, type TrackProgress } from "@/lib/tracks";
import { ContinueLine, ProgressBar, useLoad, useTracksProgress } from "./parts";
import "./tracks.css";

function TrackCard({ t, entry }: { t: TrackBrief; entry?: TrackProgress }) {
  const total = t.sessions.length;
  const next = nextSession(entry, total);
  const started = !!entry;
  return (
    <li className="tk-track">
      <div>
        <p className="eyebrow tk-track__for">{t.for}</p>
        <h3 className="tk-track__title">
          <Link href={trackHref(t.slug)}>{t.title}</Link>
        </h3>
        <p className="tk-track__dek">{t.subtitle}</p>
        <p className="tk-track__facts">
          {total} sessions, about {t.minutes} minutes each
          {started && next !== null ? `. You are on session ${next}.` : started ? ". You have done them all." : ""}
        </p>
        {started && <ProgressBar total={total} entry={entry} now={next} />}
      </div>
      <div className="tk-track__acts">
        <Link href={next === null ? trackHref(t.slug) : sessionHref(t.slug, next)} className="btn">
          {!started ? "Start at session 1" : next === null ? "See the sessions" : `Continue at session ${next}`}
        </Link>
        <Link href={trackHref(t.slug)} className="btn btn--quiet">
          All {total} sessions
        </Link>
        {t.leader && (
          <Link href={leaderHref(t.slug)} className="btn btn--quiet">
            Leader's guide
          </Link>
        )}
      </div>
    </li>
  );
}

export default function Tracks() {
  const { data, retry } = useLoad("index", fetchTrackIndex);
  const { progress, kept } = useTracksProgress();
  const next = trackToContinue(progress);
  const written = new Set((data?.tracks ?? []).map((t) => t.road));
  const coming = ROADS.filter((r) => !written.has(r.id));

  return (
    <Layout>
      <SEOMeta
        title="Tracks: Short Sessions in Order, Step by Step"
        description="Short sessions in order, each with a leader's guide: for someone new to faith, the skeptic, someone who has stepped back, and Mark a chapter at a time."
        url="https://www.livewellbyjamesbell.co/tracks"
      />
      <div className="tk-page">
        <InnerHead
          path="/tracks"
          title="Tracks"
          line="A track is a few short sessions, in order. Each one opens something on this site, then asks one thing of you."
          plate="tree"
        />

        <section className="tk-sec" aria-labelledby="tk-ready">
          <div className="tk-in">
            {next && <ContinueLine next={next} />}
            <p className="tk-label">
              <Milestone aria-hidden="true" size={18} strokeWidth={1.75} />
              Ready now
            </p>
            <h2 id="tk-ready" className="tk-h2">
              Choose a track
            </h2>
            {data === undefined && <div className="tk-wait" data-lw-loading aria-busy="true" />}
            {data === null && <LoadFailed what="The list of tracks" onRetry={retry} backHref="/start" backLabel="Start here" />}
            {data && (
              <ul className="tk-tracks">
                {data.tracks.map((t) => (
                  <TrackCard key={t.slug} t={t} entry={progress.tracks[t.slug]} />
                ))}
              </ul>
            )}
            <p className="tk-note">
              <Lock aria-hidden="true" size={18} strokeWidth={1.75} />
              <span>Your place and your answers are kept on this device only. There is no account, and nothing is sent anywhere.</span>
            </p>
            {!kept && <p className="tk-note tk-note--alert">{SAVE_FAILED}</p>}
          </div>
        </section>

        {data && coming.length > 0 && (
          <section className="tk-sec tk-sec--warm" aria-labelledby="tk-coming">
            <div className="tk-in">
              <h2 id="tk-coming" className="tk-h2">
                Coming
              </h2>
              <p className="tk-p">These are not written yet. Until each one is, its road on the Start page is the place to begin.</p>
              <ul className="tk-coming">
                {coming.map((r) => (
                  <li key={r.id}>
                    <span>
                      <span className="tk-coming__name">{r.chip}</span>
                      <span className="tk-coming__line">{r.title}. Not written yet.</span>
                    </span>
                    <Link href={roadHref(r.id)}>
                      The road for now <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="tk-sec" aria-label="With a group, and help">
          <div className="tk-in">
            <p className="tk-label">
              <Users aria-hidden="true" size={18} strokeWidth={1.75} />
              With a group
            </p>
            <p className="tk-p">
              Every session ends with a guide for a group: a question to open with, three to talk over, and something to pray about. It prints on one sheet. A track with a leader's guide offers it
              on its card, and every track prints whole, a session to a sheet.
            </p>
            <p className="lw-newline">
              <LifeBuoy aria-hidden="true" size={22} strokeWidth={1.75} />
              <span>
                In a hard season right now? <Link href="/help">Find help for what you are facing</Link>.
              </span>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
