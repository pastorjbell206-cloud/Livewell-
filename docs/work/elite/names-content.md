# Unit names-content: plain names on the content itself

Branch `elite/names-content`, based on `6cc48594`. Not pushed. Scope: AUDIT.md sections 5.5 to 5.15, roadmap items 3, 6 and 7, lens report `titles-content.md`. Titles only. No body text was rewritten, and no id, slug or address changed.

## What changed and why

The audit's rule is that a title says what the piece is about in the words a reader would use, and the line James loves goes underneath. This unit applied the audit's proposed titles to the content libraries. 124 titles changed in all. Every one is in the tables below, old beside new, so any of them can be put back by editing one line and rerunning the index builder named in that section.

1. **Essay shelf** (`client/src/lib/shelf.json`). The three broken titles are fixed and the other 24 waiting essays now carry the titles the writers chose in October (docs/work/NOTES.md, "Titles the writers chose"). `RetiredEssayNotice` prints the shelf title as its heading and tab title, so the notice on each old address now reads properly. Live essays were not touched (see Skipped).
2. **Church history** (`client/public/history/essays/*.json`). Fourteen era essays have a plain title. His first title is kept in a new optional `standfirst` field and printed in italic under the headline on the essay page (`client/src/pages/history/HistoryEssay.tsx`). The summary stays in `subtitle` where it was. Two timeline entries in `client/public/justice/timeline.json` were retitled. Where the two auditors differed I took the wording a stranger could follow without knowing the term (B's list), which also avoids two essays both called "The Middle Ages".
3. **Study guides** (16), **eight-week plans** (10), **family devotions** (31 titles recapitalized, one given its question mark), **family reading plans** (2), **one Bible reading guide, three context guides, one creed, three doctrine pages, two booklets**, **one how-to**, **ten group guides**.
4. Link labels that quote a changed title word for word were updated to match (needs pages, topic pages, three tool pages, the Start Here quiz, two landing pages, social-quotes). Labels that paraphrase were left alone.
5. Two things seen in the browser and fixed: the church history essay hero used `--bone` for its text on a fixed-dark band, so the headline vanished in dark mode (now `--charcoal-fg`, the token made for that); and the booklet card gave the text about 95 pixels on a phone (the cover column now takes at most 32 percent).

## Places where I did not take the report's exact words

| Item | Report said | I used | Why |
|---|---|---|---|
| Study guide forty-days | Lent: A Forty-Day Bible Study | Lent: A Bible Study for the Forty Days | The guide holds five sessions. The audit's own habit is that a title promising forty days must hold forty. |
| Creed heidelberg-catechism-q1 | ...Question 1, "What Is Your Only Comfort?" | ...Question 1: "What Is Thy Only Comfort in Life and Death?" | The page prints the 1563 wording with "thy". A quotation in a title should match the text under it. |
| Doctrine covenant-frameworks | How Does the Whole Bible Fit Together? Covenant Theology and Dispensationalism | How Does the Whole Bible Fit Together? | The page weighs three views, and the subtitle already names them. |
| Plan infertility | two versions (AUDIT.md and the lens report) | Eight Weeks for a Couple Facing Infertility | AUDIT.md's version; it carries the word a person would search. |
| Devotion capitals | "sentence-style" | Title capitals with small words lowered, like the seasonal set | The audit's own examples ("The Towel and the Basin") are this style. "Than" kept its capital. |
| Group guides | Put "Discussion Guide:" in front of 13 plus 3 | Not done | See Skipped. |

## Old and new, every title

### Essay shelf notices (27) — `client/src/lib/shelf.json`

| Where | Old title | New title |
|---|---|---|
| /writing/what-render-unto-caesar-actually-means | What Render Unto Caesar Actually Means | What Did Jesus Mean by "Render Unto Caesar"? |
| /writing/when-the-pulpit-became-a-precinct | When Your Church Became a Voting Bloc | When Your Church Becomes a Voting Bloc |
| /writing/the-end-of-home-field-advantage | The End of Home-Field Advantage | How Do You Share Your Faith in a Post-Christian America? |
| /writing/the-rise-of-the-nones | The Rise of the Nones | Why Are People Leaving the Church? |
| /writing/what-a-christian-owes-the-city | What a Christian Owes the City | What Does It Mean to Seek the Welfare of the City? |
| /writing/the-anabaptist-option | The Anabaptist Option | Who Were the Anabaptists, and Why Do They Still Matter? |
| /writing/when-politics-replaced-theology | When Politics Replaced Theology | Where Did the Religious Right Come From? |
| /writing/where-church-was-silent-history-injustice-reckoning | Where the Church Was Silent: A Theological Reckoning with the History the American Church Would Rather Not Own | Where Was the Church During Slavery and Jim Crow? |
| /writing/doctrine-of-discovery | The Doctrine of Discovery | What Is the Doctrine of Discovery? |
| /writing/prosperity-gospel-is-not-the-gospel | The Prosperity Gospel Is Not the Gospel | What's Wrong with the Prosperity Gospel? |
| /writing/the-first-christians-died-for-this | The First Christians Died for This | Why Were the Early Christian Martyrs Willing to Die? |
| /writing/the-council-of-nicaea-what-was-decided-in-325 | The Council of Nicaea: What Was Actually Decided in 325 | What Was Decided at the Council of Nicaea? |
| /writing/why-people-fled-to-the-desert | Why People Fled to the Desert to Find God | Why Did the Desert Fathers Leave Everything? |
| /writing/augustine-the-restless-man | The Restless Man Who Couldn't Outrun God | Augustine's Confessions and the Restless Heart |
| /writing/christianity-was-never-western | Christianity Was Never a Western Religion | Is Christianity a White Man's Religion? |
| /writing/reformation-actually-about | Reformation Actually About | What Was the Reformation Actually About? |
| /writing/church-megaproject-widow-mite | Church Megaproject Widow Mite | What Does the Widow's Mite Really Mean? |
| /writing/psalm-82-unjust-systems | Psalm 82 Unjust Systems | What Psalm 82 Says About Unjust Systems |
| /writing/women-and-leadership-church | Women and Leadership in the Church | Can Women Be Pastors? |
| /writing/excavation-not-demolition | Excavation, Not Demolition | Deconstructing Your Faith: What to Tear Down and What to Keep |
| /writing/why-trust-the-bible | Why Would Anyone Trust the Bible? | Can You Trust the Bible? |
| /writing/the-historical-jesus | What Happened to the Historical Jesus | Was Jesus Real? What Historians Actually Know |
| /writing/covenant-vs-contract-what-marriage-is | Covenant vs. Contract: What Marriage Actually Is | Is Marriage a Covenant or a Contract? |
| /writing/what-the-bible-says-about-submission | What the Bible Really Says About Submission in Marriage | What Does the Bible Say About Submission in Marriage? |
| /writing/what-fatherhood-requires | What Fatherhood Requires | What Does the Bible Say About Being a Father? |
| /writing/the-machine-that-forms-you | The Machine That Forms You | What Is Your Phone Doing to Your Soul? |
| /writing/the-theology-of-saturday | Where Is God on Holy Saturday? | What Holy Saturday Teaches About Grief |

### Church history essays (14) — `client/public/history/essays/<slug>.json`, then `node scripts/build-history-index.mjs`

The old title is also in each file's `standfirst` field. To reverse one, put it back in `title` and delete the `standfirst` line.

| Where | Old title | New title |
|---|---|---|
| /theology/history/after-christendom-era | After Christendom | The Church After Christian America, 2010 to Today |
| /theology/history/awakenings-and-enlightenment | Awakenings and Enlightenment | Revival and Reason: The Church from 1648 to 1800 |
| /theology/history/the-american-experiment | The American Experiment | How Christianity Became American, 1800 to 1950 |
| /theology/history/the-apostolic-age | The Apostolic and Sub-Apostolic Age | The First Christians: From Pentecost to the Generation After the Apostles |
| /theology/history/the-attractional-era | The Attractional Era | The Megachurch Years, 1950 to 2010 |
| /theology/history/the-awakenings | The Awakenings and the Birth of Evangelicalism | The Great Awakening and Where Evangelicals Came From |
| /theology/history/the-constantinian-turn | The Constantinian Turn | When Rome Became Christian: Constantine and What It Cost |
| /theology/history/the-desert-and-the-rule | The Desert and the Rule | The First Monks: Why Christians Went to the Desert |
| /theology/history/the-east-west-schism | The East and West Divide | Why the Catholic and Orthodox Churches Split in 1054 |
| /theology/history/the-fathers-at-work | The Fathers at Work | The Church Fathers: The Teachers Who Carried the Faith Between the Councils |
| /theology/history/the-global-church | The Modern Church and the Global Shift | The Church Since 1900: How Christianity Moved South and East |
| /theology/history/the-great-councils | The Great Councils | Nicaea to Chalcedon: The Councils That Wrote the Creeds |
| /theology/history/the-long-middle | The Long Middle | Nine Hundred Years: The Church from Rome's Fall to the Reformation |
| /theology/history/the-medieval-west | The Medieval West | The Church in the Middle Ages |

### Study guides (16) — `client/public/studyguides/<slug>.json`, then `node scripts/build-studyguides-index.mjs`

| Where | Old title | New title |
|---|---|---|
| /studyguides/christian-nationalism | Christian Nationalism: An 8-Week Study | Christian Nationalism: A Five-Session Bible Study |
| /studyguides/church-and-empire | Church and Empire: An 8-Week Study | The Church and Political Power Through History: A Five-Session Study |
| /studyguides/deconstruction | When It All Comes Apart | Deconstruction: A Bible Study for When Your Faith Comes Apart |
| /studyguides/deep-roots | Deep Roots: A Bible Study for Faith Beyond Slogans | Deep Roots: A Bible Study on the Basics of the Faith |
| /studyguides/doubt | When Faith Has Questions | Doubt: A Bible Study for When Faith Has Questions |
| /studyguides/economic-justice | Economic Justice: An 8-Week Study | Money, Work and the Poor: A Five-Session Bible Study |
| /studyguides/end-times | How the Story Ends | The End Times: A Bible Study on How the Story Ends |
| /studyguides/forty-days | Forty Days: A Bible Study for Lent | Lent: A Bible Study for the Forty Days |
| /studyguides/manhood | What Manhood Is For | Manhood: A Bible Study on What a Man Is For |
| /studyguides/mishpat | Mishpat: A Bible Study on Biblical Justice | Justice: A Bible Study on What the Bible Means by Justice |
| /studyguides/money | Where Your Treasure Is | Money: A Bible Study on Where Your Treasure Is |
| /studyguides/suffering | When It Does Not Make Sense | Suffering: A Bible Study for When Life Does Not Make Sense |
| /studyguides/the-captive-church | The Captive Church: A Study on Faith and Political Power | Faith and Politics: A Bible Study on the Church and Political Power |
| /studyguides/the-church | Why We Still Need Each Other | The Church: A Bible Study on Why We Still Need Each Other |
| /studyguides/the-undivided-life | The Undivided Life: A Study on Faith Beyond Sunday | Faith on Monday: A Bible Study on Living One Whole Life |
| /studyguides/waiting-for-the-light | Waiting for the Light: A Bible Study for Advent | Advent: A Bible Study on Waiting for the Light |

### Eight-week plans (10) — `client/public/plans/<slug>.json`, then `node scripts/build-plans-index.mjs`

| Where | Old title | New title |
|---|---|---|
| /plans/addiction | Eight Weeks on the Long Road Back | Eight Weeks Toward Recovery from Addiction |
| /plans/empty | Eight Weeks of Small Mercies | Eight Weeks for When You Feel Empty |
| /plans/forgiveness | Eight Weeks Toward Setting Down the Debt | Eight Weeks Toward Forgiving Someone |
| /plans/infertility | Eight Weeks in the Waiting | Eight Weeks for a Couple Facing Infertility |
| /plans/marriage | Eight Weeks Toward Each Other | Eight Weeks Toward a Stronger Marriage |
| /plans/money | Eight Weeks Toward Enough | Eight Weeks Toward Peace About Money |
| /plans/new-believer | Eight Weeks of Beginnings | Eight Weeks for a New Christian |
| /plans/pornography | Eight Weeks Out of Hiding | Eight Weeks Toward Freedom from Porn |
| /plans/skeptic | Eight Weeks of Reading Like an Adult | Eight Weeks for the Curious Skeptic |
| /plans/work-burnout | Eight Weeks of Learning to Stop | Eight Weeks for When Work Has Burned You Out |

### Family devotions (32) — `client/public/family-devotions.json` and `family-devotions-2.json`, then `node scripts/build-family-year.mjs` and `node scripts/build-family-index.mjs`

The other 40 weekly titles had no small word to lower and are unchanged.

| Where | Old title | New title |
|---|---|---|
| /family/devotions/identity | Made On Purpose | Made on Purpose |
| /family/devotions/fear-and-anxiety | When The Lights Go Out | When the Lights Go Out |
| /family/devotions/who-is-jesus | More Than A Good Teacher | More Than a Good Teacher |
| /family/devotions/why-we-pray | Talking To Someone Who Is There | Talking to Someone Who Is There |
| /family/devotions/is-the-bible-true | Can We Trust This Book | Can We Trust This Book? |
| /family/devotions/handling-anger | What To Do With The Fire | What to Do with the Fire |
| /family/devotions/serving-others | The Towel And The Basin | The Towel and the Basin |
| /family/devotions/hope | An Anchor In The Storm | An Anchor in the Storm |
| /family/devotions/self-control | The City With No Walls | The City with No Walls |
| /family/devotions/honesty | Nothing To Hide | Nothing to Hide |
| /family/devotions/work | Working For The Right Boss | Working for the Right Boss |
| /family/devotions/rest-and-sabbath | Permission To Stop | Permission to Stop |
| /family/devotions/caring-for-creation | Taking Care Of The Garden | Taking Care of the Garden |
| /family/devotions/the-church | Not A Building | Not a Building |
| /family/devotions/the-cross | What Love Was Willing To Do | What Love Was Willing to Do |
| /family/devotions/the-words-we-say | Small But Powerful | Small but Powerful |
| /family/devotions/jealousy-and-comparison | The Thief Of Glad | The Thief of Glad |
| /family/devotions/the-fear-of-the-lord | The Right Kind Of Awe | The Right Kind of Awe |
| /family/devotions/waiting-on-god | Strength In The Waiting | Strength in the Waiting |
| /family/devotions/the-armor-of-god | Dressed For The Day | Dressed for the Day |
| /family/devotions/the-fruit-of-the-spirit | What Grows On The Tree | What Grows on the Tree |
| /family/devotions/being-sent | You Are Not Just A Keeper | You Are Not Just a Keeper |
| /family/devotions/thankfulness | The Cure For A Grumpy Heart | The Cure for a Grumpy Heart |
| /family/devotions/prayer | Talking With God | Talking with God |
| /family/devotions/the-bible | A Light For The Path | A Light for the Path |
| /family/devotions/trusting-enough-to-obey | Trusting Enough To Obey | Trusting Enough to Obey |
| /family/devotions/kindness | Small Things With Great Love | Small Things with Great Love |
| /family/devotions/the-trinity | Three And Yet One | Three and Yet One |
| /family/devotions/the-miracles-of-jesus | A Glimpse Of The Mender | A Glimpse of the Mender |
| /family/devotions/gentleness | Strong Enough To Be Gentle | Strong Enough to Be Gentle |
| /family/devotions/goodness | Good All The Way Through | Good All the Way Through |
| /family/devotions/stewardship | Taking Care Of What Is Not Yours | Taking Care of What Is Not Yours |

### Family reading plans (2) — `client/public/family-reading-plans.json`, then `node scripts/build-family-index.mjs`

| Where | Old title | New title |
|---|---|---|
| family reading plan heroes-and-promises | Heroes and Promises | The Old Testament Story in 30 Days |
| family reading plan foundations | Foundations | 21 Days for a Family New to Faith |

### Timeline, Bible guide, context guides, creed, doctrine pages, booklets, how-to (13)

Files: `client/public/justice/timeline.json`; `client/public/bible/guides/reading-apocalyptic.json` and `index.json` (hand-kept); `client/public/context/guides/*.json` (then `build-context-index.mjs` and `build-story-plan.mjs`); `client/public/creeds/documents/heidelberg-catechism-q1.json` (then `build-creeds-index.mjs`); `client/public/theology/<slug>.json`, `questions.json`, `passage-notes.json`, `client/src/lib/theology.ts`, `scripts/merge-passage-notes.mjs` (then `build-theology-index.mjs`); `client/src/data/booklets.ts`; `scripts/articles/marriage-howtos.json` (then `build-howtos-index.mjs`).

| Where | Old title | New title |
|---|---|---|
| /justice/timeline (entry, 4th century) | The Constantinian Shift | Constantine Makes the Church the Empire's Favorite |
| /justice/timeline (entry) | Democratic Socialism and the Honest Distinction | Democratic Socialism Is Not Soviet Communism |
| /study/bible/guides/reading-apocalyptic | Reading Apocalyptic | Reading Revelation and Daniel (Apocalyptic Writing) |
| /resources/context/messianic-expectation | What Israel Was Waiting For | What Kind of Messiah Was Israel Waiting For? |
| /resources/context/misreading-with-western-eyes | What We Bring to the Text Without Knowing It | How Does Being Western Change the Way We Read the Bible? |
| /resources/context/pharisees-sadducees-essenes | Who the Pharisees Actually Were | Who Were the Pharisees, Sadducees and Essenes? |
| /resources/creeds/heidelberg-catechism-q1 | The Heidelberg Catechism, Lord's Day 1 | The Heidelberg Catechism, Question 1: "What Is Thy Only Comfort in Life and Death?" |
| /theology/doctrine/revelation | How God Speaks | How Does God Speak to Us? |
| /theology/doctrine/inspiration | What Inspired Means | What Does It Mean That the Bible Is Inspired? |
| /theology/doctrine/covenant-frameworks | How the Whole Story Fits | How Does the Whole Bible Fit Together? |
| booklet qualified-elder | Qualified | Qualified: What the Bible Requires of an Elder |
| booklet changing-the-unchangeable | Changing the Unchangeable | Changing the Unchangeable: Leading a Church Through a Hard Change |
| /how-tos/marriage-how-to-handle-in-laws | How to Handle In-Laws (Leaving and Cleaving) | How to Handle In-Laws |

### Group guides (10) — `articleTitle` in `client/src/data/discussion-guides.ts`

| Where | Old title | New title |
|---|---|---|
| /group-guide/christianity-after-christendom | Christianity After Christendom | How Do Christians Live in a Country That Has Moved On? |
| /group-guide/exvangelical-when-leaving-isnt-losing-faith | Exvangelical: When Leaving Isn't Losing Faith | Leaving Evangelicalism Without Leaving Jesus |
| /group-guide/the-anabaptist-option | The Anabaptist Option | Who Were the Anabaptists, and Why Do They Still Matter? |
| /group-guide/the-death-of-christendom | The Death of Christendom | What Happens When a Country Stops Being Christian? |
| /group-guide/the-problem-with-certainty | The Problem with Certainty | Is It Wrong to Be Unsure? |
| /group-guide/the-rise-of-the-nones | The Rise of the Nones | Why Are People Leaving the Church? |
| /group-guide/the-spirituality-of-doubt | The Spirituality of Doubt | Can Doubt Be Part of Faith? |
| /group-guide/natural-evil-and-animal-suffering | The Suffering God Never Ordered | Does God Cause Our Suffering? |
| /group-guide/the-cost-of-following | What Following This Actually Costs | What Does It Cost to Follow Jesus? |
| /group-guide/the-historical-jesus | What Happened to the Historical Jesus | Was Jesus Real? What Historians Actually Know |

## Skipped, with the reason

- **The eight live essay titles in 5.5** ("Every Generation Was Sure It Was Right" and the rest). Seven of the eight take their page headline from the database, which this session cannot reach, so a shelf-only change would leave the list and the page disagreeing. The eighth is a file under `client/public/essays`, which another program owns. This is also decision 15 (which titles James wants left alone, and which "When Fear" essay keeps its name).
- **The line under "The Bible Assumes You Will Be Wrong"** (roadmap item 7). The essay's text is in the database and not in the repository, so there are no words of the piece to write the line from. Not written.
- **Three how-to titles that use "the table"** (start a discipleship table, multiply a table, no one comes back) and "Who to Invite to Your Table". The bodies say "table" throughout and never "group", and whether to teach the phrase is decision 17.
- **"Discussion Guide:" in front of group guide titles.** The page already prints "Small-group guide" above the headline, its search title begins "Small-Group Guide:", and the catalogue files each one under the kind "Group guide". Adding the words to the data would print the kind twice. If the merged catalogue or search still shows two rows that cannot be told apart, the fix belongs in the list that shows them.
- **"Who Is God? The Trinity"** doctrine page. The proposal folds its Trinity material into another page, which is a body change.
- **"The Apostolic and Persecuted Church"** and the two labeled lists (long course, short course) on the church history page. Both wait on decision 19, and the list layout is page work outside titles.
- **Near-twin devotions** ("He Keeps His Word" and "The God Who Keeps His Word"), the doubled catechism questions, devotion theme labels ("Fear And Anxiety" still has a capital "And"; the page prints themes in capitals so it does not show), the devotion search-title pattern, the devotion counters and the "Start" link. No single proposed wording, or doctrine, or page work.
- **One plain line under each creed card and each heresy card.** New sentences of history, not titles.
- **Essay section names** on /writing and the essay address renames in 5.6. Not in this unit's list; the addresses belong to the essay program.
- **Four waiting essays where the audit wanted something plainer than the writers' choice** (When God Bless America..., How American Christianity Became American, The Black Church and Prophetic Justice, Augustine). The shelf carries the writers' choice; the audit's alternatives are in AUDIT.md 5.6 for James.
- **`client/public/llms-full.txt`** was not committed. Rebuilding it also pulled in drift that was already there from other work, and the Vercel build regenerates it (`pnpm run llms:full`). **PDFs** are not in git (`client/public/downloads/` is ignored) and are rebuilt on deploy, so nothing to rerun.
- **`client/src/lib/studyguides-index.ts`** (the eight-guide list shown for a moment before the manifest loads) already disagreed with the guide files before this unit and was left as it was.
- **`api/static-library.generated.ts`** still holds old essay titles from the database export. Not regenerated here.

## What I ran

- `pnpm check`: passed.
- The whole content-gates step from `.github/workflows/ci.yml`, all 33 commands: passed on the final commit. (First run failed one: `validate-topics` wanted a topic's devotion label to match the recapitalized title. Fixed.)
- Index builders rerun: history, study guides, plans, family year, family index, context, creeds, theology, story plan, how-tos, search index. Drift checks (`--check`) for family year, family index, topics, search index, Bible text and story plan: up to date.
- `pnpm test`: 113 files passed, 7 skipped; 1307 tests passed, 73 skipped, on the final commit. (An earlier full run failed two tests in `home.test.tsx` that pinned a devotion title; updated.) Tests that pinned old titles were updated in `essay-shelf.test.tsx`, `family-pages.test.tsx`, `family/table-two.test.tsx`, `GroupGuide.test.tsx`, `home/home.test.tsx`.
- `eslint --max-warnings 0` on the touched `.ts` and `.tsx` files: clean. (`scripts/merge-passage-notes.mjs` is in ESLint's ignore list.)
- `pnpm build`, served with `npx serve -s dist/public`, and looked at 19 pages in Chromium at 390x844 and 1440x900 with `/api/trpc/*` stubbed: no sideways scroll on any, headlines and tab titles as expected. Dark mode checked on the church history essay. Screenshots in `/home/user/elite-shots/names-content/`. `dist/` deleted and the server stopped.

## What I did not verify

- The production runtime and the database. Any title the live site reads from the database (essay pages, books) is untouched and unchecked.
- The canonical audit step (sitemap, prerender, `audit:canonicals`) was not run. No route or address changed.
- The PDFs with the new study guide, plan and devotion titles were not built or looked at.
- The two console errors seen locally are the Vercel analytics scripts, which do not exist on a local server.
- No search data exists, so "what a person would type" is a judgment in every case.

## Merge notes

- `client/src/lib/shelf.json`: 27 title strings changed on `pending` lines. The essay branches (PR #541, land-next) change the same lines when an essay lands (status and title). On a conflict, take the landing branch's line; its title is the essay file's.
- `client/public/search-index.json` and `client/public/family/index.json`, `client/src/lib/familyYear.generated.ts`, the library index files: generated. On a conflict, take either side and rerun the builder.
- Shared files from the unit brief (App.tsx, siteNav.ts, index.css, prerender-heads.mjs, vercel.json, llms.txt): none touched.

## Waiting for James

1. The eight live essay titles (decision 15). They need the database as well as the shelf.
2. "The Megachurch Years, 1950 to 2010" stands in for "The Attractional Era", which the audit marked "your wording wanted". His phrase is still printed under it.
3. "How Christianity Became American, 1800 to 1950" (history essay) sits close to the waiting essay "How American Christianity Became American". One should change before that essay lands.
4. The three study guides that said "An 8-Week Study" now say five sessions, which is what the files hold (decision 21).
5. "Democratic Socialism Is Not Soviet Communism" is a firmer sentence than the heading it replaced. The entry's text supports it, but it is his call.
6. "Does God Cause Our Suffering?" for the group guide on natural evil is the audit's wording; the guide is about earthquakes and illness more than about cause.
7. "The table" in how-to titles (decision 17), and "After Christendom" as a title elsewhere.
8. One sentence under "The Bible Assumes You Will Be Wrong", in his words or from the essay.

## Decision Log lines to add

- Church history essays carry an optional `standfirst` field: the essay's first title, printed in italic under the plain headline. `title` is the plain name; `subtitle` stays the summary.
- A content title says the subject first in the reader's words; the line James loves goes under it. Ids, slugs and addresses do not change when a title does.
- Text on a fixed-dark band uses `--charcoal-fg`, never `--bone` (which turns dark in dark mode).
