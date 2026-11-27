# LiveWell as a Christian education platform: audit, plan and preview

James, 2026-11-26, sent the "LIVEWELL — MASTER PLATFORM DEVELOPMENT PROMPT" and
asked: "keep like the same design and same kind of like images ... not
radically change the site ... do this as a preview to see if it would be any
better." So nothing live was changed. The preview is one page,
`/preview/home` (`client/src/pages/PreviewHome.tsx`, noindex, linked from
nowhere), on the site's own tokens, fonts and engraved plates. This file is the
audit and the plan behind it. Every decision below that would change the live
site waits for his word.

## 1. What the site already is (the audit, in brief)

The brief describes a platform LiveWell is already most of the way to being.
Measured from the site catalogue (`client/src/lib/siteCatalog.ts`) and the
content libraries on 2026-11-26:

| The brief's discipline | What already exists |
|---|---|
| Bible | Study Bible with notes on all 66 books; 59 Bible films; 41 background guides; 24 reading guides; timeline, atlas, key words, hard passages, themes, word study, cross-references, Bible search; reading plans |
| Theology | 62 doctrine studies; where Christians differ (6 comparisons and a quiz); glossary; 14 creeds and confessions in full |
| Church history | a 14-lesson course; 14 longer essays (including the six on how culture reads the Bible); 36 people; councils, heresies, timeline; Christian traditions |
| Apologetics | the case for the faith; for skeptics; look up a claim; Believe and The Reliability of Scripture |
| Christianity and culture | how culture reads the Bible; Christ and the nation; the timeline of injustice; A Higher Allegiance; Blind Spots; the essay shelf |
| Difficult questions | 35 Honest Answers; 10 short answers; the "Good questions" films |
| Christian living | 69 life guides; 208 subjects in "What the Bible says"; 132 how-to guides; 29 eight-week plans |
| Church and leadership | 68 group study guides with leader guides; booklets on elders, governance and change; tracks with leader guides |
| Families | tonight's devotion, a year of devotions, a 76-question catechism, 4 family reading plans, the Bible Explorer for ages 7 to 16 |
| Academy (structured learning) | 6 tracks (sessions in order, progress kept on the device) and the history course |

Infrastructure: React and Vite on Vercel, two API runtimes kept in parity, a
MySQL database, content as checked JSON libraries with about 60 validators in
CI, prerendered pages for search engines, an admin area, Stripe giving (open
since 2026-11-25). No reader accounts: progress is kept on the device by
design.

**The real gap is organisation and front door, not content.** A visitor meets
seven doors named by James on 2026-11-18 (Bible, History, Questions, Family,
Tools, Essays, About). The brief's eight disciplines cut the same material
differently. The preview shows that cut without moving a page.

## 2. Where the brief and James's standing decisions disagree

These are his calls, not the builder's. The preview follows the decision log
wherever the two conflict.

1. **Membership and paywalls.** The brief proposes Livewell Plus and church
   subscriptions. On 2026-11-17 James decided "No membership fee", and on
   2026-11-22 that downloads carry a suggested gift that can be skipped. The
   preview says "Free to read, and it stays free". A paid tier would reverse a
   recorded decision.
2. **The palette.** The brief suggests a new blue-and-slate palette. James's
   instruction with it was to keep the same design and images, and CLAUDE.md
   fixes the cream, black and mustard palette. The preview keeps them.
3. **Navigation.** The brief's six items (Explore, Academy, Bible Tools,
   Families, Churches, Publishing) replace the seven doors he chose on
   2026-11-18, and the Bible door's films-first order he chose on 2026-11-25.
   The preview shows the six as a second menu under the live header, so both
   can be judged side by side.
4. **Brand.** The brief makes "Livewell" an institution with James as founder
   among future contributors. Today every page is his teaching. The preview's
   About section keeps him at the centre; widening to other contributors is a
   later decision with editorial standards to match.
5. **Accounts, certificates, AI answers.** None exists. The preview names
   Academy courses as "Planned" and links nothing that is not built. Accounts
   would need a schema change, an auth design and a privacy review, each a
   stop-and-ask item in CLAUDE.md.

## 3. Proposed information architecture (if he chooses it)

Explore holds the eight disciplines, each a hub page built from the pages in
section 1 (no content moves; each hub links what exists, as the preview's
cards do). Academy holds the tracks and the history course, with new courses
added as tracks are written. Bible Tools is today's /tools. Families is today's
/family. Churches gathers the group guides, booklets, leader guides and
downloads. Publishing is the essay shelf and the books. About keeps /about,
/speaking, /connect, /contact, /subscribe and /support.

Every current address stays where it is; a new hub is a new page, so no
redirect is needed and no search ranking is put at risk. If the seven doors
are replaced, the change is one data file (`siteCatalog.ts`) plus its tests,
because the header, phone menu, footer, search shortcuts and /explore all read
from it.

## 4. Roadmap, in testable steps

**Now, without new infrastructure** (each its own pull request):
1. If he likes the preview: make the eight discipline hubs real pages
   (`/explore/<discipline>`), each listing the existing pages for it, with its
   own prerendered head and a place in the sitemap.
2. Decide the header: keep the seven doors, or move to the brief's six.
3. A resource template for films and essays: the brief's sections (summary,
   Scripture, sources, discussion questions, related) already exist on most
   film and essay pages; the work is making them consistent.
4. Search by Scripture passage, doctrine, person and period: the search index
   already holds the data; this is filters on /search.

**Needs his decision first:** the palette; the header; anything paid; reader
accounts (bookmarks, progress across devices, certificates); other
contributors; AI-assisted answers (the brief's own rule, cite sources and mark
disputed positions, would apply).

**Later infrastructure:** accounts and an Academy with completion tracking
(schema migration, auth, privacy); hosted video (YouTube embedding is already
allowed by the site's security policy, and films can link their YouTube video);
translation.

## 5. Risks

Replacing navigation that readers and search engines already know; a paid
tier contradicting the public promise that everything is free; accounts
bringing personal data the site deliberately does not hold; and the brief's
scale outrunning one author's capacity to review content to the site's
standard ("never fabricate"; steelman before verdict). The mitigation in every
case is the same: change one thing at a time, behind a preview, with his
approval.

## 6. How to see the preview

On any deployment of a branch that has it (the pull request's Vercel preview,
or production once merged), open `/preview/home`. It is noindex, outside the
sitemap and search, and linked from nowhere. A bar at the top says it is a
preview and links the live homepage. Removing it is deleting
`client/src/pages/PreviewHome.tsx`, its test and one route line in
`client/src/App.tsx`.
