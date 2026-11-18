# Voice audit: older essays (the fifteen live essays that are not files)

Audited 2026-11-17 against docs/VOICE-JAMES-BELL.md (governing), docs/work/essays/BRIEF.md, CLAUDE.md and the saved Substack profile. Read-only: nothing in the repository was changed.

## What was and was not audited

Fifteen essays on the shelf are live and served from the database. The text of only three is in the repository. Those three were audited. The other twelve were not, and nothing below should be read as a judgment on them.

Audited:

- `strongman-theology`: /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md. Human 4.5, voice 5.5. Same text also in: /home/user/Livewell-/content/static-library.generated.json (entry with slug strongman-theology, field body); /home/user/Livewell-/api/static-library.generated.ts; /home/user/Livewell-/client/src/data/content-data.json.
- `when-fear-rewrites-theology`: /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md. Human 4, voice 4.5. Same text also in: /home/user/Livewell-/content/static-library.generated.json (entry with slug when-fear-rewrites-theology, field body); /home/user/Livewell-/api/static-library.generated.ts; /home/user/Livewell-/client/src/data/content-data.json. **Caution:** The repo copy is titled 'When Fear Starts Rewriting What You Believe' (track: doubt). The shelf title is 'When Fear Rewrites Theology' with the blurb 'How sincere Christians justified what they never thought they would.' and the slug is listed in client/src/lib/substackImport.ts. The live database essay at this slug is very likely a different text (the Substack chapter). The repo copy was audited; the live one was not.
- `women-in-church-history`: /home/user/Livewell-/content/archive/free-library/essays-womanhood.json (essays[] entry with n = 11, field body). Human 7, voice 6.5. Same text also in: /home/user/Livewell-/api/womanhood-doubt-devotional-articles.json (same slug).

Not found in the repository, not audited:

- `every-generation-was-sure-it-was`
- `the-monster-is-never-the-one-in-the`
- `blind-spots`
- `the-conservative-blind-spot`
- `the-progressive-blind-spot`
- `when-fear-becomes-theology`
- `when-patriotism-becomes-a-gospel`
- `how-christian-nationalism-rewrites`
- `when-the-church-married-empire`
- `how-the-bible-gets-translated-by`
- `how-american-individualism-distorts`
- `the-bible-assumes-you-will-be-wrong`

The live site serves these essays from the database. Fixing the repo copies does not change the live page unless the database row is updated too (admin or a reseed James approves).

## Scores for the library as found

- human_score: **5 / 10**
- voice_score: **5.5 / 10**

Two of the three pieces would be picked out as machine-drafted by a careful reader within the first screen. The argument underneath each is sound and is his: fair to the frightened, anchored in 1 Samuel 8 and Genesis 3, turned on the church before anyone else. The surface is the problem. Almost every paragraph closes on an epigram, the 'not X. It is Y.' turn is the default sentence, em-dashes join the clauses, and the editorial rules (verdict, indictment, honest, the search query) show through the prose.

## Most machine-sounding, most his

- Most machine-sounding: **when-fear-rewrites-theology** (repo copy). SEO phrases inside the essay, a bold slogan in most sections, an invented-sounding confession, an ending on a psychology callback, no path to help.
- Next: **strongman-theology**. Strong reading of 1 Samuel 8 buried under about twenty-five em-dashes, twelve antitheses and four three-beat anaphoras.
- Most his: **women-in-church-history**. No em-dashes, real dates, plain section headings by name and year, a closing that confesses and stops. Its faults are a not-X/Y habit, a few announced turns, no contractions, and three biographical statements nobody has confirmed.

## Patterns that repeat

### P1. Em-dash as the standard connector

Count: about 25 in strongman-theology, about 15 in when-fear-rewrites-theology, 0 in women-in-church-history, 3 in shelf.json blurbs.

- **S02** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "They wanted, above all, to be like everyone else — to have what the strong nations around them had, so they would stop feeling so exposed."
  - Replacement: "Above all they wanted to be like everyone else, to have what the strong nations around them had, so they'd stop feeling so exposed."
- **F06** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "Jonathan Haidt, in *The Righteous Mind* (2012), describes the rider and the elephant — the small rational rider"
  - Replacement: "Jonathan Haidt, in *The Righteous Mind*, describes the rider and the elephant: the small rational rider"
- **B01** `the-monster-is-never-the-one-in-the`, /home/user/Livewell-/client/src/lib/shelf.json (essays[] entry with this slug, field blurb)
  - Quote: "The mechanism that produces moral catastrophe is not cynicism or cruelty — it is self-deception."
  - Replacement: "The mechanism that produces moral catastrophe is not cynicism or cruelty. It is self-deception."

### P2. 'It is not X. It is Y.' as the default gait

Count: about 12 in strongman-theology, about 9 in when-fear-rewrites-theology, 6 in women-in-church-history.

- **S29** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "And here is the verdict I cannot soften, because the story does not soften it. The strongman is not the enemy of the frightened church. The strongman is the *answer to its prayer.* That is what makes this so much worse than a political mistake."
  - Replacement: "The story does not soften what comes next, so I won't either. The strongman is the *answer* to the frightened church's prayer, which makes this much worse than a political mistake."
- **F31** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "Look hard at the God you are most certain of when you are most afraid. That is not God. That is the elephant, explained."
  - Replacement: "Look hard at the God you are most certain of when you are most afraid, and ask whether he is the one who keeps saying, *Do not be afraid.*"
- **W03** `women-in-church-history`, /home/user/Livewell-/content/archive/free-library/essays-womanhood.json (essays[] n=11 body)
  - Quote: "That is not the sentence of a woman who has not seen suffering. That is the sentence of a woman who has seen a third of her world die"
  - Replacement: "That is the sentence of a woman who has seen a third of her world die"

### P3. Epigram at the end of the paragraph (the pillow line), often in bold

- **S28** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "Read the logic. The proof that his kingdom is not of this world is precisely that it does not fight the way this world fights. The absence of the chariots is the presence of the kingdom."
  - Replacement: "The proof that his kingdom is not of this world is that it does not fight the way this world fights."
- **F11** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "**A church that is afraid does not preach the kingdom. It preaches the bunker.** It draws the line tighter, names the enemy faster, mistakes its own anxiety for the holiness of God. The fortress feels like faithfulness. It is fear with a steeple."
  - Replacement: "A church that is afraid stops preaching the kingdom and starts preaching the bunker. It draws the line tighter, names the enemy faster, and mistakes its own anxiety for the holiness of God."
- **F24** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "It is faith dragging the fear into the light where it can finally be seen for what it is — a feeling and not a fact, a weather system and not the face of God. A church that cannot pray the frightened Psalms out loud will preach a frightened God by accident, every single time, because the fear it would not speak does not leave. It just changes pulpits."
  - Replacement: "It is faith dragging the fear into the light, where it can be seen as a feeling and not the face of God. A church that cannot pray the frightened Psalms out loud will preach a frightened God by accident, because the fear it would not speak does not leave."

### P4. Announced turns and imperative signposts

- **S12** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "Here is the engine under all of it, and it is not politics. It is fear, and fear has a way of rewriting your doctrine without telling you."
  - Replacement: "Underneath all of it is fear, more than politics, and fear has a way of rewriting your doctrine without telling you."
- **F04** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "Consider the machinery before you blame the soul."
  - Replacement: "Before you blame your soul, look at what fear does to a mind."
- **W05** `women-in-church-history`, /home/user/Livewell-/content/archive/free-library/essays-womanhood.json (essays[] n=11 body)
  - Quote: "She did something else, too, that deserves mention, because it shows a theological mind at work and not merely a devotional one. Julian meditated at length"
  - Replacement: "Julian also meditated at length"

### P5. Rulebook leakage: the editorial method written into the prose (verdict, indictment, honest, myself in the frame, the search query)

- **S29** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "And here is the verdict I cannot soften, because the story does not soften it. The strongman is not the enemy of the frightened church. The strongman is the *answer to its prayer.* That is what makes this so much worse than a political mistake."
  - Replacement: "The story does not soften what comes next, so I won't either. The strongman is the *answer* to the frightened church's prayer, which makes this much worse than a political mistake."
- **F01** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "and it is the question that drives people to the search bar at two in the morning — why am I afraid of God, why does the faith that was supposed to free me feel like a hand at my throat. The honest answer is that fear got into the foundations, and it did not knock."
  - Replacement: "and it is the question people ask at two in the morning: why am I afraid of God, and why does the faith that was supposed to free me feel like a hand at my throat? The answer is that fear got into the foundations."
- **W15** `women-in-church-history`, /home/user/Livewell-/content/archive/free-library/essays-womanhood.json (essays[] n=11 body)
  - Quote: "I have to answer that question with myself in the frame, because I have been one of the people passing the tradition down."
  - Replacement: "I have been one of the people passing the tradition down."

### P6. Three-beat anaphora

- **S03** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "It arrives as common sense. It arrives as safety. It arrives as the perfectly sane request of people who have looked at the threats around them and decided they can no longer afford to trust an invisible God to fight visible battles."
  - Replacement: "It arrives as common sense and as safety, the perfectly sane request of people who have looked at the threats around them and decided they can no longer afford to trust an invisible God to fight visible battles."
- **S33** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "We are telling ourselves it is responsibility. We are telling ourselves it is the only realistic option. We are telling ourselves that a frightened church reaching for a fist is just being prudent in a dangerous time."
  - Replacement: "We tell ourselves it's responsibility, the only realistic option, simple prudence in a dangerous time."
- **S06** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "Read the verb. *He will take.* Six times, *he will take.* The king is defined by extraction."
  - Replacement: "The verb is *he will take*, six times over. The king is defined by what he takes."

### P7. Scholar-parade formula 'X, in *Title* (YEAR), ...' and names as decoration

- **S09** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "Walter Brueggemann gave this whole dynamic a name that should be carved over the door of every church flirting with it. In *The Prophetic Imagination* (1978) he calls it the \"royal consciousness\" — the settled state of a people"
  - Replacement: "Walter Brueggemann gave this a name. In *The Prophetic Imagination* he calls it the \"royal consciousness,\" the settled state of a people"
- **F10** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "Charles Taylor, in *A Secular Age* (2007), describes the modern condition as the loss of a world we could take for granted — the buffered self standing alone"
  - Replacement: "Charles Taylor, in *A Secular Age*, describes the modern condition as the loss of a world we could take for granted: the buffered self standing alone"
- **W11** `women-in-church-history`, /home/user/Livewell-/content/archive/free-library/essays-womanhood.json (essays[] n=11 body)
  - Quote: "It is worth pausing on the pattern that runs through the whole century after her. The nineteenth-century revivals and the missionary and abolitionist movements they fueled were disproportionately driven by women, and the historians of American religion, Mark Noll and Nathan Hatch among them, have documented how"
  - Replacement: "The nineteenth-century revivals and the missionary and abolitionist movements they fueled were disproportionately driven by women, and historians of American religion have documented how"

### P8. Scripture set in italics as quotation but not verbatim, sometimes without a reference

- **S07** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "They hear the entire indictment — the conscription, the confiscation, the slavery — and they say: *No, but there shall be a king over us, that we also may be like all the nations, and that our king may go out before us and fight our battles* (1 Samuel 8:19–20)."
  - Replacement: "They hear all of it, the conscription, the confiscation, the slavery, and they say: *No! But there shall be a king over us, that we also may be like all the nations, and that our king may judge us and go out before us and fight our battles* (1 Samuel 8:19–20)."
- **F19** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "*I heard you in the garden, and I was afraid, so I hid.* God was not hunting him. God was walking in the cool of the day, calling his name, asking the only question fear cannot answer — *where are you*."
  - Replacement: "*I heard the sound of you in the garden, and I was afraid, because I was naked, and I hid myself* (Genesis 3:10). God was not hunting him. God was walking in the cool of the day, calling to him, asking the one question fear cannot answer: *Where are you?* (Genesis 3:9)."
- **F21** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "*Perfect love casts out fear, because fear has to do with punishment.* John writes it plainly in his first letter, and we read it as a greeting card, and we miss the surgery in it."
  - Replacement: "*There is no fear in love, but perfect love casts out fear. For fear has to do with punishment* (1 John 4:18). We read it like a greeting card and miss what John is doing."

### P9. First-person scenes and affiliations nobody has confirmed

- **F12** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "## I have preached the bunker"
  - Replacement: "## Fear in the pulpit"
- **W04** `women-in-church-history`, /home/user/Livewell-/content/archive/free-library/essays-womanhood.json (essays[] n=11 body)
  - Quote: "I did not learn her name in seminary. I learned it later, alone, and I was poorer for the delay."
  - Replacement: "I did not learn her name early. I learned it later, alone, and I was poorer for the delay."
- **W09** `women-in-church-history`, /home/user/Livewell-/content/archive/free-library/essays-womanhood.json (essays[] n=11 body)
  - Quote: "Closer to my own tradition, Phoebe Palmer lived from 1807 to 1874,"
  - Replacement: "Phoebe Palmer lived from 1807 to 1874,"

### P10. Literary or formula headings

- **S11** `strongman-theology`, /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md
  - Quote: "## Fear is the factory where false theology is made"
  - Replacement: "## How fear changes what a church believes"
- **F15** `when-fear-rewrites-theology`, /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md
  - Quote: "## The fear that heals and the fear that hides"
  - Replacement: "## Two kinds of fear"
- **W13** `women-in-church-history`, /home/user/Livewell-/content/archive/free-library/essays-womanhood.json (essays[] n=11 body)
  - Quote: "## Why the editing happened, named honestly"
  - Replacement: "## Why the names were dropped"

## The ten worst passages

1. **F11** `when-fear-rewrites-theology` (bold slogan; antithesis; two pillow closers in a row)
   - Quote: "**A church that is afraid does not preach the kingdom. It preaches the bunker.** It draws the line tighter, names the enemy faster, mistakes its own anxiety for the holiness of God. The fortress feels like faithfulness. It is fear with a steeple."
   - Replacement: "A church that is afraid stops preaching the kingdom and starts preaching the bunker. It draws the line tighter, names the enemy faster, and mistakes its own anxiety for the holiness of God."
   - Why: 'It is fear with a steeple' is the line most likely to make a careful reader say a machine wrote this.
2. **F01** `when-fear-rewrites-theology` (search-engine language in the prose; em-dash; 'honest' as self-certifying; personification closer)
   - Quote: "and it is the question that drives people to the search bar at two in the morning — why am I afraid of God, why does the faith that was supposed to free me feel like a hand at my throat. The honest answer is that fear got into the foundations, and it did not knock."
   - Replacement: "and it is the question people ask at two in the morning: why am I afraid of God, and why does the faith that was supposed to free me feel like a hand at my throat? The answer is that fear got into the foundations."
   - Why: The SEO brief is showing through the essay. No person writing to a frightened friend mentions the search bar.
3. **F31** `when-fear-rewrites-theology` (clever-kicker ending; antithesis; unsafe for a scrupulous reader)
   - Quote: "Look hard at the God you are most certain of when you are most afraid. That is not God. That is the elephant, explained."
   - Replacement: "Look hard at the God you are most certain of when you are most afraid, and ask whether he is the one who keeps saying, *Do not be afraid.*"
   - Why: The essay ends on a callback to a psychology metaphor instead of on Christ or Scripture, and 'That is not God' is a flat verdict on the faith of a frightened reader. The replacement uses only what the essay already established.
4. **S29** `strongman-theology` (rulebook leakage ('verdict'); announced turn; antithesis)
   - Quote: "And here is the verdict I cannot soften, because the story does not soften it. The strongman is not the enemy of the frightened church. The strongman is the *answer to its prayer.* That is what makes this so much worse than a political mistake."
   - Replacement: "The story does not soften what comes next, so I won't either. The strongman is the *answer* to the frightened church's prayer, which makes this much worse than a political mistake."
   - Why: 'Verdict' is the editorial rule written into the prose, and the paragraph holds three antitheses. Keep only 'The judgment was not the king. The judgment was getting the king.'
5. **S28** `strongman-theology` (imperative signpost; chiasmus closer)
   - Quote: "Read the logic. The proof that his kingdom is not of this world is precisely that it does not fight the way this world fights. The absence of the chariots is the presence of the kingdom."
   - Replacement: "The proof that his kingdom is not of this world is that it does not fight the way this world fights."
   - Why: 'The absence of X is the presence of Y' is the pillow line the brief names (chiasmus at a paragraph end).
6. **S08** `strongman-theology` (paragraph ends by restating itself as a bold slogan)
   - Quote: " **Fear hears \"he will fight your battles\" and never finishes the sentence that says \"and you shall be his slaves.\"**"
   - Replacement: (delete)
   - Why: The paragraph has already said 'Fear hears he will fight your battles and stops listening' and 'The promise of a fighter drowns out the warning of a tyrant'. The bold line says it a third time for the screenshot.
7. **F26** `when-fear-rewrites-theology` (em-dash; joke epigram in a crisis-facing passage)
   - Quote: "refusing to let it keep its disguise as discernment — refusing to dignify the three-in-the-morning dread with the word *wisdom* when it is only adrenaline with a theology degree."
   - Replacement: "refusing to let it keep its disguise as discernment, refusing to call the three-in-the-morning dread *wisdom*."
   - Why: 'Adrenaline with a theology degree' is a quip aimed at a reader who may be in real distress.
8. **S18** `strongman-theology` (imperative signpost; double antithesis; em-dash pair)
   - Quote: "Read what the third temptation actually is. It is not a temptation to sin in some petty way. It is the offer of real power for a real purpose — all the kingdoms, all the power to set the world right — at the price of one act of worship. The devil does not tempt Jesus with weakness. He tempts him with *effectiveness.*"
   - Replacement: "The third temptation is no petty sin. It is the offer of real power for a real purpose, all the kingdoms and all the power to set the world right, at the price of one act of worship. The devil tempts Jesus with *effectiveness.*"
   - Why: Four machine habits in five sentences.
9. **F16** `when-fear-rewrites-theology` (statistic that cannot be verified; overclaim)
   - Quote: "The most repeated command in the book is aimed straight at it.\n\nThree hundred times, give or take, the line returns."
   - Replacement: "One of the most repeated commands in the book is aimed straight at it.\n\nAgain and again the line returns."
   - Why: The '300 (or 365) fear nots' figure is a pulpit commonplace that does not survive a count. A skeptic who checks it stops trusting everything around it.
10. **W15** `women-in-church-history` (rulebook leakage (announced self-implication))
   - Quote: "I have to answer that question with myself in the frame, because I have been one of the people passing the tradition down."
   - Replacement: "I have been one of the people passing the tradition down."
   - Why: 'With myself in the frame' is the instruction to self-implicate, written into the essay.

## For James

- Only 3 of the 15 live database essays have their text in the repository, so only 3 were audited. Not audited: every-generation-was-sure-it-was, the-monster-is-never-the-one-in-the, blind-spots, the-conservative-blind-spot, the-progressive-blind-spot, when-fear-becomes-theology, when-patriotism-becomes-a-gospel, how-christian-nationalism-rewrites, when-the-church-married-empire, how-the-bible-gets-translated-by, how-american-individualism-distorts, the-bible-assumes-you-will-be-wrong. These are your own Substack chapters; they need a pass that can read the live site.
- when-fear-rewrites-theology: the copy in the repo is titled 'When Fear Starts Rewriting What You Believe' and is a doubt-track piece about anxiety. The shelf lists the slug as your Substack chapter 'When Fear Rewrites Theology' in the politics section. These look like two different essays sharing one slug. Which one is live, and which one do you want?
- when-fear-rewrites-theology, section 'I have preached the bunker': did this happen? ('There were seasons when I read the headlines before I read the Psalms ... I taught a frightened God to a frightened room.') If yes, it is the most human paragraph in the piece and should stay, ideally with one real detail only you can supply. If no, the section has to be cut or rewritten in 'we'.
- women-in-church-history: three things only you can confirm. Did you attend seminary ('I did not learn her name in seminary')? Is Methodism or the Holiness movement 'your own tradition', and does it 'flow down into the church I now pastor'? Did you hand out reading lists and teach history courses that left these women out?
- strongman-theology: 'I have sat across from the fear.' True as pastoral experience? It is kept in the replacement; say so if it should go.
- strongman-theology cites Niebuhr's Moral Man and Immoral Society (1932) for 'anxiety is the raw material of idolatry'. The group-selfishness argument is in that book; anxiety as the occasion of sin is from The Nature and Destiny of Man. Please confirm or let the sentence be reworded to claim only the first.
- strongman-theology criticizes only the right. That is its subject, and it grants the fear is real, but on its own it fires in one direction. The shelf answers this with the-progressive-blind-spot; consider one link to it from this essay.
- women-in-church-history quotes Perpetua ('Neither can I call myself anything other than what I am, a Christian') and Julian in quotation marks. Translations differ; name the translation you used or mark the Perpetua line as paraphrase.
- Your saved Substack profile and docs/VOICE-JAMES-BELL.md disagree, and VOICE-JAMES-BELL.md was followed. The profile asks for 2-4 sentence paragraphs, a 'memorable line the reader screenshots' in every piece, 'stacked landing lines', three numbered applications and a required both-sides structure. The voice standard asks for developed paragraphs, one earned verdict, no slogans and no forced symmetry. Most of the tells found here (bold screenshot lines, epigram closers, stacked fragments) are what the profile asks for. The profile also mentions paid content and subscriptions, which conflicts with your decision that there is no membership fee.
- The live pages come from the database. A fix to the repo files does not reach readers until the database rows are updated.

## Every finding

Quotes and replacements are JSON-escaped strings (\n is a line break, \" is a quotation mark) so they can be applied exactly. In the Markdown drafts, *asterisks* are the file's own italics. An empty replacement means delete the quoted words. The same change must be made in each mirror listed above.


### /home/user/Livewell-/content/drafts/capture-right/strongman-theology.md

**S01** [should] `strongman-theology`. announced turn
- Quote: "The elders did not ask for a tyrant. That is the part everyone misses."
- Replacement: "The elders did not ask for a tyrant."
- Why: The second sentence tells the reader the point is coming. He would just make the point.

**S02** [must] `strongman-theology`. em-dash
- Quote: "They wanted, above all, to be like everyone else — to have what the strong nations around them had, so they would stop feeling so exposed."
- Replacement: "Above all they wanted to be like everyone else, to have what the strong nations around them had, so they'd stop feeling so exposed."
- Why: Em-dash as the clause connector; the essay has about twenty-five.

**S03** [should] `strongman-theology`. anaphora run past its work
- Quote: "It arrives as common sense. It arrives as safety. It arrives as the perfectly sane request of people who have looked at the threats around them and decided they can no longer afford to trust an invisible God to fight visible battles."
- Replacement: "It arrives as common sense and as safety, the perfectly sane request of people who have looked at the threats around them and decided they can no longer afford to trust an invisible God to fight visible battles."
- Why: Three 'It arrives as' in a row straight after 'never arrives announced' is a drumbeat, and the same device returns four more times in the essay.

**S04** [must] `strongman-theology`. Scripture not verbatim
- Quote: "*You are old, and your sons do not walk in your ways. Now appoint for us a king to judge us like all the nations* (1 Samuel 8:5)."
- Replacement: "*Behold, you are old and your sons do not walk in your ways. Now appoint for us a king to judge us like all the nations* (1 Samuel 8:5)."
- Why: Site rule is ESV verbatim. Applier: check against the repo's Bible text before landing.

**S05** [must] `strongman-theology`. Scripture condensed but set as quotation
- Quote: "*He will take your sons and appoint them to his chariots. He will take your daughters. He will take the best of your fields and your vineyards and give them to his servants. He will take a tenth of your grain and your flocks. And you shall be his slaves. In that day you will cry out because of your king whom you have chosen, but the Lord will not answer you in that day* (1 Samuel 8:11–18)."
- Replacement: "He will take your sons and appoint them to his chariots. He will take your daughters. He will take the best of your fields and vineyards and give them to his servants. He will take a tenth of your grain and your flocks, and you shall be his slaves (1 Samuel 8:11–17). *And in that day you will cry out because of your king, whom you have chosen for yourselves, but the LORD will not answer you in that day* (1 Samuel 8:18)."
- Why: Eight verses are compressed into one italic block that reads as a quotation. Paraphrase is offered as paraphrase; the verse that is quoted is quoted whole. Applier: check verse 18 against the ESV.

**S06** [should] `strongman-theology`. imperative signpost; literary word for a plain one
- Quote: "Read the verb. *He will take.* Six times, *he will take.* The king is defined by extraction."
- Replacement: "The verb is *he will take*, six times over. The king is defined by what he takes."
- Why: 'Read the verb', 'Read what the third temptation actually is', 'Read the logic' form a stamped motif. 'Extraction' is an essay word where he would say 'what he takes'.

**S07** [must] `strongman-theology`. rulebook leakage; em-dash; Scripture not verbatim
- Quote: "They hear the entire indictment — the conscription, the confiscation, the slavery — and they say: *No, but there shall be a king over us, that we also may be like all the nations, and that our king may go out before us and fight our battles* (1 Samuel 8:19–20)."
- Replacement: "They hear all of it, the conscription, the confiscation, the slavery, and they say: *No! But there shall be a king over us, that we also may be like all the nations, and that our king may judge us and go out before us and fight our battles* (1 Samuel 8:19–20)."
- Why: 'Indictment' is the brief's own vocabulary leaking into the prose. The verse drops 'may judge us and' and changes the ESV's 'No!'. The exclamation is allowed here because it is inside quoted Scripture.

**S08** [must] `strongman-theology`. paragraph ends by restating itself as a bold slogan
- Quote: " **Fear hears \"he will fight your battles\" and never finishes the sentence that says \"and you shall be his slaves.\"**"
- Replacement: (delete)
- Why: The paragraph has already said 'Fear hears he will fight your battles and stops listening' and 'The promise of a fighter drowns out the warning of a tyrant'. The bold line says it a third time for the screenshot.

**S09** [should] `strongman-theology`. hype; scholar-parade formula; em-dash
- Quote: "Walter Brueggemann gave this whole dynamic a name that should be carved over the door of every church flirting with it. In *The Prophetic Imagination* (1978) he calls it the \"royal consciousness\" — the settled state of a people"
- Replacement: "Walter Brueggemann gave this a name. In *The Prophetic Imagination* he calls it the \"royal consciousness,\" the settled state of a people"
- Why: 'Carved over the door of every church' is manufactured intensity. 'In *Title* (YEAR) he ...' appears four times across the two political/doubt essays in the same shape.

**S10** [should] `strongman-theology`. em-dash pair; literary image
- Quote: "And the prophet — Samuel here, Amos later, Jesus finally — exists to break the spell and remind the people that they chose this, that the throne they begged for is the throne that is eating them."
- Replacement: "And the prophet (Samuel here, Amos later, Jesus finally) exists to remind the people that they chose this, and that the throne they begged for is the one now taking from them."
- Why: Em-dash pair, plus 'break the spell' and 'eating them' where the chapter's own verb, take, is plainer and stronger.

**S11** [should] `strongman-theology`. literary heading
- Quote: "## Fear is the factory where false theology is made"
- Replacement: "## How fear changes what a church believes"
- Why: Headings are plain and descriptive; this one is an epigram.

**S12** [must] `strongman-theology`. announced turn plus antithesis
- Quote: "Here is the engine under all of it, and it is not politics. It is fear, and fear has a way of rewriting your doctrine without telling you."
- Replacement: "Underneath all of it is fear, more than politics, and fear has a way of rewriting your doctrine without telling you."
- Why: 'Here is the ...' is a stock AI turn, joined to an 'it is not X. It is Y.'

**S13** [must] `strongman-theology`. em-dash pair
- Quote: "he argued that human groups — nations, tribes, churches as voting blocs — are far more selfish"
- Replacement: "he argued that human groups (nations, tribes, churches as voting blocs) are far more selfish"
- Why: Em-dash.

**S14** [must] `strongman-theology`. em-dash; attribution to check
- Quote: "Niebuhr's warning was that anxiety is the raw material of idolatry — that the most dangerous thing about a frightened people is not what it fears but what it will worship to feel safe."
- Replacement: "Niebuhr's warning was that anxiety is the raw material of idolatry, and that the most dangerous thing about a frightened people is what it will worship to feel safe."
- Why: Em-dash and another not-X-but-Y. Also see for_james: anxiety as the ground of sin is Niebuhr's argument in The Nature and Destiny of Man, not in Moral Man and Immoral Society.

**S15** [should] `strongman-theology`. self-certifying fairness (rulebook leakage)
- Quote: "This is the part I refuse to wave away, because the people reaching for the strongman are not fools."
- Replacement: "The people reaching for the strongman are not fools."
- Why: He does the fair thing; he doesn't announce that he is doing it.

**S16** [consider] `strongman-theology`. epigram closer
- Quote: "They are not imagining the threat. The threat has a return address."
- Replacement: "They are not imagining the threat."
- Why: A clever tag on a sentence that had already landed.

**S17** [should] `strongman-theology`. stacked antithesis; second bold slogan
- Quote: "he is not speaking to nothing. He is speaking to a real wound, and that is precisely why the temptation is so strong. **The strongman never wins by lying about the danger. He wins by telling the truth about the danger and then offering himself as the only salvation from it.**"
- Replacement: "he is speaking to a real wound, and that is why the temptation is so strong. The strongman doesn't have to lie about the danger. He tells the truth about it and then offers himself as the only salvation from it."
- Why: Two 'not X. Y.' pairs back to back, the second in bold. One verdict line per essay is in bold already (paragraph two).

**S18** [must] `strongman-theology`. imperative signpost; double antithesis; em-dash pair
- Quote: "Read what the third temptation actually is. It is not a temptation to sin in some petty way. It is the offer of real power for a real purpose — all the kingdoms, all the power to set the world right — at the price of one act of worship. The devil does not tempt Jesus with weakness. He tempts him with *effectiveness.*"
- Replacement: "The third temptation is no petty sin. It is the offer of real power for a real purpose, all the kingdoms and all the power to set the world right, at the price of one act of worship. The devil tempts Jesus with *effectiveness.*"
- Why: Four machine habits in five sentences.

**S19** [must] `strongman-theology`. em-dash
- Quote: "says no — because the whole gospel hangs on the refusal to be that kind of king."
- Replacement: "says no, because the whole gospel hangs on his refusal to be that kind of king."
- Why: Em-dash.

**S20** [should] `strongman-theology`. overclaim; literary flourish
- Quote: "We are not the first church to face this, and the last church that faced it left us a warning written in its own ruin."
- Replacement: "We are not the first church to face this. The German church faced it in 1933 and left us a warning."
- Why: 'The last church that faced it' is not true as history, and 'written in its own ruin' is ornament.

**S21** [must] `strongman-theology`. em-dashes
- Quote: "on what the German word *Führer* — leader — actually means,"
- Replacement: "on what the German word *Führer*, leader, actually means,"
- Why: Em-dash pair.

**S22** [must] `strongman-theology`. em-dash
- Quote: "will inevitably become a *Verführer* — a misleader, a seducer."
- Replacement: "will inevitably become a *Verführer*, a misleader, a seducer."
- Why: Em-dash.

**S23** [consider] `strongman-theology`. ornate closer
- Quote: "He had named, in the first week, the thing that would take a nation a decade and a continent of graves to confirm."
- Replacement: "He had named in the first week what the next decade would confirm."
- Why: 'A continent of graves' is written for effect. The plain version carries more grief.

**S24** [should] `strongman-theology`. antithesis as habit; em-dash
- Quote: "The danger is not only the strongman. The danger is the people who *want* one — the frightened crowd whose hunger to be saved by a man creates the very vacuum the man rushes to fill."
- Replacement: "The danger is also the people who *want* a strongman, the frightened crowd whose hunger to be saved by a man creates the very vacuum the man rushes to fill."
- Why: The same paragraph also has 'Germany did not fall because ... Germany fell because ...'. Keep that one; it is the hinge.

**S25** [should] `strongman-theology`. stamp ('the record'); self-certifying fairness
- Quote: "I have sat across from the fear. I know it is not stupid, and I will not insult the people who carry it by pretending it is. But I have also read what the fear built, both in Ramah and in Berlin, and the record is not ambiguous."
- Replacement: "I have sat across from this fear, and it isn't stupid. But I have also read what the fear built, both in Ramah and in Berlin."
- Why: 'The record is not ambiguous' is the stamp the brief lists ('the record', 'the verdict is not close'), and 'I will not insult ...' announces his own fairness.

**S26** [should] `strongman-theology`. antithesis as habit
- Quote: "The answer is the hardest one, because it is not a strategy. It is a different object of trust."
- Replacement: "The answer is hard because it comes down to whom we trust, and no strategy can stand in for that."
- Why: Another 'it is not X. It is Y.', and 'object of trust' is seminar language.

**S27** [should] `strongman-theology`. tidy triplet; em-dash; not-X-but-Y
- Quote: "when your God seems too slow, too invisible, too unwilling to fight your battles on your timeline. And Isaiah calls running to Egypt what it is — not strategy, but a failure of faith dressed as prudence."
- Replacement: "when your God seems too slow and too invisible to fight your battles on your timeline. And Isaiah calls running to Egypt a failure of faith dressed as prudence."
- Why: The third item is padding (too unwilling repeats too slow), and the close is the antithesis again.

**S28** [must] `strongman-theology`. imperative signpost; chiasmus closer
- Quote: "Read the logic. The proof that his kingdom is not of this world is precisely that it does not fight the way this world fights. The absence of the chariots is the presence of the kingdom."
- Replacement: "The proof that his kingdom is not of this world is that it does not fight the way this world fights."
- Why: 'The absence of X is the presence of Y' is the pillow line the brief names (chiasmus at a paragraph end).

**S29** [must] `strongman-theology`. rulebook leakage ('verdict'); announced turn; antithesis
- Quote: "And here is the verdict I cannot soften, because the story does not soften it. The strongman is not the enemy of the frightened church. The strongman is the *answer to its prayer.* That is what makes this so much worse than a political mistake."
- Replacement: "The story does not soften what comes next, so I won't either. The strongman is the *answer* to the frightened church's prayer, which makes this much worse than a political mistake."
- Why: 'Verdict' is the editorial rule written into the prose, and the paragraph holds three antitheses. Keep only 'The judgment was not the king. The judgment was getting the king.'

**S30** [must] `strongman-theology`. third antithesis in one paragraph
- Quote: "And the deepest tragedy of 1 Samuel 8 is not that the people wanted a tyrant. It is that they wanted a protector so badly"
- Replacement: "And the deepest tragedy of 1 Samuel 8 is that they wanted a protector so badly"
- Why: The essay's first line already said they did not ask for a tyrant.

**S31** [should] `strongman-theology`. announced self-implication
- Quote: "I do not get to stand outside this, because the church I belong to is the church praying the prayer."
- Replacement: "The church I belong to is the church praying this prayer."
- Why: He implicates himself by doing it, not by announcing it.

**S32** [should] `strongman-theology`. em-dash; motif stamped twice
- Quote: "fight our battles — who will take, if he must, our integrity, our witness, our credibility with the very people we were sent to reach, so long as he wins. We have read the warning and we are paying the cost anyway, because fear does not do arithmetic."
- Replacement: "fight our battles, who will take, if he must, our integrity, our witness, our credibility with the very people we were sent to reach, so long as he wins. We have read the warning and we are paying the cost anyway."
- Why: 'Fear does not do arithmetic' was good once, in section one. Repeated word for word it becomes a refrain.

**S33** [should] `strongman-theology`. anaphora run past its work
- Quote: "We are telling ourselves it is responsibility. We are telling ourselves it is the only realistic option. We are telling ourselves that a frightened church reaching for a fist is just being prudent in a dangerous time."
- Replacement: "We tell ourselves it's responsibility, the only realistic option, simple prudence in a dangerous time."
- Why: Third three-beat anaphora in the essay ('It arrives as', 'They have watched', 'They thought').

**S34** [must] `strongman-theology`. em-dash
- Quote: "refusing to the last the kingdoms a strongman would have seized — and he won the only war that was ever actually at stake."
- Replacement: "refusing to the last the kingdoms a strongman would have seized, and he won the only war that was ever actually at stake."
- Why: Em-dash.

**S35** [must] `strongman-theology`. em-dash pair in the public blurb
- Quote: "A frightened church always asks for a king. Israel did it first — give us a king like the other nations — and a prophet told them exactly what fear would cost them. We are praying the same prayer."
- Replacement: "A frightened church asks for a king. Israel did it first, asking for a king like the other nations, and a prophet told them what fear would cost them. We are praying the same prayer."
- Why: This line shows under the title on /writing. It is the first thing a reader sees. Also in: /home/user/Livewell-/client/src/lib/shelf.json (essays[] entry with slug strongman-theology, field blurb).

**S36** [must] `strongman-theology`. remaining em-dashes
- Quote: "the Lord — Samuel was not bluffing — does not always answer in that day."
- Replacement: "the Lord (Samuel was not bluffing) does not always answer in that day."
- Why: Every remaining U+2014 in this file takes the same treatment: comma, parentheses, colon or a period. Lines 14, 22, 26, 32, 36, 42, 44, 46, 52, 54, 62, 64 of the file each hold at least one.


### /home/user/Livewell-/content/drafts/faith-crisis/when-fear-rewrites-theology.md

**F01** [must] `when-fear-rewrites-theology`. search-engine language in the prose; em-dash; 'honest' as self-certifying; personification closer
- Quote: "and it is the question that drives people to the search bar at two in the morning — why am I afraid of God, why does the faith that was supposed to free me feel like a hand at my throat. The honest answer is that fear got into the foundations, and it did not knock."
- Replacement: "and it is the question people ask at two in the morning: why am I afraid of God, and why does the faith that was supposed to free me feel like a hand at my throat? The answer is that fear got into the foundations."
- Why: The SEO brief is showing through the essay. No person writing to a frightened friend mentions the search bar.

**F02** [must] `when-fear-rewrites-theology`. search-engine language in the prose
- Quote: "And you can watch the same thing happen at the scale of a whole culture, which is why the search query keeps changing form but never disappears."
- Replacement: "And you can watch the same thing happen at the scale of a whole culture."
- Why: Same leak as F01.

**F03** [must] `when-fear-rewrites-theology`. search-engine language; 'honest'
- Quote: "But fear has a counterfeit even here, and this is where the search for honest answers gets hard."
- Replacement: "But fear has a counterfeit even here."
- Why: Third appearance of the search motif; 'honest' is used four times as a self-certifying adjective in this piece.

**F04** [should] `when-fear-rewrites-theology`. banned stamp 'Consider ...'; one-line signpost paragraph
- Quote: "Consider the machinery before you blame the soul."
- Replacement: "Before you blame your soul, look at what fear does to a mind."
- Why: 'Consider ...' is on the brief's stamp list, and the line is an epigram doing a signpost's job.

**F05** [should] `when-fear-rewrites-theology`. pop neuroscience stated as fact; literary image
- Quote: "Fear narrows. That is its whole job. The amygdala does not write essays; it sounds an alarm and shuts down the slow rooms of the brain where reflection lives, the rooms where you weigh, qualify, hold two things at once."
- Replacement: "Fear narrows. It sounds an alarm and crowds out the slower thinking where you weigh, qualify, and hold two things at once."
- Why: A brain-anatomy claim with no source in a piece read by anxious people, and 'the slow rooms of the brain' is the fresh literary image the brief warns against.

**F06** [must] `when-fear-rewrites-theology`. em-dash; scholar-parade formula
- Quote: "Jonathan Haidt, in *The Righteous Mind* (2012), describes the rider and the elephant — the small rational rider"
- Replacement: "Jonathan Haidt, in *The Righteous Mind*, describes the rider and the elephant: the small rational rider"
- Why: Em-dash; the year does no work.

**F07** [should] `when-fear-rewrites-theology`. aphoristic paragraph closer
- Quote: "The theology is real. It just isn't reasoned. It is the alarm, given vocabulary."
- Replacement: "The theology is real. It just isn't reasoned."
- Why: Nearly every paragraph in this essay ends on an epigram. See pattern P3.

**F08** [should] `when-fear-rewrites-theology`. fragment stack; aphoristic closer
- Quote: "Not through study. Through dread."
- Replacement: "They get there through dread, not study."
- Why: Fragment stack.

**F09** [should] `when-fear-rewrites-theology`. aphoristic closer
- Quote: "Neither of them argued their way there. They were carried there by a feeling that learned to talk."
- Replacement: "Neither of them argued their way there."
- Why: 'A feeling that learned to talk' and, later, 'panic that learned to stand up straight' are the same manufactured line.

**F10** [must] `when-fear-rewrites-theology`. em-dash; scholar-parade formula
- Quote: "Charles Taylor, in *A Secular Age* (2007), describes the modern condition as the loss of a world we could take for granted — the buffered self standing alone"
- Replacement: "Charles Taylor, in *A Secular Age*, describes the modern condition as the loss of a world we could take for granted: the buffered self standing alone"
- Why: Em-dash; third 'X, in *Title* (YEAR), describes' in the piece.

**F11** [must] `when-fear-rewrites-theology`. bold slogan; antithesis; two pillow closers in a row
- Quote: "**A church that is afraid does not preach the kingdom. It preaches the bunker.** It draws the line tighter, names the enemy faster, mistakes its own anxiety for the holiness of God. The fortress feels like faithfulness. It is fear with a steeple."
- Replacement: "A church that is afraid stops preaching the kingdom and starts preaching the bunker. It draws the line tighter, names the enemy faster, and mistakes its own anxiety for the holiness of God."
- Why: 'It is fear with a steeple' is the line most likely to make a careful reader say a machine wrote this.

**F12** [must] `when-fear-rewrites-theology`. biography beyond the confirmed facts
- Quote: "## I have preached the bunker"
- Replacement: "## Fear in the pulpit"
- Why: The heading and the paragraph under it ('There were seasons when I read the headlines before I read the Psalms ... I taught a frightened God to a frightened room') are a first-person confession nobody has confirmed. If James says it happened, keep the paragraph. If not, it must go. See for_james.

**F13** [should] `when-fear-rewrites-theology`. announced precision
- Quote: "I want to be precise about this, because it is easy to write these sentences as though the failure belongs to other pastors, the loud ones, the ones on television. It does not."
- Replacement: "It would be easy to write this as though the failure belongs to other pastors, the loud ones, the ones on television. It doesn't."
- Why: The prose is describing its own method.

**F14** [should] `when-fear-rewrites-theology`. epigram signpost; em-dash pair; tidy triplet
- Quote: "This is the trap inside the trap. The frightened God is useful. He gives you something to do with the dread. He turns the formless three-in-the-morning terror into a project — a doctrine to guard, a boundary to police, an enemy to name — and the project is so absorbing that you never notice you have stopped worshiping and started bracing."
- Replacement: "The frightened God is useful. He gives you something to do with the dread. He turns the formless three-in-the-morning terror into a project, a doctrine to guard or an enemy to name, and the project is so absorbing that you never notice you've stopped worshiping and started bracing."
- Why: The same three items were listed two sentences earlier ('what to defend and whom to suspect').

**F15** [should] `when-fear-rewrites-theology`. balanced-antithesis heading
- Quote: "## The fear that heals and the fear that hides"
- Replacement: "## Two kinds of fear"
- Why: Alliterative, symmetrical heading.

**F16** [must] `when-fear-rewrites-theology`. statistic that cannot be verified; overclaim
- Quote: "The most repeated command in the book is aimed straight at it.\n\nThree hundred times, give or take, the line returns."
- Replacement: "One of the most repeated commands in the book is aimed straight at it.\n\nAgain and again the line returns."
- Why: The '300 (or 365) fear nots' figure is a pulpit commonplace that does not survive a count. A skeptic who checks it stops trusting everything around it.

**F17** [must] `when-fear-rewrites-theology`. overclaim; aphoristic clause
- Quote: "If you wanted the one sentence God says more than any other to human beings, that is the sentence, and the frequency is the revelation."
- Replacement: "If you wanted one sentence God keeps saying to human beings, that is the sentence."
- Why: Follows from F16; 'the frequency is the revelation' is a slogan.

**F18** [should] `when-fear-rewrites-theology`. vague intensifier
- Quote: "You can test your theology against this, and the test is brutally simple."
- Replacement: "You can test your theology against this."
- Why: 'Brutally simple' is intensity with nothing behind it.

**F19** [must] `when-fear-rewrites-theology`. Scripture not verbatim and without reference
- Quote: "*I heard you in the garden, and I was afraid, so I hid.* God was not hunting him. God was walking in the cool of the day, calling his name, asking the only question fear cannot answer — *where are you*."
- Replacement: "*I heard the sound of you in the garden, and I was afraid, because I was naked, and I hid myself* (Genesis 3:10). God was not hunting him. God was walking in the cool of the day, calling to him, asking the one question fear cannot answer: *Where are you?* (Genesis 3:9)."
- Why: Italic lines read as quotation; site rule is ESV verbatim with the reference. The text says God called to the man; it does not say he called his name. Applier: check both verses against the ESV.

**F20** [should] `when-fear-rewrites-theology`. aphoristic closer; literary image
- Quote: "The hiding was the theology. Adam met grace and read it as a manhunt, because fear had gotten there first and recolored the whole face of God."
- Replacement: "Adam met grace and read it as a manhunt, because fear had gotten there first."
- Why: 'The hiding was the theology' and, two paragraphs on, 'The bracing is the theology' are one stamped formula.

**F21** [must] `when-fear-rewrites-theology`. Scripture not verbatim and without reference; literary image
- Quote: "*Perfect love casts out fear, because fear has to do with punishment.* John writes it plainly in his first letter, and we read it as a greeting card, and we miss the surgery in it."
- Replacement: "*There is no fear in love, but perfect love casts out fear. For fear has to do with punishment* (1 John 4:18). We read it like a greeting card and miss what John is doing."
- Why: ESV verbatim with the reference; 'the surgery in it' is ornament.

**F22** [should] `when-fear-rewrites-theology`. antithesis; literary image; bold slogan; stamped formula
- Quote: "John is not being sentimental; he is naming a mechanism. Fear is what runs the soul that expects to be punished, and a soul that expects punishment will build a punishing God to match, because the architecture of the inner life always projects itself onto the ceiling. We do not see God as he is. **We see God as we are braced for him to be.** And the bracing is the theology. The bracing is what we defend on Sunday,"
- Replacement: "John is naming a mechanism. Fear is what runs the soul that expects to be punished, and a soul that expects punishment will build a punishing God to match. We see God as we are braced for him to be, and the bracing is what we defend on Sunday,"
- Why: Keep 'We see God as we are braced for him to be' as the essay's one earned line, without the bold and without the scaffolding around it.

**F23** [should] `when-fear-rewrites-theology`. secondhand attribution; chiasmus; em-dash
- Quote: "Walter Brueggemann spent a career insisting that the Psalms refuse to lie about fear, and that the refusal is the recovery. In *The Message of the Psalms* (1984) he traced the movement from orientation through disorientation to a new orientation, and he warned against the thing the frightened church does instinctively — skipping the middle."
- Replacement: "Walter Brueggemann, in *The Message of the Psalms*, traced the movement from orientation through disorientation to a new orientation. The frightened church instinctively skips the middle."
- Why: 'Spent a career insisting' and 'he warned against' put words in his mouth. Keep what the book actually does and let the application be James's own.

**F24** [must] `when-fear-rewrites-theology`. em-dash; symmetrical pair; pillow closer
- Quote: "It is faith dragging the fear into the light where it can finally be seen for what it is — a feeling and not a fact, a weather system and not the face of God. A church that cannot pray the frightened Psalms out loud will preach a frightened God by accident, every single time, because the fear it would not speak does not leave. It just changes pulpits."
- Replacement: "It is faith dragging the fear into the light, where it can be seen as a feeling and not the face of God. A church that cannot pray the frightened Psalms out loud will preach a frightened God by accident, because the fear it would not speak does not leave."
- Why: 'It just changes pulpits' is a kicker; 'every single time' is filler intensity.

**F25** [should] `when-fear-rewrites-theology`. fragment stack; stacked epigrams
- Quote: "So how does it get undone. Not by trying harder to be brave. Bravery is another thing fear can fake; a clenched jaw is not a quiet heart, and white-knuckled certainty is just panic that learned to stand up straight."
- Replacement: "So how does it get undone? Trying harder to be brave won't do it. Bravery is another thing fear can fake, and a clenched jaw is not a quiet heart."
- Why: Three epigrams where one would do.

**F26** [must] `when-fear-rewrites-theology`. em-dash; joke epigram in a crisis-facing passage
- Quote: "refusing to let it keep its disguise as discernment — refusing to dignify the three-in-the-morning dread with the word *wisdom* when it is only adrenaline with a theology degree."
- Replacement: "refusing to let it keep its disguise as discernment, refusing to call the three-in-the-morning dread *wisdom*."
- Why: 'Adrenaline with a theology degree' is a quip aimed at a reader who may be in real distress.

**F27** [must] `when-fear-rewrites-theology`. crisis-facing passage with no path to help
- Quote: "because you will be the last to see it; the rewriting is invisible from inside the rewritten mind."
- Replacement: "because you will be the last to see it; the rewriting is invisible from inside the rewritten mind. If the dread has become more than you can carry, tell a pastor, a doctor or a counselor, and start with [Find Help](/help). In the US you can call or text 988, the Suicide and Crisis Lifeline, at any hour."
- Why: The piece names three-in-the-morning terror, a hand at the throat and scrupulosity (in its keywords) and never points to help. The brief requires the link. This is the one addition recommended; nothing else in this audit adds content.

**F28** [must] `when-fear-rewrites-theology`. em-dash pair
- Quote: "It still comes — Jesus sweat blood in a garden, so do not tell me the goal is never to feel it — but it no longer writes the doctrine."
- Replacement: "It still comes. Jesus sweat blood in a garden, so the goal can't be never to feel it. But it no longer writes the doctrine."
- Why: Em-dash pair.

**F29** [should] `when-fear-rewrites-theology`. 'honest' as self-certifying adjective; fragment antithesis; epigram
- Quote: "Not a performance of certainty, which is only fear in costume. A confession that the dread has gotten into the foundations,"
- Replacement: "It is a confession that the dread has gotten into the foundations,"
- Why: 'Fear in costume' is the fifth version of the same disguise image (clothes of conviction, dress itself as discernment, disguise as discernment, fear with a steeple).

**F30** [should] `when-fear-rewrites-theology`. 'honest' as self-certifying adjective
- Quote: "The honest prayer in all of this is old and short."
- Replacement: "The prayer for all of this is old and short."
- Why: Fourth 'honest'.

**F31** [must] `when-fear-rewrites-theology`. clever-kicker ending; antithesis; unsafe for a scrupulous reader
- Quote: "Look hard at the God you are most certain of when you are most afraid. That is not God. That is the elephant, explained."
- Replacement: "Look hard at the God you are most certain of when you are most afraid, and ask whether he is the one who keeps saying, *Do not be afraid.*"
- Why: The essay ends on a callback to a psychology metaphor instead of on Christ or Scripture, and 'That is not God' is a flat verdict on the faith of a frightened reader. The replacement uses only what the essay already established.

**F32** [should] `when-fear-rewrites-theology`. biography used as a credential; literary phrasing
- Quote: "I came to faith out of atheism, which means I know what it is to build a god out of nothing and call it nature, to assemble a universe with no one home in it and learn to live in the cold of that."
- Replacement: "I came to faith out of atheism, so I know what it is to live in a universe with no one home in it."
- Why: The fact is confirmed, but 'which means I know' turns it into a credential, and the rest is decoration added to it.

**F33** [must] `when-fear-rewrites-theology`. remaining em-dashes
- Quote: "It is felt and named and brought into the light, and the God on the other side of it is not the elephant's god but the real one,"
- Replacement: "It is felt and named and brought into the light, and the God on the other side of it is the real one,"
- Why: Antithesis again; and every remaining U+2014 in this file (lines 18, 24, 28, 34, 52, 58, 60 hold them) takes a comma, colon, parentheses or a period.


### /home/user/Livewell-/content/archive/free-library/essays-womanhood.json

**W01** [should] `women-in-church-history`, essays[] n=11 body. announced turn; near therapy-speak
- Quote: "I want to sit with one detail, because it undoes a lazy assumption."
- Replacement: "One detail undoes a lazy assumption."
- Why: Signpost.

**W02** [should] `women-in-church-history`, essays[] n=11 body. not-X-but-Y as habit
- Quote: "and she wrote not sentimental comfort but hard-won hope."
- Replacement: "and what she wrote was hard-won hope."
- Why: This essay uses the not-X/Y turn six times; three sit in the Julian section alone.

**W03** [should] `women-in-church-history`, essays[] n=11 body. 'That is not X. That is Y.'
- Quote: "That is not the sentence of a woman who has not seen suffering. That is the sentence of a woman who has seen a third of her world die"
- Replacement: "That is the sentence of a woman who has seen a third of her world die"
- Why: Same habit; the positive sentence stands alone.

**W04** [must] `women-in-church-history`, essays[] n=11 body. biography beyond the confirmed facts
- Quote: "I did not learn her name in seminary. I learned it later, alone, and I was poorer for the delay."
- Replacement: "I did not learn her name early. I learned it later, alone, and I was poorer for the delay."
- Why: Seminary is not among the confirmed facts. If James confirms it, restore the original.

**W05** [should] `women-in-church-history`, essays[] n=11 body. announced turn
- Quote: "She did something else, too, that deserves mention, because it shows a theological mind at work and not merely a devotional one. Julian meditated at length"
- Replacement: "Julian also meditated at length"
- Why: 'Deserves mention' is the announced turn the brief lists; the paragraph makes the point about her theological mind itself three sentences later.

**W06** [should] `women-in-church-history`, essays[] n=11 body. 'It is not X. It is Y.'; 'honest'
- Quote: "This is not sentiment. It is careful biblical reflection on a strand of Scripture the church had underused,"
- Replacement: "This is careful biblical reflection on a strand of Scripture the church had underused,"
- Why: Third antithesis in the section.

**W07** [should] `women-in-church-history`, essays[] n=11 body. 'honest' as self-certifying adjective
- Quote: "does not survive an honest reading of what Julian actually wrote."
- Replacement: "does not survive a reading of what Julian actually wrote."
- Why: 'Honest' or 'honestly' three times in this essay, once in a heading.

**W08** [should] `women-in-church-history`, essays[] n=11 body. tidy triplet with a vague third
- Quote: "They are urgent, blunt, and pastoral in the prophetic sense, addressing him as"
- Replacement: "They are urgent and blunt, addressing him as"
- Why: 'Pastoral in the prophetic sense' says nothing a reader can picture.

**W09** [must] `women-in-church-history`, essays[] n=11 body. biography and denomination claim not confirmed
- Quote: "Closer to my own tradition, Phoebe Palmer lived from 1807 to 1874,"
- Replacement: "Phoebe Palmer lived from 1807 to 1874,"
- Why: Palmer was a Methodist. James pastors a Baptist church. 'My own tradition' states something about his denomination that is not confirmed and is probably wrong.

**W10** [must] `women-in-church-history`, essays[] n=11 body. biography and denomination claim not confirmed
- Quote: " And the movement she helped shape is one of the streams that flows down into the church I now pastor."
- Replacement: (delete)
- Why: Claims a Holiness-movement lineage for his church. Not confirmed; cut unless James says it is so.

**W11** [should] `women-in-church-history`, essays[] n=11 body. announced turn; scholar names as decoration
- Quote: "It is worth pausing on the pattern that runs through the whole century after her. The nineteenth-century revivals and the missionary and abolitionist movements they fueled were disproportionately driven by women, and the historians of American religion, Mark Noll and Nathan Hatch among them, have documented how"
- Replacement: "The nineteenth-century revivals and the missionary and abolitionist movements they fueled were disproportionately driven by women, and historians of American religion have documented how"
- Why: Remove the two names and the sentence says the same thing, which is the test for decoration. If James can point to the place in Hatch's The Democratization of American Christianity he has in mind, name the book and the idea instead.

**W12** [should] `women-in-church-history`, essays[] n=11 body. 'That is not X. It is Y.'
- Quote: "That is not because the women were rare. It is because they were many, and I had space for six."
- Replacement: "The women were many, and I had space for six."
- Why: Same habit.

**W13** [should] `women-in-church-history`, essays[] n=11 body. heading describes the method ('named honestly')
- Quote: "## Why the editing happened, named honestly"
- Replacement: "## Why the names were dropped"
- Why: Rulebook leakage in a heading.

**W14** [consider] `women-in-church-history`, essays[] n=11 body. vague heading
- Quote: "## What the pattern says"
- Replacement: "## The ones I left out"
- Why: The section is a list of the women he passed over; say so.

**W15** [must] `women-in-church-history`, essays[] n=11 body. rulebook leakage (announced self-implication)
- Quote: "I have to answer that question with myself in the frame, because I have been one of the people passing the tradition down."
- Replacement: "I have been one of the people passing the tradition down."
- Why: 'With myself in the frame' is the instruction to self-implicate, written into the essay.

**W16** [consider] `women-in-church-history`, essays[] n=11 body. abstraction
- Quote: "which in the economy of memory amounts to a quieter version of the same thing."
- Replacement: "which amounts to a quieter version of the same thing."
- Why: 'The economy of memory' is an essay phrase in the middle of a plain confession.

**W17** [consider] `women-in-church-history`, essays[] n=11 body. no contractions where speech would have them
- Quote: "you do not just lose a few names. You lose the actual engine"
- Replacement: "you don't just lose a few names. You lose the actual engine"
- Why: The essay has no contraction anywhere in about 2,400 words. Two or three, at spoken moments like this, are enough.

**W18** [consider] `women-in-church-history`, essays[] n=11 body. AI adverb 'quietly' as a motif
- Quote: "what a later church quietly declined to pass on."
- Replacement: "what a later church did not pass on."
- Why: 'Quietly declined', 'quietly lost', 'a quieter version': the word is doing the same work three times.


### /home/user/Livewell-/client/src/lib/shelf.json

**B01** [must] `the-monster-is-never-the-one-in-the`, essays[] entry with this slug, field blurb. em-dash in the public blurb
- Quote: "The mechanism that produces moral catastrophe is not cynicism or cruelty — it is self-deception."
- Replacement: "The mechanism that produces moral catastrophe is not cynicism or cruelty. It is self-deception."
- Why: Shown under the title on /writing. Body not audited (not in the repo).

**B02** [must] `how-the-bible-gets-translated-by`, essays[] entry with this slug, field blurb. em-dash in the public blurb
- Quote: "The question is not whether your reading is shaped by your community — it is."
- Replacement: "The question is not whether your reading is shaped by your community. It is."
- Why: Shown under the title on /writing. Body not audited (not in the repo).

**B03** [consider] `blind-spots`, essays[] entry with this slug, field blurb. jargon; blurb stops mid-sentence
- Quote: "Blind spots are not only personal. Communities develop institutional structures that systematically protect the dominant coalition from the information it most needs"
- Replacement: "Blind spots are not only personal. Communities build structures that keep their leaders from hearing what they most need to hear."
- Why: 'Institutional structures that systematically protect the dominant coalition' is sociology-paper diction and the line has no ending. This is James's own Substack wording, so it is his call.

