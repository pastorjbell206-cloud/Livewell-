/**
 * Creation (Genesis 1 to 2), in the engraved hand. The picture is built to
 * be read: darkness on the left, light breaking on the right (day 1); the
 * sky over the sea (day 2); dry land and trees (day 3); the sun, the moon and
 * the stars (day 4); fish and birds (day 5); animals and a man and a woman
 * (day 6); the garden with its river (day 7 and Genesis 2). The tap activity
 * places its spots on these parts (stops/creation.json, x and y in percent
 * of the 800 by 600 picture). One mustard mark: the sun.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

const STARS = [
  [40, 40], [80, 150], [150, 30], [190, 120], [240, 60], [60, 230], [130, 200], [270, 150], [220, 220], [300, 40], [30, 120],
];

const scene: Drawing = {
  w: 800,
  h: 600,
  label: "The world on the days of creation.",
  draw: (h) => (
    <>
      {/* Day 1: darkness and light. */}
      <path fill={h.hs} d="M0,0H800V330H0Z" />
      <path fill={h.h3} d="M0,0H368L318,330H0Z" />
      <path className="pl-l" d="M368,0L318,330" />
      <path className="pl-f" d="M380,8L470,120M392,4L540,96M404,2L610,60M386,14L420,170M396,10L500,180" />
      {/* Day 4: the moon and the stars in the dark; the sun in the light. */}
      <path className="pl-paper" d="M96,96a36,36 0 1,0 50,-34a30,30 0 1,1 -50,34Z" />
      <path className="pl-l" d="M96,96a36,36 0 1,0 50,-34a30,30 0 1,1 -50,34Z" />
      {STARS.map(([x, y]) => (
        <path key={`${x},${y}`} className="pl-paper" d={`M${x},${y - 6}l2,4l4,2l-4,2l-2,4l-2,-4l-4,-2l4,-2Z`} />
      ))}
      <path className="pl-l" d="M656,40V62M656,178V200M576,120H598M714,120H736M600,64l15,15M697,161l15,15M600,176l15,-15M697,79l15,-15" />
      <path className="pl-m" d="M614,120a42,42 0 1,0 84,0a42,42 0 1,0 -84,0Z" />
      <path className="pl-l" d="M614,120a42,42 0 1,0 84,0a42,42 0 1,0 -84,0Z" />
      {/* Day 5: birds in the sky. */}
      <path className="pl-l" d="M444,214l14,-10l14,10M488,186l12,-9l12,9M520,232l11,-8l11,8M410,170l10,-7l10,7" />
      {/* Day 2 and 5: the sea under the sky, with fish. */}
      <Shape d="M0,330H340C320,400 300,500 290,600H0Z" tone="b" off={5} />
      <path className="pl-f" d="M20,356c20,-6 40,6 60,0s40,6 60,0s40,6 60,0s40,6 60,0M14,396c20,-6 40,6 60,0s40,6 60,0s40,6 60,0s40,6 50,0M20,436c20,-6 40,6 60,0s40,6 60,0s40,6 60,0s30,4 40,0M14,560c20,-6 40,6 60,0s40,6 60,0s40,6 60,0s30,4 46,0" />
      <Shape d="M110,486c18,-18 52,-18 70,0c-18,18 -52,18 -70,0ZM180,486l22,-14v28Z" tone="c" off={3} />
      <path className="pl-k" d="M124,482a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z" />
      <Shape d="M196,530c14,-14 40,-14 54,0c-14,14 -40,14 -54,0ZM250,530l16,-11v22Z" tone="c" off={3} />
      <Shape d="M60,520c10,-10 28,-10 38,0c-10,10 -28,10 -38,0ZM98,520l12,-8v16Z" tone="c" off={3} />
      {/* Day 3: dry land and trees. */}
      <Shape d="M340,330H800V600H290C300,500 320,400 340,330Z" tone="g" off={5} />
      <path fill={h.hh} d="M300,560H800V600H296Z" />
      <path className="pl-l" d="M340,330C420,316 520,320 600,332S740,326 800,320" />
      <Shape d="M492,348V300h12v48Z" tone="c" off={3} />
      <Shape d="M456,276a42,38 0 1,0 84,0a42,38 0 1,0 -84,0Z" tone="g" />
      <path fill={h.h2} d="M498,238a42,38 0 0 1 0,76Z" />
      <Shape d="M558,352V318h10v34Z" tone="c" off={3} />
      <Shape d="M534,300a29,26 0 1,0 58,0a29,26 0 1,0 -58,0Z" tone="g" />
      <path fill={h.h2} d="M563,274a29,26 0 0 1 0,52Z" />
      <path className="pl-f" d="M380,380l6,-12l6,12M600,400l6,-12l6,12M412,520l6,-12l6,12M640,520l6,-12l6,12" />
      {/* Day 6: an animal, then a man and a woman (no faces, in the site's hand). */}
      <Shape d="M342,446c-4,-20 16,-30 30,-22c10,-12 32,-8 34,8c16,0 20,22 6,30c-6,12 -26,12 -34,4c-14,8 -38,0 -36,-20Z" tone="b" off={3} />
      <path className="pl-k" d="M336,436a10,9 0 1,0 20,0a10,9 0 1,0 -20,0Z" />
      <path className="pl-l" d="M356,466v18M370,468v18M394,466v18M408,464v18" />
      <path className="pl-o" d="M438,382a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <Shape d="M438,396H460L468,470H430Z" tone="c" />
      <path className="pl-l" d="M440,470v24M458,470v24M438,404l-14,40M460,404l12,26" />
      <path className="pl-o" d="M476,388a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <Shape d="M474,402H498L508,474H464Z" tone="b" />
      <path className="pl-l" d="M478,474v20M494,474v20M472,410l-2,20M500,410l14,30" />
      {/* Day 7 and Genesis 2: the garden and its river. */}
      <Shape d="M620,420a40,40 0 1,0 80,0a40,40 0 1,0 -80,0Z" tone="g" />
      <path fill={h.h2} d="M660,380a40,40 0 0 1 0,80Z" />
      <Shape d="M690,404a34,34 0 1,0 68,0a34,34 0 1,0 -68,0Z" tone="g" />
      <path fill={h.h1} d="M724,370a34,34 0 0 1 0,68Z" />
      <Shape d="M600,440a26,26 0 1,0 52,0a26,26 0 1,0 -52,0Z" tone="g" />
      <path className="pl-l" d="M660,460v16M724,438v24M626,466v12" />
      <Shape d="M676,478c10,30 -40,50 -20,80c8,14 30,26 34,42H730c-6,-20 -36,-28 -40,-46c-6,-26 30,-50 20,-76Z" tone="b" off={3} />
      <path className="pl-f" d="M688,500c-6,10 -10,18 -10,26M690,560c8,10 18,18 22,30" />
    </>
  ),
};

export default scene;
