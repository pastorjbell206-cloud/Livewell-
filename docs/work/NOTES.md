# Work notes (persisted so a container reset loses nothing)

This folder holds work in progress on the claude/todo-implementation-hhp4bm
branch. `autosave.sh` commits and pushes it every five minutes while a session
runs. Nothing here is read by the site build.

## What happened

- 2026-10-12: James approved the simplified site (PR #531, merged 10-14).
- 2026-10-14: PR #532 (RSS fix) and #533 (home copy James chose) merged.
  James merged PR #521 (the Grow build-out) himself the same day.
- 2026-10-14 to 10-23: all 52 shelf essays were rewritten, fact-checked,
  voice-edited and audited, and 45 were mid-polish, in the scratchpad. A
  container reset between 10-23 and 10-26 wiped the scratchpad. Only the five
  approved pilots survived (recovered from the review artifact into
  `docs/work/essays/`). Lesson: everything is written under `docs/work/` now.

## Decisions already made (keep them)

- Essays ship as `client/public/essays/<slug>.json` overrides (see
  `client/public/essays/README.md`); pending shelf entries go public when a
  rewrite exists. New essays get a shelf entry with status "pending".
- No em-dashes anywhere in essay prose (James's #521 rule: the em-dash reads as
  an AI tell in his voice). Verbatim quotations keep their own punctuation.
  Closing Texts lines read: *"Quote."* (Reference) on one line.
- Shelf-wide stock phrases became a stamp when the set was read together. Use
  each at most once and in only a few essays: "Those of us who preach",
  "pastors like me", "This is not both-sidesism", "Consider ...",
  "none of this", "the record".
- Biography: only confirmed facts. Came to faith as an adult from atheism;
  raised without a father; wife Susanna; five sons; a pastor; founded the
  Pastors Connection Network. He pastors a Baptist church (First Baptist Church
  of Fenton, Michigan), so "Baptist" self-identification is fine, but never
  imply Southern Baptist membership (unconfirmed). Never state years in
  ministry, his title, or a book count (12 vs 15 years and 21 vs 25 books are
  unresolved). No invented scenes, conversations or congregants.
- Contested second-order questions are stated fairly and left open. Hold for
  James (do not publish until he gives his position or says to publish open):
  women-and-leadership-church, what-the-bible-says-about-submission,
  how-to-read-genesis-one.
- "Raising sons in a post-Christian country" needs James's own story; not
  written.
- Scripture is ESV verbatim. esv.org is unreachable from the sandbox; verify
  with WebSearch snippets (budget is about 200 searches per workflow run) or a
  local ESV text if one is available.
- Primary sources: a public-domain patristic library is cloneable from
  https://github.com/HistoricalChristianFaith/Writings-Database (ANF/NPNF and
  Pearse translations; avoid its machine-translated Migne material).
  raw.githubusercontent.com is reachable; newadvent, ccel, wikisource,
  gutenberg.org and facebook are not.
- Facebook is blocked, so James's profile photo must come to us another way
  (Google Drive or chat attachment).
- The production posts table has no coverImage column (fixed in the RSS feed,
  PR #532).

## Titles the writers chose (reuse unless a better one is obvious)

augustine-the-restless-man: Augustine's Confessions and the Restless Heart
black-church-prophetic-justice: The Black Church and Prophetic Justice
can-you-be-good-without-god: Can You Be Good Without God?
christianity-was-never-western: Is Christianity a White Man's Religion?
church-megaproject-widow-mite: What Does the Widow's Mite Really Mean?
covenant-vs-contract-what-marriage-is: Is Marriage a Covenant or a Contract?
did-god-command-genocide: Did God Command Genocide?
did-the-resurrection-happen: Did the Resurrection Actually Happen?
doctrine-of-discovery: What Is the Doctrine of Discovery?
doubt-after-church-abuse: Doubt After Being Abused by a Church Leader
excavation-not-demolition: Deconstructing Your Faith: What to Tear Down and What to Keep
how-american-christianity-became-american: How American Christianity Became American
how-to-read-genesis-one: How Should a Christian Read Genesis 1?
prosperity-gospel-is-not-the-gospel: What's Wrong with the Prosperity Gospel?
psalm-82-unjust-systems: What Psalm 82 Says About Unjust Systems
reformation-actually-about: What Was the Reformation Actually About?
the-anabaptist-option: Who Were the Anabaptists, and Why Do They Still Matter?
the-council-of-nicaea-what-was-decided-in-325: What Was Decided at the Council of Nicaea?
the-crusades-what-actually-happened: The Crusades: What Actually Happened
the-end-of-home-field-advantage: How Do You Share Your Faith in a Post-Christian America?
the-first-christians-died-for-this: Why Were the Early Christian Martyrs Willing to Die?
the-historical-jesus: Was Jesus Real? What Historians Actually Know
the-machine-that-forms-you: What Is Your Phone Doing to Your Soul?
the-persecution-we-invented: Is the American Church Really Being Persecuted?
the-rise-of-the-nones: Why Are People Leaving the Church?
the-theology-of-saturday: What Holy Saturday Teaches About Grief
what-a-christian-owes-the-city: What Does It Mean to Seek the Welfare of the City?
what-fatherhood-requires: What Does the Bible Say About Being a Father?
what-render-unto-caesar-actually-means: What Did Jesus Mean by "Render Unto Caesar"?
what-the-bible-says-about-submission: What Does the Bible Say About Submission in Marriage?
what-the-original-audience-heard: What the First Readers of the Bible Actually Heard
when-god-bless-america-replaces-thy-kingdom-come: When God Bless America Replaces Thy Kingdom Come
when-politics-replaced-theology: Where Did the Religious Right Come From?
when-the-pulpit-became-a-precinct: When Your Church Becomes a Voting Bloc
where-church-was-silent-history-injustice-reckoning: Where Was the Church During Slavery and Jim Crow?
why-does-god-allow-suffering: Why Does God Allow Suffering?
why-does-god-feel-far-away: Why Does God Feel So Far Away?
why-people-fled-to-the-desert: Why Did the Desert Fathers Leave Everything?
why-trust-the-bible: Can You Trust the Bible?
women-and-leadership-church: Can Women Be Pastors?
New: baptists-and-the-wall-of-separation, what-romans-13-says,
who-decided-what-books-are-in-the-bible, is-it-wrong-to-love-your-country,
end-times-israel-and-american-politics, the-children-rome-threw-away,
did-christianity-copy-pagan-myths.

## Essays each rewrite folds in (old slugs to 301 to the new essay once live)

what-christian-nationalism-is-and-is-not: the-flag-in-the-sanctuary, two-kingdoms-one-pledge
what-render-unto-caesar-actually-means: the-church-captive-to-the-culture-war, the-third-temptation
when-the-pulpit-became-a-precinct: conscience-outsourced-to-party, when-elders-are-loyal-to-a-party
the-end-of-home-field-advantage: christendom-is-ending-christianity-is-not, the-church-has-outlived-its-own-funerals
the-rise-of-the-nones: why-churches-close-and-what-comes-next, why-people-are-leaving-the-church, why-young-adults-arent-coming-back
what-a-christian-owes-the-city: church-abandoned-public-square, exile-is-not-the-end, jeremiah-letter-exiles
the-persecution-we-invented: what-dies-when-christendom-dies
how-american-christianity-became-american: the-great-awakenings-and-the-making-of-american-* (resolve exact slug), what-evangelicalism-was-supposed-to-be
when-politics-replaced-theology: how-the-religious-right-was-built, why-the-church-lost-the-culture-war
where-church-was-silent-history-injustice-reckoning: the-christianity-of-this-land, the-most-segregated-hour, where-church-was-silent, white-evangelicalism-and-race
black-church-prophetic-justice: the-black-church-in-america
the-early-church-under-rome: witness-without-power
the-council-of-nicaea-what-was-decided-in-325: the-trinity-is-not-optional (church-fathers-not-boring already 301s to /study)
christianity-was-never-western: global-church-is-your-church
reformation-actually-about: how-the-reformation-started-* (resolve), the-fight-to-put-the-bible-in-your-hands, what-the-reformation-actually-changed, why-there-are-so-many-christian-denominations
what-the-original-audience-heard: six-verses-we-memorized, the-whole-counsel
women-and-leadership-church: women-in-ministry, women-in-the-bible
excavation-not-demolition: reconstruction-manual, when-apologetics-isnt-enough
why-trust-the-bible: can-you-trust-the-bible, teen-can-you-actually-trust-the-bible
did-the-resurrection-happen: the-historical-jesus-without-the-shortcuts
why-does-god-allow-suffering: is-god-in-control, natural-evil-and-animal-suffering
why-does-god-feel-far-away: apologetics-why-is-god-hidden, can-you-have-faith-and-doubt, emotional-doubter
can-you-be-good-without-god: apologetics-where-does-morality-come-from, morality-without-god-and-with-him
doubt-after-church-abuse: sexual-abuse-crisis-in-the-church, spiritual-abuse-how-good-theology-gets-* (resolve)
covenant-vs-contract-what-marriage-is: one-flesh-in-hebrew, protecting-your-marriage-from-work
what-the-bible-says-about-submission: bible-submission-marriage, submission-womans-perspective
the-machine-that-forms-you: digital-discipleship, formed-by-screens-technology-and-the-soul
the-theology-of-saturday: the-weight-that-stays, when-god-is-silent-and-the-room-is-empty

## Church history study (design lost; consensus survives)

Judges' consensus from the lost design run: primary-sources backbone (verbatim
excerpts from public-domain translations, verified by script), course
pedagogy (about 32 to 36 sessions of 3,000 to 4,000 words, each with a
before-you-read myth check, the story with source cards and ESV Scripture, one
steelman, one mirror, a few retrieval questions, discussion questions, leader
notes behind a toggle, a printable handout), a connected registry (people,
events, places, councils, sources; entity sheets; list-first timeline; atlas;
contemporaries; councils and controversies explorer). About 2.5x the current
study. Vertical slice first (How to Read the Dead, Rome on the approved pilot,
Nicaea, Callinicum and Thessalonica as the first reckoning), then one Part per
PR. Keep /theology/history URLs; no new redirects there. Current study: 7 eras,
68 events, 11 councils, 10 heresies, 36 figures (2 women), 22 essays.
