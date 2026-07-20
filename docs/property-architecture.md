# Cross-Property Architecture (L2)

> Gap-closing program, Prompt L2. Clarifies how LiveWell relates to James Bell's
> books, First Baptist Church of Fenton, the Pastors Connection Network, and the
> other public properties — so each keeps a distinct promise and a visitor never
> mistakes one for another. Consolidated (property inventory + biography
> source-of-truth + external-link policy + owner questions) into one doc; split
> only when a real team needs separate ownership.
>
> **Headline: the cross-property identity is already healthy.** The audit looked
> for the usual failure modes — conflicting bios, colliding structured-data
> entities, identity confusion, dead or duplicate destinations — and found the
> platform largely disciplined. What remains is a short list of owner decisions
> and two low-severity hygiene items, not a repair job.

## The properties (verified from the code)

| Property | Public URL | Owns | In LiveWell nav? |
| :--- | :--- | :--- | :--- |
| **LiveWell** (this site) | livewellbyjamesbell.co | The essays, books-read-free, tools, reading paths — the editorial platform | is the site |
| **James Bell** (person) | /about, /work-with-james | The author identity, speaking/teaching | About + byline |
| **The books** | /books, /read/:slug | Catalog + free reading + purchase | Write & Read |
| **Pastors Connection Network** | pastorsconnectionnetwork.com | The pastor network (mentoring, equipping) | For Pastors (contextual) |
| **First Baptist Church of Fenton** | (external) | James's congregation | mentioned in bio, not nav |
| **Substack** | jamesbell333289.substack.com | The email edition (distribution) | Subscribe/footer |
| **Facebook** | /james.bell.609252 | The existing social audience | footer |

**Verdict:** each property has a distinct promise, and LiveWell correctly stays
an *editorial platform* — it does not try to be the church site or a ministry
conglomerate. The PCN sits under "For Pastors" as a contextual destination, not a
competing front door. This is the right restraint; keep it.

## Biography — source of truth (verified consistent)

The canonical bio appears **9 times, identical**, across the site:

> **Lead Pastor of First Baptist Church of Fenton, founder of the Pastors
> Connection Network, and the author of more than twenty books.**

Use this exact line as the medium bio. It is accurate and non-brittle ("more
than twenty" does not go stale). The scattered "founder of…" phrases the scan
surfaced are essay prose about Mendel, Bonhoeffer, Roger Williams, and Teresa of
Ávila — not competing bios. No inconsistency to fix.

- **Short bio** (byline): "James Bell — Lead Pastor, founder of the Pastors
  Connection Network, author."
- **Long bio**: the medium bio plus the conversion-from-atheism, raised-without-a-
  father, five-sons facts that the brand treats as load-bearing.
- **Headshot governance:** HUMAN-ONLY — James should name one authoritative
  headshot (or a small approved set) and where it may be used.

## Structured data — verified clean

`SEOMeta` emits `Person`, `Organization`, `Book`, `Article`, `WebSite`,
`BreadcrumbList`, `FAQPage`, `QAPage`, `ImageObject` — distinct types for
distinct things (James = Person, LiveWell/PCN = Organization, each book = Book).
No entity collision found. Keep the church as a plain mention, not a competing
`Organization`/`Church` entity, unless a church-site integration is ever built.

## External-link policy

Outbound links should carry context (the reader should know they are leaving)
and `rel="noopener noreferrer"` on `target="_blank"`. Current state:

- **Low-severity hygiene:** ~15 `target="_blank"` anchors omit `rel="noopener"`.
  Modern browsers imply `noopener` for `target=_blank` (since ~2021), so this is
  a best-practice gap, not an active vulnerability; 5 of the 15 are admin-only.
  Recommended as a one-pass mechanical cleanup (add `rel="noopener noreferrer"`),
  not urgent. New outbound links should include it from the start.
- Do not default to disruptive new-window behavior for internal navigation.

## Questions only James can answer

1. **PCN nav prominence:** keep the PCN as a contextual "For Pastors" link (current,
   recommended), or give it top-level prominence as the strategic channel?
2. **Canonical PCN domain is `pastorsconnectionnetwork.com`** — the admin sync
   panel and backend feed sync should use `https://pastorsconnectionnetwork.com/feed/`.
3. **Church relationship:** should First Baptist Church of Fenton get any nav or
   footer link, or remain a bio mention only (current)?
4. **Headshot:** name the authoritative image and its permitted uses.

## Low-priority follow-ups (no decision needed)
- The `noopener` mechanical pass (above).
- Keep the admin-panel PCN feed URL aligned with the backend sync URL.

Neither is reader-facing; both can wait behind the L0 P0 decisions (canonical
publishing, the send, the backup).
