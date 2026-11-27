# David and Goliath: the facts in the script, and where each was checked

Written on 2026-11-27 for batch 15. Sources, and nothing else: the old Bible Explorer film `client/public/explorer/films/david-and-goliath.json` (older captions) with its rows in `docs/work/elite/explorer-ledger.md` ("david 1, 2" to "david 7", "david, left out", "david, care"); the Study Bible notes `client/public/bible/notes/1-samuel/17.json` and their plain reading `client/public/bible/notes/1-samuel/plain/17.json`; the 1 Samuel introduction `client/public/bible/notes/1-samuel/intro.json`; and the wisdom topic `client/public/wisdom/entry/courage.json`. There is no `verses/17.json` for 1 Samuel.

The old film's care line ("This part of the story has war and death in it. ...") stays on its page and is not in the narration. Goliath's death is named ("the champion falls facedown"), never described: no wound, no beheading, no head carried to Jerusalem.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27.

- **1 Samuel 17:3** (spoken): "The Philistines stood on one hill and the Israelites stood on another, with the valley between them."
- **1 Samuel 17:11** (spoken, trimmed): "Saul and all the Israelites were dismayed and greatly afraid."
- **1 Samuel 17:4** (shown on screen): "He was six cubits and a span in height". The narration gives the same measure.
- **1 Samuel 17:26** (spoken): "Just who is this uncircumcised Philistine, that he should defy the armies of the living God?"
- **1 Samuel 17:37** (spoken): "The LORD, who delivered me from the claws of the lion and the bear, will deliver me from the hand of this Philistine."
- **1 Samuel 17:47** (spoken): "it is not by sword or spear that the LORD saves; for the battle is the LORD's"
- **1 Samuel 17:50** (spoken, with the narration adding "without a sword in his hand" from the same verse): "Thus David prevailed over the Philistine with a sling and a stone"
- **1 Samuel 17:55** (shown on screen): "Abner, whose son is this young man?"
- **Hebrews 2:15** (spoken): "free those who all their lives were held in slavery by their fear of death." Cited by the 1 Samuel 17 note's `christ` section (Hebrews 2:14-15).
- Paraphrased, not quoted: 17:45 ("in the name of the LORD of Hosts", words used in a line), 17:46 ("the whole world will know that there is a God in Israel"), 17:33 ("You are just a boy").
- Title card: "The battle is the LORD's" (17:47).

## The story

| Claim | Source |
|---|---|
| The Valley of Elah runs from the hills of Judah toward the Philistine plain, a natural corridor/road for Philistine pushes inland | 17 note, `historical`; plain 17, passage 1-11 `hearers`; ledger "david 1, 2" |
| Saul chosen to fight Israel's battles, a head taller than his men | 17 note, `story` (8:20; 10:23); old film frame `valley`, older |
| For forty days he doesn't move | Old film frame `valley`, older; BSB 17:16 |
| Champion from Gath, morning and evening | Old film frame `giant`, older; BSB 17:4, 16 |
| The Hebrew word for champion is used only in this chapter; "man of the between", stepping into the space between two armies; one man representing his people | 17 note, `words` (H1143); plain 17, passage 1-11 `hearers` |
| Bronze helmet; armor of roughly 125 pounds (five thousand shekels); spear shaft like a weaver's beam | 17 note, `cultural`; BSB 17:5-7 |
| Six cubits and a span, about nine and a half feet, in the standard Hebrew; four cubits and a span in the Dead Sea Scrolls copy and the Greek; still a giant among men of that day | 17 note, `historical`; plain 17, 1-11 `hearers`. (The film gives no feet figure for four cubits; see below.) |
| The oldest Greek manuscripts lack stretches of the chapter (vv. 12-31, 55-58); it circulated in more than one form | 17 note, `historical`; intro, `date` (Samuel circulated in more than one form) |
| David the youngest of Jesse's eight sons; brings grain and bread to his brothers (the cheese was for the commander, so left out) | Old film frame `errand`; ledger "david 3, 4"; BSB 17:12-18 |
| Goliath shouts, the soldiers run, David asks | BSB 17:23-26; plain 17, 12-30 `happening` |
| What the soldiers hear as a threat to Israel, David hears as an insult to the living God | 17 note, `literary` (word for word); old film frame `errand` |
| Saul: you're just a boy; David answers with memory | Old film frame `armor`, older; BSB 17:33-37 |
| "Faith here is memory put to work in a new danger" | 17 note, `doctrines` (faith), word for word |
| The king's armor doesn't fit; David takes it off; five smooth stones | BSB 17:38-40; old film frame `armor` |
| The sling not a toy; trained slingers in ancient armies | 17 note, `cultural`; plain 17, 31-47 `hearers` |
| The center of the chapter is a speech, not a stone; Goliath curses by his gods; the name of the LORD of Hosts; so the whole world will know there is a God in Israel | Old film frame `name`, older; 17 note, `literary` ("the theological center of the chapter"); ledger "david 5, 6" |
| One stone; falls facedown; no sword in David's hand | Old film frame `stone`, older; BSB 17:49-50 |
| Israel, frozen for forty days, charges; David's fame grows, and Saul's jealousy | Old film frame `stone`, older; 17 note, `story` |
| Saul's question though David was already his harpist; Saul tormented and not recognizing him; the royal marriage promised to the victor's family, so a question about the father; many scholars: two accounts side by side; the text does not settle it | 17 note, `hard` (and plain 17, 48-58 `hard`) |
| "Readers have noticed this for centuries" (the film says "one old puzzle") | 17 note, `hard` |

## How it is read

| Claim | Source |
|---|---|
| Often read as believing in oneself, as if brave small people can beat big strong ones; the text says the opposite; David isn't trusting himself, he trusts the God whose name Goliath insulted | Plain 17, passage 31-47 `hearers` (last paragraph) |
| Some draw from David a courage rooted in knowing whose battle it is | Wisdom topic `courage.json`, verse 1 Samuel 17:45, `where` ("from knowing whose battle it was"); its `framing` |
| Others warn First Samuel is not a set of moral examples to copy | Intro, `reading` ("The book is not a set of moral examples in which every hero is to be copied") |
| A pattern filled out in Christ, though the chapter is a battle story, not an allegory; David fights for a people too afraid to fight and his victory becomes theirs; most readers are not David but the soldiers on the hillside, delivered by another | 17 note, `christ` (nearly word for word); old film frame `who`, older; ledger "david 7" |
| The New Testament presents Jesus defeating death and freeing his people (Hebrews 2:14-15) | 17 note, `christ` |
