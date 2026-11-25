/**
 * Home's tonight line, held in the static shell (the walk's polish,
 * 2026-11-23; finding 22): a script in the head of "/" works out from
 * the reader's clock what Home will say on a night of a daily set or around
 * Advent and writes it into the slot unseen, so the slot takes the line's own
 * room and the chips under Find do not move when the line arrives. Here: the
 * script's lines are Home's (homeTonight) on every night of the year map; it
 * writes them in the elements and classes HomeTonight draws; Home's own slot
 * (TonightSlot) draws the same from what the shell left; and the script in
 * the "/" HTML runs as written.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { FAMILY_YEAR_FROM, FAMILY_YEAR_THROUGH } from "@/lib/familyYear.generated";
import { tonightOn } from "@/lib/familyTable";
import { adventTonight } from "@/lib/familyAdvent";
import HomeTonight, { homeTonight } from "./HomeTonight";
import TonightSlot, { readShellLines, type ShellLines } from "./TonightSlot";
import { fillSlot, slotData, slotLines, slotScript, withSlotScript } from "../../../../scripts/lib/home-tonight-slot.mjs";

const ROOT = path.resolve(__dirname, "../../../..");
const DATA = slotData(ROOT);

/** What Home says, in the slot's terms: an ordinary week's line is null (its title is not in the shell). */
function homeSays(date: string): ShellLines | null {
  const { tonight, advent } = homeTonight(date);
  if (!tonight && !advent) return null;
  const t = tonightOn(date);
  const a = adventTonight(date);
  const advents = !!a && (!!a.day || !a.beforeAdvent);
  const weekly = !!tonight && !!t && !t.set && !advents;
  return {
    row: tonight ? (weekly ? null : { lead: tonight.lead, title: tonight.title, after: tonight.after }) : false,
    quiet: advent ? { lead: advent.lead, link: advent.link } : null,
  };
}

/** Seven in the evening of a calendar day, in the reader's own time zone. */
function at(iso: string) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)), 19));
}

/** Elements, with their classes (a link drawn as a span), and the words: what decides the room a line takes. */
function shapeOf(el: Element): string {
  const tag = el.tagName.toLowerCase() === "a" ? "span" : el.tagName.toLowerCase();
  const cls = Array.from(el.classList).filter((c) => c !== "home-tonight--slot").sort().join(".");
  return `${tag}.${cls}[${Array.from(el.children).map(shapeOf).join(",")}]`;
}
const wordsOf = (el: Element) => (el.textContent ?? "").replace(/\s+/g, " ").trim();

function shellSlot(date: string): HTMLDivElement {
  const slot = document.createElement("div");
  slot.className = "home-tonight home-tonight--slot";
  fillSlot(slot, slotLines(DATA, date));
  return slot;
}

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

/** Nights that say more than an ordinary week's line, and one that says nothing. */
const NIGHTS = ["2026-11-20", "2026-11-23", "2026-11-27", "2026-11-28", "2026-11-29", "2026-11-30", "2026-12-01", "2026-12-06", "2026-12-25", "2026-12-26", "2027-03-25", "2027-11-28", "2028-11-26", "2028-12-01", "2028-12-03", "2031-12-26"];

describe("the static shell's tonight slot", () => {
  it("knows what Home says on every night of the year map, and off it", () => {
    const wrong: string[] = [];
    const day = new Date(`${FAMILY_YEAR_FROM}T12:00:00Z`);
    day.setUTCDate(day.getUTCDate() - 3);
    const last = new Date(`${FAMILY_YEAR_THROUGH}T12:00:00Z`);
    last.setUTCDate(last.getUTCDate() + 3);
    let nights = 0;
    while (day <= last) {
      const iso = day.toISOString().slice(0, 10);
      const said = JSON.stringify(slotLines(DATA, iso));
      const home = JSON.stringify(homeSays(iso));
      if (said !== home) wrong.push(`${iso}: shell ${said}, Home ${home}`);
      nights += 1;
      day.setUTCDate(day.getUTCDate() + 1);
    }
    expect(nights).toBeGreaterThan(365 * 5);
    expect(wrong.slice(0, 5)).toEqual([]);
  });

  it("carries the words of Advent week, the first nights of Advent and the calendar", () => {
    expect(slotLines(DATA, "2026-11-23")).toEqual({
      row: { lead: "Tonight at the table:", title: "The Year the Fig Tree Did Not Bud", after: ", a reading for Thanksgiving week" },
      quiet: { lead: "Advent begins Sunday, November 29. The family Advent calendar runs from December 1 to Christmas:", link: "see the readings" },
    });
    expect(slotLines(DATA, "2026-11-29")).toEqual({
      row: { lead: "Advent has begun. The family Advent calendar starts Tuesday, December 1, with", title: "The Long Wait Begins", after: "" },
      quiet: null,
    });
    expect(slotLines(DATA, "2026-12-06")?.row).toEqual({ lead: "Tonight at the table:", title: "A Child Is Given", after: ", December 6 in the family Advent calendar" });
    // An ordinary week's night: the CSS holds one line, as before.
    expect(slotLines(DATA, "2026-10-27")).toEqual({ row: null, quiet: null });
    // The nights after Christmas in Advent's last week take next week's devotion, begun early: an ordinary week's line.
    expect(slotLines(DATA, "2026-12-26")).toEqual({ row: null, quiet: null });
    expect(slotLines(DATA, "2028-12-30")).toEqual({ row: null, quiet: null });
    // Nothing to say: the slot takes no room.
    expect(slotLines(DATA, "2040-01-01")).toBeNull();
  });

  it("writes them unseen in the elements and classes HomeTonight draws, so they take the same room", () => {
    for (const iso of NIGHTS) {
      at(iso);
      const view = renderWithProviders(<HomeTonight />);
      const real = view.container.querySelector(".home-tonight");
      const slot = shellSlot(iso);
      if (!real) {
        expect(slot.hidden, iso).toBe(true);
      } else if (slotLines(DATA, iso)?.row === null) {
        // An ordinary week's line: its room is held by the CSS, and any Advent line under it is written.
        const quiet = real.querySelector(".home-tonight__line--quiet");
        expect(!!slot.querySelector(".home-tonight__line--quiet"), iso).toBe(!!quiet);
        if (quiet) {
          expect(slot.querySelector(".home-tonight__row--held"), iso).not.toBeNull();
          expect(shapeOf(slot.querySelector(".home-tonight__line--quiet")!), iso).toBe(shapeOf(quiet));
          expect(wordsOf(slot.querySelector(".home-tonight__line--quiet")!), iso).toBe(wordsOf(quiet));
        }
      } else {
        expect(slot.hidden, iso).toBe(false);
        expect(shapeOf(slot), iso).toBe(shapeOf(real));
        expect(wordsOf(slot), iso).toBe(wordsOf(real));
      }
      view.unmount();
      vi.useRealTimers();
    }
  });

  it("is drawn the same by Home's own slot from what the shell left, while the line's module loads", () => {
    for (const iso of [...NIGHTS, "2026-10-27"]) {
      const slot = shellSlot(iso);
      document.body.innerHTML = '<div id="lw-shell"></div>';
      document.getElementById("lw-shell")!.appendChild(slot);
      const lines = readShellLines(document);
      expect(lines, iso).toEqual(slotLines(DATA, iso));
      const view = render(<TonightSlot lines={lines} />);
      const drawn = view.container.querySelector(".home-tonight");
      if (slot.hidden) {
        expect(drawn, iso).toBeNull();
      } else {
        expect(shapeOf(drawn!), iso).toBe(shapeOf(slot));
        expect(wordsOf(drawn!), iso).toBe(wordsOf(slot));
        expect(drawn!.getAttribute("aria-hidden"), iso).toBe("true");
      }
      view.unmount();
    }
    // No shell (a later visit to "/"): the plain slot.
    document.body.innerHTML = "";
    expect(readShellLines(document)).toBeUndefined();
    const plain = render(<TonightSlot lines={undefined} />);
    expect(plain.container.innerHTML).toBe('<div class="home-tonight home-tonight--slot" aria-hidden="true"></div>');
  });

  it("runs as written from the head of /, filling the slot as the parser inserts it", async () => {
    const script = slotScript(DATA);
    expect(script).not.toContain("</script");
    // The prerendered "/" carries it early in its head, and nothing inside the hero: the parser waits at a
    // script for the stylesheet and may paint what it has, and on a phone that once painted the words before
    // Plate I, which then pushed them down (a layout shift of 0.252).
    const prerender = fs.readFileSync(path.join(ROOT, "scripts/prerender-heads.mjs"), "utf8");
    expect(prerender).toContain("if (isHome) html = withSlotScript(html, homeSlotScript());");
    const hero = prerender.slice(prerender.indexOf("function homeHeroHtml"), prerender.indexOf("function homeSlotScript"));
    expect(hero).toContain('<div class="home-tonight home-tonight--slot" aria-hidden="true"></div>${roads}');
    expect(hero).not.toContain("<script");
    const page =
      '<html><head><meta charset="UTF-8" /><script>heal()</script><script type="module" crossorigin src="/assets/index-a.js"></script><link rel="stylesheet" crossorigin href="/assets/index-a.css"><title>t</title></head><body></body></html>';
    const built = withSlotScript(page, "fill()");
    expect(built.indexOf("<script>fill()</script>")).toBeGreaterThan(built.indexOf("<script>heal()</script>"));
    expect(built.indexOf("<script>fill()</script>")).toBeLessThan(built.indexOf('<script type="module"'));
    expect(built.indexOf("<script>fill()</script>")).toBeLessThan(built.indexOf('<link rel="stylesheet"'));

    at("2026-11-23");
    // The head's script runs before the body is parsed...
    document.body.innerHTML = '<div id="lw-shell"></div>';
    new Function(script)();
    // ...and the parser then inserts the hero with its slot.
    document.getElementById("lw-shell")!.innerHTML = '<section class="home-hero"><div class="home-tonight home-tonight--slot" aria-hidden="true"></div></section>';
    await Promise.resolve();
    const slot = document.querySelector(".home-tonight--slot")!;
    expect(Array.from(slot.querySelectorAll("p")).map(wordsOf)).toEqual([
      "Tonight at the table: The Year the Fig Tree Did Not Bud, a reading for Thanksgiving week.",
      "Advent begins Sunday, November 29. The family Advent calendar runs from December 1 to Christmas: see the readings.",
    ]);
    expect(readShellLines(document)).toEqual(slotLines(DATA, "2026-11-23"));

    // A slot already there when it runs (a shell served for another address) is filled at once, and only once.
    document.body.innerHTML = '<div id="lw-shell"><div class="home-tonight home-tonight--slot" aria-hidden="true"></div></div>';
    new Function(script)();
    await Promise.resolve();
    expect(document.querySelectorAll(".home-tonight--slot p")).toHaveLength(2);
  });

  it("keeps what it writes out of sight", () => {
    const css = fs.readFileSync(path.join(ROOT, "client/src/index.css"), "utf8");
    expect(css).toContain(".home-tonight--slot>*{visibility:hidden}");
  });
});
