/**
 * Two thousand years on one line (Home, the church history section).
 *
 * The seven ages of the church side by side, each as wide as the years it
 * covers, each with its roundel. Touch one and the panel names it, opens the
 * course lesson that begins it, and lists its first events; touch an event
 * for its note. The ages and events are the timeline the history hub draws
 * (/theology/church-history-timeline.json); the lessons are the course
 * (/history/essays-index.json).
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";

import { fetchJson } from "@/lib/fetch-json";
import { HISTORY_HUB, eraSpan, type Era, type HistoryEssayEntry } from "@/lib/historyCourse";
import Roundel from "@/components/art/Roundel";
import { FIRST_LESSON } from "./historyLessons";

/** A short name for each age, for the strip. */
const SHORT: Record<string, string> = {
  apostolic: "Apostles",
  persecuted: "Martyrs",
  councils: "Councils",
  "early-medieval": "Early medieval",
  "high-medieval": "High medieval",
  reformation: "Reformation",
  "modern-global": "Modern, global",
};

const EVENTS = 3;

const isTimeline = (x: unknown): x is { eras: Era[] } => !!x && typeof x === "object" && Array.isArray((x as { eras?: unknown }).eras);
const isCourse = (x: unknown): x is { essays: HistoryEssayEntry[] } =>
  !!x && typeof x === "object" && Array.isArray((x as { essays?: unknown }).essays);

export default function HistoryStrip() {
  const [eras, setEras] = useState<Era[] | null>(null);
  const [course, setCourse] = useState<HistoryEssayEntry[]>([]);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [sel, setSel] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    Promise.all([fetchJson("/theology/church-history-timeline.json", isTimeline), fetchJson("/history/essays-index.json", isCourse).catch(() => ({ essays: [] }))])
      .then(([t, c]) => {
        if (!live) return;
        setEras(t.eras);
        setCourse(c.essays);
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [nonce]);

  if (failed)
    return (
      <p className="home-failed" role="alert">
        The timeline didn't load.
        <button
          type="button"
          onClick={() => {
            setFailed(false);
            setNonce((n) => n + 1);
          }}
        >
          Try again
        </button>
      </p>
    );
  if (!eras) return null;

  const thisYear = new Date().getFullYear();
  const era = eras[sel];
  const lesson = course.find((e) => e.slug === FIRST_LESSON[era.id] && e.course);

  return (
    <div>
      <ul className="hh-strip" aria-label="The ages of the church">
        {eras.map((e, i) => {
          const span = eraSpan(e, thisYear);
          return (
            <li key={e.id} style={{ ["--y" as string]: Math.max(60, span.end - span.start) }}>
              <button
                type="button"
                className="hh-era"
                aria-pressed={i === sel}
                aria-label={`${e.name}, ${e.range}`}
                onClick={() => {
                  setSel(i);
                  setOpen(null);
                }}
              >
                <Roundel era={e.id} />
                <span className="hh-bar" aria-hidden="true" />
                <b aria-hidden="true">{SHORT[e.id] ?? e.name}</b>
                <small aria-hidden="true">
                  {span.start}–{/today/i.test(e.range) ? "today" : span.end}
                </small>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="hh-panel" aria-live="polite">
        <div>
          <p className="hh-range">{era.range}</p>
          <h3 className="hh-name">{era.name}</h3>
          {lesson && (
            <>
              <Link href={`${HISTORY_HUB}/${lesson.slug}`} className="home-btn" title={lesson.title}>
                Lesson {lesson.course} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </Link>
            </>
          )}
        </div>
        <ul className="hh-events">
          {era.events.slice(0, EVENTS).map((v, i) => (
            <li key={v.title}>
              <button type="button" className="hh-ev" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                <time>{v.year}</time>
                <b>{v.title}</b>
                <ChevronRight aria-hidden="true" size={16} />
                {open === i && <span className="hh-note">{v.note}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
