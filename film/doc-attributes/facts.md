# Holy, loving, just: the facts in the script, and where each comes from

Every fact below is taken from one file, the Study Bible's doctrine page on the attributes of God: `client/public/bible/doctrines/attributes.json` (page `/study/bible/doctrines/attributes`). Section names are the file's own fields: **definition**, **ot**, **nt**, **keyTexts**, **history**, **differ**, **errors**, **life**. Scripture is the Berean Standard Bible, copied from `client/public/bible/text/`.

| Line | Fact | Source |
|---|---|---|
| "What is God like? Many have a quick answer. The God of the Old Testament is angry. The God of Jesus is kind." | Marcion's pattern "survives wherever the God of the Old Testament is imagined as wrathful and the God of Jesus as merely kind." | errors |
| "But the Old Testament itself says otherwise." | "Scripture gives the same character in both testaments: Exodus 34 is full of mercy". | errors, ot |
| "Christians speak of God's attributes, the Bible's ways of saying what God is like." | Near word for word from the first sentence. | definition |
| "He is holy, righteous, faithful, merciful, patient, and wise. All-powerful, all-knowing, present everywhere, eternal, and unchanging." | The file's list of eleven, in its order. The picture's ring has these eleven labels and no others. | definition |
| "They never pull against each other. His justice is always loving, and His love is always just and holy." | "His justice is always a loving justice and his love a just and holy love"; the oldest error "sets God's attributes against each other". | definition, errors |
| "Israel had just worshiped the golden calf when Moses asked to see God's glory." | "After Israel has worshiped the golden calf, Moses asks to see God's glory". | ot |
| "Then the LORD passed in front of Moses and called out." | "the LORD passes before him proclaiming"; the words are the BSB's own lead-in to Exodus 34:6. | ot; `exodus/34.json` |
| Exodus 34:6-7, spoken | BSB, word for word, from "The LORD, the LORD God" to "unpunished". The file calls it "the center of the Old Testament's teaching on God's character". | ot, keyTexts; `client/public/bible/text/exodus/34.json` |
| "Notice who heard it. A people who had just broken the covenant." | "The setting matters: God describes himself this way to a people who have just broken the covenant." | ot |
| "Mercy and justice stand together, but not evenly. Loving devotion to a thousand generations, judgment to the third and fourth." | "Mercy and justice are named together, and the proportion is telling, loving devotion to a thousand generations and judgment to the third and fourth." The picture draws 1,000 dots (40 by 25) against 4. | ot |
| "Loving devotion translates the Hebrew word chesed. It's loyal, committed love, most often within a covenant. No single English word catches it." | Chesed, "which the BSB renders 'loving devotion' and others 'steadfast love' or 'lovingkindness', is loyal, committed love, most often within a covenant, and no single English word catches it." The three renderings are the picture's three labels. | definition |
| "No description of God is echoed more in the Old Testament. Moses, Nehemiah, the psalmists, and Joel prayed it back to Him." | "This self-description echoes through the rest of the Old Testament more than any other" (Numbers 14:18, Nehemiah 9:17, Psalms 86:15, 103:8, 145:8, Joel 2:13); "Moses, Nehemiah, the psalmists, Joel, and Jonah all prayed by quoting God's own description of himself back to him". | ot, life |
| "Jonah even complained that God was exactly this merciful to Nineveh." | "Jonah's complaint that God has been exactly this merciful to Nineveh (Jonah 4:2)"; "God's character reaches Israel's enemies". | ot, keyTexts |
| "Isaiah heard the seraphim calling out, holy, holy, holy." | "Isaiah hears the seraphim cry, 'Holy, holy, holy is the LORD of Hosts' (Isaiah 6:3)". "Calling out" is the BSB verb in Isaiah 6:3. The picture's throne is empty. | ot, keyTexts |
| "In Hosea, that holiness shows itself as mercy." | "Hosea shows God's holiness expressed as mercy"; "Holiness shows itself as mercy" (Hosea 11:8-9). | ot, keyTexts |
| "John says the Word made flesh was full of grace and truth, and many hear an echo of loving devotion and faithfulness." | John 1:14; "many interpreters hear in the pairing an echo of the loving devotion and faithfulness of Exodus 34:6". The film keeps the hedge ("many hear"). | nt |
| "In Jesus, God's character is seen. His compassion on the crowds, His anger at the temple, His faithfulness to the cross." | The attributes "are seen in Jesus' compassion on the crowds, his anger at the temple, his patience with his disciples, and his faithfulness to the cross." The film leaves out the patience, for length. | nt |
| "At the cross, Paul says, God is both just and the one who justifies those who have faith in Jesus. Justice and mercy meet there." | "The cross is where the New Testament shows God's attributes held together most sharply"; Romans 3:25-26, "so as to be just and to justify the one who has faith in Jesus"; "His righteousness and his mercy meet in one act." Told, not quoted. Picture label: ROMANS 3:25-26. | nt, keyTexts |
| "John puts it in three words. God is love, a love defined by His sending His Son." | 1 John 4:8, "God is love", "a love defined not by our love for him but by his sending his Son (1 John 4:10)". "God is love" is shown on screen with its reference, 1 JOHN 4:8 · BEREAN STANDARD BIBLE. | nt, keyTexts; `1-john/4.json` |
| "That quick answer is old. In the second century, Marcion divided a just Creator from a loving Father." | "Marcion in the second century divided a just Creator from a loving Father". | errors |
| "Around the year 180, Irenaeus answered that the one God is both good and just." | "Irenaeus, writing around 180 against Marcion and the Gnostics, insisted that the one God is both good and just". | history |
| "The words to Moses are full of mercy, and Revelation is full of judgment. It's one character." | "Exodus 34 is full of mercy, and Revelation is full of judgment." | errors |
| "Christians differ here. How does God's steady character fit His real response to human choices?" | "readers ever since have had to decide how God's steady character relates to his real response to human choices." | ot |
| "In one chapter, the LORD regrets making Saul king, and Samuel says the Glory of Israel does not change His mind." | 1 Samuel 15:11 and 15:29, "One chapter holds God's response and his constancy together." The speakers are named as the Bible names them. | ot, keyTexts |
| "Classical theists, like Thomas Aquinas, say God is unchanging in His being, timeless, and not overcome by passions. Regret, they say, is true speech fitted to human understanding." | Classical theism: "immutable in his being and character, timelessly eternal, and impassible, meaning he is not acted on or overcome by passions"; defenders include Aquinas; "Scripture's language of God's regret or grief is true but accommodated speech, fitted to human understanding". | differ (first view) |
| "Others, like Nicholas Wolterstorff, see God's eternity as endless time, because the Bible's God speaks, waits, and hears prayer." | God everlasting: eternity as "endless duration in which he genuinely acts, responds"; Wolterstorff, *God Everlasting* (1975); "the Bible's God speaks, waits, hears prayers, and acts in history". | differ (second view) |
| "Still others, like Jürgen Moltmann, say God truly suffers, from love freely chosen. They point above all to the cross." | Divine passibility: "God genuinely suffers, not from weakness but from love freely chosen"; Moltmann, *The Crucified God* (1972); defenders point to several texts "and above all to the cross". | differ (third view) |
| "Believe God is powerful but not quite good, and you'll obey out of fear. Believe He's good but not quite able, and you'll pray without hope." | "Someone who believes God is powerful but not quite good will obey out of fear; someone who believes he is good but not quite able will pray without hope." | life |
| "Scripture holds them together. His power is always the power of His goodness." | "Scripture holds the attributes together so that a person can trust God's power because it is always the power of his goodness". | life |
| "In grief, His faithfulness is the reason to keep speaking to Him. In guilt, His mercy is the reason to return. In confusion, His wisdom is the reason to wait." | Word for word, apart from "keep speaking to him". | life |
| "At the Bible's end, the four living creatures take up Isaiah's cry." | "Revelation closes the canon"; the living creatures' words repeat "Isaiah's vision and adding God's eternity". "Four" is from the BSB text of Revelation 4:8 itself. | nt; `revelation/4.json` |
| Revelation 4:8, spoken | BSB, word for word, from "Holy, Holy, Holy" to "to come!" (the exclamation mark is the BSB's). | nt; `client/public/bible/text/revelation/4.json` |
| "The God who is faithful and cannot lie will keep what He has promised." | "the God who does not change and cannot lie will keep what he has promised"; he "cannot lie" (Titus 1:2) and "remains faithful" (2 Timothy 2:13). See the note below on "faithful". | life, nt |
| Closing card "Holy love, and loving holiness." | "The Bible's God is holy love and loving holiness at once." | errors |

Picture labels that add a fact: THE GOLDEN CALF, ISRAEL (ot); HEBREW, and LOVING DEVOTION, STEADFAST LOVE, LOVINGKINDNESS, LOYAL, COMMITTED LOVE, MOST OFTEN WITHIN A COVENANT (definition); EXODUS 34, MOSES, NEHEMIAH, THE PSALMISTS, JOEL, JONAH, NINEVEH, ISAIAH 6 · THE SERAPHIM, HOSEA 11 · HOLINESS AS MERCY (ot, life); JOHN 1 · THE WORD MADE FLESH, MANY HEAR AN ECHO, COMPASSION ON THE CROWDS, ANGER AT THE TEMPLE, FAITHFULNESS TO THE CROSS, JUST, THE ONE WHO JUSTIFIES, ROMANS 3:25-26 (nt); MARCION · SECOND CENTURY, A JUST CREATOR, A LOVING FATHER (errors); IRENAEUS · ABOUT 180 (history); 1 SAMUEL 15:11 · THE LORD REGRETS, 1 SAMUEL 15:29 · DOES NOT CHANGE HIS MIND (ot); the three panels' names, defenders and phrases (differ); REVELATION 4 · THE FOUR LIVING CREATURES and WAS · IS · IS TO COME (Revelation 4:8).

## For James

**Left out on purpose** (to keep the film near four minutes and on one line, from the quick answer to the one character):

- Genesis (Abraham's "Judge of all the earth", God Almighty, the Eternal God), the Law's "be holy because I am holy", Deuteronomy 32:4, Numbers 23:19, Psalms 89, 90, 139, 145 and 147, Job 42:2, Jeremiah, Lamentations ("great is Your faithfulness") and Malachi 3:6.
- Most of the Hebrew and all of the Greek vocabulary (qadosh, tsedeq, mishpat, 'emet, rachum, channun, the "nostrils" idiom behind "slow to anger", hagios, agapē and the rest). Only chesed is named.
- The Reformed division into incommunicable and communicable attributes, and the other traditions' ways of sorting them. Naming one sorting would have meant naming all of them.
- The word "simple" (God not made of parts). The definition uses that language, but the differ section shows it belongs to classical theism, so the film keeps it inside that view and does not say it in the narrator's voice.
- Most of the New Testament list (Matthew 5, Mark 10:18, Hebrews 1:3, Romans 5:8 and 11:33, Acts 17:25, James 1, 2 Peter 3:9, 1 John 1:5, Revelation 15 and 16), and Jesus' patience with His disciples.
- All of the history after Irenaeus: Justin, Augustine, Boethius, Anselm, Aquinas's order and analogy, the Fourth Lateran Council, Calvin, Westminster, Charnock, Schleiermacher, Barth, process theology and the recent retrieval of classical theism.
- The other errors: love as the only attribute, God as pure power, a finite God, prosperity teaching, and God as a very large human being.
- Most of the defenders the differ section names (Augustine, Paul Helm, Thomas Weinandy, William Lane Craig, Kazoh Kitamori), the texts each view cites (Genesis 6:6, Isaiah 63:9 with its alternative Hebrew reading), and the criticism the second and third views make of Greek philosophy.

**Views named without choosing** (the three views in the differ section, one named defender each, drawn as three panels of the same size and colour, none highlighted):

- **Classical theism** (Thomas Aquinas): God is unchanging in His being, timeless, and not overcome by passions. Regret is true speech fitted to human understanding.
- **God everlasting** (Nicholas Wolterstorff): God's eternity is endless time, because the Bible's God speaks, waits and hears prayer.
- **Divine passibility** (Jürgen Moltmann): God truly suffers, from love freely chosen, above all at the cross.

**Choices to check:**

- Exodus 34:6-7 is spoken from "The LORD, the LORD God" through "unpunished" and stops at the BSB's semicolon (the verse goes on, "He will visit the iniquity of the fathers ... to the third and fourth generations"). So the spoken line and its caption end without a full stop. The next line gives "the third and fourth" in the narrator's words.
- The last line says "The God who is faithful and cannot lie". The file has "does not change and cannot lie". The change is on purpose: coming right after three views on how God is unchanging, "does not change" could sound like the film siding with classical theism. "Faithful" is something all three views affirm (2 Timothy 2:13).
- The classical view is given as "unchanging in His being" rather than just "unchanging", because the other two views also affirm God's unchanging character.
- Joel is named among those who "prayed it back to Him", as the life section does. The ot section calls Joel 2:13 a call to repent.
- "At the cross, Paul says" is the narrator's framing of Romans 3:25-26 (Paul writes that God presented Christ as an atoning sacrifice). "Justice and mercy meet there" uses the file's word "meet", not "satisfied".
- Speakers are named as the Bible names them: "the LORD passed in front of Moses and called out", "the seraphim", "the Glory of Israel", "the four living creatures".
- Pronouns for God are capitalized (He, His), to match the example film and the BSB text on screen.

**Names to listen for** (hard for the voice): the LORD (should be read "the Lord", three times), chesed (KHEH-sed, with a throaty h, not "ch" as in church), Nehemiah (nee-uh-MY-uh), Nineveh (NIN-uh-vuh), seraphim (SAIR-uh-fim), Hosea (ho-ZAY-uh), Marcion (MAR-see-un), Irenaeus (eye-ren-AY-us), Thomas Aquinas (uh-KWY-nus), Nicholas Wolterstorff (WOL-ter-storf), Jürgen Moltmann (YUR-gen MOLT-mahn).
