# Science and the Bible: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/science-and-the-bible.json` (rows "science 1" to "science 7" and "science, left out" in `docs/work/elite/explorer-ledger.md`). The words are new. Every claim is taken from these sources and nothing else:

- **Old film**: `client/public/explorer/films/science-and-the-bible.json` (its "older" captions, poster and "differ" note).
- **GW**: `client/public/questions/science/galileo-and-the-war.json`, record `docs/work/elite/apol-pilot/science/galileo-and-the-war.md` (checks in `docs/work/elite/apol-ledger.md`, row "p", and the fourteenth run's corrections).
- **SG**: `client/public/questions/science/has-science-made-god-unnecessary.json`, record `docs/work/elite/apol-pilot/science/has-science-made-god-unnecessary.md` (apol-ledger row "o").
- **EG**: `client/public/questions/science/evolution-and-genesis.json`, record `docs/work/elite/apol-pilot/science/evolution-and-genesis.md` (apol-ledger row "s").
- **HA-FS**: the Honest Answer "do-i-have-to-choose-between-faith-and-science" in `client/src/data/answers.ts`.
- **HA-G1**: the Honest Answer "how-should-a-christian-read-genesis-1" in `client/src/data/answers.ts`.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-26.

- **Psalm 111:2** (spoken): "Great are the works of the LORD; they are pondered by all who delight in them." (The verse on Maxwell's doors, quoted in the BSB as SG does, not in Latin.)
- **Colossians 1:17** (spoken): "He is before all things, and in Him all things hold together."
- **Genesis 1:1** (spoken): "In the beginning God created the heavens and the earth."
- **Proverbs 25:2** (spoken): "It is the glory of God to conceal a matter and the glory of kings to search it out."

## Claims, chapter by chapter

### choose: Do I have to choose?
- The table with an open book and a small telescope: the old film's poster and first frame ("still").
- People say science and the Bible are enemies and you have to pick one: old film, frame "choose" (younger and older).

### armies: Two armies
- John William Draper, 1874; Andrew Dickson White, 1896, first president of Cornell University: GW, "The objection at its strongest"; HA-FS, "The case against, at its strongest"; old film, frame "war".
- "two forces, one marching toward the light and the other holding it back": GW, "The objection at its strongest" (HA-FS has the same with "two armies").
- Galileo at the center of that picture: GW, "The objection at its strongest" ("Galileo is the center of that picture, and the facts at its core are true").

### galileo: What the church did
- 1616, Rome's theologians judged the sun-centered claim "formally heretical": GW, short answer and "What is true in it" (24 February 1616).
- 1633, the Roman Inquisition, "vehemently suspected of heresy": GW, short answer and "What is true in it" (22 June 1633). The live page's wording, corrected in the fourteenth run of the apol-ledger against von Gebler's translation of the sentence; see the note below on "suspect".
- Made to abjure on his knees ("forced him to his knees to renounce it"); house arrest until his death (1642): GW, "The objection at its strongest" and "What is true in it".
- The church was wrong, and Christians should say so plainly: GW, short answer ("The church did condemn Galileo, and it was wrong to ... Christians should say that plainly").

### legend: What the legend leaves out
- Galileo a believer; quoted Augustine (*The Literal Meaning of Genesis*, early fifth century) that for an unbeliever to hear a Christian talk nonsense about the natural world was "a disgraceful and dangerous thing": GW, "The evidence" (letters of 1613 and 1615); HA-FS, "The war is a story, not a finding". The quoted words are GW's.
- The earth's motion not demonstrated in 1633; Friedrich Bessel first measured the decisive sign (stellar parallax) convincingly in 1838: GW, "The evidence" and short answer.

### lab: Scientists who believed
- Maxwell's Cavendish Laboratory at Cambridge, opened in the 1870s, its doors carrying Psalm 111:2 in Latin: HA-FS, "The war is a story, not a finding"; SG, "The evidence"; old film, frame "lab".
- Gregor Mendel, whose experiments with peas began the science of genetics, an Augustinian friar: GW, "The evidence". (The ledger, row p, says "began the science of genetics" is the standard account and was not separately searched.)
- Georges Lemaître, a Catholic priest, argued in 1927 that the universe is expanding: GW, "The evidence"; SG, "The evidence"; HA-FS.
- None of it proves Christianity; plenty of great scientists have been unbelievers; the war is a story about science, not a finding of it: HA-FS, "The war is a story, not a finding"; old film, frame "lab".

### quiet: The quieter objection
- The strong objection is quieter: science keeps explaining what God was once used to explain: HA-FS, opening paragraph.
- Darwin, *On the Origin of Species*, 1859, a natural account of the way living things fit their lives: SG and HA-FS, "The objection at its strongest" / "The case against".
- Jerry Coyne, biologist, *Faith versus Fact* (2015): science has ways to find out it is wrong; religion, he argues, has no comparable way: SG, "The objection at its strongest"; HA-FS, "The case against".

### gaps: Not in the gaps
- Christians have often put God in the gaps: SG, "What is true in it"; HA-FS, "The case against".
- Bonhoeffer, letter of May 1944: "We are to find God in what we know, not in what we don't know.": SG, "What is true in it".
- Aquinas (thirteenth century, named in SG and HA-FS) taught that God works through the causes he made, not in competition with them; the author and the novel: HA-FS, "The argument from the shrinking God"; old film, frame "author".

### kettle: Two true answers
- Water boils because the molecules are agitated; the kettle is on because someone wanted tea; both true, they don't compete: HA-FS, "The argument from the shrinking God"; old film, frame "kettle".
- If God isn't found in the gaps, Christians can't argue for him from the gaps either: HA-FS, same section; old film, frame "author".
- Eugene Wigner, physicist, 1960, mathematics "a wonderful gift which we neither understand nor deserve"; the success of science rests on something science doesn't explain: SG, "The evidence"; HA-FS, "Why science works at all".

### differ: Where Christians differ
- The sharpest arguments are among Christians, over Genesis 1 and the age of the earth: HA-FS, "Where Christians disagree".
- Not a modern argument: Origen, third century, asked whether anyone would suppose the first days existed without sun, moon and stars; Basil of Caesarea, fourth century: "For me grass is grass": HA-G1, "Not a modern retreat".
- The readings: six ordinary days not long ago (calendar-day / young-earth); long ages (day-age / old-earth); the days as a literary frame (framework), God's workdays (analogical day), a cosmic temple (Walton); God creating through evolution (evolutionary creation): HA-G1, "The main Christian readings"; EG, "The main Christian readings". Scholars' names are left on the page.
- Each held by believers who take Scripture seriously, each with a hard question; no side taken: HA-FS, "Where Christians disagree"; old film, frame "differ" and "differ" note; EG, "Where Christians differ".

### confess: What all of them confess
- Every reading confesses that God made everything, by his word, that it was good, and that human beings bear his image: HA-G1, "What all of them confess"; old film "differ" note.
- The Apostles' Creed, "Maker of heaven and earth", says nothing of how long the making took: EG, "The main Christian readings" (last paragraph); HA-G1, "What all of them confess".

### search: Search it out
- This doesn't prove God exists or settle the age of the earth; it clears away a false choice: HA-FS, "The best reply, and what this does not prove".
- Science is that searching, and Christians have every reason to love it; a magnificent description of the house, which can't tell whether anyone lives there: HA-FS, last section; old film, frame "search".
- Closing line "The laboratory and the creed aren't rivals.": HA-FS, opening paragraph ("The laboratory and the creed aren't rivals.").

## Notes

- **No care line.** The old film has none (ledger, "science, left out").
- **No side** on the age of the earth, evolution, a historical Adam or the flood. Adam and death before sin are left on the pages (EG, HA-G1), not raised in the film.
- **Cut for want of a live source:** the old film's Einstein line ("comprehensible ... a miracle"). It is sourced in the explorer ledger to HA-FS, but HA-FS no longer contains it; it survives only in the SG record file, not on the live SG page. Wigner, on both live pages, takes its place.
- **"Suspect" or "suspected"**: the old film and HA-FS say "vehemently suspect of heresy"; the live GW page says "vehemently suspected of heresy", corrected in the apol-ledger's fourteenth run against von Gebler's translation of the 1633 sentence. The film follows GW.
