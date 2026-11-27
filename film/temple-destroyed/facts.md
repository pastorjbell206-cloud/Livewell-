# Why did God let his temple be destroyed?: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/temple-destroyed.json` (its "older" captions), with its rows under "Why did God let his temple be destroyed? (`temple-destroyed`)" in `docs/work/elite/explorer-ledger.md`. The other sources are the Explorer stop `client/public/explorer/stops/exile.json` (its `story.older`, `god.older` and `question.answer`, which the old film is built on); the Study Bible notes `client/public/bible/notes/2-chronicles/36.json`, `psalms/137.json`, `lamentations/intro.json`, `lamentations/2.json`, `lamentations/3.json`, `lamentations/5.json`, `jeremiah/7.json` and `jeremiah/52.json`; and the doctrine page `client/public/bible/doctrines/exile.json`. Nothing was added from outside.

The old film's care line ("This stop tells of people who lost their home ... or look at Find Help.") stays on the film's page word for word and is not in the narration. The Lamentations notes' own crisis lines are not used in the film.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27.

- **1 Kings 8:27** (spoken; the verse's opening question "But will God indeed dwell upon the earth?" is left off): "Even heaven, the highest heaven, cannot contain You, much less this temple I have built."
- **2 Chronicles 36:15** (spoken; cut before "and on His dwelling place"): "Again and again the LORD, the God of their fathers, sent word to His people through His messengers because He had compassion on them"
- **Jeremiah 7:4** (spoken): "Do not trust in deceptive words, chanting: ‘This is the temple of the LORD, the temple of the LORD, the temple of the LORD.’"
- **Ezekiel 10:18** (shown on screen, first clause): "Then the glory of the LORD moved away from the threshold of the temple"
- **2 Kings 25:9** (shown on screen, cut before the BSB's dash, as in the old film): "He burned down the house of the LORD"
- **Psalm 137:1** (spoken): "By the rivers of Babylon we sat and wept when we remembered Zion."
- **Psalm 137:4** (spoken inside a line, not a scripture card): "How can we sing a song of the LORD in a foreign land?" Checked by hand against `psalms/137.json`. Psalm 137:2 is paraphrased ("They hung their harps on the willows"), not quoted. **Psalm 137:7-9 are not quoted.**
- **John 9:3** (spoken inside a line, and shown on screen as a scripture card): "Neither this man nor his parents sinned"
- **Lamentations 3:22-23** (spoken; the last clause of verse 22 and all of verse 23, with the verse's own exclamation mark): "His mercies never fail. They are new every morning; great is Your faithfulness!"
- **Jeremiah 31:33** (shown on screen, middle sentence): "I will put My law in their minds and inscribe it on their hearts."
- **Luke 19:41** (shown on screen): "As Jesus approached Jerusalem and saw the city, He wept over it"

## Claims, by chapter

**house**
- Babylon's army burned the temple in 587 or 586 BC, "historians give either year": old film frame "burned"; stop `story.older` (word for word, the hedge held by a test per the ledger row "5 The day it fell"). Lamentations intro `date`: "the two dates reflect different ways of reckoning the Judean and Babylonian calendars".
- It was Solomon's temple: Lamentations intro `overview` ("the burning of Solomon's temple"); ledger row "1".
- Where God's Name dwelt: old film frame "house"; ledger row "1" (1 Kings 8 note, cultural). The old caption's "the place toward which prayer was directed" was cut for length.
- Solomon said it on the day the temple was finished; the temple was never a box that held God: stop `question.answer` [1]; old film frame "house"; ledger row "1".

**prophets**
- For more than three centuries God sent prophets: Elijah, Amos, Hosea, Isaiah, Micah, Jeremiah and others: stop `story.older` [1]; old film frame "prophets"; ledger row "2".
- The reason: God sent messengers again and again because he had compassion: 2 Chronicles 36 note, `literary` and `story`; `words` (H2550, chamal).
- "Every warning was an act of mercy": the film's wording of the 2 Chronicles 36 note's first question ("see them as acts of mercy") and `doctrines` judgment ("warnings sent out of compassion").

**gate**
- About 609 BC God sent Jeremiah to the temple gate: Jeremiah 7 note, `historical` (the sermon dated by 26:1 to "about 609 or 608 BC"; the film says "About 609 BC").
- "The most public pulpit in Judah": Jeremiah 7 note, `cultural`; ledger row "3".
- God delivered Jerusalem from Sennacherib in 701 BC, and many concluded God would never let his house be destroyed: Jeremiah 7 note, `story`.
- The phrase chanted as if the words guaranteed safety: Jeremiah 7 note, `cultural` (the film lets the verse say it).
- The sermon nearly cost him his life: Jeremiah 7 note, `story`; old film frame "gate"; ledger row "3".
- The closing question is the film's turn to the viewer, from the old film's `think.younger` ("What is the difference between trusting a place and trusting God?").

**glory**
- Ezekiel, already an exile, saw in a vision the glory of the LORD leave the temple before the city fell; the exile was not God losing a battle to Babylon's gods; it was God doing what he had said he would do: stop `question.answer` [1] and [2]; old film frames "glory" and "why"; ledger rows "4" and "6".

**fell**
- A siege of about a year and a half; the temple, the palace and the city burned; many survivors deported: Lamentations intro `setting` ("besieged the city for about a year and a half ... the temple, the palace, and the city were burned") and `overview` ("the deportation of many of the survivors"); stop `story.older` [3]. Left out (as in the ledger's "left out" row): the blinding of Zedekiah, the executions, famine detail.
- The Chronicler does not linger on the details of the siege; he gives the reason, the messengers mocked until there was no remedy: 2 Chronicles 36 note, `story` (word for word "does not linger on the details of the siege; he gives the reason") and `words` (H4832, marpe, "no healing", verse 16).

**grief**
- The Bible does not treat the grief as small: stop `question.answer` [3]; old film frame "burned"; ledger row "5".
- Hanging the harps on the willows was a refusal to play: Psalm 137 note, `cultural` (the film says only that they hung them).
- The psalm ends with a raw cry for justice; it is a prayer, not a command, and hands the demand for justice to God: Psalm 137 note, `hard` ("the psalm is a prayer, not a command or a policy. It is addressed to God and hands the demand for justice to him") and `doctrines` judgment. The verses themselves are not quoted.
- Lamentations: five poems; chapters 1 to 4 are alphabetic acrostics; "grief expressed completely, from A to Z": Lamentations intro `overview` and `reading`.

**why**
- The question whether suffering this great can be proportionate, left before God: Lamentations intro `themes` ("Sin and judgment": "The book asks whether suffering this great, especially the suffering of children, can be proportionate, and it leaves that question before God rather than answering it for him"). This is the objection at its strongest, from Scripture's own voice.
- "The prophets' answer is hard to hear"; it came at the end of a long turning away, after many warnings: stop `question.answer` [1] and [3]; old film frame "why"; ledger row "6". "Sent in compassion": 2 Chronicles 36 note, `doctrines` judgment.
- Not every loss is a punishment; Jesus, asked whose sin made a man blind: stop `question.answer` [3]; ledger row "6"; BSB John 9:3. ("That answer belongs to this event, not to every loss" is the film's plain wording of the stop's "Not every loss is a punishment" and the ledger's note that nothing says anyone's suffering today is a punishment.)

**mercies**
- At the center of Lamentations (chapter 3), one sufferer calls to mind the LORD's mercies: Lamentations intro `overview` and `themes` ("Hope chosen in the dark": "not a feeling that arrives but a decision to call something to mind (3:21). It rests on the character of God"); Lamentations 3 note, `literary` (verses 22-24 the pivot of the book).
- The book ends with the community asking whether God has rejected them for good; Scripture includes an unanswered prayer: Lamentations intro `overview` and `themes` ("Prayer that stays unfinished"); Lamentations 5 note, `hard`.

**home**
- God had been a sanctuary for the exiles in the lands where they had gone: old film frame "again"; stop `story.older` [4] (Ezekiel 11:16); doctrine `ot` paragraph 3.
- Cyrus took Babylon in 539 BC and allowed the exiles to return: doctrine `ot` paragraph 4; 2 Chronicles 36 note, `historical`; Psalm 137 note, `historical`.
- The new temple finished in 516 or 515 BC: doctrine `ot` paragraph 4 (Ezra 6:15). (The 2 Chronicles 36 note's `hard` says "completed around 516 BC"; the film uses the doctrine's either-year form.)
- The prophets promised more than had been lost, a covenant written on the heart: stop `god.older`; old film frame "again"; ledger row "7".

**second**
- Jesus wept over Jerusalem and foretold that it would again be torn down (Luke 19:41-44), which happened in AD 70: Lamentations 2 note, `christ` (word for word "which happened in AD 70"); Lamentations intro `christ` ("Jesus wept over Jerusalem and foretold a second destruction").
- When he drove the money changers out of the temple he quoted Jeremiah 7 (Matthew 21:13; Mark 11:17): Jeremiah 7 note, `christ`. The film says "in the temple courts" for brevity.
- Jesus spoke of his own body as the temple destroyed and raised in three days (John 2:19-21): Jeremiah 7 note and Jeremiah 52 note, `christ`; 2 Chronicles 36 note, `christ`.
- The fast of Tisha B'Av remembers the destruction of both temples: Lamentations intro `purpose` ("the ninth of Av (Tisha b'Av), the fast that remembers the destruction of both the first temple and the second"); doctrine `history` paragraph 2. The doctrine page's following sentences on modern Zionism and 1948 are deliberately left out: nothing ties the passage to a modern nation.
- No people is blamed for AD 70; the film does not say who destroyed the second temple.

**close**
- God did what he had warned, after long patience: 2 Chronicles 36 note, `doctrines` judgment ("God's judgment after long patience"); stop `question.answer` [1].
- The building never held him; he went with his people into exile and brought them home: stop `question.answer` [2]; stop `story.younger` [5] and `god.younger` ("he goes with them"); old film frame "again" (younger: "God went with his people to Babylon, and he brought them home").
- "The temple fell. His mercies didn't." and the titleCard "A temple can fall. God's mercies never fail.": the film's own closing lines, resting on Lamentations 3:22 ("His mercies never fail").

## Who is named

"Babylon's army", "God's people", "his people", "the exiles", "the survivors". The narration never says "the Jews", names no people or state of today, and names no one as the destroyer in AD 70. The prophets who warn are Israel's own and the grief is Israel's own Scripture, as in the ledger's "who is named" row.
