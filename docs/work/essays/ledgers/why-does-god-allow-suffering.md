# Claims ledger: why-does-god-allow-suffering

Essay: docs/work/essays/why-does-god-allow-suffering.md ("Why Does God Allow Suffering?"). Rewrite of the machine essay of the same slug; folds in is-god-in-control and natural-evil-and-animal-suffering. Drafted 2026-10-26. The first verifier rewrote this ledger on 2026-10-27 with no web search available. A second pass (the "closing pass", also 2026-10-27) worked through every line that was still open and records here what it actually saw. A third pass (the "search pass", also 2026-10-27) had a web-search budget of its own and closed what the closing pass left open.

## Status at a glance (search pass, 2026-10-27)

- 10 lines were open when the search pass began: the five items under "Still open" (seven ledger lines: Plantinga's defense persuading atheists; *A Grief Observed* under N. W. Clerk; the surname Davidman; Aaron Kushner's progeria and death; Kushner's conclusion; the Wesleyan and Arminian characterization; the 988 line) and three lines that still rested on textbook judgment or the writer's record (Epicurus's argument absent from his surviving works; the date of *On the Anger of God*; Asa Gray as a botanist).
- All 10 are now verified against sources the search pass saw. None differed from the essay, so the search pass made no correction, paraphrase or cut, and the essay text is unchanged by it.
- The 25 Scripture quotations were matched a third time: by the search pass's own script against the ESV copy (all 25, words and punctuation, with negative controls that failed as they should), and by WebSearch against current ESV wording, because the copy is the 2011 text and the ESV's 2016 revision changed 29 verses. Every quotation matched the current ESV text in the results (see "Scripture against current ESV" below).
- The non-Scripture quotations were re-read in their sources by the search pass: Lactantius and Augustine (WDB), Hume and Dostoevsky (GITenberg #4583 and #28054, re-cloned), and the Westminster Confession (Creeds.json, re-fetched). All verbatim.
- Nothing remains open. 44 WebSearch queries used.

## Status at a glance (closing pass, 2026-10-27)

- 37 lines were open when the closing pass began (marked "Not re-checked", "Textbook", "Not checked", or resting only on the writer's 2026-10-26 search record).
- 23 are now verified against a source the closing pass saw, 9 were corrected, cut or generalized in the essay, and 5 remained open (all five closed by the search pass; see the status above).
- The 25 Scripture quotations, already matched by the first verifier, were matched again by the closing pass (25 of 25, words and punctuation).

## What each pass could reach

- **First verifier.** No web search (the workflow's shared budget was spent) and no web pages; GitHub and local files only. Where a line says "writer's 2026-10-26 search record", that is the writer's report, repeated.
- **Closing pass.** 16 WebSearch queries returned results before the workflow's shared budget of 200 ran out; four more were refused ("this turn's web search budget is used up"), so a few lines that needed search are left open below. Web pages themselves could not be opened: gutenberg.ca, fadedpage.com, pbs.org, talkorigins.org and collections.libraries.indiana.edu were refused by the proxy (403). Matches marked "search" rest on the result titles and quoted text the search tool returned, not on the pages. GitHub was reachable, and the closing pass found several public-domain books through the GITenberg catalog (`gitenberg/data/GITenberg_repo_list.tsv` in github.com/gitenberg-dev/gitberg).
- **Search pass.** 44 WebSearch queries, all answered, out of a budget of about 200 set aside for this essay. Web pages still could not be opened: corpus.historyofmethodism.com (the Wesley Corpus) and evangelicalarminians.org were refused by the proxy, so the search pass, like the closing pass, matched only against the result titles and the text the search tool returned. GitHub was reachable: it re-cloned Hume (#4583) and the Garnett *Brothers Karamazov* (#28054) from GITenberg and re-fetched the Westminster Confession from Creeds.json.

## Method key

- **"ESV copy"**: compared by script with the ESV text in the public GitHub repository lguenth/mdbible, file `json/ESV.json` (metadata: "English Standard Version 2011", SWORD module 1.0.2), commit fd66568 in the scratchpad clone. The closing pass re-ran the comparison with its own script (words only, then with punctuation kept, quotation marks and dashes normalized, LORD read as "Lord"), with three negative controls that failed as they should (NIV "bondage to decay"; a semicolon in Romans 12:15; "with the hearing" in Job 42:5). This is not esv.org or the ESV API; recheck with James's API key once it exists.
- **"BSB"**: the site's own Berean Standard Bible text in client/public/bible/ch/, read to confirm each verse's location and sense (not ESV wording).
- **"WDB"**: read with `git show` in the scratchpad clone of github.com/HistoricalChristianFaith/Writings-Database (commit 328918a), ANF/NPNF translations only.
- **"Gutenberg (GITenberg)"**: Project Gutenberg texts cloned from the GITenberg mirrors on GitHub. First verifier: Hume, *Dialogues Concerning Natural Religion* (#4583); Dostoevsky, *The Brothers Karamazov*, Garnett translation (#28054). Closing pass: *The Life and Letters of Charles Darwin*, vol. II (#2088, `Life-and-Letters-of-Charles-Darwin---Volume-2_2088`); Voltaire, *Toleration and Other Essays*, tr. Joseph McCabe (#64858), which includes "Poem on the Lisbon Disaster"; Diogenes Laertius, *Lives and Opinions of Eminent Philosophers*, tr. C. D. Yonge (#57342); T. H. Huxley, *Hume* (#18819); Edwin J. Houston, *The Wonder Book of Volcanoes and Earthquakes* (#43320); *Factos Notaveis da Historia Portugueza e Biographia do Marquez de Pombal* (#32869); Maurice Baring, *An Outline of Russian Literature* (#33005) and *Landmarks in Russian Literature* (#68597); William Lyon Phelps, *Essays on Russian Novelists* (#5996); John Stoughton, *Ecclesiastical History of England from the Opening of the Long Parliament* (#64226); *The Book of Common Prayer and the Scottish Liturgy* (#29622).
- **"Creeds.json"**: Westminster Confession from raw.githubusercontent.com/NonlinearFruit/Creeds.json (first verifier).
- **"Search"**: a WebSearch the closing pass ran on 2026-10-27; the line names what the results showed.
- **"Search (search pass)"**: a WebSearch the search pass ran on 2026-10-27; the line names the sites in the results and what they showed. For Scripture, "current ESV" means the results were ESV-labelled pages (esv.org, biblia.com/esv, bible.com/bible/59, biblestudytools.com/esv and similar) and the tool reported their wording matched the essay's.

## Changes made to the essay

First verifier (2026-10-27):

- Tsunami "About forty minutes later" became "Within the hour"; death toll "from about ten thousand to sixty thousand" became "vary widely, into the tens of thousands"; Malagrida's "in 1756" cut; Rousseau's "twenty thousand houses six and seven stories high" became "thousands of tall houses".
- Rowe: the sentence "No one sees it, and no one learns anything from it." cut (not in Rowe's scenario).
- Lewis, *A Grief Observed*, and Wolterstorff, *Lament for a Son*: quotations became attributed paraphrase; Wolterstorff's "mourning bench" became "sit beside him in his grief"; "In 1983", "twenty-five years old" and "in Austria" cut; "knew every argument" softened to "knew the arguments".
- Kushner: "diagnosed at three ... died in 1977, two days after his fourteenth birthday" became "diagnosed as a small child ... died in his early teens".
- Job 42:8 paraphrase corrected ("sent to Job so that he can pray for them"); "Job's last words" became "Job's last speech"; "Jesus was asked the friends' question" became "Jesus faced".

Closing pass (2026-10-27):

- Lisbon: "a tsunami surged up the Tagus into the lower city, and fires started by fallen candles and kitchen hearths burned for days in the districts the water didn't reach" became "a tsunami surged up the Tagus onto the waterfront, and fires broke out across the city and burned for days". The sources seen put the wave in the river and over the quays, and record many fires burning five or six days; none of them gives the candles-and-hearths cause or "districts the water didn't reach".
- Malagrida: "urged Lisbon toward processions and penance before rebuilding" became "called the city to penance". Search confirmed penance as the pamphlet's remedy; it showed nothing on processions or rebuilding.
- Dostoevsky: "*The Brothers Karamazov*, published in 1880" became "*The Brothers Karamazov*, his last novel". No source seen gives the publication year; Phelps and Baring confirm it was his last work.
- Lewis: "died of cancer in July 1960" became "died in 1960". Search confirmed 1960; month and cause were not seen.
- Kushner: "was diagnosed as a small child with progeria ... and died in his early teens" became "had progeria ... and died young"; "published in 1981" cut; "millions of readers" became "many readers". No Kushner source could be reached this pass.
- Lament: "Dozens of psalms are complaints" became "Many psalms are complaints" (see that line).
- No em-dash added (grep for U+2014 after the edits: zero). Forbidden-language words: zero. No exclamation point in the essay.

Search pass (2026-10-27):

- None. Every line it checked matched the essay as it stood. Details the earlier passes generalized because no source was reachable are now confirmed and could be restored if James wants them: Aaron Kushner's diagnosis at three and death in 1977, two days after his fourteenth birthday; *When Bad Things Happen to Good People* in 1981; *A Grief Observed* in 1961. The search pass left the essay's wording alone.

## Biography

- "I came to faith as an adult, out of atheism." Matches the confirmed biography in docs/work/NOTES.md. The rest of that sentence is a stance, not an event; James should confirm he is comfortable with it.
- "Baptists, my own tradition." NOTES.md allows Baptist self-identification; no Southern Baptist claim is made.
- "Most of us who have stood with a grieving family" and "better than I do": general, no scene or person invented.

## Lisbon, 1755

- Earthquake on the morning of November 1, 1755, All Saints' Day, churches full for Mass, roofs falling on worshipers. **Verified (closing pass).** British envoy's letter of 15 November 1755, quoted in Portuguese in *Biographia do Marquez de Pombal* (GITenberg #32869): the first shock began "pelas dez horas menos um quarto da manhã" (a quarter to ten in the morning). Same book: "Era dia de Todos os Santos, o povo da capital corria para as egrejas para ouvir missa" (All Saints' Day, people hurrying to church to hear Mass). McCabe's introduction (GITenberg #64858): "the Feast of All Saints (November 1), and the crowded churches were in the very act of worship, when the ground shook". Houston (GITenberg #43320): "most of these buildings fell and buried the worshippers".
- Tsunami "within the hour" up the Tagus "onto the waterfront". **Corrected (closing pass)** from "into the lower city". Houston: the wave "did not reach the mouth of the Tagus River until about half an hour after the most severe shocks"; the envoy's letter: the quay from the customs house to the palace sank and the waters rose twenty to thirty feet.
- Fires "broke out across the city and burned for days". **Corrected (closing pass)**: the cause (candles and kitchen hearths) and "the districts the water didn't reach" cut. The envoy's letter: "rebentaram muitos incendios, que no espaço de cinco ou seis dias consumiram todos os generos" (many fires broke out, which in five or six days consumed everything); the Pombal biography: fire appeared "em differentes sitios da cidade" (in different parts of the city).
- Dead "into the tens of thousands", estimates vary widely. **Verified (closing pass).** The sources seen disagree: the Pombal biography gives "mais de dez mil" (more than ten thousand) and quotes the envoy's "trinta mil" (thirty thousand); McCabe gives 30,000 to 40,000; Houston, following Lyell, gives 60,000.
- Lisbon "one of the great Catholic cities of Europe." General characterization, consistent with the Pombal biography's list of ruined churches and the patriarchal see; not a checkable figure.
- Gabriel Malagrida, Jesuit, published a pamphlet blaming the city's sins, not nature, and called the city to penance. **Verified, wording corrected (closing pass).** Search: the 1756 pamphlet *Juízo da verdadeira causa do terramoto* (archive.org listing; USP and Brown University articles in the results) attributed the earthquake to the people's sins, denied natural causes, and presented penance as the remedy (with the Nineveh analogy); "None of the results mention processions." Jesuit: the Pombal biography and *O Marquez de Pombal á luz da Philosophia* (GITenberg #27255, "embora fosse um padre, embora um jesuita"). "Jesuit preacher" **confirmed again (search pass), search:** the Wikipedia "Gabriel Malagrida" entry and a USP article in the results describe him as an Italian Jesuit missionary, back in Portugal after his Brazil years, whose preaching Pombal's government resented; archive.org lists the 1756 *Juizo da verdadeira causa do terremoto*, and a quoted line from it blames "unicamente os nossos intoleráveis pecados" (only our intolerable sins), not comets, vapors or natural causes.
- Voltaire's long poem against the philosophers of the best of all possible worlds; he asked what crime the children crushed and bleeding on their mothers' breasts had committed. Attributed paraphrase, no quotation marks. **Verified (closing pass)** in McCabe's translation, "Poem on the Lisbon Disaster; or an Examination of the Axiom, 'All Is Well'" (GITenberg #64858): "Come, ye philosophers, who cry, 'All's well,'"; "What crime, what sin, had those young hearts conceived / That lie, bleeding and torn, on mother's breast?"; "From Leibnitz learn we not by what unseen / Bonds, in this best of all imagined worlds". The essay's "crushed" fits the poem's "child and mother heaped in common wreck"; McCabe's word is "torn".
- Rousseau answered Voltaire; nature had not crowded thousands of tall houses onto that spot; much of the "act of God" was arranged by people. Attributed paraphrase. **Verified (closing pass).** Search: Rousseau's letter to Voltaire of 18 August 1756, translated "It was hardly nature who assembled there twenty-thousand houses of six or seven stories", with his point that a less dense city would have lost fewer or none. McCabe's introduction also records that "Rousseau made a feeble and friendly reply to the poem". (The figures could now be restored if James wants them.)
- "God needed another angel", "everything happens for a reason": common sayings, not attributed. No check needed.

## The argument from Epicurus to Rowe

- The argument is usually credited to Epicurus but survives in nothing he wrote. **Verified as far as the surviving works reach (closing pass).** Lactantius gives it as "that argument also of Epicurus" with no work named (WDB). Diogenes Laertius, Book X (GITenberg #57342), preserves Epicurus's letters to Herodotus, Pythocles and Menoeceus and his fundamental maxims; the closing pass searched and read them, and none contains the argument. Its absence from the other fragments rested on standard scholarship (writer's 2026-10-26 search record: Wikipedia "Epicurean paradox"). **Verified (search pass), search:** the Wikipedia "Epicurean paradox" entry gives Lactantius's *On the Anger of God* (about 313) as the source of the attribution, and Epicurean-forum discussions in the results say "no extant writings of Epicurus contain this argument", with some scholars (Mark Larrimore's *The Problem of Evil: A Reader*, cited secondhand) tracing it to an Academic skeptic such as Carneades. The essay's "usually credited to Epicurus" fits.
- Epicurus taught in Athens about three hundred years before Christ. **Verified (closing pass)**, Diogenes Laertius X (Yonge): born "in the third year of the hundred and ninth olympiad" (342/341 BC by the usual reckoning), taught at Mitylene and Lampsacus before coming to Athens, and died "in the second year of the hundred and twenty-seventh olympiad" (271/270 BC), having presided over his school thirty-two years.
- Lactantius, "a Christian teacher", quoted it "early in the fourth century" in a treatise on the anger of God. Treatise and chapter confirmed in WDB (*A Treatise on the Anger of God*, ch. XIII). **Teacher and date verified (closing pass)** from internal evidence in WDB: *Divine Institutes* 5.2, "When I was teaching rhetorical learning in Bithynia, having been called thither, and it had happened that at the same time the temple of God was overthrown" (the overthrow of the church at the start of the Great Persecution, which textbooks date to 303), and *On the Anger of God* refers back to "our Institutions" twice, so it was written after them. **Date of the treatise verified (search pass), search:** Britannica's "On the Anger of God" entry gives "De ira Dei (313; On the Anger of God)", and a JSTOR chapter in the results says it "was written in the year 313-314". Both sit early in the fourth century.
- Block quotation from Lactantius, "If He is willing and is unable ... or why does He not remove them?" Verified verbatim in WDB, ch. XIII (ANF) by the first verifier.
- Lactantius's answer (wisdom and virtue grow by overcoming evils). Paraphrase checked against WDB, same chapter.
- Hume, *Dialogues*: "Epicurus's old questions are yet unanswered." Verified verbatim in Gutenberg #4583, Part X, spoken by Philo (first verifier).
- "Fourteen centuries later." **Verified (closing pass).** Huxley's *Hume* (GITenberg #18819): the *Dialogues* were "written at least as early as 1751, though not published till after his death", and Hume "died in Edinburgh on the 25th of August, 1776". Either date is about fourteen and a half centuries after the early fourth century.
- Twentieth-century philosophers pressed it as a strict contradiction; Plantinga's free will defense persuaded many on both sides, atheists among them, that there is none. Was open (textbook; the closing pass reached no source; writer's 2026-10-26 search record: Mackie's concession in *The Miracle of Theism*, 1982). **Verified (search pass), search.** The strict-contradiction form: the Wikipedia "Alvin Plantinga's free-will defense" entry describes the defense (as the search tool reported it) as a response to the logical problem of evil that J. L. Mackie formulated starting in 1955, that God's omniscience, omnipotence and omnibenevolence are logically incompatible with evil; Mackie's "Evil and Omnipotence", *Mind* 64, no. 254 (April 1955), 200-212, is summarized in the results (edX course copy; stafforini.com) as holding that "if any two of them were true, the third would be false". The concession: Mackie, an atheist, conceded in *The Miracle of Theism* (published 1982, after his death in 1981) that "the problem of evil does not, after all, show that the central doctrines of theism are logically inconsistent with one another" (a blog in the results quotes this from p. 154; the encyclopedia.pub entry: "In 1982, Mackie conceded that Plantinga's defense successfully refuted his argument"). Breadth: Nathan Hanna's draft "Resurrecting the Logical Problem of Evil" (secularfrontier.infidels.org) says many philosophers believe Plantinga has solved the logical problem, and a University of Pretoria abstract reports the same consensus. "Many on both sides, atheists among them" fits; the essay claims no survey.
- "His argument was that God cannot make creatures truly free and also guarantee what they will choose." Plain summary of the free will defense, attributed to Plantinga. **Checked (search pass), search:** a review of *God, Freedom, and Evil* in the results quotes p. 30: "To create creatures capable of moral good, therefore, he must create creatures capable of moral evil; and he can't give these creatures the freedom to perform evil and at the same time prevent them from doing so"; a *Religious Studies* abstract gives the 1966 essay's form, that God "cannot create the possibility of moral evil and at the same time prohibit its actuality". The essay keeps its own words, no quotation marks.
- William Rowe, 1979, the fawn burned in a lightning-started forest fire, in terrible agony for several days before it dies; such suffering appears, so far as we can see, pointless. Attributed paraphrase. **Verified (closing pass), search:** results cite "The Problem of Evil and Some Varieties of Atheism", *American Philosophical Quarterly* 16.4 (1979), 335-41, the example at p. 337, quoted as "Suppose in some distant forest lightning strikes a dead tree, resulting in a forest fire. In the fire a fawn is trapped ...", returned for the exact-phrase query "horribly burned, and lies in terrible agony for several days before death relieves its suffering", and summarized as "a good candidate for a pointless evil". Rowe as an atheist: the results list his 2006 paper "Friendly Atheism, Skeptical Theism, and the Problem of Evil".
- Darwin, 1860 letter to the botanist Asa Gray: could not persuade himself a good and all-powerful God would have designed wasps that feed inside living caterpillars. Attributed paraphrase. **Verified (closing pass)** in *Life and Letters*, vol. II (GITenberg #2088), "CHARLES DARWIN TO ASA GRAY. Down, May 22nd 1860": "I cannot persuade myself that a beneficent and omnipotent God would have designedly created the Ichneumonidae with the express intention of their feeding within the living bodies of Caterpillars". Search confirmed the same date and wording. "Wasps" glosses Ichneumonidae. "Botanist" **verified (search pass), search:** the Wikipedia "Asa Gray" entry, the Darwin Correspondence Project and the Linda Hall Library describe Asa Gray (1810-1888) as the leading American botanist of the nineteenth century, Fisher Professor at Harvard, and Darwin's correspondent from the 1850s.

## Dostoevsky

- *The Brothers Karamazov* "published in 1880". **Corrected (closing pass)** to "his last novel": no source seen gives the publication year. Baring, *Landmarks* (GITenberg #68597): "he did not begin to write it until 1879, and when he died in 1881, only half the book was finished"; Phelps (GITenberg #5996): "Dostoevski's last work, 'The Karamazov Brothers'".
- The chapter "Rebellion", Ivan to Alyosha; the general's hounds and the eight-year-old serf boy; the five-year-old girl shut in the outhouse; the harmony refused; "It's not God that I don't accept, Alyosha, only I most respectfully return Him the ticket." All verified in Gutenberg #28054 (Garnett), Book V, ch. IV, by the first verifier.
- Dostoevsky a believer. **Verified (closing pass)**, Baring, *An Outline of Russian Literature* (GITenberg #33005): "Dostoyevsky was a practising believer, a vehement apostle of orthodoxy, and died fortified by the Sacraments".

## The classic answers

- Much suffering is what people do to each other. Argument, not a factual claim.
- C. S. Lewis, *The Problem of Pain*, 1940: a shared world needs fixed natural laws. **Verified (closing pass), search:** results describe it as "his 1940 book The Problem of Pain" and summarize the argument from fixed laws and free will.
- Lewis's conclusion, as paraphrase: remove every possibility of suffering that comes with a stable natural order and free wills and you remove life itself. **Verified (closing pass), search:** "Try to exclude the possibility of suffering which the order of nature and the existence of free wills involve, and you find that you have excluded life itself" (Marginalian wording; Goodreads has "you will find" and "free-wills"). The essay keeps it as paraphrase without quotation marks.
- "The water that carries a boat can drown a child." The essay's own illustration, not attributed to Lewis.
- Irenaeus, bishop of Lyon near the end of the second century. **Verified (closing pass)**, Eusebius, *Church History* V (NPNF, WDB): "Pothinus having died with the other martyrs in Gaul at ninety years of age, Irenaeus succeeded him in the episcopate of the church at Lyons" (5.5.8); the NPNF notes date the martyrs of Lyons to 177; Irenaeus is still bishop in the Easter controversy under Victor of Rome (5.24).
- Irenaeus's mother-and-infant image (*Against Heresies* 4.38.1). Paraphrase checked against WDB (first verifier).
- "We were made young, in order to grow ..." Interpretation.
- Augustine, *Enchiridion* 11: "if He were not so omnipotent and good that He can bring good even out of evil." Verified verbatim in WDB (first verifier).

## Lewis's grief

- Joy Davidman, Lewis's wife, died in 1960. **Year verified (closing pass), search:** "after the death of his wife, Helen Joy, in 1960, after only three years of marriage". "Of cancer" and "July" cut (not seen). The surname Davidman did not appear in what the closing pass saw. **Surname verified (search pass), search:** the Wikipedia "A Grief Observed" entry, the EBSCO research starter and Magdalen College's "C. S. Lewis: Words and Worlds" page on Joy Davidman name Davidman as Lewis's wife, who died in 1960, and the subject of the book.
- *A Grief Observed* published under the made-up name N. W. Clerk. Was open (textbook). **Verified (search pass), search:** the same results: first published by Faber and Faber in 1961 under the pseudonym N. W. Clerk because Lewis wished to avoid the connection, and republished under his own name after his death in 1963; the Magdalen page adds that Lewis first planned the pseudonym "Dimidius" and that T. S. Eliot, his publisher, steered him to N. W. Clerk, a name he used for occasional poetry.
- Lewis wrote that the real danger was coming to believe dreadful things about God; the conclusion he dreaded was not that there is no God but that this is what God is really like. Attributed paraphrase. **Verified (closing pass), search:** "The real danger is of coming to believe such dreadful things about Him" and "So there's no God after all" / "So this is what God's really like", consistent across the Project Gutenberg Canada, Fadedpage and PBS texts the results named. Could return to quotation marks if James wants.

## Job (all quotations: ESV copy, matched words and punctuation; re-matched by the closing pass)

- Flocks, servants and ten children lost in one day; a great wind; sores; three friends come to comfort him. Reading checked against the ESV copy (Job 1:2, 1:13-19, 2:7, 2:11).
- Job 2:13; Job 4:7; Job 42:7; Job 42:5. ESV copy: match (closing pass, 4 of 4). BSB confirms each verse and its sense.
- Job 22: Eliphaz's accusations. Paraphrase checked against the ESV copy (22:6, 22:9).
- Job 42:8, the friends sent to Job so that he can pray for them. Paraphrase checked against the ESV copy.
- God's questions (foundations, lion, ravens, eagle). Paraphrase checked against the ESV copy (38:4, 38:39-41, 39:27-30).
- Job's last speech isn't a claim to understand (42:3, 42:6). Reading checked against the ESV copy.

## Jesus and the question

- Luke 13:1-5 (Galileans, Siloam) and the quotation of 13:4-5; John 9:2 quotation and 9:3. ESV copy: match (closing pass); readings checked; BSB confirms.
- Preachers reading disasters as judgment; the prosperity preacher; "softer churches". General characterizations, no names or numbers.

## Harold Kushner

- His son Aaron had progeria, a disease of rapid aging, and died young. **Numbers generalized (closing pass)** from "diagnosed as a small child ... died in his early teens". The fact was open after the closing pass (no Kushner source reached; writer's 2026-10-26 search record only). **Verified (search pass), search:** Columbia College Today (Fall 2023 obituary, "Harold S. Kushner '55"), JNS, the Jewish Press and Shelf Awareness obituaries (Kushner died April 27, 2023, aged 88) report that Aaron was diagnosed at three with progeria, a disease "in which the body ages rapidly", and died in 1977 two days after his fourteenth birthday. The essay's "died young" is accurate; "at fourteen" could be restored. "Rabbi" confirmed by the same obituaries.
- *When Bad Things Happen to Good People*: "published in 1981" **cut (closing pass)**, not seen. **Year now seen (search pass):** the obituaries in the results date the book to 1981 and say it reached No. 1 on the *New York Times* bestseller list. The essay still gives no year.
- Kushner's conclusion that God is wholly loving and just but limited in power. Was open (writer's record only). **Verified (search pass), search:** the obituaries summarize the book's argument as God being "endowed with unlimited love and justice but has only finite power to prevent evil".
- "millions of readers" became "many readers" (closing pass; writer's record said about four million copies).

## Providence

- Genesis 50:15-20; Acts 2:23 (both phrases, one sentence); Romans 8:28; Romans 8:35; James 1:13. ESV copy: match (closing pass, 6 of 6); BSB confirms each.
- Westminster Confession 3.1, "neither is God the author of sin", and 5.4 on providence over sin "not by a bare permission". Verified in Creeds.json (first verifier).
- Wesleyan and Arminian view: God foreknows and permits evil without willing it, because he has given creatures a real freedom he will not override. Was open: a doctrinal characterization; the closing pass looked in the first six volumes of Wesley's *Works* on GITenberg (the 32-volume edition of 1771-74, which predates the sermon below) and did not reach a passage that states it. **Verified (search pass), search.** Wesley, Sermon 67, "On Divine Providence" (1786), as the search tool returned it from the Wesley Corpus (corpus.historyofmethodism.com, passages 067-006 and 067-007): God made man "a spirit endued with understanding, with will or affections, and liberty", and "without liberty he could not be a moral agent, any more than a tree or a stone"; were human liberty taken away, men would be as incapable of virtue as stones, so God does not remove sin by undoing that liberty; providence helps "so far as it can be done without compulsion, without over-ruling his liberty". Arminius, as summarized in the results (an EBSCO overview of his *Declaration of Sentiments*; SharperIron and evangelicalarminians.org on his *Works*): good happens by God's direction and evil by his permission, and it does not follow from God's voluntarily permitting sin that he wills it. Roger Olson (evangelicalarminians.org, "Arminianism and Providence"): God permits sin and evil without designing, foreordaining or rendering them certain, and he names the classical Arminian view "predestination by foreknowledge". Olson says he speaks for himself, and open theists such as Thomas Jay Oord differ on foreknowledge; the essay's line describes the classical Wesleyan and Arminian traditions.
- Baptists have had churches on both sides since the seventeenth century. **Verified (closing pass)**, Stoughton (GITenberg #64226): "Some Arminian Baptists published a Confession of Faith in 1611. Another confession, issued by the Calvinistic Baptists, containing fifty-two articles, appeared in 1644. The Calvinistic doctrine of predestination is distinctly affirmed".
- The question is left open; no position is asserted for James.

## A creation that groans

- Romans 8:20-22 block quotation; Romans 8:23; Romans 8:26. ESV copy: match (closing pass).
- "all is well": the axiom Voltaire's poem examines. **Verified (closing pass):** McCabe's title, "an Examination of the Axiom, 'All Is Well'" (GITenberg #64858); search gave the French title *Poème sur le désastre de Lisbonne, ou examen de cet axiome : « Tout est bien »*.
- Two readings of Genesis 3 and Romans 5:12 on animal death. Positions stated for each side and left open. Romans 5:12 read in the ESV copy.
- Isaiah 11:6 paraphrase ("the wolf will dwell with the lamb"; ESV "shall dwell", no quotation marks in the essay). Isaiah 11:9 quotation: ESV copy match (closing pass).

## Lament

- "Many psalms are complaints addressed straight to God." **Generalized (closing pass)** from "Dozens". A rough count in the BSB by the closing pass found 16 psalms with explicit complaint to God ("How long, O LORD", "Why do You", "hide Your face", "forsaken me" and similar) and 31 with complaint or a lament petition; that crude count did not cleanly support "dozens", so the word was generalized.
- Psalm 13:1 (body and Closing Texts); Psalm 88:18, and 88:18 is the psalm's last verse; Matthew 27:46 and Psalm 22:1. ESV copy: match (closing pass).
- "Many American churches have stopped praying this way." Characterization; no statistic.
- The church's calendar keeps Holy Saturday. **Verified (closing pass)**: *The Book of Common Prayer* (GITenberg #29622) appoints "Easter Even" its own collect ("that as we are baptized into the death of thy blessed Son ... we may be buried with him") and lessons (Luke 23:50, the burial).
- Romans 12:15. ESV copy: match, comma and all (closing pass).

## Nicholas Wolterstorff

- Christian philosopher. **Verified (closing pass), search:** results on *Lament for a Son* report that "as a philosopher he finds the philosophical explanations unconvincing" (Public Christianity) and that he "drew on his Christian faith" in his grief (book summary); a Wikipedia entry titled "Nicholas Wolterstorff" was among the results.
- His son Eric died young in a climbing accident. **Verified (closing pass), search:** Eric died in a mountain-climbing accident in 1983, aged twenty-five, in Austria; the book appeared in 1987 (Eerdmans). (The year, age and place could be restored if James wants them.)
- *Lament for a Son* offers no theodicy. **Verified (closing pass), search:** TTF's excerpt has him say he has read the theodicies and finds them unconvincing.
- He wrote that he had no explanation and could not fit the pieces together; he asked friends not to say it wasn't really so bad; death is awful, even demonic; he wanted comforters who would sit beside him in his grief. Attributed paraphrase. **Verified (closing pass), search:** "I have no explanation" and "I cannot fit these pieces together" (40th-anniversary edition listing; TTF); "Don't say it's not really so bad. Because it is. Death is awful, demonic." and "if you think your task as comforter is to tell me that really, all things considered, it's not so bad, you do not sit with me in my grief" (Goodreads quotations); "Come sit beside me on my mourning bench" (Grand Rapids Press column; Goodreads). These are secondary reproductions; the essay keeps paraphrase.

## Help line

- In the US, call or text 988 to reach the Suicide and Crisis Lifeline; [Find Help](/help). Wording as BRIEF.md requires for crisis-facing pieces. Was open (not checked against a Lifeline source). **Verified (search pass), search:** the New York State Office of Mental Health ("What is 988"), North Carolina DHHS ("988 Suicide & Crisis Lifeline") and AFSP pages in the results say to call or text 988 to reach the 988 Suicide & Crisis Lifeline, free and around the clock, with chat at 988lifeline.org. The essay's line matches.

## God inside the suffering

- John 11:11, 11:32-33, 11:35; Revelation 21:4; Closing Texts Romans 8:18. ESV copy: match (closing pass); readings checked.
- The innocent suffered while the guilty went free (Barabbas). Reading.
- "still carry the marks of the nails": John 20:25-27 and theological inference.

## Voice edit (first verifier, 2026-10-27)

- Wording changes only (standfirst "the hardest objection", "many of its defenders"; Job 2:13 "the wisest thing they do in the whole book"; Romans 8:28 "Paul says something close to this"; plain headings). One vague Kushner sentence cut.

## Mechanics and links

- After the closing pass: no em-dashes (grep for U+2014: zero), no forbidden-language words (grep of the CLAUDE.md list: zero), no exclamation point. scripts/validate-essays.mjs reads client/public/essays/*.json, not drafts in docs/work, so it was not run on this draft.
- Links /writing/prosperity-gospel-is-not-the-gospel, /writing/the-theology-of-saturday, /writing/did-the-resurrection-happen: each slug is in docs/work/essays/link-targets.json. **Checked (closing pass)** in client/src/lib/shelf.json: all three are "pending", as is this essay, so they must land together or before this one (the essay gate requires every internal link to reach a public page). /help is allowed by the brief. Four links in all.
- After the search pass (essay unchanged by it): U+2014 count zero, exclamation points zero, CLAUDE.md forbidden words and phrases zero (literal case-insensitive grep of each), all three /writing slugs present in docs/work/essays/link-targets.json. This ledger has no em-dash either.

## Scripture against current ESV (search pass)

The ESV copy above is the 2011 text. The ESV's 2016 revision changed 52 words in 29 verses (Christian Post, Baptist News Global and Blue Letter Bible's "ESV 2016" page in the results; the full list of verses was not in the results), so each quotation was also searched against current ESV pages. All 25 quotations (23 references) matched:

- Job 2:13 (Blue Letter Bible ESV, esv.org, Bibleserver ESV); Job 4:7 (biblestudytools ESV, esv.org); Job 42:7 (esv.org, biblia ESV); Job 42:5 (esv.org, which ends the clause with a semicolon the essay does not quote).
- Luke 13:4-5 (esv.org, biblia ESV); John 9:2 (Blue Letter Bible ESV, biblia ESV, Bible Hub ESV).
- Genesis 50:20 (biblestudytools ESV, esv.org); Acts 2:23, both phrases (esv.org, Bible.com ESV); Romans 8:28 (esv.org, whose page the tool reported as the 2016 text edition); Romans 8:35 (Bible.com ESV, biblia ESV); James 1:13 (esv.org, biblia ESV; esv.org prints the quoted temptation without quotation marks, which does not touch the clause the essay quotes).
- Romans 8:20-22 (esv.org, Christianity.com ESV, biblia ESV); Romans 8:23 (esv.org, Bible.com ESV, biblestudytools ESV); Romans 8:26 (esv.org, Bible.com ESV, biblia ESV); Isaiah 11:9 (esv.org, Bible.com ESV, biblia ESV; "LORD" in small capitals).
- Psalm 13:1, body and Closing Texts (esv.org, Blue Letter Bible ESV, Bibleserver ESV); Psalm 88:18 (esv.org, bible.cc ESV, biblia ESV; the tool reported the wording matched without reprinting all of it); Matthew 27:46 (ESV text as listed by Bible Gateway in the results); Romans 12:15 (esv.org, biblia ESV, comma included).
- John 11:33 (esv.org, Christianity.com ESV); John 11:35 (esv.org, biblia ESV: "Jesus wept."); Revelation 21:4 (esv.org, Blue Letter Bible ESV, biblia ESV); Romans 8:18 (esv.org, Christianity.com ESV, biblia ESV).

No quotation needed the fallback "ESV wording not confirmed by search; BSB confirms the sense". The ESV API check James's key will allow remains a useful final confirmation, not an open item.

## Still open

None. The five items the closing pass left open (Plantinga; N. W. Clerk and the surname Davidman; Kushner; the Wesleyan and Arminian characterization; the 988 line) and the three lines that rested on textbook judgment (Epicurus's surviving works, the date of *On the Anger of God*, Gray as a botanist) were verified by the search pass; see each line above.
