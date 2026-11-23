/**
 * /tracks/:slug/print: the whole track on one page, to print or to save as a
 * PDF from the browser. Every session as its page shows it, less what only
 * works on a screen: the teaching, any care line, the page it opens and the
 * ones for more time (each with its address written out, since paper can't
 * be tapped), the one question with ruled lines for an answer, the one thing
 * to do, the verse, and the group guide.
 *
 * On paper (tracks.css, @media print) the introduction is the first sheet and
 * each session starts a new one; ink on paper in either theme (.print-paper).
 * Nothing here is kept or sent: the reader's answers live in the sessions.
 */
import { Link, useRoute } from "wouter";
import { ArrowRight, BookOpen, CornerDownRight, HelpCircle, Users } from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { TakeItWithYou } from "@/components/TakeItWithYou";
import { RefText } from "@/components/VerseRef";
import InnerHead from "@/components/art/InnerHead";
import { TRACKS_PATH, fetchTrack, kindLabel, leaderHref, paperAddress, printHref, sessionHref, trackHref, type Track, type TrackLink } from "@/lib/tracks";
import { HelpText, useLoad } from "./parts";
import "./tracks.css";

/** A page a session sends the reader to: a link on screen, its address on paper. */
function PaperLink({ link }: { link: TrackLink }) {
  return (
    <>
      <Link href={link.href}>{link.label}</Link> <span className="tk-paper">({paperAddress(link.href)})</span>
    </>
  );
}

function WholeTrack({ track }: { track: Track }) {
  const total = track.sessions.length;
  return (
    <>
      <section className="tk-sec tk-sec--tight print-paper" aria-label="About this track">
        <div className="tk-col">
          <TakeItWithYou title={`${track.title}: the whole track`} kind="Track" href={printHref(track.slug)} summary={track.subtitle} print />
          <p className="tk-p tk-p--quiet no-print">
            Printed, each session starts on a new sheet, with lines for your answer to its question. Answers you type into a session on this site stay on your device and are not printed here.
          </p>
          <p className="tk-print-subtitle">{track.subtitle}</p>
          {track.intro.map((p) => (
            <p key={p} className="tk-p">
              {p}
            </p>
          ))}
          <h2 className="tk-group__head">The {total} sessions</h2>
          <ol className="tk-print-contents">
            {track.sessions.map((s) => (
              <li key={s.n}>
                <a href={`#tk-print-${s.n}`}>{s.title}</a>
                <span>, about {s.minutes} minutes</span>
              </li>
            ))}
          </ol>
          <p className="tk-paper tk-p tk-p--quiet">
            The track online, where your place and answers are kept: {paperAddress(trackHref(track.slug))}
          </p>
        </div>
      </section>

      {track.sessions.map((s) => (
        <section key={s.n} id={`tk-print-${s.n}`} className="tk-sec print-paper tk-print-session" aria-labelledby={`tk-print-h-${s.n}`}>
          <div className="tk-col">
            <p className="tk-facts">
              {track.title} · Session {s.n} of {total} · About {s.minutes} minutes
            </p>
            <h2 id={`tk-print-h-${s.n}`} className="tk-h2">
              <Link href={sessionHref(track.slug, s.n)}>{s.title}</Link>
            </h2>

            <div className="tk-print-part tk-teach">
              <p className="tk-label">
                <BookOpen aria-hidden="true" size={18} strokeWidth={1.75} />
                First, read this
              </p>
              {s.teaching.map((p) => (
                <p key={p}>
                  <RefText text={p} />
                </p>
              ))}
              {s.care && (
                <aside className="tk-care" aria-label={`If session ${s.n} is heavy for you`}>
                  {s.care.map((c) => (
                    <p key={c}>
                      <HelpText text={c} />
                    </p>
                  ))}
                </aside>
              )}
            </div>

            <div className="tk-print-part">
              <p className="tk-label">
                <CornerDownRight aria-hidden="true" size={18} strokeWidth={1.75} />
                Then open this
              </p>
              <p className="tk-print-open">
                <span className="tk-open__kind">{kindLabel(s.open.kind)}</span> <PaperLink link={s.open} />
              </p>
              <p className="tk-p">{s.open.why}</p>
              {s.also && s.also.length > 0 && (
                <>
                  <h3 className="tk-group__head">If you have more time</h3>
                  <ul className="tk-print-also">
                    {s.also.map((l) => (
                      <li key={l.href}>
                        <PaperLink link={l} />: {l.why}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="tk-print-part">
              <p className="tk-label">
                <HelpCircle aria-hidden="true" size={18} strokeWidth={1.75} />
                Then come back to these three
              </p>
              <h3 className="tk-h3">One question</h3>
              <p className="tk-ask__text">{s.question}</p>
              <div className="tk-print-only tk-lines" aria-hidden="true" />
              <h3 className="tk-h3">One thing to do</h3>
              <p className="tk-ask__text">
                <RefText text={s.do} />
              </p>
              <h3 className="tk-h3">One verse to keep</h3>
              <blockquote className="tk-verse">
                <p>{s.verse.text}</p>
                <cite>
                  <RefText text={s.verse.ref} />, Berean Standard Bible
                </cite>
              </blockquote>
            </div>

            <div className="tk-print-part tk-print-group">
              <p className="tk-label">
                <Users aria-hidden="true" size={18} strokeWidth={1.75} />
                With a group
              </p>
              <h3 className="tk-group__head">To open</h3>
              <p className="tk-group__q">{s.group.open}</p>
              <h3 className="tk-group__head">To talk over</h3>
              <ol className="tk-print-talk">
                {s.group.discuss.map((q) => (
                  <li key={q}>
                    <RefText text={q} />
                  </li>
                ))}
              </ol>
              <h3 className="tk-group__head">To pray about</h3>
              <p className="tk-group__q">{s.group.pray}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="tk-sec tk-sec--warm no-print" aria-label="More for this track">
        <div className="tk-col">
          {track.leader && (
            <p className="tk-p">
              Leading a group? <Link href={leaderHref(track.slug)}>The leader's guide</Link> has how to run it and every session's group guide in order, and it prints on its own.
            </p>
          )}
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

export default function TrackPrint() {
  const [, params] = useRoute("/tracks/:slug/print");
  const slug = params?.slug ?? "";
  const { data: track, retry } = useLoad(slug || null, () => fetchTrack(slug));
  const total = track?.sessions.length ?? 0;

  return (
    <Layout>
      {track && (
        <SEOMeta
          title={`${track.title}: The Whole Track, to Print`}
          description={`All ${total} sessions of ${track.title} on one page, to print or keep: the teaching, the page each session opens, one question, one thing to do, one verse, and the group guide.`}
          url={`https://www.livewellbyjamesbell.co${printHref(slug)}`}
        />
      )}
      <div className="tk-page tk-page--paper">
        {track === undefined && <div className="tk-wait" data-lw-loading aria-busy="true" />}
        {track === null && (
          <section className="tk-sec">
            <LoadFailed what="This track" onRetry={retry} backHref={TRACKS_PATH} backLabel="All tracks" />
          </section>
        )}
        {track && (
          <>
            <InnerHead width="46rem" path={printHref(slug)} title={track.title} line={`The whole track on one page, ${total} sessions, to print or to keep.`} />
            <WholeTrack track={track} />
          </>
        )}
      </div>
    </Layout>
  );
}
