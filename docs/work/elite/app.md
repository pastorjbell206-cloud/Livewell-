# app: LiveWell on a phone or computer, built for a phone, and ENDS seen

Branch elite/app, 2026-11-18. Brief: /home/user/briefs/app.md, plus the
lead's two notes (the ENDS facts read from endsinitiative.org; the podcast
off the site).

## 1. Put LiveWell on your phone or computer

**What a browser needs (tested here, not from memory).** In the Chromium
shipped with Playwright (build 1243), `Page.getInstallabilityErrors` over the
DevTools protocol returned no errors for the live build's manifest, with the
site's self-destroying service worker kept as it is (no worker stays
registered; `sw.js` has no fetch handler). Chrome and Edge no longer require a
worker with a fetch handler, so none was added and nothing is precached or
cached. The old manifest was already installable; it lacked `id`, maskable
icons of its own and shortcuts, and its icons were a pixel-grid "LW".
Safari on iPhone, iPad and Mac has no install prompt: Share, then Add to Home
Screen (iOS), and File, then Add to Dock (macOS Sonoma or later). Those were
not tested here (no Safari); /app gives those steps.

**Manifest** (vite.config.ts): id, name, short_name, description, lang, dir,
start_url `/`, scope `/`, display standalone, theme `#1A1A1A` and background
`#F5F0E6` (the brand's charcoal and cream; a manifest cannot read a CSS
variable), icons 192 and 512 for "any" and for "maskable", and shortcuts to
Tonight's devotion, the Study Bible, Search and Find Help.
`index.html` now points `apple-touch-icon` at a 180px icon.

**Icons** (scripts/generate-pwa-icons.mjs, rewritten): the favicon's gilded
serif L on charcoal, set in the site's own Cormorant, rendered in headless
Chromium. Maskable ones keep the letter inside the safe circle.

**A new deploy still shows.** Nothing about the worker changed: it still
unregisters itself and clears caches; the page is fetched from the network
every time. After install the icon opens the same live site.

**/app, "Get LiveWell on your phone or computer"** (pages/AppInstall.tsx, its
drawings in pages/app/devices.tsx): the page top with a drawn laptop and
phone; one Install button only where the browser fired `beforeinstallprompt`
(checked with a synthetic event: the button appears and is the page's main
action); four tabs (iPhone or iPad, Android, Mac, Windows) with the reader's
own device chosen first, each with a small line drawing and three steps; then
four plain facts: the same site, free, not from an app store, needs a
connection. Route checklist: App.tsx, sitemap, prerender (string-literal
SEOMeta, prerendered), llms.txt, search index, catalogue (`APP_ENTRY`, shown in
/explore's jump list, the footer's bottom line and the phone menu sheet).
One quiet line on Home (under Find Help) and on /connect.

**Opened from the icon** (display-mode standalone): a bar at the foot of a
phone (components/AppBar.tsx, its own small chunk, loaded only then) with
Home, Bible, Tonight, Search and My Library, safe-area padding, the current
one marked. A Back button beside the name in the header on every page but
Home (components/AppBack.tsx; to Home when there is no page to go back to).
The chapter's study panel and the stepper bars sit above the bar
(`--lw-appbar-h`). On a phone in that mode the header's search and Subscribe
step aside (the bar has Search, the menu has Subscribe).

## 2. Built for a phone

Walked at 360x740 (touch, iPhone user agent) with an automated check for
sideways scroll, fields under 16px, targets under 44px and fixed bars, then
looked at screenshots at 360 and 390, day and night: Home, the seven doors,
/explore, /start, John 3 in Read and Study and the guided walk, tonight's
devotion, the catechism card, a study guide, an essay, an Honest Answer,
/tools and three tools (Wisdom Finder, Scripture memory, What the Bible says),
/search, /connect, /help, /contact, /subscribe, /app. No page scrolled
sideways and no visible field was under 16px. Only the header is sticky.

| Page | Fault | Fix |
|---|---|---|
| Every page at 360px | Header: "LiveWell" ran into "Find Help" | Subscribe waits in the menu below 380px (site-nav.css) |
| Any page with a field (Wisdom Finder's topic filter was 15px) | Safari on iPhone zooms on a field under 16px | Touch screens hold every text field at 16px or more (index.css) |
| /tools/wisdom-finder | Chips, tabs, letters and "Read the whole entry" 34px tall | 44px |
| John 3 | Read and Study switch 40px | 44px |
| Guided walk | Step bar 28px tall | 44px touch area, same look |
| Essay | Contents links 32px; "All essays" and Read next links about 24px | 44px (ArticleDetail, PageEndNav, shared with study guides) |
| Door label over a title, essay section kicker | 12 to 20px tall links | 44px touch area without moving the text |
| /subscribe | A button inside a link; the link 20px | One link as the site's button |
| /about | "Read the essays" 22px | 44px touch area |

Left as they are, on purpose: the 66 spines on the Bible shelf are a few
pixels wide on a phone, but the shelf's list button and arrows reach every
book; verse numbers in the chapter are inline in the text; the study guide's
two PDF buttons are 39px (GatedDownload belongs to the downloads work another
agent holds).

## 3. ENDS and the one fact

From /home/user/briefs/ends-facts.md only, the home page linked and nothing
else (no giving or partner pages):
- /connect: a wide card of its own, second on the page under LiveWell,
  "The missionary work James founded", "ENDS (Ends of the Earth Initiative)",
  "James founded ENDS. It trains local shepherds, sends them out, and helps
  the churches they plant do the same. It has done this among the nations,
  with partners in Thailand and India, and is now seeking to do the same in
  rural America." Visit ENDS opens endsinitiative.org in a new tab.
- /about: under his name, "Founder, ENDS (Ends of the Earth Initiative),
  which trains local shepherds and sends them out", linked.
- Footer: "James also founded ENDS (Ends of the Earth Initiative)."
- channels.ts, /explore (inside Find James), llms.txt, the search index.
- "A pastor for 16 years": on /about under his name, and on /connect in the
  line under the title. CLAUDE.md's Decision Log says so in one sentence.

**The podcast is off the site** (James, 2026-11-18): out of channels.ts, the
works and /connect, the catalogue (the Find James line no longer says
"podcast"), /explore, /about's lines and links, the author bio, the search
index and /connect's description. His own first-person paragraph on /about
still names "the Following the Way podcast"; the words are his and were not
changed, only the link was taken off. Decision Log entry added.

## What was run, and what passed

- `pnpm check`: passed.
- All 34 commands of the content-gates step in ci.yml: passed (search index
  rebuilt for /app and the new Find James line).
- `pnpm test`: 1634 passed, 1 failed under load (fes.test.tsx, the
  catechism); that file alone passed 4 of 4.
- ESLint on every changed source file: no errors or warnings.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`,
  `pnpm run audit:canonicals`: passed.
- Installability in Chromium: no errors, before and after.
- Lighthouse (scripts/lighthouse-median.mjs, median of three):

| Page | Before | After | Note |
|---|---|---|---|
| Home | perf 100, a11y 100, CLS 0 | perf 98, a11y 100, CLS 0 | |
| John 3 | perf 89, CLS 0, LCP 3.5s | perf 77 and 78, CLS 0, LCP 3.5s | |
| Essay | perf 76, CLS 0, LCP 4.2s | perf 68 and 72, CLS 0, LCP 4.2s | |
| /app | | perf 90, a11y 100, CLS 0 | |
| /connect | | perf 88, a11y 100, CLS 0 | |

The drops are in Total Blocking Time only; FCP, LCP and CLS are the same.
The machine's load average was 13 to 17 on 4 shared CPUs during the after
runs (other agents building). The entry script grew by 0.5 kB gzipped and
the stylesheet by 0.2 kB; the app bar and /app are their own chunks. Worth a
rerun on a quiet machine or in CI before calling it settled.

Screenshots: /home/user/elite-shots/app/ (the /app page at 390 and 1440, day
and night, and with the Install button; the app bar and Back at 360 and 1440;
/connect and /about; the walk pages at 360, day and night).

## Not verified

- Real install on an iPhone, an Android phone, a Mac or Windows; Safari's
  menus were written from its documented behaviour, not seen here.
- `beforeinstallprompt` firing on its own (headless Chromium does not fire
  it); the button was shown with a synthetic event.
- The standalone mode was shown by making the page believe it was in
  standalone mode; the real thing was not opened from an icon.

## Waits for James

- Whether his /about paragraph should still name the Following the Way
  podcast while it is off the site (his words, so left as written).
