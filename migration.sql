create table users
(
    id         int auto_increment primary key,
    name       varchar(50)  not null,
    email      varchar(100) not null,
    password   varchar(255) not null,
    created_at timestamp default CURRENT_TIMESTAMP null,
    constraint email unique (email)
);

