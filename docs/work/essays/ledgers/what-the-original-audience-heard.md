# Claims ledger: what-the-original-audience-heard

Essay: `docs/work/essays/what-the-original-audience-heard.md` ("What the First Readers of the Bible Actually Heard"). Rewrite of the live machine-generated essay of the same slug (read live on 2026-10-28 through `posts.getBySlug`; the static copy in `content/static-library.generated.json` matches it). Folds in `six-verses-we-memorized` ("The Bible Verses We Quote, and the Ones We Skip") and `the-whole-counsel` ("Why You Can't Cherry-Pick the Bible"), both read from the static library. Section: Reading the Bible in Its World. Writer's ledger, 2026-10-28.

Methods, in the words used below:

- **"ESV copy"** means the quotation was compared, by script and by eye, with the ESV text in github.com/lguenth/mdbible (cloned 2026-10-28 into the session scratchpad, commit fd66568; its `json/ESV.json` names itself "English Standard Version 2011"). The script (`scratchpad/tools/checkquotes.py`) pulled every double-quoted passage followed by a reference out of the essay and tested it against the cited verses with case, punctuation and spacing normalized: all 51 instances matched (three reported mismatches were the script pairing a quotation with the next reference in the sentence; those three, Romans 13:1, Leviticus 19:34 and Philippians 4:13's "all things", were then checked directly and match). The copy prints LORD as "Lord" and drops inner quotation marks. This is corroboration, not esv.org. Per NOTES.md, every ESV quotation still needs one recheck with James's ESV API key.
- **"Site STEP data"** means this repository's tagged original-language text, `client/public/bible/ch/<book>/<chapter>.json` (STEPBible morphology).
- **"Gutenberg Josephus"** means William Whiston's translation of Josephus, *The Antiquities of the Jews*, Project Gutenberg eBook #2848, cloned 2026-10-28 from github.com/GITenberg/Antiquities-of-the-Jews_2848 (commit 0188768), file `2848.txt`.
- **"Creeds.json"** means the confession texts at raw.githubusercontent.com/NonlinearFruit/Creeds.json/master/creeds/ (`london_baptist_1689.json`, `westminster_confession_of_faith.json`), downloaded 2026-10-28. A modern transcription, not a facsimile of the 1677 or 1689 printing.
- **"Search-checked"** means the claim matched WebSearch result summaries run on 2026-10-28 (sites named are those the results cited; no page was opened). Search budget used by this writer: 12 WebSearch calls (two of them for material later cut; see the end).
- **"Not checked (textbook)"** means standard reference knowledge that was not searched, marked so a verifier can test it.
- **"Interpretation"** marks a reading of a text or a general observation, not a factual claim.

## Opening: the reading at the Water Gate

- "Soon after Jerusalem's rebuilt walls were finished": Nehemiah 6:15 (wall finished in Elul), then 7:73 and 8:1–2 (the seventh month). ESV copy. "Soon after" follows the book's sequence; Nehemiah 8 gives no year (Search-checked: Alexander Maclaren's commentary infers the same year as the wall, an inference, not a date in the text).
- "in the fifth century before Christ": Search-checked (ESV Reformation Study Bible note on Nehemiah 2:1, March to April 445 BC; Bible Gateway Encyclopedia of the Bible, Nehemiah in the twentieth year of Artaxerxes I, 445). A Watchtower source dates the twentieth year to 455 BC; either way the fifth century. The essay gives no year.
- Nehemiah 8:1, "all the people gathered as one man into the square before the Water Gate"; asked Ezra the scribe to bring the Book of the Law of Moses. ESV copy.
- "It was the first day of the seventh month." Nehemiah 8:2. ESV copy.
- Wooden platform made for the purpose (Nehemiah 8:4); read from early morning until midday to men, women and all who could understand (8:2–3); the people stood when he opened the book (8:5). ESV copy (paraphrase, cited 8:2–5).
- Levites helped the people understand (Nehemiah 8:7). ESV copy.
- Nehemiah 8:8, "They read from the book, from the Law of God, clearly, and they gave the sense, so that the people understood the reading." ESV copy.
- "When the people understood it, they wept." Nehemiah 8:9 ("For all the people wept as they heard the words of the Law"). ESV copy.
- "the joy of the LORD is your strength" (Nehemiah 8:10). ESV copy.
- "Plenty of Christians who have never read Nehemiah know it by heart." Interpretation (general observation; no data sought). "One of the best-loved lines in the Bible" likewise.
- Spoken by "Nehemiah, Ezra and the Levites" to a weeping crowd: Nehemiah 8:9 names Nehemiah the governor, Ezra, and the Levites who taught the people; 8:10 begins "Then he said to them". ESV copy.
- Nehemiah 8:9, "This day is holy to the LORD your God; do not mourn or weep." ESV copy.
- Nehemiah 8:10, "Go your way. Eat the fat and drink sweet wine and send portions to anyone who has nothing ready, for this day is holy to our Lord. And do not be grieved, for the joy of the LORD is your strength." ESV copy.
- "feed the neighbors who had nothing": paraphrase of 8:10 ("send portions to anyone who has nothing ready") and 8:12. Interpretation.
- "had just been undone by the law": Interpretation of 8:9.

## Who the Bible Was First Written To

- John Walton, Old Testament scholar; his saying that the Bible was written for us but not to us (paraphrased, no quotation marks). Search-checked (Biola "Good Book Blog," 2021, "Scripture is for us but not to us"; IVP listing of Walton's *Wisdom for Faithful Reading*, 2023, which lists the principle; the tribute volume's editors trace it in print to his 2008 article "Interpreting the Bible as an Ancient Near Eastern Document" and say it recurs in the Lost World books and *Old Testament Theology for Christians*, 2017).
- A book of essays in his honor, 2020, took the saying as its title. Search-checked (*For Us, but Not to Us: Essays on Creation, Covenant, and Context in Honor of John H. Walton*, 2020; Biola academia.edu listing; digitalcommons.biola.edu faculty-books/491). The essay does not name the editors or publisher.
- "The crowd at the Water Gate didn't read the law. They heard it." Nehemiah 8:3 ("the ears of all the people were attentive"). ESV copy.
- "At the council in Jerusalem, James reminded the church": Acts 15:6 (apostles and elders gathered), 15:13 ("James replied"); Acts 15:21, "is read every Sabbath in the synagogues." ESV copy.
- 1 Thessalonians 5:27, "I put you under oath before the Lord to have this letter read to all the brothers." ESV copy.
- Colossians to trade letters with Laodicea: Colossians 4:16 (paraphrase). ESV copy.
- Revelation 1:3, "the one who reads aloud the words of this prophecy" and "those who hear". ESV copy.
- William Harris, 1989 study (*Ancient Literacy*), "set the terms of that argument"; figure "not much more than one in ten." Search-checked (Anne Kolb, 2018 results paper, hist.uzh.ch: Harris postulated "that little more than 10 % were literate," citing Harris 1989, 327–332; American Archivist review reads him as perhaps 15 percent for the empire; a Trinity Journal summary gives overall literacy below 15 percent; a review says the field was "considerably accelerated by W.V. Harris in 1989"). The book title is not given in the essay.
- "Some scholars think he set it too low." Search-checked (Kolb and others note literacy may exceed the commonly accepted 10 percent; a Muse review questions his Athenian range).
- 1 Corinthians 3:16, "Do you not know that you are God's temple and that God's Spirit dwells in you?" ESV copy.
- "every 'you' is plural": Site STEP data (`1-corinthians/3.json`: οἴδατε V-RAI-2P, ἐστε V-PAI-2P, ὑμῖν P-2DP).
- Corinth splitting into camps around favorite teachers: 1 Corinthians 3:4 ("I follow Paul," "I follow Apollos"). ESV copy. "God will destroy whoever destroys that temple": paraphrase of 3:17. ESV copy.
- "Read alone, the verse easily becomes advice about taking care of yourself." Interpretation.
- Chapter divisions most Bibles use go back to Stephen Langton, early thirteenth century; he became archbishop of Canterbury. Search-checked (Wikipedia, "Chapters and verses of the Bible": Langton's system, early 13th century, is the basis of modern chapters; holyjoys.org: Langton, an Archbishop of Canterbury, added chapters to the Vulgate around 1227). The essay gives no single year.
- New Testament verse numbers from a Greek New Testament published by the French printer Robert Estienne in 1551. Search-checked (Wikipedia; tbsbibles.org "Verse Divisions"; thecollector.com; printed in Geneva per one source, not stated in the essay). "French printer": Not checked (textbook; Estienne was a Paris printer who moved to Geneva).
- Geneva Bible of 1560 was the first English Bible to print chapters and verses together. Search-checked (Wikipedia; bible-researcher.com; the 1557 Geneva New Testament already had verse divisions, which is why the essay says "English Bible," the whole Bible).
- "Paul wrote letters. He never wrote a verse." Interpretation.

## When the Text Confronted Its First Hearers

- Luke 4:16, Nazareth, "where he had been brought up"; reading from the scroll of Isaiah, good news to the poor and liberty to the captives (Luke 4:16–19, paraphrase). ESV copy.
- Luke 4:21, "Today this Scripture has been fulfilled in your hearing." ESV copy.
- Luke 4:22, "All spoke well of him and marveled at the gracious words that were coming from his mouth." ESV copy.
- Elijah sent to a widow in Sidon and to none of the widows in Israel; Elisha cleansed only "Naaman the Syrian" (Luke 4:25–27). ESV copy.
- Luke 4:28, "When they heard these things, all in the synagogue were filled with wrath." ESV copy.
- They drove him to the brow of the hill their town was built on, to throw him down (Luke 4:29, paraphrase). ESV copy.
- "a Syrian general": Naaman was "commander of the army of the king of Syria" (2 Kings 5:1). ESV copy.
- Samaritan village refused Jesus "because his face was set toward Jerusalem" (Luke 9:52–53, paraphrase); Luke 9:54, "Lord, do you want us to tell fire to come down from heaven and consume them?"; Jesus rebuked them (9:55). ESV copy.
- "Shortly afterward in Luke's account, a lawyer stands up to test him": Luke 10:25 (Luke 10:1–24 intervenes). ESV copy.
- John 4:20, "Our fathers worshiped on this mountain, but you say that in Jerusalem is the place where people ought to worship." ESV copy. Mount Gerizim as the mountain: Not checked (textbook; the text says "this mountain").
- John 4:9, "For Jews have no dealings with Samaritans." ESV copy (the ESV prints it in parentheses; the essay quotes the words without them).
- Late in the second century before Christ, John Hyrcanus captured Shechem and destroyed the Samaritan temple on Gerizim. Gutenberg Josephus (*Antiquities* 13.9.1: Hyrcanus "took ... Shechem and Gerizzim, and the nation of the Cutheans, who dwelt at the temple which resembled that temple which was at Jerusalem ... which temple was now deserted"); Search-checked for destruction and date (Biblical Archaeology Society library, "Gerizim, Mount," New Encyclopedia of Archaeological Excavations: coins show destruction by Hyrcanus about 110 BCE, not 128 as Josephus's chronology gives; Wikipedia "Mount Gerizim" and "John Hyrcanus": 111–110 BCE). Both dates fall late in the second century; the essay gives no year. Whiston's "deserted" is a weaker word than "destroyed"; the archaeology summaries describe destruction by fire.
- Coponius governed Judea for Rome. Search-checked (Jewish Encyclopedia, "Coponius": first procurator of Judea, about 6 CE; virtualreligion.net: governed 6–9 CE). Gutenberg Josephus (*Antiquities* 18.2.2, "Coponius ... was exercising his office of procurator, and governing Judea").
- "Within Jesus' own lifetime": Interpretation from the dates (Coponius about AD 6 to 9; Jesus born before Herod's death, Matthew 2:1). Not checked (textbook).
- Some Samaritans slipped into the Jerusalem temple at Passover and threw human remains about its colonnades; afterward Samaritans were kept out of the temple. Gutenberg Josephus (*Antiquities* 18.2.2, Whiston: priests opened the gates just after midnight at Passover; "some of the Samaritans came privately into Jerusalem, and threw about dead men's bodies, in the cloisters; on which account the Jews afterward excluded them out of the temple"); Search-checked (Jewish Encyclopedia renders it "scattered human bones along the colonnade"; lexundria.com 18.29–30). "Human remains" covers both renderings. The search found no scholarly discussion of the episode's historicity; the essay attributes it to Josephus ("Josephus reports").
- Luke 10:29, "desiring to justify himself" and "And who is my neighbor?" ESV copy.
- Man left half dead on the road to Jericho; priest and Levite passed by on the other side; a Samaritan bound up his wounds, took him to an inn, paid for his care (Luke 10:30–35, paraphrase). ESV copy.
- Luke 10:36, "proved to be a neighbor to the man who fell among the robbers." ESV copy.
- Luke 10:37, "The one who showed him mercy" and "You go, and do likewise." ESV copy.
- "Readers have long noticed that he answered without saying the word Samaritan." The textual fact is ESV copy (10:37); that readers have noticed it is Interpretation (common in commentaries; none cited).
- Hospitals named after the Good Samaritan; American states have Good Samaritan laws protecting people who stop to help. Not checked (textbook). The essay says "American states have," not "every state."
- The lawyer's people "despised" Samaritans and "blamed [them] for defiling the temple": Interpretation from John 4:9 and the Josephus episode.
- "the commandment the lawyer had recited so well": Luke 10:27–28. ESV copy.
- Amos 1:1, "in the days of Jeroboam the son of Joash, king of Israel." ESV copy.
- "in the eighth century before Christ": Not checked (textbook; Jeroboam II reigned roughly 786 to 746 BC on common chronologies).
- Israel's border pushed back out to its old limits: paraphrase of 2 Kings 14:25 ("He restored the border of Israel from Lebo-hamath as far as the Sea of the Arabah"). ESV copy.
- Amos 6:4, "beds of ivory." ESV copy. "the wealthy" is Interpretation (Amos 6:1 addresses "those who are at ease in Zion, and ... those who feel secure on the mountain of Samaria, the notable men of the first of the nations"; ESV copy).
- Amos 1:3, "threshed Gilead with threshing sledges of iron." ESV copy.
- Amos 1:13, "ripped open pregnant women in Gilead, that they might enlarge their border." ESV copy.
- Gaza (1:6), Tyre (1:9), Edom (1:11), Moab (2:1), then Judah (2:4). ESV copy. "Israel's rival to the south": Not checked (textbook).
- "the eighth judgment fell on the listeners": count verified in the ESV copy (Damascus, Gaza, Tyre, Edom, Ammon, Moab, Judah, Israel).
- "An Israelite listening would have agreed with every word." Interpretation.
- Amos 2:6, "For three transgressions of Israel, and for four, I will not revoke the punishment, because they sell the righteous for silver, and the needy for a pair of sandals." ESV copy (the ESV continues with a dash into 2:7; the essay closes the quotation at "sandals").
- Amos 2:7–8: trampling the poor; "a man and his father go in to the same girl, so that my holy name is profaned" (paraphrased); lying down beside every altar "on garments taken in pledge." ESV copy.
- "The charges that follow aren't war crimes." Interpretation (contrast with 1:3, 1:6, 1:9, 1:11, 1:13).
- "Our churches tend to split that list, each side preaching the half that troubles the other." Interpretation.
- Amos 3:2, "You only have I known of all the families of the earth; therefore I will punish you for all your iniquities." ESV copy.
- Link: /writing/the-bible-assumes-you-will-be-wrong (James's Substack chapter; `client/src/lib/shelf.json` status "live"; read live 2026-10-28; its opening argues the biblical witness assumes God's people will go wrong and builds prophetic correction for it).

## Verses Taken Out of Their Chapters

- "nobody memorizes the genealogies": Interpretation.
- Philippians 4:13, "I can do all things through him who strengthens me." ESV copy.
- "the verse many Christians reach for before a big game or a hard exam": Interpretation (general observation; no data sought).
- Paul wrote it in prison: Philippians 1:13, "my imprisonment is for Christ"; also 1:7. ESV copy.
- Gift sent by Epaphroditus (Philippians 4:18); "their messenger" (2:25, "your messenger and minister to my need"). ESV copy.
- Philippians 4:11–12, "I have learned in whatever situation I am to be content" and "I know how to be brought low, and I know how to abound. In any and every circumstance, I have learned the secret of facing plenty and hunger, abundance and need." ESV copy.
- He had told them he might not leave alive: Philippians 1:20–21 ("whether by life or by death"; "to die is gain"). ESV copy (paraphrase).
- Matthew 7:1, "Judge not, that you be not judged." ESV copy.
- "quoted by plenty of people who otherwise never quote the Bible": Interpretation (general observation).
- Matthew 7:5, "You hypocrite, first take the log out of your own eye, and then you will see clearly to take the speck out of your brother's eye." ESV copy.
- False prophets (Matthew 7:15); Matthew 7:16, "You will recognize them by their fruits." ESV copy.
- Romans 13:1, "Let every person be subject to the governing authorities." ESV copy (the essay ends the quotation at "authorities").
- Romans 13:8, "Owe no one anything, except to love each other, for the one who loves another has fulfilled the law." ESV copy.
- Leviticus 19:34, "You shall treat the stranger who sojourns with you as the native among you, and you shall love him as yourself, for you were strangers in the land of Egypt." ESV copy (the ESV continues ": I am the LORD your God"; the essay ends the quotation at "Egypt").
- Amos 5:24, "But let justice roll down like waters, and righteousness like an ever-flowing stream." ESV copy.
- Micah 6:8, "to walk humbly with your God." ESV copy.
- What conservative and progressive churches tend to memorize or pass over: Interpretation (the same observation James makes in "How the Bible Gets Translated by the Room You're In"; no survey data).
- Link: /writing/how-the-bible-gets-translated-by (shelf.json "live"; read live 2026-10-28).
- "I have built one too": first-person admission as a preacher. Checked against NOTES (James is a pastor; no scene, sermon or congregant is invented).
- "The preachers who defended American slavery knew their Bibles well, and they explained away the passages that condemned them." Rests on the approved pilot why-didnt-the-bible-ban-slavery (its closed ledger: Stringfellow and the proslavery literature; Exodus 21:16 read narrowly). Link: /writing/why-didnt-the-bible-ban-slavery (pilot, merged in PR #539 and published through `client/public/essays/why-didnt-the-bible-ban-slavery.json`).
- Paul called the Ephesian elders to Miletus (Acts 20:17), knowing they would not see him again (20:25), and said, "I did not shrink from declaring to you the whole counsel of God" (20:27). ESV copy (the ESV verse begins "for").
- They wept and accompanied him to the ship (Acts 20:37–38). ESV copy.

## Can Ordinary Christians Still Read the Bible?

- "The Reformers fought to put Scripture into ordinary hands in ordinary languages." Not checked (textbook).
- English Baptists published their confession in 1677 and again in 1689 with the names of their churches attached. Search-checked (Wikipedia, "Confession of Faith (1689)": compiled and published 1677, anonymously because of persecution; CCEL, "The 1689 London Baptist Confession of Faith in its Historical and Theological Context": "not until 1689, after the 'Glorious Revolution' ... published with the names of the subscribers and the churches they represented attached"). The search did not confirm that a general assembly adopted it in 1689, and the essay does not say so.
- On this point it kept the Westminster Confession's words almost exactly: Creeds.json, chapter 1, section 7 of each, compared word for word. Differences: Westminster "observed, for salvation, are so clearly propounded and opened" against 1689 "observed for Salvation, are so clearly propounded, and opened"; Westminster "in a due use of the ordinary means, may attain unto" against 1689 "in a due use of ordinary means, may attain to". Search-checked for the general dependence (Wikipedia: based largely on Westminster, 1646/1647, by way of the Savoy Declaration, 1658).
- Quotation (1689 confession 1.7): "necessary to be known, believed, and observed for Salvation". Creeds.json. Capital S as in that file; check against a standard edition.
- Quotation (1689 confession 1.7): "that not only the learned, but the unlearned, in a due use of ordinary means, may attain to a sufficient understanding of them." Creeds.json. "are so clearly set out" outside the quotation marks is the essay's paraphrase of "are so clearly propounded, and opened in some place of Scripture or other".
- Quotation (1689 confession 1.7): "All things in Scripture are not alike plain in themselves, nor alike clear unto all." Creeds.json (same words in Westminster 1.7).
- Quotation: "ordinary means." Creeds.json.
- "Westminster Confession" named without a date. (1646/1647 per the search above.)
- "Amos names his king in his first verse": Amos 1:1. ESV copy.
- "Paul's chains are in the first chapter of Philippians": Philippians 1:7, 1:13 ("imprisonment"). ESV copy. "chains" is the essay's word.
- Nehemiah 8:12, "because they had understood the words that were declared to them"; they went their way to eat, drink and send portions. ESV copy.
- Link: /study/bible (allowed by BRIEF.md).

## Reading With the First Hearers and the ending

- Hebrews 1:1–2, "Long ago, at many times and in many ways, God spoke to our fathers by the prophets, but in these last days he has spoken to us by his Son." ESV copy (the ESV continues ", whom he appointed the heir of all things"; the essay and the Closing Texts line end at "Son").
- "Hebrews was written to a church in danger of drifting": Interpretation from Hebrews 2:1 and the letter's warnings.
- Hebrews 2:1, "Therefore we must pay much closer attention to what we have heard, lest we drift away from it." ESV copy.
- "a handful of house churches around the Mediterranean": Interpretation (Colossians 4:15, "the church in her house"; Romans 16:5, "the church in their house"; ESV copy).
- Callback to Luke 4:21 ("fulfilled in your hearing"). ESV copy.
- "The people at the Water Gate wept before they feasted": Nehemiah 8:9–12. ESV copy.
- Closing Texts: Nehemiah 8:8; Acts 20:27 (the ESV's opening "for" dropped); Hebrews 1:1–2 (ends at "Son"). ESV copy.

## What was kept, what was cut, and why

Kept from the old essay (re-verified, not trusted): the Good Samaritan as an example of a scandal heard as a sentiment, now grounded in Luke 9:52–55, John 4, and Josephus instead of a general claim; the observation that the lawyer does not say "Samaritan"; the point that the first audience heard the Bible aloud and together; and the worry that context puts the Bible out of ordinary reach, now answered with the 1677/1689 Baptist confession. Kept from the folded essays: the short list of memorized verses against the passages a church skips (Romans 13:1 against 13:8 and Leviticus 19:34; Amos 5:24 and Micah 6:8), now applied to right and left alike, and Paul's "whole counsel of God" at Miletus.

Cut from the old essay and the folded essays, not carried into the rewrite:

- Kenneth Bailey on the prodigal's father running and the Samaritan as "slur" (old essay): not checked; the running-father reading is Bailey's interpretation and was not needed.
- John Walton's reading of Genesis 1 as a temple text (old essay): Genesis 1 is a contested second-order question held for James (`how-to-read-genesis-one`); left out entirely.
- N. T. Wright on "kingdom" and exile (old essay): not needed, and Wright's continuing-exile thesis is debated.
- Philemon (old essay): already the center of the approved pilot why-didnt-the-bible-ban-slavery.
- Jonah, Nineveh and the book's closing question (old essay): already carried by `what-a-christian-owes-the-city` (section "Jonah and the City God Spared"). A draft of this essay used Jonah and Nahum; replaced with Amos 1 and 2 to avoid repeating it.
- Jeremiah 29:11, the graduation card, Hananiah and Shemaiah (an earlier draft of this essay): the approved pilot `what-post-christian-means` already makes the graduation-card point and `what-a-christian-owes-the-city` already uses Shemaiah's reply. Two searches made for that draft (Bible Gateway's 2018 most-read verse, Christianity Today, December 2018; the Babylonian Chronicle and 597 BC) are not used in the essay.
- 2 Chronicles 7:14 read in context (an earlier draft): the approved pilot `what-christian-nationalism-is-and-is-not` already makes this argument.
- "Roughly two thousand verses about money and the poor" (six-verses-we-memorized): unsourced; cut.
- Christopher Wright (*Old Testament Ethics for the People of God*, 2004; *The Mission of God*, 2006), Walter Brueggemann and Lesslie Newbigin as summarized in the folded essays: not checked against their books; not used.
- Matthew 25 and Luke 16 (six-verses-we-memorized): not needed once the short-list paragraphs were trimmed.

No contested second-order doctrine is argued, and no position is stated for James. The essay's only first-person lines are "I've written elsewhere" (linking his own Substack chapter) and "I have built one too" (of preachers' short lists).
