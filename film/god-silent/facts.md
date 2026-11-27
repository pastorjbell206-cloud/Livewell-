# Why does God seem silent sometimes?: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/god-silent.json` (its "older" captions), with its rows "silent 1" to "silent 7" and "silent, care" in `docs/work/elite/explorer-ledger.md`. The other sources are the Wisdom topic "Feeling far from God" (`client/public/wisdom/topics.json`, id `feeling-far-from-god`, and the same text in `client/public/wisdom/entry/feeling-far-from-god.json`; there is no file for it under `wisdom/deep/`) and the Study Bible notes `client/public/bible/notes/psalms/13.json` and `client/public/bible/notes/1-kings/19.json`. Nothing was added from outside.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-26.

- **Psalm 13:1** (spoken; the heading "For the choirmaster. A Psalm of David." is left off): "How long, O LORD? Will You forget me forever? How long will You hide Your face from me?"
- **Psalm 13:5** (shown on screen): "But I have trusted in Your loving devotion; my heart will rejoice in Your salvation."
- **1 Kings 19:4** (spoken inside a line, not a scripture card): "I have had enough, LORD". The rest of the verse, Elijah's request to die, is not quoted (as the ledger's "silent 4" row and the old film do).
- **1 Kings 19:5** (shown on screen, first sentence): "Then he lay down under the broom tree and fell asleep."
- **1 Kings 19:12** (spoken, last sentence): "And after the fire came a still, small voice."
- **Mark 15:34** (spoken, Jesus' words only): "My God, My God, why have You forsaken Me?"
- **Psalm 34:18** (shown on screen): "The LORD is near to the brokenhearted; He saves the contrite in spirit."
- **Psalm 13:6** (spoken): "I will sing to the LORD, for He has been good to me."

## Claims, by chapter

**quiet**
- "Feeling far from God is not the same as being far from him" (also the titleCard): Wisdom topic, `framing`, word for word; old film frame "quiet"; ledger "silent 1".
- The pointer to the other film ("why we can't see God at all"): the batch's sister film why-cant-i-see-god; no claim from it is made here.

**how-long**
- David asks "How long?" four times: Psalm 13 notes, `summary` ("Four times David asks") and `literary` ("The fourfold 'How long'").
- God's face meant his favor and presence; to be forgotten by God is to be left without help: Psalm 13 notes, `cultural`.
- David was not doubting God was there but protesting an absence he felt; "The lament was an act of faith, not its collapse." (word for word): Wisdom topic, `cultural`; old film frame "how-long"; ledger "silent 2".

**shape**
- The lament form described by scholars "since Hermann Gunkel": complaint, petition, trust and vow of praise; each section shorter than the one before; the turn comes with "But" in verse 5: Psalm 13 notes, `literary`.
- Trust declared with no change in circumstances reported: Psalm 13 notes, `summary`; old film frame "trust"; ledger "silent 3".
- Chesed, "loving devotion, God's loyal, covenant-keeping love": Psalm 13 notes, `words` (H2617A).

**forced**
- The three readings of the quick turn (a priest's or prophet's word of assurance in worship; a change inside the one praying; the psalm compressing what may take a long time, "a prayer that may be prayed many times before the ending feels true"); the complaint stays in the psalm, trust spoken alongside it, not in place of it: Psalm 13 notes, `hard`. No reading is chosen. (The film says "a priest"; the note says "a priest or prophet".)

**elijah**
- Fire on Carmel just before; one threat from Jezebel; he ran: 1 Kings 19 notes, `story` and `summary`; old film frame "elijah" ("ran for his life into the wilderness").
- Exhaustion and fear: 1 Kings 19 notes, `hard` ("Exhaustion after great effort, fear of a real threat").
- The broom tree: 1 Kings 19:4-5; notes, `cultural`.
- The Bible does not criticize the prayer or hide it; rest, food, water and a second meal before any words: 1 Kings 19 notes, `hard`; ledger "silent 4". (The film says "sleep" for the note's "rest"; the note's `doctrines` suffering entry says "sleep, food, and water".)

**whisper**
- Horeb, the mountain of God; not in the wind, the earthquake or the fire: 1 Kings 19 notes, `summary`; BSB 1 Kings 19:11-12; ledger "silent 5".
- Demamah: "literally a voice (or sound) of thin silence, a deliberately paradoxical expression"; translations vary between "a still, small voice, a gentle whisper, and a sound of sheer silence": 1 Kings 19 notes, `words` (H1827).
- A question, new purpose, the news he is not alone; seven thousand who have not bowed to Baal: 1 Kings 19 notes, `hard` and `summary`. ("Still faithful" is the film's plain wording for "have not bowed to Baal"; `doctrines` church entry: "Elijah's belief that he alone remained faithful was false".)

**night**
- "The church has named this experience for centuries"; John of the Cross, Spanish mystic, sixteenth century, "the dark night of the soul", the felt absence "a stage of love being purified, not a punishment": Wisdom topic, `historical`.
- Mother Teresa "served the dying in Calcutta, lived decades in this dryness and kept serving anyway": Wisdom topic, `historical`. (The topic's further clause, "which the church now reads as faithfulness, not failure", is left out.)
- The closing question is the film's own, a turn to the viewer, not a claim.

**cross**
- Jesus prayed the first line of Psalm 22, "Israel's fullest prayer for the moment when God seems gone"; the Son of God took that cry onto his own lips; Psalm 22 at its lowest point breaks off with the declaration that God has answered; raised on the third day: old film frame "cross"; ledger "silent 6" (which cites the Study Bible's Psalm 22 notes). Psalm 13 notes, `christ`, also says Jesus cried out the opening words of Psalm 22 on the cross.

**keep**
- "No one can promise when the quiet will lift. The psalm gives no date for the morning.": the film's own honest limit, resting on Psalm 13 notes, `hard` (the psalm "compresses what in real life may take a long time"). No promise is made that any feeling returns on a schedule.
- Don't measure God's nearness by feelings, which rise and fall with sleep, grief and the weather; keep the practices when the warmth is gone; tell one honest believer where you are; read the psalms of absence, written by people who felt exactly this and were not cast off: Wisdom topic, `application`; old film frame "near"; ledger "silent 7".

**close**
- Psalm 13 ends with a vow to sing and a verb in the past tense ("the LORD has been good to me"): Psalm 13 notes, `literary`.
- "The complaint is still there. So is the trust.": Psalm 13 notes, `hard` ("The ending is not a denial of the complaint; the complaint stays in the psalm. Trust is spoken alongside it").

## Notes

- Care line: the old film's `care` ("Waiting can be hard, especially waiting for something to get better at home, or for a prayer to be answered. ...") stays on the page word for word and is not in the narration. The 1 Kings 19 notes' crisis sentence (988) is likewise left on its own page, not narrated.
- Where readers differ (how Psalm 13 turns so fast; how to translate 1 Kings 19:12), the views are named and none is chosen.
- The philosophical hiddenness argument (Schellenberg and Pascal) belongs to the film "Why can't I see God?" and is mentioned here only in passing, without names.
