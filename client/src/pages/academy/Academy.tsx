/**
 * /academy: the LiveWell Academy's front door. Ten programs (client/public/
 * academy/programs.json), each a few tracks in order, laid out as one road
 * from never having opened the Bible to reading it well, knowing what the
 * church believes, and living it; two programs stand beside the road for
 * particular readers (teenagers, a family). Every card says who it is for in
 * plain words. Progress is the tracks' own record on this device.
 */
import { Link } from "wouter";
import {
  Award,
  BookOpenCheck,
  Clock,
  Lock,
  Milestone,
  NotebookPen,
  Users,
} from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LEARNED_PATH, programHref, programProgress } from "@/lib/academy";
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
  const road = data?.programs.programs.filter(p => !p.beside) ?? [];
  const beside = data?.programs.programs.filter(p => p.beside) ?? [];
  const tracks = data
    ? new Set(data.programs.programs.flatMap(p => p.tracks)).size
    : 0;
  const sessions = data
    ? Array.from(new Set(data.programs.programs.flatMap(p => p.tracks))).reduce(
        (n, s) => n + (data.briefs.get(s)?.sessions.length ?? 0),
        0
      )
    : 0;

  return (
    <Layout>
      <SEOMeta
        title="The LiveWell Academy: Learn the Bible from the Beginning"
        description="Ten free programs that take you from never having opened the Bible to reading it well, knowing what Christians believe and why, and living it. Certificates included, unaccredited."
        url="https://www.livewellbyjamesbell.co/academy"
      />
      <div className="tk-page ac-page">
        <InnerHead
          path="/academy"
          title="The LiveWell Academy"
          line="From never having opened the Bible to reading it for yourself, knowing what the church believes and why, and living it. Free, at your own pace, a session of about ten minutes at a time."
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
                  <strong>A session is about ten minutes.</strong> A short
                  teaching, one page of the Study Bible or the library to open,
                  then one question, one thing to do and one verse to keep.
                </span>
              </li>
              <li>
                <Milestone aria-hidden="true" size={26} strokeWidth={1.5} />
                <span>
                  <strong>
                    A track is a few sessions in order; a program is a few
                    tracks.
                  </strong>{" "}
                  {data
                    ? `${data.programs.programs.length} programs, ${tracks} tracks, ${sessions} sessions in all.`
                    : ""}
                </span>
              </li>
              <li>
                <Award aria-hidden="true" size={26} strokeWidth={1.5} />
                <span>
                  <strong>
                    Finish a track or a program and print your certificate.
                  </strong>{" "}
                  Certificates are unaccredited: a record of your own study, not
                  academic credit.
                </span>
              </li>
              <li>
                <Users aria-hidden="true" size={26} strokeWidth={1.5} />
                <span>
                  <strong>Alone or with a group.</strong> Every session has a
                  group guide, and every track a leader's guide and a print
                  view.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="tk-sec tk-sec--warm"
          id="programs"
          aria-labelledby="ac-road"
        >
          <div className="tk-in">
            <p className="tk-label">
              <BookOpenCheck aria-hidden="true" size={18} strokeWidth={1.75} />
              The road from the beginning
            </p>
            <h2 id="ac-road" className="tk-h2">
              Begin where you are
            </h2>
            <p className="tk-p">
              The programs run in order, from the first questions to a whole
              life shaped by the Bible. Start with the first one that fits you.
              Not sure Christianity is true? Begin with the first. Already
              following Jesus? Begin with the second, or go straight to the
              Bible's story.
            </p>
            {data === undefined && (
              <div className="tk-wait" data-lw-loading aria-busy="true" />
            )}
            {data === null && (
              <LoadFailed
                what="The Academy"
                onRetry={retry}
                backHref="/tracks"
                backLabel="All tracks"
              />
            )}
            {data && (
              <>
                <ol className="ac-road" aria-label="The programs in order">
                  {road.map((p, i) => {
                    const pr = programProgress(p, data.briefs, progress);
                    return (
                      <li
                        key={p.slug}
                        className={
                          pr.complete
                            ? "is-done"
                            : pr.done > 0
                              ? "is-going"
                              : ""
                        }
                      >
                        <Link href={programHref(p.slug)}>
                          <span className="ac-road__n" aria-hidden="true">
                            {i + 1}
                          </span>
                          <span className="ac-road__name">{p.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
                <ul className="pv-pcards pv-pcards--3 ac-cards">
                  {road.map(p => (
                    <li key={p.slug}>
                      <ProgramCard p={p} data={data} progress={progress} />
                    </li>
                  ))}
                </ul>
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
                {beside.map(p => (
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
                Every session you finish and every answer you write is kept on
                this device. <Link href={LEARNED_PATH}>What I've learned</Link>{" "}
                gathers them in one place, with a certificate for each track and
                program you complete, ready to print with your name on it.
              </p>
              <Unaccredited />
              <p className="tk-note">
                <Lock aria-hidden="true" size={18} strokeWidth={1.75} />
                <span>
                  There is no account and no fee. Nothing you write here is sent
                  anywhere.
                </span>
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
