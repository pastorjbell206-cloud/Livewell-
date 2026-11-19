# What it was like: the Old Testament's world

For James. The second world portrait, built on the pattern you read and
approved on 2026-11-18 ("publish it all"), as data only.

## What a visitor sees, and where

- On **/resources/context** ("Choose a world"), the Old Testament's world card
  (the jar plate) now opens the portrait and reads "What it was like · 5
  guides", and under that world's list of guides the line "What it was like:
  the full portrait of this world" appears. No page code changed for this: the
  card and the line read the worlds index, as the pilot's do.
- At the top of each of the five Ancient Near East guides (Genesis 1 in its
  world, the gods of the nations, covenant and treaty, Torah and the law codes,
  wisdom and the nations) the link "What it was like: The Old Testament's
  world, the full portrait" appears.
- The portrait is at **/resources/context/world/old-testament-world**, in the
  same page as the pilot: the jar plate, a contents list of seven parts, each
  part with its icon, its reading and "How it changes what you read" (three
  passages quoted from the Berean Standard Bible, each linking to its verse in
  the Study Bible, with a short note), then the five guides and "Sources and
  further reading". It is prerendered with its full text, in the sitemap, the
  site search (with Old Testament search words) and llms.txt.

## Word count

6,992 words of portrait (the opening and the seven parts), plus 1,061 words of
notes under the 21 passages, plus 1,057 words of quoted Scripture.

## The parts

1. A land between empires
2. A village in the hill country
3. Kings, cities and the Temple
4. The gods next door
5. Covenant, law and treaty
6. Scribes, seals and prophets
7. Exile and return

## Ten things in it most readers won't know

1. The first time anyone outside the Bible wrote the name Israel was on an
   Egyptian victory monument of about 1208 BC: "Israel is laid waste; his seed
   is not" (the Merneptah Stele, found by Flinders Petrie in 1896).
2. The hill-country villages of early Israel left almost no pig bones, while
   the Philistine towns on the coast left plenty (Finkelstein; Sapir-Hen and
   others; Hesse and Wapnish for the caution).
3. "Pim" in 1 Samuel 13:21 meant nothing to translators until small stone
   weights inscribed with the word turned up, the first at Gezer. It is about
   two thirds of a shekel, so the verse is a price list.
4. The king of Moab's own stone (the Mesha Stele, found 1868) names "Omri king
   of Israel" and says he carried off the vessels of Yahweh, the oldest mention
   of Yahweh as Israel's God outside the Bible. 2 Kings 3 tells the same quarrel
   from Israel's side.
5. The two altars of the Judahite shrine at Arad carried frankincense on one
   and burned cannabis on the other (Arie, Rosen and Namdar, Tel Aviv, 2020).
6. A clay seal impression reading "Belonging to Hezekiah [son of] Ahaz king of
   Judah" was found in 2015 just south of the Temple Mount (Eilat Mazar).
7. Jerusalem's Broad Wall, about seven meters wide, was built over houses that
   had just been put up (Avigad), which is what Isaiah 22:10 describes.
8. Hammurabi's law paid a slave's owner for the slave's lost eye (law 199);
   Exodus 21:26-27 sets the slave free.
9. The oldest known copies of words in the Bible are the priestly blessing of
   Numbers 6 on two tiny silver scrolls worn as amulets and buried in a tomb
   outside Jerusalem before 586 BC (Ketef Hinnom, Gabriel Barkay, 1979).
10. Babylon's own ration lists name "Yaukin, king of Judah" and his five sons
    (published by Ernst Weidner, 1939), and the Al-Yahudu tablets show Judean
    exiles farming barley and dates, paying tax and naming their children for
    the LORD from about 572 BC on (Pearce and Wunsch, 2014).

Every claim, its source and how it was checked is in
`docs/work/elite/wot-ledger.md` (51 web searches, the site's five Ancient Near
East guides, and the Study Bible's BSB text).

## What was cut or softened because it could not be verified

- A village size of 50 to 100 people (not found); the portrait gives
  Finkelstein and Silberman's own figures instead.
- The silver figure on Sennacherib's prism (only the biblical figures are
  given) and a bronze-sky parallel between Deuteronomy 28:23 and Esarhaddon's
  treaty (only Steymans's broader argument is given, marked as contested).
- A list of ivory motifs at Samaria, carved lions at Ain Dara, a standing stone
  at Arad, the room where the Lachish letters lay, and "in Nebuchadnezzar's
  seventh year" in the Babylonian Chronicle.
- The Lachish ramp is "often called" the only Assyrian siege ramp excavated,
  not stated as certain.

## Still unverified

The Dead Sea as the lowest place on earth, the name Yehud, and "no coins for
most of this history" (standard, not searched); two of the Gezer calendar's
months as named; Meyers's own page for the grinding estimate; the Louvre as the
home of the Mesha Stele and Hammurabi's stone.

## Code changes (smallest that would do)

- `scripts/validate-worlds.mjs` now checks passages from any book of the Bible
  (it accepted only the Gospels and Acts). A world file may hold no em-dash at
  all, even inside quoted Scripture (`validate-no-emdash.mjs`), so three
  passages whose BSB text has one were swapped for others.
- `scripts/build-search-index.mjs` gives each world search words by its group
  (the pilot's words were about Jesus's world and were shared by every world).
- `client/public/llms.txt`: one entry. `ContextWorld.tsx`: one comment word.

## What was run, and what passed (2026-11-19)

- `node scripts/validate-worlds.mjs`: 2 portraits hold their shape.
- Every one of the 36 commands in the CI content-gates step: all passed (after
  the em-dash swap above).
- `pnpm check`: passed. `pnpm test`: 146 files passed, 7 skipped; 1,651 tests
  passed, 73 skipped. ESLint on the changed page file: clean (the two scripts
  are outside ESLint's scope).
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,026 pages; the
  portrait's full text is in its prerendered HTML with its own title and
  canonical), `pnpm run audit:canonicals` (0 failures): all passed.
- Looked at the portrait at 390x844 and 1440x900, day and night, plus the
  library cards and a guide's link: no sideways scroll at either width.
  Screenshots: `/home/user/elite-shots/wot/`.
- Lighthouse (median of three, local server): performance 93, accessibility
  100, CLS 0.000.

## What only James can supply

- Whether this world should carry any line of his own at the top.
- Which world comes next (the Roman world is the other ancient one).
