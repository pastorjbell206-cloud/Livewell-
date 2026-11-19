# wmap: maps that can show more than the land of Jesus' day (2026-11-19)

## What a reader now sees on Genesis's page

`/study/bible/genesis`, "Where it happened". The line above the maps now
reads: "Two maps. The first follows the family from Ur and Haran to Canaan and
down to Egypt. The second shows Canaan close up, where most of the story
happens."

**From Ur to Egypt.** A wide map from the Nile delta to the head of the
Persian Gulf, drawn in the same engraved hand as the Gospel maps: the eastern
Mediterranean coast with Cyprus, the Nile and its two branches, the two arms
of the Red Sea (Suez and Aqaba), the Euphrates and the Tigris meeting near
Qurna and running to the Gulf, and the Jordan and Dead Sea, tiny at this
scale. Five places: Ur, Haran, Paddan-aram, Canaan, and Goshen in Egypt. Ur's
card says it is usually placed at Tell el-Muqayyar and that a northern Ur has
been proposed. The caption: places are set by their modern sites, and the
coasts and rivers as they are now, not as they were then.

**Canaan, close up.** The land from the coast past Gaza to the Negev, with
the whole Dead Sea. Eleven places: Dothan, Shechem, Bethel, Moriah,
Bethlehem, Hebron (Mamre), Beersheba, the plain of the Jordan, Sodom, Peniel
and Gilead. The bdoor run's cards are kept word for word, except three words
("below this map") taken out of the plain of the Jordan's card because they
are no longer true. New short cards for Ur, Haran, Paddan-aram, Canaan,
Goshen, Hebron, Beersheba and Sodom; Sodom's says its site is not known.

Each map has its own list of buttons and its own card; choosing a place on one
does not change the other.

## What the map can now do for other books

A book's data names its map's frame. Three exist:

- **israel**, the old frame, the default. Mark, Matthew, John and Luke use
  it and look exactly as before.
- **canaan**, from Dan's latitude down to Beersheba and the Negev.
- **fertile-crescent**, from Egypt to Mesopotamia.

A book can show one map or several, each with a short title. **Exodus** can
use the wide frame now (Goshen, the Red Sea's arms and Sinai are on it),
though Sinai's mountain and the route are not drawn and would need care,
since both are debated. **Acts** and Paul's journeys need a new frame,
"Mediterranean" (Rome to Jerusalem): its coastline is the main work. The
**Roman world portrait** could use the same new frame.

## What it still cannot do

No routes or arrows (Abraham's road, Paul's voyages). No mountains on the
wider frames. No inset drawn inside another map: Genesis shows two maps one
after the other instead. Coasts and rivers are today's, not the ancient ones
(the Euphrates once ran by Ur). A new frame means drawing its coast in code,
from checked points, as here.

## Sources

Every place and every coast or river point, with what was checked and what is
approximate: `docs/work/elite/wmap-ledger.md`.

## What was run

`pnpm check` passed. ESLint on the changed TypeScript files passed (the
validator script is outside ESLint's scope). `pnpm test`: 146 files passed, 7
skipped; 1,674 tests passed. Every one of the 36 content-gate commands in
ci.yml exited 0, `validate-design` included (no new hex). `pnpm build`,
`pnpm run sitemap`, `pnpm run prerender` (3,028 pages) and
`pnpm run audit:canonicals` exited 0.

The Gospel maps were shown to be unchanged two ways. Their rendered markup,
saved before the change and after it, is byte for byte the same apart from
one new attribute naming the frame. Their pictures, taken with Playwright at
1440 and 390, day and night, match the bdoor run's earlier pictures pixel for
pixel (at 390 below the sticky header, which covers the top of both).

On the served build (port 4611), Genesis at 390 and 1440, day and night: no
name over another name, over a mark, or outside its drawing; every place
button 44px tall; no sideways scroll; no page errors; the space held for the
maps matches what loads (1270px wide screens, 2200px phones, within 1px).
Lighthouse: Genesis performance 76, accessibility 100, CLS 0.000; Mark
performance 76, accessibility 100, CLS 0.000. Pictures:
`/home/user/elite-shots/wmap/`.

## Not verified, or left as found

The approximate points named in the ledger. Bab edh-Dhra's exact position.
The Gospel maps' own small overlaps (JUDEA under Bethlehem or Bethany at some
widths, Bethany's name near the Jordan mark on Matthew's) were there before
and are left alone, since those maps were to stay as they were. The Gospel
pages' held space is a little shorter than their maps on phones (also as
before).

## What waits for you

Whether the next map is Exodus (route of the Exodus is contested) or Paul's
journeys for Acts.
