/**
 * "Watch first (about 2 minutes)": the Bible Explorer film that matches a
 * family devotion or a catechism question, opened where the family already
 * is. The film plays here, at the younger level, in the Explorer's own player
 * (pages/explorer/films/FilmPlayer, used as it is); "Back to the devotion"
 * closes it and puts the reader back at the button, so nobody is sent to
 * another page and has to find the way home. The player and the film's data
 * are fetched only when the button is pressed.
 *
 * Which film is data: client/public/family/films.json (lib/familyFilms).
 */
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { LifeBuoy, Play } from "lucide-react";
import LoadFailed from "@/components/LoadFailed";
import { fetchFilm, filmHref, type Film } from "@/lib/explorer";
import { aboutMinutes, type FamilyFilm } from "@/lib/familyFilms";

const FilmPlayer = lazy(() => import("../explorer/films/FilmPlayer"));

type Loaded = { status: "loading" } | { status: "failed" } | { status: "ready"; film: Film };

export default function WatchFirst({
  film,
  backLabel = "Back to the devotion",
  startOpen = false,
}: {
  film: FamilyFilm;
  /** What closing the film goes back to. */
  backLabel?: string;
  /** Open as the page arrives (a link that asked for the film: ?watch=1). */
  startOpen?: boolean;
}) {
  const [open, setOpen] = useState(startOpen);
  const [nonce, setNonce] = useState(0);
  const [state, setState] = useState<{ key: string; value: Loaded }>({ key: "", value: { status: "loading" } });
  const key = `${film.slug}#${nonce}`;
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closed = useRef(false);

  useEffect(() => {
    if (!open) return;
    let live = true;
    fetchFilm(film.slug)
      .then((value) => live && setState({ key, value: { status: "ready", film: value } }))
      .catch(() => live && setState({ key, value: { status: "failed" } }));
    return () => {
      live = false;
    };
  }, [open, film.slug, key]);

  // Closing puts the reader back on the button; opening moves to the film.
  useEffect(() => {
    if (open) panel.current?.focus?.({ preventScroll: true });
    else if (closed.current) button.current?.focus?.();
  }, [open]);

  const loaded: Loaded = state.key === key ? state.value : { status: "loading" };
  const close = () => {
    closed.current = true;
    setOpen(false);
  };

  return (
    <div className="tb-watch no-print">
      {!open && (
        <>
          <button ref={button} type="button" className="btn btn--quiet tb-watch__open" onClick={() => setOpen(true)}>
            <Play aria-hidden="true" size={16} strokeWidth={1.75} />
            Watch first ({aboutMinutes(film.minutes)})
          </button>
          <p className="tb-watch__line">A short film from Bible Explorer: {film.title}</p>
        </>
      )}
      {open && (
        <div ref={panel} tabIndex={-1} className="tb-watch__panel" role="group" aria-label={`Watch first: ${film.title}`}>
          <p className="tb-label">Watch first · {film.title}</p>
          {loaded.status === "failed" && <LoadFailed what="This film" onRetry={() => setNonce((n) => n + 1)} />}
          {loaded.status === "loading" && (
            <p role="status" className="tb-watch__line">
              Loading the film…
            </p>
          )}
          {loaded.status === "ready" && (
            <Suspense
              fallback={
                <p role="status" className="tb-watch__line">
                  Loading the film…
                </p>
              }
            >
              <FilmPlayer scene={loaded.film.slug} title={loaded.film.title} poster={loaded.film.poster} intro={loaded.film.line} frames={loaded.film.frames} level="younger" />
            </Suspense>
          )}
          {loaded.status === "ready" && loaded.film.care && <CareLine text={loaded.film.care} />}
          <div className="tb-watch__after">
            <button type="button" className="btn" onClick={close}>
              {backLabel}
            </button>
            <Link href={filmHref(film.slug)} className="tb-link">
              Open this film on its own page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const FIND_HELP = / or look at Find Help\.$/;

/** The film's own care line, whole, with Find Help a link where the line names it (as the film's page shows it). */
function CareLine({ text }: { text: string }) {
  const names = FIND_HELP.test(text);
  return (
    <p className="tb-watch__care">
      <LifeBuoy size={18} strokeWidth={1.75} aria-hidden="true" />
      <span>
        {names ? text.replace(FIND_HELP, " or look at ") : text}
        {names && (
          <>
            <Link href="/help" className="tb-watch__help">
              Find Help
            </Link>
            .
          </>
        )}
      </span>
    </p>
  );
}

/** The film's address, for the printed card only: one short line. */
export function WatchFirstPrintLine({ film }: { film: FamilyFilm }) {
  return (
    <p className="tb-watch__print" aria-hidden="true">
      Watch first, {aboutMinutes(film.minutes)}: livewellbyjamesbell.co{filmHref(film.slug)}
    </p>
  );
}
