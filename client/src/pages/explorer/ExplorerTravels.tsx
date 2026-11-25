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
  useMemo,
  useState,
  type KeyboardEvent,
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
  type Travels,
} from "@/lib/explorer";
import { Roundel } from "./art";
import {
  boxFor,
  frameFor,
  MapFigure,
  Mark,
  nameSize,
  placeNames,
  shownNames,
  TripChooser,
  TripMap,
  useWide,
  type Places,
} from "./RouteMap";
import "./explorer.css";

type Loaded = { travels: Travels; places: Places };
type View = "trips" | "churches";

const FRAME = frameFor("mediterranean");

/** The shorter names the map draws for two of the Acts page's places. */
const shortName = (p: MapPlace) =>
  p.id === "fair-havens"
    ? "Fair Havens"
    : p.id === "antioch"
      ? "Antioch"
      : p.name;

const ACTS = { slug: "acts", name: "Acts" };

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
                frame={FRAME}
                trip={trip}
                places={places}
                note={travels.routeNote}
                book={ACTS}
                nameOf={shortName}
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
  const box = useMemo(() => boxFor(FRAME, all), [all]);
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
      FRAME,
      all.filter(p => !crowded.has(p.id)),
      box,
      u,
      wide,
      [],
      letters,
      shortName
    );
  }, [all, box, wide, churches, places, crowded]);
  const galatia = useMemo(
    () =>
      placeNames(
        FRAME,
        all.filter(p => church.places.includes(p.id) && crowded.has(p.id)),
        box,
        box.w / 100,
        wide,
        [],
        [],
        shortName
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
          frame={FRAME}
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
                      frame={FRAME}
                      p={p}
                      u={u}
                      name={shortName(p)}
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
