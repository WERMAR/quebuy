use qb;

create table user
(
    id                 bigint UNSIGNED  not null auto_increment,
    username           varchar(30)      not null,
    password           varchar(255)     not null,
    firstname          varchar(30)      not null,
    lastname           varchar(40)      not null,
    mail               varchar(40)      not null,
    gender             tinyint unsigned not null,
    birthdate          date             not null,
    location           bigint unsigned  not null,
    organization       bigint UNSIGNED  null,
    organization_admin boolean          not null,
    user_role          tinyint unsigned not null,

    -- primary key
    constraint pk__user_id primary key user (id)
);

create table gender_type
(
    id   tinyint unsigned not null auto_increment,
    name varchar(1)       not null,

    -- primary key
    constraint pk__gender_type_id primary key gender_type (id)
);

create table user_role
(
    id   tinyint UNSIGNED not null auto_increment,
    name varchar(30)      not null,

    -- primary key
    constraint pk__user_role_id primary key user_role (id)
);

create table advert
(
    id                bigint unsigned  not null auto_increment,
    organization      bigint unsigned  not null,
    start_time        date             not null,
    short_description varchar(100)     not null,
    long_description  varchar(512)     not null,
    location          bigint unsigned  not null,
    advert_type       tinyint unsigned not null,
    delete_flag       tinyint unsigned not null,

    -- primary key
    constraint pk__advert_id primary key advert (id)
);

create table advert_type
(
    id   tinyint unsigned not null auto_increment,
    name varchar(100)     not null,

    -- primary key
    constraint pk__advert_type__id primary key advert_type (id)
);


create table poi
(
    id       bigint unsigned not null auto_increment,
    location POINT SRID 4326 not null,
    name     varchar(200)    not null,
    hotspot  boolean         not null,

    -- primary key
    constraint pk__poi primary key poi (id),
    SPATIAL INDEX (location)
);

create table poi_2_advert
(
    id     bigint unsigned not null auto_increment,
    poi    bigint unsigned not null,
    advert bigint unsigned not null,

    -- primary key
    constraint pk__poi_2_advert__id primary key poi_2_advert (id)
);

create table organization
(
    id                         bigint unsigned  not null auto_increment,
    organization_name          varchar(255)     not null,
    telephone_number           varchar(255)     not null,
    mail                       varchar(255)     not null,
    ust_id                     varchar(14)      not null,
    commercial_register_number varchar(30)      not null,
    trade_licence              bigint unsigned  not null,
    location                   bigint unsigned  not null,
    organization_type          tinyint unsigned not null,
    custom_question            varchar(255)     null,
    branch                     tinyint unsigned not null,
    legal_form                 tinyint unsigned not null,
    logo                       bigint unsigned  not null,

    -- primary key
    constraint pk__organization_id primary key organization (id)
);

create table opening_hours
(
    id           bigint unsigned not null auto_increment,
    organization bigint unsigned not null,
    weekday      varchar(15)     not null,
    open_time    timestamp       null,
    close_time   timestamp       null,
    closed       boolean         not null,

    -- primary key
    constraint pk__openinghours_id primary key opening_hours (id)
);

create table organization_type
(
    id   tinyint unsigned not null auto_increment,
    name varchar(50)      not null,

    -- primary key
    constraint pk__organization_type_id primary key organization_type (id)
);

create table branch
(
    id   tinyint unsigned not null auto_increment,
    name varchar(50)      not null,

    -- primary key
    constraint pk__branch_id primary key branch (id)
);

create table legal_form
(
    id   tinyint unsigned not null auto_increment,
    name varchar(50)      not null,

    -- primary key
    constraint pk__legal_form__id primary key legal_form (id)
);

create table user_2_advert
(
    id          bigint unsigned not null auto_increment,
    user        bigint unsigned not null,
    advert      bigint unsigned not null,
    delete_flag boolean         not null,

    -- primary key
    constraint pk__user2advert__id primary key user_2_advert (id)
);

create table voucher_history
(
    id           bigint unsigned not null auto_increment,
    organization bigint unsigned not null,
    advert       bigint unsigned not null,
    mail_check   boolean         not null,

    -- primary key
    constraint pk__voucherhistory__id primary key voucher_history (id)
);

create table location
(
    id           bigint UNSIGNED not null auto_increment,
    street_name  varchar(100)    not null,
    postcode     varchar(10)     not null,
    village      varchar(100)    not null,
    country_name varchar(100)    not null,

    -- primary key
    constraint pk__location_id primary key location (id)
);

create table advert_2_file
(
    id     bigint unsigned not null auto_increment,
    advert bigint unsigned not null,
    file   bigint unsigned not null,

    -- primary key
    constraint pk__advert_photos_id primary key advert_type (id)
);

create table file
(
    id        bigint unsigned not null auto_increment,
    file_name varchar(255)    not null,

    -- primary key
    constraint pk__files_id primary key files (id)
);

-- Add to all tables the missing foreign key-constraints
alter table user
    add constraint fk__user_organization__organization_id foreign key user (organization) references organization (id),
    add constraint fk__user_userrole__userrole_id foreign key user (user_role) references user_role (id),
    add constraint fk__user_gender__gender_type_id foreign key user (gender) references gender_type (id),
    add constraint fk__user_location__location_id foreign key user (location) references location (id);

alter table voucher_history
    add constraint fk__voucherHistory__advert_id foreign key voucher_history (advert) references advert (id),
    add constraint fk__voucherHistory__organization_id foreign key voucher_history (organization) references organization (id);

alter table advert
    add constraint fk__advert_advert_type__advert_type_id foreign key advert (advert_type) references advert_type (id),
    add constraint fk__advert_location__location_id foreign key advert (location) references location (id),
    add constraint fk__advert_organization__organization_id foreign key advert (organization) references organization (id);

alter table advert_2_file
    add constraint fk__advert2Files__files_id foreign key advert_2_file (file) references file (id),
    add constraint fk__advert2Files__advert_id foreign key advert_2_file (advert) references advert (id);

alter table user_2_advert
    add constraint fk__user2advert__user_id foreign key user_2_advert (user) references user (id),
    add constraint fk__user2advert__advert_id foreign key user_2_advert (advert) references advert (id);

alter table organization
    add constraint fk__organization_location__location_id foreign key organization (location) references location (id),
    add constraint fk__organization_organization_type__organization_type foreign key organization (organization_type) references organization_type (id),
    add constraint fk__organization_branch__branch_id foreign key organization (branch) references branch (id),
    add constraint fk__organization_logo__files_id foreign key organization (logo) references file (id),
    add constraint fk__organization_legalForm__legalForm_id foreign key organization (legal_form) references legal_form (id),
    add constraint fk__organization_tradeLicence__files_id foreign key organization (trade_licence) references file (id);

alter table opening_hours
    add constraint fk__opening_hours__organization_id foreign key opening_hours (organization) references organization (id);

alter table poi_2_advert
    add constraint fk__poi2advert_advertId__advert foreign key poi_2_advert (advert) references advert (id),
    add constraint fk__poi2advert_advertId__poi foreign key poi_2_advert (poi) references poi (id);

-- script section for creating basis data infos
insert into qb.user_role
values (1, 'SUPER_ADMIN'),
       (2, 'ADMIN'),
       (3, 'USER'),
       (4, 'ORGA_USER'),
       (5, 'ORGA_ADMIN');

insert into qb.gender_type
values (1, 'f'),
       (2, 'm'),
       (3, 'x');

insert into qb.advert_type
values (1, 'basic'),
       (2, 'advanced'),
       (3, 'premium');

insert into qb.legal_form
values (1, 'EK'),
       (2, 'GMBH'),
       (3, 'AG'),
       (4, 'GBR'),
       (5, 'OHG'),
       (6, 'KG'),
       (7, 'GMBHCOKG'),
       (8, 'KGAA'),
       (9, 'GENOSSENSCHAFT'),
       (10, 'VVAG'),
       (11, 'STIFTUNG');

-- script for creating super admin
insert into qb.location value (1, 'Mustermann Straße', '123456', 'Musterhausen', 'Deutschland');

-- pw: test TODO change for production
insert into qb.user
    value (1, 'superadmin', '$2a$10$C8SemX7bCBKNzmSM5LQM2eRscO6Bl2HwzLkYwFLWPgUJrYlYIsdou', 'super', 'admin',
           'm.wernisch@parxx.de', 3, '2021-01-01', 1, null, 0, 1);

