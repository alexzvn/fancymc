CREATE TABLE `fancy_attends` (
	`id` mediumint NOT NULL,
	`updated_at` datetime,
	CONSTRAINT `fancy_attends_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fancy_forgot_passwords` (
	`id` mediumint NOT NULL,
	`token` text,
	CONSTRAINT `fancy_forgot_passwords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fancy_sessions` (
	`id` mediumint NOT NULL,
	`updated_at` datetime,
	CONSTRAINT `fancy_sessions_id` PRIMARY KEY(`id`)
);
