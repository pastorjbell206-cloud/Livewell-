# The Bible door: report on the Mark pilot (bdoor)

Written for James on 2026-11-18. The full stock-take and plan is
`docs/work/elite/bdoor-plan.md`. Every source is in
`docs/work/elite/bdoor-ledger.md`.

## The plan in a page

The Bible door is not short of words. The notes hold about 3 million. It is
short of plain words and of pictures. Most notes read like a seminary
handout: sentences of 24 to 28 words, at a college reading level, and almost
nothing is drawn.

So "exhaustive but easy" means two jobs, book by book:

1. **A plain teaching layer on top.** A book page that teaches the whole book
   in headed parts (3,500 to 5,000 words). A chapter taken passage by passage
   in short sentences, with hard words explained. The deep notes stay
   underneath for the reader who wants more.
2. **Pictures that teach.** An outline you can tap, a timeline, a drawn map,
   and later charts of who is who. Drawn in the site's engraved hand and
   loaded only when a reader scrolls near them.

1,189 chapters cannot be deepened at once (about 3 million new words). The
proposed order: Mark (the pilot), the rest of Mark, John, Luke, Matthew,
Genesis, Psalms, Romans, Acts; then a teaching front page for all 66 books
before the chapters of the rest.

## What a visitor now sees

### Mark's book page (`/study/bible/mark`, same address as before)

Above the old introduction there is now a teaching introduction of 3,433
words in ten headed parts, with a contents list:

Mark in a minute; Who wrote it, and how we know; When, where, and for whom;
What kind of book a Gospel is; How Mark is built; The big themes; How Mark
uses the Old Testament; Mark and the other Gospels; The ending of Mark; How
to read Mark in one sitting; How the church has read Mark.

With it, drawn and tappable:

- **The hardest passages**: 13, each one line with a link to its chapter.
- **Key words**: 12, each with a one-line meaning and where it appears.
- **A timeline**: 13 dates from 4 BC to the 300s, marked as the world, the
  story, or the book.
- **A map**: Galilee, the lake, the Decapolis, the coast and Jerusalem, drawn
  in the engraved hand, with 12 places. Tap a place to see what happens there
  and the verses. It loads only when scrolled near, with its space held.

Words on the book page: 4,329 before; 8,619 after (4,290 of them new
teaching, timeline, map and lists). The old introduction is unchanged
underneath.

### Mark 1 to 3 (`/study/bible/mark/1` to `/3`)

Each chapter now opens with **Passage by passage, in plain words**. For each
passage: what is happening; what the first hearers would have caught; the Old
Testament behind it; the hard verse faced; and what it asks. It loads as its
own small piece after the page, with its space held.

| Chapter | Passages | Plain words added | Deep notes (unchanged) |
|---|---|---|---|
| Mark 1 | 9 | 3,009 | 6,635 |
| Mark 2 | 4 | 1,816 | 5,468 |
| Mark 3 | 6 | 2,181 | 5,439 |
| Total | 19 | 7,006 | 17,542 |

### Three before-and-after passages

**The leper (1:40-45).** Before: the leper appears inside a long note on the
messianic secret that begins, "The objection is that the commands make little
sense as history ... In 1901 William Wrede argued in The Messianic Secret in
the Gospels that the pattern was not a memory of Jesus at all but a device of
Mark or his tradition." After: "Touching an unclean person made you unclean
too (Leviticus 5:3). So when Jesus touches the man, every hearer would expect
Jesus to become unclean. Instead the flow runs the other way. Jesus'
cleanness makes the man clean."

**The roof (2:1-12).** Before: "Village houses in Galilee were built of
basalt with flat roofs of wooden beams covered with branches and packed
earth, often reached by an outside stair. Digging through such a roof (verse
4 uses verbs for unroofing and digging out) was possible, though it would
have left a mess for the owner below." After: "Mark's Greek says the friends
'dug through' the roof. Luke, telling the same story, speaks of tiles (Luke
5:19). Either way, it was noisy, dusty, and rude. Dirt would have been
falling on the people inside."

**The unforgivable sin (3:28-30).** Before: a 1,000-word answer that opens
with Bertrand Russell's 1927 lecture and John Bunyan's Grace Abounding. It
stays, below. After, read first: "It is not a careless word spoken once in
anger. It is a settled refusal to see God's goodness as good ... Many
Christians have feared they committed this sin. A long pastoral tradition
answers that the fear itself is a sign that the heart has not turned hard in
this way."

## Sources

Every historical claim on Mark's page and in Mark 1 to 3 is in the ledger,
with its source and how it was checked. In short: Papias as quoted by
Eusebius (Church History 3.39.15); Irenaeus (Against Heresies 3.1.1);
Clement as reported by Eusebius (6.14.6-7); Eusebius 2.25 on Peter and Paul;
Tacitus (Annals 15.44) on the fire of 64; Bauckham (2006); Kok (2015);
Marcus (JBL 1992); Hengel; Burridge (1992); the Priene inscription (9 BC);
Wrede (1901); Streeter (1924); Lachmann (1835) and Holtzmann (1863); Codex
Sinaiticus and Vaticanus; Jerome (398); the Venetian relics (828); the
Galilee boat (1986); the Capernaum excavations and Egeria; the NET note and
Tyndale Bulletin on 1:41; the Mishnah (Shabbat 7:2); Josephus on Herod's
family; Bauckham on the brothers of Jesus. Scripture is the Berean Standard
Bible, checked word for word by the validator.

Web searches were run on both runs, 17 of them on the second (direct page fetches
were blocked on this machine, so checks rest on search results that quote or
summarise the source, read against at least two results where possible).

## What was left out or narrowed

Nothing had to be cut. Three sentences in Mark 1 were narrowed on the second
run because the sources would not carry them as written:

- The white synagogue at Capernaum: its late date is disputed, so the note now
  says it is "most often dated" to the late 300s or 400s and that some
  scholars place it earlier.
- The Sabbath at sunset: the note had said "the prophets forbade work"; it
  now says what Jeremiah 17:21-22 actually forbids, carrying a load.
- Peter's mother-in-law serving: angels serve Jesus first in Mark (1:13), so
  she is now "the first human being in Mark" to do what Jesus came to do.

No Papias, Irenaeus or Clement wording is quoted; it is paraphrased, because
exact translations could not be checked here. No section number is given for
Irenaeus's quotation of 16:19, because editions number it differently.

## What was run (second run)

Each was watched to the end, one heavy command at a time, after merging the
latest `claude/todo-implementation-hhp4bm`.

- `pnpm check`: passed (again after the map fix).
- All 35 commands of the CI content-gates step: passed, including the search
  index, passage index and Bible text drift checks (no index needed
  rebuilding: the plain notes feed none of them) and
  `validate-bible-notes.mjs`.
- `pnpm test`: 1,648 passed, 1 failed under load in `hq.test.tsx` (a lazy
  timeline not found in time; a file this work did not touch). Rerun alone:
  18 of 18 passed. The Study Bible tests (98) were rerun after the map fix
  and passed.
- ESLint (`--max-warnings 0`) on every changed client file: clean.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`,
  `pnpm run audit:canonicals`: passed (0 canonical failures).
- Looked at `/study/bible/mark` and `/study/bible/mark/1` at 390x844 and
  1440x900, day and night (`/home/user/elite-shots/bdoor/`). No sideways
  scroll at either width. The map's names ran off its right edge and over
  each other (Caesarea Philippi over Tyre, Bethany over the Dead Sea); the
  frame was widened and the names moved, and it was looked at again.
- Lighthouse, the chapter command from ci.yml, three runs, median, on the
  same machine one after the other: `/study/bible/mark/1` performance 90,
  accessibility 100, SEO 100, CLS 0.000; `/study/bible/john/3` performance
  89, accessibility 100, CLS 0.000. Mark 1 does not score lower. Mark's book
  page: performance 93, accessibility 100, CLS 0.000.

## What was not verified

- The disk filled during the run (other builders share it), so the final
  Lighthouse and screenshots ran on a build whose prerendered pages were
  trimmed to the three pages measured. The full `pnpm run prerender` had
  passed before the map fix; it was not rerun after it, since the map is not
  part of any prerendered page.
- The full `pnpm test` was not rerun after the map fix; the Study Bible
  tests and the typecheck were.
- Exact wording of Papias, Irenaeus and Clement could not be read in a
  checked translation here; the site paraphrases them.

## What waits for you

1. **The order of books.** Proposed above. Another order is easy.
2. **How long.** Mark's teaching page is about 4,300 words; a chapter's plain
   layer is 1,800 to 3,000. Longer chapters could go to 3,500.
3. **Whether the site states a view** on who wrote Mark, when, the order of
   the Gospels, or the ending. The pilot states each view fairly, says which
   most scholars hold and why, and takes no side.
4. **The brothers of Jesus (3:31-35).** The note gives the Protestant,
   Orthodox and Catholic readings and takes no side. Say if you want the
   site's own view stated.

## Continued: Mark 4 to 6 (2026-11-19)

James read the pilot and said "publish it all". This run added the same plain
layer, "Passage by passage, in plain words", to Mark 4, 5 and 6, in the same
data shape (`client/public/bible/notes/mark/plain/<n>.json`, with `"plain":
true` on each chapter note). No code changed. The deep notes are unchanged
underneath.

| Chapter | Passages | Plain words added |
|---|---|---|
| Mark 4 | 7 (the sower; why parables; the sower explained; lamp and measure; seed growing by itself; mustard seed; the storm) | 2,941 |
| Mark 5 | 5 (Legion; afraid of the calm; Jairus; the woman who touched his cloak; the girl raised) | 2,377 |
| Mark 6 | 6 (rejected at home; the Twelve sent; John's death; five thousand fed; walking on the water; Gennesaret) | 2,691 |
| Total | 18 | 8,009 |

Mark 1 to 6 now all open with the plain layer: 37 passages, about 15,000
plain words.

**Sources.** Every historical claim is in `docs/work/elite/bdoor-ledger.md`
under "The plain notes on Mark 4", "Mark 5" and "Mark 6", with what it rests
on and how it was checked. 21 web searches were run (7 for Mark 4, 6 for
Mark 5, 8 for Mark 6); the rest rests on the earlier ledger, the Berean
Standard Bible text (every quotation checked word for word by the validator)
and counts of the Greek text in the repository. Main sources: Jeremias and
K. D. White on sowing; the Targum of Isaiah 6:10; Jülicher and Blomberg on
parables; lexicons on the modios, tektōn and talitha; the Sea of Galilee's
geography; Livius on the Tenth Legion; Tzaferis and his critics on Kursi;
1 Maccabees 1:47 and the Jewish Encyclopedia on pigs; Mishnah Ketubot 4:4;
Josephus on John (Antiquities 18.116-119), on Antipas and Herodias, and on
James (20.200); Justin Martyr, Dialogue 88; the Roman night watches; the Greek
Old Testament's "pass by" and egō eimi.

**Narrowed or left out.** Varro's harvest yields could not be found and are
not used. Calvin's reading of 4:12 was not checked, so no Reformer is named.
Haber's argument on the bleeding woman could not be read, so the note says
only that scholars debate how far her illness cut her off. Josephus's motive
for Herod is given as "suspicious of John's influence over the crowds", the
wording the sources support, not "feared an uprising". The Kursi site is "many
think ... though not all agree". Left out entirely: the magical papyri, the
Theodotus inscription, the ruins at Jerash, Wachsmann's sandbag, Luther's
Invocavit sermons, Juvenal's baskets, Bethsaida's disputed site, Gennesaret in
Josephus, and the textual notes on 4:40 and 5:36.

**Care.** Mark 5:5 tells of a man harming himself. The hard question on
possession and illness says Christians hold that most suffering of the mind is
illness, warns against calling illness a demon, and ends with a plain line to
reach for real help now (a doctor, a pastor, or a crisis line).

**Contested matters, stated without taking a side:** why Jesus spoke in
parables (4:12); whether Jesus gave the explanation of the sower; the
possessed man and mental illness; the pigs; Jesus' brothers (pointing back to
Mark 3); how much egō eimi means in 6:50.

**What was run** (after merging the latest `claude/todo-implementation-hhp4bm`,
one at a time): `validate-bible-notes.mjs` after each chapter; all 36 commands
of the CI content-gates step, all passed; `pnpm check` passed; `pnpm test`:
146 files and 1,651 tests passed, 73 skipped. No build, Lighthouse or
screenshots, since no code changed and the plain layer renders through the
component the pilot built and measured.

**Not verified:** the new chapters were not looked at in a browser.

**Next:** Mark 7.

## Continuation: Mark 7 to 9 (2026-11-19)

Same pattern, same data shape (`client/public/bible/notes/mark/plain/<n>.json`,
`"plain": true` on each chapter note). No code changed; the deep notes are
unchanged underneath.

| Chapter | Passages | Plain words added |
|---|---|---|
| Mark 7 | 4 (unwashed hands and Corban; what makes a person unclean; the Syrophoenician woman; "Be opened") | 2,191 |
| Mark 8 | 6 (four thousand fed; a sign and the one loaf; the blind man in two stages; "You are the Christ"; the Son of Man must suffer; take up your cross) | 2,685 |
| Mark 9 | 6 (the transfiguration; Elijah; the boy and his father; who is the greatest; not one of us; millstones, fire and salt) | 2,788 |
| Total | 16 | 7,664 |

Mark 1 to 9 now all open with the plain layer: 53 passages, about 22,700
plain words.

**Sources.** Every claim is in `docs/work/elite/bdoor-ledger.md` under "The
plain notes on Mark 7", "Mark 8" and "Mark 9". 24 web searches were run (8 per
chapter); the rest rests on the earlier ledger, the Berean Standard Bible text
(every quotation checked word for word by the validator) and the Greek text in
the repository. Main sources: Mishnah Berakhot 8:2 and Nedarim 9:1; Fitzmyer
and the Mount Scopus ossuary on qorban inscriptions; the Tyrian shekel; Tacitus,
Histories 4.81 on Vespasian; Thayer on mogilalos; Ambrose, On the Sacraments
and On the Mysteries; Josephus, Antiquities 17.295 (Varus) and 18.28 (Bethsaida
Julias, Caesarea Philippi), Jewish War 1.404-405; Psalms of Solomon 17;
Plutarch on the condemned carrying his cross; the Yehohanan heel bone (1968);
Sirach 48:10; the Hippocratic On the Sacred Disease; Bailey (1986) on Gehenna
and Kimhi; lexicons on spyris, gnapheus and mylos onikos; the textual evidence
for 7:19 and 9:29.

**Narrowed or left out.** Mark 7: "some Jews died rather than break the food
laws" was cut (1 Maccabees 1:62-63 not checked this run); Josephus on the
Tyrians, Furstenberg, Theissen and Pliny not used. Mark 8: the deep note's
"no Jewish text before Jesus speaks of a suffering Messiah" was replaced by
1 Corinthians 1:23; the distance to Caesarea Philippi and the place of the
Jordan's inflow at Bethsaida were cut; Plutarch is paraphrased with no page
number. Mark 9: Ben Sira is given no date; the chemistry of salt losing its
taste could not be confirmed and is not given; the reading of 9:49 is left
open; children's legal standing in Rome is not stated.

**Care.** Mark 9:22 (a boy thrown into fire and water) and 9:43-47 (cutting off
hand, foot, eye): the notes say seizures and mental illness are illnesses and
that calling them demons is wrong and harmful; that Jesus' words are a picture,
never a command to harm the body; and each ends with a plain line to real help
(a doctor, a pastor, a crisis line).

**Contested matters, stated without taking a side:** the authority of
tradition (7:1-13); whether Jesus or the later church set aside the food laws
(7:19); why Jesus spoke so to the Syrophoenician woman; whether the two
feedings are one story; the meaning of twelve and seven baskets; whether Jesus
foresaw his death (8:31); what 9:1 refers to; the mountain of the
transfiguration; "and fasting" in 9:29; 9:49; the nature of hell beyond what
Christians agree on.

**What was run** (after merging the latest `claude/todo-implementation-hhp4bm`,
one at a time): `validate-bible-notes.mjs` after each chapter; all 36 commands
of the CI content-gates step, all passed; `pnpm check` passed; `pnpm test`:
146 files and 1,651 tests passed, 73 skipped. No build, Lighthouse or
screenshots, since no code changed.

**Not verified:** the new chapters were not looked at in a browser.

**Next:** Mark 10.

## Continuation: Mark 10 to 12 (2026-11-19)

Same pattern, same data shape (`client/public/bible/notes/mark/plain/<n>.json`,
`"plain": true` on each chapter note). No code changed; the deep notes are
unchanged underneath.

| Chapter | Passages | Plain words added |
|---|---|---|
| Mark 10 | 7 (a question about divorce; let the little children come; the man who went away sad; a camel and the eye of a needle; going up to Jerusalem; not to be served but to serve; blind Bartimaeus) | 3,506 |
| Mark 11 | 5 (the king comes on a colt; a fig tree with only leaves; tables overturned in the temple; faith that moves mountains; by what authority?) | 2,511 |
| Mark 12 | 7 (the tenants of the vineyard; what belongs to Caesar; whose wife will she be?; the greatest commandment; David's son and David's Lord; beware of the show; the widow's two coins) | 3,438 |
| Total | 19 | 9,455 |

Mark 1 to 12 now all open with the plain layer: 72 passages, about 32,000
plain words. (Counts are the words of the five prose fields, titles and
verse ranges not counted.)

**Sources.** Every claim is in `docs/work/elite/bdoor-ledger.md` under "The
plain notes on Mark 10", "Mark 11" and "Mark 12". 24 web searches were run (8
per chapter); the rest rests on the earlier ledger, the Berean Standard Bible
text (every quotation checked word for word by the validator) and the Greek
text in the repository (for example, that "indignant" in 10:14 is the only use
of that verb for Jesus in the Gospels). Main sources: Josephus, Antiquities
18.136 (Herodias), 18.16 (the Sadducees) and Jewish War 2.118 (Judas the
Galilean); the Mishnah, marked as written down around AD 200: Gittin 9:10 and
9:3, Shekalim 1:3 and 6:5, Keritot 1:7, Berakhot 1:1 and 9:5; the Damascus
Document; b. Berakhot 55b and b. Shabbat 31a, marked as later; Clement of
Alexandria's Who Is the Rich Man; Athanasius's Life of Antony; 1 Maccabees
13:51; 2 Maccabees 7; the Temple Warning inscription (1871); the Tiberius
denarius; the lepton and quadrans; the textual evidence for 11:26; Addison
Wright (CBQ 1982) on the widow.

**Narrowed or left out.** Mark 10: dates for Clement and Antony; the names and
dates of Origen, Gregory and Anselm on the ransom (the views are given, the
names are not); Akiva's generation (now "a later teacher"); the claim that
running and kneeling were unusual for a rich man; the claim that Bartimaeus
was named because the first Christians knew him. Mark 11: Bertrand Russell is
not named; "many Jews criticised the high priests" was cut; Herod's rebuilding
replaced by John 2:20; "answering a question with a question" replaced by
Jesus' own question in 10:3; the order of fig leaves and early figs is given as
disputed. Mark 12: absentee owners and quarrels with tenants; "Psalm 110 the
most quoted psalm"; Jewish readings of Psalm 110 (Justin, the Talmud, Rashi);
the scribes' legal paperwork; the date of 2 Maccabees. Many deep-note details
were simply not used (each chapter's "Left out" line in the ledger lists them).

**Care.** Mark 10:1-12 keeps a plain line: nothing in the passage asks anyone
to stay where they or their children are in danger; seek safety first; talk to
a pastor or counselor, or call a local domestic violence line (no number
given); these notes are not legal advice. Mark 11:20-26 names the hurt done by
teaching that unanswered prayer means weak faith.

**Jews and Judaism.** The fig tree, the temple action, the tenants and the
scribes are each set inside Israel's own prophets and aimed, as Mark aims them,
at the leaders of that hour; the old Christian readings against the Jewish
people are named and rejected as most Christian scholars now do; the crowd,
the scribe of 12:28-34 and the widow are shown as Jews on Jesus' side. Later
rabbinic sources are marked as later.

**Contested matters, stated without taking a side:** divorce and remarriage
(Catholic, Orthodox, Protestant, separation without remarriage); "Why do you
call Me good?"; whether Jesus asks every Christian to sell everything (Clement
and Antony); wealth and the hundredfold (and the prosperity reading answered by
"along with persecutions"); the ransom (to the devil, rejected, satisfaction of
justice, victory, a picture; and the Isaiah 53 debate); the fig tree (acted
parable, parable become story); the temple action (cleansing, sign of judgment,
the nations; one event or two); faith and prayer (11:23-24); the tenants and
Israel; taxes to Caesar (two spheres, God's claim swallows Caesar's, a clever
refusal); marriage at the resurrection; Psalm 110 and David's son; the widow
(praise, lament, or both).

**What was run** (after merging the latest `claude/todo-implementation-hhp4bm`,
one at a time): `validate-bible-notes.mjs` after each chapter; all 36 commands
of the CI content-gates step, all passed; `pnpm check` passed; `pnpm test`:
146 files and 1,651 tests passed, 73 skipped. No build, Lighthouse or
screenshots, since no code changed.

**Not verified:** the new chapters were not looked at in a browser.

**Next:** Mark 13.

## Continuation: Mark 13 to 16 (2026-11-19)

Same pattern, same data shape (`client/public/bible/notes/mark/plain/<n>.json`).
No code changed; the deep notes are unchanged underneath. The chapters were
written and committed on an earlier run that a machine restart cut off; this
run read them once as an editor, fixed two claims, ran the gates and wrote
this section.

| Chapter | Passages | Plain words added |
|---|---|---|
| Mark 13 | 6 (not one stone left on another; the beginning of birth pains; the abomination of desolation; the Son of Man coming in the clouds; the lesson of the fig tree; no one knows the day: keep watch) | 3,217 |
| Mark 14 | 8 (a plot, a jar of perfume, and a betrayal; the Passover room and the betrayer at the table; this is My body, this is My blood; you will all fall away; Gethsemane; the arrest; before the high priest; Peter denies Jesus) | 4,240 |
| Mark 15 | 6 (Jesus before Pilate; Barabbas released, Jesus condemned; the soldiers mock the king; the crucifixion; darkness, the cry, and the torn curtain; the women watching, and the burial) | 3,165 |
| Mark 16 | 3 (he has risen, he is not here; the longer ending: appearances and unbelief; the longer ending: sent into all the world) | 1,941 |
| Total | 23 | 12,563 |

**The whole book.** Mark 1 to 16 now all open with the plain layer: 95
passages, 44,510 plain words. (Counted by script: the words of the five prose
fields, `happening`, `hearers`, `ot`, `hard` and `asks`; titles and verse
ranges not counted.)

**Sources.** Every claim is in `docs/work/elite/bdoor-ledger.md` under "The
plain notes on Mark 13" to "Mark 16", each with its source and the search that
checked it, or the earlier ledger, the Berean Standard Bible text, or the
repository. Main sources: Josephus (Jewish War 5.222-223, 2.224-227,
5.449-451; Antiquities 20.97-98, 20.169-172, 4.219); 1 Maccabees 1:54;
Eusebius, Church History 3.5.3 (Pella, given as debated); C. S. Lewis, "The
World's Last Night" (one verbatim phrase); the Mishnah, marked as written down
around AD 200 (Pesachim 10, Sanhedrin 4:1); the Caiaphas ossuary (1990, the
identification given as questioned by some); the Pilate stone (1961); Tacitus,
Annals 15.44; Josephus and Philo on Pilate; Cicero, Against Verres 2.5.165
(paraphrased); the Giv'at ha-Mivtar heel bone (1968); Nostra Aetate 4 (1965,
quoted); Origen, Against Celsus (Celsus's "half-frantic woman"); Justin, First
Apology 67; Codex Sinaiticus and Vaticanus, Eusebius and Irenaeus on the
ending; encyclopedias on Appalachian snake handling.

**The editor's read (this run).** Two fixes, in one commit:
- Mark 15:1-5 said the Pilate stone "is the only ancient inscription known to
  name him". A ring from Herodium inscribed "Pilatus" (published 2018) may
  also name him, so the line now says it is "the only inscription that
  scholars all agree names him". The ledger row says why.
- Mark 16:9-14 said "a few manuscripts have a different, shorter ending
  instead". Mark's book page says one Old Latin manuscript (Bobiensis) alone
  ends that way and several Greek manuscripts carry both, so the line now says
  "One old Latin copy has a different, shorter ending instead, and several
  Greek manuscripts have both." The same passage's "Most Bibles print verses 9
  to 20 with a note" now says "Most modern Bibles", as the book page does (the
  King James Version prints them without comment).

Nothing else was changed. The read found: no em-dash; no first-person "I" in
the notes' own voice and nothing about James (the occasional inclusive "us" is
the same as in Mark 1 to 12); no quotation that is not Scripture, a checked
source, or marked as a translation.

**Narrowed or left out** (the ledger's "Left out" lines). Mark 13: Josephus on
the Egyptian's numbers; Jesus son of Ananias; the portents in Josephus and
Tacitus; the ninth of Av; Yohanan ben Zakkai; every modern interpreter and
date-setter by name; the kenotic theologians; the Arch of Titus given as
"around 81". Mark 14: the Josephus lamb count; Pliny's prices for nard;
b. Sanhedrin 43a; the scholars named in the deep note on the trial and the
supper; m. Sanhedrin 5:2 and 7:5; m. Bava Kamma 7:7 on roosters; the claim that
a servant girl could not give evidence. Mark 15: Varus's two thousand
crucified; Philo's Carabas; the Antonia and the Via Dolorosa; Augustus as son
of a god; the Church of the Holy Sepulchre; the blocking stones; Pilate's
aqueduct (not confirmed); m. Pesachim 8:6 (wording not confirmed); the
"Hail, Caesar" parallel; every scholar named in the deep note. Mark 16:
m. Shabbat 23:5 and Mishnah Shevuot 4:1; Ignatius, the Didache and Pliny; the
Nazareth Inscription; Jerome's letter to Hedibia; the Freer Logion; every
scholar named in the deep note on the ending and the resurrection.

**Care.** Gethsemane (14:32-42) and the cry from the cross (15:33-39) each
speak to a reader in sorrow that feels like dying or forsaken by God: say it
to God and to someone near, and if you have thought of ending your life or are
in danger, reach out today to a crisis line or emergency service. Nothing of
self-harm is spelled out. The crucifixion is told plainly ("And they crucified
Him"), with no lingering on the body; one passage says it is wise to follow
Mark in not dwelling on the cruelty. Mark 16:15-20 answers "Should Christians
handle snakes or drink poison to prove their faith?" with "No.", names the
deaths, and sets Matthew 4:7 against putting God to the test.

**Jews and Judaism.** Mark 14 names the particular people who condemned Jesus
(the high priest, the chief priests, elders and scribes of that council) and
says Mark does not blame the Jewish people, since Jesus, his disciples and the
crowds who loved him were Jews. Mark 15:6-15 names the old "Christ-killers"
misuse once and rejects it plainly, quotes Nostra Aetate 4, and places all
people inside the guilt with Acts 4:27. The Roman governor gives the order and
Roman soldiers carry it out.

**Contested matters, stated without taking a side.** Mark 13: whether Mark
wrote before or after AD 70; the abomination of desolation (AD 70, a future
enemy, or both); verses 24 to 27 (the second coming, the fall of Jerusalem in
the prophets' picture-language, or both), with the creeds' shared confession
that Christ will come again; "this generation" in verse 30 (three readings,
with C. S. Lewis's "most embarrassing verse" and the skeptic's objection
stated fairly); what the Son did not know (Arius, Athanasius, Chalcedon). No
dates and no end-times timetable; verse 32 is set against every date-setter.
Mark 14: why Judas did it; God's purpose and Judas's guilt; the date of the
Last Supper against John (four answers, Jaubert named, none favored); "This is
My body" (Catholic and Orthodox, Lutheran, Reformed, memorial); the young man
who fled; whether the night hearing was lawful (the Mishnah's rules and the
case against using them); one rooster crow or two. Mark 15: the Passover
release of a prisoner; the cry of forsakenness (psalm of trust, real
abandonment, speaking for humanity); the torn curtain (way opened, judgment,
both; inner or outer). Mark 16: whether Mark meant to end at verse 8 or the
ending was lost; whether verses 9 to 20 are Scripture (received by some, read
as an ancient witness by others, with no teaching built on them alone); verse
16 and baptism. Mark 16 agrees with the book page on the ending.

**What was run** (after `git merge` of the latest
`claude/todo-implementation-hhp4bm`, which was already up to date; one at a
time): `validate-bible-notes.mjs` passed (16 chapters in plain words); all 36
commands of the CI content-gates step exited 0; `pnpm check` passed; `pnpm
test`: 146 files and 1,651 tests passed, 7 files and 73 tests skipped. No
build, Lighthouse or screenshots, since no code changed.

**Not verified:** the four chapters were not looked at in a browser. The
Herodium ring (the reason for narrowing the Pilate stone line) was not
searched on this run; the narrowed line claims less either way.

**Next:** Mark is finished. The plain layer covers the whole book.

## Matthew: book page and chapters 1 to 4 (2026-11-19)

### The book page (`/study/bible/matthew`, same address)

Matthew now has a teaching introduction built from Mark's parts, data only
apart from three small code changes (below). Eleven headed parts with a
contents list: Matthew in a minute; Who wrote it, and how we know; When,
where, and for whom; How Matthew is built; The big themes; How Matthew uses
the Old Testament; Matthew beside Mark and Luke; The family tree and the birth
story; The Sermon on the Mount, and how Christians have read it; A Jewish
book, and a hard history; How the church has read Matthew. Then 16 hard
passages (each a line and a link to its verse), 12 key words, a timeline of
14 dates (37 BC to the 300s), and a map of 13 places (Sidon to Bethlehem;
Bethlehem's card says Egypt lies off the map). The outline band at the top
already drew Matthew's eight parts from its existing `structure`; the "How
Matthew is built" part links to it. "Go deeper" adds four of the site's own
pages after the shared six: Jewish life in Jesus's day, Honor and shame,
Reading genealogies, and the end-times study.

Words: 4,946 in the eleven parts; 1,034 in the lists, timeline and map; 5,980
new in all. The page's teaching block reads 6,275 words as rendered. The old
introduction is unchanged underneath ("Going further").

**Code changed, and why.** Mark's parts were Mark-shaped in three places, so a
book can now bring its own data; nothing was redesigned.
- `lib/bible-notes.ts`: optional `deeper` (a book's own "Go deeper" pages, with
  one of four icons), and on a map place optional `region` and `label` (where
  the name sits).
- `BookTeaching.tsx`: appends `teaching.deeper` after the shared list.
- `BookMap.tsx`: the hidden map description names the book's own northern and
  southern places (Mark still reads "from Sidon in the north to Jerusalem in
  the south"; towns within about 5 km count as one spot, the first listed
  wins); a place is a region by `region` or, as before, by Mark's two ids; the
  caption counts the regions; a place's `label` overrides the old table.
- `scripts/validate-bible-notes.mjs` checks the new fields;
  `teaching.test.tsx` now expects Mark and Matthew, and adds two Matthew tests.

### Chapters 1 to 4 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Matthew 1 | 4 (from Abraham to David; from David, through the exile, to the Messiah; Mary is with child, and Joseph's choice; God with us) | 2,374 |
| Matthew 2 | 5 (Magi from the east, and a troubled king; the Magi worship the child; escape to Egypt; the children of Bethlehem; home to Nazareth) | 2,494 |
| Matthew 3 | 3 (John the Baptist in the wilderness; a warning, and the one who is coming; the baptism of Jesus) | 1,572 |
| Matthew 4 | 5 (stones into bread; the temple and the kingdoms; a great light in Galilee; fishers of men; teaching, preaching and healing) | 2,149 |
| Total | 17 | 8,589 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. The deep
notes are unchanged underneath.

### Sources

Every claim is in `bdoor-ledger.md` under "Matthew's book page" and "The plain
notes on Matthew 1" to "4". 42 web searches (28 for the book page, then 4, 5,
3 and 2). Main sources: Papias in Eusebius 3.39.16 and Irenaeus 3.1.1
(paraphrased); Ignatius, To the Smyrnaeans 1.1; Didache 8; Streeter (1924);
Bacon (1918, 1930); Allison, The New Moses (1993); Pennington (2007); Farrer
(1955); Goodacre (2002); Julius Africanus in Eusebius 1.7; Herodotus 1.101;
Kepler and the 7 BC conjunction, the Chinese record of 5 BC, Molnar; Josephus,
Jewish War 1.659-666 and Antiquities 17.213-218, and on Herod's wife and sons;
Macrobius, Saturnalia 2.4.11 (given as late and doubtful); Irenaeus 3.9.2 on
the gifts; the Mishnah, Kiddushin 1:1 (marked as written down later);
Weinfeld (Bible Review, 1997); Oberammergau (1750 to 2000); Nostra Aetate
(earlier ledger); Dubovský (Biblica, 2006) on Tiglath-pileser III. Scripture
is the Berean Standard Bible, checked word for word by the validator.

### Cut or narrowed

Origen and Jerome on a Hebrew Matthew; the names of scholars on each side of
authorship (they stay in the fuller introduction below); Annius of Viterbo;
any count of the double tradition's verses; "the strongest match" for the 7 BC
conjunction; a section number for Augustine on 16:18; the twelve months of
betrothal; Dionysius Exiguus; the Babylonian ration tablets; the Herodium tomb
(its identification is disputed); Tertullian's "almost kings"; Tiridates; any
height for the temple's pinnacle; the Via Maris; Josephus's count of boats.
Tamar is "perhaps" an outsider, since Genesis does not say. The stones and
children pun is "may", since the results confirmed it in Hebrew only.

### Contested matters, and how they are stated

Authorship (apostle, or a later Jewish Christian teacher; Papias's sentence
read three ways). Date (before 70, or about 80 to 95, each side's evidence).
Place (Antioch most common; others listed). The order of the Gospels (Two
Source with Q, Farrer, Matthew first), all called hypotheses, no side. The two
genealogies (levirate, Mary's line, royal line, separate traditions), no side;
Jeconiah's curse (two answers given as what some say). Isaiah 7:14 (the
Hebrew almah, the Greek parthenos, three readings, with the virgin birth
resting on Matthew and Luke, not one word). Mary's perpetual virginity and
"until" (1:25), Catholic and Orthodox against many Protestants, no side. The
star (five proposals). The massacre (the case that it was too small to be
noticed and the skeptic's case). The Sermon on the Mount (six readings).
16:18 (Peter, his confession, or Christ; Catholic, Orthodox and Protestant)
and the divorce exception: a line each in the hard passages, for the chapter
notes to face. Why Jesus was baptized (three answers). The devil (as Matthew
tells it, and the inward reading).

**Jews and Judaism.** "A Jewish book, and a hard history" says Matthew is an
argument inside the Jewish family, names the "Christ-killers" misuse of
chapter 23 and 27:25, says it is wrong and that the site rejects it, gives
Oberammergau and Nostra Aetate, and sets 27:20 and 26:28 beside 27:25. The
hard-passage lines for 23:13 and 27:25 say the same in one line each.

**Care.** Matthew 2:16-18 tells the killing in one sentence, as Matthew does,
names Herod as the cause, gives the mothers' grief its place, and keeps a path
to help (someone trusted, a grief counsellor, a crisis line or emergency
service). Matthew 4:1-4 adds a word on fasting safely.

### Still unverified

The exact wording of every ancient writer (all paraphrased); first-century
practice of binding betrothal (the note leans on Matthew's own words);
whether the Bethlehem killing happened (stated as uncertain); the date of
Bach's first performance and Jerome's symbols rest on the repository and
the earlier ledger, not new searches.

### What was run, and what passed (watched)

All 36 content-gate commands of ci.yml: exit 0 each (validate-bible-notes:
66 introductions, 1,189 chapter notes, 20 chapters in plain words). `pnpm
check`: clean. `pnpm test`: 146 files passed, 7 skipped; 1,653 tests passed,
73 skipped. ESLint on the changed code files: clean (the validator script is
ignored by the ESLint config). `pnpm build`, `pnpm run sitemap`, `pnpm run
prerender` (3,028 pages) and `pnpm run audit:canonicals` (0 failures): run
twice, the second after the last code and map change. Looked at on the served
build (port 4601) at 390 and 1440, day and night: `/study/bible/matthew`,
`/study/bible/matthew/1`, `/study/bible/mark`. No sideways scroll, no page
errors. Mark's map, caption, description and "Go deeper" are as before.
Screenshots: `/home/user/elite-shots/bdoor/mt-*`, `mt1-*`, `mark-*`. The first
look found Bethlehem's and Bethany's names colliding on the map; fixed with
two `label` entries in Matthew's data. Lighthouse was not run (no change to a
chapter's first load; the map and plain notes load as before).

### Next

Matthew 5 to 7 (the Sermon on the Mount), then 8 onward, in the same shape.

## Continuation: Matthew 5 to 7 (2026-11-19)

The Sermon on the Mount, passage by passage, in plain words, in the same data
shape as Matthew 1 to 4 (`client/public/bible/notes/matthew/plain/5.json` to
`7.json`; each chapter note now says `"plain": true`). Data only; no code
changed, so no build, Lighthouse or screenshots were run.

| Chapter | Passages | Plain words |
|---|---|---|
| Matthew 5 | 9 (the Beatitudes; salt and light; not to abolish, but to fulfill; anger, and making peace first; desire, and the eye and the hand; divorce; oaths; the other cheek; love your enemies) | 4,626 |
| Matthew 6 | 6 (giving in secret; prayer in secret; the Lord's Prayer; fasting in secret; treasure, the eye, and two masters; do not worry) | 3,100 |
| Matthew 7 | 6 (do not judge; ask, seek, knock, and the golden rule; the narrow gate; known by their fruit; "I never knew you"; two builders, and a teacher with authority) | 3,007 |
| Total | 21 | 10,733 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. The deep
notes are unchanged underneath. Matthew 5 runs longer than earlier chapters
because it holds nine passages and six hard questions that the brief named.

### Sources

Every claim is in `bdoor-ledger.md` under "The plain notes on Matthew 5", "6"
and "7". 23 web searches (8, 8, 7). New sources: Strong's and Vine's on Raca;
the Mishnah Yoma 8:9 and Bava Kamma 8:6 (marked as written down later);
Josephus, Jewish War 2.135 (Essenes and oaths) and Antiquities 20.97-98
(Theudas); the lexicons on angareuō; Tolstoy, What I Believe (1884); Aquinas,
Summa II-II question 40; the Community Rule (1QS 1:9-10); Origen on
epiousios and Jerome's "supersubstantial"; the manuscripts and the Didache on
the doxology; the Kaddish (age of its wording uncertain); Pope Francis on
"lead us not into temptation" (2017); the good eye and evil eye idiom;
mammon; the Talmud, Arakhin 16b (later); Tobit 4:15 (third or second century
BC); the Didache 1 and 11; Russell, Why I Am Not a Christian (1927); Avot
de-Rabbi Natan 24 (later, attribution uncertain); Avot 1:1. Reused from the
ledger: Hillel and Shammai on divorce, Hillel's golden rule, Gehenna, the
Schleitheim Confession, Luther's two kinds of duty. All ancient and rabbinic
writers are paraphrased.

### Cut or narrowed

Roman soldiers as the ones who compelled the second mile (the results
confirmed the Persian courier sense and Simon of Cyrene, not soldiers); the
sums of the Mishnah's fines; apechō as a business receipt; Tobit 12:8; the
Didache's fast days; the French and Italian wordings of the Lord's Prayer;
Matthew 20:15 as a third "evil eye" text; 4Q525; the Church of the
Beatitudes; Dead Sea salt; a first-century custom of withholding greetings;
the right hand as the valued one; Hillel's dates; the Quakers on oaths; the
named scholars and confessions in the deep notes (Fitzmyer, Piper,
Instone-Brewer, Westminster, Trent, Wesley, Kant, Bunyan). Theudas in Acts
is "a Theudas", since Acts and Josephus place him differently.

### Contested matters, and how they are stated

"You have heard ... but I tell you": a Jewish teacher going to the root of the
Law, with 5:17 stated plainly, the Law already pushing past hatred (Leviticus
19:17; Exodus 23:4-5), and the Jewish parallels (Yoma 8:9, the Essenes,
Hillel, Tarfon, Avot de-Rabbi Natan) set beside Jesus, not against him. Why
Christians do not keep the whole Law (three answers). Divorce (Catholic,
Orthodox, Protestant, betrothal, forbidden kin; no side). Oaths (Anabaptist
refusal and the majority view). Non-resistance (pacifist with the
Anabaptists, Mennonites and Tolstoy; Luther's two kinds of duty; the just war
tradition from Augustine to Aquinas; no side). "Be perfect" (three readings).
"Daily bread", "lead us not into temptation" and the doxology, each plain and
without alarm. Forgiveness in 6:15. Owning and saving. "Judge not" and the
dogs and pigs (not a word about any people). Ask and receive (the skeptic's
objection, the sermon's own setting, no prosperity reading). The narrow gate
(how many; Russell's objection; no side on the nature of judgment).
Assurance in 7:21-23 (Reformed, Wesleyan, Catholic, stated as views). Faith
and works in the two builders. The six readings of the whole sermon are not
repeated: 7:24-29 points to the part on Matthew's book page.

### Care lines included

5:21-26: making peace does not mean returning to someone dangerous. 5:29-30:
the Mark 9 wording, word for word (a picture, never a command to harm the
body; a doctor, a pastor, a trusted friend, or a crisis line). 5:31-32: the
Mark 10 safety line, word for word, with no phone number. 5:38-42: "turn the
other cheek" is not a command to stay with someone who hurts you; seeking
safety and the law's protection is not disobedience (John 18:23; Acts 22:25).
5:43-48: loving an enemy is not trusting one who is still dangerous. 6:9-15:
forgiveness is not reconciliation, silence about a crime, or a return to
harm. 6:16-18: fasting is not for everyone (illness, pregnancy, nursing,
medicine, a history of disordered eating), ending with the Matthew 4 wording.
6:25-34: "do not worry" is not a rebuke of an anxiety disorder, and the help
wording of the site's answer "Is my anxiety a spiritual failure?" is copied
word for word (including its 988 line for the United States). 7:13-14 and
7:21-23: an invitation, not a scare; the frightened reader is met with 11:28.

### What was run, and what passed (watched)

`validate-bible-notes` after each chapter. Then all 36 content-gate commands
of ci.yml, one at a time: exit 0 each (validate-bible-notes: 66
introductions, 1,189 chapter notes, 23 chapters in plain words;
validate-no-emdash: 260 files, 0 em-dashes; search index 732 entries up to
date; passage index 620 files match). `pnpm check`: clean. `pnpm test`: 146
files passed, 7 skipped; 1,653 tests passed, 73 skipped. No build, so no
dist/ and no lh-*.json.

### Still unverified

The exact words of every ancient and rabbinic writer (all paraphrased); the
back-handed reading of the right cheek (given as "many readers note"); which
flower the lilies were; whether Jesus had the Community Rule in mind (stated
as unknown).

### Next

Matthew 8 onward, in the same shape.

## Continuation: Matthew 8 to 10 (2026-11-19)

The ten miracles and the sending of the twelve, passage by passage, in plain
words, in the same data shape (`client/public/bible/notes/matthew/plain/8.json`
to `10.json`; each chapter note now says `"plain": true`). Data only; no code
changed, so no build, Lighthouse or screenshots were run.

| Chapter | Passages | Plain words |
|---|---|---|
| Matthew 8 | 6 (a leper made clean; a Roman officer's faith; Peter's mother-in-law and the servant who carries our diseases; what following costs; the storm and little faith; two men among the tombs) | 4,043 |
| Matthew 9 | 7 (forgiven and then healed; a tax collector called and a meal with sinners; why don't your disciples fast; a dead girl and a woman who touched his cloak; two blind men; a man who could not speak; sheep without a shepherd) | 3,677 |
| Matthew 10 | 6 (the twelve apostles; sent to the lost sheep of Israel; sheep among wolves; do not be afraid, the sparrows; not peace but a sword; a cup of cold water) | 3,865 |
| Total | 19 | 11,585 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. Where
Mark's plain notes already tell an event (the leper, the paralytic, the storm,
the man among the tombs, Jairus's daughter, the call of the tax collector, the
sending), these notes reuse their verified claims and their care wording, point
to them, and say what Matthew does differently: the order and brevity, the
disciples who "follow" into the boat, the rebuke before the calm, "little
faith" for "no faith", two men for one, "just died" for "near death", the
father's greater request, Matthew's silence on the woman's uncleanness.

### A fix to the last run

The Matthew 5 to 7 files stored each passage's hard question under "The Old
Testament behind it", its question for the reader under "The hard verse", and
its Old Testament note under "What it asks" (two passages without an Old
Testament note had the other two swapped). A reader saw them under the wrong
headings. The texts are now in their own fields, unchanged except four words
added to 7:21-23's Old Testament note so it meets the field's minimum. Mark
and Matthew 1 to 4 were checked and are right.

### Sources

Every claim is in `bdoor-ledger.md` under "The plain notes on Matthew 8", "9"
and "10". 24 web searches (8, 8, 8). New sources: Bible Odyssey and the
Cambridge Bible on the centurion in Antipas's forces; the 2011 English Roman
Missal ("under my roof"); the Septuagint of Isaiah 53:4 against Matthew's
wording; F. F. Bosworth, Christ the Healer (1924), and the healing-in-the-
atonement case from Isaiah 53:4-5 and Matthew 8:17; McCane, Harvard
Theological Review 83 (1990), on secondary burial; the NET note and
Metzger's summary on Gadarenes, Gergesenes and Gerasenes in Matthew 8:28;
Gadara at Umm Qais; the Mishnah Nedarim 3:4 (later); Diogenes Laertius on
Antisthenes and the physicians; Avot de-Rabbi Natan on Yohanan ben Zakkai and
Hosea 6:6 (later); Didache 8.1 (Wednesday and Friday); Josephus, Jewish War
3.437 (hired pipers); Augustine, Harmony of the Gospels 2.28; kōphos in
Strong's and Thayer's; Justin, Dialogue with Trypho 69; Iscariot and Kerioth;
John Hyrcanus and Gerizim (around 110 BC); Pliny, Letters 10.96; the assarion;
Schweitzer (1906; English 1910) on 10:23; Chrysostom, Homily 34 on Matthew;
the Mishnah Makkot 3:10 (later); "hate" as "love less" (Genesis 29:30-31).
All ancient, patristic and rabbinic writers are paraphrased.

### Cut or narrowed

Augustine by name for the two demoniacs (Harmony 2.24 could not be found, so
"an old explanation"); A. B. Simpson; the "no Roman troops in Galilee until AD
44" date (sources conflict); "about a year later" for the gathering of bones;
the Mishnah on toll collectors' houses (Tohorot 7:6, not found); the Zealot
party's first date; the synagogue attendant who flogged; the year of James's
death and the name Agrippa (Acts says "King Herod"); the assarion's exact
fraction of a denarius (sources say a sixteenth or a tenth); Diocletian's
price edict and Deissmann on sparrows; the Septuagint's phronimos; Bornkamm,
Held, Hengel, Allison, Levine, Sanders, Neusner, Dunn, Sim, Jeremias, France,
Davies and Allison, Licona, Strauss and Warfield by name; the Akeldama
leprosy find, the Temple Scroll, the Talmud's Sanhedrin 43a. The deep notes
are unchanged underneath.

### Contested matters, and how they are stated

Healing in the atonement (8:17): the view and its main texts, Bosworth named;
the view that Matthew applies Isaiah to the Galilean ministry and that full
healing waits for the resurrection; a middle view; no side. The centurion's
"sons of the kingdom": not a rejection of the Jewish people, said plainly,
with the warning turned on Christians too. "Let the dead bury their own dead":
three readings of the request (just died, secondary burial, father still
alive), the saying faced as hard, and not contempt for family. Two men
against one, and the place name: the manuscripts plainly; the old
harmonizing answer, Matthew's pairs, two witnesses, ancient biography, the
skeptic's contradiction; no side. Possession and illness: Matthew lists the
possessed and those with seizures apart; the Mark 5 wording. The ruler's
daughter "just died": Augustine's answer, ancient biography, the skeptic; no
side. The Pharisees: not caricatured; Ezekiel 18:23, the rabbis' own use of
Hosea 6:6; "an argument among Jews". The old wineskins: two readings. The
Gentile limit (10:5-6) against 28:19: the critical view, then the order of
Romans 1:16 and Matthew's own Gentiles. 10:23: Schweitzer and the skeptic
first, then Chrysostom, the vindication readings, and the final coming with
an unfinished mission; the closing line matches the Mark 13 note. Hell
(10:28): who "the One" is; three views of hell's nature stated as views, no
side. "Whoever denies Me" against Peter's restoration. "Not peace but a
sword": a picture of division, never a warrant for violence (26:52; 5:9).
Luke's "hate" against Matthew's "loves more", with the dissent noted.

### Care lines included

8:1-4: said once, plainly, for all the healings: the Bible does not teach that
sickness comes from too little faith or that the unhealed did not believe
enough (Paul's thorn, Trophimus, Timothy), and seeing a doctor is not a
failure of faith; 8:14-17, 9:1-8 and 9:27-31 ("according to your faith") point
back to it. 8:18-22: grief is not disobedience; caring for a dying parent is
obedience. 8:23-27: "little faith" is not a rebuke of anxiety; getting help is
wise. 8:28-34: mental illness is illness, with the Mark 5 path to help (a
doctor, a pastor, or a crisis line). 9:32-34: no disability or illness is to
be blamed on a spirit. 10:16-25: Jesus tells his messengers to flee danger.
10:26-33: the warning of hell is not a scare; the afraid reader is met with
11:28 and the sparrows; the grieving reader is told the Father was not absent.
10:34-39: for a reader rejected by family for faith: not alone, not failed
(Psalm 27:10; Mark 10:29-30); keep loving and keep the door open as far as is
safe; if rejection turns to threats or harm, seeking safety is not disloyalty,
with the police or a crisis line. No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` after each chapter. Then all 36 content-gate commands
of ci.yml, one at a time: exit 0 each (validate-bible-notes: 66
introductions, 1,189 chapter notes, 26 chapters in plain words;
validate-no-emdash: 260 files, 0 em-dashes; search index 732 entries up to
date; passage index 623 files match). `pnpm check`: clean. `pnpm test`: 146
files passed, 7 skipped; 1,653 tests passed, 73 skipped. No build, so no
dist/ and no lh-*.json.

### Still unverified

The exact words of every ancient and rabbinic writer (all paraphrased);
whether Jesus' "east and west" means Gentiles, scattered Jews, or both (given
as readings); the exact meaning of "Iscariot" and "Zealot" (given as
readings); the dating of Chrysostom's homily beyond "the late 300s".

### Next

Matthew 11 onward, in the same shape.

## Continuation: Matthew 11 to 13 (2026-11-19)

John's question, the yoke, the Sabbath disputes, Beelzebul, the sign of Jonah
and the parables, passage by passage, in plain words, in the same data shape
(`client/public/bible/notes/matthew/plain/11.json` to `13.json`; each chapter
note now says `"plain": true`). Data and one validator check; no page code
changed, so no build, Lighthouse or screenshots were run.

| Chapter | Passages | Plain words |
|---|---|---|
| Matthew 11 | 6 (John's question from prison; more than a prophet; children in the marketplace; woe to the towns that did not turn; hidden from the wise, shown to little children; come to Me: the easy yoke) | 4,195 |
| Matthew 12 | 8 (grain picked on the Sabbath; a withered hand healed; God's chosen Servant; Beelzebul and the strong man; the sin against the Spirit, words and the heart; the sign of Jonah; the empty house; Jesus' true family) | 5,126 |
| Matthew 13 | 9 (the farmer and the seed; why parables; the seed explained; weeds among the wheat; the mustard seed and the leaven; the weeds explained; the treasure and the pearl; the net and the scribe; rejected at home) | 4,789 |
| Total | 23 | 14,110 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. Where
Mark's plain notes already tell an event (the grainfields, the withered hand,
Beelzebul, the unforgivable sin, the true family, the sower, why parables, the
mustard seed, Nazareth), these notes point to them, reuse their verified claims
and their care wording, and say what Matthew does differently: the hungry
disciples, the priests and Hosea 6:6 in place of Abiathar and Mark 2:27, the
sheep in the pit, the blind and mute man and "your sons", "in this age or in
the one to come", "because" for "so that", Isaiah quoted in full, "understand",
the downward count of the harvest, "the carpenter's son" and "did not" for
"could not".

### Field order, checked, and a guard

Before writing, each field's job was written down from the model and the page
code (`PlainPassages.tsx`): `happening` what is happening; `hearers` what the
first hearers would catch; `ot` the Old Testament behind it; `hard` the hard
verse; `asks` what it asks. After each chapter every passage was printed field
by field and checked by eye: all 23 are under their right headings.

`scripts/validate-bible-notes.mjs` now also fails when a plain passage's `ot`
names no Old Testament book, "the Law", "the Prophets", "the Psalms",
"Scripture" or "Old Testament", or when `asks` is the only field naming an Old
Testament book. Run over all 29 plain chapters (Mark 1 to 16, Matthew 1 to
13) it flags one passage: **Matthew 7:21-23, whose Old Testament note holds
only Luke 6:46** (a Gospel, not the Old Testament). It is listed by name as
known in the validator (`OT_FIELD_KNOWN`) and not rewritten here; a writer
should give it a true Old Testament note or drop the field, then remove the
entry. Not flagged but worth a look: Mark 16:9-14's Old Testament note holds
only 1 Corinthians 15:4-5 (it passes because Paul's words say "according to
the Scriptures"). Tested by swapping Matthew 11's fields the way the earlier
run did: the check caught four of the five swapped passages (the fifth's hard
question happens to name Ezekiel). Two other rules were tried and dropped for
false alarms: "the hard field must ask a question" (17 passages written
without a question mark) and "the asks field must say ask" (2).

### Sources

Every claim is in `bdoor-ledger.md` under "The plain notes on Matthew 11",
"12" and "13". 23 web searches (8, 7, 8). New sources: 4Q521; Chrysostom,
Homilies 36 and 45 on Matthew; Chorazin's site and later ruins; Antipas's reed
coins (around AD 19/20) and the suggestion linking them to 11:7, called a
conjecture; Ben Sira's date (early second century BC) and Sirach 51:23-27;
the Shema as "the yoke of the kingdom of heaven" in rabbinic texts (later);
Mishnah Yoma 8:6 (later); the Damascus Document on an animal in a pit;
Josephus, Antiquities 8.46-48 (Eleazar the exorcist); Rabbi Eleazar ben
Azariah on counting days (Talmud, later); Thomas Paine's objection; the
Wednesday-crucifixion view; Bunyan, Grace Abounding (1666); darnel; Digest
9.2.27.14 (sowing weeds); the Donatists, Augustine and Carthage (411); Aquinas,
Summa II-II q.11 a.3; Roger Williams (1644) and John Cotton; Josephus, Jewish
War 7.114-115 (buried treasure); Pliny on pearls. All ancient, patristic,
medieval and rabbinic writers are paraphrased.

### Cut or narrowed

Tertullian on John's doubt (not found); Theissen by name (the coin link is
reported only through a reviewer); the Mishnah's exact "yoke" wording (the
best manuscripts may lack the word), so "rabbinic writings from after Jesus'
time"; Cranmer's comfortable words (checked, not needed); the later rabbinic
rulings on animals in pits (sources differ); the rabbi's date and the Talmud
tractates; Torrey by name and the Thursday view; Paine's part and year (the
deep note says part 2, 1795; the search found it in Part I), so "in the
1790s"; Augustine's Letter 93 and his turn to coercion (not confirmed);
Luther, Hubmaier and Calvin on the weeds; the darnel fungus; the litres in
three measures; the reading "Isaiah the prophet" at 13:35 and Porphyry;
Helvidius, Epiphanius, Jerome, Meier and the council of 553 by name; Russell,
Aquinas, Calvin and Augustine on the unforgivable sin; Molina, Craig and Calvin
on 11:21; Norden, Bultmann, Suggs and Deutsch; every textual note in the deep
notes. The deep notes are unchanged underneath.

### Contested matters, and how they are stated

John's doubt: Chrysostom's view (asked for his disciples' sake) and the modern
view (real puzzlement), no side; Jesus' gentleness plain. 11:12: three
readings of the violence, no side. 11:21-24: God's free choosing, God's
knowledge of what free people would do, prophetic overstatement; "more
bearable" as a word of fairness. 11:25-27: choosing and response stated as the
Mark 4 note states them, with what both agree on. The Sabbath for Christians:
the Lord's Day, the seventh day, fulfilled in Christ, no side; the Pharisees
not caricatured, "an argument among Jews". 12:30 against Mark 9:40: two
questions. The unforgivable sin: three descriptions and the Hebrews 6 link, no
side; the Mark 3 sentences kept word for word. "Adulterous generation": the
prophets' picture, not the Jewish people as a whole. Three days and three
nights: Paine's objection, inclusive counting with Esther, 1 Samuel 30 and
Matthew's own "third day", the Wednesday view, the Friday majority; "a
question about the calendar, not the resurrection". Why parables: Chrysostom,
Matthew's "because", the choosing tradition; no side; "them" is not the Jewish
people. The weeds: Donatists and Augustine, Aquinas's use for killing
heretics, Roger Williams's use for liberty and Cotton's reply; church
discipline left open; "it gives no one a warrant to harm the people they judge
to be weeds". Hell: three views and literal or pictured fire, no side. The
smallest seed: the speech of the field, both views of inerrancy. The buyer of
the treasure: the disciple or Christ, both held. Jesus' brothers: the Mark 6
wording, each view's texts, all three confess the virgin birth, no side.

### Care lines included

11:1-6: doubt in a faithful man met without rebuke; for the doubting or
darkened reader, bring the question to Jesus, and if the darkness is heavy, a
pastor, a doctor or a crisis line; getting help is not a failure of faith.
11:28-30: the invitation given its full weight, "not a demand"; the afraid
reader hears this voice first; weariness and despair can be illness, see a
doctor or talk to a pastor or a crisis line. 12:15-21: the bruised reed for
the reader worn thin. 12:22-30: no disability or illness blamed on a spirit
(the 9:32-34 wording). 12:31-37: "If you are afraid you have committed it,
this note is written for you", with the Mark 3 sentences, Bunyan, and 11:28.
12:43-45: not a teaching that illness is possession; a returning illness is
not a judgment; a doctor, a pastor or a crisis line. 12:46-50: for the reader
without family. 13:36-43: the warning of hell is not a scare; the afraid reader
is met with 11:28. 13:53-58: for the reader whose family does not believe. No
phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` after each chapter. Then all 37 commands of the
content-gates step in ci.yml, one at a time: exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 29 chapters in
plain words; validate-no-emdash: 260 files, 0 em-dashes; search index 732
entries up to date; passage index 623 files match). `pnpm check`: clean.
`pnpm test`: 146 files passed, 7 skipped; 1,653 tests passed, 73 skipped. The
validator script is ignored by ESLint's config and was not Prettier-clean
before this change either; not reformatted. No build, so no dist/ and no
lh-*.json.

### Still unverified

The exact words of every ancient, medieval and rabbinic writer (all
paraphrased); whether 4Q521's works are God's or his anointed one's (given as
debated); the date of Rabbi Eleazar ben Azariah (not given); the section
numbering of Aquinas's reply and of Pliny (not given on the page).

### Next

Matthew 14 onward, in the same shape. Matthew 7:21-23's Old Testament note
waits for a writer (see the guard above).

## Continuation: Matthew 14 to 16 (2026-11-19)

Two repairs the field-order check surfaced, then John's death, the feedings,
the walk on the water, tradition and the Law, the Canaanite woman, the rock
and the keys and the cross, passage by passage, in plain words, in the same
data shape (`client/public/bible/notes/matthew/plain/14.json` to `16.json`;
each chapter note now says `"plain": true`). Data and one validator line; no
page code changed, so no build, Lighthouse or screenshots were run.

### The two repairs

**Matthew 7:21-23.** Its Old Testament note held only Luke 6:46. It now
holds the Old Testament behind the passage: Jesus' "depart from Me, you
workers of lawlessness" echoes Psalm 6:8; Isaiah 29:13 on lips and hearts;
and "know" in its covenant sense from Amos 3:2. The Luke 6:46 line moved to
the end of "what the first hearers would catch". `OT_FIELD_KNOWN` in
`scripts/validate-bible-notes.mjs` is now empty: the check stands with no
exceptions.

**Mark 16:9-14** (a live page). Its Old Testament note held only
1 Corinthians 15:4-5, about the witnesses, not the Old Testament. It now
holds Deuteronomy 19:15 (two or three witnesses, and these verses pile up
witnesses), Paul's "according to the Scriptures" (1 Corinthians 15:4), Luke
24:25 on the prophets, and Psalm 16:10 as Peter reads it in Acts 2:27.
Nothing else in Mark changed.

| Chapter | Passages | Plain words |
|---|---|---|
| Matthew 14 | 4 (the death of John the Baptist; five thousand fed; walking on the water, and Peter; healing at Gennesaret) | 2,913 |
| Matthew 15 | 5 (the tradition of the elders and the command of God; what defiles a person; the Canaanite woman; healing on the mountain; four thousand fed) | 3,257 |
| Matthew 16 | 6 (the demand for a sign; the leaven; you are the Christ; the rock and the keys; get behind Me, Satan; take up your cross) | 3,871 |
| Total | 15 | 10,041 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. These
chapters lean on Mark 6 to 9, so they are shorter than Matthew 11 to 13: they
point to the Mark notes, reuse their verified claims and care wording, and
say what Matthew does differently. Herod himself wanting John dead and
fearing the people (close to Josephus); the feeding placed after John's
death and the two tables; "women and children" and Exodus 12:37; Peter on
the water, worship in place of hardened hearts, "doubt" only here and at
28:17; no explanation of the washing; no "Thus all foods are clean"; the
Canaanite, the silence, 15:24, no "first"; the healing on the mountain;
Jeremiah, "the Son of the living God" and verses 17-19; skandalon; "the Son
of Man coming in His kingdom".

### Field order, checked

After each chapter every passage was printed field by field and checked by
eye: all 15 are under their right headings (what is happening; the first
hearers; the Old Testament behind it; the hard verse; what it asks), and the
validator's field check passed with no exceptions.

### Sources

Every claim is in `bdoor-ledger.md` under "Repairs to two Old Testament
notes" and "The plain notes on Matthew 14", "15" and "16". 17 web searches
(5, 4, 8). New sources: Josephus, Antiquities 18.118 in Whiston's words on
Herod's fear of a rebellion; Antiquities 18.136-137 (Herodias's first husband
Herod; Salome married Philip the tetrarch) and the two explanations of the
names; 2 Maccabees 6:7; Augustine, Sermon 76 and Sermon 77; Josephus,
Antiquities 13.297; hupokritēs; Chrysostom, Homilies 52 and 54 on Matthew;
Cranmer's 1548 prayer and the crumbs; the omission of 16:2b-3 in Sinaiticus
and Vaticanus; Catechism 553 and 881; Pastor Aeternus (1870); the Orthodox
reading (oca.org); binding and loosing (Jewish Encyclopedia, marked later)
and Josephus, Jewish War 1.111; Bertrand Russell's 1927 lecture. Ancient,
patristic and rabbinic writers are paraphrased; the Cranmer words are quoted
in single quotes as not Scripture.

### Cut or narrowed

The Mark 6 run's "suspicious of John's influence" is narrowed with Whiston's
wording now found (fear of a rebellion). The date of 2 Maccabees, the
Machaerus excavations, John's tomb at Sebaste, Juvenal, the Mishnah on
birthdays, beheading and the bread blessing; Hume, Paulus, Strauss, Lewis and
Keener on the miracles (the views kept, unnamed); Chrysostom's "two tables"
(the contrast kept, unattributed); the date of Augustine's sermon; Furstenberg,
Boyarin, Theissen, Ringe, Dube, Levine, Croy and Luther's 1525 sermon; the
Qumran and Enoch "planting"; Isaiah 61:3 (its BSB text has an em-dash);
the Catholic argument from Isaiah 22 as an office handed on (not confirmed);
"every bishop holds Peter's chair" and the named Orthodox theologians;
Cullmann, Carson, Bultmann, Melanchthon, Calvin, Augustine's Retractations,
Leo, Cyprian, Firmilian and Ut Unum Sint; "taste death" as a Semitic idiom;
the distance to Caesarea Philippi; every textual note in the deep notes
except 16:2b-3. The deep notes are unchanged underneath.

### Contested matters, and how they are stated

Josephus and the Gospels on why John died: political and personal, both
given, and Matthew's "feared the people" set beside Josephus. The names of
Herodias's husbands: both explanations, no side. Herod's wish and his grief
(14:5, 9): the critics' "leftover from Mark" and the reply, no side. The
miracles of the loaves: the skeptical readings stated, the Gospels' telling
stated, "turns on whether God acts in the world at all". Tradition: the
Mark 7 wording (Scripture and tradition, both views). The Pharisees: a
serious movement; the Corban point where later rabbis agreed; "an argument
among Jews"; Paul and Gamaliel; "a danger for every religious person,
Christians first of all". Matthew's omission of "Thus all foods are clean":
two readings (kept narrow on purpose; the wider sense still in 15:17), no
side, with what the church came to hold. The Canaanite woman: four readings
(a test, with Chrysostom and Augustine; the order of his mission, 10:6 and
28:19; a real exchange in which she presses him; the diminutive), no side,
consistent with the Mark 7 note; she is praised; "Nothing here gives any
reader leave to look down on any people." Who the mountain crowd was: both
readings. Two feedings or one: as the Mark 8 note. 16:12 and 23:3: two
readings. The rock: Catholic (Peter himself; Catechism; Vatican I),
Orthodox (Peter's confession; Chrysostom), Protestant (Christ or the
confession; and Peter in person without successors), each as its teachers
state it, what all three agree on, 18:18 to the disciples together, "These
notes do not decide between the readings", in line with the book page's
line. Binding and loosing: forbid and permit, rabbinic use marked later,
Josephus on the Pharisees. The gates of Hades: death's power, Hades not
Gehenna. The passion predictions: as the Mark 8 note. 16:28: Russell's
objection, then the mountain, the resurrection and Spirit, and AD 70, no
side, consistent with the Mark 9:1 note.

### Care lines included

14:1-12: grief is not a lack of faith; take it to Jesus and let a friend, a
pastor or a counsellor carry it with you. 14:22-33: "You of little faith" is
not a rebuke of anxiety or panic (the Matthew 8 sentences); help from a
doctor or counsellor is wise, not faithless; the story does not promise
that faith keeps anyone from sinking. 16:21-23: "Get behind Me, Satan" is
not Jesus calling Peter evil; Peter is sent back to follow, not sent away.
16:24-28: deny yourself is not self-hatred (the Mark 8 wording); taking up
the cross is not a command to bear abuse; "If you are being abused, seek
safety first. Talk to a pastor or a counsellor you trust, or call a local
domestic violence line." No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` after each chapter. Then all 36 commands of the
content-gates step in ci.yml, one at a time: exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 32 chapters in
plain words; validate-no-emdash: 260 files, 0 em-dashes; search index 732
entries up to date; passage index 623 files match; verify-sources: 22 texts
intact). `pnpm check`: clean. `pnpm test`: 146 files passed, 7 skipped;
1,653 tests passed, 73 skipped. No build, so no dist/ and no lh-*.json.

### Still unverified

The exact words of every ancient, patristic and rabbinic writer (all
paraphrased); the date of Augustine's Sermons 76 and 77 and of Chrysostom's
homilies (not given); the exact wording of Catechism 553 and 881 and of
Pastor Aeternus (seen only through quotations, so paraphrased); Queen
Alexandra's dates (not given).

### Next

Matthew 17 onward, in the same shape.

## Continuation: Matthew 17 to 20 (2026-11-19)

The mountain and the valley, the temple tax, life together in the church,
divorce, singleness, the rich young man, the vineyard workers, the request
for thrones and the blind men at Jericho, passage by passage, in plain words,
in the same data shape (`client/public/bible/notes/matthew/plain/17.json` to
`20.json`; each chapter note now says `"plain": true`). Data only; no page
code changed, so no build, Lighthouse or screenshots were run.

| Chapter | Passages | Plain words |
|---|---|---|
| Matthew 17 | 5 (the glory on the mountain; Elijah has already come; a boy with seizures and the mustard seed, with the empty verse 21; the second warning; the temple tax and the coin in the fish) | 2,932 |
| Matthew 18 | 6 (become like a child; causing a little one to stumble; the sheep that wanders, with the empty verse 11; tell it to the church; two or three in My name; seventy-seven times and the unforgiving servant) | 3,880 |
| Matthew 19 | 6 (divorce; those who do not marry, for the kingdom; the children; the young man; the camel and the needle; the first and the last) | 3,723 |
| Matthew 20 | 5 (the workers hired through the day; paid the same; the third warning; the mother of James and John and the ransom; two blind men) | 3,085 |
| Total | 22 | 13,620 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. Where
Mark 9 and 10 already tell the event, the notes point to them, reuse their
verified claims and care wording, and say what Matthew does differently:
the face like the sun, "in whom I am well pleased", the touch and "Do not be
afraid"; the disciples understanding about John; selēniazomai and 4:24; the
second warning met with grief, not confusion; the question asked outright;
"goes astray" and "if he finds it"; "for any reason", "ordered" against
"permitted", the exception; the eunuch saying; "what good thing", "young",
"love your neighbor", teleios; "kingdom of God" at 19:24; the twelve thrones;
crucifixion named; the mother's request; compassion, touch and two men.

### Field order, checked

After each chapter every passage was printed field by field and checked by
eye: all 22 are under their right headings (what is happening; the first
hearers; the Old Testament behind it; the hard verse; what it asks), and the
validator's Old Testament field check passed with no exceptions.

### Sources

Every claim is in `bdoor-ledger.md` under "The plain notes on Matthew 17" to
"20". 31 web searches (7, 8, 8, 8). New sources: Josephus, Jewish War 7.218
(Vespasian's two drachmas to the Capitol) and Antiquities 18.311-313
(Nehardea and Nisibis) and 17.318 (Antipas's two hundred talents) and 4.253
("for any cause whatsoever", Whiston); Mishnah Shekalim 1:3, Avot 2:9 and 3:2;
b. Yoma 86b; y. Berakhot 2:8; selēniazomai; the omission of 17:21 and 18:11
in Sinaiticus and Vaticanus; the harmonized "Good Teacher" in later copies of
19:17; hebdomēkontakis hepta and Genesis 4:24 in Greek; the talent at about
six thousand denarii; the Community Rule on reproof; Herodotus 3.41-42
(Polycrates); Chrysostom, Homily 58 on Matthew; Justin, First Apology 29;
Nicaea, canon 1; Catechism 1579-1580; the Augsburg Confession, article 23;
Tacitus, Annals 1.17; Gregory the Great, Homily 19 (591); Amy-Jill Levine,
Short Stories by Jesus; Augustine, Harmony of the Gospels 2.65; the two
Jerichos. Ancient, patristic and rabbinic writers are paraphrased; Josephus's
"for any cause whatsoever" is Whiston's wording in single quotes.

### Cut or narrowed

The drachma as a day's pay (not confirmed); 4Q159 and a once-in-a-lifetime
tax (broken text, debated subject); Tosefta Ketubbot 13:20 (the "only Tyrian"
reading is an inference); Philo, Cicero, Dio, Suetonius, Nerva and the Edfu
receipts; the barbel; Strauss, Temkin, Twelftree; Raphael and Masaccio; the
Mishnah on priests; "ten thousand the largest Greek number word"; the
"against you" variant at 18:15; Tobit, Jerome, Aquinas and the guardian
angel feast; Calvin, the Belgic and Schleitheim confessions, Erastus, Beza,
Benedict, Luther, Bonhoeffer, Volf, Jones, Langberg, Wiesenthal; Catholic and
Orthodox excommunication as "medicinal" (stated only generally); Philo on
divorce, the Temple Scroll, m. Yevamot, b. Gittin 90b, the ketubbah; the
Essenes and Therapeutae; Origen's castration; Hester; Meier, Fitzmyer,
Instone-Brewer, Piper, Heth and Wenham by name; Cyril of Alexandria on
"rope" (the sources disagree on what he argued); Philo and Josephus on
palingenesia; Psalms of Solomon 17:26; "lost their farms through debt";
Herzog and Jeremias by name; Herod's palaces and death at Jericho; John's
later life; Salome; Bach, Ruskin, Gandhi, Rembrandt, Poussin; most textual
notes. One error in the deep note was found and not repeated: Tacitus's
mutineers of AD 14 were on the Danube, not the Rhine. The deep notes are
unchanged underneath.

### Contested matters, and how they are stated

The mountain: pointed to the Mark 9 note (no one can be sure). Seizures and
possession: the Mark 9 wording. 17:20: not a formula; the disciples' faith,
not the father's or the boy's. 17:21: the manuscripts plainly, with those
who defend the later copies. The fish and the coin: the skeptical case
(Polycrates), the miracle reading (Chrysostom), the weight on the saying,
"turns in part on whether God acts in the world at all", no side. The temple
tax: not a statement about modern taxes or any government. Guardian angels:
Christians differ on an angel for each person. 18:11: the manuscripts. Church
discipline: practices described generally, "These notes do not choose among
the churches' practices." Seventy-seven or seventy times seven: both, the
point the same. 18:35 and losing grace: the Matthew 6 answer, then the two
views, "All agree the warning is meant to be heard." Hillel and Shammai:
marked later (the Mishnah, around 200); "for any reason" as Hillel's term and
the reply, both unnamed. Divorce and remarriage: the Matthew 5 paragraph
(Catholic, kinship reading, Orthodox, Protestant, betrothal), "These notes do
not decide between them." "This word" in 19:11: two readings. Celibacy:
Catholic (Catechism 1579), Orthodox, Protestant (Augsburg 23), what all
agree. Sell all: Clement and Antony, a call to a few or a call to each, no
side. Camel and needle: no gate, no rope. 19:17: the later copies. The
vineyard: four readings (Jesus' welcome of sinners; Matthew's setting;
non-Jews; Gregory's hours), then Levine's and a darker reading, "These notes
do not choose among the readings." The ransom: the Mark 10 paragraph. Two
blind men and the two Jerichos: Augustine, doubling, two witnesses, two
Jerichos, ancient story-telling, "These notes do not choose."

### Care lines included

17:14-21, the Mark 9 wording word for word: "Does this story mean that
seizures, or illness of the mind, are caused by demons? Christians hold that
evil is real, and the Gospels tell of real possession. But most Christians
today hold that seizures and mental illness are illnesses, to be treated
with medicine and care, and that it is wrong and harmful to tell a sick
person they have a demon. The Gospels themselves know the difference." The
path to help, adapted only to Matthew's verse: "The father says his son often
falls into the fire or into the water. If you, or someone you love, are at
risk of harm, reach for real help now: a doctor, a pastor you trust, or a
crisis line in your country. Jesus did not leave this boy alone, and you are
not meant to face such danger alone." And the Matthew 8 line: "The Bible does
not teach that sickness comes from too little faith, or that a person who
stays ill did not believe enough." 17:24-27: not a teaching on modern taxes,
and the coin no promise of money.

18:6-9, on abuse: "These words have been rightly applied to the abuse of
children. It must be said plainly. This passage stands with the child.
Jesus' fiercest warning in the Gospels is for anyone who harms a little one.
The church has sometimes protected abusers and silenced children, and that is
a betrayal of this very passage. Abuse of a child is a crime. It is to be
reported to the police and the proper authorities, not handled quietly inside
a church. If a child is in danger, or you know of a child being harmed,
contact the police or your local child protection service now. If you were
harmed as a child, what was done to you was wrong, and it was not your
fault." Then the Mark 9 "cut it off" paragraph word for word, ending "If you
have thoughts of hurting yourself, please speak to someone now: a doctor, a
pastor, a trusted friend, or a crisis line."

18:15-17, the context guide's sentences word for word: "Matthew 18 is not a
rule that makes a harmed person meet the one who harmed them. It opens by
placing Christ's presence in a child, “whoever welcomes a little child like
this in My name welcomes Me” (Matthew 18:5), and by warning of the millstone.
Nothing in it asks a child, or anyone who is afraid, to go alone to the
person who hurt them. The law behind the two or three witnesses sends a
disputed case to judges who “shall investigate thoroughly” (Deuteronomy
19:18), so it's no excuse for refusing to look. Abuse and other crimes are
reported to the police and the proper authorities, whom Paul calls “God’s
servant, an agent of retribution to the wrongdoer” (Romans 13:4)." Then:
"Nothing in verses 15 to 20 puts a church meeting in the place of the
police." The steps do not fit where one person has power over another or
someone is afraid, and are no way to silence a concern.

18:21-35, the Matthew 6 wording ("this prayer" made "this parable"):
"Forgiveness has also been misused. Some have told people who were abused to
forgive quickly, keep quiet, or go back to the person who hurt them. That is
not what this parable asks. Forgiveness lets go of revenge. It is not the
same as trusting someone again, and it does not mean a crime should go
unreported. A person can forgive and still stay safe, still tell the truth,
and still ask for justice. It can also take a long time, and that is not
failure." And the guide's: "Forgiving from the heart is not the same as
trusting again, reconciling, or keeping quiet. ... If someone has harmed you,
tell someone safe, and if a crime was committed, go to the police. You don't
need anyone's permission to be safe."

19:1-9, the Mark 10 and Matthew 5 line word for word: "Nothing in this
passage asks anyone to stay where they or their children are in danger. If
you are in an abusive marriage, seek safety first. Talk to a pastor or a
counselor you trust, or call a local domestic violence line. These notes are
not legal advice." 19:10-12: single readers, without assuming anything about
them ("This passage does not ask you to explain yourself"). 19:16-30: no
contempt for the wealthy, no prosperity reading of the hundredfold. 20:20-28:
service is never a duty to stay under mistreatment. No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` (partial, Matthew) and `validate-no-emdash` after each
chapter. Then all 36 commands of the content-gates step in ci.yml, one at a
time: exit 0 each (validate-bible-notes: 66 introductions, 1,189 chapter
notes, 36 chapters in plain words; validate-no-emdash: 260 files, 0
em-dashes; search index 732 entries up to date; passage index 623 files
match; verify-sources: 22 texts intact). `pnpm check`: clean. `pnpm test`:
146 files passed, 7 skipped; 1,653 tests passed, 73 skipped. No build, so no
dist/ and no lh-*.json.

### Still unverified

The exact words of every ancient, patristic and rabbinic writer (all
paraphrased); the exact wording of Catechism 1579 beyond its phrase "for the
sake of the kingdom of heaven"; the year of Levine's book (not given); the
distance between the two Jerichos (not given).

### Next

Matthew 21 onward, in the same shape.

## Continuation: Matthew 21 to 24 (2026-11-19)

The entry, the temple, the fig tree, the two sons, the tenants, the wedding
banquet, Caesar, the resurrection question, the greatest commandment, David's
son, the seven woes and the lament over Jerusalem, and the sermon on the
Mount of Olives, passage by passage, in plain words, in the same data shape
(`client/public/bible/notes/matthew/plain/21.json` to `24.json`; each chapter
note now says `"plain": true`). Data only; no page code changed, so no build,
Lighthouse or screenshots were run.

| Chapter | Passages | Plain words |
|---|---|---|
| Matthew 21 | 6 (the king on a donkey and a colt; the temple, the blind and the lame, the children; the fig tree withers at once; by what authority; two sons; the tenants and the stone) | 4,565 |
| Matthew 22 | 6 (the guests refuse; the guest without wedding clothes and "many are called"; Caesar; whose wife; the greatest commandment; whose son is the Christ) | 3,953 |
| Matthew 23 | 6 (Moses' seat and titles; the first woes and who the Pharisees were, with the empty verse 14; oaths; tithes, the cup and the tombs; the prophets' tombs and all the righteous blood; the hen and her chicks) | 4,371 |
| Matthew 24 | 7 (not one stone; do not be alarmed; the abomination and false Christs; the Son of Man on the clouds; the fig tree and this generation; the day and hour, Noah, one taken; the faithful and wicked servant) | 4,610 |
| Total | 25 | 17,499 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. Where
Mark 11 to 13 tell the event, the notes point to them, reuse their verified
claims and their care wording word for word (the fig tree caution, the
temple readings, the tenants, Caesar, marriage at the resurrection, the
Shema, Psalm 110, the abomination, the clouds, "this generation", the day
and hour), and say what Matthew does differently: Zechariah quoted and two
animals; the city "stirred"; the blind, the lame and the children in the
temple; the tree withering at once; 21:43 and 21:45; the leaders passing
sentence; "hypocrites" and "the coin used for the tax"; the testing lawyer
and "hang"; the question put to the Pharisees; parousia; "in the holy place"
and the Sabbath; the lightning; the sign, the mourning tribes and the
trumpet; Noah, the field and the mill, the thief and the servants.

### On Matthew and the Jewish people

Consistent with the book page ("A Jewish book, and a hard history" and its
23:13 line) and the Mark 11, 12 and 15 notes. 21:43: supersessionism named
and rejected ("The passage does not say it, and this site rejects that use
plainly"); the setting (21:23, 21:45, the crowds); three readings of the
"people"; three views of Israel and the church with no side; Romans 11:1,
11:18, 11:29; Nostra Aetate 4 quoted in single quotes as a translation. The
fig tree carries the Mark 11 caution. 22:7 says the burned city is not a
verdict on the Jewish people. Matthew 23: the chapter read as a Jew speaking
to Jewish leaders of one generation in the voice of Isaiah, Amos, Ezekiel and
Jeremiah; the Pharisees at their best from Josephus, Acts, John, Luke and
Philippians (the portrait and the guide, read only); "Pharisee" not a word
for hypocrite; later rabbinic self-criticism (Weinfeld, from the book page's
ledger; b. Sotah 22b, marked as several centuries later); the woes on
religious leaders of every age, Christian ones first (1 Peter 4:17, James
3:1); "sons" as following a path, not inherited guilt (Deuteronomy 24:16,
Ezekiel 18:20); the "Christ-killers" misuse named once and rejected in the
Mark 15 sentences word for word; the lament as the key to the chapter.

### Field order, checked

After each chapter every passage was printed field by field and checked by
eye: all 25 are under their right headings (what is happening; the first
hearers; the Old Testament behind it; the hard verse; what it asks), and the
validator's Old Testament field check passed with no exceptions.

### Sources

Every claim is in `bdoor-ledger.md` under "The plain notes on Matthew 21" to
"24". 18 web searches (5, 4, 5, 4). New sources: Nostra Aetate 4 on
"rejected or accursed"; Justin, Dialogue with Trypho 53; Mishnah Sukkah 3:9
and Shekalim 1:1; b. Shabbat 153a; b. Sotah 22b; 4 Ezra 8:3; Jerome on
23:35 and the Nazarenes' Gospel; Josephus, Jewish War 4.343; the Hebrew
order of the books and its debate; Chrysostom, Homily 76 on Matthew; the
meaning of parousia; the Latin behind "rapture"; the eagles and the vultures;
the debate over 22:7; the wedding garment custom (no clear evidence).
Ancient, patristic and rabbinic writers are paraphrased.

### Cut or narrowed

A general claim about ancient two-step invitations (kept only as the story
tells it); straining wine through cloth (now "straining a drink"); white lime
on graves as a Mishnah claim (the white tomb is given as Jesus' picture);
Jewish debates on vessels; city gates on the Sabbath; a "banner" reading of
the sign; the Temple Scroll on the blind; the Targum of Lamentations and
b. Gittin 57b; the Protevangelium and Origen on Zechariah; Instone-Brewer,
Coppins, Saldarini, Olmstead, Soulen, Gundry, L. T. Johnson, Garland,
Deissmann, Carter, Darby, Scofield, Walvoord and every date-setter by name;
John Paul II's "never revoked"; the year of Josephus's Zechariah; most
textual notes. One slip was caught before the push: a line saying
"only Matthew has the lightning" now says Mark lacks it and Luke 17:24 has
it. The deep notes are unchanged underneath.

### Contested matters, and how they are stated

The two animals: the critics' case, a Jewish way of reading, a real detail,
Justin's reading; "these notes do not choose". The temple action and John 2:
the Mark 11 wording. The fig tree as sign or event; verse 22 and unanswered
prayer. The two sons' three manuscript forms. 21:43: as above. 22:7 and AD
70: after the war, or stock language, or Isaiah 5; "These notes do not
choose." The garment: no clear evidence for a host's gift; three readings of
the clothes; two readings of "chosen". Caesar: the Mark 12 readings, plus
"not a ruling on any party, tax law or government of today". Marriage at the
resurrection: the Mark 12 readings. Psalm 110's author: three views. 23:2-3:
three readings. "Call no one father": Catholic and Orthodox practice,
1 Corinthians 4:15, Protestant practice, what most agree. Converts: debated.
How much of Matthew 23 reflects Matthew's setting: scholars differ.
Zechariah son of Berechiah: the merged-names view, the copyist view (Jerome),
a second name, Josephus's Zechariah; "these notes do not choose". 23:39:
hope, warning, both. Matthew 24: the three readings of the chapter, of the
abomination and of the clouds; the three readings of "this generation"; the
sign (the Son of Man; the cross); the eagles; "nor the Son" and the
manuscripts; one taken as rapture or as judgment, "these notes do not choose,
and they set out no end-times scheme"; no millennium position anywhere.

### Care lines included

21:18-22: the Mark 11 lines on unanswered prayer. 22:1-14: "This saying is
not meant to make an anxious person despair... If you are worried whether God
will have you, notice that the king's invitation went out to ‘as many as you
can find’." 22:23-33: the Mark 12 lines for the grieving, and "if you have
married again after a husband or wife died, this passage is not a judgment on
you. Scripture says plainly that a widow is free to marry again (1 Corinthians
7:39)." 23:1-12: "If your own father was absent, or hurt you, this verse is
not asking you to pretend otherwise. It tells you that you have a Father in
heaven who is not like that." 24:4-14: "If the news frightens you, or you
were taught as a child to dread the end of the world, notice the first thing
Jesus says after the wars: ‘see to it that you are not alarmed’." 24:36-44:
the Mark 13 line against every date-setter, Acts 1:7, and "If end-times
teaching has frightened you, or you were taught to fear being ‘left behind’,
notice what Jesus actually asks. Not to work out a timetable. Not to live in
dread." 24:45-51: the wicked servant's sin read as abuse of power over those
in his care. No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` (partial, Matthew) after each chapter. Then all 36
commands of the content-gates step in ci.yml, one at a time: exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 40 chapters in
plain words; validate-no-emdash: 260 files, 0 em-dashes; search index 732
entries up to date; passage index 623 files match; verify-sources: 22 texts
intact). `pnpm check`: clean. `pnpm test`: 146 files passed, 7 skipped;
1,653 tests passed, 73 skipped. No build, so no dist/ and no lh-*.json.

### Still unverified

The exact words of every ancient, patristic and rabbinic writer (all
paraphrased); Instone-Brewer's conclusion on the two animals (not read, not
used); Chrysostom's exact wording in Homily 76; the year Josephus's
Zechariah was killed (not given).

### Next

Matthew 25 onward, in the same shape.

## Continuation: Matthew 25 to 28 (2026-11-19)

The ten young women, the talents, the sheep and the goats, the passion and
the resurrection, passage by passage, in plain words, in the same data shape
(`client/public/bible/notes/matthew/plain/25.json` to `28.json`; each chapter
note now says `"plain": true`). This finishes Matthew. Data only; no page
code changed, so no build, Lighthouse or screenshots were run.

| Chapter | Passages | Plain words |
|---|---|---|
| Matthew 25 | 4 (the ten young women; the talents; the sheep and the goats, "you did for Me"; "you did not do for Me", eternal punishment and eternal life) | 3,893 |
| Matthew 26 | 8 (the plot, the perfume and thirty pieces of silver; the Passover and "Surely not I?"; the bread and the cup "for the forgiveness of sins"; you will all fall away; Gethsemane; the arrest; before Caiaphas; Peter's denial) | 5,054 |
| Matthew 27 | 9 (morning and the end of Judas; before Pilate; Barabbas, the dream, the washed hands and the crowd's cry; the mocking; the crucifixion; the cry; the curtain, the earthquake and the raised saints; the burial; the guard) | 5,578 |
| Matthew 28 | 4 (He has risen; the guards' story; "some doubted"; the commission and "I am with you always") | 2,786 |
| Total | 25 | 17,311 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. Where
Mark 14 to 16 tell the event, the notes point to them, reuse their verified
claims and their wording word for word (the Lord's Supper views, Gethsemane
and its care line, the Mishnah on trials, the "Christ-killers" paragraph with
Nostra Aetate and Acts 4:27, the mocking, crucifixion, the readings of the
cry and its care line, the curtain, the burial, the women as witnesses), and
say what Matthew does differently: Jesus foretelling the handing over;
Caiaphas named; Judas asking for money and the thirty pieces of silver;
"You have said it yourself"; "for the forgiveness of sins"; "may Your will be
done"; the sword saying and the twelve legions; the oath by the living God;
the accent; Judas's remorse and the field; Pilate's wife; the washed hands;
the cry of 27:25; the scarlet robe; the gall; "Eli"; the earthquake and the
raised saints; the soldiers' confession; the guard; the angel on the stone;
Jesus meeting the women; the bribe; the mountain; "some doubted"; the
commission.

### On 27:25 and Judas

27:25 is handled once, fully, in the note on 27:15-26, consistent with the
book page: one crowd, one morning, stirred by its leaders (27:20), a legal
formula (Joshua 2:19, 2 Samuel 1:16, Jeremiah 26:15), Deuteronomy 24:16, the
irony with 26:28, passion plays, the "Christ-killers" paragraph, "This site
rejects it", Nostra Aetate and Acts 4:27 word for word as in Mark 15 and
Matthew 23. 26:57-68 and 28:11-15 point to it. Judas's death is one sentence
in Matthew's own word ("Then he goes away and hangs himself (verse 5).");
Acts 1:18-19 is named as a different account without its details; the care
lines are the Mark 14 wording; the notes do not say what God did with Judas.

### Field order, checked

After each chapter every passage was printed field by field and checked by
eye: all 25 are under their right headings (what is happening; the first
hearers; the Old Testament behind it; the hard verse; what it asks), and the
validator's Old Testament field check passed with no exceptions.

### Sources

Every claim is in `bdoor-ledger.md` under "The plain notes on Matthew 25" to
"28". 27 web searches (8, 5, 8, 6). New sources: 1 Maccabees 9:37-39; the
lamps-or-torches debate; Didache 16.1 and 7; b. Bava Metzia 42a; Lucian on
Peregrinus; Sulpicius Severus on Martin; Gray (1989) on "the least";
Augustine, City of God 21.23; Caiaphas's dates (Josephus); Tyrian shekels;
su eipas; b. Eruvin 53b; Judas in medieval antisemitism; the explanations of
Acts 1:18 and of "Jeremiah" (Menken, Biblica 2002); Pilate's wife in later
tradition; the readings of 27:52-53; the guard debate; Josephus's paragraph
on Jesus; "Eli" and "Eloi"; Justin, Dialogue 108; distazō; "all nations".
Ancient, patristic and rabbinic writers are paraphrased.

### Cut or narrowed

The English word "talent" traced to the parable; the deep note's "only place
Jesus calls himself king"; the claim that no governor of Judea had twelve
legions; the scarlet robe as a soldier's cloak; locally recruited soldiers;
"earthquakes mark God's coming"; "sermons" reading 27:25 aloud (kept to
passion plays, from the book page's ledger); Augustine and Jerome calling
27:9 a mistake; the AD 70 reading of "our children" (not checked this run);
the Roman penalty for sleeping on guard; martyrdom of many apostles (narrowed
to Acts 5:18, 40); Eusebius on 28:19; every scholar in the deep notes by name.
The deep notes are unchanged underneath.

### Contested matters, and how they are stated

The lamps (clay lamps or torches). The talents: not a prosperity text and
not a rule about money; the third servant's picture of his master judged by
his own words (Luke 19:22); the "whistle-blower" reading as a few modern
readers'. "The least of these": Jesus' followers and messengers, or all who
suffer, both fairly, "These notes do not choose"; not a verdict on any nation.
Grace and works: the Reformation and Catholic readings, Ephesians 2:8-10,
James 2:17. Hell: the three views (Matthew 10 and 13 wording), Augustine's
argument as his, no side. Judas and God's purpose; "better not born" with no
verdict on his end. "You have said it yourself". The date of the meal and the
Supper (Mark 14 wording). The sword (peace churches; Romans 13:4). The trial's
lawfulness (Mark 14 wording). 27:9 and "Jeremiah"; Matthew 27 and Acts 1;
the Passover release (Mark 15 pointer); the cry (Mark 15 wording); the
curtain; 27:52-53 (event, picture-language, the skeptic's question, the
reply), "These notes do not choose"; the guard (the skeptic's case and the
replies); the Easter accounts' differences and their explanations; the theft
rumour; who doubted; "all nations"; baptism (infants and believers; mode;
means of grace or sign; Acts 2:38).

### Care lines included

25:1-13: "If you fear that the door is already shut on you, notice that you
are still able to knock", with 11:28. 25:14-30: the servant's fear and a
false picture of God. 25:41-46: the Matthew 13 wording with 11:28. 26:36-46:
the Mark 14 Gethsemane lines word for word. 26:69-75: "If shame over
something you have done feels too heavy to carry, you do not have to carry it
alone. Tell God, and tell someone you trust." 27:1-10: "Many people carry
shame for something they have done, and some have thought of ending their
life. If that is you, please do not carry it alone. Tell God, and tell someone
near you: a friend, a pastor, a doctor. If you have thought of ending your
life, please reach out today to a crisis line or emergency service where you
live." 27:45-50: the Mark 15 line word for word. 28:16-17: "If you are
carrying doubts, you are in the company of the eleven. Bring them with you."
No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` (partial, Matthew) after each chapter. Then all 36
commands of the content-gates step in ci.yml, one at a time: exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 44 chapters in
plain words; validate-no-emdash: 260 files, 0 em-dashes; search index 732
entries up to date; passage index 623 files match; verify-sources: 22 texts
intact). `pnpm check`: clean. `pnpm test`: 146 files passed, 7 skipped;
1,653 tests passed, 73 skipped. No build, so no dist/ and no lh-*.json.

### Still unverified

Gray's own text (his finding read in secondary summaries); Catchpole's
argument (read as cited); the exact words of every ancient, patristic and
rabbinic writer (all paraphrased).

### The whole book, and the two Gospels

Matthew 1 to 28: 167 passages, 103,659 plain words. Mark 1 to 16: 95
passages, 44,581 plain words. The two Gospels together: 262 passages,
148,240 plain words (counted by script over the five fields).

### Next

Matthew is finished. The next book in the plan's order.

## John: book page and chapters 1 to 3 (2026-11-19)

### A repair first: Gray on Matthew 25

The plain note on "the least of these" credited Sherman W. Gray, The Least
of My Brothers: Matthew 25:31-46, A History of Interpretation (1989), with a
finding the last run had met only in other people's summaries. One search
found the book's catalogue entry (Scholars Press, 1989, SBL Dissertation
Series 114) but no publisher's or library's description of what it found,
and the library page could not be reached. So his name is gone from the
plain note, which now says: "For much of the church's history, many writers
read it this way." The ledger row says why. The deep note underneath, which
is older and was not touched, still names him.

### The book page (`/study/bible/john`, same address)

Data only, in `client/public/bible/notes/john/intro.json`, field `teaching`,
built from the same parts and hooks as Mark and Matthew. Eleven headed parts
with a contents list: John in a minute; Who wrote it, and how we know; When,
where, and for whom; Why John is so different; How John is built; The big
themes; The Old Testament and the feasts; John's Greek, made simple; 'The
Jews' in John; Two passages, and what the old copies show; How the church
has read John. Then 13 hard passages (1:1, 2:4, 3:5, 6:53, 7:53, 8:44, 8:58,
10:30, 14:6, 14:28, 20:23, 20:28, 21:24), 13 key words, a timeline of 18
entries that uses John's own feasts as its calendar, a map of eight places
(Capernaum, Bethsaida, Tiberias, Cana placed roughly as a region, Sychar,
Bethany beyond the Jordan, Jerusalem, Bethany), and five "Go deeper" pages
after the shared six: Jewish life in Jesus's day, The Calendar and
Festivals, The Incarnation, and two Honest Answers (three and one; the only
way). The outline band at the top already drew John's eight parts from its
existing `structure`; "How John is built" links to it.

Words: 4,591 in the eleven parts; 1,059 in the lists, timeline and map.

**Code.** None changed. The three hooks Matthew added (`teaching.deeper`,
map `region` and `label`) were enough. `teaching.test.tsx` now expects
John's guide and adds two tests (the part on "the Jews", a hard-passage link,
Go deeper; the map's north-to-south description, a place card, the region
caption).

### Chapters 1 to 3 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| John 1 | 7 (in the beginning was the Word; a witness, and a light refused and received; the Word became flesh; not the Christ, but a voice; the Lamb of God; come and see; Philip, Nathanael, and heaven opened) | 3,760 |
| John 2 | 5 (the wine runs out; water into wine, the first sign; zeal for the Father's house; destroy this temple; he knew what was in a man) | 2,414 |
| John 3 | 5 (born from above; as Moses lifted up the snake; God so loved the world; he must increase; the one who comes from above) | 2,872 |
| Total | 17 | 9,046 |

Counted by script over the five fields. After each chapter every passage was
printed field by field and read: all 17 sit under their right headings, and
on the served build a script matched each rendered heading and its first
words to the data (John 1: 7 of 7; John 3: 5 of 5; at 390 and 1440, day and
night). `validate-bible-notes` passed with no exceptions (`OT_FIELD_KNOWN`
is still empty).

### Sources

Every claim is in `bdoor-ledger.md` under "John's book page" and "The plain
notes on John 1" to "3". 34 web searches: 1 for Gray, 19 for the book page,
then 5, 5 and 4. Main sources: Irenaeus, Against Heresies 3.1.1 and 3.3.4;
Papias in Eusebius 3.39; Clement in Eusebius 6.14.7 (all paraphrased);
Robinson (1976); Roberts (1935) and Nongbri (HTR 2005) on P52; Martyn (1968)
and its critics; Brown and Dodd on "signs" and "glory"; Mishnah Sukkah 4:9
and 5:2-4, Kelim 10:1, Rosh Hashanah 3:8 (marked as later); 1 Maccabees 4;
UNESCO on Al-Maghtas; the Siloam and Bethesda pools; Tiberias; Colwell (1933)
and Harner (JBL 1973); b. Ketubbot 96a (marked as later); the Qumran
Community Rule on Isaiah 40:3; the 1:18 variant; Josephus, Antiquities
15.380; Wisdom of Solomon 16:7; Eusebius's Onomasticon on Aenon; the NET note
on "Woman" and on houtōs. Counts of Greek words are a script over the
repository's Greek text. Scripture is the BSB, checked word for word.

### Cut or narrowed

The size of P52 and the author of the 2020 NTS article on it; Robinson's The
Priority of John; the Florinus letter; Trajan's dates; any count of how much
of John is not in the others; Ephraim and Aenon on the map; Philo, the
Targums and Wisdom literature beyond Proverbs 8; Dodd's conquering lamb by
name; Origen's Bethabara; the Zechariah 14:21 wordplay; the metrētēs in
litres; Dionysus; Augustine's six ages; the shoshbin; Nakdimon ben Gurion;
the "born again" story of 1976; every scholar named in the deep notes but not
checked this run. The Jerusalem pools are "widely taken to be" Bethesda and
Siloam, not "found".

### Contested matters, and how they are stated

Authorship (the son of Zebedee, a Jerusalem disciple perhaps the elder, a
circle of churches; tradition and evidence named apart). Date (the 90s, and
the minority before 70). The temple action (one event or two, in the Mark 11
and Matthew 21 wording, "These notes do not settle it"). The length of the
ministry. The day of the crucifixion (three views, pointing to the Mark 14
notes). Whether John knew the other Gospels. The count of the signs. 1:1 and
"a god" (the Greek explained, the New World Translation named, "deserve a
patient answer, not scorn"). Verse 13 and human response. Isaiah and Moses
"seeing" God. Elijah (Matthew 11:14 and 1:21). The Lamb (five readings).
"Son of God" on Nathanael's lips. Mary at Cana (Catholic, Orthodox and
Protestant emphases). Wine (unfermented reading and the majority reading;
neither for nor against drinking). Did Jesus raise himself. "Water and the
Spirit" (baptism; Ezekiel 36; natural birth; "These notes do not choose").
"So loved" (degree and manner). Those who never heard (not answered by the
passage). Where the quotation marks close in chapter 3.

**"The Jews" in John.** Its own part on the book page, consistent with
Matthew's page and the Mark 15 and Matthew 27 notes: the misuse named ("This
misuse is wrong, and the site rejects it plainly"), what the phrase means in
the story, everyone in the story Jewish, 4:22, the synagogue split and
Martyn's theory with its doubters, Acts 4:27 and Nostra Aetate in the same
words, and the translators' choices as views. In the chapter notes, 1:19 and
2:18-20 each say the phrase there means the authorities.

**Care.** 2:6-11: a line for anyone hurt by alcohol, with a path to help
(someone you trust, a doctor or a recovery group). 3:31-36: for anyone
grieving someone who died without clear faith. 1:6-13: for readers whose
families let them down. No phone number is given.

### What was run, and what passed (watched)

All 36 commands of the content-gates step in ci.yml, one at a time: exit 0
each (validate-bible-notes: 66 introductions, 1,189 chapter notes, 47
chapters in plain words; validate-no-emdash: 260 files, 0 em-dashes; search
index 732 entries up to date; passage index 623 files match; verify-sources
22 texts intact). `pnpm check`: clean. `pnpm test`: 146 files passed, 7
skipped; 1,655 tests passed, 73 skipped. ESLint on the changed test file:
clean. `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,028 pages),
`pnpm run audit:canonicals` (0 failures). Served with
`scripts/serve-like-vercel.mjs` on port 4602 and looked at `/study/bible/john`,
`/john/1`, `/john/3`, `/mark` and `/matthew` at 390 and 1440, day and night:
no sideways scroll, no page errors; Mark and Matthew show their own guides as
before (16 contents entries each, their own maps and Go deeper). The first
look at John's map had Tiberias over the lake and Bethany touching the
Jordan line; three `label` entries in John's data fixed it, and a script then
found no name overlapping another name or a mark. (The server keeps gzipped
files in memory, so it was restarted to see the change.) Screenshots:
`/home/user/elite-shots/bdoor/jnrun-*`. The label fix was data only and was
checked by `validate-bible-notes` and `teaching.test.tsx` after the build;
the build was not rerun for it. Lighthouse was not run (no code changed and
nothing new loads on a chapter's first paint). dist/ deleted, server stopped,
no lh-*.json.

### Still unverified

The exact words of every ancient writer (all paraphrased); whether the
Mishnah's Tabernacles rites were done in Jesus' day (said to be uncertain);
the Al-Maghtas identification (said to be uncertain); Wisdom of Solomon's
date ("probably" before Jesus); the repository's own dates for Bach, Luther,
Calvin and Aquinas (reused from the introduction, not searched again).

### Next

John 4 onward in plain words, in the same shape.

## Continuation: John 4 to 7 (2026-11-19)

The Samaritan woman, Bethesda, the bread of life and Tabernacles, passage by
passage, in plain words, in the same data shape
(`client/public/bible/notes/john/plain/4.json` to `7.json`; each chapter note
now says `"plain": true`). Data only; no page code changed.

| Chapter | Passages | Plain words |
|---|---|---|
| John 4 | 7 (tired, at Jacob's well; living water; five husbands, and a prophet; worship in spirit and truth; come and see, fields ripe for harvest; the Savior of the world; the official's son) | 4,448 |
| John 5 | 6 (the pool and a man ill for thirty-eight years; the Sabbath and making himself equal with God; the Son does what the Father does; the hour is coming; the witnesses; Moses wrote about me) | 3,735 |
| John 6 | 7 (five thousand fed and a crown refused; it is I; food that endures; I am the bread of life; no one can come unless the Father draws him; eat My flesh and drink My blood; to whom would we go?) | 4,268 |
| John 7 | 7 (his brothers did not believe; whispers at the feast; teaching in the temple; where is he from; rivers of living water; a divided crowd; no one ever spoke like this man) | 3,746 |
| Total | 27 | 16,197 |

Counted by script over the five fields. John 1 to 7 now: 44 passages, 25,243
plain words. 7:53 sits in the last passage of chapter 7 only as a pointer
(the validator needs the passages to reach the chapter's last verse); the
woman caught in adultery is left for the chapter 8 run.

### Field order, checked

After each chapter every passage was printed field by field and read: all 27
sit under their right headings, and `validate-bible-notes` passed with no
exceptions (`OT_FIELD_KNOWN` still empty).

### Sources

Every claim is in `bdoor-ledger.md` under "The plain notes on John 4" to "7".
24 web searches (7, 5, 7, 5). New sources: Samaritan population today;
Daube's vessels reading of 4:9 (as a proposal); the Taheb (later Samaritan
writings); Mishnah Avot 1:5; Koester on "Savior of the world" (JBL 1990,
abstract); the Bethesda excavations and the later Asclepius shrine; the
manuscripts of 5:3b-4; Mishnah Shabbat 7:2 and 19; Philo, Allegorical
Interpretation 1.5; Mishnah Berakhot 5:5; the site's own Nicene Creed text;
barley as poor people's bread; Catechism 1336; Calvin's commentary on John 6;
Lutheran writers on John 6; the Marburg Colloquy (1529); the 7:8 "not yet"
variant; Mishnah Sukkah 5:1; Justin, Dialogue 8; the punctuation of 7:37-38
and its possible Scriptures; Jonah of Gath-hepher. Ancient, patristic and
rabbinic writers are paraphrased and the rabbinic ones marked as later.

### Cut or narrowed

Augustine's "believe, and you have eaten" (searched twice, found only in
secondary citations, so neither the line nor his name is used); Luther's own
words on John 6 (secondary only); Lynn Cohick by name (her reading met only
in reviews, so it is given to "some scholars who study women in the ancient
world"); Porphyry and Jerome on 7:8; Marqah; the symbolic five husbands;
Photini and the Eastern feast; Daube's article itself (only his proposal is
stated); the Samaritan Pentateuch at Deuteronomy 27:4; the copper scroll;
Keener's "later read at the feast"; P66 at 7:52; and every scholar in the
deep notes not checked this run. The deep notes are unchanged underneath.

### Contested matters, and how they are stated

The five husbands (the traditional reading and the reading that sees a woman
much wronged; "The text does not settle it, and these notes do not choose";
death, divorce by a husband and levirate custom all named as possible).
4:9 (associate, or share vessels). "Salvation is from the Jews" (its weight,
against both misuses). "Spirit and truth" (human spirit or Holy Spirit). The
"others" of 4:38. Which hometown (4:44). The official and the centurion (one
event or two). 5:4 (what the copies show). "Do you want to get well?" (not
blame). 5:14 and 9:3. Equality with God (Arius, Nicaea and Constantinople,
the creed in the site's wording, as the first-order confession). 5:29 and
faith. The feeding (pointer to Matthew 14). 6:37, 44 and 65 (God's choosing,
human response, Catholic and Orthodox grace first, shared ground, "open for
discussion and not a cause for division", in the Mark 4 and Matthew 11
wording). 6:53 (Catholic and Orthodox, Lutheran, Reformed with Calvin,
memorial; "These notes do not settle the question", consistent with the Mark
14 and Matthew 26 wording). 6:63. Judas. 7:8 ("not" or "not yet"). The
brothers (pointer to Mark 3). 7:17. 7:37-38 (punctuation and Scriptures;
"These notes do not choose"). Bethlehem and John's silence.

**"The Jews".** 5:10-18 says where the phrase first bites that it means the
Jerusalem authorities and points to the book page; 6:41 says it means the
Capernaum synagogue audience; 7:1 says the Judean leaders; 7:13 shows Jews
afraid of "the Jews", with 9:22 and 20:19. 5:41-47 and 7:45-53 add that the
words were said to particular leaders.

### Care lines included

4:16-19 (a painful marriage history, met with dignity; shamed in church for a
past one could not control). 4:43-54 (parents of sick children; faith not a
guarantee; "you are not being told your faith failed"). 5:1-9 (long illness
or disability; not a lack of faith or desire). 5:10-18 (illness not one's
fault). 6:35-40 and 6:41-51 (fear of not being wanted; "the one who comes to
Me I will never drive away"). 6:60-71 (the doubting reader; loved ones who
left). 7:1-9 (family who do not believe). 7:37-39 (the dry and worn out).
7:45-53 (mocked for a fair question).

### The rendered pages: Mark, Matthew and John

`pnpm build`, then `scripts/serve-like-vercel.mjs` on port 4603, and a
Playwright script at 390 wide (deviceScaleFactor 1, `/api/trpc`, `/api/track`
and `/_vercel/*` stubbed) opened all 51 chapter pages with a plain layer:
Mark 1 to 16, Matthew 1 to 28, John 1 to 7. For each it scrolled until the
plain section loaded and compared, passage by passage, the heading (reference
and title), the order of the five part headings, and the first 60 characters
under each with the data file. Result: 306 of 306 passages matched in all 51
chapters; no passage missing; no sideways scroll on any page. The only
console errors were 404s for `/index/chapters/matthew/8.json`, `/14.json` and
`/17.json`: those three chapters have no passage-index file because nothing
links to them, and the "Go deeper" fetch logs a 404 (code, not data; left for
the lead). Screenshots of Matthew 18, 23, 27 and John 6 read clean:
`/home/user/elite-shots/bdoor/plain-*-390.png` and `plain-*-passage.png`
(the sticky header appears mid-image in the element shots; that is the
screenshot stitching, not the page). Server stopped; dist/ deleted.

### What was run, and what passed (watched)

`validate-bible-notes` (partial, John) after each chapter. All 36 commands
of the content-gates step, one at a time: exit 0 each (validate-bible-notes:
66 introductions, 1,189 chapter notes, 51 chapters in plain words;
validate-no-emdash: 260 files, 0 em-dashes; search index 732 entries up to
date; passage index 623 files match; verify-sources 22 texts intact).
`pnpm check`: clean. `pnpm test`: 146 files passed, 7 skipped; 1,655 tests
passed, 73 skipped. No lh-*.json.

### Still unverified

Daube's own article; Cohick's own text; Koester beyond his abstract; the
exact words of every ancient and rabbinic writer (all paraphrased); whether
the Mishnah's Tabernacles rites were done in Jesus' day (said to be
uncertain).

### Next

John 8 onward, beginning with 7:53 to 8:11.

## Continuation: John 8 to 11 (2026-11-19)

### A code fix first: no 404 from "Go deeper"

A chapter page's "Go deeper" block asked for `/index/chapters/<book>/<n>.json`
for every chapter, and 566 chapters (Matthew 8, 14 and 17 among them) have
no such file, so the browser logged a 404. The passage-index builder
(`scripts/lib/passage-index.mjs`) now also writes
`client/public/index/chapters.json`, a 2.4 KB list of the 623 chapters that
have a file, and its `--check` drift test covers the list (a stale list fails
it; checked by hand). `client/src/lib/passageIndex.ts` reads the list once
and asks for no file it leaves out; if the list cannot be read, it asks for
the chapter's file as before. What a reader sees is unchanged. Tests:
`passageIndex.test.ts` (the list matches the files exactly) and
`GoDeeper.test.tsx` (Genesis 36 and Matthew 8, 14 and 17 draw nothing and
request no chapter file; John 3 still lists its pages). On the served build:
Matthew 8, 14 and 17 request only `/index/chapters.json`, show no block, no
HTTP error and no console error; John 3 and Romans 8 show "Go deeper" with 6
and 11 groups.

### Chapters 8 to 11 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| John 8 | 6 (the woman caught in adultery; I am the light of the world; unless you believe that I am He; the truth will set you free; whose children?; before Abraham was born, I am) | 4,773 |
| John 9 | 5 (who sinned?; I am the one; afraid of the Jews; I was blind, but now I see; blind and seeing) | 3,272 |
| John 10 | 6 (the shepherd and the sheepfold; I am the gate; the good shepherd lays down his life; no one can snatch them; I and the Father are one; back across the Jordan) | 3,576 |
| John 11 | 7 (the one You love is sick; let us go, so that we may die with him; I am the resurrection and the life; Jesus wept; Lazarus, come out; one man for the people; will he come to the feast?) | 3,808 |
| Total | 24 | 15,429 |

John 1 to 11 now: 68 passages, about 40,700 plain words. Passages for
chapter 8 start at 8:1; 7:53 stays in chapter 7's pointer.

### Field order, checked

After each chapter every passage was printed field by field and read; all 24
sit under their right headings. On the served build a Playwright script at
390 wide matched each rendered heading, the order of the parts and the first
words of each part to the data: John 8 6 of 6, John 9 5 of 5, John 10 6 of 6,
John 11 7 of 7; no sideways scroll, no console error. Screenshots read:
`/home/user/elite-shots/bdoor/run811-*`.

### Sources

All in `bdoor-ledger.md` under "The plain notes on John 8" to "11". 24 web
searches (7, 6, 6, 5). New: Eusebius on Papias's story of the woman; the
Catholic acceptance of the passage (NAB note as cited); cia.gov on the 8:32
carving; Der Giftpilz and the scholarship on 8:44 in Nazi children's books;
1QS on the sons of darkness and the lot of Belial; 4 Ezra 3:14; the treasury
in the Court of the Women; b. Shabbat 55a-b (later); Tacitus, Histories 4.81;
the punctuation proposal for 9:3-4; Mishnah Shabbat 7:2 and kneading;
Bernier (2013); Amazing Grace (1773, 1779); Westminster Confession 17 and the
other churches' teaching on falling away; Psalm 82's readings; Josephus on
"Lights"; m. Bava Metzia 7:9 (later); Solomon's Colonnade; embrimaomai (NET
note, Thayer); dakryō and klaiō; the three days in later rabbinic writings;
al-Eizariya; Lazarus and Eleazar.

### Cut or narrowed

Luther's On the Jews and Their Lies, Origen, Luke Timothy Johnson,
Reinhartz and Ruether by name (met only in summaries); Jerome on what Jesus
wrote; Trent's decree; Augustine's "misery and mercy"; the 8:25 renderings
and the New World Translation at 8:58; Celsus; Jubilees; Genesis Rabbah on
prenatal sin; Irenaeus on the clay (kept only as "some readers have
noticed"); the Lent readings; George Adam Smith's shepherd at the gate;
Psalms of Solomon; the Talmud's oil story; Kloner on rolling stones; the
Caiaphas ossuary; et-Taiyibeh; Strauss, Bultmann, Bauckham and Meier by
name. "Jesus' tears were quiet" became "may have been quieter"; "Lazarus
died again later" became "in time he would die again".

### Contested matters, and how they are stated

7:53 to 8:11: what the copies show in the book page's own words; views (an
ancient true story not first in this place, the common view; a few hold it
original; some would teach it but not preach it as Scripture in the full
sense; the Catholic Church accepts it as Scripture); "These notes take no
side"; "None of this is cause for alarm". What Jesus wrote: suggestions,
"none can be proved". 8:24 and 8:58 (echo of Exodus 3:14 or of Isaiah's
"I am He"; "Scholars debate which echo is stronger"; the Nicene confession
in the site's wording). 9:3 (readings; the punctuation proposal as a view).
9:22 (Martyn, the doubters, and the case for Jesus' lifetime). "Other sheep"
(the common reading). 10:28 (perseverance views, "open for discussion and
not a cause for division", as in John 6). 10:30 (purpose or being; the
creed). 10:34 (three readings of Psalm 82; the rabbinic one marked later).
The two days' delay (three readings, no verdict). Embrimaomai's object
(three readings). Whether Lazarus's raising happened (views, no verdict).

**8:44, the sentences on the page:** "This verse has been used terribly. For
centuries it was used to call Jewish people children of the devil, and to
justify hatred, expulsions and murder. In the 1930s Nazi propaganda put it in
a book for German children. That reading is false, and Christians must reject
it plainly. This site rejects it. Never a word against the Jewish people."
Then: said to "the Jews who had believed Him" (8:31) who sought to kill him;
the prophets (Isaiah 1:4) and the Community Rule; Mark 8:33, 6:70 and 1 John
3:8-10; Nostra Aetate's sentence as in the Matthew 21 note.

**The woman of 8:1-11:** "Nothing in this story gives anyone leave to shame
anyone." "His first word is “Then neither do I condemn you.” His second is
“Now go and sin no more.” He does not wave her sin away, and he does not crush
her with it. The mercy comes first, and the call that follows does not cancel
it." "Where is the man?" opens the hearers' note.

### Care lines included

8:1-11 (sexual shame; "If what happened to you was not your choice, it is
not your sin, and you deserve safety and help from someone you trust").
8:21-30 (loneliness). 9:1-7 (disability is not punishment; "you are not a
riddle for other people to solve"; the man as the chapter's hero). 9:18-23
and 9:35-41 (fear of speaking; pushed out of a church). 10:11-21 (hurt by
leaders who fed themselves). 10:22-29 (fear of slipping from God's hand).
11:1-6 (long waits; no promise that every sick person recovers). 11:17-27
and 11:28-37 (grief is not unbelief; a death that was not reversed; no
promise beyond the text; "do not carry it alone. Reach out to people you
trust, to a pastor, or to someone trained to help"). 11:45-53 (sacrificed by
someone's calculation). No detail of dying is given.

### What was run, and what passed (watched)

All 36 commands of the content-gates step, one at a time: exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 55 chapters in
plain words; validate-no-emdash: 260 files, 0 em-dashes; search index 732
entries up to date; passage index 623 files match; verify-sources 22 texts
intact). `pnpm check`: clean (run after the code fix and again at the end).
`pnpm test`: 146 files passed, 7 skipped; 1,657 tests passed, 73 skipped.
ESLint on the changed client files: clean (the two scripts are outside
ESLint's scope). `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`
(3,028 pages), `pnpm run audit:canonicals` (0 failures). Served with
`scripts/serve-like-vercel.mjs` on port 4604; checks as above. Lighthouse not
run (the change adds one 2.4 KB request when the Go deeper block nears the
screen, nothing on first paint). Server stopped; dist/ deleted; no lh-*.json.

### Next

John 12 onward, in the same shape.

## Continuation: John 12 to 16 (2026-11-19)

### A check first: the John 8:44 sentence

The John 8 note says "In the 1930s Nazi propaganda put it in a book for German
children." The ledger already had a row for it: Der Giftpilz (Ernst Hiemer,
Stürmerverlag, Nuremberg, 1938), from the German Propaganda Archive's
translation "What Christ Said about the Jews", in which a mother tells her
children that Jesus told the Jews their father is the devil. One new search
confirmed the archive's description (the page itself cannot be fetched from
here). 1938 is in the 1930s, so the sentence stands unchanged. Elvira Bauer's
book of 1936 is not named on the page and was not checked for this verse. The
re-check is recorded under the John 8 ledger section (commit `cedecf75`).

### Chapters 12 to 16 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| John 12 | 7 (Mary pours out the perfume; a plot against Lazarus too; the king comes on a donkey; the grain of wheat; now My soul is troubled; He has blinded their eyes; not to judge the world, but to save it) | 4,466 |
| John 13 | 5 (Jesus washes their feet; I have set you an example; one of you will betray Me; a new commandment; before the rooster crows) | 3,107 |
| John 14 | 5 (many rooms in My Father's house; I am the way and the truth and the life; whoever has seen Me has seen the Father; another Advocate, the Spirit of truth; peace I leave with you) | 3,359 |
| John 15 | 5 (I am the true vine; apart from Me you can do nothing; no longer servants, but friends; if the world hates you; the Spirit will testify) | 2,854 |
| John 16 | 5 (they will put you out of the synagogues; it is for your benefit that I am going away; He will guide you into all truth; your grief will turn to joy; I have overcome the world) | 3,059 |
| Total | 27 | 16,845 |

John 1 to 16 now: 95 passages, about 57,500 plain words. Each chapter note
carries `"plain": true`.

### Field order, checked

After each chapter every passage was printed field by field (happening,
hearers, ot, hard, asks) and read; all 27 sit under their right headings, each
"Old Testament behind it" names Old Testament books, and no field is out of
place. `validate-bible-notes` passed after each chapter with no exceptions
(`OT_FIELD_KNOWN` stays empty). No page code changed, so no build was run.

### Sources

All in `bdoor-ledger.md` under "The plain notes on John 12" to "16". 24 web
searches (4, 4, 4, 5, 6) plus one for the 8:44 check. New: m. Ketubbot 7:6;
Gregory the Great's sermon of 591 and the 2021 memorial of Martha, Mary and
Lazarus; Dostoevsky's epigraph; Chrysostom (Homily 68 on John) and Augustine
(Tractate 53) on 12:39; J. C. Thomas's survey of foot washing; the churches that
keep foot washing as an ordinance; "Maundy" from mandatum; "many mansions" and
the Latin mansiones; paraklētos; the Jehovah's Witness reading of 14:28;
Augustine, On the Trinity 1.7.14; Josephus on the golden vine (War 5.210);
airei in 15:2; Hellenistic kings' "Friends"; m. Avot 1:6; the filioque; the
Rhineland massacres of 1096; Felix Manz (1527); elenchō; Westminster
Confession 1.6; Dei Verbum 8. Creed wording is copied from the site's Nicene
and Athanasian Creed pages; help wording from the site's answer "Is my anxiety
a spiritual failure?".

### Cut or narrowed

Cut because they could not be confirmed or were met only in summaries: the
Mekilta on the Hebrew slave and foot washing (searched, not found); Gregory of
Nazianzus, Oration 30.7 (searched, not confirmed, so the "source" reading of
14:28 is given without his name); what the 1969 Roman calendar changed
(sources disagree); the Jewish wedding-custom reading of 14:2 (later sources);
Plato's Phaedo on orphans; Pliny's nard prices; Luther's On the Jews and Their
Lies; the Muslim reading of the Paraclete (not checked this run). Scholars
named in the deep notes but not checked here are not named (Bauckham, Brown,
Carson, Martyn, Kimelman, Bernier, Reinhartz, Hick, Newbigin, Marshall and
others). Narrowed: Josephus's golden vine "as tall as a man" is credited to the
War only; "Tyndale ... in the 1520s" (sources give 1525 or 1526); the Avot
contrast is "may have sounded unusual"; "lift up" is "one of the word's basic
meanings"; no death toll for 1096 and no day for Manz's execution.

### Contested matters, and how they are stated

12:1-8: the Bethany anointings (same evening or two; Luke 7 a different
story); Mary is not Mary Magdalene. 12:8 is not leave to neglect the poor
(Deuteronomy 15:7, 11; Mark 14:7; 13:29; Matthew 25:40). 12:32 "everyone"
(all kinds; every person drawn though not all come; the hope of a few that all
will be saved; "These notes do not settle it"). 12:37-41: Chrysostom,
Augustine, the tradition that stresses God's choosing, and the reading of
hardening after long refusal, closing with the Mark 4 and Matthew 13 sentence
("Christians who stress God's choosing and those who stress human freedom
have read these verses differently for centuries. These notes do not settle
it."); "many of the leaders believed" (12:42) and "These verses are not a
verdict on the Jewish people." 13:1 and the Passover date (views, open).
13:14 foot washing as a rite (ordinance churches named; Catholic Holy Thursday
optional; others read a call to service; "These notes take no side"). 13:27
Judas (his own motive; foreknowledge views; "These notes do not say what God
did with Judas. That belongs to God.", the Matthew 27 wording). The beloved
disciple in the book page's terms. 13:34 "new". 14:12 "greater works" (reach,
not bigger miracles). 14:13-14 ask in My name (Mark 11 and Matthew 7 line; no
prosperity reading). 14:28 (Arius; Jehovah's Witnesses, "sincere, and they
deserve a patient answer, not scorn"; Nicaea; the Nicene and Athanasian Creed
wording; Augustine; the "source" reading). 15:2 airei (two renderings, no
side). 15:6 perseverance (the John 10 views and wording, plus the lost-reward
reading; "open for discussion and not a cause for division"; a line for the
frightened reader). 15:18-25 "the world" is not a people; no leave to despise
anyone; not every hardship is persecution. 15:26 the filioque (stated, no
side). 16:13 to whom the promise is given (many Protestants with Westminster
1.6; the Catholic Church with Dei Verbum 8; the Orthodox; Pentecostals; "These
notes take no side").

**14:6, the sentences on the page.** In "What a first-century hearer would
catch": "The church confesses these words as they stand. They claim that Jesus
is not one guide among many, pointing toward God from a distance. He is
himself the way to the Father, because he is the truth about God and the life
of God come among us. Whoever comes to the Father comes through him." In the
hard question: "It is not said in scorn of anyone, and it gives no one leave to
look down on people of other faiths or of none." And: "On this site, the
answers ‘Is Jesus really the only way to God?’ and ‘What about those who never
heard of Jesus?’ set those views out fairly. These notes take no side among
them."

**16:2, the sentences on the page.** "‘Whoever kills you will think he is
offering a service to God’ is not a charge against the Jewish people. Jesus
and all eleven friends listening to him were Jews." Then, once: "And
Christians have done this very thing. Christians have killed Jews and thought
they served God, as crusaders did when they massacred the Jewish communities
of Worms and Mainz in 1096. Christians have killed other Christians and thought
they served God, as when the Protestant authorities of Zurich drowned the
Anabaptist Felix Manz in 1527 for baptizing adults. This verse warns the church
as much as anyone. It gives no one, ever, leave to hate or hurt another person
in God's name."

### Care lines included

12:20-26 ("hates his life" is not self-hatred; for a reader with thoughts of
not living, the site's help wording word for word, with 988). 12:37-43 (a
reader afraid that doubt means God has shut them out). 13:12-20 (service is not
staying under abuse; seeking safety is not disobedience). 13:21-30 (betrayed
by someone close). 13:36-38 (the reader who has failed Jesus: Luke 22:32; three
denials, three chances to say yes). 14:1-4 (troubled is not sin; grief at
funerals). 14:15-24 (orphans: lost a parent, grew up without a father). 14:27
("Do not be afraid" is not a rebuke of anxiety; the site's help wording word
for word). 15:5-8 (the reader frightened by verse 6). 15:18-25 (suffering for
the name). 16:1-4 (hurt by religious people, in a church too). 16:16-24 (long
sorrow; loss in pregnancy or childbirth, or longing for a child; "Reach out to
people you trust, to a pastor, or to someone trained to help"). 16:25-33 (left
alone in a crisis).

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each chapter: pass. At
the end, all 36 commands of the content-gates step, one at a time: exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 60 chapters in
plain words; validate-no-emdash: 260 files, 0 em-dashes; search index 732
entries up to date; passage index 623 files match; verify-sources 22 texts
intact). `pnpm check`: clean. `pnpm test`: 146 files passed, 7 skipped; 1,657
tests passed, 73 skipped. No build (no page code changed); no server; no
Lighthouse; no lh-*.json; no dist/.

### Still unverified

Free Will Baptists' ordinance is from a list citing their statement, not the
statement itself. The Jehovah's Witness reading of 14:28 rests on a mirror of
their library and on critics' summaries; the page states it generally and
quotes nothing. The Orthodox and Pentecostal positions on 16:13 are stated
generally, without a document.

### Next

John 17 onward, in the same shape.

## Continuation: John 17 to 21 (2026-11-19)

This run finishes John. All five chapters were written in order, and none was left out.

### Chapters 17 to 21 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| John 17 | 4 (Father, the hour has come; Holy Father, protect them; not of the world, sanctify them by the truth; that they may all be one) | 3,536 |
| John 18 | 6 (Whom are you seeking? I am He; to Annas, and a fire in the courtyard; I have spoken openly, and Peter denies again; before dawn, to Pilate's headquarters; my kingdom is not of this world, what is truth?; not this man, but Barabbas) | 4,045 |
| John 19 | 8 (here is the man; where are You from? the greater sin; we have no king but Caesar; what I have written, I have written; the seamless tunic, and his mother; I am thirsty, it is finished; not one of His bones will be broken; Joseph, Nicodemus, and a new tomb) | 5,481 |
| John 20 | 5 (the empty tomb and the grave cloths; Mary Magdalene meets the risen Jesus; as the Father has sent Me; Thomas: My Lord and my God; why this book was written) | 3,786 |
| John 21 | 5 (breakfast on the shore; do you love Me? feed My sheep; when you are old, and follow Me; what is that to you? you follow Me; this is the disciple who testifies) | 3,447 |
| Total | 28 | 20,295 |

Each chapter note carries `"plain": true`. Every chapter of Matthew, Mark and John now has its plain layer.

### Field order, checked

After each chapter every passage was printed field by field (happening, hearers, ot, hard, asks) and read: all 28 sit under their right headings, and each "Old Testament behind it" names Old Testament books. 20:30-31 was first written without a hard question; one was added so the passage has all five parts. `validate-bible-notes` passed after each chapter with no exceptions (`OT_FIELD_KNOWN` stays empty), and `validate-no-emdash` stayed clean.

### Sources

All in `bdoor-ledger.md` under "The plain notes on John 17" to "21". 32 web searches (7, 5, 8, 8, 4). New: David Chytraeus and "the high priestly prayer"; Lumen Gentium 8 and Unitatis Redintegratio (1964); the Orthodox view of unity (stated generally); the Lausanne Covenant (1974), section 7, quoted; Edinburgh 1910 and the World Council of Churches (Amsterdam, 1948); Origen, Against Celsus 3.10-12; speira and chiliarchos; Annas and his five sons (Josephus); the Praetorium debate; P52 (John Rylands Library, published 1935, dated to the 100s); Bacon's "Of Truth" (1625); "friend of Caesar" (Sejanus link stated as disputed); the hour in John 19:14 against Mark 15:25; Josephus, Antiquities 3.161 on the high priest's woven garment; the "paid in full" claim for tetelestai (checked, found doubtful, NOT used: the page says nothing about receipts); breaking the legs; Augustine, Tractate 120, and Chrysostom on the blood and water; a hundred litrai (about 33 kilograms); Ecce homo and INRI; Gregory the Great's Homily 33 (591) and the 2016 feast of Mary Magdalene; Trent, the Orthodox mystery of confession, Luther's Office of the Keys, and the Reformed proclamation reading of 20:23; Suetonius, Domitian 13; emphusaō in the Greek of Genesis 2:7; Jerome and Augustine on the 153 fish; agapaō and phileō; Peter's death in 1 Clement and Eusebius (marked as tradition); Pastor Aeternus and Catechism 881 on John 21. Creed wording is copied from the site's Nicene Creed page.

### Cut or narrowed

Cut because they could not be confirmed, or were doubtful: the "paid in full" receipts; Ut Unum Sint and Käsemann; the year 1054 (written as "the churches of East and West have parted"); the number of denominations; Cyprian on the seamless tunic (written as "many Christians"); Salome as Mary's sister; the Humphreys and Waddington dates; Trent's year and canon wording; the Small Catechism's "as valid and certain" sentence; Domitian's refusal of the title; the 1969 calendar change; Catechism 553; Oppian, the gematria guesses and every modern scholar by name (Maccoby, Klassen, Barth, Bammel, Barbet, Crossan, Trench, Carson, Barrett, Brown); the date of Peter's death. Narrowed: P52's size not given; "friend of Caesar" a title in the view of "some scholars"; the Antonia pavement "later than Jesus' day, most archaeologists think"; "a few old copies of John do read 'third hour'" with no manuscript named; Chrysostom's homily number not given.

### Contested matters, and how they are stated

17:2 God's choosing (the Mark 4 and Matthew 13 sentence). 17:3 "the only true God" (Arius and Jehovah's Witnesses, "sincere, and they deserve a patient answer, not scorn"; pointer to 14:28 and the creeds). 17:12 Judas (three views; "These notes do not say what God did with Judas. That belongs to God."). 17:14-16 "not of the world" (both misuses; "This prayer gives no one leave to despise anyone."). 17:21 unity (Catholic, Orthodox, Protestant, each as its teachers state it; the ecumenical movement; the skeptic's charge granted; "Christians are divided, and the division has done real harm. Every tradition has had a hand in it"; "These notes take no side among the churches."). 18:6 the falling back (two readings). 18:10-11 the sword (pointer to Matthew 26). 18:28 the date (Mark 14 wording). 18:36 two misuses named once, plainly, no party named. 19:11 "the one who handed Me over" (Caiaphas, Judas, all). 19:14 the day (Mark 14's four views) and the hour (three explanations, no side). 19:23 the tunic (priestly reading, plain reading, unity reading). 19:26-27 Mary and the disciple (Catholic and Orthodox; many Protestants). 19:34 the blood and water (evidence; the sacraments and Eve; the Spirit; 1 John 5:6). 19:38-42 the burial (the skeptic's case and the replies; the creeds' "buried"). 20:17 "do not cling". 20:22 and Pentecost (two explanations). 20:23 Catholic, Orthodox, Lutheran and Reformed and other Protestant readings, each as its teachers state it, "These notes take no side." 20:28 Domitian (some and others). 20:31 the two readings of "believe". 21 the chapter's place (book page wording). 21:11 the 153 (guesses named as guesses). 21:15-17 the two words for love (both views, "Scholars are divided between these views. These notes take no side.") and Peter's office (the Matthew 16 pattern: Vatican I and Catechism 881; the Orthodox; many Protestants). 21:18-19 Peter's death (Scripture's hints; 1 Clement; Eusebius and Origen, "early and widely held tradition ... it should be called tradition"). 21:24 the "we" (book page).

**19:15, the sentence on the page.** "‘We have no king but Caesar’ was said by the chief priests, not by the Jewish people." The "Christ-killers" misuse is named and rejected there in full, once, in the Matthew 27 wording with Nostra Aetate 4 and Acts 4:27 word for word; 18:39-40 and 19:1-7 point to it. Each place where "the Jews" bites in John 18 to 20 says who is meant (the chief priests and their officers; the authorities), with the book page named.

**Mary Magdalene, the sentence on the page.** "The Gospels never say that Mary Magdalene was a prostitute. That idea came much later." Then Gregory's sermon of 591, the Western picture, the Eastern churches keeping the women apart, and the 2016 feast.

### Care lines included

17:6-12 (the reader who fears being a Judas). 18:19-27 (the Matthew 5 abuse line word for word). 19:23-27 (the bereaved parent: the Matthew 2 line word for word). 20:19-23 (the reader carrying an unforgiven sin). 20:24-29 (doubt met, not scolded). 21:15-17 (the reader who has failed and wonders if they can come back). 21:18-19 (not a call to seek suffering).

### The rendered pages: John 12 to 21

All five chapters were committed first. `pnpm build`, then `scripts/serve-like-vercel.mjs` on port 4605, and a Playwright script at 390 wide (deviceScaleFactor 1; `/api/trpc`, `/api/track` and `/_vercel/*` stubbed) opened John 12 to 21, scrolled until the plain section loaded, and compared each passage's heading, the order of its part headings and the first 60 characters under each with the data file. Result: 55 of 55 passages matched in all 10 chapters; no sideways scroll; no console errors; no failed requests. Screenshots of John 14, 19 and 21 read clean (`/home/user/elite-shots/bdoor/run1221-john-{14,19,21}-390.png` and `-passage.png`). Server stopped; dist/ deleted; no lh-*.json.

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each chapter: pass. At the end, all 36 commands of the content-gates step, one at a time: exit 0 each (validate-bible-notes: 66 introductions, 1,189 chapter notes, 65 chapters in plain words; validate-no-emdash: 260 files, 0 em-dashes; search index 732 entries up to date; passage index 623 files match; verify-sources 22 texts intact). `pnpm check`: clean. `pnpm test`: 146 files passed, 7 skipped; 1,657 tests passed, 73 skipped. `pnpm build`: passed.

### Still unverified

The Orthodox positions on unity (17:21) and confession (20:23) and the Catholic and Orthodox reading of 19:26-27 are stated generally, without a document. The Reformed reading of 20:23 rests on study-Bible and teaching pages, not a confession.

### The whole book, and the three Gospels (counted by script)

John 1 to 21: 21 chapters, 123 passages, 77,812 plain words. Mark: 16 chapters, 95 passages, 44,581 words. Matthew: 28 chapters, 167 passages, 103,646 words. The three Gospels together: 65 chapters, 385 passages, 226,039 plain words.

### Next

John is finished. Luke is the Gospel still without a plain layer.

## Luke: book page and chapters 1 to 3 (2026-11-19)

### The book page (`/study/bible/luke`, same address)

Data only, in `client/public/bible/notes/luke/intro.json`, field `teaching`,
built from the same parts and hooks as Mark, Matthew and John. Fourteen
headed parts with a contents list: Luke in a minute; Who wrote it, and how we
know; One work in two volumes, for Theophilus; The opening sentence: what
kind of history; When it was written; Where Luke's material came from; How
Luke is built; The big themes; What only Luke has; Luke and the Old
Testament; Luke and the history of his day; Luke and the Jewish people; Luke
and money; How the church has read Luke. Then 12 hard passages (2:2, 4:25,
6:20, 12:49, 14:26, 16:8, 16:19, 17:21, 22:36, 22:43, 23:34, 23:43), 13 key
words, a timeline of 17 entries, a map of nine places (Capernaum, Nazareth,
Nain, the Samaritan villages and Emmaus placed roughly as regions, Jericho,
Jerusalem, Bethany, Bethlehem), and five "Go deeper" pages after the shared
six: Jewish life in Jesus's day, The Roman world, the guide on wealth and the
poor, the guide on hospitality, and the guide on women in the ancient world.
The outline band at the top already drew Luke's eight parts from the
existing `structure`; "How Luke is built" points to it.

Words: 4,851 in the fourteen parts; 906 in the lists, timeline and map.

**Code.** None changed in the app. `teaching.test.tsx` now expects the four
Gospels to have a guide and adds two tests for Luke (the history and Jewish
people parts, two hard-passage links, Go deeper; the map's north-to-south
description, the Emmaus card, the two-regions caption).

**A layout repair.** The first commits wrote `luke/intro.json`, `luke/1.json`
and `luke/2.json` back in a new layout. The Luke 3 commit put all three back
in their own layout, with only `teaching` and `"plain": true` added.

### Chapters 1 to 3 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Luke 1 | 8 (an orderly account, for Theophilus; a priest, a prayer, and an angel at the altar; ‘How can I be sure?’ silence, then Elizabeth's joy; Gabriel comes to Mary; Mary visits Elizabeth; Mary's song; ‘His name is John’; Zechariah's song) | 4,468 |
| Luke 2 | 7 (a census, and a birth in Bethlehem; angels and shepherds; they went and saw, and told; named, and presented in the temple; Simeon; Anna, and the growing child; the boy in His Father's house) | 3,993 |
| Luke 3 | 6 (the word of God comes to John; a warning to the crowds; ‘What then should we do?’; one more powerful is coming, John in prison; the baptism of Jesus; the family line, back to Adam) | 3,130 |
| Total | 21 | 11,591 |

After each chapter every passage was printed field by field and read: all 21
sit under their right headings. `validate-bible-notes` passed after each with
no exceptions (`OT_FIELD_KNOWN` stays empty).

### Sources

All in `bdoor-ledger.md` under "Luke's book page" and "The plain notes on
Luke 1" to "3". 34 web searches: 23 for the book page, then 3, 5 and 3.
Main sources: Irenaeus, Against Heresies 3.1.1, 3.11.8, 3.14.1; the
Muratorian fragment; Hobart (1882) and Cadbury; Cadbury, The Making of
Luke-Acts (1927); Loveday Alexander (1993); Robinson (1976); Farrer (1955)
and Goodacre (2002); the Pilate stone; the Abila inscription; the Tivoli
inscription and Tertullian on the census; Tyndale House and others on 23:34
and 22:43-44; Nostra Aetate (1965); the canticles in the daily office and the
Book of Common Prayer; Jerome (398) on the calf; the Emmaus candidates; Nein;
Mishnah Tamid 5:2; 4Q246; kecharitōmenē and gratia plena; Bailey (2008) and
Carlson (NTS 2010) on kataluma; Mishnah Kiddushin 4:14; the Priene
inscription; Mishnah Avot 5:21; Steinmann (JETS 2017) on the second Cainan;
reference works on tax collectors and on the soldiers of 3:14. Counts of
Greek words are a script over the repository's text. Scripture is the BSB,
checked word for word.

### Cut or narrowed

The anti-Marcionite prologue; the claim that Cadbury coined "Luke-Acts";
Philip's death date; the Caiaphas bone box; Marcion's date; Mommsen, Ramsay,
Syme, Turner and Brown by name on the census; the Motza "consensus" for
Emmaus; the priestly blessing Zechariah could not give; Ein Karem; the age of
brides; the wax tablet; Judith; the 25 December date; the ox and donkey's
origin; the five shekels; the claim that no legion was in Judea before 66;
Africanus on Herod burning the records; Conzelmann; every scholar in the
deep notes not checked this run. Narrowed: Cadbury "from 1919"; the Abila
inscription "most date it to Tiberius's reign, though its exact date is
debated"; Saturninus "a few years before Herod died"; the soldiers "most
think"; John and the Dead Sea community "only a guess".

### Contested matters, and how they are stated

Authorship (Paul's letters, the "we" passages and the early writers named
apart; the diary and convention readings and their critics). Luke a Gentile
(both views). Theophilus (patron, believer, symbolic name). The preface
(historians or technical handbooks). The date (after 70, the majority; the
early 60s and the end of Acts; a few later; "the site does not settle the
question"). Sources (the Matthew page's three hypotheses, same wording). The
census (five explanations, "These notes do not settle it"). 23:34 (some
think added, some think removed; modern Bibles bracket it). The virgin
conception (skeptics and Christians; "The site confesses it with them",
with the Apostles' Creed in the site's wording). "Highly favored" and "full
of grace" (Catholic and Protestant readings; shared ground). Honour to Mary
(Catholic and Orthodox; many Protestants). The Magnificat (neither only
inward nor a party programme). 2:14 (the one-letter difference). The sword
(Mary's grief). Anna's age (two readings). "My Father's house" or
"business". Why John did not tell tax collectors and soldiers to quit (two
lessons). "The Spirit and fire" (one gift, or two outcomes). Why Jesus was
baptized (the Matthew 3 answers). The two family trees (the Matthew page's
four views, "The site does not choose"). The second Cainan (Luke followed the
Greek, or a copyist added it).

**Luke and the Jewish people.** Its own part, consistent with the other three
book pages: the temple start and end, the faithful Jews of chapters 1 and 2,
the grieving crowds and women (23:27, 23:48), the misuse named and rejected
in the same words, Acts 4:27 and Nostra Aetate, and 23:34 with what the
manuscripts show. No verdict on the Jewish people.

**Money.** Its own part: the hard words for the rich quoted as they stand;
the prosperity reading named and refused; contempt for the rich refused
(the women of 8:3, Zacchaeus, Joseph of Arimathea, 18:26-27).

**The census, the sentences on the book page.** "The census of 2:1-2. Here
the difficulty is real. ... No writer outside Luke tells of a Roman census in
Herod's kingdom." Then five explanations, and "The question is about a date.
It does not touch the confession that Jesus was born as a real man in real
history. These notes do not settle it." Luke 2:1-7 states the same in brief
and points to the book page.

**The shepherds, the sentences on the page.** "Many sermons say that
shepherds were despised outcasts. The evidence for that comes mostly from
Jewish writings set down well after Jesus' day; one saying in the Mishnah,
written down around AD 200, lists herding among trades a father should not
teach his son because they tempt a man to steal (Mishnah Kiddushin 4:14).
How far that reflects the first century is debated, and the Bible itself
honours shepherds."

**The inn.** "There is no innkeeper in Luke's story, and no one turns them
away. The cruel innkeeper of Christmas plays is not in the text." The guest
room and the "place to stay" readings are both given.

### Care lines included

1:5-17 (childlessness: "a grief then, and a public shame"; "Childlessness is
not a judgment from God, and it does not measure your faith"; a friend,
pastor or counsellor). 1:18-25 (doubt met, not scolded). 2:25-35 (the sword:
the bereaved parent, the Matthew 2 line adapted, with a crisis line or
emergency service). 2:41-52 (parents of a child who has wandered). 2:36-40
(the old, widowed and alone).

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each piece: pass. At
the end, all 36 commands of the content-gates step, one at a time: exit 0
each (validate-bible-notes: 66 introductions, 1,189 chapter notes, 68
chapters in plain words; validate-no-emdash: 260 files, 0 em-dashes; search
index 732 entries up to date; passage index 623 files match; verify-sources
22 texts intact). `pnpm check`: clean. `pnpm test`: 146 files passed, 7
skipped; 1,659 tests passed, 73 skipped. ESLint on the changed test file:
clean. `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,028 pages),
`pnpm run audit:canonicals` (0 failures).

Served with `scripts/serve-like-vercel.mjs` on port 4606 and looked with
Playwright at `/study/bible/luke`, `/luke/1`, `/luke/2`, `/luke/3`, `/mark`,
`/matthew` and `/john` at 390 and 1440: no sideways scroll, no page errors;
Luke's contents list has 19 entries; Mark, Matthew and John show their own
guides as before (16 contents entries each, their own maps and Go deeper). A
script matched every rendered passage heading, its part headings in order
and the first 60 characters under each to the data: Luke 1, 8 of 8; Luke 2,
7 of 7; Luke 3, 6 of 6, at both widths. The first look at Luke's map had the
Jerusalem name over Emmaus's mark and the Jericho name over Jerusalem's; the
Jerusalem and Jericho `label` entries and a small move of the Emmaus mark
fixed it, and a script then found no name overlapping another name or a mark
at 390 and 1440, day and night (the Jerusalem and Bethany marks touch, as on
John's map). The server was restarted to see the change. The label fix was
data only and was checked by `validate-bible-notes`, the teaching test and
the search and passage index checks after the build; the build was not rerun
for it. Screenshots: `/home/user/elite-shots/bdoor/lkrun-*`. Lighthouse was
not run (no app code changed and nothing new loads on a chapter's first
paint). dist/ deleted, server stopped, no lh-*.json. One slip: the server was
stopped once with `pkill -f` on its own command line instead of by PID; it
matched only this run's server.

### Still unverified

The exact words of every ancient writer (all paraphrased); the Orthodox and
Catholic positions on honour to Mary (stated generally); how far the
Mishnah's rules reflect the first century (said to be debated); the
repository's dates for Augustus (27 BC) and Tiberius (AD 14), reused, not
searched again; the meaning of the name John (common name studies, not
searched).

### Next

Luke 4 onward in plain words, in the same shape.
