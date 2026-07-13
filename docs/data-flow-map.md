# Data-Flow Map & Privacy Posture (L8)

> Gap-closing program, Prompt L8. What personal data the platform collects, where
> it goes, and how it is protected. This is a technical/operational review, not
> legal advice — the retention periods and legal basis are marked HUMAN-ONLY for
> counsel.
>
> **Headline: PII hygiene is verified clean.** The concrete exposures L8 hunts for
> are absent — no personal data in logs, analytics, or URLs, and no third-party
> tracker to capture it. What remains is documentation and the retention/legal
> decisions only a human can make.

## Verified clean (the hunt)

- **No PII in logs.** Server and client logging records error *messages*
  (`err.message`), never raw emails, names, or message bodies.
- **No PII in analytics.** The `newsletter_signup` event carries `source` +
  `audienceType` only — the email it once leaked was removed in L3. Vercel
  Analytics is privacy-light (no ad trackers, no cookie banner).
- **No third-party error/session tracker** (no Sentry/Bugsnag/LogRocket/Datadog),
  so there is no surface silently capturing PII.
- **Email in URLs is legitimate** — the only cases are `mailto:` links (the admin
  reply, the author contact), which is the intended use.
- **Consent context is stored.** Subscribers are written with `email, name,
  source`; contact messages with `name, email, subject, message, createdAt`. The
  `source` is the signup-attribution that records *where* consent was given.

## Data-flow map

| Flow | Data | Destination | Retention | Basis |
| :--- | :--- | :--- | :--- | :--- |
| Newsletter signup | email, name, source, segment | `subscribers` (MySQL) + Mailchimp | HUMAN-ONLY | consent (form) |
| Substack handoff | email | Substack | Substack policy | consent |
| Contact form | name, email, subject, message | `contact_messages` (MySQL) | HUMAN-ONLY | to reply |
| Ebook purchase | email, payment | Stripe (+ a record row) | Stripe policy | contract |
| Membership | email, name | `subscribers` (source=membership) | HUMAN-ONLY | consent |
| Usage analytics | page, event, slug — no PII | Vercel Analytics | Vercel policy | legitimate interest |
| Reading progress / assessments | answers, progress | the visitor's own browser (localStorage) | until they clear it | on-device, never sent |

## Vendor register (data processors)

| Vendor | Data | Failure effect | Exit |
| :--- | :--- | :--- | :--- |
| Vercel | hosting, privacy-light analytics | site down / no metrics | portable (git) |
| MySQL (host) | subscribers, contacts, content | the real exposure — confirm backups (see L9) | export via dump |
| Mailchimp | email delivery | no sends (already dark) | export list |
| Stripe | payments | no checkout | standard |
| Substack | newsletter | no email edition | export subscribers |

## What remains — HUMAN / legal only
- Retention periods for `subscribers` and `contact_messages` (how long to keep a
  message after replying; how long an unsubscribed record persists).
- The legal basis wording and the privacy-page/counsel review (the page is
  accurate to behavior per L1/earlier work; counsel has not signed off).
- A documented access/export/deletion request process (the data is small and
  exportable; the *procedure* should be written and owned).
- Confirm each vendor's DPA/retention settings.

None of these is a code defect; the code-level privacy posture is sound.
