# Prompt for the Gather Church film session: rebuild the LiveWell Bible films

Paste everything below the line into the Claude session on the Mac that made the Gather Church films.

---

You made the Gather Church films in `~/Projects/gather-church/film/`. I want the same craft, at a higher bar, for my other site: LiveWell by James Bell (livewellbyjamesbell.co), repo at `~/Livewell-`. Start by running `git pull` on `main` there, then read `~/Livewell-/CLAUDE.md` and `~/Livewell-/film/README.md`.

## What I am asking for

LiveWell has 83 short "Bible films" today. They are tap-through pages with drawn frames and a computer voice. I want every one of them rebuilt as a real film, made the way you made Gather's: one recorded voice take in ElevenLabs, a picture that moves the whole time and changes with the words, music under the voice, and a finished MP4. I also want new films from the eight scripts already written in `~/Livewell-/film/`.

The viewer I have in mind is a teenager, or an adult opening the Bible for the first time. The films should hold that person's attention and leave them understanding something true that they did not understand a minute earlier. Think of the way BibleProject's films flow, with one idea unfolding into the next and the picture doing half the teaching. I want that flow, in LiveWell's own look.

Work through this in order. Do not skip the pilot.

## Step 1: two pilots, then stop and show me

Build these two first, start to finish:

1. `film/trust-the-bible` ("Can you trust the Bible?")
2. `film/whose-kingdom` ("Whose kingdom?")

Each folder has `script.json` (chapters, kickers, music levels, lines), `narration.txt` (the lines in order, for one voice take) and `facts.md` (every fact in the script and where to check it). The scripts were written in a cloud session that could not see your tools, so the field names and `gap` are a guess from my description. Match them to `film/beliefs/script.json` in the Gather project before you build.

Send me both MP4s and wait. I will tell you what to change before you make any more. Everything after this step uses what we learn from the pilots.

## Step 2: the other six new films

`film/you-are-that-man`, `film/one-story`, `film/the-verse-next-door`, `film/mark-in-a-minute`, `film/the-oldest-report`, `film/how-long`. Same pipeline. (If these folders are missing after `git pull`, they are still in pull request #645; tell me.)

## Step 3: rebuild the 83 existing films

The existing films are data, one file each: `client/public/explorer/films/<slug>.json`, listed in `client/public/explorer/index.json` in seven groups (36 books of the Bible, 16 beliefs, 13 questions, 10 ideas, 3 story, 3 verses, 2 stories). Each file has the film's frames, its captions at two levels (younger and older), its verses, and its care lines. `docs/work/elite/explorer-ledger.md` names the source of every claim in every film.

For each one, write a new `film/<slug>/script.json` and build it. You have liberty to teach: you do not have to keep the old captions. Write as a teacher with a doctorate who can explain anything to a fifteen-year-old, in plain words, with one clear idea per scene and a line worth remembering at the end. Use the old film and its ledger rows as your fact base, and the book's own page data (`client/public/bible/notes/<book>/intro.json`) for the books.

Go in this order, in batches of five, sending me each batch to watch: the 3 story films, then the 36 books in Bible order, then beliefs, questions, ideas, verses and stories. Keep a running list in `film/STATUS.md`: slug, script written, recorded, built, sent to James, approved.

## How to make each film

Use your Gather pipeline as it is: script, one ElevenLabs take, `build-audio.py` for timing, `film.html` with a `frame(t)` function, contact sheet, music, mix, render, encode, poster. Copy the tools into `~/Livewell-/film/` and adapt them there. Do not edit anything inside `~/Projects/gather-church`.

- **Voice.** ElevenLabs in my Chrome, the same voice and settings as Gather ("Brian - Deep, Resonant and Comforting", Eleven v4, Stability 0.10, Similarity 0.09), the whole script as one take. Before recording, check the text in the editor against `narration.txt`: the character count must match and the first word must be whole. Other Claude sessions share that tab, so message them before using it and send "free" when done. Tell me roughly how many ElevenLabs characters each batch used, so I can watch the cost.
- **Look.** LiveWell's own colors and fonts, from `client/src/index.css` and `client/public/fonts/`: cream, near-black, one mustard accent used sparingly, Cormorant Garamond for display and Inter for labels. Not Gather's midnight, blue and gold. Flat shapes only. No photos, no AI-generated images, no faces. God and Christ are never drawn.
- **Motion.** This is where I want you to go past Gather. Something should be moving in every second: a map that draws its own road, a scroll that unrolls, a timeline that fills, a crowd of dots that gathers or scatters. Each scene should grow out of the one before it instead of cutting to a new slide. Slow and smooth; nothing bounces or flashes. One idea on screen at a time.
- **Words on screen.** Kicker at the top, captions in step with the voice at the bottom. When Scripture is spoken or shown, show the reference and "Berean Standard Bible".
- **Ending.** A title card with the film's closing line, then "LiveWell by James Bell".
- **Length.** One to two minutes for most. A book of the Bible can run to three.

## Rules that matter most

- **Scripture is exact.** Every quotation is the Berean Standard Bible, copied from `client/public/bible/text/<book>/<chapter>.json`, never typed from memory. The site treats the BSB as public domain; confirm that on the publisher's own page before the first recording and tell me what you find.
- **Nothing invented.** No made-up quote, date, number, scholar or story, and no story about me. Check each fact in `facts.md` against a real source before recording; if you cannot confirm one, cut the sentence and tell me. One sentence in `film/the-oldest-report` is flagged there with a safer wording.
- **Where Christians differ, take no side.** Baptism, the Supper, the end times, the dating of books, Jonah as history or parable, and the like: name the views fairly and move on. The existing films already do this; keep it.
- **Hard passages.** Violence, abuse and death are named, never shown or described. The existing films' care lines (the sentences pointing to Find Help) stay word for word on the film's page. Never write a new one.
- **No contempt.** Nothing that blames the Jewish people, nothing that ties a passage to a modern nation, party or person.
- **Voice.** Warm, direct, plain words, contractions. No exclamation marks except inside a verse that has one. No em dashes. None of: delve, journey, transformational, unpack, navigate, leverage, tapestry, robust, nuanced.
- **You cannot hear.** Say so each time, and let me be the first listener. Names are where a voice goes wrong: list the hard names in each film so I know what to listen for.

## Where the films go, and what not to touch

- Leave the 83 existing film pages working exactly as they are until I approve their replacements. Do not delete or edit `client/public/explorer/` or the player code.
- Do not commit MP4s to the git repo. At about 10 MB a minute, 90 films would swamp it. Keep finished files in `~/Livewell-/film/out/` (add that folder to `.gitignore`) and propose to me where they should be hosted before any page uses one.
- Put nothing on the live site until I say yes. Pushing `main` in `~/Livewell-` deploys the site, so never push without my go-ahead. Commit scripts and tools on a branch.
- Never publish to Substack, Facebook or YouTube. Leave files and tell me where they are.
- When I approve a film for the site, it goes on its page the way Gather's do: nothing loads until someone presses play, with a "Read the words" list of every line underneath so no one needs sound.

## What I want back each time

A short message: which films are ready, where the MP4s are, what you checked, what you could not check, the hard names to listen for, and any sentence you cut. If something blocks you, say what and stop; do not work around it.
