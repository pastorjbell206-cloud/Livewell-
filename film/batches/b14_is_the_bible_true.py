"""Batch 14 film: "Is the Bible true?" (slug is-the-bible-true). Sources, and nothing else: the old Bible Explorer film
client/public/explorer/films/is-the-bible-true.json (older captions, its "think" question and its read list) with its rows
in docs/work/elite/explorer-ledger.md ("is-the-bible-true 1" to "is-the-bible-true 7 to 8"); the Honest Answer
"why-would-anyone-trust-the-bible" in client/src/data/answers.ts; the area page client/public/questions/text/_area.json;
and the essay client/public/essays/why-trust-the-bible.json. The film/apol-* films already cover manuscripts, Gospel
dates, the canon, archaeology and Gospel differences, so this film takes the broader question: what "true" means for the
different kinds of writing, what the Bible claims about itself, the honest limits, and where Christians differ. The old
film has no care line; the essay's Find Help line stays on the essay and is not in the narration.
Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-27 from the Bible Explorer film is-the-bible-true (with its explorer-ledger rows), the Honest Answer why-would-anyone-trust-the-bible in client/src/data/answers.ts, client/public/questions/text/_area.json, and the essay client/public/essays/why-trust-the-bible.json."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
END = "LiveWell by James Bell"

write("is-the-bible-true", "Is the Bible true?", "/study/explorer/watch/is-the-bible-true", [
  {"id": "question", "kicker": "A bigger question", "level": 0.2, "lines": [
    "Is the Bible true? Other films here go deep on the copies, the dates and the books.",
    "This one asks something earlier: what would it mean for this book to be true?",
    "Copying words correctly doesn't make them true. A lie can be preserved perfectly."]},
  {"id": "kinds", "kicker": "Many kinds of writing", "level": 0.3, "lines": [
    "The Bible isn't one kind of writing. It holds histories, prayers, laws, prophets and letters.",
    "Pause here and ask yourself: is a song true the same way a court record is?",
    "Some Christians say Scripture is fully trustworthy in everything it sets out to teach. So ask what each part sets out to do."]},
  {"id": "history", "kicker": "History", "level": 0.4, "lines": [
    "Luke opens like a historian.",
    "Having carefully investigated everything from the beginning, it seemed good also to me to write an orderly account for you",
    "Most scholars now read the Gospels as ancient biographies. Richard Burridge's 1992 study, What Are the Gospels?, made that the consensus.",
    "Ancient biographers arranged material by theme and summarized speeches as a matter of course.",
    "But their center is a claim about what happened, one that could be proved false."],
   "scripture": S("Luke 1:3", "having carefully investigated everything from the beginning, it seemed good also to me to write an orderly account for you", True)},
  {"id": "prayer", "kicker": "Prayers that argue", "level": 0.5, "lines": [
    "Some prayers argue with God.",
    "How long, O LORD, must I call for help but You do not hear?",
    "Job asks it chapter after chapter. Some psalms ask God to break the teeth of enemies.",
    "Weigh this: what would it mean for a prayer like that to be true?"],
   "scripture": S("Habakkuk 1:2", "How long, O LORD, must I call for help but You do not hear", True)},
  {"id": "law", "kicker": "The hard laws", "level": 0.55, "lines": [
    "For many skeptics, the deepest problem isn't that the Bible's words were changed. It's that they weren't.",
    "Laws that regulate slavery. Commands in Joshua to destroy whole towns.",
    "That moves the question from, do we have the text, to, is the God of this text good? It's a better question, and it has pages of its own."]},
  {"id": "prophets", "kicker": "Prophets and letters", "level": 0.45, "lines": [
    "The Bible keeps sending prophets to people who already have the Scriptures. It expects its readers to get it wrong.",
    "Paul's letters were read as Scripture very early. Yet one apostle admits another is hard to follow.",
    "Some parts of his letters are hard to understand."],
   "scripture": S("2 Peter 3:16", "Some parts of his letters are hard to understand", True)},
  {"id": "claims", "kicker": "What it claims", "level": 0.55, "lines": [
    "What does it claim about itself?",
    "All Scripture is God-breathed and is useful for instruction, for conviction, for correction, and for training in righteousness.",
    "And Jesus, resting an argument on one phrase of a psalm, said the Scripture cannot be broken."],
   "scripture": S("2 Timothy 3:16", "All Scripture is God-breathed and is useful for instruction, for conviction, for correction, and for training in righteousness", True)},
  {"id": "circle", "kicker": "Isn't that circular?", "level": 0.6, "lines": [
    "Fair objection: isn't that a circle? It's true because it says so.",
    "The first Christians couldn't have reasoned that way. They had no New Testament, only the Scriptures of Israel and the news that Jesus had been raised.",
    "They trusted Him because they believed God had raised Him. Then they received the Scriptures the way He did.",
    "He told experts in those Scriptures they'd missed what the book was for.",
    "These are the very words that testify about Me, yet you refuse to come to Me to have life."],
   "scripture": S("John 5:39-40", "These are the very words that testify about Me, yet you refuse to come to Me to have life.", True)},
  {"id": "differ", "kicker": "Where Christians differ", "level": 0.45, "lines": [
    "Christians who confess the Bible as God's word differ on how to say it.",
    "Many evangelical churches confess it's without error. The Chicago Statement of 1978 says that isn't negated by “variant selections of material in parallel accounts, or the use of free citations.”",
    "Others put the conviction differently. Faithful Christians still divide over which wording is right. This film doesn't choose."]},
  {"id": "limits", "kicker": "Honest limits", "level": 0.5, "lines": [
    "There are honest limits. In Mark, Jesus places a story in the days of Abiathar the high priest. First Samuel names Ahimelech, Abiathar's father.",
    "When the young Bart Ehrman argued around it, his professor, Cullen Story, wrote, “Maybe Mark just made a mistake.”",
    "That verse still has no explanation everyone accepts. And no stone can show that a man rose from the dead.",
    "Many young Christians absorb a faith in which the Bible stands or falls with winning every argument about every verse. We taught them that, usually without meaning to. The Bible never did."]},
  {"id": "read", "kicker": "Read it whole", "level": 0.3, "lines": [
    "So ask yourself: what would it take for you to trust an ancient book, any ancient book?",
    "Then read one Gospel whole. Mark is the shortest. Notice what it keeps that anyone managing a reputation would have cut: Peter's denial.",
    "John tells you why he wrote.",
    "These are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in His name."],
   "scripture": S("John 20:31", "these are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in His name.", True),
   "titleCard": ["Christians trust the Bible because they have come to trust the one it is about.", END]},
], NOTE)
