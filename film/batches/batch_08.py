"""Batch 8 of the rebuilt Bible Explorer films: James, 1 Peter, 1 John, Revelation (four, not five: the ElevenLabs
balance on 2026-11-26 covered four). Every claim comes from the old film's own captions and its "differ" note.
James and Paul, the readings of Revelation, and the questions in 1 Peter and 1 John: named, no side taken.
Revelation names no date, nation or living person."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/book-{b}"
END = "LiveWell by James Bell"

write("book-james", "James: faith that works", P("james"), [
  {"id": "sayings", "kicker": "Sharp, practical sayings", "level": 0.2, "lines": [
    "James reads less like an argument than a string of sharp, practical sayings from a pastor who has watched faith go soft.",
    "The church has long held that its writer was the brother of Jesus, who once did not believe and became a leader in Jerusalem."],
   "scripture": S("James 1:1", "James, a servant of God and of the Lord Jesus Christ")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Look for threads rather than a tidy outline: trials, wisdom, wealth, speech, faith and deeds, taken up again and again from new angles.",
    "It sounds like Proverbs, and still more like the Sermon on the Mount.",
    "Be doers of the word, and not hearers only."],
   "scripture": S("James 1:22", "Be doers of the word, and not hearers only.", True)},
  {"id": "trials", "kicker": "Watch for: trials", "level": 0.5, "lines": [
    "James opens by calling trials an occasion for joy. Not because suffering is good, but because tested faith produces perseverance, and perseverance leads to maturity.",
    "He's honest that trials hurt, and he insists that God tempts no one and gives only good gifts."],
   "scripture": S("James 1:3", "the testing of your faith develops perseverance.")},
  {"id": "faith", "kicker": "Watch for: faith and deeds", "level": 0.7, "lines": [
    "Faith that does nothing is dead. It's the faith of bare words, which tells the hungry to keep warm and gives nothing.",
    "So too, faith by itself, if it does not result in action, is dead.",
    "Paul and James both teach that God saves by grace and that true faith is alive. They use faith, works, and justify in different senses. Christians relate the two in several ways, and this film takes no side."],
   "scripture": S("James 2:17", "So too, faith by itself, if it does not result in action, is dead.", True)},
  {"id": "wealth", "kicker": "Watch for: wealth", "level": 0.8, "lines": [
    "Few books speak so sharply about wealth. James condemns giving the best seats to the rich, warns the rich that they fade like a flower, and pronounces woe on those who hold back wages.",
    "God has chosen the poor."],
   "scripture": S("James 2:5", "Has not God chosen the poor of this world to be rich in faith")},
  {"id": "tongue", "kicker": "Watch for: the tongue", "level": 0.7, "lines": [
    "Every chapter touches the tongue. A small spark sets a great forest ablaze. Speech is the clearest test of whether faith has reached the whole person.",
    "Everyone should be quick to listen, slow to speak, and slow to anger."],
   "scripture": S("James 1:19", "Everyone should be quick to listen, slow to speak, and slow to anger", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read all five chapters at one sitting. It takes about fifteen minutes. Watch the threads, and read it beside the Sermon on the Mount.",
    "The key chapters are one, two, three, and five."],
   "scripture": S("James 1:5", "he should ask God, who gives generously to all without finding fault")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "James wants a faith that works."],
   "titleCard": ["Faith that works.", END]},
], NOTE)

write("book-1-peter", "1 Peter: hope for strangers", P("1-peter"), [
  {"id": "strangers", "kicker": "Strangers at home", "level": 0.2, "lines": [
    "First Peter is a letter of hope to believers who had become strangers in their own towns. They had left the festivals that held town life together, and were insulted and slandered.",
    "They had not lost their homes, but they had lost their place."],
   "scripture": S("1 Peter 2:11", "as foreigners and exiles")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It has four movements. Who you are. How to live among neighbors who slander you. Suffering for doing good. And a word to elders and to all.",
    "One pattern runs through it, first for Christ and then for his people: suffering now, and glory after."],
   "scripture": S("1 Peter 5:10", "after you have suffered for a little while, the God of all grace")},
  {"id": "hope", "kicker": "Watch for: a living hope", "level": 0.5, "lines": [
    "God has given new birth into a living hope through the resurrection of Jesus. An inheritance waits that cannot spoil.",
    "Trials test faith, more precious than gold, and they are a short time before glory."],
   "scripture": S("1 Peter 1:3", "a living hope through the resurrection of Jesus Christ from the dead")},
  {"id": "people", "kicker": "Watch for: a people", "level": 0.7, "lines": [
    "Peter gives a mostly Gentile church the titles God gave Israel at Sinai.",
    "But you are a chosen people, a royal priesthood, a holy nation.",
    "He is a Jew, writing in Israel's own Scriptures to welcome Gentiles into Israel's blessings. Using the New Testament to justify contempt for Jews is false."],
   "scripture": S("1 Peter 2:9", "But you are a chosen people, a royal priesthood, a holy nation", True)},
  {"id": "good", "kicker": "Watch for: doing good", "level": 0.8, "lines": [
    "To suffer for doing good, without striking back, is to walk where Christ walked. Peter's readers neither retaliate nor retreat. They do good and give a gentle answer.",
    "These chapters never say that someone being harmed must stay and bear it."],
   "scripture": S("1 Peter 2:23", "When they heaped abuse on Him, He did not retaliate")},
  {"id": "care", "kicker": "Watch for: not alone", "level": 0.7, "lines": [
    "Elders are to shepherd God's flock willingly, as examples. Everyone is to be humble.",
    "Cast all your anxiety on Him, because He cares for you.",
    "Peter doesn't tell sufferers to carry it alone. After a little while, the God of all grace will restore them."],
   "scripture": S("1 Peter 5:7", "Cast all your anxiety on Him, because He cares for you.", True)},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "Christians differ on who wrote the letter, on how Israel and the church fit together, on Christ's preaching to the spirits in prison, and on how the words to wives and husbands apply today. On those this film takes no side.",
    "Using Peter's words to slaves to defend slavery was a misuse, and it was wrong."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read it in one sitting, as a real letter to frightened people. Read the household passages beside the picture of Christ in chapter two.",
    "Where churches differ, read more than one view before you settle."],
   "scripture": S("1 Peter 3:15", "the reason for the hope that is in you.")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Suffering now, and glory after."],
   "titleCard": ["Hope for strangers.", END]},
], NOTE)

write("book-1-john", "1 John: so that you may know", P("1-john"), [
  {"id": "steady", "kicker": "A letter to steady people", "level": 0.2, "lines": [
    "First John reads like a sermon written down, with no greeting and no named writer.",
    "A group had left these churches, taking a new teaching about Jesus, and those who stayed wondered whether they really knew God. John writes to steady them."],
   "scripture": S("1 John 2:19", "They went out from us, but they did not belong to us.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "John works like a composer with a few themes: light, love, truth, obedience, and belief. He comes back to each from a new angle.",
    "God is light, and in Him there is no darkness at all."],
   "scripture": S("1 John 1:5", "God is light, and in Him there is no darkness at all.", True)},
  {"id": "flesh", "kicker": "Watch for: come in the flesh", "level": 0.5, "lines": [
    "The letter begins with witnesses who heard, saw, and touched the Word of life. Against teachers who said the divine Christ only seemed to have a body, John insists he came in the flesh.",
    "A spirituality that despises the body soon despises the neighbor."],
   "scripture": S("1 John 1:1", "which we have seen with our own eyes, which we have gazed upon and touched with our own hands")},
  {"id": "marks", "kicker": "Watch for: three marks", "level": 0.65, "lines": [
    "Three marks keep returning: believing the truth about Jesus, keeping God's commands, and loving one another. John won't let them be pulled apart.",
    "They were written to steady people, not to make tender consciences anxious."],
   "scripture": S("1 John 2:3", "By this we can be sure that we have come to know Him: if we keep His commandments.")},
  {"id": "sin", "kicker": "Watch for: two truths", "level": 0.8, "lines": [
    "John holds two truths together. Anyone who says he has no sin deceives himself, and God forgives and cleanses those who confess.",
    "He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.",
    "Yet a child of God doesn't settle into sin. Don't deny your sin, and don't make peace with it."],
   "scripture": S("1 John 1:9", "He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.", True)},
  {"id": "love", "kicker": "Watch for: love", "level": 0.9, "lines": [
    "God is love, and love is defined by what God did: he sent his Son. So love is concrete, laying down one's life and opening the hand to a brother in need.",
    "Perfect love drives out the dread of judgment."],
   "scripture": S("1 John 4:8", "Whoever does not love does not know God, because God is love.")},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "Christians differ on who wrote the letter, on how to read the words that a child of God does not keep on sinning, and on how assurance works. This film takes no side.",
    "The letter's antichrists were teachers who denied that Jesus is the Christ come in the flesh, and this film names no one living today."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read it in one sitting, aloud if you can, with John's Gospel open beside it. Remember the split behind it.",
    "And let it ask where your confidence before God rests."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "John writes so that you may know that you have eternal life."],
   "scripture": S("1 John 5:13", "so that you may know that you have eternal life.", True),
   "titleCard": ["So that you may know.", END]},
], NOTE)

write("book-revelation", "Revelation: the Lamb on the throne", P("revelation"), [
  {"id": "unveil", "kicker": "An unveiling", "level": 0.2, "lines": [
    "Revelation is the last book of the Bible. Its title means an unveiling.",
    "It was written to real churches under real pressure, some in danger, some comfortable and compromised. It shows them their world as heaven sees it.",
    "Do not be afraid. I am the First and the Last."],
   "scripture": S("Revelation 1:17", "Do not be afraid. I am the First and the Last", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "John sees the risen Christ and receives messages for seven churches. Then a door opens in heaven: God's throne, and a Lamb who opens a sealed scroll.",
    "A sequence of visions follows, and the book ends with a new heaven and a new earth."],
   "scripture": S("Revelation 1:3", "Blessed is the one who reads aloud the words of this prophecy")},
  {"id": "throne", "kicker": "Watch for: the throne", "level": 0.5, "lines": [
    "The throne is the book's central image. Whatever chaos appears on earth, the vision of chapter four shows the One seated on the throne, worshiped day and night.",
    "The empires that claim ultimate power are not ultimate."],
   "scripture": S("Revelation 4:8", "Holy, Holy, Holy, is the Lord God Almighty, who was and is and is to come!")},
  {"id": "lamb", "kicker": "Watch for: the Lamb", "level": 0.7, "lines": [
    "John hears of the Lion of the tribe of Judah. He looks, and sees a Lamb who was slain. That reversal defines the book.",
    "Worthy is the Lamb, who was slain.",
    "Christ conquers by sacrifice, and his people overcome the same way."],
   "scripture": S("Revelation 5:12", "Worthy is the Lamb, who was slain", True)},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "Readers follow four main approaches. Some read most of it as fulfilled in the first centuries. Some as a map of church history. Some as events still to come. Some as the conflict of every age.",
    "Many combine them, and faithful Christians hold each. This film takes no side and names no date."],
   "scripture": S("Revelation 14:12", "Here is a call for the perseverance of the saints")},
  {"id": "new", "kicker": "Watch for: all things new", "level": 0.85, "lines": [
    "Revelation doesn't flinch from judgment on evil, but it doesn't end there. The goal is a renewed creation in which God dwells with his people, death is gone, and the nations walk in the light of the Lamb.",
    "He will wipe away every tear from their eyes."],
   "scripture": S("Revelation 21:4", "He will wipe away every tear from their eyes", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one. The key chapters are one, two, five, twelve, thirteen, twenty, twenty-one, and twenty-two.",
    "Read its symbols by the Old Testament. The book's own interest is less in timetables than in worship, endurance, and hope."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Come, Lord Jesus!"],
   "scripture": S("Revelation 22:20", "Come, Lord Jesus!", True),
   "titleCard": ["The Lamb on the throne.", END]},
], NOTE)
