# Who made God?: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/who-made-god.json` (its "older" captions), with its rows in `docs/work/elite/explorer-ledger.md` (lines 253 to 259, "Who made God?"). It adds the live hard-question page `client/public/questions/god/who-made-god.json`, whose sources were checked in `docs/work/elite/apol-pilot/god/who-made-god.md`, and the Honest Answer "does-god-actually-exist" in `client/src/data/answers.ts`. Nothing was added from outside these. Abbreviations below: **Film** = the old film; **Page** = the question page (same text as its record file); **Answer** = the Honest Answer.

The full cosmological case (the contingency syllogism, Taylor's ball, the kalam's beginning, Borde, Guth and Vilenkin) is left to the sibling film does-god-exist. This film names the kalam and Leibniz only to show what the arguments do and don't claim.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-26.

- **Psalm 90:2** (spoken): "Before the mountains were born or You brought forth the earth and the world, from everlasting to everlasting You are God." Used by Film (frame "everlasting") and Page ("The evidence").
- **Revelation 4:11** (shown on screen, not spoken): "You created all things; by Your will they exist and came to be." Page, "Where Christians differ".
- **Exodus 3:14** (spoken, the words "I AM WHO I AM" only): Film (frame "i-am") and Page ("The evidence").
- The bush "that burned and wasn't burned up": Film frame "i-am"; ledger line 258 (BSB Exodus 3:2, "ablaze with fire, but it was not consumed"). Not quoted.

## Claims, chapter by chapter

**A fair question**
- Everything we meet came from something; you have parents; a tree came from a seed. Film, frame "from-something" (older).

**Russell's question**
- Bertrand Russell, a London lecture in 1927, published as *Why I Am Not a Christian*. Page, "The objection at its strongest", paragraph 1; `objectionSource`.
- At eighteen he read John Stuart Mill's *Autobiography*; Mill's father taught that "Who made me?" can't be answered because it suggests "Who made God?" Page, same paragraph (Mill's sentence is paraphrased; only the two questions are in quotation marks).
- Russell's quoted conclusion, word for word: "If everything must have a cause, then God must have a cause. If there can be anything without a cause, it may just as well be the world as God." Page, same paragraph.

**Who designed the designer?**
- Richard Dawkins, *The God Delusion*, 2006: a God able to design a universe would have to be supremely complex, so at least as improbable as the universe he is invoked to explain; the hypothesis begins a worse regress. Page, objection, paragraph 2 (paraphrased). The kicker's phrase is from Answer, "The case against, at its strongest", paragraph 2 ("who designed the designer").

**What's true in it**
- Christians have sometimes argued as if everything has a cause; stated that way it refutes itself. Page, "What is true in it", paragraph 1.
- A designer imagined as a very complex being inside the universe, assembled from parts, would need explaining as much as anything he made. Page, "What is true in it", paragraph 3.

**Read the fine print**
- The kalam's first premise in William Lane Craig's form: whatever begins to exist has a cause; it says nothing about what never began. Page, "The evidence", paragraph 1.
- Leibniz (1714) argued about contingent things, things that might not have existed; Aquinas (third way) also ends at a being with its own necessity; none says everything has a cause, each says a certain kind of thing does. Page, "The evidence", paragraph 1. Leibniz's date 1714 also in Answer ("First: why is there anything at all?"). "Long before him": Page, "Read further", dates the *Summa Theologiae* about 1265 to 1274.

**Not one more link**
- A fair question aimed at the wrong target; God did not begin, could not have failed to exist, has no parts whose union would need a cause. Page, "The argument, laid out", step 3 and conclusion.
- Aquinas: God "altogether simple," without parts. Page, "The evidence", paragraph 3 (no quotation marks used in the narration).
- "Not a very large thing inside the universe, needing a maker" and "the one on whom everything else depends": Film, frame "not-a-link" (older); Page, short answer.

**From everlasting**
- "Nothing made him, and nothing keeps him going." Film, frame "everlasting" (older): "nothing keeps him going ... nothing made him."

**Then why not the world?**
- Russell's parity as the strongest reply; the question becomes which candidate can bear the weight. Page, "The strongest reply, and an answer", paragraphs 1 and 2.
- The universe shows marks of something that might have been otherwise; Hume suggested the material world might be necessary in a way we don't understand; observation can't rule out either; argument decides. Page, same section, paragraph 2.

**Whose burden?**
- Russell's china teapot circling the sun, too small for telescopes; no one could disprove it or be obliged to believe it. Page, objection, paragraph 3 (Russell's 1952 essay "Is There a God?"; the year and title are not spoken).
- Antony Flew, 1972 ("The Presumption of Atheism"): the onus of proof lies on whoever affirms. Page, objection, paragraph 3.
- Partly right; anyone who claims God exists owes reasons. Page, "What is true in it", paragraph 2.
- The teapot explains nothing; nothing would be different if it were absent; God is proposed to explain public facts (a world, ordered and knowable, some things really wrong); both sides carry a burden. Page, "The strongest reply", paragraph 3. (The resurrection clause there is left out of the film.)

**Still open**
- Unresolved: coherence of a necessary being; a necessary universe as a real alternative; how to judge prior probability before the evidence. Page, "What remains unresolved".
- Christians differ on how to state God's simplicity; Alvin Plantinga, *Does God Have a Nature?* (1980), thought the strong form hard to reconcile with God being a person. All confess God uncreated and eternal, everything else existing because he wills it. Page, "Where Christians differ".

**I AM**
- Moses asked God's name at the bush; the answer was "I AM WHO I AM." Film, frame "i-am"; Page, "The evidence", paragraph 2.
- "Every explanation has to stop somewhere": Film, `think.older`; ledger line 255; Answer ("Every account of reality has to stop somewhere").
- Title card, "Not the first link. The reason there's a chain.": restates Film frame "not-a-link" (younger): "God is not the first link in the chain. He is the one who made there be a chain at all."

## Notes

- The old film has no care line and no "differ" note.
- No first-person sentence of the Honest Answer is used, and nothing about James.
- God is never to be drawn; the chain, the light and the bush are the old film's own pictures.
