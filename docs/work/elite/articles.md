# Five new essays for the shelf (2026-11-20)

James, 2026-11-20: "I want you to continue, especially the articles. I want them to be a lot more controversial and dealing with very difficult issues in a very balanced, intellectual, academic, historical, biblical way that is very easy to understand." Earlier: "publish all of this when ready."

## What was written

| Essay | Address | Shelf section |
|---|---|---|
| Did God Choose Me, or Did I Choose God? | /writing/did-god-choose-me-or-did-i-choose-god | Doubt and Hard Questions |
| Should Women Preach? | /writing/should-women-preach | Reading the Bible in Its World |
| Why Jesus Won't Fit in Either Party | /writing/why-jesus-wont-fit-in-either-party | Faith and Power |
| Is Hell Real, and Is It Forever? | /writing/is-hell-real-and-is-it-forever | Doubt and Hard Questions |
| Can a Christian Be Rich? | /writing/can-a-christian-be-rich | Marriage, Family and Ordinary Faithfulness |

Each is a file in `client/public/essays/<slug>.json` with a `"live"` line in `client/src/lib/shelf.json` and a filing line in `client/src/lib/pillar-assignments.ts`. None has a database row; the essay page and /writing render the file on its own. Every claim and quotation is in `docs/work/elite/articles-ledger.md`, with where it was read.

Rules kept in all five: no memory, anecdote, conversation or first-person experience is given to James (there is no "I" outside quoted Scripture); no church body is named as his; on each second-order question the positions are set out and none is stated as his; the confessional floor is stated as confession; no candidate, party, platform, election or law is named.

## How to take one down

Delete its line from `client/src/lib/shelf.json` and its file from `client/public/essays/`, then run `node scripts/build-essays-index.mjs`. (Changing `"live"` to `"pending"` is not enough while the file is there: a pending essay with a file is public.) The address then answers with the retired notice. Two essays are linked from nowhere else; nothing else needs to change.

## The Revision Pass (CLAUDE.md), one line per pass

**did-god-choose-me-or-did-i-choose-god.** Structure: opens on three frightened readers, goes back to 411 and not to Calvin, states five traditions each in words its holders use, names the order of the question, ends on Romans 11:33 without resolving. Rhythm: cut from 3,255 to 2,990 words; the announced turns and one two-beat closer removed. Words: forbidden list and gate clean; hedges zero; "deserves to be heard the way he meant it" (rulebook leakage) removed; every quotation re-read against its source.

**should-women-preach.** Structure: opens on four people hurt from both directions, gives what Scripture shows women doing before the two restricting passages, each case in its own best form, then what each side fears, then the church's guilt and the care line; ends on Easter morning. Rhythm: the fears section recast in the plural so neither side is given a sex. Words: Chrysostom's sentence shortened to the clause without his exclamation points (the gate allows one only in quoted Scripture); "those of us in churches where men hold the authority" changed so no church practice is implied as James's; gate clean.

**why-jesus-wont-fit-in-either-party.** Structure: begins with the usual explanation and concedes what is true in it, draws the line between Christians in public life and Christ as a credential, reaches back to 312, measures both American captivities by the same four questions, says they are not mirror images, ends on Mark 15:27. Rhythm: one "Not X. Y." hinge per movement; the two captivity paragraphs built in parallel on purpose and nowhere else. Words: Niebuhr's sentence given as substance without quotation marks; three overclaims softened ("a generation", "emptied a great many pews", "only a few years of power"); gate clean.

**is-hell-real-and-is-it-forever.** Structure: opens at a funeral, a child's bedroom and the skeptic's objection; separates the confessed (judgment) from the disputed (nature and duration); three views each with its texts and its own difficulty, as the live Honest Answer has them; the church's two failures; the care passage whole. Rhythm: bold run-in labels replaced with plain sentences; "for most of history most people" softened. Words: no person's fate is spoken of; gate clean; hedges zero.

**can-a-christian-be-rich.** Structure: opens on three people with three slogans and then tells the reader he is probably the rich one; Jesus' hard sayings before the exceptions; stewardship and renunciation each at strength; the prosperity teaching's appeal stated before it is named an error; the opposite pride; ends on the look in Mark 10:21. Rhythm: one muddled sentence on 1 Timothy 6:10 rewritten. Words: "honest reading" changed to "full reading"; gate clean.

Final read as the skeptic, all five: each grants the strongest objection in its first section, names the church's own guilt in plain sentences, and ends without asking for a decision.

## The remaining list

Not written in this run, from James's list of 2026-11-20:

- "What the Church Got Wrong About Race, and What Scripture Said All Along" (the shelf already holds two pending slots near it: `where-church-was-silent-history-injustice-reckoning` and `black-church-prophetic-justice`).
- "Why Does God Let Children Suffer?" (the live essay `why-does-god-allow-suffering` and its Honest Answers are the ones to agree with).

## Questions for James

1. For each of the five, do you want your own position stated? None is stated now. On election, women preaching, and the nature and duration of hell the essays say that faithful Christians stand on more than one side and stop there.
2. The shelf has older pending slots on neighboring subjects: "Can Women Be Pastors?" (`women-and-leadership-church`) and "What's Wrong with the Prosperity Gospel?" (`prosperity-gospel-is-not-the-gospel`). Should those slots be dropped now that these essays exist, or rewritten as companions?
3. The ledger marks some dates and facts "not opened this run" (this machine could reach only GitHub). They are well-known ones, but a second reader with a library should check them, starting with the Catholic Church never having declared any individual to be in hell, and the 1607 end of the Roman hearings on grace.
4. Scripture wording was checked against a public GitHub copy of the ESV that carries no inner quotation marks. Your ESV API key would settle the punctuation.
