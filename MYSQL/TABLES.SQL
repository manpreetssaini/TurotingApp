CREATE DATABASE tutors_db;

USE tutors_db;

CREATE TABLE IF NOT EXISTS `users` (
	`user_id` int(11) AUTO_INCREMENT,
	`email` VARCHAR(50),
	`user_name` VARCHAR(50),
	`password` VARCHAR(128),
	PRIMARY KEY (user_id)) 
    Engine = InnoDB default charset = latin1 Auto_increment=1;


CREATE TABLE IF NOT EXISTS 	`students` (
	`student_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255)  NULL,
    `last_name` VARCHAR(255)  NULL,
    `city` VARCHAR(255)  NULL,
    `email` VARCHAR(255) NOT NULL,
	`dob` DATE  NULL,
	`image` varchar(255)  NULL,
    `user_name` varchar(20) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`student_id`),
    )
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS 	`tutors` (
	`tutor_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255)  NULL,
    `last_name` VARCHAR(255)  NULL,
    `city` VARCHAR(255)  NULL,
    `email` VARCHAR(255) NOT NULL,
	`dob` DATE NULL,
	`image` varchar(255)  NULL,
    `speciality` varchar(255)  NULL,
    `user_name` varchar(30) NOT NULL,
    `password` varchar(255) NOT NULL,
    `description` VARCHAR(255)  NULL,
    PRIMARY KEY (`tutor_id`)
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1; 

  CREATE TABLE IF NOT EXISTS `student_request` (
    `request_id` INT NOT NULL AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `tutor_id` INT, 
    `accepted` BOOLEAN DEFAULT 0,
    `city` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `topic` VARCHAR(255) NOT NULL,
    `description` VARCHAR(8000) NOT NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL,
    `message` VARCHAR (100),
    PRIMARY KEY(`request_id`),
    foreign key(`student_id`) references students(student_id),
    foreign key(`tutor_id`) references tutors(tutor_id))
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1; 


-- ADD FOREIGN KEY student_id and request_id --


    CREATE TABLE IF NOT EXISTS `student_rating` (
    `student_rating_id` INT NOT NULL AUTO_INCREMENT,
    `rating` float NOT NULL,
    `timestamp` DATETIME NOT NULL,
    `student_id` INT NOT NULL,
    `request_id` INT NOT NULL,
    `message` VARCHAR(255),
    PRIMARY KEY (`student_rating_id`),
    foreign key(`student_id`) references student_request(student_id),
    foreign key(`request_id`) references student_request(request_id))
    Engine = InnoDB DEFAULT CHARSET= latin1;

-- ADD FOREIGN KEY student_id and tutor_id --

    CREATE TABLE
    IF NOT EXISTS `tutoring_session`(
        `session_id` INT NOT NULL AUTO_INCREMENT,
        `session_date` DATETIME NOT NULL,
        `student_id` INT NOT NULL,
        `tutor_id` INT NOT NULL,
        PRIMARY KEY (`session_id`),
		foreign key (`student_id`) references students(student_id),
        foreign key (`tutor_id`) references tutors(tutor_id)) 
        ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ADD FOREIGN KEY tutor_id and session_id --

       CREATE TABLE IF NOT EXISTS `tutor_rating` (
        `tutor_rating_id` INT NOT NULL AUTO_INCREMENT,
        `rating` float NOT NULL,
        `timestamp` DATETIME NOT NULL,
        `tutor_id` INT NOT NULL,
        `session_id` INT NOT NULL,
        `message` VARCHAR(255),
        PRIMARY KEY (`tutor_rating_id`),
        foreign key(`tutor_id`) references tutors(tutor_id),
        foreign key(`session_id`) references student_request(request_id))
		Engine = InnoDB DEFAULT CHARSET= latin1;

        CREATE TABLE IF NOT EXISTS `rejected_requests` (
        `request_id` INT NOT NULL,
        `rejected_by` INT NOT NULL,
        FOREIGN KEY (`request_id`) REFERENCES student_request(request_id),
        FOREIGN KEY (`rejected_by`) REFERENCES tutors(tutor_id),
        PRIMARY KEY(`request_id`, `rejected_by`)
        );