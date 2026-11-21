# Tracks: the engine, the first track, and how to write the next

Date: 2026-11-21. Branch `elite/nav`.

James on 2026-11-21: "I don't want to lose all of those tools. I want to make sure that they're used. What is the best way for people to learn and to study? ... Certain tracks or like steps of discipleship or pathways of discipleship ... Deep in one ... What would be best?" What was agreed: a few tracks built as steps. Each of the five roads on /start becomes a track of numbered sessions of about ten minutes, each session using something the site already has and ending by asking something of the reader; then "Deep in one", a book studied chapter by chapter in the same shape; and a group version of each. This unit builds the model: the engine, and the track for "I'm new to this". The other four tracks and the book study are not written.

The site keeps its own design and voice. What is borrowed from other learning sites is only how they work: lessons in order, a clear next step, free.

## What was built

| Address | What it is |
|---|---|
| `/tracks` | The tracks that are written, each with who it is for, how many sessions, and "Start" or "Continue". Then, plainly, what is not written yet: the other four roads (each linking its road on /start) and "Deep in one: the Gospel of Mark". |
| `/tracks/<slug>` | One track: its sessions in order, which are done on this device, "Start" or "Continue" at the first not done, "Start this track over". |
| `/tracks/<slug>/<n>` | One session: read this, then open this, then come back to one question, one thing to do and one verse to keep. A care line where the session is heavy. A group guide. Previous and next. Prints as a session or as the group guide alone. |

A session never copies the page it uses. It sends the reader into that page with one button, and that page then shows a small bar fixed in its bottom corner, "Back to session 3 of 12", with a way to hide it. The bar is kept for the sitting (sessionStorage, `livewell-track-return-v1`), is drawn by `components/TrackReturnBar.tsx` from App.tsx, changes nothing on the page it sits on, and goes when the reader is back on a track page. It is first in the tab order. One case to know: the guided chapter study covers the whole screen, so the bar shows once the study is closed (the session's link says so).

Progress and the reader's own words are kept on the device through `lib/storage.ts` under `livewell-progress-tracks-v1`: which sessions are marked done, the answer to each session's question, and the "I did this" tick. No account, nothing sent. The session page says so, and shows the shared "Couldn't save to this browser" line if the browser refuses. Opening a session begins the track. "Continue" is always the first session not marked done, and is offered on /tracks, on the track's page, on /start (one line above the five choices, and on the road itself), in Home's existing Continue line beside tonight's devotion, and on My Library.

## Files

- Data: `client/public/tracks/<slug>.json`, and `client/public/tracks/index.json` (generated).
- Rules, builder, gate: `scripts/lib/tracks.mjs`, `scripts/build-tracks-index.mjs` (`--check`), `scripts/validate-tracks.mjs`. Both are in the content-gates step of `.github/workflows/ci.yml`.
- Client: `client/src/lib/tracks.ts` (shapes, loaders, progress), `client/src/lib/trackReturn.ts` (the way back), `client/src/pages/tracks/` (`Tracks.tsx`, `Track.tsx`, `TrackSession.tsx`, `parts.tsx`, `tracks.css`), `client/src/components/TrackReturnBar.tsx` and `track-return.css`.
- Wiring: three routes and the return slot in `App.tsx`; `lib/startRoad.json` (the `track` field on a road) and `pages/Start.tsx`; `lib/myProgress.ts` (Home's Continue line and My Library); one entry in `lib/siteCatalog.ts`; `scripts/prerender-heads.mjs`, `scripts/generate-sitemap.mjs`, `scripts/build-search-index.mjs`, `client/public/llms.txt`.
- Tests: `server/tracks-validator.test.ts` (the clean library passes; 23 seeded faults each fail by name; a stale index fails), `client/src/lib/tracks.test.ts` (progress, the way back, the data held to /start), `client/src/pages/tracks/tracks.test.tsx` (the three pages and the bar, from the real files), and two cases added to `client/src/pages/start.test.tsx`.

## The data shape

```json
{
  "slug": "new-to-this",
  "title": "New to faith, or coming back",
  "for": "I'm new to this",
  "road": "new",
  "subtitle": "80 to 240 characters: what the track is for.",
  "intro": ["One to three short paragraphs."],
  "sessions": [
    {
      "n": 1,
      "title": "Who Jesus is",
      "minutes": 10,
      "teaching": ["One or two paragraphs, 40 to 150 words each."],
      "open": { "kind": "chapter", "label": "Mark 1, passage by passage", "href": "/study/bible/mark/1#plain", "why": "One line: why this page, here." },
      "also": [{ "kind": "film", "label": "...", "href": "...", "why": "..." }],
      "question": "One question, ending in a question mark?",
      "do": "One thing to do.",
      "verse": { "ref": "Mark 1:15", "text": "The verse, word for word from the Berean Standard Bible." },
      "care": ["Only where the session is heavy: one or two care lines, each reused whole."],
      "group": { "open": "An opening question?", "discuss": ["Three questions?", "...?", "...?"], "pray": "A prompt for prayer, never words to recite." }
    }
  ]
}
```

`road` is the id of the road on /start the track grows from, or it is left out (a book study has none). `kind` is one of the kinds in `KINDS` (`scripts/lib/tracks.mjs`): chapter, study, book, film, answer, case, wisdom-finder, wisdom, psalms, self-check, catechism, devotion, plan, guide, help, creed, compare, tool, track. Each kind has a pattern its address must match, and a reader's name in `KIND_LABEL` (`lib/tracks.ts`). To let sessions open a kind of page that is not listed, add it in both places.

## What the gate holds a track to

- 4 to 16 sessions, numbered from 1. Each has every field above (`also` and `care` are the only optional ones).
- Every link is a page that is live today, is not a redirect, and matches its kind. An essay must be on the public shelf.
- A track uses at least eight kinds of page across its sessions.
- Scripture stands in double quotation marks with its reference in brackets straight after it, and is word for word from the BSB at that reference. The verse to keep is whole and exact. Words that are not Scripture take single marks.
- No forbidden word or phrase, no em-dash, no signposting, no pressure ("pray this prayer" and the like), no phone number, no first person in the teaching, and an exclamation point only inside Scripture.
- The prayer line is a prompt: it has no quotation, no "Amen", and does not open by addressing God.
- If a session's own words touch sin, guilt, fear, death or doubt, it carries a care line. A care line must be found whole in the Study Bible's plain-words notes (`client/public/bible/notes/*/plain/`) and must name Find Help. It is never written new.
- The index is current.

## How to write the next track

1. Start from the road's steps in `client/src/lib/startRoad.json`. Keep every step's page somewhere in the track (the test holds the road for someone new to this), and contradict none of them.
2. Choose 8 to 12 sessions. For each, choose the one page or tool it opens first, then write the teaching to lead into that page. Rest every claim on the page it opens or on another live page, and reuse that page's wording where a claim is made. Where churches differ, say what all share and that they differ, and take no side.
3. Write in the plain register: "you" or the third person, full sentences, contractions where they sound spoken. Never a memory, feeling or story for James.
4. Pick the verse with `node --input-type=module -e "import {passage} from './scripts/lib/bsb.mjs'; console.log(passage('Mark 1:15').text)"` and paste it exactly.
5. For a heavy session, search the plain-words notes for a paragraph that names Find Help and fits, and copy it whole into `care`.
6. Save as `client/public/tracks/<slug>.json`, then run `node scripts/build-tracks-index.mjs` and `node scripts/validate-tracks.mjs` until it is clean.
7. Add `"track": { "slug": "<slug>", "sessions": <n> }` to the road in `startRoad.json`. /start then offers the track as that road's main action, /tracks moves the road from "Coming" to "Ready now", and the sitemap, prerender and search index pick the track up from the index. Rebuild the search index (`pnpm run search:index`).
8. Walk it on a built site: out to every page and back by the bar.

A book study follows the same shape with no `road`. /tracks lists it from the index like any other track; take "Deep in one" out of the "Coming" list in `pages/tracks/Tracks.tsx` (`DEEP_IN_ONE`) when the first is written.

## The first track: New to faith, or coming back

Twelve sessions. All six steps of the road for someone new are inside it (John in session 4, the prayer plan in 5, finding a church in 7, the catechism in 8, the eight-week plan and the study guide in 12).

| # | Session | Opens | Kind |
|---|---|---|---|
| 1 | Who Jesus is | Mark 1, passage by passage | Bible chapter |
| 2 | Why he died and rose | Why did Jesus die? | Film |
| 3 | Trusting him: grace and faith | Ephesians 2, passage by passage | Bible chapter |
| 4 | How to read the Bible | How to study the Bible | Study method |
| 5 | How to pray | Pray Psalm 23 slowly | Pray the Psalms |
| 6 | The Holy Spirit | The Holy Spirit in a believer | Film |
| 7 | The church, and why it matters | Finding a Church | What the Bible says |
| 8 | Baptism and the Lord's Supper | Baptism and the Lord's Supper | Film |
| 9 | When you fail | 1 John 1, passage by passage | Bible chapter |
| 10 | When you doubt | What if Christianity is wrong? | Honest Answer |
| 11 | Living it on a Tuesday | What Does the Bible Say About What I Am Facing? | Wisdom Finder |
| 12 | What next | Eight Weeks for a New Christian | Plan |

With the "If you have more time" links, the track uses seventeen kinds of page: Bible chapters, the study method and the guided study, a book of the Bible, films, Honest Answers, a piece from the case for the faith, the Wisdom Finder, a wisdom subject, Pray the Psalms, two self-checks, the catechism, tonight's devotion, two plans, a study guide, a Find Help page, the traditions page, and three tools.

Care lines: session 2 (guilt, and grief), session 7 (hurt in a church), session 9 (the fear of having fallen away, whole), session 10 (the conscience that never rests).

## Proposed sessions for the other four tracks and the first book study

Titles and the page each would open. Every address below is live today. No prose is written.

**I'm skeptical**

| # | Session | Opens |
|---|---|---|
| 1 | Start with the questions | /skeptics |
| 2 | Is anyone there? | /answers/does-god-actually-exist |
| 3 | Can the text be trusted? | /questions/text/copies-of-copies |
| 4 | Who wrote the Gospels? | /questions/authors/the-gospels-are-anonymous |
| 5 | Did Jesus exist, and what did he claim? | /questions/jesus/did-jesus-exist |
| 6 | Read the source | /study/bible/mark/1#plain |
| 7 | The claim everything rests on | /answers/did-the-resurrection-actually-happen |
| 8 | Argue it yourself | /tools/test-the-case |
| 9 | If God is good | /answers/if-god-is-good-why-suffering |
| 10 | Science | /study/explorer/watch/science-and-the-bible |
| 11 | The church's record | /questions/morality/the-crusades |
| 12 | Deciding while unsure | /answers/what-if-christianity-is-wrong, then /plans/skeptic |

**I've stepped back from faith**

| # | Session | Opens |
|---|---|---|
| 1 | If a church hurt you | /help/church-hurt |
| 2 | If you're taking it apart | /help/deconstructing |
| 3 | Done with church, not with Jesus? | /answers/done-with-church-but-not-jesus |
| 4 | Angry at God | /answers/is-it-okay-to-be-angry-at-god |
| 5 | A prayer for when you can't pray | /tools/pray-the-psalms?psalm=13 |
| 6 | The faith before your church | /resources/creeds/apostles-creed |
| 7 | The longer story | /theology/history |
| 8 | The question you couldn't ask | /questions |
| 9 | When God seems silent | /study/explorer/watch/god-silent |
| 10 | What comes after | /answers/what-happens-after-deconstruction, then /plans/deconstruction |

**I want to go deeper**

| # | Session | Opens |
|---|---|---|
| 1 | Read a whole book | /study/bible |
| 2 | How each kind of book reads | /study/bible/guides |
| 3 | Seven steps on a hard chapter | /study/bible/romans/8?study=walk |
| 4 | The whole story | /study/bible/story |
| 5 | The world it was written in | a context guide under /resources/context (a new kind for the gate) |
| 6 | One doctrine, followed through | /study/bible/doctrines |
| 7 | The words the church confessed | /resources/creeds |
| 8 | Two thousand years | /theology/history |
| 9 | Where Christians differ | /theology/compare |
| 10 | What you actually believe | /tools/theology-quiz |
| 11 | A rule of life | /tools/rule-of-life |
| 12 | Hand it on | /studyguides |

**I'm leading a family**

| # | Session | Opens |
|---|---|---|
| 1 | Tonight | /family/tonight |
| 2 | One question, learned together | /family/catechism |
| 3 | The whole Bible in two minutes | /study/explorer/watch/bible-two-minutes |
| 4 | The map | /study/explorer |
| 5 | Praying at the table | /study/explorer/watch/prayer |
| 6 | A plan you can keep | /family/reading-plans |
| 7 | When a child asks a hard one | /study/explorer/watch/who-made-god |
| 8 | When a teenager says no | /answers/when-your-teenager-says-they-dont-believe |
| 9 | Talking with a teen | /tools/parent-teen-conversation |
| 10 | For the grown-ups | /studyguides/raising-believers |

**Deep in one: the Gospel of Mark** (sixteen sessions, one a chapter; each opens the chapter's plain-words notes at /study/bible/mark/N#plain, and the second column is the other page it would use)

| # | Chapter | Also uses |
|---|---|---|
| 1 | The beginning of the gospel | /study/explorer/watch/who-jesus-is |
| 2 | Authority to forgive | /answers/was-jesus-just-a-good-teacher |
| 3 | A new family | /study/explorer/watch/the-church |
| 4 | Seeds and a storm | /study/explorer/watch/kingdom-of-god |
| 5 | Three people past hope | /tools/wisdom-finder |
| 6 | Bread in the wilderness | /study/bible/mark/6?study=walk |
| 7 | What makes a person unclean | /study/explorer/watch/what-sin-is |
| 8 | Who do you say I am? | /questions/jesus/did-jesus-claim-to-be-god |
| 9 | Help my unbelief | /answers/is-faith-irrational |
| 10 | A ransom for many | /study/explorer/watch/why-jesus-died |
| 11 | The king arrives | /study/explorer/watch/the-king |
| 12 | Caesar's coin | /answers/should-a-christian-follow-a-political-party |
| 13 | Watch | /questions/jesus/did-jesus-predict-the-end-within-a-generation |
| 14 | The table and the garden | /study/explorer/watch/baptism-and-supper |
| 15 | The cross | /study/explorer/watch/the-lamb |
| 16 | The empty tomb, and Mark's ending | /questions/text/passages-not-in-the-earliest-bibles |

## Decisions that are James's

1. **The name.** The pages say "Tracks", and the track is called "New to faith, or coming back" (the road's own title). "Pathways" is already the name of the twelve topic pathways, which are untouched.
2. **Where it sits.** Listed inside Bible, How to study the Bible. It could instead sit inside Tools, or be named on Home.
3. **Pray the Psalms.** Session 5 opens it. It is still in no menu and still noindex, waiting on his word; the track is now a way in to it.
4. **The teaching itself.** Every session's two paragraphs should be read by him. They rest on the site's own pages, but they are new sentences in his name.
5. **Baptism, the Supper, the Spirit's gifts, falling away.** Each says what all churches share, that they differ, and "ask your pastor". If he wants his own church's practice named, that is his to add.
6. **Twelve sessions of ten minutes.** Fewer and longer, or more and shorter, is a change to the data only.
7. **The order of the next four**, and whether Mark is the first book study.
8. **A printed booklet** of a whole track or its group guides (the PDFs are built by `pnpm pdfs`; none is built for tracks).
9. **Whether a finished track should say anything** beyond "All 12 sessions done". Nothing is counted, scored or congratulated today.

## Not built

- The other four tracks and the book study.
- A PDF of a track. A session and a group guide print from the browser.
- Any account, sync between devices, or reminder.
- A leader's page for a group beyond each session's guide.
