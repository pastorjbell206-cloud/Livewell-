"""Batch 12 film: "Why do bad things happen?" (why-bad-things-happen), rebuilt from the Bible Explorer film
client/public/explorer/films/why-bad-things-happen.json and its rows in docs/work/elite/explorer-ledger.md; the live
hard-question pages client/public/questions/evil/the-logical-problem-of-evil.json, the-evidential-problem-of-evil.json
and natural-evil-and-animal-suffering.json (records in docs/work/elite/apol-pilot/evil/); and the Honest Answers
"if-god-is-good-why-suffering" and "why-does-god-allow-natural-disasters" in client/src/data/answers.ts.
The old film's care line and its "Not alone" frame stay on the page, untouched, and are not in the narration.
Suffering is named, never described. Where Christians differ (the view of freedom in the free-will defence, the
history of life behind natural evil), the views are named and none is chosen."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-26 from the Bible Explorer film of the same slug (its older captions and ledger rows), the hard-question pages on the logical problem of evil, the evidential problem of evil, and natural evil and animal suffering, and the Honest Answers 'if-god-is-good-why-suffering' and 'why-does-god-allow-natural-disasters'; every claim is sourced in film/why-bad-things-happen/facts.md, and Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("why-bad-things-happen", "Why do bad things happen?", P("why-bad-things-happen"), [
  {"id": "question", "kicker": "The hardest question", "level": 0.2, "lines": [
    "If God is good, why is there so much suffering?",
    "It's the strongest reason people give for not believing, and it deserves an honest answer, not a slogan.",
    "It's old. Early in the fourth century a Christian teacher, Lactantius, preserved it to answer it, crediting it to Epicurus."]},
  {"id": "true", "kicker": "What is true in it", "level": 0.3, "lines": [
    "The suffering is real, and much of it looks pointless from where we stand.",
    "Some answers Christians reach for first are worse than silence. Telling a grieving mother that everything happens for a reason isn't theology.",
    "The Bible never pretends pain is good. At the grave of his friend Lazarus, Jesus wept."],
   "scripture": S("John 11:35", "Jesus wept.", True)},
  {"id": "siloam", "kicker": "Not a punishment", "level": 0.4, "lines": [
    "Nobody can explain any one illness or disaster. When a tower fell in Siloam and eighteen people died, Jesus asked,",
    "Do you think that they were more sinful than all the others living in Jerusalem? No, I tell you.",
    "He refused the old reading that people who suffer must be worse."],
   "scripture": S("Luke 13:4-5", "Do you think that they were more sinful than all the others living in Jerusalem? No, I tell you.", True)},
  {"id": "mackie", "kicker": "A contradiction?", "level": 0.5, "lines": [
    "In 1955 the philosopher J. L. Mackie argued that three claims can't all be true together: God is all-powerful, God is wholly good, and evil exists.",
    "Christians answer that evil comes from misused freedom. Mackie asked why God couldn't make people who are free and always choose the good.",
    "Pause here and ask yourself. Could God make people truly free, and still guarantee that every one chooses well every time?"]},
  {"id": "plantinga", "kicker": "A possible reason", "level": 0.55, "lines": [
    "In 1974 Alvin Plantinga replied that a contradiction must be impossible, so a possible good reason is enough.",
    "Creatures truly free to do right and wrong may be worth the risk.",
    "Mackie later granted that evil doesn't show belief in God to be inconsistent, though he still asked whether that was a real solution.",
    "It's a real result, and a narrow one. It explains no one's suffering, and many Reformed Christians reject its view of freedom. This film doesn't choose."]},
  {"id": "fawn", "kicker": "One fawn", "level": 0.6, "lines": [
    "In 1979 the atheist philosopher William Rowe pictured a fawn caught in a forest fire no one sees, suffering that seems to serve no good.",
    "We can see no reason for it, he said, so there probably is none. His argument hasn't been refuted.",
    "Weigh it yourself. When you can't see a reason, how sure can you be that there isn't one?"]},
  {"id": "flea", "kicker": "The garage and the flea", "level": 0.55, "lines": [
    "In 1984 Stephen Wykstra asked when that step is fair. See no car in your garage, and there's none. See no flea across a room, and you can't be sure.",
    "If God exists, the distance between his mind and ours is far greater.",
    "In Job, the reader is shown a reason for Job's suffering, and Job is never told it. God answers him only with questions.",
    "Rowe's reply is strong: a loving God would want to assure sufferers there is a reason, and many receive no such assurance."],
   "scripture": S("Job 38:4", "Where were you when I laid the foundations of the earth? Tell Me, if you have understanding.")},
  {"id": "nature", "kicker": "Earthquakes and cancer", "level": 0.5, "lines": [
    "Free will doesn't reach earthquakes, cancer or the suffering of animals. In 1989 Paul Draper argued that the pain in nature is what we'd expect if nothing behind it cared.",
    "Christians give several answers, and differ over them: stable laws, long ages, a creation groaning until it's set free. Each has a cost.",
    "But indifference has a cost too. It explains the pain well. It can't call it wrong, and it can't promise that it will end."],
   "scripture": S("Romans 8:22", "We know that the whole creation has been groaning together in the pains of childbirth until the present time.")},
  {"id": "event", "kicker": "God came into it", "level": 0.75, "lines": [
    "What Christianity offers isn't an explanation but an event. God didn't stay outside the suffering.",
    "The Son took a body that could be hurt, and on the cross he prayed the first line of Psalm 22.",
    "My God, My God, why have You forsaken Me?",
    "If he was raised, then suffering is real evil, and it won't win. The risen Jesus still carried the marks of the nails."],
   "scripture": S("Matthew 27:46", "My God, My God, why have You forsaken Me?", True)},
  {"id": "job", "kicker": "Allowed to ask", "level": 0.6, "lines": [
    "No one can say why this child, why this disease, why this much. Job never found out. But he was allowed to ask, and at the end he said,",
    "My ears had heard of You, but now my eyes have seen You."],
   "scripture": S("Job 42:5", "My ears had heard of You, but now my eyes have seen You.", True)},
  {"id": "close", "kicker": "The last word", "level": 0.3, "lines": [
    "The Bible's last picture is of God himself.",
    "He will wipe away every tear from their eyes.",
    "That doesn't tell anyone why. It tells us who has the last word, and that he has carried the wound himself."],
   "scripture": S("Revelation 21:4", "He will wipe away every tear from their eyes", True),
   "titleCard": ["Not why, but who has the last word.", END]},
], NOTE)
