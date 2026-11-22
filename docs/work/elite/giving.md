# Support this work: the giving page, built and held

Built 2026-11-21. The page is whole and its checkout works in both runtimes,
but it is **held**: reachable only by its address, until James turns one
switch.

## What James said

- 2026-11-21, asked how the site could pay for itself without charging:
  "let's do the Bible Project way." Everything stays free; readers who want to
  help can give.
- 2026-11-21, asked what gifts are for: "gifts go to keep the work going."
- 2026-11-21, asked who receives them: "gifts go to me personally."

So the page says, as its real text: gifts go to James Bell personally, to keep
the work of LiveWell going, and a gift is not tax-deductible. It also says, in
both states, "Nothing on this page is tax or financial advice."

What is still outstanding is only the payment account: the production Stripe
key could not be confirmed from the build machine, so the page stays held
until it is set.

## What was built

| Part | Where |
|------|-------|
| The page, `/support` ("Support this work") | `client/src/pages/Support.tsx`, `client/src/pages/support/support.css` |
| The return page, `/support/thanks` (always noindex) | `client/src/pages/SupportThanks.tsx` |
| The cancelled state | `/support?cancelled=1`, a line at the top of the give card |
| The facts and the one switch | `client/src/lib/giving.json`, read through `client/src/lib/giving.ts` |
| The amounts, the one check, the Stripe request | `shared/giving.ts` (used by the page and both runtimes) |
| The procedures, dev runtime | `giving.status`, `giving.createCheckout` in `server/giving-router.ts` (+ `createGiftCheckoutSession` in `server/stripe-service.ts`) |
| The procedures, production | the `giving.status` and `giving.createCheckout` cases in `api/index.ts` |
| The build's side of the switch | `scripts/lib/giving.mjs`, used by `generate-sitemap.mjs`, `build-search-index.mjs`, `prerender-heads.mjs` |

**A gift.** Whole US dollars. One time: $10, $25, $50, $100, or another amount
from $1 to $5,000. Each month: $5, $10, $25 or $50. The price is sent to
Stripe inline (`price_data`), so no product or price has to be made in the
Stripe dashboard. The giver enters the card, name and email on Stripe's own
hosted page; afterwards Stripe sends them to `/support/thanks`, or to
`/support?cancelled=1` if they back out.

**What the server checks.** Both runtimes run the same `checkGift`
(`shared/giving.ts`): the frequency is `once` or `monthly`, the amount is a
whole number within the limits, and a monthly amount is one of the four
listed. The dev router also declares the shape in zod, as the repo does. The
address Stripe returns the giver to is worked out by the server from the
request and is never taken from the page's input.

**Two gates before any gift can start.** The switch (`open` in
`giving.json`) and a real `STRIPE_SECRET_KEY`. With either off,
`giving.status` answers `{ open: false }` and `giving.createCheckout` refuses
with "Giving isn't open yet." The page then shows that sentence in place of
the controls, with no button.

**What is kept.** Nothing. No gift, amount, name or email is written to the
database or to the logs; Stripe holds the record. The existing webhook
(`/api/stripe/webhook`) ignores a gift: it records only ebook and membership
sessions, and a gift's session is marked `kind: gift`.

**Parity.** `giving.status` and `giving.createCheckout` exist in both
runtimes, `giving.createCheckout` is in production's `MUTATION_PROCS` (POST
only), `server/api-parity.test.ts` is green and `KNOWN_PROD_GAPS` is still
empty.

## Held, and what "held" means

While `open` is `false`:

- a note at the top of the page reads "Not yet open: giving opens when the
  payment account is connected.";
- the amount controls can be tried, the give button is disabled, and the page
  never calls the server;
- both runtimes refuse to start a gift, even if a Stripe key is present;
- the page says `noindex` (in the browser and in its prerendered file);
- it is in no menu, not in the footer, not on /explore or /about, not in the
  sitemap, the search index or llms.txt.

## How to open it

1. **Set the Stripe key in Vercel.** Project, then Settings, then Environment
   Variables: `STRIPE_SECRET_KEY`, for the Production environment (the live
   secret key from the Stripe dashboard, Developers, API keys). For preview
   deployments, set the same name to a Stripe test key in the Preview
   environment. Redeploy so the function reads it. This is the only variable
   gifts need: no price ids, no publishable key, and no webhook secret (the
   code reads none).
2. **Turn the one switch.** In `client/src/lib/giving.json` change
   `"open": false` to `"open": true`.
3. **Rebuild the search index**, which is a committed file:
   `pnpm run search:index`. Commit it with the switch. CI fails by name
   (the search-index drift check and `giving.test.tsx`) if this is skipped.

That is all. With the switch on, and nothing else edited:

- the note disappears and the button works;
- `noindex` is gone from the page and from its prerendered head;
- "Support this work" becomes the About door's sixth room, after Subscribe
  (About has five, so six or fewer still holds), which puts it in the header's
  About panel, the phone menu, the footer beside Subscribe, /explore and the
  list on /about;
- the sitemap lists `/support`; the search index holds it; the build adds one
  line for it to the served `llms.txt`, after the newsletter (the committed
  `client/public/llms.txt` is never edited by hand for this).

To check before the public sees it: set the key and the switch on a preview
deployment with a Stripe **test** key, and give with Stripe's test card.

To close it again, set `open` back to `false` and rerun
`pnpm run search:index`.

## Is a webhook needed?

No. A gift needs no webhook: nothing on this site changes when a gift is
made. If the existing endpoint is registered in Stripe for the old ebook
flow, a gift passing through it is ignored.

## The wording

The two lines are in `client/src/lib/giving.json`.

**In use (James, 2026-11-21, "gifts go to me personally"):**

- `recipientLine`: "Gifts go to James Bell personally, to keep the work of LiveWell going."
- `taxLine`: "A gift is not tax-deductible."

**If the recipient ever becomes a church or a nonprofit**, James supplies its
name and the lines become:

- `recipientLine`: "Gifts go to [ORGANIZATION NAME], for the work of LiveWell."
- `taxLine`: "Gifts to [ORGANIZATION NAME] may be tax-deductible in the United States. Whether yours is depends on your own taxes."

A test refuses an empty line or one with a bracket left in it.

Always on the page, in both states: "Nothing on this page is tax or financial
advice."

## How a supporter stops a monthly gift

The page and the thank-you page say: "To stop or change a monthly gift, write
through the Contact page." There is no account area on LiveWell, so the
message reaches James (it is saved to `contact_messages`; nothing is emailed),
and he cancels it in the Stripe dashboard: Customers, find the person by
email, open the subscription, Cancel.

Stripe also has a hosted customer portal where a giver signs in with their
email and cancels on their own. It needs to be switched on in the Stripe
dashboard (Settings, Billing, Customer portal, the login link), which is new
configuration, so the page does not depend on it. If James turns it on, its
link can be added to the page as one sentence.

## What is not built, and why

- **Receipts of our own.** There is no mail sender on the site. Stripe can
  email a receipt for each payment once "Successful payments" is on under
  Settings, Customer emails, in the Stripe dashboard. The page does not
  promise a receipt, because that setting is not ours to see from here.
- **A donor area.** It would need accounts, sign-in and stored gift records:
  an auth change and a schema change, both ruled out, for something Stripe
  already does.
- **A goal meter or a count of supporters.** It would need gift data stored
  or read live from Stripe, and it works by pressure. The page states only
  what can be checked on the site.
- **A record of gifts in the admin.** Stripe's dashboard is the record.
- **Signature checking on a webhook.** No webhook is used for gifts.

## Tests

- `server/giving.test.ts`: the check (least, most, whole dollars, monthly
  amounts), the Stripe request (payment and subscription), and both runtimes
  with a stand-in for Stripe: refuses with no key, starts a gift with one,
  refuses bad amounts before Stripe is asked, never logs the gift.
- `server/giving-held.test.ts`: with the switch off, both runtimes refuse
  even with a key.
- `client/src/pages/Support.test.tsx`: the page in both states, the amount
  controls by keyboard, the redirect to Stripe, the not-open and failed
  states, the cancelled line, the thank-you page, the words (no forbidden
  language, no em-dash, no exclamation), and no secret in any file the
  browser loads.
- `client/src/lib/giving.test.tsx` and `giving-open.test.tsx`: held, the page
  is unlinked and out of the sitemap, search and llms.txt; open, the reverse.
- `server/api-parity.test.ts` and the route smoke test cover both new routes
  and procedures as they stand.

No real payment was made in building this. Stripe was a stand-in in every
test.

## Questions for James

1. Are the amounts right ($10, $25, $50, $100 once; $5, $10, $25, $50 a
   month; $1 to $5,000 for another amount)?
2. Is "write through the Contact page" the way you want people to stop a
   monthly gift, and will you watch for those messages? Or should the Stripe
   customer portal be turned on and linked?
3. Should Stripe email receipts ("Successful payments" in the Stripe
   dashboard)?
4. Which Stripe account will the key come from? Money given lands in that
   account, so it should be the one that pays out to you personally.
5. Gifts received personally may count as income. That is a question for
   whoever does your taxes, not something this page or these notes can
   answer.
6. "Pray for the people who read here, and for James as he writes" is on the
   page in the site's voice, not yours. Change it if you would say it
   differently.
