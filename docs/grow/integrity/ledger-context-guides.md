# Grow libraries anecdote ledger, sweep 3: Reading Scripture in Context guides

This ledger records every change made in the third integrity sweep of the Grow libraries: the 41 Reading Scripture in Context guides (`client/public/context/guides/*.json`), served at `/resources/context/<slug>` and printed as PDFs at deploy by `scripts/build-pdfs.mjs`. It follows the method of the two earlier sweeps (`ledger-study-guides.md` and `ledger-life-howtos-wisdom.md`). Every string field of every guide was read, including the ten verse guides in "The Verses Everyone Quotes".

What was removed. James Bell's verified biography is only this: he came to faith from atheism; he was raised without a father; he has five sons; he is lead pastor of First Baptist Church of Fenton, Michigan; he founded the Pastors Connection Network; he is an author. He is "a pastor", never "a Baptist pastor", and the guides do not speak for his denomination or tradition. A bare mention of fifteen years of ministry may stay; no guide made one. Everything else told as his life was generalized or cut: sermons he preached or would like back, a sermon he retracted, a preaching calendar, a pulpit in Michigan, a first decade of ministry, years of habits (a working canon, years of assuming, a trained skill for softening hard sayings, a household budget), a list he keeps, his table and his house, a study full of books, his sons as an illustration, and inner experiences told as events (a step backward in a church lobby, a question tried every other way, a temptation felt). The teaching point was kept each time, and the writer stays inside the indictment as stance ("pastors, and I am one", "many of us who preach", "I am not above either temptation"), not as story. One sentence spoke for his tradition ("my country and my tradition") and was generalized; the sentence that named his denomination had already been corrected before this sweep and is recorded below. The sweep also cut or generalized statistics with no named, checkable source, and restated one overstatement of scholarly agreement modestly. No plain Forbidden Language violation was found; a later follow-up replaced two literal uses of a listed phrase (see "Follow-up after an adversarial read").

How to read it. Each row gives the source file, the JSON field path inside that file, the original sentence or sentences verbatim, the action, and the new text. Actions:

- **generalized**: the teaching point kept, the story or first-person claim turned into a common pattern ("most of us", "many of us who preach") or, where the writer implicates himself, the approved form "pastors, and I am one, ...". For a statistic, the unsourced figure is replaced with a plain description ("again and again", "whole stretches", "large numbers").
- **cut**: the added biography or unsourced figure removed and the sentence repaired.
- **corrected**: an overstatement of scholarly agreement restated modestly, with the reason in brackets.

To restore a story that is true, put James's own wording back in the same field (the original is verbatim below). If a `subtitle` or `indexBlurb` ever changes, rebuild the manifest with `node scripts/build-context-index.mjs`; the PDFs are regenerated at deploy (`pnpm pdfs` locally). The changes are in the working tree only; nothing has been committed. The guides were edited string by string inside the existing JSON text, so every file keeps its exact formatting and key order: 38 guides are `JSON.stringify(x, null, 2)` plus a newline, and three (`did-the-gospels-get-jesus-right.json`, `messianic-expectation.json`, `pharisees-sadducees-essenes.json`) keep their one-line `keyTexts` or `sources` entries. Scripture quotations were not touched. The manifest was rebuilt with `node scripts/build-context-index.mjs`; it came out byte for byte the same, because no subtitle changed. A script check confirms each of the 41 guides equals its pre-sweep snapshot plus exactly the edits listed here, and that the pre-sweep snapshot differed from the last commit only by the earlier correction.

Totals: 40 changes in 23 of the 41 guides (35 generalized, 4 cut, 1 corrected), plus 1 earlier correction recorded here and not counted. By kind: 31 first-person stories, 1 sentence speaking for his tradition, 8 statistics or agreement claims, and 0 Forbidden Language fixes (none found). A follow-up after an adversarial read made 8 more changes in 6 guides (2 generalized, 1 cut, 5 corrected), 2 of them Forbidden Language fixes, and corrected this ledger in two places; they are recorded in their own table and not counted in the totals above it. The editor then corrected four factual slips from Appendix C (4 corrected), recorded in "Factual corrections by the editor" and also not counted above.

| Kind | Changes | Generalized | Cut | Corrected |
|---|---|---|---|---|
| First-person events told as James's life | 31 | 30 | 1 | 0 |
| Speaking for his denomination or tradition | 1 | 1 | 0 | 0 |
| Unsourced statistics and overstated scholarly agreement | 8 | 4 | 3 | 1 |
| Forbidden Language | 0 | 0 | 0 | 0 |
| **All** | **40** | **35** | **4** | **1** |
| Earlier correction (before this sweep, not counted) | 1 | 0 | 1 | 0 |
| Follow-up after an adversarial read (not counted; guide text only) | 8 | 2 | 1 | 5 |
| Factual corrections by the editor (not counted) | 4 | 0 | 0 | 4 |

## Changes per file

| Source file | Guide | Changes | Generalized | Cut | Corrected |
|---|---|---|---|---|---|
| client/public/context/guides/between-the-testaments.json | What Happened Between the Old and New Testaments? | 1 | 0 | 1 | 0 |
| client/public/context/guides/collectivist-world-individualist-readers.json | Is 'You' in the New Testament Singular or Plural? | 2 | 2 | 0 | 0 |
| client/public/context/guides/covenant-and-treaty.json | What Is a Biblical Covenant? The Ancient Treaty Form | 2 | 2 | 0 | 0 |
| client/public/context/guides/did-the-gospels-get-jesus-right.json | Did the Gospels Get Jesus Right? | 1 | 1 | 0 | 0 |
| client/public/context/guides/exile-not-empire.json | What Does It Mean That Christians Are Exiles? | 1 | 1 | 0 | 0 |
| client/public/context/guides/genesis-one-in-its-world.json | Was Genesis 1 Answering Babylon, Not Modern Science? | 1 | 1 | 0 | 0 |
| client/public/context/guides/gospel-against-empire.json | What Did Gospel and Lord Mean Under Caesar? | 1 | 1 | 0 | 0 |
| client/public/context/guides/honor-status-and-the-cross.json | Why Was Crucifixion So Shameful in the Roman World? | 1 | 1 | 0 | 0 |
| client/public/context/guides/hospitality-and-the-stranger.json | What Did Hospitality Mean in the Ancient World? | 1 | 1 | 0 | 0 |
| client/public/context/guides/left-lens-right-lens.json | Does Your Politics Decide How You Read the Bible? | 4 | 4 | 0 | 0 |
| client/public/context/guides/messianic-expectation.json | What Israel Was Waiting For | 1 | 0 | 0 | 1 |
| client/public/context/guides/miracles-and-the-ancient-mind.json | Were Ancient People Gullible About Miracles? | 1 | 0 | 1 | 0 |
| client/public/context/guides/misreading-with-western-eyes.json | What We Bring to the Text Without Knowing It | 2 | 2 | 0 | 0 |
| client/public/context/guides/money-texts-we-explain-away.json | What Does the Bible Say About Wealth and the Poor? | 7 | 5 | 2 | 0 |
| client/public/context/guides/pharisees-sadducees-essenes.json | Who the Pharisees Actually Were | 1 | 1 | 0 | 0 |
| client/public/context/guides/purity-and-contagion.json | What Does Clean and Unclean Mean in Leviticus? | 2 | 2 | 0 | 0 |
| client/public/context/guides/septuagint-and-scripture.json | What Is the Septuagint, and Why Does It Matter? | 1 | 1 | 0 | 0 |
| client/public/context/guides/the-bible-is-not-an-american-book.json | Is the Bible an American Book? What Its History Shows | 3 | 3 | 0 | 0 |
| client/public/context/guides/the-kingdom-is-not-a-platform.json | Does the Kingdom of God Belong to a Political Party? | 2 | 2 | 0 | 0 |
| client/public/context/guides/the-slavery-texts.json | What Does the Bible Actually Say About Slavery? | 1 | 1 | 0 | 0 |
| client/public/context/guides/the-violence-of-the-old-testament.json | Why Is the Old Testament So Violent? An Honest Look | 1 | 1 | 0 | 0 |
| client/public/context/guides/what-justice-meant.json | What Does Justice Mean in the Bible? Mishpat and Tsedaqah | 2 | 2 | 0 | 0 |
| client/public/context/guides/women-in-the-ancient-world.json | How Did the Bible Treat Women Compared to Its World? | 1 | 1 | 0 | 0 |

Seventeen guides have no changes, including all ten verse guides; their first-person lines are stance resting on the approved facts (Appendix A).

## Changes

### First-person events told as James's life (31 changes)

| File | Field path | Original (verbatim) | Action | New text |
|---|---|---|---|---|
| between-the-testaments | `sections[0].body` | Most of us turn it without a thought. I did, for years. | cut | Most of us turn it without a thought. |
| collectivist-world-individualist-readers | `sections[0].body` | I have preached plural texts as private encouragement more times than I could count. | generalized | Those of us who preach have turned plural texts into private encouragement more times than we could count. |
| collectivist-world-individualist-readers | `sections[3].body` | The writer owns a study full of books about personal calling and an instinct, every hard week, to handle it alone. | generalized | The writer shares the instinct most of us carry, every hard week, to handle it alone. |
| covenant-and-treaty | `sections[0].body` | I have preached it both ways and served the text badly both times. | generalized | Many of us who preach have used it both ways and served the text badly both times. |
| covenant-and-treaty | `sections[4].body` | I grew up assuming the Old Testament gave us a God of law and the New Testament a God of grace. | generalized | Many of us grew up assuming the Old Testament gave us a God of law and the New Testament a God of grace. |
| did-the-gospels-get-jesus-right | `sections[4].body` | I have tried the question every other way. It is still there. | generalized | Try the question every other way. It is still there. |
| exile-not-empire | `sections[3].body` | Neither sounds like Peter's resident aliens, and I have spoken both dialects fluently from a pulpit in Michigan. | generalized | Neither sounds like Peter's resident aliens, and pastors, and I am one, learn to speak both dialects fluently from the pulpit. |
| genesis-one-in-its-world | `sections[0].body` | I have read the chapter that way myself, scanning ancient verses for ammunition in a modern argument. | generalized | Many of us have read the chapter that way, scanning ancient verses for ammunition in a modern argument. |
| gospel-against-empire | `sections[4].body` | I have been tempted to both. | generalized | I am not above either temptation. |
| honor-status-and-the-cross | `sections[4].body` | I check the numbers. I read the room. I prefer the parts of the faith that cost nothing socially, and I am quieter about the parts that do. | generalized | Most of us check the numbers. We read the room. We prefer the parts of the faith that cost nothing socially, and we are quieter about the parts that do. |
| hospitality-and-the-stranger | `sections[4].body` | I write this as a pastor whose own table seats mostly people I already love. The drift from stranger to friend, from rescue to entertaining, happened in my house too, quietly, one comfortable evening at a time. | generalized | I write this as a pastor, and I am inside the problem: most of our tables seat people we already love. The drift from stranger to friend, from rescue to entertaining, happens in our houses too, quietly, one comfortable evening at a time. |
| left-lens-right-lens | `sections[0].body` | I had a working canon for years before I could see it. The verses I underlined and the verses I explained away mapped onto my politics with a precision that should have embarrassed me much sooner than it did. | generalized | Most of us carry a working canon for years before we can see it. The verses we underline and the verses we explain away map onto our politics with a precision that should embarrass us much sooner than it does. |
| left-lens-right-lens | `sections[2].body` | I was trained in this and I was good at it. I could exegete a hard saying of Jesus into something a major donor could live with, and I called the result balance. It was not balance. It was a tribe protecting its treasure from its own Scriptures, and I held the door open. | generalized | Pastors, and I am one, can get good at this. We can exegete a hard saying of Jesus into something a major donor could live with, and call the result balance. It is not balance. It is a tribe protecting its treasure from its own Scriptures, with a preacher holding the door open. |
| left-lens-right-lens | `sections[3].body` | I have held this door too. There were years I softened what Scripture says about holiness because the room I wanted to reach found the subject embarrassing, and I called that compassion. | generalized | Preachers hold this door too. Many of us have softened what Scripture says about holiness because the room we wanted to reach found the subject embarrassing, and we called that compassion. |
| left-lens-right-lens | `sections[4].body` | I keep a list now of texts that have defeated me, verses that took something from me I wanted to keep. The list is short. | generalized | Keep a list of texts that have defeated you, verses that took something from you that you wanted to keep. Mine would be short. |
| misreading-with-western-eyes | `sections[0].body` | When I tell my sons we are leaving at nine, I do not specify morning, or that shoes are expected. It goes without saying, because we share a world. | generalized | Tell a child we are leaving at nine, and you do not specify morning, or that shoes are expected. It goes without saying, because you share a world. |
| money-texts-we-explain-away | `sections[0].body` | I can, because I preached them. In my first decade of ministry I preached the money texts at a rate that bore no relation to their frequency in the book I claimed as my authority. I was not censoring deliberately. I had simply learned, the way a child learns a dialect, which passages were for preaching and which were for footnotes. | generalized | Pastors, and I am one, preach the money texts at a rate that bears no relation to their frequency in the book we claim as our authority. Most of us are not censoring deliberately. We have simply learned, the way a child learns a dialect, which passages are for preaching and which are for footnotes. |
| money-texts-we-explain-away | `sections[3].body` | I have preached the first escape and voted the second, and neither one ever asked me for a key to the house. | generalized | Many of us have preached the first escape and voted the second, and neither one ever asked us for a key to the house. |
| money-texts-we-explain-away | `sections[4].body` | It is whether my giving has ever altered how I live, and for most of my ministry the answer was no. | generalized | It is whether my giving has ever altered how I live, and for most of us, pastors included, the answer is no. |
| money-texts-we-explain-away | `sections[4].body` | Mine confessed, for years, that I believed in Jesus and trusted the mortgage. | generalized | Many of ours confess that we believe in Jesus and trust the mortgage. |
| pharisees-sadducees-essenes | `sections[0].body` | I preached that cartoon. It was easy, it flattered my audience, and it was wrong. | generalized | Pulpits have preached that cartoon for generations, and I stand in one. It is easy, it flatters the audience, and it is wrong. |
| purity-and-contagion | `sections[4].body` | I have felt it activate in me, that small instinctive step backward, and called it discernment. | generalized | Most of us have felt it activate, that small instinctive step backward, and called it discernment. |
| the-bible-is-not-an-american-book | `sections[0].body` | I forget this constantly. I read Philippians, written by a prisoner awaiting trial under an emperor who would soon kill him, and I receive it as encouragement for a difficult week. | generalized | Most of us forget this constantly. We read Philippians, written by a prisoner awaiting trial under an emperor who would soon kill him, and receive it as encouragement for a difficult week. |
| the-bible-is-not-an-american-book | `sections[2].body` | I know the difference because I have done both from the same pulpit. Projection feels wonderful. The congregation nods, the nation is flattered or scolded on schedule, and nothing in me is at risk. Application costs. It once made me stand up and retract a sermon. That is how I learned which one I had been doing. | generalized | Anyone who preaches, and I do, knows the difference, because both can be done from the same pulpit. Projection feels wonderful. The congregation nods, the nation is flattered or scolded on schedule, and nothing in the preacher is at risk. Application costs. It can make a preacher stand up and retract a sermon. That is how he learns which one he has been doing. |
| the-bible-is-not-an-american-book | `sections[3].body` | I have preached the nation when I meant to preach Christ, and the sermons were well received, which should have warned me. The applause of your own tribe is not the witness of the Spirit. I learned that slowly, and at cost. | generalized | Those of us in pulpits can preach the nation when we mean to preach Christ, and such sermons are well received, which should warn us. The applause of your own tribe is not the witness of the Spirit. Most of us learn that slowly, and at cost. |
| the-kingdom-is-not-a-platform | `sections[2].body` | I have written him recruitment letters of my own, in sermons I preached with full conviction and would now like back. | generalized | Preachers, and I am one, have written him recruitment letters of our own, in sermons preached with full conviction that we would now like back. |
| the-kingdom-is-not-a-platform | `sections[4].body` | If you can think of one but have never said it where it counts, then mine has been too, more often than I want to write down. | generalized | If you can think of one but have never said it where it counts, then it has been outsourced too, and I write that sentence to myself first. |
| the-violence-of-the-old-testament | `sections[0].body` | I have watched congregations read around these chapters for years, and I have built preaching calendars that did the same. | generalized | Congregations read around these chapters for years, and pastors, and I am one, build preaching calendars that do the same. |
| what-justice-meant | `sections[0].body` | I spent years assuming I already knew. I was carrying a definition into the text. The text, read slowly, took it from me. | generalized | Most of us spend years assuming we already know. We carry a definition into the text. The text, read slowly, takes it from us. |
| what-justice-meant | `sections[2].body` | I have built entire sermon series on knowing God that never mentioned them once. The prophets would have had questions for me. | generalized | Many of us who preach have built entire sermon series on knowing God that never mentioned them once. The prophets would have had questions for us. |
| women-in-the-ancient-world | `sections[4].body` | Texts written into a hard world to protect women have been quoted to demean them, and I have sat in rooms where it happened and said nothing. | generalized | Texts written into a hard world to protect women have been quoted to demean them, and many of us, pastors included, have sat in rooms where it happened and said nothing. |

### Speaking for his denomination or tradition (1 change, plus 1 earlier correction)

| File | Field path | Original (verbatim) | Action | New text |
|---|---|---|---|---|
| the-slavery-texts | `sections[3].body` | Then the test came to my country and my tradition, and we failed it. | generalized (speaks for his tradition) | Then the test came to my country and its churches, and we failed it. |
| the-slavery-texts | `sections[3].body` | Name the failures without flinching. My own denomination, the Southern Baptist Convention, was founded in 1845 so that slaveholders could serve as missionaries. | cut, earlier (before this sweep; first recorded in `library-flags.md`; the only difference between the pre-sweep guides and the last commit) | Name the failures without flinching. The Southern Baptist Convention was founded in 1845 so that slaveholders could serve as missionaries. |

### Unsourced statistics and overstated scholarly agreement (8 changes)

| File | Field path | Original (verbatim) | Action | New text |
|---|---|---|---|---|
| messianic-expectation | `sections[3].body` | This is why no historian thinks the early church invented its central claim. | corrected (overstated scholarly agreement) | This is why historians, skeptical ones among them, broadly agree that the early church did not invent the crucifixion. |
| miracles-and-the-ancient-mind | `sections[3].body` | Craig Keener's two-volume Miracles documents claims across continents and centuries, including survey work suggesting hundreds of millions of living people believe they have witnessed divine healing. | cut (unsourced survey figure) | Craig Keener's two-volume Miracles documents claims across continents and centuries, many of them from living people who believe they have witnessed divine healing. |
| misreading-with-western-eyes | `sections[3].body` | Jesus talked about wealth more than almost any other moral subject, and the early church heard those texts as people who knew hunger. | generalized (uncited comparative count) | Jesus talked about wealth again and again, and the early church heard those texts as people who knew hunger. |
| money-texts-we-explain-away | `sections[0].body` | Scripture returns to money, possessions, and the poor hundreds of times, by most counts more often than it speaks of heaven and hell combined. | cut (uncited count) | Scripture returns to money, possessions, and the poor hundreds of times. |
| money-texts-we-explain-away | `sections[0].body` | Jesus talked about wealth more than almost any other moral subject. | generalized (uncited comparative count) | Jesus talked about wealth again and again. |
| money-texts-we-explain-away | `sections[3].body` | I advocate the right programs, vote the right way, and the state does my gleaning for me, while my own giving sits, the surveys keep finding, at roughly the same low percentage as my conservative neighbor's. | cut (unsourced survey finding) | I advocate the right programs, vote the right way, and the state does my gleaning for me, while my own giving stays exactly where it was. |
| purity-and-contagion | `sections[0].body` | Both files are wrong, and both will wreck your reading of a third of the Old Testament. | generalized (uncited proportion) | Both files are wrong, and both will wreck your reading of whole stretches of the Old Testament. |
| septuagint-and-scripture | `sections[0].body` | By the third century BC, more Jews lived outside the land than in it, and most of them spoke Greek, not Hebrew. | generalized (uncited population claim) | By the third century BC, large numbers of Jews lived outside the land, and many of them spoke Greek, not Hebrew. |

### Follow-up after an adversarial read (8 changes, plus 2 ledger corrections)

An adversarial reader checked this sweep's results and reported ten findings; each was re-read in place and all ten were accepted. Eight changed guide text in 6 guides; two corrected this ledger (the last two rows). Where a row touches a sentence already changed above, its original is this sweep's new text, and its new text supersedes the earlier row's. The two Forbidden Language rows reverse this sweep's judgment that "do the work" could stay in a literal sense: the revision pass in `CLAUDE.md` searches the list literally, `scripts/validate-grow-voice.mjs` flags the phrase with no exception, and `library-flags.md` already replaced it in the Prayer Generator. Appendix A, the totals, and Appendix D were updated to match.

| File | Field path | Original (verbatim) | Action | New text |
|---|---|---|---|---|
| genesis-one-in-its-world | `sections[2].body` | In Babylon, humans were made from the blood of a condemned god to do the work the gods despised. | corrected (Forbidden Language, literal "do the work") | In Babylon, humans were made from the blood of a condemned god to do the labor the gods despised. |
| the-cities-of-paul | `sections[0].body` | Four cities will do the work. | corrected (Forbidden Language, literal "do the work") | Four cities will make the case. |
| the-bible-is-not-an-american-book | `sections[2].body` | Application costs. It can make a preacher stand up and retract a sermon. That is how he learns which one he has been doing. | cut (the retracted sermon survived this sweep's rewrite by implication, right after "Anyone who preaches, and I do") | Application costs. The cost is how a preacher learns which one he has been doing. |
| the-kingdom-is-not-a-platform | `sections[2].body` | Preachers, and I am one, have written him recruitment letters of our own, in sermons preached with full conviction that we would now like back. | corrected (this sweep's new text let "that we would now like back" read as the content of the conviction) | Preachers, and I am one, have written him recruitment letters of our own, in sermons we preached with full conviction and would now like back. |
| money-texts-we-explain-away | `sections[3].body` | Many of us have preached the first escape and voted the second, and neither one ever asked us for a key to the house. | corrected (this sweep's new text told a mostly lay readership that it had preached) | Many of us have believed the first escape and voted the second, and neither one ever asked us for a key to the house. |
| money-texts-we-explain-away | `sections[4].body` | It is whether my giving has ever altered how I live, and for most of us, pastors included, the answer is no. | corrected (this sweep's new text made an unsourced majority claim) | It is whether my giving has ever altered how I live, and many of us, pastors included, would have to answer no. |
| money-texts-we-explain-away | `sections[0].body` | So has nearly every American congregation, red and blue alike. | generalized (uncited near-universal count, missed above) | So have congregations, red and blue alike. |
| between-the-testaments | `sections[1].body` | It is the question under half the New Testament. | generalized (uncited proportion, missed above; "a third of the Old Testament" in purity-and-contagion was treated the same way) | It is the question under much of the New Testament. |
| this ledger | Appendix B | (no row; the opening sentence said no searched phrase matched outside the guides and these ledgers) | corrected (ledger) | A row for "preaching calendars", still quoted in `library-flags.md`, and the opening sentence restated with its two exceptions. |
| this ledger | Appendix C, money-texts-we-explain-away row | The Revised Common Lectionary's Sunday readings from James 5 are 5:7-10 and 5:13-20; James 5:1-6, quoted just before, is not among them. "Most of them" would be exact. | corrected (ledger; the note invited James to weaken a defensible sentence) | The note restated in Appendix C: defensible as written, since only the RCL Sunday cycle skips James 5:1-6. |

### Factual corrections by the editor (4 changes)

Appendix C listed four possible factual slips the sweep left for James. The editor corrected each where the fact is certain, in the smallest wording that makes the sentence exact. They are not counted in the totals above.

| File | Field path | Original (verbatim) | Action | New text |
|---|---|---|---|---|
| did-the-gospels-get-jesus-right | `sections[1].body` | He measured them against dozens of ancient lives, | corrected (Burridge's study compares ten Graeco-Roman lives) | He measured them against ten ancient lives, |
| did-the-gospels-get-jesus-right | `sections[4].body` | was offered a single tidy harmonized Gospel, and refused it, keeping four. | corrected (Tatian's Diatessaron was read in Syriac-speaking churches for centuries) | was offered a single tidy harmonized Gospel, and as a whole refused it, keeping four, even though Syriac-speaking churches read that harmony for centuries. |
| women-in-the-ancient-world | `sections[0].body` | written the year before Jesus was born, | corrected (P.Oxy. 744 is dated to 1 BC, after the usual dating of Jesus's birth) | written in 1 BC, a few years after most historians place the birth of Jesus, |
| the-violence-of-the-old-testament | `sections[1].body` | Add that Jericho, Ai, and Hazor functioned as walled military strongpoints more than civilian population centers, as John Walton has argued, | corrected (the argument is made by Paul Copan, in this guide's sources; Hazor dropped, since the case is made for Jericho and Ai) | Add that Jericho and Ai may have functioned as walled military strongpoints more than civilian population centers, as Paul Copan has argued, |

## Appendix A. Lines deliberately kept

These still speak in the first person, mention a pastor's work, or look like a claim, but narrate no event beyond the verified facts, belong to Scripture or to the voice of a position being described, or are sourced or checkable. They are listed so they can be checked.

| Where | Field path | Text | Why kept |
|---|---|---|---|
| proverbs-3-5-6-in-context | `sections[1].body` | I was raised without a father, and I have five sons, so I can't read that as background. | Two approved facts used as stance; the brief names this sentence as acceptable. |
| psalm-91-in-context | `sections[0].body` | I have five sons, and I understand why we want it to be one. | Approved fact used as stance; no event. |
| 2-chronicles-7-14-in-context, jeremiah-29-11-in-context, matthew-18-20-in-context, matthew-7-1-in-context, romans-13-1-in-context, proverbs-3-5-6-in-context, psalm-91-in-context | `sections[0].body`, `sections[3].body` | I'm a pastor, and that's the reading I watch for in myself / I'm a pastor, so that indictment has my name in it. / I'm a pastor, and I know how much easier it is to quote this verse over a meeting than to let it govern one. / I'm a pastor, and part of my work is telling people when something is wrong, so this passage was aimed at me first. / I feel that pull myself, and I'm a pastor, charged with preaching the whole chapter to both halves of the room. / Pastors, and I am one, are tempted by both / Anyone who preaches is tempted by both, and I preach. | Approved fact (he is a pastor) used as present-tense stance; no sermon, room, or person is narrated. |
| messianic-expectation | `sections[4].body` | Before I judge the crowd that wanted a sword instead of a cross, I should sit with my own prayers. I still hand God a job description. I still measure his faithfulness by my expectations and call the gap disappointment. ... I have no reason to assume I would have done better. | Present-tense conviction; the brief names the last sentence as acceptable. |
| jeremiah-29-11-in-context, matthew-7-1-in-context | `sections[3].body` | I can find both edits in my own heart. / Those are the two measures the Law forbade, and I can find both in my own house. | Present-tense self-implication. "In my own house" echoes Deuteronomy 25:14 ("two differing measures in your house") and narrates no household event; James may prefer "heart". |
| the-gods-of-the-nations | `sections[0].body`, `sections[3].body` | the hunger the idols answered is the hunger I carry into every anxious week / Israel kept choosing the god who could be managed. So do I. | Present-tense confession of a condition every reader shares; no event. |
| patronage-and-grace | `sections[3].body` | I notice this in myself whenever grace lands on someone I had quietly filed as unworthy. | A present-tense inner reaction true of any reader; no occasion is named. James may prefer the collective form this sweep used elsewhere ("Most of us have felt it"). |
| pharisees-sadducees-essenes | `sections[4].body` | When I read Matthew 23 honestly, I am not standing beside Jesus pointing at the hypocrites. I am the religious professional in the scene. ... He is the man in my mirror. | Present-tense self-implication resting on an approved fact (a pastor is the religious professional in the scene). |
| exile-not-empire | `sections[4].body` | Their indictments land on me and my church before they land on Washington | Stance; "my church" is the congregation he leads (approved fact); no event. |
| the-violence-of-the-old-testament | `sections[3].body`, `sections[4].body` | I will not adjudicate this in a guide. / Not mine, not anyone's / the church that preached them, my church in the long sense of the word, owns the failure / and neither may I. | "My church in the long sense of the word" is the whole church across time, not a denomination; "mine" is his country. Stance lines. |
| the-slavery-texts | `sections[3].body`, `sections[4].body` | The Southern Baptist Convention was founded in 1845 so that slaveholders could serve as missionaries. / I will not ask you to look away ... and so will I. | A historical fact about a denomination, no longer claimed as his own; stance lines. |
| collectivist-world-individualist-readers, misreading-with-western-eyes, money-texts-we-explain-away, honor-status-and-the-cross, the-bible-is-not-an-american-book, left-lens-right-lens, the-kingdom-is-not-a-platform, hospitality-and-the-stranger, gospel-against-empire | various | That is the blind spot, and I share it. / the writer included / me included / are not strangers to me / I am not above this. / I ask it of myself before I ask it of you. / Mine would be short. / I write that sentence to myself first. / I write this as a pastor, and I am inside the problem / I am not above either temptation. | Stance lines that keep the writer inside the indictment. Several are this sweep's new text; the stories that followed the others were generalized. |
| did-the-gospels-get-jesus-right, philippians-4-13-in-context, what-justice-meant, left-lens-right-lens | `sections[0].body`, `sections[3].body`, `sections[4].body` | I want that objection on the table whole / I would leave the verse on the wristband. / To my friends on the right ... To my friends on the left / Every Christian I know reads the whole Bible. Every Christian I know also has a working canon | Direct address and judgment; no event. The last is a general claim about acquaintances, not a scene; James may prefer "Most Christians". |
| 2-chronicles-7-14-in-context, honor-shame-vs-guilt, patronage-and-grace, household-codes-in-context, isaiah-41-10-in-context, romans-8-28-in-context, romans-13-1-in-context | various | Some of us made the signs. / We have preached acquittal to people who were dying for a welcome. / We have preached a grace that asks nothing / That failure belongs to us. It is in our family record. / Those of us who preach are tempted / Those of us whose work is to say something at the bedside / and pastors more than our share | Collective first person (the church, or pastors as a class); no event in James's life. |
| money-texts-we-explain-away, the-bible-is-not-an-american-book, septuagint-and-scripture, collectivist-world-individualist-readers, misreading-with-western-eyes, covenant-and-treaty | various | since I judge my own heart unattached, I may keep everything / I advocate the right programs, vote the right way / not what I may claim ... what I owe / where do I actually stand in it? / what exactly am I holding? / Church becomes a service provider for my growth / a God who guarantees my five-year plan / You perform, I pay | The voice of the position being described, or the reader's own question; not the writer's life. |
| many guides | various | I am the LORD thy God / I have chosen and not rejected you / I can do all things through Christ who gives me strength / Woe is me / Both I and my father's house have sinned / Far be it from me to boast / and others | Scripture, quoted or paraphrased; not ours to edit. |
| pharisees-sadducees-essenes | `sections[2].body` | perhaps six thousand of them by Josephus' count | Sourced in the sentence (Josephus). |
| the-cities-of-paul | `sections[2].body` | Fifty thousand pieces of silver. | Acts 19:19. |
| what-justice-meant, money-texts-we-explain-away | `sections[0].body` | mishpat ... appears hundreds of times / Scripture returns to money, possessions, and the poor hundreds of times | Checkable with a concordance; no precise figure claimed. |
| women-in-the-ancient-world | `sections[3].body` | a third of the names are women | Countable in Romans 16 itself. |
| the-cities-of-paul | `sections[2].body` | roughly four times the footprint of the Parthenon | A measurement claim resting on the recorded dimensions of the temple of Artemis, checkable rather than a research finding. James may prefer "several times". |
| temple-and-synagogue | `sections[0].body` | pilgrims swelled Jerusalem to several times its size | A hedged estimate with no figure, of the kind E. P. Sanders (in this guide's sources) discusses. |
| the-slavery-texts | `sections[2].body` | A movement of a few thousand people | A rough rhetorical scale, not a research figure. |
| did-the-gospels-get-jesus-right, 2-chronicles-7-14-in-context, matthew-18-20-in-context, the-cities-of-paul, wisdom-and-the-nations, covenant-and-treaty | various | close to consensus across the field, skeptical scholars included / on a dating even skeptical scholars accept / most scholars place the book's writing in the Persian period / most scholars date it to the second half of the first century / which most scholars take as a garbled reference / Most scholars conclude that the editors of Proverbs knew Amenemope, or a tradition shared with it / The parallel itself is widely acknowledged | Agreement claims that match the state of the field (Burridge on the Gospels' genre; the early date of the creed in 1 Corinthians 15; the Chronicler's date; Matthew's date; Suetonius's Chrestus; Amenemope; the treaty parallel). None claims agreement on the resurrection or the empty tomb. |
| miracles-and-the-ancient-mind | `sections[2].body` | So the claim that Jesus rose bodily, leaving an empty tomb, fit no one's expectations | An argument about first-century expectations, not a claim that historians agree on the empty tomb. |
| genesis-one-in-its-world | `sections[2].body` | show up on day five | A literal sense (creatures appearing), not the therapy-speak. This row also kept two literal uses of "do the work" (genesis-one-in-its-world `sections[2].body`, the-cities-of-paul `sections[0].body`); the follow-up replaced both, because the revision pass searches the list literally. |
| matthew-7-1-in-context, money-texts-we-explain-away, the-slavery-texts | various | Blessed are the merciful / Blessed are the poor in spirit / Whips were blessed from pulpits. | Scripture (the Beatitudes) and a verb; not the forbidden adjective. |
| isaiah-41-10-in-context, matthew-7-1-in-context, romans-8-28-in-context | various | Be strong! / You hypocrite! / Wake up, O Lord! | Every exclamation point sits inside quoted Scripture. |

## Appendix B. The same stories outside this sweep (not edited)

None of the 31 first-person stories changed here appears outside the context guides. Each was searched for by its distinctive wording across the repository (for example "pulpit in Michigan", "retract a sermon", "I preached that cartoon", "leaving at nine", "first decade of ministry", "recruitment letters", "preaching calendars", "sat in rooms where it happened", "trusted the mortgage", "major donor could live with", "study full of books", "tried the question every other way"), with no match outside `client/public/context/guides/` and these ledgers, except two. "Preaching calendars" was quoted in `library-flags.md` until the editor dropped it (row below). "First decade of ministry" also matches three archived files, in other sentences, not the money-texts story: `content/archive/leadership-lib/articles/the-power-of-saying-no.json` makes its own first-person claim ("I said yes to almost everything for the first decade of ministry"), and `content/archive/free-library/the-hidden-life-of-a-pastor.json` and `content/books-src/the-hidden-life-of-a-pastor.txt` speak of other men. None of these files was edited. The gitignored `dist/` build output also holds the old guide text until the next build.

| Changed in | Claim | Also found in |
|---|---|---|
| money-texts-we-explain-away (`sections[0].body`) | Scripture, or Jesus, speaks of money more than of heaven and hell combined (an uncited count; sweep 2 left the same claim in two life pages, which the editor has since corrected) | `api/_data/admin-article-bodies.json`, `api/integrated-life-articles.json`, `api/static-library.generated.ts`, `client/public/catalogue/index.json`, `client/public/llms-full.txt`, `client/src/data/answers.ts`, `client/src/data/articles/livewell-series.json`, `client/src/data/content-data.json`, `client/src/data/money-vocation-articles.ts`, `content/archive/free-library/essays-money-stewardship.json`, `content/archive/free-library/sent-into-the-city.json`, `content/archive/free-library/the-undivided-life.json`, `content/archive/leadership-lib/sermon-series.json`, `content/books-src/sent-into-the-city.txt`, `content/drafts/essays-finances.md`, `content/drafts/living-well/what-the-bible-says-about-money.md`, `content/full/church-sex-more-than-money.md`, `content/static-library.generated.json`, `docs/audit-voice/ledger.json`, `docs/marketing/substack-and-social-livewell-series.md` |
| the-slavery-texts (`sections[3].body`, the earlier correction) | "My own denomination, the Southern Baptist Convention," | Discussed, not repeated as live copy, in `docs/grow/integrity/library-flags.md` (where the correction was first recorded) and `docs/VOICE-AUDIT-REPORT.md` (item 4). |
| miracles-and-the-ancient-mind (`sections[3].body`) | the "hundreds of millions" survey figure | This sweep removed it from the guide; `docs/grow/integrity/library-flags.md` has since moved it from "For James: claims without a source" to its corrected table. |
| the-violence-of-the-old-testament (`sections[0].body`) | "preaching calendars" ("I have built preaching calendars that did the same") | Quoted in `docs/grow/integrity/library-flags.md` (the "Theology pages" row of "For James: first-person stories"), as "I have built preaching calendars...". `git log -S "built preaching calendars"` shows the sentence only ever existed in this guide, so the row misattributed it to a theology page, and this sweep resolved it. The editor has since dropped it from that row, along with "the Old Testament's violence", which had no theology page behind it. |

Outputs. The manifest `client/public/context/guides-index.json` is unchanged, because no subtitle or index blurb was edited, so `client/public/llms-full.txt` and `client/public/catalogue/index.json` (which draw on the manifest's blurbs) are unaffected. The PDFs in `client/public/downloads/context/` are build outputs (gitignored), regenerated at deploy; any local copies still carry the old wording until `pnpm pdfs` runs.

## Appendix C. Noticed outside the sweep's categories

Outside this sweep's four categories (stories told as James's life, speaking for his tradition, unsourced statistics and overstated agreement, Forbidden Language), so the sweep left them as written. Four were then corrected by the editor, where the fact is certain (see "Factual corrections by the editor"); the lectionary row stays as written.

| Where | Field path | Text | Note |
|---|---|---|---|
| did-the-gospels-get-jesus-right | `sections[1].body` | He measured them against dozens of ancient lives | Burridge's study compares the Gospels in detail with ten Graeco-Roman lives (five earlier, five later); "dozens" overstates the sample. Corrected by the editor; see "Factual corrections by the editor". |
| did-the-gospels-get-jesus-right | `sections[4].body` | The church ... was offered a single tidy harmonized Gospel, and refused it, keeping four. | Tatian's Diatessaron was the Gospel text read in Syriac-speaking churches into the fifth century; the wider church kept four. A clause would make it exact. Corrected by the editor; see "Factual corrections by the editor". |
| money-texts-we-explain-away | `sections[2].body` | None of these texts is obscure. Every one of them sits in the lectionary. | Defensible as written. The guide says "the lectionary", not the Revised Common Lectionary's Sunday cycle, and that cycle is the one that skips James 5:1-6 (its Sunday readings from James 5 are 5:7-10 and 5:13-20). The Roman Catholic lectionary reads James 5:1-6 on the Twenty-sixth Sunday in Ordinary Time (Year B) and on a weekday (Thursday of the seventh week, Year II), and daily-office lectionaries read all of James. Leave as is; "most of them" is needed only if the sentence is meant of the RCL Sundays. (Recalled, not checked against a published lectionary; web search was unavailable.) |
| women-in-the-ancient-world | `sections[0].body` | A surviving letter from a workman named Hilarion ..., written the year before Jesus was born | The papyrus (P.Oxy. 744) is dated to 1 BC; most historians date Jesus's birth several years earlier, so it was written a few years after. Corrected by the editor; see "Factual corrections by the editor". |
| the-violence-of-the-old-testament | `sections[1].body` | Jericho, Ai, and Hazor functioned as walled military strongpoints more than civilian population centers, as John Walton has argued | The argument is better known from Richard Hess and from Paul Copan (in this guide's sources); worth confirming the Walton attribution against his book before keeping his name on it. Corrected by the editor; see "Factual corrections by the editor". |

## Appendix D. Checks

Validators, run after the edits and the manifest rebuild. Only `validate-verse-guides` reads the context guides' text; the other five pass but do not read it, so the final search below covers this library directly (it also confirms zero em-dashes).

```
$ node scripts/validate-verse-guides.mjs  (exit 0)
Verse guides: clean (10 in "The Verses Everyone Quotes").
$ node scripts/validate-grow-voice.mjs  (exit 0)
Grow voice: clean (381 files).
$ node scripts/validate-no-emdash.mjs  (exit 0)
validate-no-emdash: clean (231 files, 0 em-dashes).
$ node scripts/validate-content-integrity.mjs  (exit 0)
Content integrity: clean.
$ node scripts/validate-grow-links.mjs  (exit 0)
Grow links: clean (421 files checked).
$ node scripts/validate-scripture.mjs  (exit 0)
[scripture] ok — every page rendering verse text declares what it is
```

Final search of all 41 context guides (every string field) for every pattern this sweep fixed, run by the sweep's check script after the edits:

```
[1] 41 guides checked against snapshot + 40 edits: exact
[2] snapshot vs HEAD: the-slavery-texts.json differ; earlier correction only: true
[3] final search, 41 context guides (every string field):
    first-person sermons, ministry, and habits: 0
    biography: places, family, possessions: 0
    speaks for his denomination or tradition: 0
    uncited statistics and overstated agreement fixed: 0
    em-dashes: 0
    Forbidden Language list (words, phrases, therapy-speak): 0
    literal senses kept (Appendix A): 6
      genesis-one-in-its-world.json sections[2].body: show up
      genesis-one-in-its-world.json sections[2].body: do the work
      matthew-7-1-in-context.json sections[1].body: Blessed
      money-texts-we-explain-away.json sections[3].body: Blessed
      the-cities-of-paul.json sections[0].body: do the work
      the-slavery-texts.json sections[3].body: blessed
```

Follow-up checks, run after the follow-up edits. The manifest was rebuilt with `node scripts/build-context-index.mjs` and again came out byte for byte the same (no subtitle or index blurb changed).

```
$ node scripts/build-context-index.mjs  (exit 0)
[build-context-index] wrote 41 guides to client/public/context/guides-index.json
$ node scripts/validate-verse-guides.mjs  (exit 0)
Verse guides: clean (10 in "The Verses Everyone Quotes").
$ node scripts/validate-grow-voice.mjs  (exit 0)
Grow voice: clean (381 files).
$ node scripts/validate-no-emdash.mjs  (exit 0)
validate-no-emdash: clean (231 files, 0 em-dashes).
$ node scripts/validate-content-integrity.mjs  (exit 0)
Content integrity: clean.
$ node scripts/validate-grow-links.mjs  (exit 0)
Grow links: clean (421 files checked).
$ node scripts/validate-scripture.mjs  (exit 0)
[scripture] ok — every page rendering verse text declares what it is
```

A follow-up check script applied every guide row in this ledger's change tables (the earlier correction, the 40 sweep edits, then the 8 follow-up edits) to the last commit's guides, each original matching exactly once, and searched every string field of the 41 guides for the Forbidden Language list and em-dashes:

```
HEAD + 49 ledger edits == working tree: 41/41 guides exact; problems: 0
Forbidden Language + em-dash hits across 41 guides: 3
  matthew-7-1-in-context.json sections[1].body: blessed
  money-texts-we-explain-away.json sections[3].body: blessed
  the-slavery-texts.json sections[3].body: blessed
```

The three remaining hits are the Beatitudes and a verb (Appendix A). "do the work" no longer appears in any guide.

After the editor's four factual corrections, the same replay was run again with every guide row in this ledger (the earlier correction, the 40 sweep edits, the 8 follow-up edits, and the 4 editor corrections):

```
applied 53 rows; 41/41 guides exact; problems 0
```
