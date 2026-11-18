# Study guides, share g2c: positions 41 to the end

My share, after removing the six good guides (youth-who-am-i, forty-days, when-our-parents-grow-old, divorce-and-blended-families, waiting-for-the-light, addiction-and-recovery) and the three pilot guides (grief, lament, suffering), sorting the rest alphabetically and taking positions 41 onward:

41 resurrection, 42 sabbath, 43 sermon-on-the-mount, 44 singleness, 45 skeptic, 46 spiritual-warfare, 47 the-beatitudes, 48 the-captive-church, 49 the-church, 50 the-creeds, 51 the-image-of-god, 52 the-lords-prayer, 53 the-parables, 54 the-psalms, 55 the-story-of-the-bible, 56 the-undivided-life, 57 witness, 58 womanhood, 59 work-and-vocation.

Method: the pilot's (docs/work/elite/guides.md), with the six decisions in the g2 brief. Every claim checked is in docs/work/elite/g2c-ledger.md.

## Per guide

- **resurrection** (done): words 25,381 to 16,439; teaching 6,673 to 4,111. "Bell" 27 to 0; "honest" 108 to 5; "Leader to confirm" 5 to 0; contractions 56 to 466. Quotations: Sagan's phrase kept (well known); no other person quoted. Paraphrased: none. Cut: a bulletin claim about how James came to faith. Facts corrected: Habermas's method dated to his 1976 dissertation (was "circa 1985"); "buffered self" corrected to Taylor's "immanent frame"; Josephus on James reworded to what he says; the Testimonium's resurrection line flagged as a likely later addition. Biography: used once, in session 5, where the closed-world point needs it.
- **sabbath** (done): words 22,772 to 14,736; teaching 5,523 to 3,841. "Bell" 20 to 0; "honest" 25 to 2; "Leader to confirm" 5 to 0; contractions 64 to 494. Quotations: Heschel's "the weekdays are for the sake of Sabbath" kept (verified in a reprint); Augustine's restless heart kept (well known). Paraphrased: Heschel's cathedrals image. Cut: a Peterson "practical atheism" line I could not find. Facts corrected: Luke 23:56 (the women rested, not Jesus); Whitney's book title; dates for the exodus, Amos, Hebrews, Peterson. Biography: none.
- **sermon-on-the-mount** through **work-and-vocation** (17 guides): not done in this run. See "Where this stopped" below.

## Where this stopped

I stopped at a clean guide boundary after two guides because I ran short of working room; each guide is about 25,000 words to read and 15,000 to write. The other seventeen in this share (positions 43 to 59) are untouched and still need the same rewrite. The next agent should start at sermon-on-the-mount, read this file and the ledger, and continue in order.

## What only James can supply

- Resurrection: the guide is written toward the skeptic, and his coming to faith from atheism is used once (session 5). If he has a sentence of his own about that, or would rather it not appear, that is his call.
- Sabbath: whether to state a position on which day Christians keep (the guide leaves it open, as the old one did); and any memory of his own about keeping or failing to keep a day off. None was added.

## What I ran

- `node scripts/validate-studyguides.mjs` after each guide: 68 guides, 0 failures.
- Literal forbidden-language search (validate-grow-voice) and em-dash search on both guides: clean. The only exclamation point is inside Psalm 46:10.
- `pnpm check`: passed. All 35 commands of the CI content-gates step: passed. `pnpm test`: 143 files passed, 7 skipped (1,635 tests). `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (2,994 pages), `pnpm run audit:canonicals`: passed.
- Looked at session 1 of both guides at 390x844, day and night: teaching renders as paragraphs, no sideways scroll. Screenshots in /home/user/elite-shots/g2c/.

## What I did not do or verify

- Seventeen guides in this share are not rewritten (above).
- Lighthouse was not run on these two pages. The pilot found accessibility 99 on every guide page, caused by heading order in the page component, not the text.
- Scripture was quoted from memory of the ESV; there is no ESV in the repository to check against.
- PDFs were not rebuilt (`pnpm pdfs`); the downloads still carry the old wording.
- No 1440-wide screenshots.

## Second run (sermon-on-the-mount, singleness, skeptic)

- **sermon-on-the-mount** (done): words 27,195 to 17,906; teaching 6,861 to 4,163. "Bell" 32 to 0; "honest" 44 to 0; "Leader to confirm" 4 to 0; contractions 79 to 548. Quotations kept: Bonhoeffer's "come and die", "only he who believes is obedient...", and two short phrases on cheap grace. Attributions to Bonhoeffer I could not find were removed. Facts corrected: Augustine's commentary (about 394, not 420), Lloyd-Jones (1959 to 1960), Luther (1530 to 1532), a non-existent Carson title replaced, Bonhoeffer hanged for resistance (not "for belonging to Christ"). Session 3 now tells the leader to keep the guide's help information within reach. Biography: none.
- **singleness** (done): words 24,715 to 15,321; teaching 4,489 to 3,310. "Bell" 29 to 0; "honest" 61 to 5; "Leader to confirm" 3 to 0; contractions 83 to 437. No person quoted but Scripture. Cut: two bibliography entries that were placeholders (one named an unrelated book on abusive men). Dates made concrete: Jerome (393), Augustine (about 401), Luther (1522), Putnam (2000), Surgeon General (2023), and the recent books. Biography: "a pastor with five sons" removed as a credential; "I'm a pastor" kept once, in the self-implication. The guide never says James is married.
- **skeptic** (done): words 24,517 to 15,850; teaching 6,354 to 3,832. "Bell" 22 to 0; "honest" 100 to 4; "Leader to confirm" 2 to 0; contractions 41 to 490. Quotations kept or added from known sources: Lewis's "patronising nonsense" sentences, Clifford's rule, Tacitus on Pilate. Corrected: "faith seeking understanding" is Anselm's, not Augustine's; several timeline dates (Socrates 399 BC, Lewis's talks from 1941, Wright from 1992, Habermas and Licona 2004 to 2010); a run-together Ehrman title. Five named case-study people were invented, so the cases are now plain "Suppose..." scenarios. Biography: "came to faith from atheism" used once, in session 1's teaching.

### What I ran (second run)

- `node scripts/validate-studyguides.mjs` after each guide: 68 guides, 0 failures. Index rebuilt with `build-studyguides-index.mjs` after each.
- Literal search of each guide for every forbidden word and phrase and for em-dashes: clean ("blessed" appears only in Scripture or as a verb). Every exclamation point is inside quoted Scripture.
- `pnpm check`: passed. All 35 content-gate commands from ci.yml: passed. `pnpm test`: 140 files passed, 3 failed under machine load (load average about 19 on 4 CPUs): StudyBible.hash, fes (catechism) and hq timed out. hq passed on the first rerun; the other two passed when run alone. None touches study guides.
- Web searches: 2 (Bonhoeffer's obedience line; Treweek's publication year).

### Not done or not verified

- No pnpm build, Lighthouse or screenshots in this run (the lead runs those on the whole branch).
- Scripture quoted from memory of the ESV, which the guides use; there is no ESV in the repository to check against.
- PDFs not rebuilt (`pnpm pdfs`); the downloads still carry the old wording.
- The sixteen guides after skeptic in this share (spiritual-warfare to work-and-vocation) are still untouched.

### What only James can supply

- Sermon on the Mount: nothing of his own was added; any memory of his own struggle with an enemy, money or anger would be his to give.
- Singleness: the guide says only "I'm a pastor" and never states whether he is married. If he wants to say how he stands toward single people in his own church, that is his sentence to write.
- Skeptic: "I came to faith from atheism" is used once, in session 1. Whether he wants a line of his own about what the atheist view felt like from inside is his call.
