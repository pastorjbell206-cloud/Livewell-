# The Study Bible's notes: the writer's brief

This is the brief every writer of the Study Bible's authored layer works
from. The layer has three parts: a **book introduction** for each of the 66
books, a **chapter note** for each of the 1,189 chapters, and the **story
path** (`client/public/bible/story.json`) that walks the whole Bible as one
story. It sits under `CLAUDE.md` and `docs/STUDY-BIBLE-PROMPT.md`.

## Who it is for

Someone who knows nothing about the Bible and wants to learn the whole
story. They should never feel lost or talked down to, and a seminary student
should still find something they didn't know. Write for an intelligent adult
who has never opened the book. Assume no vocabulary: when a term like
"covenant", "Pharisee", or "Septuagint" first appears in a note, say in a
clause what it is.

## The register

Plain, warm, exact reference prose, the voice of a very good study Bible or
a patient professor. This is **not** James Bell's personal voice: no
first-person "I", no sermon, no altar call, no rhetorical flourish.

- Developed paragraphs, not fragments. No bullet lists inside any field.
- Contractions are fine. Sentences vary in length.
- **No em-dashes** outside a verbatim Scripture quotation (the site keeps
  its prose free of them). Use commas, colons, parentheses, or a new sentence.
- No exclamation points except inside a verbatim Scripture quotation.
- **The forbidden list**, which the validator enforces: delve, leverage,
  unlock, transformative, navigate, tapestry, foster, unpack, landscape,
  nuanced, multifaceted, authentic, journey (any use, so write "trip",
  "travel", "march", or "road"), holistic, "in today's world", "now more than
  ever", "here's the thing", "lean into", "showing up", "hold space", "your
  truth", "do the work".
- No hedging filler ("it could be argued", "in many ways"). Where scholars
  genuinely disagree, say who disagrees and why, then move on.

## Accuracy: the rules that do not bend

1. **Never invent.** Every person, place, date, ruler, custom, archaeological
   find, and scholar you name must be real and correctly described. If you
   are not sure, leave it out. A shorter true note beats a longer doubtful
   one.
2. **Dates** carry "about" or "around" unless they are fixed (for example,
   the fall of Samaria in 722 BC, the fall of Jerusalem in 587 or 586 BC,
   Cyrus's decree in 539/538 BC, the temple's destruction in AD 70). Where
   dating is contested (the exodus, Daniel, the Pastoral Letters, Revelation,
   and others), give the main positions briefly and fairly.
3. **Quotations.** Quote Scripture only from the Berean Standard Bible text
   the helper prints, **verbatim**, inside curly double quotes “like this”,
   with the reference nearby. The validator checks every quotation of three
   or more words against the BSB, so do not paraphrase inside quotation
   marks and do not put quotation marks around anything that isn't Scripture.
   Never quote a scholar, church father, or any other writer; describe their
   view in your own words and name them only if you are certain of the
   attribution.
4. **Contested readings stay contested.** Authorship, dating, creation and
   the days of Genesis, the extent of the flood, the conquest's violence,
   predestination, baptism, the Lord's Supper, spiritual gifts, women in
   ministry, the millennium: state the main positions as their own defenders
   would, briefly. Don't pick a side on second-order questions. First-order
   confession (the Trinity, the deity and humanity of Christ, his bodily
   resurrection, salvation by grace) is stated as the church's confession.
5. **Christ in all Scripture, honestly.** The `christ` field traces how the
   chapter fits the story that leads to Jesus: promises, patterns, covenants,
   longings, and New Testament uses of the passage. It never invents
   allegory. When the link is thematic rather than predictive, say so
   plainly. For New Testament chapters, say what this chapter shows of who
   Christ is and what he has done.
6. **Original words.** Take `words` Strong's numbers only from the helper's
   list for that chapter. Choose words that actually matter to the chapter's
   meaning; explain what the word means, its range, and why it matters here.
   Don't build doctrine on etymology alone.

## Tools

```
node scripts/bible-notes-helper.mjs <book-slug> <chapter>   # the BSB text + every original word
node scripts/validate-bible-notes.mjs <book-slug>            # check what you've written
```

Doctrine ids come from `client/public/bible/doctrines.json` (god, trinity,
attributes, creation, humanity, sin, providence, sovereignty, covenant, law,
holiness, revelation, messiah, atonement, salvation, spirit, kingdom, church,
sacraments, judgment, suffering, wisdom, prayer, faith, repentance,
idolatry, mission, family, hope).

## Book introduction: `client/public/bible/notes/<slug>/intro.json`

```json
{
  "tagline": "One sentence (40–220 characters): what this book is.",
  "overview": "Two or three paragraphs (600+ characters). What the book is, what happens or what it argues, and why it matters. Paragraphs separated by \n\n.",
  "author": "Who wrote it: the tradition, the evidence, and the scholarly positions where they differ.",
  "date": "When: the range, the reasons, and the positions where they differ.",
  "setting": "The historical and cultural world: empires, rulers, places, the situation of the first readers.",
  "purpose": "Why it was written and for whom.",
  "story": "Where this book sits in the one story of the Bible: what comes before and after.",
  "christ": "How the book fits the story that leads to Jesus, or what it shows of him.",
  "reading": "How to read it well: its genre, what to watch for, common misreadings.",
  "structure": [{ "range": "1-11", "title": "Beginnings", "summary": "One to three sentences." }],
  "themes": [{ "title": "Blessing", "body": "A paragraph." }],
  "doctrines": ["creation", "covenant"],
  "keyChapters": [{ "ch": 12, "why": "One or two sentences." }]
}
```

`structure` ranges use chapters ("1-11") or chapter:verse ("1:1-2:3") and
cover the book in order. Give three to six themes and three to eight key
chapters.

## Chapter note: `client/public/bible/notes/<slug>/<chapter>.json`

```json
{
  "title": "A heading for the chapter (3–70 characters)",
  "summary": "Two or three sentences: what happens or what is said.",
  "story": "One paragraph: where we are in the story, what just happened, what this chapter moves forward.",
  "historical": "One or two paragraphs: the historical setting (when, who ruled, what powers pressed in, what events stand behind the text).",
  "cultural": "One or two paragraphs: the customs, institutions, beliefs, and daily life a first reader took for granted that a modern reader doesn't.",
  "literary": "One paragraph: genre, structure, and how the chapter is built (repetition, parallelism, chiasm, speech, argument).",
  "outline": [{ "v": "1-5", "t": "Heading" }, { "v": "6-8", "t": "Heading" }],
  "doctrines": [{ "id": "creation", "note": "One to three sentences on how this chapter teaches it." }],
  "words": [{ "s": "H1254A", "note": "What the word means, its range, and why it matters here." }],
  "christ": "One paragraph (see rule 5).",
  "hard": { "q": "An honest question a thoughtful reader asks of this chapter", "a": "A fair answer: the difficulty stated plainly, the main responses in their strongest form." },
  "questions": ["Three questions for reflection or a group.", "…", "…"]
}
```

- `outline` covers every verse from 1 to the last, in order, with no gaps.
- One to four `doctrines`, one to four `words`, exactly three `questions`.
- `hard` is optional; include it only when the chapter raises a real
  difficulty (violence, a moral problem, a historical question, a hard saying).
- Separate paragraphs inside a field with `\n\n`.
- Aim for 650 to 1,000 words per chapter note. Short chapters (a genealogy,
  a psalm of five verses) may be shorter; the minimums still apply.
- Write each chapter from its own text. Where neighboring chapters share a
  setting, say what is new here rather than repeating the paragraph.
- Genealogies, lists, and law codes still get full notes: say why the list
  is there, what it did for its first readers, and what a reader should
  notice.

## A model note

`client/public/bible/notes/genesis/1.json` is the model. Match its depth and
its tone.
