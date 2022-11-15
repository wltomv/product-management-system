create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(100),
    password varchar(150),
    status bit,
    role varchar(20),
    UNIQUE (email)
);

