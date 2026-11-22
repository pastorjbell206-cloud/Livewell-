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

## Gates (2026-11-21, after merging the target branch)

In the order run, every one read by its own exit code: `pnpm check` passed. The 46 commands of the CI content-gates step all passed on the first run (the passage index had been rebuilt before the merge: 60 chapter files written). `pnpm test` passed (1,940 tests; 73 skipped as the suite marks them). `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` and `pnpm run audit:canonicals` passed (0 canonical failures; the prerender wrote each of the five essays with its own title).

On the served build (`scripts/serve-like-vercel.mjs`, port 4655) at 390 and 1440: each essay's page shows its title as the H1 and its last paragraph, with no sideways scroll; all five are listed on /writing and found by /search; the only failed requests were the local server's missing `/_vercel` scripts and `/api/track`. Night was not checked: the site's dark mode is switched off for every visitor. Screenshots are in `/home/user/elite-shots/articles/`.

Before the full run, the two tests that hold the shelf's shape were updated for the new counts (75 essays, 25 live, eight sections shown). On their first run one assertion failed: the page's empty-section message, which no track link reaches now that every section holds an essay. That test was rewritten to check that the old link lands on the section, and both files passed.

---

# Five more essays for the shelf, third run (2026-11-21)

James, 2026-11-20 and 21: "I want you to continue, especially the articles. I want them to be a lot more controversial and dealing with very difficult issues in a very balanced, intellectual, academic, historical, biblical way that is very easy to understand, easy to read, normal, common language that is semi-professional, that's in my tone style that you've been writing like." "keep going and publish when ready."

## What was written

| Essay | Address | Shelf section |
|---|---|---|
| Should Christians Ever Go to War? | /writing/should-christians-ever-go-to-war | Faith and Power |
| Can a Christian Lose Their Salvation? | /writing/can-a-christian-lose-their-salvation | Doubt and Hard Questions |
| Do the Gifts of the Spirit Still Happen? | /writing/do-the-gifts-of-the-spirit-still-happen | Reading the Bible in Its World |
| What Happens to People Who Never Hear the Gospel? | /writing/what-happens-to-people-who-never-hear-the-gospel | Doubt and Hard Questions |
| Is Christianity a White Man's Religion? | /writing/christianity-was-never-western | The Ancient Church |

Four were landed the way the first ten were: a file in `client/public/essays/`, a `"live"` line in `client/src/lib/shelf.json`, a filing line in `client/src/lib/pillar-assignments.ts`, the essays index and the passage index rebuilt. No database row.

**The fifth uses a slot the shelf already had.** "Is Christianity a White Man's Religion?" has been a pending line on the shelf, under the slug `christianity-was-never-western`, with no rewrite behind it. A second line with the same title would have duplicated it, so the essay was written into that slot: the file carries the old slug, the shelf line now reads "live", and a filing line was added (the slug had none). The address is therefore /writing/christianity-was-never-western. The shelf now holds 79 essays, 30 of them live and 49 pending; 55 are public. The counts in `client/src/lib/shelf.test.ts` say so.

To take one of the four down: delete its line from `shelf.json` and its file, run `node scripts/build-essays-index.mjs` and `pnpm exec tsx scripts/build-passage-index.mjs`, and lower the test's counts by one. To take the fifth down, delete its file and set its line back to "pending" (the line itself stays), rebuild the two indexes, and change the test's counts to one fewer live, one more pending and one fewer public.

Rules kept in all five: no memory, anecdote, conversation, feeling or first-person experience is given to James (there is no "I" outside quoted text); no church body is named or implied as his; on each second-order question the positions are set out and none is stated as his (none of the five touched the three positions he gave on 2026-11-21, and none is stated); the confessional floor is stated as confession; no present war, state, party, policy, movement or living person is named; each crisis-adjacent passage keeps a path to help and reuses an existing care line whole (the 988 line in the war essay; the Honest Answer's and the Hebrews note's lines in the salvation essay; the terminal-diagnosis wording in the gifts essay; the /questions page's grief line in the fourth). Every claim and quotation has a row in `docs/work/elite/articles-ledger.md` under "Third run".

## The Revision Pass (CLAUDE.md), one line per pass

**should-christians-ever-go-to-war.** Structure: opens on three people who hear the word differently and grants the skeptic's charge; the 988 line stands before the argument; Jesus and Paul first, with Romans 12 and 13 read as one passage; the first three centuries with what complicates them; Augustine and Aquinas as a restraint; Schleitheim in its own words; each side's hard question; the crusade as the corruption neither side owns, turned on "we"; ends in Gethsemane with the promise of Isaiah 2:4 unkept. Rhythm: cut from 3,348 words to 2,999; the two "In its own terms" paragraphs built alike on purpose and nowhere else. Words: forbidden list clean by literal search; a wrong order of Celsus and Origen corrected; "the first Gentile baptized" corrected (the Ethiopian comes first); three unsourced sentences cut (see the ledger). The centurion is quoted from Luke 7:9 and not Matthew 8:10, because two tests use Matthew 8 as their example of a chapter with no passage-index file and the essay should not be the reason they change.

**can-a-christian-lose-their-salvation.** Structure: opens on three frightened or grieving readers and the skeptic's "fine print"; the care lines before the argument; the promises and the warnings each read in place, then the places where one sentence holds both; the question's history from the lapsed of 250 through Augustine; four accounts each in its own confessional words; what each fears and what all agree on; the church's two failures; a section for the one who is afraid; ends on two sentences of Scripture that are not reconciled. Rhythm: one hedge ("perhaps two hundred times") removed. Words: "my own hold" changed so no first person stands outside a quotation; the Hebrews note's care sentence restored to its exact wording; a reference to "the tradition described above" removed.

**do-the-gifts-of-the-spirit-still-happen.** Structure: opens on three people hurt from three directions and the skeptic's either-or; the care wording before the argument; 1 Corinthians 12 to 14 read in order with chapter 13 as the hinge; the history told so that it hands the argument to no one (Irenaeus, Montanus, Chrysostom, Augustine both ways, Westminster, Azusa Street); three positions and a fourth, each with its fear and its hard question; the abuses and the opposite failure, both under "we"; ends on Paul's "Now I know in part". Rhythm: one hedge removed. Words: "its own best pastors" softened; the prosperity sentence tied to the site's history course; Justin's sentence on prophecy cut because of where it stands.

**what-happens-to-people-who-never-hear-the-gospel.** Structure: opens on a granddaughter, a missionary and a fifteen-year-old, and the charge about geography; the grief line before the argument; the question shown to be as old as Justin; the texts read closely, with Acts 17:26 to 27 set against the charge; the four answers in outline with the site's page linked for the rest; the hunter's question and what it does to the mission; Carey in his own words, including the painful ones; a word to the missionary with no pressure to hurry; the mirror turned on the reader who has heard; ends with the question open. Rhythm: the Jonah quotation recast so its question mark is not moved. Words: the gate's word "verdict" changed to "judgment"; a misquotation of John 14:5 caught by the script and corrected; "the court that had condemned Jesus" changed to "the council in Jerusalem".

**christianity-was-never-western.** Structure: opens on a grandson, a picture and a history student; the charge given a section to itself and its facts granted; the New Testament's own map; the first thousand years, with Aksum from Socrates and Athanasius; a caution against drafting Augustine into a modern race; how the faith came to look white, under "we"; who carried it, in Douglass's words; the church's first ruling (Acts 15) as the standard the missionaries broke; ends with the picture coming down and the northern peoples placed among the nations sent for late. Rhythm: one "perhaps" removed. Words: "blessed the theft" changed (the literal search is clean); "Europe appears once" corrected for Crete; a line that would have given the author an ancestry removed.

Final read as the skeptic, all five: each grants the strongest objection in its first movement, names the church's guilt in plain sentences with "we", says what history or argument cannot show, and ends without asking for a decision. The fourth does not answer its title and says so.

## Topics for a next run

- "Can I Trust My Feelings About God?" (this run's reserve; not needed).
- "Is Christianity Good for Women?" (history both ways; pairs with `should-women-preach`).
- "What Does the Bible Say About Sexuality, and Why Do Churches Now Disagree?" (James gave his position on 2026-11-21; it still needs his decision on scope and his own words).
- "When Does Life Begin, and What Do Christians Owe the Unborn and Their Mothers?" (his position is given; the history from the Didache on is in sources this machine can open).
- "Is the Bible Reliable Enough to Build a Life On?" (a distinct angle from `why-trust-the-bible`).
- "What Is the Lord's Supper?" (memorial, spiritual presence, real presence; the companion to the baptism essay).
- "Does Prayer Change Anything?" and "Why Are There So Many Denominations?"

## Questions for James

1. The fifth essay took the shelf's existing slot, so its address is /writing/christianity-was-never-western. Is that the address you want, or should it have a new one that matches its title (the old one would then be dropped from the shelf)?
2. War: the essay sets just war and Christian pacifism side by side and does not choose. Do you want your own view stated? It also honors the conscientious objector and the chaplain together and names no war.
3. Salvation: the essay does not say which account you hold. The Honest Answer on the site does not either. Is that what you want?
4. Gifts: the essay takes no side among cessationist, continuationist and Pentecostal readings, and nothing in it says what your church practices. If you want that said, it should be in your words.
5. Those who never heard: the essay keeps the page's four answers and takes no side. It says the missionary's sleeplessness "was never yours to carry". Please read that paragraph as a pastor: is it the comfort you would give?
6. The fifth essay uses "we" for the churches of Europe and America that pictured Christ as one of themselves. It says nothing about your own background. Is that "we" yours to say?
7. The ledger's "check first" rows (this machine could reach only GitHub): Warfield's 1918 argument, the Lutheran placing of assurance, and the seventh-century loss of the eastern and African churches. Each is standard and none was read in a source this run.

## Gates, third run (2026-11-21), as its logs record them

The third run's section above was committed without a gate record, and its ledger holds none. This is what the logs it left in the scratch folder (`/home/user/articles-scratch/`, written between 02:54 and 03:27 on 2026-11-21) show, set down by the fourth run and not re-run: `pnpm check` ended with no error (`check.log`). The CI content-gates commands ran one at a time and the log ends "TOTAL 46 commands, 0 failed" (`ci-all.log`). `pnpm test`: 1,970 passed, 73 skipped (`test.log`). `pnpm build` finished (`build.log`). The sitemap was written from the static fallback, with no database (`sitemap.log`). The prerender wrote 3,186 route files, 36 of them essays from the shelf (`prerender.log`). The canonical audit ended "failures 0" (`audit.log`). The served-build check at 02:55 ended "FAILS 0", its only console errors the local server's 404s (`shots.log`). What the logs do not show is which commit each ran on, so this record is the logs' and no more.

---

# Five more essays for the shelf, fourth run (2026-11-21)

James, 2026-11-20 and 21: "I want you to continue, especially the articles. I want them to be a lot more controversial and dealing with very difficult issues in a very balanced, intellectual, academic, historical, biblical way that is very easy to understand, easy to read, normal, common language that is semi-professional, that's in my tone style that you've been writing like." "keep going and publish when ready."

## What was written

| Essay | Address | Shelf section | Words |
|---|---|---|---|
| Is Christianity Good for Women? | /writing/is-christianity-good-for-women | Doubt and Hard Questions | 2,990 |
| What Is the Lord's Supper? | /writing/what-is-the-lords-supper | Reading the Bible in Its World | 2,993 |
| Is the Bible Reliable Enough to Build a Life On? | /writing/is-the-bible-reliable-enough-to-build-a-life-on | Doubt and Hard Questions | 2,993 |
| Does Prayer Change Anything? | /writing/does-prayer-change-anything | Doubt and Hard Questions | 2,755 |
| Why Are There So Many Denominations? | /writing/why-are-there-so-many-denominations | The Ancient Church | 2,737 |

All five were landed the way the first fourteen were: a file in `client/public/essays/`, a `"live"` line in `client/src/lib/shelf.json`, a filing line in `client/src/lib/pillar-assignments.ts`, the essays index and the passage index rebuilt. No database row. One commit each, with its ledger rows, and one more for the shelf test and the passage index.

**No pending slot was used.** The shelf holds pending lines near three of the five ("Can Women Be Pastors?", "Can You Trust the Bible?", "Who Decided What Books Are in the Bible?"), and none has a matching title, so each essay has a new line. The two Bible essays behind those pending lines are already public and the new essay links both.

The shelf now holds 84 essays, 35 of them live and 49 pending; 60 are public. The counts in `client/src/lib/shelf.test.ts` say so. To take one of the five down: delete its line from `shelf.json` and its file, run `node scripts/build-essays-index.mjs` and `pnpm exec tsx scripts/build-passage-index.mjs`, and lower the test's counts by one.

Rules kept in all five: second-person and third-person teaching voice, with no "I" outside quoted text; no memory, feeling, habit, conversation or biography is given to James; no church body is named or implied as his (the denominations essay names the Methodists and the Baptists once, together, as the course's history of 1844 and 1845, and the Supper essay quotes a Baptist confession without naming the body); no position is stated as his. The women essay links the live /questions page that states his position on church office and neither restates nor alters it. No present war, state, party, policy, movement or living person is named (the site's own pages on the Bible's text name living scholars; the essay that draws on them names none). Care lines are reused whole from existing pages: the /questions page's line and the Study Bible's lines on abuse in the women essay, with Find Help named three times and linked; the terminal-diagnosis wording and the James note's lines in the prayer essay. No study of prayer is mentioned, because none could be opened. Matthew 8 is not cited anywhere. Every claim and quotation has a row in `docs/work/elite/articles-ledger.md` under "Fourth run".

## The Revision Pass (CLAUDE.md), one line per pass

**is-christianity-good-for-women.** Structure: opens on four women who have each seen something true; the care line stands before the argument; the charge is given a section of its own in Stanton's words, with the Old Testament laws and the three teachers; what is granted comes before any defense, and the Deuteronomy law is explained and still called difficult; the world the faith entered (one letter, one sneer); Jesus, with a caution against setting him against Judaism; the first churches; the loss told under "we"; the two readings on office in the notes' own words, with the page that states the author's view linked and left alone; a section for the reader harmed in a church; ends on a question Jesus put to a religious man. Rhythm: cut from 3,039 words to 2,990. Words: forbidden list clean by literal search; two unsourced superlatives, one unchecked claim about the Old Testament and one about exposed girls removed; Aquinas's sentence opened in the Summa this run.

**what-is-the-lords-supper.** Structure: opens on four people at four tables and grants the skeptic that the meal of unity is where Christians part; the texts every tradition reads; the first writers, who hand the argument to no one; five answers at like length, each in its own confession's words with its governing conviction; one hard question for each; Marburg; who may come, with each line's reason and a word to the person asked to stay in the pew; the church's failures under "we"; ends on the cup Christ has not yet drunk. Rhythm: the list of five is built alike on purpose and nowhere else. Words: "sit with" changed to "reckon with" twice; a sentence that the reformers parted without sharing the bread cut as unsourced; "for a thousand years" narrowed; no side taken and nothing said of any church's practice as the author's.

**is-the-bible-reliable-enough-to-build-a-life-on.** Structure: opens on a student, her uncle and a woman in a hospital corridor, and divides the question in two; the case against in four parts with Celsus and Paine in their own words; nearly all of it granted; then what each kind of evidence can show and what it cannot (manuscripts, dates, the canon, archaeology), each limit stated as the site's pages state it; a section on the step evidence cannot take; how Christians have said assurance comes; the two accounts of Scripture's truthfulness, each with its fear; the overselling told under "we"; ends with the two builders and the book still open. Rhythm: cut from 3,035 words to 2,993. Words: "a claim that can't be shrunk into a legend" removed as an overclaim; every figure is the site's; no living scholar named.

**does-prayer-change-anything.** Structure: opens on a mother, a man, a child and a skeptic, and promises the mother no explanation; the care wording before the argument; the case against, with the old dilemma in Aquinas's own objection; what is granted, with the Bible's own record of refused prayers; the promises in their setting, and the admission that this cannot be run as an experiment; the stories in which asking changes things; three ways the traditions hold sovereignty and asking together, each with its hard question; Gethsemane as the refused prayer, used to establish one narrow thing and expressly not as a reason; the harm done to the sick and the false choice between prayer and medicine, under "we"; ends with Psalm 88 kept as Scripture and the mother still without a why. Rhythm: one passage added on Paul's answer and on the person with no words left. Words: Luke 22:44 replaced with Mark 14:35 because the site calls its text disputed; two sayings taken out of quotation marks; an invented number removed.

**why-are-there-so-many-denominations.** Structure: opens on a road with six signs and gives the skeptic Jesus' own sentence to use; shows the trouble inside the New Testament before any Protestant; three great breaks with their dates (451, 1054 and 1204, 1517 and 1521), each side in its own terms; the West's own schism of rival popes; why Protestants kept dividing and what the peace of 1555 and the war of 1618 to 1648 did; what a denomination is, as what Christians learned to do when they stopped killing one another, with its gains and costs; four kinds of division, so that the people pulled from their knees in Philadelphia are not blamed for leaving; what is still held in common; ends on the prayer of John 17 as not yet answered. Rhythm: first draft 2,449 words; four passages of substance added (the rival popes, three accounts of what unity is, the Bible-alone movements, Romans 14) to reach 2,737. Words: "a quarrel from 1845" removed from the opening because it pointed at one body; three overstatements softened.

Final read as the skeptic, all five: each gives the strongest objection its own section near the top and grants most of it, names the church's guilt in plain sentences with "we", says what evidence or argument cannot show, and ends without asking for a decision. The prayer essay does not answer the mother, and says so twice.

## Topics for a next run

- "Can I Trust My Feelings About God?" (the third run's reserve; still unwritten).
- "What Does the Bible Say About Sexuality, and Why Do Churches Now Disagree?" and "When Does Life Begin, and What Do Christians Owe the Unborn and Their Mothers?" (James has given his position on each; both still need his decision on scope and his own words).
- "Who Runs the Church? Bishops, Elders and Congregations" (the third of the second-order questions the denominations essay names, after baptism and the Supper).
- "Is the Old Testament God the Same God?" and "What Is the Gospel, in One Page?" (a live /questions page exists for the first).
- "Mary, the Saints and Prayer to the Dead: What Divides Catholic, Orthodox and Protestant" (the confessions are in the sources this machine can open).

## Questions for James

1. Women: the essay links the page that states your view on church office and says nothing more. Do you want your view stated in the essay itself? And the section "If a Church Is Where It Happened" tells a reader hurt by a man quoting Scripture that she "was not hearing the Bible". Please read that section as a pastor.
2. The Supper: the essay takes no side among the five views and says nothing about who your church admits to the table. The site's longer study of the sacraments does speak in the first person about the Supper. Should the essay link that study, or stay silent as it does?
3. The Bible: the essay says plainly that a reliable text is not proof the message is true, and that on the census in Luke the question is open. It sets the inerrancy statement of 1978 beside the "trustworthy for faith and practice" account and does not choose. Is that where you want it left?
4. Prayer: it leaves out every scientific study of prayer, because none could be opened and checked here. If you want them discussed, they need a reader with a library. It also tells the mother whose son died that nothing in Scripture tells her why. Is that the word you would give her?
5. Denominations: it names the Methodists and the Baptists once, as the bodies that divided over slavery in 1844 and 1845, and says nothing of which church is yours. It calls separate churches over baptism or church government possibly "the least bad arrangement available". Would you say that?
6. The ledger's "check first" rows (this machine could reach only GitHub): the Orthodox attitude to defining the change in the bread and wine; whether the Supper was among the charges on which Reformation Christians were condemned; the confession of the churches that did not receive Chalcedon; the Wesleyan and Arminian account of prayer; the narrowing of women's place after the first centuries. Each is standard and none was read in a source this run.

## Gates (2026-11-21, after merging the target branch)

Before the merge, after each essay: the seven light gates (`validate-essays`, `validate-content-integrity`, `validate-grow-voice`, `validate-no-emdash`, `validate-politics`, `validate-links`, `build-essays-index --check`), every one exit 0 on its first run for all five. Before the merge, once: the shelf test and the site-structure test together (44 tests passed, after the counts were raised to 84 essays, 35 live and 60 public), and the passage index rebuilt (702 chapter files, 55 written, two of them new: Deuteronomy 22 and Judges 19; Matthew 8 still has none).

Then the target branch was fetched and merged (it had moved: 27 files, the giving work, none of them an essay, the shelf, the filing lines or an index). On the merged tree, in the order run, every command read by its own exit code and none through a pipe:

1. The 46 commands of the CI content-gates step, one at a time: 46 exit 0, none failed. One sentence in the prayer essay was corrected while this ran, so the ten commands that read essays (`validate-scripture`, `validate-no-emdash`, `validate-essays`, `validate-content-integrity`, `validate-politics`, `validate-links`, `validate-grow-voice`, and the `--check` runs of the essays, search and passage indexes) were run again on the final tree: all exit 0.
2. `pnpm check`: exit 0.
3. `pnpm test`: exit 0 (170 test files passed, 7 skipped; 2,022 tests passed, 73 skipped as the suite marks them).
4. `pnpm build`: exit 0.
5. `pnpm run sitemap` (static fallback, no database), `pnpm run prerender` (3,193 route files; 41 essays written from the shelf, each of the five with its own title) and `pnpm run audit:canonicals` (2,496 pages checked, 0 not prerendered, 0 failures): each exit 0.
6. The served build (`scripts/serve-like-vercel.mjs`, port 4655) at 390 and 1440: each essay's page shows its title as the H1 and its last paragraph, with no sideways scroll; all five are listed on /writing and found by /search; 30 checks, 0 failed. The only console errors were the local server's missing `/_vercel` scripts and `/api/track`. The first attempt of this step failed and is recorded here: the third run's server was still listening on port 4655 from 02:54 and served the old page list, so /writing and /search did not show the new essays. That server (this worktree's own, PID 13331) was stopped, a fresh one started, and the step run again. Night was not checked: the site's dark mode is switched off for every visitor. Six screenshots were read (the women essay and the denominations essay at 390, the Supper essay at 1440, the Bible essay mid-page at 390, the prayer essay mid-page at 1440, and the search page at 1440). They are in `/home/user/elite-shots/articles/`. The server was stopped by its PID and `dist/` deleted.

`uptime` was run before each heavy command, and a command waited whenever the one-minute load stood at 6.00 or above.

**Second gate run, after the push was rejected.** The first push was refused because the target branch had moved again (34 files, among them two new content-gate commands for the reading tracks in `ci.yml`; no essay, shelf line, filing line or index of this run). The branch was fetched and merged and everything was run again on the new tree, in the same order: the content-gates step, now 48 commands, 48 exit 0; `pnpm check` exit 0; `pnpm test` exit 0 (173 test files passed, 7 skipped; 2,078 tests passed, 73 skipped); `pnpm build` exit 0; `pnpm run sitemap`, `pnpm run prerender` (3,207 route files, 41 essays from the shelf) and `pnpm run audit:canonicals` (2,510 pages checked, 0 failures) each exit 0; the served build at 390 and 1440, 30 checks, 0 failed, one more screenshot read (the prayer essay at 390). The server was stopped by its PID and `dist/` deleted. In this second run `uptime` was read before each command, but for the sitemap, the prerender, the audit and the served check it was read at the end of the command before and not as a command of its own.

---

# Five more essays for the shelf, fifth run (2026-11-22)

James, 2026-11-20 and 21: "I want you to continue, especially the articles. I want them to be a lot more controversial and dealing with very difficult issues in a very balanced, intellectual, academic, historical, biblical way that is very easy to understand, easy to read, normal, common language that is semi-professional, that's in my tone style that you've been writing like." "keep going and publish when ready."

## What was written

| Essay | Address | Shelf section | Words |
|---|---|---|---|
| Is Hell Real, and Is It Fair? | /writing/is-hell-real-and-is-it-fair | Doubt and Hard Questions | 2,990 |
| Did God Choose Who Would Be Saved? | /writing/did-god-choose-who-would-be-saved | Doubt and Hard Questions | 2,843 |
| Is Divorce Ever Right, and May a Divorced Person Remarry? | /writing/is-divorce-ever-right-and-may-a-divorced-person-remarry | Marriage, Family and Ordinary Faithfulness | 2,703 |
| Should the Church Stay Out of Politics? | /writing/should-the-church-stay-out-of-politics | Faith and Power | 2,731 |
| Why Does God Allow Evil? | /writing/why-does-god-allow-evil | Doubt and Hard Questions | 2,758 |

All five were landed the way the first twenty were: a file in `client/public/essays/`, a `"live"` line in `client/src/lib/shelf.json`, a filing line in `client/src/lib/pillar-assignments.ts`, the essays index and the passage index rebuilt. No database row. One commit each with its ledger rows, one for a revision across the five, and one for the shelf test and the passage index.

**No pending slot was used, and four of the five stand beside an essay the shelf already had.** The shelf holds no pending line with any of these five titles. It does hold live essays on four of the five subjects, from the first and second runs: "Is Hell Real, and Is It Forever?", "Did God Choose Me, or Did I Choose God?", "Divorce, Remarriage and the Church" and "Why Does God Let Children Suffer?" (and, near the fourth, "Why Jesus Won't Fit in Either Party" and "Can a Nation Be Christian?"). So each new essay was given a different job from its neighbor and links it:

- The hell essay is about the charge of unfairness: the sum of a short life against an endless punishment, what Jesus says about how judgment is measured, and how each of the three answers meets that charge. The earlier essay is about duration and the history.
- The election essay reads Romans 9 and 1 Timothy 2:4 each where it stands and gives five traditions in the words of their own confessions. The earlier essay tells the history from Augustine to Wesley.
- The divorce essay reads the five passages one at a time and sets out the three answers the brief names (no remarriage, two grounds, wider grounds including abuse). The earlier essay sets the Catholic, Orthodox and Protestant readings side by side.
- The politics essay asks what "stay out" can mean and gives four traditions, the Black church and Barmen. The earlier essays measure two captivities and ask what a Christian nation would be.
- The essay on evil takes the argument in its logical and evidential forms. The earlier essay takes the suffering of children.

The shelf now holds 89 essays, 40 of them live and 49 pending; 65 are public. The counts in `client/src/lib/shelf.test.ts` say so. To take one of the five down: delete its line from `shelf.json` and its file, run `node scripts/build-essays-index.mjs` and `pnpm exec tsx scripts/build-passage-index.mjs`, and lower the test's counts by one.

Rules kept in all five: third-person teaching voice, with no "I" outside quoted text; no memory, feeling, habit, conversation or biography is given to James; no church body is named or implied as his (the politics essay calls Martin Luther King Jr. "a preacher" of the Black church as history; the Supper, baptism and church order are not touched); no position is stated as his. The politics essay links the live /questions page that says the site does not teach Christian nationalism as true, quotes that page's own two sentences with the page named, and adds nothing to them. No present war, state, party, policy, movement or living person is named (the site's pages on hell, divorce and evil name living scholars; the essays that draw on them name none). No explanation is offered for any reader's loss, and nothing is said about any person's fate. Care lines are reused whole from existing pages and were checked byte for byte by a script: the grief paragraph in the hell essay and the essay on evil; the Honest Answer's lines, the help page's two lines and the abuse-hotline line in the divorce essay, with Find Help named and linked. Matthew 8 is not cited anywhere. Every claim and quotation has a row in `docs/work/elite/articles-ledger.md` under "Fifth run".

## The Revision Pass (CLAUDE.md), one line per pass

**is-hell-real-and-is-it-fair.** Structure: opens on three people who mean three things by fair (a son, a woman who was wronged, a student with a sum); shows the objection inside the church's own books (Augustine, Aquinas, Ezekiel) before answering it; grants that the premise is the Bible's and that Augustine's own example carries his age's cruelty; Jesus on measured judgment before any view; three answers each with what it denies and its hard questions; the wronged woman's question turns the problem; the cross as the one unfair thing, stated as confession; ends with no number given. Rhythm: cut from 3,543 words to 2,990. Words: "the one person who ever took a punishment he had not earned" changed as an overclaim; the proportion argument and Mill reworded so that they no longer follow the Honest Answer's sentences; no person's fate is spoken of.

**did-god-choose-who-would-be-saved.** Structure: opens on a reading group, a father of two sons and the skeptic's two-sided charge; sets Paul's two sentences side by side; the ground all five share (against Pelagius) before the dispute; Romans 9 read through to chapter 11, with what complicates each side; 1 Timothy 2:4 with Aquinas's three readings; five accounts in their confessions' own words, each with what it guards; the question each is asked, with its reply; Paul's own use of the doctrine against ours; ends on the father, told two things and no third. Rhythm: the five accounts are built alike on purpose and nowhere else. Words: "nobody has added a fourth" cut as an overclaim; a line repeated from the earlier essay cut; "three chapters later" corrected to two.

**is-divorce-ever-right-and-may-a-divorced-person-remarry.** Structure: opens on a man, his pastor and a woman who is afraid, and puts her case first with the care lines; five passages read in turn, with what is plain and what is open; the skeptic's question about Matthew's exception; three answers each in its holders' terms with its hard questions, the strictest in Jerome's own sentence; a section on what no passage says, with the note's sentence and three flights from violence in Scripture; the church's use of each answer, under "we"; ends with the two men undecided and the woman told the one certain thing. Rhythm: first draft 2,476 words; three passages of substance added (1 Corinthians 7:27 to 28, the skeptic's question, flight in Scripture). Words: bold run-in labels replaced with plain sentences; "bless" changed; no advice is given to a reader who has remarried; the essay says it is not legal advice.

**should-the-church-stay-out-of-politics.** Structure: opens on three people who left churches for opposite reasons; separates four things the sentence can mean; Jesus refusing power and the prophets refusing silence, with the priest of Bethel as the first to give the instruction; 312, Priscillian and Ambrose as the two possibilities; four traditions each with a strength and a question; the Black church and Barmen as the cases where it stopped being theory, with Barmen's limit stated; two errors from one root, the first in the site's own words, the second in Barmen's; ends in the governor's court. Rhythm: the right and the left are described in one sentence each, built alike. Words: "the oldest recorded instruction" and "before anyone else did" reworded; the sentences on Priscillian, Ambrose and the German Christians rewritten so that they no longer follow the course or the earlier essay; a different sentence of Jones and Allen chosen because the earlier essay quotes the first.

**why-does-god-allow-evil.** Structure: opens on a student, a man by a river and a woman tired of explanations, and says which of them the essay is for; the care paragraph before the argument; the old form in Hume's and Job's words, then Mackie's; what is granted; the answer from freedom, the concession it won and four things it leaves unexplained; the stronger form in Rowe's fawn and Darwin's letter, granted to be unrefuted; three more answers, each with the place it stops, with Darwin's own modesty set beside the third; Job as the book that forbids explaining; the cross and resurrection as confession, with what they do not do for the fawn; ends on Darwin and Job. Rhythm: one illustration (the parent in the room) marked in the ledger as the essay's and not Rowe's. Words: Darwin's sentence given whole; the sentences on Mackie's principles and on Job rewritten in the essay's own words; no living philosopher named; nothing offered as the reason for any loss.

Final read as the skeptic, all five: each gives the strongest objection near the top, in a named unbeliever's or critic's own words where one could be opened, and grants most of it; each names the church's guilt in plain sentences with "we"; each says what its answers cannot show; none ends by asking for a decision. The essay on evil says its strongest argument has not been refuted.

## Rules broken in this run

1. Once, before the light gates for the fourth essay, `uptime` was sent in the same step as the gates and not as a separate command first. It read 6.86, above the limit of 6.00, and the gates ran anyway. They passed. After that, `uptime` was run alone before each gate run and the run waited when the load was at or above 6.00.
2. The first drafts carried some thirty sentences that followed a page of the site closely without quotation marks. A script found them after the fifth essay and they were rewritten in one commit (the ledger has a section on it). They should have been caught as each essay was written.

## Topics for a next run

- "Can I Trust My Feelings About God?" (the third run's reserve; still unwritten).
- "Who Runs the Church? Bishops, Elders and Congregations" (the third second-order question the denominations essay names).
- "Is the Old Testament God the Same God?" and "What Is the Gospel, in One Page?"
- "Mary, the Saints and Prayer to the Dead: What Divides Catholic, Orthodox and Protestant".
- "What Does the Bible Say About Sexuality, and Why Do Churches Now Disagree?" and "When Does Life Begin, and What Do Christians Owe the Unborn and Their Mothers?" (James has given his position on each; both still need his decision on scope and his own words).
- "Was Jesus Wrong About the End?" and "Why Does God Hide?" (live /questions pages exist for both).

## Questions for James

1. Four of these five sit beside an earlier essay on the same subject. Do you want both kept as companions, or each pair made into one essay? If one, which title and address should stay?
2. Hell: the essay takes no side between endless punishment and the final destruction of the lost, and it says of the hope that all will be restored only what the site's page already says. It tells a grieving son that he "is not told about his father. He is told who the Judge is." Is that the word you would give him?
3. Election: the essay sets five traditions side by side and does not say which is yours. It ends by telling a father that "God is free in his mercy, and God wants his son." Would you say both halves?
4. Divorce: you have given no view, and the essay gives none. It ends by saying of a woman who is afraid of the man she lives with, "She can go." It gives no counsel at all to a reader who has already remarried. Please read the section "What No Passage Says" as a pastor, and say whether you want anything added for the remarried.
5. Politics: the essay names no party, policy or person. It says a church that speaks about private sins and never about cruelty done by law "has taken the side of whatever is already happening." Is that a sentence you would sign? And it describes the two-kingdoms, Reformed, Anabaptist and Catholic accounts without choosing; do you want yours named?
6. Evil: the essay says the evidential argument "is still standing, weakened and unrefuted," which is what the site's page says. It tells a man who lost his town to a flood that he has been given no reason. Is that where you want it left?
7. The ledger's "check first" rows (this machine could reach only GitHub): whether "free from a wife" in 1 Corinthians 7:27 can include the divorced; the replies each tradition gives to its hard question on election and on divorce; the criticism of the two-kingdoms account after the 1930s; that most Reformed churches gave up the magistrate's duty to suppress heresy; that many white churches called slavery a civil matter outside the pulpit's business. The copies of the Formula of Concord, the Remonstrance and the Confession of Dositheus were read in third-party GitHub repositories, two of which name no translator; a reader with a library should compare them with a printed edition.

## Gates (2026-11-22)

Before the merge, after each essay: the seven light gates (`validate-essays`, `validate-content-integrity`, `validate-grow-voice`, `validate-no-emdash`, `validate-politics`, `validate-links`, `build-essays-index --check`), every one exit 0 on its first run for all five, and again after the revision across the five. Every Scripture quotation matched the ESV copy by script (202 quotations checked across the five), every other quotation was found in an opened source by the second script (74), and each reused care line was found whole. Before the merge, once: the passage index rebuilt (704 chapter files, 55 written, two of them new: Job 9 and Job 16; Matthew 8 still has none), and the shelf test and the site-structure test together (44 tests passed, after the counts were raised to 89 essays, 40 live and 65 public).

The full gates were run after this section was committed and after the target branch was merged, in the order the brief sets. Their results are in the paragraph below, which was added after they ran and was itself checked by the light gates only.
