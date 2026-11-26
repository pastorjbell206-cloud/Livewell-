"""Batch 6 of the rebuilt Bible Explorer films: Acts, Romans, 1 Corinthians, 2 Corinthians, Galatians.
Every claim comes from the old film's own captions and its "differ" note. Where Christians differ (the pattern in
Acts, Paul's phrases, the hard passages in 1 Corinthians, one letter or several) the views are named and no side is taken.
The old films' sentences that these letters are not against the Jewish people are kept."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/book-{b}"
END = "LiveWell by James Bell"

write("book-acts", "Acts: to the ends of the earth", P("acts"), [
  {"id": "next", "kicker": "The story goes on", "level": 0.2, "lines": [
    "Acts picks up where the Gospel of Luke leaves off. Luke's first book was about all that Jesus began to do and to teach. That suggests Acts is about what Jesus continues to do, through his Spirit and his people.",
    "You will be My witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth."],
   "scripture": S("Acts 1:8", "you will be My witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Acts moves outward from Jerusalem. First the city. Then Judea and Samaria. Then the door to the nations.",
    "The second half belongs largely to Paul, and it ends with him in Rome under guard, still teaching."],
   "scripture": S("Acts 28:31", "Boldly and freely he proclaimed the kingdom of God")},
  {"id": "spirit", "kicker": "Watch for: the Spirit", "level": 0.5, "lines": [
    "The Spirit is the driving force of Acts. He comes at Pentecost, fills believers for bold speech, guides decisions, and sets apart messengers.",
    "I will pour out My Spirit on all people.",
    "And he falls on Samaritans and Gentiles in ways that force the church to recognize them as full members."],
   "scripture": S("Acts 2:17", "I will pour out My Spirit on all people.", True)},
  {"id": "witness", "kicker": "Watch for: witness", "level": 0.65, "lines": [
    "The key word of the book is witness. Stephen's witness costs him his life.",
    "Lord, do not hold this sin against them.",
    "Almost every advance in Acts comes through opposition, and Luke presents none of it as defeat. Persecution scatters the church, and so spreads the word."],
   "scripture": S("Acts 7:60", "Lord, do not hold this sin against them.", True)},
  {"id": "lines", "kicker": "Watch for: every line crossed", "level": 0.8, "lines": [
    "Acts traces the good news across line after line: Samaritans, an official from Ethiopia, a Roman centurion. Each crossing is contested.",
    "The council in Jerusalem settles the central question. Gentiles are saved by grace, as Jews are."],
   "scripture": S("Acts 10:34", "I now truly understand that God does not show favoritism")},
  {"id": "saul", "kicker": "Watch for: Israel's hope", "level": 0.9, "lines": [
    "Saul, the church's fiercest opponent, meets the risen Jesus and becomes its messenger.",
    "Saul, Saul, why do you persecute Me?",
    "Acts insists that faith in Jesus fulfills Israel's hope and does not replace it. The first believers are Jews, and Paul on trial says he stands accused because of the hope of Israel."],
   "scripture": S("Acts 9:4", "Saul, Saul, why do you persecute Me?", True)},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "All Christians confess that the Holy Spirit is given to the church. They differ on how much of the pattern in Acts is meant for every church: the order of faith, baptism, and receiving the Spirit, and whether speaking in tongues is a regular sign of the Spirit's coming.",
    "This film takes no side."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one, and read for the large movement, from Jerusalem outward. Not every event in Acts is a rule for every church.",
    "The key chapters are one, two, seven, nine, ten, fifteen, seventeen, and twenty-eight."],
   "scripture": S("Acts 1:1", "I wrote about all that Jesus began to do and to teach")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Acts ends in Rome, with Paul under guard and still teaching."],
   "titleCard": ["To the ends of the earth.", END]},
], NOTE)

write("book-romans", "Romans: the good news, set out", P("romans"), [
  {"id": "letter", "kicker": "A letter to Rome", "level": 0.2, "lines": [
    "Romans is a letter, the longest Paul wrote. He sent it to the Christians in Rome, Jewish and Gentile believers he had not yet met, to introduce himself and the gospel he preached. He states his theme early.",
    "I am not ashamed of the gospel, because it is the power of God for salvation to everyone who believes."],
   "scripture": S("Romans 1:16", "I am not ashamed of the gospel, because it is the power of God for salvation to everyone who believes", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Romans moves in large blocks. What is wrong with the whole human race. What God has done about it. The new life that follows. God and Israel. And the life of a people shaped by mercy.",
    "The first great turn is two words: but now."],
   "scripture": S("Romans 3:21", "But now, apart from the law, the righteousness of God has been revealed")},
  {"id": "sin", "kicker": "Watch for: what is wrong", "level": 0.5, "lines": [
    "Paul first shows that the whole human race, Gentile and Jew, stands guilty before God.",
    "For all have sinned and fall short of the glory of God.",
    "Romans treats sin as more than wrong acts. It's a power that reigns. So people need more than self-improvement. They need to be rescued."],
   "scripture": S("Romans 3:23", "for all have sinned and fall short of the glory of God", True)},
  {"id": "grace", "kicker": "Watch for: set right, freely", "level": 0.7, "lines": [
    "God sets people right with himself freely, by grace, through Jesus' death, and they receive it by faith.",
    "Faith means trust. It isn't a good deed that earns a reward."],
   "scripture": S("Romans 3:24", "justified freely by His grace through the redemption that is in Christ Jesus.")},
  {"id": "life", "kicker": "Watch for: the new life", "level": 0.85, "lines": [
    "Grace doesn't mean going on in sin. Believers have died with Christ and live a new life.",
    "There is now no condemnation for those who are in Christ Jesus.",
    "The Spirit gives life, makes them God's children, and holds them in a love nothing can break."],
   "scripture": S("Romans 8:1", "there is now no condemnation for those who are in Christ Jesus.", True)},
  {"id": "israel", "kicker": "Watch for: God and Israel", "level": 0.7, "lines": [
    "Chapters nine to eleven are not a detour. Paul asks whether God has kept his promises to Israel, and he answers that God's word has not failed.",
    "Then he tells a church of Jewish and Gentile believers to welcome one another."],
   "scripture": S("Romans 15:7", "Accept one another, then, just as Christ accepted you")},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "All Christians confess that God sets people right with himself by grace, through Christ. They read some of Paul's phrases in more than one way: what he means by works of the law, and whether one phrase means faith in Christ or the faithfulness of Christ.",
    "This film takes no side."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one, and read it aloud, in large sections. Many famous verses mean more inside their paragraph than on a poster.",
    "The key chapters are one, three, four, five, six, eight, nine, and twelve."],
   "scripture": S("Romans 1:7", "To all in Rome who are loved by God and called to be saints: Grace and peace to you")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Romans is the good news, set out for people Paul had not yet met."],
   "titleCard": ["The power of God for salvation.", END]},
], NOTE)

write("book-1-corinthians", "1 Corinthians: a gifted church, coming apart", P("1-corinthians"), [
  {"id": "church", "kicker": "A real church", "level": 0.2, "lines": [
    "First Corinthians is a real letter to a real church with real trouble. The church in Corinth was young, rich in gifts and eloquent speech, and coming apart.",
    "Paul neither gives up on it nor flatters it."],
   "scripture": S("1 Corinthians 1:2", "To the church of God in Corinth, to those sanctified in Christ Jesus and called to be holy")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Chapters one to six answer what Paul has heard by report. Chapters seven to sixteen answer the questions the Corinthians wrote to him, many marked by the words now about.",
    "The letter begins with the cross and ends with the resurrection."],
   "scripture": S("1 Corinthians 7:1", "Now for the matters you wrote about")},
  {"id": "cross", "kicker": "Watch for: the cross", "level": 0.5, "lines": [
    "Corinth prized eloquence, knowledge, and status. Paul answers with a crucified Messiah, which looked like foolishness.",
    "For I resolved to know nothing while I was with you except Jesus Christ and Him crucified.",
    "The cross doesn't only save. It reorders what counts as strength and wisdom."],
   "scripture": S("1 Corinthians 2:2", "For I resolved to know nothing while I was with you except Jesus Christ and Him crucified.", True)},
  {"id": "body", "kicker": "Watch for: one body", "level": 0.65, "lines": [
    "The Spirit gives varied gifts to one body for the common good. Division is not a matter of taste. It's an attack on what God is building.",
    "Now you are the body of Christ, and each of you is a member of it.",
    "Unity is not sameness, and the weaker members are indispensable."],
   "scripture": S("1 Corinthians 12:27", "Now you are the body of Christ, and each of you is a member of it.", True)},
  {"id": "love", "kicker": "Watch for: love", "level": 0.8, "lines": [
    "Chapter thirteen is often read at weddings. In its setting it's a rebuke to a church competing over spiritual gifts.",
    "Love is patient, love is kind.",
    "Knowledge puffs up. Love builds up. Without love, even the most impressive gifts amount to nothing."],
   "scripture": S("1 Corinthians 13:4", "Love is patient, love is kind.", True)},
  {"id": "raised", "kicker": "Watch for: the resurrection", "level": 0.9, "lines": [
    "Some in Corinth denied that the dead rise. Paul restates the gospel. Christ died, was buried, was raised on the third day, and appeared to many.",
    "But Christ has indeed been raised from the dead.",
    "His rising is the firstfruits of all who belong to him."],
   "scripture": S("1 Corinthians 15:20", "But Christ has indeed been raised from the dead", True)},
  {"id": "differ", "kicker": "Where churches differ", "level": 0.55, "lines": [
    "Some passages are hard, and faithful churches reach different answers: marriage, singleness, and divorce in chapter seven, head coverings in worship in chapter eleven, and gifts like tongues and the place of women in leading worship in chapters twelve to fourteen.",
    "Readers weigh whether Paul grounds his words in creation, the gospel, or the custom of the day, and they weigh them differently. This film takes no side."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapters one to four, read as one piece.",
    "Ask of each chapter: what has the crucified and risen Lord to do with this?"]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Paul's counsel near the end is short.",
    "Do everything in love."],
   "scripture": S("1 Corinthians 16:14", "Do everything in love.", True),
   "titleCard": ["Do everything in love.", END]},
], NOTE)

write("book-2-corinthians", "2 Corinthians: power in weakness", P("2-corinthians"), [
  {"id": "personal", "kicker": "A letter after tears", "level": 0.2, "lines": [
    "Second Corinthians is the most personal of Paul's letters. A visit had gone badly, and he had written in tears. Then Titus brought news that the church had turned back.",
    "Paul writes in relief and joy, and in places in deep pain."],
   "scripture": S("2 Corinthians 2:4", "not to grieve you but to let you know how much I love you.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It has three parts. The ministry explained and the friendship mended. The collection for Jerusalem. And the fool's speech, where Paul boasts only of what shows his weakness.",
    "Comfort, grace, and weakness are one gospel seen from three sides."],
   "scripture": S("2 Corinthians 1:3", "the Father of compassion and the God of all comfort")},
  {"id": "clay", "kicker": "Watch for: jars of clay", "level": 0.5, "lines": [
    "Corinth admired strength and polish. Paul says the gospel is treasure in jars of clay, to show that the power is God's.",
    "Now we have this treasure in jars of clay to show that this surpassingly great power is from God and not from us.",
    "He passes on the comfort he received, and comfort doesn't mean the trouble goes away."],
   "scripture": S("2 Corinthians 4:7", "Now we have this treasure in jars of clay to show that this surpassingly great power is from God and not from us.", True)},
  {"id": "reconciled", "kicker": "Watch for: friends again", "level": 0.65, "lines": [
    "To be reconciled is to be made friends again after a quarrel. God took the first step, reconciling the world to himself in Christ.",
    "If anyone is in Christ, he is a new creation.",
    "The letter is itself an act of reconciliation between a pastor and his people."],
   "scripture": S("2 Corinthians 5:17", "if anyone is in Christ, he is a new creation.", True)},
  {"id": "giving", "kicker": "Watch for: giving as grace", "level": 0.6, "lines": [
    "Paul never orders the church to give. He calls giving a grace, with Jesus, who became poor, as its pattern.",
    "The gift is for the poor, not for Paul. And it gives no ground for teaching that giving to God will make the giver rich."],
   "scripture": S("2 Corinthians 9:7", "For God loves a cheerful giver.")},
  {"id": "weakness", "kicker": "Watch for: weakness", "level": 0.9, "lines": [
    "Against rivals who prized polish, Paul boasts only of hardships, an escape in a basket, and a thorn God would not remove.",
    "My grace is sufficient for you, for My power is perfected in weakness.",
    "His authority was for building up, not tearing down. A leader who uses this letter to demand loyalty has read it upside down."],
   "scripture": S("2 Corinthians 12:9", "My grace is sufficient for you, for My power is perfected in weakness.", True)},
  {"id": "differ", "kicker": "Where readers differ", "level": 0.55, "lines": [
    "Readers differ on whether this is one letter, or two or more joined together. Most often they propose that chapters ten to thirteen were once separate. Others note that no copy ever circulated in pieces. The argument can be followed on either view.",
    "Scholars have long debated who the rival teachers were. This film takes no side. And it's not a letter against the Jewish people."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read it in one sitting, aloud, as a real letter in the middle of a real quarrel.",
    "Keep the story in mind, and watch for irony in chapters ten to thirteen."],
   "scripture": S("2 Corinthians 1:4", "who comforts us in all our troubles")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Let it ask who you admire, and why."],
   "titleCard": ["Power in weakness.", END]},
], NOTE)

write("book-galatians", "Galatians: nothing added to Christ", P("galatians"), [
  {"id": "urgent", "kicker": "An urgent letter", "level": 0.2, "lines": [
    "Galatians is the most urgent of Paul's letters. Where a thanksgiving would go, he writes that he is amazed how quickly they are turning to a different gospel.",
    "It's a short, fierce letter from a man afraid of losing people he loved."],
   "scripture": S("Galatians 1:6", "I am amazed how quickly you are deserting the One who called you by the grace of Christ")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It has three parts, with an opening and a closing in Paul's own hand.",
    "First his own story. Then the argument from the Scriptures and from what the Galatians had seen. And last, freedom lived out."],
   "scripture": S("Galatians 2:16", "a man is not justified by works of the law, but by faith in Jesus Christ.")},
  {"id": "added", "kicker": "Watch for: what was added", "level": 0.5, "lines": [
    "Other teachers came. They were Jewish believers in Jesus, as Paul was, sincere in their faithfulness to God's word. They said Gentile believers must be circumcised and keep the law.",
    "Paul answers that adding anything to Christ as the price of belonging changes the good news.",
    "For if righteousness comes through the law, Christ died for nothing."],
   "scripture": S("Galatians 2:21", "For if righteousness comes through the law, Christ died for nothing.", True)},
  {"id": "abraham", "kicker": "Watch for: Abraham", "level": 0.65, "lines": [
    "Paul argues from Israel's own Scriptures. Abraham believed God and was counted righteous, centuries before the law.",
    "The law is God's good gift, a guardian until Christ came. Now all who belong to Christ are Abraham's heirs."],
   "scripture": S("Galatians 3:6", "Abraham believed God, and it was credited to him as righteousness.")},
  {"id": "table", "kicker": "Watch for: one table", "level": 0.8, "lines": [
    "At Antioch, Peter stopped eating with Gentile believers, and Paul challenged him in front of everyone. For Paul, the gospel is at stake when believers refuse to eat together.",
    "It was a quarrel among Jewish believers in Jesus, not between Christians and Jews.",
    "For you are all one in Christ Jesus."],
   "scripture": S("Galatians 3:28", "for you are all one in Christ Jesus.", True)},
  {"id": "freedom", "kicker": "Watch for: freedom", "level": 0.9, "lines": [
    "It is for freedom that Christ has set us free.",
    "Freedom is for serving one another in love, not for self-indulgence. Paul sets the works of the flesh beside the fruit of the Spirit, and tells the churches to restore those who fall, gently, and to carry each other's burdens."],
   "scripture": S("Galatians 5:1", "It is for freedom that Christ has set us free.", True)},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "All Christians confess that no one is set right with God by circumcision or by the law. They read Paul's phrase works of the law in more than one way.",
    "The traditional Protestant reading takes it as everything a person does to obey the law in order to stand right with God. The new perspective on Paul takes it above all as the practices that marked Jews off from other peoples. Many take something from both.",
    "This film takes no side. And this letter is not against the Jewish people."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read it in one sitting, aloud if you can, with Genesis open for chapters three and four. Don't stop at chapter four."],
   "scripture": S("Galatians 5:22", "the fruit of the Spirit is love, joy, peace")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "The letter asks what you are adding to Christ, quietly, as the price of belonging."],
   "titleCard": ["Nothing added to Christ.", END]},
], NOTE)
