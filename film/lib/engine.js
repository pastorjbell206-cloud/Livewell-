// The picture engine every LiveWell film shares. A film is one SVG, 1280 by 720, drawn by frame(t), so any
// moment can be rendered exactly. film/<name>/film.html loads this file, then calls Film.make(build), where
// build(tools) creates its shapes once and returns draw(t), which is called for every frame.
// The engine owns: the page, LiveWell's colours and fonts, the kicker at the top, the captions at the
// bottom (in step with timeline.json), drifting dust so nothing ever sits still, the opening title, the
// closing card, and the frame-by-frame export used by tools/render.mjs.
// Open film.html?t=42 to freeze on second 42.
(() => {
  const NS = "http://www.w3.org/2000/svg";
  const FONT_DIR = "../../client/public/fonts/";
  const INK = "#14110C", BONE = "#F5F0E6", WARM = "#EDE8DC", MUTED = "#D9D3C4", STONE = "#5A5448", MUSTARD = "#D4A017", LINE = "#C0B9A8", CHAR = "#2A2A2A";
  const FACES = `
@font-face{font-family:"Display";font-style:normal;font-weight:400 600;src:url("${FONT_DIR}cormorant-garamond-400-latin.woff2") format("woff2");}
@font-face{font-family:"Display";font-style:italic;font-weight:400;src:url("${FONT_DIR}cormorant-garamond-400-italic-latin.woff2") format("woff2");}
@font-face{font-family:"Sans";font-style:normal;font-weight:400 600;src:url("${FONT_DIR}inter-400-latin.woff2") format("woff2");}`;
  const CLASSES = `
.cap{font-family:"Sans",sans-serif;font-weight:500;font-size:29px;fill:${INK};text-anchor:middle}
.kick{font-family:"Sans",sans-serif;font-weight:600;font-size:17px;letter-spacing:5px;fill:${STONE};text-anchor:middle}
.lab{font-family:"Sans",sans-serif;font-weight:600;font-size:17px;letter-spacing:3px;fill:${STONE};text-anchor:middle}
.disp{font-family:"Display",Georgia,serif;font-weight:500;fill:${INK};text-anchor:middle}
.ital{font-family:"Display",Georgia,serif;font-style:italic;font-weight:400;fill:${INK};text-anchor:middle}`;
  const head = document.createElement("style");
  head.textContent = FACES + `html,body{margin:0;height:100%;background:${BONE};overflow:hidden}svg{display:block;width:100vw;height:100vh}` + CLASSES;
  document.head.appendChild(head);

  // ---------- small tools ----------
  const el = (name, attrs, parent) => { const e = document.createElementNS(NS, name); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const txt = (parent, cls, x, y, s, size, extra) => { const e = el("text", { class: cls, x, y, ...(size ? { style: `font-size:${size}px` } : {}), ...(extra || {}) }, parent); e.textContent = s; return e; };
  const set = (e, attrs) => { for (const k in attrs) e.setAttribute(k, attrs[k]); };
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const ease = (x) => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const soft = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
  const up = (t, a, d = 1) => ease((t - a) / d);                       // 0 to 1, starting at a, taking d seconds
  const span = (t, a, b, fi = 0.6, fo = fi) => Math.min(up(t, a, fi), 1 - up(t, b - fo, fo));   // in at a, fully out by b
  const mix = (p, q, k) => p + (q - p) * k;
  const op = (e, v) => { if (v <= 0.002) e.setAttribute("display", "none"); else { e.removeAttribute("display"); e.setAttribute("opacity", v.toFixed(3)); } };
  const draw = (e, k) => e.setAttribute("stroke-dashoffset", (1 - clamp(k)).toFixed(4));    // for paths made with line()
  const line = (parent, d, attrs) => el("path", { d, fill: "none", stroke: INK, "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round", pathLength: 1, "stroke-dasharray": 1, "stroke-dashoffset": 1, ...(attrs || {}) }, parent);
  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let r = Math.imul(seed ^ (seed >>> 15), 1 | seed); r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r; return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
  const move = (e, x, y, s = 1, r = 0) => e.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})${r ? ` rotate(${r.toFixed(2)})` : ""}${s !== 1 ? ` scale(${s.toFixed(4)})` : ""}`);

  // ---------- timeline ----------
  const SCRIPT = window.SCRIPT;           // injected by the tools: script.json
  let TL = window.TIMELINE || null;       // injected by the tools: timeline.json (from the recorded voice)
  if (!TL && SCRIPT) {                    // no recording yet: estimate at 3 words a second
    let t = 2.6; const chapters = [];
    for (const ch of SCRIPT.chapters) {
      const start = t - 0.9, lines = [];
      for (const s of ch.lines) { const d = s.split(" ").length / 3; lines.push({ text: s, start: t, end: t + d }); t += d + 0.5; }
      t += (SCRIPT.gap || 1) - 0.5; chapters.push({ id: ch.id, kicker: ch.kicker, start, end: t + 0.4, lines });
    }
    TL = { length: t + 6, chapters };
  }
  const LENGTH = TL.length;
  const chap = Object.fromEntries(TL.chapters.map((c) => [c.id, c]));
  const S = (id, k = 0) => chap[id].lines[k].start;      // when line k of a chapter starts
  const E = (id, k = -1) => chap[id].lines.at(k).end;    // when it ends (default: the chapter's last line)
  const VOICE_END = TL.chapters.at(-1).lines.at(-1).end;

  // captions: long lines split at punctuation, each piece wrapped onto at most two rows
  const chunks = [];
  for (const c of TL.chapters) for (const l of c.lines) {
    const parts = []; let cur = "";
    for (const w of l.text.split(" ")) { cur = cur ? cur + " " + w : w; if (cur.length > 58 && /[,:.?]$/.test(w)) { parts.push(cur); cur = ""; } }
    if (cur) { if (parts.length && cur.length < 22) parts[parts.length - 1] += " " + cur; else parts.push(cur); }
    const total = parts.reduce((s, p) => s + p.length, 0); let a = l.start;
    parts.forEach((p) => { const d = (l.end - l.start) * p.length / total; chunks.push({ text: p, start: a, end: a + d }); a += d; });
  }
  const wrap = (s) => {
    if (s.length <= 50) return [s, ""];
    const words = s.split(" "); let best = null;
    for (let i = 1; i < words.length; i++) { const a = words.slice(0, i).join(" "), b = words.slice(i).join(" "), score = Math.max(a.length, b.length); if (!best || score < best[2]) best = [a, b, score]; }
    return [best[0], best[1]];
  };

  // ---------- the page ----------
  const svg = el("svg", { viewBox: "0 0 1280 720", id: "stage", fill: "none" }, document.body);
  el("rect", { width: 1280, height: 720, fill: BONE }, svg);
  const dust = el("g", {}, svg);
  const cam = el("g", {}, svg), world = el("g", {}, cam);
  const top = el("g", {}, svg);
  const kickRule = el("rect", { x: 620, y: 44, width: 40, height: 3, fill: MUSTARD }, top);
  const kick = txt(top, "kick", 640, 78, "");
  const cap1 = txt(top, "cap", 640, 640, ""), cap2 = txt(top, "cap", 640, 680, "");
  const cardG = el("g", {}, svg);

  const r0 = rng(7), motes = [...Array(18)].map(() => ({ x: r0() * 1280, y: r0() * 720, r: 1.4 + r0() * 2.2, v: 5 + r0() * 9, w: 20 + r0() * 40, p: r0() * 6.28, e: el("circle", { fill: MUTED }, dust) }));

  // opening title and closing card
  let TITLE = null, CARD = null;
  const title = (s, size = 76) => { TITLE = txt(cardG, "disp", 640, 345, s, size); };
  const endCard = (lines, at) => {
    const g = el("g", {}, cardG); const bg = el("rect", { width: 1280, height: 720, fill: BONE }, g);
    const a = txt(g, "disp", 640, 330, lines[0], lines[0].length > 30 ? 58 : 66);
    const rule = el("rect", { x: 640, y: 372, width: 0, height: 3, fill: MUSTARD }, g);
    const b = txt(g, "disp", 640, 432, lines[1], 30);
    CARD = { g, bg, a, rule, b, at: at ?? VOICE_END + 0.5 };
  };

  // ---------- frame ----------
  let DRAW = () => {};
  function frame(t) {
    DRAW(t);
    for (const m of motes) { const y = ((m.y - t * m.v) % 760 + 760) % 760 - 20; set(m.e, { cx: (m.x + Math.sin(t / 5 + m.p) * m.w).toFixed(1), cy: y.toFixed(1), r: m.r, opacity: (0.55 + 0.3 * Math.sin(t / 3 + m.p)).toFixed(2) }); }
    if (TITLE) { const v = span(t, 0.35, S(TL.chapters[0].id) - 0.25, 0.7, 0.6); op(TITLE, v); TITLE.setAttribute("y", (345 - 8 * up(t, 0.35, 2.4)).toFixed(1)); }
    // kicker
    let k = "", ko = 0;
    for (const c of TL.chapters) { if (!c.kicker) continue; const s = span(t, c.start + 0.35, c.end + 0.1, 0.55); if (s > ko) { ko = s; k = c.kicker.toUpperCase(); } }
    if (kick.textContent !== k) kick.textContent = k;
    op(kick, ko); op(kickRule, ko); set(kickRule, { x: (640 - 20 * ko).toFixed(1), width: (40 * ko).toFixed(1) });
    // captions
    let cur = null, co = 0;
    for (const ch of chunks) { const s = span(t, ch.start - 0.15, ch.end + 0.35, 0.28); if (s > co) { co = s; cur = ch; } }
    const [a, b] = cur ? wrap(cur.text) : ["", ""];
    if (cap1.textContent !== a) cap1.textContent = a; if (cap2.textContent !== b) cap2.textContent = b;
    const rise = (1 - co) * 8;
    op(cap1, co); cap1.setAttribute("y", ((b ? 632 : 652) + rise).toFixed(1));
    op(cap2, b ? co : 0); cap2.setAttribute("y", (672 + rise).toFixed(1));
    // closing card
    if (CARD) { const c = CARD, u = t - c.at; op(c.g, u > 0 ? 1 : 0); if (u > 0) { op(c.bg, up(u, 0, 0.9)); op(c.a, up(u, 0.5, 1.1)); c.a.setAttribute("y", (338 - 8 * up(u, 0.5, 2.5)).toFixed(1)); const w = 56 * up(u, 1.2, 1.2); set(c.rule, { x: (640 - w / 2).toFixed(1), width: w.toFixed(1) }); op(c.b, up(u, 1.7, 1.1)); } }
    // slow camera drift, so even a held picture breathes
    const z = 1 + 0.022 * Math.sin((t / LENGTH) * Math.PI), dx = 5 * Math.sin(t / 9), dy = 3 * Math.sin(t / 7 + 1);
    cam.setAttribute("transform", `translate(${(640 + dx).toFixed(2)} ${(360 + dy).toFixed(2)}) scale(${z.toFixed(4)}) translate(-640 -360)`);
  }

  // ---------- frame-by-frame export (tools/render.mjs) ----------
  let st = null;
  window.prepareStill = (fontCss, width = 1920) => {
    const height = Math.round(width * 9 / 16), canvas = Object.assign(document.createElement("canvas"), { width, height });
    const style = document.createElementNS(NS, "style"); style.textContent = fontCss + CLASSES; svg.insertBefore(style, svg.firstChild);
    set(svg, { xmlns: NS, width, height }); st = { canvas, ctx: canvas.getContext("2d"), width, height };
  };
  window.still = async (t) => {
    frame(t); const img = new Image();
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    await img.decode(); st.ctx.drawImage(img, 0, 0, st.width, st.height);
    return st.canvas.toDataURL("image/jpeg", 0.95);
  };
  window.__frame = frame; window.LENGTH = LENGTH;

  window.Film = {
    make(build) {
      DRAW = build({ el, txt, set, op, draw, line, move, clamp, ease, soft, up, span, mix, rng, S, E, TL, LENGTH, VOICE_END, world, title, endCard,
        INK, BONE, WARM, MUTED, STONE, MUSTARD, LINE, CHAR, layer: (parent) => el("g", {}, parent || world) }) || (() => {});
      const q = new URLSearchParams(location.search);
      document.fonts.ready.then(() => {
        if (q.has("hide")) top.setAttribute("display", "none");          // poster: no kicker, no captions
        if (q.has("t")) { frame(Number(q.get("t"))); document.title = "frame " + q.get("t"); return; }
        if (q.has("rec")) { frame(0); document.title = "ready"; return; }
        const start = performance.now();
        const tick = (now) => { const t = (now - start) / 1000; frame(Math.min(t, LENGTH)); if (t < LENGTH + 0.5) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      });
    },
  };
})();
