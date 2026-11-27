"""Batch 15 film: "Psalm 23: the LORD is my shepherd" (slug psalm-23), a verse film that reads the psalm slowly,
one picture at a time. Sources, and nothing else: the old Bible Explorer film client/public/explorer/films/psalm-23.json
(older captions) with its rows in docs/work/elite/explorer-ledger.md ("psalm 1 to 6", "psalm 7", "psalm, care and left
out"); the Study Bible notes client/public/bible/notes/psalms/23.json (there is no verses/23.json); and the John 10
notes client/public/bible/notes/john/10.json with client/public/bible/notes/john/verses/10.json (verses 11 and 12-13).
Grief is named, death is never described. Authorship ("of David") is given both ways and no side is taken.
The old film's care line stays on its page and is not in the narration.
Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film psalm-23 (with its explorer-ledger rows) and the Study Bible notes on Psalm 23 and John 10 (client/public/bible/notes/psalms/23.json, john/10.json and john/verses/10.json)."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
END = "LiveWell by James Bell"

write("psalm-23", "Psalm 23: the LORD is my shepherd", "/study/explorer/watch/psalm-23", [
  {"id": "shepherd", "kicker": "A king who is a sheep", "level": 0.2, "lines": [
    "Psalm 23 is the best-known psalm in the Bible. Read it slowly, one picture at a time.",
    "The LORD is my shepherd; I shall not want.",
    "In the ancient Near East, kings called themselves shepherds. Hammurabi of Babylon, in the eighteenth century BC, does it in the prologue to his laws. And God charged David to shepherd his people Israel.",
    "Psalm 23 turns that around. The king is the sheep."],
   "scripture": S("Psalm 23:1", "The LORD is my shepherd; I shall not want.", True)},
  {"id": "david", "kicker": "A Psalm of David", "level": 0.3, "lines": [
    "The heading says, A Psalm of David. Traditional readers note that David kept sheep before he was king. Many modern scholars read the heading as marking a collection, not an author.",
    "No event is named, and it's been prayed in every generation because it isn't tied to one."],
   "scripture": S("Psalm 23:1", "A Psalm of David.")},
  {"id": "pastures", "kicker": "Green pastures", "level": 0.35, "lines": [
    "Shepherding in Judah was hard, dangerous work in dry country. Green grass and quiet water had to be found, sometimes far away.",
    "He makes me lie down in green pastures; He leads me beside quiet waters.",
    "Sheep won't lie down unless they're fed and unafraid. Pause and ask yourself what you want most, and what it would take for you to rest."],
   "scripture": S("Psalm 23:2", "He makes me lie down in green pastures; He leads me beside quiet waters.", True)},
  {"id": "paths", "kicker": "Right paths", "level": 0.45, "lines": [
    "He restores my soul; He guides me in the paths of righteousness for the sake of His name.",
    "Paths of righteousness can mean right paths: tracks that lead where they should, not dead ends.",
    "And notice why: for his name's sake. He's faithful to his own name."],
   "scripture": S("Psalm 23:3", "He restores my soul; He guides me in the paths of righteousness for the sake of His name.", True)},
  {"id": "valley", "kicker": "The dark valley", "level": 0.55, "lines": [
    "Then the path drops into a ravine. The Hebrew word, traditionally the shadow of death, may simply mean deep darkness, where danger hides.",
    "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me.",
    "Listen to the grammar turn. Until now the psalmist has spoken about God. At the darkest point, near the center of the poem, he speaks to him.",
    "If you've come to this psalm carrying grief, notice what it doesn't promise. It doesn't promise a road around the valley. It promises company in it."],
   "scripture": S("Psalm 23:4", "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me", True)},
  {"id": "rod", "kicker": "The rod and the staff", "level": 0.6, "lines": [
    "Your rod and Your staff, they comfort me.",
    "The rod was a club for driving off predators, the staff a longer stick for guiding and rescuing.",
    "Comfort here isn't softness. It's someone armed and attentive, standing between the flock and whatever hunts it."],
   "scripture": S("Psalm 23:4", "Your rod and Your staff, they comfort me.", True)},
  {"id": "table", "kicker": "A table before enemies", "level": 0.65, "lines": [
    "Now the picture shifts from shepherd to host.",
    "You prepare a table before me in the presence of my enemies.",
    "A host who took a guest into his tent was bound to protect him, even from pursuers. So this is a fugitive welcomed as an honored guest while his enemies watch, unable to act.",
    "Weigh this: the table is spread while the enemies are still there. Is that a smaller comfort, or a deeper one?"],
   "scripture": S("Psalm 23:5", "You prepare a table before me in the presence of my enemies.", True)},
  {"id": "cup", "kicker": "Oil and a full cup", "level": 0.7, "lines": [
    "You anoint my head with oil; my cup overflows.",
    "Oil on a guest's head meant welcome and honor. A cup that runs over meant lavish generosity. The guest gets more than safety."],
   "scripture": S("Psalm 23:5", "You anoint my head with oil; my cup overflows.", True)},
  {"id": "pursued", "kicker": "Pursued by goodness", "level": 0.75, "lines": [
    "Surely goodness and mercy will follow me all the days of my life,",
    "Mercy here is chesed: loving devotion, the loyal love God has pledged to his people, love that holds when they have no claim on it.",
    "And follow can mean pursue. Enemies hunted him. Now goodness and loving devotion pursue him, all his days."],
   "scripture": S("Psalm 23:6", "Surely goodness and mercy will follow me all the days of my life", True)},
  {"id": "house", "kicker": "Home at the end", "level": 0.6, "lines": [
    "and I will dwell in the house of the LORD forever.",
    "The Hebrew, as traditionally read, says I will return. The ancient Greek says dwell, spelled almost the same. Either way, the psalm ends at home in God's presence.",
    "The psalm that began in a field ends in a house."],
   "scripture": S("Psalm 23:6", "and I will dwell in the house of the LORD forever.", True)},
  {"id": "good-shepherd", "kicker": "The good shepherd", "level": 0.8, "lines": [
    "The prophets promised that God himself would shepherd his scattered people, and set over them one shepherd from David's line. Centuries later, Jesus said,",
    "I am the good shepherd. The good shepherd lays down His life for the sheep.",
    "Good means the shepherd as a shepherd ought to be. A hired hand runs from the wolf. This shepherd lays down his life, in order to take it up again.",
    "The New Testament never quotes Psalm 23 directly. But it adds this: the shepherd who walks with his sheep through the dark valley went into death for them."],
   "scripture": S("John 10:11", "I am the good shepherd. The good shepherd lays down His life for the sheep.", True),
   "titleCard": ["Not a road around the valley, but company in it.", END]},
], NOTE)
