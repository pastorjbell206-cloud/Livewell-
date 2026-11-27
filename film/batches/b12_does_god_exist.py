"""Batch 12 film: "Does God exist?" (slug does-god-exist), the argument from why anything exists at all, what it
shows, what it does not, and the case against at its strongest. Sources, and nothing else: the old Bible Explorer film
client/public/explorer/films/does-god-exist.json (older captions) with its rows in docs/work/elite/explorer-ledger.md;
the live hard-question page client/public/questions/god/the-cosmological-argument.json, whose sources were checked in
docs/work/elite/apol-pilot/god/the-cosmological-argument.md; and the Honest Answer "does-god-actually-exist" in
client/src/data/answers.ts. "Who made God?" and the burden of proof belong to the sibling film who-made-god and are
named here only in passing. The old film has no care line and no "differ" note."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-26 from the Bible Explorer film does-god-exist (older captions, with its explorer-ledger rows), the hard-question page client/public/questions/god/the-cosmological-argument.json (sources checked in docs/work/elite/apol-pilot/god/the-cosmological-argument.md) and the Honest Answer does-god-actually-exist in client/src/data/answers.ts; Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
P = lambda b: f"/study/explorer/watch/{b}"
END = "LiveWell by James Bell"

write("does-god-exist", "Does God exist?", P("does-god-exist"), [
  {"id": "question", "kicker": "A fair question", "level": 0.2, "lines": [
    "Does God actually exist? The case against is stronger than many believers admit, and nothing here forces anyone to agree.",
    "But there are reasons, each open to inspection. This film weighs one: that anything exists at all."]},
  {"id": "something", "kicker": "Something rather than nothing", "level": 0.3, "lines": [
    "In 1714 Gottfried Leibniz set down what he took to be the first question we have a right to ask.",
    "“Why does something exist rather than nothing? For ‘nothing’ is simpler and easier than ‘something.’”",
    "The universe, all of space, time, matter and energy, could have been different, or not been at all."]},
  {"id": "ball", "kicker": "A ball in the woods", "level": 0.4, "lines": [
    "Pause here. In 1963 the philosopher Richard Taylor asked his readers to imagine finding a large translucent ball in the woods.",
    "Would you think it simply exists, for no reason?",
    "No one would. And making the ball the size of the universe doesn't make the question go away. It makes it bigger."]},
  {"id": "chain", "kicker": "No beginning needed", "level": 0.45, "lines": [
    "This argument doesn't need the universe to have had a beginning. Thomas Aquinas held that reason alone can't show the world began in time.",
    "Alexander Pruss pictures an endless line of hens and eggs. Each hen is explained by an egg, each egg by a hen.",
    "That still leaves untouched why there's such a line rather than none. A longer chain is still a chain that needs explaining."]},
  {"id": "steps", "kicker": "The argument, in three steps", "level": 0.5, "lines": [
    "One. Anything that exists but might not have existed has an explanation outside itself.",
    "Two. The universe is that kind of thing.",
    "Three. So its explanation is something that exists necessarily, not made of space, time or matter."]},
  {"id": "against", "kicker": "The case against", "level": 0.6, "lines": [
    "In David Hume's Dialogues, published in 1779 after his death, one speaker objects, “why may not the material universe be the necessarily existent Being”?",
    "In 1948, debating the Jesuit Frederick Copleston on BBC radio, Bertrand Russell said, “I should say that the universe is just there, and that's all.”",
    "To him, needing a cause for the whole because each part has one is like arguing that a wall must be small because each brick is."]},
  {"id": "true", "kicker": "What is true in it", "level": 0.55, "lines": [
    "Much of that is true. The principle that everything has an explanation can't be proved from anything more certain than itself.",
    "In 2012 Lawrence Krauss argued that physical law can account for a universe coming to be without a creator.",
    "And if the argument said everything needs a cause, God would need one too. That question has its own film."]},
  {"id": "replies", "kicker": "Weigh the replies", "level": 0.6, "lines": [
    "A fair question before the answers: if every part of the universe might not have existed, what would make the whole unable not to exist?",
    "Not every step from parts to whole is a mistake. A wall made entirely of brick is a brick wall.",
    "And the nothing in Krauss's book, the philosopher David Albert objected, is a state described by quantum laws. That's still a universe that might not have been."]},
  {"id": "stops", "kicker": "Where it stops", "level": 0.7, "lines": [
    "The strongest reply is parity. Every account of reality stops somewhere. The atheist may stop at the universe or its basic laws, and is no more irrational for doing so.",
    "The answer is that the demand for a reason applies to what might not have been. Whether there can be a being whose existence isn't received from anything is the real crux, and philosophers divide over it.",
    "Pause and ask yourself: where do you think explanations stop, and why?"]},
  {"id": "shows", "kicker": "Not yet Christianity", "level": 0.6, "lines": [
    "If the argument is sound, it shows a necessary being that explains the universe. That's a large part of what believers in one God mean by the word.",
    "It isn't proof in the mathematician's sense, and it isn't yet Christianity. It doesn't show that God is three persons, or that he became a man.",
    "Paul in Athens began here.",
    "The God who made the world and everything in it is the Lord of heaven and earth.",
    "Then he went straight to the resurrection, a question of history."],
   "scripture": S("Acts 17:24", "The God who made the world and everything in it is the Lord of heaven and earth", True)},
  {"id": "weigh", "kicker": "Weigh it for yourself", "level": 0.3, "lines": [
    "Christians differ on how much this can carry. Some, following Aquinas, hold that reason can show God exists. Others hold that belief can be warranted without such arguments.",
    "Russell's step is where an honest person can disagree. You can weigh all of this and still say no. What you can't honestly say is that there's nothing to weigh."],
   "scripture": S("Colossians 1:17", "He is before all things, and in Him all things hold together."),
   "titleCard": ["The universe is still there, asking why.", END]},
], NOTE)
