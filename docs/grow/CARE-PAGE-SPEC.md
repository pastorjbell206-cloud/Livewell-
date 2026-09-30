# Care pages: the writer's specification

> A care page is the flagship of a need kit (`docs/grow/GROW-PROMPT.md`,
> Sections 6 and 7.1). It lives at `/help/<slug>`, its content is one JSON file,
> `client/public/needs/<slug>.json`, and `scripts/validate-needs.mjs` checks
> every rule below that a machine can check. The voice is governed by
> `docs/VOICE-JAMES-BELL.md` and `CLAUDE.md`; the care rules by Section 8 of
> the Grow prompt. Read all three before writing.

---

## 1. Who is reading

Someone typed what they are facing, in their own words, often late at night,
often on a phone. They may read one screen and leave. They may be a skeptic,
a Christian with questions, a pastor, or someone who only wants help with a
Tuesday afternoon. Write so the first screen helps the person who reads only
the first screen, and the rest rewards the person who stays.

The page moves the way every serious piece here moves: **symptom, cause,
wisdom.** Start where the reader hurts, go beneath it to what they did not
see, and arrive at a way of seeing they can carry into rooms the page never
mentions. Stop at the symptom and it is journalism; stop at the cause and it
is a lecture.

## 2. The file

`client/public/needs/<slug>.json`. Every field below is required unless
marked optional. Body fields are Markdown paragraphs separated by a blank line
(`\n\n`). No headings inside bodies (the page supplies them). No bullet lists
inside bodies; lists live only in the fields that are genuinely lists.

```json
{
  "slug": "anxiety",
  "page": true,
  "rank": 1,
  "title": "I can't stop worrying",
  "seoTitle": "When You Can't Stop Worrying: Faith, Anxiety, and What Helps",
  "description": "120 to 160 characters for search results, in plain words.",
  "summary": "One line, 60 to 140 characters, shown on /help beside the title.",
  "askedAs": ["anxiety", "can't stop worrying", "Bible verses about anxiety"],
  "states": ["carrying", "helping"],
  "sensitivity": "high",
  "crisisTopics": ["suicide"],
  "answer": "One paragraph...",
  "happening": "Paragraphs...",
  "scripture": {
    "intro": "A short paragraph...",
    "passages": [
      { "ref": "Philippians 4:6-7", "text": "Be anxious for nothing, ...", "reading": "Paragraph..." }
    ]
  },
  "whyHard": "Paragraphs...",
  "thisWeek": {
    "intro": "A short paragraph...",
    "steps": [{ "title": "Name it on paper", "body": "Paragraph..." }]
  },
  "moreHelp": {
    "body": "Paragraphs...",
    "signs": ["You have stopped sleeping more than a few hours a night for two weeks."],
    "firstCall": "Paragraph...",
    "cost": "Paragraph..."
  },
  "helping": {
    "body": "Paragraphs...",
    "say": ["I'm not going anywhere."],
    "dontSay": ["Just pray about it."],
    "next": "Paragraph..."
  },
  "prayer": "The prayer, in paragraphs or lines...",
  "kit": {
    "plan": { "href": "/plans/anxiety", "label": "Eight Weeks Toward a Quieter Mind" },
    "selfCheck": { "href": "/tools/emotional-health", "label": "..." },
    "tool": { "href": "/tools/...", "label": "..." },
    "guides": [{ "href": "/studyguides/...", "label": "..." }],
    "read": [{ "href": "/life/the-anxious-mind", "label": "...", "kind": "Life" }]
  },
  "faq": [{ "q": "Is anxiety a sin?", "a": "Paragraph..." }],
  "related": ["fear-of-the-future", "hopelessness"],
  "slots": [{ "section": "whyHard", "note": "What James could add, in his own words." }],
  "sources": [],
  "reviewed": { "on": "2026-09-29", "notes": "What the reviewer checked." }
}
```

### Field rules

- **slug**: lowercase, hyphenated, matches the file name.
- **title**: the H1, in the reader's words, first person where natural ("I
  can't stop worrying", "My marriage is falling apart"). Under 60 characters.
- **seoTitle**: under 60 characters; says what the page is about in the words
  people search. **description**: 120 to 160 characters.
- **summary**: one line for the /help front door.
- **askedAs**: 6 to 14 phrases people actually type or say, drawn from
  Section 5 of the Grow prompt (single words, "Bible verses about ...",
  "What does the Bible say about ...", verse references, "how to ...",
  "is it a sin to ..."). They power the /help search box.
- **states**: any of `crisis` ("I'm in trouble right now"), `carrying` ("I'm
  carrying something"), `grow` ("I want to grow"), `helping` ("I'm helping
  someone"), `leading` ("I'm leading a group").
- **sensitivity**: `crisis`, `high`, or `ordinary`. `crisis` and `high` pages
  show the help block on the first screen automatically.
- **crisisTopics** (optional, required for `crisis` and `high`): which lines
  the help block shows, from `suicide` (988 and Crisis Text Line, always
  appropriate for mood and despair), `abuse` (the Domestic Violence Hotline),
  `sexual-assault` (RAINN), `substance` (SAMHSA's helpline). The verified
  numbers live in `client/src/data/crisis-resources.json`; never write a
  phone number into a care page's prose.
- **rank**: the need's place on the demand map (Section 5.3).

## 3. The sections, in the order the page shows them

The renderer supplies each heading in everyday words. Word ranges are checked.

1. **The title and `answer`** (60 to 160 words). Name the experience so
   precisely the reader feels seen, without minimizing it and without a
   diagnosis. No throat-clearing, no "In this article." The first sentence is
   about them, not about us.
2. **The help block** (automatic for `crisis` and `high`).
3. **`happening`, "What's going on"** (350 to 700 words). An honest
   description of the struggle: what it feels like, what is true in the common
   explanations (the medical, the psychological, the spiritual), and what
   those explanations leave out. Describe experiences; never tell the reader
   they have a condition.
4. **`scripture`, "What Scripture says"**. `intro` (40 to 120 words), then 3
   to 6 passages. Each passage's `text` is copied verbatim from
   `node scripts/bsb.mjs "<ref>"` (the Berean Standard Bible, public domain;
   see Section 5). Each `reading` (80 to 220 words) reads the passage in its
   context, who said it, to whom, in what circumstance, and lets it do real
   work. Never a proof-text, never a verse as a missile. At least one passage
   should be a lament or a hard text if the need involves pain; Scripture
   does not rush past grief, and neither do we.
5. **`whyHard`, "Why this is so hard"** (450 to 900 words). The deeper cause:
   the history, culture, and assumptions under the symptom. This is where the
   essay voice lives: named witnesses only when they do real work (see
   Section 6), the long view, self-implication ("we", never "those people").
   End on a verdict, not a summary.
6. **`thisWeek`, "What to do this week"**. `intro` (30 to 100 words), then 4
   to 7 `steps`, each a short title and a body of 40 to 150 words. Concrete,
   realistic, smallest faithful thing first. Practices, not platitudes. This
   is the one place a list is right, because the steps are genuinely a list.
7. **`moreHelp`, "When to get more help"**. `body` (150 to 450 words) on
   when this is more than a pastoral matter and how to find a Christian
   counselor or any licensed one (a doctor's referral, the insurer's
   directory, a pastor who knows local counselors, and checking that a
   counselor is licensed in your state); `signs` (3 to 8 short items) that
   mean a doctor, a counselor, a lawyer, or the police; `firstCall` (50 to
   160 words) on what to say when you call; `cost` (40 to 160 words) on what
   care costs and how to find lower-cost options (sliding-scale fees,
   community mental health centers, university training clinics, employee
   assistance programs, church benevolence). The page adds the line that this
   is not medical, legal, or financial advice.
8. **`helping`, "If you're helping someone"** (for the parent, friend,
   spouse, leader, or pastor). `body` (150 to 400 words); `say` (3 to 6
   sentences a helper can actually say); `dontSay` (3 to 6 things never to
   say, each short); `next` (40 to 150 words) on what to do next.
9. **`prayer`, "A prayer"** (80 to 250 words). Honest about the dark, in
   James's register, addressed to God, not a summary of the page. It may
   borrow the Psalms' boldness. It never promises what God has not promised.
10. **`kit`, "Go deeper"**. Only live routes (the validator checks every
    one). `plan`, `selfCheck`, and `tool` are optional single links; `guides`
    and `read` are lists. Search the libraries before writing this:
    `client/public/plans/plans-index.json`, `client/public/life/domains-index.json`,
    `client/public/howtos/index.json`, `client/public/studyguides/index.json`,
    `client/public/wisdom/topics.json`, `client/public/pathways/index.json`,
    the tools and landing pages in `client/src/App.tsx`, and essays in
    `content/static-library.generated.json`. Labels are the resource's real
    title, or an honest description of it. `kind` is one of Plan, Self-check,
    Tool, Study guide, Life, How-to, Wisdom, Essay, Pathway, Page.
11. **`faq`, "Questions people ask"**. 5 to 10 questions in the words people
    use ("Is anxiety a sin?", "Does God hear me when I can't pray?"), each
    answered in one full paragraph of 60 to 200 words. Marked up as FAQ
    structured data, so each answer must stand alone.

**Length.** 2,500 to 4,500 words in all for `high` and `ordinary` pages;
1,200 to 3,000 for `crisis` pages, which are shorter and quieter. The title,
the answer, and the help block must be complete in under 250 words.

## 4. Voice

`docs/VOICE-JAMES-BELL.md` governs, and its genre dial puts care pages in the
warmer, simpler pastoral register (direct, shepherding, practical), with the
essay's depth in "Why this is so hard".

- Developed paragraphs, full thoughts, contractions, natural spoken phrasing.
  Short sentences only at a real hinge. No fragment stacks.
- Headings and first lines use the reader's words; the depth underneath is in
  plain, intelligent English. A technical term only when it earns its place,
  explained without talking down.
- "Not X. Y.", the building triplet, anaphora: at most once in a section, and
  only at a genuine hinge. A page built from those moves fails the register.
- **Forbidden, literally** (`CLAUDE.md`): delve, leverage, unlock,
  transformative, navigate, tapestry, foster, unpack, landscape, nuanced,
  multifaceted, authentic, journey (as metaphor), holistic; "in today's
  world", "now more than ever", "here's the thing", "I want to be real with
  you", "God's got this", "blessed" as an adjective, "gospel-centered",
  "authentic community"; therapy-speak: "hold space", "your truth", "do the
  work", "your feelings are valid", "lean into", "showing up". Help content
  drifts toward therapy-speak. Refuse it.
- **No em-dashes** anywhere in our prose (commas, colons, parentheses, or a new
  sentence). **No exclamation points** outside quoted Scripture.
- Validate the feeling; never validate the despair. Honor real pain before
  offering correction. Refuse both condemnation and easy reassurance. No
  clean application turns, no comfortable closings, no four-step takeaway
  box outside "What to do this week".
- Hunt the hedge: "it could be argued", "in many ways", "perhaps". Commit or
  cut.
- The reader is an adult. The skeptic may be reading: concede what is true in
  the objection before answering it, and never hand them a reason to call the
  page dishonest.

## 5. Scripture

- Quote the **Berean Standard Bible** (public domain; the Study Bible serves
  it), verbatim, copied from `node scripts/bsb.mjs "<ref>"`. Never from memory.
  The page labels the translation. (`CLAUDE.md` makes the ESV the default in
  prose; the Grow section uses the BSB because every quotation can then be
  checked by machine against the text itself and printed on handouts without
  quotation limits.)
- `ref` must name exactly the verses in `text`. A shortened quotation marks
  every gap with an ellipsis (`...`). The validator checks every quotation
  against the passage its `ref` names.
- **Double quotation marks are for Scripture only.** Scripture quoted inside
  prose bodies goes in double quotes, verbatim BSB, and names its reference in
  the same sentence or the next; keep those short. Words people say or think
  (*just pray about it*, *what is wrong with me*) go in italics, never in
  double quotes. The validator checks every double-quoted run of three words
  or more against the BSB. (The `say` and `dontSay` lists and FAQ questions
  are plain text without quotation marks.)
- On this site "James" means James Bell. Refer to the epistle as "the letter
  of James" (or "James, the Lord's brother"), never "James says".
- In context, always: who is speaking, to whom, in what circumstance. The
  whole canon, not a favorite shelf. Jeremiah 29:11 was written to exiles
  who would die in Babylon; if it appears, it appears in that light.

## 6. Integrity (non-negotiable)

- **Never fabricate.** No invented quotations, statistics, studies, stories,
  testimonials, counselors, congregants, or conversations. A claim that cannot
  be verified is left out.
- **No statistics in this wave.** The demand research behind Section 5 of the
  Grow prompt was read from search excerpts and must be re-verified at the
  source before any figure appears on a page. Until then, say what is true
  without a number.
- **No quotations of anyone but Scripture.** Name a thinker only to name an
  idea you can state accurately in your own words, and only when the
  attribution is certain (Augustine's restless heart in the Confessions;
  C. S. Lewis writing A Grief Observed after his wife Joy died in 1960;
  Bonhoeffer's letters from prison, written between his arrest in 1943 and his
  execution in 1945). If you would need to check it, cut it.
- **James's life.** These facts may shape the writing: he came to faith from
  atheism; he was raised without a father; he has five sons; he is the lead
  pastor of First Baptist Church of Fenton, Michigan, and founded the Pastors
  Connection Network. He is "a pastor", never "a Baptist pastor", and no page
  speaks for his denomination or tradition (his decision, September 2026).
  Nothing else about his life. First
  person is for conviction and pastoral stance ("I would rather you call
  someone tonight than finish this page"), never for events, conversations,
  or experiences he has not written himself. Where a page would be stronger
  with his own story, add a `slots` entry describing what he could add, and
  write the page so it stands without it.
- **Sources.** If a page states a checkable fact beyond Scripture and common
  knowledge (a date, a law, a definition from a health body), add it to
  `sources` as `{ "claim": "...", "cite": "...", "url": "..." }`. When in
  doubt, cut the claim instead.

## 7. Care rules (Section 8 of the Grow prompt, restated for writers)

- **Suicide and self-harm.** Follow the safe-messaging recommendations: no
  method, location, or means details; never frame suicide as a solution, a
  release, or inevitable; say "died by suicide", never "committed". Name
  warning signs and help. State hope honestly without minimizing the pain.
- **Abuse and safety.** Safety before reconciliation, always. Never counsel a
  person to stay in danger to preserve a marriage or a family. Name abuse
  plainly, including spiritual abuse. Forgiveness is not the same as trust,
  reconciliation, or silence. A marriage page must say, early, what to do if
  the trouble is fear of a spouse, and send that reader to safety resources
  (crisisTopics `abuse`).
- **No diagnosis.** Describe; do not label. Encourage evaluation by a
  qualified professional.
- **Not professional advice.** Health, law, and money: give the reader what
  they need to find the right professional.
- **Children and teenagers** may read these pages: nothing a parent would be
  alarmed to find, nothing that asks a minor to share private information.
- **Contested questions** (divorce and remarriage, sexuality, gender and
  office, the gifts): follow "Handling a contested doctrine" in `CLAUDE.md`.
  State each position fairly and do not put a landing in James's mouth; add a
  `slots` entry for where he lands.

## 8. Before you hand it back

Run `node scripts/validate-needs.mjs <slug>` until it is clean. Then read the
page aloud in your head as three readers: the person at midnight on a phone
(would they know what to do within one screen?), the skeptic (would they feel
handled, or met?), and the pastor (could they hand this to their people?).
Fill `reviewed.notes` with what you checked.
