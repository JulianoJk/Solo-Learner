-- Create the db you need
CREATE DATABASE IF NOT EXISTS solo_learner;

-- Use the db you created
USE solo_learner;

CREATE TABLE
    IF NOT EXISTS `users` (
        `id` INT (11) NOT NULL AUTO_INCREMENT,
        `firstName` VARCHAR(50),
        `lastName` VARCHAR(50),
        `email` VARCHAR(70) NOT NULL,
        `username` VARCHAR(70) UNIQUE NOT NULL,
        `gender` VARCHAR(30) NOT NULL,
        `isAdmin` BOOLEAN NOT NULL DEFAULT FALSE,
        `password` VARCHAR(50),
        `salt` VARBINARY(255),
        `picture` VARCHAR(255),
        `isTeacher` BOOLEAN NOT NULL DEFAULT FALSE,
        `isStudent` BOOLEAN NOT NULL DEFAULT TRUE,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `lastActive` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `email` (`email`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    IF NOT EXISTS `teachers` (
        `id` INT (11) NOT NULL AUTO_INCREMENT,
        `teacherId` INT (11) NOT NULL,
        `studentCount` INT (11) DEFAULT 0,
        PRIMARY KEY (`id`),
        FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    IF NOT EXISTS `students` (
        `id` INT (11) NOT NULL AUTO_INCREMENT,
        `userId` INT (11) NOT NULL,
        `teacherId` INT (11),
        PRIMARY KEY (`id`),
        FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
        FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Trigger to automatically add teacher to teachers table
DELIMITER / / CREATE TRIGGER `add_teacher_trigger` AFTER INSERT ON `users` FOR EACH ROW BEGIN IF NEW.isTeacher = TRUE THEN
INSERT INTO
    `teachers` (teacherId)
VALUES
    (NEW.id);

END IF;

END / / DELIMITER;

-- Trigger to automatically update teacher in teachers table
DELIMITER / / CREATE TRIGGER `update_teacher_trigger` AFTER
UPDATE ON `users` FOR EACH ROW BEGIN IF NEW.isTeacher = TRUE
AND OLD.isTeacher = FALSE THEN
INSERT INTO
    `teachers` (teacherId)
VALUES
    (NEW.id);

ELSEIF NEW.isTeacher = FALSE
AND OLD.isTeacher = TRUE THEN
DELETE FROM `teachers`
WHERE
    `teacherId` = NEW.id;

END IF;

END / / DELIMITER;

-- Trigger to automatically add student to students table
DELIMITER / / CREATE TRIGGER `add_student_trigger` AFTER INSERT ON `users` FOR EACH ROW BEGIN IF NEW.isStudent = TRUE THEN
INSERT INTO
    `students` (userId)
VALUES
    (NEW.id);

UPDATE `teachers`
SET
    `studentCount` = `studentCount` + 1
WHERE
    `teacherId` = NEW.id;

END IF;

END / / DELIMITER;

-- Trigger to automatically update student in students table
DELIMITER / / CREATE TRIGGER `update_student_trigger` AFTER
UPDATE ON `users` FOR EACH ROW BEGIN IF NEW.isStudent = TRUE
AND OLD.isStudent = FALSE THEN
INSERT INTO
    `students` (userId)
VALUES
    (NEW.id);

UPDATE `teachers`
SET
    `studentCount` = `studentCount` + 1
WHERE
    `teacherId` = NEW.id;

ELSEIF NEW.isStudent = FALSE
AND OLD.isStudent = TRUE THEN
DELETE FROM `students`
WHERE
    `userId` = NEW.id;

UPDATE `teachers`
SET
    `studentCount` = `studentCount` - 1
WHERE
    `teacherId` = NEW.id;

END IF;

END / / DELIMITER;

-- Trigger to automatically update studentCount in teachers table
DELIMITER / / CREATE TRIGGER `update_student_count_trigger` AFTER INSERT ON `students` FOR EACH ROW BEGIN
UPDATE `teachers`
SET
    `studentCount` = `studentCount` + 1
WHERE
    `teacherId` = NEW.teacherId;

END / / DELIMITER;

-- Trigger to automatically decrement studentCount in teachers table on student deletion
DELIMITER / / CREATE TRIGGER `decrement_student_count_trigger` AFTER DELETE ON `students` FOR EACH ROW BEGIN
UPDATE `teachers`
SET
    `studentCount` = `studentCount` - 1
WHERE
    `teacherId` = OLD.teacherId;

END / / DELIMITER;
