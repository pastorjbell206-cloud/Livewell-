/**
 * /academy/:program: one program of the Academy. Who it is for, what the
 * reader will be able to do at the end, and its tracks in order as a path,
 * each with its sessions done on this device and the way in; then the
 * program's certificate once every track is finished, and the next program.
 */
import { Link, useRoute } from "wouter";
import { ArrowRight, Award, Check, Lock, Printer, Users } from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import {
  ACADEMY_PATH,
  certificateHref,
  doneIn,
  hoursLabel,
  programHref,
  programMinutes,
  programProgress,
  trackComplete,
} from "@/lib/academy";
import {
  leaderHref,
  nextSession,
  printHref,
  sessionHref,
  trackHref,
} from "@/lib/tracks";
import { ProgressBar, useTracksProgress } from "../tracks/parts";
import {
  ProgramCard,
  Unaccredited,
  programResume,
  tracksOf,
  useAcademy,
} from "./parts";
import "../tracks/tracks.css";
import "../preview/preview.css";
import "./academy.css";

export default function AcademyProgram() {
  const [, params] = useRoute("/academy/:program");
  const slug = params?.program ?? "";
  const { data, retry } = useAcademy();
  const { progress } = useTracksProgress();
  const all = data?.programs.programs ?? [];
  const i = all.findIndex(p => p.slug === slug);
  const p = i >= 0 ? all[i] : undefined;
  const after = i >= 0 ? all.slice(i + 1).find(x => !x.beside) : undefined;

  if (data && !p)
    return (
      <Layout>
        <SEOMeta
          title="Program Not Found | LiveWell"
          description="This Academy program is not here."
          noindex
        />
        <div className="tk-page">
          <section className="tk-sec">
            <div className="tk-col">
              <h1 className="tk-h2">That program isn't here</h1>
              <p className="tk-p">
                <Link href={ACADEMY_PATH}>All the Academy's programs</Link>
              </p>
            </div>
          </section>
        </div>
      </Layout>
    );

  const tracks = p && data ? tracksOf(p, data.briefs) : [];
  const pr = p && data ? programProgress(p, data.briefs, progress) : null;
  const resume = p && data ? programResume(p, data, progress) : null;
  const firstOpen = tracks.find(
    t => !trackComplete(progress.tracks[t.slug], t.sessions.length)
  )?.slug;

  return (
    <Layout>
      {p && (
        <SEOMeta
          title={`${p.title}: an Academy Program | LiveWell`}
          description={`${p.reader} ${p.outcome}`}
          url={`https://www.livewellbyjamesbell.co${programHref(p.slug)}`}
        />
      )}
      <div className="tk-page ac-page">
        {data === undefined && (
          <div className="tk-wait" data-lw-loading aria-busy="true" />
        )}
        {data === null && (
          <section className="tk-sec">
            <LoadFailed
              what="This program"
              onRetry={retry}
              backHref={ACADEMY_PATH}
              backLabel="The Academy"
            />
          </section>
        )}
        {p && data && pr && (
          <>
            <InnerHead
              path={programHref(p.slug)}
              place={{ door: { name: "Academy", href: ACADEMY_PATH } }}
              title={p.title}
              line={p.reader}
              plate={p.plate}
              action={
                resume ? (
                  <Link href={resume.href} className="btn">
                    {resume.label}
                  </Link>
                ) : undefined
              }
            />

            <section className="tk-sec" aria-labelledby="ac-path">
              <div className="tk-col">
                <p className="ac-outcome">
                  <span className="eyebrow">By the end</span>
                  {p.outcome}
                </p>
                <p className="tk-p tk-p--quiet">
                  {tracks.length} tracks, {pr.total} sessions of about ten
                  minutes. {hoursLabel(programMinutes(p, data.briefs))} in all,
                  at whatever pace you keep.
                </p>
                <h2 id="ac-path" className="tk-h2">
                  The path
                </h2>
                <div className="tk-progress">
                  <p className="tk-progress__words">
                    {pr.complete
                      ? `All ${pr.total} sessions done`
                      : pr.done
                        ? `${pr.done} of ${pr.total} sessions done, ${pr.tracksDone} of ${tracks.length} tracks finished`
                        : `${pr.total} sessions`}
                  </p>
                  <span className="ac-meter ac-meter--wide" aria-hidden="true">
                    <span
                      style={{
                        width: `${pr.total ? Math.round((pr.done / pr.total) * 100) : 0}%`,
                      }}
                    />
                  </span>
                </div>

                <ol className="ac-path">
                  {tracks.map((t, n) => {
                    const entry = progress.tracks[t.slug];
                    const total = t.sessions.length;
                    const done = doneIn(entry, total);
                    const complete = done >= total;
                    const next = nextSession(entry, total);
                    const isNow = t.slug === firstOpen;
                    return (
                      <li
                        key={t.slug}
                        className={`ac-stop${complete ? " is-done" : ""}${isNow ? " is-next" : ""}`}
                      >
                        <span className="ac-stop__n" aria-hidden="true">
                          {complete ? (
                            <Check size={22} strokeWidth={1.75} />
                          ) : (
                            n + 1
                          )}
                        </span>
                        <div className="ac-stop__body">
                          <p className="eyebrow ac-stop__for">{t.for}</p>
                          <h3 className="ac-stop__title">
                            <Link href={trackHref(t.slug)}>
                              <span className="sr-only">
                                Track {n + 1}
                                {complete ? ", finished" : ""}:
                              </span>{" "}
                              {t.title}
                            </Link>
                          </h3>
                          <p className="ac-stop__dek">{t.subtitle}</p>
                          <p className="tk-step__facts">
                            {total} sessions, about {t.minutes} minutes each.
                          </p>
                          {done > 0 && (
                            <ProgressBar
                              total={total}
                              entry={entry}
                              now={next}
                            />
                          )}
                          <div className="ac-stop__acts">
                            {complete ? (
                              <Link
                                href={certificateHref("track", t.slug)}
                                className="btn"
                              >
                                <Award
                                  aria-hidden="true"
                                  size={18}
                                  strokeWidth={1.75}
                                />{" "}
                                Your certificate
                              </Link>
                            ) : (
                              <Link
                                href={sessionHref(t.slug, next ?? 1)}
                                className={isNow ? "btn" : "btn btn--quiet"}
                              >
                                {done > 0
                                  ? `Continue at session ${next}`
                                  : "Start at session 1"}{" "}
                                <ArrowRight
                                  aria-hidden="true"
                                  size={18}
                                  strokeWidth={1.75}
                                />
                              </Link>
                            )}
                            <Link
                              href={trackHref(t.slug)}
                              className="btn btn--text"
                            >
                              All {total} sessions
                            </Link>
                            {t.leader && (
                              <Link
                                href={leaderHref(t.slug)}
                                className="btn btn--text"
                              >
                                <Users
                                  aria-hidden="true"
                                  size={16}
                                  strokeWidth={1.75}
                                />{" "}
                                Leader's guide
                              </Link>
                            )}
                            <Link
                              href={printHref(t.slug)}
                              className="btn btn--text"
                            >
                              <Printer
                                aria-hidden="true"
                                size={16}
                                strokeWidth={1.75}
                              />{" "}
                              Print
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className={`ac-award${pr.complete ? " is-earned" : ""}`}>
                  <Award aria-hidden="true" size={34} strokeWidth={1.4} />
                  <div>
                    <h2 className="tk-h3">The program certificate</h2>
                    {pr.complete ? (
                      <p className="tk-p">
                        You have finished every track in {p.title}.{" "}
                        <Link href={certificateHref("program", p.slug)}>
                          Print your certificate
                        </Link>
                        .
                      </p>
                    ) : (
                      <p className="tk-p">
                        Finish all {tracks.length} tracks and a certificate for{" "}
                        {p.title} is yours to print, with your name on it. Each
                        track you finish has its own certificate too.
                      </p>
                    )}
                    <Unaccredited />
                  </div>
                </div>
                <p className="tk-note">
                  <Lock aria-hidden="true" size={18} strokeWidth={1.75} />
                  <span>
                    Your place and your answers are kept on this device only.
                    There is no account, and nothing is sent anywhere.
                  </span>
                </p>
              </div>
            </section>

            {after && (
              <section
                className="tk-sec tk-sec--warm"
                aria-labelledby="ac-after"
              >
                <div className="tk-in">
                  <h2 id="ac-after" className="tk-h2">
                    Then, next on the road
                  </h2>
                  <ul className="pv-pcards pv-pcards--1 ac-cards ac-cards--one">
                    <li>
                      <ProgramCard p={after} data={data} progress={progress} />
                    </li>
                  </ul>
                  <p className="tk-p" style={{ marginTop: "var(--s-3)" }}>
                    <Link href={ACADEMY_PATH}>
                      All the programs{" "}
                      <ArrowRight
                        aria-hidden="true"
                        size={16}
                        strokeWidth={1.75}
                      />
                    </Link>
                  </p>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
