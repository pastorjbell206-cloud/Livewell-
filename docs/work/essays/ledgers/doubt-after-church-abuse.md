# Claims ledger: doubt-after-church-abuse

Essay: docs/work/essays/doubt-after-church-abuse.md. Written 2026-10-26 as a rewrite of the machine essay of the same slug, folding in sexual-abuse-crisis-in-the-church and spiritual-abuse-how-good-theology-gets-weaponized (the writer's notes on what was read and discarded are kept at the end). Verified 2026-10-27; this ledger was rewritten by the verifier and records what the verifier actually did.

## How each claim was checked (2026-10-27)

- **"ESV copy"**: compared by script (scratchpad/dace/check.py) with the ESV text in the local clone of the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown"), commit fd66568 dated 2022-01-20, already in the session scratchpad (`esv-mdbible`) from an earlier run. The book files were read with `git show` on 2026-10-27. The script compared each quotation twice: words only (case and punctuation ignored), and with punctuation kept (only curly quotes, dashes, the copy's stray spaces before punctuation, and LORD/Lord normalized, since the copy drops quotation marks inside verses and prints LORD as "Lord"). The book files do not say which ESV edition they are (another run's ledger records the repository's JSON as "English Standard Version 2011"). This is not esv.org or the ESV API; recheck with James's API key once it exists.
- **"KJV local"**: read on 2026-10-27 in scratchpad/kjv/en_kjv.json, a public-domain KJV from raw.githubusercontent.com/thiagobodruk/bible fetched by the writer on 2026-10-26.
- **"BSB local"**: read on 2026-10-27 in client/public/bible/ch/ (Berean Standard Bible with STEPBible Hebrew tagging). Confirms sense and Hebrew words, not ESV wording.
- **"Creeds.json local"**: read on 2026-10-27 in scratchpad/creeds/second_helvetic_confession.json, the NonlinearFruit/Creeds.json file fetched from raw.githubusercontent.com by the writer on 2026-10-26. Its metadata gives source ccel.org/creeds/helvetic.htm, author Heinrich Bullinger, Zurich, 1562.
- **"WDB"**: read on 2026-10-27 with `git show` in the local clone of HistoricalChristianFaith/Writings-Database (scratchpad/wdb/repo, commit 328918a), NPNF translations.
- **"Not checked this session"**: the verifier's first WebSearch on 2026-10-27 returned "this turn's web search budget is used up," and a direct fetch of en.wikipedia.org failed (host not found) while houstonchronicle.com, bostonglobe.com, christianitytoday.com, sbc.net, guidepostsolutions.com, childwelfare.gov and 988lifeline.org were refused by the sandbox proxy. Nothing marked this way was confirmed by any source. Each such line says whether it was kept (and why) or changed.

## Biography and stance

- "I will write that way" / "I hold the same office these men held, and I am not immune to it." Kept: James is a pastor (docs/work/NOTES.md confirmed biography). No title, years, book count or scene stated.
- "Baptist churches, mine included, prize that independence." Kept: NOTES.md allows Baptist self-identification. The sentence speaks of Baptist churches generally and does not imply Southern Baptist membership.
- No anecdote, scene, congregant or biography beyond NOTES.md appears in the essay. Checked by reading the full text on 2026-10-27.

## Crisis and reporting lines

- "call or text 988 in the US to reach the Suicide and Crisis Lifeline." Wording required by BRIEF.md. The number itself: not checked this session; kept as textbook-certain (the 988 Lifeline is the national US number).
- "Abuse by a church leader should be reported to the authorities." Required line, BRIEF.md. Present.
- [Find Help](/help) and "Nothing here is legal or counseling advice." Required by BRIEF.md. Present.
- "In many states clergy are required by law to report suspected child abuse." Not checked this session. Kept as a general statement; no number of states is given.

## Shiloh: 1 Samuel 1 to 3

- Before Israel had a king, worship centered at Shiloh, where the ark was. ESV copy, 1 Samuel 1:3 and 3:3 ("the temple of the LORD, where the ark of God was"). Matched.
- Eli an old priest there; Hophni and Phinehas priests. ESV copy, 1 Samuel 1:3 ("the two sons of Eli, Hophni and Phinehas, were priests of the LORD") and 2:22 ("very old"). Matched.
- Quotation: "Now the sons of Eli were worthless men. They did not know the LORD" (1 Samuel 2:12). ESV copy. Matched words and punctuation.
- Paraphrase: the priests' servant took the meat before the fat was burned and threatened to take it by force (1 Samuel 2:13–16). ESV copy, 2:15–16 ("before the fat was burned, the priest's servant would come"; "if not, I will take it by force"). Supported.
- Quotation: "lay with the women who were serving at the entrance to the tent of meeting" (1 Samuel 2:22). ESV copy. Matched.
- Quotation: "Thus the sin of the young men was very great in the sight of the LORD, for the men treated the offering of the LORD with contempt" (1 Samuel 2:17). ESV copy. Matched.
- Quotation, KJV: "for men abhorred the offering of the LORD." KJV local (1 Samuel 2:17: "Wherefore the sin of the young men was very great before the LORD: for men abhorred the offering of the LORD."). Matched.
- CORRECTED: "Many modern translations take the contempt to be the priests' own" became "Some modern translations ...". Only the BSB was checked (BSB local: "for they were treating the LORD's offering with contempt"); no other translation could be checked this session.
- CORRECTED: "the older translators read them as the worshipers" (a claim about the KJV translators' intent, with no source) became "The King James Version can be read another way ... read that way they are the worshipers". The sentence now describes what the wording allows, not what the translators meant.
- "The Hebrew uses a different word for these men than for the young priests." BSB local, STEPBible tags: "the young men" is ha-ne'arim (H5288); "the men" is ha-anashim (H0582). Verified.
- Quotation: "kept hearing all that his sons were doing to all Israel" (1 Samuel 2:22). ESV copy. Matched.
- Eli rebuked his sons, they ignored him, and he did nothing more (1 Samuel 2:22–25). ESV copy, 2:25 ("But they would not listen to the voice of their father"). Supported; "did nothing more" is the essay's reading, backed by 3:13.
- CORRECTED: "When God finally spoke, he named the father's failure" became "When God spoke, ...". ESV copy shows God had already spoken against Eli through a man of God in 1 Samuel 2:27–29 ("honor your sons above me"), so "finally" was wrong; both 2:29 and 3:13 name the father's failure.
- Quotation: "for the iniquity that he knew, because his sons were blaspheming God, and he did not restrain them" (1 Samuel 3:13). ESV copy. Matched.
- Quotation: "And the word of the LORD was rare in those days; there was no frequent vision" (1 Samuel 3:1). ESV copy. Matched.
- Samuel lying down in the temple where the ark was; the LORD called him (1 Samuel 3:3–4); the message concerned Eli's house (3:11–14). ESV copy. Supported.
- "he did not speak to the high priest." Eli is called "the priest" in 1 Samuel; "high priest" is the traditional description of his office. Kept as textbook usage; not checked against a source this session.

## Spiritual abuse

- David Johnson (a pastor) and Jeff VanVonderen (a counselor) wrote *The Subtle Power of Spiritual Abuse*. Not checked this session. Kept: the book and authors are well known (from memory: Bethany House, 1991; the year is not in the essay). Roles from memory.
- CORRECTED paraphrase, no quotation marks: "mistreating someone who came for help in a way that leaves that person weaker and less able to stand before God" became "mistreating a person who needs help, support or spiritual strength, in a way that leaves that person spiritually weaker than before." Not checked this session. The verifier's memory of their definition speaks of mistreating a person in need of help, support or greater spiritual empowerment, with the result of weakening or undermining that person's spiritual empowerment; "less able to stand before God" went beyond it and was removed. Recheck against the book.
- Paraphrase, no quotation marks: abusive churches run on unspoken rules, the strongest a rule against talking about the real problem; whoever names it becomes the problem. Not checked this session. Kept as paraphrase (from memory of the book's "can't-talk" rule).
- The clergy "affair" paragraph is argument, not a sourced claim.

## Psalm 105, David and Saul, Jesus on leadership

- KJV wording "Touch not mine anointed". KJV local (Psalm 105:15: "Saying, Touch not mine anointed, and do my prophets no harm."). Matched.
- Psalm 105 retells the covenant with Abraham, Isaac and Jacob and the land of Canaan. ESV copy, Psalm 105:8–11, 13. Supported.
- Quotation: "they were few in number, of little account, and sojourners" (Psalm 105:12). ESV copy. Matched.
- Quotation: "allowed no one to oppress them; he rebuked kings on their account, saying, 'Touch not my anointed ones, do my prophets no harm!'" (Psalm 105:14–15). ESV copy. Matched words and punctuation (the copy omits the inner quotation marks). The exclamation point is inside quoted Scripture.
- CORRECTED: "a family of wanderers with no land and no army" became "no land and no king". ESV copy, Genesis 14:14: Abram "led forth his trained men, born in his house, 318 of them," so "no army" was open to challenge; the psalm's contrast is with kings.
- Phrase "the LORD's anointed" (1 Samuel 24:6). ESV copy. Matched.
- Quotations: Saul "sought to pin David to the wall with the spear"; David "fled and escaped that night" (1 Samuel 19:10). ESV copy. Both matched.
- David stayed out of Saul's reach for the rest of Saul's life. ESV copy, 1 Samuel 27:4 ("he no longer sought him"); the rest is a summary of chapters 19 to 31. Supported.
- David told Saul to his face that he had done him no wrong (1 Samuel 24:9–15). ESV copy, 24:8 (David went out and called after Saul; Saul looked behind him) and 24:11 ("I have not sinned against you"). Supported.
- Quotation: "You know that those who are considered rulers of the Gentiles lord it over them, and their great ones exercise authority over them. But it shall not be so among you" (Mark 10:42–43). ESV copy. Matched.
- Quotation: "not domineering over those in your charge, but being examples to the flock" (1 Peter 5:3). ESV copy. Matched.
- Quotation: "tie up heavy burdens, hard to bear, and lay them on people's shoulders" (Matthew 23:4). ESV copy. Matched.

## The institutional record

- Many Protestants treated clergy abuse as a Catholic problem and blamed celibacy, hierarchy or clerical culture. Not checked this session. Kept as a hedged characterization ("many", "often"), not a factual claim about a source.
- January 2002: the Boston Globe Spotlight team began publishing on John Geoghan; archdiocesan officials knew and kept moving him. Not checked this session. Kept as textbook-certain (widely documented; from memory the first story ran January 6, 2002).
- Cardinal Bernard Law resigned as archbishop of Boston in December 2002. Not checked this session. Kept as textbook-certain (from memory: December 13, 2002).
- February 2019: the Houston Chronicle and San Antonio Express-News published "Abuse of Faith." Not checked this session. Kept as textbook-certain (from memory: first installment February 10, 2019).
- CORRECTED (numbers generalized): "roughly 380 Southern Baptist church leaders and volunteers had faced allegations of sexual misconduct since 1998, with more than 700 victims" became "over two decades hundreds of Southern Baptist church leaders and volunteers had faced allegations of sexual misconduct, and ... their victims, many of them children, numbered in the hundreds." The figures could not be checked this session. "many of them children" kept, not checked.
- May 2022: Guidepost Solutions' independent investigation, voted for by the Convention's messengers the year before; Executive Committee staff had for years kept a private list of ministers accused of abuse. Not checked this session. Kept (from memory: report released May 22, 2022; vote at the June 2021 annual meeting; widely reported finding).
- Denominational leaders resisted calls for a database of abusers on the grounds that local church autonomy made one impossible. Not checked this session. Kept (from memory; widely reported).
- Ravi Zacharias, one of the best-known Christian apologists, died in May 2020. Not checked this session. Kept as textbook-certain (from memory: May 19, 2020).
- CORRECTED: "an investigation commissioned by his own ministry reported that he had sexually abused massage therapists over a period of years" became "... reported that over a period of years he had committed sexual misconduct against massage therapists." Not checked this session. "Sexual misconduct" is the framing the verifier recalls from the report itself (RZIM commissioned it; released February 2021); the date and the massage therapists are kept from memory.
- Judith Herman, a psychiatrist, author of *Trauma and Recovery*. Not checked this session. Kept as textbook-certain (from memory: 1992; the year is not in the essay).
- CORRECTED (quotation made paraphrase): the quotation "All the perpetrator asks is that the bystander do nothing." could not be checked this session and is now unquoted, attributed paraphrase: "In her account, he needs them only to do nothing." "The victim asks much more" remains the essay's paraphrase of her next point (from memory: the victim asks the bystander to share the burden of pain). Recheck against the book; if confirmed, the quotation may be restored.
- Jesus was handed over to death by the religious leaders of his day. ESV copy, Mark 15:1 ("the chief priests held a consultation with the elders and scribes and the whole council. And they bound Jesus and led him away and delivered him over to Pilate"). Supported.
- Abuse flourishes where there is no religion at all. General statement, unsourced. Kept as argument.

## Donatists and the Second Helvetic Confession

- North Africa, early fourth century, after Diocletian's persecution, some clergy handed over Scripture to the authorities; a party later called the Donatists held baptisms and ordinations by such men worthless. Not checked against a source this session. Kept as textbook-certain.
- Augustine of Hippo spent years arguing that a minister's sin does not undo the sacrament, because baptism belongs to Christ. WDB: Tractate 6 on John, section 7 ("Peter may baptize, but this is He that baptizeth; Paul may baptize, yet this is He that baptizeth; Judas may baptize, still this is He that baptizeth"); On Baptism, Book 4 ("the sacrament itself is holy in itself on account of Him whose sacrament it is"; the sacrament of Christ "belongs to God alone, and is good even in the worst of men"). The library holds several anti-Donatist works (On Baptism in seven books, Answer to Petilian, the letter on the Correction of the Donatists), which supports "spent years". Supported. Creeds.json local also has the confession saying Augustine "many times argued from the Scriptures against the Donatists."
- The Second Helvetic Confession, written in the 1560s by the Zurich reformer Heinrich Bullinger. Creeds.json local metadata: Bullinger, Zurich, composed 1562 (published 1566 from memory). Supported.
- The confession teaches that the sacraments remain effectual for believers even when unworthy ministers administer them. Creeds.json local, chapter 18, section "EVEN EVIL MINISTERS ARE TO BE HEARD": "the sacraments are sanctified by the institution and the word of Christ, and ... they are effectual to the godly, although they be administered by unworthy ministers." Paraphrase supported.
- Quotation: offenders who cannot be corrected "are to be deposed, and like wolves driven away" from the flock. Creeds.json local, chapter 18, section "SYNODS": "if they are incurable, they are to be deposed, and like wolves driven away from he flock of the Lord by the true shepherds." Matched verbatim; the quotation stops before that edition's typo "he flock". Not compared with a printed edition this session.

## Jesus before the council

- The chief priests and the whole council looked for false testimony against him (Matthew 26:59). ESV copy ("the chief priests and the whole council were seeking false testimony against Jesus"). Matched the quoted words "the chief priests and the whole council" and "false testimony against".
- The beating took place in the high priest's house. ESV copy, Mark 14:53–54 (led to the high priest; the courtyard of the high priest). Supported.
- Quotation: "some began to spit on him and to cover his face and to strike him, saying to him, 'Prophesy!'" (Mark 14:65). ESV copy. Matched. The exclamation point is inside quoted Scripture.

## Forgiveness and reporting

- Quotation: "If your brother sins, rebuke him, and if he repents, forgive him" (Luke 17:3). ESV copy. Matched (the verse opens "Pay attention to yourselves!").
- Quotation: "Beloved, never avenge yourselves, but leave it to the wrath of God, for it is written, 'Vengeance is mine, I will repay, says the Lord'" (Romans 12:19). ESV copy. Matched.
- Quotation: "the servant of God, an avenger who carries out God's wrath on the wrongdoer" (Romans 13:4). ESV copy. Matched. "A few sentences later" (12:19 to 13:4) supported by the chapter layout in the same copy.
- Quotation: "trivial cases" (1 Corinthians 6:2), in a passage about believers going to law against one another. ESV copy ("are you incompetent to try trivial cases?"). Matched.
- Rachael Denhollander, a former gymnast, went public in 2016 with her accusation against Larry Nassar, and spoke at his sentencing in a Michigan courtroom in January 2018. Not checked this session. Kept as textbook-certain (from memory: Indianapolis Star, September 2016; Ingham County court, Lansing, January 24, 2018).
- Paraphrase, no quotation marks: she told him she forgave him and that, if he ever faced what he had done, the gospel offered him a grace he needed far more than her forgiveness. Not checked this session. Kept (from memory of her statement, which spoke of God's forgiveness as what he needed far more than hers).
- She asked the judge for the maximum sentence. Not checked this session. Kept (from memory she asked for the maximum under the plea agreement).

## If you are carrying this now

- Paraphrase: Herman describes recovery as beginning with safety, moving through remembering and mourning, and coming to reconnection with ordinary life and other people; it cannot happen in isolation. Not checked this session. Kept (from memory of the three stages in *Trauma and Recovery*).
- Several psalms are headed as David's prayers from the years he fled from Saul. ESV copy headings: Psalm 52 (Doeg told Saul), 54 (the Ziphites told Saul), 56 (seized in Gath), 57 (fled from Saul, in the cave), 59 (Saul sent men to watch his house), 142 (in the cave). Verified.
- Quotation of the Psalm 57 heading: "when he fled from Saul, in the cave." ESV copy (the heading is printed with verse 1). Matched.
- Psalm 55 as the prayer of someone betrayed by a companion in worship. ESV copy, 55:12–13 ("my companion, my familiar friend"). Supported.
- Quotation: "We used to take sweet counsel together; within God's house we walked in the throng" (Psalm 55:14). ESV copy. Matched.
- Quotation: "His speech was smooth as butter, yet war was in his heart; his words were softer than oil, yet they were drawn swords" (Psalm 55:21). ESV copy. Matched.

## Ezekiel 34 and John 10

- Ezekiel 34 charges Israel's shepherds with feeding themselves instead of the flock. ESV copy, 34:2–3. Supported.
- Quotation: "The weak you have not strengthened, the sick you have not healed, the injured you have not bound up, the strayed you have not brought back, the lost you have not sought, and with force and harshness you have ruled them" (Ezekiel 34:4). ESV copy. Matched.
- Quotation: "Behold, I am against the shepherds, and I will require my sheep at their hand" (Ezekiel 34:10), repeated in part in the ending. ESV copy. Matched.
- Quotation: "I myself will be the shepherd of my sheep" (Ezekiel 34:15). ESV copy. Matched.
- Quotation: the thief "comes only to steal and kill and destroy" (John 10:10); the hired hand "sees the wolf coming" and runs (John 10:12, paraphrase). ESV copy. Matched.
- Quotation: "I am the good shepherd. The good shepherd lays down his life for the sheep" (John 10:11). ESV copy. Matched.

## Closing Texts

- "I will seek the lost, and I will bring back the strayed, and I will bind up the injured, and I will strengthen the weak." (Ezekiel 34:16). ESV copy. Matched (the verse continues).
- "The LORD is near to the brokenhearted and saves the crushed in spirit." (Psalm 34:18). ESV copy. Matched.
- "Cast your burden on the LORD, and he will sustain you; he will never permit the righteous to be moved." (Psalm 55:22). ESV copy. Matched.

## Mechanics and links

- Ran scripts/validate-essays.mjs on 2026-10-27 against a scratch JSON copy of the verified text (scratchpad/dace/v/doubt-after-church-abuse.json). Forbidden language, rulebook words, dashes, exclamation points, Scripture references and Closing Texts format passed. It reported two problems, the same as on 2026-10-26: /writing/excavation-not-demolition and /writing/why-does-god-feel-far-away are "not a public essay (on the shelf with no rewrite yet)". They pass once those rewrites ship.
- /writing/the-bible-assumes-you-will-be-wrong: "live" in docs/work/essays/link-targets.json. /help: allowed by BRIEF.md.
- No em-dash (U+2014) in the file; the only exclamation points are inside quoted Scripture (Psalm 105:15, Mark 14:65). Checked with grep on 2026-10-27.

## Writer's notes kept from 2026-10-26

Discarded from the old essays by the writer: invented biography ("I have served on committees", "I have watched God do", "I am a Baptist pastor. That is my house", which also implied Southern Baptist membership); Diane Langberg and the "more than fifty years" claim; a Johnson and VanVonderen definition in quotation marks; the Bonhoeffer "cheap grace" passages (one old essay misattributed the idea to *Life Together*); the Pennsylvania grand jury figures; Theodore McCarrick; Willow Creek and Bill Hybels; Mars Hill and Mark Driscoll; Bill Gothard and IBLP; Sovereign Grace; a Bob Jones University claim; Christa Brown; Jeff Anderson; the "nobody forges leaves" line; "God is angrier about this than you are"; Matthew 18:6, Matthew 19:14 and John 2:15; Psalm 82 and 1 Corinthians 5:13. Left out because they could not be checked: Diana Garland's 2008 Baylor study on clergy sexual misconduct with adults, and Jennifer Freyd and Carly Parnitzke Smith's research on institutional betrayal. The verifier could not check them either (no web access on 2026-10-27), so they stay out.
