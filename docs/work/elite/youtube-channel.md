# The LiveWell YouTube channel

James, 2026-11-26: "Can you upload these to the Live Well by jamesbell.co
website? And then I want you to build me a YouTube channel."

**What a cloud session cannot do.** It cannot make a YouTube channel or upload
to one: the channel belongs to James's own Google account and needs his
sign-in, and no connected service uploads video from here (a file larger than
about 3 MB cannot leave this session through a connector at all). So the
channel is set up by James in a few clicks, from the kit below, and the videos
go up from his phone or computer.

**What is already on the website.** All 59 films already play on the site
itself, drawn and narrated, at /study/films and on each film's own page. The
MP4 files (about 15 MB each, about 900 MB together) are not committed: the
repository is not the place for them. Instead, once a film is on YouTube, its
page links to it. Each film's JSON takes `youtube` (the video's id), and the
film's page then shows "Watch on YouTube" beside Share (`youTubeHref` in
`client/src/lib/explorer.ts`, tested in
`client/src/pages/explorer/youtube.test.tsx`). To fill them in at once:

```bash
node scripts/set-film-youtube.mjs youtube-links.txt
```

where `youtube-links.txt` has one line per film, its file's name without
`-wide.mp4` and the video's address from YouTube Studio:

```
gospel-in-a-minute https://youtu.be/xxxxxxxxxxx
```

A wrong line stops the run with nothing written. Then commit and open a pull
request as usual.

## Step 1: make the channel (YouTube, signed in as James)

1. youtube.com, the profile picture, then **Create a channel**. Choose to use
   a custom name: **LiveWell by James Bell**.
2. Handle: **@LiveWellByJamesBell** (or the closest YouTube offers).
3. **Customize channel**, then Branding: profile picture
   `livewell-youtube-avatar.png` (800 by 800), banner
   `livewell-youtube-banner.png` (2560 by 1440; the words sit inside YouTube's
   safe area so they show on phones, computers and TVs).
4. Basic info, description (below), and links:
   - LiveWell: https://www.livewellbyjamesbell.co
   - All the films: https://www.livewellbyjamesbell.co/study/films
   - Support this work: https://www.livewellbyjamesbell.co/support
5. **Channel settings, then Upload defaults**: language English; the
   description's last two lines as the default description; category
   Education.

### The channel description

> Short films on the whole story of the Bible, its books, its big ideas, what
> Christians believe, and the honest questions people ask about God. Each is a
> few minutes long, drawn in one engraved hand, with every word on the screen.
>
> The films come from LiveWell by James Bell, a site for reading the Bible
> slowly and the church's long history honestly, by a pastor who came to faith
> from atheism. Every film has its own page there, with the passages to read,
> a question to think about, and the place to go deeper.
>
> The narration is a computer-generated voice.
>
> www.livewellbyjamesbell.co

## Step 2: playlists (the site's own seven groups)

Make one playlist per group, in this order, and add each video to its group's
playlist as it goes up. Names and descriptions are the site's own:

### The big story (3)

The whole Bible from beginning to end.

1. The whole Bible in two minutes (bible-two-minutes-wide.mp4)
2. The Bible in a minute (bible-in-a-minute-wide.mp4)
3. How the 66 books fit together (sixty-six-books-wide.mp4)

### Bible stories (2)

Stories of the Bible, told as the text itself tells them.

1. The Exodus: out of Egypt (the-exodus-wide.mp4)
2. David and Goliath (david-and-goliath-wide.mp4)

### Books of the Bible (12)

One book at a time: what it is, how it is laid out, what to watch for, and where to start.

1. Genesis: the book of beginnings (book-genesis-wide.mp4)
2. Psalms: the prayer book of the Bible (book-psalms-wide.mp4)
3. John: the Word made flesh (book-john-wide.mp4)
4. Romans: the good news, set out (book-romans-wide.mp4)
5. Exodus: out of slavery, to God (book-exodus-wide.mp4)
6. Proverbs: skill for ordinary days (book-proverbs-wide.mp4)
7. Isaiah: the Holy One who comforts (book-isaiah-wide.mp4)
8. Matthew: God with us (book-matthew-wide.mp4)
9. Mark: the story at a run (book-mark-wide.mp4)
10. Luke: good news for the lost (book-luke-wide.mp4)
11. Acts: to the ends of the earth (book-acts-wide.mp4)
12. Revelation: the Lamb on the throne (book-revelation-wide.mp4)

### Big ideas (10)

Themes that run from the first page to the last.

1. The Holy Spirit through the Bible (holy-spirit-wide.mp4)
2. God with his people (god-with-his-people-wide.mp4)
3. The king (the-king-wide.mp4)
4. Promises that build: the covenants (covenant-wide.mp4)
5. Sacrifice and the Lamb (the-lamb-wide.mp4)
6. Sacrifice: why blood? (why-blood-wide.mp4)
7. Exile and coming home (exile-and-home-wide.mp4)
8. A blessing for all nations (all-nations-wide.mp4)
9. The kingdom of God (kingdom-of-god-wide.mp4)
10. Light and darkness (light-and-darkness-wide.mp4)

### What we believe (16)

What Christians everywhere confess, and where the Bible says it.

1. Who God is: Father, Son and Holy Spirit (who-god-is-wide.mp4)
2. Creation and the image of God (image-of-god-wide.mp4)
3. What sin is (what-sin-is-wide.mp4)
4. Who Jesus is (who-jesus-is-wide.mp4)
5. Why did Jesus die? (why-jesus-died-wide.mp4)
6. The resurrection (the-resurrection-wide.mp4)
7. How salvation works (how-salvation-works-wide.mp4)
8. Grace: the gift no one earns (grace-wide.mp4)
9. Faith: trusting the one who promised (faith-wide.mp4)
10. The gospel in a minute (gospel-in-a-minute-wide.mp4)
11. The Holy Spirit in a believer (spirit-in-a-believer-wide.mp4)
12. What the church is (the-church-wide.mp4)
13. Baptism and the Lord's Supper (baptism-and-supper-wide.mp4)
14. The Bible: how we got it (the-bible-wide.mp4)
15. Prayer (prayer-wide.mp4)
16. The life to come (life-to-come-wide.mp4)

### Verses to know (3)

One well-known verse at a time, read in its own chapter.

1. John 3:16 in its chapter (john-3-16-wide.mp4)
2. Psalm 23: the LORD is my shepherd (psalm-23-wide.mp4)
3. Romans 8:28: what it promises, and what it does not (romans-8-28-wide.mp4)

### Good questions (13)

Honest questions children ask, answered from the Bible.

1. Who made God? (who-made-god-wide.mp4)
2. Does God exist? (does-god-exist-wide.mp4)
3. Why can't I see God? (why-cant-i-see-god-wide.mp4)
4. Why do bad things happen? (why-bad-things-happen-wide.mp4)
5. Is the Bible true? (is-the-bible-true-wide.mp4)
6. Did Jesus really come back to life? (did-jesus-come-back-to-life-wide.mp4)
7. What happens when we die? (when-we-die-wide.mp4)
8. Why are there so many churches? (so-many-churches-wide.mp4)
9. What about people who never heard? (never-heard-wide.mp4)
10. Why did God let his temple be destroyed? (temple-destroyed-wide.mp4)
11. Does God still love me when I do wrong? (love-when-i-do-wrong-wide.mp4)
12. Why does God seem silent sometimes? (god-silent-wide.mp4)
13. Are science and the Bible enemies? (science-and-the-bible-wide.mp4)

## Step 3: the channel trailer and the first uploads

- **Trailer** (Customize channel, Layout, "Video spotlight" for people who
  have not subscribed): **The whole Bible in two minutes**.
- **Featured video** for returning subscribers: **The gospel in a minute**.
- **Upload order.** Start with the films that stand alone for someone who
  knows nothing yet: The whole Bible in two minutes, The Bible in a minute, The
  gospel in a minute, Does God exist?, Is the Bible true?, Did Jesus really come
  back to life?, Why do bad things happen?. Then the books of the Bible, one a
  week. A steady pace (two or three a week) does more on YouTube than all 59
  in one day, and gives each its own week of notice.
- For each upload: the title, description and tags from the spreadsheet
  "YouTube titles, descriptions and tags" in the Drive folder "LiveWell
  YouTube videos"; the matching thumbnail from the thumbnails zip
  (`<film>-thumb.jpg`, 1280 by 720).
- **Two settings on every upload, both James's call**:
  - **Audience.** YouTube asks whether a video is "made for kids". The films
    were written for ages 7 to 16 and their families. "Made for kids"
    turns off comments and some features. Ask a YouTube expert if unsure; this
    is not legal advice.
  - **Altered or synthetic content.** The voice is computer-generated; the
    descriptions already say so. Answer the question as YouTube asks it at
    upload.

## Step 4: put the channel on the site

Once the channel exists, send its address. It joins the outside channels in
`client/src/lib/channels.ts` (with Facebook and Substack, on /connect), and
the films' YouTube links go in with `scripts/set-film-youtube.mjs`.

## The better voice, later

These videos use the films' current voice. With the ElevenLabs voice made on
James's Mac (`docs/work/elite/elevenlabs.md`), re-render them with
`node scripts/export-film-video.mjs --all --shapes wide` and replace each
video on YouTube (YouTube keeps no "replace file" button; upload the new one
and keep the old one unlisted, or delete it if it has few views).
