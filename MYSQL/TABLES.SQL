CREATE DATABASE tutors_db;

USE tutors_db;

CREATE TABLE
IF NOT EXISTS `students`
(
	`student_id` int AUTO_INCREMENT,
	`email` VARCHAR
(50) NOT NULL,
	`username` VARCHAR
(50) NOT NULL,
	`password` VARCHAR
(128) NOT NULL,
	PRIMARY KEY
(student_id)) 
    Engine = InnoDB default charset = latin1 Auto_increment=1;

CREATE TABLE
IF NOT EXISTS `tutors`
(
	`tutor_id` int AUTO_INCREMENT,
	`email` VARCHAR
(50) NOT NULL,
	`username` VARCHAR
(50) NOT NULL,
	`password` VARCHAR
(128) NOT NULL,
	PRIMARY KEY
(tutor_id)) 
    Engine = InnoDB default charset = latin1 Auto_increment=1;


CREATE TABLE
IF NOT EXISTS 	`students`
(
	`student_id` INT NOT NULL auto_increment,
    `first_name` VARCHAR
(255) NOT NULL,
    `last_name` VARCHAR
(255) NOT NULL,
    `city` VARCHAR
(255) NOT NULL,
	`dob` DATE NOT NULL,
	`image` varchar
(255),
    `user_id` INT,
    PRIMARY KEY
(`student_id`),
    foreign key
(`user_id`) REFERENCES `users`
(`user_id`))
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1;


CREATE TABLE
IF NOT EXISTS 	`tutors`
(
	`tutor_id` INT NOT NULL auto_increment,
    `first_name` VARCHAR
(255) NOT NULL,
    `last_name` VARCHAR
(255) NOT NULL,
    `city` VARCHAR
(255) NOT NULL,
	`image` varchar
(255),
    `speciality` varchar
(255) NOT NULL,
    `description` VARCHAR
(100) NOT NULL,
    `user_id` int,
    PRIMARY KEY
(`tutor_id`),
    foreign key
(`user_id`) REFERENCES `users`
(`user_id`))
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1;

CREATE TABLE
IF NOT EXISTS `student_request`
(
    `request_id` INT NOT NULL AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `accepted` BOOLEAN DEFAULT 0,
    `city` VARCHAR
(255) NOT NULL,
    `subject` VARCHAR
(255) NOT NULL,
    `topic` VARCHAR
(255) NOT NULL,
    `description` VARCHAR
(8000) NOT NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL,
    `message` VARCHAR
(100),
    PRIMARY KEY
(`request_id`),
    foreign key
(`student_id`) references students
(student_id))
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1;


-- ADD FOREIGN KEY student_id and request_id --


CREATE TABLE
IF NOT EXISTS `student_rating`
(
    `student_rating_id` INT NOT NULL,
    `rating` float NOT NULL,
    `timestamp` DATETIME NOT NULL,
    `student_id` INT NOT NULL,
    `request_id` INT NOT NULL,
    PRIMARY KEY
(`student_rating_id`),
    foreign key
(`student_id`) references students
(student_id),
    foreign key
(`request_id`) references student_request
(request_id))
    Engine = InnoDB DEFAULT CHARSET= latin1;

-- ADD FOREIGN KEY student_id and tutor_id --

CREATE TABLE
IF NOT EXISTS `tutoring_session`
(
        `session_id` INT NOT NULL AUTO_INCREMENT,
        `session_date` DATETIME NOT NULL,
        `student_id` INT NOT NULL,
        `tutor_id` INT NOT NULL,
        PRIMARY KEY
(`session_id`),
		foreign key
(`student_id`) references students
(student_id),
        foreign key
(`tutor_id`) references tutors
(tutor_id)) 
        ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ADD FOREIGN KEY tutor_id and session_id --

CREATE TABLE
IF NOT EXISTS `tutor_rating`
(
        `tutor_rating_id` INT NOT NULL,
        `rating` float NOT NULL,
        `timestamp` DATETIME NOT NULL,
        `tutor_id` INT NOT NULL,
        `session_id` INT NOT NULL,
        PRIMARY KEY
(`tutor_rating_id`),
        foreign key
(`tutor_id`) references tutors
(tutor_id),
        foreign key
(`session_id`) references tutoring_session
(session_id))
		Engine = InnoDB DEFAULT CHARSET= latin1;


CREATE TABLE
IF NOT EXISTS `rejected_requests`
(
	`request_id` INT NOT NULL,
    `rejected_by` INT NOT NULL,
    FOREIGN KEY
(`request_id`) REFERENCES student_request
(request_id),
    FOREIGN KEY
(`rejected_by`) REFERENCES tutors
(tutor_id),
    PRIMARY KEY
(`request_id`, `rejected_by`)
    );