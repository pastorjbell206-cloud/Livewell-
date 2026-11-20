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

/**
 * Where a name sits beside its mark, in hundredths of the view's width
 * (only where the default, to the right, would collide).
 */
const NAME_AT: Record<
  string,
  { dx: number; dy: number; anchor: "start" | "end" | "middle" }
> = {
  antioch: { dx: -2, dy: 1, anchor: "end" },
  tarsus: { dx: -2, dy: -1.5, anchor: "end" },
  salamis: { dx: -2, dy: 1, anchor: "end" },
  paphos: { dx: 0, dy: 4.5, anchor: "middle" },
  perga: { dx: -2, dy: 2.5, anchor: "end" },
  "pisidian-antioch": { dx: -2, dy: -1, anchor: "end" },
  iconium: { dx: 2, dy: -1, anchor: "start" },
  lystra: { dx: -2.4, dy: 3.6, anchor: "end" },
  derbe: { dx: 2, dy: 1.5, anchor: "start" },
  philippi: { dx: 2, dy: -1, anchor: "start" },
  thessalonica: { dx: -2, dy: -1, anchor: "end" },
  berea: { dx: -2, dy: 2.5, anchor: "end" },
  corinth: { dx: -2, dy: 1.5, anchor: "end" },
  athens: { dx: 2, dy: 1.5, anchor: "start" },
  miletus: { dx: 2, dy: 3.4, anchor: "start" },
  ephesus: { dx: 2, dy: -0.6, anchor: "start" },
  caesarea: { dx: -2, dy: 1, anchor: "end" },
  jerusalem: { dx: -2, dy: 3.2, anchor: "end" },
  tyre: { dx: -2, dy: 1, anchor: "end" },
  sidon: { dx: -2, dy: 0, anchor: "end" },
  "fair-havens": { dx: 0, dy: 4.5, anchor: "middle" },
  malta: { dx: 0, dy: 4.5, anchor: "middle" },
  syracuse: { dx: 2, dy: 1, anchor: "start" },
  puteoli: { dx: 2, dy: 1, anchor: "start" },
  rome: { dx: -2, dy: 1, anchor: "end" },
};

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
}: {
  p: MapPlace;
  u: number;
  state: "ahead" | "past" | "here";
  onClick: () => void;
  named: boolean;
}) {
  const cx = FRAME.x(p.lon);
  const cy = FRAME.y(p.lat);
  const s = (state === "here" ? 1.5 : 1.05) * u;
  const at = NAME_AT[p.id] ?? { dx: 2, dy: 1, anchor: "start" as const };
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
      {named && (
        <text
          className="tv-name"
          x={cx + at.dx * u}
          y={cy + at.dy * u}
          textAnchor={at.anchor}
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
                  named
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
  const crowded = new Set(
    churches.filter(c => c.places.length > 1).flatMap(c => c.places)
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
                      named={here || (shown.has(p.id) && !crowded.has(p.id))}
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
