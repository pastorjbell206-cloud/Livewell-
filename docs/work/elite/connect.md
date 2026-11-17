# Unit "connect": the one stop for reaching James

Branch `elite/connect` (local, not pushed), based on `6cc48594`. Audit sources:
AUDIT.md section 4 item 4, all of section 10, roadmap items 10 to 12;
`docs/work/audit-2026-11/hub-connect.md`.

## What changed and why

1. **/connect is a page again: "Find James."** James asked for it on
   2026-11-17, reversing the 2026-10-12 fold into /about. One page with
   Substack (the signup field and "Read on Substack"), Facebook, the three
   newest essays on the shelf with "All essays" and the RSS feed, the contact
   form with the email address and the 988 line beside it, speaking, the three
   book covers, and an "Elsewhere" band (the church by name, ENDS, the
   podcast). The redirect in `vercel.json`, the client stub and the entry in
   the folded-routes test are gone. Route checklist done: `App.tsx`, sitemap,
   `llms.txt`, prerender (the head is extracted from the page's own literal
   `SEOMeta`), the About menu and the footer through `siteNav.ts`.
   The Pastors Connection Network is not on the page (James, 2026-11-17). The
   church has no link because the repo holds no verified web address for it.
2. **One "Follow James" row** (`components/FollowRow.tsx`, read from
   `followLinks()` in `lib/channels.ts`): Substack, Facebook, RSS. It is above
   the bottom bar of the footer on every page, under the signup box on Home,
   at the top of the essay shelf ("Also on"), at the top of /contact, and on
   /connect. The podcast joins the row only with an https address; James gave
   it as http, so it stays out of the row (it is still listed on /connect and
   About, as before).
3. **"Substack" by name.** The channel label, About's "Reach James" and hero
   link, the footer nav label, every signup title and the /subscribe page say
   Substack. About's "Everywhere James is" now includes Substack.
4. **Subscribe in the phone header**, beside the menu button. To make room at
   390px the "by James Bell" byline hides at 480px and below, in the header
   and in the static first-paint shell alike (`.lw-byline`), so nothing shifts
   when React mounts. The header height is unchanged.
5. **Essay ending.** The share row gains "Share on Facebook" (Facebook's plain
   sharer address, no script) and "Copy link" (`lib/clipboard.ts`, "Copied"
   only when true). After the essay there is now one next essay and one
   Substack box, then "All essays". The book card, the tool card, the list of
   four essays, the author card and the channel line are gone from the ending
   (AUDIT decision 14, taken as recommended). `ChannelLine.tsx` is deleted;
   `KeepReadingBook`, `ArticleNextSteps`, `AuthorBio` and the `RelatedEssays`
   list stay in the repo, unused by the essay page.
6. **Subscribing says what is true.** No form promises "one essay a week" or a
   first essay matched to the reader; nothing in the stack sends one, and the
   pace is James's to state (decision 10). Every signup says the email is
   saved here and the sign-up finishes on Substack, and ends in "Confirm on
   Substack": `NewsletterSignup`, `SegmentedSignup`, `LandingSignup` (through
   the new `ConfirmOnSubstack`), `SampleChapterForm`, `EbookThankYou`, the
   book pages, Test the Case, Home, the essay shelf, /subscribe. /subscribe
   says "The newsletter is James's Substack" and offers "Read on Substack
   first".
7. **Contact.** There is no mail sender in either runtime (only the optional
   newsletter webhook and Mailchimp upsert), so none was added. The wording is
   now true: "A message sent here is saved for James to read", and the success
   state reads "Your message is saved". The form shows that state only when
   the handler answers `{ ok: true }`; a bare 200 (a static host or the dev
   server answering with the app's HTML) now shows the error with the email
   address. The dev runtime still has no `/api/contact` route; with the guard
   it fails honestly there.
8. **Share cards.** About, Books and Essays each get their own card title
   (`/api/og?title=...`) in the prerendered head and in the page's `SEOMeta`.
   About's description no longer states a title, years or a book count;
   Books' description no longer promises "Read the opening of each free".
9. **RSS.** `/rss.xml` (production only; there is no dev route) now lists
   every essay file in `client/public/essays` that is on the shelf, from the
   committed index (`essayOverrides.generated.ts`), with the file's title,
   excerpt and date. A database row is never sent for an essay a file
   replaces. A database failure now leaves a feed of the essay files instead
   of a 500. File items carry the excerpt and the link, not the full text
   (the bodies are Markdown and are not bundled into the function). The feed
   was already linked in the page head; it is now in the footer row, on
   /connect and in `llms.txt`.

## Files

New: `client/src/pages/Connect.tsx` (rewritten), `client/src/components/FollowRow.tsx`,
`CrisisNote.tsx`, `ConfirmOnSubstack.tsx`, `EssayShare.tsx`,
`client/src/lib/newestEssays.ts`, `server/rss-feed.test.ts`.
Deleted: `client/src/components/ChannelLine.tsx`.
Edited: `api/index.ts` (the feed only), `client/src/lib/channels.ts`,
`client/src/lib/siteNav.ts`, `client/src/App.tsx`, `vercel.json`,
`scripts/generate-sitemap.mjs`, `scripts/prerender-heads.mjs`,
`client/public/llms.txt`, `client/index.html`, `client/src/index.css`,
`Footer.tsx`, `MinimalNav.tsx`, `ContactForm.tsx`, `NewsletterSignup.tsx`,
`SegmentedSignup.tsx`, `LandingSignup.tsx`, `SampleChapterForm.tsx`,
`EbookThankYou.tsx`, `BookNextSteps.tsx`, `RelatedEssays.tsx`, pages `About`,
`ArticleDetail`, `BookDetail`, `Books`, `Contact`, `EmailSignup`, `Home`,
`Speaking`, `Writing`, `tools/TestTheCase`, and four test files.

Shared files touched, each a small local edit: `App.tsx` (one lazy import, one
route, one unused stub removed), `siteNav.ts` (two rows in About), `index.css`
(one rule after `.lw-shell-bar`), `prerender-heads.mjs` (three entries in
`STATIC_PAGES`), `vercel.json` (one redirect removed), `llms.txt` (two lines),
`client/index.html` (one class on the byline span).

## What ran and passed

- `pnpm check`: passed.
- The whole content-gates step of `ci.yml` (all 33 commands) plus
  `build-essays-index.mjs --check`: all passed.
- `pnpm test`: 114 files passed, 7 skipped; 1314 tests passed, 73 skipped.
  Includes the route smoke test, the new feed test, and a new test that a 200
  the handler did not confirm never shows "saved".
- `pnpm build`, `pnpm sitemap`, `pnpm prerender`, `pnpm audit:canonicals`:
  2274 pages checked, 0 failures. `/connect` prerenders with its own title,
  description and card. `dist/` deleted afterwards.
- ESLint on the new files and the edited components: no errors or warnings.
  (`pnpm lint` over the whole repo reports 282 warnings that predate this
  branch, in files such as `api/index.ts` and `TestTheCase.tsx`.)
- Looked at in Chromium at 390x844 and 1440x900 on the vite dev server with
  the API stubbed: /connect, /contact, /subscribe, Home, /writing, /about and
  an essay ending; /connect, /contact and the essay ending in dark mode.
  Screenshots in `/home/user/elite-shots/connect/`. Fixed from the look: the
  phone header overflowed with Subscribe added (byline now hides at 480px);
  the footer signup title was invisible in dark mode (it used a token that
  flips; now `--charcoal-fg`).

## Not verified

- Nothing was sent to a real server: no contact message, no Substack
  confirmation, no live `/rss.xml`. The feed is tested through the handler
  with no database.
- `api/index.ts` now imports a generated TypeScript file from `client/src`
  (`essayOverrides.generated`). It typechecks and runs under vitest; the
  Vercel function build was not run here. `shelf.json` is already imported
  from the same folder, but that is JSON.
- The share-card image endpoint (`/api/og`) was not rendered.
- Outbound links (Substack, Facebook, ENDS, the podcast, Facebook's sharer)
  were not opened; the sandbox cannot reach them.
- Dark mode was looked at on /connect, /contact and the essay ending only.

## Left alone on purpose

- The Pastors Connection Network rows in `siteNav.ts`, About's "Everywhere
  James is", `SAME_AS` in `channels.ts` and the prerender schemas. Removing
  them belongs to the unit that takes PCN off the site; this unit added no
  new PCN link.
- `PastorSignup.tsx` (a PCN funnel on a page with no route) still says
  "You're on the list". No visitor can reach it; it should go with the PCN
  cleanup.
- The facts on About (title, years, book count) apart from the two meta
  descriptions.
- `FollowJames.tsx` (used by the unrouted Explore page) and the now-unused
  essay-ending components.

## Waiting for James

1. Contact messages are saved to the admin inbox and not emailed. Does he
   read that inbox, or should a mail service be set up so each message also
   lands in his email? (Needs a provider key in Vercel; none exists today.)
2. Is there a pace he wants stated for the Substack ("one essay a week")? The
   site now promises none.
3. The church's web address, so /connect and About can link it.
4. The podcast's https address, so it can join the Follow James row; and one
   click on the ENDS address to confirm it.
5. "Short pastoral notes, most days" is how the site describes his Facebook.
   Is that still true?
6. The essay ending no longer shows a book. Does he want the matching book
   back as a single line under the next essay?
7. Showing Facebook or Substack posts on the site itself still needs him to
   supply them or approve an embed; this unit links only.

## Decision Log lines to add (CLAUDE.md)

- **/connect is a live page again (James, 2026-11-17)**, "Find James", in the
  About menu and the footer. It is no longer a folded route; remove it from
  the list of folded hubs. Facebook and Substack are linked, never imported or
  embedded.
- **One list of outside channels**: `client/src/lib/channels.ts`. The "Follow
  James" row (`components/FollowRow.tsx`) is the only place the row is built;
  a channel joins it only with a verified https address.
- **The newsletter is called Substack by name everywhere**, and no page
  promises a pace or a matched first essay. Every signup ends in "Confirm on
  Substack".
- **The contact form says "saved for James to read"** until a mail sender
  exists, and shows its saved state only on `{ ok: true }` from the handler.
- **An essay ends with one next essay and one Substack box** (AUDIT decision
  14), after a share row that names Facebook.
- **The RSS feed lists the essay files** from `essayOverrides.generated.ts`;
  a database row is never syndicated for an essay a file replaces.
- Strategic Reminders says "Contact forms send to" his Gmail address. The code
  saves to `contact_messages` and sends nothing; correct that line.
