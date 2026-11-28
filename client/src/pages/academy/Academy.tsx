/**
 * /academy: the LiveWell Academy's front door. Its programs
 * (client/public/academy/programs.json), each a few tracks in order, laid
 * out as one road in five levels: from first opening the Bible, to reading
 * it whole, to knowing its books, to knowing what the church believes and
 * why, to living it and explaining it to others (James, 2026-11-27). Two
 * programs stand beside the road for particular readers (teenagers, a
 * family). Every card says who it is for in plain words. Progress is the
 * tracks' own record on this device; finishing the whole road earns the
 * graduate certificate.
 */
import { Link } from "wouter";
import { Award, BookOpenCheck, Clock, GraduationCap, Lock, Milestone, NotebookPen, Users } from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { GRADUATE_HREF, LEARNED_PATH, levelAnchor, programProgress, roadAsProgram } from "@/lib/academy";
import { trackToContinue } from "@/lib/tracks";
import { ContinueLine, useTracksProgress } from "../tracks/parts";
import { ProgramCard, Unaccredited, useAcademy } from "./parts";
import "../tracks/tracks.css";
import "../preview/preview.css";
import "./academy.css";

export default function Academy() {
  const { data, retry } = useAcademy();
  const { progress } = useTracksProgress();
  const next = trackToContinue(progress);
  const all = data?.programs.programs ?? [];
  const levels = data?.programs.levels ?? [];
  const beside = all.filter((p) => p.beside);
  const slugs = Array.from(new Set(all.flatMap((p) => p.tracks)));
  const sessions = data ? slugs.reduce((n, s) => n + (data.briefs.get(s)?.sessions.length ?? 0), 0) : 0;
  const road = data ? programProgress(roadAsProgram(all), data.briefs, progress) : null;

  return (
    <Layout>
      <SEOMeta
        title="The LiveWell Academy: Learn the Bible from the Beginning"
        description="A free Bible academy in five levels: from first opening the Bible, to understanding it whole, to knowing what Christians believe and why, and explaining it to others. Unaccredited certificates."
        url="https://www.livewellbyjamesbell.co/academy"
      />
      <div className="tk-page ac-page">
        <InnerHead
          path="/academy"
          title="The LiveWell Academy"
          line="From first opening the Bible to understanding it whole, knowing what we believe and why, and being able to explain it to others. Free, at your own pace, a session of about ten minutes at a time."
          plate="lectern"
          action={
            <a href="#programs" className="btn">
              Choose where to begin
            </a>
          }
        />

        <section className="tk-sec" aria-labelledby="ac-how">
          <div className="tk-in">
            {next && <ContinueLine next={next} />}
            <h2 id="ac-how" className="sr-only">
              How the Academy works
            </h2>
            <ul className="ac-how">
              <li>
                <Clock aria-hidden="true" size={26} strokeWidth={1.5} />
                <span>
                  <strong>A session is about ten minutes.</strong> A short teaching, one page of the Study Bible or the library to open, then one question, one thing to do and one verse to keep.
                </span>
              </li>
              <li>
                <Milestone aria-hidden="true" size={26} strokeWidth={1.5} />
                <span>
                  <strong>Five levels, one road.</strong> {data ? `${all.length} programs, ${slugs.length} tracks, ${sessions} sessions in all.` : ""}
                </span>
              </li>
              <li>
                <Award aria-hidden="true" size={26} strokeWidth={1.5} />
                <span>
                  <strong>A certificate for every track and program you finish,</strong> and one for the whole road. Unaccredited: a record of your own study, not academic credit.
                </span>
              </li>
              <li>
                <Users aria-hidden="true" size={26} strokeWidth={1.5} />
                <span>
                  <strong>Alone or with a group.</strong> Every session has a group guide, and every track a leader's guide and a print view.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="tk-sec tk-sec--warm" id="programs" aria-labelledby="ac-road">
          <div className="tk-in">
            <p className="tk-label">
              <BookOpenCheck aria-hidden="true" size={18} strokeWidth={1.75} />
              The road from the beginning
            </p>
            <h2 id="ac-road" className="tk-h2">
              Begin where you are
            </h2>
            <p className="tk-p">
              The levels run in order, from the first questions to a faith you can explain to someone else. Start with the first program that fits you. Not sure Christianity is true? Begin at the very
              start. Already following Jesus? Begin with the Bible's story, at level two.
            </p>
            {data === undefined && <div className="tk-wait" data-lw-loading aria-busy="true" />}
            {data === null && <LoadFailed what="The Academy" onRetry={retry} backHref="/tracks" backLabel="All tracks" />}
            {data && (
              <>
                <ol className="ac-levels-nav" aria-label="The five levels">
                  {levels.map((l) => {
                    const ps = all.filter((p) => p.level === l.n);
                    const prs = ps.map((p) => programProgress(p, data.briefs, progress));
                    const state = prs.every((x) => x.complete) ? "is-done" : prs.some((x) => x.done > 0) ? "is-going" : "";
                    return (
                      <li key={l.n} className={state}>
                        <a href={`#${levelAnchor(l.n)}`}>
                          <span className="ac-road__n" aria-hidden="true">
                            {l.n}
                          </span>
                          <span className="ac-road__name">{l.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
                {levels.map((l) => {
                  const ps = all.filter((p) => p.level === l.n);
                  return (
                    <div key={l.n} className="ac-level" id={levelAnchor(l.n)}>
                      <div className="ac-level__head">
                        <span className="ac-level__n" aria-hidden="true">
                          {l.n}
                        </span>
                        <div>
                          <p className="eyebrow ac-level__kicker">Level {l.n}</p>
                          <h3 className="ac-level__title">{l.title}</h3>
                          <p className="ac-level__line">{l.line}</p>
                        </div>
                      </div>
                      <ul className="pv-pcards pv-pcards--3 ac-cards">
                        {ps.map((p) => (
                          <li key={p.slug}>
                            <ProgramCard p={p} data={data} progress={progress} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
                {road && (
                  <div className={`ac-award ac-graduate${road.complete ? " is-earned" : ""}`}>
                    <GraduationCap aria-hidden="true" size={36} strokeWidth={1.4} />
                    <div>
                      <h3 className="tk-h3">The end of the road</h3>
                      {road.complete ? (
                        <p className="tk-p">
                          You have finished every program on every level. <Link href={GRADUATE_HREF}>Print your graduate certificate</Link>.
                        </p>
                      ) : (
                        <p className="tk-p">
                          Finish every program on all five levels, {road.total} sessions in all, and the graduate certificate of the LiveWell Academy is yours to print.{" "}
                          {road.done > 0 ? `You have done ${road.done} of them.` : ""}
                        </p>
                      )}
                      <Unaccredited />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {data && beside.length > 0 && (
          <section className="tk-sec" aria-labelledby="ac-beside">
            <div className="tk-in">
              <p className="tk-label">
                <Users aria-hidden="true" size={18} strokeWidth={1.75} />
                For particular readers
              </p>
              <h2 id="ac-beside" className="tk-h2">
                For teenagers, and for families
              </h2>
              <ul className="pv-pcards pv-pcards--2 ac-cards">
                {beside.map((p) => (
                  <li key={p.slug}>
                    <ProgramCard p={p} data={data} progress={progress} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="tk-sec tk-sec--warm" aria-labelledby="ac-record">
          <div className="tk-in ac-record">
            <div>
              <p className="tk-label">
                <NotebookPen aria-hidden="true" size={18} strokeWidth={1.75} />
                Your record
              </p>
              <h2 id="ac-record" className="tk-h2">
                What you've learned, and your certificates
              </h2>
              <p className="tk-p">
                Every session you finish and every answer you write is kept on this device. <Link href={LEARNED_PATH}>What I've learned</Link> gathers them in one place, with a certificate
                for each track and program you complete, ready to print with your name on it.
              </p>
              <Unaccredited />
              <p className="tk-note">
                <Lock aria-hidden="true" size={18} strokeWidth={1.75} />
                <span>There is no account and no fee. Nothing you write here is sent anywhere.</span>
              </p>
            </div>
            <Link href={LEARNED_PATH} className="btn">
              What I've learned
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
