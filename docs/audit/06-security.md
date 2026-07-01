# 06 — Security & Privacy

> Site-elevation audit, step 1.6. Read-only review of dependency, header,
> secrets, API-surface, input-handling, and privacy posture. Line numbers
> verified on the working tree (branch `site-elevation`, 2026-07-01). No code
> changed. Companion inputs: `00-architecture-map.md` §8, and the pre-existing
> `docs/audit/SECURITY.md` + `REPORT.md` (dated 2026-04-30 in the report body,
> "June 8" per the map's summary — either way, stale).

---

## 0. Verdict up front

The site is in **decent shape for its threat model** — a content platform for a
trusted pastoral audience, subscriber emails, and $9.99 one-off ebook sales.
The bones the earlier audit built are real: parameterized SQL throughout, a
CORS allow-list, bcrypt + HMAC-signed HttpOnly session cookies, no secrets in
the client bundle, admin procedures gated. There is **no Critical, actively
exploitable finding** on the production request path.

The single most urgent fix is operational, not code: **confirm `SEED_KEY` (or at
minimum `JWT_SECRET`) is set in Vercel production**, because the empty-string
fallback at `api/index.ts:89` is a latent full-admin-bypass if both are ever
unset. Everything else is hardening.

**Severity counts:** Critical 0 · High 3 · Medium 6 · Low 7.

---

## 1. Dependency vulnerabilities

**`pnpm audit` ran successfully** (no proxy failure). Two numbers, because the
distinction matters here:

- `pnpm audit --prod` → **60 vulnerabilities: 18 high, 37 moderate, 5 low.**
- `pnpm audit` (incl. dev) → **128 vulnerabilities: 1 critical, 47 high, 70 moderate, 10 low.**

### Where the noise comes from

The overwhelming majority of the *production* count is transitive, concentrated
in two dependency subtrees the site barely uses:

| Root dep | Subtree | Advisories | Real exposure on this site |
|---|---|---|---|
| `streamdown@1.4.0` | → `mermaid` → `dompurify@3.3.0` (13 DOMPurify advisories, all moderate/low), → `@mermaid-js/parser` → … → `lodash-es` (high, `_.template` code injection) | ~30 | **Low.** streamdown renders trusted, admin-authored markdown (`ArticleDetail.tsx:14,688`). DOMPurify mXSS matters only if the markdown source is attacker-controlled; it is not. Mermaid/lodash-es are never reached at runtime — the grammars ship as dead chunks (map §5). |
| `@aws-sdk/client-s3` + `s3-request-presigner` | → `fast-xml-parser@5.4.1` (high ×2), `axios` | ~15 | **None.** Both AWS packages are **unused — zero imports** (map §5). This is dead weight generating scary numbers. |
| `axios@1.12.2` | direct dep + AWS subtree; ~10 advisories (SSRF/no_proxy, CRLF, prototype-pollution) | ~10 | **Low.** Used only server-side by `server/mailchimp.ts:8` against a fixed Mailchimp base URL — no attacker-controlled URLs, so SSRF/no_proxy vectors don't apply. |
| `express@4.21.2` | → `path-to-regexp@0.1.12` (high, ReDoS) | 1 | **None in prod.** Express is the **dev** runtime only; production is `api/index.ts` on Vercel. The 47-high dev count is dominated by dev-only tooling. |
| `drizzle-orm@0.44.7` | direct (high, SQL injection via unescaped identifiers) | 1 | **Low.** Advisory is about dynamic identifier interpolation; this codebase parameterizes values and does not build column/table names from user input (spot-checked §5). Bump when convenient. |
| `vitest@2.1.9` | dev only (**critical** — arbitrary file read/exec when Vitest UI server listens) | 1 | **None in prod.** Dev-only, and the UI server is not exposed. Still worth bumping to ≥3.2.6. |

**Verdict:** the raw counts (60/128) badly overstate real risk *because* of the
unused/dead subtrees. The honest production exposure is **Low-to-Medium**, and
the fastest way to shrink the number dramatically is **remove the 3 unused
packages** (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`, and audit
whether `axios` can be replaced by `fetch` in `mailchimp.ts`) — that alone
deletes the entire fast-xml-parser high-severity subtree and most of the axios
advisories. Then bump `drizzle-orm` and `vitest`.

### Dual-lockfile / supply-chain reproducibility (real, Medium)

Both `package-lock.json` **and** `pnpm-lock.yaml` are tracked (`git ls-files`;
map §1, §5). Vercel's `installCommand` is `pnpm install --no-frozen-lockfile`
(`vercel.json:4`), so **pnpm-lock.yaml is the one that governs the build** and
`package-lock.json` is inert drift — a trap for any contributor who runs `npm
install` and silently resolves a *different* dependency graph than production.

`--no-frozen-lockfile` is the sharper issue: it tells pnpm it may **mutate the
lockfile during install** to satisfy `package.json` rather than failing when
they disagree. That defeats the whole point of a committed lockfile —
production can resolve versions that were never reviewed or committed, so a
transitive dependency can shift under you between two deploys of the same
commit. For a site taking payments this is a genuine supply-chain reproducibility
gap. **Delete `package-lock.json`, and switch the Vercel install to a frozen
lockfile** (`pnpm install --frozen-lockfile`) so a deploy of commit X always
resolves the exact tree committed at X.

---

## 2. Security headers (`vercel.json:8–20`)

Applied to `/(.*)` — every response:

| Header | Value | Assessment |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | Good. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Good. |
| `X-Frame-Options` | `SAMEORIGIN` | Good (CSP `frame-ancestors 'self'` also present). |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` | Fine. Note `payment=()` disables the Payment Request API — Stripe Checkout redirects rather than using it, so no conflict, but worth remembering if you ever add in-page Payment Request buttons. |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Good, preload-eligible. |
| `Content-Security-Policy-Report-Only` | see below | **Report-Only — not enforced.** |

### The CSP is not enforcing anything (Medium)

The policy is delivered as **`Content-Security-Policy-Report-Only`**
(`vercel.json:17`). A Report-Only header **blocks nothing** — the browser
evaluates it and would *report* violations, except **there is no `report-uri` /
`report-to` directive**, so the reports go nowhere. Net effect: the CSP is
decorative. There is **no enforced CSP on the site at all**.

The policy itself is reasonable for this app (`script-src 'self' 'unsafe-inline'
https://js.stripe.com`; `frame-src` for Stripe + YouTube; `style-src` +
`font-src` for Google Fonts). Two caveats before flipping it to enforcing:

1. `script-src 'unsafe-inline'` is required today because `SEOMeta.tsx:104`
   injects JSON-LD via `dangerouslySetInnerHTML` as an inline `<script
   type="application/ld+json">`, and the inline styles are everywhere. It
   weakens the CSP's XSS value but is not itself a hole given no user-generated
   HTML reaches the page (see §5). A nonce-based approach would be the elite
   version but is a larger change.
2. `img-src 'self' data: https:` and `connect-src 'self' https:` are broad
   (`https:` allows any host) — acceptable to start, tightenable later.

**Fix:** rename the header to `Content-Security-Policy` to actually enforce it
(the policy already matches what the site loads), and — if you want the
telemetry — stand up a `report-to` endpoint. This is low-effort and closes the
biggest "looks secured, isn't" gap in the header block.

### Missing / notable

- **No `cache-control` on `/api/*`.** Most handlers don't set it, so Vercel/CDN
  defaults apply. Auth responses (`/api/auth/me`) and admin data are returned
  without an explicit `Cache-Control: private, no-store`, relying on the absence
  of caching rather than asserting it. `/api/download` **does** correctly set
  `private, no-store` (`api/index.ts:2630`). Add an explicit no-store to the
  authed JSON responses as defense-in-depth. (Low)
- **COOP/COEP/CORP:** absent. Not needed here — no `SharedArrayBuffer`, no
  cross-origin isolation requirement. Fine to skip. (Informational)
- **X-XSS-Protection:** absent — correct; the header is obsolete and can
  introduce bugs. (Informational)

---

## 3. Secrets exposure

**Client bundle is clean.** Grep of `client/src` and `dist/public/assets` for
`sk_live|sk_test|whsec_|AKIA…|api[_-]?key` returns **no real secret**. The only
`AKIA…` hits are inside `dist/public/assets/wasm-CG6Dc4jp.js` — these are
**false positives**: random base64 substrings in a WebAssembly blob (part of the
streamdown/shiki payload), not AWS keys. (Informational)

**VITE_ (build-time inlined) vars are safe.** Only two are referenced in client
code (`grep import.meta.env`): `VITE_APP_ID` and `VITE_OAUTH_PORTAL_URL`
(`client/src/const.ts:7–8`), plus `import.meta.env.DEV` in `ErrorBoundary.tsx`.
Both are non-sensitive by design (an OAuth portal URL and app id). `.env.example`
documents the same two as the only client vars. Good.

**Server-only secrets never reach the client.** `JWT_SECRET`,
`ADMIN_PASSWORD_HASH`, `STRIPE_SECRET_KEY`, `STRIPE_PRICE_*`, `MAILCHIMP_API_KEY`,
`DATABASE_URL` are read only via `process.env` inside `api/index.ts` /
`server/*`, never via `import.meta.env`, so they are not inlined into the bundle.
Confirmed. Good.

### `admin-article-bodies.json` (4.3 MB) ships publicly — real, but Low-severity

`client/public/admin-article-bodies.json` (4,414,125 bytes) is copied verbatim
into `dist/public/` and served at the site root — anyone can `GET
/admin-article-bodies.json`. Contents inspected:

- **421 entries**, each `{ slug, body, readingTimeMinutes }`. No `published`
  flag, no `status`, no author email, no PII, no admin-only fields — it is
  purely article prose keyed by slug.
- It is the payload the admin publish flow fetches (`AdminPublishContent.tsx:31`
  → `fetch("/admin-article-bodies.json")`) and dribbles into the DB via
  `posts.publishFullBodies`.

**The data-exposure question, answered honestly:** this is **essay content, not
admin secrets** — the "admin-" prefix is a misnomer. But two real problems:
1. **247 of the 421 bodies still contain `[cite …]` placeholders** — unverified
   citation stubs. The publish endpoint deliberately *blocks* these from going
   into the DB (`api/index.ts:1343–1345`, the never-fabricate guard), yet the
   raw file with the placeholders is **publicly downloadable**, bypassing that
   guard. A scraper (or an answer engine) could ingest 247 essays' worth of
   draft-quality, unverified-citation prose that the platform specifically
   decided was not fit to publish. That is a brand/editorial-integrity leak more
   than a security one, but it is real given this platform's own scholarship
   standard.
2. It's a 4.3 MB public payload with no caching benefit to real users (only the
   admin ever needs it). It's a performance liability (map item #2) and an
   information-leak of pre-publication content in one file.

**Fix (Low security / Medium editorial):** move this file out of `client/public`
and serve it only through an authenticated admin endpoint (or generate it into a
non-public build location the publish page reads via the API). Do not leave
draft content with unresolved citation stubs at a public URL.

---

## 4. API attack surface (`api/index.ts`)

### 4a. The one-shot admin/seed endpoints and the empty-string fallback (HIGH — latent)

Two distinct auth gates exist:

- **`authed(req)`** (`api/index.ts:84–92`) — reads the `x-seed-key` **header**
  (good: never in URL/logs), compares it constant-time against
  `SEED_KEY || JWT_SECRET || ""`.
- **`authedSession(req)`** (`:2032`) — the admin session cookie (bcrypt login →
  HMAC).

The seed/admin endpoints split into two tiers:

| Endpoint | Gate | Notes |
|---|---|---|
| `/api/admin/seed` (`:291`), `/api/admin/seed-articles` (`:305`), `db-inventory` (`:172`), `organize-articles`, `fix-apostrophes` (via `authed`… some also accept session) | `authed()` only, or `authed() || authedSession()` | Header-key gated. |
| `seedArticleSet`, `seed-content`, `seed-post-christian`, notifications delete, all tRPC writes | `authed() || authedSession()` | Either key **or** a logged-in admin session. |

**The line 89 fallback, read carefully.** `expected = SEED_KEY || JWT_SECRET ||
""`. If **both** `SEED_KEY` and `JWT_SECRET` are unset, `expected === ""`. Then
`authed()` does: `key = header || ""`; **`if (!key) return false`** (`:87`) — an
empty/absent header is rejected first. And `constantTimeEqual("", "")` would
return `true` (equal-length zero buffers, `timingSafeEqual` on two empty buffers
is true) — but you can only reach it with a **non-empty** header key, which can
never equal `""`. So **`authed()` fails closed** for the seed endpoints even in
the both-unset case. Good — the `!key` guard saves it.

**But `JWT_SECRET` unset breaks the session path differently, and worse.**
`signSession`/`verifySession` call `getJwtSecret()` which **throws** if
`JWT_SECRET` is missing (`:1995–1998`), and login also hard-requires
`ADMIN_PASSWORD_HASH` (`:2044–2047`, returns 500). So with `JWT_SECRET` unset,
admin login and every session-gated write fail 500 — a denial of function, not a
bypass. The genuinely dangerous state is a **misconfiguration where `SEED_KEY`
is unset but `JWT_SECRET` is set** (the documented default): then the seed key
*equals the session-signing secret*. Anyone who learns `JWT_SECRET` can both
forge sessions **and** hit every seed/DB-inventory endpoint. `db-inventory`
(`:171`) returns table schemas and a redacted sample row from `posts`/`articles`
— reconnaissance value.

**Fix (High, low effort):** set a dedicated `SEED_KEY` in Vercel (distinct from
`JWT_SECRET`), as the earlier `SECURITY.md` already flagged and deferred
("Introduce separate ADMIN_SEED_SECRET"). This is **still open** and is the top
action item. The `|| ""` fallback should be replaced by a hard fail:
`const expected = process.env.SEED_KEY; if (!expected) return false;` — remove
the `JWT_SECRET` reuse entirely.

### 4b. Rate limiting — none (HIGH for login, Medium elsewhere)

`grep` for `rateLimit`/`rate-limit` across `server/` and `api/` returns **zero**
matches. There is **no rate limiting anywhere**, including:

- **`/api/auth/login`** (`:2036`) — bcrypt compare against a single admin
  password, unlimited attempts. bcrypt's work factor slows each guess, but with
  no lockout/backoff an attacker can grind offline-style online. For a
  single-admin site the practical risk is bounded by password strength, but this
  is the highest-value endpoint and deserves a limiter. **Still open** (deferred
  in `SECURITY.md`).
- **`/api/subscribe`** (`:719`), **`/api/pcn/signup`** (`:738`),
  **`/api/contact`** (`:2351`) — unauthenticated writes to the DB. No captcha, no
  rate limit. An attacker can flood `subscribers` / `pcn_signups` /
  `contact_messages` with junk (email is validated by regex but not verified, so
  addresses can be forged). Low direct security impact; real spam/DoS-of-inbox
  nuisance. **Still open.**

**Fix:** add `@upstash/ratelimit` (or Vercel's built-in) on login (strict) and
on the three public write endpoints (looser). Medium effort (needs an env-backed
store).

### 4c. CORS allow-list (`getAllowedOrigin`, `:94–105`) — correct

Explicit allow-list of the two production origins, localhost added only when
`NODE_ENV === "development"`, and it **does not fall back to the prod origin for
unknown origins** (returns `""`, and `Allow-Origin`/credentials are then omitted,
`:114–118`). `Vary: Origin` set. This is the fix the earlier audit landed and it
holds. Good.

### 4d. Stripe webhook signature verification — no webhook is wired (Medium, by omission)

`server/stripe-service.ts:160–168` implements correct signature verification
(`stripe.webhooks.constructEvent(body, signature, secret)` with
`STRIPE_WEBHOOK_SECRET`). **But that function is never invoked**: grep for
`constructEvent`/`handleWebhook` outside `stripe-service.ts` returns nothing, and
**`api/index.ts` has no `/api/webhook` route** (handler dispatch `:2645–2687`).
So in production there is **no Stripe webhook endpoint at all**. Consequence:
purchase fulfillment does not depend on webhooks (see 4e — it verifies the
session synchronously), which is actually *safer* (no unverified webhook to
spoof). The dead verification code in `server/` is a parity/clarity wart, not a
hole. If you ever add a webhook, the verification helper is ready — use it.

### 4e. `/api/checkout` + `/api/download` — can you get a book without paying? (No — Low residual)

Flow traced (`api/index.ts:2587–2636`):

- **Checkout** (`:2587`): POST `{slug}`, looked up in the hardcoded `EBOOKS`
  registry (`:2472`), Stripe Checkout session created with `metadata: { slug }`
  and `success_url` carrying `{CHECKOUT_SESSION_ID}`. Unknown slug → 400. Price
  from env; missing price → 503. Clean.
- **Download** (`:2612`): GET `?session_id=…`. It **retrieves the session from
  Stripe** (`stripe.checkout.sessions.retrieve`), reads the slug **from the
  session's own `metadata`** (not from the client), and gates on
  `session.payment_status === "paid" || session.status === "complete"` **and**
  the slug resolving to a real book. Only then does it `readFileSync` the PDF and
  stream it with `Cache-Control: private, no-store`.

Assessment:
- **The slug is bound to the paid session** (read from Stripe metadata, `:2620`),
  so you can't pay for a cheap book and download an expensive one. Good.
- **Payment is verified against Stripe's live record**, so a forged/random
  `session_id` fails the `retrieve` or the `paid` check. Good.
- **Residual (Low):** a valid `session_id` is a **bearer token with no
  expiry check and no download-count limit** — the code never checks session age
  or how many times the PDF was fetched. Anyone who obtains the URL (it lands in
  the buyer's browser history / `success_url`, and Stripe session ids are long
  but not secret forever) can re-download indefinitely, and could share it.
  Stripe sessions do expire (~24h for the object's retrievability in some
  modes, but `retrieve` of a completed session keeps working long after). For a
  $9.99 ebook this is an acceptable, low-value leak, but the elite version issues
  a short-lived signed download token bound to the session + slug + an expiry,
  rather than reusing the raw Stripe session id as the download credential.

### 4f. Admin write parity — session-gated in both runtimes

Spot-checked: every `posts.*`/`books.*`/`resources.*`/`settings.*`/`subscribers.*`
/`community.*` write branch checks `authedSession(req)` before acting
(`:1229,1259,1291,1305,1325,…,1799,1807`, and the batch handler `:2113,2207+`).
`KNOWN_PROD_GAPS` is empty and `api-parity.test.ts` guards existence. Good.

---

## 5. Input handling

### SQL injection — parameterized, spot-verified (Low)

Three sites checked:
- **`searchArticlesProd`** (`:1106`): the `MATCH … AGAINST(?)` and the `LIKE`
  fallback both **bind the query as a parameter** (`[query, query]` /
  `[term, term, term]` where `term = '%'+query+'%'`, `:1122–1127`). The `%`
  wrapping is done in JS around a bound parameter, so it's injection-safe. One
  nuance: **`LIKE` wildcards in user input are not escaped** — a user searching
  `50%` or `a_b` gets wildcard behavior, not a literal match. That's a
  correctness/quality wart, **not** an injection (no SQL structure escapes the
  parameter). Worth escaping `%`/`_` for search accuracy.
- **`subscribe`** (`:727`) and **`pcnSignup`** (`:748`): fully parameterized
  `INSERT … VALUES (?, …)`. Good.
- The `LIMIT` is string-concatenated (`… LIMIT " + limit`) but `limit` passes
  through `clampLimit` (`:1101`) which `Math.floor(Number())`s it to an integer
  1–50 — safe. Good.
- The only dynamic identifier interpolation is in `dbInventory` (`` `…\`${name}\`` ``
  `:191,198,213`) where `name` comes from a **hardcoded** `inspectTargets`
  array (`["posts","articles"]`), not user input — safe.

### XSS — no user-generated HTML rendered (Low)

- `dangerouslySetInnerHTML` appears **once** in the entire client:
  `SEOMeta.tsx:104`, injecting `JSON.stringify(s)` of the structured-data object
  into a JSON-LD `<script>`. Source is app-controlled SEO data, not user input,
  and `JSON.stringify` neutralizes it for the JSON context. (One theoretical
  nit: JSON-LD in a `<script>` should escape `<` to avoid `</script>`
  breakout, but `s` is built from trusted route metadata, so not exploitable
  here.) No `innerHTML`/`insertAdjacentHTML`/`document.write` anywhere.
- **Article bodies** render through **`<Streamdown>`** (`ArticleDetail.tsx:688`)
  from trusted, admin-authored markdown — Streamdown sanitizes via its DOMPurify
  dependency. Not user-generated.
- **Comments** are the one user-generated content path. Submission
  (`server/community-router.ts:25–60`) validates via Zod (`content` 1–5000
  chars, `authorEmail` must be a valid email, `:29–32`) and stores with
  `approved: false` — **every comment is moderator-gated before display**
  (`getByPost` returns approved only, `:66`+). Crucially, there is **no public
  page that renders comment bodies**: grep shows `trpc.community.comments.*` is
  used **only** in admin components (`AdminCommentsPanel.tsx`, `ModerationAdmin.tsx`)
  — the public `ArticleDetail.tsx` never fetches or displays comments. So even
  the moderation queue is admin-only, and admin renders comment text as React
  children (auto-escaped), not via `dangerouslySetInnerHTML`. The stored-XSS
  surface is effectively closed by (a) moderation, (b) no public render, (c) React
  escaping. Good — but note the content is **not HTML-sanitized on write**, so if
  a future feature ever renders comments publicly as HTML, this becomes a live
  stored-XSS hole. Document that constraint.

---

## 6. Privacy

### Third-party scripts / data egress

- **`@vercel/analytics` (^2.0.1) and `@vercel/speed-insights` (^2.0.0) are in
  `package.json` (`:65,67`) but NOT imported anywhere** — grep of `client/src`,
  `main.tsx`, `App.tsx`, `index.html` finds no `<Analytics/>` / `inject()` /
  import. So **no Vercel analytics beacon actually loads**. Either dead deps to
  remove, or an intended feature never wired. Net privacy impact today: none from
  Vercel analytics. (Low — remove or wire intentionally.)
- **Google Fonts** loaded from `fonts.googleapis.com` / `fonts.gstatic.com`
  (`index.html:13–20`). This **sends every visitor's IP to Google** on first
  paint — a documented GDPR sore point (German courts have ruled remote Google
  Fonts loading unlawful without consent). For an EU-reachable site this is the
  most concrete privacy exposure. **Fix:** self-host the two font families
  (Cormorant Garamond, Inter) — also a performance win (removes a preconnect +
  cross-origin round trip). Medium effort, real GDPR benefit.
- **Stripe.js** (`js.stripe.com/v3/buy-button.js`) loaded on buy pages
  (e.g. `WhenGodBlessAmerica.tsx:25`) — necessary for checkout, sends data to
  Stripe only when a purchase UI is present. Expected and acceptable.
- **No Google Analytics / GTM / Facebook Pixel** anywhere. Good — minimal
  tracking surface.

### Cookies & consent

- The only cookie is `lw_session` — set **HttpOnly; Secure; SameSite=Lax;
  Path=/; Max-Age=604800** (`api/index.ts:2059–2066`), issued only on admin
  login. Flags are correct. It's a strictly-necessary auth cookie (not tracking),
  so it does **not** require a consent banner under ePrivacy.
- **There is no cookie/consent banner** (`grep consent/gdpr` finds only unrelated
  in-tool text). Given no tracking cookies and no analytics beacon currently
  firing, a banner is **not legally required today**. But the **Google Fonts IP
  transfer** (above) is the one thing an EU regulator could flag absent consent —
  fixing that by self-hosting removes the need to reason about it. (Low, contingent
  on audience.)
- **Session TTL is 7 days** for the admin (`SESSION_TTL_MS`, `:1993`). The
  earlier audit suggested a shorter admin TTL (e.g. 24h); **still open**, Low.

### Subscriber PII

- Stored in MySQL `subscribers` (email, name, source; `:263`,
  `INSERT … ON DUPLICATE KEY`, `:728`). Also `pcn_signups` (email, name, church,
  role, message) and `contact_messages` (name, email, subject, message).
- **Export:** the admin subscribers page (`AdminSubscribers.tsx:8`) calls
  `subscribers.list`, gated by `authedSession` in prod (`:1799–1800`). Only a
  logged-in admin can read the list. No public export path. Good.
- **Email logging:** grep of `console.*` in `server/`+`api/` for email/subscriber
  finds only `server/email-router.ts:21,41` logging **error objects** (which may
  incidentally include an email on a failed subscribe) and
  `publishFullBodies` logging a slug. No routine logging of subscriber emails to
  stdout. Acceptable; tighten the error logs to not echo PII if you want to be
  strict. (Low)

---

## 7. Contact form → `Pastorjbell206@gmail.com`

- **The contact form does NOT email anywhere.** `contactForm` (`:2351–2382`)
  only **inserts into `contact_messages`** (best-effort, swallows DB errors) and
  returns `{ ok: true }`. There is no SMTP/Mailchimp/Resend send in the handler.
  So messages land in the DB and are only seen if someone queries that table —
  **there is no admin UI listing `contact_messages`** (no reader found). Real
  finding: **contact submissions may be silently lost** — an operational bug more
  than a security one, but worth flagging since the brand promises "a person
  reads that inbox" (`Accessibility.tsx:42`). (Medium — reliability)
- **The address is exposed client-side** as `mailto:Pastorjbell206@gmail.com` in
  ~20+ components/pages (`Footer.tsx:101`, `BuyEbookButton.tsx:15`,
  `WorkWithJames.tsx`, thank-you pages, etc.). This is **intentional** — it's the
  published contact address, not a secret. The only cost is scraper spam to a
  Gmail inbox (Gmail's spam filtering absorbs this). Low/Informational.
- **Mailchimp** (`server/mailchimp.ts`) is the newsletter sender, keyed by
  `MAILCHIMP_API_KEY` (server-only, falls back to `"placeholder_key"` and no-ops
  if unset, `:3,27`). Not part of the contact flow. Fine.

---

## 8. Status of the prior audit's findings (`SECURITY.md`)

| Prior finding | Prior status | Now |
|---|---|---|
| CORS wildcard | Fixed | **Confirmed fixed** (`getAllowedOrigin` allow-list). |
| Session cookie expiry bug | Fixed | **Confirmed** (`Date.now() + SESSION_TTL_MS`, `:2058`). |
| HSTS missing | Fixed | **Confirmed** (`vercel.json:16`, incl. preload). |
| Error stack traces in prod | Fixed | Client `ErrorBoundary` gates on `import.meta.env.DEV`; **but** api handlers still return `String(e?.message)` in JSON (`:2070,2689,…`) — leaks DB error text to clients. Partially open (Low). |
| JWT_SECRET reused for seed auth | Deferred | **STILL OPEN** — the line 89 fallback. Top fix (§4a). |
| No rate limit on login | Deferred | **STILL OPEN** (§4b). |
| No rate limit subscribe/pcn | Deferred | **STILL OPEN** (§4b). |
| Stripe placeholder key fallback | Deferred | Present (`stripeConfigured()` guards it, `:2574`); benign — fails closed to "not configured." |
| No CSP | Deferred | **PARTIALLY** — a CSP exists but is **Report-Only with no report-uri = not enforced** (§2). |
| Session TTL 7 days | Deferred | **STILL OPEN** (Low). |

Net: the four header/CORS/cookie fixes held; **every deferred item is still
open**, and the CSP was added but not enforced.

---

## 9. Findings ranked by real risk (likelihood × impact for THIS site)

### HIGH

1. **`SEED_KEY` unset → seed key == `JWT_SECRET` (`api/index.ts:89`).** If the
   documented default (JWT_SECRET only) is live, one leaked secret unlocks both
   session forgery and every seed/DB-inventory endpoint. *Fix:* set a distinct
   `SEED_KEY` in Vercel; replace the `|| JWT_SECRET || ""` fallback with a hard
   fail. **Effort: 15 min** (one env var + 2-line code change).
2. **No rate limiting on `/api/auth/login`.** Single admin password, unlimited
   online guesses. *Fix:* `@upstash/ratelimit` with strict lockout on login.
   **Effort: ~half a day** (needs a KV store env).
3. **Supply-chain: dual lockfiles + `--no-frozen-lockfile`.** Production can
   resolve an unreviewed dependency tree; `package-lock.json` is drift. *Fix:*
   delete `package-lock.json`, switch Vercel install to `--frozen-lockfile`.
   **Effort: 20 min** (+ verify a clean deploy).

### MEDIUM

4. **CSP is Report-Only with no report-uri = unenforced.** Rename header to
   `Content-Security-Policy`; the policy already fits. **Effort: 10 min** (test
   Stripe/YouTube/fonts still load).
5. **Google Fonts leaks visitor IP to Google (GDPR).** Self-host Cormorant +
   Inter. **Effort: half a day** (also a perf win).
6. **No rate limiting on public writes** (`/api/subscribe`, `/api/pcn/signup`,
   `/api/contact`) — DB/inbox spam. **Effort: shares #2's limiter.**
7. **Contact form writes to DB but nothing reads/emails it** — submissions
   silently lost; brand promises a human reads them. *Fix:* forward via Mailchimp
   transactional or add an admin reader. **Effort: half a day.**
8. **Stripe webhook verification code is dead / no webhook endpoint.** Not a hole
   (checkout verifies synchronously), but remove the dead `server/` code or wire
   the endpoint. **Effort: 1–2 h** if wiring; 5 min to delete.
9. **Dependency high-count driven by unused subtrees.** Remove `@aws-sdk/*` (0
   imports), evaluate replacing `axios` with `fetch` in `mailchimp.ts`, bump
   `drizzle-orm` + `vitest`. Deletes the fast-xml-parser high subtree wholesale.
   **Effort: half a day.**

### LOW

10. **`admin-article-bodies.json` (4.3 MB, 247 bodies with `[cite]` stubs) is
    publicly downloadable** — leaks pre-publication, unverified-citation prose the
    publish guard specifically blocks. Move behind auth. **Effort: 2–3 h.**
11. **api error responses echo `e.message` to clients** (DB error text). Gate
    behind a dev flag. **Effort: 1 h.**
12. **`/api/download` reuses the raw Stripe `session_id` as a no-expiry,
    unlimited-use download bearer.** Fine for $9.99; issue a short-lived signed
    token for the elite version. **Effort: half a day.**
13. **No explicit `Cache-Control: private, no-store` on authed JSON endpoints**
    (only `/api/download` sets it). **Effort: 1 h.**
14. **Admin session TTL 7 days.** Consider 24h. **Effort: 5 min.**
15. **Unused analytics deps** (`@vercel/analytics`, `speed-insights`) — remove or
    wire. **Effort: 15 min.**
16. **`LIKE` search wildcards (`%`,`_`) unescaped** — search-accuracy wart, not
    injection. **Effort: 30 min.**

### Informational (no action / correct as-is)

- CORS allow-list correct; session cookie flags correct; SQL parameterized;
  single `dangerouslySetInnerHTML` is app-controlled JSON-LD; comments moderated
  + never publicly rendered + React-escaped; no GA/GTM/FB pixel; `AKIA…` bundle
  hits are WASM false positives; COOP/COEP unnecessary; X-XSS-Protection
  correctly absent.

---

## 10. Five-line summary

1. No Critical or actively-exploitable finding on the production request path;
   the earlier audit's CORS/cookie/HSTS fixes held, but every item it *deferred*
   is still open.
2. The one urgent gap is a **latent** full-admin exposure: with only `JWT_SECRET`
   set (the documented default), the seed-endpoint key equals the
   session-signing secret (`api/index.ts:89`).
3. Login and public writes have **zero rate limiting**, and the CSP that exists
   is **Report-Only with no report-uri — it enforces nothing.**
4. The 60/128 dependency-audit counts badly overstate real risk — they're
   dominated by **unused** (`@aws-sdk/*`) and **dead-at-runtime**
   (mermaid/lodash-es via streamdown) subtrees; production exposure is Low–Medium.
5. Privacy is clean except **Google Fonts leaking visitor IPs** (GDPR) and a
   4.3 MB **public JSON of pre-publication essays** (with 247 unverified-citation
   stubs) that should not be at a public URL.

**Severity counts:** Critical 0 · High 3 · Medium 6 · Low 7.

**Single most urgent fix:** Set a dedicated `SEED_KEY` in Vercel production
(distinct from `JWT_SECRET`) and replace the `SEED_KEY || JWT_SECRET || ""`
fallback at `api/index.ts:89` with a hard fail — closing the latent
one-secret-unlocks-everything path. 15 minutes, highest risk reduction per unit
effort.
