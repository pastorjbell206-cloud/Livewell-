# Library flags: what the care-page writers found elsewhere

While writing and reviewing the Find Help care pages, the writers and second-pass
editors opened every page they linked and many they considered linking. They found
problems in pages outside the care pages. Some were plain errors in the platform's
own libraries, and those were corrected in this batch (the first table). The rest
sit in James's essays, the theology pages, and the tools, where the question is
whether a sentence is his own true story or his own landing. Those were not
edited; they are listed here for him to decide.

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

The how-to fixes were made in their sources, `scripts/articles/*.json`, because the
deploy regenerates `client/public/howtos/` from those files.

## For James: first-person stories in essays and pages

Each of these tells a story in James's voice that no one but James can confirm. If
it is true and his, it stays. If not, it should be generalized or cut, the way the
two sweeps in this folder handled the study guides and the Grow libraries.

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
| `/writing/a-whole-life` | "my wife", "a man with a wedding ring", a sermon-notes story, "fifteen years" (it also cites Pew and Eusebius figures) |
| `/writing/interfaith-marriage` | a counseling line; a made-up quotation in double quotes; an unsourced Pew figure |
| `/writing/the-covenant-you-didnt-understand` | "I have watched couples..." |
| `/writing/why-trust-the-bible`, `/writing/the-bible-without-the-marketing` | "I lived inside that story for years"; ages nineteen and twenty-four |
| The Nicaea essay; the inerrancy and infallibility essay | "I have preached that sermon, on tired weeks"; "I have used the high doctrine as a club" |
| `/writing/what-the-gospel-actually-is` | narrates its author's preaching |
| `/writing/did-the-resurrection-happen` | "I came to this evidence as an enemy of it" (it also overstates scholarly agreement) |
| The skeptic plan's intro, the Questions Skeptics Ask study guide summary, the Test the Case intros, the Skeptic's Track, the Believe study guide | accounts of his atheist years ("I believed all three when I was an unbeliever"; "for years I made it, and I made it well"); the Believe guide also has named case-study people, such as "an attorney named Marcus" |
| Theology pages: inerrancy, scripture, revelation, the New Testament canon, the Apocrypha, miracles, the Holy Spirit, anthropology, last things, the Old Testament's violence | land contested questions in his voice ("I land near the open but cautious center") and tell stories ("twenty years of conversations", "I have buried enough doubts", "I have prayed beside dying believers", "I lay on hands", "I have built preaching calendars...") |
| Study guides: Heaven and Hell; Baptism and Communion, session 2; The Undivided Life; Deep Roots | his landing on hell ("Bell holds the first two in tension and trembles"); his landing on believer's baptism; "drawn from James Bell's book" titles that could not be confirmed |

## For James: claims without a source

| Page | The claim |
|---|---|
| `/writing/prosperity-gospel-is-not-the-gospel` | a net worth for a living preacher, an attributed quotation, and a list of named living preachers; the care pages no longer link it |
| `/writing/purity-culture-and-its-wreckage` | that Jesus's teaching is silent on sexual purity (Matthew 5:27-28 is not) |
| The Hard Questions hub | "nearly all" the apostles died for the claim; the empty tomb listed among broadly agreed facts |
| `/writing/can-you-trust-the-bible`; the manuscripts page; Test the Case | "Metzger estimated 99.5 percent" (the figure is usually traced to Geisler and Nix); 5,800 manuscripts, half a million variants, "ninety-nine percent"; "more variants than there are words" |
| The miracles context guide | a "hundreds of millions" survey figure |
| `/faq/what-denomination-should-i-join` | 45,000 denominations; "fastest-growing"; a clergy-abuse claim; em-dashes |
| `/faq/is-the-bible-historically-accurate` | "95% agreement" for the Isaiah scroll |
| `/writing/augustine-the-restless-man` | credits *you are what you love* to Tim Keller (it is the title of James K. A. Smith's book) |
| `/writing/why-christians-confess-out-loud` | says *Life Together* was written in 1939 at the seminary (Bonhoeffer wrote it in Göttingen in 1938; it was published in 1939) |
| `/life/unemployment-and-the-lost-job`; `/life/money-and-the-heart`; `/life/dating-and-discernment`; `/life/sex-and-the-body` | unsourced research on unemployment and depression, lottery winners, and dating; reliance on disputed authors |
| `/wisdom/gambling`; `/wisdom/alcohol-and-drinking`; `/wisdom/job-loss`; `/wisdom/toxic-relationships` | unsourced claims about the Reformers and Wesley; a lean to one side; Jeremiah 29:11 without its setting; a hotline number written into prose |
| How-tos: whether to marry someone; thriving as a single Christian | marriages everyone doubted "rarely" turn out well; Hannah "was not rebuked" (Eli did rebuke her, 1 Samuel 1:14) |
| The doubt-and-deconstruction pathway | describes *Born Again From Atheism* but links `/books/believe` |
| `/deconstruction` | shows statistics and features essays that take sides and use words on the forbidden list; the care page dropped it from its kit |
| `client/src/data/crisis-resources.json` | Love Is Respect, the Hotline's line for ages 14 to 24 in dating relationships, is not in the verified file; adding it needs its number checked at the source and dated |
