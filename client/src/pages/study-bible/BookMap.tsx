/**
 * A book's map, drawn in the art kit's engraved hand (components/art/README.md):
 * ink lines, the sea and lakes as one blue tone block printed off register and
 * hatched, one mustard mark (Jerusalem, where the story ends). The places come
 * from the book's teaching data (intro.json `teaching.map`), placed by their
 * modern coordinates. It is a sketch, not a survey.
 *
 * Its own chunk: BookTeaching loads it only when it nears the screen, in a box
 * that holds its height. Every place is a 44px button in the list beside the
 * drawing (the keyboard path); the marks on the drawing answer a tap too.
 */
import { useId, useState } from "react";
import { Link } from "wouter";
import { MapPin } from "lucide-react";

import { chapterHref } from "@/lib/bible";
import type { BookTeaching } from "@/lib/bible-notes";

type Place = BookTeaching["map"][number];

// The frame: longitude 34.45 to 36.30 east, latitude 31.60 to 33.68 north.
// The margins east and west leave room for the names beside the marks.
const LON0 = 34.45;
const LAT0 = 33.68;
const K = 2; // drawing units per kilometre
const KM_LON = 94; // kilometres per degree of longitude near 32.5 degrees north
const KM_LAT = 111;
const W = Math.round((36.3 - LON0) * KM_LON * K);
const H = Math.round((LAT0 - 31.6) * KM_LAT * K);
const x = (lon: number) => +((lon - LON0) * KM_LON * K).toFixed(1);
const y = (lat: number) => +((LAT0 - lat) * KM_LAT * K).toFixed(1);
const pts = (list: [number, number][]) =>
  list.map(([la, lo]) => `${x(lo)},${y(la)}`).join(" ");

// Approximate outlines (latitude, longitude).
const COAST: [number, number][] = [
  [33.68, 35.43],
  [33.56, 35.37],
  [33.4, 35.27],
  [33.27, 35.19],
  [33.1, 35.11],
  [32.92, 35.07],
  [32.83, 34.96],
  [32.7, 34.93],
  [32.5, 34.89],
  [32.3, 34.84],
  [32.05, 34.75],
  [31.85, 34.68],
  [31.6, 34.56],
];
const SEA: [number, number][] = [[33.68, 34.3], ...COAST, [31.6, 34.3]];
const GALILEE: [number, number][] = [
  [32.89, 35.6],
  [32.87, 35.64],
  [32.8, 35.65],
  [32.71, 35.62],
  [32.7, 35.57],
  [32.74, 35.55],
  [32.79, 35.54],
  [32.86, 35.53],
];
const DEAD_SEA: [number, number][] = [
  [31.77, 35.47],
  [31.77, 35.56],
  [31.6, 35.58],
  [31.6, 35.46],
];
const JORDAN: [number, number][] = [
  [32.7, 35.57],
  [32.5, 35.56],
  [32.3, 35.55],
  [32.1, 35.53],
  [31.9, 35.54],
  [31.77, 35.55],
];
const UPPER_JORDAN: [number, number][] = [
  [33.25, 35.63],
  [33.05, 35.61],
  [32.89, 35.6],
];

/** Which side of its mark each name sits on, so close places do not collide. */
const LABEL: Record<
  string,
  { dx: number; dy: number; anchor: "start" | "end" | "middle" }
> = {
  capernaum: { dx: -10, dy: -6, anchor: "end" },
  bethsaida: { dx: 9, dy: -8, anchor: "start" },
  gerasenes: { dx: 10, dy: 12, anchor: "start" },
  jordan: { dx: 10, dy: 4, anchor: "start" },
  bethany: { dx: -2, dy: 19, anchor: "end" },
  jerusalem: { dx: -10, dy: 5, anchor: "end" },
  jericho: { dx: -10, dy: -4, anchor: "end" },
  tyre: { dx: 10, dy: 4, anchor: "start" },
  sidon: { dx: 10, dy: 4, anchor: "start" },
  nazareth: { dx: -10, dy: 5, anchor: "end" },
  caesarea: { dx: 0, dy: -12, anchor: "middle" },
  decapolis: { dx: 10, dy: 4, anchor: "start" },
};

/** "5:1" or "6:1-6" to the chapter's address at its first verse. */
function refHref(slug: string, ref: string) {
  const m = ref.match(/^(\d+):(\d+)/);
  return m ? `${chapterHref(slug, +m[1])}#v${m[2]}` : chapterHref(slug, 1);
}

export default function BookMap({
  slug,
  bookName,
  places,
}: {
  slug: string;
  bookName: string;
  places: Place[];
}) {
  const id = useId().replace(/:/g, "");
  const [sel, setSel] = useState<string>(places[0]?.id ?? "");
  const place = places.find(p => p.id === sel) ?? places[0];
  const hatch = `bkmap-hatch-${id}`;
  const water = (list: [number, number][]) => (
    <>
      <polygon className="pl-b" points={pts(list)} transform="translate(4 4)" />
      <polygon points={pts(list)} fill={`url(#${hatch})`} />
      <polygon className="pl-l" points={pts(list)} fill="none" />
    </>
  );

  return (
    <div className="bk-map">
      <figure className="bk-map__fig">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`A simple map of the places in ${bookName}, from Sidon in the north to Jerusalem in the south.`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern
              id={hatch}
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="3"
                x2="6"
                y2="3"
                className="pl-hatch"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect className="pl-paper" x="0" y="0" width={W} height={H} />
          {/* The Mediterranean: the coast as one tone block, off register, hatched. */}
          <polygon
            className="pl-b"
            points={pts(SEA)}
            transform="translate(4 4)"
          />
          <polygon points={pts(SEA)} fill={`url(#${hatch})`} />
          <polyline className="pl-l" points={pts(COAST)} />
          {water(GALILEE)}
          {water(DEAD_SEA)}
          <polyline className="pl-l" points={pts(JORDAN)} />
          <polyline
            className="pl-l"
            points={pts(UPPER_JORDAN)}
            strokeDasharray="5 4"
          />
          {/* Mount Hermon, a peak drawn in three strokes. */}
          <polyline
            className="pl-l"
            points={`${x(35.8)},${y(33.36)} ${x(35.86)},${y(33.42)} ${x(35.92)},${y(33.36)}`}
          />
          <polyline
            className="pl-f"
            points={`${x(35.83)},${y(33.37)} ${x(35.86)},${y(33.4)} ${x(35.89)},${y(33.37)}`}
          />
          {/* Regions, in small capitals. */}
          {(
            [
              ["GALILEE", 33.0, 35.22],
              ["SAMARIA", 32.28, 35.22],
              ["JUDEA", 31.63, 35.0],
            ] as const
          ).map(([t, la, lo]) => (
            <text key={t} x={x(lo)} y={y(la)} className="bk-map__region">
              {t}
            </text>
          ))}
          <text x={x(35.62)} y={y(32.15)} className="bk-map__region">
            <tspan x={x(35.62)}>BEYOND</tspan>
            <tspan x={x(35.62)} dy="13">
              THE JORDAN
            </tspan>
          </text>
          <text
            x={x(34.6)}
            y={y(32.25)}
            className="bk-map__region"
            transform={`rotate(-90 ${x(34.6)} ${y(32.25)})`}
          >
            THE GREAT SEA
          </text>
          {places.map(p => {
            const on = p.id === place?.id;
            const isRegion = p.id === "decapolis" || p.id === "gerasenes";
            const l = LABEL[p.id] ?? {
              dx: 10,
              dy: 4,
              anchor: "start" as const,
            };
            const cx = x(p.lon);
            const cy = y(p.lat);
            return (
              <g
                key={p.id}
                className="bk-map__place"
                data-on={on || undefined}
                onClick={() => setSel(p.id)}
                aria-hidden="true"
              >
                <circle cx={cx} cy={cy} r="16" fill="transparent" />
                {p.id === "jerusalem" ? (
                  <rect
                    className="pl-m"
                    x={cx - 7}
                    y={cy - 7}
                    width="14"
                    height="14"
                    stroke="var(--art-ink)"
                    strokeWidth="2.25"
                  />
                ) : isRegion ? (
                  <circle
                    className={on ? "pl-k" : "pl-o"}
                    cx={cx}
                    cy={cy}
                    r="6"
                    strokeDasharray="3 2"
                  />
                ) : (
                  <rect
                    className={on ? "pl-k" : "pl-o"}
                    x={cx - 5}
                    y={cy - 5}
                    width="10"
                    height="10"
                  />
                )}
                <text
                  x={cx + l.dx}
                  y={cy + l.dy}
                  textAnchor={l.anchor}
                  className="bk-map__name"
                >
                  {p.name.replace(/^(Region of the|The) /, "").replace(
                    / River$/,
                    ""
                  )}
                </text>
              </g>
            );
          })}
        </svg>
        <figcaption>
          A sketch, not a survey: places are set by their modern sites; the two
          regions are placed roughly.
        </figcaption>
      </figure>

      <div className="bk-map__side">
        <ul className="bk-map__list" aria-label={`Places in ${bookName}`}>
          {places.map(p => (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={p.id === place?.id}
                onClick={() => setSel(p.id)}
              >
                <MapPin aria-hidden="true" size={16} strokeWidth={1.75} />
                {p.name}
              </button>
            </li>
          ))}
        </ul>
        {place && (
          <div className="bk-map__card" aria-live="polite">
            <h3>{place.name}</h3>
            <p>{place.line}</p>
            <p className="bk-map__refs">
              {place.refs.map(r => (
                <Link key={r} href={refHref(slug, r)}>
                  {bookName} {r}
                </Link>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
