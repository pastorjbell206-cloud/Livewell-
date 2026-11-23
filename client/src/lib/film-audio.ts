/**
 * The moving pictures' recorded voice: one small MP3 for each frame of each
 * film at each reading level, made by hand with scripts/build-film-audio.mjs
 * and kept under /explorer/audio/. It is a stock synthetic voice, not a
 * recording of any person, and the player says so under Listen.
 *
 * A file is asked for only once the reader has turned Listen on and reached
 * its frame; nothing is preloaded with the page. Where a file cannot be
 * played, the player falls back to the device's own voice (lib/film-voice.ts).
 */
import type { Level } from "@/lib/explorer";

/** The address of one frame's file (the frame's place in the film, from 01, and its id). */
export const filmAudioUrl = (
  slug: string,
  level: Level,
  index: number,
  id: string
) =>
  `/explorer/audio/${slug}/${level}/${String(index + 1).padStart(2, "0")}-${id}.mp3`;

/** Can this browser play the files at all? (jsdom, and a few old browsers, cannot.) */
export function canPlayFiles(): boolean {
  try {
    if (typeof window === "undefined" || typeof window.Audio !== "function")
      return false;
    const a = new window.Audio();
    return (
      typeof a.canPlayType === "function" && a.canPlayType("audio/mpeg") !== ""
    );
  } catch {
    return false;
  }
}
