# 17 — New-Tool Ideation Grounded in Real Need

> Site-elevation audit, step 3.5. NO CODE — proposals only. Grounded in
> `00-architecture-map.md` (§4 tools estate, §7 content stores), `CLAUDE.md`
> (positioning, audiences, formation standard), and
> `docs/EDITORIAL-CONSTITUTION.md`. Written 2026-07-01.

---

## 0. The ground this stands on

**What already exists (52 tools) — so nothing below duplicates it.** The estate
is heavy on *formation-side, churched-audience* instruments: five 15–24-question
self-assessments (marriage, financial, emotional, life audit, church health,
pastor burnout), Scripture reference tools (Verse Finder, Bible On Topic, Bible
Says with misuse warnings, Passage Context, Deep Bible Companion, Wisdom
Finder), builders (Rule of Life, Family Devotions, Discipleship Table, Sermon
Outline), eleven leadership instruments including the four **JSON-driven
engines** (`LeaderAssessment`, `ProfileSurvey`, `GuidedWorkflow`,
`ServiceBuilder`), and three entry diagnostics (/start, /start-here,
/diagnostic).

**The gap the estate has.** Read the tool list against the audience ranking and
one fact stands out: **the platform's number-one audience — the skeptic — has
zero tools.** The number-two audience — the doubting Christian — has landing
pages (/doubt, /deconstruction, /skeptic-track, ten FAQ pages) but nothing
interactive. And the entire **Diagnosis movement** of the six-pillar spine
(capture by the right, capture by the left, Scripture past our politics) has no
instrument at all; every assessment on the site examines the self or the
household, never the lens. The tools estate, as built, serves audiences three
and four. The writing serves audiences one and two. The tools below close that
split.

**Assets an idea can draw on:** 161+ essays filed across the two-movement /
six-pillar spine (`pillar-assignments.ts`), 5 manuscripts + 21 ebooks with
funnels, the proven JSON-engine pattern (an assessment/survey/workflow is a
content file, not a component), curated reading paths, email sequences
(`server/email-sequences.ts`), the PDF pipeline (`build-pdfs.mjs`), and the PCN
network of thousands of pastors.

**One honest cost note that applies throughout.** The four JSON engines
currently live under `/leadership/*` routes and fetch from
`client/public/leadership/`. Reusing an engine for a non-pastor audience means
one small, one-time generalization (route + fetch path parameterization).
That first move is a modest **M**; every instrument after it is **S** —
pure content work. Several proposals below assume that generalization; it is
counted once, in the ranking.

---

## 1. The proposals (ten)

### T1. The Objection Index — "Bring your best argument"

1. **Real person, real problem.** A 34-year-old software engineer, raised
   Southern Baptist, quietly done with church since sophomore year of college.
   His wife has started attending again and he agreed to "look into it" — but
   every apologetics site he opens starts by misstating his objection and ends
   with an altar call. He does not want to be persuaded. He wants to know
   whether Christianity can state *his* argument better than he can, and
   answer it without flinching.
2. **Why this platform.** Bell came to faith *from* atheism — he has stood on
   the reader's side of this table. The house method (steelman before verdict,
   concede what is true in the objection, "leave them able to disagree and
   keep reading") is exactly what this reader cannot find anywhere else. A
   generic Christian site cannot write the tool's first screen honestly.
3. **What makes it distinctive.** The user picks their strongest objection —
   suffering, divine hiddenness, resurrection reliability, the church's
   hypocrisy, hell, science — and the tool's *first* move is the steelman:
   their objection stated in its strongest form, sourced to its best
   proponents (Mackie, Rowe, Ehrman — real, verifiable), with what the church
   has genuinely gotten wrong conceded in plain text. Only then the serious
   answer, and then — the move no apologetics tool makes — **the strongest
   remaining counter Bell has not fully answered**, named honestly. Ends with
   two essays and the relevant book funnel (believe, deconstruction-of-faith),
   never a decision prompt. The win condition from CLAUDE.md, made
   interactive: *"I do not believe this, but I no longer think believing it is
   stupid."*
4. **Build cost: S** (after the engine generalization). Structurally it is a
   GuidedWorkflow-shaped JSON file per objection; six to eight objections at
   launch. The real cost is editorial — each steelman must survive the "its
   own defenders would sign it" test — which is exactly the work this platform
   is supposed to be good at.
5. **Connection.** Doubt & Faith track; After Christendom pillar. Feeds and is
   fed by the /skeptic-track reading sequence, the ten FAQ pages, and the
   *believe* funnel. Directly serves audience #1 — the audience with zero
   tools today.

### T2. The Political Captivity Mirror

1. **Real person, real problem.** A 58-year-old adult Sunday school teacher in
   Fenton who watches three hours of cable news a day and honestly cannot
   locate the seam anymore between his politics and his faith — and would walk
   out of any assessment that only aimed at his side. Equally: his
   35-year-old daughter, whose progressive congregation has quietly stopped
   naming any sin her cohort commits.
2. **Why this platform.** The orthodoxy guardrails commit to criticizing right
   and left "with the *same* instrument and the *same* grief." No tribal
   Christian site can build this tool, because its audience would revolt; a
   platform whose stated discipline is firing in both directions is the only
   one that can. Bell self-implicates first — the results copy can say "I
   failed this question for years" and mean it.
3. **What makes it distinctive.** One instrument, both captivities. Questions
   are paired mirror-images (a nationalism-capture item and a
   progressive-capture item of identical structure), so the score reports
   *which lens edits your Bible* and *how hard*, not which party you like.
   Results sort by the platform's own diagnosis vocabulary — the flag
   conscripting the cross, compassion hardened into coercion, the tribe
   editing the text — each band linking into the Capture pillar essays. No
   existing tool touches the Diagnosis movement; this is its first instrument.
4. **Build cost: S.** A `LeaderAssessment`-format JSON file (the burnout
   assessment proves the band-based results pattern carries this weight). The
   hard work is writing question pairs that a thoughtful person on *either*
   side would call fair — editorial, not code.
5. **Connection.** Pillars 1–3 (Capture by the Right, Capture by the Left,
   Reading Scripture Past Our Politics) — the spine's whole Diagnosis wing.
   Feeds when-god-bless-america and sermon-on-the-mount-as-politics funnels.
   Serves the doubting Christian and the pastor (see T9 — this is the most
   hand-your-congregation-able tool on the list).

### T3. The Pastor's Monday

1. **Real person, real problem.** A solo pastor of an 85-member church in a
   farm town, Sunday night through Monday noon: the adrenaline crash, the
   sermon replayed for its failures, the one critical email read fourteen
   times, the attendance count done twice, the resignation letter mentally
   drafted. Nobody in his church knows this happens weekly. Every pastor in
   PCN knows exactly what this is.
2. **Why this platform.** Bell is a working pastor of fifteen years writing
   "from inside the room" — the pastoral-ministry track and
   *the-loneliness-of-the-pastor* already name this hour. PCN is the
   platform's highest-yield channel, and this is a tool a pastor uses *every
   week*, not once — the only recurring-use instrument proposed here.
3. **What makes it distinctive.** Not another burnout assessment (that
   exists). A short **weekly examen for the crash itself**: five to seven
   prompts in the Before You Post pattern (name what you are replaying;
   separate the criticism from the critic; what the numbers are standing in
   for; what was true in the sermon regardless), closing with a one-line rule
   for the day and a hard stop. localStorage keeps a week-over-week trail, so
   a pastor can watch his own Mondays across a season — formation over time,
   not a score. Links out to the burnout diagnostic when the trail darkens,
   and keeps a path to real help visible per the care standard.
4. **Build cost: S.** GuidedWorkflow JSON plus the localStorage recurrence
   pattern the Sermon Workbench already uses. Content: one excellent set of
   prompts and band copy in Bell's voice.
5. **Connection.** The Pastoral Angle pillar; pastoral-ministry track. Feeds
   the-loneliness-of-the-pastor and marriage-in-ministry funnels; cross-links
   the burnout assessment. Pure PCN: the email sequence to pastors can anchor
   on "your Monday."

### T4. Before You Leave — church-hurt triage

1. **Real person, real problem.** A 44-year-old woman whose small group went
   silent around her during her divorce. She has been at the church nineteen
   years. She is one more unanswered text from leaving — and she cannot tell,
   at 11pm on a Tuesday, whether what happened to her is a wound to work
   through, a disagreement to have, or something she should genuinely walk
   away from.
2. **Why this platform.** Every voice she can find says one of two things:
   the church site says *stay, submit, forgive*; the exvangelical feed says
   *run, it's all abuse*. A platform whose stated work is reconstruction —
   honoring the grief and refusing the stopping — is the only one positioned
   to hold the real third option: sometimes leaving *a* church is faithfulness,
   and leaving *the* church is a separate question she has not actually asked
   yet.
3. **What makes it distinctive.** A guided sorter, not a quiz score: it walks
   her through separating **injury** (what was done to her), **disagreement**
   (second- and third-order matters, sorted by the platform's order-of-doctrine
   frame), and **abuse** (named plainly, with the exit and outside help stated
   without hedging — the crisis-care standard applies in full). It never
   answers "should I leave" for her; it gives her the categories to answer it
   honestly, then a reading path (alone-in-a-crowded-church, the church-hurt
   essays) matched to which category dominated.
4. **Build cost: S.** GuidedWorkflow JSON. The branching is modest; the
   editorial care is the cost, and the abuse branch must be reviewed against
   the Content Integrity & Care section before ship.
5. **Connection.** After Christendom + Pastoral Angle pillars; /church-hurt
   and /faith-crisis landing pages finally get an instrument instead of only
   prose. Feeds alone-in-a-crowded-church. Serves audience #2, and pastors
   hand it to members they are about to lose (PCN-adjacent).

### T5. The Deconstruction Map

1. **Real person, real problem.** A 27-year-old who quit her church the month
   her pastor endorsed a candidate from the pulpit. She still prays sometimes.
   Her saved-videos folder is forty exvangelical TikToks deep. She knows what
   she is against; she has no map of where she actually is, or whether
   anything is left when the demolition stops.
2. **Why this platform.** "Reconstruction, not deconstruction" is the
   platform's stated identity — excavation, not demolition. The tool exists to
   do interactively what the essays do in prose: honor what her deconstruction
   got *right*, then hand her the sorting she has never been given.
3. **What makes it distinctive.** Two moves no deconstruction content makes
   together. First, a **stage-naming** pass (angry, grieving, numb,
   rebuilding — met without diagnosis, per the care standard). Second, the
   platform's order-of-doctrine sort applied to *her* list: everything she is
   rejecting gets filed as creedal floor (first-order), tradition that divides
   churches but not the faith (second-order), or cultural accretion that was
   never the faith at all (tribe, politics, purity culture, an aesthetic). The
   output is a personal inventory — *what you actually left vs. what you were
   told was Christianity* — plus a reading path built from it. Most users will
   discover most of what they rejected was third-order. That discovery is the
   whole tool.
4. **Build cost: M.** The stage pass is workflow-engine JSON, but the sorting
   interaction (drag/assign items into orders, generate the inventory) needs a
   new component. Smaller than any of the 1,400-line hand-built tools; call it
   one new engine.
5. **Connection.** Doubt & Faith track; After Christendom pillar; the
   /deconstruction landing page and /faq/what-is-deconstruction get their
   instrument. Feeds deconstruction-of-faith and believe. Serves audiences #1
   and #2 at the exact point they overlap.

### T6. Argue the Other Side — the steelman trainer

1. **Real person, real problem.** A small-group leader whose group has not
   recovered from an election-year blowup. He does not need another article
   telling him to be charitable; he needs *practice*. He has never once had to
   state the other side's case well enough that its holders would sign it —
   and neither has anyone in his group.
2. **Why this platform.** Steelmanning is the house discipline — the
   Scholarship Standard's contested-doctrine method, the Editorial
   Constitution's "steelman opposing positions." This platform has already
   written the equal-weight steelmans (the compare pages, the
   validate-formation.mjs rule enforcing them in the Leadership library).
   The tool turns the publication's method into the reader's muscle.
3. **What makes it distinctive.** Pick a contested question — infant baptism,
   Calvinism/Arminianism, gender and office, or the two captivities — *from
   the side you hold*. The tool asks you to build the **other** side's case by
   selecting and ordering its real arguments (planted among decoys: straw
   versions, tribal caricatures — choosing one costs you). Score against
   defender-signed criteria, then the reveal: the strongest argument you
   missed, in its own tradition's voice, and where Bell lands with the
   objection he has not fully answered. The formation test in miniature: the
   user ends more humble, not more armed.
4. **Build cost: M.** New interaction pattern (select/order/grade), though the
   grading is static content, not AI — a rubric per topic. Content per topic
   is substantial but largely *already written* in the compare pages and
   contested-doctrine essays; this re-fuels it.
5. **Connection.** Reading Scripture Past Our Politics pillar; the six
   /compare/* pages become the tool's reading layer instead of terminal pages.
   Serves the doubting Christian and the pastor (a group-night activity —
   PCN hand-out potential is real).

### T7. The Fatherhood Examen

1. **Real person, real problem.** A 41-year-old father of three who travels
   for work, whose actual discipleship plan for his kids is the church youth
   group and a Bible app he installed on his son's phone. He would fail a
   parenting assessment and knows it; another score is not what he needs. He
   needs a ten-minute weekly practice that keeps the question in front of him.
2. **Why this platform.** Bell was raised without a father and is raising
   five sons — the two facts CLAUDE.md says shape everything he writes. No
   generic parenting site carries that authority, and the Editorial
   Constitution names the family pillar as the one to expand until it stands
   level with the rest. The tools estate has parenting *information*
   (ParentingGuide, ParentingVerses) and a marriage *assessment*; it has no
   family *formation* instrument — nothing used more than once.
3. **What makes it distinctive.** Formation over assessment: a weekly examen,
   not a score. Five prompts on the symptom→cause→wisdom arc (what did your
   children watch you love this week; where did they get the leftover version
   of you; what did you correct that you also do), one Scripture read in
   context, one small rule for the week. localStorage trail across weeks, like
   T3. The voice can say "I have five sons and I failed this one on Tuesday" —
   self-implication as the entire register.
4. **Build cost: S.** GuidedWorkflow JSON + the same recurrence pattern as T3.
   Rotating prompt sets (say, eight weeks before repeat) are content files.
5. **Connection.** Living Well After Christendom pillar, fatherhood subtheme;
   feeds raising-believers and the family/parenting funnels; sits beside the
   family catechism and devotions builder as the *father-facing* practice.
   Serves the seeker who came for parenting help — the practical door with the
   depth behind it.

### T8. Where It Hurts — the reading-path generator

1. **Real person, real problem.** A first-time visitor who arrived from a
   search for "why is my church obsessed with politics," read one essay, and
   is now looking at 161 essays with no idea which twelve are hers. The
   curated reading paths exist but are fixed; /diagnostic routes to a single
   essay or book and stops.
2. **Why this platform.** "Content is the product" and success is explicitly
   "a reading path completed." The corpus is already filed on a
   two-movement/six-pillar spine with subthemes — the metadata for generation
   exists in `pillar-assignments.ts` and `taxonomy.ts`; no other Christian
   site has a corpus this coherent to generate from.
3. **What makes it distinctive.** Input is the *pressure*, not a topic:
   "my marriage is cracking," "politics ate my church," "I can't pray
   anymore," "my kid is leaving the faith" — plus how deep the reader wants to
   go. Output is a sequenced path that enforces the house arc: one symptom
   essay, one cause essay (Diagnosis movement), one wisdom essay (Formation
   movement), then the book. The generator's rule *is* the editorial method:
   never leave a reader at diagnosis.
4. **Build cost: M.** No backend — client-side selection over existing
   metadata — but essays need a light "pressure tags + arc position" metadata
   layer (a content pass over `pillar-assignments.ts` or a small JSON sidecar,
   plus a manifest builder in the existing pattern). One new page component.
5. **Connection.** Every pillar — this is the connective tissue. Feeds the
   email sequences (a generated path is a natural 4-email drip), deepens the
   /start-here diagnostics instead of competing with them (their profiles can
   hand off to it), and raises the metric the platform says it cares about
   most.

### T9. Congregation Kits — the PCN hand-out builder

1. **Real person, real problem.** A PCN pastor whose church is nine weeks from
   a contentious election, or one funeral into a grief season, or six months
   into a slow split. He trusts Bell's writing personally but needs it in a
   form he can put in his people's hands: a four-week packet, not a link he
   hopes they click.
2. **Why this platform.** PCN is thousands of pastors and the stated
   highest-yield channel; "every feature that serves pastors has distribution
   built in." The audience standard already requires each piece to survive the
   "can I hand this to my people" read — this tool operationalizes that
   sentence.
3. **What makes it distinctive.** The pastor picks the situation (election
   year, grief, church conflict, doubt in the youth group) and the tool
   assembles a printable kit from existing assets: three to four essays,
   discussion questions in Bell's register (written once per essay, stored as
   content), one matched instrument (T2 for election year; the grief plan for
   loss), and a leader's page that briefs the pastor on where the conversations
   will get hard. PDF output through the existing `build-pdfs.mjs` pipeline.
   Nothing is generated by machine; everything is composed from verified,
   already-edited content — the trust contract holds.
4. **Build cost: M.** Composition UI + a kit-manifest JSON format + PDF
   templates; the pipeline exists. The recurring cost is real and must be
   owned: discussion questions are new editorial work per included essay
   (start with ~15 essays across four situations, grow deliberately).
5. **Connection.** The Pastoral Angle pillar in service of every other pillar;
   this is the distribution mechanism for the whole corpus. Each kit ends with
   the subscribe path — pastors become the platform's postal service, which is
   the strategy on file.

### T10. Before You Preach

1. **Real person, real problem.** A bivocational pastor finishing his sermon
   at 11pm Saturday who knows something is off with it — the illustration
   flatters the room, the application turn is too clean, one side of a
   contested question got the straw version — but has no second reader and no
   checklist that catches those specific failures.
2. **Why this platform.** The Revision Pass in CLAUDE.md is a working
   editorial instrument this publication actually runs; Before You Post
   (the 8-question examen) proves the pre-act-checklist pattern works as a
   tool. Adapting the house pass to homiletics is content this platform is
   uniquely sitting on.
3. **What makes it distinctive.** Not sermon *generation* (Sermon Outline
   exists) and not prep structure (Sermon Workbench exists) — a final-hour
   *conscience pass*: did you steelman the position half your room holds; are
   you inside the indictment or pointing from outside; is every quote and date
   real; does it end on a verdict or a recap; who in the room does this wound
   without warrant. Ten questions, each with a one-line repair move.
4. **Build cost: S.** Before You Post's pattern with new content; workflow
   JSON. The smallest build on this list.
5. **Connection.** The Pastoral Angle pillar; completes the sermon suite
   (Outline → Workbench → this) and cross-links the Revision Pass ethos into
   PCN. Second-order value: every pastor it forms preaches the platform's
   method to a room the platform will never reach.

---

## 2. Ranking by value-to-effort

Effort key: S = JSON content on an existing engine; M = one new component or a
metadata/content layer; L = accounts/backend. (One shared one-time M — engine
generalization out of `/leadership/*` — is carried by the first S-tier tool
shipped and noted where it applies.)

| Rank | Tool | Cost | Value case | Verdict |
|---|---|---|---|---|
| 1 | **T2 Political Captivity Mirror** | S | First and only Diagnosis-movement instrument; on-thesis to the core; both audiences #2 and #3; the most handable tool for pastors | **Build** |
| 2 | **T3 The Pastor's Monday** | S | Weekly-recurring use by the highest-yield channel; nothing on the market does this; pure content cost | **Build** |
| 3 | **T1 The Objection Index** | S* | Audience #1 currently has zero tools; the platform's founding biography made interactive; feeds the believe funnel | **Build** (*carries the engine generalization) |
| 4 | **T4 Before You Leave** | S | Crisis-page traffic already exists with no instrument; the third-option positioning is genuinely unoccupied | **Build** |
| 5 | **T10 Before You Preach** | S | Smallest build on the list; completes an existing suite; PCN multiplier | **Build** |
| 6 | **T7 Fatherhood Examen** | S | The Constitution's mandated expansion pillar; formation-over-assessment gap is real; authority is unmatched | Build, second wave |
| 7 | **T8 Where It Hurts** | M | Directly raises the platform's own #1 success metric; cost is mostly a one-time metadata pass | Build, second wave |
| 8 | **T9 Congregation Kits** | M | Highest strategic ceiling on the list, but recurring editorial cost per kit is real; needs an owner, not just a build | Build when T2/T3 prove pastor pull |
| 9 | **T5 Deconstruction Map** | M | Strong and on-identity, but T1 + T4 + the /skeptic-track cover much of the same reader sooner and cheaper | Hold — build after T1/T4 show demand |
| 10 | **T6 Argue the Other Side** | M | The most original idea here and the riskiest: novel interaction, heavy per-topic content, and it must be *fun enough to finish* or it forms no one | Hold — prototype one topic before committing |

---

## 3. Worth building vs. sounds good but isn't

**Worth building (the short list).** T2, T3, T1, T4, T10 — five S-cost
instruments that together fix the estate's actual imbalance: the skeptic gets
her first tool, the Diagnosis movement gets its first instrument, the pastor
gets a weekly reason to return, the crisis pages get hands instead of only
prose. All five are content work on proven engines. Second wave: T7 and T8.
T9 when the pastor tools have demonstrated pull; T5 and T6 on evidence, not
enthusiasm.

**Sounds good but isn't — considered and rejected:**

- **"The Verse You Were Handed" (weaponized-verse lookup).** The obvious
  Scripture-in-context idea — and a duplicate. `/tools/bible-says` already
  ships ~18 topics *with misuse warnings*, and `/theology/passage` does
  reference-level context. The right move is extending Bible Says with a
  church-hurt lens and registering it on the hub (it is currently one of the
  four unregistered tools), not a third overlapping tool.
- **An "Ask James" AI chat or AI sermon/prayer generation.** The one trap that
  ends trust, not just a build: the platform's voice is enforceable in edited
  content and unenforceable in generation; a single fabricated citation or
  off-register answer poisons the trust contract the whole site runs on. L
  cost, permanent moderation burden, and it does an essay's job worse than the
  essay.
- **A denomination-finder quiz.** /faq/what-denomination-should-i-join and the
  six compare pages already do this work in prose, with the order-of-doctrine
  care the subject requires. A quiz would flatten a second-order matter into a
  consumer personality test — the exact lens the platform exists to name.
- **Streaks/gamified habit layer on Scripture Memory or the examens.** Reach
  mechanics on a depth platform. The tools above use a plain week-over-week
  trail instead; the moment a flame emoji appears next to prayer, the
  Emotional Brief is dead.
- **Community forum / discussion layer.** L cost (accounts, moderation,
  liability on crisis topics) against a mission whose success metric is a
  reader formed, not a thread heated. PCN already provides the community
  layer where it matters.
- **A sixth 15-question self-assessment (singleness, friendship, work).** The
  estate has five; each new one now adds less than the last. The gap is not
  more mirrors for the churched self — it is instruments for the lens, the
  skeptic, and the recurring week. Feature-count temptation, plainly.

---

*File written by audit step 3.5. No code was changed.*
