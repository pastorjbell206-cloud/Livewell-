/**
 * The Cross and the Empty Tomb: Sunday morning. On a far hill outside the
 * city wall, three empty crosses; nearby, in a garden (John 19:41), a tomb
 * cut in the rock stands open with its stone rolled away (Luke 24:2), and
 * three women walk toward it with spices (Luke 24:1). No figure on a cross:
 * the picture is the morning after. One mustard mark: the rising sun.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "Three empty crosses on a far hill, and an open tomb in a garden at sunrise.",
  draw: h => (
    <>
      <path fill={h.hs} d="M0,0H800V360H0Z" />
      {/* The rising sun. */}
      <path
        className="pl-l"
        d="M520,40V12M520,168V196M440,104H412M600,104H628M464,48l-18,-18M576,160l18,18M464,160l-18,18M576,48l18,-18"
      />
      <path className="pl-m" d="M478,104a42,42 0 1,0 84,0a42,42 0 1,0 -84,0Z" />
      <path className="pl-l" d="M478,104a42,42 0 1,0 84,0a42,42 0 1,0 -84,0Z" />
      {/* The city wall, far off. */}
      <Shape
        d="M0,300V236h18v-12h14v12h20v-12h14v12h20v-12h14v12h20v-12h14v12h16V300Z"
        tone="c"
        off={3}
      />
      <path fill={h.h1} d="M110,236H150V300H110Z" />
      <path className="pl-f" d="M0,256H150M0,276H150" />
      {/* The hill and the three crosses, empty. */}
      <Shape
        d="M60,330C120,240 220,196 300,200C360,204 410,250 440,330Z"
        tone="g"
        off={4}
      />
      <path fill={h.h1} d="M300,200C360,204 410,250 440,330H320Z" />
      <path className="pl-k" d="M196,226V150h8v76ZM180,170H220v7H180Z" />
      <path className="pl-k" d="M256,206V114h9v92ZM236,138H285v8H236Z" />
      <path className="pl-k" d="M318,214V146h8v68ZM302,166H342v7H302Z" />
      {/* The garden ground. */}
      <Shape
        d="M0,334C160,322 300,330 440,328S700,320 800,326V600H0Z"
        tone="g"
        off={5}
      />
      <path fill={h.hh} d="M0,560H800V600H0Z" />
      <path
        className="pl-f"
        d="M20,380l8,-14l8,14M100,420l8,-14l8,14M60,520l8,-14l8,14M260,560l8,-14l8,14"
      />
      {/* The rock and the open tomb. */}
      <Shape
        d="M440,560V300C470,250 560,232 640,240C720,248 780,280 800,300V560Z"
        tone="b"
        off={5}
      />
      <path fill={h.h1} d="M690,246C740,258 780,280 800,300V560H700Z" />
      <path
        className="pl-f"
        d="M470,320c40,-10 80,-6 110,0M480,360c30,-6 60,-4 84,0M690,330c40,-6 70,0 90,10M700,470c30,-6 60,-2 80,6"
      />
      <path className="pl-k" d="M560,560V430a50,50 0 0 1 100,0V560Z" />
      <path className="pl-paper" d="M612,520h28v8h-28Z" />
      <path className="pl-l" d="M612,520h28v8h-28Z" />
      {/* The stone, rolled aside. */}
      <Shape d="M440,500a62,62 0 1,0 124,0a62,62 0 1,0 -124,0Z" tone="b" />
      <path fill={h.h2} d="M502,438a62,62 0 0 1 0,124Z" />
      <path className="pl-f" d="M462,500a40,40 0 1,0 80,0a40,40 0 1,0 -80,0Z" />
      {/* The path, and three women carrying spices (no faces, in the site's hand). */}
      <path className="pl-f" d="M60,600C140,560 260,540 420,540" />
      <path className="pl-o" d="M264,452a12,12 0 1,0 24,0a12,12 0 1,0 -24,0Z" />
      <Shape d="M262,466H290L302,546H250Z" tone="c" off={3} />
      <Shape d="M294,486h18v16h-18Z" tone="c" off={2} />
      <path className="pl-o" d="M204,462a11,11 0 1,0 22,0a11,11 0 1,0 -22,0Z" />
      <Shape d="M202,475H228L238,550H192Z" tone="b" off={3} />
      <path className="pl-o" d="M150,472a10,10 0 1,0 20,0a10,10 0 1,0 -20,0Z" />
      <Shape d="M148,484H172L182,554H138Z" tone="c" off={3} />
      <Shape d="M176,500h14v12h-14Z" tone="c" off={2} />
    </>
  ),
};

export default scene;
