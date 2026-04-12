CREATE TABLE `reading_list_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`readingListId` int NOT NULL,
	`postId` int NOT NULL,
	`orderInList` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reading_list_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reading_lists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`slug` varchar(256) NOT NULL,
	`description` text,
	`coverImage` text,
	`difficulty` enum('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner',
	`estimatedHours` int,
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reading_lists_id` PRIMARY KEY(`id`),
	CONSTRAINT `reading_lists_slug_unique` UNIQUE(`slug`)
);
