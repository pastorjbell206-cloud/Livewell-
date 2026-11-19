# Unit apol: the hard-question answers argue their case (a pilot of three)

Branch `elite/apol`, from `origin/claude/todo-implementation-hhp4bm` at 1e8c57b7. Date: 2026-11-18.

James, 2026-11-18: "The hard questions aren't very apologetically written. Like, is there a God? One is just like more philosophical. I really would like to make the hard questions, answers, and writing more logical, more academic, more intellectual, historical, biblical, but also someone that would convince a non-believer or a skeptic."

## 1. The audit

The test for each line: does the answer make an argument a skeptic could inspect (premises, evidence, the strongest objection met), or does it mostly assert and console? "Pastoral" means the question is not a skeptic's question and the answer is right to comfort and guide; it is judged on whether it does that honestly, not on apologetics.

### The 35 Honest Answers (client/src/data/answers.ts)

1. Did the resurrection actually happen? Argues. Names the agreed facts, the creed, the rival theories and Hume. Thin on evidence: no date for the creed, no scholar named who grants the facts, no source a reader can check.
2. Why would anyone trust the Bible? Mostly asserts. "Thousands of manuscripts", "no council voted", "the alternative gospels arrived late": not one number, date, manuscript or scholar. The strongest critic (Ehrman) is never named. Its public essay has all the evidence; the answer carries none of it.
3. If God is good, why is there so much suffering? Half an argument. States Plantinga's result in one line, then rests on "the outrage borrows" (the moral argument). A careful skeptic answers that at once: the problem of evil is an internal critique, run on the believer's own idea of goodness, and needs no moral realism from the atheist. The evidential problem (Rowe) is not met. It is the commonest reason people give for unbelief and the answer has a hole a skeptic can walk through.
4. What if Christianity is wrong? Consoles more than argues. A wager framing and two lines of evidence in passing.
5. Was Jesus just a good teacher? Argues. Trilemma, the legend objection met with Hurtado on early worship. Good.
6. Do I have to choose between faith and science? Partly argues. Good on the conflict thesis (Draper 1874, White 1896) and on Collins and Polkinghorne, but answers the weak form of the objection (a "war") and not the strong one (science keeps explaining what God was used for; methodological naturalism). No fine-tuning, no Laplace, no "God of the gaps".
7. Is it okay to be angry at God? Pastoral. Psalm 13, Brueggemann. Fit for purpose.
8. Can you be a Christian without going to church? Pastoral. Fit for purpose.
9. What if I'm done with church but not with Jesus? Pastoral. Fit for purpose.
10. What happens after you deconstruct your faith? Pastoral with an argument. Fit for purpose.
11. How can God be three and one? Explains the doctrine and its history (Nicaea 325). Meets the arithmetic objection. Adequate.
12. Should a Christian follow a political party? Pastoral and ethical. Fit for purpose.
13. What does the Bible actually say about money? Teaching. Fit for purpose.
14. What does the Bible say about anxiety? Teaching. Fit for purpose.
15. What do I do when my teenager says they don't believe? Pastoral. Fit for purpose.
16. Is Jesus really the only way to God? Argues. Hick's pluralism stated fairly, Newbigin's reply. Good.
17. Does God actually exist? Mostly testimony. The case is three gestures in one paragraph (Leibniz's question, fine-tuning, Lewis on morality), none laid out, none defended against its standard reply, and the answer itself says "none of this is a proof". This is the answer James named, and he is right: it is philosophy described, not argued.
18. What about those who never heard of Jesus? Argues inside the faith; leaves a second-order question open with care. Good.
19. Can you be good without God? Argues. Euthyphro met. Good.
20. Is believing anything on faith irrational? Argues. Clifford, Hume, Polanyi. Good.
21. Are miracles believable? Argues. Hume quoted, Earman's reply. Good.
22. Did God command genocide in the Old Testament? Argues honestly. Younger, Kitchen, Dawkins quoted. Good.
23. Why didn't the Bible just ban slavery? Argues. Exodus 21:16, Philemon, Douglass. Good.
24. Is faith just wishful thinking? Argues. Feuerbach, Freud, the genetic fallacy, Nagel. Good.
25. What did the New Atheists get right? Argues, concedes much. Adequate.
26. Can a life mean anything without God? Argues. Camus, Sartre, Tolstoy. Adequate.
27. What do Christianity and Islam actually dispute? Describes fairly. Adequate for its question.
28. Can you lose your salvation? Second-order, both sides stated. Fit for purpose.
29. Is my anxiety a spiritual failure? Pastoral, keeps 988. Fit for purpose.
30. Is hell forever, or does it end? Describes three views. Never meets the skeptic's real question (how can a good God punish forever?). Thin for a skeptic.
31. Does God choose us, or do we choose him? Second-order, both sides. Fit for purpose.
32. How should a Christian read Genesis 1? Second-order, three views. Fit for purpose.
33. What does the Bible say about divorce and remarriage? Pastoral. Fit for purpose.
34. Why does God allow earthquakes, cancer, and animal suffering? Honest, names Rowe; offers little argument (one line on natural law). Thin.
35. What makes us human in the age of AI? States the functionalist case, then asserts. Adequate.

### The ten /faq pages (client/src/pages/faq/)

Each is eight questions, about 2,100 to 2,500 words, written earlier in an encyclopedic register (third person, "--" for dashes, no Scripture references a reader can check, no sources list). They inform; they rarely argue.

1. Does God exist? Lists the kalam, Leibniz, fine-tuning, moral and consciousness arguments in one paragraph each, then the counter-arguments. Fair and wide, but every argument is a sentence, not a set of premises, and a few claims need checking ("51% of scientists", Pew 2009).
2. Is the Bible historically accurate? Survey. Overlaps the trust-the-Bible essay; no dates for manuscripts it names.
3. Can science and faith coexist? Survey with a list of believing scientists. Same weak-form problem as answer 6.
4. What do Christians believe about hell? Survey of views. Does not meet the moral objection.
5. What is deconstruction? Pastoral survey. Fit for purpose.
6. What is religious trauma? Pastoral and clinical survey; must keep its paths to help.
7. Why are people leaving church? Sociology with figures that need checking.
8. Why do young people leave church? Same.
9. What denomination should I join? Practical. Fit for purpose.
10. Catholic and Protestant: eight differences. Descriptive. Fit for purpose.

### The ten that most need the work, in order

1. Does God actually exist? (answer 17; James named it)
2. Why would anyone trust the Bible? (answer 2)
3. If God is good, why is there so much suffering? (answer 3)
4. Do I have to choose between faith and science? (answer 6)
5. Did the resurrection actually happen? (answer 1: argued, but needs its dates and its witnesses)
6. Is hell forever, or does it end? (answer 30)
7. /faq/does-god-exist (to match the rewritten answer, or to be folded into it)
8. Why does God allow earthquakes, cancer, and animal suffering? (answer 34)
9. What if Christianity is wrong? (answer 4)
10. /faq/is-the-bible-historically-accurate and /faq/can-science-and-faith-coexist (to match 2 and 4)

The pilot takes the first three: the one James named, and the two thinnest among the questions a skeptic actually asks. Suffering ranks above science because its answer contains a move a skeptic can refute in one sentence, and it is the commonest reason given for unbelief.

### What the page can hold today, and what it needs

An answer page (`client/src/pages/AnswerPage.tsx`) shows the question as the H1, then the `paragraphs` array in the reading face, then links to the essay, the book and the companion tools. It can hold any number of paragraphs, but it has no headings inside the answer, no way to set out numbered premises, no Scripture or quotation set apart, and no sources list. The first paragraph is also the page description, the search blurb, the catalogue line and the ask box's opening, so it must stay a short, whole answer.

What an argued answer needs: section headings (so a reader can see the objection, the argument, the evidence, the reply and the limits as parts), numbered premises with the conclusion set apart, and a "Sources and further reading" list (author, title, year). Planned as one optional field on an answer; the other 32 answers render exactly as before.

## 2. The pilot: three answers rewritten to argue

Each now opens with a short answer (one paragraph: still the page description, the search line and the ask box's opening), then a short list of its parts, then the parts: the objection at full strength, the argument laid out with numbered premises and the conclusion set apart, the evidence, the strongest reply and an answer, and what the argument does not prove. Each ends with "Sources and further reading". Every claim is in `docs/work/elite/apol-ledger.md` with how it was checked. Slugs, questions, addresses, essay links and book links are unchanged. No doctrine the old answers taught was changed; the second-order questions they touched (inerrancy wording, how God governs evil) are left open as before.

James's biography (came to faith from atheism) is used in one of the three only, the God answer, where it does work: the short answer and the last paragraph. The other two have no reference to it.

### Does God actually exist?

The argument in three sentences. Everything that exists has an explanation, and the universe does not explain itself, so it points to something that exists by necessity outside space, time and matter. The fitness of the universe's laws for life is far less surprising if there is a God than if this is the one universe and its values fell out by chance, and the multiverse only moves the question up a level. If some things are really wrong whatever anyone thinks, goodness needs a source, and even the atheist Mackie allowed that objective values would be very unlikely without a god to make them.

Before (the old answer's case, in full): "Leibniz's question doesn't go away: why is there something rather than nothing. The fine-tuning of the physical constants sits so narrow that to dodge a set-up cosmos the naturalist posits an infinity of universes he can never observe, faith in a lab coat."

After (one of three laid-out arguments): "In 1714, in a short work called the Principles of Nature and Grace, Gottfried Leibniz set down what he took to be the first question we have a right to ask: why is there something rather than nothing?" Then, set out: 1. Everything that exists has an explanation of its existence, either in the necessity of its own nature or in something outside it. 2. The universe, all of space, time, matter and energy, does not exist by the necessity of its own nature. So: the universe has its explanation in something outside it that exists by necessity. Then: "The weight sits on the first premise, and Russell saw it..." with Russell's own words from the 1948 BBC debate, the reply, and "this is the step where an honest person can disagree."

Words: 327 before; 2,130 after (2,282 with headings and sources).

Sources: Leibniz, *Principles of Nature and Grace* (1714); Richard Taylor, *Metaphysics* (1963); Alexander Pruss, *The Principle of Sufficient Reason* (2006); Martin Rees, *Just Six Numbers* (1999); Geraint Lewis and Luke Barnes, *A Fortunate Universe* (2016); Richard Swinburne, *The Existence of God* (2nd ed., 2004); Erik Wielenberg, *Robust Ethics* (2014); J. L. Schellenberg, *Divine Hiddenness and Human Reason* (1993); J. L. Mackie, *The Miracle of Theism* (1982, the best book against); Graham Oppy, *Arguing about Gods* (2006).

### Why would anyone trust the Bible?

The argument in three sentences. The text we read is substantially what was written: more than five thousand Greek manuscripts, the uncertain places marked in every modern Bible, and even Ehrman agreeing with Metzger that no essential belief rests on a disputed reading. The books were recognized over generations (Irenaeus around 180, Athanasius's list in 367), not chosen at Nicaea, and where the history can be checked (Pilate's stone, Gallio at Delphi, Tacitus, Josephus) it has often held up. The Gospels differ the way independent witnesses differ and agree on the crucifixion, the burial, the empty tomb and the appearances, which leaves the real question, what to make of Jesus.

Before: "The case against the Bible rests almost entirely on claims the relevant scholarship, much of it produced by skeptics, does not support. The telephone game is the wrong picture. The texts spread as a branching tree of copies, and thousands of manuscripts are how scholars catch errors."

After: "There are more than five thousand Greek manuscripts of the New Testament, whole or in part, and thousands more in early translations such as Latin, Syriac and Coptic. That is why the count of variants is so high... The first six books of Tacitus's Annals, one of our main sources for the emperor Tiberius, survive in a single medieval manuscript. The New Testament has a gap too, and nobody should hide it."

Words: 221 before; 1,907 after (2,012 with headings and sources). Almost every fact comes from the public essay "Can You Trust the Bible?", already verified line by line.

Sources: Bart Ehrman, *Misquoting Jesus* (2005, the best popular case against) and *The Orthodox Corruption of Scripture* (1993); Bruce Metzger and Bart Ehrman, *The Text of the New Testament* (4th ed., 2005); Bruce Metzger, *The Canon of the New Testament* (1987); Richard Burridge, *What Are the Gospels?* (1992); Richard Bauckham, *Jesus and the Eyewitnesses* (2006); Peter J. Williams, *Can We Trust the Gospels?* (2018); K. A. Kitchen, *On the Reliability of the Old Testament* (2003).

### If God is good, why is there so much suffering?

The argument in three sentences. The logical argument (Mackie, 1955) fails, because a good God may permit evil for a good he could not have otherwise, and Mackie himself later allowed it does not show theism inconsistent. The evidential argument (Rowe, 1979) is serious, but it rests on the step from "I can see no reason for this suffering" to "there probably is none", and we should not expect to see the reasons of a mind that sees the whole of history (Job is that story). None of this explains anyone's suffering; Christianity's answer is an event, a God who entered suffering and rose, not an explanation.

Before: "But the outrage borrows. Atoms do not have oughts. To call a child's suffering evil is to stand on a moral floor a Godless universe cannot pour."

After (the same point, corrected so a skeptic cannot fault it): "Christians, me included, often make one more move here, and it needs correcting. We say the skeptic's outrage borrows a moral standard a godless universe can't supply. As an answer to the argument, that fails. The argument is internal... What the point does show is this. If the argument succeeds and there is no God, the suffering is still there. It has only lost the name evil."

Words: 226 before; 1,677 after (1,794 with headings and sources). The page keeps its Find Help link and now names 988 in the text.

Sources: J. L. Mackie, "Evil and Omnipotence" (*Mind*, 1955); William Rowe, "The Problem of Evil and Some Varieties of Atheism" (*American Philosophical Quarterly*, 1979); Alvin Plantinga, *God, Freedom, and Evil* (1974); Daniel Howard-Snyder, ed., *The Evidential Argument from Evil* (1996); Eleonore Stump, *Wandering in Darkness* (2010); Dostoevsky, *The Brothers Karamazov* (1880); C. S. Lewis, *A Grief Observed* (1961); Nicholas Wolterstorff, *Lament for a Son* (1987); Bart Ehrman, *God's Problem* (2008, the best popular case against).

## 3. What changed in the code

- `client/src/data/answers.ts`: three optional fields on an answer, `sections` (a heading and a body of paragraphs and laid-out arguments: `kind`, `premises`, `conclusion`) and `sources` (author, title, optional journal, year, optional note), plus `answerText()`, every sentence of an answer for the indexes. The other 32 answers have none of these fields and render exactly as before.
- `client/src/pages/AnswerPage.tsx`: for an argued answer, a numbered "In this answer" list of its parts (each a 44px link to its part), the parts with visible H2s, each argument in a ruled box (its kind as a label, the premises as a numbered list, "So" and the conclusion), and the sources list. Reading face throughout; colours by token only (`client/src/index.css`, one block after the answer-page styles).
- `scripts/prerender-heads.mjs`: the prerendered answer body carries the parts, the arguments as `<ol>` and the sources.
- `scripts/lib/passage-index.mjs`: reads every sentence of an answer, so a chapter's "Go deeper" now lists an argued answer that quotes it (16 chapter files regenerated). `client/public/search-index.json` regenerated (the three new opening lines).
- `client/src/pages/hq.test.tsx`: two new tests (an argued answer's parts, contents, numbered premises and sources; only the three are argued, each with five or more dated sources; a plain answer shows none of it).

## 4. What I ran, and what passed

- `pnpm check`: pass.
- All 35 commands of the content-gates step in `ci.yml`: pass (run twice, after the content and after the last code change, including `validate-answers`, `validate-no-emdash`, `validate-design`, `build-search-index --check`, `build-passage-index --check`, `validate-catalogue`).
- `pnpm test`: 144 files passed, 7 skipped; 1,642 tests passed, 73 skipped. After the last change (the contents list), `hq.test.tsx` and the route smoke test were rerun: 20 passed.
- ESLint `--max-warnings 0` on the changed source files: clean.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (35 Honest Answer pages), `pnpm run audit:canonicals`: pass.
- Lighthouse (`scripts/lighthouse-median.mjs`, three runs, median, `serve-like-vercel.mjs`): all three pages accessibility 100, CLS 0.000, best practices 96, SEO 100, performance 83, 83 and 84. An unchanged answer page in the same session scored 87; the longer text paints later (LCP 4.5 s against 3.8 s).
- Screenshots at 390 x 844 and 1440 x 900, day and night, in `/home/user/elite-shots/apol/`: each page's first screen, its first argument box (`*-argument.png`), its sources (`*-sources.png`), the contents list with keyboard focus and after a jump (`if-god-is-good-why-suffering-*-contents.png`, `*-jumped.png`), and an unchanged answer for comparison (`can-you-lose-your-salvation-*`). No horizontal overflow at 390.

## 5. Not verified

- A real phone, Safari, or a screen reader.
- Two bibliographic entries rest on standard bibliography, not a search I ran: Metzger and Ehrman's fourth edition (2005) and Metzger's *Canon* (1987). The ledger says so.
- Hoyle's and Rowe's exact sentences: the facts were confirmed, the wording was not, so both are paraphrased without quotation marks.
- The rewritten answers have not been read by James or by an independent voice reader. PROJECT-PROMPT says James reads a sample of any writing before it goes public; these three are that sample.

## 6. The same work for the rest, in order

For each: keep the slug, the question and its links; write a one-paragraph short answer; state the objection in its best defenders' words; lay out the argument with the premise that carries the weight named; bring the evidence from the verified essays first; meet the strongest reply; say what it does not prove; list five to ten real sources with the best book against; check every line in a ledger.

1. Did the resurrection actually happen? (the essay and its ledger already hold the evidence: the creed and its dating, the burial debate with Ehrman, Hume's Queen Elizabeth)
2. Do I have to choose between faith and science? (meet the strong form: Laplace, methodological naturalism, the God of the gaps)
3. Is hell forever, or does it end? (meet the moral objection; keep the three views open as now)
4. Why does God allow earthquakes, cancer, and animal suffering? (natural law and the fall-of-creation readings; Rowe's fawn in full)
5. What if Christianity is wrong? (Pascal's wager stated fairly, and its known faults)
6. /faq/does-god-exist: fold its eight questions into links to the argued answer, or rewrite to match, since they now overlap.
7. /faq/is-the-bible-historically-accurate and /faq/can-science-and-faith-coexist, to match 2 and the Bible answer.
8. Was Jesus just a good teacher?, Is Jesus really the only way?, Are miracles believable?, Is faith just wishful thinking? (already argue; add laid-out steps and sources only)
9. The remaining apologetic answers (good without God, faith irrational, genocide, slavery, New Atheists, meaning, Islam, AI): sources lists and light structure.
10. The pastoral answers and the pastoral /faq pages (deconstruction, religious trauma, leaving church, denominations): leave the form as it is; they are meant to console and guide, not argue.

## 7. Waits for James

1. Read the three. They are the sample. Do they sound like you, and is the length right? (About 1,700 to 2,100 words each, up from about 220 to 330. The short answer at the top still gives the whole answer in one paragraph.)
2. Which argument for God do you find strongest yourself? The answer leans on contingency over the kalam because it works whether or not the universe began; if you'd lead with another (the resurrection, the moral argument), it is a small change.
3. The age of the universe and evolution: the God answer assumes nothing either way (it uses fine-tuning and contingency, which hold on any view). The suffering answer mentions millions of years only through Rowe's and Darwin's examples and does not take a side. Should either state your own position, or keep leaving it open as "How should a Christian read Genesis 1?" does?
4. The biography line "I say it as a man who spent years sure no one was there", and "For years I said I followed the evidence. What I actually did was refuse the first premise of every argument before I heard the rest." The second describes how your atheism worked from the inside. It is drawn from the old answer's own words ("I had grown practiced at not seeing what I didn't want to owe") but is new phrasing; keep it only if it is true of you.
5. COMMON.md says no Honest Answer's wording changes; this brief asked for three to be rewritten. Nothing else was changed. If you want the old three paragraphs back for any of them, they are in git at a1f568ef.

## 8. Second run (2026-11-18): faith and science, the resurrection, hell

James read the pilot and said "publish it all". This run rebuilt the next three answers in the audit's order (4, 5 and 6 of the ten), by exactly the pilot's pattern: a one-paragraph short answer, the objection at full strength, what kind of case it is, the argument set out in numbered steps with the step that carries the weight named, the evidence, the strongest reply, what it does not prove, and a sources list with the best book against. Same slugs, questions, addresses, essay links and book links. Every claim is in `apol-ledger.md` under "Second run". No position is taken on the age of the earth or evolution. No new sentence about James's life: the only biographical line in the three is one the old resurrection answer already carried, kept in its own words.

### Do I have to choose between faith and science?

The argument in three sentences. The "war" between science and faith is a nineteenth-century story (Draper 1874, White 1896) that historians, unbelievers among them, have taken apart; the record runs from Augustine's warning against Christians talking nonsense about nature to Maxwell's Psalm on the Cavendish doors and Lemaître's expanding universe. The strong objection, that science keeps shrinking God by explaining what he was used for (Coyne's case), rests on the premise that God is one cause inside nature, which Christians from Aquinas to Bonhoeffer deny, and the same denial forbids Christians to argue from gaps. The success of science (Einstein's "comprehensibility", Wigner's "unreasonable effectiveness") fits belief in a rational Creator at least as well as unbelief, while the age of the earth and evolution are left open among the three views Christians hold.

Before: "No. The war between faith and science is not a finding of science. It is a story with a traceable birth date..." After (the skeptic's argument, set out): "1. If God exists, he is one of the causes inside nature, the kind of cause science looks for, needed wherever natural causes run out. 2. Science keeps finding natural causes where people once saw God... So: The room for God keeps shrinking." Then: "The second premise is true, and Christians should say so gladly. The weight sits on the first, and I think it's false."

Words: 223 before; 2,241 after (2,427 with headings and sources). The old answer's closing sentence about the house and whether anyone lives there is kept. Two old claims were dropped because they could not be confirmed: Polkinghorne "helped establish the existence of quarks" and Kepler's "thinking God's thoughts after him". The Laplace anecdote was searched and left out (no primary source).

Sources: Coyne, *Faith versus Fact* (2015, the best book against); Numbers, ed., *Galileo Goes to Jail* (2009); Plantinga, *Where the Conflict Really Lies* (2011); Collins, *The Language of God* (2006); Wigner (1960); Einstein, "Physics and Reality" (1936); Augustine, *The Literal Meaning of Genesis* (trans. Taylor, 1982); Bonhoeffer, *Letters and Papers from Prison*.

### Did the resurrection actually happen?

The argument in three sentences. Four facts are granted by nearly every historian of the period, skeptics included: the crucifixion under Pilate (Tacitus), the early conviction of many that they had seen Jesus alive (the creed of 1 Corinthians 15:3-7, dated by most scholars, Lüdemann among them, to within a few years), the conversions of the persecutor Paul and the skeptic James, and the preaching in Jerusalem within weeks. Fraud, survival and the wrong tomb fail, and the serious rival, bereavement visions, strains at Paul, at James and at the word the witnesses chose, since "resurrection" meant the raising of all God's people at the end, not a vision of the dead. Hume's objection is a judgment made before the evidence about whether God can act, which history cannot settle, so the argument moves a person from dismissing to weighing and claims no more.

Before: "The rivals are not stupid. Hallucinations are private events. They do not happen to five hundred at once..." (an overclaim the essay's ledger had already dropped). After: "The vision theory is the serious rival, and it deserves its due. Dale Allison, a New Testament scholar who is himself a Christian, has collected reports of the dead appearing to the living, some of them to more than one person at once... But the theory strains at three points."

Words: 222 before; 2,233 after (2,391 with headings and sources). Almost every fact is from the public essay and its three-pass ledger.

Sources: Wright, *The Resurrection of the Son of God* (2003); Licona (2010); Allison, *The Resurrection of Jesus* (2021); Sanders, *The Historical Figure of Jesus* (1993); Bird, Evans and others, *How God Became Jesus* (2014); Hume, "Of Miracles" (1748); Lüdemann, *The Resurrection of Jesus* (1994); Ehrman, *How Jesus Became God* (2014, the best popular case against).

### Is hell forever, or does it end?

The argument in three sentences. The skeptic's real question is not how long but how a good God could do this at all (Russell 1927, Mill 1865), and it can be set out as an argument from proportion: just punishment fits the wrong, human wrongs are finite, endless torment is infinite. Final judgment itself follows from God's goodness, because a God indifferent to the murder of the innocent would be indifferent to the innocent (Volf, writing out of the Balkan wars; Abraham's "Shall not the Judge of all the earth do what is just?"). The three views Christians hold each answer the proportion argument by denying a different step (Aquinas and Lewis the second, Fudge and Stott the third, the hope of restoration its finality), each has texts it struggles with, and the page leaves the choice among them open, as the old answer did.

Before: the old answer described three views and never met the moral objection. After: "Here is the moral objection laid out, so we can see where each Christian view parts company with it. 1. A just punishment is proportioned to the wrong done. 2. Every human wrong is finite. 3. Hell, as eternal conscious punishment, is infinite punishment. So: Eternal conscious punishment would be unjust..."

Words: 274 before; 1,733 after (1,853 with headings and sources). The old answer's first three sentences, its account of the three views and its whole closing paragraph are kept in its own words.

Sources: Russell, *Why I Am Not a Christian* (1927, the classic short case against); Kvanvig, *The Problem of Hell* (1993); Lewis, *The Problem of Pain* (1940) and *The Great Divorce* (1945); Fudge, *The Fire That Consumes* (1982); Edwards and Stott, *Essentials* (1988); Talbott, *The Inescapable Love of God* (1999); Volf, *Exclusion and Embrace* (1996).

### What I ran, and what passed

- Search index and passage index rebuilt (20 chapter files changed).
- `pnpm check`: pass. All 35 content-gate commands in `ci.yml`: pass. `pnpm test`: 144 files passed, 7 skipped; 1,642 tests passed, 73 skipped. ESLint on the changed files: clean. `hq.test.tsx` now names the seven argued answers.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`, `pnpm run audit:canonicals`: pass.
- Screenshots at 390 x 844 and 1440 x 900, day and night, each page's first screen, first argument box and sources, in `/home/user/elite-shots/apol/` (`do-i-have-to-choose-between-faith-and-science-*`, `did-the-resurrection-actually-happen-*`, `is-hell-forever-or-does-it-end-*`). No horizontal overflow.
- Lighthouse (three runs, median, `serve-like-vercel.mjs`): all three pages accessibility 100, CLS 0.000, best practices 96, SEO 100, performance 85. An unchanged short answer in the same session: 90. The pilot measured 83 to 84 against 87, so the gap is no worse. LCP 4.4 s against 3.7 s; TTI 4.4 s against 3.8 s.

Performance note for the lead (not built): the gap is all in time to interactive and LCP on the longer page, not in first paint (FCP 0.9 s on both). A cheap thing to try is `content-visibility: auto` with a `contain-intrinsic-size` on the answer's later parts (every `.qa` section after the first), so the browser skips laying out text below the fold until it is scrolled to; or prerender only the short answer and the contents list inside the hold and let the parts mount after.

### Not verified

- A real phone, Safari, or a screen reader.
- Volf's sentence: two sources give it in the form quoted, others vary; recheck against the book. Mill's full sentence was not found; only "to hell I will go" is quoted. Bonhoeffer's letter is dated by sources to 25 or 29 May 1944; the answer says May 1944.
- Collins and Bonhoeffer entries rest on standard bibliography, not a search in this run.
- The three have not been read by James.

### Waits for James

1. Hell: the page leaves the three views open, as the old answer did. If you hold one of them and want the page to say so (the Scholarship Standard asks the author to name where he lands on a second-order question), tell us which.
2. Science: no position on the age of the earth or evolution, by your rule. The page points to "How should a Christian read Genesis 1?".
3. The resurrection keeps the old line "that's where I lived for years". It is your old sentence; nothing new was added about your life.

### Next in the ranking

Item 7 is the `/faq/does-god-exist` page (rewrite to match the argued God answer, or fold it into links to it). The next Honest Answer is item 8, "Why does God allow earthquakes, cancer, and animal suffering?", then item 9, "What if Christianity is wrong?".

## 5. The third run: natural evil, "What if Christianity is wrong?", and /faq/does-god-exist

Date: 2026-11-18. The run before this one was cut off by a machine restart with the natural-evil answer drafted and uncommitted. That draft was checked line by line, five sentences were corrected (below), and it was committed; the other two pieces were done from scratch. Same pattern as the pilot. No sentence about James's life is added anywhere; neither answer uses his biography. No position is taken on the age of the earth or on evolution.

### Why does God allow earthquakes, cancer, and animal suffering?

The argument in three sentences. The skeptic's strongest case is Draper's (1989): the pain and pleasure in nature, tied to survival and blind to goodness, are just what you'd expect if nothing behind nature cares, and a surprise if God made it, and the weight sits on the claim about what a good God would make. Christians have three serious answers, each with a cost: a world with stable laws that creatures can learn (Lewis 1940, Swinburne 1998, with the geology of Rare Earth), a creation that makes selves through long processes (Southgate 2008), and Paul's creation "subjected to futility" read in more than one way (the young-earth reading, the old-earth reading, and Lewis's fallen created power, all left open). The strongest reply, that "God may have reasons" makes theism untestable, is met by naming where the faith can be tested (1 Corinthians 15:17) and by noting that indifference explains the pain but cannot call it wrong or promise its end; none of this explains the fawn.

Before: "What can be said is smaller than a solution. A world stable enough for embodied creatures to act, build, and love at all may be a world running on fixed laws, and the same physics that lets bone grow lets it break."

After: "The first is about laws. C. S. Lewis argued in The Problem of Pain (1940) that creatures who can meet, act and depend on one another need a nature with fixed laws, and fixed laws don't bend to spare whoever is in the way. ... The cost is plain: God could, it seems, step in each time. But a world where fire never burns the wrong creature isn't a world with laws, and the creatures in it couldn't learn, plan or keep one another safe."

Words: 265 before; 2,198 after (with headings and the laid-out argument). The old closing ("None of that answers the fawn ... He entered it. If you are in the middle of this, you don't need my argument...") is kept in its own words.

Corrected from the uncommitted draft before it was committed: Rowe's fawn no longer says "No person sees it, learns from it or is tested by it" (the suffering essay's ledger cut that sentence as not Rowe's; it now gives his scenario and "so far as we can see"); Darwin's letter is quoted from *Life and Letters* ("beneficent and omnipotent", "Caterpillars"); Southgate's "pelican heaven" is credited to Jay McDaniel, as Southgate does, instead of an unverified chapter title; Murray no longer "grants that few will find it believable" (not seen); Wesley's sermon is "from the early 1780s" (sources give 1781 and 1782).

Sources: Hume, *Dialogues* (1779); Darwin to Asa Gray, 22 May 1860; Lewis, *The Problem of Pain* (1940); Rowe (1979); Draper, "Pain and Pleasure" (*Noûs*, 1989, the strongest case against); Swinburne, *Providence and the Problem of Evil* (1998); Ward and Brownlee, *Rare Earth* (2000); Southgate, *The Groaning of Creation* (2008); Murray, *Nature Red in Tooth and Claw* (2008).

### What if Christianity is wrong?

The argument in three sentences. The question at full strength is Clifford's (1877: "It is wrong always, everywhere, and for anyone, to believe anything upon insufficient evidence") and Loftus's outsider test (2013), and Pascal's wager deserves Mackie's two objections (many options; self-deception). William James (1896) showed that for a live, forced and momentous question, refusing to decide means living one answer, so neither belief nor unbelief is a safe default and the honest question is which risk to take and on what grounds. Unlike Pascal, Paul refuses the safe-bet comfort ("of all people most to be pitied") and stakes the faith on one public event an outsider can examine; the strongest reply (James licenses every faith) is granted in part and answered by sending the choice of faith back to evidence, and by turning the outsider test on unbelief too (Holland's Dominion).

Before: "No position escapes the wager. The skeptic bets his one life on the tomb staying shut; you bet yours on it opening."

After: "The agnostic says he isn't betting, only withholding. James's point is that in a forced option, withholding has the same result as saying no. ... Clifford's rule works for shipowners and scientists, where you can wait for more evidence before you act. It doesn't work where waiting is itself the act."

Words: 221 before; 1,782 after. The old answer's main sentences (Paul's "everything falls", Thomas, Mark 9:24, "people do not die for a story they know they invented", the two bets, "Let it", the stone) are kept, some in its own words. Its claim that the disciples "died rather than recant" is narrowed to what the resurrection essay's ledger supports (James son of Zebedee, James the brother of Jesus, Peter and Paul; the rest later and less certain).

Sources: Pascal, *Pensées* (1670); Clifford, "The Ethics of Belief" (1877); James, "The Will to Believe" (1896); Mackie, *The Miracle of Theism* (1982); Wright, *The Resurrection of the Son of God* (2003); Loftus, *The Outsider Test for Faith* (2013, the strongest case against); Holland, *Dominion* (2019).

### /faq/does-god-exist

How the /faq pages are built: each page file (`client/src/pages/faq/*.tsx`) holds its eight questions and answers as plain strings, rendered by `components/FaqPage.tsx` as an open-and-close list (plain text, no links inside answers), with one "Go deeper" link and three related links; the same strings feed the page's FAQPage structured data. Nothing else (prerender, search index) reads them.

What changed: the eight questions are kept word for word, and so are the address, the SEOMeta title, description and keywords, and the three structured-data blocks (the FAQPage block now carries the new answer text, as it did the old). Each answer now argues or points: the arguments for God are given as the God answer gives them, with the premise that carries the weight in each and where an honest person can get off; the arguments against are given at full strength with a one-line reply each; suffering states the logical and evidential forms with Plantinga and Rowe; science drops the unchecked "51% of scientists" (Pew 2009) line and the founders list, and keeps only names in the science answer's ledger (Draper, White, Lemaître, Polkinghorne, Collins); "not sure" drops the unverified Tillich claim and corrects Psalm 13:1 to the ESV's "O LORD". Each answer names the Honest Answer that argues it in full. The "Go deeper" link went to /answers with "Read the full article"; it now goes to /answers/does-god-actually-exist ("Read the argued answer"). The standfirst "answered by a pastor who spent years asking it himself -- from the other side" became "answered by a pastor who came to faith from atheism" (his confirmed fact, no invented detail). Words in the answers: 2,120 before, 1,983 after. No "--" left.

### What I ran, and what passed

- Merged the latest `origin/claude/todo-implementation-hhp4bm` before the gates. Search index and passage index rebuilt (12 chapter files).
- `pnpm check`: pass. All 35 content-gate commands in `ci.yml`: pass. `pnpm test`: 144 files passed, 7 skipped; 1,642 tests passed, 73 skipped. ESLint on the changed source files: clean. `hq.test.tsx` names the nine argued answers.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`, `pnpm run audit:canonicals`: pass.
- Screenshots at 390 x 844 and 1440 x 900, day and night, in `/home/user/elite-shots/apol/` (`natural-evil-*`, `what-if-wrong-*` with `-argument` and `-sources`; `faq-does-god-exist-*` with `-open` and `-more`). No horizontal overflow.
- Lighthouse (three runs, median, `serve-like-vercel.mjs`): both answers accessibility 100, CLS 0.000, best practices 96, SEO 100, performance 83 (LCP 4.6 s); /faq/does-god-exist 93 (accessibility 100, CLS 0.000); an unchanged short answer in the same session 87. Same gap as the pilot; no worse. The cheap performance ideas from the last run were not tried, as asked.

### Not verified

- A real phone, Safari, or a screen reader.
- Diderot's 1746 answer to Pascal ("an imam could reason just as well") could not be found in a search, so it is not used; the many-options objection is given in Mackie's name.
- Ward and Brownlee's plate-tectonics thermostat rests on secondary accounts of the book (Ward's interview and pages citing chapter 9), not the book's own text.
- Collins's *The Language of God* (2006) on the faq page rests on the science answer's ledger, which marks it standard bibliography.
- None of the three has been read by James.

### Waits for James

1. Natural evil: the page sets out three readings of Romans 8:20 (young earth, old earth, a fallen created power) and chooses none, by your rule. If you want it to say where you land, tell us.
2. Neither answer uses your biography. If you want one sentence of your own on either (you came to faith from atheism), say where.

### Next in the ranking

Item 10: `/faq/is-the-bible-historically-accurate` and `/faq/can-science-and-faith-coexist`, brought into line with the argued Bible and science answers the same way as /faq/does-god-exist.

## 6. The fourth run: the two /faq pages, and "Was Jesus just a good teacher?"

Date: 2026-11-18. The run before this one was cut off by a machine restart with the Bible /faq page drafted and uncommitted. That draft was checked line by line against the ledgers, two sentences were corrected (below), and it was committed; the other two pieces were done from scratch. No sentence about James's life is added anywhere. No position is taken on the age of the earth or on evolution. Every claim is in `apol-ledger.md` under "Fourth run".

### /faq/is-the-bible-historically-accurate

The eight questions are kept word for word, and so are the address, the SEOMeta title, description and keywords, and the three structured-data blocks (the FAQPage block carries the new answer text, as it did the old). Each answer now argues or points, with the facts of the argued Bible answer and the trust-the-Bible and canon essays: what historians agree on (and the two halves of the honest summary), what archaeology can and can't check (Pilate's stone, Gallio, Merneptah, Tel Dan, Qumran; the exodus and conquest argued over; Younger on Joshua's style), the differences in the Easter accounts and Mark 2:26 named plainly, the dating of the Gospels and Burridge, the canon recognized rather than voted, the manuscripts and the marked uncertain places, the oldest copies and the Tacitus comparison, and how to read honestly. Each names the Honest Answer that argues it in full where one exists. The "Go deeper" link now goes to /answers/why-would-anyone-trust-the-bible ("Read the argued answer"). Words in the answers: 1,915 before, 2,317 after. Removed as unchecked or overstated: the Pool of Siloam and Bethesda lines, Hezekiah's tunnel dates, the Cyrus Cylinder, "consistently confirmed".

Corrected in the uncommitted draft: John's Easter account now has "two angels in white, seen by Mary Magdalene" (John 20:12; the draft said only "tells it through Mary Magdalene"); 1 Thessalonians is "usually dated around 50 ... among the earliest Christian writings" (the draft said "49 to 51 ... widely agreed to be the earliest").

### /faq/can-science-and-faith-coexist

Same rules. Questions, address, title, description, keywords and structured data kept. The war story is answered with Draper, White, Numbers and Galileo; evolution and the age of the earth set out as the three views Christians hold, each with the hard question it has to answer, and left open; the scientists questions give only names that can be checked (Faraday, Mendel, Maxwell, Lemaître, Polkinghorne, Collins), say plainly that many great scientists have not believed, and name the line usually credited to Heisenberg as misattributed; miracles meets Hume and points to the miracles and resurrection answers; the Big Bang gives Lemaître, Hoyle and Penzias and Wilson, and sets out the contingency argument from the God answer in three lines rather than leaning on a beginning; reconciling meets Gould's "non-overlapping magisteria" fairly, then gives Aquinas, Bonhoeffer and Plantinga. The "Go deeper" link now goes to /answers/do-i-have-to-choose-between-faith-and-science. Words: 2,044 before, 2,450 after. Removed as unchecked: the Pew "51%" and Ecklund figures, Kepler's and Planck's quoted lines, the Heisenberg line as his, the founders list, the Pontifical Academy date, Humani Generis, Hawking's model, and the old page's sentence that the evidence for common descent is overwhelming (a position on evolution).

### Was Jesus just a good teacher?

The next Honest Answer in the ranking (item 8 of section 6: the answers that already argued, to be given laid-out steps and sources). Rebuilt in full by the pattern.

The argument in three sentences. The good-teacher view at its strongest is Jefferson's scissors (1813 and about 1820), sharpened by Ehrman (the high claims are John's, and the divinity came after Easter) and by Schweitzer (a sane prophet mistaken about the end); Lewis's trilemma is granted to be too quick, and John is set aside. In the earliest sources Jesus forgives sins, is lord of the Sabbath, sets "But I say to you" beside Sinai and answers the high priest "I am", and within about twenty-five years Jewish monotheists were praying to him in Aramaic (Marana tha), setting him inside the Shema (1 Corinthians 8:6) and applying Isaiah 45:23 to him, which Hurtado argued was an explosion, not a slow legend. That leaves a liar, a mistaken prophet or a man who was right; the mistaken prophet is the serious option, but it is no longer the good-teacher view, and the choice between it and the creed turns on the resurrection, which has its own page.

Before: "The trilemma's largest hole is legend. Maybe a later church put the high claims in a humble rabbi's mouth... Hurtado traces divine worship of Jesus to the first years after his death..." After (the speed of worship, set out): "1. Within about twenty-five years of Jesus's death, and in prayers older than that, communities of his followers, Jewish believers among them, prayed to him, sang of him and set him inside their confession of the one God. 2. The Jews of that time held that worship belongs to the one God alone, and would not give it to anyone else. 3. A change that large, that early, among those people needs a cause at the start, not a slow drift over generations. So: The high view of Jesus didn't grow up late."

Words: 238 before; 2,053 after (with headings and the laid-out argument, before the sources). The old answer's own sentences are kept where they stand, including "I held the comfortable view, and it was a place to file him more than a conclusion. It let me honor a man without obeying him." (his old sentence; nothing new about his life).

Sources: Lewis, *Mere Christianity* (1952); Schweitzer, *The Quest of the Historical Jesus* (1906; English 1910); Hurtado, *One God, One Lord* (1988) and *Lord Jesus Christ* (2003); Bauckham, *Jesus and the God of Israel* (2008); Ehrman, *How Jesus Became God* (2014, the best book against); Bird, Evans and others, *How God Became Jesus* (2014); Jefferson, *The Life and Morals of Jesus of Nazareth* (c. 1820).

### What I ran, and what passed

- Merged the latest `origin/claude/todo-implementation-hhp4bm` before starting. Search index and passage index rebuilt (8 chapter files: 1 Corinthians 8 and 16, Galatians 1, Isaiah 45, Mark 8 and 14, Matthew 5, Philippians 2).
- `pnpm check`: pass. All 35 content-gate commands in `ci.yml`: pass. `pnpm test`: 145 files passed, 7 skipped; 1,649 tests passed, 73 skipped. ESLint on the changed source files: clean. `hq.test.tsx` names the ten argued answers.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (35 Honest Answer pages), `pnpm run audit:canonicals` (0 failures): pass.
- Screenshots at 390 x 844 and 1440 x 900, day and night, in `/home/user/elite-shots/apol/` (`faq-bible-*` and `faq-science-*` with `-open`; `good-teacher-*` with `-argument` and `-sources`). No horizontal overflow.
- Lighthouse (three runs, median, `serve-like-vercel.mjs`): the good-teacher answer accessibility 100, CLS 0.000, best practices 96, SEO 100, performance 83 (LCP 4.5 s); an unchanged short answer in the same session 87 (LCP 4.1 s); /faq/can-science-and-faith-coexist 93, accessibility 100, CLS 0.000. The same gap as the pilot; no worse. The cheap ideas from the second run (`content-visibility: auto` on later parts, or prerendering only the short answer and contents) still stand and were not built.

### Not verified

- A real phone, Safari, or a screen reader.
- Lewis's full passage: copies online differ in the sentences around the one quoted, so only that sentence is quoted. Jefferson's letter was read in a university transcription, not on Founders Online.
- The Hurtado, Bauckham and Ehrman summaries rest on reviews and secondary accounts, not the books; each is paraphrased, not quoted.
- None of the three has been read by James.

### Waits for James

1. The good-teacher answer keeps your old sentence "I held the comfortable view..." and adds nothing about your life. Keep it only if it is still true as written.
2. The science /faq page states the scientific estimates for the age of the earth and universe as "the mainstream scientific estimate" and sets out the three Christian views without choosing. If you want it to say where you land, tell us.

### Next in the ranking

The ten in the audit ranking are done. Next by section 6: item 8's remaining answers, "Is Jesus really the only way to God?", "Are miracles believable?" and "Is faith just wishful thinking?" (they already argue; give them laid-out steps and sources), then item 9.

## 7. The fifth run (2026-11-19): the only way, miracles, wishful thinking

The next three in the ranking (item 8 of section 6), rebuilt in full by the approved pattern: a one-paragraph short answer, the objection at full strength in its defenders' words, the argument laid out with the weight-bearing premise named, the evidence, the strongest reply met, what the argument does not prove, and sources. Slugs, questions, addresses, essay and book links are unchanged. Every claim is in `apol-ledger.md` under "Fifth run". No sentence about James's life is added beyond one use of a confirmed fact (raised without a father, in the wishful-thinking answer). Old recollections that cannot be confirmed were cut; each is listed in the ledger.

### Is Jesus really the only way to God?

The argument in three sentences. Hick's pluralism, stated in his own terms (a Copernican revolution, the Real, transformation "from self-centredness to Reality-centredness", the accident of birth), is answered by a deductive argument from contradiction: the religions make claims about the same matters (the cross, the Messiah) that cannot all be true, so pluralism must tell every believer he has misunderstood his own faith, which Newbigin, D'Costa and Plantinga show is one more exclusive claim. The Christian claim is not that Christians are better but that God acted in history, through one person, so whether it is true is the historical question of the resurrection. The creeds bind that salvation is through Christ alone; how God deals with those who never heard is set out as three views (restrictivist, inclusivist, an opportunity after death), each with its strongest point and hardest question, and left open.

Before: "The philosopher John Hick pressed the objection well: make God the center, and Christianity, Islam, and the rest are planets in orbit... He loved the parable of the blind men and the elephant..." After (set out): "1. The great religions make claims about the same matters that contradict each other... 2. Two claims that contradict each other about the same matter can't both be true. So: At least some of the great religions are mistaken about something they hold central. No view of the religions, the pluralist's included, can call them all true as their own followers understand them."

Words: 340 before; 2,227 after (with the laid-out arguments, before headings and sources).

Sources: Hick 1973 and 1989 (the best book against); D'Costa 1996; Hick's reply 1997; Plantinga 1995; Newbigin 1989; Sanders 1992; Sanders, Fackre and Nash 1995; Pinnock 1992.

### Are miracles believable?

The argument in three sentences. Hume's case is quoted from the Enquiry itself (the wise man, the definition, the maxim, the four points of Part II, the Abbé Paris, the frost) and laid out as he gives it; its first premise is granted and the weight placed on the second. That premise is circular if read strictly (Lewis), and read as probability it fails the test of probability (Earman, with Babbage on independent witnesses, and Vanderburgh and Millican's replies given fairly), while the word violation assumes what is in question (Hume's own Indian prince; Lewis's drawer). The prior probability of a miracle depends on whether there is a God and a reason for him to act, so no rule laid down in advance can settle it, and the question goes back to the God and resurrection pages; "ignorant and barbarous nations" is met with Keener's reports from the Global South.

Before: "John Earman, no apologist, called this circular in Hume's Abject Failure (Oxford, 2000)." After: "The first is a circle... C. S. Lewis put it plainly in Miracles (1947)... That is the second problem. John Earman... examined the essay with the mathematics of probability worked out by Hume's own contemporaries, Thomas Bayes and Richard Price."

Words: 376 before; 2,046 after.

Sources: Hume 1748 (the best case against); Lewis 1947; Earman 2000; Vanderburgh 2005; Babbage 1837; Keener 2011; Wright 2003.

### Is faith just wishful thinking?

The argument in three sentences. Feuerbach, Marx (quoted) and Freud (quoted) are stated at full strength, and the Bible's own attack on wish-religion (Jeremiah 6:14) is conceded first. Freud's argument, laid out, fails on Freud's own concessions ("Illusions need not necessarily be false"; truth-value outside "the scope of the present enquiry"), and its stronger debunking form presupposes that God does not exist (Plantinga, with Augustine's restless heart); an argument from parity (Nagel's "I want atheism to be true", Vitz's reversal of Freud) shows the motive question cuts both ways and settles neither. The content of the faith fits the wish account poorly (Isaiah 6, Hebrews 10:31, the cross, love of enemies), and the debunking reply needs a complete explanation and no other evidence, neither of which has been shown.

Before: "I ran the projection test on everyone but myself. For years I told myself I had followed the evidence into the cold..." (cut: a recollection that cannot be confirmed). After: "I was raised without a father, so I can't read either theory as a stranger to it. On Freud's account, any faith I hold is the obvious wish of a fatherless boy. On Vitz's account, unbelief in a man like me would be just as easy to explain."

Words: 330 before; 1,993 after.

Sources: Feuerbach 1841; Marx 1844; Freud 1927 (the best book against); Nagel 1997; Vitz 1999; Plantinga 2000; Augustine, Confessions (Chadwick).

### What I ran, and what passed

The first run of this section was cut off by a machine restart before its commits were pushed, and its gate results were never seen by the agent that finished it. This section states only what the finishing run (2026-11-19) watched run to the end, after merging the latest `claude/todo-implementation-hhp4bm` (already up to date) and correcting one source (below).

- Editor's read of the three answers: one real breach found and fixed. The Hume Studies reply to Earman (2005) is by William L. Vanderburgh; the answer, its source list, the ledger and this report had named a "William Kopf". No invented recollection, feeling or habit of James's; the only first-person biography is "I was raised without a father" (wishful thinking), with nothing added to it. Every quotation of a person is marked verified word for word in the ledger. No forbidden words, no em-dashes, no exclamation outside quoted Scripture, no altar call; the three views on those who never heard are set out without a side taken.
- `pnpm check`: exit 0.
- All 36 commands of the content-gates step in `ci.yml`, run one at a time: every one exit 0 (search index up to date, 730 entries; passage index 615 chapter files match).
- `pnpm test`: exit 0; 146 test files passed, 7 skipped; 1,651 tests passed, 73 skipped.
- `pnpm build`, then `pnpm run sitemap` (static fallback, no database here), then `pnpm run prerender` (3,026 route files, 35 Honest Answer pages), then `pnpm run audit:canonicals` (0 not prerendered, 0 failures): each exit 0.
- Served with `scripts/serve-like-vercel.mjs` on port 4583 and looked at with Playwright (API stubbed) at 390 x 844 and 1440 x 900, day and night: on all three pages the scroll width equals the viewport width (no sideways scroll), every section heading renders, the laid-out arguments and "Sources and further reading" render. Screenshots: `/home/user/elite-shots/apol/run6-*`.
- Not run by the finishing run: ESLint and Lighthouse. The first run's Lighthouse figures (performance 84, accessibility 100, CLS 0.000) were not re-measured and are not claimed here. The cheap ideas from the second run (`content-visibility: auto` on later parts, or prerendering only the short answer and contents) still stand and were not built.

### Not verified

- A real phone, Safari, or a screen reader.
- Primary texts other than Hume were not opened (the network allows search only): Newbigin's elephant passage, Plantinga's Madagascar line and Lewis's drawer are paraphrased; the Freud, Nagel, Marx, Lewis and Augustine phrases quoted were matched in search results that quote them, not in the books.
- Babbage's first-edition year (1837) rests on standard bibliography; the text says "the 1830s".
- None of the three has been read by James.

### Waits for James

1. The wishful-thinking answer uses "I was raised without a father" once, as a fact, with no feeling or memory attached. Keep it only if you want it there.
2. Three old first-person sentences were cut because they describe memories or feelings we cannot confirm: "For most of my life I was an atheist ... obscene" (the only-way answer), "I did not lose that argument to a better argument..." (miracles), and the old third paragraph of the wishful-thinking answer ("For years I told myself..."). If any of them is true as written, they can go back.

### Next in the ranking

Section 6, item 9: the remaining apologetic answers, in this order: "Can you be good without God?", "Is believing anything on faith irrational?", "Did God command genocide in the Old Testament?", "Why didn't the Bible just ban slavery?", "What did the New Atheists get right?", "Can a life mean anything without God?", "What do Christianity and Islam actually dispute?", "What makes us human in the age of AI?".
