# What it was like: the Roman world

For James. The third world portrait, built on the pattern you approved on
2026-11-18 ("publish it all"), as data only.

## What a visitor sees, and where

- On **/resources/context** ("Choose a world"), the Roman world card (the arch
  plate) now opens the portrait and reads "What it was like · 5 guides", and
  under that world's list of guides the line "What it was like: the full
  portrait of this world" appears. No page code changed: the card and the line
  read the rebuilt worlds index.
- At the top of each of the five Greco-Roman guides (the cities of Paul,
  gospel and lord under Caesar, patronage and grace, the household codes,
  crucifixion and shame) the link "What it was like: The Roman world, the full
  portrait" appears.
- The portrait is at **/resources/context/world/roman-world**, in the same
  page as the other two: the arch plate, a contents list of eight parts, each
  part with its reading and "How it changes what you read" (three passages
  quoted from the Berean Standard Bible, each linking to its verse in the Study
  Bible, with a short note), then the five guides and "Sources and further
  reading" (16 ancient sources, 22 modern works). It is prerendered with its
  full text, in the sitemap, the site search (with its own Roman-world search
  words) and llms.txt.

## Word count

7,020 words of portrait (the opening and the eight parts), plus 1,377 words of
notes under the 24 passages, plus the quoted Scripture.

## The parts

1. Roads, ships and cities
2. Caesar, governors and the law
3. The household: slaves, freedmen and patrons
4. Gods, the emperor and the words on the coins
5. Clubs, meals and the table
6. Work, money and the crowded city
7. Letters: written, carried and read aloud
8. How the church looked from outside

## Ten things in it most readers won't know

1. The firmest date in Paul's life comes from a stone: a letter of Claudius
   cut at Delphi names Gallio as proconsul in the emperor's twenty-sixth
   acclamation, which puts Gallio in Corinth in AD 51 to 52 (some say 50 to
   51) (the Gallio inscription; Acts 18:12).
2. Ancient sailors treated the sea as closed from about 11 November to 10
   March, which is why "after the Fast" in Acts 27:9 was a warning (Vegetius
   4.39, late fourth century; Beresford, 2013, shows winter sailing happened).
3. Citizenship could be bought, and under Claudius its price fell until it
   became a joke (Cassius Dio 60.17); the commander who says "I paid a high
   price" is named Claudius Lysias (Acts 22:28; 23:26).
4. About 9 BC the province of Asia moved its New Year to Augustus's birthday,
   calling it the beginning of the good news (euangelia) for the world (the
   Priene calendar inscription).
5. Augustus himself refused to be called "lord" as an insult (Suetonius,
   Augustus 53), yet in Acts 25:26 Festus calls Nero simply "the lord."
6. A burial club at Lanuvium in AD 136 charged a hundred sesterces and an
   amphora of good wine to join and paid three hundred toward a member's
   funeral (CIL 14.2112).
7. Trajan refused Nicomedia a fire brigade of 150 men because any group of men
   brought together would turn into a political club (Pliny, Letters
   10.33-34); Pliny says the Christians stopped their common meal after he
   banned clubs (10.96).
8. A papyrus invitation from Egypt asks a guest to dine "at the table of the
   lord Sarapis" in his temple (P.Oxy. 110, second century), the kind of meal
   behind 1 Corinthians 8:10.
9. Ordinary papyrus letters average about 87 words, Cicero's about 295, and
   Paul's about 2,495; Romans runs past seven thousand (E. Randolph Richards,
   2004).
10. Pliny had two slave women whom the Christians called ministrae, deacons,
    questioned under torture and found only "a depraved and excessive
    superstition" (Letters 10.96).

Also in the portrait: Seneca's room above a bath (Letters 56), the Erastus
pavement at Corinth and why its link to Romans 16:23 is argued, and the
argument between Weima and White over "peace and security" in
1 Thessalonians 5:3.

Every claim, its source and how it was checked is in
`docs/work/elite/wrom-ledger.md` (60 web searches, the site's five Greco-Roman
guides, and the Study Bible's BSB text).

## What was cut or softened because it could not be verified

- From Tacitus, Annals 15.44: that some victims were crucified, and Rome as
  the place "where everything shameful flows" (not confirmed by a search).
- From Pliny and Trajan: the rule against anonymous accusations, the
  "contagion" reaching villages and farms, and the temples filling again.
- Any English quotation of Pliny, Tacitus or Juvenal: no named translation's
  wording could be confirmed from this machine (the classical text sites were
  blocked), so they are paraphrased, with short Latin phrases that were
  confirmed. The one English quotation is Suetonius, Nero 16.2, in Rolfe's
  translation.
- A Trajanic height limit for Roman buildings (sources conflict), Richards's
  cost of writing Romans, a head count for a Corinthian house church, the
  itemised dinner rules at Lanuvium, debt as a source of slaves, and the
  Alexamenos graffito (already in a guide; cut for length).

## Still unverified

Standard facts not separately searched, listed at the end of the ledger
(reign dates, Gallio as Seneca's brother, Castor and Pollux, Puteoli,
Lechaeum and Cenchreae, the year of Cicero's Verrines, the section number of
For Rabirius 16, the Pompeian household shrines, the rules of manumission, the
insula, the papyrus letter form, and the like). Richards's averages were
confirmed through quotations of his table, not the table itself. Cohick's book
is summarised generally. The Lanuvium figures differ slightly between
translations (one deducts a funeral fee from the 300 sesterces); the page
gives the 300.

## The Old Testament checks (the extra job)

Six facts in the Old Testament world portrait were searched; the results are
at the end of `docs/work/elite/wot-ledger.md`.

- The Dead Sea as "the lowest place on earth": **corrected**. The ice-covered
  Bentley trench and the ocean floor are lower, so the sentence now reads
  "the Dead Sea, whose shore is the lowest dry land on earth".
- Gezer calendar months: **corrected** in part. "Tending vines" holds
  (Albright); "more harvest" became "a month of harvest and measuring (some
  read feasting; the word is argued)".
- The province name Yehud: holds.
- No coins for most of Old Testament history: holds (Lydian coins from the
  late seventh century BC; Judah's own YHD coins from about the mid fourth).
- The Louvre as home of the Mesha Stele (AO 5066) and Hammurabi's stele
  (Sb 8): holds.
- Carol Meyers's grinding estimate: holds as worded ("estimates drawn from
  Carol Meyers's work"); an essay apparently by Meyers gives at least two to
  three hours a day for a family of six. The book's page is still unseen.

## Code changes (smallest that would do)

- `scripts/build-search-index.mjs`: one line of search words for the
  Greco-Roman group.
- `client/public/llms.txt`: one entry.
- Generated: `client/public/context/worlds-index.json` and
  `client/public/search-index.json`.

## What was run, and what passed (2026-11-19)

- `node scripts/validate-worlds.mjs`: 3 portraits hold their shape.
- Every one of the 36 commands in the CI content-gates step: all passed.
- `pnpm check`: passed. `pnpm test`: 146 files passed, 7 skipped; 1,651 tests
  passed, 73 skipped. The one changed script is outside ESLint's scope.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,027 pages; the
  portrait's full text is in its prerendered HTML with its own title and
  canonical), `pnpm run audit:canonicals` (0 failures): all passed.
- Looked at the portrait at 390x844 and 1440x900, day and night, plus the
  library card and a guide's link: no sideways scroll at either width.
  Screenshots: `/home/user/elite-shots/wrom/`.
- Lighthouse (median of three, local server): performance 90, accessibility
  100, CLS 0.000.

## What only James can supply

- Whether this world should carry any line of his own at the top.
- Which world comes next (Honor and shame is the next on the plan).
