-- Create database and table for restaurant discovery
CREATE DATABASE IF NOT EXISTS restaurantdb;
USE restaurantdb;

CREATE TABLE IF NOT EXISTS restaurants (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_name VARCHAR(255) NOT NULL,
    restaurant_description TEXT,
    restaurant_location VARCHAR(255),
    cuisine VARCHAR(100),
    opening_hours VARCHAR(100)
);

INSERT INTO restaurants (restaurant_name, restaurant_description, restaurant_location, cuisine, opening_hours)
VALUES
  ('London Curry House', 'Spicy and flavourful curries in a relaxed setting.', 'London', 'Indian', '11:30 - 22:30'),
  ('Le Gourmet', 'Exquisite French dishes with a modern twist.', 'Paris', 'French', '12:00 - 23:00'),
  ('Sushi Zen', 'Fresh sushi and sashimi in a modern setting.', 'Tokyo', 'Japanese', '11:00 - 23:00');

DROP USER IF EXISTS 'user'@'localhost';
DROP USER IF EXISTS 'user'@'%';
CREATE USER 'user'@'%' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON restaurantdb.* TO 'user'@'%';
FLUSH PRIVILEGES;
