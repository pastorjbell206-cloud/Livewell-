/**
 * The Bible Explorer's moving maps, shared: a book page's map frame (BookMap's
 * FrameArt) cropped to one part of a route, its places marked by id from that
 * book page's own checked list, and the route drawn one straight leg at a time
 * as the reader steps with Back and Next (or the arrow keys on the map, or a
 * place's own button in the list). Paul's travels (the "mediterranean" frame,
 * Acts) and Abraham's road (the "fertile-crescent" frame, Genesis) are both
 * built from these parts, so each does exactly what the other does.
 *
 * Every line between two places is straight, dashed where the book says they
 * sailed and dotted otherwise: the book gives the order of the places, not the
 * roads, and each map's note says so. With reduced motion nothing draws
 * itself: each step shows its finished route.
 */
import {
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

import { RefText, VerseRef } from "@/components/VerseRef";
import { chapterHref } from "@/lib/bible";
import type { MapFrameId, MapPlace } from "@/lib/bible-notes";
import type { TravelStep, Trip } from "@/lib/explorer";
import { FrameArt, frameGeometry } from "@/pages/study-bible/BookMap";

export type Places = Map<string, MapPlace>;
/** A frame's size and projection (BookMap's frameGeometry), with its id. */
export type Frame = ReturnType<typeof frameGeometry> & { id: MapFrameId };

export const frameFor = (id: MapFrameId): Frame => ({
  ...frameGeometry(id),
  id,
});

/** The name a map draws for a place: its own, unless the map gives a shorter one. */
export type NameOf = (p: MapPlace) => string;
const ownName: NameOf = p => p.name;

export function TripChooser({
  trips,
  value,
  onChoose,
  legend = "Choose a trip",
}: {
  trips: Trip[];
  value: string;
  onChoose: (id: string) => void;
  legend?: string;
}) {
  const name = useId();
  return (
    <fieldset className="tv-trips">
      <legend className="ex-panel__title">{legend}</legend>
      <div className="tv-trips__options">
        {trips.map(t => (
          <label key={t.id} className="tv-trips__opt">
            <input
              type="radio"
              name={name}
              value={t.id}
              checked={value === t.id}
              onChange={() => onChoose(t.id)}
            />
            <span>
              <strong>{t.name}</strong>
              <small>{t.range}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// ── The drawing ─────────────────────────────────────────────────────────

export type Box = { x: number; y: number; w: number; h: number };

/** A view of the frame round these places, at the frame's own shape, kept inside it. */
export function boxFor(frame: Frame, list: MapPlace[]): Box {
  const xs = list.map(p => frame.x(p.lon));
  const ys = list.map(p => frame.y(p.lat));
  const aspect = frame.W / frame.H;
  let w = (Math.max(...xs) - Math.min(...xs)) * 1.35 + 40;
  let h = (Math.max(...ys) - Math.min(...ys)) * 1.35 + 40;
  if (w / h < aspect) w = h * aspect;
  else h = w / aspect;
  if (w >= frame.W || h >= frame.H)
    return { x: 0, y: 0, w: frame.W, h: frame.H };
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
  const x = Math.min(Math.max(cx - w / 2, 0), frame.W - w);
  const y = Math.min(Math.max(cy - h / 2, 0), frame.H - h);
  return { x, y, w, h };
}

/** Where a name sits: its anchor point and alignment, in the frame's units. */
export type NameAt = {
  x: number;
  y: number;
  anchor: "start" | "end" | "middle";
};
type Rect = { x: number; y: number; w: number; h: number };
/** A placed name; `room` is false where it could only sit on another mark or name. */
export type PlacedName = { at: NameAt; r: Rect; room: boolean };

/**
 * A name's size, in hundredths of the view's width: larger on a phone, where
 * the whole view is narrow. The CSS used to set this by a media query; it is
 * set here so the names can be placed for the size they are drawn at.
 */
export const nameSize = (wide: boolean) => (wide ? 2.2 : 3.1);

const WIDE_QUERY = "(min-width: 900px)";
function subscribeWide(cb: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(WIDE_QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}
const wideNow = () =>
  typeof window !== "undefined" && !!window.matchMedia
    ? window.matchMedia(WIDE_QUERY).matches
    : true;
export const useWide = () =>
  useSyncExternalStore(subscribeWide, wideNow, () => true);

/**
 * Places every name beside its mark where it covers no other mark, no other
 * name and as little of the route as it can, and stays inside the view.
 * Each name tries eight spots round its mark (right first, then left, the
 * corners, above and below); the names are placed in the order given and
 * then each is placed again against all the others, three times over. The
 * result depends only on the places, the view and the size, never on the
 * step, so no name moves while the reader steps.
 */
export function placeNames(
  frame: Frame,
  list: MapPlace[],
  box: Box,
  u: number,
  wide: boolean,
  routes: MapPlace[][],
  extra: { x: number; y: number; w: number; h: number }[] = [],
  nameOf: NameOf = ownName
): Map<string, PlacedName> {
  const fs = nameSize(wide) * u;
  type R = { x: number; y: number; w: number; h: number };
  const hit = (a: R, b: R) =>
    Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) *
    Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const pt = (p: MapPlace) => ({ x: frame.x(p.lon), y: frame.y(p.lat) });
  // Every mark is kept clear (the current one draws a ring of 3u).
  const marks: R[] = list.map(p => {
    const c = pt(p);
    return { x: c.x - 1.9 * u, y: c.y - 1.9 * u, w: 3.8 * u, h: 3.8 * u };
  });
  // The route, as points along every leg, a little more than a name's height apart.
  const dots: { x: number; y: number }[] = [];
  for (const r of routes)
    for (let i = 1; i < r.length; i++) {
      const a = pt(r[i - 1]);
      const b = pt(r[i]);
      const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / u));
      for (let k = 1; k < n; k++)
        dots.push({
          x: a.x + ((b.x - a.x) * k) / n,
          y: a.y + ((b.y - a.y) * k) / n,
        });
    }
  const spots = (p: MapPlace, w: number) => {
    const c = pt(p);
    const asc = 0.74 * fs; // from the baseline to the top of a capital
    const side = 2.1 * u;
    const diag = 1.5 * u;
    const vert = 2.4 * u;
    const all: [number, NameAt][] = [
      [0, { x: c.x + side, y: c.y + asc / 2, anchor: "start" }],
      [0.4, { x: c.x - side, y: c.y + asc / 2, anchor: "end" }],
      [0.7, { x: c.x + diag, y: c.y - diag, anchor: "start" }],
      [0.7, { x: c.x + diag, y: c.y + diag + asc, anchor: "start" }],
      [0.9, { x: c.x - diag, y: c.y - diag, anchor: "end" }],
      [0.9, { x: c.x - diag, y: c.y + diag + asc, anchor: "end" }],
      [1.1, { x: c.x, y: c.y - vert, anchor: "middle" }],
      [1.1, { x: c.x, y: c.y + vert + asc, anchor: "middle" }],
    ];
    return all.map(([cost, at]) => {
      const left =
        at.anchor === "start"
          ? at.x
          : at.anchor === "end"
            ? at.x - w
            : at.x - w / 2;
      return { cost, at, r: { x: left, y: at.y - asc, w, h: asc + 0.24 * fs } };
    });
  };
  const widths = list.map(
    // Inter at weight 500 to 700: a little under 0.6 of the size a letter.
    p => nameOf(p).length * fs * 0.6 + 0.3 * fs
  );
  const chosen: (R | null)[] = list.map(() => null);
  const out = new Map<string, PlacedName>();
  /** How far a name's box is from the centre of its own mark. */
  const ownGap = (i: number, r: R) => {
    const c = pt(list[i]);
    const dx = Math.max(r.x - c.x, 0, c.x - (r.x + r.w));
    const dy = Math.max(r.y - c.y, 0, c.y - (r.y + r.h));
    return Math.hypot(dx, dy);
  };
  const score = (i: number, r: R) => {
    let s = 0;
    const area = r.w * r.h;
    // Inside the view, with a little room at the edge.
    const inner = {
      x: box.x + u,
      y: box.y + u,
      w: box.w - 2 * u,
      h: box.h - 2 * u,
    };
    s += (60 * (area - hit(r, inner))) / area;
    marks.forEach((m, j) => {
      if (hit(r, m) > 0) s += j === i ? 40 : 30;
      // A name that sits nearer another place's mark than its own reads as
      // that place's name: keep it well clear of every other mark.
      else if (j !== i) {
        const cx = m.x + m.w / 2;
        const cy = m.y + m.h / 2;
        const dx = Math.max(r.x - cx, 0, cx - (r.x + r.w));
        const dy = Math.max(r.y - cy, 0, cy - (r.y + r.h));
        const near = (ownGap(i, r) + u - Math.hypot(dx, dy)) / u;
        if (near > 0) s += Math.min(10, 10 * near);
      }
    });
    chosen.forEach((o, j) => {
      if (o && j !== i) s += (80 * hit(r, o)) / area + (hit(r, o) > 0 ? 10 : 0);
    });
    for (const e of extra) if (hit(r, e) > 0) s += 12;
    for (const d of dots)
      if (d.x > r.x && d.x < r.x + r.w && d.y > r.y && d.y < r.y + r.h)
        s += 0.8;
    return s;
  };
  const clashes = (i: number, r: R) => {
    const inner = {
      x: box.x + u / 2,
      y: box.y + u / 2,
      w: box.w - u,
      h: box.h - u,
    };
    return (
      hit(r, inner) < r.w * r.h - 1e-6 ||
      // the mark itself, not the room kept round it
      marks.some(
        (m, j) =>
          j !== i &&
          hit(r, {
            x: m.x + 0.6 * u,
            y: m.y + 0.6 * u,
            w: m.w - 1.2 * u,
            h: m.h - 1.2 * u,
          }) > 0
      ) ||
      chosen.some((o, j) => o !== null && j !== i && hit(r, o) > 0) ||
      // or it would sit as near another place's mark as its own
      list.some((q, j) => {
        if (j === i) return false;
        const c = pt(q);
        const dx = Math.max(r.x - c.x, 0, c.x - (r.x + r.w));
        const dy = Math.max(r.y - c.y, 0, c.y - (r.y + r.h));
        return Math.hypot(dx, dy) < ownGap(i, r) + 0.3 * u;
      })
    );
  };
  for (let pass = 0; pass < 5; pass++) {
    // The last pass starts clean and goes in order, so an earlier place
    // keeps its name before a later one.
    if (pass === 4) chosen.fill(null);
    list.forEach((p, i) => {
      let best: { s: number; at: NameAt; r: R } | null = null;
      for (const c of spots(p, widths[i])) {
        // On the last pass a spot with room always beats one without.
        const s =
          c.cost + score(i, c.r) + (pass === 4 && clashes(i, c.r) ? 1000 : 0);
        if (!best || s < best.s) best = { s, at: c.at, r: c.r };
      }
      if (!best) return;
      // On the last pass a name with no room is left off (the list under the
      // map names every place), so it takes no room from the names after it.
      const room = pass < 4 || !clashes(i, best.r);
      chosen[i] = room ? best.r : null;
      out.set(p.id, { at: best.at, r: best.r, room });
    });
  }
  return out;
}

/**
 * Which names to draw: every name with room, and the place where the reader
 * is always, with any name its own would cover left off for that step.
 */
export function shownNames(names: Map<string, PlacedName>, here: string[]) {
  const hit = (a: Rect, b: Rect) =>
    a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
  const own = here.map(id => names.get(id)).filter((n): n is PlacedName => !!n);
  const show = new Set<string>();
  names.forEach((n, id) => {
    if (here.includes(id) || (n.room && !own.some(o => hit(o.r, n.r))))
      show.add(id);
  });
  return show;
}

/** The frame, cropped to a view, with the drawing's own marks on top. */
export function MapFigure({
  frame,
  box,
  label,
  children,
  caption,
  onKey,
}: {
  frame: Frame;
  box: Box;
  label: string;
  children: (u: number) => ReactNode;
  caption: ReactNode;
  onKey: (e: KeyboardEvent<HTMLDivElement>) => void;
}) {
  const hatch = `tv-h${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  // One "u" is a hundredth of the view's width: marks and lines are sized in
  // it, so they look the same on every trip however close the view is.
  const u = box.w / 100;
  return (
    <figure className="tv-fig">
      <div
        className="tv-fig__frame"
        tabIndex={0}
        onKeyDown={onKey}
        aria-label={`${label} Use the left and right arrow keys to step.`}
        role="group"
      >
        <svg
          viewBox={`${box.x.toFixed(1)} ${box.y.toFixed(1)} ${box.w.toFixed(1)} ${box.h.toFixed(1)}`}
          role="img"
          aria-label={label}
          preserveAspectRatio="xMidYMid slice"
          style={{
            ["--tv-u" as string]: String(u),
            aspectRatio: `${frame.W} / ${frame.H}`,
          }}
        >
          <g className="tv-frame">
            <FrameArt frameId={frame.id} hatch={hatch} />
          </g>
          {children(u)}
        </svg>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** A place's mark: faint before it is reached, ink once reached, mustard where the reader is. */
export function Mark({
  frame,
  p,
  u,
  state,
  onClick,
  named,
  at,
  size,
  name,
}: {
  frame: Frame;
  p: MapPlace;
  u: number;
  state: "ahead" | "past" | "here";
  onClick: () => void;
  named: boolean;
  at: NameAt | undefined;
  size: number;
  name: string;
}) {
  const cx = frame.x(p.lon);
  const cy = frame.y(p.lat);
  const s = (state === "here" ? 1.5 : 1.05) * u;
  return (
    <g
      className="tv-place"
      data-state={state}
      onClick={onClick}
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r={3.2 * u} fill="transparent" />
      {state === "here" && (
        <circle
          className="tv-ring"
          cx={cx}
          cy={cy}
          r={3 * u}
          style={{ strokeWidth: 0.45 * u }}
        />
      )}
      {/* A region the book page places roughly (Egypt, the land of
          Moriah): a dashed ring round its mark says it is not a point. */}
      {p.region && (
        <circle
          className="tv-region"
          cx={cx}
          cy={cy}
          r={2.2 * u}
          style={{
            strokeWidth: 0.25 * u,
            strokeDasharray: `${0.6 * u} ${0.5 * u}`,
          }}
        />
      )}
      <rect
        className={
          state === "here" ? "pl-m" : state === "past" ? "pl-k" : "pl-o"
        }
        x={cx - s}
        y={cy - s}
        width={2 * s}
        height={2 * s}
        style={{
          stroke: "var(--art-ink)",
          strokeWidth: (state === "here" ? 0.4 : 0.3) * u,
        }}
      />
      {named && at && (
        <text
          className="tv-name"
          x={at.x}
          y={at.y}
          textAnchor={at.anchor}
          style={{ fontSize: `${size * u}px` }}
        >
          {name}
        </text>
      )}
    </g>
  );
}

export const legPath = (frame: Frame, pts: MapPlace[]) =>
  pts
    .map((p, i) => `${i ? "L" : "M"}${frame.x(p.lon)},${frame.y(p.lat)}`)
    .join("");

export const legStyle = (by: TravelStep["by"], u: number, w: number) => ({
  strokeWidth: w * u,
  strokeDasharray:
    by === "sea" ? `${2.2 * u} ${1.3 * u}` : `${0.15 * u} ${1.1 * u}`,
});

/** "Acts 16:11-40" or "Genesis 12:6-7" to its chapter number. */
const chapterOf = (bookName: string, ref: string) => {
  const m = ref.match(new RegExp(`^${bookName} (\\d+)`));
  return m ? +m[1] : 1;
};

// ── One part of a route, stepped place by place ─────────────────────────

export function TripMap({
  frame,
  trip,
  places,
  note,
  book,
  nameOf = ownName,
  listLabel,
}: {
  frame: Frame;
  trip: Trip;
  places: Places;
  note: string;
  /** The book the steps are read in: its Study Bible slug and its name. */
  book: { slug: string; name: string };
  nameOf?: NameOf;
  /** The name of the numbered list of places (default: "The places on <the trip>"). */
  listLabel?: string;
}) {
  const [at, setAt] = useState(0);
  const steps = trip.steps;
  const step = steps[at];
  const place = places.get(step.place);
  const all = useMemo(
    () =>
      Array.from(new Set(steps.flatMap(s => [...(s.via ?? []), s.place])))
        .map(id => places.get(id))
        .filter((p): p is MapPlace => !!p),
    [steps, places]
  );
  const box = useMemo<Box>(
    () =>
      trip.whole ? { x: 0, y: 0, w: frame.W, h: frame.H } : boxFor(frame, all),
    [frame, all, trip.whole]
  );
  const maskId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const wide = useWide();
  const names = useMemo(() => {
    const route = steps
      .flatMap(s => [...(s.via ?? []), s.place])
      .map(id => places.get(id))
      .filter((p): p is MapPlace => !!p);
    return placeNames(frame, all, box, box.w / 100, wide, [route], [], nameOf);
  }, [frame, all, box, wide, steps, places, nameOf]);

  const legs = steps.map((s, i) => {
    if (i === 0) return null;
    const pts = [steps[i - 1].place, ...(s.via ?? []), s.place]
      .map(id => places.get(id))
      .filter((p): p is MapPlace => !!p);
    return { d: legPath(frame, pts), by: s.by };
  });
  const reached = new Set(
    steps.slice(0, at + 1).flatMap(s => [...(s.via ?? []), s.place])
  );
  const shown = shownNames(names, [step.place]);
  const chapter = chapterOf(book.name, step.ref);

  const go = (i: number) => setAt(Math.max(0, Math.min(steps.length - 1, i)));
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(at + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(at - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(steps.length - 1);
    }
  };

  return (
    <div className="tv-stage">
      <p className="tv-tripline">
        <strong>{trip.name}</strong> ({trip.range}). {trip.line}
      </p>
      <div className="tv-grid">
        <MapFigure
          frame={frame}
          box={box}
          label={`${trip.name}, step ${at + 1} of ${steps.length}: ${place?.name ?? ""}.`}
          caption={note}
          onKey={onKey}
        >
          {u => (
            <>
              <defs>
                {legs.map((l, i) =>
                  l ? (
                    <mask
                      key={i}
                      id={`${maskId}-${i}`}
                      maskUnits="userSpaceOnUse"
                      x={box.x}
                      y={box.y}
                      width={box.w}
                      height={box.h}
                    >
                      <path
                        d={l.d}
                        pathLength={1}
                        className={`tv-reveal${i <= at ? " is-on" : ""}`}
                        style={{ strokeWidth: 4 * u }}
                      />
                    </mask>
                  ) : null
                )}
              </defs>
              {legs.map((l, i) =>
                l ? (
                  <g key={i}>
                    <path
                      d={l.d}
                      className={`tv-leg tv-leg--ahead tv-leg--${l.by}`}
                      style={legStyle(l.by, u, 0.3)}
                    />
                    <path
                      d={l.d}
                      className={`tv-leg tv-leg--${l.by}`}
                      mask={`url(#${maskId}-${i})`}
                      style={legStyle(l.by, u, 0.5)}
                    />
                  </g>
                ) : null
              )}
              {all.map(p => (
                <Mark
                  key={p.id}
                  frame={frame}
                  p={p}
                  u={u}
                  state={
                    p.id === step.place
                      ? "here"
                      : reached.has(p.id)
                        ? "past"
                        : "ahead"
                  }
                  named={shown.has(p.id)}
                  at={names.get(p.id)?.at}
                  size={nameSize(wide)}
                  name={nameOf(p)}
                  onClick={() => {
                    const i = steps.findIndex(s => s.place === p.id);
                    if (i >= 0) go(i);
                  }}
                />
              ))}
            </>
          )}
        </MapFigure>

        <div className="tv-side">
          <div className="tv-card" aria-live="polite">
            <p className="tv-count">
              Step {at + 1} of {steps.length}
            </p>
            <h3>{step.name ?? place?.name}</h3>
            <p className="tv-text">
              <RefText text={step.text} />
            </p>
            <p className="tv-refs">
              <VerseRef reference={step.ref} />
              <Link href={chapterHref(book.slug, chapter)}>
                <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
                {`Read ${book.name} `}
                {chapter}
              </Link>
            </p>
          </div>
          <div className="tv-step">
            <button
              type="button"
              className="btn btn--quiet"
              onClick={() => go(at - 1)}
              disabled={at === 0}
            >
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
              Back
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => go(at + 1)}
              disabled={at === steps.length - 1}
            >
              Next
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <ol
            className="tv-list"
            aria-label={listLabel ?? `The places on ${trip.name.toLowerCase()}`}
          >
            {steps.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-current={i === at ? "step" : undefined}
                  data-past={i < at || undefined}
                  onClick={() => go(i)}
                >
                  <span className="tv-list__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  {s.name ?? places.get(s.place)?.name}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
