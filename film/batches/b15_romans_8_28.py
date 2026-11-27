"""Batch 15 film: "Romans 8:28: what it promises, and what it does not" (romans-8-28), rebuilt from the Bible Explorer
film client/public/explorer/films/romans-8-28.json (its older captions, think question and differ note) and its rows in
docs/work/elite/explorer-ledger.md ("romans 1" to "romans 6, 7", "romans, care and left out"); the Study Bible notes for
Romans 8 (client/public/bible/notes/romans/8.json and client/public/bible/notes/romans/verses/8.json); and the doctrine
page client/public/bible/doctrines/providence.json.
The old film's care line stays on the page, untouched, and is not in the narration. Suffering is named, never
described, and no reason is given for any loss. The misuse ("everything happens for a reason") is named in order to be
weighed, never offered as an answer. Where Christians differ (how verse 29's "foreknew" relates to faith; how God's
governing relates to human freedom), the views are named fairly and no side is taken."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions, differ note and ledger rows), the Study Bible notes on Romans 8, and the doctrine page on providence; every claim is sourced in film/romans-8-28/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("romans-8-28", "Romans 8:28: what it promises, and what it does not", P("romans-8-28"), [
  {"id": "reached", "kicker": "A verse people reach for", "level": 0.2, "lines": [
    "Someone gets a hard diagnosis, or loses a person they love. And a friend, meaning well, says: everything happens for a reason.",
    "And we know that God works all things together for the good of those who love Him, who are called according to His purpose.",
    "Few verses are quoted more often to people in pain, and few are quoted more carelessly."],
   "scripture": S("Romans 8:28", "And we know that God works all things together for the good of those who love Him, who are called according to His purpose.", True)},
  {"id": "true", "kicker": "What the slogan wants", "level": 0.3, "lines": [
    "Take the slogan seriously. It reaches for something Christians believe and call providence.",
    "God keeps the world in being. He works in and through everything that happens in it, and he directs it toward the ends he has purposed.",
    "But the slogan turns it into a code to crack, as if every loss came with a readable reason. Jesus refused that. Asked about eighteen people killed when a tower fell at Siloam, he denied they were worse sinners."]},
  {"id": "read", "kicker": "Read it slowly", "level": 0.35, "lines": [
    "Pause here and ask yourself. Does the verse say that everything is good? Read it again before you answer.",
    "It doesn't. In our translation the subject is God. Some early manuscripts write the word God in; others don't. Either way, the sense is God's active purpose.",
    "That is both more modest and more solid than the slogan."]},
  {"id": "all", "kicker": "What all things means", "level": 0.45, "lines": [
    "What does all things cover? In this chapter: present sufferings, a creation in bondage to decay, and the list in verse 35.",
    "Much of that list came from Paul's own life. He'd been beaten, shipwrecked and jailed.",
    "He never calls those things good. He says they cannot defeat God's purpose."],
   "scripture": S("Romans 8:35", "Who shall separate us from the love of Christ? Shall trouble or distress or persecution or famine or nakedness or danger or sword?")},
  {"id": "groan", "kicker": "Room to groan", "level": 0.5, "lines": [
    "The verses just before are full of groaning. Creation groans. Believers groan. And the Spirit himself intercedes with groans too deep for words.",
    "Paul doesn't treat groaning as a failure of faith. The Spirit helps us in our weakness, he says, and the word for helps means taking hold of a burden together with someone.",
    "Verse 26 says what we don't know: how to pray. Verse 28 says what we do know. The promise was written from inside grief."],
   "scripture": S("Romans 8:26", "the Spirit helps us in our weakness.", True)},
  {"id": "good", "kicker": "What the good is", "level": 0.55, "lines": [
    "So what is the good? Paul leaves it open for one sentence, then defines it.",
    "To be conformed to the image of His Son.",
    "Not comfort. Not success. The good is becoming like Jesus, and nothing can defeat that purpose."],
   "scripture": S("Romans 8:29", "to be conformed to the image of His Son", True)},
  {"id": "joseph", "kicker": "One event, two intentions", "level": 0.5, "lines": [
    "The Bible's classic picture of this is Joseph, sold by his own brothers.",
    "Years later he tells them: what you intended against me for evil, God intended for good.",
    "The same Hebrew verb, chashav, is used of the brothers and of God. One event, two intentions. The brothers are guilty of theirs. Joseph neither excuses them nor pretends the evil was good."],
   "scripture": S("Genesis 50:20", "what you intended against me for evil, God intended for good", True)},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.4, "lines": [
    "Here's a fair question to weigh. If God works in all things, how does that fit with real human choices?",
    "Reformed readers, from Calvin on, say God ordains all that happens, through real human causes. Arminians, from Arminius and Wesley on, say he permits much he doesn't cause. Molinists, after Luis de Molina, point to what God knows free creatures would do.",
    "They read foreknew in verse 29 differently too, yet agree its goal is likeness to Christ. And Reformed, Lutheran, Catholic and Wesleyan traditions alike deny that God is the author of sin."]},
  {"id": "not", "kicker": "What it does not promise", "level": 0.35, "lines": [
    "And it doesn't promise that the illness will lift, or that the loss will be explained.",
    "The verse does not promise that all things are good, only that God is working in all of them. Joseph understood his story only years later. Job never learned of the scene in heaven.",
    "Pause here and ask yourself. Has this verse ever been quoted to you too quickly? What would it have sounded like with the whole chapter read to you?"]},
  {"id": "nothing", "kicker": "Nothing can separate", "level": 0.3, "lines": [
    "Because the chapter ends with what the promise rests on. He who did not spare His own Son but gave Him up for us all.",
    "In all these things, Paul says, not by escaping them, believers are more than conquerors. The victory is inside suffering, not after it.",
    "And nothing in all creation will be able to separate them from the love of God in Christ Jesus. The chapter that opened with no condemnation ends with no separation."],
   "scripture": S("Romans 8:38-39", "nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."),
   "titleCard": ["It doesn't say everything is good. It says God is at work in all of it, and nothing can separate.", END]},
], NOTE)
