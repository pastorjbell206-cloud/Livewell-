# Voice audit: Find Help library (`find-help`)

**human_score 7 / 10 · voice_score 7 / 10** (page by page about 8.5; read as a library about 6)

Page by page this is the cleanest library I'd expect to see: no forbidden words, no em-dashes in our prose, no exclamation outside Scripture, every page keeps 988 or a hotline in view, and the 'Why this is so hard' essays argue the way the voice standard asks. What gives it away is the library read as a library. Forty pages were built from one mould, and the mould left fingerprints: 'I'm a pastor, and I'm inside this indictment' (36 of 40 pages), 'I came to faith from atheism, so I won't pretend' (24), 'I'm raising five sons, and I'd rather' (11 helping sections), 'The usual explanations each hold something true' (33), 'not a verdict on your faith' (about 30 uses) and 'honest' 164 times. A reader of one page hears James; a reader of three hears the macro. Remove or vary the stamps (most are deletions) and get James's own sentences into the slots each page already reserves, and this becomes a 9.

## Scope and method

40 care pages in `client/public/needs/*.json` (about 165,000 words; `index.json` is generated), plus the copy in `client/src/pages/Help.tsx`, `client/src/pages/help/CarePage.tsx`, `CrisisBlock.tsx`, `SafetyCheck.tsx`, `HelpForThisGuide.tsx`, `PersistentHelpTab.tsx`, `client/src/lib/needs.ts`. Read in full: every title, summary and first-screen answer; grief end to end; the 'Why this is so hard' essays of curious, doubt, pastors, politics, purpose, work-burnout, grief. Everything else: literal searches for every tell on the list, with each hit read in context. Nothing was edited. `""` as a replacement means delete the quoted words.

## What is already right

- Mechanically clean across all 40 pages and the /help components: zero Forbidden Language hits in our prose (the only matches are 'foster care', 'shows up' in its literal sense, and words inside quoted Scripture), zero em-dashes outside one Scripture quotation, every exclamation point inside quoted Scripture, no connective filler (Moreover, Ultimately, At its core: none), four hedges in 165,000 words.
- Crisis care is right. Every page carries 988 in its own prose (1 to 11 times), the high-sensitivity pages name the line in the first-screen answer, abuse is separated from 'a marriage problem' or 'a temper problem' by name, and the feeling is validated without the despair ('that thought comes from the pain, and it lies to you about how much you're needed', job-loss).
- The 'Why this is so hard' essays follow VOICE-JAMES-BELL.md's mechanics: the conventional account conceded, a named distinction, a scholar introduced with the idea and why it matters (Taylor on subtraction stories, Hume stated before he is answered, Hunter's faithful presence), then Scripture as the diagnosis. No scholar parade.
- Contractions and plain words throughout; paragraphs vary in length; concrete detail a person would notice ('a kitchen with their coffee cup in it', 'a meal in a dish they never have to return', 'the envelope left face down').
- The politics page fires in both directions with one instrument ('One conscripts the cross into a flag... The other drafts the gospel into a cause... Scripture's word for both is idolatry') and refuses false symmetry in the next breath ('One word for both doesn't make them the same size').
- No invented biography anywhere: no funerals, counselees, conversations or memories are made up, and no page states his title, years in ministry, book count or denomination. The prayers are the most human writing in the library.

## 1. Patterns that repeat

### P1 pastor stamp

**36 of 40 pages.** Full list of the stamp sentence by page (all in `whyHard`): addiction, anger, cant-forgive, caregiving, church-hurt, curious (twice), dating, decisions, deconstructing, diagnosis, divorce, doubt, empty, family-devotions, fatherless, fear-of-the-future, grief, healing, infertility, is-it-a-sin, job-loss, loneliness, marriage, new-believer, parenting, pastors, politics, pornography, prayer, purpose, refer-to-counselor, trust-the-bible, whole-life, work-burnout. Seven use the word *indictment*. Keep it, reworded, where the failure really is a pulpit's (grief, anger, church-hurt, pastors, refer-to-counselor, deconstructing, diagnosis, caregiving, loneliness: those sentences are specific and good). Elsewhere delete it and let the surrounding 'we' do the work. Also templated but harmless and worth keeping as is: 'I'm a pastor, not a physician, and nothing here is medical advice' (anxiety, empty, purpose, work-burnout, job-loss, money).

- `client/public/needs/doubt.json` → `whyHard` (must)
  - Quote: "I'm a pastor, and this indictment includes me. We have too often met"
  - Tell: stamp: announced self-implication + rulebook word 'indictment'
  - Replace with: "We have too often met"

- `client/public/needs/marriage.json` → `whyHard` (must)
  - Quote: "I'm a pastor, and that indictment includes me. A church that makes"
  - Tell: stamp: announced self-implication + 'indictment'
  - Replace with: "A church that makes"

- `client/public/needs/addiction.json` → `whyHard` (must)
  - Quote: "I'm a pastor, and I'm inside this indictment."
  - Tell: stamp: announced self-implication + 'indictment'
  - Replace with: "Pastors have laid that yoke on people, and I'm a pastor."

- `client/public/needs/parenting.json` → `whyHard` (must)
  - Quote: "I'm a pastor and a father of five sons, and I'm inside this indictment."
  - Tell: stamp + 'indictment' + two biography facts used as a credential
  - Replace with: "Pastors taught that formula, and I'm one, with five sons of my own."

- `client/public/needs/fatherless.json` → `whyHard` (must)
  - Quote: "We pastors have done this, and I'm inside that indictment."
  - Tell: stamp + 'indictment'
  - Replace with: "We pastors have done this."

- `client/public/needs/fear-of-the-future.json` → `whyHard` (must)
  - Quote: "We don't get to stand outside that indictment."
  - Tell: rulebook word 'indictment'
  - Replace with: "We don't get to stand outside that."

- `client/public/needs/infertility.json` → `whyHard` (must)
  - Quote: "which puts me inside both the picture those Sundays celebrate and the indictment."
  - Tell: rulebook word 'indictment'
  - Replace with: "so I'm in the picture those Sundays celebrate."

- `client/public/needs/job-loss.json` → `whyHard` (should)
  - Quote: "I'm a pastor, and that charge includes me. Israel's law"
  - Tell: stamp
  - Replace with: "Israel's law"

- `client/public/needs/curious.json` → `whyHard` (should)
  - Quote: "I'm a pastor, and that charge reaches me. If that's the Christianity"
  - Tell: stamp
  - Replace with: "If that's the Christianity"

- `client/public/needs/politics.json` → `whyHard` (should)
  - Quote: "I'm a pastor, and I can't write this from outside it. Many of us, pastors included,"
  - Tell: stamp (same sentence as church-hurt.json whyHard, word for word bar one)
  - Replace with: "Many of us, pastors included,"

- `client/public/needs/purpose.json` → `whyHard` (must)
  - Quote: "Those of us who preach did much of this, and I'm a pastor, so I'm inside that charge."
  - Tell: stacked stamp: two self-implication formulas in one sentence
  - Replace with: "Those of us who preach did much of this."

- `client/public/needs/work-burnout.json` → `whyHard` (must)
  - Quote: "since our work is about God, and I'm a pastor, so I'm not pointing at this from outside it."
  - Tell: stacked stamp
  - Replace with: "since our work is about God."

- `client/public/needs/empty.json` → `whyHard` (must)
  - Quote: "could be admitted, and I'm a pastor, so I can't point at this from outside it."
  - Tell: stacked stamp
  - Replace with: "could be admitted."

- `client/public/needs/dating.json` → `whyHard` (must)
  - Quote: "I'm a pastor, so I can't point at that church from outside it."
  - Tell: stamp; the next paragraph opens with the atheism stamp in the same 'I'm X, so I Y' frame
  - Replace with: "I'm a pastor in that church."

- `client/public/needs/new-believer.json` → `whyHard` (should)
  - Quote: "We pastors have done this, and I don't exempt myself."
  - Tell: stamp: 'I don't exempt myself' is on the BRIEF stamp list by name
  - Replace with: "We pastors have done this."

- `client/public/needs/whole-life.json` → `whyHard` (should)
  - Quote: "Pastors like me have to own our part. We've often measured"
  - Tell: stamp: 'pastors like me' (BRIEF stamp list) + announced turn
  - Replace with: "We pastors have often measured"

- `client/public/needs/prayer.json` → `whyHard` (should)
  - Quote: "The third difficulty is one pastors like me have to own. We've often taught prayer"
  - Tell: stamp + announced turn ('The third difficulty is')
  - Replace with: "Then there's what the church taught. We've often taught prayer"

### P2 atheism stamp

**24 of 40 pages, 27 uses.** Keep on curious, doubt, suffering, trust-the-bible (body), new-believer, grief, money, parenting faq[4] ('so I won't tell you any door is closed' is the one place the fact changes what he can say to that reader). Fix the rest.

- `client/public/needs/dating.json` → `whyHard` (must)
  - Quote: "I came to faith from atheism, so I understand why the church's talk about dating and sex can sound like control dressed up as holiness."
  - Tell: biography stamp directly after the pastor stamp
  - Replace with: "The church's talk about dating and sex can sound like control dressed up as holiness, and I understand why."

- `client/public/needs/healing.json` → `whyHard` (should)
  - Quote: "I came to faith from atheism, and I take that result seriously."
  - Tell: biography as credential / stamp
  - Replace with: "I take that result seriously."

- `client/public/needs/infertility.json` → `whyHard` (should)
  - Quote: "I came to faith from atheism, so I won't call that objection small."
  - Tell: biography as credential / stamp
  - Replace with: "That objection isn't small."

- `client/public/needs/prayer.json` → `whyHard` (should)
  - Quote: "I came to faith from atheism, so I won't call that sense foolish."
  - Tell: biography as credential / stamp
  - Replace with: "That sense isn't foolish."

- `client/public/needs/fatherless.json` → `faq[4].a` (should)
  - Quote: "I came to faith from atheism, so I don't think the question is foolish."
  - Tell: biography as credential / stamp
  - Replace with: "The question isn't foolish."

- `client/public/needs/whole-life.json` → `whyHard` (should)
  - Quote: "I came to faith from atheism, and I won't pretend the skeptic is wrong about that. But look"
  - Tell: stamp restating the sentence before it
  - Replace with: "But look"

- `client/public/needs/purpose.json` → `faq[4].a` (must)
  - Quote: "beauty, and justice, and I came to faith from atheism, so I won't pretend otherwise."
  - Tell: stamp (second use on this page; the whyHard essay already has it)
  - Replace with: "beauty, and justice."

- `client/public/needs/is-it-a-sin.json` → `whyHard` (should)
  - Quote: "I came to faith from atheism, so I understand why a skeptic might watch Christians argue over tattoos and card games and decide the faith is a dress code."
  - Tell: biography as credential / stamp
  - Replace with: "A skeptic might watch Christians argue over tattoos and card games and decide the faith is a dress code, and I understand why."

- `client/public/needs/politics.json` → `whyHard` (should)
  - Quote: "I came to faith from atheism, so I understand why someone outside the church might hear our politics as one more tribe with a God attached."
  - Tell: biography as credential / stamp (second 'I'm X, so I' in one paragraph)
  - Replace with: "Someone outside the church might hear our politics as one more tribe with a God attached, and I understand why."

- `client/public/needs/decisions.json` → `whyHard` (should)
  - Quote: "I came to faith out of atheism, so I understand the suspicion, and the Bible shares it:"
  - Tell: biography as credential / stamp
  - Replace with: "The suspicion is reasonable, and the Bible shares it:"

- `client/public/needs/diagnosis.json` → `whyHard` (should)
  - Quote: "I came to faith from atheism, and I won't pretend that suspicion is foolish; Christians have sometimes used heaven as a sedative."
  - Tell: stamp + argument duplicated from grief.json (painkiller / Psalm 88) and anxiety.json (sedative / Psalms)
  - Replace with: "That suspicion isn't foolish; Christians have sometimes used heaven as a sedative."

- `client/public/needs/empty.json` → `whyHard` (should)
  - Quote: "I came to faith from atheism, and I won't tell you that people without God are secretly hollow."
  - Tell: biography as credential / stamp
  - Replace with: "I won't tell you that people without God are secretly hollow."

- `client/public/needs/fear-of-the-future.json` → `whyHard` (should)
  - Quote: "I came to faith from atheism, and I won't pretend unbelievers have no way to face the future."
  - Tell: biography as credential / stamp
  - Replace with: "I won't pretend unbelievers have no way to face the future."

- `client/public/needs/family-devotions.json` → `faq[4].a` (consider)
  - Quote: "I came to faith from atheism, so I take this objection seriously, and I'd rather a child"
  - Tell: biography as credential / stamp
  - Replace with: "I take this objection seriously, and I'd rather a child"

- `client/public/needs/doubt.json` → `description` (must)
  - Quote: "Honest help from a pastor who came to faith from atheism: what doubt is, what it isn't, and what to do next."
  - Tell: biography used as a credential in the search snippet; self-certifying 'Honest'
  - Replace with: "What doubt is, what it isn't, and what to do next."

- `client/public/needs/deconstructing.json` → `description` (must)
  - Quote: "A pastor who came to faith from atheism on what deserves to go, what is older underneath, and what to do this week."
  - Tell: biography as credential in the search snippet
  - Replace with: "What deserves to go, what is older underneath, and what to do this week."

- `client/public/needs/trust-the-bible.json` → `description` (must)
  - Quote: "A pastor who came to faith from atheism on how its books were gathered, what the old copies show, and the passages that are hard."
  - Tell: biography as credential in the search snippet
  - Replace with: "How its books were gathered, what the old copies show, and the passages that are hard."

### P3 five-sons stamp

**17 uses.** Keep on fatherless, parenting, family-devotions, suffering, infertility, job-loss faq[4], work-burnout helping, doubt helping, whole-life helping, money, fear-of-the-future. Fix the five below (and consider pornography helping.body, which is the same sentence as dating and doubt).

- `client/public/needs/dating.json` → `helping.body` (should)
  - Quote: "I have five sons, and I'd rather they bring this question to me than hide it from me, which means I have to listen before I lecture."
  - Tell: stamp (near-duplicate of doubt.json helping.body)
  - Replace with: "If you'd rather your child bring this question to you than hide it, you'll have to listen before you lecture."

- `client/public/needs/is-it-a-sin.json` → `helping.body` (should)
  - Quote: "As the father of five sons, I would rather they hear from me which rules are mine and which are God's than discover it on their own."
  - Tell: stamp; 'As the father of' is the credential form
  - Replace with: "Children do better hearing from you which rules are yours and which are God's than discovering it on their own."

- `client/public/needs/trust-the-bible.json` → `helping.body` (should)
  - Quote: "I'm raising five sons, and I want each of them to know that no question about the Bible is too dangerous to ask at our table."
  - Tell: stamp
  - Replace with: "A child should know that no question about the Bible is too dangerous to ask at your table."

- `client/public/needs/decisions.json` → `helping.body` (should)
  - Quote: "I'm raising five sons, and I'm convinced the aim of a parent's counsel is"
  - Tell: stamp ('I'm raising five sons, and I'm convinced' is also on purpose.json and whole-life.json)
  - Replace with: "The aim of a parent's counsel is"

- `client/public/needs/purpose.json` → `helping.body` (should)
  - Quote: "I'm raising five sons, and I'm convinced a young man learns"
  - Tell: stamp; the same page's faq[5].a has 'I was raised without a father, and I'm convinced'
  - Replace with: "A young man learns"

### P4 'the usual explanations each hold something true'

**33 of 40 pages** in `happening` (addiction, anger, cant-forgive, caregiving, church-hurt, dating, diagnosis, family-devotions, fasting, fatherless, fear-of-the-future, grief, healing, infertility, loneliness, marriage, money, new-believer, parenting, pastors, pets-and-heaven, politics, pornography, prayer, purpose, reading-the-bible, refer-to-counselor, suffering, whole-life; variants 'The common explanations each hold part of the truth', 'Each common explanation holds something true', 'There are good explanations for all this, and each holds something true'). The fix on every page is the same: delete the sentence and, where the next sentence says 'The X one says', name the noun ('The financial explanation says'). Ten `whyHard` essays also open 'The usual explanation for X is' (addiction, anger, cant-forgive, family-devotions, fasting, is-it-a-sin, money, pastors, work-burnout, plus fatherless 'The simplest explanation').

- `client/public/needs/marriage.json` → `happening` (must)
  - Quote: "The usual explanations each hold part of the truth. A counselor may say"
  - Tell: rulebook leakage / template opener
  - Replace with: "A counselor may say"

- `client/public/needs/money.json` → `happening` (must)
  - Quote: "The usual explanations each hold part of the truth. The financial one says"
  - Tell: rulebook leakage / template opener
  - Replace with: "The financial explanation says"

- `client/public/needs/church-hurt.json` → `happening` (must)
  - Quote: "The usual explanations each hold something true. Counselors will tell you"
  - Tell: rulebook leakage / template opener
  - Replace with: "Counselors will tell you"

- `client/public/needs/new-believer.json` → `happening` (must)
  - Quote: "The usual explanations each hold something true. A skeptic would say"
  - Tell: rulebook leakage / template opener
  - Replace with: "A skeptic would say"

- `client/public/needs/prayer.json` → `happening` (must)
  - Quote: "The usual explanations each hold some truth. The spiritual one says"
  - Tell: rulebook leakage / template opener
  - Replace with: "The spiritual explanation says"

- `client/public/needs/work-burnout.json` → `whyHard` (should)
  - Quote: "The usual explanation for burnout is that we work too much, and some of that is true."
  - Tell: template opener
  - Replace with: "Most people will tell you burnout comes from working too much, and some of that is true."

- `client/public/needs/money.json` → `whyHard` (should)
  - Quote: "The usual explanation for money trouble is personal: you spent too much, saved too little, and need a budget."
  - Tell: template opener (same frame as pastors.json)
  - Replace with: "Money trouble usually gets blamed on the person: you spent too much, saved too little, and need a budget."

- `client/public/needs/pastors.json` → `whyHard` (consider)
  - Quote: "The usual explanation for a pastor who runs out is personal: you didn't keep boundaries, didn't rest, didn't pray enough."
  - Tell: template opener (same frame as money.json)
  - Replace with: "When a pastor runs out, people usually make it personal: you didn't keep boundaries, didn't rest, didn't pray enough."

### P5 'verdict on your faith / worth'

**51 uses of 'verdict'**, about 30 in this frame: anxiety (answer, description), dating (2), decisions, diagnosis prayer, divorce (3), family-devotions, grief faq[4], healing (3), infertility (4), job-loss (5), marriage (3), money, parenting, pastors, purpose, reading-the-bible, work-burnout (2).

- `client/public/needs/anxiety.json` → `answer` (should)
  - Quote: "Anxiety is not a verdict on your faith. It's a weight on body and soul together, more common in church than anyone lets on, and it deserves real care, from God and from people."
  - Tell: motif stamped through the library + 'It is not X. It is Y.' + 'deserves'
  - Replace with: "Anxiety doesn't mean your faith is weak. It's a weight on body and soul together, more common in church than anyone lets on, and it needs real care, from God and from people."

- `client/public/needs/anxiety.json` → `description` (should)
  - Quote: "Anxiety is not a verdict on your faith. What's happening"
  - Tell: motif
  - Replace with: "Anxiety doesn't mean your faith is weak. What's happening"

- `client/public/needs/job-loss.json` → `answer` (should)
  - Quote: "but it isn't a verdict on your worth, which never came from the job."
  - Tell: motif (five uses on this page)
  - Replace with: "but it doesn't say what you're worth, which never came from the job."

- `client/public/needs/marriage.json` → `faq[4].a` (should)
  - Quote: "What you feel tonight is real, but it isn't a verdict."
  - Tell: motif
  - Replace with: "What you feel tonight is real, but it doesn't settle anything."

- `client/public/needs/infertility.json` → `answer` (consider)
  - Quote: "your empty arms are not God's verdict on your faith or your worth."
  - Tell: motif (four uses on this page)
  - Replace with: "your empty arms don't tell you what God thinks of your faith or your worth."

### P6 the page describing its own fairness

'Honest' counts by page: doubt 25, deconstructing 11, curious 10, work-burnout 10, prayer 9, trust-the-bible 7; 164 in all. Related repeats: 'deserves its own hearing' (doubt whyHard, doubt faq[4].a, deconstructing happening), 'deserves real answers' (doubt, deconstructing), 'true as far as it goes' (dating, marriage, fatherless, trust-the-bible, whole-life, prayer).

- `client/public/needs/curious.json` → `whyHard` (must)
  - Quote: "That is the objection at full strength, and much of it is right."
  - Tell: rulebook leakage (announces the steelman)
  - Replace with: "Much of that is right."

- `client/public/needs/suffering.json` → `whyHard` (must)
  - Quote: "Start with the objection at full strength, because it has earned that."
  - Tell: rulebook leakage (announces the steelman)
  - Replace with: "Start with the objection."

- `client/public/needs/new-believer.json` → `happening` (must)
  - Quote: "some churches do press people at emotional moments; a page that denied it wouldn't deserve your trust."
  - Tell: the page vouching for itself
  - Replace with: "some churches do press people at emotional moments."

- `client/public/needs/reading-the-bible.json` → `whyHard` (must)
  - Quote: "A page that pretended otherwise wouldn't deserve your trust."
  - Tell: the page vouching for itself (duplicate of new-believer.json)
  - Replace with: (delete)

- `client/public/needs/suffering.json` → `answer` (should)
  - Quote: "the objection is serious, and nothing here will pretend otherwise."
  - Tell: the page vouching for itself
  - Replace with: "the objection is serious."

- `client/public/needs/doubt.json` → `thisWeek.intro` (must)
  - Quote: "These are small, honest things a person can do while still unsure."
  - Tell: 'honest' as self-certifying adjective (25 uses on this page, 164 in the library; BRIEF allows one per piece)
  - Replace with: "These are small things a person can do while still unsure."

- `client/public/needs/doubt.json` → `thisWeek.steps[1].title` (should)
  - Quote: "Pray the honest prayer"
  - Tell: 'honest' overuse; slightly literary heading
  - Replace with: "Pray what you can mean"

- `client/public/needs/doubt.json` → `thisWeek.steps[2].title` (should)
  - Quote: "Tell one honest person"
  - Tell: 'honest' overuse; ambiguous (the person is not the honest one)
  - Replace with: "Tell one person the truth"

- `client/public/needs/doubt.json` → `seoTitle` (should)
  - Quote: "Doubting Your Faith: Honest Help When You're Not Sure"
  - Tell: 'honest' as self-certifying adjective
  - Replace with: "Doubting Your Faith: Help When You're Not Sure"

- `client/public/needs/doubt.json` → `faq[1].a` (should)
  - Quote: "You deserve to reach your verdict honestly, and you don't have to reach it quickly."
  - Tell: 'verdict' + 'honestly' + 'deserve' in one sentence
  - Replace with: "Take the time to look properly. You don't have to decide quickly."

- `client/src/pages/Help.tsx` → `SEOMeta description (line 131)` (should)
  - Quote: "Honest help, Scripture in context, and real people to call."
  - Tell: 'honest' as self-certifying adjective
  - Replace with: "Plain help, Scripture in context, and real people to call."

- `client/src/pages/Help.tsx` → `line 274` (consider)
  - Quote: "the honest self-checks"
  - Tell: 'honest' as self-certifying adjective
  - Replace with: "the self-checks"

### P7 formula closers and connectors

'Underneath ... is' pages: caregiving, curious, diagnosis, fasting, fatherless, grief, job-loss, money, work-burnout (whyHard), plus decisions answer and doubt happening. Keep two or three. The verdict closers that should stay exactly as they are: doubt 'The question was never the danger. Being alone with it was.'; pastors 'Your church already has a Savior.'; grief 'So your tears are not the thing that went wrong. Death is.'; loneliness 'We built big rooms and too few tables'.

- `client/public/needs/purpose.json` → `whyHard` (should)
  - Quote: "We asked each other to write ourselves, and then wondered why so many of us feel like rough drafts."
  - Tell: aphoristic closer with a fresh literary image; third use of the 'and then wondered why' frame
  - Replace with: (delete)

- `client/public/needs/politics.json` → `whyHard` (consider)
  - Quote: "and then wonder why the table sounds more like the feed than like Christ."
  - Tell: 'and then wonder why' frame (also loneliness.json, purpose.json)
  - Replace with: "and the table ends up sounding more like the feed than like Christ."

- `client/public/needs/parenting.json` → `whyHard` (consider)
  - Quote: "Scripture offers something harder and better than a formula: the ordinary day, your own heart first, and a God who is a father himself."
  - Tell: repeated frame 'something harder and better' (also pornography.json, suffering.json) + colon reveal + triplet
  - Replace with: "What Scripture gives in place of a formula is the ordinary day, your own heart first, and a God who is a father himself."

- `client/public/needs/work-burnout.json` → `whyHard` (consider)
  - Quote: "Underneath all of it is an old question: what makes a person worth something?"
  - Tell: repeated connector 'Underneath it all is' + colon reveal
  - Replace with: "The old question is still there: what makes a person worth something?"

- `client/public/needs/job-loss.json` → `whyHard` (consider)
  - Quote: "Underneath it all is the question from the middle of the night: am I still worth anything?"
  - Tell: repeated connector + colon reveal (same move and nearly the same question as work-burnout.json)
  - Replace with: "Then there's the question from the middle of the night: am I still worth anything?"

- `client/public/needs/money.json` → `whyHard` (consider)
  - Quote: "Underneath it all is the question Jesus pressed about money: which master do you serve (Matthew 6:24)?"
  - Tell: repeated connector + colon reveal
  - Replace with: "Jesus pressed a harder question about money: which master do you serve (Matthew 6:24)?"

### P8 the first-screen skeleton

Lowest priority, and deliberately so: on crisis-facing pages sameness is safer than variety. Do not touch the 988 sentences.

- `client/public/needs/money.json` → `answer` (consider)
  - Quote: "You don't have to fix it tonight. Tonight, just write down what's due this week and tell one person the truth."
  - Tell: template line; 'tonight. Tonight,' stutter
  - Replace with: "Tonight, just write down what's due this week and tell one person the truth."

- `client/public/needs/work-burnout.json` → `answer` (consider)
  - Quote: "You don't have to solve it tonight. Start smaller: stop working at a set time,"
  - Tell: template line + colon reveal
  - Replace with: "Tonight, start small. Stop working at a set time,"

- `client/public/needs/is-it-a-sin.json` → `moreHelp.body` (consider)
  - Quote: "that fear deserves real care, and needing care is no failure of faith."
  - Tell: sentence duplicated in decisions.json moreHelp.body ('That kind of fear deserves real care, and needing care is no failure of faith.')
  - Replace with: "that fear needs real care, and getting it doesn't mean your faith is weak."

## 2. The ten worst passages

1. `client/public/needs/dating.json` → `whyHard`
   - Quote: "I'm a pastor, so I can't point at that church from outside it."
   - Why: The pastor card closes one paragraph and the atheism card opens the next, in the same frame. This is the most template-sounding join in the library.
   - Replace with: "I'm a pastor in that church."

2. `client/public/needs/purpose.json` → `whyHard`
   - Quote: "Those of us who preach did much of this, and I'm a pastor, so I'm inside that charge."
   - Why: A sentence of this shape ('I'm a pastor, and I'm inside this') sits in the whyHard essay of 36 of the 40 care pages. On one page it reads as him; across the library it reads as a slot being filled. 'Indictment' is also the editorial rulebook's own word (BRIEF.md lists it as leakage). The 'we' sentences beside it already put him inside the failure. 'Those of us who preach' is itself on the BRIEF's stamp list; saying it and then 'I'm a pastor, so I'm inside that charge' says the same thing three times.
   - Replace with: "Those of us who preach did much of this."

3. `client/public/needs/work-burnout.json` → `whyHard`
   - Quote: "since our work is about God, and I'm a pastor, so I'm not pointing at this from outside it."
   - Why: A sentence of this shape ('I'm a pastor, and I'm inside this') sits in the whyHard essay of 36 of the 40 care pages. On one page it reads as him; across the library it reads as a slot being filled. 'Indictment' is also the editorial rulebook's own word (BRIEF.md lists it as leakage). The 'we' sentences beside it already put him inside the failure. 'Those of us who work for churches' has already put him in the sentence.
   - Replace with: "since our work is about God."

4. `client/public/needs/doubt.json` → `whyHard`
   - Quote: "I'm a pastor, and this indictment includes me. We have too often met"
   - Why: A sentence of this shape ('I'm a pastor, and I'm inside this') sits in the whyHard essay of 36 of the 40 care pages. On one page it reads as him; across the library it reads as a slot being filled. 'Indictment' is also the editorial rulebook's own word (BRIEF.md lists it as leakage). The 'we' sentences beside it already put him inside the failure.
   - Replace with: "We have too often met"

5. `client/public/needs/parenting.json` → `whyHard`
   - Quote: "I'm a pastor and a father of five sons, and I'm inside this indictment."
   - Why: A sentence of this shape ('I'm a pastor, and I'm inside this') sits in the whyHard essay of 36 of the 40 care pages. On one page it reads as him; across the library it reads as a slot being filled. 'Indictment' is also the editorial rulebook's own word (BRIEF.md lists it as leakage). The 'we' sentences beside it already put him inside the failure.
   - Replace with: "Pastors taught that formula, and I'm one, with five sons of my own."

6. `client/public/needs/doubt.json` → `description`
   - Quote: "Honest help from a pastor who came to faith from atheism: what doubt is, what it isn't, and what to do next."
   - Why: BRIEF.md: biography is 'never a credential'. This is the line Google shows; it sells the page on his story.
   - Replace with: "What doubt is, what it isn't, and what to do next."

7. `client/public/needs/new-believer.json` → `happening`
   - Quote: "some churches do press people at emotional moments; a page that denied it wouldn't deserve your trust."
   - Why: The prose certifies its own method instead of just doing it. BRIEF.md names this exactly ('Made carefully, the objection runs like this', 'deserves to be stated', 'honest' as a self-certifying adjective). The same sentence closes a paragraph in reading-the-bible.json.
   - Replace with: "some churches do press people at emotional moments."

8. `client/public/needs/curious.json` → `whyHard`
   - Quote: "That is the objection at full strength, and much of it is right."
   - Why: The prose certifies its own method instead of just doing it. BRIEF.md names this exactly ('Made carefully, the objection runs like this', 'deserves to be stated', 'honest' as a self-certifying adjective).
   - Replace with: "Much of that is right."

9. `client/public/needs/marriage.json` → `happening`
   - Quote: "The usual explanations each hold part of the truth. A counselor may say"
   - Why: This sentence, or a one-word variant, opens the second or third paragraph of 'What's going on' on 33 of 40 pages. It is the spec's instruction ('what is true in the common explanations') written into the prose: rulebook leakage. The sentences that follow already do the conceding ('and they're right', 'which is true as far as it goes'), so the announcement can go.
   - Replace with: "A counselor may say"

10. `client/public/needs/purpose.json` → `whyHard`
   - Quote: "We asked each other to write ourselves, and then wondered why so many of us feel like rough drafts."
   - Why: BRIEF.md: no epigram at paragraph ends, no fresh literary image where a plain phrase would do. The paragraph already lands on the catechism counting joy as part of the purpose. Loneliness ('big rooms and too few tables') is the page that should keep this frame.
   - Replace with: (delete)

## 3. Most machine-sounding, most his

**Most machine-sounding:** `doubt` ('honest' 25 times, 'indictment', both biography stamps, a credential in the search snippet); `purpose` (three pastor formulas, the atheism line twice, 'I'm convinced' twice, the rough-drafts closer); `work-burnout` (five pastor self-references, stacked stamp sentence, 'honest' ten times); `dating` (pastor and atheism stamps on either side of a paragraph break); `job-loss` ('verdict' five times, 'none of this' five times).

**Most his:** `grief` (the pastor line here is specific: 'we are trained to have a word ready, and it usually comes too soon'); `pastors` ('Your church already has a Savior'); `politics` (both directions, same grief, no false symmetry); `suffering` (the one place atheism and five sons are both doing work, against Ivan Karamazov); `loneliness`; `curious` (Hume and Freud stated before they are answered).

## 4. Scores

- **human_score 7.** No single page would make a careful reader suspect a machine. Three pages in a row would, because of the stamps in section 1. Almost all of the fixes are deletions.
- **voice_score 7.** The argument mechanics, the plain words and the self-implicating 'we' are his mature register. What is missing is anything only he could have written: every first-person sentence is one of three confirmed facts plus a stance. That is the integrity rule working, and only James can fill the gap.

## For James

- Each care page has a 'slots' list naming the exact paragraph where two or three sentences of your own would go (grief.json: what you believed about death before faith; grieving an absent father; how five sons shape the way you sit with parents who have buried a child). Those slots are empty on all 40 pages, which is why the same three facts get repeated instead. Nothing fixes the sameness as well as your own words in even ten of them. I have not written any for you.
- Decide where the three facts should appear. My recommendation: 'I came to faith from atheism' on curious, doubt, suffering, trust-the-bible, new-believer, grief and money only; 'five sons' on fatherless, parenting, family-devotions, suffering, job-loss, doubt and infertility only; 'I'm a pastor' as a confession only where the failure is a pulpit's (grief, anger, church-hurt, pastors, refer-to-counselor, deconstructing, diagnosis, caregiving, loneliness). Everywhere else 'we' already includes you.
- Three search descriptions sell the page on your story ('A pastor who came to faith from atheism on...': doubt, deconstructing, trust-the-bible). The brief says biography is never a credential. I've given replacements; say if you want that line kept on one of them.
- Profile disagreement, noted once: the saved Substack profile asks for 2 to 4 sentence paragraphs, 'three numbered applications', 'stacked landing lines' and 'one line the reader screenshots' in every piece. VOICE-JAMES-BELL.md ranks developed paragraphs and one earned verdict above all of those, and it governs. These pages follow VOICE-JAMES-BELL.md, and I have not pushed them toward the profile.
- Scripture on these pages is the Berean Standard Bible, not the ESV that CLAUDE.md names as the default. That is a recorded decision (docs/grow/CARE-PAGE-SPEC.md section 5: public domain, machine-checkable, printable on handouts). No change proposed; you should know it is deliberate.
- Three pages answer 'faith is just a comfort story' with the same two steps (grief: heaven as 'a painkiller' then Psalm 88; diagnosis: heaven as 'a sedative' then Psalm 88; anxiety: 'The Psalms make a poor sedative'). Grief does it best. If you have a different thing you'd say to a dying skeptic than to a grieving one, the diagnosis page is where it belongs.
- Coverage: I read all 40 first-screen answers, titles and summaries, the grief page end to end, the full 'Why this is so hard' essays of seven pages (curious, doubt, pastors, politics, purpose, work-burnout, grief), and the /help components. The rest of the 165,000 words I audited by pattern search with the context of every hit, not line by line. A second pass on the Scripture readings, FAQs and prayers of the other 39 pages would be worth doing.
- Housekeeping, not voice: 17 page files use straight quotation marks for Scripture and 23 use curly ones, so the same verse looks different from page to page; and Help.tsx writes 'what you are facing' / 'It does not replace them' where the care pages would contract.

## Crisis check

Every one of the 40 pages names 988 in its own prose; the 16 `high` pages carry the help block on the first screen and `CarePage.tsx` renders `CrisisBlock` on all of them; abuse is named and routed to the National Domestic Violence Hotline wherever a marriage, a temper, money control or dating is in view; church-hurt says a crime 'belongs with the police, not only the church'; medical, legal and financial disclaimers are present. I found no passage that validates despair and no page without a path to help.
