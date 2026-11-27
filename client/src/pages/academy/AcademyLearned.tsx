/**
 * /academy/learned: "What I've learned". Every track begun on this device,
 * its sessions done, and the reader's own answers to each session's question
 * (the tracks' record, livewell-progress-tracks-v1); the certificates earned;
 * the programs under way. Nothing here leaves the device, and the page says so.
 */
import { Link } from "wouter";
import { Award, Lock, NotebookPen, Printer } from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import {
  ACADEMY_PATH,
  certificateHref,
  doneIn,
  programHref,
  programProgress,
  trackComplete,
} from "@/lib/academy";
import { sessionHref, trackHref } from "@/lib/tracks";
import { ProgressBar, useTracksProgress } from "../tracks/parts";
import { Unaccredited, useAcademy } from "./parts";
import "../tracks/tracks.css";
import "./academy.css";

export default function AcademyLearned() {
  const { data, retry } = useAcademy();
  const { progress } = useTracksProgress();

  const begun = data
    ? data.index.tracks
        .filter(t => progress.tracks[t.slug])
        .sort((a, b) =>
          progress.tracks[b.slug].at > progress.tracks[a.slug].at ? 1 : -1
        )
    : [];
  const programs = data?.programs.programs ?? [];
  const trackCerts = begun.filter(t =>
    trackComplete(progress.tracks[t.slug], t.sessions.length)
  );
  const programCerts = data
    ? programs.filter(p => programProgress(p, data.briefs, progress).complete)
    : [];
  const under = data
    ? programs.filter(p => {
        const pr = programProgress(p, data.briefs, progress);
        return pr.done > 0 && !pr.complete;
      })
    : [];
  const sessionsDone = begun.reduce(
    (n, t) => n + doneIn(progress.tracks[t.slug], t.sessions.length),
    0
  );

  return (
    <Layout>
      <SEOMeta
        title="What I've Learned: Your Academy Record | LiveWell"
        description="Your sessions, your answers and your certificates from the LiveWell Academy, kept on this device only."
        url="https://www.livewellbyjamesbell.co/academy/learned"
        noindex
      />
      <div className="tk-page ac-page">
        <InnerHead
          path="/academy/learned"
          place={{ door: { name: "Academy", href: ACADEMY_PATH } }}
          title="What I've learned"
          line="Your sessions, your own answers, and your certificates. Kept on this device only."
          plate="quill"
          action={
            begun.length > 0 ? (
              <button
                type="button"
                className="btn btn--quiet"
                onClick={() => window.print()}
              >
                <Printer aria-hidden="true" size={18} strokeWidth={1.75} />{" "}
                Print my record
              </button>
            ) : undefined
          }
        />

        <section className="tk-sec">
          <div className="tk-col">
            {data === undefined && (
              <div className="tk-wait" data-lw-loading aria-busy="true" />
            )}
            {data === null && (
              <LoadFailed
                what="Your record"
                onRetry={retry}
                backHref={ACADEMY_PATH}
                backLabel="The Academy"
              />
            )}
            {data && begun.length === 0 && (
              <div className="ac-empty">
                <NotebookPen aria-hidden="true" size={34} strokeWidth={1.4} />
                <p className="tk-p">
                  Nothing here yet. Finish a session of any track and it will be
                  kept here, with the answer you wrote.
                </p>
                <Link href={ACADEMY_PATH} className="btn">
                  Choose where to begin
                </Link>
              </div>
            )}
            {data && begun.length > 0 && (
              <>
                <p className="ac-tally">
                  <span>
                    <strong>{sessionsDone}</strong> sessions done
                  </span>
                  <span>
                    <strong>{begun.length}</strong> tracks begun
                  </span>
                  <span>
                    <strong>{trackCerts.length + programCerts.length}</strong>{" "}
                    certificates
                  </span>
                </p>

                {(trackCerts.length > 0 || programCerts.length > 0) && (
                  <div className="ac-certs">
                    <h2 className="tk-h2">Your certificates</h2>
                    <ul>
                      {programCerts.map(p => (
                        <li key={`p-${p.slug}`}>
                          <Award
                            aria-hidden="true"
                            size={22}
                            strokeWidth={1.6}
                          />
                          <Link href={certificateHref("program", p.slug)}>
                            Program: {p.title}
                          </Link>
                        </li>
                      ))}
                      {trackCerts.map(t => (
                        <li key={`t-${t.slug}`}>
                          <Award
                            aria-hidden="true"
                            size={22}
                            strokeWidth={1.6}
                          />
                          <Link href={certificateHref("track", t.slug)}>
                            Track: {t.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Unaccredited />
                  </div>
                )}

                {under.length > 0 && (
                  <>
                    <h2 className="tk-h2">Programs under way</h2>
                    <ul className="ac-under">
                      {under.map(p => {
                        const pr = programProgress(p, data.briefs, progress);
                        return (
                          <li key={p.slug}>
                            <Link href={programHref(p.slug)}>{p.title}</Link>
                            <span>
                              {pr.done} of {pr.total} sessions, {pr.tracksDone}{" "}
                              of {p.tracks.length} tracks
                            </span>
                            <span className="ac-meter" aria-hidden="true">
                              <span
                                style={{
                                  width: `${Math.round((pr.done / pr.total) * 100)}%`,
                                }}
                              />
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                <h2 className="tk-h2">Track by track</h2>
                {begun.map(t => {
                  const entry = progress.tracks[t.slug];
                  const total = t.sessions.length;
                  const answered = t.sessions.filter(
                    s =>
                      entry.done.includes(s.n) ||
                      entry.notes[String(s.n)]?.answer
                  );
                  return (
                    <article key={t.slug} className="ac-track">
                      <h3 className="tk-h3">
                        <Link href={trackHref(t.slug)}>{t.title}</Link>
                      </h3>
                      <ProgressBar total={total} entry={entry} />
                      <ol className="ac-answers">
                        {answered.map(s => {
                          const note = entry.notes[String(s.n)];
                          return (
                            <li key={s.n}>
                              <p className="ac-answers__s">
                                <Link href={sessionHref(t.slug, s.n)}>
                                  Session {s.n}: {s.title}
                                </Link>
                                {entry.done.includes(s.n) ? (
                                  <span className="ac-answers__done">Done</span>
                                ) : null}
                              </p>
                              {note?.answer ? (
                                <blockquote className="ac-answers__a">
                                  {note.answer}
                                </blockquote>
                              ) : (
                                <p className="ac-answers__none">
                                  No answer written.
                                </p>
                              )}
                            </li>
                          );
                        })}
                      </ol>
                    </article>
                  );
                })}
              </>
            )}
            <p className="tk-note">
              <Lock aria-hidden="true" size={18} strokeWidth={1.75} />
              <span>
                All of this is kept in this browser on this device. There is no
                account, and nothing is sent anywhere. Clearing this browser's
                data clears it, and it will not follow you to another device.
              </span>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
