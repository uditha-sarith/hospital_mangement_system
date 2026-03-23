CREATE DATABASE IF NOT EXISTS carelink_db;
USE carelink_db;
CREATE TABLE IF NOT EXISTS wards (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT DEFAULT NULL,
    gender VARCHAR(20) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS beds (
    id VARCHAR(50) PRIMARY KEY,
    wardId VARCHAR(50) NOT NULL,
    number VARCHAR(50) NOT NULL,
    status ENUM('Available', 'Occupied', 'Maintenance') DEFAULT 'Available',
    patientId VARCHAR(50) DEFAULT NULL,
    admissionDate DATE DEFAULT NULL,
    FOREIGN KEY (wardId) REFERENCES wards(id) ON DELETE CASCADE,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE
    SET NULL
);
CREATE TABLE IF NOT EXISTS vitals (
    id VARCHAR(50) PRIMARY KEY,
    patientId VARCHAR(50) NOT NULL,
    heartRate INT NOT NULL,
    bloodPressure VARCHAR(20) NOT NULL,
    sugarLevel INT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    recordedBy VARCHAR(100) NOT NULL,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- Seed Data (Example)
INSERT IGNORE INTO wards (id, name)
VALUES ('w1', 'General Ward A'),
    ('w2', 'ICU'),
    ('w3', 'Maternity Ward');
INSERT IGNORE INTO patients (id, name, age, gender, phone, address)
VALUES ('p1', 'John Doe', 45, 'Male', '555-1234', '123 Main St'),
    ('p2', 'Jane Smith', 38, 'Female', '555-5678', '456 Oak Ave');
INSERT IGNORE INTO beds (id, wardId, number, status)
VALUES ('b1', 'w1', '101A', 'Available'),
    ('b2', 'w1', '101B', 'Available'),
    ('b3', 'w2', 'ICU-1', 'Available');