-- 0015_backfill_taxonomy.sql
--
-- Backfills `posts.pillar` with canonical track slugs based on the legacy
-- values. Idempotent — safe to re-run. Mirrors the LEGACY_PILLAR_MAP in
-- `client/src/lib/taxonomy.ts`.
--
-- Apply manually:
--   mysql -h <host> -u <user> -p <db> < drizzle/0015_backfill_taxonomy.sql
--
-- After this runs, the new <TrackChip> + /writing track filters resolve
-- correctly against historical content. No data is destroyed; legacy
-- strings are mapped, not deleted.

-- 1. Old verbose pillar names → canonical track slugs
UPDATE posts SET pillar = 'after-christendom'   WHERE pillar = 'Prophetic Disruption';
UPDATE posts SET pillar = 'prophetic-justice'   WHERE pillar = 'Prophetic Justice';
UPDATE posts SET pillar = 'theology'            WHERE pillar = 'Theological Depth';
UPDATE posts SET pillar = 'pastoral-ministry'   WHERE pillar = 'Leadership Formation';
UPDATE posts SET pillar = 'marriage'            WHERE pillar = 'Integrated Life';

-- 2. Legacy `topic` enum values that ended up in `pillar`
UPDATE posts SET pillar = 'prophetic-justice'   WHERE pillar = 'justice';
UPDATE posts SET pillar = 'pastoral-ministry'   WHERE pillar = 'leadership';
UPDATE posts SET pillar = 'devotionals'         WHERE pillar = 'spiritual-formation';
UPDATE posts SET pillar = 'pastoral-ministry'   WHERE pillar IN ('church-health', 'pastoral-care');
UPDATE posts SET pillar = 'marriage'            WHERE pillar = 'personal-growth';

-- 3. Default any remaining NULLs to theology (the safest broad bucket)
UPDATE posts SET pillar = 'theology' WHERE pillar IS NULL OR pillar = '';

-- 4. Report distribution
SELECT pillar, COUNT(*) AS n FROM posts GROUP BY pillar ORDER BY n DESC;
