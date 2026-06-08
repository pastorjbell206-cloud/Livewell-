-- Two-level taxonomy: add sub-pathway + series flag to posts.
-- Additive and safe: no existing column is altered, no row is changed.
-- Run directly, OR let `pnpm db:push` (drizzle-kit generate && migrate) produce
-- the official migration from the updated drizzle/schema.ts.

ALTER TABLE `posts` ADD COLUMN `subPathway` varchar(128) NULL;
ALTER TABLE `posts` ADD COLUMN `isSeries` boolean NOT NULL DEFAULT false;
