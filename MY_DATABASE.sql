drop database if exists final_exam;

create schema if not exists final_exam;

use final_exam;

create table if not exists user
(
    user_ID    int unsigned NOT NULL auto_increment primary key,
    first_name varchar(100) NOT NULL,
    last_name  varchar(100) NOT NULL,
    username   varchar(100) NOT NULL,
    email      varchar(100) NOT NULL unique,
    password   varchar(100) NOT NULL,
    address    varchar(100) NOT NULL
);

# create table if not exists seating_section
# (
#     seating_section_ID int NOT NULL auto_increment primary key,
#     seating_section_type varchar(50) NOT NULL
# );

create table if not exists seat
(
    seat_ID         int unsigned NOT NULL auto_increment primary key,
    price           int          NOT NULL,
    seating_section varchar(255) NOT NULL

#     FOREIGN KEY (seating_section_ID) REFERENCES seating_section (seating_section_ID)
);

create table if not exists seat_detail
(
    order_ID    int unsigned NOT NULL auto_increment primary key,
    date        datetime     NOT NULL,
    drama_title varchar(255) NOT NULL,
    seat_ID     int unsigned NOT NULL,

    FOREIGN KEY (seat_ID) REFERENCES seat (seat_ID)
);

create table if not exists reservation_list
(
    reservation_ID int unsigned NOT NULL auto_increment primary key,
    user_ID        INT unsigned NOT NULL,
    order_ID       int unsigned NOT NULL,

    FOREIGN KEY (user_ID) REFERENCES user (user_ID),
    FOREIGN KEY (order_ID) REFERENCES seat_detail (order_ID)
);

# user
insert into user (first_name, last_name, username, password, email, address) value ('first_name', 'last_name',
                                                                                    'test_user1', '123',
                                                                                    'test1@gamil.com', 'test addresses');
insert into user (first_name, last_name, username, password, email, address) value ('first_name', 'last_name',
                                                                                    'test_user2', '123',
                                                                                    'test2@gamil.com', 'test addresses');

# insert into seating_section (seating_section_type) value ('Privilege Seat');
# insert into seating_section (seating_section_type) value ('First class seat');
# insert into seating_section (seating_section_type) value ('Second class seat');
# insert into seating_section (seating_section_type) value ('Third class seat');

# seat , seat_detail
insert into seat (price, seating_section) value (300, 'Privilege Seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -1 DAY), last_insert_id(),
                                                            'test title');
insert into seat (price, seating_section) value (100, 'First class seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -1 DAY), last_insert_id(),
                                                            'test title');
insert into seat (price, seating_section) value (100, 'Second class seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -1 DAY), last_insert_id(),
                                                            'test title');
insert into seat (price, seating_section) value (100, 'Third class seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -1 DAY), last_insert_id(),
                                                            'test title');

insert into seat (price, seating_section) value (300, 'Privilege Seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -1 DAY), last_insert_id(),
                                                            'test title');
insert into seat (price, seating_section) value (100, 'First class seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -1 DAY), last_insert_id(),
                                                            'test title');
insert into seat (price, seating_section) value (100, 'Second class seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -1 DAY), last_insert_id(),
                                                            'test title');
insert into seat (price, seating_section) value (100, 'Third class seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -1 DAY), last_insert_id(),
                                                            'test title');


insert into seat (price, seating_section) value (300, 'Privilege Seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL 0 DAY), last_insert_id(),
                                                            'test title');
insert into seat (price, seating_section) value (100, 'First class seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL 0 DAY), last_insert_id(),
                                                            'test title');
insert into seat (price, seating_section) value (100, 'Second class seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL 0 DAY), last_insert_id(),
                                                            'test title');
insert into seat (price, seating_section) value (100, 'Third class seat');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL 0 DAY), last_insert_id(),
                                                            'test title');


insert into seat (price, seating_section) value (300, 'Privilege Seat');
insert into seat_detail (date, seat_ID, drama_title) value ('2022-06-20', last_insert_id(), 'test title');
insert into seat (price, seating_section) value (100, 'First class seat');
insert into seat_detail (date, seat_ID, drama_title) value ('2022-06-20', last_insert_id(), 'test title');
insert into seat (price, seating_section) value (100, 'Second class seat');
insert into seat_detail (date, seat_ID, drama_title) value ('2022-06-20', last_insert_id(), 'test title');
insert into seat (price, seating_section) value (100, 'Third class seat');
insert into seat_detail (date, seat_ID, drama_title) value ('2022-06-20', last_insert_id(), 'test title');


insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -2 DAY), 1, 'test title');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -2 DAY), 2, 'test title');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -2 DAY), 3, 'test title');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -3 DAY), 4, 'test title');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -3 DAY), 5, 'test title');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -3 DAY), 6, 'test title');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -3 DAY), 7, 'test title');
insert into seat_detail (date, seat_ID, drama_title) value (DATE_SUB(curdate(), INTERVAL -3 DAY), 8, 'test title');


# reservation system
insert into reservation_list (user_ID, order_ID) value (1, 3);
insert into reservation_list (user_ID, order_ID) value (2, 2);
insert into reservation_list (user_ID, order_ID) value (2, 13);
insert into reservation_list (user_ID, order_ID) value (2, 14);
insert into reservation_list (user_ID, order_ID) value (2, 15);
insert into reservation_list (user_ID, order_ID) value (1, 16);




