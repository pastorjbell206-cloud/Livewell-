/**
 * A book's map, drawn in the art kit's engraved hand (components/art/README.md):
 * ink lines, the sea and lakes as one blue tone block printed off register and
 * hatched, one mustard mark (Jerusalem, where the story ends). The places come
 * from the book's teaching data (intro.json `teaching.map`), placed by their
 * modern coordinates. It is a sketch, not a survey.
 *
 * A book names its frame in its data (lib/bible-notes.ts `MAP_FRAMES`): the
 * land of Jesus' day ("israel", the default), Canaan from Dan to the Negev
 * ("canaan"), or the Fertile Crescent from the Nile to the Persian Gulf
 * ("fertile-crescent"), or the eastern and central Mediterranean from Rome to
 * Jerusalem ("mediterranean"). Each frame draws its own coasts and rivers from
 * a few dozen points (docs/work/elite/wmap-ledger.md gives their sources).
 *
 * Its own chunk: BookTeaching loads it only when it nears the screen, in a box
 * that holds its height. Every place is a 44px button in the list beside the
 * drawing (the keyboard path); the marks on the drawing answer a tap too.
 */
import { useId, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { MapPin } from "lucide-react";

import { chapterHref } from "@/lib/bible";
import {
  bookMaps,
  MAP_FRAMES,
  type BookMapData,
  type BookTeaching,
  type MapFrameId,
  type MapPlace,
} from "@/lib/bible-notes";

type Place = MapPlace;
type LatLon = [number, number];

/** What a frame's drawing is given: the projection and the shared water hand. */
interface Pen {
  x: (lon: number) => number;
  y: (lat: number) => number;
  pts: (list: LatLon[]) => string;
  water: (list: LatLon[]) => ReactNode;
  hatch: string;
}

interface Frame {
  /** Kilometres per degree of longitude at the frame's middle latitude. */
  kmLon: number;
  /** Drawing units per kilometre. */
  k: number;
  /** How far the tone block sits off register. */
  shift: number;
  /** The description names the reach north to south (towns), or east to west (every place). */
  axis: "ns" | "ew";
  /** Half the side of a town's square mark, when a crowded frame needs smaller marks (default 5). */
  mark?: number;
  /** The caption's opening, before the count of regions. */
  sketch: string;
  draw: (pen: Pen) => ReactNode;
}

const KM_LAT = 111;

// ---- "israel": longitude 34.45 to 36.30 east, latitude 31.60 to 33.68 north.
// The margins east and west leave room for the names beside the marks.
// Approximate outlines (latitude, longitude).
const COAST: LatLon[] = [
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
const SEA: LatLon[] = [[33.68, 34.3], ...COAST, [31.6, 34.3]];
const GALILEE: LatLon[] = [
  [32.89, 35.6],
  [32.87, 35.64],
  [32.8, 35.65],
  [32.71, 35.62],
  [32.7, 35.57],
  [32.74, 35.55],
  [32.79, 35.54],
  [32.86, 35.53],
];
const DEAD_SEA: LatLon[] = [
  [31.77, 35.47],
  [31.77, 35.56],
  [31.6, 35.58],
  [31.6, 35.46],
];
const JORDAN: LatLon[] = [
  [32.7, 35.57],
  [32.5, 35.56],
  [32.3, 35.55],
  [32.1, 35.53],
  [31.9, 35.54],
  [31.77, 35.55],
];
const UPPER_JORDAN: LatLon[] = [
  [33.25, 35.63],
  [33.05, 35.61],
  [32.89, 35.6],
];

// ---- "canaan": the same land carried south past Gaza to Beersheba and the
// Negev, with the whole Dead Sea (its southern basin as it was before the
// modern evaporation ponds, roughly).
const COAST_SOUTH: LatLon[] = [
  [31.52, 34.45],
  [31.35, 34.29],
  [31.29, 34.22],
  [31.2, 34.06],
  [31.16, 33.9],
];
const CANAAN_COAST: LatLon[] = [[33.75, 35.46], ...COAST, ...COAST_SOUTH];
const CANAAN_SEA: LatLon[] = [[33.75, 33.8], ...CANAAN_COAST, [31.16, 33.8]];
const WHOLE_DEAD_SEA: LatLon[] = [
  [31.77, 35.47],
  [31.77, 35.56],
  [31.6, 35.58],
  [31.4, 35.58],
  [31.3, 35.52],
  [31.25, 35.45],
  [31.2, 35.53],
  [31.1, 35.5],
  [31.03, 35.44],
  [31.1, 35.4],
  [31.3, 35.4],
  [31.5, 35.44],
  [31.6, 35.46],
];

// ---- "fertile-crescent": longitude 29 to 49 east, latitude 28 to 38 north.
// The Mediterranean coast from Rhodes' side of Anatolia round to Alexandria.
const MED_COAST: LatLon[] = [
  [36.62, 28.9],
  [36.6, 29.12],
  [36.2, 29.64],
  [36.3, 30.15],
  [36.6, 30.56],
  [36.88, 30.7],
  [36.54, 32.0],
  [36.02, 32.83],
  [36.32, 33.88],
  [36.8, 34.63],
  [36.57, 35.38],
  [36.77, 35.79],
  [36.58, 36.17],
  [36.41, 35.88],
  [35.85, 35.83],
  [35.52, 35.78],
  [34.89, 35.88],
  [34.44, 35.83],
  [33.89, 35.5],
  [33.27, 35.19],
  [32.83, 34.96],
  [32.05, 34.75],
  [31.52, 34.45],
  [31.29, 34.22],
  [31.13, 33.8],
  [31.2, 33.1],
  [31.26, 32.3],
  [31.52, 31.84],
  [31.58, 31.1],
  [31.46, 30.37],
  [31.32, 30.06],
  [31.2, 29.92],
  [30.85, 28.9],
];
const MED: LatLon[] = [...MED_COAST, [30.85, 28.8], [36.62, 28.8]];
const CYPRUS: LatLon[] = [
  [35.05, 32.27],
  [34.75, 32.4],
  [34.57, 33.02],
  [34.92, 33.63],
  [34.96, 34.08],
  [35.12, 33.94],
  [35.7, 34.59],
  [35.45, 34.05],
  [35.34, 33.32],
  [35.4, 32.92],
  [35.18, 32.88],
];
const GULF_SUEZ: LatLon[] = [
  [29.97, 32.55],
  [29.6, 32.36],
  [29.1, 32.66],
  [28.36, 33.08],
  [27.9, 33.3],
  [27.9, 33.95],
  [28.24, 33.62],
  [28.9, 33.18],
  [29.6, 32.72],
];
const GULF_AQABA: LatLon[] = [
  [29.54, 34.97],
  [29.49, 34.9],
  [29.03, 34.67],
  [28.5, 34.51],
  [27.9, 34.42],
  [27.9, 34.72],
  [28.5, 34.8],
  [29.0, 34.86],
  [29.3, 34.95],
];
const GULF_HEAD: LatLon[] = [
  [29.95, 48.55],
  [30.05, 49.2],
  [27.9, 49.2],
  [27.9, 48.62],
  [28.42, 48.5],
  [28.9, 48.25],
  [29.35, 48.05],
  [29.45, 47.75],
  [29.55, 47.85],
  [29.8, 48.2],
];
const NILE: LatLon[] = [
  [27.9, 30.78],
  [28.1, 30.75],
  [28.6, 30.9],
  [29.07, 31.1],
  [29.5, 31.22],
  [30.05, 31.23],
  [30.19, 31.13],
];
const ROSETTA: LatLon[] = [
  [30.19, 31.13],
  [30.6, 30.85],
  [31.0, 30.6],
  [31.4, 30.42],
  [31.46, 30.37],
];
const DAMIETTA: LatLon[] = [
  [30.19, 31.13],
  [30.46, 31.18],
  [31.04, 31.38],
  [31.42, 31.82],
  [31.52, 31.84],
];
const EUPHRATES: LatLon[] = [
  [38.1, 38.75],
  [37.58, 38.48],
  [37.03, 37.98],
  [36.82, 38.01],
  [35.85, 38.55],
  [35.95, 39.01],
  [35.33, 40.14],
  [34.45, 40.94],
  [34.47, 41.99],
  [34.13, 42.38],
  [33.64, 42.83],
  [33.42, 43.3],
  [33.35, 43.78],
  [32.54, 44.42],
  [32.03, 44.4],
  [31.31, 45.28],
  [31.05, 46.27],
  [30.88, 46.47],
  [30.95, 47.0],
  [31.0, 47.43],
];
const TIGRIS: LatLon[] = [
  [38.1, 39.9],
  [37.91, 40.24],
  [37.71, 41.41],
  [37.33, 42.19],
  [36.34, 43.13],
  [34.61, 43.68],
  [34.2, 43.87],
  [33.31, 44.36],
  [32.51, 45.82],
  [31.84, 47.14],
  [31.0, 47.43],
];
const SHATT: LatLon[] = [
  [31.0, 47.43],
  [30.51, 47.81],
  [30.2, 48.25],
  [29.95, 48.55],
];
const JORDAN_FAR: LatLon[] = [
  [33.25, 35.63],
  [32.8, 35.6],
  [31.77, 35.55],
];
const DEAD_SEA_FAR: LatLon[] = [
  [31.77, 35.47],
  [31.77, 35.58],
  [31.05, 35.47],
  [31.05, 35.38],
];

// ---- "mediterranean": longitude 11.5 to 37.6 east, latitude 30.6 to 42.3
// north. Rome and Sicily to Antioch and Jerusalem, Macedonia to the coast of
// Libya and Egypt. The sea is the whole frame, toned and hatched; the lands
// are laid over it as paper, the Black Sea and the Sea of Marmara cut back in
// as water. Points beyond the frame only close the shapes.
const ITALY: LatLon[] = [
  [42.5, 11.2],
  [42.33, 11.6],
  [42.22, 11.7],
  [42.09, 11.79],
  [41.95, 12.07],
  [41.77, 12.22],
  [41.45, 12.62],
  [41.22, 13.07],
  [41.28, 13.25],
  [41.21, 13.57],
  [41.02, 13.93],
  [40.82, 14.08],
  [40.84, 14.25],
  [40.63, 14.37],
  [40.57, 14.33],
  [40.68, 14.76],
  [40.35, 14.99],
  [40.03, 15.27],
  [40.07, 15.63],
  [39.81, 15.79],
  [39.36, 16.04],
  [38.9, 16.2],
  [38.68, 15.9],
  [38.43, 15.9],
  [38.25, 15.72],
  [38.11, 15.65],
  [37.92, 15.78],
  [37.93, 16.06],
  [38.24, 16.26],
  [38.69, 16.55],
  [38.91, 17.05],
  [39.08, 17.13],
  [39.4, 17.15],
  [39.75, 16.5],
  [40.2, 16.68],
  [40.37, 16.83],
  [40.47, 17.24],
  [40.26, 17.89],
  [40.06, 17.97],
  [39.8, 18.37],
  [40.15, 18.49],
  [40.39, 18.31],
  [40.64, 17.94],
  [40.95, 17.3],
  [41.13, 16.87],
  [41.32, 16.28],
  [41.63, 15.92],
  [41.88, 16.18],
  [41.93, 15.88],
  [42.0, 14.99],
  [42.12, 14.71],
  [42.35, 14.4],
  [42.5, 14.2],
];
const SICILY: LatLon[] = [
  [38.27, 15.65],
  [38.19, 15.55],
  [37.85, 15.29],
  [37.5, 15.09],
  [37.23, 15.22],
  [37.07, 15.29],
  [36.69, 15.15],
  [36.73, 14.85],
  [36.89, 14.43],
  [37.06, 14.25],
  [37.1, 13.94],
  [37.27, 13.58],
  [37.5, 13.08],
  [37.65, 12.59],
  [37.8, 12.45],
  [38.02, 12.51],
  [38.18, 12.73],
  [38.03, 12.88],
  [38.12, 13.36],
  [38.04, 14.02],
  [38.16, 14.75],
  [38.27, 15.24],
];
const MALTA: LatLon[] = [
  [36.08, 14.26],
  [36.03, 14.18],
  [35.99, 14.3],
  [35.85, 14.37],
  [35.82, 14.48],
  [35.84, 14.57],
  [35.9, 14.52],
  [35.97, 14.41],
  [36.04, 14.31],
];
const CRETE: LatLon[] = [
  [35.6, 23.6],
  [35.5, 23.66],
  [35.69, 23.75],
  [35.52, 24.02],
  [35.6, 24.15],
  [35.47, 24.25],
  [35.37, 24.47],
  [35.34, 25.13],
  [35.29, 25.47],
  [35.19, 25.72],
  [35.21, 26.1],
  [35.31, 26.31],
  [35.1, 26.26],
  [35.0, 26.08],
  [35.0, 25.74],
  [34.98, 25.3],
  [34.93, 24.8],
  [34.92, 24.72],
  [35.1, 24.69],
  [35.18, 24.39],
  [35.2, 24.14],
  [35.23, 23.68],
  [35.27, 23.53],
  [35.49, 23.57],
];
/** The Balkans, Asia Minor, the Levant, Egypt and Libya as one land, closed round the frame's south, east and north. */
const EAST_LAND: LatLon[] = [
  [42.5, 18.6],
  [42.29, 18.84],
  [42.09, 19.09],
  [41.92, 19.2],
  [41.81, 19.59],
  [41.32, 19.45],
  [40.8, 19.38],
  [40.47, 19.49],
  [40.42, 19.3],
  [40.1, 19.74],
  [39.87, 20.0],
  [39.5, 20.27],
  [39.28, 20.4],
  [38.95, 20.75],
  [38.53, 21.08],
  [38.37, 21.43],
  [38.33, 21.77],
  [38.43, 22.42],
  [37.94, 22.95],
  [38.01, 22.75],
  [38.25, 22.08],
  [38.3, 21.78],
  [38.25, 21.73],
  [38.17, 21.38],
  [37.64, 21.32],
  [37.25, 21.67],
  [36.91, 21.7],
  [36.72, 21.88],
  [37.02, 22.11],
  [36.39, 22.48],
  [36.76, 22.57],
  [36.44, 23.2],
  [36.69, 23.05],
  [37.17, 22.86],
  [37.57, 22.8],
  [37.38, 23.25],
  [37.43, 23.53],
  [37.63, 23.16],
  [37.92, 22.99],
  [37.98, 23.35],
  [37.94, 23.64],
  [37.8, 23.78],
  [37.65, 24.02],
  [38.02, 24.01],
  [38.32, 23.77],
  [38.46, 23.6],
  [38.65, 23.0],
  [38.87, 22.6],
  [39.36, 22.94],
  [39.15, 23.25],
  [39.75, 22.83],
  [40.27, 22.6],
  [40.64, 22.94],
  [40.24, 23.28],
  [39.96, 23.4],
  [40.12, 23.55],
  [39.98, 23.92],
  [40.22, 23.9],
  [40.15, 24.4],
  [40.4, 23.88],
  [40.52, 23.83],
  [40.94, 24.41],
  [40.85, 24.7],
  [40.99, 25.13],
  [40.85, 25.87],
  [40.72, 26.08],
  [40.62, 26.8],
  [40.04, 26.18],
  [40.0, 26.2],
  [39.48, 26.07],
  [39.49, 26.34],
  [39.58, 26.9],
  [39.32, 26.69],
  [39.07, 26.89],
  [38.8, 26.97],
  [38.42, 27.14],
  [38.64, 26.51],
  [38.32, 26.3],
  [38.2, 26.79],
  [37.86, 27.26],
  [37.68, 27.1],
  [37.37, 27.27],
  [37.24, 27.6],
  [37.03, 27.43],
  [36.69, 27.37],
  [36.85, 28.27],
  [36.7, 28.8],
  ...MED_COAST,
  [31.35, 27.24],
  [31.56, 25.16],
  [31.76, 25.08],
  [32.08, 23.96],
  [32.6, 23.1],
  [32.77, 22.64],
  [32.9, 22.17],
  [32.9, 21.97],
  [32.71, 20.95],
  [32.53, 20.57],
  [32.12, 20.07],
  [30.95, 20.05],
  [30.4, 19.58],
  [30.5, 18.57],
  [30.8, 18.1],
  [31.21, 16.59],
  [31.4, 15.73],
  [32.38, 15.09],
  [32.65, 14.26],
  [32.9, 13.18],
  [32.93, 12.08],
  [33.15, 11.56],
  [33.3, 11.2],
  [30.3, 11.2],
  [30.3, 37.8],
  [42.5, 37.8],
];
const EUBOEA: LatLon[] = [
  [39.03, 23.0],
  [38.95, 23.35],
  [38.63, 24.1],
  [38.16, 24.6],
  [38.0, 24.42],
  [38.3, 24.0],
  [38.46, 23.62],
  [38.75, 23.2],
];
const LESBOS: LatLon[] = [
  [39.38, 26.2],
  [39.33, 26.6],
  [39.1, 26.56],
  [38.97, 26.37],
  [39.08, 26.0],
  [39.2, 25.85],
];
const CHIOS: LatLon[] = [
  [38.6, 26.0],
  [38.55, 26.15],
  [38.37, 26.15],
  [38.25, 25.98],
  [38.37, 25.86],
  [38.5, 25.88],
];
const SAMOS: LatLon[] = [
  [37.8, 26.6],
  [37.78, 26.95],
  [37.7, 27.06],
  [37.65, 26.8],
  [37.7, 26.6],
];
const RHODES: LatLon[] = [
  [36.45, 28.22],
  [36.1, 28.08],
  [35.88, 27.76],
  [36.1, 27.73],
  [36.3, 27.9],
];
const MARMARA: LatLon[] = [
  [40.41, 26.67],
  [40.98, 27.51],
  [41.07, 28.25],
  [41.0, 28.98],
  [40.82, 29.3],
  [40.76, 29.92],
  [40.43, 29.15],
  [40.37, 28.88],
  [40.35, 27.97],
  [40.4, 27.79],
  [40.4, 27.3],
  [40.34, 26.69],
];
const DARDANELLES: LatLon[] = [
  [40.04, 26.18],
  [40.15, 26.4],
  [40.41, 26.67],
];
const BLACK_SEA: LatLon[] = [
  [42.5, 27.6],
  [42.17, 27.85],
  [41.87, 27.98],
  [41.63, 28.1],
  [41.23, 29.11],
  [41.18, 29.61],
  [41.18, 30.2],
  [41.09, 31.12],
  [41.28, 31.42],
  [41.45, 31.79],
  [41.75, 32.39],
  [41.89, 33.0],
  [41.98, 33.76],
  [42.1, 34.94],
  [42.03, 35.15],
  [41.8, 35.2],
  [41.73, 35.95],
  [41.29, 36.33],
  [41.25, 36.7],
  [41.13, 37.29],
  [41.05, 37.8],
  [42.5, 37.8],
];
const MED_LANDS = [ITALY, SICILY, MALTA, CRETE, CYPRUS, EAST_LAND, EUBOEA, LESBOS, CHIOS, SAMOS, RHODES];

const SKETCH = "A sketch, not a survey: places are set by their modern sites";

const FRAMES: Record<MapFrameId, Frame> = {
  israel: {
    kmLon: 94,
    k: 2,
    shift: 4,
    axis: "ns",
    sketch: SKETCH,
    draw: ({ x, y, pts, water, hatch }) => (
      <>
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
      </>
    ),
  },
  canaan: {
    kmLon: 94,
    k: 1.5,
    shift: 4,
    axis: "ns",
    sketch: SKETCH,
    draw: ({ x, y, pts, water, hatch }) => (
      <>
        <polygon
          className="pl-b"
          points={pts(CANAAN_SEA)}
          transform="translate(4 4)"
        />
        <polygon points={pts(CANAAN_SEA)} fill={`url(#${hatch})`} />
        <polyline className="pl-l" points={pts(CANAAN_COAST)} />
        {water(GALILEE)}
        {water(WHOLE_DEAD_SEA)}
        <polyline className="pl-l" points={pts(JORDAN)} />
        <polyline
          className="pl-l"
          points={pts(UPPER_JORDAN)}
          strokeDasharray="5 4"
        />
        {(
          [
            ["THE NEGEV", 30.98, 34.62],
          ] as const
        ).map(([t, la, lo]) => (
          <text key={t} x={x(lo)} y={y(la)} className="bk-map__region">
            {t}
          </text>
        ))}
        <text
          x={x(34.38)}
          y={y(32.55)}
          className="bk-map__region"
          transform={`rotate(-90 ${x(34.38)} ${y(32.55)})`}
        >
          THE GREAT SEA
        </text>
      </>
    ),
  },
  "fertile-crescent": {
    kmLon: 93,
    k: 0.28,
    shift: 2,
    axis: "ew",
    sketch: `${SKETCH}, and the coasts and rivers as they are now, not as they were then`,
    draw: ({ x, y, pts, water, hatch }) => (
      <>
        {/* The Great Sea, with Cyprus left as paper. */}
        <polygon
          className="pl-b"
          points={pts(MED)}
          transform="translate(3 3)"
        />
        <polygon points={pts(MED)} fill={`url(#${hatch})`} />
        <polyline className="pl-l" points={pts(MED_COAST)} />
        <polygon className="pl-o" points={pts(CYPRUS)} />
        {water(GULF_SUEZ)}
        {water(GULF_AQABA)}
        {water(GULF_HEAD)}
        {water(DEAD_SEA_FAR)}
        {/* The rivers: the Nile and its two branches; the Euphrates and the
            Tigris, meeting near Qurna and running on to the Gulf. */}
        {[NILE, ROSETTA, DAMIETTA, EUPHRATES, TIGRIS, SHATT, JORDAN_FAR].map(
          (r, i) => (
            <polyline key={i} className="bk-map__river" points={pts(r)} />
          )
        )}
        {(
          [
            ["THE GREAT SEA", 33.0, 29.5],
            ["EGYPT", 28.3, 31.25],
            ["THE DESERT", 31.4, 39.6],
          ] as const
        ).map(([t, la, lo]) => (
          <text key={t} x={x(lo)} y={y(la)} className="bk-map__region">
            {t}
          </text>
        ))}
        {/* The rivers' names, in italic beside them. */}
        {(
          [
            ["Euphrates", 34.0, 40.9, "end"],
            ["Tigris", 35.3, 43.9, "start"],
            ["Nile", 29.5, 30.95, "end"],
          ] as const
        ).map(([t, la, lo, a]) => (
          <text
            key={t}
            x={x(lo)}
            y={y(la)}
            textAnchor={a}
            className="bk-map__water"
          >
            {t}
          </text>
        ))}
      </>
    ),
  },
  mediterranean: {
    kmLon: 89,
    k: 0.225,
    shift: 2,
    axis: "ew",
    mark: 3,
    sketch: `${SKETCH}, and the coasts as they are now, not as they were then`,
    draw: ({ x, y, pts, water, hatch }) => (
      <>
        {/* The Great Sea fills the frame: its tone, the lands' paper laid
            over it off register, the hatching, then the lands in register. */}
        <rect className="pl-b" x="0" y="0" width="100%" height="100%" />
        {MED_LANDS.map((l, i) => (
          <polygon
            key={`t${i}`}
            className="pl-paper"
            points={pts(l)}
            transform="translate(2 2)"
          />
        ))}
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${hatch})`} />
        {MED_LANDS.map((l, i) => (
          <polygon
            key={`l${i}`}
            className="pl-o"
            points={pts(l)}
            strokeWidth="1.5"
          />
        ))}
        {water(BLACK_SEA)}
        {water(MARMARA)}
        {water(DEAD_SEA_FAR)}
        {[ROSETTA, DAMIETTA, DARDANELLES].map((r, i) => (
          <polyline key={i} className="bk-map__river" points={pts(r)} />
        ))}
        {(
          [
            ["THE GREAT SEA", 33.9, 14.0, "start"],
            ["ITALY", 39.95, 16.1, "start"],
            ["MACEDONIA", 41.75, 20.6, "start"],
            ["ACHAIA", 36.9, 21.6, "start"],
            ["ASIA", 38.75, 28.6, "start"],
            ["GALATIA", 39.5, 31.6, "start"],
            ["JUDEA", 31.0, 37.4, "end"],
          ] as const
        ).map(([t, la, lo, a]) => (
          <text
            key={t}
            x={x(lo)}
            y={y(la)}
            textAnchor={a}
            className="bk-map__region"
          >
            {t}
          </text>
        ))}
        {/* Syria has no room across the narrow land east of the coast. */}
        <text
          x={x(37.35)}
          y={y(34.0)}
          className="bk-map__region"
          transform={`rotate(-90 ${x(37.35)} ${y(34.0)})`}
        >
          SYRIA
        </text>
      </>
    ),
  },
};

/** A frame's size and projection: the same numbers OneMap uses. */
export function frameGeometry(frameId: MapFrameId) {
  const f = FRAMES[frameId];
  const b = MAP_FRAMES[frameId];
  const W = Math.round((b.east - b.west) * f.kmLon * f.k);
  const H = Math.round((b.north - b.south) * KM_LAT * f.k);
  const x = (lon: number) => +((lon - b.west) * f.kmLon * f.k).toFixed(1);
  const y = (lat: number) => +((b.north - lat) * KM_LAT * f.k).toFixed(1);
  const pts = (list: LatLon[]) =>
    list.map(([la, lo]) => `${x(lo)},${y(la)}`).join(" ");
  return { W, H, x, y, pts, half: f.mark ?? 5, sketch: f.sketch };
}

/**
 * A frame's drawing alone (its paper, seas, coasts, rivers and region names),
 * for another page that draws its own marks on the same frame: the Bible
 * Explorer's Paul's travels. `hatch` is a unique id for its pattern.
 */
export function FrameArt({
  frameId,
  hatch,
}: {
  frameId: MapFrameId;
  hatch: string;
}) {
  const f = FRAMES[frameId];
  const { W, H, x, y, pts } = frameGeometry(frameId);
  const water = (list: LatLon[]) => (
    <>
      <polygon
        className="pl-b"
        points={pts(list)}
        transform={`translate(${f.shift} ${f.shift})`}
      />
      <polygon points={pts(list)} fill={`url(#${hatch})`} />
      <polygon className="pl-l" points={pts(list)} fill="none" />
    </>
  );
  // Its own viewport, so the frame's "100%" fills mean the whole frame
  // even when the page crops the view to one part of it.
  return (
    <svg x="0" y="0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible">
      <defs>
        <pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse">
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
      {f.draw({ x, y, pts, water, hatch })}
    </svg>
  );
}

/** Which side of its mark each name sits on, so close places do not collide. */
export const LABEL: Record<
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

const COUNT = ["", "", "two", "three", "four", "five", "six", "seven", "eight"];

/** "5:1" or "6:1-6" to the chapter's address at its first verse. */
function refHref(slug: string, ref: string) {
  const m = ref.match(/^(\d+):(\d+)/);
  return m ? `${chapterHref(slug, +m[1])}#v${m[2]}` : chapterHref(slug, 1);
}

/** One map: its frame, its drawing, the list of its places and the card. */
function OneMap({
  slug,
  bookName,
  map,
}: {
  slug: string;
  bookName: string;
  map: BookMapData;
}) {
  const { frame: frameId, title, places } = map;
  const f = FRAMES[frameId];
  const b = MAP_FRAMES[frameId];
  const W = Math.round((b.east - b.west) * f.kmLon * f.k);
  const H = Math.round((b.north - b.south) * KM_LAT * f.k);
  const x = (lon: number) => +((lon - b.west) * f.kmLon * f.k).toFixed(1);
  const y = (lat: number) => +((b.north - lat) * KM_LAT * f.k).toFixed(1);
  const pts = (list: LatLon[]) =>
    list.map(([la, lo]) => `${x(lo)},${y(la)}`).join(" ");

  const id = useId().replace(/:/g, "");
  const isRegion = (p: Place) =>
    p.region ?? (p.id === "decapolis" || p.id === "gerasenes");
  const towns = places.filter(p => !isRegion(p));
  const regions = places.length - towns.length;
  // The reach the hidden description names. North to south: the farthest
  // town each way; towns within about five kilometres of it count as the
  // same spot, and the one the book lists first (its main place) is named.
  // East to west, on a wide frame: every place, regions too (Egypt is a
  // region), and the northernmost besides.
  let reach = "";
  if (f.axis === "ns") {
    const lats = towns.map(p => p.lat);
    const north = towns.find(p => p.lat > Math.max(...lats) - 0.05);
    const south = towns.find(p => p.lat < Math.min(...lats) + 0.05);
    if (north && south && north !== south)
      reach = `, from ${north.name} in the north to ${south.name} in the south`;
  } else {
    const by = (k: (p: Place) => number) =>
      places.reduce<Place | undefined>((a, p) => (!a || k(p) > k(a) ? p : a), undefined);
    const east = by(p => p.lon);
    const west = by(p => -p.lon);
    const north = by(p => p.lat);
    if (east && west && east !== west)
      reach = `, from ${east.name} in the east to ${west.name} in the west${north && north !== east && north !== west ? `, with ${north.name} in the north` : ""}`;
  }
  const [sel, setSel] = useState<string>(places[0]?.id ?? "");
  const place = places.find(p => p.id === sel) ?? places[0];
  const hatch = `bkmap-hatch-${id}`;
  const water = (list: LatLon[]) => (
    <>
      <polygon
        className="pl-b"
        points={pts(list)}
        transform={`translate(${f.shift} ${f.shift})`}
      />
      <polygon points={pts(list)} fill={`url(#${hatch})`} />
      <polygon className="pl-l" points={pts(list)} fill="none" />
    </>
  );
  const Card = title ? "h4" : "h3";
  const half = f.mark ?? 5;

  return (
    <div className="bk-map" data-frame={frameId}>
      {title && <h3 className="bk-map__title">{title}</h3>}
      <figure className="bk-map__fig">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`A simple map of the places in ${bookName}${reach}.`}
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
          {f.draw({ x, y, pts, water, hatch })}
          {places.map(p => {
            const on = p.id === place?.id;
            const region = isRegion(p);
            const l: Exclude<Place["label"], false | undefined> | null =
              p.label === false
                ? null
                : (p.label ??
                  LABEL[p.id] ?? {
                    dx: 10,
                    dy: 4,
                    anchor: "start" as const,
                  });
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
                    x={cx - half - 2}
                    y={cy - half - 2}
                    width={2 * half + 4}
                    height={2 * half + 4}
                    stroke="var(--art-ink)"
                    strokeWidth="2.25"
                  />
                ) : region ? (
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
                    x={cx - half}
                    y={cy - half}
                    width={2 * half}
                    height={2 * half}
                  />
                )}
                {l && (
                  <text
                    x={cx + l.dx}
                    y={cy + l.dy}
                    textAnchor={l.anchor}
                    className="bk-map__name"
                  >
                    {l.text ??
                      p.name
                        .replace(/^(Region of the|The) /, "")
                        .replace(/ River$/, "")}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <figcaption>
          {f.sketch}
          {regions === 0
            ? "."
            : regions === 1
              ? "; the region is placed roughly."
              : `; the ${COUNT[regions] ?? regions} regions are placed roughly.`}
        </figcaption>
      </figure>

      <div className="bk-map__side">
        <ul
          className="bk-map__list"
          aria-label={`Places in ${bookName}${title ? `: ${title}` : ""}`}
        >
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
            <Card>{place.name}</Card>
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

/**
 * Every map a book's data gives: one on the default frame for a bare list of
 * places (the four Gospels), or each named map in turn (Genesis: the long
 * journey, then Canaan close up).
 */
export default function BookMap({
  slug,
  bookName,
  places,
}: {
  slug: string;
  bookName: string;
  places: BookTeaching["map"];
}) {
  const maps = bookMaps(places);
  return (
    <>
      {maps.map(m => (
        <OneMap key={m.frame} slug={slug} bookName={bookName} map={m} />
      ))}
    </>
  );
}
