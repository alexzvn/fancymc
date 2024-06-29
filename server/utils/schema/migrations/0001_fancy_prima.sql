ALTER TABLE `fancy_forgot_passwords` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `fancy_sessions` MODIFY COLUMN `id` bigint unsigned AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `fancy_forgot_passwords` ADD `user_id` mediumint NOT NULL;--> statement-breakpoint
ALTER TABLE `fancy_sessions` ADD `user_id` mediumint NOT NULL;