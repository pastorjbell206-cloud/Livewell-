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
import { filmAudioUrl } from "@/lib/film-audio";
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

  it("has finished films whose drawings to check", () => {
    expect(READY.length).toBeGreaterThan(30);
  });

  // One film to a test: loading every film's chunk in one test compiled and
  // ran three dozen modules inside one 5 s budget, too few on a busy machine.
  it.each(READY.map(f => [f.slug, f] as const))(
    "each film's drawing is its own lazy chunk and draws every frame: %s",
    async (slug, f) => {
      expect(FILM_SCENES[slug], slug).toBeTypeOf("function");
      const drawing = (await FILM_SCENES[slug]()).default;
      const hatch = { h1: "a", h2: "b", h3: "c", hh: "d", hs: "e" };
      for (let k = -1; k < (f.frames ?? 0); k++)
        expect(drawing.draw(hatch, k), `${slug} frame ${k}`).toBeTruthy();
    }
  );
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

/**
 * Listen with the recorded files. jsdom cannot play sound, so window.Audio is
 * replaced by a stand-in that records what was asked of it; each file's end
 * (or failure) is fired by hand. No one has heard it here.
 */
class FakeAudio {
  static all: FakeAudio[] = [];
  src = "";
  preload = "";
  paused = true;
  ended = false;
  currentTime = 0;
  dataset: Record<string, string> = {};
  plays = 0;
  onended: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onplaying: (() => void) | null = null;
  constructor() {
    FakeAudio.all.push(this);
  }
  canPlayType() {
    return "probably";
  }
  play() {
    this.plays += 1;
    this.paused = false;
    return Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
}
function installFiles() {
  FakeAudio.all = [];
  vi.stubGlobal("Audio", FakeAudio);
  /** The one element the film plays through (the first made after the probe). */
  const main = () => FakeAudio.all.filter(a => a.plays > 0)[0];
  /** Every file asked for, in order. */
  const asked = () => FakeAudio.all.map(a => a.src).filter(Boolean);
  return { main, asked };
}
const fileOf = (k: number, level: "younger" | "older" = "younger") =>
  filmAudioUrl(FILM.slug, level, k, FILM.frames[k].id);

describe("Listen with the recorded files", () => {
  it("is off by default, asks for no file until it is on, and never plays by itself", () => {
    vi.useFakeTimers();
    const { asked } = installFiles();
    render(player());
    expect(listenButton().getAttribute("aria-pressed")).toBe("false");
    expect(
      screen.getByText("Read aloud by a computer-made voice, not a person.")
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    for (let k = 0; k < FILM.frames.length; k++)
      advance(frameMs(FILM.frames[k].younger));
    expect(current()).toBe(FILM.frames.length);
    expect(asked()).toEqual([]);
    // Turning Listen on at the poster asks for nothing either: no frame is on.
    cleanup();
    render(player());
    fireEvent.click(listenButton());
    expect(asked()).toEqual([]);
    expect(current()).toBe(0);
  });

  it("on, plays each frame's own file and moves on only when the file ends", () => {
    vi.useFakeTimers();
    const { main } = installFiles();
    const { synth } = installVoice();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(current()).toBe(1);
    expect(main().src).toBe(fileOf(0));
    // The caption's own timer no longer moves it: it waits for the file.
    advance(frameMs(FILM.frames[0].younger) + 1000);
    expect(current()).toBe(1);
    for (let k = 1; k < FILM.frames.length; k++) {
      act(() => main().onended?.());
      advance(700);
      expect(current()).toBe(k + 1);
      expect(main().src).toBe(fileOf(k));
    }
    act(() => main().onended?.());
    advance(700);
    expect(screen.getByRole("button", { name: "Play again" })).toBeTruthy();
    // One element plays the whole film, and the device's voice stays silent.
    expect(FakeAudio.all.filter(a => a.plays > 0).length).toBe(1);
    expect(synth.speak).not.toHaveBeenCalled();
    // Nothing is announced to a screen reader while the voice speaks.
    expect(live()).toBe("");
  });

  it("plays the file for the reading level on screen", () => {
    vi.useFakeTimers();
    const { main } = installFiles();
    render(player("older"));
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(main().src).toBe(fileOf(0, "older"));
  });

  it("fetches the next frame's file ahead only once this one is playing", () => {
    vi.useFakeTimers();
    const { main, asked } = installFiles();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(asked()).toEqual([fileOf(0)]);
    act(() => main().onplaying?.());
    expect(asked()).toEqual([fileOf(0), fileOf(1)]);
  });

  it("Pause holds the file and Play on goes on from where it stopped", () => {
    vi.useFakeTimers();
    const { main } = installFiles();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    const a = main();
    a.currentTime = 4.2;
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    expect(a.paused).toBe(true);
    advance(60_000);
    expect(current()).toBe(1);
    const src = a.src;
    a.src = `${src}#same`; // a new src would show as a change
    fireEvent.click(screen.getByRole("button", { name: "Play on" }));
    expect(a.paused).toBe(false);
    expect(a.src).toBe(`${src}#same`);
    expect(a.currentTime).toBe(4.2);
  });

  it("stepping by hand plays that frame's file from its start; a playing film plays on", () => {
    vi.useFakeTimers();
    const { main } = installFiles();
    render(player());
    fireEvent.click(listenButton());
    // Paused, at the poster: Next says picture 1 and stays there.
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(main().src).toBe(fileOf(0));
    act(() => main().onended?.());
    advance(60_000);
    expect(current()).toBe(1);
    fireEvent.click(
      screen.getByRole("button", { name: `Picture 4: ${FILM.frames[3].name}` })
    );
    expect(main().src).toBe(fileOf(3));
    fireEvent.click(screen.getByRole("button", { name: /^Back/ }));
    expect(main().src).toBe(fileOf(2));
    // Playing: a step by hand keeps it playing from the new frame.
    fireEvent.click(screen.getByRole("button", { name: "Play on" }));
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(current()).toBe(4);
    expect(main().src).toBe(fileOf(3));
    expect(screen.getByRole("button", { name: "Pause" })).toBeTruthy();
    act(() => main().onended?.());
    advance(700);
    expect(current()).toBe(5);
    expect(live()).toBe("");
  });

  it("works with reduced motion, stepping by hand", () => {
    motion(true);
    vi.useFakeTimers();
    const { main } = installFiles();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: /^Start/ }));
    expect(main().src).toBe(fileOf(0));
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(main().src).toBe(fileOf(1));
  });

  it("where a file is missing, the device's voice says that frame and the film goes on", () => {
    vi.useFakeTimers();
    const { main } = installFiles();
    const { synth, last } = installVoice();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    act(() => main().onerror?.());
    expect(synth.speak).toHaveBeenCalledTimes(1);
    expect(last().text).toBe(said(0));
    act(() => last().onend?.());
    advance(700);
    // The next frame tries its own file again.
    expect(current()).toBe(2);
    expect(main().src).toBe(fileOf(1));
    expect(synth.speak).toHaveBeenCalledTimes(1);
  });

  it("where a file is missing and the device has no voice, the caption's own time moves the film", () => {
    vi.useFakeTimers();
    const { main } = installFiles();
    render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    act(() => main().onerror?.());
    advance(frameMs(FILM.frames[0].younger) + 700);
    expect(current()).toBe(2);
  });

  it("stops the file when Listen is turned off and when the player goes away", () => {
    const { main } = installFiles();
    const { unmount } = render(player());
    fireEvent.click(listenButton());
    fireEvent.click(screen.getByRole("button", { name: /^Next/ }));
    expect(main().paused).toBe(false);
    fireEvent.click(listenButton());
    expect(main().paused).toBe(true);
    fireEvent.click(listenButton());
    expect(main().paused).toBe(false);
    unmount();
    expect(main().paused).toBe(true);
  });
});

describe("the data", () => {
  it("lists the six groups and the forty-three finished films", () => {
    expect(INDEX.filmGroups?.map(g => g.id)).toEqual([
      "story",
      "stories",
      "ideas",
      "beliefs",
      "verses",
      "questions",
    ]);
    expect(READY.map(f => f.slug)).toEqual([
      "bible-two-minutes",
      "bible-in-a-minute",
      "sixty-six-books",
      "the-exodus",
      "david-and-goliath",
      "holy-spirit",
      "god-with-his-people",
      "the-king",
      "covenant",
      "the-lamb",
      "why-blood",
      "exile-and-home",
      "kingdom-of-god",
      "who-god-is",
      "image-of-god",
      "what-sin-is",
      "who-jesus-is",
      "why-jesus-died",
      "the-resurrection",
      "how-salvation-works",
      "grace",
      "faith",
      "gospel-in-a-minute",
      "spirit-in-a-believer",
      "the-church",
      "baptism-and-supper",
      "the-bible",
      "prayer",
      "life-to-come",
      "john-3-16",
      "psalm-23",
      "romans-8-28",
      "who-made-god",
      "does-god-exist",
      "why-cant-i-see-god",
      "why-bad-things-happen",
      "is-the-bible-true",
      "did-jesus-come-back-to-life",
      "when-we-die",
      "so-many-churches",
      "love-when-i-do-wrong",
      "god-silent",
      "science-and-the-bible",
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
    expect(COMING.length).toBeGreaterThan(0);
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

  // Renders the whole Explorer map (3,300 elements, half of them drawings):
  // heavy by design, so 15 s rather than 5; a busy machine stretched it past 7.
  it("the map's Watch and learn links each finished film and names the rest with no link", async () => {
    renderAt("/study/explorer");
    const sec = await screen.findByRole("region", {
      name: /^Watch and learn/,
    });
    for (const f of READY)
      expect(
        within(sec).getByText(f.title).closest("a")?.getAttribute("href")
      ).toBe(`/study/explorer/watch/${f.slug}`);
    for (const f of COMING) {
      const el = within(sec).getByText(f.title);
      expect(el.closest("a"), f.slug).toBeNull();
    }
  }, 15000);

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
  it("every finished film has a poster for a shared link (1200 by 630)", () => {
    for (const f of READY)
      expect(
        fs.existsSync(path.join(PUBLIC, `explorer/video/${f.slug}-poster.jpg`)),
        f.slug
      ).toBe(true);
  });

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

describe("the three films of 2026-11-21", () => {
  it("Did Jesus really come back to life? keeps to the Honest Answer, in the third person, and points to it", () => {
    const film = filmFile("did-jesus-come-back-to-life");
    expect(film.frames.length).toBe(7);
    for (const fr of film.frames)
      for (const level of ["younger", "older"] as const)
        expect(fr[level], fr.id).not.toMatch(/\b(I|I'm|I've|my|me)\b/);
    const all = JSON.stringify(film);
    expect(all).toMatch(/isn't a proof/);
    expect(all).not.toMatch(/testimony of women|women's testimony/i);
    expect(film.end.href).toBe("/answers/did-the-resurrection-actually-happen");
  });

  it("How the 66 books fit together names the other Bibles plainly and takes no side on authorship or dates", () => {
    const film = filmFile("sixty-six-books");
    const all = JSON.stringify(film);
    expect(all).toMatch(
      /Roman Catholic and Orthodox Bibles include further books/
    );
    expect(all).not.toMatch(/\b\d{3,4} ?(BC|AD)\b|\b(BC|AD) ?\d/);
    expect(all).not.toMatch(/Moses wrote|Paul wrote Hebrews|written by Luke/i);
  });

  it("What the church is says what churches share and that they differ, without a side", () => {
    const film = filmFile("the-church");
    expect(film.differ?.text).toMatch(/does not choose between them/);
    expect(film.care).toMatch(/not your fault/);
    expect(film.share?.level).toBe("younger");
  });
});

describe("the three films of 2026-11-20 (suffering, the Bible, the Spirit)", () => {
  const firstPerson = /\b(I|I'm|I've|my|me)\b/;
  const captions = (slug: string) =>
    filmFile(slug)
      .frames.flatMap(fr => [fr.younger, fr.older])
      .join(" ");

  it("Why do bad things happen? gives no neat explanation, never calls suffering a lesson or a punishment, and keeps help in view", () => {
    const film = filmFile("why-bad-things-happen");
    const all = captions("why-bad-things-happen");
    expect(all).not.toMatch(firstPerson);
    expect(all).not.toMatch(
      /teach(es|ing)? you a lesson|you deserved|God is punishing/i
    );
    // "Everything happens for a reason" is named only to be refused.
    for (const m of Array.from(all.matchAll(/happens? for a reason[^.]*\./g)))
      expect(m[0]).toMatch(/isn't theology/);
    expect(all).toMatch(/Nobody can explain/);
    expect(all).toMatch(/not God paying you back/);
    expect(all).toMatch(/cross/);
    expect(all).toMatch(/wipe away every tear/);
    expect(film.care).toMatch(/or look at Find Help\.$/);
    expect(film.frames.at(-1)!.younger).toMatch(/grown-up you trust/);
    expect(film.frames.at(-1)!.older).toMatch(/Find Help/);
    expect(film.end.href).toBe("/answers/if-god-is-good-why-suffering");
  });

  it("Is the Bible true? concedes what the answer concedes and claims no more", () => {
    const all = captions("is-the-bible-true");
    expect(all).not.toMatch(firstPerson);
    expect(all).toMatch(/We don't have the originals/);
    expect(all).toMatch(/None of this proves the Bible is the word of God/);
    expect(all).toMatch(/end of Mark/);
    expect(filmFile("is-the-bible-true").end.href).toBe(
      "/answers/why-would-anyone-trust-the-bible"
    );
  });

  it("The Holy Spirit in a believer says what all share and that churches differ, with no side", () => {
    const film = filmFile("spirit-in-a-believer");
    expect(film.differ?.text).toMatch(/does not choose between them/);
    expect(film.frames.find(f => f.id === "differ")!.older).toMatch(
      /does not choose between them/
    );
    expect(captions("spirit-in-a-believer")).not.toMatch(
      /must speak in tongues|gifts (have )?ceased|tongues (have )?ceased/i
    );
  });

  it("each runs past two minutes at a level and so has a share cut under two minutes", () => {
    for (const slug of [
      "why-bad-things-happen",
      "is-the-bible-true",
      "spirit-in-a-believer",
    ])
      expect(filmFile(slug).share?.level, slug).toBe("younger");
  });
});

describe("the three belief films of 2026-11-20 night (image, sin, Jesus)", () => {
  const captions = (slug: string) =>
    filmFile(slug)
      .frames.flatMap(fr => [fr.younger, fr.older, fr.still])
      .join(" ");

  it("Creation and the image of God takes no side on the age of the earth or evolution", () => {
    const film = filmFile("image-of-god");
    const all = captions("image-of-god");
    expect(all).toMatch(
      /takes no side on the age of the earth or on evolution/
    );
    expect(film.differ?.text).toMatch(/takes no side/);
    expect(all).not.toMatch(
      /billion|million years|thousand years old|young earth|old earth|evolved|fossil|dinosaur|\bAdam\b|flood/i
    );
    expect(all).toMatch(/given, not earned/);
  });

  it("What sin is never tells a reader they are bad, keeps grace in view and help visible", () => {
    const film = filmFile("what-sin-is");
    const younger = film.frames.map(f => f.younger).join(" ");
    expect(younger).not.toMatch(/you are bad|bad person|worthless person/i);
    expect(younger).toMatch(/does not make anyone worthless/);
    expect(film.frames.at(-1)!.younger).toMatch(/Where are you\?/);
    expect(film.care).toMatch(/Nobody is too bad to be forgiven/);
    expect(film.differ?.text).toMatch(/does not choose between them/);
  });

  it("Who Jesus is: fully God and fully man, one person, never half and half", () => {
    const all = captions("who-jesus-is");
    expect(all).toMatch(/fully God and fully man/);
    expect(all).toMatch(/not half God and half man/i);
    expect(all).toMatch(/not a man who (later )?became God/);
    expect(all).not.toMatch(/\bface\b|halo/i);
  });

  it("each runs past two minutes at the older level and so has a share cut", () => {
    for (const slug of ["image-of-god", "what-sin-is", "who-jesus-is"])
      expect(filmFile(slug).share?.level, slug).toBe("younger");
  });
});

describe("the four films of 2026-11-20 (late): prayer, the two signs, the life to come, the churches", () => {
  const words = (slug: string) => JSON.stringify(filmFile(slug));

  it("Prayer promises no outcome and keeps a trusted adult in view", () => {
    const film = filmFile("prayer");
    const all = words("prayer");
    expect(all).toMatch(/Prayer is not a promise that we will get what we ask/);
    expect(all).toMatch(/sometimes it is wait, and sometimes it is no/);
    expect(all).not.toMatch(
      /always get|guarantee|enough faith,? (you|and)|pray this prayer/i
    );
    expect(film.care).toMatch(/not because you prayed wrongly/);
    expect(film.care).toMatch(/or look at Find Help\.$/);
  });

  it("Baptism and the Supper says what all share, then each reading, and takes no side", () => {
    const film = filmFile("baptism-and-supper");
    const older = film.frames.map(f => f.older).join(" ");
    for (const view of [
      /Roman Catholic teaching holds that the bread and wine become Christ's body and blood/,
      /Lutherans confess Christ's true body and blood present in, with and under the bread and wine/,
      /Reformed churches teach a real spiritual feeding on Christ by faith/,
      /Many Baptist and free churches stress a memorial meal/,
    ])
      expect(older).toMatch(view);
    expect(older).toMatch(
      /All agree that the meal proclaims the Lord's death until he comes/
    );
    expect(older).toMatch(/this moving picture does not choose between them/);
    expect(film.differ?.text).toMatch(/does not choose between them/);
    // No form of the rite, and no church, is called the right one.
    expect(words("baptism-and-supper")).not.toMatch(
      /\b(correct|right) (way|view|church)\b|the true church|you should be baptized/i
    );
  });

  it("The life to come is gentle: two readings of the time between, a care line, nothing on any one person's end", () => {
    const film = filmFile("life-to-come");
    const all = words("life-to-come");
    expect(all).toMatch(/Most Christian traditions read/);
    expect(all).toMatch(
      /Others hold that the dead sleep until the resurrection/
    );
    expect(all).toMatch(/Christians still differ on how to describe that time/);
    expect(all).not.toMatch(
      /suicide|took (his|her|their) own life|grave ?stone|skeleton|fire|burn|torment|rapture|antichrist|\b\d{4}\b/i
    );
    expect(film.care).toMatch(
      /a parent, a pastor or another adult you trust, or look at Find Help\.$/
    );
    expect(film.differ?.text).toMatch(/does not choose between them/);
  });

  it("Why are there so many churches? grieves the divisions, takes no side, and keeps to the site's dates", () => {
    const film = filmFile("so-many-churches");
    const all = words("so-many-churches");
    expect(all).toMatch(/1054/);
    expect(all).toMatch(/1517/);
    expect(all).toMatch(/That is a grief, not a joke/);
    expect(all).toMatch(
      /This moving picture does not choose between the churches/
    );
    expect(all).not.toMatch(
      /the true church|the right church|false church|heretic/i
    );
    expect(film.differ?.links.map(l => l.href)).toContain(
      "/theology/traditions"
    );
  });

  it("each runs past two minutes at both levels and so has a share cut under two minutes", () => {
    for (const slug of [
      "prayer",
      "baptism-and-supper",
      "life-to-come",
      "so-many-churches",
    ])
      expect(filmFile(slug).share?.level, slug).toBe("younger");
  });
});

describe("the four films of 2026-11-20 (fifth run): the resurrection, the Bible, the king, Does God still love me?", () => {
  const words = (slug: string) => JSON.stringify(filmFile(slug));

  it("The resurrection teaches what it is and means, and leaves the case for it to the other film", () => {
    const film = filmFile("the-resurrection");
    const all = words("the-resurrection");
    expect(all).toMatch(
      /God raised the same body that had been buried, now made new/
    );
    expect(all).toMatch(/firstfruits/);
    expect(all).toMatch(/Jesus was not a ghost/);
    // Not the evidence film again: no Tacitus, no vision theory, no women's testimony argument.
    expect(all).not.toMatch(
      /Tacitus|vision|hallucinat|testimony|court|historian/i
    );
    expect(film.deeper?.map(d => d.href)).toContain(
      "/study/explorer/watch/did-jesus-come-back-to-life"
    );
    expect(film.care).toMatch(/or look at Find Help\.$/);
  });

  it("The Bible: how we got it gives no dating to argue over and claims no more than the guides", () => {
    const all = words("the-bible");
    expect(all).not.toMatch(
      /\b(AD|BC) ?\d|\b\d{3,4}\b|thousand years|manuscripts? (prove|show it is accurate)|perfectly preserved|without error/i
    );
    expect(all).toMatch(
      /every hand-made copy differs from every other in small ways/
    );
    expect(filmFile("the-bible").differ?.text).toMatch(
      /does not choose between them/
    );
  });

  it("The king puts no modern state in view and never sets the crown on anyone", () => {
    const all = words("the-king");
    expect(all).not.toMatch(
      /\b(Israeli|America|United States|flag|nation-state|today's|modern)\b/i
    );
    expect(all).toMatch(/My kingdom is not of this world/);
    expect(all).toMatch(/not a country with borders and soldiers/);
    expect(filmFile("the-king").differ?.text).toMatch(
      /does not choose between them/
    );
  });

  it("Does God still love me? rests on Luke 15 and the Study Bible, keeps sin serious, and presses no fear", () => {
    const film = filmFile("love-when-i-do-wrong");
    const all = words("love-when-i-do-wrong");
    expect(film.end.href).toBe("/study/bible/luke/15");
    expect(film.deeper?.map(d => d.href)).toEqual(
      expect.arrayContaining([
        "/study/bible/luke/15",
        "/study/bible/doctrines/love",
      ])
    );
    expect(all).toMatch(/the father's love is moved before any confession/);
    expect(all).toMatch(
      /restoration comes as a gift before the son can bargain for it/
    );
    expect(all).toMatch(
      /Sin is serious, and it grieves God; that is why the cross was needed/
    );
    expect(all).not.toMatch(
      /punish|hell|afraid of God|you are bad|pray this prayer/i
    );
    expect(film.care).toBe(filmFile("what-sin-is").care);
  });

  it("each has seven frames and a share cut at the younger level", () => {
    for (const slug of [
      "the-resurrection",
      "the-bible",
      "the-king",
      "love-when-i-do-wrong",
    ]) {
      const film = filmFile(slug);
      expect(film.frames.length, slug).toBe(7);
      expect(film.share?.level, slug).toBe("younger");
    }
  });
});

describe("the four films of 2026-11-20 (sixth run): the covenants, the Lamb, exile and home, the kingdom of God", () => {
  const words = (slug: string) => JSON.stringify(filmFile(slug));

  it("The covenants never tell the new covenant as God rejecting the Jewish people, and take no side on how the covenants relate", () => {
    const film = filmFile("covenant");
    const all = words("covenant");
    // The Hebrews book page's own words on that point.
    expect(all).toMatch(
      /these words are not a verdict that God has rejected the Jewish people/
    );
    expect(all).toMatch(/did God reject His people\? Certainly not!/);
    expect(all).not.toMatch(/replaced|replacement|cast off|rejected Israel/i);
    expect(film.differ?.text).toMatch(
      /covenant theology, dispensational readings, progressive covenantalism and new covenant theology/
    );
    expect(film.differ?.text).toMatch(/does not choose between them/);
    expect(film.differ?.text).toMatch(
      /None of them teaches that God has abandoned the Jewish people/
    );
    expect(film.differ?.links.map(l => l.href)).toContain(
      "/study/bible/hebrews"
    );
    // ...and that page still says it, so the film reuses live wording.
    expect(
      fs.readFileSync(
        path.join(PUBLIC, "bible/notes/hebrews/intro.json"),
        "utf8"
      )
    ).toContain(
      "These words are not a verdict that God has rejected the Jewish people"
    );
    expect(film.frames.map(f => f.id)).toEqual([
      "noah",
      "abraham",
      "sinai",
      "david",
      "new",
      "cup",
      "yes",
    ]);
  });

  it("Sacrifice and the Lamb is gentle, agrees with Why did Jesus die?, and chooses no atonement theory", () => {
    const film = filmFile("the-lamb");
    const all = words("the-lamb");
    expect(all).toMatch(
      /Look, the Lamb of God, who takes away the sin of the world!/
    );
    expect(all).toMatch(/not an angry Father against an unwilling Son/);
    expect(all).toMatch(/God stopped Abraham/);
    expect(all).not.toMatch(
      /penal|satisfaction|Christus Victor|moral influence|governmental|wrath/i
    );
    expect(film.differ?.text).toMatch(
      /does not choose between the ways of explaining the cross/
    );
    expect(film.differ?.text).toMatch(/the people of Israel/);
    expect(film.care).toBe(filmFile("why-jesus-died").care);
    expect(film.cards).toContain("cross");
    expect(film.end.href).toBe("/study/explorer/cross");
  });

  it("Exile and coming home keeps every modern state out of view, blames no people, and reuses existing care words", () => {
    const film = filmFile("exile-and-home");
    const all = words("exile-and-home");
    expect(all).not.toMatch(
      /\b(Israeli|Zionis\w*|Palestin\w*|1948|modern|today's|refugee camp|Iraq|Iran)\b/i
    );
    expect(all).not.toMatch(
      /the Babylonians were|the Egyptians were|wicked nation/i
    );
    // The care line is three sentences already on the site: the Exile stop's
    // and the Wisdom page "Feeling far from God".
    expect(film.care).toBe(
      "If you have had to leave a home, or have lost someone or something you loved, it is right to feel sad, and you do not have to carry it alone. Feeling far from God is not the same as being far from him. Talk with a parent or a leader you trust, or look at Find Help."
    );
    const exileStop = JSON.parse(
      fs.readFileSync(path.join(PUBLIC, "explorer/stops/exile.json"), "utf8")
    );
    expect(exileStop.care).toContain(
      "If you have had to leave a home, or have lost someone or something you loved, it is right to feel sad, and you do not have to carry it alone."
    );
    expect(exileStop.care).toMatch(
      /Talk with a parent or a leader you trust, or look at Find Help\.$/
    );
    expect(
      fs.readFileSync(
        path.join(PUBLIC, "wisdom/entry/feeling-far-from-god.json"),
        "utf8"
      )
    ).toContain("Feeling far from God is not the same as being far from him.");
    expect(film.deeper?.map(d => d.href)).toContain(
      "/wisdom/feeling-far-from-god"
    );
  });

  it("The kingdom of God is no country, party or nation, said both ways, and gives no end-times scheme", () => {
    const film = filmFile("kingdom-of-god");
    const all = words("kingdom-of-god");
    expect(all).toMatch(/not a country, a party or a nation/);
    expect(all).toMatch(/whichever way that program leans/);
    expect(all).toMatch(/shrinks the kingdom to a private feeling/);
    expect(all).toMatch(/My kingdom is not of this world/);
    expect(all).not.toMatch(
      /millenni|rapture|tribulation|antichrist|\bflag\b|America|Republican|Democrat|left-wing|right-wing/i
    );
    expect(film.differ?.text).toBe(filmFile("the-king").differ?.text);
  });

  it("each has seven frames and a share cut at the younger level", () => {
    for (const slug of [
      "covenant",
      "the-lamb",
      "exile-and-home",
      "kingdom-of-god",
    ]) {
      const film = filmFile(slug);
      expect(film.frames.length, slug).toBe(7);
      expect(film.share?.level, slug).toBe("younger");
    }
  });
});

describe("the four Good questions of 2026-11-20 (seventh run): seeing God, dying, silence, science", () => {
  const words = (slug: string) => JSON.stringify(filmFile(slug));
  const catechism = JSON.parse(
    fs.readFileSync(path.join(PUBLIC, "family-catechism.json"), "utf8")
  ) as { number: number; answer: string; commentary: string }[];
  const q = (n: number) => catechism.find(c => c.number === n)!;

  it("Why can't I see God? rests on the catechism's own answer and never draws God", () => {
    const film = filmFile("why-cant-i-see-god");
    expect(q(67).answer).toContain(
      "we know real things we cannot see all the time, like love, or the wind, or our own thoughts"
    );
    expect(words("why-cant-i-see-god")).toContain(
      "we know real things we cannot see all the time, like love, or the wind, or our own thoughts"
    );
    expect(q(67).commentary).toContain(
      "We do not know God by squinting harder. We know him because he came close."
    );
    expect(film.frames.find(f => f.id === "light")!.older).toMatch(
      /does not pretend that is fully answered/
    );
    expect(film.deeper?.map(d => d.href)).toContain("/family/catechism#q67");
  });

  it("What happens when we die? agrees with The life to come, keeps its care line word for word, and names both readings only at the older level", () => {
    const film = filmFile("when-we-die");
    const all = words("when-we-die");
    expect(film.care).toBe(filmFile("life-to-come").care);
    const between = film.frames.find(f => f.id === "with-him")!;
    expect(between.older).toMatch(
      /Others hold that the dead sleep until the resurrection/
    );
    expect(between.younger).not.toMatch(/sleep/);
    expect(between.younger).toMatch(
      /do not all describe that time the same way/
    );
    expect(all).not.toMatch(
      /grave|coffin|funeral|buried|suicide|accident|cancer|illness|hell|purgatory|rapture|millenni/i
    );
    expect(film.differ?.text).toMatch(/does not choose between them/);
    expect(film.differ?.links.map(l => l.href)).toContain(
      "/study/bible/doctrines/intermediate"
    );
  });

  it("Why does God seem silent sometimes? quotes Jesus' cry exactly, never blames weak faith, and reuses an existing care line whole", () => {
    const film = filmFile("god-silent");
    const all = words("god-silent");
    expect(all).toContain("My God, My God, why have You forsaken Me?");
    expect(all).toContain("The lament was an act of faith, not its collapse.");
    expect(all).not.toMatch(
      /lack (of )?faith|not enough faith|more faith|weak faith/i
    );
    const returnStop = JSON.parse(
      fs.readFileSync(path.join(PUBLIC, "explorer/stops/return.json"), "utf8")
    );
    expect(film.care).toBe(returnStop.care);
    expect(
      fs.readFileSync(
        path.join(PUBLIC, "wisdom/entry/feeling-far-from-god.json"),
        "utf8"
      )
    ).toContain("The lament was an act of faith, not its collapse.");
  });

  it("Are science and the Bible enemies? takes no side on the age of the earth or evolution and links only live answer pages", () => {
    const film = filmFile("science-and-the-bible");
    const all = words("science-and-the-bible");
    expect(film.frames.find(f => f.id === "differ")!.older).toMatch(
      /This moving picture takes no side\./
    );
    expect(film.differ?.text).toMatch(/does not choose between them/);
    expect(all).not.toMatch(
      /young earth is|old earth is|evolution is (true|false)|global flood|local flood|historical Adam/i
    );
    // Only the answers' own pages, never an essay that is not on the shelf.
    for (const href of [
      ...(film.deeper ?? []).map(d => d.href),
      ...(film.differ?.links ?? []).map(d => d.href),
    ])
      expect(href).not.toMatch(/^\/writing\//);
  });

  it("each has seven frames and a share cut at the younger level", () => {
    for (const slug of [
      "why-cant-i-see-god",
      "when-we-die",
      "god-silent",
      "science-and-the-bible",
    ]) {
      const film = filmFile(slug);
      expect(film.frames.length, slug).toBe(7);
      expect(film.share?.level, slug).toBe("younger");
    }
  });
});

describe("the eight films of 2026-11-22: doctrines, stories and verses, each with a recorded voice", () => {
  const NEW = [
    "why-blood",
    "grace",
    "faith",
    "the-exodus",
    "david-and-goliath",
    "john-3-16",
    "psalm-23",
    "romans-8-28",
  ];
  const AUDIO = JSON.parse(
    fs.readFileSync(path.join(PUBLIC, "explorer/audio/manifest.json"), "utf8")
  ) as {
    films: Record<
      string,
      Record<"younger" | "older", { id: string; seconds: number }[]>
    >;
  };
  const text = (f: Film) => JSON.stringify(f);

  it("each has seven pictures, a drawing, and a narrated length between 1:45 and 3:15 at both levels", () => {
    for (const slug of NEW) {
      const f = filmFile(slug);
      expect(f.frames.length, slug).toBe(7);
      expect(FILM_SCENES[slug], slug).toBeTruthy();
      for (const level of ["younger", "older"] as const) {
        const rows = AUDIO.films[slug][level];
        expect(rows.map(r => r.id)).toEqual(f.frames.map(fr => fr.id));
        // The files, and the breath the player leaves between pictures.
        const seconds =
          rows.reduce((s, r) => s + r.seconds, 0) + 0.7 * (rows.length - 1);
        expect(seconds, `${slug} ${level}`).toBeGreaterThanOrEqual(105);
        expect(seconds, `${slug} ${level}`).toBeLessThanOrEqual(195);
      }
    }
  });

  it("none of them speaks in the first person, presses for a decision, or dates the earth", () => {
    for (const slug of NEW) {
      const f = filmFile(slug);
      const t = text(f);
      // The captions, with what they quote from Scripture set aside.
      const own = f.frames
        .map(fr => `${fr.younger} ${fr.older}`)
        .join(" ")
        .replace(/“[^”]*”/g, " ");
      expect(own, slug).not.toMatch(
        /\b(I|my) (remember|grew|once|was|have)\b|\b(our|my) church\b/
      );
      expect(t, slug).not.toMatch(
        /pray this prayer|decide today|right now, before/i
      );
      expect(t, slug).not.toMatch(
        /years ago|million|billion|young earth|old earth/i
      );
    }
  });

  it("Sacrifice: why blood? draws no blood, sets no Father against the Son, and chooses no theory", () => {
    const f = filmFile("why-blood");
    expect(f.care).toBe(filmFile("the-lamb").care);
    expect(f.frames.map(fr => fr.still).join(" ")).not.toMatch(/blood/i);
    expect(text(f)).toContain(
      "It is not an angry Father against an unwilling Son"
    );
    expect(f.differ?.text).toMatch(/does not choose between them/);
    expect(text(f)).toContain("Sacrifice is his gift, never a bribe");
  });

  it("Grace and Faith say what all Christians confess, name where they differ, and take no side", () => {
    const grace = filmFile("grace");
    expect(grace.differ?.text).toMatch(/takes no side/);
    expect(grace.differ?.links?.[0].href).toBe(
      "/study/bible/doctrines/salvation"
    );
    expect(text(grace)).toContain(
      "Faith is the empty hand that takes what is given"
    );
    expect(text(grace)).toContain("Good works are not the root of salvation");
    const faith = filmFile("faith");
    expect(faith.differ?.text).toMatch(/takes no side/);
    expect(text(faith)).toContain("It is not a leap in the dark");
    expect(text(faith)).toContain(
      "none of them teaches that faith earns salvation"
    );
  });

  it("The Exodus gives no date and no route, grieves Egypt's night, and reuses the stop's care line whole", () => {
    const f = filmFile("the-exodus");
    const stop = JSON.parse(
      fs.readFileSync(path.join(PUBLIC, "explorer/stops/rescue.json"), "utf8")
    );
    expect(f.care).toBe(stop.care);
    const t = text(f);
    expect(t).not.toMatch(/\b1[2-5]\d\d\b|\bBC\b|Red Sea|Sea of Reeds/);
    expect(t).toContain("a night of great sadness in Egypt");
    expect(t).toContain("They do not earn that rescue. They receive it.");
  });

  it("David and Goliath is told as the text tells it: the battle is the LORD's, and we are the soldiers on the hill", () => {
    const f = filmFile("david-and-goliath");
    const t = text(f);
    expect(t).toContain("for the battle is the LORD’s");
    expect(t).toContain("Most readers are not David here");
    expect(t).not.toMatch(/your giants?|giants in your life|face your/i);
    expect(f.frames.map(fr => fr.still).join(" ")).not.toMatch(/blood|head/i);
    // A battle with a death in it: the Land stop's care line, whole.
    const land = JSON.parse(
      fs.readFileSync(path.join(PUBLIC, "explorer/stops/land.json"), "utf8")
    );
    expect(f.care).toBe(land.care);
  });

  it("Psalm 23 quotes the psalm line by line, never draws God, and keeps help in view", () => {
    const f = filmFile("psalm-23");
    expect(
      f.frames.slice(0, 6).every(fr => fr.verse?.ref.startsWith("Psalm 23"))
    ).toBe(true);
    expect(f.frames[6].verse?.ref).toBe("John 10:11");
    expect(f.care).toBe(filmFile("life-to-come").care);
    expect(text(f)).toContain("It promises company in it");
  });

  it("John 3:16 is read in its chapter, says nothing of how any person's story ends, and takes no side", () => {
    const f = filmFile("john-3-16");
    const t = text(f);
    expect(f.frames[3].verse?.ref).toBe("John 3:16");
    expect(t).toContain("God's love is why there is a cross");
    expect(t).toContain("John does not say how Nicodemus answered that night");
    expect(t).not.toMatch(/Nicodemus (was saved|became a Christian|believed)/i);
    expect(f.differ?.text).toMatch(/takes no side/);
    // It tells of Jesus' death and burial: the films' own care line, whole.
    expect(f.care).toBe(filmFile("the-king").care);
  });

  it("Romans 8:28 says what the verse does not promise, leaves room to groan, and keeps help in view", () => {
    const f = filmFile("romans-8-28");
    const t = text(f);
    expect(t).toContain(
      "The verse does not promise that all things are good, only that God is working in all of them."
    );
    expect(t).toContain("The verse is not a way to hurry anyone past grief");
    expect(t).not.toMatch(
      /everything happens for a reason|blessing in disguise|God needed/i
    );
    expect(f.care).toBe(filmFile("why-bad-things-happen").care);
    expect(f.differ?.text).toMatch(/takes no side/);
  });
});
