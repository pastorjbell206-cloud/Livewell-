# Operating-Readiness Audit (L0)

> Supplemental gap-closing program, Prompt L0. Read-only audit: no public-facing
> behavior was changed. Determines whether LiveWell can be published, measured,
> maintained, corrected, recovered, and improved — not whether it looks good
> (that program is complete).
>
> **Consolidation note.** The L0 spec lists six separate docs. For a solo-author
> platform, six thin files is the enterprise bureaucracy the pack itself warns
> against, so this single doc carries the audit, the integration register, the
> owner questions, and the roadmap as sections. Split them only when a real team
> needs to own them separately.
>
> Findings tagged: **VERIFIED** (evidence in repo/rendered behavior) ·
> **PARTIAL** (exists, incomplete) · **ABSENT** (not found) · **HUMAN-ONLY**
> (a decision or external action only James can make). Evidence date: main at
> `2822158`.

## The five most consequential gaps

1. **No recovery runbooks exist (ABSENT).** No backup/restore, incident-response,
   monitoring, or rollback documentation in `docs/`. The site is content-rich and
   revenue-bearing (Stripe live); if a deploy breaks, an image must come down
   fast, or the DB is lost, the procedure lives only in whoever is awake. This is
   the highest operational risk on the platform. → L9.
2. **The weekly newsletter send is dark (HUMAN-ONLY).** `server/mailchimp.ts` is
   wired and subscribers dual-write to it, but it no-ops until `MAILCHIMP_API_KEY`
   + `MAILCHIMP_LIST_ID` are set in Vercel. Substack is the de-facto channel; the
   site collects addresses it cannot yet mail. Two env vars. → L1/L7.
3. **Publishing ownership is split and undocumented (PARTIAL).** Content lives in
   three places at once — a MySQL DB (wins on slug), a committed static library
   (`content/static-library.generated.json`, 584 records), and Substack (the
   real newsletter). The just-fixed publish-bridge bug (a silent no-op for months)
   is the symptom: no single doc says who owns an essay. → L1.
4. **No editorial correction/unpublish workflow (ABSENT).** No documented way to
   correct a published claim, pull a sensitive image, or unpublish for review
   without a developer and a full rebuild. On a platform that writes on politics,
   abuse, and pastoral crisis, this is a real exposure. → L5.
5. **Legal/privacy alignment is unconfirmed (HUMAN-ONLY).** Privacy and Terms
   pages exist and are accurate to current behavior, but no human/counsel has
   signed off, and the data-retention and vendor picture is undocumented. → L8.

## Audit by dimension

### A. Publishing ownership & synchronization — PARTIAL
- Three stores: DB (authoritative, wins on slug), static library (served by
  `api/index.ts` behind the DB, VERIFIED), Substack (newsletter, VERIFIED by
  brand docs). The same essay can exist in DB + static lib; the API merge and
  the stub guard (`essayQuality.ts`, `MIN_ESSAY_CHARS=600`) resolve this. **No
  single source-of-truth doc** — ABSENT.
- Failure behavior: build tolerates a missing DB (sitemap + bridge no-op). VERIFIED.

### B. Domains & public identity — PARTIAL
- **149 redirect/rewrite rules** in `vercel.json` (legacy slugs → `/writing/*`,
  topic consolidations → `/justice` etc.); `trailingSlash` set. VERIFIED in-repo.
- Per-route self-canonicalization in `SEOMeta`. VERIFIED.
- `.com` vs `.co`, `www` vs non-`www`, HTTP→HTTPS, DNS, TLS renewal — **HUMAN-ONLY**
  (Vercel/registrar dashboard, not in repo). Not verified from here.

### C. Cross-property architecture — ABSENT (doc)
- Properties in play: LiveWell (this site), James Bell's books, First Baptist
  Church of Fenton, the Pastors Connection Network, Substack, Facebook. Links
  exist (e.g. `/for-pastors` → PCN) but **no property-architecture doc** defines
  which owns which promise or guards identity confusion. → L2.

### D. Measurement & analytics — PARTIAL
- **Vercel Analytics** only (`@vercel/analytics`, `main.tsx`). Privacy-light, no
  GA/gtag/cookie banner. VERIFIED. Depth telemetry (`lib/telemetry.ts`) rides on
  it: `essay_read_complete` etc.
- **No scorecard, no metric dictionary, no server-confirmed conversion events.**
  Signup fires a client `newsletter_signup` event, not a confirmed-subscription
  event. → L3.

### E. Editorial operations — PARTIAL
- Six content validators gate CI (formation, life, table, politics, theology,
  studyguides) + a corpus rubric/ledger (`docs/audit-corpus/`). Strong on
  *structure*. VERIFIED.
- **No draft→review→publish→correct→unpublish workflow, no correction policy, no
  per-page owner/review-date.** ABSENT. → L5.

### F. Asset & source provenance — ABSENT (doc)
- Book covers (SVG + raster), generated covers, headshots, fonts (self-hosted),
  Scripture (ESV default). No `asset-register` or `source-provenance` doc; no
  recorded permissions/licenses. The content-integrity *culture* is strong (the
  no-fabricated-citation rule is enforced editorially and by `validate-politics`
  citation checks), but not registered. → L6.

### G. Email & subscriber lifecycle — PARTIAL
- Capture VERIFIED (DB `subscribers` + Mailchimp dual-write). Send HUMAN-ONLY
  (env vars). No welcome sequence live, though two 6-week email tracks are
  authored (`docs/email-tracks/`) awaiting the same wiring. Bounce/complaint/
  suppression/deletion handling — ABSENT (would live in the provider). → L7.

### H. Privacy & data lifecycle — PARTIAL
- Privacy + Terms pages accurate to behavior (newsletter, Stripe, Vercel
  analytics, on-device storage, contact). VERIFIED. **No data-flow map, retention
  schedule, or vendor register; no counsel sign-off.** → L8.

### I. Release & recovery — PARTIAL
- CI: `pnpm check` → validators → `pnpm test` → `pnpm build`, plus a lint gate
  (0 errors, ratcheted warnings) and axe/Lighthouse quality job. VERIFIED.
  Deploy: Vercel on push to `main`; the build runs the publish bridge with a
  live `DATABASE_URL`. VERIFIED.
- **No backups doc, no restore drill, no monitoring/alerts, no incident runbooks,
  no rollback procedure.** ABSENT — the top gap. → L9.

### J. Human validation — PARTIAL
- ~274-test suite + ~260-route render-smoke net + recent a11y work (WCAG AA
  contrast fix `#399`, footer tap targets, purchase-flow labels). VERIFIED.
- **No documented browser/AT matrix; no recorded manual screen-reader run.**
  ABSENT. → L10.

### K. Post-launch learning — ABSENT
- No 30/60/90 review cadence, no experiment register, no decision rules tying a
  change to a stated problem. The telemetry now exists to feed this; the loop
  does not. → L11.

## Integration register (evidence-based)

| System | Purpose | Status | Owner action |
| :--- | :--- | :--- | :--- |
| Vercel | Hosting, build, analytics | VERIFIED | — |
| MySQL (`DATABASE_URL`) | Content + subscribers | VERIFIED | backup/restore undocumented |
| Mailchimp | Email delivery | PARTIAL | set `MAILCHIMP_API_KEY`+`_LIST_ID` |
| Stripe | Ebook + membership checkout | VERIFIED (config-driven) | membership price unset |
| Substack | Newsletter channel | VERIFIED | canonical relationship undocumented |
| `@vercel/analytics` | Usage telemetry | VERIFIED | — |
| GitHub | Repo, CI, deploy trigger | VERIFIED | branch protections unconfirmed |

## Questions only James (or a human owner) can answer

1. **Canonical publishing:** is the *website* or *Substack* authoritative for full
   essays? (Drives L1 — everything downstream depends on it.)
2. **Newsletter send:** set the two Mailchimp env vars, or commit to Substack as
   the sole sender and stop dual-writing?
3. **Membership:** the price and the promise (unblocks the Stripe path already built).
4. **Legal:** who signs off on Privacy/Terms and the retention schedule?
5. **Domains:** confirm `.co` is canonical (brief says so) and `.com`/`www` all
   301 to it — I can't see DNS from here.
6. **Backups:** what is the actual DB backup today, and who holds the restore keys?
7. **Property architecture:** should the PCN/church get nav prominence, or stay
   contextual links?

## Roadmap (smallest coherent sequence)

| ID | Item | Priority | Depends on | Reversible |
| :--- | :--- | :--- | :--- | :--- |
| OR-1 | Backup + restore runbook, with a real restore drill (L9) | **P0** | DB access | n/a (doc) |
| OR-2 | Confirm canonical publishing model; write the source-of-truth doc (L1) | **P0** | Q1 | yes |
| OR-3 | Set Mailchimp env vars OR formalize Substack-only (L7) | **P0** | Q2 (owner) | yes |
| OR-4 | Incident + emergency-unpublish runbook (L9/L5) | P1 | — | n/a |
| OR-5 | Editorial correction/unpublish workflow (L5) | P1 | OR-2 | yes |
| OR-6 | Measurement scorecard + confirmed-subscription event (L3) | P1 | OR-3 | yes |
| OR-7 | Data-flow map + vendor register; legal review packet (L8) | P1 | Q4 | n/a |
| OR-8 | Property-architecture doc (L2) | P2 | Q7 | yes |
| OR-9 | Asset + source-provenance register (L6) | P2 | — | n/a |
| OR-10 | Browser/AT manual matrix + one real screen-reader run (L10) | P2 | — | n/a |
| OR-11 | 30/60/90 review templates + experiment register (L11) | DEFER | OR-6 | n/a |

**Dependency spine:** do not build analytics targets (OR-6), redirects hardening,
or newsletter automation on top of an unresolved canonical model (OR-2). Resolve
Q1–Q3 first; they are all owner decisions, not builds.

## Frozen pending a human decision
Nothing public needs freezing. The one live behavior worth a decision, not a
freeze: the site collects newsletter addresses it cannot currently send to (Q2).
That is a trust question, not a bug — resolve the send, don't hide the form.
