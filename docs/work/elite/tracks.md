# Tracks: the engine, the tracks, and how to write the next

Date: 2026-11-21 (the engine and the first track, branch `elite/nav`); 2026-11-23 (the skeptic's track, the first book study, leader's guides and print views, branch `elite/tools`).

James on 2026-11-21: "I don't want to lose all of those tools. I want to make sure that they're used. What is the best way for people to learn and to study? ... Certain tracks or like steps of discipleship or pathways of discipleship ... Deep in one ... What would be best?" What was agreed: a few tracks built as steps. Each of the five roads on /start becomes a track of numbered sessions of about ten minutes, each session using something the site already has and ending by asking something of the reader; then "Deep in one", a book studied chapter by chapter in the same shape; and a group version of each. This unit builds the model: the engine, and the track for "I'm new to this". The other four tracks and the book study are not written.

James on 2026-11-23: "Finish the tracks: 'I'm skeptical' first, then 'Deep in one: Mark', then the other three, each with a group leader's guide and a printable version." The second run (section below) builds the first two of those, each with a leader's guide and a print view, and gives every track a print view. The other three come in a later run.

The site keeps its own design and voice. What is borrowed from other learning sites is only how they work: lessons in order, a clear next step, free.

## What was built

| Address | What it is |
|---|---|
| `/tracks` | The tracks that are written, each with who it is for, how many sessions, "Start" or "Continue", and its leader's guide when it has one. Then, plainly, the roads of /start that have no track yet, each linking its road. |
| `/tracks/<slug>` | One track: its sessions in order, which are done on this device, "Start" or "Continue" at the first not done, "Start this track over". |
| `/tracks/<slug>/<n>` | One session: read this, then open this, then come back to one question, one thing to do and one verse to keep. A care line where the session is heavy. A group guide. Previous and next. Prints as a session or as the group guide alone, and offers the track's leader's guide beside them. |
| `/tracks/<slug>/leader` | The leader's guide, for a track that has one (`leader` in its file): what the group is, then the group, the room, the order of a meeting, a hard question, someone who is hurting, and when to point someone to Find Help; then every session's group guide in order, with the page each opens, its question, its verse and any care line. Prints as a booklet. A track without one says so and points to its sessions. |
| `/tracks/<slug>/print` | The whole track on one page, to print or to save as a PDF from the browser: every session as its page shows it, less what only works on a screen. Each address is written out for paper, the one question has ruled lines for an answer, and each session starts a new sheet. Every track has one. |

A session never copies the page it uses. It sends the reader into that page with one button, and that page then shows a small bar fixed in its bottom corner, "Back to session 3 of 12", with a way to hide it. The bar is kept for the sitting (sessionStorage, `livewell-track-return-v1`), is drawn by `components/TrackReturnBar.tsx` from App.tsx, changes nothing on the page it sits on, and goes when the reader is back on a track page. It is first in the tab order. One case to know: the guided chapter study covers the whole screen, so the bar shows once the study is closed (the session's link says so).

Progress and the reader's own words are kept on the device through `lib/storage.ts` under `livewell-progress-tracks-v1`: which sessions are marked done, the answer to each session's question, and the "I did this" tick. No account, nothing sent. The session page says so, and shows the shared "Couldn't save to this browser" line if the browser refuses. Opening a session begins the track. "Continue" is always the first session not marked done, and is offered on /tracks, on the track's page, on /start (one line above the five choices, and on the road itself), in Home's existing Continue line beside tonight's devotion, and on My Library.

## Files

- Data: `client/public/tracks/<slug>.json`, and `client/public/tracks/index.json` (generated).
- Rules, builder, gate: `scripts/lib/tracks.mjs`, `scripts/build-tracks-index.mjs` (`--check`), `scripts/validate-tracks.mjs`. Both are in the content-gates step of `.github/workflows/ci.yml`.
- Client: `client/src/lib/tracks.ts` (shapes, loaders, progress), `client/src/lib/trackReturn.ts` (the way back), `client/src/pages/tracks/` (`Tracks.tsx`, `Track.tsx`, `TrackSession.tsx`, `TrackLeader.tsx`, `TrackPrint.tsx`, `parts.tsx`, `tracks.css`), `client/src/components/TrackReturnBar.tsx` and `track-return.css`.
- Wiring: five routes and the return slot in `App.tsx` (the leader's guide and the print view come before `/tracks/:slug/:n`); `lib/startRoad.json` (the `track` field on a road) and `pages/Start.tsx`; `lib/myProgress.ts` (Home's Continue line and My Library); one entry in `lib/siteCatalog.ts`; `scripts/prerender-heads.mjs`, `scripts/generate-sitemap.mjs`, `scripts/build-search-index.mjs`, `client/public/llms.txt`.
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
  "leader": {
    "about": ["One to three paragraphs: what the group is, and who it is for."],
    "sections": [
      { "id": "group", "title": "The group", "body": ["One to three paragraphs."] },
      { "id": "room", "title": "The room", "body": ["..."] },
      { "id": "order", "title": "The order of a meeting", "body": ["..."], "steps": ["Four to eight steps, in order."] },
      { "id": "hard", "title": "When a hard question comes", "body": ["..."] },
      { "id": "hurting", "title": "When someone is hurting", "body": ["..."] },
      { "id": "help", "title": "When to point someone to Find Help", "body": ["Names Find Help."] }
    ]
  },
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

`road` is the id of the road on /start the track grows from, or it is left out (a book study has none). `kind` is one of the kinds in `KINDS` (`scripts/lib/tracks.mjs`): chapter, study, book, film, answer, case, wisdom-finder, wisdom, psalms, self-check, catechism, devotion, plan, guide, help, creed, compare, tool, track, skeptics (the /skeptics room, added 2026-11-23), history (church history, the course or a lesson, added in the third run; `case` was widened then to take the library's room and its areas as well as a piece). Each kind has a pattern its address must match, and a reader's name in `KIND_LABEL` (`lib/tracks.ts`). To let sessions open a kind of page that is not listed, add it in both places.

## What the gate holds a track to

- 4 to 16 sessions, numbered from 1. Each has every field above (`also` and `care` are the only optional ones).
- Every link is a page that is live today, is not a redirect, and matches its kind. An essay must be on the public shelf.
- A track uses at least eight kinds of page across its sessions.
- Scripture stands in double quotation marks with its reference in brackets straight after it, and is word for word from the BSB at that reference. The verse to keep is whole and exact. Words that are not Scripture take single marks.
- No forbidden word or phrase, no em-dash, no signposting, no pressure ("pray this prayer" and the like), no phone number, no first person in the teaching, and an exclamation point only inside Scripture.
- The prayer line is a prompt: it has no quotation, no "Amen", and does not open by addressing God.
- If a session's own words touch sin, guilt, fear, death or doubt, it carries a care line. A care line must be found whole in the Study Bible's plain-words notes (`client/public/bible/notes/*/plain/`) and must name Find Help. It is never written new.
- A leader's guide, when there is one (`leader`), has its six parts in the order above (`LEADER_SECTIONS`), each with a title and one to three paragraphs; only the order of a meeting has steps (four to eight); the last part names Find Help; and all of it keeps the same voice rules, with no first person and no phone number.
- The index is current. It says which tracks have a leader's guide, and gives each track's minutes as the sessions' average to the nearest five.

## How to write the next track

1. Start from the road's steps in `client/src/lib/startRoad.json`. Keep every step's page somewhere in the track (the test holds the road for someone new to this), and contradict none of them.
2. Choose 8 to 12 sessions. For each, choose the one page or tool it opens first, then write the teaching to lead into that page. Rest every claim on the page it opens or on another live page, and reuse that page's wording where a claim is made. Where churches differ, say what all share and that they differ, and take no side.
3. Write in the plain register: "you" or the third person, full sentences, contractions where they sound spoken. Never a memory, feeling or story for James.
4. Pick the verse with `node --input-type=module -e "import {passage} from './scripts/lib/bsb.mjs'; console.log(passage('Mark 1:15').text)"` and paste it exactly.
5. For a heavy session, search the plain-words notes for a paragraph that names Find Help and fits, and copy it whole into `care`.
6. Save as `client/public/tracks/<slug>.json`, then run `node scripts/build-tracks-index.mjs` and `node scripts/validate-tracks.mjs` until it is clean.
7. Add `"track": { "slug": "<slug>", "sessions": <n> }` to the road in `startRoad.json`. /start then offers the track as that road's main action, /tracks moves the road from "Coming" to "Ready now", and the sitemap, prerender and search index pick the track up from the index. Rebuild the search index (`pnpm run search:index`).
8. For a group, write the `leader` parts: say what the group is, then the six parts, drawing on the site's own words for a hurting person and for Find Help (`client/public/needs/curious.json` has a model for helping someone who asks). The page gathers each session's group guide by itself.
9. Walk it on a built site: out to every page and back by the bar, then the leader's guide and the print view, on screen and as print.

A book study follows the same shape with no `road`. /tracks lists it from the index like any other track, after the roads' tracks. The "Deep in one" line on /tracks went when the first, Mark, was written.

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

## The second track: Weigh the case for yourself (I'm skeptical)

Twelve sessions, `client/public/tracks/skeptical.json`, for the road on /start for the skeptic, which now names it. All six of that road's steps are inside it (/skeptics in session 1, the God answer in 2, the resurrection answer in 7, Test the Case in 8, Mark in the Study Bible in 4 and 6, the eight-week plan in 12; `tracks.test.ts` now holds every road with a track to its steps). It follows the proposed list in order. One change: session 10 opens the case-for-the-faith piece "Hasn't science made God unnecessary?" instead of the Bible Explorer film, because the film was made for families with children of 7 to 16 and a skeptic sent to it first would feel handled; the film stays as an "If you have more time" link, offered for talking it over with a child.

| # | Session | Opens | Kind |
|---|---|---|---|
| 1 | Start with the questions | For skeptics | For skeptics |
| 2 | Is anyone there? | Does God actually exist? | Honest Answer |
| 3 | Can the text be trusted? | Copies of copies: isn't it a telephone game? | The case for the faith |
| 4 | Who wrote the Gospels? | The Gospels are anonymous. Weren't the names added later? | The case for the faith |
| 5 | Did Jesus exist, and what did he claim? | Did Jesus even exist? | The case for the faith |
| 6 | Read the source | Mark 1, passage by passage | Bible chapter |
| 7 | The claim everything rests on | Did the resurrection actually happen? | Honest Answer |
| 8 | Argue it yourself | Test the Case | Tool |
| 9 | If God is good | If God is good, why is there so much suffering? | Honest Answer |
| 10 | Science and the god of the gaps | Hasn't science made God unnecessary? | The case for the faith |
| 11 | The church's record | Weren't the Crusades a holy war of conquest? | The case for the faith |
| 12 | Deciding while unsure | What if Christianity is wrong? (then the eight-week plan) | Honest Answer |

Eleven kinds of page with the "If you have more time" links: the /skeptics room (a new kind, `skeptics`), Honest Answers, the case for the faith, a Bible chapter, the guided study, a book of the Bible, Test the Case, a film, two Find Help pages (the curious, church hurt), a plan and the Apostles' Creed. Care lines: session 7 (grief), 9 (suffering, with the line that names the suffering answer), 11 (harm in a church), 12 (grief that makes a person not want to go on). Session 1 asks the reader to write down the question they would most want answered and keep it; session 12 asks for it back, and asks for nothing more. No session asks anyone to believe, pray or decide; the group's prayer line is offered to "those who pray".

## The first book study: Deep in one, the Gospel of Mark

Sixteen sessions, `client/public/tracks/mark.json`, one a chapter, no road. Each opens that chapter's plain-words notes (`/study/bible/mark/<n>#plain`) and uses the other page the proposed list named; session 1 adds Mark's introduction in the Study Bible, session 15 adds Pray Psalm 22, and session 16 adds the Apostles' Creed. Two proposed titles speak in the first person, which the gate refuses in a title, so "Who do you say I am?" is "You are the Christ" and "Help my unbelief" is "A father's honest prayer".

| # | Session | Also uses |
|---|---|---|
| 1 | The beginning of the gospel | Mark's introduction; the film Who Jesus is |
| 2 | Authority to forgive | Was Jesus just a good teacher? |
| 3 | A new family | The film What the church is |
| 4 | Seeds and a storm | The film The kingdom of God |
| 5 | Three people past hope | The Wisdom Finder |
| 6 | Bread in the wilderness | The guided study of Mark 6 |
| 7 | What makes a person unclean | The film What sin is |
| 8 | You are the Christ | Did Jesus claim to be God? |
| 9 | A father's honest prayer | Is believing anything on faith irrational? |
| 10 | A ransom for many | The film Why did Jesus die? |
| 11 | The king arrives | The film The king |
| 12 | Caesar's coin | Should a Christian follow a political party? |
| 13 | Watch | Did Jesus predict the end within a generation? |
| 14 | The table and the garden | The film Baptism and the Lord's Supper |
| 15 | The cross | The film Sacrifice and the Lamb; Pray Psalm 22 |
| 16 | The empty tomb, and Mark's ending | Passages not in the earliest Bibles; the Apostles' Creed |

The teaching reads each chapter in Mark's own shape and agrees with the live notes: "immediately" (about forty times, eleven in chapter 1, from the introduction), the commands to keep quiet and Wrede's name for them (1901), the sandwiches (3, 5, 6 and 11), the road (8 to 10), the hours of the night from 13 to 15, the centurion as the first human being to say "Son of God", and the ending: Sinaiticus and Vaticanus end at 16:8, verses 9 to 20 were known by about 180, most scholars think another hand added them early, a minority defends them, and nothing in them is needed for any belief. Where Christians differ (divorce, the food laws, Caesar, the coming of the Son of Man and "this generation") the session says so and takes no side, as the notes do; on the Supper, session 14 leaves the differences to the film it opens, which sets them out. With its extra links the study uses nine kinds of page. Mark's plain-words notes name no Find Help line, so the care lines come from other books' notes: guilt (2), the fear of having fallen away (3, with the warning about blasphemy), anxiety (4), chronic illness and grief (5), unwanted thoughts (7), the conscience that never rests (9), danger at home (10, with divorce), unanswered prayer (11), suffering (15), grief (16).

## Proposed sessions for the other three tracks

Titles and the page each would open. Every address below was live on 2026-11-21. No prose is written. Some open a kind of page the gate does not list yet (a hub such as /questions, /study/bible or /theology/history); add a kind for it in `KINDS` and `KIND_LABEL` first, as the skeptic's track did for /skeptics.

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

## Decisions that are James's

1. **The name.** The pages say "Tracks", and the track is called "New to faith, or coming back" (the road's own title). "Pathways" is already the name of the twelve topic pathways, which are untouched.
2. **Where it sits.** Listed inside Bible, How to study the Bible. It could instead sit inside Tools, or be named on Home.
3. **Pray the Psalms.** Session 5 opens it. It is still in no menu and still noindex, waiting on his word; the track is now a way in to it.
4. **The teaching itself.** Every session's two paragraphs should be read by him. They rest on the site's own pages, but they are new sentences in his name.
5. **Baptism, the Supper, the Spirit's gifts, falling away.** Each says what all churches share, that they differ, and "ask your pastor". If he wants his own church's practice named, that is his to add.
6. **Twelve sessions of ten minutes.** Fewer and longer, or more and shorter, is a change to the data only.
7. **The order of the next three**, and which book is the next "Deep in one".
8. **A PDF of a track and of its leader's guide.** `scripts/build-pdfs.mjs` already makes comparable booklets (each study guide's leader's guide and handout), so a track could be one. It was not added on 2026-11-23, because since 2026-11-22 every download carries a suggested gift (`shared/downloads.ts`; the study guides ask $2.99), and whether a track's booklet asks one, and how much, is his to say; a PDF with no ask would be the one download that differs. Every track prints whole from the browser at `/tracks/<slug>/print`, and the browser's print dialog saves it as a PDF.
9. **Whether a finished track should say anything** beyond "All 12 sessions done". Nothing is counted, scored or congratulated today.
10. **The skeptic's track (2026-11-23).** Its name, "Weigh the case for yourself", after the road's own note; that it is listed first on /tracks, where the roads' order puts it; that session 10 opens the piece on science and not the family film; and whether `/skeptic-track` (seven essays, four of them off the shelf, so the page is held noindex) is folded into it. Nothing links the two yet.
11. **The Mark study (2026-11-23).** Its name, "Deep in one: the Gospel of Mark", and the reader's words for who it is for, "I want to know one book well"; the two retitled sessions; and that it says "about 15 minutes" a session, the long chapters 14 and 15 at 20.
12. **The leader's guides (2026-11-23).** Their advice on size (four to eight for the skeptic, four to ten for Mark), seventy-five minutes, the order of a meeting, and what a leader does when someone is hurting or a child may be in danger, are new sentences in his name. The track for someone new had none on that day; the third run wrote it (below).
13. **The track for someone who stepped back (third run).** Its name, "Your questions, taken seriously", the road's own note on /start; the two sessions it adds to the proposed ten (John 9 and Matthew 5, below); that "When God seems silent" opens the page on feeling far from God and keeps the family film as an extra; and every sentence of its teaching and its leader's guide, which meet people a church has hurt.

## Not built

- The tracks for going deeper and for the family, until the third run writes them (below), and a second book study.
- A PDF of a track or of a leader's guide (decision 8). Each prints from the browser.
- Any account, sync between devices, or reminder.

## What was run, and what passed (2026-11-21)

- `pnpm check`: pass. All 48 commands of the content-gates step (now with `build-tracks-index.mjs --check` and `validate-tracks.mjs`): pass. `pnpm test`: 168 files passed, 7 skipped; 2,024 tests passed, 73 skipped. `pnpm build`, sitemap, prerender (13 track and session pages), `pnpm audit:canonicals`: pass.
- On the served build (`scripts/serve-like-vercel.mjs`), by script at 390 and at 1440: from Home, the chip, /start, "Start the track", then all twelve sessions, out to every one of the 41 linked pages and back by the bar, an answer typed and kept each time, each session marked done. After session 6 the browser context was closed and reopened: Home said "Continue your track at session 7 of 12", /start and /tracks said the same, session 3 still held its answer and its tick, and Continue opened session 7. No sideways scroll, no console errors.
- By keyboard on sessions 1, 5 and 9: the session's button is reached by Tab with a 2px focus ring; on the page it opens, the first Tab is "Back to session N of 12" (on Pray the Psalms the page moves focus to the open psalm, so the bar is Shift+Tab away); the answer, the tick and "Mark this session done" all work from the keyboard.
- Print preview of session 9 and of its group guide: read, one column each.
- Lighthouse 13.6.0, median of three, phone profile: /tracks 89 performance, 100 accessibility, CLS 0.000; the track's page 92, 100, 0.000; a session 84, 100, 0.000; Home 100, 100, 0.000. Best practices 96 and SEO 100 on all four.
- Layout shift on a hard load with a track in progress and a way back set, at 390: 0 on /start, /tracks, the track, a session, a chapter and the Wisdom Finder. Home at 1440 measured 0.004 with nothing to continue and 0.008 with a track or an eight-week plan to continue: the Continue line shares the slot that line already had.

Not verified: a real phone, Safari, a screen reader, or a printer. The session page's performance was measured on a busy shared machine and sits under the track page's because its first paragraph is set in the reading face.

## The second run (2026-11-23): the skeptic's track, Mark, leader's guides and print views

James on 2026-11-23: "Finish the tracks: 'I'm skeptical' first, then 'Deep in one: Mark', then the other three, each with a group leader's guide and a printable version." This run built the first two, each with its leader's guide, and a print view for every track.

- **Weigh the case for yourself** (`skeptical.json`, twelve sessions) and **Deep in one: the Gospel of Mark** (`mark.json`, sixteen), set out above. Every page a session opens was read in full before the session was written about it, and every claim in the teaching rests on that page or on another live page, in its words where a claim is made. Every quotation of Scripture is the BSB's, checked by the gate. No session speaks as James or gives him a memory, a feeling or a church.
- **The road for the skeptic** on /start now names its track (`startRoad.json`), so /start offers it first with the six steps under it, as it does for someone new.
- **Leader's guides** for both (`leader` in each file; `TrackLeader.tsx`), and a **print view** for every track (`TrackPrint.tsx`). The track's page offers both; a session offers the leader's guide beside its own print buttons; /tracks puts "Leader's guide" on the card of a track that has one.
- **The engine**: the kind `skeptics`; the leader's guide in the gate (`LEADER_SECTIONS`); the index's `leader` flag and minutes to the nearest five; /tracks without the "Deep in one" line, and with no "Coming" section at all once every road has a track.
- **Wiring**: two routes in `App.tsx` before `/tracks/:slug/:n`; prerendered heads and bodies for both pages, and both in the /tracks hub listing (`prerender-heads.mjs`); both in the sitemap; both in the search index (rebuilt) with the /tracks entry's words widened; `llms.txt`; the catalogue's Tracks line. No new door or room: both pages sit under Bible, Tracks, by the place trail.
- **Not done**: a PDF of either (decision 8 above); a leader's guide for the track for someone new; any change to `/skeptic-track` (decision 10); the Decision Log entry on tracks in `CLAUDE.md`, which still says the book study is not written (an agent may not edit that file; it is James's to update).

### Gates record (2026-11-23)

Run on the merged tree, in this order, after this section was first committed; the results are recorded in the commit that follows it.

1. The target branch merged at `d21ac7f8` with no conflicts.
2. All 54 commands of the content-gates step in `.github/workflows/ci.yml`: pass.
3. `pnpm check`: pass (run again after the last edits: pass).
4. `pnpm test`: 186 files passed, 7 skipped; 2,268 tests passed, 73 skipped. `server/tracks-validator.test.ts` now seeds 30 faults, seven of them in a leader's guide; `tracks.test.tsx` renders the leader's guide, the print view, a Mark session and /tracks with all three tracks from the real files.
5. `pnpm build`, `pnpm run sitemap` (48 track addresses: three tracks, 40 sessions, two leader's guides, three print views), `pnpm run prerender` (the same 48 pages, 3,271 files in all), `pnpm audit:canonicals` (2,573 addresses, none unprerendered, no failures): pass. After the last print fixes the build, sitemap, prerender and audit were run again: pass.
6. On the served build (`scripts/serve-like-vercel.mjs`, port 4674), by script at 390 and at 1440, twice (before and after the last print fixes): both tracks from session 1 to the last. Every page each session opens, 23 for the skeptic's track and 35 for Mark, answered 200 and drew its own page; the session's button opened the right address; "Back to session N of M" was on every one of them and brought the reader back; an answer typed and the tick kept in each session, each session marked done; halfway through (session 6 and session 8) a reload kept the answer, the tick and the mark, and /tracks offered "Continue where you left off" at the next session; at the end each track's page said "All 12 sessions done" and "All 16 sessions done". By keyboard on session 1 of each: Tab reaches the session's button with a 2px solid focus ring, Enter opens the page, and the first Tab there is "Back to session 1 of N". Both leader's guides and both print views drew every session, with no sideways scroll at either width and no console errors on any page.
7. As print (print media, and printed to PDF in Letter from the served build): nothing that only works on a screen prints (no field, tick, button, menu or footer), every address is written out, each part of a session stays whole, and each session starts a new sheet. The skeptic's track prints on 25 pages, Mark on 36, the track for someone new on 29; the leader's guides on 15 and 19. The first print had two faults, both fixed and checked again: a one-line overflow of the opening sheet onto a second, and two-digit numbers clipped in the list of sessions.
8. Lighthouse 13.6.0 (`scripts/lighthouse-median.mjs`), median of three, phone profile, on the served build: a session of the skeptic's track (`/tracks/skeptical/7`) 85 performance, 100 accessibility, 96 best practices, 100 SEO, CLS 0.000, LCP 4.4 s; a session of Mark (`/tracks/mark/8`) 84, 100, 96, 100, CLS 0.000, LCP 4.4 s. The same as the first track's sessions on 2026-11-21 (84): the first paragraph is set in the reading face.
9. On the final tree, after the print fixes: all 54 content-gate commands again, pass; `pnpm test` again, 186 files passed, 7 skipped, 2,268 tests passed, 73 skipped.

Not verified: a real phone, Safari, a screen reader, or a printer (the print was checked as print media and as PDF from Chromium, not on paper). The machine was shared and at times heavily loaded, so the Lighthouse numbers are a guide. No person has read the teaching, the questions or the leader's guides: every sentence in them is new and in James's name, and he should read them before anyone is sent to them.
10. The first push was refused: the target had moved. It was fetched and merged again (one conflict, in the comment at the head of `startRoad.json`, where the target had added the two readers no road fits, the doubter and the pastor; both changes were kept). The pages the tracks open that changed upstream were read again (four Honest Answers trimmed, and /skeptics now also offers the case for the faith); nothing in either track contradicts them. The gates were run again on that tree, below.
11. On that tree (`1a6b23b2`): all 54 content-gate commands, pass; `pnpm check`, pass; `pnpm test`, 188 files passed, 7 skipped, 2,282 tests passed, 73 skipped. Before the build the target moved once more (My Library gained a way to carry what a browser keeps, the place in plans and tracks included, to another device), and it merged at `ee3620cb` with no conflicts. On that tree, in order: all 54 content-gate commands, pass; `pnpm check`, pass; `pnpm test`, 190 files passed, 7 skipped, 2,299 tests passed, 73 skipped; `pnpm build`, `pnpm run sitemap` (2,573 addresses, 48 of them the tracks'), `pnpm run prerender` (the 48 track pages, 3,271 files) and `pnpm audit:canonicals` (no failures): pass. On the served build both tracks were walked again at 390 and 1440 as in item 6, this time also failing on any resource that answered with an error, other than `/_vercel` and `/api/track`: every check passed, with no such resource and no console error. Printed again with print media, the page counts were the same (25, 15, 36, 19 and 29). Lighthouse again, median of three: the skeptic's session 83 (total blocking time 145 ms against 75 ms in item 8, on a machine still under load from other work), Mark's 84; both 100 accessibility, 96 best practices, 100 SEO, CLS 0.000.
12. Before the push the target moved once more, with the second verification pass on the Honest Answers, two essays, the short questions and the justice timeline, which cut every quotation that no opened source could confirm. It merged with no conflicts. One line in the tracks leaned on a cut: a question in the group guide for the skeptic's session 10 credited Einstein with the words about the world's comprehensibility that the pass removed from the Honest Answer on faith and science. It now asks the same thing with no name on it: "Science takes it for granted that nature is orderly and that human minds can grasp it. Why should either be true, and is that a question science could answer?" Nothing else in either track rests on what the pass cut (the Rees study, Sanders, Lewis's lines, Bonhoeffer, Collins, Weinberg's prize, Russell's opening words). Russell's "just there, and that's all" was verified and stands in session 2, Clifford's sentence in session 12 was verified word for word, and Mark's count of "immediately" in session 1 is the one Mark's own introduction gives. The page session 10 opens, in the question library, still quotes Einstein; the verification record lists the library for the same pass, and the track no longer depends on it. On that tree, in order: all 54 content-gate commands, pass; `pnpm check`, pass; `pnpm test`, 190 files passed, 7 skipped, 2,299 tests passed, 73 skipped; `pnpm build`, `pnpm run sitemap` (2,573 addresses, 48 of them the tracks'), `pnpm run prerender` (the 48 track pages, 3,271 files) and `pnpm audit:canonicals` (no failures): pass. Both tracks were walked again on the served build at 390 and 1440 as in item 11, and every check passed. Printed again with print media, the page counts were the same. Lighthouse was not run again on this tree, which differs from the one measured in item 11 only in content.

## The third run (2026-11-23): the last three tracks, and a leader's guide for every track

James on 2026-11-23, the same request: "Finish the tracks: 'I'm skeptical' first, then 'Deep in one: Mark', then the other three, each with a group leader's guide and a printable version." This run writes the three roads' tracks in the order asked (stepped back, going deeper, the family), and pushes each when it has passed the gates. It gives the track for someone new its leader's guide, so that every track has one, and it adds one plain line to /studyguides, where the /start card "I'm a pastor or group leader" sends people, pointing a group's leader to the tracks' leader's guides. No door or room changes. Each track prints whole from the print view that already exists.

### The engine

Two changes to the kinds (`scripts/lib/tracks.mjs`, `lib/tracks.ts`): `history` for church history, the course or one of its lessons; and `case`, widened to take the library's room (/questions) and its areas as well as a piece. The test that held the leader's guides to the skeptic's track and Mark now holds every track to having one, and the page test for a track with no leader's guide yet serves a copy of the first track without its guide.

### The third track: Your questions, taken seriously (I've stepped back from faith)

Twelve sessions, `client/public/tracks/stepped-back.json`, for the road "If you've stepped back from faith", which now names it. Its name is the road's own note on /start. All six of the road's steps are inside it: the page on church hurt in session 1, the page on deconstructing in 2, done with church in 3, church history in 10, and what comes after with the eight-week plan in 12.

It follows the proposed list above with three changes, each made for the reader. The silence of God comes straight after prayer, in session 6, and opens the page on feeling far from God, which is written for adults; the family film on God's silence stays as an extra. Two sessions on Jesus himself are added, because the road's own page tells a reader a church has hurt to meet Jesus apart from the voice that misused him, and because a track that only took things apart would stop where deconstruction stops: John 9, the man the leaders threw out and Jesus went looking for (7), and Matthew 5, doing one thing he said (8). And the prayer session prays Psalm 42, which the page on deconstructing gives to someone who misses the old songs, while Psalm 13 is read in session 4.

| # | Session | Opens | Kind |
|---|---|---|---|
| 1 | If a church hurt you | The church hurt me | Find Help |
| 2 | If you're taking it apart | I'm deconstructing my faith | Find Help |
| 3 | Done with church, not with Jesus? | Done with church but not Jesus? | Honest Answer |
| 4 | Angry at God | Is it okay to be angry at God? | Honest Answer |
| 5 | A prayer for when you can't pray | Pray Psalm 42 slowly | Pray the Psalms |
| 6 | When God seems silent | Feeling Far From God | What the Bible says |
| 7 | Thrown out, and found | John 9, passage by passage | Bible chapter |
| 8 | Do one thing he said | Matthew 5, passage by passage | Bible chapter |
| 9 | The faith before your church | The Apostles' Creed | Creed |
| 10 | The longer story | Church history | Church history |
| 11 | The question you couldn't ask | The case for the faith | The case for the faith |
| 12 | What comes after | What happens after deconstruction? (then the eight-week plan) | Honest Answer |

With its extra links the track uses eleven kinds of page: Find Help, a plan, Honest Answers, two wisdom subjects, Pray the Psalms, a film, Bible chapters, a creed, church history, the case for the faith, and the /skeptics room. Care lines, each reused whole from the plain-words notes: a controlling leader or church (1), the fear of having fallen away (2 and 9), harm in a church and being told to forgive and say nothing (3 and 8), suffering that does not feel light (4), Psalm 42's own (5), feeling forsaken and thoughts of self-harm (6), being shunned by a church or a family (7), and grief that makes a person not want to go on (12). Nothing asks the reader to come back to church, to pray, or to decide anything; the group's prayer line is for those who pray, and anyone else keeps a minute of quiet.

Every claim outside Scripture rests on a live page that the session opens or links, in that page's words where it can: the shapes church hurt takes, what belongs with the police, and the line between disappointment and the use of God's name to control (the page on church hurt); the package and the older faith, Josiah's excavation, and the Bereans (the page on deconstructing); the drifted believer and the coal from the fire (the two Honest Answers on church); the two kinds of anger and the psalms of complaint (the Honest Answer on anger, and the wisdom page, for Job's friends); Elijah's sleep, bread and second meal before God's question (the film on God's silence, against 1 Kings 19); feelings that rise and fall with sleep, grief and the weather (the wisdom page); the man Jesus went looking for, and the warning that reaches religious readers most of all (the notes on John 9); refusing revenge while keeping yourself and others safe (the notes on Matthew 5); the creed's origin in the baptismal questions, its five centuries, Pilate as a date and what the creed leaves out (the creed's page and the page on deconstructing); the first Christians' cities, their lack of buildings and clergy, and the four things that held them (the course's first lesson), and the crusades, the inquisition, the wars of religion and the revival preachers who made their peace with slavery (the course's own lessons); the library's ten areas and the parts of each piece (the library); and repentance rather than rebellion, the field that doesn't stay empty, and a demolition with a destination (the Honest Answer on what comes after).

The leader's guide is for a group that can hold people who still believe, people who no longer do, and people who don't know. It says to think before meeting in a church building, to say at the first meeting that what is said stays in the room unless someone is in danger, never to defend a church or a leader against someone's account of what was done to them, to keep out both the crowd that panics and the crowd that cheers people toward the door, and never to ask anyone to meet the person who hurt them, to forgive quickly, or to stay where they are being hurt. A crime, and above all harm to a child, belongs with the police and the proper authorities, and the leader does not promise secrecy.

### A leader's guide for the track for someone new

`new-to-this.json` now has its `leader`, in the same six parts. Two people, someone new and a friend further on, are as good as a group of eight. Where churches differ (baptism, the Supper, some of the Spirit's gifts) the leader says what all share and sends each person to their own pastor, as the sessions do; doubt is given time, as session 10 gives it. The guide closes with the same word on Find Help as the others, naming a habit someone cannot break on their own among the weights to watch for.

### Gates record (third run, first push: the track for someone who stepped back, and the first track's leader's guide)

Run on the merged tree, in this order.

1. The target branch merged twice with no conflicts, last at `7bcf2082`; nothing the tracks open changed in either merge (the first brought Home's tonight slot and the family pages, the second the plain-words notes for Judges and Ruth).
2. All 54 commands of the content-gates step in `.github/workflows/ci.yml`: pass.
3. `pnpm check`: pass.
4. `pnpm test`: 192 files passed, 7 skipped; 2,346 tests passed, 73 skipped.
5. `pnpm build`, `pnpm run sitemap` (2,589 addresses, sixteen more than before: the new track, its twelve sessions, its leader's guide and its print view, and the first track's leader's guide), `pnpm run prerender` (64 track pages, 3,287 files) and `pnpm run audit:canonicals` (2,589 checked, none unprerendered, no failures): pass.
6. On the served build (`scripts/serve-like-vercel.mjs`, port 4675), by script at 390 and at 1440: the track from session 1 to 12. Each of the 19 links its sessions offer, the page each opens and every extra, was clicked from its session, landed on its own address, answered 200 from the server, drew its own page (not the not-found page), and showed "Back to session N of 12", which brought the reader back with the answer still in its box. Each session was marked done; at session 6 a reload kept the answer, the tick and the mark, and /tracks offered "Continue where you left off" at session 7; at the end the track's page said "All 12 sessions done". The leader's guides of both tracks drew all six parts and every session, and both print views drew every session. No sideways scroll at either width, no console error, and no resource that answered with an error, other than the analytics addresses the local server does not serve (`/_vercel`, `/api/track`). By keyboard on sessions 1, 5 and 7, at both widths: Tab reaches the session's button with a 2px solid focus ring, Enter opens the page, and the first Tab there is "Back to session N of 12", except on Pray the Psalms, which moves focus into the open psalm, so the bar is one Shift+Tab away (as the first run found).
7. As print (print media, Letter, from the served build): the new track prints on 25 pages and its leader's guide on 16; the first track on 29, as before, and its new leader's guide on 15. Nothing that only works on a screen prints.
8. Found and fixed on the way: the line on /studyguides first sat inside the page's prose band, where a link looks like body text (the /plans page has the same quirk, which this run leaves alone); it is now the bordered one-line pointer the creeds page and /tracks use, with the link underlined. And the local server keeps compressed pages in memory, so after a rebuild it must be restarted before a walk, or it serves the old pages with the old asset names.

Not verified: a real phone, Safari, a screen reader, or a printer. Lighthouse was not run for this track; its session pages are built like the others, which measured 83 to 85 on the phone profile. No person has read the new teaching, questions or leader's guides: every sentence is new and in James's name.
