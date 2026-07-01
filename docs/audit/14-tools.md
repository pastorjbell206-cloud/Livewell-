# 14 — Tool-by-Tool Usefulness (Audit 3.1)

> Site-elevation audit, step 3.1. Every interactive tool judged **as a product**,
> against one bar: *would a reader keep this URL because they cannot get it
> anywhere else?* Read-only; no code changed. Inventory basis:
> `00-architecture-map.md` §4 (52 interactive surfaces). Audiences in order:
> skeptics, doubting Christians, pastors (PCN channel), seekers in crisis.
>
> Method: all 27 `/tools` pages + hub, all 11 `/leadership` instruments (4 of
> them JSON-engine-driven), the 3 entry diagnostics, and `/life/assessment`
> were read at the data level — the actual questions, verses, guidance text,
> and scoring — not just the UI. Verbatim strong/weak quotes are given for the
> 12 largest tools. Verdict format per tool: WHO · SUBSTANCE · BREAKS · 10X.

## Status

- [x] Inventory confirmed (routes + line counts)
- [ ] §1 /tools estate verdicts (27 pages + hub)
- [ ] §2 Leadership instruments verdicts (11 + 4 engines)
- [ ] §3 Entry diagnostics verdicts (3 + 1)
- [ ] §4 Tiers (Strong / Shallow / Cut-or-merge)
- [ ] §5 Signature candidates, cut list, estate verdict, ranked findings

## 0. Inventory (what was audited)

**/tools estate — 28 pages.** Hub `client/src/pages/ToolsHub.tsx` (26
registered) + 27 tool pages. Four are reachable only by direct URL —
`/tools/bible-says` (BibleReference.tsx, 1,692 lines), `/tools/quotes`
(QuoteLibrary.tsx), `/tools/glossary` (TheologyGlossary.tsx, 1,646 lines),
`/tools/saved` (SavedItems.tsx) — contradicting the Decision Log claim that
"all tools are registered in /tools."

Line counts (data lives inline in JSX): DeepBibleCompanion 1,905 ·
BibleReference 1,692 · PastorBurnout 1,681 · TheologyGlossary 1,646 · LifeAudit
1,467 · ConflictGuide 1,461 · ChurchHealth 1,451 · MarriageAssessment 1,198 ·
FinancialHealth 1,163 · SermonOutline 1,087 · ScriptureMemory 1,037 ·
EmotionalHealth 970 · FamilyDevotionBuilder 913 · ParentingGuide 893 ·
BibleStudy 786 · QuoteLibrary 551 · PassageContext 441 · PrayerGenerator 400 ·
VerseFinder 395 · DiscipleshipTable 322 · BibleOnTopic 300 · WisdomFinder 285 ·
RuleOfLife 259 · TheologyQuiz 231 · ParentingVerses 220 · SavedItems 204 ·
Proverbs31 142.

**/leadership instruments — 11 routes.** Sermon Workbench (`/leadership/sermon-prep`),
Illustration Library, Meeting Builder, Visitation Tracker, Budget Calculator,
Decision Log, Before You Post, Formation Inventory, plus four JSON-driven
engines each powering multiple instruments from `client/public/leadership/*/`:
LeaderAssessment (`/leadership/assessment/:slug`), ProfileSurvey
(`/survey/:slug`), GuidedWorkflow (`/workflow/:slug`), ServiceBuilder
(`/service/:slug`).

**Entry diagnostics — 3 (+1).** `/diagnostic`, `/start` (StartHereQuiz),
`/start-here` (StartHereDiagnostic); `/life/assessment` audited alongside.

**Cross-cutting facts** (from the architecture map, re-verified): only
TheologyQuiz touches the API; everything else is client-only with localStorage
persistence; no tool has a single test; ~14k lines of reference data are
hardcoded inside the 10 largest components.

---

## 1. The /tools estate — per-tool product verdicts

Format: WHO (the real person) · SUBSTANCE (one strong + one weak verbatim quote
for the 12 largest) · BREAKS · 10X · TIER.

### 1a. The seven largest (1,400–1,900 lines each)

One fact governs all seven: **none persists anything (zero localStorage), none
can share or email results; only four can print** — while the hub's own
Leadership Inventory advertises "history kept in the browser," so the pattern
exists in-house.

**Deep Bible Study Companion — `/tools/deep-bible` (1,905 lines) — SIGNATURE-POTENTIAL**
WHO: The layperson — skeptic or Christian — who wants seminary-grade study of an actual passage with no pastor and no seminary.
SUBSTANCE: Deep, and genuinely seminary-level, not padded: real Hebrew/Greek, real scholars correctly attributed (Walton/Beale temple-inauguration, Kline/Blocher framework view, Enuma Elish polemic, a fair Jewish corporate-Israel reading of Isa 53 via Levenson), verifiable book recs (Wenham WBC, Oswalt NICOT). 20 books, 37 passages, 6 layers each. Strong (~L78): *"A wordplay: in Genesis 2:25, Adam and Eve are 'naked' (arummim). In 3:1, the serpent is 'crafty' (arum). The same root. Their vulnerability met his cunning. The pun is intentional and devastating."* Weak (L907): proponents *"Alec Motyer, J. Alec Motyer, Edward Young, John Oswalt"* — the same scholar listed twice, sloppiness in the one place the tool claims authority.
BREAKS: No URL per passage (useState only — a passage cannot be linked or bookmarked); zero onward links — "Go Deeper" recommends third-party books and never one of Bell's 161 essays or 21 books; picker says "More books coming soon" though all 20 have content; SEO claims "PhD-level depth."
10X: URL-addressable passages across all 66 books, with every "Go Deeper" landing on this platform's own essays and books instead of a bibliography.

**What the Bible Says (BibleReference) — `/tools/bible-says` (1,692 lines) — SIGNATURE-POTENTIAL, unregistered**
WHO: The reader who has been hit with a proof-text — Rom 8:28 at a funeral, Eph 5 as a leash — and wants what the verse actually says.
SUBSTANCE: Deep. 15 topics, 82 passages, each with context/misuse/teaches; contested topics (Sexuality) genuinely steelman both traditional and affirming readings; misuse warnings are excellent and consistent (prosperity abuse, the marital-rape misreading of 1 Cor 7:4, parent-guilt misuse of Prov 22:6). Strong (L138, Rom 8:28): *"This is perhaps the most weaponized verse in the New Testament. Telling a grieving person that their loss is 'working for good' takes a statement about God's cosmic redemptive purpose and reduces it to a dismissal of their pain."* Weak (~L857, Doubt): *"He is not threatened by your doubt. He is big enough to hold it."* — greeting-card cadence in an otherwise hard-period file.
BREAKS: Unreachable except by direct URL — the hub sells three weaker verse tools while the best one is the one not listed. No search, no persistence/print/share, no onward links; emoji icons clash with the site's lucide system.
10X: Register it, add search, and brand the misuse column — the anti-proof-text engine no other verse site has; fold bible-on and verse-finder into it.

**Pastor Burnout Diagnostic — `/tools/pastor-burnout` (1,681 lines) — STRONG, verging signature**
WHO: The pastor quietly drowning who cannot tell anyone in his own congregation.
SUBSTANCE: Deep for its genre — categories no generic Maslach clone has (Financial Stress, Board & Elder Relations, Marriage Impact); 24 questions / 8 categories, real reverse-scored /120 scoring, per-category recovery plans. Strong (L214): *"I do not have a single close pastor friend who knows the unedited version of my life."* Weak (L268): Board & Elder Relations Scripture is Heb 13:17 — *"Have confidence in your leaders and submit to their authority…"* — a text addressed to congregations, served to a pastor being micromanaged by his board; reads as "submit harder."
BREAKS: The real-help path is genuinely good — 988 as a tap-to-call link, Focus on the Family Clergy Care, PCN; Crisis-tier copy ("drowning people need rescue, not swimming lessons") handles it rightly. But a crisis-tier result vanishes on refresh and cannot be sent to a spouse or counselor. Links onward via the dead `/writing?category=pastoral-ministry` filter. Duplicated by the 15-q `/leadership/assessment/burnout` with no pointer either way.
10X: Private persistence + retake trendline + one-click "send this to my counselor/spouse" — turn a score into a PCN follow-up.

**Theology Glossary (tool) — `/tools/glossary` (1,646 lines) — CUT OR MERGE, unregistered**
WHO: The new believer or curious skeptic who hits "propitiation" in an essay and refuses to be condescended to.
SUBSTANCE: Solid-to-deep. 100 terms, three depth levels each, original language, real history (Nicaea 325/381, Trent 1547, Joint Declaration 1999, Tyndale's "at-one-ment" coinage). Strong (L46, Trinity): *"Without the Trinity, the cross becomes a transaction between strangers rather than a costly act within the life of God."* Weak (L282): *"that is precisely when reading becomes genuinely transformative"* — a forbidden word; "nuanced" also appears twice (L252, L863) on a platform that bans both.
BREAKS: It is a duplicate. `/theology/glossary` (`pages/TheologyGlossary.tsx`, 114-term JSON, doctrine-linked, searchable) is a separate live page; 42 of the tool's 100 terms collide by exact name. Two glossaries, neither aware of the other, one unlisted.
10X: One canonical glossary — this version's three-depth entries merged into the theology version's doctrine-linked, JSON-driven page.

**Life Audit — `/tools/life-audit` (1,467 lines) — CUT OR MERGE**
WHO: The seeker whose Tuesday-afternoon life is fraying and who wants one honest look across all of it.
SUBSTANCE: Solid. 24 questions / 8 areas, well-written interpretations — but the wheel-of-life format is a commodity and the repo already does it better at `/life/assessment`. Strong (L56): *"I am known in a Christian community — not just attending, but belonging. People there would notice if I disappeared for a month."* Weak (L62): *"You are doing the work that most people avoid."* — "do the work" is on the platform's own forbidden therapy-speak list.
BREAKS: The hub registers both this and the Whole-Life Assessment (30 statements, browser history, generated rule of life) — two whole-life instruments; this is the lesser. Its one real asset is the best onward routing in the estate: each low category links a matching live tool.
10X: Merge into `/life/assessment`, keeping this tool's cross-tool routing as the results page.

**Conflict Guide — `/tools/conflict-guide` (1,461 lines) — STRONG, one safety gap**
WHO: A married couple mid-fight tonight who need a script that neither escalates nor pretends.
SUBSTANCE: Solid with deep moments — 8 conflict types × 5 steps = 120 guiding questions + 40 Scriptures + 40 type-specific warnings; the per-step "warning" fields are the craft. Strong (L87): *"Do not confuse a need with a verdict. 'I need you to acknowledge that you were wrong' is not a need. It is a demand for a confession. A need sounds like: 'I need ten minutes of your full attention when I get home.'"* Weak (L61): *"What emotion did you feel during the exchange — not what you thought, but what you felt in your body?"* — therapist-workbook register, borderline for this voice.
BREAKS: **No abuse/violence off-ramp anywhere** — a tool covering Trust Repair and Intimacy never screens for danger or shows a hotline (it does push professional counseling hard in Trust Repair, which is right but not enough). Answers aren't captured at all; print button prints prompts, not the couple's words.
10X: A front-door safety screen (DV off-ramp with hotline) plus a fill-in-together printable — the couple's words on the page, not just the prompts.

**Church Health Check — `/tools/church-health` (1,451 lines) — STRONG content, MERGE with the 55-q survey**
WHO: The pastor or elder willing to see his church on paper without flinching.
SUBSTANCE: Solid. Thin question set (18 statements / 6 categories) but the 54 action steps carry real craft and refuse program-speak. Strong (L63): *"Ask five congregants this question: 'What has our church taught you about God in the last six months that you did not already know?' If they cannot answer, your teaching is confirming assumptions, not forming believers."* Weak (L79→L284): all six category links are the identical URL — `"Read more on worship and teaching" … href: "/writing?category=pastoral-ministry"` repeated six times; onward guidance collapses into one generic feed.
BREAKS: Measures one leader's perception only — no congregation mode; its own Under-Strain copy prescribes "Give them eighteen months of deliberate focus. Measure the change" (L344) while the tool cannot remember a baseline. Meanwhile `/leadership/survey/church-health` asks 55 questions across 11 dimensions — two church-health tools, the shallower one registered on /tools.
10X: One church-health product: this 18-q quick check as the front door, the 55-q survey as the deep dive, congregation-wide aggregation, and a saved baseline for the 18-month delta its own copy demands.

### 1b. Mid-size tools

**Marriage Health Assessment — `/tools/marriage-assessment` (1,198 lines) — STRONG**
WHO: The spouse who senses the distance but hasn't named it — pre-counseling, quietly worried.
SUBSTANCE: Solid-to-deep. 45 handwritten level-specific recommendations in real Bell voice; the crisis tier tells the truth ("Contact a licensed marriage counselor this week. Not next month."). Strong (~L100): *"Emotional disconnection shows up in the bedroom because the bedroom is where pretending gets hardest."* Weak (~L64): *"Read a book together on communication in marriage… Gary Chapman's work on love languages remains a useful starting point."* — any-blog advice.
BREAKS: EmailResults promises "we will send you a copy of your results" but `/api/contact` only inserts into `contact_messages` — **the reader never receives an email** (trust-contract break). All five article links use the dead `/writing?category=` filter. One screen for both spouses; no compare mode.
10X: Let each spouse answer separately and diff the answers — the gap is the real diagnostic — then feed the lowest category into the matching week of `/plans/marriage`.

**Financial Health Check — `/tools/financial-health` (1,163 lines) — STRONG**
WHO: The believer whose bank statement and theology have stopped speaking — money anxiety wearing a Christian face.
SUBSTANCE: Solid. Theology-first (generosity/contentment/stewardship/provision), not a budget calculator. Strong (~L65): *"The gift that does not make you slightly uncomfortable has not yet taught you anything about dependence on God."* Weak (~L255): *"a financial counselor, a trusted mentor, a Dave Ramsey class at your church"* — outsources the platform's own bottom tier to a brand.
BREAKS: All four Scripture quotes are NIV phrasing with no translation named (house standard: ESV by default, named). No numeric input anywhere — "Faithful Steward" can be self-reported by someone giving 0%. Same dead `/writing?category=` filter.
10X: Ask one hard number (giving as % of income) and let it collide with the self-ratings — the collision is the verdict no other tool gives.

**Sermon Outline Generator — `/tools/sermon-outline` (1,087 lines) — SHALLOW (content deep, mechanism a bluff)**
WHO: The bi-vocational PCN pastor at 9pm Saturday with a text and no outline.
SUBSTANCE: The six canned outlines are genuinely excellent; the "generator" is a lookup plus a mad-libs scaffold. Strong (~L118): *"Psalm 88 is the only psalm that ends in darkness. No resolution. No turn to praise. It is in the Bible anyway."* Weak (~L361): template bigIdea *"Because of ${fcf}, the congregation needs to hear what ${ref} actually says about ${topic.toLowerCase()} — not as advice, but as news."* — fill-in-the-blank posing as generation.
BREAKS: Dropdowns advertise 10 topics × 6 audiences = 60 combos; only 6 real outlines exist. Topics Identity/Mission/Wisdom/Family **silently return the Grace outline, badge and all**. No print/copy/export, no persistence, no onward links — and it competes with `/leadership/sermon-prep` without linking it.
10X: Kill the fake dropdowns; ship the six as a growing Bell-voice outline library with docx/print export for PCN — or build a true passage-driven FCF engine.

**Scripture Memory System — `/tools/scripture-memory` (1,037 lines) — CUT OR REBUILD**
WHO: The anxious or new believer who wants Scripture in the body, not the browser.
SUBSTANCE: Generic. The 40-verse set is the standard evangelical memory canon (Prov 3:5-6, Rom 8:28, Phil 4:6-7…) — any Navigators card pack; zero Bell commentary on any verse. Strong (~L975): recall feedback *"Well done. The word is taking root."* — the one line with a pulse. Weak (~L73): *"Immediately the boy's father exclaimed, I do believe; help me overcome my unbelief!"* — NIV, unlabeled, the verse's own quotation marks dropped.
BREAKS: No translation named anywhere. Fill-blank hides every third word deterministically — the same puzzle forever. "Mark as Memorized" is the honor system; no spaced repetition, so nothing ever brings a verse back. Has the estate's only real progress persistence, wasted on commodity content.
10X: Spaced-repetition review queue plus one Bell paragraph per verse on why this verse, in context — memory tool becomes formation tool.

**Emotional Health Assessment — `/tools/emotional-health` (970 lines) — SIGNATURE-POTENTIAL**
WHO: The over-functioning Christian — ministry leader, caretaker — who can't say no, can't grieve, can't stop.
SUBSTANCE: Deep. Statements diagnose precisely ("I resist the urge to offer premature comfort or a Bible verse when someone is suffering"); the 15 practical steps are the best applied writing in the tool set. Strong (~L149): *"Your refusal to rest is not faithfulness. It is a functional denial that God can run the world without you."* Weak (~L137): `articleLink { title: "The Inner Life Nobody Sees", href: "/writing" }` — four named essays, all pointing at the bare index; if they exist you can't find them, if not it's a phantom citation.
BREAKS: **Crisis path is thin** — "Approaching Burnout" says depletion "requires immediate attention" but the result offers no counselor or crisis resource, no `/help` path. The one care-standard gap in the assessment set. Scripture NIV, unnamed.
10X: A pastors' variant (burnout norms differ), a visible crisis/counselor block on the bottom two tiers, and trend-over-time.

**Family Devotion Builder — `/tools/family-devotions` (913 lines) — SIGNATURE-POTENTIAL**
WHO: The parent — especially the father — who wants tonight's devotion at the table without buying a curriculum.
SUBSTANCE: Deep. 40 fully handwritten devotions (10 themes × 4 age bands), genuinely age-differentiated: teen tracks engage Charles Taylor and prosperity-gospel critique; young-child tracks are physical and concrete (the doorway thanksgiving gate, the held water bottle as unforgiveness). The one tool that gets translation right (KJV, labeled).
BREAKS: Nothing functional. No memory of which themes a family has done; the teen Gratitude track's "there is research on this now" gestures at an unnamed study — borderline under the citation rule. Complementary to (not duplicative of) the 52-week `/family/devotions` library; links there one-way.
10X: A printable one-pager and a "done" tracker that sequences the 10 themes into a family term, handing off to the 52-week library.

**Parenting Stage Guide — `/tools/parenting-guide` (893 lines) — SIGNATURE-POTENTIAL**
WHO: The Christian parent afraid of botching faith formation at the stage they're in — especially the doubt years (11–17).
SUBSTANCE: Deep. Six stages × (4 needs + 4 talk-points + 3 mistake/why/instead + weekly practice) ≈ 70 handwritten items; "surveillance theology," the Honest Letter, the prodigal-father posture toward adult children — this is the founder's five-sons material, not blog filler.
BREAKS: The young-adult section names live wires (abuse scandals, "hostility toward their LGBTQ friends") with only a generic `/writing` CTA to catch the reader it just stirred. No print/copy/share at all; no way to send a stage to a co-parent. Typo "a anchor" (~L72).
10X: Turn each stage's one practice into a printable/emailable artifact (the Honest Letter as an actual template) and link each stage to the real parenting essays.

**Bible Study Guide — `/tools/bible-study` (786 lines) — CUT OR MERGE**
WHO: The serious lay reader about to start a book of the Bible and wanting to read it right.
SUBSTANCE: Solid book-level primers with real edge (Psalm 88, imprecatory psalms, Mark's 16:8 ending) — but one layer deep and wholly eclipsed by Deep Bible Companion: 10 of its 12 books are also in `/tools/deep-bible` at passage-level depth (only Mark and Luke are unique here).
BREAKS: All 12 "companion essays" are titled links to bare `/writing` — twelve named pieces, zero destinations. Two tools answer "help me study Genesis" differently.
10X: Fold these overviews in as Deep Bible Companion's book-intro layer (add Mark and Luke there), 301 the route, point companion links at real essays.

**Theological Position Quiz — `/tools/theology-quiz` (231 client + ~300 server lines) — SHALLOW**
WHO: The new arrival who wants the site to tell them where to start reading.
SUBSTANCE: Generic. It is 10 questions, not the advertised 20. Options telegraph the three legacy pillars in fixed order (A ≈ Theological Depth, B ≈ Prophetic, C ≈ Integrated) — the quiz asks "which pillar are you" ten times. Q5 ("How do you respond to cultural issues (LGBTQ, race, politics)?") flattens the platform's most careful territory into four checkboxes.
BREAKS: The only API-backed tool, yet results are never stored (no quiz table in `drizzle/schema.ts`) and there is no email capture — a wasted top-of-funnel moment. Client shows 4 of the server's 6 recommendations; only 3 of the 6 legacy pillars can ever be recommended; no link to reading paths or pillar pages.
10X: Rewrite the bank so options don't map 1:1 to pillars, score across the real six-pillar taxonomy, store the result, land the reader on a reading path.

### 1c. Small tools + the hub

**Quote Library — `/tools/quotes` (551 lines) — STRONG, unregistered**
WHO: The Facebook follower who wants a Bell line to share; Bell's own social pipeline.
SUBSTANCE: Solid. 181 real pull quotes from the platform's own essays (`src/data/social-quotes.ts`), each tied to its source article — content no other site has. No overlap with either glossary (verified).
BREAKS: Unreachable except by URL; hardcoded hex for category colors (#6B8E6B, #B85C3A, #5A7B9A — palette violation); no text search; no save.
10X: Generate share-card images per quote and register it — 181 proprietary lines are a ready-made distribution engine for the Facebook audience.

**Passage Context — `/theology/passage` (441 lines + 692 kB notes JSON) — SIGNATURE-POTENTIAL**
WHO: The proof-text-wounded reader checking whether Jeremiah 29:11 means what the mug says.
SUBSTANCE: Deep. Real exegesis: 230 chapter-level notes (flow of argument, Greek/Hebrew word studies, common misreadings, interpretation spectrum linked to doctrine pages) over full 66-book metadata; live verse text with runway before/after; worked-in-depth chips for Jer 29:11, Phil 4:13, Micah 6:8. The anti-proof-text machine — nothing else on the free web does this.
BREAKS: Verse text depends on third-party bible-api.com (WEB translation, not house ESV; graceful fallback exists); the 692 kB `passage-notes.json` is fetched on every visit with `cache: no-store`; no save/share.
10X: Self-host the text, split notes per book so the flagship loads instantly, add a shareable link per reading.

**Prayer Generator — `/tools/prayer-generator` (400 lines) — STRONG**
WHO: Someone who has no words — anxious morning, hard conversation, bills due, a pastor near quitting.
SUBSTANCE: Solid. 36 fixed, genuinely pastoral written prayers (12 occasions × 3), not madlib assembly — the Pastoral Prayer names "the ones who are quietly thinking about quitting." The name "Generator" oversells a 3-prayer rotation.
BREAKS: "Another Prayer" loops after three — thin fast; the Share button just copies; no onward link to any essay.
10X: Triple the bank and pair each occasion with the matching Bell essay so a prayer becomes a doorway, not a dead end.

**Verse Finder — `/tools/verse-finder` (395 lines) — CUT OR MERGE**
WHO: The Google searcher typing "Bible verses for anxiety."
SUBSTANCE: Generic. 20 topics × 5 = 100 verses, ref + text only, zero commentary, unattributed NIV — identical to any verse aggregator.
BREAKS: Serves Jer 29:11 and Phil 4:13 contextless — the exact proof-texting Passage Context exists to fight; on-mission-contradicting.
10X: 301 into the merged topical tool and migrate the saved-verse keys.

**Start a Table — `/tools/discipleship-table` (322 lines) — STRONG**
WHO: An ordinary believer who wants to disciple someone and assumes it needs training.
SUBSTANCE: Solid. Four audiences with distinct invitation copy and tailored passage tracks ("Belonging comes before believing… never preach at the table"); fixed 4-step rhythm.
BREAKS: House-style questions without question marks ("Would you come.") read as typos in an invitation the user is told to send verbatim; no persistence; multiply section identical across variants.
10X: "Email me this plan" plus a 6-week follow-up sequence turns a copy button into a discipleship pipeline (and a list-builder).

**What the Bible Says About — `/tools/bible-on` (300 lines) — CUT OR MERGE (but its route survives)**
WHO: The seeker wanting "what the Bible actually says about money" without a sermon.
SUBSTANCE: Solid. 14 topics with genuinely Bell-voiced framing paragraphs ("Most relationships are not destroyed by a knife but by a sentence") + 71 verses — the smallest dataset of the five topical tools, on the best route name.
BREAKS: Verse texts are trimmed ESV-ish paraphrase with no translation note; near-total mission overlap with Wisdom Finder (which links here as "Browse by topic").
10X: Become the browse UI over Wisdom Finder's 208-topic dataset — keep these framings, inherit the depth.

**Wisdom Finder — `/tools/wisdom-finder` (285 lines + 645 kB topics JSON) — SIGNATURE-POTENTIAL**
WHO: Someone typing "my marriage is cold" at 11pm.
SUBSTANCE: Deep. 208 topics × 5 verses (1,040 entries), each with framing + cultural world + church-history reading + application prose + related pages; topics as specific as Miscarriage, Survivor's Guilt, Cancel Culture, Suicidal Thoughts (which correctly surfaces 988 and "tell one person today"). The only topical tool with a maintained build pipeline (`build-wisdom-index.mjs`).
BREAKS: Keyword scoring whiffs on unlisted phrasings; 645 kB fetched up front; duplicate topic "Caring for Aging Parents" appears twice (data bug); no save despite being the tool most worth saving from.
10X: Make it the single topical engine — absorb the other four, pre-render each topic as a static SEO page.

**Rule of Life Builder — `/tools/rule-of-life` (259 lines) — STRONG**
WHO: The Christian whose devotional life is a graveyard of abandoned systems.
SUBSTANCE: Solid. 27 practices across 6 categories with pastoral intros ("You are a creature, not the keeper of the world"); output is a well-written assembled rule — a picker, not deep logic.
BREAKS: Title collision with the `/rule-of-life` ebook page (identical name, identical trellis/formation concept, adjacent URLs, **zero cross-links in either direction** — verified); NO persistence — refresh erases the rule; the Whole-Life Assessment also promises "a rule of life," a third claimant.
10X: Persist the rule (the `useFavorites` hook already exists) and cross-sell the Rule of Life book — the tool is the book's natural funnel and doesn't know it.

**Parenting Bible Verses — `/tools/parenting-verses` (220 lines) — CUT OR MERGE**
WHO: The parent who just yelled and needs a verse plus permission to repair.
SUBSTANCE: Solid-to-thin. 30 ESV verses / 10 topics, but each parent note is genuinely Bell: "The repair matters more than the mistake. A parent who apologizes preaches grace."
BREAKS: Complete dead-end page — copy only, no save/share, zero onward links (no footer at all); overlaps Verse Finder's Parenting topic and five parenting topics in the wisdom library.
10X: Fold the 10 parent notes into Wisdom Finder's parenting topics; at minimum link the Family hub and the Family Devotion Builder.

**Saved Items — `/tools/saved` (204 lines) — SHALLOW, unregistered**
WHO: The returning reader who saved verses/prayers last week.
SUBSTANCE: Generic infrastructure — renders two localStorage buckets (verses, prayers) with remove and export-all.
BREAKS: Only 2 of 26 tools feed it; the hook supports "assessment-result" and "article" types it never renders; discoverable only via a conditional hub link that appears after you've already saved something. Device-local with no warning that clearing the browser erases it.
10X: Make saving universal (quotes, rules, table plans, passages, assessment results) — this becomes the reader's commonplace book, the stickiest page on the site.

**Proverbs in 31 Days — `/tools/proverbs-31` (142 lines) — STRONG**
WHO: The person who wants a daily wisdom on-ramp without an app subscription.
SUBSTANCE: Solid. All 31 chapters, date-matched, theme + 2 verses + a pointed examen prompt ("Whose approval am I afraid of losing more than I fear the Lord."); explicitly sends you to open your own Bible.
BREAKS: 30-day months never surface Day 31 by default; prompts without question marks read as typos; a daily habit with no reminder hook, streak, or persistence.
10X: A "chapter a day" email subscription turns one page into a 31-day retention loop feeding the newsletter.

**Tools Hub — `/tools` (294 lines) — SHALLOW as a hub**
WHO: Anyone landing from nav or search wondering what the platform offers.
SUBSTANCE: A flat grid of 26 cards, no grouping, no hierarchy — descriptions are individually good, but a signature instrument and a 100-verse list weigh identically.
BREAKS: Four live routes missing (`bible-says`, `quotes`, `glossary`, `saved` — the Decision-Log violation); footer CTA says "Sermon outline builder… in development" while the Sermon Outline Generator is already card #21 — stale copy that reads as neglect.
10X: Group by task (Study Scripture / Assess yourself / Build a practice / For the home / For pastors), promote 2–3 signature tools above the fold, register the orphans, delete the stale CTA.

---

## 2. Leadership instruments (11 routes; 4 JSON engines)

The governing fact: the platform's most unduplicable content — burnout bands,
church-health levels, premarital prompts, funeral texts — sits on engines with
**no persistence or single-slot saves**. The JSON-engine pattern is the best
architecture in the estate; the runtime around it underserves it. Discoverability:
LeadershipHub lists 23 tools — every instrument below **except the flagship
Formation Inventory**, which is missing from its own hub.

**Sermon Prep Workbench — `/leadership/sermon-prep` (112 lines) — STRONG**
WHO: Solo pastor staring at Sunday's text on a Monday, no seminary workflow of his own.
SUBSTANCE: Solid. 12 prompts over a 4-day arc (text→point→shape→landing) with genuinely homiletical help text. Strong: *"What does this text resist in us?"* ("Where does it push against what the room already believes or wants. Name the friction."). Weak: *"What is the passage?"* — a form field posing as a prompt.
BREAKS: ONE sermon slot — starting next week's sermon requires Clear, destroying this week's (the header comment even promises a "named sermon slot" the code doesn't have). No archive; no in-flow link to the Illustration Library.
10X: Multiple named sermon slots + a "pull an illustration" panel — a weekly habit, not a one-off.

**Illustration Library — `/leadership/illustrations` (98 lines + 56-entry JSON) — STRONG**
WHO: Pastor hunting Thursday night for a window into Luke 15 that isn't a chicken-soup anecdote.
SUBSTANCE: Solid-to-deep — each entry carries "the point it actually serves" + scriptures (e.g. "The Father Who Ran" grounds the running in Near-East shame culture). But 56 entries is a shelf, not a library, and some anecdotes carry `source: none` — brushing the platform's own fabrication guardrail.
BREAKS: No per-entry copy button (pastors will hand-transcribe); no add-your-own.
10X: Grow to 300+ verifiable entries with sources and "copy with citation" — the differentiator ("the point it serves") is already right.

**Meeting Builder — `/leadership/meeting` (121 lines) — STRONG**
WHO: Bivocational pastor whose elder meetings run 2.5 hours and decide nothing.
SUBSTANCE: Solid. Templates carry real pastoral conviction ("The state of the flock: who is struggling, who is wandering, who needs a visit" before business; "One thing we are getting wrong" in the staff template).
BREAKS: Loading a template silently overwrites the current agenda; single slot — last month's agenda is gone; no date field; minute totals have no target comparison.
10X: A "decisions made" capture at meeting end that pipes into the Decision Log — connecting two currently-orphaned tools.

**Visitation Tracker — `/leadership/visitation` (95 lines) — SHALLOW**
WHO: Pastor of 120 keeping hospital/grief/shut-in visits in his head.
SUBSTANCE: Generic. Three-column kanban (Waiting/Scheduled/Seen); nothing a notes app doesn't do — the promise "who is about to fall through the cracks" has no supporting logic (no dates, no staleness sort, no nudge).
BREAKS: Pastoral-care names and reasons live in one browser with NO export — a cleared cache or new phone erases the flock list; on a shared church computer the list is readable by anyone. (localStorage is a defensible privacy choice — the page says so — but the data-loss and continuity story is unsolved.)
10X: Date-aware aging ("not seen in 30 days" surfaced automatically) plus export — the one feature that would deliver the headline.

**Budget Calculator — `/leadership/budget` (95 lines) — STRONG (as a conversation tool)**
WHO: New pastor or deacon board building their first real budget conversation.
SUBSTANCE: Solid framing, toy-adjacent scope. The category notes are the actual product ("A church that keeps everything for itself has stopped being a church and become a club"). The math is correct but it is a fixed six-category percentage allocator with uncited "healthy ranges."
BREAKS: Can't add/rename categories; no attendance/staff context (how real benchmarks are stated); hardcoded hex `#b4541f` (token violation); no link to the governance library.
10X: Ask three inputs (attendance, staff FTE, building owned/rented) and bench the ranges against them — that's the version worth a board meeting.

**Decision Log — `/leadership/decision-log` (101 lines) — CUT OR MERGE**
WHO: Deacon chair who keeps relitigating last year's benevolence calls from memory.
SUBSTANCE: Generic CRUD (title/kind/amount/status/note). The pitch — "remember what you decided, and why" — is right; the instrument is a filtered list.
BREAKS: Worst persistence mismatch in the suite: benevolence and personnel decisions — precisely the records a church must keep durably — live in one browser with no backup and NO export. Confidential entries readable on shared machines.
10X: Export-to-text minutes format (date, motion, decision, reasoning), then fold into Meeting Builder as its "decisions" capture.

**Before You Post — `/leadership/before-you-post` (87 lines) — SIGNATURE-POTENTIAL**
WHO: Pastor at 11pm with a political take drafted and his thumb over Share.
SUBSTANCE: Deep for its size. Eight examen questions that are genuinely searching: *"Am I being consistent, or only loud against the other side?… If the answer is no, this is not conviction. It is tribe."* Verdict copy lands ("not now, not like this, not from here"). Deliberately stateless — appropriate.
BREAKS: None functional. Discoverability only — the person who needs it at 11pm won't be browsing /leadership.
10X: The most shareable instrument on the site — a one-page printable and a PCN email blast would travel it pastor-to-pastor.

**Formation Inventory — `/leadership/inventory` (687 lines) — SIGNATURE-POTENTIAL**
WHO: The gifted pastor whose platform is outrunning his character and half-knows it.
SUBSTANCE: Deep — arguably the best instrument on the platform. 41 statements, character weighted 65/35 over capacity, reverse-scored items, pastoral "meaning" essays + practices + real books (Nouwen, Baxter, Scazzero, Friedman) per low domain. Items like *"I have told a story in a way that makes me look better than the truth does"* are confession-grade. Retake history with deltas in localStorage — the persistence pattern every other assessment lacks.
BREAKS: NOT LISTED in LeadershipHub's own tools grid — the flagship is absent from its hub (reachable via /tools, /help, formation pages). Results link onward to nothing (books unlinked, no essay routing).
10X: Six-month retake email reminder (Mailchimp exists) — "see what the slow work has done" currently depends on the pastor remembering.

**Assessment engine — `/leadership/assessment/:slug` (108 lines; 5 JSONs: burnout, elder-readiness, deacon-readiness, planting-readiness, revitalization) — STRONG**
WHO: Pastor or lay leader alone at night asking "am I burning out / am I qualified / should we plant?"
SUBSTANCE: Deep content on a thin engine. Strong (burnout.json): *"My family gets the leftovers of me, the tired and distracted version, while strangers get my best."* Weak: *"I neglect my body, skipping sleep, meals, exercise, or doctors, and tell myself it does not matter."* — four behaviors double-barreled into one score. Band prose is pastoral, not clinical (Elijah under the tree), with a clean "mirror, not diagnosis" disclaimer.
BREAKS: NO persistence — a 15-question honest self-exam vanishes on refresh; no copy/export; results dead-end (the burnout band never links `/pastoral-burnout` or crisis help — a care gap given the content). Duplicates `/tools/pastor-burnout` (24-q, better crisis path) with no pointer either way.
10X: Give results the Formation Inventory treatment — copy button, history, one onward link per band.

**Survey engine — `/leadership/survey/:slug` (186 lines; 3 JSONs: church-health 55q/11 dims, revitalization 45q, spiritual-gifts 90q/18 gifts) — SIGNATURE-POTENTIAL (church-health)**
WHO: Elder team taking honest stock of the church; member asking where to serve.
SUBSTANCE: Deep. Church-health items refuse church-growth cant: *"The production quality of our service matters to us more than whether people met God in it"* (reverse-scored). Level prose diagnoses: "Worship has become a routine the room executes rather than an encounter the room enters."
BREAKS: Billed "for a team to take together" but there is no way to combine multiple people's results — the single most valuable feature for its stated use. 55–90 questions with zero autosave is abandonment bait. Duplicates the 18-q `/tools/church-health`.
10X: Team mode — share a code, five elders take it, the profile shows spread and disagreement; nothing free does this well.

**Workflow engine — `/leadership/workflow/:slug` (120 lines; 3 JSONs: premarital 7 sessions/37 prompts, discipleship, revitalization-plan) — SIGNATURE-POTENTIAL (premarital)**
WHO: Pastor with a couple to marry in June and no premarital curriculum.
SUBSTANCE: Deep. Premarital prompts are working-pastor grade: *"How do they plan to pray together, and have they ever actually done it? Watch the discomfort here."* The session arc (story→faith→conflict→money→sex→family→roles) matches paid curricula.
BREAKS: One localStorage doc per workflow — a pastor counseling TWO couples overwrites the first (the single-slot flaw with the worst consequences); no printable homework copy for the couple.
10X: Named instances ("Jake & Emily — June") + printable session sheets would beat $50 premarital curricula outright.

**Service Builder — `/leadership/service/:slug` (110 lines; 2 JSONs: funeral 11 elements/22 samples, wedding 16/31 incl. three vow traditions) — SIGNATURE-POTENTIAL**
WHO: Pastor with a funeral in 72 hours who has done three in his life.
SUBSTANCE: Deep. Sample texts are usable verbatim and theologically weighted ("We have gathered in the shadow of death, but we do not gather without hope"); guidance notes per element; military honors and open-sharing handled.
BREAKS: Single slot per service type (two funerals in a month = overwrite); copy is plain-text uppercase headers, not a printable order of service — and paper is the medium at a graveside; no link to the funeral-sermon resources elsewhere on the site.
10X: Print-formatted PDF export — this is the tool a pastor holds at the graveside.

---

## 3. Entry diagnostics (three routes doing one job, + the /life sibling)

**Diagnostic — `/diagnostic` (483 lines) — CUT OR MERGE**
WHO: Existing reader wondering where their walk with God actually is.
SUBSTANCE: Solid questions (modeled on Practicing the Way — "When did Scripture last surprise me?"), but the payoff routes to four essay slugs found nowhere in seed content — near-certain 404s — and recommends Paul Tripp's *Dangerous Calling* while linking to Bell's own /books page.
BREAKS: ORPHANED — zero inbound links anywhere in client/src; its primary CTAs likely 404. A dead page with good bones. Has the one thing the good diagnostic lacks: segmented email capture.
10X: Repoint its four dimension results at live content (or fold into the Whole-Life Assessment) and link it from /start-here.

**Start Here Quiz — `/start` (321 lines) — CUT (301 to /start-here)**
WHO: First-time visitor from Facebook deciding whether to stay.
SUBSTANCE: Thin, and broken. 3 questions, but routing keys require format="articles", so choosing Tools/Books/Devotionals almost always yields the generic default; the "pastoral-articles" key can never match the `${concern}-${situation}-${format}` pattern — **the pastor path is dead code**. Mojibake in the UI ("Read â", L266).
BREAKS: Hardcoded hex throughout (#9B8BA8, #8B4545, #FFF); off-brand colored-tile UI; the format answer is collected then ignored — yet this is the MOST-LINKED entry point on the site (MinimalNav "Start here", Footer, Framework, Exile).
10X: Delete it; 301 `/start` → `/start-here`; move the nav/footer links.

**Start Here Diagnostic — `/start-here` (810 lines) — SIGNATURE-POTENTIAL**
WHO: The same first-time visitor — skeptic, wounded, exhausted pastor, or student.
SUBSTANCE: Deep for a router. 5 weighted questions with honest options ("I was hurt by a church and I'm not sure I can go back"), 6 personas with real prose; every CTA verified live (/honest-questions, /church-hurt, /pastoral-burnout, /tools/deep-bible, /church-history, /deconstruction). The pastor result routes into the leadership suite and PCN.
BREAKS: Linked ONLY from Dashboard — the best entry diagnostic is nearly as hidden as the orphan, while the broken `/start` wins the nav/footer war. No email capture.
10X: Make it the canonical /start; add the segmented email capture from /diagnostic to its results screen.

**Whole-Life Assessment — `/life/assessment` (653 lines) — STRONG**
WHO: The seeker — anyone whose life is fraying across work, body, marriage.
SUBSTANCE: Deep — the Formation Inventory's sibling: 5 domains × 6 statements, reverse scoring, lowest-two pastoral readings, practices, books, plus a generated rule of life. localStorage history with retake deltas — the pattern the leadership engines should adopt.
BREAKS: Overlaps `/tools/life-audit` (24-q lesser cousin, also on the hub); its generated "rule of life" is the third claimant to that name, with no link to the builder tool or the Rule of Life book.
10X: Absorb Life Audit, keep its cross-tool routing, and wire the rule-of-life output to the builder and the book funnel.

---

## 4. The honest tiers

### STRONG / SIGNATURE-POTENTIAL (13)

The bar for signature: content that could not be scraped, generated, or found
on another site, serving a named reader at a real moment.

| Tool | Why it clears the bar |
|---|---|
| **BibleReference** (`/tools/bible-says`) | The misuse/steelman column — naming how each verse gets weaponized, then steelmanning contested readings — exists nowhere else on the free web. The best verse content in the repo, currently invisible. |
| **Passage Context** (`/theology/passage`) | 230 chapters of real exegesis answering "does this verse mean what the mug says." The platform's anti-proof-text conviction as a machine. |
| **Wisdom Finder** | 208 life-specific topics (Miscarriage, Survivor's Guilt, Suicidal Thoughts with a 988 path) with three-lens context — depth the other verse tools only gesture at, plus the only maintained data pipeline. |
| **Deep Bible Companion** | Verified seminary-grade scholarship (correct Hebrew/Greek, correctly attributed scholars, real book recs) for laypeople, free. |
| **Family Devotion Builder** | 40 handwritten, genuinely age-differentiated devotions — teen tracks engage Charles Taylor; nobody else ships this in this voice. |
| **Parenting Stage Guide** | The founder's five-sons material systematized: surveillance theology, the Honest Letter, the prodigal-father posture. Only Bell could publish it. |
| **Emotional Health Assessment** | The best applied writing in the tool set; verdicts in true Bell voice ("Your refusal to rest is not faithfulness"). |
| **Before You Post** | An 8-question examen for the pastor's thumb over Share — unduplicated, perfectly on-brand, PCN-viral by nature. |
| **Formation Inventory** | Confession-grade items, character weighted over capacity, retake deltas — the model instrument, hidden from its own hub. |
| **Survey engine: church-health** | 55 questions that refuse church-growth cant; one team mode away from being what elder boards pay consultants for. |
| **Workflow engine: premarital** | Working-pastor-grade session prompts matching paid curricula; one multi-couple fix from beating them. |
| **Service Builder** (funeral/wedding) | Verbatim-usable, theologically weighted liturgies for the pastor with a funeral in 72 hours — the purest "can't get anywhere else" in the estate. |
| **Start Here Diagnostic** (`/start-here`) | Honest options, six real personas, every CTA verified live — the front door the site already built and doesn't use. |

### STRONG (works, distinct, needs plumbing) (14)

Marriage Assessment · Financial Health · **Pastor Burnout** (verging signature
via PCN once persistence + send-to-counselor exist) · Conflict Guide (one
safety gap from higher) · Quote Library (register it) · Prayer Generator ·
Start a Table · Rule of Life Builder (wire the book funnel) · Proverbs in 31
Days · Sermon Prep Workbench · Illustration Library · Meeting Builder · Budget
Calculator (as conversation-starter) · Whole-Life Assessment · Assessment
engine (elder/deacon/planting/revitalization slugs).

### SHALLOW (works but generic) (5)

| Tool | Why it stays shallow |
|---|---|
| Sermon Outline Generator | Six excellent outlines wearing a fake generator; 54/60 dropdown combos silently serve the wrong outline. |
| Theology Quiz | 10 pillar-telegraphing questions; results never stored; no email capture; recommends from 3 of 6 pillars. |
| Saved Items | Right idea, wired to 2 of 26 tools, undiscoverable until after first use. |
| Visitation Tracker | A kanban with no dates — the "nobody falls through" promise has no mechanism. |
| Tools Hub | A flat 26-card list, no hierarchy, four orphans, one stale "in development" CTA for a tool it already lists. |

### CUT OR MERGE (12 surfaces → estate shrinks 52 → 40)

The estate's central redundancy: **five topical-verse tools are one tool wearing
five routes** (Verse Finder, Bible On Topic, Bible Says, Wisdom Finder,
Parenting Verses — spot-checks confirm the same verses recur across all of
them: Phil 4:6-7 in four renderings, Isa 41:10 in all four, Prov 15:1 served
from five pages, in three different unlabeled translations).

**Which one absorbs the rest: Wisdom Finder's engine and dataset, mounted on
the `/tools/bible-on` route identity ("What the Bible Says About…"), with
BibleReference's misuse/steelman layer as the flagship feature.** Rationale:
Wisdom Finder alone has real depth (208 topics vs 20/14/15/10) and the only
maintained build pipeline (`build-wisdom-index.mjs`); "what the Bible says
about X" is the natural search phrase, where "wisdom-finder" is internal jargon
and "verse-finder" is commodity SEO with commodity content; BibleReference's
misuse warnings are the differentiator no aggregator has. Keep Bible On Topic's
browse-chip UI and Bell framings; fold Parenting Verses' 10 parent notes into
the five existing parenting topics; keep Verse Finder's save affordance and
migrate its localStorage keys; 301 `/tools/verse-finder`,
`/tools/parenting-verses`, `/tools/bible-says`.

The full cut/merge list:

1. **Verse Finder → merged topical engine** (301). Commodity content, mission-contradicting proof-text serving.
2. **Parenting Verses → merged topical engine** (parent notes preserved). Dead-end page, 30 verses.
3. **Bible On Topic → the merged engine's shell** (route survives, dataset replaced).
4. **BibleReference → the merged engine's flagship layer** (route 301s; all 82 passages + misuse columns survive).
5. **Bible Study Guide → Deep Bible Companion** as its book-intro layer; add Mark + Luke to DeepBible; 301 `/tools/bible-study`. (10 of 12 books already overlap.)
6. **Theology Glossary (tool) → `/theology/glossary`**: merge the tool's richer three-depth entries into the JSON-driven, doctrine-linked page; one canonical glossary. (42 of 100 terms already collide by exact name.) `/tools/quotes` does NOT merge — no overlap with either glossary (verified); register it instead.
7. **Life Audit → Whole-Life Assessment** (`/life/assessment`), keeping Life Audit's cross-tool results routing. Two whole-life instruments; the hub sells both.
8. **Scripture Memory → cut, or rebuild** with spaced repetition + per-verse Bell commentary; as shipped it is a Navigators card pack with worse ergonomics.
9. **Decision Log → Meeting Builder** as a "decisions made" capture with minutes export.
10. **`/tools/church-health` + `/leadership/survey/church-health` → one product** (18-q quick check as front door, 55-q survey as deep dive, team mode).
11. **`/leadership/assessment/burnout` → `/tools/pastor-burnout`** (keep the 24-q tool — it has the 988 crisis path and recovery plans; 301 or cross-point the 15-q twin).
12. **`/start` (Start Here Quiz) → deleted, 301 to `/start-here`**; move nav/footer links. **`/diagnostic` → fold into Whole-Life Assessment** (or minimally: fix its four dead essay slugs and link it from /start-here results). Broken and orphaned respectively.

---

## 5. Signature candidates, ranked; the estate verdict; findings

### 5a. Top signature candidates (ranked), with what's missing

1. **"What the Bible Actually Says" — the merged topical engine** (Wisdom Finder data + BibleReference misuse/steelman + Bible On Topic route + Passage Context cross-links). The site's core conviction — verses have contexts, and the church weaponizes them — turned into the tool people actually Google for. Missing: the merge itself, save/share, per-topic pre-rendered SEO pages, one named translation (ESV), and a link from every topic into Passage Context.
2. **Deep Bible Companion.** Missing: URL-addressable passages (it cannot be linked, cited, or bookmarked today), onward links into Bell's own 161 essays and 21 books instead of a third-party bibliography, persistence of reading position; longer-term, the remaining 46 books.
3. **Pastor Burnout Diagnostic (unified).** Missing: merge with the leadership twin, private persistence + retake trendline, one-click "send to my counselor/spouse/PCN mentor" — the moment a score becomes a follow-up is the moment this becomes the PCN channel's signature asset.
4. **The Pastoral Working Set** (Premarital Workflow + Service Builder + Sermon Workbench). Missing: named multi-instance saves (two couples, two funerals, next week's sermon) and print-formatted output — paper is the medium at a graveside. With those two fixes this set beats paid products pastors currently buy.
5. **Church Health, team edition** (18-q quick + 55-q survey + aggregation). Missing: the merge, autosave, team mode (five elders, one profile showing spread and disagreement), and a saved baseline for the 18-month delta its own copy prescribes.
6. **Formation Inventory.** Missing: a card on its own hub, onward links from results (the books it names, the essays that exist), and a six-month retake email.
7. **The Home Suite** (Family Devotion Builder + Parenting Stage Guide). Missing: printable/emailable artifacts (the Honest Letter as a template, a devotion one-pager), done-tracking that sequences themes into a family term, and real essay links behind the stages.
8. **Start Here Diagnostic as the canonical front door.** Missing: the 301 from /start, the nav/footer swap, and the segmented email capture that currently lives only on the orphaned /diagnostic.

### 5b. The estate verdict

The tools estate is a warehouse full of genuinely rare goods with the lights
off. At the data level this is the most defensible moat the platform owns —
verified seminary-grade exegesis, misuse warnings no aggregator carries,
confession-grade formation instruments, funeral liturgies a pastor can read
verbatim in 72 hours, devotions differentiated by a child's age in the
founder's own voice. Almost none of it behaves like a product: the best verse
tool, the quote library, and the glossary are unreachable from the hub; the
flagship inventory is missing from its own hub; the best entry diagnostic
loses the nav to a broken one; five tools do one job in three unlabeled
translations; results vanish on refresh, promise emails that never send, and
link onward to dead filters, phantom essays, and — in the case of every tool
and every book — never once to the books the platform sells. The estate needs
almost no new content to become signature-grade. It needs consolidation (52 →
40), registration, persistence, safety rails in two crisis-adjacent tools, and
wiring — tool → essay → book — that the discovery audit (16) confirms was
already built once and left unplugged. One strategic gap remains after all of
that: the number-one audience, the skeptic, still has no tool of their own
(see 17-tool-ideas).

### 5c. Findings, ranked

Effort: S = hours, M = days, L = a week-plus.

| # | Sev | Finding | Where | Effort |
|---|-----|---------|-------|--------|
| C1 | **Critical** | No abuse/violence off-ramp in a couples-conflict tool covering Trust Repair and Intimacy — violates the site's own care standard | ConflictGuide.tsx | S |
| C2 | **Critical** | Bottom-tier results offer no counselor/crisis path (the pattern exists in PastorBurnout — 988 tel link — and Wisdom Finder's Suicidal Thoughts topic; copy it) | EmotionalHealth.tsx; leadership assessments/burnout.json results | S |
| C3 | **Critical** | "We will send you a copy of your results" — no email is ever sent; the submission dies in `contact_messages` | EmailResults.tsx + api/index.ts contact handler (used by 6 assessments) | S–M |
| C4 | **Critical** | The most-promoted entry quiz (/start: nav + footer) is logically broken — pastor path is dead code, format answer ignored, mojibake — while the excellent /start-here is linked only from Dashboard | StartHereQuiz.tsx, MinimalNav, Footer | S |
| H1 | High | Best assets unregistered/invisible: bible-says, quotes, glossary, saved off the hub; Formation Inventory absent from LeadershipHub | ToolsHub.tsx, lib/leadership.ts | S |
| H2 | High | Single-slot localStorage destroys real work: second couple/funeral/sermon/agenda overwrites the first | SermonWorkbench, GuidedWorkflow, ServiceBuilder, MeetingBuilder | M |
| H3 | High | Zero persistence on the assessment/survey engines — up to 90 honest answers lost on refresh; no copy/export of results | LeaderAssessment.tsx, ProfileSurvey.tsx | M |
| H4 | High | Dead-link epidemic in results: `/writing?category=` (no such filter) in 5+ tools; named essays pointing at bare /writing; /diagnostic's four 404 slugs | Marriage, Financial, Burnout, ChurchHealth, EmotionalHealth, BibleStudy, Diagnostic | S |
| H5 | High | Five topical-verse tools = one job, five routes, three unlabeled translations; consolidate per §4 | VerseFinder, BibleOnTopic, BibleReference, WisdomFinder, ParentingVerses | L |
| H6 | High | Pastoral-care records (visit list, benevolence/personnel decisions) in localStorage with no export — data loss and shared-computer exposure | VisitationTracker.tsx, DecisionLog.tsx | S |
| H7 | High | Sermon generator silently returns the Grace outline for 54 of 60 advertised combos — a bluff mechanism under honest content | SermonOutline.tsx findOutline | S |
| H8 | High | Twin tools on both sides of the estate with no cross-pointers: church-health 18q vs 55q; burnout 24q vs 15q | tools/ vs leadership/ | M |
| M1 | Medium | Translation chaos: unlabeled NIV, trimmed paraphrase, and WEB across tools vs the house "ESV by default, named" rule (only FamilyDevotionBuilder complies) | most verse-bearing tools | M |
| M2 | Medium | No tool anywhere links to a book — including the Rule of Life builder vs the same-named book (three "rule of life" claimants, zero cross-links) | RuleOfLife.tsx, books/RuleOfLife.tsx, WholeLifeAssessment | S |
| M3 | Medium | Theology Quiz: advertises 20 questions, has 10; results unstored; no email capture; recommends from only 3 of 6 pillars | TheologyQuiz.tsx, server/quiz/* | M |
| M4 | Medium | Flagship data fetched heavy and uncached: passage-notes.json 692 kB and wisdom topics.json 645 kB up front, `cache: no-store` | PassageContext.tsx, WisdomFinder.tsx | S–M |
| M5 | Medium | Forbidden language inside tool data ("transformative," "nuanced" ×2 in glossary; "do the work" in LifeAudit) — the voice-audit test doesn't cover tool JSX data | TheologyGlossary.tsx L282/252/863, LifeAudit.tsx L62 | S |
| M6 | Medium | Unsourced illustration anecdotes (`source: none`) brush the fabrication guardrail | public/leadership/illustrations.json | M |
| M7 | Medium | Data bugs: "Alec Motyer, J. Alec Motyer" duplicate scholar (DeepBible L907); duplicate wisdom topic "Caring for Aging Parents"; "a anchor" typo; "Read â" mojibake | DeepBibleCompanion, wisdom/topics.json, ParentingGuide, StartHereQuiz | S |
| L1 | Low | Hub: flat 26-card grid; stale "in development" CTA for a tool it already lists | ToolsHub.tsx | S |
| L2 | Low | Hardcoded hex in tools (QuoteLibrary ×3, BudgetCalculator #b4541f, StartHereQuiz throughout) — token-rule violations | per files | S |
| L3 | Low | Emoji icons in BibleReference clash with the lucide icon system | BibleReference.tsx | S |
| L4 | Low | House-style prompts without question marks read as typos in text users are told to copy/send verbatim | DiscipleshipTable, Proverbs31 | S |
| L5 | Low | Proverbs31: Day 31 unreachable by default in 30-day months; no reminder/streak for a daily-habit tool | Proverbs31.tsx | S |

---

*Audit complete. Companion reads: `16-tool-discovery.md` (the essay→tool→book
wiring, confirmed broken in the same places found here) and `17-tool-ideas.md`
(the skeptic-tool gap this estate leaves open).*
