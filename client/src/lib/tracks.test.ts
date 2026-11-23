/**
 * Tracks: this device's memory of a track, and the way back from a page a
 * session sent the reader to (lib/tracks.ts, lib/trackReturn.ts).
 *
 * - Progress: a session opened begins the track; done and not done; the
 *   reader's answer and tick are kept; "Continue" is the first session not
 *   done; a finished track is not offered; corrupt storage is skipped; a
 *   refused write is reported.
 * - The way back: set as the reader leaves, read on the next page, offered
 *   everywhere but the tracks' own pages, cleared when hidden.
 * - The data: the road on /start names a track that exists, with its true
 *   number of sessions, and every kind a track uses has a reader's name.
 */
import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ROADS } from "./startRoads";
import {
  KIND_LABEL,
  NO_TRACKS,
  RETURN_EVENT,
  RETURN_KEY,
  TRACKS_KEY,
  clearReturn,
  nextSession,
  offersReturn,
  readReturn,
  readTracks,
  returnLabel,
  saveTracks,
  setReturn,
  trackToContinue,
  withDone,
  withNotes,
  withStarted,
  withoutTrack,
  type TrackIndex,
} from "./tracks";
import { collectProgress, continueHere } from "./myProgress";

const PUBLIC = path.resolve(__dirname, "../../public");
const INDEX: TrackIndex = JSON.parse(fs.readFileSync(path.join(PUBLIC, "tracks/index.json"), "utf8"));
const T = { slug: "new-to-this", title: "New to faith, or coming back", total: 12 };

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
afterEach(() => vi.restoreAllMocks());

describe("a track's progress on this device", () => {
  it("begins when a session is opened, and continues at session 1", () => {
    const p = withStarted(NO_TRACKS, T);
    expect(saveTracks(p)).toBe(true);
    expect(readTracks().tracks[T.slug]).toMatchObject({ title: T.title, total: 12, done: [], notes: {} });
    expect(trackToContinue()).toMatchObject({ slug: T.slug, n: 1, total: 12, href: "/tracks/new-to-this/1" });
    // Opening a second session does not start the track again.
    expect(withStarted(p, T)).toBe(p);
  });

  it("marks sessions done and not done, and continues at the first not done", () => {
    let p = withDone(withDone(withDone(NO_TRACKS, T, 1), T, 2), T, 4);
    expect(p.tracks[T.slug].done).toEqual([1, 2, 4]);
    expect(nextSession(p.tracks[T.slug])).toBe(3);
    p = withDone(p, T, 2, false);
    expect(p.tracks[T.slug].done).toEqual([1, 4]);
    expect(nextSession(p.tracks[T.slug])).toBe(2);
    saveTracks(p);
    expect(trackToContinue()?.href).toBe("/tracks/new-to-this/2");
  });

  it("keeps the reader's answer and tick for a session, through a reload", () => {
    let p = withNotes(NO_TRACKS, T, 3, { answer: "When I am tired." });
    p = withNotes(p, T, 3, { did: true });
    saveTracks(p);
    expect(readTracks().tracks[T.slug].notes["3"]).toEqual({ answer: "When I am tired.", did: true });
    expect(JSON.parse(localStorage.getItem(TRACKS_KEY)!).v).toBe(1);
  });

  it("does not offer a finished track, and forgets one on Start over", () => {
    let p = NO_TRACKS;
    for (let n = 1; n <= 12; n++) p = withDone(p, T, n);
    expect(nextSession(p.tracks[T.slug])).toBeNull();
    expect(trackToContinue(p)).toBeNull();
    expect(withoutTrack(p, T.slug).tracks).toEqual({});
  });

  it("offers the track worked on most recently", () => {
    const p = {
      v: 1 as const,
      tracks: {
        older: { title: "Older", total: 4, done: [1], notes: {}, at: "2026-11-01T10:00:00.000Z" },
        newer: { title: "Newer", total: 6, done: [1, 2], notes: {}, at: "2026-11-20T10:00:00.000Z" },
      },
    };
    expect(trackToContinue(p)).toMatchObject({ slug: "newer", n: 3, total: 6 });
  });

  it("skips corrupt or unfamiliar storage", () => {
    localStorage.setItem(TRACKS_KEY, "{oops");
    expect(readTracks()).toEqual(NO_TRACKS);
    localStorage.setItem(TRACKS_KEY, JSON.stringify({ v: 1, tracks: { x: { title: 5 } } }));
    expect(readTracks()).toEqual(NO_TRACKS);
    localStorage.setItem(TRACKS_KEY, JSON.stringify({ v: 2, tracks: {} }));
    expect(readTracks()).toEqual(NO_TRACKS);
    expect(trackToContinue()).toBeNull();
  });

  it("says so when the browser refuses the write", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(saveTracks(withDone(NO_TRACKS, T, 1))).toBe(false);
  });

  it("shows on My Library, and as Home's one thing to continue", () => {
    saveTracks(withDone(withDone(NO_TRACKS, T, 1), T, 2));
    expect(collectProgress()).toEqual([expect.objectContaining({ href: "/tracks/new-to-this/3", title: T.title, kind: "Track", detail: "Session 3 of 12 is next" })]);
    expect(continueHere()).toMatchObject({ href: "/tracks/new-to-this/3", label: "your track at session 3 of 12" });
  });
});

describe("the way back to a session", () => {
  it("is set as the reader leaves and read on the page they land on", () => {
    const heard = vi.fn();
    window.addEventListener(RETURN_EVENT, heard);
    expect(readReturn()).toBeNull();
    expect(setReturn({ slug: T.slug, n: 3, total: 12, to: "/study/bible/ephesians/2#plain" })).toBe(true);
    expect(heard).toHaveBeenCalledTimes(1);
    expect(readReturn()).toEqual({ slug: T.slug, n: 3, total: 12, to: "/study/bible/ephesians/2#plain" });
    expect(returnLabel(readReturn()!)).toBe("Back to session 3 of 12");
    // Kept for the sitting only.
    expect(sessionStorage.getItem(RETURN_KEY)).toContain("new-to-this");
    expect(localStorage.getItem(RETURN_KEY)).toBeNull();
    clearReturn();
    expect(readReturn()).toBeNull();
    expect(heard).toHaveBeenCalledTimes(2);
    window.removeEventListener(RETURN_EVENT, heard);
  });

  it("is offered on every page but the tracks' own and the admin", () => {
    for (const p of ["/", "/study/bible/mark/1", "/tools/wisdom-finder", "/answers/what-if-christianity-is-wrong", "/trackside"]) expect(offersReturn(p), p).toBe(true);
    for (const p of ["/tracks", "/tracks/new-to-this", "/tracks/new-to-this/3", "/admin", "/admin/posts"]) expect(offersReturn(p), p).toBe(false);
  });

  it("ignores a note it cannot trust", () => {
    sessionStorage.setItem(RETURN_KEY, JSON.stringify({ slug: "../x", n: 1, total: 2, to: "/" }));
    expect(readReturn()).toBeNull();
    sessionStorage.setItem(RETURN_KEY, "nope");
    expect(readReturn()).toBeNull();
  });
});

describe("the tracks' data", () => {
  it("lists each track with its sessions numbered from 1", () => {
    expect(INDEX.tracks.length).toBeGreaterThanOrEqual(1);
    for (const t of INDEX.tracks) {
      expect(t.sessions.map((s) => s.n)).toEqual(t.sessions.map((_, i) => i + 1));
      const file = JSON.parse(fs.readFileSync(path.join(PUBLIC, `tracks/${t.slug}.json`), "utf8"));
      expect(file.sessions.length).toBe(t.sessions.length);
    }
  });

  it("holds the road on /start to the track it names", () => {
    const withTrack = ROADS.filter((r) => r.track);
    // A book studied chapter by chapter ("Deep in one") grows from no road.
    expect(withTrack.map((r) => r.id)).toEqual(INDEX.tracks.filter((t) => t.road).map((t) => t.road));
    for (const r of withTrack) {
      const t = INDEX.tracks.find((x) => x.slug === r.track!.slug);
      expect(t, r.id).toBeDefined();
      expect(t!.road).toBe(r.id);
      expect(t!.for).toBe(r.chip);
      expect(r.track!.sessions).toBe(t!.sessions.length);
    }
  });

  it("keeps every step of a road inside the track it has become", () => {
    const withTrack = ROADS.filter((r) => r.track);
    expect(withTrack.map((r) => r.id)).toEqual(expect.arrayContaining(["new", "skeptical", "stepped-back", "deeper"]));
    for (const road of withTrack) {
      const file = JSON.parse(fs.readFileSync(path.join(PUBLIC, `tracks/${road.track!.slug}.json`), "utf8"));
      const linked = new Set(file.sessions.flatMap((s: { open: { href: string }; also?: { href: string }[] }) => [s.open.href, ...(s.also ?? []).map((l) => l.href)]));
      for (const step of road.steps) expect(linked.has(step.href), `${road.id}: ${step.href}`).toBe(true);
    }
  });

  it("says which tracks have a leader's guide, as their files do", () => {
    for (const t of INDEX.tracks) {
      const file = JSON.parse(fs.readFileSync(path.join(PUBLIC, `tracks/${t.slug}.json`), "utf8"));
      expect(t.leader, t.slug).toBe(!!file.leader);
    }
    // Every track has one (James, 2026-11-23: "each with a group leader's guide").
    expect(INDEX.tracks.filter((t) => !t.leader).map((t) => t.slug)).toEqual([]);
  });

  it("has a reader's name for every kind of page a track opens, and uses eight or more", () => {
    for (const t of INDEX.tracks) {
      for (const k of t.kinds) expect(KIND_LABEL[k], k).toBeTruthy();
      expect(t.kinds.length).toBeGreaterThanOrEqual(8);
    }
  });
});
