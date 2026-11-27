# Does God still love me when I do wrong?: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/love-when-i-do-wrong.json` (its "older" captions), with its rows "love 1" to "love 7", "love think" and "love, left out" in `docs/work/elite/explorer-ledger.md`. The other sources are the Study Bible notes on Luke 15 (`client/public/bible/notes/luke/15.json`; `client/public/bible/notes/luke/verses/15.json` was read and agrees, but no claim depends on it alone) and the doctrine pages `client/public/bible/doctrines/love.json`, `repentance.json` and `justification.json`. No Honest Answer in `client/src/data/answers.ts` answers this question directly ("Can you lose your salvation?" is the nearest and is not used). Nothing was added from outside.

The old film's care line ("Thinking about sin can bring up guilt or fear. ...") stays on the page, word for word, and is not in the narration. As the ledger's "love, left out" row requires: no fear as a lever, nothing on anyone's eternal state, no altar call.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27.

- **Luke 15:2** (shown on screen, the grumblers' words): "This man welcomes sinners and eats with them."
- **Luke 15:18** (spoken inside a line, not a scripture card): "Father, I have sinned against heaven and against you"
- **Luke 15:20** (spoken, whole verse): "So he got up and went to his father. But while he was still in the distance, his father saw him and was filled with compassion. He ran to his son, embraced him, and kissed him."
- **Luke 15:24** (spoken, first two sentences; the exclamation marks are the verse's own): "For this son of mine was dead and is alive again! He was lost and is found!"
- **Hebrews 12:6** (shown on screen, first clause): "For the Lord disciplines the one He loves"
- **Romans 5:8** (spoken, without the opening "But"): "God proves His love for us in this: While we were still sinners, Christ died for us."
- **1 John 1:9** (spoken, first clause): "If we confess our sins, He is faithful and just to forgive us our sins"
- **Luke 15:31** (spoken inside a line: "Son, you are always with me"; shown on screen: "and all that is mine is yours")
- **Romans 8:39** (shown on screen, last clause): "nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."

Luke 15:13 is not quoted: its BSB wording ("journeyed") trips the banned-word check.

## Claims, by chapter

**question**
- Religious leaders grumbled that Jesus welcomed sinners and ate with them; he answered with three stories of something lost and found: Luke 15 notes, `summary` and `story`; old film frame "question"; ledger "love 1".
- "Luke calls them one parable": Luke 15 notes, `literary` ("verse 3 calls it 'this parable', singular").

**left**
- The younger son asks for his share while his father is alive; the request was unusual; selling it off quickly turned family land into cash: Luke 15 notes, `cultural`; ledger "love 2". "Distant country" is BSB Luke 15:13.
- The Greek word (asōtōs) means wastefully, recklessly; "prodigal" means wasteful: Luke 15 notes, `words` G0811. (The note says the English name comes from the Latin tradition's description; the film says only what the word means.)
- "Nothing in the story pretends this was small": old film frame "left", word for word.

**senses**
- Famine; feeding pigs for a Gentile and envying their food was the lowest point imaginable for a Jewish son: Luke 15 notes, `cultural`; ledger "love 3".
- Came to his senses, rehearsed a confession and a request to be a hired servant: BSB Luke 15:17-19; ledger "love 3".
- The speech echoes Pharaoh's words to Moses (Exodus 10:16); some take it as calculated, others as simply the biblical form of confession: Luke 15 notes, `cultural`. ("A bargain" is the film's plain word for "calculated".) No side is taken.

**ran**
- "The father's love is moved before any confession": Luke 15 notes, `doctrines` love, word for word; ledger "love 4".
- Kenneth Bailey argued an elderly landowner running in public was a shameful act; critics (Klyne Snodgrass, Amy-Jill Levine, named in the note, not in the film) reply that the evidence is late or modern: Luke 15 notes, `cultural` and `interpretation`. "Either way, he ran" rests on BSB Luke 15:20. The ledger's "love 2" row says the old film did not use Bailey's disputed readings; this film names one only as disputed, as the note's `teach.pitfalls` permits ("offered as one scholar's reading that others dispute").

**unfinished**
- The father never lets him reach the request to be made a hired servant; robe, ring, sandals answer the request he never finished making: Luke 15 notes, `literary` and `doctrines` salvation; ledger "love 5". (The film drops "and feast".)
- "Embraced before he said a word of his": BSB Luke 15:20-21; Luke 15 notes, `teach.pitfalls` ("he is embraced before he says it") and `teach.pastoral` ("stress the embrace before the confession").
- The "Pause here" question is the film's own turn to the viewer, not a claim.

**matters**
- Repentance is the human side of being found by God, and the father's welcome runs ahead of it: Luke 15 notes, `doctrines` repentance; ledger "love 6". "It doesn't cancel it" rests on the repentance doctrine page, `errors` (the church rejected "cheap grace", forgiveness announced without any call to turn).
- Dietrich Bonhoeffer, 1937, named forgiveness without repentance "cheap grace": justification doctrine page, `errors` ("Dietrich Bonhoeffer's Discipleship (1937) named this cheap grace, the forgiveness proclaimed without repentance or obedience").
- Love disciplines the children it loves (Hebrews 12:6); "Love is not measured by what it permits but by what it gives": love doctrine page, `errors`, nearly word for word.

**cross**
- The objection that the father forgives without sacrifice or payment, so the cross is unnecessary: Luke 15 notes, `hard` (first question).
- Faustus Socinus argued God, like a creditor, can freely remit a debt without satisfaction: same, `hard` (the note dates his book, De Jesu Christo Servatore, to 1594; the film gives no date).
- Jewish readers: the parable teaches what Judaism has always taught, that God receives the one who returns; Christians can gladly agree: same, `hard`. "There's truth in that" is the film's summary of that agreement.
- A parable makes one or a few points: same, `hard` ("Christian responses begin with genre"), and `teach.pitfalls` ("parables make a few points and do not say everything"). B. B. Warfield's sermon (1913) is in the note but not named in the film.
- Paul names the cost: BSB Romans 5:8; old film frame "matters"; ledger "love 6"; the love doctrine page's keyTexts (Romans 5:5-8, "God proves his love in Christ's death for sinners").

**accounts**
- A conscience that keeps its own accounts is never at rest, because the books never balance: justification doctrine page, `life`.
- Repentance is not self-punishment and does not require a sinner to feel sorry enough before God will listen; it is turning around: repentance doctrine page, `life`, nearly word for word. "Going home" echoes Luke 15 notes, `teach.outline` 17-24 ("Repentance comes to its senses and goes home").
- Confess and be forgiven: BSB 1 John 1:9; old film frame "nothing"; ledger "love 7".

**older**
- The older son never left and refuses to go in; he counts his standing by years of service, like wages: BSB Luke 15:28-29; Luke 15 notes, `doctrines` justification ("obedience reckoned as wages").
- The father goes out to him too and says "Son, you are always with me": BSB Luke 15:28, 31; Luke 15 notes, `doctrines` love and `literary`.
- The story ends open with the older son outside, deciding whether to go in: Luke 15 notes, `literary`; old film `think`; ledger "love think".
- "Which son are you more like?": Luke 15 notes, `questions.apply` (first question), turned to the viewer.

**close**
- Many find it easier to serve God than to believe he delights in them; he set his love on his people because he loved them (Deuteronomy 7:7-8), and nothing can separate them from it (Romans 8:39): love doctrine page, `life`, nearly word for word; old film frame "nothing"; ledger "love 7".
- For those whose earthly fathers were absent or cruel, the picture of God as father may be hard; the shepherd and the woman sweeping her house show the same seeking love: Luke 15 notes, `teach.pastoral`, nearly word for word.
- TitleCard, "The welcome runs ahead of the confession. It never makes the wrong small.": the film's own closing line, resting on the Luke 15 notes' `doctrines` repentance ("the father's welcome runs ahead of it") and the old film's frame "matters" ("Grace does not make sin small").
