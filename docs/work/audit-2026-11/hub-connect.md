# LiveWell audit, November 2026: the site as the one place to reach James

Lens key: `hub-connect`. Audited 2026-11-17.

**What was checked.** The live site (code of `origin/main` at `fea345a4`, served at localhost:4311) and the pending build of PR #540 (localhost:4312), in Chromium at 390x844 and 1440x900, plus the code behind every route to James and from him. Screenshots are in `docs/work/audit-2026-11/shots/hub-connect/` (`live-…` and `pend-…`, `d` = desktop, `m` = phone).

**What could not be checked here.** There is no database or API in this sandbox, and outside sites (Substack, Facebook, Stripe, the podcast, PCN, ENDS, the photo host) are unreachable. So I did not see a real contact message arrive, a real Substack confirmation, a Stripe checkout, the share-card image, or whether the outbound links resolve. Where a finding rests on reading the code and not on watching it run, it says so.

**Score: 5 out of 10 live, 6 after PR #540.** The parts exist and most are honest. What is missing is the hub itself: there is no single place that gathers Substack, Facebook, email, speaking and books, Facebook is almost invisible, and several pages promise things that do not exist.

---

## What is already strong

- **The About page reads like a person.** "My story in my own words" and "The heart behind it" are James's sentences, and the closing ("You may still be deciding whether to trust the voice. That is the right instinct, and you should keep it.") is exactly the tone a skeptic needs.
- **One list of outside channels.** `client/src/lib/channels.ts` holds the Substack, Facebook, ENDS and podcast addresses once. The Substack handle (`jamesbell333289`) and Facebook address (`james.bell.609252`) match what James gave everywhere they appear.
- **The contact form is real in production code.** `api/index.ts` `contactForm` saves each message and returns an error if the save fails; the page shows "Your message did not send. Try again. You can also email Pastorjbell206@gmail.com." There is a rate limit.
- **Contact carries a path to help.** "If you are in crisis or thinking about ending your life, do not wait on a reply here. In the US, call or text 988…"
- **The subscribe forms no longer fake success.** The main forms record the email and then say "One more step… Confirm on Substack", which is true to how Substack works.
- **The Pastors Connection Network is linked** in the footer on every page and on About, with a plain sentence about why it exists.
- **Old addresses land somewhere.** `/connect` goes to `/about`, `/substack` to `/subscribe`, `/work-with-james` to `/speaking`. `/give` and `/events` give an honest "There is no page here." No giving page exists, which matches the Decision Log.
- **Every route has its own title and description for link previews**, written into the static HTML at build time, and an RSS feed exists at `/rss.xml`.
- **Essays have thoughtful sharing by email** ("Send to a skeptic / a pastor / your spouse"), a "Share quote" on every pull quote, and a citation copier.

---

## Findings, most important first

### 1. There is no one "Connect" place, and Facebook is nearly invisible (high, M)

- **Where:** every page. `client/src/components/Footer.tsx`, `client/src/pages/Home.tsx`, `client/src/pages/About.tsx`, `client/src/components/ChannelLine.tsx`.
- **What a visitor sees:** Facebook appears in exactly two places on the whole live site: near the bottom of `/about` under "Everywhere James is" ("Facebook → Short pastoral notes, most days. The largest room James writes into.") and one small line at the end of an essay ("James also writes elsewhere: The newsletter · Facebook · ENDS · Following the Way"). It is not in the footer, the header, the home page, `/contact`, or `/subscribe`. Substack appears as a 12px "Substack →" in the footer's first column, and elsewhere only under the label "The newsletter", which does not tell a Substack reader this is the same thing. The home page has no link to either.
- **Why it fails the goal:** James asked for "a one-stop place for my Facebook, Substack, people to get a hold of me, my ministry." A Facebook follower who arrives on the home page cannot find the way back to Facebook without reading to the bottom of About.
- **Fix:** build one `/connect` page (structure below), add a "Connect" row to the About menu and the footer, and put a named "Read on Substack · Follow on Facebook" pair in the footer brand column and on Home. `/connect` currently redirects to `/about`; point it at the new page.
- **Status:** STILL-OPEN-AFTER-PENDING. PR #540 changes the header doors but the footer still carries only "Substack →".

### 2. The books promise a free opening that does not exist (high, M)

- **Where:** `/books` (`client/src/pages/Books.tsx`), Home (`Home.tsx`), and the three book pages (`Believe.tsx`, `WhenGodBlessAmerica.tsx`, `TheMonsterInTheMirror.tsx`).
- **What a visitor sees:** on `/books`: "The opening of each book is free to read. The rest costs $8.99" and a button on each book, "Read the opening free →". On Home: "Read the opening of each, free". The link preview for `/books` says "Read the opening of each free." The button leads to the book's sales page, which has a description, a chapter list and "Get the ebook — $8.99". No page of any book can be read. I searched all three pages for an excerpt and found none.
- **Why it fails the goal:** it is a promise broken on the first click, on the page where James asks people for money. He wants "books to read."
- **Fix:** either publish the real opening of each book on its page (James supplies or approves the text), or change the four lines to what is true today, such as "See what is inside".
- **Status:** STILL-OPEN-AFTER-PENDING.
- **Also on these pages:** ebook only. There is no print or Amazon option and no word on whether one exists. Each buy link goes to Stripe (`buy.stripe.com/…` for Believe and Monster, an embedded Stripe button for the first book); I could not test checkout from here.

### 3. About states the title, years and book count James has not confirmed, and contradicts itself (high, S)

- **Where:** `/about` (`About.tsx`), the author card under every essay (`components/AuthorBio.tsx`), `/authors/james-bell`, `/roadmap`, `/membership`, the link previews (`scripts/prerender-heads.mjs`), `client/public/llms.txt`, `client/src/lib/site.ts`.
- **What a visitor sees on `/about`:** "Lead Pastor, First Baptist Church of Fenton", "Author of 21 books", "I have pastored First Baptist Church of Fenton, Michigan for twelve years", and four bands later "a pastor with fifteen years of mistakes behind him". Also "PCN now connects nearly eighteen thousand pastors". The link preview for About says "for twelve years… has written twenty-one books." `/books` says "Three books. Every word mine." while `/roadmap` (linked from `/books` as "What's being written") says "Forty-eight books is the plan. Twenty-one are already in print." `site.ts` says "more than twenty books."
- **Why it fails the goal:** the working notes (`docs/work/NOTES.md`) say never to state his title, years in ministry or a book count, because twelve versus fifteen and 21 versus 25 are unresolved. A stranger deciding whether to trust him meets two different year counts on one page and three different book counts across three pages. The code comment at the top of `About.tsx` already knows this and is waiting on him.
- **Fix:** until James gives one set of numbers, remove the numbers and the title everywhere and keep the confirmed facts ("I pastor a church in Fenton, Michigan", founder of PCN, came to faith from atheism, five sons). When he confirms, set them once in `config/siteStats.ts`.
- **Status:** STILL-OPEN-AFTER-PENDING (About is identical in PR #540).

### 4. A contact message is saved to a list, not sent to James (high, S to M)

- **Where:** `/contact` and `/speaking` (`components/ContactForm.tsx`); `api/index.ts` `contactForm`.
- **What a visitor sees:** "A message here reaches James directly." After sending: "Message sent. Thank you for writing. I read everything and reply as soon as I can."
- **What the code does:** it inserts a row into the `contact_messages` table. Nothing emails James and nothing notifies him. The messages can be read only in the admin area. `CLAUDE.md` says "Contact forms send to Pastorjbell206@gmail.com"; the code does not do that. In the dev runtime the route does not exist at all.
- **Why it fails the goal:** a speaking invitation with a date on it can sit unread. The promise "reaches James directly" is true only if he opens the admin inbox.
- **Fix:** have the handler also send the message to his inbox (a mail service key in Vercel, or the same webhook pattern the newsletter code already uses), and keep the saved copy. Until then, change the line to something true and lead with the email address.
- **Smaller, same form:** the client treats any "200 OK" as success without reading the reply. In this sandbox, with no API, the form showed "Message sent" for a message that went nowhere (screenshot `live-m-contact-after-submit.png`). Check for `ok: true` in the reply before showing success.
- **Status:** STILL-OPEN-AFTER-PENDING.

### 5. Subscribing takes two steps, promises a weekly essay chosen for you, and ten pages never finish the job (high, M)

- **Where:** `/subscribe` (`pages/EmailSignup.tsx`, `components/SegmentedSignup.tsx`), the footer and Home form (`components/NewsletterSignup.tsx`), ten landing pages (`components/LandingSignup.tsx`), `api/index.ts` `subscribers.subscribe`.
- **What a visitor sees:** "One serious essay a week. Written slow, sent once." and "Tell us who you are and the first essay you get will match it." They pick "I'm a skeptic / a Christian / a pastor / just exploring", press Subscribe, and a new Substack tab opens with "One more step… Confirm on Substack."
- **What the code does:** the email and the choice are saved in the site's own table; the real subscription only happens if the visitor finishes on Substack. Substack receives the choice only as a tracking tag, so nothing sends a "first essay chosen for you". On the ten landing pages (grief, church hurt, faith crisis, burnout and so on) the form answers "You're on the list. One essay a week, written slow." with no Substack step at all, so those readers get nothing unless a forwarding hook has been set up in Vercel (`NEWSLETTER_WEBHOOK_URL` or Mailchimp keys; I cannot see whether it has). The production handler also reports success even when the save fails.
- **Why it fails the goal:** people in the hardest seasons give an email and hear nothing back. "One essay a week" and "chosen for you" are promises only James can confirm.
- **Fix:** make every form end the same way, with the Substack confirmation step, and reword to what is true ("New essays by email, through Substack"). Drop "the first essay will match it" unless James wants to build that. Say plainly on `/subscribe` that the newsletter is his Substack, with a direct "Read on Substack" link for people who would rather look first.
- **Status:** STILL-OPEN-AFTER-PENDING.

### 6. A live membership page sells something that does not exist (high, S)

- **Where:** `/membership` (`pages/Membership.tsx`), listed in `sitemap.xml`, linked from nowhere on the site.
- **What a visitor sees:** "The deeper room", "Five things the membership gives you", "Curated reading guides for the 21 books", "20+ essays searchable by topic", "Direct access to James… a contact channel that gets a response from him rather than an autoreply", "$9 / month or $89 / year", "The first 100 members lock in the founding rate", "Secured by Stripe", and at the foot "The door is open." The button is "Join the waitlist."
- **Why it fails the goal:** search engines can send people to a page promising a member library, a monthly letter and a price James has not launched, with a book count he has not confirmed.
- **Fix:** take it out of the sitemap and redirect it to `/subscribe` until James decides whether a membership exists.
- **Status:** STILL-OPEN-AFTER-PENDING.

### 7. The paid ebooks can be downloaded without paying (high, M)

- **Where:** `/ebook/believe/Believe.pdf` and `.epub` (both answered 200 on the live build), and the same for the other titles in `client/public/ebook/`, including books that were taken off the shelf. `/books/believe/thank-you` opens for anyone and shows "Your copy is ready" with both download buttons.
- **Why it matters:** anyone who guesses or is sent the address has the book. Retired titles James took down "to rewrite in my own hand" are still downloadable.
- **Fix:** move the files out of the public folder and serve them through the existing paid-download handler (`/api/download`, which already checks the Stripe session); remove the retired titles' files.
- **Status:** STILL-OPEN-AFTER-PENDING. Needs James's say on whether this matters to him.

### 8. Essays cannot be shared to Facebook in one tap, and most shared links show a generic card (medium, S to M)

- **Where:** essay pages (`pages/ArticleDetail.tsx`, `components/AudienceShare.tsx`); link previews in `dist/public/*/index.html`; `api/og.tsx`.
- **What a visitor sees:** sharing options are email to a skeptic, a pastor or a spouse, "Share quote", print and cite. There is no "Share on Facebook" and no plain "Copy link".
- **Link previews:** each essay gets its own card image with its title (good). But `/about`, `/books` and `/writing` all use the same card reading "LiveWell by James Bell", and a shared book link shows a text card, not the book's cover, even though the page asks for the cover. The card is drawn in Georgia, not the site's Cormorant Garamond. I could not render the image here.
- **Why it fails the goal:** Facebook is his largest audience. The easiest thing a reader could do for him is post an essay there.
- **Fix:** add "Share on Facebook" and "Copy link" to the essay share row; let the build pass a page's own image (the book cover) into the preview; give About, Books and Essays their own card titles.
- **Status:** STILL-OPEN-AFTER-PENDING.

### 9. The RSS feed is hidden and will miss the new essays (medium, S to M)

- **Where:** `/rss.xml` (`api/index.ts` `rssLiveWell`); `client/index.html` line 38.
- **What a visitor sees:** nothing. No page links to the feed; only feed readers that auto-detect it will find it.
- **What the code says:** the feed sends only essays marked "live" on the shelf (15 today), and its own comment says an essay whose rewrite lives in `client/public/essays/` "stays out" because the feed reads the database row, not the file. The essays in PR #541 and on `land-next` arrive as files, so by the code's own account they would not appear in the feed, and the 15 that do appear send the database text. I could not run the feed here.
- **Fix:** add "RSS" beside Substack in the footer and on the connect page; make the feed read the same source the essay page reads.
- **Status:** STILL-OPEN-AFTER-PENDING.

### 10. The home page does not show his latest writing or where else he writes (medium, M)

- **Where:** `/` (`pages/Home.tsx`), live and PR #540.
- **What a visitor sees:** "Start with these", three essays chosen by hand, then the three books, then the form "One serious essay a week". Nothing says what is new, and there is no Substack or Facebook link.
- **Why it fails the goal:** a returning Facebook or Substack reader cannot tell whether anything has changed since the last visit.
- **Fix:** one line under "Start with these": the newest essay by date, with "More on Substack" and "Daily notes on Facebook" beside it. No import needed; these are links.
- **Status:** STILL-OPEN-AFTER-PENDING.
- **For James to settle:** his portrait is on the home page (live and pending). On 2026-10-28 he wrote "i dont want my image on the frontpage"; an earlier decision (#533) put it there. The photo is also loaded from an outside host (`d2xsxph8kpxj0f.cloudfront.net`), which I could not reach, so on About the frame showed empty here.

### 11. Speaking gives an organizer nothing to decide with (medium, M, needs James)

- **Where:** `/speaking` (`pages/Speaking.tsx`).
- **What a visitor sees:** "Conferences, retreats, revivals, and pulpit supply. Serious theology, preached like it matters on a Tuesday." and the form. No topics, no short bio to paste into a program, no photo to download, no sample of him speaking, no word on travel or fees. The page also offers "Pastoral coaching", "Church consulting" and "Writing and ghostwriting"; James should confirm he still offers each.
- **Fix:** when James supplies them: three to five talk titles, a 60-word bio, one photograph, one link to a sermon or the podcast. The code comment already says to add only what he gives.
- **Status:** STILL-OPEN-AFTER-PENDING. In PR #540 Speaking and Contact move into the header's About menu, which helps people find the page.

### 12. The church is named but never linked; two outbound links are unverified (medium, S, needs James)

- **Where:** `/about`, footer, `lib/channels.ts`, `lib/siteNav.ts`.
- **What a visitor sees:** "First Baptist Church of Fenton, Michigan" in text only. Someone who wants to visit on Sunday has no link, address or service time. PCN is linked (`https://pastorsconnectionnetwork.com`). The podcast link is `http://followingthewaypodcast.com/` (not https), and the code notes that the ENDS address (`https://endsinitiative.org`) "could not be opened to confirm."
- **Fix:** James gives the church's web address and confirms the podcast and ENDS addresses by clicking them once.
- **Status:** STILL-OPEN-AFTER-PENDING.

### 13. Two leftover pages show placeholder facts about him (low, S)

- **`/authors/james-bell`** (`pages/AuthorProfile.tsx`): "Founder & Primary Author", "He writes from fifteen years pastoring", "2 Articles published · 3 Hours of reading", and two sample cards ("The Calling", "Burnout: Warning Signs and Recovery") with emoji icons. Nothing links to it and it is not in the sitemap. Redirect it to `/about`.
- **`/roadmap`** (`pages/RoadMap.tsx`): page title "The Roadmap — 48 books"; "PUBLISHED — 0" appeared here with no API (it may fill in production). It is in the sitemap and linked from `/books`. Rewrite it around the three books or redirect it to `/books`.
- **Status:** STILL-OPEN-AFTER-PENDING.

### 14. Small inconsistencies (low, S)

- Three spellings of the Substack address are in use: `substack.com/@jamesbell333289` (footer, channels), `jamesbell333289.substack.com/subscribe` (the confirm step), and the feed. All use the same handle, so they should all work; pick the profile link for "read" and the subscribe link for "subscribe" on purpose. The footer hardcodes its link instead of reading `channels.ts`.
- The email appears as `Pastorjbell206@gmail.com` and, on `/privacy`, `pastorjbell206@gmail.com`. Same mailbox; choose one spelling. It is a personal Gmail printed in plain text on five pages, which invites spam; James may prefer an address at his own domain that forwards.
- The footer says "Theology that carries the weight of everyday life." while Home's headline is "Learning to follow Jesus — and live well — in post‑Christian America." and the brand file's tagline is a third sentence. One line under the name everywhere would help a stranger.
- **Status:** STILL-OPEN-AFTER-PENDING.

---

## Every Substack and Facebook link on the live site

| Where it appears | Words shown | Address |
|---|---|---|
| Footer, every page (`Footer.tsx`) | "Substack →" | `https://substack.com/@jamesbell333289` |
| End of every essay (`ChannelLine.tsx`) | "James also writes elsewhere: The newsletter" | `https://substack.com/@jamesbell333289` |
| End of every essay | "Facebook" | `https://www.facebook.com/james.bell.609252` |
| `/about`, "Everywhere James is" | "Facebook → Short pastoral notes, most days." | `https://www.facebook.com/james.bell.609252` |
| `/about`, "Reach James" | "The newsletter →" | `/subscribe` (not Substack directly) |
| After any subscribe form | "Confirm on Substack" | `https://jamesbell333289.substack.com/subscribe?email=…` |
| `/authors/james-bell` (orphan) | "Facebook", "Substack" | `https://facebook.com/james.bell.609252`, `https://substack.com/@jamesbell333289` |
| Hidden data for search engines (`SEOMeta.tsx` `sameAs`) | none | both, plus PCN, ENDS, the podcast |

Not present: Home, header, `/contact`, `/speaking`, `/subscribe` (before submitting), `/books`. The handle and the Facebook address are correct and consistent with what James gave.

---

## Proposed: one Connect page

**Address:** `/connect` (it already exists as a redirect). **Label:** "Connect" in the About menu and the footer. One screen on a phone before scrolling, cream background, no forms above the fold except the one email field.

1. **Head.** "Find James" and one sentence in his words (from About): "The essays and books live here. The pastors' network, ENDS, the podcast, and the daily notes live elsewhere. Same voice, different rooms."
2. **Read him.** Three rows, each a name, one line, one button:
   - **Substack**: "New essays by email." Buttons: "Subscribe" (the email field, handing off to Substack) and "Read on Substack".
   - **Facebook**: "Short pastoral notes, most days." Button: "Follow on Facebook".
   - **Essays on this site**: the newest essay's title and date. Button: "All essays". RSS link beside it.
3. **Write to him.** The email address, "Fenton, Michigan", and the contact form (or a link to `/contact`), with the 988 line kept beside it.
4. **Invite him.** One line on speaking and a button to `/speaking`.
5. **His books.** The three covers in a row, each to its page.
6. **His ministry.** The church (name, town, link when James gives it), the Pastors Connection Network, ENDS, the Following the Way podcast, each with one line and an outbound link.

**Where Substack and Facebook should appear across the site, as links only (nothing imported):**

- **Footer, every page:** replace the lone "Substack →" with a short "Follow James" group: Substack · Facebook · Podcast · RSS, read from `channels.ts`.
- **Home:** one line near the essays: "New essays arrive on Substack. Short notes, most days, on Facebook."
- **`/writing` (Essays):** the same line at the top of the shelf.
- **End of each essay:** keep the existing line but name it plainly: "Read more on Substack · Follow on Facebook · Everywhere James is" pointing to `/connect`; add "Share on Facebook" and "Copy link" to the share row.
- **`/subscribe`:** say "The newsletter is James's Substack" and offer "Read it first" as a direct link.
- **`/about`:** keep "Reach James" and "Everywhere James is", and add Substack by name (today the code filters it out of that list).
- **Header:** no new door. "Subscribe" stays; "Connect" sits in the About menu.

---

## Questions only James can answer

1. One set of facts: his title, how many years at the church, how many books. Or should the site state none of them?
2. Does he read the admin inbox, or should contact messages be emailed to him? Which address should be public?
3. Is "one serious essay a week" true of his Substack? Should the site promise a pace at all?
4. Is there a membership, now or planned? If not, the page comes down.
5. Will he supply the opening of each book to read free, or should the promise be removed? Is there a print edition or an Amazon listing to link?
6. The church's web address, and a click-test of the podcast and ENDS addresses.
7. For Speaking: topics, a short bio, a photograph, and whether coaching, consulting and ghostwriting are still offered.
8. The portrait on the home page: keep it (the #533 decision) or remove it (his 2026-10-28 note)?
9. Is "nearly eighteen thousand pastors" a figure he stands behind for PCN?
10. Does it matter to him that the ebook files can be downloaded without paying?
