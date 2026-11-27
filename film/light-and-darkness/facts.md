# Light and Darkness: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/light-and-darkness.json`, rewritten as a "big idea" film that follows the light thread alone. Its sources are the old film (older captions and think question; it has no differ note and no care line), its rows in `docs/work/elite/explorer-ledger.md` (the "Light and darkness" table: rows 1 to 7, "quotations in captions", "pictures", "left out"), the doctrine pages `client/public/bible/doctrines/glory.json` and `god.json`, and the Study Bible notes in `client/public/bible/notes/` for Genesis 1, Exodus 10, 13 and 34, Psalm 27, Isaiah 9, John 8, Matthew 5 and Revelation 21. Exodus 34 and Psalm 27 are stops the old film did not have; Exodus 27 (the lamp in the tent) was dropped to make room. Isaiah 60, John 1 and Revelation 22 notes were read but nothing in the script depends on them alone.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27.

- **Genesis 1:3** (spoken): "And God said, “Let there be light,” and there was light."
- **Genesis 1:16** (spoken): "the greater light to rule the day and the lesser light to rule the night"
- **Exodus 10:23** (spoken): "Yet all the Israelites had light in their dwellings." (the line also speaks the verse's opening words "No one could see anyone else")
- **Exodus 13:21** (spoken): "the LORD went before them in a pillar of cloud to guide their way by day, and in a pillar of fire to give them light by night" (the verse's opening "And" dropped)
- **Exodus 34:29** (spoken): "he was unaware that his face had become radiant from speaking with the LORD"
- **Psalm 27:1** (spoken): "The LORD is my light and my salvation" (stops before the verse's em dash)
- **Isaiah 9:2** (spoken): "The people walking in darkness have seen a great light" (trimmed to its first clause, as the old film did; "the land of the shadow of death" is left out)
- **John 8:12** (spoken): "I am the light of the world. Whoever follows Me will never walk in the darkness, but will have the light of life."
- **2 Corinthians 4:6** (spoken): "For God, who said, “Let light shine out of darkness,” made His light shine in our hearts"
- **Matthew 5:14** (spoken): "You are the light of the world"
- **Revelation 22:5** (spoken): "There will be no more night in the city"

Other Bible words in the narration, not in a scripture field:
- "darkness over the surface of the deep": BSB Genesis 1:2.
- "darkness covered Egypt for three days": BSB Exodus 10:22 (shortened from "total darkness covered all the land of Egypt for three days").
- "no one can see God's face and live": BSB Exodus 33:20, as glory.json "ot" quotes it ("no one can see Me and live"); Moses' request, Exodus 33:18.
- "The Light shines in the darkness, and the darkness has not overcome it": BSB John 1:5 (one of the old film's quotations in captions).
- "the glory of God in the face of Jesus Christ": BSB 2 Corinthians 4:6, shortened from "the light of the knowledge of the glory of God in the face of Jesus Christ".
- "God is light, and in Him there is no darkness at all": BSB 1 John 1:5, quoted in god.json "nt" and attributes.json "nt".
- "see the good deeds and glorify the Father": BSB Matthew 5:16, paraphrased ("see your good deeds and glorify your Father in heaven").
- "the glory of God illuminates the city, and the Lamb is its lamp": BSB Revelation 21:23 (the sentence's opening "no need of sun or moon" also from 21:23).
- "they will see His face": BSB Revelation 22:4, quoted in glory.json "nt".
- The titleCard's first sentence is BSB John 1:5's last clause; "no night" echoes Revelation 21:25 and 22:5.

## Claims, by chapter

1. **Let there be light.** The Bible's first picture is darkness over the deep; "There is no battle": old film frame "first-light", ledger row 1, Genesis 1 note, cultural. The Enuma Elish is Babylon's creation epic, in which the god Marduk kills the sea goddess Tiamat and makes the sky from (one half of) her body: Genesis 1 note, historical. The killing is named, not described.
2. **Lights with a job.** "The sun and moon, worshiped across the ancient world, aren't even named; they are the greater light and the lesser light"; "Genesis gives the lights a job: to shine, to separate day from night, and to mark signs, seasons ..., days, and years": Genesis 1 note, cultural; ledger row 1. "Lamps": Genesis 1 note, teach outline ("unnamed lamps, set to serve by marking time").
3. **Light where they lived.** One of Pharaoh's official titles was Son of Re; Re was the sun god: Exodus 10 note, cultural. The darkness comes at Moses' gesture, lasts three days, leaves the Israelites with light where they live: Exodus 10 note, historical; ledger row 2. The Hebrew word (choshek) is the word for the darkness over the deep in Genesis 1:2; the plague is "a kind of reversal of creation for Egypt": Exodus 10 note, words. The death of the firstborn that follows is left out, as in the old film.
4. **A fire ahead.** God leads them himself: Exodus 13 note, doctrines ("he leads them himself, day and night"). "The light now does more than shine. It leads": old film frame "pillar"; ledger row 3 (the pillar as "the visible sign of God's presence", Exodus 13 note, words).
5. **A face that shone.** Moses asked to see God's glory and was told no one can see God's face and live: glory.json "ot"; Exodus 34 note, story. His face reflected a glory not his own: Exodus 34 note, cultural ("does not produce its own light but reflects the glory of the one he has spoken with") and christ ("Moses' face reflected a glory not his own"). "People who speak with God often reflect him without knowing it": Exodus 34 note, teach outline ("Those who speak with God reflect his glory, often without knowing it").
6. **My light.** Light an ancient image for life, safety and divine favor, darkness for danger and death; the psalm makes it a personal title, "my light": Psalm 27 note, cultural. The psalm faces an army without fear and yet cries out urgently in fear: Psalm 27 note, summary ("even if an army surrounds him") and doctrines ("able to face armies and yet still cry out urgently in fear"). Attributed to Psalm 27 only, not to David by name in the narration.
7. **A great light.** Zebulun and Naphtali were tribal territories in Galilee, the first parts of the kingdom to fall to Assyria, in Tiglath-pileser III's campaigns of 733 and 732 BC; "The first land to go dark is promised the first light": Isaiah 9 note, historical. Matthew quotes verses 1 and 2 when Jesus settles in Capernaum, in the region of Zebulun and Naphtali: Isaiah 9 note, christ; ledger row 5.
8. **At the feast of lamps.** Jesus speaks during or just after the Feast of Tabernacles; the great lamps were lit in the temple court (the Court of the Women, m. Sukkah 5:2-3), where the discourse is set; the lamps recalled the pillar of fire; following him as Israel followed the pillar: John 8 note, story, historical, words (G5457) and christ; ledger row 6. John's light and darkness are "not a dualism of two equal powers": the John book page, themes, as cited in ledger row 6.
9. **Light in the heart.** Paul's 2 Corinthians 4:6 deliberately echoes Genesis 1:3: glory.json "nt"; Genesis 1 note, christ. The light that shone on Moses' face shines "in the face of Jesus Christ": Exodus 34 note, christ. "In the New Testament, God's glory has a face and a history": glory.json "nt" (said as "Now the glory has one"). God is light: god.json "nt" (1 John 1:5); the only place the film calls God light, in Scripture's words.
10. **You are the light.** Spoken to disciples; the lamp was a small clay oil lamp and the "basket" (modios) a grain measure set over it: Matthew 5 note, cultural and teach outline ("his words are addressed to disciples"). Disciples are already light by Jesus' word, so that others see their deeds and glorify the Father, not them: Matthew 5 note, teach outline (verses 13 to 16). Old film frame "no-night" also quotes Matthew 5:14.
11. **No more night.** The city has no need of sun or moon, the glory of God its light and the Lamb its lamp: Revelation 21 note, summary and outline; old film frame "no-night"; ledger row 7. The request Moses was refused is granted, "They will see His face": glory.json "nt". Three views of that seeing, given equal room and no side taken: glory.json "differ" (the beatific vision, "from Augustine to Thomas Aquinas"; the Orthodox account "following Gregory Palamas", God's essence beyond every creature but God truly given in his uncreated energies; "Many Reformed writers, drawing on John Owen", the vision always mediated through the incarnate Son).

## Notes

- The old film has no care line (ledger "left out": the film tells of no death, war or loss), and none was written.
- Darkness in the film is the deep, night, a plague over a land, and the dark the light shines into. It is never a name for any people and nothing ties it to skin (ledger "left out" and "pictures"). The Dead Sea Scrolls' "sons of light and sons of darkness" are left out, as in the old film.
- God is called light only in Scripture's words (1 John 1:5; Psalm 27:1; Revelation 21:23); the pillar, Moses' face and the city's light need no figure for God.
- Left to the sibling films: Isaiah 49:6 and 60:1-3 and the nations coming to the light (all-nations); the return from exile in Isaiah 60 (exile-and-home); the Sermon on the Mount as kingdom teaching (kingdom-of-god). Isaiah 9:6's child, and the Jewish reading of him as Hezekiah (Isaiah 9 note, hard), are left to the chapter.
- Cut for length, though sourced: Shamash and the moon god Sin (Genesis 1 note, cultural); the Vulgate's "horned" Moses (Exodus 34 note, cultural); the lamps of the tent and the oil from every household (old film frame "lamp", Exodus 27 note).
