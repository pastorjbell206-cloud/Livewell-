/**
 * /academy/certificate/:kind/:slug: the certificate for a finished track or
 * program, drawn from this device's record and printed with the name the
 * reader types. It is unaccredited and says so on its face. When the track or
 * program is not finished yet, the page says how far there is to go.
 */
import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowRight, Printer } from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import Plate from "@/components/art/Plate";
import {
  ACADEMY_PATH,
  LEARNED_PATH,
  UNACCREDITED,
  doneIn,
  lastActivity,
  programHref,
  programProgress,
  readName,
  saveName,
  type Program,
} from "@/lib/academy";
import { sessionHref, trackHref, type TrackBrief } from "@/lib/tracks";
import { useTracksProgress } from "../tracks/parts";
import { tracksOf, useAcademy } from "./parts";
import "../tracks/tracks.css";
import "./academy.css";

const longDate = (iso: string | null) =>
  new Date(iso ?? Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function AcademyCertificate() {
  const [, params] = useRoute("/academy/certificate/:kind/:slug");
  const kind = params?.kind === "program" ? "program" : "track";
  const slug = params?.slug ?? "";
  const { data, retry } = useAcademy();
  const { progress } = useTracksProgress();
  const [name, setName] = useState(() => readName());

  let what: {
    title: string;
    done: number;
    total: number;
    tracks: TrackBrief[];
    program?: Program;
    back: string;
  } | null = null;
  if (data) {
    if (kind === "program") {
      const p = data.programs.programs.find(x => x.slug === slug);
      if (p) {
        const pr = programProgress(p, data.briefs, progress);
        what = {
          title: p.title,
          done: pr.done,
          total: pr.total,
          tracks: tracksOf(p, data.briefs),
          program: p,
          back: programHref(p.slug),
        };
      }
    } else {
      const t = data.briefs.get(slug);
      if (t)
        what = {
          title: t.title,
          done: doneIn(progress.tracks[t.slug], t.sessions.length),
          total: t.sessions.length,
          tracks: [t],
          back: trackHref(t.slug),
        };
    }
  }
  const earned = !!what && what.total > 0 && what.done >= what.total;
  const date = what
    ? longDate(
        lastActivity(
          what.tracks.map(t => t.slug),
          progress
        )
      )
    : "";
  const hours = what
    ? Math.max(
        1,
        Math.round(
          what.tracks.reduce(
            (m, t) => m + t.sessions.reduce((n, s) => n + s.minutes, 0),
            0
          ) / 60
        )
      )
    : 0;
  const nextUndone = what?.tracks.flatMap(t =>
    t.sessions
      .filter(s => !progress.tracks[t.slug]?.done.includes(s.n))
      .map(s => ({ t, s }))
  )[0];

  return (
    <Layout>
      <SEOMeta
        title="Your Certificate | LiveWell Academy"
        description="A certificate of completion from the LiveWell Academy, unaccredited, printed from your own record."
        noindex
      />
      <div className="tk-page ac-page">
        <section className="tk-sec ac-cert-sec">
          <div className="tk-in">
            {data === undefined && (
              <div className="tk-wait" data-lw-loading aria-busy="true" />
            )}
            {data === null && (
              <LoadFailed
                what="Your certificate"
                onRetry={retry}
                backHref={LEARNED_PATH}
                backLabel="What I've learned"
              />
            )}
            {data && !what && (
              <div className="tk-col">
                <h1 className="tk-h2">There is no such certificate</h1>
                <p className="tk-p">
                  <Link href={ACADEMY_PATH}>The Academy</Link>
                </p>
              </div>
            )}
            {what && !earned && (
              <div className="tk-col">
                <p className="eyebrow">Not finished yet</p>
                <h1 className="tk-h2">The certificate for {what.title}</h1>
                <p className="tk-p">
                  You have done {what.done} of {what.total} sessions on this
                  device. Finish them all and your certificate is here to print,
                  with your name on it.
                </p>
                {nextUndone && (
                  <Link
                    href={sessionHref(nextUndone.t.slug, nextUndone.s.n)}
                    className="btn"
                  >
                    Next: {nextUndone.s.title}{" "}
                    <ArrowRight
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.75}
                    />
                  </Link>
                )}
                <p className="ac-unaccredited">{UNACCREDITED}</p>
              </div>
            )}
            {what && earned && (
              <>
                <div className="ac-cert-tools">
                  <label className="ac-cert-name">
                    <span>Your name, as it should appear</span>
                    <input
                      type="text"
                      value={name}
                      maxLength={80}
                      autoComplete="name"
                      onChange={e => {
                        setName(e.target.value);
                        saveName(e.target.value);
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => window.print()}
                    disabled={!name.trim()}
                  >
                    <Printer aria-hidden="true" size={18} strokeWidth={1.75} />{" "}
                    Print the certificate
                  </button>
                  <Link href={what.back} className="btn btn--text">
                    Back
                  </Link>
                </div>

                <article
                  className="ac-cert"
                  aria-label={`Certificate of completion: ${what.title}`}
                >
                  <div className="ac-cert__frame">
                    <p className="ac-cert__house">LiveWell Academy</p>
                    <span className="ac-cert__plate" aria-hidden="true">
                      <Plate
                        name={what.program?.plate ?? "lectern"}
                        decorative
                      />
                    </span>
                    <h1 className="ac-cert__title">
                      Certificate of Completion
                    </h1>
                    <p className="ac-cert__small">This records that</p>
                    <p className="ac-cert__name">
                      {name.trim() || "Your name"}
                    </p>
                    <p className="ac-cert__small">
                      has completed the{" "}
                      {kind === "program" ? "program" : "track"}
                    </p>
                    <p className="ac-cert__what">{what.title}</p>
                    <p className="ac-cert__small">
                      {kind === "program"
                        ? `${what.tracks.length} tracks, `
                        : ""}
                      {what.total} sessions of guided study in Scripture, about{" "}
                      {hours} {hours === 1 ? "hour" : "hours"} in all
                    </p>
                    <div className="ac-cert__foot">
                      <span>
                        <span className="ac-cert__rule" />
                        {date}
                      </span>
                      <span>
                        <span className="ac-cert__rule" />
                        LiveWell by James Bell
                      </span>
                    </div>
                    <p className="ac-cert__notice">{UNACCREDITED}</p>
                  </div>
                </article>
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
