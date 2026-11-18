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
