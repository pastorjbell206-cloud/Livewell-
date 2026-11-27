"""Batch 15 film: "David and Goliath" (slug david-and-goliath). Sources, and nothing else: the old Bible Explorer film
client/public/explorer/films/david-and-goliath.json (older captions) with its rows in docs/work/elite/explorer-ledger.md
(david 1 to 7, left out, care); the Study Bible notes client/public/bible/notes/1-samuel/17.json and its plain reading
client/public/bible/notes/1-samuel/plain/17.json; the 1 Samuel introduction client/public/bible/notes/1-samuel/intro.json;
and the wisdom topic client/public/wisdom/entry/courage.json. A Bible story, not a hard question: the story is told, the
textual questions the notes raise (Goliath's height, the shorter Greek chapter, Saul's question) are given with the views
named and no side taken, and the "believe in yourself" reading is weighed against what the notes say the text does.
Goliath's death is named, never described (no beheading, no wound). The old film's care line stays on its page and is
not in the narration. Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film david-and-goliath (with its explorer-ledger rows), the Study Bible notes on 1 Samuel 17 (with their plain reading) and the 1 Samuel introduction, and the wisdom topic Courage and Fear (client/public/wisdom/entry/courage.json)."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
END = "LiveWell by James Bell"

write("david-and-goliath", "David and Goliath", "/study/explorer/watch/david-and-goliath", [
  {"id": "valley", "kicker": "Two hills, one valley", "level": 0.2, "lines": [
    "The Valley of Elah runs from the hills of Judah toward the Philistine plain, a natural road for an army pushing inland.",
    "The Philistines stood on one hill and the Israelites stood on another, with the valley between them.",
    "Israel's king is Saul, chosen to fight its battles, a head taller than his men. For forty days he doesn't move."],
   "scripture": S("1 Samuel 17:3", "The Philistines stood on one hill and the Israelites stood on another, with the valley between them.", True)},
  {"id": "champion", "kicker": "The man of the between", "level": 0.35, "lines": [
    "Morning and evening a champion comes out from Gath: Goliath. The Hebrew word for champion appears only in this chapter. It means the man of the between, who steps into the space between two armies.",
    "Bronze helmet, armor of roughly 125 pounds, a spear shaft like a weaver's beam. One man for a whole people.",
    "Saul and all the Israelites were dismayed and greatly afraid."],
   "scripture": S("1 Samuel 17:11", "Saul and all the Israelites were dismayed and greatly afraid.", True)},
  {"id": "height", "kicker": "How tall was he?", "level": 0.4, "lines": [
    "How tall? The standard Hebrew text says six cubits and a span, about nine and a half feet. The Dead Sea Scrolls copy of Samuel and the Greek translation say four cubits and a span. Still a giant in his day.",
    "The oldest Greek manuscripts also lack whole stretches of this chapter, which suggests it circulated in more than one form."],
   "scripture": S("1 Samuel 17:4", "He was six cubits and a span in height")},
  {"id": "errand", "kicker": "A boy with bread", "level": 0.45, "lines": [
    "David, the youngest of Jesse's eight sons, brings grain and bread to his brothers. Goliath shouts, the soldiers run, and David asks,",
    "Just who is this uncircumcised Philistine, that he should defy the armies of the living God?",
    "What the soldiers hear as a threat to Israel, David hears as an insult to the living God.",
    "Pause here and ask yourself: two groups hear the same words. Why does one hear only danger, and the other hear God's name?"],
   "scripture": S("1 Samuel 17:26", "Just who is this uncircumcised Philistine, that he should defy the armies of the living God?", True)},
  {"id": "memory", "kicker": "Lions, bears, and memory", "level": 0.5, "lines": [
    "Saul says, you're just a boy. David answers with memory.",
    "The LORD, who delivered me from the claws of the lion and the bear, will deliver me from the hand of this Philistine.",
    "Faith here is memory put to work in a new danger. The king's armor doesn't fit. David takes it off and chooses five smooth stones. A sling wasn't a toy. Armies had trained slingers."],
   "scripture": S("1 Samuel 17:37", "The LORD, who delivered me from the claws of the lion and the bear, will deliver me from the hand of this Philistine.", True)},
  {"id": "name", "kicker": "In the name of the LORD", "level": 0.65, "lines": [
    "The center of the chapter is a speech, not a stone. Goliath curses David by his gods. David comes in the name of the LORD of Hosts, so the whole world will know there is a God in Israel.",
    "It is not by sword or spear that the LORD saves; for the battle is the LORD’s."],
   "scripture": S("1 Samuel 17:47", "it is not by sword or spear that the LORD saves; for the battle is the LORD’s", True)},
  {"id": "stone", "kicker": "One stone", "level": 0.75, "lines": [
    "David runs toward the battle line. One stone, and the champion falls facedown.",
    "Thus David prevailed over the Philistine with a sling and a stone, without a sword in his hand.",
    "Israel, frozen for forty days, charges. From here David's fame grows, and so does Saul's jealousy."],
   "scripture": S("1 Samuel 17:50", "Thus David prevailed over the Philistine with a sling and a stone", True)},
  {"id": "question", "kicker": "Whose son is this?", "level": 0.45, "lines": [
    "One old puzzle: in chapter 16 David already serves Saul as his harpist. Yet now Saul asks whose son he is.",
    "Some say Saul, tormented, didn't recognize him. Others note a royal marriage was promised to the winner's family, so he's asking about the father. Many scholars think two accounts sit side by side. The text doesn't settle it."],
   "scripture": S("1 Samuel 17:55", "Abner, whose son is this young man?")},
  {"id": "reading", "kicker": "Is it about you?", "level": 0.5, "lines": [
    "Weigh this before the answer: is this a story about believing in yourself, as if brave small people always beat big strong ones?",
    "The chapter itself says the opposite. David isn't trusting himself. He trusts the God whose name Goliath insulted.",
    "Readers still differ. Some draw from David a courage rooted in knowing whose battle it is. Others warn that First Samuel isn't a set of moral examples to copy."]},
  {"id": "hillside", "kicker": "The soldiers on the hill", "level": 0.8, "lines": [
    "Readers have long seen this pattern filled out in Christ, though the chapter is a battle story, not an allegory.",
    "David fights for a people too afraid to fight, and his victory becomes theirs. Most readers are not David here. They're the soldiers on the hillside, delivered by another.",
    "Jesus came to free those who all their lives were held in slavery by their fear of death.",
    "So ask where you'd stand on that hill, and who went down into the valley for you."],
   "scripture": S("Hebrews 2:15", "free those who all their lives were held in slavery by their fear of death.", True),
   "titleCard": ["Most of us are on the hillside. The battle is the LORD's.", END]},
], NOTE)
