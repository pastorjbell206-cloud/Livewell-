/**
 * "Watch and learn": the Bible Explorer's moving pictures, as the map lists
 * them (client/public/explorer/films.json, through index.json). Four groups:
 * the big story, big ideas, what we believe, good questions. A finished film
 * opens its own page; one not made yet is named, with no link.
 *
 * WatchLinks is the small list a stop's page shows of the films that belong
 * to it.
 */
import { Link } from "wouter";
import { Play } from "lucide-react";
import {
  filmHref,
  filmsFor,
  type ExplorerIndex,
  type FilmGroupInfo,
  type FilmSummary,
  type Level,
} from "@/lib/explorer";
import { Roundel } from "./art";

export const WATCH_ID = "watch";

export function Watch({
  index,
  level,
}: {
  index: ExplorerIndex;
  level: Level;
}) {
  const groups: FilmGroupInfo[] = index.filmGroups ?? [];
  const films: FilmSummary[] = index.films ?? [];
  if (!groups.length || !films.length) return null;
  return (
    <section
      className="wl-sec"
      id={WATCH_ID}
      aria-labelledby="wl-title"
    >
      <div className="ex-wrap">
        <h2 className="ex-h2" id="wl-title">
          Watch and learn
        </h2>
        <p className="ex-lede">
          Short moving pictures, drawn in the same hand as the map. Press Play
          to watch, or step through by hand; every word is under the picture.
        </p>
        <ul className="wl-groups">
          {groups.map(g => {
            const mine = films.filter(f => f.group === g.id);
            const ready = mine.filter(f => f.status === "finished");
            const soon = mine.filter(f => f.status !== "finished");
            return (
              <li key={g.id}>
                <h3 className="wl-group__name" id={`wl-g-${g.id}`}>
                  {g.name}
                </h3>
                <p className="wl-group__line">{g.line}</p>
                {ready.length > 0 && (
                  <ul className="wl-films">
                    {ready.map(f => (
                      <li key={f.slug}>
                        <Link href={filmHref(f.slug)} className="wl-film">
                          <span className="wl-film__thumb" aria-hidden="true">
                            <Roundel
                              slug={f.stops?.[0] ?? "creation"}
                              className="ex-roundel"
                            />
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
