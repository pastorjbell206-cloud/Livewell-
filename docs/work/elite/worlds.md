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

6,549 words of portrait (the opening and the seven parts; 6,493 before the second check added 56), plus 1,062 words of
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
- The lines the closing run could not check a second time (Pliny on the
  Essenes, the Josephus sections, Tacitus, Philo on the Essenes, 4Q521, the
  Psalms of Solomon, the bread-in-the-diet figure and the rest) were checked in
  the second check below. Six sentences changed.
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

## Second check (2026-11-18)

Every claim the ledger had marked "Not re-searched" was checked again: 44 web
searches (direct fetches of lexundria.com were blocked from this machine, so
Josephus was matched through search results quoting Whiston, COJS and other
translations), plus the Study Bible's own BSB text for every Bible reference in
the prose. The ledger had 46 lines not checked a second time; 45 were checked
now. 39 held as written and 6 did not, and those six sentences were changed.
One (Sanders on sacrifice) is still unchecked. Nothing else on the page changed. The ledger,
`docs/work/elite/worlds-ledger.md`, gives the source for each.

1. Tacitus (part 2). Before: "The Roman historian Tacitus, writing about AD
   100, sneered that the Jews had given the seventh day over to idleness
   (Histories 5.4)." After: "The Roman historian Tacitus, writing about AD 100,
   sneered that the Jews rested on the seventh day and then, charmed by
   idleness, gave up the seventh year as well (Histories 5.4)." Why: in 5.4 the
   seventh day is rest after toil; "the charm of indolence" is his reason for
   the seventh year (Church and Brodribb; Fyfe).
2. Bread (part 2). Before: "...at least half of what ordinary people ate, and
   perhaps much more (Susan Weingarten, drawing on the work of Magen
   Broshi)." After: "...at least half of what ordinary people ate, and perhaps
   as much as three quarters (Susan Weingarten, Biblical Archaeology Review,
   2019)." Why: Weingarten gives 50 to 75 percent; no source tied the figure
   to Broshi.
3. Synagogue halls (part 4). Before: "Archaeologists have now found several
   meeting halls from before 70: at Gamla in the Golan, at Herod's fortresses
   of Masada and Herodium, and since 2009 at Magdala..." After:
   "Archaeologists have now found several meeting halls from the first
   century: at Gamla in the Golan, destroyed by the Romans in AD 67; in rooms
   at Herod's fortresses of Masada and Herodium that the rebels used in the
   war with Rome, though the Herodium hall's date is argued; and since 2009 at
   Magdala..." Why: the Masada and Herodium halls belong to the revolt, which
   ran past 70, and Herodium's date is disputed.
4. Pliny on the Essenes (part 5). Before: "...a community of them on the
   western shore of the Dead Sea, living without women..." After: "...a
   community of them on the west side of the Dead Sea, back from the shore,
   living without women..." Why: Pliny says they keep away from the shore,
   which is harmful (Natural History 5.73).
5. Theudas (part 5). Before: "...men who led crowds into the desert promising
   signs from God, such as Theudas (Antiquities 20.97-98; Acts 5:36)..."
   After: "...men who led crowds out promising signs from God, such as Theudas,
   who said he would part the Jordan (Antiquities 20.97-98; Acts 5:36)..."
   Why: Josephus has Theudas lead people to the Jordan, not the desert.
6. Von Wahlde (part 7). Before: "Others, such as Urban von Wahlde, think the
   Gospel accounts still fit a smaller stone that could be rolled." After:
   "Urban von Wahlde has pointed out that Matthew, Mark and Luke all use a verb
   that means to roll, while John says only that the stone had been removed
   (John 20:1)." Why: that is what his 2015 BAR column is reported to argue;
   the old sentence did not match it.

Held as written, with the source now in the ledger: the Josephus sections Ant.
13.297, 15.380, 17.289, 18.15-17, 18.20, 18.27, 18.29-30, 18.36-38, 20.118;
War 2.427, 7.218; Against Apion 2.175; Philo on the number of the Essenes
(Every Good Man Is Free 75, "more than four thousand"; Josephus "about four
thousand", so "about" stands); 4Q521 and Psalms of Solomon 17 (both
paraphrased, which fits translations that differ in wording); 1 Maccabees 2;
the lake's size; Scythopolis; Herod's dates; Herod's and Antipas's coins; the
scrolls count; tefillin at Qumran; stone vessels; ossuary dates; Capernaum
houses; Bailey on kataluma; Mishnah Gittin 9:10; the Zealots; and the
paraphrases of Sanders, Neusner, Levine, Collins, Wright and Malina.

Still not verified: the distance from Nazareth to Sepphoris (5 or 6 km);
stepped pools as a separate search; Sanders on sacrifice (Judaism: Practice
and Belief); the exact wording of 1 Maccabees 2:41 (not quoted on the page);
Levine's own wording (checked only through summaries); and von Wahlde's final
conclusion, which the summaries report differently, so the page states only
his observation about the verbs.

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
