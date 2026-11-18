# Voice audit: Honest Answers

File: `/home/user/Livewell-/client/src/data/answers.ts` (36 answers, keyed by `slug`). Read-only audit; nothing in the repository was changed.

**human_score 5/10. voice_score 6/10.**

Thirty-six answers with real substance and some passages only James could have written, wearing a machine's habits: 56 em-dashes in the first fifteen answers, an epigram closing about thirty of the thirty-six, deny-then-assert antithesis as the default sentence, the editorial rulebook's vocabulary in the last twelve, and essay images left stranded by compression. All 101 findings carry an exact replacement; none changes a fact, quotation or reference.

Quotes and replacements are raw source text: a `\"` in a quote is the escaped quotation mark as it sits in the TypeScript string. Every quote was checked to occur exactly once in the file, and applying all replacements leaves zero em-dashes in the data. Full machine-readable list: `/home/user/voice-audit/library-honest-answers.json`.

## 1. Patterns that repeat

### Em-dashes (56, all in the first fifteen answers)

Lines 32 to 202 only. The later twenty-one answers have none, so the library reads as two different drafts. Every one of the 56 has a replacement in the JSON. scripts/validate-no-emdash.mjs does not scan client/src/data/answers.ts, which is how they survived.

- `did-the-resurrection-actually-happen` (line 32, HA-001)
  - Quote: The resurrection is the best historical explanation of facts nearly all serious scholars — skeptical ones included — already grant. Not a proof. The best explanation.
  - Replace with: The resurrection is the best historical explanation of facts that nearly all serious scholars, skeptical ones included, already grant. It isn't a proof, but it is the best explanation.
- `how-can-god-be-three-and-one` (line 155, HA-036)
  - Quote: Every analogy — water, clover, sun — fails, and the failure is a clue.
  - Replace with: Every analogy fails, whether water, clover, or sun, and the failure is a clue.
- `what-does-the-bible-say-about-anxiety` (line 190, HA-051)
  - Quote: The cure is order — \"But seek first the kingdom of God and his righteousness, and all these things will be added to you\" (Matthew 6:33) — and address: you take the worry
  - Replace with: The cure starts with order: \"But seek first the kingdom of God and his righteousness, and all these things will be added to you\" (Matthew 6:33). Then it has an address. You take the worry

### Aphoristic two-beat closers (about thirty of thirty-six answers end on one)

The single biggest tell. Each answer's last line is an epigram, usually a matched pair. Two answers close on the same mould ('not asking to be trusted blindly... asking to be opened' / 'did not ask to be believed blindly... asked to be weighed'). The ones worth keeping because the answer earned them: 'I just don't think it can hold you', 'The crutch was real. It was just in my other hand', 'The floor held anyway. It is worth asking who laid it', 'It would not stay closed', 'He entered it'.

- `what-does-the-bible-say-about-money` (line 180, HA-049)
  - Quote: The number was never the point. It was only ever a mirror.
  - Replace with: The number only shows you what you already trust.
- `how-should-a-christian-read-genesis-1` (line 415, HA-093)
  - Quote: Hold the Creator with a closed hand. Hold the mechanism with an open one.
  - Replace with: Hold on tight to the Creator, and hold the mechanism loosely.
- `done-with-church-but-not-jesus` (line 134, HA-028)
  - Quote: That is not a verdict on the coal. Jesus has never handed himself out one isolated soul at a time. He comes with a body attached. That is not the fine print. That is the gift.
  - Replace with: I'm not blaming the coal. Jesus has never handed himself out one isolated soul at a time. He comes with a body attached, and the body is part of the gift.

### 'It is not X. It is Y.' as the default gait (27 two-sentence instances, 15 'was never')

Worst in is-jesus-the-only-way (seven in one answer), are-miracles-believable, should-a-christian-follow-a-political-party and can-life-mean-anything-without-god (the same antithesis three times).

- `is-jesus-the-only-way` (line 212, HA-058)
  - Quote: The question is not whether to make an exclusive claim. It is which one is true.
  - Replace with: Everybody at the table is making an exclusive claim. What's left to ask is which one is true.
- `can-life-mean-anything-without-god` (line 342, HA-078)
  - Quote: The seam is not whether you can make meaning but what kind.
  - Replace with: What matters is the kind of meaning you can make.
- `can-you-be-a-christian-without-church` (line 123, HA-026)
  - Quote: The loneliness of your private faith is not a personal failing. It is the ache of a thing built for two or more, running on one.
  - Replace with: The loneliness of your private faith doesn't mean you've failed. A thing built for two or more aches when it runs on one.

### Rulebook leakage (the editorial method written into the prose)

'second-order', 'first-order', 'third-order', 'confessional floor', 'confessional core', 'at full strength', 'at their strongest', 'full due', 'Grant', 'Concede', 'Refuse both cheap versions', 'remain a brother', 'verdict', 'indictment'. Readers do not sort doctrine into orders; the rulebook does. Concentrated in the last twelve answers.

- `what-makes-us-human-in-the-age-of-ai` (line 450, HA-098)
  - Quote: The functionalist case deserves to be stated at full strength before anyone answers it.
  - Replace with: Start with the functionalist case, because it's a serious one.
- `does-god-choose-us-or-do-we-choose-him` (line 402, HA-090)
  - Quote: This is a second-order question. It divides Calvinist and Arminian churches that preach the same gospel and confess the same creeds, and it is not the confessional floor. You can close this page holding either answer and remain a brother, so I am going to hand you both at their strongest rather than pick your side for you.
  - Replace with: This question divides Calvinist and Arminian churches that preach the same gospel and confess the same creeds. You can close this page holding either answer and still be my brother or sister, so I'm going to lay out both and not pick for you.
- `does-god-actually-exist` (line 225, HA-060)
  - Quote: Grant the other side its strongest hand first. Schellenberg built
  - Replace with: The other side has a real case. Schellenberg built

### Compressions that no longer parse without the essay

Images and referents carried over from the full essay with their setup cut: the dark kitchen and glass of water, 'that accusation', the ocean (Trinity), the wall (anxiety), 'the running' (teenager), 'the specific child', 'closes the fawn'.

- `can-life-mean-anything-without-god` (line 343, HA-081)
  - Quote: Wait for the good day, the dark kitchen, the glass of water. Then notice which one of you gets tired first.
  - Replace with: Wait for a good day, when you're standing in the dark kitchen with a glass of water and nothing is wrong. Then notice which one of you gets tired first, you or the meaning you made.
- `what-about-those-who-never-heard` (line 239, HA-065)
  - Quote: That accusation died with him and got up without him. It is meant to send you back to the road.
  - Replace with: That is meant to send you back to the road.
- `why-would-anyone-trust-the-bible` (line 46, HA-006)
  - Quote: Independent witnesses differ at the edges and converge at the center — on the angels, not on the crucifixion, the empty tomb, the appearances.
  - Replace with: Independent witnesses differ at the edges and converge at the center. They differ on the angels. They do not differ on the crucifixion, the empty tomb, or the appearances.

### Announced turns and signposts

- `can-you-lose-your-salvation` (line 369, HA-085)
  - Quote: Here is the pastoral heart of it, and it is the part that matters most for the person actually afraid.
  - Replace with: For the person who is actually afraid, this is the part that matters most.
- `what-makes-us-human-in-the-age-of-ai` (line 452, HA-100)
  - Quote: Which reframes the anxiety.
  - Replace with: That changes what we should be anxious about.
- `is-jesus-the-only-way` (line 212, HA-057)
  - Quote: But notice the one thing the parable cannot survive being asked.
  - Replace with: But the parable has a problem.

### Stamps and motifs repeated across answers

'honest/honestly' 13 times as a self-certifying word; the moral 'floor' eight times in six answers; 'None of this/that' opening a sentence in four answers; 'no friend of / no apologist' three times; 'the whole time' three times; the paragraph-three confession ('I once thought', 'I used to play this', 'I ran the projection test', 'I say this against myself', 'I held the comfortable view', 'I made the math objection for years') in roughly twenty answers. See also the floor fix under can-life-mean-anything-without-god and the 'None of' fixes under what-about-those-who-never-heard and why-does-god-allow-natural-disasters.

- `did-god-command-genocide` (line 290, HA-072)
  - Quote: Kenneth Kitchen, no friend of softening Scripture, said the same in On the Reliability of the Old Testament (2003).
  - Replace with: Kenneth Kitchen, a conservative Egyptologist, said the same in On the Reliability of the Old Testament.
- `did-god-command-genocide` (line 291, HA-073)
  - Quote: That is the honest place to be.
  - Replace with: I think that is the right place to be.
- `christianity-and-islam-differences` (line 354, HA-082)
  - Quote: The honest look is harder.
  - Replace with: A real look is harder.

### Fragment stacks and matched pairs

Also the symmetry findings: 'Objective, because... Not arbitrary, because...' and 'Biblical faith is reaching for reasons the whole time. Reason is running on trust the whole time.'

- `what-does-the-bible-say-about-money` (line 179, HA-048)
  - Quote: Not should not. Cannot. Money is a rival god: it promises security, status, freedom — the things only God can finally make good on.
  - Replace with: He didn't say should not. He said cannot. Money is a rival god. It promises security, status, and freedom, the things only God can finally make good on.
- `can-you-be-good-without-god` (line 250, HA-066)
  - Quote: The real question is quieter. Not whether an atheist can be good, but what makes the word good point at anything real when he says it.
  - Replace with: The real question is quieter: what makes the word good point at anything real when an atheist says it.
- `when-your-teenager-says-they-dont-believe` (line 202, HA-056)
  - Quote: Keep the table set. Keep the porch light on. The running is not the end of the story.
  - Replace with: Keep the table set and the porch light on. This is not the end of the story.

## 2. The ten worst passages

1. `can-life-mean-anything-without-god` (line 343, HA-081): compression that no longer parses
   - Quote: Wait for the good day, the dark kitchen, the glass of water. Then notice which one of you gets tired first.
   - Why: The kitchen and the glass of water come from the essay. Here they arrive with no setup and the last sentence has no clear 'which one of you'.
   - Replace with: Wait for a good day, when you're standing in the dark kitchen with a glass of water and nothing is wrong. Then notice which one of you gets tired first, you or the meaning you made.

2. `done-with-church-but-not-jesus` (line 134, HA-028): three stacked antitheses ending on a slogan
   - Quote: That is not a verdict on the coal. Jesus has never handed himself out one isolated soul at a time. He comes with a body attached. That is not the fine print. That is the gift.
   - Why: 'That is not a verdict... That is not the fine print. That is the gift.' Three deny-then-assert beats in five sentences, ending on an epigram. It also uses 'verdict', a rulebook word.
   - Replace with: I'm not blaming the coal. Jesus has never handed himself out one isolated soul at a time. He comes with a body attached, and the body is part of the gift.

3. `does-god-choose-us-or-do-we-choose-him` (line 402, HA-090): rulebook leakage
   - Quote: This is a second-order question. It divides Calvinist and Arminian churches that preach the same gospel and confess the same creeds, and it is not the confessional floor. You can close this page holding either answer and remain a brother, so I am going to hand you both at their strongest rather than pick your side for you.
   - Why: 'second-order', 'confessional floor', 'remain a brother', 'at their strongest' are all the rulebook's own words (CLAUDE.md, Handling a contested doctrine). 'Brother' alone also leaves out half the readers.
   - Replace with: This question divides Calvinist and Arminian churches that preach the same gospel and confess the same creeds. You can close this page holding either answer and still be my brother or sister, so I'm going to lay out both and not pick for you.

4. `what-makes-us-human-in-the-age-of-ai` (line 450, HA-098): rulebook leakage
   - Quote: The functionalist case deserves to be stated at full strength before anyone answers it.
   - Why: BRIEF quotes almost this exact sentence as a caught tell ('it deserves to be stated the way he would state it').
   - Replace with: Start with the functionalist case, because it's a serious one.

5. `should-a-christian-follow-a-political-party` (line 166, HA-042): em-dash, epigram, and a symmetrical two-beat slogan
   - Quote: The left tells the same lie in a different accent — and the herd that is certain it is not a herd is the most thoroughly herded of all. The direction differs. The idolatry is identical.
   - Why: 'The direction differs. The idolatry is identical.' is a matched pair with alliteration. Note also that the right gets a date and a mechanism (1979, the voter guide) while the left gets only a metaphor; see for_james.
   - Replace with: The left tells the same lie in a different accent, and a herd that is sure it isn't a herd is the easiest to lead. The direction is different and the idolatry is the same.

6. `what-about-those-who-never-heard` (line 239, HA-065): compression that no longer parses
   - Quote: That accusation died with him and got up without him. It is meant to send you back to the road.
   - Why: No accusation has been named in this answer, so 'That accusation died with him and got up without him' has no referent. It is a clever line carried over from the essay without its setup.
   - Replace with: That is meant to send you back to the road.

7. `what-does-the-bible-say-about-money` (line 179, HA-048): fragment stack, colon-reveal and em-dash
   - Quote: Not should not. Cannot. Money is a rival god: it promises security, status, freedom — the things only God can finally make good on.
   - Why: Verbless fragments standing in for a sentence. VOICE-JAMES-BELL.md ranks full thoughts above fragment stacks.
   - Replace with: He didn't say should not. He said cannot. Money is a rival god. It promises security, status, and freedom, the things only God can finally make good on.

8. `was-jesus-just-a-good-teacher` (line 85, HA-016): em-dash pair, a hedge ('perhaps'), and a clause left dangling
   - Quote: The trilemma's largest hole is legend — perhaps a later church put the high claims in a humble rabbi's mouth — long the scholarly default.
   - Why: The three-paragraph squeeze of the essay left a sentence or image that cannot be followed without the essay. It reads as machine summarizing, not a person answering.
   - Replace with: The trilemma's largest hole is legend. Maybe a later church put the high claims in a humble rabbi's mouth, and for a long time that was the scholarly default.

9. `can-you-lose-your-salvation` (line 367, HA-083): rulebook leakage
   - Quote: Faithful churches divide on this, and they divide hard, so I will tell you honestly that this is second-order ground and not the confessional floor.
   - Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.
   - Replace with: Faithful churches divide on this, and they divide hard. The creeds don't settle it, and I won't pretend they do.

10. `what-does-the-bible-say-about-divorce-and-remarriage` (line 428, HA-096): crisis-facing passage without a visible path to help
   - Quote: If you are in danger, get safe first and sort the theology after.
   - Why: The one sentence in the library addressed to a person who may be in physical danger names no next step. Fixer: confirm /help carries domestic-violence resources before shipping this wording, or have Answers.tsx render a Find Help link under this answer.
   - Replace with: If you are in danger, get safe first and sort the theology after. The Find Help page on this site (/help) is a place to start.

## 3. Most machine-sounding and most his

Most machine-sounding:

- what-makes-us-human-in-the-age-of-ai (no first person, no reader, workshop vocabulary; could run on any apologetics site)
- does-god-choose-us-or-do-we-choose-him
- how-should-a-christian-read-genesis-1
- is-hell-forever-or-does-it-end
- can-you-lose-your-salvation (these four narrate the rulebook's first/second/third-order sorting)
- should-a-christian-follow-a-political-party (epigram on epigram)
- what-does-the-bible-say-about-money
- what-happens-after-deconstruction (one motif stamped through every sentence)
- is-jesus-the-only-way (seven antitheses)

Most his:

- is-faith-just-wishful-thinking (the fatherless boy and the Godless sky; nobody else could write that paragraph)
- why-didnt-the-bible-just-ban-slavery
- did-god-command-genocide
- is-anxiety-a-spiritual-failure (minus its last line)
- can-you-be-a-christian-without-church (for 'You can hold the faith by yourself. I just don't think it can hold you.')
- does-god-actually-exist
- why-does-god-allow-natural-disasters
- christianity-and-islam-differences

## 4. Scores

human_score 5: a careful reader would suspect a machine inside the first three answers, on the em-dashes and the closers alone. With the fixes below applied I would put it at 8; the remaining gap is the paragraph-three confession formula and the two-draft seam, which need James.
voice_score 6: the arguments, the concessions and the self-implication are his. The surface is the older fragment-and-slogan register that VOICE-JAMES-BELL.md retired.

Clean on: Forbidden Language (literal search, zero; 'blessed' at line 329 is the verb), exclamation points (four, all inside quoted Scripture), title, years in ministry, book count, denomination (none stated).

## For James

- Biography to confirm, because I could not check it and would not invent around it: 'I built an atheism at nineteen' (what-happens-after-deconstruction); 'For most of my life I was an atheist' and 'a man who spent most of his life certain no one was there' (is-jesus-the-only-way, does-god-actually-exist); 'They were right about the church I was leaving' (what-did-the-new-atheists-get-right), which implies you were inside a church before you believed; 'on a night when I was the thing that had broken' (can-life-mean-anything-without-god); 'I have watched the anger last into the tenth year' (is-it-okay-to-be-angry-at-god); 'You are describing my inbox' (is-faith-just-wishful-thinking). If any of these is not literally true, tell us and we cut it.
- Your atheist past appears in about twenty of the thirty-six answers, nearly always opening the third paragraph. Each one is fine alone; together it becomes a formula and starts working as a credential. Pick the eight or ten answers where it is doing real work (wishful thinking, slavery, genocide, does God exist, good without God are the strongest) and let us plain-state the rest.
- should-a-christian-follow-a-political-party: the right gets a date and a mechanism ('After 1979 a voter guide functioned as a catechism'); the left gets only a metaphor ('the same lie in a different accent'). The essay presumably names the left's version as concretely. Give us the one sentence you would use so the instrument is the same in both directions.
- The two anxiety answers pull against each other. what-does-the-bible-say-about-anxiety calls worry 'a quiet declaration that he is not there' and 'a practical atheism'; is-anxiety-a-spiritual-failure says 'Anxiety is not a verdict on your faith, and the person who told you it was did you real harm.' A reader with an anxiety disorder who lands on the first one gets no help line and something close to the pietist answer the second one rejects. Decide whether the first should say it is about ordinary worry, and point to the second.
- Path to help: the answers are plain strings and Answers.tsx renders no Find Help link, so the divorce answer ('If you are in danger, get safe first') and the natural-evil answer ('If you are in the middle of this') name no next step. Only the anxiety answer carries 988. Simplest fix is a Find Help link under those answers in the page; that is an engineering change, not a wording change.
- Facts to verify against the essays (I changed none of them): 'Jesus spoke about money and possessions more than he spoke about heaven and hell combined' (a popular claim that is hard to source); Kepler 'thinking God's thoughts after him' (widely attributed, hard to find verbatim); the Nagel quotation's punctuation; 'a desperate father with a dying child' for Mark 9, where the boy is tormented, not said to be dying; Holland and Hurtado appear by surname only, with no first name or idea-label for a reader who has not met them.
- Mark 9:24 is quoted three times, twice without its exclamation point and once with it. The ESV has 'I believe; help my unbelief!'. '(…, ESV)' is appended to four references and not the rest. Psalm 13:1, Psalm 22:1 and John 6:68 are quoted without quotation marks. Tell us which convention you want and we will make all thirty-six match.
- Where your saved Substack profile and VOICE-JAMES-BELL.md disagree, I followed VOICE-JAMES-BELL.md as instructed. The profile asks for 'stacked landing lines', a screenshot line in every piece, and two-to-four-sentence paragraphs; the voice standard asks for developed paragraphs and one earned verdict. These answers were written toward the profile, which is where most of the pillow closers come from.
- Contractions: the library has almost none ('I just don't think it can hold you' is the rare one, and it is the best line in the file). The replacements use them lightly. If you want the answers fully uncontracted, say so.
- The file's own header says each answer is 'three tight paragraphs'. The first fifteen average about 75 words a paragraph; the last twenty-one run 150 to 250. That is two drafts by two hands and a reader can feel the seam. Worth deciding which length you want.

## All findings

101 findings. `must` = a named tell under the brief (em-dash, rulebook leakage, unparseable sentence, care). `should` = pattern fix. `consider` = judgment call.

### did-the-resurrection-actually-happen

**HA-001** (line 32, must, em-dash pair plus fragment stack)

- Quote: The resurrection is the best historical explanation of facts nearly all serious scholars — skeptical ones included — already grant. Not a proof. The best explanation.
- Replace with: The resurrection is the best historical explanation of facts that nearly all serious scholars, skeptical ones included, already grant. It isn't a proof, but it is the best explanation.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-002** (line 33, must, em-dash outside a quotation)

- Quote: Hallucinations are private events — they do not happen
- Replace with: Hallucinations are private events. They do not happen
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-003** (line 33, should, 'It is not X. It is Y.' antithesis used as a habit)

- Quote: That is not a finding. It is an assumption dressed as rigor.
- Replace with: He assumes the answer and calls it rigor.
- Why: The same deny-then-assert move runs several times inside one three-paragraph answer. Once at the hinge is his voice; here it is the default gait and a careful reader hears a template.

**HA-004** (line 34, must, em-dash outside a quotation)

- Quote: The verdict without the work — where I lived for years — is not.
- Replace with: Reaching the verdict without doing the work isn't, and that's where I lived for years.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

### why-would-anyone-trust-the-bible

**HA-005** (line 45, must, em-dash outside a quotation)

- Quote: claims the relevant scholarship — much of it produced by skeptics — does not support.
- Replace with: claims the relevant scholarship, much of it produced by skeptics, does not support.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-006** (line 46, must, em-dash plus a sentence that no longer parses)

- Quote: Independent witnesses differ at the edges and converge at the center — on the angels, not on the crucifixion, the empty tomb, the appearances.
- Replace with: Independent witnesses differ at the edges and converge at the center. They differ on the angels. They do not differ on the crucifixion, the empty tomb, or the appearances.
- Why: The three-paragraph squeeze of the essay left a sentence or image that cannot be followed without the essay. It reads as machine summarizing, not a person answering.

**HA-007** (line 46, must, em-dash outside a quotation)

- Quote: All four put women — witnesses their culture discounted — first at the tomb; fabricators edit that out.
- Replace with: All four put women first at the tomb, though their culture discounted women as witnesses, and fabricators edit that out.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-008** (line 47, must, em-dash outside a quotation)

- Quote: My unbelief felt like the brave option. It was the credulous one — faith in secular folklore about the Bible, held on worse evidence than the thing I was rejecting.
- Replace with: My unbelief felt like the brave option, but it was the credulous one. I was trusting secular folklore about the Bible on worse evidence than the thing I was rejecting.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-009** (line 47, should, aphoristic two-beat closer)

- Quote: The book is not asking to be trusted blindly. It is asking to be opened.
- Replace with: All the book asks first is that you open it.
- Why: Pillow closer, and the same template closes the miracles answer ('He did not ask to be believed blindly. He asked to be weighed.'). Two answers ending on one mould is a machine signature.

### if-god-is-good-why-suffering

**HA-010** (line 58, should, 'not X but Y' aphorism closing the paragraph)

- Quote: What remains is not a proof but a cry.
- Replace with: What remains is the cry, and an argument can't quiet it.
- Why: The answer ends on an epigram that could be lifted onto a pillow. Thirty of the thirty-six answers end this way, so the reader learns the shape by the third one.

**HA-011** (line 59, should, compression that no longer parses)

- Quote: Every worldview carries the problem; the secular one relocates it, where suffering means nothing.
- Replace with: Every worldview has to carry the problem. The secular one only moves it to a universe where suffering means nothing.
- Why: The three-paragraph squeeze of the essay left a sentence or image that cannot be followed without the essay. It reads as machine summarizing, not a person answering.

**HA-012** (line 60, must, em-dash plus three antitheses in two sentences)

- Quote: Out of the whirlwind God answers Job with questions, not a theodicy — he refuses the explanation and offers himself. The center of the faith is not a God who explains from a distance but one who entered it.
- Replace with: Out of the whirlwind God answers Job with questions. He never gives the explanation; he gives himself. And at the center of the faith is a God who entered the suffering instead of explaining it from a distance.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

### what-if-christianity-is-wrong

**HA-013** (line 71, must, em-dash outside a quotation)

- Quote: If Christianity is wrong, everything falls — Paul says if Christ
- Replace with: If Christianity is wrong, everything falls. Paul says that if Christ
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-014** (line 72, must, em-dash outside a quotation)

- Quote: Even the morality you cannot stop believing — the worth of the weak — is, on Holland's account, borrowed Christian capital.
- Replace with: Even the morality you can't stop believing, the worth of the weak, is on Holland's account borrowed Christian capital.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-015** (line 73, must, em-dash outside a quotation)

- Quote: The question might end a version of your faith — the sheltered one that was always going to break.
- Replace with: The question might end a version of your faith, the sheltered one that was always going to break.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

### was-jesus-just-a-good-teacher

**HA-016** (line 85, must, em-dash pair, a hedge ('perhaps'), and a clause left dangling)

- Quote: The trilemma's largest hole is legend — perhaps a later church put the high claims in a humble rabbi's mouth — long the scholarly default.
- Replace with: The trilemma's largest hole is legend. Maybe a later church put the high claims in a humble rabbi's mouth, and for a long time that was the scholarly default.
- Why: The three-paragraph squeeze of the essay left a sentence or image that cannot be followed without the essay. It reads as machine summarizing, not a person answering.

**HA-017** (line 86, must, em-dash outside a quotation)

- Quote: I held the comfortable view. It was a file, not a conclusion — honoring a man without obeying him.
- Replace with: I held the comfortable view, and it was a place to file him more than a conclusion. It let me honor a man without obeying him.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

### do-i-have-to-choose-between-faith-and-science

**HA-018** (line 97, must, em-dash outside a quotation)

- Quote: Andrew Dickson White (1896) — polemics, not history.
- Replace with: Andrew Dickson White (1896), and their books were polemics, not history.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-019** (line 98, must, em-dash outside a quotation)

- Quote: The friction is real — the fight over Darwin was real
- Replace with: The friction is real. The fight over Darwin was real
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

### is-it-okay-to-be-angry-at-god

**HA-020** (line 110, must, em-dash outside a quotation)

- Quote: Yes — the prayer book of the Bible says so.
- Replace with: Yes. The prayer book of the Bible says so.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-021** (line 111, must, em-dash outside a quotation)

- Quote: Walter Brueggemann noticed the church has dropped these psalms from its worship — a cutting that made our faith not more reverent but dishonest.
- Replace with: Walter Brueggemann noticed that the church has dropped these psalms from its worship, and the cut didn't make our faith more reverent. It made it dishonest.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-022** (line 111, must, em-dash outside a quotation)

- Quote: There is an anger that walks out, and an anger that stays in the room — faith holding on with bloodied hands.
- Replace with: There is an anger that walks out and an anger that stays in the room, and the second is faith holding on with bloodied hands.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-023** (line 112, must, em-dash outside a quotation)

- Quote: why have you forsaken me — Psalm 22.
- Replace with: why have you forsaken me? That is Psalm 22.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

### can-you-be-a-christian-without-church

**HA-024** (line 121, must, em-dash outside a quotation)

- Quote: You can believe alone — the thief on the cross
- Replace with: You can believe alone. The thief on the cross
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-025** (line 122, must, em-dash outside a quotation)

- Quote: you were blamed for leaving — which is exactly backward.
- Replace with: you were blamed for leaving, which is exactly backward.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-026** (line 123, should, 'It is not X. It is Y.' antithesis used as a habit)

- Quote: The loneliness of your private faith is not a personal failing. It is the ache of a thing built for two or more, running on one.
- Replace with: The loneliness of your private faith doesn't mean you've failed. A thing built for two or more aches when it runs on one.
- Why: Third 'is not X. It is Y.' in this one answer (after 'not the same sentence' and 'not a more autonomous hand. It is a dying hand.'). The closing line that follows is the one that should carry the weight.

### done-with-church-but-not-jesus

**HA-027** (line 132, must, em-dash outside a quotation)

- Quote: in the last quarter-century — and a large share did not deconvert.
- Replace with: in the last quarter-century, and a large share did not deconvert.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-028** (line 134, must, three stacked antitheses ending on a slogan)

- Quote: That is not a verdict on the coal. Jesus has never handed himself out one isolated soul at a time. He comes with a body attached. That is not the fine print. That is the gift.
- Replace with: I'm not blaming the coal. Jesus has never handed himself out one isolated soul at a time. He comes with a body attached, and the body is part of the gift.
- Why: 'That is not a verdict... That is not the fine print. That is the gift.' Three deny-then-assert beats in five sentences, ending on an epigram. It also uses 'verdict', a rulebook word.

### what-happens-after-deconstruction

**HA-029** (line 143, must, em-dash plus colon-then-reveal)

- Quote: The swept house does not stay empty — that is what happens. But first: the people deconstructing
- Replace with: The swept house does not stay empty. That is what happens. But first, the people deconstructing
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-030** (line 144, must, em-dash outside a quotation)

- Quote: Derrida meant deconstruction as a way of reading — taking a text apart to see what it was built on — and somewhere
- Replace with: Derrida meant deconstruction as a way of reading, taking a text apart to see what it was built on, and somewhere
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-031** (line 144, must, em-dash outside a quotation)

- Quote: is itself a faith — a faith in nothing in particular.
- Replace with: is itself a faith, a faith in nothing in particular.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-032** (line 145, must, em-dash outside a quotation)

- Quote: his demolition always had a destination — the line between the prophet and the cynic.
- Replace with: his demolition always had a destination, and that is the line between the prophet and the cynic.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-033** (line 145, should, literary closer on a stamped motif)

- Quote: The field has no roof, and the rain is coming, and a hammer was never a shelter.
- Replace with: The field has no roof and the rain is coming. A hammer can take a house down, but it can't keep the rain off you.
- Why: Field, hammer, roof and rain are stamped through all three paragraphs and the answer ends on an epigram with the library's 'was never' tic (15 uses across 36 answers).

### how-can-god-be-three-and-one

**HA-034** (line 154, must, em-dash outside a quotation)

- Quote: three in persons — the oneness and the threeness
- Replace with: three in persons. The oneness and the threeness
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-035** (line 155, must, em-dash outside a quotation)

- Quote: drew the line — the Son is of the same being as the Father — because only God can save you.
- Replace with: drew the line: the Son is of the same being as the Father, because only God can save you.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-036** (line 155, must, em-dash outside a quotation)

- Quote: Every analogy — water, clover, sun — fails, and the failure is a clue.
- Replace with: Every analogy fails, whether water, clover, or sun, and the failure is a clue.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-037** (line 156, must, em-dash outside a quotation)

- Quote: love all the way down — and salvation is adoption
- Replace with: love all the way down, and salvation is adoption
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-038** (line 156, should, aphoristic two-beat closer)

- Quote: You are not meant to master the ocean. You are meant to be taken out into it.
- Replace with: You aren't asked to master the Trinity. You're asked into that family.
- Why: Pillow closer on an ocean image the answer never set up (the essay did). The sentence before it gave the reader adoption into a family; land there.

### should-a-christian-follow-a-political-party

**HA-039** (line 165, should, chiasmus epigram as the opening line)

- Quote: Hold your convictions; do not let a party hold your conscience.
- Replace with: Keep your convictions, but don't hand your conscience to a party.
- Why: A balanced-antithesis standfirst ('Hold your X; do not let Y hold your Z'). BRIEF lists chiasmus and epigram among the tells.

**HA-040** (line 165, must, em-dash outside a quotation)

- Quote: The question is not whether your politics are right but whether they are yours — reasoned from something prior
- Replace with: The first question isn't whether your politics are right. It's whether they're yours, reasoned from something prior
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-041** (line 166, must, antithesis, em-dash and colon-reveal in one sentence)

- Quote: Capture is not a partisan event. It is a human one — the standard wiring of every mind, mine included: we judge
- Replace with: Capture happens in every party because it happens in every mind, mine included. We judge
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-042** (line 166, must, em-dash, epigram, and a symmetrical two-beat slogan)

- Quote: The left tells the same lie in a different accent — and the herd that is certain it is not a herd is the most thoroughly herded of all. The direction differs. The idolatry is identical.
- Replace with: The left tells the same lie in a different accent, and a herd that is sure it isn't a herd is the easiest to lead. The direction is different and the idolatry is the same.
- Why: 'The direction differs. The idolatry is identical.' is a matched pair with alliteration. Note also that the right gets a date and a mechanism (1979, the voter guide) while the left gets only a metaphor; see for_james.

**HA-043** (line 167, must, em-dash outside a quotation)

- Quote: Name the issue where you disagree with your own side — one that would cost you standing.
- Replace with: Name the issue where you disagree with your own side, one that would cost you standing.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-044** (line 167, consider, announced turn or signpost)

- Quote: One test does not lie.
- Replace with: Try one test.
- Why: The sentence tells the reader a turn is coming and carries no content of its own.

### what-does-the-bible-say-about-money

**HA-045** (line 178, must, em-dash outside a quotation)

- Quote: cannot finally serve alongside God — all three at once.
- Replace with: cannot finally serve alongside God, all three at once.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-046** (line 179, must, em-dash outside a quotation)

- Quote: crashes against the text just as hard — the biblical ideal is neither poverty nor riches but a life of enough, surplus moving outward toward need.
- Replace with: crashes against the text just as hard. The biblical ideal is neither poverty nor riches but a life of enough, with the surplus moving outward toward need.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-047** (line 179, must, em-dash outside a quotation)

- Quote: (1 Timothy 6:10) — not the thing, the grip.
- Replace with: (1 Timothy 6:10). The trouble is the grip, not the thing.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-048** (line 179, must, fragment stack, colon-reveal and em-dash)

- Quote: Not should not. Cannot. Money is a rival god: it promises security, status, freedom — the things only God can finally make good on.
- Replace with: He didn't say should not. He said cannot. Money is a rival god. It promises security, status, and freedom, the things only God can finally make good on.
- Why: Verbless fragments standing in for a sentence. VOICE-JAMES-BELL.md ranks full thoughts above fragment stacks.

**HA-049** (line 180, should, aphoristic two-beat closer)

- Quote: The number was never the point. It was only ever a mirror.
- Replace with: The number only shows you what you already trust.
- Why: The answer ends on an epigram that could be lifted onto a pillow. Thirty of the thirty-six answers end this way, so the reader learns the shape by the third one.

### what-does-the-bible-say-about-anxiety

**HA-050** (line 190, must, em-dash outside a quotation)

- Quote: the goodness and competence of God — a practical atheism that coexists with a Sunday faith — and you do not defeat worry by fighting it; it shrinks when confidence in the Father crowds it out.
- Replace with: the goodness and competence of God, a practical atheism that coexists with a Sunday faith. You don't defeat worry by fighting it. It shrinks when confidence in the Father crowds it out.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-051** (line 190, must, em-dash pair wrapped around a verse, then a colon-reveal)

- Quote: The cure is order — \"But seek first the kingdom of God and his righteousness, and all these things will be added to you\" (Matthew 6:33) — and address: you take the worry
- Replace with: The cure starts with order: \"But seek first the kingdom of God and his righteousness, and all these things will be added to you\" (Matthew 6:33). Then it has an address. You take the worry
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-052** (line 191, must, literary closer on an image the answer never set up)

- Quote:  The wall you built to keep out the dark was the thing making the nights so long.
- Replace with: (delete, including the leading space)
- Why: No wall appears anywhere in this answer; the image belongs to the essay. Cut it and the answer ends on the promise ('seen, and fed, and worth more than the birds'), which is the stronger and plainer ending. Replacement is a deletion, including the leading space.

### when-your-teenager-says-they-dont-believe

**HA-053** (line 200, must, two antitheses and an em-dash in three sentences; 'verdict' is a rulebook word)

- Quote: The sentence is a door, not a verdict. What is being tested is not the case for the resurrection. It is you — whether your love was ever actually unconditional, or only the reward for agreement.
- Replace with: What they said opens a conversation. It doesn't close one. And the thing being tested isn't the case for the resurrection. It's you, and whether your love was ever actually unconditional or only the reward for agreement.
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-054** (line 201, must, em-dash outside a quotation)

- Quote: to find which parts are load-bearing — sometimes the only way
- Replace with: to find which parts are load-bearing, and sometimes that is the only way
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-055** (line 202, must, em-dash outside a quotation)

- Quote: Listen long enough that they finish — most teenagers
- Replace with: Listen long enough that they finish. Most teenagers
- Why: The site treats the em-dash as an AI tell in James's voice (BRIEF: none anywhere; VOICE: on the avoid list). This library has 56, all in the first fifteen answers, and scripts/validate-no-emdash.mjs does not scan this file.

**HA-056** (line 202, should, anaphora stack and an unclear referent)

- Quote: Keep the table set. Keep the porch light on. The running is not the end of the story.
- Replace with: Keep the table set and the porch light on. This is not the end of the story.
- Why: 'Keep... Keep...' is greeting-card rhythm, and 'the running' could mean the father's running in Luke 15:20 or the child's running away. See for_james.

### is-jesus-the-only-way

**HA-057** (line 212, should, announced turn or signpost)

- Quote: But notice the one thing the parable cannot survive being asked.
- Replace with: But the parable has a problem.
- Why: The sentence tells the reader a turn is coming and carries no content of its own.

**HA-058** (line 212, should, 'It is not X. It is Y.' antithesis used as a habit)

- Quote: The question is not whether to make an exclusive claim. It is which one is true.
- Replace with: Everybody at the table is making an exclusive claim. What's left to ask is which one is true.
- Why: This answer runs the deny-then-assert move seven times ('does not refuse... It makes one', 'The question is not... It is', 'It is the reverse', 'The scandal was never... It was', 'not in a philosophy... but in a person', 'tenderness, not menace', 'But not for being arrogant. Refuse him for'). Keep the last one, which is the true hinge, and plain-state two of the others.

**HA-059** (line 213, should, 'It is not X. It is Y.' antithesis used as a habit)

- Quote: The scandal was never that the claim grabbed power. It was where it put salvation: not in a philosophy or a bloodline but in a person you can only receive.
- Replace with: That claim wasn't grabbing power. What scandalized people was where it put salvation: in a person you can only receive, and in no philosophy or bloodline.
- Why: 'was never... It was' followed immediately by 'not in... but in', the sixth and seventh antitheses of the answer.

### does-god-actually-exist

**HA-060** (line 225, must, rulebook leakage)

- Quote: Grant the other side its strongest hand first. Schellenberg built
- Replace with: The other side has a real case. Schellenberg built
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-061** (line 225, should, announced turn or signpost)

- Quote: Do not pretend it is weak. Then watch what my account had to spend.
- Replace with: It isn't weak. But look at what my own account had to spend.
- Why: The sentence tells the reader a turn is coming and carries no content of its own.

### what-about-those-who-never-heard

**HA-062** (line 238, must, rulebook leakage)

- Quote: Give the hard answer its full due first.
- Replace with: Start with the hard answer.
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-063** (line 238, must, rulebook leakage)

- Quote: It is genuinely open ground, not first-order.
- Replace with: Faithful Christians disagree here, and the creeds don't settle it.
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-064** (line 239, should, literary phrasing plus the 'None of this' stamp)

- Quote: None of this loosens the church's feet from the road.
- Replace with: The church still has to go.
- Why: 'None of this/that' opens a sentence in four answers (BRIEF lists 'none of this' as a stamp), and 'loosens the church's feet from the road' is a figure where a plain verb would do.

**HA-065** (line 239, must, compression that no longer parses)

- Quote: That accusation died with him and got up without him. It is meant to send you back to the road.
- Replace with: That is meant to send you back to the road.
- Why: No accusation has been named in this answer, so 'That accusation died with him and got up without him' has no referent. It is a clever line carried over from the essay without its setup.

### can-you-be-good-without-god

**HA-066** (line 250, should, fragment stack)

- Quote: The real question is quieter. Not whether an atheist can be good, but what makes the word good point at anything real when he says it.
- Replace with: The real question is quieter: what makes the word good point at anything real when an atheist says it.
- Why: Verbless fragments standing in for a sentence. VOICE-JAMES-BELL.md ranks full thoughts above fragment stacks.

**HA-067** (line 251, should, matched pair of verbless fragments)

- Quote: Objective, because it answers to no one's opinion. Not arbitrary, because it hangs on no will that might have chosen otherwise.
- Replace with: That makes it objective, since it answers to no one's opinion, and it isn't arbitrary, since it hangs on no will that might have chosen otherwise.
- Why: Two sentences built on one mould, the kind of perfect parallelism VOICE-JAMES-BELL.md says makes prose sound generated.

### is-faith-irrational

**HA-068** (line 263, should, symmetrical sentence pair)

- Quote: Biblical faith is reaching for reasons the whole time. Reason is running on trust the whole time.
- Replace with: Biblical faith reaches for reasons the whole time, and reason runs on trust it has never been able to prove.
- Why: Two sentences built on one mould, the kind of perfect parallelism VOICE-JAMES-BELL.md says makes prose sound generated.

**HA-069** (line 265, should, 'was never... It was' tic, 'honest' as self-certifying adjective, and an overclaim)

- Quote: The honest prayer was never the resolved one. It was a desperate father with a dying child:
- Replace with: The most honest prayer in the Gospels isn't a settled one. It comes from a desperate father with a suffering son:
- Why: In Mark 9 the boy is seized and thrown down by a spirit; the text does not say he is dying. 'Honest' appears 13 times across the library as a self-certifying word.

### are-miracles-believable

**HA-070** (line 278, should, aphoristic two-beat closer)

- Quote: He did not ask to be believed blindly. He asked to be weighed.
- Replace with: Paul wasn't asking for blind belief. He put the claim where it could be checked.
- Why: Same mould as the Bible answer's last line ('The book is not asking to be trusted blindly. It is asking to be opened.'). One of the two has to go.

### did-god-command-genocide

**HA-071** (line 291, should, compression that no longer parses)

- Quote: I do not have the specific child who chose none of it, and I will not decorate that grief.
- Replace with: I have no answer for the particular child who chose none of it, and I will not decorate that grief.
- Why: The three-paragraph squeeze of the essay left a sentence or image that cannot be followed without the essay. It reads as machine summarizing, not a person answering.

**HA-072** (line 290, consider, 'no friend of / no apologist' stamp and the 'In Title (YEAR)' scholar parade)

- Quote: Kenneth Kitchen, no friend of softening Scripture, said the same in On the Reliability of the Old Testament (2003).
- Replace with: Kenneth Kitchen, a conservative Egyptologist, said the same in On the Reliability of the Old Testament.
- Why: 'John Earman, no apologist', 'Nagel, no friend of religion', 'Kenneth Kitchen, no friend of softening Scripture': the same credential-by-denial three times in the library. This answer also gives three 'Title (YEAR)' citations in two paragraphs. Replacement needs James or the essay to confirm the descriptor; if unsure use: 'Kenneth Kitchen said the same in On the Reliability of the Old Testament.'

**HA-073** (line 291, consider, 'honest' as a self-certifying adjective)

- Quote: That is the honest place to be.
- Replace with: I think that is the right place to be.
- Why: Thirteen uses of honest/honestly across the library; BRIEF allows one per piece.

### is-faith-just-wishful-thinking

**HA-074** (line 316, consider, rulebook leakage)

- Quote: Grant it. But the argument slides
- Replace with: They have a point. But the argument slides
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-075** (line 316, should, accuracy or verbatim check)

- Quote: \"I don't want there to be a God. I don't want the universe to be like that.\"
- Replace with: \"I don't want there to be a God; I don't want the universe to be like that.\"
- Why: Nagel's sentence in The Last Word joins the two clauses with a semicolon. Verbatim rule; confirm against the essay and the book.

### what-did-the-new-atheists-get-right

**HA-076** (line 329, should, rulebook leakage)

- Quote: Concede the ground, because it is real.
- Replace with: The ground they took is real.
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-077** (line 330, should, rulebook leakage)

- Quote: The indictment the four thought they were leveling from outside
- Replace with: The charge the four thought they were leveling from outside
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

### can-life-mean-anything-without-god

**HA-078** (line 342, should, same antithesis three times in one answer, plus a literary noun)

- Quote: The seam is not whether you can make meaning but what kind.
- Replace with: What matters is the kind of meaning you can make.
- Why: Paragraph one ends 'That was never the real question', paragraph two opens 'The seam is not whether... but what kind', paragraph three opens 'So the question was never whether you can make meaning. It is whether'. One is a hinge; three is a tic.

**HA-079** (line 342, should, rulebook leakage)

- Quote: Take both at full strength. Then watch Tolstoy
- Replace with: Both of them mean it. Then watch Tolstoy
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-080** (line 342, should, the 'floor' motif stamped across the library)

- Quote: And both men kept borrowing a floor their systems could not mill, calling injustice a crime
- Replace with: And both men kept borrowing a moral ground their systems could not supply, calling injustice a crime
- Why: A moral 'floor' that a godless universe 'cannot pour', 'could not mill', that 'I swore was not under me', 'the floor beneath the floor', 'the confessional floor': eight uses in six answers. Keep it in the good-without-God answer, where it is developed, and plain-state it elsewhere.

**HA-081** (line 343, must, compression that no longer parses)

- Quote: Wait for the good day, the dark kitchen, the glass of water. Then notice which one of you gets tired first.
- Replace with: Wait for a good day, when you're standing in the dark kitchen with a glass of water and nothing is wrong. Then notice which one of you gets tired first, you or the meaning you made.
- Why: The kitchen and the glass of water come from the essay. Here they arrive with no setup and the last sentence has no clear 'which one of you'.

### christianity-and-islam-differences

**HA-082** (line 354, consider, 'honest' as a self-certifying adjective)

- Quote: The honest look is harder.
- Replace with: A real look is harder.
- Why: The same phrase or device recurs in answer after answer, so it reads as a template.

### can-you-lose-your-salvation

**HA-083** (line 367, must, rulebook leakage)

- Quote: Faithful churches divide on this, and they divide hard, so I will tell you honestly that this is second-order ground and not the confessional floor.
- Replace with: Faithful churches divide on this, and they divide hard. The creeds don't settle it, and I won't pretend they do.
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-084** (line 368, should, unattributed aphorism on a second-order question)

- Quote: A freedom that cannot walk away is not the love of persons but the holding of objects.
- Replace with: On this reading, a freedom that cannot walk away is the holding of objects, not the love of persons.
- Why: Stated flat, this reads as James's own verdict for the Wesleyan side on a question the answer says it will leave open. Attribute it to the position.

**HA-085** (line 369, must, announced turn or signpost)

- Quote: Here is the pastoral heart of it, and it is the part that matters most for the person actually afraid.
- Replace with: For the person who is actually afraid, this is the part that matters most.
- Why: The sentence tells the reader a turn is coming and carries no content of its own.

### is-anxiety-a-spiritual-failure

**HA-086** (line 380, should, aphoristic two-beat closer)

- Quote: God was never keeping score. He was watching the road.
- Replace with: God isn't keeping score.
- Why: The answer has already said its most important sentence (988) and said so. The epigram after it competes with the help line, and the prodigal's road is not set up anywhere in this answer.

### is-hell-forever-or-does-it-end

**HA-087** (line 389, should, rulebook leakage)

- Quote: is the church's historic teaching and sits near the confessional core.
- Replace with: is what the church has always taught, and it is close to the center of the faith.
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-088** (line 391, should, rulebook leakage)

- Quote: Refuse both cheap versions.
- Replace with: Both cheap versions are wrong.
- Why: Lifted almost word for word from the house rulebook ('Refuse both cheap moves').

**HA-089** (line 391, should, literary inverted closer)

- Quote: The far country's exact geography is contested. That it can be chosen is the claim.
- Replace with: Christians disagree about what hell is like and how long it lasts. They don't disagree that a person can choose it.
- Why: The answer ends on an epigram that could be lifted onto a pillow. Thirty of the thirty-six answers end this way, so the reader learns the shape by the third one.

### does-god-choose-us-or-do-we-choose-him

**HA-090** (line 402, must, rulebook leakage)

- Quote: This is a second-order question. It divides Calvinist and Arminian churches that preach the same gospel and confess the same creeds, and it is not the confessional floor. You can close this page holding either answer and remain a brother, so I am going to hand you both at their strongest rather than pick your side for you.
- Replace with: This question divides Calvinist and Arminian churches that preach the same gospel and confess the same creeds. You can close this page holding either answer and still be my brother or sister, so I'm going to lay out both and not pick for you.
- Why: 'second-order', 'confessional floor', 'remain a brother', 'at their strongest' are all the rulebook's own words (CLAUDE.md, Handling a contested doctrine). 'Brother' alone also leaves out half the readers.

### how-should-a-christian-read-genesis-1

**HA-091** (line 413, must, rulebook leakage)

- Quote: are first-order and non-negotiable. The age of the earth and the mode of creation are third-order and genuinely open, and faithful
- Replace with: are not up for negotiation. The age of the earth and the way God created are open questions, and faithful
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-092** (line 415, must, biography as credential, or beyond the confirmed facts)

- Quote: As a former atheist I can tell you the science was a real barrier
- Replace with: When I was an atheist the science was a real barrier
- Why: 'As a former atheist I can tell you' presents the biography as a credential. The fact stays; the credentialing goes.

**HA-093** (line 415, should, symmetrical pillow closer)

- Quote: Hold the Creator with a closed hand. Hold the mechanism with an open one.
- Replace with: Hold on tight to the Creator, and hold the mechanism loosely.
- Why: The answer ends on an epigram that could be lifted onto a pillow. Thirty of the thirty-six answers end this way, so the reader learns the shape by the third one.

### what-does-the-bible-say-about-divorce-and-remarriage

**HA-094** (line 426, should, rulebook leakage)

- Quote: and every honest treatment has to start by saying so rather than by managing around it.
- Replace with: and we have to say so before we say anything else.
- Why: The prose announces the editorial method (steelman first, first/second/third order, confessional floor) in the house rulebook's own vocabulary. BRIEF names this as the tell earlier judges caught. Do the fair thing; do not announce it.

**HA-095** (line 427, should, essay voice where a person should be talking)

- Quote: particularly regarding abuse and abandonment in their modern forms
- Replace with: especially when it comes to abuse and abandonment
- Why: Formal diction and no contractions where speech would have them.

**HA-096** (line 428, must, crisis-facing passage without a visible path to help)

- Quote: If you are in danger, get safe first and sort the theology after.
- Replace with: If you are in danger, get safe first and sort the theology after. The Find Help page on this site (/help) is a place to start.
- Why: The one sentence in the library addressed to a person who may be in physical danger names no next step. Fixer: confirm /help carries domestic-violence resources before shipping this wording, or have Answers.tsx render a Find Help link under this answer.

### why-does-god-allow-natural-disasters

**HA-097** (line 439, should, odd verb, 'None of that' stamp, third 'honest' in one answer)

- Quote: None of that closes the fawn, and any answer that claims to has stopped being honest.
- Replace with: None of that answers the fawn, and I'd distrust any answer that claims to.
- Why: The three-paragraph squeeze of the essay left a sentence or image that cannot be followed without the essay. It reads as machine summarizing, not a person answering.

### what-makes-us-human-in-the-age-of-ai

**HA-098** (line 450, must, rulebook leakage)

- Quote: The functionalist case deserves to be stated at full strength before anyone answers it.
- Replace with: Start with the functionalist case, because it's a serious one.
- Why: BRIEF quotes almost this exact sentence as a caught tell ('it deserves to be stated the way he would state it').

**HA-099** (line 451, should, essay voice where a person should be talking)

- Quote: which is precisely the road no one should want to walk.
- Replace with: and nobody should want to go down that road.
- Why: Formal diction and no contractions where speech would have them.

**HA-100** (line 452, must, announced turn in workshop vocabulary)

- Quote: Which reframes the anxiety.
- Replace with: That changes what we should be anxious about.
- Why: The sentence tells the reader a turn is coming and carries no content of its own.

**HA-101** (line 452, should, two epigrams for one idea)

- Quote: is an old heresy in new silicon, the gnostic contempt for flesh wearing a better interface.
- Replace with: is an old heresy on new hardware: the gnostic contempt for flesh.
- Why: A fresh figure sits where he would use an ordinary word (BRIEF: fresh literary images where he would use a plain phrase).

