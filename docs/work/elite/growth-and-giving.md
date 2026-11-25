# Growth and giving: the plan, the prices, and a prompt for each connector

Written 2026-11-25, the day giving went live. James asked for three things:
recommendations on what to do next, pricing and giving like the Bible
Project "but even better", and a prompt for each connector that could
improve the site once it is connected.

Nothing here is tax, legal or financial advice. Every money decision below
goes past an accountant before it is acted on.

## Where things stand (verified 2026-11-25)

- Production (`main` at 173700da) is deployed on Vercel, and the live
  server answers `giving.status` with `open: true`. It only says that when
  the switch in `client/src/lib/giving.json` is on and a Stripe key is set.
- `/support` is public and indexed: one-time gifts of $10, $25, $50 or $100
  (or any amount from $1), monthly gifts of $5, $10, $25 or $50.
- Every download except the Find Help printables, the care plans and the
  grief and abuse worksheets raises the suggested-gift sheet: $8.99 for a
  full book, stepping down to $1.99 for short pieces (`shared/downloads.ts`).
  "Download without giving" is always there.
- The line every giver reads: gifts go to James personally, pay what
  LiveWell costs to run, and whatever is left goes to planting churches
  through the Ends Initiative and Gather Church. Not tax-deductible.
- Not yet verified: a real gift going all the way through. James makes one
  small gift himself to close this.

## What the Bible Project gets right, and where LiveWell can go further

The Bible Project's model is simple: everything free, beautifully made,
paid for by a large base of small monthly supporters who are told plainly
what their money does. Three habits carry it. Monthly giving is the
default, not an afterthought. Supporters are treated as partners in the
work and hear from it regularly. And the organisation is trusted with the
money because it is accountable for it.

LiveWell can go further in four ways the Bible Project does not:

1. **It lives inside the local church.** Group guides with leader's
   guides, tracks a small group can walk through, family table devotions.
   The Bible Project makes something a church can show; LiveWell makes
   something a church can run.
2. **It writes toward the skeptic.** The case for the faith, the honest
   answers, church history told whole. That reader has no Bible Project.
3. **The money goes somewhere you can name.** Gifts past the cost of the
   site plant churches. A supporter is not funding content; they are
   funding congregations.
4. **The content can follow the money.** Translating the tracks and study
   guides into the languages of the church plants would make every gift
   visible twice: once on the site, once in a new congregation's hands.

## Recommendations, in order

### 1. Today: make one real gift

Download any book on the live site, give $1 through the sheet, and check
that Stripe shows it and the download starts. If the payment page does not
open, the Stripe key in Vercel is a test key or is wrong.

### 2. This month: decide who receives the money (the biggest lever)

Right now gifts go to James personally and are not tax-deductible. That
holds back giving in three ways: donors give less when it is not
deductible, most churches cannot give to an individual at all, and the
promise that "whatever is left goes to church planting" rests on one
person's word rather than a board's books.

If Ends of the Earth Missions (or Gather Church, or another body James
already directs) is a registered 501(c)(3), LiveWell could become one of
its programs. Gifts would then be deductible, churches could give, and the
church-planting promise would be audited. Ask the accountant and, if
needed, an attorney. On the site this is two sentences in
`client/src/lib/giving.json` and a Stripe account in the organisation's
name.

### 3. Next: a monthly partner program, without a paywall

- Make "each month" the first thing a visitor sees on `/support`, with
  one-time one tap away. This is how the Bible Project grew, and a $10
  monthly partner gives $120 a year.
- Call monthly givers **partners**. They get nothing locked away from
  anyone else; they get a short letter from James each quarter with a
  report from the church plants. Send it through Substack (a partners-only
  section) or as a plain email; nothing new to build.
- Keep $5 a month as the floor. Below that, card fees eat too much.

### 4. Prices: keep the ladder, then let the numbers decide

The download ladder ($8.99 down to $1.99) and the gift amounts are
sensible starting points. Do not change them on a hunch. After 60 days,
pull from Stripe: how many gifts came from downloads, the average gift,
and which titles drew gifts. Then adjust one thing at a time. Two changes
worth testing later: a suggested $5 on the short booklets, and a
"church copy" amount ($25) on the group study guides for a leader buying
for the whole group.

### 5. A church partner tier (after step 2)

Once gifts can go to a nonprofit, invite churches using the group guides
and tracks to partner monthly at $50, $100 or $250. They get what everyone
gets, plus a line on a partner-churches page if they want it. This is the
pastors-as-readers channel turned into the mission's base, without
touching the Pastors Connection Network, which stays off the site.

### 6. Say where it went, once a year

Publish a one-page report on `/support` each January: total given, what
the site cost to run, and what went to church planting. No donor names.
This is the habit that makes small givers trust a ministry for years.

### 7. Translate for the church plants

Pick the one track and three study guides most useful to a new
congregation and translate them into the languages of the Ends Initiative
and Gather Church plants. Name it on `/support`: "Gifts this year are
translating the new-believer track into [language]." It is the most
Bible-Project-plus thing LiveWell could do.

## Connectors: what to connect, what to skip

The red list of failed connectors at the start of a cloud session has two
causes:

- **Most are blocked by this cloud environment's network**, not
  disconnected. The cloud container only reaches hosts its environment
  allows. Either add the host under the environment's Network access
  (cloud environment menu, Edit; steps at
  https://code.claude.com/docs/en/cloud-environments#network-access) or
  run that connector's prompt from a claude.ai chat or the desktop app,
  where connectors work without this limit.
- **Datadog needs signing in** at https://claude.ai/customize/connectors.
  **BigQuery cannot connect** (its sign-in is not compatible); LiveWell
  does not need it.

Worth connecting for LiveWell, in order: **Stripe** (install the Stripe
plugin from the Anthropic Directory), **Supermetrics** (for Google
Analytics, Search Console and the Facebook page in one place), then
**Ahrefs** or **Similarweb** (one, not both). Already connected and
useful: Vercel, Gmail, Google Drive, Canva, PayPal, Calendly, GitHub.

Not needed for LiveWell, and worth turning off so every session stops
trying them: the bio-research set, the legal set (DocuSign, Egnyte), the
HR set, Apollo, Common Room, Gong, Intercom, PagerDuty, Guru, Monday,
Hex, Definite, Linear, Figma (Canva covers it), Notion and Asana (the
Command Center in Drive already does this), HubSpot and Klaviyo (Substack
is the newsletter; a second email system splits the list).

## The prompts

Each prompt stands alone: paste it into a new session that has the
connector. Each one reads first, changes nothing outside the repo without
James's yes, never writes a donor's name, email or amount into the repo,
and follows `CLAUDE.md` for voice and code.

### Stripe (giving health, monthly)

```
Connect to LiveWell's Stripe account read-only. For the last 30 days and
for all time since 2026-11-25, report: number of gifts, total, average
gift, one-time versus monthly, monthly partners active and cancelled,
failed payments, refunds and disputes. Split download gifts (Checkout
sessions with kind "download", from giving.createDownloadCheckout) from
/support gifts, and list download gifts by item id with counts and totals.
Report totals only: no donor names, emails or card details, and nothing
written to the repo. Then read shared/downloads.ts and shared/giving.ts in
pastorjbell206-cloud/Livewell- and recommend at most two changes to the
amounts, each with the number that justifies it. Change no prices in
Stripe or in code; recommend only.
```

### Supermetrics: Google Analytics, Search Console, Facebook (monthly)

```
Using Supermetrics, pull the last 28 days for www.livewellbyjamesbell.co
from GA4 and Search Console, and for James Bell's Facebook page. Report:
the 20 most-read pages, where readers came from, the 20 search queries
with the most impressions and their click-through rate, pages with many
impressions and few clicks, and how many visits reached /support,
/downloads and a book page. Compare with the previous 28 days. Then open
pastorjbell206-cloud/Livewell-, read CLAUDE.md, and propose the five
changes most likely to grow reading and giving (titles, descriptions,
internal links, a missing page), each tied to a number. Open a draft pull
request only for title and description fixes on pages that already exist;
everything else is a recommendation.
```

### Ahrefs or Similarweb (quarterly)

```
For www.livewellbyjamesbell.co, report its organic keywords, its pages
ranking in positions 4 to 20 (closest to page one), the sites linking to
it, and how it compares with bibleproject.com, thegospelcoalition.org and
desiringgod.org on topics LiveWell covers: church history, the case for
Christianity, Bible study, and family devotions. Name ten questions those
sites rank for that LiveWell answers better or could answer, and check
each against the site's existing pages (client/src/lib/siteCatalog.ts and
the search index) before suggesting anything new. Recommendations only;
write no content.
```

### Vercel (after every release, or weekly)

```
For the Vercel project livewell-tn9v, check the latest production
deployment: build state, runtime errors and slow functions in the last 7
days, and the response of /api/trpc/giving.status. Fetch /support,
/downloads, /books and one book page from the production deployment and
confirm each returns 200 with its own title. If an error repeats, find its
cause in pastorjbell206-cloud/Livewell- (api/index.ts is the production
runtime) and open a draft pull request with the fix and a test. Change no
environment variables or project settings.
```

### Gmail (weekly, partners' replies)

```
Search Gmail for replies to Stripe gift receipts and any email mentioning
LiveWell, a book title, a download, or a gift in the last 7 days. Sort
them into: thanks, questions, problems (a download that failed, a charge
they did not expect), and requests from churches or pastors. Draft a
short reply to each problem and question in James's voice for him to
approve, and send nothing. Report how many of each, with no money amounts
quoted. If two or more people hit the same problem, describe it so it can
be fixed on the site.
```

### Google Drive (quarterly partner letter)

```
Read the Bell Command Center folder for anything on the Ends Initiative,
Gather Church, or church planting from the last quarter. Draft the
quarterly partner letter from James: 300 to 450 words, what the church
plants did this quarter, one story told with James's permission only
(otherwise a placeholder), what the gifts paid for, and one thing coming.
Follow CLAUDE.md's voice rules. Invent no numbers, names or events; mark
anything unconfirmed [confirm]. Save it as one new Google Doc in that
folder titled "Partner Letter <quarter> <year>" and change nothing else.
```

### Canva (when a new book or guide ships)

```
Using Canva, make a set for the newest book or study guide on
www.livewellbyjamesbell.co: a 1080x1350 Facebook post, a 1080x1920 story,
and a Substack header, using the cover from client/public/covers/ in
pastorjbell206-cloud/Livewell- and the palette in CLAUDE.md (cream
#F5F0E6, black #1A1A1A, mustard as accent only). The words: the title,
one line from the book's own page, and "Free to read. Give if it helps."
Leave them as drafts in Canva; publish nothing.
```

### PayPal (only if a second way to give is wanted)

```
Read-only: list PayPal transactions in the last 90 days that look like
gifts to LiveWell or James's ministry work, totals only. Then recommend
whether to offer PayPal beside Stripe on /support, based on how many
givers already use it. Do not create invoices or send anything.
```

### Calendly (speaking)

```
List James's Calendly event types and booked events for the next 90 days.
Compare with the /speaking page in pastorjbell206-cloud/Livewell-: does
the page offer a way to book or ask that matches a real event type?
Recommend one change to /speaking so a church can ask James to speak in
under a minute. Create, change or cancel nothing in Calendly.
```

### Fireflies or Granola (if sermons or talks are recorded)

```
From the last month's recorded sermons and talks, pull the passages where
James makes one argument at length (five minutes or more) that is not yet
an essay on www.livewellbyjamesbell.co (check client/src/lib/shelf.json).
For each, give the passage's transcript, the argument in two sentences,
and the essay title it could become. James's spoken words only: write no
new prose in his name.
```

### Datadog (optional; only once traffic justifies it)

```
Connect LiveWell's Vercel log drain to Datadog read-only, then report the
last 7 days of errors from the production function (api/index.ts) by
route, the slowest routes, and any error on giving.createCheckout or
giving.createDownloadCheckout. Recommend fixes; change nothing.
```

## What this session did not do

- Make a real gift (James does this).
- Decide the receiving entity or the tax position (the accountant does).
- Connect any connector, change the cloud environment's network, or
  install a plugin.
- Change any price, amount or page beyond the giving launch already merged.
