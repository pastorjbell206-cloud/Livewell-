/**
 * /tracks/:slug/leader: the leader's guide for a track. First how to run a
 * group through it, from the track's own `leader` parts (the group, the room,
 * the order of a meeting, a hard question, someone who is hurting, when to
 * point someone to Find Help), then every session's group guide gathered in
 * order, with the page each session opens and the question it asks.
 *
 * It prints as a booklet (tracks.css, @media print): ink on paper in either
 * theme (.print-paper), each session kept whole, every address written out,
 * and nothing that only works on a screen. A track with no leader's guide
 * yet says so plainly and points to its sessions, whose group guides stand.
 */
import { Link, useRoute } from "wouter";
import { ArrowRight, LifeBuoy, Milestone, Printer, Users } from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { TakeItWithYou } from "@/components/TakeItWithYou";
import { RefText } from "@/components/VerseRef";
import InnerHead from "@/components/art/InnerHead";
import { TRACKS_PATH, fetchTrack, kindLabel, leaderHref, paperAddress, printHref, sessionHref, trackHref, type Track } from "@/lib/tracks";
import { HelpText, useLoad } from "./parts";
import "./tracks.css";

function Guide({ track }: { track: Track }) {
  const leader = track.leader!;
  const total = track.sessions.length;
  return (
    <>
      <section className="tk-sec tk-sec--tight print-paper" aria-labelledby="tk-run">
        <div className="tk-col">
          <TakeItWithYou
            title={`Leader's guide: ${track.title}`}
            kind="Leader's guide"
            href={leaderHref(track.slug)}
            summary={`How to run a group through ${total} sessions, with each session's group guide in order.`}
            print
          />
          {leader.about.map((p) => (
            <p key={p} className="tk-p tk-lead__about">
              {p}
            </p>
          ))}

          <h2 id="tk-run" className="tk-label tk-lead__label">
            <Users aria-hidden="true" size={18} strokeWidth={1.75} />
            Running the group
          </h2>
          {leader.sections.map((part) => (
            <section key={part.id} className="tk-lead__part" aria-labelledby={`tk-lead-${part.id}`}>
              <h3 id={`tk-lead-${part.id}`} className="tk-h3">
                {part.id === "help" && <LifeBuoy aria-hidden="true" size={22} strokeWidth={1.75} className="tk-lead__icon" />}
                {part.title}
              </h3>
              {part.body.map((p) => (
                <p key={p} className="tk-p">
                  <HelpText text={p} />
                </p>
              ))}
              {part.steps && (
                <ol className="tk-lead__steps">
                  {part.steps.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
      </section>

      <section className="tk-sec tk-sec--warm print-paper tk-lead__sessions" aria-labelledby="tk-lead-sessions">
        <div className="tk-col">
          <p className="tk-label">
            <Milestone aria-hidden="true" size={18} strokeWidth={1.75} />
            Each session's group guide
          </p>
          <h2 id="tk-lead-sessions" className="tk-h2">
            The {total} sessions, in order
          </h2>
          <p className="tk-p tk-p--quiet">Each person reads the session and opens its page before the group meets. Then take the guide in order.</p>
          <ol className="tk-lead__list">
            {track.sessions.map((s) => (
              <li key={s.n} className="tk-lead-session">
                <article aria-labelledby={`tk-ls-${s.n}`}>
                  <p className="tk-lead-session__n">
                    Session {s.n} of {total} · About {s.minutes} minutes
                  </p>
                  <h3 id={`tk-ls-${s.n}`} className="tk-h3">
                    <Link href={sessionHref(track.slug, s.n)}>{s.title}</Link>
                  </h3>
                  <p className="tk-lead-session__before">
                    Before you meet, each person opens{" "}
                    <Link href={s.open.href}>{s.open.label}</Link> ({kindLabel(s.open.kind).toLowerCase()})
                    <span className="tk-paper">, at {paperAddress(s.open.href)}</span>.
                  </p>
                  <h4 className="tk-group__head">The session's question</h4>
                  <p className="tk-group__q">{s.question}</p>
                  <h4 className="tk-group__head">To open</h4>
                  <p className="tk-group__q">{s.group.open}</p>
                  <h4 className="tk-group__head">To talk over</h4>
                  <ol className="tk-lead-session__talk">
                    {s.group.discuss.map((q) => (
                      <li key={q}>
                        <RefText text={q} />
                      </li>
                    ))}
                  </ol>
                  <h4 className="tk-group__head">The verse</h4>
                  <p className="tk-group__q">
                    {s.verse.text} ({s.verse.ref})
                  </p>
                  <h4 className="tk-group__head">To pray about</h4>
                  <p className="tk-group__q">{s.group.pray}</p>
                  {s.care && (
                    <aside className="tk-care" aria-label={`If session ${s.n} is heavy for someone`}>
                      {s.care.map((c) => (
                        <p key={c}>
                          <HelpText text={c} />
                        </p>
                      ))}
                    </aside>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="tk-sec no-print" aria-label="More for this track">
        <div className="tk-col">
          <p className="tk-p">
            <Printer aria-hidden="true" size={18} strokeWidth={1.75} className="tk-inline-icon" />{" "}
            <Link href={printHref(track.slug)}>The whole track on one page, to print</Link> for each person in the group.
          </p>
          <p className="tk-p">
            <Link href={trackHref(track.slug)}>
              All {total} sessions of {track.title} <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} className="tk-inline-icon" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default function TrackLeader() {
  const [, params] = useRoute("/tracks/:slug/leader");
  const slug = params?.slug ?? "";
  const { data: track, retry } = useLoad(slug || null, () => fetchTrack(slug));
  const total = track?.sessions.length ?? 0;

  return (
    <Layout>
      {track && (
        <SEOMeta
          title={`Leader's Guide: ${track.title}`}
          description={`How to run a small group through ${track.title}, ${total} sessions: the group, the room, the order of a meeting, hard questions, and each session's group guide.`}
          url={`https://www.livewellbyjamesbell.co${leaderHref(slug)}`}
        />
      )}
      <div className="tk-page">
        {track === undefined && <div className="tk-wait" data-lw-loading aria-busy="true" />}
        {track === null && (
          <section className="tk-sec">
            <LoadFailed what="This leader's guide" onRetry={retry} backHref={TRACKS_PATH} backLabel="All tracks" />
          </section>
        )}
        {track && !track.leader && (
          <>
            <InnerHead width="46rem" path={leaderHref(slug)} title="This track has no leader's guide yet" line={`Each of the ${total} sessions of ${track.title} ends with its own guide for a group.`} />
            <section className="tk-sec">
              <div className="tk-col">
                <Link href={trackHref(slug)} className="btn">
                  See the {total} sessions
                </Link>
              </div>
            </section>
          </>
        )}
        {track?.leader && (
          <>
            <InnerHead
              width="46rem"
              path={leaderHref(slug)}
              title={`Leader's guide: ${track.title}`}
              line={`How to run a small group through these ${total} sessions, then each session's group guide in order.`}
              plate="tree"
            />
            <Guide track={track} />
          </>
        )}
      </div>
    </Layout>
  );
}
