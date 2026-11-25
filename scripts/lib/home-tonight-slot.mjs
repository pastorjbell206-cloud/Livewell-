/**
 * Home's tonight line, held in the static shell (the walk's polish,
 * 2026-11-23; finding 22 of docs/work/elite/walk-2026-11.md).
 *
 * Home's line under Find (client/src/pages/home/HomeTonight.tsx) arrives
 * with the app, into a slot the static hero holds open
 * (scripts/prerender-heads.mjs). An ordinary week's line is one line on a
 * wide screen and two on a phone, and the slot's CSS holds that much. The
 * daily sets say more (Thanksgiving week's and Holy Week's readings, the
 * Advent calendar's days), and in the week before Advent Sunday a second
 * line follows; on a phone in Advent week the chips under Find moved down
 * about 85 px when the line arrived (layout shift 0.019).
 *
 * So the static page works out, from the reader's own clock, what Home will
 * say on those nights and writes it into the slot unseen (.home-tonight--slot
 * hides its children): the same words in the same elements and classes take
 * the same room at any width and in any font, and when the line arrives
 * nothing moves. On an ordinary week's night the slot is left as it was; on
 * a night Home says nothing, it takes no room. Home.tsx reads the same lines
 * (the slot's data-lines) for its own slot while the line's module loads.
 *
 * The words come from the year map (client/src/lib/familyYear.generated.ts).
 * `slotLines` mirrors homeTonight in HomeTonight.tsx for every night that is
 * not an ordinary week's, and a test holds the two together on every night
 * of the map (client/src/pages/home/tonight-slot.test.tsx). `slotLines` and
 * `fillSlot` run in the browser as written, so they use only their arguments.
 */
import fs from "node:fs";
import path from "node:path";

export const YEAR_MAP = "client/src/lib/familyYear.generated.ts";

const DAY_MS = 86400000;
const dayNum = (iso) => Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10))) / DAY_MS;
const isoOf = (n) => new Date(n * DAY_MS).toISOString().slice(0, 10);

/**
 * What the static page needs from the year map: its first and last day,
 * each Advent Sunday, the daily sets' windows and titles, and the nights a
 * set's week does not cover (Thanksgiving's Friday and Saturday after, which
 * take its last day; the Advent weeks' nights before December 1, which have
 * no reading: client/src/lib/familyTable.ts tonightOn). The nights after
 * Christmas in Advent's last week take the next week's devotion, begun early
 * (familyTable.ts afterChristmas), so here they are an ordinary week's night.
 */
export function slotData(root) {
  const src = fs.readFileSync(path.join(root, YEAR_MAP), "utf8");
  const one = (name) => {
    const m = src.match(new RegExp(`export const ${name} = "(\\d{4}-\\d{2}-\\d{2})"`));
    if (!m) throw new Error(`${YEAR_MAP}: no ${name}`);
    return m[1];
  };
  const from = one("FAMILY_YEAR_FROM");
  const through = one("FAMILY_YEAR_THROUGH");
  const advent = [...src.matchAll(/\{"key":"advent","start":"([\d-]+)","end":"([\d-]+)"\}/g)].map((m) => m[1]);
  const sets = [...src.matchAll(/\{"set":"(\w+)","start":"([\d-]+)","end":"([\d-]+)"\}/g)].map((m) => [m[1], m[2], m[3]]);
  const weeks = [...src.matchAll(/\{"start":"([\d-]+)","season":"[\w-]+","devotion":null,"set":"(\w+)"\}/g)].map((m) => [m[1], m[2]]);
  const block = src.slice(src.indexOf("export const FAMILY_SET_TITLES"));
  const titles = {};
  for (const m of block.slice(0, block.indexOf("};")).matchAll(/^\s+(\w+): (\[.*\]),$/gm)) titles[m[1]] = JSON.parse(m[2]);
  if (!advent.length || !sets.length || !titles.advent) throw new Error(`${YEAR_MAP}: could not read the Advent seasons, the sets or their titles`);

  // The nights a set's week does not cover, as ranges [first, last, set, day]; day 0 is no reading.
  const fills = [];
  for (const [start, set] of weeks) {
    for (let n = dayNum(start); n < dayNum(start) + 7; n++) {
      const iso = isoOf(n);
      if (iso < from || iso > through || sets.some(([, a, b]) => a <= iso && iso <= b)) continue;
      if (set === "advent" && sets.some(([s, , b]) => s === "advent" && b < iso && n - dayNum(b) < 7)) continue;
      let day = 0;
      if (set !== "advent") {
        let gap = Infinity;
        for (const [s, a, b] of sets) {
          if (s !== set) continue;
          const g = n < dayNum(a) ? dayNum(a) - n : n > dayNum(b) ? n - dayNum(b) : 0;
          if (g < gap) {
            gap = g;
            day = n < dayNum(a) ? 1 : n > dayNum(b) ? dayNum(b) - dayNum(a) + 1 : n - dayNum(a) + 1;
          }
        }
      }
      const last = fills[fills.length - 1];
      if (last && last[2] === set && last[3] === day && dayNum(last[1]) === n - 1) last[1] = iso;
      else fills.push([iso, iso, set, day]);
    }
  }
  return { from, through, advent, sets, fills, titles };
}

/**
 * What Home says on a night, as homeTonight in HomeTonight.tsx says it:
 * null when it says nothing; otherwise `row`, tonight's line ({ lead, title,
 * after }, false for none, null for an ordinary week's devotion, whose title
 * the static page does not carry), and `quiet`, the Advent line beneath it
 * ({ lead, link }) or null.
 */
export function slotLines(d, today) {
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var SET_NAME = { advent: "Advent", holyWeek: "Holy Week", thanksgiving: "Thanksgiving week" };
  function num(iso) {
    return Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 86400000;
  }
  function said(iso, weekday) {
    var t = new Date(num(iso) * 86400000);
    return (weekday ? DAYS[t.getUTCDay()] + ", " : "") + MONTHS[t.getUTCMonth()] + " " + t.getUTCDate();
  }
  function line(set, day, lead) {
    var title = (d.titles[set] || [])[day - 1];
    if (!title) return null;
    var after = set === "advent" ? ", December " + day + " in the family Advent calendar" : ", a reading for " + SET_NAME[set];
    return { lead: lead || "Tonight at the table:", title: title, after: after };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today) || today < d.from || today > d.through) return null;
  var i, w;
  // Tonight: a day of a set, a night its week does not cover, or an ordinary week's devotion.
  var tonight = "weekly";
  for (i = 0; i < d.sets.length; i++) {
    w = d.sets[i];
    if (w[1] <= today && today <= w[2]) tonight = { set: w[0], day: num(today) - num(w[1]) + 1 };
  }
  for (i = 0; tonight === "weekly" && i < d.fills.length; i++) {
    w = d.fills[i];
    if (w[0] <= today && today <= w[1]) tonight = w[3] ? { set: w[2], day: w[3] } : null;
  }
  // The Advent calendar not yet ended on this night, shown from the Sunday a week before Advent Sunday.
  var calendar = null;
  for (i = 0; !calendar && i < d.sets.length; i++) if (d.sets[i][0] === "advent" && d.sets[i][2] >= today) calendar = d.sets[i];
  var sunday = null;
  for (i = 0; calendar && i < d.advent.length; i++) if (d.advent[i].slice(0, 4) === calendar[2].slice(0, 4)) sunday = d.advent[i];
  if (!calendar || !sunday || num(today) < num(sunday) - 7) {
    if (tonight === null) return null;
    return { row: tonight === "weekly" ? null : line(tonight.set, tonight.day), quiet: null };
  }
  var before = today < sunday;
  var begins = "Advent begins " + said(sunday, true) + ".";
  if (calendar[1] <= today) {
    var day = num(today) - num(calendar[1]) + 1;
    var christmas = today === calendar[2];
    return { row: line("advent", day, (before ? begins + " " : "") + (christmas ? "Christmas Day" : "Tonight") + " at the table:"), quiet: null };
  }
  if (!before) {
    return { row: { lead: "Advent has begun. The family Advent calendar starts " + said(calendar[1], true) + ", with", title: d.titles.advent[0], after: "" }, quiet: null };
  }
  return {
    row: tonight === null ? false : tonight === "weekly" ? null : line(tonight.set, tonight.day),
    quiet: { lead: begins + " The family Advent calendar runs from " + said(calendar[1], false) + " to Christmas:", link: "see the readings" },
  };
}

/**
 * Write a night's lines into the slot, unseen, in the elements and classes
 * HomeTonight.tsx draws them with (a span for each link: it is never
 * followed). Nothing to say: the slot takes no room.
 */
export function fillSlot(slot, lines) {
  slot.setAttribute("data-lines", JSON.stringify(lines));
  if (!lines) {
    slot.hidden = true;
    return;
  }
  function p(cls, lead, link, after) {
    var el = document.createElement("p");
    el.className = cls;
    var a = document.createElement("span");
    a.className = "home-tonight__link";
    a.textContent = link;
    el.appendChild(document.createTextNode(lead + " "));
    el.appendChild(a);
    el.appendChild(document.createTextNode(after + (/[.?!]$/.test(after || link) ? "" : ".")));
    return el;
  }
  if (lines.row !== false) {
    var row = document.createElement("div");
    row.className = lines.row ? "home-tonight__row" : "home-tonight__row home-tonight__row--held";
    if (lines.row) row.appendChild(p("home-tonight__line", lines.row.lead, lines.row.title, lines.row.after));
    if (lines.row || lines.quiet) slot.appendChild(row);
  }
  if (lines.quiet) slot.appendChild(p("home-tonight__line home-tonight__line--quiet", lines.quiet.lead, lines.quiet.link, ""));
}

/** A function's own source with its comment lines and indentation taken out (the lines are kept, so nothing else changes). */
const tidy = (fn) =>
  String(fn)
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//"))
    .join("\n");

/**
 * The inline script for the head of the "/" HTML (withSlotScript): the
 * reader's own date (as lib/familyYear.ts localISODate reads it), then the
 * lines, then the slot as soon as the parser inserts it. It sits early in the
 * head, not after the slot, because a script that follows a stylesheet makes
 * the parser wait there for the stylesheet, and when it arrives the browser
 * may paint what has been parsed so far: with the script inside the hero, a
 * phone could paint the words before Plate I (which comes after them in the
 * HTML and sits above them on the screen), and the plate's arrival pushed
 * every word down (a layout shift of 0.252 in one Lighthouse run). A mutation
 * observer's callback runs before the next paint, so the slot holds its words
 * in the first frame that shows it. It never throws; on any error the slot
 * stays as the CSS draws it.
 */
export function slotScript(data) {
  // Inside the JSON's strings, "<" is "<", so no title can close the script element.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  const out =
    "(function(){try{" +
    "var n=new Date(),q=function(x){return(x<10?\"0\":\"\")+x};" +
    `var lines=(${tidy(slotLines)})(${json},n.getFullYear()+"-"+q(n.getMonth()+1)+"-"+q(n.getDate()));\n` +
    `var fill=${tidy(fillSlot)};\n` +
    "var find=function(){var s=document.querySelector(\"#lw-shell .home-tonight--slot\");if(!s)return false;fill(s,lines);return true};" +
    "if(find())return;" +
    "var mo=new MutationObserver(function(){if(find())mo.disconnect()});" +
    "mo.observe(document.documentElement,{childList:true,subtree:true});" +
    "document.addEventListener(\"DOMContentLoaded\",function(){mo.disconnect()})" +
    "}catch(e){}})();";
  if (/<\/script|<!--/i.test(out)) throw new Error("home-tonight-slot: the inline script would close its own element");
  return out;
}

/**
 * The "/" HTML with the slot's script early in its head: before the
 * stylesheet and the app's own script. A script after a stylesheet waits for
 * it to arrive, and the parser waiting there can paint whatever it has parsed
 * so far; ahead of them it waits on nothing.
 */
export function withSlotScript(html, script) {
  const tag = `<script>${script}</script>`;
  const head = html.indexOf("</head>");
  const at = html.search(/<link rel="stylesheet"|<script type="module"/);
  if (at > -1 && at < head) return `${html.slice(0, at)}${tag}\n    ${html.slice(at)}`;
  return head > -1 ? `${html.slice(0, head)}    ${tag}\n  ${html.slice(head)}` : html;
}
