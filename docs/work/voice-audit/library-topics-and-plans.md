# Voice audit: Topics pages and eight-week plans

Library: 3 Topics pages and 29 plans (`/home/user/Livewell-/client/public/topics/`, `/home/user/Livewell-/client/public/plans/`). Read-only audit; nothing in the repository was edited and no builds were run.

**human_score: 7.5 / 10. voice_score: 7 / 10.**

Close to his voice and mostly human; the tells are at library scale. Any single plan reads like a pastor at a table: plain words, contractions, Scripture inside the argument, safety first, contested questions left open. Read three plans in a row and the mold shows: the same confession clause, the same credential, the same 'deserves its full strength' announcement, and the same handful of images and kickers. 63 small edits, most of them deletions, remove it.

Every quote below was checked by script to occur exactly once in the named file and key. Quotes and replacements are shown as JSON strings, so `\"` is a straight double quote in the file. Replacements add no fact, name, number, quotation or reference. An empty replacement means delete the quoted sentence.

## Counts

- honest: 131
- I'm a pastor / those of us who preach / pastors like me: 32
- which bears David's name: 25
- It moves slowly on purpose: 13
- Under/Beneath X sits Y openers: 12
- full strength: 14
- deserve(s): 21
- that counts: 7
- keeps a schedule/calendar/hours: 5
- trellis: 5
- Work is older than the curse.: 3
- em-dashes: 0
- forbidden words outside Scripture: 0
- exclamation points outside Scripture: 0

## 1. Patterns that repeat

### A. Rulebook leakage (the prose announces its own fairness)

- **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `weeks[2].why`  
  **Quote:** "These are serious objections, and they deserve to be treated seriously. The conquest chapters"  
  **Replacement:** "The conquest chapters"  
  **Tell:** rulebook leakage (must)  
  **Why:** Announces the fair treatment instead of giving it; a self-echoing sentence (serious/seriously) a skeptic hears as a sales line. The next sentences already do the fair thing.

- **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `weeks[3].why`  
  **Quote:** "The objection deserves its full strength. We don't have"  
  **Replacement:** "We don't have"  
  **Tell:** rulebook leakage (must)  
  **Why:** States the editorial rule (steelman first) as prose. 'Full strength' appears six times in this one plan. The paragraph already gives the objection at strength and concedes 'Some of that is simply true'.

- **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `intro`  
  **Quote:** "puts the hardest objections on the table at full strength, asks"  
  **Replacement:** "puts the hardest objections on the table, asks"  
  **Tell:** stamped phrase (should)  
  **Why:** 'At full strength' twice in one intro and six times in the plan. Keep the one in the intro's last sentence, where it is the reader's commitment.

- **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `weeks[3].practice`  
  **Quote:** "Write a one-line verdict for each scene."  
  **Replacement:** "Write down, in one line, which you think it is."  
  **Tell:** rulebook vocabulary (consider)  
  **Why:** 'Verdict' is house vocabulary from the style guide, not a word a neighbor uses for a note in the margin.

- **File:** `/home/user/Livewell-/client/public/plans/doubt.json`  
  **Key:** `weeks[4].why`  
  **Quote:** "That objection deserves to be felt at full strength, and Scripture lets a worship leader voice it."  
  **Replacement:** "Scripture lets a worship leader say it out loud."  
  **Tell:** rulebook leakage (must)  
  **Why:** Certifies the objection before showing it. Asaph's psalm does the work; the announcement is the machine's.

- **File:** `/home/user/Livewell-/client/public/plans/suffering.json`  
  **Key:** `weeks[0].why`  
  **Quote:** "If you come to it as an argument, it is a serious one, and it deserves a hearing at full strength."  
  **Replacement:** "If you come to it as an argument, it is a serious one."  
  **Tell:** rulebook leakage (should)  
  **Why:** Same stamped clause as the skeptic and doubt plans ('deserves ... full strength').

- **File:** `/home/user/Livewell-/client/public/plans/suffering.json`  
  **Key:** `weeks[5].why`  
  **Quote:** "and that objection deserves to be felt."  
  **Replacement:** "and it can sound that way."  
  **Tell:** rulebook leakage (should)  
  **Why:** Third 'that objection deserves to be felt' across the library. A person at the table concedes; he does not rule on what an objection deserves.

- **File:** `/home/user/Livewell-/client/public/plans/purpose.json`  
  **Key:** `weeks[0].why`  
  **Quote:** "The question deserves an honest hearing, and Scripture gives it one."  
  **Replacement:** "Scripture gives the question a hearing."  
  **Tell:** rulebook leakage / self-certifying honest (should)  
  **Why:** 'Deserves an honest hearing' is the rule written into the prose, in a week already titled 'The honest question'.

- **File:** `/home/user/Livewell-/client/public/plans/infertility.json`  
  **Key:** `weeks[4].why`  
  **Quote:** "so I stand inside that picture and that indictment."  
  **Replacement:** "so I fit that picture, and I've helped hold it up."  
  **Tell:** rulebook vocabulary (must)  
  **Why:** 'Indictment' and 'stand inside' are the style guide's own words for self-implication. BRIEF bans any use of 'indictment'.

- **File:** `/home/user/Livewell-/client/public/plans/deconstruction.json`  
  **Key:** `weeks[5].why`  
  **Quote:** "A verdict reached against a straw man is not a verdict."  
  **Replacement:** "If you've only rejected a weak version, you haven't decided about the real one yet."  
  **Tell:** rulebook vocabulary / aphoristic closer (should)  
  **Why:** 'Verdict' and 'straw man' are the editor's terms, and the sentence is an epigram that restates the paragraph.

### B. The self-implication stamp ('I'm a pastor, so I'm inside that failure')

- **File:** `/home/user/Livewell-/client/public/plans/addiction.json`  
  **Key:** `weeks[3].why`  
  **Quote:** "The church has too often tightened the loop by treating the person who drinks or uses as the worst sinner in the building, and I'm a pastor, so I'm inside that failure."  
  **Replacement:** "We in the church have too often tightened the loop by treating the person who drinks or uses as the worst sinner in the building."  
  **Tell:** announced self-implication (must)  
  **Why:** Verbatim the same clause as anger week 7. BRIEF: he implicates himself by doing it ('we'), not by announcing it.

- **File:** `/home/user/Livewell-/client/public/plans/anger.json`  
  **Key:** `weeks[6].why`  
  **Quote:** "and the church has too often told wronged people that their anger was the sin; I'm a pastor, so I'm inside that failure."  
  **Replacement:** "and we in the church have too often told wronged people that their anger was the sin."  
  **Tell:** announced self-implication (must)  
  **Why:** Word-for-word repeat of addiction week 4. Two plans sharing one confession sentence is a template, not a confession.

- **File:** `/home/user/Livewell-/client/public/plans/empty.json`  
  **Key:** `weeks[3].why`  
  **Quote:** "The church has too often sung the victories and skipped these prayers, and as a pastor I'm inside that failure."  
  **Replacement:** "We in the church have too often sung the victories and skipped these prayers."  
  **Tell:** announced self-implication (must)  
  **Why:** Third use of 'inside that failure'.

- **File:** `/home/user/Livewell-/client/public/plans/caregiving.json`  
  **Key:** `weeks[1].why`  
  **Quote:** "and the church has often preached honor as if it meant doing everything yourself. I'm a pastor, so this includes me. And a specific request"  
  **Replacement:** "and we in the church have often preached honor as if it meant doing everything yourself. A specific request"  
  **Tell:** announced self-implication (should)  
  **Why:** 'I'm a pastor, so this includes me' recurs in marriage week 2. 'We' does the same work without the announcement.

- **File:** `/home/user/Livewell-/client/public/plans/marriage.json`  
  **Key:** `weeks[1].why`  
  **Quote:** "I'm a pastor, so this includes me: we let the Christian family"  
  **Replacement:** "We let the Christian family"  
  **Tell:** announced self-implication (should)  
  **Why:** Same clause as caregiving week 2; the 'we' that follows already includes him.

- **File:** `/home/user/Livewell-/client/public/plans/job-loss.json`  
  **Key:** `weeks[5].why`  
  **Quote:** "by honoring titles and success. I'm a pastor, and that charge includes me."  
  **Replacement:** "by honoring titles and success."  
  **Tell:** announced self-implication (should)  
  **Why:** The sentence before already says 'we in the church'. The tag is the formula, and it makes the week end on the writer instead of the reader.

- **File:** `/home/user/Livewell-/client/public/plans/work-burnout.json`  
  **Key:** `weeks[6].why`  
  **Quote:** "I'm a pastor, so I write this from inside it. When the seventy-two"  
  **Replacement:** "When the seventy-two"  
  **Tell:** announced self-implication (should)  
  **Why:** 'Those of us who work for churches' in the sentence before has already put him inside.

- **File:** `/home/user/Livewell-/client/public/plans/pornography.json`  
  **Key:** `weeks[5].why`  
  **Quote:** "For a generation, many churches taught purity mostly as rules and warnings, as if the body itself were the problem, and as a pastor I don't stand outside that failure."  
  **Replacement:** "For a generation, many of us in the church taught purity mostly as rules and warnings, as if the body itself were the problem."  
  **Tell:** announced self-implication (should)  
  **Why:** Fourth variant of the 'inside/outside that failure' formula.

### C. Biography used as a credential in the intros

- **File:** `/home/user/Livewell-/client/public/plans/doubt.json`  
  **Key:** `intro`  
  **Quote:** "They're written by a pastor who came to faith from atheism and won't pretend your questions are small."  
  **Replacement:** "They won't treat your questions as small."  
  **Tell:** biography as credential (must)  
  **Why:** Third-person byline about himself inside a first-person plan, used to vouch for the plan. Also removes a 'pretend' that repeats two sentences later.

- **File:** `/home/user/Livewell-/client/public/plans/suffering.json`  
  **Key:** `intro`  
  **Quote:** "It comes from a pastor who was an atheist first, and it will not treat that argument as a small one."  
  **Replacement:** "It will not treat that argument as a small one."  
  **Tell:** biography as credential (must)  
  **Why:** Same credential move as doubt and skeptic intros; three plans open by citing the atheist past as a warrant.

- **File:** `/home/user/Livewell-/client/public/plans/purpose.json`  
  **Key:** `weeks[1].why`  
  **Quote:** "I came to faith from atheism, and I won't call that answer shallow; there is courage in it"  
  **Replacement:** "I won't call that answer shallow; there is courage in it"  
  **Tell:** biography as credential (should)  
  **Why:** The fact is offered to license the concession. The concession stands without it. Keep the atheism line where the reader is the unbeliever (skeptic intro, prayer intro).

- **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `intro`  
  **Quote:** "This is an eight week reading plan for the nonbeliever who is curious, written by a pastor who came to faith from atheism."  
  **Replacement:** "This is an eight week reading plan for the nonbeliever who is curious. I'm a pastor, and I came to faith from atheism."  
  **Tell:** third-person byline (consider)  
  **Why:** The one place the fact belongs, but said about himself in the third person like jacket copy. First person and plain is his.

### D. Series template sentences repeated verbatim across plans

- **File:** `/home/user/Livewell-/client/public/plans/divorce.json`  
  **Key:** `intro`  
  **Quote:** "It moves slowly on purpose. It starts with safety"  
  **Replacement:** "It starts with safety"  
  **Tell:** template sentence (should)  
  **Why:** 'It moves slowly on purpose' is in 13 of 29 intros. Here it is a bare stand-alone sentence and the next sentence carries the plan's order without it.

- **File:** `/home/user/Livewell-/client/public/plans/empty.json`  
  **Key:** `intro`  
  **Quote:** "It moves slowly on purpose. It begins where God began"  
  **Replacement:** "It begins where God began"  
  **Tell:** template sentence (should)  
  **Why:** 'It moves slowly on purpose' is in 13 of 29 intros. Here it is a bare stand-alone sentence and the next sentence carries the plan's order without it.

- **File:** `/home/user/Livewell-/client/public/plans/job-loss.json`  
  **Key:** `intro`  
  **Quote:** "It moves slowly on purpose. It starts with the first practical steps"  
  **Replacement:** "It starts with the first practical steps"  
  **Tell:** template sentence (should)  
  **Why:** 'It moves slowly on purpose' is in 13 of 29 intros. Here it is a bare stand-alone sentence and the next sentence carries the plan's order without it.

### E. Epigram closers and symmetrical sentence pairs

- **File:** `/home/user/Livewell-/client/public/plans/purpose.json`  
  **Key:** `weeks[2].why`  
  **Quote:** "An identity you build has to be defended every morning. An identity you receive can be rested in, and lived from."  
  **Replacement:** "If you build your identity, you have to defend it every morning. If it was given to you, you can rest in it and get on with living."  
  **Tell:** symmetrical pair closer (should)  
  **Why:** Perfect parallel pair ending a paragraph; work-burnout week 7 reuses the same line ('an identity has to be defended every day').

- **File:** `/home/user/Livewell-/client/public/plans/purpose.json`  
  **Key:** `weeks[6].why`  
  **Quote:** "The small thing done faithfully is not a delay on the way to your purpose. Very often it is the purpose."  
  **Replacement:** "Very often the small thing done faithfully is the purpose."  
  **Tell:** It is not X. It is Y. closer (should)  
  **Why:** Antithesis as a paragraph kicker, in a week that has already made the point through Zechariah and Ecclesiastes.

- **File:** `/home/user/Livewell-/client/public/plans/fear-of-the-future.json`  
  **Key:** `weeks[7].why`  
  **Quote:** "Fear stops building while it waits to be rescued. Faith puts seed into uncertain ground and trusts God with a harvest it may never see."  
  **Replacement:** "When we're afraid we stop building and wait to be rescued. The exiles were asked to put seed into uncertain ground and trust God with a harvest they might never see."  
  **Tell:** symmetrical pair closer (Fear... Faith...) (should)  
  **Why:** Personified Fear/Faith in matched sentences reads like a sermon slide. Putting the people back in keeps it Jeremiah's letter.

- **File:** `/home/user/Livewell-/client/public/plans/pornography.json`  
  **Key:** `weeks[6].why`  
  **Quote:** "You fight from forgiveness, not for it."  
  **Replacement:** "You're already forgiven when you get back up, and you fight from there."  
  **Tell:** stock slogan / chiasmus (must)  
  **Why:** A circulating evangelical slogan in from/for form; BRIEF lists chiasmus closers and uncredited stock lines.

- **File:** `/home/user/Livewell-/client/public/plans/money.json`  
  **Key:** `weeks[7].why`  
  **Quote:** "None of you has to finish them owned by it."  
  **Replacement:** "You don't have to finish them ruled by it."  
  **Tell:** wordplay closer (owing/owned) (consider)  
  **Why:** A pun closes the plan. 'Ruled' matches the week's own title and the Matthew 6:24 text.

- **File:** `/home/user/Livewell-/client/public/plans/divorce.json`  
  **Key:** `weeks[1].why`  
  **Quote:** "Losses that are never named don't fade. They wait."  
  **Replacement:** "Losses that are never named don't fade, so this week you name them."  
  **Tell:** two-beat fragment closer (should)  
  **Why:** A two-word ominous kicker. Tying it to the week's practice keeps it pastoral.

- **File:** `/home/user/Livewell-/client/public/plans/job-loss.json`  
  **Key:** `weeks[7].why`  
  **Quote:** "A job can feed a family and give you a place to serve. It was never your name."  
  **Replacement:** "A job can feed a family and give you a place to serve. It can't tell you who you are."  
  **Tell:** reused kicker (should)  
  **Why:** Divorce week 8 ends 'It does not get to be your name', where Naomi and Mara earn it. Here there is no name in the passage, so it is the stamp.

- **File:** `/home/user/Livewell-/client/public/plans/work-burnout.json`  
  **Key:** `weeks[2].why`  
  **Quote:** " A day that never ends is a day you can never rest from."  
  **Replacement:** (delete the quoted sentence, including its leading space)  
  **Tell:** aphoristic closer restating the paragraph (should)  
  **Why:** The paragraph has landed on 'nothing will arrive that can't be answered in the morning'. This adds a slogan.

- **File:** `/home/user/Livewell-/client/public/plans/prayer.json`  
  **Key:** `weeks[5].why`  
  **Quote:** " A name said to God each morning is a small, stubborn act of love."  
  **Replacement:** (delete the quoted sentence, including its leading space)  
  **Tell:** pillow line (should)  
  **Why:** Embroiderable closer ('small, stubborn act of love'). The paragraph ends better on 'their work, their fears, their sick parent'.

- **File:** `/home/user/Livewell-/client/public/plans/suffering.json`  
  **Key:** `weeks[7].why`  
  **Quote:** " A hope that admits the tears can be trusted with them."  
  **Replacement:** (delete the quoted sentence, including its leading space)  
  **Tell:** aphoristic closer after Scripture (should)  
  **Why:** Epigram laid over Revelation 21:4. BRIEF: Scripture is not followed by a clever kicker. 'A hope that/like that...' also closes empty week 7 and infertility week 8.

- **File:** `/home/user/Livewell-/client/public/plans/deconstruction.json`  
  **Key:** `weeks[1].why`  
  **Quote:** "either way he was sanded smooth where he is sharp and sharpened where he is gentle"  
  **Replacement:** "either way the hard things he said were softened and the gentle ones were turned into weapons"  
  **Tell:** chiasmus (consider)  
  **Why:** Mirror-image phrasing (smooth/sharp, sharpened/gentle) is ornament; BRIEF lists chiasmus.

- **File:** `/home/user/Livewell-/client/public/plans/deconstruction.json`  
  **Key:** `weeks[5].why`  
  **Quote:** "A faith examined only by its defenders has not been examined, and a faith examined only by its critics has not been examined either."  
  **Replacement:** "A faith you've only heard defended hasn't been examined, and neither has one you've only heard attacked."  
  **Tell:** perfect parallelism (consider)  
  **Why:** Two clauses identical but for one noun. The contraction and the 'neither' make it speech.

- **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `intro`  
  **Quote:** "Nothing here is a trick. There is no trap in week eight, no emotional ambush, no moment where the music swells."  
  **Replacement:** "Nothing here is a trick, and nothing is waiting for you in week eight."  
  **Tell:** fragment stack / tidy triplet (must)  
  **Why:** 'No X, no Y, no Z' with a literary third beat. The skeptic is the reader most alert to performance.

- **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `weeks[0].why`  
  **Quote:** "owing it nothing and noticing everything"  
  **Replacement:** "closely and without owing it anything"  
  **Tell:** balanced nothing/everything flourish (should)  
  **Why:** Jingle antithesis in the plan's first paragraph.

- **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `weeks[1].why`  
  **Quote:** "and it makes the objections that remain sharper, not softer."  
  **Replacement:** "and the objections that remain come out sharper."  
  **Tell:** X, not Y tag (consider)  
  **Why:** Alliterative 'sharper, not softer' tag.

- **File:** `/home/user/Livewell-/client/public/topics/faith-politics-and-the-flag.json`  
  **Key:** `use.tools[0].line`  
  **Quote:** "A mirror, not a weapon."  
  **Replacement:** "Use it on yourself first."  
  **Tell:** X, not Y fragment (should)  
  **Why:** Tagline antithesis on a tool card.

- **File:** `/home/user/Livewell-/client/public/topics/raising-children-in-a-secular-age.json`  
  **Key:** `witness.line`  
  **Quote:** "Formation came before belonging."  
  **Replacement:** "They were taught first and received as members after."  
  **Tell:** aphoristic closer restating the paragraph (should)  
  **Why:** Three-word slogan restating the sentence before it, with two abstract nouns.

- **File:** `/home/user/Livewell-/client/public/topics/faith-politics-and-the-flag.json`  
  **Key:** `essayStandIn.line`  
  **Quote:** "The most dangerous heresies are not the ones that contradict the faith openly. They are the ones that rearrange it subtly."  
  **Replacement:** "The heresies that do the most damage rearrange the faith quietly instead of contradicting it openly."  
  **Tell:** It is not X. It is Y. standfirst (consider)  
  **Why:** Balanced-antithesis standfirst, the exact template BRIEF bans. If this is the Substack essay's own opening line, James should decide.

### F. One image or sentence stamped across several plans

- **File:** `/home/user/Livewell-/client/public/plans/grief.json`  
  **Key:** `weeks[1].why`  
  **Quote:** " Lament is faith that refuses to leave the room."  
  **Replacement:** (delete the quoted sentence, including its leading space)  
  **Tell:** motif stamp / aphoristic closer (should)  
  **Why:** Lament is defined as 'faith that refuses...' in six plans (anxiety, church-hurt, grief, prayer, empty, suffering). Here the sentence before already says 'even that prayer is an act of faith'.

- **File:** `/home/user/Livewell-/client/public/plans/anxiety.json`  
  **Key:** `weeks[2].why`  
  **Quote:** "Lament is how people who refuse to lie to God keep talking to him, and it doesn't wait for you to feel anything before it counts as prayer."  
  **Replacement:** "Lament doesn't wait for you to feel anything before it counts as prayer."  
  **Tell:** motif stamp (should)  
  **Why:** 'Refuse to lie to God' is also in church-hurt week 2 and prayer week 5. Keep it in prayer week 5, its home.

- **File:** `/home/user/Livewell-/client/public/plans/suffering.json`  
  **Key:** `weeks[3].focus`  
  **Quote:** "Lament, the faith that stays in the room"  
  **Replacement:** "Lament, the prayer that complains to God"  
  **Tell:** literary heading / motif stamp (consider)  
  **Why:** Heading built on the 'stays in the room' image grief already uses. Headings are plain and descriptive.

- **File:** `/home/user/Livewell-/client/public/plans/loneliness.json`  
  **Key:** `weeks[1].why`  
  **Quote:** "Loneliness keeps a schedule."  
  **Replacement:** "Loneliness is worse at certain hours."  
  **Tell:** motif stamp (should)  
  **Why:** 'Keeps a schedule / its own calendar / its own hours' opens weeks in five plans (addiction, pornography, loneliness, divorce, money).

- **File:** `/home/user/Livewell-/client/public/plans/money.json`  
  **Key:** `weeks[0].why`  
  **Quote:** "Money trouble keeps its own hours, mostly the middle of the night, when you run"  
  **Replacement:** "Money trouble comes mostly in the middle of the night, when you run"  
  **Tell:** motif stamp (should)  
  **Why:** Same personification as above.

- **File:** `/home/user/Livewell-/client/public/plans/divorce.json`  
  **Key:** `weeks[5].why`  
  **Quote:** "Loneliness after a divorce keeps its own calendar: the nights"  
  **Replacement:** "Loneliness after a divorce is worst on certain days: the nights"  
  **Tell:** motif stamp (should)  
  **Why:** Same personification as above.

- **File:** `/home/user/Livewell-/client/public/plans/fatherless.json`  
  **Key:** `weeks[2].why`  
  **Quote:** "Beneath the fear sits a word."  
  **Replacement:** "The fear is tied to a word."  
  **Tell:** formula opener (should)  
  **Why:** 'Under/Beneath X sits/lies Y' opens a week twelve times across the library, and weeks 2 and 3 of this plan open with it back to back.

- **File:** `/home/user/Livewell-/client/public/plans/job-loss.json`  
  **Key:** `weeks[1].why`  
  **Quote:** "Beneath the money sits a question that comes at night: am I still worth anything?"  
  **Replacement:** "After the money worry comes another question, usually at night: am I still worth anything?"  
  **Tell:** formula opener (should)  
  **Why:** Same 'Beneath X sits Y' frame.

- **File:** `/home/user/Livewell-/client/public/plans/work-burnout.json`  
  **Key:** `weeks[3].why`  
  **Quote:** "Beneath much of this exhaustion sits a question older than any job: what is a person worth, and who decides?"  
  **Replacement:** "Much of this exhaustion comes from a question older than any job: what is a person worth, and who decides?"  
  **Tell:** formula opener (should)  
  **Why:** Same frame, and nearly the same sentence as job-loss week 2.

- **File:** `/home/user/Livewell-/client/public/plans/infertility.json`  
  **Key:** `weeks[4].why`  
  **Quote:** "Under the grief lies a second weight, shame and the fear that God is keeping score."  
  **Replacement:** "With the grief often comes shame, and the fear that God is keeping score."  
  **Tell:** formula opener (consider)  
  **Why:** Same frame; 'a second weight / a second fear' also opens anxiety week 1 and grief week 1.

- **File:** `/home/user/Livewell-/client/public/plans/job-loss.json`  
  **Key:** `weeks[7].why`  
  **Quote:** "Work is older than the curse. Before anything had gone wrong, God placed"  
  **Replacement:** "Before anything had gone wrong, God placed"  
  **Tell:** repeated sentence (should)  
  **Why:** 'Work is older than the curse.' appears verbatim in purpose, job-loss and work-burnout. Keep it in purpose; the next clause here says the same thing.

- **File:** `/home/user/Livewell-/client/public/plans/work-burnout.json`  
  **Key:** `weeks[6].why`  
  **Quote:** "Work is older than the curse. God set the man in Eden"  
  **Replacement:** "God set the man in Eden"  
  **Tell:** repeated sentence (should)  
  **Why:** Third verbatim use; 'before anything had gone wrong' is already in the sentence.

- **File:** `/home/user/Livewell-/client/public/plans/empty.json`  
  **Key:** `weeks[7].why`  
  **Quote:** "Eight weeks of practices mean little if they end at week eight. A rule of life is an old name in the church for a few chosen practices that hold a life steady over years, the way a trellis holds up a vine."  
  **Replacement:** "These weeks were meant to leave you with a few practices you keep. A rule of life is an old name in the church for a few chosen practices that hold a life steady over years."  
  **Tell:** repeated sentence and image (should)  
  **Why:** The opening sentence is verbatim anxiety week 8, and the trellis is in four plans (anxiety, empty, new-believer, whole-life).

- **File:** `/home/user/Livewell-/client/public/plans/anger.json`  
  **Key:** `weeks[2].why`  
  **Quote:** "Psalm 4, which bears David's name, gives the hour for asking:"  
  **Replacement:** "Psalm 4 gives the hour for asking:"  
  **Tell:** verbal tic (consider)  
  **Why:** 'Which bears David's name' appears 25 times across the plans (three times in pornography). It is accurate and careful; said every time, it is a formula. Dropping it changes no fact.

### G. 'Honest' as a self-certifying adjective (131 uses in 29 plans)

- **File:** `/home/user/Livewell-/client/public/plans/caregiving.json`  
  **Key:** `subtitle`  
  **Quote:** "Honest about the guilt and the grief, practical about help and rest, and clear that no one can carry this alone."  
  **Replacement:** "It takes up the guilt and the grief, how to ask for help and get rest, and why no one can carry this alone."  
  **Tell:** adjective-triplet standfirst (should)  
  **Why:** 'Honest about..., practical about..., clear that...' is a three-adjective blurb template; forgiveness and marriage use the same one. Rebuild plans-index.json after (scripts/build-plans-index.mjs).

- **File:** `/home/user/Livewell-/client/public/plans/forgiveness.json`  
  **Key:** `subtitle`  
  **Quote:** "Honest about the wound, clear that safety comes first, and never in a hurry."  
  **Replacement:** "It starts with safety and the real size of the wound, and it doesn't hurry."  
  **Tell:** adjective-triplet standfirst (should)  
  **Why:** Same template as caregiving. Rebuild plans-index.json after.

- **File:** `/home/user/Livewell-/client/public/plans/marriage.json`  
  **Key:** `subtitle`  
  **Quote:** "Safety first, honest about what we ask marriage to carry, and slow to rebuild trust."  
  **Replacement:** "Safety comes first, then what we ask marriage to carry and the slow rebuilding of trust."  
  **Tell:** adjective-triplet standfirst (should)  
  **Why:** Same template. Rebuild plans-index.json after.

- **File:** `/home/user/Livewell-/client/public/plans/deconstruction.json`  
  **Key:** `weeks[2].why`  
  **Quote:** "and give more than one honest answer."  
  **Replacement:** "and give more than one answer."  
  **Tell:** self-certifying honest (should)  
  **Why:** Deconstruction uses 'honest' nine times; this sentence already has 'plainly' and the previous one has 'more honestly'. The skeptic plan says the same thing without the adjective.

- **File:** `/home/user/Livewell-/client/public/plans/deconstruction.json`  
  **Key:** `weeks[2].read.label`  
  **Quote:** "gets several honest answers"  
  **Replacement:** "gets several answers"  
  **Tell:** self-certifying honest (should)  
  **Why:** The site grading its own notes as honest. Same label is in skeptic weeks[2].read.label; change both.

- **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `weeks[2].read.label`  
  **Quote:** "gets several honest answers"  
  **Replacement:** "gets several answers"  
  **Tell:** self-certifying honest (should)  
  **Why:** Twin of the deconstruction label.

## 2. The ten worst passages

1. **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `weeks[2].why`  
  **Quote:** "These are serious objections, and they deserve to be treated seriously. The conquest chapters"  
  **Replacement:** "The conquest chapters"  
  **Tell:** rulebook leakage (must)  
  **Why:** Announces the fair treatment instead of giving it; a self-echoing sentence (serious/seriously) a skeptic hears as a sales line. The next sentences already do the fair thing.

2. **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `weeks[3].why`  
  **Quote:** "The objection deserves its full strength. We don't have"  
  **Replacement:** "We don't have"  
  **Tell:** rulebook leakage (must)  
  **Why:** States the editorial rule (steelman first) as prose. 'Full strength' appears six times in this one plan. The paragraph already gives the objection at strength and concedes 'Some of that is simply true'.

3. **File:** `/home/user/Livewell-/client/public/plans/skeptic.json`  
  **Key:** `intro`  
  **Quote:** "Nothing here is a trick. There is no trap in week eight, no emotional ambush, no moment where the music swells."  
  **Replacement:** "Nothing here is a trick, and nothing is waiting for you in week eight."  
  **Tell:** fragment stack / tidy triplet (must)  
  **Why:** 'No X, no Y, no Z' with a literary third beat. The skeptic is the reader most alert to performance.

4. **File:** `/home/user/Livewell-/client/public/plans/infertility.json`  
  **Key:** `weeks[4].why`  
  **Quote:** "so I stand inside that picture and that indictment."  
  **Replacement:** "so I fit that picture, and I've helped hold it up."  
  **Tell:** rulebook vocabulary (must)  
  **Why:** 'Indictment' and 'stand inside' are the style guide's own words for self-implication. BRIEF bans any use of 'indictment'.

5. **File:** `/home/user/Livewell-/client/public/plans/addiction.json`  
  **Key:** `weeks[3].why`  
  **Quote:** "The church has too often tightened the loop by treating the person who drinks or uses as the worst sinner in the building, and I'm a pastor, so I'm inside that failure."  
  **Replacement:** "We in the church have too often tightened the loop by treating the person who drinks or uses as the worst sinner in the building."  
  **Tell:** announced self-implication (must)  
  **Why:** Verbatim the same clause as anger week 7. BRIEF: he implicates himself by doing it ('we'), not by announcing it.

6. **File:** `/home/user/Livewell-/client/public/plans/anger.json`  
  **Key:** `weeks[6].why`  
  **Quote:** "and the church has too often told wronged people that their anger was the sin; I'm a pastor, so I'm inside that failure."  
  **Replacement:** "and we in the church have too often told wronged people that their anger was the sin."  
  **Tell:** announced self-implication (must)  
  **Why:** Word-for-word repeat of addiction week 4. Two plans sharing one confession sentence is a template, not a confession.

7. **File:** `/home/user/Livewell-/client/public/plans/doubt.json`  
  **Key:** `intro`  
  **Quote:** "They're written by a pastor who came to faith from atheism and won't pretend your questions are small."  
  **Replacement:** "They won't treat your questions as small."  
  **Tell:** biography as credential (must)  
  **Why:** Third-person byline about himself inside a first-person plan, used to vouch for the plan. Also removes a 'pretend' that repeats two sentences later.

8. **File:** `/home/user/Livewell-/client/public/plans/suffering.json`  
  **Key:** `intro`  
  **Quote:** "It comes from a pastor who was an atheist first, and it will not treat that argument as a small one."  
  **Replacement:** "It will not treat that argument as a small one."  
  **Tell:** biography as credential (must)  
  **Why:** Same credential move as doubt and skeptic intros; three plans open by citing the atheist past as a warrant.

9. **File:** `/home/user/Livewell-/client/public/plans/pornography.json`  
  **Key:** `weeks[6].why`  
  **Quote:** "You fight from forgiveness, not for it."  
  **Replacement:** "You're already forgiven when you get back up, and you fight from there."  
  **Tell:** stock slogan / chiasmus (must)  
  **Why:** A circulating evangelical slogan in from/for form; BRIEF lists chiasmus closers and uncredited stock lines.

10. **File:** `/home/user/Livewell-/client/public/plans/purpose.json`  
  **Key:** `weeks[2].why`  
  **Quote:** "An identity you build has to be defended every morning. An identity you receive can be rested in, and lived from."  
  **Replacement:** "If you build your identity, you have to defend it every morning. If it was given to you, you can rest in it and get on with living."  
  **Tell:** symmetrical pair closer (should)  
  **Why:** Perfect parallel pair ending a paragraph; work-burnout week 7 reuses the same line ('an identity has to be defended every day').

## 3. Most machine-sounding, and most his

Most machine-sounding:
- plans/skeptic.json (strong argument, but 'full strength' six times, 'deserve' five times, the no-trap triplet, third-person credential)
- plans/deconstruction.json (most epigrams per week; 'honest' nine times)
- plans/purpose.json (parallel-pair closers in weeks 3 and 7; credential in week 2)
- plans/doubt.json (credential intro; 'full strength' three times)
- plans/fear-of-the-future.json (Fear/Faith and Planning/Worry matched pairs)
- topics/faith-politics-and-the-flag.json (two antithesis taglines; otherwise sound)

Most his:
- plans/fatherless.json
- plans/church-hurt.json
- plans/caregiving.json
- plans/anxiety.json
- plans/decisions.json
- plans/grief.json
- plans/prayer.json
- topics/living-after-christendom.json

## 4. Scores

- human_score: 7.5
- voice_score: 7

After the 63 edits I would expect about 9 and 8.5. The remaining gap in voice is a real memory or detail only James can supply.

## Strengths to keep

- Plain, spoken English with natural contractions; no essay voice.
- Scripture is read in its setting and does the diagnosing (Psalm 105 and 'God's anointed', Isaiah 41 and the nailed-down idols, Psalm 91 and the temptation, Jeremiah 29 and Hananiah).
- Concrete particulars instead of abstractions: the bottle behind the paint cans, the pew you sat in together, smiling through the lobby and coming apart in the car.
- Contested questions are stated from both sides and left open; first-order claims are confessed plainly.
- Every crisis passage keeps a path to help, and safety comes before the spiritual counsel.
- Skeptic weeks 4, 5 and 8 concede what is true in Hume, Freud and the manuscript objection before answering.
- Zero em-dashes, zero forbidden words, zero stray exclamation points, no connective filler.

## For James

- Overall: this library is close. Each plan read alone sounds like a pastor talking; the machine sound only shows when two or three plans are read in a row and the same sentences come back. Most fixes are deletions.
- Self-implication: 32 lines across the 29 plans say some form of 'I'm a pastor, so I'm inside that failure'. I propose keeping it only where the pastor's office is the subject (church-hurt week 4, doubt week 6, skeptic week 6, deconstruction week 4) and using a plain 'we in the church' elsewhere. Your call on which to keep.
- Biography: 'came to faith from atheism' vouches for the plan in five places (doubt, skeptic and suffering intros, prayer intro, purpose week 2). I propose keeping it in skeptic and prayer, where the reader is the unbeliever, and cutting the other three. 'Raised without a father' (fatherless intro, decisions week 5) and 'father of five sons' (infertility week 5) read as honest and stay.
- Only you can fix this one: the plans have no remembered moment of yours anywhere. Fatherless week 1 ('walking the floor with a newborn at two in the morning') is written as 'you'. If any week should carry one real sentence from your own life, it is that plan; I did not invent one.
- Scripture translation: CLAUDE.md says ESV by default, but the plans quote the Berean Standard Bible, and scripts/validate-plans.mjs enforces BSB (purpose week 1 names it). Either is fine; the two documents disagree, so one should be updated.
- Pronouns for God: the three Topics pages capitalize He/His in your own prose; the plans use lowercase he/his in prose and capitals only inside BSB quotations. Pick one for the site.
- 'Eight week' and 'eight-week' are both used (about 70 places, mixed even between a plan's subtitle and intro). Pick one.
- 'Which bears David's name' appears 25 times. It is careful and accurate. If you are content to say 'a psalm of David' (the heading's own words) or to drop the attribution where it does no work, most of those can go; I changed only one as a sample because this is your scholarly call.
- Topic page 'faith-politics-and-the-flag', essayStandIn.line ('The most dangerous heresies are not the ones... They are the ones...'): this is the balanced-antithesis standfirst your brief bans, but it may be your own Substack opening. Left as 'consider'.
- The sentence 'Each week holds one focus, one small daily practice, one thing to read, one tool to use, and one honest question' is in 24 plan intros and 'A missed week is not failure; you just pick it back up' in 18 or more. I left both: they are instructions, and the safety paragraph should stay consistent. A later engineering change could move the first into the page layout so the intro can start with the person.
- Saved Substack profile versus VOICE-JAMES-BELL.md: the profile asks for 'one line the reader screenshots', 'stacked landing lines', 2 to 4 sentence paragraphs and 'no exclamation marks ever'. The voice standard asks for developed paragraphs, at most one earned verdict, and allows exclamation points inside quoted Scripture (six here, all inside Scripture). I followed the voice standard and did not rewrite toward the profile.
- Checks that came back clean: no em-dash or en-dash anywhere; no Forbidden Language (the one 'blessed' is inside Mark 10:16); every exclamation point is inside quoted Scripture; no connective filler (Moreover, Ultimately, etc.); no title, years in ministry, book count or denomination stated; every plan has a careNote with 988 and Find Help; political criticism in the Topics pages names right and left together; contested second-order questions are left open.
- After applying: subtitle edits (caregiving, forgiveness, marriage) need scripts/build-plans-index.mjs rerun; topic edits need scripts/build-topics-index.mjs; then validate-plans and validate-topics. I ran no builds and edited nothing in the repo.
