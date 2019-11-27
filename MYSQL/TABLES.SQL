-- CREATE DATABASE tutors_db;
-- USE tutors_db;

-- CREATE TABLE IF NOT EXISTS 	`students` (
-- 	`student_id` INT NOT NULL AUTO_INCREMENT,
--     `first_name` VARCHAR(255) NOT NULL,
--     `last_name` VARCHAR(255) NOT NULL,
--     `address` VARCHAR(255) NOT NULL,
--     `city` VARCHAR(255) NOT NULL,
--     `email` VARCHAR(255) NOT NULL,
-- 	`dob` DATE NOT NULL,
-- 	`image` varchar(255) NOT NULL,
--     `user_name` varchar(20) NOT NULL,
--     `password` varchar(24) NOT NULL,
--     PRIMARY KEY (`student_id`))
--     Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1;

-- CREATE TABLE IF NOT EXISTS 	`tutors` (
-- 	`tutor_id` INT NOT NULL AUTO_INCREMENT,
--     `first_name` VARCHAR(255) NOT NULL,
--     `last_name` VARCHAR(255) NOT NULL,
--     `address` VARCHAR(255) NOT NULL,
--     `city` VARCHAR(255) NOT NULL,
--     `email` VARCHAR(255) NOT NULL,
-- 	`dob` DATE NOT NULL,
-- 	`image` varchar(255) NOT NULL,
--     `speciality` varchar(255) NOT NULL,
--     `user_name` varchar(20) NOT NULL,
--     `password` varchar(24) NOT NULL,
--     PRIMARY KEY (`tutor_id`))
--     Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1; 
 
-- -- add FOREIGN KEY student_id -- 
--     CREATE TABLE IF NOT EXISTS `student_request` (
--     `request_id` INT NOT NULL AUTO_INCREMENT,
--     `subject` VARCHAR(255) NOT NULL,
--     `topic` VARCHAR(255) NOT NULL,
--     `description` VARCHAR(8000) NOT NULL,
--     `session_length` TIME NOT NULL,
--     PRIMARY KEY(`request_id`))
--     Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1; 

-- -- ADD FOREIGN KEY student_id and request_id --

--     CREATE TABLE IF NOT EXISTS `student_rating` (
--         `student_rating_id` INT NOT NULL AUTO_INCREMENT,
--         `rating` float NOT NULL,
--         `timestamp` time NOT NULL,
--         PRIMARY KEY (`student_rating_id`),
--         FOREIGN KEY (student_id) REFERENCES students(student_id),
--         FOREIGN KEY (request_id) REFERENCES student_request(request_id)
--     )Engine = InnoDB DEFAULT CHARSET= latin1;

-- -- ADD FOREIGN KEY student_id and tutor_id --

--     CREATE TABLE IF NOT EXISTS `tutoring_session` (
--         `session_id` INT NOT NULL AUTO_INCREMENT,
--         `session_date` DATE NOT NULL,
--         PRIMARY KEY (`session_id`),
--         FOREIGN KEY (student_id) REFERENCES students(student_id),
--         FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id)
--     ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--     -- ADD FOREIGN KEY tutor_id and session_id --

--     CREATE TABLE IF NOT EXISTS `tutor_rating` (
--         `tutor_rating_id` INT NOT NULL AUTO_INCREMENT,
--         `rating` float NOT NULL,
--         `timestamp` time NOT NULL,
--         PRIMARY KEY (`tutor_rating_id`),
--         FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id),
--         FOREIGN KEY (session_id) REFERENES tutoring_session(session_id);
--     )Engine = InnoDB DEFAULT CHARSET= latin1;

    CREATE DATABASE tutors_db;

USE tutors_db;

  CREATE TABLE IF NOT EXISTS `student_request` (
    `request_id` INT NOT NULL AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `topic` VARCHAR(255) NOT NULL,
    `description` VARCHAR(8000) NOT NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL,
    PRIMARY KEY(`request_id`),
    foreign key(`student_id`) references students(student_id))
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1; 


-- ADD FOREIGN KEY student_id and request_id --


        CREATE TABLE IF NOT EXISTS `student_rating` (
        `student_rating_id` INT NOT NULL,
        `rating` float NOT NULL,
        `timestamp` DATETIME NOT NULL,
        `student_id` INT NOT NULL,
        `request_id` INT NOT NULL,
        PRIMARY KEY (`student_rating_id`),
        foreign key(`student_id`) references students(student_id),
        foreign key(`request_id`) references student_request(request_id))
        Engine = InnoDB DEFAULT CHARSET= latin1;

-- ADD FOREIGN KEY student_id and tutor_id --

    CREATE TABLE IF NOT EXISTS `tutoring_session` (
        `session_id` INT NOT NULL AUTO_INCREMENT,
        `session_date` DATETIME NOT NULL,
        `student_id` INT NOT NULL,
        `tutor_id` INT NOT NULL,
        PRIMARY KEY (`session_id`),
		foreign key(`student_id`) references students(student_id),
        foreign key(`tutor_id`) references tutors(tutor_id)) 
        ENGINE=InnoDB DEFAULT CHARSET=latin1;

    -- ADD FOREIGN KEY tutor_id and session_id --

       CREATE TABLE IF NOT EXISTS `tutor_rating` (
        `tutor_rating_id` INT NOT NULL,
        `rating` float NOT NULL,
        `timestamp` DATETIME NOT NULL,
        `tutor_id` INT NOT NULL,
        `session_id` INT NOT NULL,
        PRIMARY KEY (`tutor_rating_id`),
        foreign key(`tutor_id`) references tutors(tutor_id),
        foreign key(`session_id`) references tutoring_session(session_id))
		Engine = InnoDB DEFAULT CHARSET= latin1;
        