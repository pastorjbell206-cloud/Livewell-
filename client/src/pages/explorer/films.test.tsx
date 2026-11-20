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
import {
  LISTEN_KEY,
  refInWords,
  speechTimeoutMs,
  spokenText,
} from "@/lib/film-voice";
import { FILM_SCENES } from "./films/scenes";
import ExplorerMap from "./ExplorerMap";
import ExplorerStop from "./ExplorerStop";
import ExplorerFilm, { FILM_META } from "./ExplorerFilm";
import FilmExport, { exportShots } from "./films/FilmExport";

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

/**
 * Listen: the device's voice. jsdom has no speechSynthesis, so it is stubbed
 * and each sentence's end is fired by hand. No one has heard it here.
 */
class FakeUtterance {
  text: string;
  lang = "";
  rate = 1;
  voice: unknown = null;
  onend: (() => void) | null = null;
  onerror: ((e: { error: string }) => void) | null = null;
  constructor(text: string) {
    this.text = text;
  }
}
function installVoice() {
  const spoken: FakeUtterance[] = [];
  const synth = {
    speak: vi.fn((u: FakeUtterance) => {
      spoken.push(u);
    }),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    paused: false,
    speaking: false,
    getVoices: () => [],
  };
  vi.stubGlobal("speechSynthesis", synth);
  vi.stubGlobal("SpeechSynthesisUtterance", FakeUtterance);
  return { synth, spoken, last: () => spoken[spoken.length - 1] };
}
const listenButton = () => screen.getByRole("button", { name: "Listen" });
const said = (k: number, level: "younger" | "older" = "younger") =>
  spokenText(FILM.frames[k], level);

describe("Listen", () => {
  it("is off by default and, off, never speaks", () => {
    vi.useFakeTimers();
    const { synth } = installVoice();
    render(player());
    expect(listenButton().getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByText("Read aloud by your device's voice.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    for (let k = 0; k < FILM.frames.length; k++)
      advance(frameMs(FILM.frames[k].younger));
    expect(current()).toBe(FILM.frames.length);
    expect(synth.speak).not.toHaveBeenCalled();
  });

  it("on, speaks each frame in order and moves on only when the sentence ends", () => {
    vi.useFakeTimers();
    const { spoken, last } = installVoice();
    render(player());
    fireEvent.click(listenButton());
    expect(listenButton().getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(current()).toBe(1);
    expect(last().text).toBe(said(0));
    // The caption's own timer no longer moves it: it waits for the voice.
    advance(frameMs(FILM.frames[0].younger) + 1000);
    expect(current()).toBe(1);
    for (let k = 1; k < FILM.frames.length; k++) {
      act(() => last().onend?.());
      advance(700);
      expect(current()).toBe(k + 1);
      expect(last().text).toBe(said(k));
    }
    expect(spoken.map(u => u.text)).toEqual(FILM.frames.map((_, k) => said(k)));
    act(() => last().onend?.());
    advance(700);
    expect(screen.getByRole("button", { name: "Play again" })).toBeTruthy();
    // Nothing is announced to a screen reader while the voice speaks.
    expect(live()).toBe("");
  });

  it("moves on after a wait if the voice never says it has finished", () => {
    vi.useFakeTimers();
    installVoice();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    advance(speechTimeoutMs(said(0)) + 700);
    expect(current()).toBe(2);
  });

  it("Pause stops the voice and holds; Play on says the frame again", () => {
    vi.useFakeTimers();
    const { synth, last } = installVoice();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    const first = last();
    synth.cancel.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    expect(synth.cancel).toHaveBeenCalled();
    act(() => first.onend?.()); // a late end from the stopped sentence
    advance(60_000);
    expect(current()).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: "Play on" }));
    expect(last()).not.toBe(first);
    expect(last().text).toBe(said(0));
  });

  it("Back, Next and the frame buttons stop the voice and say the new frame; a playing film plays on", () => {
    vi.useFakeTimers();
    const { synth, last } = installVoice();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    synth.cancel.mockClear();
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(synth.cancel).toHaveBeenCalled();
    expect(current()).toBe(2);
    expect(last().text).toBe(said(1));
    expect(screen.getByRole("button", { name: "Pause" })).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: `Picture 4: ${FILM.frames[3].name}` })
    );
    expect(last().text).toBe(said(3));
    fireEvent.click(screen.getByRole("button", { name: /^Back/ }));
    expect(current()).toBe(3);
    expect(last().text).toBe(said(2));
    act(() => last().onend?.());
    advance(700);
    expect(current()).toBe(4);
    expect(live()).toBe("");
  });

  it("stepping by hand while paused says the frame and stays there", () => {
    vi.useFakeTimers();
    const { last } = installVoice();
    render(player("older"));
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(last().text).toBe(said(0, "older"));
    act(() => last().onend?.());
    advance(60_000);
    expect(current()).toBe(1);
    expect(live()).toBe("");
  });

  it("works with reduced motion, stepping by hand", () => {
    motion(true);
    vi.useFakeTimers();
    const { last } = installVoice();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: /^Start/ }));
    expect(last().text).toBe(said(0));
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(last().text).toBe(said(1));
  });

  it("where the device has no voice, falls back to the timed captions and says so", () => {
    vi.useFakeTimers();
    render(player());
    fireEvent.click(listenButton());
    expect(
      screen.getByText(/Sound is not available on this device/)
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    advance(frameMs(FILM.frames[0].younger));
    expect(current()).toBe(2);
  });

  it("if the voice fails, falls back to the timed captions and says so", () => {
    vi.useFakeTimers();
    const { last } = installVoice();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    act(() => last().onerror?.({ error: "synthesis-failed" }));
    expect(
      screen.getByText(/Sound is not available on this device/)
    ).toBeTruthy();
    advance(frameMs(FILM.frames[0].younger));
    expect(current()).toBe(2);
  });

  it("keeps the choice on this device", () => {
    installVoice();
    const { unmount } = render(player());
    fireEvent.click(listenButton());
    expect(JSON.parse(window.localStorage.getItem(LISTEN_KEY) ?? "{}")).toEqual(
      { v: 1, on: true }
    );
    unmount();
    render(player());
    expect(listenButton().getAttribute("aria-pressed")).toBe("true");
  });

  it("stops the voice when the player goes away", () => {
    const { synth } = installVoice();
    const { unmount } = render(player());
    fireEvent.click(listenButton());
    synth.cancel.mockClear();
    unmount();
    expect(synth.cancel).toHaveBeenCalled();
  });

  it("says references in words and the frame's verse after its caption", () => {
    expect(refInWords("1 Corinthians 15:3-4")).toBe(
      "First Corinthians chapter 15, verses 3 and 4"
    );
    expect(refInWords("Psalm 90:2")).toBe("Psalm 90, verse 2");
    expect(refInWords("Mark 1:9-11")).toBe("Mark chapter 1, verses 9 to 11");
    const withVerse = FILM.frames.find(f => f.verse)!;
    const text = spokenText(withVerse, "younger");
    expect(text.startsWith(withVerse.younger.replace(/\.$/, ""))).toBe(true);
    expect(text).toContain(withVerse.verse!.text.replace(/\.$/, ""));
    for (const f of READY)
      for (const fr of filmFile(f.slug).frames)
        for (const l of ["younger", "older"] as const)
          expect(spokenText(fr, l), `${f.slug} ${fr.id} ${l}`).not.toMatch(
            /\d:\d/
          );
  });
});

describe("the data", () => {
  it("lists the four groups and the ten finished films", () => {
    expect(INDEX.filmGroups?.map(g => g.id)).toEqual([
      "story",
      "ideas",
      "beliefs",
      "questions",
    ]);
    expect(READY.map(f => f.slug)).toEqual([
      "bible-two-minutes",
      "bible-in-a-minute",
      "holy-spirit",
      "god-with-his-people",
      "who-god-is",
      "why-jesus-died",
      "how-salvation-works",
      "gospel-in-a-minute",
      "who-made-god",
      "does-god-exist",
    ]);
  });

  it("the three films cut for sharing are short, stand alone, and end by pointing to the site, never pressing", () => {
    for (const slug of [
      "gospel-in-a-minute",
      "bible-in-a-minute",
      "does-god-exist",
    ]) {
      const film = filmFile(slug);
      expect(film.frames.length, slug).toBeGreaterThanOrEqual(6);
      expect(film.frames.length, slug).toBeLessThanOrEqual(8);
      const all = JSON.stringify(film);
      expect(all).not.toMatch(
        /pray this prayer|pray after me|right now|before it is too late|decide today/i
      );
      // Third person: never the site's author speaking.
      for (const fr of film.frames)
        for (const l of ["younger", "older"] as const)
          expect(fr[l], `${slug} ${fr.id}`).not.toMatch(
            /\b(I|I'm|I've|my|me)\b/
          );
    }
    const gospel = filmFile("gospel-in-a-minute");
    expect(gospel.frames.filter(f => f.verse).map(f => f.verse!.ref)).toEqual([
      "1 Corinthians 15:3-4",
    ]);
    const last = gospel.frames[gospel.frames.length - 1];
    for (const l of ["younger", "older"] as const) {
      expect(last[l]).toContain("www.livewellbyjamesbell.co");
      expect(last[l]).toMatch(/pastor/);
    }
  });

  it("Does God exist? claims only what the Honest Answer claims, says what it does not show, and sends the reader to the answer", () => {
    const film = filmFile("does-god-exist");
    const shows = film.frames.find(f => f.id === "shows")!;
    expect(shows.younger).toContain(
      "This does not prove that Christianity is true"
    );
    expect(shows.younger).toContain("believing in God is reasonable");
    expect(shows.older).toContain("isn't yet Christianity");
    expect(film.end.href).toBe("/answers/does-god-actually-exist");
    expect(film.deeper?.map(d => d.href)).toContain(
      "/answers/does-god-actually-exist"
    );
    expect(film.frames[film.frames.length - 1].older).toContain("still say no");
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

  it("a film's page offers Share, which copies the film's address", async () => {
    const writeText = vi.fn(async () => undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
    renderAt("/study/explorer/watch/who-made-god");
    fireEvent.click(await screen.findByRole("button", { name: "Share" }));
    await waitFor(() => expect(screen.getByText(/Link copied/)).toBeTruthy());
    expect(writeText).toHaveBeenCalledWith(
      "https://www.livewellbyjamesbell.co/study/explorer/watch/who-made-god"
    );
  });

  it("?export= lays the film out as a video: no site chrome, an opening and a closing card", async () => {
    renderAt("/study/explorer/watch/who-made-god?export=square");
    const main = await waitFor(() => {
      const m = document.querySelector("main.fx.fx--square");
      expect(m).toBeTruthy();
      return m as HTMLElement;
    });
    expect(document.querySelector("header nav, footer")).toBeNull();
    expect(
      within(main).getByRole("heading", { level: 1, name: FILM.title })
    ).toBeTruthy();
    expect(main.textContent).toContain("LiveWell by James Bell");
    expect(main.textContent).toContain(
      "www.livewellbyjamesbell.co/study/explorer/watch/who-made-god"
    );
    window.history.pushState({}, "", "/");
  });
});

describe("the video export", () => {
  it("shows the whole film at a level, or its share cut with only the verses it keeps", () => {
    const whole = exportShots(FILM, "older", false);
    expect(whole.map(s => s.text)).toEqual(FILM.frames.map(f => f.older));
    for (const f of READY) {
      const film = filmFile(f.slug);
      if (!film.share) continue;
      const cut = exportShots(film, "younger", true);
      expect(cut.length, f.slug).toBe(film.share.frames.length);
      film.share.frames.forEach((sf, k) => {
        expect(cut[k].id).toBe(sf.id);
        expect(Boolean(cut[k].verse)).toBe(
          sf.verse !== false &&
            Boolean(film.frames.find(x => x.id === sf.id)?.verse)
        );
        if (sf.text) expect(cut[k].text).toBe(sf.text);
      });
    }
  });

  it("is driven a frame at a time by the export script, and keeps no timer", async () => {
    vi.useFakeTimers();
    render(
      <FilmExport film={FILM} shape="vertical" level="younger" cut={false} />
    );
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    const api = window.__lwExport!;
    expect(api.shape).toBe("vertical");
    expect(api.shots).toHaveLength(FILM.frames.length);
    expect(document.querySelector(".fx-card--open.is-on")).toBeTruthy();
    act(() => api.show(2));
    expect(document.querySelector(".fx-card.is-on")).toBeNull();
    expect(
      document.querySelector(".fx-cap.is-on .fx-cap__text")?.textContent
    ).toBe(FILM.frames[2].younger);
    act(() => api.show(FILM.frames.length));
    expect(document.querySelector(".fx-card--close.is-on")).toBeTruthy();
    expect(vi.getTimerCount()).toBe(0);
  });
});
