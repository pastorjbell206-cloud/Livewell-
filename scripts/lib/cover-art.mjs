/**
 * The cover drawings (scripts/build-covers.mjs), in the site's engraved hand
 * (client/src/components/art/README.md): an ink line with square ends, shade
 * by parallel hatching only, one flat tone block per shape printed off
 * register, and exactly one mustard mark, the light. No faces, no photographs.
 *
 * A book's drawing lives in a 400 by 340 box and stands on a ground line at
 * y = 300; the cover draws the sky, the ground and the type around it. A
 * kind's emblem lives in a 240 by 240 box. Each drawing is a function of the
 * pen `p`, whose colours the cover has already resolved from the tokens in
 * client/src/index.css.
 */

/** The pen: every mark a drawing may make, for one resolved palette. */
export function pen(c) {
  const a = (d, extra = "") => `<path d="${d}"${extra}/>`;
  const p = {
    /** A shape filled with paper and outlined in ink. */
    o: (d) => a(d, ` fill="${c.paper}" stroke="${c.ink}" stroke-width="2.25" stroke-linejoin="miter"`),
    /** The tone block, printed off register. */
    t: (d) => a(d, ` fill="${c.tone}" transform="translate(4,3)"`),
    /** A line. */
    l: (d, w = 2.25) => a(d, ` fill="none" stroke="${c.ink}" stroke-width="${w}" stroke-linejoin="miter" stroke-linecap="butt"`),
    /** A fine line. */
    f: (d) => a(d, ` fill="none" stroke="${c.ink}" stroke-width="1.1"`),
    /** Solid ink. */
    k: (d) => a(d, ` fill="${c.ink}"`),
    /** The one mustard mark. */
    m: (d) => a(d, ` fill="${c.mustard}"`),
    /** The darkest fill the ground allows: ink on a light cover, the field itself on a dark one. */
    d: (d) => a(d, ` fill="${c.dark}"`),
    /** Bare paper, and the bright fill for a lit opening. */
    paper: (d) => a(d, ` fill="${c.paper}"`),
    light: (d) => a(d, ` fill="${c.light}"`),
    /** Hatching: h1 open diagonal, h2 close diagonal, h3 dark diagonal, hh level, hs sparse level. */
    h: (d, name = "h2") => a(d, ` fill="url(#${name})"`),
    /** Outline, tone, optional hatch, then the line again on top. */
    sh: (d, hatchD, hatchName) => p.o(d) + p.t(d) + (hatchD ? p.h(hatchD, hatchName) : "") + p.l(d),
  };
  return p;
}

/** The five hatch patterns, in the pen's ink. */
export function hatchDefs(ink, opacity = 1) {
  const line = (x1, y1, x2, y2, w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${ink}" stroke-opacity="${opacity}" stroke-width="${w}"/>`;
  return [
    `<pattern id="h1" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${line(0, 0, 0, 7, 1.1)}</pattern>`,
    `<pattern id="h2" width="4.2" height="4.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${line(0, 0, 0, 4.2, 1.1)}</pattern>`,
    `<pattern id="h3" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${line(0, 0, 0, 3.2, 1.5)}</pattern>`,
    `<pattern id="hh" width="6" height="6" patternUnits="userSpaceOnUse">${line(0, 3, 6, 3, 1)}</pattern>`,
    `<pattern id="hs" width="9" height="9" patternUnits="userSpaceOnUse">${line(0, 4, 9, 4, 0.9)}</pattern>`,
  ].join("");
}

const n = (v) => Math.round(v * 10) / 10;
const circle = (cx, cy, r) => `M${n(cx - r)},${n(cy)}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;
const rect = (x, y, w, h) => `M${x},${y}h${w}v${h}h${-w}Z`;

/** Short strokes around a point: the light. */
function rays(cx, cy, r1, r2, count, from = 0, sweep = 360) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const t = ((from + (sweep * i) / (sweep === 360 ? count : count - 1)) * Math.PI) / 180;
    const long = i % 2 === 0 ? r2 : r1 + (r2 - r1) * 0.55;
    parts.push(`M${n(cx + r1 * Math.cos(t))},${n(cy + r1 * Math.sin(t))}L${n(cx + long * Math.cos(t))},${n(cy + long * Math.sin(t))}`);
  }
  return parts.join("");
}

function star(cx, cy, R, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const t = (-90 + i * 36) * (Math.PI / 180);
    const q = i % 2 === 0 ? R : r;
    pts.push(`${n(cx + q * Math.cos(t))},${n(cy + q * Math.sin(t))}`);
  }
  return `M${pts.join("L")}Z`;
}

/** An almond leaf from a point, at an angle. */
function leaf(x, y, deg, len = 26) {
  const t = (deg * Math.PI) / 180;
  const ex = x + len * Math.cos(t);
  const ey = y + len * Math.sin(t);
  const nx = -Math.sin(t) * len * 0.3;
  const ny = Math.cos(t) * len * 0.3;
  const mx = (x + ex) / 2;
  const my = (y + ey) / 2;
  return `M${n(x)},${n(y)}Q${n(mx + nx)},${n(my + ny)} ${n(ex)},${n(ey)}Q${n(mx - nx)},${n(my - ny)} ${n(x)},${n(y)}Z`;
}

const mirror = (s) => `<g transform="translate(400,0) scale(-1,1)">${s}</g>`;

/** One drawing per book, by name. */
export const BOOK_ART = {
  /** A Higher Allegiance: a small white church on the horizon; beneath it, where its reflection would be, a capitol dome upside down. */
  capitol: (p) => {
    const treeL = "M52,160C44,140 58,120 78,126C86,106 114,110 116,132C130,136 130,154 122,160Z";
    const treeR = "M286,160C282,142 296,128 310,134C318,116 344,122 344,142C356,146 356,156 350,160Z";
    const gable = "M136,160V112L160,88L184,112V160Z";
    const nave = rect(184, 118, 86, 42);
    const roof = "M160,88H248L274,118H188Z";
    const spire = "M145,64L160,24L175,64Z";
    const dome = "M156,232C156,292 178,312 204,312C230,312 252,292 252,232Z";
    const colonnade = [156, 168, 180, 192, 204, 216, 228, 240, 252].map((x) => `M${x},180V210`).join("");
    const windows = [198, 220, 242].map((x) => `M${x},152V134a5,5 0 0 1 10,0V152Z`).join("");
    return [
      p.h(treeL, "h3") + p.l(treeL) + p.h(treeR, "h3") + p.l(treeR),
      p.o(nave) + p.h(rect(240, 118, 30, 42), "h1") + p.l(nave),
      p.m(windows) + p.l(windows, 1.4),
      p.o(roof) + p.h(roof, "h3") + p.l(roof),
      p.o(gable) + p.l(gable),
      p.k("M152,160V140a8,8 0 0 1 16,0V160Z") + p.f(circle(160, 120, 6)),
      p.o(rect(149, 64, 22, 34)) + p.k(rect(156, 72, 8, 14)) + p.l(rect(149, 64, 22, 34)),
      p.o(spire) + p.h("M160,24L175,64H160Z", "h2") + p.l(spire),
      p.l("M160,24V8M154,14H166", 2.6),
      // Below the line: the dome, hanging where the reflection would be.
      p.h("M52,160C44,178 58,196 78,192C86,208 112,206 116,188C130,184 130,166 122,160Z", "h1"),
      p.h("M286,160C282,176 296,190 310,186C318,200 344,196 344,178C356,174 356,164 350,160Z", "h1"),
      p.sh(rect(112, 160, 184, 18), rect(230, 160, 66, 18), "h2"),
      p.sh(rect(144, 178, 120, 34), rect(222, 178, 42, 34), "h2") + p.f(colonnade),
      p.sh(rect(156, 212, 96, 20), rect(218, 212, 34, 20), "h2"),
      p.sh(dome, "M204,232H252C252,292 230,312 204,312Z", "h2"),
      p.f("M180,232C180,280 192,304 204,312M228,232C228,280 216,304 204,312M204,232V312M158,252H250M164,274H244"),
      p.sh(rect(194, 312, 20, 14)),
      p.k("M198,326L204,340L210,326Z"),
      p.f("M24,172H64M336,172H380M40,186H70M330,188H366M20,204H52M348,206H384M60,222H90M312,224H346M36,244H60M340,246H372"),
    ].join("");
  },

  /** Blind Spots: spectacles over an open Bible, one lens blacked out. */
  spectacles: (p) => {
    const page = "M40,292C84,262 152,264 200,286V214C152,192 84,190 40,220Z";
    const words = [0, 14, 28, 42].map((dy) => `M58,${236 + dy}C98,${212 + dy} 150,${214 + dy} 186,${234 + dy}`).join("");
    const left = circle(128, 118, 64);
    const right = circle(272, 118, 64);
    return [
      p.k("M30,300H370V290H30Z"),
      p.o(page) + p.f(words),
      mirror(p.o(page) + p.h("M200,286V214C152,192 84,190 40,220V236C90,206 150,212 200,236Z", "h1") + p.l(page) + p.f(words)),
      p.l("M200,214V286"),
      p.l("M64,112L22,96M336,112L378,96", 4),
      p.l("M190,112Q200,92 210,112", 4),
      p.o(left) + p.t(left) + p.light(circle(128, 118, 52)) + p.l(circle(128, 118, 52)) + p.l(left),
      p.m("M96,96C102,80 116,70 134,68C118,76 108,86 104,100Z"),
      p.o(right) + p.t(right) + p.d(circle(272, 118, 53)) + p.h(circle(272, 118, 53), "h3") + p.l(circle(272, 118, 53)) + p.l(right),
    ].join("");
  },

  /** The America book: a gold star raised on a pedestal before a striped banner. */
  idol: (p) => {
    const banner = "M96,10H304V222L278,240L252,222L226,240L200,222L174,240L148,222L122,240L96,222Z";
    const stripes = [0, 2, 4, 6].map((i) => rect(96 + i * 26, 10, 26, 214)).join("");
    return [
      p.o(banner) + p.h(stripes, "h3") + p.l(banner),
      p.sh(rect(140, 150, 120, 106), rect(220, 150, 40, 106), "h2"),
      p.f("M156,150V256M172,150V256M188,150V256M204,150V256"),
      p.o(rect(126, 136, 148, 16)) + p.l(rect(126, 136, 148, 16)),
      p.sh(rect(116, 256, 168, 22), rect(232, 256, 52, 22), "h2"),
      p.sh(rect(96, 278, 208, 22), rect(250, 278, 54, 22), "h2"),
      p.paper(circle(200, 76, 66)),
      p.l(rays(200, 76, 58, 78, 24), 2),
      p.m(star(200, 76, 50, 20)) + p.l(star(200, 76, 50, 20)),
    ].join("");
  },

  /** Believe: a balance, a stone in the high pan and a small light in the low one. */
  scales: (p) => {
    const beam = "M80,52L320,84L320,94L80,62Z";
    const panL = "M44,150H140C134,180 50,180 44,150Z";
    const panR = "M260,204H356C350,234 266,234 260,204Z";
    return [
      p.sh(rect(192, 66, 16, 206), rect(201, 66, 7, 206), "h2"),
      p.sh(rect(160, 272, 80, 14)),
      p.sh(rect(132, 286, 136, 14), rect(220, 286, 48, 14), "h2"),
      p.f("M92,60L52,150M92,60L132,150M308,90L268,204M308,90L348,204"),
      p.o(beam) + p.l(beam),
      p.k(circle(200, 68, 11)),
      p.k("M66,150C70,124 112,120 118,150Z"),
      p.sh(panL, "M92,150H140C136,170 112,176 92,172Z", "h2"),
      p.l(rays(308, 180, 22, 36, 9, 200, 140), 2),
      p.m(circle(308, 186, 16)) + p.l(circle(308, 186, 16)),
      p.sh(panR, "M308,204H356C352,224 328,230 308,226Z", "h2"),
    ].join("");
  },

  /** The Deconstruction of Faith: a church front with its stones taken down, the round window still lit. */
  ruin: (p) => {
    const wall = "M96,300V140L200,56L262,106V128H286V150H310V300Z";
    const door = "M172,300V236a28,28 0 0 1 56,0V300Z";
    const courses = [172, 194, 216, 238, 260, 282].map((y) => `M96,${y}H310`).join("") + "M96,150H286";
    const block = (x, y, w, h) => p.sh(rect(x, y, w, h), rect(x + w * 0.6, y, w * 0.4, h), "h2");
    return [
      p.o(wall) + p.t(wall) + p.h("M240,90L262,106V128H286V150H310V300H240Z", "h1") + p.f(courses),
      p.f("M130,150V172M164,172V194M118,194V216M150,216V238M126,238V260M270,172V194M250,194V216M284,216V238M262,238V260M278,260V282M140,260V282"),
      p.l(wall),
      p.h(door, "h3") + p.l(door),
      p.m(circle(200, 146, 24)) + p.l(circle(200, 146, 24)) + p.f("M200,122V170M176,146H224"),
      block(322, 276, 44, 24),
      block(332, 254, 36, 22),
      block(30, 280, 40, 20),
      p.f("M300,96L318,84M312,112L334,104M286,74L298,58"),
    ].join("");
  },

  /** The Reliability of Scripture: a storage jar and an unrolled scroll, its first letter gilded. */
  scrolljar: (p) => {
    const jar = "M96,96C70,120 62,160 70,200C76,226 86,238 100,244H164C178,238 188,226 194,200C202,160 194,120 168,96Z";
    const body = [
      p.sh(jar, "M140,96H168C194,120 202,160 194,200C188,226 178,238 164,244H140Z", "h2"),
      p.f("M78,140C110,150 154,150 186,140M72,180C108,192 156,192 192,180"),
      p.sh(rect(104, 74, 56, 22), rect(138, 74, 22, 22), "h2"),
      p.sh(rect(116, 60, 32, 14)),
    ].join("");
    const sheet = rect(246, 206, 112, 94);
    const lines = [236, 248, 260, 272, 284].map((y, i) => `M${i === 0 ? 290 : 262},${y}H${i % 2 ? 336 : 346}`).join("");
    return [
      `<g transform="translate(-52,7) scale(1.2)">${body}</g>`,
      p.o(sheet) + p.f(lines) + p.l(sheet),
      p.m(rect(262, 220, 20, 22)) + p.l(rect(262, 220, 20, 22)),
      p.sh(rect(232, 196, 16, 104), rect(241, 196, 7, 104), "h2"),
      p.sh(rect(356, 196, 16, 104), rect(365, 196, 7, 104), "h2"),
      p.k(rect(229, 190, 22, 6)) + p.k(rect(353, 190, 22, 6)),
    ].join("");
  },

  /** A long table set with bread and a cup, under an arched window. */
  longtable: (p) => {
    const win = "M136,172V84a64,64 0 0 1 128,0V172Z";
    const loaf = "M70,214C70,180 156,180 156,214Z";
    const bowl = "M212,160H268C268,190 254,200 240,200C226,200 212,190 212,160Z";
    return [
      p.o(win) + p.t(win) + p.h(win, "hs") + p.l(win) + p.l("M200,20V172M136,100H264"),
      p.sh(rect(24, 214, 352, 16), rect(24, 222, 352, 8), "hh"),
      p.sh(rect(48, 230, 16, 70), rect(57, 230, 7, 70), "h2"),
      p.sh(rect(336, 230, 16, 70), rect(345, 230, 7, 70), "h2"),
      p.f("M64,244H336"),
      p.sh(loaf, "M118,214C140,214 156,206 156,214Z", "h2") + p.h("M113,189C140,192 156,200 156,214H113Z", "h2") + p.l(loaf) + p.f("M92,198l10,14M110,192l10,20M130,194l8,18"),
      p.m(bowl) + p.l(bowl) + p.l("M240,200V214M224,214H256", 3),
      p.sh(rect(290, 200, 54, 14), rect(318, 200, 26, 14), "h2"),
    ].join("");
  },

  /** A door standing open, light falling through it across the floor. */
  door: (p) => {
    const opening = rect(140, 56, 130, 244);
    const leafD = "M140,56L80,82V326L140,300Z";
    return [
      p.light("M140,300H270L340,340H86Z"),
      p.light(opening),
      p.l(rays(205, 226, 44, 70, 9, 190, 160), 2),
      p.m("M165,226a40,40 0 0 1 80,0Z") + p.l("M165,226a40,40 0 0 1 80,0Z"),
      p.l("M140,226H270"),
      p.l(opening, 3),
      p.o(leafD) + p.t(leafD) + p.h(leafD, "h2") + p.l(leafD),
      p.l("M92,100L128,86V176L92,186ZM92,206L128,198V288L92,304Z", 1.6),
      p.k(circle(124, 190, 4)),
    ].join("");
  },

  /** A plumb line hanging true beside a wall that leans. */
  plumbline: (p) => {
    const wall = "M250,300L274,60L364,68L340,300Z";
    const courses = [1, 2, 3, 4, 5, 6, 7].map((i) => {
      const y = 60 + i * 30;
      const xl = 274 - (24 * (y - 60)) / 240;
      return `M${n(xl)},${n(y)}L${n(xl + 90)},${n(y + 8 - (8 * (y - 60)) / 240)}`;
    });
    return [
      p.o(wall) + p.t(wall) + p.h("M318,64L364,68L340,300H300Z", "h1") + p.f(courses.join("")) + p.l(wall),
      p.sh(rect(56, 36, 16, 264), rect(65, 36, 7, 264), "h2"),
      p.sh(rect(56, 36, 180, 14)),
      p.l("M72,86L112,50", 3),
      p.l("M222,50V214", 1.6),
      p.k(rect(214, 208, 16, 8)),
      p.m("M206,216H238L222,262Z") + p.l("M206,216H238L222,262Z"),
      p.f("M222,272V300"),
    ].join("");
  },

  /** A young tree tied to a stake beside a house, the sun above it. */
  sapling: (p) => {
    const house = "M254,300V226L310,182L366,226V300Z";
    const leaves = [
      [122, 190, -130], [122, 190, -60], [176, 168, -40], [176, 168, -110], [140, 146, -150], [140, 146, -80], [150, 132, -95], [162, 196, -20], [134, 214, -160],
    ];
    return [
      p.paper(circle(84, 72, 40)),
      p.l(rays(84, 72, 40, 58, 16), 2),
      p.m(circle(84, 72, 30)) + p.l(circle(84, 72, 30)),
      p.o(house) + p.t(house) + p.h("M310,182L366,226V300H310Z", "h1") + p.l(house),
      p.k("M244,230L310,176L376,230L368,240L310,194L252,240Z"),
      p.o(rect(276, 244, 24, 26)) + p.f("M288,244V270M276,257H300"),
      p.o(rect(322, 252, 22, 48)),
      p.h("M96,300C120,278 184,278 208,300Z", "h2") + p.l("M96,300C120,278 184,278 208,300"),
      p.sh(rect(170, 142, 9, 150), rect(175, 142, 4, 150), "h2"),
      p.l("M150,296C150,258 146,220 150,132", 5),
      p.l("M149,232C136,218 128,206 122,190M150,212C164,200 172,186 176,168M150,188C142,172 140,160 140,146", 3),
      p.f("M150,222H170M150,172H170"),
      ...leaves.map(([x, y, d]) => p.o(leaf(x, y, d)) + p.t(leaf(x, y, d)) + p.l(leaf(x, y, d), 1.6)),
    ].join("");
  },

  /** A basin, a pitcher and a towel. */
  basin: (p) => {
    const bowl = "M92,238H308C304,278 264,300 200,300C136,300 96,278 92,238Z";
    const rim = "M86,238a114,15 0 1,0 228,0a114,15 0 1,0 -228,0Z";
    const pitcher = "M64,226C42,200 44,148 70,126V100H112V126C138,148 140,200 118,226Z";
    const towel = "M246,232C256,206 292,204 302,230V292H250Z";
    return [
      p.l("M112,132C150,132 150,186 124,196", 5),
      p.sh(pitcher, "M96,100H112V126C138,148 140,200 118,226H96Z", "h2"),
      p.f("M70,126H112M56,176H130"),
      p.sh(bowl, "M200,238H308C304,278 264,300 200,300Z", "h2"),
      p.o(rim) + p.f("M120,238C150,246 250,246 280,238M150,234C180,240 220,240 250,234") + p.l(rim),
      p.o(towel) + p.m("M250,266H302V276H250Z") + p.f("M250,258H302M250,284H302") + p.l(towel),
    ].join("");
  },

  /** Three columns carrying a pediment with a round window. */
  columns: (p) => {
    const ped = "M52,104L200,30L348,104Z";
    const col = (x) =>
      p.o(rect(x - 6, 122, 48, 10)) + p.sh(rect(x, 132, 36, 136), rect(x + 22, 132, 14, 136), "h2") + p.f(`M${x + 9},132V268M${x + 18},132V268`) + p.l(rect(x - 6, 122, 48, 10));
    return [
      p.o(ped) + p.t(ped) + p.h("M200,30L348,104H200Z", "h1") + p.l(ped),
      p.m(circle(200, 78, 14)) + p.l(circle(200, 78, 14)),
      p.sh(rect(60, 104, 280, 18), rect(60, 113, 280, 9), "hh"),
      col(84),
      col(182),
      col(280),
      p.sh(rect(58, 268, 284, 16), rect(240, 268, 102, 16), "h2"),
      p.sh(rect(40, 284, 320, 16), rect(250, 284, 110, 16), "h2"),
    ].join("");
  },

  /** A compass rose, its north point gilded. */
  compass: (p) => {
    const ring = circle(200, 156, 124);
    const ticks = [];
    for (let i = 0; i < 32; i++) {
      const t = (i * 11.25 * Math.PI) / 180;
      ticks.push(`M${n(200 + 104 * Math.cos(t))},${n(156 + 104 * Math.sin(t))}L${n(200 + 114 * Math.cos(t))},${n(156 + 114 * Math.sin(t))}`);
    }
    const minor = [45, 135, 225, 315].map((d) => {
      const t = (d * Math.PI) / 180;
      const q = ((d + 90) * Math.PI) / 180;
      return `M${n(200 + 70 * Math.cos(t))},${n(156 + 70 * Math.sin(t))}L${n(200 + 12 * Math.cos(q))},${n(156 + 12 * Math.sin(q))}L${n(200 - 12 * Math.cos(q))},${n(156 - 12 * Math.sin(q))}Z`;
    });
    return [
      p.o(ring) + p.t(ring) + p.paper(circle(200, 156, 114)) + p.l(circle(200, 156, 114)) + p.l(ring),
      p.f(ticks.join("")) + p.f(circle(200, 156, 100)),
      p.o(minor.join("")),
      p.o("M200,260L218,156H182Z") + p.k("M200,260L218,156H200Z"),
      p.o("M304,156L200,174V138Z") + p.k("M304,156L200,174V156Z"),
      p.o("M96,156L200,174V138Z") + p.k("M96,156L200,174V156Z"),
      p.m("M200,40L220,156H180Z") + p.l("M200,40L220,156H180Z") + p.f("M200,40V156"),
      p.k(circle(200, 156, 6)),
      p.sh(rect(150, 284, 100, 16), rect(210, 284, 40, 16), "h2"),
    ].join("");
  },
};

/** One emblem per kind of printable, by name, in a 240 by 240 box. */
export const KIND_ART = {
  openbook: (p) => {
    const page = "M36,172C66,148 98,150 120,164V94C98,80 66,78 36,102Z";
    const words = [0, 14, 28].map((dy) => `M50,${122 + dy}C70,${108 + dy} 92,${110 + dy} 108,${120 + dy}`).join("");
    const flip = (s) => `<g transform="translate(240,0) scale(-1,1)">${s}</g>`;
    return [p.k("M28,180H212V172H28Z"), p.o(page) + p.t(page) + p.paper(page) + p.l(page) + p.f(words), flip(p.o(page) + p.h("M120,164V94C98,80 66,78 36,102V116C70,94 98,96 120,114Z", "h1") + p.l(page) + p.f(words)), p.m(rect(48, 100, 14, 16)) + p.l(rect(48, 100, 14, 16), 1.4)].join("");
  },
  lamp: (p) => {
    const body = "M52,150C52,122 150,116 172,138L204,128L208,142L176,158C152,180 62,180 52,150Z";
    return [p.sh(body, "M120,126C150,122 166,130 172,138L176,158C160,174 136,176 120,174Z", "h2"), p.l(circle(50, 146, 13), 4), p.f("M70,140C100,132 140,132 166,142"), p.m("M204,124C194,106 208,98 206,82C220,98 222,112 210,126Z") + p.l("M204,124C194,106 208,98 206,82C220,98 222,112 210,126Z", 1.6), p.l("M40,184H200")].join("");
  },
  lantern: (p) => {
    const flame = "M120,164C106,148 118,134 120,114C130,134 136,148 120,164Z";
    return [p.l(circle(120, 44, 10), 3), p.sh("M76,84L120,54L164,84Z"), p.o(rect(86, 84, 68, 94)) + p.t(rect(86, 84, 68, 94)) + p.paper(rect(92, 90, 56, 82)) + p.l(rect(86, 84, 68, 94)), p.l(rays(120, 142, 20, 30, 7, 200, 140), 1.6), p.m(flame) + p.l(flame, 1.6), p.sh(rect(76, 178, 88, 12), rect(130, 178, 34, 12), "h2")].join("");
  },
  road: (p) => {
    const road = "M84,204C100,164 150,152 118,116H128C170,150 160,176 164,204Z";
    return [p.l(rays(120, 116, 30, 44, 9, 190, 160), 1.6), p.m("M94,116a26,26 0 0 1 52,0Z") + p.l("M94,116a26,26 0 0 1 52,0Z", 1.6), p.l("M30,116H210"), p.o(road) + p.h("M124,204C130,170 160,160 128,116C170,150 160,176 164,204Z", "h2") + p.l(road), p.sh(rect(52, 162, 14, 22)), p.sh(rect(176, 142, 10, 16))].join("");
  },
  quill: (p) => {
    const sheet = rect(52, 66, 104, 128);
    const feather = "M196,36C156,66 132,110 128,154L138,156C166,132 192,90 196,36Z";
    return [p.o(sheet) + p.f("M82,92H140M66,112H142M66,128H136M66,144H142M66,160H120") + p.l(sheet), p.m(rect(64, 78, 14, 18)) + p.l(rect(64, 78, 14, 18), 1.4), p.o(feather) + p.t(feather) + p.h("M196,36C184,90 162,132 138,156C166,132 192,90 196,36Z", "h2") + p.l(feather) + p.f("M192,46L132,152"), p.l("M130,152L116,184", 3)].join("");
  },
  notebook: (p) => {
    const cover = rect(64, 50, 112, 144);
    const rings = [66, 90, 114, 138, 162].map((y) => circle(64, y + 6, 6)).join("");
    return [p.o(cover) + p.t(cover) + p.h(rect(140, 50, 36, 144), "h2") + p.l(cover), p.o(rect(88, 80, 66, 34)) + p.f("M98,92H144M98,102H132"), p.o(rings), p.o("M186,196L204,60L216,62L198,198Z") + p.m("M203,70L215,72L213,84L201,82Z") + p.l("M186,196L204,60L216,62L198,198Z") + p.k("M186,196L198,198L190,212Z")].join("");
  },
  cards: (p) => {
    const card = rect(82, 58, 78, 116);
    const turned = (deg, body) => `<g transform="rotate(${deg} 121 186)">${body}</g>`;
    return [turned(-16, p.o(card) + p.h(card, "h1") + p.l(card)), turned(14, p.o(card) + p.t(card) + p.l(card)), p.o(card) + p.f("M96,104H146M96,118H146M96,132H132") + p.l(card), p.m("M121,72L129,84L121,96L113,84Z") + p.l("M121,72L129,84L121,96L113,84Z", 1.4)].join("");
  },
  calendar: (p) => {
    const body = rect(52, 62, 136, 130);
    const grid = [0, 1, 2].map((i) => `M52,${118 + i * 25}H188`).join("") + [1, 2, 3].map((i) => `M${52 + i * 34},92V192`).join("");
    return [p.o(body) + p.t(body) + p.paper(body) + p.l(body), p.k(rect(52, 62, 136, 30)), p.f(grid), p.m(rect(120, 118, 34, 25)) + p.l(rect(120, 118, 34, 25), 1.4), p.l("M84,50V74M156,50V74", 5)].join("");
  },
  home: (p) => {
    const house = "M58,192V118L120,66L182,118V192Z";
    return [p.o(house) + p.t(house) + p.h("M120,66L182,118V192H120Z", "h1") + p.l(house), p.k("M46,122L120,58L194,122L186,132L120,76L54,132Z"), p.m(rect(132, 130, 26, 26)) + p.l(rect(132, 130, 26, 26), 1.6) + p.f("M145,130V156M132,143H158"), p.o(rect(80, 140, 26, 52)), p.l("M30,192H210")].join("");
  },
  signpost: (p) => {
    const a = "M62,72H150L168,88L150,104H62Z";
    const b = "M178,116H96L78,132L96,148H178Z";
    return [p.sh(rect(113, 52, 14, 142), rect(121, 52, 6, 142), "h2"), p.sh(a) + p.f("M78,88H140"), p.o(b) + p.h("M178,116H140V148H178Z", "h1") + p.l(b) + p.f("M106,132H164"), p.m(circle(120, 44, 9)) + p.l(circle(120, 44, 9), 1.6), p.h("M70,194C90,176 150,176 170,194Z", "h2") + p.l("M70,194C90,176 150,176 170,194")].join("");
  },
};

/** Where each drawing's ground line is, and whether the cover hatches ground beneath it. */
export const ART_META = {
  capitol: { horizon: 160, band: false, box: [20, 6, 384, 340] },
  spectacles: { box: [22, 52, 378, 300] },
  idol: { box: [96, 0, 304, 300] },
  scales: { box: [44, 50, 356, 300] },
  ruin: { box: [30, 54, 366, 300] },
  scrolljar: { box: [22, 78, 376, 300] },
  longtable: { box: [24, 20, 376, 300] },
  door: { box: [80, 54, 340, 340] },
  plumbline: { box: [56, 34, 366, 300] },
  sapling: { box: [26, 12, 378, 300] },
  basin: { box: [42, 98, 316, 300] },
  columns: { box: [40, 28, 360, 300] },
  compass: { box: [74, 30, 326, 300] },
};
