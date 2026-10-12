# Library flags: what the care-page writers found elsewhere

While writing and reviewing the Find Help care pages, the writers and second-pass
editors opened every page they linked and many they considered linking. They found
problems in pages outside the care pages. Some were plain errors in the platform's
own libraries, and those were corrected in this batch (the first table). The rest
sit in James's essays, the theology pages, and the tools, where the question is
whether a sentence is his own true story or his own landing. Those were not
edited, except the Test the Case tool, whose first-person lines were generalized
(its section below keeps every original); they are listed here for him to decide.

No care page repeats or relies on any sentence below. Where a flagged page was
the best resource for a reader, it stayed in a kit under its true title, after
cleaner resources; otherwise it was dropped from the kit.

## Corrected in this batch

| Where | What it said | What it says now |
|---|---|---|
| `/life/infertility-and-childlessness` | "Hannah and Elizabeth and the mother of Samuel" (Hannah is Samuel's mother) | "the mother of Samson" (Judges 13) |
| `/how-tos/sf-how-to-build-a-rule-of-life` | *regula* is "the same root as *trellis*" (it is not) | *regula* is a straightedge; the trellis is kept as a picture |
| `/how-tos/sf-how-to-deal-with-anger` | anger that "has ever turned physical" goes to "an anger management program" | physical anger or a home afraid of you goes to the Domestic Violence Hotline and a program for people who have harmed a partner, not anger management or couples counseling |
| Nine library files (wisdom topics, justice, church and power, Everyday Life, study guides) | "the church built the first hospitals"; "Christians founded the first hospitals, the first orphanages..." | "some of the earliest hospitals" or "hospitals" |
| `/life/health-illness-and-pain` | "The Council of Nicaea directed that hospitals be built in every cathedral town" (that comes from later Arabic canons, not the council's own) | removed |
| Six places (how-to, study guides, wisdom, Everyday Life) | "Jesus sweat blood" | his sweat fell "like drops of blood" (Luke 22:44) |
| Eight Weeks of Facing What Is Coming, week 6 | Psalm 23's "the man who wrote it" | the psalm "bears the name of a shepherd" |
| Wisdom topic on the difficult family | "Augustine wept over his pagan father and prayed his way toward his mother" | Monica prayed for a pagan husband and a wayward son and saw both baptized |
| `/how-tos/world-how-to-disagree-about-politics-with-people-you-love` | Simon "a zealot who wanted Rome overthrown" (disputed); "at a rate our grandparents would not recognize" (unsupported) | "Simon, called the Zealot"; the comparison removed from the body and the excerpt |
| The Skeptic's Track, stop 5 | "Inerrancy is a fairly recent dogma" (took a side, and described a different essay) | a neutral description of the stop |
| Test the Case, the Gospels case | Jesus's divinity "is sitting in" 1 Corinthians 15 (it is not stated there) | Paul's early letters call Jesus Lord and speak of him in the form of God (Philippians 2:6) |
| Family devotions (72) and the family catechism (76) | Scripture in an unnamed, unchecked translation | the Berean Standard Bible word for word, labeled, and gated by `scripts/validate-family.mjs` |
| `/life/anger-and-the-hot-heart` | anger that hurts a partner: "Tell a pastor and a counselor this week, get help, and if anyone is in danger, get them to safety." | the Domestic Violence Hotline, which talks with people worried about their own behavior and points to a program for people who have harmed a partner (not anger management or couples counseling); for children who are afraid or hurt, their safety and a doctor or counselor this week, as the anger care page says; in every case a pastor and a licensed counselor; 911 if anyone is in danger. The page's help block now carries the Hotline's line (`lifeTopics` in `client/src/data/sensitive-pages.json`; the abuse topic also brings RAINN's, as it does on the study guides), as do the life pages on divorce, marriage, and addiction for the lines their text names. `/life/identity-and-worth` and `/life/marriage-the-long-covenant`, which name 988 or the Hotline in their text, now show the help block at all |
| `/life/wisdom-for-all-of-life` | "A full third of the Old Testament, the books of Proverbs, Ecclesiastes, and Job" (they are nowhere near a third) | "Whole books of the Old Testament, Proverbs, Ecclesiastes, and Job" |
| `/how-tos/ss-how-to-find-hope-when-nothing-changes` | Paul wrote "from a prison cell he was never released from" (whether he was released from his first Roman imprisonment is disputed) | "in chains, not knowing whether he would live or die (Philippians 1:13, 20-21)"; the same page's two quotations of Lamentations 3:22-23 now match the BSB ("His mercies never fail. They are new every morning") |
| Wisdom topic on people-pleasing (`/wisdom/people-pleasing`) | dates Galatians "around the year 49" (the date is disputed) | the date removed |
| The slavery texts context guide | "My own denomination, the Southern Baptist Convention," (speaks for James's tradition) | "The Southern Baptist Convention" |
| `/how-tos/body-how-to-rhythms-of-work-and-rest` (body and summary); `/life/the-body-and-the-rhythms`; `/life/rest-and-the-sabbath`; `/life/retirement-and-the-last-third`; `/life/facing-death` | "the first society in human history" (or "in the history of the world", or "in history to hand millions of healthy people two or three decades") with no rhythm of rest, with retirement, or organized around not seeing death; "most adults have never once been in the room when a person died" (no source) | "few societies before ours"; "many adults" |
| `/how-tos/wm-how-to-rest-when-you-feel-you-cannot-stop` | Sabbath "is a command you obey", "the cure God prescribed", "obey into it" (settles a question faithful churches answer differently) | Sabbath as a gift received; a paragraph naming the three readings, each with its texts (the Lord's Day, Acts 20:7 and Revelation 1:10; a pattern of rest, Genesis 2:2-3 and Mark 2:27; Christ as the rest it pointed to, with the day a matter of conscience, Romans 14:5-6, Colossians 2:16-17, and Hebrews 4:9-10), and leaving the question open; "Sabbath comes on the seventh day" now "For Israel, Sabbath came"; Israel's fallow-year trust no longer "governs your rest"; "The world will be there Monday" now "when you come back to it" |
| The Reading Scripture in Context guides | first-person stories, an unsourced "hundreds of millions" survey figure in the miracles guide, and four factual slips (Burridge's sample, the Diatessaron, the Hilarion letter's date, a Walton attribution) | generalized, cut, or corrected; every change is in `ledger-context-guides.md` |
| Wisdom topics on fear of the future and on the news | "Most of what we dread never arrives"; Jeremiah 29:11 as a standalone promise; Corrie ten Boom survived "a Nazi camp her family did not"; "do not be afraid" called Scripture's most frequent command; the City of God written "as Rome itself was sacked in 410" | "Some of what we dread is real"; Lamentations 3:22-23 in its place; the Ravensbrück camp, where her sister Betsie died; "again and again"; Augustine "answered the sack of Rome in 410 with the City of God" |
| `/life/grief-and-loss` | Psalm 22 as "words David wrote"; Psalm 88 in another translation's words; "We are the first society that expects its members to grieve privately... our soaring rates of complicated grief" | "a psalm that bears David's name"; the BSB wording; "Few societies before ours..." with "much of our complicated grief" |
| `/life/friendship-against-isolation`; `/how-tos/rel-how-to-build-deep-friendships-as-an-adult` | "The survey numbers are grim, close friendships shrinking by every measure for decades, the share of men reporting no close friends at all multiplying several times over since the nineties"; "Most adults are lonely"; "Most adults never make the switch"; "would die before admitting it" (on a page sent to lonely readers) | "Surveys suggest close friendships have thinned for decades, and that more men now say they have no close friend at all"; "Many adults" (twice); "would never admit it" |
| Two how-tos, on witness to family and on praying for people who do not believe | Monica prayed "for decades" and "did not live to see the full fruit" | "for years"; she "lived to see him baptized only months before she died" (Confessions IX) |
| Two how-tos; `/life/money-and-the-heart`; `/life/money-and-possessions-in-society`; `/life/justice-and-the-poor`; the Contentment and Undivided Life study guides | Jesus said more about money "than about heaven and hell combined" (five times in the Undivided Life guide), "than almost anything else", "than about almost any other subject"; "Count the words"; Jesus spoke of money "in something like one of every ten verses he uttered"; "more material in the Bible about wealth, poverty, and justice than about almost any other subject. By any honest count it dwarfs..."; "the data is hard to ignore" (popular counts no one has shown) | he "spoke about money again and again", or "as often as he did"; on `/life/money-and-the-heart`, "he raised it again and again" ("Count the words" cut); on `/life/money-and-possessions-in-society`, "The Bible says a great deal about money and possessions" (the verse count cut); on `/life/justice-and-the-poor`, "The Bible says a great deal about wealth, poverty, and justice, far more than the topics we have made central would lead anyone to expect"; in the Undivided Life guide, "But Jesus saw deeper." The Contentment guide also no longer says 1 Timothy was written "from the prison" |
| `/life/waiting-and-unanswered-prayer`; `/life/suffering-and-the-silence-of-god`; `/life/the-anxious-mind` | Mischel "established" waiting as among "the most important predictors of a flourishing life"; trauma research "established" that suffering "is stored in the body"; "Van der Kolk showed"; "David says his bones wasted away" (twice) | "suggested" a link, then "Later replications found the link to later flourishing weaker than first reported"; "Trauma research, Bessel van der Kolk's above all, argues"; "Van der Kolk argues"; "Psalm 32, which bears David's name" |
| The Resurrection study guide, session 2 | the minimal facts accepted by "almost the entire field of scholarship" | "most scholars, believing and unbelieving alike" |
| The Prayer Generator; the Conflict Guide | an evening prayer asking God to "do the work in me" (a forbidden phrase); "We are going to lose everything" called "almost certainly not true" | "do in me what only rest and Your Spirit can do"; "Most of the time it is not, and even when the danger is real..." |
| The monthly budget printable: its `/downloads` blurb, its label on the money care page, and its own instruction | "starting with what you will give and save, then the rest"; "A monthly budget worksheet to print, starting with what you will give and save"; "then decide first what you will give and save... and then plan the rest" (the sheet begins with what comes in, and how to order a budget is the reader's call) | "what comes in, what you will give and save, and where the rest goes"; "what comes in, what you give and save, and where the rest goes"; "decide what you will give and save... and plan the rest" |

The how-to fixes were made in their sources, `scripts/articles/*.json`, because the
deploy regenerates `client/public/howtos/` from those files.

## For James: first-person stories in essays and pages

Each of these tells a story in James's voice that no one but James can confirm. If
it is true and his, it stays. If not, it should be generalized or cut, the way the
three sweeps in this folder handled the study guides, the Grow libraries, and the context guides.

| Page | The line or story |
|---|---|
| `/writing/excavation-not-demolition` | people at his table; sermons "with my name on them"; a shelf of books |
| `/writing/deconstruction-without-reconstruction` | "At nineteen I built an atheism"; "thirty years" |
| `/writing/what-the-creed-leaves-out`, `/writing/why-christians-recite-creeds` | what surprised him on his way in from unbelief; "I stood in a room..." |
| `/writing/done-with-church-not-jesus` | coffee-shop conversations |
| `/writing/the-church-and-domestic-violence` | "I have sat with women who stayed..." (it also prints a statistic) |
| `/writing/is-it-okay-to-be-angry-at-god` | "I have sat with people... still raw in the tenth year" |
| `/writing/outrage-is-not-a-spiritual-gift` | a phone anecdote ("I caught myself last week") and a line about his sons |
| `/writing/is-god-angry` | first-person details; an unverified Heschel quotation; calls D. A. Carson "British" (he was born in Montreal) |
| `/writing/ordinary-time` | "the hospital visits no one saw" |
| `/writing/grace-is-not-a-feeling` | "The grace that actually saved me..." |
| `/writing/ruth-gleaning-laws` | his food-bank and coat-drive work |
| `/writing/how-to-find-gods-will-for-your-career` | a young man in his office |
| `/writing/when-prayer-goes-unanswered` | pastors answering "with a smile"; a Keller line that "has steadied me"; also calls Paul the man who "wrote half the New Testament" and paraphrases C. S. Lewis without a source |
| `/writing/should-we-keep-people-alive-at-any-cost`, `/writing/do-the-gifts-still-happen`, `/writing/cessationism-or-continuation` | hospital and deathbed stories |
| `/writing/baptism-mode-and-subjects` | his own adult baptism; standing at others' fonts |
| `/writing/why-baptism` | "the tradition I serve in" (speaks for a tradition) |
| `/writing/the-cost-of-following` | "I spent years defending..." |
| `/writing/how-to-raise-children-in-the-faith` | a son doubting at fourteen at the dinner table |
| `/writing/parenting-family-rhythms-that-form-faith`, `/writing/parenting-teaching-kids-to-pray-and-read-scripture` | what he learned from his sons at bedtime; "the counsel I most failed to take for years" |
| `/writing/teenager-losing-faith` | closes "It was not the end of mine" |
| `/writing/formed-by-screens-technology-and-the-soul` | opens with a story about his youngest son |
| `/writing/anxiety-and-faith` | "I have watched this done, and I am not going to pretend I have always preached it better" (kept as a study pairing: self-implication rather than a told story) |
| Essays 2, 10, and 34 on pastoral care and referral (and their duplicates `healthy-pastor-referral-network`, `okay-to-see-counselor`) | a couple in financial crisis; "a pastor I know"; "I have made the other mistake" (essay 10's stored title also lacks its apostrophes) |
| `/writing/depression-in-the-pulpit`, `/writing/mental-health-and-the-church-beyond-pray-about-it`, `/writing/the-pastor-nobody-checks-on` | a season of depression in his voice; "A woman sat across from me in my office..." |
| "How the Church Handles Mental Health (Badly)" | opens on a real family's loss; calls Psalm 42 David's (it bears the name of the sons of Korah) |
| `/writing/why-christians-fast`, `/writing/why-lent`, `/writing/why-the-church-has-a-calendar`, `/writing/easter-is-not-a-day`, `/writing/isaiah-58-demands` | "I had never been hungry on purpose..."; "the objection I once made myself"; "I have kept Easter as a single Sunday for most of my life"; first-person ministry claims (`why-lent` also says "James puts it as bluntly as anyone" for the letter of James) |
| `/writing/natural-evil-and-animal-suffering`, `/writing/how-the-story-ends` | gravesides, the back pew, "more gravesides than I can count" |
| `/writing/why-pastors-quit`, `/writing/the-loneliest-room-in-the-church`, `/writing/protecting-marriage-in-ministry`, `/writing/the-pastors-kids-are-watching`, `/writing/why-your-church-should-require-a-sabbatical`, and the numbered pastoral essays 2 (sabbaticals), 3 (returning after burnout), 7 (marriage), and 11 (depression) | first-person events, "a pastor I know", "a couple I know"; the first two also make claims about what the Pastors Connection Network was built to do, and "forty miles from seven thousand" |
| `/writing/dark-night-god-feels-absent` | "The people I have buried..."; the doubt care page no longer links it |
| `/writing/a-whole-life` | "my wife", "a man with a wedding ring", a sermon-notes story, "fifteen years" (it also cites Pew and Eusebius figures) |
| `/writing/interfaith-marriage` | a counseling line; a made-up quotation in double quotes; an unsourced Pew figure |
| `/writing/the-covenant-you-didnt-understand` | "I have watched couples..." |
| `/writing/why-trust-the-bible`, `/writing/the-bible-without-the-marketing` | "I lived inside that story for years"; ages nineteen and twenty-four |
| The Nicaea essay; the inerrancy and infallibility essay | "I have preached that sermon, on tired weeks"; "I have used the high doctrine as a club" |
| `/writing/what-the-gospel-actually-is` | narrates its author's preaching |
| `/writing/did-the-resurrection-happen` | "I came to this evidence as an enemy of it" (it also overstates scholarly agreement) |
| The Skeptic's Track; the Believe study guide | the Track hands its studies to "the version of me that was an atheist" (the approved fact, kept as stance); the Believe guide has named case-study people, such as "an attorney named Marcus". The skeptic plan's intro, the Questions Skeptics Ask summary, and Test the Case now give only the bare fact that he came to faith from atheism |
| Theology pages: inerrancy, scripture, revelation, the New Testament canon, the Apocrypha, miracles, the Holy Spirit, anthropology, last things | land contested questions in his voice ("I land near the open but cautious center") and tell stories ("twenty years of conversations", "I have buried enough doubts", "I have prayed beside dying believers", "I lay on hands") |
| `/writing/book-ruth-gleaning-laws` | reads the gleaning laws as economic law with redistributive intent and answers the objection about modern safety nets ("the direction of the leap is not in question"), which lands a contested political question in his voice; the caregiving study guide no longer pairs with it |
| `/writing/what-the-original-audience-heard`; `/writing/prophetic-imagination`; `/writing/incarnation-changes-everything`; `/writing/what-is-heaven-actually-like` | land contested questions in his voice (the reading of Genesis 1; how a congregation should name wages and poverty; whether evangelism comes before care for bodies; whether creation is renewed or replaced), and the third tells his own ministry story ("I have preached incarnation for years..."); the Advent study guide no longer pairs with them |
| Study guides: Heaven and Hell; Baptism and Communion, session 2 | his landing on hell ("Bell holds the first two in tension and trembles"); his landing on believer's baptism |

## Test the Case: first-person lines generalized

The Test the Case tool (`client/src/data/argumentCases.ts`) told James's years as an
atheist in detail: arguments he made, what he believed and never checked, what he
found underneath. Each line was generalized so the argument still stands without the
biography. If a line is his own true story, put the original back.

| Original (verbatim) | Now |
|---|---|
| For years this was one of my own hardest reasons to reject the whole thing. | For many thoughtful people it is the hardest reason of all to reject the whole thing. |
| I have known unbelievers who loved their spouses with a fidelity that shamed the elders of my church and faced a terminal diagnosis with a steadiness I would want at my own bedside. | Many unbelievers love their spouses with a faithfulness that puts plenty of churchgoers to shame, and face a terminal diagnosis with a steadiness anyone would want at their own bedside. |
| I believed all three when I was an unbeliever, and I had checked none of them. | Many people believe all three, and few have checked any of them. |
| This one I have to answer against myself, because for years I made it, and I made it well. | This one deserves an answer at full strength, because it is made often, and made well. |
| Some do, and you should say so, and I was a believer's mirror image who wanted it not to be true. So here is the only fair test. | Some do, and you should say so. But the suspicion cuts both ways, because some unbelievers want it not to be true. So here is the only fair test. |
| I ran the projection test on everyone but me for years, and underneath, where I did not look, was a man who found a Godless universe not a grief but a relief. The crutch was real. It was just in my other hand. | It is easy to run the projection test on everyone but yourself, and to miss that a godless universe can feel less like a grief than a relief. The crutch can be in either hand. |
| I used to think this was the humble, obvious position, and that the people who denied it were arrogant. It turned out to be almost the reverse, and it took me years to see it. | It can look like the humble, obvious position, and the people who deny it can look arrogant. On a closer look it is almost the reverse. |
| I called my own position pure reason for years and had never counted the enormous faith underneath it, invisible the way water is invisible to the fish. | It is easy to call one's own position pure reason and never count the enormous faith underneath it, invisible the way water is invisible to the fish. |
| I was an atheist, and I built a real and meaningful life without God, so I am not going to insult you by pretending you cannot. | I came to faith from atheism, and I know a person can build a real and meaningful life without God, so I am not going to insult you by pretending you cannot. |
| That is not an insult. I did the same for years. | That is not an insult. Most of us, believers included, do the same without noticing. |
| Now the timing, which is the thing I had wrong for years. | Now the timing, which is the part most often gotten wrong. |
| and the person who feels it in their body is seeing clearly. I felt it for years. I still feel its edge. | and the person who feels it in their body is seeing clearly. Believers feel it too. I still feel its edge. |
| It costs nothing and offends no one, and for years it was my verdict too. | It costs nothing and offends no one, and it is the verdict of many thoughtful people. |
| That should unsettle anyone. It unsettled me for years. | That should unsettle anyone, and it unsettles believers too. |
| I called my old position pure reason, and I was wrong about it in a way that took me a long time to see. | I came to faith from atheism, and I know how easy it is to call one's own position pure reason and miss the faith underneath it. |
| and I would not have, because the demand would have insulted the man I was. | and I would not ask it, because the demand insults a thinking person. |
| It is the one that cost me the most, and it is not solved in a paragraph. | It is the heaviest of them, and it is not solved in a paragraph. |
| You can decide that is not enough. It was more than I expected to find. | You can decide that is not enough. It may be more than you expect to find. |
| The tell, for me, was the embarrassment. | The tell, for me, is the embarrassment. |
| The comfortable view, the one I held, turns out to be a file | The comfortable view, the one many of us have held, turns out to be a file |

## For James: claims without a source

| Page | The claim |
|---|---|
| `/writing/prosperity-gospel-is-not-the-gospel` | a net worth for a living preacher, an attributed quotation, and a list of named living preachers; the care pages no longer link it |
| `/writing/purity-culture-and-its-wreckage` | that Jesus's teaching is silent on sexual purity (Matthew 5:27-28 is not) |
| The Hard Questions hub | "nearly all" the apostles died for the claim; the empty tomb listed among broadly agreed facts |
| `/writing/can-you-trust-the-bible`; the manuscripts page; Test the Case | "Metzger estimated 99.5 percent" (the figure is usually traced to Geisler and Nix); 5,800 manuscripts, half a million variants, "ninety-nine percent"; "more variants than there are words" |
| `/faq/what-denomination-should-i-join` | 45,000 denominations; "fastest-growing"; a clergy-abuse claim; em-dashes |
| `/faq/is-the-bible-historically-accurate` | "95% agreement" for the Isaiah scroll |
| `/writing/why-pastors-quit`; numbered essays 2 and 11 | a "four in ten" Barna figure; "research consistently shows"; an unsourced Barna claim |
| `/writing/exile-is-not-the-end` | dates Jeremiah's letter to the exiles after 587, but Jeremiah 29:1-3 has it carried by Zedekiah's envoys after the 597 deportation, while the temple still stood; states the Torah's compilation in exile as settled; the fear-of-the-future plan now links the Jeremiah 29:11 context guide instead |
| `/writing/praying-the-words-when-you-have-none` | Bonhoeffer "pressed it from prison" in a 1940 book (he was arrested in April 1943); Psalm 22 "prayed by David" as fact; the church doing this "for three thousand years"; the prayer plan now links the Psalms study guide instead |
| `/writing/the-only-prayer-jesus-taught` | presents Cyprian (about 252) as the earliest full commentary on the Lord's Prayer; Tertullian's On Prayer (about 200) and Origen's (about 233) came first |
| `client/src/data/answers.ts` (an Answer), `client/src/data/money-vocation-articles.ts` (twice), `client/src/data/articles/marriage-guides.json`, and essays in `content-data.json` | Jesus spoke about money "more than he spoke about heaven and hell combined" or "more than about heaven or hell"; the Grow libraries now say he spoke of it "again and again" |
| `/writing/augustine-the-restless-man` | credits *you are what you love* to Tim Keller (it is the title of James K. A. Smith's book) |
| `/writing/why-christians-confess-out-loud` | says *Life Together* was written in 1939 at the seminary (Bonhoeffer wrote it in Göttingen in 1938; it was published in 1939) |
| `/life/unemployment-and-the-lost-job`; `/life/money-and-the-heart`; `/life/dating-and-discernment`; `/life/sex-and-the-body` | unsourced research on unemployment and depression, lottery winners, and dating; reliance on disputed authors |
| `/wisdom/gambling`; `/wisdom/alcohol-and-drinking`; `/wisdom/job-loss`; `/wisdom/toxic-relationships` | unsourced claims about the Reformers and Wesley; a lean to one side; Jeremiah 29:11 without its setting; a hotline number written into prose |
| How-tos: whether to marry someone; thriving as a single Christian | marriages everyone doubted "rarely" turn out well; Hannah "was not rebuked" (Eli did rebuke her, 1 Samuel 1:14) |
| `/life/addiction-and-the-long-road-back` | an unsourced overdose statistic, and a sermon where an addict needs a next step; the addiction plan no longer links it, and the addiction care page keeps it in its kit under its true title without repeating the flagged lines |
| `/life/technology-and-attention`; `/how-tos/fam-how-to-eat-dinner-together-again` | a phone "checked dozens of times an hour"; children of family dinners steadier "by every measure we have" |
| The essay on finding a church worth joining; `/studyguides/fatherhood` | ends "you will have to risk it again", which presses harder toward returning than the church-hurt page does; "I am describing my own childhood", which goes past the bare fact |
| The doubt-and-deconstruction pathway | describes *Born Again From Atheism* but links `/books/believe` |
| `/deconstruction` | shows statistics and features essays that take sides and use words on the forbidden list; the care page dropped it from its kit |
| `client/src/data/crisis-resources.json` | Love Is Respect, the Hotline's line for ages 14 to 24 in dating relationships, is not in the verified file; adding it needs its number checked at the source and dated |
