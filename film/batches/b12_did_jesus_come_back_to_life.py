"""Batch 12: "Did Jesus come back to life?", rebuilt from the Bible Explorer film of the same slug as a longer film.
Sources, and nothing else: client/public/explorer/films/did-jesus-come-back-to-life.json (older captions) and its rows
in docs/work/elite/explorer-ledger.md; client/public/questions/jesus/the-empty-tomb.json and
the-appearances-and-the-alternatives.json, with their record files in docs/work/elite/apol-pilot/jesus/; and the Honest
Answer "did-the-resurrection-actually-happen" in client/src/data/answers.ts. The film "the-oldest-report" covers
1 Corinthians 15 in depth, so here the creed is one witness among several. The theft charge is framed, as the
empty-tomb page frames it, as an argument among first-century Jews, Jesus' followers among them; no people is blamed.
The old film's care line stays on the page and is not in the narration."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Rebuilt on 2026-11-26 from the Bible Explorer film of the same slug, the question pages 'The empty tomb' and 'The appearances and the alternatives' (with their record files), and the Honest Answer 'Did the resurrection actually happen?'; every claim and its source is in film/did-jesus-come-back-to-life/facts.md."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("did-jesus-come-back-to-life", "Did Jesus really come back to life?", P("did-jesus-come-back-to-life"), [
  {"id": "question", "kicker": "A fair question", "level": 0.2, "lines": [
    "Christians say God raised Jesus from the dead, in his body. It's fair to ask whether that happened.",
    "History can't prove a miracle. But the case is stronger than most people have been told."]},
  {"id": "against", "kicker": "The case against", "level": 0.35, "lines": [
    "In 1748 David Hume argued that the dead staying dead is as uniform as experience gets. A witness to a rising is always more likely deceived or deceiving.",
    "Bart Ehrman, an agnostic scholar, adds that the Gospels came decades later and that Rome often left the crucified unburied.",
    "Grant what's true. Legends do grow. Grief does produce visions. A claim like this should face a higher bar."]},
  {"id": "facts", "kicker": "What historians grant", "level": 0.45, "lines": [
    "Still, nearly every historian of the period, skeptics included, accepts a short list. First, Jesus was crucified under Pontius Pilate. Tacitus, a Roman historian who despised Christians, recorded it.",
    "Second, his followers were soon convinced they'd seen him alive. Paul passes on a summary he received, which most scholars date within a few years.",
    "E. P. Sanders, no apologist, judged their experiences a fact. What gave rise to them, he said, he did not know."],
   "scripture": S("1 Corinthians 15:4-5", "that He was buried, that He was raised on the third day according to the Scriptures, and that He appeared to Cephas and then to the Twelve.")},
  {"id": "changed", "kicker": "Two unlikely witnesses", "level": 0.55, "lines": [
    "Third, two people with every reason not to believe came to believe. Paul had been trying to destroy the church. And James was Jesus' own brother.",
    "For even His own brothers did not believe in Him.",
    "Yet James went on to lead the church in Jerusalem until he was stoned around 62.",
    "Pause here. What would it take to convince you your own brother had risen?"],
   "scripture": S("John 7:5", "For even His own brothers did not believe in Him.", True)},
  {"id": "city", "kicker": "In the same city", "level": 0.6, "lines": [
    "Fourth, the preaching began within weeks in Jerusalem, where he was buried and the claim was easiest to refute.",
    "The empty tomb itself is more disputed. Historians still divide over it.",
    "So weigh a fair question first. If you were inventing this story, who would bury Jesus, and who would find the tomb empty?"]},
  {"id": "details", "kicker": "Details no one would choose", "level": 0.6, "lines": [
    "Mark names the man who buried him: Joseph of Arimathea, a prominent Council member. An inventor would more likely have picked a disciple.",
    "All four Gospels put women first at the tomb, though Josephus summed up the law as, let not the testimony of women be admitted. That was for courts, so don't press it far.",
    "The earliest opponents we know of never said the body was still there. They said it was stolen.",
    "It was an argument among first-century Jews, Jesus' followers among them, over how the tomb became empty, not whether."],
   "scripture": S("Mark 15:43", "Joseph of Arimathea, a prominent Council member", True)},
  {"id": "word", "kicker": "The word they chose", "level": 0.65, "lines": [
    "Their world had words for seeing the dead. When Peter, freed from prison, knocked at a gate, the believers inside said, It must be his angel.",
    "Resurrection, N. T. Wright argues, meant something else: the bodily raising of God's people at the end of history. No one expected one man raised ahead of everyone while the world went on."],
   "scripture": S("Acts 12:15", "It must be his angel.", True)},
  {"id": "rivals", "kicker": "The other explanations", "level": 0.7, "lines": [
    "Each rival explains a part. Visions fit Peter's grief. But Paul wasn't mourning Jesus. He was hunting his followers.",
    "Legend needs time, and the list came within a few years. Fraud means men suffered for the claim while knowing where they'd put the body.",
    "And survival? David Friedrich Strauss, a skeptic, saw that a half-dead man needing bandages could never convince anyone he had conquered death."]},
  {"id": "reply", "kicker": "The strongest reply", "level": 0.75, "lines": [
    "The best reply mixes them: a lost grave, a vision, a conviction that spread, later legend. Any ordinary story, it says, beats a miracle.",
    "But the pieces multiply, each thin where it most needs to be thick. And whether a natural story beats a miracle depends on whether there's a God who might raise the dead.",
    "So ask yourself honestly. Had you already decided that God can't act, before you looked?"]},
  {"id": "open", "kicker": "What stays open", "level": 0.55, "lines": [
    "What exactly the witnesses saw is beyond the reach of history, and historians who grant their experiences disagree about the cause.",
    "Christians differ on how much weight this kind of argument carries. Together they confess that the body that was buried was raised."]},
  {"id": "close", "kicker": "Weigh it", "level": 0.3, "lines": [
    "History won't carry anyone to faith. It can move a person from dismissing the claim to weighing it. Matthew doesn't hide the doubt.",
    "When they saw Him, they worshiped Him, but some doubted.",
    "You can weigh it all and still say no. Just don't say no without the weighing."],
   "scripture": S("Matthew 28:17", "When they saw Him, they worshiped Him, but some doubted.", True),
   "titleCard": ["Weigh it before you dismiss it.", END]},
], NOTE)
