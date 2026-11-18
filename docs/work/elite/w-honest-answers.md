# Honest Answers: voice pass

Branch `elite/w-honest-answers`, from `b2e655e6`. Not pushed.

## What changed

`client/src/data/answers.ts`: 138 sentence-level edits across 90 of the 105 paragraphs (35 answers; the audit says 36, the file has 35). No slug, question, essay link, book link, Scripture reference, date, name or number changed. Word count went from 9,698 to 9,582.

`client/public/search-index.json` was rebuilt with `node scripts/build-search-index.mjs`, because it carries the answer text and its drift check failed after the edit. Nothing else was touched.

Of the audit's 101 findings, 98 were applied (about twenty in different words from the audit's, where its replacement added a second antithesis or a new claim) and 3 were skipped (below). The other edits are the sweep.

## Counts (answer text only, by regex)

| Pattern | Before | After |
|---|---|---|
| Em-dashes in the answers (plus 2 in code comments, also removed) | 54 | 0 |
| "honest" / "honestly" | 12 | 3 |
| Two-sentence "not X. It is Y." | 28 | 14 |
| "was never" / "were never" | 16 | 8 |
| Rulebook words (verdict, indictment, full strength, first/second/third-order, confessional, full due, strongest hand) | 21 | 0 |
| Fragment sentences ("Not a proof.", "Cannot.", "Yours and mine.") | 6 | 0 |
| Contractions | 3 | 88 |
| Answers whose last two sentences changed | | 28 of 35 |

The three "honest" left: Schellenberg's "honest seeker" (his argument), "honest questions" the church answered with slogans, and "the most honest prayer in the Gospels". The fourteen antitheses left are about one to an answer, each at the turn of its argument.

## Ten before and after

1. Bible. "The book is not asking to be trusted blindly. It is asking to be opened." became "All the book asks first is that you open it."
2. Money. "The number was never the point. It was only ever a mirror." became "The number only shows you what you already trust."
3. Anger at God. "The opposite of faith was never anger. It was the silence of walking away. You are still yelling at him. So was his Son." became "Anger isn't the opposite of faith. Walking away in silence is. You are still yelling at him, and so was his Son."
4. Done with church. "That is not a verdict on the coal. ... He comes with a body attached. That is not the fine print. That is the gift." became "I'm not blaming the coal. ... He comes with a body attached, and the body is part of the gift."
5. Political party. "Capture is not a partisan event. It is a human one — the standard wiring of every mind, mine included: we judge" became "Capture happens in every party because it happens in every mind, mine included. We judge"
6. Predestination. "This is a second-order question. ... it is not the confessional floor. You can close this page holding either answer and remain a brother, so I am going to hand you both at their strongest rather than pick your side for you." became "This question divides Calvinist and Arminian churches that preach the same gospel and confess the same creeds. You can close this page holding either answer and still be my brother or sister, so I'm going to lay out both and not pick for you."
7. Only way. "Refuse him if you must. But not for being arrogant. Refuse him for being too particular." became "Refuse him if you must, but refuse him for being too particular, not for being arrogant."
8. AI. "The functionalist case deserves to be stated at full strength before anyone answers it." became "Start with the functionalist case, because it's a serious one."
9. Natural evil. "None of that closes the fawn, and any answer that claims to has stopped being honest." became "None of that answers the fawn, and I'd distrust any answer that claims to."
10. Teenager. "The sentence is a door, not a verdict. What is being tested is not the case for the resurrection. It is you — whether your love..." became "Treat what they said as the start of a conversation. What's being tested isn't the case for the resurrection. It's you, and whether your love..."

## Skipped, and why

- HA-072 (Kenneth Kitchen): the replacement adds a description that is not in the answer ("a conservative Egyptologist") and drops the year 2003. Left as written.
- HA-075 (Nagel quotation): the audit changes the punctuation inside a quotation. A quotation is not edited without the source in hand. Listed for James.
- HA-010: applied in plainer words ("What remains is less a proof than a cry"); the audit's version added a claim.
- Closers the audit said were earned were left: "It would not stay closed", "I just don't think it can hold you", "The floor held anyway. It is worth asking who laid it", "The crutch was real. It was just in my other hand", "He entered it", and the slavery ending.
- Mark 9:24 lacks its exclamation point in two of its three uses, and Psalm 13, Psalm 22 and John 6:68 are quoted without quotation marks. Not changed: Scripture conventions are James's call.
- The atheist-past sentences were left where they stand, apart from one credential phrasing ("As a former atheist I can tell you" is now "When I was an atheist").
- The first anxiety answer ("a practical atheism") was not softened. That is a judgment about teaching, not wording.

## Two changes that are more than wording

- Faith and reason: "a desperate father with a dying child" is now "a desperate father with a suffering son". In Mark 9 the boy is tormented, not dying.
- Divorce: after "If you are in danger, get safe first and sort the theology after" the answer now says "The Find Help page on this site is a place to start." It is plain text; the page renders no link there.

## Waiting for James

1. Are these true as written: "I built an atheism at nineteen", "For most of my life I was an atheist", "They were right about the church I was leaving", "on a night when I was the thing that had broken", "I have watched the anger last into the tenth year", "You are describing my inbox"?
2. The atheist past appears in about twenty answers. Which eight or ten should keep it?
3. Political party answer: the right gets a date and a mechanism, the left gets a metaphor. One concrete sentence about the left is needed, in his words.
4. The two anxiety answers pull against each other. Should the first say it is about ordinary worry and point to the second?
5. Nagel: confirm the exact punctuation of "I don't want there to be a God..." against the book.
6. Sources for "Jesus spoke about money and possessions more than he spoke about heaven and hell combined" and Kepler's "thinking God's thoughts after him".
7. One Scripture convention for all answers (quotation marks, the Mark 9:24 exclamation point, when to write "ESV").
8. Whether the answers should be the short length of the first fifteen or the long length of the last twenty.

## Left for a later change

- A real Find Help link under the divorce and natural-evil answers (a change to `Answers.tsx`, outside this pass).
- `scripts/validate-no-emdash.mjs` still does not scan `client/src/data/answers.ts`. The file is clean now and can be added to the gate.

## Checks run

`validate-answers`, `validate-no-emdash`, `validate-grow-voice`, `validate-content-integrity`, `validate-topics`: clean. `build-search-index --check`: up to date after the rebuild. `build-catalogue --check`: passes. `pnpm check`: passes. `siteNav.test.tsx` (reads the answers): 22 passed. The full test suite and the build were not run.
