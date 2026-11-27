"""Batch 14 film: "Why did God let his temple be destroyed?" (temple-destroyed), rebuilt from the Bible Explorer film
client/public/explorer/films/temple-destroyed.json (its older captions) and its rows in docs/work/elite/explorer-ledger.md
("Why did God let his temple be destroyed?"); the Explorer stop client/public/explorer/stops/exile.json (its story,
"god" and question/answer); the Study Bible notes for 2 Chronicles 36, Psalm 137, Lamentations (intro, 1, 2, 3, 5)
and Jeremiah (7, 31, 52) in client/public/bible/notes/; and the doctrine page client/public/bible/doctrines/exile.json.
The old film's care line stays on the page, untouched, and is not in the narration. Violence is named, never
described: the siege, the burning and the deportation are stated, and the killings and the blinding of Zedekiah are
left out. Psalm 137's last verses are not quoted; they are named as a raw cry for justice handed to God, as the
Psalm 137 note reads them. No people is blamed, and nothing ties the passage to any modern nation. AD 70 is told
only as the Lamentations 2 and Jeremiah 7 notes give it (Jesus foretold it; it happened), with the doctrine page's
and the Lamentations intro's note that Tisha B'Av mourns both temples."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film of the same slug (its older captions and ledger rows), the Prophets and Exile stop, the Study Bible notes on 2 Chronicles 36, Psalm 137, Lamentations and Jeremiah 7, 31 and 52, and the doctrine page on exile; every claim is sourced in film/temple-destroyed/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("temple-destroyed", "Why did God let his temple be destroyed?", P("temple-destroyed"), [
  {"id": "house", "kicker": "A house for God's name", "level": 0.2, "lines": [
    "In 587 or 586 BC, Babylon's army burned the temple in Jerusalem. Historians give either year.",
    "It was Solomon's temple, where God's Name dwelt.",
    "Why would God let his own house be destroyed?",
    "Solomon had given part of the answer on the day it was finished. Even heaven, the highest heaven, cannot contain You, much less this temple I have built.",
    "The temple was never a box that held God."],
   "scripture": S("1 Kings 8:27", "Even heaven, the highest heaven, cannot contain You, much less this temple I have built.", True)},
  {"id": "prophets", "kicker": "Again and again", "level": 0.3, "lines": [
    "For more than three centuries God sent prophets: Elijah, Amos, Hosea, Isaiah, Micah, Jeremiah and others.",
    "Chronicles gives the reason. Again and again the LORD, the God of their fathers, sent word to His people through His messengers because He had compassion on them.",
    "Every warning was an act of mercy."],
   "scripture": S("2 Chronicles 36:15", "Again and again the LORD, the God of their fathers, sent word to His people through His messengers because He had compassion on them", True)},
  {"id": "gate", "kicker": "At the temple gate", "level": 0.4, "lines": [
    "About 609 BC, God sent Jeremiah to the temple gate, the most public pulpit in Judah.",
    "Since God had saved Jerusalem from Sennacherib in 701 BC, many decided he would never let his house fall.",
    "So Jeremiah warned them. Do not trust in deceptive words, chanting: ‘This is the temple of the LORD, the temple of the LORD, the temple of the LORD.’",
    "The sermon nearly cost him his life.",
    "Pause here and ask yourself. What's the difference between trusting a place and trusting God?"],
   "scripture": S("Jeremiah 7:4", "Do not trust in deceptive words, chanting: ‘This is the temple of the LORD, the temple of the LORD, the temple of the LORD.’", True)},
  {"id": "glory", "kicker": "The glory leaves", "level": 0.45, "lines": [
    "Ezekiel, already an exile, saw in a vision that the glory of the LORD left the temple before the city fell.",
    "The exile was not God losing a battle to Babylon's gods. It was God doing what he had said he would do."],
   "scripture": S("Ezekiel 10:18", "Then the glory of the LORD moved away from the threshold of the temple")},
  {"id": "fell", "kicker": "The day it fell", "level": 0.55, "lines": [
    "After a siege of about a year and a half, the temple, the palace and the city were burned, and many survivors were carried off to Babylon.",
    "The Chronicler doesn't linger on the details. He gives the reason: God's messengers were mocked until there was no remedy."],
   "scripture": S("2 Kings 25:9", "He burned down the house of the LORD")},
  {"id": "grief", "kicker": "Grief kept in Scripture", "level": 0.4, "lines": [
    "The Bible doesn't treat the grief as small.",
    "By the rivers of Babylon we sat and wept when we remembered Zion.",
    "They hung their harps on the willows. How can we sing a song of the LORD in a foreign land?",
    "The psalm ends with a raw cry for justice. It's a prayer, not a command, and it hands that demand to God.",
    "Lamentations gives five poems to the same loss, four of them running through the Hebrew alphabet, grief from A to Z."],
   "scripture": S("Psalm 137:1", "By the rivers of Babylon we sat and wept when we remembered Zion.", True)},
  {"id": "why", "kicker": "Was it punishment?", "level": 0.6, "lines": [
    "Now weigh the hardest question fairly. Can suffering this great ever be proportionate?",
    "Lamentations asks that, and leaves the question before God.",
    "The prophets' answer is hard to hear. This came at the end of a long turning away, after warnings sent in compassion.",
    "But that answer belongs to this event, not to every loss. Asked whose sin made a man blind, Jesus said, “Neither this man nor his parents sinned.”"],
   "scripture": S("John 9:3", "Neither this man nor his parents sinned")},
  {"id": "mercies", "kicker": "Hope chosen in the dark", "level": 0.5, "lines": [
    "At the center of Lamentations, one sufferer calls something to mind.",
    "His mercies never fail. They are new every morning; great is Your faithfulness!",
    "That hope isn't a feeling. It's chosen in the dark, resting on who God is.",
    "And the book still ends asking whether God has rejected them for good. Scripture keeps that unanswered prayer too."],
   "scripture": S("Lamentations 3:22-23", "His mercies never fail. They are new every morning; great is Your faithfulness!", True)},
  {"id": "home", "kicker": "More than was lost", "level": 0.55, "lines": [
    "God went with his people. He told Ezekiel he had been a sanctuary for them in the lands where they had gone.",
    "In 539 BC Cyrus of Persia took Babylon and let the exiles go home. A new temple was finished in 516 or 515 BC.",
    "And the prophets promised more than had been lost: a covenant written on the heart."],
   "scripture": S("Jeremiah 31:33", "I will put My law in their minds and inscribe it on their hearts.")},
  {"id": "second", "kicker": "A second fall", "level": 0.6, "lines": [
    "Centuries later, Jesus wept over Jerusalem and foretold that it would be torn down again. That happened in AD 70.",
    "In the temple courts he quoted Jeremiah's temple sermon. And he spoke of his own body as the temple, destroyed and raised in three days.",
    "To this day the fast of Tisha B'Av remembers both temples."],
   "scripture": S("Luke 19:41", "As Jesus approached Jerusalem and saw the city, He wept over it")},
  {"id": "close", "kicker": "Never a box", "level": 0.3, "lines": [
    "So why did God let it fall? The prophets say he did what he had warned, after long patience.",
    "But the building was never what held him. He went with his people into exile, and he brought them home.",
    "The temple fell. His mercies didn't."],
   "titleCard": ["A temple can fall. God's mercies never fail.", END]},
], NOTE)
