# The study guides: the spoken-voice pass

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me", and, of fragments, "use full paragraphs". This record covers the sixty-eight group study guides in `client/public/studyguides/*.json`. Their leader and participant PDFs are made from these files by `scripts/build-pdfs.mjs` (`pnpm pdfs`, run in the Vercel build), so the PDFs change with them. Governing standard: `docs/VOICE-JAMES-BELL.md` (developed paragraphs above fragment stacks; short sentences kept for verdicts and hinges). The method is the one the books used (`docs/work/elite/voice-books/blind-spots.md`), narrowed further, because sixty-two of these guides were already rewritten whole in his voice (`docs/work/elite/guides.md`) and the other six were written in it.

## What an edit may be

Punctuation and joining only. A run of short sentences that is a stack rather than a verdict is joined into one sentence with a comma, a semicolon, a colon, or one joining word ("and", "but"), using his own words. A capital becomes small where a sentence now continues. Nothing else: no word that carries a claim is added or removed; no fact, quotation, Scripture, reference, number, name, date, hedge or negation changes; no position is softened or sharpened; questions stay questions.

Left alone on purpose:

- A short sentence that is a real verdict or hinge stays ("Not faded. Finished."; "Love can be corrected. Worship can't."; "He didn't seize power. He absorbed it.").
- The closing prayers, the questions, the objections as their holders state them, the quote cards, the timelines, glossaries, bibliographies, cadences and timings stay untouched. Edits are confined to the leader's running prose: the summaries, the teaching, Going deeper, the case studies, the practice, the notes behind each question, the responses to objections, the leader primer, the FAQ answers, the facilitator script and the devotionals.
- Any sentence that names help, danger, abuse, a doctor, counsel, medication, a crisis line or Find Help stays byte for byte, and so does any run that sits on one.
- On the contested guides (Christian nationalism, church and empire, baptism and the Supper, economic justice, end times, heaven and hell, The Captive Church, and the rest), a run that states a position or answers one is left alone, so that paired criticisms get the same change or none.

There are no dashes to remove: the site's `validate-no-emdash.mjs` gate already holds every guide at zero.

## How it was checked

Scripts outside the repository, in `/home/user/voice-sg/`:

- **`apply.py`**: each edit is an exact old/new pair inside one named field, required to match once. It is applied to the original file every time, so the edit list is the whole record. The JSON is written back in the file's own format, and every file round-trips byte for byte when nothing changes.
- **`factdiff.py`** (original file against edited), which fails on any of the following:
  - The field structure changes.
  - Any field outside the editable set changes.
  - Inside a changed field, the count of any of these changes: double-quoted strings, single-quoted strings, Scripture references, numbers in digits, number words, hedge words (perhaps, may, some, many, often and the rest), negations (not, no, never, n't and the rest), question marks, exclamation marks or parenthesised asides.
  - A word is added or removed beyond the joining words.
  - A sentence that names help or danger changes.
  - The count of a proper name changes.
  - The number of paragraphs rises.
- **`tells.py`** counts four things in the editable prose:
  - **Short sentences:** sentences of five words or fewer.
  - **Runs:** two or more short sentences in a row.
  - **Not X. Y.:** a short negative sentence followed by its correction.
  - **Dashes.**

  The counts include real verdicts and the initials of names split by the counter ("C. S. Lewis"), so read them as direction, not a grade.
- **The site's gates, after each guide:** `validate-studyguides.mjs`, `validate-no-emdash.mjs`, `validate-grow-voice.mjs`, `validate-grow-links.mjs`, the topics index check and `validate-topics.mjs`, `validate-catalogue.mjs`, the studyguides index rebuilt (`build-studyguides-index.mjs`, unchanged unless a guide's top summary changed), the search index check, and a forbidden-word and exclamation scan of each changed field.

## The guides done (34)

| Guide | Words before | after | Short sentences before | after | Runs before | after | Not X. Y. before | after | Edits | Fields changed | Fact diff |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Addiction and Recovery: A Bible Study on the Long Road Back | 15,969 | 15,970 | 47 | 41 | 5 | 2 | 3 | 3 | 3 | 3 | PASS |
| After Christendom: A Study on Post-Christian Faith | 9,685 | 9,687 | 83 | 73 | 8 | 4 | 14 | 13 | 5 | 4 | PASS |
| Aging and Legacy: A Bible Study on Finishing Well | 10,124 | 10,127 | 80 | 68 | 13 | 6 | 16 | 14 | 8 | 8 | PASS |
| Alone in a Crowded Church: A Study on Church Loneliness | 9,017 | 9,020 | 97 | 78 | 16 | 5 | 18 | 15 | 11 | 9 | PASS |
| Anger: A Bible Study on Temper and Righteous Anger | 10,060 | 10,063 | 99 | 87 | 11 | 5 | 17 | 15 | 6 | 5 | PASS |
| Anxiety: A Bible Study on Worry and the Peace of Christ | 8,607 | 8,609 | 87 | 76 | 12 | 6 | 29 | 29 | 6 | 4 | PASS |
| Attention: A Bible Study on Technology and Distraction | 11,689 | 11,692 | 91 | 82 | 9 | 4 | 34 | 32 | 5 | 5 | PASS |
| Baptism and Communion: A Bible Study on the Sacraments | 11,930 | 11,931 | 81 | 72 | 11 | 7 | 15 | 15 | 5 | 4 | PASS |
| Believe: A Bible Study for New Believers and Seekers | 11,005 | 11,006 | 101 | 94 | 15 | 11 | 13 | 13 | 4 | 4 | PASS |
| Character Before Competence: A Church Leadership Study | 11,103 | 11,106 | 115 | 102 | 11 | 4 | 25 | 24 | 7 | 7 | PASS |
| Christian Nationalism: A Five-Session Bible Study | 14,055 | 14,056 | 137 | 133 | 12 | 10 | 21 | 20 | 3 | 3 | PASS |
| The Church and Political Power Through History: A Five-Session Study | 13,234 | 13,238 | 128 | 114 | 13 | 6 | 15 | 15 | 8 | 5 | PASS |
| Contentment: A Bible Study on Wanting Less | 12,505 | 12,506 | 85 | 81 | 4 | 2 | 22 | 22 | 2 | 2 | PASS |
| Deconstruction: A Bible Study for When Your Faith Comes Apart | 13,068 | 13,069 | 109 | 99 | 12 | 7 | 27 | 27 | 5 | 4 | PASS |
| Deep Roots: A Bible Study on the Basics of the Faith | 13,667 | 13,668 | 87 | 81 | 8 | 5 | 12 | 12 | 3 | 3 | PASS |
| Divorce and Blended Families: A Bible Study for Starting Over | 14,043 | 14,044 | 39 | 37 | 2 | 1 | 3 | 3 | 1 | 1 | PASS |
| Doubt: A Bible Study for When Faith Has Questions | 11,047 | 11,047 | 80 | 75 | 9 | 6 | 16 | 14 | 4 | 4 | PASS |
| Money, Work and the Poor: A Five-Session Bible Study | 15,981 | 15,982 | 161 | 153 | 15 | 11 | 17 | 14 | 4 | 4 | PASS |
| The End Times: A Bible Study on How the Story Ends | 13,084 | 13,086 | 108 | 101 | 14 | 11 | 17 | 17 | 3 | 2 | PASS |
| Fatherhood: A Bible Study for Men Without a Blueprint | 14,682 | 14,683 | 115 | 112 | 3 | 2 | 17 | 17 | 1 | 1 | PASS |
| Forgiveness: A Bible Study on the Hardest Word | 11,887 | 11,888 | 80 | 72 | 9 | 5 | 16 | 15 | 4 | 2 | PASS |
| Lent: A Bible Study for the Forty Days | 13,999 | 13,999 | 42 | 40 | 2 | 1 | 4 | 3 | 1 | 1 | PASS |
| Friendship: A Bible Study on the Love We Forgot | 12,281 | 12,281 | 75 | 64 | 12 | 7 | 9 | 7 | 6 | 4 | PASS |
| The Fruit of the Spirit: A Bible Study on Growth | 12,937 | 12,938 | 92 | 80 | 8 | 2 | 16 | 12 | 6 | 6 | PASS |
| Generosity: A Bible Study on Giving | 12,841 | 12,843 | 107 | 93 | 8 | 1 | 27 | 25 | 7 | 6 | PASS |
| Gratitude: A Bible Study on Thanksgiving and Grace | 11,460 | 11,461 | 92 | 86 | 10 | 7 | 30 | 30 | 3 | 3 | PASS |
| Grief: A Bible Study on Loss and the God Who Wept | 10,078 | 10,078 | 103 | 103 | 12 | 12 | 15 | 15 | 0 | 0 | PASS |
| Spiritual Habits: A Bible Study on Formation | 13,225 | 13,227 | 87 | 76 | 7 | 1 | 16 | 15 | 6 | 5 | PASS |
| Heaven and Hell: A Bible Study on the Life to Come | 11,565 | 11,566 | 126 | 114 | 28 | 22 | 20 | 19 | 6 | 6 | PASS |
| The Holy Spirit: A Bible Study on the Forgotten God | 11,819 | 11,819 | 112 | 99 | 17 | 10 | 21 | 17 | 7 | 7 | PASS |
| Hospitality: A Bible Study on the Open Door | 12,932 | 12,932 | 86 | 72 | 11 | 4 | 15 | 14 | 7 | 6 | PASS |
| Identity: A Bible Study on Who You Actually Are | 12,183 | 12,183 | 81 | 73 | 8 | 4 | 17 | 15 | 5 | 3 | PASS |
| The Trinity: A Bible Study on Knowing God | 13,033 | 13,033 | 100 | 98 | 10 | 9 | 25 | 25 | 1 | 1 | PASS |
| Lament: A Bible Study on Praying Your Pain | 8,478 | 8,478 | 80 | 77 | 8 | 6 | 18 | 18 | 2 | 2 | PASS |
| **34 guides** | 413,273 | 413,316 | 3193 | 2906 | 353 | 206 | 600 | 564 | 155 | | |

## Five typical pairs

1. Anger, session 3 teaching. Before: "We find an old wound. Fear of being left again. The conviction that if we aren't in control we'll be abandoned." After: "We find an old wound: fear of being left again, the conviction that if we aren't in control we'll be abandoned."
2. Alone in a Crowded Church, session 3 teaching. Before: "The unglamorous answer is time. Repetition. Being there again and again, across months and years, for no reason but the person." After: "The unglamorous answer is time: repetition, being there again and again, across months and years, for no reason but the person."
3. Attention, session 4 practice. Before: "Read it more than once. Turn it over. Ask what each word is doing." After: "Read it more than once, turn it over, and ask what each word is doing."
4. Aging and Legacy, session 2, the answer to an objection. Before: "The body does break down. The mind can cloud. Friends die one after another until the phone stops ringing with the old voices." After: "The body does break down, the mind can cloud, and friends die one after another until the phone stops ringing with the old voices."
5. Church and Empire, session 2 teaching. Before: "The surveys back them up. Attendance falls. The number of people who claim no religion grows." After: "The surveys back them up: attendance falls, and the number of people who claim no religion grows."


## Guides with no edit, and the shape of what was left

Four guides needed no edit: Grief, Marriage, Money, and When Our Parents Grow Old. Every run of short sentences in them is one of four things:

- the commonplaces people say at funerals, quoted in order to be examined ("It was her time. He's at peace now.");
- a verdict ("You're allowed to hate death. God hates it too."; "He doesn't say we shouldn't. He says we can't.");
- a step in a practice a grieving reader is asked to take;
- a care line, among them the 988 line in When Our Parents Grow Old.

Across all sixty-eight guides, the runs left alone are of the same kinds, plus:

- the confession at the center of End Times;
- the litanies built on Scripture (Jeremiah 29, the armor of Ephesians 6, "Plant. Water. Love.");
- the closing prayers;
- the objectors' own words;
- the facilitator scripts' first-person welcomes where they lead into a care line.

Where one sentence pair recurs in a guide ("Hope doesn't cancel grief. It changes its color."; "Jesus isn't naming an amount. He's naming a master."), every occurrence got the same change.

## For James

- **Years in ministry, book counts, old titles.** No guide states his years as a pastor or a count of his books, and none names The Monster in the Mirror, When God Bless America Replaces Thy Kingdom Come, American Idols or the Pastors Connection Network.
- **One biography line.** The Youth guide ("Who Am I?") ends its summary with "LiveWell is the work of James Bell, a pastor who came to faith from atheism, was raised without a father, and has five sons." The older guides' rewrite took his biography out wherever it served as a credential (`docs/work/elite/guides.md`). Whether this one should stay is his call, so it was left as it is.
- **His own landing.** Five guides say that "James Bell's own landing is not given" on contested questions: Addiction and Recovery, Divorce and Blended Families, Forty Days, Waiting for the Light, and When Our Parents Grow Old. That is accurate, and it was left alone.
