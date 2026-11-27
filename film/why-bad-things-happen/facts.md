# Why do bad things happen?: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/why-bad-things-happen.json` (older captions, rows at lines 464 to 469 of `docs/work/elite/explorer-ledger.md`), deepened from three live hard-question pages and two Honest Answers. Nothing was added from outside these sources:

- QL = `client/public/questions/evil/the-logical-problem-of-evil.json` (record `docs/work/elite/apol-pilot/evil/the-logical-problem-of-evil.md`)
- QE = `client/public/questions/evil/the-evidential-problem-of-evil.json` (record `docs/work/elite/apol-pilot/evil/the-evidential-problem-of-evil.md`)
- QN = `client/public/questions/evil/natural-evil-and-animal-suffering.json` (record `docs/work/elite/apol-pilot/evil/natural-evil-and-animal-suffering.md`)
- HA-S = Honest Answer `if-god-is-good-why-suffering`, `client/src/data/answers.ts`
- HA-N = Honest Answer `why-does-god-allow-natural-disasters`, `client/src/data/answers.ts`
- OF = the old film, `client/public/explorer/films/why-bad-things-happen.json`

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-26.

- **John 11:35** (spoken): “Jesus wept.”
- **Luke 13:4-5** (spoken): “Do you think that they were more sinful than all the others living in Jerusalem? No, I tell you.” Trimmed before “But unless you repent”, as the old film and its ledger row do.
- **Job 38:4** (shown on screen): “Where were you when I laid the foundations of the earth? Tell Me, if you have understanding.”
- **Romans 8:22** (shown on screen): “We know that the whole creation has been groaning together in the pains of childbirth until the present time.”
- **Matthew 27:46** (spoken): “My God, My God, why have You forsaken Me?”
- **Job 42:5** (spoken): “My ears had heard of You, but now my eyes have seen You.”
- **Revelation 21:4** (spoken): “He will wipe away every tear from their eyes”

## Claims, by chapter

1. **The hardest question.** Strongest reason people give for not believing; deserves an honest answer, not a slogan: OF frame "question" (older); HA-S first paragraph. Lactantius, a Christian teacher, preserved it early in the fourth century in order to answer it, crediting it to Epicurus: QL "The objection at its strongest"; HA-S "The objection at full strength".
2. **What is true in it.** Suffering real, much looks pointless from where we stand; some first answers worse than silence; "everything happens for a reason" to a grieving mother isn't theology: OF frame "broken"; HA-S "The objection at full strength" (third paragraph); QL "What is true in it". The Bible never pretends pain is good; Jesus wept at Lazarus' grave: OF frame "broken" (younger); HA-S "The strongest reply, and an answer" (Jesus came to the grave of Lazarus).
3. **Not a punishment.** Nobody can explain any one illness or disaster: OF frame "not-a-punishment"; ledger row 465. Tower in Siloam, eighteen died; Jesus refused the reading that sufferers must be worse: OF frame "not-a-punishment"; QE and QN "What is true in it".
4. **A contradiction?** J. L. Mackie, 1955, three claims ("God is omnipotent", "God is wholly good", "evil exists") can't all be held together: QL "The objection at its strongest"; HA-S "The objection at full strength". Christians say evil comes from the misuse of freedom; Mackie asked why an all-powerful God couldn't have made people free who always in fact choose the good: QL "The objection at its strongest" (third paragraph).
5. **A possible reason.** Alvin Plantinga, *God, Freedom, and Evil* (1974); a contradiction has to be impossible, so showing a reason is possible suffices; a world of significantly free creatures may be better than one where they can only do right; God could not create moral good without the risk of moral evil: QL "The evidence"; HA-S "Two arguments, laid out". Mackie later (*The Miracle of Theism*, 1982) granted the problem of evil does not show theism inconsistent, though he asked whether the defence was a real solution: QL shortAnswer and "The evidence". "A real result, and a narrow one"; explains no one's suffering: QL shortAnswer. Many Christians in the Reformed tradition don't hold Plantinga's view of freedom; the site takes no side: QL "Where Christians differ"; HA-S "Two arguments, laid out".
6. **One fawn.** William Rowe, atheist philosopher, 1979; the fawn caught in a forest fire started by lightning, unseen; its suffering, so far as anyone can tell, serves no good; the inference from "we can see no good" to "there is none"; the argument hasn't been refuted: QE shortAnswer and "The objection at its strongest"; HA-S. The fawn's suffering is named, not described (the sources' fuller description is left out on purpose).
7. **The garage and the flea.** Stephen Wykstra, 1984; when "I see no reason" licenses "there is probably no reason"; the garage and the flea; the distance between God's mind and ours far greater: QE "The evidence"; HA-S "Where the evidential argument is weakest". Job: the reader is shown a reason, Job never told; God answers only with questions: QE "The evidence"; OF frame "allowed-to-ask"; ledger row 467. Rowe's reply: a loving God would have strong reason to assure sufferers there is a reason; many who suffer receive no such assurance: QE "The strongest reply, and an answer".
8. **Earthquakes and cancer.** Free will doesn't reach earthquakes, cancer, animal suffering: QN shortAnswer and "What is true in it"; HA-N first paragraph. Paul Draper, 1989, pattern of pain is what we'd expect if nothing behind nature cared: QN shortAnswer; HA-N. Several Christian answers (stable laws; creatures made through long processes; the present order not the one God intends to keep, Romans 8), each with a real cost; Christians differ: QN shortAnswer, "The evidence", "Where Christians differ". Indifference explains the pain well, can't call it wrong, can't promise it will end: QN "The strongest reply, and an answer" (last paragraph); HA-N "The strongest reply, and an answer".
9. **God came into it.** Not an explanation but an event; God didn't stay outside; the Son became a man with a body that could be hurt; on the cross he prayed the first line of Psalm 22; if he was raised, suffering is real evil and won't win: OF frames "god-came" and "mended"; HA-S "What this does not prove"; ledger row 468. The risen Jesus still carried the marks of the nails: OF frame "mended"; HA-S last paragraph.
10. **Allowed to ask.** No one can say why this child, this disease, this much: QL "What remains unresolved"; QE "What remains unresolved". Job never found out; he was allowed to ask: OF frame "allowed-to-ask"; HA-S last paragraph.
11. **The last word.** The Bible's last picture is of God himself wiping away every tear; that doesn't tell anyone why; it tells who has the last word, and that he has carried the wound himself: OF frame "all-new"; HA-S "What this does not prove".

## Notes

- Care: the old film's `care` line and its "Not alone" frame (a parent, a pastor, a trusted adult, Find Help) stay on the film's page untouched. They are not in the narration and no new care line was written.
- The two pauses for the viewer (chapters 4 and 6) are questions only; they assert nothing.
- Left out on purpose: the fuller description of the fawn, Darwin's wasps, Auschwitz, Voltaire on Lisbon, and Dostoevsky's tortured children (detail of suffering); Hume's Philo (cut for length).
