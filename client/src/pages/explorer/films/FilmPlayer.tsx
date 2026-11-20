/**
 * The moving-picture player: one component for every film in "Watch and
 * learn" (client/public/explorer/films/<slug>.json, drawn by a scene in
 * ./scenes/). Its contract:
 *
 * - It never plays by itself. Before Play it shows the poster: the film's
 *   first drawing state with its title. Play runs the frames in order, about
 *   five to eight seconds each (longer for a longer caption), and stops on
 *   the last; it never loops.
 * - Pause holds the frame. Back, Next, the numbered frame buttons and the
 *   left and right arrow keys (while the player has focus) move by hand, and
 *   a step by hand pauses the film. Replay goes back to the first frame.
 * - The caption is always text under the picture, at the reader's level. A
 *   step by hand is announced politely; the frames Play moves through are
 *   not, so a screen reader is not talked over every few seconds.
 * - With reduced motion asked for, nothing moves and no timer runs: Play is
 *   not offered, every frame appears finished, and the reader steps with
 *   Next. Everything the motion shows is said in the caption.
 * - It pauses when it is scrolled out of view or the tab is hidden.
 * - Every caption is laid in the same grid cell, so the box is as tall as the
 *   longest one from the start and nothing below it moves while it plays.
 */
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { PlateSvg } from "@/components/art/PlateSvg";
import { VerseRef } from "@/components/VerseRef";
import { prefersReducedMotion } from "@/lib/motion";
import type { FilmFrame, Level, Leveled, Link as LinkT } from "@/lib/explorer";
import type { FilmDrawing } from "./motion";
import { FILM_SCENES } from "./scenes";
import "./film.css";

/** How long a frame stays on screen while playing: the motion, then time to read. */
export function frameMs(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.min(8000, Math.max(5000, 2200 + words * 240));
}

function useReducedMotion() {
  const [still, setStill] = useState(prefersReducedMotion);
  useEffect(() => {
    let mq: MediaQueryList | null = null;
    try {
      mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    } catch {
      return;
    }
    const on = () => setStill(mq!.matches);
    mq.addEventListener?.("change", on);
    return () => mq?.removeEventListener?.("change", on);
  }, []);
  return still;
}

export default function FilmPlayer({
  scene,
  title,
  poster,
  intro,
  frames,
  level,
  end,
}: {
  /** The scene's name in ./scenes (the film's slug). */
  scene: string;
  title: string;
  /** What the poster drawing shows, for a screen reader. */
  poster: string;
  /** The film's one line, shown under the poster. */
  intro: Leveled;
  frames: FilmFrame[];
  level: Level;
  /** Where the last frame sends the reader. */
  end?: LinkT;
}) {
  const n = frames.length;
  const still = useReducedMotion();
  const [drawing, setDrawing] = useState<FilmDrawing | null>(null);
  const [i, setI] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [announce, setAnnounce] = useState("");
  const root = useRef<HTMLElement>(null);
  const uid = useId();
  const hintId = `${uid}hint`;

  useEffect(() => {
    let live = true;
    FILM_SCENES[scene]?.()
      .then(m => live && setDrawing(m.default))
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [scene]);

  // Play: one timer for the frame on screen; the last frame stops the film.
  useEffect(() => {
    if (!playing || still || i < 0) return;
    const t = window.setTimeout(() => {
      if (i < n - 1) setI(i + 1);
      else setPlaying(false);
    }, frameMs(frames[i][level]));
    return () => window.clearTimeout(t);
  }, [playing, still, i, n, frames, level]);

  // Out of view, or the tab hidden: pause.
  useEffect(() => {
    if (!playing) return;
    const stop = () => setPlaying(false);
    const onVis = () => document.hidden && stop();
    document.addEventListener("visibilitychange", onVis);
    let io: IntersectionObserver | null = null;
    if (root.current && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        es => es.forEach(e => !e.isIntersecting && stop()),
        { threshold: 0.25 }
      );
      io.observe(root.current);
    }
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, [playing]);

  /** A step by hand: pause, move, and say the new caption. */
  const goTo = useCallback(
    (k: number) => {
      const to = Math.max(0, Math.min(n - 1, k));
      setPlaying(false);
      setI(to);
      setAnnounce(
        `Picture ${to + 1} of ${n}: ${frames[to].name}. ${frames[to][level]}`
      );
    },
    [n, frames, level]
  );

  const play = () => {
    setAnnounce("");
    if (i < 0 || i >= n - 1) setI(0);
    setPlaying(true);
  };
  const pause = () => setPlaying(false);
  const replay = () => {
    if (still) goTo(0);
    else {
      setAnnounce("");
      setI(0);
      setPlaying(true);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(i + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (i > 0) goTo(i - 1);
    }
  };

  const atEnd = i === n - 1;
  const label = i < 0 ? poster : frames[i].still;
  const cols = n > 6 ? Math.ceil(n / 2) : n;

  return (
    <section
      ref={root}
      className={`fp${playing ? " is-playing" : ""}`}
      aria-label={`Moving picture: ${title}`}
      aria-describedby={hintId}
      tabIndex={-1}
      onKeyDown={onKey}
    >
      <div className="lw-frame fp-frame">
        <div
          className={`lw-frame__in fp-screen${still ? " is-still" : ""}${i < 0 ? " is-poster" : ""}`}
          data-frame={i}
          tabIndex={0}
          aria-describedby={hintId}
        >
          {drawing && (
            <PlateSvg
              drawing={{
                w: drawing.w,
                h: drawing.h,
                label,
                draw: h => drawing.draw(h, i),
              }}
            />
          )}
          {i < 0 && (
            <div className="fp-poster">
              <p className="fp-poster__kicker">
                A moving picture in {n} parts
              </p>
              <p className="fp-poster__title">{title}</p>
            </div>
          )}
          {i < 0 && !still && (
            <span className="fp-poster__disc" aria-hidden="true" onClick={play}>
              <Play size={30} strokeWidth={1.75} />
            </span>
          )}
        </div>
      </div>

      <div className="fp-progress" aria-hidden="true">
        <span
          className="fp-progress__fill"
          style={{ transform: `scaleX(${(i + 1) / n})` }}
        />
      </div>

      <div className="fp-bar">
        <div className="fp-bar__main">
          {!still &&
            (playing ? (
              <button type="button" className="btn fp-play" onClick={pause}>
                <Pause size={18} strokeWidth={1.75} aria-hidden="true" />
                Pause
              </button>
            ) : (
              <button type="button" className="btn fp-play" onClick={play}>
                <Play size={18} strokeWidth={1.75} aria-hidden="true" />
                {atEnd ? "Play again" : i < 0 ? "Play" : "Play on"}
              </button>
            ))}
          <button
            type="button"
            className="btn btn--quiet fp-step"
            onClick={() => goTo(i - 1)}
            disabled={i <= 0}
          >
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            Back
          </button>
          <button
            type="button"
            className={`btn fp-step${still ? "" : " btn--quiet"}`}
            onClick={() => goTo(i + 1)}
            disabled={atEnd}
          >
            {i < 0 && still ? "Start" : "Next"}
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn--quiet fp-step fp-step--icon"
            onClick={replay}
            disabled={i < 0}
            aria-label="Replay from the first picture"
            title="Replay from the first picture"
          >
            <RotateCcw size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <ol
          className="fp-dots"
          aria-label="Pictures"
          style={{ ["--fp-cols" as string]: cols }}
        >
          {frames.map((f, k) => (
            <li key={f.id}>
              <button
                type="button"
                className={`fp-dot${k < i ? " is-seen" : ""}`}
                aria-current={k === i ? "step" : undefined}
                aria-label={`Picture ${k + 1}: ${f.name}`}
                onClick={() => goTo(k)}
              >
                {k + 1}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <p className="fp-hint" id={hintId}>
        {still
          ? "Motion is off on this device, so each picture appears finished. Step through with Next or the arrow keys."
          : "Press Play to watch, or step through by hand with Back and Next. The arrow keys work too."}
      </p>

      <div className="fp-captions">
        <div
          className={`fp-cap${i < 0 ? " is-on" : ""}`}
          aria-hidden={i < 0 ? undefined : true}
        >
          <p className="fp-cap__text">{intro[level]}</p>
        </div>
        {frames.map((f, k) => (
          <div
            key={f.id}
            className={`fp-cap${k === i ? " is-on" : ""}`}
            aria-hidden={k === i ? undefined : true}
          >
            <p className="fp-cap__name">
              <span className="fp-cap__n">
                {k + 1} of {n}
              </span>{" "}
              {f.name}
            </p>
            <p className="fp-cap__text">{f[level]}</p>
            {f.verse && (
              <blockquote className="fp-cap__verse">
                <p>{f.verse.text}</p>
                <p className="fp-cap__ref">
                  <VerseRef reference={f.verse.ref} />
                </p>
              </blockquote>
            )}
            {k === n - 1 && end && (
              <p className="fp-cap__end">
                <Link href={end.href} className="btn--text">
                  {end.label}
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="sr-only" aria-live="polite" data-testid="fp-live">
        {announce}
      </p>
    </section>
  );
}
