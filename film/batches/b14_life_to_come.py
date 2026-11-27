"""Batch 14 film: "The life to come" (life-to-come), rebuilt from the Bible Explorer film
client/public/explorer/films/life-to-come.json and its rows ("life 1" to "life 7", "life, left out") in
docs/work/elite/explorer-ledger.md; the Study Bible doctrine pages client/public/bible/doctrines/new-creation.json,
hope.json, judgment.json and hell.json; the live hard-question page client/public/questions/evil/hell-and-the-justice-of-god.json
(record docs/work/elite/apol-pilot/evil/hell-and-the-justice-of-god.md; ledger docs/work/elite/apol-ledger.md, key "am");
and the Honest Answer "is-hell-forever-or-does-it-end" in client/src/data/answers.ts.
The old film's care line, and the hell page's pointers to grief, heaven and eternity, and Find Help, stay on their pages,
untouched, and are not in the narration. Death is named, never described; no fire or torment is pictured, nothing is
said of any person's fate, and there is no altar call. The three views of hell (eternal conscious punishment,
conditional immortality, the hope of universal restoration) are named as the sources give them, each with its own
difficulty, and none is chosen. Death and the time between are left to the sibling film, when-we-die."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions and ledger rows), the Study Bible's studies of the new creation, hope, judgment and hell, the hard-question page on hell and the justice of God, and the Honest Answer on whether hell is forever; every claim is sourced in film/life-to-come/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("life-to-come", "The life to come", P("life-to-come"), [
  {"id": "ending", "kicker": "How it ends", "level": 0.2, "lines": [
    "What happens when we die is one question. This film asks how the whole story ends.",
    "Christian hope is specific: Christ's return, the dead raised in their bodies, the world judged in righteousness, and a renewed creation.",
    "The creed of Constantinople, in 381, ends right there, looking for the resurrection of the dead, and the life of the world to come."]},
  {"id": "enemy", "kicker": "An enemy, named", "level": 0.3, "lines": [
    "The Bible doesn't pretend death is nothing. Jesus wept at his friend's grave. And Paul calls death an enemy.",
    "The last enemy to be destroyed is death."],
   "scripture": S("1 Corinthians 15:26", "The last enemy to be destroyed is death.", True)},
  {"id": "seed", "kicker": "A seed, not a ghost", "level": 0.45, "lines": [
    "So the final hope isn't a soul floating away. It's the body raised, as Jesus' body was.",
    "In 1955, at Harvard, Oscar Cullmann argued that the New Testament hopes for resurrection, not the Greek idea of an immortal soul. Critics thought he overdrew it. He still changed the conversation.",
    "Paul's picture is a seed. What is sown is perishable; it is raised imperishable.",
    "Pause here and ask yourself. If bodies will be raised, does what we do with bodies now matter more than we thought?"],
   "scripture": S("1 Corinthians 15:42", "What is sown is perishable; it is raised imperishable.", True)},
  {"id": "down", "kicker": "Heaven comes down", "level": 0.55, "lines": [
    "The Bible's last pages don't show people leaving the earth for the sky. They show the holy city coming down out of heaven from God.",
    "Around 180, Irenaeus argued that what passes away is the world's present form, not its substance. God doesn't say, I make new things. He says, Behold, I make all things new.",
    "Christians differ on whether this creation will be renewed or replaced, and on whether its center is the renewed earth or seeing God's face. This film doesn't choose."],
   "scripture": S("Revelation 21:5", "Behold, I make all things new.", True)},
  {"id": "judge", "kicker": "Every wrong named", "level": 0.5, "lines": [
    "Then comes judgment. To us the word sounds like condemnation. In Scripture, to judge is to set things right: to stop the oppressor and rescue the oppressed.",
    "After the wars in the former Yugoslavia, Miroslav Volf argued that only those who trust God to judge can lay down the sword of revenge.",
    "Weigh it yourself. Would a world with no final judgment be kinder, or would it tell those who suffered most that it didn't matter?"],
   "scripture": S("Acts 17:31", "He has set a day when He will judge the world with justice by the Man He has appointed.")},
  {"id": "objection", "kicker": "The hardest question", "level": 0.6, "lines": [
    "But judgment raises the hardest question. What about hell?",
    "In 1927 Bertrand Russell said, I do not myself feel that any person who is really profoundly humane can believe in everlasting punishment.",
    "The argument is about proportion. A just punishment fits the wrong. Human wrongs are finite. Endless suffering isn't.",
    "The Christian philosopher Marilyn McCord Adams asked the same in 1993. And grant what's true: the church has sometimes preached hell with relish, and used fear of it to control people."]},
  {"id": "views", "kicker": "Three answers", "level": 0.55, "lines": [
    "Most of the church, with Augustine and the Reformation confessions, holds that the lost suffer conscious separation from God without end. C. S. Lewis wrote that the doors of hell are locked on the inside.",
    "Others hold conditional immortality: God alone is immortal, and the finally impenitent at last perish. Edward Fudge argued it in 1982.",
    "A smaller number, from Origen and Gregory of Nyssa to Thomas Talbott, hope God's love will restore all. Most of the church's confessions reject that hope."]},
  {"id": "cost", "kicker": "Each carries a cost", "level": 0.5, "lines": [
    "Each answer carries a real difficulty. The first must face the proportion argument, and a suffering that heals no one.",
    "The second must explain why Jesus set eternal punishment beside eternal life in one sentence. The third must face his warnings, which speak of no way back.",
    "This film doesn't choose. Pause and ask yourself which difficulty seems heaviest, and why."]},
  {"id": "reply", "kicker": "Not God's pleasure", "level": 0.45, "lines": [
    "The strongest reply is Dostoevsky's Ivan Karamazov. I want to forgive. I want to embrace. I don't want more suffering.",
    "The Christian answer begins by refusing one picture. Hell is not God's pleasure. Do I take any pleasure in the death of the wicked? declares the Lord GOD.",
    "Judgment is borne by God before it falls on anyone. And no one knows who will be lost. Judgment belongs to Christ, who wept over Jerusalem."],
   "scripture": S("Ezekiel 18:23", "Do I take any pleasure in the death of the wicked? declares the Lord GOD.", True)},
  {"id": "home", "kicker": "God at home", "level": 0.3, "lines": [
    "The best thing about the new world isn't its river or its gates. It's that God lives there. The God who wept at a grave will wipe away every tear himself.",
    "Behold, the dwelling place of God is with man, and He will dwell with them."],
   "scripture": S("Revelation 21:3", "Behold, the dwelling place of God is with man, and He will dwell with them.", True),
   "titleCard": ["Not souls leaving the world, but God making his home in it.", END]},
], NOTE)
