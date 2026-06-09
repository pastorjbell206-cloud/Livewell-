# Theological Depth Hub — Build Spec

The Theological Depth section teaches a new believer with no theological
training how to think about contested Christian doctrines fairly. Its defining
quality is irenic, multi-view fairness. Every contested doctrine is presented
so that a reader cannot tell which view the author holds from the positions
alone, and only learns the author's lean in a clearly labeled step at the end.

This document is the working spec. It covers the information architecture, the
page templates, the data shapes, the flagship Passage Context Tool, and the
style guide. It is meant to be fed to the build one pillar at a time.

---

## 1. Defining principles

1. **Irenic multi-view fairness.** Each serious position is stated in its own
   voice, at its strongest, as its best living defenders would state it. No
   straw men. No view keeps only its easy verses.
2. **Doctrinal triage on every topic.** First order (essential to the faith),
   second order (divides denominations), third order (room inside one
   congregation). Taught in Pillar 0 and badged on every doctrine.
3. **Epistemic honesty.** The author states his interpretive commitments
   openly rather than claiming a neutral view from nowhere.
4. **Define every term on first use.** Election, monergism, synergism,
   prevenient grace, regeneration, justification, perseverance, and the rest
   are defined the first time they appear, never condescendingly.
5. **For the soul, not the scorecard.** Spiritual formation is the goal.
   Knowledge that makes a person harder to live with has taken a wrong turn.

---

## 2. The fixed six-step method

Every contested doctrine follows the same six steps. The doctrine JSON keys map
to them one to one.

| Step | Heading on page | JSON key |
|------|------------------|----------|
| 1 | The question, in plain language | `question` |
| 2 | Why it matters (pastoral and practical stakes) | `whyItMatters` |
| 3 | The positions (each steelmanned in its own voice) | `positions[]` |
| 4 | The biblical evidence (key texts each side leans on, including the texts hardest for each view) | `biblicalEvidence[]` |
| 5 | Weighing it (tentative, labeled the author's judgment, not settled fact) | `weighing` |
| 6 | Charitable disagreement (what the other side says, whether it is a hill to die on) | `charitableDisagreement` |

Plus `relatedDebates[]` (briefer sub-debates) and `furtherReading[]` (the best
book each side has written, plus one irenic overview).

---

## 3. Information architecture

```
/theology                         Hub landing. Pillar 0 card, the three
                                   pillars, the full doctrine map by triage.
/theology/how-to-use              Pillar 0 — how to read this section.
/theology/doctrine/:slug          One worked doctrine, the six-step template.
```

### Pillar 0 — How to use this section  (`/theology/how-to-use`)
Content in `client/public/theology/methodology.json`.
- The triage framework (first, second, third order), each with a worked
  definition and the kind of doctrine that belongs to it.
- The author's stated interpretive lens, in the first person, flagged as a
  draft for James to confirm and personalize since it states his own
  commitments.
- 'The Bible clearly says' versus 'my tradition reads it this way'.
- How to change your mind well (epistemic humility).
- A spiritual-formation note: this is for your soul, not your scorecard.

### Pillar 1 — Systematic theology
Scripture, God and the Trinity, creation and providence, anthropology, sin,
Christology, the Holy Spirit, soteriology (the deepest and most worked of the
family disagreements), the church, and the last things. Soteriology is the
first fully worked doctrine and the model for the rest.

### Pillar 2 — Church history
A walkable narrative timeline, the councils that fixed the creeds, the heresies
used as a teaching tool (showing why the church had to speak), and figure
profiles.

### Pillar 3 — Biblical theology
The frameworks for reading the whole Bible as one story (covenant theology,
dispensationalism, progressive covenantalism), the canonical themes, the New
Testament reading of the Old, and per-book overviews.

The full map of planned doctrines, with their triage level and which pillar
they belong to, lives in `client/src/lib/theology.ts` as `DOCTRINE_INDEX`. An
entry with `ready: true` has a worked JSON file and a live page. The rest render
on the hub as the planned map so a reader sees where the section is going.

---

## 4. Data shapes

Types live in `client/src/lib/theology.ts`.

### Doctrine (`client/public/theology/<slug>.json`)
```
slug, title, subtitle, triage ('first-order' | 'second-order' | 'third-order'),
triageNote, question, whyItMatters,
positions: [{ name, inOneLine, bestCase, advocates[], keyTexts[] }],
biblicalEvidence: [{ passage, leansToward, summary, hardFor, howOthersRead }],
weighing, charitableDisagreement,
relatedDebates: [{ topic, note }],
furtherReading: [{ side, title, author }]
```

### Methodology (`client/public/theology/methodology.json`)
```
title, subtitle,
triageHeading, triageIntro, triageLevels: [{ level, label, headline, body }],
lensHeading, lensFlag, lensBody,
clearlyHeading, clearlyBody,
humilityHeading, humilityBody,
formationHeading, formationBody
```

### Adding a new doctrine
1. Write `client/public/theology/<slug>.json` to the Doctrine shape.
2. Flip the matching `DOCTRINE_INDEX` entry to `ready: true` (or add one).
3. The route `/theology/doctrine/<slug>` renders it with no new code.

---

## 5. Page templates

- **Hub** (`Theology.tsx`): dark hero, Pillar 0 card, three pillar cards, the
  doctrine map grouped by pillar with a triage badge on every card.
- **Pillar 0** (`TheologyMethodology.tsx`): dark hero, then alternating
  cream and warm-cream blocks for triage, lens, clearly-says, humility, and
  formation. The triage block renders the three levels as cards with badges.
- **Doctrine** (`TheologyDoctrine.tsx`): dark hero with the title, subtitle,
  triage badge, and triage note. Then the six steps as alternating sections.
  Positions render as cards with a mustard top rule, the one-line summary, the
  steelman, the advocates, and the key texts. Evidence renders as cards with
  the passage, which view it leans toward, the summary, then a warm-cream inset
  with 'hardest for' and 'how they read it'. Weighing sits in a card with a
  mustard left rule and an explicit 'author's judgment, held tentatively'
  label. Related debates and further reading close the page.

Alternation follows the palette rule: cream and warm-cream never stack three
deep, and the dark hero and footer bookend the page.

---

## 6. The Passage Context Tool (flagship)

The flagship interactive tool. A reader pastes or selects a Bible passage and
the tool surrounds it with everything needed to read it in context rather than
as a free-floating verse. The goal is to break the habit of proof-texting and
to teach, by repetition, the questions a careful reader always asks.

### Route
`/theology/passage` (and a tool card on `/theology` and `/tools`).

### Input
- A reference parser that accepts free text (for example 'Romans 9:14-18',
  'Jn 6:44', 'Phil 2:5 to 11') and resolves it to a book, chapter, and verse
  range.
- A book and chapter picker as a fallback for readers who do not know
  reference shorthand.

### Output panels (each collapsible, each teaching a context question)
1. **The passage itself**, with a few verses of runway before and after, so the
   reader never sees a verse without its neighbors. A control to widen the
   window to the full paragraph or the full chapter.
2. **Where it sits.** Book, section of the book, and a one-line note of what is
   happening around it in the argument or the story.
3. **Who wrote it, to whom, and why.** Author, audience, occasion, and
   approximate date, drawn from a per-book metadata file. Teaches that every
   text was written to someone before it was written to us.
4. **Genre.** Narrative, law, poetry, prophecy, gospel, epistle, apocalyptic,
   wisdom. With one line on how that genre asks to be read, because a psalm and
   a legal code do not make promises the same way.
5. **The flow of the argument.** For epistles, the 'therefore' and 'because'
   structure around the passage, so a reader sees what the verse is concluding
   from and arguing toward.
6. **Cross-references**, the passages the Bible itself ties to this one,
   especially Old Testament texts a New Testament writer is quoting or echoing.
7. **The interpretation spectrum.** Where this passage is contested, a short
   neutral map of how the main traditions read it, linking to the relevant
   doctrine page (for example Romans 9 links to soteriology). Always labeled as
   a spectrum, never resolved inside the tool.
8. **Questions to ask.** A short, fixed checklist a reader can carry to any
   passage: what did it mean to them, what kind of writing is this, what comes
   before and after, what does the rest of Scripture say, and only then, what
   does it mean for me.

### Data
- `client/public/theology/bible-books.json`: per-book metadata (author,
  audience, occasion, date range, genre, one-line section outline).
- Passage text: the public-domain World English Bible, fetched at runtime in
  the reader's browser from a free, no-key endpoint. The site never stores or
  invents Scripture. If the fetch fails, every teaching panel still renders and
  the reader is pointed to the reference to open their own Bible. Translation
  credit is shown under the text.
- `client/public/theology/passage-notes.json`: optional per-passage notes and
  the interpretation-spectrum links, keyed by reference. Absent keys simply
  render the structural panels without the contested-reading panel.

### Principle
The tool never tells the reader what a contested passage means. It teaches the
questions and surrounds the verse with its context, then points to the doctrine
page where the views are laid out fairly. It forms a reader, it does not settle
a debate.

### Companion tools (later, same section)
Interpretation-spectrum viewer, hermeneutics trainer, doctrine-comparison
table, interpretive-error checker, word study, glossary, creeds and confessions
library, a 'which view am I' diagnostic, and a reading-plan generator. Each is
additive and shares the doctrine JSON and the triage vocabulary.

---

## 7. Style guide

### Voice
Warm, plainspoken, never condescending. The register of a trusted pastor who
respects the reader's intelligence and refuses to flatter their certainty. The
same voice as the rest of the site, turned toward teaching rather than
preaching, but never dry. A new believer should feel invited in, and a
seminary graduate should find nothing careless.

### The fairness test
After writing the positions for any doctrine, read them with one question: could
a thoughtful adherent of each view read their own paragraph and say yes, that is
what I believe, and it is put as well as I would put it. If not, the steelman is
not finished.

### Hard content rules (enforced by the existing consistency tests)
- No em dashes. Use a period and a new sentence, or a comma.
- No semicolons. Two sentences instead.
- No exclamation marks.
- No double-quote characters in prose. Use straight single quotes for any
  quoted words inside JSON strings.
- Forbidden words: delve, leverage, unlock, transformative, navigate, tapestry,
  foster, unpack, landscape, nuanced, multifaceted, authentic, holistic,
  journey as metaphor, and the rest of the site list.

### Triage discipline
Every doctrine carries a triage badge and a one-line note saying why it sits at
that level. Never publish a doctrine without one. The badge is the reader's
constant reminder of how much weight a disagreement actually carries.

### The author's lens
The Weighing It step and the Pillar 0 lens section state James's own judgments.
They are drafted carefully and flagged for him to confirm and personalize
before they go live. They are his voice, not a generic position, and they are
always labeled as a judgment held tentatively, never as settled fact.

---

## 8. Build status

- [x] Pillar 0 methodology content and page
- [x] Doctrine page template (renders any doctrine JSON through the six steps)
- [x] Triage badge component and triage vocabulary
- [x] Hub landing with the full doctrine map
- [x] Worked example: soteriology (Calvinism, Arminianism, Provisionism)
- [x] Routes and the Theological Depth nav entry
- [x] Passage Context Tool (book metadata for all 66 books, genre guidance,
      contested-passage notes, runtime WEB text fetch with fallback, surfaced
      on the hub and in the Tools hub)
- [ ] Remaining Pillar 1 doctrines, then Pillars 2 and 3
- [ ] Companion interactive tools

Drafts for James to confirm and personalize: the Pillar 0 author's lens and the
soteriology Weighing It section. Both state his own theological judgments.
