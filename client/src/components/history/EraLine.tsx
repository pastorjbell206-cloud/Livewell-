/**
 * EraLine: the church's seven ages on one line, drawn to scale by years
 * (the history door, /theology/history). Choose an age by touch, by mouse,
 * by sliding a finger or the pointer along the line, by Earlier and Later,
 * or by the arrow keys (Home and End jump to the ends). The panel under the
 * line shows the age: its lessons in the course, who was alive, what the
 * councils decided and what was disputed, and its dated events, each from
 * the files the page already loads (timeline, councils, heresies, people,
 * essays index). Nothing is drawn by a chart library.
 *
 * For a screen reader it is a plain ordered list of the ages, each a button
 * that says its name and years and whether it is chosen; the panel is a
 * live region. With scripts slow, the prerendered page lists the same ages
 * (scripts/prerender-heads.mjs).
 *
 * Styles: .hl-* in index.css. The global reduced-motion rule stills the
 * transitions.
 */
import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import Roundel from "@/components/art/Roundel";
import {
  HISTORY_HUB, eraSpan, entryId,
  type Council, type Era, type Figure, type Heresy, type HistoryEssayEntry,
} from "@/lib/historyCourse";
import { AGE_SHORT, councilsOfAge, heresiesOfAge, lessonsOfAge, peopleOfAge } from "@/lib/historyAges";

const EVENTS = 4;

export default function EraLine({
  eras,
  councils,
  heresies,
  figures,
  course,
  onEntry,
}: {
  eras: Era[];
  councils: Council[];
  heresies: Heresy[];
  figures: Figure[];
  /** The course lessons, in order. */
  course: HistoryEssayEntry[];
  /** Open a council's or heresy's entry on this page. */
  onEntry: (kind: "council" | "heresy", name: string) => void;
}) {
  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const [sel, setSel] = useState(0);
  const [allEvents, setAllEvents] = useState(false);
  const [openEvent, setOpenEvent] = useState<number | null>(null);
  const [about, setAbout] = useState(false);
  const list = useRef<HTMLOListElement>(null);
  const dragging = useRef(false);

  const spans = useMemo(() => eras.map((e) => eraSpan(e, thisYear)), [eras, thisYear]);
  if (!eras.length) return null;
  const first = spans[0].start;
  const last = spans[spans.length - 1].end;
  const total = Math.max(1, last - first);

  const choose = (i: number, focus = false) => {
    const n = Math.max(0, Math.min(eras.length - 1, i));
    if (n !== sel) {
      setSel(n);
      setAllEvents(false);
      setOpenEvent(null);
      setAbout(false);
    }
    if (focus) (list.current?.querySelectorAll("button")[n] as HTMLButtonElement | undefined)?.focus();
  };

  const onKey = (ev: KeyboardEvent<HTMLOListElement>) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    const to = { ArrowRight: sel + 1, ArrowDown: sel + 1, ArrowLeft: sel - 1, ArrowUp: sel - 1, Home: 0, End: eras.length - 1 }[ev.key];
    if (to === undefined) return;
    ev.preventDefault();
    choose(to, true);
  };

  /** Slide along the line: the age under the finger or pointer is chosen. */
  const pick = (x: number) => {
    const items = list.current?.children;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const r = (items[i] as HTMLElement).getBoundingClientRect();
      if (x >= r.left && x < r.right) return choose(i);
    }
  };
  const onDown = (ev: PointerEvent<HTMLOListElement>) => {
    dragging.current = true;
    if (ev.pointerType !== "mouse") list.current?.setPointerCapture?.(ev.pointerId);
  };
  const onMove = (ev: PointerEvent<HTMLOListElement>) => {
    if (dragging.current) pick(ev.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  const era = eras[sel];
  const span = spans[sel];
  const lessons = lessonsOfAge(era, course);
  const people = peopleOfAge(era, figures, thisYear);
  const met = councilsOfAge(eras, era, councils, thisYear);
  const disputed = heresiesOfAge(eras, era, heresies, thisYear);
  const events = allEvents ? era.events : era.events.slice(0, EVENTS);
  // A tick too near either end would sit on the end labels.
  const ticks = [500, 1000, 1500, 2000].filter((y) => (y - first) / total > 0.08 && (last - y) / total > 0.08);
  const endLabel = (i: number) => (/today/i.test(eras[i].range) ? "today" : String(spans[i].end));

  return (
    <div className="hl">
      <div className="hl-line">
        <ol
          ref={list}
          className="hl-ages"
          aria-label="The seven ages of the church"
          onKeyDown={onKey}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
        >
          {eras.map((e, i) => (
            <li key={e.id} style={{ ["--y" as string]: spans[i].end - spans[i].start }}>
              <button
                type="button"
                className="hl-age"
                aria-pressed={i === sel}
                tabIndex={i === sel ? 0 : -1}
                aria-label={`${e.name}, ${e.range}`}
                onClick={() => choose(i)}
              >
                <Roundel era={e.id} />
                <b aria-hidden="true">{AGE_SHORT[e.id] ?? e.name}</b>
              </button>
            </li>
          ))}
        </ol>
        {/* The ruler: every age's band exactly as long as its years. */}
        <div className="hl-ruler" aria-hidden="true">
          {eras.map((e, i) => (
            <span
              key={e.id}
              className={`hl-band${i === sel ? " is-on" : ""}`}
              style={{ left: `${((spans[i].start - first) / total) * 100}%`, width: `${((spans[i].end - spans[i].start) / total) * 100}%` }}
            />
          ))}
          {ticks.map((y) => (
            <span key={y} className="hl-tick" style={{ left: `${((y - first) / total) * 100}%` }}>
              {y}
            </span>
          ))}
          <span className="hl-tick hl-tick--start">{first}</span>
          <span className="hl-tick hl-tick--end">today</span>
        </div>
      </div>

      <div className="hl-step">
        <button type="button" className="hl-move" onClick={() => choose(sel - 1)} disabled={sel === 0}>
          <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.75} /> <span>Earlier</span>
        </button>
        <span className="hl-count">
          Age {sel + 1} of {eras.length}
        </span>
        <button type="button" className="hl-move" onClick={() => choose(sel + 1)} disabled={sel === eras.length - 1}>
          <span>Later</span> <ChevronRight aria-hidden="true" size={20} strokeWidth={1.75} />
        </button>
      </div>

      <div className="hl-panel" aria-live="polite">
        <div className="hl-panel__head">
          <span className="hl-panel__mark" aria-hidden="true">
            <Roundel era={era.id} />
          </span>
          <div>
            <p className="hl-range">
              {span.start} to {endLabel(sel)}
            </p>
            <h3 className="hl-name">{era.name}</h3>
          </div>
        </div>

        <div className="hl-grid">
          <div className="hl-col">
            {lessons.length > 0 && (
              <>
                <p className="hl-label">Read</p>
                <ul className="hl-lessons">
                  {lessons.map((l) => (
                    <li key={l.slug}>
                      <Link href={`${HISTORY_HUB}/${l.slug}`}>
                        <small>Lesson {l.course}</small>
                        <span>{l.title}</span>
                        <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {people.length > 0 && (
              <>
                <p className="hl-label">Who was alive</p>
                <ul className="hl-chips">
                  {people.map((f) => (
                    <li key={f.name}>
                      <Link href={`${HISTORY_HUB}/people#${entryId("person", f.name)}`}>{f.name}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {(met.length > 0 || disputed.length > 0) && (
              <>
                <p className="hl-label">What was decided</p>
                <ul className="hl-chips">
                  {met.map((c) => (
                    <li key={c.name}>
                      <button type="button" onClick={() => onEntry("council", c.name)}>
                        {c.name} <small>{c.year}</small>
                      </button>
                    </li>
                  ))}
                  {disputed.map((h) => (
                    <li key={h.name}>
                      <button type="button" className="is-error" onClick={() => onEntry("heresy", h.name)}>
                        {h.name.replace(/,.*$/, "")} <small>rejected</small>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="hl-col">
            <p className="hl-label">What happened</p>
            <ul className="hl-events">
              {events.map((v, i) => (
                <li key={v.title}>
                  <button type="button" aria-expanded={openEvent === i} onClick={() => setOpenEvent(openEvent === i ? null : i)}>
                    <time>{v.year}</time>
                    <b>{v.title}</b>
                    <ChevronDown aria-hidden="true" size={16} strokeWidth={1.75} />
                  </button>
                  {openEvent === i && <p>{v.note}</p>}
                </li>
              ))}
            </ul>
            <div className="hl-more">
              {era.events.length > EVENTS && (
                <button type="button" className="btn--text" aria-expanded={allEvents} onClick={() => setAllEvents((x) => !x)}>
                  {allEvents ? "Fewer events" : `All ${era.events.length} events`}
                </button>
              )}
              <button type="button" className="btn--text" aria-expanded={about} onClick={() => setAbout((x) => !x)}>
                {about ? "Close" : "About this age"}
              </button>
            </div>
            {about && <p className="hl-about">{era.summary}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
