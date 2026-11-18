/**
 * HistoryTimeline — the church's two thousand years as something a reader can
 * step through. Pick an era, then move year by year through its dated years
 * (Earlier and Later, or the arrow keys). Each year shows what happened, the
 * council that met, the people in the list who were alive, and the essay that
 * covers it. Everything comes from the libraries the hub already loads
 * (timeline, councils, people, essays index); nothing is drawn by a charting
 * library. Styles: .hx-* in index.css.
 */
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  aliveIn, eraSpan, essaysCovering, timelineStops,
  type Council, type EntryKind, type Era, type Figure, type HistoryEssayEntry,
} from "@/lib/historyCourse";

export default function HistoryTimeline({
  eras, councils, figures, essays, onOpen,
}: {
  eras: Era[];
  councils: Council[];
  figures: Figure[];
  essays: HistoryEssayEntry[];
  /** Go to a person's or a council's entry on the hub. */
  onOpen: (kind: EntryKind, name: string) => void;
}) {
  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const stops = useMemo(() => timelineStops(eras, councils, thisYear), [eras, councils, thisYear]);
  const [pos, setPos] = useState({ era: 0, stop: 0 });
  const eraRow = useRef<HTMLDivElement>(null);

  const era = eras[pos.era];
  const eraStops = stops[pos.era] ?? [];
  const stop = eraStops[pos.stop];
  if (!era || !stop) return null;

  const span = eraSpan(era, thisYear);
  const atStart = pos.era === 0 && pos.stop === 0;
  const atEnd = pos.era === eras.length - 1 && pos.stop === eraStops.length - 1;

  const showEra = (i: number) => {
    const btn = eraRow.current?.children[i] as HTMLElement | undefined;
    btn?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
  };
  const go = (next: { era: number; stop: number }) => {
    setPos(next);
    if (next.era !== pos.era) showEra(next.era);
  };
  const step = (delta: 1 | -1) => {
    const s = pos.stop + delta;
    if (s >= 0 && s < eraStops.length) return go({ era: pos.era, stop: s });
    const e = pos.era + delta;
    if (e < 0 || e >= eras.length) return;
    go({ era: e, stop: delta > 0 ? 0 : Math.max(0, (stops[e]?.length ?? 1) - 1) });
  };
  const onKey = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    if (ev.key === "ArrowRight") { ev.preventDefault(); step(1); }
    else if (ev.key === "ArrowLeft") { ev.preventDefault(); step(-1); }
    else if (ev.key === "Home") { ev.preventDefault(); go({ era: pos.era, stop: 0 }); }
    else if (ev.key === "End") { ev.preventDefault(); go({ era: pos.era, stop: eraStops.length - 1 }); }
  };

  const alive = aliveIn(stop.year, figures, eras, thisYear);
  const covering = essaysCovering(stop.year, essays, eras, thisYear);
  const isToday = /today/i.test(stop.label);
  const place = (y: number) => `${Math.min(100, Math.max(0, ((y - span.start) / Math.max(1, span.end - span.start)) * 100))}%`;

  return (
    <div className="hx-tl" role="group" aria-label="The timeline, year by year" onKeyDown={onKey}>
      <p className="hx-lede">
        Pick an era, then step through its years. For each one you can see what happened, who was alive, and which essay tells it. The left and right arrow keys step too.
      </p>

      <div className="hx-eras" ref={eraRow} role="group" aria-label="Choose an era">
        {eras.map((e, i) => (
          <button key={e.id} type="button" className="hx-era" aria-pressed={i === pos.era} onClick={() => go({ era: i, stop: 0 })}>
            <span className="hx-era-range">{e.range}</span>
            <span className="hx-era-name">{e.name}</span>
          </button>
        ))}
      </div>

      <div className="hx-scale" aria-hidden="true">
        <span className="hx-scale-end">{span.start}</span>
        <span className="hx-scale-line">
          {eraStops.map((s, i) => (
            <span key={s.year} className={`hx-dot${i === pos.stop ? " is-on" : ""}`} style={{ left: place(s.year) }} />
          ))}
        </span>
        <span className="hx-scale-end">{/today/i.test(era.range) ? "today" : span.end}</span>
      </div>

      <div className="hx-panel">
        <div className="hx-stepper">
          <button type="button" className="hx-step" onClick={() => step(-1)} disabled={atStart} aria-label="Earlier year">
            <ChevronLeft size={20} aria-hidden /> <span>Earlier</span>
          </button>
          <div className="hx-year" aria-live="polite">
            <span className="hx-year-count">{era.name} · {pos.stop + 1} of {eraStops.length}</span>
            <span className="hx-year-num">{stop.label}</span>
          </div>
          <button type="button" className="hx-step" onClick={() => step(1)} disabled={atEnd} aria-label="Later year">
            <span>Later</span> <ChevronRight size={20} aria-hidden />
          </button>
        </div>

        {stop.events.map((ev) => (
          <div key={ev.title} className="hx-event">
            <h3>{ev.title}</h3>
            <p>{ev.note}</p>
          </div>
        ))}

        <div className="hx-rows">
          {stop.councils.length > 0 && (
            <div>
              <div className="hx-label">{stop.councils.length > 1 ? "The councils that met" : "The council that met"}</div>
              {stop.councils.map((c) => (
                <button key={c.name} type="button" className="hx-name" onClick={() => onOpen("council", c.name)}>
                  {c.name}{c.place ? <span> · {c.place}</span> : null}
                </button>
              ))}
            </div>
          )}
          {alive.length > 0 && !isToday && (
            <div>
              <div className="hx-label">Alive in {stop.year}</div>
              {alive.map((f) => (
                <button key={f.name} type="button" className="hx-name" onClick={() => onOpen("person", f.name)}>
                  {f.name} <span>· {f.dates}</span>
                </button>
              ))}
            </div>
          )}
          {covering.length > 0 && (
            <div>
              <div className="hx-label">{covering.length > 1 ? "The essays that cover it" : "The essay that covers it"}</div>
              {covering.map((e) => (
                <Link key={e.slug} href={`/theology/history/${e.slug}`} className="hx-read">
                  <span>{typeof e.course === "number" ? `Essay ${e.course}` : "Go deeper"}</span> {e.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
