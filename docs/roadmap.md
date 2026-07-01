# LiveWell — Roadmap to Elite

One shared plan. Ordered by leverage: top items change the most for the least
effort. Status reflects the `claude/charming-cori-Xnsky` branch (PR #102).

## Tier 0 — Ship what's built
- [ ] Review preview, mark **PR #102** ready, merge to `main` → Vercel deploys.
- [ ] Run a **live Lighthouse** pass on the deployed URL; confirm 95+ / WCAG AA.

## Tier 1 — Own the asset (highest non-visual leverage)
- [ ] **Export the Substack subscriber list** on a schedule into our own DB.
- [ ] Confirm **DNS + Vercel project ownership** sit with James, not a contractor.
- [ ] **Automated database backups** (161 essays + the book).

## Tier 2 — Finish the focus
- [ ] **Import the 12 Blind Spots chapters** from the Substack export (needs export + DB write). Flip `available: true` per chapter in `lib/blindSpots.ts` as each lands.
- [ ] Decide the fate of the sprawl (15 tools, quizzes, marriage/parenting): keep a maintained few or retire the rest. Pages are already off the primary nav.
- [ ] Make the **site canonical** for the book; point Substack at it.

## Tier 3 — The content engine
- [x] Voice-audit tooling built (`scripts/voice-audit.mjs`, `scripts/db-export-essays.mjs`).
- [ ] Run the **full corpus voice audit** (needs read-only DB), then lightest-touch edits, one essay at a time, with sign-off.
- [x] **Book progress marker** on Start Here ("N of 12 chapters live").
- [ ] Hold a **visible weekly cadence** (the homepage promises it).

## Tier 4 — Convert and keep readers
- [x] **After-reading moment** — "continue the series" step at the end of every essay.
- [ ] **Lead magnet** — the Blind Spots preface as a PDF for an email (needs the preface text).
- [ ] **Segment-on-signup end to end** — skeptic/Christian/pastor each get a distinct welcome sequence (needs an email provider/API).
- [x] Analytics — Vercel Analytics already in place (privacy-friendly); no second tracker.

## Tier 5 — Technical excellence and monetization
- [ ] **Unify the `posts` / `articles` backends** (start with the Step-0 investigation; needs DB).
- [ ] **Turn on Stripe** for membership/books once cadence + owned list are in place (needs API keys).
- [ ] **Search quality** — find an essay by topic, scholar, or Scripture passage.

## If you do only three things
1. Merge PR #102 and deploy.
2. Own your list and back up your content.
3. Import the book and hold a weekly cadence.
