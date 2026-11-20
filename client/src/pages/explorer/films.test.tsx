/**
 * Watch and learn: the Bible Explorer's moving pictures.
 *
 * The player's contract (FilmPlayer.tsx): it never plays by itself; Play
 * advances the frames on a timer and stops at the last; Pause holds; Back,
 * Next, the frame buttons and the arrow keys move by hand; Replay returns to
 * the first frame; the caption follows the reading level; a step by hand is
 * announced and a step by Play is not; with reduced motion there is no Play
 * and no timer at all. Then the data (every finished film loads, every frame
 * has both captions and the words for its finished picture; films not made
 * yet have no file and no link) and the pages (the map's section, a stop's
 * link, a film's own page).
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { isFilm, type ExplorerIndex, type Film } from "@/lib/explorer";
import FilmPlayer, { frameMs } from "./films/FilmPlayer";
import { FILM_SCENES } from "./films/scenes";
import ExplorerMap from "./ExplorerMap";
import ExplorerStop from "./ExplorerStop";
import ExplorerFilm, { FILM_META } from "./ExplorerFilm";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const PUBLIC = path.resolve(__dirname, "../../../public");
const INDEX: ExplorerIndex = JSON.parse(
  fs.readFileSync(path.join(PUBLIC, "explorer/index.json"), "utf8")
);
const filmFile = (slug: string): Film =>
  JSON.parse(
    fs.readFileSync(path.join(PUBLIC, `explorer/films/${slug}.json`), "utf8")
  );
const READY = (INDEX.films ?? []).filter(f => f.status === "finished");
const COMING = (INDEX.films ?? []).filter(f => f.status !== "finished");
const FILM = filmFile("who-made-god");

function serve() {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (
        name.startsWith("explorer/") &&
        fs.existsSync(path.join(PUBLIC, name))
      )
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      return base(input, init);
    })
  );
}

/** Reduced motion asked for (or not), through matchMedia. */
function motion(reduce: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((q: string) => ({
      matches: reduce && q.includes("reduce"),
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    }))
  );
}

function player(level: "younger" | "older" = "younger") {
  return (
    <FilmPlayer
      scene={FILM.slug}
      title={FILM.title}
      poster={FILM.poster}
      intro={FILM.line}
      frames={FILM.frames}
      level={level}
      end={FILM.end}
    />
  );
}

/** The frame on screen: the number of the frame button marked current, or 0 for the poster. */
const current = () => {
  const on = screen
    .getAllByRole("button", { name: /^Picture \d+:/ })
    .find(b => b.getAttribute("aria-current") === "step");
  return on ? Number(on.textContent) : 0;
};
const live = () => screen.getByTestId("fp-live").textContent ?? "";
const visibleCaption = () =>
  document.querySelector(
    ".fp-cap.is-on .fp-cap__text, .fp-cap.is-on .fp-cap__lede"
  )?.textContent ?? "";
const advance = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms);
  });

beforeEach(() => {
  window.localStorage.clear();
  motion(false);
  serve();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("the player's contract", () => {
  it("never plays by itself: it opens on the poster with the film's line, and waits", () => {
    vi.useFakeTimers();
    render(player());
    expect(current()).toBe(0);
    expect(visibleCaption()).toBe(FILM.line.younger);
    // Before Play, the caption panel lists the film's pictures in order.
    expect(
      Array.from(
        document.querySelectorAll(".fp-cap.is-on .fp-cap__list li"),
        li => li.textContent
      )
    ).toEqual(FILM.frames.map(f => f.name));
    expect(screen.getByRole("button", { name: "Play" })).toBeTruthy();
    expect(screen.getByText(FILM.title)).toBeTruthy();
    advance(60_000);
    expect(current()).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("Play advances the frames, without announcing each one, and stops at the last", () => {
    vi.useFakeTimers();
    render(player());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(current()).toBe(1);
    expect(visibleCaption()).toBe(FILM.frames[0].younger);
    advance(frameMs(FILM.frames[0].younger));
    expect(current()).toBe(2);
    expect(live()).toBe("");
    for (let k = 1; k < FILM.frames.length; k++)
      advance(frameMs(FILM.frames[k].younger));
    expect(current()).toBe(FILM.frames.length);
    expect(screen.getByRole("button", { name: "Play again" })).toBeTruthy();
    advance(60_000);
    expect(current()).toBe(FILM.frames.length);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("Pause holds the frame", () => {
    vi.useFakeTimers();
    render(player());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    advance(frameMs(FILM.frames[0].younger));
    expect(current()).toBe(2);
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    advance(60_000);
    expect(current()).toBe(2);
    expect(screen.getByRole("button", { name: "Play on" })).toBeTruthy();
  });

  it("Back, Next and the frame buttons move by hand, and each step is announced", () => {
    render(player());
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(current()).toBe(1);
    expect(live()).toContain(`Picture 1 of ${FILM.frames.length}`);
    expect(live()).toContain(FILM.frames[0].younger);
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(current()).toBe(2);
    fireEvent.click(screen.getByRole("button", { name: /^Back/ }));
    expect(current()).toBe(1);
    fireEvent.click(
      screen.getByRole("button", { name: `Picture 4: ${FILM.frames[3].name}` })
    );
    expect(current()).toBe(4);
    expect(visibleCaption()).toBe(FILM.frames[3].younger);
    expect(live()).toContain(FILM.frames[3].younger);
  });

  it("a step by hand pauses a playing film", () => {
    vi.useFakeTimers();
    render(player());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(current()).toBe(2);
    advance(60_000);
    expect(current()).toBe(2);
  });

  it("Replay returns to the first frame", () => {
    vi.useFakeTimers();
    render(player());
    fireEvent.click(
      screen.getByRole("button", { name: "Picture 5: " + FILM.frames[4].name })
    );
    expect(current()).toBe(5);
    fireEvent.click(
      screen.getByRole("button", { name: "Replay from the first picture" })
    );
    expect(current()).toBe(1);
  });

  it("the caption follows the reading level", () => {
    const { rerender } = render(player("younger"));
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(visibleCaption()).toBe(FILM.frames[0].younger);
    rerender(player("older"));
    expect(visibleCaption()).toBe(FILM.frames[0].older);
  });

  it("the arrow keys move the frames while the player has focus", () => {
    render(player());
    const screenBox = document.querySelector(".fp-screen") as HTMLElement;
    screenBox.focus();
    fireEvent.keyDown(screenBox, { key: "ArrowRight" });
    fireEvent.keyDown(screenBox, { key: "ArrowRight" });
    expect(current()).toBe(2);
    expect(live()).toContain(FILM.frames[1].younger);
    fireEvent.keyDown(screenBox, { key: "ArrowLeft" });
    expect(current()).toBe(1);
  });

  it("with reduced motion: no Play, no timer, every frame finished and stepped with Next", () => {
    motion(true);
    vi.useFakeTimers();
    render(player());
    expect(screen.queryByRole("button", { name: /^Play/ })).toBeNull();
    expect(document.querySelector(".fp-screen.is-still")).toBeTruthy();
    expect(screen.getByText(/Motion is off on this device/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /^Start/ }));
    expect(current()).toBe(1);
    expect(live()).toContain(FILM.frames[0].younger);
    for (let k = 1; k < FILM.frames.length; k++)
      fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(current()).toBe(FILM.frames.length);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("each film's drawing is its own lazy chunk and draws every frame", async () => {
    for (const f of READY) {
      expect(FILM_SCENES[f.slug], f.slug).toBeTypeOf("function");
      const drawing = (await FILM_SCENES[f.slug]()).default;
      const hatch = { h1: "a", h2: "b", h3: "c", hh: "d", hs: "e" };
      for (let k = -1; k < (f.frames ?? 0); k++)
        expect(drawing.draw(hatch, k), `${f.slug} frame ${k}`).toBeTruthy();
    }
  });
});

describe("the data", () => {
  it("lists the four groups and the seven finished films", () => {
    expect(INDEX.filmGroups?.map(g => g.id)).toEqual([
      "story",
      "ideas",
      "beliefs",
      "questions",
    ]);
    expect(READY.map(f => f.slug)).toEqual([
      "bible-two-minutes",
      "holy-spirit",
      "god-with-his-people",
      "who-god-is",
      "why-jesus-died",
      "how-salvation-works",
      "who-made-god",
    ]);
  });

  it("loads every finished film, and every frame has both captions and its finished picture in words", () => {
    for (const f of READY) {
      const film = filmFile(f.slug);
      expect(isFilm(film), f.slug).toBe(true);
      expect(film.frames.length).toBeGreaterThanOrEqual(5);
      expect(film.frames.length).toBeLessThanOrEqual(9);
      expect(f.frames).toBe(film.frames.length);
      for (const fr of film.frames) {
        expect(fr.younger.length, `${f.slug} ${fr.id}`).toBeGreaterThan(20);
        expect(fr.older.length, `${f.slug} ${fr.id}`).toBeGreaterThan(20);
        expect(fr.still.length, `${f.slug} ${fr.id}`).toBeGreaterThan(20);
      }
      expect(film.think.younger && film.think.older).toBeTruthy();
      expect(film.read.length).toBeGreaterThan(0);
    }
  });

  it("gives each film page a head that matches its file", () => {
    for (const f of READY) {
      const film = filmFile(f.slug);
      expect(FILM_META[f.slug]?.title).toBe(`${film.title}: Bible Explorer`);
      expect(FILM_META[f.slug]?.description.length).toBeGreaterThan(40);
    }
  });

  it("has no file for a film not made yet", () => {
    expect(COMING.length).toBeGreaterThan(20);
    for (const f of COMING)
      expect(
        fs.existsSync(path.join(PUBLIC, `explorer/films/${f.slug}.json`)),
        f.slug
      ).toBe(false);
  });

  it("tells how salvation works without pressure, and names where churches differ", () => {
    const film = filmFile("how-salvation-works");
    const all = JSON.stringify(film);
    expect(film.differ?.text).toContain(
      "This moving picture does not choose between them."
    );
    expect(film.differ?.text).toContain("baptism");
    expect(film.differ?.links.map(l => l.href)).toEqual([
      "/study/bible/acts/2",
      "/answers/does-god-choose-us-or-do-we-choose-him",
      "/answers/can-you-lose-your-salvation",
    ]);
    expect(all).not.toMatch(
      /pray this prayer|pray after me|right now|before it is too late/i
    );
    for (const l of ["younger", "older"] as const)
      expect(film.think[l]).toMatch(/a parent, a pastor or a leader/);
    expect(film.care).toMatch(/or look at Find Help\.$/);
  });

  it("names the broken pictures of the Trinity, and the old errors only at the older level", () => {
    const frame = filmFile("who-god-is").frames.find(f => f.id === "pictures")!;
    expect(frame.younger).not.toMatch(/modalism|tritheism/i);
    expect(frame.older).toContain("modalism");
    expect(frame.older).toContain("tritheism");
    expect(frame.still).toMatch(/crossed out/);
  });

  it("never blames the Jewish people for the cross, and points on to the empty tomb", () => {
    const film = filmFile("why-jesus-died");
    expect(film.frames[0].older).toContain(
      "blaming the Jewish people for his death is a lie that Christians must reject plainly"
    );
    const last = film.frames[film.frames.length - 1];
    for (const l of ["younger", "older"] as const)
      expect(last[l]).toContain("the cross is not the end of the story");
    expect(film.end.href).toBe("/study/explorer/cross");
  });

  it("says the Holy Spirit is God, a person, not a force", () => {
    const film = filmFile("holy-spirit");
    expect(film.line.older).toContain(
      "The Holy Spirit is God, a person, not a force."
    );
    expect(film.line.younger).toContain("He is a person, not a force.");
  });
});

describe("the pages", () => {
  function renderAt(url: string) {
    window.history.pushState({}, "", url);
    return renderWithProviders(
      <Switch>
        <Route path="/study/explorer/watch/:slug" component={ExplorerFilm} />
        <Route path="/study/explorer/:slug" component={ExplorerStop} />
        <Route path="/study/explorer" component={ExplorerMap} />
      </Switch>
    );
  }

  it("the map's Watch and learn links each finished film and names the rest with no link", async () => {
    renderAt("/study/explorer");
    const sec = await screen.findByRole("region", { name: "Watch and learn" });
    for (const f of READY)
      expect(
        within(sec).getByText(f.title).closest("a")?.getAttribute("href")
      ).toBe(`/study/explorer/watch/${f.slug}`);
    for (const f of COMING) {
      const el = within(sec).getByText(f.title);
      expect(el.closest("a"), f.slug).toBeNull();
    }
  });

  it("a stop links the films that belong to it", async () => {
    renderAt("/study/explorer/creation");
    const link = await screen.findByRole("link", { name: /Who made God\?/ });
    expect(link.getAttribute("href")).toBe(
      "/study/explorer/watch/who-made-god"
    );
    expect(
      screen.getByRole("link", { name: /The whole Bible in two minutes/ })
    ).toBeTruthy();
  });

  it("a film's page has the player, Think about it, and the chapters", async () => {
    renderAt("/study/explorer/watch/holy-spirit");
    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "The Holy Spirit through the Bible",
      })
    ).toBeTruthy();
    expect(screen.getByRole("region", { name: /Moving picture/ })).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Think about it" })
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /Acts 8/ }).getAttribute("href")
    ).toBe("/study/bible/acts/8");
    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /Next to watch: God with his people/ })
      ).toBeTruthy()
    );
  });
});
