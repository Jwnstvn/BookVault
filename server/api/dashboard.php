<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/Database.php";
require_once "../classes/Book.php";

// Database Connection
$database = new Database();
$db = $database->connect();

// Book Object
$book = new Book($db);

// Get Statistics
$statistics = $book->getStatistics();

// Get Recently Added Books
$recentBooks = $book->getRecentBooks(3);

// Return Everything
echo json_encode([
    "statistics" => $statistics,
    "recentBooks" => $recentBooks
]);

?>