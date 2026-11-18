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
