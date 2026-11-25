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
 * - Listen (off by default, kept on this device) reads each frame aloud. It
 *   plays the frame's recorded file (lib/film-audio.ts: a computer-made voice,
 *   said so in one line under the control), asked for only once Listen is on
 *   and the frame is reached; nothing is fetched with the page. Where a file
 *   is missing or cannot be played, the device's own voice says that frame
 *   (lib/film-voice.ts). While it plays with Listen on, a frame waits for its
 *   words to finish before the next one comes (with a timeout in case the
 *   end never arrives). Pause holds the voice and Play goes on from where it
 *   stopped (the device's voice starts the frame again); Back, Next and the
 *   frame buttons stop it and say the new frame, and a playing film keeps
 *   playing; leaving the page, scrolling the player away or hiding the tab
 *   stops it. Where there is no sound at all, the film falls back to its
 *   timed captions and says so in one line. With Listen on, steps are not
 *   also announced to a screen reader, so no one hears two voices at once.
 *   Captions always stay on screen.
 * - Every caption is laid in the same grid cell, so the box is as tall as the
 *   longest one from the start and nothing below it moves while it plays.
 *   The box is drawn as a panel: before Play it holds the film's line and the
 *   names of its pictures in order; on a frame the caption sits at the top
 *   and the verse at the foot, so a short caption reads as designed.
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
  Volume2,
  VolumeX,
} from "lucide-react";
import { PlateSvg } from "@/components/art/PlateSvg";
import { VerseRef } from "@/components/VerseRef";
import { prefersReducedMotion } from "@/lib/motion";
import {
  canSpeak,
  pickVoice,
  readListen,
  speechTimeoutMs,
  spokenText,
  writeListen,
} from "@/lib/film-voice";
import { canPlayFiles, filmAudioUrl } from "@/lib/film-audio";
import type { FilmFrame, Level, Leveled, Link as LinkT } from "@/lib/explorer";
import { stageMotion, type FilmDrawing } from "./motion";
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

  // Listen. A frame's recorded file is played where the browser can play
  // it; where it cannot, or the file fails, the device's own voice says the
  // frame. `voiced` is true while frames are spoken.
  const [listen, setListen] = useState(readListen);
  const [filesOk] = useState(canPlayFiles);
  const [voiceOk] = useState(canSpeak);
  const [voiceFailed, setVoiceFailed] = useState(false);
  const voiceDown = useRef(false);
  const voiced = listen && (filesOk || (voiceOk && !voiceFailed));
  // Bumped whenever the voice is stopped, so a sentence that ends after the
  // reader has moved on cannot move the film.
  const run = useRef(0);
  // Held while it speaks: Chrome can drop an utterance nothing references and
  // never fire its end.
  const speaking = useRef<SpeechSynthesisUtterance | null>(null);
  // One audio element for the whole film (a phone lets an element that a tap
  // started play on by itself), the file it holds, and the next frame's file
  // fetched ahead while this one plays.
  const audio = useRef<HTMLAudioElement | null>(null);
  const held = useRef("");
  const ahead = useRef<HTMLAudioElement | null>(null);
  const missing = useRef(new Set<string>());
  // True when the next frame said must start from its first word (a step by
  // hand, Replay, Listen turned on); false lets a paused file go on.
  const fresh = useRef(true);
  const hush = useCallback(() => {
    run.current += 1;
    speaking.current = null;
    try {
      audio.current?.pause();
    } catch {
      /* nothing is playing */
    }
    if (!voiceOk) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* nothing is speaking */
    }
  }, [voiceOk]);

  /** Say frame k aloud; `done` runs once when it has been said (or the wait runs out). */
  const say = useCallback(
    (k: number, done?: () => void) => {
      hush();
      const mine = run.current;
      const restart = fresh.current;
      fresh.current = false;
      const text = spokenText(frames[k], level);
      let finished = false;
      let wait = 0;
      const finish = () => {
        if (finished || mine !== run.current) return;
        finished = true;
        window.clearTimeout(wait);
        speaking.current = null;
        done?.();
      };
      /** No sound for this frame: hold it as long as its caption takes to read. */
      const timed = () => {
        window.clearTimeout(wait);
        wait = window.setTimeout(finish, frameMs(frames[k][level]));
      };
      /** The device's own voice. */
      const speak = () => {
        window.clearTimeout(wait);
        if (!voiceOk || voiceDown.current) return timed();
        const fail = (later = false) => {
          voiceDown.current = true;
          // A throw happens during this render's work: say so after it.
          if (later) window.setTimeout(() => setVoiceFailed(true), 0);
          else setVoiceFailed(true);
          if (filesOk) return timed();
          window.clearTimeout(wait);
          hush();
        };
        wait = window.setTimeout(finish, speechTimeoutMs(text));
        try {
          const synth = window.speechSynthesis;
          const u = new SpeechSynthesisUtterance(text);
          u.lang = document.documentElement.lang || "en-US";
          const v = pickVoice(u.lang);
          if (v) u.voice = v;
          u.rate = 0.95;
          u.onend = finish;
          u.onerror = e => {
            if (mine !== run.current) return;
            // Our own stops interrupt the voice; anything else means this
            // device cannot read aloud here: fall back to the timed captions.
            if (e.error === "interrupted" || e.error === "canceled") return;
            fail();
          };
          speaking.current = u;
          if (synth.paused) synth.resume();
          synth.speak(u);
        } catch {
          fail(true);
        }
      };

      const url = filmAudioUrl(scene, level, k, frames[k].id);
      if (!filesOk || missing.current.has(url)) speak();
      else {
        // The frame's recorded file.
        const a = (audio.current ??= new window.Audio());
        let fell = false;
        const fallBack = () => {
          if (fell || finished || mine !== run.current) return;
          fell = true;
          missing.current.add(url);
          held.current = "";
          speak();
        };
        a.onended = finish;
        a.onerror = fallBack;
        a.onplaying = () => {
          // Fetch the next frame's file ahead, now that Listen is on.
          if (mine !== run.current || k + 1 >= frames.length) return;
          const next = filmAudioUrl(scene, level, k + 1, frames[k + 1].id);
          if (missing.current.has(next) || ahead.current?.dataset.url === next)
            return;
          const b = new window.Audio();
          b.preload = "auto";
          b.dataset.url = next;
          b.src = next;
          ahead.current = b;
        };
        // In case neither the end nor an error ever comes.
        wait = window.setTimeout(finish, speechTimeoutMs(text) * 2);
        const goOn =
          !restart &&
          held.current === url &&
          a.paused &&
          !a.ended &&
          a.currentTime > 0;
        if (!goOn) {
          held.current = url;
          a.preload = "auto";
          a.src = url;
        }
        try {
          const p = a.play() as Promise<void> | undefined;
          p?.catch?.((e: { name?: string }) => {
            // Our own stop interrupts a file that is still loading.
            if (e?.name !== "AbortError") fallBack();
          });
        } catch {
          fallBack();
        }
      }
      return () => window.clearTimeout(wait);
    },
    [frames, level, hush, scene, filesOk, voiceOk]
  );

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
  // With Listen on, the voice moves the film instead (below).
  useEffect(() => {
    if (!playing || still || i < 0 || voiced) return;
    const t = window.setTimeout(() => {
      if (i < n - 1) setI(i + 1);
      else setPlaying(false);
    }, frameMs(frames[i][level]));
    return () => window.clearTimeout(t);
  }, [playing, still, i, n, frames, level, voiced]);

  // Play with Listen on: say the frame, and when it has been said, a short
  // breath, then the next frame; the last one stops the film.
  useEffect(() => {
    if (!playing || still || i < 0 || !voiced) return;
    let breath = 0;
    const stopWait = say(i, () => {
      breath = window.setTimeout(() => {
        if (i < n - 1) setI(i + 1);
        else setPlaying(false);
      }, 700);
    });
    return () => {
      stopWait?.();
      window.clearTimeout(breath);
      hush();
    };
  }, [playing, still, i, n, voiced, say, hush]);

  // Leaving the page stops the voice.
  useEffect(() => {
    window.addEventListener("pagehide", hush);
    return () => {
      window.removeEventListener("pagehide", hush);
      hush();
    };
  }, [hush]);

  // Out of view, or the tab hidden: pause, and stop the voice.
  useEffect(() => {
    if (!playing && !voiced) return;
    const stop = () => {
      setPlaying(false);
      hush();
    };
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
  }, [playing, voiced, hush]);

  /**
   * A step by hand. Without Listen: pause, move, and announce the new caption.
   * With Listen: stop the voice and say the new frame (a playing film plays
   * on from it); the voice is the announcement, so nothing else is said.
   */
  const goTo = useCallback(
    (k: number) => {
      const to = Math.max(0, Math.min(n - 1, k));
      fresh.current = true;
      if (voiced) {
        setAnnounce("");
        setI(to);
        if (!playing) say(to);
        return;
      }
      setPlaying(false);
      setI(to);
      setAnnounce(
        `Picture ${to + 1} of ${n}: ${frames[to].name}. ${frames[to][level]}`
      );
    },
    [n, frames, level, voiced, playing, say]
  );

  const toggleListen = () => {
    const on = !listen;
    setListen(on);
    setVoiceFailed(false);
    voiceDown.current = false;
    fresh.current = true;
    writeListen(on);
    if (!on) hush();
    else if (!playing && i >= 0 && (filesOk || voiceOk)) say(i);
  };

  const play = () => {
    setAnnounce("");
    if (i < 0 || i >= n - 1) setI(0);
    setPlaying(true);
  };
  const pause = () => {
    setPlaying(false);
    hush();
  };
  const replay = () => {
    if (still) goTo(0);
    else {
      fresh.current = true;
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
          {...stageMotion(drawing, i, voiced ? 1 : 0.28)}
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
              <p className="fp-poster__kicker">A moving picture in {n} parts</p>
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

      <div className="fp-listen">
        <button
          type="button"
          className={`btn btn--quiet fp-listen__btn${listen ? " is-on" : ""}`}
          aria-pressed={listen}
          aria-describedby={`${uid}voice`}
          onClick={toggleListen}
        >
          {listen ? (
            <Volume2 size={18} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <VolumeX size={18} strokeWidth={1.75} aria-hidden="true" />
          )}
          Listen
          <span className="fp-listen__state" aria-hidden="true">
            {listen ? "On" : "Off"}
          </span>
        </button>
        <p className="fp-listen__note" id={`${uid}voice`} aria-live="polite">
          {listen && !filesOk && (!voiceOk || voiceFailed)
            ? "Sound is not available on this device, so the captions carry the words."
            : filesOk
              ? "Read aloud by a computer-made voice, not a person."
              : "Read aloud by your device's voice."}
        </p>
      </div>

      <p className="fp-hint" id={hintId}>
        {still
          ? "Motion is off on this device, so each picture appears finished. Step through with Next or the arrow keys."
          : "Press Play to watch, or step through by hand with Back and Next. The arrow keys work too."}
      </p>

      <div className="fp-captions">
        <div
          className={`fp-cap fp-cap--intro${i < 0 ? " is-on" : ""}`}
          aria-hidden={i < 0 ? undefined : true}
        >
          <p className="fp-cap__lede">{intro[level]}</p>
          <p className="fp-cap__name">In this moving picture</p>
          <ol className="fp-cap__list">
            {frames.map(f => (
              <li key={f.id}>{f.name}</li>
            ))}
          </ol>
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
