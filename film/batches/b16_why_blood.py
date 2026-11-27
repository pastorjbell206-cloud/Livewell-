"""Batch 16 film: "Sacrifice: why blood?" (slug why-blood), a hard-question film that takes the modern objection to
sacrifice at its strongest and answers it from Leviticus, the prophets and Hebrews. Sources, and nothing else: the old
Bible Explorer film client/public/explorer/films/why-blood.json (older captions, differ note) with its rows in
docs/work/elite/explorer-ledger.md ("why-blood 1, 2" to "why-blood, left out"); the doctrine page
client/public/bible/doctrines/atonement.json (definition, ot, nt, history, differ, errors); the Study Bible notes
client/public/bible/notes/leviticus/16.json and 17.json, hebrews/9.json and 10.json, with their verses/ files.
The sibling films the-lamb (Abraham, Passover, the Lamb) and why-jesus-died (the New Testament pictures of the cross)
are not repeated. Animal death is named, never described. Where Christians differ on the atonement, the views are named
and no side is taken. The old film's care line stays on its page and is not in the narration.
Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film why-blood (with its explorer-ledger rows), the Study Bible's atonement doctrine page, and the Study Bible notes on Leviticus 16 and 17 and Hebrews 9 and 10."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
END = "LiveWell by James Bell"

write("why-blood", "Sacrifice: why blood?", "/study/explorer/watch/why-blood", [
  {"id": "objection", "kicker": "Why would God want blood?", "level": 0.2, "lines": [
    "Blood runs through the Bible. To many people, sacrifice looks primitive and violent, like an angry God who must be paid off.",
    "At its strongest: in 1793 Immanuel Kant argued that guilt is the most personal of all debts. Someone else can pay your money debt, but not your guilt.",
    "Pause here and ask yourself: is that what the Bible means by sacrifice?"]},
  {"id": "true", "kicker": "What's true in it", "level": 0.3, "lines": [
    "Some of this is fair. Israel's neighbors had rites for cleansing temples and carrying evil away. And Hebrews raises the objection itself.",
    "It is impossible for the blood of bulls and goats to take away sins.",
    "Yet Leviticus has no incantations, no demons to appease, no magic."],
   "scripture": S("Hebrews 10:4", "it is impossible for the blood of bulls and goats to take away sins.", True)},
  {"id": "life", "kicker": "The life is in the blood", "level": 0.35, "lines": [
    "Why blood? The law answers in one sentence.",
    "For the life of the flesh is in the blood, and I have given it to you to make atonement for your souls upon the altar.",
    "Blood stands for life; blood poured out is a life given.",
    "And notice who's speaking. I have given it to you. Sacrifice isn't a bribe offered to a reluctant god. It's a gift God appoints, so he can live among a sinful people without consuming them."],
   "scripture": S("Leviticus 17:11", "For the life of the flesh is in the blood, and I have given it to you to make atonement for your souls upon the altar", True)},
  {"id": "offerings", "kicker": "Five kinds of offering", "level": 0.45, "lines": [
    "Leviticus names five offerings. The burnt, the grain, and the peace offering, shared in a meal. The sin offering, which Jacob Milgrom called a purification offering. And the guilt offering, which came with paying back what was taken.",
    "These covered unintentional sins. For defiant sin the law gave no sacrifice, though repentance and confession opened the way to mercy."]},
  {"id": "day", "kicker": "One day a year", "level": 0.55, "lines": [
    "Once a year came the Day of Atonement. The high priest alone, in plain linen, went behind the veil.",
    "In Leviticus, sin stains the place where God lives. Milgrom compared the sanctuary to the portrait of Dorian Gray, which records its owner's corruption.",
    "Blood cleansed the sanctuary. Then the people's sins were confessed over a second goat, which wasn't killed but sent into the wilderness. Sin cleansed, and sin carried away."],
   "scripture": S("Leviticus 16:30", "because on this day atonement will be made for you to cleanse you, and you will be clean from all your sins before the LORD.")},
  {"id": "prophets", "kicker": "Mercy, not sacrifice", "level": 0.6, "lines": [
    "The prophets push back. Through Hosea, God says, I desire mercy, not sacrifice. Micah asks whether God wants thousands of rams, and answers:",
    "And what does the LORD require of you but to act justly, to love mercy, and to walk humbly with your God?",
    "They didn't abolish the altar. They refused to let ritual replace repentance. The Mishnah says the Day of Atonement doesn't cover a wrong against your neighbor until you've made it right.",
    "Which is harder: bringing an offering, or going back to the person you wronged?"],
   "scripture": S("Micah 6:8", "And what does the LORD require of you but to act justly, to love mercy, and to walk humbly with your God?", True)},
  {"id": "hebrews", "kicker": "Every year again", "level": 0.65, "lines": [
    "Hebrews reads that day point by point. The high priest went in once a year, never without blood, and again the next year.",
    "That repetition was a confession: those sacrifices couldn't cleanse the conscience. But Christ is priest and sacrifice at once.",
    "He entered the Most Holy Place once for all by His own blood, thus securing eternal redemption."],
   "scripture": S("Hebrews 9:12", "He entered the Most Holy Place once for all by His own blood, thus securing eternal redemption.", True)},
  {"id": "seated", "kicker": "The priest sat down", "level": 0.75, "lines": [
    "There was no chair in the tabernacle. Priests stood; their work was never finished. Hebrews says Christ offered one sacrifice and sat down.",
    "And where these have been forgiven, an offering for sin is no longer needed.",
    "The sacrifice that ends sacrifices. Many Jewish readers see the old rite as complete in its own terms; after the temple fell in AD 70, they kept the day through prayer, fasting and repentance."],
   "scripture": S("Hebrews 10:18", "And where these have been forgiven, an offering for sin is no longer needed.", True)},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.6, "lines": [
    "How does the cross save? No council ever defined one theory.",
    "Penal substitution says Christ bore the judgment sinners deserved. Satisfaction, after Anselm in 1098, says his obedience repaired the offense to God's honor. Christus Victor says the cross defeated sin, death and the devil.",
    "Moral influence says it shows God's love and wins ours. The governmental view of Hugo Grotius says it upholds God's just rule. This film doesn't choose."]},
  {"id": "answer", "kicker": "Back to the question", "level": 0.8, "lines": [
    "So, an angry God who needs appeasing? Scholars argued over one Greek word: C. H. Dodd in 1931 for removing sin, Leon Morris in 1955 for turning away wrath. Many now hold it means both, and that God provides the sacrifice.",
    "To Kant, Christian theologians answer that the cross isn't a debt passed between strangers. It's the act of one who is both God and the head of his people.",
    "Ask the opening question again. In Leviticus, who gives the blood?"],
   "titleCard": ["Never a bribe we bring to God. A gift God gives.", END]},
], NOTE)
