/**
 * forbidden-language.mjs — CLAUDE.md's Forbidden Language list, literally, as
 * the Grow and essay gates read it (validate-grow-voice.mjs,
 * validate-essays.mjs). One list, so the two gates cannot drift apart.
 *
 * Moved here unchanged from validate-grow-voice.mjs. The older single-library
 * validators keep their own copies; fold them in here when one is next edited.
 */

export const FORBIDDEN = [
  "delve", "delves", "delving", "leverage", "leverages", "leveraging", "unlock", "unlocks", "unlocking",
  "transformative", "navigate", "navigates", "navigating", "tapestry", "foster", "fosters", "fostering", "fostered",
  "unpack", "unpacks", "unpacking", "landscape", "landscapes", "nuanced", "multifaceted", "authentic", "authenticity",
  "holistic", "journey", "journeys", "in today's world", "now more than ever", "here's the thing",
  "i want to be real with you", "god's got this", "gospel-centered", "authentic community", "hold space",
  "your truth", "do the work", "your feelings are valid", "lean into", "leaning into", "showing up",
];

/** Every Forbidden Language hit; use with matchAll (it carries the g flag). */
export const forbiddenRe = new RegExp(`\\b(${FORBIDDEN.map((w) => w.replace(/'/g, "['’]")).join("|")})\\b`, "gi");

// Ordinary senses the list does not mean: foster care; Richard Foster (a
// name, capitalized); book titles and named concepts; the literal road; the
// long-established name for Paul's trips, given once as a plain gloss on the
// Bible Explorer's map of them (validate-explorer.mjs holds it to once).
export const ALLOWED = [
  /\bfoster (care|parent|parents|parenting|child|children|home|homes|family|families|system|kids?)\b/gi,
  /\bFoster\b/g,
  /\bage of authenticity\b/gi,
  /\bThe Ethics of Authenticity\b/g,
  /\bUnpacking Forgiveness\b/g,
  /\bUnlocking the Stress Cycle\b/g,
  /\bjourney to Jerusalem\b/gi,
  /\boften called his missionary journeys\b/g,
];

/** The text with each allowed sense blanked out, character for character. */
export function setAsideAllowed(text) {
  let out = text;
  for (const re of ALLOWED) out = out.replace(re, (m) => " ".repeat(m.length));
  return out;
}
