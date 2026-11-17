# Voice audit: church history essays

Library: `/home/user/Livewell-/client/public/history/essays/` (22 files, about 52,700 words, every section body, title, kicker, subtitle and key-figure note read in full).
Standard: `docs/VOICE-JAMES-BELL.md` (governs), `docs/work/essays/BRIEF.md`, CLAUDE.md, with the Substack skill profile as a supporting reference.
Read-only audit. Nothing in the repository was changed. No builds or validators were run.
Machine-readable findings: `/home/user/voice-audit/library-history-essays.json` (420 findings: 182 must, 194 should, 44 consider). Every finding has the file path, the field and section id or key, the exact quoted words, and the exact replacement. Each quote was checked by script to occur exactly once in its field, no two findings overlap, and applying all of them leaves zero em-dashes or en-dashes in the library.

## Scores for the library as it stands

**human_score 5.5 / 10. voice_score 5.5 / 10.**

The library is three different things under one index, and the average hides that.

1. Fourteen short era essays (1,200 to 2,000 words each). Ten of them are good: plain, accurate-sounding, fair before sharp, with real endings. Four are flat and generic.
2. Four long modern-era essays (awakenings-and-enlightenment, the-american-experiment, the-attractional-era, after-christendom-era; 4,600 to 6,500 words each). These have the best history and the best thinking in the library, and they are where the editorial rulebook leaks into the prose and where biography is invented.
3. Four older long essays (apostolic-and-persecuted, councils-and-creeds, the-long-middle, reformation-and-its-wars). These are written in the earlier register the governing standard retired: 201 dashes, fragment stacks, an epigram at the end of nearly every paragraph. A careful reader would suspect a machine inside the first screen.

With every finding applied I would put the library at about human 8 and voice 7.5. The last two points cannot come from editing; see "For James" at the end.

| Essay | Words | Findings | human | voice |
|---|---|---|---|---|
| the-desert-and-the-rule | 1585 | 6 | 7.5 | 7.5 |
| the-fathers-at-work | 1554 | 5 | 7.5 | 7 |
| the-church-that-outlived-rome | 1575 | 6 | 7.5 | 7 |
| the-missionary-century | 1623 | 4 | 7.5 | 6.5 |
| the-constantinian-turn | 1518 | 5 | 7 | 7 |
| the-global-church | 1985 | 4 | 7 | 6.5 |
| the-awakenings | 1645 | 5 | 7 | 6.5 |
| the-counter-reformation | 1605 | 10 | 6.5 | 6.5 |
| the-medieval-west | 1665 | 3 | 6.5 | 6.5 |
| the-age-of-martyrs | 1531 | 8 | 6.5 | 6.5 |
| the-east-west-schism | 1241 | 5 | 6 | 5 |
| the-great-councils | 1279 | 6 | 6 | 5 |
| the-apostolic-age | 1341 | 6 | 6 | 4.5 |
| the-reformation | 1269 | 4 | 6 | 4.5 |
| the-attractional-era | 4658 | 32 | 5.5 | 6.5 |
| awakenings-and-enlightenment | 5773 | 31 | 5.5 | 6.5 |
| the-american-experiment | 6480 | 36 | 5 | 5.5 |
| after-christendom-era | 4592 | 37 | 5 | 6 |
| councils-and-creeds | 2357 | 47 | 4.5 | 5.5 |
| reformation-and-its-wars | 2539 | 56 | 4 | 5 |
| the-long-middle | 2494 | 55 | 4 | 5 |
| apostolic-and-persecuted | 2391 | 49 | 3.5 | 5 |

## Counts before and after the fixes

| Marker | Now | After all findings applied |
|---|---|---|
| em/en dashes | 201 | 0 |
| honest/honesty/honestly | 57 | 19 |
| steelman | 5 | 0 |
| verdict | 18 | 6 |
| this platform / the platform's | 12 | 0 |
| this essay / this library | 27 | 11 |
| the writer (self) | 4 | 0 |
| ledger/invoice/receipt/bill/audit | 40 | 21 |
| indict- | 7 | 1 |

What remains after the fixes is ordinary use: "verdict" in a courtroom sense, "platform" as a stage, "this essay tells how that happened" as plain orientation, and the accounting image kept where it appears once.

Forbidden Language list, literal search: no hits for delve, leverage, unlock, transformative, tapestry, foster, unpack, landscape, nuanced, multifaceted, authentic, journey, holistic, or any listed phrase or therapy term. "Navigators" appears twice as an organization's name (see findings). "Blessed" appears as a verb and as Kate Bowler's book title, not as the banned adjective. No exclamation points anywhere. "Truly" appears 16 times, 13 of them in Chalcedonian formulas ("truly God, truly human"), which is doctrine, not filler.

## 1. The patterns that repeat

### Biography beyond the confirmed facts, or a denominational claim (14 findings)

Six sentences in the-american-experiment put James inside the Southern Baptist Convention ("My convention", "our founders", "my people", "we repent", "it took us") and one says he was "raised counting decisions". The first is unconfirmed and the second contradicts the confirmed fact that he came to faith as an adult from atheism. First-person pastoral scenes that nobody has confirmed also appear in the-attractional-era, awakenings-and-enlightenment and after-christendom-era. Where the scene is his, he should write it; where it is not, the replacement moves the sentence to "we".

- `the-american-experiment.json` › section.body `when-we-chose-slavery`
  - Now: "That body is the Southern Baptist Convention. My convention, the largest Protestant denomination in America, was organized so that a man could hold human beings in bondage and carry the gospel at the same time, and the founders saw no contradiction, and they were our founders."
  - Replace with: "That body is the Southern Baptist Convention. The largest Protestant denomination in America was organized so that a man could hold human beings in bondage and carry the gospel at the same time, and the founders saw no contradiction."
  - Why: 'My convention' and 'our founders' state Southern Baptist membership as fact. NOTES.md marks that unconfirmed and says never to imply it. If James's church is in the convention he can restore the two phrases himself.
- `the-american-experiment.json` › section.body `the-machinery-of-revival`
  - Now: "I am not describing other people. I am a revivalist Baptist by blood; I was raised counting decisions, and I have stood at the front and counted them myself, and I know the particular temptation to preach for the response the count requires."
  - Replace with: "I am not describing other people. I pastor in this tradition, and I know the temptation to preach for the response the count requires."
  - Why: 'A revivalist Baptist by blood' and 'I was raised counting decisions' contradict the confirmed biography: James came to faith as an adult, from atheism. This is invented biography used as a credential. The altar-call scene is unconfirmed; James can put it back in his own words if it happened.
- `the-attractional-era.json` › section.body `the-audit`
  - Now: "I learned to read an attendance spreadsheet before I learned to sit with a dying man. I have called an auditorium a sanctuary and an audience a congregation. I have preached, on more Sundays than I care to count, to backs the stage had taught to watch, and I have felt the small lift when the numbers came in high and told myself the lift was joy over the lost."
  - Replace with: "Many of us learned to read an attendance spreadsheet before we learned to sit with a dying man. We called an auditorium a sanctuary and an audience a congregation, and when the numbers came in high we told ourselves the lift we felt was joy over the lost."
  - Why: Four first-person confessions in anaphora ('I learned... I have called... I have preached... I have felt'), none of them a confirmed fact, and one that does not parse ('to backs the stage had taught to watch'). It reads as manufactured vulnerability. 'We' carries the same weight without inventing James's history.

### Rulebook leakage: the prose names its own method or the platform (66 findings)

The largest voice problem in the library. Before fixes the essays say "steelman" 5 times, "verdict" 18 times, "this platform", "this platform's" or "the platform's" 12 times, name "this essay" or "this library" 27 times, and refer to James as "the writer" 4 times. Two sentences from CLAUDE.md are reproduced nearly verbatim inside essays: "with the same instrument and the same grief" and "got the symptom right and the anthropology wrong" (twice).

- `after-christendom-era.json` › section.body `the-flag-and-the-cause`
  - Now: "Now turn the same instrument the other direction, with the same grief. The opposite capture rarely carries flags into buildings"
  - Replace with: "There is an opposite capture, and it deserves the same grief. It rarely carries flags into buildings"
  - Why: This is CLAUDE.md's guardrail ('with the same instrument and the same grief') quoted almost word for word inside the essay.
- `the-long-middle.json` › section.body `the-crusades-honestly`
  - Now: "Steelman the crusaders, because honesty requires it: most believed"
  - Replace with: "Most crusaders believed"
  - Why: A person telling history does the fair thing without announcing it. Words like steelman, verdict, indictment, 'this platform', 'this essay' and 'this library' are the editorial brief showing through, and a careful reader hears a system prompt.
- `reformation-and-its-wars.json` › section.body `marburg-and-the-radicals`
  - Now: "Here the writer stops narrating and confesses, because his own tradition sits in this dock twice. Baptists cherish the Anabaptists' convictions — the believers' church, baptism upon faith, the gathered congregation free of the state."
  - Replace with: "My own tradition sits in this dock twice. Baptists cherish the Anabaptists' convictions: the believers' church, baptism upon faith, the gathered congregation free of the state."
  - Why: A stage direction in the third person ('the writer stops narrating and confesses'). Nobody writes about himself this way; it is the self-implication rule turned into prose.

### Em-dash or en-dash outside a quotation (142 findings)

201 em-dashes and en-dashes, all of them in four files: reformation-and-its-wars, the-long-middle, councils-and-creeds, apostolic-and-persecuted. The other eighteen files have none. The JSON file carries a replacement for every one (142 findings; several fix two or three dashes at once). They were written sentence by sentence; do not run the blanket purge script instead, because a comma in place of every dash produces comma splices in about a third of these sentences.

- `apostolic-and-persecuted.json` › section.body `no-advantages`
  - Now: "Count what they did not have. No buildings — for most of three centuries, Christians met in houses, and later in houses quietly enlarged. No legal standing — the movement was unregistered, suspect, and intermittently criminal. No professional clergy class with social rank, no publishing apparatus, no music industry, no political friends worth naming. No stage, no screen, no budget."
  - Replace with: "Count what they did not have. They had no buildings: for most of three centuries Christians met in houses, and later in houses quietly enlarged. They had no legal standing, because the movement was unregistered, suspect, and intermittently criminal. They had no professional clergy class with social rank, no publishing apparatus, no music industry, no political friends worth naming, and no stage, screen or budget."
  - Why: The site treats the em-dash as an AI tell in James's voice and the brief bans it outright. Four files carry all 196 em-dashes and all 5 en-dashes.
- `councils-and-creeds.json` › section.body `the-face-of-god`
  - Now: "Without confusion and without change: the one who holds you is truly God — no dilution arrived in Bethlehem. Without division and without separation: the one who holds you truly wept, was truly tempted, truly died — your humanity is not foreign territory to him."
  - Replace with: "Without confusion and without change means the one who holds you is truly God, undiluted in Bethlehem. Without division and without separation means the one who holds you truly wept, was truly tempted and truly died, so your humanity is not foreign territory to him."
  - Why: The site treats the em-dash as an AI tell in James's voice and the brief bans it outright. Four files carry all 196 em-dashes and all 5 en-dashes.
- `the-long-middle.json` › section.body `gregory-and-the-wreckage`
  - Now: "Refuse both easy stories — the Dark Ages sneer and the golden-age nostalgia — and the Long Middle becomes what it actually is: the longest experiment ever run on the question our own moment keeps asking."
  - Replace with: "Set aside both easy stories, the Dark Ages sneer and the golden-age nostalgia, and the Long Middle turns out to be the longest experiment ever run on a question our own moment keeps asking."
  - Why: The site treats the em-dash as an AI tell in James's voice and the brief bans it outright. Four files carry all 196 em-dashes and all 5 en-dashes.

### Imperative stage direction to the reader (48 findings)

Short imperatives aimed at the reader, usually as a paragraph opener: Read that again, Sit with that, Mark that, Note what that means, Hold both, Be fair to, Say it plainly, Name it, Count, Measure. 48 of them, 11 in the-attractional-era alone. One or two would be his voice. Forty-eight is a tic, and it is the single most recognisable machine rhythm in the four long modern essays.

- `the-attractional-era.json` › section.body `a-tent-at-washington-and-hill`
  - Now: "Read that last item again. In 1948,"
  - Replace with: "In 1948,"
  - Why: Telling the reader to read it again, sit with it, mark it or hold it is a performance cue. It recurs across the library in the same shape, which is how a reader spots the machine. The fact that follows carries the weight without the cue.
- `the-attractional-era.json` › section.body `the-audit`
  - Now: "Let the weight of that land. The most studied church"
  - Replace with: "The most studied church"
  - Why: Telling the reader to read it again, sit with it, mark it or hold it is a performance cue. It recurs across the library in the same shape, which is how a reader spots the machine. The fact that follows carries the weight without the cue.
- `reformation-and-its-wars.json` › section.body `gift-and-fracture`
  - Now: "Hold the era with both hands, because letting go of either falsifies it."
  - Replace with: "The era has to be told as both a gift and a fracture."
  - Why: Telling the reader to read it again, sit with it, mark it or hold it is a performance cue. It recurs across the library in the same shape, which is how a reader spots the machine. The fact that follows carries the weight without the cue.

### 'Honest' or 'fair' as a self-certifying adjective (38 findings)

"Honest", "honesty" and "honestly" appear 57 times; "honesty requires", "honesty says so", "honesty forbids" and "honesty keeps" recur as a formula. "Fair", "fairly" and "fairness" do the same job in the-counter-reformation, the-long-middle and awakenings-and-enlightenment. Four subtitles and two section titles certify the essay's own honesty. After the fixes 19 uses remain, nearly all of them describing someone else.

- `after-christendom-era.json` › section.body `the-accelerant`
  - Now: "Yet the same experiment ran the other direction too, and honesty requires both results."
  - Replace with: "Yet the same experiment ran the other direction too."
  - Why: The brief allows one use per essay. The library uses honest/honesty 57 times and 'fair/fairly/fairness' as a framing device in most essays. Prose that keeps certifying its own honesty reads as generated.
- `the-counter-reformation.json` › section.body `trent`
  - Now: "Honesty requires a Protestant to say so plainly. Rome did reform"
  - Replace with: "A Protestant should say so plainly. Rome did reform"
  - Why: The brief allows one use per essay. The library uses honest/honesty 57 times and 'fair/fairly/fairness' as a framing device in most essays. Prose that keeps certifying its own honesty reads as generated.
- `reformation-and-its-wars.json` › section.body `worms-and-the-word`
  - Now: "appears in the earliest printed accounts rather than the transcript, and honesty says so; the church"
  - Replace with: "appears in the earliest printed accounts rather than the transcript; the church"
  - Why: The brief allows one use per essay. The library uses honest/honesty 57 times and 'fair/fairly/fairness' as a framing device in most essays. Prose that keeps certifying its own honesty reads as generated.

### Aphoristic closer, fragment stack or symmetrical pair (49 findings)

Two-beat epigrams, mirror-image sentence pairs and fragment stacks at paragraph ends. The four dash-heavy essays close nearly every section this way; the long modern essays do it every third paragraph. The findings keep the one line per section that the argument has earned and fold or cut the rest.

- `apostolic-and-persecuted.json` › section.body `what-they-had`
  - Now: "They built for weight. We build for weekends. The difference is the whole assignment."
  - Replace with: "They built churches that could carry weight, and we have mostly built for the weekend."
  - Why: Three-beat epigram with alliteration as the last line of the essay. It is the clever kicker the brief forbids, and it could be printed on a conference banner.
- `after-christendom-era.json` › section.body `trust-audited`
  - Now: "The lawyers before the lambs. The brand before the body. Reputations managed while children paid."
  - Replace with: "They called the lawyers before they cared for the wounded, and managed reputations while children paid."
  - Why: Two alliterative fragments (lawyers/lambs, brand/body) in the paragraph about abused children. Wordplay at that moment reads as a machine reaching for a slogan, and it costs the paragraph its gravity.
- `the-desert-and-the-rule.json` › section.body `the-rule`
  - Now: "The pillar saints astonish. The Rule endures. Benedict bet on the long mercy of the daily, and he won."
  - Replace with: "The pillar saints still astonish people, but it is the Rule that lasted."
  - Why: Two three-word sentences in mirror, then a coined phrase ('the long mercy of the daily').

### Announced turn or signpost (29 findings)

"Here is the...", "Now the...", "And then the...", "One more fact, and it must not be softened". Each announces a move the next sentence makes anyway. Plain signposting ("This essay tells how that happened") is his habit and was left alone.

- `the-age-of-martyrs.json` › section.body `the-aftermath`
  - Now: "Here is the part of the story the stained glass leaves out. Most Christians were not heroes."
  - Replace with: "Most Christians were not heroes."
  - Why: 'Here is the...', 'Now the...', 'And then the...' announce a move instead of making it. The brief lists these among the tells earlier judges caught.
- `the-american-experiment.json` › section.body `the-almighty-has-his-own-purposes`
  - Now: "It stings a pastor to write the obvious sentence, so I will write it slowly. The deepest American sermon"
  - Replace with: "The deepest American sermon"
  - Why: 'Here is the...', 'Now the...', 'And then the...' announce a move instead of making it. The brief lists these among the tells earlier judges caught.
- `the-church-that-outlived-rome.json` › section.body `the-reckoning`
  - Now: "Now the hard accounting, because this era carries the church's shame as well as its glory, and sometimes in the same event."
  - Replace with: "This era carries the church's shame as well as its glory, and sometimes in the same event."
  - Why: 'Here is the...', 'Now the...', 'And then the...' announce a move instead of making it. The brief lists these among the tells earlier judges caught.

### Flat, contraction-free textbook voice (13 findings)

Four short essays (the-apostolic-age, the-great-councils, the-east-west-schism, the-reformation) have the opposite problem from the rest. They carry no dashes and almost no slogans, and also no person. the-apostolic-age has zero contractions in 1,341 words; four questions across these essays are punctuated as statements; "We should..." and "We should not pretend..." open paragraph after paragraph. They read as competent handouts that any church could post unchanged.

- `the-apostolic-age.json` › section.body `the-apostolic-fathers`
  - Now: "What happens when the eyewitnesses are gone."
  - Replace with: "What happens when the eyewitnesses are gone?"
  - Why: A question written as a statement.
- `the-east-west-schism.json` › section.body `one-church-two-worlds`
  - Now: "We should begin with sympathy for both. The Greek East"
  - Replace with: "The Greek East"
  - Why: This sentence could sit in any church-history handout. No contraction where speech would have one, a 'We should...' opener, or a question written as a statement.
- `the-apostolic-age.json` › section.body `what-held-them`
  - Now: "We are the ones who came in late. We should learn from how they waited."
  - Replace with: "We came in late, and we could learn from how they waited."
  - Why: Generic closing exhortation. This is the weakest ending in the library; a real detail from James would do more than any rewording.

### Stock line or motif reused across essays (6 findings)

The accounting metaphor (ledger, bill, invoice, receipt, audit, price tag, tuition) appears 40 times across fourteen essays and supplies three kickers and two titles. Other repeats: "what you win them with is what you win them to" (two essays), "one ordinary Tuesday at a time" (two endings), Rome "collecting gods the way it collected provinces" (two essays), "the whole era is folded inside it" (two essays), "lived inside that sentence / that answer" (two essays), "no modern consultant would fund / recognize" (two essays).

- `after-christendom-era.json` › section.body `taking-it-apart-in-public`
  - Now: "The deconstruction wave is, among other things, the attractional era's invoice, arriving a generation late and addressed to the children."
  - Replace with: "The deconstruction wave is, among other things, what the attractional era cost, and the children paid it."
  - Why: Ledger motif again: invoice here, 'receipt coming due' in the-long-middle, 'the receipts landed on the Enlightenment's desk' and 'its invoice, still being paid' in reformation-and-its-wars, 'the bill for it' in the-missionary-century, 'In 1517 the bill came due' in the-medieval-west.
- `reformation-and-its-wars.json` › section.body `the-bill-arrives`
  - Now: "It spent Europe's trust in Christ's name, one massacre at a time, and the receipts landed on the Enlightenment's desk."
  - Replace with: "It spent Europe's trust in Christ's name, one massacre at a time, and the Enlightenment took note."
  - Why: Ledger motif.
- `the-age-of-martyrs.json` › section.body `what-rome-wanted`
  - Now: "The empire was broad-minded about gods, collecting them the way it collected provinces."
  - Replace with: "The empire was broad-minded about gods and had room for most of them."
  - Why: The same simile sits in apostolic-and-persecuted ('The empire collected gods the way it collected provinces'). Keep it in one essay only.

### Literary heading or kicker where a plain one belongs (10 findings)

Most section titles are plain and good ("What Rome Actually Wanted", "Was Constantine Sincere", "What Made Luther Possible"). These are the ones that are literary or clever instead.

- `after-christendom-era.json` › section.title `trust-audited`
  - Now: "Trust, Audited"
  - Replace with: "The Abuse Reckonings"
  - Why: The brief asks for plain descriptive headings. A reader scanning the page should learn what the section covers.
- `the-long-middle.json` › section.title `the-spring-is-loaded`
  - Now: "The Spring Is Loaded"
  - Replace with: "On the Eve of the Reformation"
  - Why: The brief asks for plain descriptive headings. A reader scanning the page should learn what the section covers.
- `reformation-and-its-wars.json` › section.title `the-bill-arrives`
  - Now: "The Bill Arrives"
  - Replace with: "The Wars of Religion"
  - Why: The brief asks for plain descriptive headings. A reader scanning the page should learn what the section covers.

### Scholar-and-year citation formula (3 findings)

Mild, and confined to after-christendom-era, where three sources are introduced with the same year-and-title formula. In the library as a whole the named scholars do real work (Hatch, Noll, Stout, Bebbington, Kreider, Walls, Sanneh each carry an idea), which is a strength.

- `after-christendom-era.json` › section.body `christendom-ends-here-not-everywhere`
  - Now: "In 2002 the historian Philip Jenkins published The Next Christendom and set before Western readers"
  - Replace with: "The historian Philip Jenkins, in The Next Christendom, set before Western readers"
  - Why: 'In YEAR the historian X published TITLE' repeated through one essay is the scholar parade the brief names. The year already sits in the key-figures list.
- `after-christendom-era.json` › section.body `houses-in-babylon`
  - Now: "In 2016 the historian Alan Kreider published The Patient Ferment of the Early Church, an account of"
  - Replace with: "The historian Alan Kreider wrote The Patient Ferment of the Early Church, an account of"
  - Why: 'In YEAR the historian X published TITLE' repeated through one essay is the scholar parade the brief names. The year already sits in the key-figures list.
- `after-christendom-era.json` › section.body `the-rival-catechist`
  - Now: "The social psychologist Jonathan Haidt, in The Anxious Generation in 2024, assembled"
  - Replace with: "The social psychologist Jonathan Haidt, in The Anxious Generation, assembled"
  - Why: 'In YEAR the historian X published TITLE' repeated through one essay is the scholar parade the brief names. The year already sits in the key-figures list.

### Two single findings

- **Crisis-facing passage with no path to help.** `after-christendom-era.json` › `trust-audited`
  - Now: "It is repentance, the public kind, the costly kind, the kind that sides with the wounded because their Shepherd does."
  - Replace with: "It is repentance, the public kind, the costly kind, the kind that sides with the wounded because their Shepherd does. If this history is your own, abuse by a church leader should be reported to the authorities, and the Find Help page on this site (/help) is a place to start."
  - Why: The section describes abuse by church leaders. The integrity rules ask that such a passage say abuse should be reported to the authorities and keep help visible.
- **Forbidden-language word.** `the-attractional-era.json` › `mission-leaves-home`
  - Now: "discipleship to the Navigators, the intellect"
  - Replace with: "discipleship to Trotman's organization, the intellect"
  - Why: 'Navigate' is on the forbidden list and the brief says to watch it inside proper names. The first mention has to name the organization; the second need not.

### Checked and clean

- Political criticism runs in both directions. after-christendom-era criticises the nationalist capture and the progressive capture in adjoining paragraphs; the-american-experiment grieves both the social gospel's heirs and the fundamentalist retreat; the-global-church says the modernists "were not villains". The warnings about power (Constantine, Christendom, the crusades) are aimed at "us" every time.
- Scripture: fourteen quotations, each with its reference beside it, each used inside the argument. They read as ESV; I did not have a text to check them against in this session.
- No statement of years in ministry or book count. "Pastor" and "Baptist church" are stated, which NOTES.md allows.
- The mention of Edwards's uncle's suicide is one plain historical sentence with no detail. No change needed.

## 2. The ten worst passages

**1. `the-american-experiment.json` › `when-we-chose-slavery`**

> That body is the Southern Baptist Convention. My convention, the largest Protestant denomination in America, was organized so that a man could hold human beings in bondage and carry the gospel at the same time, and the founders saw no contradiction, and they were our founders.

Replace with:

> That body is the Southern Baptist Convention. The largest Protestant denomination in America was organized so that a man could hold human beings in bondage and carry the gospel at the same time, and the founders saw no contradiction.

'My convention' and 'our founders' state Southern Baptist membership as fact. NOTES.md marks that unconfirmed and says never to imply it. If James's church is in the convention he can restore the two phrases himself.

**2. `the-american-experiment.json` › `the-machinery-of-revival`**

> I am not describing other people. I am a revivalist Baptist by blood; I was raised counting decisions, and I have stood at the front and counted them myself, and I know the particular temptation to preach for the response the count requires.

Replace with:

> I am not describing other people. I pastor in this tradition, and I know the temptation to preach for the response the count requires.

'A revivalist Baptist by blood' and 'I was raised counting decisions' contradict the confirmed biography: James came to faith as an adult, from atheism. This is invented biography used as a credential. The altar-call scene is unconfirmed; James can put it back in his own words if it happened.

**3. `the-attractional-era.json` › `the-audit`**

> I learned to read an attendance spreadsheet before I learned to sit with a dying man. I have called an auditorium a sanctuary and an audience a congregation. I have preached, on more Sundays than I care to count, to backs the stage had taught to watch, and I have felt the small lift when the numbers came in high and told myself the lift was joy over the lost.

Replace with:

> Many of us learned to read an attendance spreadsheet before we learned to sit with a dying man. We called an auditorium a sanctuary and an audience a congregation, and when the numbers came in high we told ourselves the lift we felt was joy over the lost.

Four first-person confessions in anaphora ('I learned... I have called... I have preached... I have felt'), none of them a confirmed fact, and one that does not parse ('to backs the stage had taught to watch'). It reads as manufactured vulnerability. 'We' carries the same weight without inventing James's history.

**4. `reformation-and-its-wars.json` › `marburg-and-the-radicals`**

> Here the writer stops narrating and confesses, because his own tradition sits in this dock twice. Baptists cherish the Anabaptists' convictions — the believers' church, baptism upon faith, the gathered congregation free of the state.

Replace with:

> My own tradition sits in this dock twice. Baptists cherish the Anabaptists' convictions: the believers' church, baptism upon faith, the gathered congregation free of the state.

A stage direction in the third person ('the writer stops narrating and confesses'). Nobody writes about himself this way; it is the self-implication rule turned into prose.

**5. `after-christendom-era.json` › `the-flag-and-the-cause`**

> Now turn the same instrument the other direction, with the same grief. The opposite capture rarely carries flags into buildings

Replace with:

> There is an opposite capture, and it deserves the same grief. It rarely carries flags into buildings

This is CLAUDE.md's guardrail ('with the same instrument and the same grief') quoted almost word for word inside the essay.

**6. `apostolic-and-persecuted.json` › `what-they-had`**

> So take the inventory one last time. They had no buildings; we have campuses, and cannot keep the people in them. They had no platforms; we have production, and it forms spectators. They had no political standing; we have spent decades purchasing it, and the bill has come due in credibility. They had catechesis measured in years; we have assimilation measured in weeks. They had a table that leveled senator and slave; we have services sorted by preference. They had elders who expected prison; we have leaders who expect growth.

Replace with:

> Set their inventory beside ours. They had no buildings, and we have campuses we can't keep people in. They had no platforms, and our production forms spectators. They had no political standing, and we have spent decades buying it at the cost of our credibility. Their catechesis was measured in years and ours is measured in weeks. Their table leveled senator and slave, and our services are sorted by preference.

Six 'They had X; we have Y' sentences in a row, each split by a semicolon at the same point. No person writes six identical sentence frames; the last pair ('elders who expected prison; leaders who expect growth') is there for the rhythm, so the replacement drops it.

**7. `after-christendom-era.json` › `trust-audited`**

> The lawyers before the lambs. The brand before the body. Reputations managed while children paid.

Replace with:

> They called the lawyers before they cared for the wounded, and managed reputations while children paid.

Two alliterative fragments (lawyers/lambs, brand/body) in the paragraph about abused children. Wordplay at that moment reads as a machine reaching for a slogan, and it costs the paragraph its gravity.

**8. `awakenings-and-enlightenment.json` › `the-rival-account`**

> The Enlightenment got the symptom right and the anthropology wrong. But a church that only says that sentence, and never says the one before it, has learned nothing from the century that produced its sharpest critics. Both sentences are true. The order matters: confession first.

Replace with:

> The Enlightenment was right about the church's cruelty and wrong about the human heart. A church that says only the second half has learned nothing from the century that produced its sharpest critics. The confession comes first.

CLAUDE.md's stock verdict on secular sources reproduced verbatim, then three sentences of the prose discussing its own sentences.

**9. `the-american-experiment.json` › `the-man-nobody-knows`**

> Consumer, individualist, entertainment, political: every lens this platform spends itself diagnosing was ground and fitted here, mostly by people who loved God and meant well, which is the most frightening sentence in this essay.

Replace with:

> The consumer lens, the individualist lens, the entertainment lens and the political lens were all ground and fitted here, mostly by people who loved God and meant well. That should frighten us more than it does.

Lists the platform's own taxonomy by name and then rates its own sentence.

**10. `apostolic-and-persecuted.json` › `what-they-had`**

> They built for weight. We build for weekends. The difference is the whole assignment.

Replace with:

> They built churches that could carry weight, and we have mostly built for the weekend.

Three-beat epigram with alliteration as the last line of the essay. It is the clever kicker the brief forbids, and it could be printed on a conference banner.

## 3. Which pieces sound most like a machine, and which sound most like him

**Most machine-sounding, worst first**

1. `apostolic-and-persecuted`: 45 dashes in 2,400 words, four one-word sentences in a row, six identical "They had X; we have Y" frames, and a three-beat slogan for a last line. The history is sound; the delivery is the old register at full volume.
2. `the-long-middle`: 51 dashes, "Steelman the crusaders", "the practice this platform stakes itself on", nine imperatives to the reader, an aphorism closing most paragraphs.
3. `reformation-and-its-wars`: 51 dashes, James in the third person three times ("the writer"), "no both-sides mush", the invoice-and-receipt motif twice.
4. `councils-and-creeds`: 49 dashes and the symmetrical four-sentence ending, though its theology paragraphs (Arius, the four adverbs) are among the best explanations in the library.
5. `after-christendom-era`: no dashes, but the heaviest rulebook leakage: steelman twice, "this platform" three times, the same-instrument-same-grief line, "the thesis of this essay".

**Flattest and most generic** (could run on any church's page unchanged): `the-apostolic-age`, `the-reformation`, `the-great-councils`, `the-east-west-schism`.

**Most his**

1. `the-desert-and-the-rule`: unhurried, exact, funny in the right places (Abba Moses and the leaking basket), and it ends on a question that carries the whole essay: "What would you sell?"
2. `the-fathers-at-work`: "Documents are kept safe by people who will pay for them." Doctrine as pastoral work, friendship and its injuries, an ending that implicates us without announcing it.
3. `the-church-that-outlived-rome`: Patrick's Confession "forgives"; Alcuin "was right, he said it at the time, and he was ignored"; "Europe was baptized, and Europe was not converted".
4. `the-constantinian-turn`: the fairest treatment of a contested figure in the library, with a real concession to the survivors of Diocletian before any criticism.
5. `the-missionary-century`: Azariah asking for friends; Chuma and Susi carrying Livingstone's body; "God had used the ships without blessing the cargo manifests."
6. Inside the long essays, the passages that are plainly his once the scaffolding comes off: Richard Allen and the hush harbors (`the-american-experiment` › `the-faith-they-kept`), Lincoln's Second Inaugural (same essay), Franklin and Whitefield's thirty-year friendship (`awakenings-and-enlightenment`), the Willow Creek REVEAL study (`the-attractional-era` › `the-audit`), and Jeremiah 29 as the assignment (`after-christendom-era` › `houses-in-babylon`).

## 4. For James

1. Are you, or is First Baptist Fenton, part of the Southern Baptist Convention? the-american-experiment says so six times ("My convention", "they were our founders", "my people", "we repent", "I am glad we said it", "it took us until 1995"). Your notes mark this unconfirmed, so the replacements take you out of those sentences. If it is true, put yourself back in; the section is stronger with you in it.
2. the-american-experiment says "I am a revivalist Baptist by blood; I was raised counting decisions." You came to faith as an adult, from atheism, so this is not your life. The replacement removes it. This is the most serious single sentence in the library.
3. These first-person scenes are not among your confirmed facts. Each needs a yes, a no, or your own wording: "I learned to read an attendance spreadsheet before I learned to sit with a dying man" and the three sentences after it (the-attractional-era); "I was formed by the unbundled world, trained on its materials" (same); "I have preached sermons that were correct in every clause and cost me nothing, and I have sat with church members who could pass a doctrine exam and could not pray" (awakenings-and-enlightenment); "the ache to be approved by the culture when my convictions embarrass me at dinner" (after-christendom-era, left in place for you to judge); "I have stood at the front and counted them myself" and "I have shelves of them" about old hymnals (the-american-experiment). Where I offered a replacement it moves the sentence to "we" so nothing is claimed about you.
4. A real memory would do more than any edit in four places: the endings of the-apostolic-age, the-great-councils, the-east-west-schism and the-reformation. They are accurate and nobody is in them. One true sentence from you in each (what Nicaea's creed sounds like said aloud in your church, what a former atheist makes of an empty tomb as the first explanation offered) would move them from handout to yours. I did not invent any.
5. Your saved Substack profile and docs/VOICE-JAMES-BELL.md disagree, and I judged by the second, as that file says to. The profile asks for two-to-four-sentence paragraphs, "stacked landing lines", a screenshot line in every piece, and a Monday-morning block of three questions and a practice. The voice standard asks for developed paragraphs, one earned verdict, and no slogans. The four dash-heavy essays follow the profile's older habits almost exactly, which is why they score lowest here. If you want the stacked lines back, say so and the CLOSER findings should be skipped.
6. The index lists 22 essays, but eight of them cover ground twice: apostolic-and-persecuted overlaps the-apostolic-age and the-age-of-martyrs; councils-and-creeds overlaps the-constantinian-turn, the-great-councils and the-fathers-at-work; the-long-middle overlaps the-church-that-outlived-rome and the-medieval-west; reformation-and-its-wars overlaps the-reformation and the-counter-reformation; awakenings-and-enlightenment overlaps the-awakenings. Stories and even similes repeat between the pairs. You may want one telling of each era rather than two.
7. The overlapping essays disagree on four numbers, and I changed none of them. Augustine wrote The City of God over "thirteen years" (the-church-that-outlived-rome, the-constantinian-turn) or "fifteen years" (councils-and-creeds). Germany lost "something like a third of its people" (awakenings-and-enlightenment), "a third" in the hardest-hit territories (reformation-and-its-wars), or "perhaps a fifth" (the-counter-reformation). The Fundamentals went out in "some three million copies" (the-american-experiment) or "by the hundreds of thousands" (the-global-church). Nicaea was contested for "fifty years" (councils-and-creeds, the-fathers-at-work) or "sixty years" (the-great-councils). Someone should check each against a source and make the pairs agree.
8. I could not verify quotations in this session and flag none as wrong. The ones printed inside quotation marks as verbatim are worth a source check before you call the library finished: Hearst's "puff Graham"; Christian Smith's "a combination Divine Butler and Cosmic Therapist"; Wesley's "about a quarter before nine", "I felt my heart strangely warmed" and "submitted to be more vile"; Polycarp's "Eighty-six years have I served him, and he has done me no wrong"; the first of the Ninety-five Theses; the Rule's "Idleness is the enemy of the soul"; Lincoln's "The Almighty has His own purposes"; Youth for Christ's "geared to the times" and "anchored to the Rock"; Warren's "It's not about you"; the Four Spiritual Laws' "a wonderful plan for your life".
9. The abuse section of after-christendom-era ("Trust, Audited") has no path to help. I proposed one closing sentence saying abuse by a church leader should be reported to the authorities and pointing to the Find Help page. The essay body renders as plain text, so it names the page rather than linking it. Your call on the wording.
10. "The Navigators" contains a word on your forbidden list. It is the organization's name and the first mention has to stand; I offered a rewording for the second. If a validator is ever pointed at this folder it will need to allow the name.
11. These 22 files hold 201 dashes while the site's no-dash rule is in force, which suggests the folder is outside the dash and voice checks that cover the essay shelf. After the fixes land, it would be worth having the same checks read this folder so the problem cannot come back.

## 5. All findings by file

The JSON file is the source for applying fixes. This list is the same content for reading. Severity: **must** = banned by the brief or wrong on the facts of his life; **should** = a pattern a careful reader hears; **consider** = judgement call.

### after-christendom-era.json (37)

- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-flag-and-the-cause`
  - Now: "Start with the steelman, because the fears underneath it are not fake."
  - Replace with: "The fears underneath it are not fake."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-flag-and-the-cause`
  - Now: "Its steelman is also real. These believers watched"
  - Replace with: "Its case is real too. These believers watched"
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-flag-and-the-cause`
  - Now: "Now turn the same instrument the other direction, with the same grief. The opposite capture rarely carries flags into buildings"
  - Replace with: "There is an opposite capture, and it deserves the same grief. It rarely carries flags into buildings"
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-flag-and-the-cause`
  - Now: "This platform calls it what the older tradition would call it: not conservatism, not patriotism, but idolatry, the cross conscripted into a flag."
  - Replace with: "The older tradition would not call it conservatism or patriotism. It would call it idolatry, the cross conscripted into a flag."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `taking-it-apart-in-public`
  - Now: "But honoring the grief is not the same as following it all the way down, and this platform's conviction, stated here as history because the era itself is starting to show it, is that deconstruction honored honestly is still only demolition, and demolition is not a dwelling."
  - Replace with: "But honoring the grief is not the same as following it all the way down. Deconstruction, even when its grief is honored, is still only demolition, and nobody can live in a demolition."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-rival-catechist`
  - Now: "Haidt does not write as a churchman, and the platform's rule for secular findings applies to him as to everyone: he has the symptom right and the anthropology short."
  - Replace with: "Haidt does not write as a churchman. He has the symptom right, but his account of what a human being is stops short."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-rival-catechist`
  - Now: "into the same contest for your attention that I am indicting. The indictment includes the instrument, and the writer holding it."
  - Replace with: "into the same contest for your attention that I am criticizing. I'm using the thing I'm warning you about."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `houses-in-babylon`
  - Now: "So here is the thesis of this essay, and the conviction under this whole library: what is dying in the West is Christendom's furniture, not Christ's church."
  - Replace with: "What is dying in the West is Christendom's furniture, not Christ's church."
- **must** · Aphoristic closer, fragment stack or symmetrical pair · section.body `trust-audited`
  - Now: "The lawyers before the lambs. The brand before the body. Reputations managed while children paid."
  - Replace with: "They called the lawyers before they cared for the wounded, and managed reputations while children paid."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-flag-and-the-cause`
  - Now: "I write neither of those paragraphs from a distance. I have felt both pulls from the inside:"
  - Replace with: "I have felt both pulls:"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `trust-audited`
  - Now: "And I cannot write that sentence from outside it. I hold a title, pastor,"
  - Replace with: "I hold a title, pastor,"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-rival-catechist`
  - Now: "Understand what that means in this library's terms. Catechesis is not a classroom program;"
  - Replace with: "Catechesis is not a classroom program;"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `houses-in-babylon`
  - Now: "And now the countersigns, reported carefully, because they are observations rather than statistics, and this essay promised not to blur that line."
  - Replace with: "There are countersigns, and they are observations, not statistics."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `forty-million-quiet-departures`
  - Now: "Treat what follows accordingly: not a verdict of history but a report from the middle of the night, filed by a man who is also in the dark. Some of it will look wrong in fifty years. The task is to be honest now anyway."
  - Replace with: "So read what follows as a report from the middle of it, written by a man who can't see the end either. Some of it will look wrong in fifty years."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `taking-it-apart-in-public`
  - Now: "Hear the indictment inside that. Many deconstructors"
  - Replace with: "Many deconstructors"
- **should** · Imperative stage direction to the reader · section.body `taking-it-apart-in-public`
  - Now: "Honor the grief, because much of what was dismantled deserved to be dismantled."
  - Replace with: "The grief deserves honor, because much of what was dismantled deserved to be dismantled."
- **should** · Imperative stage direction to the reader · section.body `trust-audited`
  - Now: "Name the pattern precisely, because the pattern, not the existence of sinners, is what the era cannot forgive."
  - Replace with: "The pattern, not the existence of sinners, is what the era cannot forgive."
- **should** · Imperative stage direction to the reader · section.body `trust-audited`
  - Now: "So refuse the comfortable telling on both sides. The world did not"
  - Replace with: "The world did not"
- **should** · Imperative stage direction to the reader · section.body `forty-million-quiet-departures`
  - Now: "Begin with the fact that frames everything else. In the last quarter century"
  - Replace with: "In the last quarter century"
- **should** · Imperative stage direction to the reader · section.body `christendom-ends-here-not-everywhere`
  - Now: "Now widen the lens, because the era looks entirely different from almost anywhere else on earth."
  - Replace with: "The era looks entirely different from almost anywhere else on earth."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-accelerant`
  - Now: "Yet the same experiment ran the other direction too, and honesty requires both results."
  - Replace with: "Yet the same experiment ran the other direction too."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `houses-in-babylon`
  - Now: "The counting is not done, and honesty forbids announcing a revival."
  - Replace with: "The counting is not done, and nobody should announce a revival."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `trust-audited`
  - Now: "and if I am honest, the deference was never good for us"
  - Replace with: "and the deference was never good for us"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `trust-audited`
  - Now: "No account of the era's exits can be honest without this section, and no section of this essay is heavier to write. The revelations came"
  - Replace with: "The revelations came"
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `christendom-ends-here-not-everywhere`
  - Now: "We are not pioneers of some unprecedented darkness. We are latecomers to normal."
  - Replace with: "We are not pioneers of some unprecedented darkness."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `houses-in-babylon`
  - Now: "and found there not a technique but a temperament. Patience. The one virtue no growth strategy ever budgeted for."
  - Replace with: "and found there not a technique but patience, the one virtue no growth strategy ever budgeted for."
- **should** · Crisis-facing passage with no path to help · section.body `trust-audited`
  - Now: "It is repentance, the public kind, the costly kind, the kind that sides with the wounded because their Shepherd does."
  - Replace with: "It is repentance, the public kind, the costly kind, the kind that sides with the wounded because their Shepherd does. If this history is your own, abuse by a church leader should be reported to the authorities, and the Find Help page on this site (/help) is a place to start."
- **consider** · Rulebook leakage: the prose names its own method or the platform · section.body `christendom-ends-here-not-everywhere`
  - Now: "That reframe should discipline every sentence a Western Christian writes about decline, including every sentence in this essay."
  - Replace with: "That should discipline every sentence a Western Christian writes about decline, mine included."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-accelerant`
  - Now: "The pandemic built almost nothing and destroyed almost nothing. It revealed. It was the stress test"
  - Replace with: "The pandemic built almost nothing and destroyed almost nothing. It was the stress test"
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-flag-and-the-cause`
  - Now: ""No; but I am the commander of the army of the LORD. Now I have come" (Joshua 5:13-14). No. The Lord does not enlist."
  - Replace with: ""No; but I am the commander of the army of the LORD. Now I have come" (Joshua 5:13-14). The Lord does not enlist."
- **consider** · Stock line or motif reused across essays · section.body `taking-it-apart-in-public`
  - Now: "The deconstruction wave is, among other things, the attractional era's invoice, arriving a generation late and addressed to the children."
  - Replace with: "The deconstruction wave is, among other things, what the attractional era cost, and the children paid it."
- **consider** · Scholar-and-year citation formula · section.body `christendom-ends-here-not-everywhere`
  - Now: "In 2002 the historian Philip Jenkins published The Next Christendom and set before Western readers"
  - Replace with: "The historian Philip Jenkins, in The Next Christendom, set before Western readers"
- **consider** · Scholar-and-year citation formula · section.body `houses-in-babylon`
  - Now: "In 2016 the historian Alan Kreider published The Patient Ferment of the Early Church, an account of"
  - Replace with: "The historian Alan Kreider wrote The Patient Ferment of the Early Church, an account of"
- **consider** · Scholar-and-year citation formula · section.body `the-rival-catechist`
  - Now: "The social psychologist Jonathan Haidt, in The Anxious Generation in 2024, assembled"
  - Replace with: "The social psychologist Jonathan Haidt, in The Anxious Generation, assembled"
- **consider** · Literary heading or kicker where a plain one belongs · section.title `trust-audited`
  - Now: "Trust, Audited"
  - Replace with: "The Abuse Reckonings"
- **consider** · Literary heading or kicker where a plain one belongs · section.title `the-accelerant`
  - Now: "The Accelerant"
  - Replace with: "What 2020 Revealed"
- **consider** · Literary heading or kicker where a plain one belongs · section.title `the-rival-catechist`
  - Now: "The Rival Catechist"
  - Replace with: "The Phone as Catechist"

### apostolic-and-persecuted.json (49)

- **must** · Aphoristic closer, fragment stack or symmetrical pair · section.body `what-they-had`
  - Now: "They built for weight. We build for weekends. The difference is the whole assignment."
  - Replace with: "They built churches that could carry weight, and we have mostly built for the weekend."
- **must** · Aphoristic closer, fragment stack or symmetrical pair · section.body `what-they-had`
  - Now: "So take the inventory one last time. They had no buildings; we have campuses, and cannot keep the people in them. They had no platforms; we have production, and it forms spectators. They had no political standing; we have spent decades purchasing it, and the bill has come due in credibility. They had catechesis measured in years; we have assimilation measured in weeks. They had a table that leveled senator and slave; we have services sorted by preference. They had elders who expected prison; we have leaders who expect growth."
  - Replace with: "Set their inventory beside ours. They had no buildings, and we have campuses we can't keep people in. They had no platforms, and our production forms spectators. They had no political standing, and we have spent decades buying it at the cost of our credibility. Their catechesis was measured in years and ours is measured in weeks. Their table leveled senator and slave, and our services are sorted by preference."
- **must** · Em-dash or en-dash outside a quotation · subtitle `subtitle`
  - Now: "and no cultural power — and the church grew anyway."
  - Replace with: "and no cultural power, and the church grew anyway."
- **must** · Em-dash or en-dash outside a quotation · section.body `no-advantages`
  - Now: "Count what they did not have. No buildings — for most of three centuries, Christians met in houses, and later in houses quietly enlarged. No legal standing — the movement was unregistered, suspect, and intermittently criminal. No professional clergy class with social rank, no publishing apparatus, no music industry, no political friends worth naming. No stage, no screen, no budget."
  - Replace with: "Count what they did not have. They had no buildings: for most of three centuries Christians met in houses, and later in houses quietly enlarged. They had no legal standing, because the movement was unregistered, suspect, and intermittently criminal. They had no professional clergy class with social rank, no publishing apparatus, no music industry, no political friends worth naming, and no stage, screen or budget."
- **must** · Em-dash or en-dash outside a quotation · section.body `what-rome-saw`
  - Now: "The pagan crowds called them atheists — people who had subtracted the gods from the city."
  - Replace with: "The pagan crowds called them atheists, people who had subtracted the gods from the city."
- **must** · Em-dash or en-dash outside a quotation · section.body `what-they-had`
  - Now: "Exiles. Not owners of the culture, not managers of it, not its persecuted victims sulking at the margins — resident foreigners, at home everywhere and nowhere, loving the city while refusing its gods."
  - Replace with: "Exiles are not owners of the culture, or managers of it, or its persecuted victims sulking at the margins. They are resident foreigners, at home everywhere and nowhere, loving the city while refusing its gods."
- **must** · Em-dash or en-dash outside a quotation · section.body `what-they-had`
  - Now: "Everything the attractional church has tried to buy — reach, credibility, devotion, growth — this church had without a denarius of it, and the currency was formation, community, and the willingness to die."
  - Replace with: "Everything the attractional church has tried to buy (reach, credibility, devotion, growth) this church had without a denarius, and what it paid in was formation, community, and the willingness to die."
- **must** · Em-dash or en-dash outside a quotation · section.body `what-they-had`
  - Now: "They would not recognize it as preparation for anything — not for exile, not for pressure, not for death, not for the God they served eighty-six years and found faithful."
  - Replace with: "They would not recognize it as preparation for exile, or pressure, or death, or for the God they served eighty-six years and found faithful."
- **must** · Em-dash or en-dash outside a quotation · section.body `what-they-had`
  - Now: "a test it had never trained for — not the sword, but the favor of the man who holds it."
  - Replace with: "a test it had never trained for, the favor of the man who holds the sword."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-witnesses`
  - Now: "The rigorists said never — holiness cannot readmit traitors."
  - Replace with: "The rigorists said never, because holiness cannot readmit traitors."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-witnesses`
  - Now: "real repentance, real penance, real restoration — grace that costs, mercy that does not lie."
  - Replace with: "real repentance, real penance, real restoration. It was grace that costs and mercy that does not lie."
- **must** · Em-dash or en-dash outside a quotation · section.body `plague-and-the-poor`
  - Now: "whether mercy converts efficiently — a question that would not have parsed in Carthage."
  - Replace with: "whether mercy converts efficiently, a question nobody in Carthage would have understood."
- **must** · Em-dash or en-dash outside a quotation · section.body `formation-before-belonging`
  - Now: "what the first Christians could have told us — that a crowd is not a church"
  - Replace with: "what the first Christians could have told us, that a crowd is not a church"
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Perpetua`
  - Now: "among the earliest surviving Christian writing by a woman — clear-eyed, unforced, and unbroken."
  - Replace with: "among the earliest surviving Christian writing by a woman."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Polycarp of Smyrna`
  - Now: "His recorded answer at trial — eighty-six years of service — became"
  - Replace with: "His recorded answer at trial, eighty-six years of service, became"
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Cyprian of Carthage`
  - Now: "with real repentance — mercy without lying about sin."
  - Replace with: "with real repentance, mercy without lying about sin."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Tertullian`
  - Now: "(c. 160–c. 220)"
  - Replace with: "(c. 160 to c. 220)"
- **must** · Em-dash or en-dash outside a quotation · section.body `no-advantages`
  - Now: "province of the empire and beyond it — in Persia, in North Africa, along"
  - Replace with: "province of the empire and beyond it, in Persia, in North Africa, along"
- **must** · Em-dash or en-dash outside a quotation · section.body `no-advantages`
  - Now: "things the first church lacked — the venue, the production, the marketing, the political access — and has watched, across those"
  - Replace with: "things the first church lacked (the venue, the production, the marketing, the political access) and has watched, across those"
- **must** · Em-dash or en-dash outside a quotation · section.body `what-rome-saw`
  - Now: "Outsiders heard fragments — eating a body, drinking blood, greeting one another as brother and sister, meeting before dawn behind closed doors — and assembled them into cannibalism"
  - Replace with: "Outsiders heard fragments (eating a body, drinking blood, greeting one another as brother and sister, meeting before dawn behind closed doors) and assembled them into cannibalism"
- **must** · Em-dash or en-dash outside a quotation · section.body `what-rome-saw`
  - Now: "day before light, sang a hymn — in his phrase, to Christ "as to a god" — bound themselves by oath not to"
  - Replace with: "day before light, sang a hymn (in his phrase, to Christ "as to a god"), bound themselves by oath not to"
- **must** · Em-dash or en-dash outside a quotation · section.body `what-rome-saw`
  - Now: "empire-wide storms came late and hard — Decius in 250 demanding a certificate"
  - Replace with: "empire-wide storms came late and hard: Decius in 250 demanding a certificate"
- **must** · Em-dash or en-dash outside a quotation · section.body `formation-before-belonging`
  - Now: "He entered the catechumenate — a season of instruction and testing"
  - Replace with: "He entered the catechumenate, a season of instruction and testing"
- **must** · Em-dash or en-dash outside a quotation · section.body `formation-before-belonging`
  - Now: "Didache lays out as the Two Ways — a way of life and a way of death,"
  - Replace with: "Didache lays out as the Two Ways, a way of life and a way of death,"
- **must** · Em-dash or en-dash outside a quotation · section.body `formation-before-belonging`
  - Now: "church grows by lowering thresholds — shorter services, easier membership,"
  - Replace with: "church grows by lowering thresholds: shorter services, easier membership,"
- **must** · Em-dash or en-dash outside a quotation · section.body `formation-before-belonging`
  - Now: "into a visibly different life — patient, generous, sexually disciplined, unafraid of death — and the difference was the argument."
  - Replace with: "into a visibly different life (patient, generous, sexually disciplined, unafraid of death), and the difference was the argument."
- **must** · Em-dash or en-dash outside a quotation · section.body `plague-and-the-poor`
  - Now: "disease broke over the Roman world — a great pestilence beginning in"
  - Replace with: "disease broke over the Roman world: a great pestilence beginning in"
- **must** · Em-dash or en-dash outside a quotation · section.body `plague-and-the-poor`
  - Now: "his words, as a kind of martyrdom — while the healthy pagan response,"
  - Replace with: "his words, as a kind of martyrdom, while the healthy pagan response,"
- **must** · Em-dash or en-dash outside a quotation · section.body `plague-and-the-poor`
  - Now: "sick nursed by Christians survived — basic care, food and water and warmth, saves lives in an epidemic — and the survivors had seen something"
  - Replace with: "sick nursed by Christians survived, because basic care, food and water and warmth, saves lives in an epidemic, and the survivors had seen something"
- **must** · Em-dash or en-dash outside a quotation · section.body `plague-and-the-poor`
  - Now: "the middle of the third century — the numbers come from the church's own correspondence — ransomed prisoners, buried the"
  - Replace with: "the middle of the third century (the numbers come from the church's own correspondence), ransomed prisoners, buried the"
- **must** · Em-dash or en-dash outside a quotation · section.body `plague-and-the-poor`
  - Now: "era closed, the emperor Julian — a pagan trying to rebuild paganism — complained in his letters that"
  - Replace with: "era closed, the emperor Julian, a pagan trying to rebuild paganism, complained in his letters that"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-witnesses`
  - Now: "seven letters that still exist — to churches, urging unity around their bishops and warning against teachers who made Christ a phantom, and one to the Christians of Rome with"
  - Replace with: "seven letters that still exist. They went to churches, urging unity around their bishops and warning against teachers who made Christ a phantom, and one went to the Christians of Rome with"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-witnesses`
  - Now: "church cannot imagine requesting — the freedom to pay the full price."
  - Replace with: "church cannot imagine requesting, the freedom to pay the full price."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-witnesses`
  - Now: "proconsul offered him the standard exit — curse Christ, live."
  - Replace with: "proconsul offered him the standard exit: curse Christ and live."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-witnesses`
  - Now: "named Perpetua kept a prison diary — among the earliest surviving Christian writing from a woman's hand — recording her father's pleading,"
  - Replace with: "named Perpetua kept a prison diary, among the earliest surviving Christian writing from a woman's hand, recording her father's pleading,"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-witnesses`
  - Now: "line near the end of his Apology — the blood of Christians is seed,"
  - Replace with: "line near the end of his Apology. The blood of Christians is seed,"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-witnesses`
  - Now: "Thousands of Christians folded — burned the incense, bought forged certificates, went home."
  - Replace with: "Thousands of Christians folded. They burned the incense, bought forged certificates, and went home."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.kicker `what-they-had`
  - Now: "The Verdict"
  - Replace with: "Looking Back"
- **should** · Imperative stage direction to the reader · section.body `no-advantages`
  - Now: "Now count what happened. A movement"
  - Replace with: "A movement"
- **should** · Imperative stage direction to the reader · section.body `formation-before-belonging`
  - Now: "Measure the distance from us. Our assumption"
  - Replace with: "Our assumption"
- **should** · Imperative stage direction to the reader · section.body `the-witnesses`
  - Now: "But tell the whole truth, because the era did. When Decius"
  - Replace with: "The whole truth is harder. When Decius"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `no-advantages`
  - Now: "We should be honest about why this era matters to us, and why it stings."
  - Replace with: "This era matters to us, and it stings."
- **should** · Announced turn or signpost · section.body `formation-before-belonging`
  - Now: "Here is the strangest fact of the era, the one the modern church can barely believe. The fastest-growing movement"
  - Replace with: "The fastest-growing movement"
- **should** · Announced turn or signpost · section.body `what-rome-saw`
  - Now: "And this must be said carefully, against the persecution stories we prefer: the pressure was episodic, not constant."
  - Replace with: "The pressure was episodic, not constant, whatever the persecution stories we prefer."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `no-advantages`
  - Now: "Teaching. Belonging. Table. Prayer. That is the entire program of the church that conquered the world, and there is not one line of it a modern consultant would fund."
  - Replace with: "Teaching, fellowship, the table and prayer were the entire program of the church that conquered the world, and a modern consultant would not fund a line of it."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `no-advantages`
  - Now: "The comparison is not nostalgic. It is diagnostic."
  - Replace with: "The point of the comparison is diagnosis, not nostalgia."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `formation-before-belonging`
  - Now: "Their onboarding process, we would call a growth barrier. Their growth, we would call a miracle. It was neither. It was formation, doing what formation does."
  - Replace with: "We would call their slow way in a growth barrier and their growth a miracle. It was formation, doing what formation does."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `formation-before-belonging`
  - Now: "We did not lose that by accident. We traded it. We decided"
  - Replace with: "We did not lose that by accident. We decided"
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `plague-and-the-poor`
  - Now: "The care was not strategy. It was obedience with consequences."
  - Replace with: "The care was obedience, not strategy, and it had consequences."

### awakenings-and-enlightenment.json (31)

- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-rival-account`
  - Now: "So state their case at full strength, because it deserves it. The Enlightenment proposed"
  - Replace with: "The Enlightenment proposed"
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-rival-account`
  - Now: "Here is what must be said from inside the church, and said without flinching. The Enlightenment saw real corruption and named it truly."
  - Replace with: "The church has to say this part itself. The Enlightenment saw real corruption and named it accurately."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-rival-account`
  - Now: "The Enlightenment got the symptom right and the anthropology wrong. But a church that only says that sentence, and never says the one before it, has learned nothing from the century that produced its sharpest critics. Both sentences are true. The order matters: confession first."
  - Replace with: "The Enlightenment was right about the church's cruelty and wrong about the human heart. A church that says only the second half has learned nothing from the century that produced its sharpest critics. The confession comes first."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `old-lights-and-new`
  - Now: "State it the way he would: God is a God of order, not confusion."
  - Replace with: "God, he argued, is a God of order, not confusion."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-free-market-of-faith`
  - Now: "The awakenings were real. Let the record show that this essay believes it: God moved in Northampton"
  - Replace with: "The awakenings were real. God moved in Northampton"
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-free-market-of-faith`
  - Now: "which is why the story this platform has to tell is mostly the story of the other one."
  - Replace with: "which is why most of the story from here is the story of the other one."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-first-celebrity`
  - Now: "There is a lesson in that for a platform like this one, and I do not intend to hurry past it."
  - Replace with: "There is a lesson in that for anyone who writes for skeptics."
- **should** · Biography beyond the confirmed facts, or a denominational claim · section.body `old-lights-and-new`
  - Now: "I note without embarrassment that this is my own family line: the Baptist multiplication in the South came out of this fire."
  - Replace with: "The Baptist multiplication in the South came out of this fire."
- **should** · Biography beyond the confirmed facts, or a denominational claim · section.body `the-peace-of-exhaustion`
  - Now: "I have preached sermons that were correct in every clause and cost me nothing, and I have sat with church members who could pass a doctrine exam and could not pray."
  - Replace with: "A sermon can be correct in every clause and cost the preacher nothing, and a church member can pass a doctrine exam and not know how to pray."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-rival-account`
  - Now: "We handed our critics their evidence. That is the confession."
  - Replace with: "We handed our critics their evidence."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `old-lights-and-new`
  - Now: "Both were partly right. That is not a diplomatic dodge; it is the verdict of the evidence."
  - Replace with: "Both were partly right, and the evidence says so."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `old-lights-and-new`
  - Now: "Somewhere under the quarrel lies the question this whole library keeps returning to, and it is worth stating plainly here because the next essay depends on it. When something powerful happens in a crowd, what exactly happened?"
  - Replace with: "Under the quarrel lies an older question. When something powerful happens in a crowd, what exactly happened?"
- **should** · Imperative stage direction to the reader · section.body `the-answer-of-the-heart`
  - Now: "Weigh Pietism fairly, both hands. It recovered something the systems had buried"
  - Replace with: "Pietism recovered something the systems had buried"
- **should** · Imperative stage direction to the reader · section.body `the-answer-of-the-heart`
  - Now: "Hold the balance and do not sneer in either direction. Cold orthodoxy"
  - Replace with: "Cold orthodoxy"
- **should** · Imperative stage direction to the reader · section.body `the-surprising-work`
  - Now: "Hold the two Edwardses together, because American Christianity would later insist on splitting them."
  - Replace with: "American Christianity would later split Edwards in two."
- **should** · Imperative stage direction to the reader · section.body `the-free-market-of-faith`
  - Now: "Be fair to what this was. Disestablishment"
  - Replace with: "Disestablishment"
- **should** · Imperative stage direction to the reader · section.body `the-peace-of-exhaustion`
  - Now: "Say it honestly: this was serious work by serious men"
  - Replace with: "This was serious work by serious men"
- **should** · Imperative stage direction to the reader · section.body `the-first-celebrity`
  - Now: "Remember the shape of that reasoning. America is about to build a century on it."
  - Replace with: "America is about to build a century on that reasoning."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `old-lights-and-new`
  - Now: "The awakening split New England, and the split deserves to be told fairly, because both sides were guarding something real and both sides lost something they did not intend to lose."
  - Replace with: "The awakening split New England. Both sides were guarding something real, and both sides lost something they did not intend to lose."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-first-celebrity`
  - Now: "The historian Harry Stout has pressed a harder reading, and it deserves its hearing."
  - Replace with: "The historian Harry Stout has pressed a harder reading."
- **should** · Announced turn or signpost · section.body `the-surprising-work`
  - Now: "And then the ending, which every pastor should be made to sit with. In 1750"
  - Replace with: "In 1750"
- **should** · Announced turn or signpost · section.body `the-surprising-work`
  - Now: "Awakening, it turns out, does not automatically become formation. That sentence is one of the two or three this whole era exists to teach."
  - Replace with: "Awakening, it turns out, does not automatically become formation."
- **should** · Announced turn or signpost · section.body `the-first-celebrity`
  - Now: "One more fact, and it must not be softened, because it points straight at the next essay. Whitefield's beloved"
  - Replace with: "Whitefield's beloved"
- **should** · Announced turn or signpost · section.body `the-free-market-of-faith`
  - Now: "And now say the other thing, because this is where the era's whole story gathers. A church that cannot compel must persuade."
  - Replace with: "A church that cannot compel must persuade."
- **should** · Announced turn or signpost · section.body `the-surprising-work`
  - Now: "that refusal is the first thing to learn from him. /  / The second is larger. When awakening returned"
  - Replace with: "that refusal is the first thing to learn from him. /  / When awakening returned"
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-surprising-work`
  - Now: "he refused to let the heat certify itself. The fire and the assay, together."
  - Replace with: "he refused to let the heat certify itself."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `a-warmed-heart-and-a-working-system`
  - Now: "and asked how it actually stood with their souls. Awakening with formation. The event with the hearth."
  - Replace with: "and asked how it actually stood with their souls."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-first-celebrity`
  - Now: "all of it was assembled here, by a sincere man, for the glory of God. The genie did not look like a genie. It looked like revival."
  - Replace with: "all of it was assembled here, by a sincere man, for the glory of God, and at the time it looked like revival."
- **consider** · Biography beyond the confirmed facts, or a denominational claim · section.body `the-free-market-of-faith`
  - Now: "The last act of this era happened in law, and my own people helped write it from the inside of jails."
  - Replace with: "The last act of this era happened in law, and Baptists helped write it from the inside of jails."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-first-celebrity`
  - Now: "The means served the end; the end justified the means."
  - Replace with: "The end justified the means."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-answer-of-the-heart`
  - Now: "It wanted the creed and the converted heart, the stone barn and the living grain. That refusal is the part worth keeping."
  - Replace with: "It wanted the creed and the converted heart, and that refusal is the part worth keeping."

### councils-and-creeds.json (47)

- **must** · Em-dash or en-dash outside a quotation · subtitle `subtitle`
  - Now: "at Nicaea and Chalcedon — and what the favor of Constantine began to cost."
  - Replace with: "at Nicaea and Chalcedon, and what the favor of Constantine began to cost."
- **must** · Em-dash or en-dash outside a quotation · section.body `when-the-empire-smiled`
  - Now: "was suddenly lawful — then favored, then fashionable."
  - Replace with: "was suddenly lawful, then favored, then fashionable."
- **must** · Em-dash or en-dash outside a quotation · section.body `when-the-empire-smiled`
  - Now: "and it is cheap for us — who have never been hunted — to sneer at them for it."
  - Replace with: "and it is cheap for us, who have never been hunted, to sneer at them for it."
- **must** · Em-dash or en-dash outside a quotation · section.body `a-priest-named-arius`
  - Now: "If the one who went to the cross is a creature — however exalted — then God did not save us;"
  - Replace with: "If the one who went to the cross is a creature, however exalted, then God did not save us;"
- **must** · Em-dash or en-dash outside a quotation · section.body `against-the-world`
  - Now: "is not secured by the power that convenes it — and that majorities, momentum, and imperial preference can all be wrong at once."
  - Replace with: "is not secured by the power that convenes it, and that majorities, momentum, and imperial preference can all be wrong at once."
- **must** · Em-dash or en-dash outside a quotation · section.body `against-the-world`
  - Now: "driven from his see into exile — by Constantine himself, then by Arian-leaning successors — and five times he came back"
  - Replace with: "driven from his see into exile, by Constantine himself and then by Arian-leaning successors, and five times he came back"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-face-of-god`
  - Now: "then what exactly is Jesus of Nazareth — God wearing a man, a man carrying God, or something the language had never had to say before?"
  - Replace with: "then what exactly is Jesus of Nazareth? Is he God wearing a man, a man carrying God, or something the language had never had to say before?"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-face-of-god`
  - Now: "Without confusion and without change: the one who holds you is truly God — no dilution arrived in Bethlehem. Without division and without separation: the one who holds you truly wept, was truly tempted, truly died — your humanity is not foreign territory to him."
  - Replace with: "Without confusion and without change means the one who holds you is truly God, undiluted in Bethlehem. Without division and without separation means the one who holds you truly wept, was truly tempted and truly died, so your humanity is not foreign territory to him."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-two-cities`
  - Now: "and the church took it — incompletely."
  - Replace with: "and the church took only part of it."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Constantine`
  - Now: "Sincere, shrewd, or both — the debate endures; the structural change he made does not."
  - Replace with: "Whether he was sincere, shrewd, or both is still debated. The change he made is not."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Athanasius of Alexandria`
  - Now: "Right against councils, majorities, and emperors — the era's proof"
  - Replace with: "He was right against councils, majorities, and emperors, the era's proof"
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `The Cappadocians`
  - Now: "and Gregory of Nazianzus — the theologians who gave"
  - Replace with: "and Gregory of Nazianzus, the theologians who gave"
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Cyril of Alexandria`
  - Now: "is the eternal Son — Theotokos as a statement about her child, not her rank."
  - Replace with: "is the eternal Son, so Theotokos is a statement about her child, not her rank."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Augustine of Hippo`
  - Now: "The City of God (after 410) — the two-cities argument"
  - Replace with: "The City of God (after 410), the two-cities argument"
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Benedict of Nursia`
  - Now: "whose short Rule — prayer, work, stability — carried formation"
  - Replace with: "whose short Rule of prayer, work, and stability carried formation"
- **must** · Em-dash or en-dash outside a quotation · section.body `when-the-empire-smiled`
  - Now: "seat near the church's decisions — Constantine himself would convene"
  - Replace with: "seat near the church's decisions. Constantine himself would convene"
- **must** · Em-dash or en-dash outside a quotation · section.body `a-priest-named-arius`
  - Now: "The Son — begotten, sent, praying in Gethsemane, dying — must therefore stand on the creature's"
  - Replace with: "The Son (begotten, sent, praying in Gethsemane, dying) must therefore stand on the creature's"
- **must** · Em-dash or en-dash outside a quotation · section.body `a-priest-named-arius`
  - Now: "across the world to Nicaea in 325 — some of them men still maimed"
  - Replace with: "across the world to Nicaea in 325, some of them men still maimed"
- **must** · Em-dash or en-dash outside a quotation · section.body `a-priest-named-arius`
  - Now: "Son is homoousios with the Father — of the same being, the same stuff"
  - Replace with: "Son is homoousios with the Father, of the same being, the same stuff"
- **must** · Em-dash or en-dash outside a quotation · section.body `against-the-world`
  - Now: "semi-Arian parties held the upper hand — because they held the emperors."
  - Replace with: "semi-Arian parties held the upper hand, because they held the emperors."
- **must** · Em-dash or en-dash outside a quotation · section.body `against-the-world`
  - Now: "The Cappadocians — Basil of Caesarea, his brother Gregory of Nyssa, and his friend Gregory of Nazianzus — gave the church the language to"
  - Replace with: "The Cappadocians (Basil of Caesarea, his brother Gregory of Nyssa, and his friend Gregory of Nazianzus) gave the church the language to"
- **must** · Em-dash or en-dash outside a quotation · section.body `against-the-world`
  - Now: "When a new reduction appeared — Apollinaris teaching that in Jesus the divine Word replaced the human mind, a Christ with a body like ours but not a soul like ours — Gregory of Nazianzus answered"
  - Replace with: "When a new reduction appeared (Apollinaris teaching that in Jesus the divine Word replaced the human mind, a Christ with a body like ours but not a soul like ours), Gregory of Nazianzus answered"
- **must** · Em-dash or en-dash outside a quotation · section.body `against-the-world`
  - Now: "giving the creed its full form — the one still said aloud, week"
  - Replace with: "giving the creed its full form, the one still said aloud, week"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-face-of-god`
  - Now: "capital loved to call Mary Theotokos — God-bearer, the one who gave birth"
  - Replace with: "capital loved to call Mary Theotokos, God-bearer, the one who gave birth"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-face-of-god`
  - Now: "His opponents — led by Cyril of Alexandria, brilliant and bare-knuckled in roughly equal measure — heard something fatal underneath"
  - Replace with: "His opponents (led by Cyril of Alexandria, brilliant and bare-knuckled in roughly equal measure) heard something fatal underneath"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-face-of-god`
  - Now: "eternally God, and so Theotokos stands — a statement about her Son, not"
  - Replace with: "eternally God, and so Theotokos stands, a statement about her Son, not"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-face-of-god`
  - Now: "humanity, one person in two natures — and then hung four adverbs on"
  - Replace with: "humanity, one person in two natures, and then hung four adverbs on"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-two-cities`
  - Now: "survived the blow, but the spell broke — and the pagans knew whom to blame."
  - Replace with: "survived the blow, but the spell broke, and the pagans knew whom to blame."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-two-cities`
  - Now: "mind and its most honest convert — the restless student of rhetoric"
  - Replace with: "mind and its most honest convert, the restless student of rhetoric"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-two-cities`
  - Now: "two cities, built by two loves — the earthly city built on love of self, the City of God built on love of God — and they run mingled through history"
  - Replace with: "two cities, built by two loves (the earthly city built on love of self, the City of God built on love of God), and they run mingled through history"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-two-cities`
  - Now: "No empire — however useful, however friendly, however Christian its emperors — is the kingdom, and the church"
  - Replace with: "No empire, however useful, however friendly, however Christian its emperors, is the kingdom, and the church"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-two-cities`
  - Now: "a short rule of prayer and work — hours for the Psalms, hands for"
  - Replace with: "a short rule of prayer and work: hours for the Psalms, hands for"
- **must** · Em-dash or en-dash outside a quotation · section.body `what-favor-costs`
  - Now: "Nicaea gave us the imperial church — bishops as officials, orthodoxy"
  - Replace with: "Nicaea gave us the imperial church: bishops as officials, orthodoxy"
- **must** · Em-dash or en-dash outside a quotation · section.body `what-favor-costs`
  - Now: "mistakes access for the kingdom — that cannot tell the difference between the favor of rulers and the blessing of God, that would rather advise Caesar than be crucified by him — is not facing a new temptation."
  - Replace with: "mistakes access for the kingdom, that cannot tell the difference between the favor of rulers and the blessing of God, that would rather advise Caesar than be crucified by him, is not facing a new temptation."
- **should** · Rulebook leakage: the prose names its own method or the platform · keyFigures.note `Arius`
  - Now: " Best answered, as at Nicaea, in the strong form his own followers preached."
  - Replace with: "(delete)"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `a-priest-named-arius`
  - Now: "State it that fairly, and you can feel the pull."
  - Replace with: "You can feel the pull."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-face-of-god`
  - Now: "Nestorius flinched, and give him his due, for reasons his defenders would still sign:"
  - Replace with: "Nestorius flinched, and he had reasons:"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `what-favor-costs`
  - Now: "When the church now sorts its convictions — what the creeds bind, what faithful churches may dispute, what is genuinely open — it is using this era's instrument, and it should say so with gratitude."
  - Replace with: "When the church sorts what the creeds bind from what faithful churches may dispute, it is using this era's work, and it should say so with gratitude."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.kicker `what-favor-costs`
  - Now: "The Verdict"
  - Replace with: "Looking Back"
- **should** · Imperative stage direction to the reader · section.body `what-favor-costs`
  - Now: "Hold the era's two stories side by side, because we are heirs of both."
  - Replace with: "The era left two stories, and we are heirs of both."
- **should** · Imperative stage direction to the reader · section.body `when-the-empire-smiled`
  - Now: "Be fair to the moment. The relief was real"
  - Replace with: "The relief was real"
- **should** · Imperative stage direction to the reader · section.body `what-favor-costs`
  - Now: "Name the American parallel once, plainly, and let it stand. A church"
  - Replace with: "There is an American parallel. A church"
- **should** · Imperative stage direction to the reader · section.body `the-face-of-god`
  - Now: "Read the adverbs pastorally, because that is what they are for."
  - Replace with: "The adverbs are pastoral."
- **should** · Announced turn or signpost · section.body `against-the-world`
  - Now: "Nicaea did not settle it. That is the part the tidy version leaves out."
  - Replace with: "Nicaea did not settle it."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `what-favor-costs`
  - Now: "The creeds were the era's gift. The empire was its test. The gift is still on the table, said aloud each week by a billion tongues. The test is still being taken — by us."
  - Replace with: "The creeds were the era's gift and the empire was its test. The gift is still said aloud each week by a billion tongues, and we are still taking the test."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `what-favor-costs`
  - Now: "It is failing this era's exam, with the answer key published. We have read The City of God. We keep building chapels in the earthly one."
  - Replace with: "It is failing this era's exam with the answer key published. We have read The City of God, and we keep building chapels in the earthly city."
- **consider** · Literary heading or kicker where a plain one belongs · section.title `when-the-empire-smiled`
  - Now: "When the Empire Smiled"
  - Replace with: "When the Empire Turned Friendly"

### reformation-and-its-wars.json (56)

- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `marburg-and-the-radicals`
  - Now: "Here the writer stops narrating and confesses, because his own tradition sits in this dock twice. Baptists cherish the Anabaptists' convictions — the believers' church, baptism upon faith, the gathered congregation free of the state."
  - Replace with: "My own tradition sits in this dock twice. Baptists cherish the Anabaptists' convictions: the believers' church, baptism upon faith, the gathered congregation free of the state."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `gift-and-fracture`
  - Now: "The writer is a Protestant pastor because he believes that recovery was true. This platform exists inside it."
  - Replace with: "I'm a Protestant pastor because I believe that recovery was true."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `worms-and-the-word`
  - Now: "Name the recoveries plainly, because they are the era's treasure and this platform's inheritance."
  - Replace with: "The recoveries are the era's treasure."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `gift-and-fracture`
  - Now: "and it is the work of every generation since — ours included, this platform included — to keep the first without practicing the second."
  - Replace with: "and it is the work of every generation since, ours included, to keep the first without practicing the second."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `geneva-and-rome`
  - Now: "But state Trent as a faithful Catholic would sign it: the council abolished"
  - Replace with: "But the council also abolished"
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `gift-and-fracture`
  - Now: "The gift, first, said with joy and no both-sides mush: the Reformation recovered the gospel's center. That the sinner is justified freely, by grace, through faith in Christ — not by the treadmill Luther nearly died on — is not one party's opinion to be balanced against another."
  - Replace with: "The gift comes first. The Reformation recovered the gospel's center. That the sinner is justified freely, by grace, through faith in Christ, and not by the treadmill Luther nearly died on, is not one party's opinion to be balanced against another."
- **must** · Em-dash or en-dash outside a quotation · subtitle `subtitle`
  - Now: "broke the Western church in two — then into pieces."
  - Replace with: "broke the Western church in two, then into pieces."
- **must** · Em-dash or en-dash outside a quotation · section.body `a-conscience-on-fire`
  - Now: "means something like assault — the despair of a conscience"
  - Replace with: "means something like assault, the despair of a conscience"
- **must** · Em-dash or en-dash outside a quotation · section.body `a-conscience-on-fire`
  - Now: "it is the gift by which God saves — a right standing given, not achieved,"
  - Replace with: "it is the gift by which God saves, a right standing given, not achieved,"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-bill-arrives`
  - Now: "against the Catholic emperor — piety long since subcontracted to power."
  - Replace with: "against the Catholic emperor, piety long since handed over to power."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-bill-arrives`
  - Now: "but because everyone was ruined — a peace that fixed"
  - Replace with: "but because everyone was ruined, with a peace that fixed"
- **must** · Em-dash or en-dash outside a quotation · section.body `gift-and-fracture`
  - Now: "Honesty, first — Protestants who can say Trent reformed what Luther protested, Catholics who can say the protest was provoked; both already agree"
  - Replace with: "First, the truth: Protestants who can say Trent reformed what Luther protested, and Catholics who can say the protest was provoked. Both already agree"
- **must** · Em-dash or en-dash outside a quotation · section.body `gift-and-fracture`
  - Now: "Sorting which is which — what the creeds bind, what churches may dispute, what love must simply bear — is the skill this era failed, at scale, with muskets."
  - Replace with: "Sorting which is which is the skill this era failed, at scale, with muskets."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Ulrich Zwingli`
  - Now: "on fourteen articles of fifteen — and the fifteenth divided Protestantism at the table."
  - Replace with: "on fourteen articles of fifteen, and the fifteenth divided Protestantism at the table."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Michael Sattler`
  - Now: "executed within months — the believers'-church conviction paid for in blood by every side's hand."
  - Replace with: "executed within months. Every side had a hand in killing the people who held the believers' church conviction."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `John Calvin`
  - Now: "the Institutes (1536–1559) gave Protestantism its most ordered theology, his city a refuge and a discipline — and the Servetus burning (1553) a permanent lesson in the era's blindness."
  - Replace with: "the Institutes (1536 to 1559) gave Protestantism its most ordered theology and his city became a refuge. The Servetus burning (1553) remains a lesson in the era's blindness."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Teresa of Ávila`
  - Now: "Carmelite reformer (1515–1582) of Catholic Spain's own renewal — proof that"
  - Replace with: "Carmelite reformer (1515 to 1582) of Catholic Spain's own renewal, proof that"
- **must** · Em-dash or en-dash outside a quotation · section.body `a-conscience-on-fire`
  - Now: "provincial university in Wittenberg — a man who had entered the cloister"
  - Replace with: "provincial university in Wittenberg, a man who had entered the cloister"
- **must** · Em-dash or en-dash outside a quotation · section.body `a-conscience-on-fire`
  - Now: "Saxony with a huckster's confidence — the Dominican Johann Tetzel, whose"
  - Replace with: "Saxony with a huckster's confidence by the Dominican Johann Tetzel, whose"
- **must** · Em-dash or en-dash outside a quotation · section.body `worms-and-the-word`
  - Now: "answered escalation with escalation — examinations, a debate at Leipzig where Luther was maneuvered into admitting he stood partly with the condemned Hus, a papal bull threatening excommunication,"
  - Replace with: "answered escalation with escalation: examinations, a debate at Leipzig where Luther was maneuvered into admitting he stood partly with the condemned Hus, and a papal bull threatening excommunication,"
- **must** · Em-dash or en-dash outside a quotation · section.body `worms-and-the-word`
  - Now: "Testament into German in eleven weeks — published in 1522, the Scriptures"
  - Replace with: "Testament into German in eleven weeks. It was published in 1522, the Scriptures"
- **must** · Em-dash or en-dash outside a quotation · section.body `worms-and-the-word`
  - Now: "for Christ's sake, not his own — the doctrine on which, Luther"
  - Replace with: "for Christ's sake, not his own, the doctrine on which, Luther"
- **must** · Em-dash or en-dash outside a quotation · section.body `worms-and-the-word`
  - Now: "authority over councils and popes — all of which, history had just"
  - Replace with: "authority over councils and popes, all of which, history had just"
- **must** · Em-dash or en-dash outside a quotation · section.body `worms-and-the-word`
  - Now: "direct access to God, every calling — magistrate, mother, farmer — a holy vocation, the monastery"
  - Replace with: "direct access to God, every calling (magistrate, mother, farmer) a holy vocation, the monastery"
- **must** · Em-dash or en-dash outside a quotation · section.body `worms-and-the-word`
  - Now: "patristic citation, recoveries — the church's own gospel, dug out"
  - Replace with: "patristic citation, recoveries, the church's own gospel, dug out"
- **must** · Em-dash or en-dash outside a quotation · section.body `marburg-and-the-radicals`
  - Now: "had led a parallel reformation — more austere than Luther's, images"
  - Replace with: "had led a parallel reformation, more austere than Luther's, images"
- **must** · Em-dash or en-dash outside a quotation · section.body `marburg-and-the-radicals`
  - Now: "On point after point — by the colloquy's own accounting, fourteen of fifteen articles — Luther and Zwingli agreed."
  - Replace with: "On point after point, fourteen of fifteen articles by the colloquy's own accounting, Luther and Zwingli agreed."
- **must** · Em-dash or en-dash outside a quotation · section.body `marburg-and-the-radicals`
  - Now: "Zwingli heard signifies — a memorial of a sacrifice made"
  - Replace with: "Zwingli heard signifies, a memorial of a sacrifice made"
- **must** · Em-dash or en-dash outside a quotation · section.body `marburg-and-the-radicals`
  - Now: "still Christendom's old bargain — and that baptism, in the New Testament,"
  - Replace with: "still Christendom's old bargain, and that baptism, in the New Testament,"
- **must** · Em-dash or en-dash outside a quotation · section.body `marburg-and-the-radicals`
  - Now: "movement the enemies called Anabaptist — rebaptizers — was born."
  - Replace with: "movement the enemies called Anabaptist, rebaptizers, was born."
- **must** · Em-dash or en-dash outside a quotation · section.body `marburg-and-the-radicals`
  - Now: "Christendom — Catholic and Protestant alike — read it as sedition."
  - Replace with: "Christendom, Catholic and Protestant alike, read it as sedition."
- **must** · Em-dash or en-dash outside a quotation · section.body `geneva-and-rome`
  - Now: "Religion in 1536 at twenty-six — a book he would revise all his life until its final form in 1559, still the most orderly account of Protestant faith ever written — and was strong-armed that same"
  - Replace with: "Religion in 1536 at twenty-six (a book he would revise all his life until its final form in 1559, still the most orderly account of Protestant faith ever written) and was strong-armed that same"
- **must** · Em-dash or en-dash outside a quotation · section.body `geneva-and-rome`
  - Now: "its anathemas, and they are real — its decree on justification (1547)"
  - Replace with: "its anathemas, and they are real. Its decree on justification (1547)"
- **must** · Em-dash or en-dash outside a quotation · section.body `geneva-and-rome`
  - Now: "century of genuine spiritual renewal — new orders, missions across three"
  - Replace with: "century of genuine spiritual renewal: new orders, missions across three"
- **must** · Em-dash or en-dash outside a quotation · section.body `geneva-and-rome`
  - Now: "versions of western Christianity — which meant the argument would"
  - Replace with: "versions of western Christianity, which meant the argument would"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-bill-arrives`
  - Now: "tagged cuius regio, eius religio — whose the realm, his the religion."
  - Replace with: "tagged cuius regio, eius religio (whose the realm, his the religion)."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-bill-arrives`
  - Now: "reconciliation dissolved into massacre — the Huguenot leadership murdered"
  - Replace with: "reconciliation dissolved into massacre: the Huguenot leadership murdered"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-bill-arrives`
  - Now: "conclusion Christendom had earned — that if this is what confessional"
  - Replace with: "conclusion Christendom had earned, that if this is what confessional"
- **must** · Em-dash or en-dash outside a quotation · section.body `gift-and-fracture`
  - Now: "the marketplace of denominations — the world we American Christians assume as natural as weather — stood where one church had been."
  - Replace with: "the marketplace of denominations, the world we American Christians assume as natural as weather, stood where one church had been."
- **must** · Em-dash or en-dash outside a quotation · section.body `worms-and-the-word`
  - Now: "The most famous sentence — here I stand, I can do no other —"
  - Replace with: "The most famous sentence (here I stand, I can do no other)"
- **must** · Em-dash or en-dash outside a quotation · section.body `geneva-and-rome`
  - Now: "order he built — pastors, teachers, elders, deacons —"
  - Replace with: "order he built (pastors, teachers, elders, deacons)"
- **must** · Em-dash or en-dash outside a quotation · section.body `gift-and-fracture`
  - Now: "The next two eras — an Enlightenment that took the wars as its founding argument, and an America that turned the denominational fracture into a free market —"
  - Replace with: "The next two eras (an Enlightenment that took the wars as its founding argument, and an America that turned the denominational fracture into a free market)"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `geneva-and-rome`
  - Now: "shaped churches on four continents, including the one the writer serves."
  - Replace with: "shaped churches on four continents."
- **should** · Imperative stage direction to the reader · section.body `gift-and-fracture`
  - Now: "Hold the era with both hands, because letting go of either falsifies it."
  - Replace with: "The era has to be told as both a gift and a fracture."
- **should** · Imperative stage direction to the reader · section.body `the-bill-arrives`
  - Now: "Read it slowly, because it is Christendom's logic in its final form: faith assigned by government, conscience solved by moving van."
  - Replace with: "It is Christendom's logic in its final form, with faith assigned by government and conscience solved by moving away."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `worms-and-the-word`
  - Now: "appears in the earliest printed accounts rather than the transcript, and honesty says so; the church"
  - Replace with: "appears in the earliest printed accounts rather than the transcript; the church"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `gift-and-fracture`
  - Now: "Now the fracture, said with equal honesty. Sola scriptura"
  - Replace with: "Then the fracture. Sola scriptura"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `geneva-and-rome`
  - Now: "Fairness first, against the caricature: Calvin was not a theocrat"
  - Replace with: "Calvin was not a theocrat"
- **should** · Announced turn or signpost · section.body `geneva-and-rome`
  - Now: "Say it without flinching and without the anachronism that everyone did it, as though that closes the matter: the era's best men"
  - Replace with: "Everyone did it, and that doesn't close the matter. The era's best men"
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `a-conscience-on-fire`
  - Now: "Not a transaction. A life. He mailed"
  - Replace with: "Repentance was a life, not a transaction. He mailed"
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `a-conscience-on-fire`
  - Now: "The repair bid had become a referendum."
  - Replace with: "What he meant as a proposal for debate had become a public referendum."
- **consider** · Stock line or motif reused across essays · section.body `the-bill-arrives`
  - Now: "It spent Europe's trust in Christ's name, one massacre at a time, and the receipts landed on the Enlightenment's desk."
  - Replace with: "It spent Europe's trust in Christ's name, one massacre at a time, and the Enlightenment took note."
- **consider** · Stock line or motif reused across essays · section.body `gift-and-fracture`
  - Now: "are not departures from this story. They are its invoice, still being paid."
  - Replace with: "are not departures from this story. They follow from it."
- **consider** · Literary heading or kicker where a plain one belongs · section.title `the-bill-arrives`
  - Now: "The Bill Arrives"
  - Replace with: "The Wars of Religion"
- **consider** · Literary heading or kicker where a plain one belongs · section.title `a-conscience-on-fire`
  - Now: "A Conscience on Fire"
  - Replace with: "Luther's Conscience"
- **consider** · Literary heading or kicker where a plain one belongs · section.kicker `gift-and-fracture`
  - Now: "The Ledger"
  - Replace with: "Looking Back"

### the-age-of-martyrs.json (8)

- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-aftermath`
  - Now: "Their case was serious, and it deserves stating honestly. The martyrs had died"
  - Replace with: "Their case was serious. The martyrs had died"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-question-it-leaves`
  - Now: "including ages recent enough to implicate the people writing and reading this essay."
  - Replace with: "including ages recent enough to include us."
- **should** · Imperative stage direction to the reader · section.body `what-rome-wanted`
  - Now: "Start by clearing away the movie version. Rome did not hunt"
  - Replace with: "The movie version is wrong. Rome did not hunt"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-question-it-leaves`
  - Now: "leaves two weights, and honesty requires carrying both."
  - Replace with: "leaves two weights."
- **should** · Announced turn or signpost · section.body `the-aftermath`
  - Now: "Here is the part of the story the stained glass leaves out. Most Christians were not heroes."
  - Replace with: "Most Christians were not heroes."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-question-it-leaves`
  - Now: "A slave girl. A nursing mother. An old bishop. A philosopher with a stubborn streak."
  - Replace with: "They were a slave girl, a nursing mother, an old bishop, and a philosopher with a stubborn streak."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-question-it-leaves`
  - Now: "The lapsed were us. The martyrs, by grace, might have been. The era does not ask for our admiration. It asks whom we worship, and it waits for the answer."
  - Replace with: "Most of us would have been among the lapsed, and by grace some of us might have stood with the martyrs. The era asks for more than admiration. It asks whom we worship."
- **consider** · Stock line or motif reused across essays · section.body `what-rome-wanted`
  - Now: "The empire was broad-minded about gods, collecting them the way it collected provinces."
  - Replace with: "The empire was broad-minded about gods and had room for most of them."

### the-american-experiment.json (36)

- **must** · Biography beyond the confirmed facts, or a denominational claim · section.body `when-we-chose-slavery`
  - Now: "That body is the Southern Baptist Convention. My convention, the largest Protestant denomination in America, was organized so that a man could hold human beings in bondage and carry the gospel at the same time, and the founders saw no contradiction, and they were our founders."
  - Replace with: "That body is the Southern Baptist Convention. The largest Protestant denomination in America was organized so that a man could hold human beings in bondage and carry the gospel at the same time, and the founders saw no contradiction."
- **must** · Biography beyond the confirmed facts, or a denominational claim · section.body `when-we-chose-slavery`
  - Now: "Now the section I would rather not write, which is why it must sit at the center of this essay. I am a Baptist pastor. What follows is not the story of what some churches did somewhere. It is the story of what my church did, and when I write we, I mean it without a millimeter of distance."
  - Replace with: "This is the section I would rather not write. I pastor a Baptist church, and what follows is a Baptist story as much as anyone's. When I write we, I mean it."
- **must** · Biography beyond the confirmed facts, or a denominational claim · section.body `when-we-chose-slavery`
  - Now: "It took my people a hundred and fifty years to say plainly what Douglass said in 1845."
  - Replace with: "It took Southern Baptists a hundred and fifty years to say plainly what Douglass said in 1845."
- **must** · Biography beyond the confirmed facts, or a denominational claim · section.body `when-we-chose-slavery`
  - Now: "and that we repent and ask forgiveness. I am glad we said it. I refuse to be proud that it took us until 1995."
  - Replace with: "and that the convention repented and asked forgiveness. I'm glad it was said. Nobody should be proud that it took until 1995."
- **must** · Biography beyond the confirmed facts, or a denominational claim · section.body `the-machinery-of-revival`
  - Now: "I am not describing other people. I am a revivalist Baptist by blood; I was raised counting decisions, and I have stood at the front and counted them myself, and I know the particular temptation to preach for the response the count requires."
  - Replace with: "I am not describing other people. I pastor in this tradition, and I know the temptation to preach for the response the count requires."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `every-man-his-own-theologian`
  - Now: "And the market itself must be named plainly, because this is the rehearsal for everything this platform means when it says consumer religion."
  - Replace with: "Then there is the market, and this is where consumer religion was first rehearsed."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-almighty-has-his-own-purposes`
  - Now: "When this platform says the political lens is old, this is what it means. We did not acquire"
  - Replace with: "The political lens is old. We did not acquire"
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-man-nobody-knows`
  - Now: "The new century opened with the Protestant house dividing over a real question, and both parties deserve their strongest voice before either is judged."
  - Replace with: "The new century opened with the Protestant house dividing over a real question."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-man-nobody-knows`
  - Now: "Consumer, individualist, entertainment, political: every lens this platform spends itself diagnosing was ground and fitted here, mostly by people who loved God and meant well, which is the most frightening sentence in this essay."
  - Replace with: "The consumer lens, the individualist lens, the entertainment lens and the political lens were all ground and fitted here, mostly by people who loved God and meant well. That should frighten us more than it does."
- **should** · Biography beyond the confirmed facts, or a denominational claim · section.body `the-faith-they-kept`
  - Now: "The church my tradition betrayed for cotton was kept"
  - Replace with: "The church white Protestants betrayed for cotton was kept"
- **should** · Biography beyond the confirmed facts, or a denominational claim · section.body `the-faith-they-kept`
  - Now: "the white church's hymnals of the same years, and I have shelves of them, almost never reach"
  - Replace with: "the white church's hymnals of the same years almost never reach"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `every-man-his-own-theologian`
  - Now: "I write from deep inside this inheritance, not above it. The Baptist church I pastor is congregational"
  - Replace with: "The Baptist church I pastor is congregational"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-man-nobody-knows`
  - Now: "and its case at full strength is simply this: the prophets and Jesus"
  - Replace with: "and its case is this: the prophets and Jesus"
- **should** · Imperative stage direction to the reader · section.body `the-man-nobody-knows`
  - Now: "Close the ledger now, and read it as ours, because it is. We learned"
  - Replace with: "All of this is ours. We learned"
- **should** · Imperative stage direction to the reader · section.body `when-we-chose-slavery`
  - Now: " Hold that thought for Lincoln."
  - Replace with: "(delete)"
- **should** · Imperative stage direction to the reader · section.body `the-machinery-of-revival`
  - Now: "Be fair to the man before weighing the machine, because Finney was no cynic."
  - Replace with: "Finney was no cynic."
- **should** · Imperative stage direction to the reader · section.body `every-man-his-own-theologian`
  - Now: "Say what deserves honor first. The democratizers"
  - Replace with: "The democratizers"
- **should** · Imperative stage direction to the reader · section.body `the-man-nobody-knows`
  - Now: "Hear the social gospel first, from its best man. Walter Rauschenbusch"
  - Replace with: "Walter Rauschenbusch"
- **should** · Imperative stage direction to the reader · section.body `the-man-nobody-knows`
  - Now: "Now the grief, for it is grief and not scorn. In Rauschenbusch's heirs"
  - Replace with: "In Rauschenbusch's heirs"
- **should** · Imperative stage direction to the reader · section.body `the-meeting-at-cane-ridge`
  - Now: "Hold both images, the wild ridge and the disciplined rider: for a while America had"
  - Replace with: "For a while America had"
- **should** · Imperative stage direction to the reader · section.body `the-faith-they-kept`
  - Now: "Mark the sequence: they did not leave over doctrine"
  - Replace with: "They did not leave over doctrine"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-man-nobody-knows`
  - Now: "The ablest mind on that side, J. Gresham Machen of Princeton, must be named fairly because almost no one at the time did. His Christianity and Liberalism"
  - Replace with: "The ablest mind on that side was J. Gresham Machen of Princeton. His Christianity and Liberalism"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-faith-they-kept`
  - Now: "Every honest history of American Christianity turns on this fact."
  - Replace with: "The history of American Christianity turns on this fact."
- **should** · Announced turn or signpost · section.body `the-almighty-has-his-own-purposes`
  - Now: "It stings a pastor to write the obvious sentence, so I will write it slowly. The deepest American sermon"
  - Replace with: "The deepest American sermon"
- **should** · Announced turn or signpost · section.body `the-meeting-at-cane-ridge`
  - Now: "The difference from Northampton should be stated exactly, because everything in this essay grows from it."
  - Replace with: "The difference from Northampton matters."
- **should** · Announced turn or signpost · section.body `the-meeting-at-cane-ridge`
  - Now: " The rest of this essay is the answer."
  - Replace with: "(delete)"
- **should** · Announced turn or signpost · section.body `every-man-his-own-theologian`
  - Now: " The next figure in the story shows what it became."
  - Replace with: "(delete)"
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-almighty-has-his-own-purposes`
  - Now: "which proved an equally durable theology and a more profitable one. Two errors, one instrument."
  - Replace with: "which proved an equally durable theology and a more profitable one."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-man-nobody-knows`
  - Now: "It is still open. That is not a comfort. It is a summons."
  - Replace with: "It is still open, which is less a comfort than a summons."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `souls-by-the-numbers`
  - Now: "Souls in winter, dry goods in spring, one address. I do not know a cleaner image for this whole century, and none of the participants saw anything to blush at, which is the point."
  - Replace with: "It was souls in winter and dry goods in spring at one address, and none of the participants saw anything to blush at."
- **consider** · Biography beyond the confirmed facts, or a denominational claim · section.body `the-faith-they-kept`
  - Now: "and did something that still stops me every time I trace it: he took"
  - Replace with: "and then he took"
- **consider** · Biography beyond the confirmed facts, or a denominational claim · section.body `souls-by-the-numbers`
  - Now: "and my own tradition walked every step of it applauding"
  - Replace with: "and the revivalist churches walked every step of it applauding"
- **consider** · Rulebook leakage: the prose names its own method or the platform · section.body `the-almighty-has-his-own-purposes`
  - Now: "The war, when it came, was the most religious war in American history, and that is an indictment of everyone concerned."
  - Replace with: "The war, when it came, was the most religious war in American history, and that is to nobody's credit."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `souls-by-the-numbers`
  - Now: "Entertainment did not sneak into American church life. We booked it, built the hall for it, and counted the house."
  - Replace with: "Entertainment did not sneak into American church life. We booked it and built the hall for it."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-man-nobody-knows`
  - Now: "One party kept the culture and lost the confession. The other kept the confession and left the culture."
  - Replace with: "One party kept the culture and lost the confession, and the other did the reverse."
- **consider** · Literary heading or kicker where a plain one belongs · section.title `souls-by-the-numbers`
  - Now: "Souls by the Numbers"
  - Replace with: "Moody and the Business of Revival"

### the-apostolic-age.json (6)

- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `a-movement-without-a-center`
  - Now: "We should be honest about how unlikely this was."
  - Replace with: "None of this was likely."
- **should** · Announced turn or signpost · section.body `one-body-across-distance`
  - Now: "It is worth pausing on how remarkable their unity was."
  - Replace with: "Their unity was remarkable."
- **should** · Flat, contraction-free textbook voice · section.body `the-apostolic-fathers`
  - Now: "What happens when the eyewitnesses are gone."
  - Replace with: "What happens when the eyewitnesses are gone?"
- **should** · Flat, contraction-free textbook voice · section.body `one-body-across-distance`
  - Now: "We should not pretend the unity was perfect."
  - Replace with: "The unity wasn't perfect."
- **should** · Flat, contraction-free textbook voice · section.body `what-held-them`
  - Now: "We are the ones who came in late. We should learn from how they waited."
  - Replace with: "We came in late, and we could learn from how they waited."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `what-held-them`
  - Now: "They had less paper. They did not have less faith."
  - Replace with: "They had less paper, and they did not have less faith."

### the-attractional-era.json (32)

- **must** · Biography beyond the confirmed facts, or a denominational claim · section.body `the-audit`
  - Now: "I learned to read an attendance spreadsheet before I learned to sit with a dying man. I have called an auditorium a sanctuary and an audience a congregation. I have preached, on more Sundays than I care to count, to backs the stage had taught to watch, and I have felt the small lift when the numbers came in high and told myself the lift was joy over the lost."
  - Replace with: "Many of us learned to read an attendance spreadsheet before we learned to sit with a dying man. We called an auditorium a sanctuary and an audience a congregation, and when the numbers came in high we told ourselves the lift we felt was joy over the lost."
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-missionary-who-counted`
  - Now: "State his case at full strength, because it had one. In India,"
  - Replace with: "He had a case. In India,"
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-missionary-who-counted`
  - Now: "And here the honest verdict must be said. In India the homogeneous unit"
  - Replace with: "In India the homogeneous unit"
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-audit`
  - Now: "So let the era have its honest verdict, both halves of it. The attractional model attracted."
  - Replace with: "The attractional model attracted."
- **should** · Biography beyond the confirmed facts, or a denominational claim · section.body `mission-leaves-home`
  - Now: "I was formed by the unbundled world, trained on its materials, and I remain grateful for it, which is exactly why I am implicated in what it cost."
  - Replace with: "Many of us were formed by that unbundled world and trained on its materials, and we should be grateful for it. We also share in what it cost."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-audit`
  - Now: "And now the part I cannot write from a safe distance, because there is no safe distance. Every working pastor"
  - Replace with: "Every working pastor"
- **should** · Imperative stage direction to the reader · section.body `a-tent-at-washington-and-hill`
  - Now: "Read that last item again. In 1948,"
  - Replace with: "In 1948,"
- **should** · Imperative stage direction to the reader · section.body `stage-and-screen`
  - Now: "Sit with that sequence. A congregation became famous"
  - Replace with: "A congregation became famous"
- **should** · Imperative stage direction to the reader · section.body `the-audit`
  - Now: "Let the weight of that land. The most studied church"
  - Replace with: "The most studied church"
- **should** · Imperative stage direction to the reader · section.body `the-drive-in-church`
  - Now: "Mark that carefully. The therapeutic gospel"
  - Replace with: "The therapeutic gospel"
- **should** · Imperative stage direction to the reader · section.body `stage-and-screen`
  - Now: "Note what that means. From 1988 forward"
  - Replace with: "From 1988 forward"
- **should** · Imperative stage direction to the reader · section.body `mission-leaves-home`
  - Now: "Read the slogan slowly, because the whole era is folded inside it. The Rock was fixed."
  - Replace with: "The whole era is in that slogan. The Rock was fixed."
- **should** · Imperative stage direction to the reader · section.body `the-drive-in-church`
  - Now: "Be fair to the man: he reached people no church was reaching"
  - Replace with: "He reached people no church was reaching"
- **should** · Imperative stage direction to the reader · section.body `the-corner-office`
  - Now: "Be fair here as well. A congregation"
  - Replace with: "A congregation"
- **should** · Imperative stage direction to the reader · section.body `the-corner-office`
  - Now: "Say it plainly: the era's best minds knew"
  - Replace with: "The era's best minds knew"
- **should** · Imperative stage direction to the reader · section.body `the-drive-in-church`
  - Now: "Take the measure of what he preached, because the era learned that from him too. Schuller was a disciple"
  - Replace with: "The era learned his preaching from him too. Schuller was a disciple"
- **should** · Imperative stage direction to the reader · section.body `a-tent-at-washington-and-hill`
  - Now: "We should say plainly what kind of men these were, because the era's critics forget it and the era's children need it. A year before"
  - Replace with: "The era's critics forget what kind of men these were. A year before"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · subtitle `subtitle`
  - Now: "and the honest audit that ended the era's confidence."
  - Replace with: "and the audit that ended the era's confidence."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-missionary-who-counted`
  - Now: "The theory arrived from the mission field, and the theory deserves a fairer telling than it usually gets."
  - Replace with: "The theory arrived from the mission field."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-corner-office`
  - Now: "The Purpose Driven Church deserves its due, because Warren saw the crowd problem clearly and said so in print."
  - Replace with: "In The Purpose Driven Church Warren saw the crowd problem clearly and said so in print."
- **should** · Announced turn or signpost · section.body `unchurched-harry`
  - Now: "Here is what the critics of the seeker movement, and I have been one, are obligated to say first. Willow Creek was built by evangelistic sincerity."
  - Replace with: "Willow Creek was built by evangelistic sincerity, and critics of the seeker movement, of whom I have been one, should say so first."
- **should** · Announced turn or signpost · section.body `the-corner-office`
  - Now: "That is what makes the final audit so sobering, and we are almost there."
  - Replace with: "That is what makes the final audit so sobering."
- **should** · Announced turn or signpost · section.body `unchurched-harry`
  - Now: "The answer, when it finally came, would come from Willow itself, and it is waiting at the end of this essay."
  - Replace with: "The answer, when it finally came, would come from Willow itself."
- **should** · Announced turn or signpost · section.body `a-tent-at-washington-and-hill`
  - Now: "That question waited sixty years for an answer. This essay is the story of the answer arriving."
  - Replace with: "That question waited sixty years for an answer."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-corner-office`
  - Now: "The rooms were filling, and nothing recruits like results. We brought a short spoon."
  - Replace with: "The rooms were filling, and nothing recruits like results."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `stage-and-screen`
  - Now: "The megachurch laughed at the televangelist and shared his anthropology. We mocked the far end of our own machine."
  - Replace with: "The megachurch laughed at the televangelist and shared his anthropology."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-audit`
  - Now: "It is answered in the seats, one ordinary Tuesday at a time. The seats were starting to empty."
  - Replace with: "It is answered in the seats, and the seats were starting to empty."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-audit`
  - Now: "That is the terrible part. The sincerity was real, the conversions were real, and the machine we served with our sincerity was forming consumers underneath our preaching. Including the preacher."
  - Replace with: "The sincerity was real, the conversions were real, and the machine we served with our sincerity was forming consumers underneath our preaching, the preacher included."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-drive-in-church`
  - Now: "Every pastor of my generation should stand in that nave once and do the arithmetic. The old warning holds: what you win them with is what you win them to, and what you win them to you must keep supplying, forever, or lose them to the next supplier."
  - Replace with: "The old warning holds. What you win them with is what you win them to, and you must keep supplying it or lose them to the next supplier."
- **consider** · Rulebook leakage: the prose names its own method or the platform · section.body `the-audit`
  - Now: "The era's own instruments returned the verdict, activity without maturity,"
  - Replace with: "The era's own instruments reported activity without maturity,"
- **consider** · Stock line or motif reused across essays · section.body `the-audit`
  - Now: "A half century of preaching that led with a wonderful plan for your life had formed precisely the faith they described, not the faith the churches claimed to teach, and children are the most honest auditors an institution ever gets."
  - Replace with: "A half century of preaching that led with a wonderful plan for your life had formed precisely the faith they described, not the faith the churches claimed to teach."
- **consider** · Forbidden-language word · section.body `mission-leaves-home`
  - Now: "discipleship to the Navigators, the intellect"
  - Replace with: "discipleship to Trotman's organization, the intellect"

### the-awakenings.json (5)

- **should** · 'Honest' or 'fair' as a self-certifying adjective · subtitle `subtitle`
  - Now: "with the ledger of the revivalists and slavery kept open and honest."
  - Replace with: "and what the revivalists did about slavery."
- **should** · Announced turn or signpost · section.body `the-wound`
  - Now: "Now the ledger the movement's admirers long refused to open. The awakeners preached"
  - Replace with: "The awakeners preached"
- **should** · Announced turn or signpost · section.body `after-the-wars`
  - Now: "And it tells, without flinching, the sin the movement carried from its birth."
  - Replace with: "And it tells the sin the movement carried from its birth."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `what-was-born`
  - Now: "Revival is power, and power always arrives without instructions."
  - Replace with: "Revival is power, and nobody handed the movement instructions for it."
- **consider** · Literary heading or kicker where a plain one belongs · section.kicker `the-wound`
  - Now: "The Ledger"
  - Replace with: "Slavery"

### the-church-that-outlived-rome.json (6)

- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-fall`
  - Now: "Here is the fact this essay exists to weigh. The church did not go down with the ship."
  - Replace with: "The church did not go down with the ship."
- **should** · Imperative stage direction to the reader · section.body `the-kings`
  - Now: "Be honest about what such baptisms were. When a king"
  - Replace with: "When a king"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `gregory-and-the-monks`
  - Now: "the old gods lingering inside the new calendar, and honesty keeps both readings."
  - Replace with: "the old gods lingering inside the new calendar, and both are there."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-reckoning`
  - Now: "An honest ledger reads like this. The faith outlived"
  - Replace with: "The faith outlived"
- **should** · Announced turn or signpost · section.body `the-reckoning`
  - Now: "Now the hard accounting, because this era carries the church's shame as well as its glory, and sometimes in the same event."
  - Replace with: "This era carries the church's shame as well as its glory, and sometimes in the same event."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-reckoning`
  - Now: "That is the lesson of five hundred years. We are slow students."
  - Replace with: "It took five hundred years to show that, and we are slow students."

### the-constantinian-turn.json (5)

- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-bridge`
  - Now: "is less plain, and the honest telling says so."
  - Replace with: "is less plain."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-bridge`
  - Now: "we owe them this much honesty. To the survivors"
  - Replace with: "we owe them this much. To the survivors"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-trade`
  - Now: "and the argument is honest, because the evidence points both directions"
  - Replace with: "and the argument is real, because the evidence points both directions"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-gains`
  - Now: "The gains were not imaginary, and the ledger should be read fairly."
  - Replace with: "The gains were not imaginary."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-trade`
  - Now: "and the hand holding it was ours. Not Rome's anymore. Ours."
  - Replace with: "and the hand holding it was ours."

### the-counter-reformation.json (10)

- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `two-tellings`
  - Now: "If only one of those feelings arrives, the story has not been told fairly, and telling it fairly is the whole point."
  - Replace with: "If only one of those feelings arrives, half the story is missing."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `trent`
  - Now: "Honesty requires a Protestant to say so plainly. Rome did reform"
  - Replace with: "A Protestant should say so plainly. Rome did reform"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `new-orders`
  - Now: "and no account is honest that keeps one and drops the other."
  - Replace with: "and an account that keeps one and drops the other is half an account."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `westphalia`
  - Now: "The honest answer has never been denial."
  - Replace with: "The answer has never been denial."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `trent`
  - Now: "Trent answered the Reformation in two registers at once, and fairness requires keeping both in view."
  - Replace with: "Trent answered the Reformation in two registers at once."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · subtitle `subtitle`
  - Now: "Rome's answer to the Protestant break, told fairly."
  - Replace with: "Rome's answer to the Protestant break."
- **should** · Announced turn or signpost · section.body `new-orders`
  - Now: "This was not reaction. It was holiness, and Protestants should be able to say so without flinching."
  - Replace with: "It was holiness, and Protestants should be able to say so."
- **should** · Announced turn or signpost · section.body `westphalia`
  - Now: "And here is the weight the church still carries. The wars were not fought by skeptics."
  - Replace with: "The wars were not fought by skeptics."
- **should** · Announced turn or signpost · section.body `westphalia`
  - Now: "and it is worth noticing what kind of peace it was. Nobody had won."
  - Replace with: "and nobody had won."
- **consider** · Rulebook leakage: the prose names its own method or the platform · section.body `france-and-the-netherlands`
  - Now: "and that agreement is the century's real indictment."
  - Replace with: "and that agreement is the worst thing to be said about the century."

### the-desert-and-the-rule.json (6)

- **should** · Imperative stage direction to the reader · section.body `the-excesses`
  - Now: "Tell the truth about the excesses, because the desert told it about itself."
  - Replace with: "The desert told the truth about its own excesses."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-rule`
  - Now: "and Gregory's account is a saint's life rather than a documentary, and honesty says so."
  - Replace with: "and Gregory's account is a saint's life rather than a documentary."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `what-they-kept`
  - Now: "It is right to honor that and honest to bound it."
  - Replace with: "That deserves honor, within limits."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `the-flight`
  - Now: "Historians add, honestly, that not every motive was pure."
  - Replace with: "Historians add that not every motive was pure."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.title `the-excesses`
  - Now: "The Honest Ledger"
  - Replace with: "Where It Went Wrong"
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-rule`
  - Now: "The pillar saints astonish. The Rule endures. Benedict bet on the long mercy of the daily, and he won."
  - Replace with: "The pillar saints still astonish people, but it is the Rule that lasted."

### the-east-west-schism.json (5)

- **should** · 'Honest' or 'fair' as a self-certifying adjective · subtitle `subtitle`
  - Now: " Told fairly to both sides."
  - Replace with: "(delete)"
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-filioque`
  - Now: "Both sides had a real point. The West had a genuine theological concern. The East had a genuine concern about how the church may and may not speak. Neither was simply wrong."
  - Replace with: "The West had a real theological concern, and the East had a real concern about how the church may and may not speak. Neither was simply wrong."
- **should** · Flat, contraction-free textbook voice · section.body `authority`
  - Now: "When the whole church must decide something, who has the last word."
  - Replace with: "When the whole church must decide something, who has the last word?"
- **should** · Flat, contraction-free textbook voice · section.body `one-church-two-worlds`
  - Now: "We should begin with sympathy for both. The Greek East"
  - Replace with: "The Greek East"
- **should** · Flat, contraction-free textbook voice · section.body `1054-and-after`
  - Now: "We should resist the tidy story that 1054 caused the split. It did not."
  - Replace with: "It is tidy to say that 1054 caused the split. It didn't."

### the-fathers-at-work.json (5)

- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `grace-on-trial`
  - Now: "Pelagius deserves his case stated fairly, because it was serious. God does not command the impossible."
  - Replace with: "Pelagius had a serious case. God does not command the impossible, he argued."
- **should** · Announced turn or signpost · section.body `between-the-councils`
  - Now: "It is worth watching how they worked, because the church in every age assumes"
  - Replace with: "The way they worked matters, because the church in every age assumes"
- **should** · Announced turn or signpost · section.body `the-method`
  - Now: "Notice the shape of their working lives, because it corrects a modern assumption. None of these men"
  - Replace with: "None of these men"
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-inheritance`
  - Now: "They do. That is the inheritance. We have mostly declined it."
  - Replace with: "They do, and we have mostly declined the inheritance."
- **consider** · Rulebook leakage: the prose names its own method or the platform · section.body `the-inheritance`
  - Now: "They also leave us an indictment we should not dodge."
  - Replace with: "They also leave us a charge we shouldn't dodge."

### the-global-church.json (4)

- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `fundamentalists-and-modernists`
  - Now: "Each man deserves to be heard at his strongest, and each accused the other of losing the actual faith."
  - Replace with: "Each accused the other of losing the actual faith."
- **should** · Imperative stage direction to the reader · section.body `barmen`
  - Now: "That sentence should be allowed to hurt."
  - Replace with: "It ought to hurt to read."
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `barmen`
  - Now: "It was a brave document, and we should be honest about its limits."
  - Replace with: "It was a brave document, and it had limits."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `azusa-and-the-south`
  - Now: "The city's newspapers mocked the meetings. The meetings did not care."
  - Replace with: "The city's newspapers mocked the meetings, and the meetings went on."

### the-great-councils.json (6)

- **should** · Flat, contraction-free textbook voice · section.body `why-words-mattered`
  - Now: "Who is Jesus, and what does it mean to call him God."
  - Replace with: "Who is Jesus, and what does it mean to call him God?"
- **should** · Flat, contraction-free textbook voice · section.body `constantinople`
  - Now: "If the Son is fully God, what of the Holy Spirit."
  - Replace with: "If the Son is fully God, what of the Holy Spirit?"
- **should** · Flat, contraction-free textbook voice · section.body `nicaea`
  - Now: "We should not tell this too cleanly. Nicaea did not end the fight."
  - Replace with: "Nicaea didn't end the fight."
- **should** · Flat, contraction-free textbook voice · section.body `ephesus-and-chalcedon`
  - Now: "We should not pretend the councils were pure. They were attended by men"
  - Replace with: "The councils weren't pure. They were attended by men"
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `why-they-steady-us`
  - Now: "We did not earn it. We inherited it. The least we owe"
  - Replace with: "We didn't earn it. The least we owe"
- **consider** · Flat, contraction-free textbook voice · section.body `why-words-mattered`
  - Now: "This matters more than it sounds."
  - Replace with: "It matters more than it sounds."

### the-long-middle.json (55)

- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `the-crusades-honestly`
  - Now: "Steelman the crusaders, because honesty requires it: most believed"
  - Replace with: "Most crusaders believed"
- **must** · Rulebook leakage: the prose names its own method or the platform · section.body `schools-and-the-poor-man`
  - Now: "The steelman, the practice this platform stakes itself on, is a medieval invention."
  - Replace with: "Stating the other side's case at full strength before answering it is a medieval invention."
- **must** · Rulebook leakage: the prose names its own method or the platform · keyFigures.note `Thomas Aquinas`
  - Now: "states every objection at full strength before answering — the steelman as a medieval invention, ending in worship."
  - Replace with: "states every objection at full strength before answering, and whose work ended in worship."
- **must** · Em-dash or en-dash outside a quotation · subtitle `subtitle`
  - Now: "Neither a dark age nor a golden one — the centuries when the church held everything, and nearly lost itself."
  - Replace with: "Neither a dark age nor a golden one. These are the centuries when the church held everything and nearly lost itself."
- **must** · Em-dash or en-dash outside a quotation · section.body `gregory-and-the-wreckage`
  - Now: "was the church — and that year it drafted a monk named Gregory"
  - Replace with: "was the church, and that year it drafted a monk named Gregory"
- **must** · Em-dash or en-dash outside a quotation · section.body `gregory-and-the-wreckage`
  - Now: "the church inherited the state's work — and then, slowly, the state's shape."
  - Replace with: "the church inherited the state's work, and then, slowly, the state's shape."
- **must** · Em-dash or en-dash outside a quotation · section.body `gregory-and-the-wreckage`
  - Now: "Refuse both easy stories — the Dark Ages sneer and the golden-age nostalgia — and the Long Middle becomes what it actually is: the longest experiment ever run on the question our own moment keeps asking."
  - Replace with: "Set aside both easy stories, the Dark Ages sneer and the golden-age nostalgia, and the Long Middle turns out to be the longest experiment ever run on a question our own moment keeps asking."
- **must** · Em-dash or en-dash outside a quotation · section.body `monks-carry-the-faith`
  - Now: "during the Long Middle — the actual making of Christians, the thing the modern church keeps trying to reinvent — it lived"
  - Replace with: "during the Long Middle, the actual making of Christians, the thing the modern church keeps trying to reinvent, it lived"
- **must** · Em-dash or en-dash outside a quotation · section.body `schools-and-the-poor-man`
  - Now: "Not doubt seeking excuses; not certainty refusing questions — faith, secure enough to think as hard as it can."
  - Replace with: "It is not doubt looking for excuses or certainty refusing questions. It is faith secure enough to think as hard as it can."
- **must** · Em-dash or en-dash outside a quotation · section.body `schools-and-the-poor-man`
  - Now: "keeps returning to — that all shall be well, and all manner of thing shall be well — not optimism, but trust, held inside the worst century the medieval West endured."
  - Replace with: "keeps returning to, that all shall be well, and all manner of thing shall be well. That is trust, not optimism, held inside the worst century the medieval West endured."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-crusades-honestly`
  - Now: "The church did this. Not they — we, the baptized, in council and pulpit and army after army."
  - Replace with: "The church did this, and the church is us, the baptized, in council and pulpit and army after army."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-crusades-honestly`
  - Now: "This was not the modern caricature of cynical land-grab dressed in piety; it was worse, in a way — it was sincerity, armed."
  - Replace with: "This was not the modern caricature of a cynical land-grab dressed in piety. In a way it was worse, because the sincerity was real and it was armed."
- **must** · Em-dash or en-dash outside a quotation · section.body `the-crusades-honestly`
  - Now: "(Matthew 20:25–26)"
  - Replace with: "(Matthew 20:25-26)"
- **must** · Em-dash or en-dash outside a quotation · section.body `crown-and-altar`
  - Now: "the East–West schism"
  - Replace with: "the East-West schism"
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Benedict of Nursia`
  - Now: "the short Rule — the hours, work, stability, lectio — that became the West's formation engine for over a millennium."
  - Replace with: "the short Rule, with its hours, work, stability and lectio, that formed the West's monks for over a millennium."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Charlemagne`
  - Now: "on Christmas Day 800 — the transaction that fused crown and altar and defined Christendom's bargain."
  - Replace with: "on Christmas Day 800, the transaction that fused crown and altar."
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Anselm of Canterbury`
  - Now: "whose fides quaerens intellectum — faith seeking understanding — set the charter"
  - Replace with: "whose fides quaerens intellectum (faith seeking understanding) set the charter"
- **must** · Em-dash or en-dash outside a quotation · keyFigures.note `Jan Hus`
  - Now: "despite an imperial safe-conduct — proof the questions were forbidden, a century before Luther asked them again."
  - Replace with: "despite an imperial safe-conduct, a century before Luther asked his questions again."
- **must** · Em-dash or en-dash outside a quotation · section.body `gregory-and-the-wreckage`
  - Now: "he sent a reluctant missionary — another monk, Augustine, no relation to the bishop of Hippo — to the pagan English, and within"
  - Replace with: "he sent a reluctant missionary (another monk, Augustine, no relation to the bishop of Hippo) to the pagan English, and within"
- **must** · Em-dash or en-dash outside a quotation · section.body `monks-carry-the-faith`
  - Now: "together, read Scripture slowly — the practice the tradition calls"
  - Replace with: "together, read Scripture slowly, the practice the tradition calls"
- **must** · Em-dash or en-dash outside a quotation · section.body `monks-carry-the-faith`
  - Now: "motto attached to the movement — ora et labora, pray and work — compresses the whole vision, though"
  - Replace with: "motto attached to the movement (ora et labora, pray and work) compresses the whole vision, though"
- **must** · Em-dash or en-dash outside a quotation · section.body `monks-carry-the-faith`
  - Now: "pattern in fifth-century Ireland — the ex-captive returning to convert his captors — and Irish monks re-seeded a half-pagan"
  - Replace with: "pattern in fifth-century Ireland, the ex-captive returning to convert his captors, and Irish monks re-seeded a half-pagan"
- **must** · Em-dash or en-dash outside a quotation · section.body `monks-carry-the-faith`
  - Now: "the margins of a consumer week — a service, a podcast, a group"
  - Replace with: "the margins of a consumer week: a service, a podcast, a group"
- **must** · Em-dash or en-dash outside a quotation · section.body `crown-and-altar`
  - Now: "the fights the era is famous for — above all the investiture struggle,"
  - Replace with: "the fights the era is famous for, above all the investiture struggle,"
- **must** · Em-dash or en-dash outside a quotation · section.body `crown-and-altar`
  - Now: "returns the favor and runs the church — and the century of papal humiliation"
  - Replace with: "returns the favor and runs the church, and the century of papal humiliation"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-crusades-honestly`
  - Now: "Urban answered with something new — an armed pilgrimage, with remission"
  - Replace with: "Urban answered with something new, an armed pilgrimage, with remission"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-crusades-honestly`
  - Now: "Jerusalem taken and its inhabitants — Muslim and Jewish, fighter and family — massacred in numbers the crusaders'"
  - Replace with: "Jerusalem taken and its inhabitants (Muslim and Jewish, fighter and family) massacred in numbers the crusaders'"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-crusades-honestly`
  - Now: "looting the altars of Christians — the moment the schism of 1054"
  - Replace with: "looting the altars of Christians, the moment the schism of 1054"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-crusades-honestly`
  - Now: "the lines to the sultan al-Kamil — and was received, heard, and sent"
  - Replace with: "the lines to the sultan al-Kamil and was received, heard, and sent"
- **must** · Em-dash or en-dash outside a quotation · section.body `schools-and-the-poor-man`
  - Now: "new in the world: the university — Bologna, Paris, Oxford, chartered guilds of masters and"
  - Replace with: "new in the world: the university. Bologna, Paris and Oxford were chartered guilds of masters and"
- **must** · Em-dash or en-dash outside a quotation · section.body `schools-and-the-poor-man`
  - Now: "punchline for five hundred years — angels on pinheads — and the caricature is lazy."
  - Replace with: "punchline for five hundred years (angels on pinheads), and the caricature is lazy."
- **must** · Em-dash or en-dash outside a quotation · section.body `schools-and-the-poor-man`
  - Now: "Aquinas, whose Summa Theologiae — objections stated at full strength before every answer, always the strongest case against himself first — remains the most sustained act"
  - Replace with: "Aquinas, whose Summa Theologiae (objections stated at full strength before every answer, always the strongest case against himself first) remains the most sustained act"
- **must** · Em-dash or en-dash outside a quotation · section.body `schools-and-the-poor-man`
  - Now: "permission to live the Gospels literally — poverty, preaching, joy."
  - Replace with: "permission to live the Gospels literally: poverty, preaching, joy."
- **must** · Em-dash or en-dash outside a quotation · section.body `schools-and-the-poor-man`
  - Now: "Francis and the movements like his — Dominic's preachers, the Waldensians a generation earlier (who pushed further, were refused, and were persecuted for wanting Scripture in their own tongue), the women's communities, the mystics — are the era's recurring pattern: renewal almost never came from the"
  - Replace with: "Francis and the movements like his are the era's recurring pattern: Dominic's preachers, the Waldensians a generation earlier (who pushed further, were refused, and were persecuted for wanting Scripture in their own tongue), the women's communities, the mystics. Renewal almost never came from the"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-spring-is-loaded`
  - Now: "grace had acquired a price list — masses for the dead endowed like"
  - Replace with: "grace had acquired a price list: masses for the dead endowed like"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-spring-is-loaded`
  - Now: "century, then the Great Schism — two popes, then three, each excommunicating"
  - Replace with: "century, then the Great Schism, with two popes, then three, each excommunicating"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-spring-is-loaded`
  - Now: "clergy and communion for the people — and was summoned to the Council"
  - Replace with: "clergy and communion for the people, and was summoned to the Council"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-spring-is-loaded`
  - Now: "Second, and just as true: under all that corruption, the deep things never stopped — the hours prayed, the Scriptures"
  - Replace with: "Second, under all that corruption the deep things never stopped: the hours prayed, the Scriptures"
- **must** · Em-dash or en-dash outside a quotation · section.body `the-spring-is-loaded`
  - Now: "formed by that deep tradition — an Augustinian, soaked in the Psalms he chanted daily — will pick the lock."
  - Replace with: "formed by that deep tradition (an Augustinian, soaked in the Psalms he chanted daily) will pick the lock."
- **must** · Em-dash or en-dash outside a quotation · section.body `crown-and-altar`
  - Now: "exchanged excommunications — the moment history files as"
  - Replace with: "exchanged excommunications, the moment history files as"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-spring-is-loaded`
  - Now: "Stand back from the nine hundred years and take the era's twinned verdict, because both halves are addressed to us. First: when the church held the whole culture — the crowns, the courts, the schools, the calendar — it did real good"
  - Replace with: "The nine hundred years say two things to us. First, when the church held the whole culture, the crowns and the courts and the schools and the calendar, it did real good"
- **should** · Rulebook leakage: the prose names its own method or the platform · section.kicker `the-spring-is-loaded`
  - Now: "The Verdict"
  - Replace with: "Before 1517"
- **should** · Imperative stage direction to the reader · section.body `gregory-and-the-wreckage`
  - Now: "But mark what else happened in that opening, because the whole era is folded inside it."
  - Replace with: "Something else happened in that opening, and the rest of the era follows from it."
- **should** · Imperative stage direction to the reader · section.body `monks-carry-the-faith`
  - Now: "Hold the monks up against us for one honest moment. Our discipleship"
  - Replace with: "Our discipleship"
- **should** · Imperative stage direction to the reader · section.body `the-crusades-honestly`
  - Now: "Tell the era's own truth about what happened next, without a modern sneer and without a churchman's flinch. The First Crusade"
  - Replace with: "The First Crusade"
- **should** · Imperative stage direction to the reader · section.body `crown-and-altar`
  - Now: "Say the fair thing first: the medieval church at its best"
  - Replace with: "The medieval church at its best"
- **should** · Imperative stage direction to the reader · section.body `crown-and-altar`
  - Now: "And then say the true thing after it: the fusion cost"
  - Replace with: "But the fusion cost"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.title `the-crusades-honestly`
  - Now: "The Crusades, Honestly"
  - Replace with: "The Crusades"
- **should** · 'Honest' or 'fair' as a self-certifying adjective · section.body `schools-and-the-poor-man`
  - Now: "The same centuries that armed the cross also built the West's mind, and fairness demands the whole ledger."
  - Replace with: "The same centuries that armed the cross also built the West's mind."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `crown-and-altar`
  - Now: "the wound has not fully closed in a thousand years. Division, once blessed, compounds."
  - Replace with: "the wound has not fully closed in a thousand years."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `the-crusades-honestly`
  - Now: "Nothing visible changed. Everything necessary was said. Two ways"
  - Replace with: "Nothing visible changed. Two ways"
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `monks-carry-the-faith`
  - Now: "We treat it as an elective. One of us is wrong, and the monks have fifteen centuries of receipts."
  - Replace with: "We treat it as an elective, and the monks have fifteen centuries of evidence on their side."
- **consider** · Aphoristic closer, fragment stack or symmetrical pair · section.body `monks-carry-the-faith`
  - Now: "The god did not. The tree became a chapel."
  - Replace with: "The god did not, and the tree became a chapel."
- **consider** · Stock line or motif reused across essays · section.body `crown-and-altar`
  - Now: "was the bargain's own receipt coming due."
  - Replace with: "was what the bargain cost."
- **consider** · Literary heading or kicker where a plain one belongs · section.title `the-spring-is-loaded`
  - Now: "The Spring Is Loaded"
  - Replace with: "On the Eve of the Reformation"

### the-medieval-west.json (3)

- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `the-eve`
  - Now: "The verdict is not that the medieval church lacked faith. It is that the church so fully identified its structures with the gospel that it treated its physicians as enemies."
  - Replace with: "The medieval church did not lack faith. It so fully identified its structures with the gospel that it treated its physicians as enemies."
- **should** · Announced turn or signpost · section.body `the-sword`
  - Now: "Now the other ledger, and we will not soften it. In 1095"
  - Replace with: "In 1095"
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `christendom-at-noon`
  - Now: "That is what Christendom meant. Not a religion inside a society. A society inside a religion."
  - Replace with: "Christendom meant a whole society living inside a religion, where we are used to a religion living inside a society."

### the-missionary-century.json (4)

- **should** · Rulebook leakage: the prose names its own method or the platform · section.body `edinburgh-1910`
  - Now: "So the verdict on the missionary century must hold two truths the way the century itself never could."
  - Replace with: "The missionary century has to be remembered with two truths held together, which the century itself never managed."
- **should** · Rulebook leakage: the prose names its own method or the platform · section.title `edinburgh-1910`
  - Now: "Edinburgh 1910 and the Verdict"
  - Replace with: "Edinburgh 1910"
- **should** · Announced turn or signpost · section.body `the-entanglement`
  - Now: "Now the tangle, told straight. The missionary century moved on imperial rails."
  - Replace with: "The missionary century moved on imperial rails."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `edinburgh-1910`
  - Now: "He had done it before, with Roman roads. The pattern is the point."
  - Replace with: "He had done it before, with Roman roads."

### the-reformation.json (4)

- **should** · 'Honest' or 'fair' as a self-certifying adjective · subtitle `subtitle`
  - Now: "Honest about the recovery and about the violence and division."
  - Replace with: "The recovery, and the violence and division that came with it."
- **should** · Aphoristic closer, fragment stack or symmetrical pair · section.body `catholic-response`
  - Now: "Both are true. The recovery was real and the church needed it. The blood was real and the church should mourn it. Anyone who can only see one side of that is not yet telling the truth about what happened, and we are the heirs of all of it, the gift and the wound together."
  - Replace with: "The church needed the recovery, and the church should mourn the blood. We are heirs of both."
- **should** · Flat, contraction-free textbook voice · section.body `catholic-response`
  - Now: "This was not merely reaction. It was a serious recovery within the old church, and it should be told as such."
  - Replace with: "It was more than reaction. It was a serious recovery within the old church."
- **should** · Flat, contraction-free textbook voice · section.body `catholic-response`
  - Now: "So we hold two truths together and refuse to drop either. The Reformation recovered"
  - Replace with: "The Reformation recovered"

