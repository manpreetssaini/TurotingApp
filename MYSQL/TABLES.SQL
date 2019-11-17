CREATE TABLE IF NOT EXISTS 	`students` (
	`student_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
	`dob` DATE NOT NULL,
	`image` varchar(255) NOT NULL,
    `user_name` varchar(20) NOT NULL,
    `password` varchar(12) NOT NULL,
    PRIMARY KEY (`student_id`))
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS 	`tutors` (
	`tutor_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
	`dob` DATE NOT NULL,
	`image` varchar(255) NOT NULL,
    `speciality` varchar(255) NOT NULL,
    `user_name` varchar(20) NOT NULL,
    `password` varchar(12) NOT NULL,
    PRIMARY KEY (`tutor_id`))
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1; 
 
-- add FOREIGN KEY student_id -- 
    CREATE TABLE IF NOT EXISTS `student_request` (
    `request_id` INT NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(255) NOT NULL,
    `topic` VARCHAR(255) NOT NULL,
    `description` VARCHAR(8000) NOT NULL,
    `session_length` TIME NOT NULL,
    PRIMARY KEY(`request_id`))
    Engine = InnoDB DEFAULT CHARSET= latin1 AUTO_INCREMENT=1; 

-- ADD FOREIGN KEY student_id and request_id --

    CREATE TABLE IF NOT EXISTS `student_rating` (
        `student_rating_id` INT NOT NULL,
        `rating` float NOT NULL,
        `timestamp` time NOT NULL,
        PRIMARY KEY (`student_rating_id`)
    )Engine = InnoDB DEFAULT CHARSET= latin1;

-- ADD FOREIGN KEY student_id and tutor_id --

    CREATE TABLE IF NOT EXISTS `tutoring_session` (
        `session_id` INT NOT NULL AUTO_INCREMENT,
        `session_date` DATE NOT NULL,
        PRIMARY KEY (`session_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    -- ADD FOREIGN KEY tutor_id and session_id --

    CREATE TABLE IF NOT EXISTS `tutor_rating` (
        `tutor_rating_id` INT NOT NULL,
        `rating` float NOT NULL,
        `timestamp` time NOT NULL,
        PRIMARY KEY (`tutor_rating_id`)
    )Engine = InnoDB DEFAULT CHARSET= latin1;