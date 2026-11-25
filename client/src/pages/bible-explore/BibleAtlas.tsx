/**
 * /study/atlas: the Bible atlas. Every place a book page puts on its map
 * (intro.json `teaching.map`), gathered by scripts/build-bible-atlas-index.mjs
 * into /bible/explore/atlas.json: one entry per place, at the position its
 * book gives it, with each book's own sentence about it and the chapters that
 * book names.
 *
 * The drawings are the book map's own four frames, in the art kit's hand
 * (study-bible/BookMap.tsx). No one frame the site draws reaches from Rome to
 * Ur, so the atlas is four sheets, and a place is on each sheet a book page
 * draws it on. Beside the drawing is the plain list of the sheet's places,
 * each a button: that list is the way in for a keyboard and a screen reader,
 * and "Find a place" searches every sheet at once.
 */
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { MapPin } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import type { MapFrameId } from "@/lib/bible-notes";
import { fetchAtlas, refHref, type AtlasData, type AtlasPlace } from "@/lib/bibleExplore";
import { Band, Status, useLoad } from "../study-bible/shared";
import { NotYet } from "./shared";
import "../study-bible/bible.css";
import "./explore.css";

const AtlasMap = lazy(() => import("./AtlasMap"));

/** The four frames the book pages draw on, by the names their own maps go by. */
export const SHEETS: Record<MapFrameId, { name: string; reach: string }> = {
  "fertile-crescent": { name: "The Fertile Crescent", reach: "from the Nile to the Persian Gulf" },
  canaan: { name: "Canaan", reach: "from Dan in the north to the Negev in the south" },
  israel: { name: "The land in Jesus' day", reach: "from Sidon in the north to Jerusalem in the south" },
  mediterranean: { name: "The Mediterranean", reach: "from Rome in the west to Jerusalem in the east" },
};

const onSheet = (p: AtlasPlace, frame: MapFrameId) => p.frames.some((f) => f.frame === frame);
const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[^a-z0-9 ]/g, "");

export function AtlasView({ data, initialPlace = "" }: { data: AtlasData; initialPlace?: string }) {
  const start = data.places.find((p) => p.id === initialPlace);
  const [frame, setFrame] = useState<MapFrameId>(start?.frames[0]?.frame ?? data.frames[0]);
  const [selected, setSelected] = useState(start?.id ?? "");
  const [query, setQuery] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const books = useMemo(() => new Map(data.books.map((b) => [b.slug, b])), [data.books]);
  const here = useMemo(() => data.places.filter((p) => onSheet(p, frame)), [data.places, frame]);
  const q = fold(query.trim());
  const found = q ? data.places.filter((p) => fold(p.name).includes(q) || p.books.some((b) => fold(b.name).includes(q))) : here;
  const place = data.places.find((p) => p.id === selected) ?? here[0];

  const choose = (id: string) => {
    const p = data.places.find((x) => x.id === id);
    if (!p) return;
    if (!onSheet(p, frame)) setFrame(p.frames[0].frame);
    setSelected(id);
    moved.current = true;
    window.history.replaceState(null, "", `#${id}`);
  };

  // A link to another place on this page (#rome) turns to it.
  useEffect(() => {
    const onHash = () => {
      const p = data.places.find((x) => x.id === decodeURIComponent(window.location.hash.slice(1)));
      if (!p) return;
      setFrame((f) => (onSheet(p, f) ? f : p.frames[0].frame));
      setSelected(p.id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [data.places]);

  // A place chosen on the drawing brings its card into view (a phone has the list between them).
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    cardRef.current?.scrollIntoView?.({ block: "nearest" });
  }, [selected]);

  const sheet = SHEETS[frame];

  return (
    <Band id="atlas">
      <p className="bx-lede">
        {data.places.length} places from the maps of {data.books.length} books, each where its own book page puts it. Choose a place to see the books and chapters that name it.
      </p>
      <NotYet without={data.without} what="map" />

      <div className="bk-tl__chips bx-chips bx-sheets" role="group" aria-label="Which map">
        {data.frames.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={frame === f}
            onClick={() => {
              setFrame(f);
              setQuery("");
              if (place && !onSheet(place, f)) setSelected("");
            }}
          >
            {SHEETS[f].name}
            <span className="bx-sheets__n">{data.places.filter((p) => onSheet(p, f)).length}</span>
          </button>
        ))}
      </div>

      <div className="bk-map bx-atlas" data-frame={frame}>
        <figure className="bk-map__fig">
          <Suspense fallback={<div className="bx-atlas__hold" data-frame={frame} data-lw-loading />}>
            <AtlasMap frame={frame} places={here} selected={place?.id ?? ""} onSelect={choose} label={`A simple map of ${sheet.name}, ${sheet.reach}, with the ${here.length} places the book pages put on it.`} />
          </Suspense>
        </figure>

        <div className="bk-map__side">
          <div className="bx-field bx-atlas__find">
            <label htmlFor="bx-place">Find a place</label>
            <input id="bx-place" type="search" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" placeholder="On any of the maps" />
          </div>
          <p className="bx-count" role="status">
            {q ? `${found.length} of ${data.places.length} places match.` : `${here.length} places on this map.`}
          </p>
          <ul className="bk-map__list" aria-label={q ? "Places that match" : `Places on the map of ${sheet.name}`}>
            {found.map((p) => (
              <li key={p.id}>
                <button type="button" aria-pressed={p.id === place?.id} onClick={() => choose(p.id)}>
                  <MapPin aria-hidden="true" size={16} strokeWidth={1.75} />
                  {p.name}
                </button>
              </li>
            ))}
          </ul>

          {place && (
            <div className="bk-map__card bx-atlas__card" aria-live="polite" ref={cardRef}>
              <h2>{place.name}</h2>
              <p className="bx-count">
                {place.books.length === 1 ? "One book page places it." : `${place.books.length} book pages place it.`}
              </p>
              <ul className="bx-atlas__books">
                {place.books.map((b) => {
                  const book = books.get(b.slug);
                  const name = book?.name ?? b.slug;
                  return (
                    <li key={b.slug}>
                      <h3>
                        <Link href={`/study/bible/${b.slug}#map`}>{name}</Link>
                        {b.name !== place.name && <span> names it {b.name}</span>}
                      </h3>
                      {b.line.split(/\n{2,}/).map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                      <p className="bk-map__refs">
                        {b.refs.map((r) => (
                          <Link key={r} href={refHref(b.slug, r)}>
                            {b.slug === "psalms" ? "Psalm" : name} {r}
                          </Link>
                        ))}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Band>
  );
}

export default function BibleAtlas() {
  const { data, retry } = useLoad("atlas", fetchAtlas);
  const initialPlace = typeof window === "undefined" ? "" : decodeURIComponent(window.location.hash.slice(1));
  return (
    <Layout>
      <SEOMeta
        title="The Bible Atlas: Every Place the Book Pages Map"
        description="Every place the Study Bible's book pages put on a map, on four drawn maps from Rome to Ur. Choose a place to see the books and chapters that name it."
        url="https://www.livewellbyjamesbell.co/study/atlas"
      />
      <InnerHead path="/study/atlas" title="The Bible atlas" line="Every place the book pages put on a map. Choose one to see the books and chapters that name it." plate="compass" />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the atlas…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The atlas" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && <AtlasView data={data} initialPlace={initialPlace} />}
    </Layout>
  );
}
