# w-history-essays: voice pass on the 22 church history essays

Branch `elite/w-history-essays`, from `b2e655e6`. Not pushed.
Files touched: `client/public/history/essays/*.json` (20 of the 22 files; section bodies and key-figure notes only). No title, subtitle, kicker, id, slug, date range or source entry was changed. `the-desert-and-the-rule.json` and `the-church-that-outlived-rome.json` changed in the audit pass too; the two untouched by the later sweep are those.

## What changed

448 edits in two passes.

1. **The audit's fixes: 392 of 420 applied.** Every quoted passage was found exactly once in its field. I judged each replacement against `docs/VOICE-JAMES-BELL.md` and applied the audit's wording except in two places where I wrote my own (below).
   - 25 findings were not applied because they sit in subtitles (9), section titles (11) and kickers (5), which belong to another unit.
   - 3 findings were skipped on purpose (after-christendom-era, the Jenkins, Kreider and Haidt sentences): the replacement removed the year of publication, and every date stays.
   - Two replacements are mine. the-american-experiment: "I am a revivalist Baptist by blood; I was raised counting decisions, and I have stood at the front and counted them myself..." became "I'm a Baptist pastor, and I know the temptation to preach for the response the count requires." (the audit's "I pastor in this tradition" claimed more than the confirmed facts). the-long-middle: the audit's replacement for the steelman sentence still said "at full strength", so it reads "Stating the other side's best case before answering it is a medieval invention."
2. **The sweep: 56 more edits** for the same tells where the audit had not reached: leftover stage directions ("Notice who these people were", "Begin with what...", "Set the two pictures side by side", "Read that as the assignment", "For now, stand a moment...", "Before you turn to it, sit for a moment..."), announced moves ("And here is what...", "it is worth remembering", "it must be said", "the next sections belong to the breaking"), "this library" in the prose, the accounting motif where it was a third or fourth use, clusters of "It was not X. It was Y." inside one short essay, fragment stacks ("Tears prove nothing. Trembling proves nothing."), "the reader" for "you", a credential stamp ("I say this with a pastor's unease and a historian's confidence"), and nine contractions in the four flat essays.

The history index was rebuilt with `node scripts/build-history-index.mjs`. It reads subtitles, not bodies, so the output is byte-identical and there is no drift.

## Counts, before and after

Counted by regular expression over section bodies and key-figure notes only (so the four subtitle dashes and the date-range dashes are not in these numbers).

| Pattern | Before | After |
|---|---|---|
| Em-dashes | 192 | 0 |
| En-dashes | 5 | 0 |
| honest / honesty / honestly | 52 | 19 |
| fair / fairly / fairness | 24 | 7 |
| steelman | 5 | 0 |
| verdict | 14 | 6 (all literal: a jury, a court, Niebuhr's judgment) |
| indict- | 7 | 1 (Douglass indicting the churches) |
| platform | 18 | 6 (all a physical stage) |
| "this essay" / "this library" | 27 | 10 (plain signposts) |
| "the writer" for James | 4 | 0 |
| "at full strength" | 5 | 1 (describing Aquinas's method) |
| ledger / invoice / receipt / audit / bill | 27 | 12 (two are men named Bill) |
| Imperative stage directions | 60 | 7 |
| "Here is..." / "Now the..." / "And then the..." | 17 | 0 |
| "It was not X. It was Y." sentence pairs | 56 | 40 |
| Sentences of three words or fewer | 75 | 42 |
| Contractions | 1 | 27 |
| Forbidden-list words | 2 | 1 ("The Navigators", an organization's name) |
| Narrator calling him "Bell" | 0 | 0 |

Still in the folder and not mine to change: 4 em-dashes in subtitles and 5 en-dashes in date ranges and source lines.

## Ten before and after examples

1. the-long-middle. Before: "Steelman the crusaders, because honesty requires it: most believed they were defending pilgrims..." After: "Most crusaders believed they were defending pilgrims..."
2. apostolic-and-persecuted. Before: "They built for weight. We build for weekends. The difference is the whole assignment." After: "They built churches that could carry weight, and we have mostly built for the weekend."
3. the-attractional-era. Before: "Let the weight of that land. The most studied church..." After: "The most studied church..."
4. after-christendom-era. Before: "This platform calls it what the older tradition would call it: not conservatism, not patriotism, but idolatry, the cross conscripted into a flag." After: "The older tradition would not call it conservatism or patriotism. It would call it idolatry, the cross conscripted into a flag."
5. reformation-and-its-wars. Before: "Here the writer stops narrating and confesses, because his own tradition sits in this dock twice." After: "My own tradition sits in this dock twice."
6. councils-and-creeds. Before: "The creeds were the era's gift. The empire was its test. The gift is still on the table, said aloud each week by a billion tongues. The test is still being taken — by us." After: "The creeds were the era's gift and the empire was its test. The gift is still said aloud each week by a billion tongues, and we are still taking the test."
7. the-american-experiment. Before: "My convention, the largest Protestant denomination in America, was organized so that a man could hold human beings in bondage and carry the gospel at the same time, and the founders saw no contradiction, and they were our founders." After: "The largest Protestant denomination in America was organized so that a man could hold human beings in bondage and carry the gospel at the same time, and the founders saw no contradiction."
8. awakenings-and-enlightenment (sweep). Before: "Tears prove nothing. Trembling proves nothing. Visions, transports, fluent testimonies, bodily effects, the loudest assurance in the room: nothing." After: "Tears prove nothing, and neither does trembling. Neither do visions, transports, fluent testimonies, bodily effects, or the loudest assurance in the room."
9. the-east-west-schism (sweep). Before: "This is not a story with a hero and a villain. It is a story of two faithful traditions that loved the same Lord..." After: "There is no hero and no villain in this story, only two faithful traditions that loved the same Lord..."
10. the-awakenings (sweep). Before: "Revival had not made his people kind. That fact deserves a long pause." After: "Revival had not made his people kind."

## One addition

after-christendom-era, the section on abuse ("Trust, Audited"), had no path to help. It now ends: "If this history is your own, abuse by a church leader should be reported to the authorities, and the Find Help page on this site (/help) is a place to start." The body renders as plain text, so the page is named, not linked. James should approve the wording.

## Skipped, and why

- 25 audit findings in subtitles, section titles and kickers: another unit owns them. They include three kickers that read "The Verdict", two that read "The Ledger", "The Crusades, Honestly", "The Honest Ledger", and four subtitles with em-dashes.
- 3 audit findings that removed a publication year.
- "The Navigators": the first mention is the organization's name and stays. The second mention now reads "Trotman's organization".
- About 40 "It was not X. It was Y." pairs remain. I thinned the clusters and left the ones that carry a real turn in the argument (roughly one per 1,300 words).
- "what you win them with is what you win them to" still appears in two essays, and the accounting image survives once in most essays. Removing the rest would mean rewriting paragraphs.
- I did not read all 52,000 words line by line. The four dash-heavy essays were read in full after editing; the other eighteen were swept by pattern search with each hit read in its paragraph.

## Gates run in this worktree

- All 22 files parse as JSON; every raw edit was checked against the parsed value.
- `node scripts/validate-theology.mjs` (the validator that covers history essays): clean.
- `node scripts/build-history-index.mjs`: index unchanged, no drift.
- `node scripts/validate-no-emdash.mjs`: clean. `node scripts/validate-grow-voice.mjs`: clean. `node scripts/validate-content-integrity.mjs`: clean. `node scripts/verify-sources.mjs`: clean.
- The dash and voice gates do not scan `client/public/history/essays/`, so their passing says nothing about this folder; the counts above are the evidence. Pointing those gates here will need an allowance for "The Navigators" and a decision on the subtitle and date-range dashes.
- No `.ts` or `.tsx` file was touched, so `pnpm check` was not run. No build was run.

## Waiting for James

1. Is his church part of the Southern Baptist Convention? the-american-experiment no longer says "my convention", "our founders", "my people" or "we repent". If it is true, those sentences are stronger with him in them.
2. First-person scenes moved to "we" or removed because nobody has confirmed them: learning "to read an attendance spreadsheet before I learned to sit with a dying man" (the-attractional-era); "I was formed by the unbundled world" (same); "I have preached sermons that were correct in every clause and cost me nothing" (awakenings-and-enlightenment); "I have shelves of them" about old hymnals and "I have stood at the front and counted them myself" (the-american-experiment); "I was raised counting decisions" (same, removed because it contradicts coming to faith as an adult).
3. First-person claims still in the text that need a yes or no: "I was one of the ones" who presented the faith as useful, "The church's first instinct, and I shared it, was to compete on the algorithm's terms", "the ache to be approved by the culture when my convictions embarrass me at dinner" and pastors who read Kreider, "I am one of them" (after-christendom-era); "critics of the seeker movement, of whom I have been one", "I learned it too. I have never fully unlearned it" and "Every working pastor of my generation was trained inside this era, and I was" (the-attractional-era); "The Baptist church I pastor is congregational, revivalist, and voluntary to the bone" and "I know the temptation to preach for the response the count requires" (the-american-experiment).
4. The wording of the new help sentence in after-christendom-era.
5. The endings of the-apostolic-age, the-great-councils, the-east-west-schism and the-reformation are accurate and have nobody in them. One true sentence of his in each would do more than editing can.
6. Whether he wants the stacked closing lines back. The audit and this pass followed the voice statement, which asks for one earned line per section.
7. Four numbers disagree between overlapping essays and were not changed: Augustine's thirteen or fifteen years on The City of God; Germany's losses in the Thirty Years' War (a third, a third in the hardest-hit territories, or a fifth); The Fundamentals in three million copies or hundreds of thousands; Nicaea contested for fifty or sixty years.
8. Quotations printed as verbatim that no one has checked against a source in this pass (Hearst, Christian Smith, Wesley's journal, Polycarp, the first of the Ninety-five Theses, the Rule, Lincoln, Youth for Christ, Warren, the Four Spiritual Laws).
9. Eight of the 22 essays cover ground twice; he may want one telling of each era.
