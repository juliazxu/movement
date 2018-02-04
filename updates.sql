-- only do this once

psql

CREATE DATABASE movement;

-- to login (\q to exit psql)

psql movement -U postgres

create table persons (
  id                serial primary key not null,
  first_name        text not null,
  last_name         text not null,
  phone_number      bigint not null check (phone_number>10000000000 and phone_number<=19999999999),
  created           timestamp with time zone default now() not null
);

INSERT INTO persons (first_name, last_name, phone_number)
  VALUES ('Minh',
  'Luu',
  16504220667
);

SELECT * FROM persons;

create table petitions (
  id                serial primary key not null,
  title             text not null,
  body              text not null,
  author_id         integer not null references persons(id),
  created           timestamp with time zone default now() not null
);

INSERT INTO petitions (title, body, author_id)
  VALUES ('Support net neutrality', 
  'The FCC killed net neutrality rules, but Congress can stop the FCC. 
  Join our petition. We have to win or big ISPs like Comcast will control 
  what we see & do online with new fees, throttling, and censorship.', 
  1
);

SELECT * FROM petitions;

create table signatures (
  id                serial primary key not null,
  petition_id       integer not null references petitions(id),
  signer_id         integer not null references persons(id),
  phone_number      bigint not null check (phone_number>10000000000 and phone_number<=19999999999),
  pic_url           text not null,
  comment           text,
  created           timestamp with time zone default now() not null
);

INSERT INTO signatures (petition_id, signer_id, phone_number, pic_url, comment)
  VALUES (
  1,
  1,
  13019804834,
  'https://upload.wikimedia.org/wikipedia/commons/3/38/Alice_Sara_Ott_-_Signature.jpg',
  'I support net neutrality.'
);

SELECT * FROM signatures WHERE petition_id = 1;