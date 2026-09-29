# LIVEWELL — THE STUDY BIBLE PROMPT

> Paste this file as the opening message of a working session, or say "run the
> study bible prompt." It sits under `CLAUDE.md` (voice, palette, the two
> runtimes, never fabricate) and builds the Study door into a Bible study
> system meant to stand with the best in the world.

---

## 0. The board

You are not one engineer. You are a standing board that reviews every phase
before it ships, and each seat has a veto in its own field:

| Seat | Holds the line on |
|---|---|
| **A seminary president** | Confessional faithfulness under `CLAUDE.md`'s floor; the tool forms students of Scripture, not trivia collectors. |
| **An Old Testament professor (Hebrew)** | Hebrew text, stems, aspect, syntax, poetry, the Masoretic tradition and its witnesses. |
| **A New Testament professor (Greek)** | Greek text, morphology, verbal aspect, syntax, the critical text and its apparatus. |
| **A textual critic** | Which words are in which editions; variants shown honestly, never hidden and never sensationalized. |
| **A historian of the ancient Near East and the Greco-Roman world** | Cultural and historical context, dates, places, customs: every claim sourced or cut. |
| **A church historian** | How the church has read each passage, from the fathers to the Reformers to today: named readers, real works. |
| **A preaching pastor** | The path from text to sermon to Tuesday; a pastor can prepare from it in an evening. |
| **A learning designer** | A new believer is never lost and a PhD student is never bored: layered depth, one idea at a time. |
| **An accessibility and performance engineer** | Works on a cheap phone on a slow connection, and with a screen reader, in every script (Latin, Greek, Hebrew right-to-left). |

The board's single test for any feature: **does it help a reader understand
what the text said to its first hearers, what it says now, and how the church
has heard it between, without telling them what to think before they have
seen the evidence?**

---

## 1. Rules that do not bend

1. **Sources, not memory.** Every word of original-language data, every
   gloss, every parsing, every definition, every cross-reference comes from
   a named, licensed dataset. Nothing is generated from a model's memory. The
   datasets in §2 are the floor.
2. **Credit every source on every page that uses it,** in the form its
   licence asks. CC BY data is credited to STEPBible (Tyndale House,
   Cambridge) and OpenBible.info. The Berean Standard Bible is public domain
   and is still named.
3. **Copyrighted translations are never bundled.** The ESV, NIV, NASB, CSB,
   and NLT are linked out, never stored. The site's reading text is the Berean
   Standard Bible (public domain since 2023).
4. **Authored context is authored.** Book introductions, historical and
   cultural notes, and reception history are written by a person, cite real
   works, carry their author's name, and go through James's "save it"
   (`docs/FOUNDATION-PROMPT.md` rule 4). A blank is better than a guess.
5. **Contested readings stay contested.** Where scholars divide on date,
   authorship, a translation, or a variant, the tool shows the positions in
   their strongest form (`CLAUDE.md`, contested doctrine) before any note of
   where James lands.
6. **Depth is layered, never dumped.** A verse opens to a sentence, the
   sentence to a paragraph, the paragraph to the apparatus. No screen shows
   everything at once.
7. **Fast and light.** A chapter loads its own data only; a lexicon entry
   loads its own shard only. No page downloads the whole Bible.

---

## 2. The sources (the floor)

| Layer | Source | Licence |
|---|---|---|
| English reading text | Berean Standard Bible | Public domain |
| Hebrew OT, word by word: text, transliteration, gloss, extended Strong's, full morphology | STEPBible TAHOT (Tyndale House) | CC BY 4.0 |
| Greek NT, word by word, with editions (NA28, SBL, WH, TR, Byzantine) per word | STEPBible TAGNT | CC BY 4.0 |
| Brief Hebrew lexicon (BDB-based) and Greek lexicon (Abbott-Smith-based) | STEPBible TBESH, TBESG | CC BY 4.0 |
| Full Greek lexicon | STEPBible TFLSJ (Liddell-Scott-Jones) | CC BY 4.0 |
| Grammar codes expanded into plain language | STEPBible TEHMC, TEGMC | CC BY 4.0 |
| Every person and place, with relationships and references | STEPBible TIPNR | CC BY 4.0 |
| Cross-references, ranked by reader votes | OpenBible.info | CC BY |
| Versification between traditions | STEPBible TVTMS | CC BY 4.0 |

Anything added later (maps, archaeology, papyri, the Septuagint, the church
fathers) enters this table with its licence before it enters the code.

---

## 3. The system, in phases

### Phase 1 — The Study Bible (the foundation)
- Every chapter of the Bible, in the Berean Standard Bible, one chapter per
  page, with book and chapter navigation that works in two taps on a phone.
- **Interlinear mode:** every verse word by word in Hebrew or Greek, with
  transliteration and English gloss, in the original word order, Hebrew set
  right to left.
- **The word panel:** tap any original word for its dictionary form, its
  meaning (brief lexicon, with the full LSJ for Greek where it exists), its
  grammar spelled out in plain language, and how often it occurs, with every
  occurrence one tap away.
- **The verse panel:** tap a verse number for its words, its
  cross-references, and every LiveWell study guide, context guide, wisdom
  topic, and essay that treats that chapter.
- **Variants, honestly:** in the New Testament, words that differ between
  the major Greek editions are marked, with the editions named.
- **Credit line** on every page.

### Phase 2 — Word study and concordance
- A word study page for every Hebrew and Greek word: definition, range of
  meaning, every occurrence grouped by book and by translation choice, the
  Septuagint bridge for Old Testament words used in the New, and related
  words from the same root.
- Search by English word, by original word, by Strong's number, and by
  grammar ("every aorist imperative in Ephesians").

### Phase 3 — People, places, and the world of the text
- A page for every person and place (TIPNR): who they are, their family,
  where they appear, and a map.
- Book introductions, authored (§1 rule 4): author, date, audience, setting,
  structure, and the main interpretive questions, with the scholarly
  positions stated fairly.
- Historical and cultural notes at the passage level, written and sourced,
  starting with the passages LiveWell readers study most.

### Phase 4 — Reading with the church
- For key passages: how the fathers, the medieval church, the Reformers, and
  modern commentators read them, quoted from public-domain sources and cited.
- Contested passages set out on the pattern of `CLAUDE.md`'s contested
  doctrine standard.

### Phase 5 — From text to life
- A guided study method in steps (observe, interpret, correlate, apply),
  with notes the reader can save in the browser.
- A sermon and lesson builder for pastors: the passage, its structure, its
  key words, and its context gathered on one printable page.
- Every study guide, reading plan, and essay on the site links into the
  Study Bible at the verse.

---

## 4. Gates

Each phase ships only when:
- the data pipeline is reproducible from the named sources, and a validator
  checks every book, chapter, and verse count against the versification
  data;
- no page downloads more than its own chapter and the shards it opens;
- axe is clean at 390 and 1440 wide, and Greek and Hebrew render and read
  correctly (right to left) with a screen reader;
- the board's single test in §0 holds for three sample passages: one
  narrative, one poem, one epistle;
- every source is credited on the page.

## 5. Begin

Build Phase 1. Stop at its gate with screenshots of Genesis 1, Psalm 23, and
John 1 in reading and interlinear modes, the word panel open on one Hebrew
and one Greek word.
