/**
 * The film reel on /preview/home: the Bible Explorer's finished films by
 * their own groups (client/public/explorer/index.json). One group at a time,
 * opening on the books of the Bible: its first film large, the rest as a
 * list beside it. Every title, line and link is the Explorer's own; nothing
 * is written here. The large film plays in place, in the Explorer's own
 * player (films/FilmPlayer, used as it is, as the family devotions use it);
 * the player and the film's data are fetched only when Play is pressed, and
 * it never starts by itself. Loaded as its own chunk when the reel nears the
 * screen (the roundels' drawings are large).
 */
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Play, X } from "lucide-react";
import { fetchExplorerIndex, fetchFilm, filmHref, type Film, type FilmSummary } from "@/lib/explorer";
import { useLoad } from "../study-bible/shared";
import { FilmMark } from "../explorer/Watch";

const FilmPlayer = lazy(() => import("../explorer/films/FilmPlayer"));

/** The film playing in place: fetched when asked for, closed back to the reel. */
function Screening({ slug, title, onClose }: { slug: string; title: string; onClose: () => void }) {
  const { data, retry } = useLoad<Film>(`preview-film-${slug}`, () => fetchFilm(slug));
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    panel.current?.focus?.({ preventScroll: true });
  }, []);
  const loading = (
    <p role="status" className="pv-screening__status">
      Loading the film…
    </p>
  );
  return (
    <div ref={panel} tabIndex={-1} className="pv-screening" role="group" aria-label={`Now showing: ${title}`}>
      <div className="pv-screening__bar">
        <span className="pv-screening__now">Now showing</span>
        <button type="button" className="pv-screening__close" onClick={onClose}>
          <X aria-hidden="true" size={18} strokeWidth={1.75} /> Back to the films
        </button>
      </div>
      {data === undefined && loading}
      {data === null && (
        <p className="home-failed">
          This film did not load.
          <button type="button" onClick={retry}>
            Try again
          </button>
        </p>
      )}
      {data && (
        <Suspense fallback={loading}>
          <FilmPlayer scene={data.slug} title={data.title} poster={data.poster} intro={data.line} frames={data.frames} level="older" />
        </Suspense>
      )}
      <Link href={filmHref(slug)} className="pv-screening__own">
        Open this film on its own page
      </Link>
    </div>
  );
}

const line = (f: FilmSummary) => f.line?.older ?? f.line?.younger ?? "";

export default function PreviewFilms({ start = "books" }: { start?: string } = {}) {
  const { data, retry } = useLoad("preview-films", fetchExplorerIndex);
  const [group, setGroup] = useState<string>(start);
  const [showing, setShowing] = useState<string | null>(null);

  if (data === null)
    return (
      <p className="home-failed">
        The films did not load.
        <button type="button" onClick={retry}>
          Try again
        </button>
      </p>
    );
  if (!data) return null;

  const finished = (data.films ?? []).filter((f) => f.status === "finished");
  const groups = (data.filmGroups ?? []).filter((g) => finished.some((f) => f.group === g.id));
  const current = groups.find((g) => g.id === group) ?? groups[0];
  if (!current) return null;
  const films = finished.filter((f) => f.group === current.id);
  const [lead, ...rest] = films;

  return (
    <div className="pv-reel">
      <div className="pv-reel__tabs" role="group" aria-label="Film groups">
        {groups.map((g) => (
          <button key={g.id} type="button" className="home-chip" aria-pressed={g.id === current.id} onClick={() => {
              setGroup(g.id);
              setShowing(null);
            }}>
            {g.name}
            <span className="pv-reel__n">{finished.filter((f) => f.group === g.id).length}</span>
          </button>
        ))}
      </div>
      <p className="pv-reel__about">{current.line}</p>
      {showing && <Screening slug={showing} title={films.find((f) => f.slug === showing)?.title ?? ""} onClose={() => setShowing(null)} />}
      <div className="pv-reel__body" hidden={!!showing}>
        <div className="pv-reel__lead">
          <button type="button" className="pv-reel__screen" onClick={() => setShowing(lead.slug)} aria-label={`Play ${lead.title} here`}>
            <FilmMark mark={lead.mark} className="lw-roundel" />
            <span className="pv-reel__play" aria-hidden="true">
              <Play size={22} strokeWidth={1.75} />
            </span>
          </button>
          <Link href={filmHref(lead.slug)} className="pv-reel__title">
            {lead.title}
          </Link>
          <span className="pv-reel__line">{line(lead)}</span>
        </div>
        {rest.length > 0 && (
          <ul className="pv-reel__list">
            {rest.slice(0, 6).map((f) => (
              <li key={f.slug}>
                <Link href={filmHref(f.slug)} className="pv-reel__row">
                  <span className="pv-reel__mark">
                    <FilmMark mark={f.mark} className="lw-roundel" />
                  </span>
                  <span>
                    <span className="pv-reel__rtitle">{f.title}</span>
                    <span className="pv-reel__rline">{line(f)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link href="/study/films" className="home-tlink pv-reel__all">
        All {finished.length} films <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
      </Link>
    </div>
  );
}
