CREATE TABLE `author_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`bio` text,
	`photoUrl` text,
	`website` varchar(512),
	`twitter` varchar(128),
	`instagram` varchar(128),
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `author_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `author_profiles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `book_bundles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`slug` varchar(256) NOT NULL,
	`description` text,
	`coverImage` text,
	`discountPercent` int NOT NULL DEFAULT 0,
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `book_bundles_id` PRIMARY KEY(`id`),
	CONSTRAINT `book_bundles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `bundle_books` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bundleId` int NOT NULL,
	`bookId` int NOT NULL,
	`orderInBundle` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bundle_books_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `featured_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`curatorNote` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `featured_articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `featured_articles_postId_unique` UNIQUE(`postId`)
);
--> statement-breakpoint
CREATE TABLE `reading_path_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pathId` int NOT NULL,
	`postId` int NOT NULL,
	`orderInPath` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reading_path_articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reading_paths` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`slug` varchar(256) NOT NULL,
	`description` text,
	`icon` varchar(64),
	`persona` varchar(128),
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reading_paths_id` PRIMARY KEY(`id`),
	CONSTRAINT `reading_paths_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `related_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`relatedPostId` int NOT NULL,
	`relevanceScore` int NOT NULL DEFAULT 3,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `related_articles_id` PRIMARY KEY(`id`)
);
