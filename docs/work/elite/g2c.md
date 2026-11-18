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
- **the-parables** (done): words 24,947 to 19,092; teaching 5,216 to 4,232. "Bell" 21 to 0; "honest" 28 to 0; "Leader to confirm" 2 to 0; contractions 102 to 498. Quotations of people: C. H. Dodd's definition of a parable, now quoted exactly with source and date (checked by search). No quotation added. Scripture now quoted in ESV with references; Luke 10:33 quoted with an ellipsis to avoid "journeyed". Corrected: timeline order (Nathan, about 1000 BC, had sat after Isaiah, 740 BC); Jülicher dated 1886 to 1899, not 1888; Bailey's honor-shame claims marked as his reading; the leaven-as-corruption point is no longer attributed to Snodgrass, and the claim that Snodgrass says Jesus spoke of judgment "more than almost anyone" is no longer his; "half-breed" removed; Zechariah 4:10 is a statement, not a question. Cut: a placeholder bibliography entry ("The Meaning of the Parables" by "pastoral and expository literature"); the FAQ about the writer's method (12 to 11); Bailey's untransliterated village-ceremony term; two "Leader to confirm" notes. Help: no help topic for this guide in sensitive-pages.json; session 5's practice and case study now separate letting go of a debt from going back within reach of harm, and the primer, case study and FAQ point to Find Help. Biography: "I came to faith from atheism" once, session 1 teaching, beside the objection that hiding truth in riddles is unfair; the other uses (summary, primer, two FAQs) removed.

### What I ran (sixth run)

- `node scripts/validate-studyguides.mjs` after each guide: 68 guides, 0 failures. Index rebuilt after each.
- Literal search of both guides for every forbidden word and phrase, em-dashes, "Bell" and "Leader to confirm": clean. "Blessed" appears only inside quoted Scripture (Matthew 13:16) or as a verb. Every exclamation point is inside quoted Scripture.
- Web searches: 1 for the-lords-prayer (the 2019 Italian wording), 1 for the-parables (Dodd).

### What only James can supply (sixth run)

- The Lord's Prayer: "I was raised without a father, and I know what that word can do" is used once, in session 1, where the word Father is the subject. The old guide used atheism, fatherlessness and five sons together as credentials four times; those are gone. "I have" and "I do" confessions (wandering mind, lying awake over tomorrow) carry the old guide's self-implication in plain form; whether they're true of him as he'd say them is his to confirm.
- The Parables: "I came to faith from atheism, and I remember thinking something like that" (that a God who hides truth in riddles is unfair) is used once, in session 1. The remembered thought is an inference from the old guide's framing, not something he has told us; he may want to keep, change or cut it.
- Gates, run after merging the latest origin branch: `pnpm check` passed; all 35 content-gate commands from ci.yml passed; `pnpm test`: 144 files passed, 7 skipped (1,640 tests).

### Not done or not verified (sixth run)

- No pnpm build, Lighthouse or screenshots (the lead runs those).
- Scripture quoted from memory of the ESV; there is no ESV in the repository.
- PDFs not rebuilt (`pnpm pdfs`).
- Heidelberg Q&A 126 and Calvin's means-and-end answer paraphrased from memory of the texts, not checked against a copy.

### Where this run stopped

Stopped at a clean guide boundary after the-parables, to leave room for the gates and the push. Next in order: **the-psalms** (abuse and sexual-assault help topics in sensitive-pages.json), then the-story-of-the-bible, the-undivided-life, witness, womanhood, work-and-vocation.

## Seventh run (repair to the-parables; the-psalms, the-story-of-the-bible)

### Repair: the-parables

- Session 1 read "I came to faith from atheism, and I remember thinking something like that" (that a God who hides truth in riddles is unfair). The remembered thought was inferred, not something James said. It now reads "That's an objection a thoughtful skeptic raises, and I want to honor it." The guide now carries no biography at all.
- Searched the whole guide for "I remember", "remember", "I used to", "when I was", "I once", "I've seen", "years ago", "I grew up", "I felt", "I recall" against the version before commit 33350915. No other recollection, feeling or habit of his was added; the other matches are group instructions, Scripture, or sentences the old guide carried.

### the-psalms (done)

- Words 23,878 to 19,323; teaching 4,402 to 3,973. "Bell" 23 to 0; "honest" 88 to 11 (the title keeps "Honest Prayer"); "Leader to confirm" 6 to 0; contractions 82 to 572.
- Quotations of people: Calvin's "An Anatomy of all the Parts of the Soul" now quoted exactly from the Calvin Translation Society preface (checked by search); his mirror sentence kept as paraphrase. Athanasius, Lewis and Bonhoeffer kept as paraphrase with attribution. No quotation added.
- Scripture: ESV as before, now quoted with references throughout (the old guide ran verses into its prose unmarked).
- Corrected: the Athanasius bibliography entry (titled "Reflections on the Psalms as the Prayer Book of Christ" with the letter as its author) is now Letter to Marcellinus by Athanasius; timeline no longer says the Songs of Ascent "develop" around 950 BC or that the Psalter reached its final shape in 515 BC; Septuagint dated third to second century BC; Augustine's Expositions dated about 392 to 422; "a thousand miles" to "hundreds of miles"; children dying in the fall of Jerusalem tied to Lamentations 2:11; Brueggemann's remark that a church without lament forces a choice between honesty and faith is no longer put in his mouth.
- Cut: the placeholder bibliography entry "A Sacrifice of Praise" by "counseling and pastoral literature on lament" (12 to 11 entries); six "Leader to confirm" notes; the biography as credential (summary, primer, facilitator script, FAQ, three promo pieces, session 5 teaching).
- Help: sensitive-pages.json untouched (topics abuse and sexual-assault). Every help sentence in the old guide (session 3 case study's path to a counselor and the validate-the-rage lines, the primer's disclosure paragraph, the facilitator's private-availability and open-door lines, the cadence care notes) checked by script as present word for word in both files. Added: session 3 case study and practice, FAQ 2 and the primer point to the help information printed with the guide; the primer names Find Help. Session 3 deeper now says forgiving never requires staying within reach of harm.
- Biography: "I came to faith from atheism and had to learn to pray from scratch" once, session 1 teaching. The old guide's promo said he "came to faith from atheism and had to learn to pray from scratch"; nothing beyond that was added. Three sentences I first drafted that gave him a feeling or memory ("I've felt that pull as a pastor", "I've seen it in people", "I've done some of that burying myself") were removed before commit.

### the-story-of-the-bible (done)

- Words 25,833 to 20,502; teaching 5,393 to 4,612. "Bell" 29 to 0; "honest" 68 to 6; "Leader to confirm" and "Leader to weigh" 6 to 0; contractions 67 to 544.
- Quotations of people: none carried in quotation marks except Scripture. Lewis's trilemma, Taylor's buffered self, Rieff's triumph of the therapeutic, Solzhenitsyn's line through every heart, Wittgenstein's "that it is", Stott and Wright kept as paraphrase with attribution and dates. "Opiate of the masses" now "the opium of the people," Marx's phrase, unquoted. No quotation added.
- Scripture: ESV as before, now quoted with references throughout; Isaiah 53:6 quoted around the ESV's own dash.
- Corrected: "four thousand years" from Abraham to Christ (it is about two thousand) everywhere; Genesis 1 says "good" six times and then "very good", not "seven times good, and then very good"; Solzhenitsyn wrote after the camps, not "from inside" them; "Son, your sins are forgiven" (ESV) for "My son"; 1 Corinthians 15:19 quoted in place of the invented "pitiable fraud"; the claim that historians "across the spectrum" grant the empty tomb now says that point is more disputed; Wright's five acts given as he lists them (the fifth is the church) and Bartholomew and Goheen's drama noted as six acts; Simply Christian's four echoes named correctly; Exodus and Abraham dates marked as debated or traditional; Revelation dated "about AD 95 (a common dating)"; prophets dated Amos to Malachi.
- Cut: the FAQ about the writer bringing himself in (12 to 11); "Leader to confirm" and "Leader to weigh" notes; the biography as credential (summary, primer, facilitator script, FAQ 3, three promo pieces).
- Help: no help topic for this guide in sensitive-pages.json. Added: session 2's case study (a woman hurt by a harsh church) and session 5's (a grieving widower) point to a pastor or counselor and Find Help; the primer names Find Help and the two tender sessions; the deeper notes say being sinned against is not the same as sinning.
- Biography: "I came to faith from atheism, so I've held this view myself" once, session 1 teaching, beside the materialist account. The old guide said "I once held it myself" in the same place; nothing beyond that was added.

### What I ran (seventh run)

- `node scripts/validate-studyguides.mjs` after the repair and after each guide: 68 guides, 0 failures. Index rebuilt after each.
- Help lines in the-psalms checked by script, word for word, against the old file; sensitive-pages.json and crisis data untouched.
- Literal search of both guides for every forbidden word and phrase, em-dashes, "Bell" and "Leader to confirm": clean. "Blessed" as an adjective appears only inside quoted Scripture. Every exclamation point is inside quoted Scripture.
- Web searches: 1 for the-psalms (Calvin's preface), 0 for the-story-of-the-bible.
- Gates, run after merging the latest origin branch: `pnpm check` passed; all 35 content-gate commands from ci.yml passed; `pnpm test`: 144 files passed, 7 skipped (1,642 tests).

### What only James can supply (seventh run)

- The Parables: no longer names his atheism at all after the repair; if he wants his own memory of that objection there, it has to come from him.
- The Psalms: "I came to faith from atheism and had to learn to pray from scratch" in session 1. The old promo kit said this of him; whether he'd say it this way is his to confirm.
- The Story of the Bible: "I came to faith from atheism, so I've held this view myself" (the materialist account) in session 1, carried from the old "I once held it myself."

### Not done or not verified (seventh run)

- No pnpm build, Lighthouse or screenshots (the lead runs those).
- Scripture quoted from memory of the ESV; there is no ESV in the repository.
- PDFs not rebuilt (`pnpm pdfs`).
- Bonhoeffer's and Lewis's arguments paraphrased from memory of the books, not checked against copies.

### Where this run stopped

Stopped at a clean guide boundary after the-story-of-the-bible. Next in order: **the-undivided-life**, then witness, womanhood, work-and-vocation.

## Eighth run (the-undivided-life, witness)

### the-undivided-life (done)

- Words 24,844 to 22,853; teaching 6,693 to 6,130. "Bell" 54 to 0 (the remaining matches are "Bellah"); "honest" 38 to 11; "Leader to confirm" 4 to 0; contractions 37 to 642. Every teaching now runs in paragraphs (it was one block per session).
- Quotations of people: none carried in quotation marks except Scripture. Kuyper's "square inch" (1880) kept as paraphrase, without the quoted "Mine"; Bellah, Taylor, Smith, Heschel ("palace in time"), Brueggemann ("anxiety system"), Keller (contract and covenant) and Plantinga (shalom as universal flourishing, wholeness and delight; sin as its vandalism) kept as paraphrase with attribution and dates. No quotation added.
- Scripture: ESV as before, now quoted with references throughout. Corrected: Romans 12:1 "reasonable worship" (KJV) to the ESV's "spiritual worship," with a note that the word can be rendered "rational"; 1 Corinthians 13 "keeps no record of wrongs" (NIV) to the ESV's "not irritable or resentful," with the Greek sense of counting wrongs explained; Malachi 2:14 "wife of your covenant" to "your wife by covenant"; Jeremiah 29:11 "plans for wholeness" to the ESV's "plans for welfare," with the Hebrew shalom named.
- Corrected: the timeline put Hosea at about 1000 BC with David (Hosea is about 750 BC; now its own entry, 13 to 14 entries); Luther's 1520 "milkmaid" (a popular attribution) now his cobbler, smith and farmer in To the Christian Nobility; Ephesians and Philippians dated about AD 60 to 62; the Exodus date marked traditional and debated; Bellah's finding stated as the book puts it (individualism as Americans' "first language"); Keller's contract and covenant distinction credited to The Meaning of Marriage, not Every Good Endeavor; FAQ 1 and FAQ 4 claimed the leader primer said things it didn't, so the primer now says them (a study that leaves people more ashamed has failed; covenant never requires staying in danger).
- Cut: the plug for "James Bell's book The Undivided Life" (not on the three-book shelf) from the summary and all three promo pieces; four "Leader to confirm" notes and "Not cited by Bell directly"; the biography as credential ("came to faith from atheism" in the summary, primer and FAQ 10; "I was raised without a father" in session 5's teaching). The guide now carries no biography. FAQ 10 ("Why does the study keep implicating the writer") is now "Why does the study ask the leader to go first?" (count kept at 12).
- Help: no help topic for this guide in sensitive-pages.json. Added: the leader primer's paragraph on a dangerous marriage (don't counsel staying; talk privately; a pastor, a counselor, Find Help) and on not shaming financial hardship; FAQ 4 points a person in danger to their leader or a pastor and Find Help; session 3's practice, discussion note and prayer, session 4's note that some exhaustion is necessity not pride, session 5's note on hardship, and the facilitator's close inviting anyone carrying something heavier to talk afterward.
- First person: only what the old guide stated of him ("I've lived in the boxes," "I've flinched," "I won't tell you I've arrived," "I'd counsel anyone," "I say it about myself before I say it about you," "a man still arguing with his own heart"). Nothing added.

### What only James can supply (eighth run)

- The Undivided Life: the old guide said the study was "drawn from James Bell's book The Undivided Life." That book isn't on the shelf, so the plug is gone. If the book exists and he wants it named, that's his call.
- The Undivided Life: the old session 5 said "I was raised without a father, and I have lived in the boxes." It did no work there, so it's cut. If he wants his fatherlessness tied to the idea of producing one's own worth (session 4), that sentence has to come from him.

### witness (done)

- Words 25,536 to 21,804; teaching 7,225 to 5,811. "Bell" 22 to 0; "honest" 124 to 8; "Leader to confirm" 5 to 0; "steelman" 2 to 0; contractions 82 to 679. Every teaching now runs in paragraphs.
- Quotations of people: Tertullian's "See," they say, "how they love one another" (Apology 39) now quoted as the Christian History Institute and Bibliothek der Kirchenväter render it (checked by search; the old timeline carried it unquoted). Finney (1835), Newbigin (the congregation as the hermeneutic of the gospel), Augustine, Lewis and Bonhoeffer kept as paraphrase with attribution. No quotation added.
- Scripture: ESV as before, now quoted with references throughout. Corrected: John 9:25 "One thing I know" to the ESV's "One thing I do know" everywhere (teaching, FAQ, glossary, quote card); Deuteronomy 10:19 quoted as the ESV has it ("sojourner"); "I believe, help my unbelief" given the ESV punctuation, and the claim that it is "three words long" dropped.
- Corrected: the timeline's plague of "circa 165" (the Antonine plague, where Christian nursing is not documented) is now the plague of about 250 to 270, with Dionysius of Alexandria's account and Julian's complaint of 362, which is the evidence the old guide's "documented even by hostile observers" was reaching for; Finney dated to his 1835 Lectures; 1934 entry now names the Barmen Declaration and says Bonhoeffer served the Confessing Church (he did not sign at Barmen); Corinthians about AD 54, 1 Peter about 62 to 64, Pentecost about 30 to 33, Confessions 397 to 400; Paul's death "for the faith" dropped from the objection (it rests on tradition), beatings and shipwreck kept with 2 Corinthians 11; FAQ 0 claimed the leader primer said a study that leaves people more ashamed has failed, so the primer now says it.
- Cut: five "Leader to confirm" notes (Stark's figures now "estimates, present them as his"); "I write books" (stamp); the biography as credential (summary, primer, session 1 teaching, objection responses in sessions 1, 2 and 4, FAQ 7 and FAQ 10).
- Help: no help topic for this guide in sensitive-pages.json. Added: the primer's paragraph on people wounded by churches that pressured or controlled them (listen, follow up privately, a pastor or counselor, Find Help); session 3's discussion note not to rush such a person toward reconciliation; FAQ 11 and the facilitator's close keep the invitation to talk privately.
- Biography: "I came to faith from atheism" once, session 2 teaching, where the skeptic's distrust is heard "from the inside." The old guide said "I take it from the inside, because I was the skeptic" in the same place. Session 4's old self-implication ("a story like his, atheist to believer... invites performance") now addresses everyone whose story fits the dramatic arc; it no longer says anything of James.
- First person otherwise only what the old guide stated ("it has tempted me" of the argument-winner, "this session indicts me as much as anyone," "I've come to believe" some dread is wisdom).

### What only James can supply (witness)

- Session 2: "I came to faith from atheism" beside the skeptic's distrust. If he wants a memory of being treated as a target himself, it has to come from him; the guide claims none.
- Session 4 used to point to his own atheist-to-believer story as a temptation to perform. That's now general. Whether he wants to say it of himself is his call.

### What I ran (eighth run)

- `node scripts/validate-studyguides.mjs` after each guide: 68 guides, 0 failures. Index rebuilt after each.
- Literal search of both guides for every forbidden word and phrase, em-dashes, "Bell" and "Leader to confirm": clean. "Blessed" appears only as a verb or inside quoted Scripture; every exclamation point is inside quoted Scripture.
- Web searches: 0 for the-undivided-life, 1 for witness (Tertullian).
- Gates, after merging the latest origin branch: `pnpm check` passed; all 35 content-gate commands from ci.yml passed, each exit code checked; `pnpm test`: 144 files passed, 7 skipped (1,642 tests).

### Not done or not verified (eighth run)

- No pnpm build, Lighthouse or screenshots (the lead runs those).
- Scripture quoted from memory of the ESV; there is no ESV in the repository.
- PDFs not rebuilt (`pnpm pdfs`).
- Kuyper, Heschel, Brueggemann, Keller, Plantinga, Bellah, Finney and Newbigin paraphrased from memory of the books, not checked against copies.

### Where this run stopped

Stopped at a clean guide boundary after witness, to leave room for the gates and the push. Next in order: **womanhood**, then work-and-vocation.

## Ninth run (womanhood, work-and-vocation)

### womanhood (done)

- Words 24,430 to 22,183; teaching 4,937 to 4,737. "Bell" 24 to 0 (the old guide named him in questions and summaries); "honest" 57 to 3; "Leader to confirm" 3 to 0; contractions 114 to 591. Every teaching, case study and Going Deeper now runs in paragraphs.
- Contested questions: session 4 still states the complementarian and the egalitarian readings each at its strongest, sorts the question as second-order, and lands where the old guide landed ("a complementarian, but a chastened one"), naming the same unanswered objection (the women of session 2). Nothing new is claimed about where he lands. The egalitarian case now quotes 1 Corinthians 14:35 and cites the Ephesian false teaching (1 Timothy 5:13-15; 2 Timothy 3:6-7) instead of asserting that women there "taught a mythology Paul is fighting," which is a hypothesis; it is now marked as what many egalitarian scholars argue. Junia's standing ("well known to the apostles" or "among them") left open, as the old Going Deeper left it.
- Quotations of people: none in quotation marks except Scripture, as before. Chrysostom on Junia kept as paraphrase. "In essentials unity..." kept as an unattributed old saying. Luther's 1520 To the Christian Nobility now gives the shoemaker, smith and farmer in place of the old "milkmaid." No quotation added.
- Scripture: ESV as before, now quoted with references throughout. Corrected: Genesis 3:16 now in the ESV's current text ("contrary to your husband"), with a note that earlier editions and most translations read "for your husband"; Galatians 3:28 "neither male nor female" to the ESV's "no male and female"; Romans 16:7 no longer has Paul "calling her notable among the apostles" (the ESV reads "well known to the apostles"; the other reading is named as a reading); Anna's age given with the ESV's note; John 20:18 memory verse given its quotation marks (the ESV's dash rendered as a comma).
- Corrected: session 4 tied the "cruciform authority" to "session three, the headship that dies," but session 3 is Proverbs 31; it now rests on Mark 10:45. Priscilla's name "listed first more often than not" is now "first in four of the six places the couple is named." Phoebe "almost certainly" carried and "read" the letter is now "most scholars think she carried" it. "The early church called her the apostle to the apostles" is now "later Christian tradition." Junia "read without controversy for the first thousand years" is now "no commentator we know of read the name as a man's until about the thirteenth century" (checked by search). Timeline dates given as ranges where debated (Deborah, Anna, Priscilla at Ephesus about AD 52).
- Cut: "father of five sons" and "a pastor with five sons" (summary, FAQ 9, facilitator's open, invite caption): credential, not doing work. The guide now carries no biography. FAQ 9 ("Why does the writer, a man, keep implicating himself") now "Why does the teaching keep implicating men, and its own writer"; count kept at 12. Three "Leader to confirm" notes in the bibliography (the books are real; notes reworded).
- Help: no help lines in the old guide and no help topic for womanhood in sensitive-pages.json (checked by script: no phone number, hotline or "Find Help" in the old file, so none could be lost). Added, because the guide touches headship and harm at home: a leader-primer paragraph (a woman hurt, threatened or controlled at home: take her seriously, talk privately, no reading of headship asks her to stay in danger or stay quiet, a pastor or counselor, the Find Help page, emergency services if in immediate danger); one sentence in session 4's teaching that no reading of either passage asks a woman to stay quiet about harm; the facilitator's close invites anyone carrying harm or grief to talk afterward; session 5's practice and FAQ 7 point a heavy grief to a leader, pastor or counselor.
- First person: only what the old guide stated of him ("I don't exempt myself," "I have to grant," where he lands, "it costs me something to say," "if I'm honest, they feel like a position straining," "I've felt the force of your best argument"). Nothing added.

### What only James can supply (womanhood)

- The old guide said three times that it was written by "the father of five sons." It did no work there and is cut. If he wants his sons tied to how a man reads a study on womanhood, that sentence has to come from him.
- Session 4 lands as "chastened complementarian," as the old guide did. Whether that is his settled public position on this platform is his to confirm.

### work-and-vocation (done)

- Words 23,927 to 21,439; teaching 5,387 to 4,898. "Bell" 22 to 0; "Leader to confirm" 5 to 0 (and "Not cited by Bell directly"); contractions 67 to 579. "honest" 53 to 22, most of the rest being the doctrinal phrase "honest work." Every teaching, case study and Going Deeper now runs in paragraphs.
- Quotations of people: the old quote card put Luther in quotation marks ("When the milkmaid milks the cow, said Luther, it is God who is milking..."). Searched: the milkmaid line is a summary from Gustaf Wingren's Luther on Vocation, picked up by Veith; no primary Luther text found. Cut as a quotation; the guide now gives Luther's own 1520 argument (shoemaker, smith, farmer in To the Christian Nobility) and calls the milkmaid picture his interpreters' summary. Sayers (Why Work?, 1942) kept as paraphrase and slightly closer to her text (the church tells the carpenter to stay sober and come to church; it should tell him the first demand of his religion is good tables). DeKoster, Keller, Guinness and Wright paraphrased with attribution. No quotation added.
- Scripture: ESV as before, now quoted with references throughout; memory verses given in the ESV's words ("the garden of Eden," "LORD," and the full 1 Corinthians 15:58). Added in the objection on fire: 2 Peter 3:10 reads "will be exposed" in the ESV (not "burned up"), and 1 Corinthians 3:12-15's "wood, hay, straw" (the old "stubble" was the KJV). Colossians 3 and Ephesians 6 now carry one sentence that Paul is speaking to slaves without blessing slavery (the skeptic reader would stumble there).
- Corrected: DeKoster's book dated 1982 (the old timeline said 1962); Ecclesiastes no longer dated "circa 950 BC" (dating debated); Psalm 127 noted as titled "of Solomon"; the Benedictine entry now names Augustine's On the Work of Monks and Benedict's Rule; Calvin dated to the 1559 Institutes; 1 Corinthians dated about AD 54, Colossians about AD 60 to 62; "the first person filled with the Spirit" softened to "the first person Scripture names as filled with the Spirit of God" (Exodus 28:3 speaks of skilled workers filled with a spirit of skill); "the man with the collar" became "the man in the pulpit" (imagery that doesn't fit a Baptist pastor).
- Cut: five "Leader to confirm" notes and "Not cited by Bell directly" (the books are real; notes reworded); the Luther quote card.
- Help: no help lines in the old guide and none in sensitive-pages.json (checked by script; none could be lost). Added: the leader primer's paragraph on exhaustion, job loss or failure that sounds like more than a hard season, including hopelessness (talk privately, a pastor, counselor or doctor, the Find Help page); FAQ 8 (a job doing real harm) and FAQ 10 (being out of work in a dark place); the facilitator's close; session 2's and session 4's case studies suggest a private word and, for sleeplessness and dread, a doctor or counselor. Session 4 is gentler on those who overwork from need.
- Biography: none in the old guide beyond his being a pastor; none added. First person kept only where the old guide had it ("I'm the professional Christian here," "the Sabbath command stands over me," and the pulpit announcement's "I've made an idol of my own work more than once").

### What only James can supply (work-and-vocation)

- The pulpit announcement still says, in the announcer's voice, "I've made an idol of my own work more than once," as the old one did. If James reads it himself, it's his confession to keep or cut.
- If he has a primary Luther citation for the milkmaid line, it can go back on a quote card. Without one, it stays as his interpreters' summary.

### What I ran (ninth run)

- `node scripts/validate-studyguides.mjs` after each guide: 68 guides, 0 failures. Index rebuilt after each.
- Literal search of both guides for every forbidden word and phrase, em-dashes, "Bell" and "Leader to confirm": clean (one "showing up" in womanhood caught and changed). "Blessed" appears only as a verb or inside quoted Scripture; every exclamation point is inside quoted Scripture.
- Web searches: 1 for womanhood (Junia, Chrysostom, Aegidius), 1 for work-and-vocation (Luther's milkmaid).
- Gates, after merging the latest origin branch: `pnpm check` passed; all 35 content-gate commands from ci.yml passed, each exit code checked; `pnpm test`: 144 files passed, 7 skipped (1,642 tests passed, 73 skipped).

### Not done or not verified (ninth run)

- No pnpm build, Lighthouse or screenshots (the lead runs those).
- Scripture quoted from memory of the ESV; there is no ESV in the repository.
- PDFs not rebuilt (`pnpm pdfs`).
- Sayers, DeKoster, Keller, Guinness, Wright, Calvin and Augustine paraphrased from memory of the books, not checked against copies.

### Where this run stopped

Both guides in this share are done: womanhood and work-and-vocation. Nothing is left in g2c's share.
