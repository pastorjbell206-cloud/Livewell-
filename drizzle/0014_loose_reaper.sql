CREATE TABLE IF NOT EXISTS `lead_magnet_signups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`magnetId` varchar(128) NOT NULL,
	`signedUpAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lead_magnet_signups_id` PRIMARY KEY(`id`),
	CONSTRAINT `lead_magnet_signups_publicId_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `team_announcements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teamId` int NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(512) NOT NULL,
	`body` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `team_announcements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `team_channels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teamId` int NOT NULL,
	`name` varchar(128) NOT NULL,
	`description` text,
	`createdByUserId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `team_channels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `team_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teamId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('pastor','elder','deacon','team_leader','member') NOT NULL DEFAULT 'member',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `team_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `team_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`channelId` int NOT NULL,
	`teamId` int NOT NULL,
	`userId` int NOT NULL,
	`body` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `team_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `team_tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teamId` int NOT NULL,
	`title` varchar(512) NOT NULL,
	`detail` text,
	`assigneeUserId` int,
	`status` enum('open','doing','done') NOT NULL DEFAULT 'open',
	`dueDate` varchar(32),
	`createdByUserId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `team_tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `teams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`slug` varchar(256) NOT NULL,
	`inviteCode` varchar(32) NOT NULL,
	`createdByUserId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `teams_id` PRIMARY KEY(`id`),
	CONSTRAINT `teams_slug_unique` UNIQUE(`slug`),
	CONSTRAINT `teams_inviteCode_unique` UNIQUE(`inviteCode`)
);
