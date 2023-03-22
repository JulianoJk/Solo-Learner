-- Create the db you need
CREATE DATABASE IF NOT EXISTS clients;

-- Use the db you created
USE clients;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
-- This creates a table with columns for a unique ID, username, password, email, and timestamps for when the user was created and last updated. The SERIAL data type is used for the ID column to automatically generate a unique ID for each new user.