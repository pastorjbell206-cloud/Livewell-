"""Batch 13 film: "What about people who never heard?" (slug never-heard). Sources, and nothing else: the old Bible
Explorer film client/public/explorer/films/never-heard.json (older captions, think, differ notes) with its rows in
docs/work/elite/explorer-ledger.md ("What about people who never heard?" rows); the live hard-question pages
client/public/questions/religions/those-who-never-heard.json and is-it-arrogant-to-say-jesus-is-the-only-way.json, whose
sources were checked in docs/work/elite/apol-pilot/religions/those-who-never-heard.md and
is-it-arrogant-to-say-jesus-is-the-only-way.md (ledger docs/work/elite/apol-ledger.md, twentieth run, keys "az" and "ay");
and the Honest Answer "is-jesus-the-only-way" in client/src/data/answers.ts. The film names each Christian answer fairly
and takes no side among them. The old film's care line stays on the page and is not narrated.
Scripture is the Berean Standard Bible, checked by film/tools/write-script.py."""
import sys; sys.path.insert(0, "film/tools")
from importlib import import_module
write = import_module("write-script").write
NOTE = "Written on 2026-11-26 from the Bible Explorer film never-heard (with its explorer-ledger rows), the hard-question pages client/public/questions/religions/those-who-never-heard.json and is-it-arrogant-to-say-jesus-is-the-only-way.json (records in docs/work/elite/apol-pilot/religions/, apol-ledger keys az and ay), and the Honest Answer is-jesus-the-only-way in client/src/data/answers.ts."
S = lambda ref, text, spoken=False: {"reference": ref, "text": text, "spoken": spoken}
END = "LiveWell by James Bell"

write("never-heard", "What about people who never heard?", "/study/explorer/watch/never-heard", [
  {"id": "village", "kicker": "A woman in a village", "level": 0.2, "lines": [
    "Picture a woman who lived a thousand years ago, in a village where the name of Jesus had never been spoken.",
    "She was honest. She loved her children. She prayed to whatever she knew of God. What becomes of her?"]},
  {"id": "case", "kicker": "The case against", "level": 0.35, "lines": [
    "Kenneth Himma made her into an argument in 2002. A perfectly good God wouldn't punish people who aren't to blame, and people of other faiths generally aren't to blame for their beliefs.",
    "John Hick added the fact underneath. In God Has Many Names, in 1980, he wrote that a person's religion depends, in the great majority of cases, on where he was born. Is salvation, then, luck?"]},
  {"id": "true", "kicker": "What's true in it", "level": 0.4, "lines": [
    "Much of this is true, and Scripture said it first. Abraham pressed God: Will not the Judge of all the earth do what is right? God didn't rebuke the question. He answered it.",
    "And most people who have ever lived never heard the name of Jesus. A shrug is the wrong answer."],
   "scripture": S("Genesis 18:25", "Will not the Judge of all the earth do what is right?", True)},
  {"id": "two-claims", "kicker": "Two claims, not one", "level": 0.5, "lines": [
    "Pause here and ask yourself: is saved only by Christ the same claim as saved only by knowing his name in this life?",
    "The objection runs them together. Scripture keeps them apart. The church confesses the first without hedging: there is no other name under heaven given to men by which we must be saved.",
    "Peter said that as a prisoner on trial. It wasn't a boast. The second claim may be true. But it's a different claim."],
   "scripture": S("Acts 4:12", "there is no other name under heaven given to men by which we must be saved", True)},
  {"id": "abraham", "kicker": "Before Bethlehem", "level": 0.5, "lines": [
    "Abraham lived long before Bethlehem, yet Abram believed the LORD, and it was credited to him as righteousness.",
    "Every Christian tradition holds that he was saved by Christ, by a work done centuries later."],
   "scripture": S("Genesis 15:6", "Abram believed the LORD, and it was credited to him as righteousness.", True)},
  {"id": "light", "kicker": "By the light they had", "level": 0.55, "lines": [
    "Scripture measures judgment by the light a person had. No one in it is condemned for never hearing a name.",
    "But Paul also says all have sinned. So weigh this: can someone be rescued by a Christ he never knew? Faithful Christians answer that in more than one way."],
   "scripture": S("Romans 2:15", "the work of the law is written on their hearts")},
  {"id": "first", "kicker": "First: hear and believe", "level": 0.6, "lines": [
    "The first answer is often called restrictivism. A person must hear the gospel and trust Christ in this life. Ronald Nash argued for it in 1994.",
    "No one is condemned for not hearing, its holders add, only for sin against the light he had, and God may bring the gospel to anyone who seeks him.",
    "Its hardest question: the multitudes who lived and died with no messenger in reach."],
   "scripture": S("Romans 10:14", "And how can they believe in the One of whom they have not heard?")},
  {"id": "second", "kicker": "Second: his work reaches further", "level": 0.6, "lines": [
    "The second is often called inclusivism. No one is saved apart from Christ, but his work may reach some who never knew his name and who answered, in faith, the light God gave them.",
    "Karl Rahner is its best-known defender. Clark Pinnock argued a form of it in 1992.",
    "Its hardest question: why does the New Testament press so hard on hearing? Even devout Cornelius still had to be told."]},
  {"id": "third", "kicker": "Third: a meeting with Christ", "level": 0.55, "lines": [
    "A third answer: everyone will meet Christ and be able to answer him, at death or after it. Its holders read Peter's words, the gospel was preached even to those who are now dead, as a door the church shouldn't close.",
    "Its hardest question: man is appointed to die once, and after that to face judgment.",
    "Some, like Origen and Gregory of Nyssa, have hoped God will in the end restore all. The church's councils and confessions have generally not received that hope."],
   "scripture": S("1 Peter 4:6", "the gospel was preached even to those who are now dead", True)},
  {"id": "reply", "kicker": "Without comfort?", "level": 0.5, "lines": [
    "The strongest reply: this is a distinction without comfort. If only those who hear can be rescued, rescue still depends on where you were born.",
    "That's fair, and it lands on one Christian view, not on the confession. Inclusivists deny its premise. Some restrictivists argue that God, knowing what every person would freely do, may leave no one who would have believed without the chance; critics answer that this can't be shown true. Others confess that his ways are above ours. A viewer may find none of these sufficient."]},
  {"id": "judge", "kicker": "Who the Judge is", "level": 0.3, "lines": [
    "Which answer is right, the creeds don't settle, and this film won't either.",
    "What all confess is who the Judge is. The Father judges no one, but has assigned all judgment to the Son, the one who wept at a friend's grave.",
    "Almost everyone who asks this has heard. Pause and ask yourself what you're meant to do with what you've been told."],
   "scripture": S("John 5:22", "the Father judges no one, but has assigned all judgment to the Son", True),
   "titleCard": ["We were never handed the list. We were told who keeps it.", END]},
], NOTE)
