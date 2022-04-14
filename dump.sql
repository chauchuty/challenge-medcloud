-- Tables

create table patient (
    id integer,
    name text not null,
    birth_date date not null,
    email text not null,
    fk_address integer not null
);

create table address (
    id integer,
    street text not null,
    city text not null,
    state text not null,
    zip text not null
);

-- Views
create view v$patient as select * from patient;
create view v$address as select * from address;

-- Constraints

alter table patient add constraint patient_pk primary key (id);
alter table address add constraint address_pk primary key (id);
alter table patient add constraint fk_address foreign key (fk_address) references address (id);

-- Populate

insert 