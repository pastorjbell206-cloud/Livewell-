# 06 — Security & Privacy Audit

> Site-elevation audit, step 1.6. Read-only review as of 2026-07-01 (branch
> `site-elevation`). Companion: `00-architecture-map.md` §8. Supersedes the
> June 8 `docs/audit/SECURITY.md` + `REPORT.md` findings — their status is
> tracked in §9 below. No code was changed by this audit.

**Scope:** dependency vulnerabilities, security headers, secrets exposure, API
attack surface (auth, admin one-shots, Stripe checkout/download, rate limiting,
CORS), input handling (SQLi/XSS), and privacy (third-party scripts, cookies,
subscriber PII, contact flow).

**Risk lens:** this is a content site with a trusted pastoral audience, a
single admin, subscriber emails, and $9.99 ebook checkouts. Severity below is
likelihood × impact *for this site*, not theoretical CVSS. The platform's own
trust contract (CLAUDE.md: fabricated authority "ends trust, not just a
build") weighs editorial-integrity exposure heavier than a typical audit would.

---

## Findings at a glance

| # | Finding | Severity | Effort |
|---|---------|----------|--------|
| F1 | 4.4 MB `admin-article-bodies.json` ships publicly — 247 of 421 bodies are unpublished drafts with unresolved `[cite …]` placeholders | **High** | Small |
| F2 | No rate limiting or lockout on `/api/auth/login` (single shared admin password) | Medium | Small |
| F3 | CSP is Report-Only, allows `unsafe-inline`, and has **no report endpoint** — zero enforced and zero observed protection | Medium | Medium |
| F4 | `JWT_SECRET` doubles as the seed-API key (`SEED_KEY \|\| JWT_SECRET` fallback) — one secret, two trust domains | Medium | Small |
| F5 | Dual lockfiles + `pnpm install --no-frozen-lockfile` on Vercel — non-reproducible builds | Medium | Small |
| F6 | 60 prod-graph vulnerabilities (18 high), almost all in unused or client-dead paths; unused vulnerable deps still installed | Medium | Small–Medium |
| F7 | Contact form stores PII into a table nothing reads, swallows failures, and never emails the pastor | Medium | Small–Medium |
| F8–F16 | Nine Low findings (timing compare, error-message leakage, permanent download token / no webhook, JSON-LD escaping, LIKE wildcards, Google Fonts/EU, missing headers, 7-day admin TTL, no self-serve unsubscribe) | Low | Small each |

Counts: **0 Critical · 1 High · 6 Medium · 9 Low.**

---

## 1. Dependency vulnerabilities

`pnpm audit` was run from the repo root on 2026-07-01 (through the environment
proxy; both runs completed).

- `pnpm audit --prod`: **60 vulnerabilities — 5 low / 37 moderate / 18 high / 0 critical.**
- `pnpm audit` (full): **128 — 10 low / 70 moderate / 47 high / 1 critical.**
  The lone critical is `vitest@2.1.9` (UI-server arbitrary file read/execute,
  GHSA in `vitest <3.2.6`) — a devDependency, never deployed; exploitable only
  if someone runs `vitest --ui` exposed to a network.

### Why the prod number overstates the real runtime risk

The Vercel function (`api/index.ts`) is deliberately self-contained and only
imports `mysql2`, `bcryptjs`, `superjson`, `stripe`, and `@vercel/node`
(api/index.ts:1–17); Vercel's bundler traces imports, so the vulnerable
packages below never reach the production serverless runtime:

| Advisory (high) | Path | Actual exposure |
|---|---|---|
| `fast-xml-parser` / `fast-xml-builder` entity-expansion + attribute bypass | `@aws-sdk/client-s3` → … | **Unused package** — zero imports repo-wide (arch map §5). Pure install weight. |
| `path-to-regexp` ReDoS | `express@4.21.2` | Express is the **dev** server only; not bundled into `api/index.ts`. |
| `lodash-es` `_.template` code injection | `streamdown` → `mermaid` → chevrotain | Client-side, and the mermaid path is never exercised (site renders prose markdown). |
| `drizzle-orm` SQL injection via SQL identifiers | `drizzle-orm@0.44.7` | Dev runtime only; prod uses raw parameterized mysql2. App code never passes user input as identifiers. |
| `axios` (NO_PROXY bypass + 12 moderate) | `axios@1.12.2` | Used only by `server/mailchimp.ts` (dev runtime, outbound-only, trusted URL). |
| `form-data` CRLF injection | via axios | Same as above. |

The dompurify/mermaid moderate cluster (14 advisories) rides in through
`streamdown` — again, shipped to the client bundle but on code paths (mermaid
diagrams) the site never renders.

**Verdict:** no vulnerable code is reachable from an attacker's position
today. The fix is hygiene, and it is cheap: remove the five unused packages
(`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`, `date-fns`,
`tw-animate-css`, `vite-plugin-manus-runtime`), bump `vitest`, and let the
already-configured Dependabot PRs land. That alone clears most of the high
count. **Severity: Medium (hygiene), Effort: small.**

### The dual-lockfile / non-frozen install problem (F5)

Both `pnpm-lock.yaml` **and** `package-lock.json` are tracked (`git ls-files`).
Vercel's install command is `pnpm install --no-frozen-lockfile`
(vercel.json:4). Two facts follow:

1. **Only `pnpm-lock.yaml` matters** — pnpm ignores `package-lock.json`
   entirely. The npm lockfile is dead weight that will silently drift and
   mislead anyone (or any tool) that reads it.
2. **`--no-frozen-lockfile` tells pnpm to re-resolve** whenever the lockfile
   and `package.json` disagree — meaning a production build can install newer
   transitive versions than anyone reviewed or tested. That is precisely the
   window supply-chain attacks (typosquats, hijacked patch releases) exploit,
   and it makes any two builds potentially different. CI, by contrast, tests
   one resolution; Vercel may deploy another.

**Fix (small):** delete `package-lock.json`, change the install command to
`pnpm install --frozen-lockfile`, and commit lockfile changes deliberately.
If the flag exists because CI/Vercel hit lockfile-mismatch failures, fix the
mismatch once rather than disabling the guarantee forever.

---

## 2. Security headers (vercel.json:8–19)

Present on every route:

| Header | Value | Assessment |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (vercel.json:16) | Good. Preload-eligible. |
| `X-Content-Type-Options` | `nosniff` (line 12) | Good. |
| `X-Frame-Options` | `SAMEORIGIN` (line 14) | Good (paired with `frame-ancestors 'self'` in the CSP). |
| `Referrer-Policy` | `strict-origin-when-cross-origin` (line 13) | Good — also keeps `?session_id=` off cross-origin referers (see F10). |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` (line 15) | Good. (`payment=()` disables the Payment Request API only; Stripe Checkout redirect flow is unaffected.) |

### F3 — The CSP does not protect anything (Medium)

vercel.json:17 sends **`Content-Security-Policy-Report-Only`** — there is no
enforced `Content-Security-Policy` header anywhere in the config. Three
compounding problems:

1. **Report-Only never blocks.** An injected script executes exactly as if
   there were no CSP.
2. **There is no `report-uri` / `report-to` directive and no `Report-To`/
   `Reporting-Endpoints` header** — so the violation reports the browser
   generates are discarded. The header produces neither enforcement nor
   telemetry. It is decoration.
3. Even as a draft policy it is weak: `script-src 'self' 'unsafe-inline'`
   would permit any inline script an attacker manages to inject, which is the
   primary thing a CSP exists to stop.

The rest of the draft policy is sane (`default-src 'self'`, fonts pinned to
Google, frames pinned to Stripe/YouTube, `frame-ancestors 'self'`).

**Fix (medium):** (a) add a reporting endpoint (Vercel log drain, report-uri.com,
or a tiny `/api/csp-report` handler) so the Report-Only header starts earning
its keep; (b) audit the inline-script reality — the SPA's only inline script
risk is the JSON-LD block (see F11) and the Stripe buy-button loader
(WhenGodBlessAmerica.tsx:25, an external src, already allowed) — then flip to
an enforced header, ideally replacing `'unsafe-inline'` with hashes for
anything that genuinely must stay inline.

### Missing (Low, F14)

- No `Cross-Origin-Opener-Policy` / `Cross-Origin-Resource-Policy`. For a
  site with no cross-origin windows or credentials-bearing subresources this
  is defense-in-depth, not a hole. `COOP: same-origin-allow-popups` (Stripe
  opens popups from buy buttons) + `CORP: same-origin` would be safe values.
- No explicit `Cache-Control: no-store` on `/api/auth/*` responses
  (api/index.ts:2036–2094 set none). Vercel does not cache function responses
  by default and the cookie is `HttpOnly`, so exposure is browser/proxy cache
  edge cases only. Cheap to add.
- `X-XSS-Protection` is correctly absent (obsolete; its presence can create
  vulnerabilities in old browsers).

---

## 3. Secrets exposure — clean, with one editorial-grade exception

**Client bundle:**
`grep -rioE "(sk_live|sk_test|whsec_|AKIA[A-Z0-9]{16}|api[_-]?key)" client/src dist/public/assets`
produced only false positives — `AKIA…` matches inside
`dist/public/assets/wasm-CG6Dc4jp.js` are base64 inside an embedded wasm blob
(a shiki artifact), not AWS keys.

**Vite env inlining:** the only `import.meta.env` uses in the client are
`VITE_OAUTH_PORTAL_URL` and `VITE_APP_ID` (client/src/const.ts:7–8) and the
boolean `DEV` flag (ErrorBoundary.tsx:36) — both VITE vars are non-secret
identifiers, exactly as `.env.example` documents. `JWT_SECRET`,
`ADMIN_PASSWORD_HASH`, `STRIPE_SECRET_KEY`, `DATABASE_URL`, and Mailchimp
credentials appear only in server/api code (`process.env.*`), which never
ships to the browser. No `.env` file is tracked in git (`git ls-files` shows
only `.env.example`).

**Mailchimp:** `server/mailchimp.ts:3–12` reads the key from env with a
`placeholder_key` no-op fallback — dev-runtime only, never bundled client-side.

### F1 — `admin-article-bodies.json` publicly ships unpublished drafts (High)

`client/public/admin-article-bodies.json` (4,414,125 bytes → copied verbatim
into `dist/public/`, i.e. world-readable at
`https://www.livewellbyjamesbell.co/admin-article-bodies.json`) contains
**421 full article bodies** (fields: `slug`, `body`, `readingTimeMinutes`).
Verified by parsing the file:

- **247 of 421 bodies contain unresolved `[cite …]` placeholders** — e.g.
  `1-preaching-to-the-felt-need-without-the-deeper-need`,
  `10-its-okay-to-see-a-counselor-why-pastors-resist-and-why-they-shouldnt`.
- The publishing pipeline **explicitly refuses** to publish those very bodies:
  `posts.publishFullBodies` (api/index.ts:1341–1345) blocks any body matching
  `/\[cite/i` because "Shipping them would put fabricated-looking sources
  live — a violation of the never-fabricate rule."
- The file is consumed only by the **admin** publish page
  (`client/src/pages/AdminPublishContent.tsx:31` — `fetch("/admin-article-bodies.json")`),
  yet it is served with no auth to anyone, and to every crawler.

So the exact content the platform's own guard exists to keep off the site —
unfinished drafts carrying fabricated-looking citation placeholders, under
James Bell's name — is fully public today, along with ~4.3 MB of not-yet-
published work product. No PII, no credentials; but measured against this
platform's stated trust contract (fabricated authority is "the one trap that
ends trust") and the commercial value of unpublished content, this is the
single most consequential exposure found.

**Fix (small):** remove the file from `client/public/` (exclude it from the
build); serve it to the admin page through an `authedSession`-gated endpoint
(e.g. a `posts.getPublishSource` procedure or a gated static read in
`api/index.ts`), or have the admin upload the file rather than fetch it.
Purge the deployed copy by redeploying; note that crawlers may already hold
copies.

---

## 4. API attack surface (`api/index.ts`, 2,691 lines)

### 4.1 The one-shot admin/seed endpoints and `authed()`

Routing (api/index.ts:2650–2667): `/api/admin/status`, `organize-articles`,
`db-inventory`, `seed-articles`, `seed-content`, `seed-post-christian`,
`seed-integrated-life`, `seed-womanhood-doubt-devotionals`, `seed-ebooks`,
`fix-apostrophes`, `notifications/:id` (DELETE), `seed`.

Two gates exist:

- **`authed(req)`** (api/index.ts:84–92): compares the `x-seed-key` header —
  header only, deliberately never a query param so it can't leak into URLs or
  logs — against `process.env.SEED_KEY || process.env.JWT_SECRET || ""` using
  `constantTimeEqual` (crypto.timingSafeEqual with an up-front length check,
  api/index.ts:77–82).
- **`authedSession(req)`** (api/index.ts:2032–2034): the HMAC session cookie.

Gating verified per endpoint: `adminSeed` (:291) and `adminSeedArticles`
(:305) require `authed()` (seed key only); every other admin one-shot accepts
either the seed key or an admin session (`!authed(req) && !authedSession(req)`
at :337, :361, :411, :443, :589, and the notifications DELETE at :2662 requires
a session). **No admin endpoint is unauthenticated.**

**The line-89 fallback, read carefully:** if `SEED_KEY` and `JWT_SECRET` are
*both* unset, `expected` is `""`, and line 90 (`if (!expected) return false;`)
rejects before any comparison; an empty client key is also rejected at line 87.
So the empty-string fallback is **not** an auth bypass — the map's "soft spot"
is real but different, and it is F4:

**F4 — one secret, two trust domains (Medium, still open from June 8).**
When `SEED_KEY` is unset, the seed-API key *is* `JWT_SECRET` — the same value
that signs admin session cookies (api/index.ts:1995–2005). Anyone who ever
handles the seed key (a curl one-liner in a shell history, a CI variable, a
teammate running a migration) holds the ability to **forge admin sessions**,
and rotating one credential forcibly rotates the other. Fix (small): set a
distinct `SEED_KEY` in Vercel (the code already prefers it), rotate
`JWT_SECRET`, and document both in `.env.example` (SEED_KEY is currently
missing from it).

### 4.2 Admin login — F2 (Medium): no rate limiting, no lockout

`authLogin` (api/index.ts:2036–2072): POST-only, bcrypt-compares the password
against `ADMIN_PASSWORD_HASH`, hard-fails when the hash env is missing, then
issues a 7-day session. There is **no rate limiting, no lockout, no delay, no
CAPTCHA** — `grep -rn "rateLimit"` across `server/` and `api/` finds nothing —
and it is a single shared password with no username, so the only secret is
one string. bcrypt (~100ms/attempt per instance) throttles a single-threaded
attacker, but Vercel happily scales concurrent invocations, so an online
brute force is bounded mainly by the attacker's budget and the password's
entropy. Impact of a crack is total: content CRUD, subscriber list
(`subscribers.list`, :1799), settings, notifications.

Real-world likelihood for a small pastoral site is moderate (credential
stuffing and dumb bots more than targeted attack), and a strong bcrypt-hashed
password keeps this Medium — but it is the cheapest meaningful hardening
available. **Fix (small):** an in-memory sliding-window counter per IP inside
the function (imperfect across instances but kills naive bots), or Vercel
WAF / Upstash rate-limit for a real guarantee; log failed attempts.

Related session notes: cookie is `HttpOnly; Secure; SameSite=Lax; Path=/;
Max-Age=604800` (:2059–2066) — good flags; `SameSite=Lax` plus the CORS
allow-list gives solid CSRF coverage for the JSON POST endpoints. The June-8
expiry bug is confirmed fixed (`Date.now() + SESSION_TTL_MS`, :2058). Two Lows
below (F8 timing compare, F15 7-day TTL).

### 4.3 CORS — correct

`getAllowedOrigin` (api/index.ts:94–105) allow-lists exactly the two
production origins, adds localhost only under `NODE_ENV=development`, returns
`""` (no ACAO header at all) for unknown origins, and never echoes the
request origin. `Access-Control-Allow-Credentials: true` is only set alongside
an allow-listed origin (:115–118), and `Vary: Origin` is present (:112). The
June-8 wildcard fix has held.

### 4.4 Stripe: checkout, download, and the missing webhook

**Checkout** (`/api/checkout` → `ebookCheckout`, api/index.ts:2587–2610):
slug is looked up in the server-side `EBOOKS` registry (:2472–2563); the
**price comes from a server env var** (`process.env[book.priceEnv]`, :2596),
never from the client — no price tampering. Success URL carries
`{CHECKOUT_SESSION_ID}`; the purchased slug is bound into
`metadata: { slug }` (:2604). The tRPC variant `stripe.createCheckoutSession`
(:1867–1901) similarly resolves the price server-side.

**Download** (`/api/download` → `ebookDownload`, :2612–2636): takes
`session_id` from the query, **retrieves the session from Stripe's API**
(:2619) — so a forged/guessed ID fails at Stripe — reads the slug from the
session's own metadata (:2620, so the token is bound to the one purchased
book), and requires `payment_status === "paid" || status === "complete"`
(:2622) before streaming the PDF with `Cache-Control: private, no-store`
(:2630). The PDFs live in `api/_ebooks/` outside the static web root, loaded
via `import.meta.url` (:2459–2461), so there is **no unauthenticated direct
path to a paid PDF**. Verdict: a download cannot be obtained without a paid
Stripe session. Two residual weaknesses, both Low:

- **F10 — the paid `session_id` is a permanent bearer token.** Stripe Checkout
  sessions remain retrievable long after completion and `payment_status`
  stays `paid`, so the thank-you URL (`/{slug}/thank-you?session_id=cs_…`)
  re-downloads forever — browser history, shared links, server logs. Mitigated
  by `Referrer-Policy` (no cross-origin leakage) and by proportion: the asset
  it protects is a $9.99 PDF that the buyer can redistribute anyway. A
  time-window check on `session.created` (e.g. 30 days) would cap it.
- **No Stripe webhook exists.** `server/stripe-service.ts:122–168` contains a
  webhook handler and `constructEvent` signature verification, but no route in
  either runtime ever mounts it (grep across `server/_core`, `server/routers.ts`,
  and `api/index.ts` — nothing), and `STRIPE_WEBHOOK_SECRET` appears nowhere
  in the repo. Security impact is nil (verification code that never runs can't
  be bypassed); the operational impact is real: `book_purchases` rows are
  inserted as `'pending'` at checkout creation (:1897) and **nothing ever
  marks them paid**, so revenue records depend on the buyer's browser reaching
  the thank-you page. Reconciliation happens in the Stripe dashboard or not at
  all. If membership subscriptions launch, this gap graduates to High
  (renewals/cancellations will be invisible). Fix (medium): mount the
  already-written handler at `/api/stripe/webhook` in `api/index.ts` with the
  signature check, set `STRIPE_WEBHOOK_SECRET`.

`stripeConfigured()` (:2574–2577) correctly rejects the `sk_test_placeholder`
build-time value — closing the June-8 "placeholder key" concern.

### 4.5 Public write endpoints

`/api/subscribe` (:719–737), `/api/pcn/signup` (:738–757), `/api/contact`
(:2351–2382), and `subscribe.subscribe` (tRPC, :1270–1283) are intentionally
public, parameterized, length-capped (pcn), and email-regex-validated
(subscribe/pcn). None is rate-limited — spam/DB-bloat risk only (Low; the
June-8 deferral stands). The contact form has its own finding (F7, §7).

---

## 5. Input handling

### SQL injection — parameterized, spot-verified

Three sites checked in depth, all clean:

1. **`searchArticlesProd`** (api/index.ts:1106–1135): the search term is bound
   as a `?` parameter in both the FULLTEXT branch (:1108–1114) and the LIKE
   fallback (:1122–1127). The `LIMIT` is string-concatenated (:1113, :1126) —
   which would be a hole — but every caller passes it through `clampLimit`
   (:1101–1104), which floors it to an integer in [1, 50], so it cannot carry
   SQL. *Residual (F12, Low):* the LIKE fallback interpolates the raw term
   into `%...%` without escaping `%`/`_` wildcards — a user can type `%` and
   match everything or craft expensive patterns. Not injection; worst case is
   a slow query. One `replace(/[%_\\]/g, "\\$&")` fixes it.
2. **`getArticle`** (:651–660): slug bound as `?`.
3. **`subscribe` insert** (:727–731) and `posts.publishFullBodies` batch
   (:1349–1370): all values bound; the only interpolation is a generated
   `?,?,?` placeholder list. `dbInventory`'s backtick-quoted table names
   (:190–213) come from a hardcoded two-element array, not user input.

The dev runtime uses Drizzle (parameterized by construction) with zod input
validation on every procedure.

### XSS — one sink, and it's the right kind of almost-clean

`grep -rn dangerouslySetInnerHTML client/src` returns **exactly one hit**:
`client/src/components/SEOMeta.tsx:104` — the JSON-LD `<script
type="application/ld+json">` block, filled with `JSON.stringify(s)` of
internally-built schema objects. `JSON.stringify` does **not** escape `</`,
so a title/description containing `</script><script>…` would break out of the
block (F11, Low — the data source is admin-authored posts, so exploitation
requires an already-compromised admin; still, `JSON.stringify(s).replace(/</g,
"\\u003c")` is a one-line hardening).

Article bodies are rendered as **markdown through Streamdown**
(`client/src/pages/ArticleDetail.tsx:14, 688–698`), not injected as HTML —
raw HTML in markdown is escaped by the renderer, and the content is
admin-authored in any case. No `innerHTML` / `insertAdjacentHTML` /
`document.write` anywhere in `client/src`.

**Comments:** the submission procedure exists (`server/community-router.ts:25–60`
— public, zod-validated, capped at 5,000 chars, stored with `approved: false`)
and moderation is admin-gated in **both** runtimes (dev: `protectedProcedure`,
community-router.ts:85–129; prod: `authedSession` checks on every
`community.*` case, api/index.ts:2207–2253). But **no public UI currently
submits or displays comments** — the only client callers are
`AdminCommentsPanel.tsx` and `ModerationAdmin.tsx`, and `ArticleDetail.tsx`
renders none. The admin panel renders comment text as React children
(auto-escaped). So there is no user-generated-content XSS surface live today;
if a public comment form ships later, the moderation queue plus React
escaping is the right shape — just keep it out of any markdown/HTML renderer.

---

## 