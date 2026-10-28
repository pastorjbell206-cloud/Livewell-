# Claims ledger: what-romans-13-says

Essay: `docs/work/essays/what-romans-13-says.md` ("What Does Romans 13 Say About Obeying the Government?"). New essay, Faith and Power section. Writer's ledger 2026-10-28; this ledger is the verifier's rewrite of it, made on 2026-10-28 after checking every claim again in this order: non-Scripture quotations, numbers, Scripture, then dates, names, events and titles. Each line gives the claim, the result, and the method actually used in this pass. Where a line rests on the writer's run and was not rechecked here, it says so.

## Methods (what each word below means)

- **ESV copy**: the ESV text in the GitHub repository lguenth/mdbible (local clone `scratchpad/esv-mdbible`, commit fd66568, dated 2022-01-20). In this pass the writer's script `scratchpad/r13tools/esvcheck.py` was rerun on the finished essay on 2026-10-28: all 35 quotation instances it finds came back OK both loose (case, punctuation, spacing) and strict. Verses cited without a quotation were read in the same copy by `git show`. This copy is not esv.org; it drops inner quotation marks and does not name its edition.
- **Search (2026-10-28)**: a WebSearch result read in this pass. The tool returns a written summary of result pages, not the pages. "Search summary quoted" means the summary gave the wording; "search returned ESV pages" means the exact-phrase query returned esv.org, biblia.com, Blue Letter Bible or bibleserver ESV pages for that verse but the summary paraphrased instead of quoting. No result page was opened directly. esv.org, ccel, sacred-texts and wikisource could not be fetched from this sandbox (sacred-texts.com was tried with curl and refused by the proxy).
- **Mayhew TCP**: Jonathan Mayhew's *Discourse* (Boston: D. Fowle, 1750), Evans-TCP N05197, fetched again in this pass from raw.githubusercontent.com/textcreationpartnership/N05197/master/N05197.xml (byte-identical to the writer's copy) and searched as plain text by script.
- **Perseus Tacitus**: Tacitus, *Annals*, Church and Brodribb translation, `phi1351.phi005.perseus-eng2.xml`, fetched in this pass from raw.githubusercontent.com/PerseusDL/canonical-latinLit and searched by script.
- **Patristic library**: HistoricalChristianFaith/Writings-Database clone at `scratchpad/wdb` (commit 328918a), read with `git show`, ANF/NPNF translations only.
- **SBLGNT**: MorphGNT SBLGNT files 66-Ro, 65-Ac, 77-Tit fetched again in this pass from raw.githubusercontent.com/morphgnt/sblgnt and searched by verse.
- **Constitution**: local GITenberg clones in `scratchpad/sources`: Gutenberg #5 (`The-United-States-Constitution_5/5-0.txt`) and Gutenberg #18637 (the annotated Constitution of the Library of Congress).
- **Textbook**: a fact judged standard and not checked by any source in this pass. Kept only where certain.

## Changes made in this pass

1. Opening: "spoke to a law enforcement audience" became "spoke to an invited audience". Search summaries describe an invited audience at Parkview Field; none named the attendees as law enforcement.
2. Calvin: "he closed the *Institutes* with Peter's words to the council in Jerusalem" became "in the last section of the *Institutes* he appealed to Peter's words to the council in Jerusalem". The search summary of the final section reports a closing sentence after the Peter quotation, so Peter's words are not the book's last words.
3. Barmen: "a synod of 139 delegates" became "a synod of nearly 140 delegates". Search summaries split between 139 and 138.
4. Ansbach: "Soon afterward" became "In answer to Barmen,". No result gave the statement's date; the summaries describe it as the sharpest opposition to Barmen.
5. Night of the Long Knives: "Before that summer was over" became "That summer". The old wording put the killings after the Ansbach statement, whose date was not verified.
6. Sanctuary movement: "most of them from the religious left" was cut. No result described the congregations' politics.

## Original wording, for restoring

- Opening: "spoke to a law enforcement audience in Fort Wayne, Indiana". Restore only if a transcript or report names the audience as law enforcement.
- Calvin: "and he closed the *Institutes* with Peter's words to the council in Jerusalem." Restore only if the final sentence of *Institutes* 4.20.32 is shown to be Peter's.
- Barmen: "a synod of 139 delegates". Restore if a scholarly source settles 139 over 138.
- Ansbach: "Soon afterward two respected Lutheran professors at Erlangen". Restore if the date of the Ansbacher Ratschlag is confirmed as June 1934 (believed 11 June 1934; not seen in any source this pass).
- Night of the Long Knives: "Before that summer was over, Hitler had rivals". Restore together with "Soon afterward" if the June date is confirmed.
- Sanctuary: "Hundreds of congregations followed, most of them from the religious left." Restore if a source characterizes the participating congregations that way.

## Opening

- June 14, 2018, Attorney General Jeff Sessions spoke in Fort Wayne, Indiana, defending the border policy under which children were separated from parents. Verified by search summary (AP photo captions via search: Parkview Field, Thursday, June 14, 2018; WFYI, Fox 59, NPR, RNS).
- "An invited audience" (corrected from "a law enforcement audience"). Verified by search summary (WFYI and 95.3 MNC: invited attendees at Parkview Field). No result named the audience's professions; one summary of AME coverage said "a speech to law enforcement", and a separate Sessions speech that month was to the Indiana law enforcement conference in Indianapolis.
- Quotation: "the Apostle Paul and his clear and wise command in Romans 13". Verified by search summary quoted (AP-syndicated wording: "I would cite you to the Apostle Paul and his clear and wise command in Romans 13, to obey the laws of the government because God has ordained them for the purpose of order"). The essay paraphrases the rest without quotation marks; other outlets report "God has ordained the government for his purposes".
- Quotation: Sarah Huckabee Sanders said it was "very biblical to enforce the law." Verified by search summary quoted (CBN, NPR, CNN, Fox News, RNS, Al Jazeera, WHYY: "it is very biblical to enforce the law" at the June 14, 2018 briefing). "Later that day": she was answering Jim Acosta's question about Sessions's comments, so it followed the speech; clock times not seen.
- The bishops of the AME Church rejected his reading. Verified by search summary (AME Council of Bishops statement dated June 15, 2018, on ame-church.com and as an RNS press release; CBS, PBS, Fox).
- Within days more than 600 United Methodist clergy and laypeople filed a church-law complaint against Sessions, a United Methodist. Verified by search summary (NBC News, NCR, UM News: complaint sent June 18, 2018).
- Franklin Graham called the separations "disgraceful" in an interview two days before the speech. Verified by search summary (CBN News interview; Christian Post dates it June 12, 2018; Hot Air of June 15 says "on Tuesday"; Mediaite).
- Graham as "one of the president's most loyal evangelical supporters". Characterization; supported by search summary (Mediaite headline "Pro-Trump Evangelist Franklin Graham"; commentators noted his closeness to Trump).
- "In an election season" (voice pass, 2026-10-28; was "In the week of an election"), "So what does the passage ask of us now?" (was "this week") and "Whoever takes office in January": the next US general election is Tuesday, November 3, 2026 (textbook). The voice pass removed the two "this week" anchors so the opening and the application read true whenever the essay lands between the campaign and the January swearing-in; "Whoever takes office in January" holds after any November general election.

## Who Paul Was Writing To

- Paul wrote Romans in the middle or late 50s, probably from Corinth. Verified by search summary (Wikipedia "Epistle to the Romans": late 55 to early 57; commentaries placing it at Corinth from Gaius, Romans 16:23, and Phoebe of Cenchreae).
- Paul had never visited Rome. Verified from the text: ESV copy, Romans 1:13 and 15:22-23 read in this pass.
- Quotation: "the church in their house" (Romans 16:5). ESV copy: OK. Search summary quoted the ESV wording ("Greet also the church in their house", esv.org, biblia.com).
- Quotation: "because Claudius had commanded all the Jews to leave Rome" (Acts 18:2). ESV copy: OK. Search summary confirmed the esv.org wording.
- Prisca and Aquila are the first greeting in the list (Romans 16:3). ESV copy: 16:3 read in this pass ("Greet Prisca and Aquila"). "Evidently back in Rome" is the ordinary reading of Romans 16 as sent to Rome.
- Nero came to the throne in 54 at the age of sixteen. Verified by search summary (Wikipedia and mirrors, worldhistory.org: emperor 54 aged sixteen; born 15 December 37).
- Tacitus records that in 58 the people's complaints about the greed of the tax collectors made Nero consider abolishing the indirect taxes, until his advisers talked him out of it. Verified against Perseus Tacitus, *Annals* 13.50: "That same year, repeated demands on the part of the people, who denounced the excessive greed of the revenue collectors, made Nero doubt whether he should not order the repeal of all indirect taxes ... But this sudden impulse was checked by the senators". The year is 58: the year opens at 13.34 with Nero's third consulship with Valerius Messala (read in the same file). "Advisers" renders the men Church and Brodribb call "senators".
- "The Christians of Rome paid those taxes." Interpretive, from Romans 13:6 ("For because of this you also pay taxes", ESV copy, read in this pass).
- Fire in Rome in 64; Nero blamed the Christians and had many put to death so cruelly that people began to pity them; Tacitus despised the sect. Verified against Perseus Tacitus, *Annals* 15.44 ("a class hated for their abominations", "a most mischievous superstition", "there arose a feeling of compassion; for it was not, as it seemed, for the public good, but to glut one man's cruelty"). The year 64: search summary (Wikipedia "Tacitus on Jesus": the fire of July 64).
- Early Christian tradition holds that Paul was executed in Rome under Nero. Verified against the patristic library, Eusebius, *Church History* 2.25 (NPNF): "Paul was beheaded in Rome itself, and that Peter likewise was crucified under Nero."
- Quotation: "Let every person be subject to the governing authorities" (Romans 13:1). ESV copy: OK. Search summary confirmed the ESV wording (esv.org Romans 13:1-7, bible.com).

## Romans 13 in Its Place in the Letter

- The chapter break was added in the Middle Ages. Verified by search summary (Wikipedia "Chapters and verses of the Bible", Tyndale House: Stephen Langton's system, early thirteenth century).
- Quotation: Romans 12:1 in full. ESV copy: OK. Search returned ESV pages (Blue Letter Bible, bibleserver) for the exact phrase; summary paraphrased.
- Quotation: "Bless those who persecute you; bless and do not curse them" (12:14). ESV copy: OK. Search returned ESV pages (esv.org Romans 12:14-21, biblia.com); summary paraphrased.
- Quotation: "Repay no one evil for evil" (12:17). ESV copy: OK. Search returned ESV pages (same); summary paraphrased.
- Quotation: "Beloved, never avenge yourselves, but leave it to the wrath of God" (12:19). ESV copy: OK. Search returned ESV pages (Blue Letter Bible); summary paraphrased.
- Quotation: "if your enemy is hungry, feed him" (12:20). ESV copy: OK. Search returned ESV pages (esv.org Romans 12:14-21); summary paraphrased.
- Quotation: "is the servant of God, an avenger who carries out God's wrath on the wrongdoer" (13:4). ESV copy: OK. Search summary quoted the ESV wording (esv.org Romans 13:4).
- Greek: "avenge" (12:19) and "avenger" (13:4) share a root; "wrath" is the same word in both. Verified against SBLGNT: 12:19 ἐκδικοῦντες (ἐκδικέω) and ἐκδίκησις, ὀργῇ; 13:4 ἔκδικος, ὀργήν.
- Quotation: Romans 13:7 in full. ESV copy: OK. Search summary confirmed the ESV wording ("Pay to all what is owed to them" and "respect to whom respect is owed, honor to whom honor is owed", esv.org, biblia.com).
- Quotation: Romans 13:8 in full (body and Closing Texts). ESV copy: OK. Search summary quoted the full ESV wording (esv.org).
- "He picks up the same word": 13:7 ὀφειλάς (ὀφειλή) and 13:8 ὀφείλετε (ὀφείλω). Verified against SBLGNT.
- Quotation: "Love does no wrong to a neighbor; therefore love is the fulfilling of the law" (13:10). ESV copy: OK. Search summary said the wording matches the ESV (Blue Letter Bible, bibleserver); paraphrased.
- Quotation: "The night is far gone; the day is at hand" (13:12; body and Closing Texts). ESV copy: OK. Search summary quoted the ESV wording.
- The section ends with putting on Christ (13:14). ESV copy: read in this pass.
- 12:1 "worship" (λατρείαν) is not among what 13:7 says is owed (φόρος, τέλος, φόβος, τιμή). Verified against SBLGNT. Interpretive.

## The Case for Obedience

- Quotations: "every person" and "have been instituted by God" (13:1). ESV copy: OK by eye. Search summary confirmed the ESV wording ("For there is no authority except from God, and those that exist have been instituted by God").
- Quotation: Romans 13:2 in full. ESV copy: OK. Search summary said the wording matches the ESV (esv.org, Blue Letter Bible).
- Quotation: "Be subject for the Lord's sake to every human institution, whether it be to the emperor as supreme" (1 Peter 2:13). ESV copy: OK. Search summary said the wording matches esv.org. "The churches of Asia Minor": ESV copy, 1 Peter 1:1 read in this pass (Pontus, Galatia, Cappadocia, Asia, Bithynia).
- Polycarp of Smyrna, before the proconsul around 155, refused to swear by the fortune of Caesar. Verified against the patristic library, *Martyrdom of Polycarp* 9-10 (ANF): "Swear by the fortune of Caesar". Date: search summary (most experts place the death on 23 February 155 or 22 February 156; Eusebius's Chronicle and some scholars put it later). "Around 155" stands.
- Quotation: "we are taught to give all due honour (which entails no injury upon ourselves) to the powers and authorities which are ordained of God." Verified verbatim against the patristic library, *Martyrdom of Polycarp* 10 (ANF), British spelling as printed.
- "He would not swear, and he died for it, still honoring the office of the governor who let him be burned." (voice pass wording; same claim as "He died rather than swear. But he died honoring ...") Verified against the patristic library (ANF chs. 11-13: the proconsul's herald proclaims his confession, the crowd demands he be burned alive, and it is done; the ANF heading reads "Polycarp is Sentenced to Be Burned"). Interpretive summary.
- Calvin spent much of the last chapter of the *Institutes* teaching that private Christians owe obedience even to wicked rulers; a bad king may be God's judgment on a people's sins; the private person's part is to repent and pray, not take up arms. Verified by search summary, secondary sources only (Cambridge abstract: largely unquestioning obedience even to tyrannical superiors; a study outline: patience 4.20.25, prayer 4.20.29; Boer paper: tyranny may be divine punishment for sin, citing 4.20.7 and 25, and private citizens may not resist; a forum post reproducing the text: vengeance is not committed to private men). The *Institutes* text itself was not opened.
- The practical-wisdom paragraph. Interpretive; no factual claim.

## The Case for Resistance

- In 1750, on the Sunday after the anniversary of Charles I's execution, Jonathan Mayhew, pastor of the West Church in Boston, preached the sermon that became *A Discourse Concerning Unlimited Submission and Non-Resistance to the Higher Powers*. Verified against Mayhew TCP (title page: "The Substance of which was delivered in a SERMON preached in the West Meeting-House in Boston the LORD'S DAY after the 30th of January, 1749/50", "Pastor of the West Church in Boston", Boston 1750). Search summary agrees (Wikipedia "Jonathan Mayhew").
- The Church of England kept January 30 as a solemn day in the king's memory. Verified as Mayhew's account in Mayhew TCP (the preface's "on which solemnity"; the body: Charles II's first parliament "ordered the Thirtieth of January ... to be kept as a day of solemn humiliation").
- Quotation: "the slavish doctrine of passive obedience and non-resistance, is often warmly asserted." Verified verbatim against Mayhew TCP (comma as printed).
- Mayhew went through Romans 13 verse by verse. Verified against Mayhew TCP (the *Discourse* prints Rom. 13:1-8 and comments on it in order).
- Paraphrase: Paul's case for submission rests on what rulers are for. Verified against Mayhew TCP ("his reasoning, in order to show the duty of subjection to the higher powers, is ... built wholly upon the supposition, that they do, in fact, perform the duty of rulers").
- Quotation: "the apostle was no sycophant, or parasite of power." Verified verbatim against Mayhew TCP.
- Quotation: "Rulers have no authority from God to do mischief." Verified verbatim against Mayhew TCP.
- Quotation: "It is blasphemy to call tyrants and oppressors, God's ministers." Verified verbatim against Mayhew TCP (comma as printed).
- Paraphrase: every ruler is fallible; if ill management in some instances justified disobedience no government could stand; what forfeits obedience is acting against the public good habitually. Verified against Mayhew TCP ("in some instances, very ill-managed; for upon this principle, it is scarcely supposeable that any government at all could be supported"; "their acting so in a few particular instances, which the best of rulers may do through mistake ... but their acting so habitually").
- Calvin allowed that lesser magistrates appointed to check kings, like the ephors of Sparta, would betray the people if they did not resist a king's tyranny. Verified by search summary (a forum post reproducing the text: popular magistrates who fail to check kings betray the people; a University of the Free State article on the ephors; Reformation21 citing 4.20.31).
- In the last section of the *Institutes* Calvin appealed to Peter's words (Acts 5:29) (corrected). Verified by search summary (Ligonier: the final section recalls Acts 5:29 and then gives a closing sentence about suffering rather than turning aside from piety; a forum post quoting the final sections).
- Jonathan Boucher, Anglican rector in Maryland, taught that obedience is commanded by God, preached with loaded pistols on the pulpit, and sailed for England in September 1775. Verified by search summary (Mount Vernon digital encyclopedia, Wikipedia, Episcopal Church dictionary: rector in Maryland from 1770, pistols on the pulpit cushion, "sailed for England in September of 1775", an adherent of Filmer's divine right of kings). The "commanded by God" wording rests on the writer's search summary of his sermon on passive obedience (obedience "enjoined by the positive commands of God"); not seen in this pass.
- Benjamin Franklin proposed a seal showing Pharaoh overwhelmed by the Red Sea with the motto "Rebellion to tyrants is obedience to God." Verified by search summary (the Gutenberg history of the seal, #73844, and greatseal.com: committee named July 4, 1776; John Adams to Abigail, August 14, 1776, quoting the motto in this sentence case; committee report endorsed August 10 or 20, 1776).
- "The next summer" after September 1775 is summer 1776. Follows from the two lines above.
- Quotation: "God's servant for your good" (Romans 13:4). ESV copy: OK. Search summary quoted the ESV wording.
- Whether the Revolution was a just war is left open. No factual claim.

## How the Passage Has Been Used

- The Fugitive Slave Act passed in September 1850, about two months before November 24. Verified by search summary (Wikipedia: Senate August 23, House September 12, signed September 18, 1850; it required escaped slaves to be returned).
- Ichabod Spencer, Presbyterian pastor in Brooklyn, preached on November 24, 1850, on Titus 3:1 and printed the sermon as *The Religious Duty of Obedience to Law*. Verified by search summary (Mississippi Department of Archives and History, Gutenberg #13988, Gilder Lehrman: Second Presbyterian Church, Brooklyn, Nov. 24, 1850; New York, M. W. Dodd, 1850; full title *Fugitive Slave Law: The Religious Duty of Obedience to Law*). The Gilder Lehrman summary says Spencer did not defend the law's justice but held that courts, not individuals, should judge it; "urged Christians to obey" stands.
- Quotation: "submissive to rulers and authorities" (Titus 3:1). ESV copy: OK. Search summary quoted the ESV wording.
- The law required the return of people who had escaped slavery. Verified by search summary (see the Fugitive Slave Act line).
- The German Christians won the church elections of 1933 with the regime's support. Verified by search summary (elections of July 23, 1933; Hitler's radio endorsement the day before; about 70 percent for the German Christians).
- The new order's friends leaned on Romans 13 in a Protestant culture long taught obedience to the state. Partly supported by search summary (blog accounts of Joachim Hossenfelder's July 1933 sermon on Romans 13; a Le Mans university page on the two-kingdoms teaching and acceptance of the regime). General statement with no named example; kept as general.
- The Barmen synod met at the end of May 1934, delegates from Lutheran, Reformed and United churches, and adopted a declaration written mostly by Karl Barth. Verified by search summary (Britannica; May 29-31, adopted May 31, 1934; Barth chief author with Hans Asmussen and Thomas Breit).
- "Nearly 140 delegates" (corrected from 139). Search summaries give 139 (evangelisch.de, Heidelblog, a 1984 Italian source) and 138 (a Cambridge chapter, Freitag, possibly counting voting members).
- Barmen's fifth article takes its text from 1 Peter 2:17. Verified by search summary (Baptist Standard PDF of the Declaration: "Fear God. Honor the Emperor.").
- Paraphrase of thesis 5: by God's appointment the state provides for justice and peace in a world not yet redeemed, by the threat and use of force. Verified by search summary ("by divine appointment the State, in this still unredeemed world" ... threat and use of force). No quotation marks used.
- Quotation: "the single and totalitarian order of human life". Verified by search summary (the Declaration's text at section 8.23 on sacred-texts, ucc.org, the Barth Center). Translations vary ("sole and total order" in another).
- In answer to Barmen, Paul Althaus and Werner Elert of Erlangen signed, with a circle of pastors at Ansbach, a statement thanking God for giving the people the Führer as a pious and faithful sovereign. Verified by search summary (synagoge-ansbach.de history PDF and sonntagsblatt.de: the Ansbacher Kreis with Althaus and Elert; thesis 5 "den Führer als 'frommen und getreuen Oberherrn' geschenkt"; the strongest opposition to Barmen; set apart from Barmen by its natural orders). Date not found in any result; timing wording corrected (see Changes). "Respected" is characterization.
- Luther's Small Catechism lists good rulers among what is asked for in the daily-bread petition. Verified by search summary (projekt-gutenberg.org Luther text: "fromme und treue Oberherren", "gut Regiment"; evangelisch.de modern form). "The phrase is close to" stands.
- That summer Hitler had rivals inside and outside his party killed without trial in the Night of the Long Knives. Verified by search summary (USHMM: June 30 to July 2, 1934; Röhm and SA leaders and conservative critics including Schleicher; the Reichstag declared the killings legal after the fact).
- Barmen said nothing about the Jews, already being pushed out of German public life. Verified by search summary (sonntagsblatt.de "die siebte Barmer These": Barmen says nothing about the general persecution of Jews that began after the seizure of power in 1933).
- In 1967 Barth wrote that he had long felt guilty for not making that question central at Barmen. Verified by search summary (Acton Institute blog reprint: "I have long felt guilty myself that I did not make this problem central"; a bibliography cites the letter to Bethge of 22 May 1967, EvTh 28, 1968). Paraphrase in the essay; secondary.
- In 1982 Southside Presbyterian Church in Tucson, led by John Fife, declared itself a public sanctuary in open defiance of federal immigration law. Verified by search summary (PC(USA) history: declaration read January 24, 1982; Wikipedia "John Fife"). The essay gives only the year; the writer's run found March 24, 1982 in Wikipedia "Sanctuary movement".
- "Under a Republican administration" (Reagan, 1982). Textbook.
- "Hundreds of congregations followed." Verified by search summary (Wikipedia: over 500 at the peak; Encyclopedia.com: 600; Chicago Talks: over 150 open sponsors and 1,000 endorsers).
- "Most of them from the religious left." Cut (see Changes).
- In 1985 a federal grand jury indicted sixteen sanctuary workers; eight, Fife among them, were convicted the next year. Verified by search summary (PC(USA) history: January 1985 Phoenix grand jury, 16 on 71 counts; May 1986, eight of eleven defendants convicted; Fife convicted, five years' probation).
- 2018: an attorney general quoted Romans 13 at the same border. Restates the opening.
- 2020: California's Democratic governor restricted indoor worship. Verified by search summary (Newsom's mid-July 2020 order closing indoor services; RNS, Baptist Press). Party: textbook.
- Grace Community Church, John MacArthur, complied with the first shutdown that spring. Verified by search summary (closed mid-March 2020; churchleaders.com headline "MacArthur Explains Why He Didn't Defy State Orders During First Shutdown"). "In Los Angeles": the church is in Sun Valley (NBC Los Angeles), a district of the city (textbook).
- Quotation (title): "Christ, not Caesar, Is Head of the Church"; the church kept meeting, arguing from Romans 13 that the state had stepped outside its sphere. Verified by search summary (colby.edu repost of the elders' statement of July 24, 2020; the Christian Worldview page lists it as "Christ, Not Caesar, Is Head of the Church"; the statement says Romans 13 and 1 Peter 2 bind Christians to obey but grant civic rulers no jurisdiction over the church, and describes family, state and church as separate spheres; worship held July 26, 2020). Capitalization of "not" varies between copies.
- Defenders of the orders quoted Romans 13 back at the churches that stayed open. Partly verified by search summary (The Federalist's critique of MacArthur's use of Romans 13; the Baxter comparison in Eternity News; the writer's run also found a Henry Institute essay and a Grand Forks Herald column). General statement.
- "Which of those uses looks faithful to you probably depends on how you vote." Opinion.

## What the Rest of Scripture Adds

- The council ordered the apostles not to teach in Jesus' name (Acts 5:28); they were beaten and released (5:40). ESV copy: read in this pass.
- Quotation: "We must obey God rather than men" (Acts 5:29). ESV copy: OK. Search summary quoted the ESV wording (esv.org, biblia.com).
- Quotation: "rejoicing that they were counted worthy to suffer dishonor for the name" (Acts 5:41). ESV copy: OK. Search summary said the ESV wording checks out (bible.com, esv.org).
- Quotation: Daniel 3:18 in full. ESV copy: OK. Search summary quoted the full ESV wording (bible.com, Blue Letter Bible, esv.org).
- Quotation: "set aside the king's command, and yielded up their bodies rather than serve and worship any god except their own God" (Daniel 3:28). ESV copy: OK. Search summary confirmed the ESV wording ("set aside the king's command") and paraphrased the rest. The verse opens with the king's blessing, so "The king himself later described" holds.
- Daniel 6: decree against petition to any god or man but the king (6:7); prayer toward Jerusalem three times a day (6:10); the king came at break of day (6:19). ESV copy: read in this pass.
- Quotation: "as he had done previously" (Daniel 6:10). ESV copy: OK. Search summary confirmed the ESV wording (bible.com, esv.org).
- Quotation: "O king, live forever!" (Daniel 6:21). ESV copy: OK. Search returned ESV pages (esv.org Daniel 6:21-23); summary paraphrased. The one exclamation point is inside this verbatim Scripture.
- Quotation: "before you, O king, I have done no harm" (Daniel 6:22). ESV copy: OK. Search returned ESV pages (same); summary paraphrased.
- Greek: Romans 13:1 ὑποτασσέσθω ("be subject"); Acts 5:29 πειθαρχεῖν ("obey"); Titus 3:1 has both ὑποτάσσεσθαι and πειθαρχεῖν. Verified against SBLGNT.
- Quotation: "to be submissive to rulers and authorities, to be obedient" (Titus 3:1). ESV copy: OK. Search summary quoted the ESV wording ("Remind them to be submissive to rulers and authorities, to be obedient, to be ready for every good work").
- Martin Luther King Jr. pointed to the three men in Babylon in his Birmingham jail letter in 1963. Verified by search summary (study pages on the letter's Shadrach, Meshach and Abednego allusion; letter dated April 16, 1963).
- Quotation: "one who breaks an unjust law must do so openly, lovingly, and with a willingness to accept the penalty." Verified by search summary (Bill of Rights Institute, The Root and quotation pages give this wording). Not checked against a primary copy. The letter's capital "One" is lowered to fit the sentence.
- Quotation: "And to it the dragon gave his power and his throne and great authority" (Revelation 13:2). ESV copy: OK. Search summary said it appears in the ESV text (bibleserver).
- Quotation: "Who is like the beast, and who can fight against it?" (Revelation 13:4). ESV copy: OK. Search summary said it appears in the ESV text (bibleserver).
- The beast makes war on the saints (13:7); a second beast demands worship for the first beast's image and decides who may buy and sell (13:11-17). ESV copy: read in this pass (13:7, 11, 12, 14-17).
- Quotation: "drunk with the blood of the saints" (Revelation 17:6); seven mountains (17:9). ESV copy: OK; 17:9 read in this pass. Search summary quoted 17:6 (esv.org).
- "Most readers ancient and modern have seen Rome in her." Verified against the patristic library: Victorinus of Pettau, *Commentary on the Apocalypse* (ANF), on 17:9: "That is, the city of Rome"; Tertullian, *An Answer to the Jews* 9 (ANF): "Babylon, in our own John, is a figure of the city Rome". Modern: search summary (Wikipedia "Whore of Babylon": the seven mountains are typically understood as Rome's seven hills).
- Quotation: "Here is a call for the endurance and faith of the saints" (Revelation 13:10). ESV copy: OK. Search summary quoted the ESV wording (esv.org, biblestudytools).

## Romans 13 for Citizens Who Vote

- Quotation: "We the People of the United States" (Preamble). Constitution: Gutenberg #18637 (Library of Congress annotated Constitution) prints "We the People of the United States"; Gutenberg #5 prints lowercase "people". The capital is kept.
- Every federal and state officer is bound by oath to support the Constitution (Article VI). Verified against Constitution, Gutenberg #5 ("shall be bound by Oath or Affirmation, to support this Constitution", covering senators, representatives, state legislators and all executive and judicial officers of the United States and the states).
- Quotation: the president swears to "preserve, protect and defend the Constitution of the United States" (Article II). Verified verbatim against Constitution, Gutenberg #5.
- Quotations: "for your good" (13:4) and "does no wrong to a neighbor" (13:10). ESV copy: OK by eye. Search summaries as above (13:4 quoted; 13:10 matched).
- Quotation: "honor to whom honor is owed" (13:7) "with Nero on the throne". ESV copy: OK. Search summary as above. Nero's reign from 54 covers the date of writing.
- Romans 12:14 tells Christians to bless their persecutors. ESV copy (see above).
- Quotation: "for kings and all who are in high positions" (1 Timothy 2:2). ESV copy: OK. Search summary quoted the ESV wording (esv.org).
- Quotation: "not only to avoid God's wrath but also for the sake of conscience" (Romans 13:5). ESV copy: OK. Search summary said the wording matches the ESV (Blue Letter Bible, bibleserver); paraphrased.

## Ending and Closing Texts

- "Whoever takes office in January": a new Congress and most newly elected state officers take office in January after a November election. Textbook. See the timing flag under Opening.
- "The church lived that way for most of three centuries, at times under emperors who wanted it gone" (link to the early church essay). Consistent with the approved pilot `the-early-church-under-rome.md`; not rechecked against a source in this pass.
- Quotation: "You would have no authority over me at all unless it had been given you from above" (John 19:11), spoken to Pilate. ESV copy: OK. Search summary gave the esv.org wording nearly verbatim.
- He went to the cross and was raised on the third day. Confession (1 Corinthians 15:3-4); no quotation.
- Closing Texts: Romans 13:8 (ESV copy: OK; search summary quoted); Romans 13:12 (ESV copy: OK; search summary quoted); Psalm 146:3 "Put not your trust in princes, in a son of man, in whom there is no salvation." (ESV copy: OK; search summary said Blue Letter Bible and bibleserver print it as quoted).

## Links

- /writing/was-america-founded-as-a-christian-nation, /writing/what-christian-nationalism-is-and-is-not, /writing/the-early-church-under-rome: all three slugs found in `docs/work/essays/link-targets.json` by script in this pass.

## Checks run on the essay in this pass

- No em-dash (U+2014): grep count 0.
- One exclamation point, inside the verbatim quotation of Daniel 6:21.
- Forbidden language: `scripts/lib/forbidden-language.mjs` regex (after `setAsideAllowed`) over the text: no hits.
- Shelf stamps ("Those of us who preach", "pastors like me", "This is not both-sidesism", "Consider ...", "none of this", "the record", "I don't exempt myself"): none (one "considered", the Tacitus line, is not the stamp). "Fair" once ("could fairly conclude"); "honest" not used.
- ESV copy script rerun after the edits: 35 of 35 OK.
- Voice pass (2026-10-28, final reader): 21 wording edits for AI tells (announced turn, two-beat closers, a four-part "It asks" run, the repeated "no vote" motif, paired parallel sentences, four over-long sentences split). Script check against the pre-pass text: all 58 quoted strings, all three links and every number identical; no em-dash, en-dash or double hyphen; forbidden language none; one exclamation point, inside Daniel 6:21.

## Still open

- Every Scripture line: recheck once against esv.org or the ESV API when James's key exists. Lines marked "search returned ESV pages" rest on the local copy for exact wording.
- Date of the Ansbacher Ratschlag (believed 11 June 1934); if confirmed, restore the original timing words (see above).
- Barmen delegate count (138 or 139).
- Calvin, *Institutes* 4.20.25 and 4.20.32: checked only through secondary summaries.
- Publication timing: after the voice pass the opening and application assume only an election season (November 3, 2026) and a January swearing-in; no line names a week.
