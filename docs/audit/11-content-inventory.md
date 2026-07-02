# 11 — Content Inventory & Value-per-Page

> Site-elevation audit, step 2.1. Scope: **site copy** — page copy, tool
> descriptions, headings, CTAs, hero text, about text. The 161+ DB essays are
> out of scope. Read alongside `00-architecture-map.md` §2 (route tree) and §7
> (content stores). Branch `site-elevation`, 2026-07-01.
>
> Method: every page type covered; within types, all hubs and top-level pages
> read fully, samples read deep (3/10 FAQ, 2/6 compare, 4/11 crisis landings,
> 5/24 book funnels, 6/30 tools), every page in every type listed with a
> verdict line. Fan-out was delegated to read-only subagents per the working
> agreement; quoted lines were spot-verified against the source on this
> commit (a handful of line numbers may drift ±2).

---

## 0. The headline

The copy on this site is **far better than the average of its page count**.
The voice contract in CLAUDE.md is real on the page: the About page, the
crisis and FAQ landings, the book-funnel heroes, and the best tool intros are
written, not filled in. The problems are concentrated, not diffuse:

1. **One integrity breach** — unattributed statistics in the crisis-landing
   stat boxes (Critical, §7.3).
2. **Two redundant page clusters** (start-here ×3+1, pastors ×5) where the
   same job is done by competing pages and the weakest ones dilute the best.
3. **The distinctives are hoarded.** Ex-atheist, fatherless, five sons, 15
   years, PCN — present and devastating on ~6 pages, absent from dozens of
   pages that would be transformed by one sentence of them. The strangest
   case: the five pastor pages mention PCN 20+ times and James Bell zero
   times.
4. **A few conversion surfaces** (membership, work-with-james, substack,
   article-collections) read like any Christian site — exactly where the
   words carry money.

---

## 1. Core & top-level pages (read fully)

### / — Home (`client/src/pages/Home.tsx` + `client/src/lib/positioning.ts`)
- **Job:** orient + convert. **Doing it: yes.**
- H1: *"Theology that carries the weight of everyday life."*
  (`positioning.ts:14`) — the tagline earned as a headline; could not sit on
  a devotional mill's homepage. Italic deck *"Learning to follow Jesus — and
  live well — in post-Christian America."* (`Home.tsx:182`).
- The four mission doors carry voice in miniature — *"This is not about left
  or right. It is about the cross."* (`Home.tsx:60`); CTAs are specific
  ("Start the path", "Read the call"), not "Learn more."
- Signup panel is concrete: *"New essays Tuesday morning, a different lead by
  reader."* (`Home.tsx:575`).
- **Every sentence earning its place:** nearly. One soft spot: variant-A
  subhead (`positioning.ts:24-25`) is a comma-chained mission statement
  ("essays on theology, culture, family, and the American church, helping
  readers reconstruct…") — the one flat paragraph in an otherwise sharp hero.
- **Verdict: strong.**

### /about (`About.tsx`)
- **Job:** persuade/establish trust. **Doing it: yes — the best page on the
  site.** Every distinctive present and load-bearing: *"I came to faith from
  atheism, and I did not come quietly."* (`About.tsx:46`); *"I was also
  raised without a father… it explains most of what I write."*
  (`About.tsx:49`); the PCN paragraph gives the reason, not the résumé
  (*"Pastors are some of the least cared-for people in the church."*
  `About.tsx:68`). Closing refuses the sell: *"The writing will either carry
  weight for you or it will not, and I would rather you find that out for
  yourself than be talked into it."* (`About.tsx:134`).
- **Verdict: strong. This is the bar the rest of the site is measured
  against in this document.**

### /help (`Help.tsx`)
- **Job:** orient by felt need. **Doing it: yes.** *"You did not come here
  for a category. You came carrying something."* (`Help.tsx:179`). Skeptic
  entry names the credential: *"Written for you by a pastor who was an
  atheist first. No tricks, no ambush, no altar call."* (`Help.tsx:77`).
  Parenting entry: *"From a father of five sons who was raised without a
  father."* (`Help.tsx:111`). Crisis guard-rail present (`Help.tsx:225`).
- **Verdict: strong — the model for reader-first routing.**

### /exile (`Exile.tsx`)
- **Job:** narrate the vision. **Doing it: yes.** H1 *"We are not home."*
  (`Exile.tsx:67`); *"Exile is not the punishment. It is the assignment."*
  (`Exile.tsx:134`). Grounded in Jeremiah 29 / 1 Peter, cites Taylor and
  Newbigin. Not thin — this is the page that explains what the site is for.
- Gap: names the scholars but never the man. No "pastor from Michigan"
  moment; one sentence of Bell's own exile (out of atheism, into a pulpit)
  would seal it.
- **Verdict: strong.**

### /doubt (`Doubt.tsx`)
- **Job:** reassure + orient. **Doing it: partly.** Hero lands: *"You're not
  losing your faith. You might be finding a faith worth keeping"*
  (`Doubt.tsx:93`). Then the page fragments into three competing taxonomies
  (paths / featured articles / hard questions) with filler between: *"The
  questions that keep people up at night. We have articles on all of them."*
  (`Doubt.tsx:160`) — could be any apologetics site; no ex-atheist anchor
  anywhere on the page, which is the one page that most deserves it. CTA is
  catalog-speak: "Browse All Theological Articles" (`Doubt.tsx:200`).
- **Verdict: adequate; hero strong, body is a catalog wearing a guide's
  clothes.**

### /roadmap (`RoadMap.tsx`)
- **Job:** build trust through transparency. **Doing it: yes.** *"What's been
  written. What's coming."* (`RoadMap.tsx:162`); forty-eight books planned,
  shown in order, statuses honest. Not thin — focused.
- Gap: no author framing; that this is one working pastor's decade-long plan
  is the impressive fact, and the page never says it.
- **Verdict: strong (not the thin page it was suspected to be).**

### /dashboard (`Dashboard.tsx`)
- **Job:** orient logged-in users. **Doing it: yes, functionally.** Copy is
  utilitarian ("You have not started any reading paths yet…"
  `Dashboard.tsx:385`). One warm line survives: *"The best reading leaves
  something behind"* (`Dashboard.tsx:756`).
- **Verdict: adequate — a tool page, not a copy problem.**

### /living-well (`LivingWell.tsx`)
- **Job:** open the formation pillar. **Doing it: no.** ~600 words of prose,
  most of it card blurbs. The blurbs are competent (*"Marriage after
  individualism, when the culture only knows contract."* `LivingWell.tsx:23`)
  but there is **no opening argument** — no paragraph that says why formation
  is the second movement, who is writing it, or what it costs. Compare /help,
  which does the same routing job with warmth.
- **Verdict: THIN — a skeletal category index standing where a door should
  be.**

### /wisdom (`Wisdom.tsx`)
- **Job:** teach + route. **Doing it: yes.** *"Most of your life is lived in
  the place no single command reaches"* (`Wisdom.tsx:116`); "a full third of
  the Old Testament… exists for exactly these decisions" — purpose-built,
  three entry points. Not thin. No author anchor (could be any Bible site) —
  the only mark against it.
- **Verdict: strong.**

### Other top-level (read fully)
| Page | Job | Verdict | Evidence |
|---|---|---|---|
| /work-with-james (`WorkWithJames.tsx`) | convert (speaking/consulting) | **no** | H1 "Work With James" (`:50`) is template; body is a services list + form. No credential, no testimonial, no story — the one page pitching the man contains none of the man. |
| /membership (`Membership.tsx`) | convert (paid) | partly | "The deeper room" (`:67`) is on-voice; features are concrete (archive count, early essays, monthly letter, `:79-91`) — but the "why this room exists" paragraph is missing; "It is a room behind the room" (`:70`) gestures where About states. |
| /subscribe (`EmailSignup.tsx`) | convert (email) | yes | *"Get the right reading, in the right order, at the right pace."* (`:136-140`); "One email every two to three days. No spam." Concrete, pace-respecting. |
| /substack (`Substack.tsx`) | convert (external) | **partly/no** | H1 "The thinking behind the thinking" (`:34`) is good; the three benefit cards beneath ("Essays that go deeper", "Personal reflections", "Early access", `:43-77`) are interchangeable boilerplate — the page sells the platform's most personal channel with its least personal copy. |
| /search (`Search.tsx`) | utility | n/a | Functional; fine. |
| /404 (`NotFound.tsx`) | recover | n/a | Not audited in depth. |

---

## 2. Taxonomy hubs & content sections (all read)

The strong hubs share a pattern: narrative + conviction before taxonomy. The
weak ones are eyebrow + H1 + one sentence + grid.

| Route | H1 (quoted) | Job / verdict | Note |
|---|---|---|---|
| /writing | "Every essay, in one place." (`Writing.tsx:231`) | orient — **yes** | Deck names real topics: "Theology, politics, the American church after Christendom. Pastoring, marriage, parenting, prophetic justice, doubt." (`:249`) |
| /pillars | "Two movements. Six pillars." (`Pillars.tsx:54`) | teach — **yes** | "Doctrine is the skeleton. The storyline is the body that walks." (`:27`). Thin in length but every line works. |
| /framework | "Five pillars. One arc." (`Framework.tsx:65`) | teach — **yes** | Best hub line on the site: "Theology that does not end in a life was never theology. It was a hobby." (`:70-72`) |
| /theology | "Learn the hard doctrines without being told what to think." (`Theology.tsx:64`) | teach — **yes** | "You will never be handed a verdict you did not get to test." (`:67`) — the skeptic audience served in a heading. |
| /justice, /disruption | config-driven (`prophetic/PropheticHub.tsx`) | teach — **partly** | Structure sound; card CTA "Read it →" (`PropheticHub.tsx:28`) is the generic one in an otherwise specific system. |
| /nation | "The Bible is not a party." (`nation/NationHub.tsx:36`) | persuade — **yes** | "Scripture's vision still judges every party and leaves both the left and the right homeless." (`:39`) |
| /life | "One life, offered whole" (`life/LifeIndex.tsx:53`) | teach + convert — **yes** | "To live well is not to balance the boxes. It is to dissolve them." (`:56-57`) |
| /family | "Disciple your whole family, in one place." (`Family.tsx:101`) | orient — **yes** | "Apologetics that give a teenager not just what to believe but why." (`:104`) |
| /marriage | "When Your Marriage Needs More Than Advice" (`Marriage.tsx:82`) | reassure — **yes** | Covenant framing, assessment CTA. |
| /parenting | "Raising Kids Who Think, Question, and Believe" (`Parenting.tsx:79`) | teach — **yes** | "Your children will inherit your doubts before they inherit your certainty" (`:157`). Five-sons credential present ("from a father of five", `:147`). |
| /discipleship | "The long obedience, in order." (`Discipleship.tsx:449`) | guide — **yes** | "A checklist does not make a disciple. It only keeps you walking." (`:454-456`) |
| /disciple-making | "Make disciples around a table" (`DiscipleMaking.tsx:100`) | teach — **yes** | "Jesus did not run a program." (`:103`) |
| /skeptic-track | "Start here if you're skeptical." (`SkepticTrack.tsx:130`) | orient — **yes** | "Written for the version of me that was an atheist. No conversion bait. No bad apologetics." (`:142-145`) |
| /table | "The Table" (`table/Table.tsx:47`) | teach — **yes** | Post-Christendom framing: the home "is not a fallback. It is the way forward." (`:50-51`) |
| /resources | "Tools that have earned their place" (`Resources.tsx:136`) | orient — **yes** | "Everything here is free. None of it is filler." (`:139`) |
| /library | "A commonplace book." (`Library.tsx:158`) | reference — **yes** | Personal curation named (Keller, Brueggemann, Peterson… `:169-170`). Thin but right-sized. |
| /reading-paths | "Start where the weight is heaviest" (`ReadingPaths.tsx:307`) | guide — **yes** | "You are not losing your faith. You are losing a version of it that could no longer hold the weight of your actual life." (`:75`) |
| /how-tos | "Practical help for real life" (`HowTos.tsx:70`) | teach — **yes** | "share your faith without being weird" (`:73`) — concrete list, thin page, works. |
| /studyguides | "Teach the hard things well" (`studyguides/StudyGuidesIndex.tsx:38`) | teach — **partly** | "Run a class on Sunday with no prep." (`:41`) is good; page is bare grid otherwise. |
| /read | "Books to read, free, in full." (`books/BookLibrary.tsx:37`) | orient — **partly** | Strong claim, no context — relationship to the paid ebooks and the essays never explained. |
| /article-collections | "Writing gathered for the weight you carry." (`ArticleCollections.tsx:275`) | convert — **partly/no** | On-voice H1; value prop vague ("yours for as long as you need them", `:286-287`) and "What You Get" buried below pricing (`:504-559`). |
| /book-bundles | "Buy them together. Pay less." (`BookBundles.tsx:162`) | convert — **yes** | "for the pastor who needs the whole picture, not a piece of it." (`:173-174`) |
| /resources/hard-issues-series | "The Hard Issues Series" (`HardIssuesSeries.tsx:268`) | teach + give — **yes** | Free-first inversion: "The downloads cost you nothing, and they never will… A gift, if you choose to give one, supports the Pastors Connection Network." (`:271-278`) |

---

## 3. Entry diagnostics — the start-here cluster (REDUNDANT)

Four files, three live routes, all doing the "route the new reader" job:

| Route / file | What it actually does | Copy verdict |
|---|---|---|
| **/start** — `StartHereQuiz.tsx` | 3 questions → static lookup → 6 hardcoded article+book paths | **Weakest.** Results copy is generic ("Your Personalized Reading Path… Based on where you are, here's where to start", `:238-241`); hardcoded paths feel arbitrary. And this is the page the **homepage hero secondary CTA points to** (`Home.tsx:226`). |
| **/start-here** — `StartHereDiagnostic.tsx` | 5 weighted questions → 6 scored profiles + 3 secondary suggestions | **Strongest.** Path copy is persuasive and pastoral: "For the mind that refuses easy answers" (`:143`); church-hurt path: "What happened to you in the church was real. Before you can think clearly about God, you need to know that this space will not replicate the harm." (`:158`). Honest hedge: "No diagnostic is perfect. Browse every path and choose the one that fits." (`:719`) |
| **/diagnostic** — `Diagnostic.tsx` | 8 questions across 4 life dimensions → per-dimension pastoral feedback | **Strong.** Felt, specific verdict copy: "The gap between your stated convictions and how you treat the people closest to you is wider than you want to admit" (`:132`). Different job (self-assessment, not routing) — keep. |
| *(orphan)* `StartHere.tsx` | Static book-in-public TOC for *Blind Spots* with live-chapter progress | Good copy, **no route** (see architecture map §2). Book-in-public is a trust move worth resurrecting under `/blind-spots`, not as a start page. |

**Verdict:** /start and /start-here compete for the same visitor with the
same promise; the weaker one owns the better URL *and* the homepage CTA.
Consolidate on the StartHereDiagnostic copy; make /start either redirect or
carry the diagnostic. /diagnostic is a different instrument and earns its
place.

---

## 4. The pastor cluster (REDUNDANT + the strangest gap on the site)

Five pages plus the leadership hub serve the #1 strategic channel. What each
actually says:

| Route | H1 | What it says | Verdict |
|---|---|---|---|
| /pastors (`Pastors.tsx`) | "You weren't meant to lead alone" (`:31`) | The PCN enrollment case: pastors lead in isolation; the network is peer truth-telling, not perks. Best emotional hook: "…without anyone who understands what that weight actually feels like." (`:50-51`) | **yes** — best persuasion page of the five |
| /for-pastors (`ForPastors.tsx`) | "Resources for the work." (`:86`) | Content browser + PCN funnel. Strongest single line in the cluster: "Pastoring is the work that does not finish… and the loneliness named at the center of the calling." (`:98-101`) — named, then never explored. | partly |
| /for-leaders (`ForLeaders.tsx`) | "Leadership formation under cost." (`:70`) | Same scaffolding as /for-pastors, same two CTAs (Join the PCN / Resource Wall), different audience claim with no audience-specific copy. | partly — **redundant with /for-pastors** |
| /pastors-resource-wall (`PastorsResourceWall.tsx`) | "Tools for the work that does not finish." (`:230`) | The full toolkit, well organized; burnout tool pitched honestly: "Ten questions. Honest answers. No marketing." (`:67`) | **yes** |
| /resources-for-pastors (`ResourcesForPastors.tsx`) | "Tools for the work." (`:91`) | A DB-driven download list. Hero is the most generic line in the cluster: "free, downloadable, written for the pastor who is actually doing the work." (`:102-104`). No PCN, no James, no loneliness, no burnout. | **no — a shell.** Redundant with the resource wall. |
| /leadership (`leadership/LeadershipHub.tsx`) | "The weight of leading the church." (`:24`) | **The best-written page in the set:** "Most of the job is not the part anyone applauds. It is the hospital room, the budget meeting, the volunteer who quit, the sermon due in four days, the elder who will not be moved." (`:26-28`) | **yes** |

**The gap:** across all five pastor pages — **PCN is named 20+ times; James
Bell is named zero times.** No "15 years," no "founder," no *The Loneliness
of the Pastor* (his own book on this exact subject, sold two directories
over). The pages argue "you shouldn't lead alone" without the one fact that
makes this network different from every other pastor network: the man who
built it and why (the About page has the paragraph already — `About.tsx:68`).

**Consolidation:** fold /resources-for-pastors into the resource wall; merge
/for-leaders into /for-pastors (or give it genuinely elder-specific copy);
keep /pastors (persuade), the wall (tools), /leadership (library). Three
jobs, three pages — not five.

---

## 5. Book funnels (24 product pages; 5 read deep; catalog + thank-you checked)

Every funnel product page, one-line verdict (route → file):

| # | Route | Verdict |
|---|---|---|
| 1 | /consider-the-birds | **Strong** — "Three in the morning… holding up the world with your mind." (`ConsiderTheBirds.tsx:118-119`) |
| 2 | /where-your-treasure-is | Strong — "Mammon is something that manages you." |
| 3 | /alone-in-a-crowded-church | Strong — clergy-to-clergy specificity |
| 4 | /covenant | Strong — promise vs. deal thesis |
| 5 | /babylon | Strong — "The part of Jeremiah's letter we never read" |
| 6 | /how-to-read-the-bible | Strong — catches the reader: "everyone reads through a lens and calls it just reading" |
| 7 | /be-true-to-yourself | Strong — "The Lie That Ate the World" |
| 8 | /what-belongs-to-the-poor | Strong — Basil and the Fathers as counterweight |
| 9 | /rule-of-life | Strong — "You are being formed every hour" |
| 10 | /why-not-what | Adequate — methodological, no emotional entry |
| 11 | /sermon-on-the-mount-as-politics | Strong — "the constitution of a different kingdom" |
| 12 | /prophetic-justice-101 | Adequate — academic subtitle, no pull |
| 13 | /marriage-in-ministry | **Strong** — see below |
| 14 | /the-loneliness-of-the-pastor | Strong — "Why Pastors Quit, and the Brotherhood That Could Let Them Stay" |
| 15 | /healwell | Adequate — metaphor without immediate claim |
| 16 | /books/when-god-bless-america | **Strong** — see below |
| 17 | /books/believe | **Strong** — see below |
| 18 | /books/deconstruction-of-faith | Strong — "not a defense and not a surrender" |
| 19 | /books/raising-believers | Adequate — descriptive, no entry point |
| 20 | /books/the-monster-in-the-mirror | Adequate — "every generation" breadth without urgency |
| 21 | /books/the-reliability-of-scripture | Adequate — technical, no tension |
| 22 | /books/bible-and-homosexuality | **Strong** — "People are not issues. They are image-bearers." (`BibleAndHomosexuality.tsx:63-64`) |
| 23 | /books/bible-and-transgender-identity | Strong — opens with confession: "The church should be the safest place for the most confused person. We have not been." |
| 24 | /books/critical-race-theory-biblical | Adequate — balanced but bloodless |

(The architecture map's "21 funnel pairs" undercounts; 24 product pages are
live.)

**Deep reads — do they pass the "only this author" test?**
- `Believe.tsx:76-77`: *"He came to faith from atheism. He did not arrive by
  feeling his way there."* — biography as the persuasion engine; "the
  atheists are quoted at their most formidable, not their most convenient"
  (`:81`). **Pass.**
- `MarriageInMinistry.tsx:78-79`: *"The church can become the other lover…
  it is honest about where I failed my own wife for the sake of the work."*
  Self-implication doing the selling. **Pass.**
- `WhenGodBlessAmerica.tsx:101-102`: *"American Christianity is not mainly
  being persecuted. It is being seduced."* — insider-prophet, exactly the
  Orthodoxy Guardrails posture. **Pass.**
- `ConsiderTheBirds.tsx`, `BibleAndHomosexuality.tsx`: **Pass** (quotes
  above).
- The adequate six (10, 12, 15, 19, 20, 21) fail the test not by being bad
  but by being writable-by-anyone: subtitle + summary, no wound, no scene.

**Boilerplate drift across the funnel estate:**
| Pattern | Count | Verdict |
|---|---|---|
| "PDF/EPUB · instant download · secure checkout by Stripe" | 24 pages (e.g. `ConsiderTheBirds.tsx:107-109`, `Believe.tsx:65-66`) | **Serving** — post-CTA reassurance in the right spot; consistency removes hesitation. |
| "Read the opening free, then buy the ebook." | ×12 on the /books catalog cards (`Books.tsx:144,174,205,236,267,298,328,352,376,400…`) | **Numbing** — twelve identical closers on one screen; by the third card the eye deletes it. The blurbs above the line are genuinely distinct (7 of 9 sampled pass); the shared closer flattens them. |
| Bio sentence "…came to faith from atheism and writes for the reader whose faith has outgrown the answers they were given." | verbatim ×10 bios (e.g. `ConsiderTheBirds.tsx:204`, `Believe.tsx:118`, `BibleAndHomosexuality.tsx:85`) | **Numbing** — the platform's best sentence, spent identically ten times. Keep it on 2–3 flagships; vary the rest. |
| "founder of the Pastors Connection Network" in bios on non-pastor books | ×11 | Mild mis-signal — wrong authority on, e.g., the sexuality books. Two bio variants would fix it. |
| "Clarity and compassion can occupy the same room." | ×2 (`BibleAndHomosexuality.tsx:69`, `BibleAndTransgenderIdentity.tsx:69` + its meta) | Borderline — strong line, but the same metaphor solving the same problem twice. |
| `EbookThankYou` component | all thank-you pages are one component with slug+title only (`ConsiderTheBirdsThankYou.tsx:1-5`) | Fine mechanically; means a repeat buyer sees the identical screen every time — a cheap place to add one book-specific line. |
| `KeepReadingBook` (essay→book funnel) | 160+ essays route to only **5** book cards with fixed blurbs (`components/KeepReadingBook.tsx:22-66`) | **Under-serving** — 24 products, 5 destinations; a heavy reader sees the Babylon card dozens of times. Widening the map is copy work, not architecture. |

---

## 6. Tools (30 pages; hub read fully; 6 tools read deep)

**Hub** (`ToolsHub.tsx:218-223`): H1 "Tools for the Work of Ministry", deck
"Built for pastors, parents, and anyone who takes faith seriously enough to
practice it." — serviceable, slightly narrower than the estate (most tools
are not ministry tools).

**The 26 registered descriptions as a set: specific and differentiated** —
better than nearly every comparable site. Best two: *"A rule of life is not
a performance contract. It is a trellis."* (`ToolsHub.tsx:59`) and Start a
Table's "Made for the ordinary believer" (`:38`). Worst three (template
residue): Financial Health "Scripture-grounded with practical next steps"
(`:122`) and Emotional Health "Scripture-grounded diagnostic with practical
next steps" (`:143`) — the same sentence twice — and Theology Quiz "Find out
where your foundations are solid and where the gaps are" (`:17`).

**Deep-read verdicts:**
| Tool | Verdict | Evidence |
|---|---|---|
| /tools/pastor-burnout (`tools/PastorBurnout.tsx`) | **Excellent** | "whether the flame has become an obligation" (`:46`); crisis tier refuses hollow comfort: "Many pastors at this level have already considered leaving ministry. Some have considered worse." (`:443`). No therapy-speak anywhere. |
| /tools/marriage-assessment (`tools/MarriageAssessment.tsx`) | **Excellent** | "This is not a test with right answers" (`:407-410`); "'I feel far from you' is not an accusation — it is an invitation." (`:99`); results reframe: "a diagnosis is a gift, because it tells you where to focus." (`:272-275`) |
| /tools/deep-bible (`tools/DeepBibleCompanion.tsx`) | **Excellent** | Delivers the "seminary-level depth in kitchen-table language" promise; scholarly views named, application concrete. |
| /tools/prayer-generator (`tools/PrayerGenerator.tsx`) | **Excellent** | Suffering prayer models honesty: "I want to trust You, but right now it's hard. I'm not going to pretend this is easy." (`:40-42`) |
| /tools/verse-finder (`tools/VerseFinder.tsx`) | Fine | Utilitarian intro (`:220-221`); right-sized for a utility. |
| /tools/theology-quiz (`TheologyQuiz.tsx`) | **Weak intro** | "Where Do You Stand Theologically?" / "Discover which of LiveWell's tracks lands closest…" (`:77-80`) — institutional tone, no pastoral warmth, no invitation to honesty about doubt. This is the **only API-backed tool** and one of the most-linked; its intro is the most generic in the estate. |

**Full type list (30), skim verdicts:** DiscipleshipTable (strong), RuleOfLife
(excellent), PassageContext (excellent — "Never read a verse alone again",
`tools/PassageContext.tsx:211-215`), WisdomFinder (excellent entry — "What
are you facing"), Proverbs31 (good), FamilyDevotionBuilder (good),
ParentingVerses (good), BibleOnTopic (generic intro), SavedItems (functional,
fine), QuoteLibrary / TheologyGlossary / BibleReference (reference tools,
intros unremarkable — also all three **unregistered on the hub**, arch map
§4), BibleStudy / ChurchHealth / ConflictGuide / EmotionalHealth /
FinancialHealth / LifeAudit / ParentingGuide / ScriptureMemory /
SermonOutline (assessment/utility intros, adequate boilerplate register —
the depth is in their results copy, which is where these tools actually
live). LifeAudit recommendation titles lean on "Explore the…" ×3
(`tools/LifeAudit.tsx:79,165,380`).

---

## 7. FAQ, compare, and crisis landings (27 pages; 9 read deep)

### 7.1 The lists

**FAQ (10)** — all **strong**; none are SEO templates. Sampled deep:
- /faq/does-god-exist (`faq/DoesGodExist.tsx`): "answered by a pastor who
  spent years asking it himself — from the other side." (`:86-88`); steelman
  explicit: "The Christian who dismisses them has not understood them."
  (`:9-16`). One generic line: "The full article engages the philosophical,
  scientific, and personal dimensions of the question with the seriousness
  it deserves." (`:117`).
- /faq/what-is-religious-trauma (`faq/WhatIsReligiousTrauma.tsx`): *"The
  church caused this. A pastor names it, examines it, and refuses to look
  away."* (`:87`). Care standard met: real therapy modalities and a referral
  direction named (`:40`); no hollow reassurance.
- /faq/why-are-people-leaving-church: "without pretending it is someone
  else's problem" (`:138-140`); "Start trying to become the kind of
  community no one has to recover from." (`:40`).
- Remaining seven (deconstruction, bible-accuracy, denomination, hell,
  young-people [five sons cited, `faq/WhyDoYoungPeopleLeaveChurch.tsx:87`],
  science-and-faith, catholic-vs-protestant): strong on skim — each opening
  line is a thesis, not a keyword.

**Compare (6)** — all **strong**; equal-width steelman tables. Sampled deep:
- /compare/catholic-vs-protestant (`comparisons/CatholicVsProtestant.tsx:137-139`):
  "Not because the differences are trivial — because they are not."
- /compare/calvinism-vs-arminianism (`comparisons/CalvinismVsArminianism.tsx`):
  the best contested-doctrine handling on the site: *"A theology that
  accounts for only one of them is not a theology. It is an editorial
  decision."* (`:243-245`).
- Baptist/Methodist, Evangelical/Mainline, Orthodox/Catholic,
  Liturgical/Contemporary: strong on skim; same structure.

**Crisis landings (11)** — strong voice throughout. H1s that could not be on
another site: "The silence between you is louder than the fighting ever was."
(`landing/MarriageCrisis.tsx`), "Grief does not need to be fixed. It needs to
be carried." (`landing/Grief.tsx`), "You are not ruining your children. But
you need better tools than you were given." (`landing/ParentingStruggles.tsx`),
and the best line on the site: *"What happened to you in that church was not
God. And naming it is the first step toward healing."*
(`landing/ChurchHurt.tsx:97`).

### 7.2 The care gap (High)

`ChurchHurt.tsx:170-186` does it right: an external-resources block (988
Suicide & Crisis Lifeline, GRACE, RAINN). **/pastoral-burnout, /faith-crisis,
and /grief have no equivalent** — essays, books, and self-assessments only.
Grief is the sharpest exposure (bereavement + suicidality risk). CLAUDE.md's
care standard: "Keep a path to real help visible." Copy the ChurchHurt block;
this is an afternoon of work.

### 7.3 CRITICAL — unattributed statistics in the crisis stat boxes

Six landing pages open with large-type statistics under "YOU ARE NOT ALONE."
**None carries a source, on-page or in code:**

- `landing/PastoralBurnout.tsx:47-52` — "38% of pastors have seriously
  considered quitting full-time ministry in the last year." / "50% feel
  unable to meet the demands of the job."
- `landing/Grief.tsx:47-52` — "57% of grieving adults say the most painful
  thing was being told to move on before they were ready." / "1 in 4
  grieving Christians say their church made the grief harder."
- `landing/FaithCrisis.tsx:47-52` — "65% … report a season of serious
  doubt." / "1 in 3 adults say they left a church because their questions
  were not welcome."
- `landing/MarriageCrisis.tsx:47-52` — "60% of married couples report a
  season where divorce felt like a real possibility." / "7 out of 10 couples
  who considered divorce but stayed report being glad they did five years
  later."
- `landing/ParentingStruggles.tsx:47-52` — "73% of parents say they are
  making it up as they go." / "1 in 4 fathers grew up without a model…"
- `landing/Deconstruction.tsx:106-111` — "40M American adults have left the
  faith they were raised in." / "29% of Americans now identify as
  religiously unaffiliated."

A few resemble real findings (38% ≈ Barna's pastor-attrition tracking; 29%
nones ≈ Pew). Several (the 57% grief figure, 73% parenting figure, the "7 out
of 10 glad they stayed" claim) could not be traced to any obvious study and
read as invented-plausible. CLAUDE.md is unambiguous: *"Verify every citation
— scholar, date, study, verse, real and correct. When in doubt, cut it"* and
names fabricated authority "the one trap that ends trust." **Source every
number with an on-page attribution, or delete the stat boxes.** The pages are
strong enough to stand without them.

### 7.4 Boilerplate across the 27

- Closing email-CTA blocks share the "No spam. No guilt." sign-off pattern
  (e.g. `landing/PastoralBurnout.tsx:98`) — charming once, wallpaper by the
  fourth page. **Medium.**
- The "YOU ARE NOT ALONE" stat-box section is structurally identical across
  six crisis landings — structure numbs, content serves (where sourced).
- "Explore the Series" is the identical button on all six compare pages
  (`comparisons/CatholicVsProtestant.tsx:269`,
  `CalvinismVsArminianism.tsx:300`, `BaptistVsMethodist.tsx:298`,
  `EvangelicalVsMainline.tsx:289`, `OrthodoxVsCatholic.tsx:294`,
  `LiturgicalVsContemporary.tsx:289`); "Explore the Full Series" on three
  landings (`landing/ChurchHistory.tsx:237`, `Deconstruction.tsx:221`,
  `HonestQuestions.tsx:208`); and the site's only literal **"Learn More"**
  button lives at `landing/PostChristian.tsx:265`.

---

## 8. Cross-cutting flags (consolidated)

### 8.1 Thin pages (should not exist as-is)
Of the suspected list, most were acquitted: /help, /exile, /wisdom, /roadmap
are strong; /doubt is adequate-fragmented; /dashboard is utilitarian by
design. Actually thin:
- **/living-well** (`LivingWell.tsx`) — a pillar door with no argument (§1).
- **/resources-for-pastors** (`ResourcesForPastors.tsx`) — a generic shell
  beside a better page doing the same job (§4).
- **/start** (`StartHereQuiz.tsx`) — the weakest of three overlapping
  entry quizzes, holding the best URL (§3).
- **/substack**, **/read**, **/article-collections**, **/work-with-james** —
  exist rightly but are copy-thin where they convert (§1, §2).

### 8.2 Redundant pages
- Start cluster: /start vs /start-here vs /diagnostic (+ orphan
  `StartHere.tsx`) — §3.
- Pastor cluster: /for-pastors ≈ /for-leaders; /pastors-resource-wall ≈
  /resources-for-pastors — §4.

### 8.3 Vague copy (real instances, quoted)
- "Learn More" — `landing/PostChristian.tsx:265` (the only one; kill it).
- "Explore the Series" ×6 / "Explore the Full Series" ×3 — §7.4.
- "Read it →" — `prophetic/PropheticHub.tsx:28`.
- "Discover which of LiveWell's tracks lands closest to where your faith is
  right now." — `TheologyQuiz.tsx:80`.
- "written for the pastor who is actually doing the work" —
  `ResourcesForPastors.tsx:102-104`.
- "Essays that go deeper" / "Personal reflections" / "Early access" —
  `Substack.tsx:43-77`.
- "Work With James" + "Speaking, consulting, pastoral coaching, and ministry
  partnerships." — `WorkWithJames.tsx:50,53`.

### 8.4 Generic where it should carry weight
- **Pastor cluster:** PCN ×20+, James Bell ×0 (§4) — the single largest
  distinctives failure on the site.
- **/doubt:** the ex-atheist page without the ex-atheist (§1).
- **/exile, /wisdom, /roadmap, /living-well:** strong or serviceable pages
  with no author anchor; one sentence each.
- **/work-with-james, /membership, /substack:** conversion pages missing the
  only seller this platform has — the man.
- Counter-examples (it can be done in a line): `Help.tsx:77,111`,
  `SkepticTrack.tsx:142-145`, `faq/DoesGodExist.tsx:87`,
  `faq/WhyDoYoungPeopleLeaveChurch.tsx:87`, `Parenting.tsx:147`.

### 8.5 Boilerplate drift
Serving: funnel trust-strings (×24), "New Ebook · $9.99 ·" catalog labels.
Numbing: "Read the opening free, then buy the ebook." ×12 on one screen;
the verbatim bio ×10; ToolsHub twin descriptions (`:122`/`:143`);
"No spam. No guilt." closers; six identical stat-box sections; one
`EbookThankYou` for every purchase; `KeepReadingBook`'s 5 cards for 160+
essays.

---

## 9. Rankings

### (a) Top 10 pages where stronger content buys the most

| # | Page | What "stronger" means (one line) |
|---|---|---|
| 1 | /pastors + cluster | Anchor the PCN in James: 15 years, founder, *The Loneliness of the Pastor* — the network's origin story in two sentences on /pastors. |
| 2 | /grief (+ /pastoral-burnout, /faith-crisis) | Source or cut the stats; add the ChurchHurt-style real-help block. |
| 3 | /living-well | Write the missing opening argument: why formation, why now, from a father of five raised without one. |
| 4 | /work-with-james | Replace the services list with the pitch only Bell can make: who he is, who books him, one testimonial, what a booking gets. |
| 5 | /membership | Give "the deeper room" its reason-to-exist paragraph before the feature list; the features are already concrete. |
| 6 | /start | Retire or rebuild on the StartHereDiagnostic copy — it owns the homepage CTA and is the weakest quiz. |
| 7 | /tools/theology-quiz | Rewrite the intro in the platform's voice — an invitation to honesty about gaps, not "discover your track." |
| 8 | /doubt | Collapse three sections into one guided path and put the ex-atheist sentence in the hero. |
| 9 | /substack | Replace the three boilerplate benefit cards with what the letter actually is, how often, and one excerpt. |
| 10 | /books catalog (`Books.tsx`) | Vary the ×12 closer; the distinct blurbs are being flattened by one repeated sentence. |

### (b) Actively underperforming the site (the embarrassments)
- **The unattributed stat boxes** (§7.3) — on a platform whose stated
  unforgivable act is invented authority.
- **/resources-for-pastors** — template copy aimed at the audience the
  platform claims to serve best.
- **/work-with-james** — "Work With James" + a contact form, on a site whose
  About page proves what this page could be.
- **`landing/PostChristian.tsx:265` "Learn More"** — the forbidden CTA,
  live, on a flagship-series landing page.
- **/start results copy** — "Your Personalized Reading Path" is
  every-quiz-on-the-internet language at the top of the funnel.
- **Substack benefit cards** — "Essays that go deeper" selling the most
  personal channel.

### (c) Already strong — the visible bar
1. **/about** (`About.tsx`) — every distinctive load-bearing; the closing
   refusal to sell is the voice at full strength.
2. **/help** (`Help.tsx`) — "You came carrying something": reader-first
   routing with warmth and guard-rails.
3. **/church-hurt** (`landing/ChurchHurt.tsx`) — best single line on the
   site *and* the model external-help block.
4. **/leadership** (`leadership/LeadershipHub.tsx`) — "the hospital room,
   the budget meeting, the volunteer who quit": specificity instead of
   tropes.
5. **/compare/calvinism-vs-arminianism** — contested doctrine handled
   exactly as the constitution asks; "It is an editorial decision."
(Honorable: /exile, /skeptic-track, the Believe/Marriage-in-Ministry funnel
heroes, the Pastor Burnout and Marriage Assessment tools' results copy.)

---

## 10. Findings register (ranked, with effort)

| ID | Sev | Finding | Where | Effort |
|---|---|---|---|---|
| C-1 | **Critical** | Unattributed statistics on 6 crisis landings; several likely unverifiable | §7.3, `landing/*.tsx:47-52,106-111` | S — source with on-page attribution or delete the stat sections |
| H-1 | High | Crisis pages missing real-help pathways (grief, pastoral-burnout, faith-crisis) | §7.2; pattern at `ChurchHurt.tsx:170-186` | S — port the block |
| H-2 | High | Pastor cluster: 2 redundant pages + zero James/PCN-origin anchoring on the top strategic channel | §4 | M — consolidate 5→3, add the founder paragraph |
| H-3 | High | Start cluster: 3 overlapping quizzes; weakest owns /start and the homepage CTA | §3 | M — consolidate on StartHereDiagnostic copy |
| H-4 | High | /living-well is a thin door on a core pillar | §1 | S — one opening section |
| H-5 | High | Conversion copy generic at /work-with-james, /membership, /substack, /article-collections | §1, §2 | S–M per page |
| M-1 | Medium | "Read the opening free, then buy the ebook." ×12 on the catalog | §5, `Books.tsx` | S — 4–5 variants |
| M-2 | Medium | Verbatim bio ×10 ("faith has outgrown the answers…"); PCN credential on non-pastor books | §5 | S — 2–3 bio variants |
| M-3 | Medium | Vague CTA repeats: "Explore the Series" ×6, "Explore the Full Series" ×3, "Learn More" ×1, "Read it →" | §8.3 | S — rename per destination |
| M-4 | Medium | TheologyQuiz generic intro; ToolsHub duplicate description (`:122`/`:143`) | §6 | S |
| M-5 | Medium | `KeepReadingBook` maps 160+ essays to 5 books; single `EbookThankYou` for all titles | §5 | M — widen map, one per-book line |
| M-6 | Medium | /doubt fragmented; no ex-atheist anchor on the doubt page | §1 | M |
| M-7 | Medium | Distinctives absent from /exile, /wisdom, /roadmap and most hubs (one-sentence fix each) | §8.4 | S |
| L-1 | Low | Thin-hub intro formula (eyebrow + H1 + 1 sentence) reads templated across /how-tos, /studyguides, /library, /read | §2 | M — only where the page converts |
| L-2 | Low | "No spam. No guilt." and stat-box section repeated structurally across landings | §7.4 | S |
| L-3 | Low | Home variant-A subhead is the one flat paragraph in the hero | §1, `positioning.ts:24-25` | S |
| L-4 | Low | Orphan `StartHere.tsx` (Blind Spots book-in-public) — good copy with no route | §3 | S — resurrect at /blind-spots or delete |

*Effort: S = an afternoon or less, M = a day or two. Nothing in this
document requires engineering beyond copy edits, one component map, and two
redirects.*
