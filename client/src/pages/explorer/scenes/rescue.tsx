/**
 * The Rescue from Egypt (Exodus 12 and 14), as two pictures in one frame.
 * Left: the night of the Passover, a house's door with the lamb's blood on
 * the top and the two sides of the frame (Exodus 12:7), drawn as a tone,
 * with the bunch of hyssop and the basin beside it (12:22). Right: the sea
 * held back in two walls, the people crossing on dry ground, the pillar of
 * fire behind them (13:21; 14:19-22). One mustard mark: the pillar of fire.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "The door marked with the lamb's blood, and the people crossing the sea on dry ground.",
  draw: h => (
    <>
      {/* LEFT: the night of the Passover. */}
      <path fill={h.h3} d="M0,0H392V600H0Z" />
      <path
        className="pl-paper"
        d="M60,70a28,28 0 1,0 38,-26a22,22 0 1,1 -38,26Z"
      />
      <path
        className="pl-l"
        d="M60,70a28,28 0 1,0 38,-26a22,22 0 1,1 -38,26Z"
      />
      <Shape d="M30,150H362V560H30Z" tone="c" off={5} />
      <path fill={h.h1} d="M290,150H362V560H290Z" />
      <path className="pl-l" d="M24,150H368V136H24Z" />
      <path
        className="pl-f"
        d="M30,220H362M30,300H362M30,470H362M110,150V220M210,150V220M310,150V220M70,220V300M170,220V300M270,220V300"
      />
      {/* The doorframe: lintel and posts, marked. */}
      <Shape d="M126,318H266V340H126Z" />
      <Shape d="M126,340H146V560H126Z" />
      <Shape d="M246,340H266V560H246Z" />
      <path
        className="pl-c"
        d="M138,322c30,6 76,-4 118,2l-2,12c-40,-4 -80,6 -116,-2Z"
      />
      <path
        className="pl-c"
        d="M130,350c4,40 -2,90 4,140l8,0c-4,-50 2,-100 -4,-140Z"
      />
      <path
        className="pl-c"
        d="M250,348c4,46 -2,92 4,146l8,0c-4,-54 2,-100 -4,-146Z"
      />
      <path className="pl-k" d="M146,340H246V560H146Z" />
      <path className="pl-paper" d="M228,450h6v6h-6Z" />
      {/* The basin and the hyssop. */}
      <Shape d="M290,560c0,-28 56,-28 56,0Z" tone="c" off={3} />
      <path
        className="pl-l"
        d="M300,536l-12,-50M288,486l-10,-8M290,494l-12,-2M294,508l-10,-4"
      />
      <path className="pl-o" d="M0,560H392V600H0Z" />
      <path fill={h.hh} d="M0,568H392V600H0Z" />

      {/* The frame between the two pictures. */}
      <path className="pl-o" d="M392,0H408V600H392Z" />
      <path className="pl-l" d="M392,0V600M408,0V600" />

      {/* RIGHT: the sea held back. */}
      <path fill={h.hs} d="M408,0H800V600H408Z" />
      {/* The pillar of fire, behind the people. */}
      <path
        className="pl-m"
        d="M592,36c-12,30 10,46 0,80c-10,34 8,56 2,90h32c-6,-34 12,-56 2,-90c-10,-34 12,-50 0,-80c-6,10 -10,16 -18,18c-8,-2 -12,-8 -18,-18Z"
      />
      <path
        className="pl-l"
        d="M592,36c-12,30 10,46 0,80c-10,34 8,56 2,90h32c-6,-34 12,-56 2,-90c-10,-34 12,-50 0,-80c-6,10 -10,16 -18,18c-8,-2 -12,-8 -18,-18Z"
      />
      {/* Dry ground, narrowing into the distance. */}
      <path className="pl-o" d="M520,600L590,220H630L700,600Z" />
      <path fill={h.hh} d="M520,600L590,220H630L700,600Z" />
      {/* The two walls of water. */}
      <Shape
        d="M408,600V200C450,180 520,214 580,196L590,220L520,600Z"
        tone="b"
        off={5}
      />
      <Shape
        d="M800,600V200C758,180 690,214 640,196L630,220L700,600Z"
        tone="b"
        off={5}
      />
      <path
        className="pl-f"
        d="M420,250c30,-10 60,10 100,-4M420,300c30,-10 60,10 92,-4M420,350c30,-10 60,10 84,-4M420,400c30,-10 60,10 76,-4M420,450c30,-10 50,10 66,-4M420,500c30,-10 44,10 56,-4M420,550c24,-8 36,8 46,-2"
      />
      <path
        className="pl-f"
        d="M788,250c-30,-10 -60,10 -100,-4M788,300c-30,-10 -60,10 -92,-4M788,350c-30,-10 -60,10 -84,-4M788,400c-30,-10 -60,10 -76,-4M788,450c-30,-10 -50,10 -66,-4M788,500c-30,-10 -44,10 -56,-4M788,550c-24,-8 -36,8 -46,-2"
      />
      <path
        className="pl-l"
        d="M408,200c10,-14 26,-14 34,-4c8,-10 22,-10 30,0M800,200c-10,-14 -26,-14 -34,-4c-8,-10 -22,-10 -30,0"
      />
      {/* The people crossing, smaller as they go. */}
      <path className="pl-o" d="M600,510a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <Shape d="M598,524H626L634,590H590Z" tone="c" off={3} />
      <path className="pl-l" d="M592,590l-2,-70" />
      <path className="pl-o" d="M574,430a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" />
      <Shape d="M573,441H593L599,490H567Z" tone="c" off={2.5} />
      <path className="pl-o" d="M624,420a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" />
      <Shape d="M623,431H643L649,480H617Z" tone="b" off={2.5} />
      <path className="pl-o" d="M600,340a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" />
      <Shape d="M599,349H615L619,386H595Z" tone="c" off={2} />
      <path className="pl-o" d="M602,276a5,5 0 1,0 10,0a5,5 0 1,0 -10,0Z" />
      <path className="pl-l" d="M601,283H613L616,306H598Z" />
    </>
  ),
};

export default scene;
