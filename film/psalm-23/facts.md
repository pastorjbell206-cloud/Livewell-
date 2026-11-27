# Psalm 23: the LORD is my shepherd: the facts in the script, and where each was checked

Written on 2026-11-27 for batch 15. Sources, and nothing else: the old Bible Explorer film `client/public/explorer/films/psalm-23.json` (older captions) with its rows in `docs/work/elite/explorer-ledger.md` ("psalm 1 to 6", "psalm 7", "psalm, care and left out"); the Study Bible notes `client/public/bible/notes/psalms/23.json` (there is no `psalms/verses/23.json`); and the John 10 notes `client/public/bible/notes/john/10.json` with `client/public/bible/notes/john/verses/10.json` (verses 11 and 12-13).

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27.

- **Psalm 23:1** (spoken): “The LORD is my shepherd; I shall not want.”
- **Psalm 23:1** (shown on screen, chapter `david`): “A Psalm of David.” The narration also says the heading's words.
- **Psalm 23:2** (spoken): “He makes me lie down in green pastures; He leads me beside quiet waters.”
- **Psalm 23:3** (spoken): “He restores my soul; He guides me in the paths of righteousness for the sake of His name.”
- **Psalm 23:4** (spoken): “Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me”
- **Psalm 23:4** (spoken): “Your rod and Your staff, they comfort me.”
- **Psalm 23:5** (spoken): “You prepare a table before me in the presence of my enemies.”
- **Psalm 23:5** (spoken): “You anoint my head with oil; my cup overflows.”
- **Psalm 23:6** (spoken): “Surely goodness and mercy will follow me all the days of my life”
- **Psalm 23:6** (spoken): “and I will dwell in the house of the LORD forever.”
- **John 10:11** (spoken): “I am the good shepherd. The good shepherd lays down His life for the sheep.”
- Paraphrased, not quoted: “in order to take it up again” (BSB John 10:17 has “I lay down My life in order to take it up again”; John 10 notes, outline 17-18 and christ).

## The claims

| Claim | Source |
|---|---|
| Psalm 23 is the best-known psalm in the Bible | `psalms/23.json`, story ("It is the best-known psalm in the Bible") |
| Kings in the ancient Near East called themselves shepherds; Hammurabi, Babylonian king of the eighteenth century BC, in the prologue to his laws | `psalms/23.json`, historical, paragraph 2; also `john/10.json`, cultural, paragraph 3 |
| God's charge to David: shepherd his people Israel | `psalms/23.json`, historical (2 Samuel 5:2) |
| Psalm 23 turns the royal image around: the king is the sheep | `psalms/23.json`, historical; old film, frame `shepherd`, older ("a king calling himself a sheep") |
| Heading: A Psalm of David; traditional readers note David was a shepherd before he was king | `psalms/23.json`, historical (1 Samuel 16:11, 17:34-35) |
| Many modern scholars read "of David" as marking a collection rather than authorship | `psalms/23.json`, historical |
| No event is named; prayed in every generation because it isn't tied to one | `psalms/23.json`, historical |
| Shepherding in Judah hard, dangerous work in dry country; pastures and water had to be found, sometimes across long distances | `psalms/23.json`, cultural; old film, frame `pastures`, older; explorer-ledger "psalm 1 to 6" |
| Sheep won't lie down unless fed and unafraid | Same |
| "What you want most" (viewer question) | `psalms/23.json`, questions[0] |
| Paths of righteousness can mean right paths, tracks that lead where they should, not dead ends | `psalms/23.json`, cultural |
| For his name's sake: the shepherd is faithful to his own name | `psalms/23.json`, doctrines, covenant |
| The valley a ravine where danger hides; tsalmavet traditionally "shadow of death", may mean deep darkness | `psalms/23.json`, words H6757 |
| The grammar turns from speaking about God to speaking to him at the darkest point, near the center of the poem | `psalms/23.json`, literary; old film, frame `valley`, older; ledger "psalm 1 to 6" |
| Not a road around the valley but company in it (also the title card) | Old film, frame `valley`, older |
| Rod a club for driving off predators; staff a longer stick for guiding and rescuing | `psalms/23.json`, cultural; old film, frame `rod` |
| Comfort is not softness; someone armed and attentive between the flock and whatever hunts it | Old film, frame `rod`, older |
| The picture shifts from shepherd to host | `psalms/23.json`, summary and literary; old film, frame `table` |
| A host who received a guest into his tent was bound to protect him, even from pursuers; a fugitive received as honored guest while enemies watch, unable to act | `psalms/23.json`, cultural, paragraph 2 |
| Table spread while enemies are still present (viewer question) | `psalms/23.json`, questions[2]; story ("with his enemies still present") |
| Oil on the head a mark of welcome and honor; overflowing cup lavish generosity | `psalms/23.json`, cultural (Luke 7:46) |
| Chesed: loving devotion, the loyal love God has pledged to his people, love that holds when they have no claim on it | `psalms/23.json`, words H2617A |
| Follow can mean pursue; reverses the enemies' pursuit | `psalms/23.json`, literary and words H2617A; old film, frame `house`, older |
| Hebrew as vocalized reads "I will return"; ancient Greek reads "dwell", a form spelled almost the same; both end at home in God's presence | `psalms/23.json`, words H7725G |
| The psalm that began in a field ends in a house | Old film, frame `house`, older |
| Prophets' promise that God himself would shepherd his scattered people and set one shepherd from David's line over them | `psalms/23.json`, story and christ (Ezekiel 34:11-16, 34:23); `john/10.json`, christ |
| Good (kalos): the shepherd as a shepherd ought to be | `john/verses/10.json`, verse 11 grammar |
| The hired hand runs when the wolf comes | BSB John 10:12; `john/verses/10.json`, 12-13 |
| He lays down his life in order to take it up again | BSB John 10:17; `john/10.json`, teach outline 17-18 |
| The New Testament does not quote Psalm 23 directly; what it adds is that the shepherd who walks the valley went into death for his sheep | `psalms/23.json`, christ; old film, frame `good-shepherd`; ledger "psalm 7" |

## Notes

- Care line: the old film's line ("If someone you love has died, or if thinking about death makes you afraid ...") stays on the page, word for word, and is not in the narration. The narration names grief once (chapter `valley`) and never describes death.
- Where views differ: authorship of "A Psalm of David" (traditional readers and many modern scholars) and the reading "return" or "dwell" are both given; no side is taken. Left out for length: the temple-or-tabernacle question on "the house of the LORD" (`psalms/23.json`, historical).
- "Centuries later" (between the prophets and Jesus) is a connective, not a sourced date.
- God and Christ are not drawn: the shepherd on screen is the shepherd of David's picture (ledger "psalm, care and left out").
