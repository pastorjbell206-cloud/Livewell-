# Voice and AI-tell audit: Study Bible notes

Library: `/home/user/Livewell-/client/public/bible/notes/` (about 3.5 million words: 151,000 in 66 book introductions, 2.23 million in 1,189 chapter notes, 1.12 million in verse notes). Read-only audit; nothing was edited.

**human_score: 6 / 10. voice_score: 5 / 10.**

Accurate, fair and well sourced, and in the 114 rebuilt chapters it reads like a careful human; the 1,075 older chapters and the section templates give it away as machine-made, and nothing in it is distinctively James.

The scores are an average of two tiers. The 114 rebuilt chapters (fields `teach`, `interpretation`, `text`) would score 8 for human and 6 for voice. The 1,075 older chapters would score 5 and 4.

## What I read

- genesis/intro.json (full)
- psalms/intro.json (full)
- isaiah/intro.json (full)
- romans/intro.json (full)
- hebrews/intro.json (full)
- revelation/intro.json (full)
- mark/intro.json (full except further-reading bibliographic fields)
- john/intro.json (full except further-reading bibliographic fields)
- genesis/1.json (full)
- psalms/23.json (full)
- romans/8.json (full)
- hebrews/11.json (full)
- revelation/21.json (full)
- isaiah/53.json (full)
- mark/1.json (full)
- john/1.json (title, summary, first paragraph of story, literary, christ, hard answers; all doctrine notes, teach.big, pitfalls, pastoral, apply questions)
- john/3.json (same sections as john/1.json)
- john/verses/3.json (verses 8 and 16)
- spot extracts from about 60 other files surfaced by search

I also searched every string in the library by pattern; the counts below are corpus-wide. Each quoted example was checked to occur exactly once in the field named.

## What is clean

- Em-dash outside a quotation: 0. Exclamation point outside a quotation: 0 (137 inside quoted Scripture).
- Forbidden Language: none in use. Literal hits only: 'landscapes' (song-of-solomon/6.json, doctrines.0.note), 'authenticity' of manuscripts, 'your truth' inside a psalm title.
- Announced turns ('Here is the thing', 'Let me explain', 'Make no mistake', 'The truth is'): 0. Connectives 'Moreover' and 'Furthermore': 0.
- Biography, title, years in ministry, book count, denomination: none. No first-person narrator.
- Politics: no criticism aimed in one direction.

## Patterns that repeat

### P1. Antithesis as the default gait ('not X but Y', 'X, not Y.', 'not only X but Y')

About 1,820 tight 'not X but Y' constructions and about 2,700 sentences that end ', not Y.' across the notes. Mean density is 3.5 per 1,000 words in the 1,075 older-format chapter notes against 2.4 in the 114 rebuilt ones. Psalm 23 has 11 in 1,255 words; 1 Thessalonians 2 has 17 in 1,429. Heaviest in doctrines.N.note, words.N.note, christ, and the verse-level theology notes. Fix rule: keep one antithesis per chapter note where Scripture itself makes the contrast (Mark 10:45, Romans 8:15); elsewhere state the positive half and drop the invented foil.

- `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `doctrines.1.note` (should)
  - Quote: The psalm shows trust not as the absence of danger but as confidence in God's presence within it. Its heart is the simple confession, You are with me.
  - Replacement: Trust in this psalm is confidence that God is present in the danger. Its central confession is You are with me.
  - Tell: 'not X but Y' antithesis as default gait, plus stock 'its heart is'. One of 11 antitheses in a 1,255-word note. The denial ('absence of danger') answers nobody; a person would just say what the psalm does.
- `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `doctrines.2.note` (should)
  - Quote: The shepherd's care is not sentiment but faithfulness to his own name.
  - Replacement: The shepherd cares for the sheep because he is faithful to his own name.
  - Tell: 'not X but Y' aphoristic closer. Third doctrine note in a row to close on a balanced antithesis; reads as a generated cadence.
- `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `doctrines.0.note` (should)
  - Quote: His care reaches through dark valleys, not only around them.
  - Replacement: His care goes with the sheep through the dark valley.
  - Tell: 'X, not Y' two-beat closer. Epigram shape; the plain statement is stronger.
- `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `words.1.note` (should)
  - Quote: The psalmist fears no evil there, not because it isn't dark but because God is with him.
  - Replacement: It is dark, and the psalmist fears no evil there because God is with him.
  - Tell: 'not because X but because Y'. Fourth antithesis on the same idea in one note.
- `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `story` (should)
  - Quote: It is the best-known psalm in the Bible, yet it is not naive; its peace is found in the valley and in the presence of enemies, not in their absence.
  - Replacement: It is the best-known psalm in the Bible, and it isn't naive. The psalmist finds peace in the valley and with his enemies still present.
  - Tell: double antithesis in one sentence. 'not naive' and 'not in their absence' stack two denials; the second half restates the first as a slogan.
- `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `cultural` (should)
  - Quote: Green pastures and quiet waters were not a lazy meadow but places a shepherd had to find and lead his flock toward
  - Replacement: Green pastures and quiet waters were places a shepherd had to find and lead his flock toward
  - Tell: 'not X but Y' with an invented foil. Nobody proposed 'a lazy meadow'; the foil exists only to set up the antithesis.
- `/home/user/Livewell-/client/public/bible/notes/hebrews/11.json` :: `doctrines.0.note` (should)
  - Quote: It is not a leap in the dark but confidence in the character of the God who promised:
  - Replacement: It is confidence in the character of the God who promised:
  - Tell: 'not X but Y' with a stock foil. 'Leap in the dark' is a cliché foil; the same note pattern recurs in words.1.note ('not wishful thinking but').
- `/home/user/Livewell-/client/public/bible/notes/hebrews/11.json` :: `words.1.note` (should)
  - Quote: It is not wishful thinking but a settled conviction grounded in God's word.
  - Replacement: It is a settled conviction grounded in God's word.
  - Tell: 'not X but Y' repeated in the same chapter. Second time this chapter defines faith by denying a straw alternative.
- `/home/user/Livewell-/client/public/bible/notes/revelation/21.json` :: `words.3.note` (should)
  - Quote: The reason is not that worship has ended but that God's presence now fills everything;
  - Replacement: The reason is that God's presence now fills everything;
  - Tell: 'not that X but that Y'. No reader thought worship had ended; the denial is filler.
- `/home/user/Livewell-/client/public/bible/notes/revelation/21.json` :: `doctrines.1.note` (should)
  - Quote: The promise is not that suffering was unreal but that it will be ended and answered.
  - Replacement: Suffering was real, and the promise is that it will be ended and answered.
  - Tell: 'not X but Y' closer. Balanced closer; say both halves plainly.
- `/home/user/Livewell-/client/public/bible/notes/malachi/4.json` :: `doctrines.1.note` (should)
  - Quote: Hope here is not optimism but confidence in a promise.
  - Replacement: Hope here is confidence in a promise.
  - Tell: pillow-ready antithesis closer. Could be embroidered; restates the sentence before it as a slogan.
- `/home/user/Livewell-/client/public/bible/notes/1-thessalonians/2.json` :: `doctrines.0.note` (should)
  - Quote: God speaks through human messengers, and his word is active, not merely informative.
  - Replacement: God speaks through human messengers, and his word is active.
  - Tell: 'X, not merely Y' closer. Most antithesis-dense chapter note in the library (17 in 1,429 words).
- `/home/user/Livewell-/client/public/bible/notes/1-thessalonians/2.json` :: `doctrines.1.note` (should)
  - Quote: Leadership in the church is modeled on parents' care, gentle and demanding, not on the self-promotion of public speakers.
  - Replacement: Leadership in the church is modeled on parents' care, gentle and demanding, and Paul sets it against the self-promotion of public speakers.
  - Tell: 'X, not Y' closer. Same note already used 'not only the gospel but their own lives'; two antitheses in two sentences.
- `/home/user/Livewell-/client/public/bible/notes/isaiah/46.json` :: `doctrines.0.note` (should)
  - Quote: Providence here is personal care, not a distant system.
  - Replacement: Providence here means God carrying his people himself.
  - Tell: 'X, not Y' two-beat closer. Abstract foil ('a distant system') after a concrete quotation; the slogan weakens the verse.
- `/home/user/Livewell-/client/public/bible/notes/ezekiel/34.json` :: `doctrines.3.note` (should)
  - Quote: Oppression by the powerful is a covenant matter, not a private one.
  - Replacement: God treats oppression by the powerful as a breach of the covenant.
  - Tell: 'X, not Y' closer. Eighth antithesis in this chapter note; 'not only ... but' appears four times in it.

### P2. Hard-question answers open by grading the objection, then announce the reply

First sentences across the hard.a fields: 'The difficulty is real.' 13 times, 'The objection is strong.' 8, 'The objection is old and serious.' 7, 'The objection is plain.' 4, 'The objection is ancient and serious.' 3; 151 answers in 104 files open with 'The objection'. Second paragraphs open 'Responses begin with the...' 15 times, 'Responses take several forms.' 6, plus 'come from several directions', 'The responses are several', and so on. Fix rule: delete the stamp sentence; the paragraph already begins well at the next one.

- `/home/user/Livewell-/client/public/bible/notes/john/3.json` :: `hard.0.a` (should)
  - Quote: The objection is strong. Verse 16 speaks
  - Replacement: Verse 16 speaks
  - Tell: self-certifying verdict on the objection, used as a stamp. 'The objection is strong/old and serious/plain' or 'The difficulty is real' opens at least 35 hard-question answers; 151 open with 'The objection'. A reader meets the same sentence chapter after chapter.
- `/home/user/Livewell-/client/public/bible/notes/john/1.json` :: `hard.1.a` (should)
  - Quote: The objection is strong. In John 1 the Baptist
  - Replacement: In John 1 the Baptist
  - Tell: same stamp. Identical opener to John 3, 7, 9, 13, Matthew 17, Luke 9, 2 Samuel 7.
- `/home/user/Livewell-/client/public/bible/notes/isaiah/53.json` :: `hard.1.a` (should)
  - Quote: The moral objection is ancient and serious. The prophets themselves insist
  - Replacement: The prophets themselves insist
  - Tell: same stamp. Announces fairness instead of doing it; the paragraph that follows already proves the objection is serious.
- `/home/user/Livewell-/client/public/bible/notes/genesis/1.json` :: `hard.1.a` (should)
  - Quote: The case for dependence is serious. Both Genesis 1
  - Replacement: Both Genesis 1
  - Tell: same stamp. Paired with 'The responses are also serious.' two paragraphs later: a visible template.
- `/home/user/Livewell-/client/public/bible/notes/genesis/1.json` :: `hard.1.a` (should)
  - Quote: The responses are also serious. Alexander Heidel
  - Replacement: Alexander Heidel
  - Tell: symmetrical stamp. Mirror of the first paragraph's opener; perfect symmetry reads as generated.
- `/home/user/Livewell-/client/public/bible/notes/mark/1.json` :: `hard.0.a` (should)
  - Quote: Responses have taken several forms. James D. G. Dunn
  - Replacement: James D. G. Dunn
  - Tell: announced turn. 'Responses begin with / take several forms / come from several directions' opens the second paragraph of 50-plus answers.
- `/home/user/Livewell-/client/public/bible/notes/mark/1.json` :: `hard.1.a` (should)
  - Quote: Responses come from several directions. Many note
  - Replacement: Many note
  - Tell: announced turn. Same signpost as hard.0.a in the same chapter.

### P3. Rulebook leakage: the note describes its own fairness

The editorial rule (state the other side at full strength first) is written into the prose. BRIEF.md names this exact tell. Found by search: 'deserves to be stated in full / at full strength / fairly / carefully', 'deserves to be heard first', ', fairly,'. Fix rule: delete the announcement, keep the fair statement that follows.

- `/home/user/Livewell-/client/public/bible/notes/john/18.json` :: `hard.0.a` (must)
  - Quote: The objection deserves to be stated in full. John uses
  - Replacement: John uses
  - Tell: rulebook leakage (the method described in the prose). Near-verbatim the tell BRIEF.md lists ('it deserves to be stated the way he would state it').
- `/home/user/Livewell-/client/public/bible/notes/john/8.json` :: `hard.1.a` (must)
  - Quote: The objection deserves to be stated at full strength. John's Gospel uses
  - Replacement: John's Gospel uses
  - Tell: rulebook leakage. Same sentence as John 18 on the same topic; announces the steelman instead of making it.
- `/home/user/Livewell-/client/public/bible/notes/isaiah/53.json` :: `hard.0.a` (must)
  - Quote: The Ethiopian's question in Acts 8:34 is still the first question, and the strongest non-Christian answer deserves to be heard first.
  - Replacement: The Ethiopian's question in Acts 8:34 is still the first question.
  - Tell: rulebook leakage. States the editorial rule (strongest opposing view first) inside the note.
- `/home/user/Livewell-/client/public/bible/notes/revelation/13.json` :: `hard.a` (must)
  - Quote: The main readings deserve to be stated fairly. Many interpreters
  - Replacement: Many interpreters
  - Tell: rulebook leakage; 'fairly' as self-certification. The fairness is in the survey that follows; claiming it first is the tell.
- `/home/user/Livewell-/client/public/bible/notes/genesis/13.json` :: `hard.a` (must)
  - Quote: This question has divided Christians and has large consequences, so the main positions deserve to be stated carefully.
  - Replacement: This question has divided Christians and has large consequences.
  - Tell: rulebook leakage. Method talk. Keep the fact, drop the announcement.
- `/home/user/Livewell-/client/public/bible/notes/isaiah/53.json` :: `hard.0.a` (should)
  - Quote: Jewish readers also point out, fairly, that
  - Replacement: Jewish readers also point out that
  - Tell: 'fairly' as self-certifying adverb. The writer grading the point instead of reporting it.

### P4. Pastoral notes open with one stamp

Of 107 teach.pastoral notes, 20 open 'This chapter presses on', 13 'This chapter will press', 10 'This chapter speaks to', 3 'This chapter presses hard'. Fix rule: start with the people, not with 'This chapter'.

- `/home/user/Livewell-/client/public/bible/notes/mark/1.json` :: `teach.pastoral` (should)
  - Quote: This chapter presses on people who live with chronic illness, disability, or a condition that separates them from others, and on those who carry shame about their bodies.
  - Replacement: People who live with chronic illness, disability, or a condition that separates them from others will hear this chapter closely, and so will those who carry shame about their bodies.
  - Tell: section-opener stamp. 'This chapter presses on / will press / speaks to' opens 46 of 107 pastoral notes; in sequence through a Gospel it is audible by the third chapter.
- `/home/user/Livewell-/client/public/bible/notes/mark/15.json` :: `teach.pastoral` (should)
  - Quote: This chapter presses on people who feel abandoned by God, and on those who have suffered injustice or public shame.
  - Replacement: Some in the room feel abandoned by God, and some have suffered injustice or public shame.
  - Tell: section-opener stamp. Same opener as Mark 1, 10, 13.
- `/home/user/Livewell-/client/public/bible/notes/mark/10.json` :: `teach.pastoral` (should)
  - Quote: This chapter presses on the divorced, the remarried, children of divorce, and people in hard or dangerous marriages.
  - Replacement: The divorced, the remarried, children of divorce, and people in hard or dangerous marriages will all be listening.
  - Tell: section-opener stamp. Same opener again.

### P5. Pitfalls notes open with one stamp

Of 107 teach.pitfalls notes, 33 open 'Several misreadings recur.' and 10 'Several misreadings are common.' Fix rule: delete the counting sentence and fold 'common' into the first item.

- `/home/user/Livewell-/client/public/bible/notes/john/3.json` :: `teach.pitfalls` (should)
  - Quote: Several misreadings recur. The first turns
  - Replacement: The first common misreading turns
  - Tell: section-opener stamp. 'Several misreadings recur.' opens 33 pitfalls notes and 'Several misreadings are common.' 10 more, out of 107.
- `/home/user/Livewell-/client/public/bible/notes/mark/1.json` :: `teach.pitfalls` (should)
  - Quote: Several misreadings are common. The first treats
  - Replacement: The first common misreading treats
  - Tell: section-opener stamp. Same stamp.
- `/home/user/Livewell-/client/public/bible/notes/isaiah/53.json` :: `teach.pitfalls` (should)
  - Quote: Three misuses are common. The first reduces
  - Replacement: The first common misuse reduces
  - Tell: section-opener stamp plus announced count. Counting the points before making them is outline language.

### P6. Book introductions share two template sentences

'[Book] matters because' stands in the overview of 33 of 66 introductions. 'Two (common) misreadings are worth avoiding / are common' stands in the reading section of 19. Read two introductions back to back and the mold shows.

- `/home/user/Livewell-/client/public/bible/notes/mark/intro.json` :: `overview` (should)
  - Quote: Mark matters because most scholars judge it the earliest written Gospel, and because it refuses to separate who Jesus is from what he suffered.
  - Replacement: Most scholars judge Mark the earliest written Gospel, and it refuses to separate who Jesus is from what he suffered.
  - Tell: template sentence '[Book] matters because'. Opens the third overview paragraph in 33 of 66 book introductions.
- `/home/user/Livewell-/client/public/bible/notes/psalms/intro.json` :: `overview` (should)
  - Quote: The book matters because it teaches people how to pray.
  - Replacement: The book teaches people how to pray.
  - Tell: template sentence. Same slot, same words as the other introductions.
- `/home/user/Livewell-/client/public/bible/notes/isaiah/intro.json` :: `overview` (should)
  - Quote: Isaiah matters because it holds together what people tend to pull apart:
  - Replacement: Isaiah keeps in one book what people tend to pull apart:
  - Tell: template sentence plus stock 'holds together'. Two library stamps in one clause.
- `/home/user/Livewell-/client/public/bible/notes/john/intro.json` :: `overview` (should)
  - Quote: The book matters because it says most plainly what the other Gospels also claim:
  - Replacement: It says most plainly what the other Gospels also claim:
  - Tell: template sentence. Same slot again.
- `/home/user/Livewell-/client/public/bible/notes/psalms/intro.json` :: `reading` (should)
  - Quote: Two common misreadings are worth avoiding. The first is to treat
  - Replacement: One common misreading is to treat
  - Tell: template sentence. 'Two (common) misreadings are worth avoiding / are common' sits in the reading section of 19 introductions.
- `/home/user/Livewell-/client/public/bible/notes/romans/intro.json` :: `reading` (should)
  - Quote: Two common misreadings are worth avoiding. The first treats Romans
  - Replacement: One common misreading treats Romans
  - Tell: template sentence. Same stamp.
- `/home/user/Livewell-/client/public/bible/notes/isaiah/intro.json` :: `reading` (should)
  - Quote: Two common misreadings are worth avoiding: treating the book
  - Replacement: The book is commonly misread in two ways: treating the book
  - Tell: template sentence. Same stamp.

### P7. Superlative throat-clearing openers

'Few books ...', 'No Old Testament passage ... more', 'Few chapters in the Bible say more', 'No Gospel says more': at least a dozen section openers. Fix rule: delete and begin with the evidence.

- `/home/user/Livewell-/client/public/bible/notes/john/1.json` :: `christ` (should)
  - Quote: Few chapters in the Bible say more about who Jesus is. He existed before creation
  - Replacement: Jesus existed before creation
  - Tell: superlative throat-clearing opener. 'Few/No [book, chapter, passage] ... more' opens a section at least a dozen times (Isaiah 53, Psalm 22, Hebrews, Isaiah, John, Zechariah, James, 1 Thessalonians intros). It says nothing the paragraph does not.
- `/home/user/Livewell-/client/public/bible/notes/hebrews/intro.json` :: `overview` (should)
  - Quote: Few books so thoroughly connect the Old Testament to Christ, and few speak so directly to people who are tired of believing.
  - Replacement: It connects the Old Testament to Christ from start to finish, and it speaks to people who are tired of believing.
  - Tell: symmetrical 'few ... and few' closer. Balanced pair as a paragraph closer.
- `/home/user/Livewell-/client/public/bible/notes/romans/intro.json` :: `overview` (should)
  - Quote: Few books have shaped Christian history as much. Romans stands behind
  - Replacement: Romans stands behind
  - Tell: superlative opener. The next sentence carries the evidence; this one only announces it.

### P8. Reflection questions cut from three stems

4,250 reflection questions. 237 end on 'What would it mean / look like / change', 105 on 'How does that change', 177 on 'What does it ...'. Lower priority than the prose, but it is the part of the page a small group reads aloud.

- `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `questions.2` (consider)
  - Quote: What would it mean to receive God's care while your troubles are still in the room?
  - Replacement: Which of your troubles is still in the room, and can you receive God's care before it leaves?
  - Tell: question template 'What would it mean to'. 237 reflection questions end 'What would it mean/look like/change' and 105 'How does that change'; small-group curriculum boilerplate.
- `/home/user/Livewell-/client/public/bible/notes/romans/8.json` :: `questions.1` (consider)
  - Quote: What would change if you let yourself groan honestly before God?
  - Replacement: What have you kept from God because it sounded too much like complaining?
  - Tell: question template; 'honestly'. Template stem plus self-certifying 'honestly'.
- `/home/user/Livewell-/client/public/bible/notes/revelation/21.json` :: `questions.0` (consider)
  - Quote: How does that change the way you think about heaven and about this world?
  - Replacement: Where does that leave the way you've pictured heaven, and this world?
  - Tell: question template 'How does that change the way you'. Stock stem.

### P9. Aphoristic closers that restate the paragraph as a slogan

576 doctrine and theme notes end on a sentence of 11 words or fewer; a large share are maxims. Fix rule: when the closer says again what the sentence before it said, delete it.

- `/home/user/Livewell-/client/public/bible/notes/psalms/147.json` :: `doctrines.1.note` (must)
  - Quote: yet he stoops to heal the brokenhearted and sustain the humble. His power is never cold, and his care is never weak.
  - Replacement: yet he stoops to heal the brokenhearted and sustain the humble.
  - Tell: aphoristic closer, perfect symmetry. Greeting-card parallelism; restates the paragraph as a slogan.
- `/home/user/Livewell-/client/public/bible/notes/1-chronicles/26.json` :: `doctrines.1.note` (should)
  - Quote: now has a large family serving at the temple's doors. Faithfulness in one moment bears fruit across generations.
  - Replacement: now has a large family serving at the temple's doors.
  - Tell: moralizing aphorism as closer. The story already made the point; the maxim could run on any church's page.
- `/home/user/Livewell-/client/public/bible/notes/ephesians/intro.json` :: `themes.0.body` (should)
  - Quote: Yet grace is not idle: believers are God's workmanship, created in Christ Jesus to do good works that God prepared in advance (2:10). Grace both saves and sets to work.
  - Replacement: Yet believers are God's workmanship, created in Christ Jesus to do good works that God prepared in advance (2:10).
  - Tell: colon-reveal plus slogan restatement. The closer repeats the sentence before it in six words.
- `/home/user/Livewell-/client/public/bible/notes/deuteronomy/7.json` :: `doctrines.2.note` (should)
  - Quote: God loved them because he loved them. Grace has no cause outside God.
  - Replacement: God loved them because he loved them.
  - Tell: slogan closer after the real line. 'God loved them because he loved them' is the earned line; the abstraction after it deflates it.
- `/home/user/Livewell-/client/public/bible/notes/hebrews/11.json` :: `doctrines.3.note` (should)
  - Quote: Faith begins with understanding that the universe was formed at God's command (verse 3). The visible world rests on the word of an invisible God.
  - Replacement: Faith begins with understanding that the universe was formed at God's command (verse 3).
  - Tell: visible/invisible epigram. Chiastic flourish restating the verse.
- `/home/user/Livewell-/client/public/bible/notes/jonah/4.json` :: `hard.a` (must)
  - Quote: Both readings agree that God's compassion is the last word, and that the question it raises is not answered by argument but by the reader's own heart.
  - Replacement: On both readings the book closes with God's compassion and leaves the reader to answer his question.
  - Tell: stock 'the last word' plus 'not by X but by Y' plus sentimental abstraction. Three tells in one closing sentence; 'the reader's own heart' is devotional filler.
- `/home/user/Livewell-/client/public/bible/notes/genesis/1.json` :: `hard.1.a` (should)
  - Quote: On any view, borrowing a picture is not the same as borrowing a theology, and the theology of Genesis 1 has no ancient parallel.
  - Replacement: Borrowing a picture is not the same as borrowing a theology, and no neighboring text has one God creating without a battle, a rival, or a need for human labor.
  - Tell: epigram closer and overclaim ('On any view'). The scholars just cited as holding dependence would not grant 'on any view'; the balanced epigram is doing the persuading.

### P10. Stock phrases stamped through the library

'holds together / hold both together' about 320 times in 265 files (a minority are literal, as in 'held together by the word groan'); 'the last word / final word' 58 times; 'the heart of' 145; 'pulls back the curtain' twice in one introduction.

- `/home/user/Livewell-/client/public/bible/notes/revelation/intro.json` :: `tagline` (should)
  - Quote: A prophetic vision given to John on Patmos that pulls back the curtain on history, showing the slain and risen Lamb on the throne and the renewal of all things.
  - Replacement: A prophetic vision given to John on Patmos, showing the slain and risen Lamb on the throne behind history and the renewal of all things.
  - Tell: cliché image, repeated. 'Pulls back the curtain' appears again in keyChapters of the same file.
- `/home/user/Livewell-/client/public/bible/notes/revelation/intro.json` :: `keyChapters.3.why` (should)
  - Quote: pulls back the curtain on the spiritual conflict behind history
  - Replacement: shows the spiritual conflict behind history
  - Tell: cliché image, second use in one file. Stock phrase.
- `/home/user/Livewell-/client/public/bible/notes/revelation/intro.json` :: `themes.4.body` (should)
  - Quote: Revelation does not flinch from judgment on evil, but judgment is never the last word.
  - Replacement: Revelation does not flinch from judgment on evil, but it does not end there.
  - Tell: stock phrase 'the last word'. 'The last/final word' as a closer 58 times across the notes (Isaiah, Psalms, Esther, Nahum, Jonah...).
- `/home/user/Livewell-/client/public/bible/notes/isaiah/intro.json` :: `themes.2.body` (should)
  - Quote: God's judgment in Isaiah is real and severe, but it is not the last word.
  - Replacement: God's judgment in Isaiah is real and severe, and it is not where the book ends.
  - Tell: stock phrase 'the last word'. Same sentence as the Revelation introduction with the book name changed.
- `/home/user/Livewell-/client/public/bible/notes/romans/intro.json` :: `themes.4.body` (should)
  - Quote: that will reach the whole groaning creation. Romans holds present suffering and future glory together.
  - Replacement: that will reach the whole groaning creation.
  - Tell: stock 'holds ... together' closer. 'Holds together' 300-plus times; here also a slogan closer.
- `/home/user/Livewell-/client/public/bible/notes/romans/intro.json` :: `reading` (should)
  - Quote: The letter holds both together.
  - Replacement: Paul means both.
  - Tell: stock 'holds both together'. Third 'holds together' in this introduction.

### P12. Vague intensifiers standing in for a description

'striking / strikingly' 278 times; 'rich', 'powerful', 'deeply', 'profound', 'remarkable' about 1,300 together (some literal: rich man, powerful king).

- `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `christ` (should)
  - Quote: What it adds is striking: the shepherd who walks with his sheep through the valley of the shadow of death is the one who went into death for them.
  - Replacement: What it adds is that the shepherd who walks with his sheep through the valley of the shadow of death is the one who went into death for them.
  - Tell: colon-then-reveal with vague intensifier. Tells the reader to be struck before saying the thing. 'Striking(ly)' appears 278 times in the notes.
- `/home/user/Livewell-/client/public/bible/notes/psalms/intro.json` :: `setting` (consider)
  - Quote: shows striking parallels in style and imagery
  - Replacement: shows close parallels in style and imagery
  - Tell: vague intensifier. 'Striking' in place of a description.
- `/home/user/Livewell-/client/public/bible/notes/john/intro.json` :: `overview` (consider)
  - Quote: Its vocabulary is small (light, life, truth, love, world, believe, abide, glory) and its thought is inexhaustible.
  - Replacement: Its vocabulary is small (light, life, truth, love, world, believe, abide, glory), and no one has reached the bottom of its thought.
  - Tell: balanced pair ending on an abstraction. 'Inexhaustible' is praise without content.

### C. Crisis-facing passages without a path to help

Most of the dark chapters do carry one (Job 3, Psalm 88, 1 Kings 19, 1 Samuel 31, Jeremiah 20, Matthew 27, Lamentations intro, 2 Samuel 13). These do not.

- `/home/user/Livewell-/client/public/bible/notes/judges/16.json` :: `hard.a` (must)
  - Quote: The chapter holds together Samson's failure, God's patience, and God's victory over Dagon.
  - Replacement: The chapter shows Samson's failure, God's patience, and God's victory over Dagon. Anyone thinking of ending their own life should seek help from a trusted person, a pastor, or a crisis line; in the United States, call or text 988.
  - Tell: crisis-facing passage with no path to help; stock 'holds together'. The answer discusses whether Samson's death was suicide and ends with no word for a reader in danger, though Job 3, Psalm 88, 1 Samuel 31 and Lamentations carry one.
- `/home/user/Livewell-/client/public/bible/notes/numbers/11.json` :: `questions.1` (must)
  - Quote: What burden are you carrying alone that should be shared?
  - Replacement: What burden are you carrying alone that should be shared? If your own exhaustion has reached the point of wanting to die, tell someone you trust today; in the United States, call or text 988.
  - Tell: crisis-facing passage with no path to help. The question names Moses 'even asking to die' and invites the reader to identify with it, with no help line.

### Counted, not itemized

- The `christ` field opens 'The New Testament ...' in 141 chapters and 'The chapter shows / This chapter shows' in 72. The `story` field opens 'This is' 67 times and 'This chapter' 55.
- Hedge 'perhaps': 487, nearly all honest scholarly uncertainty; leave.
- Semicolons: 16,585. Many are list-sentences in historical and reception surveys, which is fair in a reference work, but the governing standard says semicolons rare. Not flagged sentence by sentence.
- The reception and interpretation sections are by design a roll of names and dates. Each name carries its idea, so I did not flag them as a scholar parade.

## The ten worst sentences

1. `/home/user/Livewell-/client/public/bible/notes/jonah/4.json` :: `hard.a`
   - Quote: Both readings agree that God's compassion is the last word, and that the question it raises is not answered by argument but by the reader's own heart.
   - Replacement: On both readings the book closes with God's compassion and leaves the reader to answer his question.
   - Why: stock 'the last word' plus 'not by X but by Y' plus sentimental abstraction. Three tells in one closing sentence; 'the reader's own heart' is devotional filler.
2. `/home/user/Livewell-/client/public/bible/notes/psalms/147.json` :: `doctrines.1.note`
   - Quote: yet he stoops to heal the brokenhearted and sustain the humble. His power is never cold, and his care is never weak.
   - Replacement: yet he stoops to heal the brokenhearted and sustain the humble.
   - Why: aphoristic closer, perfect symmetry. Greeting-card parallelism; restates the paragraph as a slogan.
3. `/home/user/Livewell-/client/public/bible/notes/isaiah/53.json` :: `hard.0.a`
   - Quote: The Ethiopian's question in Acts 8:34 is still the first question, and the strongest non-Christian answer deserves to be heard first.
   - Replacement: The Ethiopian's question in Acts 8:34 is still the first question.
   - Why: rulebook leakage. States the editorial rule (strongest opposing view first) inside the note.
4. `/home/user/Livewell-/client/public/bible/notes/john/8.json` :: `hard.1.a`
   - Quote: The objection deserves to be stated at full strength. John's Gospel uses
   - Replacement: John's Gospel uses
   - Why: rulebook leakage. Same sentence as John 18 on the same topic; announces the steelman instead of making it.
5. `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `christ`
   - Quote: What it adds is striking: the shepherd who walks with his sheep through the valley of the shadow of death is the one who went into death for them.
   - Replacement: What it adds is that the shepherd who walks with his sheep through the valley of the shadow of death is the one who went into death for them.
   - Why: colon-then-reveal with vague intensifier. Tells the reader to be struck before saying the thing. 'Striking(ly)' appears 278 times in the notes.
6. `/home/user/Livewell-/client/public/bible/notes/psalms/23.json` :: `doctrines.1.note`
   - Quote: The psalm shows trust not as the absence of danger but as confidence in God's presence within it. Its heart is the simple confession, You are with me.
   - Replacement: Trust in this psalm is confidence that God is present in the danger. Its central confession is You are with me.
   - Why: 'not X but Y' antithesis as default gait, plus stock 'its heart is'. One of 11 antitheses in a 1,255-word note. The denial ('absence of danger') answers nobody; a person would just say what the psalm does.
7. `/home/user/Livewell-/client/public/bible/notes/hebrews/intro.json` :: `overview`
   - Quote: Few books so thoroughly connect the Old Testament to Christ, and few speak so directly to people who are tired of believing.
   - Replacement: It connects the Old Testament to Christ from start to finish, and it speaks to people who are tired of believing.
   - Why: symmetrical 'few ... and few' closer. Balanced pair as a paragraph closer.
8. `/home/user/Livewell-/client/public/bible/notes/ephesians/intro.json` :: `themes.0.body`
   - Quote: Yet grace is not idle: believers are God's workmanship, created in Christ Jesus to do good works that God prepared in advance (2:10). Grace both saves and sets to work.
   - Replacement: Yet believers are God's workmanship, created in Christ Jesus to do good works that God prepared in advance (2:10).
   - Why: colon-reveal plus slogan restatement. The closer repeats the sentence before it in six words.
9. `/home/user/Livewell-/client/public/bible/notes/genesis/1.json` :: `hard.1.a`
   - Quote: On any view, borrowing a picture is not the same as borrowing a theology, and the theology of Genesis 1 has no ancient parallel.
   - Replacement: Borrowing a picture is not the same as borrowing a theology, and no neighboring text has one God creating without a battle, a rival, or a need for human labor.
   - Why: epigram closer and overclaim ('On any view'). The scholars just cited as holding dependence would not grant 'on any view'; the balanced epigram is doing the persuading.
10. `/home/user/Livewell-/client/public/bible/notes/revelation/intro.json` :: `tagline`
   - Quote: A prophetic vision given to John on Patmos that pulls back the curtain on history, showing the slain and risen Lamb on the throne and the renewal of all things.
   - Replacement: A prophetic vision given to John on Patmos, showing the slain and risen Lamb on the throne behind history and the renewal of all things.
   - Why: cliché image, repeated. 'Pulls back the curtain' appears again in keyChapters of the same file.

## Most machine-sounding, most his

Most machine-sounding: psalms/23.json; 1-thessalonians/2.json; proverbs/6.json; ezekiel/34.json; acts/5.json; psalms/149.json; hebrews/11.json; revelation/21.json; books by antithesis density: Philippians, 1 Thessalonians, 1 John, Ephesians, Titus.

Most his (calm, fair, specific, pastorally burdened): genesis/1.json; isaiah/53.json; mark/1.json; john/3.json (teach.pastoral); mark/intro.json; books with the lowest antithesis density: Nahum, Haggai, Luke, Esther, Mark, James, Matthew, John.

## Strengths to keep

- Fair before sharp: contested readings (the Servant's identity, the days of Genesis 1, baptism in John 3, the millennium) are given in the form their defenders would sign, and second-order questions are left open by name.
- The rebuilt chapters are specific to the date and the artifact: the Tell Fekheriye statue, the Giv'at ha-Mivtar heel bone, the Priene inscription, P137. Scholars are named with the idea they contributed, not as decoration.
- Pastoral notes in the rebuilt chapters are the most human writing in the library (Genesis 1 on infertility, Isaiah 53 on abuse and verse 7, John 3 on people who cannot name a conversion date).
- Clean mechanics: no em-dash or exclamation point outside quotations in 3.5 million words; contractions used lightly and naturally.
- Earned plain verdicts do exist and should be kept: 'It is what God is getting back.' (Genesis 1), 'The shock of the song is that they were right that God was involved and wrong about why.' (Isaiah 53), 'God loved them because he loved them.' (Deuteronomy 7).

## For James

- Your Substack profile and docs/VOICE-JAMES-BELL.md disagree: the profile asks for 2 to 4 sentence paragraphs, one screenshot line per piece, stacked landing lines and three numbered applications; the voice standard asks for developed paragraphs and one earned verdict, and puts stacked lines and slogans on the avoid list. I judged the notes by the voice standard and did not push anything toward the profile.
- The Study Bible notes quote the Berean Standard Bible (capitalized pronouns; 'the BSB' is named 574 times), while CLAUDE.md says ESV by default. I changed nothing. If that is a licensing choice, CLAUDE.md should say so; if not, it is a large job.
- There are two libraries here. 114 chapter notes (all of Matthew, Mark, Luke and John, plus parts of Genesis, Exodus, Leviticus, Deuteronomy, 2 Samuel, Psalms, Isaiah, Jeremiah and Daniel) were rebuilt deep and read like a careful person wrote them. The other 1,075 are shorter and carry most of the machine cadence. Decide whether to finish the rebuild or run a find-and-fix pass on the older tier.
- Nothing in these notes could only have come from you, and that may be right for a study Bible: no first person, no biography, no title or years in ministry anywhere. If you want your own voice in it, the pastoral notes and the reflection questions are the place, and they need what you would actually say to your people about that chapter. I can't invent that.
- Choose one sentence for readers in danger and use it everywhere a chapter touches a wish to die. The notes currently use four wordings, and Judges 16, Numbers 11 and Jonah 4 have none.
- I found no political criticism firing in one direction, no exclamation point or em-dash outside a quotation, and no Forbidden Language beyond 'landscapes' (literal, Song of Solomon 6) and 'authenticity' used of manuscripts.
- I read 17 files in full or in large part out of 1,255, and searched the rest by pattern. The counts are corpus-wide; the judgments about tone rest on the sample.

## For the agent applying fixes

Every finding is in `/home/user/voice-audit/library-bible-notes.json` with `file`, `key` (dotted path into the JSON, numbers are array indexes), `quote` (occurs exactly once in that field) and `replacement`. The notes are JSON on disk: match on the decoded string value, not on raw file bytes, because quotes and apostrophes may be escaped. For the stamp patterns (P2, P4, P5, P6) the listed items are examples; the same edit applies wherever the stamp sentence opens the field, and the counts above say how many to expect. Rebuild the notes index and rerun `validate-bible-notes` after any edit.
