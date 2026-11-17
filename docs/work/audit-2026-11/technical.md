# Technical audit: what a visitor and a search engine feel

Audit date 2026-11-17. Lens key: `technical`.

**What was measured.** The live site is the code of `origin/main` (commit `fea345a4`), built and checked out at `/home/user/livewell-audit`. The pending work is PR #540 (`/home/user/Livewell-`), PR #541 (`/home/user/livewell-essays`) and the local branch `land-next` (`/home/user/livewell-land`).

**One correction to the method, which matters for every number below.** The servers handed to the auditors (`localhost:4311` and `:4312`) run `serve -s`, which answers every address with the home page's HTML. Vercel does not do that: it serves each page's own prerendered file (for example `study/bible/john/3/index.html`). So I ran a small server of my own that copies Vercel's rules (redirects from `vercel.json`, then the page's own file, then the app shell) on ports 4321 (live) and 4322 (PR #540). All Lighthouse, axe, crawl and head checks below ran against those. The project's own CI quality job has the same blind spot (finding T13).

**There is no database or API in this sandbox.** Anything that depends on it is marked "API" and listed in section 7 so it is not mistaken for a live fault. PDFs are also built only at deploy time (`pnpm pdfs`), so the 599 PDF links that returned "not found" locally are a local artifact, not a live problem.

Screenshots: `/home/user/Livewell-/docs/work/audit-2026-11/shots/technical/`.

---

## 1. The short version

Score for this lens against a world-class bar: **6 out of 10 live, 6 out of 10 after the pending work lands.** The pending work is mostly content and navigation; it fixes very little in this lens and adds one small new problem.

The foundation is better than most ministry sites I know of: the home page scores 100 for speed, nothing scrolls sideways on a phone on any of 25 pages tested, there is not one dead internal page link in 3,430 checked, and every one of 2,948 prerendered pages has its own title, description and canonical address.

Three things keep it from world-class, and all three sit on the pages James cares about most:

1. **The Study Bible chapters and the essays, the two most important kinds of page, load badly on a phone.** The page appears in plain unstyled type, is wiped and replaced by "One moment. Loading the page...", and then the real page arrives and the footer jumps. Lighthouse scores them 43 and 45 out of 100 for performance. The home page scores 100. (T1)
2. **The search box cannot find the site's own main things.** Type "church history" and the church history section is not in the results. Type "family devotions" and neither the family page nor tonight's devotion appears. Type "study bible" and the Study Bible is not there. (T2)
3. **Much of the best material is invisible to anything that does not run JavaScript**, which includes the AI answer engines the site's own `robots.txt` goes out of its way to welcome. The Honest Answers page, the church history front page, every family devotion page and 208 "What the Bible Says" pages ship with an empty body. (T5)

---

## 2. What is already strong

These are real and should be protected.

- **Home page speed is excellent.** Lighthouse mobile, three runs: performance 100, 99, 100; accessibility 100; SEO 100; first paint 0.9 s; no layout shift. RESULTS.md recorded 87.
- **No sideways scrolling anywhere.** 25 routes at 390 pixels wide, zero pixels of horizontal overflow on every one. No form field under 16 px on the live site (so iPhones do not zoom when a reader taps a field).
- **No dead page links.** The crawl started at Home, followed the header, the footer and every hub two levels deep (1,164 pages opened, 3,430 distinct internal links checked). Not one landed on the not-found page.
- **The sitemap is clean.** 2,268 addresses; every one answers directly (no redirect), every one has its own prerendered file, every canonical matches its address, none is marked noindex.
- **Every page unfurls as itself.** 2,948 prerendered pages. In a sample of 42 routes every title and description was unique and every page had a canonical, Open Graph tags and a Twitter card. RESULTS.md counted 609 prerendered heads; it is now nearly five times that.
- **Study Bible chapters and library pages carry their full text in the HTML.** 1,352 of 1,355 Study Bible pages, all 132 how-to guides, all 68 study guides, all 41 context guides, all 40 Find Help pages, all 22 church history era pages, all 14 creeds and all 29 plans have a real body and JSON-LD for a crawler to read.
- **Retired essays are handled correctly.** 673 old essay addresses still answer, each with `noindex`, and none is in the sitemap.
- **Accessibility is mostly clean.** axe (WCAG 2.0, 2.1 and 2.2 A and AA plus best practices) found zero violations on Home, /study, the John 3 chapter, /writing, /tools, /family/tonight, /help, /answers, /books, /about and /resources/creeds at both phone and desktop width.
- **Fonts are self-hosted and preloaded, the service worker cleans up after itself, security headers are set** (CSP, HSTS, no-sniff, frame rules in `vercel.json`).
- **Scripture references work in search.** "john 3:16" puts "John 3:16, Read it in the Study Bible" first and links to the verse. "romans 8" and "genesis" also lead with the Study Bible.
- **The shipped JavaScript for a reader is modest.** The entry file is 78 KB compressed (it was 96.5 KB in RESULTS.md) and falls to 74 KB in PR #540. The one 3.2 MB file in the build (`content-data`) is loaded only by the admin dashboard.

---

## 3. Findings, in order of how much they matter to a visitor

Sizes: S under an hour, M under a day, L more. Status is one of LIVE-PROBLEM, FIXED-IN-PENDING, STILL-OPEN-AFTER-PENDING.

### T1. Study Bible chapters and essays flash three times and jump while loading (high, M, STILL-OPEN-AFTER-PENDING)

**Where.** Every Study Bible book and chapter (`/study/bible/john/3`, 1,355 pages), every essay with a rewrite file (`/writing/what-post-christian-means`), study guides (`/studyguides/lament`), creeds (`/resources/creeds/nicene-creed`), `/theology/history`, and in PR #540 the new `/topics`. Files: `scripts/prerender-heads.mjs` (the injected body), `client/src/App.tsx` (`PageFallback`, line 235), `client/src/pages/StudyBible.tsx`, `client/src/pages/ArticleDetail.tsx` (line 523).

**What a visitor sees.** On a mid-range phone on 4G (Chrome throttled to 4x CPU and 1.6 Mbps), opening John 3:
1. At 0.4 s the chapter appears in plain Times-style type with no header and no margins: "John 3: Nicodemus, New Birth, and God's Love for the World".
2. At 0.9 s that is erased. The screen shows only the words **"One moment. Loading the page..."** for about two seconds.
3. At about 2.8 s the real page appears and the footer, which had slid into view, is thrown down the page.

Screenshots: `live-cls_study_bible_john_3-400ms.png`, `-900ms.png`, `-2200ms.png`, `-3200ms.png`.

**The numbers.** Layout shift (CLS; Google's "good" line is 0.1):

| Page | Lighthouse performance (3 runs, median) | CLS | What moved |
|---|---|---|---|
| `/study/bible/john/3` | 43 (43, 42, 51) | 0.61 | footer |
| `/writing/what-post-christian-means` | 45 (45, 44, 49) | 0.69 | footer |
| `/study/bible/john` (book page) | not run | 1.15 | footer, chapter list |
| `/studyguides/lament` | not run | 0.62 | footer |
| `/resources/creeds/nicene-creed` | not run | 0.64 | footer |
| `/theology/history` | 80 (63, 80, 88) | 0.00 to 0.31 | a whole section |
| `/help/anxiety` | not run | 0.14 | footer |
| `/topics` (PR #540) | 79 | 0.21 to 0.23 | footer |
| Home | 100 | 0.00 | nothing |

**Why it fails the goal.** James wants "the best Bible study tool in the world" and essays that read like a serious publication. These are exactly the pages a person lands on from Google or a shared Facebook link, and the first three seconds look broken. CLS is also one of the three measurements Google uses to judge page experience.

**The fix.** Two steps. First (S): give every loading state the full height of the screen so the footer can never appear above the content, which removes almost all of the jump. Second (M): style the prerendered body with the site's own type and layout and leave it on screen until the real content is ready, instead of replacing it with "One moment". PR #540 does not touch this; its John 3 scores 53 with CLS 0.59, and the essay 48 with CLS 0.69.

### T2. Search cannot find the site's own main sections (high, M, STILL-OPEN-AFTER-PENDING)

**Where.** `/search` and the header search. Files: `client/src/lib/siteSearch.ts`, `scripts/build-search-index.mjs`, `client/public/search-index.json` (five sources only: Honest Answers 35, Christ and the Nation 11, Family Devotions 72, Family Catechism 71, What the Bible Says 208).

**What a visitor sees.** The twelve queries the brief asked for, on the live build:

| A visitor types | What comes back | Verdict |
|---|---|---|
| resurrection | "The Resurrection", "Did the resurrection actually happen?", "The Resurrection: A Bible Study on the Evidence" (16 results) | Good |
| anxiety | "Anxiety and Worry", "What does the Bible say about anxiety?", "Is my anxiety a spiritual failure?", "I can't stop worrying" (14) | Good |
| how to read the bible | "How to Read the Bible With Young Children" first, then "Where do I start reading the Bible?" (16) | Fair. The Study Bible, `/study`, and "Guides to Reading the Bible" are missing |
| family devotions | Three results: "How do we do family devotions?", "Family Devotion Builder", "Parenting is harder than anyone said" | Poor. No Family page, no "Tonight at the Table", no list of devotions, no catechism |
| john 3:16 | "John 3:16, Read it in the Study Bible, with the notes on its chapter", then "What is faith?" | Good |
| church history | "When Power Takes the Church", one essay, "Theology Quiz", "Wisdom Finder", then "How Should Christians Think About Sickness and Health?", "How Do You Date Wisely and Choose a Spouse?" | Poor. The Church History section (`/theology/history`) is not in the results at all |
| doubt | "Doubt and Questions", "Self-Doubt", "How to Handle Doubt", "I'm not sure I believe anymore" (16) | Good |
| marriage | "My marriage is falling apart" first, then four "What the Bible Says" pages (16) | Good |
| deconstruction | "I'm not sure I believe anymore", "I'm deconstructing my faith", two study guides, "After Christendom" (5) | Good |
| who wrote the bible | "Can I trust the Bible?" then "Forgiveness: A Bible Study on the Hardest Word", "Grief: A Bible Study...", "The Fruit of the Spirit..." (7) | Poor after the first. The Honest Answer "Why would anyone trust the Bible?" and the 66 book introductions (which say who wrote each book) are missing |
| advent | Two results: "How to Keep Advent as a Family", "Waiting for the Light: A Bible Study for Advent" | Thin. The Advent family devotions are not found, twelve days before Advent |
| prayer | "When Prayer Is Hard", "The Prayer Planner", "Prayer Generator", study guides, catechism questions (16) | Good |

Extra queries I ran to find the edges: "study bible" returns "Deep Bible Study Companion" and a list of study guides, not The Study Bible. "augustine" returns three Integrated Life pages and none of the 36 church history people. "trinity" does not return the doctrine study. "books" returns "Is the Bible an American Book?" and not James's books. "contact" returns "Difficult Family" and "Estrangement and the Cut-Off". "James Bell" returns sixteen eight-week plans. "christmas" returns one result.

**Why it fails the goal.** A visitor holding one word (church history, family devotions, Augustine, Advent) is told, in effect, that the site does not have it, when it has it in depth. The October critique (CRITIQUE.md, the "grace" example) said the same; the reference-first jump has since been fixed, the coverage has not.

**The fix.** Add to the search index: every hub and site page by its plain name (Study Bible, Church History, Family, Tonight at the Table, Books, About, Contact, Subscribe, Topics); the 66 book introductions, the doctrine studies, the reading guides and the eleven acts of the story; the church history people, councils and heresies; the seasonal devotions. Rank a hub above its children when the query is the hub's name. PR #540 adds the three topic pages and makes each devotion result open its own page (`/family/devotions/the-holy-spirit` instead of the list), which is a real improvement, but every "Poor" row above is unchanged there.

Also small: results stop at 16 with no "show more"; catechism results all link to the top of `/family/catechism` rather than the question; the "Articles" filter depends on the API.

### T3. An essay that is already a file on the site still waits for the database before it shows (medium-high, S, STILL-OPEN-AFTER-PENDING)

**Where.** `/writing/<slug>` for every rewritten essay: 5 live today, 25 once PR #541 and `land-next` are in. File: `client/src/pages/ArticleDetail.tsx` lines 409 to 531: `if (postQuery.isLoading || rewriteQuery.isLoading)` shows "Loading article..." until both the essay file and the database call finish. The code comment says so: "wait for the file and for the database row (its pillar and dates)".

**What a visitor sees.** "Loading article..." for as long as the server function and MySQL take to answer, even though the essay's whole text arrived in 9 KB from the site itself. If the database is slow or down, the essay is held for the full retry. (In this sandbox, with no API, the essay took over 5 s to appear for that reason; live it will be faster, but the dependency is real.)

**Why it fails the goal.** The rewritten essays are the new front line of the site and the pieces most likely to be shared on Facebook and Substack. They should be the fastest pages on the site, and they should survive a database outage.

**The fix.** Render as soon as the essay file loads; fill in the date and section when the database answers.

### T4. The RSS feed leaves out every rewritten essay (medium-high, M, STILL-OPEN-AFTER-PENDING) [API: read from code, not run]

**Where.** `https://www.livewellbyjamesbell.co/rss.xml`, served by `api/index.ts` (`rssLiveWell`, about line 2937). The comment above it reads: "A pending shelf essay stays out even once its rewrite exists: the rewrite lives in client/public/essays/, not in the row this feed reads".

**What a subscriber sees.** In `shelf.json` all five rewritten essays now public ("What 'Post-Christian' Actually Means", "When the Church Had Nothing to Lose", "Was America Founded as a Christian Nation?", "What Christian Nationalism Is, and What It Is Not", "Why Didn't the Bible Just Ban Slavery?") have status `pending`, so the feed skips them. On `land-next` all 25 essay files are `pending`. The feed will keep offering the fifteen older essays and none of the new ones.

**Why it fails the goal.** James wants the site to be the one place that ties to his Substack and Facebook. A feed is how readers, feed apps and any automatic cross-posting tool learn that something new was published. Today the newest work never reaches it. The feed also sends the stored body as it is; if the database holds Markdown, feed readers will show raw marks. That should be checked on the live feed.

**The fix.** Build the feed's items for rewritten essays from the same essay files the site reads, using the file's title, excerpt, date and body rendered to HTML. This is a change to `api/index.ts` (the production runtime), so it needs the usual care.

### T5. The pages that answer hard questions, teach church history and serve families are empty to anything that does not run JavaScript (medium-high, M, STILL-OPEN-AFTER-PENDING)

**Where.** `scripts/prerender-heads.mjs` writes a real body for some libraries and only a head for the rest. Counted across the live build:

| Section | Pages | With text in the HTML |
|---|---|---|
| `/answers` (35 Honest Answers on one page) | 1 | 0 |
| `/theology/history` (the church history front page) | 1 | 0 |
| `/family`, `/family/devotions`, `/family/catechism`, `/family/tonight`, `/family/reading-plans` | 5 | 0 |
| `/family/devotions/<id>` | 112 | 0 |
| `/wisdom/<topic>` ("What the Bible Says") | 208 | 0 |
| `/theology/doctrine/<id>` | 31 | 0 |
| `/nation/<slug>` | 13 | 0 |
| `/books` and `/books/<slug>` | 9 | 0 |
| `/study`, `/study/bible`, `/tools`, `/resources/creeds`, `/resources/context`, `/about` | 6 | 0 |

**What a crawler sees.** The right title and description, then `<div id="root">` with nothing in it.

**Why it fails the goal.** Google runs JavaScript, so Google will usually get there. Most AI answer engines and many link-preview and archive tools do not. The site's `robots.txt` names sixteen of them (GPTBot, ClaudeBot, PerplexityBot and others) and says they "are explicitly welcomed". When someone asks one of those assistants "did the resurrection happen" or "family devotion on forgiveness", the pages James wrote for that question have no words on them. This is the single largest reach gain available in this lens.

**The fix.** The mechanism already exists for the Study Bible, the guides and the Find Help pages. Extend it to the answers (one block per question, with the FAQ JSON-LD the page already builds at runtime), the family devotions and catechism, the "What the Bible Says" topics, the doctrine pages, the nation pages, the books, and a short text summary with links for each hub.

### T6. Eleven Study Bible links and eight quote links land on the wrong thing (medium, S, STILL-OPEN-AFTER-PENDING)

**Where and what a visitor sees.**

- **Jude, 2 John, 3 John.** On `/study/bible/jude` the outline links "JUDE 3-4 Contend for the faith", "JUDE 5-16 Examples of judgment", "JUDE 17-23 Remember, build, keep", "JUDE 24-25 Doxology" go to `/study/bible/jude/3`, `/jude/5`, `/jude/17`, `/jude/24`: the verse number is used as a chapter number. The page that opens says **"Jude has 1 chapter. Choose a chapter"**, with no heading and the home page's title in the browser tab. The same happens for 2 John (`/2-john/4`, `/7`, `/12`) and 3 John (`/3-john/5`, `/9`, `/11`, `/13`). Obadiah and Philemon are correct. Screenshot: `live-jude-3-m.png`. Identical in PR #540 (`pr540-jude-3-m.png`). File: the outline link builder in `client/src/pages/StudyBible.tsx` and the book data in `client/public/bible/`.
- **`/tools/quotes` ("Words Worth Sharing").** Eight quote cards link to essays that are off the shelf, so the reader lands on a "this essay is being revised" notice: "How to Read the Bible Without Making It Say What You Want", "What the Gospel Actually Is", "The Trinity Is Not Optional", "Inerrancy, Infallibility, and the Word You Can Trust", "Grace Is Not a Feeling", "How the Reformation Started and Why It Still Matters", "The Council of Nicaea: What Was Decided in 325" (this one becomes public on `land-next`), and "The Church Grew Fastest When It Had No Power" (redirects to another essay). File: `client/src/data/social-quotes.ts`. The link checker (`validate-links.mjs`) does not read this file.
- **Five internal links go through a redirect** instead of straight to the page: `/disciple-making` (from "Make Disciples" on `/how-tos`), `/books/raising-believers` (from two book pages), `/disruption` and `/disruption/topic/truth-and-tribe` (from `/disruption/consistency`), `/writing/witness-without-power`. No chains longer than one hop were found.

**The fix.** For the one-chapter books, link the outline to `/study/bible/jude/1#v3`. Pass the quote links through `isPublicEssayHref` and drop the link (keep the quote) when the essay is not public; add the file to the link validator. Re-point the five redirected links.

### T7. Colour contrast fails on the search page and on two dark heroes; three smaller accessibility faults (medium, S, STILL-OPEN-AFTER-PENDING)

axe results, both widths, live build:

| Page | Rule | What |
|---|---|---|
| `/search?q=prayer` | color-contrast, serious, 30 elements | "BACK", the result labels ("WHAT THE BIBLE SAYS", "TOOLS"), "See all in..." and the selected "ALL" pill use mustard `#d4a017` on cream `#f5f0e6` or cream on mustard: **2.09 to 1**. The minimum for text is 4.5 to 1. File: `client/src/pages/Search.tsx` (`var(--gold)`). |
| `/family`, `/theology/history` | color-contrast, serious, 1 each | The eyebrow in the dark band ("The oldest classroom", "The long memory") is `--mustard-text` `#7a6010` on `#1a1a1a`: **2.9 to 1**. That token is the dark mustard meant for cream backgrounds; on charcoal it needs the bright mustard. |
| `/writing/<essay>` | label-content-name-mismatch, serious, 2 | The text-size buttons show "A" but are named "Smaller text" and "Larger text"; voice-control users who say what they see cannot press them. |
| `/tools/theology-quiz` (error state, API) | landmark-one-main, page-has-heading-one | When the quiz fails to load, the "Try again" screen has no main landmark and no heading. |
| `/search`, `/contact`, `/subscribe` | heading-order | A heading level is skipped. |

**Why it matters.** The search page is the only place where the brand rule "mustard is punctuation, not body text" is broken for whole rows of text, and older readers will struggle to read the labels. RESULTS.md recorded zero violations, but on five pages that did not include these.

**The fix.** In `Search.tsx` use `--mustard-text` for labels on cream and ink on the mustard pill; in the two dark heroes use `--mustard`; add the visible "A" to the accessible names ("A, smaller text"); give `LoadFailed` a heading inside `main`.

### T8. Small tap targets where fingers matter most: the Study Bible chapter (medium, M, STILL-OPEN-AFTER-PENDING)

Script check at 390 pixels wide, 25 routes. Links inside running sentences are exempt, as WCAG allows.

| Page | Controls under 44 px | Under 24 px | The worst offenders |
|---|---|---|---|
| `/study/bible/john/3` | 423 of 489 | 198 | 36 verse-number buttons at 24 by 24; about 190 cross-reference links ("John 2:23-25", "Exodus 3:12") 16 to 19 px tall; "Read the study notes on this chapter" 16 px tall |
| `/answers` | 49 | 22 | "The book behind it: Believe" 22 px tall, 21 times |
| `/search?q=prayer` | 17 | 12 | "See all in Find Help" 17 px tall; "BACK" 20 px |
| `/writing/<essay>` | 16 | 11 | "A" text-size buttons 19 px tall; "Read his books" 25 px |
| `/theology/history` | 14 | 4 | "Ignatius of Antioch, around 35 to 108" 22 px tall |
| `/study/bible/john` | 21 | 3 | "Go to the chapters" 23 px; "John 1", "John 3" chips 24 px tall |
| `/downloads` | 224 | 0 | "A4" buttons 38 by 44, 211 times |
| Every page | 2 | 0 | "Skip to content" 40 px tall; the footer "Email address" field 42 px tall |

Home, /study, /study/bible, /family, /family/tonight, /family/devotions, /family/catechism, /books, /tools, /help, /contact, /resources and /resources/creeds are effectively clean.

**Why it matters.** A parent reading John 3 on a phone with a thumb will hit the wrong verse number or the wrong cross-reference. MASTER-PLAN already names the cure ("the whole verse is the tap target, not a 24 px number", unit U37); it has not been built.

**The fix.** Make the whole verse tappable; give cross-reference lists 12 px of vertical padding per link; pad the four or five named links to 44 px.

### T9. The same font file is downloaded three times (medium, S, STILL-OPEN-AFTER-PENDING)

**Where.** `client/public/fonts/` and the `@font-face` rules in `client/src/index.css`. `inter-400-latin.woff2`, `inter-500-latin.woff2` and `inter-600-latin.woff2` are the same file byte for byte (identical checksum, 48 KB). So are the three upright Cormorant Garamond files (38 KB). They are one variable font saved under three names.

**What a visitor pays.** Lighthouse shows five or six font requests per page with `inter-400` and `inter-600` at 47 KB each. That is about 95 KB of Inter and up to 75 KB of Cormorant fetched twice or three times on a first visit, more than the whole application entry file (78 KB). Late-arriving copies are also what Lighthouse blames for part of the layout shift ("Web font loaded").

**The fix.** One `@font-face` per family and subset with `font-weight: 400 600`, pointing at one file. Delete the duplicates.

### T10. The front page shows a portrait, loaded from someone else's server (medium, S, STILL-OPEN-AFTER-PENDING)

**Where.** `/`. `client/src/pages/Home.tsx` (the `home-hero__portrait` image) uses `PORTRAIT_URL` in `client/src/lib/positioning.ts`: `https://d2xsxph8kpxj0f.cloudfront.net/.../IMG_4533_137f3486.jpeg`. Same in PR #540.

**What a visitor sees.** A portrait beside "James Bell / About James" at the top of the home page. In this sandbox that server cannot be reached, so the screenshot shows exactly what a visitor would see if that bucket ever went away: a broken-image icon with the words "James Bell" (`live-m_home.png`).

**Why it is a finding.** Two reasons. NOTES.md records James's decision: "No photograph of him on the front page." And it is the one image on the home page that is not served from the site's own files; the U08 work was meant to move it into the site.

**The fix.** Remove the image from the home hero (keep the name and the About link), and host the portrait used on `/about` and the author card inside `client/public/`.

### T11. Machine-readable text states James's title, years and book count, which the notes say never to state (medium, S, STILL-OPEN-AFTER-PENDING, needs James)

**Where and the exact words.**
- `client/public/llms.txt` (live and PR #540): "Lead Pastor of First Baptist Church of Fenton, Michigan, founder of the Pastors Connection Network, and author of 21 books."
- `client/src/pages/About.tsx` JSON-LD (line 98): `jobTitle: "Lead Pastor, Author, Founder"` and "Lead Pastor at First Baptist Church of Fenton for twelve years, author of [count] books, founder of the Pastors Connection Network (nearly 18,000 pastors)".
- `client/index.html` default description: "By James Bell, Lead Pastor and founder of the Pastors Connection Network."

**Why it matters.** These are the lines search engines and AI assistants quote when asked who James Bell is. NOTES.md says the years (12 or 15) and the book count (21 or 25) are unresolved and must not be stated. I have not changed or judged the facts; only James can settle them.

**The fix.** Either James confirms the numbers, or these three places are reduced to the confirmed biography (a pastor, founder of the Pastors Connection Network, came to faith from atheism).

### T12. Smaller search-engine housekeeping (low to medium, S each, STILL-OPEN-AFTER-PENDING)

- **The not-found page tells search engines to index it.** `/anything-wrong` shows "There is no page here." but the page's robots tag still says `index, follow`, its canonical points at the home page, and the server answers 200. Give `NotFound.tsx` a `noindex`.
- **`/family/tonight` is not in the sitemap** (live or PR #540), although `llms.txt` advertises it and it has its own title, "Tonight at the Table: A Family Devotion". It is the page most likely to match "family devotion tonight". Note that it immediately forwards the reader to the day's devotion page (today `/family/devotions/stewardship`), which is fine for people; add it to the sitemap anyway.
- **Only 6 of 2,268 sitemap entries carry a last-modified date.** Search engines use it to decide what to re-read. The Study Bible and the libraries have dates in their data.
- **The site-search hint given to Google points at the wrong page.** The WebSite JSON-LD in `SEOMeta.tsx` says search lives at `/writing?q=...`, which only filters essays. It should be `/search?q=...`.
- **`llms-full.txt` (105 KB) lists essays, the nation pages, life, how-tos, study guides, context guides, church history and creeds, but not the Study Bible, the Honest Answers, the family devotions or Find Help.** `llms.txt` on the live site also still names the old doors ("Study, Essays, Books, Resources, and About"); PR #540 corrects that line (FIXED-IN-PENDING for that line only).
- **No structured data on several pages that have a natural type.** `/books/believe` and the other book pages carry no `Book` JSON-LD though `SEOMeta.tsx` has a helper for it; `/theology/history`, `/study/bible`, `/family` and the tools have no breadcrumb. `/about` carries the `Person` block twice.
- **Many titles are longer than Google shows** (about 60 characters). "John 3 Study Notes - Nicodemus, New Birth, and God's Love for the World | LiveWell by James Bell" is 100. The useful words come first, so this is cosmetic; dropping "| LiveWell by James Bell" on chapter pages would fit most of them.
- **`/family` loses SEO points for one link named "Start"** (Lighthouse SEO 92 instead of 100). Name it "Start tonight's devotion".
- **The podcast link is `http://followingthewaypodcast.com/`**, not `https`. Check whether the secure address works and use it.

### T13. The quality check in CI only looks at the home page, and through the wrong kind of server (low for visitors, high for staying good; S to M; STILL-OPEN-AFTER-PENDING)

**Where.** `.github/workflows/ci.yml`, job `quality`: `npx serve -s dist/public` then Lighthouse and axe on `/` only, and the job is `continue-on-error`.

**Why it matters.** `serve -s` answers every address with the home page's HTML, so even if more pages were added they would be measured without their prerendered content. That is how the home page reached 100 while the Study Bible chapter sat at 43 without anyone seeing it.

**The fix.** Serve the build the way Vercel does (a 30-line script; the one I used is described at the top of this report), run Lighthouse on Home, one chapter, one essay, `/family` and `/theology/history`, and fail the job when CLS is over 0.1 or accessibility under 95. Run axe on the same five plus `/search?q=prayer`.

### T14. One new small fault introduced by PR #540 (low, S)

- `/family/devotions` in PR #540 has a drop-down set at 15 px. iPhones zoom the whole page when a field under 16 px is focused. Set it to 16 px.
- `/topics` jumps while loading (CLS 0.21 to 0.23, footer), the same cause as T1.

Otherwise PR #540's new pages are clean: `/topics`, `/topics/living-after-christendom`, `/family/tonight`, `/family/devotions`, `/study/bible/guides/whole-story-2027` and `/study` all pass axe with zero violations at both widths, none scrolls sideways, and the PR's own tap-target fixes hold (2 controls under 44 px on each, both the site-wide skip link and footer field).

### T15. An opportunity, not a fault: the family table does not work offline (L)

The site declares itself an installable app (`manifest.webmanifest`, `display: standalone`) but the service worker only removes old caches. A family that added LiveWell to the home screen and opens it at a table with poor signal gets nothing. Caching tonight's devotion, the week's catechism question and the last chapter read would make "one place for families" true in the car and at the cabin. This is a real build and should be weighed against the rest.

---

## 4. Lighthouse, three runs each, medians (mobile emulation, simulated slow 4G)

Live build, served the way Vercel serves it.

| Page | Performance (runs) | Accessibility | Best practices | SEO | LCP | Blocking time | CLS | Top causes |
|---|---|---|---|---|---|---|---|---|
| Home `/` | 100 (100, 99, 100) | 100 | 96* | 100 | 0.9 s | 75 ms | 0.000 | none |
| `/study` | 89 (89, 89, 89) | 100 | 96* | 100 | 3.7 s | 110 ms | 0.000 | page waits for its own code chunk; 54 KB unused JS |
| `/study/bible/john/3` | 43 (43, 42, 51) | 100 | 96* | 100 | 4.9 s | 666 ms | 0.613 | layout shift (T1); 2.7 s main-thread work; 11 JSON files, one of 91 KB (`catalogue/index.json`); 1,612 elements |
| `/writing` | 88 (87, 88, 88) | 100 | 96* | 100 | 3.8 s | 132 ms | 0.011 | lazy chunk; 47 KB unused JS |
| `/writing/what-post-christian-means` | 45 (45, 44, 49) | 100 | 96* | 100 | 5.4 s (API) | 482 ms | 0.689 | layout shift (T1); waits on the API (T3); 35 scripts, 307 KB of JS including a 60 KB `discussion-guides` file |
| `/family` | 78 (76, 80, 78) | 96 | 96* | 92 | 5.0 s | 187 ms | 0.056 | nine JSON indexes (100 KB) before the heading settles; contrast (T7); link named "Start" |
| `/theology/history` | 80 (63, 80, 88) | 96 | 96* | 100 | 5.1 s | 142 ms | 0.001 to 0.296 | intermittent shift of a whole section; 118 KB JSON; contrast (T7) |
| `/tools` | 87 (87, 85, 88) | 100 | 96* | 100 | 3.9 s | 137 ms | 0.000 | lazy chunk |
| `/tools/theology-quiz` (API error state) | 90 (89, 90, 90) | 98 | 96* | 100 | 3.7 s | 52 ms | 0.000 | measured showing "Try again" because the quiz needs the API |

\* Best practices is 96 only because of console errors that exist only here: Vercel's analytics scripts and `/api/track` are missing locally. On the live site this should read 100.

A note on LCP. The 3.7 to 5.4 s figures on inner pages are Lighthouse's simulation of a slow phone. RESULTS.md explains why the simulation is pessimistic for pages whose code arrives in a second file. The real-browser trace I ran (T1) shows the real content at about 2.8 to 3.4 s on a throttled phone. That is acceptable; what is not acceptable is what the screen does in those three seconds.

PR #540, same method: Home 100 (CLS 0.000), `/study/bible/john/3` 53 (CLS 0.593), `/family` 77 (CLS 0.061), `/topics` 79 (CLS 0.209), the essay 48 (CLS 0.689), `/theology/history` 66 (56 to 81, CLS up to 0.296).

---

## 5. The other checks, in brief

**Crawl.** Live: 1,164 pages opened, 3,430 distinct internal targets. Not-found pages: 0. Retired or pending essay notices: 8, all from `/tools/quotes` (T6). Wrong-chapter pages: 11 (T6). Internal links through a redirect: 5, all one hop (T6). In-page anchors that do not exist: 0. PDF and EPUB: 20 answered; 599 PDF links returned not-found only because PDFs are built at deploy (section 7). PR #540: 1,245 pages, 3,783 targets, the same 8, 11 and 5, nothing new. External links seen: `substack.com/@jamesbell333289`, `facebook.com/james.bell.609252`, the podcast, PCN, ENDS, the crisis lines, STEP Bible, OpenBible, Stripe. The Substack and Facebook addresses match NOTES.md.

**Prerendered heads (42 routes sampled).** All unique, all with canonical, Open Graph and Twitter card. Two routes fall back to the home head: `/my-library` (personal, harmless) and, on live only, `/topics` (the page does not exist until PR #540, where it has its own head: "Topics: The Hard Questions of Faith in Post-Christian America"). Six hub pages share the default share image (`/writing`, `/books`, `/about`, `/tools`, `/nation`, Home); the rest generate their own from the title.

**`robots.txt`.** Sound. Allows everything but `/admin` and `/api`, keeps `/api/og` open so share images work, names the sitemap.

**`sitemap.xml`.** 2,268 addresses (2,273 in PR #540, which adds `/topics`, its three pages and the 2027 reading plan). Study Bible 1,356; What the Bible Says 208; how-tos 132; family devotions 113; life 70; study guides 68; context 42; Find Help 40; doctrine 31; plans 29; tools 28; church history 23; essays 20; creeds 15. Present: `/study`, `/study/bible`, `/theology/history`, `/family`, `/family/devotions`, `/family/catechism`, `/answers`, `/books`, `/writing`, `/help`, `/about`, `/contact`, `/subscribe`, `/speaking`. Missing: `/family/tonight` (T12). `/search` is rightly absent.

**`rss.xml`.** Served by the API, so not runnable here. From the code: valid RSS 2.0 with full text; advertised in every page's head (`<link rel="alternate" type="application/rss+xml" href="/rss.xml">`). The gap is T4.

**`llms.txt`.** Present, readable, covers Study, Essays, Books, Resources, Find Help, Family, About and how to cite. Faults in T11 and T12.

**Bundle sizes (live).** 288 JavaScript files, 7.24 MB in all; 3.16 MB of that is `content-data`, loaded only by the admin. Entry 278 KB (78 KB compressed); React 194 KB (61 KB); one stylesheet 127 KB (23 KB). Largest reader-facing extras: `DeepBibleCompanion` 286 KB (94 KB), `discussion-guides` 198 KB (65 KB, pulled in by every essay page), `TheologyGlossary` 159 KB (55 KB), `Markdown` 157 KB (48 KB), `BibleReference` 129 KB (46 KB). PR #540: 7.28 MB in all; entry down to 254 KB (74 KB).

---

## 6. Compared with RESULTS.md (the earlier re-baseline)

| Measure | RESULTS.md | Today, live | Direction |
|---|---|---|---|
| Home performance | 87 | 100 | Better |
| `/writing` performance | 85 | 88 | Better |
| `/tools/theology-quiz` performance | 85 | 90 (error state, API) | Same or better |
| SEO on prerendered pages | 92 "measurement artifact" | 100 when served as Vercel serves | The artifact is explained |
| Entry file | 358 kB raw, 96.5 kB gz | 278 kB raw, 78 kB gz (254 and 74 in PR #540) | Better |
| Total JavaScript | about 6.5 MB, 301 files | 7.24 MB, 288 files | Slightly larger (more content) |
| Prerendered pages | 609 | 2,948 | Much better |
| axe on the five baseline pages | 0 violations | 0 on Home and `/writing`; `/babylon` and `/tools/life-audit` not re-run | Held |
| Fonts | self-hosted, preloaded | still self-hosted; duplicate files found (T9) | Held, with a flaw |
| CLS | 0.000 to 0.022 on five pages | 0.000 on Home; **0.61 on a chapter, 0.69 on an essay** | Those page types were not in the old set, so this is newly seen rather than a proven regression |
| "No infinite Loading" | fixed with `LoadFailed` | holds: the quiz shows "Try again" and "Back to the tools" with no API | Held |

Still open from RESULTS.md: the font-swap shift it deferred ("a metric-adjusted fallback face") is still not done and now shows up in the Lighthouse attribution for T1. From CRITIQUE.md (October): "one search index" is still open (T2); "make axe blocking on all 25 captured routes" is still open (T13); mustard used as text on light surfaces is still present on `/search` (T7).

---

## 7. What only fails here because there is no API (do not report these as live faults)

- The 15 essays whose text lives in the database (for example `/writing/every-generation-was-sure-it-was`) show a load-failed state locally. Their prerendered pages also lack a body locally because the prerender could not read the database; on Vercel it can.
- `/tools/theology-quiz` shows "Try again"; the "Articles" filter on `/search` is empty; the newsletter form, contact form and `/api/og` share images cannot be exercised.
- `/rss.xml`, `/feed`, `/feed.xml` (T4 is from reading the code).
- Console errors for `/_vercel/insights/script.js`, `/_vercel/speed-insights/script.js` and `/api/track`, which cost 4 points of "best practices" locally.
- 599 PDF links under `/downloads/` (`help` 320, `studyguides` 136, `plans` 58, `context` 41, `tools` 24, `reading-plans` 10, `seasonal` 6, `workbooks` 4). The folder is generated by `pnpm pdfs` during the Vercel build and is not committed. I did not verify them on the live site; one check of a few of these addresses on the real domain would close that.
- The home portrait fails to load here because the CloudFront address is unreachable from the sandbox (T10 stands on other grounds).
- The essay LCP of 5.4 s is inflated by the missing API; the dependency behind it (T3) is real.

---

## 8. Questions only James can answer

1. May the portrait come off the home page now, as recorded in the notes, or has that changed?
2. Which is right for the machine-readable biography: no title, years or book count at all, or confirmed numbers (twelve or fifteen years; 21 or 25 books; "nearly 18,000 pastors")?
3. Should the RSS feed carry the rewritten essays in full, or only an opening and a link back to the site (which matters if Substack is to remain the place where the full newsletter is read)?
4. Is offline use at the family table (T15) worth a larger build?
