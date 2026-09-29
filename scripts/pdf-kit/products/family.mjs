/**
 * For the household: catechism cards + fridge chart, the family devotions
 * volumes, and the Advent and Holy Week packs. Everything is laid out from
 * client/public/family-*.json; nothing here adds content beyond short
 * instructions for using the printout.
 */
import { C, fitLevel, smart } from "../index.mjs";

// ---------------------------------------------------------------------------
// Cards: four to a Letter page, with cut marks. Each card is a list of blocks
// drawn top-down inside its box; optional blocks drop out if a card runs long.
// ---------------------------------------------------------------------------

const CARD_PAD = 24;

function blockHeight(d, b, width) {
  if (b.rule) return b.after || 0;
  d.font(b.role).fontSize(b.size);
  const h = d.heightOfString(b.text, { width: width - (b.indent || 0), lineGap: b.gap || 0, characterSpacing: b.cs || 0 });
  return h + (b.after || 0);
}

function drawCard(k, x, y, w, h, blocks) {
  const d = k.doc;
  const iw = w - CARD_PAD * 2;
  const ih = h - CARD_PAD * 2;
  let use = blocks.slice();
  let total = use.reduce((s, b) => s + blockHeight(d, b, iw), 0);
  for (const drop of ["optional2", "optional1"]) {
    if (total <= ih) break;
    use = use.filter((b) => b.drop !== drop);
    total = use.reduce((s, b) => s + blockHeight(d, b, iw), 0);
  }
  let scale = 1;
  while (total > ih && scale > 0.7) {
    scale -= 0.04;
    total = use.reduce((s, b) => s + blockHeight(d, { ...b, size: b.size * scale, after: (b.after || 0) * scale, gap: (b.gap || 0) * scale }, iw), 0);
  }
  k.group("Sect", () => {
    let cy = y + CARD_PAD;
    for (const b0 of use) {
      const b = { ...b0, size: b0.size * scale, after: (b0.after || 0) * scale, gap: (b0.gap || 0) * scale };
      if (b.rule) {
        k.rule({ x: x + CARD_PAD, y: cy + 2, length: 28, width: 1.2 });
        cy += b.after;
        continue;
      }
      const draw = () => {
        d.font(b.role).fontSize(b.size).fillColor(b.color || C.ink)
          .text(b.text, x + CARD_PAD + (b.indent || 0), cy, { width: iw - (b.indent || 0), lineGap: b.gap || 0, characterSpacing: b.cs || 0 });
      };
      k.tag(b.tag || "P", draw);
      cy = d.y + (b.after || 0);
    }
  });
}

/** Lay `cards` (arrays of blocks) out four to a page with cut marks. */
function cardPages(k, cards, { heading } = {}) {
  const d = k.doc;
  const W = d.page.width;
  const H = d.page.height;
  const cw = W / 2;
  const ch = H / 2;
  cards.forEach((blocks, i) => {
    const slot = i % 4;
    if (slot === 0) {
      if (i > 0) k.newPage();
      k.hideChrome();
      d.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };
      if (heading && i === 0) k.bookmark(heading, 0);
      k.artifact(() => {
        d.save().lineWidth(0.5).strokeColor(C.rule).dash(3, { space: 3 })
          .moveTo(cw, 12).lineTo(cw, H - 12).stroke()
          .moveTo(12, ch).lineTo(W - 12, ch).stroke().undash().restore();
      });
    }
    const x = (slot % 2) * cw;
    const y = Math.floor(slot / 2) * ch;
    drawCard(k, x, y, cw, ch, blocks);
  });
}

const L = (text, extra = {}) => ({ role: "sansMedium", size: 7, cs: 1.2, color: C.mustardText, text: smart(text).toUpperCase(), after: 7, ...extra });

// ---------------------------------------------------------------------------
// Catechism
// ---------------------------------------------------------------------------

export function catechismCards(items) {
  return {
    title: "The Family Catechism: Cards",
    subject: `All ${items.length} questions of the LiveWell family catechism as cut-apart cards, four to a page.`,
    keywords: ["catechism", "family", "children", "cards"],
    runningHead: "The Family Catechism",
    chrome: false,
    render(k) {
      const cards = items.map((q) => [
        L(`Question ${q.number} · ${q.part}`, { size: 6.5, cs: 1 }),
        { role: "display", size: 21, text: smart(q.question), gap: 1, after: 10, tag: "H2" },
        { role: "sans", size: 9.2, text: smart(q.answer), gap: 3.4, after: 10 },
        ...(q.kidsAnswer ? [L("For little ones", { after: 3 }), { role: "sansMedium", size: 9.2, text: smart(q.kidsAnswer), gap: 3, after: 10 }] : []),
        { rule: true, after: 10 },
        { role: "displayItalic", size: 11.5, text: smart(q.scriptureText), gap: 1.5, after: 3 },
        { role: "sansMedium", size: 6.8, cs: 0.9, color: C.muted, text: `${q.scripture} (ESV)`.toUpperCase(), after: 10 },
        { role: "sans", size: 8, color: C.muted, text: smart(q.commentary), gap: 2.6, after: 8, drop: "optional2" },
        { role: "sansItalic", size: 8, color: C.muted, text: smart(q.prayer), gap: 2.4, after: 0, drop: "optional1" },
      ]);
      cardPages(k, cards, { heading: "The Family Catechism" });
    },
  };
}

export function catechismChart(items) {
  return {
    title: "The Family Catechism: Fridge Chart",
    subject: `The ${items.length} catechism questions with the short answer for children, on one page.`,
    keywords: ["catechism", "family", "children", "chart"],
    runningHead: "The Family Catechism",
    chrome: false,
    margins: CHART_MARGINS,
    render(k) {
      const sizes = [7, 6.8, 6.6, 6.4, 6.2, 6, 5.8];
      const lv = fitLevel({ title: "chart", chrome: false, margins: CHART_MARGINS }, (trial, l) => drawChart(trial, items, sizes[l]), sizes.length - 1);
      drawChart(k, items, sizes[lv]);
    },
  };
}

const CHART_MARGINS = { top: 34, bottom: 30, left: 34, right: 34 };

function drawChart(k, items, size) {
  const d = k.doc;
  k.hideChrome();
  k.bookmark("The Family Catechism: Fridge Chart", 0);
  k.eyebrow("LiveWell by James Bell · For the household", { size: 6.5, after: 3 });
  k.tag("H1", () => d.font("display").fontSize(22).fillColor(C.ink).text("The Family Catechism", k.left, d.y, { characterSpacing: -0.4 }));
  k.tag("P", () => d.font("sans").fontSize(7).fillColor(C.muted)
    .text("Each question with the short answer for children. Check a box when your family can say it together.", k.left, d.y + 1, { width: k.width }));
  d.y += 6;
  k.hairline({ after: 8 });
  const gutter = 16;
  const COLS = 3;
  const colW = (k.width - gutter * (COLS - 1)) / COLS;
  const top = d.y;
  const bottom = k.bottom - 12;
  let col = 0;
  let y = top;
  let part = null;
  const gap = 1.2;
  k.group("L", () => {
    for (const q of items) {
      const text = `${q.question}  ${q.kidsAnswer || ""}`;
      d.font("sans").fontSize(size);
      const h = d.heightOfString(text, { width: colW - 28, lineGap: gap }) + 2.6;
      const needPart = q.part !== part;
      const ph = needPart ? 15 : 0;
      if (y + h + ph > bottom && col < COLS - 1) {
        col++;
        y = top;
      }
      const cx = k.left + col * (colW + gutter);
      if (needPart) {
        part = q.part;
        d.y = y + (y === top ? 0 : 3);
        k.tag("H2", () => d.font("sansMedium").fontSize(5.8).fillColor(C.mustardText)
          .text(part.toUpperCase(), cx, d.y, { width: colW, characterSpacing: 0.6 }));
        y = d.y + 3;
      }
      k.checkbox(cx, y + 0.5, 6.5);
      d.y = y;
      k.group("LI", () => {
        k.tag("Lbl", () => d.font("mono").fontSize(5.8).fillColor(C.muted).text(String(q.number), cx + 9, y + 1, { width: 14, lineBreak: false }));
        d.y = y;
        k.tag("LBody", () => {
          d.font("sansMedium").fontSize(size).fillColor(C.ink).text(smart(q.question) + "  ", cx + 26, y, { width: colW - 28, lineGap: gap, continued: true })
            .font("sans").fillColor(C.muted).text(smart(q.kidsAnswer || ""));
        });
      });
      y = d.y + 2.6;
    }
  });
  d.page.margins.bottom = 0;
  k.tag("Link", () => d.font("sans").fontSize(6).fillColor(C.mustardText)
    .text("livewellbyjamesbell.co/family/catechism", k.left, k.page.height - 22, { width: k.width, align: "right", link: "https://www.livewellbyjamesbell.co/family/catechism" }));
  d.page.margins.bottom = CHART_MARGINS.bottom;
}

// ---------------------------------------------------------------------------
// Devotions: twelve weeks to a volume
// ---------------------------------------------------------------------------

export function devotionsVolume(vol, items, total) {
  const first = items[0];
  const last = items[items.length - 1];
  return {
    title: `Family Devotions, Volume ${vol}`,
    subject: `Twelve weekly family devotions, from "${first.title}" to "${last.title}". Volume ${vol} of ${total}.`,
    keywords: ["family devotions", "children", "household", ...items.map((x) => x.theme)],
    runningHead: `Family Devotions · Volume ${vol}`,
    render(k) {
      k.cover({
        kicker: `Family Devotions · Volume ${vol} of ${total}`,
        title: `Twelve Weeks Around the Table`,
        subtitle: items.map((x) => x.theme).slice(0, 6).join(", ") + ", and more.",
        note: "One devotion a week. Read the passage aloud, talk through the questions, try the activity during the week, and close with the prayer.",
      });
      k.titled("Contents", `Volume ${vol}`, { keep: 200 });
      k.list(items.map((x, i) => `**Week ${i + 1}.** ${x.title} *(${x.theme})*`), { marker: "", indent: 0, itemGap: 3 });
      items.forEach((x, i) => {
        k.newPage();
        k.titled(`Week ${i + 1} · ${x.theme}`, x.title, { bookmark: true, bookmarkTitle: `Week ${i + 1}: ${x.title}`, bookmarkLevel: 1 });
        k.quote(x.passageText, `${x.passage} (ESV)`);
        if (x.bigIdea) {
          k.panel(({ x: px, width }) => {
            k.eyebrow("The big idea", { x: px, width, after: 3 });
            k.p(x.bigIdea, { x: px, width, after: 0, family: "display", size: 14 });
          }, { accent: true });
        }
        k.paras(x.reflection);
        if (x.questions?.length) {
          k.ensure(80);
          k.h3("Talk about it", { after: 5 });
          k.list(x.questions, { numbered: true });
        }
        k.labelled("Try this together", x.activity);
        k.labelled("Pray", x.prayer, { italic: true });
      });
      k.space(10);
      k.linkLine("More for the household: livewellbyjamesbell.co/family/devotions", "/family/devotions");
    },
  };
}

// ---------------------------------------------------------------------------
// Advent and Holy Week: daily cards + a chart to color in
// ---------------------------------------------------------------------------

function seasonCards(days, season) {
  return days.map((x) => [
    L(`${season} · Day ${x.day} · ${x.label}`, { size: 6.5, cs: 1 }),
    { role: "display", size: 20, text: smart(x.title), gap: 1, after: 8, tag: "H2" },
    { role: "displayItalic", size: 11.5, text: smart(x.passageText), gap: 1.4, after: 3 },
    { role: "sansMedium", size: 6.8, cs: 0.9, color: C.muted, text: `${x.passage} (ESV)`.toUpperCase(), after: 9 },
    { role: "sans", size: 8.6, text: smart(x.reflection), gap: 3, after: 9 },
    L("Talk about it", { after: 3 }),
    { role: "sansMedium", size: 8.6, text: smart(x.question), gap: 3, after: 9 },
    L("Pray", { after: 3 }),
    { role: "sansItalic", size: 8.6, color: C.muted, text: smart(x.prayer), gap: 3, after: 0 },
  ]);
}

function candleChart(k, days, { title, intro, cols }) {
  const d = k.doc;
  k.newPage();
  k.hideChrome();
  d.page.margins = { top: 54, bottom: 40, left: 54, right: 54 };
  d.y = 54;
  k.bookmark(title, 0);
  k.eyebrow("Color one flame each day", { after: 4 });
  k.h1(title, { keep: false, size: 30 });
  k.p(intro, { family: "sans", size: 9, color: C.muted });
  k.space(6);
  const rows = Math.ceil(days.length / cols);
  const gridTop = d.y;
  const gridH = k.bottom - gridTop - 10;
  const cellW = k.width / cols;
  const cellH = Math.min(gridH / rows, 150);
  k.group("L", () => {
    days.forEach((x, i) => {
      const cx = k.left + (i % cols) * cellW;
      const cy = gridTop + Math.floor(i / cols) * cellH;
      const mid = cx + cellW / 2;
      const candleW = Math.min(18, cellW * 0.22);
      const candleH = cellH * 0.34;
      const baseY = cy + cellH * 0.62;
      k.artifact(() => {
        d.save().lineWidth(0.8).strokeColor(C.ink);
        // flame (to color in)
        const fy = baseY - candleH - 4;
        d.moveTo(mid, fy - 16).bezierCurveTo(mid + 7, fy - 8, mid + 6, fy, mid, fy)
          .bezierCurveTo(mid - 6, fy, mid - 7, fy - 8, mid, fy - 16).stroke();
        d.moveTo(mid, fy).lineTo(mid, fy + 4).stroke();
        // candle body
        d.rect(mid - candleW / 2, baseY - candleH, candleW, candleH).stroke();
        d.restore();
        d.save().lineWidth(1).strokeColor(C.mustard).moveTo(mid - candleW, baseY + 2).lineTo(mid + candleW, baseY + 2).stroke().restore();
      });
      k.group("LI", () => {
        k.tag("Lbl", () => d.font("mono").fontSize(7).fillColor(C.muted).text(String(x.day), cx, baseY + 7, { width: cellW, align: "center", lineBreak: false }));
        k.tag("LBody", () => {
          d.font("sansMedium").fontSize(6.8).fillColor(C.ink).text(smart(x.label), cx + 3, baseY + 17, { width: cellW - 6, align: "center" });
          d.font("sans").fontSize(6.8).fillColor(C.muted).text(smart(x.title), cx + 3, d.y + 1, { width: cellW - 6, align: "center", lineGap: 1 });
        });
      });
    });
  });
}

export function adventPack(days) {
  return {
    title: "Advent at Home: Daily Cards and Candle Chart",
    subject: `${days.length} daily Advent readings for the family as cut-apart cards, with a candle chart to color in.`,
    keywords: ["Advent", "family", "children", "Christmas", "devotions"],
    runningHead: "Advent at Home",
    chrome: false,
    render(k) {
      k.cover({
        kicker: "For the household · Advent",
        title: "Advent at Home",
        subtitle: `${days.length} days of waiting, one short reading a night, from ${days[0].label} to ${days[days.length - 1].label}.`,
        note: "Cut the cards apart and keep them in a bowl on the table. Each night, read one card together and color one flame on the chart.",
      });
      k.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };
      cardPages(k, seasonCards(days, "Advent"), { heading: "Daily cards" });
      candleChart(k, days, { title: "The Advent Candle Chart", intro: "One candle for each day of the readings. After the card is read, color its flame.", cols: 5 });
    },
  };
}

export function holyWeekPack(days) {
  return {
    title: "Holy Week at Home: Daily Cards and Checklist",
    subject: `${days.length} daily readings for the family from ${days[0].label} to ${days[days.length - 1].label}, with a chart to color in.`,
    keywords: ["Holy Week", "Easter", "family", "children", "devotions"],
    runningHead: "Holy Week at Home",
    chrome: false,
    render(k) {
      k.cover({
        kicker: "For the household · Holy Week",
        title: "Holy Week at Home",
        subtitle: `${days.length} days, one short reading a day, from ${days[0].label} to ${days[days.length - 1].label}.`,
        note: "Cut the cards apart. Each day, read one card together and color one flame on the chart.",
      });
      k.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };
      cardPages(k, seasonCards(days, "Holy Week"), { heading: "Daily cards" });
      candleChart(k, days, { title: "The Holy Week Chart", intro: "One candle for each day of the week. After the card is read, color its flame.", cols: 4 });
    },
  };
}

