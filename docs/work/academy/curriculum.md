# The LiveWell Academy: the curriculum

Built on 2026-11-27, at James's request: "I want someone to be able to go from not understanding the Bible to being able to fully understand the Bible. I want there to be multiple tracks. I want there to be certificates. Let people know that's unaccredited."

**10 programs, 33 tracks, 334 sessions, about 63 hours of guided study.** Every session opens a real page of the site (the Study Bible, the films, the doctrine studies, the history course, the Honest Answers and the rest) and ends with one question, one thing to do, one verse and a guide for a group. Every track has a leader's guide and prints whole.

This file was written from `client/public/academy/programs.json` and the tracks themselves on 2026-11-27; when a track changes, the track is the source. The brief for writing a track is `writing-brief.md` beside this file. The rules a track keeps are `scripts/lib/tracks.mjs`; the rules a program keeps are `scripts/validate-academy.mjs`.

## How it works

- **The road.** Eight programs in order, from the first questions to a whole life shaped by Scripture; two more (Faith for Teenagers, Faith at Home) stand beside it for particular readers. A reader begins at the first program that fits.
- **Progress.** Kept on the reader's device, in the tracks' own record (`livewell-progress-tracks-v1`). No account, nothing sent.
- **"What I've learned"** (`/academy/learned`) gathers every session done and the reader's own answers.
- **Certificates.** A finished track, and a finished program, each print a certificate with the name the reader types. Every certificate says on its face that it is unaccredited: a record of personal study, not academic credit, a degree, a diploma or a credential for ordination or ministry. Because there are no accounts, a certificate is not verified by the site; it records what the reader marked done on their own device.

## 1. Exploring Christianity (`/academy/exploring`)

*Not sure any of it is true? Start here.* You will be able to say what Christians actually claim about Jesus, weigh the evidence for and against, and give the strongest objections a fair hearing. 3 tracks, 32 sessions, about 6 hours.

### Weigh the case for yourself (`/tracks/skeptical`)

For: "I'm skeptical". Twelve short sessions for someone who doesn't believe and would rather look than be told: God, the texts, Jesus, the resurrection, suffering, science and the church's record, with the case against stated first.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Start with the questions | [For skeptics](/skeptics) | Which question would you most want answered before you could take Christianity seriously, and what would count as a good answer? |
| 2 | Is anyone there? | [Does God actually exist?](/answers/does-god-actually-exist) | Of the three lines of reasoning, which comes closest to persuading you, and at which step would you get off? |
| 3 | Can the text be trusted? | [Copies of copies: isn't it a telephone game?](/questions/text/copies-of-copies) | What standard of evidence do you ask of other ancient books, and are you asking the same of this one? |
| 4 | Who wrote the Gospels? | [The Gospels are anonymous. Weren't the names added later?](/questions/authors/the-gospels-are-anonymous) | Does it matter to you who wrote a Gospel, or only whether what it reports is true? |
| 5 | Did Jesus exist, and what did he claim? | [Did Jesus even exist?](/questions/jesus/did-jesus-exist) | If Jesus lived and was executed under Pilate, what do you make of what his first followers say he claimed? |
| 6 | Read the source | [Mark 1, passage by passage](/study/bible/mark/1#plain) | What surprised you in Mark 1, and what did you expect to find there that wasn't? |
| 7 | The claim everything rests on | [Did the resurrection actually happen?](/answers/did-the-resurrection-actually-happen) | Before you weighed the evidence, had you already decided whether a resurrection is possible, and where did that decision come from? |
| 8 | Argue it yourself | [Test the Case](/tools/test-the-case) | At which move did you push back hardest, and did the reply answer you or go around you? |
| 9 | If God is good | [If God is good, why is there so much suffering?](/answers/if-god-is-good-why-suffering) | Is your objection about suffering an argument, a wound, or both? |
| 10 | Science and the god of the gaps | [Hasn't science made God unnecessary?](/questions/science/has-science-made-god-unnecessary) | Is your objection to the god of the gaps, or to the God the creeds describe? |
| 11 | The church's record | [Weren't the Crusades a holy war of conquest?](/questions/morality/the-crusades) | How much of your objection to Christianity is to what Christians have done, and how much is to what Christ taught? |
| 12 | Deciding while unsure | [What if Christianity is wrong?](/answers/what-if-christianity-is-wrong) | Where do you stand now on the question you wrote down in the first session, and what would it take to move you? |

### Who was Jesus? The history and the claims (`/tracks/who-was-jesus`)

For: "I want to know who Jesus was". Ten short sessions on the man at the center of it all: what historians across belief agree about Jesus, his world, his teaching, his claims, his death, the resurrection and the question he put to his friends.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | What historians agree on | [Was Jesus real? What historians actually know](/writing/the-historical-jesus) | Which of the facts historians agree on surprises you most, and why that one? |
| 2 | His world: Israel under Rome | [Who were the Pharisees, Sadducees and Essenes?](/resources/context/pharisees-sadducees-essenes) | What would a man announcing a kingdom have sounded like to people living under Roman soldiers? |
| 3 | The kingdom he announced | [Mark 4, passage by passage](/study/bible/mark/4#plain) | If Jesus meant that God was beginning to set the world right, what would you expect to see, and what do the Gospels show instead? |
| 4 | The Sermon on the Mount | [Matthew 5, passage by passage](/study/bible/matthew/5#plain) | Which line of the Sermon on the Mount would be hardest for you to live, and why that one? |
| 5 | How he treated outsiders | [Luke 15, passage by passage](/study/bible/luke/15#plain) | In the story of the two sons, which one are you more like, and what does the father do with that son? |
| 6 | What he said about himself | [Mark 2, passage by passage](/study/bible/mark/2#plain) | If Jesus really said these things about himself, what are the possible explanations, and which seems most honest to you? |
| 7 | Why he was executed | [Why was crucifixion so shameful?](/resources/context/honor-status-and-the-cross) | Why would the first Christians build their message around the very death that should have ended it? |
| 8 | The resurrection and the alternatives | [Could the appearances be explained another way?](/questions/jesus/the-appearances-and-the-alternatives) | Which explanation of the Easter reports seems strongest to you, and what part of the evidence does it struggle with? |
| 9 | What the first Christians said about him | [The first Christians](/theology/history/the-apostolic-age) | Why would Jews who confessed one God begin to worship a man they had known? |
| 10 | The question he asked his friends | [Mark 8, passage by passage](/study/bible/mark/8#plain) | Who do you say Jesus was, and what would it take to change your answer? |

### The hardest questions, faced honestly (`/tracks/hard-questions`)

For: "I have objections I need answered". Ten sessions on the objections that keep thoughtful people away: other religions, hell, the conquest of Canaan, slavery, miracles, abuse in the church, God's hiddenness and wishful thinking, each stated at its strongest first.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Is Jesus the only way? | [Is it arrogant to say Jesus is the only way?](/questions/religions/is-it-arrogant-to-say-jesus-is-the-only-way) | Is there any view of the world's religions that doesn't tell someone they are wrong, and if not, how should such a claim be held? |
| 2 | Those who never heard | [What about those who never heard?](/questions/religions/those-who-never-heard) | Which answer to this question seems fairest to you, and what is its hardest difficulty? |
| 3 | Hell and judgment | [Hell and the justice of God](/questions/evil/hell-and-the-justice-of-god) | Does the idea of final judgment strike you as unjust, or does a world with no final judgment strike you as worse? |
| 4 | The conquest of Canaan | [The command to destroy the Canaanites](/questions/old-testament/the-command-to-destroy-the-canaanites) | If you were a Christian, which reading of these commands could you live with, and what would it cost you? |
| 5 | Slavery in the Bible | [What does the Bible actually say about slavery?](/resources/context/the-slavery-texts) | Is it enough that the Bible planted ideas that later undid slavery, or should it have said more? |
| 6 | Miracles and the modern mind | [Miracles and the laws of nature](/questions/science/miracles-and-the-laws-of-nature) | What evidence, if any, would persuade you that a miracle had happened? |
| 7 | Hypocrisy and abuse in the church | [Abuse and cover-up](/questions/morality/abuse-and-cover-up) | Should the failures of Christians count against Christianity, and if so, how much? |
| 8 | Why is God hidden? | [The hiddenness of God](/questions/evil/the-hiddenness-of-god) | If God exists, what kind of evidence would you expect him to give, and why that kind? |
| 9 | Is faith just wishful thinking? | [Is faith just wishful thinking?](/answers/is-faith-just-wishful-thinking) | Which do you want to be true, that God exists or that he doesn't, and how might that want be shaping what you think? |
| 10 | If you keep looking | [John 1, passage by passage](/study/bible/john/1#plain) | Which of your objections are reasons, which are wounds, and which are both? |

## 2. New to Faith (`/academy/new-to-faith`)

*Just started following Jesus, or coming back? Start here.* You will know the gospel well enough to explain it, have the habits of prayer and Bible reading in place, and know what to do when you fail or doubt. 3 tracks, 34 sessions, about 6 hours.

### New to faith, or coming back (`/tracks/new-to-this`)

For: "I'm new to this". Twelve short sessions for someone who has just come to faith, or is coming back to the start: who Jesus is, how to read and pray, the church, and what to do when you fail or doubt.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Who Jesus is | [Mark 1, passage by passage](/study/bible/mark/1#plain) | Which moment in Mark 1 would you most like to have seen, and what does it tell you about who Jesus is? |
| 2 | Why he died and rose | [Why did Jesus die?](/study/explorer/watch/why-jesus-died) | Which of the Bible's pictures of the cross is easiest for you to take in, and which is hardest? |
| 3 | Trusting him: grace and faith | [Ephesians 2, passage by passage](/study/bible/ephesians/2#plain) | Where do you still act as if God's love has to be earned? |
| 4 | How to read the Bible | [How to study the Bible](/study/how-to-study) | What has kept you from reading the Bible before now, and what would make a chapter a day possible? |
| 5 | How to pray | [Pray Psalm 23 slowly](/tools/pray-the-psalms?psalm=23) | Which is hardest for you: thanking, asking, saying sorry, or waiting? |
| 6 | The Holy Spirit | [The Holy Spirit in a believer](/study/explorer/watch/spirit-in-a-believer) | Which of the nine kinds of fruit would you most like to see grow in you this year? |
| 7 | The church, and why it matters | [Finding a Church](/wisdom/finding-a-church) | What do you hope a church would be for you, and what do you worry it might be? |
| 8 | Baptism and the Lord's Supper | [Baptism and the Lord's Supper](/study/explorer/watch/baptism-and-supper) | What questions do you have about baptism or the Lord's Supper that you have never asked anyone? |
| 9 | When you fail | [1 John 1, passage by passage](/study/bible/1-john/1#plain) | Is there something you have been hiding from God, or from someone you wronged, that it is time to bring into the light? |
| 10 | When you doubt | [What if Christianity is wrong?](/answers/what-if-christianity-is-wrong) | What is the question about the faith you would most like answered, and who could you ask? |
| 11 | Living it on a Tuesday | [What Does the Bible Say About What I Am Facing?](/tools/wisdom-finder) | What is the one ordinary situation this week where you most need to know how to follow Jesus? |
| 12 | What next | [Eight Weeks for a New Christian](/plans/new-believer) | Looking back over these sessions, what has changed in what you believe or in how you live? |

### The habits of a Christian life (`/tracks/first-habits`)

For: "I want to grow, not just start". Ten short sessions on the habits the church has kept longest: Scripture, prayer, Sunday, the Table, fasting, rest, giving, friendship and confession, and a simple rule of life to hold them.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Why habits, if it's all grace | [What Does It Mean to Be a Disciple of Jesus?](/life/discipleship-following-jesus) | Which habit of the Christian life do you most wish you had, and what has kept you from it so far? |
| 2 | A daily time with Scripture | [Eight Weeks With an Open Bible](/plans/reading-the-bible) | When and where in your day could ten minutes with Scripture actually fit, and what would have to move? |
| 3 | Prayer that grows | [Pray Psalm 103 slowly](/tools/pray-the-psalms?psalm=103) | Which line of the Lord's Prayer is hardest for you to pray honestly, and why? |
| 4 | Sunday and the gathered church | [Why Does Church Membership Still Matter?](/life/church-membership-and-commitment) | What makes it hardest for you to be with your church on a Sunday, and what could you change about it? |
| 5 | Baptism and the Table, lived | [What Does Baptism Mean, and Why Does It Matter?](/life/baptism-and-the-new-life) | If you've been baptized, what would it change on an ordinary Tuesday to remember it, and if you haven't, what is holding you back? |
| 6 | Fasting | [How to Fast](/how-tos/sf-how-to-fast) | What do you reach for when you're restless or low, and what might going without it for a day show you? |
| 7 | Sabbath and rest | [How to Keep a Sabbath](/how-tos/sf-how-to-keep-a-sabbath) | What would you have to stop doing, or stop believing about yourself, to rest for one whole day? |
| 8 | Giving and serving | [How to Start Giving Generously](/how-tos/wm-how-to-start-giving-generously) | If your bank statement and your calendar were read aloud, what would they say you love? |
| 9 | Friendship, confession, and your story | [How to Confess Sin and Walk in Repentance](/how-tos/sf-how-to-confess-sin-and-walk-in-repentance) | Who is one person you could be fully honest with, and what would it take to ask them? |
| 10 | A rule of life | [Build a rule of life](/tools/rule-of-life) | What is the smallest rule of life you could actually keep for the next three months? |

### Your questions, taken seriously (`/tracks/stepped-back`)

For: "I've stepped back from faith". Twelve short sessions for someone who has stepped back from faith or from church: the hurt, the questions, the silence of God, and the older faith underneath what you were handed, with no hurry.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | If a church hurt you | [The church hurt me](/help/church-hurt) | If you said what happened to you in a church in one plain sentence, without softening it to spare anyone, what would that sentence be? |
| 2 | If you're taking it apart | [I'm deconstructing my faith](/help/deconstructing) | Of the things you no longer believe, which belong to the faith itself, and which belong to the package it came in? |
| 3 | Done with church, not with Jesus? | [Done with church but not Jesus?](/answers/done-with-church-but-not-jesus) | What do you miss about belonging to a church, and what would you never want back? |
| 4 | Angry at God | [Is it okay to be angry at God?](/answers/is-it-okay-to-be-angry-at-god) | If you told God what you are angry about, in your own words and without softening it, what would you say? |
| 5 | A prayer for when you can't pray | [Pray Psalm 42 slowly](/tools/pray-the-psalms?psalm=42) | Which line of Psalm 42 could you say honestly today, and which can't you say yet? |
| 6 | When God seems silent | [Feeling Far From God](/wisdom/feeling-far-from-god) | When did God last seem near to you, and what has changed since then: God, you, or what was happening around you? |
| 7 | Thrown out, and found | [John 9, passage by passage](/study/bible/john/9#plain) | What is the one thing you know for yourself about Jesus, even if you are unsure of everything else? |
| 8 | Do one thing he said | [Matthew 5, passage by passage](/study/bible/matthew/5#plain) | Which of Jesus' sayings in Matthew 5 is hardest for you to hear, and which do you most wish the church had lived? |
| 9 | The faith before your church | [The Apostles' Creed](/resources/creeds/apostles-creed) | Which lines of the creed can you say honestly today, which are you unsure of, and which can't you say? |
| 10 | The longer story | [Church history](/theology/history) | What would change for you if the church you knew turned out to be one chapter in a much longer story? |
| 11 | The question you couldn't ask | [The case for the faith](/questions) | What is the question you were never allowed to ask, and what would count as an honest answer to it? |
| 12 | What comes after | [What happens after deconstruction?](/answers/what-happens-after-deconstruction) | Looking back over these sessions, what are you taking apart, and what, if anything, are you digging toward? |

## 3. The Bible's Big Story (`/academy/big-story`)

*Never read the Bible, or only in pieces? Start here.* You will be able to tell the whole Bible as one story, from creation to new creation, and place any book or passage inside it. 3 tracks, 31 sessions, about 5 hours.

### The whole Bible as one story (`/tracks/big-story`)

For: "I've never read the Bible". Eleven short sessions for someone who has never read the Bible, or only in pieces: the whole story from creation to new creation, one act at a time, so any book or passage has a place to stand.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Creation: a good world, and the image of God | [Creation, the first act of the story](/study/bible/story/creation) | If you had to say in one sentence what Genesis 1 claims about human beings, what would you say? |
| 2 | The fall: how the world came apart | [The fall, the second act of the story](/study/bible/story/fall) | Where in Genesis 3 to 11 did you notice God being kind to people who had just turned from him? |
| 3 | Abraham: a promise to one family for every family | [Abraham, the third act of the story](/study/bible/story/abraham) | Why do you think God chose to bless the whole world by starting with one family? |
| 4 | The exodus: rescued, then given a law | [The exodus, the fourth act of the story](/study/bible/story/exodus) | What changes when obedience comes after rescue instead of before it? |
| 5 | The land and the judges: a people coming apart | [The land and the judges, the fifth act of the story](/study/bible/story/land-judges) | Where do you see the refrain of Judges, everyone doing what is right in his own eyes, in the world you live in? |
| 6 | The kingdom: David's throne, and a kingdom split in two | [The kingdom, the sixth act of the story](/study/bible/story/kingdom) | Why do you think the Bible measures every king against David, a man whose own failures it tells so plainly? |
| 7 | The prophets and the exile: hope from the ruins | [The prophets and the exile, the seventh act of the story](/study/bible/story/prophets-exile) | Why do you think the Bible's most hopeful promises come at its darkest moment? |
| 8 | The return and the long wait | [The return and the silence, the eighth act of the story](/study/bible/story/return-silence) | What does it feel like to get back something you lost, only to find it smaller than you remembered? |
| 9 | Christ: the promises kept in Jesus | [Christ, the ninth act of the story](/study/bible/story/christ) | Which thread of the story so far, the garden, the promise to Abraham, the exodus, the king or the exile, did you most see picked up in Jesus? |
| 10 | The church and the Spirit | [The church and the Spirit, the tenth act of the story](/study/bible/story/church-spirit) | What do you think it would have cost a first-century Jew to welcome Gentiles to the same table? |
| 11 | New creation: the story's end, and where it begins again | [New creation, the last act of the story](/study/bible/story/new-creation) | Having walked the whole story, where do you think you stand in it now? |

### The Old Testament, section by section (`/tracks/old-testament`)

For: "I want to understand the Old Testament". Ten short sessions on the Old Testament one section at a time: how it is arranged, the Law, the histories, wisdom, the Psalms, the prophets, and how Jesus read the whole.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | How the Old Testament is arranged | [What the Bible Is](/study/bible/guides/what-is-the-bible) | Why do you think it matters whether the Old Testament ends on the road home or with a promise still to be kept? |
| 2 | The Torah: instruction inside a story | [Reading the Law](/study/bible/guides/reading-law) | What would change in the way you hear a command if you heard it first as instruction from someone who had already rescued you? |
| 3 | Genesis to Deuteronomy as one movement | [Open Deuteronomy in the Study Bible](/study/bible/deuteronomy) | Why do you think the five books of Moses end before the people enter the land? |
| 4 | The histories: Joshua to Kings | [Reading the Stories](/study/bible/guides/reading-narrative) | What changes when you read Israel's history as told by prophets rather than by court historians? |
| 5 | Chronicles and the return: Ezra, Nehemiah and Esther | [Nehemiah: rebuilding the walls, and a people](/study/explorer/watch/book-nehemiah) | Why do you think the Bible keeps two tellings of the same history, Kings and Chronicles, instead of one? |
| 6 | The wisdom books: Job, Proverbs and Ecclesiastes | [Reading the Wisdom Books](/study/bible/guides/reading-wisdom) | Where has life taught you that a proverb is true in general but not in every case? |
| 7 | The Psalms and the Song of Songs | [Reading Hebrew Poetry](/study/bible/guides/reading-poetry) | Which kind of psalm do you most need words for right now: praise, thanks or lament? |
| 8 | The major prophets: Isaiah, Jeremiah, Ezekiel and Daniel | [Reading the Prophets](/study/bible/guides/reading-prophets) | What would a prophet who spoke mostly to his own time say to yours? |
| 9 | The Twelve: the minor prophets | [Amos: let justice roll on like a river](/study/explorer/watch/book-amos) | Jonah was angry that God showed mercy to his enemies. Whose mercy would be hardest for you to accept? |
| 10 | Where it points: how Jesus read the Old Testament | [Luke 24, passage by passage](/study/bible/luke/24#plain) | Which thread in the Old Testament do you most want to follow into the New, and why? |

### The New Testament, section by section (`/tracks/new-testament`)

For: "I want to understand the New Testament". Ten short sessions on the New Testament one section at a time: the world it was born into, the four Gospels, Acts, the letters, Revelation, and how the twenty-seven books were recognized.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | The world between the testaments | [Between the Testaments](/study/bible/guides/between-the-testaments) | Which part of the world Jesus was born into do you think most shaped how people heard him? |
| 2 | The four Gospels, and why four | [Reading the Gospels](/study/bible/guides/reading-gospels) | Would you trust four accounts that differ in details more or less than one account that never varies, and why? |
| 3 | Matthew, Mark, Luke and John | [Mark: the story at a run](/study/explorer/watch/book-mark) | Which of the four portraits of Jesus do you find yourself most drawn to, and which do you most need? |
| 4 | Acts: from Jerusalem to Rome | [Paul's travels in the Bible Explorer](/study/explorer/pauls-travels) | What do you think it cost the first Jewish believers to welcome Gentiles as equals? |
| 5 | Paul's letters, and how a letter works | [Reading the Letters](/study/bible/guides/reading-letters) | What changes when you read a letter whole instead of a verse at a time? |
| 6 | Romans and Galatians | [Romans: the good news, set out](/study/explorer/watch/book-romans) | What do people today try to add to Christ as the price of belonging? |
| 7 | The prison letters and the pastoral letters | [Philippians: joy in chains](/study/explorer/watch/book-philippians) | How can someone write about joy from a prison cell, and what would it take for you to do the same? |
| 8 | Hebrews and the general letters | [Hebrews: hold on to Jesus](/study/explorer/watch/book-hebrews) | Where are you more like the tired believers Hebrews was written for, or the comfortable ones James was written for? |
| 9 | Revelation, read as its first readers heard it | [Reading Revelation and Daniel](/study/bible/guides/reading-apocalyptic) | What would Revelation have meant to a believer in a city that demanded worship of the emperor? |
| 10 | The canon: how the twenty-seven were recognized | [How the Books Were Chosen](/study/bible/guides/canon) | Does it matter to you whether the church created the canon or recognized it, and why? |

## 4. How to Study the Bible (`/academy/study`)

*Want to read a passage for yourself and understand it?* You will be able to study any passage on your own: observe it, read it as the kind of writing it is, place it in its world, follow its words, and apply it honestly. 4 tracks, 31 sessions, about 6 hours.

### How to study a passage: seven steps (`/tracks/study-method`)

For: "I want to study the Bible myself". Eight short sessions that teach one way to study any passage for yourself: read it whole, notice, find its setting, follow its words and its cross-references, face the hard question, and answer what it asks.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Why a method matters | [How to study the Bible](/study/how-to-study) | When you read the Bible, are you more often looking for something to confirm what you think, or something to correct it? |
| 2 | Step one: read it whole | [Study Ruth 1, step by step](/study/bible/ruth/1?study=walk) | What did you notice reading Ruth 1 straight through that you hadn't noticed when you knew only its famous verse? |
| 3 | Step two: notice | [Study Mark 4, step by step](/study/bible/mark/4?study=walk) | Which of the four questions was hardest to answer from Mark 4, and why do you think it was? |
| 4 | Step three: its setting | [Study Jeremiah 29, step by step](/study/bible/jeremiah/29?study=walk) | Is there a verse you have leaned on that you have never read in its setting, and are you willing to look? |
| 5 | Step four: its key words | [Study Psalm 136, step by step](/study/bible/psalms/136?study=walk) | After reading Psalm 136, how would you explain chesed to a friend without using a dictionary? |
| 6 | Step five: where else Scripture says this | [Study Genesis 15, step by step](/study/bible/genesis/15?study=walk) | What does Genesis 15:6 mean when you read it in Genesis alone, and what does it gain when you hear Paul and James read it too? |
| 7 | Steps six and seven: the hard question and response | [Study Jonah 4, step by step](/study/bible/jonah/4?study=walk) | Who is your Nineveh, the people you would rather God did not spare, and how would you answer the question God asks Jonah? |
| 8 | A whole passage, on your own | [Study Luke 10, step by step](/study/bible/luke/10?study=walk) | Where in your own life are you most tempted to ask the lawyer's question, wanting the circle of your duty drawn small? |

### Reading each kind of book in the Bible (`/tracks/reading-by-genre`)

For: "I want to read each part rightly". Nine short sessions on how each kind of writing in the Bible asks to be read: law, story, poetry, wisdom, prophecy, the Gospels, the letters and the visions of Daniel and Revelation.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Why the kind of writing matters | [Guides to reading the Bible](/study/bible/guides) | Which part of the Bible have you been reading as if it were a different kind of writing than it is? |
| 2 | Reading the law | [Reading the Law](/study/bible/guides/reading-law) | Does it change how you hear God's commands to know that the rescue came before them? |
| 3 | Reading the stories | [Reading the Stories](/study/bible/guides/reading-narrative) | In the story of David and Goliath, where do you honestly find yourself standing? |
| 4 | Reading the poetry | [Reading Hebrew Poetry](/study/bible/guides/reading-poetry) | Which line of Psalm 19 did you understand differently once you read it as two halves of one thought? |
| 5 | Reading the wisdom books | [Reading the Wisdom Books](/study/bible/guides/reading-wisdom) | Is there a proverb you have treated as a promise, and what happens when you read it as wisdom instead? |
| 6 | Reading the prophets | [Reading the Prophets](/study/bible/guides/reading-prophets) | If Amos came to your town and your church, what do you think he would say first? |
| 7 | Reading the Gospels | [Reading the Gospels](/study/bible/guides/reading-gospels) | What did you see in Mark by reading it whole that you had missed reading the Gospels a story at a time? |
| 8 | Reading the letters | [Reading the Letters](/study/bible/guides/reading-letters) | What can you work out about the other side of the conversation from reading Philemon alone? |
| 9 | Reading Daniel and Revelation | [Reading Revelation and Daniel](/study/bible/guides/reading-apocalyptic) | When you have read Revelation, have you been looking for a timeline, an enemy, or the Lamb on the throne? |

### The world the Bible was written in (`/tracks/bible-world`)

For: "I want to understand the Bible's world". Eight short sessions on the world behind the Bible: its land and its timeline, the empires around Israel, daily life, the temple and its feasts, the centuries between the testaments, and the cities of Paul.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | The land | [The Bible atlas](/study/atlas) | How does knowing the land depended on rain change the way you hear the Bible speak of God as the giver of good things? |
| 2 | The timeline | [The Bible's timeline](/study/timeline) | Which book of the Bible would make more sense to you if you knew which years it was written into? |
| 3 | The empires around Israel | [The Empires Around Israel](/study/bible/guides/empires) | Which empire in the Bible's story is most like the world you live in, and what might the prophets say to it? |
| 4 | Daily life, family and household | [What Did Hospitality Mean in the Ancient World?](/resources/context/hospitality-and-the-stranger) | What would change in how you read Paul's letters if you heard most of his you as all of you together? |
| 5 | Temple, sacrifice and festivals | [Offerings, Priests, and Purity](/study/bible/guides/offerings-and-purity) | Which of Israel's feasts would you most like to have kept, and what do you think it taught the people who kept it? |
| 6 | Between the testaments | [Between the Testaments](/study/bible/guides/between-the-testaments) | What in the Gospels makes more sense once you know what happened in the centuries before them? |
| 7 | Jewish groups in Jesus' day | [Pharisees, Sadducees, and Others](/study/bible/guides/jewish-groups) | Which of the groups in Jesus' day are you most like, and what would Jesus say to you if he met you there? |
| 8 | The cities of Paul's letters | [Paul's travels](/study/explorer/pauls-travels) | Who are the patrons, the titles and the rankings of your own city, and how does the gospel unsettle them? |

### Word studies, cross-references and the study tools (`/tracks/study-tools`)

For: "I want to dig deeper into a passage". Six short sessions on the tools of careful study: what a translation is, a word study done well, cross-references, the key words and themes of the whole Bible, the hard passages, and a habit for life.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | What a translation is, and why they differ | [Why Translations Differ](/study/bible/guides/translations) | Which translation do you usually read, and do you know which way it leans and why? |
| 2 | A word study done right | [Study a Bible word](/study/word) | Have you ever heard a sermon point built on a single word, and how would you now check whether it holds? |
| 3 | Cross-references: Scripture interpreting Scripture | [Follow a verse: cross-references](/study/cross-references) | Which cross-reference, followed to its own chapter, turned out to say something different from what you expected? |
| 4 | Key words and themes across the whole Bible | [Key words of the Bible](/study/words) | Which theme have you followed through the Bible, and where did a book surprise you by saying something you didn't expect about it? |
| 5 | Sitting with a hard passage | [Hard passages](/study/hard-passages) | Which passage in the Bible troubles you most, and have you ever sat with it long enough to read it in its own chapter? |
| 6 | A habit of study for life | [Plans for reading the Bible](/study/plans) | What would a realistic rhythm of study look like in your actual week, and what usually gets in its way? |

## 5. Deep in One Book (`/academy/books`)

*Ready to know one book of the Bible well?* You will have read five books of the Bible closely, chapter by chapter, from the first story of Genesis to Paul's letter to the Romans. 5 tracks, 66 sessions, about 17 hours.

### Deep in one: the Gospel of Mark (`/tracks/mark`)

For: "I want to know one book well". Sixteen sessions, one for each chapter of Mark, the shortest Gospel: read the chapter and its notes, and follow the book's own shape from the river to the cross and the empty tomb.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | The beginning of the gospel | [Mark 1, passage by passage](/study/bible/mark/1#plain) | What does Mark want you to know about Jesus before anyone in the story knows it, and why might he tell you first? |
| 2 | Authority to forgive | [Mark 2, passage by passage](/study/bible/mark/2#plain) | The scribes asked who can forgive sins but God alone. How would you answer them? |
| 3 | A new family | [Mark 3, passage by passage](/study/bible/mark/3#plain) | Where do you stand in this chapter: in the circle around Jesus, outside asking him to come out, or watching from a distance? |
| 4 | Seeds and a storm | [Mark 4, passage by passage](/study/bible/mark/4#plain) | Which kind of ground do you recognize in yourself this week, and what is crowding the seed? |
| 5 | Three people past hope | [Mark 5, passage by passage](/study/bible/mark/5#plain) | Which of the three people in this chapter is closest to where you are, and what would you ask Jesus for? |
| 6 | Bread in the wilderness | [Mark 6, passage by passage](/study/bible/mark/6#plain) | What small thing do you have that Jesus might ask you to bring, the way the disciples brought five loaves? |
| 7 | What makes a person unclean | [Mark 7, passage by passage](/study/bible/mark/7#plain) | Where do you guard the outside of your life while leaving the heart alone? |
| 8 | You are the Christ | [Mark 8, passage by passage](/study/bible/mark/8#plain) | Jesus asks his friends who they say he is. What is your answer today, and does your life agree with it? |
| 9 | A father's honest prayer | [Mark 9, passage by passage](/study/bible/mark/9#plain) | Can you pray the father's prayer honestly, and which half of it is harder for you to say? |
| 10 | A ransom for many | [Mark 10, passage by passage](/study/bible/mark/10#plain) | James and John asked for glory and Bartimaeus asked for sight. If Jesus asked what you want him to do for you, what would you say? |
| 11 | The king arrives | [Mark 11, passage by passage](/study/bible/mark/11#plain) | What kind of king do you want Jesus to be, and would you still welcome him if he came humble instead of strong? |
| 12 | Caesar's coin | [Mark 12, passage by passage](/study/bible/mark/12#plain) | Has a political side taken a place in your heart that belongs to God, and how would you know if it had? |
| 13 | Watch | [Mark 13, passage by passage](/study/bible/mark/13#plain) | When you hear talk about the end of the world, what do you feel first, and what does this chapter ask of you instead? |
| 14 | The table and the garden | [Mark 14, passage by passage](/study/bible/mark/14#plain) | Each disciple asked whether it might be him. When you read of Judas and Peter, do you ask how they could, or whether you could? |
| 15 | The cross | [Mark 15, passage by passage](/study/bible/mark/15#plain) | The centurion saw how Jesus died and called him the Son of God. What do you see when you look at the cross? |
| 16 | The empty tomb, and Mark's ending | [Mark 16, passage by passage](/study/bible/mark/16#plain) | The women were afraid and said nothing. What keeps you quiet about what you have seen in this book? |

### Deep in one: the Gospel of John (`/tracks/john`)

For: "I want to know John's Gospel well". Twelve sessions through all twenty-one chapters of John: the Word made flesh, the signs, the long evening before the cross, and the risen Lord at a fire by the sea.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | The Word became flesh | [John 1, passage by passage](/study/bible/john/1#plain) | John says no one has ever seen God, but the Son has made him known. What do you expect to learn about God by watching Jesus? |
| 2 | New wine, a new temple, a new birth | [John 3, passage by passage](/study/bible/john/3#plain) | Nicodemus came at night with a respectful compliment, and Jesus answered with a demand he could not meet himself. Why do you think Jesus answered that way? |
| 3 | Living water, and a man by a pool | [John 4, passage by passage](/study/bible/john/4#plain) | The woman tried to turn the conversation to an old argument about where to worship. When does talking about religion become a way of keeping God at a distance? |
| 4 | The bread of life | [John 6, passage by passage](/study/bible/john/6#plain) | Many disciples left when the teaching became hard, and Peter stayed because there was nowhere else to go. Is that a weak reason to stay, or a strong one? |
| 5 | The light of the world | [John 8, passage by passage](/study/bible/john/8#plain) | The crowd split into those who called him good, a deceiver, or something more. Which of those answers have you given, and which do you give now? |
| 6 | The man born blind and the good shepherd | [John 9, passage by passage](/study/bible/john/9#plain) | The disciples looked at a suffering man and asked whose fault it was. Whose suffering do you explain to yourself so that you don't have to stop? |
| 7 | Lazarus, and the hour comes | [John 11, passage by passage](/study/bible/john/11#plain) | Jesus wept at a tomb he was about to open. What does that tell you about how God regards your grief? |
| 8 | Feet washed, and the way to the Father | [John 13, passage by passage](/study/bible/john/13#plain) | Peter would rather do anything for Jesus than let Jesus wash his feet. Why is it so hard to be served? |
| 9 | The vine, the Spirit and the prayer | [John 15, passage by passage](/study/bible/john/15#plain) | Jesus prayed for people who would believe through the disciples' word, which means he prayed for you. What do you make of that? |
| 10 | The arrest, the trial and the cross | [John 19, passage by passage](/study/bible/john/19#plain) | Pilate asked what truth is and did not wait for the answer. What questions do you ask in a way that keeps you from hearing the answer? |
| 11 | The empty tomb, and Thomas | [John 20, passage by passage](/study/bible/john/20#plain) | Jesus did not scold Thomas for wanting evidence, and he still called blessed those who believe without seeing. What would it take for you to say my Lord and my God? |
| 12 | Breakfast by the sea, and Peter restored | [John 21, passage by passage](/study/bible/john/21#plain) | Jesus restored Peter at a fire like the one where he failed. What failure of yours do you think Jesus means to meet you at? |

### Deep in one: Genesis (`/tracks/genesis`)

For: "I want to know Genesis well". Twelve sessions through the book of beginnings, section by section: creation, the fall, the flood, Abraham, Jacob and Joseph, read with the Study Bible's notes.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | In the beginning | [Genesis 1, passage by passage](/study/bible/genesis/1#plain) | Genesis 1 tells you that every person you meet bears the image of God. Who in your week is hardest for you to see that way? |
| 2 | The fall | [Genesis 3, passage by passage](/study/bible/genesis/3#plain) | Where do you recognise in yourself the instinct to hide, from God or from the people closest to you? |
| 3 | Cain, the flood, and a rainbow | [Genesis 6, passage by passage](/study/bible/genesis/6#plain) | God's verdict on the human heart is the same before the flood and after it. Why do you think the second time it leads to a promise? |
| 4 | Babel and the call of Abram | [Genesis 12, passage by passage](/study/bible/genesis/12#plain) | Babel tried to make a name for itself and Abram was given one. Where are you trying to make a name for yourself? |
| 5 | Covenant under the stars | [Genesis 15, passage by passage](/study/bible/genesis/15#plain) | Abram was counted righteous for trusting a promise he could not yet see kept. What promise of God do you find hardest to trust? |
| 6 | Hagar, Ishmael and Sodom | [Genesis 16, passage by passage](/study/bible/genesis/16#plain) | Hagar was seen by God when no one else in the household saw her. Who in your world is going unseen? |
| 7 | The binding of Isaac | [Genesis 22, the guided study](/study/bible/genesis/22?study=walk) | What do you find hardest in this chapter, and what would you want to ask Abraham on the way down the mountain? |
| 8 | Jacob's deceit, and the ladder | [Genesis 27, passage by passage](/study/bible/genesis/27#plain) | God met Jacob on the night he was running from what he had done. What would it mean for God to meet you at your worst rather than your best? |
| 9 | Jacob wrestles | [Genesis 32, passage by passage](/study/bible/genesis/32#plain) | Jacob had to say his own name before he received a new one. What would you have to admit about yourself before God? |
| 10 | Joseph sold, and in Egypt | [Genesis 37, passage by passage](/study/bible/genesis/37#plain) | Genesis says the LORD was with Joseph in a prison. Where have you been tempted to decide God was absent? |
| 11 | Joseph and his brothers | [Genesis 45, passage by passage](/study/bible/genesis/45#plain) | Joseph named the wrong before he forgave it. Is there a wrong done to you that you have not yet been able to name honestly? |
| 12 | You meant it for evil | [Genesis 50, passage by passage](/study/bible/genesis/50#plain) | Joseph could say God meant it for good only years later. What in your life are you still too close to see? |

### Deep in one: the Psalms (`/tracks/psalms`)

For: "I want to pray the Psalms". Ten sessions in the Bible's own prayer book: how its five books are arranged, how its poetry works, and how to pray its praise, lament, confession and curses with Christ.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Psalm 1 and the two ways | [Psalm 1, passage by passage](/study/bible/psalms/1#plain) | Psalm 1 says the person who flourishes is the one whose roots go down into God's word. Where are your roots going down now? |
| 2 | Psalm 2 and the king | [Psalm 2, passage by passage](/study/bible/psalms/2#plain) | Psalm 2 says the nations rage and God is not anxious about it. What would change in you if you believed that this week? |
| 3 | Psalm 8 and how Hebrew poetry works | [Psalm 8, passage by passage](/study/bible/psalms/8#plain) | Psalm 8 holds together how small you are and how much honour God gives you. Which of the two do you find harder to believe? |
| 4 | Psalm 13 and lament | [Psalm 13, passage by passage](/study/bible/psalms/13#plain) | If you began a prayer to God with How long, what would come after those two words? |
| 5 | Psalm 23 | [Psalm 23, passage by passage](/study/bible/psalms/23#plain) | Psalm 23 begins speaking to God only in the valley. Where is your valley now, and what would it mean to speak to him there? |
| 6 | Psalm 51 and confession | [Psalm 51, passage by passage](/study/bible/psalms/51#plain) | Psalm 51 asks for a clean heart, not just a clean record. What is the difference in your own life? |
| 7 | Psalms 42 and 43, the downcast soul | [Psalm 42, passage by passage](/study/bible/psalms/42#plain) | The psalmist speaks to his own soul instead of only listening to it. What would you say to yours this week? |
| 8 | A hard psalm: Psalm 137 | [Psalm 137, passage by passage](/study/bible/psalms/137#plain) | Psalm 137 brings rage to God instead of acting on it. What anger are you carrying that you have never said to him? |
| 9 | Psalm 90 and our days | [Psalm 90, passage by passage](/study/bible/psalms/90#plain) | What would change in how you spend this week if you numbered your days the way Psalm 90 asks? |
| 10 | Psalms 145 to 150, the last praise | [Psalm 145, passage by passage](/study/bible/psalms/145#plain) | The Psalter ends in praise after a hundred and fifty psalms of every kind. What would it take for your praise to hold all you have lived? |

### Deep in one: Paul's letter to the Romans (`/tracks/romans`)

For: "I want to understand Romans". Sixteen sessions, one for each chapter of Romans: Paul's longest argument, from the guilt of the whole world to grace, the Spirit, Israel's future and a church of named friends.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Not ashamed of the gospel | [Romans 1, passage by passage](/study/bible/romans/1#plain) | Paul says the problem behind every other wrong is worshipping something created in place of the Creator. What do you trust in the place where God belongs? |
| 2 | The judge who is judged | [Romans 2, passage by passage](/study/bible/romans/2#plain) | Paul says God's kindness is meant to lead you to repentance. Where have you treated God's patience as permission instead? |
| 3 | But now: righteousness from God | [Romans 3, passage by passage](/study/bible/romans/3#plain) | Paul says all have sinned and are justified freely. Which half of that sentence is harder for you to believe about yourself? |
| 4 | Abraham believed God | [Romans 4, passage by passage](/study/bible/romans/4#plain) | Abraham faced the facts of his body and still trusted God's promise. What fact in your life makes trusting God hardest? |
| 5 | Peace with God, and two men | [Romans 5, passage by passage](/study/bible/romans/5#plain) | Paul says Christ died for us while we were still sinners. Do you believe God loves you as you are now, or as you hope to become? |
| 6 | Dead to sin, alive to God | [Romans 6, passage by passage](/study/bible/romans/6#plain) | Paul says everyone serves some master. What would the people closest to you say you serve? |
| 7 | The law, and a divided self | [Romans 7, passage by passage](/study/bible/romans/7#plain) | Whichever reading of the ‘I’ you hold, where do you recognise yourself in verses 14 to 25? |
| 8 | No condemnation, and no separation | [Study Romans 8 step by step](/study/bible/romans/8?study=walk) | Paul lists everything that might separate you from God's love and says none can. Which item on his list do you most fear? |
| 9 | God's word has not failed | [Romans 9, passage by passage](/study/bible/romans/9#plain) | Paul argues about election with tears for his own people. What happens when the doctrine is discussed without the grief? |
| 10 | The word is near you | [Romans 10, passage by passage](/study/bible/romans/10#plain) | Paul says the word is near you, in your mouth and in your heart. What would it mean for you to say Jesus is Lord and mean every word? |
| 11 | The olive tree, and the depth of God | [Romans 11, passage by passage](/study/bible/romans/11#plain) | Paul warns Gentile believers not to boast over the branches broken off. What does the church owe to Israel? |
| 12 | Living sacrifices | [Romans 12, passage by passage](/study/bible/romans/12#plain) | Paul says to offer your body as a living sacrifice. Which part of your ordinary day have you kept back from God? |
| 13 | Rulers, love, and the coming day | [Romans 13, passage by passage](/study/bible/romans/13#plain) | Paul tells the church to honour rulers and to owe no one anything but love. Which of those two is harder for you right now? |
| 14 | The weak and the strong | [Romans 14, passage by passage](/study/bible/romans/14#plain) | Paul says the strong must not despise and the weak must not judge. Which are you more tempted to do, and toward whom? |
| 15 | Accept one another, and the road to Spain | [Romans 15, passage by passage](/study/bible/romans/15#plain) | Paul says to accept one another as Christ accepted you. Whom have you accepted only on your own terms? |
| 16 | A church of names | [Romans 16, passage by passage](/study/bible/romans/16#plain) | Paul ends his greatest letter with a list of friends. Whose name would be on your list, and does anyone have yours on theirs? |

## 6. What Christians Believe (`/academy/beliefs`)

*Want to know what the church has always believed, and why?* You will be able to explain the creed line by line, trace each core doctrine to Scripture, and state the views on contested questions fairly. 4 tracks, 42 sessions, about 7 hours.

### The Apostles' Creed, line by line (`/tracks/apostles-creed`)

For: "I want to know what Christians confess". Ten short sessions on the oldest summary of Christian belief: what each line of the Apostles' Creed claims, where Scripture says it, and why the church chose those words.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | What a creed is, and why the church wrote them | [The Apostles' Creed, with notes](/resources/creeds/apostles-creed) | Which line of the Apostles' Creed do you find easiest to say, and which would you hesitate over? |
| 2 | God the Father Almighty, maker of heaven and earth | [Creation, in the Study Bible](/study/bible/doctrines/creation) | If the world is God's good work, what in your ordinary week would you treat differently? |
| 3 | Jesus Christ, his only Son, our Lord | [Was Jesus just a good teacher?](/answers/was-jesus-just-a-good-teacher) | Which of the four, Jesus, Christ, only Son or Lord, is hardest for you to say and mean? |
| 4 | Conceived by the Holy Spirit, born of the virgin Mary | [The virgin birth](/questions/jesus/the-virgin-birth) | What would be lost if Jesus had only seemed to be human, or had only become divine later? |
| 5 | Suffered under Pontius Pilate, crucified, buried, descended | [1 Peter 3, passage by passage](/study/bible/1-peter/3#plain) | Why do you think the creed spends five verbs on Jesus' suffering and death, and none on his teaching? |
| 6 | The third day he rose again | [Did the resurrection actually happen?](/answers/did-the-resurrection-actually-happen) | If the resurrection happened, what in your life would it change first? |
| 7 | He ascended, is seated, and will come to judge | [The exaltation of Christ, in the Study Bible](/study/bible/doctrines/exaltation) | Does the thought of Christ as judge bring you more comfort or more unease, and why? |
| 8 | Believing in the Holy Spirit | [The Holy Spirit, in the Study Bible](/study/bible/doctrines/spirit) | Do you think of the Holy Spirit more as a force, a feeling or a person, and where did that picture come from? |
| 9 | The holy catholic church, the communion of saints | [The church, in the Study Bible](/study/bible/doctrines/church) | When you hear the word church, do you picture a building, a denomination, your own congregation or something larger? |
| 10 | Forgiveness, the resurrection of the body, life everlasting | [The resurrection, in the Study Bible](/study/bible/doctrines/resurrection) | Which of the creed's last three lines do you most need to be true? |

### The core doctrines, from Scripture (`/tracks/core-doctrines`)

For: "I want to know what the Bible teaches". Twelve short sessions, one doctrine each, from Scripture and God to the life to come, traced to the Bible and the Study Bible, with first things confessed plainly.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Scripture: God has spoken | [Revelation, in the Study Bible](/study/bible/doctrines/revelation) | When you open the Bible, do you expect to be informed, inspired or addressed by God, and why? |
| 2 | God and his attributes | [The attributes of God, in the Study Bible](/study/bible/doctrines/attributes) | Which of God's attributes do you find most comforting, and which most unsettling? |
| 3 | The Trinity | [The Trinity, in the Study Bible](/study/bible/doctrines/trinity) | What picture of the Trinity have you heard, and which part of the truth does it lose? |
| 4 | Creation and the image of God | [The image of God, in the Study Bible](/study/bible/doctrines/image) | Whom do you find it hardest to see as bearing God's image, and why? |
| 5 | Sin | [Sin, in the Study Bible](/study/bible/doctrines/sin) | Do you think of sin more as wrong actions or as a condition, and how does the difference change what would fix it? |
| 6 | The person of Christ | [The Chalcedonian Definition](/resources/creeds/chalcedonian-definition) | Which half of Chalcedon's confession, truly God or truly man, do you find it easier to forget? |
| 7 | The atonement | [The atonement, in the Study Bible](/study/bible/doctrines/atonement) | Which picture of the cross has meant most to you, and which have you neglected? |
| 8 | Salvation: grace, faith, justification | [Justification, in the Study Bible](/study/bible/doctrines/justification) | Where do you still find yourself trying to earn what Scripture says is given? |
| 9 | The Holy Spirit | [The Holy Spirit, in the Study Bible](/study/bible/doctrines/spirit) | Where have you seen the fruit of the Spirit grow in someone over many years? |
| 10 | The church and its practices | [The church, in the Study Bible](/study/bible/doctrines/church) | What has made belonging to a church hard, or good, for you? |
| 11 | The last things | [The return of Christ, in the Study Bible](/study/bible/doctrines/return) | Does the return of Christ feel to you more like a hope, a threat or a puzzle? |
| 12 | The life to come | [The new creation, in the Study Bible](/study/bible/doctrines/new-creation) | If the life to come is a renewed creation, what in your present life feels most worth carrying into it? |

### Where faithful Christians differ, fairly (`/tracks/where-christians-differ`)

For: "I want to understand the other side". Eight short sessions on the questions that divide faithful churches, from baptism and the Supper to predestination and the end times, each view stated in its strongest voice.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | First things, second things, open questions | [Compare the doctrines side by side](/theology/compare) | What disagreement among Christians have you treated as more important, or less important, than it really is? |
| 2 | Baptism: infants and believers | [Babies or believers? Why Christians baptize differently](/writing/babies-or-believers-why-christians-baptize-differently) | What is the strongest argument for the view of baptism you do not hold? |
| 3 | The Lord's Supper | [What is the Lord's Supper?](/writing/what-is-the-lords-supper) | What do you believe happens when Christians eat the Lord's Supper, and where did you learn it? |
| 4 | How a church is governed | [What is the church?](/theology/doctrine/church) | What does a church need most from its leaders, whatever its form of government? |
| 5 | Women in church office | [Should women preach?](/writing/should-women-preach) | What is the strongest case for the view on women in office that you do not hold? |
| 6 | Predestination and free will | [How are we saved?](/theology/doctrine/soteriology) | Which do you find harder to accept, that God chooses or that people truly choose, and why? |
| 7 | The millennium and the end times | [How does it end?](/theology/doctrine/last-things) | How has what you were taught about the end times shaped the way you live now? |
| 8 | The great traditions, in their own words | [The great traditions](/theology/traditions) | Which of the three great traditions do you understand least, and what would you need to understand it better? |

### Study, history, doctrine (`/tracks/deeper`)

For: "I want to go deeper". Twelve short sessions for someone who wants to go deeper: read whole books, learn how each kind reads, follow a doctrine through, and meet the creeds, the councils and where Christians differ.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Read a whole book | [The Study Bible](/study/bible) | Which book of the Bible have you only ever read in pieces, and what might you see if you read it whole? |
| 2 | How each kind of book reads | [Guides to reading the Bible](/study/bible/guides) | Which kind of writing in the Bible do you find hardest to read, and what do you think makes it hard? |
| 3 | Seven steps on a hard chapter | [The guided study of Romans 8](/study/bible/romans/8?study=walk) | Which of the seven steps did you find hardest to take slowly, and what did the chapter show you when you did? |
| 4 | The whole story | [The Bible's story in eleven parts](/study/bible/story) | Where do you find yourself in the Bible's story, and which part of it do you know least? |
| 5 | The world it was written in | [What does Philippians 4:13 really mean?](/resources/context/philippians-4-13-in-context) | What verse have you heard quoted so often that you have never read it in its chapter? |
| 6 | One doctrine, followed through | [The doctrines of the Bible](/study/bible/doctrines) | Which doctrine do you hold most firmly, and how many places in the Bible could you show it from? |
| 7 | The words the church confessed | [Creeds and confessions](/resources/creeds) | If you had to say what you believe in three sentences, what would you keep, and what would you leave out? |
| 8 | Two thousand years | [Church history](/theology/history) | Which part of the church's story do you know least, and why do you think no one taught it to you? |
| 9 | Where Christians differ | [Compare the views](/theology/compare) | Which disagreement among Christians have you treated as more important, or less important, than it really is? |
| 10 | Where you lean, and why | [Where do you lean, and why?](/theology/which-view) | On the doctrine you chose, did you choose where you lean, or did you inherit it? |
| 11 | A rule of life | [Build a rule of life](/tools/rule-of-life) | Which one rhythm, kept for a year, would change you most? |
| 12 | Hand it on | [Small group study guides](/studyguides) | Who taught you the faith, and who could you teach it to? |

## 7. Church History (`/academy/history`)

*Want to know how we got here?* You will know the church's story across two thousand years, its councils, its failures and its renewals, and how each age read the Bible. 2 tracks, 22 sessions, about 6 hours.

### Church history in fourteen lessons (`/tracks/church-history`)

For: "I want to know the church's story". Fourteen short sessions through two thousand years of the church, one for each lesson of the site's course: what each age carried, where it failed, and what it still asks of us.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | The first Christians | [The First Christians](/theology/history/the-apostolic-age) | If you had no Bible on your shelf, what would hold your faith together? |
| 2 | The age of the martyrs | [The Age of the Martyrs](/theology/history/the-age-of-martyrs) | What is the pinch of incense your own world asks of you, the small gesture that would make everything easier? |
| 3 | The first monks | [The First Monks](/theology/history/the-desert-and-the-rule) | What is one thing in your life that following Christ has never yet cost you? |
| 4 | When Rome became Christian | [When Rome Became Christian](/theology/history/the-constantinian-turn) | What would your church be tempted to trade for protection or favour today? |
| 5 | The teachers who carried the faith | [The Church Fathers](/theology/history/the-fathers-at-work) | Which do you find easier to care about, right belief or practical mercy, and what would it take to hold both? |
| 6 | The councils that wrote the creeds | [Nicaea to Chalcedon](/theology/history/the-great-councils) | When you say Jesus is God, what do you mean, and how would you say it to a friend who asked? |
| 7 | The church that outlived Rome | [The Church That Outlived Rome](/theology/history/the-church-that-outlived-rome) | What is the difference between a person being baptized and a person being converted, and how would you know? |
| 8 | East and West divide | [Why the Catholic and Orthodox Churches Split](/theology/history/the-east-west-schism) | Who is a Christian from another tradition you have stopped trying to understand, and what would it take to start again? |
| 9 | The church in the Middle Ages | [The Church in the Middle Ages](/theology/history/the-medieval-west) | Where might your own certainty, joined to whatever power you hold, be doing harm you can't yet see? |
| 10 | The Reformation | [The Reformation](/theology/history/the-reformation) | What is the difference between grace you are given and goodness you earn, and which do you live by on an ordinary day? |
| 11 | Catholic renewal and the wars of religion | [The Counter-Reformation and the Wars of Religion](/theology/history/the-counter-reformation) | Where are you tempted to want the law, or the state, to carry the persuasion that belongs to the church? |
| 12 | Revival, and what it could not see | [The Great Awakening](/theology/history/the-awakenings) | What might Christians a century from now see in our faith that we can't see in ourselves? |
| 13 | The missionary century | [The Missionary Century](/theology/history/the-missionary-century) | Which parts of your faith are the gospel itself, and which are packaging from your own culture? |
| 14 | The church since 1900 | [The Church Since 1900](/theology/history/the-global-church) | Which part of the church's long story do you most need to remember when you read the news this week? |

### How each age has read the Bible (`/tracks/culture-and-the-bible`)

For: "I want to see my own blind spots". Eight short sessions on how the church has read Scripture, from the early church to the churches of the global South, and on the lenses of our own day, so you can begin to see yours.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Every reader reads from somewhere | [How culture reads the Bible](/theology/reading-the-bible) | Which verse feels so obvious to you that you've never asked whether someone else might read it differently? |
| 2 | The early church and the rule of faith | [Allegory and History](/theology/history/alexandria-and-antioch) | When you read the Old Testament, do you tend to look for Christ, for history, or for a word about your own week? |
| 3 | The medieval Bible's four senses | [The Letter and the Spirit](/theology/history/the-four-senses) | When did reading the Bible last make you more loving, and not only better informed? |
| 4 | The Reformation and the plain sense | [The Plain Sense](/theology/history/the-plain-sense) | Who in your life, living or long gone, has the standing to tell you that you are reading a passage wrongly? |
| 5 | The Enlightenment and the critical turn | [The Critical Bible](/theology/history/the-critical-bible) | Do you read the Bible more as a record to be checked or as a story to live inside, and what does each habit miss? |
| 6 | One Bible, two Americas | [One Bible, Two Americas](/theology/history/one-bible-two-americas) | Which passages feel plain to you because they cost you nothing, and which feel strained because they would cost you a great deal? |
| 7 | The lenses of our own day | [Is the Bible an American Book?](/resources/context/the-bible-is-not-an-american-book) | When did a passage of Scripture last change your politics, or your idea of a good life, rather than confirm it? |
| 8 | Reading with the whole church | [Reading from the South](/theology/history/reading-from-the-south) | Who is a Christian from another culture or century whose reading of the Bible you could let correct yours? |

## Beside the road Faith for Teenagers (`/academy/teens`)

*Thirteen to eighteen? This is yours.* You will have weighed whether it is true, seen the Bible's whole story, and thought hard about who you are and how to live it now. 3 tracks, 24 sessions, about 2 hours.

### Is any of it true? (`/tracks/teens-is-it-true`)

For: "I'm a teenager with questions". Eight short sessions for a teenager who wants honest answers: God, the Bible, Jesus, the resurrection, science, suffering, other religions, and what to do with doubt.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Does God exist? | [Does God exist?](/study/explorer/watch/does-god-exist) | If everything you can see needs an explanation, does the universe as a whole need one too, or can it just be there? |
| 2 | Can you trust the Bible? | [Is the Bible true?](/study/explorer/watch/is-the-bible-true) | What would you need to know about an old book before you'd trust what it says happened? |
| 3 | Did Jesus exist? | [Did Jesus even exist?](/questions/jesus/did-jesus-exist) | If nearly every historian agrees Jesus lived, what question about him is still left for you? |
| 4 | Did he rise? | [Did Jesus really come back to life?](/study/explorer/watch/did-jesus-come-back-to-life) | Of the explanations for what happened that first Easter, which seems strongest to you, and why? |
| 5 | Science and faith | [Are science and the Bible enemies?](/study/explorer/watch/science-and-the-bible) | Is there a question that matters to you which science, by its nature, can't answer? |
| 6 | Why bad things happen | [Why do bad things happen?](/study/explorer/watch/why-bad-things-happen) | Does the problem of suffering feel to you more like an argument, or more like something that has happened to you or someone you love? |
| 7 | So many religions | [Only a Christian because of where you were born?](/questions/religions/only-a-christian-because-of-where-you-were-born) | Is it possible to believe one religion is true and still treat people of every religion with real respect? |
| 8 | What to do with your doubts | [For skeptics](/skeptics) | What's one doubt you've never said out loud, and who could you safely say it to? |

### The Bible's story, start to finish (`/tracks/teens-big-story`)

For: "I'm a teenager who's never read it". Eight short sessions that run through the whole Bible as one story: creation, the fall, Abraham, the Exodus, kings and exile, Jesus, the church and the new creation.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Creation | [The whole Bible in two minutes](/study/explorer/watch/bible-two-minutes) | If the world was made on purpose and called good, what difference would that make to an ordinary school day? |
| 2 | The Fall | [What sin is](/study/explorer/watch/what-sin-is) | Where do you see the same cracks Genesis 3 describes, in the world or in yourself? |
| 3 | Abraham | [A blessing for all nations](/study/explorer/watch/all-nations) | Why might God choose to work through one flawed family instead of fixing everything at once? |
| 4 | The Exodus | [The Exodus: out of Egypt](/study/explorer/watch/the-exodus) | Why do you think God rescues the people first and gives them the law afterward? |
| 5 | Kings and exile | [The king](/study/explorer/watch/the-king) | Jeremiah 29:11 is often printed on mugs and posters. How does it change when you know who it was first written to? |
| 6 | Jesus | [Mark: the story at a run](/study/explorer/watch/book-mark) | Which part of the earlier story do you think Jesus finishes most clearly, and why? |
| 7 | The church | [Acts: to the ends of the earth](/study/explorer/watch/book-acts) | If the church is meant to be people from every background, what would that look like where you live? |
| 8 | New creation | [Revelation: the Lamb on the throne](/study/explorer/watch/book-revelation) | Now that you've seen the whole story, where do you think your own life fits on that road? |

### Who you are, and how to live it (`/tracks/teens-who-am-i`)

For: "I'm a teenager figuring out who I am". Eight short sessions for teenagers on worth, feeling not enough, friends, phones, parents, messing up, anxiety and pressure, and following Jesus now rather than later.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Made in God's image | [Creation and the image of God](/study/explorer/watch/image-of-god) | Where do you most often go to find out whether you're worth something? |
| 2 | When you feel like you're not enough | [Where Does Your Identity and Worth Come From?](/life/identity-and-worth) | Who do you compare yourself with most, and what does it usually do to you? |
| 3 | Friends and loneliness | [How to handle loneliness](/how-tos/rel-how-to-handle-loneliness) | Who is one person you could be a better friend to this month, and what would that take? |
| 4 | Phones and attention | [How Does Your Phone Shape Your Attention and Soul?](/life/technology-and-attention) | If your screen-time report could talk, what would it say you love most? |
| 5 | Parents and authority | [How to have a hard conversation](/how-tos/rel-how-to-have-a-hard-conversation) | What's one way you could honor a parent or guardian this week without pretending you agree with everything? |
| 6 | When you mess up | [Does God still love me when I do wrong?](/study/explorer/watch/love-when-i-do-wrong) | Is there something you've done that you're afraid God can't get past? |
| 7 | Anxiety and pressure | [I can't stop worrying](/help/anxiety) | What's piling up on you right now, and who is one adult you could tell about it? |
| 8 | Following Jesus now, not later | [What Does It Mean to Be a Disciple of Jesus?](/life/discipleship-following-jesus) | What would following Jesus look like in your actual week, not someday? |

## 9. Living It (`/academy/living`)

*Want the faith to carry the weight of an ordinary week?* You will have brought Scripture to bear on marriage, work, money, rest, grief and forgiveness, with the church's long wisdom beside you. 3 tracks, 24 sessions, about 4 hours.

### Marriage that lasts (`/tracks/living-marriage`)

For: "I want a stronger marriage". Eight short sessions on what marriage is for and how it is kept: covenant, conflict, forgiveness, intimacy, money, the long seasons, and what to do when a marriage is in trouble.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | What marriage is for | [Ephesians 5, passage by passage](/study/bible/ephesians/5#plain) | What did you expect marriage to give you, and where did that expectation come from? |
| 2 | Covenant, not contract | [Covenant](/study/bible/doctrines/covenant) | In what part of your marriage are you keeping score, waiting for your spouse to do their part first? |
| 3 | When you fight | [How to Fight Fair](/how-tos/marriage-how-to-fight-fair) | Think of your last real argument. What did you want underneath it that you never said out loud? |
| 4 | Forgiving the one you live with | [How to Actually Forgive Your Spouse](/how-tos/marriage-how-to-actually-forgive) | What is written in the ledger you keep against your spouse, and what would it cost you to tear out one page? |
| 5 | Sex and intimacy in marriage | [What does the Bible say about sex in marriage?](/life/the-marriage-bed) | What would it take for the two of you to talk about this part of your marriage honestly and kindly? |
| 6 | Money and the marriage | [How to Have the Money Conversation Without a War](/how-tos/marriage-how-to-money-conversation) | What did the home you grew up in teach you about money, and how does it shape your marriage now? |
| 7 | The seasons of a marriage | [How to Stay Married in the Baby Years](/how-tos/marriage-how-to-stay-married-baby-years) | What season is your marriage in now, and what is love asking of you in it that it did not ask before? |
| 8 | When a marriage is in trouble | [My marriage is falling apart](/help/marriage) | Is there something in your marriage you have been carrying alone that you need to tell a pastor or counsellor about? |

### Work, money and rest (`/tracks/living-work-money`)

For: "I want my work and money to mean something". Eight short sessions on the working week: work as God made it and as it now hurts, calling in ordinary jobs, ambition, money and enough, the Sabbath, attention, and work in the light of new creation.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Work before anything went wrong | [Creation](/study/bible/story/creation) | If your work was meant to be good from the beginning, what part of what you do each week is closest to that goodness? |
| 2 | Why work hurts | [Ecclesiastes 2, passage by passage](/study/bible/ecclesiastes/2#plain) | What are you asking your work to give you that it was never able to give? |
| 3 | Calling in an ordinary job | [How to Discern Your Calling](/how-tos/wm-how-to-discern-your-calling) | Who are the people your work serves, even indirectly, and how would you work differently if you saw them as the ones God sent you to? |
| 4 | Ambition and contentment | [Is ambition a sin?](/life/ambition-and-rest) | What would you still want to achieve if your worth were already settled and nobody was keeping score? |
| 5 | Money, enough and giving | [Why did Jesus treat money as a rival god?](/life/money-and-the-heart) | How would you know if you already had enough? |
| 6 | Sabbath and rest | [How to Keep a Sabbath](/how-tos/sf-how-to-keep-a-sabbath) | What do you believe would happen if you stopped working for a whole day each week? |
| 7 | Technology and attention | [How does your phone shape your attention and soul?](/life/technology-and-attention) | Where did your attention go yesterday, and is that where you would have chosen to give your love? |
| 8 | Work in the light of new creation | [1 Corinthians 15, passage by passage](/study/bible/1-corinthians/15#plain) | If your work is not in vain, what in it would you do differently, and what would you stop worrying about? |

### When life is heavy (`/tracks/living-hard-seasons`)

For: "I'm going through something hard". Eight short sessions for a hard season: lament, grief, anxiety, depression, the silence of God, costly forgiveness, suffering and hope, and the church as the people who carry each other.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Lament is faith, not its failure | [How to Practice Lament](/how-tos/ss-how-to-practice-lament) | What would you say to God about this season if you believed he could bear your honesty? |
| 2 | Grief | [What does the Bible say about grief and loss?](/life/grief-and-loss) | What do you wish the people around you understood about your grief, or about grief in general? |
| 3 | Anxiety | [Is anxiety a sin? Faith and mental health](/life/the-anxious-mind) | What does your anxiety most often tell you, and what would it sound like to answer it with what you know of God? |
| 4 | Depression | [What does the Bible say about depression?](/life/the-heavy-mind) | What would it look like to treat yourself this week the way God treated Elijah: rest, food, and help before answers? |
| 5 | When God seems silent | [Why does God feel far away?](/writing/why-does-god-feel-far-away) | What habit of faith could you keep this week even if you feel nothing while you keep it? |
| 6 | Forgiveness when it costs | [How do you forgive someone who really hurt you?](/life/forgiveness-the-hardest-grace) | What would it mean for you to hand this wrong to God, without pretending it was not wrong? |
| 7 | Suffering and hope | [Suffering](/study/bible/doctrines/suffering) | What is the difference between an explanation for your suffering and a hope that can hold you inside it? |
| 8 | The people who carry each other | [How to Sit With Someone Who Is Suffering](/how-tos/ss-how-to-sit-with-someone-suffering) | Who could you let carry part of what you are carrying, and what keeps you from asking them? |

## Beside the road Faith at Home (`/academy/home`)

*Leading a family? Start at the table.* You will have a way to lead faith at home that fits your children's ages, answers their hard questions honestly, and follows the church's year together. 3 tracks, 28 sessions, about 5 hours.

### Start at the table tonight (`/tracks/family`)

For: "I'm leading a family". Twelve short sessions for anyone leading a home: a devotion at the table, a question learned together, the Bible as one story, the hard questions children ask, and grace when you get it wrong.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Tonight | [Tonight's devotion](/family/tonight) | What would make five minutes at your table possible this week, and what usually gets in the way? |
| 2 | At home and on the road | [Deuteronomy 6, passage by passage](/study/bible/deuteronomy/6#plain) | If your child asked you why you follow Jesus, what would you say first? |
| 3 | One question, learned together | [The family catechism](/family/catechism) | Which question of the catechism would you most like your children to be able to answer by heart, and why that one? |
| 4 | The whole Bible in two minutes | [The whole Bible in two minutes](/study/explorer/watch/bible-two-minutes) | Which Bible stories did you learn as a child, and how do they fit into the one story? |
| 5 | The map | [Bible Explorer](/study/explorer) | Which stop on the map did your child choose, and what did they notice that you didn't? |
| 6 | Praying at the table | [Prayer](/study/explorer/watch/prayer) | What did you learn about prayer in the home you grew up in, and what do you want your children to learn in yours? |
| 7 | A plan you can keep | [Family reading plans](/family/reading-plans) | Which plan suits the ages at your table now, and which nights could you keep it? |
| 8 | When a child asks a hard one | [Who made God?](/study/explorer/watch/who-made-god) | What is the hardest question a child has asked you about God, and what did you say? |
| 9 | When you get it wrong | [Ephesians 6, passage by passage](/study/bible/ephesians/6#plain) | What in your home most often provokes your children to anger, and what would repair look like this week? |
| 10 | When a teenager says no | [What do I do when my teenager says they don't believe?](/answers/when-your-teenager-says-they-dont-believe) | If your child told you they didn't believe, what would you most want them to know about your love? |
| 11 | Talking with a teenager | [The Parent and Teen Conversation](/tools/parent-teen-conversation) | Where do you think you and your teenager see home most differently? |
| 12 | For the grown-ups | [Raising Believers: the study guide](/studyguides/raising-believers) | What do you most worry about for your children's faith, and what would it mean to hand that worry to God? |

### For parents: leading faith at home (`/tracks/parents-guide`)

For: "I'm a parent who wants to lead well". Eight sessions for parents themselves: leading when no one showed you how, faith at each age, a child's hard questions, a doubting teenager, discipline and grace, parenting alone, and handing it on.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | Leading when no one showed you how | [How to Start Family Worship (and Keep It When It Falls Apart)](/how-tos/fam-how-to-start-family-worship) | What is the one thing that most makes you hesitate to lead faith at home? |
| 2 | Faith at each age | [The Bible Explorer](/study/explorer) | What is one thing each of your children could take in at their age that you haven't yet offered them? |
| 3 | A child's hard question | [How to Answer Your Child's Hard Questions About God](/how-tos/parenting-how-to-answer-hard-questions-about-god) | Which question from your child, asked or not yet asked, do you most dread, and why? |
| 4 | When a teenager doubts | [How to Stay Close to a Teenager Who Is Pulling Away](/how-tos/parenting-how-to-stay-close-to-a-pulling-away-teenager) | If your teenager told you tomorrow that they weren't sure any of it was true, what would you want your first sentence to be? |
| 5 | Your own faith is what they watch | [Eight Weeks for the Worn-Out Parent](/plans/parenting) | If your children described your faith from what they've seen this month, what would they say? |
| 6 | Discipline and grace | [How Do You Discipline Children With Grace?](/life/raising-children-in-grace) | When you correct your children, what are you usually aiming at: their behavior, your own peace, or their heart? |
| 7 | Parenting alone, or as the only believer | [How do we do family devotions?](/help/family-devotions) | Who in your church could stand beside your children as another adult who prays for them? |
| 8 | Handing it on | [Psalm 78, passage by passage](/study/bible/psalms/78#plain) | What story of God's faithfulness, from Scripture or from your own family, do you most want your children to carry? |

### The church year at home (`/tracks/family-church-year`)

For: "I want our family to keep the seasons". Eight sessions on keeping the church's year at the family table: Advent, Christmas and Epiphany, Lent, Holy Week, Easter, Pentecost and the long ordinary weeks, each with something to do together.

| # | Session | Opens | The question |
|---|---|---|---|
| 1 | What the church year is | [The Calendar and Festivals](/study/bible/guides/calendar-and-festivals) | What does your family's year already revolve around, and what would it mean to let the life of Christ shape it? |
| 2 | Advent | [How to Keep Advent as a Family](/how-tos/fam-how-to-keep-advent-as-a-family) | What is your family waiting for right now, and how could Advent give that waiting words? |
| 3 | Christmas and Epiphany | [Matthew 2, passage by passage](/study/bible/matthew/2#plain) | Who are the outsiders in your children's world, and how might the magi's story change how your family sees them? |
| 4 | Lent | [How to Keep Lent and Easter as a Family](/how-tos/fam-how-to-keep-lent-and-easter-as-a-family) | What could your family give up together this Lent, and where should what you save go? |
| 5 | Holy Week | [The Wrong Kind of King](/family/devotions/holy-week-1) | Which day of Holy Week would your family most want to skip, and what might it teach you if you didn't? |
| 6 | Easter | [He Is Not Here](/family/devotions/holy-week-8) | How could your family make Easter last longer than one morning this year? |
| 7 | Pentecost | [The Holy Spirit through the Bible](/study/explorer/watch/holy-spirit) | Where does the Spirit seem to be turning your family outward, toward people unlike you? |
| 8 | Ordinary time | [The family devotions](/family/devotions) | What small practice could your family keep through the ordinary weeks, when no feast is calling for it? |

## Gaps and next steps

- **Printables for families** (catechism cards, a memory-verse chart, a seasonal devotion booklet) were planned in the Academy prompt and are not built yet; they would use `scripts/build-pdfs.mjs`, and never carry a gift ask.
- **Tracks James has kept back.** No track on dating, sexuality, gender, abortion or politics has been written. Each waits for his word.
- **Verification.** Certificates are honour-system until accounts exist. If accounts are built later, a certificate could carry a code checked by the site.
- **No person has read every session yet.** Every session passed the gate (Scripture word for word, every link live, the voice rules), and the writers listed every outside fact they used; James's read is still the last check.
