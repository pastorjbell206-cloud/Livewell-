-- 0016_posts_indexes.sql
--
-- Adds secondary indexes on `posts` so the hot query paths stop full-scanning.
-- The published list (filter by published, order by publishedAt), the homepage
-- featured lookup (published + featured), and the /writing track + topic facet
-- filters all currently scan every row. These indexes match those access
-- patterns. Mirrors the index() definitions added to drizzle/schema.ts.
--
-- Apply manually, ONCE:
--   mysql -h <host> -u <user> -p <db> < drizzle/0016_posts_indexes.sql
--
-- MySQL does NOT support `CREATE INDEX ... IF NOT EXISTS`, so these statements
-- are not guarded. Before running, confirm the indexes don't already exist:
--   SHOW INDEX FROM posts;
-- If a re-run is needed, drop first:
--   ALTER TABLE posts DROP INDEX posts_published_published_at_idx;
--   ALTER TABLE posts DROP INDEX posts_published_featured_idx;
--   ALTER TABLE posts DROP INDEX posts_pillar_idx;
--   ALTER TABLE posts DROP INDEX posts_topic_idx;
--
-- This file is not in the drizzle-kit journal on purpose — the journal is
-- managed by `pnpm db:push` and adding hand-authored migrations there can
-- corrupt the meta snapshot.

-- Published list ordering: WHERE published = 1 ORDER BY publishedAt DESC.
CREATE INDEX posts_published_published_at_idx ON posts (published, publishedAt);

-- Featured-post lookup: WHERE published = 1 AND featured = 1.
CREATE INDEX posts_published_featured_idx ON posts (published, featured);

-- Track/pillar filtering on /writing.
CREATE INDEX posts_pillar_idx ON posts (pillar);

-- Topic facet filtering.
CREATE INDEX posts_topic_idx ON posts (topic);
