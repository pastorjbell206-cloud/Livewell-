# The king: the facts in the script, and where each was checked

Written on 2026-11-27 for batch 16, a "big idea" film tracing one theme through the Bible. Sources, and nothing else: the old Bible Explorer film `client/public/explorer/films/the-king.json` (older captions, its `differ` note) with its rows in `docs/work/elite/explorer-ledger.md` ("king 1" to "king 7", "king, differ", the films' quotation row) and the Kingdom stop that row "king 2" cites (`client/public/explorer/stops/kingdom.json`, story, older); the doctrine pages `client/public/bible/doctrines/kingdom.json` and `client/public/bible/doctrines/messiah.json`; and the Study Bible notes `client/public/bible/notes/1-samuel/8.json`, `client/public/bible/notes/2-samuel/7.json` and `client/public/bible/notes/isaiah/9.json`.

The old film's care line ("This moving picture tells of a real death, Jesus' death on the cross. ...") stays word for word on the film's page and is not in the narration. Jesus' death is named, not described. No biblical king is tied to any modern nation, party or ruler.

## Scripture (Berean Standard Bible)

Each quotation in a chapter's `scripture` field was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27.

- **Genesis 1:26** (spoken): “Let Us make man in Our image, after Our likeness, to rule over the fish of the sea and the birds of the air”
- **1 Samuel 8:7** (spoken): “it is not you they have rejected, but they have rejected Me as their king”
- **1 Samuel 15:22** (spoken): “obedience is better than sacrifice”
- **1 Samuel 16:7** (spoken): “man sees the outward appearance, but the LORD sees the heart”
- **2 Samuel 7:16** (spoken): “Your house and kingdom will endure forever before Me, and your throne will be established forever.”
- **Psalm 89:39** (spoken): “You have renounced the covenant with Your servant and sullied his crown in the dust.”
- **Isaiah 11:1** (spoken): “a shoot will spring up from the stump of Jesse”
- **Zechariah 9:9** (spoken): “See, your King comes to you, righteous and victorious, humble and riding on a donkey”
- **Mark 10:45** (spoken): “For even the Son of Man did not come to be served, but to serve, and to give His life as a ransom for many.”
- **Revelation 19:16** (shown on screen): “And He has a name written on His robe and on His thigh: KING OF KINGS AND LORD OF LORDS.” The narration says “King of kings and Lord of lords”. This verse is not quoted in any of the listed sources; it was added because the task named "King of kings", and copied from `client/public/bible/text/revelation/19.json`.

Bible words spoken outside the `scripture` fields, each checked by hand against the BSB file:

- “Appoint a king ... like all the other nations” (1 Samuel 8:5, BSB “appoint a king to judge us like all the other nations”; shortened, said as the elders' words).
- “Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace” (Isaiah 9:6, exact).
- “Hosanna to the Son of David” (Matthew 21:9, exact; in the old film and its quotation row).
- “The King of the Jews” (Mark 15:26, BSB “THE KING OF THE JEWS”; spoken, so not in capitals; in the old film).
- “both Lord and Christ” (Acts 2:36, exact; in `messiah.json`, nt).
- “His kingdom is not of this world” (John 18:36, BSB “My kingdom is not of this world”; reported speech; in the old film).
- “a head taller than anyone” (1 Samuel 9:2, BSB “a head taller than any of the people”; paraphrase, via the Kingdom stop).
- “King of kings and Lord of lords” (Revelation 19:16, above).

## The claims

| Claim | Source |
|---|---|
| Humanity made in God's image to govern his world under him, as his representatives | `kingdom.json`, ot, paragraph 1 ("Human beings were made to govern the world under God, as his representatives"); old film frame `god-king`, older; ledger "king 1" |
| The rest of the story is that rule refused, then reclaimed | `kingdom.json`, definition; old film frame `god-king`, older |
| The request comes near the end of the eleventh century BC, under Philistine pressure | `1-samuel/8.json`, historical, paragraph 1 |
| The elders come to Samuel and ask for a king like all the other nations | `1-samuel/8.json`, summary; BSB 1 Samuel 8:5; old film frame `shepherd`; ledger "king 2" |
| "What did they really want? Safety? To fit in?" (viewer question) | `1-samuel/8.json`, historical (the stated reason is military) and questions[0] (security and identity) |
| God says they have rejected him as king, and gives them one anyway | BSB 1 Samuel 8:7, 22; `1-samuel/8.json`, summary and literary; old film frame `shepherd`, older |
| Deuteronomy 17 had allowed a king | `1-samuel/8.json`, cultural, paragraph 1, and hard (q: "If Deuteronomy 17 allows Israel to have a king ...") |
| Readers differ: the fault was motive (to be like the nations); or timing (grasping before God's time and chosen king); or, for many critical scholars, Samuel combines sources with different attitudes to the monarchy | `1-samuel/8.json`, hard, answer, the three views in order |
| The readings agree: the request came from a failure to trust God as king, and God took up the institution anyway | `1-samuel/8.json`, hard, last sentence ("Across these views ...") |
| Saul looks the part, a head taller; under pressure takes things into his own hands; Samuel: obedience is better than sacrifice | Kingdom stop, story, older, paragraph 1 (cited by ledger "king 2"); BSB 1 Samuel 9:2; 15:22 |
| The next king is the youngest of Jesse's sons, out with the sheep; God sees the heart | Kingdom stop, story, older, paragraph 2; BSB 1 Samuel 16:7, 11-13; old film frame `shepherd`, older; ledger "king 2" |
| Shepherd was an ancient royal title; Hammurabi of Babylon calls himself shepherd of his people in the prologue to his laws | `2-samuel/7.json`, cultural, paragraph 2 |
| In Israel the flock still belonged to God | `2-samuel/7.json`, words H5057 nagid ("David's authority is delegated, and the people remain God's") and cultural, paragraph 2 |
| David wants to build God a house; God will build David a house, a royal line | `2-samuel/7.json`, summary and literary; old film frame `promise`, older |
| Bayit means house, palace, temple and dynasty | `2-samuel/7.json`, literary, paragraph 1, and words H1004M (the film names three of the four senses) |
| Most scholars take the Tel Dan inscription (second half of the ninth century BC) as the earliest known reference to the house of David | `2-samuel/7.json`, historical, paragraph 2 |
| Solomon turned to other gods; many kings led the people to idols | Kingdom stop, story, younger, paragraph 6 ("when Solomon was old, he turned away to other gods"); ledger row "Solomon in old age" (BSB 1 Kings 11:3-13); old film frame `empty`, older; ledger "king 4" |
| The north fell to Assyria in 722 BC; Judah to Babylon in 587 or 586 BC | `kingdom.json`, ot, paragraph 3; `messiah.json`, ot, paragraph 3 |
| No son of David sat on the throne again | `2-samuel/7.json`, hard q1 ("no descendant of David ruled again"); old film frame `empty`, older ("even after the people came home no son of David sat on it") |
| Psalm 89 voices the objection itself | `2-samuel/7.json`, hard q1 ("The objection is voiced first by Scripture itself") |
| Skeptics: royal propaganda that history disproved; Jewish and Christian readers hold that God's commitment outlasts the failed kings, and part over how it is fulfilled | `2-samuel/7.json`, hard q1, both paragraphs |
| In the dark the prophets promise a king to come | Old film frame `empty`, older ("Yet in the dark the prophets spoke of a king to come") |
| Isaiah's child on David's throne with the four names; a shoot from the stump of Jesse; the tree cut down | BSB Isaiah 9:6-7; 11:1; `isaiah/9.json`, summary; `2-samuel/7.json`, hard q1 ("a hope that implies the tree has been cut down") |
| Jewish tradition reads Isaiah's child as Hezekiah (Talmud, Rashi, Ibn Ezra) or as the Messiah (Targum); Christians confess him as Jesus | `isaiah/9.json`, interpretation, paragraph 1; doctrines (messiah note) |
| Messiah means anointed one; the Greek christos gives "Christ" | `messiah.json`, definition, paragraph 2 |
| Zechariah's king humble on a donkey, a king of peace rather than of chariots | `messiah.json`, ot, paragraph 3 |
| Jesus entered Jerusalem that way; the crowds shouted "Hosanna to the Son of David" | Old film frame `son-of-david`, older; ledger "king 5"; `messiah.json`, nt, paragraph 2 (Matthew 21:4-5) |
| Soldiers crowned him with thorns; the charge over the cross "THE KING OF THE JEWS" | Old film frame `cross`, older; ledger "king 6" (Roman soldiers named; no people blamed); BSB Mark 15:17, 26 |
| By every expectation of the time, a crucified Messiah was a contradiction | `messiah.json`, nt, paragraph 2 (word for word) |
| Samuel's warning: the king will take; Jesus came not to be served but to serve | `1-samuel/8.json`, literary ("organized around the verb take") and christ ("the king who takes ... the true King, who gives"); old film frame `cross`, older |
| On the third day God raised him | Old film frame `cross`, older; ledger "king 6" |
| Peter: God made him both Lord and Christ | `messiah.json`, nt, paragraph 3 (Acts 2:36) |
| His kingdom is not of this world: not advanced by the world's weapons; no nation or party | `kingdom.json`, nt, paragraph 3 ("does not come from the world's sources of power or advance by its weapons") and errors ("The church has rejected any teaching that identifies God's kingdom with a nation, empire, party, or political program"); old film frame `kingdom`, older ("not a territory or a party"); ledger "king 7" |
| Christians differ on how the kingdom relates to the church now | Old film `differ`; ledger "king, differ"; `kingdom.json`, differ |
| The rule given to humanity at the start is restored in Christ and shared with his people | `kingdom.json`, nt, last sentence ("The dominion given to humanity in Genesis 1 is restored in Christ and shared with his people") |
| Title card: "Samuel's king would take. This King gives." | `1-samuel/8.json`, christ ("its portrait of the king who takes throws into relief the one the New Testament calls the true King, who gives") |

## Notes

- Views are named without a side: the monarchy as God's will or concession (three readings from the 1 Samuel 8 notes), the Davidic promise (skeptic, Jewish and Christian readings from the 2 Samuel 7 notes), Isaiah's child (Jewish and Christian readings from the Isaiah 9 notes), and the kingdom and the church now (the old film's `differ`).
- Viewer moments: "Pause here and ask yourself what they really wanted" (chapter `nations`); "So was the monarchy God's will, or a concession?" (chapter `differ`); "Pause and ask: what kind of king rides a donkey?" (chapter `donkey`).
