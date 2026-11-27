"""Batch 15 film: "John 3:16 in its chapter" (john-3-16), rebuilt from the Bible Explorer film
client/public/explorer/films/john-3-16.json (its "older" captions, its think question and its differ note) and its rows
in docs/work/elite/explorer-ledger.md ("john 1, 2" to "john 7", "john, differ", "john, care"); the Study Bible notes for
John 3 (client/public/bible/notes/john/3.json and client/public/bible/notes/john/verses/3.json); the doctrine page
client/public/bible/doctrines/love.json; and the Study Bible notes for Numbers 21 (client/public/bible/notes/numbers/21.json).
The old film's care line stays on the page, untouched, and is not in the narration. The snakes and the cross are named,
never described. Where Christians differ (what "world" and "everyone who believes" imply for God's saving purpose), the
Arminian and Reformed readings are named fairly and no side is taken."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions, differ note and ledger rows), the Study Bible notes on John 3 and Numbers 21, and the doctrine page on love; every claim is sourced in film/john-3-16/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("john-3-16", "John 3:16 in its chapter", P("john-3-16"), [
  {"id": "sign", "kicker": "A sign in the stands", "level": 0.2, "lines": [
    "From about 1980, Rollen Stewart held up John 3:16 signs at televised sporting events. The reference became one of the best known in the English-speaking world.",
    "But the verse belongs to a conversation."]},
  {"id": "night", "kicker": "A visitor at night", "level": 0.3, "lines": [
    "Nicodemus was a Pharisee, most likely a member of the Sanhedrin, the council in Jerusalem. Jesus calls him Israel's teacher.",
    "He comes at night. Maybe to stay unseen. Maybe night was the hour for serious study.",
    "John means you to notice: this man comes out of the dark toward the Light."],
   "scripture": S("John 3:2", "Rabbi, we know that You are a teacher who has come from God.")},
  {"id": "born", "kicker": "Born from above", "level": 0.4, "lines": [
    "Jesus answers with a need: no one can see the kingdom of God unless he is born again.",
    "The Greek word means again, or from above. Nicodemus hears a second time. Most commentators hear at least from above: a birth whose source is God.",
    "The verb is passive. Nobody gives birth to himself. Ezekiel had promised a new heart and God's own Spirit. What startled was that Israel's own teacher needed it."],
   "scripture": S("John 3:3", "no one can see the kingdom of God unless he is born again.", True)},
  {"id": "wind", "kicker": "Wind, breath, Spirit", "level": 0.35, "lines": [
    "One Greek word means wind, breath and spirit. The wind blows where it wishes. You hear it. You can't steer it.",
    "Pause here. What are you counting on: family, effort, standing? Jesus asked a new birth of the most religious man in the room."],
   "scripture": S("John 3:8", "The wind blows where it wishes. You hear its sound, but you do not know where it comes from or where it is going.")},
  {"id": "serpent", "kicker": "A snake on a pole", "level": 0.45, "lines": [
    "Then Jesus reaches for Numbers 21. The people spoke against God and Moses. Venomous snakes came, and many died.",
    "They confessed, and the Lord told Moses, Make a fiery serpent and mount it on a pole. When anyone who is bitten looks at it, he will live.",
    "Jewish readers insisted the metal didn't heal. The Mishnah says Israel was healed when they looked upward and set their hearts on their Father in heaven."],
   "scripture": S("Numbers 21:8", "Make a fiery serpent and mount it on a pole. When anyone who is bitten looks at it, he will live.", True)},
  {"id": "lifted", "kicker": "Lifted up", "level": 0.55, "lines": [
    "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up, that everyone who believes in Him may have eternal life.",
    "To a first-century ear, lifted up on a pole meant crucifixion, in public view. Yet the same word means exalted.",
    "Weigh a fair question. Why a look, and not a cure you could work for? Because faith here isn't an achievement. It's turning toward what God has provided."],
   "scripture": S("John 3:14-15", "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up, that everyone who believes in Him may have eternal life.", True)},
  {"id": "so", "kicker": "In this way", "level": 0.65, "lines": [
    "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life.",
    "Look at the small word so. It most naturally means in this way, not only so much. In 1999 Robert Gundry and Russell Howell argued that it points back to the lifting up.",
    "The word shows the love's shape: a Son given and lifted up. His love is why there is a cross."],
   "scripture": S("John 3:16", "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life.", True)},
  {"id": "world", "kicker": "Which world?", "level": 0.45, "lines": [
    "And the world? In John it usually means humanity turned away from God, the world that did not recognize him.",
    "So the wonder isn't the world's size. It's the world's hostility.",
    "Pause here. Which is harder to believe: that God loves the world, or that he loves you in particular."],
   "scripture": S("John 1:10", "the world did not recognize Him.")},
  {"id": "believes", "kicker": "Everyone who believes", "level": 0.45, "lines": [
    "In John, to believe is to trust yourself to a person more than to agree with a statement. And eternal life is the life of the age to come, received now.",
    "Christians differ on what world and everyone imply. Arminian readers say God's saving intention reaches every person.",
    "Reformed readers, like John Owen in 1648, say God's love for the world issues in a special saving purpose for the elect, while the offer to all remains sincere. This film takes no side."]},
  {"id": "light", "kicker": "Not to condemn", "level": 0.5, "lines": [
    "For God did not send His Son into the world to condemn the world, but to save the world through Him.",
    "Yet there is a verdict. The Light has come into the world, but men loved the darkness rather than the Light. Loved is the same verb as verse 16.",
    "Why prefer the dark? The reason is moral, not intellectual. We fear exposure."],
   "scripture": S("John 3:17", "For God did not send His Son into the world to condemn the world, but to save the world through Him.", True)},
  {"id": "daylight", "kicker": "Out of the dark", "level": 0.3, "lines": [
    "John never says how Nicodemus answered.",
    "Later he asks the council to give Jesus a fair hearing. And after the cross he brings about seventy-five pounds of myrrh and aloes to bury him.",
    "The man who came at night steps into the open. His faith came slowly, and John follows him with sympathy."],
   "scripture": S("John 19:39", "Nicodemus, who had previously come to Jesus at night"),
   "titleCard": ["Not only how much God loved the world, but how: a Son given, and lifted up where anyone can look.", END]},
], NOTE)
