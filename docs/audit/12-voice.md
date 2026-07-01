# Audit 2.2 — Voice Consistency

**Date:** 2026-07-01
**Scope:** User-facing site copy in `client/src/pages` and `client/src/components` (headlines, taglines, body copy, tool descriptions, CTAs, hero text, empty states). Excluded: book manuscripts in `content/` (audited separately) and admin pages.
**Method:** (1) mechanical grep of the full CLAUDE.md kill list plus exclamation marks in visible strings; (2) close register read of the highest-traffic copy; (3) cross-surface consistency check on book/product descriptions.

## Canon note

The brief references `Bell_Writing_Canon/00_CANON.md` and `Bell_Writing_Canon/04_forbidden-patterns.md`. **No `Bell_Writing_Canon/` directory exists anywhere in this repository** (verified by glob across the tree). This audit therefore uses the actual in-repo canon:

- `/home/user/Livewell-/CLAUDE.md` — Voice & Tone, Forbidden Language, Structural Moves, Worked Voice, punctuation mechanics (the binding source)
- `/home/user/Livewell-/docs/EDITORIAL-CONSTITUTION.md` — editorial mission
- `/home/user/Livewell-/docs/VOICE.md` — thin, and **out of step with CLAUDE.md**: it ranks "thoughtful Christians" as the primary audience where CLAUDE.md ranks skeptics first, and it carries none of the forbidden-language or punctuation mechanics. It should either be updated to defer to CLAUDE.md explicitly or retired. (Low, 15 min.)

**Total violations: 33** — 12 mechanical kill-list/exclamation hits, 21 register, integrity, and consistency findings.

---

## 1. Mechanical sweep — kill-list hits (every hit, quoted)

Clean across all user-facing copy: *delve, tapestry, unpack, multifaceted, holistic, foster, "in today's world," "now more than ever," "here's the thing," "I want to be real with you," "God's got this," "gospel-centered," "authentic community," "hold space," "your truth," "your feelings are valid," "lean into," "here is what I mean," "let me explain," "blessed" as a lifestyle adjective* (every "blessed" hit is verbatim Scripture or doctrinal vocabulary — e.g. beatific vision). That is a genuinely good result for a site this size. The hits that remain:

### Words

| # | File:line | Quote | Severity / effort |
|---|-----------|-------|-------------------|
| 1 | `client/src/pages/tools/TheologyGlossary.tsx:252` | "the church developed more **nuanced** positions" | Medium / 2 min |
| 2 | `client/src/pages/tools/TheologyGlossary.tsx:863` | "A more **nuanced** reading is that kenosis describes not a subtraction…" | Medium / 2 min |
| 3 | `client/src/pages/tools/TheologyGlossary.tsx:282` | "that is precisely when reading becomes genuinely **transformative**." | Medium / 2 min |
| 4 | `client/src/pages/tools/TheologyGlossary.tsx:873` | "a **transformative** communion (life shared)" | Medium / 2 min |
| 5 | `client/src/pages/tools/BibleReference.tsx:636` | "no status to **leverage**. They could only receive." | Medium / 2 min |
| 6 | `client/src/pages/tools/DeepBibleCompanion.tsx:1423` | "He did not **leverage** his position." | Medium / 2 min |
| 7 | `client/src/pages/tools/BibleReference.tsx:348` | "Paul writes to a church **navigating** ethnic and cultural conflict" | Medium / 2 min |
| 8 | `client/src/pages/faq/WhatIsDeconstruction.tsx:45` | "traces one woman's honest **journey** through deconstruction" (metaphorical journey) | Medium / 2 min |

Suggested rewrites (in register):

- #1: "the church settled into harder-won positions: the return is certain but the timing unknown"
- #2: "A more careful reading is that kenosis describes not a subtraction of divinity but a voluntary concealment…"
- #3: "that is precisely when reading starts to change the reader instead of confirming him."
- #4: "a communion that changes what you are (life shared)"
- #5: "no status to spend. They could only receive."
- #6: "He did not spend his position on himself."
- #7: "Paul writes to a church torn along ethnic and cultural lines"
- #8: "traces one woman's honest account of her own deconstruction"

### Therapy-speak

| # | File:line | Quote | Severity / effort |
|---|-----------|-------|-------------------|
| 9 | `client/src/pages/BibleAndHomosexuality.tsx:69` | "Clarity and compassion can occupy the same room. The church just has to **do the work**." (bolded verdict line on a hard-issues funnel page) | **High** / 2 min |
| 10 | `client/src/pages/DiscipleMaking.tsx:106` | "You need a table, a meal, an open chair, and the willingness to keep **showing up**." | High / 2 min |

Rewrites:

- #9: "Clarity and compassion can occupy the same room. The church has to build that room."
- #10: "You need a table, a meal, an open chair, and the willingness to keep coming back to it."

Non-violations worth recording so nobody "fixes" them: literal uses of "do the work" (`ForLeaders.tsx:84` "leaders who do the work nobody sees"; `ParentingGuide.tsx:54` "Let the repetition do the work"; `PrayerGenerator.tsx:17` in a prayer; `LifeAudit.tsx:306` "why I do the work I do") are the plain English phrase, not the therapy idiom, and read correctly. `PassageContext.tsx:421` heading "Now you do the work" is borderline but means study work — acceptable. "Journey Free" (`WhatIsReligiousTrauma.tsx:40`) is an organization's name. "Religious Landscape Study" (`WhyArePeopleLeavingChurch.tsx:15`) is Pew's actual study title. "unlocking keychain leadership" (`WhyDoYoungPeopleLeaveChurch.tsx:40`) paraphrases the Fuller Youth Institute's own six-commitment language — defensible, though "handing young adults the keys" would say it without the banned verb (Low). "This download unlocks only after a completed checkout" (`EbookThankYou.tsx:84`) is the literal mechanism, not hype. "individual authenticity" (`WhyArePeopleLeavingChurch.tsx:25`) names the cultural value under analysis — the expressive-individualism sense — and is doing scholarly work; "emotional authenticity" (`DeepBibleCompanion.tsx:190`) is lazier and could become "emotional honesty" (Low). `leverage` also appears in three code comments (`SegmentedSignup.tsx:4`, `CitationCopy.tsx:9`, `PastorsResourceWall.tsx:4`) — not user-facing, not counted.

### Exclamation marks outside verbatim Scripture

All exclamation marks in the Bible tools (`BibleReference`, `VerseFinder`, `ScriptureMemory`, `ConflictGuide`, `DeepBibleCompanion`, `TheologyGlossary`) sit inside quoted Scripture — checked line by line. Two violations remain:

| # | File:line | Quote | Severity / effort |
|---|-----------|-------|-------------------|
| 11 | `client/src/components/ToolActions.tsx:95` | `{copied ? "Copied!" : "Share"}` | Low / 1 min → "Copied" |
| 12 | `client/src/pages/ReadingPathDetail.tsx:149` | "Check back soon!" (empty state) | Low / 1 min → "More essays are on the way. Check back soon." |

**Side observation (out of strict scope, flagging per the Scholarship Standard):** the Scripture quoted across the tools is NIV, not the ESV that CLAUDE.md names as default ("How good and pleasant it is when God's people live together in unity!" is NIV; ESV reads "Behold, how good and pleasant it is when brothers dwell in unity!"). Either the tools should name their translation or the canon's ESV default should be revisited. (Medium, but a content decision for the author, not an edit.)

---

## 2. Register audit — "pastor at a table" or "brand account"?

### CRITICAL — `client/src/pages/LeadMagnetLanding.tsx` (routed live at `/lead-magnets/:magnetId`)

The single worst page on the site, and it is a conversion surface. Two distinct failures:

**(a) Apparently fabricated testimonials, rendered with five-star ratings** (lines 71–90, rendered at 314–318):

> "Sarah Johnson, Church Planter — 'This audit completely changed how I see my leadership. I discovered blind spots I didn't know I had.'" (5 stars)
> "Michael Chen, Senior Pastor — 'The insights were immediately actionable.'" (5 stars)
> "Lisa Martinez, Ministry Leader — 'Finally, a resource that speaks to the real challenges we face. Highly recommended.'" (5 stars)

Unless these are real, permissioned people (nothing in the repo suggests they are — they sit beside an `expectedConversionRate` field), this is **fabricated authority**, the one trap CLAUDE.md calls "the trap that ends trust, not just a build." On a platform whose entire pitch to skeptics is *we will not handle you*, invented endorsements are brand-fatal. **Fix: delete the testimonial section outright.** Do not rewrite it; nothing invented can be rewritten into honesty. (Effort: 15 min.)

**(b) Clickbait-funnel register throughout the magnet configs** (lines 18–68):

> "The Prophetic Manifesto: 7 Beliefs That Will Change Your Life" … "7 core beliefs that separate people who just exist from people who actually live."
> "Most leaders have no idea if they're actually good at leadership. This 15-question audit reveals your blind spots, your strengths, and exactly what you need to improve."
> "The Community Action Roadmap … From Passion to Impact in 30 Days"

This is the register of a marketing funnel wearing the platform's clothes — manufactured urgency, flattery-and-fix, the "exactly what you need" promise the Formation Standard explicitly refuses. Rewrites:

- *Manifesto title/desc:* "Seven Convictions You Inherited Without Noticing" / "Most of us hold our beliefs the way we hold our accent — picked up, never examined. This short manifesto names seven and asks whether you would still choose them."
- *Leadership audit desc:* "Fifteen questions about the leader you actually are, not the one in the bio. Where you are strong, where you are blind, and the next honest step. It takes ten minutes. It may cost more."
- *Community roadmap subtitle:* drop "From Passion to Impact in 30 Days" → "Seven steps toward your actual neighborhood."

(Effort: 1–2 hrs for the full page including value-props and FAQ polish; the FAQ answers, to their credit, are already close — "Is there a catch?" / "No. It's free." is the right voice.)

### HIGH — `client/src/pages/StartHereQuiz.tsx` results copy (a /start-here surface)

> line 238: "Your Personalized Reading Path"
> line 241: "Based on where you are, here's where to start:"
> line 283: "Go deeper with James Bell's most comprehensive work on this topic."
> line 266: `Read â` — **mojibake**: a broken arrow character renders as "â" next to every article on the results page.

"Personalized" is app-speak; the superlative on line 283 is worse — it is the *same* line for every recommended book, so at most one of them can be true. Third-person "James Bell's" on his own site is the brand-account tell. Rewrites:

- "Your Personalized Reading Path" → "Where to start"
- "Based on where you are, here's where to start:" → "You told us where you are. This is where we would begin."
- "Go deeper with James Bell's most comprehensive work on this topic." → "The book that carries this path's argument to full length."
- Fix the encoding: replace `Read â` with `Read →`.

(Effort: 30 min including the mojibake fix.)

### HIGH — crisis landing pages: uncited statistics

`client/src/pages/landing/Grief.tsx:47–53`:

> "**57%** of grieving adults say the most painful thing was being told to move on before they were ready." / "**1 in 4** grieving Christians say their church made the grief harder, not easier."

`client/src/pages/landing/FaithCrisis.tsx:47–53`:

> "**65%** of young adults raised in church report a season of serious doubt about their faith." / "**1 in 3** adults say they left a church because their questions were not welcome."

No source is named for any of the four, and none is verifiable as stated. The prose around them is genuinely in voice — "Grief is the evidence that you loved something real. These essays sit in the wreckage with you, not above it" and "Doubt is not the opposite of faith. It is the immune system of a faith that refuses to be shallow" are among the best lines on the site — which makes an invented-looking number beside them more corrosive, not less. Under Content Integrity ("if a citation cannot be verified, leave it out rather than invent it"): **source each number (Barna's doubt research could ground the 65% claim if it checks out) or delete the stat blocks and let the prose carry the section.** The pages lose nothing without them. (Effort: 1 hr to verify-or-cut across both pages; `landing/Deconstruction.tsx`'s 40M/29% figures are closer to citable — Pew for the 29% — but should carry their sources too.)

Also noted with care: neither crisis page keeps "a path to real help visible" (no counseling or crisis-line pointer anywhere on `/grief`). That is a Content Integrity & Care requirement, adjacent to voice. (High, 30 min.)

### MEDIUM — `client/src/pages/ToolsHub.tsx` tool-card blurbs (mixed register)

Roughly half the blurbs are in voice ("A rule of life is not a performance contract. It is a trellis." is exactly right; so are Parenting Bible Verses and Proverbs in 31 Days). The other half slide into product-sheet register:

> line 115: "Not a quiz — a real assessment with **actionable recommendations**."
> line 178: "**Your strengths and growth areas identified.**" (passive HR-speak)
> line 171: "Your burnout signature with a **recovery roadmap**."
> line 143: "Scripture-grounded diagnostic with practical next steps." (templated; appears nearly verbatim twice)

Rewrites:

- 115: "Not a quiz. Fifteen questions across communication, intimacy, trust, shared vision, and conflict — and what to do about what you find."
- 178: "It names what is strong and what is slipping."
- 171: "Twenty-four questions across calling, isolation, marriage, and the board. It names the shape of your exhaustion and the way back."
- 143: "Fifteen questions across self-awareness, boundaries, grief, forgiveness, and rest — and where Scripture meets each one."

The hero ("Built for pastors, parents, and anyone who takes faith seriously enough to practice it.") passes. "Use Tool →" as the card CTA is app-speak; "Open it →" is nearer the voice. (Effort: 1 hr.)

### MEDIUM — `client/src/pages/WhenGodBlessAmerica.tsx` (book funnel)

The pitch copy is strong ("American Christianity is not mainly being persecuted. It is being seduced." / "This is not a book about who to vote for. It is a book about who you worship." — textbook Not X. Y.). Two lines fail:

> line 109: "James Bell offers a **bold, biblical, and pastorally grounded** challenge to the church in America."
> SEO description, line 62: "A **bold**, biblical, and pastoral critique of political idolatry…"

Self-praising adjectives are the publisher's voice, not the pastor's. Rewrite line 109: "James Bell writes to the church in America as a pastor inside it — from Scripture, from church history, and from what he has watched happen in his own sanctuary." And see the bio inconsistency below.

> line 151 (author bio): "James Bell is a pastor, writer, and ministry leader **committed to helping the church think clearly, live faithfully, and recover its allegiance** to Christ above every cultural and political idol."

Résumé triplet; a machine-made sentence. Replace with the standard bio (below). (Effort: 20 min.)

### MEDIUM — `client/src/pages/TheologyQuiz.tsx:66,80`

> "Take the free quiz and get **personalized article recommendations**." / "10 questions. **Personalized reading recommendations**."

Rewrite: "Ten questions. Then the essays that meet you where your answers say you are." (Effort: 10 min.)

### Passes — noted and left alone

- **`Home.tsx` + `lib/positioning.ts`** — hero, four doors, pillars, vision card: in voice throughout. "This is not about left or right. It is about the cross." earns its Not X. Y. One quibble: `PRIMARY_SUBHEAD_SHORT`'s "helping readers reconstruct a deeper historical faith and learn to live well" is a brochure participle chain — the long variant (B) is stronger (Low).
- **`About.tsx`** — the best sustained copy on the site; the origin section and the closing ("I would rather you find that out for yourself than be talked into it") should be the reference standard for every other page.
- **`ConsiderTheBirds.tsx` and `TheMonsterInTheMirror.tsx`** — funnel pages that read like the books they sell. "Both are half a healing. Both leave you alone in the dark." Keep.
- **`NewsletterSignup.tsx` / `SegmentedSignup.tsx`** — "I want depth, not slogans." / "Written slow, sent once a week. No spam, ever." Pass.
- **`EbookThankYou.tsx`** — plain, helpful, honest failure state. Pass.
- **`StartHere.tsx`** (the Blind Spots guide) and **`Footer.tsx`** — pass.
- **`landing/Deconstruction.tsx`, `Grief.tsx`, `FaithCrisis.tsx` prose** — pastoral register correct (stats aside, above).
- **`Books.tsx`** path descriptions ("Start here. These were written inside the crisis, not about it.") — pass.

---

## 3. Consistency — same product, different registers

**Author bio divergence (the clearest case).** Three ebook funnel pages, same slot, two different men:

- `TheMonsterInTheMirror.tsx:84` and `ConsiderTheBirds.tsx:204`: "James Bell is the Lead Pastor of First Baptist Church of Fenton, founder of the Pastors Connection Network, and the author of more than twenty books. He came to faith from atheism and writes for the reader whose faith has outgrown the answers they were given." — the canonical bio, in voice.
- `WhenGodBlessAmerica.tsx:151`: "James Bell is a pastor, writer, and ministry leader committed to helping the church think clearly, live faithfully, and recover its allegiance to Christ above every cultural and political idol." — brand-account register.

Fix: extract the canonical bio to one constant (e.g. `client/src/lib/positioning.ts`) and use it on all three. (Medium / 20 min.)

**Book descriptions are otherwise impressively consistent.** *Babylon* reads in the same voice across all four surfaces — `api/index.ts:389` (EBOOK_CATALOG), `Books.tsx:142`, `KeepReadingBook.tsx:27`, and `pages/books/Babylon.tsx` — with deliberate, not accidental, variation ("The part of Jeremiah's letter we never read. Not how to take the country back, and not how to make peace with losing it."). Subtitles match exactly ("How to Live When America Stops Being Christian"). The one divergent register for books anywhere on the site is `StartHereQuiz.tsx:283`'s generic "most comprehensive work on this topic" pitch — covered above.

---

## 4. Findings ranked

| Rank | Finding | Where | Effort |
|------|---------|-------|--------|
| **Critical** | Fabricated testimonials with 5-star ratings on a live conversion page | `LeadMagnetLanding.tsx:71–90` | 15 min (delete) |
| **Critical** | Clickbait-funnel register on lead-magnet titles/descriptions ("7 Beliefs That Will Change Your Life") | `LeadMagnetLanding.tsx:18–68` | 1–2 hrs |
| **High** | Four uncited statistics on the two crisis landing pages | `landing/Grief.tsx:47–53`, `landing/FaithCrisis.tsx:47–53` | 1 hr (verify or cut) |
| **High** | No visible path to real help on crisis pages | `landing/Grief.tsx` | 30 min |
| **High** | Quiz results in app/brand register + false-for-most superlative + mojibake "Read â" | `StartHereQuiz.tsx:238–283, 266` | 30 min |
| **High** | Therapy-speak verdict line "do the work" on hard-issues page; "showing up" | `BibleAndHomosexuality.tsx:69`, `DiscipleMaking.tsx:106` | 5 min |
| **Medium** | 8 kill-list word hits (nuanced ×2, transformative ×2, leverage ×2, navigating, journey) | tools + faq (table above) | 20 min |
| **Medium** | Author-bio divergence across funnel pages; "bold, biblical" self-praise | `WhenGodBlessAmerica.tsx:109,151` | 20 min |
| **Medium** | Half the ToolsHub blurbs in product-sheet register ("actionable recommendations," "growth areas") | `ToolsHub.tsx:115,143,171,178` | 1 hr |
| **Medium** | "Personalized recommendations" ×2 | `TheologyQuiz.tsx:66,80` | 10 min |
| **Medium** | NIV quoted where canon says ESV default (tools) — author decision needed | Bible tools | decision |
| **Low** | Exclamations: "Copied!", "Check back soon!" | `ToolActions.tsx:95`, `ReadingPathDetail.tsx:149` | 2 min |
| **Low** | "unlocking keychain leadership," "emotional authenticity," subhead-A participle chain | faq / DeepBibleCompanion / positioning.ts | 15 min |
| **Low** | `docs/VOICE.md` contradicts CLAUDE.md audience ranking | `docs/VOICE.md` | 15 min |

**The verdict.** The spine of the site — Home, About, the real book pages, the crisis-page prose — sounds like the man. The failures cluster where marketing machinery was bolted on: the lead-magnet funnel, the quiz results, one book page's back-cover copy, and numbers nobody checked. The voice does not need recovering here. It needs the borrowed voices evicted.
