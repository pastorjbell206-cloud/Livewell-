/**
 * The address fragment a carry link puts a reader's data in (lib/carry.ts).
 * Kept apart and tiny because the app's entry imports it: the page counters
 * (Vercel Analytics and Speed Insights) pass every address they send through
 * withoutCarry, so a carry link's data never leaves the reader's device.
 */
export const CARRY_HASH = "#carry=";

export function withoutCarry<T extends { url: string }>(event: T): T {
  const at = event.url.indexOf(CARRY_HASH);
  return at < 0 ? event : { ...event, url: event.url.slice(0, at) };
}
