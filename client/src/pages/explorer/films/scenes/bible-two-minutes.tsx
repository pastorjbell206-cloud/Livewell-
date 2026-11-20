/**
 * "The whole Bible in two minutes": the map's road, drawn as the story goes.
 *
 * On the left the road winds in three rows from the garden to the city, with
 * a faint ring where each of the thirteen stops will stand. Each frame inks
 * the road a little further, and the stops of that movement appear on it as
 * the map's own roundels (art.tsx), so the film and the map are one world. On
 * the right, the movement's emblem is shown large. The one mustard mark is the
 * traveller, a small disc that goes along the road to where the story is.
 *
 * Poster (frame -1): the route faint and empty, and on the right the garden
 * and the city, the first stop and the last.
 */
import type { ReactNode } from "react";
import { Roundel } from "../../art";
import { Fade, Travel, type FilmDrawing } from "../motion";

/** The road: right along the top, back along the middle, right along the bottom. */
const ROAD = "M20,80H450C510,80 510,250 450,250H90C30,250 30,420 90,420H500";

/** Where each stop stands on the road. */
const AT: Record<string, [number, number]> = {
  creation: [70, 80],
  fall: [170, 80],
  abraham: [270, 80],
  rescue: [370, 80],
  sinai: [430, 250],
  land: [330, 250],
  kingdom: [230, 250],
  exile: [130, 250],
  return: [45, 335],
  jesus: [150, 420],
  cross: [250, 420],
  church: [350, 420],
  "new-creation": [450, 420],
};

/** The stops each frame brings onto the road, in order. */
const FRAMES: string[][] = [
  ["creation"],
  ["fall"],
  ["abraham"],
  ["rescue", "sinai"],
  ["land", "kingdom"],
  ["exile", "return"],
  ["jesus", "cross"],
  ["church"],
  ["new-creation"],
];

/** How much of the road is inked at each frame (poster first). */
const INKED = [0, 0.05, 0.11, 0.17, 0.43, 0.55, 0.7, 0.87, 0.93, 1];

/** Where the traveller stands at each frame (poster first): just past the newest stop. */
const TRAVELLER: [number, number][] = [
  [20, 80],
  [118, 80],
  [218, 80],
  [318, 80],
  [380, 250],
  [180, 250],
  [66, 400],
  [300, 420],
  [400, 420],
  [496, 420],
];

const R = 30;
const frameOf = (slug: string) => FRAMES.findIndex(f => f.includes(slug));

/** The large emblems on the right: one centred, or two on a diagonal. */
function Big({ slugs }: { slugs: string[] }) {
  if (slugs.length === 1)
    return <Roundel slug={slugs[0]} at={{ x: 562, y: 112, size: 206 }} />;
  return (
    <>
      <Roundel slug={slugs[0]} at={{ x: 546, y: 46, size: 156 }} />
      <Roundel slug={slugs[1]} at={{ x: 622, y: 254, size: 156 }} />
    </>
  );
}

const ring = (x: number, y: number, r: number) =>
  `M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;

const film: FilmDrawing = {
  w: 800,
  h: 500,
  draw: (h, frame) => {
    const k = frame + 1;
    const panel: ReactNode[] = FRAMES.map((slugs, i) => (
      <Fade key={slugs.join()} frame={frame} on={i} off={i + 1} from="grow">
        <Big slugs={slugs} />
      </Fade>
    ));
    return (
      <>
        {/* The panel on the right: a lightly hatched plate. */}
        <path fill={h.hs} d="M530,20H782V480H530Z" />
        <path className="pl-f" d="M530,20H782V480H530Z" />

        {/* The route ahead, faint and dotted. */}
        <path className="pl-f" strokeDasharray="3 7" d={ROAD} />

        {/* The road, inked as far as the story has come. */}
        <path
          d={ROAD}
          pathLength={1}
          className="mv-road"
          fill="none"
          stroke="var(--art-ink)"
          strokeWidth={22}
          style={{ strokeDashoffset: 1 - INKED[k] }}
        />
        <path
          d={ROAD}
          pathLength={1}
          className="mv-road"
          fill="none"
          stroke="var(--art-paper)"
          strokeWidth={16.5}
          style={{ strokeDashoffset: 1 - INKED[k] }}
        />

        {/* Every stop's place, a faint ring; its roundel once the story reaches it. */}
        {Object.entries(AT).map(([slug, [x, y]]) => (
          <g key={slug}>
            <path className="pl-paper" d={ring(x, y, R)} />
            <path className="pl-f" strokeDasharray="2 4" d={ring(x, y, R)} />
            <Fade frame={frame} on={frameOf(slug)} from="grow">
              <Roundel
                slug={slug}
                at={{ x: x - R - 2, y: y - R - 2, size: 2 * R + 4 }}
              />
            </Fade>
          </g>
        ))}

        {/* The traveller: the one mustard mark. */}
        <Travel frame={k} at={TRAVELLER}>
          <path className="pl-m" d={ring(0, 0, 8)} />
          <path className="pl-l" d={ring(0, 0, 8)} />
        </Travel>

        {/* The poster's panel: the garden and the city, first and last. */}
        <Fade frame={frame} on={-1} off={0}>
          <path className="pl-f" strokeDasharray="3 6" d="M620,190L700,300" />
          <Big slugs={["creation", "new-creation"]} />
        </Fade>
        {panel}
      </>
    );
  },
};

export default film;
