CREATE TABLE `book_purchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookId` int NOT NULL,
	`stripePaymentIntentId` varchar(256) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerName` varchar(256),
	`amountCents` int NOT NULL,
	`status` enum('pending','succeeded','failed') NOT NULL DEFAULT 'pending',
	`sessionId` varchar(256),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `book_purchases_id` PRIMARY KEY(`id`),
	CONSTRAINT `book_purchases_stripePaymentIntentId_unique` UNIQUE(`stripePaymentIntentId`)
);
--> statement-breakpoint
CREATE TABLE `email_campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`type` enum('welcome','digest','manual','article_notification') NOT NULL,
	`subject` varchar(512) NOT NULL,
	`htmlBody` text NOT NULL,
	`status` enum('draft','scheduled','sent','failed') NOT NULL DEFAULT 'draft',
	`sentCount` int NOT NULL DEFAULT 0,
	`scheduledAt` timestamp,
	`sentAt` timestamp,
	`relatedArticleId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_campaigns_id` PRIMARY KEY(`id`)
);
