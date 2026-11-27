# Sacrifice: why blood?: the facts in the script, and where each was checked

This film rebuilds the Bible Explorer film `client/public/explorer/films/why-blood.json` (rows "why-blood 1, 2" to "why-blood, left out" in `docs/work/elite/explorer-ledger.md`). The words are new. Claims beyond the old film come only from the Study Bible's atonement doctrine page (`client/public/bible/doctrines/atonement.json`) and the Study Bible notes on Leviticus 16 and 17 and Hebrews 9 and 10 (`client/public/bible/notes/leviticus/16.json`, `17.json`, `hebrews/9.json`, `10.json`, and their `verses/` files). The wisdom topic guilt-and-conscience was read and not used.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27.

- **Hebrews 10:4** (spoken): "it is impossible for the blood of bulls and goats to take away sins."
- **Leviticus 17:11** (spoken): "For the life of the flesh is in the blood, and I have given it to you to make atonement for your souls upon the altar"
- **Leviticus 16:30** (shown on screen): "because on this day atonement will be made for you to cleanse you, and you will be clean from all your sins before the LORD."
- **Micah 6:8** (spoken): "And what does the LORD require of you but to act justly, to love mercy, and to walk humbly with your God?"
- **Hebrews 9:12** (spoken): "He entered the Most Holy Place once for all by His own blood, thus securing eternal redemption."
- **Hebrews 10:18** (spoken): "And where these have been forgiven, an offering for sin is no longer needed."
- Spoken inside a line, not a chapter verse: "I desire mercy, not sacrifice" (Hosea 6:6, BSB; quoted in atonement.json, ot section) and "I have given it to you" (Leviticus 17:11).

## Facts

| Script claim | Source |
|---|---|
| Blood runs through the Bible | Old film, frame "question" (older) |
| Kant, 1793: guilt is the most personal of all debts, cannot be transferred like a money debt | `leviticus/16.json`, hard[0] ("Religion within the Bounds of Mere Reason (1793)") |
| Sacrifice seen as primitive; the logic of appeasement | `leviticus/16.json`, teach.pitfalls ("treats the ritual as primitive"); atonement.json, errors ("bribe ... pagan appeasement") |
| Israel's neighbors had rites for cleansing temples and carrying evil away | `leviticus/16.json`, historical (Ebla, Hittite, Babylonian rites) |
| Hebrews raises the objection itself | `leviticus/16.json`, hard[0] ("the New Testament raises it itself ... Hebrews 10:4") |
| Leviticus has no incantations, no demons to appease, no magic | `leviticus/16.json`, historical, last sentence of paragraph 2 |
| Blood stands for life; blood poured out is a life given | Old film, frame "life"; `hebrews/9.json`, cultural; `leviticus/17.json`, christ |
| Not a bribe to a reluctant god but a gift God appoints, so he can live among a sinful people without consuming them | atonement.json, ot section, paragraph 2 (nearly word for word); ledger row "why-blood 1, 2" |
| Five offerings: burnt, grain, peace (shared meal), sin (Milgrom: purification offering), guilt (with restitution) | atonement.json, ot section, paragraph 2 |
| Offerings covered unintentional sins; no sacrifice for defiant sin; repentance and confession opened the way to mercy | atonement.json, ot section, paragraph 2 (Numbers 15:30-31) |
| Day of Atonement once a year; high priest alone, plain linen, behind the veil | `leviticus/16.json`, summary and cultural; atonement.json, ot paragraph 3 |
| Sin stains the place where God lives | `leviticus/16.json`, cultural ("pollute the place where God dwells, the way smoke stains a house") |
| Milgrom compared the sanctuary to Dorian Gray's portrait, which records its owner's corruption | `leviticus/16.json`, interpretation, paragraph 4 (his 1976 article) |
| Blood cleansed the sanctuary; sins confessed over a second goat, not killed, sent into the wilderness; cleansed and carried away | atonement.json, ot paragraph 3; `leviticus/16.json`, summary and doctrines (atonement) |
| Prophets: sacrifice without a changed heart is worthless; Hosea 6:6; Micah asks about thousands of rams | atonement.json, ot paragraph 4 |
| The prophets didn't abolish the altar; refused to let ritual replace repentance | atonement.json, ot paragraph 4 (nearly word for word) |
| The Mishnah: the day does not atone for a wrong against a neighbor until reconciled | `leviticus/16.json`, interpretation, paragraph 1 (m. Yoma 8:9, Rabbi Eleazar ben Azariah) |
| High priest went in once a year, never without blood; repeated every year | `leviticus/16.json`, christ (Hebrews 9:7); `hebrews/9.json`, summary |
| Repetition a confession; the sacrifices couldn't cleanse the conscience | Old film, frame "covenant" (older); `hebrews/10.json` verses 2-3 note ("repetition proves inadequacy"); `hebrews/9.json`, summary and words (suneidesis) |
| Christ priest and sacrifice at once | `hebrews/9.json`, doctrines (atonement); atonement.json, nt paragraph 3 |
| No chair in the tabernacle; priests stood because the work was never finished; Christ sat down; a seated priest meant a completed sacrifice | `hebrews/10.json`, cultural |
| After the temple fell in AD 70, the offerings ceased and Jews kept the day through prayer, fasting and repentance | `leviticus/16.json`, historical, end of paragraph 3 |
| No council ever defined one theory | atonement.json, history, first sentence |
| Penal substitution; satisfaction after Anselm (Cur Deus Homo, 1098); Christus Victor; moral influence; governmental view of Hugo Grotius | atonement.json, differ (five views) and history (Anselm 1098, Grotius 1617) |
| C. H. Dodd, 1931, expiation; Leon Morris, 1955, propitiation; many now hold both, and that God provides the sacrifice | atonement.json, nt paragraph 2 |
| Answer to Kant: not a transfer between strangers but the act of the one who is both God and representative head of his people | `leviticus/16.json`, hard[0], paragraph 2 |
| In Leviticus, God gives the blood | Leviticus 17:11; atonement.json, errors |

## Notes

- Animal death is named ("a life given", "wasn't killed") and never described. No blood is described.
- The care line ("This moving picture tells of a real death, and of our sin...") stays on the film's page and is not in the narration.
- The five atonement views are named in one line each; the film takes no side and says so. The Supper's relation to the one sacrifice (in the old film's differ note) is left on the page.
- Left out to avoid repeating siblings: Abel, Noah, Abraham and the ram, the Passover, the Lamb of God, Isaiah 53, Psalm 51 (the-lamb), and the New Testament pictures and the Father and Son line (why-jesus-died).
