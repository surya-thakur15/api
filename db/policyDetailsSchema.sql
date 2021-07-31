DROP TABLE IF EXISTS `policy_details`;

CREATE TABLE `policy_details` (
`policy_id` int(11) NOT NULL,
`date_of_purchase` date DEFAULT NULL,
`customer_id` int(11) NOT NULL,
`fuel` ENUM('CNG', 'Diesel', 'Petrol'),
`vehicle_segment` ENUM('A', 'B', 'C'),
`premium` varchar(8) DEFAULT NULL,
`bodily_injury_liability` tinyint(1) DEFAULT '0',
`personal_injury_protection` tinyint(1) DEFAULT '0',
`property_damage_liability` tinyint(1) DEFAULT '0',
`collision` tinyint(1) DEFAULT '0',
`comprehensive` tinyint(1) DEFAULT '0',
`income_group` varchar(24),
`marital_status` tinyint(1) DEFAULT '0',
`is_deleted` tinyint(1) NOT NULL DEFAULT '0',
`creation_date` datetime DEFAULT NULL,
`last_update` datetime DEFAULT NULL,
`last_updated_by` varchar(150) DEFAULT NULL,
PRIMARY KEY (`policy_id`),
CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES project.user_details (customer_id) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


delimiter //
CREATE TRIGGER policy_details_insert_trigger BEFORE INSERT ON policy_details
FOR EACH ROW BEGIN
    SET NEW.creation_date=NOW();
    SET NEW.last_updated_by=USER();
    SET NEW.last_update=NOW();
END;//
CREATE TRIGGER policy_details_update_trigger BEFORE UPDATE ON policy_details
FOR EACH ROW
BEGIN
    SET NEW.last_updated_by=USER();
    SET NEW.last_update = NOW();
END;//
delimiter ;

LOAD DATA LOCAL INFILE '/home/ubuntu/DataSetInsuranceClient.csv'
INTO TABLE policy_details
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@col1, @col2, @col3, @col4, @col5, @col6, @col7, @col8, @col9, @col10, @col11, @col12, @col13, @col14, @col15)
set policy_id=@col1, date_of_purchase= STR_TO_DATE(@col2, '%m/%d/%Y'), customer_id=@col3, fuel=@col4, vehicle_segment=@col5, 
premium=@col6, bodily_injury_liability=@col7, personal_injury_protection=@col8, property_damage_liability=@col9, 
collision=@col10, comprehensive=@col11, income_group=@col13, marital_status=@col15;

