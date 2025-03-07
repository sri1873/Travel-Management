-- Create database and table for restaurant reviews
CREATE DATABASE IF NOT EXISTS reviewdb;
USE reviewdb;

CREATE TABLE IF NOT EXISTS reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    review_score DECIMAL(2,1),
    comment TEXT
);

INSERT INTO reviews (restaurant_id, review_score, comment)
VALUES
  (1, 4.5, 'Great flavors and excellent service.'),
  (1, 4.0, 'Good, but could use more spice.'),
  (2, 5.0, 'Absolutely fantastic experience!'),
  (3, 4.8, 'The sushi was fresh and beautifully presented.');

-- Drop user for both localhost and any host
DROP USER IF EXISTS 'user'@'localhost';
DROP USER IF EXISTS 'user'@'%';
CREATE USER 'user'@'%' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON reviewdb.* TO 'user'@'%';
FLUSH PRIVILEGES;
