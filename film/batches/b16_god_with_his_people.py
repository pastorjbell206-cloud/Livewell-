"""Batch 16 film: "God with his people" (god-with-his-people), a "big idea" film tracing one theme from Genesis to
Revelation, rebuilt from the Bible Explorer film client/public/explorer/films/god-with-his-people.json (its older
captions) and its rows in docs/work/elite/explorer-ledger.md ("God with his people", every frame), with the dwelling
thread in client/public/explorer/threads.json that the old film quotes; the doctrine page
client/public/bible/doctrines/temple.json (definition, ot, nt, differ, errors); the Explorer's Sinai stop
client/public/explorer/stops/sinai.json (story.older and the "Walk into the tent" steps); and the Study Bible notes
client/public/bible/notes/exodus/40.json, 1-kings/8.json, ezekiel/10.json, john/1.json and john/verses/1.json (verse 14).
The old film has no care line. The fall of the temple is mentioned only in passing (the temple-destroyed film tells it).
Where Christians differ (Eden as a sanctuary; Ezekiel's temple) the views are named from the doctrine page and no side
is taken; nothing in the film scorns the temple or the Jewish people, as the doctrine page's "errors" section asks."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions and ledger rows), the doctrine page on the temple, the Sinai stop, and the Study Bible notes on Exodus 40, 1 Kings 8, Ezekiel 10 and John 1; every claim is sourced in film/god-with-his-people/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("god-with-his-people", "God with his people", P("god-with-his-people"), [
  {"id": "garden", "kicker": "A God who walks", "level": 0.2, "lines": [
    "The whole Bible can be read as one long answer to a question. Can God live with his people?",
    "It starts in a garden. The man and his wife heard the voice of the LORD God walking in the garden in the breeze of the day."],
   "scripture": S("Genesis 3:8", "the voice of the LORD God walking in the garden in the breeze of the day", True)},
  {"id": "shut", "kicker": "The way shut", "level": 0.3, "lines": [
    "Then they hid from his presence, and they were sent out.",
    "Cherubim were stationed on the east side of the garden to guard the way to the tree of life.",
    "Could God and people be together again?"],
   "scripture": S("Genesis 3:24", "stationed cherubim on the east side of the Garden of Eden, along with a whirling sword of flame to guard the way to the tree of life.")},
  {"id": "tent", "kicker": "A tent in the camp", "level": 0.4, "lines": [
    "After the rescue from Egypt, at Sinai, God gave Moses the plan for a tent.",
    "They are to make a sanctuary for Me, so that I may dwell among them.",
    "The holy God of the mountain was going to live in a tent in the middle of the camp.",
    "Then came the golden calf, and Moses pleaded, “If Your Presence does not go with us,” and added, “do not lead us up from here.”"],
   "scripture": S("Exodus 25:8", "they are to make a sanctuary for Me, so that I may dwell among them.", True)},
  {"id": "filled", "kicker": "The glory moves in", "level": 0.5, "lines": [
    "Then the cloud covered the Tent of Meeting, and the glory of the LORD filled the tabernacle.",
    "The Hebrew verb for the cloud settling is shakan, the root of mishkan, tabernacle. Yet even Moses couldn't go inside.",
    "Pause here and ask yourself. Exodus ends with God moving in, not with Israel reaching the land. Why might his presence be the better ending?"],
   "scripture": S("Exodus 40:34", "Then the cloud covered the Tent of Meeting, and the glory of the LORD filled the tabernacle.", True)},
  {"id": "temple", "kicker": "Heaven can't contain him", "level": 0.5, "lines": [
    "Around 960 BC, at Solomon's temple in Jerusalem, the cloud came again, and the priests couldn't stand there to minister.",
    "Solomon prayed: Even heaven, the highest heaven, cannot contain You, much less this temple I have built.",
    "The temple wasn't where God was trapped. It was where his Name dwelt, the place to pray toward."],
   "scripture": S("1 Kings 8:27", "Even heaven, the highest heaven, cannot contain You, much less this temple I have built.", True)},
  {"id": "leaves", "kicker": "The glory leaves", "level": 0.6, "lines": [
    "About 592 BC, Ezekiel, an exile in Babylon, saw the glory leave the temple, from the threshold to the east gate, then to the mountain east of the city.",
    "Six years later Babylon burned the temple, a story with its own film.",
    "God called himself a sanctuary for the exiles, and Ezekiel saw the glory return to a renewed temple."],
   "scripture": S("Ezekiel 10:18", "Then the glory of the LORD moved away from the threshold of the temple")},
  {"id": "immanuel", "kicker": "God with us", "level": 0.55, "lines": [
    "Then Matthew tells of a child: they will call Him Immanuel, which he translates, “God with us.”",
    "The Gospels present Jesus as the place where God now dwells."],
   "scripture": S("Matthew 1:23", "they will call Him Immanuel", True)},
  {"id": "word", "kicker": "He pitched his tent", "level": 0.65, "lines": [
    "John says it with a tent. The Word became flesh and made His dwelling among us.",
    "His verb, skēnoō, means to pitch a tent. The Word tabernacled among us.",
    "The New Testament uses it four more times, all in Revelation.",
    "We have seen His glory, John writes. The glory of the tabernacle is seen in the flesh of Jesus."],
   "scripture": S("John 1:14", "The Word became flesh and made His dwelling among us.", True)},
  {"id": "church", "kicker": "A temple made of people", "level": 0.55, "lines": [
    "When Jesus died, the veil of the temple was torn from top to bottom. God opened the way in.",
    "Then Paul writes to a divided church. Do you not know that you yourselves are God’s temple, and that God’s Spirit dwells in you?",
    "In Greek that you is plural. The church together is the sanctuary, people in every place.",
    "Pause and ask yourself. Why might God choose to live in people, and not only in a building?"],
   "scripture": S("1 Corinthians 3:16", "Do you not know that you yourselves are God’s temple, and that God’s Spirit dwells in you?", True)},
  {"id": "differ", "kicker": "A fair question", "level": 0.4, "lines": [
    "Here's a fair question to weigh. Is this pattern really in the Bible, or are readers putting it there?",
    "Genesis never calls Eden a temple. Gordon Wenham in 1986 and G. K. Beale in 2004 read it as the first sanctuary. Daniel Block, in 2013, saw a royal garden more than a sanctuary.",
    "Christians differ on Ezekiel's temple too. Dispensational readers expect it built in a coming kingdom. Most Reformed, Catholic and Orthodox readers, and many Protestants, see it fulfilled in Christ and the church.",
    "How much the writers intended is still debated. And none of it scorns the temple. Jesus called it his Father's house."]},
  {"id": "home", "kicker": "At home with us", "level": 0.3, "lines": [
    "The Bible's last vision answers its first question. Behold, the dwelling place of God is with man, and He will dwell with them.",
    "John saw no temple in the city, because the Lord God Almighty and the Lamb are its temple.",
    "The city is a cube, like the temple's inner sanctuary. The whole city is the Most Holy Place.",
    "It began with God walking in a garden. It ends with God at home among his people."],
   "scripture": S("Revelation 21:3", "Behold, the dwelling place of God is with man, and He will dwell with them.", True),
   "titleCard": ["From a garden to a city, God makes his home with us.", END]},
], NOTE)
