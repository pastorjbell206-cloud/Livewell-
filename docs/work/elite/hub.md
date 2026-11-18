# Unit "hub": Find James, one home for all he does

Branch `elite/hub`, pushed to `claude/todo-implementation-hhp4bm`. Built 2026-11-18 (one run cut off by a restart, resumed from its uncommitted edits).

## What changed

- **/connect ("Find James")** is rebuilt in the art kit's look. PageHead with the tree plate. LiveWell is the wide first card (house plate) with "Everything on LiveWell" (/explore) and "New here? Start here" (/start). Then a picture card each for Substack, Facebook, the Following the Way podcast and ENDS (one line, one button that opens it in a new tab, the site's name under it). Then the newest Substack titles. Then cards for Books, Speaking and Contact. At the foot: "This page's address is livewellbyjamesbell.co/connect" with a Copy button that says "Copied" only when the copy worked.
- **One list of his work:** `client/src/lib/works.ts`. Every outside address and label comes from `lib/channels.ts`; a channel that is not live drops out. New card: `components/art/WorkCard.tsx` (a new file; no existing art-kit file was edited). Styles: `components/hub.css`, `pages/connect.css`.
- **Newest from Substack, linked not copied:** `shared/substackLatest.ts` holds the feed address (one named constant), a small RSS parser (title, link, pubDate only), a 4 second timeout, a one-hour cache, and drops any link that is not https on substack.com. Any failure gives `[]`. The procedure `substack.latest` exists in both runtimes (`server/routers.ts` and `api/index.ts`). The component `components/SubstackLatest.tsx` holds its space while loading; when empty or failed it shows one quiet line ("His newest pieces are on Substack.") and the Substack button. No new dependency.
- **/james** is a permanent one-hop redirect to /connect (`vercel.json` plus a `redirectTo` stub in `App.tsx`; held by `site-structure.test.ts`).
- **/about:** under his own words (unchanged), one compact row of the same works (`components/WorksRow.tsx`) and the link "Everything James does, on one page" to /connect. The Reach James note for Find James now names what the page holds.
- **Share cards:** /about, /books and /writing already had their own titles, descriptions and /api/og images. /connect had none in `scripts/prerender-heads.mjs`, so its shared link fell back to the site default; it now has its own. The /connect SEOMeta title is kept as it was. Its description was changed, because the old one named a contact form and an RSS feed the page no longer holds (the form lives on /contact, with the crisis line beside it).

## Gates watched

pnpm check: pass. All 34 commands of the content-gates step: pass. pnpm test: 137 files passed, 7 skipped (1600 tests). ESLint on new and changed page/component files: clean (api/index.ts and server/routers.ts carry only their older warnings). pnpm build: pass. sitemap, prerender (0 failures), audit:canonicals: pass. Lighthouse median on /connect: performance 91, accessibility 100, CLS 0. On /about: performance 91, accessibility 100, CLS 0.

Looked at /connect with the API stubbed to three items and to fail, and /about, at 390x844 and 1440x900, day and night: `/home/user/elite-shots/hub/`.

## Not verified

The Substack feed itself: this machine cannot reach Substack, so the live list has never been seen with real data. On the live site, if the list stays empty, check `SUBSTACK_FEED_URL` first.

## For James

1. The podcast's https address (it is http now, so it stays out of the Follow row; it is linked on /connect and /about as before).
2. Two or three sentences on ENDS in his words. Its card says only "Training pastors in remote regions."
3. The church's web address, if he wants it on Find James. It has no card until then.
4. Confirm the Substack feed address (`https://jamesbell333289.substack.com/feed`).
5. Put livewellbyjamesbell.co/connect (or /james) in his Facebook, Substack and podcast profiles.
