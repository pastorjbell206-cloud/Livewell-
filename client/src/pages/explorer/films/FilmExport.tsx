/**
 * A moving picture laid out as a video for sharing, at
 * /study/explorer/watch/<slug>?export=square|vertical|wide (with
 * &level=younger|older, and &cut=share for a film's shorter cut). Only
 * scripts/export-film-video.mjs opens this address: nothing links it, it is
 * not in the sitemap, and the page says noindex.
 *
 * It is the stage and the caption, with no site chrome, composed for the
 * shape: an opening card with the film's title in the engraved style, every
 * frame with its caption burned into the picture at a size a phone in a feed
 * can read (most people watch with the sound off, so the captions are the
 * soundtrack), and a closing card naming the site and the film's address.
 *
 * The script drives it frame by frame through window.__lwExport, so nothing
 * here keeps a timer: show(k) moves to a card or a frame (-1 the opening
 * card, 0 to n-1 the frames, n the closing card), and the film's own CSS
 * transitions carry the motion, which the script then steps through.
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PlateSvg } from "@/components/art/PlateSvg";
import { SEOMeta } from "@/components/SEOMeta";
import type { Film, Level } from "@/lib/explorer";
import { Roundel } from "../art";
import type { FilmDrawing } from "./motion";
import { FILM_SCENES } from "./scenes";
import "./film.css";
import "./film-export.css";

export type ExportShape = "square" | "vertical" | "wide";
export const EXPORT_SHAPES: ExportShape[] = ["square", "vertical", "wide"];

export interface ExportShot {
  /** The frame of the film this shot draws. */
  frame: number;
  id: string;
  name: string;
  text: string;
  verse?: { ref: string; text: string };
}

/** The shots a video shows: the whole film at a level, or its share cut. */
export function exportShots(
  film: Film,
  level: Level,
  cut: boolean
): ExportShot[] {
  if (cut && film.share) {
    return film.share.frames.flatMap(sf => {
      const k = film.frames.findIndex(f => f.id === sf.id);
      if (k < 0) return [];
      const f = film.frames[k];
      return [
        {
          frame: k,
          id: f.id,
          name: f.name,
          text: sf.text ?? f[film.share!.level],
          verse: sf.verse === false ? undefined : f.verse,
        },
      ];
    });
  }
  return film.frames.map((f, k) => ({
    frame: k,
    id: f.id,
    name: f.name,
    text: f[level],
    verse: f.verse,
  }));
}

declare global {
  interface Window {
    __lwExport?: {
      ready: boolean;
      slug: string;
      shape: ExportShape;
      shots: ExportShot[];
      /** Captions that still overflow their box at the smallest size allowed. */
      overflow: string[];
      show: (k: number) => void;
    };
  }
}

const SITE = "www.livewellbyjamesbell.co";

export default function FilmExport({
  film,
  shape,
  level,
  cut,
}: {
  film: Film;
  shape: ExportShape;
  level: Level;
  cut: boolean;
}) {
  const shots = useMemo(
    () => exportShots(film, level, cut),
    [film, level, cut]
  );
  const n = shots.length;
  const [drawing, setDrawing] = useState<FilmDrawing | null>(null);
  const [at, setAt] = useState(-1);
  const [fitted, setFitted] = useState(false);
  const capsRef = useRef<HTMLDivElement>(null);
  const overflow = useRef<string[]>([]);

  useEffect(() => {
    let live = true;
    FILM_SCENES[film.slug]?.()
      .then(m => live && setDrawing(m.default))
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [film.slug]);

  // Each caption is set as large as its box allows, from the shape's own
  // size down to no less than 72% of it, once the fonts are in.
  useLayoutEffect(() => {
    if (!drawing) return;
    let live = true;
    const fit = () => {
      const box = capsRef.current;
      if (!box || !live) return;
      overflow.current = [];
      box.querySelectorAll<HTMLElement>(".fx-cap").forEach(el => {
        let s = 1;
        el.style.setProperty("--fx-fit", "1");
        while (el.scrollHeight > box.clientHeight + 1 && s > 0.72) {
          s = Math.round((s - 0.02) * 100) / 100;
          el.style.setProperty("--fx-fit", String(s));
        }
        if (el.scrollHeight > box.clientHeight + 1)
          overflow.current.push(el.dataset.id ?? "?");
      });
      setFitted(true);
    };
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(fit, fit);
    else fit();
    return () => {
      live = false;
    };
  }, [drawing, shots]);

  useEffect(() => {
    window.__lwExport = {
      ready: Boolean(drawing) && fitted,
      slug: film.slug,
      shape,
      shots,
      overflow: overflow.current,
      show: k => setAt(Math.max(-1, Math.min(n, k))),
    };
  }, [drawing, fitted, film.slug, shape, shots, n]);

  const shot = at >= 0 && at < n ? shots[at] : undefined;
  // The opening card shows the film's poster drawing behind it; the closing
  // card keeps the last frame's.
  const frame = shot ? shot.frame : at < 0 ? -1 : shots[n - 1].frame;
  const address = `${SITE}/study/explorer/watch/${film.slug}`;
  const mark = film.mark === "road" ? (film.stops[0] ?? "creation") : film.mark;

  return (
    <main className={`fx fx--${shape}`} data-at={at}>
      <SEOMeta
        title={`${film.title}: video`}
        description={film.line.younger}
        noindex
      />
      <header className="fx-head">
        <span className="fx-head__site">LiveWell</span>
        <span className="fx-head__title">{film.title}</span>
      </header>

      <div className="fx-stage lw-frame">
        <div className="lw-frame__in fp-screen" data-frame={frame}>
          {drawing && (
            <PlateSvg
              drawing={{
                w: drawing.w,
                h: drawing.h,
                label: shot ? film.frames[shot.frame].still : film.poster,
                draw: h => drawing.draw(h, frame),
              }}
            />
          )}
        </div>
      </div>

      <div className="fx-caps" ref={capsRef}>
        {shots.map((s, k) => (
          <div
            key={s.id}
            data-id={s.id}
            className={`fx-cap${k === at ? " is-on" : ""}`}
            aria-hidden={k === at ? undefined : true}
          >
            <p className="fx-cap__name">
              <span className="fx-cap__n">
                {k + 1} of {n}
              </span>
              {s.name}
            </p>
            <p className="fx-cap__text">{s.text}</p>
            {s.verse && (
              <blockquote className="fx-cap__verse">
                <p>{s.verse.text}</p>
                <p className="fx-cap__ref">{s.verse.ref}</p>
              </blockquote>
            )}
          </div>
        ))}
      </div>

      <section
        className={`fx-card fx-card--open${at < 0 ? " is-on" : ""}`}
        aria-hidden={at < 0 ? undefined : true}
      >
        <Roundel slug={mark} className="fx-card__mark" />
        <p className="eyebrow fx-card__eyebrow">Bible Explorer</p>
        <h1 className="fx-card__title">{film.title}</h1>
        <p className="fx-card__line">{film.line.younger}</p>
      </section>

      <section
        className={`fx-card fx-card--close${at >= n ? " is-on" : ""}`}
        aria-hidden={at >= n ? undefined : true}
      >
        <Roundel slug={mark} className="fx-card__mark" />
        <p className="fx-card__site">LiveWell by James Bell</p>
        <p className="fx-card__url">{SITE}</p>
        <p className="fx-card__more">
          Watch it there, step through it, and read more:
        </p>
        <p className="fx-card__film">
          {SITE}
          <wbr />
          {address.slice(SITE.length)}
        </p>
      </section>
    </main>
  );
}
