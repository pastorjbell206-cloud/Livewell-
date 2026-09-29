# The rewrite standard

James's instruction, 24 September 2026: rewrite the writing on the family and
the home, American Christianity, historic Christianity, and faith in a
post-Christian America so that it is deep, professional, and theological. It
should hold up at a doctoral level of seriousness. Titles should match what
people actually search for. Nothing cliché, nothing shallow. If an essay can't
be brought to this level, retire it. Pastoral and leadership material is set
aside for now.

This file is the bar. `docs/VOICE-JAMES-BELL.md` governs the voice and wins
any conflict about register. `CLAUDE.md` governs forbidden language,
scholarship and orthodoxy.

## What "doctoral level" means here

These are essays for an intelligent general reader, not journal articles. Rigor
means scholarly honesty and depth. It does not mean jargon or footnotes. An essay
at the bar:

1. **Starts where the reader hurts and goes beneath it.** Symptom, then cause,
   then wisdom. The cause reaches back through the full historical arc, never
   stopping at the proximate cause.
2. **Uses named witnesses for their ideas.** At least five real scholars,
   theologians, historians or critics, each cited by work and year, and each
   doing structural work: name the idea (expressive individualism, the buffered
   self, covenant as distinct from contract). If removing a name leaves the
   sentence unchanged, the name was decoration.
3. **Gives dated history.** The turns are named (325, 1517, 1648, 1789, 1920,
   1965, 1973, 2015), and the history explains the mechanism.
4. **Reads Scripture in context and across the canon.** Quotations are
   ESV and verbatim, with the reference beside them. The passage is read in
   its setting, never fired as a proof text.
5. **Steelmans the contested position.** Put it in the form its own defenders
   would sign before any verdict. On second-order questions (submission and
   headship, divorce and remarriage, baptism, gifts, the millennium), state
   each view in its strongest voice, name the order of the question, say where
   the author lands and the strongest objection he hasn't fully answered, and
   leave room to disagree.
6. **Includes the writer in the indictment.** "We," and "I" where honest.
7. **Draws distinctions.** The argument turns on at least one precise
   distinction that changes how the reader sees the question.
8. **Ends with weight.** No recap and no four-step takeaway. The ending passes
   through repentance, the cross or the resurrection when the subject warrants
   it, and names what the reader carries out.

Length is 3,000 to 4,500 words, in four to seven sections under `##`
headings, written as developed paragraphs. Lists appear only where the content
really is a list.

## Integrity rules (non-negotiable)

- **Only James's essays.** Essays by Susanna Bell (the byline map in
  `client/src/pages/ArticleDetail.tsx`) are hers. They are not rewritten
  without her.

- **No invented quotations.** Quote a non-biblical source word for word only if
  you are certain of the exact wording and the work it comes from. Otherwise
  paraphrase and attribute it: "Charles Taylor argues in *A Secular Age* (2007)
  that…". Never give a page number you aren't sure of.
- **No invented data.** Cite a study or statistic only when you are certain of
  the source, the year and the finding, and name them. Never write "studies
  show."
- **No invented biography.** The only facts about James that may appear are
  these: he came to faith from atheism; he was raised without a father; he is
  married to Susanna; they have five sons; he is Lead Pastor of First Baptist
  Church of Fenton, Michigan, where he has served for twelve years; he founded
  the Pastors Connection Network. Add no other personal history, and no story
  of a counseling case, a congregant or a conversation presented as a real
  event. Where the source essay tells such a story, cut it or generalize it
  honestly ("couples in this place often say…").
- **No positions or confessions put in James's mouth.** On a second-order
  question, the essay may say where it lands only if the source essay already
  did. Say it as the essay's conclusion, not as a new personal testimony. Add
  no first-person line about James's own marriage, sons, finances, sins or
  habits beyond what the source essay already said. "We" is fine for the
  writer's inclusion in a general indictment.
- **Care in the hard places.** Where the topic touches abuse, self-harm, or a
  marriage in danger, name the path to help plainly. In the US: the National
  Domestic Violence Hotline, 1-800-799-7233; the 988 Suicide & Crisis Lifeline,
  call or text 988. Any teaching on submission or on staying in a marriage says
  outright that it never requires anyone to endure abuse.
- **Not professional advice.** On law, money and medicine, inform, and say
  plainly that this is not legal, financial or medical advice.
- **Orthodoxy.** Hold the confessional floor (see `CLAUDE.md`). Criticize the
  right and the left with the same instrument.

## Mechanics

- No em-dashes. CI rejects them in the content stores. Use commas, colons,
  parentheses sparingly, or a new sentence.
- No exclamation points outside verbatim Scripture.
- Zero Forbidden Language (`CLAUDE.md`): delve, leverage, unlock,
  transformative, navigate, tapestry, foster, unpack, landscape, nuanced,
  multifaceted, authentic, journey, holistic. None of the forbidden phrases,
  no therapy-speak, no signposting ("here's what I mean", "let me explain").
- No fragment stacks. Short sentences are for verdicts and hinges. "Not X. Y."
  at most once per section.
- Contractions and natural spoken phrasing are welcome.

## Titles, decks and search

- **Title.** Use the words a person types into a search box, in plain English,
  65 characters or fewer. A clear question or a clear claim. No label prefix
  ("Marriage: …"), no clickbait, no cliché. Good: "How to Rebuild Trust in
  Marriage After Betrayal", "What Does the Bible Actually Say About Submission
  in Marriage?"
- **Deck (excerpt).** One or two sentences that state the essay's real claim.
- **Meta description.** 140 to 155 characters, stating what the reader will
  learn, with no hype.
- **Slug.** Unchanged. Addresses already indexed keep their search standing.
  When essays merge, the kept slug is the one closest to the search, and the
  others redirect to it.

## File format

Each rewrite is `content/rewrites/<slug>.md`:

```
---
slug: the-kept-slug
title: "The search-shaped title"
excerpt: "The deck."
metaDescription: "140 to 155 characters."
pillar: marriage
replaces: [slug-merged-in, another-slug]   # optional; these redirect here
sources:
  - "Author, Title (Year)"
review: "Anything James should check: a claim, a story kept from the source, a citation not fully certain."
reviewed: 2026-09-24   # set by the integrity reviewer; without it the rewrite is not applied
---

Body in Markdown. Sections under ## headings (h2, like every other essay on the site; the page title is the h1).
```

Build scripts apply every file in `content/rewrites/` over the library. A
rewritten essay takes precedence over the database copy on every surface.
