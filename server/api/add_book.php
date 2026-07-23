<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "../config/Database.php";
require_once "../classes/Book.php";

$database = new Database();
$db = $database->connect();

$book = new Book($db);

// Receive text fields
$title = $_POST["title"] ?? "";
$author = $_POST["author"] ?? "";
$genre = $_POST["genre"] ?? "";
$year = $_POST["year"] ?? "";
$rating = $_POST["rating"] ?? "";
$status = $_POST["status"] ?? "";
$description = $_POST["description"] ?? "";

// Default cover
$coverName = "";

// If user selected an image
if (isset($_FILES["cover"]) && $_FILES["cover"]["error"] == 0) {

    $extension = pathinfo(
        $_FILES["cover"]["name"],
        PATHINFO_EXTENSION
    );

    $coverName = uniqid() . "." . $extension;

    move_uploaded_file(

        $_FILES["cover"]["tmp_name"],

        "../uploads/" . $coverName

    );
}

// Save to database
$success = $book->addBook(

    $title,
    $author,
    $genre,
    $year,
    $rating,
    $status,
    $description,
    $coverName

);

echo json_encode([
    "success" => $success
]);

?>