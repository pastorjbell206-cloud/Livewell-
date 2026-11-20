/**
 * /study/explorer/pauls-travels: Paul's travels, the Bible Explorer's moving
 * map, on the "mediterranean" frame the Acts book page draws (BookMap's
 * FrameArt), with the places that page has already checked
 * (client/public/bible/notes/acts/intro.json, by id). The trips and the
 * churches are data: client/public/explorer/travels.json.
 *
 * Two views. "The trips": choose one of four (radio buttons); the route
 * draws itself one leg at a time as the reader steps with Back and Next (or
 * the arrow keys on the map, or a stop's own button in the list); the card
 * names the place, says in a sentence or two what happened there with its
 * Acts reference (the verse panel), and links that chapter of the Study
 * Bible. "Churches and letters": the churches Acts names in these years,
 * appearing in order, with the letters written to them.
 *
 * Every line between two places is straight, dashed where Acts says they
 * sailed and dotted otherwise: Acts gives the order of the places, not the
 * roads, and the note under the map says so. With reduced motion nothing
 * draws itself: each step shows its finished route.
 */
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Mail, MapPin } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { LoadFailed } from "@/components/LoadFailed";
import { RefText, VerseRef } from "@/components/VerseRef";
import { chapterHref } from "@/lib/bible";
import { bookMaps, fetchIntro, type MapPlace } from "@/lib/bible-notes";
import {
  EXPLORER_PATH,
  fetchTravels,
  stopHref,
  type TravelChurch,
  type TravelStep,
  type Travels,
  type Trip,
} from "@/lib/explorer";
import { FrameArt, frameGeometry } from "@/pages/study-bible/BookMap";
import { Roundel } from "./art";
import "./explorer.css";

type Places = Map<string, MapPlace>;
type Loaded = { travels: Travels; places: Places };
type View = "trips" | "churches";

const FRAME = frameGeometry("mediterranean");

/** The Acts book page's places by id: the Mediterranean map first, then the land map (Tyre, Sidon). */
function placesFrom(map: Parameters<typeof bookMaps>[0]): Places {
  const out: Places = new Map();
  const maps = bookMaps(map);
  for (const m of [...maps].sort(a => (a.frame === "mediterranean" ? -1 : 1)))
    for (const p of m.places) if (!out.has(p.id)) out.set(p.id, p);
  return out;
}

function useTravels() {
  const [res, setRes] = useState<{ n: number; data: Loaded | null } | null>(
    null
  );
  const [n, setN] = useState(0);
  useEffect(() => {
    let live = true;
    Promise.all([fetchTravels(), fetchIntro("acts")])
      .then(
        ([travels, intro]) =>
          live &&
          setRes({
            n,
            data: { travels, places: placesFrom(intro.teaching?.map ?? []) },
          })
      )
      .catch(() => live && setRes({ n, data: null }));
    return () => {
      live = false;
    };
  }, [n]);
  const data = res?.n === n ? res.data : undefined;
  return { data, retry: useCallback(() => setN(x => x + 1), []) };
}

/** What the address asks for (?view=churches, ?trip=second), if anything. */
function askFromUrl(): { view: View; trip: string | null } {
  try {
    const q = new URLSearchParams(window.location.search);
    return {
      view: q.get("view") === "churches" ? "churches" : "trips",
      trip: q.get("trip"),
    };
  } catch {
    return { view: "trips", trip: null };
  }
}

function setUrl(view: View, trip: string) {
  try {
    const url = new URL(window.location.href);
    if (view === "churches") {
      url.searchParams.set("view", "churches");
      url.searchParams.delete("trip");
    } else {
      url.searchParams.delete("view");
      if (trip === "first") url.searchParams.delete("trip");
      else url.searchParams.set("trip", trip);
    }
    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash
    );
  } catch {
    /* the address stays as it was; the map still changes */
  }
}

/** "Acts 16:11-40" to the Study Bible's Acts 16. */
function actsChapter(ref: string): number {
  const m = ref.match(/Acts (\d+)/);
  return m ? +m[1] : 1;
}

export default function ExplorerTravels() {
  const { data, retry } = useTravels();
  return (
    <Layout>
      <SEOMeta
        title="Paul's travels: Bible Explorer"
        description="Paul's travels in Acts on a map that draws itself, stop by stop: the first, second and third trips and the voyage to Rome, then the churches begun and the letters written to them."
        url="https://www.livewellbyjamesbell.co/study/explorer/pauls-travels"
      />
      <PageHead
        door="Bible Explorer"
        doorHref={EXPLORER_PATH}
        title="Paul's travels"
        line="Follow Paul across the map of Acts, one place at a time, and see the churches begun and the letters written to them."
        art={<Roundel slug="church" className="ex-headmark" />}
      />
      {data === null ? (
        <div style={{ padding: "var(--s-6) var(--gutter)" }}>
          <LoadFailed
            what="The map of Paul's travels"
            onRetry={retry}
            backHref={EXPLORER_PATH}
            backLabel="Back to the Bible Explorer"
          />
        </div>
      ) : data === undefined ? (
        <div
          className="ex-sec ex-sec--warm"
          data-lw-loading
          aria-busy="true"
          style={{ minHeight: "80vh" }}
        >
          <p className="ex-note" style={{ textAlign: "center" }}>
            Opening the map…
          </p>
        </div>
      ) : (
        <TravelsPage {...data} />
      )}
      <nav className="ex-sec" aria-label="More in the Bible Explorer">
        <div className="ex-wrap ex-nav">
          <Link href={stopHref("church")} className="btn btn--quiet">
            <ArrowLeft
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              style={{ marginRight: 8 }}
            />
            Stop 12: The Church and the Spirit
          </Link>
          <Link href={EXPLORER_PATH} className="btn">
            The whole map
            <ArrowRight
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              style={{ marginLeft: 8 }}
            />
          </Link>
        </div>
      </nav>
    </Layout>
  );
}

function TravelsPage({ travels, places }: Loaded) {
  const [ask] = useState(askFromUrl);
  const [view, setView] = useState<View>(ask.view);
  const [tripId, setTripId] = useState<string>(
    travels.trips.some(t => t.id === ask.trip) ? ask.trip! : travels.trips[0].id
  );
  const trip = travels.trips.find(t => t.id === tripId) ?? travels.trips[0];

  const choose = (v: View, t = tripId) => {
    setView(v);
    setTripId(t);
    setUrl(v, t);
  };

  return (
    <>
      <section className="ex-sec ex-sec--warm" aria-labelledby="tv-title">
        <div className="ex-wrap">
          <h2 className="ex-h2" id="tv-title">
            Where Paul went
          </h2>
          <p className="ex-lede">{travels.intro}</p>
          <div
            className="tv-views"
            role="group"
            aria-label="What the map shows"
          >
            <button
              type="button"
              aria-pressed={view === "trips"}
              onClick={() => choose("trips")}
            >
              <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
              The trips
            </button>
            <button
              type="button"
              aria-pressed={view === "churches"}
              onClick={() => choose("churches")}
            >
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              Churches and letters
            </button>
          </div>
          {view === "trips" ? (
            <>
              <TripChooser
                trips={travels.trips}
                value={trip.id}
                onChoose={id => choose("trips", id)}
              />
              <TripMap
                key={trip.id}
                trip={trip}
                places={places}
                note={travels.routeNote}
              />
            </>
          ) : (
            <ChurchMap
              churches={travels.churches}
              places={places}
              intro={travels.churchesIntro}
              note={travels.churchesNote}
            />
          )}
        </div>
      </section>
    </>
  );
}

function TripChooser({
  trips,
  value,
  onChoose,
}: {
  trips: Trip[];
  value: string;
  onChoose: (id: string) => void;
}) {
  const name = useId();
  return (
    <fieldset className="tv-trips">
      <legend className="ex-panel__title">Choose a trip</legend>
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

type Box = { x: number; y: number; w: number; h: number };

/** A view of the frame round these places, at the frame's own shape, kept inside it. */
function boxFor(list: MapPlace[]): Box {
  const xs = list.map(p => FRAME.x(p.lon));
  const ys = list.map(p => FRAME.y(p.lat));
  const aspect = FRAME.W / FRAME.H;
  let w = (Math.max(...xs) - Math.min(...xs)) * 1.35 + 40;
  let h = (Math.max(...ys) - Math.min(...ys)) * 1.35 + 40;
  if (w / h < aspect) w = h * aspect;
  else h = w / aspect;
  if (w >= FRAME.W || h >= FRAME.H)
    return { x: 0, y: 0, w: FRAME.W, h: FRAME.H };
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
  const x = Math.min(Math.max(cx - w / 2, 0), FRAME.W - w);
  const y = Math.min(Math.max(cy - h / 2, 0), FRAME.H - h);
  return { x, y, w, h };
}

/** Where a name sits: its anchor point and alignment, in the frame's units. */
type NameAt = { x: number; y: number; anchor: "start" | "end" | "middle" };
type Rect = { x: number; y: number; w: number; h: number };
/** A placed name; `room` is false where it could only sit on another mark or name. */
type PlacedName = { at: NameAt; r: Rect; room: boolean };

/**
 * A name's size, in hundredths of the view's width: larger on a phone, where
 * the whole view is narrow. The CSS used to set this by a media query; it is
 * set here so the names can be placed for the size they are drawn at.
 */
const nameSize = (wide: boolean) => (wide ? 2.2 : 3.1);

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
const useWide = () => useSyncExternalStore(subscribeWide, wideNow, () => true);

/**
 * Places every name beside its mark where it covers no other mark, no other
 * name and as little of the route as it can, and stays inside the view.
 * Each name tries eight spots round its mark (right first, then left, the
 * corners, above and below); the names are placed in the order given and
 * then each is placed again against all the others, three times over. The
 * result depends only on the places, the view and the size, never on the
 * step, so no name moves while the reader steps.
 */
function placeNames(
  list: MapPlace[],
  box: Box,
  u: number,
  wide: boolean,
  routes: MapPlace[][],
  extra: { x: number; y: number; w: number; h: number }[] = []
): Map<string, PlacedName> {
  const fs = nameSize(wide) * u;
  type R = { x: number; y: number; w: number; h: number };
  const hit = (a: R, b: R) =>
    Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) *
    Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const pt = (p: MapPlace) => ({ x: FRAME.x(p.lon), y: FRAME.y(p.lat) });
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
    p => shortName(p).length * fs * 0.6 + 0.3 * fs
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
function shownNames(names: Map<string, PlacedName>, here: string[]) {
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

const shortName = (p: MapPlace) =>
  p.id === "fair-havens"
    ? "Fair Havens"
    : p.id === "antioch"
      ? "Antioch"
      : p.name;

/** The frame, cropped to a view, with the drawing's own marks on top. */
function MapFigure({
  box,
  label,
  children,
  caption,
  onKey,
}: {
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
          style={{ ["--tv-u" as string]: String(u) }}
        >
          <g className="tv-frame">
            <FrameArt frameId="mediterranean" hatch={hatch} />
          </g>
          {children(u)}
        </svg>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** A place's mark: faint before it is reached, ink once reached, mustard where the reader is. */
function Mark({
  p,
  u,
  state,
  onClick,
  named,
  at,
  size,
}: {
  p: MapPlace;
  u: number;
  state: "ahead" | "past" | "here";
  onClick: () => void;
  named: boolean;
  at: NameAt | undefined;
  size: number;
}) {
  const cx = FRAME.x(p.lon);
  const cy = FRAME.y(p.lat);
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
          {shortName(p)}
        </text>
      )}
    </g>
  );
}

const legPath = (pts: MapPlace[]) =>
  pts
    .map((p, i) => `${i ? "L" : "M"}${FRAME.x(p.lon)},${FRAME.y(p.lat)}`)
    .join("");

// ── The trips ───────────────────────────────────────────────────────────

function TripMap({
  trip,
  places,
  note,
}: {
  trip: Trip;
  places: Places;
  note: string;
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
  const box = useMemo(() => boxFor(all), [all]);
  const maskId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const wide = useWide();
  const names = useMemo(() => {
    const route = steps
      .flatMap(s => [...(s.via ?? []), s.place])
      .map(id => places.get(id))
      .filter((p): p is MapPlace => !!p);
    return placeNames(all, box, box.w / 100, wide, [route]);
  }, [all, box, wide, steps, places]);

  const legs = steps.map((s, i) => {
    if (i === 0) return null;
    const pts = [steps[i - 1].place, ...(s.via ?? []), s.place]
      .map(id => places.get(id))
      .filter((p): p is MapPlace => !!p);
    return { d: legPath(pts), by: s.by };
  });
  const reached = new Set(
    steps.slice(0, at + 1).flatMap(s => [...(s.via ?? []), s.place])
  );
  const shown = shownNames(names, [step.place]);

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
              <Link href={chapterHref("acts", actsChapter(step.ref))}>
                <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
                Read Acts {actsChapter(step.ref)}
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
            aria-label={`The places on ${trip.name.toLowerCase()}`}
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

const legStyle = (by: TravelStep["by"], u: number, w: number) => ({
  strokeWidth: w * u,
  strokeDasharray:
    by === "sea" ? `${2.2 * u} ${1.3 * u}` : `${0.15 * u} ${1.1 * u}`,
});

// ── The churches ────────────────────────────────────────────────────────

function ChurchMap({
  churches,
  places,
  intro,
  note,
}: {
  churches: TravelChurch[];
  places: Places;
  intro: string;
  note: string;
}) {
  const [at, setAt] = useState(0);
  const church = churches[at];
  const all = useMemo(
    () =>
      Array.from(new Set(churches.flatMap(c => c.places)))
        .map(id => places.get(id))
        .filter((p): p is MapPlace => !!p),
    [churches, places]
  );
  const box = useMemo(() => boxFor(all), [all]);
  const go = (i: number) =>
    setAt(Math.max(0, Math.min(churches.length - 1, i)));
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(at + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(at - 1);
    }
  };
  const shown = new Set(churches.slice(0, at + 1).flatMap(c => c.places));
  // A letter is marked once, at a church's first place.
  const lettered = new Set(
    churches
      .slice(0, at + 1)
      .filter(c => c.letters.length)
      .map(c => c.places[0])
  );
  // The four towns of Galatia sit close together on the whole frame: they
  // are named only while they are the church in view (the list names them).
  const crowded = useMemo(
    () =>
      new Set(churches.filter(c => c.places.length > 1).flatMap(c => c.places)),
    [churches]
  );
  const wide = useWide();
  const names = useMemo(() => {
    const u = box.w / 100;
    // Every letter mark that can be drawn is kept clear of the names.
    const letters = churches
      .filter(c => c.letters.length)
      .map(c => places.get(c.places[0]))
      .filter((p): p is MapPlace => !!p)
      .map(p => ({
        x: FRAME.x(p.lon) - 1.6 * u,
        y: FRAME.y(p.lat) - 4.8 * u,
        w: 3.2 * u,
        h: 2.2 * u,
      }));
    // The four towns of Galatia are named only while they are the church in
    // view, so they are placed apart from the rest.
    return placeNames(
      all.filter(p => !crowded.has(p.id)),
      box,
      u,
      wide,
      [],
      letters
    );
  }, [all, box, wide, churches, places, crowded]);
  const galatia = useMemo(
    () =>
      placeNames(
        all.filter(p => church.places.includes(p.id) && crowded.has(p.id)),
        box,
        box.w / 100,
        wide,
        [],
        []
      ),
    [all, box, wide, church, crowded]
  );
  const named = shownNames(
    new Map([...Array.from(names), ...Array.from(galatia)]),
    church.places
  );

  return (
    <div className="tv-stage">
      <p className="tv-tripline">{intro}</p>
      <div className="tv-grid">
        <MapFigure
          box={box}
          label={`Churches and letters, ${at + 1} of ${churches.length}: ${church.name}.`}
          caption={
            <>
              A letter mark beside a church means a New Testament letter was
              written to it. {note}
            </>
          }
          onKey={onKey}
        >
          {u => (
            <>
              {all.map(p => {
                const here = church.places.includes(p.id);
                return (
                  <g
                    key={p.id}
                    className="tv-church"
                    data-on={shown.has(p.id) || undefined}
                  >
                    {lettered.has(p.id) && (
                      <Envelope
                        x={FRAME.x(p.lon) - 1.6 * u}
                        y={FRAME.y(p.lat) - 4.8 * u}
                        u={u}
                      />
                    )}
                    <Mark
                      p={p}
                      u={u}
                      state={here ? "here" : shown.has(p.id) ? "past" : "ahead"}
                      named={
                        here ||
                        (shown.has(p.id) &&
                          !crowded.has(p.id) &&
                          named.has(p.id))
                      }
                      at={(names.get(p.id) ?? galatia.get(p.id))?.at}
                      size={nameSize(wide)}
                      onClick={() => {
                        const i = churches.findIndex(c =>
                          c.places.includes(p.id)
                        );
                        if (i >= 0) go(i);
                      }}
                    />
                  </g>
                );
              })}
            </>
          )}
        </MapFigure>

        <div className="tv-side">
          <div className="tv-card" aria-live="polite">
            <p className="tv-count">
              Church {at + 1} of {churches.length}
              <span className="tv-tag">
                {church.begun === "paul"
                  ? "Begun on Paul's travels"
                  : "Not begun by Paul"}
              </span>
            </p>
            <h3>{church.name}</h3>
            <p className="tv-text">
              <RefText text={church.text} />
            </p>
            <p className="tv-refs">
              <VerseRef reference={church.ref} />
              <Link href={chapterHref("acts", actsChapter(church.ref))}>
                <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
                Read Acts {actsChapter(church.ref)}
              </Link>
            </p>
            {church.letters.length > 0 ? (
              <ul
                className="tv-letters"
                aria-label="Letters written to this church"
              >
                {church.letters.map(l => (
                  <li key={l.book}>
                    <Link href={`/study/bible/${l.book}`}>
                      <Mail size={15} strokeWidth={1.75} aria-hidden="true" />
                      {l.name}
                    </Link>
                    <span className="tv-letters__note">{l.note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="tv-noletter">
                No New Testament letter is addressed to this church.
              </p>
            )}
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
              disabled={at === churches.length - 1}
            >
              Next
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <ol
            className="tv-list"
            aria-label="The churches, in the order Acts names them"
          >
            {churches.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  aria-current={i === at ? "step" : undefined}
                  data-past={i < at || undefined}
                  onClick={() => go(i)}
                >
                  <span className="tv-list__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  {c.name}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/** A small letter, folded, beside a church that received one. */
function Envelope({ x, y, u }: { x: number; y: number; u: number }) {
  const w = 3.2 * u;
  const h = 2.2 * u;
  return (
    <g className="tv-envelope" style={{ strokeWidth: 0.28 * u }}>
      <rect
        className="pl-o"
        x={x}
        y={y}
        width={w}
        height={h}
        style={{ strokeWidth: 0.28 * u }}
      />
      <path
        className="pl-l"
        d={`M${x},${y}L${x + w / 2},${y + h * 0.55}L${x + w},${y}`}
        style={{ strokeWidth: 0.28 * u }}
      />
    </g>
  );
}
