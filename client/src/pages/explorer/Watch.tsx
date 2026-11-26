/**
 * "Watch and learn": the Bible Explorer's moving pictures, as the map lists
 * them (client/public/explorer/films.json, through index.json). Seven groups:
 * the big story, Bible stories, books of the Bible, big ideas, what we
 * believe, verses to know, good questions. A finished film
 * opens its own page; one not made yet is named, with no link.
 *
 * WatchLinks is the small list a stop's page shows of the films that belong
 * to it.
 */
import { Link } from "wouter";
import { MapPin, Play } from "lucide-react";
import {
  ABRAHAMS_ROAD_PATH,
  TRAVELS_PATH,
  filmHref,
  filmsFor,
  type ExplorerIndex,
  type FilmGroupInfo,
  type FilmSummary,
  type Level,
} from "@/lib/explorer";
import { HeadArt, Roundel } from "./art";
import { Count } from "./parts";

/** A film's small picture: the map's road, or a stop's roundel. */
export function FilmMark({
  mark,
  className,
}: {
  mark?: string;
  className?: string;
}) {
  return mark === "road" ? (
    <HeadArt />
  ) : (
    <Roundel slug={mark ?? "creation"} className={className} />
  );
}

export const WATCH_ID = "watch";

/**
 * The maps that move, in the order "Watch and learn" lists them. Their count
 * on the page and in "What the Explorer holds" is this list's length.
 */
export const MOVING_MAPS: {
  href: string;
  mark: string;
  title: string;
  line: Record<Level, string>;
}[] = [
  {
    href: ABRAHAMS_ROAD_PATH,
    mark: "abraham",
    title: "Abraham's road",
    line: {
      younger:
        "Follow Abraham from his home in Ur to the land God promised, one place at a time.",
      older:
        "From Ur to Haran and into Canaan, down to Egypt and back, to Hebron, Beersheba and the land of Moriah, place by place.",
    },
  },
  {
    href: TRAVELS_PATH,
    mark: "church",
    title: "Paul's travels",
    line: {
      younger:
        "Follow Paul across the sea, one place at a time, and see the churches that began.",
      older:
        "Paul's three trips and the voyage to Rome, place by place, and the churches begun and the letters written to them.",
    },
  },
];

export function Watch({
  index,
  level,
  title = "Watch and learn",
  lede = "Short moving pictures, drawn in the same hand as the map. Press Play to watch, or step through by hand; every word is under the picture.",
}: {
  index: ExplorerIndex;
  level: Level;
  /** The section's heading; /study/films names it for everyone, the map for its young readers. */
  title?: string;
  lede?: string;
}) {
  const groups: FilmGroupInfo[] = index.filmGroups ?? [];
  const films: FilmSummary[] = index.films ?? [];
  if (!groups.length || !films.length) return null;
  return (
    <section className="wl-sec" id={WATCH_ID} aria-labelledby="wl-title">
      <div className="ex-wrap">
        <h2 className="ex-h2" id="wl-title">
          {title}
          <Count
            n={films.filter(f => f.status === "finished").length}
            what="moving pictures"
          />
        </h2>
        <p className="ex-lede">{lede}</p>
        <ul className="wl-groups">
          {groups.map(g => {
            const mine = films.filter(f => f.group === g.id);
            const ready = mine.filter(f => f.status === "finished");
            const soon = mine.filter(f => f.status !== "finished");
            return (
              <li key={g.id}>
                <h3 className="wl-group__name ex-anchor" id={`wl-g-${g.id}`}>
                  {g.name}
                  <Count n={ready.length} what="moving pictures" />
                </h3>
                <p className="wl-group__line">{g.line}</p>
                {ready.length > 0 && (
                  <ul className="wl-films">
                    {ready.map(f => (
                      <li key={f.slug}>
                        <Link href={filmHref(f.slug)} className="wl-film">
                          <span className="wl-film__thumb" aria-hidden="true">
                            <FilmMark mark={f.mark} className="ex-roundel" />
                            <span className="wl-film__play">
                              <Play size={13} strokeWidth={2} />
                            </span>
                          </span>
                          <span>
                            <span className="wl-film__title">{f.title}</span>
                            <span className="wl-film__line">
                              {f.line?.[level]}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {soon.length > 0 && (
                  <>
                    <p className="wl-coming__label">Coming</p>
                    <ul className="wl-coming">
                      {soon.map(f => (
                        <li key={f.slug}>{f.title}</li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            );
          })}
          <li>
            <h3 className="wl-group__name ex-anchor" id="wl-g-maps">
              Maps that move
              <Count n={MOVING_MAPS.length} what="maps" />
            </h3>
            <p className="wl-group__line">
              The places of the Bible, drawn on the map as the story goes.
            </p>
            <ul className="wl-films">
              {MOVING_MAPS.map(m => (
                <li key={m.href}>
                  <Link href={m.href} className="wl-film">
                    <span className="wl-film__thumb" aria-hidden="true">
                      <FilmMark mark={m.mark} className="ex-roundel" />
                      <span className="wl-film__play">
                        <MapPin size={13} strokeWidth={2} />
                      </span>
                    </span>
                    <span>
                      <span className="wl-film__title">{m.title}</span>
                      <span className="wl-film__line">{m.line[level]}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** The moving pictures that belong to one stop or card: a short list of links. */
export function WatchLinks({
  index,
  stop,
  card,
}: {
  index: ExplorerIndex;
  stop?: string;
  card?: string;
}) {
  const films = filmsFor(index, { stop, card });
  if (!films.length) return null;
  return (
    <ul className="ex-watch">
      {films.map(f => (
        <li key={f.slug}>
          <Link href={filmHref(f.slug)}>
            <span className="ex-watch__play" aria-hidden="true">
              <Play size={15} strokeWidth={2} />
            </span>
            {f.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
