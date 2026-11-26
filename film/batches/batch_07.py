"""Batch 7 of the rebuilt Bible Explorer films: Ephesians, Philippians, Colossians, 1 Thessalonians, Hebrews.
Every claim comes from the old film's own captions and its "differ" note. The household passages keep the old notes'
sentences (no licence to control or harm; no one is asked to stay in danger; the misuse for slavery was wrong).
The Lord's coming: the readings are named and no side is taken, and no date, nation or person is named."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/book-{b}"
END = "LiveWell by James Bell"

write("book-ephesians", "Ephesians: one new people in Christ", P("ephesians"), [
  {"id": "plan", "kicker": "The whole plan", "level": 0.2, "lines": [
    "Ephesians names Paul as its writer, in prison, to believers in Ephesus and the cities around it. It answers no crisis.",
    "It steps back to look at the whole of what God is doing: a plan to bring all things in heaven and on earth together in Christ."],
   "scripture": S("Ephesians 1:10", "to bring all things in heaven and on earth together in Christ.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It has two halves, joined at the start of chapter four. Chapters one to three are praise, prayer, and teaching: what God has done. Chapters four to six are how to live because of it.",
    "Cut the second half off from the first, and grace becomes a list of rules."],
   "scripture": S("Ephesians 4:1", "I urge you to walk in a manner worthy of the calling you have received")},
  {"id": "grace", "kicker": "Watch for: grace", "level": 0.5, "lines": [
    "Salvation in Ephesians is God's work from first to last. The dead are made alive, by grace, through faith.",
    "For it is by grace you have been saved through faith.",
    "Faith is the way the gift is received, not a work that earns it. Yet believers are God's workmanship, made for the good works he prepared."],
   "scripture": S("Ephesians 2:8", "For it is by grace you have been saved through faith", True)},
  {"id": "one", "kicker": "Watch for: the two made one", "level": 0.7, "lines": [
    "The deepest division of Paul's world, between Jew and Gentile, has been overcome in the cross. Gentiles once far off are brought near and joined to Israel's hope.",
    "For He Himself is our peace, who has made the two one.",
    "One new humanity. One household. One temple, where God lives by his Spirit."],
   "scripture": S("Ephesians 2:14", "For He Himself is our peace, who has made the two one", True)},
  {"id": "walk", "kicker": "Watch for: the walk", "level": 0.8, "lines": [
    "Walk worthy. Tell the truth, deal with anger, work honestly, forgive.",
    "Be kind and tenderhearted to one another, forgiving each other just as in Christ God forgave you.",
    "The household passages put everyone under one Lord, and they lay demands on the strong. They give no one a license to control or harm another."],
   "scripture": S("Ephesians 4:32", "Be kind and tenderhearted to one another, forgiving each other just as in Christ God forgave you.", True)},
  {"id": "stand", "kicker": "Watch for: standing firm", "level": 0.7, "lines": [
    "The letter takes spiritual evil seriously without making it the center. The struggle is not against flesh and blood. Christ is seated far above every power.",
    "The believer's task is to stand, in the armor God supplies, and to pray."],
   "scripture": S("Ephesians 6:10", "Finally, be strong in the Lord and in His mighty power.")},
  {"id": "differ", "kicker": "Where churches differ", "level": 0.55, "lines": [
    "Churches today read the household passages differently, especially on marriage. Christians also read the letter's words on being chosen in different ways, and differ on whether Paul wrote it himself. On those questions this film takes no side.",
    "All agree that the household passages call for mutual love, with Christ's self-giving as the pattern. Nothing in them asks anyone to stay where they or their children are in danger.",
    "The words to slaves were misused for centuries to defend slavery. That misuse was wrong."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read it slowly and whole, aloud if you can. The long opening sentences are praise, not tangled argument. Watch the hinge at chapter four.",
    "The key chapters are one, two, four, five, and six."],
   "scripture": S("Ephesians 3:20", "Now to Him who is able to do immeasurably more than all we ask or imagine")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Watch for these words: grace, in Christ, mystery, body, and walk."],
   "titleCard": ["One new people in Christ.", END]},
], NOTE)

write("book-philippians", "Philippians: joy in chains", P("philippians"), [
  {"id": "warm", "kicker": "A letter between friends", "level": 0.2, "lines": [
    "Philippians is Paul's warmest letter. He writes from prison, facing a trial that could end in his death.",
    "He writes to the church that had stood by him from the start, and had just sent him a gift by the hand of Epaphroditus.",
    "I thank my God every time I remember you."],
   "scripture": S("Philippians 1:3", "I thank my God every time I remember you.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Thanks and news from prison. A call to stand together, with the hymn to Christ at its center. Knowing Christ, and pressing on. Then last appeals and thanks.",
    "The hymn of chapter two shapes all that follows."],
   "scripture": S("Philippians 2:5", "Let this mind be in you which was also in Christ Jesus")},
  {"id": "joy", "kicker": "Watch for: joy", "level": 0.5, "lines": [
    "Words for joy come more than a dozen times in a letter written in chains.",
    "Rejoice in the Lord always. I will say it again: Rejoice!",
    "Paul's joy rests not on his circumstances but on the Lord. It has looked at suffering and death and not been undone."],
   "scripture": S("Philippians 4:4", "Rejoice in the Lord always. I will say it again: Rejoice!", True)},
  {"id": "hymn", "kicker": "Watch for: the hymn", "level": 0.7, "lines": [
    "At the letter's heart stands what many think was an early hymn. Christ, in the form of God, emptied himself, took the form of a servant, and was obedient to death on a cross. And God exalted him.",
    "Humility here is the free choice to use one's place for others."],
   "scripture": S("Philippians 2:7", "but emptied Himself, taking the form of a servant")},
  {"id": "press", "kicker": "Watch for: pressing on", "level": 0.85, "lines": [
    "Paul counts his impressive credentials as loss, to gain Christ and a righteousness from God through faith.",
    "I count all things as loss compared to the surpassing excellence of knowing Christ Jesus my Lord.",
    "He has not arrived. Like a runner, he presses on toward the goal."],
   "scripture": S("Philippians 3:8", "I count all things as loss compared to the surpassing excellence of knowing Christ Jesus my Lord", True)},
  {"id": "content", "kicker": "Watch for: a famous line", "level": 0.7, "lines": [
    "Paul calls the church to pray instead of worrying. Then comes a much quoted line.",
    "I can do all things through Christ who gives me strength.",
    "In context it's not a promise of success. It's the strength to be content in hunger and in plenty."],
   "scripture": S("Philippians 4:13", "I can do all things through Christ who gives me strength.", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read it whole, as a letter between friends. It takes about fifteen minutes aloud. Watch the words joy, gospel, partnership, and mind.",
    "Read chapter two slowly, and the famous line of chapter four with the verses around it."],
   "scripture": S("Philippians 4:7", "And the peace of God, which surpasses all understanding")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "It's a letter about joy, written in chains."],
   "titleCard": ["Joy in chains.", END]},
], NOTE)

write("book-colossians", "Colossians: complete in Christ", P("colossians"), [
  {"id": "more", "kicker": "A promise of more", "level": 0.2, "lines": [
    "Colossians was written from prison to a small church Paul had never seen. Epaphras, one of its own people, had carried the gospel home.",
    "Now some teaching promised more: visions, food rules, holy days, and attention to angels and powers."],
   "scripture": S("Colossians 1:7", "You learned it from Epaphras, our beloved fellow servant")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The first two chapters are about who Christ is, and the last two about how believers live. The turn comes at the start of chapter three.",
    "The commands of the second half grow out of the gifts of the first."],
   "scripture": S("Colossians 3:1", "since you have been raised with Christ, strive for the things above")},
  {"id": "song", "kicker": "Watch for: the song of Christ", "level": 0.5, "lines": [
    "Christ is the image of the invisible God. All things were made through him and for him.",
    "He is before all things, and in Him all things hold together.",
    "Firstborn means the heir with first place, not the first thing made, as the church confessed at Nicaea."],
   "scripture": S("Colossians 1:17", "He is before all things, and in Him all things hold together.", True)},
  {"id": "complete", "kicker": "Watch for: nothing missing", "level": 0.7, "lines": [
    "All the fullness of God dwells in Christ, and believers are complete in him.",
    "Israel's feasts and Sabbaths were good gifts, a shadow pointing ahead, not a lie. The powers people feared were disarmed at the cross."],
   "scripture": S("Colossians 2:17", "These are a shadow of the things to come, but the body that casts it belongs to Christ.")},
  {"id": "puton", "kicker": "Watch for: the new self", "level": 0.8, "lines": [
    "Believers put off the old self, with its anger, greed, and lies. They put on compassion, kindness, patience, and forgiveness.",
    "And over all these virtues put on love, which is the bond of perfect unity.",
    "In the renewed self there is no Greek or Jew, slave or free. Christ is all."],
   "scripture": S("Colossians 3:14", "And over all these virtues put on love, which is the bond of perfect unity.", True)},
  {"id": "household", "kicker": "Watch for: every relationship", "level": 0.65, "lines": [
    "Paul puts every relationship in the Lord. He speaks to the weaker first, and lays duties, not privileges, on the stronger.",
    "Churches read the words to wives and husbands differently. All agree they give no one a license to control or harm another, and nothing in them asks anyone to stay where they or their children are in danger.",
    "The words to slaves were misused for centuries to defend slavery. That misuse was wrong."],
   "scripture": S("Colossians 3:23", "Whatever you do, work at it with your whole being, for the Lord and not for men")},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "Christians differ on who wrote the letter. Paul himself, as the letter says and the early church received it. A follower of Paul after his death, as many scholars since the eighteen hundreds have argued. Or Timothy during Paul's life, with his approval.",
    "This film takes no side."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read it in one sitting, aloud if you can. Then read the song of Christ slowly, more than once.",
    "Let it ask whether you have treated Christ as a good beginning, and looked elsewhere for the rest."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "And you have been made complete in Christ."],
   "scripture": S("Colossians 2:10", "And you have been made complete in Christ", True),
   "titleCard": ["Complete in Christ.", END]},
], NOTE)

write("book-1-thessalonians", "1 Thessalonians: hope that does not give up", P("1-thessalonians"), [
  {"id": "oldest", "kicker": "An early letter", "level": 0.2, "lines": [
    "First Thessalonians is very likely the oldest of Paul's letters to survive, written around the year fifty.",
    "Forced to leave by night, he had left a few new believers facing hard neighbors. Timothy brings good news, and Paul writes in relief."],
   "scripture": S("1 Thessalonians 3:6", "Timothy has returned from his visit with the good news")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The first half looks back: thanks for their faith, love, and hope, and how Paul lived among them. The second looks ahead: holiness, love, quiet work, and the Lord's coming.",
    "Every chapter ends near the same place."],
   "scripture": S("1 Thessalonians 1:3", "your work of faith, your labor of love, and your enduring hope")},
  {"id": "turned", "kicker": "Watch for: a new start", "level": 0.5, "lines": [
    "Most of these believers had worshiped idols until a few weeks before, and they turned to serve the living and true God.",
    "Paul lived among them, gentle as a nursing mother and caring as a father, working night and day so as not to be a burden."],
   "scripture": S("1 Thessalonians 1:9", "how you turned to God from idols to serve the living and true God")},
  {"id": "grief", "kicker": "Watch for: grief with hope", "level": 0.7, "lines": [
    "Some believers had died, and the living feared they had missed the Lord's coming. Paul doesn't tell them not to grieve.",
    "He tells them not to grieve like those without hope, because Jesus died and rose again.",
    "And so we will always be with the Lord."],
   "scripture": S("1 Thessalonians 4:17", "And so we will always be with the Lord.", True)},
  {"id": "coming", "kicker": "Where Christians differ", "level": 0.6, "lines": [
    "Every Christian tradition confesses that Jesus will come again and the dead will be raised. Christians differ on the order of events, and on whether being caught up is a separate rapture. This film takes no side.",
    "Paul gives no date.",
    "The Day of the Lord will come like a thief in the night.",
    "So no one should set a date, or name a living person, a nation, or an event of our own day as what these verses describe."],
   "scripture": S("1 Thessalonians 5:2", "the Day of the Lord will come like a thief in the night.", True)},
  {"id": "together", "kicker": "Watch for: life together", "level": 0.75, "lines": [
    "The letter ends with short commands for life together. Respect leaders. Care for the weak. Rejoice. Pray. Give thanks. Test everything.",
    "Waiting for the Lord means living well among your neighbors, not leaving them behind."],
   "scripture": S("1 Thessalonians 5:17", "Pray without ceasing.")},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read it in one sitting, as a pastor's letter to new believers he loves. Read the end of chapter four for what Paul says it's for.",
    "Therefore encourage one another with these words."],
   "scripture": S("1 Thessalonians 4:18", "Therefore encourage one another with these words.", True)},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Whom are you grieving, and where is your hope?"],
   "titleCard": ["Hope that does not give up.", END]},
], NOTE)

write("book-hebrews", "Hebrews: hold on to Jesus", P("hebrews"), [
  {"id": "tired", "kicker": "A sermon for the tired", "level": 0.2, "lines": [
    "Hebrews begins like a sermon and ends like a letter, and no one knows who wrote it.",
    "It was written to believers who had once suffered bravely, and were now tired, drifting, and tempted to give up on Christ."],
   "scripture": S("Hebrews 1:2", "But in these last days He has spoken to us by His Son")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Teaching and urging take turns. Jesus is greater than the angels and Moses. He is a high priest like Melchizedek, and the one offering the tabernacle pointed toward.",
    "From chapter ten, the call is to draw near and endure."],
   "scripture": S("Hebrews 8:6", "the covenant He mediates is better and is founded on better promises.")},
  {"id": "son", "kicker": "Watch for: the Son", "level": 0.5, "lines": [
    "God, who spoke through the prophets, has spoken last and best in his Son.",
    "The Son is the radiance of God’s glory and the exact representation of His nature.",
    "The Son is also fully human: made like his brothers, tempted, crying out with tears."],
   "scripture": S("Hebrews 1:3", "The Son is the radiance of God’s glory and the exact representation of His nature", True)},
  {"id": "better", "kicker": "Watch for: the word better", "level": 0.65, "lines": [
    "The word better runs through the book. The old covenant is a shadow, not because it was false, but because it pointed ahead. The writer honors it as God's gift.",
    "This book was misused to teach contempt for the Jewish people. That misuse was wrong."],
   "scripture": S("Hebrews 10:1", "For the law is only a shadow of the good things to come")},
  {"id": "priest", "kicker": "Watch for: the priest", "level": 0.8, "lines": [
    "Hebrews alone calls Jesus a priest at length. He offered not animals but himself, once for all, and sat down because the work was finished.",
    "He was tempted in every way, yet without sin, so he can sympathize.",
    "He always lives to intercede for them."],
   "scripture": S("Hebrews 7:25", "He always lives to intercede for them.", True)},
  {"id": "warnings", "kicker": "Watch for: warnings and hope", "level": 0.9, "lines": [
    "Five solemn warnings not to drift or turn away run beside as many words of hope. They're addressed to people the writer believes will persevere. How they relate to assurance is much debated, and this film takes no side.",
    "Then come the roll call of faith, and the race.",
    "Let us fix our eyes on Jesus, the author and perfecter of our faith."],
   "scripture": S("Hebrews 12:2", "Let us fix our eyes on Jesus, the author and perfecter of our faith", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one, then eleven and twelve. The key chapters are one, two, four, six, seven, nine, eleven, and twelve.",
    "Read with the Old Testament texts it builds on open beside it, and watch for the word better."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Jesus Christ is the same yesterday and today and forever."],
   "scripture": S("Hebrews 13:8", "Jesus Christ is the same yesterday and today and forever.", True),
   "titleCard": ["Hold on to Jesus.", END]},
], NOTE)
