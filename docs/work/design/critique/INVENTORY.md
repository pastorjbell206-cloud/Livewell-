# Inventory of the current site

Photographed from a clean production build of `origin/main` at a2a2ad6e (Wave 2: The Table (tonight's family devotion), Advent ready, Find, live Scripture references, a faster home page (#538), 2026-10-27), served locally with `serve -s dist/public` and driven by Playwright Chromium on 2026-10-27 (timezone America/Detroit, service workers blocked). Screenshots are in `docs/work/design/shots/current/`: `<slug>-phone.png` (390 x 844, full page), `<slug>-desktop.png` (1440 x 900, full page), `<slug>-phone-first.png` (the first 390 x 844 screen only), and `<slug>-desktop-first.png` (the first 1440 x 900 screen). Device scale 1 throughout. Each page was scrolled top to bottom once before the full-page shot so scroll-triggered content is drawn; the first-screen shot was taken before any scrolling.

## What was stubbed, and how

- The database is not reachable from the capture sandbox, so every request to `/api/trpc/*` was answered by a Playwright route handler in the shape the production function (`api/index.ts`) returns, superjson-wrapped as `{result:{data:{json:...}}}` (an array of these for `?batch=1`). Only four procedures were actually called by the captured pages: `posts.listPublished` (on `/writing`), `posts.getBySlug` (on the essay), `resources.listPublished` (on `/resources`), and `search.global` (on `/search?q=grace`).
- `posts.listPublished` and `posts.listForIndex` returned 691 listing rows: the 677 essays in `content/static-library.generated.json` (678 less `when-fear-rewrites-theology`, which `api/index.ts` keeps off the static copy via `TAKEN_DOWN`), shaped like prod's `staticSlimCard` (no body; reading time from the stored value, else words / 225), plus one row for each of the 14 live shelf essays whose text lives only in the production database, built from `client/src/lib/shelf.json` (slug, title, the shelf blurb as excerpt, no reading time, no dates). Sorted newest first, as prod does. Effect: `/writing` shows the same 15 live essays, titles and blurbs readers see, but only `strongman-theology` carries a reading time; in production all 15 do.
- `posts.getBySlug` returned prod's `staticFullCard` of the static-library row for that slug, or null. Of the 15 live shelf essays only `strongman-theology` ("Why a Frightened Church Wants a King", about 2,300 words) has its body committed, so it is the one `/writing/<slug>` essay photographed with its real text.
- Every other procedure (here `resources.listPublished` and `search.global`) returned `json: null`. On `/resources` that means no admin-added resource links appear (readers may see some); on `/search` the server-side article and resource results are empty, so the results shown are the client-side search over the committed libraries only.
- `/api/track` (telemetry beacons) was answered `200 null`; `/_vercel/*` (Vercel Analytics and Speed Insights) answered `204` empty.
- James's portrait is loaded from a legacy CloudFront host (`d2xsxph8kpxj0f.cloudfront.net`, `PORTRAIT_URL` in `client/src/lib/positioning.ts`) that the sandbox cannot reach. It was replaced by a flat warm-gray 4:5 SVG labelled "PORTRAIT (placeholder)" so the frame keeps its size and place. It shows on `/` (hero byline), `/about`, and the author card under the essay. Readers see the photograph there.
- Any other off-site request would have been aborted; none was made. Fonts are self-hosted and loaded normally.
- The site was served as a plain SPA (`serve -s dist/public`), without the build-time prerender step (`pnpm prerender`). Production serves prerendered HTML for many routes; once the JavaScript runs, the page is the same. Service workers were blocked so every page was a cold first visit with empty browser storage (no saved library, no reading progress).

## Pages at a glance

| Route | Screenshot slug | Phone height (px) | Phone screens | Desktop height (px) | H1s | Main-area links and buttons |
|---|---|---:|---:|---:|---:|---:|
| `/` | `home` | 4898 | 5.8 | 3498 | 1 | 15 |
| `/study` | `study` | 5308 | 6.3 | 3489 | 1 | 19 |
| `/study/bible` | `study-bible` | 12956 | 15.4 | 5835 | 1 | 73 |
| `/study/bible/john/1` | `study-bible-john-1` | 11264 | 13.3 | 6268 | 1 | 237 |
| `/writing` | `writing` | 6588 | 7.8 | 4327 | 1 | 24 |
| `/writing/strongman-theology` | `writing-strongman-theology` | 17452 | 20.7 | 11096 | 1 | 26 |
| `/theology/history/the-apostolic-age` | `theology-history-the-apostolic-age` | 10946 | 13.0 | 6253 | 1 | 3 |
| `/writing/the-rise-of-the-nones` | `writing-the-rise-of-the-nones` | 1976 | 2.3 | 1282 | 1 | 5 |
| `/books` | `books` | 4454 | 5.3 | 3002 | 1 | 5 |
| `/resources` | `resources` | 4882 | 5.8 | 3346 | 1 | 23 |
| `/tools` | `tools` | 10525 | 12.5 | 6482 | 1 | 44 |
| `/tools/test-the-case` | `tools-test-the-case` | 3747 | 4.4 | 2433 | 1 | 12 |
| `/tools/which-lens` | `tools-which-lens` | 2317 | 2.7 | 1634 | 1 | 2 |
| `/tools/deep-bible` | `tools-deep-bible` | 4666 | 5.5 | 2537 | 1 | 21 |
| `/family` | `family` | 11803 | 14.0 | 8082 | 1 | 40 |
| `/family/tonight` | `family-tonight` | 4572 | 5.4 | 3400 | 1 | 12 |
| `/family/devotions` | `family-devotions` | 10591 | 12.5 | 5863 | 1 | 80 |
| `/theology/history` | `theology-history` | 15542 | 18.4 | 8470 | 1 | 56 |
| `/resources/creeds/nicene-creed` | `resources-creeds-nicene-creed` | 7423 | 8.8 | 4611 | 1 | 5 |
| `/resources/context/honor-shame-vs-guilt` | `resources-context-honor-shame-vs-guilt` | 10068 | 11.9 | 5717 | 1 | 16 |
| `/help` | `help` | 12192 | 14.4 | 6612 | 1 | 70 |
| `/help/anxiety` | `help-anxiety` | 32217 | 38.2 | 19673 | 1 | 58 |
| `/about` | `about` | 8961 | 10.6 | 5698 | 1 | 13 |
| `/subscribe` | `subscribe` | 3276 | 3.9 | 2415 | 1 | 3 |
| `/search?q=grace` | `search-q-grace` | 4773 | 5.7 | 3921 | 1 | 25 |
| header menu open (phone, on `/`) | `header-menu-open` | (overlay) | | | | |

"Phone screens" is the phone height divided by 844, the number of full thumb-scrolls to reach the footer.

## Site chrome (shared by every page)

**Header at phone width** (the bar every page opens with; a "Skip to content" link sits before it, visible on keyboard focus): LiveWell BY JAMES BELL (`/`) / Find Help (`/help`) / Search / Open menu.

**Header menu open on phone** (`header-menu-open-phone.png`, `header-menu-open-phone-first.png`). The panel's text, in order:

> Find Help for What You Are Facing \| Study \| Essays \| Books \| Resources \| About \| My Library \| Subscribe

Panel height: 396px. Its controls: Find Help for What You Are Facing -> /help; Show Study links; Essays -> /writing; Books -> /books; Resources -> /resources; About -> /about; My Library -> /my-library; Subscribe -> /subscribe.

**Phone menu with Study expanded** (`header-menu-study-open-phone-first.png`, panel 673px tall): Find Help for What You Are Facing -> /help; Start here: study the Bible -> /study; The Study Bible -> /study/bible; Church history -> /theology/history; Creeds and confessions -> /resources/creeds; The Bible in its context -> /resources/context; Study with a group -> /studyguides; Essays -> /writing; Books -> /books; Resources -> /resources; About -> /about; My Library -> /my-library; Subscribe -> /subscribe.

**Desktop header** (1440 wide): LiveWell / by James Bell wordmark, then Study (a dropdown), Essays, Books, Resources, About, Find Help, a search button, and Subscribe. The Study dropdown open (`header-dropdown-study-open-desktop-first.png`): Start here: study the Bible -> /study; The Study Bible -> /study/bible; Church history -> /theology/history; Creeds and confessions -> /resources/creeds; The Bible in its context -> /resources/context; Study with a group -> /studyguides.

**Footer**: headings "STUDY", "ESSAYS", "BOOKS", "RESOURCES", "ABOUT"; 35 links and buttons: Substack → (`https://substack.com/@jamesbell333289`), Start here: study the Bible (`/study`), The Study Bible (`/study/bible`), Church history (`/theology/history`), Creeds and confessions (`/resources/creeds`), The Bible in its context (`/resources/context`), Study with a group (`/studyguides`), Essays (`/writing`), Honest answers to hard questions (`/answers`), Books (`/books`), When God Bless America Replaces Thy Kingdom Come (`/books/when-god-bless-america`), The Monster in the Mirror (`/books/the-monster-in-the-mirror`), Believe (`/books/believe`), Resources (`/resources`), My Library (`/my-library`), Downloads and PDFs (`/downloads`), The Hard Issues booklets (`/resources/hard-issues-series`), All tools (`/tools`), Self-checks (`/assessments`), How-to guides (`/how-tos`), Find help in a hard season (`/help`), Eight-week plans (`/plans`), For families (`/family`), About (`/about`), Speaking (`/speaking`), Contact (`/contact`), Newsletter (`/subscribe`), Following the Way (podcast) (`http://followingthewaypodcast.com/`), Pastors Connection Network (`https://pastorsconnectionnetwork.com`), ENDS (`https://endsinitiative.org`), Subscribe, Find Help (`/help`), Privacy Policy (`/privacy`), Terms of Service (`/terms`), Accessibility (`/accessibility`).

The per-page sections below list only the page's own area (header and footer left out).

## Pages

### `/`

Screenshots: `home-phone.png`, `home-desktop.png`, `home-phone-first.png`, `home-desktop-first.png`.

- **Title**: LiveWell by James Bell
- **Purpose** (the page's own description): Learning to follow Jesus and live well in post-Christian America. A Study Bible with notes on every chapter, the church's long history, essays, and books by James Bell.
- **Capture note**: Portrait is the labelled placeholder (see stubs).
- **Height**: 4898px at 390 wide (5.8 phone screens); 3498px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| James Bell \| About James \| Learning to follow Jesus — and live well — in post‑Christian America. \| What does it look like to follow Jesus when the culture around you no longer shares your assumptions? The early church knew. So did believers in every age who lived without power. This site is here to help you study the Bible in its context, learn the church's long history, and think through the hardest questions of our time with patience and depth. \| I'm James Bell, a pastor, Susanna's husband, and dad to five sons. I was raised without a father and came to faith as an adult, after years as an atheist, so I know the objections from the inside. I founded the Pastors Connection Network, and I write for anyone who wants a faith deep enough to handle real questions.

**Headings in order** (5 in the page area):

- H1 Learning to follow Jesus — and live well — in post‑Christian America.
  - H2 Where to begin
  - H2 Start with these
  - H2 The books
    - H3 One serious essay a week

**Links and buttons** (15 in the page area; 1 on the first phone screen, marked ↑):

- ↑ About James → `/about`
- Study the Bible An introduction to every book, notes on all 1,189 chapters, and the one st → `/study/bible`
- Read the essays A short shelf on the church after Christendom, the long history of the fai → `/writing`
- The books The books James wrote himself. The opening of each is free to read. → `/books`
- tools, eight-week plans, and printables → `/resources`
- All the essays → `/writing`
- Every Generation Was Sure It Was Right How sincere people mistake their voice for the voic → `/writing/every-generation-was-sure-it-was`
- When the Church Married Empire Why the church’s alliance with empire began long before the → `/writing/when-the-church-married-empire`
- How Christian Nationalism Rewrites Doctrine The most dangerous heresies are not the ones t → `/writing/how-christian-nationalism-rewrites`
- Read the opening of each, free → `/books`
- When God Bless America Replaces Thy Kingdom Come How Patriotism Became Our Practical Savio → `/books/when-god-bless-america`
- The Monster in the Mirror Why Every Generation Gets the Bible Wrong, Why Yours Is No Diffe → `/books/the-monster-in-the-mirror`
- Believe The Rational Case for Christian Faith → `/books/believe`
- [button] Subscribe
- Find help for what you are facing → `/help`

### `/study`

Screenshots: `study-phone.png`, `study-desktop.png`, `study-phone-first.png`, `study-desktop-first.png`.

- **Title**: Study the Bible — LiveWell by James Bell
- **Purpose** (the page's own description): Learn the whole Bible: the Study Bible with notes on all 1,189 chapters, the story in eleven acts, doctrine studies and reading guides, then the church's history, its creeds, and the world the Bible was written in.
- **Height**: 5308px at 390 wide (6.3 phone screens); 3489px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Study \| Learn the whole Bible, and the church that carried it \| Start with the Study Bible, whether you have never opened it or have read it for years. \| The Study Bible \| Every chapter comes with notes on its history, its culture, how it is built, what it teaches, and where it sits in the one story that runs from Genesis to Revelation. Underneath every English word are the Hebrew and Greek it translates. \| Open the Study Bible \| The story of the Bible, in eleven acts \| The whole Bible as one story, from creation to new creation, with the history behind each act and every chapter placed where it happened. \| An introduction to every book \| All sixty-six: who wrote it, when, why, and how it is built.

**Headings in order** (5 in the page area):

- H1 Learn the whole Bible, and the church that carried it
  - H2 The Study Bible
  - H2 Church history
  - H2 Reading the Bible in its context
  - H2 Study with a group

**Links and buttons** (19 in the page area; 3 on the first phone screen, marked ↑):

- ↑ Open the Study Bible → `/study/bible`
- ↑ The story of the Bible, in eleven acts The whole Bible as one story, from creation to new  → `/study/bible/story`
- ↑ An introduction to every book All sixty-six: who wrote it, when, why, and how it is built. → `/study/bible`
- Notes on all 1,189 chapters Each chapter's history, its culture, how it is built, what it  → `/study/bible`
- Verse-by-verse notes Written for Genesis and the four Gospels so far, and for a few chapte → `/study/bible/matthew/1`
- Sixty-two doctrine studies God, creation, sin, covenant, Christ, salvation, the Spirit, th → `/study/bible/doctrines`
- Twenty-four guides to reading the Bible What the Bible is, how the books were chosen, how  → `/study/bible/guides`
- The history of the church→ The councils, the figures, the heresies, and the whole arc from → `/theology/history`
- Creeds and confessions→ The full texts of the creeds and confessions, with plain-language  → `/resources/creeds`
- Why there are so many churches→ A charitable guide to the major traditions, Catholic to Pe → `/theology/traditions`
- The injustice timeline→ An honest reckoning with the injustices of history, those done in  → `/justice/timeline`
- The witnesses→ The people who did justice at real cost, from the abolitionists to the resc → `/justice/witnesses`
- The witnesses who would not be captured→ The people who told the church and the powers cos → `/disruption/witnesses`
- Reading Scripture in context→ The Ancient Near East, Second Temple Judaism, the Greco-Roma → `/resources/context`
- The Study Bible's reading guides→ How to read each kind of writing in the Bible (narrative → `/study/bible/guides`
- A theology glossary→ Every theological term, from atonement to the Trinity, defined plainl → `/theology/glossary`
- Search the theology reference→ One search across the doctrines, passages, glossary terms,  → `/theology/search`
- Study guides for groups→ A leader's guide with timing and the answer behind every question → `/studyguides`
- They are all in the tools → `/tools`

### `/study/bible`

Screenshots: `study-bible-phone.png`, `study-bible-desktop.png`, `study-bible-phone-first.png`, `study-bible-desktop-first.png`.

- **Title**: The Study Bible: Learn the Whole Story, With Hebrew and Greek \| LiveWell by James Bell
- **Purpose** (the page's own description): Learn the whole Bible: its one story in eleven acts, an introduction to every book, study notes on all 1,189 chapters with their history and culture, the doctrines they teach, and the Hebrew and Greek beneath every word.
- **Height**: 12956px at 390 wide (15.4 phone screens); 5835px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| The Study Bible \| Learn the whole Bible \| Whether you have never opened it or have read it for years. Every chapter comes with notes on its history, its culture, how it is built, what it teaches, and where it sits in the one story that runs from Genesis to Revelation. Underneath every English word are the Hebrew and Greek it translates. \| Go to a passage \| Go \| Start here \| The Story of the Bible \| The whole Bible as one story in eleven acts, from creation to new creation, with the history behind each act and every chapter placed where it happened, as closely as the text allows.

**Headings in order** (9 in the page area):

- H1 Learn the whole Bible
  - H2 The Sixty-Six Books
    - H3 The Law
    - H3 History
    - H3 Poetry and Wisdom
    - H3 The Prophets
    - H3 The Gospels and Acts
    - H3 The Letters
    - H3 Revelation

**Links and buttons** (73 in the page area; 2 on the first phone screen, marked ↑):

- ↑ [button] Go
- ↑ START HERE The Story of the Bible The whole Bible as one story in eleven acts, from creati → `/study/bible/story`
- BOOK BY BOOK The Sixty-Six Books An introduction to every book (who wrote it, when, why, a → `#books`
- WHAT IT TEACHES The Doctrines God, creation, sin, covenant, Christ, salvation, the Spirit, → `/study/bible/doctrines`
- NEW TO THE BIBLE? Guides and Tools What the Bible is, how the books were chosen, how the t → `/study/bible/guides`
- Genesis 50 ch. The book of beginnings: God makes a good world, humanity breaks it, and God → `/study/bible/genesis`
- Exodus 40 ch. The book of Israel's rescue from slavery in Egypt, the covenant God makes wi → `/study/bible/exodus`
- Leviticus 27 ch. How a holy God can live among an unholy people: sacrifice, priesthood, pu → `/study/bible/leviticus`
- Numbers 36 ch. The book of the wilderness: a people counted and ordered around God's prese → `/study/bible/numbers`
- Deuteronomy 34 ch. Moses' farewell sermons on the plains of Moab: the covenant restated fo → `/study/bible/deuteronomy`
- Joshua 24 ch. The book of the promised land: Israel crosses the Jordan under Joshua, takes → `/study/bible/joshua`
- Judges 21 ch. The dark years between Joshua and the kings, when Israel kept forgetting God → `/study/bible/judges`
- Ruth 4 ch. A short, carefully told story of famine, loss, and loyal love, in which a Moabi → `/study/bible/ruth`
- 1 Samuel 31 ch. The story of how Israel moved from judges to kings, told through three liv → `/study/bible/1-samuel`
- 2 Samuel 24 ch. The story of David's reign over Israel: how the shepherd became king, how  → `/study/bible/2-samuel`
- 1 Kings 22 ch. The story of Israel's kings from Solomon's glory and temple to a kingdom sp → `/study/bible/1-kings`
- 2 Kings 25 ch. The story of Israel and Judah from Elijah's departure to the fall of Samari → `/study/bible/2-kings`
- 1 Chronicles 29 ch. Israel's story retold from Adam to David for a small, returned people, → `/study/bible/1-chronicles`
- 2 Chronicles 36 ch. The second half of the Chronicler's history: Solomon's temple, the kin → `/study/bible/2-chronicles`
- Ezra 10 ch. The story of the first exiles to come home from Babylon, the rebuilding of God → `/study/bible/ezra`
- Nehemiah 13 ch. A Persian court official's own account of rebuilding Jerusalem's walls, re → `/study/bible/nehemiah`
- Esther 10 ch. A tale of exile, court intrigue, and reversal in which a Jewish queen and he → `/study/bible/esther`
- Job 42 ch. A great poem about an innocent man who loses everything, argues with his friend → `/study/bible/job`
- Psalms 150 ch. Israel's book of prayer and song: 150 poems of praise, lament, thanks, and  → `/study/bible/psalms`
- Proverbs 31 ch. Israel's book of practical wisdom: a father's instruction and hundreds of  → `/study/bible/proverbs`
- Ecclesiastes 12 ch. A wise man's honest search for what lasts in a world where everything  → `/study/bible/ecclesiastes`
- Song of Solomon 8 ch. A sequence of love poems between a woman and a man, celebrating desi → `/study/bible/song-of-solomon`
- Isaiah 66 ch. The great prophet of God's holiness, judgment, and comfort, whose vision run → `/study/bible/isaiah`
- Jeremiah 52 ch. The prophet who watched Jerusalem fall, pleading with a people who would n → `/study/bible/jeremiah`
- Lamentations 5 ch. Five poems of grief over the fall of Jerusalem in 587 or 586 BC, prayer → `/study/bible/lamentations`
- Ezekiel 48 ch. The visions, sign-acts, and oracles of a priest exiled to Babylon, who saw  → `/study/bible/ezekiel`
- Daniel 12 ch. Stories of faithful exiles in a pagan court and visions of beastly empires,  → `/study/bible/daniel`
- Hosea 14 ch. A prophet told to marry an unfaithful wife becomes the living picture of God' → `/study/bible/hosea`
- Joel 3 ch. A prophet reads a devastating locust plague as a summons to return to God, and  → `/study/bible/joel`
- Amos 9 ch. A herdsman from Judah walks into the prosperous northern kingdom of Israel and  → `/study/bible/amos`
- Obadiah 1 ch. The shortest book of the Old Testament: a single oracle against Edom for bet → `/study/bible/obadiah`
- Jonah 4 ch. The story of a prophet who ran from God's call, was swallowed and spared, prea → `/study/bible/jonah`
- Micah 7 ch. An eighth-century country prophet's indictment of Jerusalem's rulers for injus → `/study/bible/micah`
- Nahum 3 ch. A prophetic poem announcing the fall of Nineveh, capital of the Assyrian empir → `/study/bible/nahum`
- Habakkuk 3 ch. A prophet's argument with God about injustice and the rise of Babylon, answ → `/study/bible/habakkuk`
- Zephaniah 3 ch. A prophet of Josiah's day announces the great Day of the LORD against Juda → `/study/bible/zephaniah`
- Haggai 2 ch. Four dated messages from 520 BC that roused the returned exiles to rebuild th → `/study/bible/haggai`
- Zechariah 14 ch. A prophet of the rebuilding: night visions, a call to return, and oracles → `/study/bible/zechariah`
- Malachi 4 ch. The last of the prophets argues with a tired, disillusioned people and promi → `/study/bible/malachi`
- Matthew 28 ch. The story of Jesus the Messiah, son of David and son of Abraham, told for r → `/study/bible/matthew`
- ... and 28 more

### `/study/bible/john/1`

Screenshots: `study-bible-john-1-phone.png`, `study-bible-john-1-desktop.png`, `study-bible-john-1-phone-first.png`, `study-bible-john-1-desktop-first.png`.

- **Title**: John 1 Study Notes – The Word Became Flesh; the First Disciples \| LiveWell by James Bell
- **Purpose** (the page's own description): John opens with a prologue about the Word who was with God and was God in the beginning, through whom all things were made, and who became flesh and dwelt among us, full of grace and truth. John the Baptist then testifies that he is not the Christ but a voice preparing the way, and he points to Jesus as the Lamb of God who takes away the sin of the world. Andrew, Simon Peter, Philip, and Nathanael begin to follow Jesus, who promises that they will see heaven opened.
- **Height**: 11264px at 390 wide (13.3 phone screens); 6268px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| The Study Bible \| John \| 1 \| Reading \| Greek \| Go to a passage \| Go \| Act Nine \| of the story · \| Christ, the Center \| The Word Became Flesh; the First Disciples \| John opens with a prologue about the Word who was with God and was God in the beginning, through whom all things were made, and who became flesh and dwelt among us, full of grace and truth. John the Baptist then testifies that he is not the Christ but a voice preparing the way, and he points to Jesus as the Lamb of God who takes away the sin of the world. Andrew, Simon Peter, Philip, and Nathanael begin to follow Jesus, who promises that they will see heaven opened.

**Headings in order** (38 in the page area):

- H1 John 1
  - H2 The Word Became Flesh; the First Disciples
  - H2 John 1: The Word Became Flesh; the First Disciples
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 
    - H3 Go deeper on LiveWell

**Links and buttons** (237 in the page area; 8 on the first phone screen, marked ↑):

- ↑ THE STUDY BIBLE → `/study/bible`
- ↑ John → `/study/bible/john`
- ↑ [button] Reading
- ↑ [button] Greek
- ↑ Previous chapter → `/study/bible/luke/24`
- ↑ Next chapter → `/study/bible/john/2`
- ↑ [button] Go
- ↑ ACT NINE OF THE STORY · CHRIST, THE CENTER → `/study/bible/story/christ`
- Read the study notes on this chapter → `#notes`
- [button] 1
- [button] 2
- [button] 3
- [button] 4
- [button] 5
- [button] 6
- [button] 7
- [button] 8
- [button] 9
- [button] 10
- [button] 11
- [button] 12
- [button] 13
- [button] 14
- [button] 15
- [button] 16
- [button] 17
- [button] 18
- [button] 19
- [button] 20
- [button] 21
- [button] 22
- [button] 23
- [button] 24
- [button] 25
- [button] 26
- [button] 27
- [button] 28
- [button] 29
- [button] 30
- [button] 31
- [button] 32
- [button] 33
- [button] 34
- [button] 35
- [button] 36
- ... and 192 more

### `/writing`

Screenshots: `writing-phone.png`, `writing-desktop.png`, `writing-phone-first.png`, `writing-desktop-first.png`.

- **Title**: Essays \| LiveWell by James Bell
- **Purpose** (the page's own description): A short shelf of essays by James Bell on the church after Christendom, the long history of the faith, and reading the Bible in its world.
- **Height**: 6588px at 390 wide (7.8 phone screens); 4327px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Essays \| A short shelf, kept short on purpose. Start with the three below, or read by section. \| Start with these \| 1 \| Every Generation Was Sure It Was Right \| How sincere people mistake their voice for the voice of God \| 2 \| When the Church Married Empire \| Why the church’s alliance with empire began long before the modern culture wars. \| 3 \| How Christian Nationalism Rewrites Doctrine

**Headings in order** (7 in the page area):

- H1 Essays
  - H2 The Mirror: How Sincere Believers Go Wrong
  - H2 Faith and Power: Christian Nationalism and Politics
  - H2 After Christendom
  - H2 The Ancient Church
  - H2 Reading the Bible in Its World
    - H3 One essay a week, for the ones who finish.

**Links and buttons** (24 in the page area; 3 on the first phone screen, marked ↑):

- ↑ 1 Every Generation Was Sure It Was Right How sincere people mistake their voice for the vo → `/writing/every-generation-was-sure-it-was`
- ↑ 2 When the Church Married Empire Why the church’s alliance with empire began long before t → `/writing/when-the-church-married-empire`
- ↑ 3 How Christian Nationalism Rewrites Doctrine The most dangerous heresies are not the ones → `/writing/how-christian-nationalism-rewrites`
- The Mirror: How Sincere Believers Go Wrong → `/writing?section=the-mirror`
- Every Generation Was Sure It Was Right How sincere people mistake their voice for the voic → `/writing/every-generation-was-sure-it-was`
- The Monster Is Never the One in the Mirror The mechanism that produces moral catastrophe i → `/writing/the-monster-is-never-the-one-in-the`
- Blind Spots Blind spots are not only personal. Communities develop institutional structure → `/writing/blind-spots`
- The Conservative Blind Spot The Pharisees were serious conservatives whose project of pres → `/writing/the-conservative-blind-spot`
- The Progressive Blind Spot The confidence that you are on the right side of history is not → `/writing/the-progressive-blind-spot`
- When Fear Becomes Theology Fear is the most powerful distorter of Christian thinking → `/writing/when-fear-becomes-theology`
- Faith and Power: Christian Nationalism and Politics → `/writing?section=faith-and-power`
- When Patriotism Becomes a Gospel How churches lose Christ by merging the cross with the na → `/writing/when-patriotism-becomes-a-gospel`
- How Christian Nationalism Rewrites Doctrine The most dangerous heresies are not the ones t → `/writing/how-christian-nationalism-rewrites`
- When Fear Rewrites Theology How sincere Christians justified what they never thought they  → `/writing/when-fear-rewrites-theology`
- Why a Frightened Church Wants a King A frightened church always asks for a king. Israel di → `/writing/strongman-theology`
- After Christendom → `/writing?section=after-christendom`
- When the Church Married Empire Why the church’s alliance with empire began long before the → `/writing/when-the-church-married-empire`
- The Ancient Church → `/writing?section=ancient-church`
- Women in Church History: The Voices They Silenced Perpetua faced the arena. Macrina taught → `/writing/women-in-church-history`
- Reading the Bible in Its World → `/writing?section=bible-in-its-world`
- How the Bible Gets Translated by the Room You’re In No one simply reads the Bible. Every r → `/writing/how-the-bible-gets-translated-by`
- How American Individualism Distorts the Bible Why the New Testament church is more than pe → `/writing/how-american-individualism-distorts`
- The Bible Assumes You Will Be Wrong → `/writing/the-bible-assumes-you-will-be-wrong`
- [button] Subscribe

### `/writing/strongman-theology`

Screenshots: `writing-strongman-theology-phone.png`, `writing-strongman-theology-desktop.png`, `writing-strongman-theology-phone-first.png`, `writing-strongman-theology-desktop-first.png`.

- **Title**: Why a Frightened Church Wants a King \| LiveWell by James Bell
- **Purpose** (the page's own description): An essay: "A frightened church always asks for a king. Israel did it first, and a prophet told them exactly what fear would cost them. We are praying the same prayer." (shelf section Faith and Power).
- **Capture note**: The only live `/writing` essay whose body is committed; rendered from the static library exactly as production renders a database essay.
- **Height**: 17452px at 390 wide (20.7 phone screens); 11096px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| All essays \| Faith and Power: Christian Nationalism and Politics \| Why a Frightened Church Wants a King \| A frightened church always asks for a king. Israel did it first — give us a king like the other nations — and a prophet told them exactly what fear would cost them. We are praying the same prayer. \| James Bell \| 11 \| min read \| April 11, 2026 \| Send to my phone \| Save \| Print \| Listen \| Text size \| A− \| A+ \| Focus \| In this essay \| Read the warning before you make the request \| Fear is the factory where false theology is made \| The elders did not ask for a tyrant. That is the part everyone misses. When Israel went to Samuel and demanded a king, they did not say

**Headings in order** (9 in the page area):

- H1 Why a Frightened Church Wants a King
  - H2 Read the warning before you make the request
  - H2 Fear is the factory where false theology is made
  - H2 Bonhoeffer watched a frightened church do this once
  - H2 What a faith that is not afraid actually looks like
  - H2 The prayer we are praying
  - H2 When God Bless America Replaces Thy Kingdom Come
    - H3 One serious essay a week
    - H3 James Bell

**Links and buttons** (26 in the page area; 9 on the first phone screen, marked ↑):

- ↑ [button] All essays
- ↑ FAITH AND POWER: CHRISTIAN NATIONALISM AND POLITICS → `/writing?section=faith-and-power`
- ↑ [button] Send to my phone
- ↑ [button] Save
- ↑ [button] Print
- ↑ [button] Listen
- ↑ [button] A−
- ↑ [button] A+
- ↑ [button] Focus
- [button] Cite this
- [button] Send to…
- Read the book → → `/books/when-god-bless-america`
- Find help for what you are facing → → `/help`
- When Patriotism Becomes a Gospel How churches lose Christ by merging the cross with the na → `/writing/when-patriotism-becomes-a-gospel`
- How Christian Nationalism Rewrites Doctrine The most dangerous heresies are not the ones t → `/writing/how-christian-nationalism-rewrites`
- When Fear Rewrites Theology How sincere Christians justified what they never thought they  → `/writing/when-fear-rewrites-theology`
- Every Generation Was Sure It Was Right How sincere people mistake their voice for the voic → `/writing/every-generation-was-sure-it-was`
- [button] Subscribe
- Read his books → → `/books`
- More about James → `/about`
- The newsletter → `https://substack.com/@jamesbell333289`
- Facebook → `https://www.facebook.com/james.bell.609252`
- ENDS → `https://endsinitiative.org`
- Following the Way → `http://followingthewaypodcast.com/`
- Everywhere James is → `/about`
- All essays → `/writing`

### `/theology/history/the-apostolic-age`

Screenshots: `theology-history-the-apostolic-age-phone.png`, `theology-history-the-apostolic-age-desktop.png`, `theology-history-the-apostolic-age-phone-first.png`, `theology-history-the-apostolic-age-desktop-first.png`.

- **Title**: The Apostolic and Sub-Apostolic Age — Church History \| LiveWell by James Bell
- **Purpose** (the page's own description): From Pentecost to the generation after the apostles. How a scattered, persecuted movement stayed one body across distance, and what held it together before the New Testament was gathered.
- **Capture note**: Second essay. Fourteen of the fifteen live `/writing` essays have their text only in the production database, so the second long essay photographed is from the church-history series, which ships as committed JSON and renders without the API.
- **Height**: 10946px at 390 wide (13.0 phone screens); 6253px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Church History \| · The Apostolic Age · c. AD 30-150 \| The Apostolic and Sub-Apostolic Age \| From Pentecost to the generation after the apostles. How a scattered, persecuted movement stayed one body across distance, and what held it together before the New Testament was gathered. \| Beginnings \| A Movement Without a Center \| It began small. A few dozen frightened followers of a crucified teacher, gathered in a borrowed room in Jerusalem, waiting for something they could not have described. Within a single lifetime there were assemblies in Antioch, in Corinth, in Rome, in Ephesus, in cities whose names most of them had never spoken. No one planned that growth. No central office directed it. There was no building, no salaried clergy, no recognized place in the religious order of the empire. There was a message, carried on foot and by ship along Roman roads, and there were people willing to die for it.

**Headings in order** (6 in the page area):

- H1 The Apostolic and Sub-Apostolic Age
  - H2 A Movement Without a Center
  - H2 Growth Under Pressure
  - H2 The Men Who Came After
  - H2 One Body Across Distance
  - H2 What Held Them Together

**Links and buttons** (3 in the page area; 1 on the first phone screen, marked ↑):

- ↑ CHURCH HISTORY → `/theology/history`
- ← All of Church History → `/theology/history`
- Church History → `/theology/history`

### `/writing/the-rise-of-the-nones`

Screenshots: `writing-the-rise-of-the-nones-phone.png`, `writing-the-rise-of-the-nones-desktop.png`, `writing-the-rise-of-the-nones-phone-first.png`, `writing-the-rise-of-the-nones-desktop-first.png`.

- **Title**: The Rise of the Nones \| LiveWell by James Bell
- **Purpose** (the page's own description): James is revising this essay. It is off the site until the new version is ready.
- **Capture note**: Not an essay body: the notice an unrevised ("pending") shelf essay's URL answers with. Included because 43 of the 58 shelf essays are pending and answer this way until their rewrites land.
- **Height**: 1976px at 390 wide (2.3 phone screens); 1282px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| The Rise of the Nones \| James is revising this essay. It is off the site until the new version is ready. \| Read instead: \| When the Church Married Empire \| Read the essays \| Go to \| After Christendom \| Open the Study Bible \| Find Help \| LiveWell \| Theology that carries the weight of everyday life. \| Substack → \| Study \| Start here: study the Bible \| The Study Bible \| Church history

**Headings in order** (1 in the page area):

- H1 The Rise of the Nones

**Links and buttons** (5 in the page area; 5 on the first phone screen, marked ↑):

- ↑ When the Church Married Empire → `/writing/when-the-church-married-empire`
- ↑ Read the essays → `/writing`
- ↑ Go to After Christendom → `/writing?section=after-christendom`
- ↑ Open the Study Bible → `/study/bible`
- ↑ Find Help → `/help`

### `/books`

Screenshots: `books-phone.png`, `books-desktop.png`, `books-phone-first.png`, `books-desktop-first.png`.

- **Title**: Books by James Bell — Three Titles, Written by Hand
- **Purpose** (the page's own description): The books James Bell wrote himself: When God Bless America Replaces Thy Kingdom Come, The Monster in the Mirror, and Believe. Read the opening of each free, then get the ebook for $8.99.
- **Height**: 4454px at 390 wide (5.3 phone screens); 3002px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| The Books \| Three books. Every word mine. \| I write about the church and the country, about reading the Bible without flattering ourselves, and about whether any of this holds up under honest questions. The opening of each book is free to read. The rest costs $8.99, which is less than the coffee you would read it over.

**Headings in order** (5 in the page area):

- H1 Three books. Every word mine.
  - H2 When God Bless America Replaces Thy Kingdom Come
  - H2 The Monster in the Mirror
  - H2 Believe
  - H2 Looking for a book that used to be here?

**Links and buttons** (5 in the page area; 0 on the first phone screen, marked ↑):

- Read the opening free → → `/books/when-god-bless-america`
- Read the opening free → → `/books/the-monster-in-the-mirror`
- Read the opening free → → `/books/believe`
- Read the essays → `/writing`
- What's being written → `/roadmap`

### `/resources`

Screenshots: `resources-phone.png`, `resources-desktop.png`, `resources-phone-first.png`, `resources-desktop-first.png`.

- **Title**: Resources — Downloads, Tools, and Help \| LiveWell by James Bell
- **Purpose** (the page's own description): Free downloads and PDFs, the Hard Issues booklets, the tools, help for a hard season with eight-week care plans, and resources for families.
- **Capture note**: `resources.listPublished` answered null, so any resource links James added in the admin are missing here.
- **Height**: 4882px at 390 wide (5.8 phone screens); 3346px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Resources \| Downloads, tools, help for a hard season, and things for the household. Everything here is free. \| My Library \| Search everything \| Downloads and PDFs \| Print them, hand them out, read them offline. \| Every download, on one shelf \| A leader's guide and a handout for every group study, a printable for every context guide, the Find Help worksheets, the eight-week plans as booklets, Bible reading plans, workbooks, and the free booklets. \| The Hard Issues booklets \| Free booklets for the people who lead the church, on eldership and on governing a local church. Each as a PDF and an EPUB.

**Headings in order** (5 in the page area):

- H1 Resources
  - H2 Downloads and PDFs
  - H2 Tools
  - H2 Help in a hard season
  - H2 For families

**Links and buttons** (23 in the page area; 4 on the first phone screen, marked ↑):

- ↑ My Library → `/my-library`
- ↑ Search everything → `/search`
- ↑ Every download, on one shelf→ A leader's guide and a handout for every group study, a prin → `/downloads`
- ↑ The Hard Issues booklets→ Free booklets for the people who lead the church, on eldership a → `/resources/hard-issues-series`
- Rule of Life Builder→ Choose practices across prayer, Scripture, rest, community, and the  → `/tools/rule-of-life`
- Scripture Memory→ Forty key verses, practiced the way memory actually works. → `/tools/scripture-memory`
- Test the Case→ The case for the resurrection, one move at a time, with room to push back w → `/tools/test-the-case`
- Which Lens Has You?→ Thirteen honest choices that show which lens is doing your reading of → `/tools/which-lens`
- The self-checks→ Honest questions about faith, the whole of life, marriage, emotional and  → `/assessments`
- Every tool→ The full set, from the Bible study companion and the glossary to the assessmen → `/tools`
- Anxiety → `/plans/anxiety`
- Grief → `/plans/grief`
- A marriage under strain → `/plans/marriage`
- Taking your questions seriously → `/plans/deconstruction`
- The curious skeptic → `/plans/skeptic`
- The new believer → `/plans/new-believer`
- One undivided life → `/plans/whole-life`
- Find help for what you are facing→ Pick what you are carrying and find, in one place, some → `/help`
- Every eight-week plan→ One practice, one reading, one tool, and one honest question each w → `/plans`
- The family room→ Devotions to do with your kids, the family catechism, reading plans, and  → `/family`
- Family devotions→ Seventy-two weekly devotions, more than a year of them, plus Thanksgivin → `/family/devotions`
- A family catechism→ Seventy-six questions and answers, for adults and for children, one at → `/family/catechism`
- Family Devotion Builder→ A fifteen-minute devotion for tonight, built for your kids' ages. → `/tools/family-devotions`

### `/tools`

Screenshots: `tools-phone.png`, `tools-desktop.png`, `tools-phone-first.png`, `tools-desktop-first.png`.

- **Title**: Free Christian Tools for Families \| LiveWell by James Bell
- **Purpose** (the page's own description): Free tools for families and anyone practicing the faith: Bible verse finder, prayer generator, and family devotion builder, built for the week you are actually living.
- **Height**: 10525px at 390 wide (12.5 phone screens); 6482px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| FREE TOOLS \| Tools for the Life You Are \| Actually \| Living \| Built for marriages, for households, for anyone who takes the faith seriously enough to practice it on a Tuesday. Every one is free and works on your phone, and the journals and planners keep what you write on your own device. \| Find a tool \| My Library \| : what you've saved and started, on this device \| Start with an honest reading \| 5

**Headings in order** (42 in the page area):

- H1 Tools for the Life You Are Actually Living
  - H2 START WITH AN HONEST READING
    - H3 Where Are You With God? A Self-Check
    - H3 The Whole-Life Assessment
    - H3 Emotional Health Self-Check
    - H3 Spiritual Gifts Self-Check
    - H3 Life Audit
  - H2 SCRIPTURE AND THEOLOGY
    - H3 Test the Case
    - H3 Which Lens Has You?
    - H3 Deep Bible Study Companion
    - H3 Theology Quiz
    - H3 What the Bible Says About
    - H3 Reading Scripture in Context
    - H3 Passage Context Tool
    - H3 Bible Verse Finder
    - H3 Bible Study Guide
    - H3 Scripture Memory System
    - H3 Misused Verses — What the Bible Actually Says
    - H3 Theology Glossary
  - H2 WISDOM FOR A REAL SITUATION
    - H3 Wisdom for All of Life
    - H3 Wisdom Finder
    - H3 Proverbs in 31 Days
    - H3 The Worry Journal
    - H3 The Prayer Planner
    - H3 The Connection Planner
    - H3 Prayer Generator
    - H3 Conflict Resolution Guide
    - H3 Quote Library
  - H2 FAMILY, MARRIAGE, AND THE HOUSEHOLD
    - H3 Rule of Life Builder
    - H3 The Parent and Teen Conversation
    - H3 Family Devotion Builder
    - H3 Marriage Health Self-Check
    - H3 Financial Health Check
    - H3 Parenting Stage Guide
    - H3 Parenting Bible Verses
  - H2 THE CHURCH AND THE PUBLIC SQUARE
    - H3 The Consistency Check
    - H3 The Party Scorecard
    - H3 If We Had a Biblical Government

**Links and buttons** (44 in the page area; 3 on the first phone screen, marked ↑):

- ↑ My Library: what you've saved and started, on this device → → `/my-library`
- ↑ Start with an honest reading 5 → `#start-with-an-honest-reading`
- ↑ Scripture and theology 12 → `#scripture-and-theology`
- Wisdom for a real situation 9 → `#wisdom-for-a-real-situation`
- Family, marriage, and the household 7 → `#family-marriage-and-the-household`
- The church and the public square 3 → `#the-church-and-the-public-square`
- Where Are You With God? A Self-Check Eight honest questions across four areas: where you a → `/diagnostic`
- The Whole-Life Assessment Thirty honest statements across the inner life, the body, relati → `/life/assessment`
- Emotional Health Self-Check Fifteen questions across self-awareness, boundaries, grief, fo → `/tools/emotional-health`
- Spiritual Gifts Self-Check Thirty-two statements about what you've actually done, across e → `/tools/spiritual-gifts`
- Life Audit 24 questions across 8 life areas: spiritual, marriage, parenting, physical, fin → `/tools/life-audit`
- Test the Case The case for the resurrection, worked one move at a time. At every step you  → `/tools/test-the-case`
- Which Lens Has You? Thirteen honest choices. Five lenses that do a reader's thinking befor → `/tools/which-lens`
- Deep Bible Study Companion Seminary-level depth in kitchen-table language. 20 books of the → `/tools/deep-bible`
- Theology Quiz Ten questions across doctrine, church history, and the biblical storyline. A → `/tools/theology-quiz`
- What the Bible Says About A topical guide to Scripture for the arenas of ordinary life: mo → `/tools/bible-on`
- Reading Scripture in Context Background guides to the Ancient Near Eastern, Second Temple  → `/resources/context`
- Passage Context Tool Enter any Bible reference and read it in context: the passage with ro → `/theology/passage`
- Bible Verse Finder Search Scripture by what you are carrying: anxiety, grief, courage, mar → `/tools/verse-finder`
- Bible Study Guide Study any book of the Bible with theological depth. Key themes, study qu → `/tools/bible-study`
- Scripture Memory System Memorize 40 key verses across 8 categories. First-letter mode, fil → `/tools/scripture-memory`
- Misused Verses — What the Bible Actually Says The passages we quote most and read least: w → `/tools/bible-says`
- Theology Glossary The working vocabulary of serious faith — justification, atonement, sanc → `/tools/glossary`
- Wisdom for All of Life The front door to Scripture's wisdom for the place no rule reaches: → `/wisdom`
- Wisdom Finder Type in what you are struggling with, and find what the Bible says about it: → `/tools/wisdom-finder`
- Proverbs in 31 Days A chapter of Proverbs a day, matched to the date, the way the church h → `/tools/proverbs-31`
- The Worry Journal Five minutes before bed: name the worry, write the one thing that is you → `/tools/worry-journal`
- The Prayer Planner Write down the people and needs you mean to pray for, give each a day,  → `/tools/prayer-planner`
- The Connection Planner For when you feel alone: name up to five people, choose one small s → `/tools/connection-planner`
- Prayer Generator Words for when you do not have your own. Choose the hour or the need, mor → `/tools/prayer-generator`
- Conflict Resolution Guide A 5-step guided process for 8 common conflict types. Name what h → `/tools/conflict-guide`
- Quote Library Four hundred lines and counting from the essays and books, filed by convicti → `/tools/quotes`
- Rule of Life Builder A rule of life is not a performance contract. It is a trellis. Choose → `/tools/rule-of-life`
- The Parent and Teen Conversation A parent and a teenager each answer twelve short statemen → `/tools/parent-teen-conversation`
- Family Devotion Builder Build a fifteen-minute family devotion for tonight. Pick your kids → `/tools/family-devotions`
- Marriage Health Self-Check Not a quiz. Fifteen questions across communication, intimacy, t → `/tools/marriage-assessment`
- Financial Health Check Twelve questions across generosity, contentment, stewardship, and f → `/tools/financial-health`
- Parenting Stage Guide Age-specific guidance from toddlers to young adults. What your child → `/tools/parenting-guide`
- Parenting Bible Verses Scripture for the real moments of parenting — fear, anger, identity → `/tools/parenting-verses`
- The Consistency Check A searching self-examination of whether you defend truth selectively → `/disruption/consistency`
- The Party Scorecard How close is each party to the Bible, theme by theme? An honest tally  → `/nation/scorecard`
- If We Had a Biblical Government The Year of Jubilee, gleaning, the warning against kings — → `/nation/policy`
- My Library → `/my-library`
- Saved verses and prayers → `/tools/saved`

### `/tools/test-the-case`

Screenshots: `tools-test-the-case-phone.png`, `tools-test-the-case-desktop.png`, `tools-test-the-case-phone-first.png`, `tools-test-the-case-desktop-first.png`.

- **Title**: Test the Case: Push Back at Every Step \| LiveWell by James Bell
- **Purpose** (the page's own description): An interactive, honest walkthrough of the case for the resurrection. Raise the objection you actually hold at each move and get the real answer, including what it does not prove. No altar call.
- **Capture note**: Captured in its opening state, before any step is answered.
- **Height**: 3747px at 390 wide (4.4 phone screens); 2433px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Test the Case \| Did the resurrection happen? \| I am not going to try to close this in a paragraph, and I am not going to pretend the honest objections are weak. We will go one move at a time. At every step you can push back with the objection you actually hold, and I will give you the real answer, including what the move does not prove. You can walk away unconvinced at any point and I will not chase you. \| The cases \| Did the resurrection happen? \| If God is good, why is there so much suffering?

**Headings in order** (1 in the page area):

- H1 Did the resurrection happen?

**Links and buttons** (12 in the page area; 3 on the first phone screen, marked ↑):

- ↑ [button] Did the resurrection happen?
- ↑ [button] If God is good, why is there so much suffering?
- ↑ [button] Can you trust the Gospels?
- [button] Was Jesus just a good teacher?
- [button] Don't all religions lead to the same God?
- [button] Is faith just wishful thinking?
- [button] Is believing anything on faith irrational?
- [button] Could a good God send anyone to hell?
- [button] Can a life mean anything without God?
- [button] Scholars have an agenda, so their agreement proves nothing.
- [button] How do we even know what the disciples believed?
- [button] That's fair, keep going

### `/tools/which-lens`

Screenshots: `tools-which-lens-phone.png`, `tools-which-lens-desktop.png`, `tools-which-lens-phone-first.png`, `tools-which-lens-desktop-first.png`.

- **Title**: Which Lens Has You? — A Diagnostic \| LiveWell by James Bell
- **Purpose** (the page's own description): Thirteen honest choices. Five lenses that do your thinking before you do — the flag, the cause, the highlighter, the rearview, the marketplace. Named, then dismantled.
- **Capture note**: Captured in its opening state, before any choice is made.
- **Height**: 2317px at 390 wide (2.7 phone screens); 1634px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| A diagnostic \| Which lens has you? \| Everyone reads the faith through something. Thirteen choices — none of them comfortable, most of them unfair, all of them honest. Pick the answer that is truer of you, not the one you approve of. Your answers stay in this browser tab and are seen by no one. \| 1 \| of \| 13 \| Which worries you more about the church's future? \| That it will lose its country. \| That it will be on the wrong side of history.

**Headings in order** (2 in the page area):

- H1 Which lens has you?
  - H2 Which worries you more about the church's future?

**Links and buttons** (2 in the page area; 2 on the first phone screen, marked ↑):

- ↑ [button] That it will lose its country.
- ↑ [button] That it will be on the wrong side of history.

### `/tools/deep-bible`

Screenshots: `tools-deep-bible-phone.png`, `tools-deep-bible-desktop.png`, `tools-deep-bible-phone-first.png`, `tools-deep-bible-desktop-first.png`.

- **Title**: Deep Bible Study Companion — Seminary Depth, Kitchen-Table Language \| LiveWell by James Bell
- **Purpose** (the page's own description): Study any passage with 6 layers: text, historical context, literary structure, scholarly views, application, and resources. Serious depth in plain language.
- **Capture note**: Captured in its opening state, before a book or passage is chosen.
- **Height**: 4666px at 390 wide (5.5 phone screens); 2537px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| FLAGSHIP TOOL \| Deep Bible Study Companion \| Seminary-level depth in kitchen-table language. Six layers of analysis for every passage, built so an ordinary reader with an open Bible can follow the argument all the way down. \| Choose a book \| All 20 books below have worked passages. Open one to begin. \| Old Testament \| Genesis \| Where it all begins and where it all goes wrong \| Psalms \| The prayer book of people who stopped pretending

**Headings in order** (2 in the page area):

- H1 Deep Bible Study Companion
  - H2 Choose a book

**Links and buttons** (21 in the page area; 2 on the first phone screen, marked ↑):

- ↑ [button] Genesis Where it all begins and where it all goes wrong
- ↑ [button] Psalms The prayer book of people who stopped pretending
- [button] Exodus The story of liberation that shaped every liberation since
- [button] Proverbs Wisdom for people who have to make decisions today
- [button] Isaiah The prophet who saw further than anyone
- [button] Daniel Faithfulness when the empire demands your worship
- [button] Ruth The story of loyalty that rewrote the rules of belonging
- [button] Job The book that demolishes every easy answer about suffering
- [button] Ecclesiastes The most honest book in the Bible
- [button] Jeremiah The prophet who wept because nobody listened
- [button] Romans The letter that rewired Christianity
- [button] Matthew The Gospel that asks who Jesus actually is
- [button] John The Gospel that starts before time and ends with breakfast
- [button] Galatians The angriest letter in the New Testament
- [button] Ephesians The letter about who you already are
- [button] Revelation Not a prediction. A protest.
- [button] 1 Corinthians The letter to a church that had everything except unity
- [button] Philippians Joy written from a prison cell
- [button] Hebrews The sermon for people thinking about walking away
- [button] James The letter that says faith without works is a corpse
- Open the Study Bible → `/study/bible`

### `/family`

Screenshots: `family-phone.png`, `family-desktop.png`, `family-phone-first.png`, `family-desktop-first.png`.

- **Title**: Family Discipleship — Devotions, Apologetics, and Parenting \| LiveWell by James Bell
- **Purpose** (the page's own description): Everything a family needs to grow in faith together: devotions you can do with your kids, teen apologetics on why we believe, parenting Scripture, and marriage.
- **Height**: 11803px at 390 wide (14.0 phone screens); 8082px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Family \| Disciple your whole family, in one place. \| Devotions you can actually do with your kids. \| Tonight at the table \| Strong Enough To Be Gentle \| Philippians 4:5 · About ten minutes \| Week \| 44 \| of the year \| Start \| Read it first \| This week \| The catechism · Question \| 44 \| What is sanctification? \| Learn it together

**Headings in order** (44 in the page area):

- H1 Disciple your whole family, in one place.
  - H2 Strong Enough To Be Gentle
  - H2 This week
  - H2 The season
  - H2 Family devotions
    - H3 Every family devotion
    - H3 Build a family devotion
  - H2 Why we believe
    - H3 On doubt and hard questions
  - H2 Parenting
    - H3 Parenting Bible verses
    - H3 When parenting is hard
    - H3 Parenting stage guide
    - H3 Raising children in grace
    - H3 The home and the family
  - H2 Marriage
    - H3 When a marriage is in trouble
    - H3 Marriage health assessment
    - H3 Marriage: the long covenant
  - H2 Tools
    - H3 Bible verse finder
    - H3 Family devotion builder
    - H3 Bible study guide
    - H3 Prayer generator
    - H3 Rule of life builder
  - H2 Home and family life
    - H3 READ 42
      - H4 What Are the Household Codes in Ephesians and Colossians?
      - H4 Is 2 Chronicles 7:14 a Promise to America?
      - H4 Blended Family Struggles: How Do You Make It Work?
      - H4 How Do You Build a Christian Home and Family?
      - H4 How Do You Disciple One Person at a Time?
      - H4 How Do You Handle Conflict and Truly Reconcile?
      - H4 How Do You Honor Aging Parents Who Need Care?
      - H4 Is Singleness a Calling or a Waiting Room?
    - H3 WORK A STUDY 20
      - H4 Alone in a Crowded Church: A Study on Church Loneliness
      - H4 Anxiety: A Bible Study on Worry and the Peace of Christ
      - H4 Attention: A Bible Study on Technology and Distraction
      - H4 Biblical Womanhood: A Bible Study on Women of Valor
      - H4 Divorce and Blended Families: A Bible Study for Starting Over
      - H4 Evangelism: A Bible Study on Sharing Your Faith
      - H4 Fatherhood: A Bible Study for Men Without a Blueprint
      - H4 Friendship: A Bible Study on the Love We Forgot

**Links and buttons** (40 in the page area; 3 on the first phone screen, marked ↑):

- ↑ Start → `/family/devotions/gentleness?mode=table`
- ↑ Read it first → `/family/devotions/gentleness`
- ↑ Learn it together → `/family/catechism`
- Thanksgiving week November 20 to 26 → `/family/devotions?tab=thanksgiving`
- Advent December 1 to 25 → `/family/devotions?tab=advent`
- LEARN THE FAITH TOGETHER The Family Catechism Seventy-six questions, one a week, in the Ne → `/family/catechism`
- Every family devotion Seventy-two weekly devotions, more than a year of them, plus daily r → `/family/devotions`
- Build a family devotion Pick your kids' ages and a theme and get a complete 15-minute devo → `/tools/family-devotions`
- READ IT TOGETHER Family Bible reading plans A passage a day and a short prompt. Walk the l → `/family/reading-plans`
- On doubt and hard questions Doubt is not the enemy of faith. Short, honest answers to the  → `/answers`
- Parenting Bible verses Scripture for fear, anger, identity, obedience, screens, and doubt  → `/tools/parenting-verses`
- When parenting is hard For worn-out parents of little ones, of a teen who has gone quiet,  → `/help/parenting`
- Parenting stage guide Age-specific guidance from toddlers to young adults, and one practic → `/tools/parenting-guide`
- Raising children in grace The deep guide: discipline that reaches the heart, faith, screen → `/life/raising-children-in-grace`
- The home and the family The household as a school of grace: the table, family worship, and → `/life/the-home-and-the-family`
- When a marriage is in trouble For the marriage that has gone cold, loud, or broken, and fo → `/help/marriage`
- Marriage health assessment A 15-question diagnostic across communication, trust, conflict, → `/tools/marriage-assessment`
- Marriage: the long covenant The deep guide: the slow drift, conflict, money, desire, and t → `/life/marriage-the-long-covenant`
- Bible verse finder Find Scripture for any season — anxiety, grief, hope, courage — and sha → `/tools/verse-finder`
- Family devotion builder Build a 15-minute devotion by your kids' ages and a theme. → → `/tools/family-devotions`
- Bible study guide Study any book of the Bible with themes, questions, and reading strategi → `/tools/bible-study`
- Prayer generator Guided prayers for morning, evening, strength, guidance, and gratitude. → → `/tools/prayer-generator`
- Rule of life builder Build a sustainable rhythm of prayer, Scripture, rest, community, and → `/tools/rule-of-life`
- What Are the Household Codes in Ephesians and Colossians? Ephesians and Colossians address → `/resources/context/household-codes-in-context`
- Is 2 Chronicles 7:14 a Promise to America? God's answer to Solomon, recorded for a people  → `/resources/context/2-chronicles-7-14-in-context`
- Blended Family Struggles: How Do You Make It Work? Two histories under one roof, two sets  → `/life/the-blended-family`
- How Do You Build a Christian Home and Family? A home is not only where a family sleeps. It → `/life/the-home-and-the-family`
- How Do You Disciple One Person at a Time? The recovery of one-to-one disciple-making throu → `/life/spiritual-friendship-and-the-long-walk`
- How Do You Handle Conflict and Truly Reconcile? Two sinners cannot share a life without wo → `/life/conflict-and-reconciliation`
- How Do You Honor Aging Parents Who Need Care? The fifth commandment does not expire when a → `/life/caring-for-aging-parents`
- Is Singleness a Calling or a Waiting Room? Singleness is not a waiting room. It is a calli → `/life/singleness-and-the-full-life`
- search the whole site → `/search`
- Alone in a Crowded Church: A Study on Church Loneliness This study is for anyone who has s → `/studyguides/alone-in-a-crowded-church`
- Anxiety: A Bible Study on Worry and the Peace of Christ This study is for small groups, ad → `/studyguides/anxiety`
- Attention: A Bible Study on Technology and Distraction This study is for anyone who has fe → `/studyguides/attention`
- Biblical Womanhood: A Bible Study on Women of Valor This study is for women who have wonde → `/studyguides/womanhood`
- Divorce and Blended Families: A Bible Study for Starting Over This study is for people who → `/studyguides/divorce-and-blended-families`
- Evangelism: A Bible Study on Sharing Your Faith This study is for the ordinary Christian w → `/studyguides/witness`
- Fatherhood: A Bible Study for Men Without a Blueprint This study is for the man who is try → `/studyguides/fatherhood`
- Friendship: A Bible Study on the Love We Forgot This study is for anyone who has more cont → `/studyguides/friendship`

### `/family/tonight`

Screenshots: `family-tonight-phone.png`, `family-tonight-desktop.png`, `family-tonight-phone-first.png`, `family-tonight-desktop-first.png`.

- **Title**: Strong Enough To Be Gentle: A Family Devotion \| LiveWell by James Bell
- **Purpose** (the page's own description): Gentleness is strength that chooses to be careful with people, and it takes more strength than shoving does.
- **Capture note**: The route redirects on the client to tonight's devotion: on 2026-10-27 it landed on `/family/devotions/gentleness` ("Strong Enough To Be Gentle"). The screenshots show that page.
- **Height**: 4572px at 390 wide (5.4 phone screens); 3400px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Family \| · \| Tonight \| Strong Enough To Be Gentle \| Philippians 4:5 · About ten minutes \| Start at the table \| 69 of 72 \| · Weekly devotions \| · Week \| 44 \| of the year \| Send to my phone \| Save \| Print \| Read \| Philippians 4:5 \| Let your gentleness be apparent to all. The Lord is near. \| Listen \| Open \| Philippians 4:5 \| in the Study Bible \| Scripture quoted from the Berean Standard Bible. \| Follow any reference to read the passage in full.

**Headings in order** (7 in the page area):

- H1 Strong Enough To Be Gentle
  - H2 Read
  - H2 Talk
  - H2 Ask
  - H2 Do
  - H2 Remember
  - H2 Pray

**Links and buttons** (12 in the page area; 7 on the first phone screen, marked ↑):

- ↑ FAMILY → `/family`
- ↑ Start at the table → `/family/devotions/gentleness?mode=table`
- ↑ [button] Send to my phone
- ↑ [button] Save
- ↑ [button] Print
- ↑ [button] Listen
- ↑ Open Philippians 4:5 in the Study Bible → `/study/bible/philippians/4#v5`
- The Family Catechism → `/family/catechism`
- [button] We did this tonight
- Before this: Everything New Again → `/family/devotions/the-new-creation`
- Next: Good All The Way Through → `/family/devotions/goodness`
- All family devotions → `/family/devotions`

### `/family/devotions`

Screenshots: `family-devotions-phone.png`, `family-devotions-desktop.png`, `family-devotions-phone-first.png`, `family-devotions-desktop-first.png`.

- **Title**: Family Devotions: Weekly, Thanksgiving, Advent, and Holy Week \| LiveWell by James Bell
- **Purpose** (the page's own description): Seventy-two weekly family devotions, more than a year of them, plus daily devotionals for Thanksgiving week, Advent, and Holy Week, each with a passage, a question, and a prayer.
- **Height**: 10591px at 390 wide (12.5 phone screens); 5863px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Family \| · Devotions \| A devotion a week, together. \| Seventy-two weekly devotions, more than a year of them, plus daily readings for Thanksgiving week, Advent, and Holy Week. \| Tonight's devotion \| Weekly \| · \| 72 \| Thanksgiving week \| · \| 7 \| Advent \| · \| 25 \| Holy Week \| · \| 8 \| Print every weekly devotion as a card for the table, two to a page, each passage in full: \| US Letter \| · \| A4 \| 1 of 72 · Who God Says You Are \| Made On Purpose \| Psalm 139:13-14 \| 2 of 72 · Fear And Anxiety \| When The Lights Go Out \| Psalm 56:3-4

**Headings in order** (73 in the page area):

- H1 A devotion a week, together.
    - H3 Made On Purpose
    - H3 When The Lights Go Out
    - H3 The Weight You Put Down
    - H3 Counting What You Already Have
    - H3 The Empty Seat
    - H3 Why, Not Just What
    - H3 More Than A Good Teacher
    - H3 Talking To Someone Who Is There
    - H3 Can We Trust This Book
    - H3 What To Do With The Fire
    - H3 Where Your Eyes Go
    - H3 The Towel And The Basin
    - H3 Walking Before You See
    - H3 An Anchor In The Storm
    - H3 Love That Costs Something
    - H3 The Slow Growing Things
    - H3 The City With No Walls
    - H3 Nothing To Hide
    - H3 Open Hands
    - H3 The Lowest Seat
    - H3 Brave Is Not Fearless
    - H3 Enough Right Here
    - H3 The Friend Who Stays
    - H3 Working For The Right Boss
    - H3 Permission To Stop
    - H3 Taking Care Of The Garden
    - H3 Not A Building
    - H3 The Meal That Remembers
    - H3 Every Sad Thing Undone
    - H3 What Love Was Willing To Do
    - H3 The Stone Was Moved
    - H3 God Who Lives Close
    - H3 What You Are Made Of
    - H3 The Gift You Cannot Earn
    - H3 Turning Around
    - H3 Not Getting What You Deserve
    - H3 Whose Voice Gets Heard
    - H3 The Hardest Love
    - H3 Small But Powerful
    - H3 The Thief Of Glad
    - H3 The Right Kind Of Awe
    - H3 More Than Being Smart
    - H3 When It Really Hurts
    - H3 Strength In The Waiting
    - H3 He Keeps His Word
    - H3 Dressed For The Day
    - H3 What Grows On The Tree
    - H3 Upside Down Happy
    - H3 The One Who Comes Looking
    - H3 The Father Who Runs
    - H3 Everyone You Meet
    - H3 You Are Not Just A Keeper
    - H3 When Someone Hurts You
    - H3 The Cure For A Grumpy Heart
    - H3 Talking With God
    - H3 A Light For The Path
    - H3 Trusting Enough To Obey
    - H3 Small Things With Great Love
    - H3 A Happiness That Holds
    - H3 When Your Heart Is Worried
    - H3 Three And Yet One
    - H3 God Called It Good
    - H3 How It All Went Wrong
    - H3 The God Who Keeps His Word
    - H3 God Came Close
    - H3 A Glimpse Of The Mender
    - H3 He Is Coming Back
    - H3 Everything New Again
    - H3 Strong Enough To Be Gentle
- ... and 3 more headings

**Links and buttons** (80 in the page area; 10 on the first phone screen, marked ↑):

- ↑ FAMILY → `/family`
- ↑ Tonight's devotion → `/family/tonight`
- ↑ [button] Weekly · 72
- ↑ [button] Thanksgiving week · 7
- ↑ [button] Advent · 25
- ↑ [button] Holy Week · 8
- ↑ US Letter → `/downloads/tools/family-cards-letter.pdf`
- ↑ A4 → `/downloads/tools/family-cards-a4.pdf`
- ↑ 1 OF 72 · WHO GOD SAYS YOU ARE Made On Purpose Psalm 139:13-14 → `/family/devotions/identity`
- ↑ 2 OF 72 · FEAR AND ANXIETY When The Lights Go Out Psalm 56:3-4 → `/family/devotions/fear-and-anxiety`
- 3 OF 72 · FORGIVENESS The Weight You Put Down Ephesians 4:32 → `/family/devotions/forgiveness`
- 4 OF 72 · GRATITUDE Counting What You Already Have 1 Thessalonians 5:18 → `/family/devotions/gratitude`
- 5 OF 72 · KINDNESS TO OUTSIDERS The Empty Seat Luke 14:13-14 → `/family/devotions/kindness-to-the-outsider`
- 6 OF 72 · OBEDIENCE AND HEART Why, Not Just What 1 Samuel 16:7 → `/family/devotions/obedience`
- 7 OF 72 · WHO JESUS IS More Than A Good Teacher Colossians 1:15-16 → `/family/devotions/who-is-jesus`
- 8 OF 72 · WHY WE PRAY Talking To Someone Who Is There Matthew 6:6 → `/family/devotions/why-we-pray`
- 9 OF 72 · IS THE BIBLE TRUE Can We Trust This Book 2 Timothy 3:16-17 → `/family/devotions/is-the-bible-true`
- 10 OF 72 · HANDLING ANGER What To Do With The Fire James 1:19-20 → `/family/devotions/handling-anger`
- 11 OF 72 · SCREENS AND ATTENTION Where Your Eyes Go Philippians 4:8 → `/family/devotions/screens-and-attention`
- 12 OF 72 · SERVING OTHERS The Towel And The Basin Mark 10:45 → `/family/devotions/serving-others`
- 13 OF 72 · FAITH Walking Before You See Hebrews 11:1 → `/family/devotions/faith`
- 14 OF 72 · HOPE An Anchor In The Storm Hebrews 6:19 → `/family/devotions/hope`
- 15 OF 72 · LOVE Love That Costs Something 1 John 3:18 → `/family/devotions/love`
- 16 OF 72 · PATIENCE The Slow Growing Things James 5:7 → `/family/devotions/patience`
- 17 OF 72 · SELF CONTROL The City With No Walls Proverbs 25:28 → `/family/devotions/self-control`
- 18 OF 72 · HONESTY Nothing To Hide Proverbs 12:22 → `/family/devotions/honesty`
- 19 OF 72 · GENEROSITY Open Hands 2 Corinthians 9:7 → `/family/devotions/generosity`
- 20 OF 72 · HUMILITY The Lowest Seat Philippians 2:3 → `/family/devotions/humility`
- 21 OF 72 · COURAGE Brave Is Not Fearless Joshua 1:9 → `/family/devotions/courage`
- 22 OF 72 · CONTENTMENT Enough Right Here Philippians 4:11-12 → `/family/devotions/contentment`
- 23 OF 72 · FRIENDSHIP The Friend Who Stays Proverbs 17:17 → `/family/devotions/friendship`
- 24 OF 72 · WORK Working For The Right Boss Colossians 3:23-24 → `/family/devotions/work`
- 25 OF 72 · REST AND SABBATH Permission To Stop Mark 2:27 → `/family/devotions/rest-and-sabbath`
- 26 OF 72 · CARING FOR CREATION Taking Care Of The Garden Genesis 2:15 → `/family/devotions/caring-for-creation`
- 27 OF 72 · THE CHURCH Not A Building 1 Corinthians 12:27 → `/family/devotions/the-church`
- 28 OF 72 · THE LORD'S SUPPER The Meal That Remembers Luke 22:19 → `/family/devotions/the-lords-supper`
- 29 OF 72 · HEAVEN Every Sad Thing Undone Revelation 21:4 → `/family/devotions/heaven`
- 30 OF 72 · THE CROSS What Love Was Willing To Do Romans 5:8 → `/family/devotions/the-cross`
- 31 OF 72 · THE EMPTY TOMB The Stone Was Moved Matthew 28:6 → `/family/devotions/the-empty-tomb`
- 32 OF 72 · THE HOLY SPIRIT God Who Lives Close John 14:16-17 → `/family/devotions/the-holy-spirit`
- 33 OF 72 · WORSHIP What You Are Made Of Psalm 95:6 → `/family/devotions/worship`
- 34 OF 72 · GRACE The Gift You Cannot Earn Ephesians 2:8-9 → `/family/devotions/grace`
- 35 OF 72 · REPENTANCE Turning Around Acts 3:19-20 → `/family/devotions/repentance`
- 36 OF 72 · MERCY Not Getting What You Deserve Micah 6:8 → `/family/devotions/mercy`
- 37 OF 72 · JUSTICE AND THE POOR Whose Voice Gets Heard Proverbs 31:8-9 → `/family/devotions/justice-and-the-poor`
- ... and 35 more

### `/theology/history`

Screenshots: `theology-history-phone.png`, `theology-history-desktop.png`, `theology-history-phone-first.png`, `theology-history-desktop-first.png`.

- **Title**: Church History — The Story You Belong To \| LiveWell by James Bell
- **Purpose** (the page's own description): A walkable narrative of the church across two thousand years: the timeline by era, the councils, the heresies it rejected, and the people who carried the faith.
- **Height**: 15542px at 390 wide (18.4 phone screens); 8470px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Study \| · Church history \| The story you were born into. \| You did not start the faith. You walked into a story already two thousand years long, carried by martyrs and scholars and ordinary believers who handed it down at great cost. Here is the sweep of it: the eras, the councils that fixed the creeds you confess, the errors the church had to reject, and the people worth meeting. \| Read the story \| The era essays \| 22 essays, from Pentecost to the present. \| The Apostolic Age · c. AD 30-150 \| The Apostolic and Sub-Apostolic Age

**Headings in order** (42 in the page area):

- H1 The story you were born into.
  - H2 The era essays
    - H3 The Apostolic and Sub-Apostolic Age
    - H3 The Age of the Martyrs
    - H3 The Desert and the Rule
    - H3 The Constantinian Turn
    - H3 The Fathers at Work
    - H3 The Great Councils
    - H3 The Church That Outlived Rome
    - H3 The East and West Divide
    - H3 The Medieval West
    - H3 The Reformation
    - H3 The Counter-Reformation and the Wars of Religion
    - H3 The Awakenings and the Birth of Evangelicalism
    - H3 The Missionary Century
    - H3 The Modern Church and the Global Shift
    - H3 The Apostolic and Persecuted Church
    - H3 Councils and Creeds
    - H3 The Long Middle
    - H3 The Reformation and Its Wars
    - H3 Awakenings and Enlightenment
    - H3 The American Experiment
    - H3 The Attractional Era
    - H3 After Christendom
  - H2 Church history
    - H3 READ 35
      - H4 How Should Christians Think About Sickness and Health?
      - H4 How Do You Build a Christian Home and Family?
      - H4 How Do You Date Wisely and Choose a Spouse?
      - H4 How Do You Discipline Children With Grace?
      - H4 How Do You Forgive Someone Who Really Hurt You?
      - H4 How Do You Handle Conflict and Truly Reconcile?
      - H4 How Do You Honor Aging Parents Who Need Care?
      - H4 Is Singleness a Calling or a Waiting Room?
    - H3 WORK A STUDY 7
      - H4 Deep Roots: A Bible Study for Faith Beyond Slogans
      - H4 Forty Days: A Bible Study for Lent
      - H4 Hospitality: A Bible Study on the Open Door
      - H4 The Captive Church: A Study on Faith and Political Power
      - H4 The Creeds: A Bible Study on What Christians Believe
      - H4 Waiting for the Light: A Bible Study for Advent
      - H4 Work and Vocation: A Bible Study on Faith and Your Job

**Links and buttons** (56 in the page area; 2 on the first phone screen, marked ↑):

- ↑ STUDY → `/study`
- ↑ THE APOSTOLIC AGE · C. AD 30-150 The Apostolic and Sub-Apostolic Age From Pentecost to the → `/theology/history/the-apostolic-age`
- THE PERSECUTED CHURCH · AD 64-313 The Age of the Martyrs From Nero's fire to Diocletian's  → `/theology/history/the-age-of-martyrs`
- THE AGE OF THE COUNCILS · C. AD 270-547 The Desert and the Rule Antony walked out of a vil → `/theology/history/the-desert-and-the-rule`
- THE AGE OF THE COUNCILS · AD 312-430 The Constantinian Turn A cross in the sky in 312, and → `/theology/history/the-constantinian-turn`
- THE AGE OF THE COUNCILS · AD 325-430 The Fathers at Work The councils wrote the creeds, bu → `/theology/history/the-fathers-at-work`
- THE AGE OF THE COUNCILS · AD 325-451 The Great Councils Nicaea, Constantinople, Ephesus, C → `/theology/history/the-great-councils`
- THE EARLY MEDIEVAL CHURCH · C. AD 410-1000 The Church That Outlived Rome Rome fell and the → `/theology/history/the-church-that-outlived-rome`
- THE EARLY MEDIEVAL CHURCH · TO AD 1054 The East and West Divide The slow drift between Gre → `/theology/history/the-east-west-schism`
- THE HIGH MEDIEVAL CHURCH · AD 1054-1517 The Medieval West From the reforming monks to the  → `/theology/history/the-medieval-west`
- THE REFORMATION · AD 1517-1648 The Reformation Luther and the German movement, the Reforme → `/theology/history/the-reformation`
- THE REFORMATION · AD 1545-1648 The Counter-Reformation and the Wars of Religion Rome's ans → `/theology/history/the-counter-reformation`
- THE MODERN AND GLOBAL CHURCH · C. AD 1730-1791 The Awakenings and the Birth of Evangelical → `/theology/history/the-awakenings`
- THE MODERN AND GLOBAL CHURCH · AD 1792-1910 The Missionary Century From Carey's sailing to → `/theology/history/the-missionary-century`
- THE MODERN AND GLOBAL CHURCH · AD 1900 TO TODAY The Modern Church and the Global Shift The → `/theology/history/the-global-church`
- ANCIENT · AD 30–313 The Apostolic and Persecuted Church Three centuries with no buildings, → `/theology/history/apostolic-and-persecuted`
- ANCIENT · AD 313–590 Councils and Creeds The empire stopped killing the church and started → `/theology/history/councils-and-creeds`
- MEDIEVAL · AD 590–1517 The Long Middle Nine hundred years between the empire's collapse an → `/theology/history/the-long-middle`
- REFORMATION · AD 1517–1648 The Reformation and Its Wars A monk's protest recovered the gos → `/theology/history/reformation-and-its-wars`
- MODERN · AD 1648-1800 Awakenings and Enlightenment From the exhaustion of Westphalia to th → `/theology/history/awakenings-and-enlightenment`
- MODERN · AD 1800-1950 The American Experiment From Cane Ridge to the fundamentalist and mo → `/theology/history/the-american-experiment`
- MODERN · AD 1950-2010 The Attractional Era From a tent in Los Angeles to the megachurch's  → `/theology/history/the-attractional-era`
- MODERN · AD 2010-PRESENT After Christendom The era the reader is standing in. The dechurch → `/theology/history/after-christendom-era`
- [button] The timeline · 7
- [button] The councils · 11
- [button] The heresies · 10
- [button] The people · 36
- [button] AROUND 30 TO 100 The Apostolic Age
- The Apostolic and Sub-Apostolic Age → `/theology/history/the-apostolic-age`
- The Apostolic and Persecuted Church → `/theology/history/apostolic-and-persecuted`
- [button] Ignatius of Antioch · around 35 to 108
- [button] Polycarp of Smyrna · around 69 to 155
- [button] AROUND 100 TO 313 The Persecuted Church
- [button] 313 TO 590 The Age of the Councils
- [button] 590 TO 1054 The Early Medieval Church
- [button] 1054 TO 1500 The High Medieval Church
- [button] 1500 TO 1650 The Reformation
- [button] 1650 TO TODAY The Modern and Global Church
- Everything in Study → `/study`
- See where the creeds came from → → `/theology/doctrine/god-and-trinity`
- How Should Christians Think About Sickness and Health? The body is a gift and the body bre → `/life/health-illness-and-pain`
- How Do You Build a Christian Home and Family? A home is not only where a family sleeps. It → `/life/the-home-and-the-family`
- How Do You Date Wisely and Choose a Spouse? Choosing a spouse is among the largest decisio → `/life/dating-and-discernment`
- How Do You Discipline Children With Grace? You cannot save your children, and you were nev → `/life/raising-children-in-grace`
- How Do You Forgive Someone Who Really Hurt You? Forgiveness is not pretending it did not h → `/life/forgiveness-the-hardest-grace`
- ... and 11 more

### `/resources/creeds/nicene-creed`

Screenshots: `resources-creeds-nicene-creed-phone.png`, `resources-creeds-nicene-creed-desktop.png`, `resources-creeds-nicene-creed-phone-first.png`, `resources-creeds-nicene-creed-desktop-first.png`.

- **Title**: The Nicene Creed — Full Text with Notes \| LiveWell by James Bell
- **Purpose** (the page's own description): The full text of the Nicene Creed of AD 381, with notes on Arius, homoousios, the filioque dispute between East and West, and why one Greek word mattered.
- **Height**: 7423px at 390 wide (8.8 phone screens); 4611px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Creeds, Confessions, and Classics \| · AD 325 / 381 \| The Nicene Creed \| The full text of the Nicene Creed of AD 381, with notes on Arius, homoousios, the filioque dispute between East and West, and why one Greek word mattered. \| In the early fourth century a popular Alexandrian presbyter named Arius taught that the Son of God was the highest of creatures: glorious, pre-existent, but made. There was, he said, when he was not. The teaching spread through songs sung by dockworkers and sailors, and it nearly carried the church. In 325 the emperor Constantine summoned bishops from across the empire to Nicaea, many of them still bearing scars from the persecutions, and they answered Arius with a single Greek word: homoousios. The Son is of one substance with the Father. Not similar. Not exalted. The same God.

**Headings in order** (1 in the page area):

- H1 The Nicene Creed

**Links and buttons** (5 in the page area; 1 on the first phone screen, marked ↑):

- ↑ CREEDS, CONFESSIONS, AND CLASSICS → `/resources/creeds`
- 1 Corinthians 15:3–4 → `/study/bible/1-corinthians/15#v3`
- ← All documents → `/resources/creeds`
- The confessions surveyed → `/theology/creeds`
- Creeds & Confessions → `/resources/creeds`

### `/resources/context/honor-shame-vs-guilt`

Screenshots: `resources-context-honor-shame-vs-guilt-phone.png`, `resources-context-honor-shame-vs-guilt-desktop.png`, `resources-context-honor-shame-vs-guilt-phone-first.png`, `resources-context-honor-shame-vs-guilt-desktop-first.png`.

- **Title**: What Is Honor and Shame Culture in the Bible? — Reading Scripture in Context \| LiveWell by James Bell
- **Purpose** (the page's own description): The Bible was written in a world where the community's verdict was the heaviest thing a person carried. We read it in a world wired for guilt. The mismatch sits under almost every page.
- **Height**: 10068px at 390 wide (11.9 phone screens); 5717px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Reading Scripture in Context \| · Culture \| What Is Honor and Shame Culture in the Bible? \| The Bible was written in a world where the community's verdict was the heaviest thing a person carried. We read it in a world wired for guilt. The mismatch sits under almost every page. \| Send to my phone \| Save \| Print \| The Frame \| Three Ways a Conscience Gets Wired \| Every culture trains its people to feel wrongdoing in a particular register. The modern West runs mostly on guilt and innocence. Right and wrong are matters of law and conscience, settled in an inner courtroom where the verdict stands even if no one else ever finds out. Much of the rest of the world, ancient and modern, runs on honor and shame. Right and wrong are matters of standing before the community, and the question that keeps a person awake is not whether they broke a rule but whether they have disgraced their family in the eyes of everyone who matters. A third register, fear and power, asks whether the unseen forces that govern life are for you or against you.

**Headings in order** (6 in the page area):

- H1 What Is Honor and Shame Culture in the Bible?
  - H2 Three Ways a Conscience Gets Wired
  - H2 Honor Was Public Worth, and It Was Scarce
  - H2 The Controversies Were Honor Contests
  - H2 Shame Willingly Borne, Honor Given Back
  - H2 A Lens, Not a Master Key

**Links and buttons** (16 in the page area; 4 on the first phone screen, marked ↑):

- ↑ READING SCRIPTURE IN CONTEXT → `/resources/context`
- ↑ [button] Send to my phone
- ↑ [button] Save
- ↑ [button] Print
- Luke 14 → `/study/bible/luke/14`
- Hebrews 12:2 → `/study/bible/hebrews/12#v2`
- Hebrews 12:1-2 → `/study/bible/hebrews/12#v1`
- Luke 14:7-11 → `/study/bible/luke/14#v7`
- 1 Peter 2:4-10 → `/study/bible/1-peter/2#v4`
- HONOR, SHAME, AND CULTURE Is 'You' in the New Testament Singular or Plural? Nearly every ' → `/resources/context/collectivist-world-individualist-readers`
- HONOR, SHAME, AND CULTURE What Did Hospitality Mean in the Ancient World? In a world witho → `/resources/context/hospitality-and-the-stranger`
- HONOR, SHAME, AND CULTURE What Does Clean and Unclean Mean in Leviticus? Purity in the Bib → `/resources/context/purity-and-contagion`
- HONOR, SHAME, AND CULTURE What We Bring to the Text Without Knowing It The most powerful a → `/resources/context/misreading-with-western-eyes`
- ← All context guides → `/resources/context`
- Open the PDF → `/downloads/context/honor-shame-vs-guilt.pdf`
- Reading Scripture in Context → `/resources/context`

### `/help`

Screenshots: `help-phone.png`, `help-desktop.png`, `help-phone-first.png`, `help-desktop-first.png`.

- **Title**: Find Help for What You Are Facing \| LiveWell by James Bell
- **Purpose** (the page's own description): Anxious, grieving, doubting, lonely, a marriage in trouble? Say it in your own words. Honest help, Scripture in context, and real people to call.
- **Height**: 12192px at 390 wide (14.4 phone screens); 6612px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| In danger or thinking about ending your life? Call or text \| 988 \| , text \| HOME to 741741 \| , or call \| 911 \| . \| More lines below \| Find help \| What are you facing? \| Say it the way you would say it to a friend. Each page here starts with what you are carrying, reads Scripture in context, and ends with something you can do this week and people who can help. \| Type it in your own words \| What people bring most \| I can't stop worrying \| I'm scared about the future \| I feel so alone \| Someone I love has died

**Headings in order** (36 in the page area):

- H1 What are you facing?
  - H2 If you're in trouble right now
  - H2 Start from where you actually are.
    - H3 I can't stop worrying
    - H3 I'm scared about the future
    - H3 I feel so alone
    - H3 Someone I love has died
    - H3 Why would God let this happen?
    - H3 I'm not sure I believe anymore
    - H3 I feel empty, and I don't know why
    - H3 I don't know how to pray
    - H3 My marriage is falling apart
    - H3 How do I know what God wants me to do?
    - H3 I can't forgive them
    - H3 I'm praying for healing
    - H3 Parenting is harder than anyone said
    - H3 How do I be a dad when I never had one?
    - H3 What's the point of my life?
    - H3 I can't stop looking at porn
    - H3 Money is a weight on me
    - H3 Caring for my parent is wearing me out
    - H3 I'm burned out at work
    - H3 I'm a pastor and I'm running on empty
    - H3 The church hurt me
    - H3 Is it a sin to drink, get a tattoo, or gamble?
    - H3 I can't stop drinking or using
    - H3 Should we get married?
    - H3 Politics is tearing my family apart
    - H3 Can I trust the Bible?
    - H3 Will I see my pet again?
    - H3 My marriage has ended
    - H3 We can't have children
    - H3 I lost my job
    - H3 I can't control my anger
    - H3 I'm deconstructing my faith
    - H3 I've been given a hard diagnosis

**Links and buttons** (70 in the page area; 8 on the first phone screen, marked ↑):

- ↑ 988 → `tel:988`
- ↑ HOME to 741741 → `sms:741741?&body=HOME`
- ↑ 911 → `tel:911`
- ↑ More lines below → `#help-now`
- ↑ I can't stop worrying → `/help/anxiety`
- ↑ I'm scared about the future → `/help/fear-of-the-future`
- ↑ I feel so alone → `/help/loneliness`
- ↑ Someone I love has died → `/help/grief`
- Why would God let this happen? → `/help/suffering`
- I'm not sure I believe anymore → `/help/doubt`
- I feel empty, and I don't know why → `/help/empty`
- I don't know how to pray → `/help/prayer`
- My marriage is falling apart → `/help/marriage`
- Where do I start reading the Bible? → `/help/reading-the-bible`
- How do I know what God wants me to do? → `/help/decisions`
- I can't forgive them → `/help/cant-forgive`
- Call 988 (988 Suicide & Crisis Lifeline) → `tel:988`
- Text 988 (988 Suicide & Crisis Lifeline) → `sms:988`
- Chat online with 988 Suicide & Crisis Lifeline (opens in a new tab) → `https://chat.988lifeline.org/`
- Text HOME to 741741 (Crisis Text Line) → `sms:741741?&body=HOME`
- Call 1-800-799-7233 (National Domestic Violence Hotline) → `tel:18007997233`
- Text START to 88788 (National Domestic Violence Hotline) → `sms:88788?&body=START`
- Chat online with National Domestic Violence Hotline (opens in a new tab) → `https://www.thehotline.org/`
- Call 800-656-4673 (RAINN National Sexual Assault Hotline) → `tel:18006564673`
- Text HOPE to 64673 (RAINN National Sexual Assault Hotline) → `sms:64673?&body=HOPE`
- Chat online with RAINN National Sexual Assault Hotline (opens in a new tab) → `https://rainn.org/help-and-healing/hotline/`
- Call 1-800-662-4357 (SAMHSA National Helpline) → `tel:18006624357`
- Call 911 → `tel:911`
- [button] I'm carrying something
- [button] I want to grow
- [button] I'm helping someone
- [button] I'm leading a group
- CARE PAGE · HELP FIRST I can't stop worrying For the worry that won't switch off: what's h → `/help/anxiety`
- CARE PAGE I'm scared about the future For the dread that won't let go of tomorrow: what Sc → `/help/fear-of-the-future`
- CARE PAGE · HELP FIRST I feel so alone Lonely in a crowd, a marriage, or a church? What Sc → `/help/loneliness`
- CARE PAGE · HELP FIRST Someone I love has died For the fog of the first weeks and the long → `/help/grief`
- CARE PAGE · HELP FIRST Why would God let this happen? For the graveside and the hard argum → `/help/suffering`
- CARE PAGE I'm not sure I believe anymore When the questions won't stop or God has gone qui → `/help/doubt`
- CARE PAGE · HELP FIRST I feel empty, and I don't know why For the hollow, numb, tired-of-e → `/help/empty`
- CARE PAGE I don't know how to pray Where to start, what to say, what to do when your mind  → `/help/prayer`
- CARE PAGE · HELP FIRST My marriage is falling apart For the marriage that's gone cold, lou → `/help/marriage`
- CARE PAGE How do I know what God wants me to do? For anyone stuck at a fork and afraid of  → `/help/decisions`
- CARE PAGE · HELP FIRST I can't forgive them When someone hurt you and you can't let it go: → `/help/cant-forgive`
- CARE PAGE I'm praying for healing Asking God to heal, and living in the waiting, without t → `/help/healing`
- CARE PAGE Parenting is harder than anyone said For worn-out parents of little ones, of a t → `/help/parenting`
- ... and 25 more

### `/help/anxiety`

Screenshots: `help-anxiety-phone.png`, `help-anxiety-desktop.png`, `help-anxiety-phone-first.png`, `help-anxiety-desktop-first.png`.

- **Title**: Can't Stop Worrying? Anxiety, the Bible, and What Helps \| LiveWell by James Bell
- **Purpose** (the page's own description): Anxiety is not a verdict on your faith. What's happening in body and soul, what Scripture says about worry, and what to do this week.
- **Height**: 32217px at 390 wide (38.2 phone screens); 19673px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Exit site \| In danger or thinking about ending your life? Call or text \| 988 \| , text \| HOME to 741741 \| , or call \| 911 \| . \| More help below \| Find help \| I can't stop worrying \| You lie down tired and your mind starts working anyway: the bill, the test results, the child, the thing you said, the thing that might happen next. Your heart runs faster than the room deserves. You've prayed, and the loop is still running, and under the worry sits a second fear, that a stronger Christian would be free of this by now. Anxiety is not a verdict on your faith. It's a weight on body and soul together, more common in church than anyone lets on, and it deserves real care, from God and from people. Tonight, put the worries on paper and leave the list by your bed; you don't have to solve them before morning. If the fear has turned into thoughts of not wanting to be alive, don't wait for morning: call or text 988, or use the lines just below.

**Headings in order** (49 in the page area):

- H1 I can't stop worrying
  - H2 Help, right now
  - H2 What's going on
  - H2 What Scripture says
  - H2 Why this is so hard
  - H2 What to do this week
    - H3 Name it on paper
    - H3 Give your body a fair chance
    - H3 Turn down the alarms
    - H3 Pray a psalm out loud
    - H3 Tell one person
    - H3 Make the appointment
  - H2 When to get more help
    - H3 Signs it is time to call someone
    - H3 What to say when you call
    - H3 What it costs
  - H2 If you're helping someone
    - H3 Things you can say
    - H3 Things not to say
    - H3 What to do next
  - H2 When you don't have the words
  - H2 Go deeper
    - H3 Eight Weeks Toward a Quieter Mind
    - H3 Emotional Health Self-Check: fifteen questions on your inner life
    - H3 The Worry Journal: five minutes before bed to name it, sort it, and hand it over
    - H3 Anxiety: A Bible Study on Worry and the Peace of Christ
    - H3 Mental Health: A Bible Study on the Weight You Carry
    - H3 The Psalms: A Bible Study on Honest Prayer
    - H3 Is Anxiety a Sin? Faith and Mental Health
    - H3 How to Fight Anxiety With Scripture
    - H3 What Does Sleep Teach Us About Trusting God?
    - H3 How to Sleep Like a Creature Who Trusts God
    - H3 What Is a Christian View of Sleep, Food, and Rest?
    - H3 How to Unhook From Your Screens
    - H3 How to Pray When You Are Falling Apart
    - H3 How to Help an Anxious Child
    - H3 Anxiety and Worry
    - H3 Anxiety and the Peace of Christ
  - H2 For the refrigerator, a friend, or a small group
  - H2 Questions people ask
    - H3 Is anxiety a sin?
    - H3 Is it wrong for a Christian to take anxiety medication?
    - H3 Why is my anxiety worse at night?
    - H3 What should I do during a panic attack?
    - H3 How do I stop overthinking?
    - H3 What Bible verses help with anxiety?
    - H3 I'm scared about the future
    - H3 I feel empty, and I don't know why
    - H3 I don't know how to pray

**Links and buttons** (58 in the page area; 5 on the first phone screen, marked ↑):

- [button] Exit site
- ↑ 988 → `tel:988`
- ↑ HOME to 741741 → `sms:741741?&body=HOME`
- ↑ 911 → `tel:911`
- ↑ More help below → `#help-now`
- ↑ FIND HELP → `/help`
- What to do this week → `#this-week`
- When to get more help → `#more-help`
- If you're helping someone → `#helping`
- Go deeper → `#go-deeper`
- Print it → `#print`
- Call 988 (988 Suicide & Crisis Lifeline) → `tel:988`
- Text 988 (988 Suicide & Crisis Lifeline) → `sms:988`
- Chat online with 988 Suicide & Crisis Lifeline (opens in a new tab) → `https://chat.988lifeline.org/`
- Text HOME to 741741 (Crisis Text Line) → `sms:741741?&body=HOME`
- Call 1-800-799-7233 (National Domestic Violence Hotline) → `tel:18007997233`
- Text START to 88788 (National Domestic Violence Hotline) → `sms:88788?&body=START`
- Chat online with National Domestic Violence Hotline (opens in a new tab) → `https://www.thehotline.org/`
- Call 800-656-4673 (RAINN National Sexual Assault Hotline) → `tel:18006564673`
- Text HOPE to 64673 (RAINN National Sexual Assault Hotline) → `sms:64673?&body=HOPE`
- Chat online with RAINN National Sexual Assault Hotline (opens in a new tab) → `https://rainn.org/help-and-healing/hotline/`
- Call 911 → `tel:911`
- [button] Send to my phone
- [button] Save
- [button] Print
- Read the whole chapter → `/study/bible/philippians/4`
- Read the whole chapter → `/study/bible/matthew/6`
- Read the whole chapter → `/study/bible/psalms/55`
- Read the whole chapter → `/study/bible/1-peter/5`
- How to Help an Anxious Child → `/how-tos/parenting-how-to-help-an-anxious-child`
- EIGHT-WEEK PLAN Eight Weeks Toward a Quieter Mind → `/plans/anxiety`
- SELF-CHECK Emotional Health Self-Check: fifteen questions on your inner life → `/tools/emotional-health`
- TOOL The Worry Journal: five minutes before bed to name it, sort it, and hand it over → `/tools/worry-journal`
- STUDY GUIDE Anxiety: A Bible Study on Worry and the Peace of Christ → `/studyguides/anxiety`
- STUDY GUIDE Mental Health: A Bible Study on the Weight You Carry → `/studyguides/mental-health`
- STUDY GUIDE The Psalms: A Bible Study on Honest Prayer → `/studyguides/the-psalms`
- LIFE Is Anxiety a Sin? Faith and Mental Health → `/life/the-anxious-mind`
- HOW-TO How to Fight Anxiety With Scripture → `/how-tos/sf-how-to-fight-anxiety-with-scripture`
- LIFE What Does Sleep Teach Us About Trusting God? → `/life/sleep-and-limits`
- HOW-TO How to Sleep Like a Creature Who Trusts God → `/how-tos/body-how-to-sleep-like-a-creature`
- LIFE What Is a Christian View of Sleep, Food, and Rest? → `/life/the-body-and-the-rhythms`
- HOW-TO How to Unhook From Your Screens → `/how-tos/body-how-to-unhook-from-your-screens`
- HOW-TO How to Pray When You Are Falling Apart → `/how-tos/ss-how-to-pray-when-falling-apart`
- HOW-TO How to Help an Anxious Child → `/how-tos/parenting-how-to-help-an-anxious-child`
- WISDOM Anxiety and Worry → `/wisdom/anxiety`
- ... and 13 more

### `/about`

Screenshots: `about-phone.png`, `about-desktop.png`, `about-phone-first.png`, `about-desktop-first.png`.

- **Title**: About James Bell — Pastor, Author, Writer
- **Purpose** (the page's own description): Pastor, author, and founder. Twelve years at First Baptist Church of Fenton, the Pastors Connection Network, and ENDS, equipping pastors in remote regions. 21 books on theology, church history, justice, and ordinary life.
- **Capture note**: Portrait is the labelled placeholder (see stubs).
- **Height**: 8961px at 390 wide (10.6 phone screens); 5698px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| James Bell \| Lead Pastor, First Baptist Church of Fenton \| Founder, Pastors Connection Network \| Founder, ENDS, equipping pastors in remote regions \| Host, Following the Way \| Author of \| 21 \| books \| What does it look like to follow Jesus when the culture around you no longer shares your assumptions? The early church knew. So did believers in every age who lived without power. This site is here to help you study the Bible in its context, learn the church's long history, and think through the hardest questions of our time with patience and depth. \| Invite James to speak \| Write to James

**Headings in order** (10 in the page area):

- H1 James Bell
  - H2 My story in my own words
  - H2 The heart behind it
  - H2 The church, the network, and the ends of the earth
  - H2 How the writing works
    - H3 It starts at the root
    - H3 The writer is inside it
    - H3 It ends on a verdict, not a recap
  - H2 Reach James
  - H2 Everywhere James is

**Links and buttons** (13 in the page area; 2 on the first phone screen, marked ↑):

- ↑ Invite James to speak → `/speaking`
- ↑ Write to James → `/contact`
- Get the newsletter → `/subscribe`
- Following the Way → `http://followingthewaypodcast.com/`
- The books are here → `/books`
- Speaking→ Conferences, retreats, revivals, and pulpit supply, with a form to ask about a d → `/speaking`
- Contact→ A direct line to James, for anything else. → `/contact`
- The newsletter→ New essays in your inbox, plus thinking that never makes it to the site. → `/subscribe`
- Pastors Connection Network→ The Pastors Connection Network exists because the loneliest jo → `https://pastorsconnectionnetwork.com`
- Facebook→ Short pastoral notes, most days. The largest room James writes into. → `https://www.facebook.com/james.bell.609252`
- ENDS→ The initiative equipping pastors in remote regions around the world. → `https://endsinitiative.org`
- Following the Way→ The podcast. Conversations on theology and the weight of everyday life. → `http://followingthewaypodcast.com/`
- Read the essays → `/writing`

### `/subscribe`

Screenshots: `subscribe-phone.png`, `subscribe-desktop.png`, `subscribe-phone-first.png`, `subscribe-desktop-first.png`.

- **Title**: Subscribe — LiveWell by James Bell
- **Purpose** (the page's own description): One serious essay a week, chosen for where you actually are — skeptic, doubter, pastor, or seeker. Plus self-paced reading paths through the whole library.
- **Height**: 3276px at 390 wide (3.9 phone screens); 2415px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| The Weekly Essay \| One serious essay \| a week. Written slow, \| sent \| once \| . \| Theology that meets the weight of marriage, money, parenting, and doubt. Tell us who you are and the first essay you get will match it. Nothing else comes with it, and you can leave the moment it stops being worth your time. \| Subscribe — and tell us where you're standing \| Skeptic, doubter, pastor, or seeker. One essay a week either way; the first one is chosen for you.

**Headings in order** (3 in the page area):

- H1 One serious essay a week. Written slow, sent once.
    - H3 Subscribe — and tell us where you're standing
  - H2 The essays are open now

**Links and buttons** (3 in the page area; 0 on the first phone screen, marked ↑):

- [button] Subscribe
- Read the essays → `/writing`
- [button] Read the essays

### `/search?q=grace`

Screenshots: `search-q-grace-phone.png`, `search-q-grace-desktop.png`, `search-q-grace-phone-first.png`, `search-q-grace-desktop-first.png`.

- **Title**: Search \| LiveWell by James Bell
- **Purpose** (the page's own description): Search the essays, libraries, tools, and books on LiveWell.
- **Capture note**: `search.global` answered null; the results are the client-side search across the committed libraries (Study Bible, context guides, life pages and the rest), which is what the page lists first in production too.
- **Height**: 4773px at 390 wide (5.7 phone screens); 3921px at 1440 wide.

**First screen at 390 x 844, word for word** (visible text in reading order; ` | ` separates text runs):

> LiveWell \| by James Bell \| Find Help \| Back \| Search LiveWell \| All \| Articles \| Resources \| Across the site \| What the Bible Says \| Grace and Works \| Grace and works have been pitted against each other for so long that many people no longer know how they fit. \| Reading Scripture in Context \| What Did Grace Mean in a World Built on Patronage? \| Before grace was a doctrine, charis was a word for what benefactors gave and what recipients owed. Paul knew the system. He also broke it. \| The Integrated Life \| How Do You Discipline Children With Grace?

**Headings in order** (17 in the page area):

- H1 Search LiveWell
    - H3 Grace and Works
    - H3 What Did Grace Mean in a World Built on Patronage?
    - H3 How Do You Discipline Children With Grace?
    - H3 How to Age With Grace
    - H3 Gratitude: A Bible Study on Thanksgiving and Grace
    - H3 What is grace?
    - H3 The Love of God
    - H3 I just want to grow and follow Jesus well
    - H3 Eight Weeks Out of Hiding
    - H3 Eight Weeks Toward One Undivided Life
    - H3 What Is a Biblical Covenant? The Ancient Treaty Form
    - H3 Blended Family Struggles: How Do You Make It Work?
    - H3 How Do You Honor Aging Parents Who Need Care?
    - H3 How Do You Live as a Christian After Divorce?
    - H3 Why Can't Willpower Alone Break an Addiction?
    - H3 How to Apologize to Your Kids

**Links and buttons** (25 in the page area; 7 on the first phone screen, marked ↑):

- ↑ [button] BACK
- ↑ [button] ALL
- ↑ [button] ARTICLES
- ↑ [button] RESOURCES
- ↑ WHAT THE BIBLE SAYS Grace and Works Grace and works have been pitted against each other fo → `/wisdom/grace-and-works`
- ↑ READING SCRIPTURE IN CONTEXT What Did Grace Mean in a World Built on Patronage? Before gra → `/resources/context/patronage-and-grace`
- ↑ THE INTEGRATED LIFE How Do You Discipline Children With Grace? You cannot save your childr → `/life/raising-children-in-grace`
- HOW-TO LIBRARY How to Age With Grace Our culture handles aging by hiding it or fighting it → `/how-tos/body-how-to-age-with-grace`
- STUDY GUIDES Gratitude: A Bible Study on Thanksgiving and Grace This study is for anyone t → `/studyguides/gratitude`
- FAMILY CATECHISM What is grace? Grace is the free and undeserved favor of God, by which he → `/family/catechism`
- WHAT THE BIBLE SAYS The Love of God The love of God in Scripture is not a sentiment but a  → `/wisdom/gods-love`
- FIND HELP I just want to grow and follow Jesus well How faith actually grows: ordinary pra → `/help/whole-life`
- EIGHT-WEEK PLANS Eight Weeks Out of Hiding An eight week plan from James Bell for the one  → `/plans/pornography`
- EIGHT-WEEK PLANS Eight Weeks Toward One Undivided Life An eight week plan from James Bell  → `/plans/whole-life`
- READING SCRIPTURE IN CONTEXT What Is a Biblical Covenant? The Ancient Treaty Form Sinai fo → `/resources/context/covenant-and-treaty`
- THE INTEGRATED LIFE Blended Family Struggles: How Do You Make It Work? Two histories under → `/life/the-blended-family`
- THE INTEGRATED LIFE How Do You Honor Aging Parents Who Need Care? The fifth commandment do → `/life/caring-for-aging-parents`
- THE INTEGRATED LIFE How Do You Live as a Christian After Divorce? The broken covenant with → `/life/divorce-and-its-aftermath`
- THE INTEGRATED LIFE Why Can't Willpower Alone Break an Addiction? The enslaved will withou → `/life/addiction-and-the-long-road-back`
- HOW-TO LIBRARY How to Apologize to Your Kids A parent who apologizes is not undermining th → `/how-tos/parenting-how-to-apologize-to-your-kids`
- See all in Study Guides → → `/studyguides`
- See all in Church History → → `/theology/history`
- See all in Family Devotions → → `/family/devotions`
- See all in Family Catechism → → `/family/catechism`
- See all in What the Bible Says → → `/wisdom`

## Not captured

- Fourteen of the fifteen live `/writing` essays: their text is only in the production database, which is not reachable here, and the live site itself is not reachable through the sandbox proxy (403). Only `strongman-theology` was photographed as a `/writing` essay.
- Reading times on `/writing` for every essay but `strongman-theology` (the database supplies them).
- James's real portrait (CloudFront, unreachable); a labelled placeholder stands in.
- "Three of the most-used tools" was chosen by the tools hub's own order (Test the Case, Which Lens Has You?, Deep Bible Study Companion are the first three entries in `TOOLS`), not by traffic: no analytics are available here.
- Interactive states past the first load: tools mid-walkthrough and on their results screens, a verse reference sheet opened, the Study Bible's Greek view, the search box being typed into, the Subscribe form after submitting, Table mode on a devotion.
- Dark mode (`html.dark`), tablet widths, and logged-in or admin views.
- Production-only behaviour: prerendered first paint, Vercel redirects in `vercel.json` (`serve -s` does not apply them), Stripe membership state.
