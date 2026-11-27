"""Batch 17 film: "Light and Darkness" (light-and-darkness), a "big idea" film that follows the light thread through the Bible.
Rebuilt from the Bible Explorer film client/public/explorer/films/light-and-darkness.json (its "older" captions and its
think question; it has no differ note and no care line) and its rows in docs/work/elite/explorer-ledger.md (the
"Light and darkness" table, rows 1 to 7, "quotations in captions", "pictures" and "left out"); the doctrine pages
client/public/bible/doctrines/glory.json and god.json; and the Study Bible notes for Genesis 1, Exodus 10, 13 and 34,
Psalm 27, Isaiah 9, John 8, Matthew 5 and Revelation 21 (client/public/bible/notes/<book>/<chapter>.json). Darkness is
night, the deep and shadow over a land; it is never a name for any people, and nothing in the film ties it to skin.
God is called light only in Scripture's own words, and nothing in the film would need God drawn. How the redeemed will
see God is given three views (glory.json, differ) and the film takes no side. The nations streaming to the light
(Isaiah 49 and 60:1-3) are left to the sibling film all-nations, the return from exile to exile-and-home, and the
kingdom sayings of the Sermon on the Mount to kingdom-of-god."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions, think question and ledger rows), the doctrine pages on glory and on God, and the Study Bible notes on Genesis 1, Exodus 10, 13 and 34, Psalm 27, Isaiah 9, John 8, Matthew 5 and Revelation 21; every claim is sourced in film/light-and-darkness/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("light-and-darkness", "Light and Darkness", P("light-and-darkness"), [
  {"id": "first-light", "kicker": "Let there be light", "level": 0.2, "lines": [
    "The Bible's first picture is dark: darkness over the surface of the deep.",
    "In Babylon's creation epic, the Enuma Elish, the god Marduk kills the sea goddess Tiamat and makes the sky from her body. Genesis has no battle.",
    "God simply speaks. And God said, “Let there be light,” and there was light."],
   "scripture": S("Genesis 1:3", "And God said, “Let there be light,” and there was light.", True)},
  {"id": "lights", "kicker": "Lights with a job", "level": 0.25, "lines": [
    "The sun and moon, worshiped across the ancient world, aren't even named. They're the greater light to rule the day and the lesser light to rule the night.",
    "Lamps with a job: to shine, and to mark the days, the seasons and the years."],
   "scripture": S("Genesis 1:16", "the greater light to rule the day and the lesser light to rule the night", True)},
  {"id": "egypt", "kicker": "Light where they lived", "level": 0.3, "lines": [
    "In Egypt, one of Pharaoh's titles was Son of Re, the sun god.",
    "At Moses' gesture, darkness covered Egypt for three days. The Hebrew word is the one Genesis used for the dark over the deep. For Egypt, creation runs backward.",
    "No one could see anyone else. Yet all the Israelites had light in their dwellings."],
   "scripture": S("Exodus 10:23", "Yet all the Israelites had light in their dwellings.", True)},
  {"id": "pillar", "kicker": "A fire ahead", "level": 0.35, "lines": [
    "Out of Egypt, God led his people himself.",
    "The LORD went before them in a pillar of cloud to guide their way by day, and in a pillar of fire to give them light by night.",
    "The light doesn't only shine now. It leads."],
   "scripture": S("Exodus 13:21", "the LORD went before them in a pillar of cloud to guide their way by day, and in a pillar of fire to give them light by night", True)},
  {"id": "moses", "kicker": "A face that shone", "level": 0.4, "lines": [
    "At Sinai, Moses asked to see God's glory, and was told that no one can see God's face and live.",
    "Coming down the mountain, he was unaware that his face had become radiant from speaking with the LORD. It reflected a glory not his own.",
    "Pause here. Moses didn't know he was shining. People who speak with God often reflect him without knowing it. Who comes to mind?"],
   "scripture": S("Exodus 34:29", "he was unaware that his face had become radiant from speaking with the LORD", True)},
  {"id": "my-light", "kicker": "My light", "level": 0.4, "lines": [
    "In the ancient world light meant life and safety, and darkness meant danger and death. Psalm 27 makes God's light personal: The LORD is my light and my salvation.",
    "Weigh a fair question. The same psalm faces an army without fear, then cries out to God in urgent fear. Can confidence and fear share one prayer?"],
   "scripture": S("Psalm 27:1", "The LORD is my light and my salvation", True)},
  {"id": "great-light", "kicker": "A great light", "level": 0.45, "lines": [
    "Zebulun and Naphtali, in Galilee, were the first lands of Israel to fall to Assyria, in 733 and 732 BC. Isaiah promises them: The people walking in darkness have seen a great light.",
    "The first land to go dark is promised the first light. Matthew quotes these words when Jesus settles in Capernaum, in that very region."],
   "scripture": S("Isaiah 9:2", "The people walking in darkness have seen a great light", True)},
  {"id": "feast", "kicker": "At the feast of lamps", "level": 0.55, "lines": [
    "At the Feast of Tabernacles, the Mishnah says, great lamps were lit in the temple courts. They recalled the pillar of fire.",
    "There Jesus says: I am the light of the world. Whoever follows Me will never walk in the darkness, but will have the light of life.",
    "In John, light and darkness aren't two equal powers. The Light shines in the darkness, and the darkness has not overcome it."],
   "scripture": S("John 8:12", "I am the light of the world. Whoever follows Me will never walk in the darkness, but will have the light of life.", True)},
  {"id": "hearts", "kicker": "Light in the heart", "level": 0.55, "lines": [
    "Paul hears Genesis again. For God, who said, “Let light shine out of darkness,” made His light shine in our hearts.",
    "That light is the glory of God in the face of Jesus Christ. Moses was refused a face. Now the glory has one.",
    "And John writes: God is light, and in Him there is no darkness at all."],
   "scripture": S("2 Corinthians 4:6", "For God, who said, “Let light shine out of darkness,” made His light shine in our hearts", True)},
  {"id": "you-are", "kicker": "You are the light", "level": 0.6, "lines": [
    "Then Jesus tells his disciples: You are the light of the world. Not try to become. Are.",
    "A small clay lamp under a grain measure helps no one. Lamps go on stands, so others see the good deeds and glorify the Father, not the lamp.",
    "Pause here. Whose room could your lamp light?"],
   "scripture": S("Matthew 5:14", "You are the light of the world", True)},
  {"id": "no-night", "kicker": "No more night", "level": 0.7, "lines": [
    "The last pages show a city with no need of sun or moon, because the glory of God illuminates the city, and the Lamb is its lamp. And they will see His face.",
    "Christians differ on that seeing. The Western tradition, Augustine to Aquinas: God himself. The Orthodox, after Gregory Palamas: his uncreated light, his essence still beyond us. Many Reformed writers, after John Owen: always in the face of Christ.",
    "There will be no more night in the city."],
   "scripture": S("Revelation 22:5", "There will be no more night in the city", True),
   "titleCard": ["The darkness has not overcome it. One day there will be no night at all.", END]},
], NOTE)
