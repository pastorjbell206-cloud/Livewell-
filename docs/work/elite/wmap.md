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

# wmap, second run: Paul's travels for Acts (2026-11-19)

## What a reader now sees on Acts's page

`/study/bible/acts`, "Where it happened". The line above the maps reads: "Two
maps. The first shows the land of Acts 1 to 12, from Jerusalem to Damascus;
Gaza (8:26) lies just south of its edge. The second follows Paul's travels
from Antioch through Asia Minor, Macedonia and Greece, and by sea to Rome."
The sentence about a wider map still to come is gone.

**Jerusalem to Damascus, Acts 1 to 12.** The old map, its nine places and
their cards unchanged, now with a title.

**Paul's travels and the road to Rome.** A new frame, "mediterranean"
(11.5 to 37.6 E, 30.6 to 42.3 N): Italy with Sicily and Malta, the southern
Adriatic, Greece and the Peloponnese, Crete, the Aegean with Euboea, Lesbos,
Chios, Samos and Rhodes as paper shapes, Asia Minor, the Sea of Marmara and
the Black Sea's south shore, Cyprus, the Levant, the Nile delta and the coast
of Libya past Cyrene. Region names: THE GREAT SEA, ITALY, MACEDONIA, ACHAIA,
ASIA, GALATIA (one name; no side taken on north or south Galatia), SYRIA
(set upright, since the land east of the coast is too narrow) and JUDEA. No
modern borders or country names. The caption: places are set by their modern
sites, and the coasts as they are now, not as they were then.

Twenty-four places, each a 44px button with a card: Antioch in Syria, Tarsus,
Salamis, Paphos, Perga, Pisidian Antioch, Iconium, Lystra, Derbe, Troas,
Philippi, Thessalonica, Berea, Athens, Corinth, Ephesus, Miletus, Caesarea,
Jerusalem, Crete (Fair Havens), Malta, Syracuse, Puteoli and Rome. Every one
has a mark on the drawing; six are left unnamed there because the towns sit
too close at this scale (Pisidian Antioch, Iconium, Lystra and Derbe in
Galatia, Berea beside Thessalonica, Miletus beside Ephesus). Their buttons and
cards are all there, and a tapped mark shows filled. Derbe's card says its
site is not certain (Kerti Höyük, drawn; Devri Şehri, also proposed). Malta's
says where the ship struck is not known for sure and that St Paul's Bay is
where tradition places it.

No route lines are drawn. At 390 wide the Aegean is crowded with names already,
and a line for each of three trips plus the voyage would cross the names; the
cards tell the order instead.

## What changed in the code

`MAP_FRAMES` gains `mediterranean` (lib/bible-notes.ts and the validator,
held equal by teaching.test.tsx). A place's `label` may now be `false` (no
name on the drawing) or carry a shorter `text` ("Antioch", "Fair Havens"); the
validator accepts both. A frame may ask for smaller marks (`mark: 3` here; the
default 5 keeps every other map's marks as they were). bible.css holds the
two maps' height (`data-frames="israel mediterranean"`: 1720px wide screens,
2562px phones) and sizes the wide map like the Genesis one, with a paper halo
under its region names.

## What was run

`pnpm check` passed. ESLint on BookMap.tsx, bible-notes.ts and
teaching.test.tsx passed. `pnpm test`: 146 files passed, 7 skipped; 1,679
tests passed. All 36 content-gate commands in ci.yml exited 0. `pnpm build`,
`pnpm run sitemap`, `pnpm run prerender` (3,028 pages) and
`pnpm run audit:canonicals` exited 0.

The six existing maps are unchanged. Their rendered markup (Mark, Matthew,
John, Luke and both Genesis maps), saved before any code changed and again at
the end, is byte for byte the same: no attribute changed. Their screenshots on
the served build match the earlier run's pixel for pixel, except in the strip
under the sticky site header, which covers the top of the map in both runs.

On the served build (port 4611), Acts at 390 and 1440, day and night: no name
over another name or a mark, or outside its drawing, on either map; every
place button 44px tall; no sideways scroll; no console errors; the held space
matches what loads (2562px phone, 1720px wide). Lighthouse (ci.yml's chapter
command, three runs, median): Acts performance 81, accessibility 100, CLS
0.000; Genesis performance 77, accessibility 100, CLS 0.000. Pictures:
`/home/user/elite-shots/wmap/acts-*`.

## Not verified, or left as found

The approximate coast points named in the ledger. At 390 the wide map is small
(about 346px across), so its names are about 11px; they are legible but not
roomy. The held height is exact at 390 and 1440; other phone widths will
differ a little, as with Genesis.

## What waits

Route lines for the three trips and the voyage to Rome, perhaps one at a time
behind a choice, so they never cross the names. Whether to label the Galatian
towns on a close-up inset.
