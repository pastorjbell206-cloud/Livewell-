/**
 * The atlas's drawing: one of the book map's own frames (its paper, seas,
 * coasts and rivers, from study-bible/BookMap.tsx, not redrawn) with every
 * place the book pages put on that frame, each where its book puts it. Its
 * own chunk, with the book map's coastlines, so the page's words never wait
 * on it.
 *
 * The marks answer a tap; the keyboard's way is the list of places beside
 * the drawing (BibleAtlas.tsx), so the drawing itself is one image to a
 * screen reader, described in a sentence.
 */
import { useId, useMemo } from "react";

import { FrameArt, LABEL, frameGeometry } from "../study-bible/BookMap";
import type { MapFrameId } from "@/lib/bible-notes";
import type { AtlasPlace } from "@/lib/bibleExplore";

type Side = { dx: number; dy: number; anchor: "start" | "end" | "middle"; text?: string };
type Box = [number, number, number, number];

const DEFAULT: Side = { dx: 10, dy: 4, anchor: "start" };
/** The name's size on the drawing, in drawing units, at the size a phone shows it (the larger case). */
const NAME_SIZE: Record<MapFrameId, number> = { israel: 12.5, canaan: 12.5, "fertile-crescent": 18, mediterranean: 14 };

const shortName = (name: string) => name.replace(/^(Region of the|The) /, "").replace(/ River$/, "");
const hits = (a: Box, b: Box) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];

function nameBox(cx: number, cy: number, side: Side, text: string, size: number): Box {
  const w = text.length * size * 0.56;
  const x = cx + side.dx - (side.anchor === "end" ? w : side.anchor === "middle" ? w / 2 : 0);
  const y = cy + side.dy;
  return [x, y - size, x + w, y + size * 0.3];
}

export default function AtlasMap({
  frame,
  places,
  selected,
  onSelect,
  label,
}: {
  frame: MapFrameId;
  /** The places the book pages draw on this frame. */
  places: AtlasPlace[];
  selected: string;
  onSelect: (id: string) => void;
  /** The drawing's description for a screen reader. */
  label: string;
}) {
  const id = useId().replace(/:/g, "");
  const { W, H, x, y, half, sketch } = frameGeometry(frame);
  const regions = places.filter((p) => p.region).length;
  const size = NAME_SIZE[frame];

  // Names are set where their books set them. On a frame many books share,
  // two names can land on each other; the place more books name keeps its
  // name on the drawing, and the other is still in the list beside it. The
  // chosen place always carries its name.
  const named = useMemo(() => {
    const out = new Map<string, Side>();
    const taken: Box[] = places.map((p) => [x(p.lon) - half - 2, y(p.lat) - half - 2, x(p.lon) + half + 2, y(p.lat) + half + 2]);
    const order = [...places].sort((a, b) => Number(b.id === selected) - Number(a.id === selected) || b.books.length - a.books.length);
    for (const p of order) {
      const given = p.frames.find((f) => f.frame === frame)?.label;
      const on = p.id === selected;
      if (given === false && !on) continue;
      const first: Side = (given || undefined) ?? p.ids.map((i) => LABEL[i]).find(Boolean) ?? DEFAULT;
      const text = first.text ?? shortName(p.name);
      const own = places.indexOf(p);
      // The book's own side first; then the other three sides of the mark.
      const sides: Side[] = [first, { dx: half + 5, dy: 4, anchor: "start" }, { dx: -(half + 5), dy: 4, anchor: "end" }, { dx: 0, dy: -(half + 6), anchor: "middle" }, { dx: 0, dy: half + size, anchor: "middle" }];
      const free = sides.find((sd) => {
        const b = nameBox(x(p.lon), y(p.lat), sd, text, size);
        // A mark that all but sits on this one (Bethany beside Jerusalem) cannot be cleared on any side, so it does not count.
        const beside = (i: number) => i < places.length && Math.hypot(x(places[i].lon) - x(p.lon), y(places[i].lat) - y(p.lat)) < 16;
        return b[0] >= 0 && b[2] <= W && b[1] >= 0 && b[3] <= H && !taken.some((t, i) => i !== own && !beside(i) && hits(t, b));
      });
      if (!free && !on) continue;
      const side = free ?? first;
      taken.push(nameBox(x(p.lon), y(p.lat), side, text, size));
      out.set(p.id, { ...side, text });
    }
    return out;
    // x and y are fixed by the frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame, places, selected]);

  return (
    <>
    <div className="bx-atlas__hold" data-frame={frame}>
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      <FrameArt frameId={frame} hatch={`atlas-hatch-${id}`} />
      {places.map((p) => {
        const on = p.id === selected;
        const cx = x(p.lon);
        const cy = y(p.lat);
        const side = named.get(p.id);
        return (
          <g key={p.id} className="bk-map__place" data-on={on || undefined} data-place={p.id} onClick={() => onSelect(p.id)} aria-hidden="true">
            <circle cx={cx} cy={cy} r="16" fill="transparent" />
            {p.ids.includes("jerusalem") ? (
              <rect className="pl-m" x={cx - half - 2} y={cy - half - 2} width={2 * half + 4} height={2 * half + 4} stroke="var(--art-ink)" strokeWidth={on ? 4 : 2.25} />
            ) : p.region ? (
              <circle className={on ? "pl-k" : "pl-o"} cx={cx} cy={cy} r="6" strokeDasharray="3 2" />
            ) : (
              <rect className={on ? "pl-k" : "pl-o"} x={cx - half} y={cy - half} width={2 * half} height={2 * half} />
            )}
            {side && (
              <text x={cx + side.dx} y={cy + side.dy} textAnchor={side.anchor} className="bk-map__name">
                {side.text}
              </text>
            )}
          </g>
        );
      })}
    </svg>
    </div>
    <figcaption>
      {sketch}
      {regions === 0 ? "." : regions === 1 ? "; the region is placed roughly." : `; the ${regions} regions are placed roughly.`} Where two names would run into each other, one is left off the drawing. Every place is in the list.
    </figcaption>
    </>
  );
}
