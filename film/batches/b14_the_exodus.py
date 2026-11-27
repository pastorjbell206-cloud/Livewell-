"""Batch 14 film: "The Exodus: out of Egypt" (slug the-exodus). Sources, and nothing else: the old Bible Explorer film
client/public/explorer/films/the-exodus.json (older captions) with its rows in docs/work/elite/explorer-ledger.md
(rescue rows; "Why, the Passover lamb"); the Study Bible notes client/public/bible/notes/exodus/intro.json, 12.json and
14.json; and the live hard-question page client/public/questions/old-testament/did-the-exodus-happen.json, whose sources
were checked in docs/work/elite/apol-pilot/old-testament/did-the-exodus-happen.md (ledger docs/work/elite/apol-ledger.md,
sixteenth run, key "ad"). The plagues and the deaths of the firstborn are named, never described. The historical
question is given at its strongest, then the evidence and the reply, with the views named and no side taken.
The old film's care line stays on its page and is not in the narration.
Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film the-exodus (with its explorer-ledger rows), the Study Bible notes on Exodus 12 and 14 and the Exodus introduction, and the hard-question page client/public/questions/old-testament/did-the-exodus-happen.json (record docs/work/elite/apol-pilot/old-testament/did-the-exodus-happen.md, apol-ledger key ad)."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
END = "LiveWell by James Bell"

write("the-exodus", "The Exodus: out of Egypt", "/study/explorer/watch/the-exodus", [
  {"id": "slaves", "kicker": "Slaves in Egypt", "level": 0.2, "lines": [
    "The whole Bible keeps pointing back to one rescue. In Egypt, Abraham's family has become a nation of slaves, their lives bitter with hard labor in brick and mortar.",
    "So God heard their groaning, and He remembered His covenant with Abraham, Isaac, and Jacob."],
   "scripture": S("Exodus 2:24", "So God heard their groaning, and He remembered His covenant with Abraham, Isaac, and Jacob.", True)},
  {"id": "lord", "kicker": "Who is the real lord?", "level": 0.35, "lines": [
    "From a bush that burns and isn't burned up, God sends a reluctant shepherd, Moses, to Pharaoh. Pharaoh answers with a question: who is the LORD, that I should obey him?",
    "Ten plagues reply, judgment, Exodus says, against all the gods of Egypt. The last is the death of the firstborn."],
   "scripture": S("Exodus 5:2", "Who is the LORD that I should obey His voice and let Israel go?")},
  {"id": "passover", "kicker": "The night of the Passover", "level": 0.5, "lines": [
    "Each household marks its doorframe with a lamb's blood. Israel isn't spared because its people are better. A lamb dies in their place.",
    "When I see the blood, I will pass over you.",
    "It was a night of great sadness in Egypt, and Jewish tradition remembers it with gratitude and with grief.",
    "A child at the table asks, “What does this service mean to you?” Pause and ask it yourself. Why begin a year of worship with one night?"],
   "scripture": S("Exodus 12:13", "when I see the blood, I will pass over you.", True)},
  {"id": "sea", "kicker": "Through the sea", "level": 0.65, "lines": [
    "Pharaoh changes his mind and pursues with his chariots. Trapped between an army and the water, the people panic. Moses says,",
    "The LORD will fight for you; you need only to be still.",
    "All night a strong east wind drives back the sea, and people who couldn't save themselves walk through on dry ground."],
   "scripture": S("Exodus 14:14", "The LORD will fight for you; you need only to be still.", True)},
  {"id": "song", "kicker": "A song on the far shore", "level": 0.75, "lines": [
    "On the far shore Miriam leads the women with tambourines and dancing.",
    "The LORD is my strength and my song, and He has become my salvation.",
    "Many scholars argue from its language that this song is among the oldest poems in the Hebrew Bible. Others date it later."],
   "scripture": S("Exodus 15:2", "The LORD is my strength and my song, and He has become my salvation.", True)},
  {"id": "silence", "kicker": "Did it happen?", "level": 0.4, "lines": [
    "The hard question: no Egyptian text mentions Israel's slavery, the plagues, or the departure.",
    "Its most influential statement is The Bible Unearthed, by Israel Finkelstein and Neil Asher Silberman, in 2001. Exodus counts about 600,000 men on foot, besides women and children. That's two million or more, larger than all of Canaan then.",
    "Forty years of wandering should leave pottery, hearths, graves. Sinai has yielded nothing that fits. So, they argued, the exodus is best read as a later national epic."],
   "scripture": S("Exodus 12:37", "about 600,000 men on foot, besides women and children")},
  {"id": "true", "kicker": "What's true in it", "level": 0.4, "lines": [
    "Much of that is true. Nothing from Egypt or Sinai confirms the story directly, and the numbers are a real difficulty. Christians made it worse with claims like chariot wheels on the sea floor, which don't survive scrutiny."]},
  {"id": "evidence", "kicker": "What the silence means", "level": 0.5, "lines": [
    "Weigh this before the answer: would Egypt's monuments keep the memory of Egypt's humiliation?",
    "The Egyptologist James Hoffmeier argued in 1997 that Egypt's royal records rarely record defeats, and herders in tents leave little to find.",
    "What survives fits the setting: Semitic peoples in the eastern Nile Delta, a royal city named Rameses, Egyptian names like Moses and Phinehas. About 1208 BC, Pharaoh Merneptah's inscription already names Israel as a people in Canaan."]},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.45, "lines": [
    "The date is argued. Counting back from First Kings 6:1 gives about 1446 BC. Others point to the name Rameses and place it in the thirteenth century.",
    "The numbers are argued too. Some take them as written. Others note that elef, the Hebrew word for thousand, can also mean a clan, which makes the company far smaller. Some think a smaller group's escape became the whole people's story. This film doesn't choose."]},
  {"id": "remember", "kicker": "A memory at the center", "level": 0.6, "lines": [
    "Critics reply that peoples invent humble origins. Livy says crowds fled to Romulus's new city, free and slave alike.",
    "Defenders answer that Rome's humble start is a detail. Israel's slavery is the center of its life. Its law begins,",
    "I am the LORD your God, who brought you out of the land of Egypt, out of the house of slavery.",
    "Archaeology can't prove the exodus, and the date, the numbers, and the route are still open."],
   "scripture": S("Exodus 20:2", "I am the LORD your God, who brought you out of the land of Egypt, out of the house of slavery.", True)},
  {"id": "lamb", "kicker": "Our Passover lamb", "level": 0.8, "lines": [
    "Christians read this rescue as the pattern of a greater one. At a Passover meal, Jesus called the cup the new covenant in his blood.",
    "For Christ, our Passover lamb, has been sacrificed.",
    "As God brought Israel out of slavery through death and water, so in Christ he brings his people out of sin and death. They receive that rescue. They don't earn it."],
   "scripture": S("1 Corinthians 5:7", "For Christ, our Passover lamb, has been sacrificed.", True),
   "titleCard": ["The God who hears, and brings his people out.", END]},
], NOTE)
