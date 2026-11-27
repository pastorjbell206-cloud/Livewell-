"""Batch 17 film: "Exile and coming home" (exile-and-home), a "big idea" film that follows exile and homecoming through the
Bible. Rebuilt from the Bible Explorer film client/public/explorer/films/exile-and-home.json (its "older" captions and its
think question; it has no differ note) and its rows in docs/work/elite/explorer-ledger.md ("exile 1" to "exile 7",
"exile, care", "exile, left out", "all four, quotations in captions"); the doctrine page client/public/bible/doctrines/
exile.json (definition, ot, nt, history, differ, errors, life); and the Study Bible notes for Genesis 3, Psalm 137,
Jeremiah 29, Isaiah 40, Ezra 1 and 3, Nehemiah 9 and Revelation 21 (client/public/bible/notes/<book>/<chapter>.json).
The old film's care line stays on the page, untouched, and is not in the narration. The fall of Jerusalem is named, never
described. The exile is told as Israel's own prophets and prayers tell it (the cost of breaking the covenant, confessed),
and no people is blamed. Two places where readers differ are named with no side taken: who wrote Isaiah 40 to 55, and
whether the exile ended with the return (the older reading) or continued until Jesus (N. T. Wright). The doctrine page's
differ view on a modern regathering, and anything about a modern state, are left out, as the old film left them out. The
nations streaming in and Pentecost are left to the sibling film all-nations, the kingdom's announcement to kingdom-of-god,
and the city's light and "no night there" to light-and-darkness."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions, think question and ledger rows), the doctrine page on exile, and the Study Bible notes on Genesis 3, Psalm 137, Jeremiah 29, Isaiah 40, Ezra 1 and 3, Nehemiah 9 and Revelation 21; every claim is sourced in film/exile-and-home/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("exile-and-home", "Exile and coming home", P("exile-and-home"), [
  {"id": "song", "kicker": "A song far from home", "level": 0.2, "lines": [
    "Exiles sit by the rivers of a great empire. Asked for a song from home, they hang their harps on the trees.",
    "How can we sing a song of the LORD in a foreign land?",
    "The whole Bible asks it. In Scripture, home is the place where God dwells with his people."],
   "scripture": S("Psalm 137:4", "How can we sing a song of the LORD in a foreign land?", True)},
  {"id": "garden", "kicker": "The first exile", "level": 0.25, "lines": [
    "It starts in a garden. After the first sin, God sent the man out and stationed cherubim on the east side of the Garden of Eden, along with a whirling sword of flame to guard the way to the tree of life.",
    "Exile is what sin does: separation from God and from the place of blessing. Remember that guarded way."],
   "scripture": S("Genesis 3:24", "stationed cherubim on the east side of the Garden of Eden, along with a whirling sword of flame to guard the way to the tree of life", True)},
  {"id": "egypt", "kicker": "Out of Egypt", "level": 0.3, "lines": [
    "Abraham lived in the promised land as a foreigner. His family went down to Egypt and became slaves. Then God said: I have indeed seen the affliction of My people in Egypt.",
    "The exodus became Israel's great homecoming, the pattern for every rescue after it."],
   "scripture": S("Exodus 3:7", "I have indeed seen the affliction of My people in Egypt", True)},
  {"id": "babylon", "kicker": "By the rivers", "level": 0.4, "lines": [
    "The law and the prophets had warned that a broken covenant would end in scattering.",
    "Samaria fell to Assyria in 722 BC. In 587 or 586 BC, Babylon burned Jerusalem and its temple and carried many away.",
    "By the rivers of Babylon we sat and wept when we remembered Zion. Scripture doesn't hurry past that grief.",
    "Yet through Ezekiel God said: I have been a sanctuary for them in the countries to which they have gone."],
   "scripture": S("Psalm 137:1", "By the rivers of Babylon we sat and wept when we remembered Zion.", True)},
  {"id": "letter", "kicker": "Build houses", "level": 0.45, "lines": [
    "Jeremiah wrote to the exiles, against every instinct: Build houses and settle down. Plant gardens and eat their produce.",
    "Seek the prosperity of the city to which I have sent you as exiles. Pray to the LORD on its behalf.",
    "Pause here. Pray for the city that carried you away? What would that take?",
    "Return would come after seventy years, so most adults who first heard the letter would die in Babylon. The hope was real, and long."],
   "scripture": S("Jeremiah 29:7", "Seek the prosperity of the city to which I have sent you as exiles. Pray to the LORD on its behalf", True)},
  {"id": "comfort", "kicker": "Comfort, comfort", "level": 0.45, "lines": [
    "Another voice speaks to the exiles: Comfort, comfort My people, says your God. It pictures the way home as a new exodus.",
    "Who wrote these chapters is debated. Tradition says Isaiah of Jerusalem, in the eighth century BC, speaking ahead; most critical scholars say an unnamed prophet of the exile. Either way, they speak to exiles."],
   "scripture": S("Isaiah 40:1", "Comfort, comfort My people", True)},
  {"id": "return", "kicker": "The long road back", "level": 0.55, "lines": [
    "In 539 BC Cyrus of Persia took Babylon and let the exiles go: may he go to Jerusalem in Judah and build the house of the LORD.",
    "They laid the new temple's foundation. Many shouted for joy; the old, who had seen the first temple, wept.",
    "Years later, back in the land, a prayer still confessed: here we are today as slaves in the land You gave our fathers."],
   "scripture": S("Ezra 1:3", "may he go to Jerusalem in Judah and build the house of the LORD", True)},
  {"id": "over", "kicker": "Were they home?", "level": 0.5, "lines": [
    "Weigh a fair question. Was the exile over?",
    "The older reading says yes: God kept his word under Cyrus, and the promises bigger than the return are fulfilled in Christ.",
    "N. T. Wright argues that many Jews of Jesus' day believed the exile hadn't truly ended, and that Jesus announced its end. Scholars still weigh both."]},
  {"id": "jesus", "kicker": "The way home opened", "level": 0.6, "lines": [
    "Mark opens with Isaiah's words to the exiles: Prepare the way for the Lord. The good news begins as God coming back to his people.",
    "Jesus told of a father who ran to his son, embraced him, and kissed him. John writes that Jesus would die to gather the scattered children of God."],
   "scripture": S("Mark 1:3", "Prepare the way for the Lord", True)},
  {"id": "strangers", "kicker": "Foreigners on the way", "level": 0.55, "lines": [
    "Yet Peter still calls believers foreigners and exiles. Hebrews says: here we do not have a permanent city, but we are looking for the city that is to come.",
    "That isn't escape from the world, and no nation is the promised home. Like Jeremiah's exiles, believers seek the good of the city where they live."],
   "scripture": S("Hebrews 13:14", "here we do not have a permanent city, but we are looking for the city that is to come", True)},
  {"id": "city", "kicker": "Home at last", "level": 0.7, "lines": [
    "At the end, a loud voice from the throne: Behold, the dwelling place of God is with man, and He will dwell with them.",
    "The tree of life, guarded since Genesis, stands by the river. The exile from Eden ends not with a return to the garden, but with a garden city where God lives with his people.",
    "Paul says it to those once far off: you are no longer strangers and foreigners."],
   "scripture": S("Revelation 21:3", "Behold, the dwelling place of God is with man, and He will dwell with them", True),
   "titleCard": ["Exile is what sin does. Coming home is what grace does.", END]},
], NOTE)
