# Sacrifice and the Lamb: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/the-lamb.json`, rewritten as a "big idea" film that follows the lamb thread alone. Its sources are the old film (older captions, think question, differ note), its rows in `docs/work/elite/explorer-ledger.md` ("lamb fall" to "lamb new-creation", "lamb 1" to "lamb 7", "lamb, differ", "lamb, left out"), the doctrine page `client/public/bible/doctrines/atonement.json`, and the Study Bible notes in `client/public/bible/notes/`. Three notes were added beyond the brief's list because the brief asked for three stops the old film did not have: Genesis 4 (Abel), Exodus 29 (the daily lambs) and Revelation 5 (the Lamb on the throne).

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27.

- **Genesis 22:7** (spoken): "but where is the lamb for the burnt offering?" (the line also speaks the verse's preceding words "The fire and the wood are here")
- **Genesis 4:4** (spoken): "Abel brought the best portions of the firstborn of his flock. And the LORD looked with favor on Abel and his offering"
- **Genesis 22:8** (spoken): "God Himself will provide the lamb for the burnt offering, my son."
- **Exodus 12:3** (spoken): "each man must select a lamb for his family, one per household"
- **Exodus 29:39** (spoken): "Offer one lamb in the morning and the other at twilight." (the line before it paraphrases 29:38, "two lambs that are a year old ... each day")
- **Isaiah 53:7** (spoken): "He was led like a lamb to the slaughter, and as a sheep before her shearers is silent, so He did not open His mouth."
- **John 1:29** (spoken): "Look, the Lamb of God, who takes away the sin of the world" (the BSB reads "Look", not "Behold"; ledger row "all four, quotations in captions")
- **John 19:14** (shown on screen): "It was the day of Preparation for the Passover"
- **Revelation 5:6** (spoken): "Then I saw a Lamb who appeared to have been slain, standing in the center of the throne"
- **Revelation 5:12** (spoken): "Worthy is the Lamb, who was slain, to receive power and riches and wisdom and strength and honor and glory and blessing!" (the only exclamation mark, inside the verse)

Other Bible words in the narration, not in a scripture field:
- "who is the prophet talking about, himself or someone else?": BSB Acts 8:34, checked in `client/public/bible/text/acts/8.json`; quoted in the Isaiah 53 note (christ section).
- "The fire and the wood are here", "a ram ... caught by its horns", "in place of his son", "The LORD Will Provide": BSB Genesis 22:7, 13, 14.
- "the fruit of the soil": BSB Genesis 4:3.
- "the same sacrifices, again and again, can never take away sins": BSB Hebrews 10:11 (paraphrased by dropping "to offer"), quoted in the Exodus 29 note (christ section).
- "the day of Preparation for the Passover": BSB John 19:14.
- "the Lion of the tribe of Judah": BSB Revelation 5:5.
- "every creature in heaven and on earth and under the earth and in the sea": BSB Revelation 5:13.

## Claims, by chapter

1. **Where is the lamb?** Isaac carries the wood (BSB Genesis 22:6; Genesis 22 note, historical: "old enough to carry the wood for the fire up a mountain"). Called "a son", not "a boy": Genesis 22 note says Genesis doesn't give Isaac's age.
2. **The first offering.** Abel brought the firstborn of the flock and the best portions; grain offerings were acceptable in Israel's law, so the difference is not plants versus animals; "some of Cain's fruit" against "the choicest and first": Genesis 4 note, cultural. Abel offered by faith: Genesis 4 note, christ (Hebrews 11:4). God looked with favor on Abel's offering: atonement.json, "ot".
3. **God will provide.** "One of the hardest stories in the Bible"; God tested Abraham and then stopped him; the later law and prophets forbid offering a child: old film frame "provide" and ledger "lamb 2" (from `abrahams-road.json`). Ram in place of his son; place named The LORD Will Provide: BSB Genesis 22:13-14; atonement.json "ot". "Christians have long heard in it a promise God himself would keep": old film frame "provide", ledger "lamb 2" (Genesis 22 note, christ section). "A ram that day, not a lamb" restates Genesis 22:8 against 22:13.
4. **One per household.** Each family chose a lamb, one per household; not spared because better but because a lamb died in their place and their door was marked; "a night of great sadness in Egypt"; kept every year so children ask: old film frame "passover", ledger "lamb 3" (the Rescue stop, word for word on the sadness sentence); BSB Exodus 12:3, 26-27. Blood is not named or drawn; why blood is left to the sibling film why-blood.
5. **Morning and evening.** Two year-old lambs each day, morning and twilight: BSB Exodus 29:38-39. "Tamid, meaning regular or continual", offered at the temple in Jerusalem for centuries: Exodus 29 note, historical (the name also in the Numbers 28 note's word study). Hebrews contrasts the daily repeated sacrifices that can never take away sins: Exodus 29 note, christ (Hebrews 10:11-12).
6. **Like a lamb.** Isaiah's servant is a person, not an animal, who suffers for others: atonement.json "ot" ("speaks of a person, not an animal, who suffers for others"). Silent: Isaiah 53 note, summary ("Silent like a lamb"). The Ethiopian official reading verses 7 and 8 and asking his question: Isaiah 53 note, christ (Acts 8:26-35). Christians from the first church read the servant as Jesus, many Jewish readers as Israel: old film frame "lamb-of-god", differ note, ledger "lamb exile" and "lamb 5". Rashi among the Jewish readers who took the servant as Israel: atonement.json "ot" ("Jewish interpreters from the Middle Ages onward, Rashi among them") and Isaiah 53 note, interpretation.
7. **Look, the Lamb.** John the Baptist sees Jesus coming: BSB John 1:29. "The next day" he says "Look, the Lamb of God!" again: BSB John 1:35-36. The title gathers the Passover lamb, the daily offering lambs, the lamb of Genesis 22:8 and the servant of Isaiah 53:7: John 1 note (word study on verse 29); Exodus 12 note, christ; atonement.json "nt" ("perhaps the lamb God provides in Genesis 22"). Grünewald's Isenheim Altarpiece, "about 1512 to 1516", John the Baptist beside the cross with a long pointing finger and a lamb at his feet: John 1 note, interpretation. (Said as "in the 1510s".)
8. **At Passover.** Jesus died at Passover: ledger "lamb cross" (BSB Mark 14:12; 15:1-37). John dates the death to the day of Preparation for the Passover, when the lambs were being killed; Matthew, Mark and Luke present the Last Supper as a Passover meal; scholars weigh the timing differently (Jeremias and others); all four Gospels tie Jesus' death to the Passover; not one bone broken, from the Passover rule (Exodus 12:46): Exodus 12 note, christ; atonement.json "nt"; John 1 note, christ. The crucifixion is named, not described; no one is named as responsible.
9. **A Lion, a Lamb.** John hears of the Lion of Judah and sees a Lamb standing at the center of the throne: Revelation 5 note, summary and literary. The Greek word (arnion) is "a small, even tender one": Revelation 5 note, cultural. Used of Christ twenty-eight times in Revelation: Revelation 5 note, word study G0721. Standing alive; the marks of the cross not erased by the resurrection: Revelation 5 note, christ; old film frame "throne"; ledger "lamb 7". "John expected a lion": Revelation 5 note, questions.
10. **Worthy is the Lamb.** The worship widens in circles to every creature in heaven, on earth, under the earth and in the sea: Revelation 5 note, literary; BSB Revelation 5:11-13.

## Notes

- The old film's care line ("This moving picture tells of a real death, and of our sin...") stays on the page, word for word, and is not in the narration.
- Left to sibling films and not repeated here: Leviticus 17 and why sacrifice and blood at all, and the objection that sacrifice is barbaric (why-blood); "Christ, our Passover lamb" (1 Corinthians 5:7), the ransom, Isaiah 53:5, "not an angry Father against an unwilling Son", and the pictures of the atonement (why-jesus-died). The Day of Atonement goat from the old film is also left out to keep the film on the lamb.
- No atonement theory is named or ranked; Isaiah's servant gets both readings; the Gospels' Passover timing is named as an open question. Nothing blames the Jewish people.
