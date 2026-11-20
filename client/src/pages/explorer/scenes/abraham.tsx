/**
 * Abraham and the Promise (Genesis 15:5): night in the desert, Abraham
 * outside his tent, his arm raised to a sky too full of stars to count. One
 * mustard mark: the brightest star.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

/** Stars placed by a fixed rule, so the picture is the same on every load. */
const STARS: [number, number, number][] = (() => {
  const out: [number, number, number][] = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 140; i++) {
    const x = Math.round(rnd() * 790) + 5;
    const y = Math.round(rnd() * 380) + 6;
    if (Math.abs(x - 560) < 40 && Math.abs(y - 110) < 40) continue;
    out.push([x, y, rnd() < 0.18 ? 3.6 : rnd() < 0.5 ? 2.2 : 1.4]);
  }
  return out;
})();

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "Abraham outside his tent at night, looking up at a sky full of stars.",
  draw: h => (
    <>
      <path fill={h.h3} d="M0,0H800V430H0Z" />
      {STARS.map(([x, y, r]) => (
        <circle
          key={`${x},${y}`}
          className="pl-paper"
          cx={x}
          cy={y}
          r={r + 1.2}
        />
      ))}
      {STARS.filter(([, , r]) => r > 3).map(([x, y]) => (
        <path
          key={`r${x},${y}`}
          className="pl-f"
          d={`M${x - 9},${y}H${x + 9}M${x},${y - 9}V${y + 9}`}
        />
      ))}
      {/* The brightest star. */}
      <path
        className="pl-paper"
        d="M560,70l9,28l30,4l-30,8l-9,28l-9,-28l-30,-8l30,-4Z"
      />
      <path
        className="pl-m"
        d="M560,80l7,20l22,3l-22,6l-7,20l-7,-20l-22,-6l22,-3Z"
      />
      <path
        className="pl-l"
        d="M560,70l9,28l30,4l-30,8l-9,28l-9,-28l-30,-8l30,-4Z"
      />
      {/* The ground and the dunes. */}
      <Shape
        d="M0,430C120,400 260,420 400,430S680,404 800,420V600H0Z"
        tone="c"
        off={5}
      />
      <path fill={h.hh} d="M0,540H800V600H0Z" />
      <path
        className="pl-f"
        d="M40,470c40,-8 80,-8 120,0M520,480c50,-8 100,-8 150,0M260,520c50,-8 100,-8 150,0"
      />
      {/* The tent. */}
      <Shape d="M90,470L210,300L350,470Z" tone="c" />
      <path fill={h.h2} d="M210,300L350,470H250Z" />
      <path className="pl-k" d="M196,470L216,370L246,470Z" />
      <path
        className="pl-l"
        d="M210,300V286M90,470L52,500M350,470L392,500M150,384L110,470M290,384L330,470"
      />
      <path className="pl-f" d="M120,430L300,430M140,400L280,400" />
      {/* Abraham: robe, head, an arm raised to the stars, a staff in the other hand (no face, in the site's hand). */}
      <path className="pl-o" d="M444,312a17,17 0 1,0 34,0a17,17 0 1,0 -34,0Z" />
      <path fill={h.h1} d="M461,295a17,17 0 0 1 0,34Z" />
      <Shape d="M438,336H484L500,470H422Z" tone="b" />
      <path fill={h.h1} d="M461,336H484L500,470H461Z" />
      <path className="pl-l" d="M484,344L530,262M530,262l10,-8" />
      <path className="pl-l" d="M410,300V478M438,352L410,380" />
      <path className="pl-f" d="M430,400H492M428,430H496" />
      {/* Sheep asleep. */}
      <Shape
        d="M590,470c-4,-18 14,-26 26,-20c8,-10 28,-8 30,6c14,2 16,20 4,26c-6,10 -24,10 -30,2c-12,6 -32,4 -30,-14Z"
        tone="b"
        off={3}
      />
      <path className="pl-k" d="M582,462a9,8 0 1,0 18,0a9,8 0 1,0 -18,0Z" />
      <Shape
        d="M680,492c-3,-14 11,-20 20,-15c6,-8 22,-6 23,5c11,2 12,16 3,20c-5,8 -19,8 -23,2c-9,5 -25,3 -23,-12Z"
        tone="b"
        off={3}
      />
      <path className="pl-k" d="M674,486a8,7 0 1,0 16,0a8,7 0 1,0 -16,0Z" />
    </>
  ),
};

export default scene;
