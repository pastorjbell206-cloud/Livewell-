/**
 * /tracks/:slug/:n: one session of a track. The session's own short teaching,
 * then the one page or tool it opens (with the way back kept for that page:
 * lib/tracks setReturn, drawn there by components/TrackReturnBar), then what
 * it asks of the reader: one question to answer, one thing to do, one verse
 * to keep. A care line where the session is heavy, and a guide for a group.
 *
 * The reader's answer and ticks are kept on this device through lib/storage
 * (livewell-progress-tracks-v1) and the page says so. Opening a session
 * begins the track; "Mark this session done" moves the reader on. A session
 * and its group guide each print on their own.
 */
import { useEffect, type ReactNode } from "react";
import { Link, useRoute } from "wouter";
import { ArrowRight, BookOpen, Check, CornerDownRight, HelpCircle, Lock, Milestone, Printer, Users } from "lucide-react";

import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import TurnNav from "@/components/TurnNav";
import { RefText } from "@/components/VerseRef";
import InnerHead from "@/components/art/InnerHead";
import { KEPT_HERE } from "@/lib/study-method";
import { TRACKS_PATH, fetchTrack, kindLabel, sessionHref, setReturn, trackHref, withDone, withNotes, withStarted, type Track, type TrackLink, type TrackSession as Session } from "@/lib/tracks";
import { ProgressBar, useLoad, useTracksProgress } from "./parts";
import "./tracks.css";

/** A care line names the Find Help page; here those two words open it. */
function CareLine({ text }: { text: string }) {
  const [before, after] = text.split("Find Help");
  if (after === undefined) return <p>{text}</p>;
  return (
    <p>
      {before}
      <Link href="/help">Find Help</Link>
      {after}
    </p>
  );
}

/** A link out of the session: the way back is noted as the reader leaves. */
function OutLink({ link, onLeave, className, children }: { link: TrackLink; onLeave: (to: string) => void; className?: string; children: ReactNode }) {
  return (
    <Link href={link.href} className={className} onClick={() => onLeave(link.href)}>
      {children}
    </Link>
  );
}

/** Print the whole session, or the group guide alone (tracks.css reads the attribute). */
function printPart(part: "session" | "group") {
  const root = document.documentElement;
  root.dataset.tkPrint = part;
  const clear = () => {
    delete root.dataset.tkPrint;
    window.removeEventListener("afterprint", clear);
  };
  window.addEventListener("afterprint", clear);
  window.print();
}

function SessionBody({ track, s }: { track: Track; s: Session }) {
  const total = track.sessions.length;
  const id = { slug: track.slug, title: track.title, total };
  const { progress, keep, kept } = useTracksProgress();
  const entry = progress.tracks[track.slug];
  const notes = entry?.notes[s.n] ?? {};
  const isDone = !!entry?.done.includes(s.n);
  const prev = track.sessions[s.n - 2];
  const next = track.sessions[s.n];

  // Opening a session begins the track, so "Continue" has somewhere to return to.
  useEffect(() => {
    if (!progress.tracks[track.slug]) keep(withStarted(progress, id));
    // Once per session opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.slug, s.n]);

  const leave = (to: string) => {
    setReturn({ slug: track.slug, n: s.n, total, to });
  };

  return (
    <section className="tk-sec tk-sec--tight" aria-label={`Session ${s.n}`}>
      <div className="tk-col">
        <p className="tk-facts">
          <Link href={trackHref(track.slug)}>{track.title}</Link> · Session {s.n} of {total} · About {s.minutes} minutes
        </p>
        <ProgressBar total={total} entry={entry} now={s.n} />

        <div className="tk-part tk-teach">
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
            <aside className="tk-care" aria-label="If this is heavy for you">
              {s.care.map((c) => (
                <CareLine key={c} text={c} />
              ))}
            </aside>
          )}
        </div>

        <div className="tk-part">
          <p className="tk-label">
            <CornerDownRight aria-hidden="true" size={18} strokeWidth={1.75} />
            Then open this
          </p>
          <div className="tk-open">
            <p className="tk-open__kind">{kindLabel(s.open.kind)}</p>
            <p className="tk-open__why">{s.open.why}</p>
            <OutLink link={s.open} onLeave={leave} className="btn">
              {s.open.label} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
            </OutLink>
            <p className="tk-open__back">
              A button on that page, “Back to session {s.n} of {total}”, brings you back here.
            </p>
          </div>
          {s.also && s.also.length > 0 && (
            <>
              <h2 className="tk-group__head">If you have more time</h2>
              <ul className="tk-also">
                {s.also.map((l) => (
                  <li key={l.href}>
                    <OutLink link={l} onLeave={leave}>
                      {l.label} <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                    </OutLink>
                    <span>{l.why}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="tk-part">
          <p className="tk-label">
            <HelpCircle aria-hidden="true" size={18} strokeWidth={1.75} />
            Then come back to these three
          </p>
          <ol className="tk-asks">
            <li>
              <h2 className="tk-h3" id="tk-q">
                One question
              </h2>
              <p className="tk-ask__text">{s.question}</p>
              <textarea
                className="tk-field"
                aria-labelledby="tk-q"
                aria-describedby="tk-kept"
                placeholder="Write your answer here, if you like."
                value={notes.answer ?? ""}
                onChange={(e) => keep(withNotes(progress, id, s.n, { answer: e.target.value }))}
              />
              <div className="tk-print-only tk-lines" aria-hidden="true" />
            </li>
            <li>
              <h2 className="tk-h3">One thing to do</h2>
              <p className="tk-ask__text">
                <RefText text={s.do} />
              </p>
              <label className="tk-check">
                <input type="checkbox" checked={!!notes.did} onChange={(e) => keep(withNotes(progress, id, s.n, { did: e.target.checked }))} />
                I did this
              </label>
            </li>
            <li>
              <h2 className="tk-h3">One verse to keep</h2>
              <blockquote className="tk-verse">
                <p>{s.verse.text}</p>
                <cite>
                  <RefText text={s.verse.ref} />, Berean Standard Bible
                </cite>
              </blockquote>
            </li>
          </ol>

          <p className="tk-note" id="tk-kept">
            <Lock aria-hidden="true" size={18} strokeWidth={1.75} />
            <span>{KEPT_HERE}</span>
          </p>
          {!kept && (
            <p className="tk-note tk-note--alert" role="status">
              {SAVE_FAILED}
            </p>
          )}

          <div className="tk-done">
            {isDone ? (
              <>
                <span className="tk-done__said">
                  <Check aria-hidden="true" size={20} strokeWidth={1.75} />
                  Session {s.n} is marked done.
                </span>
                {next ? (
                  <Link href={sessionHref(track.slug, next.n)} className="btn">
                    Go on to session {next.n} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                  </Link>
                ) : (
                  <Link href={trackHref(track.slug)} className="btn">
                    See the whole track
                  </Link>
                )}
                <button type="button" className="tk-quiet-btn" onClick={() => keep(withDone(progress, id, s.n, false))}>
                  Not done after all
                </button>
              </>
            ) : (
              <button type="button" className="btn" onClick={() => keep(withDone(progress, id, s.n))}>
                <Check aria-hidden="true" size={18} strokeWidth={1.75} />
                Mark this session done
              </button>
            )}
          </div>
        </div>

        <section className="tk-group" aria-labelledby="tk-group">
          <p className="tk-label">
            <Users aria-hidden="true" size={18} strokeWidth={1.75} />
            With a group
          </p>
          <h2 id="tk-group" className="tk-h3">
            Group guide: {s.title}
          </h2>
          <p className="tk-p tk-p--quiet">
            {track.title}, session {s.n} of {total}. Each person reads the session first. Then meet, and take these in order.
          </p>
          <h3 className="tk-group__head">To open</h3>
          <p className="tk-group__q">{s.group.open}</p>
          <h3 className="tk-group__head">To talk over</h3>
          <ol>
            {s.group.discuss.map((q) => (
              <li key={q}>
                <RefText text={q} />
              </li>
            ))}
          </ol>
          <h3 className="tk-group__head">The verse</h3>
          <p className="tk-group__q">
            {s.verse.text} ({s.verse.ref})
          </p>
          <h3 className="tk-group__head">To pray about</h3>
          <p className="tk-group__q">{s.group.pray}</p>
          <div className="tk-prints">
            <button type="button" className="btn btn--quiet" onClick={() => printPart("group")}>
              <Printer aria-hidden="true" size={18} strokeWidth={1.75} />
              Print the group guide
            </button>
            <button type="button" className="btn btn--quiet" onClick={() => printPart("session")}>
              <Printer aria-hidden="true" size={18} strokeWidth={1.75} />
              Print this session
            </button>
          </div>
        </section>

        <TurnNav
          label="Previous and next session"
          prev={prev ? { href: sessionHref(track.slug, prev.n), title: prev.title } : null}
          next={next ? { href: sessionHref(track.slug, next.n), title: next.title } : null}
          prevLabel={prev ? `Session ${prev.n}` : undefined}
          nextLabel={next ? `Session ${next.n}` : undefined}
        />
        <p className="tk-note">
          <Milestone aria-hidden="true" size={18} strokeWidth={1.75} />
          <span>
            <Link href={trackHref(track.slug)}>All {total} sessions of this track</Link>
          </span>
        </p>
      </div>
    </section>
  );
}

export default function TrackSession() {
  const [, params] = useRoute("/tracks/:slug/:n");
  const slug = params?.slug ?? "";
  const n = Number(params?.n);
  const { data: track, retry } = useLoad(slug || null, () => fetchTrack(slug));
  const s = track?.sessions.find((x) => x.n === n);
  const total = track?.sessions.length ?? 0;

  return (
    <Layout>
      {track && s && (
        <SEOMeta
          title={`${s.title}, Session ${s.n} of ${total}`}
          description={`${s.teaching[0].split(/(?<=[.?])\s/).slice(0, 2).join(" ")}`}
          url={`https://www.livewellbyjamesbell.co${sessionHref(slug, s.n)}`}
        />
      )}
      <div className="tk-page">
        {track === undefined && <div className="tk-wait" data-lw-loading aria-busy="true" />}
        {track === null && (
          <section className="tk-sec">
            <LoadFailed what="This session" onRetry={retry} backHref={TRACKS_PATH} backLabel="All tracks" />
          </section>
        )}
        {track && !s && (
          <>
            <InnerHead width="46rem" path={trackHref(slug)} title="That session is not in this track" line={`${track.title} has ${total} sessions.`} />
            <section className="tk-sec">
              <div className="tk-col">
                <Link href={trackHref(slug)} className="btn">
                  See the {total} sessions
                </Link>
              </div>
            </section>
          </>
        )}
        {track && s && (
          <>
            <InnerHead width="46rem" path={sessionHref(slug, s.n)} title={s.title} />
            <SessionBody key={`${slug}/${s.n}`} track={track} s={s} />
          </>
        )}
      </div>
    </Layout>
  );
}
