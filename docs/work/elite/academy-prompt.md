# Prompt: build the LiveWell Academy and the family resources

James asked for this on 2026-11-27. In his words:

> "I want you to develop like a full curriculum for the academy, like
> processes and steps and whole pathways, using all the videos, the Bible
> studies, the essays, like to learn specific topics about the Bible ... They
> can click through the pathways, they can track their progress, what they've
> learned, how to study the Bible. Basically, I want someone to come in to
> this website. Either they can be unbelievers and they want to learn about
> the Bible, or new believers, teenagers. Also want the resources for families
> to be developed. I want you to write a prompt that would execute this."

Paste everything below the line into a new Claude Code session on this
repository. The prompt is self-contained. Run it in phases: each phase ends in
its own pull request, which James approves before the next phase starts.

---

You are building the **LiveWell Academy** on livewellbyjamesbell.co: a full
curriculum of guided pathways that takes a reader from wherever they are to a
real grasp of the Bible, the faith and how to live it. You are also
completing the **family resources**.

You are working in a live, production site with strict standards. Before you
write anything, read these, in order:

1. `CLAUDE.md`, top to bottom.
2. `docs/VOICE-JAMES-BELL.md` (the voice) and `docs/EDITORIAL-CONSTITUTION.md` (the mission).
3. `docs/work/elite/tracks.md`. The Academy is built on the **track engine** this file describes. Do not build a second engine.
4. `client/src/components/nav/menu.ts`, the menu's Academy door.

## What the Academy is

The Academy is the site's existing tracks, grown into a curriculum.

- **What a track already is.** Numbered sessions of about ten minutes. Each session has its own short teaching, opens one page the site already has, and ends with one question, one thing to do and one verse. Progress is kept on the device. Every track has a leader's guide and a print view.
- **What already exists.** Six tracks: new-to-this, skeptical, stepped-back, deeper, family and mark.
- **What the Academy adds:**
  - more tracks, arranged into **programs**;
  - a **front door** that tells a stranger in plain words what each program is for;
  - a **progress view** of what the reader has learned;
  - **certificates** of completion, but only once accounts exist (see Phase 5).

**The teaching material is already on the site. Use it; do not duplicate it.**
Every session opens a page that exists. The counts below come from the site
catalogue (`client/src/lib/siteCatalog.ts`).

| Material | Count | Where it lives |
|---|---|---|
| Bible films | 83 (36 on books of the Bible, 16 on beliefs, 13 on questions, 10 on big ideas, plus story, verses and stories) | `client/public/explorer/` |
| Study Bible | 66 books, notes on every chapter, a guided "walk" study (`?study=walk`) | `/study/bible` |
| Guides to reading the Bible | 24 | |
| Bible background guides | 41 | |
| The Bible's story | 11 parts | |
| Book pages | 66, with structure, key chapters and themes | |
| What Christians believe | 62 doctrine studies | |
| Where Christians differ | the comparisons and the quiz | |
| The glossary and the creeds | 14 documents | |
| Church history course | 14 lessons | `/theology/history#course` |
| History essays and people | 28 essays, 36 people | `/theology/history` |
| How culture reads the Bible | | `/theology/reading-the-bible` |
| Honest Answers | 35 | `/answers` |
| The case for the faith, For skeptics | | `/questions`, `/skeptics` |
| Essays on the shelf | about 61 public | `client/src/lib/shelf.json`; link only to public essays (`isPublicEssay`) |
| Small group study guides | 68 | `/studyguides` |
| Eight-week plans | 29 | `/plans` |
| Everyday life | 69 guides | `/life` |
| How-to guides | 132 | `/how-tos` |
| What the Bible says, by subject | 208 | `/wisdom` |
| Tools | 28 | `/tools` |
| Family | tonight's devotion, a year of devotions, a 76-question catechism, 4 family reading plans, the Bible Explorer for ages 7 to 16, the family films | `/family` |

## The readers, and the programs for each

Design every program for one reader. The site writes toward the skeptic first
(CLAUDE.md, "Audience Standard").

| Program | Reader | What it covers |
|---|---|---|
| **1. Exploring Christianity** | The unbeliever, curious or skeptical | Who Jesus was, whether the Bible can be trusted, the resurrection, God and suffering, science and faith. The case against is always stated first. Build on the skeptical track; add tracks rather than rewriting it. |
| **2. New to Faith** | The new or returning believer | The gospel; reading the Bible; prayer; the church; baptism and the Supper (fairly, across traditions); when you fail; when you doubt. Build on new-to-this. |
| **3. How to Study the Bible** | Anyone | The seven-step method (`lib/study-method.ts`), genre by genre (law, story, poetry, prophecy, gospel, letter, apocalypse), the Bible in its world, word study, cross-references, one whole book. The Mark track is the model for book tracks: add Genesis, a Psalms track and Romans. |
| **4. The Bible's Big Story** | Anyone | The storyline from creation to new creation, using the 11-part story, the big-idea films and the timeline. |
| **5. What Christians Believe** | Believers going deeper | The creeds' first-order doctrines, then second-order questions fairly (CLAUDE.md, "Handling a contested doctrine"). Uses the 62 doctrine studies and the belief films. |
| **6. Church History** | Anyone | Lay the existing 14-lesson course into the track shape: sessions, a question and a verse each. Then add the "How culture reads the Bible" essays as a follow-on track. |
| **7. Faith for Teenagers** | Readers about 13 to 18 | Shorter sessions (5 to 7 minutes). Plain words, never talked down to. Films first, then a passage, then one question. Topics: is it true, who am I, friends and phones, doubt, the Bible's story. No dating or sexuality track without James's own word on it. Ask him before writing one. |
| **8. Living It** | Adults | Marriage, work, money, grief, anxiety, forgiveness. Built on the life guides, the wisdom topics and the essays. Heavy topics keep a path to Find Help visible in every session (`data/sensitive-pages.json`, the care lines). |

Each program is 2 to 5 tracks. Each track is 6 to 16 sessions. Name each track
by **who it is for and what it does**, in plain words, never a clever title.
James, 2026-11-27, on the menu labels: "no one knows what those are."

## Phases (one pull request each; James approves each before the next)

### Phase 1: the plan, nothing built

Write `docs/work/academy/curriculum.md`.

- **The programs.** For each one: the reader, the outcome, and the tracks in order.
- **The tracks.** For each one: the slug, the plain title, who it is for, the session count, and for every session its title, the page it opens (by real address) and its one question.
- **The coverage table.** Which existing pages and films the curriculum uses. Also which important ones it leaves out, and why.
- **The gaps.** Where a session needs material the site doesn't have. List each gap as a gap; do not write the missing material.

Stop and send James the plan. Do not write a track until he approves it.

### Phase 2: the Academy front door and progress

- **`/academy`.** The programs as illustrated cards, in the site's picture style:
  - cream, black and mustard tokens;
  - the engraved plates (`components/art/`);
  - the rounded picture cards of `pages/explore/`.
- **Each card says:**
  - the reader it is for ("Never read the Bible? Start here");
  - what they will be able to do at the end;
  - how long it takes;
  - "Start" or "Continue".
- **`/academy/<program>`.** The program's tracks in order on a path. Each track shows its sessions done out of its total, read from `livewell-progress-tracks-v1`. Mark the next session clearly.
- **"What I've learned".** A page listing each track, the sessions completed, and the reader's own answers to the session questions. These answers are already stored per session in the progress record. Everything stays on this device: no account, nothing sent. The page says so plainly.
- **Menu.** The menu's Academy door (`components/nav/menu.ts`) leads to `/academy` and lists the programs. Each program gets a plate and a plain line.
- **Discovery.** Add `/academy` and every program page to:
  - the sitemap (`scripts/generate-sitemap.mjs`);
  - the prerender heads, as literal `SEOMeta` in each page file;
  - the search index (`MAIN_PAGES` in `scripts/build-search-index.mjs`);
  - `client/public/llms.txt`.
- **Program data.** A small JSON file, `client/public/academy/programs.json`, listing the track slugs in order. It needs a validator wired into the CI content gates. That validator fails when a listed track does not exist, or when a program has no reader line.

### Phase 3: write the tracks

Write the tracks Phase 1 approved, one program per pull request. Each track is
a JSON file in `client/public/tracks/`, following `docs/work/elite/tracks.md`
exactly: the shape, the leader's guide, `validate-tracks.mjs` and the index
rebuild.

Every session must:

- open **one real page**, never copy it, and give the "why" line;
- use a **film** where one fits, as Watch first;
- give teaching of 40 to 150 words per paragraph, in James's mature voice:
  - full paragraphs;
  - no fragment stacks;
  - no Forbidden Language;
  - no em dashes;
- end with one question, one thing to do, and one verse.

Accuracy rules:

- **Scripture.** Quote it verbatim with its reference, and keep it in context.
- **Sources.** Never invent a quotation, statistic, date, scholar or story about James. When unsure, cut it.
- **Contested doctrines.** Present each in its strongest form, and leave second- and third-order questions open.
- **Heavy topics.** Keep Find Help in reach.

Before each pull request, run `node scripts/validate-tracks.mjs`, `node
scripts/build-tracks-index.mjs`, `pnpm check` and `pnpm test`. Rebuild the
passage index if the sessions open chapters
(`pnpm exec tsx scripts/build-passage-index.mjs`). Look at three sessions in a
browser, on a computer and on a phone.

### Phase 4: the family resources

The family area already has: tonight's devotion, a year of devotions, the
catechism with plain words and talk prompts, 4 reading plans, the Bible
Explorer, and the films matched to devotions (`pages/family/`,
`client/public/family*`).

Plan the additions and send James the list before writing:

- **Age bands.** 3 to 6, 7 to 11 and 12 to 16, each with its own way in.
- **The church year.** A family path through Advent, Lent and Easter that uses the existing seasonal devotions and films.
- **Family tracks.** A track shape for families: 5 minutes at the table, a film, a question for each age, and a prayer.
- **Parents.** A parents' guide on how to lead family worship when you have never done it, and how to answer a child's hard question. Use the existing Good Questions films.
- **Printables.** Catechism cards, a memory-verse chart and a devotion booklet for each season, built with the existing PDF pipeline (`scripts/build-pdfs.mjs`). Family printables are never behind a gift (CLAUDE.md: the Find Help printables and the care plans never ask, and keep family material in that spirit).

### Phase 5: certificates (blocked until accounts exist)

Certificates of completion need reader accounts. Accounts need a schema
change, an auth design and a privacy review, and CLAUDE.md requires stopping
to ask about each. James has been asked how readers should sign in, and has
not yet answered.

**Do not build accounts in this prompt.** Instead, design the certificate in
`docs/work/academy/certificates.md`:

- what it says;
- the plate it carries;
- how a completed track is verified;
- what is stored.

Leave it for the accounts work.

## Rules that hold in every phase

- **Design.**
  - Use tokens only, never hex; `scripts/validate-design.mjs` must pass.
  - Use the cream, black and mustard palette, with mustard under 8% of a screen.
  - Every new page uses the engraved plates and the picture-card style of `pages/explore/`.
  - Phone first: test at 390px.
- **One engine.**
  - Tracks are the unit of learning.
  - Programs only order tracks.
  - Progress lives in `livewell-progress-tracks-v1`.
  - Do not add a second progress store.
- **Free stays free.**
  - Every track, session and page of the Academy is free to read.
  - Do not add a paywall, membership or gift prompt to the Academy. James has not yet decided what the paywall covers.
- **Both runtimes.** If anything needs the API, implement it in `server/` and in `api/index.ts`, and keep `api-parity.test.ts` green. Most of this work needs no API.
- **Gates.** Run every content gate in `.github/workflows/ci.yml`, plus `pnpm check`, `pnpm test`, `pnpm build` and the canonical audit, and report the real results.
- **Pull requests.** Each phase is its own pull request. Merge only on James's word.
- **When in doubt, ask.** Stop and ask James about:
  - any track on sexuality, gender, abortion or politics;
  - any claim you cannot verify;
  - anything that contradicts a Decision Log entry in CLAUDE.md.

## Done means

- **For a stranger.** A stranger can open `/academy`, see in plain words which program is for them, start, and come back days later to "Continue" on the same device.
- **For an unbeliever, a new believer and a teenager.** Each has a program built for them.
- **For families.** Families have age-banded ways in and printables.
- **Progress.** "What I've learned" shows the reader their own record.
- **Materials.** Every session opens a real page of the site, and no new material is written where a page already exists.
- **Checks.** Every check is green.
- **Approval.** James has approved each phase.
