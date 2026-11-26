"""Batch 1 of the 83 rebuilt Bible Explorer films: the three "story" films, then Genesis and Exodus.
Every claim comes from the old film's own captions (client/public/explorer/films/<slug>.json), whose sources
are in docs/work/elite/explorer-ledger.md. The words are new; the facts are not."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions and its rows of docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}

write("bible-two-minutes", "The whole Bible in two minutes", "/study/explorer/watch/bible-two-minutes", [
  {"id": "made", "kicker": "Made good", "level": 0.2, "lines": [
    "The Bible starts with God. He speaks, and there's a world.",
    "He calls it good. And he makes people in his image, to look after it for him."],
   "scripture": S("Genesis 1:31", "And God looked upon all that He had made, and indeed, it was very good.")},
  {"id": "broken", "kicker": "Broken", "level": 0.35, "lines": [
    "Then the first people reach for the one thing God held back. And the damage spreads. Shame. Blame. A murder. A flood. A tower built to reach the sky.",
    "God judges it. And he keeps showing mercy."]},
  {"id": "promise", "kicker": "A promise", "level": 0.45, "lines": [
    "So God picks one man, Abraham, and makes him a promise. A people. A land. And a blessing meant for every family on earth."],
   "scripture": S("Genesis 12:3", "all the families of the earth will be blessed through you.")},
  {"id": "rescued", "kicker": "Rescued, and given God's law", "level": 0.55, "lines": [
    "Abraham's family grows into a nation, and the nation ends up as slaves in Egypt. God hears them. He spares them by the blood of a lamb and opens a road through the sea.",
    "At Mount Sinai he makes a covenant with them, gives them his law, and has them build a tent so he can live among them."],
   "scripture": S("Exodus 20:2", "I am the LORD your God, who brought you out of the land of Egypt, out of the house of slavery.")},
  {"id": "kingdom", "kicker": "A land and a king", "level": 0.65, "lines": [
    "God gives them the land. But they keep turning away, and each round is worse than the last.",
    "They ask for a king. Saul fails. David loves God and fails badly too. And God promises David a son whose kingdom will never end."],
   "scripture": S("2 Samuel 7:16", "your throne will be established forever.")},
  {"id": "exile", "kicker": "Exile, and promises in the dark", "level": 0.75, "lines": [
    "The kingdom splits. The kings lead the people to idols, the prophets call them back, and they won't come. Babylon burns Jerusalem.",
    "But in the dark, the prophets promise a new covenant and a coming king. Some of the exiles come home and rebuild. No son of David sits on the throne. The Old Testament ends looking ahead."],
   "scripture": S("Jeremiah 31:33", "I will put My law in their minds and inscribe it on their hearts.")},
  {"id": "jesus", "kicker": "Jesus comes, dies and rises", "level": 0.9, "lines": [
    "Then God keeps his promises in person. Jesus says God's kingdom has come near. He heals, he forgives, and he speaks with an authority that belongs to God alone.",
    "He dies on a Roman cross at Passover, carrying the sin of the world. And on the third day God raises him bodily from the dead."],
   "scripture": S("1 Corinthians 15:3-4", "that Christ died for our sins according to the Scriptures, that He was buried, that He was raised on the third day according to the Scriptures")},
  {"id": "church", "kicker": "The Spirit, and the church", "level": 0.8, "lines": [
    "Fifty days later the Spirit comes. The church starts in Jerusalem and spreads, Jews and Gentiles together, until the news about Jesus reaches Rome."],
   "scripture": S("Acts 1:8", "you will be My witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.")},
  {"id": "new", "kicker": "All things new", "level": 0.95, "lines": [
    "And the story ends where it began, with God and his people together. Only now the garden has become a city.",
    "Jesus returns. Death is undone. And God makes his home with people forever.",
    "Behold, I make all things new."],
   "scripture": S("Revelation 21:5", "Behold, I make all things new.", True)},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "That's the whole Bible, from the garden to the city. And you're living somewhere on that road."],
   "titleCard": ["You're living somewhere on that road.", "LiveWell by James Bell"]},
], NOTE)

write("bible-in-a-minute", "The Bible in a minute", "/study/explorer/watch/bible-in-a-minute", [
  {"id": "made", "kicker": "Made good", "level": 0.2, "lines": [
    "Before anything else, there's God. He speaks a world into being and calls it good. He makes people in his image to care for it."]},
  {"id": "broken", "kicker": "Broken", "level": 0.35, "lines": [
    "The first people reach for what God held back, and the damage spreads. God judges. He also keeps showing mercy."]},
  {"id": "promise", "kicker": "A promise", "level": 0.45, "lines": [
    "He calls one man, Abraham, and promises him a people, a land, and a blessing for every family on earth."]},
  {"id": "rescue", "kicker": "A rescue", "level": 0.55, "lines": [
    "That family becomes a nation of slaves. God sets them free, opens a road through the sea, and gives them his law at Sinai."]},
  {"id": "king", "kicker": "A king", "level": 0.65, "lines": [
    "He gives them the land, and they ask for a king. David loves God and still fails badly. God promises him a son whose kingdom will never end."]},
  {"id": "exile", "kicker": "Exile, and hope", "level": 0.75, "lines": [
    "The kingdom falls. Babylon burns Jerusalem. But the prophets promise a new covenant and a coming king."]},
  {"id": "jesus", "kicker": "The cross and the empty tomb", "level": 0.9, "lines": [
    "Then God keeps his promises in person. Jesus dies on a Roman cross, carrying the sin of the world. On the third day God raises him bodily from the dead."]},
  {"id": "new", "kicker": "The Spirit, and all things new", "level": 0.95, "lines": [
    "The Spirit comes, and the church spreads to every nation. One day Jesus returns, death is undone, and God makes his home with people forever.",
    "Behold, I make all things new."],
   "scripture": S("Revelation 21:5", "Behold, I make all things new.", True)},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "One book. One story. Go read it."],
   "titleCard": ["One book. One story.", "LiveWell by James Bell"]},
], NOTE)

write("sixty-six-books", "How the 66 books fit together", "/study/explorer/watch/sixty-six-books", [
  {"id": "library", "kicker": "One book, many books", "level": 0.2, "lines": [
    "The Bible isn't really one book. It's a library.",
    "The Protestant Bible, the one most English readers hold, has sixty-six books. Catholic and Orthodox Bibles include more in the Old Testament."]},
  {"id": "two", "kicker": "Two parts", "level": 0.35, "lines": [
    "It comes in two parts. Thirty-nine books in the Old Testament and twenty-seven in the New, written in three languages: Hebrew, a little Aramaic, and Greek."]},
  {"id": "law-history", "kicker": "Law and history", "level": 0.5, "lines": [
    "The books are shelved by kind. First come five books of law, Genesis through Deuteronomy. Then the history books, Joshua through Esther."]},
  {"id": "poetry-prophets", "kicker": "Poetry and the prophets", "level": 0.6, "lines": [
    "Next come poetry and wisdom, Job through the Song of Solomon. Then the prophets, the long books first and the twelve short ones after.",
    "A Hebrew Bible holds the same books in a different order."]},
  {"id": "gospels-acts", "kicker": "The Gospels and Acts", "level": 0.75, "lines": [
    "The New Testament opens with four Gospels. Each one is a portrait of Jesus: his life, his teaching, his death, and his resurrection.",
    "Then Acts carries the story from Jerusalem to Rome."]},
  {"id": "letters", "kicker": "Letters and Revelation", "level": 0.85, "lines": [
    "After that come the letters, Romans through Jude. Thirteen name Paul as their writer. Hebrews doesn't name its author. Seven more follow.",
    "Last stands Revelation, a book of visions."]},
  {"id": "one-story", "kicker": "One story", "level": 0.95, "lines": [
    "These are different kinds of writing, and you read each kind differently. A poem isn't a law. A letter isn't a history. But together they tell one story.",
    "The New Testament writers quote the Old on nearly every page, and they claim its story reaches its goal in Jesus of Nazareth."],
   "scripture": S("Luke 24:27", "And beginning with Moses and all the Prophets, He explained to them what was written in all the Scriptures about Himself.")},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "So before you read a page, ask what shelf it came from."],
   "titleCard": ["Ask what shelf it came from.", "LiveWell by James Bell"]},
], NOTE)

write("book-genesis", "Genesis: the book of beginnings", "/study/explorer/watch/book-genesis", [
  {"id": "beginnings", "kicker": "The book of beginnings", "level": 0.2, "lines": [
    "Genesis is the first book of the Bible. Its name means origin, or birth.",
    "In the beginning God created the heavens and the earth.",
    "It tells how things began: the world, people, sin and death, the nations, and the people of Israel."],
   "scripture": S("Genesis 1:1", "In the beginning God created the heavens and the earth.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The book has two halves. Chapters one to eleven tell the story of the whole world. Chapters twelve to fifty narrow down to one family: Abraham, then Jacob, then Joseph.",
    "One phrase works like a heading. This is the account of. It opens each of the book's ten sections."],
   "scripture": S("Genesis 2:4", "This is the account of")},
  {"id": "image", "kicker": "Watch for: God's image", "level": 0.5, "lines": [
    "Watch what chapter one says about people. In the ancient world, a king set up his image to show his rule. Genesis gives that dignity to every person, not only kings.",
    "And the image isn't lost after the first sin."],
   "scripture": S("Genesis 1:27", "So God created man in His own image; in the image of God He created him; male and female He created them.")},
  {"id": "wrong", "kicker": "Watch for: what went wrong", "level": 0.65, "lines": [
    "Chapter three tells the first disobedience and what came of it. The damage spreads: a murder, a flood, a proud tower.",
    "Everything that goes wrong in the Bible's story traces back here. So does the first hint of hope."],
   "scripture": S("Genesis 3:9", "But the LORD God called out to the man, “Where are you?”")},
  {"id": "differ", "kicker": "Where readers differ", "level": 0.55, "lines": [
    "Christians differ on how literally to read chapters one to eleven. The book's own concern is who God is, who we are, and how God keeps his word."]},
  {"id": "promise", "kicker": "Watch for: the promise", "level": 0.8, "lines": [
    "Chapter twelve is the hinge the whole Bible turns on, from the world's story to Israel's. God calls Abram and promises him a great nation, a great name, and blessing for all the families of the earth."],
   "scripture": S("Genesis 12:3", "all the families of the earth will be blessed through you.")},
  {"id": "faithful", "kicker": "Watch for: a faithful God", "level": 0.9, "lines": [
    "The people of Genesis lie, scheme, play favorites, and betray each other. God works through all of it without excusing any of it.",
    "Joseph says so to the brothers who sold him.",
    "What you intended against me for evil, God intended for good."],
   "scripture": S("Genesis 50:20", "what you intended against me for evil, God intended for good", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one. The key chapters are one, three, nine, twelve, fifteen, twenty-two, thirty-two, and fifty.",
    "And keep this in mind as you read. Describing an act isn't the same as approving it."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Genesis ends with the promise alive, but not yet kept. So keep reading."],
   "titleCard": ["The promise is alive, but not yet kept.", "LiveWell by James Bell"]},
], NOTE)

write("book-exodus", "Exodus: out of slavery, to God", "/study/explorer/watch/book-exodus", [
  {"id": "rescue", "kicker": "The book of the rescue", "level": 0.2, "lines": [
    "Exodus opens where Genesis ended. Jacob's family has become a nation, and the nation has become slaves.",
    "The rescue doesn't begin with their faith. It begins with God's attention.",
    "So God heard their groaning, and He remembered His covenant with Abraham, Isaac, and Jacob."],
   "scripture": S("Exodus 2:24", "So God heard their groaning, and He remembered His covenant with Abraham, Isaac, and Jacob.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The book has two halves. The first tells the rescue from Egypt and the road through the wilderness. The second takes place almost entirely at one mountain, Sinai.",
    "Exodus gives as much space to where God will live as to how Israel got free."]},
  {"id": "name", "kicker": "Watch for: the name of God", "level": 0.5, "lines": [
    "The book turns on a name. At the bush, God tells Moses who he is.",
    "I AM WHO I AM.",
    "Pharaoh begins by asking who the LORD is, that he should obey him. The plagues are sent so that Egypt and Israel will know."],
   "scripture": S("Exodus 3:14", "I AM WHO I AM.", True)},
  {"id": "passover", "kicker": "Watch for: the Passover and the sea", "level": 0.7, "lines": [
    "Israel keeps the first Passover and goes free, on a night of great sadness in Egypt. At the sea, God makes a way.",
    "This is the Old Testament's defining act of salvation. The rest of the Bible keeps coming back to it."],
   "scripture": S("Exodus 15:2", "The LORD is my strength and my song, and He has become my salvation.")},
  {"id": "law", "kicker": "Watch for: a law for rescued people", "level": 0.8, "lines": [
    "Then comes the law, and the order matters. The laws aren't a ladder for earning God's favor. They're given to people he has already rescued.",
    "In Hebrew, one word means both to serve as a slave and to serve God in worship. Exodus is a change of masters."],
   "scripture": S("Exodus 20:2", "I am the LORD your God, who brought you out of the land of Egypt, out of the house of slavery.")},
  {"id": "tent", "kicker": "Watch for: God comes to live with them", "level": 0.9, "lines": [
    "The last third of the book is about a tent. The golden calf nearly ends that hope. Moses pleads for the people, and God renews the covenant.",
    "And the book ends at the goal the whole story has been moving toward.",
    "The glory of the LORD filled the tabernacle."],
   "scripture": S("Exodus 40:34", "the glory of the LORD filled the tabernacle.", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one. The key chapters are three, twelve, fourteen, nineteen, twenty, thirty-two, thirty-four, and forty.",
    "And don't hurry through the tabernacle chapters. Their length is part of the point."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "God didn't only bring his people out. He came to live with them."],
   "titleCard": ["Out of slavery, to God.", "LiveWell by James Bell"]},
], NOTE)
