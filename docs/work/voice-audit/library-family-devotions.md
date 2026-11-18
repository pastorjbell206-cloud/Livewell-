# Voice audit: family devotions, seasonal devotions, catechism
Files read in full (read-only):
- `/home/user/Livewell-/client/public/family-devotions.json`
- `/home/user/Livewell-/client/public/family-devotions-2.json`
- `/home/user/Livewell-/client/public/family-seasonal.json`
- `/home/user/Livewell-/client/public/family-catechism.json`

**human_score: 5 / 10. voice_score: 4 / 10.**

Sound, kind and orthodox, and audibly machine-shaped: no contractions in 35,000 words meant to be spoken, an 'is not ... It is ...' pair in nearly half the pieces, a slogan at the end of most reflections, and one mould for all 72 devotions. Thanksgiving week shows what the library sounds like when it is his.
Standard applied: `docs/VOICE-JAMES-BELL.md` (governing), `docs/work/essays/BRIEF.md`, CLAUDE.md voice sections, and the saved Substack profile as a supporting reference. These pieces are read aloud to children, so they were judged as speech.

## 1. Patterns that repeat

### A. No contractions anywhere

35,465 words of prose written to be read aloud to children contain zero contractions ("do not", "cannot", "it is", "you are" every time; "cannot" alone 67 times). This is the single loudest machine tell in the library. Fix as a pass, by ear, across reflection, questions, activity, prayer, grownups.line and catechism commentary. Leave passageText and scriptureText untouched, leave the formal catechism `answer` and `kidsAnswer` fields uncontracted (they are memorised), and keep a full "do not" or "is not" where the sentence leans on it. Roughly two in three should contract.

- `family-devotions.json` › `identity` › `reflection` (must)
  - Quote: "But you do not have to earn the right to exist."
  - Replace with: "But you don't have to earn the right to exist."
  - Tell: No contractions in speech. 35,000 words meant to be read aloud to children hold not one contraction. No parent says "you do not have to" at the table; the ear hears a machine or a legal notice. VOICE-JAMES-BELL.md prefers contractions where they make prose sound spoken.

- `family-devotions-2.json` › `prayer` › `reflection` (must)
  - Quote: "You do not have to be fancy. You just have to be honest."
  - Replace with: "You don't have to be fancy. You just have to be honest."
  - Tell: No contractions in speech. 35,000 words meant to be read aloud to children hold not one contraction. No parent says "you do not have to" at the table; the ear hears a machine or a legal notice. VOICE-JAMES-BELL.md prefers contractions where they make prose sound spoken.

- `family-catechism.json` › `Q66` › `commentary` (must)
  - Quote: "You do not need to pretend you can prove every line."
  - Replace with: "You don't need to pretend you can prove every line."
  - Tell: No contractions in speech. 35,000 words meant to be read aloud to children hold not one contraction. No parent says "you do not have to" at the table; the ear hears a machine or a legal notice. VOICE-JAMES-BELL.md prefers contractions where they make prose sound spoken.

- `family-seasonal.json` › `advent.day12` › `reflection` (must)
  - Quote: "You are allowed to bring your real questions to God. He is not fragile."
  - Replace with: "You're allowed to bring your real questions to God. He isn't fragile."
  - Tell: No contractions in speech. 35,000 words meant to be read aloud to children hold not one contraction. No parent says "you do not have to" at the table; the ear hears a machine or a legal notice. VOICE-JAMES-BELL.md prefers contractions where they make prose sound spoken.

### B. "X is not A. It is B." as the default gait

115 two-sentence "is not ... It is ..." pairs across 86 of 188 pieces; 28 of 72 Big Ideas are built on "not"; a further 62 ", not ..." tails and 48 "not just/only". Rule for the fixer: at most one per piece, at the real hinge. Where the Big Idea uses it, the reflection may not.

- `family-devotions.json` › `fear-and-anxiety` › `reflection` (must)
  - Quote: "Trust is not the absence of fear. Trust is what you do with your hands while your heart is still pounding."
  - Replace with: "You can trust God while your heart is still pounding."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library. This piece has three in 130 words; keep the one about the promise.

- `family-devotions-2.json` › `heaven` › `reflection` (should)
  - Quote: "That is not an escape from the real world. It is the real world finally made the way it was always meant to be."
  - Replace with: "That is the real world, finally made the way it was always meant to be."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library. The Big Idea and the first paragraph already used the move.

- `family-seasonal.json` › `advent.day18` › `reflection` (should)
  - Quote: "The wonder of Christmas is not just that a baby was born. It is that the One who made everything chose to become small enough to be held."
  - Replace with: "The wonder of Christmas is that the One who made everything chose to become small enough to be held."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library.

- `family-catechism.json` › `Q33` › `commentary` (should)
  - Quote: "Calling Jesus Lord is not a polite religious phrase. It is a surrender. It means he gets a say in our money, our anger, our screens, our marriages."
  - Replace with: "When we call Jesus Lord, we're giving him a say in our money, our anger, our screens, our marriages."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library. The denied position ("a polite religious phrase") is one nobody at the table holds.

- `family-devotions.json` › `why-we-pray` › `bigIdea` (should)
  - Quote: "Prayer is not magic words. It is talking to a Father who is actually listening."
  - Replace with: "When you pray, you are talking to a Father who is listening."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library.

- `family-devotions-2.json` › `the-cross` › `reflection` (should)
  - Quote: "The cross was not an accident or a defeat. It was a choice."
  - Replace with: "Nobody forced the cross on Jesus."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library.

- `family-devotions-2.json` › `rest-and-sabbath` › `reflection` (should)
  - Quote: "Rest is not laziness. Rest is trusting that the world keeps spinning even when you stop pushing it."
  - Replace with: "When you rest, you're trusting that the world keeps spinning even when you stop pushing it."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library.

- `family-devotions.json` › `serving-others` › `reflection` (should)
  - Quote: "Serving is not losing. It is the most like Jesus a person can be."
  - Replace with: "Nobody is more like Jesus than the person doing the serving."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library.

- `family-catechism.json` › `Q3` › `commentary` (should)
  - Quote: "That is not a cold fact. It is the ground you stand on when everything else shifts."
  - Replace with: "That is the ground you stand on when everything else shifts."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library.

- `family-seasonal.json` › `advent.day7` › `reflection` (should)
  - Quote: "The promise is not that the dark is fake. The promise is that a light is coming into it, and the dark has never once been able to put it out."
  - Replace with: "The promise is that a light is coming into it, and the dark has never once been able to put it out."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library. Same skeleton as fear-and-anxiety ("The promise here is not that ... The promise is that ...").

- `family-devotions-2.json` › `the-new-creation` › `reflection` (should)
  - Quote: "The story does not end with an escape. It ends with a homecoming, a world remade, where God lives with his people forever."
  - Replace with: "The story ends with a homecoming, a world remade, where God lives with his people forever."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library. Third antithesis in this piece.

- `family-devotions-2.json` › `joy` › `reflection` (should)
  - Quote: "That joy is not just a nice feeling. The Bible says it is our strength."
  - Replace with: "The Bible says that joy is our strength."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library.

- `family-devotions.json` › `who-is-jesus` › `reflection` (should)
  - Quote: "He left us with a real decision, not a soft compliment."
  - Replace with: "He left us with a real decision."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library. Also a two-beat epigram closer.

- `family-devotions.json` › `who-is-jesus` › `bigIdea` (should)
  - Quote: "Jesus is not just a kind man from history. He is God you can actually see."
  - Replace with: "Jesus is more than a kind man from history. He is God you can see."
  - Tell: "X is not A. It is B." as the default gait. 115 two-sentence "is not ... It is ..." pairs sit in 86 of the 188 pieces, and 28 of 72 Big Ideas are built on "not". One at a true hinge is his voice; at this rate it is the most recognisable machine rhythm in the library.

- `family-catechism.json` › `Q2` › `commentary` (should)
  - Quote: "For the skeptic at your table, the answer is not a clever argument but an invitation to look honestly at what is already speaking."
  - Replace with: "The skeptic at your table needs an invitation to look at what is already speaking more than he needs an argument."
  - Tell: "X is not A. It is B." as the default gait. "Clever" twice in three sentences, a not/but pair, and "honestly" as a self-certifying adverb.

### C. Aphoristic closers

Most reflections end on a slogan that restates the paragraph. Cut the slogan and let the paragraph end on its last concrete sentence.

- `family-seasonal.json` › `holyWeek.day8` › `reflection` (must)
  - Quote: "And because he lives, the worst thing is never the last thing."
  - Replace with: "And because he lives, death will not keep anyone who belongs to him."
  - Tell: Uncredited stock line used as the Easter closer. "The worst thing is never the last thing" is a well-known line usually credited to Frederick Buechner. Here it runs unattributed as James's own closing sentence, on the most important day in the library.

- `family-seasonal.json` › `holyWeek.day5` › `reflection` (should)
  - Quote: "If that is how the greatest one acted, then greatness in his family will always look like serving, never like being served. Real love kneels down."
  - Replace with: "If that is how the greatest one acted, then greatness in his family will always look like serving, never like being served."
  - Tell: Aphoristic closer (pillow line). The reflection ends by restating itself as a slogan. Most of the 72 devotions and many Advent days close this way, so the ear learns to expect the bow.

- `family-devotions-2.json` › `the-fruit-of-the-spirit` › `reflection` (should)
  - Quote: "The question is less try harder and more stay connected. Healthy roots, good fruit."
  - Replace with: "So the question to ask is whether you're staying connected, more than whether you're trying hard enough."
  - Tell: Aphoristic closer (pillow line). The reflection ends by restating itself as a slogan. Most of the 72 devotions and many Advent days close this way, so the ear learns to expect the bow. "Healthy roots, good fruit" is a verbless bumper sticker.

- `family-devotions-2.json` › `courage` › `reflection` (should)
  - Quote: "You can be scared and brave at the same time. In fact, that is the only kind of brave there is."
  - Replace with: "You can be scared and brave at the same time."
  - Tell: Aphoristic closer (pillow line). The reflection ends by restating itself as a slogan. Most of the 72 devotions and many Advent days close this way, so the ear learns to expect the bow.

- `family-devotions-2.json` › `rest-and-sabbath` › `reflection` (consider)
  - Quote: "A family that never stops is a family that forgets how to be glad together."
  - Replace with: "A family that never stops forgets how to be glad together."
  - Tell: Symmetrical "A family that ... is a family that ..." closer. Perfect parallelism; the plain version says the same thing in a father's voice.

- `family-catechism.json` › `Q66` › `commentary` (should)
  - Quote: "Welcome the question. A faith that cannot be questioned cannot be trusted."
  - Replace with: "Welcome the question."
  - Tell: Aphoristic closer (pillow line). Chiasmus epigram and a familiar stock line. The paragraph has already made the point with evidence.

- `family-catechism.json` › `Q58` › `commentary` (should)
  - Quote: "The law is a mirror before it is a map. It shows children their real need"
  - Replace with: "The law shows children their real need"
  - Tell: Aphoristic closer (pillow line). Alliterative epigram used as an opener; Q22 already uses the mirror image properly.

- `family-catechism.json` › `Q62` › `commentary` (should)
  - Quote: "again and again, that he gave himself for them. The gospel is something we eat, not only something we hear."
  - Replace with: "again and again, that he gave himself for them."
  - Tell: Aphoristic closer (pillow line). The reflection ends by restating itself as a slogan. Most of the 72 devotions and many Advent days close this way, so the ear learns to expect the bow.

- `family-devotions-2.json` › `kindness` › `reflection` (should)
  - Quote: "It is a gentle word when you could have said a sharp one. Kindness is just love made small enough to fit into an ordinary day."
  - Replace with: "It is a gentle word when you could have said a sharp one."
  - Tell: Aphoristic closer (pillow line). The reflection ends by restating itself as a slogan. Most of the 72 devotions and many Advent days close this way, so the ear learns to expect the bow.

- `family-seasonal.json` › `advent.day13` › `reflection` (consider)
  - Quote: "God is never late, even when he is slow enough to make us wonder if he forgot."
  - Replace with: "God had not forgotten, even though he was slow enough to make people wonder."
  - Tell: Aphoristic closer (pillow line). "God is never late" is a greeting-card commonplace.

- `family-devotions-2.json` › `worship` › `reflection` (should)
  - Quote: "The question is never whether you worship. The question is what."
  - Replace with: "So the question to ask is what you worship."
  - Tell: Aphoristic closer (pillow line). Balanced two-beat closer, and the paragraph's "Everyone worships something" premise is a much-quoted commonplace; the plain version keeps the point.

- `family-devotions-2.json` › `the-incarnation` › `reflection` (should)
  - Quote: "He had to be fed and held and taught to walk, just like you once were. The Maker of the stars learned to count them on his fingers."
  - Replace with: "He had to be fed and held and taught to walk, just like you once were."
  - Tell: Fresh literary image where a plain phrase would do. An invented, cute image (the Gospels say nothing of it) performing wonder after the plain sentence already delivered it.

- `family-devotions.json` › `serving-others` › `prayer` (consider)
  - Quote: "Jesus, you took the towel when you could have taken the throne."
  - Replace with: "Jesus, you knelt with a towel when you had every right to be served."
  - Tell: Alliterative antithesis in a child's prayer. Towel/throne is a preacher's slogan; no child prays in chiasmus.

- `family-catechism.json` › `Q51` › `commentary` (should)
  - Quote: "because the last word does not belong to cancer or war or death. It belongs to him."
  - Replace with: "because Jesus will outlast cancer and war and death."
  - Tell: Duplicated closer across files. Near-verbatim repeat of the-second-coming ("The last word does not belong to sadness or death. It belongs to him."); "the last word" closes five pieces.

### D. Fragment stacks

Verbless one- to four-word sentences stacked for drama. Join them into the sentence they belong to.

- `family-devotions-2.json` › `justice-and-the-poor` › `reflection` (should)
  - Quote: "Others have almost no voice at all. The poor. The forgotten. The ones who cannot fight for themselves."
  - Replace with: "Others have almost no voice at all: the poor, the forgotten, the ones who can't fight for themselves."
  - Tell: Fragment stack. One-word and verbless sentences stacked for effect. VOICE-JAMES-BELL.md lists choppy one-sentence stacks first on the avoid list; read aloud they force a dramatic pause a parent would not make.

- `family-devotions-2.json` › `the-new-creation` › `reflection` (should)
  - Quote: "The same world, healed. Mended. Made the way it was always supposed to be."
  - Replace with: "It is the same world, healed and mended and made the way it was always supposed to be."
  - Tell: Fragment stack. One-word and verbless sentences stacked for effect. VOICE-JAMES-BELL.md lists choppy one-sentence stacks first on the avoid list; read aloud they force a dramatic pause a parent would not make.

- `family-devotions-2.json` › `the-prodigal-son` › `reflection` (should)
  - Quote: "Not arms crossed. Arms open, running."
  - Replace with: "His arms are not crossed. They are open, and He is running."
  - Tell: Fragment stack. One-word and verbless sentences stacked for effect. VOICE-JAMES-BELL.md lists choppy one-sentence stacks first on the avoid list; read aloud they force a dramatic pause a parent would not make.

- `family-devotions-2.json` › `gods-faithfulness` › `reflection` (should)
  - Quote: "His mercies are new every morning. Even here. Even now."
  - Replace with: "His mercies are new every morning, even here, even now."
  - Tell: Fragment stack. One-word and verbless sentences stacked for effect. VOICE-JAMES-BELL.md lists choppy one-sentence stacks first on the avoid list; read aloud they force a dramatic pause a parent would not make.

- `family-devotions-2.json` › `goodness` › `reflection` (should)
  - Quote: "Keep going. Keep choosing right. The harvest is coming."
  - Replace with: "So keep going, because the harvest is coming."
  - Tell: Fragment stack. One-word and verbless sentences stacked for effect. VOICE-JAMES-BELL.md lists choppy one-sentence stacks first on the avoid list; read aloud they force a dramatic pause a parent would not make.

- `family-devotions-2.json` › `the-beatitudes` › `reflection` (should)
  - Quote: "The world has a list of who is winning. The rich. The strong. The ones who never need anything."
  - Replace with: "The world has a list of who is winning: the rich, the strong, the ones who never need anything."
  - Tell: Fragment stack. One-word and verbless sentences stacked for effect. VOICE-JAMES-BELL.md lists choppy one-sentence stacks first on the avoid list; read aloud they force a dramatic pause a parent would not make.

- `family-devotions-2.json` › `the-armor-of-god` › `reflection` (consider)
  - Quote: "He gives us armor. Truth like a belt. Faith like a shield. The Bible like a sword."
  - Replace with: "He gives us armor: truth like a belt, faith like a shield, the Bible like a sword."
  - Tell: Fragment stack. One-word and verbless sentences stacked for effect. VOICE-JAMES-BELL.md lists choppy one-sentence stacks first on the avoid list; read aloud they force a dramatic pause a parent would not make.

### E. Patched tail clauses

Big Ideas that end with a bolted-on denial ("..., and there is nothing boring about that kind of strength"). These look like antitheses rewritten by rule rather than by ear. Cut the tail.

- `family-devotions-2.json` › `self-control` › `bigIdea` (must)
  - Quote: "Self control is being strong enough to choose what you do instead of just reacting, and there is nothing boring about that kind of strength."
  - Replace with: "Self-control is being strong enough to choose what you do instead of just reacting."
  - Tell: Tail clause denying a point nobody raised. Reads as an "X is not A, it is B" sentence mechanically rewritten to dodge the antithesis rule: the denial was kept and bolted on the end. A Big Idea a child repeats back should be one plain thought.

- `family-devotions-2.json` › `the-good-shepherd` › `bigIdea` (must)
  - Quote: "Jesus is a shepherd who leads us and would die to keep us safe, and a shepherd does not drive his sheep from behind."
  - Replace with: "Jesus is a shepherd who leads us and would die to keep us safe."
  - Tell: Tail clause denying a point nobody raised. Reads as an "X is not A, it is B" sentence mechanically rewritten to dodge the antithesis rule: the denial was kept and bolted on the end. A Big Idea a child repeats back should be one plain thought.

- `family-devotions-2.json` › `the-fruit-of-the-spirit` › `bigIdea` (must)
  - Quote: "Good character grows in you when the Spirit is at work, like fruit on a tree, and no one has ever forced a tree to bear."
  - Replace with: "Good character grows in you when the Spirit is at work, like fruit on a tree."
  - Tell: Tail clause denying a point nobody raised. Reads as an "X is not A, it is B" sentence mechanically rewritten to dodge the antithesis rule: the denial was kept and bolted on the end. A Big Idea a child repeats back should be one plain thought.

- `family-devotions-2.json` › `gentleness` › `bigIdea` (should)
  - Quote: "Gentleness is strength that chooses to be careful with people, and it takes more strength than shoving does."
  - Replace with: "Gentleness is strength that chooses to be careful with people."
  - Tell: Tail clause denying a point nobody raised. Reads as an "X is not A, it is B" sentence mechanically rewritten to dodge the antithesis rule: the denial was kept and bolted on the end. A Big Idea a child repeats back should be one plain thought.

- `family-devotions-2.json` › `when-someone-hurts-you` › `bigIdea` (should)
  - Quote: "Forgiving someone means you hand the debt to God instead of making them pay, and it never says that what they did was okay."
  - Replace with: "Forgiving someone means you hand the debt to God instead of making them pay. You are not saying that what they did was okay."
  - Tell: Tail clause denying a point nobody raised. Reads as an "X is not A, it is B" sentence mechanically rewritten to dodge the antithesis rule: the denial was kept and bolted on the end. A Big Idea a child repeats back should be one plain thought. Here the second half matters to a hurt child, so it stays, as its own plain sentence.

- `family-catechism.json` › `Q35` › `commentary` (should)
  - Quote: "and paid it while we were still his enemies, which is a long way from grading us on a curve."
  - Replace with: "and paid it while we were still his enemies."
  - Tell: Tail clause denying a point nobody raised. Reads as an "X is not A, it is B" sentence mechanically rewritten to dodge the antithesis rule: the denial was kept and bolted on the end. A Big Idea a child repeats back should be one plain thought.

### F. Announced wonder, announced turns, rulebook leakage

"Think about how amazing this is", "Here is the part that costs something", "So let us be honest", "here is the turn the whole catechism has been waiting for". Delete the announcement; the next sentence already does the work.

- `family-devotions-2.json` › `the-incarnation` › `reflection` (should)
  - Quote: "Think about how amazing this is. The God who made the entire universe"
  - Replace with: "The God who made the entire universe"
  - Tell: Announced wonder or announced turn. The prose tells the family that what follows is amazing, important or costly instead of saying it. Earlier judges flagged announced turns; children hear it as a grown-up selling something.

- `family-devotions-2.json` › `gods-faithfulness` › `reflection` (should)
  - Quote: "What is amazing about this verse is where it shows up."
  - Replace with: "Look at where this verse shows up."
  - Tell: Announced wonder or announced turn. The prose tells the family that what follows is amazing, important or costly instead of saying it. Earlier judges flagged announced turns; children hear it as a grown-up selling something.

- `family-devotions-2.json` › `wisdom` › `reflection` (should)
  - Quote: "The wonderful thing in this verse is how you get wisdom. You ask."
  - Replace with: "The verse also tells you how to get wisdom. You ask."
  - Tell: Announced wonder or announced turn. The prose tells the family that what follows is amazing, important or costly instead of saying it. Earlier judges flagged announced turns; children hear it as a grown-up selling something.

- `family-devotions-2.json` › `the-holy-spirit` › `reflection` (should)
  - Quote: "But Jesus told them something amazing. It is actually better for you that I go, because I am going to send a Helper who will not just be near you, He will be in you."
  - Replace with: "But Jesus told them it was better for them that He go, because He would send a Helper who would not just be near them. He would be in them."
  - Tell: Announced wonder or announced turn. The prose tells the family that what follows is amazing, important or costly instead of saying it. Earlier judges flagged announced turns; children hear it as a grown-up selling something. It also puts a loose first-person paraphrase in Jesus' mouth with no quotation marks; reported speech is safer.

- `family-devotions.json` › `kindness-to-the-outsider` › `reflection` (should)
  - Quote: "Here is the part that costs something. Jesus says invite the people who cannot pay you back."
  - Replace with: "Jesus says invite the people who cannot pay you back."
  - Tell: Announced wonder or announced turn. The prose tells the family that what follows is amazing, important or costly instead of saying it. Earlier judges flagged announced turns; children hear it as a grown-up selling something. "Here is the part that" is a cousin of the forbidden "here's the thing".

- `family-devotions-2.json` › `suffering` › `reflection` (should)
  - Quote: "So let us be honest. It does not say everything that happens is good."
  - Replace with: "It does not say everything that happens is good."
  - Tell: Self-certifying "honest". Announces honesty instead of practising it; 'honest' appears 28 times across the library.

- `family-devotions.json` › `obedience` › `reflection` (consider)
  - Quote: "This is good news, actually. It means God is not trying to turn you into a robot who follows orders."
  - Replace with: "That is good news. God is not trying to turn you into a robot who follows orders."
  - Tell: Announced wonder or announced turn. The prose tells the family that what follows is amazing, important or costly instead of saying it. Earlier judges flagged announced turns; children hear it as a grown-up selling something.

- `family-catechism.json` › `Q24` › `commentary` (should)
  - Quote: "After all the bad news, here is the turn the whole catechism has been waiting for."
  - Replace with: "After all the bad news, here is the good news."
  - Tell: Rulebook leakage. The commentary describes the document's own structure ("the turn") to the parent.

- `family-catechism.json` › `Q68` › `commentary` (consider)
  - Quote: "Hold the mystery and the urgency together, and do not resolve too quickly what God has left partly hidden."
  - Replace with: "Let your child see both, and leave open what God has left partly hidden."
  - Tell: Rulebook leakage. "Do not resolve too quickly" is the editorial standard's own wording leaking into the prose, inside a balanced abstract pair.

### G. Filler intensifiers

"actually" 40, "really" 36, "just" 85, "single" 16, "honest/honestly" 28, "on purpose" 18. Delete on sight unless the word is doing contrastive work.

- `family-devotions.json` › `serving-others` › `reflection` (should)
  - Quote: "He did it because that is what love actually looks like when it stops talking and starts moving."
  - Replace with: "He did it because that is what love looks like when it stops talking and starts moving."
  - Tell: Filler intensifier. "actually" appears 40 times, "really" 36, "just" 85, "single" 16. Each asserts sincerity the sentence should carry by itself.

- `family-devotions-2.json` › `humility` › `reflection` (should)
  - Quote: "Humility is forgetting yourself long enough to actually see the people around you."
  - Replace with: "Humility is forgetting yourself long enough to see the people around you."
  - Tell: Filler intensifier. "actually" appears 40 times, "really" 36, "just" 85, "single" 16. Each asserts sincerity the sentence should carry by itself.

- `family-catechism.json` › `Q49` › `commentary` (should)
  - Quote: "because they show children that he is actually there and actually near."
  - Replace with: "because they show children that he is there and that he is near."
  - Tell: Filler intensifier. "actually" appears 40 times, "really" 36, "just" 85, "single" 16. Each asserts sincerity the sentence should carry by itself.

### H. Stacked superlatives

"deepest" 9 times, "most important" 10, "the strongest/hardest/most ... thing a person can do" 4. Say the thing at its true size.

- `family-devotions-2.json` › `loving-your-enemies` › `reflection` (must)
  - Quote: "It is the strongest, hardest, most God like thing a person can do."
  - Replace with: "It is hard, and it is what God is like."
  - Tell: Stacked superlative. "The most/deepest/strongest thing a person can ..." recurs ("deepest" 9 times, "most important" 10). Superlatives with no concrete case are the vague-intensifier tell, and a skeptic hears overclaim. Also a forced triplet and a missing hyphen.

- `family-devotions-2.json` › `waiting-on-god` › `reflection` (should)
  - Quote: "Waiting on God turns out to be one of the strongest things a person can do."
  - Replace with: "That kind of waiting takes strength."
  - Tell: Stacked superlative. "The most/deepest/strongest thing a person can ..." recurs ("deepest" 9 times, "most important" 10). Superlatives with no concrete case are the vague-intensifier tell, and a skeptic hears overclaim.

- `family-catechism.json` › `Q43` › `commentary` (should)
  - Quote: "For anyone raised without a good father, this is the deepest healing there is."
  - Replace with: "For anyone raised without a good father, this can heal a great deal."
  - Tell: Stacked superlative. "The most/deepest/strongest thing a person can ..." recurs ("deepest" 9 times, "most important" 10). Superlatives with no concrete case are the vague-intensifier tell, and a skeptic hears overclaim. On this subject especially the line should not overpromise; see the note to James.

- `family-catechism.json` › `Q52` › `commentary` (should)
  - Quote: "This is the hope you are handing your children, the deepest comfort there is, that the best is not behind us but ahead of us with him."
  - Replace with: "This is the hope you are handing your children, that the best is ahead of us with him."
  - Tell: Stacked superlative. "The most/deepest/strongest thing a person can ..." recurs ("deepest" 9 times, "most important" 10). Superlatives with no concrete case are the vague-intensifier tell, and a skeptic hears overclaim.

- `family-catechism.json` › `Q64` › `commentary` (consider)
  - Quote: "This is the deepest thing your children can know about themselves, and it is worth a lifetime of saying."
  - Replace with: "It is worth a lifetime of saying."
  - Tell: Stacked superlative. "The most/deepest/strongest thing a person can ..." recurs ("deepest" 9 times, "most important" 10). Superlatives with no concrete case are the vague-intensifier tell, and a skeptic hears overclaim.

### I. Accuracy, care, consistency and mechanics

Individual defects: a misread passage, an overclaim, wording that does not match the printed passage, a typo, a self-contradiction between the Trinity activity and Q76, missing hyphens, a care gap, literary headings.

- `family-devotions-2.json` › `the-good-shepherd` › `reflection` (must)
  - Quote: "Most shepherds run when the wolf comes."
  - Replace with: "The hired hand runs when the wolf comes."
  - Tell: Inaccurate handling of the passage. John 10:12-13 says the hired hand runs, in contrast with the shepherd. "Most shepherds run" is not what Jesus said and undercuts his own image.

- `family-seasonal.json` › `holyWeek.day1` › `reflection` (should)
  - Quote: "By Friday the same crowd would turn on him."
  - Replace with: "By Friday a crowd would be shouting for his death."
  - Tell: Overclaim stated as history. The Gospels do not say the Palm Sunday crowd and the Friday crowd were the same people. A careful reader, or a skeptic, will catch it.

- `family-devotions.json` › `gratitude` › `reflection` (should)
  - Quote: "The verse says give thanks in all circumstances, not for all circumstances."
  - Replace with: "The verse says give thanks in every circumstance, not for every circumstance."
  - Tell: Quotes a different translation from the passage printed above it. The passage text on the card reads "in every circumstance"; the reflection quotes other wording as "the verse says".

- `family-devotions.json` › `screens-and-attention` › `reflection` (should)
  - Quote: "do you feel more true, more noble, more lovely, or just more tired and a little emptier."
  - Replace with: "do you feel more true, more honorable, more lovely, or just more tired and a little emptier?"
  - Tell: Word not in the printed passage; question without a question mark. The passage on the card says "honorable"; "noble" comes from another translation. The sentence is a question and ends on a period.

- `family-devotions.json` › `serving-others` › `reflection` (should)
  - Quote: "He says greatness is measured by how many people you help, not how many help you."
  - Replace with: "He says the one who wants to be great must be the one who serves."
  - Tell: Loose paraphrase put in Jesus' mouth. Jesus did not measure greatness by a head count. The replacement stays with Mark 10:43-45 and drops another "X, not Y".

- `family-catechism.json` › `Q49` › `answer` (must)
  - Quote: "we pray in Jesus name with honest hearts"
  - Replace with: "we pray in Jesus' name with honest hearts"
  - Tell: Typo. Missing possessive apostrophe in a catechism answer children memorise.

- `family-catechism.json` › `Q34` › `commentary` (should)
  - Quote: "This is the truth that split the church open in history and still sets hearts free today."
  - Replace with: "This truth still sets people free."
  - Tell: Vague claim presented as history. "Split the church open in history" gestures at an event without naming it. Name it or cut it; see the note to James.

- `family-devotions-2.json` › `the-trinity` › `activity` (should)
  - Quote: "Look at one apple together and notice it has skin, fruit, and seeds, all one apple, then talk about how no picture fully shows the Trinity but God is still one God in three persons."
  - Replace with: "Read Matthew 28:19 aloud and count together how many persons Jesus names and how many names he says, then talk about how no picture fully shows the Trinity but God is still one God in three persons."
  - Tell: The library contradicts itself. Catechism Q76 tells parents "every neat illustration eventually says something untrue"; this activity is the neat illustration (three parts of an apple). A reader who uses both will notice.

- `family-devotions-2.json` › `loving-your-enemies` › `reflection` (should)
  - Quote: "It does not mean you let them hurt you."
  - Replace with: "It does not mean you let them hurt you, and if someone is hurting you, tell a grown-up you trust."
  - Tell: Care gap in a hard place. A child who is being bullied or harmed hears "love your enemies, pray for them". The piece says it does not mean being hurt, with no next step. One plain line keeps the path to help visible.

- `family-devotions-2.json` › `jealousy-and-comparison` › `title` (consider)
  - Quote: "The Thief Of Glad"
  - Replace with: "Looking Sideways"
  - Tell: Literary heading built on an uncredited stock line. Plays on "comparison is the thief of joy". "Looking sideways" is the piece's own image.

- `family-devotions-2.json` › `worship` › `title` (consider)
  - Quote: "What You Are Made Of"
  - Replace with: "What Gets The Center"
  - Tell: Heading does not match the piece. The reflection is about what sits at the center of a life; nothing in it is about what you are made of.

- `family-devotions-2.json` › `the-miracles-of-jesus` › `title` (consider)
  - Quote: "A Glimpse Of The Mender"
  - Replace with: "What The Miracles Were For"
  - Tell: Literary heading. "The Mender" is a coined title for Jesus; headings should be plain.

- `family-devotions-2.json` › `self-control` › `reflection` (should)
  - Quote: "The proverb says a person without self control is like that."
  - Replace with: "The proverb says a person without self-control is like that."
  - Tell: Missing hyphen. Compound modifiers lost their hyphens in several pieces (self control, two way, white knuckle, empty handed, one time, world changing, God like, ninety nine), which reads as a scrub artefact.

- `family-devotions-2.json` › `friendship` › `reflection` (should)
  - Quote: "But friendship is a two way thing."
  - Replace with: "But friendship is a two-way thing."
  - Tell: Missing hyphen. See self-control.

- `family-devotions-2.json` › `the-fruit-of-the-spirit` › `reflection` (should)
  - Quote: "not when we white knuckle our way into being nice."
  - Replace with: "not when we white-knuckle our way into being nice."
  - Tell: Missing hyphen. See self-control.

- `family-seasonal.json` › `advent.day4` › `reflection` (consider)
  - Quote: "Every Christmas card with a manger in it is the answer to a promise made to a shepherd boy who became a king."
  - Replace with: "The manger on every Christmas card is the answer to a promise made to a shepherd boy who became a king."
  - Tell: Loose image. The card is not the answer; the manger is.

- `family-catechism.json` › `Q16` › `commentary` (consider)
  - Quote: "This is not a reason for despair but the first honest step toward needing a Savior."
  - Replace with: "That is hard to hear, and it is where needing a Savior starts."
  - Tell: Sentence reused across files. The toddler line and "the first honest step toward needing a rescuer / We cannot be helped until we admit what is wrong" appear almost word for word in the-fall (family-devotions-2.json).

### J. One mould for every devotion

Every one of the 72 devotions is two paragraphs of about 60 to 80 words: paragraph one opens on an everyday image, paragraph two pivots with 'The verse ...' or 'This is ...', and the last sentence is a slogan. Read one a night and by the second week a family hears the mould. Thanksgiving week breaks the mould (one developed paragraph that follows the passage) and is far better for it. This cannot be fixed sentence by sentence; when pieces are revised, let some run as one paragraph, let some end on a question or on the passage, and vary where the verse comes in.

### K. Stamps (phrases and sentences that recur across the library)

- 'the last word' as a closer: the-empty-tomb, suffering, the-second-coming, thanksgiving.day6, Q51
- 'from a (safe) distance' / 'from far away': love, the-incarnation, advent.day19, Q26, Q65 (7 uses)
- 'small/close/near enough to be held': advent.day18, advent.day24, the-incarnation, Q25
- 'learned to walk': the-incarnation, advent.day19, Q26
- 'floating on clouds': heaven (Big Idea and reflection), the-new-creation, Q52
- 'on purpose' 18 times; 'Notice ...' as an opener 7 times; 'The verse ...' opening paragraph two 13 times; 'It is easy to ...' opening 7 pieces
- Whole sentences reused: Q16 and the-fall (toddler / first honest step / cannot be helped until we admit); Q4, Q76 and the-trinity (God has always been love ... brought inside that love); Q18 and Q57 (rescued first, commanded second); the-second-coming and Q51 (history not spinning in circles ... the last word); fear-and-anxiety and advent.day7 (The promise is not that ... The promise is that ...)
- Activities reused: 'secretly does one helpful thing' in serving-others, love and kindness
- Paired devotions on the same subject with overlapping wording: forgiveness / when-someone-hurts-you; gratitude / thankfulness (same verse); why-we-pray / prayer; is-the-bible-true / the-bible; obedience / trusting-enough-to-obey

## 2. The ten worst passages

1. `family-devotions.json` › `fear-and-anxiety` › reflection (first paragraph)
   - As it stands: "Notice the psalm does not pretend fear away. The writer is scared and says so out loud. Then he does something small and brave. He hands the fear to God instead of carrying it alone in the dark. Trust is not the absence of fear. Trust is what you do with your hands while your heart is still pounding."
   - Replacement: "Notice the psalm doesn't pretend fear away. The writer is scared and says so out loud. Then he does something small and brave. He hands the fear to God instead of carrying it alone in the dark. You can trust God while your heart is still pounding."
   - Why: Three antitheses in one short card (Big Idea, this pair, and the promise pair in paragraph two) plus a quotable epigram about trust and hands.

2. `family-seasonal.json` › `holyWeek.day8` › reflection
   - As it stands: "He is alive. And because he lives, the worst thing is never the last thing."
   - Replacement: "He is alive. And because he lives, death will not keep anyone who belongs to him."
   - Why: Easter ends on an uncredited line usually attributed to Frederick Buechner.

3. `family-devotions-2.json` › `loving-your-enemies` › reflection
   - As it stands: "It does not mean you let them hurt you. It means you refuse to become bitter. It is the strongest, hardest, most God like thing a person can do."
   - Replacement: "It doesn't mean you let them hurt you, and if someone is hurting you, tell a grown-up you trust. It means you refuse to become bitter. It is hard, and it is what God is like."
   - Why: Forced superlative triplet, missing hyphen, and no path to help for a child who is being harmed.

4. `family-devotions-2.json` › `the-incarnation` › reflection (first paragraph)
   - As it stands: "Think about how amazing this is. The God who made the entire universe, who needs nothing, who was never born and never dies, chose to become a tiny baby. He had to be fed and held and taught to walk, just like you once were. The Maker of the stars learned to count them on his fingers."
   - Replacement: "The God who made the entire universe, who needs nothing, who was never born and never dies, chose to become a tiny baby. He had to be fed and held and taught to walk, just like you once were."
   - Why: Announced amazement at the front and an invented, embroidered image at the back.

5. `family-devotions-2.json` › `the-fruit-of-the-spirit` › reflection (second paragraph, last two sentences)
   - As it stands: "The question is less try harder and more stay connected. Healthy roots, good fruit."
   - Replacement: "So the question to ask is whether you're staying connected, more than whether you're trying hard enough."
   - Why: Slogan closer with no verb.

6. `family-devotions-2.json` › `the-prodigal-son` › reflection
   - As it stands: "That is the picture Jesus gives us of God. Not arms crossed. Arms open, running."
   - Replacement: "That is the picture Jesus gives us of God. His arms are not crossed. They are open, and He is running."
   - Why: Fragment-stack kicker on one of the strongest pieces in the library.

7. `family-devotions-2.json` › `courage` › reflection
   - As it stands: "You can be scared and brave at the same time. In fact, that is the only kind of brave there is."
   - Replacement: "You can be scared and brave at the same time."
   - Why: Epigram restating the title, the Big Idea and the previous sentence.

8. `family-devotions-2.json` › `the-good-shepherd` › bigIdea + reflection
   - As it stands: "Jesus is a shepherd who leads us and would die to keep us safe, and a shepherd does not drive his sheep from behind. [...] Most shepherds run when the wolf comes."
   - Replacement: "Jesus is a shepherd who leads us and would die to keep us safe. [...] The hired hand runs when the wolf comes."
   - Why: A patched tail clause in the line a child repeats, and a misreading of John 10:12.

9. `family-catechism.json` › `Q33` › commentary
   - As it stands: "Calling Jesus Lord is not a polite religious phrase. It is a surrender. It means he gets a say in our money, our anger, our screens, our marriages."
   - Replacement: "When we call Jesus Lord, we're giving him a say in our money, our anger, our screens, our marriages."
   - Why: Straw position, hard-period antithesis, one-word verdict.

10. `family-catechism.json` › `Q66` › commentary
   - As it stands: "Welcome the question. A faith that cannot be questioned cannot be trusted."
   - Replacement: "Welcome the question."
   - Why: Chiasmus epigram and a stock line, tacked on after the paragraph had already earned its point.

## 3. Most machine-sounding, and most his

**Most machine-sounding**

- family-devotions.json: fear-and-anxiety, why-we-pray, who-is-jesus, obedience, serving-others
- family-devotions-2.json: heaven, courage, rest-and-sabbath, the-cross, the-armor-of-god, goodness, the-new-creation, joy, kindness, the-beatitudes, loving-your-enemies
- family-seasonal.json: advent.day7, advent.day18, advent.day3, holyWeek.day5, holyWeek.day8 (closing lines only)
- family-catechism.json: Q3, Q33, Q40, Q58, Q62, Q66 commentary; and the repeated block Q53-Q64, which re-asks eight questions already answered in Q8-Q50

**Most his**

- family-seasonal.json: the whole Thanksgiving week, above all thanksgiving.day4 (The Year the Fig Tree Did Not Bud), day5, day6 (The Empty Chair) and day7. Concrete, unhurried, no slogans, the family inside the hard thing. This is the register the rest should be brought to.
- family-seasonal.json: advent.day1 (The Long Wait Begins), advent.day17 (Joseph Stays), holyWeek.day7 (Holy Saturday)
- family-devotions-2.json: humility (second paragraph: one long sentence, then 'the parents need it at least as much as the children do'), stewardship (second paragraph: 'Parents, this lands on us first'), the-fear-of-the-lord (second paragraph), the-miracles-of-jesus (second paragraph), mercy (opening), suffering (apart from 'So let us be honest')
- family-devotions.json: handling-anger ('most grown-ups are still working on it'), screens-and-attention ('Both kids and parents in this room know that feeling')
- family-catechism.json: Q9, Q10, Q55, Q68, Q71, Q75 commentary

## 4. Scores

- human_score 5: a careful reader would suspect a machine within three cards, from the missing contractions, the antithesis rate and the closers. Nothing is false or unkind, and the questions for older children are often good.
- voice_score 4: outside Thanksgiving week and a handful of parent-facing lines, any church could publish these unchanged.

## What was checked and found clean

- Forbidden Language list, literal search: only `blessed` (4, all in the-beatitudes, the Beatitudes' own word).
- Em-dashes: none outside quoted Scripture. Exclamation points: none outside quoted Scripture.
- Biography, title, years in ministry, book count, denomination: none stated.
- Politics: nothing partisan in either direction.
- Hedges ('perhaps', 'I think', 'in many ways'): none.

## For James

- These read as competent, warm, orthodox children's material, and almost none of it could only be yours. The Thanksgiving week is the exception and the model: it sounds like a father at a table. The surest way to lift the rest is for you to rewrite four or five of the devotions yourself, aloud, and let those set the ear for the others. No one else can supply the real remembered detail (a son's question at bedtime, what you actually say when one of the boys is afraid of the dark); I have not invented any and no fixer should.
- Contractions: your Substack brief says 'contractions light'; VOICE-JAMES-BELL.md says prefer contractions where they make prose sound spoken. For pieces read aloud to children I have followed VOICE-JAMES-BELL.md and recommended contracting most of them. Say so if you want the family pages kept formal.
- Your saved Substack profile and VOICE-JAMES-BELL.md disagree, and I have followed VOICE-JAMES-BELL.md: the profile asks for 2-4 sentence paragraphs, 'stacked landing lines', contrast lines and a line 'the reader screenshots', which is exactly the slogan-and-fragment habit that makes these devotions sound machine-made. I have not rewritten toward the profile.
- Scripture translation: CLAUDE.md says ESV by default; every passage here is the Berean Standard Bible (the family validator enforces it, presumably for licensing). Nothing on the cards names the translation. Either name it once on the page or confirm the choice. Two reflections quote wording that is not in the BSB text printed above them (gratitude: 'in all circumstances'; screens-and-attention: 'noble'); fixes are in the findings.
- Capital pronouns for God: family-devotions.json and the first forty or so of family-devotions-2.json write He/Him/His; from 'prayer' onward, and all of the seasonal file and the catechism, write he/him/his. It is a visible seam between two batches. Pick one. (The BSB text itself capitalises.)
- Catechism structure: Part 5 (Q53-Q64) asks again, with different answers, eight questions already answered earlier (Q8/Q64 why God made you, Q11/Q56 what God requires, Q21/Q58 keeping the law, Q45/Q63 how the Spirit changes us, Q47/Q61 baptism, Q48/Q62 the Supper, Q49-50/Q53-54 prayer). A family memorising it will be asked the same question twice with two answers. Decide which answer stands.
- Second-order doctrine in the catechism needs your eye. Baptism is called 'the sign God gives to mark his people' and a mark of 'God's covenant family' (Q47, Q61), which is covenantal language a Baptist reader may not expect; the Supper answers say 'we feed on him by faith' (Q48, Q62); Q9, Q39 and Q42 state sovereignty, perseverance and regeneration in their Reformed form. None of these says faithful churches differ. The Lord's Supper devotion does this well ('Christians have understood the Lord's Supper in different ways'); Q71 does it well for creation. Tell us where you land or we add one such line to each.
- Q34 says grace alone 'split the church open in history'. If you mean the Reformation, say so in your own words ('This is the truth the Reformation was fought over'); I have only offered the cut, not the naming.
- Q43: 'For anyone raised without a good father, this is the deepest healing there is.' I have softened the superlative. You are the one person who can say plainly what being told 'Abba' meant to a man raised without a father; one sentence from you here, if you want it there, would be worth more than any edit. It should not be written for you.
- The Trinity devotion's apple activity (skin, fruit, seeds) is the kind of illustration your own Q76 warns parents against. I have proposed replacing it with reading and counting the names in Matthew 28:19.
- Paths to help: the devotions on fear, anger, grief, suffering, church hurt and forgiveness carry a grown-ups link to /help. The seasonal file has no such field, so Thanksgiving day 6 (The Empty Chair), day 4 (which says 'there is no shame in asking for help' without saying where) and Advent day 7 have none; nor do catechism Q65, Q70 and Q75, which the commentary itself says are asked 'when a family is actually hurting'. That needs a small data and page change, not a wording change.
- 'Blessed' appears four times in the-beatitudes; all are the Beatitudes' own word, so I have left them. No other Forbidden Language word, no em-dash and no exclamation point occurs outside quoted Scripture. No biography, title, book count or one-directional politics appears anywhere in these four files.
- Titles are in Title Case With Every Word Capitalised in the two devotion files and in ordinary title case in the seasonal file. Devotion ids are frozen; if any test or index matches on titles, the three title changes I suggest need the family index rebuilt.

## Notes for whoever applies the fixes

- Every finding's quote was checked to occur exactly once in the named file, id and field. Replace only inside that field.
- Never edit passageText or scriptureText.
- After editing, rebuild the family index and run validate-family, validate-grow-voice and validate-no-emdash (not run by this audit, which was read-only).
- Pattern A (contractions) and pattern G (intensifiers) are passes to make by ear across the files, not only the listed examples.

Structured findings: `/home/user/voice-audit/library-family-devotions.json`
