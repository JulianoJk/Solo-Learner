-- Create the db you need
CREATE DATABASE IF NOT EXISTS clients;

-- Use the db you created
USE clients;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255),
  `isAdmin` BOOLEAN NOT NULL DEFAULT FALSE,
  `password` VARCHAR(255) NOT NULL,
  `salt` VARBINARY(255) NOT NULL,
  `isTeacher` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- This creates a table with columns for a unique ID, username, password, email, and timestamps for when the user was created and last updated. The SERIAL data type is used for the ID column to automatically generate a unique ID for each new user.