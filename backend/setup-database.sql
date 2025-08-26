-- NYSC Database Setup Script
-- Run this script as root user to create the database and user

-- Create database
CREATE DATABASE IF NOT EXISTS nysc_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create database user
CREATE USER IF NOT EXISTS 'nysc_user'@'localhost' IDENTIFIED BY 'SecureNyscPassword123!';

-- Grant privileges
GRANT ALL PRIVILEGES ON nysc_db.* TO 'nysc_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Show created database
SHOW DATABASES;

-- Show created user
SELECT User, Host FROM mysql.user WHERE User = 'nysc_user';

-- Use the database
USE nysc_db;

-- Show that database is ready
SELECT 'NYSC Database setup completed successfully!' as Status;