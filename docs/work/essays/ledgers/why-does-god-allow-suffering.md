# Claims ledger: why-does-god-allow-suffering

Essay: docs/work/essays/why-does-god-allow-suffering.md ("Why Does God Allow Suffering?"). Rewrite of the machine essay of the same slug; folds in is-god-in-control and natural-evil-and-animal-suffering. Drafted 2026-10-26. The first verifier rewrote this ledger on 2026-10-27 with no web search available. A second pass (the "closing pass", also 2026-10-27) worked through every line that was still open and records here what it actually saw.

## Status at a glance (closing pass, 2026-10-27)

- 37 lines were open when the closing pass began (marked "Not re-checked", "Textbook", "Not checked", or resting only on the writer's 2026-10-26 search record).
- 23 are now verified against a source the closing pass saw, 9 were corrected, cut or generalized in the essay, and 5 remain open (listed under "Still open" at the end).
- The 25 Scripture quotations, already matched by the first verifier, were matched again by the closing pass (25 of 25, words and punctuation).

## What each pass could reach

- **First verifier.** No web search (the workflow's shared budget was spent) and no web pages; GitHub and local files only. Where a line says "writer's 2026-10-26 search record", that is the writer's report, repeated.
- **Closing pass.** 16 WebSearch queries returned results before the workflow's shared budget of 200 ran out; four more were refused ("this turn's web search budget is used up"), so a few lines that needed search are left open below. Web pages themselves could not be opened: gutenberg.ca, fadedpage.com, pbs.org, talkorigins.org and collections.libraries.indiana.edu were refused by the proxy (403). Matches marked "search" rest on the result titles and quoted text the search tool returned, not on the pages. GitHub was reachable, and the closing pass found several public-domain books through the GITenberg catalog (`gitenberg/data/GITenberg_repo_list.tsv` in github.com/gitenberg-dev/gitberg).

## Method key

- **"ESV copy"**: compared by script with the ESV text in the public GitHub repository lguenth/mdbible, file `json/ESV.json` (metadata: "English Standard Version 2011", SWORD module 1.0.2), commit fd66568 in the scratchpad clone. The closing pass re-ran the comparison with its own script (words only, then with punctuation kept, quotation marks and dashes normalized, LORD read as "Lord"), with three negative controls that failed as they should (NIV "bondage to decay"; a semicolon in Romans 12:15; "with the hearing" in Job 42:5). This is not esv.org or the ESV API; recheck with James's API key once it exists.
- **"BSB"**: the site's own Berean Standard Bible text in client/public/bible/ch/, read to confirm each verse's location and sense (not ESV wording).
- **"WDB"**: read with `git show` in the scratchpad clone of github.com/HistoricalChristianFaith/Writings-Database (commit 328918a), ANF/NPNF translations only.
- **"Gutenberg (GITenberg)"**: Project Gutenberg texts cloned from the GITenberg mirrors on GitHub. First verifier: Hume, *Dialogues Concerning Natural Religion* (#4583); Dostoevsky, *The Brothers Karamazov*, Garnett translation (#28054). Closing pass: *The Life and Letters of Charles Darwin*, vol. II (#2088, `Life-and-Letters-of-Charles-Darwin---Volume-2_2088`); Voltaire, *Toleration and Other Essays*, tr. Joseph McCabe (#64858), which includes "Poem on the Lisbon Disaster"; Diogenes Laertius, *Lives and Opinions of Eminent Philosophers*, tr. C. D. Yonge (#57342); T. H. Huxley, *Hume* (#18819); Edwin J. Houston, *The Wonder Book of Volcanoes and Earthquakes* (#43320); *Factos Notaveis da Historia Portugueza e Biographia do Marquez de Pombal* (#32869); Maurice Baring, *An Outline of Russian Literature* (#33005) and *Landmarks in Russian Literature* (#68597); William Lyon Phelps, *Essays on Russian Novelists* (#5996); John Stoughton, *Ecclesiastical History of England from the Opening of the Long Parliament* (#64226); *The Book of Common Prayer and the Scottish Liturgy* (#29622).
- **"Creeds.json"**: Westminster Confession from raw.githubusercontent.com/NonlinearFruit/Creeds.json (first verifier).
- **"Search"**: a WebSearch the closing pass ran on 2026-10-27; the line names what the results showed.

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
- Gabriel Malagrida, Jesuit, published a pamphlet blaming the city's sins, not nature, and called the city to penance. **Verified, wording corrected (closing pass).** Search: the 1756 pamphlet *Juízo da verdadeira causa do terramoto* (archive.org listing; USP and Brown University articles in the results) attributed the earthquake to the people's sins, denied natural causes, and presented penance as the remedy (with the Nineveh analogy); "None of the results mention processions." Jesuit: the Pombal biography and *O Marquez de Pombal á luz da Philosophia* (GITenberg #27255, "embora fosse um padre, embora um jesuita").
- Voltaire's long poem against the philosophers of the best of all possible worlds; he asked what crime the children crushed and bleeding on their mothers' breasts had committed. Attributed paraphrase, no quotation marks. **Verified (closing pass)** in McCabe's translation, "Poem on the Lisbon Disaster; or an Examination of the Axiom, 'All Is Well'" (GITenberg #64858): "Come, ye philosophers, who cry, 'All's well,'"; "What crime, what sin, had those young hearts conceived / That lie, bleeding and torn, on mother's breast?"; "From Leibnitz learn we not by what unseen / Bonds, in this best of all imagined worlds". The essay's "crushed" fits the poem's "child and mother heaped in common wreck"; McCabe's word is "torn".
- Rousseau answered Voltaire; nature had not crowded thousands of tall houses onto that spot; much of the "act of God" was arranged by people. Attributed paraphrase. **Verified (closing pass).** Search: Rousseau's letter to Voltaire of 18 August 1756, translated "It was hardly nature who assembled there twenty-thousand houses of six or seven stories", with his point that a less dense city would have lost fewer or none. McCabe's introduction also records that "Rousseau made a feeble and friendly reply to the poem". (The figures could now be restored if James wants them.)
- "God needed another angel", "everything happens for a reason": common sayings, not attributed. No check needed.

## The argument from Epicurus to Rowe

- The argument is usually credited to Epicurus but survives in nothing he wrote. **Verified as far as the surviving works reach (closing pass).** Lactantius gives it as "that argument also of Epicurus" with no work named (WDB). Diogenes Laertius, Book X (GITenberg #57342), preserves Epicurus's letters to Herodotus, Pythocles and Menoeceus and his fundamental maxims; the closing pass searched and read them, and none contains the argument. Its absence from the other fragments rests on standard scholarship (writer's 2026-10-26 search record: Wikipedia "Epicurean paradox").
- Epicurus taught in Athens about three hundred years before Christ. **Verified (closing pass)**, Diogenes Laertius X (Yonge): born "in the third year of the hundred and ninth olympiad" (342/341 BC by the usual reckoning), taught at Mitylene and Lampsacus before coming to Athens, and died "in the second year of the hundred and twenty-seventh olympiad" (271/270 BC), having presided over his school thirty-two years.
- Lactantius, "a Christian teacher", quoted it "early in the fourth century" in a treatise on the anger of God. Treatise and chapter confirmed in WDB (*A Treatise on the Anger of God*, ch. XIII). **Teacher and date verified (closing pass)** from internal evidence in WDB: *Divine Institutes* 5.2, "When I was teaching rhetorical learning in Bithynia, having been called thither, and it had happened that at the same time the temple of God was overthrown" (the overthrow of the church at the start of the Great Persecution, which textbooks date to 303), and *On the Anger of God* refers back to "our Institutions" twice, so it was written after them.
- Block quotation from Lactantius, "If He is willing and is unable ... or why does He not remove them?" Verified verbatim in WDB, ch. XIII (ANF) by the first verifier.
- Lactantius's answer (wisdom and virtue grow by overcoming evils). Paraphrase checked against WDB, same chapter.
- Hume, *Dialogues*: "Epicurus's old questions are yet unanswered." Verified verbatim in Gutenberg #4583, Part X, spoken by Philo (first verifier).
- "Fourteen centuries later." **Verified (closing pass).** Huxley's *Hume* (GITenberg #18819): the *Dialogues* were "written at least as early as 1751, though not published till after his death", and Hume "died in Edinburgh on the 25th of August, 1776". Either date is about fourteen and a half centuries after the early fourth century.
- Twentieth-century philosophers pressed it as a strict contradiction; Plantinga's free will defense persuaded many on both sides, atheists among them, that there is none. **Still open.** Textbook in philosophy of religion; the closing pass reached no source (writer's 2026-10-26 search record: Mackie's concession in *The Miracle of Theism*, 1982).
- "His argument was that God cannot make creatures truly free and also guarantee what they will choose." Plain summary of the free will defense, attributed to Plantinga. Interpretation.
- William Rowe, 1979, the fawn burned in a lightning-started forest fire, in terrible agony for several days before it dies; such suffering appears, so far as we can see, pointless. Attributed paraphrase. **Verified (closing pass), search:** results cite "The Problem of Evil and Some Varieties of Atheism", *American Philosophical Quarterly* 16.4 (1979), 335-41, the example at p. 337, quoted as "Suppose in some distant forest lightning strikes a dead tree, resulting in a forest fire. In the fire a fawn is trapped ...", returned for the exact-phrase query "horribly burned, and lies in terrible agony for several days before death relieves its suffering", and summarized as "a good candidate for a pointless evil". Rowe as an atheist: the results list his 2006 paper "Friendly Atheism, Skeptical Theism, and the Problem of Evil".
- Darwin, 1860 letter to the botanist Asa Gray: could not persuade himself a good and all-powerful God would have designed wasps that feed inside living caterpillars. Attributed paraphrase. **Verified (closing pass)** in *Life and Letters*, vol. II (GITenberg #2088), "CHARLES DARWIN TO ASA GRAY. Down, May 22nd 1860": "I cannot persuade myself that a beneficent and omnipotent God would have designedly created the Ichneumonidae with the express intention of their feeding within the living bodies of Caterpillars". Search confirmed the same date and wording. "Wasps" glosses Ichneumonidae; "botanist" is the standard description of Gray.

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

- Joy Davidman, Lewis's wife, died in 1960. **Year verified (closing pass), search:** "after the death of his wife, Helen Joy, in 1960, after only three years of marriage". "Of cancer" and "July" cut (not seen). The surname Davidman did not appear in what the closing pass saw: still open, textbook.
- *A Grief Observed* published under the made-up name N. W. Clerk. **Still open.** Textbook; not seen this pass.
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

- His son Aaron had progeria, a disease of rapid aging, and died young. **Numbers generalized (closing pass)** from "diagnosed as a small child ... died in his early teens". **The fact itself is still open:** no Kushner source could be reached this pass (writer's 2026-10-26 search record: JTA obituary and Columbia College Today, diagnosis at three, death in 1977 two days after his fourteenth birthday).
- *When Bad Things Happen to Good People*: "published in 1981" **cut (closing pass)**, not seen.
- Kushner's conclusion that God is wholly loving and just but limited in power. **Still open** (writer's 2026-10-26 search record: JTA).
- "millions of readers" became "many readers" (closing pass; writer's record said about four million copies).

## Providence

- Genesis 50:15-20; Acts 2:23 (both phrases, one sentence); Romans 8:28; Romans 8:35; James 1:13. ESV copy: match (closing pass, 6 of 6); BSB confirms each.
- Westminster Confession 3.1, "neither is God the author of sin", and 5.4 on providence over sin "not by a bare permission". Verified in Creeds.json (first verifier).
- Wesleyan and Arminian view: God foreknows and permits evil without willing it, because he has given creatures a real freedom he will not override. **Still open.** A doctrinal characterization; the closing pass looked in the first six volumes of Wesley's *Works* on GITenberg and did not reach a passage that states it.
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

- In the US, call or text 988 to reach the Suicide and Crisis Lifeline; [Find Help](/help). **Still open:** wording as BRIEF.md requires for crisis-facing pieces; not checked against 988lifeline.org this pass.

## God inside the suffering

- John 11:11, 11:32-33, 11:35; Revelation 21:4; Closing Texts Romans 8:18. ESV copy: match (closing pass); readings checked.
- The innocent suffered while the guilty went free (Barabbas). Reading.
- "still carry the marks of the nails": John 20:25-27 and theological inference.

## Voice edit (first verifier, 2026-10-27)

- Wording changes only (standfirst "the hardest objection", "many of its defenders"; Job 2:13 "the wisest thing they do in the whole book"; Romans 8:28 "Paul says something close to this"; plain headings). One vague Kushner sentence cut.

## Mechanics and links

- After the closing pass: no em-dashes (grep for U+2014: zero), no forbidden-language words (grep of the CLAUDE.md list: zero), no exclamation point. scripts/validate-essays.mjs reads client/public/essays/*.json, not drafts in docs/work, so it was not run on this draft.
- Links /writing/prosperity-gospel-is-not-the-gospel, /writing/the-theology-of-saturday, /writing/did-the-resurrection-happen: each slug is in docs/work/essays/link-targets.json. **Checked (closing pass)** in client/src/lib/shelf.json: all three are "pending", as is this essay, so they must land together or before this one (the essay gate requires every internal link to reach a public page). /help is allowed by the brief. Four links in all.

## Still open (for James or a later pass with search budget)

1. Plantinga's free will defense persuading many, atheists among them, that there is no strict contradiction (textbook; no source reached).
2. *A Grief Observed* first published under the name N. W. Clerk, and the surname Davidman (textbook; search showed only "Helen Joy").
3. Harold Kushner: son Aaron had progeria and died young; the book concludes God is loving but limited in power (writer's record only).
4. The Wesleyan and Arminian characterization (doctrinal summary; no Wesley or Arminius passage reached).
5. The 988 Suicide and Crisis Lifeline line (brief-mandated wording; not checked against 988lifeline.org).
