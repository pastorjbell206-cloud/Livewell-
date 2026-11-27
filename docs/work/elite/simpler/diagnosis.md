# A simpler LiveWell: the diagnosis

James, 2026-11-27: "I want the site to feel the way BibleProject's site feels: clean, calm, professional, and obvious to use. One clear thing to do on each page, generous space, plain words, and the next step always in sight." This is what stands in the way today, page by page, and the ten changes that would help most.

## How this was looked at

- **LiveWell.** The live site (www.livewellbyjamesbell.co), opened in Chromium through Playwright on 2026-11-27 at phone width (390 by 844) and desktop width (1440 by 900): the home page, the seven doors (/study, /theology/history, /topics, /family, /tools, /writing, /about), /start, a Bible book (/study/bible/john), a chapter (/study/bible/john/3), an answer (/answers/is-faith-irrational), a tool (/tools/wisdom-finder) and /search. For each page a script measured its length in screens, how many links and buttons it holds, and what sits in the first screen. Those numbers are below.
- **BibleProject.** bibleproject.com could not be opened from this session: the network refused the host (a 403 from the session's proxy, and a tunnel failure in the browser). So nothing here is drawn from looking at its pages this week. Where this note leans on BibleProject, it leans on its public design habits as they are widely known, labelled as such: a first screen with one headline and one or two buttons; video offered first, as large poster cards; plain verb labels ("Watch", "Read", "Learn"); rows of large, quiet cards with one picture, a title and a short line; generous space; a header that stays small and out of the way. No layout, wording or picture of theirs was copied.
- **Two things that look broken in the screenshots and are not.** The film posters and the portrait on /about are served from Vercel's file storage, which this session's network also refuses. They show as empty frames here and draw on the real site.

## The numbers

Length is the page's full height divided by one screen. "Actions" counts the links and buttons inside the page's main area (not the header or footer).

| Page | Phone screens | Desktop screens | Actions | Actions in the first phone screen |
|---|---|---|---|---|
| Home | 11.1 | 9.2 | 36 | 8 |
| /study | 7.9 | 6.7 | 112 | 2 |
| /theology/history | 8.1 | 6.0 | 57 | 10 |
| /topics | 11.2 | 6.6 | 82 | 4 |
| /family | 8.1 | 6.4 | 52 | 3 |
| /tools | 10.8 | 7.5 | 51 | 3 |
| /writing | 13.6 | 11.5 | 93 | 4 |
| /about | 10.1 | 6.3 | 20 | 4 |
| /start | 2.7 | 2.4 | 8 | 7 |
| /study/bible/john | 49.0 | 27.7 | 120 | 13 |
| /study/bible/john/3 | 15.2 | 10.4 | 437 | 25 |
| /answers/is-faith-irrational | 15.7 | 10.1 | 16 | 1 |
| /tools/wisdom-finder | 5.5 | 4.0 | 233 | 3 |
| /search | 2.3 | 2.2 | 4 | 4 |

## Page by page

### Home (/)

- **What a first-time visitor wants.** To know in a few seconds what this place is, and where someone like them should begin.
- **What gets in the way.** The first phone screen asks for five different decisions at once: a search box, tonight's devotion, the Advent calendar, and seven "Start where you are" chips. Below it come "Ten ways in", numbered 01 to 10, which are not the seven doors the header names (a visitor meets "Context and creeds" and "Books" here and "History" and "About" up there). Then six more sections, each a different kind of thing to touch (the 66 books, a question picker, tonight's devotion a second time, a history strip, the essays, five ways to reach James). It is eleven phone screens, and every one of them is good; together they are a lot.
- **The one thing.** Say what LiveWell is, and give one obvious way to begin: Start here, for anyone who does not know where to go, with the search box for anyone who does.

### The Bible door (/study)

- **What a visitor wants.** To read the Bible, with help.
- **What gets in the way.** The first screen is right: one title, one line, one button. After it, the film, the shelf of 66 books, seven room cards, then a long "One step further in" list of every page inside the rooms (twenty-odd tiles), then six more tiles, then a line for someone new. On a phone the seven room cards are small, two across, and look alike, so "Bible films", "The Bible's story" and "Reading plans" carry equal weight with "Read the Study Bible". 112 links on one door page.
- **The one thing.** Open the Study Bible. Then, a few clear choices: watch, learn how to study, follow a plan.

### A Bible book (/study/bible/john)

- **What a visitor wants.** To start reading John, or to understand it before they do.
- **What gets in the way.** Forty-nine phone screens. Every part of the guide to John (eleven long essays: who wrote it, the Greek, "the Jews" in John, the manuscripts, how the church has read it) is printed out in full, one after another, followed by the hard passages, key words, a timeline, a map and "Go deeper". The way to begin reading is a small text link ("Go to the chapters") in the first screen and a button further down inside the outline band. The film, if a book has one, sits under the chapters where few will see it.
- **The one thing.** Start reading at chapter 1, or pick a chapter. The guide stays, a tap away, as a list of short titles.

### A chapter (/study/bible/john/3)

- **What a visitor wants.** To read the chapter.
- **What gets in the way.** Before the first verse a phone shows the version links, Read and Study, "Study this chapter", a tip, English and Greek, a find box, the act of the story, the chapter's summary, "Whole summary", "2 hard questions" and three jump links. Twenty-five things to tap before the text. Each is useful to someone; the first-time reader has to step over all of them.
- **The one thing.** Read the text. (Not redesigned in this preview: see change 10.)

### History (/theology/history)

- **What a visitor wants.** To understand the church's story from the beginning.
- **What gets in the way.** "Start at lesson 1" is clear. Then a timeline with seven age buttons, Earlier and Later, a lesson, people, four events with their own openers, "All 9 events", "About this age" and "Step through year by year", all in the second screen. Ten choices in the first screen on a phone.
- **The one thing.** Start the course at lesson 1.

### Questions (/topics)

- **What a visitor wants.** An honest answer to the question they are carrying.
- **What gets in the way.** The page's button is "All 35 Honest Answers", but the page's real job, asking in your own words, is in the next band. Then nine groups of questions, four questions each with "All 10", which run seven phone screens; then six room cards; then every page inside the rooms. "Honest Answers", "The case for the faith", "For skeptics" and "Where Christians differ" are our names for our libraries; a newcomer cannot tell which holds their question.
- **The one thing.** Ask. Then browse by topic.

### Family (/family)

- **What a visitor wants.** Something to do with their children tonight.
- **What gets in the way.** Tonight's card is excellent and comes first. After it: the week at a glance, Advent, the rooms, a line about Bible Explorer, four "how to" groups with eleven links, seven teen tiles, and four closed rows. Three sections of advice for parents stacked one after another, each a different shape.
- **The one thing.** Start tonight's devotion.

### Tools (/tools)

- **What a visitor wants.** The right tool for what they are dealing with.
- **What gets in the way.** The find box is right. Then all twenty-eight tools, each with a long name ("Build a Weekly Rhythm of Prayer and Rest (a Rule of Life)"), a sentence, how long it takes and what it keeps: eleven phone screens of tiles that all look the same. Nothing says which one to try first.
- **The one thing.** Find a tool by what you want to do, or try one of a few good first tools.

### Essays (/writing)

- **What a visitor wants.** Something worth reading.
- **What gets in the way.** "Start with this one" is right. Then eight subject sections, every essay listed with date and length: 13.6 phone screens and 93 links. (Not in this preview.)
- **The one thing.** Read the one essay to start with.

### About (/about)

- **What a visitor wants.** To know who James is, and whether to trust him.
- **What gets in the way.** The first screen is a column of titles, then the long italic paragraph, then three text links, then seven buttons for "Where else to find James", before "My story in my own words". (Not in this preview; his words are his.)
- **The one thing.** Read James's story.

### /start

- **What a visitor wants.** Someone to say "begin here".
- **What gets in the way.** Very little. Seven clear cards, each with a picture, a name and one line. What is missing is the next step for someone who cannot pick: the three-question quiz is offered only once a road is open.
- **The one thing.** Pick the card that sounds like you.

### An answer (/answers/is-faith-irrational)

- **What a visitor wants.** The answer.
- **What gets in the way.** Nothing at the top: the short answer is the first thing on the page, then a numbered contents list. It runs fifteen phone screens, which is right for what it is. The page is a model for the rest.
- **The one thing.** Read the short answer.

### A tool (/tools/wisdom-finder)

- **What a visitor wants.** To type what they are facing and get passages.
- **What gets in the way.** The first phone screen is the tool's long name, a paragraph, how long it takes and what it keeps; the box to type in sits under all of it. 233 links on the page (the subject list).
- **The one thing.** Type what you are facing.

### Search (/search)

- **What a visitor wants.** To find a thing by name.
- **What gets in the way.** Nothing. One box, four filters.
- **The one thing.** Search.

## What the pages share

1. **Too many choices at once.** The door pages show every room, then every page inside every room, on the door page itself. The audit of 2026-11-20 made each door complete; complete and calm are two different jobs.
2. **Our names, not the reader's.** "Honest Answers", "The case for the faith", "Ten ways in", "Plate I", "Further in". They are good names once you know the site.
3. **Everything at full length.** A Bible book page prints a small book.
4. **Cards that look alike and weigh alike.** Seven or ten cards of one size say "these are equal", when one of them is what most people came for.
5. **The end of a page has no next step.** Most pages end on a list or a line about Find Help, and then the footer.

## The ten changes that would help most, ranked

1. **Fold a Bible book's guide.** Show each part of a book's guide as a short title that opens in place, the first one open; put "Start at chapter 1" and the chapters first. John goes from 49 phone screens to a handful, and every word stays on the page.
2. **One way to begin on the home page.** Replace the seven chips in the first screen with one button, Start here, beside the search box; let /start do the choosing it was built for.
3. **Four big cards, then "See everything".** On Home and on each door's page, show the three or four things most people want as large, quiet cards (picture, title, one line), and fold the full list of rooms and pages behind one "See everything in ..." row. Nothing leaves the site.
4. **A next step at the end of every page.** One band before the footer: what to do now, one button, sometimes a quiet second.
5. **Video near the top.** Where a page has a film (the Bible door, a book with an Explorer film), put it in the second screen, not the sixth.
6. **The ask box is the Questions door.** Drop the page-top button that competes with it; show two questions per topic with "All" behind them, so the nine topics fit in about three phone screens.
7. **A few good first tools.** Lead /tools with four tools, one from each group, as cards; fold the four groups into rows that open, and let the find box open every match.
8. **One "more help" row-list on the Family door.** Fold the how-to groups, the teen years and the rest of the home into one list of closed rows under tonight's devotion and the rooms.
9. **Shorten the home page.** Keep the 66 books, the film, the essays and James; let the question picker, the second tonight band and the history strip live on their doors, where they already are.
10. **Quiet the chapter's top.** Before verse 1, show the title, the reading text and one Study button; put the versions, the language switch, the find box and the jump links in one "Study tools" row. (Left for James: it is the most visited page, and it is not in this preview.)
