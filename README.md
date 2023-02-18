# Task Description :->

- Create a Product management application using ExpressJS & any SQL DB with the following functions

- Create a API for Register & Login user with JWT authentication

- Create a middleware for JWT authentication

- Create an API CRUD operation for a product with payload validation and authenticate the routes with JWT middleware

# Below contains the fields to create a product -

Product name
Price
Quantity
Active

### run command :->

npm i

npm start

## Schema queries on work bench :->

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(60) NOT NULL
);

## product schema :->

CREATE TABLE products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price FLOAT NOT NULL,
quantity INT NOT NULL,
active BOOLEAN NOT NULL DEFAULT true
);
