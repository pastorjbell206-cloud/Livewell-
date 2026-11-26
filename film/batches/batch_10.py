"""Batch 10 of the rebuilt Bible Explorer films: five more beliefs (the resurrection, how salvation works, grace,
faith, the gospel in a minute). Every claim comes from the old film's own captions and its "differ" note.
Where churches differ (baptism, God's choosing and ours, falling away, how grace is received, faith and works)
the questions are named and no side is taken. Death is named, never shown; Christ is never drawn."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("the-resurrection", "The resurrection", P("the-resurrection"), [
  {"id": "buried", "kicker": "He was buried", "level": 0.2, "lines": [
    "Christians confess that Jesus died and was buried. Joseph of Arimathea, a disciple, laid the body in his own new tomb cut into the rock, and rolled a great stone across the entrance.",
    "The summary Paul passed on puts the burial between the death and the rising, because the one who was raised is the one who was buried."],
   "scripture": S("1 Corinthians 15:4", "that He was buried, that He was raised on the third day according to the Scriptures")},
  {"id": "empty", "kicker": "The empty tomb", "level": 0.45, "lines": [
    "Very early on the first day of the week, the women came with the spices they had prepared. They found the stone rolled away, and they did not find the body. All four Gospels tell of the empty tomb that morning.",
    "The question they were asked is the whole story in one sentence.",
    "Why do you look for the living among the dead? He is not here; He has risen!"],
   "scripture": S("Luke 24:5-6", "Why do you look for the living among the dead? He is not here; He has risen!", True)},
  {"id": "mary", "kicker": "News to be carried", "level": 0.6, "lines": [
    "John tells of Mary Magdalene weeping outside the tomb. She took the risen Jesus for the gardener until he said her name. He sent her to his brothers with a message, and she went and told the disciples.",
    "I have seen the Lord!",
    "The first news of Easter was a message to be carried."],
   "scripture": S("John 20:18", "I have seen the Lord!", True)},
  {"id": "body", "kicker": "The same body, made new", "level": 0.7, "lines": [
    "The risen Jesus is not a ghost or a memory. He told his frightened friends to look at his hands and feet, and he ate broiled fish in front of them.",
    "Yet his body was also changed. He came among them behind locked doors, and he was not always recognized at first. Christians confess that God raised the same body that had been buried, now made new."],
   "scripture": S("Luke 24:39", "Look at My hands and My feet. It is I Myself.")},
  {"id": "different", "kicker": "Not back, but through", "level": 0.75, "lines": [
    "Jesus had called Lazarus out of his tomb, still bound in strips of linen, back to the life he had before. Jesus' own rising was different. He was raised into a life on the far side of death.",
    "Death no longer has dominion over Him."],
   "scripture": S("Romans 6:9", "death no longer has dominion over Him.", True)},
  {"id": "firstfruits", "kicker": "The first sheaf", "level": 0.85, "lines": [
    "Under the law, Israel brought the first sheaf of the harvest to the priest: the first sheaf, and the promise of the rest. Paul uses that picture for Easter.",
    "But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep."],
   "scripture": S("1 Corinthians 15:20", "But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep.", True)},
  {"id": "matters", "kicker": "Why it matters", "level": 0.7, "lines": [
    "Paul says that if Christ has not been raised, faith is futile. Because he was raised, the forgiveness won at the cross is sealed, death is not the final word over anyone who belongs to him, and the body and the world God made matter.",
    "Every Sunday gathering is a small Easter. It doesn't take away grief. It gives grief a hope."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Because I live, you also will live."],
   "scripture": S("John 14:19", "Because I live, you also will live.", True),
   "titleCard": ["Because I live, you also will live.", END]},
], NOTE)

write("how-salvation-works", "How salvation works", P("how-salvation-works"), [
  {"id": "gift", "kicker": "It starts with a gift", "level": 0.2, "lines": [
    "The story starts with a gift, not a problem. God made human beings in his own image, to know him and show what he is like, and to love him and be happy in him forever.",
    "Nothing stood between people and God."],
   "scripture": S("Genesis 1:27", "So God created man in His own image")},
  {"id": "break", "kicker": "The break", "level": 0.4, "lines": [
    "People turned from God to their own way, and every one of us has followed.",
    "Sin is more than a list of wrong things done. It's a break: with God, with each other, inside ourselves."],
   "scripture": S("Romans 3:23", "for all have sinned and fall short of the glory of God")},
  {"id": "towers", "kicker": "The towers we build", "level": 0.5, "lines": [
    "Every age builds its towers: be good enough, try harder, earn your way back. The Bible says plainly that the gap is too wide.",
    "Salvation is the gift of God, not by works, so that no one can boast.",
    "That's hard news for anyone who likes to earn things, and good news for anyone who knows they can't."],
   "scripture": S("Ephesians 2:9", "not by works, so that no one can boast.", True)},
  {"id": "sends", "kicker": "God crosses the gap", "level": 0.65, "lines": [
    "Then God crosses the gap from his own side. The Father sends the Son, not to win over an unwilling God, but because he already loves the world.",
    "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life.",
    "The eternal Son becomes one of us, fully God and fully man."],
   "scripture": S("John 3:16", "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life.", True)},
  {"id": "cross", "kicker": "The cross", "level": 0.8, "lines": [
    "At the cross the break is mended, and God is the one who mends it. The Father and the Son are not on opposite sides here.",
    "For Christ also suffered for sins once for all, the righteous for the unrighteous, to bring you to God."],
   "scripture": S("1 Peter 3:18", "For Christ also suffered for sins once for all, the righteous for the unrighteous, to bring you to God.", True)},
  {"id": "raised", "kicker": "Raised", "level": 0.85, "lines": [
    "He was buried, and on the third day he was raised, in his body, not as an idea.",
    "The resurrection is God's sign that the cross did what it set out to do."],
   "scripture": S("Romans 4:25", "He was delivered over to death for our trespasses and was raised to life for our justification.")},
  {"id": "receive", "kicker": "Received, not earned", "level": 0.7, "lines": [
    "The gift is received, not earned. Jesus said to repent and believe in the gospel: turn around, and trust him.",
    "Faith is not a work that pays for anything. It's empty hands taking what is given."],
   "scripture": S("Mark 1:15", "Repent and believe in the gospel!")},
  {"id": "new", "kicker": "More than a clean record", "level": 0.75, "lines": [
    "God gives more than a clean record. Those who belong to Christ are forgiven, adopted as God's children, given the Holy Spirit, and joined to his people.",
    "If anyone is in Christ, he is a new creation."],
   "scripture": S("2 Corinthians 5:17", "if anyone is in Christ, he is a new creation.", True)},
  {"id": "differ", "kicker": "Where churches differ", "level": 0.55, "lines": [
    "All Christians confess that sinners are saved by God's grace, through Jesus' death and resurrection, and not by their own good deeds.",
    "Churches differ on the place of baptism, on how God's choosing and our choosing fit together, and on whether a believer can fall away. This film doesn't choose between them."]},
  {"id": "close", "kicker": "", "level": 0.4, "lines": [
    "The story ends where it began, with God and his people together, and more than before. Christians differ on many details of the last things. On this hope they speak together."],
   "scripture": S("Revelation 21:4", "and there will be no more death or mourning or crying or pain"),
   "titleCard": ["The gift of God, not by works.", END]},
], NOTE)

write("grace", "Grace: the gift no one earns", P("grace"), [
  {"id": "gift", "kicker": "A wage and a gift", "level": 0.2, "lines": [
    "A wage is owed. A gift is not. The Bible's word for the gift is grace: the free and undeserved favor of God, who gives sinners what they could never earn and forgives what they could never repay.",
    "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord."],
   "scripture": S("Romans 6:23", "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.", True)},
  {"id": "landowner", "kicker": "The landowner", "level": 0.45, "lines": [
    "Jesus told of a landowner who paid those who had worked one hour the same as those who had worked twelve. The early workers grumbled, and he answered that he had wronged no one.",
    "Or are you envious because I am generous?",
    "Grace offends anyone who is keeping count."],
   "scripture": S("Matthew 20:15", "Or are you envious because I am generous?", True)},
  {"id": "cost", "kicker": "What it cost", "level": 0.65, "lines": [
    "Grace is not God grading on a curve. He didn't wait for sinners to put things right.",
    "He paid the debt himself, while we were still his enemies. The cross is what the gift cost."],
   "scripture": S("Romans 5:8", "But God proves His love for us in this: While we were still sinners, Christ died for us.")},
  {"id": "received", "kicker": "Received, never achieved", "level": 0.7, "lines": [
    "So salvation is received, never achieved: by grace, through faith, not by works.",
    "Faith is not the one good deed that earns it. Faith is the empty hand that takes what is given."],
   "scripture": S("Ephesians 2:8-9", "For it is by grace you have been saved through faith, and this not from yourselves; it is the gift of God, not by works, so that no one can boast.")},
  {"id": "safe", "kicker": "Does that make sin safe?", "level": 0.6, "lines": [
    "Does that make sin safe? Paul heard the question and answered it at once.",
    "Shall we continue in sin so that grace may increase? Certainly not!",
    "The grace that forgives also teaches. Good works are not the root of salvation. They are its fruit."],
   "scripture": S("Romans 6:1-2", "Shall we continue in sin so that grace may increase? Certainly not!", True)},
  {"id": "enough", "kicker": "Grace enough", "level": 0.8, "lines": [
    "And grace doesn't stop at the door. Paul pleaded three times for a weakness to be taken away, and it was not. He was given this instead.",
    "My grace is sufficient for you, for My power is perfected in weakness.",
    "Grace enough for the day, and God's power at its clearest where ours runs out."],
   "scripture": S("2 Corinthians 12:9", "My grace is sufficient for you, for My power is perfected in weakness.", True)},
  {"id": "travel", "kicker": "A gift that travels", "level": 0.7, "lines": [
    "The gift is meant to travel. People who know they have been forgiven, forgive. People who know that everything they have was given, give.",
    "In the church no one has anything they did not receive."],
   "scripture": S("Ephesians 4:32", "Be kind and tenderhearted to one another, forgiving each other just as in Christ God forgave you.")},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "All Christians confess that salvation is God's gift, received by grace and not earned.",
    "They differ on how God's grace and the human will relate, and on how grace is received: by faith alone, or by faith with the sacraments and the life of the church. This film takes no side."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "A wage is owed. A gift is not."],
   "titleCard": ["The gift no one earns.", END]},
], NOTE)

write("faith", "Faith: trusting the one who promised", P("faith"), [
  {"id": "trust", "kicker": "What faith is", "level": 0.2, "lines": [
    "Faith, in the Bible's sense, is trust in God and in what he has promised. It's not a leap in the dark, and it doesn't grow stronger the less evidence it has.",
    "It's the answer a person gives to someone who has spoken and has proved reliable."],
   "scripture": S("Hebrews 11:1", "Now faith is the assurance of what we hope for and the certainty of what we do not see.")},
  {"id": "abraham", "kicker": "Abraham", "level": 0.4, "lines": [
    "Abraham is the pattern. Old and childless, he was told his family would be like the stars, and he believed, centuries before the law.",
    "Abram believed the LORD, and it was credited to him as righteousness.",
    "The same Abraham also doubted and schemed. Biblical faith is not a flawless mood. It's reliance that is tested and deepened."],
   "scripture": S("Genesis 15:6", "Abram believed the LORD, and it was credited to him as righteousness.", True)},
  {"id": "seed", "kicker": "A mustard seed", "level": 0.55, "lines": [
    "In the Gospels, faith is not a force the believer generates. It's reliance on Jesus himself, which is why a mustard seed of it is enough.",
    "Its strength was never in the believing. It's in the one believed."],
   "scripture": S("Hebrews 12:2", "Let us fix our eyes on Jesus, the author and perfecter of our faith")},
  {"id": "doubt", "kicker": "An honest prayer", "level": 0.7, "lines": [
    "A father brought his suffering son to Jesus, and prayed one of the most honest prayers in the Gospels.",
    "I do believe; help my unbelief!",
    "His faith was mixed and struggling, and Jesus answered it. Doubt brought to Jesus is still coming to Jesus."],
   "scripture": S("Mark 9:24", "I do believe; help my unbelief!", True)},
  {"id": "hearing", "kicker": "How faith grows", "level": 0.6, "lines": [
    "Faith grows the way trust between persons grows: by hearing and remembering what the other has said and done.",
    "That's why Scripture keeps retelling the exodus, and why Paul ties faith to hearing the word."],
   "scripture": S("Romans 10:17", "Consequently, faith comes by hearing, and hearing by the word of Christ.")},
  {"id": "faithful", "kicker": "Faith and faithfulness", "level": 0.65, "lines": [
    "The Bible's word for faith is also its word for faithfulness, so trust doesn't stay private. It obeys, endures, and keeps its promises.",
    "Churches describe the link between faith and works in different words, and none of them teaches that faith earns salvation. This film takes no side."],
   "scripture": S("James 2:17", "So too, faith by itself, if it does not result in action, is dead.")},
  {"id": "walk", "kicker": "Walking on", "level": 0.8, "lines": [
    "Hebrews eleven is a list of people who acted on what God had said without seeing the outcome. Many died still waiting.",
    "Faith doesn't deny the darkness. It holds to the one who has spoken in it, and walks on.",
    "For we walk by faith, not by sight."],
   "scripture": S("2 Corinthians 5:7", "For we walk by faith, not by sight.", True)},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Its strength is in the one believed."],
   "titleCard": ["Trusting the one who promised.", END]},
], NOTE)

write("gospel-in-a-minute", "The gospel in a minute", P("gospel-in-a-minute"), [
  {"id": "gift", "kicker": "A gift", "level": 0.2, "lines": [
    "The story starts with a gift, not a problem. God made human beings in his own image, to know him and to love him forever. Nothing stood between people and God."]},
  {"id": "break", "kicker": "A break", "level": 0.4, "lines": [
    "People turned from God to their own way, and every one of us has followed. Sin is a break: with God, with each other, inside ourselves."]},
  {"id": "towers", "kicker": "Our towers", "level": 0.5, "lines": [
    "Every age builds its towers: be good enough, try harder, earn your way back. The gap is too wide for us to cross."]},
  {"id": "sends", "kicker": "God crosses the gap", "level": 0.65, "lines": [
    "Then God crosses the gap from his own side. The Father sends the Son because he loves the world, and the Son becomes one of us, fully God and fully man."]},
  {"id": "cross", "kicker": "The cross and the empty tomb", "level": 0.85, "lines": [
    "At the cross the break is mended, and God is the one who mends it. Jesus died for our sins, and on the third day he was raised, in his body."],
   "scripture": S("1 Corinthians 15:3-4", "that Christ died for our sins according to the Scriptures, that He was buried, that He was raised on the third day according to the Scriptures")},
  {"id": "receive", "kicker": "Received, not earned", "level": 0.7, "lines": [
    "The gift is received, not earned. Turn around, and trust him. Faith is not a work that pays for anything. It's empty hands taking what is given."]},
  {"id": "new", "kicker": "New life", "level": 0.75, "lines": [
    "Those who belong to Christ are forgiven, made God's children, and given new life, now and in the life to come."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Read more on LiveWell, or talk it over with a pastor or someone you trust."],
   "titleCard": ["The gospel in a minute.", END]},
], NOTE)
