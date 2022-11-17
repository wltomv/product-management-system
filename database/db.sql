create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(100),
    password varchar(150),
    status bool,
    role varchar(20),
    UNIQUE (email)
);

create table Category(
    id int NOT NULL AUTO_INCREMENT,
    category varchar(255) NOT NULL,
    primary key(id)
);

create table product (
    id int NOT NULL AUTO_INCREMENT,
    product varchar(255) NOT NULL,
    categoryId integer NOT NULL, 
    description varchar(255),
    price DECIMAL(6,2), 
    status bool,
    PRIMARY KEY(id),
    FOREIGN KEY(categoryId) REFERENCES Category(id)
);