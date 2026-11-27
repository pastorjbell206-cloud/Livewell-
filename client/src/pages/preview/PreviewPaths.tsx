/**
 * The learning paths on /preview/home: the site's tracks, read from their
 * own index (client/public/tracks/index.json). Choose a path and its sessions
 * are laid out in order, each a link to that session; where this device has a
 * place kept in the path (lib/tracks, livewell-progress-tracks-v1), the done
 * sessions are ticked and the button says where to carry on. Nothing is
 * written here: every title, subtitle and length is the track's own.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { fetchTrackIndex, nextSession, readTracks, sessionHref, trackHref } from "@/lib/tracks";
import { useLoad } from "../study-bible/shared";

export default function PreviewPaths({ start }: { start?: string } = {}) {
  const { data, retry } = useLoad("preview-paths", fetchTrackIndex);
  const [slug, setSlug] = useState<string | null>(null);
  const kept = useMemo(() => readTracks().tracks, []);

  if (data === null)
    return (
      <p className="home-failed">
        The paths did not load.
        <button type="button" onClick={retry}>
          Try again
        </button>
      </p>
    );
  if (!data || data.tracks.length === 0) return null;

  // Open on a path the reader has begun, else the first.
  const begun = data.tracks.find((t) => kept[t.slug]?.done.length);
  const track = data.tracks.find((t) => t.slug === slug) ?? begun ?? data.tracks.find((t) => t.slug === start) ?? data.tracks[0];
  const mine = kept[track.slug];
  const done = new Set(mine?.done ?? []);
  const next = nextSession(mine, track.sessions.length);
  const minutes = track.sessions.reduce((sum, s) => sum + s.minutes, 0);

  return (
    <div className="pv-paths">
      <div className="pv-paths__tabs" role="group" aria-label="Paths">
        {data.tracks.map((t) => (
          <button key={t.slug} type="button" className="home-chip" aria-pressed={t.slug === track.slug} onClick={() => setSlug(t.slug)}>
            {t.title}
          </button>
        ))}
      </div>
      <div className="pv-paths__body" key={track.slug}>
        <div className="pv-paths__about">
          <h3 className="pv-paths__title">
            <Link href={trackHref(track.slug)}>{track.title}</Link>
          </h3>
          <p className="pv-paths__meta">
            {track.sessions.length} sessions, about {minutes} minutes in all
            {done.size > 0 && `, ${done.size} done on this device`}
          </p>
          <p className="pv-paths__sub">{track.subtitle}</p>
          <Link href={next ? sessionHref(track.slug, next) : trackHref(track.slug)} className="home-btn">
            {next === null ? "Open the path again" : done.size > 0 ? `Carry on at session ${next}` : "Start session 1"}
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
          </Link>
        </div>
        <ol className="pv-trail" style={{ ["--rows" as string]: Math.ceil(track.sessions.length / 2) }}>
          {track.sessions.map((s) => (
            <li key={s.n}>
              <Link href={sessionHref(track.slug, s.n)} className={`pv-trail__stop${done.has(s.n) ? " is-done" : ""}`}>
                <span className="pv-trail__n" aria-hidden="true">
                  {done.has(s.n) ? <Check size={15} strokeWidth={2.25} /> : s.n}
                </span>
                <span className="pv-trail__t">
                  <span className="pv-trail__sr">Session {s.n}: </span>
                  {s.title}
                  {done.has(s.n) && <span className="pv-trail__sr"> (done)</span>}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
