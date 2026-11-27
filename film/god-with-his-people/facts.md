# God with his people: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/god-with-his-people.json` (its "older" captions and its `think.older`), with its rows under "God with his people" in `docs/work/elite/explorer-ledger.md` (the frame rows: every frame, the garden, the way shut, the tent, the temple, the glory leaves, the Word, the curtain, the city) and the dwelling thread in `client/public/explorer/threads.json` that the old film quotes. The other sources are the doctrine page `client/public/bible/doctrines/temple.json` (`definition`, `ot`, `nt`, `history`, `differ`, `errors`); the Explorer's Sinai stop `client/public/explorer/stops/sinai.json` (`story.older` and the "Walk into the tent" `activity.steps`); and the Study Bible notes `client/public/bible/notes/exodus/40.json`, `1-kings/8.json`, `ezekiel/10.json`, `john/1.json` and `john/verses/1.json` (verse 14). Nothing was added from outside.

The old film has no care line. The fall of the temple is told in the temple-destroyed film and is named here in one sentence only.

## Scripture (Berean Standard Bible)

Each scripture card was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27. The inline quotations without a card were checked by hand against the same files.

- **Genesis 3:8** (spoken, middle of the verse): "the voice of the LORD God walking in the garden in the breeze of the day"
- **Genesis 3:24** (shown on screen, from "stationed"): "stationed cherubim on the east side of the Garden of Eden, along with a whirling sword of flame to guard the way to the tree of life." The narration says it in its own words ("Cherubim were stationed on the east side of the garden to guard the way to the tree of life").
- **Exodus 25:8** (spoken; the verse's opening "And" left off, capital T at the start of the sentence): "they are to make a sanctuary for Me, so that I may dwell among them."
- **Exodus 33:15** (spoken inside a line, no card; split as the doctrine page splits it, leaving out "Moses replied"): “If Your Presence does not go with us,” ... “do not lead us up from here.”
- **Exodus 40:34** (spoken): "Then the cloud covered the Tent of Meeting, and the glory of the LORD filled the tabernacle."
- **1 Kings 8:27** (spoken; the opening question "But will God indeed dwell upon the earth?" left off): "Even heaven, the highest heaven, cannot contain You, much less this temple I have built."
- **Ezekiel 10:18** (shown on screen, first clause): "Then the glory of the LORD moved away from the threshold of the temple"
- **Matthew 1:23** (spoken: "they will call Him Immanuel"; the gloss "God with us" is Matthew's own, from the same verse, spoken in a line).
- **John 1:14** (spoken, first sentence): "The Word became flesh and made His dwelling among us." "We have seen His glory" is also spoken inside a line, from the same verse, without quotation marks.
- **1 Corinthians 3:16** (spoken, whole verse, with the BSB's curly apostrophes): "Do you not know that you yourselves are God’s temple, and that God’s Spirit dwells in you?"
- **Revelation 21:3** (spoken, from "Behold"): "Behold, the dwelling place of God is with man, and He will dwell with them."
- **Revelation 21:22** (spoken inside a line, no card, turned to the third person: "John saw no temple in the city, because the Lord God Almighty and the Lamb are its temple." The words from "because" on are the BSB's; the old film's "city" frame uses the verse the same way.)
- **Mark 15:38** is told, not quoted ("the veil of the temple was torn from top to bottom"; the BSB has "torn in two from top to bottom").
- **Ezekiel 11:16** is paraphrased, not quoted ("God called himself a sanctuary for the exiles").

## Claims, by chapter

**garden**
- "The whole Bible can be read as one long answer to a question. Can God live with his people?": the dwelling thread's `line.older` in `threads.json` (word for word up to the question); old film `line.older`.
- God walking in the garden, close enough to be heard: old film frame "garden"; ledger row "God with his people, the garden".

**shut**
- They hid from his presence and were sent out: old film frame "shut"; thread line for the "fall" stop; ledger row "the way shut".
- Cherubim guard the way to the tree of life on the garden's east side: BSB Genesis 3:24; doctrine `ot` ("after the fall cherubim guard its entrance on the east (3:24)").
- "Could God and people be together again?": old film frame "shut" ("From here on, the Bible asks how God and people can be together again").

**tent**
- After the rescue from Egypt, at Sinai, God gave Moses the plan for the tabernacle: Sinai stop `story.older` [0] and [1]; old film frame "tent".
- "The holy God of the mountain was going to live in a tent in the middle of the camp": Sinai stop `story.older` [1], word for word except "is going" made "was going".
- The golden calf came while the plans were being given, and Moses pleaded "If Your Presence does not go with us ... do not lead us up from here": doctrine `ot` ("Between the instructions and the building stands the golden calf ... Moses pleaded"); Sinai stop `story.older` [2].

**filled**
- The glory filled the tabernacle: BSB Exodus 40:34; old film frame "tent"; Exodus 40 note `story`.
- The Hebrew verb for the cloud's settling (verse 35) is shakan, the root of mishkan, tabernacle: Exodus 40 note `literary` and `words` (H7931).
- Even Moses could not enter: Exodus 40 note `summary` and `story` ("The final problem, that Moses cannot enter"); BSB Exodus 40:35.
- The turn to the viewer ("Exodus ends with God moving in, not with Israel reaching the land. Why might his presence be the better ending?"): Exodus 40 note `questions` [0] ("Exodus ends with God filling the tent, not with Israel reaching the promised land. Why might God's presence be a better ending than the land?").

**temple**
- Around 960 BC, at Solomon's dedication of the temple in Jerusalem, the cloud filled the house so that the priests could not stand there to minister: Exodus 40 note `historical` ("about 960 BC"; 1 Kings 8:10-11); old film frame "temple"; ledger row "the temple". (The 1 Kings 8 note says "around 959 BC on common reckonings"; the film's "Around 960 BC" fits both.)
- "The cloud came again": 1 Kings 8 note `story` ("The glory cloud that once filled the tabernacle ... now fills the temple").
- Solomon's words, heaven cannot contain God: BSB 1 Kings 8:27; doctrine `ot` ("Solomon prayed with a theology that refused to shrink God").
- The temple was not where God was trapped; it was where his Name dwelt and the place toward which prayer was directed: 1 Kings 8 note `cultural` ("The temple is not where God is trapped or fed ... it is the place toward which prayer is directed and where his Name dwells").

**leaves**
- About 592 BC; Ezekiel in exile; the glory moves from the threshold to the east gate: Ezekiel 10 note `historical` ("about 592 BC") and `story` / `literary` (threshold, cherubim, east gate, verses 18-19); Ezekiel 10 note `story` ("the same throne-chariot that met him in exile").
- Then to the mountain east of the city: old film frame "leaves" (Ezekiel 11:23); doctrine `ot`; ledger row "the glory leaves".
- Six years later Babylon burned the temple: Ezekiel 10 note `historical` ("some six years before the Babylonians burned the temple in 587 or 586 BC"). The temple-destroyed film tells the event.
- God called himself a sanctuary for the exiles: doctrine `ot` (Ezekiel 11:16, "a sanctuary for them in the countries to which they have gone").
- Ezekiel saw the glory return to a renewed temple: Exodus 40 note `historical` (Ezekiel 43:1-5); doctrine `ot` (43:4-5); old film frame "leaves".
- No people is blamed: ledger row "the glory leaves" ("No people blamed").

**immanuel**
- Matthew names him Immanuel, "God with us": doctrine `nt` (Matthew 1:23); thread line for the "jesus" stop ("Jesus is God with us").
- "The Gospels present Jesus as the place where God now dwells": doctrine `nt`, its opening sentence, word for word.

**word**
- John's verb is skēnoō, to pitch a tent; "tabernacled among us": John 1 note `words` (G4637: "literally tented or tabernacled among us"); doctrine `definition` (skēnoō, "literally ‘pitched his tent’"); John 1 verse note on 14 (Eskēnōsen, "pitched his tent"); ledger row "the Word".
- The verb occurs only five times in the New Testament, here and four times in Revelation (7:15, 12:12, 13:6, 21:3): John 1 note `words` (G4637).
- "The glory of the tabernacle is seen in the flesh of Jesus": John 1 note `words` (G4637: "The glory that once filled the tabernacle is now seen in the flesh of Jesus").

**church**
- When Jesus died the veil of the temple was torn from top to bottom; God opened the way in: Sinai stop `activity.steps` "veil" (`later`: "God himself opened the way in"); BSB Mark 15:38; old film frame "curtain"; ledger row "the curtain".
- Paul writes to a divided church: doctrine `errors` ("Paul addresses a congregation divided by factions").
- The "you" of 1 Corinthians 3:16 is plural; the church together is the sanctuary (naos): doctrine `nt`.
- "People in every place": old film frame "spirit" ("It lives in people, in every place").
- The turn to the viewer ("Why might God choose to live in people, and not only in a building?"): old film `think.older`, word for word but for the comma.

**differ**
- The fair question whether the pattern is in the text or read into it: doctrine `history`, last sentence ("The debate over how much of this pattern the biblical authors intended, and how much is the interpreter's synthesis, continues").
- Genesis does not call Eden a temple; Gordon Wenham's paper Sanctuary Symbolism in the Garden of Eden Story (1986); G. K. Beale's The Temple and the Church's Mission (2004); Daniel Block's essay published in 2013 argued Eden is portrayed as a royal garden more than a sanctuary: doctrine `ot`.
- Ezekiel's temple: dispensational readers expect it built in Christ's thousand-year reign ("a coming kingdom" in the film); most Reformed, Catholic, Orthodox and many other Protestant interpreters see it fulfilled in Christ, the church and the new creation: doctrine `differ` [0] and [1]. No side taken. (The film shortens "Christ, the church, and the new creation" to "Christ and the church" for length.)
- Nothing scorns the temple; Jesus called it his Father's house: doctrine `errors` and `nt` (Luke 2:49); ledger row "the temple" ("nothing dismissive of the temple or of Jewish worship").

**home**
- Revelation 21:3 as the end of the thread: thread line for the "new-creation" stop; old film frame "city"; Exodus 40 note `christ`.
- No temple in the city, because God and the Lamb are its temple: BSB Revelation 21:22; old film frame "city"; ledger row "the city".
- The city is a cube, like the inner sanctuary of Solomon's temple; the whole city has become the Most Holy Place: doctrine `nt` (Revelation 21:16; 1 Kings 6:20 in `ot`).
- "It began with God walking in a garden. It ends with God at home among his people": doctrine `nt`, last sentence ("The Bible that began with God walking in a garden ends with God at home among his people"), split in two.

**titleCard**: "From a garden to a city, God makes his home with us." The film's own closing line, summing the doctrine page's last sentence and the old film's "What began in a garden ends in a whole world where God lives with his people."
