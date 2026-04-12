ALTER TABLE `posts` ADD `topic` enum('justice','leadership','spiritual-formation','church-health','personal-growth','pastoral-care');--> statement-breakpoint
ALTER TABLE `posts` ADD `format` enum('article','book-chapter','study-guide','sermon-series','devotional','podcast') DEFAULT 'article' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `audience` enum('pastors','church-leaders','small-groups','individuals','couples') DEFAULT 'individuals' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `difficulty` enum('beginner','intermediate','advanced') DEFAULT 'intermediate' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `readingTimeMinutes` int DEFAULT 5 NOT NULL;