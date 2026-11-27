# The Academy: the brief for writing a track

James, 2026-11-27: "make this like one of the best Bible academies in the world.
I want someone to be able to go from not understanding the Bible to being able
to fully understand the Bible."

The Academy (`/academy`) arranges tracks into ten programs
(`client/public/academy/programs.json`). A **track** is the site's existing unit of
learning: numbered sessions of about ten minutes, each with its own short
teaching, one real page of the site to open, one question, one thing to do, one
verse, and a guide for a group. Every track has a leader's guide. This brief is for
anyone, human or agent, writing one.

## Read first

1. `CLAUDE.md`, the sections on voice, forbidden language, the Audience Standard,
   the Formation Standard, the Scholarship Standard and the Orthodoxy Guardrails.
2. `docs/VOICE-JAMES-BELL.md`. It governs the register: developed paragraphs, not
   fragment stacks; natural contractions; no repeated antithesis.
3. `docs/work/elite/tracks.md`, the sections "The data shape", "What the gate holds
   a track to" and "How to write the next track".
4. A model track: `client/public/tracks/new-to-this.json`. For a book track, also
   `client/public/tracks/mark.json`.
5. The rules themselves: `scripts/lib/tracks.mjs`. The gate is the law.

## The rules the gate enforces

These are mechanical. Run the gate until your tracks are clean.

- **Shape.** Write 4 to 16 sessions. Each session has:
  - teaching of one or two paragraphs, each 40 to 150 words;
  - one `open` link and up to three `also` links, each with a `why` line of 8 to 45 words;
  - a question ending in "?";
  - a `do` of 8 to 60 words;
  - a `verse`;
  - a `group` with `open`, exactly three `discuss` questions and `pray`.
- **Kinds.** A track opens at least **eight different kinds** of page across its `open` and `also` links. The kinds are listed in `KINDS` in `scripts/lib/tracks.mjs`. The Academy added eight, so a session can open the rest of the site:
  - `doctrine` (`/study/bible/doctrines/<id>`)
  - `story` (`/study/bible/story/<act>`)
  - `reading-guide` (`/study/bible/guides/<id>`)
  - `study-tool` (`/study/timeline`, `/study/atlas`, `/study/words`, `/study/hard-passages`, `/study/books-at-a-glance`, `/study/key-chapters`, `/study/themes`, `/study/word`, `/study/cross-references`, `/study/films`)
  - `theology` (`/theology/reading-the-bible`, `/theology/glossary`, `/theology/hermeneutics`, `/theology/biblical`, `/theology/doctrine/<slug>`)
  - `life` (`/life/<slug>`)
  - `howto` (`/how-tos/<slug>`)
  - `essay` (`/writing/<slug>`, public shelf essays only)
- **Links.** Every link must be a live page that is not a redirect. Check an address with:
  `node -e "import('./scripts/lib/site-routes.mjs').then(m=>console.log(m.resolveHref('/life/marriage')))"`
- **Scripture.** It is quoted from the **Berean Standard Bible**, word for word.
  - Inside teaching, a quotation in curly double marks “…” must be Scripture, followed at once by its reference in brackets: “…” (John 1:1).
  - Look the text up; never quote from memory: `node -e "import('./scripts/lib/bsb.mjs').then(m=>console.log(m.readingText('John 1:1-2')))"`. Quote a clean span of whole words. A verse to keep is at most 60 words, with no ellipsis.
  - Curly double marks are for Scripture only. Name a book, a film or a phrase without quotation marks.
- **Banned.**
  - **Forbidden language.** The words and phrases are listed in `CLAUDE.md` and the gate checks them.
  - **Em dashes.**
  - **Exclamation points** outside quoted Scripture.
  - **Signposting.** For example, "let me explain".
  - **Pressure.** No formula prayers, no "before it's too late".
  - **Phone numbers.**
  - **The first person singular.** A track speaks to "you", or says "we" for the church, never "I" as James.
- **Care lines.** A session whose own words touch sin, guilt, shame, fear, death, grief or doubt must carry `care`. That is one or two care lines, each copied **whole** from the Study Bible's plain-words notes, each naming Find Help. Find them with
  `grep -rho '[^"]*Find Help[^"]*' client/public/bible/notes/*/plain/*.json | sort -u | head -40`,
  or reuse a care line from an existing track. Never write a new one.
- **Leader's guide.** Every track has one:
  - `leader.about` (1 to 3 paragraphs);
  - `leader.sections` with the ids `group`, `room`, `order`, `hard`, `hurting`, `help`, in that order;
  - `order` alone has `steps`, four to eight of them;
  - `help` names Find Help.
- **The `road` field.** Leave it out.

## Rules the gate cannot check (and you must)

- **Never fabricate.**
  - No invented quotation from any scholar or writer: quotation marks are Scripture only, so paraphrase and attribute ("Augustine argued that…").
  - No statistics.
  - No stories about James.
  - Dates and events only when you are certain: Nicaea in 325, Chalcedon in 451, Wittenberg in 1517. When unsure, cut it.
- **Steelman.**
  - State the objection, or the other tradition, in the form its own defenders would sign before any verdict.
  - On second-order questions (baptism, the Supper, the millennium, women in office, predestination), present the views fairly and leave the question open.
  - The creed's first-order claims are confessed plainly.
- **Write for the reader of your program.** The skeptic is treated as intelligent and owed honesty. The teenager is never talked down to. The new believer is never made to feel stupid. The grieving reader is never hurried.
- **Teach, do not summarize the page.** The teaching gives the session's own idea, the why. The page it opens holds the detail. Never copy the page.
- **The question is one real question** the reader could answer in a sentence or a page, never a quiz.
- **Each track forms, not merely informs.** Its last session leaves weight; it does not wrap up with a summary. It names where to go next in the Academy (a `track` link to the next track in the program is good).
- **Name sessions plainly.** No clever titles.

## Finding real pages

| What | Where to find it |
|---|---|
| Films | `client/public/explorer/index.json`, `films[]` where `status` is `finished`; the address is `/study/explorer/watch/<slug>` |
| Book pages | `/study/bible/<book>` |
| Chapters | `/study/bible/<book>/<n>`, or `#plain` for the plain-words notes; the guided walk is `/study/bible/<book>/<n>?study=walk` (kind `study`) |
| Doctrines | `ls client/public/bible/doctrines/` |
| Reading guides | `ls client/public/bible/guides/` |
| Story acts | `client/public/bible/story.json`, the ids under `acts` |
| Honest Answers | the `slug:` entries in `client/src/data/answers.ts` (`/answers/<slug>`) |
| The case for the faith | `/questions/<area>/<slug>` (see `scripts/lib/questions.mjs`) |
| Life guides | `client/public/life/domains-index.json` |
| How-tos | `client/public/howtos/index.json` |
| Wisdom topics | `client/public/wisdom/topics.json` |
| Study guides | `client/public/studyguides/index.json` |
| Plans | `client/public/plans/plans-index.json` |
| Church history essays | `client/public/history/essays-index.json` (`/theology/history/<slug>`) |
| Context guides | `client/public/context/guides-index.json` |
| Creeds | `client/public/creeds/documents-index.json` |
| Help | `client/public/needs/index.json` (`/help/<slug>`) |
| Family | `/family/tonight`, `/family/devotions/<id>`, `/family/catechism#q<n>`, `/family/reading-plans` |
| Essays | public slugs from `client/src/lib/shelf.json`, checked with `loadEssayShelf().isPublic(slug)` from `scripts/lib/shelf.mjs` |

## How to check your work

```bash
node scripts/validate-tracks.mjs 2>&1 | grep -E '^  (your-slug|other-slug)[.:]'
```

Your tracks are done when that prints nothing. Ignore errors about other
tracks, and ignore "index.json out of date": the index is rebuilt once, after all
tracks are written.

Do not edit any file but your own track files. Do not rebuild the index, run the
build, or commit.
