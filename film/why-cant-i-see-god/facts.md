# Why can't I see God?: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/why-cant-i-see-god.json` (its "older" captions), with its "see-god" rows in `docs/work/elite/explorer-ledger.md`. The argument from hiddenness comes from the live hard-question page `client/public/questions/evil/the-hiddenness-of-god.json`, whose sources were checked in `docs/work/elite/apol-pilot/evil/the-hiddenness-of-god.md` (ledger `docs/work/elite/apol-ledger.md`, section "al"), and from the Honest Answer "does-god-actually-exist" in `client/src/data/answers.ts`. The revelation lines also match the Study Bible page `client/public/bible/doctrines/revelation.json`. Nothing was added from outside. The prayer side of the question (feeling far from God) is left to the sibling film god-silent.

## Scripture (Berean Standard Bible)

Each chapter quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-26; the two quotations inside lines that are not a chapter's `scripture` (John 14:9, John 20:29) were checked by hand against the same files the same day.

- **John 4:24** (spoken, the clause only): “God is Spirit”
- **Psalm 19:1** (spoken): “The heavens declare the glory of God; the skies proclaim the work of His hands.”
- **Deuteronomy 4:12** (spoken): “You heard the sound of the words, but saw no form; there was only a voice.”
- **Isaiah 45:15** (spoken, the clause only): “Truly You are a God who hides Himself”
- **Hebrews 11:6** (shown on screen, not spoken): “anyone who approaches Him must believe that He exists and that He rewards those who earnestly seek Him”
- **John 1:18** (spoken): “No one has ever seen God, but the one and only Son, who is Himself God and is at the Father’s side, has made Him known.”
- **John 14:9** (spoken in a line): “Anyone who has seen Me has seen the Father”
- **Jeremiah 29:13** (spoken): “You will seek Me and find Me when you search for Me with all your heart.”
- **1 Corinthians 13:12** (spoken): “Now we see but a dim reflection as in a mirror; then we shall see face to face.”
- **John 20:29** (spoken in a line): “blessed are those who have not seen and yet have believed”

## Claims, chapter by chapter

- **A fair question.** The question is fair and the Bible doesn't dodge it; God is Spirit; he isn't made of anything, because nothing made him. Old film, frame "question" (older); ledger row see-god 1 (catechism Q67 and Q3).
- **Real things unseen.** We know real things we can't see, like love, the wind, our own thoughts; no one has seen the wind, everyone has seen a tree bend in it. Old film, frame "unseen"; ledger row see-god 2 (catechism Q67).
- **In what he made.** General revelation defined as what God shows of himself to every person through the created world; "General revelation leaves every person accountable; special revelation tells the good news." Old film, frame "made"; ledger row see-god 3; `revelation.json`, `definition` and `nt` (the sentence is word for word there).
- **A voice, not a shape.** God spoke to Abraham, Moses and through the prophets, and their words were written down; Moses reminded Israel at Sinai. Old film, frame "spoken"; ledger row see-god 4; `revelation.json`, `ot`.
- **The argument from hiddenness.** J. L. Schellenberg, *Divine Hiddenness and Human Reason* (1993); he has shaped the debate more than anyone ("pressed the question harder than anyone" restates this); the argument's form (people open to God who through no fault of their own don't believe; a perfectly loving God would leave no such people; so no such God); the point is not that God is unproved but that the absence of proof is evidence; "A loving parent doesn't hide from a child who is calling for her." Hiddenness page, "The objection at its strongest"; ledger "al" rows 1 and 2 (SEP "Hiddenness of God"); also the Honest Answer, "The case against, at its strongest", and the old film's frame "light".
- **What's true in it.** There are honest unbelievers; many have prayed, read, asked and waited for years and not come to believe; Christians have sometimes read Romans 1:20 as a verdict on every unbeliever; Paul was diagnosing the human race, not reading the heart of the person across the table. Hiddenness page, "What is true in it". Isaiah 45:15 as Scripture knowing the ache: the page's `shortAnswer`.
- **Enough light.** Pascal saw the problem three centuries before Schellenberg; *Pensées*, published in 1670 (after his death; the film drops that phrase for length); the quotation from *Pensées* 430 in W. F. Trotter's translation is word for word from the page, verified in ledger "al" (Pascal row). Michael Murray, "Coercion and the Hiddenness of God" (1993): overwhelming evidence would coerce the response it was meant to invite; John Hick (1966): a world in which God was obvious would leave no room to grow freely toward him. Hiddenness page, "The evidence"; ledger "al" (theistic explanations row). The Honest Answer gives the same Pascal thought in paraphrase.
- **Schellenberg replies.** Every good the explanations name (freedom, humility, growth among them) can be had inside a relationship with God, and better there; critics add the child who has never resisted anything; the reply's first part is not fully answered; belief is the door, not the room; a person can hold the belief and refuse the relationship. Hiddenness page, "The strongest reply, and an answer"; ledger "al".
- **Hidden in plain sight.** God did not stay hidden but came near in a way that could be missed; Jesus told Philip, and was crucified by people who did not see it; Martin Luther's Heidelberg Disputation of 1518 and the theologian of the cross, who knows God hidden in suffering and the cross. Hiddenness page, same section; ledger "al" (Luther row) and the flagged-and-verified row (Latin theses 19 to 21). John 1:18 as the close of John's prologue: old film frame "jesus"; `revelation.json`, `nt`.
- **What stays open.** Why some who seek do not find, or find only late, is not explained; no one can settle it by looking into another's heart; many in the Reformed tradition read Romans 1 so that no unbelief is wholly innocent, though they agree no one may judge another's heart; others hold there are sincere seekers who have not yet found; the site takes no side. Hiddenness page, "What remains unresolved" and "Where Christians differ". "Scripture describes the seeking as long and the finding as promised" with Jeremiah 29:13: "The evidence".
- **Face to face.** Christian hope ends where this question begins; Paul's dim reflection; Jesus' word for those who have not seen. Old film, frame "face"; ledger row see-god 7.
- **Title card.** "Not by squinting harder. Because he came close." Restates the catechism's words in the old film's frame "jesus" ("we do not know God by squinting harder; we know him because he came close"); ledger row see-god 5.

## Notes

- The film takes no side between the Reformed reading of Romans 1 and the view that there are sincere seekers who haven't yet found, as the page takes none.
- Schellenberg is a living author; he is paraphrased, never quoted, as the ledger requires. Murray, Hick and Luther are paraphrased too. The only scholar quoted is Pascal (in Trotter's translation).
- The old film has no care line, so none is in the narration or needed on the page. The hiddenness page's pointer to suffering, losing a child and Find Help stays on that page.
- God is never drawn.
