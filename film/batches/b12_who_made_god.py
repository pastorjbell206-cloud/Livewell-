"""Batch 12 film: "Who made God?" (slug who-made-god). Sources, and nothing else: the old Bible Explorer film
client/public/explorer/films/who-made-god.json (older captions) with its rows in docs/work/elite/explorer-ledger.md
("Who made God?" rows); the live hard-question page client/public/questions/god/who-made-god.json, whose sources were
checked in docs/work/elite/apol-pilot/god/who-made-god.md; and the Honest Answer "does-god-actually-exist" in
client/src/data/answers.ts. The full cosmological case belongs to the sibling film does-god-exist and is left out here.
The old film has no care line. Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-26 from the Bible Explorer film who-made-god (with its explorer-ledger rows), the hard-question page client/public/questions/god/who-made-god.json (record docs/work/elite/apol-pilot/god/who-made-god.md), and the Honest Answer does-god-actually-exist in client/src/data/answers.ts."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
END = "LiveWell by James Bell"

write("who-made-god", "Who made God?", "/study/explorer/watch/who-made-god", [
  {"id": "fair", "kicker": "A fair question", "level": 0.2, "lines": [
    "Everything we meet came from something. You have parents. A tree came from a seed.",
    "So here's a fair question, one children and philosophers both ask. If everything needs a cause, who made God?"]},
  {"id": "russell", "kicker": "Russell's question", "level": 0.35, "lines": [
    "Bertrand Russell gave it its plainest form, in a London lecture of 1927 published as Why I Am Not a Christian.",
    "At eighteen he read John Stuart Mill's Autobiography. Mill's father had taught him that the question “Who made me?” can't be answered, because it raises another: “Who made God?”",
    "Russell's conclusion: “If everything must have a cause, then God must have a cause. If there can be anything without a cause, it may just as well be the world as God.”"]},
  {"id": "dawkins", "kicker": "Who designed the designer?", "level": 0.45, "lines": [
    "Richard Dawkins sharpened it in The God Delusion, in 2006: a God able to design a universe would have to be supremely complex, and so at least as improbable as the universe he's meant to explain.",
    "Then God doesn't end the chain of questions. He starts a worse one."]},
  {"id": "true", "kicker": "What's true in it", "level": 0.4, "lines": [
    "A good deal of this is right. Christians have sometimes argued as if everything has a cause, and stated that way, the argument refutes itself.",
    "And a designer pictured as a very complex being inside the universe, built from parts, would need explaining as much as anything he made."]},
  {"id": "narrower", "kicker": "Read the fine print", "level": 0.5, "lines": [
    "Pause here and ask yourself: do the serious arguments really say everything has a cause? Or something narrower?",
    "Something narrower. In William Lane Craig's form, the kalam argument says whatever begins to exist has a cause. It says nothing about what never began.",
    "Leibniz in 1714, and Aquinas long before him, wrote about things that might not have existed. None of them says everything has a cause. Each says a certain kind of thing does."]},
  {"id": "link", "kicker": "Not one more link", "level": 0.6, "lines": [
    "So who made God is a fair question aimed at the wrong target. God, as Christians confess him, didn't begin, couldn't fail to be, and has no parts whose joining would need a cause.",
    "Aquinas called God altogether simple, without parts. He isn't a very large thing inside the universe, needing a maker. He's the one on whom everything else depends."]},
  {"id": "everlasting", "kicker": "From everlasting", "level": 0.7, "lines": [
    "Scripture speaks of God the same way.",
    "Before the mountains were born or You brought forth the earth and the world, from everlasting to everlasting You are God.",
    "Nothing made him, and nothing keeps him going."],
   "scripture": S("Psalm 90:2", "Before the mountains were born or You brought forth the earth and the world, from everlasting to everlasting You are God.", True)},
  {"id": "parity", "kicker": "Then why not the world?", "level": 0.6, "lines": [
    "The strongest reply is Russell's parity. You've granted that something exists without a cause outside itself. Then why not the universe, or its most basic laws?",
    "It's a serious reply. Now the question isn't who made God, but which candidate can bear that weight.",
    "The universe shows marks of something that might have been otherwise. Hume suggested it might be necessary in a way we don't understand. Observation can't rule that out, or rule out God. Argument has to decide."]},
  {"id": "burden", "kicker": "Whose burden?", "level": 0.55, "lines": [
    "Then the second half: isn't proof the believer's job? Russell imagined a china teapot circling the sun, too small for any telescope. No one could disprove it, and no one would be obliged to believe it.",
    "Antony Flew argued in 1972 that the burden of proof lies on whoever affirms. He's partly right. Anyone who says God exists owes reasons.",
    "Weigh this before the answer: what does the teapot explain? Nothing. Nothing would be different without it.",
    "God is proposed to explain what everyone sees: a world that's ordered and knowable, and some things really wrong. The believer carries that burden. The unbeliever who says the universe needs no explanation carries one too."]},
  {"id": "open", "kicker": "Still open", "level": 0.4, "lines": [
    "Some things stay unresolved: whether a necessary being is a coherent idea, whether a necessary universe is a real alternative, and how to weigh either view before the evidence.",
    "Christians differ too, on how to state God's simplicity; Alvin Plantinga questioned its strong form in 1980. What all confess is that God is uncreated and eternal, and that everything else exists because he wills it."],
   "scripture": S("Revelation 4:11", "You created all things; by Your will they exist and came to be.")},
  {"id": "close", "kicker": "I AM", "level": 0.3, "lines": [
    "At the bush that burned and wasn't burned up, Moses asked God's name. The answer was “I AM WHO I AM.”",
    "Every explanation has to stop somewhere. Ask yourself where yours stops, and why."],
   "scripture": S("Exodus 3:14", "I AM WHO I AM", True),
   "titleCard": ["Not the first link. The reason there's a chain.", END]},
], NOTE)
