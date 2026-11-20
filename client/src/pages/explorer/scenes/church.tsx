/**
 * The Church and the Spirit (Acts and the letters), in the engraved hand.
 * On the left, Jerusalem: inside its wall a house whose upper room stands
 * open, full of people sitting close together, and above them the flame
 * (“tongues like flames of fire”, Acts 2:3). Three faint rings spread out
 * from that room across the picture: Jerusalem, then Judea and Samaria,
 * then the ends of the earth (Acts 1:8). A road leaves by the city gate and
 * winds past a village on a hill (Samaria, 8:5) and a traveller's chariot
 * on the desert road (8:26-28), down to a port by the sea (Caesarea, 10:1),
 * where a ship with a full sail is heading out (13:4). The walk's five
 * marks sit beside these, never on them (stops/church.json). One mustard
 * mark: the flame.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import { Shape } from "../art";

type Tone = "b" | "g" | "c";

/** Someone sitting in the upper room: head and shoulders, seen from the front, no face. */
function sitter(x: number, y: number, tone: Tone) {
  return (
    <g key={`${x},${y}`}>
      <Shape
        d={`M${x - 15},${y + 34}C${x - 15},${y + 18} ${x - 9},${y + 10} ${x},${y + 10}C${x + 9},${y + 10} ${x + 15},${y + 18} ${x + 15},${y + 34}Z`}
        tone={tone}
        off={1.5}
      />
      <path
        className="pl-o"
        d={`M${x - 8},${y}a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z`}
      />
      <path
        className="pl-l"
        d={`M${x - 8},${y}a8,8 0 1,0 16,0a8,8 0 1,0 -16,0Z`}
      />
    </g>
  );
}

const ROOM: [number, number, Tone][] = [
  [92, 236, "b"],
  [124, 232, "c"],
  [156, 236, "g"],
  [188, 232, "b"],
  [220, 236, "c"],
  [108, 258, "g"],
  [140, 256, "b"],
  [172, 258, "c"],
  [204, 256, "g"],
];

/** The city wall's crenels. */
const CRENELS = (() => {
  const d: string[] = [];
  for (let x = 0; x < 300; x += 18) d.push(`M${x},318v-8h9v8`);
  return d.join("");
})();

/** The three rings of Acts 1:8, spreading from the upper room. */
const RINGS = [190, 400, 640]
  .map(
    r =>
      `M${156 - r},250a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`
  )
  .join("");

const scene: Drawing = {
  w: 800,
  h: 600,
  label:
    "Jerusalem with a house whose upper room is full of people and a flame above them; three faint rings spreading out from it; a road from the city gate past a village on a hill and a chariot, down to a port where a ship sets sail.",
  draw: h => (
    <>
      {/* The sky. */}
      <path fill={h.hs} d="M0,0H800V250H0Z" />

      {/* Hills, the sea and the coast. */}
      <Shape
        d="M0,330V246C90,224 190,228 280,246C360,212 460,200 540,222C580,232 610,244 640,258L600,600H0Z"
        tone="g"
        off={4}
      />
      <path
        fill={h.h1}
        d="M420,214C470,204 510,208 540,222C580,232 610,244 640,258L626,320C560,300 480,262 420,214Z"
      />
      <Shape
        d="M640,258C700,250 750,248 800,250V600H580C600,500 620,380 640,258Z"
        tone="b"
        off={3}
      />
      <path
        className="pl-f"
        d="M660,290c16,-5 32,5 48,0s32,5 48,0M690,330c16,-5 32,5 48,0M660,520c16,-5 32,5 48,0s32,5 48,0M690,560c16,-5 32,5 48,0"
      />
      <path className="pl-o" d="M0,330H612L580,600H0Z" />
      <path className="pl-l" d="M0,330H300M640,258C620,380 600,500 580,600" />

      {/* The rings of Acts 1:8, faint, behind everything built. */}
      <path className="pl-f" d={RINGS} style={{ strokeDasharray: "3 7" }} />

      {/* The village on its hill: Samaria. */}
      <Shape
        d="M470,232v-20h24v20ZM498,226v-24h22v24ZM524,234v-16h22v16Z"
        tone="c"
        off={2}
      />
      <path
        className="pl-k"
        d="M478,226h6v6h-6ZM506,218h6v8h-6ZM531,228h6v6h-6Z"
      />

      {/* Jerusalem: the wall and the gate. */}
      <path className="pl-o" d="M0,318H300V372H0Z" />
      <path fill={h.hh} d="M0,318H300V372H0Z" />
      <path className="pl-l" d="M0,318H300M0,372H300" />
      <path className="pl-l" d={CRENELS} />
      <Shape d="M280,372V292h60v80Z" tone="c" off={3} />
      <path className="pl-l" d="M276,292h68M280,284h60v8" />
      <path className="pl-k" d="M296,372v-40a14,14 0 0 1 28,0v40Z" />

      {/* The house with the upper room, rising above the wall. */}
      <Shape d="M60,318V172H252V318Z" tone="c" off={4} />
      <path fill={h.h1} d="M222,318V172H252V318Z" />
      <path className="pl-l" d="M50,172H262M56,162H256V172" />
      {/* The upper room, open, full of people sitting close together. */}
      <path className="pl-o" d="M76,296V196H236V296Z" />
      <path className="pl-l" d="M76,296V196H236V296Z" />
      {ROOM.map(([x, y, t]) => sitter(x, y, t))}
      <path className="pl-o" d="M70,296H242V306H70Z" />
      <path className="pl-l" d="M70,296H242V306H70Z" />
      {/* The flame above them. */}
      <path
        className="pl-m"
        d="M156,224C138,214 134,196 146,174C148,186 154,192 156,200C158,190 164,184 168,176C178,196 174,214 156,224Z"
      />
      <path
        className="pl-l"
        d="M156,224C138,214 134,196 146,174C148,186 154,192 156,200C158,190 164,184 168,176C178,196 174,214 156,224Z"
      />
      <path className="pl-f" d="M120,206l-10,-6M192,206l10,-6M156,170v-0" />

      {/* The road out of the gate, past the chariot, down to the port. */}
      <path
        className="pl-l"
        d="M310,372C330,410 380,430 440,440C520,452 560,430 600,410"
      />
      <path
        className="pl-f"
        d="M326,372C346,402 392,420 444,428C516,440 552,420 594,398"
      />

      <path
        className="pl-f"
        d="M40,420l4,-10l4,10M120,470l4,-10l4,10M230,430l4,-10l4,10M70,540l4,-10l4,10M200,560l4,-10l4,10M360,520l4,-10l4,10M480,560l4,-10l4,10M400,470c30,-4 60,-4 90,0M90,500c40,-6 90,-6 130,0"
      />

      {/* The chariot on the desert road, its reader seated under a canopy. */}
      <Shape d="M462,470V444H516V470Z" tone="b" off={2} />
      <path
        className="pl-l"
        d="M458,444H520M466,444V418M512,444V418M458,418H520"
      />
      <path className="pl-o" d="M480,424a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" />
      <path className="pl-l" d="M480,424a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z" />
      <path className="pl-o" d="M496,436h14v8h-14Z" />
      <path className="pl-l" d="M496,436h14v8h-14Z" />
      <path className="pl-o" d="M470,474a16,16 0 1,0 32,0a16,16 0 1,0 -32,0Z" />
      <path
        className="pl-l"
        d="M470,474a16,16 0 1,0 32,0a16,16 0 1,0 -32,0ZM486,458v32M470,474h32M475,463l22,22M497,463l-22,22"
      />
      <path className="pl-l" d="M516,452H548" />
      {/* The horse. */}
      <Shape
        d="M546,446c6,-8 30,-10 44,-4c6,-10 12,-20 22,-22l6,8c-4,6 -10,10 -14,14c2,10 0,18 -6,22c-14,6 -40,6 -52,-4Z"
        tone="c"
        off={2}
      />
      <path className="pl-l" d="M554,458v26M566,460v24M586,460v24M596,456v28" />

      {/* The port: Caesarea, with a colonnade and a tower at the harbour mouth. */}
      <Shape d="M596,330V300H676V330Z" tone="c" off={2} />
      <path className="pl-l" d="M590,300H682M594,292H678V300" />
      <path
        className="pl-f"
        d="M608,300V330M622,300V330M636,300V330M650,300V330M664,300V330"
      />
      <Shape d="M690,340V280h16v60Z" tone="c" off={2} />
      <path className="pl-l" d="M686,280h24M692,272h12v8" />
      <path className="pl-o" d="M592,340H720V348H592Z" />
      <path className="pl-l" d="M592,340H720V348H592Z" />

      {/* The ship with a full sail, heading out to sea. */}
      <Shape d="M622,452H744L726,474H640Z" tone="c" off={3} />
      <path className="pl-l" d="M684,452V364" />
      <Shape d="M688,368C716,380 726,410 718,440H688Z" off={2} />
      <path
        className="pl-f"
        d="M690,384c10,4 20,10 26,20M690,404c10,4 18,8 24,16"
      />
      <path className="pl-l" d="M680,372C660,390 652,420 656,446H680Z" />
      <path className="pl-f" d="M612,484c16,-5 32,5 48,0s32,5 48,0s32,5 48,0" />
    </>
  ),
};

export default scene;
