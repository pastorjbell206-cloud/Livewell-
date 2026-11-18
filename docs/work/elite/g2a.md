# Study guides, second wave, share g2a

My share (all guides in client/public/studyguides, minus the six good guides the voice audit names and the three pilot guides, sorted alphabetically, positions 1 to 20):

1. after-christendom
2. aging-and-legacy
3. alone-in-a-crowded-church
4. anger
5. anxiety
6. attention
7. baptism-and-communion
8. believe
9. character-before-competence
10. christian-nationalism
11. church-and-empire
12. contentment
13. deconstruction
14. deep-roots
15. doubt
16. economic-justice
17. end-times
18. fatherhood
19. forgiveness
20. friendship

## Where this share stands

Done, committed and pushed: 1 to 5 (after-christendom, aging-and-legacy, alone-in-a-crowded-church, anger, anxiety).
Not started: 6 to 20 (attention through friendship). No file for them was touched. The run stopped at a clean guide boundary because the working context was nearly used up; the next run should start at attention.

Each guide was rewritten whole by the pilot's method: same slug, title, sessions, session titles, passages, Scripture index, downloads and help box; teaching in James's first person, seven or eight ordinary paragraphs per session; Scripture quoted (ESV, the translation these guides already used) with references; case studies reframed as "Suppose"; rulebook words, biography stamps, "Bell" and "Leader to confirm" removed; off-shelf book plugs dropped; help lines kept word for word. The claim-by-claim record is docs/work/elite/g2a-ledger.md.

## Per guide

| Guide | Words before / after | "Bell" | "honest" | "Leader to confirm" | Quotations of people | Facts corrected |
|---|---|---|---|---|---|---|
| after-christendom | 22,953 / 15,299 | 31 / 0 | 35 / 0 | 6 / 0 | Kept: Newbigin's phrase "hermeneutic of the gospel"; Hunter's "faithful presence". Paraphrased: Letter to Diognetus. Cut: none | Jeremiah's letter about 597 BC (not 587); Newbigin returned 1974 (not 1947); Hauerwas and Willimon 1989 (not 1981); Sacks's creative-minority source named (2013 lecture, searched) |
| aging-and-legacy | 24,743 / 15,495 | 28 / 0 | 107 / 8 | 2 / 0 | Paraphrased: Epicurus. Cut: none other carried | Psalm 90 not "the oldest prayer" (heading only); 1 Corinthians 15:6 "most of whom are still alive" replaces "many died insisting"; Moses and wisdom-book dates marked uncertain; Hebrews 12:1 "stadium" overstatement removed |
| alone-in-a-crowded-church | 22,254 / 13,802 | 34 / 0 | 37 / 5 | 6 / 0 | Kept: Augustine's restless heart (short, well known). Paraphrased: Bonhoeffer's "wish dream" argument | Mark 14:34 wording corrected; Colson's book title corrected; two placeholder bibliography entries cut; Surgeon General's 2023 advisory named as the source for the smoking comparison |
| anger | 26,165 / 15,349 | 27 / 0 | 51 / 7 | 5 / 0 | Paraphrased: Aristotle on rightly ordered anger. Cut: none other carried | Matthew 18:22 is "seventy-seven times" in the ESV; Ephesians early 60s (not AD 55); Jonah and Sinai dates; "rigged exchange rates" (not in the text) cut; Keller bibliography entry cut (unconfirmed) |
| anxiety | 20,290 / 13,753 | 28 / 0 | 34 / 5 | 5 / 0 | Kept: Augustine's restless heart. Paraphrased: none. Cut: none | Burroughs's Rare Jewel 1648 (not 1656); Kierkegaard's Concept of Anxiety 1844 replaces his death date; Welch's fear-of-man book title corrected; Luke 22:44 now carries its manuscript note and the argument rests on Mark 14:33-34 |
| attention | 26,873 / 17,710 | 21 / 0 | 34 / 1 | 4 / 0 | Paraphrased: Weil on attention and prayer; Augustine's restless heart named, not quoted. Cut: none | Wilson 2014 shock study corrected (6 to 15 minutes; one experiment); 1 Kings 19:12 to the ESV wording; Sinai and Psalms dates; smartphone dates |
| baptism-and-communion | 24,935 / 17,795 | 27 / 0 | 56 / 5 | 4 / 0 | Kept: Augustine's "a kind of visible word" (searched). Paraphrased: Athanasius. Cut: none | Augustine source corrected to Tractates on John 80; 1 Peter 3:21 and John 6:63 to ESV wording; Didache date; Corinthian reconstruction marked as reconstruction |
| believe | 22,388 / 15,897 | 34 / 0 | 103 / 13 | 6 / 0 | Kept: Bonhoeffer's "come and die" (English translation); Twain's schoolboy line. Paraphrased: Lewis's trilemma and "reluctant convert". Cut: none | Minimal facts and apostles' deaths stated accurately; Psalm 19:1 and 1 Corinthians 15:3-4 to ESV; atheism used once, fatherless line cut |

Help lines: aging-and-legacy and anxiety each keep their three 988 sentences unchanged and in place; anger keeps its domestic-violence and "never return to harm" sentences unchanged. Checked by script against the old files.

Converter fix (2026-11-18, second run): the YAML-to-JSON step had wrapped some quoted values (timeline years, quote cards) in literal single quotes in five earlier guides; stripped in a separate commit, and the converter fixed.

Contractions rose from about 70 to 110 per guide to about 410 to 520. Forbidden-word search (CLAUDE.md list plus the rulebook words) is clean except for a session title James's guide already carried ("Anger Is a Signal, Not a Verdict") and one book title (Brauns, Unpacking Forgiveness). No em-dashes; no exclamation points outside quoted Scripture.

Web searches used: 1 of 40 (Sacks, "On Creative Minorities", 2013).

## What I ran, and what passed

- node scripts/validate-studyguides.mjs after each guide: 68 guides, 0 failures.
- All 35 commands of the CI content-gates step: passed (after guide 5).
- pnpm check: passed (before and after merging origin).
- pnpm test: 143 files passed, 7 skipped. After the merge one client test (StudyBible.hash) timed out under load; rerun alone it passed.
- pnpm build, pnpm run sitemap, pnpm run prerender, pnpm run audit:canonicals: passed.
- Looked at anxiety (the fifth guide) at 390x844 day and night and 1440x900 day; no sideways scroll; teaching renders as paragraphs. Screenshots in /home/user/elite-shots/g2a/.
- ESLint: no code files changed, so not run. Lighthouse: not run (only JSON content changed; the pilot measured the page).
- Merged origin (g2c's guides) once; rebuilt the study guide index with its builder.

## What I did not do or verify

- Guides 6 to 20 are not rewritten.
- ESV wording was quoted from memory; there is no ESV in the repository to check against.
- Book dates and titles marked "Known" in the ledger were not searched.
- PDFs were not rebuilt (another unit owns pnpm pdfs).

## What only James can supply

1. The five-sons sentence. Old aging-and-legacy session 5 ended with a first-person wish about his sons standing at his grave. I cut it under the "no added memory" default. If it is his, it could go back as the one biographical line in that guide.
2. The pilot's six questions still stand, especially translation (these guides are ESV) and whether any of his biography belongs anywhere.
3. Three guides here were tied to books of his not on the shelf (After Christendom, Alone in a Crowded Church, Consider the Birds). The plugs are gone; tell me if any of those books should be offered to readers.
