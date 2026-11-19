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
