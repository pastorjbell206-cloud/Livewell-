# Website Board Assessments

A run of both board prompts (`BOARD-REVIEW-PROMPT.md` and `BUILD-BOARD-PROMPT.md`)
against livewellbyjamesbell.co. Board One is strategy & direction; Board Two is
features & technical health. Honest over flattering, by design.

> Status note: Board Two's "Next Sprint" (Stripe webhook, on-site email capture,
> crisis-page ethics sweep) is being implemented — see the repo history.

---

# BOARD ONE — THE ADVISORY BOARD (strategy & direction)

## 1. Board roster
- Editorial Director — guards voice and depth.
- Author-Platform Strategist — owned audience and catalog.
- Skeptic-Audience Editor — the one test: met or handled?
- Spiritual-Formation Theologian — does it form, or only inform?
- Conversion Copywriter / Funnel Architect — funnels and their ethics.
- SEO & Answer-Engine Strategist — organic and AI discovery.
- Product / UX Designer — the serious book in a quiet room.
- Pastoral-Care & Ethics Advisor — the crisis pages and the guardrails.
- Network / Distribution Lead — the PCN as the growth engine.

## 2. Stage 1 — Independent audits

**Editorial Director**
1. The catalog just tripled to ~20 ebooks; the risk is that volume reads as a content
   mill and undercuts "depth over reach" — add a visible canon/curation layer ("start
   with these three") so abundance doesn't dilute authority.
2. There is no single flagship long-form essay positioned as the front door of the
   whole worldview — the pillars are plumbing, not a doorway.
3. Nothing shows the seams of the work (a revision note, an editorial-standards page);
   for the skeptic, visible integrity is itself an argument.

**Author-Platform Strategist**
1. The newsletter lives on Substack, off-platform — the biggest leak; every essay ends
   by sending the hardest-won reader away to a list you don't own.
2. No on-site email capture with a real reason to subscribe — capture is an
   afterthought, not designed.
3. The four readers have no distinct on-ramp; a skeptic and a burned-out pastor hit
   the same homepage and nav.

**Skeptic-Audience Editor**
1. The atheism-to-faith story is the rarest asset and is buried in /about; for the
   hardest reader it should be a front-door path.
2. Stacked "Get the ebook ->" CTAs start to read as handled, not met; let the free
   sample persuade and keep the button quiet.
3. /skeptic-track exists but is not discoverable from where a skeptic actually lands.

**Spiritual-Formation Theologian**
1. Content ends at the essay; there is no "now what" formation loop to practice it.
2. /discipleship and reading paths exist but are not sequenced into a felt progression.
3. Nothing invites return on a rhythm (a weekly practice; HealWell as a cadence).

**Conversion Copywriter / Funnel Architect**
1. Membership has no legible value proposition — one sentence from recurring revenue,
   and that sentence isn't written.
2. Ebook funnels capture a buyer but never re-engage — no post-purchase sequence.
3. No free-to-paid ladder bridging free essays and $9.99 ebooks.

**SEO & Answer-Engine Strategist**
1. llms.txt / JSON-LD / sitemap are right; the gap is topical-authority clustering
   (hub-and-spoke) so engines can see the depth.
2. Ebook pages are thin on indexable text — need fuller excerpt + FAQ.
3. No content answering the exact questions skeptics type, mapped to your essays.

**Product / UX Designer**
1. Homepage strong, inner pages lag — the design system must reach essays, ebook
   pages, and tools.
2. No reading-experience layer (progress, time, save-for-later, focus) for a platform
   whose success metric is "the essay finished."
3. Mobile-first pass needed for a Facebook-sourced audience.

**Pastoral-Care & Ethics Advisor**
1. Audit crisis pages so no funnel/CTA sits where someone is in pain — an active risk
   now that monetization is on.
2. A visible path to real help on every crisis page — care before content.
3. A quiet "what we hold / what we won't teach" page builds the trust that lets a
   skeptic stay.

**Network / Distribution Lead**
1. No pastor-facing product shareable to a congregation (sermon kit, small-group
   guide) — one packaging layer from thousands of distributors.
2. No reason for a pastor to return weekly (a "this week for your people" drop).
3. No referral / "hand this to a friend" mechanism on the highest-trust artifacts.

## 3. Stage 2 — Cross-examination & resolution
- **Funnel Architect vs Skeptic Editor (CTAs):** skeptic wins the tie — free sample
  carries persuasion; one calm CTA per page; move the sell into opted-in email.
- **Strategist vs Editorial Director (Substack):** don't migrate — dual-write. Own the
  asset without breaking the channel.
- **Formation Theologian vs Designer (return rhythm):** a rhythm, but email-paced and
  unhurried; never streaks or badges.
- **SEO vs Editorial Director (question-doorways):** build them as honest full essays;
  depth and discoverability aren't in conflict when the answer is genuinely good.

## 4. Stage 3 — Roadmap (ranked by leverage)
1. Own the email list (on-site capture + welcome sequence, dual-write to Substack).
2. Four-reader on-ramps ("start here if you… don't believe / doubt / pastor / struggling").
3. Membership value proposition (write and show what a member gets, then switch on).
4. Crisis-page ethics audit (remove funnels; add visible help paths).
5. The canon layer (curated "read three things" spine over the catalog).
6. Pastor's kit packaging (essays/sermons -> small-group + sermon-prep guides).
7. Free email course -> offer (5-day skeptic/marriage course ending in an ebook).
8. Question-doorway essays (answer what skeptics actually search).
9. Topical hubs (hub-and-spoke clustering of the 160 essays).
10. Reading-experience layer (progress, time, focus, save-for-later).
11. Audio (Bell reading flagship essays/ebook samples).
12. Post-purchase sequence ("read next" + review ask).

## 5. Stage 4 — The One Thing (next 30 days)
**Own the email list.** Every day the newsletter lives only on Substack, every essay
sends your hardest-won reader off your platform to a list you don't own, and the
formation cadence, membership, and PCN drop all depend on owned email. Objection (from
the Skeptic Editor): a popup is exactly the "handled" feeling we swore off. Answer: not
a popup — one calm end-of-essay invitation with a real reason, no exit-intent, no
countdown. A reader who finished 4,000 words has already voted with their attention;
offering to continue the conversation, once, calmly, is respect, not manipulation.

---

# BOARD TWO — THE BUILD BOARD (features & technical health)

## 1. Board roster
Head of Product · Principal Full-Stack Engineer · Growth Engineer · Conversion/UX
Engineer · AI/Tools Product Engineer · Content-Systems Engineer · Data/Analytics Lead ·
Security, Privacy & Reliability Engineer · Technical-SEO/Discovery Engineer.

## 2. Stage 1 — Gap & feature map
- **Product:** owned email capture; membership entitlement mechanic; a "start here"
  four-reader router.
- **Full-Stack:** reduce two-runtime parity double-work (shared contract); an admin
  "system status" page (prices/env/DB green-red); move committed PDFs to object storage.
- **Growth:** on-site subscribe dual-writing DB + provider; referral/share-link
  attribution; a weekly PCN "for your people" drop.
- **Conversion/UX:** post-purchase cross-sell; mobile pass on cards + reading page;
  first-visit reader-type chooser.
- **AI/Tools:** one safe, on-voice tools service (grounded, cited, never fabricated);
  a "go deeper from any essay" tool; verified-store grounding for Scripture/scholars.
- **Content-Systems:** admin authoring/filing UI (no code edit to publish); site-search
  quality; reliable internal linking.
- **Data/Analytics:** depth-event instrumentation; a one-screen owner dashboard;
  ebook-funnel analytics.
- **Security/Reliability:** Stripe webhook verification; PII hygiene on the email list
  and contact form; backups + uniform DB-down fallback.
- **Technical-SEO:** fuller indexable ebook pages + FAQ schema; pillar hub pages; Core
  Web Vitals / bundle code-split.

## 3. Stage 2 — Debt & risk register (by blast radius)
1. Stripe webhook / payment-state integrity (money path — highest).
2. PII / email-list compliance (consent, retention, unsubscribe).
3. Dev/prod parity drift (prod-only 404 risk).
4. Backups & DB-down behavior.
5. Repo bloat from committed PDFs/binaries.
6. Bundle size / mobile performance.

## 4. Stage 3 — Backlog (ranked by leverage over effort)
1. On-site email capture + welcome, dual-write (M).
2. Stripe webhook -> verified paid state (M).
3. Membership entitlement + "what you get" page + gate (M).
4. Crisis-page CTA/ethics sweep + help paths (S).
5. Four-reader "start here" router (M).
6. Owner metrics dashboard (M).
7. Post-purchase cross-sell sequence (S).
8. Admin "system status" page (S).
9. Ebook pages: fuller excerpt + FAQ schema (S).
10. Pillar hub pages (M).
11. Shared safe tools service (M).
12. Reading-experience layer (M).
13. Admin authoring/filing UI (L).
14. Move PDFs to object storage (M).
15. Bundle code-split heavy routes (S).

## 5. Stage 4 — The Next Sprint (two weeks)
1. **Stripe webhook -> verified paid state.** First step: `/api/stripe/webhook` in
   api/index.ts, signature-verified, records paid sessions in a `purchases` table;
   `ebookDownload` honors that record. Check: a completed-checkout webhook (test mode)
   unlocks the download with the browser redirect blocked.
2. **On-site email capture + welcome, dual-write.** First step: extend the `subscribe`
   procedure to persist locally and call the provider; drop one calm capture at the end
   of the essay page. Check: subscribing creates a DB row + provider contact + welcome
   email; unsubscribe works.
3. **Crisis-page ethics sweep + help paths.** First step: audit /doubt, /grief, /help,
   /marriage, /plans/* — remove any purchase CTA; ensure a visible help path on each.
   Check: no crisis page carries a funnel; each links to help.

Defense against the likeliest objector (Growth Engineer, who wants capture first):
capture over a payment path that can silently lose a buyer just fills a bucket with a
hole in it — integrity first, then pour. Both ship the same sprint, so growth loses
nothing but sequence.
