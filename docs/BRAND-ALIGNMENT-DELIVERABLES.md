# Brand alignment — deliverables

What shipped, what was decided, what you still have to set by hand, and what
could not be verified from here. Companion to `docs/BRAND-ALIGNMENT-SUBSTACK.md`
(the audit) and PR #459.

---

## 1. The copy — final

Both pieces are constants in `client/src/lib/positioning.ts` and are used
verbatim everywhere they appear. Change them there only.

**The positioning sentence** (26 words; `BRAND_SENTENCE`):

> The American church traded the gospel for power; James Bell writes from inside
> the trade, for readers tired of being told whose side God is on.

**The subscription paragraph** (88 words, 5 sentences; `SUBSTACK_PITCH`):

> The End of Christian America is a book being serialized in parts. I am writing
> it as a pastor, between hospital rooms and funerals, about a church that still
> reads Scripture by the light of Caesar's throne — a church I am inside, not
> above. It is for the skeptic who suspects the faith was always about power, and
> for the Christian afraid he is right. A new part arrives when it is ready. I
> have sat with enough of the dying to know what a flag cannot do.

**Alternates**, second-best from the panel, in case you prefer the other take
(these pair with each other, not with the finals, since both lean on the
Scripture-by-power image):

> When the church trusts power over the gospel, Scripture sounds like the
> powerful; James Bell's serialized book is for readers tired of being handed a
> side.

> The End of Christian America is a book I am publishing in parts, each arriving
> when it is ready, for the reader who suspects the faith they were handed was
> power holding a Bible — and who is not wrong. I came to Christ from atheism and
> have spent my ministry inside the church that handed it to them. Christian
> America is ending. The church is not. We are about to learn which one we
> trusted.

How they were chosen: five writers drafted from five angles (skeptic-first,
verdict-first, inside the room, the long arc, fewest words); three judges scored
mechanics, voice, and fitness for use; a synthesizer built from the top scorer
(the inside-the-room draft, 22/30 and 27/30) and grafted one image from the
long-arc draft. Every piece was searched literally against the Forbidden
Language list and checked for cadence, count, and price claims; there are none.

## 2. Where the sentence and the paragraph now appear

**The sentence.** Home hero subhead and meta description (via
`PRIMARY_SUBHEAD`, `PRIMARY_SUBHEAD_SHORT`, `META_DESCRIPTION`, all aliases of
`BRAND_SENTENCE`); `client/index.html` description, `og:description`,
`twitter:description`; the prerender script's `FALLBACK_DESC` (the homepage
description crawlers and social scrapers receive, and the WebSite schema); the
WebSite JSON-LD from `SEOMeta.tsx`; the RSS channel description in
`api/index.ts`; the deck and meta description on `/substack` and `/subscribe`.
`server/brand-sentence.test.ts` fails CI if any hand-mirror drifts.

**The paragraph.** `/substack`; `/subscribe`; the footer form on every page;
the homepage signup; and the default newsletter block at the end of every
essay. One pitch, wherever a reader meets a form.

**The name.** `LiveWell` everywhere in the repo, guarded by the same test.
The Substack still says `Livewell` until you rename it (§4).

## 3. Decisions made, and why

- **The site's own subscribers table stays.** Removing it would break the
  Stripe member roster, the REST `/api/subscribe` used by gated downloads and
  membership, the admin audience panels, and the subscribers admin. It is an
  owned ledger, not a subscription. The one sentence that justifies it on the
  page: *"We keep your address on our own list as well, so the readership
  belongs to us and not to a platform — if the essays ever move, you move with
  them."*
- **The series note fires on more than pillars 1, 3, 6.** 399 of 681 essays
  have no explicit pillar and default to the pastoral one, including every essay
  on the politics and after-christendom tracks. The gate is an explicit
  political, Scripture, or after-Christendom assignment (ids 1, 2, 3, 6 — the
  left included, so it fires in both directions) or the canonical track slug.
  Coverage: about a third of the library, and 100% of the politics and
  after-christendom essays.
- **Six unfiled Scripture-reading essays are filed to pillar 3** after reading
  each excerpt: `proof-texting`, `six-lenses-that-distort-the-bible`,
  `the-whole-counsel`, `six-verses-we-memorized`,
  `what-the-original-audience-heard`, `reading-in-community`.
- **The Pastors Connection feed is no longer synced onto this site.** That
  material moved to its own platform; syncing it back would rebuild what was
  just taken out. Synced Substack posts land as unpublished drafts for you to
  publish.
- **Do not apply PR #480's 197 title rewrites as H1s.** They were never
  applied: 1 of 150 sampled slugs matches. They turn verdicts into search
  questions — *The Monster in the Mirror* becomes *Why Does Every Generation
  Get the Bible Wrong?* — which is the opposite of the Substack's title grammar.
  If you want them, use them as meta descriptions or decks, not titles.

## 4. Your sixty seconds on Substack — exact values

The audit could not open the Substack (blocked at this environment's network
proxy), so these are the values to set, not a report of what is set:

| Setting | Value |
|---|---|
| Publication name | `LiveWell` |
| Short description / tagline | the positioning sentence, verbatim (§1) |
| About page opener | the subscription paragraph, verbatim (§1) |
| Accent colour | `#D4A017` |
| Theme | light |
| Font | serif |
| Logo and header image | the same portrait the site uses, or a charcoal-on-cream `LiveWell` wordmark |
| Title fix | "Suffering and **Sovreignty**" → "Suffering and Sovereignty" (retitle only; keep the URL) |
| Title fix | the all-capitals *THE END OF CHRISTIAN AMERICA* part → title case |

## 5. Phase 5 — titles

**The rule the code already implements, stated once.** On an essay page the H1
is `post.title`; the standfirst under it is `post.excerpt`; the document title
is `post.title` plus " | LiveWell by James Bell" unless the title already
contains the brand; `og:title` is the raw `post.title`. There is no second
title field, so "search title in `<title>`, verdict as H1" cannot be built
without a schema change. The honest alternative is editorial: fix titles that
are not verdicts, one at a time, and leave the mechanics alone.

**Counts** (heuristic, applied literally to all 681 static-library titles):

| | |
|---|---|
| Verdict-style | 372 |
| Not verdict-style | 309 |

Heuristic keys: **a** contains " — ", " – ", or ": "; **b** starts with How /
What / Why / When / Where / Who / Which / Should / Is / Are / Can / Does / Do /
Did; **c** contains Help, Guide, Tips, Ways to, Steps, Explained, 101,
Introduction, Overview, A Christian View, Biblical, What the Bible Says;
**d** ends with a question mark.

**Read this list as a list to review, not a list to fix.** Key **b** in
particular flags verdict-shaped titles that happen to open with "When"
(*When God Bless America Replaces Thy Kingdom Come* is a verdict), and key
**a** flags titles whose colon introduces a second verdict rather than an
explainer. No replacement titles were written; that is your voice, not a
script's.

<details>
<summary>All 309 titles flagged (slug · title · key)</summary>

| slug | title | key |
|---|---|---|
| `already-and-not-yet-living-between-two-worlds` | Already and Not Yet: Living Between Two Worlds | a |
| `three-families-of-christianity` | Catholic, Orthodox, Protestant: The Three Families of Christianity | a |
| `charity-is-not-justice-the-difference` | Charity Is Not Justice: The Difference That Changes Everything | a |
| `complicity-how-good-people-sustain-bad-systems` | Complicity: How Good People Sustain Bad Systems | a |
| `covenant-vs-contract-what-marriage-is` | Covenant vs. Contract: What Marriage Actually Is | a |
| `creeds-confessions-statements-of-faith` | Creeds, Confessions, and Statements of Faith: Why the Church Wrote Them Down | a |
| `depression-in-the-pulpit` | Depression in the Pulpit: A Pastor's Mental Health | a |
| `digital-discipleship` | Digital Discipleship: Spiritual Formation in the Age of Algorithms | a |
| `elder-abuse-invisible` | Elder Abuse: The Invisible Sin | a |
| `exodus-the-story-underneath-the-whole-bible` | Exodus: The Story Underneath the Whole Bible | a |
| `expository-vs-topical-preaching` | Expository vs. Topical Preaching: Which and When | a |
| `exvangelical-when-leaving-isnt-losing-faith` | Exvangelical: When Leaving Isn't Losing Faith | a |
| `parenting-family-rhythms-that-form-faith` | Family Rhythms: Building a Household That Forms Faith | a |
| `marriage-fighting-fair` | Fighting Fair: Conflict Without Casualties | a |
| `flags-in-the-sanctuary` | Flags in the Sanctuary: A Theology of the Nation | a |
| `forgiveness-in-marriage` | Forgiveness in Marriage: How to Actually Do It | a |
| `formed-by-screens-technology-and-the-soul` | Formed by Screens: Technology and the Soul | a |
| `foster-care-unfinished-mandate` | Foster Care: The Unfinished Mandate | a |
| `individual-sin-and-systemic-sin-explained` | Individual Sin and Systemic Sin: What the Bible Teaches | a |
| `interfaith-marriage` | Interfaith Marriage: When You Love Someone Who Doesn't Believe | a |
| `teen-it-is-okay-to-doubt` | It Is Okay to Doubt: What to Do With Your Questions | a |
| `lament-the-prayer-the-church-forgot` | Lament: The Prayer the Church Forgot | a |
| `parenting-letting-them-fail` | Letting Them Fail: Raising Resilient Kids | a |
| `liturgical-vs-contemporary-worship` | Liturgical vs. Contemporary Worship: What We Gained and What We Lost | a |
| `mental-health-and-the-church-beyond-pray-about-it` | Mental Health and the Church: Beyond Just Pray About It | a |
| `principalities-and-powers-the-bibles-language-for-systems` | Principalities and Powers: The Bible's Language for Systems | a |
| `reconstructing-faith` | Reconstructing Faith: What Comes After Deconstruction | a |
| `replanting-when-a-church-starts-over` | Replanting: When a Church Has to Start Over | a |
| `spiritual-abuse-how-good-theology-gets-weaponized` | Spiritual Abuse: How Good Theology Gets Weaponized | a |
| `the-black-church-in-america` | The Black Church: The Most Important Institution in American Christianity | a |
| `the-consistent-pro-life-ethic-womb-to-tomb` | The Consistent Pro-Life Ethic: Womb to Tomb | a |
| `the-council-of-nicaea-what-was-decided-in-325` | The Council of Nicaea: What Was Actually Decided in 325 | a |
| `the-crusades-what-actually-happened` | The Crusades: What Actually Happened | a |
| `the-early-church-under-rome` | The Early Church Under Rome: Faith Without Power | a |
| `the-examined-life-practices-that-hold` | The Examined Life: Spiritual Practices That Hold | a |
| `the-eye-of-the-needle-jesus-and-the-rich` | The Eye of the Needle: Jesus and the Rich | a |
| `the-great-schism` | The Great Schism: When One Church Became Two | a |
| `the-lonely-seat-power-and-the-senior-leader` | The Lonely Seat: Power and the Senior Leader | a |
| `megachurch-model` | The Megachurch Model: What Worked, What Didn't, What's Next | a |
| `the-most-segregated-hour` | The Most Segregated Hour: Why Sunday Morning Is Still Divided | a |
| `the-christian-mystics` | The Mystics: Christianity's Best-Kept Secret | a |
| `sexual-abuse-crisis-in-the-church` | The Sexual Abuse Crisis: A Reckoning the Church Cannot Avoid | a |
| `two-kingdoms-faith-and-state` | Two Kingdoms: How Christians Relate Faith and State | a |
| `parenting-spiritual-milestones-by-age` | What to Aim for at Each Age: Spiritual Milestones | ab |
| `divorce-and-remarriage` | When a Marriage Ends: Divorce, Remarriage, and Grace | ab |
| `evolution-and-genesis` | Evolution and Genesis: A Pastor's Guide | ac |
| `do-miracles-still-happen` | Miracles: Do They Still Happen? | ad |
| `just-war-and-pacifism` | Can Christians Fight? Just War and the Case for Peace | b |
| `do-justice-manifesto` | Do Justice Manifesto | b |
| `the-father-wound-and-the-god-question` | How a Father Shapes the Way a Child Sees God | b |
| `how-american-christianity-became-american` | How American Christianity Became American | b |
| `proof-texting` | How Both Sides Use the Bible to Win | b |
| `how-christianity-became-an-empire` | How Christianity Became an Empire | b |
| `discipling-people-out-of-fear` | How Fear Took Over the Church | b |
| `how-individualism-changed-how-we-read-the-bible` | How Individualism Changed the Way We Read the Bible | b |
| `43-how-national-pastors-are-redefining-what-it-means-to-be-a-missionary` | How National Pastors are Redefining what it Means to Be a Missionary | b |
| `church-and-mental-health` | How the Church Handles Mental Health (Badly) | b |
| `how-the-reformation-started-and-why-it-still-matters` | How the Reformation Started and Why It Still Matters | b |
| `how-the-religious-right-was-built` | How the Religious Right Was Built | b |
| `how-the-story-ends` | How the Story of the Bible Actually Ends | b |
| `35-how-three-small-churches-co-planted-one-new-congregation` | How Three Small Churches Co Planted One New Congregation | b |
| `9-how-to-be-present-at-home-when-your-mind-never-leaves-the-church` | How to Be Present at Home when your Mind Never Leaves the Church | b |
| `how-to-build-a-healthy-church-staff-culture` | How to Build a Healthy Church Staff Culture | b |
| `how-to-develop-leaders-not-just-volunteers` | How to Develop Leaders, Not Just Recruit Volunteers | b |
| `how-to-die-well` | How to Die Well | b |
| `discipline-without-domination` | How to Discipline Without Crushing Your Child | b |
| `finding-a-good-church` | How to Find a Church That Won't Hurt You | b |
| `how-to-find-gods-will-for-your-career` | How to Find God's Will for Your Career | b |
| `23-how-to-give-feedback-that-actually-changes-behavior` | How to Give Feedback That Actually Changes Behavior | b |
| `22-how-to-lead-a-church-through-a-season-of-decline-without-losing-hope` | How to Lead a Church Through a Season of Decline without Losing Hope | b |
| `50-how-to-lead-when-trust-in-institutions-including-the-church-is-at-an-all-time-low` | How to Lead when Trust in Institutions Including the Church is at an All Time Low | b |
| `how-to-lead-without-losing-your-soul` | How to Lead Without Losing Your Soul | b |
| `46-how-to-pastor-a-congregation-that-is-politically-divided-and-keep-the-gospel-central` | How to Pastor a Congregation That is Politically Divided and Keep the Gospel Central | b |
| `14-how-to-preach-the-same-gospel-to-people-who-are-nothing-alike` | How to Preach the Same Gospel to People Who are Nothing Alike | b |
| `preaching-to-a-divided-room` | How to Preach to a Politically Divided Church | b |
| `how-to-preach-to-people-who-have-heard-it-all` | How to Preach to People Who Have Heard It All | b |
| `how-to-raise-children-in-the-faith` | How to Raise Children in the Faith Without Crushing Them | b |
| `how-to-read-the-bible-devotionally` | How to Read the Bible Devotionally | b |
| `reading-the-bible-slowly` | How to Read the Bible Slowly, the Old Way | b |
| `how-to-read-the-bible-without-making-it-say-what-you-want` | How to Read the Bible Without Making It Say What You Want | b |
| `how-to-rest-in-a-culture-of-exhaustion` | How to Rest in a Culture of Exhaustion | b |
| `3-how-to-return-to-ministry-after-burning-out` | How to Return to Ministry After Burning Out | b |
| `how-to-revitalize-a-dying-church` | How to Revitalize a Dying Church | b |
| `how-to-talk-about-faith` | How to Talk About Faith Without Being Weird | b |
| `40-how-to-talk-about-global-missions-in-a-way-that-actually-moves-your-congregation` | How to Talk About Global Missions in a Way That Actually Moves your Congregation | b |
| `30-how-to-talk-about-political-divisiveness-from-the-pulpit-without-destroying-your-church` | How to Talk About Political Divisiveness From the Pulpit without Destroying your Church | b |
| `how-to-talk-kids-faith-doubt` | How to Talk to Your Kids About Faith When You're Not Sure Yourself | b |
| `parenting-talking-about-sex-and-identity` | How to Talk to Your Kids About Sex and Identity | b |
| `is-god-real` | Is God Real? An Honest Assessment | b |
| `is-poverty-political-the-bibles-answer` | Is Poverty Political? The Bible's Uncomfortable Answer | b |
| `the-numbers-behind-the-decline` | Is the Church Really Dying? What the Numbers Say | b |
| `what-a-christian-owes-the-city` | What a Christian Owes the City | b |
| `34-what-a-healthy-pastor-referral-network-actually-looks-like` | What a Healthy Pastor Referral Network Actually Looks Like | b |
| `2-what-a-sabbatical-is-and-why-your-church-should-require-one` | What a Sabbatical is and why your Church Should Require One | b |
| `what-the-resurrection-changes` | What Actually Changes If Jesus Rose | b |
| `what-dies-when-christendom-dies` | What Actually Dies When Christianity Loses Power | b |
| `why-baptism` | What Baptism Is Actually For | b |
| `calvinism-and-arminianism` | What Calvinism and Arminianism Actually Argue About | b |
| `what-christian-nationalism-is-and-is-not` | What Christian Nationalism Is and What It Is Not | b |
| `christianity-and-islam` | What Christianity and Islam Actually Dispute | b |
| `what-christians-believe-about-hell` | What Christians Actually Believe About Hell | b |
| `what-christians-can-learn-from-buddhism` | What Christians Can Learn From Buddhism | b |
| `what-christians-can-learn-from-indigenous-spirituality` | What Christians Can Learn From Indigenous Spirituality | b |
| `what-christians-can-learn-from-islam` | What Christians Can Learn From Islam | b |
| `what-christians-can-learn-from-judaism` | What Christians Can Learn From Judaism | b |
| `what-evangelicalism-was-supposed-to-be` | What Evangelicalism Was Supposed to Be | b |
| `what-fatherhood-requires` | What Fatherhood Requires | b |
| `the-cost-of-following` | What Following Jesus Actually Costs | b |
| `what-following-this-actually-costs` | What Following This Actually Costs | b |
| `27-what-gen-z-actually-wants-from-a-church-and-why-its-not-what-you-think` | What Gen Z Actually Wants From a Church and why Its Not what you Think | b |
| `the-historical-jesus` | What Happened to the Historical Jesus | b |
| `38-what-i-learned-about-unity-from-pastoring-across-cultural-lines` | What I Learned About Unity From Pastoring Across Cultural Lines | b |
| `what-is-the-kingdom-of-god-and-why-it-changes-everything` | What Is the Kingdom of God | b |
| `what-is-vocation-work-as-calling` | What Is Vocation? Work as Calling | b |
| `being-filled-with-the-spirit` | What It Means to Be Filled With the Spirit | b |
| `what-it-means-to-bear-the-image-of-god` | What It Means to Bear the Image of God | b |
| `what-james-5-says` | What James 5 Says | b |
| `what-jesus-said-about-worry-and-money` | What Jesus Said About Worry and Money | b |
| `what-jesus-said-the-good-life-is` | What Jesus Said the Good Life Actually Is | b |
| `what-jubilee-means` | What Jubilee Means | b |
| `11-what-pastors-need-to-know-about-depression-and-why-its-not-a-faith-problem` | What Pastors Need to Know About Depression and why Its Not a Faith Problem | b |
| `37-what-predominantly-white-churches-get-wrong-when-they-talk-about-diversity` | What Predominantly White Churches Get Wrong when They Talk About Diversity | b |
| `what-render-unto-caesar-actually-means` | What Render Unto Caesar Actually Means | b |
| `what-secular-explanations-still-have-to-explain` | What Secular Explanations Still Have to Explain | b |
| `what-silence-costs-a-marriage` | What Silence Actually Costs a Marriage | b |
| `19-what-small-churches-get-right-that-large-churches-rarely-talk-about` | What Small Churches Get Right That Large Churches Rarely Talk About | b |
| `what-the-bible-says-about-money` | What the Bible Actually Says About Money | b |
| `what-the-bible-actually-says-about-money-and-wealth` | What the Bible Actually Says About Money | b |
| `what-the-bible-means-by-reconciliation` | What the Bible Means by Reconciliation | b |
| `what-the-bible-says-about-submission` | What the Bible Really Says About Submission in Marriage | b |
| `ordinary-time` | What the Boring Middle of the Year Teaches You | b |
| `44-what-the-church-in-the-global-south-can-teach-the-church-in-america-about-suffering` | What the Church in the Global South Can Teach the Church in America About Suffering | b |
| `what-the-creed-leaves-out` | What the Creed Refuses to Argue About | b |
| `silence-and-solitude` | What the Desert Fathers Knew About Silence | b |
| `christendom-is-ending` | What the End of Christian America Actually Means | b |
| `what-the-original-audience-heard` | What the First Readers of the Bible Actually Heard | b |
| `what-the-gospel-actually-is` | What the Gospel Actually Is | b |
| `what-the-miracles-mean` | What the Miracles Were Actually For | b |
| `what-new-atheists-got-right` | What the New Atheists Got Right | b |
| `what-the-reformation-actually-changed` | What the Reformation Actually Changed | b |
| `the-resentment-in-your-marriage` | What the Resentment in Your Marriage Is Telling You | b |
| `what-the-sabbath-is-and-why-you-need-it` | What the Sabbath Is and Why You Need It | b |
| `29-what-the-scandals-in-the-church-are-teaching-us-about-accountability` | What the Scandals in the Church are Teaching Us About Accountability | b |
| `dark-night-god-feels-absent` | What to Do When God Feels Absent | b |
| `when-prayer-goes-unanswered` | What to Do When Prayer Goes Unanswered | b |
| `what-we-owe-generations` | What We Owe Generations | b |
| `what-we-owe-ones-after` | What We Owe Ones After | b |
| `constantines-bargain` | What You're Really Leaving When You Leave the Faith | b |
| `the-pastors-kids-are-watching` | What Your Kids Learn on the Drive Home From Church | b |
| `6-what-your-spouse-wishes-you-knew-about-life-in-the-parsonage` | What your Spouse Wishes you Knew About Life in the Parsonage | b |
| `31-when-a-church-split-happens-surviving-it-learning-from-it-moving-forward` | When a Church Split Happens Surviving it Learning From it Moving Forward | b |
| `when-fear-rewrites-theology` | When Fear Starts Rewriting What You Believe | b |
| `when-fire-someone-with-integrity` | When Fire Someone with Integrity | b |
| `cheap-grace-left-hand` | When Forgiveness Only Flows One Way | b |
| `when-god-bless-america-replaces-thy-kingdom-come` | When God Bless America Replaces Thy Kingdom Come | b |
| `when-god-doesnt-make-sense` | When God Stops Making Sense | b |
| `the-weight-that-stays` | When Grief Doesn't Lift | b |
| `right-side-of-history` | When History Becomes Your God | b |
| `21-when-is-it-time-to-revitalize-and-when-is-it-time-to-replant` | When is it Time to Revitalize and when is it Time to Replant | b |
| `when-justice-becomes-a-gospel` | When Justice Becomes a Gospel | b |
| `when-man-pulpit-falling-apart` | When Man Pulpit Falling Apart | b |
| `when-marriage-becomes-a-mirror` | When Marriage Becomes a Mirror | b |
| `protecting-marriage-in-ministry` | When Ministry Is Quietly Killing Your Marriage | b |
| `when-one-partner-has-grown` | When One Partner Has Grown | b |
| `emotional-labor-in-marriage` | When One Spouse Carries the Marriage Alone | b |
| `when-politics-replaced-theology` | When Politics Replaced Theology | b |
| `when-preaching-gets-stale` | When Preaching Gets Stale | b |
| `when-romance-left-covenant-remains` | When Romance Left Covenant Remains | b |
| `when-shepherd-needs-shepherding` | When Shepherd Needs Shepherding | b |
| `when-the-calling-costs-more` | When the Calling Costs More Than They Told You | b |
| `49-when-the-church-becomes-a-political-brand-and-how-to-step-back-from-the-edge` | When the Church Becomes a Political Brand and how to Step Back From the Edge | b |
| `when-the-church-is-what-hurt-you` | When the Church Is the Thing That Hurt You | b |
| `5-when-the-man-in-the-pulpit-is-falling-apart` | When the Man in the Pulpit is Falling Apart | b |
| `25-when-to-fire-someone-and-how-to-do-it-with-integrity` | When to Fire Someone and how to Do it with Integrity | b |
| `when-to-fire-someone-in-ministry` | When to Fire Someone in Ministry | b |
| `when-you-married-someone-you-no-longer-recognize` | When You No Longer Recognize the Person You Married | b |
| `when-your-child-asks-a-question` | When Your Child Asks a Question You Can't Answer | b |
| `parenting-when-your-child-doubts-or-walks-away` | When Your Child Doubts or Walks Away | b |
| `when-the-pulpit-became-a-precinct` | When Your Church Became a Voting Bloc | b |
| `when-elders-are-loyal-to-a-party` | When Your Church Leaders Serve a Party First | b |
| `family-and-faith-transitions` | When Your Family Thinks You've Lost Your Mind | b |
| `15-when-your-preaching-gets-stale-and-what-to-do-about-it` | When your Preaching Gets Stale and what to Do About it | b |
| `teenager-losing-faith` | When Your Teenager Says They Don't Believe Anymore | b |
| `where-church-was-silent` | Where Church Was Silent | b |
| `a-day-of-doing-nothing` | Why a Day of Doing Nothing Is an Act of Defiance | b |
| `strongman-theology` | Why a Frightened Church Wants a King | b |
| `why-hope-is-not-wishful-thinking` | Why Christian Hope Is Not Wishful Thinking | b |
| `why-faith-uses-physical-things` | Why Christianity Uses Bread, Water, and Wine | b |
| `why-christians-confess-out-loud` | Why Christians Confess Their Sins Out Loud | b |
| `why-christians-fast` | Why Christians Fast (and Why You Probably Stopped) | b |
| `why-churches-close-and-what-comes-next` | Why Churches Close, and What Comes Next | b |
| `fighting-fair-is-not-enough` | Why Fighting Fair Isn't Enough to Save a Marriage | b |
| `why-gen-z-is-coming-back-to-church` | Why Gen Z Is Coming Back to Church | b |
| `why-god-started-with-one-family` | Why God Started With One Family | b |
| `why-the-incarnation-matters` | Why It Matters That God Became a Baby | b |
| `why-hearing-isnt-enough` | Why Just Agreeing With Jesus Isn't Enough | b |
| `why-pastors-are-leaving-ministry` | Why Pastors Are Leaving Ministry | b |
| `why-pastors-quit` | Why Pastors Quit | b |
| `why-pastors-quit-and-how-to-stay` | Why Pastors Quit and how to Stay | b |
| `why-people-are-leaving-the-church` | Why People Are Leaving the Church | b |
| `why-people-fled-to-the-desert` | Why People Fled to the Desert to Find God | b |
| `why-poverty-political` | Why Poverty Political | b |
| `why-the-bible-is-one-story-not-66-books` | Why the Bible Is One Story, Not Sixty-Six Books | b |
| `why-the-church-lost-the-culture-war` | Why the Church Lost the Culture War | b |
| `church-must-speak-housing` | Why the Church Must Speak About Housing | b |
| `the-sin-we-stopped-naming` | Why the Church Stopped Talking About Sin | b |
| `why-the-prophets-made-everyone-uncomfortable` | Why the Prophets Made Everyone Uncomfortable | b |
| `why-there-are-so-many-christian-denominations` | Why There Are So Many Christian Denominations | b |
| `the-whole-counsel` | Why You Can't Cherry-Pick the Bible | b |
| `28-why-young-adults-are-coming-back-to-church-and-how-not-to-lose-them-again` | Why Young Adults are Coming Back to Church and how Not to Lose Them Again | b |
| `why-young-adults-arent-coming-back` | Why Young Adults Aren't Coming Back | b |
| `why-your-church-should-require-a-sabbatical` | Why Your Church Should Require a Sabbatical | b |
| `what-is-biblical-justice-mishpat-and-tsedaqah` | What Is Biblical Justice? Mishpat and Tsedaqah | bc |
| `angels-demons-and-the-unseen` | What the Bible Says About Angels, Demons, and the Unseen | bc |
| `what-the-bible-says-about-immigrants-and-refugees-in-depth` | What the Bible Says About Immigrants and Refugees | bc |
| `what-the-bible-says-about-spiritual-gifts` | What the Bible Says About Spiritual Gifts | bc |
| `what-the-bible-says-about-the-poor-and-the-stranger` | What the Bible Says About the Poor and the Stranger | bc |
| `what-went-wrong` | What the Bible Says Actually Went Wrong With the World | bc |
| `41-when-short-term-mission-trips-help-and-when-they-hurt` | When Short Term Mission Trips Help and when They Hurt | bc |
| `are-miracles-believable` | Are Miracles Believable? | bd |
| `meaning-without-god` | Can a Life Mean Anything Without God? | bd |
| `apologetics-can-a-reasonable-person-believe-in-miracles` | Can a Reasonable Person Believe in Miracles? | bd |
| `women-in-ministry` | Can a Woman Preach? | bd |
| `teen-can-you-actually-trust-the-bible` | Can You Actually Trust the Bible? | bd |
| `can-you-be-a-christian-alone` | Can You Be a Christian on Your Own? | bd |
| `can-you-be-good-without-god` | Can You Be Good Without God? | bd |
| `can-you-lose-your-salvation` | Can You Lose Your Salvation? | bd |
| `two-kingdoms-one-pledge` | Can You Pledge Allegiance to Two Kingdoms? | bd |
| `can-you-trust-the-bible` | Can You Trust the Bible? | bd |
| `did-god-command-genocide` | Did God Command Genocide? | bd |
| `did-the-resurrection-happen` | Did the Resurrection Actually Happen? | bd |
| `teen-did-the-resurrection-actually-happen` | Did the Resurrection Actually Happen? | bd |
| `cessationism-or-continuation` | Do the Gifts Still Happen? | bd |
| `faith-and-science` | Do You Have to Choose Between Faith and Science? | bd |
| `does-god-actually-exist` | Does God Actually Exist? | bd |
| `does-god-change-his-mind` | Does God Change His Mind? | bd |
| `predestination-and-free-will` | Does God Choose Us, or Do We Choose Him? | bd |
| `does-hell-exist` | Does Hell Exist, and How Could a Loving God Allow It? | bd |
| `near-death-experiences` | Does the Evidence for Near-Death Experiences Prove Anything? | bd |
| `apologetics-how-can-a-loving-god-allow-hell` | How Can a Loving God Send Anyone to Hell? | bd |
| `the-trinity-plainly` | How Can God Be Three and One? | bd |
| `fully-god-fully-human` | How Can Jesus Be Both God and Human? | bd |
| `how-do-you-actually-change` | How Do You Actually Change? | bd |
| `how-do-you-actually-pray` | How Do You Actually Pray? | bd |
| `how-to-find-a-church-worth-joining` | How Do You Find a Church Worth Joining? | bd |
| `forgiveness-without-pretending` | How Do You Forgive Without Pretending It Didn't Happen? | bd |
| `pastoring-a-captured-congregation` | How Do You Pastor a Church Addicted to Cable News? | bd |
| `how-to-read-genesis-one` | How Should a Christian Read Genesis 1? | bd |
| `affirmation-is-not-love` | Is Affirmation the Same as Love? | bd |
| `is-faith-irrational` | Is Believing Anything on Faith Irrational? | bd |
| `is-faith-just-wishful-thinking` | Is Faith Just Wishful Thinking? | bd |
| `is-god-angry` | Is God Angry? | bd |
| `is-hell-eternal` | Is Hell Forever, or Does It End? | bd |
| `what-psalms-teach-about-anger-at-god` | Is It Okay to Be Angry at God? | bd |
| `is-jesus-really-the-only-way` | Is Jesus Really the Only Way? | bd |
| `anxiety-and-faith` | Is My Anxiety a Spiritual Failure? | bd |
| `the-persecution-we-invented` | Is the American Church Really Being Persecuted? | bd |
| `authority-we-traded-for-authenticity` | Is the Bible the Final Word, or Am I? | bd |
| `christian-sexual-ethic` | Is the Historic Christian View of Sex Homophobic? | bd |
| `is-there-life-after-death` | Is There Really Life After Death? | bd |
| `is-your-job-just-a-paycheck` | Is Your Job Just a Paycheck, or Something More? | bd |
| `conscience-outsourced-to-party` | Should a Christian Follow a Political Party? | bd |
| `end-of-life-and-bioethics` | Should We Keep People Alive at Any Cost? | bd |
| `apologetics-what-about-those-who-never-heard` | What About People Who Never Heard of Jesus? | bd |
| `what-about-those-who-never-heard` | What About Those Who Never Heard? | bd |
| `what-happens-at-communion` | What Actually Happens at Communion? | bd |
| `the-holiness-of-god` | What Does It Mean That God Is Holy? | bd |
| `faith-and-gender-identity` | What Does the Church Owe Transgender People? | bd |
| `what-does-the-holy-spirit-do` | What Does the Holy Spirit Actually Do? | bd |
| `deconstruction-without-reconstruction` | What Happens After You Deconstruct Your Faith? | bd |
| `what-if-we-are-wrong` | What If Christianity Is Wrong? | bd |
| `done-with-church-not-jesus` | What If You're Done With Church but Not With Jesus? | bd |
| `what-is-advent` | What Is Advent, and Why Wait for Something That Already Happened? | bd |
| `what-is-church-actually-for` | What Is Church Actually For? | bd |
| `what-is-heaven-actually-like` | What Is Heaven Actually Like? | bd |
| `personhood-in-the-age-of-ai` | What Makes Us Human in the Age of AI? | bd |
| `christians-and-abortion` | What Should Christians Think About Abortion? | bd |
| `apologetics-where-does-morality-come-from` | Where Do Right and Wrong Even Come From? | bd |
| `the-theology-of-saturday` | Where Is God on Holy Saturday? | bd |
| `when-god-is-silent-and-the-room-is-empty` | Where Is God When You're Grieving? | bd |
| `who-did-jesus-claim-to-be` | Who Did Jesus Claim to Be? | bd |
| `who-is-the-holy-spirit` | Who Is the Holy Spirit? | bd |
| `why-christianity` | Why Christianity and Not Something Else? | bd |
| `why-did-jesus-have-to-die` | Why Did Jesus Have to Die? | bd |
| `why-didnt-the-bible-ban-slavery` | Why Didn't the Bible Just Ban Slavery? | bd |
| `suffering-without-explanation` | Why Does God Allow Suffering? | bd |
| `why-does-god-allow-suffering` | Why Does God Allow Suffering? | bd |
| `the-god-who-hides` | Why Does God Hide? | bd |
| `why-the-church-has-a-calendar` | Why Does the Church Have Its Own Calendar? | bd |
| `the-flag-in-the-sanctuary` | Why Is There a Flag in the Sanctuary? | bd |
| `apologetics-why-does-god-allow-evil` | Why Would a Good God Allow So Much Evil? | bd |
| `why-lent` | Why Would Anyone Give Something Up for Lent? | bd |
| `why-christians-recite-creeds` | Why Would Anyone Recite a 1,700-Year-Old Creed? | bd |
| `why-trust-the-bible` | Why Would Anyone Trust the Bible? | bd |
| `a-christian-view-of-personal-finance` | A Christian View of Personal Finance | c |
| `guide-to-every-major-denomination` | A Guide to Every Major Denomination | c |
| `short-term-mission-trips-help-hurt` | Short Term Mission Trips Help Hurt | c |
| `teen-does-science-disprove-god` | Doesn't Science Disprove God? | d |
| `apologetics-hasnt-the-church-done-terrible-things` | Hasn't the Church Done Terrible Things? | d |
| `if-god-is-good-why-suffering` | If God Is Good, Why Is There So Much Suffering? | d |
| `teen-if-god-is-good-why-is-there-suffering` | If God Is Good, Why Is There So Much Suffering? | d |
| `is-god-in-control` | If God Is in Control, Why Doesn't It Feel Like It? | d |
| `apologetics-why-is-god-hidden` | If God Is Real, Why Does He Feel So Hidden? | d |
| `apologetics-isnt-faith-believing-without-evidence` | Isn't Faith Just Believing Without Evidence? | d |
| `teen-isnt-jesus-just-one-way-among-many` | Isn't Jesus Just One Way Among Many? | d |
| `baptism-mode-and-subjects` | Sprinkle or Immerse? Infant or Believer? | d |
| `nostalgia-is-not-the-kingdom` | Was America Ever Really a Christian Nation? | d |
| `was-jesus-just-a-good-teacher` | Was Jesus Really Just a Good Teacher? | d |
| `will-there-be-a-judgment-day` | Will There Really Be a Judgment Day? | d |

</details>

## 6. What could not be verified from here

An empty version of this section would be a red flag. It is not empty.

- **Anything on the live Substack**: name, tagline, About text, accent, theme,
  font, logo, header image, publishing cadence, and the current part number of
  the series. Every Substack fact in the audit came from the public search
  index; §4 is a checklist, not a confirmation.
- **The two production fixes in `api/index.ts`** (the missing
  `subscribers.subscribe` case on the single-call path, and the real feed sync)
  are typechecked and mirror the working batch-path code, but there is no
  database in this environment, so neither was exercised against MySQL. Watch
  the first footer submit and the first admin Sync click on the preview.
- **The series note on an essay page** was verified by the route smoke test
  and unit tests, not by screenshot: essay pages need the API to load a post,
  and the built site has none here. Home, `/substack`, and `/subscribe` were
  screenshotted from the built site and inspected.
- **The edge share card** (`api/og.tsx`) is verified by typecheck and by the
  documented `ImageResponse` fonts contract, not by rendering; the Edge runtime
  is not available locally. The **build-time cards** were rendered (186) and
  one was opened: Cormorant Garamond headline, Inter eyebrow. The fontconfig
  approach is verified on this Linux image, not yet on Vercel's build image.
- **Already-shared links** will keep their old Georgia cards until the OG URL
  changes or the scrapers re-fetch; the card URL was left unversioned to keep
  this change small.
- **The seed testimonials** attribute quotations containing "Livewell" to
  named public figures with placeholder images. They were left untouched and
  allowlisted; whether to keep unverified attributed quotations at all is your
  call, and the Content Integrity rule points toward removing them.
