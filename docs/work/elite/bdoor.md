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

## Continuation: Luke 4 to 8 (2026-11-19)

Data only: `client/public/bible/notes/luke/plain/4.json` to `8.json`, and
`"plain": true` added at the end of `luke/4.json` to `luke/8.json` with no
other change to those files (each diff is the one closing brace and the new
line). No app code changed.

### Chapters 4 to 8 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Luke 4 | 6 (tested in the wilderness; ‘Today this Scripture is fulfilled’; no prophet is welcome at home; a word with authority in Capernaum; a fever, and a town at the door; sent to other towns) | 3,839 |
| Luke 5 | 5 (a great catch, and ‘Go away from me’; ‘If You are willing’; let down through the roof; Levi, and a banquet with sinners; new wine, new wineskins) | 3,118 |
| Luke 6 | 8 (grain picked on the Sabbath; a hand restored; a night of prayer, and twelve chosen; blessings and woes on a level place; love your enemies; do not judge; trees and fruit; two builders) | 4,423 |
| Luke 7 | 5 (a centurion's faith; a widow's only son at Nain; John's question from prison; more than a prophet, children in the market; a woman at Simon's table) | 3,521 |
| Luke 8 | 8 (the women who travelled with Jesus; the farmer and the seed; a lamp on a stand; Jesus' true family; the storm; a man among the tombs; a woman who touched his cloak; ‘Child, get up’) | 4,793 |
| Total | 32 | 19,694 |

Where Mark or Matthew already tell an event, the note says so, points to
their notes, reuses their checked wording, and spends its words on what
Luke does differently. The fuller treatment goes to what only Luke has:
Nazareth (4:16-30), the catch (5:1-11), the woes (6:24-26), Nain
(7:11-17), the woman at Simon's house (7:36-50), and the women of 8:1-3.

### Field order, checked

After each chapter every passage was printed field by field and read: all 32
sit under their right headings. `validate-bible-notes` passed after each with
no exceptions (`OT_FIELD_KNOWN` stays empty); its quotation check and a
script over the repository's BSB found every quotation verbatim.

### Sources

All in `bdoor-ledger.md` under "The plain notes on Luke 4" to "8". 21 web
searches (6, 3, 3, 5, 4). Main sources: the Theodotus inscription; Mishnah
Megillah 4:4 (marked later); the NA28 apparatus as reported on Luke 4:18,
4:44, 5:39 and 8:43; Leviticus 25 and the debate over whether the Jubilee was
kept (encyclopedia.com; Bergsma and Kaplan as cited); 11Q13; zōgreō in the
lexicons; Mendel Nun on night fishing; ptōchos in Thayer and Strong's; kolpos
in the SIL notes; Thaddaeus and Judas son of James; 4Q521; the two readings
of 7:47 (NET, Barnes, Pulpit, the catena); Mishnah Ketubot 7:6 (marked
later); ancient reclining at table; Shunem and Nain; the Magdala synagogue
(2009); Chuza's office; the University of Waterloo thesis on 8:1-3. Greek
word facts (aphesis, dektos, epitimaō, limnē) are a script over the
repository's Greek. Scripture is the BSB, checked word for word.

### Cut or narrowed

Cut: Josephus on Eleazar and Tobit; any cliff site at Nazareth; Genesis
Rabbah on the physician proverb; Isaiah 58 as the Yom Kippur reading; Sloan,
Ringe, Yoder, Gutiérrez, Jeremias, Sanders, Jervell, Levine, Hodge, Shedd,
Brown, Bock, Dewey, Wrede, Metzger, Combs, Vermes and Bauckham by name;
Hanina ben Dosa; the Antipas reed coin; the Didache's days; Heracleon;
deuteroprōtos and Bezae's Sabbath saying; the contrast of penēs and ptōchos
(no source found); Avot de-Rabbi Natan; the Joanna-Junia proposal; the
Malachi 4:2 "wings" echo; kalos kagathos; Hillel's date. Narrowed: the
night fishing ("many think"); the Jubilee ("no clear record ... scholars
debate whether it was kept at all"); Theodotus ("most date it before 70,
though its date is debated"); 11Q13 ("written before Jesus' day"); the
woman's hair (the Mishnah rule "is later and may not show how things were in
a Galilean town"); 8:1-3 ("We cannot say exactly" how unusual it was; the
women's guide's "no parallel" is not repeated); Simon's house mentioned
before his call ("perhaps"); "the first great feast Luke tells of".

### Contested matters, and how they are stated

Luke's order of the temptations (each order makes its point; which is
first is not known). Whether Christ could sin (two views; the creeds do not
settle it). "Good news to the poor" (the spiritual and the social reading,
both given weight; Luke "will not let either reading swallow the other";
neither "the programme of a political party, of the left or the right").
Why Nazareth raged ("not one thing"; not a verdict on the Jewish people).
Possession or illness (Mark's wording). 4:44 Judea or Galilee. Luke's catch
and John 21 (one event or two; "Nothing in the faith depends on" it). Levi
and Matthew ("Most think ... but Luke does not say"). 5:39 good or better.
Same sermon or two (both held). Thaddaeus and Judas son of James. Turn the
other cheek (the three readings, "These notes do not decide between them").
The centurion's messengers (both views). John's doubt (both readings). 7:47
(below). Why parables. Jesus' brothers (the three readings). The pigs.

**Luke 6:20 and 6:24, the sentences on the page.** "‘Blessed are you who are
poor’ and ‘Woe to you who are rich’. Does Luke mean money, or the heart?
Both, and it matters how they fit." Then: "Luke's wording is plainer, and it
should not be blunted. He means people who are really poor, who have little
food and no security. God has a special care for those who have nothing."
"But Luke does not say that being poor makes anyone good, or that poverty is
holy in itself. ... The kingdom is theirs because they belong to him, not
because they are poor." "The woe on the rich is just as plain, and it is a
warning, not contempt. ... But Luke does not despise the rich either." The
women of 8:3, Zacchaeus and 18:27 are named, as on the book page.

**The woman of 7:36-50, the sentences on the page.** "Who was she? Luke does
not name her. She is not Mary Magdalene, whom Luke introduces as someone new
in the very next chapter (8:2). She is not Mary of Bethany, Lazarus's
sister, who anoints Jesus' feet in John's Gospel, at a different time and
place, just before his death (John 12:1-8)." "What was her sin? Luke calls
her ‘a sinful woman’ and Simon calls her ‘a sinner’, but neither says what
she had done. Many sermons and paintings have made her a prostitute. The
text does not say so, and these notes do not guess." On 7:47: her love as
the evidence of forgiveness already given, or as part of the way she came to
it, or both held together with 7:50; "Christians have read the verse in all
these ways, and these notes take no side." Luke 8:1-3 repeats that Mary
Magdalene was not a prostitute and that "seven demons" says nothing about
her morals, with Gregory's sermon of 591 and the Eastern churches, in the
John 20 wording.

### Care lines included

4:1-13: the Matthew 4 fasting line, word for word. 5:12-16: the Matthew 8
line on sickness and faith, word for word (4:38-41 and 8:40-48 point to it).
5:17-26: illness is not punishment (John 9:2-3). 6:27-36: the Matthew 5
"turn the other cheek" care paragraph word for word ("‘Turn the other cheek’
is not a command to stay with someone who is hurting you. ... If you are
being harmed, tell someone you trust and get help.") and the Matthew 5:43-48
enemy line word for word; "give to everyone who asks" is not a rule to hand
over what will be used for harm. 6:37-42: 6:38 is not a promise of money.
7:11-17 and 8:49-56: no promise beyond the text; "Grief is not unbelief";
"If grief is crushing you, do not carry it alone. Reach out to people you
trust, to a pastor, or to someone trained to help." 7:18-23: doubt met, not
scolded; a pastor, a doctor, or a crisis line. 7:36-50: the John 8 sentence
word for word ("If what happened to you was not your choice, it is not your
sin, and you deserve safety and help from someone you trust"). 8:22-25: fear
is not faithlessness; help for anxiety is wise. 8:26-39: the Mark 5 lines on
illness and spirits, and its path to help word for word ("If that is where
you or someone you love is today, please reach out for real help now, to a
doctor, a pastor, or a crisis line"). No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each chapter: pass.
At the end, all 36 commands of the content-gates step in ci.yml, one at a
time: exit 0 each (validate-bible-notes: 66 introductions, 1,189 chapter
notes, 73 chapters in plain words; validate-no-emdash: 260 files, 0
em-dashes; search index 732 entries up to date; passage index 623 files
match; verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`:
146 files passed, 7 skipped; 1,659 tests passed, 73 skipped.

Rendered check, after the chapter commits: `pnpm build` (exit 0), served
with `scripts/serve-like-vercel.mjs` on port 4603, and a Playwright script
at 390 wide (deviceScaleFactor 1) opened `/study/bible/luke/4` to `/8`. Every
passage's rendered heading, its part headings in order and the first 60
characters under each matched the data: Luke 4, 6 of 6; Luke 5, 5 of 5; Luke
6, 8 of 8; Luke 7, 5 of 5; Luke 8, 8 of 8. No sideways scroll on any. No page
errors. Each page logged three console 404s, for `/api/track` and the two
`/_vercel/*insights` scripts, which the local server does not serve; Luke 3
and Luke 12, untouched, log the same three. Screenshots read:
`/home/user/elite-shots/bdoor/lk48-4-390-*.png` and `lk48-7-390-*.png`.
Server stopped by its PID, dist/ deleted, no lh-*.json. Lighthouse not run
(no app code changed).

### Still unverified

Ancient writers' exact words (all paraphrased); the Theodotus inscription's
date; how first-century synagogue readings were chosen; how often the
Jubilee was kept; how unusual 8:1-3 looked to others; the reclining posture
beyond reference works.

### Next

Luke 9 onward in plain words, in the same shape.

## Continuation: Luke 9 to 13 (2026-11-19)

Data only: `client/public/bible/notes/luke/plain/9.json` to `13.json`, and
`"plain": true` added at the end of `luke/9.json` to `luke/13.json` with no
other change to those files (each diff is the one closing brace and the new
line; each file's own ending, with or without a final newline, kept). No app
code changed.

### Chapters 9 to 13 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Luke 9 | 9 (the twelve sent out, and Herod's question; five thousand fed; ‘The Christ of God’; take up your cross daily; glory on the mountain, and the talk of his departure; a father's only son; who is the greatest? not one of us; his face set toward Jerusalem, fire refused; three who would follow) | 5,134 |
| Luke 10 | 7 (seventy-two sent ahead; woe to the towns; ‘I saw Satan fall like lightning’; Jesus rejoices; ‘And who is my neighbor?’; the Good Samaritan; Martha and Mary) | 4,179 |
| Luke 11 | 7 (‘Lord, teach us to pray’; a friend at midnight, ask, seek, knock; ‘By the finger of God’; the empty house, and who is blessed; the sign of Jonah and the lamp; woes at a Pharisee's table; woes on the experts in the law) | 4,173 |
| Luke 12 | 7 (the leaven of hypocrisy, fear, and the sparrows; confessing Jesus, and the sin against the Spirit; the rich fool; do not worry, where your treasure is; ready servants, to whom much is given; fire, a baptism, and division; reading the sky, and settling on the way) | 4,424 |
| Luke 13 | 6 (the Galileans, and the tower that fell; one more year for the fig tree; a daughter of Abraham set free; the mustard seed and the leaven; the narrow door; ‘Go tell that fox’ and the lament) | 3,723 |
| Total | 36 | 21,633 |

Where Mark or Matthew already tell an event, the note says so, points to
their note, reuses its checked wording, and spends its words on what Luke
does differently ("daily", exodos, "chosen", the only child, Luke's shorter
prayer, the finger of God, the egg and scorpion and the Holy Spirit, rue and
the unmarked graves, five sparrows for two pennies, ravens and "little
flock", the master who serves, the fire and the baptism). The fuller
treatment goes to what only Luke has: 9:51-56 and 9:61-62, the seventy-two,
Satan's fall, the Good Samaritan, Martha and Mary, the friend at midnight,
the woman in the crowd, the rich fool, Luke 13:1-9 and 13:10-17, and "that
fox".

### Field order, checked

After each chapter every passage was printed field by field and read: all 36
sit under their right headings. `validate-bible-notes` passed after each with
no exceptions (`OT_FIELD_KNOWN` stays empty); its quotation check found every
quotation verbatim in the repository's BSB (five quotations that ran across a
"he said" were split at the speaker, as the BSB splits them).

### Sources

All in `bdoor-ledger.md` under "The plain notes on Luke 9" to "13". 17 web
searches (3, 6, 3, 2, 3). Main sources: the apparatus on 9:35, 9:54 and
9:55-56 as reported (NET notes; P75, Sinaiticus, Vaticanus); the divided
witness on seventy and seventy-two; the Genesis 10 numbers; Mishnah Nazir
7:1 and Bauckham, New Testament Studies 44 (1998); the Ascent of Adummim and
Jerome; Augustine's allegory (Quaestiones Evangeliorum 2.19); Mishnah Avot
1:4; P75 on Luke's shorter prayer; anaideia (Johnson, JETS 1979; Snodgrass,
JBL 1997, as reported); Mishnah Sheviit 9:1 on rue; Sirach 11:18-19; the
night watches; the Galileans and the tower of Siloam as attested only in
Luke; the fox. Greek facts (exodos three times, analēmpsis once, anaideia
once, baptizō in 11:38, girded waists, lepton, kopria, agōnizomai, luō for
ox and woman, teleioumai) are a script over the repository's Greek. Earlier
ledger rows reused for the Samaritans, Bethsaida, the cross, Tabor and
Hermon, McCane's second burial, Jericho road, the Pharisees, Abel and
Zechariah, Gehenna, Bunyan, Antony, Pilate in Philo and Josephus, the Siloam
pool, mustard and leaven. Scripture is the BSB, checked word for word.

### Cut or narrowed

Cut: the Cynics and Theissen; Josephus on Machaerus; the two Bethsaida sites;
the "great omission" label; "the only miracle in all four Gospels" (now "one
of the few events"); the "1800s" date for the sharing explanation; Leo the
Great by name; Conzelmann, Evans, Moessner, Hengel, Sanders, Tertullian,
Marcion and Ambrose; P45 for 9:55-56 (not confirmed); which manuscripts read
seventy or seventy-two; long formal greetings as the reason for 10:4;
"people debated how far 'neighbour' reached"; the 10:42 variant; the Holy
Spirit petition in some copies of 11:2; Bailey's village customs; a lodging
price for two denarii; 1 Enoch and Malherbe; the night-watch hours; the
mud-brick wall and woollen wealth; "people brought inheritance quarrels to
teachers"; "many teachers held healing could wait"; Gerizim and the aqueduct
for Pilate; the lion contrast for the fox; "falling walls" in AD 70.
Narrowed: wine to clean wounds ("many think"); the expected Israelite third
traveller ("Many readers think"); a woman at a teacher's feet ("Many
scholars think it was not the usual place"); 2 Chronicles 28:15 ("many
readers think Jesus had it in mind"); the tower "perhaps part of the city
wall"; the fig tree's vineyard from the verse only; the glory as
strengthening ("One common answer").

### Contested matters, and how they are stated

The longer wording of 9:54-56 (the oldest copies lack it; most scholars
think it added; "They are true to Jesus ... But the plainer text is
enough"). "Chosen" or "beloved" at 9:35 (the oldest copies). The views of
9:27 (Mark 9 wording). Burying a father (three readings). Seventy or
seventy-two ("scholars still argue"). Satan's fall (three readings). The
priest and the Levite (below). Augustine's allegory and the plain reading
("Others say both can be true"). Martha and Mary (not a ranking). Luke's
shorter prayer (two explanations, no majority claimed). Anaideia
(persistence, the asker's boldness, the sleeper's shame). Luke 11:28 (a
correction, or Mary as the first who heard and kept). What hell is like (the
Matthew 10 note, not settled). The unforgivable sin (views, no choice).
"Sell your possessions" (literal for some, generosity for all; Acts 5:4;
Zacchaeus). "Cut him to pieces" (two readings). The fire (the Spirit,
judgment, refining). The opponent at law (God's judgment, or quarrels now).
The fig tree's owner and keeper (two readings, not setting the Father
against the Son). How many will be saved (two readings, not settled). 13:35
(hope, warning, both; 19:38).

**The priest and the Levite, the sentences on the page (Luke 10:30-37).**
"Why did they pass by? Many sermons say they were afraid of becoming
unclean. A priest was not to make himself unclean for a dead person, except
for close family (Leviticus 21:1-3), and the man looked half dead. But that
explanation is debated. Both men were going down the road, away from
Jerusalem, so they were not hurrying to serve in the temple. The Law gave
Levites no such rule about the dead. And a later Jewish teaching, written
down in the Mishnah around AD 200, says that even a high priest must become
unclean to bury a body that no one else will bury (Mishnah Nazir 7:1). How
far that later teaching shows what people thought in Jesus' day is not
known. The scholar Richard Bauckham argued (New Testament Studies, 1998)
that the story sets two duties against each other, keeping clean and loving
your neighbour, and shows that love must come first. Jesus himself gives no
reason at all. Whatever their reasons, the story gives them no excuse."

**The Good Samaritan.** "Who was a neighbour?" for "Who is my neighbour?";
the lawyer cannot say "the Samaritan"; "The story is not the programme of a
political party, of the left or the right. It is not only a call to be nice
either. It asks for mercy that costs time, money and safety, given across a
line of old hatred, to anyone in need. That is hard, and it should not be
softened." The Samaritans in the John 4 wording, with about nine hundred
living today.

**Luke 13:1-5, the sentences on the page.** "Were the people who died worse
sinners? Jesus says no, twice: ‘No, I tell you.’ Suffering is not a measure
of guilt. ... Anyone who tells a grieving family that a death was a
punishment is saying what Jesus refused to say." "Then what does ‘unless you
repent, you too will all perish’ mean? It is a call to everyone listening,
the people who brought the news included. It is not a threat to the
bereaved, and it is not an explanation of why anyone died."

**The woes and the Jewish people.** Luke 11:37-54 uses the Matthew 23
wording: who the Pharisees were; "So ‘Pharisee’ is not a word for a
hypocrite"; "The woes are a warning to religious leaders, never a verdict on
the Jewish people"; "And the woes fall first on religious leaders of every
age, Christian ones included"; the "Christ-killers" sentences and Acts 4:27
on 11:51. Luke 13:31-35: the Pharisees who warn Jesus; "This is grief, not a
verdict. The lament is not a sentence passed on the Jewish people."

**Violence.** 9:51-56: "This passage can never be a warrant for violence
against anyone in God's name: not against a village, a people, a religion,
or a person who says no to Jesus." 10:1-12: wiping off the dust allows no
one "to harm or punish those who turn the message down". 12:49-53: "This is
a picture of division, not a call to violence", with 22:51.

**Money.** 12:13-21: not against saving or planning (Joseph, the ant);
against greed and storing "for himself"; the book page's refusal of both the
prosperity reading and contempt for the rich. 11:5-13: the Matthew 7
sentences against the prosperity reading.

### Care lines included

9:23-27: denying yourself is not accepting harm; "If someone is hurting you,
seeking safety is not a failure to carry your cross." 9:37-45: the Mark 9
illness wording word for word; the father let down by Jesus' followers.
9:57-62: the Matthew 8 paragraph adapted, ending word for word "If you are
grieving a father or mother now, hear this clearly: grief is not
disobedience. Jesus himself grieved." 10:17-20: no testing God with real
snakes; joy for those with no visible gift. 10:38-42: for the reader who is
the Martha ("Jesus is not scolding you. He sees how much you carry, and he
says your name with love."). 11:1-4: the Matthew 6 forgiveness-misuse
paragraph word for word. 11:14-28: the Matthew 9/12 illness sentence and the
Matthew 12:43-45 paragraph with its help line ("Please get help again: a
doctor, a pastor, or a crisis line."). 12:1-12: fear of judgment and of the
unforgivable sin (Bunyan; "the fear itself is a sign"). 12:22-34: the site's
help wording word for word, with 988 for the United States. 12:49-53: the
Matthew 10 family-rejection paragraph (police or a crisis line if in danger).
13:1-5: "If you have lost someone to violence, or to an accident or
disaster, this passage does not say they deserved it. Jesus says the
opposite. Grief is not unbelief. If grief is crushing you, do not carry it
alone. Reach out to people you trust, to a pastor, or to someone trained to
help." 13:10-17: illness is illness; "Your worth to God does not rise or fall
with your body." 13:22-30: "not meant to scare anyone into sleepless fear".

### What was run, and what passed (watched)

`validate-bible-notes` (partial, Luke) and `validate-no-emdash` after each
chapter: pass. At the end, all 36 commands of the content-gates step in
ci.yml, one at a time: exit 0 each (validate-bible-notes: 66 introductions,
1,189 chapter notes, 78 chapters in plain words; validate-no-emdash: 260
files, 0 em-dashes; search index 732 entries up to date; passage index 623
files match; verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm
test`: 146 files passed, 7 skipped; 1,659 tests passed, 73 skipped.

Rendered check, after the chapter commits: `pnpm build` (exit 0), served
with `scripts/serve-like-vercel.mjs` on port 4604, and a Playwright script
at 390 wide (deviceScaleFactor 1, `/api/trpc`, `/api/track` and `/_vercel/*`
stubbed) opened `/study/bible/luke/9` to `/13`. Every passage's rendered
heading, its part headings in order and the first 60 characters under each
matched the data: Luke 9, 9 of 9; Luke 10, 7 of 7; Luke 11, 7 of 7; Luke 12,
7 of 7; Luke 13, 6 of 6. No sideways scroll on any, no page errors, no
console errors. Screenshots read: `/home/user/elite-shots/bdoor/lk913-10-390-*.png`
(top, the Good Samaritan, Martha and Mary) and `lk913-13-390-*.png` (top,
13:1-5, 13:10-17). Server stopped by its PID, dist/ deleted, no lh-*.json.
Lighthouse not run (no app code changed).

### Still unverified

Ancient writers' exact words (Jerome, Augustine and the Mishnah all
paraphrased); which manuscripts read seventy and which seventy-two; how far
the Mishnah's rules (Nazir 7:1, Sheviit 9:1, Avot 1:4) show first-century
practice (said each time); the tower's site; the night-watch system.

### Next

Luke 14 onward in plain words, in the same shape.

## Continuation: Luke 14 to 18 (2026-11-19)

Data only: `client/public/bible/notes/luke/plain/14.json` to `18.json`, and
`"plain": true` added at the end of `luke/14.json` to `luke/18.json` with no
other change to those files (each diff is the one closing brace and the new
line). No app code changed.

### Chapters 14 to 18 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Luke 14 | 6 (a man with dropsy, on the Sabbath; take the lowest place; invite those who cannot repay; the great banquet, and "compel them to come in"; hate father and mother? counting the cost; salt that loses its taste) | 4,369 |
| Luke 15 | 5 (the lost sheep; the lost coin, and the woman who searched; a son who left, and came to his senses; the father who ran; the older brother outside the door) | 3,836 |
| Luke 16 | 5 (the shrewd manager; faithful with little, two masters; the Law, the kingdom, and divorce; the rich man and Lazarus; "even if someone rises from the dead") | 4,202 |
| Luke 17 | 7 (millstones, and forgiving seven times; "Increase our faith!"; "We are unworthy servants"; ten lepers; "the kingdom of God is in your midst"; the days of the Son of Man, Noah and Lot; "Remember Lot's wife!", one taken, one left) | 4,396 |
| Luke 18 | 6 (the widow and the unjust judge; the Pharisee and the tax collector; babies brought to Jesus; the rich ruler and the eye of a needle; the third warning; a blind man near Jericho) | 4,452 |
| Total | 29 | 21,255 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. Where
Mark or Matthew already tell an event (salt, the lost sheep, divorce,
millstones, mustard-seed faith, the days of the Son of Man, the children, the
rich ruler, the camel, the third warning, the blind man at Jericho), the note
says so, reuses their checked wording, and spends its words on what Luke does
differently (the soil and the manure pile; "lost" and "until he finds it";
the stone of a mill; the mulberry; Lot and Lot's wife; the disciples'
"Where, Lord?"; babies; "a ruler" and "seeing the man's sadness"; "wife" in
18:29; "as the prophets have written" and the threefold "did not
understand"; one man, approaching). The fuller treatment goes to what only
Luke has: the dropsy healing, the seats and the guest list, the banquet and
14:23, the tower and the king, the lost coin, the two sons, the manager, the
rich man and Lazarus, the unworthy servants, the ten lepers, 17:20-21, the
widow and the judge, and the Pharisee and the tax collector.

### Field order, checked

After each chapter every passage was printed field by field (first 110
characters and word count under each heading) and read: all 29 sit under
their right headings. `validate-bible-notes` passed after each chapter with
no exceptions (`OT_FIELD_KNOWN` stays empty). Its quotation check caught one
quotation that ran across "said Peter" (18:28), split at the speaker as the
BSB splits it, and one forbidden phrase ("do the work", 15:1-7 Old Testament
note), reworded.

### Sources

All in `bdoor-ledger.md` under "The plain notes on Luke 14" to "18". 23 web
searches (5, 5, 5, 5, 3). New sources: Horace, Odes 2.2 and dropsy as a
picture of greed; the Rule of the Congregation (1QSa 2:3-10); Augustine,
Letter 93 to Vincentius (about 408); Pierre Bayle's Philosophical Commentary
(1686); Dignitatis Humanae (1965); the drachma; Gregory the Great, Homily 34
on the lost coin; Sirach 33 on giving property away while alive; carob pods;
Tertullian, On Modesty 8-9, on the older-son-as-Israel reading; the three
readings of the shrewd manager (Derrett, Fitzmyer, Kloppenborg, as
reported); Tyrian purple; Lazarus the only named character; 1 Enoch 22; the
Egyptian tale of Setne and Si-Osire; entos in 17:21; 17:36 in the
manuscripts; the temple warning inscription (1871); achreios; the black
mulberry; Sirach 35 behind 18:7; Didache 8:1; hupōpiazō. Greek facts
(hudrōpikos, anagkazō and parabiazomai, feminine friends in 15:9, eis heauton
elthōn, teknon, ebeblēto, allogenēs, entos, sesōken, achreios, brephē,
hilasthēti and eleēson) are a script over the repository's Greek. Earlier
ledger rows reused for the Pharisees, tax collectors, mammon, the stroke of a
pen, the divorce views, Aretas, Varus, leprosy, the Samaritans, the
millstone, b. Yoma 86b, Hades and Sheol, the camel and the needle, the Jesus
Prayer, the two Jerichos and the honour-and-shame portrait (Bailey and
Aristotle). Scripture is the BSB, checked word for word.

One earlier ledger row was not repeated: the book-page ledger gives the
commission reading of 16:1-9 to "Derrett 1970"; the search gives the
commission reading to Fitzmyer (1964) and the interest reading to Derrett
(1961). The plain note names no scholar, so the page is unaffected.

### Cut or narrowed

Cut: the Damascus Document and the later rabbinic rules on animals in a pit;
Plutarch's Table Talk; Leviticus Rabbah 1:5; the Gospel of Thomas (64, 107);
Bar Ma'yan and Jeremias; the deep note's custom that a buyer inspected a
field before purchase; Gregory on the banquet; Aquinas on compelling
heretics; Letter 185; the dragonnades and the 1685 revocation (not tied by
the search); Jerome to Heliodorus; Kierkegaard; Bonhoeffer; Bach; salt on
soil and manure and mōrainō; Sanders and Dunn on "sinners"; m. Bava Batra
8:7; m. Bava Kamma 7:7; Leviticus Rabbah 13:4; shepherds as a despised
trade; Jeremias's dowry headdress; "wishing the father dead" and every
village ceremony; the sandals of free men; Socinus, Warfield, Levine by
name; Augustine's Quaestiones 2.33 and Jerome's Letter 21 (not confirmed);
bath and cor in litres; Dodd, Fletcher, Bailey's merciful master; the
Qumran "sons of light"; m. Gittin 9:10, Salome, Elephantine; byssus;
4 Maccabees 13:17; Gressmann; Ginae; Hyrcanus and the bones in the temple;
m. Negaim; outside stairs on roofs; the Vulgate, Origen, Tolstoy and C. H.
Roberts on 17:21; Darby, Scofield, Left Behind, MacArthur, Bock; m. Nedarim
3:4; m. Tamid; Bailey's atonement-hour setting; b. Berakhot 28b; Lucian;
Cyril's "rope"; Netzer; Calvin's harmony. Narrowed: dropsy as a picture of
greed ("Some scholars think ... Luke does not say so"); Sirach's date
("about two centuries before Jesus"); the drachma ("about the same as a
Roman denarius, roughly a day's wage"); carob ("most likely"); "Apart from
Abraham" for the only named character; Bayle's argument paraphrased.

### Contested matters, and how they are stated

The seats (not a tactic for honour; humility is not self-hatred). Real meals
or a generous heart (Luke means real tables; eating with friends is not
wrong). Matthew's banquet against Luke's (told more than once, or shaped by
each Gospel; both end with a full house). Verse 33, "give up everything"
(literal for some, a handing-over of everything for many; Acts 5:4). The
ninety-nine "righteous" (irony, or the faithful truly loved). God pictured
as a woman (Father, mother's love, the woman's search; God neither male nor
female). Whether the younger son is truly sorry ("The story does not settle
it"). The atonement and the two sons (below). The shrewd manager (three
readings, each with its strength and its hard question; "Scholars have not
agreed, and these notes do not choose"; what Jesus draws from it is clear:
use money for people). "Forcing his way" (Matthew 11 wording, not settled).
Divorce and remarriage (the Mark 10 views paragraph; "These notes do not
decide between them"). The rich man and Lazarus: parable or account (most
read it as a parable; reasons given both ways); the state of the dead
(conscious between death and resurrection, or asleep until it; the Matthew 7
sentence on final judgment; the creed's resurrection confessed by all); "it
is wise not to build a geography of hell on this story, or to use its fire to
frighten anyone, a child least of all". 17:21 (within you, among you, both;
"Careful scholars hold each view, and these notes do not choose"; not a
divine spark without the King). One taken, one left (the Matthew 24
paragraph; no scheme, no dates). 17:36 (the manuscripts plainly). "Promptly"
in 18:8 (suddenly when it comes; the Bible's own "How long?"). Infant
baptism (both views, no side). "Why do you call Me good?" (two readings).
Selling everything (Clement and Antony; Zacchaeus). The meaning "hidden"
(God, or their own hopes, or both). Leaving or approaching Jericho (the
Matthew 20 explanations, with Luke's placing before Zacchaeus; "These notes
do not choose").

**Luke 14:23, the sentences on the page.** "These words have a dark history,
and it must be told plainly. Augustine, the great North African bishop, at
first held that no one should be forced into the church. Around AD 408, in a
letter to Vincentius, a bishop of the Donatists, a church that had broken
away from the main church in North Africa, he wrote that he had changed his
mind, and he pointed to this verse to defend using the laws of the Roman
empire to press the Donatists back into the church. Later churches went much
further. For centuries ‘compel them to come in’ was quoted to justify
forcing people into the church, by law, by punishment, and by violence."
Then: "That reading is wrong, and this site rejects it. The verse does not
give anyone, church or state, the right to force faith on a single person."
And: "The host has no soldiers. He has one servant, and the servant has
nothing but an invitation. ... The host is pleading, not coercing." With
Bayle (1686), Mark 6:45 and Luke 24:29 on the verb, 9:55, Dignitatis Humanae
(1965) and the Baptist witness, and 2 Corinthians 5:20.

**The older brother, the sentences on the page.** "That reading has fed
contempt for Jewish people, and it is wrong. Everyone in the story is
Jewish, the younger son as much as the older, and so was everyone listening,
the tax collectors and sinners included." Then: "The older brother is not a
picture of the Jewish people. He is anyone who has stayed close to God's
house and grown hard toward those who come home late, and the church should
see itself in him first."

**The two sons and the cross.** "So the story shows plainly that God runs to
meet the sinner who turns home, and that his welcome is free. It is not the
whole of what the New Testament says about the cross. Christians explain the
cross in more than one way (see the note on Mark 10:35-45), and these notes
do not choose among them." The views: the story as the whole gospel (with
Jewish readers' point that the prophets taught the same welcome); a parable
makes one point and Luke says more (22:20; 24:46-47); the cost inside the
story; the teller as the welcome.

**The father's welcome.** The running father from the honour-and-shame
portrait: Bailey's argument marked "a modern parallel, not ancient evidence",
Aristotle's great-souled man paraphrased; the cut-short speech; robe, ring
and sandals as a son's standing (Genesis 41:42); Genesis 33:4.

**The Pharisee and the tax collector.** "Is this parable a verdict on
Pharisees, or on Jews? No. ... That reading is wrong, and it turns the
parable upside down." "The ‘Pharisee’ Jesus warns against is not in
first-century Jerusalem. He is in the listener". The site's sentence "So
‘Pharisee’ is not a word for a hypocrite" word for word, here and at 16:14.

**Money.** 16:1-13 and 16:19-31 hold the book page's line both ways: no
prosperity reading ("The man whom everyone would have called blessed was the
one in danger"; "many times more" is no promise of money), no contempt for
the rich ("Luke's point ... is not that being poor makes anyone good, or that
being rich makes anyone bad"; "the rich man's sin is that Lazarus lay at his
gate").

### Care lines included

14:25-33: the Matthew 10 family-rejection paragraph word for word ("If your
family has rejected you for your faith, you are not alone, and you have not
failed. ... if you are in danger, contact the police or a crisis line."),
with "He asks for first place, not for cruelty" and 1 Timothy 5:8.
14:15-24: "If you were once pushed, shamed or pressured into a religious
decision, that was not the way of Jesus. His invitation still stands, and it
is still an invitation. You are free to come, and free to take your time."
15:20-24: the Matthew 23 line ("If your own father was absent, or hurt you,
this story is not asking you to pretend otherwise. It tells you that you
have a Father in heaven who is not like that."). 15:25-32: the Luke 2 line
word for word, then "This story does not promise that every child will come
home, or say when. ... Keep the door open as far as you safely can, and keep
praying. God has not stopped loving your child, and he has not stopped
loving you." 16:14-18: the Mark 10 safety line word for word, and a word to
the divorced ("this verse is not a door closed in your face"). 16:19-26: no
scaring, a child least of all. 17:1-4: the Matthew 18 abuse paragraph word
for word and the Matthew 6 forgiveness paragraph word for word ("this
prayer" made "this passage"), with "Words alone do not make it safe to
stay." 17:5-6: the Matthew 17 sentences against blaming the sick. 17:7-10:
"‘Unworthy’ here means only that you cannot put God in your debt. It does
not mean you are of no worth to him." 17:31-37: "These words are not given
to make anyone afraid, least of all a child lying awake at night." 18:1-8:
"God is not like him. Your cries are not wearing God out; he hears them.
Keep telling the truth to people who can help: a lawyer, an advocate, the
proper authorities, a pastor you trust. If you are in danger, contact the
police or a crisis line. And if a church failed you, that failure was
theirs, not God's." No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` (partial, Luke) and `validate-no-emdash` after each
chapter: pass. At the end, all 36 commands of the content-gates step in
ci.yml, one at a time: exit 0 each (validate-bible-notes: 66 introductions,
1,189 chapter notes, 83 chapters in plain words; validate-no-emdash: 260
files, 0 em-dashes; search index 732 entries up to date; passage index 623
files match; verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm
test`: 146 files passed, 7 skipped; 1,659 tests passed, 73 skipped.

Rendered check, after the chapter commits: `pnpm build` (exit 0), served
with `scripts/serve-like-vercel.mjs` on port 4605, and a Playwright script
at 390 wide (deviceScaleFactor 1; `/api/trpc`, `/api/track` and `/_vercel/*`
stubbed) opened `/study/bible/luke/14` to `/18`. Every passage's rendered
heading, its part headings in order and the first 60 characters under each
matched the data: Luke 14, 6 of 6; Luke 15, 5 of 5; Luke 16, 5 of 5; Luke
17, 7 of 7; Luke 18, 6 of 6. No sideways scroll on any, no page errors, no
console errors. Screenshots read: `/home/user/elite-shots/bdoor/lk1418-15-390-*.png`
(top, the father who ran, the older brother) and `lk1418-16-390-*.png` (top,
the manager, the rich man and Lazarus). Server stopped by its PID, dist/
deleted, no lh-*.json. Lighthouse not run (no app code changed).

### Still unverified

Ancient and patristic writers' exact words (Augustine, Tertullian, Gregory,
Clement, Athanasius, Sirach, the Didache, 1 Enoch and the Talmud are all
paraphrased); which of Derrett and Fitzmyer first proposed each reading of
the manager beyond the summaries found; the date of the Egyptian tale's
papyri; whether Luke 17:36 was added or dropped.

### Next

Luke 19 onward in plain words, in the same shape.

## Continuation: Luke 19 to 24 (2026-11-19)

Data only: `client/public/bible/notes/luke/plain/19.json` to `24.json`, and
`"plain": true` added at the end of `luke/19.json` to `luke/24.json` with no
other change to those files (each diff is the one closing brace and the new
line). No app code changed. This finishes Luke, and with it all four Gospels.

### Chapters 19 to 24 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Luke 19 | 5 (Zacchaeus; the ten minas; the King comes down the Mount of Olives, and the stones; Jesus weeps over Jerusalem; a house of prayer) | 4,290 |
| Luke 20 | 6 (by what authority; the tenants and the stone; Caesar; sons of the resurrection; David's son and Lord; beware of the show) | 3,556 |
| Luke 21 | 7 (the widow's coins; do not be deceived or alarmed; before kings and governors; Jerusalem surrounded, the times of the Gentiles; lift up your heads; the fig tree and "this generation"; watch and pray) | 3,835 |
| Luke 22 | 10 (Satan enters Judas; the room; the cup, the bread, the cup; the betrayer and who is greatest; "I have prayed for you, Simon"; two swords; the Mount of Olives; the kiss and the healed ear; Peter and the look; the council at daybreak) | 5,536 |
| Luke 23 | 8 (Pilate; Herod; three times innocent, Barabbas; Simon and the daughters of Jerusalem; "Father, forgive them"; the two criminals and Paradise; "into Your hands", the centurion; Joseph and the women) | 4,692 |
| Luke 24 | 6 (the empty tomb and "nonsense"; the road to Emmaus; the breaking of the bread; flesh and bones and fish; to all nations, beginning in Jerusalem; the blessing and the temple) | 3,885 |
| Total | 42 | 25,794 |

Counted by script over `happening`, `hearers`, `ot`, `hard`, `asks`. Where
Mark, Matthew and John already tell an event (the entry, the temple, the
questions in the temple, the discourse, the Supper, the arrest, the denial,
the hearings, Barabbas, the cross, the burial, the empty tomb), the note
points to their notes, reuses their checked wording, and spends its words on
what Luke does differently. The fuller treatment goes to what only Luke has:
Zacchaeus, the nobleman of the minas, the stones and the tears over the city,
"The time is near", "lift up your heads", the heavy heart of 21:34, the
eager desire and the two cups, the quarrel at the table and the
"benefactors", "I have prayed for you, Simon", the two swords, the sleep
"from sorrow", the healed ear, the look, Herod, the daughters of Jerusalem,
"Father, forgive them", the criminal and Paradise, "into Your hands", the
crowds beating their breasts, Joseph who "had not consented", "an idle
tale", Emmaus, the fish, "beginning in Jerusalem", and the blessing.

### Field order, checked

After each chapter every passage was printed field by field (first 110
characters, words and characters under each heading) and read: all 42 sit
under their right headings. `validate-bible-notes` passed after each chapter
with no exceptions (`OT_FIELD_KNOWN` stays empty). Its quotation check
caught quotations that ran across a speaker tag ("I tell you," He answered;
"Lord," said Peter; "Teacher," they inquired; "Why do we need any more
testimony?" they declared; "I beheaded John," Herod said; "Are You not the
Christ?" he said) and a joined quotation of 21:37-38; each was split as the
BSB splits it. It caught one exclamation outside quoted Scripture (24:1-12,
reworded) and one Amos quotation that was not verbatim (now verbatim). One
forbidden phrase was caught by a read-through before the validator ran
("showing up", 23:50-56, reworded). Quotations avoid the em-dashes inside
the BSB text of 19:44, 21:34, 24:31, 24:39 and Hosea 9:7.

### Sources

All in `bdoor-ledger.md` under "The plain notes on Luke 19" to "24". 22 web
searches (7, 1, 4, 5, 3, 3; never more than 8 a chapter). New sources:
Josephus, Antiquities 17.299-314 (the fifty envoys and the eight thousand in
Rome); Tichy (Biblica 2011) on the tense of 19:8; the mina; the sycamore-fig;
Titus's wall (Josephus as summarised); Dominus Flevit; 4 Maccabees 7:19 and
16:25; Antiquities 15.394-395 (Herod's dedicated spoils, the golden vine);
Jewish War 6.420 (97,000 captives in the whole war); the "times of the
Gentiles" readings and failed date-setting; the 22:19b-20 evidence and
Westcott and Hort; Euergetes; 22:43-44 (Justin and Irenaeus); medical
reviews of hematidrosis (used only as "some have suggested"); the 23:34
evidence (Tyndale House); the comma of 23:43 (the New World Translation and
Adventist writers); dikaios at 23:47 (Tyndale Bulletin 2012 as reported);
24:12 and 24:51 in the manuscripts; Cleopas, Clopas and Hegesippus. Greek
facts (architelōnēs, sukophanteō, the present tenses of 19:8, klaiō and
dakruō, episkopē, humas and sou in 22:31-32, hikanon estin, agōnia, hōsei,
paradeisos three times, dikaios, lēros, parabiazomai and anagkazō) are a
script over the repository's Greek. Earlier rows reused: tax collectors,
AD 66 and 70, Titus, the Arch, Herod's temple, Archelaus's removal,
Pilate and the Pilate stone, Antipas, the lepta, the Mishnah's four cups and
capital-trial rules (marked as later), Caiaphas, Giv'at ha-Mivtar, Josephus
on women's testimony, Celsus via Origen, Eusebius on Pella, C. S. Lewis,
Emmaus's sites, Paradise's Persian root, Nostra Aetate.

### Cut or narrowed

Cut: Jericho's balsam and palaces; the Mishnah on tax collectors and on
money tied in a cloth; b. Ketubot 50a; Gaius; Clement on Zacchaeus as
Matthias; Ambrose and Augustine on the sycamore; the Judensonntag,
Bugenhagen and Bach (the name and the link were not confirmed); Simonet's
painting; Josephus's 1,100,000 dead; the wall's length and forts; Jerusalem
as "city of peace"; the Gospel of Thomas; Schweitzer, the Russells, France,
Wright, Bock, Scofield, Jervell, Tannehill by name; Charles Taze Russell and
1914 (verified, left unnamed); the 21:19 variant; Brandon, Hengel, Meggitt,
Unam Sanctam (verified, not needed); Klassen, Borges and the Gospel of
Judas; the RSV's history; Ehrman, Plunkett, Blumell, Harnack, Eubank by
name; Melito, Cohen, Winter, J. T. Sanders, Bond; Theophylact, Bullinger;
b. Berakhot 28b; Abraham's bosom; the "one thief was saved, that none may
despair" saying (attribution not confirmed); the 23:45 eclipse wording;
Bezae's stone for twenty men; Martin, Snodgrass, Parsons; the companion as
Cleopas's wife; Gentile hours and the Sinaiticus hand at 24:51. Narrowed:
"probably held the contract" (Zacchaeus); "many readers think" for the
Archelaus echo, with "Luke does not say so"; "Josephus says" for the wall
built in three days; "built in the 1950s" for Dominus Flevit (1954 and 1955
both given); "in the whole war" for the 97,000; "some later manuscripts" for
the woman caught in adultery after 21:38; Westcott and Hort "judged" the
shorter text original (not "printed"); "seem to have known" for Justin and
Irenaeus; "many Seventh-day Adventists" (no official statement found);
"punish" "most likely" a flogging; "a prayer from the Psalms" (not "learned
as a child").

### Contested matters, and how they are stated

19:8, "I give" (an announcement, so a conversion; or a description of his
habit, so a vindication; "The Greek allows both ... These notes do not
choose"; either way the welcome came first and salvation reaches the purse).
The minas and Matthew's talents; two plots joined or one parable; the harsh
king judged by the servant's own words; the greedy-landowner reading (the
Matthew 25 wording). 19:27: "Verse 27 must be said plainly. It is a line
inside a parable, spoken by a character in a story. It is never a warrant
for violence, and no one may use it to harm anyone." The crowd on Sunday
and Friday ("It is wise not to say more than the Gospel says"). The stones.
19:41-44: the Luke 13 and Matthew 23 sentences word for word ("This is
grief, not a verdict. ..."), the misuse named and rejected, and the dating
question as views. "For all the nations" (two reasons). 20:16:
supersessionism named and rejected, the views pointed to the Matthew 21 note,
Romans 11. Caesar (the Mark 12 three readings and "What all agree on").
Marriage in the resurrection (the Mark 12 views and grief line). Psalm 110's
author (three views). The widow (praise, lament, both). "Not a hair" (two
readings). 21:23-24: "wrath against this people" is not a sentence on a
people; the times of the Gentiles (foreign rule; the age of the Gentile
mission; restoration of Israel; the modern state of Israel "Faithful
Christians differ"; "These notes do not choose"); no scheme, no date, Acts
1:7. 21:25-28 and 21:32 (the Mark 13 readings and wording). 21:36 (two
readings). Judas and God's plan (no side). The Passover date (pointer to
John 13). The Lord's Supper (the Mark 14 views word for word) and 22:19b-20
(the manuscripts plainly; "The meal and its meaning do not hang on one
manuscript"). The swords (three readings, below). 22:43-44 (below). The use
of force (the Matthew 26 views and "All agree"). The Mishnah's trial rules
(later; not certain). Luke's Pilate (memory or shaping). The green and dry
tree (three readings). 23:34 (below). 23:43 (below). The centurion's
"righteous" (innocent; the Righteous One; complementary). Trust or
abandonment ("The Gospels give both cries"). 24:12 and 24:51 in the
manuscripts. "Moses and all the Prophets" (prophecy, patterns, the whole
story; "These notes do not choose"; Jewish readers "read them faithfully"
and must never be spoken of with contempt). The breaking of the bread (the
Supper; an ordinary meal; both). The bodily resurrection (the creeds' event;
visions and faith-language readings named). Luke 24 and Acts 1 on the timing
of the ascension (compressed; two purposes).

**The two swords, the sentences on the page (22:35-38, "The hard
verse").** "Was Jesus arming his disciples? Readers take verse 36 in three
main ways." The three readings follow: a plain word about the road ahead;
a vivid figure of speech, with "That is enough" as "a sad end to a
conversation they have not understood"; and the swords tied to "He was
numbered with the transgressors", with verse 52. Then: "These readings can
overlap, and careful readers hold each one. What no reading allows is to
make this verse a warrant for violence. A few hours later one of the
disciples used a sword. Jesus said, “No more of this!” And he “touched the
man’s ear and healed him” (verse 51). Jesus refused to be defended by
violence, and he healed rather than harmed." No statement is made about
weapons or any modern law or policy.

**22:43-44.** "These two verses are missing from some of the oldest copies
of Luke, including a papyrus called P75, copied around AD 200, and Codex
Vaticanus from the 300s. They are present in Codex Sinaiticus as first
written, in Codex Bezae, and in most later copies ... Many modern Bibles
print them with a note or in brackets." "Like" drops of blood: "Some have
suggested a rare condition, described by doctors ... Luke does not say
that, and his word ‘like’ leaves the question open."

**23:34, the sentences on the page.** The manuscripts in the book page's
words ("missing from some of the oldest copies of Luke, including a papyrus
called P75, copied around AD 200, Codex Vaticanus from the 300s, and Codex
Bezae as first written. It is present in Codex Sinaiticus as first written
and in most later copies. Scholars are divided ..."). Who "them" is (the
soldiers; the leaders and people, with Acts 3:17; all sinners; "These notes
do not choose"). Then: "One thing is plain, whichever reading is taken. If
this prayer is Jesus' own, then no one may use his death to justify hatred
of anyone. The one who died prayed for those who killed him. Anyone who uses
the cross to stir up contempt for Jews, or for any people, is standing
against the prayer of the crucified Lord."

**"Christ-killers" (23:13-25).** Pointed to the Matthew 27 and John 19
notes, then: "Here it is said again, plainly: the Jewish people, then or
now, are not guilty of Jesus' death, and this site rejects that charge."

**23:43, the comma.** The New World Translation's reading and many Seventh-day
Adventists' stated as theirs, with their reasons (the sleep of the dead,
John 20:17); the majority reading with its reasons; "paradise need not mean
the same as Jesus going up to the Father"; the creeds' final hope. No scorn.

### Care lines included

19:1-10: "If you carry shame about money ... The welcome comes first. Then
the repair follows, and it is real: it reaches the people who were wronged."
19:41-44: "If you are grieving someone who has walked away, he wept too."
20:27-40: the Mark 12 grief line word for word ("For anyone grieving a
husband or wife ..."). 21:5-11: the Matthew 24 frightened-reader line ("If
the news frightens you, or you were taught as a child to dread the end of
the world ..."). 21:12-19: the Mark 13 family-betrayal paragraph word for
word, with "If you are in danger, contact the police or a crisis line."
21:34-38: the Luke 17 line word for word ("These words are not given to make
anyone afraid, least of all a child lying awake at night."). 22:31-34, for
the reader who has failed: "Your failure has not surprised him, and it has
not cancelled his prayer. Turn back." 22:39-46: the Mark 14 Gethsemane
paragraph word for word ("This passage also speaks to anyone who has known
sorrow so heavy it felt like dying. ... If you have thought of ending your
life, please reach out today to a crisis line or emergency service where you
live."), after Mark 14:34. 22:54-62: "Ask whether there is a failure you
have stopped believing God could forgive." 23:32-38: "Forgiving does not
mean saying the wrong was right, and it does not mean staying where you are
in danger." 23:39-43: "If you think it is too late for you, this story is
for you. ... But do not read it as a reason to put off turning to God. Only
one of the two criminals turned. ... No one is promised the time or the
clear mind to turn at the end. The day to answer is today." 23:44-49: the
Mark 15 forsaken line ("If you feel forsaken by God, you can pray as he did,
and you should not stay alone with it. Tell someone you trust, and if you
are in danger, reach out for help today."). 24:13-27, for the reader walking
away disappointed: "If you are walking away disappointed, with ‘we had
hoped’ in your mouth, this story is for you. ... He did not scold them for
their sadness". 24:36-43: "If you doubt, you are in good company." No phone
number is given.

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each chapter: pass. At
the end, all 36 commands of the content-gates step in ci.yml, one at a time:
exit 0 each (validate-bible-notes: 66 introductions, 1,189 chapter notes, 89
chapters in plain words; validate-no-emdash: 260 files, 0 em-dashes; search
index 732 entries up to date; passage index 623 files match; verify-sources
22 texts intact). `pnpm check`: exit 0. `pnpm test`: 146 files passed, 7
skipped; 1,659 tests passed, 73 skipped.

Rendered check, after the chapter commits: `pnpm build` (exit 0), served
with `scripts/serve-like-vercel.mjs` on port 4606, and a Playwright script
at 390 wide (deviceScaleFactor 1; `/api/trpc`, `/api/track` and `/_vercel/*`
stubbed) opened `/study/bible/luke/19` to `/24`. Every passage's rendered
heading, its part headings in order and the first 60 characters under each
matched the data: Luke 19, 5 of 5; Luke 20, 6 of 6; Luke 21, 7 of 7; Luke
22, 10 of 10; Luke 23, 8 of 8; Luke 24, 6 of 6. No sideways scroll on any,
no page errors, no console errors. Screenshots read:
`/home/user/elite-shots/bdoor/lk1924-23-390-*.png` (top, "Father, forgive
them", the criminals and Paradise) and `lk1924-24-390-*.png` (top, the
empty tomb, Emmaus). Server stopped by its PID, dist/ deleted, no lh-*.json.
Lighthouse not run (no app code changed).

### Still unverified

Ancient writers' exact words (Josephus, Eusebius, Hegesippus, 4 Maccabees,
Justin, Irenaeus, Origen are paraphrased); which hand of Sinaiticus lacks
the words of 24:51; whether P75 has 24:51b (stated only as "most
manuscripts"); the exact length of Titus's wall; an official Seventh-day
Adventist statement on 23:43.

### The whole book, and the four Gospels (counted by script)

Luke 1 to 24: 24 chapters, 160 passages, 99,967 plain words. Mark: 16
chapters, 95 passages, 44,581 words. Matthew: 28 chapters, 167 passages,
103,646 words. John: 21 chapters, 123 passages, 77,812 words. The four
Gospels together: 89 chapters, 545 passages, 326,006 plain words.

### Next

Luke is finished, and so are the four Gospels. Nothing was stopped early.

## Genesis: book page and chapters 1 to 3 (2026-11-19)

The first Old Testament book in this work.

### The code change: the third part, named for its testament

A Gospel passage's third part is "The Old Testament behind it" (field `ot`).
That cannot be right for Genesis. An Old Testament passage now carries its
third part in a new optional field, `later`, shown as "Where the Bible takes
this up" (later Old Testament and New Testament use of the passage), in the
same third place, with its own icon. `PlainPassages.tsx` draws a part only
when its field is present, so the 89 Gospel chapters render exactly as before.

`validate-bible-notes.mjs`: a New Testament passage may not have `later` and
keeps its old strict check (`ot` must name an Old Testament book, the Law,
the Prophets, the Psalms or Scripture; `OT_FIELD_KNOWN` still empty). An Old
Testament passage may not have `ot`; its `later` must name at least one book
of the Bible other than its own, and "What it asks" may not be the only
field that does. Tried by hand: a `later` field put into Mark 1 fails.

Two small changes to the book page for a book that is not a Gospel:
`BookTeaching.tsx` shows the shared Gospel "Go deeper" list (how to read the
Gospels, the parables, the Pharisees, the Herods, the New Testament's text)
only on the four Gospels; other books keep only "How to study the Bible" and
their own pages. And a guide may carry `mapNote`, one line above its map for
what the drawing cannot show (checked as prose by the validator).

Tests (`teaching.test.tsx`, 22 now): Mark 1 renders its old part names in
the old order and no new heading; a synthetic Old Testament passage renders
"Where the Bible takes this up" third; every plain file uses its own
testament's field; the four Gospels keep the whole shared Go deeper list and
no map line; Genesis's guide, map, and Genesis 1 to 3 rendered from the real
files with the new name third in every passage.

### The map

`BookMap.tsx` has a fixed frame (34.45 to 36.30 east, 31.60 to 33.68 north,
drawn for the land of Jesus' day). It cannot take a wider frame as data, and
it was not redesigned. Hebron (31.53) and Beersheba (31.24) fall below its
edge, so the brief's own list could not all be drawn. Genesis's map shows
eight places inside the frame: Dothan, Shechem, Bethel, Bethlehem, and four
regions placed roughly (Moriah, said to be uncertain and drawn at Jerusalem
after 2 Chronicles 3:1; the plain of the Jordan, with Sodom's site said to be
unknown; Peniel by the Jabbok; Gilead). The line above the map: "This map is
drawn for the middle of the land. Hebron and Mamre, Beersheba and the Negev,
where Abraham and Isaac spent many years, lie just south of its edge. Ur and
Haran to the north-east, and Egypt to the south-west, lie far beyond it." A
wider map, with Mesopotamia, Canaan and Egypt, is needed for Genesis and for
Exodus; that is for the lead to decide.

### The book page (`/study/bible/genesis`, same address)

Data only, in `client/public/bible/notes/genesis/intro.json`, field
`teaching`, added at the end of the file in its own layout (the diff adds
lines and changes only the closing brace). Thirteen parts: Genesis in a
minute; The first book of the Torah; Who wrote it, and how we know; When,
and for whom; How Genesis is built; What kind of writing it is; Genesis and
its neighbors; The big themes; The covenants with Noah and Abraham; The
world of Abraham's family; When did the patriarchs live?; How the New
Testament reads Genesis; How Jews and Christians have read it. Then 13 hard
passages (1:1, 1:26, 2:4, 3:15, 4:17, 6:1-4, 6:6, 9:20-27, 11:1-9, 19, 22,
34, 38), 13 key words, a timeline of 19 entries (the story's entries
relative; dates only where a date is honestly statable), the map, and six
Go deeper pages (the Genesis 1 answer, the Old Testament world portrait and
the four guides).

Words: 5,518 in the thirteen parts; 1,304 in the lists, timeline and map.

Authorship, the sentences on the page: "Genesis never names its author. No
verse says who wrote it." ... "Christians who confess the Bible as God's
word hold more than one of these views. These notes do not settle the
question, and the book's authority does not hang on knowing the writer's
name."

"The curse of Ham", the sentences on the page: "Yet for centuries this
passage was twisted. From about the fifteenth century the curse was moved
from Canaan to Ham and tied to Black Africans. Many writers and preachers
used this so-called ‘curse of Ham’ to claim that God had made Africans to be
slaves. In America it was preached from pulpits to defend slavery and,
later, segregation. This teaching is false and evil. These notes name it and
reject it. The text curses Canaan, not Ham, and it says nothing about Africa
or about race."

### Chapters 1 to 3 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Genesis 1 | 5 (in the beginning, God; days one to three: God makes room; days four to six: God fills what he made; male and female, in God's image; food for all, and ‘very good’) | 3,120 |
| Genesis 2 | 4 (the seventh day: God rests; dust and breath; a garden, a task, and one command; a helper, and one flesh) | 2,724 |
| Genesis 3 | 5 (‘Did God really say?’; ‘Where are you?’; the serpent and the woman's seed; pain, rule, toil and dust; garments of skin, and the guarded way) | 3,590 |
| Total | 14 | 9,434 |

After each chapter every passage was printed field by field and read: all
14 sit under their right headings. `"plain": true` was added at the end of
`genesis/1.json` to `3.json` with no other change.

3:16, the sentences on the page: "‘He will rule over you’ must be read
carefully. It describes what sin will do to the relationship between men
and women. It is part of the curse, not a command." ... "This verse has been
used to excuse the domination and abuse of women ... That is a terrible
misuse of Scripture." Then the Mark 10 safety wording, word for word.

### Sources

All in `bdoor-ledger.md` under "Genesis's book page" and "The plain notes on
Genesis 1" to "3". 21 web searches: 16 for the book page, then 1, 1 and 3.
Main sources: Astruc (1753); Wellhausen (1878, 1883); Van Seters (1975),
Schmid, Rendtorff (1977); Cassuto (Hebrew 1941, English 1961); P. J.
Wiseman (1936); Atrahasis (copy about 1650 BC); Gilgamesh XI and George
Smith (3 December 1872); Woolley at Ur (1922 to 1934); the Laws of
Hammurabi 144 to 147; the Nuzi debate (Selman; Thompson 1974); the 2013 Tel
Aviv camel study; Albright and Kitchen (BAR 1995); Goldenberg (2003) and
reviews on the "curse of Ham"; Ibn Ezra and Nahmanides; the sons of God
readings; the Sodom sites; Rosh Hashanah; the Septuagint's date; Tell
Fekheriye (1979); Wenham (1986); Wisdom 2:24; Irenaeus, Against Heresies
5.21; Western and Orthodox accounts of original sin. Earlier rows reused
from the world portrait's ledger (exile, Cyrus, Merneptah) and the site's
guides and Honest Answer. Hebrew counts (berit 27 in Genesis; bara 53;
tselem 17; ezer 21; tsela 31; toledot 13 in Genesis) and shared Hebrew words
are a script over the repository's Strong's numbers.

### Cut or narrowed

Cut: the Mari donkey covenant; the count of Genesis copies among the Dead
Sea Scrolls (its timeline entry); Genesis Rabbah, Rashi, Ramban and the
synagogue's yearly cycle; Lambert's date for Enuma Elish; the Sumerian King
List; Adapa; the Timna snake; Kramer's rib pun; the king's garden as a sign
of power; every scholar in the deep notes not checked this run. Narrowed:
Eden "usually explained as ‘delight’ or as ‘a well-watered place’"; the
Wisdom of Solomon "which many read as" the first link to the devil; Wenham
"has argued"; camels "the debate goes on"; Moriah "uncertain"; Sodom "not
known".

### Contested matters, and how they are stated

Authorship and date (tradition, the text's clues, the documentary hypothesis
and later models, conservative replies; no side). The setting (Israel
leaving Egypt; the exile; "These notes do not choose"). The days, the age of
the earth and evolution: the six readings as the Honest Answer gives them,
"Christians differ, and these notes do not settle it", and what all confess.
A historical Adam: the same words, pointed to the answer. Genesis and its
neighbors (borrowing, shared memory, a shared language; "These notes do not
choose"). The Nuzi parallels (with caution). The patriarchs' dates (no
side). ‘Us’ in 1:26 (three readings). Light before the sun (three answers).
The two creation accounts (views). Roles in marriage and church
(complementarian and egalitarian, "Christians differ ... and these notes do
not settle it"; no reading may belittle women). The knowledge of good and
evil (readings). Original sin (Western and Eastern). 3:15 (the first gospel
reading and the plainer reading, held together, no choice). ‘Desire’ in 3:16
(two readings). The death threatened in 2:17 and death entering the world
(three views, no side). The garments as sacrifice ("The text does not say
so").

### Care lines included

1:26-28: male and female equally in God's image; rule is not a licence to
destroy. 2:18-25: single, widowed, divorced and same-sex-attracted readers
("you are made in God's image like every other reader, and the church owes
you love and a place at the table, never contempt"), the historic teaching on
marriage not denied, "not every question people bring to this passage can be
settled here". 3:1-7: no reading blames Eve more than Adam (Romans 5:12
names Adam). 3:16-19: the Mark 10 safety wording word for word; childbirth
pain, miscarriage and childlessness not a personal punishment. No phone
number is given.

### What was run, and what passed (watched)

`validate-bible-notes` after each piece: pass. At the end, all 36 commands
of the content-gates step in ci.yml, one at a time: exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 92 chapters in
plain words; validate-no-emdash: 260 files, 0 em-dashes; search index 732
entries up to date; passage index 623 files match; verify-sources 22 texts
intact). `pnpm check`: exit 0. `pnpm test`: 146 files passed, 7 skipped;
1,668 tests passed, 73 skipped. ESLint on the changed code and test files:
clean. `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,028
pages), `pnpm run audit:canonicals`: exit 0 each.

Served with `scripts/serve-like-vercel.mjs` on port 4606; Playwright with
`/api/trpc`, `/api/track` and `/_vercel/*` stubbed. `/study/bible/genesis`
at 390 and 1440, day and night: 18 contents entries, no sideways scroll, no
page errors, the map line shown, no Gospel Go deeper pages. The first look
found the Jabbok name running off the drawing and over "Beyond the Jordan",
and Shechem's name on a mark; the data's names and label positions were
changed (Peniel, Bethlehem, Shechem), the file copied into the served build
and the server restarted by its PID (it caches gzipped files); a script then
found no name over another name, over a mark, or outside the drawing, at
both widths, day and night. The build was not rerun for this data-only fix;
the validator, the teaching tests and the gates above cover the file.
`/study/bible/genesis/1` to `/3` at 390 and 1440: every passage heading, its
part headings in order and the first 60 characters under each matched the
data (5 of 5, 4 of 4, 5 of 5 at each width), and the third part reads
"Where the Bible takes this up" in every passage. `/study/bible/mark/1`,
`/matthew/5`, `/john/3`, `/luke/15` at 390: every passage matched its data
(9, 9, 5, 5), the third part reads "The Old Testament behind it" (one Mark 1
passage has no `ot`, as before, so its third part is "What it asks"), and
the new name appears nowhere. Screenshots: `/home/user/elite-shots/bdoor/gn-*`
and `gn1-*` to `gn3-*`. Lighthouse not run (the code change adds one optional
part to an already lazy chunk and one line above a lazy map). Server stopped
by PID, dist/ deleted, no lh-*.json.

### Still unverified

Ancient texts' exact words (all paraphrased); Schmid's year; the Septuagint
date beyond "the early third century BC"; whether all 29 other uses of tsela
mean a side (said "usually"); the claim that most modern Bibles read
Romans 5:12 as "because all sinned" (the BSB does; others not checked).

### Next

Genesis 4 onward in plain words, in the same shape. A wider map frame for
Genesis and Exodus waits on the lead.

## Continuation: Genesis 4 to 11 (2026-11-19)

Eight chapters in plain words, in the shape of Genesis 1 to 3: each
passage's third part is `later` ("Where the Bible takes this up"), never
`ot`; each chapter note gained only `"plain": true` at its end (the diff
changes its closing lines and nothing else). After each chapter every
passage was printed field by field and read: every text sits under its
right heading, and `validate-bible-notes` passed with no exception.

### Chapters 4 to 11 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Genesis 4 | 4 (two brothers, two offerings; ‘Am I my brother's keeper?’; Cain's city, and Lamech's boast; Seth, and calling on the LORD) | 2,726 |
| Genesis 5 | 4 (in God's likeness, and in Adam's; ‘And then he died’; Enoch walked with God; Methuselah, and a son named for comfort) | 2,249 |
| Genesis 6 | 4 (the sons of God and the daughters of men; God's grief, and one man's favor; a world full of violence; build an ark) | 2,640 |
| Genesis 7 | 3 (‘Go into the ark’; the deep breaks open, and God shuts the door; the waters rise) | 1,868 |
| Genesis 8 | 4 (God remembered Noah; the raven and the dove; out of the ark; an altar, and a promise) | 1,934 |
| Genesis 9 | 4 (blessing again, and the worth of a life; the covenant and the bow in the clouds; Noah's shame, covered; Canaan cursed, and the death of Noah) | 2,592 |
| Genesis 10 | 3 (the sons of Japheth; the sons of Ham, Nimrod, and Canaan; the sons of Shem, and one family of nations) | 1,604 |
| Genesis 11 | 4 (‘Let us make a name for ourselves’; the LORD comes down; from Shem to Abram; Terah's family, and Sarai's barrenness) | 2,165 |
| Total | 30 | 17,778 |

### Sources

All in `bdoor-ledger.md` under "The plain notes on Genesis 4" to "11". 21
web searches (3, 4, 2, 2, 2, 3, 2, 3). Main sources: the Latter-day Saint
and Protestant history of the "mark of Cain" (Wikipedia's two articles;
Young's 1852 speech); the Septuagint of 4:24 and Matthew 18:22; Jubilees
4:9; the Sumerian King List (eight kings, 241,200 years); the Hebrew,
Greek and Samaritan totals for Genesis 5; Ussher (1650); Jude and 1 Enoch
1:9; the Targums and Symmachus on "sons of God"; Gilgamesh's cube-shaped
boat, Mount Nimush and the birds; Woolley's flood layer (1929) and its
retraction; Whitcomb and Morris (1961); Ararat and Urartu; Sanhedrin 70a
(what Ham did) and 56a (the seven laws of Noah); views on 9:6 and the death
penalty; the Table of Nations' identifications; seventy and seventy-two;
Etemenanki; Enuma Elish tablet VI; Bab-ili. Earlier rows reused: the book
page's sons of God, Atrahasis, Gilgamesh, Ur, the exile dates and the
"curse of Ham". Hebrew word facts are a script over the repository's
Strong's numbers.

### Cut or narrowed

Cut: the deep notes' apkallu and iron date (chapter 4); a Mesopotamian
threshold demon behind 4:7; the Nephilim's derivation from ‘to fall’; the
Septuagint's ‘giants’; 1 Enoch named as the source of the angel reading;
the gods gathering "like flies" at Utnapishtim's sacrifice (not found);
the olive branch as a symbol of peace because of this story; sailors
releasing birds; a northern Ur; the Catholic Catechism's 2018 wording on
the death penalty (not retrieved). Narrowed: Gilgamesh's boat "usually
read as a cube"; Gomer "usually linked" with the Cimmerians; Eber and
‘Hebrew’ "may ... not certain"; Babel "was understood as" Bab-ili;
Woolley's retraction (one secondary source) said simply; the Septuagint
total "more than 2,200" (2,242 or 2,262 by a variant).

### Contested matters, and how they are stated

Why God accepted Abel's offering (the text does not say; four readings,
more than one may be true). Cain's wife (as the book page has it: 5:4,
Jubilees, the later law, and the wider-population and representative
readings; "The text says what it says (5:4) and leaves the rest
unexplained"). The long ages (ordinary years; symbolic or honorific
numbers; the form of ancient king lists) and dating creation from the
list: "Christians differ, and these notes do not settle it." The three
text traditions' totals, stated plainly. The sons of God (angels, Seth's
line, rulers: "These notes take no side"). The 120 years (two readings).
God's regret (human terms; a personal God who responds; both, with 1
Samuel 15 holding both). The two animal counts (fuller detail; two woven
accounts: "These notes do not choose"). The death penalty and 9:6 (a
lasting mandate; a description; a principle: "Christians differ, and
these notes do not settle it"). What Ham did (the plain reading; a worse
act, without detail; Canaan involved). Why Canaan is cursed (three
readings). Seventy and Luke 10:1 ("These notes do not decide"). The sin
of Babel (four readings that fit together) and the origin of languages
("Christians differ on how to read it, and these notes do not settle
it"). Pentecost as Babel reversed, the dove at Jesus' baptism and the
ark's door, each said to be a reading the New Testament does not draw.

The flood's extent, the sentences on the page (7:17-24): "Did the flood
cover the whole globe, or a region? Christians have read it in more than
one way." ... "Christians differ, and these notes do not settle it. On
every reading the chapter teaches the same thing: God judges evil, he does
not forget his own, and he keeps life alive through judgment."

The mark of Cain, the sentence on the page (4:8-16): "In
nineteenth-century America some churches taught that Cain's mark was black
skin and used that claim to defend slavery and to keep Black people out of
church office; that teaching is false and evil, and these notes reject
it."

The "curse of Ham" (9:24-29): the book page's paragraph word for word,
from "Yet for centuries this passage was twisted" to "it says nothing
about Africa or about race" (checked by script).

### Care lines included

4:8-16: anyone carrying guilt for harm done (God still speaks to Cain and
protects him; tell the truth to God and someone you trust; make it right
where possible and safe; 1 John 1:9), and anyone bereaved by violence (God
hears the blood; the Matthew 2 line on not carrying it alone, a pastor or
grief counsellor, a crisis line or emergency service). 5:25-32: the
grieving. 6:9-13: a frightened younger reader (God's own promise in 9:11,
talk with a parent), and anyone who has lived through a disaster (not a
judgment on you; Luke 13:4-5 in the BSB, the Honest Answer's point; Find
Help). 7:11-16: the deaths not made small; the same two readers. 9:8-17:
the promise is not a promise that no one will suffer a flood; Find Help.
9:24-29: anyone who has heard the passage used against them. 11:27-32:
the Luke 1 childlessness lines word for word. No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each chapter: pass.
At the end, all 36 commands of the content-gates step in ci.yml, one at a
time: exit 0 each (validate-bible-notes: 66 introductions, 1,189 chapter
notes, 100 chapters in plain words; validate-no-emdash: 260 files, 0
em-dashes; search index 732 entries up to date; passage index 623 files
match; verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`:
146 files passed, 7 skipped; 1,668 tests passed, 73 skipped. `pnpm build`:
exit 0 (after the chapter commits).

Served with `scripts/serve-like-vercel.mjs` on port 4601; Playwright at 390
wide, deviceScaleFactor 1, with `/api/trpc`, `/api/track` and `/_vercel/*`
stubbed. `/study/bible/genesis/4` to `/11`: every passage's heading, its
part headings in order and the first 60 characters under each matched the
data (4, 4, 4, 3, 4, 4, 3, 4 of the same), the third part reads "Where the
Bible takes this up" in every passage, no sideways scroll, no page errors
and no console errors. `/study/bible/mark/1` unchanged (9 of 9, "The Old
Testament behind it"). Screenshots of every passage of Genesis 6 and 9 read
by eye: `/home/user/elite-shots/bdoor/gn6-390-*` and `gn9-390-*`. Server
stopped by its PID, dist/ deleted, no lh-*.json. Lighthouse not run (data
only, no code change).

### Still unverified

Ancient texts' exact words (all paraphrased); Woolley's retraction (one
secondary source); Eber and ‘Hebrew’ (said to be uncertain); the
traditional count of seventy names (taken from the sources, not recounted).

### Next

Genesis 12 onward in plain words, in the same shape.

## Continuation: Genesis 12 to 18 (2026-11-19)

Seven chapters in plain words, in the shape of Genesis 1 to 11: each
passage's third part is `later` ("Where the Bible takes this up"), never
`ot`; each chapter note gained only `"plain": true` at its end (the diff
changes its closing lines and nothing else). After each chapter every
passage was printed field by field and read: every text sits under its
right heading, and `validate-bible-notes` passed with no exception (it
caught two misquotations from memory in Genesis 13, corrected to the BSB
before the commit).

### Chapters 12 to 18 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Genesis 12 | 3 (‘Leave your country’: the call and the promise; Abram goes, and the land is promised; Abram and Sarai in Egypt) | 2,288 |
| Genesis 13 | 3 (back to the altar; Lot chooses the well-watered plain; ‘Lift up your eyes’) | 1,306 |
| Genesis 14 | 4 (four kings against five; Abram goes after Lot; Melchizedek, king of Salem; ‘Not even a thread’) | 2,018 |
| Genesis 15 | 4 (count the stars; ‘How can I know?’; four hundred years, and the Amorites; the fire passes between the pieces) | 2,294 |
| Genesis 16 | 3 (Sarai's plan, and Hagar; the angel finds Hagar; ‘The God who sees me’) | 2,154 |
| Genesis 17 | 4 (Abram becomes Abraham; the sign of the covenant; Sarah, and Abraham laughs; that very day) | 1,861 |
| Genesis 18 | 4 (three visitors at Mamre; Sarah laughs; ‘Shall I hide from Abraham what I am about to do?’; Abraham pleads for Sodom) | 2,297 |
| Total | 25 | 14,218 |

### Sources

All in `bdoor-ledger.md` under "The plain notes on Genesis 12" to "18".
15 web searches (3, 0, 3, 2, 3, 2, 2). Main sources: Genesis 12:3 in
Christian Zionist argument and its critics; Khnumhotep II's Beni Hasan
painting (Kamrin 2009); per-aa ‘great house’; the four kings' proposed
identifications and their limited acceptance; Melchizedek as Shem
(Nedarim 32b, Targum Pseudo-Jonathan) and 11QMelchizedek; the Sefire
treaty's cut calf; Trent (1547) and the Catholic and Protestant readings
of ‘reckoned’; El Roi; Hagar in Islam (Safa and Marwa, Zamzam); Delores
S. Williams, Sisters in the Wilderness (1993); Ankhmahor's circumcision
relief at Saqqara; Josephus on the Arabs at thirteen; Mamre at Ramat
el-Khalil (Herod; Constantine); Rublev's Trinity. Earlier rows reused:
Hammurabi 144 to 147, the Nuzi caution, the camel study, Ur and Haran,
Sodom's site, Jeremiah 34:18. Site wording reused word for word: the Mark
10 safety line; the Luke 1 childlessness care lines; the genocide
answer's two sentences on the Amorites; the Honest Answer's "God did not
rebuke the question. He let Abraham press it again and again."

### Cut or narrowed

Cut: the Execration Texts and Khu-Sebek naming Shechem; Papyrus Anastasi
VI; Pharaoh's gifts as a bride-price; the Speiser and Greengus Nuzi
argument; the Mari donkey and the Ashur-nirari V lamb's head (not
confirmed); "usually the weaker party walked between the pieces"; the
Old Assyrian surrogacy contract; women kept apart from male guests;
market bargaining; Rohl's Amar-Sin. Narrowed: the four kings
("suggestions, not proofs"); Salem "usually identified" with Jerusalem;
Hagar "one of very few people in the Bible who give God a name, and many
readers say she is the only one" (agreeing with the verse note); the
Saqqara relief "from the 2300s BC"; Rublev "early fifteenth century";
Augustine and Nachmanides on Abram unnamed ("some old readers"; "many
readers, Jewish and Christian, old and new").

### Contested matters, and how they are stated

12:3 "be blessed" or "bless themselves" (two readings; both say the
choice is for the whole world). "I will curse those who curse you"
(applied by some to nations and the modern state; others: a promise to
Abram, not a rule for any government). The land promise (12:4-9, with
pointers from 13:14-18 and 15:17-21): what the text promises, how Hebrews
and Romans take it up, and three Christian readings, "These notes take no
side." The kings of chapter 14 (late creation or older source).
Melchizedek (a real king; Shem; the Qumran figure; the Son; Hebrews'
‘like the Son of God’ read as a picture). The tithe (a lasting pattern or
no New Testament command; "These notes do not settle it."). 15:6 and
‘credited’ (Protestant and Catholic readings, and Paul and James, "These
notes do not settle it."). The conquest behind 15:16 (the genocide
answer's wording; the Honest Answer named). God passing between the
pieces as a picture of the cross, "a Christian reading of the pattern".
"Return and submit" (three readings, "The text does not answer every
question"). Infant and believer baptism ("These notes take no side.").
Who the three visitors were, including the Trinity reading ("These notes
take no side among these readings."). Whether Abraham changed God's mind
("These notes do not settle it.").

The land promise, the sentences on the page (12:4-9): "Christians read the
land promise in more than one way." ... "These notes take no side." and
"These notes make no claim about any modern state, border or conflict.
Nothing here is said against any people, ancient or modern: not the
Canaanites, not the Jewish people, not the Arab peoples, not anyone who
lives in that land today. On every reading the land was God's gift, never
something earned or seized." 12:1-3 also says: "These notes make no claim
about any modern state, border or conflict."

Hagar, "return and submit" (16:7-12): "This is one of the hardest lines in
Genesis, and it should not be softened." ... "This verse is not a command
for anyone today to go back to a person who is hurting them. It was a word
to one woman, in one desert, about one unborn child. No one should use it
to send a wife, a child, a worker or anyone else back to harm." Then the
Mark 10 safety line word for word, and a line for harm at home, work or
church with Find Help.

### Care lines included

12:10-20: anyone put at risk by someone who should have protected them
("What was done to you was wrong, and it was not your fault"; Find Help).
16:7-12: the safety line above. 18:9-15: the Luke 1 childlessness lines
word for word. 15:12-16: the conquest faced with the site's own answer.
No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each chapter: pass.
At the end, all 36 commands of the content-gates step in ci.yml, one at a
time: exit 0 each (validate-bible-notes: 66 introductions, 1,189 chapter
notes, 107 chapters in plain words; validate-no-emdash: 260 files, 0
em-dashes; search index 732 entries up to date; passage index 623 files
match; verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`:
146 files passed, 7 skipped; 1,668 tests passed, 73 skipped. `pnpm build`:
exit 0 (after the chapter commits).

Served with `scripts/serve-like-vercel.mjs` on port 4602; Playwright at 390
wide, deviceScaleFactor 1, with `/api/trpc`, `/api/track` and `/_vercel/*`
stubbed. `/study/bible/genesis/12` to `/18`: every passage's heading, its
part headings in order and the first 60 characters under each matched the
data (3, 3, 4, 4, 3, 4, 4 of the same), the third part reads "Where the
Bible takes this up" in every passage, no sideways scroll, no page errors
and no console errors. Screenshots of every passage of Genesis 12 and 16
read by eye: `/home/user/elite-shots/bdoor/gn12-390-*` and `gn16-390-*`
(the fixed masthead appears once mid-image where the element screenshot
scrolls; not on the page itself). Server stopped by its PID, dist/
deleted, no lh-*.json. Lighthouse not run (data only, no code change).

### Still unverified

Ancient texts' exact words (all paraphrased); Islamic tradition
summarised from secondary sources; El Shaddai's meaning (said to be
uncertain).

### Next

Genesis 19 onward in plain words, in the same shape.

## Continuation: Genesis 19 to 25 (2026-11-19)

Seven chapters in plain words, in the shape of Genesis 1 to 18: each
passage's third part is `later` ("Where the Bible takes this up"), never
`ot`; each chapter note gained only `"plain": true` at its end (the diff
changes its closing lines and nothing else). After each chapter every
passage was printed field by field and read: every text sits under its
right heading, and `validate-bible-notes` passed with no exception (it
caught three quotations not word for word, in 20:8, 24:12 and the first
draft of Hebrews 12:16, corrected to the BSB before each commit).

### Chapters 19 to 25 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Genesis 19 | 5 (Lot takes two strangers into his house; the men of the city at the door; ‘Get out of this place’; fire, salt and smoke; Lot's daughters, Moab and Ammon) | 3,511 |
| Genesis 20 | 3 (‘She is my sister’, again; ‘What have you done to us?’; Sarah restored, and a prayer that heals) | 1,731 |
| Genesis 21 | 4 (Isaac is born, and Sarah laughs; ‘Expel the slave woman and her son’; God hears the boy; a well, an oath and a tree at Beersheba) | 2,602 |
| Genesis 22 | 5 (‘God tested Abraham’; ‘God Himself will provide the lamb’; the binding, and the ram in his place; ‘By Myself I have sworn’; news from Nahor's family, and Rebekah) | 2,886 |
| Genesis 23 | 3 (Sarah dies, and Abraham weeps; ‘I am a foreigner and an outsider among you’; a field, a cave, and Sarah's grave) | 1,500 |
| Genesis 24 | 5 (Abraham sends his servant; a prayer at the well; the servant tells the story; ‘I will go’; Isaac meets Rebekah) | 2,552 |
| Genesis 25 | 4 (Abraham's last years, and his death; Ishmael's twelve princes; twins, and a word before their birth; a bowl of stew and a birthright) | 2,247 |
| Total | 29 | 17,029 |

### Sources

All in `bdoor-ledger.md` under "The plain notes on Genesis 19" to "25". 19
web searches (4, 1, 4, 6, 2, 1, 1). Main sources: the Talmud on Sodom
(Sanhedrin 109); the NET note and commentaries on Jude 7; Mount Sodom's
salt pillar; the Mesha Stele (about 840 BC); Tel Haror as Gerar; Laws of
Hammurabi 170-171; weaning and 2 Maccabees 7:27; the Philistines'
settlement in the 1100s BC; al-Bukhari's account of Hajar at Mecca (3364-
3365); Kant, The Conflict of the Faculties (1798); Rashi on 22:2 with
Genesis Rabbah 56:8; Kierkegaard, Fear and Trembling (1843); Qur'an 37 and
Eid al-Adha; Rosh Hashanah 16a; the Cave of the Patriarchs; the biblical
Hittites; Robert Alter's betrothal type-scene (1981); Kedar and Nebaioth in
Assyrian records. Strong's-number scripts in the repository: navi first at
20:7; ahav (love) first at 22:2, second at 24:67; chesed at 20:13; ‘I will
go’ one word at 24:58. Site wording reused word for word: "What was done to
you was wrong, and it was not your fault" (Genesis 12); the Luke 1
childlessness lines (21:1-7 in the Genesis 18 form; 25:19-26 in the Luke 1
form); the book page's camel paragraph (24:10-27); the book page's Sodom
location wording; the Honest Answers on genocide and on election, named.

### Cut or narrowed

Cut: Josephus on the salt pillar; Tall el-Hammam and Bab edh-Dhra by name;
the Talmud's Sodom stories; the ‘get acquainted’ reading of yada; any claim
that chapter 19 was told to mock Moab; Sarah's renewed body; Tel Beersheba;
the Minoan graffito at Gerar; a bowshot's length; Isaac's age in later
tradition; Jubilees and the Samaritan Moreh; the Carthage tophet; Auerbach,
Moberly, Levenson, Delaney and Boehm; the Zikhronot and daily prayers; the
silver's weight; Lehmann and Tucker; al-Khalil as ‘friend’; Nahur at Mari;
"eating bound a guest"; the Nuzi birthright tablet. Narrowed: Mesha "about
the middle of the 800s BC"; Gerar "many ... though not all agree"; the
Hittites "It is not certain"; Moriah "usually linked" with Jerusalem;
Kedar's link with Genesis "not everyone agrees"; 25:18 as hard to
translate.

The brief named "the women guide's wording" on arranged marriage. No such
sentence was found in `women-in-the-ancient-world` or elsewhere on the
site; the wording in 24:50-61 is new and rests on the deep note.

### Contested matters, and how they are stated

Sodom's sin (19:4-11): "All agree that the men of Sodom tried to gang-rape
two strangers, and that this was monstrous. They differ on one further
question. The traditional reading, held by most churches through history,
sees the same-sex nature of the demand as part of what the text condemns,
along with the violence. Its holders point to Jude 7 and to Leviticus
18:22. Another reading holds that the whole point is violent cruelty to
strangers, the worst possible breach of hospitality, and that the story
does not speak to other questions. Its holders point out that Ezekiel,
Isaiah and Jesus name pride, injustice and the refusal of welcome, and
that Jude's ‘strange flesh’ (in Greek, ‘other flesh’) has been read by some
as the angels. These notes take no side on that question here. On both
readings nothing in this chapter gives anyone a reason for contempt toward
any person." The `later` field names Ezekiel 16:49-50, Isaiah 1:10, 17,
Jude 7, Matthew 10:15, Luke 17 and Judges 19.

Also: the three wife-sister stories (one tale or a deliberate pattern); how
God could destroy cities (the text does not answer every question); what
Ishmael was doing (mocking or playing); Ishmael's age in 21:14-16; the
Philistines (three explanations, "These notes do not settle it"); the
binding of Isaac (Kant's objection at full strength; the Bible's own
answers; "These answers do not make every difficulty disappear"; Jewish,
Christian, Kierkegaard's and Muslim readings, each as its holders give it);
Moriah; the Hittites; signs and guidance; what Rebekah was asked; election
(Reformed and Arminian, corporate and individual, "These notes do not
settle it"); 25:18.

### Care lines included

19:4-11, Lot's offer: "This is wrong, and the text does not praise it." ...
"A word for anyone who was not protected by a parent, or was handed over to
harm by someone who should have kept them safe. This story does not call
that right. What was done to you was wrong, and it was not your fault. If
you are still in danger, please tell someone you trust and get help. The
Find Help page on this site lists places to turn."

19:30-38, Lot's daughters: "Is this story approved? No. Genesis tells it
briefly and plainly, and gives it no praise." ... "This story is also not a
slur on a people." ... "A word for anyone who has suffered sexual abuse
within a family. This story does not call it right, and neither does the
rest of the Bible. What was done to you was wrong, and it was not your
fault. If it is happening now, please tell someone you trust and get help.
The Find Help page on this site lists places to turn."

22:1-2, the binding: "One thing must be said without any doubt. No one today
is told by God to harm a child, or anyone else. This story has never been
read in Jewish or Christian teaching as permission to hurt a child. If you
hear a voice, or have a thought, telling you to harm a child or anyone
else, do not act on it. Seek help at once: tell someone you trust, a
doctor, or a pastor, today. If anyone is in immediate danger, call your
local emergency number. The Find Help page on this site lists places to
turn."

Also: 21:1-7 and 25:19-26 the Luke 1 childlessness lines; 21:14-21 a parent
or child who has been sent away (Find Help if no safe place to stay);
23:1-2 grief (crisis line or emergency service, Find Help); 25:1-11 old
family hurts at a funeral. No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each chapter: pass.
At the end, all 36 commands of the content-gates step in ci.yml, one at a
time: exit 0 each (validate-bible-notes: 66 introductions, 1,189 chapter
notes, 114 chapters in plain words; validate-no-emdash: 260 files, 0
em-dashes; search index 732 entries up to date; passage index 623 files
match; verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`:
146 files passed, 7 skipped; 1,674 tests passed, 73 skipped. `pnpm build`:
exit 0 (after the chapter commits).

Served with `scripts/serve-like-vercel.mjs` on port 4603; Playwright at 390
wide, deviceScaleFactor 1, with `/api/trpc`, `/api/track` and `/_vercel/*`
stubbed. `/study/bible/genesis/19` to `/25`: every passage's heading, its
part headings in order and the first 60 characters under each matched the
data (5, 3, 4, 5, 3, 5, 4 of the same), the third part reads "Where the
Bible takes this up" in every passage, no sideways scroll, no page errors
and no console errors. Screenshots of every passage of Genesis 19 and 22
read by eye: `/home/user/elite-shots/bdoor/gn19-390-*` and `gn22-390-*`
(the fixed masthead appears once mid-image where the element screenshot
scrolls; not on the page itself). Server stopped by its PID, dist/
deleted, no lh-*.json. Lighthouse not run (data only, no code change).

### Still unverified

Ancient and later texts' exact words (all paraphrased: Talmud, Rashi,
Kant, Kierkegaard, the Qur'an, al-Bukhari, Hammurabi); Hammurabi 170-171
from secondary summaries only; the Hittites' identity (said to be
uncertain).

### Next

Genesis 26 onward in plain words, in the same shape.

## Continuation: Genesis 26 to 33 (2026-11-19)

Eight chapters in plain words, in the shape of Genesis 1 to 25: each
passage's third part is `later` ("Where the Bible takes this up"), never
`ot`; each chapter note gained only `"plain": true` at its end (the diff
changes its closing lines and nothing else). After each chapter every
passage was printed field by field and read: every text sits under its
right heading, and `validate-bible-notes` passed with no exception (it
caught five quotations not word for word, in 26:27, 27:29, 30's Leviticus
19:13, 33:14 and Joshua 24:32, where a "..." had joined two parts of a
verse; and "journey" outside a quotation twice; all corrected before each
commit).

### Chapters 26 to 33 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Genesis 26 | 5 (‘Do not go down to Egypt’; ‘She is my sister’, a third time; wells, envy and room; ‘I am with you’ at Beersheba, and an oath; Esau's wives) | 2,826 |
| Genesis 27 | 5 (Isaac plans to bless Esau; Rebekah's plan; ‘The voice is the voice of Jacob’; ‘Bless me too, O my father’; Esau's grudge, and Jacob sent away) | 3,159 |
| Genesis 28 | 5 (Isaac sends Jacob away, with a blessing; Esau tries to please his father; a stairway, and ‘I am with you’; ‘Surely the LORD is in this place’; Jacob's vow, and a tenth) | 2,412 |
| Genesis 29 | 4 (Rachel at the well; seven years for Rachel; the deceiver deceived; Leah, unloved, and seen) | 2,337 |
| Genesis 30 | 6 (‘Give me children, or I will die’; Zilpah's sons; mandrakes; God remembered Rachel; Laban's bargain; peeled branches) | 2,684 |
| Genesis 31 | 5 (‘Go back to the land of your fathers’; flight, and stolen gods; Laban searches the tents; ‘Twenty years I have served you’; Mizpah: a heap of stones between two wary men) | 2,866 |
| Genesis 32 | 6 (the camp of God; Esau is coming, with four hundred men; Jacob's prayer; a gift sent ahead; wrestling until daybreak; ‘I have seen God face to face’) | 2,788 |
| Genesis 33 | 4 (Esau runs to meet him; ‘Like seeing the face of God’; two roads; home at Shechem) | 1,973 |
| Total | 40 | 21,045 |

### Sources

All in `bdoor-ledger.md` under "The plain notes on Genesis 26" to "33". 14
web searches (1, 2, 1, 0, 2, 2, 4, 2). Main sources: Mishnah Kiddushin 4:14
on 26:5; Nachmanides' question on Jacob marrying two sisters; commentaries
on why Isaac's blessing could not be withdrawn (two readings, the text does
not fully explain); readings of Hebrews 12:17 (ASV ‘no place for a change
of mind’); sullam and Akkadian simmiltu (NET note), the link doubted by
others; mandrakes (dudaim); sheep white and goats dark (older
commentaries); teraphim (Encyclopedia of the Bible; van der Toorn's
ancestor view as "some scholars"); Mizpah as a wary oath; the name Israel
(‘God strives’ or ‘God rules’, root uncertain); Genesis Rabbah 77:3 and
Rashi (Esau's guardian angel); Justin Martyr, Dialogue with Trypho 125-126;
gid hanasheh today; Genesis Rabbah 78:9 on the dots over ‘kissed him’; the
Amarna prostration formula. Site wording reused word for word: the Genesis
21 Philistines paragraph; the Genesis 23 Hittites sentence; the Genesis 12
"What was done to you was wrong, and it was not your fault" and "These
notes make no claim about any modern state, border or conflict"; the
Genesis 16 sentences on slavery ("The Bible does not hide that its great
families held slaves and used them. It shows us the harm, so that we can
see it."); the Luke 1 childlessness lines (Genesis 25 form); the Genesis 23
crisis line sentence; the book page's Nuzi caution; pointers back to the
notes on 12:4-9 (land), 14:17-20 (tithe), 20 (the wife-sister stories) and
25:19-26 (election); the Honest Answer ‘Why didn't the Bible just ban
slavery?’ named.

### Cut or narrowed

Cut: "the Hittites have Hebrew-sounding names"; Nuzi tablets on spoken
blessings; Chrysostom on Hebrews 12:17; Gezer and Arad pillars; Beitin;
Mesopotamian dowry documents; wine in Laban's trick; Leah's name; selective
breeding and hidden traits (a science claim); Hammurabi's herding law;
"Isaac's dread to his enemies"; Samael; Maimonides on a vision; the Zarqa;
Tell Balata, Labayu, Tell Deir Alla, the Mari donkey idiom, Shalem as a
place. Narrowed: Haran "hundreds of miles" away; Mahalath and Basemath
"many readers take her to be"; teraphim as ancestor figures "some scholars
think"; Fear of Isaac "scholars debate its exact sense"; Luke 15 "an echo of
shape, not a quotation".

### Contested matters, and how they are stated

26:5 (three readings of how Abraham kept ‘laws’; grace and obedience held
together by most Christian readers). The three wife-sister stories (pointed
back to chapter 20). Rebekah (faith wrongly carried out, or culpable). Why
the blessing could not be taken back ("The text does not fully explain";
two readings; "Genesis does not say which"). God's choice and Jacob's lie:
"Two things stand side by side in this chapter, and the text does not let
either one cancel the other. ... On every reading, God's choice does not
make Jacob's lie right, and Jacob's lie does not make God's choice wrong."
with the election paragraph pointed back to 25:19-26, "These notes do not
settle it." The stairway (‘ladder’ in the BSB; sullam found only here; the
Akkadian link and its doubters; the ziggurat comparison held by some and
thought too far by others). Jacob's vow (bargain or faith; "The text does
not settle Jacob's motives."). The tithe (pointed back to chapter 14).
Polygamy (the minority reading stated; "The narrator's silence is not
praise."). The peeled branches (fair or sharp practice; no science claim;
31:9-12). Rachel's motive for the teraphim ("These notes do not choose.").
The wrestler (angel, Esau's guardian angel, God himself, the Son in
Justin's reading, angel with God's authority, an older river-spirit tale:
"These notes take no side among these readings."). The name Israel. The
dots over Esau's kiss. Jacob and Seir ("A reader can hold both").

Hebrews 12:16-17, the sentences on the page (27:30-40): "What the verse
does not say is that God turns away a person who is truly sorry and comes
back to him. The rest of the Bible says the opposite." followed by John
6:37, Hebrews 4:16 and 1 John 1:9, and "If you are afraid you have gone too
far for God to take you back, this verse was not written to shut that
door."

Bilhah and Zilpah: 29:21-30 "Zilpah and Bilhah are enslaved women. Laban
gives them away as wedding gifts, as part of what went with each daughter
into her marriage. They have no say."; 30:1-8 "Bilhah is an enslaved woman.
She is given to Jacob to bear children for her mistress. She has no say in
any of it. Her body is used for another woman's plan, as Hagar's was.";
30:9-13 "Zilpah, too, is an enslaved woman. She is given to Jacob to bear
children for Leah. She has no say."

Polygamy (29:21-30): "Genesis describes Jacob's marriages. It never
commends them." ... "The narrator's silence is not praise. The story itself
shows the misery."

### Care lines included

26:7-11 put at risk by someone who should have protected you (Genesis 12
wording; Find Help). 27:30-40 the unfavored child (Psalm 27:10; someone you
trust). 29:31-35 anyone unloved (someone you trust; Find Help if not safe at
home). 30:1-8 the Luke 1 childlessness lines, then for ‘or I will die’: "That
feeling is real, and it is heavy, but it is not the last word about your
life." and the Genesis 23 crisis line sentence with Find Help. No phone
number is given.

### What was run, and what passed (watched)

`validate-bible-notes genesis` and `validate-no-emdash` after each chapter:
pass. At the end, all 36 commands of the content-gates step in ci.yml, one
at a time: exit 0 each (validate-bible-notes: 66 introductions, 1,189
chapter notes, 122 chapters in plain words; validate-no-emdash: 260 files, 0
em-dashes; search index 732 entries up to date; passage index 623 files
match; verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`:
146 files passed, 7 skipped; 1,674 tests passed, 73 skipped. `pnpm build`:
exit 0 (after the chapter commits).

Served with `scripts/serve-like-vercel.mjs` on port 4603; Playwright at 390
wide, deviceScaleFactor 1, with `/api/trpc`, `/api/track` and `/_vercel/*`
stubbed. `/study/bible/genesis/26` to `/33`: every passage's heading, its
part headings in order and the first 60 characters under each matched the
data (5, 5, 5, 4, 6, 5, 6, 4 of the same), the third part reads "Where the
Bible takes this up" in every passage, no sideways scroll, no page errors
and no console errors. Screenshots of every passage of Genesis 29 and 32
read by eye: `/home/user/elite-shots/bdoor/gn29-390-*` and `gn32-390-*`
(the fixed masthead appears once mid-image where the element screenshot
scrolls; not on the page itself). Server stopped by its PID, dist/
deleted, no lh-*.json. Lighthouse not run (data only, no code change).

### Still unverified

Ancient and later texts' exact words (all paraphrased: the Mishnah,
Genesis Rabbah, Rashi, Nachmanides, Justin); the Akkadian link for sullam
and the meaning of Israel (said to be debated); the sheep-and-goat colours
from older commentaries only.

### Next

Genesis 34 onward in plain words, in the same shape.

## Continuation: Genesis 34 to 41 (2026-11-19)

Eight chapters in plain words, in the shape of Genesis 26 to 33: each
passage's third part is `later` ("Where the Bible takes this up"), never
`ot`; each chapter note gained only `"plain": true` at its end (the diff
changes its closing lines and nothing else). After each chapter every
passage was printed field by field and read: every text sits under its
right heading. `validate-bible-notes` passed with no exception before each
commit; on the way it caught three quotations not word for word (Colossians
3:21 "so that" for "so"; Judah's split speech in 38:23; Jeremiah 9:25,
replaced by the verse's own words) and one exclamation point outside a
quotation (41:43 "Bow the knee!" in single quotes, now in double quotes as
BSB text). Quotations whose BSB wording carries an em-dash (34:7, 35:18,
Psalm 105:17) were cut back so the quoted words contain none.

### Chapters 34 to 41 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Genesis 34 | 5 (What was done to Dinah; a father's silence, and a bargain; a sacred sign used as a trap; slaughter and plunder; a question left hanging) | 2,306 |
| Genesis 35 | 5 (back to Bethel, and the foreign gods buried; ‘Your name will be Israel’; Rachel dies giving birth; Reuben and Bilhah, the twelve sons; Isaac dies, and both sons bury him) | 2,417 |
| Genesis 36 | 3 (Esau's family moves to Seir; clans and chiefs; kings in Edom before Israel had a king) | 1,129 |
| Genesis 37 | 5 (the favored son and the robe; two dreams; ‘Here comes that dreamer’; sold for twenty shekels; a robe dipped in goat's blood) | 2,637 |
| Genesis 38 | 4 (Judah's sons, and a widow wronged; Tamar's plan; ‘She is more righteous than I’; twins: Perez and Zerah) | 2,155 |
| Genesis 39 | 4 (‘The LORD was with Joseph’; ‘How could I do such a great evil?’; the cloak, and a lie; in prison, and the LORD with him) | 1,942 |
| Genesis 40 | 3 (two of Pharaoh's officers in prison; the cupbearer's dream, and ‘Remember me’; the baker's dream, and forgotten) | 1,380 |
| Genesis 41 | 5 (Pharaoh's dreams, and a cupbearer remembers; ‘I myself cannot do it’; seven years of plenty, seven of famine; ruler over all Egypt; plenty, two sons, and the famine) | 2,446 |
| Total | 34 | 16,412 |

### Sources

All in `bdoor-ledger.md` under "The plain notes on Genesis 34" to "41". 14
web searches (2, 1, 0, 1, 2, 2, 1, 5). Main sources: Lyn Bechtel's 1994
article questioning ‘rape’ in 34:2 (one sentence, as a view); Judith 9:2
praising Simeon; the Talmud, Shabbat 55b, on Reuben (paraphrased); Kenneth
Kitchen's 1995 argument on the twenty-shekel price (with Leviticus 27:5,
BSB); the Hittite and Middle Assyrian levirate laws; Augustine, Pius XI's
Casti Connubii (1930), Luther and Calvin on Onan; the Tale of Two Brothers
(Papyrus D'Orbiney, British Museum, about 1215 BC); Lisak and colleagues
(2010) on false reports; the Chester Beatty dream book (British Museum,
1200s BC); the Famine Stela on Sehel Island (Ptolemaic); Zaphenath-paneah
(meaning disputed), Asenath (‘she belongs to Neith’, HALOT), On as
Heliopolis; the Hyksos (about 1650 to 1550 BC). The book page's sentence on
Joseph's date and its views on 36:31 are followed. Site wording reused: the
Genesis 19 lines ("This story does not call it right, and neither does the
rest of the Bible. What was done to you was wrong, and it was not your
fault." ... "The Find Help page on this site lists places to turn."), the
Genesis 23 grief and crisis-line sentences, the Genesis 27 unfavored-child
lines with Psalm 27:10, the Genesis 30 Bilhah wording (‘enslaved’, ‘no
say’), and the Genesis 12 Find Help form.

### Cut or narrowed

Cut: Deuteronomy 22:28-29 (left out so nothing reads as a case for a victim
marrying an attacker); Josephus on Dinah; Jubilees on Levi; the Mari ‘sons
of the right’; Migdal Eder in the Targum; Egyptian records of Edomite
herders, Faynan, Herod and the Idumeans; Beni Hasan and Papyrus Brooklyn
35.1446; Nuzi and Ugarit prices; Adullam, Chezib and Timnah located;
royal birthday festivals; Potiphera ‘the one whom Ra has given’ (not
confirmed); the Egyptian ‘gold of honour’; Aper-El; Redford and Kitchen on
the Egyptian names; a Middle Kingdom ‘nineteenth century BC’ date for
Joseph; the claim that most assaults go unreported (not confirmed).
Narrowed: shaving ‘usually’; Egyptian art ‘often’ shows bearded men from
Canaan; ‘Bow the knee’ a rare word, meaning uncertain; Ben-oni ‘most
likely’ sorrow; Asenath's name ‘many scholars think’.

### Contested matters, and how they are stated

34:2: "A few scholars have asked whether the Hebrew words mean rape in the
modern sense; Lyn Bechtel argued in a 1994 article that they need not. Most
readers, and the BSB, read the verse as rape. On any reading the text does
not soften it." Rachel's tomb (Bethlehem, or Zelzah on Benjamin's border:
"The question is open."). Reuben (the plain reading; the Talmud's view that
he only moved the bed; "Most readers take the words as they stand.").
Esau's wives' names (several explanations; the text lets both stand).
36:31 (final form under the kings; later hands updating details; Moses
writing of promised kings; "these notes do not settle the question").
Ketonet passim (‘many colors’ or long sleeves). Ishmaelites and Midianites
(three readings; on every reading the brothers are responsible). The
twenty-shekel price (Kitchen's argument; "Others doubt that prices can date
the story"). Onan (Catholic reading with Augustine, Pius XI, Luther and
Calvin; the levirate-refusal reading; "These notes take no side between
these readings."). Shrine prostitution (evidence disputed). Dreams today
("Christians differ over whether, and how, he still does."). Joseph's date
(traditional, Hyksos, earlier, later composition; "These notes do not
settle the question.").

The sentences asked for, as on the page: on Dinah (34:1-4), "Verse 2 says it
plainly. Shechem sees her, takes her, and lies with her by force. He rapes
her." and "And notice whose voice is missing. Dinah never says one word in
the whole chapter." and (34:30-31) "Nothing in this chapter teaches that a
woman who has been raped should marry the man who did it, or make peace
with him." On Onan (38:1-11), "On both, Onan wronged Tamar. He denied a
widow her right and her future, for his own gain." On Genesis 39
(39:11-18), "This story is not a reason to disbelieve a person who reports
sexual assault."

### Care lines included

34:30-31 sexual assault (Genesis 19 form, "it was not your fault", tell
someone you trust, Find Help). 35:16-20 loss of a wife, mother or baby in
childbirth (Genesis 23 grief and crisis-line sentences, Find Help), and a
line for those who grew up without a mother. 37:1-4 the unfavored child
(Genesis 27 wording, Psalm 27:10) and a word to parents. 37:25-28 human
trafficking ("It is not your fault. You are not the property of the people
who hold you." Find Help). 39:11-18 anyone pressured by someone with power
over them ("Saying no is right, and it is not your fault if they punish you
for it." Find Help). No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes genesis` and `validate-no-emdash` after each chapter:
pass. At the end, all 36 commands of the content-gates step in ci.yml, one
at a time: exit 0 each (validate-bible-notes: 66 introductions, 1,189
chapter notes, 130 chapters in plain words; validate-no-emdash: 260 files,
0 em-dashes; search index 732 entries up to date; passage index 623 files
match; verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`:
146 files passed, 7 skipped; 1,674 tests passed, 73 skipped. `pnpm build`:
exit 0 (after the chapter commits).

Served with `scripts/serve-like-vercel.mjs` on port 4603; Playwright at 390
wide, deviceScaleFactor 1, with `/api/trpc`, `/api/track` and `/_vercel/*`
stubbed. `/study/bible/genesis/34` to `/41`: every passage's heading, its
part headings in order and the first 60 characters under each matched the
data (5, 5, 3, 5, 4, 4, 3, 5), the third part reads "Where the Bible takes
this up" in every passage, no sideways scroll, no page errors and no console
errors. Screenshots of every passage of Genesis 34 and 39 read by eye:
`/home/user/elite-shots/bdoor/gn34-390-*` and `gn39-390-*` (the fixed
masthead appears once mid-image where the element screenshot scrolls; not
on the page itself). Server stopped by its PID, dist/ deleted, no
lh-*.json. Lighthouse not run (data only, no code change).

### Still unverified

Ancient and later texts' exact words (all paraphrased: Judith, the Talmud,
Augustine, Casti Connubii); the older commentaries behind the shaving
custom; the meaning of abrek and of Zaphenath-paneah (said to be
uncertain).

### Next

Genesis 42 onward in plain words, in the same shape. Genesis 47 must face
Joseph's famine policy in its later years (pointed to from 41:47-57).


## Continuation: Genesis 42 to 50 (2026-11-19)

Nine chapters in plain words, which completes Genesis. Same shape as 34 to
41: each passage's third part is `later` ("Where the Bible takes this up"),
never `ot`; each chapter note gained only `"plain": true` at its end (the
diff changes its closing lines and nothing else). After each chapter every
passage was printed field by field and read: every text sits under its
right heading. `validate-bible-notes genesis` passed with no exception
before each commit. On the way it caught three quotations that joined
words across a speaker tag (43:23 "said the steward", 44:16 "Judah
replied", 48:18 "Joseph said"), one paraphrase of Deuteronomy 26:5 and one
of Psalm 128:6 (all now split or replaced by the BSB words), and an
exclamation inside single quotes (46:2 "Jacob, Jacob!", now BSB text in
double quotes). Quotations whose BSB wording carries an em-dash (43:8,
44:12, 44:16, 49:9, 49:22, 50:20) were cut back so the quoted words
contain none; 50:20's last clause is quoted separately, not joined.

The word-count table of "Continuation: Genesis 34 to 41" was corrected
first (recount by script over each passage's title and five prose fields:
34: 2,306; 35: 2,417; 36: 1,129; 37: 2,637; 38: 2,155; 39: 1,942; 40:
1,380; 41: 2,446; total 16,412, the same as asked).

### Chapters 42 to 50 in plain words

Counted by script over each passage's title and five prose fields.

| Chapter | Passages | Plain words |
|---|---|---|
| Genesis 42 | 5 (ten brothers go down for grain; ‘You are spies!’; ‘We saw his anguish’; silver in the sack; ‘Everything is going against me’) | 2,430 |
| Genesis 43 | 4 (Judah's pledge; ‘If I am bereaved, I am bereaved’; afraid of a trap; a meal with Joseph) | 1,726 |
| Genesis 44 | 4 (the silver cup; ‘God has exposed the iniquity of your servants’; Judah speaks for his father; ‘Let your servant stay here in place of the boy’) | 2,023 |
| Genesis 45 | 5 (‘I am Joseph’; ‘It was not you who sent me here, but God’; ‘Come down to me without delay’; Pharaoh's welcome; ‘My son Joseph is still alive’) | 2,101 |
| Genesis 46 | 4 (‘Do not be afraid to go down to Egypt’; seventy people; ‘Finally I can die’; ‘Your servants have raised livestock’) | 1,779 |
| Genesis 47 | 5 (five brothers before Pharaoh; Jacob blesses Pharaoh; money, livestock, and at last themselves; ‘Servants of Pharaoh’, and a fifth for ever; ‘Do not bury me in Egypt’) | 2,312 |
| Genesis 48 | 4 (‘Ephraim and Manasseh shall be mine’; ‘Who are these?’; the crossed hands; ‘God will bring you back’) | 1,944 |
| Genesis 49 | 6 (Reuben; Simeon and Levi; Judah and the scepter; Zebulun to Naphtali, and a prayer; Joseph and Benjamin; ‘Bury me with my fathers’) | 2,952 |
| Genesis 50 | 4 (Joseph mourns his father; the burial at Machpelah; ‘God intended it for good’; ‘Carry my bones up from this place’) | 2,169 |
| Total | 41 | 19,436 |

The whole book now: 50 chapters in plain words, 213 passages, 115,712
words (same count).

### Sources

All in `bdoor-ledger.md` under "The plain notes on Genesis 42" to "50". 20
web searches (2, 1, 2, 1, 3, 4, 2, 3, 2; one more page fetch refused by the
network). Main sources: the Tale of Sinuhe's ‘Walls of the Ruler’;
Herodotus 2.41 (Egyptians and a Greek's knife) and 2.86 (seventy days in
natron), each marked as much later; the Laws of Hammurabi 6 (theft of
temple or palace goods) and 46 (fields let for half or a third of the
harvest); Babylonian oil-on-water omen texts, stated generally; the
Septuagint's seventy-five at 46:27 behind Acts 7:14; Papyrus Anastasi VI
(late 1200s BC); Pi-Ramesses (Ramesses II, 1200s BC); the 47:21 variant
(Masoretic ‘to the cities’, Samaritan and Greek ‘slaves’); the Friday
evening blessing of sons; ‘bed’ and ‘staff’ in 47:31 and Hebrews 11:21;
Cross and Freedman (thesis 1950, published 1975); Targum Onkelos and
Sanhedrin 98b on Shiloh (paraphrased); 110 years as the Egyptian ideal
(ASOR). The book page's Goshen wording, the Genesis 12 land-promise note,
the Genesis 16 safety lines, the Genesis 23 grief lines, the Genesis 27
‘neither cancels the other’ wording, and the slavery and suffering Honest
Answers are reused or pointed to.

### Cut or narrowed

Cut: 4Q252 on 49:10 (wording not confirmed); a Dead Sea Scrolls copy of
Exodus 1:5 reading seventy-five (sources disagree); the Egyptian ‘god's
father’ title for 45:8; Kitchen's Hyksos-age cup divination and the Middle
Kingdom statuettes; temple exemption decrees; Nahmanides, Justin Martyr,
Augustine, Gunkel and Westermann on 49; the Tel Dan, Mesha and Amarna
evidence for the tribes (the brief keeps the tribes to the Bible's own
reports); Diodorus on embalming; Acts 7:15-16 (Shechem); the silver's
weight in kilograms; the count of ‘father’ in Judah's speech; ‘the first
time God is called shepherd’. Narrowed: ‘many readers’ on the fivefold
portion, Zebulun's coast, the archers and the brothers' message; Onkelos
‘in the form that has come down to us’; the seated ruler's staff
‘probably’; the ‘mild terms’ view given as what its holders say.

### Contested matters, and how they are stated

Joseph's harshness (42): testing; anger mixed in; bringing about the dream;
"These readings do not cancel each other out." Divination (44): the words
are spoken inside the trick; disguise, real practice before the law, or
irony; "These notes do not claim more than the text says." Judah's
substitution (44): a Christian reading, not a prophecy, with the difference
named. God's hand and human guilt (45, 50): Reformed and Arminian (with
many Catholic and Orthodox) accounts; no side. Seventy and seventy-five
(46). ‘Shepherds detestable’ (46): "It is honestly hard to say." The famine
policy (47): three readings, "The narrator does not comment, and these
notes take no side." The younger over the older (48): Reformed and
role-based readings, pointing to 25:19-26. The 48:22 battle: two readings,
"The text does not settle it." 49:10: four renderings; Jewish, critical and
Christian readings; "neither side's reading is dishonest"; "Nothing in this
chapter is a prophecy about any modern nation or people." The brothers'
message (50): open. Embalming numbers (50): do not match exactly; one
common harmonisation given.

### Care lines included

45:4-8: forgiving does not mean returning to a person who is still
dangerous, with the Genesis 16 safety lines word for word and the Find
Help sentence. 50:1-3: the Genesis 23 grief lines (crisis line, Find
Help). 50:15-21: 50:20 is never a line for fresh grief or for explaining
away abuse; "If someone has hurt you, what they did was wrong"; Find Help.
No phone number is given.

### What was run, and what passed (watched)

`validate-bible-notes genesis` and `validate-no-emdash` after each chapter:
pass. At the end, all 36 commands of the content-gates step in ci.yml, one
at a time: exit 0 each (validate-bible-notes: 66 introductions, 1,189
chapter notes, 139 chapters in plain words; validate-no-emdash: 260 files,
0 em-dashes; search index 732 entries up to date; passage index 623 files
match; verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`:
146 files passed, 7 skipped; 1,674 tests passed, 73 skipped. `pnpm build`:
exit 0 (after the chapter commits).

Served with `scripts/serve-like-vercel.mjs` on port 4604; Playwright at 390
wide, deviceScaleFactor 1, with `/api/trpc`, `/api/track` and `/_vercel/*`
stubbed. `/study/bible/genesis/1` to `/50`: every passage's heading, its
part headings in order and the first 60 characters under each matched the
data in all fifty chapters, 213 passages (42 to 50: 5, 4, 4, 5, 4, 5, 4,
6, 4); no sideways scroll, no page errors and no console errors on any.
Screenshots of every passage of Genesis 47 and 50 read by eye:
`/home/user/elite-shots/bdoor/gn47-390-*` and `gn50-390-*` (the fixed
masthead appears once mid-image where the element screenshot scrolls).
Server stopped by its PID, dist/ deleted, no lh-*.json. Lighthouse not run
(data only, no code change).

### Still unverified

The exact words of Targum Onkelos and Sanhedrin 98b (paraphrased); which
modern translations read ‘until tribute comes to him’ (not named); the
Hammurabi rent shares as typical practice (only the law's wording).

### Next

Genesis is complete in plain words. The next book is for the lead to
choose.

## Acts: the book page and Acts 1 to 7 (2026-11-19)

### The book page (`/study/bible/acts`, same address)

Data only, in `client/public/bible/notes/acts/intro.json`, field `teaching`
(the rest of the file untouched; its own layout kept), built to Luke's shape.
Fourteen headed parts with a contents list: Acts in a minute; Who wrote it,
and how we know; The second of two books; When it was written; What kind of
book it is (ancient history-writing; the speeches, with Thucydides and the
views); The plan in one verse (1:8); How Acts is built; The big themes; Acts
and the Old Testament; Acts and the history of its day (Agrippa I, the
famine, Claudius and the Jews of Rome, Gallio, the politarchs); Acts and
Paul's letters (Galatians 1 and 2 with Acts 9, 11 and 15, three views;
Antioch; Timothy); Acts and the Jewish people; What Acts is not (what is
normative, three places Christians differ); How to read Acts. Then 13 hard
passages (1:18, 2:4, 2:36, 2:38, 2:44, 4:12, 5:5, 5:36, 7:16, 8:16, 9:7,
15:20, 28:28), 13 key words, a timeline of 17 entries, one map on the
"israel" frame with nine places (Damascus, Sidon, Tyre, Caesarea, Samaria as
a region placed roughly, Joppa, Lydda, Jerusalem, Azotus), a `mapNote` saying
Gaza lies just south of the frame and that Paul's travels need a wider
Mediterranean map that is still to come, and six Go deeper pages (Jewish
life, the Roman world, honor and shame, the cities of Paul, the Septuagint,
and the Honest Answer on those who never heard).

Words: 4,353 in the fourteen parts.

**Code.** None changed in the app. `teaching.test.tsx` now expects Acts to
have a guide (the list of books with one) and adds two tests: the parts on
Paul's letters and the Jewish people, two hard-passage links and the map
note; one map on the "israel" frame, with the Joppa card linking Acts 9:36.

### Acts 1 to 7 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Acts 1 | 6 (the first book, and forty days; wait for the Spirit, you will be My witnesses; taken up, and coming back; back to the city, to pray; Peter speaks about Judas; Matthias chosen by lot) | 3,531 |
| Acts 2 | 7 (wind, fire, and other tongues; every nation under heaven; what Joel foretold; Jesus of Nazareth, killed and raised; David's tomb, and David's Lord; ‘What shall we do?’; the life of the first believers) | 4,469 |
| Acts 3 | 4 (at the gate called Beautiful; not our power: the name of Jesus; you acted in ignorance: turn back; the prophet like Moses, and Abraham's blessing) | 2,242 |
| Acts 4 | 5 (arrested in the temple; no other name; ‘We cannot stop speaking’; the believers pray for boldness; one heart and soul, Barnabas) | 2,597 |
| Acts 5 | 6 (Ananias; Sapphira; signs and wonders; jailed and freed by night; ‘We must obey God rather than men’; Gamaliel, a flogging, and joy) | 3,229 |
| Acts 6 | 2 (widows overlooked, and seven chosen; Stephen accused) | 1,424 |
| Acts 7 | 8 (Abraham; Joseph; Moses born and pushed away; Moses sent; the calf and the stars; tabernacle and temple; ‘You stiff-necked people’; Stephen sees Jesus, and is stoned) | 3,998 |
| Total | 38 | 21,490 |

After each chapter every passage was printed field by field and read: all 38
sit under their right headings. `validate-bible-notes` passed after each with
no exceptions (`OT_FIELD_KNOWN` stays empty).

### Sources

All in `bdoor-ledger.md` under "Acts's book page" and "The plain notes on
Acts 1" to "7". 33 web searches: 8 for the book page, then 3, 6, 4, 3, 4, 2
and 3. Main sources: Irenaeus; the Muratorian fragment (Metzger); Josephus,
Antiquities 19.343-350 (Agrippa), 20.51-53 and 20.101 (the famine), 20.97-98
(Theudas), 20.200 (James), 14.65 (the ninth-hour sacrifice); Suetonius and
Orosius (the wrom ledger); the Gallio inscription; the Thessalonica politarch
inscription; Pervo, Dating Acts (2006); Thucydides 1.22; Stein (JETS 1974) and
others on Galatians 2; Mishnah Eruvin 4:3, Makkot 3:10, Sotah 9:15; Eusebius
and Jerome on Akeldama; Jubilees and the rabbis on Weeks and Sinai; the
Assemblies of God statement (1916), Topeka (1901), Azusa Street (1906);
Warfield, Counterfeit Miracles (1918); Catechism of the Catholic Church 1263;
Luther's Small Catechism; Westminster Confession 28; the Stone-Campbell
reading of 2:38; Codex Bezae at 4:6; Kraus (NTS 2001) on agrammatoi;
Irenaeus on Nicolas; Philo on the freedmen; the Theodotus inscription; the
Septuagint of Amos 5:26-27 and Genesis 46:27; Pilate's removal in 36.
Scripture is the BSB, checked word for word.

### Cut or narrowed

Hemer, Ramsay and Baur by name; Agrippa I as Herod's grandson; an exact year
for the famine; Festus's year; "how the church has read Acts" (not searched);
the length of Acts in hours; Papias on Judas; the "swelling up" sense of
1:18; Codex Vaticanus at 2:17; shachat and diaphthora at Psalm 16:10; the
ritual baths for the three thousand; Orthodox chrismation; Mantey on eis;
night trials; the sagan; the councils of 543 and 553; the wax tablet;
same-day burial; Stephen as "first deacon" in Irenaeus; the "Libyans"
reading; 4QExod reading seventy-five (disputed in the search); the
Samaritan Pentateuch on Terah; Philo on Moses; "beyond Babylon" as code for
Rome; a date for Stephen's death. Narrowed: the famine "the mid-40s";
Claudius's expulsion "about 49, disputed"; Gallio "most 51 to 52"; the
Beautiful Gate "many think" the Nicanor Gate; Gamaliel "most identify";
the Achan verb "many readers notice"; "church" first at 5:11 "in most modern
Bibles"; the cloaks "probably".

### Contested matters, and how they are stated

Authorship (Luke; the "we" passages read as eyewitness, diary or convention;
doubts from the letters; "still widely held"). Date (early 60s; 70s or 80s,
"probably most"; about 115, "most have not followed"; "these notes do not
settle"). The speeches (faithful summaries; Luke's compositions; between).
Galatians 2 and Acts 11 or 15 (three views; Antioch; Timothy; "these notes
set out the views and do not settle them"). What is normative (three
places). "Restore the kingdom" (fulfilled in Christ and the church; a future
promise; both; no claim about any modern state). Judas's death (joined, or
separate memories). Tongues today (Pentecostal, charismatic,
continuationist, cessationist, each in its holders' terms; "these notes do
not choose"). 2:38 (Catholic and Orthodox, Lutheran, Presbyterian and
Reformed, Baptist, Churches of Christ; the grammar; "faithful churches
differ while confessing one Lord"). Healing today. The restoration of all
things. No other name (the claim stated plainly; the fate of those who never
heard left open, with the Honest Answer). Civil disobedience (three views;
no modern cause). Shared goods (voluntary, 5:4; no application left or
right). Ananias and Sapphira (a founding sign; judgment or shock; believers
or not; not a pattern). Theudas (four answers, no side). The seven as
deacons; church order. Stephen and Genesis (Terah's death; seventy-five; the
Shechem tomb). The Son of Man standing. How Stephen could be stoned.

**"You crucified" and its misuse (Acts 2:22-28, hard).** "First, see who is
speaking, and to whom. Peter is a Jew, speaking to his own people, in their
own city, weeks after the event, about something done there. He includes the
Romans (‘the lawless’) in the same sentence. He says Jesus was delivered up by
God's own plan. In his next sermon he adds, “I know that you acted in
ignorance, as did your leaders” (3:17). And he does not condemn them; he
offers them forgiveness, and three thousand of the hearers believe and are
baptized. This is a prophet's call to his own nation to turn, like the calls
of Jeremiah and the other prophets, not a verdict on a people." Then the
Matthew 27 and John 19 paragraph word for word ("For centuries many
Christians called the Jewish people ‘Christ-killers’ ... That reading is
false, and Christians must reject it plainly. This site rejects it."), with
Peter and the three thousand added, Nostra Aetate 4 and Acts 4:27. 3:13-15,
5:28-30 and 7:51-53 point back to it.

**Tongues today (Acts 2:1-4, hard).** "Christians also differ on whether the
gift continues today. These views are held by faithful believers, and these
notes do not choose between them." Then Pentecostal, charismatic,
continuationist and cessationist readings each in a paragraph.

**2:38 (Acts 2:37-41, hard).** "Churches read it differently, and the
differences are old and sincerely held. These notes set out the main
readings in the words their holders would use, and do not choose between
them." Five readings, the grammar, and "These are questions on which
faithful churches differ while confessing one Lord."

**Ananias and Sapphira (Acts 5:1-6).** "Peter is clear about what the sin
was. It was not keeping money. ... The sin was the lie." And: "This is one
of the hardest stories in the New Testament, and Luke does not soften it. A
man and his wife die for a lie about money."

### Care lines included

1:15-20 (Judas: the Matthew 27 form, with Find Help); 3:1-10 (those who
prayed and were not healed: the Matthew 8 sentences, with Find Help); 5:1-6
(no sudden death or illness read as God's punishment, Luke 13:4-5, with Find
Help); 7:54-60 (those bereaved by violence, the Genesis 23 form, with Find
Help).

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each piece: pass. At
the end, all 36 content-gate commands, one at a time: exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 146 chapters
in plain words; validate-no-emdash 260 files, 0; search index 732 entries
up to date; passage index 623 files match; verify-sources 22 texts intact).
`pnpm check`: clean. `pnpm test`: 146 files passed, 7 skipped; 1,676 tests
passed, 73 skipped. ESLint on the changed test file: clean. `pnpm build`,
`pnpm run sitemap`, `pnpm run prerender` (3,028 pages), `pnpm run
audit:canonicals`: exit 0.

Served with `scripts/serve-like-vercel.mjs` on port 4600 and looked with
Playwright (deviceScaleFactor 1; /api/trpc, /api/track and /_vercel stubbed).
Book page at 390 and 1440: 14 of 14 parts as headings, 17 of 17 timeline
entries, one map on the "israel" frame, the map note shown, no sideways
scroll, no console or page errors. A script matched every rendered passage
heading, its part headings in order and the first 60 characters under each
to the data at 390: Acts 1, 27 of 27 fields; 2, 33; 3, 19; 4, 23; 5, 27; 6,
10; 7, 36; no sideways scroll, no errors. The first map had Jerusalem's name
over Azotus's and Caesarea's name over the Samaria ring, and the Damascus
mark at the drawing's edge; data-only label and position changes fixed it,
and a script then found no name over another name or mark and none outside
the drawing at 390 and 1440 (the server keeps gzipped files in memory, so it
was restarted to see the change; the build was not rerun for this data-only
fix, which `validate-bible-notes`, the teaching test and the index checks
passed after). Screenshots looked at: `/home/user/elite-shots/bdoor/acts-*`
(book page, map, contents, timeline, the Jewish people part, Acts 2).
Lighthouse (ci.yml command, three runs, on `/study/bible/acts`): performance
88, accessibility 100, best practices 96, SEO 100, CLS 0.000. Server stopped
by PID, dist/ deleted, no lh-*.json.

### Still unverified

The exact words of every ancient writer (all paraphrased); the Septuagint's
exact verb at Joshua 7:1; Orthodox teaching on baptism beyond the general
sentence; the charismatic movement described only generally.

### Next

Acts 8 onward in plain words, in the same shape; and a Mediterranean map
frame for Paul's travels.

## Continuation: Acts 8 to 14 (2026-11-19)

A machine restart cut off the last run after Acts 8 was committed
(957ec4f8), with its ledger rows in place. This run read Acts 8 as an editor
and then wrote Acts 9 to 14.

### The editor's read of Acts 8

Every passage printed field by field: all seven sit under their right
headings, and the care points hold (Samaria without contempt; Simon's later
legends as "later Christian writers told", paraphrased; 8:14-17 with the
Pentecostal, Catholic and Orthodox, and Reformed and Baptist readings, no
side; the Kandake as a title of the queens of Kush; the eunuch with
Deuteronomy 23:1 and Isaiah 56; 8:37 missing from the earliest manuscripts,
said plainly; baptism mode as views). Five things changed: "the Samaritans
also looked for a coming prophet like Moses" narrowed (one search: the hope
is in later Samaritan writings, its first-century form uncertain); the men
who buried Stephen made "devout Jews or believers", both readings; "often as
a boy" cut; "a scroll of Isaiah, which was costly" cut to what the text says;
"a magician learned secrets from a teacher, often for a price" cut to the
deep note's "people paid for spells and charms". One quotation of 2:38 had
joined two parts of the verse with an ellipsis; it is now a paraphrase and
one exact quotation. Commit 98ad6492.

### Acts 9 to 14 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Acts 9 | 6 (a light on the Damascus road; Ananias goes to his enemy; preaching in Damascus, and the basket; Barnabas stands with Saul; Aeneas at Lydda; Tabitha, raised at Joppa) | 4,299 |
| Acts 10 | 6 (Cornelius; Peter's vision; three men at the gate; Peter enters a Gentile house; ‘God does not show favoritism’; the Spirit falls before baptism) | 3,578 |
| Acts 11 | 5 (‘You ate with them’; ‘Who was I to hinder God?’; Greeks believe in Antioch; the name ‘Christians’; Agabus, and a gift for Judea) | 2,580 |
| Acts 12 | 4 (James killed, Peter in chains; an angel in the prison; Rhoda at the gate; ‘The voice of a god’) | 2,510 |
| Acts 13 | 6 (sent out from Antioch; Cyprus; Pisidian Antioch: Israel's story; forgiveness, and ‘justified’; ‘We now turn to the Gentiles’; ‘Appointed for eternal life’) | 4,008 |
| Acts 14 | 5 (Iconium; Lystra: ‘The gods have come down’; ‘We too are only men’; stoned, and left for dead; ‘Through many hardships’, and home) | 3,017 |
| Total | 32 | 19,992 |

Acts 8 now has 4,350 words in 7 passages. After each chapter every passage
was printed field by field: all sit under their right headings.
`validate-bible-notes` passed after each with no exceptions. Each chapter
note gained only `"plain": true`.

### Sources

All in `bdoor-ledger.md` under "Editor's read of Acts 8" and "The plain
notes on Acts 9" to "14". 18 web searches: 1, 3, 2, 2, 2, 6, 2. Main
sources: the Greek of 9:7 and 22:9 (both readings); Aretas IV (about 9 BC to
AD 40); Mishnah Ketubot 7:10 on tanners; the Italian cohort inscription
(Syria, about 69); the Aphrodisias God-fearers inscription; Antioch's
founding by Seleucus I; the name "Christians"; Herod Agrippa I's family and
reign; Josephus, Antiquities 19.343-350 (from the ledger and a search);
Lucius Sergius Paullus (CIL VI 31545), "has been suggested"; Pisidian
Antioch and Lystra as Augustan colonies; "Saul, also called Paul" as a
two-name formula; Catechism 1989 (from Trent) and the Joint Declaration
(1999); Ovid, Metamorphoses 8 (Baucis and Philemon), paraphrased.

### Cut or narrowed

Cut: a date for Saul's call; Stendahl by name; how Aretas held Damascus;
Straight Street traced today; Kraabel; the temple of Rome and Augustus at
Caesarea; "third city of the empire"; the size of Antioch's Jewish
community; the 11:20 Greeks/Hellenists reading; Tacitus on the name; Agrippa
raised in Rome; the owl in Josephus; any Roman rule on guards; the Soloi
inscription and Ramsay; the 450 years of 13:20; the middle-voice reading of
13:48; Orthodox teaching on justification (not searched); veterans and the
founding year at Lystra; Zeus and Hermes inscriptions near Lystra.
Narrowed: the first trip "many place it in the later 40s"; Sergius Paulus
"has been suggested ... not certain"; Tabitha koum "if Peter spoke
Aramaic"; tanners' uncleanness "many readers ... others argue"; Ovid "scholars
debate how far that story lies behind this scene".

### Contested matters, and how they are stated

The three tellings of Saul's call and 9:7 with 22:9 (the grammar reading and
the "too slight" reading). Conversion or call ("These notes leave the choice
of word to the reader"). Peter's vision and the food laws. The Spirit before
baptism (set beside 2:38, 8:14-17 and 19:5-6, with "What Acts is not").
Those who never heard (pointer to the Honest Answer, twice). Galatians 2 and
the famine visit. Justified (Lutheran and Reformed; Catholic; the Joint
Declaration). 13:48 (Reformed; Arminian and Wesleyan; pointer to "Does God
choose us, or do we choose him?"). Church government (bishops; elders;
congregations). South and North Galatia.

**8:14-17 (unchanged from the last run).** "Christians understand this
passage in different ways. These views are held by faithful believers, and
these notes do not choose between them."

**Peter's vision and the food laws (10:9-16, hard).** "What does the vision
mean for the food laws? Christians read it mainly as being about people,
with the food question following from it." And: "None of this treats the
food laws as foolish. God gave them, and they did their work ... Jewish
families who keep them today are honouring the God of Abraham. The vision is
not a story about Jews being wrong. It is a story about God widening his
table."

**James killed and Peter freed (12:1-5, hard).** "The text gives no reason.
Luke tells James's death in a single sentence and Peter's rescue in many,
and he does not explain why God let one apostle die and brought the other
out. ... These notes will not invent a reason Luke does not give."

**"The Jews" in Acts 13 (13:42-47, hearers).** "Then Luke writes, ‘when the
Jews saw the crowds, they were filled with jealousy’. Who does he mean? Not
the Jewish people, and not even all the Jews of this town, since many of
them had just believed. He means some of the synagogue's members and leaders
in Pisidian Antioch ... Paul and Barnabas, who answer them, are Jews too."
And: "‘We now turn to the Gentiles’ is a turn in one town, not a turn away
from the Jewish people. In the very next town, Iconium, Paul and Barnabas go
‘as usual into the Jewish synagogue’ ... (14:1)", with Romans 11:1. The same
care, each with a pointer to the 2:22-28 note, at 9:23, 9:29, 12:3, 12:11,
13:27, 13:50, 14:2-5 and 14:19.

### Care lines included

9:32-35 (those who prayed and were not healed: the Acts 3 sentences, Find
Help); 9:36-43 (those who prayed beside a bed and the person did not wake,
Acts 7 form, Find Help); 12:1-5 (those whose prayer for rescue was not
answered, with Daniel 3:18, Find Help); 14:21-28 ("through many hardships":
not every hardship is to be endured in silence; help and safety; Find Help).

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each chapter: pass. At
the end, all 36 content-gate commands of ci.yml, one at a time: exit 0 each
(validate-bible-notes: 153 chapters in plain words; search index 732 entries
up to date; passage index 623 files match; verify-sources 22 texts intact).
`pnpm check`: clean. `pnpm test`: 146 files passed, 7 skipped; 1,676 tests
passed, 73 skipped. `pnpm build`: exit 0. Served with
`scripts/serve-like-vercel.mjs` on port 4600; a Playwright script (390 wide,
deviceScaleFactor 1, /api/trpc, /api/track and /_vercel stubbed) matched
every passage heading, its part headings in order and the first 60
characters under each to the data: Acts 8, 30 of 30 fields; 9, 28; 10, 26;
11, 20; 12, 17; 13, 26; 14, 21; no sideways scroll, no console or page
errors. Screenshots looked at: `/home/user/elite-shots/bdoor/acts8-390-*`
and `acts13-390-*`. Server stopped by PID, dist/ deleted, no lh-*.json.
Sitemap, prerender and Lighthouse not run (no code changed).

### Still unverified

The exact words of every ancient writer (paraphrased); Orthodox teaching on
justification; the age of the Samaritan hope of a prophet like Moses.

### Next

Acts 15 onward in plain words.

## Continuation: Acts 15 to 21 (2026-11-19)

### Acts 15 to 21 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Acts 15 | 6 (‘Unless you are circumcised’; Peter: ‘saved through grace, just as they are’; James: ‘The words of the prophets agree’; the letter: ‘It seemed good to the Holy Spirit and to us’; joy at Antioch; a sharp disagreement: Paul, Barnabas and Mark) | 4,265 |
| Acts 16 | 7 (Timothy joins Paul; ‘Come over to Macedonia and help us’; Lydia, the dealer in purple; an enslaved girl with a spirit; beaten with rods and thrown into prison; midnight: ‘What must I do to be saved?’; ‘We are Roman citizens’) | 4,745 |
| Acts 17 | 6 (Thessalonica: ‘the Christ had to suffer’; ‘Another king, named Jesus’; Berea: searching the Scriptures every day; Athens: a city full of idols; ‘To an unknown god’; ‘He has set a day’: some mock, some believe) | 3,641 |
| Acts 18 | 6 (Corinth: Aquila, Priscilla and the tentmakers; ‘Your blood be on your own heads’; ‘Do not be afraid; keep on speaking’; before Gallio; a vow at Cenchrea, and back to Antioch; Apollos, taught by Priscilla and Aquila) | 3,507 |
| Acts 19 | 8 (twelve disciples who knew only John's baptism; two years in the hall of Tyrannus; handkerchiefs and aprons; the seven sons of Sceva; burning the books of magic; Demetrius the silversmith; ‘Great is Artemis of the Ephesians’; the town clerk calms the city) | 3,781 |
| Acts 20 | 6 (through Macedonia and Greece, with the gift for Jerusalem; Eutychus falls from the window; hurrying toward Jerusalem; Paul's farewell: how he lived among them; ‘Be shepherds of the church of God’; ‘It is more blessed to give than to receive’) | 3,236 |
| Acts 21 | 5 (Tyre: farewell on the beach; Philip's daughters, and Agabus with the belt; James and the elders, and a vow in the temple; seized in the temple; ‘Aren't you the Egyptian?’) | 3,488 |
| Total | 44 | 26,663 |

After each chapter every passage was printed field by field (and a script
checked that each `happening` cites verses, each `ot` names Old Testament
Scripture and each `asks` asks); all 44 sit under their right headings.
`validate-bible-notes` and `validate-no-emdash` passed after each chapter
with no exceptions. Each chapter note gained only `"plain": true`. Acts 22
was not written.

### Sources

All in `bdoor-ledger.md` under "The plain notes on Acts 15" to "21". 31 web
searches: 6, 5, 5, 5, 4, 3, 3. Main sources: the Septuagint and Hebrew of
Amos 9:11-12; the Western text of 15:20 and 29 (Codex Bezae; NET note; Lake);
Leviticus 17-18 and the decree; the Westminster Confession chapter 31; the
seven councils; 15:34 in the manuscripts; the Mishnah's matrilineal rule and
its debated age; the dyers' guild at Thyatira; "spirit of python"; Theos
Hypsistos inscriptions; the lictors and duoviri of Philippi; Aratus,
Phaenomena 5, and the uncertain Epimenides line; Pausanias and Diogenes
Laertius on unknown gods' altars; Britannica, IEP and Stanford on Stoics and
Epicureans; the Areopagus; Gallio as Seneca's brother; the Corinth bema;
Paul's vow at Cenchrea; Priscilla named first four of six times; the
Ephesian letters; Sceva; the temple of Artemis; Asiarchs; the Lord's day in
the Didache and Justin; the text of 20:28; Ignatius and the single bishop;
Josephus on the Egyptian and the sicarii (Jewish War 2.254-263; Antiquities
20.169-172) and on Agrippa and the Nazirites (19.294); the Antonia. Reused:
the book page (Galatians 2 views, Claudius, Gallio, politarchs, "Acts and
the Jewish people"), the Roman-world portrait (Philippi, citizenship,
households, Corinth, Ephesus's theatre), the Jewish-life portrait (the
temple barrier inscription), the slavery Honest Answer, and the care lines
of Genesis 37, Matthew 27 and Acts 1.

### Cut or narrowed

Cut: a date for the council; the rabbinic "yoke of the law"; the Ethiopian
Orthodox food rules; Silas as Silvanus; the Noachide reading; the madder-root
dye; Hypsistos dates; why Paul did not claim citizenship (Luke does not
say); the girl's later life; the loyalty oaths to the emperor; Zeno's dates;
Isho'dad of Merv; Dionysius the Areopagite's later legend; Seneca's column;
the bema's date; the secrecy of magic books; the temple of Artemis as a bank
and its size; Paul's dates at Ephesus; the Didache's and Justin's dates; the
Antonia's garrison size; the year of Paul's arrival in Jerusalem.
Narrowed: Edom/adam "some think"; Gallio's ruling "many readers think";
Sosthenes "some think"; the Areopagus hill or council "scholars differ";
Epimenides "less certain"; Eutychus raised (most) or found alive (some);
"Hebrew" or Aramaic; Alexander's purpose "probably"; the temple gates shut
"probably" to keep blood from the holy place.

### Contested matters, and how they are stated

The council's question (Acts 15:1-5, hearers): "Their case deserves to be
heard in its strongest form, the way they would have put it. God himself
gave circumcision to Abraham, and he called it everlasting. The Law said
that a foreigner who wanted to share Israel's Passover must first be
circumcised. Jesus is the Messiah of Israel, the promised King of the Jews.
So anyone who wants to belong to Israel's Messiah should join Israel in the
way God's own Law had always laid down: by circumcision, and by keeping the
commandments. Their Bible said nothing about God one day setting this aside.
To them, welcoming Gentiles without it looked like treating God's word as if
it did not matter. They were Bible-believing men, and they were taking the
Bible seriously."

Galatians 2 and Acts 15 (the book page's three views, Antioch quarrel before
or after; no side). The four requirements of 15:20 (Leviticus 17-18; temple
worship; Codex Bezae's golden rule, most think later; do they still bind;
"these notes do not settle it"). What the letter settles for Jewish
believers ("The council made room for Gentiles without asking Jews to stop
being Jews"). Councils and authority (Catholic, Orthodox, Protestant with
Westminster 31, congregational; one sentence each; no side). Timothy's
circumcision with Galatians 2:3 and 5:2 (most readers; some scholars doubt
Luke; no side).

Household baptisms (Acts 16:11-15, hard): "‘She and her household had been
baptized.’ Did that household include infants? Christians who baptize babies
and Christians who baptize only believers both read this verse, and the
jailer's household later in this chapter (verse 33), with care. These notes
set out both readings and do not choose between them." Then the
infant-baptizing reading (covenant household, 2:39, 1 Corinthians 1:16) and
the believer-baptizing reading (16:32, 34; 18:8), and "The text does not
tell us the ages of anyone in Lydia's house. The note on Acts 2:37-41 sets
out the wider views of baptism."

The enslaved girl (Acts 16:16-18): "Say it plainly: this girl was enslaved,
and she was being used. Luke tells us she ‘earned a large income for her
masters’. She had more than one owner. They made money from her, and, as the
next verses show, the moment the money stopped they cared nothing for her at
all. She was a person treated as a business." And (hard): "What became of
her? The text does not say. Luke tells us the spirit left her, and then he
follows her owners, not her." With the slavery Honest Answer and the
trafficking care line.

Paul at Athens (common ground and its limits; did Athens fail; no side).
Priscilla teaching (Acts 18:24-28, hard): "Priscilla, with her husband,
explained the way of God to Apollos, a man and a preacher. What does this
mean for women teaching in the church? Christians who hold different views
both read this verse carefully. These views are held by faithful believers,
and these notes do not choose between them." Then the complementarian and
the egalitarian readings each in its holders' terms, and "Both sides agree
on much: Priscilla was a gifted and respected servant of Christ, she knew
the faith well enough to correct a famous preacher, and Luke honours her for
it." Philip's daughters point back to it.

The twelve at Ephesus (not rebaptism of believers; Pentecostal and
"one conversion" readings; confirmation; pointing back to 2, 8 and 10).
Selling blessed objects: "Nothing in this passage supports that." Sunday
worship (Sunday; Saturday Sabbath-keepers; freedom; no side). Church offices
(pointing back to 14:21-28, with Ignatius). 20:28's text and grammar. Was
Paul right to go (most; a few; "guidance is not a formula"). The temple vow
and Galatians (three readings; no side). "The Jews" in the 13:42-47 form,
with a pointer back, at 17:5, 17:13, 18:5-6, 18:12-14, 18:28, 19:33, 20:3,
20:19, 21:11 and 21:27. "Another king" with no modern political use.
Artemis's city shown without contempt; the town clerk's fairness.

### Care lines included

16:16-18 (trafficking, the Genesis 37 form, with Find Help); 16:25-34 (the
jailer): "The jailer was about to kill himself. Luke tells it in one
sentence, and Paul's shout stops it. A word of care. Some people come to a
moment when everything seems lost, and ending their life seems the only way
out. If that is you, please do not carry it alone. Tell God, and tell
someone near you: a friend, a pastor, a doctor. If you have thought of
ending your life, please reach out today to a crisis line or emergency
service where you live. The Find Help page on this site lists places to
turn. Paul's first words to the jailer were, ‘Do not harm yourself.’ The
night that looked like the end was the night his house was filled with
joy."

### What was run, and what passed (watched)

`validate-bible-notes` and `validate-no-emdash` after each chapter: pass. At
the end, all 36 content-gate commands of ci.yml, one at a time: exit 0 each
(validate-bible-notes: 160 chapters in plain words; search index 732 entries
up to date; passage index 623 files match; verify-sources 22 texts intact).
`pnpm check`: clean. `pnpm test`: 146 files passed, 7 skipped; 1,679 tests
passed, 73 skipped. `pnpm build`: exit 0. Served with
`scripts/serve-like-vercel.mjs` on port 4600; a Playwright script (390 wide,
deviceScaleFactor 1, /api/trpc, /api/track and /_vercel stubbed) matched
every passage heading, its part headings in order and the first 60
characters under each to the data: Acts 15, 26 of 26 fields; 16, 32; 17, 26;
18, 25; 19, 34; 20, 25; 21, 22; no sideways scroll, no console or page
errors. Screenshots looked at: `/home/user/elite-shots/bdoor/acts15-390-*`
and `acts16-390-*`. Server stopped by PID, dist/ deleted, no lh-*.json.
Sitemap, prerender and Lighthouse not run (no code changed).

### Still unverified

The exact words of every ancient writer (all paraphrased); the Orthodox and
Catholic teaching on councils beyond the general sentence; the first-century
date of the matrilineal rule (stated as argued).

### Next

Acts 22 onward in plain words.

## Continuation: Acts 22 to 28 (2026-11-19)

### Acts 22 to 28 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Acts 22 | 6 (‘Brothers and fathers’: who Paul was; the light at noon, told a second time; Ananias: ‘Get up, be baptized’; in the temple: ‘I will send you far away’; the crowd turns at one word; ‘I was born a citizen’) | 3,447 |
| Acts 23 | 7 (‘You whitewashed wall’; ‘I am a Pharisee’: the resurrection divides the council; ‘Take courage’; more than forty men swear to kill Paul; Paul's nephew exposes the plot; an escort, and Claudius Lysias's letter; by night to Antipatris and Caesarea) | 3,490 |
| Acts 24 | 6 (Tertullus brings the charges; Paul's defence: ‘the Way’, and the hope of resurrection; alms for his people, and the missing accusers; Felix puts off the case; ‘Righteousness, self-control, and the coming judgment’; two years, and no answer) | 2,973 |
| Acts 25 | 5 (a new governor, and an old plot; the hearing at Caesarea; ‘I appeal to Caesar’; Festus explains the case to King Agrippa; Paul brought before Agrippa and Bernice) | 2,574 |
| Acts 26 | 7 (Paul speaks before King Agrippa; on trial for the hope of Israel; Paul the persecutor; ‘It is hard for you to kick against the goads’; ‘I was not disobedient to the heavenly vision’; Festus: ‘You are insane’, and Agrippa's reply; ‘This man could have been released’) | 3,007 |
| Acts 27 | 7 (from Caesarea to Crete; Paul's warning is overruled; the Northeaster, and the loss of hope; ‘Take courage’: Paul's word from the angel; near land, and the sailors' escape stopped; Paul breaks bread in the storm; the wreck, and everyone brought safely to land) | 3,527 |
| Acts 28 | 6 (Malta, a fire, and a viper; Publius's father, and the sick of the island; to Rome by the Appian Way; Paul meets the Jewish leaders of Rome; some convinced, some not, and Isaiah's words; two years, and the word unhindered) | 3,944 |
| Total | 44 | 22,962 |

**The whole book, now complete:** 28 chapters, 165 passages, 95,163 words
(counted afresh over all 28 files, fields `happening` to `asks`; the earlier
per-run tables, summed, come to slightly more because some passages were
trimmed after they were counted).

Every passage was printed field by field after its chapter: all 44 sit under
their right headings. `validate-bible-notes` and `validate-no-emdash` passed
after each chapter with no exceptions. Each chapter note gained only
`"plain": true`. One commit per chapter, with its ledger rows.

### Sources

All in `bdoor-ledger.md` under "The plain notes on Acts 22" to "28". 20 web
searches: 1, 2, 5, 2, 2, 3, 5. Main sources: the Roman scourge (Bible
encyclopedias); Ananias son of Nedebaeus in Josephus (Antiquities 20.205-207;
Jewish War 2.441, paraphrased); Antipatris's distance; Tacitus on Felix
(Annals 12.54; Histories 5.9, paraphrased); Josephus on Felix, Jonathan and
Drusilla (Antiquities 20.141-143, 162-164, paraphrased); Festus's arrival
(between about 58 and 60 for most; some earlier); 24:7 and 28:29 in the
manuscripts; Agrippa II's temple powers; Bernice and the ancient rumours
(Josephus, Juvenal), stated as rumours; Nero's early years; the goads
proverb (Aeschylus, Euripides); the renderings of 26:28; James Smith, The
Voyage and Shipwreck of St. Paul (1848); Euraquilo; Phoenix; the
undergirding and the sea anchor; 276 and "about seventy-six"; barbaroi;
Publius's title; why Acts ends (Asbury, Crossway); 1 Clement 5; Eusebius,
Church History 2.22 and 2.25. Reused: the Roman-world portrait (citizenship,
appeal, Vegetius and the sailing season, the Fast, Puteoli, the Appian Way,
Castor and Pollux, "our sovereign one"), the Jewish-life portrait (Pharisees,
Sadducees, the Sanhedrin, the barrier notices), the book page (dates, the
Jewish people, the ending), the Acts 2, 9 and 13 notes, the Mark 16 note.

### Cut or narrowed

Cut: Gamaliel as Hillel's grandson; Jerome's Gischala; the Porcian law
dates; the forum domicilii rule; Antipatris named for Antipater; the
"spearmen" puzzle; Felix's Cypriot magician; the claim that releasing
prisoners for money was common; Agrippa II as the last Herod; the number of
commanders; Pindar's goads; Smith's own figures; Vaticanus at 27:37;
Hobart's medical language; snakes on Malta today; Jerome's date for Paul's
death; the seven imprisonments of 1 Clement. Narrowed: Ananias's years
("about a dozen ... end date varies"); Tacitus on Pallas shielding Felix
("suggests"); Antipatris "roughly forty miles"; Publius's inscriptions "are
reported"; the 28:29 addition "many think"; "granted" as Paul's prayer
"many readers think".

### Contested matters, and how they are stated

22:16 (sacramental and sign readings; the grammar; pointer to 2:37-41; no
side). Using one's rights (22:25-30; 25:9-12; readings, no rule). Paul's
reply to Ananias (did not recognise him; irony; accepted rebuke; "Luke does
not settle it"). Tactic or sincerity at 23:6. Festus's date. 24:7 and 28:29.
26:10 "cast my vote". 26:28 ("Scholars do not agree, and these notes do not
choose"). The meal of 27:35. Promise and action at 27:31: "Those who stress
God's sovereign rule, such as Reformed Christians, say that God ordains the
means as well as the end ... Those who stress human freedom, such as
Arminian and Wesleyan Christians, say that God's promises often come with
conditions that real human choices can affect. These notes do not choose
between them." Romans 11:26 (three readings; no side on its fulfilment).
Luke's meaning at 28:28. Why Acts ends (three views, no side). Paul's
release and second imprisonment; 2 Timothy's setting and authorship. "The
Jews" in the 13:42-47 form with pointers at 22:22-24 (the crowd), 23:12,
23:20, 23:27, 24:9, 24:18-19, 24:27, 25:2, 25:7-10, 25:24, 26:2, 26:7,
26:21, 28:19.

### Care lines included

24:27 (those kept waiting by an unjust system, the Acts 12 form, with Find
Help); 28:7-10 (those who prayed and were not healed, pointing to the Acts
3:1-10 note and Find Help); 28:1-6 (no snake handling, no testing God, no
refusing medical care). None in Acts 27: the text did not call for one.

### What was run, and what passed (watched)

After each chapter: `validate-bible-notes` (partial, acts) and
`validate-no-emdash`: pass. At the end, all 36 content-gate commands of
ci.yml, one at a time: exit 0 each (validate-bible-notes: 167 chapters in
plain words; search index 732 entries up to date; passage index 623 files
match; verify-sources 22 texts intact). `pnpm check`: clean. `pnpm test`:
146 files passed, 7 skipped; 1,679 tests passed, 73 skipped. `pnpm build`:
exit 0. Served with `scripts/serve-like-vercel.mjs` on port 4600; a
Playwright script (390 wide, deviceScaleFactor 1, /api/trpc, /api/track and
/_vercel stubbed) matched every passage heading, its part headings in order
and the first 60 characters under each to the data: Acts 22, 25 of 25
fields; 23, 28; 24, 26; 25, 21; 26, 28; 27, 28; 28, 27. Then over all
twenty-eight chapters of Acts: 165 of 165 passages, 716 of 716 fields, no
sideways scroll, no console or page errors on any chapter. Screenshots
looked at: `/home/user/elite-shots/bdoor/acts27-390-*` and `acts28-390-*`.
Server stopped by PID, dist/ deleted, no lh-*.json. Sitemap, prerender and
Lighthouse not run (no code changed).

### Still unverified

The exact words of every ancient writer (all paraphrased); the find-spot of
the Publius inscriptions; which manuscripts read seventy-six at 27:37.

### Next

Acts is complete in plain words. The next book is for the lead to choose.

## Psalms: the book page and Psalms 1 to 10 (2026-11-19)

### The book page (`/study/bible/psalms`, same address)

Data only, in `client/public/bible/notes/psalms/intro.json`, field `teaching`,
added at the end of the file (the rest untouched). Nineteen headed parts: The
Psalms in a minute; ‘Praises’: the book's name; Five books, and the blessings
that close them; Who wrote the psalms; What the headings tell you; When they
were written; How Hebrew poetry works; ‘Selah’ and the words for music; Kinds
of psalm; The Psalms and the temple; The Psalms in the Dead Sea Scrolls and in
Greek; Why the numbers differ; The cursing psalms; Sheol, and what the
psalmists knew of life after death; When a psalmist says he is innocent; ‘Why
have You forsaken me?’; How the New Testament uses the Psalms; The king's
psalms: how Jews and Christians read them; How to read and pray a psalm.
Then 14 hard passages (2:12, 6:5, 7:8, 8:5, 10:4, 22:1, 44:22, 51:5, 58:10,
82:6, 88:18, 109:9, 110:1, 137:9), 14 key words (hesed, the LORD, torah,
Sheol, Zion, Selah, anointed one, the righteous, refuge, wait, ashre, nephesh,
Hallelujah, lament), a timeline of 13 entries, one map on the "israel" frame
(Jerusalem/Zion, the Jordan, Shechem, Gilead as a region, Tyre: the places
Psalms 60, 42, 45 and 87 name), a `mapNote` (Babylon and Egypt lie beyond the
frame), and six Go deeper pages (the lament study guide, the Honest Answers on
anger at God and on suffering, Psalm 91 in context, messianic expectation, the
Old Testament world portrait).

Words: 5,662 in the nineteen parts (the brief asked about 4,000; the hard
things and the Jewish and Christian readings took the extra); 974 in the
lists, timeline and map.

The validator requires a map once a book has a teaching introduction, so the
book could not go without one. The map shows the land the psalms name; a
"fertile-crescent" map with Babylon would have meant changing the frames test,
which this run was not to touch.

**Code.** None changed in the app. `teaching.test.tsx` adds "psalms" to the
list of books with a guide (one line).

### Psalms 1 to 10 in plain words

| Psalm | Passages | Plain words |
|---|---|---|
| 1 | 2 (the tree by the streams; chaff, and the two ways) | 1,337 |
| 2 | 3 (‘Why do the nations rage?’; God laughs, and ‘You are My Son’; ‘Kiss the Son’) | 1,718 |
| 3 | 2 (surrounded: ‘a shield’; sleep, and ‘Arise, O LORD’) | 1,162 |
| 4 | 2 (‘Be angry, yet do not sin’; more joy than a harvest, sleep in peace) | 1,114 |
| 5 | 2 (a morning plea, and the God who hates evil; ‘Lead me’) | 1,194 |
| 6 | 2 (‘How long?’; ‘I flood my bed’, and ‘The LORD has heard’) | 1,466 |
| 7 | 3 (hunted, ‘if I have done this’; God the judge; the pit he dug) | 1,498 |
| 8 | 2 (‘How majestic’, and the praise of children; the night sky, ‘what is man?’) | 1,381 |
| 9 | 2 (the judge who does not forget; the gates of death and of Zion) | 1,030 |
| 10 | 2 (‘Why do You stand far off?’; the helper of the fatherless) | 1,391 |
| Total | 22 | 13,291 |

Each note gained only `"plain": true` at its end (Psalm 2's file has no
final newline and keeps none). After each psalm every passage was printed
field by field and read: all 22 sit under their right headings.

**Poetry in the five fields.** `happening` quotes the psalm and names its
turns (the "But You" of 3:3, the sudden turn at 6:8, the refrain that frames
Psalm 8); `hearers` holds the heading, the kind of psalm, the Hebrew word
(ashre, hagah, ragaz, elohim, bar) and the world behind the image (irrigation
channels, the threshing floor, the city gate, the avenger of blood, Sheol);
`later` names the New Testament's quotations by book and verse, or another Old
Testament book where the New Testament is silent (Psalm 3: 2 Samuel, Jonah;
Psalm 7: Job 31, Jeremiah). What did not fit cleanly: the heading belongs to
verse 1 in the BSB, so the heading is quoted in `happening` and explained in
`hearers`; and the two-psalm acrostic of 9 and 10 is explained twice, once in
each.

### Sources

All in `bdoor-ledger.md` under "The Psalms' book page" and "The plain notes on
Psalm 1" to "10", with a stricter quotation check at the end. 18 web searches:
10 for the book page, then 2, 2 (plus the book page's Rashi search), 0, 1, 0,
1, 1, 2, 0, 0. Main sources: Lowth (1753); Gunkel and Begrich, Einleitung in
die Psalmen (1933); the Great Psalms Scroll (11Q5) and the counts of Psalms
manuscripts at Qumran; Psalm 151 in the Septuagint; the Greek and Latin
numbering; the le-David debate; the acrostics; Psalm 110:1's use in the New
Testament; Bonhoeffer (1940) and Lewis (1958) on the cursing psalms; Rashi on
Psalm 2 with Berakhot 7b; Berakhot 9b on Psalms 1 and 2 as one; the Rule of
Benedict 18; daily Jewish morning prayer (145 to 150) and the festival Hallel;
ashre; kiss the Son (the Septuagint, Vulgate, Targum, Aramaic and Hebrew bar);
Ephesians 4:26 and the Septuagint of 4:4; the penitential psalms; Shiggaion
and Cush; elohim in 8:5; strength and praise in 8:2. Counts by script over
the repository's Strong's numbers and BSB text: Selah 71, hesed 127, Sheol 16,
Zion 38, headings by name. Scripture is the BSB, checked word for word.

### Cut or narrowed

Cut: Athanasius's Letter to Marcellinus; Zenger by name; Rashi's dates and
place; Jerome's Hebrew psalter at 2:12; the "kiss his feet" emendation; kings
called sons of gods and Egypt's god-king; subject nations rebelling at a new
king; Codex Bezae by name; the Asherah etymology; the Gath and wine-press
senses of Gittith; "the ancient translators" on Selah; the large body shield;
a guest under a host's protection; Hammurabi on orphans; Brevard Childs; the
harvest seasons; "the most quoted book" as a flat claim. Narrowed: Psalms and
Isaiah "more than almost any other Old Testament book"; Qumran "from about 36
to about 40" manuscripts; the five books and the Torah "these notes leave the
question open"; the songs of ascents "a likely reading"; the Hallel at
Passover "probably"; the penitential grouping "known from the sixth century".

### Contested matters, and how they are stated

"Of David" (traditional, critical, between; "These notes do not settle it").
The headings' age and authority ("debated among believers and scholars
alike"). Dates (some early, some after the exile; scholars do not agree). The
Great Psalms Scroll (two views). The five books and the Torah (open). The
cursing psalms (four readings, "these notes do not choose"; one thing not
open). Sheol (rescue from early death, or first light of a later hope; many
hold both). Innocence (of a charge; loyalty; prayers Jesus prays in full).
"Forsaken" (three readings, "not enemies"). The royal psalms (Jewish and
Christian readings, "Neither reading is dishonest"). Psalm 1:3 (proverb, inner
fruit, final judgment). Psalm 4:4 (anger or tremble). Psalm 5:5 (hate as
rejection; opposition and love; the court). Psalm 6's turn (a priest's word
or a change within). Psalm 8:5 (God, heavenly beings, both); no position on
the age of the earth or evolution; no modern political use of "ruler". Psalm
10:4 (practical godlessness; honest unbelievers not its target).

**Of David, on the page:** "People who study the Psalms read this in different
ways. The traditional view, held by Jews and Christians for many centuries and
by many scholars today, is that le-David names the author in most cases. ...
Many critical scholars ... think most headings were added later by the people
who collected the psalms. ... Many hold a view in between ... The headings are
old. ... But how old they are, and how much weight they carry, is debated
among believers and scholars alike. These notes do not settle it."

**The cursing psalms, on the page:** "Christians have answered in several
ways. Each is held by thoughtful believers, and these notes do not choose
between them." Then four readings (honest prayer handing vengeance to God; the
voice of the oppressed; fulfilled or changed at the cross, with Bonhoeffer;
not for Christian lips, with Lewis). Then: "One thing is not open. No reading
of these psalms has ever made it right to harm anyone, least of all a child.
They are prayers spoken to God, not commands to people."

**"You are My Son" (Psalm 2:4-9, hard):** "Both readings take the words
seriously and with love. Neither is a trick or a dodge. The difference
between them is real: it is the question of who Jesus is. It should be named
plainly and discussed with respect." And: "This psalm is not about any modern
nation."

**Psalm 6 care line (6:6-10, hard):** "The psalm does not give his sorrow a
medical name, and these notes do not give anyone's sorrow a name either. But
if your nights are like the nights in this psalm, please do not carry them
alone. Tell someone you trust: a doctor, a pastor, or a friend. When grief or
sadness lasts and starts taking sleep, appetite or work, seeing a doctor is
wise, and it is not a failure of faith. If you have thoughts of hurting
yourself, please speak to someone now: a doctor, a pastor, a trusted friend,
or a crisis line. The Find Help page on this site lists places to turn."

Other care lines: Psalm 4 (anger that frightens anyone at home: someone
trusted and Find Help; long sleeplessness: a doctor). No phone number.

### What was run, and what passed (watched)

`validate-bible-notes psalms` after each psalm: pass, no exceptions. A
stricter quotation script (case, punctuation, no em-dash) found four
quotations the validator's looser match passed; all four fixed. At the end,
all 36 content-gate commands of ci.yml, one at a time: exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 177 chapters in
plain words; validate-no-emdash 260 files, 0; search index 732 entries up to
date; passage index 623 files match; verify-sources 22 texts intact). `pnpm
check`: exit 0. `pnpm test`: 146 files passed, 7 skipped; 1,679 tests passed,
73 skipped. ESLint on the changed test: clean. `pnpm build`, `pnpm run
sitemap`, `pnpm run prerender` (3,028 pages), `pnpm run audit:canonicals`:
exit 0.

Served with `scripts/serve-like-vercel.mjs` on port 4602; Playwright at
deviceScaleFactor 1 with `/api/trpc`, `/api/track` and `/_vercel/*` stubbed.
Book page at 390 and 1440: 19 of 19 parts render as headings with the data's
text, 13 timeline entries, the map and its note, no sideways scroll, no
console or page errors. Psalms 1 to 10 at 390: every passage heading, its part
headings in order (the third is "Where the Bible takes this up") and the first
60 characters under each matched the data: 9, 13, 9, 9, 9, 10, 13, 9, 8, 9
fields; no sideways scroll, no errors. Screenshots looked at:
`/home/user/elite-shots/bdoor/ps-book-390-*.png`, `ps-book-1440-*.png`,
`ps6-390-*.png`, `ps8-390-*.png`. After the look, one data-only change: the
timeline's temple entry gained "by the usual dating" (validator passed after).
Lighthouse (ci.yml command, three runs, `/study/bible/psalms`): median
performance 84, accessibility 100, best practices 96, SEO 100, CLS 0.000.
Server stopped by PID, dist/ deleted, no lh-*.json.

### Still unverified

The exact words of every later writer (all paraphrased); the date of the
Septuagint's Psalms ("before the time of Jesus"); the Greek of Psalm 1:1 and
the Beatitudes; whether Psalm 37 is a complete acrostic (sources differ;
the page says "some with a letter missing or out of place").

### Next

Psalm 11 onward, in the same shape. At this depth a psalm takes about 1,300
words; 140 more psalms is roughly 180,000 words. A lighter shape (one passage
for most short psalms, `hard` only where a real difficulty exists) would serve
readers of the many short psalms better; that is for the lead to decide.

## Continuation: Psalms 11 to 41 (2026-11-19)

James, on 2026-11-19: "finish the psalms and the rest of the bible doing
that". The lead's lighter shape is the rule from Psalm 11 on: most psalms are
one passage for the whole psalm (about 450 to 700 words), with `hard` only
where the psalm has a difficulty of its own; the major psalms of Book One
(16, 18, 19, 22, 23, 24, 27, 32, 34, 37, 40) are at full depth, in two or
three passages.

**Code.** None changed. The validator (`prose(... p.hard ...)` runs only when
`p.hard != null`), the type (`hard?: string` in `client/src/lib/bible-notes.ts`)
and `PlainPassages.tsx` (a part with no text returns `null`, so no heading)
already let `hard` be absent; Psalm 8:1-2 had shipped without one. The
rendered check below confirms no "The hard verse" heading appears for a
passage without it.

### Per psalm

| Psalm | Shape | Passages | `hard` | Words |
|---|---|---|---|---|
| 11 | lighter | 1 | none | 494 |
| 12 | lighter | 1 | none | 451 |
| 13 | lighter | 1 | care line | 578 |
| 14 | lighter | 1 | yes | 626 |
| 15 | lighter | 1 | yes | 584 |
| 16 | full | 2 | 2 | 1,250 |
| 17 | lighter | 1 | one line to the book page | 500 |
| 18 | full | 3 | 3 | 1,753 |
| 19 | full | 2 | 2 | 1,129 |
| 20 | lighter | 1 | short | 505 |
| 21 | lighter | 1 | short | 485 |
| 22 | full | 3 | 3 | 2,186 |
| 23 | full | 2 | 1 | 1,132 |
| 24 | full | 2 | 1 | 936 |
| 25 | lighter | 1 | none | 533 |
| 26 | lighter | 1 | one line to the book page | 500 |
| 27 | full | 2 | 2 | 1,144 |
| 28 | lighter | 1 | short | 464 |
| 29 | lighter | 1 | none | 548 |
| 30 | lighter | 1 | yes | 540 |
| 31 | lighter | 1 | short | 520 |
| 32 | full | 2 | 2 | 1,067 |
| 33 | lighter | 1 | none | 469 |
| 34 | full | 2 | 2 | 1,192 |
| 35 | lighter | 1 | short | 470 |
| 36 | lighter | 1 | none | 450 |
| 37 | full | 3 | 2 | 1,632 |
| 38 | lighter | 1 | yes, care | 722 |
| 39 | lighter | 1 | yes, care | 615 |
| 40 | full | 3 | 2 | 1,417 |
| 41 | lighter | 1 | yes | 614 |
| Total | | 46 | 36 | 25,506 |

Lighter psalms: 20, averaging 531 words. Full psalms: 11, averaging 1,350.
Each note gained only `"plain": true` at its end.

### Sources

All in `bdoor-ledger.md`, "The plain notes on Psalm 11" to "41". 14 web
searches: Psalm 16 (1), 19 (2), 22 (3), 23 (2), 24 (1), 24 and 29 together
(1, Ugarit), 37 (1), 40 (1), and none for the other 23 psalms, whose claims
rest on the BSB, the repository's deep notes and Hebrew data, and earlier
ledger rows. Scripts over the repository's Hebrew and headings checked: the
alphabet patterns of 25, 33, 34 and 37; Miktam (16, 56-60), Maskil (from 32),
Jeduthun (39, 62, 77), "for remembrance" (38, 70); kasah and nasa repeated in
32:1 and 32:5; mabbul only in Genesis 6 to 11 and 29:10; hevel three times in
Psalm 39 and in Ecclesiastes 1:2; the doubled verb of 40:1 and "ears You dug"
in 40:6.

### Cut or narrowed

Cut (not verified this run): Justin Martyr and Tertullian on 22:16, Pesikta
Rabbati, Bach and Handel, Peter Flint by name, the Givat HaMivtar skeleton
(all in Psalm 22's deep note); Papyrus Amherst 63 (Psalm 20); the Targum's
"King Messiah" (Psalm 21); the year Ugarit was found; the host's duty to
protect a fugitive guest (Psalm 23); "Israel was not a sea-going people"; "a
broken pot was not mended"; Babylon's creation-by-combat story (Psalm 33).
Narrowed: Psalm 13 "one of the shortest laments in the Psalms" (not "the
shortest in the Bible"); Psalm 24 on Ascension Day became "Many Christians
read verses 7 to 10 of Jesus going up into heaven"; Psalm 31:5 "Many
Christians say it before sleep" became an invitation; Hammurabi "in his law
code" (prologue or epilogue left unstated, since sources differ); the Nahal
Hever fragment "about the first century AD". One error caught by script and
fixed: a draft said "hide" (32:3-4) and "hiding place" (32:7) were one Hebrew
word; they are not, and the sentence now names the words that are repeated
(32:1 and 32:5).

### Contested matters, and how they are stated

Psalm 16:10 (did David mean resurrection: three views, all agreeing the
apostles read it of an event). Psalm 19 (one poem or two; "Christians hold
different views on those, and Psalm 19 does not take a side" on the age of
the earth and evolution). Psalm 22:1 (the book page's three readings, "They
are not enemies"; Jewish readings with respect: Megillah 15b and Esther,
Purim, Rashi's Israel in exile). Psalm 22:16 (ka'ari and the verb; Jewish
and Christian cases; "no one needs to accuse the other side of bad faith").
Psalm 23 (tsalmavet: "shadow of death" or "deep darkness"). Psalm 27 (one
psalm or two). Psalm 30's heading (three readings; "These notes leave it
open"). Psalm 34's Abimelech (title or slip). John 19:36 (Psalm 34:20, the
Passover law, or both). Psalm 37:25 (three readings; one use ruled out).
Psalm 40:6 and Hebrews 10:5 (Hebrew "ears", Greek "a body"; two readings).
Royal psalms 18, 20, 21: no modern nation or army.

**Psalm 22:1, on the page:** "The book page on the Psalms sets out the three
main ways Christians have read the cry ... Christians often hold these
together. They are not enemies. Jewish readers have long read the psalm in
other ways, and those deserve to be known. The Talmud (Megillah 15b) pictures
Queen Esther speaking its first line as she went in, uncalled and in danger,
to the Persian king. ... The medieval teacher Rashi read the ‘I’ of the
psalm as the people of Israel in exile, crying to God through a long night."

**Psalm 22:16, on the page:** "Here the ancient copies differ, and it is
honest to say so. The standard Hebrew text, called the Masoretic text, reads
a word that means ‘like a lion’ ... Other old witnesses have a verb instead.
The Greek translation, made by Jewish scholars before the time of Jesus,
reads ‘they dug’. A small Psalms fragment from the Judean desert, found at
Nahal Hever and copied about the first century AD, has a spelling that many
scholars read as a verb, though others say the letter is too faint or the
scribe too careless to be sure. ... the Gospels never quote this verse, so
nothing in the Christian reading of Psalm 22 depends on settling it."

**Psalm 23 care line:** "If you are grieving, this psalm does not ask you to
feel calm. Read it slowly, and let the shepherd be with you in the valley you
are in. Grief is not a failure of faith. If your grief has become too heavy
to carry, please tell someone you trust, a pastor, a friend or a doctor. The
Find Help page on this site lists places to turn."

**Psalm 38 on illness:** "If you are ill, this psalm does not mean God is
punishing you. Please do not let anyone tell you that it does."

Other care lines: 13 (shortened from Psalm 6, pointing back to it), 22:1-11,
27:7-14 (parents who left), 30, 32 (illness not a sign of hidden sin), 39
(wanting to "be no more"), 40:1-5. No phone number anywhere.

### What was run, and what passed (watched)

After every commit: `node scripts/validate-bible-notes.mjs psalms` passed with
no exceptions, the strict quotation script (case and punctuation kept, no
em-dash, no "..." inside a quotation, no `!` outside quoted Scripture) was
run, and every passage was printed field by field and read; all 46 sit under
their right headings. The strict script's last run over 11 to 41 flags only
reviewed false positives: "blessed" inside quoted Scripture or as a verb, the
`!` of quoted Scripture in two titles (24:7-10, 26), and three quotations whose
reference stands before the quote rather than after it.

At the end, one at a time: all 36 content-gate commands in ci.yml, exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 208 chapters in
plain words; validate-no-emdash 260 files, 0; search index 732 entries up to
date; passage index 623 files match; verify-sources 22 texts intact). `pnpm
check`: exit 0. `pnpm test`: 146 files passed, 7 skipped; 1,679 tests passed,
73 skipped. `pnpm build`: exit 0.

Rendered check: served with `scripts/serve-like-vercel.mjs` on port 4603;
Playwright at 390 wide, deviceScaleFactor 1, with `/api/trpc`, `/api/track` and
`/_vercel/*` stubbed. Psalms 11 to 41: 46 passages, 220 parts. Each passage's
heading and each part's heading and first 60 characters matched the data. The
10 passages without `hard` show no "The hard verse" heading. No sideways
scroll, no console or page errors. Screenshots looked at:
`/home/user/elite-shots/bdoor/ps13-390-p0.png` (lighter shape),
`ps22-390-p0.png` to `p2.png`, `ps23-390-p0.png` and `p1.png`. Server stopped
by PID, dist/ deleted, no lh-*.json. No code changed, so no ESLint run and no
Genesis or Acts check was needed.

### Next

Psalm 42, the start of Book Two, in the same lighter shape. At this rate a
lighter psalm takes about 530 words and a major one about 1,350. One run
covered 31 psalms (11 full, 20 lighter) in about 25,500 words. Book Two
(42 to 72) and Book Three (73 to 89) together make one run of about the same
size. The remaining 109 psalms come to roughly four runs.

## Continuation: Psalms 42 to 72 (2026-11-19)

All of Book Two, in the lighter shape James accepted ("finish the psalms and
the rest of the bible doing that", 2026-11-19). Most psalms are one passage;
the major psalms of Book Two (42 and 43 as one poem, 46, 51, 63, 69, 72) are
at full depth in two or three passages, and 45, 49, 50, 55, 58 and 68 have a
little more room in two. `hard` appears only where a psalm has a difficulty
of its own. Each note gained only `"plain": true` at its end. No code changed.
The notes point to the book page for Sheol, the cursing psalms, the
headings, "of David", claims of innocence and the royal psalms instead of
repeating it; the book page was not edited.

### Per psalm

| Psalm | Shape | Passages | `hard` | Words |
|---|---|---|---|---|
| 42 | full (with 43) | 2 | care line | 1,115 |
| 43 | full (with 42) | 1 | none | 484 |
| 44 | lighter | 1 | yes | 675 |
| 45 | more room | 2 | 1 (45:6) | 1,107 |
| 46 | full | 3 | 1 (no modern city) | 1,198 |
| 47 | lighter | 1 | none | 479 |
| 48 | lighter | 1 | short | 504 |
| 49 | more room | 2 | 1 (49:15) | 816 |
| 50 | more room | 2 | 1 | 902 |
| 51 | full | 3 | 2 | 1,929 |
| 52 | lighter | 1 | short | 535 |
| 53 | lighter | 1 | none (points to 14) | 480 |
| 54 | lighter | 1 | none | 436 |
| 55 | more room | 2 | 1 (to the book page) | 874 |
| 56 | lighter | 1 | none | 451 |
| 57 | lighter | 1 | none | 440 |
| 58 | more room | 2 | 1 (58:6-10) | 1,037 |
| 59 | lighter | 1 | short | 499 |
| 60 | lighter | 1 | none | 477 |
| 61 | lighter | 1 | none | 447 |
| 62 | lighter | 1 | none | 461 |
| 63 | full | 2 | 1 | 975 |
| 64 | lighter | 1 | none | 431 |
| 65 | lighter | 1 | none | 433 |
| 66 | lighter | 1 | yes (66:18) | 502 |
| 67 | lighter | 1 | none | 453 |
| 68 | more room | 2 | 2 | 1,075 |
| 69 | full | 3 | 2 | 1,739 |
| 70 | lighter | 1 | none (points to 40) | 454 |
| 71 | lighter | 1 | none | 588 |
| 72 | full | 3 | 1 | 1,406 |
| Total | | 47 | 20 | 23,402 |

### Sources

All in `bdoor-ledger.md`, "The plain notes on Psalm 42" to "72". Corrected
on 2026-11-20 to agree with the ledger: 18 ledger rows rest on a web search,
and they cite these searches by psalm: 42 (the Gethsemane echo; the ledger
counts it as one search shared with 43), 43 (the manuscripts joining 42 and
43), 45 (2, the translations of 45:6 and the Targum), 46 (1, "be still" and
Luther's hymn, two rows), 48 (1, Zaphon), 51 (2, 51:5 and 51:11, three rows),
63 (1, the morning psalm), 68 (2, the cloud-rider title and Ephesians 4:8),
69 (1, the New Testament uses, 69:5 and the curses, three rows), and 72 (2:
Hammurabi's laws, in Harper's and King's translations, and the Targum). The
list first printed here said "14 web searches" and did not give Hammurabi
its own entry; the ledger's own headings add to 13 or 14, depending on
whether 42 and 43 are counted apart. Scripts over
the repository's Hebrew word data checked: the counts of YHWH and Elohim in
Books One and Two (273 and 49; 28 and 198); tehom in 42:7 and Genesis 1:2;
nimtsa me'od (46:1); 'imanu and Immanu-el; "take" (49:15, Genesis 5:24,
73:24); bara (51:10); "Holy Spirit" in the Old Testament only at 51:11 and
Isaiah 63:10-11; elem in 58:1; 'akh six times in Psalm 62; dumiyah (62:1,
65:1); hevel (62:9); "fat and fatness" (63:5); the word for dawn (63:1);
dabaq (63:8, Genesis 2:24, Ruth 1:14); "the river" (66:6). The BSB was
compared for 53 and 14, 57:7-11 and 108:1-5, 60:5-12 and 108:6-13, 70 and
40:13-17, 71 and 31, and the "of David" headings after 72.

### Cut or narrowed

Cut (not verified this run, or met only secondhand): the claim that the Greek
translators used the same word (perilypos) in the refrain of 42 and 43 and in
Mark 14:34; the Peshitta's "gave" at 68:18; Rashi, Kimchi and Ibn Ezra on
Psalm 72 (met only in Gill); Calvin on 51:5 (secondhand); the rabbinic
tradition that David was born of an unlawful union (secondary only);
Chrysostom's saying on Psalm 63 (secondhand), Athanasius and Benedict;
Mowinckel by name (47); Mesopotamian texts on feeding the gods (50); the
Greek heading of Psalm 71; the 701 BC and Maccabean dates (44, 46, 48);
Ahithophel's death (55); the year of Luther's hymn. Narrowed: the Targum on
45 ("speaks to the king of this psalm as the anointed one", not "King
Messiah", since editions differ); the Apostolic Constitutions ("church
orders from the fourth century, such as ..."); Hammurabi paraphrased with no
quotation marks and no prologue or epilogue named; "Some Bibles" for the
NASB's "cease striving"; Romans 2:6 as words found in 62:12 and Proverbs
24:12; 1 Samuel 24 as "Soon after" the Ziph chase. Two wordings in the brief
are not the BSB and were not used: 56:8 reads "Put my tears in Your bottle",
and 71:9 reads "Do not discard me in my old age".

### Contested matters, and how they are stated

The Elohistic Psalms: an observation from the Hebrew counts, "No one knows for
sure why the collectors did this." 42 and 43 as one poem (most readers; some
medieval copies join them). 45:6 (vocative "O God" in most Bibles; court
language and elohim of judges; "your divine throne" and "your throne is from
God"; Jewish readings to the king or to God; the Targum; "Both readings are
held in good faith"). 46:10 ("let go", "stop"; a command first to the
nations). 47 (a yearly feast of God's kingship: a view the Old Testament does
not describe directly). 48 and 46 (no modern city or state). 49:15 (rescue
from early death, or hope beyond it). 50 (two readings of the prophets on
sacrifice). 51:4 (three readings). 51:5 (Western original sin after
Augustine, some adding shared guilt; Orthodox ancestral sin; a poetic
reading). 51:11 (the Spirit for a task in the Old Testament; John 14:16 and
Ephesians 1:13; traditions that teach a believer can fall away; "not a cause
for division"). 51:18-19 (later addition or David's own). 54 ("strangers").
58:1 (elem or elim; human judges or unseen powers). 59:11 and 13. 60 (the
numbers 12,000 and 18,000; three explanations, "these notes leave it open";
victory heading and defeat psalm). 63 (which wilderness flight). 67:6 (thanks
or prayer). 68:18 and Ephesians 4:8 (the Targum's "gave"; a conqueror
receives and gives; Acts 2:33). 69 (the pattern reading; the curses beside
Luke 23:34). 70 (the meaning of "to bring remembrance"). 71 (David or an
older worshipper; "a portent"). 72 (Solomon's prayer, David's, or a
coronation psalm; Jewish and Christian readings; 72:20).

**Psalm 51's heading and Bathsheba, on the page:** "The heading points to 2
Samuel 11 and 12, and it is right to say plainly what happened. King David
saw Bathsheba, the wife of Uriah, one of his soldiers, while Uriah was away at
war. “Then David sent messengers to get her” (2 Samuel 11:4). He was the
king, and he used his power over her. She became pregnant. To hide what he
had done, David sent a letter to his commander ... Uriah died. The Bible puts
the blame on David. ... Nothing in the story or the psalm blames Bathsheba."

**51:5, on the page:** "Christians have read it in different ways. Many in the
Western church, following Augustine, read it as teaching original sin: that
since Adam every person is born with a nature already bent toward sin, and
some add that they share Adam's guilt (Romans 5:12). Orthodox Christians speak
of ancestral sin: we inherit death and a pull toward sin, but not guilt.
Others read the verse as a poem's way of saying that David's sin goes all the
way down, as far back as he has been alive. Whichever reading is right, the
‘I’ of the verse is David. It does not say that his mother sinned by
conceiving him, that the love of husband and wife is sinful, or that a baby is
anything less than precious to God."

**58:6-10, on the page:** "This is one of the hardest passages in the Psalms,
and the book page lists verse 10 among them. These notes do not soften the
words. They say what they say. The book page's part on the cursing psalms sets
out four ways Christians read lines like these ... Thoughtful believers hold
each view, and these notes do not choose between them. One thing is not open:
no reading of this psalm has ever made it right to harm anyone."

**Psalm 69's curses beside "Father, forgive them", on the page:** "Most
Christian readers do not put these curses in Jesus' mouth. They say the New
Testament takes the psalmist's sufferings as a pattern for Jesus, but the
curses remain David's own prayer. Jesus, the Son of David, prayed the opposite
way. ... Others read the curses as God's real judgment on those who finally
reject him. On that reading the New Testament applies them not as personal
revenge but as a sober warning, as Acts does of Judas." On Romans 11:9-10:
Paul writes "with grief, not scorn", the hardening is "in part" and for a
time, and "These verses give no one any reason to blame or look down on the
Jewish people".

### Care lines included

42:1-5 (the downcast soul; no diagnosis of anyone; the Psalm 13 form with the
Find Help page). 51:1-6 (a guilt-laden reader: 1 John 1:9; and, separately,
anyone harmed by a person with power over them: "What was done to you was
wrong, and it was not your fault ... The Find Help page on this site lists
places to turn"). 55:12-23 (the betrayed, with the Find Help page). 58:6-11
(a parent who lost a baby). 68:1-18 (the fatherless and the lonely). 69:1-12
(the sinking and the shame, with the Find Help page). 71 (the old, those who
care for them, and an old person low in spirit). No phone number anywhere.

### What was run, and what passed (watched)

After every commit: `node scripts/validate-bible-notes.mjs psalms` and the
strict quotation script, and every passage printed field by field and read;
all 47 passages sit under their right headings. One slip: the Psalm 70 commit
(ca0fda48) went in while the validator flagged "Aha, aha!" in single marks
(the check's output was piped and its exit code hidden); it was fixed in the
Psalm 72 commit, and the validator has passed with exit 0 since. The strict
script's last run over 42 to 72 flags only reviewed false positives: the `!`
of quoted Scripture in three titles (55, 69:13-21, 70), "Your truth" in 43's
Scripture title, and "be blessed" as a verb inside Scripture (72).

At the end, one at a time: all 38 content-gate commands in ci.yml, exit 0
each (validate-bible-notes: 66 introductions, 1,189 chapter notes, 239
chapters in plain words; no-emdash 260 files, 0; search index 733 entries up
to date; passage index 623 files match; explorer index current; verify-sources
22 texts intact). `pnpm check`: exit 0. `pnpm test`: 147 files passed, 7
skipped; 1,693 tests passed, 73 skipped. `pnpm build`: exit 0.

Rendered check: served with `scripts/serve-like-vercel.mjs` on port 4601;
Playwright at 390 wide, deviceScaleFactor 1, with `/api/trpc`, `/api/track` and
`/_vercel/*` stubbed. Psalms 42 to 72: 47 passages, 208 parts. Each passage's
heading and each part's heading and first 60 characters matched the data. The
27 passages without `hard` show no "The hard verse" heading. No sideways
scroll, no console or page errors. Screenshots looked at:
`/home/user/elite-shots/bdoor/ps51-390-p0.png` to `p2.png` and
`ps69-390-p0.png` to `p2.png`. Server stopped by PID, dist/ deleted, no
lh-*.json. No code changed.

### Next

Psalm 73, the start of Book Three (73 to 89), in the same shape. Book Two took
about 23,400 words: lighter psalms about 480 words, major ones 1,000 to 1,900.

## Continuation: Psalms 73 to 106 (2026-11-20)

Books Three (73 to 89) and Four (90 to 106), in the lighter shape James
accepted. Most psalms are one passage; 73, 88, 89, 90, 91, 103 and 104 are
at full depth (three passages each); 74, 77, 78, 82, 84, 95, 96, 105 and 106
have two. `hard` appears only where a psalm has a difficulty of its own.
Each note gained only `"plain": true` at its end. No code changed; the book
page was not edited (no error found in it). Before starting, the "Sources"
list of the Psalms 42 to 72 report was corrected to agree with the ledger
(18 ledger rows rest on a search; Hammurabi's laws now its own entry; the
old "14 web searches" explained).

### Per psalm

| Psalm | Shape | Passages | `hard` | Words |
|---|---|---|---|---|
| 73 | full | 3 | 1 (doubt met, not scolded) | 1,730 |
| 74 | more room | 2 | none | 1,003 |
| 75 | lighter | 1 | none | 487 |
| 76 | lighter | 1 | none | 491 |
| 77 | more room | 2 | 1 (care) | 958 |
| 78 | more room | 2 | none | 1,032 |
| 79 | lighter | 1 | 1 (to the book page) | 590 |
| 80 | lighter | 1 | none | 554 |
| 81 | lighter | 1 | none | 517 |
| 82 | more room | 2 | 1 (82:6) | 959 |
| 83 | lighter | 1 | 1 (the names) | 585 |
| 84 | more room | 2 | 1 (84:11) | 977 |
| 85 | lighter | 1 | none | 477 |
| 86 | lighter | 1 | none | 490 |
| 87 | lighter | 1 | none | 467 |
| 88 | full | 3 | 1 (care) | 1,545 |
| 89 | full | 3 | 1 | 1,656 |
| 90 | full | 3 | 1 (grief) | 1,447 |
| 91 | full | 3 | 2 | 1,524 |
| 92 | lighter | 1 | none | 508 |
| 93 | lighter | 1 | none | 446 |
| 94 | lighter | 1 | 1 (to the book page) | 568 |
| 95 | more room | 2 | none | 805 |
| 96 | more room | 2 | none | 801 |
| 97 | lighter | 1 | 1 (97:10) | 506 |
| 98 | lighter | 1 | none | 476 |
| 99 | lighter | 1 | none | 459 |
| 100 | lighter | 1 | none (100:3 in hearers) | 509 |
| 101 | lighter | 1 | 1 | 542 |
| 102 | lighter | 1 | 1 (care) | 679 |
| 103 | full | 3 | 2 | 1,576 |
| 104 | full | 3 | 2 | 1,650 |
| 105 | pair, more room | 2 | 1 (105:25) | 1,043 |
| 106 | pair, more room | 2 | 1 | 1,169 |
| Total | | 57 | 21 | 29,226 |

### Sources

All in `bdoor-ledger.md`, "The plain notes on Psalm 73" to "106". Nine web
searches: 74 (1, Leviathan and Litan at Ugarit), 82 (2, the readings of 82:6;
the Talmud's Sinai reading), 91 (1, Psalm 91 at Compline in the Rule of
Benedict), 92 (1, shared with 93 and 94: the Mishnah's psalm for each day),
100 (1, the written and margin readings of 100:3), 104 (1, the Great Hymn to
the Aten). The rest rest on the BSB, the repository's deep notes, the book
page, the site's context page on Psalm 91, earlier ledger rows, and scripts
over the repository's Hebrew word data and headings: Asaph in 50 and 73-83;
'akh three times in Psalm 73; laqach (73:24); "Do Not Destroy" (57-59, 75);
elohim in 82:1, 6; the only Book Three heading naming David (86); the last
Hebrew word of 88:18; Moses only in 90's heading; shuv (90:3, 13); ma'on
(90:1, 91:9); the Sabbath only in 92's heading; "reigns" in 93, 96, 97, 99
and none in 100-106; elilim (96:5); zarua "sown" (97:11); ruach (104:3, 4,
29, 30); "Hallelujah" first at 104:35; verse counts (78 the second longest).

### Cut or narrowed

Cut (not verified this run): the Seleucid king and 167 BC (74, 79), 1
Maccabees (79); 701 BC and the Greek heading's note (76); 722 BC and
Hezekiah (78, 80); 597 BC (89, the event told from 2 Kings instead);
Mowinckel and the enthronement festival (93, 97); the Greek headings of 91,
94, 95, 104; the date of the Ugarit tablets; the fourteenth-century date of
the Aten hymn; the century of Benedict's Rule; the Black Death and the
amulets (in the Psalm 91 context page, not repeated); "Glorious things of
thee are spoken" and "Old Hundredth" (hymns, not attempted). Narrowed:
"the longest heading" to "one of the longest" (88); "the only heading that
names a day" to "names the Sabbath" (92, since 18 names a day); the Talmud's
reading of 82:6 given with no tractate or rabbi on the page; the Aten
scholars not named on the page; "Jesus wept over Jerusalem" to "grieved"
(81, Matthew 23:37); "Israel learned these words by heart" cut (86).
Quotations caught by the strict script and the validator and fixed before
commit: Isaiah 1:23, James 1:27, Romans 8:32, Matthew 4:6 (the devil's
words with "he said" inside them), John 10:35 (BSB em-dashes), 105:17 and
91:9 (em-dashes), and several capital letters.

### Contested matters, and how they are stated

73:24 (honour in this life, or hope beyond death; the book page's Sheol
part). 74 (587/586 most scholars; a later attack suggested). Leviathan in
74 and 104 (creation or the Red Sea; at Ugarit Baal's foe). 76 (the
Assyrian withdrawal, or worship with no one battle). 78's date. 80 (the
north under Assyria; prayed in Judah for the north). 81:3 (which feast).
**82:6, on the page:** "Readers have given three main answers, and each is
held by careful people. Some read them as human rulers and judges. They
judged in God's name, so they were given a high title. ... Others read them
as heavenly beings, members of God's council who were given charge over the
nations and ruled them badly. ... An old Jewish reading, found in the
Talmud, takes the words as spoken to Israel at Mount Sinai. ... None of
these readings means that there are other gods equal to the LORD. ... These
notes do not choose between them, and each can make sense of Jesus' words in
John 10." 83 (which war). 87:4-6 (the nations as citizens, or Israelites
scattered). 89 (Jewish and Christian readings of the promise, "They part
over who Jesus is"; Book Four as an answer is "a reading of the book's
order"). 90's heading (Moses; later; between). 98's victory (exile or
exodus). 100:3 (two readings, "Both readings say something true"). 104
(the Aten hymn, as a comparison scholars discuss; no position on the age of
the earth or evolution). 105:25 (sovereignty and choice). 106:30-34 (three
readings of the conquest texts; "No reading of these verses gives anyone
today any right to harm another person or people").

### Care lines included

73:1-14 (doubt: "If you have doubts like these, this psalm does not scold
you"). 77:1-9 (sleepless nights; a doctor, a pastor or a friend; Find Help).
79 and 83 (no people today named as enemy; "no ground for contempt or
hatred toward any people living today"). 88:13-18, the fullest (no
diagnosis; do not carry it alone; a doctor, a pastor or a friend; "If you
have thoughts of hurting yourself, speak to someone today"; a crisis line;
the local emergency number, named only as that; Find Help; and for those
who sit with someone in the dark). 90:7-12 (grief; no loss called
deserved). 91 (not a guarantee; never a reason to refuse medical care; those
who prayed it over someone they lost "did not pray wrong"). 94 (anxiety).
102 (illness not punishment; sleeplessness and loneliness; Find Help). 103
(healing not promised now; keep seeing a doctor; Find Help; the sentence on
fathers). 106 (no blame on the Jewish people). No phone number anywhere.

### What was run, and what passed (watched)

After every commit: `node scripts/validate-bible-notes.mjs psalms` with its
exit code read directly (never through a pipe), exit 0 each time; the strict
quotation script (its last run over 73 to 106: 0 problems); and every passage
printed field by field and read: all 57 sit under their right headings.

At the end, one at a time: all 38 content-gate commands in ci.yml, exit 0
each (validate-bible-notes: 66 introductions, 1,189 chapter notes, 273
chapters in plain words; no-emdash 260 files, 0; search index 733 entries up
to date; passage index 623 files match; explorer index current;
verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`: 147
files passed, 7 skipped; 1,698 tests passed, 73 skipped. `pnpm build`:
exit 0.

Rendered check: served with `scripts/serve-like-vercel.mjs` on port 4602;
Playwright at 390 wide, deviceScaleFactor 1, `/api/trpc`, `/api/track` and
`/_vercel/*` stubbed. Psalms 73 to 106: 34 chapters, 57 passages, 249 parts;
each passage's heading and each part's heading and first 60 characters
matched the data; the 36 passages without `hard` show no "The hard verse"
heading; no sideways scroll; no console or page errors. Screenshots looked
at: `/home/user/elite-shots/bdoor/ps88-390-p2.png` and `ps91-390-p1.png`
(the site's sticky masthead shows across the middle of these element
captures, as in earlier runs; it is the capture, not the page). Server
stopped by PID, dist/ deleted, no lh-*.json. No code changed.

### Next

Psalm 107, the start of Book Five, in the same shape. Books Three and Four
took about 29,200 words: lighter psalms about 500 words, major ones 1,450 to
1,750. Book Five (107 to 150, with 119) is about one more long run, or two.

## Continuation: Psalms 107 to 150 (2026-11-20)

Book Five, which completes the Psalms, in the lighter shape James accepted
("finish the psalms and the rest of the bible doing that", 2026-11-19). Most
psalms are one passage; 107, 110, 118, 119, 121, 130, 137, 139 and 145 are at
full depth (two to five passages); 109, 115, 116, 122, 127 and 128 (a pair),
136 and 146 to 150 have a little more room. `hard` appears only where a psalm
has a difficulty of its own. Each chapter note gained only `"plain": true`.
No code changed; the book page was not edited (no error found). The Songs of
Ascents' background is explained once, in 120, and 121 to 134 point back; the
Hallel is explained once, in 113. Psalm 119 has five passages, not 22: what it
is and how it is built (22 stanzas of eight lines, each line of a stanza
beginning with its letter, verified over the Hebrew; the eight words as the
BSB renders them, counted by script: law, testimonies, precepts, statutes,
commandments, judgments or ordinances, word, and word or promise; all but
verses 3, 37, 90 and 122 use one), then 9-16 (a young man's way), 17-64
(delight: law as gift), 65-104 (the word in affliction, 67, 71, 75, with a
care line), 105-176 (the lamp, and the lost sheep of the last verse).

### Per psalm

| Psalm | Shape | Passages | `hard` | Words |
|---|---|---|---|---|
| 107 | full | 3 | 1 | 1,803 |
| 108 | lighter | 1 | 0 | 537 |
| 109 | more room | 2 | 1 | 1,286 |
| 110 | full | 3 | 1 | 1,786 |
| 111 | lighter | 1 | 0 | 562 |
| 112 | lighter | 1 | 1 | 571 |
| 113 | lighter | 1 | 1 | 643 |
| 114 | lighter | 1 | 0 | 521 |
| 115 | more room | 2 | 0 | 953 |
| 116 | more room | 2 | 1 | 1,068 |
| 117 | short | 1 | 0 | 388 |
| 118 | full | 3 | 1 | 1,528 |
| 119 | full | 5 | 2 | 2,617 |
| 120 | lighter | 1 | 0 | 576 |
| 121 | full | 2 | 1 | 983 |
| 122 | more room | 2 | 1 | 953 |
| 123 | short | 1 | 0 | 416 |
| 124 | lighter | 1 | 0 | 496 |
| 125 | lighter | 1 | 1 | 507 |
| 126 | lighter | 1 | 0 | 474 |
| 127 | more room | 2 | 1 | 978 |
| 128 | more room | 1 | 1 | 584 |
| 129 | lighter | 1 | 1 | 553 |
| 130 | full | 2 | 1 | 890 |
| 131 | short | 1 | 0 | 426 |
| 132 | lighter | 1 | 1 | 718 |
| 133 | short | 1 | 0 | 396 |
| 134 | short | 1 | 0 | 372 |
| 135 | lighter | 1 | 1 | 589 |
| 136 | more room | 2 | 1 | 960 |
| 137 | full | 3 | 1 | 1,540 |
| 138 | lighter | 1 | 0 | 486 |
| 139 | full | 3 | 1 | 1,480 |
| 140 | lighter | 1 | 1 | 547 |
| 141 | lighter | 1 | 0 | 510 |
| 142 | lighter | 1 | 1 | 585 |
| 143 | lighter | 1 | 1 | 551 |
| 144 | lighter | 1 | 1 | 630 |
| 145 | full | 3 | 0 | 1,223 |
| 146 | more room | 1 | 0 | 536 |
| 147 | more room | 2 | 0 | 788 |
| 148 | more room | 2 | 0 | 677 |
| 149 | more room | 1 | 1 | 540 |
| 150 | more room | 1 | 0 | 451 |
| Total | | 70 | 26 | 35,678 |

**Whole book (Psalms 1 to 150): 150 psalms, 242 passages, 127,103 words** in
plain words (happening, hearers, later, hard, asks).

### Sources

All in `bdoor-ledger.md`, "The plain notes on Psalm 107" to "Psalms 148 to
150". Fourteen web searches: 109 (1, the NRSV's "They say" at 109:6), 110 (3:
the Talmud's Abraham reading; Ibn Ezra and Kimhi on David; a rabbinic Messiah
reading), 113 (1, Mishnah Pesachim 10:6-7), 115 (1, mis pi and pit pi), 120 (1,
Mishnah Sukkah 5:4 and the fifteen steps), 130 (1, the penitential psalms and
Luther's 1524 hymn), 136 (1, the Great Hallel, Pesachim 118a), 137 (1, the
weekday custom of saying 137 before grace and the modern Jewish debate on
137:9), 145 (1, the nun line in 11QPs(a), the Greek, the Syriac). Scripts over
the repository's Hebrew and the BSB: 109's satan root; 111 and 112 and 119
acrostics; 119's eight words; 121's shamar six times; 122's shalom; 127's
yedid; 136's refrain 26 times; 145's missing nun; 146's adam/adamah; Ezra 7:9's
ma'alah; the shortest psalm (117), the longest chapter (119); "Hallelujah"
openings and closings; "Hallelujah" in the New Testament only in Revelation 19.

### Cut or narrowed

Cut: Cyrus's date (107, 126, 147: the book page's 539 BC pointed to instead);
Rowley, Pfeiffer, Treves, the Hasmonean date, Tutankhamun's footstools, Keel,
Justin and Hezekiah, Philo, 2 Enoch, Luther, Calvin, Hay and Hengel (110); Rashi
by name on 110 (sources disagree); the location of the midrash on 110:1 (given
without a reference); Ugarit's Prince Sea (114); Sennacherib and 701 BC (124 to
126); the rare forgiveness word in 130:4; funerals and Lent customs (116, 130);
the Septuagint headings of 138, 143, 144; Hermon's height (133); the "middle
chapter of the Bible" (117); Easter use of 118 as a custom; snow in Jerusalem
(147); "Jewish readers have often read 149 as final justice" (deep note, not
verified); the Maccabean date of 149. Narrowed: "the only psalm dated by its
first line" to "its first line tells us roughly when" (137); "often read at
funerals" to "can be a comfort" (116:15); "Many believers pray it" to "You may
pray it" (121); the Greek witnesses to 145's nun line to "some copies" because
editions differ; the Mishnah's fifteen steps stated with "it does not say these
were the songs they sang there". Quotations caught by the strict script and the
validator and fixed before commit: lowercase BSB openings (109:16, 115:7,
124:3-5, 137:3, 144:15, 146:8, 148:11), Ruth 2:4's comma, Matthew 10:29-31,
an ellipsis in Colossians 3:16 (replaced by Ephesians 5:19), Luke 19:41-42 run
across "and said" (now 19:42 alone), and a title with an exclamation mark (117)
and one with an ellipsis (134).

### Contested matters, and how they are stated

109:6-19: the enemies' curse quoted, or the psalmist's own words; both held,
no side. 110:1: "Jewish and Christian readers have answered differently, and
each reading deserves respect"; the Talmud (Abraham), Ibn Ezra and Kimhi
(David), some rabbinic writings (the King Messiah to come), modern scholars (a
crowning oracle), the Christian reading; "Neither reading is dishonest. ...
They part over who Jesus is". 110:5-7 battle poetry, no modern nation. 118:22,
the builders in Acts 4 "those particular leaders. It is never a charge against
the Jewish people, which this site rejects." 120: the meaning of "Songs of
Ascents" (pilgrims, likely not certain; the Mishnah's steps; the return).
122:6: no claim about any modern state; three Christian applications, no
side. 132: conditional or unconditional promise; Jewish and Christian hopes.
137:8-9: the book page's four readings, one sentence each, no side; Jewish
wrestling stated only as far as verified. 139: the abortion debate (what the
text says; Christians do not all draw every conclusion alike; no political
position). 139:19-22: "hate" as reject; pointer to the book page. 145: the
nun line lost early or added later; both held. 149:6-9: battle poetry; no
warrant for violence; the sword as the word of God given as a reading.

### Care lines included

109 ("No reading of this psalm makes it right to harm anyone, least of all a
child or a widow"). 107 (not every prayer answered alike; the sick not to
blame; Psalm 88 and Find Help). 113 and 127 (the childlessness lines of the
Luke 1 note word for word; 127 adds that a home without children, or a single
person, is not less blessed in God's eyes); 128 points back. 116:15 (grief;
Find Help). 119:71 (not a line for another's pain; Find Help). 121:7 (not a
promise of no harm; the Psalm 91 note; "it is not because you trusted God too
little"). 130 (in the form of the Psalm 13 note). 137 (rage heard; hand it to
God; a trusted person; help today; Find Help). 139 (every person, with any
disability or illness, made by God and precious; grief or guilt about a
pregnancy or the loss of a child met with gentleness; a trusted pastor or
friend; Find Help). 142 (loneliness; Find Help). 143 (a faint spirit; Find
Help). 146 (no modern figure in view). No phone number anywhere.

### What was run, and what passed (watched)

After every commit: `node scripts/validate-bible-notes.mjs psalms` with its
exit code read directly, exit 0 each time; the strict quotation script (its
last run over 107 to 150: 0 problems); every passage printed field by field and
read: all 70 sit under their right headings.

At the end, one at a time: all 38 content-gate commands in ci.yml, exit 0 each
(validate-bible-notes: 66 introductions, 1,189 chapter notes, 317 chapters in
plain words; no-emdash 260 files, 0; search index 733 entries up to date;
passage index 623 files match; explorer index current; verify-sources 22
texts intact). `pnpm check`: exit 0. `pnpm test`: 147 files passed, 7
skipped; 1,701 tests passed, 73 skipped. `pnpm build`: exit 0.

Rendered check: served with `scripts/serve-like-vercel.mjs --port 4603`;
Playwright at 390 wide, deviceScaleFactor 1, `/api/trpc`, `/api/track` and
`/_vercel/*` stubbed. Psalms 107 to 150: 44 chapters, 70 passages, 306 parts;
the whole book, Psalms 1 to 150: 150 chapters, 242 passages, 1,081 parts. Each
passage's heading and each part's heading and first 60 characters matched the
data; the 129 passages without `hard` show no "The hard verse" heading; no
sideways scroll; no console or page errors. Screenshots looked at:
`/home/user/elite-shots/bdoor/ps119-390-p0.png`, `ps137-390-p2.png`,
`ps139-390-p1.png` (the sticky masthead shows across the middle of these
element captures, as in earlier runs; it is the capture, not the page).
Server stopped by PID, dist/ deleted, no lh-*.json. No code changed.

### Next

The Psalms are complete. The next book in the lighter shape is whichever
James names next.

## Romans: the book page and Romans 1 to 8 (2026-11-20)

James on 2026-11-19: "finish the psalms and the rest of the bible doing that". The
Psalms were finished; Romans is the first of the New Testament letters.

### The book page (`/study/bible/romans`, same address)

Data only, in `client/public/bible/notes/romans/intro.json`, field `teaching`
(the rest of the file untouched; the field appended). Fourteen headed parts:
Romans in a minute; Who wrote it (Paul; Tertius, 16:22; Phoebe "very likely"
the carrier, 16:1-2; diakonos read two ways; the form of chapter 16); When
and where (Corinth, about AD 57); The churches in Rome (house churches; the
names of chapter 16; Claudius "about AD 49, disputed"; the return after 54 as
"a reconstruction and not something the letter says"); Why Paul wrote (his
own reasons, then the views); The argument in one page; Romans and the Old
Testament (Habakkuk 2:4 in its place; Abraham; Adam); Key words, plainly
(faith, grace, law, flesh, sin, the Spirit); Righteousness and ‘justified’
(Lutheran and Reformed, Catholic in Trent's words, Orthodox, the 1999 Joint
Declaration; no side); ‘Works of the law’: two readings (traditional; the new
perspective: Sanders 1977, Dunn's 1982 lecture, Wright; no side); ‘Faith in
Christ’ or ‘the faithfulness of Christ’ (Hays 1983; no side); Romans in the
church's history (Augustine 386, Luther 1515-16 and 1545, Wesley 24 May
1738, Barth 1919/1922, Sanders 1977, the Joint Declaration 1999); What
Romans is not (not only a private road to heaven; not against the Jewish
people; not a political programme; not loose verses); How to read Romans.
Then 12 hard passages (1:18, 1:26, 2:14, 3:25, 5:12, 7:14, 8:28, 9:13, 9:18,
11:26, 13:1, 16:7), 14 key words, a timeline of 14 entries, one map on the
"mediterranean" frame (Corinth, Rome, Jerusalem), a `mapNote` (Spain beyond
the west edge; Illyricum mostly beyond the top edge), and six Go deeper pages.

Words: 4,759 in the fourteen parts.

**Code.** None in the app. `client/src/pages/study-bible/teaching.test.tsx`:
Romans added to the list of books with a teaching page, and one line letting
Romans's map use the "mediterranean" frame. Nothing else.

### Romans 1 to 8 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| Romans 1 | 5 (Paul, servant and apostle: the gospel about God's Son; ‘I long to see you’; ‘I am not ashamed of the gospel’; the truth pushed away, and glory exchanged; ‘God gave them over’) | 3,978 |
| Romans 2 | 5 (‘You who pass judgment’; ‘According to his deeds’; the law written on the heart; ‘You who teach others’; circumcision of the heart) | 3,178 |
| Romans 3 | 4 (‘Much in every way’: God stays faithful; ‘There is no one righteous’; ‘But now’: righteousness from God, and the cross; no boasting, one God, the law upheld) | 2,911 |
| Romans 4 | 4 (Abraham believed, and David's blessing; before circumcision: the father of all who believe; the promise rests on grace; ‘Against all hope’: raised for our justification) | 2,585 |
| Romans 5 | 4 (peace with God, and hope that does not disappoint; ‘While we were still sinners’; sin and death through one man; the gift is not like the trespass) | 2,724 |
| Romans 6 | 3 (‘Shall we continue in sin?’ baptized into his death; dead to sin, alive to God; slaves of righteousness, and the gift of God) | 2,005 |
| Romans 7 | 3 (free from the law, joined to Christ; is the law sin?; ‘I do not do what I want’) | 2,197 |
| Romans 8 | 5 (‘No condemnation’; ‘Abba, Father’: children and heirs; creation groans, and the Spirit helps; ‘All things work together for good’; ‘Who shall separate us?’) | 3,559 |
| Total | 33 | 23,137 |

Every passage has a `hard` part but Romans 1:8-15. Every Old Testament
quotation is named by book and verse and read in its own place (the chain of
3:10-18 one by one). After each chapter every passage was printed field by
field: all 33 sit under their right headings. Each chapter note gained only
`"plain": true`. One commit per chapter, with its ledger rows.

### Sources

All in `bdoor-ledger.md` under "Romans's book page" and "The plain notes on
Romans 1" to "8". 20 web searches: 8 for the book page, then 2, 1, 2, 1, 1,
0, 3 and 2. Reused: the Roman-world and Jewish-life portraits and wrom-ledger
(Claudius, Erastus, prostatis, Phoebe, slavery, Priene), facts-ledger (Wesley),
apol-ledger (Wesley's "General Deliverance"), the justification doctrine
study, the Acts 2 and 13 notes, the Genesis 15 and 50 notes, the Psalm 103
note, and the Honest Answers. A strict quotation check matched every
double-quoted Scripture to the verse it cites, exact in case and punctuation.

### Cut or narrowed

Cut: Rome's population; Wesley going "unwillingly"; Calvin's "chief hinge";
the later signers of the Joint Declaration; Karl Adam's line on Barth;
Campbell's reading of 1:18-32; ancient same-sex practices described in
detail; Josephus on the AD 19 expulsion; the Amidah's "gives life to the
dead"; rabbinic Abraham keeping the whole law; Anselm and Abelard by name;
Ambrosiaster, Gregory of Nyssa, Kümmel, Stowers, Jeremias by name; Wesley on
Romans 7 (the search did not confirm his reading, so he is not named there);
the mystery religions; height and depth as star-words; Augustus's adoption.
Narrowed: Phoebe "very likely"; 1:26 "which most readers take in the same
sense"; the Shema "recited", not "daily"; the 8:28 manuscripts stated
generally (the repository's Greek lacks theos; the BSB has "God works").

### Contested matters, and how they are stated

Authorship (agreed); date (about 57); the Roman setting (a reconstruction);
purpose (views); natural knowledge of God (Vatican I 1870, Belgic Confession,
Barth 1934; no side); 1:26-27 (below); who 2:1 addresses; judgment by works
(three readings); the Gentiles of 2:14 and those who never heard (Honest
Answer); "true Jew" in 2:28-29; how deep sin reaches; 3:25 and the atonement
(below); "uphold the law"; Paul and James; baptism (what all share; the Acts
2:37-41 note for the differences); original sin and 5:12 (below); "all" in
5:18 (universalist, Reformed, Arminian; no side); continuing sin (Reformed,
Lutheran, Wesleyan); the law's continuing use; the "I" of Romans 7 (below);
Abba; 8:28-30 and perseverance (below). "Justified" in the three traditions
and the works-of-the-law and pistis Christou readings on the book page; each
says "These notes do not choose".

### Care lines

1:24-32 (gay readers and those who love them); 5:1-5 (suffering, the Genesis
50 form, Find Help, the suffering Honest Answer); 7:14-25 (repeated failure
and addiction: doctor, pastor, counsellor, a group, Find Help); 8:12-17 (an
absent or harmful father, the Psalm 103 form); 8:28-30 (fresh grief, harm,
danger, Find Help); 8:31-39 (afraid of having lost God's love). 2:17-24
carries the Acts 2 sentences rejecting the use of such texts against the
Jewish people. No phone numbers.

### What was run, and what passed (watched)

After each chapter: the strict quotation check and `validate-bible-notes`
(romans), exit 0. At the end, all 38 content-gate commands of ci.yml, one at
a time: exit 0 each (validate-bible-notes: 325 chapters in plain words;
search index 733 entries up to date; passage index 623 files match;
verify-sources 22 texts intact). `pnpm check`: clean. `pnpm test`: 147 files
passed, 7 skipped; 1,708 tests passed, 73 skipped. ESLint on the changed
test: clean. `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,042
pages), `pnpm run audit:canonicals`: exit 0.

Served with `scripts/serve-like-vercel.mjs` on port 4602 (no stray servers
on 4600 to 4699 before or after) and looked with Playwright
(deviceScaleFactor 1; /api/trpc, /api/track and /_vercel stubbed). Book page
at 390 and 1440: 14 of 14 parts as headings, 14 of 14 timeline entries, one
map on the "mediterranean" frame, the map note shown, no place name over
another name, a mark or the frame's region names, no sideways scroll, no
console or page errors. Romans 1 to 8 at 390: every passage heading, its
part headings in order and the first 60 characters under each matched the
data (1: 24 of 24 fields; 2: 25; 3: 20; 4: 20; 5: 20; 6: 15; 7: 15; 8: 25), no
sideways scroll, no errors. Screenshots looked at:
`/home/user/elite-shots/bdoor/romans-*` (book page top, contents, the
justified part, timeline, map, at both widths) and `romans1-390-*`,
`romans8-390-*`. Lighthouse (ci.yml command, three runs, on
`/study/bible/romans`, after prerender): performance 88, accessibility 100,
best practices 96, SEO 100, CLS 0.000. (A first run before prerender scored
performance 55 and CLS 0.918, because the page was not yet prerendered; the
ci job prerenders first.) Server stopped by PID, dist/ deleted, no
lh-*.json.

### Still unverified

The exact words of every ancient and modern writer (all paraphrased, apart
from Wesley's "heart strangely warmed" and Trent's phrase); the BSB footnote
at 3:25 seen only through a Bible site; Orthodox teaching stated generally.

### Next

Romans 9 in plain words, then 10 to 16.

## Continuation: Romans 9 to 16 (2026-11-20)

Romans 9 to 16 in plain words, which completes the book. Data only: one
`plain/<n>.json` per chapter and `"plain": true` added to each chapter note
(no other change to those files). No code changed. One commit per chapter,
with its ledger rows.

| Chapter | Passages | Plain words |
|---|---|---|
| Romans 9 | 5 (‘Deep sorrow’: Paul's grief for his own people; ‘God's word has not failed’: Isaac, Jacob and Esau; ‘Is God unjust?’ Mercy, and Pharaoh; the potter and the clay, and a people from Jews and Gentiles; the stumbling stone) | 3,978 |
| Romans 10 | 3 (zeal without knowledge, and ‘Christ is the end of the law’; ‘The word is near you’; ‘How can they hear?’) | 2,407 |
| Romans 11 | 5 (‘Did God reject His people?’ The remnant; a stumble, not a fall; the olive tree; ‘All Israel will be saved’; mercy on everyone, and ‘O, the depth’) | 3,660 |
| Romans 12 | 4 (living sacrifices; one body, many gifts; love must be sincere; ‘Overcome evil with good’) | 2,313 |
| Romans 13 | 3 (the governing authorities; the one debt that stays: love; ‘The night is nearly over’) | 1,859 |
| Romans 14 | 2 (the weak and the strong; ‘Do not destroy the work of God for the sake of food’) | 1,589 |
| Romans 15 | 4 (‘Christ did not please Himself’; ‘Accept one another’; from Jerusalem to Illyricum; Jerusalem, Rome and Spain) | 2,380 |
| Romans 16 | 5 (Phoebe; ‘Greet’: a church of names; a warning and a promise; greetings from Corinth, and Tertius; ‘To the only wise God be glory’) | 2,939 |
| Total, 9 to 16 | 31 | 21,125 |
| **Whole book, 1 to 16** | **64** | **44,262** |

Passages without a `hard` part: 12:9-13, 13:8-10, 15:1-6, 15:14-21,
16:21-24. Every Old Testament quotation is named by book and verse and read
in its own setting; where Paul follows the Greek and the BSB's Old Testament
follows the Hebrew (Isaiah 11:10, 59:20, Exodus 9:16, Proverbs 25:22), the
note says so.

### Sources

All in `bdoor-ledger.md` under "The plain notes on Romans 9" to "16". 12
web searches: 2, 0, 3, 1, 3, 0, 0, 3 (BSB footnote at 9:5; Westminster
Confession 3.7; grafting; Nostra Aetate 4; the views of Israel and the
church; burning coals; Tacitus, Annals 13.50; the Kairos Document; the 1850
sermons on obeying the fugitive slave law; Junia; slave names in Romans 16;
the doxology's places in the manuscripts). Reused word for word or nearly:
the Genesis 25 paragraph on Jacob and Esau, the Psalm 69 paragraph on
Romans 11:9-10, the Acts 28 readings of 11:26 and its 1 Clement wording,
the Acts 2 and book-page sentences rejecting contempt for Jews, the Romans 5
readings of "all", the Romans 8 care line and perseverance views, the Acts 18
complementarian and egalitarian paragraphs, the Luke 6 pacifist and just war
sentences, the Genesis 16 safety lines, the book page's Augustine sentences.
Lexicon checks over the repository's Greek (metamorphoō, anupokritos,
apostolos, diakonos, prostatis).

### Cut or narrowed

Cut: Chrysostom and Barth by name on 9:22; Calvin by name on 11:26;
Columella; Lightfoot; the Domitilla catacomb; Junia's "250 inscriptions";
Herod's grandson and Claudius's freedman as identifications; Marcion; the
Roman fable of the belly; theatre masks; inns; debt in Rome; Nero's "good
years"; the Muratorian fragment; Luther and Calvin on obedience; the
Confessing Church. Narrowed: Annals 13.50 "around this time" (no year); the
1850s sermons stated without naming a preacher, nation or law, and not
claimed to cite Romans 13; the 9:5 footnote described, not quoted (it
concerns the wording of the praise, not the punctuation); "Junias" said to
be unattested, not "nowhere"; P46 called "one very early papyrus".

### Contested matters, and how they are stated

9:5 (comma or full stop; most modern translations and early writers read it
of Christ); Jacob and Esau (Reformed, Arminian/Wesleyan, peoples or persons);
hardening (Reformed; Arminian reading of Exodus's order); 9:22-23 (Reformed
with Westminster 3.7's own words and "double predestination" as some call
it; Arminian/Wesleyan; corporate); "as if by works" (traditional; new
perspective); telos (end, goal, both); 10:9 not a formula; those who never
heard (three answers, no fate); Israel and the church (supersessionism with
its harsh and "fulfilment" forms, covenant theology, dispensational,
two-covenant); falling away at 11:20-22; "all Israel" (three readings; "And
so"); "everyone" at 11:32 (universalist, two groups, Reformed, Arminian);
gifts today; burning coals; withdrawal from "this world"; 13:1-7
(disobedience, pacifist and just war, the death penalty); the nearness of
the day; the food laws for believers; where conscience ends and the gospel
begins; whether Paul's prayer for Jerusalem was answered; Phoebe and Junia
(complementarian and egalitarian, Acts 18 form); the doxology. Each says
these notes do not choose.

### Care lines

9:19-29 (afraid of not being chosen, in the 8:31-39 form: pastor, friend,
counsellor, Find Help); 12:14-21 (the Genesis 16 safety lines word for word:
abuse, a local domestic violence line, Find Help). 9:30-33, 10:14-21,
11:1-10, 11:11-16, 11:17-24 and 11:25-29 each say that these chapters give
no ground for contempt for Jews; 11:11-16 and 11:25-29 say no claim is made
about any modern state. No phone numbers.

### What was run, and what passed (watched)

After each chapter: the strict quotation check (0 problems) and
`validate-bible-notes.mjs romans`, exit 0; every passage printed field by
field, all 31 under their right headings. At the end, one at a time: all 38
content-gate commands of ci.yml, exit 0 each (validate-bible-notes: 333
chapters in plain words; search index 733 entries up to date; passage index
623 files match; verify-sources 22 texts intact). `pnpm check`: clean.
`pnpm test`: 147 files passed, 7 skipped; 1,708 tests passed, 73 skipped.
`pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,042 pages): exit 0.

Served with `scripts/serve-like-vercel.mjs` on port 4602 (no listener on
4600 to 4699 before or after) and checked with Playwright at 390 wide,
deviceScaleFactor 1, /api/trpc, /api/track and /_vercel stubbed. All sixteen
chapters: every passage heading, its part headings in order, and the first
60 characters under each matched the data: 64 passages, 314 fields
(9: 25; 10: 15; 11: 25; 12: 19; 13: 14; 14: 10; 15: 18; 16: 24; 1 to 8 as
before). No sideways scroll, no console or page errors. Screenshots looked
at: `/home/user/elite-shots/bdoor/romans9-390-*`, `romans11-390-*`,
`romans13-390-*`. Server stopped by PID, dist/ deleted, no lh-*.json.
Lighthouse not run (no code changed).

### Next

Romans is complete. The next book in the plain-words layer is for the lead
to choose.

## 1 Corinthians: the book page and chapters 1 to 8 (2026-11-20)

James on 2026-11-19: "finish the psalms and the rest of the bible doing that". Romans
was finished; 1 Corinthians is next, done exactly as Romans was.

### The book page (`/study/bible/1-corinthians`, same address)

Data only, in `client/public/bible/notes/1-corinthians/intro.json`, field `teaching`
(appended; the rest of the file untouched). Eleven headed parts: 1 Corinthians in
a minute; Who wrote it (Paul with Sosthenes, 1:1; his own hand, 16:21; 1 Clement
near the end of the first century; one letter or several, as views); When and
where (Ephesus, "until Pentecost", 16:8; Gallio at Delphi, most 51 to 52, some 50
to 51; about AD 53 to 55); Corinth: the city (146 BC, 44 BC colony, Strabo's
freedmen and Pawlak's mixed settlers, two harbours, Erastus stone with the
identification disputed, the Isthmian Games, the thousand temple prostitutes as
Strabo's claim about the older city, doubted); The church in Corinth (1:26, "not
many, but some", house churches and patrons, status lines); How the letter came
about (Chloe's people, the letter of 7:1, the lost letter of 5:9, the painful
visit and tearful letter in broad strokes, no side); How it is built (the two
halves, "Now about", the outline, slogans as translators' judgments); The big
themes (cross, body, love, resurrection); 1 Corinthians and the Old Testament;
What the letter is not (how readers decide what was for Corinth and what is for
every church, and that they decide differently); How to read 1 Corinthians. Then
12 hard passages (1:17, 3:15, 5:5, 6:9, 7:10-16, 7:21, 8:4-6, 11:2-16, 11:27-30,
14:34-35, 15:29, 16:22), 14 key words, a timeline of 12 entries, one map on the
"mediterranean" frame (Corinth, Ephesus, Jerusalem; Cenchrea too close to Corinth
to label apart, said in `mapNote` with Macedonia), and seven Go deeper links.

Words: 4,075 in the eleven parts.

**Code.** None in the app. `client/src/pages/study-bible/teaching.test.tsx`:
1 Corinthians added to the list of books with a teaching page, and one line
letting its map use the "mediterranean" frame. Nothing else.

### 1 Corinthians 1 to 8 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| 1 | 4 (thanks for a troubled church; ‘I follow Paul’; the message of the cross; God chose the lowly) | 2,987 |
| 2 | 3 (Christ crucified; God's hidden wisdom; taught by the Spirit, the mind of Christ) | 1,980 |
| 3 | 5 (infants in Christ; planting and watering; the foundation and the fire; God's temple; all things are yours) | 2,861 |
| 4 | 4 (servants and stewards; ‘What do you have that you did not receive?’; a spectacle; a father's warning) | 2,521 |
| 5 | 3 (the man and his father's wife, ‘hand this man over to Satan’; the old leaven and the Passover lamb; not the world but the church) | 2,374 |
| 6 | 4 (lawsuits; ‘that is what some of you were’; ‘Everything is permissible for me’; the body a temple of the Spirit) | 3,351 |
| 7 | 6 (husband and wife; the unmarried and widows; divorce and mixed marriages; remain as called, circumcision and slavery; the time is short; the engaged couple and widows) | 5,427 |
| 8 | 3 (knowledge and love; one God and one Lord; the weak conscience) | 2,243 |
| Total | 32 | 23,744 |

Passages without a `hard` part: 1:1-9, 1:26-31, 2:1-5, 3:1-4, 3:5-9, 3:16-17,
3:18-23, 4:6-7, 4:8-13, 5:6-8, 6:12-14, 7:36-40, 8:1-3. Every Old Testament
quotation is named by book and verse and read in its own setting; where Paul's
wording follows the old Greek and the BSB's Old Testament follows the Hebrew
(Isaiah 29:14 at 1:19, Isaiah 40:13 at 2:16, Psalm 94:11 at 3:20), the note says
so, and 2:9 is stated as a quotation no single verse matches. Each chapter note
gained only `"plain": true`. One commit per chapter, with its ledger rows.

### Sources

All in `bdoor-ledger.md` under "1 Corinthians's book page" and "The plain notes on
1 Corinthians 1" to "8". 15 web searches: book page 5 (Strabo 8.6.20; 1 Clement
47; the Corinthian correspondence; the Isthmian Games; "to Corinthianize", not
confirmed and cut); chapter 2: 1 (the source of 2:9); chapter 3: 1 (the Catechism
on 3:15); chapter 6: 4 (Roman courts and status; the BSB at 6:9; arsenokoitai and
Leviticus; prostitution); chapter 7: 4 (7:21; the Pauline privilege; Westminster
24.6; the Augustan marriage laws). Reused: wrom-ledger and the Roman-world
portrait, wmap-ledger, apol-ledger (Bauckham 2008 on 8:6; dating), the Acts 18,
Mark 10, Matthew 18 and 19, Genesis 16 and 37, Romans 1, 8, 13 and 14 plain
notes. Lexicon checks over the repository's Greek (physioō, adikoi, malakoi,
arsenokoitai, douloō, the 2:1 variant, sōma hymōn).

### Cut or narrowed

Cut: "to Corinthianize" and the old city's jokes; 1 Clement's year and words in
quotation marks; Origen, Jerome and the Apocalypse of Elijah by name (met only in
summaries); Tertullian, Augustine, Aquinas (deep note on chapter 1); the
Alexamenos graffito; the mystery cults of Eleusis; milk and solid food as a
common figure among teachers; Roman law on stepmothers; banquets ending with
prostitutes; Caligula's tax; girls' age at marriage; surgery to hide
circumcision; grain shortages named as fact for "the present crisis".
Narrowed: Strabo "seems to have been describing" the older city; the tearful
letter "many scholars think"; arsenokoitai "many scholars think" from Leviticus,
"no clear use before Paul is known"; the BSB footnote at 6:9 not quoted (not
found); Scheidel's estimate unnamed; the Nicene Creed paraphrased.

### Contested matters, and how they are stated

Authorship of the whole (one letter or several); the Corinthian correspondence
and 2 Corinthians' unity; ‘I follow Christ’ (party or irony); baptism (pointer
to Acts 2:37-41); the rulers of this age (human, spiritual, both); 2:9's source;
3:15 (Catholic purgatory in the Catechism's terms, Protestant testing of the
builders' work; no side); 3:17; ‘beyond what is written’; 5:5 (exclusion, or
bodily suffering too; church discipline practices; no side); 6:1-8 (never suing,
or a last step; mediation); 6:9-10 (historic and majority reading, the
exploitative-practices reading, the reply; no side); 7:1 (slogan or Paul's
view); charisma in 7:7; 7:10-16 (no remarriage while both live, with the
Pauline privilege; divorce without remarriage; adultery and desertion, with
Westminster 24.6 and the Orthodox practice; wider pastoral grounds; no side,
since this waits on James); 7:16 (hope or release); 7:21 (two translations, no
side); "the present crisis" (three views); 7:36-38 (three readings); 8:6 stated
as the confessional floor, with Bauckham's reading and "some read it more
modestly"; where conscience ends and the gospel begins. Each says these notes do
not choose, except 8:6, confessed.

### Care lines

1:18-25 (contempt for Jews rejected); 4:14-21 (absent or harmful father, the
Romans 8 form; the "rod" no licence to hurt anyone); 5:1-5 (discipline never to
silence a victim or protect an abuser; crimes to the police, Romans 13:4;
harmed by discipline or shunning: Psalm 34:18, Find Help); 5:9-13; 6:1-8 (not a
rule against reporting a crime); 6:9-11 (the Romans 1 care line word for word);
6:15-20 (the Genesis 37 trafficking line); 7:1-7 (consent within marriage;
coercion is abuse; the Genesis 16 safety lines word for word); 7:8-9 (single
readers; widows); 7:10-16 (Genesis 16 safety lines; Find Help; the divorce
Honest Answer); 7:17-24 (no one told to accept bondage; anyone held or forced:
Find Help). No phone numbers.

### What was run, and what passed (watched)

After each chapter: the strict quotation check (0 problems) and
`validate-bible-notes.mjs 1-corinthians`, exit 0; every passage printed field
by field, all 32 under their right headings. After merging the latest
`claude/todo-implementation-hhp4bm`, one at a time: all 38 content-gate commands
of ci.yml, exit 0 each (validate-bible-notes: 341 chapters in plain words;
search index 741 entries up to date; passage index 623 files match;
verify-sources 22 texts intact). `pnpm check`: clean. `pnpm test`: 148 files
passed, 7 skipped; 1,729 tests passed, 73 skipped. ESLint on the changed test:
clean. `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,049 pages),
`pnpm run audit:canonicals`: exit 0.

Served with `scripts/serve-like-vercel.mjs` on port 4602 (no listener on 4600 to
4699 before or after) and checked with Playwright (deviceScaleFactor 1;
/api/trpc, /api/track and /_vercel stubbed). Book page at 390 and 1440: 11 of 11
parts as headings, 12 of 12 timeline entries, one map on the "mediterranean"
frame, the map note shown, no place name over another name, a mark or the
frame's region names, no sideways scroll, no console or page errors. Chapters 1
to 8 at 390: every passage heading, its part headings in order and the first 60
characters under each matched the data (1: 18 fields; 2: 14; 3: 21; 4: 18;
5: 14; 6: 19; 7: 29; 8: 14), no sideways scroll, no errors. Screenshots looked
at: `/home/user/elite-shots/bdoor/cor-book-*`, `cor-map-*`, `cor6-390-*`,
`cor7-390-*`. Lighthouse (ci.yml command, three runs, on
`/study/bible/1-corinthians`, after prerender): performance 92, accessibility
100, best practices 96, SEO 100, CLS 0.000. Server stopped by PID, dist/
deleted, no lh-*.json.

### Next

1 Corinthians 9 in plain words, then 10 to 16.

## Continuation: 1 Corinthians 9 to 16 (2026-11-20)

1 Corinthians 9 to 16 in plain words, which completes the book. Data only: one
`plain/<n>.json` per chapter and `"plain": true` added to each chapter note (no
other change to those files). The book page was not edited. No code changed. One
commit per chapter, with its ledger rows.

| Chapter | Passages | Plain words |
|---|---|---|
| 9 | 4 (‘Am I not free?’ the right to be supported; ‘I would rather die’: the gospel free of charge; ‘all things to all people’; the race and the prize) | 3,131 |
| 10 | 4 (‘and that rock was Christ’; warnings for us, and a way out; the table of the Lord and the table of demons; ‘do it all to the glory of God’) | 2,946 |
| 11 | 5 (heads and coverings; ‘nor is man independent of woman’; ‘it is not the Lord's Supper you eat’; ‘This is My body, which is for you’; ‘in an unworthy manner’ and ‘wait for one another’) | 4,166 |
| 12 | 5 (‘Jesus is Lord’; different gifts, the same Spirit; one body in one Spirit; many parts and honour for the weaker; ‘now you are the body of Christ’) | 2,829 |
| 13 | 3 (‘but have not love’; ‘love is patient, love is kind’; ‘when the perfect comes’) | 1,920 |
| 14 | 6 (prophecy; ‘five coherent words’; ‘God is truly among you’; order; ‘women are to be silent in the churches’; ‘do not forbid speaking in tongues’) | 3,525 |
| 15 | 6 (‘of first importance’; ‘if Christ has not been raised’; firstfruits and ‘God all in all’; baptized for the dead; the seed and the body; ‘where, O Death, is your sting?’) | 4,506 |
| 16 | 4 (the collection; travel plans, Timothy and Apollos; ‘do everything in love’; ‘Come, O Lord’) | 2,262 |
| Total, 9 to 16 | 37 | 25,285 |
| **Whole book, 1 to 16** | **69** | **49,029** |

Passages without a `hard` part: 9:13-18, 10:23-33, 11:17-22, 12:1-3, 12:14-26,
13:1-3, 14:1-5, 14:20-25, 14:26-33, 15:1-11, 16:5-12, 16:13-18. Every Old
Testament quotation is named by book and verse and read in its setting; where
Paul's wording differs from the BSB's Old Testament (Isaiah 28:11 at 14:21,
Isaiah 25:8 and Hosea 13:14 at 15:54-55), the note says so without naming a Greek
version it could not check. The book ends with one line pointing to 2 Corinthians.

### Sources

All in `bdoor-ledger.md` under "The plain notes on 1 Corinthians 9" to "16". 19
web searches: 9: 1 (Isthmian crown); 10: 2 (the travelling well; the cup of
blessing); 11: 6 (capite velato; Roman women's covering; the Catholic codes of
1917 and 1983; Amish, Mennonite and Brethren covering; the Catechism and the
Orthodox on the Eucharist; Westminster 29.7); 12: 1 (Livy's fable); 13: 1
(ancient mirrors); 14: 1 (14:34-35 in the manuscripts); 15: 2 (Latter-day Saint
practice; Menander); 16: 1 (marana tha). Reused: the Acts 2 views on tongues and
baptism, the Acts 8 Spirit-baptism readings, the Acts 18 and Romans 16
complementarian and egalitarian sentences, the Romans 5 and 11 readings of "all",
the Romans 8 perseverance views, the Genesis 16 safety lines, the Genesis 14
tithe views, the Acts 20 first-day note, the Matthew 26 and Luke 22 Supper views
(extended), the Honest Answer and apol-ledger on the date of 15:3-7, the
whon-ledger (Philo), the wrom-ledger (dining rooms, temple meals, P.Oxy. 110).
Greek checks over the repository's text (exousia, kerdainō, adokimos,
hypōpiazō, oikonomia, the 10:9 and 13:3 and 14:38 readings, koinōnia, exousia
at 11:10, anti at 11:15, anaxiōs, diakrinō, kybernēsis, aschēmoneō, barbaros,
psychikos and pneumatikos, marana tha).

### Cut or narrowed

Cut: training months of athletes; Corinthian bronze as famous; the Augustus
statue by name; Bruce Winter, Gordon Fee, N. T. Wright and Dale Martin by name;
the Delphic priestess and the cults of Dionysus and Cybele; Stoic writers on the
body; Plato's Symposium and agapē's rarity; the rabbinic use of Psalm 24:1;
Orthodox women's covering; the Lutheran teaching that the unworthy also receive;
Theodotion and the Septuagint at 15:54; the weight of women's testimony;
Chrysostom on the Marcionites; winter sailing; the Didache's setting for marana
tha. Narrowed: the travelling well "later Jewish writings", "debated"; the cup of
blessing "may echo", date not given; the Western placement of 14:34-35 without
manuscript names or dates; kybernēsis "related to" the pilot's word; the
creed's date as "many date it within a few years".

### Contested matters, and how they are stated

Paying ministers (no rule beyond the text; nothing licensing demands; nothing
against paid pastors); ‘all things to all people’ (limits stated from Galatians
2); ‘disqualified’ (Reformed and Baptist; Wesleyan, Arminian and Catholic; no
side); ‘that rock was Christ’ (presence or type); 10:13 (not about suffering:
stated plainly); demons; kephalē (authority, source, prominence); covering today
(continuing practice; principle in a cultural form; hair); ‘because of the
angels’ (uncertain); complementarian and egalitarian (Acts 18 form, at 11:2-16
and 14:34-35); the Lord's Supper (Catholic, Orthodox, Lutheran, Reformed,
memorial, each in its own terms); 11:27-30 (not softened; no reading of illness
today as punishment); who may come to the table (one sentence); gifts today
(pointer to Acts 2); Spirit baptism at 12:13; apostles today; 12:31; tongues
(languages or a prayer language); ‘the perfect’; 14:34-35 (six readings and the
manuscript fact); ‘do not forbid tongues’; ‘all’ and ‘all in all’ (universalist
and other readings; what the creeds bind); 15:29 (unknown; Latter-day Saint
practice in its holders' terms); ‘spiritual body’ (not non-physical: stated
plainly); the tithe (pointer to Genesis 14); 16:22 (a handing over to God, not a
licence). The resurrection (15) is stated as the church's confession, not a view.

### Care lines

10:6-13 (the overwhelmed: not weak, not alone, pastor, friend, doctor,
counsellor, Find Help, help now for anyone thinking of ending their life);
11:27-34 (the scrupulous reader afraid of the table; John 6:37; illness not to
be read as punishment); 13:4-7 (abuse: the Genesis 16 safety lines word for
word, Find Help, a record of harm is not a failure of love); 15:50-58 (the
grieving; Find Help); 9:24-27 (afraid of being disqualified). 11:2-16 and
14:34-35 each say nothing permits demeaning women; 11:2-16 that no church should
despise another over covering. No phone numbers.

### What was run, and what passed (watched)

After each chapter: the strict quotation check (0 problems) and
`validate-bible-notes.mjs 1-corinthians`, exit 0; every passage printed field by
field, all 37 under their right headings. Strict check over all sixteen
chapters at the end: 0 problems. After merging the latest
`claude/todo-implementation-hhp4bm`, one at a time: all 40 content-gate commands
of ci.yml, exit 0 each (validate-bible-notes: 349 chapters in plain words;
search index 741 entries up to date; passage index 623 files match;
verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`: exit 0, 152
files passed, 7 skipped; 1,779 tests passed, 73 skipped. `pnpm build`,
`pnpm run sitemap`, `pnpm run prerender` (3,056 pages), `pnpm run
audit:canonicals`: exit 0.

Served with `scripts/serve-like-vercel.mjs` on port 4602 (only other agents'
4620 and 4631 listening in 4600 to 4699, before and after) and checked with
Playwright at 390 wide, deviceScaleFactor 1, /api/trpc, /api/track and /_vercel
stubbed. All sixteen chapters: every passage heading, its part headings in order
and the first 60 characters under each matched the data: 69 passages, 320
fields (9: 19; 10: 19; 11: 24; 12: 23; 13: 14; 14: 27; 15: 29; 16: 18; 1 to 8 as
before, 147). No sideways scroll, no console or page errors. Screenshots looked
at: `/home/user/elite-shots/bdoor/cor11-390-*`, `cor13-390-*`, `cor15-390-*`.
Server stopped by PID, dist/ deleted, no lh-*.json. Lighthouse not run (no code
changed).

### Next

1 Corinthians is complete. The next book is for the lead to choose
(2 Corinthians follows naturally).

## 2 Corinthians: the book page and chapters 1 to 7 (2026-11-20)

James on 2026-11-19: "finish the psalms and the rest of the bible doing that".
1 Corinthians was finished; 2 Corinthians is next, done exactly as 1 Corinthians was.

### The book page (`/study/bible/2-corinthians`, same address)

Data only, in `client/public/bible/notes/2-corinthians/intro.json`, field `teaching`
(appended; the rest of the file untouched). Eleven headed parts: 2 Corinthians in a
minute (the most personal letter, a wounded pastor and a church he loves); Who wrote
it (Paul with Timothy, 1:1; Silvanus "most take" to be Silas); When and where
(Macedonia, 2:13 and 7:5, city not named, Philippi "often suggested"; about AD 55 to
56; Gallio as in the other pages; Acts 20:2-3 and Romans 15:26 after); What happened
between the two letters (painful visit, 2:1 and 13:1; the offender, two views; the
tearful letter, 2:4, lost or in 10 to 13 or (a few) 1 Corinthians, no side; Titus,
7:6); One letter or several? (the three seams; one letter written over time; two or
more joined; no side); The ‘super-apostles’ (only what the text says; the views; no
side; a quarrel about method, not birth); How it is built (1 to 7, 8 to 9, 10 to 13);
The big themes (comfort, power in weakness, new covenant, reconciliation, generosity);
2 Corinthians and the Old Testament; What the letter is not (not a manual for
demanding loyalty; not a promise of no suffering; not fundraising or prosperity; not
against the Jewish people); How to read 2 Corinthians. Then 12 hard passages (1:8-9,
2:5-11, 3:6, 3:14-16, 5:1-10, 5:21, 6:14, 8:9, 11:13-15, 12:2-4, 12:7-9, 13:5), 12
key words, a timeline of 11 entries, one map on the "mediterranean" frame (Corinth,
Philippi, Troas, Ephesus, Jerusalem, Damascus) with a map note, and eight Go deeper
links. Words: 3,998 in the eleven parts.

**Code.** None in the app. `client/src/pages/study-bible/teaching.test.tsx`: 2
Corinthians added to the list of books with a teaching page, and one line letting
its map use the "mediterranean" frame. Nothing else.

### 2 Corinthians 1 to 7 in plain words

| Chapter | Passages | Plain words |
|---|---|---|
| 1 | 3 (‘The God of all comfort’; ‘We despaired even of life’; changed plans and ‘Yes’ in Christ) | 3,152 |
| 2 | 3 (‘Through many tears I wrote you’; ‘Forgive and comfort him’; led in triumph, the aroma of Christ) | 2,353 |
| 3 | 3 (‘You yourselves are our letter’; letter and Spirit, old covenant and new; the veil, and freedom) | 2,626 |
| 4 | 3 (‘We do not lose heart’; treasure in jars of clay; ‘light and momentary affliction’) | 2,415 |
| 5 | 3 (the earthly tent and the heavenly house; ‘Christ's love compels us’, a new creation; reconciled to God, the great exchange) | 2,720 |
| 6 | 3 (‘now is the day of salvation’ and hardships; ‘our hearts are open wide’; ‘do not be unequally yoked’) | 2,541 |
| 7 | 4 (‘make room for us’; Titus comes; godly and worldly sorrow; joy and confidence) | 2,477 |
| Total | 22 | 18,284 |

Passages without a `hard` part: 2:1-4, 2:12-17, 3:1-3, 4:1-6, 5:11-17, 6:11-13, 7:1-4,
7:5-7, 7:13-16. Every Old Testament quotation is named by book and verse and read in
its setting; where Paul's wording differs from the BSB's Old Testament (Psalm 116:10
at 4:13, following the old Greek's three words, checked; Isaiah 49:8 at 6:2, "may be"
following the old Greek; the chain at 6:16-18, Ezekiel 20:41 "close to", 2 Samuel 7:8's
‘LORD of Hosts’), the note says so. Each chapter note gained only `"plain": true`.
One commit per chapter, with its ledger rows.

### Sources

All in `bdoor-ledger.md` under "2 Corinthians's book page" and "The plain notes on 2
Corinthians 1" to "7". 14 web searches: book page 4 (date and partition; the
super-apostles; 6:14 to 7:1 and Belial; Silvanus); chapter 1: 2 (arrabōn; the
hardship in Asia); 2: 3 (thriambeuō; the Roman triumph; kapēleuō); 3: 1 (letters of
recommendation); 4: 1 (Psalm 116:10 and the old Greek); 5: 2 (5:21 readings; the
participatory reading); 6: 1 (the 6:16-18 chain). Reused: the 1 Corinthians book page
ledger, wrom-ledger, wmap-ledger, the Acts 9 row on Aretas, the doctrine study ‘Death
and the Intermediate State’, the Explorer's New Creation stop, the Acts 2, Romans 3, 8,
9, 11, 1 Corinthians 5, 7, 10, 11, 15 and Genesis 27 plain notes. Greek and Hebrew
checks over the repository's text (paraklēsis counts, kauchaomai, exaporeomai,
katapinō, katargeō, katoptrizomai, metamorphoō, apo doxēs eis doxan, doulos,
heterozygeō, Beliar, H1100, ḥaṭṭāʾt at Leviticus 4:3).

### Cut or narrowed

Cut: Baur, Barrett, Betz and N. T. Wright by name (deep notes); synagogue prayers
opening with blessing; the riot named as the Asia hardship; Titus as bearer of the
tearful letter; captives "executed at the end" as a rule; the causative reading of
thriambeuō; the Greek of Isaiah 1:22 and Ezekiel 20:34; the archaeology of Corinth's
bema; Irenaeus's exchange phrase; the Dead Sea Scrolls by name for Belial; the
ancient friendship formula behind 7:3; Judas beside Peter (care rule); the date of
the Damascus escape. Narrowed: Silvanus "most take him to be" Silas; Philippi "often
suggested"; Belial a name for Satan in "some Jewish writings"; the Isaiah 49:8 wording
"may be" the old Greek.

### Contested matters, and how they are stated

Unity of the letter (three seams; one letter over time; two or more joined; no
side); the tearful letter (lost, in 10 to 13, or 1 Corinthians; no side); the
offender of 2:5-11 (1 Corinthians 5 or one who wronged Paul; no side); the
super-apostles (same as the false apostles, most; Jerusalem leaders invoked, a
minority; law-observant or Hellenistic; no side); the Asia hardship (unknown);
thriambeuō (captives or procession members); the aroma (triumph or sacrifice); ‘the
letter kills’ (not a rule for hidden meanings, "most readers today"); ‘the Lord is the
Spirit’ (two readings); ‘reflect’ or ‘behold’; the god of this age ("most" Satan); the
intermediate state (conscious with Christ, most; the heavenly house at death; soul
sleep; no side); judgment of believers (not a second trial, pointing to Romans 2 and 1
Corinthians 3); 5:21 (sin offering; imputation in the Reformed tradition; union and
participation in the Orthodox and some Western readers; no side beyond the Nicene
line); new creation (person and world); 6:14 (idolatry first; marriage, business,
organizations, worship as applications; no side); 6:14 to 7:1 as insertion (one
sentence, pointing to the book page).

### Care lines

1:1-7 (comfort is not a claim that suffering is good; Find Help); 1:8-11 (Paul given
more than he could bear; the 1 Corinthians 10:13 note; not alone; doctor, pastor,
friend; "If you have thoughts of hurting yourself, speak to someone today"; crisis
line; emergency number; Find Help); 2:5-11 (forgiving is not putting others back in
danger; the 1 Corinthians 5 safety lines by pointer; crimes to the police; Find
Help); 3:12-18 (contempt for Jews named and rejected); 4:7-12 (feeling crushed is not
failure; self-harm line; Find Help); 4:13-18 (4:17 Paul's own testimony, never for
fresh pain, the Romans 8:28 note's wording; Find Help); 5:1-10 (the grieving; Find
Help); 6:14-18 (not a reason to leave a spouse; not to stay in danger, pointing to the
1 Corinthians 7:10-16 note; Find Help); 7:8-12 (the scrupulous: guilt that will not
lift is not proof of worldly sorrow; counsellor, doctor; Find Help; no licence to
wound). No phone numbers.

### What was run, and what passed (watched)

After each chapter: the strict quotation check (0 problems) and
`validate-bible-notes.mjs 2-corinthians`, exit 0; every passage printed field by
field, all 22 under their right headings. Strict check over all seven chapters at the
end: 0 problems. `teaching.test.tsx` alone after the book page: 33 tests passed.
After merging the latest `claude/todo-implementation-hhp4bm`, one at a time: all 40
content-gate commands of ci.yml, exit 0 each (validate-bible-notes: 356 chapters in
plain words; search index 745 entries up to date; passage index 623 files match;
verify-sources 22 texts intact). `pnpm check`: exit 0. `pnpm test`: exit 0, 152
files passed, 7 skipped; 1,780 tests passed, 73 skipped. ESLint on the changed test:
clean. `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,061 pages),
`pnpm run audit:canonicals`: exit 0.

Served with `scripts/serve-like-vercel.mjs` on port 4602 (no listener on 4600 to
4699 before or after) and checked with Playwright (deviceScaleFactor 1; /api/trpc,
/api/track and /_vercel stubbed). Book page at 390 and 1440: 11 of 11 parts as
headings, 11 of 11 timeline entries, one map on the "mediterranean" frame, the map
note shown, no place name over another name, a mark or the frame's region names, no
sideways scroll, no console or page errors. Chapters 1 to 7 at 390: every passage
heading, its part headings in order and the first 60 characters under each matched
the data (1: 15 fields; 2: 13; 3: 14; 4: 14; 5: 14; 6: 14; 7: 17; 101 in all), no
sideways scroll, no errors. Screenshots looked at:
`/home/user/elite-shots/bdoor/cor2-book-*`, `cor2-map-*`, `cor2-1-390-*`,
`cor2-5-390-*`. Lighthouse (the ci.yml command form, three runs, on
`/study/bible/2-corinthians`, after prerender): performance 87, accessibility 100,
best practices 96, SEO 100, CLS 0.000. Server stopped by PID, dist/ deleted, no
lh-*.json.

### Next

2 Corinthians 8 in plain words, then 9 to 13.

## Continuation: 2 Corinthians 8 to 13 (2026-11-20)

2 Corinthians 8 to 13 in plain words, which completes the book. Data only: one
`plain/<n>.json` per chapter and `"plain": true` added to each chapter note (no
other change to those files). The book page was not edited. No code changed. One
commit per chapter, with its ledger rows.

| Chapter | Passages | Plain words |
|---|---|---|
| 8 | 3 (the grace given to Macedonia; ‘though He was rich, yet for your sakes He became poor’; Titus and the brothers, care to do what is right) | 2,310 |
| 9 | 3 (be ready; sowing and reaping, ‘God loves a cheerful giver’; ‘His indescribable gift’) | 1,964 |
| 10 | 3 (‘the weapons of our warfare’; ‘his letters are weighty’; ‘boast in the Lord’) | 1,789 |
| 11 | 5 (godly jealousy; free of charge and ‘false apostles’; speaking as a fool; the forty lashes and the list of sufferings; down the wall in a basket) | 3,164 |
| 12 | 5 (the third heaven; the thorn in the flesh; the signs of an apostle; ‘not your possessions, but you’; fears for the visit) | 2,809 |
| 13 | 3 (the third visit; ‘Examine yourselves’; the closing grace) | 1,967 |
| Total, 8 to 13 | 22 | 14,003 |
| **Whole book, 1 to 13** | **44** | **32,287** |

Passages without a `hard` part: 8:1-7, 8:16-24, 9:1-5, 9:12-15, 10:7-11, 10:12-18,
11:1-6, 11:30-33, 12:11-13, 12:14-18, 12:19-21, 13:1-4. Old Testament quotations named
by book and verse in their setting; where Paul's wording follows the old Greek
(Proverbs 3:4 at 8:21; the line the old Greek adds after Proverbs 22:8 at 9:7) the
note says so and quotes the BSB's Hebrew-based text. The book ends with one line
pointing to Galatians.

### Sources

All in `bdoor-ledger.md` under "The plain notes on 2 Corinthians 8" to "13". 10
web searches: 8: 1 (Proverbs 3:4 in the old Greek); 9: 1 (Proverbs 22:8 addition);
10: 1 (intrusive thoughts and scrupulosity); 11: 2 (Satan as an angel of light in
the Adam and Eve retelling; the corona muralis); 12: 2 (the third heaven in Jewish
writings; the thorn readings); 13: 2 (the 13:13/13:14 numbering; Justin on the
kiss). Reused: the Matthew 10 and Acts 5 rows on the forty lashes (Mishnah Makkot
3:10), the Acts 9 row on Aretas, the Luke 23 row on Paradise, the book page ledger
on the super-apostles, the Nicene Creed in the repository, the Matthew 8 and Acts 3
care form, the Romans 8 assurance pointer, the 2 Corinthians 7 scrupulosity form.

### Cut or narrowed

Cut: guesses at the two brothers' names (8:18, 22); guesses at Paul's looks and
voice; the Greek of 8:21; the Life of Adam and Eve by title and date; Baur and
Barrett by name; malaria, epilepsy and migraine as thorn guesses; Testament of
Levi by name; 1 Clement; "almost everyone has intrusive thoughts" (not found).
Narrowed: 2 Enoch "whose date is debated"; the corona muralis as "some readers
think", with the doubt stated; Hosea 10:12 "may echo"; Proverbs 21:22 "some readers
hear"; Isaiah 60:5 as "some readers think"; the trickery charge "seems" tied to the
collection.

### Contested matters, and how they are stated

Unity of the letter at chapter 10 (one sentence, pointing to the book page); the
super-apostles (same as the false apostles, most; Jerusalem leaders invoked, a few;
no side); Psalm 112:9 (the righteous man or God; readers differ); the witnesses of
13:1 (visits, or fair evidence); the third heaven and Paradise (one place, most; two
stages, some); the thorn (illness, eyes, speech, persecution, a person, inner
temptation: guesses, no one knows); healing today (not a rule that God will not
heal; pointer to the Matthew 8 and Acts 3 form); assurance (God's promises, a
changed life, the Spirit's witness; falling away; no side; Romans 8 note and the
Honest Answer); the tithe (pointer to Genesis 14). Stated as confession, not view:
the Son's pre-existence and incarnation at 8:9 (Nicene Creed); the Trinity at 13:14;
prosperity teaching named an error, without attacking anyone. No political lesson
from 8:13-15. 11:24 stated plainly as no charge against the Jewish people.

### Care lines

9:6-11 (gave under pressure or promised a return: not your failure; pastor or
friend; not financial advice; Find Help); 10:1-6 (unwanted intrusive thoughts: not
sin; anxiety or OCD treatable; doctor, counsellor, pastor, friend; Find Help);
11:16-21 (harmed by a controlling leader or church: wrong, not your fault; free to
step away; crimes reported; Find Help); 12:7-10 (prayed and not healed; chronic
illness or disability not a failure of faith; Find Help); 13:5-10 (the scrupulous;
1 John 3:20; the 7:8-12 note; counsellor, doctor; Find Help). No phone numbers.

### What was run, and what passed (watched)

After each chapter: the strict quotation check (0 problems) and
`validate-bible-notes.mjs 2-corinthians`, exit 0; every passage printed field by
field, all 22 under their right headings. Strict check over all thirteen chapters:
0 problems. After merging the latest `claude/todo-implementation-hhp4bm`, one at a
time, each after a load check: all 40 content-gate commands of ci.yml, exit 0 each
(validate-bible-notes: 362 chapters in plain words; search index 753 entries up to
date; passage index 623 files match; verify-sources 22 texts intact). `pnpm check`:
exit 0. `pnpm test`: exit 0, 153 files passed, 7 skipped; 1,801 tests passed, 73
skipped. `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (3,070 pages),
`pnpm run audit:canonicals`: exit 0.

Served with `scripts/serve-like-vercel.mjs` on port 4603 (no listener on 4600 to
4699 before; afterwards only another agent's 4652) and checked with Playwright at
390 wide, deviceScaleFactor 1, /api/trpc, /api/track and /_vercel stubbed. All
thirteen chapters: every passage heading, its part headings in order and the first
60 characters under each matched the data: 44 passages, 199 fields (8: 13; 9: 13;
10: 13; 11: 23; 12: 22; 13: 14; 1 to 7 as before, 101). No sideways scroll, no
console or page errors. Screenshots looked at: `/home/user/elite-shots/bdoor/cor2-9-390-*`,
`cor2-12-390-*`. Server stopped by PID, dist/ deleted, no lh-*.json. Lighthouse not
run (no code or book page changed).

### Next

2 Corinthians is complete. Galatians was not begun: its book page (with the
"mediterranean" map and the teaching.test.tsx line), then chapters 1 to 6.
