# What it was like: Jewish life in Jesus's day (the worlds pilot)

For James. This is the first of the seven worlds on "The world the Bible was
written in", built so you can read one before the other six are written.

## What a visitor sees, and where

- On **/resources/context** ("Choose a world"), the card for the Second Temple
  world now opens the portrait and reads "What it was like". The other six cards
  work as before. Under that world's list of guides there is a line, "What it
  was like: the full portrait of this world".
- At the top of each of that world's five guides (the Pharisees, the Messiah,
  Temple and synagogue, the Septuagint, between the Testaments) a link reads
  "What it was like: Jewish life in Jesus's day, the full portrait".
- The portrait itself is at
  **/resources/context/world/jewish-life-in-jesus-day**. It opens with the
  page top and one engraved plate (the lantern), then a short "Before you
  start" beside a contents list of the seven parts (on a phone the contents
  come first). Each part has its own icon, a one-line summary, the reading,
  and then "How it changes what you read": three Gospel passages quoted from
  the Berean Standard Bible, each linking to its verse in the Study Bible, with
  a short note. After each part a "Next" link goes on to the following part,
  and a slim bar that follows the reader names the part they are in and
  leads back to the contents. After the seven parts come "Go deeper: the
  guides to this world" (the five guides) and, last, "Sources and further
  reading".
- The page is prerendered with its full text, listed in the sitemap, the site
  search and llms.txt, and held by the route tests.

## Word count

6,493 words of portrait (the opening and the seven parts), plus 1,062 words of
notes under the 21 passages, plus 902 words of quoted Scripture. About 7,500
words of our own writing in all.

## The parts

1. The land and who ruled it
2. A day and a year
3. The Temple
4. Synagogue, Scripture and school
5. Pharisees, Sadducees, Essenes and the rest
6. What people believed and hoped for
7. Family, honor, sickness and death

## Ten things in it most readers won't know

1. A traveler in a hurry could walk from Galilee to Jerusalem in three days by
   going through Samaria (Josephus, Life 269).
2. Herod Antipas, the "fox" of Luke 13, drew two hundred talents a year from
   Galilee and Perea (Josephus, Antiquities 17.318), and it was Pharisees who
   warned Jesus that he wanted him dead.
3. The coin for the Temple tax was the silver shekel of Tyre, stamped with a
   pagan god, Melqart, and an eagle. It was used because its silver was purer
   than Roman coin. That is the coin in the fish's mouth in Matthew 17.
4. After AD 70 Rome made every Jew pay the same two drachmas to the temple of
   Jupiter in Rome (Josephus, Jewish War 7.218).
5. Josephus says the priests once counted 256,500 Passover lambs (Jewish War
   6.424). Historians think his crowd figures far too high; Joachim Jeremias
   put the visitors nearer 125,000.
6. A rule among the Dead Sea Scrolls forbids lifting an animal out of a pit on
   the Sabbath (Damascus Document 11.13-14). Jesus in Matthew 12:11 assumes his
   hearers would lift it out. He argues inside Judaism, not against it.
7. Ben Sira, about two centuries before Jesus, wrote that "the wisdom of the
   scribe depends on the opportunity of leisure" (Sirach 38:24). Few could read;
   one estimate (Meir Bar-Ilan) is about three percent.
8. The one stone of the Temple platform you can see in the Western Wall tunnel
   is about 13.6 meters long and weighs, on the newer estimate, 250 to 300 tons.
9. Josephus wrote that a man could divorce his wife "for any cause whatsoever"
   (Antiquities 4.253, Whiston), almost the very question put to Jesus in
   Matthew 19:3.
10. Of more than 900 tombs of the period around Jerusalem, the archaeologist
    Amos Kloner found only four closed by a round rolling stone, all belonging
    to the very rich (Biblical Archaeology Review, 1999).

Every claim, its source and how it was checked is in
`docs/work/elite/worlds-ledger.md`.

## What was left out or softened because it could not be verified

- Nazareth's size is given as "a few hundred, often given as 200 to 500," and
  called a careful guess. The search could not confirm the range was Jonathan
  Reed's own, so his name was taken off that sentence.
- The year of the Reina stone-cup workshop: the reports date from 2017, so the
  page says "announced in 2017" instead of a dig year.
- The Great Isaiah Scroll is dated to "the late second century BC" instead of a
  narrower range.
- Babatha's papers are said to have been hidden "during the revolt that began in
  AD 132," not in that exact year.
- The ledger names every line not checked a second time in the closing run
  (Pliny on the Essenes, several Josephus sections, Tacitus, Philo on the
  Essenes, 4Q521, the Psalms of Solomon, the bread-in-the-diet figure). They
  rest on named, standard sources, but an editor should match them before the
  other six worlds are written.
- Anything from the Mishnah (about AD 200) is marked as later every time it
  appears: the rule on stone vessels, the flute players at a funeral, and the
  schools of Hillel and Shammai.

## How the other six worlds would be done

Each is one JSON file in `client/public/context/worlds/`, then a run of
`scripts/build-context-index.mjs`. The page, the card link, the guide links, the
sitemap, the search, the prerender and the validator pick it up with no code
change. `scripts/validate-worlds.mjs` holds each to the same shape and checks
every quoted verse against the Study Bible's text.

- **The Old Testament's world (Ancient Near East).** Parts: the land between
  empires; a village in the hill country; kings, prophets and the temple;
  the gods next door (Baal, Asherah, Molech); covenant, law and treaty; exile
  and return. Evidence: the Mesha stele, Tel Dan, Lachish letters, the Assyrian
  annals, Elephantine.
- **The Roman world.** Parts: the empire and its roads; a city and an insula;
  slaves, patrons and freedmen; the gods, the emperor and the household shrine;
  the meal and the club; travel and letters, which is how Paul's world worked.
- **Honor and shame.** Parts: what honor was and how you lost it; the
  household and the village; hospitality and the guest; patrons and gifts;
  purity and the body; reading the parables with this in view.
- **The verses everyone quotes, the hard questions, reading past our politics.**
  These are not ancient worlds, so "expansive" should not mean a day in a
  village. It should mean the world each famous verse was first said in and the
  world it is quoted in now: for each verse, who first heard it, what they took
  for granted, and how and when it came loose from its setting. For the hard
  questions, the ancient setting each question was first fought over and the
  church's long argument about it, with the strongest voices on each side. For
  politics, the history of how a passage came to be used by a party, told about
  the right and the left with the same hand.

## What only James can supply

- Whether this length and this shape is what he meant by "expansive", before
  six more are written.
- Whether he wants a line of his own at the top of each world, and if so, the
  words.
- Which world should come next.

## What was run, and what passed (2026-11-18, after merging the latest work branch)

- `pnpm check`: passed (and again after the last two style fixes).
- Every one of the 36 commands in the CI content-gates step, including
  `validate-worlds`, `validate-no-emdash`, `validate-links`,
  `validate-design` and the search-index and passage-index drift checks:
  all passed.
- `pnpm test`: 146 files passed, 7 skipped; 1,651 tests passed, 73 skipped (after the second merge; the gates and `pnpm check` were rerun then too).
  The world page test and the route smoke test passed again after the last
  edits.
- ESLint on every changed source file: clean.
- `pnpm build`, then `pnpm run sitemap`, `pnpm run prerender` (3,025 pages;
  the portrait's full text is in its prerendered HTML) and
  `pnpm run audit:canonicals` (0 failures): all passed.
- Looked at the portrait at 390x844 and 1440x900, day and night, plus the
  library and a guide: no sideways scroll at either width. Two labels ("Before
  you start" and "How it changes what you read") were showing in the display
  face because every heading is forced into it; both now use the interface
  face like the site's other labels. Screenshots: `/home/user/elite-shots/worlds/`.
- Lighthouse (median of three, local server): the portrait scored performance
  92, accessibility 100, CLS 0.000. A guide page (temple-and-synagogue) scored
  performance 80 and the library 90, both accessibility 100, CLS 0.000.

## What was not done

- The ledger lists the lines not checked a second time in the closing run
  (the closing run was held to 25 searches and could not reach Gutenberg or
  attalus.org).
- The PDFs were not changed: the portrait is a page, not a guide, and
  `scripts/build-pdfs.mjs` does not read it.
