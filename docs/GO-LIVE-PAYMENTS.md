# Go-Live: Payments & Book Catalog

> The owner's runbook for switching Stripe checkout and the DB-backed book
> catalog from "built" to "live." All the code is deployed and verified; every
> step below is owner-gated (live credentials, admin login, Stripe dashboard).
> If Stripe is *not* configured, nothing breaks — buy buttons quietly fall back
> to the email-request flow.

## The steps, in order

1. **Add the Stripe secret key in Vercel.**
   Vercel → the livewell project → Settings → Environment Variables →
   `STRIPE_SECRET_KEY` = your secret key. Redeploy so the function picks it up.

2. **Log in as admin** on livewellbyjamesbell.co (the admin password).

3. **Create the book prices.** While logged in, visit:

   `https://livewellbyjamesbell.co/api/admin/create-stripe-prices`

   For each ebook in the catalog this finds-or-creates a Stripe product
   (matched by `metadata.slug`, so re-runs reuse rather than duplicate) and a
   $9.99 one-time USD price, storing the price id in `site_settings` under
   `stripe_price_<slug>`. Idempotent — safe to run twice. The JSON response
   reports `created` / `reused` / `envConfigured` counts. Books that already
   have a `STRIPE_PRICE_<SLUG>` env var are left untouched (env always wins).

4. **Seed the catalog.** Visit:

   `https://livewellbyjamesbell.co/api/admin/seed-ebooks`

   Inserts the ebook catalog into the database so the books surface in the
   DB-backed listings. Also idempotent.

5. **Add the Stripe webhook.** In the Stripe dashboard → Developers →
   Webhooks → Add endpoint:

   - URL: `https://livewellbyjamesbell.co/api/stripe/webhook`
   - Event: `checkout.session.completed`

   The handler re-retrieves the session from Stripe's API before recording
   the purchase, so a forged request records nothing — no signing-secret
   configuration is required for correctness (the round-trip is the
   authenticity check).

6. **Test in test mode before trusting it.** Repeat steps 1–5 against a
   Stripe **test** key first (card `4242 4242 4242 4242`), buy a book on the
   live site, confirm the thank-you page unlocks the download and the
   purchase appears in `/api/admin/metrics` — then swap in the live key and
   re-run step 3 (test-mode price ids will not exist in live mode; the
   endpoint recreates them).

7. **Membership (optional).** Create a recurring **monthly** price in Stripe
   ($9/mo per the page copy) and paste its id into **Admin → Site Settings →
   `stripeMembershipPriceId`**. With the secret key present, the membership
   page flips from waitlist to live checkout on its own — no redeploy.

   **To also offer the annual plan** (the page advertises "$89/year"): create a
   second recurring **yearly** price in Stripe and paste its id into
   **`stripeMembershipPriceIdAnnual`**. That, and only that, makes the
   Monthly/Annual toggle appear (`stripe.membershipEnabled` returns
   `annual: true`); leave it blank to sell monthly only. ⚠️ The annual checkout
   path could not be exercised against live Stripe from the build environment —
   do one real annual test purchase (test-mode card, step 6) before trusting
   it. The price *amounts* live in Stripe; the page's "$9 / $89" copy is
   display only, so keep the two in sync.

## How the pieces fit (for future reference)

- **Price resolution** (`resolveEbookPriceId` in `api/index.ts`): an explicit
  `STRIPE_PRICE_<SLUG>` env var wins; otherwise the `site_settings` row
  written by step 3 is used.
- **Checkout** is config-driven: with no key or no price, the buy button
  degrades to the email-request flow (503 path) instead of erroring.
- **Purchases** are recorded twice-over: by the webhook (step 5) and by the
  thank-you page's verification round-trip — either alone is sufficient.
- **Metrics**: `/api/admin/metrics` (admin-only) shows purchases, signups,
  and catalog state at a glance; it also backs the admin dashboard's
  "Business at a glance" section.
- All four admin endpoints require an authenticated admin (session cookie or
  bearer key). Visiting them logged-out returns 401.
