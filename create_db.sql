-- 1) Create the database (change the name if needed)
CREATE DATABASE IF NOT EXISTS health_app;

-- 2) Use that database
USE health_app;

-- 3) Create the User table used by auth.js
DROP TABLE IF EXISTS User;

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

