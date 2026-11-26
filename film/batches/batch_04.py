"""Batch 4 of the rebuilt Bible Explorer films: Proverbs, Isaiah, Jeremiah, Daniel, Amos.
Every claim comes from the old film's own captions and its "differ" note. Where Christians differ (the four kingdoms
and the date of Daniel; who claims Amos) the views are named as the old film names them and no side is taken."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/book-{b}"

write("book-proverbs", "Proverbs: skill for ordinary days", P("proverbs"), [
  {"id": "wisdom", "kicker": "Skill for ordinary days", "level": 0.2, "lines": [
    "Wisdom in Proverbs isn't cleverness or book learning. It's skill in living: the ability to see how God's world works and to act in step with it.",
    "Its motto comes in the first chapter.",
    "The fear of the LORD is the beginning of knowledge."],
   "scripture": S("Proverbs 1:7", "The fear of the LORD is the beginning of knowledge", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Proverbs is a collection of collections. Nine chapters of longer poems. The proverbs of Solomon. The words of the wise. A second collection copied by Hezekiah's men. And the words of Agur and Lemuel."]},
  {"id": "two-ways", "kicker": "Watch for: two ways", "level": 0.5, "lines": [
    "The book pictures life as a road with two paths. Choices that look small, a companion, a loan, a glance, a lie, set a person on one road or the other.",
    "Proverbs trains you to see where a path ends before you step onto it."],
   "scripture": S("Proverbs 4:18", "The path of the righteous is like the first gleam of dawn")},
  {"id": "call", "kicker": "Watch for: Wisdom's call", "level": 0.65, "lines": [
    "In chapters one, eight, and nine, wisdom speaks as a woman who calls out in public places, and who was there with God when he made the world. Her rival, Folly, calls too.",
    "So choosing wisdom means accepting an invitation, not only mastering a set of rules."],
   "scripture": S("Proverbs 1:20", "Wisdom calls out in the street, she lifts her voice in the square")},
  {"id": "words", "kicker": "Watch for: words", "level": 0.8, "lines": [
    "Few subjects get more attention in Proverbs than the tongue. Honest lips and lying lips. Gossip and discretion. Flattery and faithful rebuke.",
    "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    "Restraint in speech is treated again and again as a mark of wisdom."],
   "scripture": S("Proverbs 15:1", "A gentle answer turns away wrath, but a harsh word stirs up anger.", True)},
  {"id": "work", "kicker": "Watch for: work, money and the poor", "level": 0.85, "lines": [
    "Proverbs praises diligence and warns the sluggard. But it also warns against trusting riches and against oppressing the poor.",
    "Wealth is a real good in this book, but always a lesser one than wisdom, righteousness, and a good name."],
   "scripture": S("Proverbs 19:17", "Kindness to the poor is a loan to the LORD")},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read Proverbs as proverbs. A proverb is a compressed observation about how life usually goes under God. It isn't a guarantee for every case.",
    "Start with chapter one. The key chapters are one, three, eight, nine, ten, twenty-two, and thirty-one."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "It's skill for ordinary days, and it begins here.",
    "Trust in the LORD with all your heart, and lean not on your own understanding."],
   "scripture": S("Proverbs 3:5", "Trust in the LORD with all your heart, and lean not on your own understanding", True),
   "titleCard": ["Skill for ordinary days.", "LiveWell by James Bell"]},
], NOTE)

write("book-isaiah", "Isaiah: the Holy One who comforts", P("isaiah"), [
  {"id": "holy", "kicker": "The Holy One of Israel", "level": 0.2, "lines": [
    "Isaiah spoke to the kings of Judah in the days of the Assyrian empire. His signature name for God comes from a vision: the Holy One of Israel.",
    "Holy, holy, holy is the LORD of Hosts; all the earth is full of His glory.",
    "Holiness exposes human pride. It also means God's commitment to his people."],
   "scripture": S("Isaiah 6:3", "Holy, holy, holy is the LORD of Hosts; all the earth is full of His glory.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The book has three major parts. The first speaks to Judah in the prophet's own day: judgment, threaded with promise.",
    "From chapter forty, the voice speaks comfort to a people in exile. And the last chapters speak to a community back in the land, still waiting."],
   "scripture": S("Isaiah 40:1", "“Comfort, comfort My people,” says your God.")},
  {"id": "trust", "kicker": "Watch for: trust or ruin", "level": 0.5, "lines": [
    "Again and again the kings of Judah have to choose between trusting God and trusting military power or foreign alliances. Ahaz chooses Assyria. Hezekiah prays.",
    "The book's verdict is that faith is the only real security."],
   "scripture": S("Isaiah 7:9", "If you do not stand firm in your faith, then you will not stand at all.")},
  {"id": "remnant", "kicker": "Watch for: judgment, and what is left", "level": 0.6, "lines": [
    "God's judgment in Isaiah is real and severe, and it falls on Judah and on every nation alike. But it isn't where the book ends.",
    "Through it God preserves a remnant, a people who will return to him."],
   "scripture": S("Isaiah 1:18", "Though your sins are like scarlet, they will be as white as snow")},
  {"id": "servant", "kicker": "Watch for: the king and the Servant", "level": 0.85, "lines": [
    "Isaiah gives three portraits of the one through whom God will act. A royal child from David's line. A Servant who suffers for others. And an anointed messenger of good news.",
    "But He was pierced for our transgressions.",
    "Jewish interpreters have often read the Servant as Israel. The New Testament sees all three in Jesus."],
   "scripture": S("Isaiah 53:5", "But He was pierced for our transgressions", True)},
  {"id": "new", "kicker": "Watch for: a world made new", "level": 0.9, "lines": [
    "Isaiah sees Zion becoming the place where all nations come to learn God's ways. Israel's calling turns out to be for the sake of the whole world.",
    "And the last chapters reach beyond Israel's history to new heavens and a new earth."],
   "scripture": S("Isaiah 65:17", "For behold, I will create new heavens and a new earth.")},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Isaiah is mostly poetry. Keep three horizons in view: the prophet's own day, the exile and return, and the far future.",
    "The key chapters are one, six, seven, nine, thirty-seven, forty, fifty-three, and sixty-five."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Empires in this book come and go. One thing doesn't.",
    "The word of our God stands forever."],
   "scripture": S("Isaiah 40:8", "the word of our God stands forever.", True),
   "titleCard": ["The Holy One who comforts.", "LiveWell by James Bell"]},
], NOTE)

write("book-jeremiah", "Jeremiah: the prophet who wept", P("jeremiah"), [
  {"id": "prophet", "kicker": "A prophet in the last days", "level": 0.2, "lines": [
    "Jeremiah lived through the end of the world as his people knew it. He was called as a young man, and he spoke for about forty years while Judah slid from reform into denial, and from denial into ruin.",
    "Then everything he had said came true."],
   "scripture": S("Jeremiah 1:5", "Before I formed you in the womb I knew you")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It isn't a tidy life story. Poems of judgment, sermons, stories of arrests, acted signs, letters, and raw private prayers are gathered in seven parts.",
    "And at its heart, in chapters thirty to thirty-three, stands a small book of comfort."],
   "scripture": S("Jeremiah 1:10", "to build and plant.")},
  {"id": "temple", "kicker": "Watch for: false safety", "level": 0.5, "lines": [
    "Jeremiah attacks what Judah trusted instead of God. The temple as a charm. Prophets who promised peace. Ritual without obedience.",
    "He calls the temple a den of robbers, words Jesus later used. The forms of faith can become a hiding place from God."],
   "scripture": S("Jeremiah 7:4", "Do not trust in deceptive words")},
  {"id": "prayer", "kicker": "Watch for: honest prayer", "level": 0.65, "lines": [
    "No other prophet lets you hear so much of his own pain. Jeremiah accuses God of deceiving him and curses the day he was born. Yet he can't hold the word in.",
    "His message becomes a fire burning in my heart, shut up in my bones.",
    "Faithfulness can include lament and protest brought straight to God."],
   "scripture": S("Jeremiah 20:9", "His message becomes a fire burning in my heart, shut up in my bones", True)},
  {"id": "letter", "kicker": "Watch for: a letter to the exiles", "level": 0.8, "lines": [
    "He writes to the exiles: build houses, seek the welfare of Babylon, and wait.",
    "The famous promise of a future and a hope was spoken to people facing seventy years of exile. It's a promise through suffering, not a guarantee of success."],
   "scripture": S("Jeremiah 29:11", "to give you a future and a hope.")},
  {"id": "covenant", "kicker": "Watch for: a new covenant", "level": 0.9, "lines": [
    "In chapter thirty-one, God promises a new covenant: his law written on the heart, and sin forgiven.",
    "I will put My law in their minds and inscribe it on their hearts.",
    "The New Testament claims it as fulfilled, from the cup Jesus calls the new covenant to the letter to the Hebrews."],
   "scripture": S("Jeremiah 31:33", "I will put My law in their minds and inscribe it on their hearts.", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start at chapter one. Then the key chapters: seven, twenty, twenty-nine, thirty-one, thirty-six, and fifty-two.",
    "And remember that its call to surrender to Babylon was a word for one moment, not a rule about politics."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Judgment is not God's last word."],
   "titleCard": ["Judgment is not God's last word.", "LiveWell by James Bell"]},
], NOTE)

write("book-daniel", "Daniel: the Most High rules", P("daniel"), [
  {"id": "two", "kicker": "Two books in one", "level": 0.2, "lines": [
    "Daniel is two books in one. Chapters one to six are stories of Daniel and three friends, taken from Judah to serve the king of Babylon.",
    "Chapters seven to twelve are visions of empires, and of the kingdom of God that outlasts them all."],
   "scripture": S("Daniel 1:17", "To these four young men God gave knowledge and understanding")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "Chapter one is in Hebrew. Chapters two to seven are in Aramaic, framed by two visions of four kingdoms followed by God's kingdom.",
    "Then the book returns to Hebrew: the ram and the goat, a prayer, and a final vision."],
   "scripture": S("Daniel 2:44", "the God of heaven will set up a kingdom that will never be destroyed")},
  {"id": "rules", "kicker": "Watch for: the Most High rules", "level": 0.5, "lines": [
    "Every chapter presses one claim. God gives kingdoms and takes them away. Proud kings are made to confess it.",
    "The Most High rules over the kingdom of mankind.",
    "Empires are real and dangerous. But they're temporary, and they answer to a higher throne."],
   "scripture": S("Daniel 4:25", "the Most High rules over the kingdom of mankind", True)},
  {"id": "bow", "kicker": "Watch for: faith that will not bow", "level": 0.7, "lines": [
    "Daniel and his friends learn Babylon's language and serve its kings with integrity. But they draw the line at worship.",
    "Three of them won't bow to the golden statue. They trust God to save them, and they trust him even if he doesn't.",
    "But even if He does not, let it be known to you, O king, that we will not serve your gods."],
   "scripture": S("Daniel 3:18", "But even if He does not, let it be known to you, O king, that we will not serve your gods", True)},
  {"id": "window", "kicker": "Watch for: quiet, costly faithfulness", "level": 0.8, "lines": [
    "When a decree forbids prayer, Daniel keeps praying at his open window, just as he had done before.",
    "He's put into the lions' den and brought out alive. And a foreign king confesses that God's kingdom will not be destroyed."],
   "scripture": S("Daniel 6:22", "My God sent His angel and shut the mouths of the lions.")},
  {"id": "son-of-man", "kicker": "Watch for: one like a son of man", "level": 0.9, "lines": [
    "In the visions, empires rise like beasts from the sea. And one like a son of man is given a kingdom that will not pass away.",
    "Jesus took that title for himself."],
   "scripture": S("Daniel 7:13", "I saw One like the Son of Man coming with the clouds of heaven.")},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.55, "lines": [
    "Many read the four kingdoms as Babylon, Media-Persia, Greece, and Rome. Many others read them as Babylon, Media, Persia, and Greece. Careful readers also differ on when the book was finished.",
    "The visions are pictures, not a code for the news. The book's own concern is endurance and hope."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter one. The key chapters are two, three, four, six, seven, nine, and twelve."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Empires rise and empires pass. The Most High rules."],
   "titleCard": ["The Most High rules.", "LiveWell by James Bell"]},
], NOTE)

write("book-amos", "Amos: let justice roll on like a river", P("amos"), [
  {"id": "herdsman", "kicker": "A herdsman sent north", "level": 0.2, "lines": [
    "Around 760 BC, a herdsman from Tekoa in Judah went north to Israel, which was then at its greatest wealth in generations.",
    "The shrines were crowded, and the rich had houses decorated with ivory. Amos looked beneath the prosperity."],
   "scripture": S("Amos 7:15", "But the LORD took me from following the flock")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The book has three parts. A ring of judgments on the nations, which closes on Judah and then on Israel. Sermons, laments, and woes. And five visions, ending in a promise of restoration."],
   "scripture": S("Amos 1:2", "The LORD roars from Zion and raises His voice from Jerusalem")},
  {"id": "trap", "kicker": "Watch for: the trap", "level": 0.5, "lines": [
    "It opens with a trap. God judges Israel's neighbors for cruelty every people knows is wrong, and a first hearer would have agreed with every word.",
    "Then the trap closes on Judah, and at greatest length on Israel, who sell the needy for a pair of sandals."],
   "scripture": S("Amos 2:6", "they sell the righteous for silver and the needy for a pair of sandals.")},
  {"id": "river", "kicker": "Watch for: justice like a river", "level": 0.8, "lines": [
    "God refuses Israel's feasts and songs in some of the hardest words in the Bible.",
    "But let justice roll on like a river, and righteousness like an ever-flowing stream.",
    "Amos doesn't reject worship as such. He attacks worship cut off from obedience, and comfort that doesn't grieve."],
   "scripture": S("Amos 5:24", "But let justice roll on like a river, and righteousness like an ever-flowing stream.", True)},
  {"id": "plumb", "kicker": "Watch for: the plumb line", "level": 0.7, "lines": [
    "In the visions, Amos pleads twice and God relents. Then a plumb line shows Israel out of true.",
    "Amaziah, the priest of the king's shrine, tells him to go home. Amos answers that the LORD took him from following the flock."],
   "scripture": S("Amos 7:8", "I am setting a plumb line among My people Israel")},
  {"id": "tent", "kicker": "Watch for: the fallen tent restored", "level": 0.85, "lines": [
    "The book ends in hope. God will restore the fallen tent of David and plant his people in their land.",
    "James quoted these words in Jerusalem, about the Gentiles coming to faith. They make no claim about any modern state or border."],
   "scripture": S("Amos 9:11", "In that day I will restore the fallen tent of David.")},
  {"id": "differ", "kicker": "Who Amos belongs to", "level": 0.55, "lines": [
    "Readers across the political spectrum have claimed Amos. The book itself speaks to God's people and their leaders, and its standard is God's covenant, not any modern program or party."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter five. Then the key chapters: one, two, three, seven, and nine.",
    "Read the charges for what they name, and let them land on yourself before anyone else."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "And hear the invitation inside the warning.",
    "Seek Me and live!"],
   "scripture": S("Amos 5:4", "Seek Me and live!", True),
   "titleCard": ["Let it land on yourself first.", "LiveWell by James Bell"]},
], NOTE)
