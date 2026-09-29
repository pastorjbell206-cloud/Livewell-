/**
 * Two 11x17 posters: the church-history timeline
 * (client/public/theology/church-history-timeline.json) and the story of the
 * Bible in eleven acts (client/public/theology/biblical-theology-storyline.json
 * for each act's title, range and turning point; client/public/bible/story.json
 * for its dates and people).
 */
import { C, firstSentence, fitLevel, smart } from "../index.mjs";

function posterHeader(k, { eyebrow, title, dek }) {
  const d = k.doc;
  k.hideChrome();
  k.bookmark(title, 0);
  k.eyebrow(eyebrow, { after: 6, size: 8 });
  k.tag("H1", () => d.font("display").fontSize(44).fillColor(C.ink).text(title, k.left, d.y, { width: k.width, characterSpacing: -0.88 }));
  d.y += 4;
  if (dek) k.p(dek, { family: "display", italic: true, size: 15, color: C.muted, leading: 1.3, after: 10, width: k.width * 0.7 });
}

function posterFoot(k, text, href) {
  const d = k.doc;
  const H = d.page.height;
  const saved = d.page.margins.bottom;
  d.page.margins.bottom = 0;
  d.y = H - 34;
  k.tag("Link", () => d.font("sans").fontSize(7.5).fillColor(C.mustardText).text(text, k.left, H - 34, { width: k.width, align: "right", link: `https://www.livewellbyjamesbell.co${href}` }));
  d.page.margins.bottom = saved;
}

const TIMELINE_MARGINS = { top: 40, bottom: 44, left: 44, right: 44 };

/**
 * The eras flow down newspaper columns: each era's name, range and opening
 * sentence, then its events (year and title) one to a line. The type steps
 * down until the whole timeline fits the sheet, so it keeps working as the
 * timeline grows.
 */
function drawTimeline(k, t, scale) {
  const d = k.doc;
  posterHeader(k, {
    eyebrow: "LiveWell by James Bell · Church history",
    title: "The Story of the Church",
    dek: `${t.eras.length} eras and ${t.eras.reduce((n, e) => n + e.events.length, 0)} turning points, from ${t.eras[0].range.replace(/ to .*/, "")} to today.`,
  });
  const COLS = 7;
  const gutter = 16;
  const colW = (k.width - gutter * (COLS - 1)) / COLS;
  const top = d.y + 14;
  const bottom = k.bottom - 10;
  const yearW = 40 * scale;
  const ev = 7.2 * scale;
  let col = 0;
  let y = top;
  const x = () => k.left + col * (colW + gutter);
  const nextCol = () => {
    col++;
    y = top;
    // Past the last column: spill to a new page so fitLevel sees the overflow.
    if (col >= COLS) {
      k.newPage();
      col = 0;
    }
  };
  k.artifact(() => d.save().lineWidth(1.2).strokeColor(C.mustard).moveTo(k.left, top - 7).lineTo(k.right, top - 7).stroke().restore());
  for (const era of t.eras) {
    const lead = firstSentence(era.summary);
    d.font("display").fontSize(16 * scale);
    let hh = d.heightOfString(era.name, { width: colW }) + 14 * scale;
    d.font("sans").fontSize(6.8 * scale);
    hh += d.heightOfString(lead, { width: colW, lineGap: 1.2 }) + 8;
    if (y + hh + 3 * ev * 1.4 > bottom && y > top) nextCol();
    k.group("Sect", () => {
      d.y = y + (y > top ? 8 : 0);
      k.tag("H2", () => d.font("display").fontSize(16 * scale).fillColor(C.ink).text(smart(era.name), x(), d.y, { width: colW }));
      k.tag("P", () => d.font("mono").fontSize(6.4 * scale).fillColor(C.mustardText).text(era.range.toUpperCase(), x(), d.y + 1, { width: colW, characterSpacing: 0.4 }));
      k.tag("P", () => d.font("sans").fontSize(6.8 * scale).fillColor(C.muted).text(smart(lead), x(), d.y + 3, { width: colW, lineGap: 1.2 }));
      y = d.y + 6;
      k.group("L", () => {
        for (const e of era.events) {
          const year = String(e.year).replace(/^around /, "c. ");
          d.font("sans").fontSize(ev);
          const th = d.heightOfString(e.title, { width: colW - yearW, lineGap: 0.8 });
          d.font("mono").fontSize(6 * scale);
          const yh = d.heightOfString(year, { width: yearW - 4, lineGap: 0 });
          const h = Math.max(th, yh) + 2.4 * scale;
          if (y + h > bottom) nextCol();
          const cx = x();
          k.group("LI", () => {
            k.tag("Lbl", () => d.font("mono").fontSize(6 * scale).fillColor(C.mustardText)
              .text(year, cx, y + 0.8 * scale, { width: yearW - 4, lineGap: 0 }));
            k.tag("LBody", () => d.font("sans").fontSize(ev).fillColor(C.ink).text(smart(e.title), cx + yearW, y, { width: colW - yearW, lineGap: 0.8 }));
          });
          y += h;
        }
      });
    });
  }
  posterFoot(k, "livewellbyjamesbell.co/theology/history", "/theology/history");
}

export function timelinePoster(t) {
  const options = { title: "timeline", size: "tabloid", layout: "landscape", chrome: false, margins: TIMELINE_MARGINS };
  const scales = [1.2, 1.1, 1, 0.94, 0.88, 0.82, 0.76, 0.7];
  return {
    title: "The Story of the Church: A Timeline Poster",
    subject: "Church history in seven eras, on one 11 by 17 inch poster.",
    keywords: ["church history", "timeline", "poster"],
    size: "tabloid",
    layout: "landscape",
    chrome: false,
    margins: TIMELINE_MARGINS,
    render(k) {
      const lv = fitLevel(options, (trial, l) => drawTimeline(trial, t, scales[l]), scales.length - 1);
      drawTimeline(k, t, scales[lv]);
    },
  };
}

export function storyPoster(storyline, story) {
  const extra = new Map(story.acts.map((a) => [a.id, a]));
  return {
    title: "The Story of the Bible in Eleven Acts: A Poster",
    subject: "The one story of the Bible in eleven acts, with each act's range, dates, turning point and people, on one 11 by 17 inch poster.",
    keywords: ["Bible", "biblical theology", "story of the Bible", "poster"],
    size: "tabloid",
    chrome: false,
    margins: { top: 46, bottom: 48, left: 54, right: 54 },
    render(k) {
      const d = k.doc;
      posterHeader(k, {
        eyebrow: "LiveWell by James Bell · The Study Bible",
        title: "The Story of the Bible",
        dek: `One story in ${storyline.acts.length} acts, from Genesis to Revelation.`,
      });
      const top = d.y + 10;
      const bottom = k.bottom - 6;
      const rowH = (bottom - top) / storyline.acts.length;
      const railX = k.left + 118;
      const bodyX = railX + 22;
      const bodyW = k.right - bodyX;
      k.artifact(() => d.save().lineWidth(1.2).strokeColor(C.mustard).moveTo(railX, top + 6).lineTo(railX, bottom - rowH + 14).stroke().restore());
      k.group("L", () => {
        storyline.acts.forEach((a, i) => {
          const y = top + i * rowH;
          const s = extra.get(a.id) || {};
          k.artifact(() => d.save().circle(railX, y + 10, 3.2).fill(C.mustard).restore());
          k.group("LI", () => {
            k.tag("Lbl", () => {
              d.font("sansMedium").fontSize(7.5).fillColor(C.mustardText).text(a.act.toUpperCase(), k.left, y + 5, { width: 104, characterSpacing: 1.2 });
              d.font("mono").fontSize(6.8).fillColor(C.muted).text(a.range, k.left, d.y + 3, { width: 104, lineGap: 1 });
            });
            k.tag("LBody", () => {
              d.font("display").fontSize(21).fillColor(C.ink).text(smart(a.title), bodyX, y, { width: bodyW });
              if (s.dates) d.font("sansItalic").fontSize(7.4).fillColor(C.muted).text(smart(s.dates), bodyX, d.y + 1, { width: bodyW });
              d.font("serif").fontSize(9.4).fillColor(C.ink).text(smart(a.turning), bodyX, d.y + 4, { width: bodyW, lineGap: 2 });
              if (s.people?.length) {
                d.font("sans").fontSize(7.2).fillColor(C.muted).text(`People: ${s.people.join(", ")}`, bodyX, d.y + 3, { width: bodyW, lineGap: 1 });
              }
            });
          });
        });
      });
      posterFoot(k, "livewellbyjamesbell.co/study/bible/story", "/study/bible/story");
    },
  };
}
