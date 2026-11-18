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

## Third run (repair, then spiritual-warfare to the-creeds)

- **Repair**: the quotations the second run added to skeptic (Lewis, Clifford, Tacitus) and the Bonhoeffer lines kept in sermon-on-the-mount were each searched. All were confirmed except Bonhoeffer's "the preaching of forgiveness without requiring repentance", which is now marked paraphrase. Details in the ledger. From here on no quotation is added that the old guide did not carry.
- **spiritual-warfare** (done): words 23,674 to 17,468; teaching 4,413 to 3,902. "Bell" 22 to 0; "honest" 23 to 2; "Leader to confirm" 2 to 0; contractions 99 to 447. Quotations kept: Lewis's two errors (verified, now quoted exactly); Luther's "one little word" corrected to Hedge's wording. Corrected: Arnold is not a third-wave writer; the war image is Cullmann's, not Vos's; City of God dated 413 to 426; timeline reordered and loose dates fixed. Cut: two placeholder bibliography entries. FAQ 11 to 9 (the two about the writer's own method folded into the primer). Biography: once, session 1 teaching.
- **the-beatitudes** (done): words 22,841 to 15,124; teaching 4,239 to 3,701. "Bell" 27 to 0 (the stats script's two hits are "Bellah"); "honest" 61 to 9; "Leader to confirm" 3 to 0; contractions 45 to 432. No new quotations; Augustine, Luther, Tertullian kept as attributed paraphrase. Corrected: Bonhoeffer's death, Tertullian's line and its later form, Taylor's idea, the war-horse etymology softened. Cut: four placeholder bibliography entries; FAQ 12 to 11 (the one about the writer's method). "Blessed" now appears only in Scripture, titles or quotation marks. Biography: atheism once, session 1.

### What I ran (third run)

- `node scripts/validate-studyguides.mjs` after each guide: 68 guides, 0 failures. Index rebuilt after each.
- Literal search of both guides for every forbidden word and phrase and for em-dashes: clean. Every exclamation point is inside quoted Scripture.
- `pnpm check`: passed. All 35 content-gate commands from ci.yml: passed. `pnpm test`: 143 files passed, 7 skipped (1,635 tests).
- Web searches: 6 for the repair (Lewis, Clifford twice, Tacitus, Bonhoeffer twice), 2 for spiritual-warfare (Screwtape preface, Mighty Fortress), 0 for the-beatitudes. Two page fetches failed because their hosts are outside this session's network.

### Where this run stopped

Stopped at a clean guide boundary after the-beatitudes, to leave room for the gates. Next in order: **the-captive-church**, then the-church (which carries the abuse and sexual-assault help topics in sensitive-pages.json; keep its help lines word for word), the-creeds, and on to work-and-vocation.

### Not done or not verified (third run)

- No pnpm build, Lighthouse or screenshots (the lead runs those).
- Scripture quoted from memory of the ESV.
- PDFs not rebuilt (`pnpm pdfs`).

### What only James can supply (third run)

- Spiritual warfare: "I came to faith from atheism" is used once, in session 1, where he says he once held the closed-world view. The old guide had him confessing that he has blamed the enemy for his own appetite and fought for a victory already won; those first-person lines are kept in plain form. Any story of his own is his to add.
- The Beatitudes: atheism used once, in session 1 ("if the Beatitudes were a résumé, mine was blank"). "Raised without a father" was removed. Nothing else of his was added.

## Fourth run (the-captive-church, the-church, the-creeds)

- **the-captive-church** (done): words 25,335 to 17,438; teaching 6,108 to 4,539. "Bell" 0 to 0 in the counting script's sense (the old guide named "Bell" as narrator throughout; now none); "honest" 39 to 0; "Leader to confirm" 4 to 0; contractions 168 to 501. Quotations kept: Barmen's first article, now in the standard English wording (checked by search); "by this sign conquer" (well known). Bonhoeffer's "cheap grace" kept as his term; the coat-and-root image was not his, so it is gone. No quotation added. Corrected: the memory verse for Matthew 4:10 was NIV, now ESV like the rest; Mark 12:16 quoted as ESV "likeness" with the Greek word explained; Bonhoeffer was not at Barmen (he belonged to the Confessing Church that came from it); Nero's persecution was the fire, not the incense test; timeline reordered (Ambrose 390 had sat after 426) and Polycarp, Nicaea and 380 added from what the teaching already says. Cut: the plug for James's The Captive Church (not on the three-book shelf); two placeholder bibliography entries; the FAQ about the writer's method (folded into the primer). The summary no longer promises a session on cultural captivity that the guide never had. Biography: none; "came to faith from atheism" was used three times as a credential and is out.
- **the-church** (done): words 25,447 to 17,641; teaching 6,159 to 4,449. "Bell" as narrator removed; "honest" 49 to 5; "Leader to confirm" 6 to 0; contractions 35 to 486. Help: the guide carries the abuse and sexual-assault topics in sensitive-pages.json, which are untouched; the sentence "Abuse by a church leader should be reported to the authorities." is kept word for word wherever it stood (session 5 question, objection, teaching, FAQ) and added to the primer and session 5 summary; session 3's wound question and case study and session 5's practice now point the leader to the printed help information; the leader primer names Find Help. Quotations kept, each checked by search: Bonhoeffer's "dream of community" sentence and "the sooner this shock of disillusionment comes" (Doberstein); Newbigin's "the only hermeneutic of the gospel" (1989). Calvin's marks and the Augsburg Confession are now attributed paraphrase (the old guide quoted Calvin unattributed). Corrected: Life Together was written in 1938 after the Gestapo closed Finkenwalde in 1937 (the old guide said it was written there and the seminary was shut later); timeline dates loosened where debated; Newbigin's Foolishness to the Greeks added for the fact-value split the guide already taught. Cut: one placeholder bibliography entry ("Life in the Wilderness" by "Various"); the FAQ about the writer's method; four invented names in case studies (now "Suppose"). The elder case study now says caring for him never comes before protecting anyone he harmed. Biography: "I'm a pastor" kept as self-implication; no other fact.

### What I ran (fourth run)

- `node scripts/validate-studyguides.mjs` after each guide: 68 guides, 0 failures. Index rebuilt after each.
- Literal search of both guides for every forbidden word and phrase, em-dashes, "Bell" and "Leader to confirm": clean ("blessed" only as a verb). Every exclamation point is inside quoted Scripture.
- `pnpm check`: passed. All 35 content-gate commands from ci.yml (including validate-content-integrity): passed. `pnpm test`: 143 files passed, 1 failed under load (fes.test.tsx, the catechism page), which passed when run alone (4 of 4). Nothing in it touches study guides.
- Web searches: 1 for the-captive-church (Barmen), 2 for the-church (Bonhoeffer, Newbigin).

### Where this run stopped

Stopped at a clean guide boundary after the-church, to leave room for the gates and the push. Next in order: **the-creeds**, then the-image-of-god (abuse help topic in sensitive-pages.json), the-lords-prayer, the-parables, the-psalms, the-story-of-the-bible, the-undivided-life, witness, womanhood, work-and-vocation.

### Not done or not verified (fourth run)

- No pnpm build, Lighthouse or screenshots (the lead runs those).
- Scripture quoted from memory of the ESV; there is no ESV in the repository.
- PDFs not rebuilt (`pnpm pdfs`).
- Calvin's marks and the Augsburg Confession were paraphrased from memory of the texts, not checked against a copy.

### What only James can supply (fourth run)

- The Captive Church: the old guide called itself "drawn from James Bell's book The Captive Church". That book is not on the three-book shelf, so the plug is gone. If the book is real and should be named, or if he wants the guide pointed at When God Bless America Replaces Thy Kingdom Come (which is on the shelf), that is his call. No memory of his own was added; the first-person confessions (wanting the shortcut, excusing his own side) are kept in plain form from the old guide.
- The Church: the guide says "I'm a pastor" and "I've failed the church in my own ways" and "I've felt the pull toward the door ... over ordinary disappointment", all carried from the old guide's self-implication. Whether those sentences are true of him as he would put them is his to confirm or rewrite.

## Fifth run (the-creeds, the-image-of-god)

- **the-creeds** (done): words 22,992 to 19,556; teaching 3,866 to 3,568. "Bell" 6 to 0; "honest" 37 to 5; "Leader to confirm" 3 to 0; contractions 65 to 476. Quotations: Gregory of Nazianzus's "that which He has not assumed He has not healed" now quoted exactly from Letter 101 (checked by search); the Arian slogan and the creed texts kept. No quotation added. Corrected: Athanasius's portrait image (the old guide had it backward); timeline order (Marcion, 144, had sat after the second-century creed) and loose dates; "seventeen centuries" to "more than sixteen"; 1 Timothy 3:16 now includes "we confess". Cut: the FAQ about the writer's atheism; four "Bell says" questions reworded; three "Leader to confirm" notes replaced by dates. Help: none needed (no help topic for this guide). Biography: "came to faith from atheism" once, session 1 teaching, where it speaks to how the word creed sounds from outside; five other uses as credential removed.
- **the-image-of-god** (done): words 25,979 to 19,884; teaching 5,210 to 4,082. "Bell" 24 to 0; "honest" 32 to 3; "Leader to confirm" 3 to 0; contractions 84 to 467. Quotations: Lewis's two lines from "The Weight of Glory" now quoted exactly and dated (checked by search); Calvin kept as paraphrase. No quotation added. Corrected: the broad and narrow image is later Reformed language, not Calvin's own; Calvin, Augustine, Aquinas, Bonhoeffer and Paul dated; "only the king" softened. Cut: a placeholder Westermann entry; the FAQ about the writer's method; "raised without a father" and "five sons" as credentials. Help: the abuse help topic in sensitive-pages.json is untouched; sessions 3 and 5 now point the leader to the printed help information and the primer names Find Help. Biography: atheism once, session 1 teaching.

### What I ran (fifth run)

- `node scripts/validate-studyguides.mjs` after each guide: 68 guides, 0 failures. Index rebuilt after each.
- Literal search of both guides for every forbidden word and phrase, em-dashes, "Bell" and "Leader to confirm": clean. "Blessed" appears only in Titus 2:13 and inside Lewis's quoted sentence. Every exclamation point is inside quoted Scripture.
- Web searches: 1 for the-creeds (Gregory), 1 for the-image-of-god (Lewis).

### What only James can supply (fifth run)

- The Creeds: "I came to faith from atheism, so I know how the word creed can sound from outside" is used once, in session 1. Whether he wants to say more is his call.
- The Image of God: atheism used once, in session 1, beside the reduction. The old summary named his fatherlessness and five sons as credentials; both are gone. "That includes me" in session 5 keeps the old guide's self-implication; nothing else of his was added.
- Gates, run after merging the latest origin branch: `pnpm check` passed; all 35 content-gate commands from ci.yml passed; `pnpm test`: 144 files passed, 7 skipped (1,640 tests).

### Not done or not verified (fifth run)

- No pnpm build, Lighthouse or screenshots (the lead runs those).
- Scripture quoted from memory of the ESV; there is no ESV in the repository.
- PDFs not rebuilt (`pnpm pdfs`).

### Where this run stopped

Stopped at a clean guide boundary after the-image-of-god, to leave room for the gates and the push. Next in order: **the-lords-prayer**, then the-parables, the-psalms, the-story-of-the-bible, the-undivided-life, witness, womanhood, work-and-vocation.

## Sixth run (the-lords-prayer, the-parables)

- **the-lords-prayer** (done): words 24,807 to 20,029; teaching 4,957 to 4,368. "Bell" 23 to 0; "honest" 64 to 1; "Leader to confirm" 2 to 0; contractions 117 to 616. Quotations of people: none carried in quotation marks; "God helps those who help themselves" kept as a proverb, now attributed to Aesop and Franklin. No quotation added. Scripture now quoted in ESV with references (the old guide ran the verses into its prose unmarked). Corrected: the 2019 change was Pope Francis approving a new Italian wording for the Mass, "do not abandon us to temptation" (checked by search); Origen's On Prayer dated about 233, not 253; the Didache's doxology is the short form "for yours is the power and the glory forever"; a hundred denarii is a few months' wages, not a few days'; Barr's essay titled and dated. Cut: Karl Barth's lectures on prayer (the claim attributed to him could not be checked from here); the FAQ about the writer's method (12 to 11); two "Leader to confirm" notes. Help: the abuse topic in sensitive-pages.json is untouched; sessions 1, 2 and 4 (objections, practice, case studies, a discussion note), FAQ 4, the facilitator script and the primer now point to the help information printed with the guide, and the primer names Find Help. Biography: "I was raised without a father" once, session 1 teaching, where the word Father does its work; the atheism and five sons credentials (summary, primer, FAQ, script) removed.
