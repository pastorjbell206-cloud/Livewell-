/**
 * The film reel on /preview/home: the Bible Explorer's finished films by
 * their own groups (client/public/explorer/index.json). One group at a time,
 * opening on the books of the Bible: its first film large, the rest as a list beside it. Every title, line and
 * link is the Explorer's own; nothing is written here. Loaded as its own
 * chunk when the reel nears the screen (the roundels' drawings are large).
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Play } from "lucide-react";
import { fetchExplorerIndex, filmHref, type FilmSummary } from "@/lib/explorer";
import { useLoad } from "../study-bible/shared";
import { FilmMark } from "../explorer/Watch";

const line = (f: FilmSummary) => f.line?.older ?? f.line?.younger ?? "";

export default function PreviewFilms() {
  const { data, retry } = useLoad("preview-films", fetchExplorerIndex);
  const [group, setGroup] = useState<string>("books");

  if (data === null)
    return (
      <p className="home-failed">
        The films did not load.
        <button type="button" onClick={retry}>
          Try again
        </button>
      </p>
    );
  if (!data) return null;

  const finished = (data.films ?? []).filter((f) => f.status === "finished");
  const groups = (data.filmGroups ?? []).filter((g) => finished.some((f) => f.group === g.id));
  const current = groups.find((g) => g.id === group) ?? groups[0];
  if (!current) return null;
  const films = finished.filter((f) => f.group === current.id);
  const [lead, ...rest] = films;

  return (
    <div className="pv-reel">
      <div className="pv-reel__tabs" role="group" aria-label="Film groups">
        {groups.map((g) => (
          <button key={g.id} type="button" className="home-chip" aria-pressed={g.id === current.id} onClick={() => setGroup(g.id)}>
            {g.name}
            <span className="pv-reel__n">{finished.filter((f) => f.group === g.id).length}</span>
          </button>
        ))}
      </div>
      <p className="pv-reel__about">{current.line}</p>
      <div className="pv-reel__body">
        <Link href={filmHref(lead.slug)} className="pv-reel__lead">
          <span className="pv-reel__screen">
            <FilmMark mark={lead.mark} className="lw-roundel" />
            <span className="pv-reel__play" aria-hidden="true">
              <Play size={22} strokeWidth={1.75} />
            </span>
          </span>
          <span className="pv-reel__title">{lead.title}</span>
          <span className="pv-reel__line">{line(lead)}</span>
        </Link>
        {rest.length > 0 && (
          <ul className="pv-reel__list">
            {rest.slice(0, 6).map((f) => (
              <li key={f.slug}>
                <Link href={filmHref(f.slug)} className="pv-reel__row">
                  <span className="pv-reel__mark">
                    <FilmMark mark={f.mark} className="lw-roundel" />
                  </span>
                  <span>
                    <span className="pv-reel__rtitle">{f.title}</span>
                    <span className="pv-reel__rline">{line(f)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link href="/study/films" className="home-tlink pv-reel__all">
        All {finished.length} films <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
      </Link>
    </div>
  );
}
