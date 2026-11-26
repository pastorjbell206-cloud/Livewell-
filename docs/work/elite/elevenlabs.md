# ElevenLabs: a natural voice for the films, videos to share, and a prompt for the Ends site

James, 2026-11-25: "I have 11 labs open. I want you to utilize it to its full
potential to edit the videos on this website to make the voices and videos
smoother, less robotic. The Bible films, also any ebook voiceovers and video
content. I'd like to have the ability to share those Bible films on TikTok and
Instagram and social media." And: "What can you do to utilize 11 Labs to its
full potential for the Ends website? ... create a prompt."

He declined to save his ElevenLabs key on the cloud environment, so nothing
here calls ElevenLabs from a cloud session. The key stays on his own Mac.

## Where things stand

- **The films' voice today** is Kokoro, a small open speech model (the British
  stock voice `bm_lewis`). It is why the films sound robotic. All 59 films
  have it: 903 short MP3s, one per frame per reading level, in
  `client/public/explorer/audio/`. `scripts/build-film-audio.mjs --check`
  (a CI gate) proves every file says what its page says.
- **ElevenLabs is now a second engine** for the same builder
  (`scripts/lib/film-voice-elevenlabs.mjs`, tested in
  `client/src/lib/film-voice-elevenlabs.test.ts`). It speaks each sentence with
  the sentences around it as context (ElevenLabs' `previous_text` and
  `next_text`), which keeps the intonation continuous across the joins, then
  lays them out with the same exact pauses and the same -16 LUFS loudness. It
  was tested end to end with a stand-in for the service on "The gospel in a
  minute" (15 files, correct pauses and loudness, a busy reply retried). It has
  not yet been run against ElevenLabs itself.
- **Videos for TikTok and Instagram already work.**
  `scripts/export-film-video.mjs` renders a film as a vertical (1080 by 1920),
  square or wide MP4 with every caption burned in (most people scroll with the
  sound off) and the voice laid on. A sample, "The gospel in a minute", vertical,
  114 seconds, 5.7 MB, was made on 2026-11-25 with today's voice. The film
  pages already show "Download the video" for any film whose data names a
  committed file; none does yet, because 59 films in two shapes come to about
  250 MB, too large for the repository. That is still open question 11 in
  `explorer.md`.

## Step 1: choose the voice (in ElevenLabs, in the browser)

The site's rule for the films is a **stock** voice, never a clone of a real
person, and the page says the voice is computer-made. In ElevenLabs, open
Voices, then the Voice Library, and pick a narrator: warm, unhurried, clear,
good with Scripture. Listen to it read a verse and a hard sentence ("Jesus died
for our sins, and on the third day he was raised, in his body."). Or use Voice
Design to describe one ("a calm, warm male narrator, mid-forties, American,
measured pace, for reading the Bible to families"). Copy its **voice ID**.

## Step 2: set the voice (one file)

In `scripts/film-audio.config.json` set:

```json
"engine": "elevenlabs",
"voice": "<the voice ID>",
"lang": "en",
"speed": 1,
"elevenlabs": {
  "model": "eleven_multilingual_v2",
  "stability": 0.55,
  "similarityBoost": 0.75,
  "style": 0.15,
  "speed": 0.95
}
```

Then look at `respell`: `Judaea` and `Izrael` were there only because the
British Kokoro voice stressed those names wrongly. Remove those two for
ElevenLabs; keep `LORD` as `Lord` and the verse-number line.

## Step 3: make the voice (on the Mac, with the key)

ElevenLabs, then the profile menu, then API Keys: create a key. In Terminal, in
the LiveWell folder:

```bash
export ELEVENLABS_API_KEY="paste-the-key-here"
```

```bash
node scripts/build-film-audio.mjs gospel-in-a-minute
```

Listen on the film's page with Listen on. When it sounds right:

```bash
node scripts/build-film-audio.mjs --all
```

```bash
node scripts/build-film-audio.mjs --check
```

Then commit the new files in `client/public/explorer/audio/` with the config
change and open a pull request; CI's check passes only when every file matches.

**Credits.** The films say about 264,000 characters at both reading levels,
each sentence once. On `eleven_multilingual_v2` that is about 264,000 credits;
`eleven_flash_v2_5` costs about half per character, with a little less polish.
Check the plan's monthly credits under Subscription before running `--all`; a
film at a time (`node scripts/build-film-audio.mjs <slug>`) spreads it out.

## Step 4: make the videos to share

With the new voice in place (on the Mac, or in a cloud session once the new
audio is merged), build and serve the site, then render:

```bash
pnpm build && pnpm run prerender
```

```bash
node scripts/serve-like-vercel.mjs --port 4620
```

```bash
node scripts/export-film-video.mjs --all --shapes vertical,square
```

Vertical is for TikTok, Instagram Reels and Stories, and YouTube Shorts;
square is for Facebook and the Instagram feed. Upload them from the phone with
a caption that names the film and the site. The closing card already carries
www.livewellbyjamesbell.co.

## Ebook voiceovers (not built; a decision first)

No ebook has audio today. ElevenLabs' Studio can make an audiobook from a
book's own text in `content/books-src/<id>/` (Believe, Blind Spots, A Higher
Allegiance and The Reliability of Scripture are ready). The question is
whose voice. A stock narrator follows the films' rule. James's own voice would
need a Professional Voice Clone of himself, which ElevenLabs only allows with
his verified consent; it is his voice and his call, and the listing should say
the narration is AI-generated in the author's voice. Either way, each chapter
should be listened to once before it is published.

## The prompt for the Ends Initiative website

Paste into a session that has the endsinitiative.org code, with ElevenLabs
connected or its key on that machine:

```
You are improving endsinitiative.org, the website of the Ends Initiative, a
church-planting ministry led by Pastor James Bell. Use ElevenLabs to make the
site's message heard, not only read, in the languages of the people it serves.
Read the site first and list every page, story, report and video it has.

Then, in this order, propose and (after James approves each) build:

1. A narrated version of each field story and report: a stock ElevenLabs
   narrator (Voice Library or Voice Design; never a clone of a real person's
   voice unless that person has given verified consent), eleven_multilingual_v2,
   one audio file per story, with a play button that never starts on its own,
   the text always on the page, and a line saying the voice is computer-made.
2. The same stories in the languages of the church plants, using ElevenLabs
   Dubbing for any video and multilingual text-to-speech for text. Every
   translation is checked by a native speaker from that field before it is
   published; mark any that are not yet checked and do not publish them.
3. A short narrated video for each church plant or region for social media
   (vertical 1080 by 1920 and square), captions burned in for sound-off
   viewing, ending with the site's address and the way to give or pray.
4. A voice agent (ElevenLabs Agents) on the site that answers questions about
   the Ends Initiative from the site's own pages only: what it does, where,
   how to pray, give or go. It never invents a number, place or person,
   says "I don't know" and points to the contact page when the pages do not
   say, and never collects payment details.
5. Sound design for the site's videos (ElevenLabs Sound Effects or Music):
   quiet, unhurried, never more than the voice.

Rules that hold throughout: protect people in sensitive fields (no names,
faces, exact locations or anything that could identify a worker or a believer
where faith carries risk, in text, audio or video); no fabricated statistics,
quotations or stories; nothing published without James's approval; keep the
API key on the machine and never in the repository; report each step's cost in
ElevenLabs credits before running it.
```
