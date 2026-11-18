# Voice audit: site pages

Library: Home, About, Books, the three shelf book pages, Subscribe (`EmailSignup.tsx`), Contact, Speaking, Study, Family, Topics, ToolsHub, Resources, `lib/positioning.ts`, `lib/bookShelf.ts`, plus three strings these pages render from shared files (`lib/site.ts` AUTHOR_BIO, `components/SegmentedSignup.tsx`, `components/BookNextSteps.tsx`). Read-only; nothing in the repository was changed.

Standard: `docs/VOICE-JAMES-BELL.md` governs; `docs/work/essays/BRIEF.md`, CLAUDE.md and the saved Substack profile support it.

## Scores

- **human_score: 6 / 10**
- **voice_score: 6 / 10**

The site pages are honest and mostly plain, and three of them (the About story, Contact, Topics/Study) already sound like James. But a careful reader would hear a machine in the marketing layer: about 30 em-dashes, 'honest' 25 times and 'actually' 21, an 'It is not X. It is Y.' habit that peaks on the Believe page, display-size aphorisms on /family, and an About section that recites the style guide. /about also states his title, two different year counts and a book count that /books contradicts. None of it needs new facts to fix; 93 small replacements are listed.

Checked and clean: every Forbidden Language word and phrase (literal search, zero hits); exclamation points (none in visible copy); one-directional political criticism (none); crisis passages without a path to help (none).

## 1. Patterns that repeat

### P1. Em-dashes outside quotation (26 findings)

About 30 em-dashes sit in copy a visitor reads, including two in the home page headline. The site's own gate treats the em-dash as an AI tell in James's voice, but that gate does not look at page components, so these were never caught. Printed chapter titles in the book's own table of contents (for example 'Not Persecuted—Seduced') are the book's text and are left alone.

Three examples:

- **File:** `/home/user/Livewell-/client/src/lib/positioning.ts`  
  **Where:** HOME_HEADLINE  
  **Severity:** should. Needs James's nod.  
  **Quote:** `Learning to follow Jesus — and live well — in post‑Christian America.`  
  **Tell:** em-dash outside a quotation  
  **Why:** The first sentence a visitor reads carries two em-dashes, the mark this site's own gate treats as an AI tell in James's voice. META_DESCRIPTION already says the same thing without them. James chose this line on 2026-10-14, so the change needs his nod.  
  **Replacement:** `Learning to follow Jesus and live well in post‑Christian America.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-heart, paragraph 2  
  **Severity:** should.  
  **Quote:** `which means the faith has to be commended the old way — argued honestly, lived visibly, offered without pressure.`  
  **Tell:** em-dash plus tidy adverb triplet  
  **Why:** Dash-then-three-matched-phrases (verb + adverb, verb + adverb, verb + phrase) is the most recognisable machine cadence on the page, and 'honestly' certifies itself.  
  **Replacement:** `which means the faith has to be commended the old way. It has to be argued, lived where people can see it, and offered without pressure.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-heart, paragraph 3  
  **Severity:** should.  
  **Quote:** `I want the historic faith — the creed, the cross, the resurrection, the kingdom — held out in ordinary language`  
  **Tell:** paired em-dashes  
  **Why:** A dash-bracketed list in the middle of a sentence; the same construction appears seven more times across the library.  
  **Replacement:** `I want the historic faith (the creed, the cross, the resurrection, the kingdom) held out in ordinary language`

### P2. 'Honest' as a self-certifying adjective (12 findings)

'Honest' or 'honestly' appears 25 times across the library, 8 of them on /tools. The brief allows one per essay. Copy that keeps vouching for its own honesty is the thing a skeptic trusts least.

Three examples:

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/test-the-case].description  
  **Severity:** must.  
  **Quote:** `At every step you can push back with the objection you actually hold and get the honest answer, including what it does not prove. Argued with, not preached at. No altar call.`  
  **Tell:** 'honest' self-certifying; 'actually'; antithesis fragment; fragment stack; rulebook leakage  
  **Why:** Five tells in three lines. 'The honest answer' vouches for itself, 'Argued with, not preached at' is a slogan, and 'No altar call' is lifted from the site's own editorial rules. A skeptic hears a pitch.  
  **Replacement:** `At every step you can push back with the objection you hold and see the answer, including what the argument does not prove. Nobody asks you for a decision at the end.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/which-lens].description  
  **Severity:** should.  
  **Quote:** `Thirteen honest choices. Five lenses that do a reader's thinking before the reader does: the flag, the cause, the highlighter, the rearview, the marketplace. It ends not in a score but in a name for the lens it found and the reading that takes it apart.`  
  **Tell:** 'honest'; fragment stack; 'not X but Y'  
  **Why:** Two number-led fragments, 'honest' as a filler adjective, and a 'not in a score but in a name' antithesis.  
  **Replacement:** `Thirteen choices that show which of five lenses does your thinking before you do: the flag, the cause, the highlighter, the rearview, the marketplace. There's no score at the end. You get the name of the lens it found and the reading that takes it apart.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/diagnostic].description  
  **Severity:** should.  
  **Quote:** `Eight honest questions across four areas: where you are with God right now, without the church answer.`  
  **Tell:** 'honest' self-certifying  
  **Why:** 'Honest' appears 8 times in this one file. Questions are not honest; answers are.  
  **Replacement:** `Eight questions across four areas about where you are with God right now, without the church answer.`

### P3. 'Actually', 'real', and the Tuesday stamp (10 findings)

'Actually' appears 21 times and 'real' 16. 'On a Tuesday' appears on five surfaces and 'the week / life you are actually living' on three. Once, on /about, 'a Tuesday afternoon' is his. Stamped across the site it becomes a brand tic.

Three examples:

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** Hero h1  
  **Severity:** should.  
  **Quote:** `Tools for the Life You Are <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>Actually</em> Living`  
  **Tell:** 'actually' as brand stamp; literary heading  
  **Why:** The page's largest words italicise the library's most over-used filler. Headings are meant to be plain.  
  **Replacement:** `Tools you can use this week`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** Hero paragraph  
  **Severity:** should.  
  **Quote:** `Built for marriages, for households, for anyone who takes the faith seriously enough to practice it on a Tuesday.`  
  **Tell:** 'for/for/for' triplet; Tuesday motif  
  **Why:** Anaphoric triplet ending on the Tuesday stamp, which also appears on /speaking, /resources, /about and in the pastors' pitch.  
  **Replacement:** `Built for marriages, households, and anyone who wants to practice the faith in an ordinary week.`

- **File:** `/home/user/Livewell-/client/src/pages/Home.tsx`  
  **Where:** NewsletterSignup description  
  **Severity:** should.  
  **Quote:** `Serious theology, written for the week you are actually living. No filler, no funnel, and you can leave whenever you like.`  
  **Tell:** brand stamp; 'No X, no Y' fragment stack with alliteration  
  **Why:** 'No filler, no funnel' is an alliterative marketing pair. The honest half of the line ('you can leave whenever you like') is the part to keep.  
  **Replacement:** `Serious theology for an ordinary week. Nothing else comes with it, and you can leave whenever you like.`

### P4. 'It is not X. It is Y.' as the default gait (11 findings)

The governing standard allows this at a genuine hinge. The Believe pitch uses it five times in three paragraphs, /about four times in one band, and the tools page as a description template.

Three examples:

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** PITCH paragraph 2  
  **Severity:** must.  
  **Quote:** `He does not flinch and he does not flatter. Every objection gets its strongest form before it gets an answer. The atheists are quoted at their most formidable, not their most convenient. This is apologetics written from inside the doubt, by a man who once stood outside the faith and walked away — until the evidence walked after him.`  
  **Tell:** symmetrical pair, rulebook leakage, antithesis, em-dash, chiasmus closer, biography beyond the confirmed facts  
  **Why:** The most machine-sounding paragraph in the library. Four sentences, four devices: an alliterative balanced pair (flinch/flatter), the editorial steelman rule stated as a selling point, a 'most X, not most Y' antithesis, and a chiastic closer (walked away / walked after) hung on a dash. 'Stood outside the faith and walked away' also implies he once left the faith, which is not in the confirmed biography (he came to faith as an adult from atheism).  
  **Replacement:** `Every objection is stated the way the people who hold it would state it, and the atheists are quoted at their strongest. The book was written by a man who was an atheist before he was a Christian and still remembers how the objections sound from that side.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/rule-of-life].description  
  **Severity:** must.  
  **Quote:** `A rule of life is not a performance contract. It is a trellis. Choose sustainable practices across prayer, Scripture, rest, community, mission, and the body, and settle on a pattern you can actually keep on an ordinary week.`  
  **Tell:** 'It is not X. It is Y.' with a stock metaphor; 'sustainable'; 'actually'  
  **Why:** The trellis line is the standard rule-of-life metaphor from every book on the subject, delivered in the exact 'not X. It is Y.' shape. Generic Christian content.  
  **Replacement:** `A rule of life is a trellis, something to grow along. Choose practices across prayer, Scripture, rest, community, mission, and the body, and settle on a pattern you can keep on an ordinary week.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-church, paragraph 1 opening  
  **Severity:** must. Needs James's nod.  
  **Quote:** `I have pastored First Baptist Church of Fenton, Michigan for twelve years. I put that first not as a line on a resume but because it is the room where everything here gets tested.`  
  **Tell:** states years in ministry; 'not X but Y'; protests too much  
  **Why:** States a number of years (twelve) that the same page contradicts further down (fifteen), and then explains that it isn't bragging, which is what a résumé line does. The next two sentences already hold a real antithesis (quiet study / hospital visits) that earns its place.  
  **Replacement:** `I pastor First Baptist Church of Fenton, Michigan, and that's the room where everything here gets tested.`

### P5. Aphoristic closers and display-size slogans (12 findings)

Short balanced lines set as pull quotes, statement bands, section ledes and card closers. Each could be embroidered on a pillow, and several overclaim.

Three examples:

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** StatementBand (eyebrow 'The oldest classroom')  
  **Severity:** must.  
  **Quote:** `The faith is handed down on purpose, at the table, or it is not handed down at all.`  
  **Tell:** pillow aphorism; overclaim  
  **Why:** A display-size absolute ('or not at all') that is false on its face for the reader this site is written toward: James himself was raised without a father and came to faith as an adult. It reads as a slogan, and to a single parent or a convert it reads as a verdict on them.  
  **Replacement:** `The faith gets handed down on purpose, usually at a table, by the people a child lives with.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** SectionHead Parenting intro  
  **Severity:** must.  
  **Quote:** `The work no one applauds, done where no congregation watches. Scripture for the real moments, plus writing and tools for the long obedience of raising children who can carry weight.`  
  **Tell:** literary fragment; 'real moments'; borrowed stock phrase; brand motif  
  **Why:** A balanced verbless opener ('no one applauds / no congregation watches'), then 'the long obedience' (Eugene Peterson's phrase, uncredited) and the brand's 'carry weight'. Nothing here is a thing James would say to a tired parent across a table.  
  **Replacement:** `Most of parenting happens where nobody sees it. Here is Scripture for the hard moments, plus writing and tools for the long work of raising children.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** PullQuote  
  **Severity:** should.  
  **Quote:** `<PullQuote>The household is the first church a child ever attends.</PullQuote>`  
  **Tell:** pillow aphorism set as a pull quote  
  **Why:** Could be printed on a church-lobby canvas unchanged. It is the second display-size epigram on the page and adds nothing the sections around it do not say.  
  **Replacement:** `(delete; no replacement text)`

### P6. Fragment stacks and anaphora (5 findings)

Verbless fragments stacked for rhythm ('X remains. Y remain. Z remains.', 'For the ... For the ... For the ...', 'One essay, one idea, one resource.'). The standard ranks developed sentences above these.

Three examples:

- **File:** `/home/user/Livewell-/client/src/pages/WhenGodBlessAmerica.tsx`  
  **Where:** PITCH paragraph 1  
  **Severity:** must.  
  **Quote:** `In a time of political panic, rising tribalism, and growing confusion inside the church, many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith remains. The rituals remain. The worship remains. But the heart has moved.`  
  **Tell:** 'In a time of' opener; two tidy triplets; anaphora stack with a turn  
  **Why:** Opens with a cousin of the forbidden 'in today's world' and an adjective-noun triplet (political panic, rising tribalism, growing confusion), then a second triplet (power, policy, national strength), then 'X remains. Y remain. Z remains. But ...'. Every sentence is a formula.  
  **Replacement:** `Many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith is still there, and so are the rituals and the worship, but the heart has moved.`

- **File:** `/home/user/Livewell-/client/src/lib/positioning.ts`  
  **Where:** NEWSLETTER_PITCH_PASTORAL.description  
  **Severity:** must.  
  **Quote:** `Written for pastors carrying the weight. One essay, one sermon-prep idea, one resource. From inside the room where the work actually happens.`  
  **Tell:** brand motif; 'one, one, one' fragment; 'actually'; verbless closer  
  **Why:** Three fragments, no sentence. 'Carrying the weight' and 'inside the room where the work actually happens' are the brand's stock phrases. (Shown on the pastors' pages, not the home page.)  
  **Replacement:** `For pastors. Each letter has an essay, a sermon-prep idea, and a resource, written by a pastor in the middle of the same work.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-heart, paragraph 1  
  **Severity:** should.  
  **Quote:** `LiveWell is for the person whose faith has grown larger than the answers they were handed as a child. For the pastor who is quietly running on empty. For the husband and wife still keeping a promise they are no longer sure they understand. For the skeptic who keeps reading the words of a faith they have not decided to trust.`  
  **Tell:** anaphora run as fragments ('For the ... For the ... For the ...')  
  **Why:** Three verbless 'For the' fragments. The people named are right and specific; the stack is what sounds generated. One sentence carries all four.  
  **Replacement:** `LiveWell is for the person whose faith has grown larger than the answers they were handed as a child. It's for the pastor who is quietly running on empty, for the husband and wife still keeping a promise they're no longer sure they understand, and for the skeptic who keeps reading the words of a faith they haven't decided to trust.`

### P7. Rulebook leakage (2 findings)

Page copy that recites the editorial rules (verdicts, steelmanning, self-implication, 'no altar call') instead of just following them.

Three examples:

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-writing, item 3  
  **Severity:** must. Needs James's nod.  
  **Quote:** `{ name: "It ends on a verdict, not a recap", def: "The last paragraph does not restate the argument. It names what is left once the evidence is on the table, in a few words, and lets you carry it out of the room with you." }`  
  **Tell:** rulebook leakage  
  **Why:** This is the editorial style guide printed as page copy: 'verdict', 'evidence', 'does not restate', 'carry it out'. The brief names any use of 'verdict' in prose as an AI tell. A writer does not tell a reader how his last paragraphs work.  
  **Replacement:** `{ name: "It doesn't end with a summary", def: "I don't wrap things up at the end. The last paragraph says what's still true after everything else has been said, and I leave it with you." }`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-writing, item 2  
  **Severity:** should. Needs James's nod.  
  **Quote:** `{ name: "The writer is inside it", def: "When a piece names what the church has gotten wrong, I am part of the church that got it wrong. When it names what pastors tend to hide, I am a pastor who has hidden it. I am not pointing from across the room." }`  
  **Tell:** rulebook leakage; self-implication announced; restating closer  
  **Why:** The brief asks that he implicate himself 'by doing it, not by announcing it'. The heading speaks of 'the writer' in the third person, and the last sentence restates the two before it as a slogan.  
  **Replacement:** `{ name: "I'm inside it", def: "When a piece names what the church has gotten wrong, I'm part of the church that got it wrong. When it names what pastors tend to hide, I'm a pastor who has hidden it." }`

### P8. Title, years, book count, and PCN stated as credentials (7 findings)

The confirmed rule is never to state his title, years in ministry or book count. /about states all three, with numbers that contradict each other and /books. James has also asked that the Pastors Connection Network stay outside this site.

Three examples:

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Hero credentials block  
  **Severity:** must. Needs James's nod.  
  **Quote:** `Lead Pastor, First Baptist Church of Fenton<br />`  
  **Tell:** states his title  
  **Why:** The rule James confirmed is never to state his title. His own story paragraph below says it the way he would: 'I pastor a church in Fenton, Michigan'.  
  **Replacement:** `Pastor in Fenton, Michigan<br />`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Hero credentials block  
  **Severity:** must. Needs James's nod.  
  **Quote:** `Author of {SITE_STATS.bookCount} books`  
  **Tell:** states a book count; contradicts /books  
  **Why:** Renders 'Author of 21 books' while /books says 'Three books. Every word mine.' and explains the rest were taken down to be rewritten. A skeptic who reads both pages will conclude one of them isn't true.  
  **Replacement:** `Author`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-church, paragraph 4  
  **Severity:** must. Needs James's nod.  
  **Quote:** `The rest of it is writing. {SITE_STATS.bookCount} books so far, on theology, church history, justice, marriage, parenting, and the slow unglamorous business of following Jesus over a long stretch of time.`  
  **Tell:** states a book count; contradicts /books  
  **Why:** Second statement of '21 books' on the page.  
  **Replacement:** `The rest of it is writing. Books on theology, church history, justice, marriage, parenting, and the slow unglamorous business of following Jesus over a long stretch of time.`

### P9. Formula headings and a shifting narrator (8 findings)

Template headings on the book pages, and a narrator who is 'I' on the home page, 'us' on /subscribe, and 'James' / 'he' elsewhere.

Three examples:

- **File:** `/home/user/Livewell-/client/src/pages/EmailSignup.tsx`  
  **Where:** Hero paragraph  
  **Severity:** should.  
  **Quote:** `parenting, and doubt. Tell us who you are and the first essay you get`  
  **Tell:** 'us' on a one-man site  
  **Why:** The home page says 'I'm James Bell'; the subscribe page says 'us'. A person wrote one of them.  
  **Replacement:** `parenting, and doubt. Tell me who you are and the first essay you get`

- **File:** `/home/user/Livewell-/client/src/components/BookNextSteps.tsx`  
  **Where:** NewsletterSignup description  
  **Severity:** should.  
  **Quote:** `One serious essay a week in the same vein — theology that meets the weight of everyday life. No spam, ever.`  
  **Tell:** em-dash; tagline; stock 'No spam, ever'  
  **Why:** Rendered at the foot of all three book pages: a dash, the brand tagline, and the most generic line in email marketing.  
  **Replacement:** `One serious essay a week in the same vein. Nothing else comes with it, and you can leave whenever you like.`

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** CONTENTS h2  
  **Severity:** consider.  
  **Quote:** `Twelve questions, from the cosmos to the cross`  
  **Tell:** formula heading (alliterative 'from X to Y')  
  **Why:** The same 'N things, from X to the cross' template heads two book pages. Headings are meant to be plain.  
  **Replacement:** `The twelve questions`

## 2. The ten worst passages

**1.**

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** PITCH paragraph 2  
  **Severity:** must.  
  **Quote:** `He does not flinch and he does not flatter. Every objection gets its strongest form before it gets an answer. The atheists are quoted at their most formidable, not their most convenient. This is apologetics written from inside the doubt, by a man who once stood outside the faith and walked away — until the evidence walked after him.`  
  **Tell:** symmetrical pair, rulebook leakage, antithesis, em-dash, chiasmus closer, biography beyond the confirmed facts  
  **Why:** The most machine-sounding paragraph in the library. Four sentences, four devices: an alliterative balanced pair (flinch/flatter), the editorial steelman rule stated as a selling point, a 'most X, not most Y' antithesis, and a chiastic closer (walked away / walked after) hung on a dash. 'Stood outside the faith and walked away' also implies he once left the faith, which is not in the confirmed biography (he came to faith as an adult from atheism).  
  **Replacement:** `Every objection is stated the way the people who hold it would state it, and the atheists are quoted at their strongest. The book was written by a man who was an atheist before he was a Christian and still remembers how the objections sound from that side.`

**2.**

- **File:** `/home/user/Livewell-/client/src/pages/WhenGodBlessAmerica.tsx`  
  **Where:** PITCH paragraph 1  
  **Severity:** must.  
  **Quote:** `In a time of political panic, rising tribalism, and growing confusion inside the church, many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith remains. The rituals remain. The worship remains. But the heart has moved.`  
  **Tell:** 'In a time of' opener; two tidy triplets; anaphora stack with a turn  
  **Why:** Opens with a cousin of the forbidden 'in today's world' and an adjective-noun triplet (political panic, rising tribalism, growing confusion), then a second triplet (power, policy, national strength), then 'X remains. Y remain. Z remains. But ...'. Every sentence is a formula.  
  **Replacement:** `Many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith is still there, and so are the rituals and the worship, but the heart has moved.`

**3.**

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** StatementBand (eyebrow 'The oldest classroom')  
  **Severity:** must.  
  **Quote:** `The faith is handed down on purpose, at the table, or it is not handed down at all.`  
  **Tell:** pillow aphorism; overclaim  
  **Why:** A display-size absolute ('or not at all') that is false on its face for the reader this site is written toward: James himself was raised without a father and came to faith as an adult. It reads as a slogan, and to a single parent or a convert it reads as a verdict on them.  
  **Replacement:** `The faith gets handed down on purpose, usually at a table, by the people a child lives with.`

**4.**

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** SectionHead Parenting intro  
  **Severity:** must.  
  **Quote:** `The work no one applauds, done where no congregation watches. Scripture for the real moments, plus writing and tools for the long obedience of raising children who can carry weight.`  
  **Tell:** literary fragment; 'real moments'; borrowed stock phrase; brand motif  
  **Why:** A balanced verbless opener ('no one applauds / no congregation watches'), then 'the long obedience' (Eugene Peterson's phrase, uncredited) and the brand's 'carry weight'. Nothing here is a thing James would say to a tired parent across a table.  
  **Replacement:** `Most of parenting happens where nobody sees it. Here is Scripture for the hard moments, plus writing and tools for the long work of raising children.`

**5.**

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/rule-of-life].description  
  **Severity:** must.  
  **Quote:** `A rule of life is not a performance contract. It is a trellis. Choose sustainable practices across prayer, Scripture, rest, community, mission, and the body, and settle on a pattern you can actually keep on an ordinary week.`  
  **Tell:** 'It is not X. It is Y.' with a stock metaphor; 'sustainable'; 'actually'  
  **Why:** The trellis line is the standard rule-of-life metaphor from every book on the subject, delivered in the exact 'not X. It is Y.' shape. Generic Christian content.  
  **Replacement:** `A rule of life is a trellis, something to grow along. Choose practices across prayer, Scripture, rest, community, mission, and the body, and settle on a pattern you can keep on an ordinary week.`

**6.**

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/test-the-case].description  
  **Severity:** must.  
  **Quote:** `At every step you can push back with the objection you actually hold and get the honest answer, including what it does not prove. Argued with, not preached at. No altar call.`  
  **Tell:** 'honest' self-certifying; 'actually'; antithesis fragment; fragment stack; rulebook leakage  
  **Why:** Five tells in three lines. 'The honest answer' vouches for itself, 'Argued with, not preached at' is a slogan, and 'No altar call' is lifted from the site's own editorial rules. A skeptic hears a pitch.  
  **Replacement:** `At every step you can push back with the objection you hold and see the answer, including what the argument does not prove. Nobody asks you for a decision at the end.`

**7.**

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-church, paragraph 3 (ENDS)  
  **Severity:** should.  
  **Quote:** `Not to send Americans to do their work for them, and not to hand them a translated version of our assumptions. To put real training in the hands of the men already there, who already know the language and the terrain and the cost, and who will still be there long after any visitor has gone home.`  
  **Tell:** 'Not X, and not Y. To Z.' fragment stack; 'real'  
  **Why:** Two verbless fragments in the 'Not / not / To' pattern. The thought is his and worth keeping; it only needs subjects and verbs.  
  **Replacement:** `The aim isn't to send Americans to do their work for them or to hand them a translated version of our assumptions. It's to put training in the hands of the men already there, who know the language and the terrain and the cost, and who will still be there long after any visitor has gone home.`

**8.**

- **File:** `/home/user/Livewell-/client/src/lib/positioning.ts`  
  **Where:** NEWSLETTER_PITCH_PASTORAL.description  
  **Severity:** must.  
  **Quote:** `Written for pastors carrying the weight. One essay, one sermon-prep idea, one resource. From inside the room where the work actually happens.`  
  **Tell:** brand motif; 'one, one, one' fragment; 'actually'; verbless closer  
  **Why:** Three fragments, no sentence. 'Carrying the weight' and 'inside the room where the work actually happens' are the brand's stock phrases. (Shown on the pastors' pages, not the home page.)  
  **Replacement:** `For pastors. Each letter has an essay, a sermon-prep idea, and a resource, written by a pastor in the middle of the same work.`

**9.**

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-writing, closing paragraph  
  **Severity:** must. Needs James's nod.  
  **Quote:** `LiveWell is not therapy, and it is not Christian self-help. It is not a place that hands you something to think so you can stop thinking. It is closer to a writing desk — where a pastor with {SITE_STATS.yearsInMinistryWord} years of mistakes behind him and five sons in front of him tries to think honestly, out loud, about what it actually means to follow Jesus in a country that has mostly forgotten what his kingdom was ever about.`  
  **Tell:** triple negation then reveal; em-dash; years in ministry; 'honestly' + 'actually'; behind/in-front balance; self in third person  
  **Why:** Three 'is not' statements building to an 'It is closer to' reveal across a dash, with 'honestly' and 'actually' in the same clause. It renders 'fifteen years' on a page that says 'twelve years' twice. He speaks of himself as 'a pastor ... him' one section after writing 'I'.  
  **Replacement:** `LiveWell isn't therapy and it isn't Christian self-help. It won't hand you something to think so you can stop thinking. It's closer to a writing desk, where a pastor with plenty of mistakes behind him and five sons in front of him tries to think out loud about what it means to follow Jesus in a country that has mostly forgotten what his kingdom was about.`

**10.**

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-writing, item 3  
  **Severity:** must. Needs James's nod.  
  **Quote:** `{ name: "It ends on a verdict, not a recap", def: "The last paragraph does not restate the argument. It names what is left once the evidence is on the table, in a few words, and lets you carry it out of the room with you." }`  
  **Tell:** rulebook leakage  
  **Why:** This is the editorial style guide printed as page copy: 'verdict', 'evidence', 'does not restate', 'carry it out'. The brief names any use of 'verdict' in prose as an AI tell. A writer does not tell a reader how his last paragraphs work.  
  **Replacement:** `{ name: "It doesn't end with a summary", def: "I don't wrap things up at the end. The last paragraph says what's still true after everything else has been said, and I leave it with you." }`

## 3. Most machine-sounding, and most his

Most machine-sounding:

- `client/src/pages/Believe.tsx (PITCH)`
- `client/src/pages/ToolsHub.tsx (TOOLS descriptions and hero)`
- `client/src/pages/Family.tsx (section intros, StatementBand, PullQuote)`
- `client/src/pages/About.tsx ('How the writing works', ENDS paragraph, closing)`
- `client/src/pages/WhenGodBlessAmerica.tsx (PITCH paragraph 1)`
- `client/src/lib/positioning.ts (NEWSLETTER_PITCH_PASTORAL / _SKEPTIC)`

Most his:

- `client/src/pages/About.tsx ('My story in my own words')`
- `client/src/lib/positioning.ts (HOME_WHO)`
- `client/src/pages/Contact.tsx`
- `client/src/pages/Topics.tsx`
- `client/src/pages/Study.tsx`
- `client/src/pages/Books.tsx (hero and 'Looking for a book that used to be here?')`
- `client/src/pages/Home.tsx (DOORS)`

## 4. What is already working

- /about, 'My story in my own words' is the most human writing in the library: 'I have been at the same church long enough to have buried people I loved and married their children' and 'usually on a week when I did not feel qualified to answer' could only be him.
- HOME_WHO (client/src/lib/positioning.ts) is plain, contracted and specific: 'I'm James Bell, a pastor, Susanna's husband, and dad to five sons.' Biography is stated once and not leaned on.
- /contact is exactly the 'quick practical message' register: says what is known, gives the 988 line and Find Help, stops.
- /topics and the home page doors describe what is behind each link in ordinary words with real counts (1,189 chapters, 'about ten minutes long') and no selling.
- /study is the cleanest long page: 'You did not start the faith. You were handed it.' is an antithesis at a real hinge, and it says plainly that verse notes are finished only for Genesis and the Gospels.
- /books hero: 'which is less than the coffee you would read it over' and 'I took the rest of the shelf down to rewrite it in my own hand' sound like a person telling the truth about his own shelf.
- No Forbidden Language word or phrase appears anywhere in the library (literal search of every term), and there is no exclamation point in any visible copy.
- /about band 'The church, the network...': 'written around hospital visits and budget meetings, after funerals' is concrete and earned; it should survive every edit.

## 5. For James

1. About page numbers contradict each other and the Books page. /about says 'twelve years' twice and renders 'fifteen years' once (SITE_STATS.yearsInMinistryWord), says 'Author of 21 books' twice, the book-page bio says 'more than twenty books', and /books says 'Three books. Every word mine.' and that the rest were taken down. Tell us one true figure for each, or confirm they should all come off (the replacements here remove them).
2. You asked on 2026-11-17 to keep the Pastors Connection Network outside this site. It is still named in the home page introduction (HOME_WHO, which you chose on 2026-10-14: 'I founded the Pastors Connection Network'), in a full paragraph and an outbound link on /about, in the About search description and structured data ('nearly 18,000 pastors'), in the bio under two book pages, in the pastors' newsletter pitch, and by implication on /speaking ('A network of pastors who have been through the same'). Say whether a one-line mention with a link out is acceptable or whether every mention goes.
3. The home page headline you chose has two em-dashes ('Learning to follow Jesus — and live well — in post-Christian America.'). The same sentence without them is already your site description. Approve the plain version?
4. Three /about passages may be yours word for word (a code note says the page reuses your sentences): 'My story in my own words', 'The heart behind it', and 'How the writing works'. The story section reads as you and is left alone. 'How the writing works' reads like the style guide; if you wrote it, say so and we will only contract it, not rewrite it.
5. Believe's pitch says you 'once stood outside the faith and walked away — until the evidence walked after him.' That can be read as having left the faith and returned. The confirmed fact is that you came to faith as an adult from atheism. The replacement removes the ambiguity; if there is a truer sentence only you can write, it belongs here.
6. The home page needs one detail only you can supply to stop sounding like a site description: what a real question across your desk sounded like. /about already has it in general form ('something I had to figure out for an actual person sitting across from me'). We have not invented one.
7. /speaking offers 'Writing and ghostwriting' on the same site whose Books page says 'Every word mine.' A careful reader may notice. Keep, reword, or drop?
8. You said no membership fee. Nothing in this library asks for one, but the three books are sold at $8.99 and /books says so plainly. Confirm that book sales stay.
9. Your saved Substack profile and VOICE-JAMES-BELL.md disagree in a few places; the voice document was followed. The profile asks for 2-4 sentence paragraphs, 'stacked landing lines', 'contrast lines', three numbered applications, and 'one line the reader screenshots' in every piece; the voice document ranks developed paragraphs above fragment stacks and allows one earned verdict, not a slogan per piece. The profile also speaks of paid content that 'justifies the subscription' and names a .com address; neither matches the site now.
10. Political balance: nothing in this library criticises one side only. The When God Bless America blurb says it is 'not a case for the other party', and the tools page pairs the scorecard and the biblical-government tool against both parties. No change needed.
11. Crisis paths are present where they should be: the 988 line and Find Help on /contact, a Find Help line at the foot of the home page, /help first under 'Help in a hard season' on /resources, and 'safety first' on the marriage card on /family.
12. Four constants in client/src/lib/positioning.ts are no longer used anywhere (PRIMARY_HEADLINE, PRIMARY_KICKER, PRIMARY_SUBHEAD, PRIMARY_SUBHEAD_SHORT). They carry the old voice ('New essays weekly', em-dashes, 'forming people who can carry weight'). A later pass can delete them so nobody reuses them.

## 6. Every finding, by file

Each quote was checked to exist verbatim in the named file. Where the same sentence sits in several files it is listed once per file.

### `/home/user/Livewell-/client/src/lib/positioning.ts`

- **File:** `/home/user/Livewell-/client/src/lib/positioning.ts`  
  **Where:** NEWSLETTER_PITCH_PASTORAL.description  
  **Severity:** must.  
  **Quote:** `Written for pastors carrying the weight. One essay, one sermon-prep idea, one resource. From inside the room where the work actually happens.`  
  **Tell:** brand motif; 'one, one, one' fragment; 'actually'; verbless closer  
  **Why:** Three fragments, no sentence. 'Carrying the weight' and 'inside the room where the work actually happens' are the brand's stock phrases. (Shown on the pastors' pages, not the home page.)  
  **Replacement:** `For pastors. Each letter has an essay, a sermon-prep idea, and a resource, written by a pastor in the middle of the same work.`

- **File:** `/home/user/Livewell-/client/src/lib/positioning.ts`  
  **Where:** HOME_HEADLINE  
  **Severity:** should. Needs James's nod.  
  **Quote:** `Learning to follow Jesus — and live well — in post‑Christian America.`  
  **Tell:** em-dash outside a quotation  
  **Why:** The first sentence a visitor reads carries two em-dashes, the mark this site's own gate treats as an AI tell in James's voice. META_DESCRIPTION already says the same thing without them. James chose this line on 2026-10-14, so the change needs his nod.  
  **Replacement:** `Learning to follow Jesus and live well in post‑Christian America.`

- **File:** `/home/user/Livewell-/client/src/lib/positioning.ts`  
  **Where:** NEWSLETTER_PITCH_SKEPTIC.description  
  **Severity:** should.  
  **Quote:** `Seven essays sent over four weeks. The ones I'd hand a skeptical friend first. No conversion bait. Real questions, real arguments.`  
  **Tell:** fragment stack; 'No X.'; 'Real X, real Y'  
  **Why:** Four fragments ending on 'Real questions, real arguments', the doubled-adjective closer. 'The ones I'd hand a skeptical friend first' is his and should stay.  
  **Replacement:** `Seven essays sent over four weeks, the ones I'd hand a skeptical friend first. Nobody will push you for a decision.`

- **File:** `/home/user/Livewell-/client/src/lib/positioning.ts`  
  **Where:** NEWSLETTER_PITCH_PASTORAL.title  
  **Severity:** consider.  
  **Quote:** `The Pastor's Letter — Tuesday morning`  
  **Tell:** em-dash; Tuesday motif  
  **Why:** Dash in a title, plus the fifth 'Tuesday' in the library.  
  **Replacement:** `The Pastor's Letter, Tuesday mornings`

- **File:** `/home/user/Livewell-/client/src/lib/positioning.ts`  
  **Where:** NEWSLETTER_PITCH_SKEPTIC.title  
  **Severity:** consider.  
  **Quote:** `The Skeptic's Track — start here`  
  **Tell:** em-dash  
  **Why:** Dash in a title.  
  **Replacement:** `The Skeptic's Track: start here`

### `/home/user/Livewell-/client/src/pages/About.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-church, paragraph 1 opening  
  **Severity:** must. Needs James's nod.  
  **Quote:** `I have pastored First Baptist Church of Fenton, Michigan for twelve years. I put that first not as a line on a resume but because it is the room where everything here gets tested.`  
  **Tell:** states years in ministry; 'not X but Y'; protests too much  
  **Why:** States a number of years (twelve) that the same page contradicts further down (fifteen), and then explains that it isn't bragging, which is what a résumé line does. The next two sentences already hold a real antithesis (quiet study / hospital visits) that earns its place.  
  **Replacement:** `I pastor First Baptist Church of Fenton, Michigan, and that's the room where everything here gets tested.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-church, paragraph 1 closing  
  **Severity:** must. Needs James's nod.  
  **Quote:** `Twelve years in that room will take the abstraction out of almost anyone.`  
  **Tell:** years in ministry restated  
  **Why:** Second statement of the unconfirmed number. The sentence is good without it.  
  **Replacement:** `That room will take the abstraction out of almost anyone.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-writing, closing paragraph  
  **Severity:** must. Needs James's nod.  
  **Quote:** `LiveWell is not therapy, and it is not Christian self-help. It is not a place that hands you something to think so you can stop thinking. It is closer to a writing desk — where a pastor with {SITE_STATS.yearsInMinistryWord} years of mistakes behind him and five sons in front of him tries to think honestly, out loud, about what it actually means to follow Jesus in a country that has mostly forgotten what his kingdom was ever about.`  
  **Tell:** triple negation then reveal; em-dash; years in ministry; 'honestly' + 'actually'; behind/in-front balance; self in third person  
  **Why:** Three 'is not' statements building to an 'It is closer to' reveal across a dash, with 'honestly' and 'actually' in the same clause. It renders 'fifteen years' on a page that says 'twelve years' twice. He speaks of himself as 'a pastor ... him' one section after writing 'I'.  
  **Replacement:** `LiveWell isn't therapy and it isn't Christian self-help. It won't hand you something to think so you can stop thinking. It's closer to a writing desk, where a pastor with plenty of mistakes behind him and five sons in front of him tries to think out loud about what it means to follow Jesus in a country that has mostly forgotten what his kingdom was about.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-writing, item 3  
  **Severity:** must. Needs James's nod.  
  **Quote:** `{ name: "It ends on a verdict, not a recap", def: "The last paragraph does not restate the argument. It names what is left once the evidence is on the table, in a few words, and lets you carry it out of the room with you." }`  
  **Tell:** rulebook leakage  
  **Why:** This is the editorial style guide printed as page copy: 'verdict', 'evidence', 'does not restate', 'carry it out'. The brief names any use of 'verdict' in prose as an AI tell. A writer does not tell a reader how his last paragraphs work.  
  **Replacement:** `{ name: "It doesn't end with a summary", def: "I don't wrap things up at the end. The last paragraph says what's still true after everything else has been said, and I leave it with you." }`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Hero credentials block  
  **Severity:** must. Needs James's nod.  
  **Quote:** `Lead Pastor, First Baptist Church of Fenton<br />`  
  **Tell:** states his title  
  **Why:** The rule James confirmed is never to state his title. His own story paragraph below says it the way he would: 'I pastor a church in Fenton, Michigan'.  
  **Replacement:** `Pastor in Fenton, Michigan<br />`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Hero credentials block  
  **Severity:** must. Needs James's nod.  
  **Quote:** `Author of {SITE_STATS.bookCount} books`  
  **Tell:** states a book count; contradicts /books  
  **Why:** Renders 'Author of 21 books' while /books says 'Three books. Every word mine.' and explains the rest were taken down to be rewritten. A skeptic who reads both pages will conclude one of them isn't true.  
  **Replacement:** `Author`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-church, paragraph 4  
  **Severity:** must. Needs James's nod.  
  **Quote:** `The rest of it is writing. {SITE_STATS.bookCount} books so far, on theology, church history, justice, marriage, parenting, and the slow unglamorous business of following Jesus over a long stretch of time.`  
  **Tell:** states a book count; contradicts /books  
  **Why:** Second statement of '21 books' on the page.  
  **Replacement:** `The rest of it is writing. Books on theology, church history, justice, marriage, parenting, and the slow unglamorous business of following Jesus over a long stretch of time.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-heart, paragraph 2  
  **Severity:** should.  
  **Quote:** `which means the faith has to be commended the old way — argued honestly, lived visibly, offered without pressure.`  
  **Tell:** em-dash plus tidy adverb triplet  
  **Why:** Dash-then-three-matched-phrases (verb + adverb, verb + adverb, verb + phrase) is the most recognisable machine cadence on the page, and 'honestly' certifies itself.  
  **Replacement:** `which means the faith has to be commended the old way. It has to be argued, lived where people can see it, and offered without pressure.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-heart, paragraph 3  
  **Severity:** should.  
  **Quote:** `I want the historic faith — the creed, the cross, the resurrection, the kingdom — held out in ordinary language`  
  **Tell:** paired em-dashes  
  **Why:** A dash-bracketed list in the middle of a sentence; the same construction appears seven more times across the library.  
  **Replacement:** `I want the historic faith (the creed, the cross, the resurrection, the kingdom) held out in ordinary language`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-heart, paragraph 3, last sentence  
  **Severity:** should.  
  **Quote:** `because it is visibly holding him up — not because it is his product.`  
  **Tell:** em-dash into a 'not X' antithesis closer  
  **Why:** The paragraph ends on a dash-and-reversal, the fourth antithesis in this one band.  
  **Replacement:** `because it's visibly holding him up, not because it's his product.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Closing paragraph  
  **Severity:** should.  
  **Quote:** `You may still be deciding whether to trust the voice. That is the right instinct, and you should keep it. The writing will either carry weight for you or it will not, and I would rather you find that out for yourself than be talked into it. Begin where you actually are.`  
  **Tell:** brand language ('the voice', 'carry weight'); no contractions; imperative pillow closer  
  **Why:** 'The voice' is how an editor talks about James, not how he talks about himself. 'Carry weight' is the brand phrase, and 'Begin where you actually are' is an embroidered closer added after the paragraph has already ended well.  
  **Replacement:** `You may still be deciding whether to trust me. That's the right instinct, and you should keep it. The writing will either hold up for you or it won't, and I'd rather you find that out for yourself than be talked into it.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-church, paragraph 3 (ENDS)  
  **Severity:** should.  
  **Quote:** `Not to send Americans to do their work for them, and not to hand them a translated version of our assumptions. To put real training in the hands of the men already there, who already know the language and the terrain and the cost, and who will still be there long after any visitor has gone home.`  
  **Tell:** 'Not X, and not Y. To Z.' fragment stack; 'real'  
  **Why:** Two verbless fragments in the 'Not / not / To' pattern. The thought is his and worth keeping; it only needs subjects and verbs.  
  **Replacement:** `The aim isn't to send Americans to do their work for them or to hand them a translated version of our assumptions. It's to put training in the hands of the men already there, who know the language and the terrain and the cost, and who will still be there long after any visitor has gone home.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** HubGroup elsewhere, lede  
  **Severity:** should.  
  **Quote:** `Same voice, different rooms.`  
  **Tell:** four-word balanced epigram  
  **Why:** A two-beat closer of the kind the brief bans at paragraph ends.  
  **Replacement:** `It's the same person in each place.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-heart, paragraph 1  
  **Severity:** should.  
  **Quote:** `LiveWell is for the person whose faith has grown larger than the answers they were handed as a child. For the pastor who is quietly running on empty. For the husband and wife still keeping a promise they are no longer sure they understand. For the skeptic who keeps reading the words of a faith they have not decided to trust.`  
  **Tell:** anaphora run as fragments ('For the ... For the ... For the ...')  
  **Why:** Three verbless 'For the' fragments. The people named are right and specific; the stack is what sounds generated. One sentence carries all four.  
  **Replacement:** `LiveWell is for the person whose faith has grown larger than the answers they were handed as a child. It's for the pastor who is quietly running on empty, for the husband and wife still keeping a promise they're no longer sure they understand, and for the skeptic who keeps reading the words of a faith they haven't decided to trust.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-church, paragraph 4  
  **Severity:** should.  
  **Quote:** `It is really all one project: taking the depth of theology and putting it back in contact with the weight of an ordinary life.`  
  **Tell:** colon-then-reveal; brand tagline restated  
  **Why:** The site tagline ('the depth of theology ... the weight of everyday life') recited as the paragraph's closing reveal.  
  **Replacement:** `It's all one project, really. I'm trying to put theology back in contact with ordinary life.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-writing, item 2  
  **Severity:** should. Needs James's nod.  
  **Quote:** `{ name: "The writer is inside it", def: "When a piece names what the church has gotten wrong, I am part of the church that got it wrong. When it names what pastors tend to hide, I am a pastor who has hidden it. I am not pointing from across the room." }`  
  **Tell:** rulebook leakage; self-implication announced; restating closer  
  **Why:** The brief asks that he implicate himself 'by doing it, not by announcing it'. The heading speaks of 'the writer' in the third person, and the last sentence restates the two before it as a slogan.  
  **Replacement:** `{ name: "I'm inside it", def: "When a piece names what the church has gotten wrong, I'm part of the church that got it wrong. When it names what pastors tend to hide, I'm a pastor who has hidden it." }`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-church, paragraph 2  
  **Severity:** should. Needs James's nod.  
  **Quote:** `PCN now connects nearly eighteen thousand pastors to each other and to resources built by someone who knows that particular weight from the inside, because when the man up front quietly comes apart on a Saturday night, a whole congregation feels it on Sunday morning.`  
  **Tell:** statistic as credential; self-reference in third person; PCN promotion  
  **Why:** An unverified round number used as a credential, and 'someone who knows that particular weight from the inside' is James praising James in the third person. James has also asked (2026-11-17) that the Pastors Connection Network be kept outside this site.  
  **Replacement:** `PCN connects pastors to each other, because when the man up front quietly comes apart on a Saturday night, a whole congregation feels it on Sunday morning.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** SEOMeta description  
  **Severity:** should. Needs James's nod.  
  **Quote:** `Pastor, author, and founder. Twelve years at First Baptist Church of Fenton, the Pastors Connection Network, and ENDS, equipping pastors in remote regions.`  
  **Tell:** credential fragment list; years in ministry; PCN  
  **Why:** A résumé in fragments: this is what shows under the About link in search results.  
  **Replacement:** `James Bell pastors a church in Fenton, Michigan, and writes about following Jesus in post-Christian America.`

- **File:** `/home/user/Livewell-/client/src/pages/About.tsx`  
  **Where:** Band about-heart, paragraph 3 opening  
  **Severity:** consider.  
  **Quote:** `What I want is simple to say and long to do.`  
  **Tell:** balanced two-beat opener  
  **Why:** 'Simple to say / long to do' is symmetry for its own sake; the list that follows makes the point.  
  **Replacement:** `What I want is simple to say.`

### `/home/user/Livewell-/client/src/lib/bookShelf.ts`

- **File:** `/home/user/Livewell-/client/src/lib/bookShelf.ts`  
  **Where:** BOOK_SHELF[when-god-bless-america].blurb  
  **Severity:** should.  
  **Quote:** `A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary. Not a case for the other party. A case for the kingdom that does not run for office.`  
  **Tell:** em-dash, 'from/from/from' triplet, fragment antithesis  
  **Why:** Three stacked devices in two lines: a dash, an anaphoric triplet, then a 'Not X. Y.' pair made of fragments. This card shows on /books and the home page.  
  **Replacement:** `A pastor's critique of political idolatry in the American church, drawn from Scripture, from church history, and from inside the sanctuary. It doesn't make a case for the other party. It makes a case for the kingdom that does not run for office.`

- **File:** `/home/user/Livewell-/client/src/lib/bookShelf.ts`  
  **Where:** BOOK_SHELF[believe].blurb  
  **Severity:** should.  
  **Quote:** `Rational answers to the hardest questions skeptics ask — God, the Bible, the resurrection, suffering, hell — from a pastor who spent years on the other side of the argument and remembers what it sounds like from there.`  
  **Tell:** paired em-dashes  
  **Why:** Dash-bracketed list. The second half of the sentence is good and his; only the punctuation is the tell.  
  **Replacement:** `Rational answers to the hardest questions skeptics ask about God, the Bible, the resurrection, suffering, and hell, from a pastor who spent years on the other side of the argument and remembers what it sounds like from there.`

### `/home/user/Livewell-/client/src/pages/WhenGodBlessAmerica.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/WhenGodBlessAmerica.tsx`  
  **Where:** PITCH paragraph 1  
  **Severity:** must.  
  **Quote:** `In a time of political panic, rising tribalism, and growing confusion inside the church, many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith remains. The rituals remain. The worship remains. But the heart has moved.`  
  **Tell:** 'In a time of' opener; two tidy triplets; anaphora stack with a turn  
  **Why:** Opens with a cousin of the forbidden 'in today's world' and an adjective-noun triplet (political panic, rising tribalism, growing confusion), then a second triplet (power, policy, national strength), then 'X remains. Y remain. Z remains. But ...'. Every sentence is a formula.  
  **Replacement:** `Many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith is still there, and so are the rituals and the worship, but the heart has moved.`

- **File:** `/home/user/Livewell-/client/src/pages/WhenGodBlessAmerica.tsx`  
  **Where:** PITCH paragraph 2  
  **Severity:** should.  
  **Quote:** `as a pastor inside it — from Scripture, from church history, and from what he has watched happen in his own sanctuary.`  
  **Tell:** em-dash plus 'from/from/from' triplet  
  **Why:** The same dash-and-triplet as the shelf blurb, repeated a few inches lower on the same page.  
  **Replacement:** `as a pastor inside it, drawing on Scripture, church history, and what he has watched happen in his own sanctuary.`

- **File:** `/home/user/Livewell-/client/src/pages/WhenGodBlessAmerica.tsx`  
  **Where:** BUY + BIO paragraph  
  **Severity:** should.  
  **Quote:** `$8.99 for the complete ebook — EPUB for your e-reader and PDF for everything else, delivered the moment you check out.`  
  **Tell:** em-dash (stamped on all three book pages)  
  **Why:** Identical sentence with the same dash on all three book pages.  
  **Replacement:** `$8.99 for the complete ebook: an EPUB for your e-reader and a PDF for everything else, delivered the moment you check out.`

- **File:** `/home/user/Livewell-/client/src/pages/WhenGodBlessAmerica.tsx`  
  **Where:** PITCH closing line  
  **Severity:** should.  
  **Quote:** `This is not a book about who to vote for. It is a book about who you worship.`  
  **Tell:** 'It is not X. It is Y.' used twice in one pitch  
  **Why:** The pitch opens with the same construction ('not mainly being persecuted. It is being seduced'), which is the book's real thesis and should keep it. Twice in 120 words is a tic.  
  **Replacement:** `This book won't tell you who to vote for. It asks who you worship.`

- **File:** `/home/user/Livewell-/client/src/pages/WhenGodBlessAmerica.tsx`  
  **Where:** SEOMeta description  
  **Severity:** consider.  
  **Quote:** `A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary. Available now as an ebook.`  
  **Tell:** em-dash  
  **Why:** Same dash as the shelf blurb; this is the line that shows in search results and link previews.  
  **Replacement:** `A pastor's critique of political idolatry in the American church, drawn from Scripture, from church history, and from inside the sanctuary. Available now as an ebook.`

- **File:** `/home/user/Livewell-/client/src/pages/WhenGodBlessAmerica.tsx`  
  **Where:** CONTENTS h2  
  **Severity:** consider.  
  **Quote:** `Thirteen movements, from Hosea to the cross`  
  **Tell:** formula heading  
  **Why:** Same template; 'movements' is editorial vocabulary for chapters.  
  **Replacement:** `What's in the book`

### `/home/user/Livewell-/client/src/pages/Believe.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** PITCH paragraph 2  
  **Severity:** must.  
  **Quote:** `He does not flinch and he does not flatter. Every objection gets its strongest form before it gets an answer. The atheists are quoted at their most formidable, not their most convenient. This is apologetics written from inside the doubt, by a man who once stood outside the faith and walked away — until the evidence walked after him.`  
  **Tell:** symmetrical pair, rulebook leakage, antithesis, em-dash, chiasmus closer, biography beyond the confirmed facts  
  **Why:** The most machine-sounding paragraph in the library. Four sentences, four devices: an alliterative balanced pair (flinch/flatter), the editorial steelman rule stated as a selling point, a 'most X, not most Y' antithesis, and a chiastic closer (walked away / walked after) hung on a dash. 'Stood outside the faith and walked away' also implies he once left the faith, which is not in the confirmed biography (he came to faith as an adult from atheism).  
  **Replacement:** `Every objection is stated the way the people who hold it would state it, and the atheists are quoted at their strongest. The book was written by a man who was an atheist before he was a Christian and still remembers how the objections sound from that side.`

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** BUY + BIO paragraph  
  **Severity:** must. Needs James's nod.  
  **Quote:** `James Bell is the Lead Pastor of First Baptist Church of Fenton, founder of the Pastors Connection Network, and the author of more than twenty books.`  
  **Tell:** states title and book count; PCN  
  **Why:** Same sentence, hardcoded on the Believe page.  
  **Replacement:** `James Bell is a pastor in Fenton, Michigan.`

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** BUY + BIO paragraph  
  **Severity:** should.  
  **Quote:** `$8.99 for the complete ebook — EPUB for your e-reader and PDF for everything else, delivered the moment you check out.`  
  **Tell:** em-dash (stamped on all three book pages)  
  **Why:** Identical sentence with the same dash on all three book pages.  
  **Replacement:** `$8.99 for the complete ebook: an EPUB for your e-reader and a PDF for everything else, delivered the moment you check out.`

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** PITCH paragraph 1  
  **Severity:** should.  
  **Quote:** `the answers they were handed in church — and for the skeptic who suspects`  
  **Tell:** em-dash as clause connector  
  **Why:** Dash used where a comma does the job.  
  **Replacement:** `the answers they were handed in church, and for the skeptic who suspects`

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** PITCH hook  
  **Severity:** should. Needs James's nod.  
  **Quote:** `He came to faith from atheism. He did not arrive by feeling his way there.`  
  **Tell:** biography as credential; antithesis  
  **Why:** The biography is the headline, used as the reason to buy, and the second sentence is a negation set up only to be knocked down.  
  **Replacement:** `James Bell came to faith from atheism, and he got there by argument more than by feeling.`

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** PITCH closing line  
  **Severity:** should.  
  **Quote:** `It is not a book that asks you to stop thinking. It is a book that asks you to keep going.`  
  **Tell:** 'It is not X. It is Y.' closer  
  **Why:** The fifth antithesis in three short paragraphs. Shortened and contracted it can stay as the one earned turn.  
  **Replacement:** `It doesn't ask you to stop thinking. It asks you to keep going.`

- **File:** `/home/user/Livewell-/client/src/pages/Believe.tsx`  
  **Where:** CONTENTS h2  
  **Severity:** consider.  
  **Quote:** `Twelve questions, from the cosmos to the cross`  
  **Tell:** formula heading (alliterative 'from X to Y')  
  **Why:** The same 'N things, from X to the cross' template heads two book pages. Headings are meant to be plain.  
  **Replacement:** `The twelve questions`

### `/home/user/Livewell-/client/src/pages/TheMonsterInTheMirror.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/TheMonsterInTheMirror.tsx`  
  **Where:** BUY + BIO paragraph  
  **Severity:** should.  
  **Quote:** `$8.99 for the complete ebook — EPUB for your e-reader and PDF for everything else, delivered the moment you check out.`  
  **Tell:** em-dash (stamped on all three book pages)  
  **Why:** Identical sentence with the same dash on all three book pages.  
  **Replacement:** `$8.99 for the complete ebook: an EPUB for your e-reader and a PDF for everything else, delivered the moment you check out.`

- **File:** `/home/user/Livewell-/client/src/pages/TheMonsterInTheMirror.tsx`  
  **Where:** PITCH paragraph 2  
  **Severity:** should.  
  **Quote:** `This is a book about reading Scripture against yourself — testing the conclusions you already hold instead of arming them, and learning to tell the difference`  
  **Tell:** em-dash then explanation  
  **Why:** Dash-then-gloss. The content is his; the hinge is the tell.  
  **Replacement:** `This is a book about reading Scripture against yourself. That means testing the conclusions you already hold instead of arming them, and learning to tell the difference`

- **File:** `/home/user/Livewell-/client/src/pages/TheMonsterInTheMirror.tsx`  
  **Where:** PITCH paragraph 1  
  **Severity:** should.  
  **Quote:** `turns it back on the reader: the question is not whether earlier generations were blind, but where ours is.`  
  **Tell:** colon-then-reveal into 'not X, but Y'  
  **Why:** The pitch already opens ('was not a monster. That is the point.') and closes ('is not the past. It is the face looking back.') on antithesis. This middle one is the one to lose.  
  **Replacement:** `turns it back on the reader, who has to ask where our own generation is blind.`

### `/home/user/Livewell-/client/src/pages/EmailSignup.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/EmailSignup.tsx`  
  **Where:** SegmentedSignup title prop  
  **Severity:** should.  
  **Quote:** `Subscribe — and tell us where you're standing`  
  **Tell:** em-dash; 'us' on a one-man site  
  **Why:** A dash in a form heading, and 'us' where every other page says James writes alone.  
  **Replacement:** `Subscribe, and tell me where you're standing`

- **File:** `/home/user/Livewell-/client/src/pages/EmailSignup.tsx`  
  **Where:** SEOMeta description  
  **Severity:** should.  
  **Quote:** `One serious essay a week, chosen for where you actually are — skeptic, doubter, pastor, or seeker. Plus self-paced reading paths through the whole library.`  
  **Tell:** em-dash, 'actually', stale claim  
  **Why:** Dash plus the 'where you actually are' stamp. It also promises reading paths 'through the whole library', which the page no longer offers (it links a short shelf of essays).  
  **Replacement:** `One serious essay a week, with the first one chosen for where you are: skeptic, doubter, pastor, or seeker. The essays on the site are open to read at your own pace.`

- **File:** `/home/user/Livewell-/client/src/pages/EmailSignup.tsx`  
  **Where:** Hero paragraph  
  **Severity:** should.  
  **Quote:** `parenting, and doubt. Tell us who you are and the first essay you get`  
  **Tell:** 'us' on a one-man site  
  **Why:** The home page says 'I'm James Bell'; the subscribe page says 'us'. A person wrote one of them.  
  **Replacement:** `parenting, and doubt. Tell me who you are and the first essay you get`

### `/home/user/Livewell-/client/src/pages/Family.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** StatementBand (eyebrow 'The oldest classroom')  
  **Severity:** must.  
  **Quote:** `The faith is handed down on purpose, at the table, or it is not handed down at all.`  
  **Tell:** pillow aphorism; overclaim  
  **Why:** A display-size absolute ('or not at all') that is false on its face for the reader this site is written toward: James himself was raised without a father and came to faith as an adult. It reads as a slogan, and to a single parent or a convert it reads as a verdict on them.  
  **Replacement:** `The faith gets handed down on purpose, usually at a table, by the people a child lives with.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** SectionHead Parenting intro  
  **Severity:** must.  
  **Quote:** `The work no one applauds, done where no congregation watches. Scripture for the real moments, plus writing and tools for the long obedience of raising children who can carry weight.`  
  **Tell:** literary fragment; 'real moments'; borrowed stock phrase; brand motif  
  **Why:** A balanced verbless opener ('no one applauds / no congregation watches'), then 'the long obedience' (Eugene Peterson's phrase, uncredited) and the brand's 'carry weight'. Nothing here is a thing James would say to a tired parent across a table.  
  **Replacement:** `Most of parenting happens where nobody sees it. Here is Scripture for the hard moments, plus writing and tools for the long work of raising children.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** CardGrid Parenting, /tools/parenting-verses dek  
  **Severity:** should.  
  **Quote:** `Scripture for fear, anger, identity, obedience, screens, and doubt — each with a short note for the parent.`  
  **Tell:** em-dash  
  **Why:** Dash where a comma belongs.  
  **Replacement:** `Scripture for fear, anger, identity, obedience, screens, and doubt, each with a short note for the parent.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** CardGrid Tools, /tools/verse-finder dek  
  **Severity:** should.  
  **Quote:** `Find Scripture for any season — anxiety, grief, hope, courage — and share it.`  
  **Tell:** paired em-dashes  
  **Why:** Dash-bracketed list.  
  **Replacement:** `Find Scripture for anxiety, grief, hope, or courage, and share it.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** CardGrid Why we believe, /answers dek  
  **Severity:** should.  
  **Quote:** `Doubt is not the enemy of faith. Short, honest answers to the questions.`  
  **Tell:** pillow aphorism; 'honest'  
  **Why:** 'Doubt is not the enemy of faith' could run on any church's page unchanged, and the answers certify themselves.  
  **Replacement:** `Short answers to the questions people ask when they doubt.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** PullQuote  
  **Severity:** should.  
  **Quote:** `<PullQuote>The household is the first church a child ever attends.</PullQuote>`  
  **Tell:** pillow aphorism set as a pull quote  
  **Why:** Could be printed on a church-lobby canvas unchanged. It is the second display-size epigram on the page and adds nothing the sections around it do not say.  
  **Replacement:** `(delete; no replacement text)`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** Catechism card paragraph  
  **Severity:** should.  
  **Quote:** `The oldest way a family has ever learned the faith.`  
  **Tell:** superlative fragment closer; unverifiable claim  
  **Why:** A verbless superlative ('oldest ... ever') tacked on as a closer. The claim cannot be checked.  
  **Replacement:** `Families have learned the faith by question and answer for centuries.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** SectionHead Marriage intro  
  **Severity:** should.  
  **Quote:** `A home is built on a covenant before it is built on anything else. Writing and a real assessment for the marriage your family is standing on.`  
  **Tell:** aphorism opener; 'real'  
  **Why:** 'X before it is anything else' is a template sentence, and 'a real assessment' implies others are fake.  
  **Replacement:** `Your family stands on your marriage, so start there. Writing and a self-check for the marriage your family is standing on.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** SectionHead Why we believe intro  
  **Severity:** should.  
  **Quote:** `Faith does not survive on what alone. A teenager needs the why. Honest answers to the hard questions — the resurrection, the Bible, suffering, science, other religions, and doubt itself.`  
  **Tell:** clever what/why wordplay; 'honest'; em-dash  
  **Why:** The what/why turn is wordplay that needs a second read, followed by self-certified 'honest answers' and a dash list.  
  **Replacement:** `A teenager needs to know why we believe, and knowing what we believe isn't enough. Answers to the hard questions about the resurrection, the Bible, suffering, science, other religions, and doubt.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** CardGrid Tools, rule of life dek  
  **Severity:** consider.  
  **Quote:** `Build a sustainable rhythm of prayer, Scripture, rest, community, and mission you can actually keep.`  
  **Tell:** 'actually'; corporate 'sustainable'  
  **Why:** Wellness-app wording.  
  **Replacement:** `Build a rhythm of prayer, Scripture, rest, community, and mission that you can keep.`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** PageHead title  
  **Severity:** consider.  
  **Quote:** `Disciple your whole family, in one place.`  
  **Tell:** generic church-site headline  
  **Why:** Could head any ministry's family page. The lede under it ('Devotions you can actually do with your kids') is the human line.  
  **Replacement:** `Devotions, a catechism, and reading plans for your family`

- **File:** `/home/user/Livewell-/client/src/pages/Family.tsx`  
  **Where:** PageHead lede  
  **Severity:** consider.  
  **Quote:** `Devotions you can actually do with your kids.`  
  **Tell:** 'actually'  
  **Why:** Light; the sentence is right without the intensifier.  
  **Replacement:** `Devotions you can do with your kids tonight.`

### `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/test-the-case].description  
  **Severity:** must.  
  **Quote:** `At every step you can push back with the objection you actually hold and get the honest answer, including what it does not prove. Argued with, not preached at. No altar call.`  
  **Tell:** 'honest' self-certifying; 'actually'; antithesis fragment; fragment stack; rulebook leakage  
  **Why:** Five tells in three lines. 'The honest answer' vouches for itself, 'Argued with, not preached at' is a slogan, and 'No altar call' is lifted from the site's own editorial rules. A skeptic hears a pitch.  
  **Replacement:** `At every step you can push back with the objection you hold and see the answer, including what the argument does not prove. Nobody asks you for a decision at the end.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/rule-of-life].description  
  **Severity:** must.  
  **Quote:** `A rule of life is not a performance contract. It is a trellis. Choose sustainable practices across prayer, Scripture, rest, community, mission, and the body, and settle on a pattern you can actually keep on an ordinary week.`  
  **Tell:** 'It is not X. It is Y.' with a stock metaphor; 'sustainable'; 'actually'  
  **Why:** The trellis line is the standard rule-of-life metaphor from every book on the subject, delivered in the exact 'not X. It is Y.' shape. Generic Christian content.  
  **Replacement:** `A rule of life is a trellis, something to grow along. Choose practices across prayer, Scripture, rest, community, mission, and the body, and settle on a pattern you can keep on an ordinary week.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/financial-health].description  
  **Severity:** should.  
  **Quote:** `family provision — and what your answers say about who you believe owns what you have.`  
  **Tell:** em-dash  
  **Why:** Dash as connector.  
  **Replacement:** `family provision, and what your answers say about who you believe owns what you have.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/parenting-verses].description  
  **Severity:** should.  
  **Quote:** `Scripture for the real moments of parenting — fear, anger, identity, obedience, screens, doubt — each with a short, honest note for the parent.`  
  **Tell:** paired em-dashes, 'real', 'honest'  
  **Why:** Three tells in one line: two dashes, 'real moments', and a note that calls itself honest.  
  **Replacement:** `Scripture for fear, anger, identity, obedience, screens, and doubt, each with a short note for the parent.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/quotes].description  
  **Severity:** should.  
  **Quote:** `filed by conviction, comfort, challenge, history, and wisdom — each tied to the piece it came from. Copy one, share one, follow one home.`  
  **Tell:** em-dash; 'one, one, one' triplet closer  
  **Why:** A dash and then a three-beat imperative closer ('Copy one, share one, follow one home') that scans like ad copy.  
  **Replacement:** `filed by conviction, comfort, challenge, history, and wisdom. Each is tied to the piece it came from, so you can copy it, share it, or go read the whole thing.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/glossary].description  
  **Severity:** should.  
  **Quote:** `The working vocabulary of serious faith — justification, atonement, sanctification and the rest — defined plainly, searchable, without the seminary fee.`  
  **Tell:** paired em-dashes; quip closer  
  **Why:** Dash-bracketed list and a closing quip ('without the seminary fee') that is cleverness for its own sake.  
  **Replacement:** `The words the church uses (justification, atonement, sanctification and the rest), defined plainly and searchable.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/disruption/consistency].description  
  **Severity:** should.  
  **Quote:** `A searching self-examination of whether you defend truth selectively — one standard for your own side, another for your opponents. A mirror, not a weapon, and explicitly not for scoring anyone else.`  
  **Tell:** em-dash; 'A mirror, not a weapon' epigram  
  **Why:** Dash, balanced pair, then a four-word epigram. 'Explicitly' is the copy describing its own rule.  
  **Replacement:** `A self-examination of whether you defend truth selectively, with one standard for your own side and another for your opponents. It's for looking at yourself. Please don't use it to score anyone else.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/nation/policy].description  
  **Severity:** should.  
  **Quote:** `The Year of Jubilee, gleaning, the warning against kings — what Scripture's own economic principles might look like as policy, and why both parties would hate the result.`  
  **Tell:** em-dash  
  **Why:** Dash as the hinge. The last clause is good and should stay.  
  **Replacement:** `The Year of Jubilee, gleaning, and the warning against kings: what Scripture's own economic principles might look like as policy, and why both parties would hate the result.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/which-lens].description  
  **Severity:** should.  
  **Quote:** `Thirteen honest choices. Five lenses that do a reader's thinking before the reader does: the flag, the cause, the highlighter, the rearview, the marketplace. It ends not in a score but in a name for the lens it found and the reading that takes it apart.`  
  **Tell:** 'honest'; fragment stack; 'not X but Y'  
  **Why:** Two number-led fragments, 'honest' as a filler adjective, and a 'not in a score but in a name' antithesis.  
  **Replacement:** `Thirteen choices that show which of five lenses does your thinking before you do: the flag, the cause, the highlighter, the rearview, the marketplace. There's no score at the end. You get the name of the lens it found and the reading that takes it apart.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/diagnostic].description  
  **Severity:** should.  
  **Quote:** `Eight honest questions across four areas: where you are with God right now, without the church answer.`  
  **Tell:** 'honest' self-certifying  
  **Why:** 'Honest' appears 8 times in this one file. Questions are not honest; answers are.  
  **Replacement:** `Eight questions across four areas about where you are with God right now, without the church answer.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/life/assessment].description  
  **Severity:** should.  
  **Quote:** `Thirty honest statements across`  
  **Tell:** 'honest' self-certifying  
  **Why:** Same stamp, next card down.  
  **Replacement:** `Thirty statements across`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/nation/scorecard].description  
  **Severity:** should.  
  **Quote:** `An honest tally that lands where the evidence puts it, not where either side would like.`  
  **Tell:** 'honest' self-certifying; 'not where' antithesis  
  **Why:** On the one tool where a reader will test the claim of fairness, the copy asserts it instead of letting the tally show it.  
  **Replacement:** `A tally that lands where the evidence puts it, whichever side that disappoints.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** Hero h1  
  **Severity:** should.  
  **Quote:** `Tools for the Life You Are <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>Actually</em> Living`  
  **Tell:** 'actually' as brand stamp; literary heading  
  **Why:** The page's largest words italicise the library's most over-used filler. Headings are meant to be plain.  
  **Replacement:** `Tools you can use this week`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** Hero paragraph  
  **Severity:** should.  
  **Quote:** `Built for marriages, for households, for anyone who takes the faith seriously enough to practice it on a Tuesday.`  
  **Tell:** 'for/for/for' triplet; Tuesday motif  
  **Why:** Anaphoric triplet ending on the Tuesday stamp, which also appears on /speaking, /resources, /about and in the pastors' pitch.  
  **Replacement:** `Built for marriages, households, and anyone who wants to practice the faith in an ordinary week.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/deep-bible].description  
  **Severity:** should.  
  **Quote:** `Seminary-level depth in kitchen-table language. 20 books of the Bible with 6 layers of analysis:`  
  **Tell:** balanced slogan; feature-sheet numerals  
  **Why:** 'Seminary-level depth in kitchen-table language' is a tagline in the X-in-Y shape, followed by '20 books ... 6 layers' in product-spec numerals.  
  **Replacement:** `Twenty books of the Bible in plain language, each with six layers of analysis:`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[misused verses].title  
  **Severity:** consider.  
  **Quote:** `Misused Verses — What the Bible Actually Says`  
  **Tell:** em-dash in a heading; 'Actually'  
  **Why:** A dash and the 'actually' stamp in one title.  
  **Replacement:** `Misused Verses: What the Bible Says`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** SEOMeta description  
  **Severity:** consider.  
  **Quote:** `built for the week you are actually living.`  
  **Tell:** 'the week you are actually living' stamp  
  **Why:** The same phrase is the home page newsletter line and this page's headline.  
  **Replacement:** `built for an ordinary week.`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/tools/marriage-assessment].description  
  **Severity:** consider.  
  **Quote:** `Not a quiz. Fifteen questions across`  
  **Tell:** 'Not X.' fragment opener  
  **Why:** Defensive fragment before the description starts.  
  **Replacement:** `Fifteen questions across`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[/wisdom].description  
  **Severity:** consider.  
  **Quote:** `The front door to Scripture's wisdom for the place no rule reaches:`  
  **Tell:** literary image where a plain phrase belongs  
  **Why:** 'The place no rule reaches' is a fresh literary image on a link card.  
  **Replacement:** `Where to start with Scripture's wisdom for the situations no rule covers:`

- **File:** `/home/user/Livewell-/client/src/pages/ToolsHub.tsx`  
  **Where:** TOOLS[misused verses].description  
  **Severity:** consider.  
  **Quote:** ` The deepest verse tool on the site.`  
  **Tell:** self-praise fragment  
  **Why:** A superlative about the site's own tool, as a verbless closer.  
  **Replacement:** `(delete; no replacement text)`

### `/home/user/Livewell-/client/src/pages/Resources.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/Resources.tsx`  
  **Where:** HubGroup tools, Which Lens note  
  **Severity:** should.  
  **Quote:** `Thirteen honest choices that show which lens is doing your reading of Scripture before you do.`  
  **Tell:** 'honest' self-certifying  
  **Why:** Same stamp carried over from the tools page.  
  **Replacement:** `Thirteen choices that show which lens is reading Scripture for you.`

- **File:** `/home/user/Livewell-/client/src/pages/Resources.tsx`  
  **Where:** HubGroup tools, self-checks note  
  **Severity:** should.  
  **Quote:** `Honest questions about faith, the whole of life, marriage, emotional and financial health, and belief. None of them grades you.`  
  **Tell:** 'honest' self-certifying  
  **Why:** Third 'honest' on this page.  
  **Replacement:** `Questions about faith, the whole of life, marriage, emotional and financial health, and belief. None of them grades you.`

- **File:** `/home/user/Livewell-/client/src/pages/Resources.tsx`  
  **Where:** HubGroup tools, lede  
  **Severity:** should.  
  **Quote:** `Built to be used on a Tuesday, not admired on a Sunday.`  
  **Tell:** balanced antithesis slogan; Tuesday motif  
  **Why:** A perfectly symmetrical two-beat line (used/admired, Tuesday/Sunday). It is the kind of sentence a model writes to sound like a brand.  
  **Replacement:** `Things to use during the week.`

- **File:** `/home/user/Livewell-/client/src/pages/Resources.tsx`  
  **Where:** HubGroup help, plans note  
  **Severity:** consider.  
  **Quote:** `One practice, one reading, one tool, and one honest question each week`  
  **Tell:** 'honest' self-certifying  
  **Why:** The adjective breaks an otherwise plain list.  
  **Replacement:** `One practice, one reading, one tool, and one question each week`

- **File:** `/home/user/Livewell-/client/src/pages/Resources.tsx`  
  **Where:** HubGroup tools, Test the Case note  
  **Severity:** consider.  
  **Quote:** `with room to push back with the objection you actually hold.`  
  **Tell:** 'actually'  
  **Why:** Filler intensifier.  
  **Replacement:** `with room to push back with your own objection.`

- **File:** `/home/user/Livewell-/client/src/pages/Resources.tsx`  
  **Where:** HubGroup families, lede  
  **Severity:** consider.  
  **Quote:** `For the table where most faith is actually handed on.`  
  **Tell:** 'actually'; unsupported generalisation  
  **Why:** 'Most faith' is a claim with nothing under it, propped up by 'actually'.  
  **Replacement:** `For your own table.`

- **File:** `/home/user/Livewell-/client/src/pages/Resources.tsx`  
  **Where:** HubGroup help, lede  
  **Severity:** consider.  
  **Quote:** `Eight-week plans walk with you through one season at a time.`  
  **Tell:** church cliché ('walk with you')  
  **Why:** 'Walk with you through a season' is stock devotional phrasing.  
  **Replacement:** `Each eight-week plan takes one hard season at a time.`

### `/home/user/Livewell-/client/src/pages/Study.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/Study.tsx`  
  **Where:** HubGroup church-history, injustice timeline note  
  **Severity:** should.  
  **Quote:** `An honest reckoning with the injustices of history, those done in the name of Christ among them. No one's hands are clean.`  
  **Tell:** 'honest' self-certifying; pillow closer  
  **Why:** 'Honest reckoning' is a stock phrase, and 'No one's hands are clean' is a five-word epigram tacked on a link description.  
  **Replacement:** `A reckoning with the injustices of history, those done in the name of Christ among them.`

- **File:** `/home/user/Livewell-/client/src/pages/Study.tsx`  
  **Where:** HubGroup church-history, witnesses note  
  **Severity:** consider.  
  **Quote:** `honest about their flaws`  
  **Tell:** 'honest' self-certifying  
  **Why:** Second 'honest' in the same list of six links.  
  **Replacement:** `with their flaws left in`

### `/home/user/Livewell-/client/src/pages/Speaking.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/Speaking.tsx`  
  **Where:** ALONGSIDE[Church consulting].desc  
  **Severity:** should.  
  **Quote:** `An honest reading of where it actually is, what has to change, and how to change it without losing the people you are there to serve.`  
  **Tell:** 'honest' + 'actually'  
  **Why:** Both stamps in one clause.  
  **Replacement:** `A plain reading of where the church is, what has to change, and how to change it without losing the people you are there to serve.`

- **File:** `/home/user/Livewell-/client/src/pages/Speaking.tsx`  
  **Where:** Hero subhead  
  **Severity:** should.  
  **Quote:** `Serious theology, preached like it matters on a Tuesday.`  
  **Tell:** Tuesday motif; slogan  
  **Why:** A tagline standing where a description should be; third Tuesday in the library.  
  **Replacement:** `Serious theology, preached plainly.`

### `/home/user/Livewell-/client/src/pages/Home.tsx`

- **File:** `/home/user/Livewell-/client/src/pages/Home.tsx`  
  **Where:** NewsletterSignup description  
  **Severity:** should.  
  **Quote:** `Serious theology, written for the week you are actually living. No filler, no funnel, and you can leave whenever you like.`  
  **Tell:** brand stamp; 'No X, no Y' fragment stack with alliteration  
  **Why:** 'No filler, no funnel' is an alliterative marketing pair. The honest half of the line ('you can leave whenever you like') is the part to keep.  
  **Replacement:** `Serious theology for an ordinary week. Nothing else comes with it, and you can leave whenever you like.`

- **File:** `/home/user/Livewell-/client/src/pages/Home.tsx`  
  **Where:** DOORS[/books].note  
  **Severity:** consider.  
  **Quote:** `The books James wrote himself. The opening of each is free to read.`  
  **Tell:** third person on a first-person page  
  **Why:** Directly under a hero that says 'I'm James Bell'.  
  **Replacement:** `The books I wrote myself. The opening of each is free to read.`

### `/home/user/Livewell-/client/src/lib/site.ts`

- **File:** `/home/user/Livewell-/client/src/lib/site.ts`  
  **Where:** AUTHOR_BIO (shown on two book pages)  
  **Severity:** must. Needs James's nod.  
  **Quote:** `James Bell is the Lead Pastor of First Baptist Church of Fenton, founder of the Pastors Connection Network, and the author of more than twenty books.`  
  **Tell:** states title and book count; PCN  
  **Why:** Title, book count ('more than twenty', a third figure beside '21' and 'three'), and PCN in one sentence at the foot of the book pages.  
  **Replacement:** `James Bell is a pastor in Fenton, Michigan.`

### `/home/user/Livewell-/client/src/components/SegmentedSignup.tsx`

- **File:** `/home/user/Livewell-/client/src/components/SegmentedSignup.tsx`  
  **Where:** AUDIENCES[christian].helper  
  **Severity:** consider.  
  **Quote:** `I want depth, not slogans.`  
  **Tell:** 'X, not Y' epigram  
  **Why:** A slogan about not wanting slogans, rendered on /subscribe.  
  **Replacement:** `I want something with depth.`

### `/home/user/Livewell-/client/src/components/BookNextSteps.tsx`

- **File:** `/home/user/Livewell-/client/src/components/BookNextSteps.tsx`  
  **Where:** NewsletterSignup description  
  **Severity:** should.  
  **Quote:** `One serious essay a week in the same vein — theology that meets the weight of everyday life. No spam, ever.`  
  **Tell:** em-dash; tagline; stock 'No spam, ever'  
  **Why:** Rendered at the foot of all three book pages: a dash, the brand tagline, and the most generic line in email marketing.  
  **Replacement:** `One serious essay a week in the same vein. Nothing else comes with it, and you can leave whenever you like.`

## Not listed individually

Page `<title>` separators and image alt text also use an em-dash (for example `About James Bell — Pastor, Author, Writer`, `Speaking — James Bell`, `Believe — cover`). They are metadata, not prose; if the fixer wants zero em-dashes, swap each ` — ` for `: ` in titles and `, ` in alt text. The About title also lists roles ('Pastor, Author, Writer'); see For James, item 1.
