/**
 * family-devotion-file.mjs: reading a client/public/family-devotions*.json file.
 *
 * The Foundations files (family-devotions.json, family-devotions-2.json) are a
 * plain list of devotions. A strand file beside them
 * (family-devotions-world.json, MASTER-PLAN 5.4) carries one flag over the
 * same list:
 *
 *   { "about": "...", "live": false, "devotions": [ ...the weekly shape... ] }
 *
 * While live is false the site shows none of its devotions: the family index
 * gives them no row (so no page, no prerendered head, no sitemap entry, no
 * place in the library), the year map does not pin them, and their ids are
 * not frozen. The family gate and the politics gate still check every one, so
 * a hidden devotion is ready the day it goes live. Publishing is four steps:
 *
 *   1. set "live": true in the strand file
 *   2. node scripts/validate-family.mjs --freeze   (records the new ids; a printed card's QR code cannot be recalled)
 *   3. node scripts/build-family-index.mjs         (rows, pages, sitemap, library)
 *   4. node scripts/build-family-year.mjs          (any week pinned to them in family-year-overrides.json)
 *
 * and committing what they write. CI fails until steps 2 to 4 are done, and
 * passes once they are: no test or other file needs an edit (the tests run the
 * hidden and live cases on copies, whichever way the flag is committed). On
 * the year map, going live changes only the weeks pinned to the strand's
 * devotions; every other week keeps its devotion.
 */

/**
 * The devotions in a family-devotions*.json file and whether the site shows
 * them. `shape` is null when the file is neither a list nor a strand.
 */
export function devotionsIn(data) {
  if (Array.isArray(data)) return { shape: "list", live: true, devotions: data };
  if (data && typeof data === "object" && Array.isArray(data.devotions)) {
    return { shape: "strand", live: data.live === true, devotions: data.devotions };
  }
  return { shape: null, live: false, devotions: [] };
}
