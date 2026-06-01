-- 0014_fulltext_search.sql
--
-- Adds FULLTEXT indexes on posts and books so search can return ranked,
-- relevance-scored results instead of LIKE %query% in date order.
--
-- After applying, the search service uses MATCH/AGAINST with a relevance
-- score for ranking. See server/search-service.ts.
--
-- Apply manually:
--   mysql -h <host> -u <user> -p <db> < drizzle/0014_fulltext_search.sql
--
-- This file is not in the drizzle-kit journal on purpose — the journal is
-- managed by `pnpm db:push` and adding hand-authored migrations there can
-- corrupt the meta snapshot.

-- Drop existing indexes if re-running.
ALTER TABLE posts DROP INDEX IF EXISTS ft_posts_search;
ALTER TABLE books DROP INDEX IF EXISTS ft_books_search;

-- Posts: title carries the most weight, then excerpt, then body.
ALTER TABLE posts
  ADD FULLTEXT INDEX ft_posts_search (title, excerpt, body);

-- Books: shorter index — most book content lives in PDF/print, not the DB.
ALTER TABLE books
  ADD FULLTEXT INDEX ft_books_search (title, description, sampleExcerpt);
