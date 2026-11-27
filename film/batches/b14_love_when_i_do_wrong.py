"""Batch 14 film: "Does God still love me when I do wrong?" (love-when-i-do-wrong), rebuilt from the Bible Explorer
film client/public/explorer/films/love-when-i-do-wrong.json and its rows in docs/work/elite/explorer-ledger.md
("love 1" to "love 7", "love think", "love, left out"); the Study Bible notes for Luke 15
(client/public/bible/notes/luke/15.json and client/public/bible/notes/luke/verses/15.json); and the doctrine pages
client/public/bible/doctrines/love.json, repentance.json and justification.json. No Honest Answer in
client/src/data/answers.ts answers this question directly, so none is used.
The old film's care line stays on the page, untouched, and is not in the narration. No fear is used as a lever, nothing
is said about anyone's eternal state, and there is no altar call. Where readers differ (the rehearsed speech, Kenneth
Bailey's cultural readings, whether the parable makes the cross unnecessary, the older brother), the views are named
fairly."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions and ledger rows), the Study Bible notes on Luke 15, and the doctrine pages on love, repentance and justification; every claim is sourced in film/love-when-i-do-wrong/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("love-when-i-do-wrong", "Does God still love me when I do wrong?", P("love-when-i-do-wrong"), [
  {"id": "question", "kicker": "A heavy question", "level": 0.2, "lines": [
    "You did something wrong, and a heavy question follows: has God turned away from me?",
    "Religious leaders once grumbled that Jesus welcomed sinners and ate with them.",
    "He answered with three stories of something lost and found. Luke calls them one parable. The last is about a father and two sons."],
   "scripture": S("Luke 15:2", "This man welcomes sinners and eats with them.")},
  {"id": "left", "kicker": "A son who left", "level": 0.3, "lines": [
    "The younger son asks for his share of the estate while his father is still alive. That was unusual.",
    "He turns family land into cash, leaves for a distant country, and wastes it all. The Greek word means wastefully, recklessly. That's what prodigal means.",
    "Nothing in the story pretends this was small."]},
  {"id": "senses", "kicker": "The lowest point", "level": 0.35, "lines": [
    "Then famine. Feeding pigs for a Gentile and envying their food was the lowest point imaginable for a Jewish son.",
    "He came to his senses and rehearsed a speech. Father, I have sinned against heaven and against you. Then a request to be hired as a servant.",
    "Readers differ on that speech. It echoes Pharaoh's words to Moses, so some hear a bargain. Others hear the Bible's ordinary form of confession."]},
  {"id": "ran", "kicker": "The father ran", "level": 0.6, "lines": [
    "So he got up and went to his father. But while he was still in the distance, his father saw him and was filled with compassion. He ran to his son, embraced him, and kissed him.",
    "The father's love is moved before any confession.",
    "Kenneth Bailey argued that an old landowner running in public was shameful. Critics reply that the evidence for that is late. Either way, he ran."],
   "scripture": S("Luke 15:20", "So he got up and went to his father. But while he was still in the distance, his father saw him and was filled with compassion. He ran to his son, embraced him, and kissed him.", True)},
  {"id": "unfinished", "kicker": "The unfinished speech", "level": 0.55, "lines": [
    "The son starts his speech. The father never lets him reach the part about being a servant. Robe, ring and sandals answer it instead.",
    "Pause here and ask yourself. What speech have you rehearsed for God? This son was embraced before he said a word of his.",
    "For this son of mine was dead and is alive again! He was lost and is found!"],
   "scripture": S("Luke 15:24", "For this son of mine was dead and is alive again! He was lost and is found!", True)},
  {"id": "matters", "kicker": "Wrong still matters", "level": 0.45, "lines": [
    "Does that make wrong small? No. Repentance is the human side of being found by God. The father's welcome runs ahead of it. It doesn't cancel it.",
    "In 1937 Dietrich Bonhoeffer called forgiveness without repentance cheap grace.",
    "And real love corrects. Love isn't measured by what it permits, but by what it gives."],
   "scripture": S("Hebrews 12:6", "For the Lord disciplines the one He loves")},
  {"id": "cross", "kicker": "Then why the cross?", "level": 0.5, "lines": [
    "Weigh a fair objection. The father forgives with no sacrifice and no payment. So is the cross unnecessary?",
    "Faustus Socinus argued that God, like a creditor, can simply cancel a debt. Jewish readers add that God has always received the one who returns. There's truth in that.",
    "But a parable makes a few points, not every point. Paul names the cost. God proves His love for us in this: While we were still sinners, Christ died for us."],
   "scripture": S("Romans 5:8", "God proves His love for us in this: While we were still sinners, Christ died for us.", True)},
  {"id": "accounts", "kicker": "Not self-punishment", "level": 0.4, "lines": [
    "Some people believe all this and still keep their own accounts. The books never balance.",
    "Repentance isn't self-punishment. You don't have to feel sorry enough before God will listen. It's turning around and going home.",
    "If we confess our sins, He is faithful and just to forgive us our sins."],
   "scripture": S("1 John 1:9", "If we confess our sins, He is faithful and just to forgive us our sins", True)},
  {"id": "older", "kicker": "The brother outside", "level": 0.45, "lines": [
    "The older son never left, yet he refuses to come in. He counts his years at home like wages.",
    "So the father goes out to him too. Son, you are always with me, he says.",
    "Most commentators, Christian and Jewish, read him as a warning to religious people of every kind, Christians included, who resent mercy shown to others.",
    "The story ends with him outside, deciding. Pause here and ask yourself which son you're more like today."],
   "scripture": S("Luke 15:31", "and all that is mine is yours")},
  {"id": "close", "kicker": "Nothing can separate", "level": 0.3, "lines": [
    "Many find it easier to serve God than to believe he delights in them. But he set his love on his people because he loved them.",
    "If your own father was absent or cruel, that picture may be hard. Jesus told the same love as a shepherd, and a woman sweeping her house.",
    "And nothing in all creation can separate his people from it."],
   "scripture": S("Romans 8:39", "nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."),
   "titleCard": ["The welcome runs ahead of the confession. It never makes the wrong small.", END]},
], NOTE)
