# Claims ledger: why-didnt-the-bible-ban-slavery

Essay: `docs/work/essays/why-didnt-the-bible-ban-slavery.md` ("Why Didn't the Bible Just Ban Slavery?"). Approved pilot. No writer's ledger existed, so the verifier built this one from the text on 2026-10-26.

## Read this first: no web search was available for this check

The workflow's shared web-search budget was already used up when this check began. The one WebSearch call made (the Douglass appendix wording) came back "this turn's web search budget is used up." No search result was seen for this essay, and no page on esv.org, Wikipedia or any other site was opened. Every check below was made against texts that could be reached through GitHub, or against files already in this repository.

The methods actually used, and what the words below mean:

- **"ESV copy"**: the quotation was compared with the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown"). The clone was already in the session scratchpad (`scratchpad/esv-mdbible`, commit fd66568, dated 2022-01-20), made by an earlier run on 2026-10-26. This run read its chapter files with `git show` on 2026-10-26. A script compared each quotation with the verse text twice: once after normalizing case, punctuation and spacing, and once keeping punctuation (only curly quotes and the parser's stray spaces before punctuation were normalized). Every quotation matched both times. The only difference flagged was Philemon 16, where the copy prints spaces around the em-dash ("brother — especially"); the words and the dash are the same. The copy prints LORD as "Lord" and does not say which ESV edition it is. This is not esv.org or the ESV API. Recheck with James's API key once it exists.
- **"KJV copy"**: compared with `json/en_kjv.json` from the public GitHub repository thiagobodruk/bible, downloaded by this run from raw.githubusercontent.com on 2026-10-26 (byte-identical to the copy already in the scratchpad).
- **"Gutenberg (Douglass)"**: read in Project Gutenberg eBook #23, *Narrative of the Life of Frederick Douglass, an American Slave*, cloned by this run on 2026-10-26 from its GITenberg mirror on GitHub (`GITenberg/Narrative-of-the-Life-of-Frederick-Douglass-an-American-Slave_23`, commit 2a7853f), file `23.txt`. Its title page reads "BOSTON / PUBLISHED AT THE ANTI-SLAVERY OFFICE, NO. 25 CORNHILL / 1845."
- **"Commentaries library"**: read in the public GitHub repository HistoricalChristianFaith/Commentaries-Database, cloned by this run on 2026-10-26 (`--depth 1 --filter=blob:none --no-checkout`) and read with `git show`, file `Gregory of Nyssa/Ecclesiastes 2_7.toml`. It holds two modern English renderings of Gregory's fourth homily on Ecclesiastes, with no translator named. These are not ANF/NPNF or Pearse texts, and they were used only to test the substance of a paraphrase, never as a source to quote.
- **"Site Greek data"**: read in this repository's `client/public/bible/ch/1-timothy/1.json` (STEPBible tagged Greek) and `client/public/bible/lex/G/1.json` (lexicon entry G0405, from Abbott-Smith via STEPBible).
- **"Repo book description"**: checked against this repository's own description of James's book, `docs/kdp/monster.md`, `client/src/pages/TheMonsterInTheMirror.tsx` and `client/src/lib/bookShelf.ts`.
- **"Checked against NOTES"**: checked against the biography rules in `docs/work/NOTES.md` and `docs/work/essays/BRIEF.md`.
- **"Not checked (textbook)"**: no source was opened or searched. The verifier judged it standard reference knowledge. That judgment is not a check.

Not in scope here and left for the voice and audit step: the essay's em-dashes in James's own prose (thirteen, plus three opening the Closing Texts attribution lines; the em-dash inside the Philemon 16 quotation is the ESV's own and stays), the Closing Texts layout (the pilot predates the no-em-dash rule and the one-line *"Quote."* (Reference) format), and the stamp "the record," which appears twice ("This one needs only the text and the record"; "The answer the record supports").

## Corrections made in the essay

1. How It Actually Ended, Douglass: "impartial Christianity of Christ; I therefore hate" became "impartial Christianity of Christ: I therefore hate." The Gutenberg text of the 1845 Boston edition prints a colon there. Every word of the quotation already matched.
2. How It Actually Ended, Wilberforce: the diary entry was quoted in quotation marks. No reachable source carries it (the web search budget was gone, and no public-domain text of the 1838 *Life of William Wilberforce* by his sons could be located on GitHub without searching). As the brief requires, it is now marked paraphrase without quotation marks: "wrote in his diary two years later that God Almighty had set before him two great objects, the suppression of the slave trade and the reformation of manners." The original wording is kept below for restoring.

No claim was found to be wrong. The second change was made because the quotation could not be checked, not because a check failed.

## Original wording, for restoring

When a search or the source is available, check this against *The Life of William Wilberforce* (1838), vol. 1, the diary entry the verifier recalls as dated October 28, 1787, and if it matches, restore it exactly:

> William Wilberforce, whose evangelical conversion came in 1785, wrote in his diary two years later, "God Almighty has set before me two great objects, the suppression of the Slave Trade and the Reformation of Manners."

## Opening

- In 1845 Frederick Douglass published his *Narrative* in Boston. Gutenberg (Douglass): title page, "Boston, published at the Anti-Slavery Office, No. 25 Cornhill, 1845"; Garrison's preface dated May 1, 1845.
- Douglass was seven years out of slavery in Maryland. Gutenberg (Douglass): born in Talbot County, Maryland (chapter 1); "on the third day of September, 1838, I left my chains" (chapter 11), leaving from Baltimore. September 1838 to mid-1845 is a little under seven years; "seven years" is kept as a rounding of 1838 to 1845.
- He attached an appendix explaining that his attacks on religion were aimed at "the slaveholding religion of this land" and had "no possible reference to Christianity proper." Gutenberg (Douglass), Appendix: "I mean strictly to apply to the _slaveholding religion_ of this land, and with no possible reference to Christianity proper." Words match; the source italicizes "slaveholding religion," and the essay drops the emphasis.
- That same year Baptists from the slaveholding states met in Augusta, Georgia, and organized the Southern Baptist Convention. Not checked (textbook; May 1845).
- The denomination's mission boards had made clear they would not appoint slaveholders as missionaries. Not checked (textbook: the Home Mission Society's refusal of a Georgia slaveholder nominee and the foreign mission board's reply to Alabama Baptists, both late 1844).
- Both sides had Bibles and believed they read them faithfully. Framing; no factual claim.

## The Objection

- Leviticus 19:19 rules on what a garment may be woven from. Paraphrase, not quoted. ESV copy: "nor shall you wear a garment of cloth made of two kinds of material."
- Deuteronomy 14:21 rules on boiling a young goat in its mother's milk. Paraphrase, not quoted. ESV copy: "You shall not boil a young goat in its mother's milk."
- Leviticus 25:44–46 (block quotation, "As for your male and female slaves ... to inherit as a possession forever."). ESV copy: matched word for word and point for point on 2026-10-26.
- Ephesians 6:5, "Bondservants, obey your earthly masters with fear and trembling." ESV copy: matched on 2026-10-26.
- Paul sends Onesimus back to the man who owned him; most readers have taken him to be a runaway. ESV copy, Philemon 12: "I am sending him back to you." The runaway reading is stated as the majority reading, not as fact. Not checked (textbook).

## The Church's History

- George Whitefield, the best-known preacher of the First Great Awakening, campaigned to make slavery legal in Georgia. Not checked (textbook; the Trustees' ban was lifted in 1751 after Whitefield and others pressed for it).
- Whitefield owned enslaved people whose labor supported his orphanage there (Bethesda). Not checked (textbook).
- Jonathan Edwards bought and owned slaves. Not checked (textbook; he bought a girl named Venus in 1731).
- John Newton was converted in 1748. Not checked (textbook; the storm at sea, March 1748).
- He kept sailing on slave ships for years afterward, first as a mate, then as a captain. Not checked (textbook; mate on the *Brownlow*, then master of the *Duke of Argyle* and the *African*, until 1754).
- He didn't publicly oppose the trade until 1788. Not checked (textbook; *Thoughts upon the African Slave Trade*, 1788).
- Before the Civil War, Southern pulpits produced a literature defending slavery from Scripture. Not checked (textbook).
- Thornton Stringfellow, a Virginia Baptist minister, wrote some of the most widely read of it, building on Abraham's household, Leviticus 25 and Paul. Not checked (reference knowledge: his *Brief Examination of Scripture Testimony on the Institution of Slavery* argues from the patriarchs, the law of Moses, Jesus and the apostles). "Most widely read" is a general judgment, not a figure.
- Mark Noll, historian, *The Civil War as a Theological Crisis*. Not checked (textbook; University of North Carolina Press, 2006).
- Noll's point that on the face-value, verse-by-verse reading most American Protestants had been taught, the defenders of slavery often had the easier argument, and abolitionists had to appeal to the spirit and direction of Scripture, which many devout people heard as evasion. Paraphrase, not quoted. Not checked (reference knowledge of the book's chapter on the crisis over the Bible). The book was not opened.

## Baptists and 1995

- "I pastor a Baptist church." Checked against NOTES: Baptist self-identification is confirmed; the sentence does not state a title, years in ministry or a book count. "Baptists don't get to tell this story from a safe distance" and "his own family" refer to American Baptists as a family, which before 1845 was one denomination; they do not claim Southern Baptist membership.
- In 1995, a hundred and fifty years after Augusta, the Southern Baptist Convention adopted a resolution acknowledging slavery's part in its founding and repenting of the racism it had condoned. Paraphrase, not quoted. Not checked (textbook: the resolution on racial reconciliation at the 150th anniversary meeting, Atlanta, June 1995). Arithmetic checked (1845 + 150 = 1995).

## The Usual Answer

- Much of what Hebrew law regulated was debt servitude in an economy without bankruptcy courts or public relief. General characterization. Not checked (textbook).
- Exodus 21:2, "When you buy a Hebrew slave, he shall serve six years, and in the seventh he shall go out free, for nothing." ESV copy: matched on 2026-10-26.
- Deuteronomy 15:13–14, the released slave not to be sent away empty-handed. Paraphrase, not quoted. ESV copy: "you shall not let him go empty-handed."
- Exodus 21:26–27, a slave who lost an eye or a tooth to his master went free. Paraphrase, not quoted. ESV copy: confirmed.
- Leviticus 25:10, "proclaim liberty throughout the land to all its inhabitants," every fiftieth year. ESV copy: matched on 2026-10-26 (the verse names "the fiftieth year").
- The King James wording of that line is cast into the Liberty Bell. KJV copy: Leviticus 25:10 reads "proclaim liberty throughout all the land unto all the inhabitants thereof." The bell's inscription itself not checked (textbook).
- Abolitionists in the 1830s gave the bell its name. Not checked (textbook).
- The release laws of Leviticus 25 protect the Israelite; the permanent ownership applies to foreigners. ESV copy: Leviticus 25:39–46 read in full; confirmed.
- A master who beat a slave to death on the spot was to be punished. Paraphrase of Exodus 21:20. ESV copy: "When a man strikes his slave, male or female, with a rod and the slave dies under his hand, he shall be avenged."
- Exodus 21:21, "if the slave survives a day or two, he is not to be avenged, for the slave is his money." ESV copy: matched on 2026-10-26.

## The Line Leviticus Draws

- Leviticus 25:39, "If your brother becomes poor beside you and sells himself to you, you shall not make him serve as a slave." ESV copy: matched on 2026-10-26.
- Leviticus 25:42, "For they are my servants, whom I brought out of the land of Egypt; they shall not be sold as slaves," three verses later. ESV copy: matched on 2026-10-26; the verse count is right.
- Leviticus 25:46, "You may make slaves of them, but over your brothers the people of Israel you shall not rule, one over another ruthlessly." ESV copy: matched on 2026-10-26.
- Ephesians 2:19, "So then you are no longer strangers and aliens, but you are fellow citizens with the saints and members of the household of God." ESV copy: matched on 2026-10-26.
- 1 Corinthians 7:23, "You were bought with a price; do not become bondservants of men." ESV copy: matched on 2026-10-26.
- Philemon 16, "no longer as a bondservant but more than a bondservant, as a beloved brother—especially to me, but how much more to you, both in the flesh and in the Lord." ESV copy: matched on 2026-10-26 (spacing around the dash only; see methods).
- Philemon 21, Philemon "will do even more than I say." ESV copy: matched on 2026-10-26 ("knowing that you will do even more than I say").
- Colossians 3:11, "Here there is not Greek and Jew, circumcised and uncircumcised, barbarian, Scythian, slave, free; but Christ is all, and in all." ESV copy: matched on 2026-10-26.
- Enslaved and free Christians had been baptized into the same body in American churches. Not checked (textbook general statement).

## The Law That Was Already There

- Exodus 21:16, "Whoever steals a man and sells him, and anyone found in possession of him, shall be put to death." ESV copy: matched on 2026-10-26. Also used in Closing Texts. The essay ties the "possession" reading to the ESV's rendering; KJV copy shows the older rendering ("or if he be found in his hand"), which can be read of the kidnapper, so the essay's qualification is needed and is kept.
- 1 Timothy 1:10, "enslavers." ESV copy: matched on 2026-10-26.
- The Greek word is *andrapodistēs*, a slave-dealer, a man who trades in captured human beings. Site Greek data: 1 Timothy 1:10 has ἀνδραποδισταῖς (G0405); the lexicon entry gives "a slave-dealer, kidnapper," from ἀνδράποδον, "a slave, captured in war."
- The King James Version rendered it "menstealers." KJV copy: "for menstealers."
- American abolitionists took the word from their Bibles. Not checked (textbook general statement).
- Douglass, 1845 appendix: "We have men-stealers for ministers, women-whippers for missionaries, and cradle-plunderers for church members." Gutenberg (Douglass), Appendix: matched word for word.
- Many defenders of slavery conceded the African trade had been wicked. General characterization. Not checked.
- The United States outlawed the importation of slaves in 1808. Not checked (textbook: the act of March 1807 took effect January 1, 1808).
- *The Monster in the Mirror* treats the slaveholder who kept a Bible on his desk, a sincere man whose community had wrapped its conclusions in Scripture. Repo book description: `docs/kdp/monster.md` ("He kept a Bible on his desk ... He also owned other human beings, and believed Scripture sanctioned it. He was not a monster.") and `TheMonsterInTheMirror.tsx` ("wrapped a cultural conviction in chapter and verse"). The book is James's (`bookShelf.ts`). The full manuscript is not in the repo, so "at length" was not confirmed. This is the book's composite figure, not an invented scene.
- The capital law sits in the same chapter of Exodus (21) that was cited for a master's rights. ESV copy: Exodus 21:16 and 21:20–21 are in one chapter.
- 1 Timothy 6:1, slaves to "regard their own masters as worthy of all honor," in the same letter as 1 Timothy 1:10. ESV copy: matched on 2026-10-26.
- What God intended "from the beginning." Matthew 19:8 (see below). ESV copy: matched.
- Enslaved Christians of the American South, and Douglass, read the Bible as one story. Interpretive; no factual claim beyond the Douglass appendix above.

## Hardness of Heart

- Matthew 19:8, "Because of your hardness of heart Moses allowed you to divorce your wives, but from the beginning it was not so," said to the Pharisees. ESV copy: matched on 2026-10-26; the questioners in Matthew 19:3 and 19:7 are Pharisees.
- Genesis 1:27, "So God created man in his own image." ESV copy: matched on 2026-10-26.
- Job says that if he had brushed aside his servants' complaint he would have no answer when God rose up and made inquiry. Paraphrase of Job 31:13–14, not quoted. ESV copy: "If I have rejected the cause of my manservant or my maidservant, when they brought a complaint against me, what then shall I do when God rises up? When he makes inquiry, what shall I answer him?"
- Job 31:15, "Did not he who made me in the womb make him? And did not one fashion us in the womb?" ESV copy: matched on 2026-10-26. Also used in Closing Texts.
- Every society in the ancient Near East held slaves. Not checked (textbook general statement).
- The Code of Hammurabi, from Babylon some eighteen centuries before Christ, made it a capital crime to help a slave out through the city gate or to hide a runaway in your house. Not checked (textbook: laws 15, 16 and 19, around 1754 BC). No text of the code was opened; the laws as the verifier knows them name palace slaves and slaves of commoners in 15 and 16, and runaways generally in 19.
- Deuteronomy 23:15–16, "You shall not give up to his master a slave who has escaped from his master to you. He shall dwell with you, in your midst, in the place that he shall choose within one of your towns, wherever it suits him." ESV copy: matched on 2026-10-26.
- The Fugitive Slave Act of 1850 required Americans to help return escaped slaves. Not checked (textbook).
- Its defenders liked to cite Paul sending Onesimus home. Not checked (reference knowledge; for example Moses Stuart's 1850 defense of the act). General statement.
- Deuteronomy 5:14–15, rest for the male and female servant "as well as you," and "You shall remember that you were a slave in the land of Egypt." ESV copy: both phrases matched on 2026-10-26.
- Aristotle argued that some human beings are slaves by nature. Not checked (textbook; *Politics*, Book 1).
- Exodus 3:7, "I have surely seen the affliction of my people who are in Egypt and have heard their cry because of their taskmasters. I know their sufferings." ESV copy: matched on 2026-10-26.
- Israel was commanded to retell the story every year at Passover. Not checked (textbook; Exodus 12–13).
- Exodus 21:16 was explained away. Interpretive; follows from the section above.

## How It Actually Ended

- Gregory of Nyssa, in the late fourth century, was the first Christian writer we know of to condemn slavery itself and not just its cruelties. Not checked (reference knowledge; the claim is hedged "we know of").
- He preached on Ecclesiastes 2:7, "I bought male and female slaves." ESV copy: matched on 2026-10-26. Commentaries library: the file for Ecclesiastes 2:7 is titled "Homilies on Ecclesiastes 4" and treats that verse.
- Gregory asked his congregation what price they thought they had paid for a creature made in the image of God. Paraphrase, not quoted. Partly checked in the commentaries library: both renderings attack a man who thinks himself "the owner of men and women," invoke the "let them rule over" of Genesis 1, and ask what the buyer will pay for a human being. The sentence naming the likeness of God falls inside an ellipsis in both excerpts, so that detail rests on the verifier's recollection of the full homily. Not checked as worded.
- The church didn't follow him for well over a thousand years. General statement. Not checked.
- Quakers in Germantown, Pennsylvania, protested slavery in 1688 on the strength of the Golden Rule. Not checked (textbook).
- Newton's 1788 pamphlet was a confession; he had been a Christian for forty years. Arithmetic checked (1748 to 1788). The pamphlet itself not checked (textbook).
- William Wilberforce's evangelical conversion came in 1785. Not checked (textbook).
- Two years later he wrote in his diary that God Almighty had set before him two great objects, the suppression of the slave trade and the reformation of manners. Converted to marked paraphrase; see corrections. The verifier's recollection of the entry date, October 28, 1787, fits "two years later." Not checked.
- He brought the cause back to Parliament for nearly twenty years before the trade was abolished in 1807. Not checked (textbook; his first abolition speech was in May 1789 and the act passed in March 1807).
- In July 1833 he lived just long enough to hear the bill ending slavery across most of the British Empire was assured of passage, and died three days later. Not checked (textbook: word of the Commons vote reached him on July 26, 1833, and he died on July 29; the 1833 act excluded territories held by the East India Company, Ceylon and St Helena, hence "most").
- The enslaved heard Exodus read, often by preachers hired to teach them obedience, and sang "Go Down, Moses." General characterization and a song title. Not checked (textbook).
- Douglass: "I love the pure, peaceable, and impartial Christianity of Christ: I therefore hate the corrupt, slaveholding, women-whipping, cradle-plundering, partial and hypocritical Christianity of this land." Gutenberg (Douglass), Appendix: words matched; the essay had a semicolon where the text has a colon, now corrected.
- Enlightenment natural-rights arguments, economics and war were other engines of abolition. General statement. Not checked (textbook).
- The revolt of the enslaved in Saint-Domingue began in 1791 and ended in an independent Haiti. Not checked (textbook; independence declared January 1, 1804).

## What We Owe the Person Asking

- The slaveholders' preachers skipped Exodus 21:16. Interpretive summary of the section above.
- Slave quarters and brush arbors of the South; the churches that grew out of those gatherings. General characterization. Not checked (textbook; historians also call these gatherings "hush harbors").
- God who had seen the affliction of his people and heard their cry. Allusion to Exodus 3:7, checked above.

## Closing Texts

- Exodus 21:16. ESV copy: matched on 2026-10-26 (see above).
- Job 31:15. ESV copy: matched on 2026-10-26 (see above).
- Philemon 16, "No longer as a bondservant but more than a bondservant, as a beloved brother." ESV copy: matched on 2026-10-26 (first word capitalized as the start of a quotation).

## Scripture checked, in summary

Twenty-seven Scripture quotations were matched against the ESV copy: twenty-four in the body (counting Deuteronomy 5:14 and 5:15 as two) and the three Closing Texts. The Exodus 21:16 and Job 31:15 Closing Texts are word for word the body quotations and were matched by the same comparison; the shortened Philemon 16 Closing Text was compared on its own. The two-word repeat "from the beginning" falls under Matthew 19:8. Four paraphrased references (Leviticus 19:19, Deuteronomy 14:21, Deuteronomy 15:13–14, Exodus 21:26–27) and three context readings (Exodus 21:20, Job 31:13–14, Philemon 12) were read there too. Two KJV readings (Leviticus 25:10, 1 Timothy 1:10) and one KJV comparison (Exodus 21:16) were read in the KJV copy. None was checked against esv.org or the ESV API.
