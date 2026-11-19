/**
 * The Bible Explorer's small drawings, in the site's one engraved hand
 * (components/art/README.md): ink outline, one tone block printed off
 * register, hatching for shade. Every colour is a token (.pl-* classes in
 * index.css), so each drawing turns to night with html.dark.
 *
 * - Emblem: the picture inside each stop's roundel on the map. Each one
 *   teaches the stop by itself: a tree for creation, a tent under stars for
 *   Abraham, walls of water for the rescue.
 * - Roundel: the ring an emblem sits in, on the map and at the top of a stop.
 * - HeadArt: the road from a garden to a city, for the top of the map.
 * - Manger: the picture on the "Jesus, God and man" card.
 *
 * Mustard is kept for the map's one mark (where you are), so no emblem uses it.
 */
import { useId, type ReactNode } from "react";
import { PlateSvg, type Drawing } from "@/components/art/PlateSvg";

type Tone = "b" | "g" | "c";

/** A shape in the hand: paper, its tone off register, an optional hatch, the ink line. */
export function Shape({
  d,
  tone,
  hatch,
  off = 2.5,
}: {
  d: string;
  tone?: Tone;
  hatch?: string;
  off?: number;
}) {
  return (
    <>
      <path className="pl-o" d={d} />
      {tone && (
        <path
          className={`pl-${tone}`}
          d={d}
          transform={`translate(${off},${off * 0.75})`}
        />
      )}
      {hatch && <path fill={hatch} d={d} />}
      <path className="pl-l" d={d} />
    </>
  );
}

/** The fine hatch for a 100-unit emblem (the plates' hatches are drawn for 400). */
function EmblemHatch({ id }: { id: string }) {
  return (
    <pattern
      id={id}
      width="4"
      height="4"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
    >
      <line
        className="pl-hatch"
        x1="0"
        y1="0"
        x2="0"
        y2="4"
        strokeWidth="0.9"
      />
    </pattern>
  );
}

const EMBLEMS: Record<string, (h: string) => ReactNode> = {
  creation: h => (
    <>
      <path className="pl-l" d="M14,72H86" />
      <path
        className="pl-f"
        d="M22,30l-6,-4M30,22l-3,-7M42,18v-7M54,19l3,-7M64,25l6,-5"
      />
      <Shape d="M47,72V52h6v20Z" tone="c" />
      <Shape d="M28,44a22,18 0 1,0 44,0a22,18 0 1,0 -44,0Z" tone="g" />
      <path fill={h} d="M50,26a22,18 0 0 1 22,18a22,18 0 0 1 -22,18Z" />
      <path className="pl-f" d="M20,80c8,-3 16,3 24,0s16,3 24,0s10,2 14,0" />
    </>
  ),
  fall: h => (
    <>
      <path className="pl-l" d="M12,80H88" />
      <Shape
        d="M26,80V46a24,24 0 0 1 48,0V80H64V48a14,14 0 0 0 -28,0V80Z"
        tone="c"
      />
      <path fill={h} d="M64,48a14,14 0 0 0 -28,0V80H64Z" />
      <path className="pl-k" d="M33,74L69,30l3,3L36,77Z" />
      <path className="pl-l" d="M60,36l8,6" />
    </>
  ),
  abraham: h => (
    <>
      <path fill={h} d="M0,0H100V64H0Z" />
      <path
        className="pl-paper"
        d="M28,20l2,5l5,1l-5,2l-2,5l-2,-5l-5,-2l5,-1ZM64,12l1.5,4l4,1l-4,1.5l-1.5,4l-1.5,-4l-4,-1.5l4,-1ZM78,34l1.5,3l3,1l-3,1l-1.5,3l-1.5,-3l-3,-1l3,-1Z"
      />
      <path
        className="pl-l"
        d="M28,20l2,5l5,1l-5,2l-2,5l-2,-5l-5,-2l5,-1ZM64,12l1.5,4l4,1l-4,1.5l-1.5,4l-1.5,-4l-4,-1.5l4,-1ZM78,34l1.5,3l3,1l-3,1l-1.5,3l-1.5,-3l-3,-1l3,-1Z"
      />
      <path className="pl-o" d="M0,64H100V100H0Z" />
      <Shape d="M18,80L46,40L74,80Z" tone="c" />
      <path className="pl-k" d="M40,80L46,58L52,80Z" />
      <path className="pl-f" d="M18,80L8,86M74,80L86,86" />
    </>
  ),
  rescue: h => (
    <>
      <path className="pl-o" d="M38,88L44,30H56L62,88Z" />
      <path fill={h} d="M38,88L44,30H56L62,88Z" />
      <Shape d="M8,88V36C16,30 26,34 34,28L40,88Z" tone="b" />
      <Shape d="M92,88V36C84,30 74,34 66,28L60,88Z" tone="b" />
      <path
        className="pl-f"
        d="M12,46c6,-3 12,2 18,-1M12,58c6,-3 12,2 20,-1M12,70c6,-3 12,2 22,-1M88,46c-6,-3 -12,2 -18,-1M88,58c-6,-3 -12,2 -20,-1M88,70c-6,-3 -12,2 -22,-1"
      />
      <path
        className="pl-k"
        d="M48,66a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0ZM47,70h7l1,10h-9Z"
      />
    </>
  ),
  sinai: h => (
    <>
      <Shape d="M6,78L42,22L58,40L66,32L94,78Z" tone="g" />
      <path fill={h} d="M42,22L58,40L50,78H94L66,32L58,40Z" />
      <path className="pl-f" d="M36,20c4,-6 10,-6 14,-2" />
      <Shape d="M30,86V62a7,7 0 0 1 14,0V86Z" tone="c" off={2} />
      <Shape d="M48,86V62a7,7 0 0 1 14,0V86Z" tone="c" off={2} />
      <path
        className="pl-f"
        d="M33,68h8M33,73h8M33,78h8M51,68h8M51,73h8M51,78h8"
      />
    </>
  ),
  land: h => (
    <>
      <path className="pl-l" d="M14,88H86" />
      <path
        className="pl-l"
        d="M50,88V40M50,88L36,44M50,88L64,44M50,88L28,52M50,88L72,52"
      />
      <Shape d="M46,40a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M32,44a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M60,44a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M24,52a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M68,52a4,10 0 1,0 8,0a4,10 0 1,0 -8,0Z" tone="g" off={1.5} />
      <Shape d="M40,66h20v7H40Z" tone="c" off={1.5} />
      <path fill={h} d="M40,66h20v7H40Z" />
    </>
  ),
  kingdom: h => (
    <>
      <Shape d="M20,70L16,32L34,48L50,24L66,48L84,32L80,70Z" tone="c" />
      <path fill={h} d="M50,24L66,48L84,32L80,70H50Z" />
      <Shape d="M18,70H82V80H18Z" tone="c" />
      <path className="pl-k" d="M46,58a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z" />
      <path className="pl-f" d="M28,75h4M40,75h4M56,75h4M68,75h4" />
    </>
  ),
  exile: h => (
    <>
      <path className="pl-l" d="M8,22C30,18 60,20 92,26" />
      <path
        className="pl-f"
        d="M20,20l-4,10M32,19l-2,12M70,22l2,12M84,24l4,10"
      />
      <path className="pl-l" d="M50,21V30" />
      <Shape
        d="M36,30H64L60,40C66,52 64,70 52,82H48C36,70 34,52 40,40Z"
        tone="b"
      />
      <path fill={h} d="M50,30H64L60,40C66,52 64,70 52,82H50Z" />
      <path className="pl-f" d="M44,40V74M48,38V80M52,38V80M56,40V74" />
      <path className="pl-f" d="M10,92c10,-4 20,4 30,0s20,4 30,0s14,3 22,0" />
    </>
  ),
  return: h => (
    <>
      <path className="pl-l" d="M10,86H90" />
      <Shape d="M14,86V54H86V86Z" tone="c" />
      <path fill={h} d="M60,54H86V86H60Z" />
      <path
        className="pl-l"
        d="M14,64H86M14,75H86M32,54V64M56,54V64M78,54V64M22,64V75M44,64V75M68,64V75M32,75V86M56,75V86M78,75V86"
      />
      <Shape d="M38,52c0,-8 24,-8 24,0Z" tone="c" off={1.5} />
      <path className="pl-l" d="M60,46l8,-3" />
      <path className="pl-k" d="M48,40c-3,-5 1,-10 2,-14c1,4 5,9 2,14Z" />
    </>
  ),
  jesus: h => (
    <>
      <path className="pl-f" d="M10,30c6,-2 10,2 16,0M70,22c6,-2 10,2 16,0" />
      <path className="pl-l" d="M52,64V16" />
      <Shape d="M54,20L76,56H54Z" tone="b" />
      <Shape d="M14,64H86L76,80H24Z" tone="c" />
      <path fill={h} d="M50,64H86L76,80H50Z" />
      <path
        className="pl-l"
        d="M6,86c8,-4 14,4 22,0s14,4 22,0s14,4 22,0s14,4 22,0"
      />
      <path className="pl-f" d="M10,94c8,-3 14,3 22,0s14,3 22,0s14,3 22,0" />
    </>
  ),
  cross: h => (
    <>
      <Shape d="M4,92C20,62 40,54 60,60C76,64 88,76 96,92Z" tone="g" />
      <path fill={h} d="M60,60C76,64 88,76 96,92H58Z" />
      <path className="pl-k" d="M33,58V16h5V58ZM24,26H47v5H24Z" />
      <path className="pl-k" d="M66,84a10,10 0 0 1 20,0Z" />
      <Shape d="M54,86a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" tone="b" off={1.5} />
    </>
  ),
  church: h => (
    <>
      <Shape
        d="M50,88C30,84 24,66 34,50C38,60 42,60 42,52C42,38 50,28 56,14C58,30 72,40 72,58C72,74 64,86 50,88Z"
        tone="c"
      />
      <path
        fill={h}
        d="M56,14C58,30 72,40 72,58C72,74 64,86 50,88C60,76 62,60 56,46Z"
      />
      <path className="pl-l" d="M50,88C42,82 42,72 50,62C54,70 58,74 56,80" />
    </>
  ),
  "new-creation": h => (
    <>
      <path className="pl-l" d="M8,84H92" />
      <Shape
        d="M30,84V40L50,24L70,40V84H60V60a10,10 0 0 0 -20,0V84Z"
        tone="b"
      />
      <path fill={h} d="M50,24L70,40V84H60V60a10,10 0 0 0 -10,-10Z" />
      <path className="pl-l" d="M30,48H70" />
      <Shape d="M74,62a9,9 0 1,0 18,0a9,9 0 1,0 -18,0Z" tone="g" off={1.5} />
      <path className="pl-l" d="M83,70V84" />
      <path className="pl-f" d="M44,84c-2,4 -8,6 -10,10M50,84c0,4 -2,8 -2,12" />
    </>
  ),
};

/** True when a stop has an emblem drawn for it. */
export const hasEmblem = (slug: string) => slug in EMBLEMS;

/**
 * A stop's roundel: an ink ring with the stop's emblem inside. Decorative by
 * default (the stop's name is always written beside it).
 */
export function Roundel({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const id = `lwr${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const draw = EMBLEMS[slug];
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={`${id}c`}>
          <circle cx="50" cy="50" r="41" />
        </clipPath>
        <EmblemHatch id={`${id}h`} />
      </defs>
      <circle className="pl-o" cx="50" cy="50" r="47" />
      <circle className="pl-f" cx="50" cy="50" r="41" />
      <g clipPath={`url(#${id}c)`}>
        <g transform="translate(13,13) scale(.74)">
          {draw ? draw(`url(#${id}h)`) : null}
        </g>
      </g>
    </svg>
  );
}

/** The top of the map: a road winding from a garden to a city, with stops along it. */
export const HEAD_ART: Drawing = {
  w: 400,
  h: 300,
  label:
    "A road winding from a garden at the top to a city at the bottom, with markers along the way.",
  draw: h => (
    <>
      <path fill={h.hs} d="M0,0H400V300H0Z" />
      <path
        d="M34,38C120,40 300,30 330,86C360,142 60,120 70,186C80,252 300,214 352,262"
        strokeWidth="26"
        fill="none"
        stroke="var(--art-ink)"
      />
      <path
        d="M34,38C120,40 300,30 330,86C360,142 60,120 70,186C80,252 300,214 352,262"
        fill="none"
        stroke="var(--art-paper)"
        strokeWidth="20"
      />
      <path
        className="pl-f"
        strokeDasharray="5 6"
        d="M34,38C120,40 300,30 330,86C360,142 60,120 70,186C80,252 300,214 352,262"
      />
      <Shape d="M14,40a22,22 0 1,0 44,0a22,22 0 1,0 -44,0Z" tone="g" off={4} />
      <path fill={h.h2} d="M36,18a22,22 0 0 1 0,44Z" />
      <path className="pl-l" d="M36,62V78" />
      <Shape
        d="M318,286V238L344,216L370,238V286H356V258a12,12 0 0 0 -24,0V286Z"
        tone="b"
        off={4}
      />
      <path fill={h.h2} d="M344,216L370,238V286H356V258a12,12 0 0 0 -12,-12Z" />
      <Shape d="M150,46a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" tone="c" off={3} />
      <Shape
        d="M306,104a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z"
        tone="c"
        off={3}
      />
      <Shape
        d="M150,128a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z"
        tone="c"
        off={3}
      />
      <Shape d="M60,190a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" tone="c" off={3} />
      <path className="pl-m" d="M206,232a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <path className="pl-l" d="M206,232a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
    </>
  ),
};

/** The "Jesus, God and man" card: a manger in a stable under one star. */
export const MANGER: Drawing = {
  w: 400,
  h: 300,
  label: "A manger full of straw in a stable at night, under one bright star.",
  draw: h => (
    <>
      <path fill={h.h3} d="M0,0H400V300H0Z" />
      <path
        className="pl-paper"
        d="M300,34l6,16l17,2l-17,4l-6,16l-6,-16l-17,-4l17,-2Z"
      />
      <path
        className="pl-m"
        d="M300,38l4,12l12,2l-12,3l-4,12l-4,-12l-12,-3l12,-2Z"
      />
      <path
        className="pl-l"
        d="M300,34l6,16l17,2l-17,4l-6,16l-6,-16l-17,-4l17,-2Z"
      />
      <path className="pl-f" d="M300,72V96M300,14V26M272,52H258M328,52H342" />
      <Shape d="M40,124L200,70L360,124V138H40Z" tone="c" off={4} />
      <path fill={h.h2} d="M200,70L360,124V138H200Z" />
      <path className="pl-o" d="M60,138H340V300H60Z" />
      <path fill={h.h1} d="M60,138H340V300H60Z" />
      <path className="pl-l" d="M60,138V300M340,138V300M60,138H340" />
      <path className="pl-o" d="M0,256H400V300H0Z" />
      <path fill={h.hh} d="M0,270H400V300H0Z" />
      <path className="pl-l" d="M110,256L136,196M290,256L264,196" />
      <Shape d="M118,196H282L262,240H138Z" tone="c" off={4} />
      <path fill={h.h2} d="M210,196H282L262,240H210Z" />
      <path
        className="pl-l"
        d="M126,196l10,-16l8,14l10,-18l8,16l12,-20l8,18l12,-16l8,16l12,-20l8,18l10,-14l10,16l10,-18l8,16l12,-14l8,14"
      />
      <path className="pl-o" d="M168,186a32,14 0 1,0 64,0a32,14 0 1,0 -64,0Z" />
      <path
        className="pl-f"
        d="M176,184c14,-6 34,-6 48,0M178,190c14,-5 30,-5 44,0"
      />
    </>
  ),
};

export function HeadArt() {
  return <PlateSvg drawing={HEAD_ART} decorative />;
}
export function MangerArt({ label }: { label?: string }) {
  return <PlateSvg drawing={label ? { ...MANGER, label } : MANGER} />;
}
