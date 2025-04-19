CREATE DATABASE IF NOT EXISTS solo_learner;
USE solo_learner;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT (11) NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50),
    `middleName` VARCHAR(50),
    `lastName` VARCHAR(50),
    `email` VARCHAR(70) NOT NULL,
    `username` VARCHAR(70) UNIQUE NOT NULL,
    `gender` VARCHAR(30) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT FALSE,
    `password` VARCHAR(255),
    `salt` VARBINARY(255),
    `picture` VARCHAR(255),
    `isTeacher` BOOLEAN NOT NULL DEFAULT FALSE,
    `isStudent` BOOLEAN NOT NULL DEFAULT TRUE,
    `isUserLoggedIn` BOOLEAN NOT NULL DEFAULT FALSE,
    `mustChangePassword` BOOLEAN NOT NULL DEFAULT FALSE,
    `lastVisitedPath` VARCHAR(255),
    `countryName` VARCHAR(100),
    `countryFlag` VARCHAR(255),
    `phoneNumber` VARCHAR(30),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `lastActive` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TEACHERS TABLE
CREATE TABLE IF NOT EXISTS `teachers` (
    `id` INT (11) NOT NULL AUTO_INCREMENT,
    `teacherId` INT (11) NOT NULL,
    `studentCount` INT (11) DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ASSIGNMENTS TABLE (many-to-many teacher-student relation)
CREATE TABLE IF NOT EXISTS `teacher_student_assignments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `studentId` INT NOT NULL,
    `teacherId` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_assignment` (`studentId`, `teacherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TRIGGERS
DELIMITER //

-- Add teacher to teachers table on creation
CREATE TRIGGER `add_teacher_trigger` AFTER INSERT ON `users`
FOR EACH ROW
BEGIN
    IF NEW.isTeacher = TRUE THEN
        INSERT INTO `teachers` (teacherId) VALUES (NEW.id);
    END IF;
END;
//

-- Keep teacher table in sync on updates
CREATE TRIGGER `update_teacher_trigger` AFTER UPDATE ON `users`
FOR EACH ROW
BEGIN
    IF NEW.isTeacher = TRUE AND OLD.isTeacher = FALSE THEN
        INSERT INTO `teachers` (teacherId) VALUES (NEW.id);
    ELSEIF NEW.isTeacher = FALSE AND OLD.isTeacher = TRUE THEN
        DELETE FROM `teachers` WHERE `teacherId` = NEW.id;
    END IF;
END;
//

DELIMITER ;
