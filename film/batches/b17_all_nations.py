"""Batch 17 film: "A blessing for all nations" (all-nations), a "big idea" film that follows the promise to Abraham through the
Bible. Rebuilt from the Bible Explorer film client/public/explorer/films/all-nations.json (its "older" captions and its
older think question; the old film has no differ note and no care line) and its rows in docs/work/elite/explorer-ledger.md
("nations creation" to "nations, left out", and the all-nations section of the run of 2026-11-25); the doctrine page
client/public/bible/doctrines/mission.json (israel.json read for the guardrail only, nothing quoted from it); and the Study
Bible notes for Genesis 11 and 12, Ruth 1 and 4, Psalm 67, Jonah 4, Isaiah 49, Matthew 2 and 28, Acts 2 and 10, and
Revelation 7 (client/public/bible/notes/<book>/<chapter>.json). Two stops the old film did not have are added from those
sources: Psalm 67 (the blessing given so it will pass on) and Cornelius (Acts 10). Isaiah's servant is given every reading
the note names and the film takes no side; the reach of "all nations" (people groups or all people) is named as debated;
Pentecost as Babel reversed is named as a thematic reading. The order is from Israel to the nations, not Israel instead of
the nations; nothing blames the Jewish people, and no modern nation, border or politics appears. Jonah's Assyria is named as
feared, its deeds are not described. Light and darkness (Isaiah 9, John 8), exile and return, and the kingdom are left to
the sibling films."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions, think question and ledger rows), the doctrine page on mission, and the Study Bible notes on Genesis 11 and 12, Ruth 1 and 4, Psalm 67, Jonah 4, Isaiah 49, Matthew 2 and 28, Acts 2 and 10, and Revelation 7; every claim is sourced in film/all-nations/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("all-nations", "A blessing for all nations", P("all-nations"), [
  {"id": "babel", "kicker": "A name for ourselves", "level": 0.2, "lines": [
    "Near the start of the Bible, people on a wide plain build a tower that reaches to the heavens, that we may make a name for ourselves.",
    "The tower is so small that the LORD must come down to see it. So the LORD scattered them from there over the face of all the earth.",
    "Judgment, and mercy too: pride gathered in one place is stopped."],
   "scripture": S("Genesis 11:8", "So the LORD scattered them from there over the face of all the earth", True)},
  {"id": "abram", "kicker": "One family, every family", "level": 0.3, "lines": [
    "The next chapter answers Babel, and the answer is surprisingly small: one old man, Abram, whose wife Sarai cannot have children.",
    "The builders wanted a name. God tells Abram, I will make your name great. And then: all the families of the earth will be blessed through you.",
    "Genesis used that Hebrew word, families, to list the scattered peoples. The promise answers Babel family by family."],
   "scripture": S("Genesis 12:3", "all the families of the earth will be blessed through you", True)},
  {"id": "ruth", "kicker": "Your God, my God", "level": 0.35, "lines": [
    "Outsiders keep walking into Israel's story: Rahab of Jericho, and Ruth from Moab, a people Israel's law kept out of the assembly.",
    "Ruth tells Naomi: your people will be my people, and your God will be my God. In her world a people and its god belonged together. She was changing both.",
    "She became the great-grandmother of King David."],
   "scripture": S("Ruth 1:16", "your people will be my people, and your God will be my God", True)},
  {"id": "psalm", "kicker": "Bless us, so that", "level": 0.4, "lines": [
    "Psalm 67 turns the priests' blessing into a prayer: bless us, that Your ways may be known on earth, Your salvation among all nations.",
    "In 1962 Johannes Blauw called Israel's role mostly centripetal: the nations drawn in to Israel's God, more than Israel sent out to them.",
    "Pause here and ask yourself: what if a blessing is a means, not an end?"],
   "scripture": S("Psalm 67:2", "that Your ways may be known on earth, Your salvation among all nations", True)},
  {"id": "jonah", "kicker": "The great city", "level": 0.45, "lines": [
    "One prophet is sent out. Jonah is told to go to Nineveh, the great city of Assyria, the most feared power of his day. He runs the other way.",
    "When God spares the city, Jonah says why he ran: I knew that You are a gracious and compassionate God, slow to anger. It's Israel's own creed, prayed as a complaint.",
    "The book ends on God's question, unanswered: So should I not care about the great city of Nineveh? It's aimed at us. Is there anyone you'd find it hard to see God bless?"],
   "scripture": S("Jonah 4:11", "So should I not care about the great city of Nineveh", True)},
  {"id": "servant", "kicker": "Not enough", "level": 0.5, "lines": [
    "Isaiah hears God tell his servant that restoring Israel is not enough: I will also make You a light for the nations, to bring My salvation to the ends of the earth.",
    "God calls the servant Israel, yet sends him to restore Israel. Readers have named the nation, a faithful remnant, the prophet himself, or a king to come.",
    "Christians, following the New Testament, read him finally as Jesus."],
   "scripture": S("Isaiah 49:6", "I will also make You a light for the nations, to bring My salvation to the ends of the earth.", True)},
  {"id": "commission", "kicker": "All nations", "level": 0.55, "lines": [
    "Early in Matthew, Magi from the east come to worship the child. The Gospel ends on a mountain, where the risen Jesus says: Therefore go and make disciples of all nations.",
    "Whether all nations means peoples as groups, as Ralph Winter and Donald McGavran stressed, or simply everyone, is still debated.",
    "The order runs from Israel to the nations, not Israel instead of the nations."],
   "scripture": S("Matthew 28:19", "Therefore go and make disciples of all nations", True)},
  {"id": "pentecost", "kicker": "In our own tongues", "level": 0.6, "lines": [
    "At Pentecost, Jewish pilgrims from every nation under heaven each hear the believers in his own language.",
    "We hear them declaring the wonders of God in our own tongues!",
    "Christians have long read this as Babel reversed, though the text never says so. The languages aren't erased. Each one carries the same message.",
    "In 863 Cyril and Methodius made an alphabet for the Slavic language, so Scripture could be heard in it."],
   "scripture": S("Acts 2:11", "we hear them declaring the wonders of God in our own tongues!", True)},
  {"id": "cornelius", "kicker": "No favorites", "level": 0.6, "lines": [
    "Can a Gentile belong fully to Israel's Messiah without first becoming Jewish?",
    "Peter goes into the house of Cornelius, a Roman officer, and says: I now truly understand that God does not show favoritism, but welcomes those from every nation who fear Him.",
    "Luke tells it, has Peter retell it, and recalls it again. Everything after hangs on that house."],
   "scripture": S("Acts 10:34-35", "God does not show favoritism, but welcomes those from every nation who fear Him", True)},
  {"id": "multitude", "kicker": "Too large to count", "level": 0.7, "lines": [
    "On the Bible's last pages John sees a multitude too large to count, from every nation and tribe and people and tongue, standing before the throne and before the Lamb.",
    "Every tongue is still there. The promise to Abraham's family has become a people from the whole world.",
    "Every believer heard this message because someone crossed a boundary to bring it. Who crossed one for you?"],
   "scripture": S("Revelation 7:9", "a multitude too large to count, from every nation and tribe and people and tongue, standing before the throne and before the Lamb", True),
   "titleCard": ["God chose one family for the sake of every family.", END]},
], NOTE)
