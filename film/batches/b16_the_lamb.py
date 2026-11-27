"""Batch 16 film: "Sacrifice and the Lamb" (the-lamb), a "big idea" film that follows the lamb thread through the Bible.
Rebuilt from the Bible Explorer film client/public/explorer/films/the-lamb.json (its "older" captions, its think question
and its differ note) and its rows in docs/work/elite/explorer-ledger.md ("lamb fall" to "lamb new-creation", "lamb 1" to
"lamb 7", "lamb, differ", "lamb, left out"); the doctrine page client/public/bible/doctrines/atonement.json; the Study
Bible notes for Genesis 22, Exodus 12, Isaiah 53 and John 1 (client/public/bible/notes/<book>/<chapter>.json); and, for
the three stops the old film did not cover, the Study Bible notes for Genesis 4 (Abel), Exodus 29 (the daily lambs) and
Revelation 5 (the Lamb on the throne). The old film's care line stays on the page, untouched, and is not in the narration.
Animal death and the crucifixion are named, never described. Isaiah's servant is given both readings (Christian and
Jewish) and the film takes no side; the Gospels' Passover timing is named as a question scholars weigh. Nothing blames the
Jewish people. Why sacrifice and blood at all (Leviticus 17) is left to the sibling film why-blood, and the pictures of the
atonement to why-jesus-died."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions, differ note and ledger rows), the doctrine page on atonement, and the Study Bible notes on Genesis 4 and 22, Exodus 12 and 29, Isaiah 53, John 1 and Revelation 5; every claim is sourced in film/the-lamb/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("the-lamb", "Sacrifice and the Lamb", P("the-lamb"), [
  {"id": "question", "kicker": "Where is the lamb?", "level": 0.2, "lines": [
    "A son climbs a mountain with his father, carrying wood for a fire. He asks the question this whole film follows.",
    "The fire and the wood are here, but where is the lamb for the burnt offering?",
    "Hold that question. The Bible takes a long time to answer it."],
   "scripture": S("Genesis 22:7", "but where is the lamb for the burnt offering?", True)},
  {"id": "abel", "kicker": "The first offering", "level": 0.25, "lines": [
    "Start further back. Two brothers bring offerings. Cain brings some of the fruit of the soil.",
    "Abel brought the best portions of the firstborn of his flock. And the LORD looked with favor on Abel and his offering.",
    "Israel's law welcomed grain offerings, so the difference isn't plants against animals. It's the first and best against some. Hebrews says Abel offered by faith."],
   "scripture": S("Genesis 4:4", "Abel brought the best portions of the firstborn of his flock. And the LORD looked with favor on Abel and his offering", True)},
  {"id": "provide", "kicker": "God will provide", "level": 0.35, "lines": [
    "Back on the mountain: one of the hardest stories in the Bible. God tested Abraham, then stopped him. The later law and prophets forbid ever offering a child.",
    "Abraham had answered his son: God Himself will provide the lamb for the burnt offering, my son.",
    "He offered a ram caught by its horns in place of his son, and named the place The LORD Will Provide.",
    "A ram that day, not a lamb. Christians have long heard in Abraham's answer a promise God himself would keep."],
   "scripture": S("Genesis 22:8", "God Himself will provide the lamb for the burnt offering, my son.", True)},
  {"id": "passover", "kicker": "One per household", "level": 0.4, "lines": [
    "In Egypt, centuries later, before the first Passover, each man must select a lamb for his family, one per household.",
    "Israel wasn't spared because its people were better. A lamb died in their place, and their door was marked. That night was a night of great sadness in Egypt.",
    "Israel kept the feast every year, so children would ask what it means."],
   "scripture": S("Exodus 12:3", "each man must select a lamb for his family, one per household", True)},
  {"id": "daily", "kicker": "Morning and evening", "level": 0.4, "lines": [
    "At the tabernacle, God set a rhythm: two lambs a year old, every day. Offer one lamb in the morning and the other at twilight.",
    "Its Hebrew name, the Tamid, means continual. At the temple it went on for centuries.",
    "Weigh a fair question. If the offering never stopped, what does that tell you? Hebrews answers: the same sacrifices, again and again, can never take away sins."],
   "scripture": S("Exodus 29:39", "Offer one lamb in the morning and the other at twilight.", True)},
  {"id": "servant", "kicker": "Like a lamb", "level": 0.5, "lines": [
    "Then Isaiah sees a person, not an animal: a servant who suffers for others, and says nothing.",
    "He was led like a lamb to the slaughter, and as a sheep before her shearers is silent, so He did not open His mouth.",
    "Centuries later an Ethiopian official reads it and asks: who is the prophet talking about, himself or someone else?",
    "Christians, from the first church on, read the servant as Jesus. Many Jewish readers, Rashi among them, read him as the people of Israel."],
   "scripture": S("Isaiah 53:7", "He was led like a lamb to the slaughter, and as a sheep before her shearers is silent, so He did not open His mouth.", True)},
  {"id": "look", "kicker": "Look, the Lamb", "level": 0.55, "lines": [
    "Then, by the Jordan, John the Baptist sees Jesus coming and says: Look, the Lamb of God, who takes away the sin of the world.",
    "Next day he says it again. One title gathers every strand: the lamb God provides, the Passover lamb, the daily lambs, the silent servant.",
    "In the 1510s, Matthias Grünewald painted John beside the cross, with a long pointing finger and a lamb at his feet."],
   "scripture": S("John 1:29", "Look, the Lamb of God, who takes away the sin of the world", True)},
  {"id": "passover-again", "kicker": "At Passover", "level": 0.6, "lines": [
    "Jesus died at Passover. John's Gospel dates it to the day of Preparation for the Passover, when the lambs were being killed.",
    "Matthew, Mark and Luke make the Last Supper a Passover meal, and scholars still weigh how the timing fits. All four tie his death to Passover.",
    "John adds: not one of his bones was broken, as with the Passover lamb."],
   "scripture": S("John 19:14", "It was the day of Preparation for the Passover")},
  {"id": "throne", "kicker": "A Lion, a Lamb", "level": 0.55, "lines": [
    "In Revelation, John hears of the Lion of the tribe of Judah. He looks, and sees a Lamb.",
    "Then I saw a Lamb who appeared to have been slain, standing in the center of the throne.",
    "The Greek word is small, even tender, and Revelation calls Christ by it twenty-eight times. Standing means alive, and the marks of the cross remain.",
    "Pause here. John expected a lion. What changes when the one who rules is a lamb?"],
   "scripture": S("Revelation 5:6", "Then I saw a Lamb who appeared to have been slain, standing in the center of the throne", True)},
  {"id": "worthy", "kicker": "Worthy is the Lamb", "level": 0.7, "lines": [
    "The worship widens until every creature in heaven and on earth and under the earth and in the sea joins in.",
    "Worthy is the Lamb, who was slain, to receive power and riches and wisdom and strength and honor and glory and blessing!",
    "On the mountain, a son asked where the lamb was. The last book answers him."],
   "scripture": S("Revelation 5:12", "Worthy is the Lamb, who was slain, to receive power and riches and wisdom and strength and honor and glory and blessing!", True),
   "titleCard": ["Where is the lamb? Look: at the center of the throne.", END]},
], NOTE)
