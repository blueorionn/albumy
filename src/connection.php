<?php
// Create a new Dotenv instance. Look for .env file in root folder
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');

// Load the environment variables from the .env file.
$dotenv->load();

// Database configuration
$dbHost = $_ENV['DB_HOST'];
$dbName = $_ENV['DB_NAME'];
$dbUser = $_ENV['DB_USER'];
$dbPassword = $_ENV['DB_PASSWORD'];
$dbPort = $_ENV['DB_PORT'];
$dbCharset = 'utf8mb4'; // Recommended charset for modern applications

// The DSN specifies the database type, host, port, database name, and charset.
$dsn = "mysql:host=$dbHost;port=$dbPort;dbname=$dbName;charset=$dbCharset";

// These options configure how PDO behaves.
$pdoOptions = [
    // Throw exceptions on errors, which makes error handling much cleaner.
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    // Set default fetch mode to associative arrays
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    // Disable emulation of prepared statements.
    // This allows the database itself to prepare statements
    PDO::ATTR_EMULATE_PREPARES => false,
];

// Database connection
try {
    $pdo = new PDO($dsn, $dbUser, $dbPassword, $pdoOptions);
} catch (PDOException $e) {
    die('Database connection failed' . $e->getMessage());
};

// Set global
$GLOBALS['pdo'] = $pdo;
