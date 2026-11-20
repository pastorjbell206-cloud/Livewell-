/**
 * /study/explorer/abrahams-road: Abraham's road, the Bible Explorer's second
 * moving map, on the "fertile-crescent" frame the Genesis book page draws
 * (BookMap's FrameArt), with only the places that page has already checked
 * (client/public/bible/notes/genesis/intro.json, by id). The road is data:
 * client/public/explorer/abrahams-road.json, in three parts.
 *
 * It is built from the same parts as Paul's travels (RouteMap.tsx): choose a
 * part, then step place by place with Back and Next, the arrow keys on the
 * map, or a place's own button; the card says what happened there, with its
 * Genesis reference and a link to the chapter. Every line is straight and
 * dotted, because Genesis gives the order of the places and not the roads.
 */
import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { LoadFailed } from "@/components/LoadFailed";
import { RefText } from "@/components/VerseRef";
import { bookMaps, fetchIntro } from "@/lib/bible-notes";
import {
  EXPLORER_PATH,
  fetchAbrahamsRoad,
  stopHref,
  type AbrahamsRoad,
} from "@/lib/explorer";
import { Roundel } from "./art";
import { frameFor, TripChooser, TripMap, type Places } from "./RouteMap";
import "./explorer.css";

type Loaded = { road: AbrahamsRoad; places: Places };

const FRAME = frameFor("fertile-crescent");
const GENESIS = { slug: "genesis", name: "Genesis" };

/**
 * The Genesis book page's places by id (both its maps), each under the name
 * the road gives it where it gives one: Goshen is drawn for "Egypt", since
 * Genesis does not say where in Egypt Abram stayed.
 */
function placesFrom(
  map: Parameters<typeof bookMaps>[0],
  names: Record<string, string> = {}
): Places {
  const out: Places = new Map();
  for (const m of bookMaps(map))
    for (const p of m.places)
      if (!out.has(p.id))
        out.set(p.id, names[p.id] ? { ...p, name: names[p.id] } : p);
  return out;
}

function useRoad() {
  const [res, setRes] = useState<{ n: number; data: Loaded | null } | null>(
    null
  );
  const [n, setN] = useState(0);
  useEffect(() => {
    let live = true;
    Promise.all([fetchAbrahamsRoad(), fetchIntro("genesis")])
      .then(
        ([road, intro]) =>
          live &&
          setRes({
            n,
            data: {
              road,
              places: placesFrom(intro.teaching?.map ?? [], road.names),
            },
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

/** The part the address asks for (?part=egypt), if any. */
function partFromUrl(): string | null {
  try {
    return new URLSearchParams(window.location.search).get("part");
  } catch {
    return null;
  }
}

function setUrl(part: string, first: string) {
  try {
    const url = new URL(window.location.href);
    if (part === first) url.searchParams.delete("part");
    else url.searchParams.set("part", part);
    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash
    );
  } catch {
    /* the address stays as it was; the map still changes */
  }
}

export default function ExplorerAbraham() {
  const { data, retry } = useRoad();
  return (
    <Layout>
      <SEOMeta
        title="Abraham's road: Bible Explorer"
        description="Abraham's road in Genesis on a map that draws itself, place by place: from Ur to Haran and into Canaan, down to Egypt and back, Hebron, Beersheba and the land of Moriah."
        url="https://www.livewellbyjamesbell.co/study/explorer/abrahams-road"
      />
      <PageHead
        door="Bible Explorer"
        doorHref={EXPLORER_PATH}
        title="Abraham's road"
        line="Follow Abraham across the map of Genesis, one place at a time, from Ur to the land God promised."
        art={<Roundel slug="abraham" className="ex-headmark" />}
      />
      {data === null ? (
        <div style={{ padding: "var(--s-6) var(--gutter)" }}>
          <LoadFailed
            what="The map of Abraham's road"
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
        <RoadPage {...data} />
      )}
      <nav className="ex-sec" aria-label="More in the Bible Explorer">
        <div className="ex-wrap ex-nav">
          <Link href={stopHref("abraham")} className="btn btn--quiet">
            <ArrowLeft
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              style={{ marginRight: 8 }}
            />
            Stop 3: Abraham and the Promise
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

function RoadPage({ road, places }: Loaded) {
  const first = road.parts[0].id;
  const [partId, setPartId] = useState<string>(() => {
    const ask = partFromUrl();
    return road.parts.some(p => p.id === ask) ? ask! : first;
  });
  const part = road.parts.find(p => p.id === partId) ?? road.parts[0];
  const choose = (id: string) => {
    setPartId(id);
    setUrl(id, first);
  };
  return (
    <section className="ex-sec ex-sec--warm" aria-labelledby="ar-title">
      <div className="ex-wrap">
        <h2 className="ex-h2" id="ar-title">
          Where Abraham went
        </h2>
        <p className="ex-lede">
          <RefText text={road.intro} />
        </p>
        <TripChooser
          trips={road.parts}
          value={part.id}
          onChoose={choose}
          legend="Choose a part of the road"
        />
        <TripMap
          key={part.id}
          frame={FRAME}
          trip={part}
          places={places}
          note={road.routeNote}
          book={GENESIS}
          listLabel={`The places in this part: ${part.name}`}
        />
      </div>
    </section>
  );
}
