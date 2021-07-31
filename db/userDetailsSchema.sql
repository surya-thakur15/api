DROP TABLE IF EXISTS `user_details`;

CREATE TABLE `user_details` (
`customer_id` int(11) NOT NULL,
`gender` ENUM('Male', 'Female'),
`region` ENUM ('East','North','South', 'West'),
`is_deleted` tinyint(1) NOT NULL DEFAULT '0',
`creation_date` datetime DEFAULT NULL,
`last_update` datetime DEFAULT NULL,
`last_updated_by` varchar(150) DEFAULT NULL,
 PRIMARY KEY (`customer_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


delimiter //
CREATE TRIGGER user_details_insert_trigger BEFORE INSERT ON user_details
FOR EACH ROW BEGIN
    SET NEW.creation_date=NOW();
    SET NEW.last_updated_by=USER();
    SET NEW.last_update=NOW();
END;//
CREATE TRIGGER user_details_update_trigger BEFORE UPDATE ON user_details
FOR EACH ROW
BEGIN
    SET NEW.last_updated_by=USER();
    SET NEW.last_update = NOW();
END;//
delimiter ;

LOAD DATA LOCAL INFILE '/home/ubuntu/DataSetInsuranceClient.csv'
INTO TABLE user_details
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@col1, @col2, @col3, @col4, @col5, @col6, @col7, @col8, @col9, @col10, @col11, @col12, @col13, @col14, @col15)
set customer_id=@col3, gender=@col12, region=@col14;

