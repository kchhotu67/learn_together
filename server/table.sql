CREATE TABLE users(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  avatar varchar(255) NOT NULL DEFAULT 'avatar.png',
  bio varchar(255) NOT NULL DEFAULT '',
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE topics(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE rooms(
  id int NOT NULL AUTO_INCREMENT,
  host int NOT NULL REFERENCES users(id),
  topic int NOT NULL REFERENCES topics(id),
  name varchar(255) NOT NULL,
  description varchar(500) NOT NULL DEFAULT '',
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE messages(
  id int NOT NULL AUTO_INCREMENT,
  body varchar(1000) NOT NULL,
  user int NOT NULL REFERENCES users(id),
  room int NOT NULL REFERENCES rooms(id),
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE refresh_tokens(
  id int NOT NULL AUTO_INCREMENT,
  token varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);