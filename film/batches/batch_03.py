"""Batch 3 of the rebuilt Bible Explorer films: Ruth, 1 Samuel, 2 Samuel, Nehemiah, Psalms.
Every claim comes from the old film's own captions and its "differ" note. Hard things are named in the old film's
own words and never described; no side is taken where readers differ."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug. New wording, same facts: each claim is in the old film's captions or its 'differ' note, whose sources are in docs/work/elite/explorer-ledger.md. Scripture is the Berean Standard Bible, checked against client/public/bible/text/ by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/book-{b}"

write("book-ruth", "Ruth: loyal love in a hard time", P("ruth"), [
  {"id": "story", "kicker": "A small story", "level": 0.2, "lines": [
    "Ruth is set in the dark days of the judges, but it's told from inside one family in Bethlehem.",
    "A famine drives them to Moab, and the men die there. Naomi turns for home with nothing. And her Moabite daughter-in-law won't leave her.",
    "Your people will be my people, and your God will be my God."],
   "scripture": S("Ruth 1:16", "your people will be my people, and your God will be my God.", True)},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The book has four chapters, and they balance. A scene on the road. A scene in the field. A scene at the threshing floor. A scene at the gate. The third is the turning point.",
    "Naomi's emptiness in chapter one is answered by the child in her lap in chapter four."],
   "scripture": S("Ruth 1:21", "I went away full, but the LORD has brought me back empty.")},
  {"id": "loyal", "kicker": "Watch for: loyal love", "level": 0.5, "lines": [
    "Watch for a Hebrew word, hesed. It names a love that keeps faith inside a relationship and goes beyond what duty requires.",
    "Ruth shows it to Naomi. Boaz shows it in the field."]},
  {"id": "ordinary", "kicker": "Watch for: God in ordinary days", "level": 0.6, "lines": [
    "Nobody in Ruth sees a vision or a wonder. A famine ends. A harvest comes. Ruth happens to walk into the field of Boaz.",
    "The storyteller lets you see God's hand in those ordinary turns without forcing the point."],
   "scripture": S("Ruth 2:12", "under whose wings you have taken refuge.")},
  {"id": "redeemer", "kicker": "Watch for: the redeemer", "level": 0.75, "lines": [
    "A kinsman-redeemer was a near relative responsible for protecting a family's land, name, and people when they couldn't protect themselves.",
    "Boaz takes on that role at cost to himself."],
   "scripture": S("Ruth 2:20", "The man is a close relative. He is one of our kinsman-redeemers.")},
  {"id": "david", "kicker": "Watch for: the surprise at the end", "level": 0.9, "lines": [
    "Then comes the surprise. Ruth is called the Moabitess again and again, yet she takes refuge in the LORD and becomes an ancestor of David.",
    "He became the father of Jesse, the father of David.",
    "The small family story turns out to be a hinge in Israel's history. And Matthew names Ruth in the family line of Jesus."],
   "scripture": S("Ruth 4:17", "He became the father of Jesse, the father of David.", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Read all four chapters in one sitting, slowly. Watch the words that keep coming back: return, empty and full, kindness, wings, redeem."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "The book treats grief honestly, and it lets hope arrive slowly."],
   "titleCard": ["It lets hope arrive slowly.", "LiveWell by James Bell"]},
], NOTE)

write("book-1-samuel", "1 Samuel: the heart God sees", P("1-samuel"), [
  {"id": "three", "kicker": "Three lives", "level": 0.2, "lines": [
    "First Samuel carries Israel from the judges to the kings through three lives. Samuel, the answer to a childless woman's prayer. Saul, the first king. And David, anointed in secret.",
    "It's a book about power: who holds it, and how it's given."],
   "scripture": S("1 Samuel 2:7", "The LORD sends poverty and wealth; He humbles and He exalts.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It moves in seven stages. Samuel's birth and call. The ark lost and returned. Israel asks for a king. Saul's reign and rejection. David at Saul's court. David the fugitive. And the end of Saul.",
    "The three lives overlap, and the handover is never clean."],
   "scripture": S("1 Samuel 7:12", "Thus far the LORD has helped us.")},
  {"id": "listening", "kicker": "Watch for: the boy who listens", "level": 0.5, "lines": [
    "The book begins when the word of the LORD was rare, and it becomes the story of a prophet through whom God speaks.",
    "Speak, for Your servant is listening.",
    "Kings stand or fall by whether they listen. Hearing and obeying count above sacrifice."],
   "scripture": S("1 Samuel 3:10", "Speak, for Your servant is listening.", True)},
  {"id": "king", "kicker": "Watch for: give us a king", "level": 0.65, "lines": [
    "The elders ask for a king like all the nations. God calls it a rejection of his own rule, and then gives them one all the same.",
    "Readers weigh why. The question the book asks is whether the king will rule as a servant under the word of God."],
   "scripture": S("1 Samuel 8:7", "they have rejected Me as their king.")},
  {"id": "heart", "kicker": "Watch for: the heart", "level": 0.8, "lines": [
    "People keep judging by what they can see. Saul is a head taller than anyone. Samuel is taken with Jesse's tall eldest son. God looks somewhere else.",
    "For man sees the outward appearance, but the LORD sees the heart.",
    "And David is chosen from the sheepfold."],
   "scripture": S("1 Samuel 16:7", "For man sees the outward appearance, but the LORD sees the heart.", True)},
  {"id": "loyal", "kicker": "Watch for: loyal love", "level": 0.85, "lines": [
    "Jonathan, Saul's heir, gives up his claim out of love for David and trust in God's choice. And twice David has Saul in his power and won't harm him.",
    "It teaches restraint and trust in God's timing. It doesn't teach silence before injustice."],
   "scripture": S("1 Samuel 18:1", "Jonathan loved him as himself.")},
  {"id": "differ", "kicker": "The hard chapter", "level": 0.55, "lines": [
    "The command against Amalek in chapter fifteen is read in more than one way, and none of them makes it easy.",
    "On every reading, no people living today is Amalek, and no one may use this chapter to justify violence or contempt toward any person or people."]},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with Hannah's song in chapter two, slowly. Then the key chapters: three, four, eight, fifteen, sixteen, seventeen, and twenty-four.",
    "Don't take its heroes as models in everything."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Then read Second Samuel. The promise to David is still ahead."],
   "titleCard": ["The LORD sees the heart.", "LiveWell by James Bell"]},
], NOTE)

write("book-2-samuel", "2 Samuel: the king and the promise", P("2-samuel"), [
  {"id": "king", "kicker": "King David", "level": 0.2, "lines": [
    "Second Samuel tells David's reign, from the day after Saul's death to his last years.",
    "It gives the Bible both its highest picture of a king and its most honest one. A king God chose and loved, and a book that won't hide what he did with his power."],
   "scripture": S("2 Samuel 5:3", "And they anointed him king over Israel.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "It has five parts. King over Judah. The kingdom established, with Jerusalem, the ark, and the promise. David's sin and Nathan's rebuke. The troubles in David's house. And a closing collection.",
    "Chapters eleven and twelve are the hinge."]},
  {"id": "crown", "kicker": "Watch for: a crown not seized", "level": 0.5, "lines": [
    "The throne comes to David without his grasping for it. He mourns Saul and Jonathan, and each man who kills a rival to win his favor is rebuked.",
    "When the ark comes to Jerusalem, David dances with all his might before the LORD."],
   "scripture": S("2 Samuel 6:14", "danced with all his might before the LORD")},
  {"id": "house", "kicker": "Watch for: a house for David", "level": 0.7, "lines": [
    "David wants to build God a house. God turns the offer around. He will build David a house, a line of kings, with a throne established forever.",
    "Your house and kingdom will endure forever before Me.",
    "Jews before Christ read it of a son of David to come. Christians confess it kept in Jesus. The two part over how."],
   "scripture": S("2 Samuel 7:16", "Your house and kingdom will endure forever before Me", True)},
  {"id": "nathan", "kicker": "Watch for: you are that man", "level": 0.85, "lines": [
    "Then the hinge. David takes Bathsheba, the wife of Uriah, and has Uriah killed. The text places the whole responsibility on David, and nothing in the story blames her.",
    "Nathan, with nothing but a word from God, names the king's crime to his face. And David confesses.",
    "I have sinned against the LORD.",
    "He is forgiven."],
   "scripture": S("2 Samuel 12:13", "I have sinned against the LORD.", True)},
  {"id": "sword", "kicker": "Watch for: the sword in David's house", "level": 0.9, "lines": [
    "But after it, the sword never leaves David's house. The rape of Tamar. A son murdered. Absalom's revolt. And a father weeping for the son who tried to take his throne.",
    "The same king, the same God, and the same promise stand on both sides of chapter eleven."],
   "scripture": S("2 Samuel 18:33", "O my son Absalom! My son, my son Absalom!")},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapter seven, slowly. Then chapters eleven and twelve, with Psalm fifty-one beside them."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "The book gives no leader a shield against correction. Its own prophet named the king's sin."],
   "titleCard": ["No leader is shielded from correction.", "LiveWell by James Bell"]},
], NOTE)

write("book-nehemiah", "Nehemiah: rebuilding the walls, and a people", P("nehemiah"), [
  {"id": "cupbearer", "kicker": "The king's cupbearer", "level": 0.2, "lines": [
    "Nehemiah was a Jewish official at the Persian court. In 445 BC he came to Jerusalem and rebuilt its broken walls in fifty-two days.",
    "Much of the book is his own account, full of quick prayers and strong feeling. He's a layman for whom prayer and planning are partners."],
   "scripture": S("Nehemiah 1:4", "When I heard these words, I sat down and wept.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "The book turns at chapter eight, from building the city to building the people.",
    "First the burden and the night ride. Then the wall rebuilt against opposition. Then the law read and the covenant renewed, the wall dedicated, and the last reforms."],
   "scripture": S("Nehemiah 2:18", "and they set their hands to this good work.")},
  {"id": "wall", "kicker": "Watch for: pray, and keep watch", "level": 0.5, "lines": [
    "Chapter three names who built each section: priests, goldsmiths, perfumers, a ruler with his daughters. Then come mockery, threats, and plots.",
    "Nehemiah's answer is the book in one sentence.",
    "So we prayed to our God and posted a guard against them day and night."],
   "scripture": S("Nehemiah 4:9", "So we prayed to our God and posted a guard against them day and night.", True)},
  {"id": "poor", "kicker": "Watch for: justice for the poor", "level": 0.65, "lines": [
    "In the middle of the work, poor families cry out. Famine, debt, and the king's tax have cost them their fields and even their children.",
    "Nehemiah confronts the nobles, and they give back what they took. A rebuilt city with an unjust economy isn't a restored city."],
   "scripture": S("Nehemiah 5:9", "What you are doing is not right.")},
  {"id": "law", "kicker": "Watch for: the law read with joy", "level": 0.9, "lines": [
    "The high point isn't the wall. It's the reading of the law. Ezra reads from daybreak until noon, the Levites explain it, and the people weep.",
    "They're told to feast and share, because the joy of the LORD is their strength. Confession and a signed pledge follow."],
   "scripture": S("Nehemiah 8:8", "explaining it and giving insight, so that the people could understand what was being read.")},
  {"id": "remember", "kicker": "Watch for: an ending without triumph", "level": 0.7, "lines": [
    "The ending has no triumph. Nehemiah comes back to find nearly every promise broken, and he acts, sometimes harshly. The text reports it without comment.",
    "Nothing in it gives anyone today a warrant to strike or harm anyone. Walls can't make a people faithful by themselves.",
    "Remember me, O my God, with favor."],
   "scripture": S("Nehemiah 13:31", "Remember me, O my God, with favor.", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start with chapters one and two. Then the key chapters: five, eight, nine, and thirteen. Listen for Nehemiah's quick prayers, and don't skip the lists of names."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Promises made in a great assembly have to be kept in ordinary weeks."],
   "titleCard": ["Promises have to be kept in ordinary weeks.", "LiveWell by James Bell"]},
], NOTE)

write("book-psalms", "Psalms: the prayer book of the Bible", P("psalms"), [
  {"id": "prayer-book", "kicker": "The prayer book of the Bible", "level": 0.2, "lines": [
    "The Psalms are the prayer book of the Bible: a hundred and fifty poems.",
    "Other parts of the Bible are God's word to his people. The Psalms are also his people's words to him, which he has taken into Scripture."],
   "scripture": S("Psalm 62:8", "Trust in Him at all times, O people; pour out your hearts before Him.")},
  {"id": "layout", "kicker": "How it is laid out", "level": 0.35, "lines": [
    "They aren't one long list. Two gateway psalms open the collection. Five books follow. And five psalms of Hallelujah close it.",
    "Each of the first four books ends with a short blessing of God."],
   "scripture": S("Psalm 41:13", "Blessed be the LORD, the God of Israel, from everlasting to everlasting. Amen and Amen.")},
  {"id": "lament", "kicker": "Watch for: honest prayer", "level": 0.5, "lines": [
    "The largest group of psalms are laments. They complain to God about enemies, about guilt, and about God's own apparent absence, and they do it inside the covenant.",
    "How long, O LORD? Will You forget me forever?",
    "Most turn toward trust. A few, like Psalm eighty-eight, never do. Protest can be a form of faith."],
   "scripture": S("Psalm 13:1", "How long, O LORD? Will You forget me forever?", True)},
  {"id": "praise", "kicker": "Watch for: praise", "level": 0.65, "lines": [
    "Praise in the Psalms is a response. To God's work in creation. To his rescue of Israel. To his help in one crisis.",
    "One person's rescue becomes the whole community's reason to worship.",
    "Let everything that has breath praise the LORD!"],
   "scripture": S("Psalm 150:6", "Let everything that has breath praise the LORD!", True)},
  {"id": "king", "kicker": "Watch for: the king", "level": 0.8, "lines": [
    "Under every lament and every hymn lies one conviction: the LORD reigns.",
    "Book Three ends by asking how God's covenant with David can stand when the crown lies in the dust. Book Four answers by proclaiming that the LORD is king."],
   "scripture": S("Psalm 93:1", "The LORD reigns! He is robed in majesty")},
  {"id": "jesus", "kicker": "Watch for: the prayers of Jesus", "level": 0.9, "lines": [
    "The Gospels show Jesus praying the psalms in his suffering. From the cross he cries the opening of Psalm twenty-two.",
    "My God, my God, why have You forsaken me?",
    "Christians since the early church have prayed the Psalms both as their own prayers and as the prayers of Christ."],
   "scripture": S("Psalm 22:1", "My God, my God, why have You forsaken me?", True)},
  {"id": "start", "kicker": "Where to start", "level": 0.6, "lines": [
    "Start at the gateway, with Psalm one. The key psalms are one, two, twenty-two, twenty-three, fifty-one, seventy-three, eighty-nine, and a hundred and ten."]},
  {"id": "close", "kicker": "", "level": 0.3, "lines": [
    "Read each one whole, slowly, and out loud."],
   "titleCard": ["Read each one whole, slowly, and out loud.", "LiveWell by James Bell"]},
], NOTE)
