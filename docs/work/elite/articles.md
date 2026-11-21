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

Delete its line from `client/src/lib/shelf.json` and its file from `client/public/essays/`, then run `node scripts/build-essays-index.mjs`. (Changing `"live"` to `"pending"` is not enough while the file is there: a pending essay with a file is public.) The address then answers with the retired notice. Then run `pnpm exec tsx scripts/build-passage-index.mjs` (the chapter pages' "Go deeper" lists name the essay) and lower the counts in `client/src/lib/shelf.test.ts` by one. No other page links to any of the five by hand.

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

## Gates (2026-11-21, after merging the target branch)

In the order run: `pnpm check` passed. The 46 commands of the CI content-gates step: 45 passed on the first run and the passage-index drift check failed, because the new essays cite chapters; the index was rebuilt (54 chapter files) and the check passed. `pnpm test`: first run 5 failures, all in the two tests that hold the shelf's shape (65 essays, 15 live, the family section empty); the counts were updated to 70 and 20 and the empty-section case moved to the American Church section, and the suite then passed (1,938 tests). `pnpm check` again, `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` and `pnpm run audit:canonicals` passed (0 canonical failures; the prerender wrote all five essays from the shelf).

On the served build (`scripts/serve-like-vercel.mjs`, port 4655) at 390 and 1440: each essay's page shows its title as the H1 and its last paragraph, with no sideways scroll; all five are listed on /writing and found by /search; the only failed requests were the local server's missing `/_vercel` scripts and `/api/track`. Night could not be checked: the site's dark mode is switched off for every visitor (the note in `client/src/App.tsx` beside `ThemeProvider`), so the second pass rendered the same light page. Screenshots are in `/home/user/elite-shots/articles/`.

The "Marriage, Family and Ordinary Faithfulness" section now shows on /writing for the first time, with one essay in it.

---

# Five more essays for the shelf (2026-11-21)

James, 2026-11-20 and 21: "I want you to continue, especially the articles. I want them to be a lot more controversial and dealing with very difficult issues in a very balanced, intellectual, academic, historical, biblical way that is very easy to understand, easy to read, normal, common language that is semi-professional, that's in my tone style that you've been writing like." "keep going and publish when ready."

## What was written

| Essay | Address | Shelf section |
|---|---|---|
| What the Church Got Wrong About Race, and What Scripture Said All Along | /writing/what-the-church-got-wrong-about-race | The American Church: History and Reckoning |
| Why Does God Let Children Suffer? | /writing/why-does-god-let-children-suffer | Doubt and Hard Questions |
| Divorce, Remarriage and the Church | /writing/divorce-remarriage-and-the-church | Marriage, Family and Ordinary Faithfulness |
| Can a Nation Be Christian? | /writing/can-a-nation-be-christian | Faith and Power |
| Babies or Believers? Why Christians Baptize Differently | /writing/babies-or-believers-why-christians-baptize-differently | Reading the Bible in Its World |

They were landed the way the first five were: a file in `client/public/essays/`, a `"live"` line in `client/src/lib/shelf.json`, a filing line in `client/src/lib/pillar-assignments.ts`, the essays index and the passage index rebuilt. No database row. Taking one down is the same four steps as before, with the counts in `client/src/lib/shelf.test.ts` lowered by one.

**The fourth essay is not the one asked for by name.** "Was America Founded as a Christian Nation?" has been public on the shelf since 2026-11-17 under that exact title. A second essay with the same name would have duplicated it, so this run wrote its companion, "Can a Nation Be Christian?", which takes the parts of the brief the earlier essay treats briefly or not at all (the claim in its defenders' best form, the Puritan covenant idea and the election sermons, Roger Williams and the Baptist dissenters in their own printed words, slavery and the treatment of native peoples as the test, what Scripture means by a holy nation) and links to the earlier essay for the founding documents. The ledger says the same at the head of its section 9.

**Every shelf section now shows on /writing.** The race essay is the first public essay in "The American Church: History and Reckoning", which was the last hidden section. The two tests that hold the shelf's shape used that section as their example of an empty one; they now count 75 essays and 25 live, list all eight sections, and check that an old `?track=prophetic-justice` link lands on the section. The page's "Nothing on this part of the shelf yet." line is still in the code and no longer has a real case to show it.

Rules kept in all five: no memory, anecdote, conversation, feeling or first-person experience is given to James (there is no "I" outside quoted text); no church body is named or implied as his (in the baptism essay nothing says which practice his church keeps); on each second-order question the positions are set out and none is stated as his; the confessional floor is stated as confession; no party, candidate, modern law, court case or movement slogan is named; a crisis-adjacent passage keeps a path to help and reuses an existing care line whole. Older shelf essays do speak in the first person and name his tradition ("I pastor a Baptist church" in `why-didnt-the-bible-ban-slavery`; "Baptists, my own tradition" in `why-does-god-allow-suffering`); those were not touched.

## The Revision Pass (CLAUDE.md), one line per pass

**what-the-church-got-wrong-about-race.** Structure: opens on three readers who each hear the word differently and grants each what is true; reaches back past the 1840s to 1667, when baptism was ruled not to free a slave; gives the proslavery reading in its author's own words before taking Genesis 9 apart; two accounts of repair, each with its texts and its fear of the other; ends on the crowd of Revelation 7:9 and an open question. Rhythm: one sharp antithesis recast ("Its sharpest disappointment is kept for"); the short paragraph on the Black churches left as the one hard hinge of its movement. Words: forbidden list clean by literal search; Allen's walkout trimmed to what the site's history course says; the letter from Birmingham described and not quoted; "most of the white church" softened to "a great many white churches"; every quotation re-read against its source.

**why-does-god-let-children-suffer.** Structure: opens in three places and not on any particular child; the care paragraph stands before any argument; Ivan's speech is given first and at its strength, and the believing brother is shown conceding the premise; five answers, each with the place it stops; what the Bible does not say comes before what it does; the limit of the Gospel raisings is stated; the church's own guilt toward children; the care lines again before the close; ends on a question Scripture leaves open. Rhythm: four "is not X. It is Y." pairs merged into single sentences, the architect line kept as the one verdict. Words: the gate caught "verdict" (rulebook leakage), changed to "ruling"; Matthew 18:14 cut as out of context; "a boy of three" corrected to "not yet three"; nothing is said about any child's fate.

**divorce-remarriage-and-the-church.** Structure: opens on four people in one row and the skeptic's fair charge of inconsistency; safety lines before the argument; Deuteronomy and the two schools before Jesus, so that his answer is heard against Hillel's question; Catholic, Orthodox and Protestant readings each in its holders' terms, then what each fears; Basil's sentence about the beaten wife quoted so that it can be refused; the church's guilt in both directions; ends on God as the husband who was left. Rhythm: two antitheses merged; the abuse section keeps its one hard line ("Whether it is her sin to leave is not"). Words: "blessed" removed though used as a verb, so the literal search is clean; "deacon board" changed to "leadership" so no church order is implied; "headship" replaced with plain words; a sentence of advice to remarried readers cut.

**can-a-nation-be-christian.** Structure: opens on the argument at the table and names the question under it, with three meanings of the phrase; the claim in the form its holders give it, from Winthrop through two election sermons, with their texts; the Christian dissenters in their own printed words; the test of fruits applied by Christians of the time (Hopkins, Jones and Allen, Douglass), the defenders' reply granted, then Amos 3:2; what Scripture calls a holy nation; ends on the hill as the church's and not the country's. Rhythm: "a stricter Calvinist than the men who banished him" (an overclaim and a flourish) replaced. Words: Washington's Newport letter cut because only quotation lists could be opened; John 18:36 quoted only in its first sentence; the Gnadenhutten count given as "some ninety" and flagged.

**babies-or-believers-why-christians-baptize-differently.** Structure: opens on four people and shows how narrow the disputed ground is before the dispute; the texts with both readings beside each; the first four centuries, where each side finds itself; Zurich and the drownings as the church's guilt; the two cases at equal length, each with texts, a governing conviction and one confession; what each fears, in the reverse order; ends on Ephesians 4:5, which neither side can read comfortably. Rhythm: the two announcing sentences ("In its best form, in the words its own teachers use") replaced with plain ones. Words: "seventeen centuries" corrected to "eighteen"; details of Manz's death not on the site removed; the closing text changed so that no dash stands in it and neither side's favorite verse closes the essay.

Final read as the skeptic, all five: each grants the strongest objection in its first movement, names the church's guilt in plain sentences with "we", and ends without asking for a decision. The second essay does not answer its title and says so.

## Topics for a next run

- "Is the Bible Reliable Enough to Build a Life On?" (the brief's reserve topic; the shelf already holds `why-trust-the-bible`, so it would need a distinct angle, such as the text's transmission and what a changed life can and cannot prove).
- "What Happens to People Who Never Hear the Gospel?" (a live Honest Answer exists to agree with).
- "Is Christianity Good for Women?" (history both ways; pairs with `should-women-preach`).
- "Should Christians Ever Go to War?" (just war and Christian pacifism, each at strength; the first three centuries, Augustine, the Anabaptists).
- "What Does the Bible Say About Sexuality, and Why Do Churches Now Disagree?" (the hardest of the list to do to this standard; it would need James's own decision on scope first).
- "Can a Christian Lose Their Salvation?" and "Speaking in Tongues: Gift, Past or Present?" (second-order questions with a long documented history).

## Questions for James

1. The fourth essay: is the companion what you wanted, or do you want the existing "Was America Founded as a Christian Nation?" rewritten instead? If rewritten, should its first-person lines ("Preachers, and I'm one of them") stay?
2. Race: the essay sets two accounts of what repair requires side by side and does not choose. Do you want your own view stated? And the shelf still holds two pending slots beside it (`where-church-was-silent-history-injustice-reckoning`, `black-church-prophetic-justice`): drop them, or write them as companions?
3. Divorce: the essay does not say which grounds you hold or what you would tell a remarried reader. If you want either said, it should be in your words.
4. Baptism: the essay takes no side and gives no hint of your church's practice. Older pages on the site do say it. Is the essay's silence what you want here?
5. Children's suffering: the essay says nothing about what becomes of children who die. Many parents will come to it with exactly that question. If you want it addressed, it needs your own pastoral judgment.
6. The ledger's "check first" rows (this machine could reach only GitHub): the 1667 Virginia law on baptism and slavery; the death of Dostoevsky's son in 1878; the Orthodox account of second marriages; the Gnadenhutten killings of 1782 and the Cherokee removal of 1838. Each is standard history, and none was read in a source this run.
