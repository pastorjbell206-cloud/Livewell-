#!/usr/bin/env node
/**
 * validate-academy.mjs — the Academy's programs hold their shape (CI gate).
 *
 *   node scripts/validate-academy.mjs
 *
 * client/public/academy/programs.json lists the Academy's programs, each a few
 * tracks in order (lib/academy.ts reads it; /academy and /academy/<slug> show
 * it). The gate holds that:
 *
 * - every program has a slug, a title, a reader line, an outcome, a plate the
 *   art kit draws, and two to five tracks;
 * - every track it names is written (client/public/tracks/<slug>.json) and is
 *   in no other program, and every written track is in a program;
 * - the menu names every program, by the program's own title
 *   (ACADEMY_PROGRAMS in client/src/components/nav/menu.ts);
 * - the words keep the voice rules: no forbidden language, no em-dash, no
 *   exclamation point.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { forbiddenRe, setAsideAllowed } from "./lib/forbidden-language.mjs";
import { trackFiles } from "./lib/tracks.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const read = p => readFileSync(join(ROOT, p), "utf8");

export function validateAcademy() {
  const errors = [];
  const fail = (w, m) => errors.push(`${w}: ${m}`);
  let data;
  try {
    data = JSON.parse(read("client/public/academy/programs.json"));
  } catch (e) {
    return [`programs.json: ${e.message}`];
  }
  const plates = new Set(
    [
      ...read("client/src/components/art/Plate.tsx").matchAll(
        /\|\s*"([a-z]+)"/g
      ),
    ].map(m => m[1])
  );
  const written = new Set(trackFiles().map(f => f.replace(/\.json$/, "")));
  const menu = read("client/src/components/nav/menu.ts");
  const seen = new Map();

  const words = (w, text) => {
    if (typeof text !== "string" || !text.trim()) return fail(w, "missing");
    const hit = [...setAsideAllowed(text).matchAll(forbiddenRe)][0];
    if (hit) fail(w, `forbidden language "${hit[1]}"`);
    if (/[—―]/.test(text)) fail(w, "em-dash");
    if (text.includes("!")) fail(w, "exclamation point");
  };

  words("about", data.about);
  if (!Array.isArray(data.programs) || data.programs.length < 1)
    return [...errors, "programs: none"];
  const slugs = new Set();
  data.programs.forEach((p, i) => {
    const w = `programs[${i}]${p?.slug ? ` (${p.slug})` : ""}`;
    if (!p || typeof p !== "object") return fail(w, "missing");
    if (!/^[a-z0-9-]+$/.test(p.slug ?? ""))
      fail(w, "slug: lowercase letters, digits and hyphens");
    if (slugs.has(p.slug)) fail(w, "slug used twice");
    slugs.add(p.slug);
    if (["learned", "certificate"].includes(p.slug))
      fail(w, "slug is one of the Academy's own pages");
    words(`${w}.title`, p.title);
    words(`${w}.reader`, p.reader);
    words(`${w}.outcome`, p.outcome);
    if (typeof p.reader === "string" && p.reader.length > 70)
      fail(`${w}.reader`, "keep it to a line (70 characters)");
    if (!plates.has(p.plate))
      fail(`${w}.plate`, `"${p.plate}" is not a plate the art kit draws`);
    if (p.beside !== undefined && typeof p.beside !== "boolean")
      fail(`${w}.beside`, "true or left out");
    if (!Array.isArray(p.tracks) || p.tracks.length < 2 || p.tracks.length > 5)
      fail(`${w}.tracks`, "two to five tracks");
    else
      for (const t of p.tracks) {
        if (!written.has(t))
          fail(
            `${w}.tracks`,
            `"${t}" is not a written track (client/public/tracks/${t}.json)`
          );
        if (seen.has(t))
          fail(`${w}.tracks`, `"${t}" is already in ${seen.get(t)}`);
        seen.set(t, p.slug);
      }
    const named = menu.match(new RegExp(`slug: "${p.slug}", title: "([^"]+)"`));
    if (!named) fail(w, "is not in the menu's ACADEMY_PROGRAMS");
    else if (named[1] !== p.title) fail(w, `the menu calls it "${named[1]}"`);
  });
  for (const t of written)
    if (!seen.has(t))
      fail(`tracks/${t}.json`, "is in no program of the Academy");
  return errors;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const errors = validateAcademy();
  if (errors.length) {
    console.error(`\n[academy] ${errors.length} problem(s)\n`);
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log("[academy] clean.");
}
