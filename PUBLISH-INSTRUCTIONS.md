# How to publish the 306 finished articles (2-minute job for a developer)

**For: whoever helps James with the LiveWell website.**
**What this does:** 306 published articles on livewellbyjamesbell.co currently have
empty or very short bodies. This loads full, 1,500+ word bodies (already written and
reviewed, in `content/full/`) into the live `posts` table, matched by slug.

It updates **only** each post's `body` and `readingTimeMinutes` (and `updatedAt`).
It does **not** change titles, slugs, published status, pillars, excerpts, or anything
else. It writes a **rollback file before any change**, so the whole thing is reversible
with one command.

---

## Prerequisites
- Node 18+ and `pnpm` (or `npm`).
- This repository, on branch **`claude/clean-essay-drafts`**.
- The **`DATABASE_URL`** value from Vercel (Project → Settings → Environment Variables →
  `DATABASE_URL` → Copy Value). It looks like `mysql://user:pass@host/db?ssl=...`.

## Steps

```bash
# 1. Get the code on the branch
git clone <the LiveWell repo URL>
cd Livewell-
git checkout claude/clean-essay-drafts

# 2. Install dependencies
pnpm install            # or: npm install

# 3. Put the DB connection string in a local .env (this file is gitignored)
echo 'DATABASE_URL="<paste the mysql:// value from Vercel here>"' > .env

# 4. DRY RUN — changes nothing. Should report "matched 306 ... 0 not found".
node scripts/publish-full-content.mjs

# 5. TEST ONE ARTICLE first (optional but recommended).
#    Writes a rollback file, updates a single post, prints the restore command.
node scripts/publish-full-content.mjs --apply --only=church-death-penalty
#    ^ replace with any slug from content/full/. Verify it on the live site.

# 6. FULL RUN — publishes all 306. Saves a rollback file FIRST, then updates.
node scripts/publish-full-content.mjs --apply
```

## To undo (rollback)
Every `--apply` run prints a line like:
```
ROLLBACK SAVED (before any write): scripts/.publish-backup-<timestamp>.json
```
To put everything back exactly as it was:
```bash
node scripts/publish-full-content.mjs --restore=scripts/.publish-backup-<timestamp>.json
```

## After publishing
- Spot-check a few articles on the live site.
- `content/CITATIONS-TO-VERIFY.md` lists ~595 `[cite — confirm]` markers in the new
  text (statistics/quotes that should be verified). They are flagged inline in the
  articles too; verify and remove the markers as you confirm each.
- Security: the `DATABASE_URL` is a production secret. After this is done, consider
  rotating the database password in Vercel, and delete the local `.env`.

## Questions about the content itself
The 306 articles are in `content/full/<slug>.md`. Each is the publish-ready body for the
post with that slug. They were written in James's voice and checked to be ≥1,500 words
with no forbidden language.
