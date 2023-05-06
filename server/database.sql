CREATE DATABASE myfavlinks

CREATE TABLE favlinks(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    url VARCHAR(50)
)